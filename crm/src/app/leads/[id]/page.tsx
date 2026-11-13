import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { smsConfigured } from "@/lib/notify/sms";
import { getSetting } from "@/lib/crm";
import { LeadDetailClient } from "./LeadDetailClient";

export const dynamic = "force-dynamic";

export default async function LeadPage({ params }: { params: { id: string } }) {
  const [lead, users, templates, me, reviewUrl] = await Promise.all([
    prisma.lead.findUnique({
      where: { id: params.id },
      include: {
        assignedTo: { select: { id: true, name: true } },
        customer: { select: { id: true, name: true, jobs: { select: { id: true, jobType: true, status: true } } } },
        tasks: { orderBy: [{ done: "asc" }, { dueAt: "asc" }], include: { assignedTo: { select: { name: true } } } },
        activities: { orderBy: { createdAt: "desc" }, take: 100, include: { user: { select: { name: true } } } },
        proposals: { orderBy: { createdAt: "desc" }, select: { id: true, number: true, status: true, total: true, createdAt: true } },
        attachments: { orderBy: { createdAt: "desc" } },
      },
    }),
    prisma.user.findMany({ where: { active: true }, select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.messageTemplate.findMany({ orderBy: { name: "asc" } }),
    getSessionUser(),
    getSetting("review_url"),
  ]);
  if (!lead) notFound();

  return (
    <LeadDetailClient
      lead={{
        id: lead.id,
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        address: lead.address,
        city: lead.city,
        zip: lead.zip,
        serviceType: lead.serviceType,
        leadSource: lead.leadSource,
        stage: lead.stage,
        lostReason: lead.lostReason,
        estValue: lead.estValue,
        notes: lead.notes,
        assignedToId: lead.assignedToId,
        utmSource: lead.utmSource,
        utmCampaign: lead.utmCampaign,
        landingPage: lead.landingPage,
        createdAt: lead.createdAt.toISOString(),
        lastContactAt: lead.lastContactAt?.toISOString() || null,
        customer: lead.customer,
      }}
      tasks={lead.tasks.map((t) => ({ id: t.id, title: t.title, dueAt: t.dueAt?.toISOString() || null, done: t.done, kind: t.kind, assignedToName: t.assignedTo?.name }))}
      activities={lead.activities.map((a) => ({ id: a.id, type: a.type, message: a.message, createdAt: a.createdAt.toISOString(), userName: a.user?.name }))}
      proposals={lead.proposals.map((p) => ({ ...p, createdAt: p.createdAt.toISOString() }))}
      attachments={lead.attachments.map((a) => ({ id: a.id, url: a.url, filename: a.filename, kind: a.kind, tag: a.tag, caption: a.caption, createdAt: a.createdAt.toISOString() }))}
      users={users}
      templates={templates}
      smsReady={smsConfigured()}
      me={{ name: me?.name || "" }}
      reviewUrl={reviewUrl}
    />
  );
}
