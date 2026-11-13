import { prisma } from "@/lib/prisma";
import { LeadsClient } from "./LeadsClient";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const since = new Date(Date.now() - 60 * 86400000);
  const [leads, users] = await Promise.all([
    prisma.lead.findMany({
      where: { OR: [{ stage: { notIn: ["Won", "Lost"] } }, { updatedAt: { gte: since } }] },
      orderBy: { createdAt: "desc" },
      include: { assignedTo: { select: { name: true } }, tasks: { where: { done: false }, orderBy: { dueAt: "asc" }, take: 1 } },
    }),
    prisma.user.findMany({ where: { active: true, role: { in: ["ADMIN", "OFFICE", "SALES"] } }, select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);
  const rows = leads.map((l) => ({
    id: l.id,
    name: l.name,
    phone: l.phone,
    email: l.email,
    address: [l.address, l.city].filter(Boolean).join(", "),
    serviceType: l.serviceType,
    leadSource: l.leadSource,
    stage: l.stage,
    estValue: l.estValue,
    assignedTo: l.assignedTo?.name || null,
    createdAt: l.createdAt.toISOString(),
    nextDue: l.tasks[0]?.dueAt?.toISOString() || null,
  }));
  return <LeadsClient initialLeads={rows} users={users} />;
}
