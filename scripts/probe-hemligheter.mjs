#!/usr/bin/env node
// scripts/probe-hemligheter.mjs — FINNS GITHUB-HEMLIGHETERNA, OCH FUNGERAR KV-NYCKELN? (2026-09-23)
//
// Skriver ALDRIG ett värde — bara om variabeln är satt, och för KV ett faktiskt anrop.
// Varför ett anrop och inte bara närvaro: en satt men felaktig token ser ut som en fungerande
// konfiguration tills första skrivning tyst misslyckas (samma form som markPending 23 sep 10:32,
// där «ingen KV» gav en köflagga som aldrig sattes).
//
// FÅNGAR: osatt hemlighet, och en KV-nyckel som finns men inte svarar.
// BLIND: CRON_SECRET:s VÄRDE prövas inte här — det bevisas av kor-drainen.yml (200 mot 401).
//   Läsbehörighet bevisar inte skrivbehörighet: en read-only-token svarar på GET men vägrar SET.
//   Därför prövas båda, mot en egen nyckel med 60 s TTL som ingen produktionskod läser.
import { getKv } from '../lib/kv.js';

const satt = (n) => (typeof process.env[n] === 'string' && process.env[n].trim() !== '' ? 'SATT' : 'SAKNAS');
for (const n of ['DATABASE_URL', 'CRON_SECRET', 'KV_REST_API_URL', 'KV_REST_API_TOKEN']) console.log(`  ${n.padEnd(18)} ${satt(n)}`);

const kv = getKv();
if (!kv) { console.log('\nKV: ingen klient (en eller båda variablerna saknas) — köflaggan kan inte sättas från Actions.'); process.exit(0); }
const nyckel = 'sond:hemligheter:ping';
try {
  await kv.set(nyckel, 'ok', { ex: 60 });
  const tillbaka = await kv.get(nyckel);
  // Motprov: en nyckel som aldrig skrivits ska ge null — annars kan GET inte skilja på något.
  const aldrig = await kv.get('sond:hemligheter:finns-aldrig');
  console.log(`\nKV: skrev och läste tillbaka «${tillbaka}» · motprov (oskriven nyckel): ${aldrig === null ? 'null ✓' : JSON.stringify(aldrig)}`);
  console.log(tillbaka === 'ok' && aldrig === null ? '✓ KV-nyckeln fungerar för både läsning och skrivning.' : '✗ KV svarade men inte som väntat.');
} catch (e) {
  console.log(`\n✗ KV finns men anropet föll: ${String(e.message).slice(0, 120)}`);
  process.exit(1);
}
