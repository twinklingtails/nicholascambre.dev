// app/components/GradientLogo.tsx

import { theme } from "../lib/theme";

interface GradientLogoProps {
  /** Text inside the disc — typically initials or a single letter. */
  letter: string;
  /** sm = 28px (header), md = 32px (header w/ subtitle), lg = 56px (hero). */
  size?: "sm" | "md" | "lg";
}

/**
 * The teal→blue→pink gradient disc that appears as Jemma's "J", Felix's
 * "F", the brand "NC", and the hero orb on the home page. Same gradient
 * everywhere — that's what makes the brand read as one thing.
 */
export function GradientLogo({ letter, size = "md" }: GradientLogoProps) {
  const sizeClass =
    size === "sm"
      ? "h-7 w-7 text-xs"
      : size === "lg"
        ? "h-14 w-14 text-lg"
        : "h-8 w-8 text-xs";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${sizeClass} ${theme.brandGradient}`}
    >
      {letter}
    </span>
  );
}