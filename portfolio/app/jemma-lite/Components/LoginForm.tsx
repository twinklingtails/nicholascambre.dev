// app/jemma-lite/components/LoginForm.tsx
"use client";

import { FormEvent, useState } from "react";

interface LoginFormProps {
  /** Pass `auth.login` from the page. Throws on failure with a message. */
  onSubmit: (username: string, password: string) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (submitting || !username || !password) return;

    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(username, password);
      // On success the parent renders ChatView instead of LoginForm —
      // this component unmounts, no need to reset local state.
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-[60vh] place-items-center px-4 text-neutral-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 backdrop-blur"
      >
        <header className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
            <h1 className="text-xl font-semibold tracking-tight">
              Sign in to Jemma
            </h1>
          </div>
          <p className="text-sm text-neutral-400">
            Local-first assistant — credentials are checked against your server.
          </p>
        </header>

        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-neutral-400">
              Username
            </span>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              required
              disabled={submitting}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/30 disabled:opacity-60"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-neutral-400">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={submitting}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/30 disabled:opacity-60"
            />
          </label>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || !username || !password}
          className="w-full rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-neutral-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}