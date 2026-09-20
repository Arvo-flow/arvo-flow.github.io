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
import { vaxelUnderlag } from './vaxelrad.js';

export const CANONICAL_TIERS = {
  T1: { label: 'Samtal',        desc: 'Bas: samtal, mobilapp, röstbrevlåda, telefonist-grund' },
  T2: { label: 'Proffs',        desc: '+ köhantering/IVR, närvaro/hänvisning, svarsgrupper, CRM-integration' },
  T3: { label: 'Kontaktcenter', desc: '+ samtalsinspelning, statistik/wallboard, kontaktcenter/callcenter' },
};
// ⚠️ `TIER_ORDER` ÄR RADERAD (2026-09-20). Den var byte-identisk med
// `Object.keys(CANONICAL_TIERS)`, hade noll konsumenter i hela trädet och användes inte ens
// internt — en andra sanning om samma ordning (regel 1). Behöver någon ordningen: läs
// nycklarna ur CANONICAL_TIERS, den enda källan.

// Förmåge-signaler i fakturarader → härled högsta kanoniska nivå kunden faktiskt betalar för.
// (Nivå inferreras ur FUNKTIONER, inte plan-namn — så det funkar tvärs leverantörer.)
const TIER_SIGNALS = {
  T3: /(kontaktcenter|kontakt-center|callcenter|call-center|samtalsinspelning|inspelning|wallboard|statistik|analytics|agent(?:plats|licens)?)/i,
  T2: /(k[öo]hantering|k[öo]system|svarsgrupp|ivr|talsvar|hänvisning|n[äa]rvaro|integration|crm|teams-koppling|attendant|telefonist)/i,
};

const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

// ── Rad-klassning: VÄXEL vs MOBIL vs HÅRDVARA (pilotdata-läxan) ───────────────────
// En blandad telekomfaktura har växel-rader (Smart Connect, Touchpoint, Telavox Premium) OCH
// mobilrader (Jobbmobil, Företagsabonnemang, surf). Bara växel-rader bär växel-per-user; mobil
// exkluderas (annars falsk överbetalning). En växel-rad som även buntar surf flaggas bundled.
const VAXEL_LINE = /v[äa]xel|smart\s*connect|touchpoint|telavox|svarsgrupp|k[öo]hantering|huvudlicens|administrat[öo]rslicens|anknytning|kontaktcenter|3cx|pbx|ivr|talsvar|softphone|funktionsnummer/i;
const MOBIL_LINE = /jobbmobil|mobilabonnemang|f[öo]retagsabonnemang|mobildata|surf|obegr[äa]nsad\s+data|\d+\s*gb\b/i;
const HW_LINE    = /h[åa]rdvara|telefon(?:apparat)?|headset|bordstelefon|ip-telefon|engångs|startavgift|frakt|hyra\s+ip/i;

export function classifyTelekomLine(description) {
  const d = String(description ?? '');
  if (HW_LINE.test(d)) return 'hardware';
  if (VAXEL_LINE.test(d)) return 'vaxel';   // växel-produkt (även om den buntar surf — bundled flaggas separat)
  if (MOBIL_LINE.test(d)) return 'mobil';   // rent mobilabonnemang
  return 'other';
}

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

// ⚠️ `deriveTelekomSeats` ÄR BORTTAGEN (2026-09-19) — den var växelprisets nämnare, och den
// ärvde `invoice.seatCount`, som på en kombinerad faktura är antalet SIM-KORT. Efter att nämnaren
// flyttat till fakturans egna växelrader (lib/vaxelrad.js) hade funktionen NOLL konsumenter i
// produktion men låg kvar exporterad och testad — alltså såg den levande ut. En funktion som ser
// inkopplad ut men inte är det är samma sjukdom som en vakt utanför sviten: nästa läsare
// återanvänder den i god tro. Att radera den ÄR skyddet mot att SIM-nämnaren smyger tillbaka,
// och RK-12 låser att modulen aldrig läser `seatCount` igen.


/**
 * Normalisera en växelfaktura → jämförbar enhet. perUserMonthlyExVat = (VÄXEL-rader exkl moms) / säten.
 * KRITISKT (pilotdata 2026-06-19): bara VÄXEL-rader räknas — rena mobilabonnemang (Jobbmobil,
 * Företagsabonnemang, surf) EXKLUDERAS, annars klumpas mobilkostnad in i växel-per-user (falsk
 * överbetalning). Hårdvara/engångs exkluderas. Bundlade rader (växel + surf i SAMMA rad, t.ex. Telavox
 * Premium) flaggas `bundled` → jämförelse mot ren växel suppimeras (äpplen-mot-päron). B2B = exkl moms;
 * vi de-momsar ALDRIG en fakturarad. Returnerar null om säten/växelrader saknas.
 */
export function normalizeTelekomInvoice(invoice, supplier = null) {
  const lineItems = invoice?.lineItems ?? [];
  let excludedMobilMonthly = 0, excludedOvrigMonthly = 0, bundled = false;
  const vaxelLines = [];
  for (const it of lineItems) {
    if (it?.type && it.type !== 'recurring_subscription') continue;
    const cls = classifyTelekomLine(it?.description);
    if (cls === 'hardware') continue;
    if (cls === 'vaxel') {
      vaxelLines.push(it);
      if (MOBIL_LINE.test(String(it?.description ?? ''))) bundled = true;   // växel-rad som buntar mobil/surf
    } else if (cls === 'mobil') {
      excludedMobilMonthly += Number(it?.amount ?? 0);                       // ren mobil → exkluderas (transparens)
    } else {
      // ⚠️ 'other' EXKLUDERADES TYST, OCH TRANSPARENSFÄLTET LJÖG (mätt 2026-09-19).
      // På `telenor-molnvaxel-stor` klassas «Telenor Business Smart (45 abonnemang)» som 'other'
      // (MOBIL_LINE kräver «mobilabonnemang»/«företagsabonnemang», inte bara «abonnemang»), så
      // 17 055 kr/mån lades åt sidan medan `excludedMobilMonthly` rapporterade 0. Beslutet var
      // rätt; redovisningen av det var falsk. Ett obokfört beslut är omöjligt att skilja från
      // ett tapp (bokföringsplikten, 14 augusti).
      excludedOvrigMonthly += Number(it?.amount ?? 0);
    }
  }

  // ── NÄMNAREN KOMMER UR VÄXELRADERNA, ALDRIG UR SIM-ANTALET ──────────────────────────────
  // Här stod `deriveTelekomSeats(invoice)`, som ärver `seatCount` — på en kombinerad faktura
  // antalet SIM-kort. Täljaren var växelkostnad, nämnaren en annan domän. Mätt på
  // telenor-molnvaxel-stor: 4 899/45 = 108,87 kr visades för kunden, medan fakturans egna
  // licensrader säger 4 450/50 = 89,00 = exakt Telias verifierade golv.
  // `vaxelUnderlag` är fail-closed (RK-04): en enda oläsbar växelrad tystar priset, eftersom den kan
  // bära ett okänt antal användare och en ofullständig nämnare ger ett för HÖGT pris — åt det
  // håll som ökar vårt eget arvode.
  const underlag = vaxelUnderlag(vaxelLines);
  if (!underlag.ok) {
    // Tystnaden bär sitt skäl. En tyst reserv är ingen reserv (15 augusti).
    console.log(`[vaxelrad] inget per-användare-pris: ${underlag.avvisatSkal}`);
    return null;
  }

  const { tier, detectedFeatures } = inferCanonicalTier(vaxelLines);
  return {
    supplier: supplier ?? invoice?.supplier ?? null,
    canonicalTier: tier,
    canonicalTierLabel: CANONICAL_TIERS[tier].label,
    // `seats` ÄR NUMERA ANTALET AVLÄSTA VÄXELLICENSER, inte SIM-kort. Namnet behålls för att
    // datapunktskontraktet och kundytan redan läser det; innebörden är den som alltid påståtts.
    seats: underlag.licenser,
    perUserMonthlyExVat: underlag.perUserMonthlyExVat,
    // Bolagsgemensamma växeltjänster (reception/IVR/svarsgrupp) ligger UTANFÖR divisionen men
    // redovisas — de är en kostnad kunden betalar, och ett belopp får aldrig bara upphöra.
    perBolagMonthly: underlag.perBolagMonthly,
    perAnvandareMonthly: underlag.perAnvandareMonthly,
    bundled,
    excludedMobilMonthly: Math.round(excludedMobilMonthly) || 0,
    excludedOvrigMonthly: Math.round(excludedOvrigMonthly) || 0,
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
/**
 * ⚠️ DENNA GRIND KAN INTE MATAS UR PRISBOKEN, OCH DET SKA STÅ HÄR (mätt 2026-09-20).
 *
 * Den frågar efter DISTINKTA KUNDER. `invoice_datapoints` har tio kolumner — `category · supplier
 * · annual_cost · industry · size_bucket · source · created_at · per_user_monthly_exvat · tier ·
 * pdf_hash` — och **ingen av dem pekar ut en kund**. Det är ett medvetet val (anonymiserad by
 * design), inte en lucka: grannliggaren `invoice_analyses` bär `user_email` och `fingerprint`.
 * `pdf_hash` identifierar ett DOKUMENT; två fakturor från samma kund har olika hash.
 *
 * Funktionen hade därför noll anropare — och dess test bevisar bara att ARITMETIKEN stämmer
 * (`marketComparisonAllowed(4) === false`), aldrig att signalen någonsin kan röra sig.
 * Villkorsvaktens sjukdom i läroboksform.
 *
 * Den RADERAS ÄNDÅ INTE: k-anonymitet är rätt princip den dag tvärkundsjämförelsen byggs, och
 * `cellenBar` kan inte ersätta den — den räknar RADER (10) och SKILDA BELOPP (10), aldrig kunder.
 * Tio rader kan vara en enda kunds tio fakturor. De två svarar på olika frågor.
 *
 * **Att koppla in den kräver ett designbeslut om identitet i moaten, inte en rad kod.** Tills det
 * beslutet är fattat är den här kommentaren skyddet: en rad som SER ut som ett skydd utan att vara
 * det är sämre än ingen rad, för nästa läsare kontrollerar den inte.
 */
export const marketComparisonAllowed = (distinctCustomers) => Number(distinctCustomers) >= K_ANON_MIN;
