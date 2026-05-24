// app/jemma-lite/components/ToolCard.tsx

import type { ToolStatus } from "../types";

interface ToolCardProps {
  name: string;
  status: ToolStatus;
  args?: Record<string, unknown>;
  result?: string;
}

export function ToolCard({ name, status, args, result }: ToolCardProps) {
  const dotClass =
    status === "running"
      ? "bg-pink-400 animate-pulse"
      : status === "done"
        ? "bg-emerald-400"
        : "bg-red-400";

  const hasArgs = args && Object.keys(args).length > 0;

  return (
    <div className="ml-10 max-w-[85%] rounded-xl border border-pink-900/40 bg-pink-950/20 px-3 py-2 font-mono text-xs text-pink-100">
      <div className="flex items-center gap-2 text-pink-300">
        <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
        <span className="font-semibold">{name}</span>
        <span className="text-pink-500">·</span>
        <span className="text-pink-400/80">{status}</span>
      </div>

      {hasArgs && (
        <pre className="mt-1 whitespace-pre-wrap break-all text-pink-200/80">
          {JSON.stringify(args, null, 2)}
        </pre>
      )}

      {hasArgs && (
  <pre className="mt-1 whitespace-pre-wrap break-all text-pink-200/80">
    {JSON.stringify(args, null, 2)}
  </pre>
)}
    </div>
  );
}