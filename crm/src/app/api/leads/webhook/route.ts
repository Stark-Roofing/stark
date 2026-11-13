import { NextRequest, NextResponse } from "next/server";
import { intakeLead, mapWebPayload } from "@/lib/leads";

/**
 * Public lead intake for Zapier / the website form.
 * POST /api/leads/webhook?token=LEAD_WEBHOOK_TOKEN
 * Accepts JSON, text/plain JSON (what the website sends) or form-encoded.
 */
export async function POST(req: NextRequest) {
  const expected = process.env.LEAD_WEBHOOK_TOKEN;
  const token = req.nextUrl.searchParams.get("token") || req.headers.get("x-webhook-token");
  if (!expected || token !== expected) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const raw = await req.text();
  let body: Record<string, any> = {};
  try {
    body = JSON.parse(raw);
  } catch {
    body = Object.fromEntries(new URLSearchParams(raw));
  }
  if (Array.isArray(body)) body = body[0] || {};
  const input = mapWebPayload(body);
  if (!input.name && !input.phone && !input.email) {
    return NextResponse.json({ error: "Need at least a name, phone or email" }, { status: 400 });
  }
  const { lead, duplicate } = await intakeLead(input, { via: "website" });
  return NextResponse.json({ ok: true, id: lead.id, duplicate }, { headers: { "Access-Control-Allow-Origin": "*" } });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" },
  });
}
