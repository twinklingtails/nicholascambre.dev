import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/app/data/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const p = projects.find((x) => x.slug === params.slug);
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

export default function ProjectPage({ params }: { params: Params }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return notFound();

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

      <section className="prose dark:prose-invert max-w-none">
        <p>{p.description}</p>
        {/* Add richer sections/screenshots here */}
      </section>
    </article>
  );
}
