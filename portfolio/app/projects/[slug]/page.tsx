/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/app/data/projects";
import { projectContent } from  ".../content";

// In this project, Next types `params` as a Promise
type ParamsPromise = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: ParamsPromise }
): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} • Projects`,
    description: p.tagline ?? p.description?.slice(0, 160),
    openGraph: {
      title: p.title,
      description: p.tagline ?? p.description,
      images: p.heroImage ? [p.heroImage] : [],
    },
  };
}

export default async function ProjectPage(
  { params }: { params: ParamsPromise }
) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{p.title}</h1>
        {p.tagline && (
          <p className="text-neutral-600 dark:text-neutral-300">{p.tagline}</p>
        )}
      </header>

      {p.heroImage && (
        <img src={p.heroImage} alt={p.title} className="w-full rounded-xl" />
      )}

      {p.description && (
        <section className="prose dark:prose-invert max-w-none">
          <p>{p.description}</p>
        </section>
      )}
    </article>
  );
}
