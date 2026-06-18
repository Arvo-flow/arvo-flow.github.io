// lib/telekom-normalize.js — Vallgravens hjärta för molnväxel/företagstelefoni.
//
// Den kollektiva sanningen ("ni betalar Y/anv, marknaden X") kräver att varje växelfaktura, oavsett
// leverantör, normaliseras till SAMMA jämförbara enhet: kr per användare/månad exkl moms, taggad med en
// KANONISK förmågenivå (T1/T2/T3). Olika leverantörer har olika plan-namn och priser — men mappas in i
// samma axel, så en Telavox-kund och en Telia-kund blir äpplen-mot-äpplen. Detta är den enda modulen som
// gör en faktura till jämförbar data; samma funktion driver BÅDE rätt-storlek OCH datapunkts-emission
// (regel 1, en sanning). Ingen FX. Moms hanteras explicit (B2B-fakturor är exkl moms).

// ── Den kanoniska förmågeaxeln (leverantörs-agnostisk) ───────────────────────────
// Varje leverantörs namngivna plan mappas IN i denna. Axeln är jämförelsenyckeln för hela kundbasen.
export const CANONICAL_TIERS = {
  T1: { label: 'Samtal',        desc: 'Bas: samtal, mobilapp, röstbrevlåda, telefonist-grund' },
  T2: { label: 'Proffs',        desc: '+ köhantering/IVR, närvaro/hänvisning, svarsgrupper, CRM-integration' },
  T3: { label: 'Kontaktcenter', desc: '+ samtalsinspelning, statistik/wallboard, kontaktcenter/callcenter' },
};
export const TIER_ORDER = ['T1', 'T2', 'T3'];

// Förmåge-signaler i fakturarader → härled högsta kanoniska nivå kunden faktiskt betalar för.
// (Nivå inferreras ur FUNKTIONER, inte plan-namn — så det funkar tvärs leverantörer.)
const TIER_SIGNALS = {
  T3: /(kontaktcenter|kontakt-center|callcenter|call-center|samtalsinspelning|inspelning|wallboard|statistik|analytics|agent(?:plats|licens)?)/i,
  T2: /(k[öo]hantering|k[öo]system|svarsgrupp|ivr|talsvar|hänvisning|n[äa]rvaro|integration|crm|teams-koppling|attendant|telefonist)/i,
};

const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

/**
 * Härled högsta kanoniska nivå ur fakturans rader (funktioner). Default T1 (alla växlar ringer).
 * @param {Array} lineItems
 * @returns {{ tier:'T1'|'T2'|'T3', detectedFeatures:string[] }}
 */
export function inferCanonicalTier(lineItems) {
  const text = (lineItems ?? []).map((it) => String(it?.description ?? '')).join(' · ');
  const detectedFeatures = [];
  let tier = 'T1';
  if (TIER_SIGNALS.T2.test(text)) { tier = 'T2'; detectedFeatures.push(...(text.match(TIER_SIGNALS.T2) ? ['proffsfunktion'] : [])); }
  if (TIER_SIGNALS.T3.test(text)) { tier = 'T3'; detectedFeatures.push('kontaktcenter-funktion'); }
  return { tier, detectedFeatures };
}

/**
 * Antal anknytningar/användare ur fakturan (kod räknar, regel 2): seatCount → summa rad-quantity →
 * "(N anv/anknytning/licens)" i radtext. Aldrig employees (anknytningar ≠ anställda).
 */
export function deriveTelekomSeats(invoice) {
  if (Number(invoice?.seatCount) > 0) return Math.round(Number(invoice.seatCount));
  let q = 0;
  for (const it of invoice?.lineItems ?? []) {
    if (it?.type && it.type !== 'recurring_subscription') continue;
    if (Number(it?.quantity) > 0) { q += Math.round(Number(it.quantity)); continue; }
    const m = /\((\d+)\s*(?:anv|användare|anknytning(?:ar)?|licens(?:er)?|st)\b/i.exec(String(it?.description ?? ''));
    if (m) q += Number(m[1]);
  }
  return q > 0 ? q : null;
}

/**
 * Normalisera en växelfaktura → jämförbar enhet. perUserMonthlyExVat = (växel-licensrader exkl moms) / säten.
 * B2B-fakturor är exkl moms; vi de-momsar ALDRIG en faktura-rad (det vore dubbel av-moms). Hårdvara/
 * engångsrader exkluderas (ingår inte i per-användare-licenskostnaden). Returnerar null om säten saknas.
 *
 * @param {object} invoice  { lineItems, seatCount?, billingPeriod?, supplier? }
 * @param {string} supplier normaliserad leverantör (telavox|telia|...)
 */
export function normalizeTelekomInvoice(invoice, supplier = null) {
  const seats = deriveTelekomSeats(invoice);
  if (!(seats > 0)) return null;
  const lineItems = invoice?.lineItems ?? [];
  // Återkommande växel-/licensrader (ej hårdvara, ej engångsavgifter).
  let recurringMonthly = 0;
  for (const it of lineItems) {
    if (it?.type && it.type !== 'recurring_subscription') continue;
    if (/hårdvara|telefon(?:apparat)?|headset|bordstelefon|engångs|startavgift|frakt/i.test(String(it?.description ?? ''))) continue;
    recurringMonthly += Number(it?.amount ?? 0);
  }
  if (!(recurringMonthly > 0)) return null;
  const { tier, detectedFeatures } = inferCanonicalTier(lineItems);
  const perUserMonthlyExVat = round2(recurringMonthly / seats);
  return {
    supplier: supplier ?? invoice?.supplier ?? null,
    canonicalTier: tier,
    canonicalTierLabel: CANONICAL_TIERS[tier].label,
    seats,
    perUserMonthlyExVat,
    detectedFeatures,
  };
}

/**
 * Datapunkts-kontraktet — exakt det fynd-motorn aggregerar (invoice_datapoints + tier-kolumnen).
 * Normaliserad + nivåtaggad från födseln → "marknaden betalar X för T2" blir beräkningsbart utan
 * efterhandsarbete. annualCost behålls för bakåtkompatibel total-benchmark; per_user + tier är Vallgraven.
 */
export function buildTelekomDatapoint({ normalized, industry, employees }) {
  if (!normalized) return null;
  return {
    category: 'molnvaxel',
    supplier: normalized.supplier,
    tier: normalized.canonicalTier,
    per_user_monthly_exvat: normalized.perUserMonthlyExVat,
    annualCost: Math.round(normalized.perUserMonthlyExVat * normalized.seats * 12),
    industry,
    employees,
    seatCount: normalized.seats,
  };
}

// ── k-anonymitet (integritetslås för den kollektiva sanningen) ───────────────────
// En marknadsmedian får ALDRIG exponeras under K_ANON_MIN distinkta kunder — annars läcker vi en enskild
// konkurrents pris. Hårdare än getMarketIntelligence (≥3): Vallgraven kräver ≥5.
export const K_ANON_MIN = 5;
export const marketComparisonAllowed = (distinctCustomers) => Number(distinctCustomers) >= K_ANON_MIN;
