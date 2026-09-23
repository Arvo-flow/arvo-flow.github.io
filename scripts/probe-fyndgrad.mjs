#!/usr/bin/env node
// scripts/probe-fyndgrad.mjs — FYNDGRADEN: verifierade fynd per inskickad faktura, i PRODUKTION.
//
// ══ VARFÖR (grundarbeslut 2026-09-23) ══════════════════════════════════════════════════════
// Systemets primära mätetal är numera «verifierade fynd per inskickad faktura i produktion», inte
// antal tester. Ett mätetal utan sitt instrument är ett påstående — det här är instrumentet.
//
// ⚠️ DET FÖRSTA «0 AV 5» VAR INTE ETT MÄTVÄRDE PÅ PRODUKTEN. De fem raderna i det skarpa rummet
// seedas av `scripts/seed-avtal-testyta.mjs` med en direkt INSERT — fäll-innehav byggda för att
// pröva AVTALSFLÖDET, med runda rekvisitabelopp och utan en enda radpost. De har aldrig passerat
// `recommend()`. Att räkna fynd på dem mäter seeden. Den här sonden utesluter testidentiteten
// (`arTestidentitet`, samma fråga som prisboken ställer) och räknar den SEPARAT.
//
// ══ VAD SONDEN KAN — OCH INTE KAN — MÄTA ════════════════════════════════════════════════════
// `storeAnalysis` sparar bytesbeslutet (should_switch, net_saving) och det forensiska huvudfyndet
// (lead_finding_json). Det sparar INTE rätt-storleks-fynden (saasFinanceRightsizing,
// m365Rightsizing, adobeRightsizing, loneadminRightsizing) — de lever bara i svaret till
// fakturasidan och kastas vid lagring. Sonden kan därför INTE räkna hur många sådana fynd vi
// producerat. Den räknar i stället hur många fakturor som ligger i en kategori där en sådan motor
// FINNS — en ÖVRE GRÄNS för vad som kan ha kastats, uttryckligen märkt som gräns, aldrig som antal.
//
// ══ MOTPROV (Noll-inferens, amendemang 1) ══════════════════════════════════════════════════
//   · Testytan måste HITTAS (≥ 1 rad) och redovisas separat — annars kan vi inte veta att
//     uteslutningen fungerar, och ett «0 testrader» vore omöjligt att skilja från ett trasigt filter.
//   · Utan databas avslutar sonden 1 utan tal. Ett tomt svar är inte ett svar.

import { getDb } from '../lib/db.js';
import { arTestidentitet } from '../lib/test-surface.js';

const db = getDb();
if (!db) {
  console.error('✗ INGEN DATABAS — sonden kom inte fram. Detta är INTE ett mätvärde.');
  process.exit(1);
}

// Kategorier med en rätt-storleksmotor i recommend(). Härledd ur kundytans kortvillkor
// (NIVASANKNINGSKORT i src/lib/diagnos.js) — mappad till den kategori som producerar kortet.
const RATTSTORLEK_KATEGORIER = ['saas-finance', 'saas-productivity', 'saas-creative', 'loneadmin'];

// ⚠️ TESTIDENTITETEN AVGÖRS I JS, AV `arTestidentitet` — INTE AV EN EGEN SQL-KOPIA.
// Första versionen filtrerade `user_email = TEST_EMAIL` (EN adress, medan testytan känner flera
// plus varje `+tag`) och dessutom `fingerprint LIKE 'seed:%'`. Den andra klausulen var ett skydd
// bakom ett skydd: mätt 2026-09-23 skriver den enda seedaren (seed-avtal-testyta.mjs) alltid
// TEST_EMAIL, alltså fångade e-postfiltret redan varje seedrad och LIKE-klausulen kunde aldrig
// ändra utfallet (10 sep: «ett skydd bakom ett annat skydd är inte två lager»). Den fällde
// dessutom SV-09 — med rätta i allmänhet, fingeravtryck hashas. Nu EN fråga, EN sanning.
const rader = await db`
  SELECT category, route, should_switch, net_saving, gross_saving, user_email,
         normalized_supplier, supplier, triage_reason,
         (lead_finding_json IS NOT NULL) AS har_fynd,
         arkiverad_at IS NOT NULL AS arkiverad
  FROM invoice_analyses   -- internt: fyndgradsmätning, ingen kundyta; testytan redovisas separat
`;

const test = rader.filter((r) => arTestidentitet(r.user_email));
const riktiga = rader.filter((r) => !arTestidentitet(r.user_email));
const aktiva = riktiga.filter((r) => !r.arkiverad);

console.log('\n═══ FYNDGRADEN · verifierade fynd per inskickad faktura (produktion) ═══\n');
console.log(`  Rader totalt: ${rader.length}`);
console.log(`  Testyta/seed (UTESLUTNA, redovisas för att filtret ska synas): ${test.length}`);
console.log(`  Riktiga analyser: ${riktiga.length} (varav arkiverade: ${riktiga.length - aktiva.length})`);

if (test.length === 0) {
  console.error('\n✗ MOTPROVET FÖLL: sonden hittade ingen testyta alls — filtret kan inte bevisas.');
  process.exit(1);
}
if (riktiga.length === 0) {
  console.log('\n  Inga riktiga analyser i produktion. Fyndgraden är ODEFINIERAD, inte noll.');
  console.log('\n[probe-fyndgrad] klar\n');
  process.exit(0);
}

const bas = aktiva.length ? aktiva : riktiga;
const byte = bas.filter((r) => r.should_switch === true && Number(r.net_saving) > 0);
const fynd = bas.filter((r) => r.har_fynd);
const minstEtt = bas.filter((r) => (r.should_switch === true && Number(r.net_saving) > 0) || r.har_fynd);
const tysta = bas.filter((r) => r.route === 'auto' && !r.har_fynd && !(r.should_switch && Number(r.net_saving) > 0));
const rsKandidater = bas.filter((r) => RATTSTORLEK_KATEGORIER.includes(r.category));

const pct = (n) => `${((n / bas.length) * 100).toFixed(1)} %`;
console.log(`\n  Mätbas: ${bas.length} ${aktiva.length ? 'aktiva' : 'riktiga'} analyser\n`);
console.log(`  Verifierat bytesfynd (should_switch + net_saving > 0): ${byte.length}  (${pct(byte.length)})`);
console.log(`  Forensiskt huvudfynd (lead_finding_json):             ${fynd.length}  (${pct(fynd.length)})`);
console.log(`  ─────────────────────────────────────────────────────`);
console.log(`  FYNDGRAD — minst ett lagrat fynd:                     ${minstEtt.length} av ${bas.length}  (${pct(minstEtt.length)})`);
console.log(`\n  Auto-rader utan något lagrat fynd:                     ${tysta.length}`);
console.log(`\n  ⚠️ OMÄTBART I DAG — rätt-storleksfynd lagras inte.`);
console.log(`     Övre gräns för hur många som KAN ha kastats vid lagring: ${rsKandidater.length} rader`);
console.log(`     i kategorier med rätt-storleksmotor (${RATTSTORLEK_KATEGORIER.join(', ')}).`);
console.log(`     Detta är en GRÄNS, inte ett antal fynd.`);

const perKategori = {};
for (const r of bas) {
  const k = r.category ?? '—';
  perKategori[k] ??= { n: 0, fynd: 0 };
  perKategori[k].n += 1;
  if ((r.should_switch && Number(r.net_saving) > 0) || r.har_fynd) perKategori[k].fynd += 1;
}
console.log('\n  Per kategori (fynd / analyser):');
for (const [k, v] of Object.entries(perKategori).sort((a, b) => b[1].n - a[1].n)) {
  console.log(`    ${k.padEnd(22)} ${String(v.fynd).padStart(3)} / ${String(v.n).padEnd(4)}`
    + `${RATTSTORLEK_KATEGORIER.includes(k) ? '  ← rätt-storleksmotor finns, fynd lagras inte' : ''}`);
}

// ── DE OKATEGORISERADE — största hinken, och den enda som inte kan hitta NÅGOT ────────────────
// Mätt 2026-09-23: 18 av 43 riktiga analyser (42 %) landade som `uncategorized`. Revisionsgrinden
// kortsluter den kategorin till talfritt offert-läge — sifferrevisorn visar det i varje
// pre-commit («'uncategorized' är oreviderad → offert-läge utan siffror») — så hinken är ett tak
// för hela fyndgraden. Frågan är vad de är: ett kategoriseringsfel på en kategori vi KAN, eller en faktura
// som med rätta ligger utanför (ett kvitto, en engångsköp)? De två kräver motsatta åtgärder, och
// den enda som kan avgöra det är en läsning av raderna.
//
// Loggen är PUBLIK: vi skriver leverantörsnamn (motpartens bolag, aldrig kundens), rutt och skäl
// — aldrig belopp, e-post eller fingeravtryck.
const okat = bas.filter((r) => r.category === 'uncategorized');
console.log(`\n── OKATEGORISERADE (${okat.length} av ${bas.length}) — leverantör · rutt · skäl ──`);
const perLev = {};
for (const r of okat) {
  const namn = (r.normalized_supplier || r.supplier || '(tomt namn)').trim() || '(tomt namn)';
  const nyckel = `${namn} · ${r.route ?? '—'} · ${r.triage_reason ?? '—'}`;
  perLev[nyckel] = (perLev[nyckel] ?? 0) + 1;
}
for (const [k, n] of Object.entries(perLev).sort((a, b) => b[1] - a[1])) {
  console.log(`    ${String(n).padStart(2)} ×  ${k}`);
}
console.log('\n[probe-fyndgrad] klar (okategoriserade listade)\n');
