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
