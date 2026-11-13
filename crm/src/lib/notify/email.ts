export type EmailAttachment = { filename: string; content: Buffer | string };

export type EmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
};

/** Send email via Resend. Without RESEND_API_KEY it logs to the console instead. */
export async function sendEmail(input: EmailInput): Promise<{ ok: boolean; stub: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Stark Roofing <onboarding@resend.dev>";
  if (!key) {
    console.log(
      `[EMAIL-STUB] to=${[input.to].flat().join(",")} subject="${input.subject}" attachments=${
        input.attachments?.map((a) => a.filename).join(",") || "none"
      }`
    );
    return { ok: true, stub: true };
  }
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const res = await resend.emails.send({
      from,
      to: [input.to].flat(),
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo || process.env.EMAIL_REPLY_TO || undefined,
      attachments: input.attachments,
    } as any);
    if ((res as any).error) return { ok: false, stub: false, error: String((res as any).error.message) };
    return { ok: true, stub: false };
  } catch (e: any) {
    console.error("[EMAIL-ERROR]", e);
    return { ok: false, stub: false, error: e?.message || "send failed" };
  }
}

export const BTN_STYLE = "display:inline-block;background:#B8960C;color:#0a0b0d;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:bold";

export function emailLayout(title: string, bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#111">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:8px;overflow:hidden">
  <tr><td style="background:#0a0b0d;padding:20px 24px"><div style="color:#B8960C;font-size:26px;font-weight:bold;letter-spacing:2px">STARK</div>
  <div style="color:#9ca3af;font-size:11px;letter-spacing:3px">ROOFING &amp; RENOVATION</div></td></tr>
  <tr><td style="padding:24px"><h2 style="margin:0 0 12px;font-size:20px">${title}</h2>${bodyHtml.replace(/class="btn"/g, `style="${BTN_STYLE}"`)}</td></tr>
  <tr><td style="padding:16px 24px;background:#fafafa;color:#6b7280;font-size:12px">Stark Roofing &amp; Renovation · (206) 739-8232 · Greater Seattle</td></tr>
  </table></td></tr></table></body></html>`;
}
