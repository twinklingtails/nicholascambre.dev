// app/jemma-lite/lib/api.ts
//
// Typed client for the Next.js proxy at /api/jemma/*.
// All functions are stateless — pass the bearer token in explicitly.
// The hooks layer owns auth state; this file just talks to the network.

const BASE = "/api/jemma";

/** Thrown by every helper here on non-2xx. Carries the HTTP status so
 *  callers can distinguish 401 (re-auth) from 502 (server down). */
export class JemmaApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "JemmaApiError";
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Internal: JSON request helper for the non-streaming endpoints.
// ────────────────────────────────────────────────────────────────────────────

async function request<T>(
  path: string,
  init: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, headers, ...rest } = init;
  const h = new Headers(headers);
  if (token) h.set("Authorization", `Bearer ${token}`);
  if (rest.body && !h.has("Content-Type")) {
    h.set("Content-Type", "application/json");
  }

  const res = await fetch(`${BASE}${path}`, { ...rest, headers: h });
  const text = await res.text();

  // Try to parse JSON. The C++ server always sends JSON for the non-stream
  // endpoints, but proxy errors might be plain text.
  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!res.ok) {
    const msg =
      isErrorBody(body)
        ? body.error
        : typeof body === "string" && body
          ? body
          : `HTTP ${res.status}`;
    throw new JemmaApiError(res.status, msg);
  }

  return body as T;
}

function isErrorBody(b: unknown): b is { error: string } {
  return (
    !!b &&
    typeof b === "object" &&
    "error" in b &&
    typeof (b as Record<string, unknown>).error === "string"
  );
}

// ────────────────────────────────────────────────────────────────────────────
// /health — open, no auth.
// ────────────────────────────────────────────────────────────────────────────

export function health(): Promise<{ status: string }> {
  return request("/health");
}

// ────────────────────────────────────────────────────────────────────────────
// /auth/* — login, verify, logout.
// ────────────────────────────────────────────────────────────────────────────

export function login(
  username: string,
  password: string,
): Promise<{ token: string }> {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function verify(token: string): Promise<{ status: string }> {
  return request("/auth/verify", { token });
}

export function logout(token: string): Promise<{ status: string }> {
  return request("/auth/logout", { method: "POST", token });
}

// ────────────────────────────────────────────────────────────────────────────
// /chat — streaming. Different return type, so it bypasses `request()`.
// ────────────────────────────────────────────────────────────────────────────

/**
 * POST /chat — returns the raw SSE byte stream. Feed it into readSSE().
 * Throws JemmaApiError on non-2xx (commonly 401 if the token is stale).
 */
export async function chatStream(
  token: string,
  message: string,
  signal?: AbortSignal,
): Promise<ReadableStream<Uint8Array>> {
  const res = await fetch(`${BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "text/event-stream",
    },
    body: JSON.stringify({ message }),
    signal,
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new JemmaApiError(
      res.status,
      detail.slice(0, 300) || `HTTP ${res.status}`,
    );
  }
  return res.body;
}

export function chatCancel(token: string): Promise<{ cancelled: boolean }> {
  return request("/chat/cancel", { method: "POST", token });
}

export function chatNew(token: string): Promise<{ ok: boolean }> {
  return request("/chat/new", { method: "POST", token });
}