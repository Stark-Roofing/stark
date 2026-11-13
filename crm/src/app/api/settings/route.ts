import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse } from "@/lib/crm";

const KEYS = ["company_name", "company_phone", "company_email", "company_address", "license_number", "notify_email", "review_url", "default_tax_rate", "deposit_pct", "proposal_valid_days", "proposal_terms"];

export async function PATCH(req: Request) {
  const user = await requireUser(["ADMIN", "OFFICE"]);
  if (isResponse(user)) return user;
  const b = await req.json();
  for (const k of KEYS) {
    if (k in b) {
      const value = String(b[k] ?? "");
      await prisma.setting.upsert({ where: { key: k }, update: { value }, create: { key: k, value } });
    }
  }
  return NextResponse.json({ ok: true });
}
