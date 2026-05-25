// app/jemma-lite/components/PageCtas.tsx
"use client";

import { theme } from "@/app/lib/theme";

// ────────────────────────────────────────────────────────────────────────────
// AnonymousCta — shown under PublicDemo when visitor isn't authed.
// ────────────────────────────────────────────────────────────────────────────

interface AnonymousCtaProps {
  jemmaOnline: boolean;
  onSignIn(): void;
  onRequestAccess(): void;
}

export function AnonymousCta({
  jemmaOnline,
  onSignIn,
  onRequestAccess,
}: AnonymousCtaProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      <p
        className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
      >
        {"// want to talk to her live?"}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onSignIn}
          disabled={!jemmaOnline}
          title={
            jemmaOnline
              ? "Sign in with your credentials"
              : "Sign-in requires Jemma to be online"
          }
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${theme.sendButton} ${theme.mono}`}
        >
          sign in
        </button>

        <button
          type="button"
          onClick={onRequestAccess}
          className={`rounded-lg border border-[#ff4fa3]/40 px-3 py-1.5 text-xs text-[#ff4fa3] transition-colors hover:border-[#ff4fa3] hover:bg-[#ff4fa3]/10 ${theme.mono}`}
        >
          request access
        </button>

        {!jemmaOnline && (
          <span className={`text-xs ${theme.muted}`}>
            Sign-in unavailable while Jemma is offline.
          </span>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// AuthedOfflineCta — shown under PublicDemo when authed user can't reach Jemma.
// ────────────────────────────────────────────────────────────────────────────

interface AuthedOfflineCtaProps {
  username: string;
  onSignOut(): void;
}

export function AuthedOfflineCta({
  username,
  onSignOut,
}: AuthedOfflineCtaProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      <p
        className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
      >
        {"// jemma is sleeping"}
      </p>
      <p className={`text-sm ${theme.textSoft}`}>
        Signed in as{" "}
        <span className={theme.text}>{username}</span>. Live chat will be
        available when Jemma is back online. Until then, the scripted preview
        above shows what she sounds like.
      </p>
      <button
        type="button"
        onClick={onSignOut}
        className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${theme.border} ${theme.muted} ${theme.mono} hover:border-[#ff4fa3] hover:text-[#ff4fa3]`}
      >
        sign out
      </button>
    </div>
  );
}