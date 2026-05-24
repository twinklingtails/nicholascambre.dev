// app/jemma-lite/components/UserBubble.tsx

interface UserBubbleProps {
  content: string;
}

export function UserBubble({ content }: UserBubbleProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-100">
        {content}
      </div>
    </div>
  );
}