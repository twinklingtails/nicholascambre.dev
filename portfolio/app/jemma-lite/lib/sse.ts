// app/jemma-lite/lib/sse.ts
//
// Parse the C++ Jemma server's SSE stream into typed events.
//
// Wire format from src/server/main.cpp:
//   event: token  \n  data: {"text": "..."}     \n\n
//   event: audio  \n  data: {"mp3_b64": "..."}  \n\n
//   event: done   \n  data: {}                  \n\n
//   event: error  \n  data: {"error": "..."}    \n\n
//
// We expose two things:
//   - drainSSE(buffer): pure function. Takes a string, returns the events
//     it found plus any unparsed remainder. Easy to unit-test.
//   - readSSE(stream):  async generator. Reads a ReadableStream<Uint8Array>
//     and yields ServerEvents as they arrive. This is what useChat will use.

import type { ServerEvent } from "../types";

// ────────────────────────────────────────────────────────────────────────────
// Map a (name, JSON-data) pair to a ServerEvent.
// Returns null if the shape doesn't match what we expect — those events
// get silently dropped, which is the right call: a bad frame shouldn't
// poison the rest of the stream.
// ────────────────────────────────────────────────────────────────────────────

function toEvent(name: string, raw: unknown): ServerEvent | null {
  const d = (raw ?? {}) as Record<string, unknown>;

  switch (name) {
    case "token":
      return typeof d.text === "string"
        ? { kind: "token", text: d.text }
        : null;

    case "audio":
      return typeof d.mp3_b64 === "string"
        ? { kind: "audio", mp3_b64: d.mp3_b64 }
        : null;

    case "done":
      return { kind: "done" };

    case "error":
      return {
        kind: "error",
        error: typeof d.error === "string" ? d.error : "unknown error",
      };

    case "tool_call":
      return typeof d.id === "string" && typeof d.name === "string"
        ? {
            kind: "tool_call",
            id: d.id,
            name: d.name,
            args: d.args as Record<string, unknown> | undefined,
          }
        : null;

    case "tool_result":
      return typeof d.id === "string" && typeof d.ok === "boolean"
        ? {
            kind: "tool_result",
            id: d.id,
            ok: d.ok,
            result: typeof d.result === "string" ? d.result : undefined,
          }
        : null;

    default:
      return null; // unknown event name — ignore
  }
}

// ────────────────────────────────────────────────────────────────────────────
// drainSSE — pull complete events out of a rolling text buffer.
// Anything past the last \n\n is returned as `rest` for the caller to
// concatenate with the next chunk.
// ────────────────────────────────────────────────────────────────────────────

export function drainSSE(buffer: string): {
  events: ServerEvent[];
  rest: string;
} {
  const events: ServerEvent[] = [];
  let cursor = 0;

  while (true) {
    // Event boundary is a blank line. Accept LF or CRLF endings.
    const lf = buffer.indexOf("\n\n", cursor);
    const crlf = buffer.indexOf("\r\n\r\n", cursor);

    let sep: number;
    let advance: number;
    if (lf === -1 && crlf === -1) break;
    if (crlf !== -1 && (lf === -1 || crlf < lf)) {
      sep = crlf;
      advance = 4;
    } else {
      sep = lf;
      advance = 2;
    }

    const block = buffer.slice(cursor, sep);
    cursor = sep + advance;

    let eventName: string | undefined;
    const dataLines: string[] = [];

    for (const line of block.split(/\r?\n/)) {
      if (line === "" || line.startsWith(":")) continue; // blank / comment
      if (line.startsWith("event:")) {
        eventName = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        // Per the SSE spec, strip a single leading space if present.
        const v = line.slice(5);
        dataLines.push(v.startsWith(" ") ? v.slice(1) : v);
      }
      // id:/retry: fields are ignored — we don't reconnect.
    }

    if (!eventName) continue;

    let parsed: unknown = null;
    if (dataLines.length > 0) {
      try {
        parsed = JSON.parse(dataLines.join("\n"));
      } catch {
        continue; // malformed JSON, drop
      }
    }

    const ev = toEvent(eventName, parsed);
    if (ev) events.push(ev);
  }

  return { events, rest: buffer.slice(cursor) };
}

// ────────────────────────────────────────────────────────────────────────────
// readSSE — async generator over a ReadableStream of bytes.
// Yields each ServerEvent as soon as the closing \n\n arrives.
// ────────────────────────────────────────────────────────────────────────────

export async function* readSSE(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<ServerEvent, void, void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const { events, rest } = drainSSE(buffer);
      buffer = rest;
      for (const e of events) yield e;
    }
    // Final flush: catch a trailing event that wasn't terminated by \n\n.
    buffer += decoder.decode(); // drain the decoder's internal state
    if (buffer.trim().length > 0) {
      const { events } = drainSSE(buffer + "\n\n");
      for (const e of events) yield e;
    }
  } finally {
    reader.releaseLock();
  }
}