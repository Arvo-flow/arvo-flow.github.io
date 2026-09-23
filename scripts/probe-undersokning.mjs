#!/usr/bin/env node
// scripts/probe-undersokning.mjs — SKRIVSKYDDAD MÄTNING för grundarens «undersök alla frågor» 2026-09-23.
//
// Varje fråga är en omätt kandidat ur systemöversynen som ska bli ett avläst tal. Sonden SKRIVER
// INGENTING. Loggen är publik: antal, kategorier, leverantörsnamn (bolag, inte personer), datum och
// repots egna filnamn — aldrig en e-postadress, ett fingeravtryck eller ett kundbelopp.
//
// U1 · DE ANONYMA RADERNA i fyndgradens mätbas (user_email NULL). Varifrån? Datum, kategori, rutt,
//      antal skilda fingeravtryck, och om samma dokument (pdf_hash) också finns med avsändare.
// U2 · DUSTIN / KOMPLETT / SYSTEMAIR står okategoriserade efter kategorifixen. Vilken kod dömde dem,
//      och med vilket triage-skäl?
// U3 · supplier_prices — prislarmets golv. Hur gamla är de «aktuella» priserna, jämfört med prisboken?
// U4 · Lagrade bytesmål: ålder och stämpel (rummet visar dem under «kostar idag»).
// U5 · invoice_datapoints per månad och källa — hur mycket av prisboken skrevs före testidentitetsgrinden?
//
// MOTPROV: varje fråga säger «KUNDE INTE LÄSAS» i stället för 0 när den kastar. Utan databas: exit 1.

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { getDb } from '../lib/db.js';
import { arTestidentitet } from '../lib/test-surface.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

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
const hashTillFil = new Map(pdfer.map((p) => [hash(p), relative(join(ROT, 'test-pdfs'), p)]));
const dag = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '—');
const fraga = async (namn, fn) => { try { await fn(); } catch (e) { console.log(`\n── ${namn} ── KUNDE INTE LÄSAS: ${String(e.message).slice(0, 120)}`); } };

console.log(`\n═══ UNDERSÖKNING · produktionsmätning ═══`);

await fraga('U1 · anonyma rader', async () => {
  const rows = await db`
    SELECT fingerprint, pdf_hash, supplier, category, route, triage_reason, created_at, analyserad_at,
           analyserad_sha, user_email, arkiverad_at IS NOT NULL AS arkiverad
    FROM invoice_analyses   -- internt: undersökningens mätning av anonyma rader i mätbasen
  `;
  const riktiga = rows.filter((r) => !arTestidentitet(r.user_email) && !r.arkiverad);
  const anon = riktiga.filter((r) => !r.user_email);
  const medAvsandare = new Set(riktiga.filter((r) => r.user_email).map((r) => r.pdf_hash));
  console.log(`\n── U1 · anonyma rader (user_email NULL) ──`);
  console.log(`  «riktiga» rader: ${riktiga.length} · anonyma: ${anon.length} · skilda fingeravtryck bland anonyma: ${new Set(anon.map((r) => r.fingerprint)).size}`);
  // Motprov: räknaren skiljer de två — rader MED avsändare räknas också.
  console.log(`  motprov · rader med avsändare: ${riktiga.length - anon.length}`);
  for (const r of anon.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))) {
    const repo = hashTillFil.get(r.pdf_hash);
    console.log(`    ${dag(r.created_at)} · ${String(r.supplier).slice(0, 22).padEnd(22)} · ${String(r.category).padEnd(18)} · ${String(r.route).padEnd(12)}`
      + ` · stämpel ${dag(r.analyserad_at)}${repo ? ` · REPOFIL ${repo}` : ''}${medAvsandare.has(r.pdf_hash) ? ' · samma dokument finns MED avsändare' : ''}`);
  }
});

await fraga('U2 · okategoriserade trion', async () => {
  const rows = await db`
    SELECT supplier, normalized_supplier, category, route, triage_reason, analyserad_sha, analyserad_at, user_email
    FROM invoice_analyses   -- internt: undersökningen, varför trion står okategoriserad
    WHERE (supplier ILIKE '%dustin%' OR supplier ILIKE '%komplett%' OR supplier ILIKE '%systemair%') AND arkiverad_at IS NULL
  `;
  console.log(`\n── U2 · Dustin / Komplett / Systemair ──  rader: ${rows.length}`);
  for (const r of rows) console.log(`    ${String(r.supplier).slice(0, 26).padEnd(26)} · norm=${r.normalized_supplier ?? '—'} · kat=${r.category} · ${r.route} · skäl=${r.triage_reason ?? '—'} · sha=${String(r.analyserad_sha ?? '—').slice(0, 7)} ${dag(r.analyserad_at)}${arTestidentitet(r.user_email) ? ' · TEST' : ''}`);
  const [okat] = await db`
    SELECT COUNT(*) FILTER (WHERE category IN ('uncategorized','') )::int AS okat, COUNT(*)::int AS alla
    FROM invoice_analyses WHERE arkiverad_at IS NULL   -- internt: undersökningen, kategoritak
  `;
  console.log(`  alla aktiva rader: ${okat.alla} · okategoriserade: ${okat.okat}`);
});

await fraga('U3 · supplier_prices', async () => {
  const rows = await db`
    SELECT supplier, product, tier, category, price_monthly, currency, last_verified, updated_at
    FROM supplier_prices WHERE is_current = true   -- internt: undersökningen, prislarmets golv
    ORDER BY category, supplier, product
  `;
  console.log(`\n── U3 · supplier_prices (is_current) ──  rader: ${rows.length}`);
  const perMan = {};
  for (const r of rows) { const m = String(dag(r.last_verified)).slice(0, 7); perMan[m] = (perMan[m] ?? 0) + 1; }
  console.log(`  last_verified per månad: ${JSON.stringify(perMan)}`);
  // Jämför mot prisboken där nivån finns: M365 m.fl. licenseTierBenchmarks (SEK/mån).
  const niv = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks ?? {};
  for (const r of rows.filter((x) => /microsoft|m365|office/i.test(`${x.supplier} ${x.product}`))) {
    const t = String(r.tier ?? '').toLowerCase().replace(/^m365[-_ ]?|^microsoft[-_ ]?365[-_ ]?/, '').replace(/[\s_]+/g, '-');
    const nyckel = Object.keys(niv).find((k) => t && (k === t || k === `business-${t}`));
    const bok = nyckel ? `${nyckel} ${niv[nyckel].msrpAnnual} SEK (årsavtal, verifierad ${niv[nyckel].lastVerified})` : null;
    console.log(`    ${String(r.product).slice(0, 32).padEnd(32)} tier=${r.tier ?? '—'} · ${r.price_monthly} ${r.currency} · verifierad ${dag(r.last_verified)} · prisboken: ${bok ?? '(ingen matchad nivå)'}`);
  }
});

await fraga('U4 · lagrade bytesmål', async () => {
  const rows = await db`
    SELECT category, supplier, created_at, analyserad_at, user_email FROM invoice_analyses   -- internt: undersökningen, frusna bytesmål
    WHERE should_switch = true AND net_saving > 0 AND arkiverad_at IS NULL
  `;
  console.log(`\n── U4 · lagrade bytesmål ──  rader: ${rows.length}`);
  for (const r of rows) console.log(`    ${String(r.category).padEnd(18)} · ${String(r.supplier).slice(0, 20).padEnd(20)} · skapad ${dag(r.created_at)} · stämpel ${dag(r.analyserad_at)}${arTestidentitet(r.user_email) ? ' · TEST' : ''}`);
});

await fraga('U5 · prisbokens datapunkter per månad', async () => {
  const rows = await db`
    SELECT to_char(created_at, 'YYYY-MM') AS man, source, COUNT(*)::int AS n
    FROM invoice_datapoints GROUP BY 1, 2 ORDER BY 1, 2   -- internt: undersökningen, prisbokens ålder
  `;
  console.log(`\n── U5 · invoice_datapoints per månad/källa ──`);
  for (const r of rows) console.log(`    ${r.man} · ${String(r.source).padEnd(16)} · ${r.n}`);
});

await fraga('U6 · supplier_price_history', async () => {
  const rows = await db`
    SELECT supplier, product, category, old_price_monthly, new_price_monthly, changed_by, changed_at
    FROM supplier_price_history ORDER BY changed_at DESC LIMIT 15   -- internt: undersökningen, rummets höjningsminne
  `;
  const [n] = await db`SELECT COUNT(*)::int AS n, MAX(changed_at) AS senast FROM supplier_price_history   -- internt: undersökningen`;
  console.log(`\n── U6 · supplier_price_history ──  rader: ${n.n} · senaste ändring: ${dag(n.senast)}`);
  for (const r of rows) console.log(`    ${dag(r.changed_at)} · ${String(r.supplier).slice(0, 18).padEnd(18)} · ${String(r.product).slice(0, 30).padEnd(30)} · ${r.old_price_monthly} → ${r.new_price_monthly} · ${r.changed_by}`);
});

console.log('\n[probe-undersokning] klar\n');
