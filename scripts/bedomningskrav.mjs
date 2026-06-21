#!/usr/bin/env node
/**
 * scripts/bedomningskrav.mjs — bedömningskravet: prosakravets och sifferrevisorns syskon.
 *
 * Bibelns regel 4 (2026-06-21): en grundad bedömning får nå kunden ENDAST om den bär
 * grund + konfidens + asymmetri. Det här beviset körs maskinellt: varje registrerad
 * bedömnings-PRODUCENT (lib/judgment-contract.js → JUDGMENT_PRODUCERS) körs över sitt
 * batteri av indata, och VARJE producerad bedömning måste klara `assertJudgment`.
 * En enda bedömning som saknar en del → commit blockeras.
 *
 * Körs i pre-commit bredvid price-audit, claims-audit och sifferrevisorn.
 */

import { JUDGMENT_PRODUCERS, assertJudgment, isJudgment } from '../lib/judgment-contract.js';

let checked = 0;
let failures = 0;

for (const producer of JUDGMENT_PRODUCERS) {
  let findings;
  try {
    findings = producer.run() ?? [];
  } catch (err) {
    console.error(`✗ Producenten '${producer.name}' kastade: ${err.message}`);
    failures++;
    continue;
  }

  if (findings.length === 0) {
    console.error(`✗ Producenten '${producer.name}' producerade INGEN bedömning — batteriet ska ge minst en.`);
    failures++;
    continue;
  }

  for (const f of findings) {
    if (!isJudgment(f)) continue;        // ren fakta-fynd berörs inte
    checked++;
    const { ok, missing } = assertJudgment(f);
    if (!ok) {
      failures++;
      console.error(`✗ ${producer.name} — bedömning saknar: ${missing.join(', ')}`);
      console.error(`    » ${String(f.title ?? '(utan titel)')}`);
      console.error(`    » text: ${String(f.text ?? '').slice(0, 140)}`);
    }
  }
}

console.log('');
if (failures > 0) {
  console.error(`Bedömningskravet: ${failures} bedömning(ar) saknar grund/konfidens/asymmetri — åtgärda i producenten.`);
  process.exit(1);
}
console.log(`✓ Bedömningskravet — ${checked} bedömning(ar) bär alla tre delarna (grund · konfidens · asymmetri)`);
