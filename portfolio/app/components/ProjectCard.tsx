// app/components/ProjectCard.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { theme } from "../lib/theme";
import { Card } from "./Card";

interface Project {
  slug: string;
  title: string;
  tagline?: string;
  description?: string;
  heroImage?: string;
  tags?: string[];
}

interface ProjectCardProps {
  project: Project;
  showBadge?: boolean;
}

export function ProjectCard({ project, showBadge = true }: ProjectCardProps) {
  // Track per-card image failure so a broken hero falls back to the
  // placeholder instead of showing the browser's "broken image" icon.
  const [imageFailed, setImageFailed] = useState(false);
  const showRealImage = project.heroImage && !imageFailed;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block transition-transform hover:-translate-y-0.5"
    >
      <Card
        surface="card"
        className="p-6 transition-colors hover:border-[#00b8c8]/40"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className={`text-xl font-semibold ${theme.text}`}>
              {project.title}
            </h3>
            {project.tagline && (
              <p className={`mt-1 text-sm ${theme.muted} ${theme.mono}`}>
                {project.tagline}
              </p>
            )}
          </div>
          {showBadge && (
            <span
              className={`shrink-0 rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider ${theme.border} ${theme.muted} ${theme.mono}`}
            >
              case study
            </span>
          )}
        </div>

        {showRealImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.heroImage}
            alt={project.title}
            onError={() => setImageFailed(true)}
            className={`mt-4 w-full rounded-lg border ${theme.border}`}
          />
        ) : (
          <ProjectThumbPlaceholder
            title={project.title}
            slug={project.slug}
          />
        )}

        {project.description && (
          <p
            className={`mt-4 text-sm leading-relaxed ${theme.textSoft} line-clamp-3`}
          >
            {project.description}
          </p>
        )}

        {!!project.tags?.length && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map(t => (
              <span
                key={t}
                className={`rounded-full border px-2 py-0.5 text-[10px] ${theme.border} ${theme.muted} ${theme.mono}`}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center gap-1.5">
          <span
            className={`text-xs ${theme.mono} ${theme.tealText} transition-colors group-hover:text-[#ff4fa3]`}
          >
            read more
          </span>
          <span
            className={`text-xs ${theme.mono} ${theme.tealText} transition-all group-hover:translate-x-0.5 group-hover:text-[#ff4fa3]`}
          >
            →
          </span>
        </div>
      </Card>
    </Link>
  );
}

// ── Placeholder ──────────────────────────────────────────────────────────
// Brand-gradient block with the project's first letter and slug, sized
// 16:9 so it matches the height a real hero image would take. Subtle
// grid overlay keeps it on-brand with the rest of the console aesthetic.

function ProjectThumbPlaceholder({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const initial = title.charAt(0).toUpperCase();
  return (
    <div
      className={`relative mt-4 flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border ${theme.border} ${theme.brandGradient}`}
    >
      {/* Texture: tiny grid layered over the gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]"
      />
      {/* Slug ribbon */}
      <span className="absolute bottom-2 left-3 text-[10px] uppercase tracking-[0.2em] text-white/70 font-mono">
        {slug}
      </span>
      {/* Big initial */}
      <span className="relative text-5xl font-bold text-white font-mono drop-shadow-lg">
        {initial}
      </span>
    </div>
  );
}