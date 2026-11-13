import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse } from "@/lib/crm";
import { ROLES } from "@/lib/utils";

export async function POST(req: Request) {
  const user = await requireUser(["ADMIN"]);
  if (isResponse(user)) return user;
  const b = await req.json();
  const email = String(b.email || "").trim().toLowerCase();
  if (!b.name || !email || !b.password) return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
  if (String(b.password).length < 8) return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  if (await prisma.user.findUnique({ where: { email } })) return NextResponse.json({ error: "That email already has an account" }, { status: 400 });
  const role = (ROLES as readonly string[]).includes(b.role) ? b.role : "SALES";
  const u = await prisma.user.create({
    data: { name: b.name, email, phone: b.phone || null, role, passwordHash: await bcrypt.hash(String(b.password), 10) },
    select: { id: true, name: true, email: true, role: true, active: true },
  });
  return NextResponse.json(u);
}
