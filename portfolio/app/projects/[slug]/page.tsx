// app/projects/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProject } from "@/app/lib/content";
import { mdxComponents } from "@/app/lib/mdx-components";
import { StatusPill } from "@/app/components/StatusPill";
import { theme } from "@/app/lib/theme";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
 const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} • Projects`,
    description: project.tagline ?? project.description?.slice(0, 160),
    openGraph: {
      title: project.title,
      description: project.tagline ?? project.description,
      images: project.heroImage ? [project.heroImage] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="space-y-4">
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(t => (
              <span
                key={t}
                className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${theme.border} ${theme.muted} ${theme.mono}`}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <h1
          className={`text-4xl font-semibold tracking-tight ${theme.text}`}
        >
          {project.title}
        </h1>

        {project.tagline && (
          <p
            className={`max-w-2xl text-base leading-relaxed ${theme.textSoft}`}
          >
            {project.tagline}
          </p>
        )}

        {project.date && (
          <StatusPill label={project.date} variant="muted" pulse={false} />
        )}
      </header>

      {/* Hero image */}
      {project.heroImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.heroImage}
          alt={project.title}
          className={`w-full rounded-xl border ${theme.border}`}
        />
      )}

      {/* MDX body */}
      <div className="max-w-3xl">
        <MDXRemote source={project.body} components={mdxComponents} />
      </div>
    </article>
  );
}