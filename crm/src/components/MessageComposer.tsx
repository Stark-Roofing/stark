"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fillTemplate, smsHref } from "@/lib/utils";
import { Modal, api } from "./Modal";

export type Template = { id: string; name: string; channel: string; subject: string | null; body: string };

export function MessageComposer({
  channel,
  to,
  vars,
  templates,
  link,
  smsReady,
  onClose,
}: {
  channel: "sms" | "email";
  to: string;
  vars: Record<string, string | null | undefined>;
  templates: Template[];
  link: { leadId?: string; customerId?: string; jobId?: string };
  smsReady: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const list = templates.filter((t) => t.channel === channel);
  const [subject, setSubject] = useState(channel === "email" ? "Stark Roofing & Renovation" : "");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  function pick(id: string) {
    const t = list.find((x) => x.id === id);
    if (!t) return;
    setBody(fillTemplate(t.body, vars));
    if (t.subject) setSubject(fillTemplate(t.subject, vars));
  }

  async function send() {
    setBusy(true);
    try {
      const r = await api("/api/messages/send", "POST", { channel, to, subject, body, ...link });
      if (r.stub && channel === "sms") {
        // Texting service not connected yet: open the phone's Messages app instead.
        window.location.href = smsHref(to, body)!;
      }
      onClose();
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    }
    setBusy(false);
  }

  return (
    <Modal title={channel === "sms" ? "Send text" : "Send email"} onClose={onClose}>
      <div className="space-y-3">
        <div className="text-sm text-gray-400">
          To: <span className="text-gray-100">{to}</span>
        </div>
        {list.length > 0 && (
          <select className="input" defaultValue="" onChange={(e) => pick(e.target.value)}>
            <option value="">Use a template…</option>
            {list.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        )}
        {channel === "email" && <input className="input" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />}
        <textarea className="input min-h-[140px] !text-base" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Message…" />
        {channel === "sms" && !smsReady && (
          <p className="text-xs text-amber-300">Texting isn&apos;t connected yet, so this opens your phone&apos;s Messages app with the text filled in. It&apos;s still logged here.</p>
        )}
        <button className="btn-primary w-full justify-center !py-3" disabled={busy || !body.trim()} onClick={send}>
          {busy ? "Sending…" : channel === "sms" ? "Send text" : "Send email"}
        </button>
      </div>
    </Modal>
  );
}
