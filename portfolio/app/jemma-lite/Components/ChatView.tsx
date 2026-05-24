// app/jemma-lite/components/ChatView.tsx
"use client";

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
    <section className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-3xl flex-col gap-4 p-4 text-neutral-100">
      {/* Header */}
      <header className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
            <h1 className="text-2xl font-semibold tracking-tight">Jemma</h1>
            <span className="text-xs text-neutral-500">
              local-first · streaming
            </span>
          </div>
          <p className="text-sm text-neutral-400">
            Signed in as{" "}
            <span className="text-neutral-300">{username}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onSignOut}
          className="rounded-lg border border-neutral-800 px-3 py-1.5 text-xs text-neutral-400 transition hover:bg-neutral-900 hover:text-neutral-200"
        >
          Sign out
        </button>
      </header>

      {/* Messages */}
      <MessageList messages={messages} />

      {/* Error banner — dismissable */}
      {error && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-sm text-red-300"
        >
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={clearError}
            aria-label="Dismiss error"
            className="rounded p-1 text-red-300 transition hover:bg-red-900/40"
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