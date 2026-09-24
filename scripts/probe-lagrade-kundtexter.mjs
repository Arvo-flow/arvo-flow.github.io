#!/usr/bin/env node
// scripts/probe-lagrade-kundtexter.mjs — SKRIVSKYDDAD MÄTNING (registergranskningen 2026-09-24).
//
// Frågan: når en mening kunden, fast koden som skrev den är rättad? Kundmeningsregistret prövar KOD.
// Två ytor serverar TEXT UR DATABASEN, skriven av kod som gällde då raden skrevs:
//   K1 · /briefing/:token serverar briefing_reports.insights ORÖRT (api/briefing.mjs).
//   K2 · rummet serverar invoice_analyses.lead_finding_json efter refineFinding (api/invoice-history.mjs).
// Varje sträng skannas mot registrets egna former: LOFTEN_UTAN_MEKANISM, PROVENIENS_OCH_ENHET och
// KOHORTPASTAENDE. Loggen är publik: antal och skäl, aldrig en adress, ett belopp eller en text.
//
// MOTPROV: instrumentet måste fälla en känd dålig mening innan dess nollor räknas (M0). Kastar en fråga
// skrivs «KUNDE INTE LÄSAS», aldrig 0. Utan databas: exit 1.

import { getDb } from '../lib/db.js';
import { granskaLagradText } from '../lib/kundmeningar.js';
import { refineFinding } from '../lib/forensics.js';

// En sanning: samma granskning som /briefing gör vid läsning.
const skal = (v) => granskaLagradText(v).skal;

// M0 — motprovet: en mening vi vet är förbjuden MÅSTE fällas, annars mäter nollorna ingenting.
const kand = skal({ action: { label: 'Se Arvos förberedda motdrag' }, text: '12 bolag i er bransch' });
console.log(`\n── M0 · motprov ──  känd dålig insikt fälls på ${kand.length} skäl${kand.length >= 2 ? ' ✓' : ' ✗ INSTRUMENTET SER INGET'}`);
if (kand.length < 2) process.exit(1);

const db = getDb();
if (!db) { console.error('✗ INGEN DATABAS — sonden kom inte fram. Detta är INTE ett mätvärde.'); process.exit(1); }
const fraga = async (namn, fn) => { try { await fn(); } catch (e) { console.log(`\n── ${namn} ── KUNDE INTE LÄSAS: ${String(e.message).slice(0, 120)}`); process.exitCode = 1; } };

await fraga('K1 · briefing_reports', async () => {
  const rader = await db`
    SELECT br.period, br.insights,
           (mt.expires_at > NOW() AND br.expires_at > NOW()) AS natbar
    FROM briefing_reports br LEFT JOIN magic_tokens mt ON mt.id = br.token_id
  `;
  // Per insikt, som /briefing granskar: en rad räknas om minst en av dess insikter fälls.
  const traff = rader.map((r) => ({ ...r, s: [...new Set((Array.isArray(r.insights) ? r.insights : []).flatMap(skal))] })).filter((r) => r.s.length);
  console.log(`\n── K1 · briefing_reports ──  rader ${rader.length} · nåbara nu ${rader.filter((r) => r.natbar).length} · med förbjuden form ${traff.length} · varav nåbara ${traff.filter((r) => r.natbar).length}`);
  for (const r of traff) console.log(`    ${r.period} · ${r.natbar ? 'NÅBAR' : 'utgången'} · ${r.s.join(' | ')}`);
});

await fraga('K2 · lead_finding_json (efter refineFinding, som rummet serverar)', async () => {
  const rader = await db`
    SELECT normalized_supplier, supplier, billing_period, line_items_json, lead_finding_json
    FROM invoice_analyses   -- internt: sonden mäter vad rummet serverar ur lagrade fynd
    WHERE lead_finding_json IS NOT NULL AND arkiverad_at IS NULL
  `;
  const perSkal = {};
  let traffar = 0;
  for (const a of rader) {
    const f = refineFinding(a.lead_finding_json, { supplier: a.normalized_supplier || a.supplier || null,
      billingPeriod: a.billing_period, lineItems: a.line_items_json });
    const s = skal(f);
    if (s.length) traffar++;
    for (const x of s) perSkal[x] = (perSkal[x] ?? 0) + 1;
  }
  console.log(`\n── K2 · lagrade fynd i rummet ──  rader ${rader.length} · med förbjuden form ${traffar}`);
  for (const [k, n] of Object.entries(perSkal)) console.log(`    ${n} × ${k}`);
});

await fraga('K3 · kohortkortets räckvidd', async () => {
  // Rummets kohortkort (getMarketIntelligence) jämför kundens TOTALSUMMA med andras totalsummor.
  // Hur många leverantör×kategori-celler når i dag tröskeln (≥3 skilda avsändare, spridning)? Samma
  // villkor som lib/price-alert.js; testidentiteter räknas inte (arTestidentitet i JS, inte i SQL).
  const { arTestidentitet } = await import('../lib/test-surface.js');
  const rader = await db`
    SELECT normalized_supplier, category, COALESCE(NULLIF(user_email, ''), fingerprint) AS kund, user_email, annual_cost, created_at
    FROM invoice_analyses   -- internt: sonden mäter kohortkortets räckvidd
    WHERE route = 'auto' AND annual_cost > 500 AND annual_cost < 5000000 AND normalized_supplier IS NOT NULL
  `;
  const celler = new Map();
  for (const r of rader) {
    if (arTestidentitet(r.user_email)) continue;
    const k = `${r.normalized_supplier}|${r.category}`;
    const c = celler.get(k) ?? new Map();
    const fore = c.get(r.kund);
    if (!fore || new Date(r.created_at) > new Date(fore.created_at)) c.set(r.kund, r);
    celler.set(k, c);
  }
  const bar = [...celler.entries()].filter(([, c]) => {
    const v = [...c.values()].map((x) => Number(x.annual_cost));
    return v.length >= 3 && Math.max(...v) > Math.min(...v);
  });
  console.log(`\n── K3 · kohortkortet ──  celler ${celler.size} · når tröskeln ${bar.length}${bar.length ? ` (${bar.map(([k, c]) => `${k.split('|')[1]}: ${c.size} avsändare`).join(', ')})` : ''}`);
});

console.log('\n[probe-lagrade-kundtexter] klar\n');
