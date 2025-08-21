import Link from "next/link";
import { projects } from "@/app/data/projects";

export default function ProjectsIndex() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          Practical solutions for everday challenges. I challenge the idea that programming
	  requires advanced education by creating accessible, functional tools designed to solve real-world problems with clarity and efficiency.  
        </p>
      </header>

      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="block rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{p.title}</h2>
              {p.tagline && <p className="text-sm mt-1 opacity-80">{p.tagline}</p>}
              {!!p.tags?.length && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full border border-neutral-300 dark:border-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
