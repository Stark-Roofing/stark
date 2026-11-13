import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse } from "@/lib/crm";
import { intakeLead } from "@/lib/leads";

export async function GET() {
  const u = await requireUser();
  if (isResponse(u)) return u;
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  const u = await requireUser(["ADMIN", "OFFICE", "SALES"]);
  if (isResponse(u)) return u;
  const b = await req.json();
  if (!b.name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const { lead, duplicate } = await intakeLead(
    { ...b, estValue: b.estValue ? Number(b.estValue) : null, assignedToId: b.assignedToId || u.id },
    { userId: u.id, via: "manual entry", notify: false }
  );
  return NextResponse.json({ ...lead, duplicate });
}
