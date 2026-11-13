"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LEAD_STAGES, LEAD_SOURCES, LOST_REASONS, JOB_TYPES, formatMoney, formatDate, telHref, timeAgo } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import { Modal, api } from "@/components/Modal";
import { Timeline, type ActivityRow } from "@/components/Timeline";
import { TaskList, toLocalInput, type TaskRow } from "@/components/Tasks";
import { MessageComposer, type Template } from "@/components/MessageComposer";
import { Attachments, type AttachmentRow } from "@/components/Attachments";

type Lead = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  zip: string | null;
  serviceType: string | null;
  leadSource: string | null;
  stage: string;
  lostReason: string | null;
  estValue: number | null;
  notes: string | null;
  assignedToId: string | null;
  utmSource: string | null;
  utmCampaign: string | null;
  landingPage: string | null;
  createdAt: string;
  lastContactAt: string | null;
  customer: { id: string; name: string; jobs: { id: string; jobType: string; status: string }[] } | null;
};

export function LeadDetailClient(props: {
  lead: Lead;
  tasks: TaskRow[];
  activities: ActivityRow[];
  proposals: { id: string; number: string; status: string; total: number; createdAt: string }[];
  attachments: AttachmentRow[];
  users: { id: string; name: string }[];
  templates: Template[];
  smsReady: boolean;
  me: { name: string };
  reviewUrl: string;
}) {
  const { lead } = props;
  const router = useRouter();
  const [msg, setMsg] = useState<"sms" | "email" | null>(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ ...lead, estValue: lead.estValue ?? "" } as any);
  const [inspect, setInspect] = useState(false);
  const [inspectAt, setInspectAt] = useState(() => {
    const d = new Date(Date.now() + 86400000);
    d.setHours(10, 0, 0, 0);
    return toLocalInput(d);
  });
  const [lost, setLost] = useState(false);
  const [won, setWon] = useState(false);
  const [jobType, setJobType] = useState(lead.serviceType && (JOB_TYPES as readonly string[]).includes(lead.serviceType) ? lead.serviceType : "Roofing");
  const [tab, setTab] = useState<"activity" | "photos">("activity");

  const first = lead.name.split(" ")[0];
  const fullAddress = [lead.address, lead.city, lead.zip].filter(Boolean).join(", ");
  const vars = { first_name: first, name: lead.name, address: fullAddress, service: lead.serviceType || "roofing project", user_name: props.me.name, review_url: props.reviewUrl, link: "" };

  async function patch(data: any) {
    try {
      await api(`/api/leads/${lead.id}`, "PATCH", data);
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    }
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    await patch(form);
    setEdit(false);
  }

  async function scheduleInspection() {
    await api("/api/tasks", "POST", { leadId: lead.id, title: `Roof inspection – ${lead.name}${fullAddress ? ` @ ${fullAddress}` : ""}`, kind: "inspection", dueAt: new Date(inspectAt).toISOString() });
    setInspect(false);
    router.refresh();
  }

  async function markWon() {
    const r = await api(`/api/leads/${lead.id}/convert`, "POST", { jobType, contractValue: lead.estValue });
    setWon(false);
    if (r.jobId) router.push(`/jobs?open=${r.jobId}`);
    else router.refresh();
  }

  async function remove() {
    if (!confirm(`Delete ${lead.name}? This can't be undone.`)) return;
    await api(`/api/leads/${lead.id}`, "DELETE");
    router.push("/leads");
  }

  const closed = lead.stage === "Won" || lead.stage === "Lost";

  return (
    <div className="space-y-5">
      <Link href="/leads" className="text-sm text-gray-400 hover:text-gold">
        ← All leads
      </Link>

      {/* Header */}
      <div className="card-padded">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-display text-4xl text-gray-100 leading-none">{lead.name}</h2>
              <StatusBadge status={lead.stage} />
            </div>
            <div className="text-sm text-gray-400 mt-2 space-y-0.5">
              {fullAddress && (
                <a className="block hover:text-gold" target="_blank" rel="noreferrer" href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}>
                  ⌖ {fullAddress}
                </a>
              )}
              <div>
                {[lead.serviceType, lead.leadSource, `added ${timeAgo(lead.createdAt)}`].filter(Boolean).join(" · ")}
                {lead.estValue ? ` · ${formatMoney(lead.estValue)}` : ""}
              </div>
              {lead.stage === "Lost" && lead.lostReason && <div className="text-rose-300">Lost: {lead.lostReason}</div>}
              {lead.customer && (
                <Link href={`/customers?open=${lead.customer.id}`} className="text-gold hover:underline block">
                  Customer record →
                </Link>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-4 gap-2 lg:w-[380px] shrink-0">
            <a href={telHref(lead.phone)} className={`btn-ghost flex-col !gap-1 !py-3 justify-center text-xs ${!lead.phone ? "pointer-events-none opacity-40" : ""}`}>
              <span className="text-xl">☎</span>Call
            </a>
            <button disabled={!lead.phone} onClick={() => setMsg("sms")} className="btn-ghost flex-col !gap-1 !py-3 justify-center text-xs disabled:opacity-40">
              <span className="text-xl">✉</span>Text
            </button>
            <button disabled={!lead.email} onClick={() => setMsg("email")} className="btn-ghost flex-col !gap-1 !py-3 justify-center text-xs disabled:opacity-40">
              <span className="text-xl">@</span>Email
            </button>
            <button onClick={() => setInspect(true)} className="btn-ghost flex-col !gap-1 !py-3 justify-center text-xs">
              <span className="text-xl">⌂</span>Inspect
            </button>
          </div>
        </div>

        {/* Stage stepper */}
        <div className="mt-5 flex gap-1.5 overflow-x-auto pb-1">
          {LEAD_STAGES.filter((s) => s !== "Won" && s !== "Lost").map((s) => (
            <button
              key={s}
              onClick={() => patch({ stage: s })}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap border ${
                lead.stage === s ? "bg-gold text-ink-900 border-gold" : "bg-ink-700 text-gray-300 border-ink-500 hover:border-gold"
              }`}
            >
              {s}
            </button>
          ))}
          <div className="flex-1" />
          {!closed && (
            <>
              <button onClick={() => setWon(true)} className="px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-600/40 whitespace-nowrap">
                ✓ Won
              </button>
              <button onClick={() => setLost(true)} className="px-3 py-2 rounded-lg text-xs font-semibold bg-rose-600/20 text-rose-300 border border-rose-600/40 whitespace-nowrap">
                ✕ Lost
              </button>
            </>
          )}
          {closed && (
            <button onClick={() => patch({ stage: "Contacted" })} className="px-3 py-2 rounded-lg text-xs font-semibold bg-ink-700 text-gray-300 border border-ink-500 whitespace-nowrap">
              Reopen
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Proposals */}
          <div className="card-padded">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-2xl text-gray-100">Proposals</h3>
              <Link href={`/proposals/new?leadId=${lead.id}`} className="btn-primary">
                + Build proposal
              </Link>
            </div>
            {props.proposals.length === 0 ? (
              <div className="text-sm text-gray-500">No proposals yet. Build a Good / Better / Best proposal on the spot after the inspection.</div>
            ) : (
              <ul className="divide-y divide-ink-600">
                {props.proposals.map((p) => (
                  <li key={p.id}>
                    <Link href={`/proposals/${p.id}`} className="flex items-center justify-between py-2.5 hover:text-gold">
                      <span className="text-sm">
                        {p.number} · {formatDate(p.createdAt)}
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="text-sm text-gray-300">{p.total ? formatMoney(p.total) : ""}</span>
                        <StatusBadge status={p.status} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card-padded">
            <div className="flex gap-4 border-b border-ink-600 mb-4 -mt-1">
              {(["activity", "photos"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`pb-2 text-sm font-semibold capitalize ${tab === t ? "text-gold border-b-2 border-gold" : "text-gray-400"}`}>
                  {t === "photos" ? `Photos & docs (${props.attachments.length})` : "Activity"}
                </button>
              ))}
            </div>
            {tab === "activity" ? <Timeline items={props.activities} link={{ leadId: lead.id }} /> : <Attachments items={props.attachments} link={{ leadId: lead.id }} />}
          </div>
        </div>

        <div className="space-y-5">
          <div className="card-padded">
            <h3 className="font-display text-2xl text-gray-100 mb-3">Follow-ups</h3>
            <TaskList tasks={props.tasks} link={{ leadId: lead.id }} />
          </div>

          <div className="card-padded">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-2xl text-gray-100">Details</h3>
              <button className="text-sm text-gold hover:underline" onClick={() => setEdit(true)}>
                Edit
              </button>
            </div>
            <dl className="text-sm space-y-2">
              <Row k="Phone" v={lead.phone && <a href={telHref(lead.phone)} className="text-gold">{lead.phone}</a>} />
              <Row k="Email" v={lead.email && <a href={`mailto:${lead.email}`} className="text-gold break-all">{lead.email}</a>} />
              <Row k="Assigned" v={props.users.find((u) => u.id === lead.assignedToId)?.name} />
              <Row k="Last contact" v={lead.lastContactAt ? timeAgo(lead.lastContactAt) : "Never"} />
              <Row k="Campaign" v={[lead.utmSource, lead.utmCampaign].filter(Boolean).join(" / ")} />
              <Row k="Page" v={lead.landingPage} />
            </dl>
            {lead.notes && <div className="mt-3 text-sm text-gray-300 whitespace-pre-wrap border-t border-ink-600 pt-3">{lead.notes}</div>}
            <button onClick={remove} className="text-xs text-rose-400 hover:underline mt-4">
              Delete lead
            </button>
          </div>
        </div>
      </div>

      {msg && (
        <MessageComposer
          channel={msg}
          to={msg === "sms" ? lead.phone! : lead.email!}
          vars={vars}
          templates={props.templates}
          link={{ leadId: lead.id }}
          smsReady={props.smsReady}
          onClose={() => setMsg(null)}
        />
      )}

      {inspect && (
        <Modal title="Schedule inspection" onClose={() => setInspect(false)}>
          <label className="label">Date & time</label>
          <input type="datetime-local" className="input !py-3 !text-base" value={inspectAt} onChange={(e) => setInspectAt(e.target.value)} />
          <p className="text-xs text-gray-500 mt-2">Adds it to your Today list and moves the lead to “Inspection Set”.</p>
          <button className="btn-primary w-full justify-center !py-3 mt-4" onClick={scheduleInspection}>
            Schedule
          </button>
        </Modal>
      )}

      {lost && (
        <Modal title="Why was it lost?" onClose={() => setLost(false)}>
          <div className="grid gap-2">
            {LOST_REASONS.map((r) => (
              <button
                key={r}
                className="btn-ghost justify-center !py-3"
                onClick={async () => {
                  await patch({ stage: "Lost", lostReason: r });
                  setLost(false);
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </Modal>
      )}

      {won && (
        <Modal title="Mark as won" onClose={() => setWon(false)}>
          <p className="text-sm text-gray-400 mb-3">Creates the customer and a job. (Signing a proposal does this automatically.)</p>
          <label className="label">Job type</label>
          <select className="input !py-3" value={jobType} onChange={(e) => setJobType(e.target.value)}>
            {JOB_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <button className="btn-primary w-full justify-center !py-3 mt-4" onClick={markWon}>
            Create customer + job
          </button>
        </Modal>
      )}

      {edit && (
        <Modal title="Edit lead" onClose={() => setEdit(false)}>
          <form onSubmit={saveEdit} className="grid grid-cols-2 gap-3">
            {(
              [
                ["name", "Name", 2],
                ["phone", "Phone", 1],
                ["email", "Email", 1],
                ["address", "Address", 2],
                ["city", "City", 1],
                ["zip", "Zip", 1],
                ["serviceType", "Service", 1],
                ["estValue", "Est. value", 1],
              ] as const
            ).map(([k, l, span]) => (
              <div key={k} className={span === 2 ? "col-span-2" : ""}>
                <label className="label">{l}</label>
                <input className="input !py-2.5" value={form[k] ?? ""} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
              </div>
            ))}
            <div>
              <label className="label">Source</label>
              <select className="input !py-2.5" value={form.leadSource || ""} onChange={(e) => setForm({ ...form, leadSource: e.target.value })}>
                <option value="">—</option>
                {LEAD_SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Assigned to</label>
              <select className="input !py-2.5" value={form.assignedToId || ""} onChange={(e) => setForm({ ...form, assignedToId: e.target.value })}>
                <option value="">Nobody</option>
                {props.users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="label">Notes</label>
              <textarea className="input min-h-[90px]" value={form.notes || ""} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <button className="btn-primary col-span-2 justify-center !py-3">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  if (!v) return null;
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-gray-500 shrink-0">{k}</dt>
      <dd className="text-gray-200 text-right min-w-0 truncate">{v}</dd>
    </div>
  );
}
