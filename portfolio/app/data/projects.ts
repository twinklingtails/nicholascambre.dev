export type Project = {
  slug: string;
  title: string;
  year: number | string;
  summary: string;
  tags: string[];
  links: { live?: string; github?: string };
};

export const projects: Project[] = [
  {
    slug: 'jemma-ai',
    title: 'Jemma AI (Home Server)',
    year: 2025,
    summary:
      'Python core with memory engine and Discord interface; PM2/Next front-end; self-hosted.',
    tags: ['Python', 'AI', 'Discord', 'PM2', 'Next.js', 'Tailwind'],
    links: { github: 'https://github.com/youruser/jemma-ai' }
  },
  {
    slug: 'portfolio',
    title: 'Portfolio (nicholascambre.dev)',
    year: 2025,
    summary:
      'Next 15 + Tailwind 3, Nginx + PM2, Cloudflare. Cards + overlays for a clean UX.',
    tags: ['Next.js', 'Tailwind', 'Nginx', 'PM2', 'Cloudflare'],
    links: {
      live: 'https://nicholascambre.dev',
      github: 'https://github.com/twinklingtails/nicholascambre.dev'
    }
  },
  {
    slug: 'minecraft-ops',
    title: 'Minecraft Server Ops',
    year: 2024,
    summary:
      'systemd → PM2 migration, backups, restarts, Discord webhooks for status.',
    tags: ['PM2', 'Linux', 'Discord', 'Backups'],
    links: {}
  },
  {
    slug: 'home-assistant',
    title: 'Home Assistant Dashboards',
    year: 2024,
    summary:
      'MQTT integrations (Govee, Hubspace), Wyze camera pipeline into Frigate.',
    tags: ['Home Assistant', 'MQTT', 'Frigate'],
    links: {}
  },
  {
    slug: 'jemma-desktop-orb',
    title: 'Jemma Desktop Orb (Prototype)',
    year: 'Roadmap',
    summary:
      'Electron floating bubble UI with local bridge to Jemma services.',
    tags: ['Electron', 'UX', 'Prototype'],
    links: {}
  }
];
