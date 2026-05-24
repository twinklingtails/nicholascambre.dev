// app/jemma-lite/hooks/useChat.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  chatCancel,
  chatNew,
  chatStream,
  JemmaApiError,
} from "../lib/api";
import { readSSE } from "../lib/sse";
import { createAudioQueue, type AudioQueue } from "../lib/audio";
import type { Message } from "../types";

const uid = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

export interface UseChatOptions {
  token: string;
  /** Called when the server returns 401 — typically auth.invalidate. */
  onUnauthorized?: () => void;
  /** Default mute state. True (silent) is recommended. */
  initialMuted?: boolean;
}

export interface UseChat {
  messages: Message[];
  streaming: boolean;
  error: string | null;
  muted: boolean;
  send(text: string): Promise<void>;
  stop(): void;
  newChat(): Promise<void>;
  setMuted(muted: boolean): void;
  clearError(): void;
}

// ────────────────────────────────────────────────────────────────────────────
// Hook
// ────────────────────────────────────────────────────────────────────────────

export function useChat(opts: UseChatOptions): UseChat {
  const { token, onUnauthorized, initialMuted = true } = opts;

  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [muted, setMutedState] = useState(initialMuted);

  // Audio queue lives for the lifetime of the hook. useState's lazy
  // initializer guarantees it's created exactly once per mount.
  const [audio] = useState<AudioQueue>(() => createAudioQueue(initialMuted));
  useEffect(() => () => audio.destroy(), [audio]);

  // streamingRef guards against rapid-fire send() before React re-renders.
  // The state version is for UI; the ref version is for control flow.
  const streamingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  // ── Mute toggle ────────────────────────────────────────────────────────
  const setMuted = useCallback(
    (next: boolean): void => {
      setMutedState(next);
      audio.setMuted(next);
    },
    [audio],
  );

  // ── Stop streaming ─────────────────────────────────────────────────────
  const stop = useCallback((): void => {
    abortRef.current?.abort();
    // Belt-and-suspenders: even though aborting the fetch will eventually
    // make sink.write() return false on the C++ side, posting to
    // /chat/cancel sets cancel_flag immediately, which the engine checks
    // every token. Faster stop.
    chatCancel(token).catch(() => {});
  }, [token]);

  // ── Send a message + consume the SSE stream ────────────────────────────
  const send = useCallback(
    async (text: string): Promise<void> => {
      if (streamingRef.current) return;
      const trimmed = text.trim();
      if (!trimmed) return;

      streamingRef.current = true;
      setStreaming(true);
      setError(null);

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: trimmed,
      };
      const assistantId = uid();
      const assistantMsg: Message = {
        id: assistantId,
        role: "assistant",
        content: "",
        streaming: true,
      };
      setMessages(prev => [...prev, userMsg, assistantMsg]);

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const stream = await chatStream(token, trimmed, ctrl.signal);

        for await (const event of readSSE(stream)) {
          if (event.kind === "token") {
            setMessages(prev =>
              prev.map(m =>
                m.id === assistantId && m.role === "assistant"
                  ? { ...m, content: m.content + event.text }
                  : m,
              ),
            );
          } else if (event.kind === "audio") {
            audio.enqueueBase64Mp3(event.mp3_b64);
          } else if (event.kind === "tool_call") {
            // Insert the tool card just before the current assistant
            // bubble so it reads chronologically. The bubble keeps
            // streaming below it.
            const tool: Message = {
              id: event.id,
              role: "tool",
              name: event.name,
              args: event.args,
              status: "running",
            };
            setMessages(prev => {
              const i = prev.findIndex(m => m.id === assistantId);
              if (i === -1) return [...prev, tool];
              const copy = prev.slice();
              copy.splice(i, 0, tool);
              return copy;
            });
          } else if (event.kind === "tool_result") {
            setMessages(prev =>
              prev.map(m =>
                m.id === event.id && m.role === "tool"
                  ? {
                      ...m,
                      status: event.ok ? "done" : "error",
                      result: event.result,
                    }
                  : m,
              ),
            );
          } else if (event.kind === "error") {
            setError(event.error);
          }
          // event.kind === "done" → the for-await will exit naturally
          // when the C++ server closes the stream right after.
        }
      } catch (e) {
        const err = e as Error;
        if (err.name === "AbortError") {
          // User pressed Stop. Not an error.
        } else if (e instanceof JemmaApiError && e.status === 401) {
          onUnauthorized?.();
          setError("Session expired. Please sign in again.");
        } else {
          setError(err.message || "Stream failed.");
        }
      } finally {
        // Close out the assistant bubble's streaming state.
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId && m.role === "assistant"
              ? { ...m, streaming: false }
              : m,
          ),
        );
        streamingRef.current = false;
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [token, onUnauthorized, audio],
  );

  // ── New conversation ───────────────────────────────────────────────────
  const newChat = useCallback(async (): Promise<void> => {
    // If a stream is in flight, abort it first so the engine_mutex is free.
    abortRef.current?.abort();
    audio.clear();
    setMessages([]);
    setError(null);
    try {
      await chatNew(token);
    } catch (e) {
      if (e instanceof JemmaApiError && e.status === 401) {
        onUnauthorized?.();
      }
      // Other failures: the UI is already cleared. Server-side history
      // diverges until the next successful /chat/new, which is acceptable.
    }
  }, [token, onUnauthorized, audio]);

  const clearError = useCallback((): void => setError(null), []);

  return {
    messages,
    streaming,
    error,
    muted,
    send,
    stop,
    newChat,
    setMuted,
    clearError,
  };
}