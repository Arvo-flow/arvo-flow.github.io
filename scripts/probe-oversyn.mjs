#!/usr/bin/env node
// scripts/probe-oversyn.mjs — SKRIVSKYDDAD MÄTNING för systemöversynen 2026-09-23.
//
// Varje fråga här är ett motprov till ett påstående i översynens dom. Sonden SKRIVER INGENTING.
// Loggen är publik: den skriver antal, kategorier, filnamn ur repots egen testmapp och datum —
// aldrig en e-postadress, ett fingeravtryck eller ett belopp knutet till en kund.
//
// F1 · TESTFAKTUROR I PRODUKTIONENS MÄTBAS. pdf_hash = sha256 av PDF-bytesen (api/test-invoice.mjs:448).
//      Repots test-pdfs/ har kända hashar; varje träff i invoice_analyses / invoice_datapoints är
//      alltså en testfaktura, oavsett vem som laddade upp den.
// F2 · PÅMINNELSEMEJLEN. Har mallen med «NaN dagar» faktiskt gått ut? (reminder_*_sent_at)
// F3 · AVTALSKLOCKAN. Hur många rader bär ett slutdatum (och tappar därmed uppsägningstiden)?
// F4 · FRUSNA BYTESMÅL. Ålder på lagrade bytesbelopp som rummet visar under «kostar idag».
// F5 · AKTIVERINGAR MED «Kritisk» / score 0.
// F6 · Övervakade avtal (monitoring) — rader som får «konkurrenskraftigt».
//
// MOTPROV: F1 kräver att hashningen själv fungerar — sonden hashar en känd fil två gånger och
// kräver samma värde, och kräver ≥ 1 hash att fråga på. Utan databas: exit 1 utan tal.

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { getDb } from '../lib/db.js';
import { arTestidentitet } from '../lib/test-surface.js';

const db = getDb();
if (!db) { console.error('✗ INGEN DATABAS — sonden kom inte fram. Detta är INTE ett mätvärde.'); process.exit(1); }

const ROT = new URL('..', import.meta.url).pathname;
const pdfer = [];
(function gå(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) gå(p);
    else if (n.toLowerCase().endsWith('.pdf')) pdfer.push(p);
  }
})(join(ROT, 'test-pdfs'));
const hash = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
if (!pdfer.length || hash(pdfer[0]) !== hash(pdfer[0])) { console.error('✗ MOTPROV: hashningen fungerar inte'); process.exit(1); }
const hashTillFil = new Map(pdfer.map((p) => [hash(p), relative(join(ROT, 'test-pdfs'), p)]));
const hashar = [...hashTillFil.keys()];
console.log(`\n═══ SYSTEMÖVERSYN · produktionsmätning ═══\n  Testfakturor i repot: ${pdfer.length} (${hashar.length} unika hashar)`);

// ── F1 ─────────────────────────────────────────────────────────────────────────────────────
const ana = await db`
  SELECT pdf_hash, category, route, user_email, arkiverad_at IS NOT NULL AS arkiverad
  FROM invoice_analyses   -- internt: översynens mätning av testfakturor i mätbasen
`;
const riktiga = ana.filter((r) => !arTestidentitet(r.user_email) && !r.arkiverad);
const testIRiktiga = riktiga.filter((r) => hashTillFil.has(r.pdf_hash));
console.log(`\n── F1 · testfakturor i fyndgradens mätbas ──`);
console.log(`  invoice_analyses: ${ana.length} rader · «riktiga» (ej testidentitet, ej arkiverade): ${riktiga.length}`);
console.log(`  varav pdf_hash = en fil i repots test-pdfs/: ${testIRiktiga.length}`);
const perMapp = {};
for (const r of testIRiktiga) { const m = hashTillFil.get(r.pdf_hash).includes('/') ? hashTillFil.get(r.pdf_hash).split('/')[0] + '/' : '(rot)'; perMapp[m] = (perMapp[m] ?? 0) + 1; }
console.log(`  per mapp: ${JSON.stringify(perMapp)}`);
console.log(`  «riktiga» som INTE är en repofil: ${riktiga.length - testIRiktiga.length}`);

const dp = await db`
  SELECT pdf_hash, category, industry, size_bucket
  FROM invoice_datapoints   -- internt: översynens mätning av testfakturor i prisboken
`;
const dpTest = dp.filter((r) => r.pdf_hash && hashTillFil.has(r.pdf_hash));
console.log(`\n── F1b · testfakturor i prisboken (invoice_datapoints) ──`);
console.log(`  rader: ${dp.length} · med pdf_hash: ${dp.filter((r) => r.pdf_hash).length} · varav repofil: ${dpTest.length}`);
const perCell = {};
for (const r of dpTest) { const k = `${r.category}·${r.industry}·${r.size_bucket}`; perCell[k] = (perCell[k] ?? 0) + 1; }
const cellTot = {};
for (const r of dp) { const k = `${r.category}·${r.industry}·${r.size_bucket}`; cellTot[k] = (cellTot[k] ?? 0) + 1; }
for (const [k, n] of Object.entries(perCell).sort((a, b) => b[1] - a[1])) console.log(`    ${k.padEnd(40)} ${n} testrader av ${cellTot[k]}`);

// ── F2..F6 — var och en i egen try: en saknad kolumn ska sägas, inte fälla resten ────────────
const fraga = async (namn, fn) => { try { await fn(); } catch (e) { console.log(`\n── ${namn} ── KUNDE INTE LÄSAS: ${String(e.message).slice(0, 90)}`); } };

await fraga('F2 · påminnelsemejl (mallen säger «NaN dagar»)', async () => {
  const [r] = await db`
    SELECT COUNT(*) FILTER (WHERE reminder_60_sent_at IS NOT NULL)::int AS s60,
           COUNT(*) FILTER (WHERE reminder_30_sent_at IS NOT NULL)::int AS s30,
           MIN(LEAST(reminder_60_sent_at, reminder_30_sent_at)) AS forsta
    FROM invoice_analyses   -- internt: översynen, skickade påminnelser
  `;
  console.log(`\n── F2 · påminnelsemejl ──\n  skickade 60-dagars: ${r.s60} · 30-dagars: ${r.s30} · första: ${r.forsta ? new Date(r.forsta).toISOString().slice(0, 10) : '—'}`);
});

await fraga('F3 · avtalsklocka', async () => {
  const rows = await db`
    SELECT contract_end_date, user_email FROM invoice_analyses   -- internt: översynen, avtalsklockan
    WHERE contract_end_date IS NOT NULL AND arkiverad_at IS NULL
  `;
  const r = rows.filter((x) => !arTestidentitet(x.user_email));
  const fram = r.filter((x) => new Date(x.contract_end_date) > new Date());
  console.log(`\n── F3 · avtalsklocka (uppsägningstiden lagras aldrig) ──\n  rader med slutdatum (ej test): ${r.length} · i framtiden: ${fram.length}`);
});

await fraga('F4 · frusna bytesmål', async () => {
  const rows = await db`
    SELECT category, created_at, analyserad_at, user_email FROM invoice_analyses   -- internt: översynen, frusna bytesmål
    WHERE should_switch = true AND net_saving > 0 AND arkiverad_at IS NULL
  `;
  const r = rows.filter((x) => !arTestidentitet(x.user_email));
  const dagar = (d) => d ? Math.round((Date.now() - new Date(d)) / 864e5) : null;
  console.log(`\n── F4 · lagrade bytesmål som rummet visar under «kostar idag» ──\n  rader: ${r.length}`);
  for (const x of r) console.log(`    ${String(x.category).padEnd(20)} dömd för ${dagar(x.analyserad_at) ?? '?'} d sedan (stämpel) · skapad för ${dagar(x.created_at)} d sedan${x.analyserad_at ? '' : ' · OSTÄMPLAD'}`);
});

await fraga('F5 · aktiveringar', async () => {
  const [r] = await db`
    SELECT COUNT(*)::int AS n,
           COUNT(*) FILTER (WHERE diag_label = 'Kritisk')::int AS kritisk,
           COUNT(*) FILTER (WHERE diag_score = 0)::int AS noll
    FROM intelligence_activations   -- internt: översynen, aktiveringsmejlens poäng
  `;
  console.log(`\n── F5 · aktiveringsmejl ──\n  aktiveringar: ${r.n} · märkta «Kritisk»: ${r.kritisk} · med score 0: ${r.noll}`);
});

await fraga('F6 · övervakade avtal', async () => {
  const rows = await db`
    SELECT route, user_email FROM invoice_analyses   -- internt: översynen, rutter
    WHERE arkiverad_at IS NULL
  `;
  const r = rows.filter((x) => !arTestidentitet(x.user_email));
  const per = {}; for (const x of r) per[x.route] = (per[x.route] ?? 0) + 1;
  console.log(`\n── F6 · rutter (ej test) ──\n  ${JSON.stringify(per)}`);
});

console.log('\n[probe-oversyn] klar\n');
