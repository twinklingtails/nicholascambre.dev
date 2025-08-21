export type Project = {
  slug: string;
  title: string;
  tagline?: string;
  description?: string;
  heroImage?: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    slug: "jemma-ai",
    title: "Jemma AI",
    tagline: "Back-to-basics AI assistant.",
    description:
      "A modular assistant that runs locally on my servers, built for clarity, reliability, and human-centered interaction.",
    tags: ["Python", "LLM", "Reasoning", "Automation"],
    // heroImage: "/images/jemma-hero.png",
  },
  {
    slug: "home-automation",
    title: "Home Automation",
    tagline: "Simple controls. Real reliability.",
    description:
      "A streamlined Home Assistant setup: fewer moving parts, more stability. MQTT + dashboards + practical automations.",
    tags: ["Home Assistant", "MQTT", "Dashboards"],
    // heroImage: "/images/home-automation-hero.png",
  },
  // ...other projects
];
