// app/contact/page.tsx

import { Card } from "@/app/components/Card";
import { SectionHeader } from "@/app/components/SectionHeader";
import { StatusPill } from "@/app/components/StatusPill";
import { theme } from "@/app/lib/theme";
import type { ReactNode } from "react";

const CHANNELS: Channel[] = [
  {
    label: "Email",
    handle: "nicholascambre0077@icloud.com",
    href: "mailto:nicholascambre0077@icloud.com",
    note: "Best for project inquiries or anything that needs a real reply.",
    primary: true,
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/nicholascambre",
    href: "https://www.linkedin.com/in/nicholascambre",
    note: "Professional history and recruiter messages.",
    external: true,
  },
  {
    label: "GitHub",
    handle: "github.com/twinklingtails",
    href: "https://github.com/twinklingtails",
    note: "Code, side projects, and the source for this site.",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-12">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill label="online · pacific time" />
          <StatusPill
            label="replies within a day"
            variant="pink"
            pulse={false}
          />
        </div>

        <h1 className={`text-4xl font-semibold tracking-tight ${theme.text}`}>
          Contact
        </h1>

        <p className={`max-w-2xl text-base leading-relaxed ${theme.textSoft}`}>
          Email is fastest. I read every message and reply to most within a day.
          I&apos;m always interested in projects involving AI, automation, home
          labs, or anything where stripping away complexity would make a real
          difference.
        </p>
      </header>

      {/* ── Channels ────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <SectionHeader>Channels</SectionHeader>

        <div className="space-y-3">
          {CHANNELS.map((channel) => (
            <ChannelRow key={channel.label} channel={channel} />
          ))}
        </div>
      </section>

      {/* ── Best fit ────────────────────────────────────────────────── */}
      <Card surface="panel" className="border-l-2 border-l-[#ff4fa3] p-6">
        <p
          className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
        >
          // best fit
        </p>

        <ul className={`mt-3 space-y-2 text-sm ${theme.textSoft}`}>
          <BestFitItem>
            Roles in systems, automation, infrastructure, or AI tooling.
          </BestFitItem>

          <BestFitItem>
            Contracts to build internal tools, agents, or developer experience.
          </BestFitItem>

          <BestFitItem>
            Collaborations on local-first, resilient, or home-lab projects.
          </BestFitItem>

          <BestFitItem>
            Anyone curious about Jemma, voice control, or smart-home setups.
          </BestFitItem>
        </ul>
      </Card>
    </div>
  );
}

// ── Types ───────────────────────────────────────────────────────────────

interface Channel {
  label: string;
  handle: string;
  href: string;
  note: string;
  primary?: boolean;
  external?: boolean;
}

// ── Subcomponents ──────────────────────────────────────────────────────

function BestFitItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 text-[#ff4fa3]">•</span>
      <span>{children}</span>
    </li>
  );
}

function ChannelRow({ channel }: { channel: Channel }) {
  return (
    <a
      href={channel.href}
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noopener noreferrer" : undefined}
      className="group block"
    >
      <Card
        className={`px-6 py-4 transition-colors hover:border-[#00b8c8]/40 ${
          channel.primary ? "border-l-2 border-l-[#00b8c8]" : ""
        }`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p
              className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted} ${theme.mono}`}
            >
              // {channel.label.toLowerCase()}
            </p>

            <p
              className={`mt-1 truncate text-base ${theme.mono} ${theme.text} transition-colors group-hover:text-[#00b8c8]`}
            >
              {channel.handle}
            </p>

            <p className={`mt-1 text-sm ${theme.textSoft}`}>
              {channel.note}
            </p>
          </div>

          <span
            className={`shrink-0 text-sm ${theme.tealText} ${theme.mono} transition-all group-hover:translate-x-0.5 group-hover:text-[#ff4fa3]`}
          >
            →
          </span>
        </div>
      </Card>
    </a>
  );
}