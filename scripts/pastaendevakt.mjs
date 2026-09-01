#!/usr/bin/env node
// scripts/pastaendevakt.mjs — pre-commit: ett mekanismpåstående måste peka på ett test som finns.
//
// Logiken bor i lib/pastaendevakt.js (ren, testbar). Det här skalet hämtar den stageade diffen,
// slår upp de citerade test-ID:na i tests/, och rapporterar. Se modulhuvudet för varför
// ordlistan är kort och vad vakten är blind för.

import { execSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { granskaDiff, citeradeTestId, arRiktigtTest } from '../lib/pastaendevakt.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

let diff = '';
try {
  diff = execSync('git diff --cached -U0', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
} catch (err) {
  // Ett fel här är ett OKÄNT, aldrig ett godkännande. Att svara «inga brott» på en misslyckad
  // diff hade varit exakt felfamiljen vakten finns för.
  console.error(`✗ Påståendevakten kunde inte läsa diffen: ${err.message}`);
  process.exit(1);
}

const testkallor = readdirSync(join(ROT, 'tests'))
  .filter((f) => f.endsWith('.mjs'))
  .map((f) => readFileSync(join(ROT, 'tests', f), 'utf8'))
  .join('\n');

const brott = granskaDiff(diff);
const uppdiktade = citeradeTestId(diff).filter((id) => !arRiktigtTest(id, testkallor));

if (brott.length === 0 && uppdiktade.length === 0) {
  console.log('✓ Påståendevakten — varje nytt mekanismpåstående pekar på ett test som finns');
  process.exit(0);
}

if (brott.length) {
  console.error('\n✗ PÅSTÅENDEVAKTEN — mekanismpåstående utan utpekat bevis:\n');
  for (const b of brott) {
    console.error(`  ${b.fil}:${b.nr}  («${b.skal}»)`);
    console.error(`     ${b.rad}`);
  }
  console.error('\n  Ett påstående om hur koden BETER SIG ska bära sitt test-ID på raden (t.ex. SL-04).');
  console.error('  Diskuterar du ett påstående i stället för att göra det: // pastaende-ok: <skäl>\n');
}
if (uppdiktade.length) {
  console.error(`\n✗ PÅSTÅENDEVAKTEN — citerat test-ID finns inte i tests/: ${uppdiktade.join(', ')}`);
  console.error('  Ett uppdiktat ID tystar vakten utan att bevisa något — då vaktar den stavning.\n');
}
process.exit(1);
