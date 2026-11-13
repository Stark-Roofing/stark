import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { formatMoney, timeAgo, OPEN_STAGES, telHref } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import { TaskItem, type TaskRow } from "@/components/Tasks";

export const dynamic = "force-dynamic";

const ACT_ICON: Record<string, string> = { note: "✎", call: "☎", sms: "✉", email: "@", stage_change: "➜", system: "•", proposal: "§" };

export default async function TodayPage() {
  const me = await getSessionUser();
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  const fieldOnly = me?.role === "FIELD";

  const [tasks, newLeads, waiting, pipeline, activity, jobs] = await Promise.all([
    prisma.task.findMany({
      where: { done: false, dueAt: { lte: endOfDay }, ...(fieldOnly ? { assignedToId: me!.id } : {}) },
      orderBy: { dueAt: "asc" },
      take: 50,
      include: {
        assignedTo: { select: { name: true } },
        lead: { select: { id: true, name: true } },
        customer: { select: { id: true, name: true } },
        job: { select: { id: true, jobType: true, customer: { select: { name: true } } } },
      },
    }),
    fieldOnly ? [] : prisma.lead.findMany({ where: { stage: "New" }, orderBy: { createdAt: "desc" }, take: 10 }),
    fieldOnly
      ? []
      : prisma.proposal.findMany({ where: { status: { in: ["Sent", "Viewed"] } }, orderBy: { sentAt: "asc" }, take: 10, select: { id: true, number: true, clientName: true, total: true, status: true, sentAt: true, viewedAt: true } }),
    fieldOnly ? [] : prisma.lead.groupBy({ by: ["stage"], where: { stage: { in: OPEN_STAGES } }, _count: true, _sum: { estValue: true } }),
    prisma.activity.findMany({ orderBy: { createdAt: "desc" }, take: 12, include: { user: { select: { name: true } }, lead: { select: { id: true, name: true } } } }),
    prisma.job.findMany({ where: { status: { in: ["Scheduled", "In Progress"] } }, orderBy: { startDate: "asc" }, take: 6, include: { customer: { select: { name: true } } } }),
  ]);

  const rows: TaskRow[] = tasks.map((t) => ({
    id: t.id,
    title: t.title,
    dueAt: t.dueAt?.toISOString() || null,
    done: t.done,
    kind: t.kind,
    assignedToName: t.assignedTo?.name,
    context: t.lead
      ? { label: t.lead.name, href: `/leads/${t.lead.id}` }
      : t.job
        ? { label: `${t.job.customer.name} · ${t.job.jobType}`, href: `/jobs/${t.job.id}` }
        : t.customer
          ? { label: t.customer.name, href: `/customers?open=${t.customer.id}` }
          : undefined,
  }));
  const overdue = rows.filter((t) => t.dueAt && new Date(t.dueAt) < now);
  const today = rows.filter((t) => !t.dueAt || new Date(t.dueAt) >= now);
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const pipeTotal = (pipeline as any[]).reduce((s, p) => s + (p._sum.estValue || 0), 0);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-4xl text-gray-100 leading-none">
          {greeting}
          {me?.name ? `, ${me.name.split(" ")[0]}` : ""}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {overdue.length > 0 ? <span className="text-rose-300">{overdue.length} overdue · </span> : null}
          {today.length} due today{!fieldOnly && ` · ${newLeads.length} new lead${newLeads.length === 1 ? "" : "s"} waiting`}
        </p>
      </div>

      {!fieldOnly && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {OPEN_STAGES.map((s) => {
            const p = (pipeline as any[]).find((x) => x.stage === s);
            return (
              <Link key={s} href="/leads" className="card-padded hover:border-gold transition">
                <div className="text-xs uppercase tracking-wider text-gray-500">{s}</div>
                <div className="font-display text-3xl text-gray-100 mt-1">{p?._count || 0}</div>
                <div className="text-xs text-gold">{formatMoney(p?._sum.estValue || 0)}</div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="card-padded">
            <h3 className="font-display text-2xl text-gray-100 mb-3">To do today</h3>
            {rows.length === 0 ? (
              <div className="text-sm text-gray-500 py-4">All caught up. 🎉</div>
            ) : (
              <div className="space-y-1">
                {overdue.length > 0 && <div className="text-xs uppercase tracking-wider text-rose-300 mt-1 mb-1">Overdue</div>}
                {overdue.map((t) => (
                  <TaskItem key={t.id} t={t} />
                ))}
                {overdue.length > 0 && today.length > 0 && <div className="text-xs uppercase tracking-wider text-gray-500 mt-3 mb-1">Today</div>}
                {today.map((t) => (
                  <TaskItem key={t.id} t={t} />
                ))}
              </div>
            )}
          </div>

          {!fieldOnly && (
            <div className="card-padded">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-2xl text-gray-100">New leads – call them</h3>
                <Link href="/leads?new=1" className="text-sm text-gold">
                  + Add
                </Link>
              </div>
              {newLeads.length === 0 ? (
                <div className="text-sm text-gray-500">No uncontacted leads.</div>
              ) : (
                <ul className="divide-y divide-ink-600">
                  {(newLeads as any[]).map((l) => (
                    <li key={l.id} className="flex items-center gap-3 py-2.5">
                      <Link href={`/leads/${l.id}`} className="flex-1 min-w-0">
                        <div className="text-sm text-gray-100 truncate">{l.name}</div>
                        <div className="text-xs text-gray-500 truncate">
                          {[l.serviceType, l.leadSource, timeAgo(l.createdAt)].filter(Boolean).join(" · ")}
                        </div>
                      </Link>
                      {l.phone && (
                        <a href={telHref(l.phone)} className="btn-primary !px-4 !py-2.5">
                          ☎ Call
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="space-y-5">
          {!fieldOnly && (
            <div className="card-padded">
              <h3 className="font-display text-2xl text-gray-100 mb-1">Waiting on signature</h3>
              <div className="text-xs text-gray-500 mb-3">Open pipeline: {formatMoney(pipeTotal)}</div>
              {waiting.length === 0 ? (
                <div className="text-sm text-gray-500">No proposals out.</div>
              ) : (
                <ul className="divide-y divide-ink-600">
                  {(waiting as any[]).map((p) => (
                    <li key={p.id}>
                      <Link href={`/proposals/${p.id}`} className="flex items-center justify-between gap-2 py-2.5 hover:text-gold">
                        <span className="min-w-0">
                          <span className="block text-sm truncate">{p.clientName}</span>
                          <span className="block text-xs text-gray-500">
                            {p.number} · sent {timeAgo(p.sentAt)}
                          </span>
                        </span>
                        <span className="text-right shrink-0">
                          <span className="block text-sm">{formatMoney(p.total)}</span>
                          <StatusBadge status={p.status} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="card-padded">
            <h3 className="font-display text-2xl text-gray-100 mb-3">Active jobs</h3>
            {jobs.length === 0 ? (
              <div className="text-sm text-gray-500">No active jobs.</div>
            ) : (
              <ul className="divide-y divide-ink-600">
                {jobs.map((j) => (
                  <li key={j.id}>
                    <Link href={`/jobs/${j.id}`} className="flex items-center justify-between gap-2 py-2.5 hover:text-gold">
                      <span className="min-w-0">
                        <span className="block text-sm truncate">{j.customer.name}</span>
                        <span className="block text-xs text-gray-500">{j.jobType}</span>
                      </span>
                      <StatusBadge status={j.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card-padded">
            <h3 className="font-display text-2xl text-gray-100 mb-3">Recent activity</h3>
            {activity.length === 0 ? (
              <div className="text-sm text-gray-500">Nothing yet.</div>
            ) : (
              <ul className="space-y-2.5">
                {activity.map((a) => (
                  <li key={a.id} className="flex gap-2.5 text-sm">
                    <span className="text-gold w-4 shrink-0 text-center">{ACT_ICON[a.type] || "•"}</span>
                    <span className="min-w-0">
                      {a.lead && (
                        <Link href={`/leads/${a.lead.id}`} className="text-gray-100 hover:text-gold">
                          {a.lead.name}:{" "}
                        </Link>
                      )}
                      <span className="text-gray-400">{a.message}</span>
                      <span className="block text-xs text-gray-600">
                        {a.user?.name ? `${a.user.name} · ` : ""}
                        {timeAgo(a.createdAt)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
