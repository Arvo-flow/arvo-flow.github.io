#!/usr/bin/env node
// P3.3 — Inlärningsloop: kalibrering av benchmarks från faktiska utfall
// Körs månatligen via GitHub Actions (benchmark-calibration.yml).
// Jämför predikterat nettosparande mot faktiskt utfall per kategori.
// Flaggar systematiska över- eller underskattningar > 20%.

import 'dotenv/config';
import { getCalibrationData } from '../lib/outcome-store.js';

const DRIFT_THRESHOLD = 0.20; // >20% avvikelse → flagga

async function main() {
  console.log('=== Arvo Benchmark Calibration Report ===');
  console.log(`Datum: ${new Date().toISOString().slice(0, 10)}\n`);

  const data = await getCalibrationData();

  if (!data || data.length === 0) {
    console.log('Inga utfall med tillräckligt underlag ännu (kräver ≥3 utfall per kategori).');
    console.log('Fortsätt samla in kundutfall via /api/track-outcome.\n');
    process.exit(0);
  }

  let hasFlags = false;

  console.log('Kategori                  | Utfall | Ratio (faktisk/predikt) | Status');
  console.log('--------------------------|--------|-------------------------|-------');

  for (const row of data) {
    const ratio   = parseFloat(row.avg_ratio ?? 0);
    const outcomes = parseInt(row.outcomes ?? 0);
    const drift   = Math.abs(ratio - 1.0);
    const status  = drift > DRIFT_THRESHOLD
      ? `⚠️  KALIBRERING KRÄVS (ratio ${ratio.toFixed(2)})`
      : `✅ OK (ratio ${ratio.toFixed(2)})`;

    if (drift > DRIFT_THRESHOLD) hasFlags = true;

    console.log(
      `${row.category.padEnd(26)}| ${String(outcomes).padEnd(7)}| ${String(ratio.toFixed(3)).padEnd(24)}| ${status}`
    );
  }

  console.log('\n');

  if (hasFlags) {
    console.log('ACTION REQUIRED: Minst en kategori har systematisk prediktionsavvikelse.');
    console.log('Granska branchindex.js och justera p25/p75-intervall för flaggade kategorier.');
    console.log('Kontakta: team@arvoflow.se\n');
    process.exit(1); // GitHub Actions markerar jobbet som failed → manuell åtgärd
  } else {
    console.log('Alla kategorier inom acceptabel kalibreringsnoggrannhet (±20%).');
    console.log('Inga åtgärder krävs.\n');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Kalibreringsscript kraschade:', err.message);
  process.exit(1);
});
