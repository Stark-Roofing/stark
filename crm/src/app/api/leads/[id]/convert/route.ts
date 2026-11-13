import { NextRequest, NextResponse } from "next/server";
import { requireUser, isResponse } from "@/lib/crm";
import { convertLead } from "@/lib/leads";

/** Lead → Customer (+ optional Job). Used manually; signing a proposal does this automatically. */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const u = await requireUser(["ADMIN", "OFFICE", "SALES"]);
  if (isResponse(u)) return u;
  const b = await req.json().catch(() => ({}));
  const customer = await convertLead(params.id, u.id, { jobType: b.jobType, contractValue: b.contractValue });
  if (!customer) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  return NextResponse.json(customer);
}

