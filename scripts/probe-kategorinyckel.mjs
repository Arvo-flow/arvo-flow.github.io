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

// ── 4 · DEN AVGÖRANDE MÄTNINGEN ────────────────────────────────────────────────────────────
// Lokalt gav `checkSupplierFingerprint('telia','Telia Sverige AB','molnvaxel')` MISMATCH, men
// liggaren visar en Telia-molnväxelfaktura som gick `route=auto`. En av de två är fel, och det
// får inte gissas bort. Här körs PRODUKTIONENS EGEN funktion på PRODUKTIONENS EGNA strängar —
// den enda frågan som kan skilja «grinden fäller inte» från «mitt anrop var fel».
const { checkSupplierFingerprint } = await import('../lib/supplier-fingerprints.js');
const rader = await db`
  SELECT id, supplier, normalized_supplier, category, route, triage_reason, created_at,
         fingerprint, annual_cost
  FROM invoice_analyses            -- internt: mätning av grindutfall mot verkliga strängar
  WHERE category = 'molnvaxel'
     OR supplier ILIKE '%telia%' OR normalized_supplier ILIKE '%telia%'
     OR supplier ILIKE '%telenor%' OR supplier ILIKE '%tre %'
  ORDER BY created_at DESC
  LIMIT 30
`;
console.log(`\n4 · grinden körd mot ${rader.length} verkliga rad(er):`);
for (const r of rader) {
  const fp = checkSupplierFingerprint(r.normalized_supplier, r.supplier, r.category);
  const dom = !fp.matched ? 'matchar inget fingeravtryck'
    : fp.categoryOk ? 'OK' : `MISMATCH (väntade [${fp.expectedCategories.join(', ')}])`;
  console.log(`   ${String(r.created_at).slice(4, 10)} `
    + `norm=${JSON.stringify(r.normalized_supplier ?? null).padEnd(24)} `
    + `raw=${JSON.stringify(String(r.supplier ?? '').slice(0, 22)).padEnd(26)} `
    + `cat=${String(r.category ?? '—').padEnd(12)} route=${String(r.route).padEnd(13)} → ${dom}`);
  // Den avgörande halvan: kom raden genom PIPELINEN eller skrevs den direkt av ett seed-skript?
  // `scripts/seed-avtal-testyta.mjs` sätter fingerprint 'seed:avtal-testyta' och kringgår grinden
  // helt. En seedad rad bevisar ingenting om vad en kund råkat ut för.
  console.log(`          fingerprint=${JSON.stringify(String(r.fingerprint ?? '').slice(0, 28))} `
    + `arskostnad=${r.annual_cost}`);
}
if (rader.length === 0) console.log('   (inga rader — utfall om DATAN, inte om grinden)');

// ── 5 · DE FYRA MOLNVÄXEL-DATAPUNKTERNA (grundarfråga 2026-09-20: «är vi helt säkra?») ──────
// Svaret var NEJ. Jag skrev i domen att raderna «bär gammal semantik (seats = SIM-antal)». Det
// var en SLUTSATS, inte en avläsning — och den föll på två ställen redan i koden:
//   · `invoice_datapoints` har ingen `seats`-kolumn.
//   · `storeDatapoint` skriver varken `per_user_monthly_exvat` eller `tier`; den tar `annualCost`.
//     `buildTelekomDatapoint`, som skulle skrivit dem, har NOLL produktionsanropare.
// Alltså kan SIM-nämnaren aldrig ha nått prisboken. Men då blir nästa fråga skarpare: vad är
// `annual_cost` på en molnväxelrad — hela den kombinerade fakturan, eller växeldelen?
const mv = await db`
  SELECT id, supplier, annual_cost, per_user_monthly_exvat, tier, source,
         industry, size_bucket, pdf_hash, created_at
  FROM invoice_datapoints          -- internt: granskning av lagrad semantik, ingen kundyta
  WHERE category = 'molnvaxel'
  ORDER BY created_at
`;
console.log(`\n5 · molnvaxel-datapunkter: ${mv.length}`);
for (const r of mv) {
  console.log(`   ${String(r.created_at).slice(4, 10)} ${String(r.supplier).slice(0, 24).padEnd(24)} `
    + `arskostnad=${String(r.annual_cost).padEnd(9)} per_user=${String(r.per_user_monthly_exvat ?? 'NULL').padEnd(8)} `
    + `tier=${String(r.tier ?? 'NULL').padEnd(6)} ${r.industry}/${r.size_bucket} src=${r.source}`);
  console.log(`          pdf_hash=${r.pdf_hash ? String(r.pdf_hash).slice(0, 16) : 'NULL'}`);
}
if (mv.length === 0) console.log('   (inga rader)');

// ── 6 · BÄR CELLEN? Om nej når talen ingen kund, och då är frågan en annan. ────────────────
const { cellenBar } = await import('../lib/benchmark.js');
const celler = await db`
  SELECT industry, size_bucket, COUNT(*)::int AS n, COUNT(DISTINCT annual_cost)::int AS skilda
  FROM invoice_datapoints          -- internt: täckningsmätning
  WHERE category = 'molnvaxel'
  GROUP BY industry, size_bucket
`;
console.log('\n6 · bär någon molnvaxel-cell (och når alltså kund)?');
for (const c of celler) {
  const dom = cellenBar({ n: c.n, skilda: c.skilda });
  console.log(`   ${c.industry}/${c.size_bucket}: ${dom.bar ? '⚠️ BÄR' : 'bär inte'} — ${dom.skal ?? 'tröskeln nådd'}`);
}
// Den andra levande vägen: invoice_analyses (lägre tröskel, 5).
const la = await db`
  SELECT COUNT(DISTINCT pdf_hash)::int AS dokument
  FROM invoice_analyses            -- internt: täckningsmätning av den andra prisbokskällan
  WHERE category = 'molnvaxel' AND arkiverad_at IS NULL AND annual_cost > 0
`;
console.log(`   invoice_analyses: ${la[0].dokument} dokument (tröskel 5)`);

console.log('\n[probe-kategorinyckel] klar\n');
