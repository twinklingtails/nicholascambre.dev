// app/jemma-lite/components/AssistantBubble.tsx

interface AssistantBubbleProps {
  content: string;
  streaming?: boolean;
}

export function AssistantBubble({ content, streaming }: AssistantBubbleProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 ring-1 ring-amber-300/30" />

      <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-amber-500/20 bg-amber-500/[0.06] px-4 py-2.5 text-sm leading-relaxed text-neutral-100">
        <span className="whitespace-pre-wrap">{content}</span>
        {streaming && (
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-amber-300"
          />
        )}
      </div>
    </div>
  );
}