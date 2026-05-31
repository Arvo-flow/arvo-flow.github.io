#!/usr/bin/env node
/**
 * Ring 3: Outcomes-kalibrering — mäter prediktionsnoggrannhet per kategori
 * och identifierar systematiska fel i benchmark.p25.
 *
 * Läser: arvo_outcomes (faktiska utfall från kunder som bytt leverantör)
 * Skriver: kalibreringsrapport till stdout + flaggar kategorier som behöver justeras
 *
 * Körs månadsvis via .github/workflows/benchmark-calibration.yml
 * Kan även köras manuellt: node scripts/calibrate-outcomes.mjs
 *
 * Kräver: DATABASE_URL i miljön
 */

import 'dotenv/config';
import { getDb } from '../lib/db.js';
import { getCalibrationData } from '../lib/outcome-store.js';

const db = getDb();
if (!db) {
  console.error('[calibrate] DATABASE_URL saknas — hoppar över outcomes-kalibrering.');
  process.exit(0); // soft exit — blockerar inte CI
}

const MIN_OUTCOMES = 3; // Minimum antal utfall för att kalibrering ska vara statistiskt meningsfull

// ── Hämta kalibringsdata ─────────────────────────────────────────────────────
const calibrationRows = await getCalibrationData();

if (!calibrationRows.length) {
  console.log('[calibrate] Inga kalibringsdata ännu (behöver ≥3 faktiska utfall per kategori).');
  console.log('[calibrate] Utfall registreras via POST /api/track-outcome när kunder faktiskt byter.');
  process.exit(0);
}

console.log('\n════════════════════════════════════════════════════════');
console.log('   Arvo AVN Ring 3 — Outcomes-kalibrering');
console.log(`   Kördes: ${new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}`);
console.log('════════════════════════════════════════════════════════\n');

// ── Analysera prediktionsfel per kategori ─────────────────────────────────────
const OVERCLAIM_THRESHOLD = 0.15; // >15 % överskattning är systematiskt fel
const UNDERCLAIM_THRESHOLD = 0.15; // >15 % underskattning är också ett problem

const adjustments = [];
const warnings    = [];

for (const row of calibrationRows) {
  const {
    category,
    outcomes,
    avg_ratio,      // actual / predicted — 1.0 = perfekt, <1.0 = vi överskattade
    stddev_ratio,
    avg_actual,
    avg_predicted,
  } = row;

  const ratio = parseFloat(avg_ratio ?? 0);
  const stddev = parseFloat(stddev_ratio ?? 0);
  const n = parseInt(outcomes, 10);

  if (n < MIN_OUTCOMES || !ratio || !isFinite(ratio)) continue;

  const error = ratio - 1.0; // positiv = underprediktion, negativ = överprediktion
  const errorPct = Math.abs(error) * 100;
  const direction = error < 0 ? 'överskattning' : 'underskattning';
  const confidenceNote = stddev > 0.3 ? ' (hög spridning — fler datapunkter behövs)' : '';

  const line = `  ${category.padEnd(22)} n=${String(n).padEnd(4)} ratio=${ratio.toFixed(3)} stddev=${stddev.toFixed(3)} | avg_predicted=${Math.round(avg_predicted).toLocaleString('sv-SE')} kr → avg_actual=${Math.round(avg_actual).toLocaleString('sv-SE')} kr`;
  console.log(line);

  if (errorPct > OVERCLAIM_THRESHOLD * 100) {
    const adjustment = {
      category,
      currentPredicted: Math.round(avg_predicted),
      avgActual:        Math.round(avg_actual),
      ratio:            ratio.toFixed(3),
      errorPct:         errorPct.toFixed(1),
      direction,
      suggestedFactor:  ratio.toFixed(3),
      n,
    };
    adjustments.push(adjustment);

    if (error < -OVERCLAIM_THRESHOLD) {
      warnings.push({ level: 'VARNING', ...adjustment, message: `Vi överprediktar besparingar med ${errorPct.toFixed(1)}% — kunder som bytte sparade MINDRE än vi sa${confidenceNote}` });
    } else {
      warnings.push({ level: 'INFO', ...adjustment, message: `Vi underprediktar besparingar med ${errorPct.toFixed(1)}% — kunder sparade MER än vi sa (bra för pitch, sänker trovärdigheten)${confidenceNote}` });
    }
  }
}

// ── Beräkna total prediktionsnoggrannhet ─────────────────────────────────────
const totalOutcomes = calibrationRows.reduce((s, r) => s + parseInt(r.outcomes, 10), 0);
const weightedRatio = calibrationRows.reduce((s, r) => {
  const n = parseInt(r.outcomes, 10);
  const ratio = parseFloat(r.avg_ratio ?? 1);
  return s + (ratio * n);
}, 0) / Math.max(1, totalOutcomes);

const overallAccuracy = Math.max(0, Math.min(100, (1 - Math.abs(1 - weightedRatio)) * 100));

console.log('\n────────────────────────────────────────────────────────');
console.log(`  Totalt faktiska utfall:    ${totalOutcomes}`);
console.log(`  Viktad prediktionskvot:    ${weightedRatio.toFixed(3)} (1.000 = perfekt)`);
console.log(`  Overall accuracy estimate: ${overallAccuracy.toFixed(1)} %`);
console.log('────────────────────────────────────────────────────────\n');

// ── Varningar för systematiska fel ───────────────────────────────────────────
if (warnings.length === 0) {
  console.log('✅  Inga systematiska prediktionsfel identifierade.\n');
} else {
  console.log('⚠️  Kategorier med systematiska prediktionsfel:\n');
  for (const w of warnings) {
    console.log(`  [${w.level}] ${w.category}`);
    console.log(`    ${w.message}`);
    console.log(`    Åtgärd: Justera benchmark.p25 med faktor ${w.suggestedFactor} i branchindex.js`);
    console.log(`    Exempel: ny_p25 = gammal_p25 × ${w.suggestedFactor}\n`);
  }
}

// ── Täckningsanalys — kategorier utan utfall ──────────────────────────────────
const categoriesWithData = new Set(calibrationRows.map((r) => r.category));

let uncoveredRows;
try {
  uncoveredRows = await db`
    SELECT DISTINCT category
    FROM invoice_analyses
    WHERE route = 'auto'
    GROUP BY category
    HAVING COUNT(*) >= 10
    ORDER BY category
  `;
} catch {
  uncoveredRows = [];
}

const uncoveredCategories = uncoveredRows
  .map((r) => r.category)
  .filter((c) => !categoriesWithData.has(c));

if (uncoveredCategories.length > 0) {
  console.log('📊  Kategorier med ≥10 analyser men inga rapporterade utfall:');
  for (const cat of uncoveredCategories) {
    console.log(`    ${cat} — behöver outcome-tracking för att kalibreras`);
  }
  console.log('');
  console.log('  → Implementera "Bytte ni leverantör?"-uppföljning i UI:t för dessa kategorier.\n');
}

// ── Segmenttäckning — hur stor del av branchindex har real-data ───────────────
let invoiceCountRows;
try {
  invoiceCountRows = await db`
    SELECT category, COUNT(*) as cnt
    FROM invoice_analyses
    WHERE route = 'auto'
    GROUP BY category
    ORDER BY cnt DESC
  `;
} catch {
  invoiceCountRows = [];
}

if (invoiceCountRows.length > 0) {
  console.log('📈  Invoice-datapunkter per kategori (invoice_analyses):');
  for (const r of invoiceCountRows) {
    const hasReal = categoriesWithData.has(r.category) ? ' ✓ kalibrerad' : '';
    console.log(`    ${r.category.padEnd(22)} ${String(r.cnt).padStart(4)} analyser${hasReal}`);
  }
  console.log('');
}

console.log('════════════════════════════════════════════════════════\n');

// Exit 0 alltid — kalibreringen är informationsrik men blockerar aldrig CI
process.exit(0);
