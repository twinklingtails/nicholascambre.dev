// app/jemma-lite/components/ChatView.tsx
"use client";

import { GradientLogo } from "@/app/components/GradientLogo";
import { StatusPill } from "@/app/components/StatusPill";
import { theme } from "@/app/lib/theme";
import type { UseChat } from "../hooks/useChat";
import { Composer } from "./Composer";
import { MessageList } from "./MessageList";

interface ChatViewProps {
  username: string;
  chat: UseChat;
  onSignOut: () => void;
}

export function ChatView({ username, chat, onSignOut }: ChatViewProps) {
  const {
    messages,
    streaming,
    error,
    muted,
    send,
    stop,
    newChat,
    setMuted,
    clearError,
  } = chat;

  return (
    <section className="mx-auto flex h-[calc(100vh-14rem)] min-h-[500px] w-full max-w-3xl flex-col gap-4 text-neutral-100">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GradientLogo letter="J" size="md" />
          <div>
            <h1 className={`text-xl font-semibold ${theme.text}`}>Jemma</h1>
            <p
              className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
            >
              local · streaming
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusPill
            label={muted ? "voice: off" : "voice: on"}
            variant={muted ? "muted" : "teal"}
            pulse={!muted}
          />
          <button
            type="button"
            onClick={onSignOut}
            title={`Signed in as ${username}`}
            className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${theme.border} ${theme.muted} hover:border-[#ff4fa3]/60 hover:text-[#ff4fa3]`}
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Messages */}
      <MessageList messages={messages} />

      {/* Error banner */}
      {error && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 rounded-lg border border-[#ff4fa3]/40 bg-[#ff4fa3]/10 px-3 py-2 text-sm text-[#ff4fa3]"
        >
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={clearError}
            aria-label="Dismiss error"
            className="rounded p-1 transition hover:bg-[#ff4fa3]/20"
          >
            ×
          </button>
        </div>
      )}

      {/* Composer */}
      <Composer
        streaming={streaming}
        muted={muted}
        hasMessages={messages.length > 0}
        onSend={send}
        onStop={stop}
        onToggleMute={() => setMuted(!muted)}
        onNewChat={newChat}
      />
    </section>
  );
}