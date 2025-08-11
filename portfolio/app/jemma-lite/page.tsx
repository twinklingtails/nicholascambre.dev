'use client';
import { useState } from 'react';
import Logo from "../components/Logo";

export default function JemmaLite() {
  const [msg, setMsg] = useState('What can you do?');
  const [log, setLog] = useState<string[]>([]);
  const send = async () => {
    const r = await fetch('/api/jemma-lite', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ input: msg })
    });
    const data = await r.json();
    setLog(l => [...l, `> ${msg}`, ...data.events, `Jemma: ${data.reply}`]);
    setMsg('');
  };
  return (
    <>
      <h1 className="text-3xl font-semibold">Jemma Lite (Demo)</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">Toy planner with 3 safe tools (time, note, docs search).</p>
      <div className="mt-6 flex gap-2">
        <input value={msg} onChange={e=>setMsg(e.target.value)} className="flex-1 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"/>
        <button onClick={send} className="btn">Send</button>
      </div>
      <pre className="mt-6 card p-4 text-sm whitespace-pre-wrap">{log.join('\n')}</pre>
    </>
  );
}
