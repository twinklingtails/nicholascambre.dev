// app/api/jemma-lite/request-access/route.ts

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// ── Rate limit ──────────────────────────────────────────────────────────

const ipHits = new Map<string, number[]>();
const WINDOW_MS = 24 * 60 * 60 * 1000; // 1 day
const MAX_PER_WINDOW = 1;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const prior = (ipHits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (prior.length >= MAX_PER_WINDOW) {
    ipHits.set(ip, prior);
    return true;
  }

  prior.push(now);
  ipHits.set(ip, prior);
  return false;
}

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";

  return req.headers.get("x-real-ip") ?? "unknown";
}

// ── Validation ──────────────────────────────────────────────────────────

interface RequestBody {
  name?: string;
  email?: string;
  useCase?: string;
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Route ───────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!DISCORD_WEBHOOK_URL) {
    return NextResponse.json(
      { error: "DISCORD_WEBHOOK_URL not configured" },
      { status: 503 },
    );
  }

  let body: RequestBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields. Pretend success so they don't retry.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const useCase = (body.useCase ?? "").trim();

  if (!name || name.length > 100) {
    return NextResponse.json(
      { error: "Name is required (≤100 chars)." },
      { status: 400 },
    );
  }

  if (!email || email.length > 200 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }

  if (useCase.length < 30 || useCase.length > 2000) {
    return NextResponse.json(
      { error: "Use case must be between 30 and 2000 characters." },
      { status: 400 },
    );
  }

  const ip = clientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error:
          "Thanks — submissions are limited to one per visitor. If you submitted in error or need to follow up, please reach Nicholas through the contact page.",
        alreadySubmitted: true,
      },
      { status: 429 },
    );
  }

  const embed = {
    title: "New Jemma access request",
    color: 0x00b8c8,
    fields: [
      { name: "Name", value: name, inline: true },
      { name: "Email", value: email, inline: true },
      { name: "Use case", value: useCase },
    ],
    footer: { text: `IP: ${ip}` },
    timestamp: new Date().toISOString(),
  };

  try {
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(
        "[request-access] Discord webhook failed:",
        res.status,
        detail,
      );

      return NextResponse.json(
        { error: "Could not deliver request. Please try again or email directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[request-access] webhook error:", e);

    return NextResponse.json(
      { error: "Could not deliver request. Please try again or email directly." },
      { status: 502 },
    );
  }
}