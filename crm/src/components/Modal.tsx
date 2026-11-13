"use client";
import { useEffect } from "react";

export function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 flex items-end md:items-center justify-center md:p-4" onClick={onClose}>
      <div
        className={`card w-full ${wide ? "md:max-w-3xl" : "md:max-w-lg"} max-h-[92vh] overflow-y-auto rounded-b-none md:rounded-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-ink-800 flex items-center justify-between px-5 py-4 border-b border-ink-600 z-10">
          <h2 className="font-display text-2xl text-gray-100">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gold text-2xl leading-none px-2" aria-label="Close">
            ×
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export async function api<T = any>(url: string, method: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data as T;
}
