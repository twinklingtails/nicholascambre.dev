// app/jemma-lite/lib/playback.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "../types";
import type { DemoTurn } from "./scripts";

// ────────────────────────────────────────────────────────────────────────────
// Timing constants — tweak these if the demo feels too fast/slow.
// ────────────────────────────────────────────────────────────────────────────

/** Chars per chunk when streaming an assistant message. */
const CHARS_PER_CHUNK = 4;
/** Base delay between chunks. */
const CHUNK_DELAY_MS = 25;
/** Random jitter added to chunk delay so it doesn't feel mechanical. */
const CHUNK_JITTER_MS = 30;

/** Pause before a user turn appears (simulates typing). */
const USER_DELAY_MS = 350;
const USER_JITTER_MS = 200;

/** Pause before an assistant turn starts streaming (simulates thinking). */
const ASSISTANT_DELAY_MS = 750;
const ASSISTANT_JITTER_MS = 500;

/** Pause before a tool call appears, and how long "running" shows. */
const TOOL_DELAY_MS = 400;
const TOOL_JITTER_MS = 200;
const TOOL_RUNNING_MS = 650;
const TOOL_RUNNING_JITTER_MS = 350;

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

const uid = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

/** Sleep that resolves after `ms` or rejects with AbortError on signal. */
function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("aborted", "AbortError"));
      return;
    }
    const t = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(t);
        reject(new DOMException("aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

const randomDelay = (base: number, jitter: number): number =>
  base + Math.random() * jitter;

// ────────────────────────────────────────────────────────────────────────────
// Public hook
// ────────────────────────────────────────────────────────────────────────────

export interface UsePlayback {
  messages: Message[];
  isPlaying: boolean;
  /** Start a new playback. Cancels any in-flight one first. */
  play(turns: DemoTurn[]): void;
  /** Abort the current playback but leave the messages on screen. */
  stop(): void;
  /** Abort and clear the chat surface. */
  clear(): void;
}

/**
 * usePlayback turns a list of DemoTurn objects into a streaming
 * Message[] state, complete with realistic typing/thinking delays.
 *
 * Designed so the consumer can pass `messages` straight to the same
 * MessageList component the live chat uses — visual parity by default.
 */
export function usePlayback(): UsePlayback {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Abort any in-flight playback when the component unmounts.
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const stop = useCallback((): void => {
    abortRef.current?.abort();
  }, []);

  const clear = useCallback((): void => {
    abortRef.current?.abort();
    setMessages([]);
  }, []);

  const play = useCallback(async (turns: DemoTurn[]): Promise<void> => {
    // Cancel any prior playback and start a fresh controller.
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const signal = ctrl.signal;

    setMessages([]);
    setIsPlaying(true);

    try {
      for (const turn of turns) {
        if (signal.aborted) return;

        if (turn.role === "user") {
          await sleep(randomDelay(USER_DELAY_MS, USER_JITTER_MS), signal);
          setMessages(prev => [
            ...prev,
            { id: uid(), role: "user", content: turn.content },
          ]);
        } else if (turn.role === "assistant") {
          await sleep(
            randomDelay(ASSISTANT_DELAY_MS, ASSISTANT_JITTER_MS),
            signal,
          );
          const id = uid();
          setMessages(prev => [
            ...prev,
            { id, role: "assistant", content: "", streaming: true },
          ]);

          // Stream the content in chunks of N characters.
          const text = turn.content;
          let written = 0;
          while (written < text.length) {
            if (signal.aborted) return;
            const next = Math.min(written + CHARS_PER_CHUNK, text.length);
            const partial = text.slice(0, next);
            setMessages(prev =>
              prev.map(m =>
                m.id === id && m.role === "assistant"
                  ? { ...m, content: partial }
                  : m,
              ),
            );
            written = next;
            await sleep(
              randomDelay(CHUNK_DELAY_MS, CHUNK_JITTER_MS),
              signal,
            );
          }

          // Mark streaming complete.
          setMessages(prev =>
            prev.map(m =>
              m.id === id && m.role === "assistant"
                ? { ...m, streaming: false }
                : m,
            ),
          );
        } else if (turn.role === "tool") {
          await sleep(randomDelay(TOOL_DELAY_MS, TOOL_JITTER_MS), signal);
          const id = uid();
          setMessages(prev => [
            ...prev,
            {
              id,
              role: "tool",
              name: turn.name,
              args: turn.args,
              status: "running",
            },
          ]);

          await sleep(
            randomDelay(TOOL_RUNNING_MS, TOOL_RUNNING_JITTER_MS),
            signal,
          );
          if (signal.aborted) return;

          setMessages(prev =>
            prev.map(m =>
              m.id === id && m.role === "tool"
                ? { ...m, status: "done", result: turn.result }
                : m,
            ),
          );
        }
      }
    } catch (e) {
      // AbortError is expected on stop() / new play() / unmount; ignore.
      if ((e as Error).name !== "AbortError") {
        console.warn("[playback] unexpected error:", e);
      }
    } finally {
      // Only flip isPlaying off if this run wasn't superseded by a new one.
      if (abortRef.current === ctrl) {
        setIsPlaying(false);
      }
    }
  }, []);

  return { messages, isPlaying, play, stop, clear };
}