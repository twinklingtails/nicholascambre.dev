// app/jemma-lite/components/RequestAccessForm.tsx
"use client";

import { FormEvent, useState } from "react";
import { theme } from "@/app/lib/theme";
import { GradientLogo } from "@/app/components/GradientLogo";

interface RequestAccessFormProps {
  onCancel(): void;
}

type Status = "idle" | "submitting" | "success" | "already-submitted" | "error";

const USE_CASE_MIN = 30;
const USE_CASE_MAX = 2000;

export function RequestAccessForm({ onCancel }: RequestAccessFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const useCaseLen = useCase.trim().length;
  const canSubmit =
    status === "idle" &&
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    useCaseLen >= USE_CASE_MIN;

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/jemma-lite/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          useCase: useCase.trim(),
          website, // honeypot
        }),
      });
      if (res.status === 429) {
        setStatus("already-submitted");
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? `Request failed (${res.status}).`);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Could not submit.");
    }
  };

  // ── Success state replaces the form ────────────────────────────────
  if (status === "success" || status === "already-submitted") {
  const isReturning = status === "already-submitted";

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-2xl border border-[#202936] bg-[#0d1117]/60 p-6 text-neutral-100">
      <div className="flex items-center gap-3">
        <GradientLogo letter="J" size="md" />

        <div>
          <h1 className={`text-lg font-semibold ${theme.text}`}>
            {isReturning ? "Already received" : "Request received"}
          </h1>

          <p
            className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
          >
            {isReturning
              ? "// one request per visitor"
              : "// thanks for reaching out"}
          </p>
        </div>
      </div>

      <p className={`text-sm ${theme.textSoft}`}>
        {isReturning ? (
          <>
            Looks like a request from this network landed within the
            past day. Nicholas accepts one per visitor — keeps the inbox
            manageable. If you submitted in error or need to follow up,
            reach him through the{" "}
            <a
              href="/contact"
              className={`underline decoration-[#00b8c8]/40 underline-offset-4 hover:text-[#00b8c8] hover:decoration-[#00b8c8] ${theme.text}`}
            >
              contact page
            </a>
            .
          </>
        ) : (
          <>
            Nicholas got a ping. If your message looked thoughtful,
            you&apos;ll hear back within a day or two. Until then, keep
            poking at the demo.
          </>
        )}
      </p>

      <button
        type="button"
        onClick={onCancel}
        className={`self-start rounded-lg border px-3 py-1.5 text-xs transition-colors ${theme.border} ${theme.muted} ${theme.mono} hover:border-[#00b8c8] hover:text-[#00b8c8]`}
      >
        ← back to demo
      </button>
    </div>
  );
}

  // ── Form state ─────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-5 rounded-2xl border border-[#202936] bg-[#0d1117]/60 p-6 text-neutral-100"
    >
      <header className="flex items-center gap-3">
        <GradientLogo letter="J" size="md" />
        <div>
          <h1 className={`text-lg font-semibold ${theme.text}`}>
            Request access
          </h1>
          <p
            className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
          >
            {"// nicholas reviews these by hand"}
          </p>
        </div>
      </header>

      <p className={`text-sm ${theme.textSoft}`}>
        Tell me who you are and what you&apos;d use Jemma for. I read every
        message and reply to the thoughtful ones.
      </p>

      <div className="space-y-3">
        <label className="block">
          <span
            className={`mb-1 block text-xs ${theme.mono} ${theme.muted}`}
          >
            your name
          </span>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            maxLength={100}
            autoComplete="name"
            disabled={status === "submitting"}
            className={`w-full rounded-xl border bg-[#050505]/60 px-3 py-2 text-sm focus:border-[#00b8c8]/60 focus:outline-none focus:ring-1 focus:ring-[#00b8c8]/30 disabled:opacity-60 ${theme.border} ${theme.text}`}
          />
        </label>

        <label className="block">
          <span
            className={`mb-1 block text-xs ${theme.mono} ${theme.muted}`}
          >
            email
          </span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            maxLength={200}
            autoComplete="email"
            disabled={status === "submitting"}
            className={`w-full rounded-xl border bg-[#050505]/60 px-3 py-2 text-sm focus:border-[#00b8c8]/60 focus:outline-none focus:ring-1 focus:ring-[#00b8c8]/30 disabled:opacity-60 ${theme.border} ${theme.text}`}
          />
        </label>

        <label className="block">
          <span
            className={`mb-1 flex items-center justify-between text-xs ${theme.mono} ${theme.muted}`}
          >
            <span>what would you use jemma for?</span>
            <span
              className={
                useCaseLen >= USE_CASE_MIN
                  ? theme.tealText
                  : theme.muted
              }
            >
              {useCaseLen}/{USE_CASE_MIN}
            </span>
          </span>
          <textarea
            value={useCase}
            onChange={e => setUseCase(e.target.value)}
            required
            minLength={USE_CASE_MIN}
            maxLength={USE_CASE_MAX}
            rows={5}
            disabled={status === "submitting"}
            placeholder="A few sentences. Be specific — vague messages get vague replies."
            className={`w-full resize-none rounded-xl border bg-[#050505]/60 px-3 py-2 text-sm placeholder:text-[#5a6473] focus:border-[#00b8c8]/60 focus:outline-none focus:ring-1 focus:ring-[#00b8c8]/30 disabled:opacity-60 ${theme.border} ${theme.text}`}
          />
        </label>

        {/* Honeypot — humans don't see this. Bots fill it; server drops them. */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
          </label>
        </div>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="rounded-lg border border-[#ff4fa3]/40 bg-[#ff4fa3]/10 px-3 py-2 text-sm text-[#ff4fa3]"
        >
          {errorMsg}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={status === "submitting"}
          className={`text-xs transition-colors ${theme.muted} ${theme.mono} hover:text-[#ff4fa3] disabled:opacity-60`}
        >
          ← back to demo
        </button>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${theme.sendButton} disabled:cursor-not-allowed`}
        >
          {status === "submitting" ? "sending…" : "send request"}
        </button>
      </div>
    </form>
  );
}