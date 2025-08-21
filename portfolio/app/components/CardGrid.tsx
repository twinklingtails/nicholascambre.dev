
import Link from "next/link";

export default function CardGrid() {
  const cards = [
    { href: "/projects", title: "Projects", subtitle: "Back-to-basics builds. No overengineering." },
    { href: "/about",    title: "About",    subtitle: "Who I am and how I work." },
    { href: "/contact",  title: "Contact",  subtitle: "Let’s build something useful." },
  ];

  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {cards.map((c) => (
        <li key={c.href}>
          <Link
            href={c.href}
            className="block rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-lg transition bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md"
          >
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm opacity-80">{c.subtitle}</p>
            <span className="mt-4 inline-block underline underline-offset-4 decoration-transparent hover:decoration-teal-400 transition">
              Open →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
