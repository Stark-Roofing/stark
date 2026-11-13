import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse } from "@/lib/crm";

export async function PATCH(req: Request, { params }: { params: { key: string } }) {
  const user = await requireUser(["ADMIN", "OFFICE"]);
  if (isResponse(user)) return user;
  const b = await req.json();
  const data: any = {};
  if ("enabled" in b) data.enabled = !!b.enabled;
  if ("config" in b) data.config = JSON.stringify(b.config || {});
  return NextResponse.json(await prisma.automationRule.update({ where: { key: params.key }, data }));
}
