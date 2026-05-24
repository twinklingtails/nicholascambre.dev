import type { ReactNode } from "react";
import { theme } from "../lib/theme";

interface CardProps {
  children: ReactNode;
  /** "panel" = darker chrome surface. "card" (default) = lighter content. */
  surface?: "panel" | "card";
  /** Extra Tailwind classes for padding, max-width, etc. */
  className?: string;
}

export function Card({
  children,
  surface = "card",
  className = "",
}: CardProps) {
  const surfaceClass = surface === "panel" ? theme.panel : theme.card;
  return (
    <div className={`rounded-xl border ${surfaceClass} ${className}`}>
      {children}
    </div>
  );
}