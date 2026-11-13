import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, isResponse, logActivity } from "@/lib/crm";
import { storeFile } from "@/lib/storage";

export async function POST(req: Request) {
  const user = await requireUser();
  if (isResponse(user)) return user;
  const form = await req.formData();
  const leadId = (form.get("leadId") as string) || null;
  const customerId = (form.get("customerId") as string) || null;
  const jobId = (form.get("jobId") as string) || null;
  const tag = (form.get("tag") as string) || null;
  const files = form.getAll("files").filter((f): f is File => typeof f !== "string");
  if (!files.length) return NextResponse.json({ error: "No files" }, { status: 400 });
  if (files.some((f) => f.size > 25 * 1024 * 1024)) return NextResponse.json({ error: "Max 25 MB per file" }, { status: 400 });

  const created = [];
  for (const f of files) {
    const url = await storeFile(f.name, Buffer.from(await f.arrayBuffer()), f.type || undefined);
    const kind = f.type.startsWith("image/") ? "photo" : "document";
    created.push(
      await prisma.attachment.create({
        data: { url, filename: f.name, mimeType: f.type || null, size: f.size, kind, tag, leadId, customerId, jobId, uploadedById: user.id },
      })
    );
  }
  const photos = created.filter((c) => c.kind === "photo").length;
  const docs = created.length - photos;
  await logActivity({
    type: "system",
    message: `Uploaded ${[photos && `${photos} photo${photos > 1 ? "s" : ""}`, docs && `${docs} document${docs > 1 ? "s" : ""}`].filter(Boolean).join(" and ")}${tag ? ` (${tag})` : ""}`,
    leadId,
    customerId,
    jobId,
    userId: user.id,
  });
  return NextResponse.json(created);
}
