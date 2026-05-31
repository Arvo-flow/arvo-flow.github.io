#!/usr/bin/env node
/**
 * P4.2 — Aggregerar verkliga marknadsdata från Arvo-kundernas fakturor.
 *
 * Läser invoice_analyses → beräknar p25/median/p75 per kategori/bransch/storlek
 * → skriver till invoice_benchmarks-tabellen.
 *
 * Dessa benchmarks ÄR Arvos unika fördel: verkliga priser från faktiska
 * kundanalyser — inte uppskattningar eller officiella listpriser.
 *
 * När sample_size ≥ 10 per segment: branchindex.js bör uppdateras med dessa värden.
 *
 * Kör: node scripts/aggregate-invoice-benchmarks.mjs
 * Kräver: DATABASE_URL
 *
 * Körs också via benchmark-calibration.yml (månadsvis).
 */

import 'dotenv/config';
import { getDb } from '../lib/db.js';
import { upsertInvoiceBenchmark } from '../lib/price-db.js';

const MIN_SAMPLE = 3; // Minst 3 analyser per segment för att producera benchmark

const db = getDb();
if (!db) {
  console.error('DATABASE_URL saknas — kan inte aggregera benchmarks.');
  process.exit(1);
}

console.log('=== Arvo Invoice Benchmark Aggregation ===');
console.log(`Datum: ${new Date().toISOString().slice(0, 10)}\n`);

// ── Kategori × bransch × storlek-aggregering ─────────────────────────────────
// Matchar industry/employees till branchindex-segment (byraer/hantverkare/ehandel/tillverkning).
// company_size: micro(1-9), small(10-49), mid(50-249) — speglar branchindex SIZE_BUCKETS.
const rows = await db`
  WITH sized AS (
    SELECT
      category,
      industry,
      annual_cost,
      CASE
        WHEN employees BETWEEN  1 AND   9 THEN 'micro'
        WHEN employees BETWEEN 10 AND  49 THEN 'small'
        WHEN employees BETWEEN 50 AND 249 THEN 'mid'
        ELSE 'other'
      END AS company_size,
      -- Bransch → branchindex-segment
      CASE
        WHEN industry IN ('konsult', 'it-tech', 'hotell', 'vard', 'ovrigt') THEN 'byraer'
        WHEN industry IN ('bygg', 'transport')                               THEN 'hantverkare'
        WHEN industry = 'ehandel'                                            THEN 'ehandel'
        WHEN industry = 'tillverkning'                                       THEN 'tillverkning'
        ELSE 'byraer'
      END AS industry_segment
    FROM invoice_analyses
    WHERE route = 'auto'
      AND annual_cost IS NOT NULL
      AND annual_cost > 0
      AND employees IS NOT NULL
      AND employees BETWEEN 1 AND 249
      AND category IS NOT NULL
      AND category != 'uncategorized'
  )
  SELECT
    category,
    company_size,
    industry_segment,
    COUNT(*)                                                          AS sample_size,
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY annual_cost)        AS p25,
    PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY annual_cost)        AS median,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY annual_cost)        AS p75,
    ROUND(AVG(annual_cost))                                          AS avg_cost,
    MIN(annual_cost)                                                  AS min_cost,
    MAX(annual_cost)                                                  AS max_cost
  FROM sized
  WHERE company_size != 'other'
  GROUP BY category, company_size, industry_segment
  HAVING COUNT(*) >= ${MIN_SAMPLE}
  ORDER BY category, company_size, industry_segment
`;

if (!rows.length) {
  console.log(`Inga segment med ≥${MIN_SAMPLE} analyser ännu. Fortsätt samla data.\n`);
  process.exit(0);
}

// ── Skriv till invoice_benchmarks ─────────────────────────────────────────────
let written = 0;
const REPORT_THRESHOLD = 10; // Segment med ≥10 → flagga för manuell branchindex-uppdatering

console.log(`${'Kategori'.padEnd(22)} ${'Segm'.padEnd(14)} ${'Strl'.padEnd(6)} ${'n'.padEnd(5)} ${'p25'.padEnd(10)} ${'median'.padEnd(10)} ${'p75'.padEnd(10)} Status`);
console.log('-'.repeat(88));

for (const row of rows) {
  await upsertInvoiceBenchmark({
    category:    row.category,
    companySize: row.company_size,
    industry:    row.industry_segment,
    p25:         Math.round(row.p25),
    median:      Math.round(row.median),
    p75:         Math.round(row.p75),
    sampleSize:  parseInt(row.sample_size),
  });
  written++;

  const n      = parseInt(row.sample_size);
  const status = n >= REPORT_THRESHOLD
    ? '⚡ UPPDATERA branchindex.js'
    : `✅ (${n} st — fortsätt samla)`;

  console.log(
    `${row.category.padEnd(22)} ${row.industry_segment.padEnd(14)} ${row.company_size.padEnd(6)} `+
    `${String(n).padEnd(5)} ${String(Math.round(row.p25)).padEnd(10)} `+
    `${String(Math.round(row.median)).padEnd(10)} ${String(Math.round(row.p75)).padEnd(10)} ${status}`
  );
}

console.log(`\n✅  ${written} segment uppdaterade i invoice_benchmarks.`);

// ── Flagga segment redo för branchindex-uppdatering ──────────────────────────
const readySegments = rows.filter(r => parseInt(r.sample_size) >= REPORT_THRESHOLD);
if (readySegments.length > 0) {
  console.log(`\n⚡ ÅTGÄRD KRÄVS: ${readySegments.length} segment har ≥${REPORT_THRESHOLD} datapunkter.`);
  console.log('   Dessa verkliga marknadsdata bör ersätta "mock"-värdena i branchindex.js:');
  for (const r of readySegments) {
    console.log(`   • ${r.category} / ${r.industry_segment} / ${r.company_size}: p25=${Math.round(r.p25)}, median=${Math.round(r.median)}, p75=${Math.round(r.p75)} (n=${r.sample_size})`);
  }
  console.log('\n   Kör: node scripts/update-branchindex-from-db.mjs (INTE implementerat ännu — manuell uppdatering)');
}

// ── Per-seat-benchmarks (för abonnemangsbaserade kategorier) ──────────────────
const perSeatCats = ['mobil', 'saas-productivity', 'saas-creative', 'saas-crm', 'loneadmin'];

const perSeatRows = await db`
  WITH per_seat AS (
    SELECT
      category,
      industry,
      annual_cost,
      employees,
      CASE
        WHEN employees > 0 THEN ROUND(annual_cost / employees)
        ELSE NULL
      END AS cost_per_employee,
      CASE
        WHEN employees BETWEEN  1 AND   9 THEN 'micro'
        WHEN employees BETWEEN 10 AND  49 THEN 'small'
        WHEN employees BETWEEN 50 AND 249 THEN 'mid'
      END AS company_size,
      CASE
        WHEN industry IN ('konsult', 'it-tech', 'hotell', 'vard', 'ovrigt') THEN 'byraer'
        WHEN industry IN ('bygg', 'transport')                               THEN 'hantverkare'
        WHEN industry = 'ehandel'                                            THEN 'ehandel'
        WHEN industry = 'tillverkning'                                       THEN 'tillverkning'
        ELSE 'byraer'
      END AS industry_segment
    FROM invoice_analyses
    WHERE route = 'auto'
      AND annual_cost IS NOT NULL AND annual_cost > 0
      AND employees IS NOT NULL AND employees BETWEEN 1 AND 249
      AND category = ANY(${perSeatCats})
  )
  SELECT
    category,
    company_size,
    industry_segment,
    COUNT(*)                                                               AS sample_size,
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY cost_per_employee)       AS p25,
    PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY cost_per_employee)       AS median,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY cost_per_employee)       AS p75
  FROM per_seat
  WHERE cost_per_employee IS NOT NULL AND cost_per_employee > 0
    AND company_size IS NOT NULL
  GROUP BY category, company_size, industry_segment
  HAVING COUNT(*) >= ${MIN_SAMPLE}
`;

for (const row of perSeatRows) {
  await upsertInvoiceBenchmark({
    category:    row.category,
    companySize: row.company_size,
    industry:    row.industry_segment,
    metric:      'cost_per_employee',
    p25:         Math.round(row.p25),
    median:      Math.round(row.median),
    p75:         Math.round(row.p75),
    sampleSize:  parseInt(row.sample_size),
  });
}

if (perSeatRows.length > 0) {
  console.log(`\n📊  ${perSeatRows.length} per-seat-benchmark(s) uppdaterade (kostnad per anställd).`);
}
