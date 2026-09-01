#!/usr/bin/env node
// scripts/commitkrav.mjs — commit-msg: en beteendeändring i lib/ eller api/ namnger sitt
// syskonfall och sitt sabotage. Logiken bor i lib/commitkrav.js (ren, testbar).
//
// Anropas av git med sökvägen till meddelandefilen som enda argument.

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { granskaCommit } from '../lib/commitkrav.js';

const fil = process.argv[2];
if (!fil) {
  console.error('✗ Commit-kravet: ingen meddelandefil angiven (anropas av git commit-msg)');
  process.exit(1);
}

let meddelande = '';
let diff = '';
try {
  meddelande = readFileSync(fil, 'utf8');
  diff = execSync('git diff --cached -- lib api', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
} catch (err) {
  // Kan vakten inte läsa är svaret OKÄNT, aldrig ett godkännande.
  console.error(`✗ Commit-kravet kunde inte läsa meddelande eller diff: ${err.message}`);
  process.exit(1);
}

// Merge- och revert-commits skrivs av git, inte av oss — de bär ingen mekanik att pröva.
if (/^(Merge|Revert)\b/m.test(meddelande.split('\n')[0] ?? '')) process.exit(0);

const { ok, brister } = granskaCommit(meddelande, diff);
if (ok) process.exit(0);

console.error('\n✗ COMMIT-KRAVET — beteendeändring i lib/ eller api/ utan redovisat arbete:\n');
for (const b of brister) console.error(`  · ${b}`);
console.error(`
  Lägg till i commit-meddelandet:

    Syskonfall: <grannfallet du körde, eller «inga — <skäl>»>
    Sabotage som fällde: <vad du saboterade> → N tester föll

  Talet är hela poängen. Två av mina egna sabotage var no-ops: ersättningen matchade
  ingenting, sviten förblev grön, och det gröna betydde «jag testade inte».
`);
process.exit(1);
