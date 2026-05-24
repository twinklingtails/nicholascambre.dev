// app/jemma-lite/components/MessageList.tsx
"use client";

import { useEffect, useRef } from "react";
import type { Message } from "../types";
import { UserBubble } from "./UserBubble";
import { AssistantBubble } from "./AssistantBubble";
import { ToolCard } from "./ToolCard";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Tracks "was the user near the bottom right before the new content
  // arrived?" If yes, we stick to the bottom; if they've scrolled up to
  // read scrollback, we leave them alone.
  const stuckToBottomRef = useRef(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (stuckToBottomRef.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const onScroll = (): void => {
    const el = scrollRef.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    stuckToBottomRef.current = distFromBottom < 80;
  };

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="flex-1 overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-950/40 p-4"
    >
      {messages.length === 0 ? (
        <div className="grid h-full place-items-center">
          <p className="text-sm text-neutral-500">No messages yet. Say hello.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {messages.map(m => (
            <li key={m.id}>
              {m.role === "user" && <UserBubble content={m.content} />}
              {m.role === "assistant" && (
                <AssistantBubble
                  content={m.content}
                  streaming={m.streaming}
                />
              )}
              {m.role === "tool" && (
                <ToolCard
                  name={m.name}
                  status={m.status}
                  args={m.args}
                  result={m.result}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}