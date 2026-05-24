// app/jemma-lite/components/AssistantBubble.tsx
// app/jemma-lite/components/AssistantBubble.tsx

import { GradientLogo } from "@/app/components/GradientLogo";

interface AssistantBubbleProps {
  content: string;
  streaming?: boolean;
}

export function AssistantBubble({ content, streaming }: AssistantBubbleProps) {
  return (
    <div className="flex items-start gap-3">
      {/* Brand-gradient avatar — same disc that appears in the site header */}
      <GradientLogo letter="J" size="sm" />

      <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[#00b8c8]/20 bg-[#00b8c8]/[0.04] px-4 py-2.5 text-sm leading-relaxed text-[#f7fafc]">
        <span className="whitespace-pre-wrap">{content}</span>
        {streaming && (
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-[#00b8c8]"
          />
        )}
      </div>
    </div>
  );
}