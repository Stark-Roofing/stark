import { prisma } from "./prisma";
import { NextResponse } from "next/server";
import { getSessionUser, type SessionUser } from "./auth";

export async function logActivity(data: {
  type: string;
  message: string;
  leadId?: string | null;
  customerId?: string | null;
  jobId?: string | null;
  proposalId?: string | null;
  userId?: string | null;
}) {
  return prisma.activity.create({ data: { ...data } as any });
}

export async function getSetting(key: string, fallback = ""): Promise<string> {
  const s = await prisma.setting.findUnique({ where: { key } });
  return s?.value ?? fallback;
}

export async function getSettings(): Promise<Record<string, string>> {
  const rows = await prisma.setting.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export function siteUrl(): string {
  return (process.env.NEXTAUTH_URL || process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` || "http://localhost:3001").replace(/\/$/, "");
}

export function digits(p?: string | null) {
  const d = (p || "").replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
}

/** Find an existing lead/customer with the same phone (last 10 digits) or email. */
export async function findDuplicate(phone?: string | null, email?: string | null) {
  const d = digits(phone);
  const e = (email || "").trim().toLowerCase();
  const or: any[] = [];
  if (e) or.push({ email: { equals: e, mode: "insensitive" } });
  if (d.length >= 10) or.push({ phone: { contains: d.slice(-4) } });
  if (!or.length) return { lead: null, customer: null };
  const [leads, customers] = await Promise.all([
    prisma.lead.findMany({ where: { OR: or }, take: 20, orderBy: { createdAt: "desc" } }),
    prisma.customer.findMany({ where: { OR: or }, take: 20 }),
  ]);
  const match = (x: { phone: string | null; email: string | null }) =>
    (e && (x.email || "").toLowerCase() === e) || (d.length >= 10 && digits(x.phone) === d);
  return { lead: leads.find(match) || null, customer: customers.find(match) || null };
}

export async function nextProposalNumber(): Promise<string> {
  const count = await prisma.proposal.count();
  let n = 1001 + count;
  // guard against gaps/collisions
  while (await prisma.proposal.findUnique({ where: { number: `P-${n}` } })) n++;
  return `P-${n}`;
}

/** For route handlers: returns the user or a 401 response. */
export async function requireUser(roles?: string[]): Promise<SessionUser | NextResponse> {
  const u = await getSessionUser();
  if (!u) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (roles && !roles.includes(u.role)) return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  return u;
}

export function isResponse(x: unknown): x is NextResponse {
  return x instanceof NextResponse;
}

export function parseJson<T>(s: string | null | undefined, fallback: T): T {
  try {
    return s ? (JSON.parse(s) as T) : fallback;
  } catch {
    return fallback;
  }
}
