// app/data/projects.ts
export const projects = [
  // ...existing

  {
    slug: "jemma-ai",
    title: "Jemma AI",
    tagline: "Local-first assistant with tool orchestration",
    description:
      "An AI assistant that runs local when possible, orchestrates external tools when needed, and keeps a full action log for observability.",
    tags: ["TypeScript", "Next.js", "LLMs", "Automation", "DX"],
    heroImage: "/projects/jemma-hero.jpg",
  },
  {
    slug: "home-automation",
    title: "Home Automation Platform",
    tagline: "Resilient automations with HA + MQTT + Node-RED",
    description:
      "Event-driven automations, scene logic, and presence detection—built for reliability and low latency.",
    tags: ["Home Assistant", "MQTT", "Node-RED", "Docker", "Linux"],
    heroImage: "/projects/home-automation-hero.jpg",
  },

  // New examples — edit as you like:
  {
    slug: "cloudflare-nginx-edge",
    title: "Cloudflare + Nginx Edge",
    tagline: "Zero-downtime deploys, cache rules, and hardened TLS",
    description:
      "Reverse proxy with rate limiting, cache keys, and clean rollout strategies for static + SSR apps.",
    tags: ["Nginx", "Cloudflare", "DevOps", "Security"],
    heroImage: "/projects/cf-nginx.jpg",
  },
  {
    slug: "jemma-lite",
    title: "Jemma Lite",
    tagline: "Lightweight UI for fast agent prototyping",
    description:
      "A minimal interface for testing prompts, tools, and memory—optimized for iteration speed.",
    tags: ["Next.js", "TypeScript", "UI"],
    heroImage: "/projects/jemma-lite.jpg",
  },
  {
    slug: "server-hardening",
    title: "Server Hardening",
    tagline: "Boring but bulletproof Linux baseline",
    description:
      "An opinionated baseline: SSH, firewalls, backups, journald, fail2ban, and metrics that never lie.",
    tags: ["Linux", "Security", "Ops"],
    heroImage: "/projects/server-hardening.jpg",
  },
  {
    slug: "observability-stack",
    title: "Observability Stack",
    tagline: "Prometheus + Loki + Grafana with sane defaults",
    description:
      "Unified metrics and logs with dashboards for deployments, errors, and performance budgets.",
    tags: ["Grafana", "Prometheus", "Loki", "Docker"],
    heroImage: "/projects/observability.jpg",
  },
];
