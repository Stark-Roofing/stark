import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse } from "@/lib/crm";

export async function POST(req: Request) {
  const user = await requireUser(["ADMIN", "OFFICE", "SALES"]);
  if (isResponse(user)) return user;
  const b = await req.json();
  if (!b.name || !b.body) return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
  return NextResponse.json(await prisma.messageTemplate.create({ data: { name: b.name, channel: b.channel === "email" ? "email" : "sms", subject: b.subject || null, body: b.body } }));
}
