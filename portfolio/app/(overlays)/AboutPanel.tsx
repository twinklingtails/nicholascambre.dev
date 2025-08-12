'use client';

export default function AboutPanel() {
  return (
    <div className="prose dark:prose-invert">
      <p>
        I’m Nicholas — independent developer focused on AI systems, modern web,
        and home-lab automation. I like shipping fast, reliable tools with a clean UX.
      </p>
      <ul>
        <li>Python/Node for AI services</li>
        <li>Next.js + Tailwind for UI</li>
        <li>PM2, Nginx, Cloudflare for deploys</li>
        <li>Home Assistant, MQTT, server ops</li>
      </ul>
    </div>
  );
}
