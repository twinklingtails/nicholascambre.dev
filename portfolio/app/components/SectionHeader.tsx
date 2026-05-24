// app/components/SectionHeader.tsx
//
// The "// label" code-comment prefix + heading combo, used at the top
// of every content section. Reads as a terminal comment without being
// literal CLI mimicry. Keeps section headings consistent across pages.

import { theme } from "../lib/theme";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  /** Mono prefix in muted text. Default "//". Use ">" for action sections, etc. */
  prefix?: string;
  children: ReactNode;
}

export function SectionHeader({
  prefix = "//",
  children,
}: SectionHeaderProps) {
  return (
    <div className="flex items-baseline gap-3">
      <span className={`text-xs ${theme.mono} ${theme.muted}`}>{prefix}</span>
      <h2 className={`text-2xl font-semibold ${theme.text}`}>{children}</h2>
    </div>
  );
}