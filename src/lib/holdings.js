// src/lib/holdings.js — gruppering av analyser till leverantörskort i Arvo-kontoret.
//
// Nyckeln = (normaliserad leverantör || rå leverantör) + KATEGORI, så att:
//   • samma leverantör i samma kategori slås ihop (senaste analysen vinner) — inga dubbletter,
//   • samma leverantör i OLIKA kategorier hålls isär (t.ex. Telia mobil vs Telia bredband).
//
// Visningsnamnet använder SAMMA precedens som nyckeln (normaliserad först). Det var själva
// dubblett-buggen: nyckeln prioriterade normalized_supplier medan namnet visade supplier —
// omvänd ordning → två kort kunde visa identiskt namn utan att slås ihop. Nu är de låsta ihop.

export function supplierName(a) {
  return a.normalized_supplier || a.supplier || 'Okänd leverantör';
}

// Per-leverantörs score — MÅSTE följa samma tal som besparings-pillen (regel 1: EN sanning per fråga).
// Tidigare läste den suggested_annual_cost medan pillen läser net_saving → de kunde säga emot varandra
// (en låg score 49 bredvid en liten besparing +6 230 / ~13 %). Nu härleds marknadsgapet ur gross_saving
// (samma källa som net_saving som pillen visar) → score och pill kan aldrig motsäga varandra.
export function supplierDiagScore(a) {
  if (a.route === 'monitoring') return 72;
  const gross = a.gross_saving ?? (a.net_saving != null ? a.net_saving / 0.8 : 0);
  if (!a.should_switch || !a.annual_cost || !(gross > 0)) {
    return a.annual_cost > 0 ? 82 : 50;
  }
  const ovPct = Math.round((gross / a.annual_cost) * 100);   // marknadsgapet som besparingen representerar
  const raw   = Math.max(5, Math.round(100 - ovPct * 1.5));
  return (a.net_saving ?? 0) > 0 ? Math.min(raw, 79) : raw;
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
