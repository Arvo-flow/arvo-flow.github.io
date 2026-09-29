#!/usr/bin/env node
// scripts/probe-rumsintag.mjs — VAD HÄNDE MED FAKTUROR SOM SKICKATS TILL EN RUMSADRESS? (2026-09-29)
//
// Läser, skriver ingenting. Adressnyckeln ger skrivrätt till ett rum och får därför aldrig stå i en publik
// logg — sonden tar bara sha256-värden:
//   NYCKEL_SHA = sha256(<nyckel>)            → raden i inkorgsadresser
//   FP_SHA     = sha256('adress:' + <nyckel>) → köns jobb (fingerprint lagras rått där) och, avkortat till
//                32 tecken, analysernas fingerprint (lib/invoice-store.js hashar före lagring)
// Motprov: en slumpad hash ger 0 i varje led — annars kan instrumentet inte svara nej.

import { neon } from '@neondatabase/serverless';
import { randomBytes } from 'node:crypto';

const url = process.env.DATABASE_URL;
const NYCKEL_SHA = String(process.env.NYCKEL_SHA || '').toLowerCase();
const FP_SHA = String(process.env.FP_SHA || '').toLowerCase();
if (!url) { console.error('✗ DATABASE_URL saknas — sonden kom inte fram. INTE ett mätvärde.'); process.exit(1); }
if (!/^[0-9a-f]{64}$/.test(NYCKEL_SHA) || !/^[0-9a-f]{64}$/.test(FP_SHA)) { console.error('✗ NYCKEL_SHA och FP_SHA måste vara sha256-hex.'); process.exit(1); }
const sql = neon(url);
const hex = (col) => `encode(sha256(convert_to(${col}, 'UTF8')), 'hex')`;

async function mat(nyckelSha, fpSha) {
  const adr = await sql(`SELECT (agare_epost IS NOT NULL) AS agd, (rum_hash IS NOT NULL) AS enhet, plattform,
      skapad_at, senast_mottagen_at, (gmail_kod IS NOT NULL) AS kod FROM inkorgsadresser WHERE ${hex('nyckel')} = $1`, [nyckelSha]);
  const jobb = await sql(`SELECT id, filename, status, attempts, left(coalesce(error, ''), 120) AS error,
      left(coalesce(outcome, ''), 140) AS outcome, (agare_epost IS NOT NULL) AS agd, created_at, done_at
      FROM ingest_jobs WHERE fingerprint IS NOT NULL AND ${hex('fingerprint')} = $1 ORDER BY created_at`, [fpSha]);
  const analyser = await sql(`SELECT id, supplier, category, route, triage_reason, (user_email IS NOT NULL) AS agd,
      created_at, analyserad_sha FROM invoice_analyses WHERE fingerprint = $1 ORDER BY created_at`, [fpSha.slice(0, 32)]);
  return { adr, jobb, analyser };
}

const m = await mat(NYCKEL_SHA, FP_SHA);
const slump = () => randomBytes(32).toString('hex');
const mp = await mat(slump(), slump());

console.log('\n── adressen ──');
if (!m.adr.length) console.log('  ingen rad i inkorgsadresser med den nyckeln');
for (const a of m.adr) console.log(`  ägd=${a.agd} · enhetshash=${a.enhet} · plattform=${a.plattform} · skapad ${a.skapad_at?.toISOString?.() ?? a.skapad_at} · senast mottagen ${a.senast_mottagen_at?.toISOString?.() ?? a.senast_mottagen_at ?? '—'} · gmail-kod=${a.kod}`);

console.log(`\n── köns jobb (${m.jobb.length}) ──`);
const perStatus = {};
for (const j of m.jobb) {
  perStatus[j.status] = (perStatus[j.status] ?? 0) + 1;
  console.log(`  #${j.id} ${String(j.filename).padEnd(40)} ${j.status.padEnd(10)} försök=${j.attempts} ägd=${j.agd} ${j.outcome || ''}${j.error ? ` FEL: ${j.error}` : ''}`);
}
console.log(`  per status: ${JSON.stringify(perStatus)}`);

console.log(`\n── lagrade analyser (${m.analyser.length}) ──`);
for (const a of m.analyser) console.log(`  ${String(a.id).slice(0, 8)} ${String(a.supplier ?? '—').padEnd(34)} ${String(a.category ?? '—').padEnd(20)} ${String(a.route).padEnd(13)} ${a.triage_reason ?? ''} ägd=${a.agd} sha=${a.analyserad_sha ?? '—'}`);

console.log(`\n── motprov (slumpad hash) ── adress ${mp.adr.length} · jobb ${mp.jobb.length} · analyser ${mp.analyser.length}`);
if (mp.adr.length || mp.jobb.length || mp.analyser.length) { console.error('✗ motprovet gav träffar — instrumentet kan inte svara nej. INTE ett mätvärde.'); process.exit(1); }
console.log('\n[probe-rumsintag] klar\n');
