// scripts/count-register.mjs — LÄS-BAR ögonblicksbild av registret (kör i GitHub Actions där
// DB-åtkomst finns). Inga skrivningar, inga sidoeffekter. Svarar på "hur mycket data har vi?".

import { getDb } from '../lib/db.js';

const db = getDb();
if (!db) {
  console.log('Ingen DATABASE_URL — kan inte räkna. (exit 0)');
  process.exit(0);
}

const q = (label, sql) => sql.then((r) => ({ label, r })).catch((e) => ({ label, err: e.message }));

const [analyses, datapoints, suppliers, span, byCat] = await Promise.all([
  q('analyser', db`
    SELECT
      COUNT(*)::int                                        AS total,
      COUNT(*) FILTER (WHERE route = 'auto')::int          AS auto,
      COUNT(*) FILTER (WHERE route = 'review_queue')::int  AS review,
      COUNT(*) FILTER (WHERE should_switch = true)::int    AS switch_rec,
      COUNT(DISTINCT fingerprint)::int                     AS unika_fingerprints,
      COUNT(DISTINCT NULLIF(user_email,''))::int           AS unika_epost
    FROM invoice_analyses`),
  q('datapunkter', db`SELECT COUNT(*)::int AS n FROM invoice_datapoints`),
  q('leverantörer', db`SELECT COUNT(DISTINCT normalized_supplier)::int AS n FROM invoice_analyses WHERE route='auto'`),
  q('tidsspann', db`SELECT MIN(created_at) AS first, MAX(created_at) AS last FROM invoice_analyses`),
  q('per_kategori', db`
    SELECT category, COUNT(*)::int AS n
    FROM invoice_analyses WHERE route='auto' AND category IS NOT NULL
    GROUP BY category ORDER BY n DESC LIMIT 12`),
]);

console.log('\n═══════════ ARVO-REGISTRET — ögonblicksbild ═══════════');
for (const x of [analyses, datapoints, suppliers, span]) {
  if (x.err) console.log(`${x.label}: FEL — ${x.err}`);
  else console.log(`${x.label}:`, JSON.stringify(x.r[0] ?? x.r));
}
if (!byCat.err) {
  console.log('per kategori (auto):');
  for (const row of byCat.r) console.log(`   ${row.category}: ${row.n}`);
}
console.log('═══════════════════════════════════════════════════════\n');
