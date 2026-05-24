// app/lib/theme.ts
//
// Centralized Tailwind class strings for the Jemma "neural console" look.
// Mirrors the CSS variables in app/globals.css.
//
// Why class strings instead of a Tailwind plugin / config extension?
//  - Works on Tailwind 3 *and* 4 without touching their respective configs.
//  - Composable: theme.muted + " text-xs" is the same shape as any other
//    Tailwind class.
//  - Same pattern you already use in the voice-client App.tsx, just shared.

export const theme = {
  // ── Surfaces ──────────────────────────────────────────────────────────
  appShell: "bg-[#050505] text-[#f7fafc]",
  panel: "bg-[#090b0f] border-[#202936]",
  card: "bg-[#0d1117] border-[#202936]",
  border: "border-[#202936]",
  hoverSurface: "hover:bg-[#101722]",

  // ── Text ──────────────────────────────────────────────────────────────
  text: "text-[#f7fafc]",
  textSoft: "text-[#d6e4f0]",
  muted: "text-[#7a8699]",
  mono: "font-mono tracking-tight",

  // ── Brand color usage ─────────────────────────────────────────────────
  tealText: "text-[#00b8c8]",
  blueText: "text-[#1677ff]",
  pinkText: "text-[#ff4fa3]",
  pinkHover: "hover:text-[#ff4fa3]",
  tealBorderHover: "hover:border-[#00b8c8]",

  // ── Branded surfaces ──────────────────────────────────────────────────
  brandGradient:
    "bg-gradient-to-br from-[#00b8c8] via-[#1677ff] to-[#ff4fa3]",
  brandGradientText:
    "bg-gradient-to-br from-[#00b8c8] via-[#1677ff] to-[#ff4fa3] bg-clip-text text-transparent",

  // ── Buttons ───────────────────────────────────────────────────────────
  sendButton:
    "bg-[#00b8c8] text-[#050505] hover:bg-[#ff4fa3] hover:text-white disabled:bg-[#202936] disabled:text-[#7a8699]",
  stopButton:
    "bg-[#ff4fa3] text-white hover:bg-[#d93f89]",
  ghostButton:
    "border border-[#202936] text-[#d6e4f0] hover:border-[#00b8c8] hover:bg-[#101722]",

  // ── Focus states ──────────────────────────────────────────────────────
  focusRing:
    "focus-within:border-[#00b8c8] focus-within:ring-2 focus-within:ring-[#00b8c8]/20",
  focusVisible:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b8c8]/40",

  // ── Status indicators ─────────────────────────────────────────────────
  statusDot: "bg-[#00b8c8] shadow-[0_0_14px_rgba(0,184,200,0.9)]",
  statusDotMuted: "bg-[#7a8699]",
  statusDotPink: "bg-[#ff4fa3] shadow-[0_0_14px_rgba(255,79,163,0.7)]",
} as const;

export type Theme = typeof theme;