/**
 * Seed = setup data only (no fake customers). Safe to run more than once:
 * it never deletes anything and only creates records that are missing.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type PB = {
  name: string;
  category: string;
  unit: string;
  price: number;
  cost: number;
  tier?: string;
  qtyBasis: string;
  qtyFactor?: number;
  isAddOn?: boolean;
  description?: string;
};

const PRICE_BOOK: PB[] = [
  // Shingle systems (one per tier)
  { name: "GAF Timberline NS Shingles", category: "shingle", unit: "SQ", price: 150, cost: 112, tier: "Good", qtyBasis: "squares" },
  { name: "GAF Timberline HDZ Shingles", category: "shingle", unit: "SQ", price: 175, cost: 128, tier: "Better", qtyBasis: "squares" },
  { name: "GAF Grand Sequoia Shingles", category: "shingle", unit: "SQ", price: 290, cost: 215, tier: "Best", qtyBasis: "squares" },
  // Underlayment
  { name: "GAF FeltBuster Synthetic Underlayment", category: "underlayment", unit: "SQ", price: 35, cost: 18, tier: "Good", qtyBasis: "squares" },
  { name: "GAF FeltBuster Synthetic Underlayment", category: "underlayment", unit: "SQ", price: 35, cost: 18, tier: "Better", qtyBasis: "squares" },
  { name: "GAF Tiger Paw Premium Underlayment", category: "underlayment", unit: "SQ", price: 48, cost: 26, tier: "Best", qtyBasis: "squares" },
  // Shared components
  { name: "Tear-off & disposal per layer", category: "tearoff", unit: "SQ", price: 85, cost: 55, qtyBasis: "layers" },
  { name: "Installation labor", category: "labor", unit: "SQ", price: 195, cost: 120, qtyBasis: "squares" },
  { name: "Ice & water shield – eaves", category: "underlayment", unit: "LF", price: 6, cost: 3, qtyBasis: "eave" },
  { name: "Ice & water shield – valleys", category: "underlayment", unit: "LF", price: 7, cost: 3.5, qtyBasis: "valley" },
  { name: "Starter strip shingles", category: "shingle", unit: "LF", price: 3.5, cost: 1.6, qtyBasis: "perimeter" },
  { name: "Drip edge (pre-painted)", category: "flashing", unit: "LF", price: 4.5, cost: 2, qtyBasis: "perimeter" },
  { name: "GAF Seal-A-Ridge hip & ridge cap", category: "shingle", unit: "LF", price: 9, cost: 4.5, tier: "Good", qtyBasis: "ridge" },
  { name: "GAF Seal-A-Ridge hip & ridge cap", category: "shingle", unit: "LF", price: 9, cost: 4.5, tier: "Better", qtyBasis: "ridge" },
  { name: "GAF TimberTex premium ridge cap", category: "shingle", unit: "LF", price: 12, cost: 6.5, tier: "Best", qtyBasis: "ridge" },
  { name: "GAF Cobra ridge vent", category: "ventilation", unit: "LF", price: 11, cost: 5, tier: "Better", qtyBasis: "ridge", qtyFactor: 0.6 },
  { name: "GAF Cobra ridge vent", category: "ventilation", unit: "LF", price: 11, cost: 5, tier: "Best", qtyBasis: "ridge", qtyFactor: 0.6 },
  { name: "Pipe boot flashing", category: "flashing", unit: "EA", price: 85, cost: 30, qtyBasis: "pipes" },
  { name: "Plywood decking replacement (per sheet)", category: "decking", unit: "EA", price: 110, cost: 55, qtyBasis: "decking" },
  { name: "Steep roof charge (8/12+)", category: "labor", unit: "SQ", price: 45, cost: 30, qtyBasis: "steep" },
  { name: "Two-story charge", category: "labor", unit: "SQ", price: 25, cost: 15, qtyBasis: "stories" },
  { name: "Dumpster, haul-away & magnetic nail sweep", category: "disposal", unit: "JOB", price: 650, cost: 450, qtyBasis: "flat" },
  { name: "Building permit", category: "permit", unit: "JOB", price: 450, cost: 350, qtyBasis: "flat" },
  // Add-ons
  { name: "Seamless aluminum gutters", category: "addon", unit: "LF", price: 14, cost: 7, qtyBasis: "eave", isAddOn: true, description: "5\" K-style seamless gutters + downspouts" },
  { name: "Gutter guards", category: "addon", unit: "LF", price: 9, cost: 4, qtyBasis: "eave", isAddOn: true, description: "Micro-mesh gutter guards" },
  { name: "Skylight replacement", category: "addon", unit: "EA", price: 1250, cost: 700, qtyBasis: "flat", isAddOn: true, description: "Velux deck-mount skylight with flashing kit" },
  { name: "Chimney re-flash", category: "addon", unit: "JOB", price: 850, cost: 350, qtyBasis: "flat", isAddOn: true, description: "New step + counter flashing" },
  { name: "Moss treatment & prevention", category: "addon", unit: "JOB", price: 350, cost: 120, qtyBasis: "flat", isAddOn: true, description: "Zinc strips at ridge" },
  { name: "Attic insulation top-up", category: "addon", unit: "JOB", price: 1800, cost: 1000, qtyBasis: "flat", isAddOn: true, description: "Blown-in to R-49" },
];

const TEMPLATES = [
  { name: "New lead – first reply", channel: "sms", body: "Hi {{first_name}}, this is {{user_name}} with Stark Roofing & Renovation. Thanks for reaching out about your {{service}}! When's a good time for a free inspection?" },
  { name: "On my way", channel: "sms", body: "Hi {{first_name}}, {{user_name}} from Stark Roofing here. I'm on my way and should arrive in about 20 minutes." },
  { name: "Inspection confirmation", channel: "sms", body: "Hi {{first_name}}, your free roof inspection with Stark Roofing is confirmed. Reply here if anything changes. – {{user_name}}" },
  { name: "Proposal ready", channel: "sms", body: "Hi {{first_name}}, your Stark Roofing proposal is ready. You can review options and sign here: {{link}}" },
  { name: "Follow-up", channel: "sms", body: "Hi {{first_name}}, just checking in on your roofing project. Any questions I can answer? – {{user_name}}, Stark Roofing" },
  { name: "Review request", channel: "sms", body: "Hi {{first_name}}, thank you for choosing Stark Roofing! Would you leave us a quick review? It helps a lot: {{review_url}}" },
  { name: "Proposal email", channel: "email", subject: "Your Stark Roofing proposal", body: "Hi {{first_name}},\n\nThanks for having us out. Your proposal is ready. You can compare the options and sign online here:\n\n{{link}}\n\nCall or text me with any questions.\n\n{{user_name}}\nStark Roofing & Renovation\n(206) 739-8232" },
];

const RULES = [
  { key: "new_lead_untouched", name: "Untouched lead alert", description: "Email the office when a new lead hasn't been contacted within X hours.", config: { hours: 24 } },
  { key: "proposal_reminder", name: "Proposal signature reminder", description: "Email the customer a reminder when a sent proposal is still unsigned after X days.", config: { days: 3 } },
  { key: "daily_digest", name: "Daily digest", description: "Morning email with today's tasks, overdue follow-ups, new leads and proposals waiting.", config: {} },
  { key: "review_request", name: "Google review request", description: "Text/email the customer asking for a review X days after a job is marked Complete.", config: { days: 2 } },
];

const SETTINGS: Record<string, string> = {
  company_name: "Stark Roofing & Renovation",
  company_phone: "(206) 739-8232",
  company_email: process.env.ADMIN_EMAIL || "office@starkroofing.com",
  company_address: "Greater Seattle, WA",
  license_number: "",
  notify_email: process.env.ADMIN_EMAIL || "office@starkroofing.com",
  review_url: "",
  default_tax_rate: "10.1",
  deposit_pct: "30",
  proposal_valid_days: "30",
  proposal_terms:
    "1. A deposit of the stated percentage is due at signing; the balance is due on completion.\n2. Price is valid for 30 days from the proposal date.\n3. Rotten decking beyond the quantity listed will be replaced at the per-sheet price shown, only with homeowner approval.\n4. Stark Roofing & Renovation is licensed, bonded and insured in Washington State.\n5. Manufacturer warranties are subject to GAF registration terms. Workmanship warranty as stated in the selected option.\n6. Customer may cancel within 3 business days of signing for a full refund of any deposit.",
};

async function main() {
  const email = (process.env.ADMIN_EMAIL || "brenda@starkroofing.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "stark2026";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    await prisma.user.create({
      data: { email, name: process.env.ADMIN_NAME || "Brenda", role: "ADMIN", passwordHash: await bcrypt.hash(password, 10) },
    });
    console.log(`Created admin user ${email}`);
  }

  if ((await prisma.priceBookItem.count()) === 0) {
    await prisma.priceBookItem.createMany({
      data: PRICE_BOOK.map((p, i) => ({ ...p, tier: p.tier ?? null, qtyFactor: p.qtyFactor ?? 1, isAddOn: !!p.isAddOn, sortOrder: i })),
    });
    console.log(`Seeded ${PRICE_BOOK.length} price book items`);
  }

  if ((await prisma.messageTemplate.count()) === 0) {
    await prisma.messageTemplate.createMany({ data: TEMPLATES });
    console.log(`Seeded ${TEMPLATES.length} message templates`);
  }

  for (const r of RULES) {
    await prisma.automationRule.upsert({
      where: { key: r.key },
      update: { name: r.name, description: r.description },
      create: { ...r, config: JSON.stringify(r.config) },
    });
  }

  for (const [key, value] of Object.entries(SETTINGS)) {
    await prisma.setting.upsert({ where: { key }, update: {}, create: { key, value } });
  }
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
