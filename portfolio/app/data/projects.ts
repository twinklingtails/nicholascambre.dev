// app/data/projects.ts
export const projects = [
  {
    slug: "jemma-ai",
    title: "Jemma AI",
    tagline: "Local-first assistant with tool orchestration",
    description:
      "An AI assistant that runs local when possible, orchestrates external tools when needed, and keeps a full action log for observability.",
    tags: ["TypeScript", "Next.js", "LLMs", "Automation", "DX"],
    heroImage: "/projects/jemma-hero.jpg",
    jemmaContext:
      "Objective: pragmatic assistant for day-to-day ops. Core ideas: strong defaults, short feedback loops, minimal state. Stack: Next.js (App Router), TypeScript, small tool adapters. Design constraints: runs locally when viable; uses remote models/tools only when they add clear value. Observability: action log + structured traces. Outcome: fast iteration and predictable behavior."
  },

  {
    slug: "home-automation",
    title: "Home Automation Platform",
    tagline: "Resilient automations with HA + MQTT + Node-RED",
    description:
      "Event-driven automations, scene logic, and presence detection—built for reliability and low latency.",
    tags: ["Home Assistant", "MQTT", "Node-RED", "Docker", "Linux"],
    heroImage: "/projects/home-automation-hero.jpg",
    jemmaContext:
      "Goal: low-latency, failure-tolerant home automations. Infra: Home Assistant for state, MQTT for event bus, Node-RED for flows. Patterns: idempotent triggers, debounced sensors, watchdogs for flaky devices. Ops: Docker Compose, backups, versioned flows. Result: resilient scenes and presence logic that keep working during network hiccups."
  },

  {
    slug: "cloudflare-nginx-edge",
    title: "Cloudflare + Nginx Edge",
    tagline: "Zero-downtime deploys, cache rules, and hardened TLS",
    description:
      "Reverse proxy with rate limiting, cache keys, and clean rollout strategies for static + SSR apps.",
    tags: ["Nginx", "Cloudflare", "DevOps", "Security"],
    heroImage: "/projects/cf-nginx.jpg",
    jemmaContext:
      "Edge strategy: Cloudflare for DNS/SSL/WAF; Nginx for proxying SSR and static assets. Features: cache keys by device/locale, stale-while-revalidate, blue-green deploys, rate limiting, strict TLS ciphers. Outcome: faster TTFB, safer rollouts, and simpler incident response."
  },

  {
    slug: "jemma-lite",
    title: "Jemma Lite",
    tagline: "Lightweight UI for fast agent prototyping",
    description:
      "A minimal interface for testing prompts, tools, and memory—optimized for iteration speed.",
    tags: ["Next.js", "TypeScript", "UI"],
    heroImage: "/projects/jemma-lite.jpg",
    jemmaContext:
      "Purpose: tiny surface to experiment with prompts and tool wiring. UX: single input, streamed answers (optional), topic param for context. Engineering values: keep state small, keep requests observable, fail soft with useful fallbacks."
  },

  {
    slug: "server-hardening",
    title: "Server Hardening",
    tagline: "Boring but bulletproof Linux baseline",
    description:
      "An opinionated baseline: SSH, firewalls, backups, journald, fail2ban, and metrics that never lie.",
    tags: ["Linux", "Security", "Ops"],
    heroImage: "/projects/server-hardening.jpg",
    jemmaContext:
      "Baseline: minimal packages, SSH with keys only, UFW rules, fail2ban, automatic updates, log retention, node_exporter. Backups: offsite, versioned, tested restores. Philosophy: boring > clever; observability first."
  },

  {
    slug: "observability-stack",
    title: "Observability Stack",
    tagline: "Prometheus + Loki + Grafana with sane defaults",
    description:
      "Unified metrics and logs with dashboards for deployments, errors, and performance budgets.",
    tags: ["Grafana", "Prometheus", "Loki", "Docker"],
    heroImage: "/projects/observability.jpg",
    jemmaContext:
      "Scope: metrics (Prometheus), logs (Loki), dashboards (Grafana). Practices: RED/USE dashboards, alert fatigue reduction, SLOs with burn-rate alerts, per-deploy markers. Outcome: quicker MTTR and clearer performance budgets."
  }
];
