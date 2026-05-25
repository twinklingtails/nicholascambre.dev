// app/jemma-lite/page.tsx
"use client";

import { useState } from "react";
import { theme } from "@/app/lib/theme";
import { useAuth } from "./hooks/useAuth";
import { useChat } from "./hooks/useChat";
import { useJemmaReachability } from "./hooks/useJemmaReachability";
import { ChatView } from "./components/ChatView";
import { LoginForm } from "./components/LoginForm";
import { PublicDemo } from "./components/PublicDemo";
import { AnonymousCta, AuthedOfflineCta } from "./components/PageCtas";
import { RequestAccessForm } from "./components/RequestAccessForm";


type AnonView = "demo" | "login" | "request-access";

export default function JemmaLitePage() {
  const auth = useAuth();
  const jemmaOnline = useJemmaReachability();
  const [anonView, setAnonView] = useState<AnonView>("demo");

  // ── Loading: auth verification or reachability check in flight ──────
  if (auth.loading || jemmaOnline === null) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-neutral-500">
        <p className="text-sm">Loading…</p>
      </div>
    );
  }

  // ── Authed + online: real live chat ─────────────────────────────────
  if (auth.state.status === "authed" && jemmaOnline) {
    return (
      <AuthedView
        token={auth.state.token}
        username={auth.state.username}
        onSignOut={auth.logout}
        onInvalidate={auth.invalidate}
      />
    );
  }

  // ── Authed + offline: scripted preview with a "Jemma's sleeping" notice ──
  if (auth.state.status === "authed" && !jemmaOnline) {
    return (
      <PublicDemo
        jemmaOnline={false}
        cta={
          <AuthedOfflineCta
            username={auth.state.username}
            onSignOut={auth.logout}
          />
        }
      />
    );
  }

  // ── Anonymous + chose to sign in ────────────────────────────────────
  if (anonView === "login") {
    return (
      <LoginForm
        onSubmit={auth.login}
        onCancel={() => setAnonView("demo")}
      />
    );
  }

  // ── Anonymous + chose to request access ─────────────────────────────
    if (anonView === "request-access") {
    return <RequestAccessForm onCancel={() => setAnonView("demo")} />;
  }

  // ── Default: anonymous + viewing the demo ───────────────────────────
  return (
    <PublicDemo
      jemmaOnline={jemmaOnline}
      cta={
        <AnonymousCta
          jemmaOnline={jemmaOnline}
          onSignIn={() => setAnonView("login")}
          onRequestAccess={() => setAnonView("request-access")}
        />
      }
    />
  );
}

// ────────────────────────────────────────────────────────────────────────────
// AuthedView — split out so useChat only mounts when there's a real token.
// (React forbids conditional hook calls; this is the standard fix.)
// ────────────────────────────────────────────────────────────────────────────

interface AuthedViewProps {
  token: string;
  username: string;
  onSignOut: () => Promise<void>;
  onInvalidate: () => void;
}

function AuthedView({
  token,
  username,
  onSignOut,
  onInvalidate,
}: AuthedViewProps) {
  const chat = useChat({ token, onUnauthorized: onInvalidate });
  return <ChatView username={username} chat={chat} onSignOut={onSignOut} />;
}

// ────────────────────────────────────────────────────────────────────────────
// Placeholder for D4. Replaced next step.
// ────────────────────────────────────────────────────────────────────────────

function RequestAccessPlaceholder({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-[#202936] bg-[#0d1117]/60 p-6 text-neutral-100">
      <p
        className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
      >
        {"// coming soon"}
      </p>
      <p className={`text-sm ${theme.textSoft}`}>
        The request-access form lands in the next step. Until then, you can
        reach Nicholas directly through the contact page.
      </p>
      <button
        type="button"
        onClick={onCancel}
        className={`text-left text-xs ${theme.muted} ${theme.mono} hover:text-[#ff4fa3] transition-colors`}
      >
        ← back to demo
      </button>
    </div>
  );
}