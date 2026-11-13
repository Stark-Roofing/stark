import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse } from "@/lib/crm";
import { removeFile } from "@/lib/storage";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const user = await requireUser();
  if (isResponse(user)) return user;
  const b = await req.json();
  const data: any = {};
  if ("caption" in b) data.caption = b.caption || null;
  if ("tag" in b) data.tag = b.tag || null;
  return NextResponse.json(await prisma.attachment.update({ where: { id: params.id }, data }));
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const user = await requireUser(["ADMIN", "OFFICE", "SALES"]);
  if (isResponse(user)) return user;
  const a = await prisma.attachment.delete({ where: { id: params.id } });
  await removeFile(a.url);
  return NextResponse.json({ ok: true });
}
