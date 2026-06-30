// src/lib/holdings.js — gruppering av analyser till leverantörskort i Arvo-kontoret.
//
// Nyckeln = (normaliserad leverantör || rå leverantör) + KATEGORI, så att:
//   • samma leverantör i samma kategori slås ihop (senaste analysen vinner) — inga dubbletter,
//   • samma leverantör i OLIKA kategorier hålls isär (t.ex. Telia mobil vs Telia bredband).
//
// Visningsnamnet använder SAMMA precedens som nyckeln (normaliserad först). Det var själva
// dubblett-buggen: nyckeln prioriterade normalized_supplier medan namnet visade supplier —
// omvänd ordning → två kort kunde visa identiskt namn utan att slås ihop. Nu är de låsta ihop.

// Kanoniska varumärken — "Telia Företag" och "Telia Sverige AB" är samma Telia. Slår ihop kända
// varianter; nyckeln bär kategori, så Telia mobil ≠ Telia bredband (ingen över-sammanslagning).
// Konservativ lista över stora varumärken — okända leverantörer rörs ALDRIG (säkrare att inte slå
// ihop än att felaktigt slå ihop två olika bolag).
const SUPPLIER_ALIASES = [
  [/\btelia\b/i,            'Telia'],
  [/\btele\s*2\b/i,         'Tele2'],
  [/\btelenor\b/i,          'Telenor'],
  [/\bmicrosoft\b/i,        'Microsoft'],
  [/\bgoogle\b/i,           'Google'],
  [/\badobe\b/i,            'Adobe'],
  [/\bdustin\b/i,           'Dustin'],
];

export function canonicalSupplier(name) {
  const s = String(name || '').trim();
  if (!s) return 'Okänd leverantör';
  for (const [re, brand] of SUPPLIER_ALIASES) if (re.test(s)) return brand;
  return s;
}

export function supplierName(a) {
  return canonicalSupplier(a.normalized_supplier || a.supplier);
}

// Per-leverantörs score — MÅSTE följa samma tal som besparings-pillen (regel 1: EN sanning per fråga).
// Tidigare läste den suggested_annual_cost medan pillen läser net_saving → de kunde säga emot varandra
// (en låg score 49 bredvid en liten besparing +6 230 / ~13 %). Nu härleds marknadsgapet ur gross_saving
// (samma källa som net_saving som pillen visar) → score och pill kan aldrig motsäga varandra.
export function supplierDiagScore(a) {
  if (a.route === 'monitoring') return 72;
  // Bug #2-fix (2026-06-28): deterministiskt hälsotal ur fakturans prisläge mot verifierat golv,
  // räknat i recommend() (regel 2). Ersätter det hårdkodade 82 som gjorde att VARJE rätt-prissatt
  // faktura fick exakt samma tal. Finns det → använd det (förtjänat, differentierat, källa = prisläget).
  if (a.health_score != null && Number.isFinite(Number(a.health_score))) {
    const hs = Number(a.health_score);
    // Ett rekommenderat byte ska aldrig visa ett högt "allt är bra"-tal — taklägg vid 79.
    return (a.should_switch && (a.net_saving ?? 0) > 0) ? Math.min(hs, 79) : hs;
  }
  const gross = a.gross_saving ?? (a.net_saving != null ? a.net_saving / 0.8 : 0);
  if (!a.should_switch || !a.annual_cost || !(gross > 0)) {
    // Fallback (ingen verifierad benchmark, t.ex. äldre rader utan health_score): neutralt, inte 82.
    return a.annual_cost > 0 ? 75 : 50;
  }
  const ovPct = Math.round((gross / a.annual_cost) * 100);   // marknadsgapet som besparingen representerar
  const raw   = Math.max(5, Math.round(100 - ovPct * 1.5));
  return (a.net_saving ?? 0) > 0 ? Math.min(raw, 79) : raw;
}

// Domens "agerande krävs"-avgörande. GRUNDARLÄRDOM 2026-06-30 (live skärmdump): en kostsam
// forensik-upptäckt (t.ex. avbetald hårdvara, 16 800 kr/år) UTAN ett tillgängligt leverantörsbyte
// fick domen att ändå säga "Allt är under kontroll" — rakt motsägande fyndkortet direkt under.
// En kostnad är lika mycket "agerande krävs" som ett byte. Ren funktion = regressionstestbar.
export function computeActing({ switchablesCount, roomFinding }) {
  const hasSwitchAction = (switchablesCount ?? 0) > 0;
  const hasFindingAction = !!(roomFinding && (roomFinding.annualImpact ?? 0) > 0);
  return { hasSwitchAction, hasFindingAction, acting: hasSwitchAction || hasFindingAction };
}

export function groupBySupplier(analyses) {
  const groups = new Map();
  for (const a of analyses ?? []) {
    const key = `${supplierName(a).trim().toLowerCase()}|${String(a.category || '').toLowerCase()}`;
    const g = groups.get(key);
    if (!g) groups.set(key, { key, latest: a, count: 1 });
    else {
      g.count += 1;
      if (new Date(a.created_at) > new Date(g.latest.created_at)) g.latest = a;
    }
  }
  return [...groups.values()].sort((x, y) => (y.latest.net_saving ?? 0) - (x.latest.net_saving ?? 0));
}
