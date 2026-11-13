import { NextResponse } from "next/server";
import { runAutomations } from "@/lib/automations";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function authorized(req: Request) {
  const secret = process.env.CRON_SECRET;
  const url = new URL(req.url);
  if (secret && (req.headers.get("authorization") === `Bearer ${secret}` || url.searchParams.get("secret") === secret)) return true;
  const u = await getSessionUser();
  return u?.role === "ADMIN";
}

async function handle(req: Request) {
  if (!(await authorized(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const only = new URL(req.url).searchParams.get("only") || undefined;
  return NextResponse.json({ ok: true, ranAt: new Date().toISOString(), results: await runAutomations({ only }) });
}

export const GET = handle;
export const POST = handle;
