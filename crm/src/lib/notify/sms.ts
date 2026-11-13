/** Send an SMS via Twilio. Without credentials it logs to the console instead. */
export async function sendSms(to: string, body: string): Promise<{ ok: boolean; stub: boolean; error?: string }> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const dest = normalizePhone(to);
  if (!sid || !token || !from) {
    console.log(`[SMS-STUB] to=${dest} body="${body}"`);
    return { ok: true, stub: true };
  }
  try {
    const twilio = (await import("twilio")).default;
    const client = twilio(sid, token);
    await client.messages.create({ to: dest, from, body });
    return { ok: true, stub: false };
  } catch (e: any) {
    console.error("[SMS-ERROR]", e);
    return { ok: false, stub: false, error: e?.message || "send failed" };
  }
}

export function smsConfigured() {
  return !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER);
}

export function normalizePhone(p: string): string {
  const d = (p || "").replace(/\D/g, "");
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `+${d}`;
  return p;
}
