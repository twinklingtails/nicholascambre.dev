'use client';

export default function ContactPanel() {
  return (
    <form className="space-y-3">
      <label className="block">
        <span className="text-sm">Email</span>
        <input
          type="email"
          className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent p-2"
          placeholder="you@example.com"
        />
      </label>
      <label className="block">
        <span className="text-sm">Message</span>
        <textarea
          rows={4}
          className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent p-2"
          placeholder="How can I help?"
        />
      </label>
      <button type="button" className="btn">Send</button>
      <p className="text-xs text-neutral-500">Demo only — wire this up later.</p>
    </form>
  );
}
