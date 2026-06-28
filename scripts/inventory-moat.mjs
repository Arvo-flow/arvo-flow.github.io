// scripts/inventory-moat.mjs — Moat-inventering: kan den kollektiva sanningen tändas LIVE idag?
// Ren SQL, inga AI-anrop. Svarar på de enda frågor som betyder något för 0,1%-lagret:
//   1. Kohort: finns (leverantör, kategori) med ≥3 DISTINKTA kunder? (getMarketIntelligence-grinden)
//   2. Prishistorik: har supplier_price_history verkliga höjningar? ≥2 per par (prognos) · färska (rörelse)?
//   3. Publika golv: vilka kategorier täcks av public_prices?
//   4. Tvärbransch: finns samma leverantör i ≥2 industrier? (prisdiskriminerings-meningen)
import { getDb } from '../lib/db.js';
const db = getDb();
if (!db) { console.log('Ingen DATABASE_URL — exit 0'); process.exit(0); }
const P = (...a) => console.log(...a);

P('═══════ 1. KOHORT — distinkta kunder per (leverantör, kategori) ═══════');
const cohort = await db`
  WITH per AS (
    SELECT normalized_supplier, category,
           COALESCE(NULLIF(user_email,''), fingerprint) AS cust
    FROM invoice_analyses
    WHERE route='auto' AND normalized_supplier IS NOT NULL AND category IS NOT NULL
      AND annual_cost > 500 AND annual_cost < 5000000
    GROUP BY normalized_supplier, category, cust
  )
  SELECT normalized_supplier, category, COUNT(*)::int AS distinct_customers
  FROM per GROUP BY normalized_supplier, category
  ORDER BY distinct_customers DESC, normalized_supplier LIMIT 20`;
for (const r of cohort) P(`   ${String(r.distinct_customers).padStart(2)} kund(er)  ${r.normalized_supplier} · ${r.category}`);
const fireable = cohort.filter((r) => r.distinct_customers >= 3);
P(`   → PAR SOM TÄNDER KOHORTEN (≥3 distinkta kunder): ${fireable.length}`);

P('\n═══════ 2. PRISHISTORIK — supplier_price_history ═══════');
let sph;
try {
  sph = await db`SELECT COUNT(*)::int AS n,
    COUNT(*) FILTER (WHERE changed_at > NOW() - INTERVAL '6 months')::int AS recent
    FROM supplier_price_history`;
  P(`   Totalt rader: ${sph[0].n} · senaste 6 mån: ${sph[0].recent}`);
  const hikes = await db`
    SELECT supplier, category, COUNT(*)::int AS changes,
      MAX(changed_at)::date AS latest
    FROM supplier_price_history
    GROUP BY supplier, category ORDER BY changes DESC LIMIT 15`;
  for (const r of hikes) P(`   ${String(r.changes).padStart(2)} ändr  ${r.supplier} · ${r.category} (senast ${r.latest})`);
  const forecastable = hikes.filter((r) => r.changes >= 2);
  P(`   → PAR SOM TÄNDER PROGNOSEN (≥2 höjningar): ${forecastable.length}`);
} catch (e) { P('   (supplier_price_history saknas/fel:', e.message, ')'); }

P('\n═══════ 3. PUBLIKA GOLV — public_prices ═══════');
try {
  const pp = await db`SELECT category, COUNT(*)::int AS n FROM public_prices GROUP BY category ORDER BY n DESC`;
  if (!pp.length) P('   (tom)');
  for (const r of pp) P(`   ${String(r.n).padStart(3)} pkt  ${r.category}`);
} catch (e) { P('   (public_prices saknas/fel:', e.message, ')'); }

P('\n═══════ 4. TVÄRBRANSCH — samma leverantör i ≥2 industrier (prisdiskriminering) ═══════');
const cross = await db`
  WITH per AS (
    SELECT normalized_supplier, category, industry,
           COALESCE(NULLIF(user_email,''), fingerprint) AS cust
    FROM invoice_analyses
    WHERE route='auto' AND normalized_supplier IS NOT NULL AND category IS NOT NULL
      AND industry IS NOT NULL AND annual_cost > 500
    GROUP BY normalized_supplier, category, industry, cust
  )
  SELECT normalized_supplier, category, COUNT(DISTINCT industry)::int AS industries,
         COUNT(DISTINCT cust)::int AS customers
  FROM per GROUP BY normalized_supplier, category
  HAVING COUNT(DISTINCT industry) >= 2
  ORDER BY industries DESC, customers DESC LIMIT 15`;
if (!cross.length) P('   INGEN leverantör finns ännu i ≥2 industrier — prisdiskriminerings-meningen är osynlig.');
for (const r of cross) P(`   ${r.normalized_supplier} · ${r.category}: ${r.industries} industrier, ${r.customers} kunder`);

P('\n═══════ DISTINKTA KUNDER TOTALT ═══════');
const tot = await db`SELECT COUNT(DISTINCT COALESCE(NULLIF(user_email,''), fingerprint))::int AS n
  FROM invoice_analyses WHERE route='auto'`;
P(`   Distinkta kunder (auto-analyser): ${tot[0].n}`);
P('═══════════════════════════════════════════════════════');
