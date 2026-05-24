// app/components/SkillsTicker.tsx
"use client";

import { theme } from "../lib/theme";

type SkillsTickerProps = {
  skills: string[];
  speedMs?: number;
  pauseOnHover?: boolean;
};

// Cycle chips through the brand palette so the row reads as a layered
// stack rather than a flat list. Change to ["teal"] for a calmer feel.
const CHIP_VARIANTS = ["teal", "blue", "pink", "neutral"] as const;

export default function SkillsTicker({
  skills,
  speedMs = 25000,
  pauseOnHover = true,
}: SkillsTickerProps) {
  // Duplicate so the animation can loop seamlessly at the -50% point.
  const row = [...skills, ...skills];

  return (
    <div
      className={`relative overflow-hidden rounded-xl border ${theme.border} ${theme.card}`}
    >
      <div className={`ticker ${pauseOnHover ? "hover-pause" : ""}`}>
        <ul className="track">
          {row.map((skill, idx) => {
            const variant = CHIP_VARIANTS[idx % CHIP_VARIANTS.length];
            return (
              <li key={`${skill}-${idx}`} className={`chip chip-${variant}`}>
                {skill}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Fade masks at the edges so chips drift in/out instead of hard-cutting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0d1117] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0d1117] to-transparent"
      />

      <style jsx>{`
        .ticker {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          height: 56px;
        }
        .track {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          white-space: nowrap;
          padding: 0 0.75rem;
          animation: scroll linear ${speedMs}ms infinite;
        }
        .hover-pause:hover .track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .track {
            animation: none;
          }
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .chip {
          display: inline-flex;
          align-items: center;
          height: 30px;
          padding: 0 12px;
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          font-size: 0.75rem;
          letter-spacing: 0.01em;
          line-height: 1;
          border-radius: 9999px;
          border: 1px solid;
          background: #050505;
          user-select: none;
        }
        .chip-teal {
          color: #00b8c8;
          border-color: rgba(0, 184, 200, 0.35);
        }
        .chip-blue {
          color: #1677ff;
          border-color: rgba(22, 119, 255, 0.35);
        }
        .chip-pink {
          color: #ff4fa3;
          border-color: rgba(255, 79, 163, 0.35);
        }
        .chip-neutral {
          color: #d6e4f0;
          border-color: #202936;
        }
      `}</style>
    </div>
  );
}