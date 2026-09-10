// scripts/probe-motpart.mjs — KAN KORSNINGEN ÖVER HUVUD TAGET GÖRAS? (2026-09-10)
//
// probe-dubbletter korsar prisbokens rader mot `invoice_analyses` för att härleda dokumentidentitet.
// Utfallet «97 % ingen träff» får INTE läsas som ett påstående om prisboken förrän motparten är mätt:
// är analystabellen tömd är utfallet ett påstående om MOTPARTEN. Kort, kompakt, ingen tolkning.

import { getDb } from '../lib/db.js';

const db = getDb();
if (!db) { console.log('Ingen DATABASE_URL — sonden kom aldrig fram (INTE ett mätvärde).'); process.exit(1); }

const [a] = await db`
  SELECT COUNT(*)::int AS rader, COUNT(annual_cost)::int AS med_belopp,
         COUNT(DISTINCT pdf_hash)::int AS dokument,
         MIN(created_at) AS aldst, MAX(created_at) AS nyast
  FROM invoice_analyses`;
const [d] = await db`
  SELECT COUNT(*)::int AS rader, MIN(created_at) AS aldst, MAX(created_at) AS nyast
  FROM invoice_datapoints`;
const dag = (v) => (v ? new Date(v).toISOString().slice(0, 10) : '—');

console.log('\n═══════ MOTPARTENS TILLSTÅND ═══════');
console.log(`invoice_analyses:   ${a.rader} rader · ${a.med_belopp} med belopp · ${a.dokument} distinkta dokument · ${dag(a.aldst)} → ${dag(a.nyast)}`);
console.log(`invoice_datapoints: ${d.rader} rader · ${dag(d.aldst)} → ${dag(d.nyast)}`);

const [f] = await db`
  SELECT COUNT(*)::int AS n FROM invoice_datapoints
  WHERE created_at < (SELECT MIN(created_at) FROM invoice_analyses)`;
console.log(`datapunkter ÄLDRE än äldsta kvarvarande analysen: ${f.n}`);
console.log('  → dessa kan ALDRIG korsas mot ett dokument. Deras "ingen träff" är ett utfall om');
console.log('    motparten, aldrig ett bevis för att raden är ett eget dokument.');
