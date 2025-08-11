import './globals.css';
import Link from 'next/link';
import ThemeToggle from './components/ThemeToggle';
// import Logo from './components/Logo' // (optional for nav)

export const metadata = {
  title: 'Nicholas Cambre — Portfolio',
  description: 'I build intelligent agents, automation, and clean tooling.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen">
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

        {/* Header / nav */}
        <header className="border-b border-neutral-200/70 dark:border-neutral-800/70">
          <nav className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              {/* <Logo /> */}
              <span className="font-semibold">NC</span>
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <Link className="rounded-xl px-4 py-2 border" href="/projects">Projects</Link>
              <Link className="rounded-xl px-4 py-2 border" href="/about">About</Link>
              <Link className="rounded-xl px-4 py-2 border" href="/contact">Contact</Link>
              <ThemeToggle />
            </div>
          </nav>
        </header>

        {/* Main content with centered watermark */}
        <main className="relative mx-auto max-w-4xl px-6 py-12">
          <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center opacity-20">
            {/* Light logo by default */}
            <img src="/logo-light.jpg" alt="" className="block dark:hidden w-[1400px] h-[1400px] object-contain" />
            {/* Dark logo when html.dark is set */}
            <img src="/logo-dark.jpg"  alt="" className="hidden dark:block w-[1400px] h-[1400px] object-contain" />
          </div>

          {children}
        </main>

        {/* Footer */}
        <footer className="mt-20 border-t border-neutral-200/70 dark:border-neutral-800/70">
          <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-neutral-200">
            © {new Date().getFullYear()} Nicholas Cambre • nicholascambre.dev
          </div>
        </footer>
      </body>
    </html>
  );
}