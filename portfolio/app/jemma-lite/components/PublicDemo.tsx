// app/jemma-lite/components/PublicDemo.tsx
"use client";

import type { ReactNode } from "react";
import { useCallback } from "react";
import { GradientLogo } from "@/app/components/GradientLogo";
import { StatusPill } from "@/app/components/StatusPill";
import { theme } from "@/app/lib/theme";
import { usePlayback } from "../lib/playback";
import { SCRIPTS, pickVariant, type Script } from "../lib/scripts";
import { MessageList } from "./MessageList";

interface PublicDemoProps {
  /** True if /api/jemma/health succeeded — drives the status pill label. */
  jemmaOnline?: boolean;
  /** Slot below the demo. Typically the "Sign in" / "Request access" row. */
  cta?: ReactNode;
}

/**
 * Anonymous-visitor surface for /jemma-lite.
 *
 * Renders the same visual chat that the live ChatView uses (same bubbles,
 * same MessageList), but driven by a scripted playback engine instead of
 * a real SSE stream. Click a prompt → script picks a variant at random →
 * playback streams it in with realistic timing.
 */
export function PublicDemo({ jemmaOnline = true, cta }: PublicDemoProps) {
  const { messages, isPlaying, play, clear, stop } = usePlayback();

  const runScript = useCallback(
    (script: Script): void => {
      play(pickVariant(script));
    },
    [play],
  );

  const runRandom = useCallback((): void => {
    const i = Math.floor(Math.random() * SCRIPTS.length);
    runScript(SCRIPTS[i]);
  }, [runScript]);

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 text-neutral-100">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GradientLogo letter="J" size="md" />
          <div>
            <h1 className={`text-xl font-semibold ${theme.text}`}>Jemma</h1>
            <p
              className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
            >
              public demo · scripted preview
            </p>
          </div>
        </div>
        <StatusPill
          label={jemmaOnline ? "live mode available" : "live mode offline"}
          variant={jemmaOnline ? "teal" : "muted"}
          pulse={jemmaOnline}
        />
      </header>

      {/* ── Intro copy (only on empty state) ───────────────────────── */}
      {messages.length === 0 && (
        <p className={`text-sm leading-relaxed ${theme.textSoft}`}>
          This is a scripted preview of Jemma — the same UI as the live chat,
          but the conversations are pre-written. Click any prompt below to see
          how she actually responds.
        </p>
      )}

      {/* ── Prompt grid (always visible — clicking interrupts) ─────── */}
      <div className="space-y-3">
        {messages.length > 0 && (
          <p
            className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
          >
            {"// try another"}
          </p>
        )}
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SCRIPTS.slice(0, 9).map(script => (
            <button
              key={script.id}
              type="button"
              onClick={() => runScript(script)}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${theme.border} ${theme.textSoft} hover:border-[#00b8c8] hover:bg-[#101722] hover:text-white`}
            >
              {script.prompt}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={runRandom}
            className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${theme.border} ${theme.mono} ${theme.muted} hover:border-[#ff4fa3] hover:text-[#ff4fa3]`}
          >
            surprise me
          </button>
          {isPlaying && (
            <button
              type="button"
              onClick={stop}
              className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${theme.mono} border-[#ff4fa3]/50 text-[#ff4fa3] hover:border-[#ff4fa3] hover:bg-[#ff4fa3]/10`}
            >
              skip
            </button>
          )}
          {messages.length > 0 && !isPlaying && (
            <button
              type="button"
              onClick={clear}
              className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${theme.mono} ${theme.muted} hover:text-[#ff4fa3]`}
            >
              clear
            </button>
          )}
        </div>
      </div>

      {/* ── Chat surface (only renders when there's content) ───────── */}
      {messages.length > 0 && (
        <div
          className={`rounded-2xl border bg-[#0d1117]/40 p-4 ${theme.border}`}
        >
          <MessageList messages={messages} />
        </div>
      )}

      {/* ── CTA slot (sign in / request access etc.) ───────────────── */}
      {cta && (
        <div className={`border-t pt-4 ${theme.border}`}>{cta}</div>
      )}
    </section>
  );
}