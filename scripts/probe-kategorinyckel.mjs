#!/usr/bin/env node
// scripts/probe-kategorinyckel.mjs — MÄTER hur många rader i produktionen som bär den döda
// kategorinyckeln `vaxel`, och hur många som bär den kanoniska `molnvaxel`.
//
// Frågan är bindande för sammanslagningen: finns det lagrade rader med `vaxel` måste nyckeln
// förbli LÄSBAR (en alias som normaliseras vid läsning), inte bara raderas. Att radera en nyckel
// som bär kundens historik är ett tyst tapp — samma form som arkiveringen 11 september.
//
// ⚠️ MÄTER DATAN, INTE HTTP-ROUTEN (läxan 1 september). `DATABASE_URL` finns i Actions.
// ⚠️ ETT TOMT SVAR ÄR INTE ETT SVAR: utan databas avslutar sonden 1 utan tal.

import { getDb } from '../lib/db.js';

const db = getDb();
if (!db) {
  console.error('✗ INGEN DATABAS — sonden kom inte fram. Detta är INTE ett mätvärde.');
  console.error('  Kör i GitHub Actions där DATABASE_URL finns.');
  process.exit(1);
}

console.log('\n═══ KATEGORINYCKELN · vaxel kontra molnvaxel i produktionen ═══\n');

// ── 1 · invoice_analyses (kundvy + historik) ────────────────────────────────────────────────
const analyser = await db`
  SELECT category, route, triage_reason, COUNT(*)::int AS antal,
         MIN(created_at) AS forsta, MAX(created_at) AS senaste
  FROM invoice_analyses            -- internt: mätning av nyckelfördelning, ingen kundyta
  WHERE category IN ('vaxel', 'molnvaxel')
  GROUP BY category, route, triage_reason
  ORDER BY antal DESC
`;
console.log(`1 · invoice_analyses: ${analyser.reduce((s, r) => s + r.antal, 0)} rad(er) `
  + `i ${analyser.length} kombination(er)`);
for (const r of analyser) {
  console.log(`   ${String(r.category).padEnd(12)} route=${String(r.route).padEnd(13)} `
    + `skal=${String(r.triage_reason ?? '—').padEnd(24)} ${String(r.antal).padStart(4)}  `
    + `(${String(r.forsta).slice(0, 10)} → ${String(r.senaste).slice(0, 10)})`);
}
if (analyser.length === 0) console.log('   (inga rader i någondera nyckeln)');

// ── 2 · invoice_datapoints (moaten) ─────────────────────────────────────────────────────────
const punkter = await db`
  SELECT category, COUNT(*)::int AS antal, COUNT(DISTINCT supplier)::int AS leverantorer
  FROM invoice_datapoints          -- internt: mätning av nyckelfördelning
  WHERE category IN ('vaxel', 'molnvaxel')
  GROUP BY category
  ORDER BY antal DESC
`;
console.log(`\n2 · invoice_datapoints: ${punkter.reduce((s, r) => s + r.antal, 0)} punkt(er)`);
for (const r of punkter) {
  console.log(`   ${String(r.category).padEnd(12)} ${String(r.antal).padStart(4)} punkter `
    + `· ${r.leverantorer} leverantör(er)`);
}
if (punkter.length === 0) console.log('   (inga punkter i någondera nyckeln)');

// ── 3 · DEN BINDANDE FRÅGAN: föll Telia-fakturor på fingerprint_mismatch? ───────────────────
// Om ja är det [KUND]: kategoriseraren ger `molnvaxel`, Telias fingeravtryck väntar `vaxel`,
// och kunden fick «en människa tar vid» i stället för det prissatta svaret.
const telia = await db`
  SELECT category, triage_reason, COUNT(*)::int AS antal
  FROM invoice_analyses            -- internt: mätning av triageutfall
  WHERE (supplier ILIKE '%telia%' OR normalized_supplier ILIKE '%telia%')
  GROUP BY category, triage_reason
  ORDER BY antal DESC
  LIMIT 20
`;
console.log(`\n3 · Telia-fakturor i liggaren: ${telia.reduce((s, r) => s + r.antal, 0)}`);
for (const r of telia) {
  const flagga = r.triage_reason === 'fingerprint_mismatch' ? '  ⚠️ ' : '    ';
  console.log(`${flagga}${String(r.category ?? '(null)').padEnd(20)} `
    + `${String(r.triage_reason ?? '—').padEnd(26)} ${r.antal}`);
}
if (telia.length === 0) {
  console.log('   INGA Telia-fakturor alls — skadan är alltså inte skedd, men vägen är öppen.');
  console.log('   (Ett utfall om DATAN, inte ett bevis att kombinationen fungerar.)');
}

console.log('\n[probe-kategorinyckel] klar\n');
