// app/lib/content.ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Metadata-only shape — what list pages need. */
export interface ProjectMeta {
  slug: string;
  title: string;
  tagline?: string;
  description?: string;
  tags?: string[];
  heroImage?: string;
  date?: string;
  published?: boolean;
  jemmaContext?: string;
}

/** Full project shape — metadata + MDX body. */
export interface Project extends ProjectMeta {
  body: string;
}

// ────────────────────────────────────────────────────────────────────────
// Project readers
// ────────────────────────────────────────────────────────────────────────

/** Return all published projects, sorted by date (newest first). */
export async function getAllProjects(): Promise<ProjectMeta[]> {
  const dir = path.join(CONTENT_DIR, "projects");

  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }

  const items: ProjectMeta[] = [];
  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.mdx$/, "");
    const raw = await fs.readFile(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    if (data.published === false) continue;
    items.push({
      slug,
      title: data.title,
      tagline: data.tagline,
      description: data.description,
      tags: data.tags,
      heroImage: data.heroImage,
      date:
  typeof data.date === "string"
    ? data.date
    : data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : undefined,      published: data.published,
      jemmaContext: data.jemmaContext,
    });
  }

  // Newest first. Projects without a date sink to the bottom.
  items.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  return items;
}

/** Load one project (metadata + body). Returns null if not found. */
export async function getProject(slug: string): Promise<Project | null> {
  const file = path.join(CONTENT_DIR, "projects", `${slug}.mdx`);
  try {
    const raw = await fs.readFile(file, "utf-8");
    const { data, content } = matter(raw);
    if (data.published === false) return null;
    return {
      slug,
      title: data.title,
      tagline: data.tagline,
      description: data.description,
      tags: data.tags,
      heroImage: data.heroImage,
      date:
  typeof data.date === "string"
    ? data.date
    : data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : undefined,      published: data.published,
      jemmaContext: data.jemmaContext,
      body: content,
    };
  } catch {
    return null;
  }
}