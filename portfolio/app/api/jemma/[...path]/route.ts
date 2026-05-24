// app/api/jemma/[...path]/route.ts
//
// Catch-all streaming proxy. Browser hits /api/jemma/<anything>,
// we forward to the C++ Jemma server at $JEMMA_URL and pipe the
// response (including SSE) straight back.

import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const JEMMA_URL = process.env.JEMMA_URL;

async function proxy(
  req: NextRequest,
  ctx: { params: Promise<{ path?: string[] }> },
): Promise<Response> {
  if (!JEMMA_URL) {
    return new Response(
      JSON.stringify({ error: "JEMMA_URL not configured" }),
      { status: 503, headers: { "content-type": "application/json" } },
    );
  }

  const { path } = await ctx.params;
  const tail = "/" + (path?.join("/") ?? "");
  const url =
    JEMMA_URL.replace(/\/+$/, "") + tail + (req.nextUrl.search || "");

  const headers = new Headers();
  const auth = req.headers.get("authorization");
  if (auth) headers.set("authorization", auth);
  const ct = req.headers.get("content-type");
  if (ct) headers.set("content-type", ct);
  headers.set("accept", "text/event-stream, application/json");

  let body: string | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.text();
  }

  const ctrl = new AbortController();
  req.signal.addEventListener("abort", () => ctrl.abort());

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: req.method,
      headers,
      body,
      signal: ctrl.signal,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(
      JSON.stringify({ error: `bad gateway: ${msg}` }),
      { status: 502, headers: { "content-type": "application/json" } },
    );
  }

  const respHeaders = new Headers();
  const upstreamCT = upstream.headers.get("content-type");
  if (upstreamCT) respHeaders.set("content-type", upstreamCT);
  respHeaders.set("cache-control", "no-cache, no-transform");
  respHeaders.set("x-accel-buffering", "no");

  return new Response(upstream.body, {
    status: upstream.status,
    headers: respHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const OPTIONS = proxy;