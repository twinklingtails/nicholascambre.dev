// app/projects/page.tsx

import { getAllProjects } from "@/app/lib/content";
import { ProjectCard } from "@/app/components/ProjectCard";
import { SectionHeader } from "@/app/components/SectionHeader";
import { StatusPill } from "@/app/components/StatusPill";
import { theme } from "@/app/lib/theme";

interface OtherWorkItem {
  title: string;
  tagline: string;
  tech?: string[];
}

const OTHER_WORK: OtherWorkItem[] = [
  {
    title: "Multi-tenant Next.js hosting",
    tagline:
      "Writing and maintaining 7 production Next.js sites for content creators and their brands on a single self-managed server blade. On track to host 15 by year-end.",
    tech: ["Next.js", "Linux", "NGINX", "Docker", "Multi-tenant"],
  },
  {
    title: "Live stream automation",
    tagline:
      "JavaScript event tooling and runtime automations for streaming operations — overlays, integrations, and on-air workflows.",
    tech: ["JavaScript", "Node.js", "Real-time"],
  },
];

export default async function ProjectsIndex() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-12">
      {/* ── Header ───────────────────────────────────────────── */}
      <header className="space-y-4">
        <StatusPill
          label={`${projects.length} projects logged`}
          pulse={false}
        />

        <h1 className={`text-4xl font-semibold tracking-tight ${theme.text}`}>
          Projects
        </h1>

        <p
          className={`max-w-2xl text-base leading-relaxed ${theme.textSoft}`}
        >
          Practical systems built around infrastructure, automation,
          observability, and local-first engineering. Most projects start with
          a simple idea: own the stack, reduce friction, and make the system
          easier to operate over time.
        </p>
      </header>

      {/* ── Main case studies ───────────────────────────────── */}
      <section className="space-y-6">
        <SectionHeader>Case studies</SectionHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} showBadge={false} />
          ))}
        </div>
      </section>

      {/* ── Other work ──────────────────────────────────────── */}
      <section className="space-y-6">
        <SectionHeader>Other work</SectionHeader>

        <p className={`max-w-2xl text-sm ${theme.muted}`}>
          Smaller deployments, experiments, and side projects. Included for
          completeness rather than full case studies.
        </p>

        <ul className="space-y-3">
          {OTHER_WORK.map((item) => (
            <li
              key={item.title}
              className={`rounded-lg border px-4 py-3 ${theme.border} ${theme.card}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className={`text-base font-semibold ${theme.text}`}>
                    {item.title}
                  </h3>

                  <p className={`mt-0.5 text-sm ${theme.textSoft}`}>
                    {item.tagline}
                  </p>
                </div>

                {item.tech && (
                  <div className="flex shrink-0 flex-wrap justify-end gap-1">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className={`rounded-full border px-2 py-0.5 text-[10px] ${theme.border} ${theme.muted} ${theme.mono}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}