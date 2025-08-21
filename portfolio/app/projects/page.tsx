import Link from "next/link";
import { projects } from "@/app/data/projects";

export default function ProjectsIndex() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <p className="text-white/80">
          Practical solutions for everyday challenges. I challenge the idea that programming
          requires advanced education by creating accessible, functional tools designed to solve
          real-world problems with clarity and efficiency.
        </p>
      </header>

      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="block rounded-2xl p-6 hover:shadow-lg transition bg-transparent text-white border border-white/40"
            >
              <h2 className="text-xl font-semibold text-white">{p.title}</h2>
              {p.tagline && (
                <p className="text-sm mt-1 text-white/70">{p.tagline}</p>
              )}

              {!!p.tags?.length && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full border border-white/40 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <span className="mt-4 inline-block underline underline-offset-4 decoration-transparent hover:decoration-pink-400 hover:text-teal-300 transition">
                View project →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
