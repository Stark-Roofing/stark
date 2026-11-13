import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse } from "@/lib/crm";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const user = await requireUser(["ADMIN", "OFFICE", "SALES"]);
  if (isResponse(user)) return user;
  const b = await req.json();
  return NextResponse.json(
    await prisma.messageTemplate.update({ where: { id: params.id }, data: { name: b.name, channel: b.channel === "email" ? "email" : "sms", subject: b.subject || null, body: b.body } })
  );
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const user = await requireUser(["ADMIN", "OFFICE"]);
  if (isResponse(user)) return user;
  await prisma.messageTemplate.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
