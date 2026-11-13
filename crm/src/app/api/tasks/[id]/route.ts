import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse, logActivity } from "@/lib/crm";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const u = await requireUser();
  if (isResponse(u)) return u;
  const b = await req.json();
  const data: any = {};
  if ("title" in b) data.title = b.title;
  if ("notes" in b) data.notes = b.notes || null;
  if ("dueAt" in b) data.dueAt = b.dueAt ? new Date(b.dueAt) : null;
  if ("assignedToId" in b) data.assignedToId = b.assignedToId || null;
  if ("done" in b) {
    data.done = !!b.done;
    data.doneAt = b.done ? new Date() : null;
  }
  const task = await prisma.task.update({ where: { id: params.id }, data });
  if (b.done && (task.leadId || task.jobId || task.customerId)) {
    await logActivity({ leadId: task.leadId, jobId: task.jobId, customerId: task.customerId, userId: u.id, type: "task", message: `Completed: ${task.title}` });
  }
  if (b.done && task.leadId) {
    // next follow-up = earliest open task
    const next = await prisma.task.findFirst({ where: { leadId: task.leadId, done: false, dueAt: { not: null } }, orderBy: { dueAt: "asc" } });
    await prisma.lead.update({ where: { id: task.leadId }, data: { nextFollowUpAt: next?.dueAt ?? null } });
  }
  return NextResponse.json(task);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const u = await requireUser();
  if (isResponse(u)) return u;
  await prisma.task.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
