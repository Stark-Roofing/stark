"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROLES, timeAgo } from "@/lib/utils";
import { Modal, api } from "@/components/Modal";

type Rule = { key: string; name: string; description: string; enabled: boolean; config: Record<string, any>; lastRunAt: string | null };
type U = { id: string; name: string; email: string; phone: string | null; role: string; active: boolean };
type T = { id: string; name: string; channel: string; subject: string | null; body: string };

const TABS = ["Company", "Automations", "Team", "Templates", "Connections"] as const;
const ROLE_HELP: Record<string, string> = {
  ADMIN: "Everything, including team & settings",
  OFFICE: "Everything except managing the team",
  SALES: "Leads, proposals, customers, jobs",
  FIELD: "Today, jobs, schedule & photos only",
};

export function SettingsClient(props: {
  settings: Record<string, string>;
  rules: Rule[];
  users: U[];
  templates: T[];
  me: { id: string; role: string; name: string };
  webhookPath: string;
  integrations: { email: boolean; sms: boolean; storage: boolean };
}) {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Company");
  const isAdmin = props.me.role === "ADMIN";
  const canEdit = isAdmin || props.me.role === "OFFICE";
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);

  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${tab === t ? "bg-gold text-ink-900" : "bg-ink-700 text-gray-300"}`}>
            {t}
          </button>
        ))}
        <Link href="/settings/price-book" className="px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap bg-ink-700 text-gray-300">
          Price book →
        </Link>
        {canEdit && (
          <Link href="/settings/import" className="px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap bg-ink-700 text-gray-300">
            Import from Leap →
          </Link>
        )}
      </div>

      {tab === "Company" && <Company settings={props.settings} canEdit={canEdit} onSaved={() => router.refresh()} />}
      {tab === "Automations" && <Automations rules={props.rules} canEdit={canEdit} />}
      {tab === "Team" && <Team users={props.users} isAdmin={isAdmin} meId={props.me.id} />}
      {tab === "Templates" && <Templates templates={props.templates} />}
      {tab === "Connections" && (
        <div className="card-padded space-y-5 text-sm">
          <div>
            <h3 className="font-display text-2xl text-gray-100 mb-1">Website leads (Zapier)</h3>
            <p className="text-gray-400 mb-2">In your Zap, replace the Leap step with “Webhooks by Zapier → POST” to this URL (Payload type: json, pass all fields).</p>
            {props.webhookPath ? (
              <input readOnly className="input font-mono text-xs" value={origin + props.webhookPath} onFocus={(e) => e.target.select()} />
            ) : (
              <p className="text-amber-300">Set LEAD_WEBHOOK_TOKEN in Vercel to turn this on.</p>
            )}
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {(
              [
                ["Email (Resend)", props.integrations.email, "RESEND_API_KEY"],
                ["Text messages (Twilio)", props.integrations.sms, "TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM"],
                ["Photo storage (Vercel Blob)", props.integrations.storage, "BLOB_READ_WRITE_TOKEN"],
              ] as const
            ).map(([n, ok, env]) => (
              <div key={n} className="rounded-xl border border-ink-500 p-3">
                <div className="font-semibold text-gray-100">{n}</div>
                <div className={ok ? "text-emerald-300" : "text-amber-300"}>{ok ? "● Connected" : "○ Not set up"}</div>
                {!ok && <div className="text-xs text-gray-500 mt-1 break-all">Add {env} in Vercel</div>}
              </div>
            ))}
          </div>
          {!props.integrations.sms && <p className="text-gray-500">Without Twilio, “Text” opens your phone’s Messages app with the message filled in, and it’s still logged on the lead.</p>}
        </div>
      )}
    </div>
  );
}

function Company({ settings, canEdit, onSaved }: { settings: Record<string, string>; canEdit: boolean; onSaved: () => void }) {
  const [f, setF] = useState(settings);
  const [saved, setSaved] = useState(false);
  const fields: [string, string, string?][] = [
    ["company_name", "Company name"],
    ["company_phone", "Phone"],
    ["company_email", "Email (reply-to on customer emails)"],
    ["company_address", "Address"],
    ["license_number", "WA contractor license #"],
    ["notify_email", "Send new-lead alerts & daily digest to"],
    ["review_url", "Google review link", "https://g.page/r/…/review"],
    ["default_tax_rate", "Sales tax %"],
    ["deposit_pct", "Deposit % due at signing"],
    ["proposal_valid_days", "Proposal valid for (days)"],
  ];
  async function save(e: React.FormEvent) {
    e.preventDefault();
    await api("/api/settings", "PATCH", f);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onSaved();
  }
  return (
    <form onSubmit={save} className="card-padded grid sm:grid-cols-2 gap-4">
      {fields.map(([k, l, ph]) => (
        <div key={k}>
          <label className="label">{l}</label>
          <input className="input !py-2.5" disabled={!canEdit} placeholder={ph} value={f[k] || ""} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
        </div>
      ))}
      <div className="sm:col-span-2">
        <label className="label">Proposal terms & conditions</label>
        <textarea className="input min-h-[180px] text-sm" disabled={!canEdit} value={f.proposal_terms || ""} onChange={(e) => setF({ ...f, proposal_terms: e.target.value })} />
      </div>
      {canEdit && (
        <div className="sm:col-span-2 flex items-center gap-3">
          <button className="btn-primary !py-3 !px-6">Save</button>
          {saved && <span className="text-emerald-300 text-sm">Saved ✓</span>}
        </div>
      )}
    </form>
  );
}

function Automations({ rules, canEdit }: { rules: Rule[]; canEdit: boolean }) {
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState("");
  async function update(r: Rule, data: Partial<Rule>) {
    await api(`/api/automations/${r.key}`, "PATCH", data);
    router.refresh();
  }
  async function runNow() {
    setRunning(true);
    try {
      const r = await api("/api/cron/run", "POST");
      setResult(r.results.map((x: any) => `${x.rule}: ${x.sent} sent${x.skipped ? ` (${x.skipped})` : ""}`).join(" · ") || "No rules enabled");
      router.refresh();
    } catch (e: any) {
      setResult(e.message);
    }
    setRunning(false);
  }
  return (
    <div className="space-y-3">
      <div className="card-padded flex flex-wrap items-center gap-3 text-sm">
        <span className="text-gray-400 flex-1">These run automatically every morning. Each lead/proposal/job is only handled once.</span>
        {canEdit && (
          <button className="btn-ghost" onClick={runNow} disabled={running}>
            {running ? "Running…" : "Run now"}
          </button>
        )}
        {result && <div className="w-full text-xs text-gold">{result}</div>}
      </div>
      {rules.map((r) => (
        <div key={r.key} className="card-padded flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <div className="font-semibold text-gray-100">{r.name}</div>
            <div className="text-sm text-gray-400">{r.description}</div>
            {r.lastRunAt && <div className="text-xs text-gray-600 mt-1">Last run {timeAgo(r.lastRunAt)}</div>}
          </div>
          {"hours" in r.config && (
            <label className="text-sm text-gray-400 flex items-center gap-2">
              after
              <input type="number" min={1} disabled={!canEdit} className="input !w-20 !py-2" defaultValue={r.config.hours} onBlur={(e) => update(r, { config: { ...r.config, hours: Number(e.target.value) } })} />
              hours
            </label>
          )}
          {"days" in r.config && (
            <label className="text-sm text-gray-400 flex items-center gap-2">
              after
              <input type="number" min={1} disabled={!canEdit} className="input !w-20 !py-2" defaultValue={r.config.days} onBlur={(e) => update(r, { config: { ...r.config, days: Number(e.target.value) } })} />
              days
            </label>
          )}
          <button
            disabled={!canEdit}
            onClick={() => update(r, { enabled: !r.enabled })}
            className={`relative w-14 h-8 rounded-full transition shrink-0 ${r.enabled ? "bg-gold" : "bg-ink-500"}`}
            aria-label={r.enabled ? "Turn off" : "Turn on"}
          >
            <span className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${r.enabled ? "left-7" : "left-1"}`} />
          </button>
        </div>
      ))}
    </div>
  );
}

function Team({ users, isAdmin, meId }: { users: U[]; isAdmin: boolean; meId: string }) {
  const router = useRouter();
  const [edit, setEdit] = useState<Partial<U> & { password?: string } | null>(null);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (edit!.id) await api(`/api/users/${edit!.id}`, "PATCH", edit);
      else await api("/api/users", "POST", edit);
      setEdit(null);
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
  }
  return (
    <div className="card-padded">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-2xl text-gray-100">Team logins</h3>
        {isAdmin && (
          <button className="btn-primary" onClick={() => setEdit({ role: "SALES" })}>
            + Add person
          </button>
        )}
      </div>
      <ul className="divide-y divide-ink-600">
        {users.map((u) => (
          <li key={u.id} className={`flex items-center gap-3 py-3 ${u.active ? "" : "opacity-50"}`}>
            <div className="flex-1 min-w-0">
              <div className="text-gray-100">
                {u.name} {!u.active && <span className="text-xs text-rose-300">(disabled)</span>}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {u.email} · {u.role}
              </div>
            </div>
            {(isAdmin || u.id === meId) && (
              <button className="text-sm text-gold" onClick={() => setEdit({ ...u, password: "" })}>
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
      {edit && (
        <Modal title={edit.id ? `Edit ${edit.name}` : "Add team member"} onClose={() => setEdit(null)}>
          <form onSubmit={save} className="space-y-3">
            <div>
              <label className="label">Name</label>
              <input className="input !py-2.5" required value={edit.name || ""} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
            </div>
            {!edit.id && (
              <div>
                <label className="label">Email (their login)</label>
                <input className="input !py-2.5" type="email" required value={edit.email || ""} onChange={(e) => setEdit({ ...edit, email: e.target.value })} />
              </div>
            )}
            <div>
              <label className="label">Mobile</label>
              <input className="input !py-2.5" value={edit.phone || ""} onChange={(e) => setEdit({ ...edit, phone: e.target.value })} />
            </div>
            {isAdmin && edit.id !== meId && (
              <div>
                <label className="label">Access</label>
                <select className="input !py-2.5" value={edit.role} onChange={(e) => setEdit({ ...edit, role: e.target.value })}>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r} – {ROLE_HELP[r]}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="label">{edit.id ? "New password (leave blank to keep)" : "Password (8+ characters)"}</label>
              <input className="input !py-2.5" type="text" autoComplete="new-password" required={!edit.id} value={edit.password || ""} onChange={(e) => setEdit({ ...edit, password: e.target.value })} />
            </div>
            {isAdmin && edit.id && edit.id !== meId && (
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" checked={edit.active !== false} onChange={(e) => setEdit({ ...edit, active: e.target.checked })} /> Can log in
              </label>
            )}
            <button className="btn-primary w-full justify-center !py-3">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Templates({ templates }: { templates: T[] }) {
  const router = useRouter();
  const [edit, setEdit] = useState<Partial<T> | null>(null);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (edit!.id) await api(`/api/templates/${edit!.id}`, "PATCH", edit);
    else await api("/api/templates", "POST", edit);
    setEdit(null);
    router.refresh();
  }
  async function remove() {
    if (!confirm("Delete this template?")) return;
    await api(`/api/templates/${edit!.id}`, "DELETE");
    setEdit(null);
    router.refresh();
  }
  return (
    <div className="card-padded">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display text-2xl text-gray-100">Message templates</h3>
        <button className="btn-primary" onClick={() => setEdit({ channel: "sms" })}>
          + New
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-3">
        Placeholders: {"{{first_name}} {{name}} {{address}} {{service}} {{user_name}} {{link}} {{review_url}}"}
      </p>
      <ul className="divide-y divide-ink-600">
        {templates.map((t) => (
          <li key={t.id}>
            <button className="w-full text-left py-3 hover:text-gold" onClick={() => setEdit(t)}>
              <div className="text-sm text-gray-100">
                {t.name} <span className="text-xs text-gray-500 uppercase ml-1">{t.channel}</span>
              </div>
              <div className="text-xs text-gray-500 truncate">{t.body}</div>
            </button>
          </li>
        ))}
      </ul>
      {edit && (
        <Modal title={edit.id ? "Edit template" : "New template"} onClose={() => setEdit(null)}>
          <form onSubmit={save} className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="label">Name</label>
                <input className="input !py-2.5" required value={edit.name || ""} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
              </div>
              <div>
                <label className="label">Type</label>
                <select className="input !py-2.5" value={edit.channel} onChange={(e) => setEdit({ ...edit, channel: e.target.value })}>
                  <option value="sms">Text</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>
            {edit.channel === "email" && (
              <div>
                <label className="label">Subject</label>
                <input className="input !py-2.5" value={edit.subject || ""} onChange={(e) => setEdit({ ...edit, subject: e.target.value })} />
              </div>
            )}
            <div>
              <label className="label">Message</label>
              <textarea className="input min-h-[140px]" required value={edit.body || ""} onChange={(e) => setEdit({ ...edit, body: e.target.value })} />
            </div>
            <div className="flex gap-2">
              <button className="btn-primary flex-1 justify-center !py-3">Save</button>
              {edit.id && (
                <button type="button" className="btn-danger" onClick={remove}>
                  Delete
                </button>
              )}
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
