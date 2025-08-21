// app/about/page.tsx
export default function AboutPage() {
  return (
    <section className="space-y-12">
      {/* Two-panel layout */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* My Story */}
        <div className="rounded-xl px-4 py-2 border border-pink-400 text-pink-200 hover:bg-pink-400/10 transition">
          <h2 className="text-3xl font-bold">My Story</h2>
          <div className="prose dark:prose-invert max-w-none mt-4">
            <p>
              I believe technology should empower, not overwhelm. My path started
              with a habit of taking complex systems apart and rebuilding them
              into simpler, more usable tools.
            </p>
            <p>
              From AI assistants like <strong>Jemma</strong> to home automation and
              streamlined servers, I focus on practical, approachable builds —
              technology designed to be clear, reliable, and human-centered.
            </p>
            <p>
              Raised in Louisiana and now based in Seattle, I bring resilience,
              curiosity, and a builder’s mindset to every project. My guiding
              principle is simple: clarity over complexity.
            </p>
          </div>
        </div>

        {/* Let’s Connect */}
        <div className="rounded-2xl bg-white/80 dark:bg-neutral-900/80 p-8 shadow-lg backdrop-blur-md">
          <h2 className="text-3xl font-bold">Let’s Connect</h2>
          <ul className="mt-6 space-y-4">
            <li>
              <a
                href="mailto:nicholascambre0077@icloud.com"
                className="group flex items-center gap-3 hover:text-teal-500 transition"
              >
                {/* Mail icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
                  <path d="m22 8-10 6L2 8" />
                </svg>
                <span className="underline underline-offset-4 decoration-transparent group-hover:decoration-teal-400">
                  Email Me!
                </span>
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/nicholascambre"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 hover:text-teal-500 transition"
              >
                {/* LinkedIn icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-none"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zm7.5 0h4.78v2.05h.07c.67-1.27 2.3-2.6 4.73-2.6C21.9 8.43 24 10.6 24 14.4V24h-5v-8.34c0-1.99-.04-4.55-2.77-4.55-2.77 0-3.2 2.16-3.2 4.4V24H7.5V8.98z" />
                </svg>
                <span className="underline underline-offset-4 decoration-transparent group-hover:decoration-teal-400">
                  LinkedIn
                </span>
              </a>
            </li>

            <li>
              <a
                href="https://github.com/twinklingtails"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 hover:text-teal-500 transition"
              >
                {/* GitHub icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-none"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5A11.5 11.5 0 0 0 .5 12.4c0 5.26 3.42 9.72 8.16 11.3.6.1.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.32.74-4.02-1.6-4.02-1.6-.55-1.43-1.34-1.8-1.34-1.8-1.1-.77.08-.76.08-.76 1.22.09 1.86 1.28 1.86 1.28 1.08 1.9 2.82 1.35 3.5 1.03.11-.79.42-1.35.77-1.66-2.65-.31-5.43-1.36-5.43-6.06 0-1.34.47-2.44 1.25-3.3-.13-.31-.54-1.58.12-3.3 0 0 1.02-.33 3.35 1.26a11.6 11.6 0 0 1 6.1 0c2.33-1.59 3.35-1.26 3.35-1.26.66 1.72.25 2.99.12 3.3.78.86 1.25 1.96 1.25 3.3 0 4.71-2.79 5.74-5.45 6.05.43.37.82 1.1.82 2.23 0 1.6-.02 2.9-.02 3.3 0 .32.22.69.83.57 4.73-1.58 8.15-6.03 8.15-11.29A11.5 11.5 0 0 0 12 .5Z" />
                </svg>
                <span className="underline underline-offset-4 decoration-transparent group-hover:decoration-teal-400">
                  GitHub
                </span>
              </a>
            </li>
          </ul>

          {/* Optional: recruiter-friendly CTA */}
          <div className="mt-8 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Open to roles in systems, automation, and AI tooling. Let’s talk
              about building simple, durable software together.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <blockquote className="rounded-2xl border border-teal-300/40 bg-teal-500/5 p-6 text-lg italic">
        “Practical solutions for everyday challenges. I challenge the idea that
        programming requires advanced education by creating accessible,
        functional tools designed to solve real-world problems with clarity and
        efficiency.”
      </blockquote>

      {/* Personal touch (optional) */}
      <div className="rounded-2xl bg-white/80 dark:bg-neutral-900/80 p-8 shadow-lg backdrop-blur-md">
        <h3 className="text-2xl font-semibold">Outside of Work</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3 text-neutral-700 dark:text-neutral-300">
          <li> 🎨 Website Creation & design</li>
          <li>🎮 Gaming + streaming</li>
          <li>🏙️ Exploring Seattle with Luna</li>
        </ul>
      </div>
    </section>
  );
}
