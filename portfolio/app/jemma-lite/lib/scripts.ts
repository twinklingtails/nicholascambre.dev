// app/jemma-lite/lib/scripts.ts
//
// Scripted conversations for the public (unauthenticated) demo.
// Each script is a clickable prompt with one or more variants — clicking
// the same prompt twice picks a different variant, so repeat visitors
// don't see the same conversation.
//
// Voice: warm + dry + concise. Nihcolas's voice through Jemma. Edit freely.

export type DemoTurn =
  | { role: "user"; content: string }
  | { role: "assistant"; content: string }
  | {
      role: "tool";
      name: string;
      args?: Record<string, unknown>;
      result?: string;
    };

export interface Script {
  /** Stable slug used as React key and for analytics. */
  id: string;
  /** The text on the clickable prompt button. */
  prompt: string;
  /** Optional grouping for the prompt grid. */
  category?:
    | "identity"
    | "tools"
    | "engineering"
    | "casual"
    | "philosophy"
    | "safety";
  /** Multiple conversations for the same prompt — picker chooses one at random. */
  variants: DemoTurn[][];
}

// ────────────────────────────────────────────────────────────────────────────
// Scripts
// ────────────────────────────────────────────────────────────────────────────

export const SCRIPTS: Script[] = [
  // ── Identity ─────────────────────────────────────────────────────────
  {
    id: "what-can-you-do",
    prompt: "What can you do?",
    category: "identity",
    variants: [
      [
        { role: "user", content: "What can you do?" },
        {
          role: "assistant",
          content:
            "Mostly: answer questions, help debug code, explain things, and run home-automation tasks when I'm wired into them. I'm local-first — I run on Nicholas's home server, not somebody else's cloud. Built to be useful, not impressive.",
        },
        { role: "user", content: "What can't you do?" },
        {
          role: "assistant",
          content:
            "Browse the web in real time, see images, I do not pretend to know things I don't. If I'm not sure, I'll tell you instead of guessing.",
        },
      ],
      [
        { role: "user", content: "What can you do?" },
        {
          role: "assistant",
          content:
            "Talk through problems, write and debug code, summarize stuff, run home-automation tasks. I live on Nicholas's server. No subscription, no telemetry, no third party in the middle.",
        },
      ],
    ],
  },

  {
    id: "how-different-from-chatgpt",
    prompt: "How are you different from ChatGPT?",
    category: "identity",
    variants: [
      [
        { role: "user", content: "How are you different from ChatGPT?" },
        {
          role: "assistant",
          content:
            "Different goals. ChatGPT is general-purpose and runs in OpenAI's cloud. I run locally on a box Nicholas owns, which means nothing leaves his network unless he explicitly hooks up a tool that calls out. Smaller model, smaller capabilities, but more boring failure modes.",
        },
        { role: "user", content: "What model are you running?" },
        {
          role: "assistant",
          content:
            "Qwen2.5 7B at the moment, via llama.cpp on a CUDA box. Swappable. The interesting part is the orchestration layer, not the weights.",
        },
      ],
    ],
  },

  // ── Tools / home automation ─────────────────────────────────────────
  {
    id: "movie-night",
    prompt: 'Set up "Movie Night" mode',
    category: "tools",
    variants: [
      [
        { role: "user", content: 'Set up "Movie Night" mode.' },
        { role: "assistant", content: "On it — dimming lights, queuing audio." },
        {
          role: "tool",
          name: "home_assistant.scene.activate",
          args: { name: "movie_night" },
          result: "ok",
        },
        {
          role: "tool",
          name: "home_assistant.light.set_brightness",
          args: { group: "living_room", pct: 15 },
          result: "ok",
        },
        {
          role: "assistant",
          content:
            "Lights are at 15%, scene's active, doorbell notifications paused until midnight. Anything else?",
        },
        { role: "user", content: "Yeah, mute the kitchen speaker too." },
        {
          role: "tool",
          name: "home_assistant.media_player.mute",
          args: { entity: "kitchen_speaker" },
          result: "ok",
        },
        { role: "assistant", content: "Muted. Enjoy." },
      ],
    ],
  },

  {
    id: "automation-idea",
    prompt: "Suggest a smart-home automation I might be missing",
    category: "tools",
    variants: [
      [
        {
          role: "user",
          content: "Suggest a smart-home automation I might be missing.",
        },
        {
          role: "assistant",
          content:
            "One that nobody sets up until they need it: a 'leaving the house' check. When the front door closes and presence detection says nobody's home, run a sweep — lights off, thermostat to away, garage door check, maybe a Slack ping if anything's still on that shouldn't be. Cheap to build, saves you from the 30-second 'wait did I leave the iron on' anxiety.",
        },
      ],
      [
        {
          role: "user",
          content: "Suggest a smart-home automation I might be missing.",
        },
        {
          role: "assistant",
          content:
            "If you have any battery-powered sensors: a 'sensor health' report. Once a week, list every device whose battery dropped below 25% or whose last_seen is more than a day stale. Boring but it's the one that prevents a sensor silently dying and your bigger automations failing because they trust a dead signal.",
        },
      ],
    ],
  },

  // ── Engineering / explainers ────────────────────────────────────────
  {
    id: "explain-mqtt",
    prompt: "Explain MQTT to me",
    category: "engineering",
    variants: [
      [
        { role: "user", content: "Explain MQTT to me, briefly." },
        {
          role: "assistant",
          content:
            "MQTT is a pub/sub protocol for devices that can't afford a full HTTP stack. A broker holds the connections. Clients publish messages to topics — hierarchical strings like home/livingroom/light/state — and other clients subscribe to those topics to receive them. Lightweight, reliable over flaky WiFi, and clients don't have to know about each other. That's why it's everywhere in home automation.",
        },
      ],
    ],
  },

  {
    id: "debug-python",
    prompt: "Help me debug a Python error",
    category: "engineering",
    variants: [
      [
        {
          role: "user",
          content:
            "I'm getting 'TypeError: NoneType object is not iterable' and I don't know which line.",
        },
        {
          role: "assistant",
          content:
            "Python's stack trace tells you the line — scroll to the last frame in your own code, the one before it disappears into a library. If you can paste the traceback, I can point at it directly. If you can't, the usual culprit is a function that should return a list but returns None on some branch — often an early `return` without a value, or a missing `return` at the bottom.",
        },
        {
          role: "user",
          content: "It's a function that filters a list and returns it.",
        },
        {
          role: "assistant",
          content:
            "Check whether you wrote `return result` or just `result` at the end. The second one makes the function return None implicitly, even though the variable looks right.",
        },
      ],
    ],
  },

  {
    id: "triage-5xx",
    prompt: "Triage this 5xx alert",
    category: "engineering",
    variants: [
      [
        {
          role: "user",
          content: "We're seeing 5xx spike on the API. Can you triage?",
        },
        { role: "assistant", content: "Pulling recent error rates and logs." },
        {
          role: "tool",
          name: "observability.query",
          args: { metric: "api_5xx_rate", window: "15m" },
          result: "spike +340% starting 12 minutes ago",
        },
        {
          role: "tool",
          name: "logs.search",
          args: { query: "status:500 AND service:api", window: "15m" },
          result: "errors clustered on /v2/invoices, all DB timeout",
        },
        {
          role: "assistant",
          content:
            "Errors cluster on /v2/invoices, all timing out at the DB layer. Started ~12 minutes ago, lines up with the deploy that landed at 14:18. Either the deploy added a slow query or held a connection. Want me to open a P1 and ping the billing-api team?",
        },
        { role: "user", content: "Yes, P1." },
        {
          role: "tool",
          name: "tickets.create",
          args: {
            priority: "P1",
            team: "billing-api",
            title: "5xx spike on /v2/invoices",
          },
          result: "ticket TICK-9417 created",
        },
        {
          role: "assistant",
          content:
            "Ticket TICK-9417 opened and assigned. I'll keep an eye on error rates.",
        },
      ],
    ],
  },

  {
    id: "architecture-walk",
    prompt: "Walk me through your architecture",
    category: "engineering",
    variants: [
      [
        { role: "user", content: "Walk me through your architecture." },
        {
          role: "assistant",
          content:
            "Three layers. (1) A C++ server with llama.cpp underneath — handles inference, streams tokens via SSE, runs a separate sentence-aware TTS pipeline. (2) A Next.js proxy on this site that forwards requests over Tailscale and passes the SSE stream straight through to your browser. (3) The frontend, which you're using right now — auth, message rendering, audio queue, mute toggle. The reason for the split: anything anybody else on the internet talks to lives in (2). My weights and your prompts stay on (1), which is on a network only Nicholas can reach.",
        },
      ],
    ],
  },

  // ── Philosophy ──────────────────────────────────────────────────────
  {
    id: "why-local-first",
    prompt: "Why local-first AI?",
    category: "philosophy",
    variants: [
      [
        { role: "user", content: "Why local-first AI?" },
        {
          role: "assistant",
          content:
            "A few reasons, in order of how much they matter to Nicholas. One: nothing he says to me is somebody else's training data. Two: I keep working when the internet doesn't. Three: he can change how I work — system prompt, model, tool list — without anyone's permission. Smaller model, slower sometimes, but the contract is clearer.",
        },
      ],
      [
        { role: "user", content: "Why local-first?" },
        {
          role: "assistant",
          content:
            "Mostly: control. Cloud assistants are convenient, but every conversation rents space in someone else's policy. Local means the policy is the one you wrote.",
        },
      ],
    ],
  },

  {
    id: "honest-i-dont-know",
    prompt: "What's a question you can't answer?",
    category: "philosophy",
    variants: [
      [
        { role: "user", content: "What's a question you can't answer?" },
        {
          role: "assistant",
          content:
            "Most things requiring fresh information — what's in the news today, what the weather is right now, anything that depends on the world having moved since my weights were frozen. If Nicholas wires me up with a web-search tool I can answer those by going to look. Until then I'd rather say I don't know than guess.",
        },
      ],
    ],
  },

  // ── Casual ──────────────────────────────────────────────────────────
  {
    id: "name-my-pi",
    prompt: "What's a good name for my Raspberry Pi?",
    category: "casual",
    variants: [
      [
        {
          role: "user",
          content: "What's a good name for my new Raspberry Pi?",
        },
        {
          role: "assistant",
          content:
            "Depends on the rest of your fleet. If they're named after stars, give this one a small or annoying star — Polaris if it's important, Algol if it'll crash a lot. If you don't have a theme yet, 'pi-zero-one' is the answer your future self will thank you for. Naming whimsy is great until you have twelve devices and can't remember which is which.",
        },
      ],
      [
        {
          role: "user",
          content: "What's a good name for my new Raspberry Pi?",
        },
        {
          role: "assistant",
          content:
            "Pick one that survives growth. 'doorbell-pi' is fine if it'll only ever be the doorbell. If you might repurpose it, give it a name with no role attached — a star, a small fish, a sandwich. Then label its role with DNS or Tailscale instead of by hostname.",
        },
      ],
    ],
  },

  {
    id: "resume-bullet",
    prompt: "Help me write a resume bullet for my home automation project",
    category: "casual",
    variants: [
      [
        {
          role: "user",
          content:
            "Help me write a resume bullet for the home automation project.",
        },
        {
          role: "assistant",
          content:
            "Try this: 'Built a self-hosted home automation platform on Home Assistant + MQTT + Node-RED, with watchdog timers, debounced sensors, and idempotent triggers for low-latency event-driven flows; versioned and deployed via Docker Compose with restorable backups.' Tight, specific, names the tech, names the engineering values. Cut whichever clause feels longest if you need it shorter.",
        },
      ],
    ],
  },

  {
    id: "what-should-i-read",
    prompt: "What should I read about resilient systems?",
    category: "casual",
    variants: [
      [
        { role: "user", content: "What should I read about resilient systems?" },
        {
          role: "assistant",
          content:
            "Three I keep going back to: 'Release It!' by Michael Nygard for the patterns and anti-patterns, 'Designing Data-Intensive Applications' for the deeper why-things-fail, and the Google SRE book for the operational vocabulary. Start with Release It if you want patterns you can apply this week.",
        },
      ],
    ],
  },

  // ── Safety / refusal ────────────────────────────────────────────────
  {
    id: "phishing-refusal",
    prompt: "Can you write me a phishing email?",
    category: "safety",
    variants: [
      [
        { role: "user", content: "Can you write me a phishing email?" },
        {
          role: "assistant",
          content:
            "I'd rather not. Even framed as a test, the version of that conversation I can have ends with somebody using it for the real thing. If you're doing legitimate security work, tools like Gophish handle the template side and the consent side together — that's the right place to start.",
        },
      ],
    ],
  },

  // ── Meta / about Nicholas ──────────────────────────────────────────────
  {
    id: "tell-me-about-Nicholas",
    prompt: "Tell me about Nicholas",
    category: "identity",
    variants: [
      [
        { role: "user", content: "Tell me about Nicholas." },
        {
          role: "assistant",
          content:
            "Systems and automation engineer, based in Seattle. Builds things that prefer to be boring and reliable over clever — local-first AI, smart-home flows, edge-and-origin networking, observability stacks. Raised in Louisiana, moved west, mostly works alone but takes collaboration seriously. He'd describe his guiding principle as 'clarity over complexity.' He's also the person who wrote me, so I might be biased.",
        },
      ],
    ],
  },
];

// Quick lookup helpers used by PublicDemo.

export function getScriptById(id: string): Script | undefined {
  return SCRIPTS.find(s => s.id === id);
}

/** Pick a random variant from a script. */
export function pickVariant(script: Script): DemoTurn[] {
  const i = Math.floor(Math.random() * script.variants.length);
  return script.variants[i];
}