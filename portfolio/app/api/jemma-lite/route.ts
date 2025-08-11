import { NextResponse } from 'next/server';

const tools = {
  time_now: async () => new Date().toISOString(),
  send_note: async (text: string) => `noted:${text.slice(0,80)}`,
  search_docs: async (q: string) => {
    const corpus = [
      'Jemma uses RPC tools, FAISS memory, and step budgets.',
      'Minecraft server automation: health checks, Discord alerts, nightly backups.',
      'Home Assistant orchestration across Govee, Hubspace, MyQ.'
    ];
    return corpus.filter(s => s.toLowerCase().includes(q.toLowerCase())).slice(0,2);
  }
};

export async function POST(req: Request) {
  const { input } = await req.json();
  const events: string[] = [];
  if (/time/i.test(input)) {
    events.push('Plan: call time_now');
    const t = await tools.time_now();
    return NextResponse.json({ reply: `It is ${t}`, events });
  }
  if (/note|remember/i.test(input)) {
    events.push('Plan: call send_note');
    const r = await tools.send_note(input);
    return NextResponse.json({ reply: `Saved: ${r}`, events });
  }
  events.push('Plan: call search_docs');
  const hits = await tools.search_docs(input);
  return NextResponse.json({ reply: hits[0] ?? "I couldn't find anything relevant.", events });
}
