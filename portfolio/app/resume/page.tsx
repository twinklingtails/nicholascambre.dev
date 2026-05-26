// app/resume/page.tsx

import Link from "next/link";
import { Card } from "@/app/components/Card";
import { SectionHeader } from "@/app/components/SectionHeader";
import { StatusPill } from "@/app/components/StatusPill";
import { theme } from "@/app/lib/theme";

interface SelectedWork {
  slug: string;
  title: string;
  tagline: string;
  tech: string[];
}

const SKILLS: { category: string; items: string[] }[] = [
  {
    category: "Languages",
    items: ["TypeScript", "Python", "C++", "JavaScript", "Bash"],
  },
  {
    category: "Frameworks & Runtimes",
    items: [
      "Next.js (App Router)",
      "React",
      "Node.js",
      "TailwindCSS",
      "PyTorch",
      "llama.cpp",
    ],
  },
  {
    category: "Infrastructure",
    items: [
      "Linux",
      "Docker",
      "NGINX",
      "PM2",
      "Cloudflare",
      "Tailscale",
      "Home Assistant",
    ],
  },
  {
    category: "Data & Real-time",
    items: ["MQTT", "Server-Sent Events", "WebSockets", "Node-RED", "MDX"],
  },
  {
    category: "AI & Audio",
    items: [
      "Local LLM inference",
      "Neural TTS",
      "Whisper (STT)",
      "GPU inference",
      "Tool orchestration",
    ],
  },
  {
    category: "Practices",
    items: [
      "Self-hosting",
      "Multi-tenant deployments",
      "Observability",
      "Reverse proxy architecture",
      "Server hardening",
    ],
  },
];

const SELECTED_WORK: SelectedWork[] = [
  {
    slug: "jemma-ai",
    title: "Jemma AI",
    tagline:
      "Local-first AI assistant built from scratch — C++ inference, streaming voice, real auth, tool calling.",
    tech: ["C++", "llama.cpp", "Next.js", "SSE", "Tailscale"],
  },
  {
    slug: "managed-self-hosted-web-platform",
    title: "Managed Self-Hosted Web Platform",
    tagline:
      "Multi-tenant Next.js hosting — 7 production sites for content creators, scaling to 15 by year-end.",
    tech: ["Next.js", "Docker", "NGINX", "PM2", "Cloudflare"],
  },
  {
    slug: "server-hardening",
    title: "Server Hardening",
    tagline:
      "Layered Linux security and operational hardening. Includes a real cryptominer-incident response narrative.",
    tech: ["Linux", "SSH", "Docker", "Tailscale"],
  },
  {
    slug: "home-automation",
    title: "Home Automation Platform",
    tagline:
      "Local-first smart-home infrastructure that keeps working when the cloud doesn't.",
    tech: ["Home Assistant", "MQTT", "Node-RED", "UniFi"],
  },
  {
    slug: "cloudflare-nginx-edge",
    title: "Cloudflare + NGINX Edge",
    tagline:
      "Self-hosted edge routing that exposes internal services without giving up control of the stack underneath.",
    tech: ["Cloudflare", "NGINX", "Docker"],
  },
  {
    slug: "jemma-voice",
    title: "Jemma Voice Pipeline",
    tagline:
      "Local neural text-to-speech, GLaDOS-inspired, 23ms per sentence on a 2080 Ti.",
    tech: ["Python", "PyTorch", "Neural TTS"],
  },
];

export default function ResumePage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <StatusPill label="online · seattle, wa" />

        <h1 className={`text-4xl font-semibold tracking-tight ${theme.text}`}>
          Resume
        </h1>

        <p
          className={`text-xs uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
        >
          nicholas cambre · systems &amp; automation engineer · seattle, wa
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="/Nicholas_Cambre_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${theme.sendButton}`}
          >
            Download PDF
          </a>

          <Link
            href="/contact"
            className={`rounded-lg border px-4 py-2 text-sm transition-colors ${theme.ghostButton}`}
          >
            Get in touch
          </Link>

          <Link
            href="/projects"
            className="rounded-lg border border-[#ff4fa3]/40 px-4 py-2 text-sm text-[#ff4fa3] transition-colors hover:border-[#ff4fa3] hover:bg-[#ff4fa3]/10"
          >
            Browse projects
          </Link>
        </div>
      </header>

      <Card surface="panel" className="border-l-2 border-l-[#00b8c8] p-6">
        <p
          className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
        >
          {"// summary"}
        </p>

        <p className={`mt-3 text-base leading-relaxed ${theme.textSoft}`}>
          Self-taught systems and automation engineer based in Seattle. Build
          local-first AI infrastructure, multi-tenant hosting platforms, and
          resilient self-hosted environments. Currently operate 7 production
          Next.js sites for content creators on a single server blade, with a
          path to 15 by year-end. Comfortable across the stack — from C++
          inference servers to TypeScript frontends to Linux operational
          hardening — and biased toward boring, durable infrastructure over
          impressive-looking complexity.
        </p>
      </Card>

      <section className="space-y-6">
        <SectionHeader>Skills</SectionHeader>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group) => (
            <Card key={group.category} className="p-5">
              <p
                className={`text-[10px] uppercase tracking-[0.2em] ${theme.tealText} ${theme.mono}`}
              >
                {`// ${group.category.toLowerCase()}`}
              </p>

              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={`rounded-full border px-2 py-0.5 text-[11px] ${theme.border} ${theme.textSoft} ${theme.mono}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader>Selected work</SectionHeader>

        <div className="space-y-3">
          {SELECTED_WORK.map((work) => (
            <Link
              key={work.slug}
              href={`/projects/${work.slug}`}
              className="group block"
            >
              <Card className="p-5 transition-colors hover:border-[#00b8c8]/40">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className={`text-base font-semibold ${theme.text}`}>
                    {work.title}
                  </h3>

                  <span
                    className={`shrink-0 text-xs ${theme.mono} ${theme.tealText} transition-all group-hover:translate-x-0.5 group-hover:text-[#ff4fa3]`}
                  >
                    case study →
                  </span>
                </div>

                <p className={`mt-1 text-sm ${theme.textSoft}`}>
                  {work.tagline}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {work.tech.map((t) => (
                    <span
                      key={t}
                      className={`rounded-full border px-2 py-0.5 text-[10px] ${theme.border} ${theme.muted} ${theme.mono}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader>Education</SectionHeader>

        <Card className="space-y-4 p-6">
          <div>
            <p
              className={`text-[10px] uppercase tracking-[0.2em] ${theme.tealText} ${theme.mono}`}
            >
              {"// formal"}
            </p>

            <ul className={`mt-2 space-y-1 text-sm ${theme.textSoft}`}>
              <li className="flex items-start gap-2">
                <span className={`mt-0.5 ${theme.tealText}`}>›</span>
                <span>Associate&apos;s degree — currently in progress</span>
              </li>

              <li className="flex items-start gap-2">
                <span className={`mt-0.5 ${theme.tealText}`}>›</span>
                <span>
                  Bachelor&apos;s degree — planned coursework following the
                  Associate&apos;s
                </span>
              </li>
            </ul>
          </div>

          <div>
            <p
              className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
            >
              {"// where i actually learned"}
            </p>

            <p className={`mt-2 text-sm leading-relaxed ${theme.textSoft}`}>
              Everything on this site was built before any formal CS coursework.
              The real curriculum: YouTube tutorials,{" "}
              <em>Python 3 For Dummies</em>, <em>C++ For Dummies</em>, reading
              the llama.cpp source code line by line, AI pair-programming where
              it sped things up, and a lot of breaking things and figuring out
              why. Now formalizing what I already know.
            </p>
          </div>
        </Card>
      </section>

      <Card surface="panel" className="border-l-2 border-l-[#ff4fa3] p-6">
        <p
          className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
        >
          {"// available"}
        </p>

        <p className={`mt-3 text-base leading-relaxed ${theme.textSoft}`}>
          Open to roles in systems engineering, infrastructure, automation, and
          AI tooling. Especially interested in teams building self-hosted,
          local-first, or hybrid systems where operational discipline matters.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${theme.sendButton}`}
          >
            Get in touch
          </Link>

          <a
            href="/Nicholas_Cambre_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-lg border px-4 py-2 text-sm transition-colors ${theme.ghostButton}`}
          >
            Download PDF
          </a>
        </div>
      </Card>
    </div>
  );
}