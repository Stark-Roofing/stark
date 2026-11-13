"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LEAD_STAGES, LEAD_SOURCES, JOB_TYPES, LOST_REASONS, formatMoney, timeAgo, telHref } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import { Modal, api } from "@/components/Modal";

export type LeadRow = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string;
  serviceType: string | null;
  leadSource: string | null;
  stage: string;
  estValue: number | null;
  assignedTo: string | null;
  createdAt: string;
  nextDue: string | null;
};

const EMPTY = { name: "", phone: "", email: "", address: "", city: "", zip: "", serviceType: "Roofing", leadSource: "Website", notes: "", estValue: "", assignedToId: "" };

export function LeadsClient({ initialLeads, users }: { initialLeads: LeadRow[]; users: { id: string; name: string }[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [leads, setLeads] = useState(initialLeads);
  const [view, setView] = useState<"board" | "list">("board");
  const [q, setQ] = useState("");
  const [form, setForm] = useState<typeof EMPTY | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [lostFor, setLostFor] = useState<string | null>(null);

  useEffect(() => setLeads(initialLeads), [initialLeads]);
  useEffect(() => {
    if (params.get("new")) setForm({ ...EMPTY });
  }, [params]);
  useEffect(() => {
    if (window.innerWidth < 768) setView("list");
  }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return leads;
    return leads.filter((l) => [l.name, l.phone, l.email, l.address, l.serviceType].some((v) => v?.toLowerCase().includes(s)));
  }, [leads, q]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setBusy(true);
    try {
      const lead = await api("/api/leads", "POST", form);
      setForm(null);
      if (lead.duplicate) alert(`${lead.name} is already in your pipeline. Added a call-back task to the existing lead.`);
      router.push(`/leads/${lead.id}`);
    } catch (err: any) {
      alert(err.message);
    }
    setBusy(false);
  }

  async function move(id: string, stage: string, lostReason?: string) {
    if (stage === "Lost" && !lostReason) return setLostFor(id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage } : l)));
    await api(`/api/leads/${id}`, "PATCH", { stage, lostReason });
    router.refresh();
  }

  const totals = (stage: string) => filtered.filter((l) => l.stage === stage).reduce((s, l) => s + (l.estValue || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <input className="input sm:max-w-xs !py-2.5" placeholder="Search name, phone, address…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-ink-500 overflow-hidden">
            {(["board", "list"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={`px-4 py-2 text-sm capitalize ${view === v ? "bg-gold text-ink-900 font-semibold" : "bg-ink-700 text-gray-300"}`}>
                {v}
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={() => setForm({ ...EMPTY })}>
            + New lead
          </button>
        </div>
      </div>

      {view === "board" ? (
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x">
          {LEAD_STAGES.map((stage) => {
            const items = filtered.filter((l) => l.stage === stage);
            return (
              <div
                key={stage}
                className={`kanban-col w-72 shrink-0 snap-start ${dragId ? "border-dashed" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragId) move(dragId, stage);
                  setDragId(null);
                }}
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="font-semibold text-sm text-gray-200">
                    {stage} <span className="text-gray-500">({items.length})</span>
                  </div>
                  {totals(stage) > 0 && <div className="text-xs text-gold">{formatMoney(totals(stage)).replace(".00", "")}</div>}
                </div>
                {items.map((l) => (
                  <Link
                    key={l.id}
                    href={`/leads/${l.id}`}
                    draggable
                    onDragStart={() => setDragId(l.id)}
                    onDragEnd={() => setDragId(null)}
                    className="kanban-card block"
                  >
                    <div className="font-medium text-gray-100">{l.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5 truncate">{l.address || l.phone || l.email}</div>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-gray-400">{l.serviceType || "—"}</span>
                      <span className="text-gray-500">{timeAgo(l.createdAt)}</span>
                    </div>
                    {l.nextDue && new Date(l.nextDue) < new Date() && stage !== "Won" && stage !== "Lost" && (
                      <div className="mt-2 text-[11px] text-rose-300 font-semibold">Follow-up overdue</div>
                    )}
                  </Link>
                ))}
                {items.length === 0 && <div className="text-xs text-gray-600 text-center py-6">Drop here</div>}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((l) => (
            <div key={l.id} className="card p-4 flex items-center gap-3">
              <Link href={`/leads/${l.id}`} className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-100">{l.name}</span>
                  <StatusBadge status={l.stage} />
                </div>
                <div className="text-xs text-gray-400 mt-1 truncate">
                  {[l.serviceType, l.address || l.email, l.leadSource].filter(Boolean).join(" · ")}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {timeAgo(l.createdAt)}
                  {l.estValue ? ` · ${formatMoney(l.estValue)}` : ""}
                  {l.assignedTo ? ` · ${l.assignedTo}` : ""}
                </div>
              </Link>
              {l.phone && (
                <a href={telHref(l.phone)} className="btn-ghost !px-3 !py-3 text-lg" aria-label={`Call ${l.name}`}>
                  ☎
                </a>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="card-padded text-center text-gray-500 text-sm py-12">No leads yet. New website leads will show up here automatically.</div>
          )}
        </div>
      )}

      {form && (
        <Modal title="New lead" onClose={() => setForm(null)}>
          <form onSubmit={create} className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="label">Name *</label>
              <input className="input !py-2.5" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoFocus />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input !py-2.5" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input !py-2.5" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="col-span-2">
              <label className="label">Address</label>
              <input className="input !py-2.5" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div>
              <label className="label">City</label>
              <input className="input !py-2.5" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
            <div>
              <label className="label">Zip</label>
              <input className="input !py-2.5" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
            </div>
            <div>
              <label className="label">Service</label>
              <select className="input !py-2.5" value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })}>
                {JOB_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
                <option>Roof Repair</option>
                <option>Gutters</option>
              </select>
            </div>
            <div>
              <label className="label">Source</label>
              <select className="input !py-2.5" value={form.leadSource} onChange={(e) => setForm({ ...form, leadSource: e.target.value })}>
                {LEAD_SOURCES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Est. value</label>
              <input className="input !py-2.5" inputMode="decimal" value={form.estValue} onChange={(e) => setForm({ ...form, estValue: e.target.value })} />
            </div>
            <div>
              <label className="label">Assigned to</label>
              <select className="input !py-2.5" value={form.assignedToId} onChange={(e) => setForm({ ...form, assignedToId: e.target.value })}>
                <option value="">Me</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="label">Notes</label>
              <textarea className="input" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <button className="btn-primary col-span-2 justify-center !py-3" disabled={busy}>
              {busy ? "Saving…" : "Create lead"}
            </button>
          </form>
        </Modal>
      )}

      {lostFor && (
        <Modal title="Why was it lost?" onClose={() => setLostFor(null)}>
          <div className="grid grid-cols-1 gap-2">
            {LOST_REASONS.map((r) => (
              <button
                key={r}
                className="btn-ghost justify-center !py-3"
                onClick={() => {
                  move(lostFor, "Lost", r);
                  setLostFor(null);
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
