// app/about/page.tsx

import Image from "next/image";
import type React from "react";
import { Card } from "@/app/components/Card";
import { SectionHeader } from "@/app/components/SectionHeader";
import { StatusPill } from "@/app/components/StatusPill";
import { theme } from "@/app/lib/theme";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="space-y-4">
        <StatusPill label="based in seattle, wa" />
        <h1 className={`text-4xl font-semibold tracking-tight ${theme.text}`}>
          About
        </h1>
      </header>

      {/* ── Two-panel: Story + Right column stack ──────────────────── */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* ── Left column: story + principles ─────────────────────── */}
        <div className="space-y-6">
          {/* ── My Story ───────────────────────────────────────────── */}
          <Card className="p-6">
            <h2 className={`text-xl font-semibold ${theme.text}`}>My Story</h2>
            <p
              className={`mt-1 text-xs uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
            >
              louisiana → seattle
            </p>

            <div
              className={`mt-4 space-y-4 text-sm leading-relaxed ${theme.textSoft}`}
            >
              <p>
                I didn&apos;t come from a traditional engineering background.
                Most of what I know came from curiosity, rebuilding broken
                systems, and spending years figuring out how infrastructure
                works beneath the surface.
              </p>

              <p>
                I was born in Ukraine, raised in Louisiana, and eventually made
                my way to Seattle. Along the way, technology became less of a
                hobby and more of a way to create stability — systems that were
                understandable, reliable, and fully mine to operate.
              </p>

              <p>
                That mindset shaped everything I build now. From AI
                infrastructure like{" "}
                <strong className={theme.tealText}>Jemma</strong> to
                self-hosted automation systems and reverse-proxy environments, I
                care less about trends and more about durability. I like systems
                that are observable, maintainable, and still make sense six
                months later.
              </p>

              <p>
                Most of my work sits somewhere between infrastructure
                engineering, automation, and operational tooling. I&apos;m
                especially interested in local-first systems, resilient
                architecture, and reducing complexity without reducing
                capability.
              </p>

              <p>
                My guiding principle is simple:{" "}
                <span className={theme.brandGradientText}>
                  clarity over complexity
                </span>
                .
              </p>
            </div>
          </Card>

          {/* ── How I think about systems ─────────────────────────── */}
          <Card className="p-6">
            <h2 className={`text-xl font-semibold ${theme.text}`}>
              How I think about systems
            </h2>
            <p
              className={`mt-1 text-xs uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
            >
              working principles
            </p>

            <ul
              className={`mt-4 space-y-3 text-sm leading-relaxed ${theme.textSoft}`}
            >
              <li className="flex items-start gap-2">
                <span className={`mt-0.5 ${theme.tealText}`}>›</span>
                <span>
                  <strong className={theme.text}>
                    Clarity over complexity.
                  </strong>{" "}
                  The system you can&apos;t explain to your future self in six
                  months is the system that&apos;s going to bite you.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-0.5 ${theme.tealText}`}>›</span>
                <span>
                  <strong className={theme.text}>Boring beats clever.</strong>{" "}
                  Predictable infrastructure beats impressive infrastructure.
                  The stack I trust is the one nobody has to notice.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-0.5 ${theme.tealText}`}>›</span>
                <span>
                  <strong className={theme.text}>
                    Local-first by default.
                  </strong>{" "}
                  If a system needs the cloud to keep working, it&apos;s
                  renting its own behavior from someone else&apos;s policy.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-0.5 ${theme.tealText}`}>›</span>
                <span>
                  <strong className={theme.text}>
                    Observability before features.
                  </strong>{" "}
                  A feature you can&apos;t debug isn&apos;t a feature; it&apos;s
                  a future incident.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-0.5 ${theme.tealText}`}>›</span>
                <span>
                  <strong className={theme.text}>Ship what&apos;s real.</strong>{" "}
                  Aspirational architecture is fine when labeled as such. Lying
                  about what works is how systems rot.
                </span>
              </li>
            </ul>
          </Card>
        </div>

        {/* ── Right column: stack of related cards ─────────────────── */}
        <div className="space-y-6">
          {/* Portrait */}
          <Card className="p-6">
            <p
              className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
            >
              {"// nicholas"}
            </p>
            <div className="mt-4 flex justify-center">
              <div className={`rounded-full p-1 ${theme.brandGradient}`}>
                <Image
                  src="/me.jpg"
                  alt="Nicholas Cambre"
                  width={176}
                  height={176}
                  priority
                  className="h-44 w-44 rounded-full object-cover"
                />
              </div>
            </div>
          </Card>

          {/* Let's Connect */}
          <Card className="p-6">
            <h2 className={`text-xl font-semibold ${theme.text}`}>
              Let&apos;s Connect
            </h2>
            <p
              className={`mt-1 text-xs uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
            >
              channels open
            </p>

            <ul className="mt-4 space-y-2">
              <ContactLink
                href="mailto:nicholascambre0077@icloud.com"
                label="nicholascambre0077@icloud.com"
                icon={<MailIcon />}
              />
              <ContactLink
                href="https://www.linkedin.com/in/nicholascambre"
                label="linkedin.com/in/nicholascambre"
                icon={<LinkedInIcon />}
                external
              />
              <ContactLink
                href="https://github.com/twinklingtails"
                label="github.com/twinklingtails"
                icon={<GitHubIcon />}
                external
              />
            </ul>
          </Card>

          {/* Currently Available */}
          <Card className="p-6">
            <p
              className={`text-[10px] uppercase tracking-[0.2em] ${theme.tealText} ${theme.mono}`}
            >
              {"// currently available"}
            </p>
            <p className={`mt-2 text-sm ${theme.textSoft}`}>
              Open to roles in systems, automation, and AI tooling. Let&apos;s
              talk about building simple, durable software together.
            </p>
          </Card>

          {/* Right Now */}
          <Card className="p-6">
            <p
              className={`text-[10px] uppercase tracking-[0.2em] ${theme.tealText} ${theme.mono}`}
            >
              {"// right now"}
            </p>
            <ul className={`mt-3 space-y-2 text-sm ${theme.textSoft}`}>
              <li className="flex items-start gap-2">
                <span className={`mt-0.5 ${theme.tealText}`}>›</span>
                <span>Building Jemma&apos;s tool-calling layer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-0.5 ${theme.tealText}`}>›</span>
                <span>
                  Scaling the hosting platform from 7 to 15 sites by year-end
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-0.5 ${theme.tealText}`}>›</span>
                <span>
                  Finishing an Associate&apos;s, prepping Bachelor&apos;s
                  coursework
                </span>
              </li>
            </ul>
          </Card>

          {/* At a Glance */}
          <Card className="p-6">
            <p
              className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
            >
              {"// at a glance"}
            </p>
            <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className={theme.muted}>Timezone</dt>
              <dd className={theme.textSoft}>Pacific (UTC-8)</dd>

              <dt className={theme.muted}>Replies</dt>
              <dd className={theme.textSoft}>Async, within a day</dd>

              <dt className={theme.muted}>Studying</dt>
              <dd className={theme.textSoft}>
                Associate&apos;s → Bachelor&apos;s
              </dd>

              <dt className={theme.muted}>Open to</dt>
              <dd className={theme.textSoft}>
                Systems, automation, AI tooling
              </dd>
            </dl>
          </Card>
        </div>
      </div>

      {/* ── How I learned ──────────────────────────────────────────── */}
      <Card surface="panel" className="border-l-2 border-l-[#00b8c8] p-6">
        <p
          className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
        >
          {"// how i learned"}
        </p>

        <div
          className={`mt-3 space-y-4 text-base leading-relaxed ${theme.textSoft}`}
        >
          <p>
            Everything on this site was built before I&apos;d taken a single
            college class.
          </p>

          <p>
            YouTube. <em>Python 3 For Dummies</em>.{" "}
            <em>C++ For Dummies</em>. The llama.cpp source code. A lot of
            pair-programming with AI assistants when it sped things up, and a
            lot of stubbornly debugging by hand when it didn&apos;t.
          </p>

          <p>
            I&apos;m finishing an Associate&apos;s degree now and working toward
            a Bachelor&apos;s — not because what I build today required the
            credential, but because I want to formalize what I already know.
          </p>

          <p className={`pt-2 font-semibold ${theme.text}`}>
            If anyone tells you that real systems require a CS degree, this site
            is the counterexample.
          </p>
        </div>
      </Card>

      {/* ── Mission Statement ───────────────────────────────────────── */}
      <Card surface="panel" className="border-l-2 border-l-[#ff4fa3] p-6">
        <p
          className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
        >
          {"// mission"}
        </p>
        <blockquote
          className={`mt-2 text-lg italic leading-relaxed ${theme.textSoft}`}
        >
          &ldquo;Practical solutions for everyday challenges. I challenge the idea
          that programming requires advanced education by creating accessible,
          functional tools designed to solve real-world problems with clarity
          and efficiency.&rdquo;
        </blockquote>
      </Card>

      {/* ── Outside of Work ─────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeader>Outside of work</SectionHeader>

        <div className="grid gap-3 sm:grid-cols-3">
          <HobbyCard prefix="// pixels" label="Website creation & design" />
          <HobbyCard prefix="// play" label="Gaming + streaming" />
          <HobbyCard
            prefix="// outdoors"
            label="Exploring Seattle with Luna"
          />
        </div>
      </section>
    </div>
  );
}

// ── Subcomponents ──────────────────────────────────────────────────────

interface ContactLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}

function ContactLink({ href, label, icon, external }: ContactLinkProps) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`group flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors ${theme.border} hover:border-[#00b8c8] hover:bg-[#101722]`}
      >
        <span className="flex-none text-[#7a8699] transition-colors group-hover:text-[#00b8c8]">
          {icon}
        </span>
        <span className="font-mono text-sm text-[#d6e4f0] transition-colors group-hover:text-[#00b8c8]">
          {label}
        </span>
      </a>
    </li>
  );
}

function HobbyCard({ prefix, label }: { prefix: string; label: string }) {
  return (
    <Card className="p-4">
      <p
        className={`text-[10px] uppercase tracking-[0.2em] ${theme.tealText} ${theme.mono}`}
      >
        {prefix}
      </p>
      <p className={`mt-1 text-sm ${theme.textSoft}`}>{label}</p>
    </Card>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path d="m22 8-10 6L2 8" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zm7.5 0h4.78v2.05h.07c.67-1.27 2.3-2.6 4.73-2.6C21.9 8.43 24 10.6 24 14.4V24h-5v-8.34c0-1.99-.04-4.55-2.77-4.55-2.77 0-3.2 2.16-3.2 4.4V24H7.5V8.98z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12.4c0 5.26 3.42 9.72 8.16 11.3.6.1.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.32.74-4.02-1.6-4.02-1.6-.55-1.43-1.34-1.8-1.34-1.8-1.1-.77.08-.76.08-.76 1.22.09 1.86 1.28 1.86 1.28 1.08 1.9 2.82 1.35 3.5 1.03.11-.79.42-1.35.77-1.66-2.65-.31-5.43-1.36-5.43-6.06 0-1.34.47-2.44 1.25-3.3-.13-.31-.54-1.58.12-3.3 0 0 1.02-.33 3.35 1.26a11.6 11.6 0 0 1 6.1 0c2.33-1.59 3.35-1.26 3.35-1.26.66 1.72.25 2.99.12 3.3.78.86 1.25 1.96 1.25 3.3 0 4.71-2.79 5.74-5.45 6.05.43.37.82 1.1.82 2.23 0 1.6-.02 2.9-.02 3.3 0 .32.22.69.83.57 4.73-1.58 8.15-6.03 8.15-11.29A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}