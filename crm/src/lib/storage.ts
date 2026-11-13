import { put, del } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";

/** Store a file in Vercel Blob when configured, otherwise in public/uploads (local dev). */
export async function storeFile(name: string, data: Buffer | Blob | ArrayBuffer, contentType?: string): Promise<string> {
  const safe = name.replace(/[^\w.\-]+/g, "_").slice(-80) || "file";
  const key = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const body = data instanceof ArrayBuffer ? Buffer.from(data) : data;
    const blob = await put(`stark/${key}`, body as any, { access: "public", contentType });
    return blob.url;
  }
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  const buf = data instanceof Buffer ? data : Buffer.from(data instanceof ArrayBuffer ? data : await (data as Blob).arrayBuffer());
  await fs.writeFile(path.join(dir, key), buf);
  return `/uploads/${key}`;
}

export async function removeFile(url: string) {
  try {
    if (url.startsWith("/uploads/")) await fs.unlink(path.join(process.cwd(), "public", url));
    else if (process.env.BLOB_READ_WRITE_TOKEN) await del(url);
  } catch {
    /* ignore */
  }
}
