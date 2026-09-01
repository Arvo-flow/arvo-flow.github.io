// scripts/probe-liggaren.mjs — mäter switchliggaren och arvodeskön mot PRODUKTIONS-Postgres.
//
// Varför denna väg och inte endpointen: `/api/cron/arvodeskorning` kräver CRON_SECRET, som inte
// finns som GitHub-hemlighet. `DATABASE_URL` gör det. Sonden mäter alltså DATAN i stället för
// HTTP-routen — vilket är den bättre mätningen ändå, eftersom routen redan är bevisad separat
// (401 utan auth) och den intressanta frågan är vad liggaren INNEHÅLLER.
//
// Den skiljer tre svar som annars alla ser ut som «0 kr att fakturera»:
//   · ingen databas       → sonden kom inte fram. Inget mätvärde.
//   · tabellen saknas     → migreringen har inte körts. Inget mätvärde.
//   · tabellen är TOM     → ett riktigt mätvärde, och det väntade så länge Switch-rälsen är stub.
//
// Kör i GitHub Actions (DATABASE_URL finns där). Skriver aldrig — bara läser.

import { getDb } from '../lib/db.js';
import { arvodeskoen } from '../lib/arvodeskorning.js';

const db = getDb();
if (!db) {
  console.error('✗ ingen DATABASE_URL — sonden kom inte fram (detta är inte ett mätvärde)');
  process.exit(1);
}

// Finns tabellen? Frågan ställs FÖRE läsningen, så att «tabellen saknas» aldrig kan rapporteras
// som «liggaren är tom». Sonden skapar den inte: en mätning som ändrar det den mäter är ingen
// mätning, och en självläkning här hade dolt att migreringen aldrig kördes.
const finns = await db`SELECT to_regclass('public.switch_records') AS t`;
if (!finns?.[0]?.t) {
  console.error('✗ tabellen switch_records FINNS INTE i produktion — migrate-v2 har inte körts');
  console.error('  (detta är inte samma sak som en tom liggare, och får aldrig rapporteras som det)');
  process.exit(1);
}
console.log('✓ switch_records finns');

const rader = await db`SELECT record, state, created_at FROM switch_records ORDER BY created_at ASC`;
const poster = (rader ?? []).map((r) => r.record);
console.log(`\n=== SWITCHLIGGAREN (produktion) ===`);
console.log(`poster: ${poster.length}`);

const perTillstand = {};
for (const r of rader ?? []) perTillstand[r.state] = (perTillstand[r.state] ?? 0) + 1;
if (poster.length) console.log(`tillstånd: ${JSON.stringify(perTillstand)}`);

const ko = arvodeskoen(poster);
console.log(`\n=== ARVODESKÖN ===`);
console.log(JSON.stringify({
  fakturerbara: ko.fakturerbara.length,
  summa:        ko.summa,
  hallna:       ko.hallna.length,
  hanterade:    ko.hanterade.length,
  trasiga:      ko.trasiga.length,
  karensDagar:  ko.karensDagar,
}, null, 2));

// Hållna posters SKÄL är det som gör talet läsbart. Ett aggregat utan sina fall är ett tal som
// ser ut som ett beslutsunderlag (22 aug: «11,6 % falsklarm» ledde fel, filnamnen ledde rätt).
const skal = {};
for (const r of ko.hallna) skal[r.skal] = (skal[r.skal] ?? 0) + 1;
if (ko.hallna.length) console.log(`hållna per skäl: ${JSON.stringify(skal)}`);
for (const r of ko.trasiga) console.error(`✗ TRASIG post ${r.id}: ${r.fel}`);

if (poster.length === 0) {
  console.log('\n· Liggaren är TOM — och det är ett mätvärde, inte ett fel.');
  console.log('  Väntat: Switch-rälsen är mode:\'stub\' och inga byten har genomförts.');
  console.log('  BLINDFLÄCK: blir rälsen skarp utan att orkestratorn instansieras med PgStore');
  console.log('  är liggaren tom av FEL skäl — och de två ser likadana ut härifrån.');
}

console.log('\n✓ sonden kom fram och mätte');
