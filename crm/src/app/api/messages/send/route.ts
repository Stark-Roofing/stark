import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse, logActivity } from "@/lib/crm";
import { sendSms } from "@/lib/notify/sms";
import { sendEmail, emailLayout } from "@/lib/notify/email";
import { setLeadStage } from "@/lib/leads";

/** Send an SMS or email to a lead/customer and log it on the timeline. */
export async function POST(req: NextRequest) {
  const u = await requireUser();
  if (isResponse(u)) return u;
  const b = await req.json();
  const { channel, to, body, subject, leadId, customerId, jobId } = b;
  if (!to || !body) return NextResponse.json({ error: "Recipient and message are required" }, { status: 400 });

  const res =
    channel === "email"
      ? await sendEmail({
          to,
          subject: subject || "Stark Roofing & Renovation",
          html: emailLayout(subject || "", `<div style="font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(body)}</div>`),
          text: body,
          replyTo: u.email,
        })
      : await sendSms(to, body);
  if (!res.ok) return NextResponse.json({ error: res.error || "Send failed" }, { status: 502 });

  await logActivity({
    type: channel === "email" ? "email" : "sms",
    message: `${channel === "email" ? `Email "${subject || ""}"` : "Text"} to ${to}${res.stub ? " (not sent – messaging not set up yet)" : ""}:\n${body}`,
    leadId: leadId || null,
    customerId: customerId || null,
    jobId: jobId || null,
    userId: u.id,
  });
  if (leadId) {
    const lead = await prisma.lead.update({ where: { id: leadId }, data: { lastContactAt: new Date() } });
    if (lead.stage === "New") await setLeadStage(leadId, "Contacted", u.id);
  }
  return NextResponse.json({ ok: true, stub: res.stub });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}
