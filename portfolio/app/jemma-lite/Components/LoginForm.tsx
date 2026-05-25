// app/jemma-lite/components/LoginForm.tsx
"use client";

import { FormEvent, useState } from "react";
import { GradientLogo } from "@/app/components/GradientLogo";
import { theme } from "@/app/lib/theme";

interface LoginFormProps {
  /** Pass `auth.login` from the page. Throws on failure with a message. */
  onSubmit: (username: string, password: string) => Promise<void>;
  /** If provided, renders a "back to demo" link at the bottom. */
  onCancel?: () => void;
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-[60vh] place-items-center px-4 text-neutral-100">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-sm space-y-5 rounded-2xl border bg-[#0d1117]/60 p-6 backdrop-blur ${theme.border}`}
      >
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <GradientLogo letter="J" size="md" />
            <div>
              <h1 className={`text-lg font-semibold ${theme.text}`}>
                Sign in to Jemma
              </h1>
              <p
                className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
              >
                local-first · credentials stay on your server
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-3">
          <label className="block">
            <span
              className={`mb-1 block text-xs ${theme.mono} ${theme.muted}`}
            >
              username
            </span>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              required
              disabled={submitting}
              className={`w-full rounded-xl border bg-[#050505]/60 px-3 py-2 text-sm focus:border-[#00b8c8]/60 focus:outline-none focus:ring-1 focus:ring-[#00b8c8]/30 disabled:opacity-60 ${theme.border} ${theme.text}`}
            />
          </label>

          <label className="block">
            <span
              className={`mb-1 block text-xs ${theme.mono} ${theme.muted}`}
            >
              password
            </span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={submitting}
              className={`w-full rounded-xl border bg-[#050505]/60 px-3 py-2 text-sm focus:border-[#00b8c8]/60 focus:outline-none focus:ring-1 focus:ring-[#00b8c8]/30 disabled:opacity-60 ${theme.border} ${theme.text}`}
            />
          </label>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-[#ff4fa3]/40 bg-[#ff4fa3]/10 px-3 py-2 text-sm text-[#ff4fa3]"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || !username || !password}
          className={`w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${theme.sendButton} disabled:cursor-not-allowed`}
        >
          {submitting ? "signing in…" : "sign in"}
        </button>
      </form>
    </div>
  );
}