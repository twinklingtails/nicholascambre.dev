import TechnicalSkills from "@/app/components/TechnicalSkills";
import Link from "next/link";

export default function ResumePage() {
  return (
    <section className="space-y-10">
      <header className="rounded-2xl p-8 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-transparent dark:from-neutral-800 dark:via-neutral-900" />
        <div className="relative">
          <h1 className="text-3xl font-bold">Resume</h1>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            Nicholas Cambre • Systems & Automation Engineer • Seattle, WA
          </p>
          <div className="mt-4 flex gap-4">
            <Link href="/contact" className="underline underline-offset-4">
              Contact
            </Link>
            <a
              href="/Nicholas_Cambre_Resume.pdf"
              className="underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </a>
          </div>
        </div>
      </header>

      {/* Detailed skills */}
      <TechnicalSkills />

      {/* Experience placeholder */}
      <section className="rounded-2xl bg-white/80 dark:bg-neutral-900/80 p-8 shadow-lg backdrop-blur-md">
        <h2 className="text-xl font-semibold">Experience</h2>
        <ul className="mt-4 space-y-4 text-sm text-neutral-700 dark:text-neutral-300">
          <li>
            <div className="font-medium">
              Independent Projects — Systems & Automation
            </div>
            <div className="opacity-80">
              Built AI assistant (Jemma), home automation flows, and server
              deployments with Linux, Docker, Nginx, Cloudflare.
            </div>
          </li>
          {/* Add more entries here */}
        </ul>
      </section>
    </section>
  );
}
