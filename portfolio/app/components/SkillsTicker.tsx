"use client";

type SkillsTickerProps = {
  skills: string[];
  speedMs?: number; // duration of one full loop; default ~25s
  pauseOnHover?: boolean;
};

export default function SkillsTicker({
  skills,
  speedMs = 25000,
  pauseOnHover = true,
}: SkillsTickerProps) {
  // Duplicate the list so the animation can loop seamlessly
  const row = [...skills, ...skills];

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
      <div className={`ticker ${pauseOnHover ? "hover-pause" : ""}`}>
        <ul className="track">
          {row.map((skill, idx) => (
            <li key={`${skill}-${idx}`} className="chip">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .ticker {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          height: 56px; /* comfy height */
        }
        .track {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          white-space: nowrap;
          padding: 0 0.5rem;
          /* The trick: make the row wide and slide it left forever */
          animation: scroll linear ${speedMs}ms infinite;
        }
        /* pause on hover (if enabled) */
        .hover-pause:hover .track {
          animation-play-state: paused;
        }
        /* reduce motion: respect user preference */
        @media (prefers-reduced-motion: reduce) {
          .track {
            animation: none;
          }
        }
        /* Seamless scroll:
           Start at 0, move left by 50% (we duplicated items, so 50% = one full set)
        */
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
          height: 36px;
          padding: 0 12px;
          font-size: 0.875rem;
          line-height: 1;
          border-radius: 9999px;
          border: 1px solid var(--chip-border);
          background: var(--chip-bg);
          color: var(--chip-fg);
          user-select: none;
        }
        :global(:root) {
          --chip-border: rgba(0, 0, 0, 0.12);
          --chip-bg: rgba(255, 255, 255, 0.7);
          --chip-fg: rgba(17, 24, 39, 1); /* neutral-900 */
        }
        :global(html.dark) {
          --chip-border: rgba(255, 255, 255, 0.16);
          --chip-bg: rgba(17, 24, 39, 0.7); /* neutral-900/70 */
          --chip-fg: rgba(229, 231, 235, 1); /* neutral-200 */
        }
      `}</style>
    </div>
  );
}
