// app/projects/page.tsx

import { projects } from "@/app/data/projects";
import { ProjectCard } from "@/app/components/ProjectCard";
import { SectionHeader } from "@/app/components/SectionHeader";
import { StatusPill } from "@/app/components/StatusPill";
import { theme } from "@/app/lib/theme";

export default function ProjectsIndex() {
  return (
    <div className="space-y-12">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="space-y-4">
        <StatusPill label={`${projects.length} projects logged`} pulse={false} />

        <h1 className={`text-4xl font-semibold tracking-tight ${theme.text}`}>
          Projects
        </h1>

        <p className={`max-w-2xl text-base leading-relaxed ${theme.textSoft}`}>
          Practical solutions for everyday challenges. I challenge the idea
          that programming requires advanced education by creating accessible,
          functional tools designed to solve real-world problems with clarity
          and efficiency.
        </p>
      </header>

      {/* ── Grid ────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <SectionHeader>All projects</SectionHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map(p => (
            <ProjectCard key={p.slug} project={p} showBadge={false} />
          ))}
        </div>
      </section>
    </div>
  );
}