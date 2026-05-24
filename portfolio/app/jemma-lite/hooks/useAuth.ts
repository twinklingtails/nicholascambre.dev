// app/jemma-lite/hooks/useAuth.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  verify as apiVerify,
} from "../lib/api";
import type { AuthState } from "../types";

// Storage keys are namespaced to avoid colliding with anything else
// the site might store.
const TOKEN_KEY = "jemma.token";
const USERNAME_KEY = "jemma.username";

// ────────────────────────────────────────────────────────────────────────────
// localStorage helpers. Each is wrapped in try/catch because storage can
// throw — Safari private mode, quota exceeded, disabled by extension, etc.
// ────────────────────────────────────────────────────────────────────────────

function readPersisted(): { token: string; username: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const username = window.localStorage.getItem(USERNAME_KEY);
    if (token && username) return { token, username };
  } catch {}
  return null;
}

function persist(token: string, username: string): void {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USERNAME_KEY, username);
  } catch {}
}

function clearPersisted(): void {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USERNAME_KEY);
  } catch {}
}

// ────────────────────────────────────────────────────────────────────────────
// Hook
// ────────────────────────────────────────────────────────────────────────────

export interface UseAuth {
  state: AuthState;
  /** True while we're verifying a persisted token on mount. */
  loading: boolean;
  /** Throws on failure — caller wraps in try/catch for the form error. */
  login(username: string, password: string): Promise<void>;
  /** Fire-and-forget revoke + local clear. */
  logout(): Promise<void>;
  /** Called by useChat when the server returns 401 mid-stream. */
  invalidate(): void;
}

export function useAuth(): UseAuth {
  const [state, setState] = useState<AuthState>({ status: "anonymous" });
  const [loading, setLoading] = useState(true);

  // On mount, rehydrate from localStorage and verify the token is still
  // valid against the server (it could have been revoked from another tab,
  // or the server could have restarted with a fresh token store).
  useEffect(() => {
    let cancelled = false;

    const persisted = readPersisted();
    if (!persisted) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        await apiVerify(persisted.token);
        if (cancelled) return;
        setState({
          status: "authed",
          token: persisted.token,
          username: persisted.username,
        });
      } catch {
        // 401, network down, or anything else — drop the stale token.
        if (cancelled) return;
        clearPersisted();
        setState({ status: "anonymous" });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(
    async (username: string, password: string): Promise<void> => {
      const { token } = await apiLogin(username, password);
      persist(token, username);
      setState({ status: "authed", token, username });
    },
    [],
  );

  const logout = useCallback(async (): Promise<void> => {
    // Snapshot the token before we clear state, then fire-and-forget the
    // revoke. We don't block the UI on the network roundtrip; the user
    // is logged out locally the moment they click.
    setState(prev => {
      if (prev.status === "authed") {
        apiLogout(prev.token).catch(() => {});
      }
      return { status: "anonymous" };
    });
    clearPersisted();
  }, []);

  const invalidate = useCallback((): void => {
    clearPersisted();
    setState({ status: "anonymous" });
  }, []);

  return { state, loading, login, logout, invalidate };
}