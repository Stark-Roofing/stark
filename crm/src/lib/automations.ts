import { prisma } from "./prisma";
import { sendEmail, emailLayout } from "./notify/email";
import { sendSms, smsConfigured } from "./notify/sms";
import { getSettings, siteUrl, logActivity, parseJson } from "./crm";
import { fillTemplate, formatMoney, formatDateTime } from "./utils";

type Result = { rule: string; sent: number; skipped?: string };

async function already(ruleKey: string, refId: string) {
  return !!(await prisma.automationLog.findFirst({ where: { ruleKey, refId } }));
}
async function log(ruleKey: string, refId: string | null, message: string) {
  await prisma.automationLog.create({ data: { ruleKey, refId, message } });
}
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Runs every enabled automation. Safe to call repeatedly: each item is handled once (AutomationLog refId). */
export async function runAutomations(opts: { only?: string } = {}): Promise<Result[]> {
  const rules = await prisma.automationRule.findMany({ where: { enabled: true, ...(opts.only ? { key: opts.only } : {}) } });
  const s = await getSettings();
  const base = siteUrl();
  const office = s.notify_email || process.env.ADMIN_EMAIL || "";
  const company = s.company_name || "Stark Roofing & Renovation";
  const out: Result[] = [];

  for (const rule of rules) {
    const cfg = parseJson<Record<string, any>>(rule.config, {});
    let sent = 0;
    try {
      if (rule.key === "new_lead_untouched") {
        const hours = Number(cfg.hours) || 24;
        const leads = await prisma.lead.findMany({
          where: { stage: "New", lastContactAt: null, createdAt: { lte: new Date(Date.now() - hours * 3600_000) } },
          include: { assignedTo: { select: { email: true } } },
          take: 50,
        });
        const fresh = [];
        for (const l of leads) if (!(await already(rule.key, l.id))) fresh.push(l);
        if (fresh.length && office) {
          const list = fresh.map((l) => `<li><a href="${base}/leads/${l.id}">${esc(l.name)}</a> – ${esc(l.phone || l.email || "")} (${esc(l.leadSource || "")})</li>`).join("");
          await sendEmail({
            to: office,
            subject: `⚠ ${fresh.length} lead${fresh.length > 1 ? "s" : ""} not contacted in ${hours}h`,
            html: emailLayout("Leads waiting for a call", `<p>These leads have had no contact for over ${hours} hours:</p><ul>${list}</ul>`),
          });
          for (const l of fresh) await log(rule.key, l.id, `Alerted: ${l.name}`);
          sent = fresh.length;
        }
      }

      if (rule.key === "proposal_reminder") {
        const days = Number(cfg.days) || 3;
        const props = await prisma.proposal.findMany({
          where: { status: { in: ["Sent", "Viewed"] }, reminderSentAt: null, sentAt: { lte: new Date(Date.now() - days * 86400_000) } },
          take: 50,
        });
        for (const p of props) {
          if (!p.clientEmail) continue;
          const link = `${base}/p/${p.publicToken}`;
          const first = p.clientName.split(" ")[0];
          await sendEmail({
            to: p.clientEmail,
            replyTo: s.company_email || undefined,
            subject: `Reminder: your ${company} proposal`,
            html: emailLayout(
              "Your proposal is waiting",
              `<p>Hi ${esc(first)},</p><p>Just a friendly reminder that your roofing proposal (${p.number}) is ready whenever you are. You can compare the options and sign online:</p><p><a class="btn" href="${link}">View proposal</a></p><p>Questions? Call or text ${esc(s.company_phone || "")}.</p>`
            ),
          });
          await prisma.proposal.update({ where: { id: p.id }, data: { reminderSentAt: new Date() } });
          await logActivity({ type: "email", message: `Automatic reminder sent for proposal ${p.number}`, leadId: p.leadId, customerId: p.customerId, proposalId: p.id });
          await log(rule.key, p.id, `Reminder: ${p.number}`);
          sent++;
        }
      }

      if (rule.key === "review_request") {
        const days = Number(cfg.days) || 2;
        const jobs = await prisma.job.findMany({
          where: { status: "Complete", completedAt: { lte: new Date(Date.now() - days * 86400_000), gte: new Date(Date.now() - 30 * 86400_000) } },
          include: { customer: true },
          take: 50,
        });
        const tpl = await prisma.messageTemplate.findFirst({ where: { name: "Review request" } });
        for (const j of jobs) {
          if (await already(rule.key, j.id)) continue;
          if (!s.review_url) {
            out.push({ rule: rule.key, sent: 0, skipped: "Set your Google review link in Settings first" });
            break;
          }
          const c = j.customer;
          const body = fillTemplate(tpl?.body || "Hi {{first_name}}, thank you for choosing Stark Roofing! Would you leave us a quick review? {{review_url}}", {
            first_name: c.name.split(" ")[0],
            review_url: s.review_url,
          });
          let how = "";
          if (c.phone && smsConfigured()) {
            await sendSms(c.phone, body);
            how = "text";
          } else if (c.email) {
            await sendEmail({ to: c.email, subject: `Thank you from ${company}`, html: emailLayout("Thank you!", `<p>${esc(body).replace(esc(s.review_url), `<a href="${s.review_url}">${esc(s.review_url)}</a>`)}</p>`) });
            how = "email";
          }
          if (!how) continue;
          await logActivity({ type: how === "text" ? "sms" : "email", message: `Automatic review request sent by ${how}`, customerId: c.id, jobId: j.id });
          await log(rule.key, j.id, `Review request: ${c.name}`);
          sent++;
        }
      }

      if (rule.key === "daily_digest" && office) {
        const today = new Date().toISOString().slice(0, 10);
        if (!(await already(rule.key, today))) {
          const end = new Date();
          end.setHours(23, 59, 59, 999);
          const [tasks, newLeads, waiting] = await Promise.all([
            prisma.task.findMany({ where: { done: false, dueAt: { lte: end } }, orderBy: { dueAt: "asc" }, include: { lead: { select: { name: true } }, assignedTo: { select: { name: true } } }, take: 40 }),
            prisma.lead.findMany({ where: { createdAt: { gte: new Date(Date.now() - 86400_000) } }, take: 30 }),
            prisma.proposal.findMany({ where: { status: { in: ["Sent", "Viewed"] } }, take: 30 }),
          ]);
          const now = new Date();
          const li = (x: string) => `<li>${x}</li>`;
          const section = (title: string, items: string[]) => (items.length ? `<h3>${title} (${items.length})</h3><ul>${items.join("")}</ul>` : "");
          const html =
            section(
              "Tasks due",
              tasks.map((t) => li(`${t.dueAt && t.dueAt < now ? "<b style='color:#e11d48'>OVERDUE</b> " : ""}${esc(t.title)}${t.lead ? ` – ${esc(t.lead.name)}` : ""} <span style="color:#888">${t.dueAt ? formatDateTime(t.dueAt) : ""}${t.assignedTo ? ` · ${esc(t.assignedTo.name)}` : ""}</span>`))
            ) +
            section("New leads (last 24h)", newLeads.map((l) => li(`<a href="${base}/leads/${l.id}">${esc(l.name)}</a> – ${esc(l.serviceType || "")} ${esc(l.leadSource || "")}`))) +
            section("Proposals waiting on signature", waiting.map((p) => li(`<a href="${base}/proposals/${p.id}">${p.number}</a> ${esc(p.clientName)} – ${formatMoney(p.total)} (${p.status})`)));
          if (html) {
            await sendEmail({ to: office, subject: `Today at ${company}: ${tasks.length} tasks, ${newLeads.length} new leads`, html: emailLayout("Your day", html + `<p><a class="btn" href="${base}">Open the CRM</a></p>`) });
            sent = 1;
          }
          await log(rule.key, today, html ? "Digest sent" : "Nothing to report");
        }
      }

      await prisma.automationRule.update({ where: { key: rule.key }, data: { lastRunAt: new Date() } });
      if (!out.find((o) => o.rule === rule.key)) out.push({ rule: rule.key, sent });
    } catch (e: any) {
      console.error(`[automation ${rule.key}]`, e);
      out.push({ rule: rule.key, sent, skipped: e?.message || "error" });
    }
  }
  return out;
}
