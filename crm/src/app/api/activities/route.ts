import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse, logActivity } from "@/lib/crm";
import { setLeadStage } from "@/lib/leads";

/** Add a note or log a call/visit. type: note | call | visit */
export async function POST(req: NextRequest) {
  const u = await requireUser();
  if (isResponse(u)) return u;
  const b = await req.json();
  if (!b.message?.trim()) return NextResponse.json({ error: "Message required" }, { status: 400 });
  const a = await logActivity({
    type: b.type || "note",
    message: b.message.trim(),
    leadId: b.leadId || null,
    customerId: b.customerId || null,
    jobId: b.jobId || null,
    userId: u.id,
  });
  if (b.leadId && b.type === "call") {
    const lead = await prisma.lead.update({ where: { id: b.leadId }, data: { lastContactAt: new Date() } });
    if (lead.stage === "New") await setLeadStage(lead.id, "Contacted", u.id);
  }
  return NextResponse.json(a);
}
