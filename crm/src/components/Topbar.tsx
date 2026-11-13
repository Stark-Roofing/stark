"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TITLES: [string, string][] = [
  ["/settings/price-book", "Price Book"],
  ["/settings/automations", "Automations"],
  ["/settings/users", "Users"],
  ["/settings/import", "Import from Leap"],
  ["/settings/templates", "Message Templates"],
  ["/settings", "Settings"],
  ["/leads", "Leads"],
  ["/proposals", "Proposals"],
  ["/customers", "Customers"],
  ["/jobs", "Jobs"],
  ["/estimates", "Estimates"],
  ["/invoices", "Invoices"],
  ["/schedule", "Schedule"],
  ["/crew", "Crew & Contacts"],
];

export function Topbar() {
  const pathname = usePathname() || "/";
  const title = TITLES.find(([k]) => pathname.startsWith(k))?.[1] || "Today";

  return (
    <header
      className="sticky top-0 z-20 bg-ink-900/90 backdrop-blur border-b border-ink-600 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-3"
      style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Link href="/" className="md:hidden font-display text-2xl text-gold leading-none">
          STARK
        </Link>
        <h1 className="font-display text-2xl md:text-4xl text-gray-100 leading-none truncate">{title}</h1>
      </div>
      <Link href="/leads?new=1" className="btn-primary !py-2 shrink-0">
        + Lead
      </Link>
    </header>
  );
}
