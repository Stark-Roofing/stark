"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDateTime, timeAgo } from "@/lib/utils";
import { api } from "./Modal";

export type TaskRow = {
  id: string;
  title: string;
  dueAt: string | null;
  done: boolean;
  kind: string;
  assignedToName?: string | null;
  context?: { label: string; href: string } | null;
};

export function TaskItem({ t }: { t: TaskRow }) {
  const router = useRouter();
  const [done, setDone] = useState(t.done);
  const overdue = !done && t.dueAt && new Date(t.dueAt) < new Date();
  async function toggle() {
    setDone(!done);
    await api(`/api/tasks/${t.id}`, "PATCH", { done: !done });
    router.refresh();
  }
  return (
    <li className="flex items-start gap-3 py-2.5">
      <button
        onClick={toggle}
        aria-label={done ? "Mark not done" : "Mark done"}
        className={`mt-0.5 w-6 h-6 shrink-0 rounded-md border-2 flex items-center justify-center ${done ? "bg-gold border-gold text-ink-900" : "border-ink-300 hover:border-gold"}`}
      >
        {done ? "✓" : ""}
      </button>
      <div className="min-w-0 flex-1">
        <div className={`text-sm ${done ? "line-through text-gray-500" : "text-gray-100"}`}>
          {t.kind === "call" ? "☎ " : t.kind === "inspection" ? "⌂ " : ""}
          {t.title}
        </div>
        <div className="text-xs mt-0.5 flex flex-wrap gap-x-2">
          {t.dueAt && <span className={overdue ? "text-rose-300 font-semibold" : "text-gray-500"}>{overdue ? `Overdue · ${timeAgo(t.dueAt)}` : formatDateTime(t.dueAt)}</span>}
          {t.context && (
            <a href={t.context.href} className="text-gold hover:underline">
              {t.context.label}
            </a>
          )}
          {t.assignedToName && <span className="text-gray-500">{t.assignedToName}</span>}
        </div>
      </div>
    </li>
  );
}

function defaultDue() {
  const d = new Date(Date.now() + 24 * 3600 * 1000);
  d.setHours(9, 0, 0, 0);
  return toLocalInput(d);
}
export function toLocalInput(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function TaskList({ tasks, link }: { tasks: TaskRow[]; link: { leadId?: string; customerId?: string; jobId?: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [due, setDue] = useState(defaultDue());
  const [showDone, setShowDone] = useState(false);
  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await api("/api/tasks", "POST", { ...link, title, dueAt: due ? new Date(due).toISOString() : null, kind: /call/i.test(title) ? "call" : "followup" });
    setTitle("");
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={add} className="flex flex-col sm:flex-row gap-2 mb-2">
        <input className="input" placeholder="New follow-up… e.g. Call back Tuesday" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="input sm:max-w-[210px]" type="datetime-local" value={due} onChange={(e) => setDue(e.target.value)} />
        <button className="btn-primary justify-center">Add</button>
      </form>
      <ul className="divide-y divide-ink-600">
        {open.map((t) => (
          <TaskItem key={t.id} t={t} />
        ))}
        {open.length === 0 && <li className="text-sm text-gray-500 py-3">No open follow-ups.</li>}
      </ul>
      {done.length > 0 && (
        <button className="text-xs text-gray-500 hover:text-gold mt-2" onClick={() => setShowDone(!showDone)}>
          {showDone ? "Hide" : "Show"} {done.length} completed
        </button>
      )}
      {showDone && (
        <ul className="divide-y divide-ink-600 opacity-70">
          {done.map((t) => (
            <TaskItem key={t.id} t={t} />
          ))}
        </ul>
      )}
    </div>
  );
}
