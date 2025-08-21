import Link from "next/link";
import { projects } from "@/app/data/projects";
import SkillsTicker from "@/app/components/SkillsTicker";

const featuredSlugs = ["jemma-ai", "home-automation"];

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

export default function Home() {
  const featured = projects.filter((p) => featuredSlugs.includes(p.slug));

  return (
    <section className="space-y-12">
      {/* Hero */}
      <div className="relative rounded-2xl shadow-lg bg-transparent text-white">
        <div className="relative p-8 md:p-12">
          <h1 className="text-4xl font-bold">Nicholas Cambre</h1>
          <p className="mt-1 text-lg/7 opacity-90">
            Systems & Automation Engineer • Seattle, WA
          </p>

          <p className="mt-4 max-w-3xl leading-relaxed opacity-90">
            Trends change fast, but durable systems never go out of style. My
            work is about stripping away excess and building practical
            foundations that stand the test of time. Whether it is an AI
            assistant, a smart home automation flow, or a streamlined server, my
            goal is the same: to make technology that feels effortless to use,
            resilient under pressure, and meaningful in the real world.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-xl px-4 py-2 bg-teal-400 text-black font-medium hover:bg-teal-300 transition shadow-sm"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="rounded-xl px-4 py-2 border border-white/60 text-white hover:bg-white/10 transition"
            >
              Get In Touch
            </Link>
            <Link
              href="/resume"
              className="rounded-xl px-4 py-2 border border-pink-400 text-pink-200 hover:bg-pink-400/10 transition"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Featured Projects</h2>

        <ul className="grid gap-6 md:grid-rows-2">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="block rounded-2xl p-6 hover:shadow-lg transition bg-transparent text-white border border-white/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {p.title}
                    </h3>
                    {p.tagline && (
                      <p className="mt-1 text-sm text-white/70">
                        {p.tagline}
                      </p>
                    )}
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full border border-white/40 text-white/70">
                    Case Study
                  </span>
                </div>

                {p.heroImage && (
                  <img
                    src={p.heroImage}
                    alt={p.title}
                    className="mt-4 w-full rounded-xl"
                  />
                )}

                {p.description && (
                  <p className="mt-4 text-sm text-white/80 line-clamp-3">
                    {p.description}
                  </p>
                )}

                {!!p.tags?.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
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

                <span className="mt-5 inline-block underline underline-offset-4 decoration-transparent hover:decoration-pink-400 hover:text-teal-300 transition">
                  Read more →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Highlighted Skills — ticker */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Highlighted Skills</h2>
        <SkillsTicker skills={highlightedSkills} speedMs={24000} />
      </div>
    </section>
  );
}
