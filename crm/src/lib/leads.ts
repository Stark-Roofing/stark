import { prisma } from "./prisma";
import { logActivity, findDuplicate, getSetting, siteUrl } from "./crm";
import { sendEmail, emailLayout } from "./notify/email";

export type LeadInput = {
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  zip?: string | null;
  serviceType?: string | null;
  leadSource?: string | null;
  notes?: string | null;
  estValue?: number | null;
  utmSource?: string | null;
  utmCampaign?: string | null;
  landingPage?: string | null;
  assignedToId?: string | null;
};

const clean = (v: unknown) => {
  if (v == null) return null;
  const s = String(v).trim();
  return s ? s : null;
};

/** Map a website / Zapier payload (snake_case or camelCase) to LeadInput. */
export function mapWebPayload(b: Record<string, any>): LeadInput {
  const first = clean(b.first_name ?? b.firstName);
  const last = clean(b.last_name ?? b.lastName);
  const name = clean(b.name ?? b.full_name ?? b.fullName) || [first, last].filter(Boolean).join(" ") || null;
  const utmSource = clean(b.utm_source ?? b.utmSource);
  const gclid = clean(b.gclid);
  let source = clean(b.lead_source ?? b.leadSource ?? b.source);
  if (!source || /website|form|landing/i.test(source)) source = gclid || /google|cpc|ads/i.test(utmSource || "") ? "Google Ads" : "Website";
  const extra = [
    b.message && `Message: ${b.message}`,
    b.details && `Details: ${b.details}`,
    gclid && `gclid: ${gclid}`,
    b.utm_term && `Keyword: ${b.utm_term}`,
  ].filter(Boolean);
  return {
    name: name || undefined,
    phone: clean(b.phone ?? b.phone_number),
    email: clean(b.email)?.toLowerCase() || null,
    address: clean(b.address ?? b.street),
    city: clean(b.city),
    zip: clean(b.zip ?? b.zipcode ?? b.postal_code),
    serviceType: clean(b.service ?? b.service_type ?? b.serviceType),
    leadSource: source,
    utmSource,
    utmCampaign: clean(b.utm_campaign ?? b.utmCampaign),
    landingPage: clean(b.landing_page ?? b.landingPage ?? b.page_url),
    notes: extra.length ? extra.join("\n") : null,
  };
}

/**
 * Create a lead (or attach to an existing one when phone/email matches),
 * add a "call" task and notify the office.
 */
export async function intakeLead(input: LeadInput, opts: { userId?: string | null; via?: string; notify?: boolean } = {}) {
  const name = input.name?.trim() || input.phone || input.email || "Unknown";
  const dup = await findDuplicate(input.phone, input.email);

  if (dup.lead && !["Won", "Lost"].includes(dup.lead.stage)) {
    await logActivity({
      leadId: dup.lead.id,
      type: "system",
      message: `Submitted again${opts.via ? ` via ${opts.via}` : ""}${input.serviceType ? ` – ${input.serviceType}` : ""}${input.notes ? `\n${input.notes}` : ""}`,
    });
    await prisma.task.create({
      data: { title: `Call back ${dup.lead.name} (submitted again)`, kind: "call", dueAt: new Date(Date.now() + 15 * 60000), leadId: dup.lead.id, assignedToId: dup.lead.assignedToId },
    });
    return { lead: dup.lead, duplicate: true };
  }

  const lead = await prisma.lead.create({
    data: {
      name,
      phone: input.phone || null,
      email: input.email || null,
      address: input.address || null,
      city: input.city || null,
      zip: input.zip || null,
      serviceType: input.serviceType || null,
      leadSource: input.leadSource || null,
      notes: input.notes || null,
      estValue: input.estValue ?? null,
      utmSource: input.utmSource || null,
      utmCampaign: input.utmCampaign || null,
      landingPage: input.landingPage || null,
      assignedToId: input.assignedToId || null,
      nextFollowUpAt: new Date(Date.now() + 15 * 60000),
    },
  });
  await logActivity({
    leadId: lead.id,
    userId: opts.userId,
    type: "system",
    message: `Lead created${opts.via ? ` via ${opts.via}` : ""}${dup.customer ? ` (matches existing customer ${dup.customer.name})` : ""}`,
  });
  await prisma.task.create({
    data: { title: `Call new lead: ${lead.name}`, kind: "call", dueAt: new Date(Date.now() + 15 * 60000), leadId: lead.id, assignedToId: lead.assignedToId },
  });

  if (opts.notify !== false) {
    const to = await getSetting("notify_email", process.env.ADMIN_EMAIL || "");
    if (to) {
      const row = (k: string, v?: string | null) => (v ? `<tr><td style="color:#6b7280;padding:4px 12px 4px 0">${k}</td><td>${v}</td></tr>` : "");
      await sendEmail({
        to,
        subject: `New lead: ${lead.name}${lead.serviceType ? ` – ${lead.serviceType}` : ""}`,
        html: emailLayout(
          "New lead",
          `<table style="font-size:14px">${row("Name", lead.name)}${row("Phone", lead.phone)}${row("Email", lead.email)}${row("Address", [lead.address, lead.city, lead.zip].filter(Boolean).join(", "))}${row("Service", lead.serviceType)}${row("Source", lead.leadSource)}</table>
          <p><a href="${siteUrl()}/leads/${lead.id}" style="background:#B8960C;color:#000;padding:10px 16px;border-radius:6px;text-decoration:none;font-weight:bold">Open lead</a></p>`
        ),
      });
    }
  }
  return { lead, duplicate: false };
}

/** Change stage with timeline entry. */
export async function setLeadStage(leadId: string, stage: string, userId?: string | null, extra: { lostReason?: string | null } = {}) {
  const before = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!before || before.stage === stage) return before;
  const lead = await prisma.lead.update({
    where: { id: leadId },
    data: {
      stage,
      lostReason: stage === "Lost" ? extra.lostReason || before.lostReason || "Other" : null,
      nextFollowUpAt: ["Won", "Lost"].includes(stage) ? null : before.nextFollowUpAt,
    },
  });
  await logActivity({
    leadId,
    userId,
    type: "stage_change",
    message: `Stage: ${before.stage} → ${stage}${stage === "Lost" && lead.lostReason ? ` (${lead.lostReason})` : ""}`,
  });
  if (["Won", "Lost"].includes(stage)) {
    await prisma.task.updateMany({ where: { leadId, done: false }, data: { done: true, doneAt: new Date() } });
  }
  return lead;
}

export async function convertLead(leadId: string, userId: string | null, opts: { jobType?: string; contractValue?: number | null } = {}) {
  const lead = await prisma.lead.findUnique({ where: { id: leadId }, include: { customer: true } });
  if (!lead) return null;
  const customer =
    lead.customer ||
    (await prisma.customer.create({
      data: { name: lead.name, phone: lead.phone, email: lead.email, address: lead.address, city: lead.city, zip: lead.zip, leadId: lead.id },
    }));
  let jobId: string | null = null;
  if (opts.jobType) {
    const job = await prisma.job.create({
      data: {
        customerId: customer.id,
        jobType: opts.jobType,
        status: "Scheduled",
        contractValue: opts.contractValue ?? lead.estValue ?? null,
        address: [lead.address, lead.city].filter(Boolean).join(", ") || null,
      },
    });
    jobId = job.id;
  }
  // move lead photos/docs onto the customer/job
  await prisma.attachment.updateMany({ where: { leadId: lead.id }, data: { customerId: customer.id, ...(jobId ? { jobId } : {}) } });
  await setLeadStage(lead.id, "Won", userId);
  await logActivity({ leadId: lead.id, customerId: customer.id, jobId, userId, type: "system", message: `Converted to customer${jobId ? " + job created" : ""}` });
  return { ...customer, jobId };
}
