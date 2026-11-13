import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse, logActivity } from "@/lib/crm";
import { setLeadStage } from "@/lib/leads";
import { formatDateTime } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const u = await requireUser();
  if (isResponse(u)) return u;
  const b = await req.json();
  if (!b.title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 400 });
  const dueAt = b.dueAt ? new Date(b.dueAt) : null;
  const task = await prisma.task.create({
    data: {
      title: b.title.trim(),
      notes: b.notes || null,
      kind: b.kind || "todo",
      dueAt,
      leadId: b.leadId || null,
      customerId: b.customerId || null,
      jobId: b.jobId || null,
      assignedToId: b.assignedToId || u.id,
    },
  });
  if (b.leadId) {
    if (dueAt) {
      const lead = await prisma.lead.findUnique({ where: { id: b.leadId } });
      if (lead && (!lead.nextFollowUpAt || lead.nextFollowUpAt > dueAt || lead.nextFollowUpAt < new Date()))
        await prisma.lead.update({ where: { id: b.leadId }, data: { nextFollowUpAt: dueAt } });
    }
    if (b.kind === "inspection") {
      const lead = await prisma.lead.findUnique({ where: { id: b.leadId } });
      if (lead && ["New", "Contacted"].includes(lead.stage)) await setLeadStage(b.leadId, "Inspection Set", u.id);
      await logActivity({ leadId: b.leadId, userId: u.id, type: "system", message: `Inspection scheduled for ${formatDateTime(dueAt)}` });
    }
  }
  return NextResponse.json(task);
}
