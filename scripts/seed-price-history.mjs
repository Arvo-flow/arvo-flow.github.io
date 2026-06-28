// scripts/seed-price-history.mjs — Backfill av VERIFIERAD publik prishistorik → tänder Maktkalenderns
// prognos (lib/price-forecast.js) på äkta historik, helt utan kundnätverk.
//
// INTEGRITETSKONTRAKT (regel 3 + 4): varje rad ÄR ett källbelagt publikt faktum — datum, gammalt pris,
// nytt pris, källa. ALDRIG ett estimat, aldrig en gissning. Ett representativt pris PER HÄNDELSE
// (aldrig flera produkter för samma händelse — det skulle blåsa upp sample-storleken och därmed
// konfidensen falskt). source_type='official_web', source_url pekar på leverantörens egen annonsering.
//
// Idempotent: hoppar över en rad som redan finns (supplier+category+changed_at+new pris).
import { getDb } from '../lib/db.js';
import { recordVerifiedChange, getSupplierCategoryChangesByKeyword } from '../lib/price-db.js';
import { priceHikeForecast } from '../lib/price-forecast.js';

// ── De källbelagda höjningarna ───────────────────────────────────────────────
// Microsoft 365 Business Standard (kommersiell prishöjning, ett representativt plan per händelse):
//  • 2022-03-01: $12,50→$14,00/mån (+12 %). Annons 2021-08-19 (Microsofts egen blogg).
//  • 2026-07-01: $150→$168/år   (+12 %). Annons 2025-12-04 (Microsofts egen blogg). Har trätt i kraft
//    när rummet öppnar för kunder (Q4 2026) → genuint förflutet vid läsning (grundarbeslut 2026-06-28).
const VERIFIED_HIKES = [
  {
    supplier: 'Microsoft', product: 'Microsoft 365 Business Standard', tier: 'business-standard',
    category: 'saas-productivity', oldMonthly: 12.50, newMonthly: 14.00, currency: 'USD',
    changedAt: '2022-03-01', changedBy: 'backfill-verified',
    sourceUrl: 'https://www.microsoft.com/en-us/microsoft-365/blog/2021/08/19/new-pricing-for-microsoft-365/',
  },
  {
    supplier: 'Microsoft', product: 'Microsoft 365 Business Standard', tier: 'business-standard',
    category: 'saas-productivity', oldAnnual: 150.00, newAnnual: 168.00, currency: 'USD',
    changedAt: '2026-07-01', changedBy: 'backfill-verified',
    sourceUrl: 'https://www.microsoft.com/en-us/microsoft-365/blog/2025/12/04/advancing-microsoft-365-new-capabilities-and-pricing-update/',
  },
];

const db = getDb();
if (!db) { console.log('Ingen DATABASE_URL — exit 0'); process.exit(0); }

let inserted = 0, skipped = 0;
for (const h of VERIFIED_HIKES) {
  // Idempotens: finns redan en rad för samma leverantör+kategori+datum? (händelserna har distinkta datum)
  const exists = await db`
    SELECT 1 FROM supplier_price_history
    WHERE supplier = ${h.supplier} AND category = ${h.category}
      AND changed_at::date = ${h.changedAt}::date
    LIMIT 1`.catch(() => []);
  if (exists.length) { skipped++; console.log(`↩︎  finns redan: ${h.supplier} ${h.product} ${h.changedAt}`); continue; }
  const r = await recordVerifiedChange(h);
  if (r.inserted) { inserted++; console.log(`✓ seedade: ${h.supplier} ${h.product} ${h.changedAt} (+ källa)`); }
  else console.log(`✗ MISSLYCKADES: ${h.supplier} ${h.changedAt} — ${r.error ?? 'okänt'}`);
}
console.log(`\n→ ${inserted} insatta · ${skipped} redan fanns`);

// ── Rå dump: exakt vad som FAKTISKT ligger i tabellen (diagnos före slutsats) ──
console.log('\n═══════ RÅ DUMP — supplier_price_history WHERE supplier ILIKE %microsoft% ═══════');
const dump = await db`
  SELECT supplier, category, changed_at, old_price_monthly, new_price_monthly,
         old_price_annual, new_price_annual, source_type
  FROM supplier_price_history WHERE supplier ILIKE '%microsoft%' ORDER BY changed_at`.catch((e) => { console.log('fel:', e.message); return []; });
console.log(`rader: ${dump.length}`);
for (const r of dump) console.log(`   ${r.changed_at} | ${r.category} | m:${r.old_price_monthly}→${r.new_price_monthly} a:${r.old_price_annual}→${r.new_price_annual}`);
const now = await db`SELECT NOW() AS now, (NOW() - 48 * INTERVAL '1 month')::date AS floor48`;
console.log(`   NOW()=${now[0].now} · 48-mån-golv=${now[0].floor48}`);

// ── Verifiera LIVE att prognosen faktiskt tänds (verifieringsplikten: bevisa efter, inte bara före) ──
console.log('\n═══════ VERIFIERAR: tänds prognosen? ═══════');
const rows = await getSupplierCategoryChangesByKeyword({ supplierKeyword: 'microsoft', category: 'saas-productivity' });
console.log(`Hittade ${rows.length} historik-rader för microsoft/saas-productivity`);
const f = priceHikeForecast(rows, { supplier: 'Microsoft' });
if (f) {
  console.log('✅ PROGNOSEN TÄNDS:');
  console.log('   titel:', f.title);
  console.log('   magnitud:', f.metricText, '· konfidens:', f.confidence);
  console.log('   text:', f.text);
} else {
  console.log('⚠️  prognosen tänds INTE — färre än 2 giltiga höjningar i historiken.');
}
