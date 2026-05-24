// app/jemma-lite/page.tsx
"use client";

import { useAuth } from "./hooks/useAuth";
import { useChat } from "./hooks/useChat";
import { ChatView } from "./components/ChatView";
import { LoginForm } from "./components/LoginForm";

export default function JemmaLitePage() {
  const auth = useAuth();

  // 1. Verifying the stored token. Briefly shown on cold load.
  if (auth.loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-neutral-500">
        <p className="text-sm">Loading…</p>
      </div>
    );
  }

  // 2. No valid token. Show the login form.
  if (auth.state.status === "anonymous") {
    return <LoginForm onSubmit={auth.login} />;
  }

  // 3. Authed. Hand off to a child component so `useChat` only mounts
  //    when we actually have a token to give it.
  return (
    <AuthedView
      token={auth.state.token}
      username={auth.state.username}
      onSignOut={auth.logout}
      onInvalidate={auth.invalidate}
    />
  );
}

interface AuthedViewProps {
  token: string;
  username: string;
  onSignOut: () => Promise<void>;
  onInvalidate: () => void;
}

/**
 * useChat must be called unconditionally — React doesn't allow hooks
 * inside an `if`. So the authed branch lives in its own component
 * where the hook can run on every render the component exists.
 */
function AuthedView({
  token,
  username,
  onSignOut,
  onInvalidate,
}: AuthedViewProps) {
  const chat = useChat({ token, onUnauthorized: onInvalidate });
  return (
    <ChatView username={username} chat={chat} onSignOut={onSignOut} />
  );
}