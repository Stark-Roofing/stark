export function formatMoney(n: number | null | undefined): string {
  const v = Number(n ?? 0);
  return v.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function formatDate(d: Date | string | null | undefined): string {
  if (!d) return "-";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDateInput(d: Date | string | null | undefined): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
}

export function formatDateTime(d: Date | string | null | undefined): string {
  if (!d) return "-";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export function timeAgo(d: Date | string | null | undefined): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  const s = Math.round((Date.now() - date.getTime()) / 1000);
  const abs = Math.abs(s);
  const fmt = (n: number, u: string) => `${n}${u}`;
  let out: string;
  if (abs < 60) out = "just now";
  else if (abs < 3600) out = fmt(Math.round(abs / 60), "m");
  else if (abs < 86400) out = fmt(Math.round(abs / 3600), "h");
  else out = fmt(Math.round(abs / 86400), "d");
  if (out === "just now") return out;
  return s >= 0 ? `${out} ago` : `in ${out}`;
}

export function telHref(p?: string | null) {
  return p ? `tel:${p.replace(/[^\d+]/g, "")}` : undefined;
}
export function smsHref(p?: string | null, body?: string) {
  if (!p) return undefined;
  return `sms:${p.replace(/[^\d+]/g, "")}${body ? `?&body=${encodeURIComponent(body)}` : ""}`;
}

/** Fill {{first_name}}, {{name}}, {{address}}, {{link}} etc. */
export function fillTemplate(tpl: string, vars: Record<string, string | null | undefined>) {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => vars[k] ?? "");
}

export const LEAD_STAGES = ["New", "Contacted", "Inspection Set", "Proposal Sent", "Won", "Lost"] as const;
export const OPEN_STAGES = ["New", "Contacted", "Inspection Set", "Proposal Sent"];
export const LEAD_SOURCES = ["Website", "Google Ads", "Google", "Facebook", "Nextdoor", "Referral", "Door Knock", "Yard Sign", "Repeat Customer", "Other"] as const;
export const LOST_REASONS = ["Price", "Went with competitor", "No response", "Insurance denied", "Not ready / timing", "Out of service area", "Other"] as const;
export const PROPOSAL_STATUSES = ["Draft", "Sent", "Viewed", "Signed", "Declined"] as const;
export const PHOTO_TAGS = ["before", "damage", "during", "after", "other"] as const;
export const DOC_TAGS = ["contract", "permit", "proposal", "insurance", "warranty", "other"] as const;
export const ROLES = ["ADMIN", "OFFICE", "SALES", "FIELD"] as const;

export type NavItem = { href: string; label: string; icon: string; roles?: string[]; mobile?: boolean };
export const NAV: NavItem[] = [
  { href: "/", label: "Today", icon: "◎", mobile: true },
  { href: "/leads", label: "Leads", icon: "◉", roles: ["ADMIN", "OFFICE", "SALES"], mobile: true },
  { href: "/proposals", label: "Proposals", icon: "✎", roles: ["ADMIN", "OFFICE", "SALES"], mobile: true },
  { href: "/jobs", label: "Jobs", icon: "⚒", mobile: true },
  { href: "/customers", label: "Customers", icon: "♟", roles: ["ADMIN", "OFFICE", "SALES"] },
  { href: "/schedule", label: "Schedule", icon: "▣" },
  { href: "/estimates", label: "Estimates", icon: "§", roles: ["ADMIN", "OFFICE", "SALES"] },
  { href: "/invoices", label: "Invoices", icon: "$", roles: ["ADMIN", "OFFICE"] },
  { href: "/crew", label: "Crew", icon: "☗" },
  { href: "/settings", label: "Settings", icon: "⚙", roles: ["ADMIN", "OFFICE", "SALES"] },
];
export function navForRole(role?: string) {
  return NAV.filter((n) => !n.roles || (role && n.roles.includes(role)));
}
export const JOB_TYPES = ["Roofing", "Siding", "Drywall", "Painting", "Flooring", "Tile", "Commercial Roof"] as const;
export const JOB_STATUSES = ["Scheduled", "In Progress", "Complete", "On Hold"] as const;
export const ESTIMATE_STATUSES = ["Draft", "Sent", "Approved", "Declined"] as const;
export const INVOICE_STATUSES = ["Unpaid", "Paid", "Partial"] as const;
export const CREW_ROLES = ["Foreman", "Crew", "Sales", "Admin"] as const;
export const PAYMENT_METHODS = ["Cash", "Check", "Credit Card", "ACH/Bank Transfer", "Other"] as const;
export const MATERIALS = [
  "GAF HDZ",
  "GAF Grand Sequoia",
  "GAF Natural Shadow",
  "GAF EverGuard PVC",
  "Uniflex Silicone",
  "Synthetic Underlayment",
  "Ice & Water Shield",
  "Fiber Cement Siding",
  "Drywall 5/8\"",
  "Porcelain Tile",
  "Sherwin Williams Paint",
] as const;

export function statusColor(status: string): string {
  switch (status) {
    case "New":
    case "Scheduled":
    case "Draft":
    case "Unpaid":
      return "bg-ink-500 text-gold-200 border border-ink-400";
    case "Contacted":
    case "Sent":
    case "In Progress":
    case "Partial":
      return "bg-blue-500/15 text-blue-300 border border-blue-500/30";
    case "Inspection Set":
    case "Viewed":
      return "bg-amber-500/15 text-amber-300 border border-amber-500/30";
    case "Proposal Sent":
      return "bg-violet-500/15 text-violet-300 border border-violet-500/30";
    case "Won":
    case "Signed":
    case "Qualified":
    case "Approved":
    case "Complete":
    case "Paid":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
    case "Lost":
    case "Declined":
    case "On Hold":
      return "bg-rose-500/15 text-rose-300 border border-rose-500/30";
    default:
      return "bg-ink-500 text-gray-300 border border-ink-400";
  }
}
