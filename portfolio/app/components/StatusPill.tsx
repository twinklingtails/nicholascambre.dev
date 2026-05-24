// app/components/StatusPill.tsx

import { theme } from "../lib/theme";

interface StatusPillProps {
  label: string;
  /** Default 'teal'. 'pink' for important/alert, 'muted' for offline. */
  variant?: "teal" | "pink" | "muted";
  /** Default true. Set false for static (no animation). */
  pulse?: boolean;
}

/**
 * The bordered "live status" indicator used throughout the console UI:
 *
 *   [● voice: on]    [● qwen2.5 7b · local]    [● systems nominal]
 *
 * Dot pulses with a glow ring by default.
 */
export function StatusPill({
  label,
  variant = "teal",
  pulse = true,
}: StatusPillProps) {
  const dotClass =
    variant === "teal"
      ? theme.statusDot
      : variant === "pink"
        ? theme.statusDotPink
        : theme.statusDotMuted;

  const labelClass =
    variant === "teal"
      ? theme.tealText
      : variant === "pink"
        ? theme.pinkText
        : theme.muted;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded border bg-[#0d1117] px-2 py-1 ${theme.border}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dotClass} ${pulse ? "animate-pulse" : ""}`}
      />
      <span className={`text-xs ${theme.mono} ${labelClass}`}>{label}</span>
    </div>
  );
}