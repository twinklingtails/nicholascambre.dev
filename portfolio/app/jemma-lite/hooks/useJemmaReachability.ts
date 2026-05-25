// app/jemma-lite/hooks/useJemmaReachability.ts
"use client";

import { useEffect, useState } from "react";

/**
 * One-shot reachability check against /api/jemma/health on mount.
 *
 *   null   — still checking
 *   true   — proxy returned 200
 *   false  — proxy returned non-2xx, timed out, or network failed
 *
 * Doesn't poll. If Jemma goes offline mid-session the existing
 * useChat error path catches it.
 */
export function useJemmaReachability(): boolean | null {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();
    // 3s ceiling — health is fast when Jemma is up, fail-fast when she isn't.
    const timer = setTimeout(() => ctrl.abort(), 3000);

    (async () => {
      try {
        const res = await fetch("/api/jemma/health", {
          signal: ctrl.signal,
          cache: "no-store",
        });
        if (cancelled) return;
        setOnline(res.ok);
      } catch {
        if (cancelled) return;
        setOnline(false);
      } finally {
        clearTimeout(timer);
      }
    })();

    return () => {
      cancelled = true;
      ctrl.abort();
      clearTimeout(timer);
    };
  }, []);

  return online;
}