import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse } from "@/lib/crm";
import { ROLES } from "@/lib/utils";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const me = await requireUser();
  if (isResponse(me)) return me;
  const isSelf = me.id === params.id;
  if (me.role !== "ADMIN" && !isSelf) return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  const b = await req.json();
  const data: any = {};
  if (b.name) data.name = b.name;
  if ("phone" in b) data.phone = b.phone || null;
  if (b.password) {
    if (String(b.password).length < 8) return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    data.passwordHash = await bcrypt.hash(String(b.password), 10);
  }
  if (me.role === "ADMIN" && !isSelf) {
    if (b.role && (ROLES as readonly string[]).includes(b.role)) data.role = b.role;
    if ("active" in b) data.active = !!b.active;
  }
  const u = await prisma.user.update({ where: { id: params.id }, data, select: { id: true, name: true, email: true, role: true, active: true } });
  return NextResponse.json(u);
}
