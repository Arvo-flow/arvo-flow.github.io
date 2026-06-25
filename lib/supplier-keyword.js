// lib/supplier-keyword.js — EN källa för leverantörs-nyckelordet (varumärkesbryggan).
//
// price-monitor skriver beskrivande leverantörssträngar ("Tele2 Företag mobilabonnemang",
// "Microsoft 365 Business Standard (sv)") medan invoice_analyses lagrar normaliserade namn
// ("telia sverige ab"). Ingen av dem matchar den andra exakt. Nyckelordet är varumärkes-
// ankaret bägge sidor delar — använt med ILIKE '%nyckelord%' förenar det price-monitor,
// supplier_price_history och invoice_analyses utan exakt namnmatchning.
//
// Förr levde denna logik i TVÅ lokala kopior (run-price-alerts.mjs + notify-price-changes.mjs)
// — exakt den sortens dubblett bibeln regel 1 förbjuder. Nu: en källa, tre konsumenter.
// Ordningen är medveten: 'tele2' FÖRE 'telia' (annars skulle "tele2" aldrig nås — fast de delar
// inte delsträng, så det är robust ändå). Flerordsmärken ('sector alarm') matchas som delsträng.
// Inga tvetydiga korta märken (t.ex. 'tre' — delsträng av "centre", "tretton" — medvetet utelämnat).
const BRANDS = [
  'microsoft', 'google', 'adobe', 'tele2', 'telia', 'telenor',
  'slack', 'zoom', 'atlassian', 'fortnox', 'visma', 'bahnhof', 'pipedrive',
  'hubspot', 'zoho', 'dropbox', 'dustin', 'zettle', 'sumup', 'stripe',
  'sector alarm',
];

export function extractSupplierKeyword(supplier) {
  const s = String(supplier || '').toLowerCase();
  for (const b of BRANDS) if (s.includes(b)) return b;
  return s.split(/\s+/)[0] || '';
}
