// app/projects/content.tsx
export const projectContent: Record<string, React.ReactNode> = {
  "cloudflare-nginx-edge": (
    <>
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <p className="text-white/80">Edge cache rules, cache busting, and safe deploys…</p>
      <h3 className="text-xl font-semibold mt-8 mb-2">Highlights</h3>
      <ul className="list-disc pl-5 text-white/80 space-y-2">
        <li>Canary deploys via headers</li>
        <li>Strict TLS and security headers</li>
        <li>Automatic rollback</li>
      </ul>
    </>
  ),
  // add others here...
};
