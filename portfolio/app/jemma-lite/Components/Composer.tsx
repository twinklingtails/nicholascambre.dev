// app/jemma-lite/components/Composer.tsx
"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

interface ComposerProps {
  streaming: boolean;
  muted: boolean;
  hasMessages: boolean;
  onSend(text: string): void;
  onStop(): void;
  onToggleMute(): void;
  onNewChat(): void;
}

export function Composer({
  streaming,
  muted,
  hasMessages,
  onSend,
  onStop,
  onToggleMute,
  onNewChat,
}: ComposerProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Autosize the textarea: shrink to 'auto' then grow to scrollHeight,
  // capped at ~200px so long pastes don't take over the screen.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  const submit = (): void => {
    const text = value.trim();
    if (!text || streaming) return;
    onSend(text);
    setValue("");
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    submit();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const muteLabel = muted ? "Turn voice on" : "Turn voice off";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      {/* Input row */}
      <div className="flex items-end gap-2">
        <div className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-900/50 transition focus-within:border-amber-500/60 focus-within:ring-1 focus-within:ring-amber-500/30">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Message Jemma…   (Shift+Enter for newline)"
            rows={1}
            className="w-full resize-none bg-transparent px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
          />
        </div>

        {streaming ? (
          <button
            type="button"
            onClick={onStop}
            title="Stop generating"
            className="rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-200 transition hover:bg-neutral-800"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!value.trim()}
            className="rounded-2xl bg-amber-500 px-4 py-3 text-sm font-medium text-neutral-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        )}
      </div>

      {/* Utility row */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleMute}
            title={muteLabel}
            aria-label={muteLabel}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 transition hover:bg-neutral-900 hover:text-neutral-300"
          >
            {/* Tiny inline speaker icon. Filled vs slashed = on vs off. */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H2v6h4l5 4z" />
              {muted ? (
                <>
                  <line x1="22" y1="9" x2="16" y2="15" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                </>
              ) : (
                <>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </>
              )}
            </svg>
            <span>{muted ? "Voice off" : "Voice on"}</span>
          </button>

          {hasMessages && (
            <button
              type="button"
              onClick={onNewChat}
              title="Clear conversation"
              className="rounded-lg px-2 py-1 transition hover:bg-neutral-900 hover:text-neutral-300"
            >
              New chat
            </button>
          )}
        </div>

        <span className="text-neutral-600">
          Enter to send · Shift+Enter for newline
        </span>
      </div>
    </form>
  );
}