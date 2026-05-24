// app/jemma-lite/components/Composer.tsx
"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { theme } from "@/app/lib/theme";

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
      <div className="flex items-end gap-2">
        <div
          className={`flex-1 rounded-2xl border bg-[#0d1117]/60 transition ${theme.border} ${theme.focusRing}`}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Message Jemma…   (Shift+Enter for newline)"
            rows={1}
            className={`w-full resize-none bg-transparent px-4 py-3 text-sm placeholder:text-[#7a8699] focus:outline-none ${theme.text}`}
          />
        </div>

        {streaming ? (
          <button
            type="button"
            onClick={onStop}
            title="Stop generating"
            className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${theme.stopButton}`}
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!value.trim()}
            className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${theme.sendButton}`}
          >
            Send
          </button>
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleMute}
            title={muteLabel}
            aria-label={muteLabel}
            className={`flex items-center gap-1.5 rounded-lg px-2 py-1 transition ${theme.muted} hover:bg-[#101722] hover:text-[#00b8c8]`}
          >
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
            <span className={theme.mono}>
              {muted ? "voice off" : "voice on"}
            </span>
          </button>

          {hasMessages && (
            <button
              type="button"
              onClick={onNewChat}
              title="Clear conversation"
              className={`rounded-lg px-2 py-1 transition ${theme.muted} ${theme.mono} hover:bg-[#101722] hover:text-[#00b8c8]`}
            >
              new chat
            </button>
          )}
        </div>

        <span className={`${theme.mono} text-[#5a6473]`}>
          enter to send · shift+enter for newline
        </span>
      </div>
    </form>
  );
}