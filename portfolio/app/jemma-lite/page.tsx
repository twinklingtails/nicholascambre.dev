// app/jemma-lite/page.tsx
"use client";

import { useState } from "react";

type Role = "user" | "assistant" | "tool";
type Turn = { role: Role; content: string };

// ────────────────────────────────────────────────────────────
// Scripts: add as many as you like. Each run picks one at random.
// Tip: keep tool turns short & “log-like” for contrast.
// ────────────────────────────────────────────────────────────
const SCRIPTS: Turn[][] = [
  // 1) What is Jemma? (Overview + resume one-liner)
  [
    { role: "user",      content: "Hey Jemma — what are you?" },
    { role: "assistant", content: "I’m a local-first assistant. I prefer on-device work, and only call tools or services when that’s faster or necessary." },
    { role: "user",      content: "Give me a quick example." },
    { role: "assistant", content: "Ask me to summarize a log file. I’ll read it locally and output a short brief. If you then say 'open a ticket', I’ll call the issue tracker tool and attach the summary." },
    { role: "user",      content: "What makes you reliable?" },
    { role: "assistant", content: "Deterministic tool contracts, timeouts with retries, and a full action log so you can replay/inspect every step." },
    { role: "user",      content: "Nice. One line for my resume?" },
    { role: "assistant", content: "Built 'Jemma', a local-first AI assistant with tool orchestration, action logging, and resilient retries—designed for practical, observable automation." },
  ],

  // 2) Home Assistant workflow (with tool calls)
  [
    { role: "user",      content: "Jemma, set a scene for 'Movie Night' and dim lights to 20%." },
    { role: "assistant", content: "On it—configuring the scene and dimming lights." },
    { role: "tool",      content: "home_assistant.set_scene(name='Movie Night')" },
    { role: "tool",      content: "home_assistant.light.set_brightness(group='living_room', pct=20)" },
    { role: "assistant", content: "Scene saved and lights dimmed to 20%. Want me to enable 'Do Not Disturb' until 10 PM?" },
    { role: "user",      content: "Yes, and pause notifications from the doorbell camera." },
    { role: "tool",      content: "home_assistant.set_dnd(until='22:00')" },
    { role: "tool",      content: "home_assistant.camera.mute_notifications(device='front_door', until='22:00')" },
    { role: "assistant", content: "Done. DND is active and doorbell alerts are paused until 10 PM." },
  ],

  // 3) Incident triage (logs → ticket)
  [
    { role: "user",      content: "We’ve got elevated 5xx on the API—can you triage?" },
    { role: "assistant", content: "Investigating recent logs and error rates." },
    { role: "tool",      content: "observability.query(metric='api_5xx_rate', window='15m')" },
    { role: "tool",      content: "logs.search(query='status:500 AND service:api', window='15m')" },
    { role: "assistant", content: "Spike started 12 minutes ago; errors cluster around /v2/invoices. Likely a bad deploy." },
    { role: "user",      content: "Open a P1 ticket with a summary and assign to billing-api team." },
    { role: "tool",      content: "tickets.create(priority='P1', team='billing-api', title='5xx spike on /v2/invoices', body='Rates elevated for ~12m; correlates with latest deploy. Needs rollback or hotfix.')" },
    { role: "assistant", content: "Ticket created and assigned. I’ll keep watching error rates and post updates if the spike persists." },
  ],

  // 4) Portfolio helper (human-friendly)
  [
    { role: "user",      content: "Help me describe my 'Home Automation Platform' project clearly." },
    { role: "assistant", content: "Here’s a concise version:\n— Event-driven automations and presence logic\n— MQTT + HA + Node-RED for reliability and low latency\n— Focus on resilience and quick recovery\nWant bullet points or a short paragraph?" },
    { role: "user",      content: "Do a short paragraph." },
    { role: "assistant", content: "I built a resilient home-automation stack using Home Assistant, MQTT, and Node-RED. It focuses on fast, event-driven flows, presence detection, and graceful recovery. The goal is low latency, simple maintenance, and automations that just work." },
  ],
];

// Utility: pick random script (avoid repeating the last one)
function pickScript(lastIndex: number | null): { script: Turn[]; index: number } {
  if (SCRIPTS.length === 1) return { script: SCRIPTS[0], index: 0 };
  let idx = Math.floor(Math.random() * SCRIPTS.length);
  if (lastIndex !== null && idx === lastIndex) {
    idx = (idx + 1) % SCRIPTS.length;
  }
  return { script: SCRIPTS[idx], index: idx };
}

// Small, varied delays for realism
function delayFor(turn: Turn) {
  switch (turn.role) {
    case "user": return 350 + Math.random() * 200;
    case "assistant": return 850 + Math.random() * 500;
    case "tool": return 500 + Math.random() * 300;
    default: return 600;
  }
}

export default function JemmaLiteDemo() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [playing, setPlaying] = useState(false);
  const [lastIdx, setLastIdx] = useState<number | null>(null);

  async function runDemo() {
    if (playing) return;
    setTurns([]);
    setPlaying(true);
    const { script, index } = pickScript(lastIdx);
    setLastIdx(index);

    for (const t of script) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise(r => setTimeout(r, delayFor(t)));
      setTurns(prev => [...prev, t]);
    }
    setPlaying(false);
  }

  return (
    <section className="space-y-6 text-white">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Jemma (Demo)</h1>
        <p className="text-white/70">
          Conceptual, scripted preview—random conversation each run. No live backend.
        </p>
      </header>

      <div className="flex gap-3">
        <button
          onClick={runDemo}
          disabled={playing}
          className="rounded-xl px-4 py-2 border border-white/40 hover:bg-white/10 transition disabled:opacity-50"
        >
          {playing ? "Running…" : "Run demo"}
        </button>
        {turns.length > 0 && !playing && (
          <button
            onClick={() => setTurns([])}
            className="rounded-xl px-4 py-2 border border-white/30 hover:bg-white/10 transition"
          >
            Clear
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-white/20 p-4 min-h-[340px] space-y-3 bg-black/20">
        {turns.length === 0 ? (
          <p className="text-white/60">Click “Run demo” to see a random conversation.</p>
        ) : (
          turns.map((t, i) => (
            <div
              key={i}
              className={
                t.role === "user"
                  ? "text-teal-200"
                  : t.role === "assistant"
                  ? "text-pink-200"
                  : "text-white/70 font-mono text-sm"
              }
            >
              <strong className="mr-2">
                {t.role === "user" ? "You" : t.role === "assistant" ? "Jemma" : "↳ tool"}
              </strong>
              <span className="whitespace-pre-wrap">{t.content}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
