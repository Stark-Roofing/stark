import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/crm";
import { getSessionUser } from "@/lib/auth";
import { SettingsClient } from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [settings, rules, users, templates, me] = await Promise.all([
    getSettings(),
    prisma.automationRule.findMany({ orderBy: { name: "asc" } }),
    prisma.user.findMany({ orderBy: [{ active: "desc" }, { name: "asc" }], select: { id: true, name: true, email: true, phone: true, role: true, active: true } }),
    prisma.messageTemplate.findMany({ orderBy: { name: "asc" } }),
    getSessionUser(),
  ]);
  const webhookToken = process.env.LEAD_WEBHOOK_TOKEN || "";
  return (
    <SettingsClient
      settings={settings}
      rules={rules.map((r) => ({ key: r.key, name: r.name, description: r.description, enabled: r.enabled, config: JSON.parse(r.config || "{}"), lastRunAt: r.lastRunAt?.toISOString() || null }))}
      users={users}
      templates={templates.map((t) => ({ id: t.id, name: t.name, channel: t.channel, subject: t.subject, body: t.body }))}
      me={me!}
      webhookPath={webhookToken ? `/api/leads/webhook?token=${webhookToken}` : ""}
      integrations={{ email: !!process.env.RESEND_API_KEY, sms: !!process.env.TWILIO_ACCOUNT_SID, storage: !!process.env.BLOB_READ_WRITE_TOKEN }}
    />
  );
}
