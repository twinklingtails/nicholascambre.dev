// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { GridBackground } from "./components/GridBackground";
import { GradientLogo } from "./components/GradientLogo";
import { StatusPill } from "./components/StatusPill";
import { theme } from "./lib/theme";

export const metadata: Metadata = {
  title: "Nicholas Cambre — neural console",
  description:
    "Nicholas builds local-first AI agents, automation, and tooling that runs on his own hardware.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`relative min-h-screen overflow-x-hidden ${theme.appShell}`}
      >
        {/* Fixed background layer — grid + scanlines + accent edges */}
        <GridBackground />

        {/* ── Header ───────────────────────────────────────────────── */}
        <header
          className={`relative z-10 border-b ${theme.border} bg-[#090b0f]/80 backdrop-blur-sm`}
        >
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <GradientLogo letter="NC" size="sm" />
              <div className="flex flex-col leading-tight">
                <span className={`text-sm font-semibold ${theme.text}`}>
                  Nicholas Cambre
                </span>
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
                >
                  neural console
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <NavLink href="/projects">Projects</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              <NavLink href="/jemma-lite" accent>
                Jemma
              </NavLink>
            </div>
          </nav>
        </header>

        {/* ── Main ─────────────────────────────────────────────────── */}
        <main className="relative z-10 mx-auto max-w-5xl px-6 py-12">
          {children}
        </main>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <footer className={`relative z-10 mt-20 border-t ${theme.border}`}>
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 px-6 py-6 sm:flex-row sm:items-center">
            <span className={`text-xs ${theme.muted} ${theme.mono}`}>
              © {new Date().getFullYear()} nicholascambre.dev
            </span>
            <StatusPill label="systems nominal" />
          </div>
        </footer>
      </body>
    </html>
  );
}

// ── NavLink ─────────────────────────────────────────────────────────────
// Two variants:
//   - default: slate border, hover teal
//   - accent (used on /jemma-lite): teal border at rest, brighter on hover
// Lets the "Jemma" nav item subtly stand out without screaming.

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  accent?: boolean;
}

function NavLink({ href, children, accent = false }: NavLinkProps) {
  const base = "rounded-lg border px-3 py-1.5 text-xs transition-colors";

  const variant = accent
    ? "border-[#00b8c8]/40 text-[#00b8c8] hover:border-[#00b8c8] hover:bg-[#00b8c8]/10"
    : `${theme.border} ${theme.textSoft} hover:border-[#00b8c8] hover:bg-[#101722]`;

  return (
    <Link href={href} className={`${base} ${theme.mono} ${variant}`}>
      {children}
    </Link>
  );
}