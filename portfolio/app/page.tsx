import Link from 'next/link';
import CardGrid from './components/CardGrid';

export default function Home() {
  return (
    <section className="space-y-12">
      {/* Hero / Intro */}
      <div className="rounded-xl bg-white/80 dark:bg-neutral-900/80 p-8 shadow-lg backdrop-blur-md">
        <h1 className="text-4xl font-bold">Hey, I’m Nicholas Cambre 👋</h1>
        <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
          I have built a variety of systems ranging from implementing Home Automation Systems to creating an AI using Python.
          From AI-powered assistants to smart homes and automated game servers — I love building tech that works for you.
        </p>
      </div>

      {/* Highlight Projects CTA */}
      <div className="rounded-xl bg-white/80 dark:bg-neutral-900/80 p-6 shadow-lg backdrop-blur-md">
        <h2 className="text-2xl font-semibold">Check Out My Work</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Explore some of my recent projects, including Jemma AI, Minecraft automation, and Home Assistant orchestration.
        </p>
        <Link
          href="/?panel=projects"
          scroll={false}
          className="inline-block mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 transition"
        >
          View Projects
        </Link>
      </div>

      {/* Expanding cards */}
      <CardGrid />
    </section>
  );
}
