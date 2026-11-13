import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse } from "@/lib/crm";
import { setLeadStage } from "@/lib/leads";

const FIELDS = ["name", "phone", "email", "address", "city", "zip", "serviceType", "leadSource", "notes", "assignedToId", "lostReason"] as const;

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const u = await requireUser(["ADMIN", "OFFICE", "SALES"]);
  if (isResponse(u)) return u;
  const b = await req.json();
  const data: Record<string, any> = {};
  for (const f of FIELDS) if (f in b) data[f] = b[f] === "" ? null : b[f];
  if ("estValue" in b) data.estValue = b.estValue === "" || b.estValue == null ? null : Number(b.estValue);
  if ("nextFollowUpAt" in b) data.nextFollowUpAt = b.nextFollowUpAt ? new Date(b.nextFollowUpAt) : null;
  if (data.name === null) delete data.name;
  if (Object.keys(data).length) await prisma.lead.update({ where: { id: params.id }, data });
  if (b.stage) await setLeadStage(params.id, b.stage, u.id, { lostReason: b.lostReason });
  const lead = await prisma.lead.findUnique({ where: { id: params.id } });
  return NextResponse.json(lead);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const u = await requireUser(["ADMIN", "OFFICE"]);
  if (isResponse(u)) return u;
  await prisma.lead.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
