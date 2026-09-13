#!/usr/bin/env node
// scripts/probe-moatsql.mjs — BETYDER SQL:EN SAMMA SAK SOM `arTestidentitet`?
//
// ══ VARFÖR ══════════════════════════════════════════════════════════════════════════════════
// Testidentitetsvillkoret finns i TVÅ renderingar: `arTestidentitet()` i JS och ett SQL-villkor
// i varje moat-sats. LV-04 bevisar att alla fem satserna bär EXAKT samma villkor, tecken för
// tecken. Men två identiska kopior kan vara identiskt fel — och ingen svit i repot kör SQL.
//
// Riskerna är två, och båda är tysta:
//  1. SYNTAX. `lib/benchmark.js:233` fångar felet, loggar och FALLER IGENOM till listpris. En
//     ogiltig moat-sats ser alltså exakt ut som «cellen bar inte» — reservens sjukdom
//     (15 augusti: varje leverantör visade Arvo Score 75 av samma skäl).
//  2. SEMANTIK. Postgres `trim()` är `btrim` och tar BARA mellanslag, medan JS `trim()` tar varje
//     Unicode-blanksteg. Den skillnaden mättes 13 september: sju adressformer av 38 räknades som
//     testidentitet av JS och släpptes in i prisboken av SQL.
//
// Sonden kör därför villkoret mot en RIKTIG databas och jämför utfallet mot JS-predikatet, form
// för form. Den skriver aldrig något och rör ingen tabell — den frågar bara `SELECT`.
//
// EN SOND SOM INTE KOM FRAM ÄR INGET MÄTVÄRDE (SV-01..11): utan `DATABASE_URL` avslutar den 1 och
// säger att den inte mätte. Ett tomt utfall får aldrig läsas som «inga glapp».

import { getDb } from '../lib/db.js';
import { arTestidentitet, TEST_EXAKTA, TEST_DOMAN, TEST_LOKALDELAR } from '../lib/test-surface.js';

// Korpusen ska bära varje form villkoret kan möta — inklusive dem som fällde oss.
const KORPUS = [
  'testyta@arvoflow.se', 'test@inbox.arvoflow.se', 'testyta@inbox.arvoflow.se',
  'nollstall@inbox.arvoflow.se', 'demo@inbox.arvoflow.se', 'test+bunt2@inbox.arvoflow.se',
  'TEST@INBOX.ARVOFLOW.SE', '  test@inbox.arvoflow.se  ',
  '\ttest@inbox.arvoflow.se', 'test@inbox.arvoflow.se\n', '\rtest@inbox.arvoflow.se',
  'kund@riktigt.se', 'anna@byra.se', 'test@annanfirma.se', 'testare@inbox.arvoflow.se',
  'test@inbox.arvoflow.se.evil.com', '', '   ', 'utan-snabel-a', 'a@b@inbox.arvoflow.se',
  null,
];

const db = getDb();
if (!db) {
  console.error('✗ Ingen DATABASE_URL — sonden kom aldrig fram. Detta är INTE ett mätvärde.');
  process.exit(1);
}

let glapp = 0;
let provade = 0;
const rader = [];

for (const adr of KORPUS) {
  // Exakt samma villkor som varje moat-sats bär (LV-04 låser att de är identiska). `true` =
  // raden SLÄPPS IGENOM, alltså «inte en testidentitet».
  let slappsIn;
  try {
    const [r] = await db`
      SELECT (
        ${adr}::text IS NULL OR NOT (
          lower(regexp_replace(${adr}::text, '^[[:space:]]+|[[:space:]]+$', '', 'g')) = ANY(${TEST_EXAKTA})
          OR (split_part(lower(regexp_replace(${adr}::text, '^[[:space:]]+|[[:space:]]+$', '', 'g')), '@', 2) = ${TEST_DOMAN}
              AND split_part(split_part(lower(regexp_replace(${adr}::text, '^[[:space:]]+|[[:space:]]+$', '', 'g')), '@', 1), '+', 1) = ANY(${TEST_LOKALDELAR}))
        )
      ) AS slapps_in
    `;
    slappsIn = r.slapps_in;
  } catch (err) {
    console.error(`\n✗ SQL:EN GICK INTE ATT KÖRA — ${err.message}`);
    console.error('  Det här felet SVÄLJS i produktion (lib/benchmark.js fångar och faller till');
    console.error('  listpris), alltså hade en trasig moat-sats sett ut som «cellen bar inte».');
    process.exit(1);
  }
  provade++;
  const jsSagerTest = arTestidentitet(adr);
  const sqlSagerTest = slappsIn === false;
  const enig = jsSagerTest === sqlSagerTest;
  if (!enig) glapp++;
  rader.push({ adr, jsSagerTest, sqlSagerTest, enig });
}

console.log(`\n═══ MOAT-SQL vs arTestidentitet · ${provade} former ═══\n`);
for (const r of rader) {
  const namn = r.adr === null ? '(null)' : JSON.stringify(r.adr);
  console.log(`  ${r.enig ? '·' : '✗'} ${namn.padEnd(36)} JS: ${String(r.jsSagerTest).padEnd(5)} SQL: ${String(r.sqlSagerTest).padEnd(5)}`);
}
console.log(`\n  Enighet: ${provade - glapp}/${provade} · glapp: ${glapp}\n`);

if (glapp) {
  console.error('✗ SQL:en och JS-predikatet svarar OLIKA. Ett glapp åt «SQL släpper in» betyder att');
  console.error('  en testfaktura kan nå prisboken; åt andra hållet att en riktig kund utesluts.');
  process.exit(1);
}
console.log('✓ SQL:en kör i produktionens databas och svarar identiskt med arTestidentitet på varje form.');
