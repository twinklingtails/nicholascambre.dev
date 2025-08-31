/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/app/data/projects";

// Static params for all projects
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
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
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <article className="space-y-8">
      {/* Header */}
      <div className="block rounded-2xl p-6 bg-transparent border border-white/40 text-white">
        <h1 className="text-3xl font-bold">{p.title}</h1>
        {p.tagline && (
          <p className="mt-2 text-white/70">{p.tagline}</p>
        )}
      </div>

      {/* Hero Image */}
      {p.heroImage && (
        <div className="block rounded-2xl overflow-hidden border border-white/40">
          <img
            src={p.heroImage}
            alt={p.title}
            className="w-full rounded-xl"
          />
        </div>
      )}

      {/* Description */}
      {p.description && (
        <div className="block rounded-2xl p-6 bg-transparent border border-white/40 text-white/80">
          <p>{p.description}</p>
        </div>
      )}
    </article>
  );
}
