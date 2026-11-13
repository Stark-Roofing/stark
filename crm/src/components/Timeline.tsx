"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDateTime, timeAgo } from "@/lib/utils";
import { api } from "./Modal";

export type ActivityRow = { id: string; type: string; message: string; createdAt: string; userName?: string | null };

const ICON: Record<string, string> = { note: "✎", call: "☎", sms: "✉", email: "@", stage_change: "➜", system: "•", task: "✓", proposal: "§", photo: "▣" };

export function Timeline({ items, link }: { items: ActivityRow[]; link: { leadId?: string; customerId?: string; jobId?: string } }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  async function add(type: "note" | "call") {
    if (!text.trim()) return;
    setBusy(true);
    try {
      await api("/api/activities", "POST", { ...link, type, message: text });
      setText("");
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    }
    setBusy(false);
  }

  return (
    <div>
      <textarea className="input min-h-[70px]" placeholder="Add a note or log a call…" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex gap-2 mt-2 mb-5">
        <button className="btn-primary" disabled={busy || !text.trim()} onClick={() => add("note")}>
          Add note
        </button>
        <button className="btn-ghost" disabled={busy || !text.trim()} onClick={() => add("call")}>
          ☎ Log call
        </button>
      </div>
      <ul className="space-y-4">
        {items.map((a) => (
          <li key={a.id} className="flex gap-3">
            <div className="w-7 h-7 shrink-0 rounded-full bg-ink-600 text-gold flex items-center justify-center text-sm">{ICON[a.type] || "•"}</div>
            <div className="min-w-0 flex-1">
              <div className="text-sm text-gray-200 whitespace-pre-wrap break-words">{a.message}</div>
              <div className="text-xs text-gray-500 mt-0.5" title={formatDateTime(a.createdAt)}>
                {timeAgo(a.createdAt)}
                {a.userName ? ` · ${a.userName}` : ""}
              </div>
            </div>
          </li>
        ))}
        {items.length === 0 && <li className="text-sm text-gray-500">Nothing yet.</li>}
      </ul>
    </div>
  );
}
