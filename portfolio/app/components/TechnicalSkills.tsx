// app/components/TechnicalSkills.tsx
type Skill = {
  name: string;
  level?: "learning" | "working" | "advanced" | "expert";
  note?: string; // short context like "LLM tooling", "MQTT automations", etc.
};

type SkillSection = {
  title: string;
  items: Skill[];
};

const sections: SkillSection[] = [
  {
    title: "Languages",
    items: [
      { name: "TypeScript", level: "advanced" },
      { name: "JavaScript", level: "advanced" },
      { name: "Python", level: "advanced", note: "AI/automation tooling" },
      { name: "Bash", level: "working" },
      { name: "SQL", level: "working" },
    ],
  },
  {
    title: "Frameworks & Runtime",
    items: [
      { name: "Next.js (App Router)", level: "advanced" },
      { name: "React", level: "advanced" },
      { name: "Node.js", level: "working" },
      { name: "Tailwind CSS", level: "advanced" },
    ],
  },
  {
    title: "AI & Automation",
    items: [
      { name: "LLMs (local & API)", level: "advanced", note: "Reasoning & orchestration" },
      { name: "Home Assistant", level: "advanced", note: "Dashboards & automations" },
      { name: "MQTT", level: "working" },
      { name: "Selenium", level: "working", note: "Task automation" },
      { name: "PyTorch", level: "learning" },
    ],
  },
  {
    title: "DevOps & Infra",
    items: [
      { name: "Linux", level: "advanced" },
      { name: "Docker", level: "working" },
      { name: "Nginx", level: "working" },
      { name: "Cloudflare", level: "working" },
      { name: "Git", level: "advanced" },
    ],
  },
  {
    title: "Databases & Messaging",
    items: [
      { name: "PostgreSQL", level: "working" },
      { name: "SQLite", level: "working" },
      { name: "Redis", level: "learning" },
    ],
  },
];

const levelToLabel: Record<NonNullable<Skill["level"]>, string> = {
  learning: "Learning",
  working: "Working proficiency",
  advanced: "Advanced",
  expert: "Expert",
};

const levelToBars: Record<NonNullable<Skill["level"]>, number> = {
  learning: 2,
  working: 3,
  advanced: 4,
  expert: 5,
};

function Proficiency({ level }: { level?: Skill["level"] }) {
  if (!level) return null;
  const filled = levelToBars[level];
  const total = 5;
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={[
              "h-1.5 w-6 rounded-sm",
              i < filled ? "bg-teal-500/90" : "bg-neutral-300 dark:bg-neutral-700",
            ].join(" ")}
          />
        ))}
      </div>
      <span className="text-xs text-neutral-600 dark:text-neutral-400">
        {levelToLabel[level]}
      </span>
    </div>
  );
}

export default function TechnicalSkills() {
  return (
    <section className="rounded-2xl bg-white/80 dark:bg-neutral-900/80 p-8 shadow-lg backdrop-blur-md">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Technical Skills</h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Clarity over complexity — practical tools, durable systems.
          </p>
        </div>
        {/* Legend */}
        <div className="hidden md:flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-6 rounded-sm bg-teal-500/90" />
            Strong
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-6 rounded-sm bg-neutral-300 dark:bg-neutral-700" />
            Building
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {section.title}
            </h3>

            <ul className="mt-4 space-y-4">
              {section.items.map((s) => (
                <li key={s.name} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    {s.note && (
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                        {s.note}
                      </div>
                    )}
                  </div>
                  <Proficiency level={s.level} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Optional tags block */}
      <div className="mt-6 flex flex-wrap gap-2">
        {["Accessibility", "DX", "Automation", "Resilience", "Simplicity"].map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 rounded-full border border-neutral-300 dark:border-neutral-700"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
