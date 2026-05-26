// app/page.tsx

import Link from "next/link";
import { getAllProjects } from "@/app/lib/content";
import SkillsTicker from "@/app/components/SkillsTicker";
import { ProjectCard } from "@/app/components/ProjectCard";
import { SectionHeader } from "@/app/components/SectionHeader";
import { StatusPill } from "@/app/components/StatusPill";
import { theme } from "@/app/lib/theme";

const featuredSlugs = ["jemma-ai", "jemma-voice-pipeline"];

const highlightedSkills = [
  "TypeScript",
  "Next.js (App Router)",
  "React",
  "Python",
  "Linux",
  "Home Assistant",
  "LLMs & Orchestration",
  "MQTT",
  "Docker",
  "Nginx",
  "Cloudflare",
  "Git",
  "Automation",
  "DX",
  "Resilient Systems",
];

export default async function Home() {
  const allProjects = await getAllProjects();
  const featured = allProjects.filter(p => featuredSlugs.includes(p.slug));

  return (
    <div className="space-y-16">
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section>
        <div className="mb-6">
          <StatusPill label="online · seattle, wa" />
        </div>

        <h1
          className={`text-4xl font-semibold leading-[1.15] tracking-tight md:text-5xl ${theme.text}`}
        >
          Trends change fast.{" "}
          <span className={theme.brandGradientText}>
            Durable systems
          </span>{" "}
          never go out of style.
        </h1>

        <p
          className={`mt-4 text-xs uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
        >
          nicholas cambre · systems &amp; automation engineer · seattle, wa
        </p>

        <p
          className={`mt-6 max-w-2xl text-base leading-relaxed ${theme.textSoft}`}
        >
          My work is about stripping away excess and building practical
          foundations that stand the test of time. Whether it&apos;s an AI
          assistant, a smart-home automation flow, or a streamlined server, the
          goal is the same: technology that feels effortless to use, resilient
          under pressure, and meaningful in the real world.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${theme.sendButton}`}
          >
            View my work
          </Link>
          <Link
            href="/contact"
            className={`rounded-lg border px-4 py-2 text-sm transition-colors ${theme.ghostButton}`}
          >
            Get in touch
          </Link>
          <Link
            href="/resume"
            className="rounded-lg border border-[#ff4fa3]/40 px-4 py-2 text-sm text-[#ff4fa3] transition-colors hover:border-[#ff4fa3] hover:bg-[#ff4fa3]/10"
          >
            Resume
          </Link>
        </div>
      </section>

      {/* ── Featured Projects ───────────────────────────────────────── */}
      <section className="space-y-6">
        <SectionHeader>Featured projects</SectionHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map(p => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* ── Highlighted Skills ──────────────────────────────────────── */}
      <section className="space-y-6">
        <SectionHeader>Stack</SectionHeader>
        <SkillsTicker skills={highlightedSkills} speedMs={24000} />
      </section>
    </div>
  );
}