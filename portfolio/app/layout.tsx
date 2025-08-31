import "./globals.css";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

export const metadata = {
  title: "Nicholas Cambre — Portfolio",
  description: "I build intelligent agents, automation, and clean tooling.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen text-neutral-900 dark:text-neutral-100">
        {/* set theme early */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var wantDark = stored ? stored === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', wantDark);
  } catch(e){}
})();
            `,
          }}
        />

        {/* Global background image + overlay */}
        <div
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            backgroundImage: "url('/nicholascambredevwebsite.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed", // subtle parallax
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-black/55" aria-hidden="true" />

        {/* Header / nav */}
        <header className="border-b border-neutral-200/70 dark:border-neutral-800/70 backdrop-blur-sm bg-white/30 dark:bg-neutral-950/20">
          <nav className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-semibold tracking-tight">NC</span>
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <Link className="rounded-xl px-4 py-2 border border-neutral-300/70 dark:border-neutral-700/70 hover:bg-white/20 hover:dark:bg-white/10 transition" href="/projects">Projects</Link>
              <Link className="rounded-xl px-4 py-2 border border-neutral-300/70 dark:border-neutral-700/70 hover:bg-white/20 hover:dark:bg-white/10 transition" href="/about">About</Link>
              <Link className="rounded-xl px-4 py-2 border border-neutral-300/70 dark:border-neutral-700/70 hover:bg-white/20 hover:dark:bg-white/10 transition" href="/contact">Contact</Link>
	      <Link className="rounded-xl px-4 py-2 border border-neutral-300/70 dark:border-neutral-700/70 hover:bg-white/20 hover:dark:bg-white/10 transition" href="/jemma-lite">Jemma</Link>
              <ThemeToggle />
            </div>
          </nav>
        </header>

        {/* Main content (your pages can still use frosted cards) */}
        <main className="relative mx-auto max-w-4xl px-6 py-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-20 border-t border-neutral-200/70 dark:border-neutral-800/70 backdrop-blur-sm bg-white/20 dark:bg-neutral-950/10">
          <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-neutral-700 dark:text-neutral-300">
            © {new Date().getFullYear()} Nicholas Cambre • nicholascambre.dev
          </div>
        </footer>
      </body>
    </html>
  );
}
