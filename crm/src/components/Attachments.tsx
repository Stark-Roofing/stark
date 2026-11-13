"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PHOTO_TAGS, DOC_TAGS, formatDate } from "@/lib/utils";
import { api } from "./Modal";

export type AttachmentRow = { id: string; url: string; filename: string; kind: string; tag: string | null; caption: string | null; createdAt: string };

/** Downscale big photos on the phone before upload so field uploads are quick. */
async function shrink(file: File, max = 2000): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.size < 600_000) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.82));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export function Attachments({ items, link }: { items: AttachmentRow[]; link: { leadId?: string; customerId?: string; jobId?: string } }) {
  const router = useRouter();
  const camRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [tag, setTag] = useState<string>("before");
  const [busy, setBusy] = useState("");
  const [filter, setFilter] = useState<"all" | "photo" | "document">("all");
  const [open, setOpen] = useState<number | null>(null);

  const shown = items.filter((i) => filter === "all" || i.kind === filter);
  const photos = shown.filter((i) => i.kind === "photo");

  async function upload(list: FileList | null) {
    if (!list || !list.length) return;
    const files = Array.from(list);
    setBusy(`Uploading ${files.length}…`);
    try {
      const fd = new FormData();
      for (const f of files) fd.append("files", await shrink(f));
      Object.entries(link).forEach(([k, v]) => v && fd.append(k, v));
      fd.append("tag", tag);
      const r = await fetch("/api/attachments", { method: "POST", body: fd });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Upload failed");
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setBusy("");
      if (camRef.current) camRef.current.value = "";
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this file?")) return;
    await api(`/api/attachments/${id}`, "DELETE");
    setOpen(null);
    router.refresh();
  }

  async function caption(a: AttachmentRow) {
    const c = prompt("Caption", a.caption || "");
    if (c === null) return;
    await api(`/api/attachments/${a.id}`, "PATCH", { caption: c });
    router.refresh();
  }

  const current = open != null ? photos[open] : null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <select className="input !w-auto !py-2.5" value={tag} onChange={(e) => setTag(e.target.value)}>
          <optgroup label="Photos">
            {PHOTO_TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </optgroup>
          <optgroup label="Documents">
            {DOC_TAGS.map((t) => (
              <option key={"d" + t} value={t}>
                {t}
              </option>
            ))}
          </optgroup>
        </select>
        <button className="btn-primary !py-2.5" onClick={() => camRef.current?.click()} disabled={!!busy}>
          📷 Take photos
        </button>
        <button className="btn-ghost !py-2.5" onClick={() => fileRef.current?.click()} disabled={!!busy}>
          ⇪ Upload files
        </button>
        {busy && <span className="text-sm text-gold">{busy}</span>}
        <input ref={camRef} type="file" accept="image/*" capture="environment" multiple hidden onChange={(e) => upload(e.target.files)} />
        <input ref={fileRef} type="file" multiple hidden accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.txt" onChange={(e) => upload(e.target.files)} />
        <div className="flex-1" />
        <div className="flex gap-1 text-xs">
          {(["all", "photo", "document"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-2.5 py-1.5 rounded-md ${filter === f ? "bg-gold text-ink-900" : "bg-ink-700 text-gray-300"}`}>
              {f === "all" ? "All" : f === "photo" ? "Photos" : "Docs"}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="text-sm text-gray-500 py-6 text-center border border-dashed border-ink-500 rounded-xl">No files yet. Snap before/after photos right from your phone.</div>
      ) : (
        <>
          {photos.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              {photos.map((p, i) => (
                <button key={p.id} onClick={() => setOpen(i)} className="relative aspect-square rounded-lg overflow-hidden bg-ink-700 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.caption || p.filename} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition" />
                  {p.tag && <span className="absolute top-1 left-1 text-[10px] uppercase tracking-wide bg-black/70 text-gold px-1.5 py-0.5 rounded">{p.tag}</span>}
                </button>
              ))}
            </div>
          )}
          {shown.some((d) => d.kind !== "photo") && (
            <ul className="mt-4 divide-y divide-ink-600">
              {shown
                .filter((d) => d.kind !== "photo")
                .map((d) => (
                  <li key={d.id} className="flex items-center gap-3 py-2.5">
                    <span className="text-xl">📄</span>
                    <a href={d.url} target="_blank" rel="noreferrer" className="flex-1 min-w-0 hover:text-gold">
                      <div className="text-sm truncate">{d.caption || d.filename}</div>
                      <div className="text-xs text-gray-500">
                        {d.tag || "document"} · {formatDate(d.createdAt)}
                      </div>
                    </a>
                    <button onClick={() => remove(d.id)} className="text-xs text-rose-400">
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </>
      )}

      {current && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col" onClick={() => setOpen(null)}>
          <div className="flex items-center justify-between p-4 text-sm" onClick={(e) => e.stopPropagation()}>
            <span className="text-gray-300 truncate">
              {current.tag && <span className="text-gold uppercase mr-2">{current.tag}</span>}
              {current.caption || current.filename}
            </span>
            <span className="flex gap-4 shrink-0">
              <button onClick={() => caption(current)} className="text-gold">
                Caption
              </button>
              <a href={current.url} download className="text-gray-300">
                Save
              </a>
              <button onClick={() => remove(current.id)} className="text-rose-400">
                Delete
              </button>
              <button onClick={() => setOpen(null)} className="text-gray-300 text-lg leading-none">
                ✕
              </button>
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center relative min-h-0" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.url} alt="" className="max-h-full max-w-full object-contain" />
            {open! > 0 && (
              <button className="absolute left-2 top-1/2 -translate-y-1/2 text-4xl text-white/70 px-3" onClick={() => setOpen(open! - 1)}>
                ‹
              </button>
            )}
            {open! < photos.length - 1 && (
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-4xl text-white/70 px-3" onClick={() => setOpen(open! + 1)}>
                ›
              </button>
            )}
          </div>
          <div className="text-center text-xs text-gray-500 p-3">
            {open! + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
