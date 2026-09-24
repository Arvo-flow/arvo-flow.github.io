#!/usr/bin/env node
// scripts/probe-premiumtillgangar.mjs — SKRIVSKYDDAD MÄTNING bakom premiumvisionen (2026-09-24).
//
// Frågan: vad sitter vi redan på som ingen kund ser? Varje post är ett räknat tal, aldrig en text,
// adress eller ett belopp (publik logg). Testidentiteter räknas separat.
//   T1 · oauth_connections — kopplade inkorgar: antal, leverantör, förnyelsetoken, läsbehörighet.
//   T2 · invoice_analyses — lagrat underlag: radposter, avtalsvillkor, uppsägningstid, fakturanummer,
//        avsändare med ≥2 fakturor från samma leverantör (egen prishistorik), dubblettkandidater
//        (samma avsändare + leverantör + fakturanummer), fyndtyper.
//   T3 · prisvakten — supplier_price_history, aktuella priser, svepen, kandidater.
//   T4 · avtalsklockan — kända slutdatum framåt, inom 180 dagar.
// MOTPROV: varje fråga säger «KUNDE INTE LÄSAS» vid fel, aldrig 0. Utan databas: exit 1.

import { getDb } from '../lib/db.js';
import { arTestidentitet } from '../lib/test-surface.js';

const db = getDb();
if (!db) { console.error('✗ INGEN DATABAS — sonden kom inte fram. Detta är INTE ett mätvärde.'); process.exit(1); }
const fraga = async (namn, fn) => { try { await fn(); } catch (e) { console.log(`\n── ${namn} ── KUNDE INTE LÄSAS: ${String(e.message).slice(0, 120)}`); process.exitCode = 1; } };
const dag = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '—');

await fraga('T1 · kopplade inkorgar', async () => {
  const r = await db`SELECT email, provider, refresh_token IS NOT NULL AS forny, scope, created_at, updated_at FROM oauth_connections`;
  const riktiga = r.filter((x) => !arTestidentitet(x.email));
  const per = {};
  for (const x of riktiga) {
    const k = x.provider; per[k] ??= { n: 0, forny: 0, las: 0 };
    per[k].n++; if (x.forny) per[k].forny++;
    if (/gmail\.readonly|Mail\.Read/i.test(x.scope ?? '')) per[k].las++;
  }
  console.log(`\n── T1 · oauth_connections ──  rader ${r.length} · riktiga ${riktiga.length} · skilda adresser ${new Set(riktiga.map((x) => x.email)).size}`);
  for (const [k, v] of Object.entries(per)) console.log(`    ${k}: ${v.n} · med förnyelsetoken ${v.forny} · med läsbehörighet ${v.las}`);
  if (riktiga.length) console.log(`    första ${dag(riktiga.map((x) => x.created_at).sort()[0])} · senaste uppdatering ${dag(riktiga.map((x) => x.updated_at).sort().at(-1))}`);
});

await fraga('T2 · lagrat underlag', async () => {
  const r = await db`
    SELECT user_email, fingerprint, normalized_supplier, invoice_number, route,
           line_items_json IS NOT NULL AS rader, contract_terms_json IS NOT NULL AS villkor,
           uppsagning_json IS NOT NULL AS uppsagning, lead_finding_json->>'type' AS fynd
    FROM invoice_analyses   -- internt: premiumsonden räknar lagrat underlag
    WHERE arkiverad_at IS NULL
  `;
  const riktiga = r.filter((x) => !arTestidentitet(x.user_email));
  const n = (f) => riktiga.filter(f).length;
  console.log(`\n── T2 · invoice_analyses (ej arkiverade, testytan utesluten) ──  rader ${riktiga.length} (testytan ${r.length - riktiga.length})`);
  console.log(`    med radposter ${n((x) => x.rader)} · med avtalsvillkor ${n((x) => x.villkor)} · med uppsägningstid ${n((x) => x.uppsagning)} · med fakturanummer ${n((x) => x.invoice_number)}`);
  const avs = (x) => x.user_email || x.fingerprint;
  const par = new Map();
  for (const x of riktiga) { if (!x.normalized_supplier) continue; const k = `${avs(x)}|${x.normalized_supplier}`; par.set(k, (par.get(k) ?? 0) + 1); }
  console.log(`    avsändare×leverantör med ≥2 fakturor (egen prishistorik möjlig): ${[...par.values()].filter((v) => v >= 2).length} av ${par.size}`);
  const nr = new Map();
  for (const x of riktiga) { if (!x.invoice_number || !x.normalized_supplier) continue; const k = `${avs(x)}|${x.normalized_supplier}|${x.invoice_number}`; nr.set(k, (nr.get(k) ?? 0) + 1); }
  console.log(`    dubblettkandidater (samma avsändare+leverantör+fakturanummer ≥2): ${[...nr.values()].filter((v) => v >= 2).length}`);
  const typer = {};
  for (const x of riktiga) if (x.fynd) typer[x.fynd] = (typer[x.fynd] ?? 0) + 1;
  console.log(`    lagrade fyndtyper: ${JSON.stringify(typer)}`);
  const rutter = {};
  for (const x of riktiga) rutter[x.route] = (rutter[x.route] ?? 0) + 1;
  console.log(`    rutter: ${JSON.stringify(rutter)}`);
});

await fraga('T3 · prisvakten', async () => {
  const [h] = await db`SELECT COUNT(*)::int AS n, MIN(changed_at) AS forsta, MAX(changed_at) AS senaste FROM supplier_price_history   -- internt: premiumsonden`;
  const [p] = await db`SELECT COUNT(*)::int AS n, COUNT(DISTINCT supplier)::int AS lev FROM supplier_prices WHERE is_current = true   -- internt: premiumsonden`;
  const [v] = await db`SELECT COUNT(*)::int AS n, MAX(swept_at) AS senaste FROM vakt_events   -- internt: premiumsonden`;
  const [c] = await db`SELECT COUNT(*)::int AS n FROM price_change_candidates   -- internt: premiumsonden`;
  console.log(`\n── T3 · prisvakten ──  historik ${h.n} rader (${dag(h.forsta)}–${dag(h.senaste)}) · aktuella priser ${p.n} (${p.lev} leverantörer) · svep ${v.n} (senaste ${dag(v.senaste)}) · kandidater ${c.n}`);
});

await fraga('T4 · avtalsklockan', async () => {
  const r = await db`
    SELECT user_email, contract_end_date FROM invoice_analyses   -- internt: premiumsonden, avtalsklockans räckvidd
    WHERE arkiverad_at IS NULL AND contract_end_date IS NOT NULL
  `;
  const riktiga = r.filter((x) => !arTestidentitet(x.user_email));
  const nu = Date.now();
  const fram = riktiga.filter((x) => new Date(x.contract_end_date) > nu);
  console.log(`\n── T4 · avtalsklockan ──  kända slutdatum ${riktiga.length} · framåt ${fram.length} · inom 180 dagar ${fram.filter((x) => new Date(x.contract_end_date) - nu < 180 * 864e5).length}`);
});

console.log('\n[probe-premiumtillgangar] klar\n');
