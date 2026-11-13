// Shared (client + server) roofing pricing engine for Good / Better / Best proposals.

export type Measurements = {
  squares: number; // roof area in squares (100 sq ft)
  pitch: number; // rise per 12, e.g. 6 for 6/12
  layers: number; // existing layers to tear off
  stories: number;
  ridgeLf: number; // ridge + hip
  eaveLf: number;
  rakeLf: number;
  valleyLf: number;
  pipeBoots: number;
  deckingSheets: number; // estimated plywood replacement
  wasteOverride?: number | null; // % (optional)
};

export const EMPTY_MEASUREMENTS: Measurements = {
  squares: 0,
  pitch: 6,
  layers: 1,
  stories: 1,
  ridgeLf: 0,
  eaveLf: 0,
  rakeLf: 0,
  valleyLf: 0,
  pipeBoots: 3,
  deckingSheets: 0,
  wasteOverride: null,
};

export type PriceItem = {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  cost: number;
  tier: string | null;
  qtyBasis: string | null;
  qtyFactor: number;
  isAddOn: boolean;
  active: boolean;
  sortOrder: number;
  description?: string | null;
};

export type Line = { itemId?: string; name: string; qty: number; unit: string; price: number; total: number; cost?: number };
export type TierOption = {
  tier: "Good" | "Better" | "Best";
  name: string;
  tagline: string;
  bullets: string[];
  items: Line[];
  subtotal: number;
  cost: number;
};
export type AddOn = { id: string; name: string; description?: string | null; qty: number; unit: string; price: number; total: number; selected: boolean };

export const TIERS = ["Good", "Better", "Best"] as const;

export const TIER_INFO: Record<string, { tagline: string; bullets: string[] }> = {
  Good: {
    tagline: "Solid protection at the best price",
    bullets: ["GAF architectural shingles", "Synthetic underlayment", "Ice & water at eaves and valleys", "GAF System Plus limited warranty", "5-year Stark workmanship warranty"],
  },
  Better: {
    tagline: "Our most popular system",
    bullets: ["GAF Timberline HDZ shingles (LayerLock)", "Full GAF accessory system", "Ridge vent + new pipe boots", "GAF Silver Pledge warranty eligible", "10-year Stark workmanship warranty"],
  },
  Best: {
    tagline: "Premium designer look, maximum protection",
    bullets: ["GAF Grand Sequoia designer shingles", "Premium underlayment + full ice & water", "Upgraded ridge cap and ventilation", "GAF Golden Pledge warranty eligible", "Lifetime Stark workmanship warranty"],
  },
};

export function wastePct(m: Measurements): number {
  if (m.wasteOverride != null && !isNaN(Number(m.wasteOverride)) && Number(m.wasteOverride) > 0) return Number(m.wasteOverride);
  if (m.pitch >= 10) return 15;
  if (m.pitch >= 7) return 12;
  return 10;
}

export function qtyFor(basis: string | null, factor: number, m: Measurements): number {
  const waste = 1 + wastePct(m) / 100;
  const n = (v: number) => (isFinite(v) ? v : 0);
  switch (basis) {
    case "squares":
      return n(m.squares * waste * factor);
    case "squares_raw":
      return n(m.squares * factor);
    case "layers":
      return n(m.squares * Math.max(1, m.layers) * factor);
    case "ridge":
      return n(m.ridgeLf * factor);
    case "eave":
      return n(m.eaveLf * factor);
    case "perimeter":
      return n((m.eaveLf + m.rakeLf) * factor);
    case "valley":
      return n(m.valleyLf * factor);
    case "pipes":
      return n(m.pipeBoots * factor);
    case "decking":
      return n(m.deckingSheets * factor);
    case "steep":
      return m.pitch >= 8 ? n(m.squares * factor) : 0;
    case "stories":
      return m.stories >= 2 ? n(m.squares * factor) : 0;
    case "flat":
      return factor;
    default:
      return 0;
  }
}

function roundQty(q: number, unit: string) {
  if (unit === "SQ") return Math.ceil(q * 3) / 3; // bundles
  if (unit === "JOB") return q > 0 ? 1 : 0;
  return Math.ceil(q);
}

const r2 = (v: number) => Math.round(v * 100) / 100;

function lineFor(item: PriceItem, m: Measurements): Line | null {
  const raw = qtyFor(item.qtyBasis, item.qtyFactor, m);
  const qty = roundQty(raw, item.unit);
  if (qty <= 0) return null;
  return { itemId: item.id, name: item.name, qty: r2(qty), unit: item.unit, price: item.price, total: r2(qty * item.price), cost: r2(qty * item.cost) };
}

export function buildOptions(items: PriceItem[], m: Measurements): TierOption[] {
  const active = items.filter((i) => i.active && !i.isAddOn).sort((a, b) => a.sortOrder - b.sortOrder);
  return TIERS.map((tier) => {
    const lines = active
      .filter((i) => !i.tier || i.tier === tier)
      .map((i) => lineFor(i, m))
      .filter(Boolean) as Line[];
    const shingle = active.find((i) => i.tier === tier && i.category === "shingle");
    return {
      tier,
      name: shingle?.name || `${tier} System`,
      tagline: TIER_INFO[tier].tagline,
      bullets: TIER_INFO[tier].bullets,
      items: lines,
      subtotal: r2(lines.reduce((s, l) => s + l.total, 0)),
      cost: r2(lines.reduce((s, l) => s + (l.cost || 0), 0)),
    };
  });
}

export function buildAddOns(items: PriceItem[], m: Measurements, selected: string[] = []): AddOn[] {
  return items
    .filter((i) => i.active && i.isAddOn)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((i) => {
      const q = roundQty(qtyFor(i.qtyBasis || "flat", i.qtyFactor, m), i.unit) || 1;
      return { id: i.id, name: i.name, description: i.description, qty: q, unit: i.unit, price: i.price, total: r2(q * i.price), selected: selected.includes(i.id) };
    });
}

export function totals(option: { subtotal: number } | undefined, addOns: AddOn[], taxRate: number) {
  const sub = r2((option?.subtotal || 0) + addOns.filter((a) => a.selected).reduce((s, a) => s + a.total, 0));
  const tax = r2((sub * taxRate) / 100);
  return { subtotal: sub, tax, total: r2(sub + tax) };
}

export const BASIS_LABELS: Record<string, string> = {
  squares: "Squares + waste",
  squares_raw: "Squares (no waste)",
  layers: "Squares × layers",
  ridge: "Ridge/hip LF",
  eave: "Eave LF",
  perimeter: "Eave + rake LF",
  valley: "Valley LF",
  pipes: "Pipe boots",
  decking: "Decking sheets",
  steep: "Squares if pitch ≥ 8/12",
  stories: "Squares if 2+ stories",
  flat: "Flat (1 per job)",
};
