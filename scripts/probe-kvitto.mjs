#!/usr/bin/env node
// scripts/probe-kvitto.mjs — GICK SVARET/KVITTOT TILL EN RUMSADRESS ÄGARE UT, OCH LEVERERADES DET? (2026-09-29)
//
// Läser Resends lista över SKICKADE mejl i ett tidsfönster och jämför mottagaren med adressens ägare —
// allt som sha256, ingen e-postadress i loggen. Indata: NYCKEL_SHA (sha256 av adressnyckeln), FRAN/TILL (ISO).
// Motprov: sonden skriver ut ALLA skickade mejl i fönstret (som hash + ämne), så «0 till ägaren» syns bredvid
// vad som faktiskt skickades — ett tomt fönster är ett annat svar än ett fönster utan ägarens mejl.

import { neon } from '@neondatabase/serverless';
import { createHash } from 'node:crypto';

const key = process.env.RESEND_API_KEY;
const url = process.env.DATABASE_URL;
const NYCKEL_SHA = String(process.env.NYCKEL_SHA || '').toLowerCase();
const FRAN = new Date(process.env.FRAN || '');
const TILL = new Date(process.env.TILL || '');
if (!key || !url) { console.error('✗ RESEND_API_KEY eller DATABASE_URL saknas — INTE ett mätvärde.'); process.exit(1); }
if (!/^[0-9a-f]{64}$/.test(NYCKEL_SHA) || isNaN(FRAN) || isNaN(TILL)) { console.error('✗ NYCKEL_SHA/FRAN/TILL ogiltiga.'); process.exit(1); }
const sha = (s) => createHash('sha256').update(String(s).trim().toLowerCase()).digest('hex');
const sql = neon(url);

const [adr] = await sql(`SELECT agare_epost FROM inkorgsadresser WHERE encode(sha256(convert_to(nyckel, 'UTF8')), 'hex') = $1`, [NYCKEL_SHA]);
if (!adr) { console.error('✗ adressen finns inte'); process.exit(1); }
const agareSha = adr.agare_epost ? sha(adr.agare_epost) : null;
console.log(`ägare: ${agareSha ? agareSha.slice(0, 12) : '(ingen)'}`);

// Paginera bakåt tills vi passerat fönstrets början.
const i = [];
let efter = null, sidor = 0, status = null;
while (sidor < 40) {
  const r = await fetch(`https://api.resend.com/emails?limit=100${efter ? `&after=${efter}` : ''}`, { headers: { Authorization: `Bearer ${key}` } });
  status = r.status;
  if (r.status !== 200) break;
  const j = await r.json();
  const rader = Array.isArray(j?.data) ? j.data : [];
  sidor++;
  i.push(...rader);
  if (!rader.length || !j.has_more || new Date(rader.at(-1).created_at) < FRAN) break;
  efter = rader.at(-1).id;
}
console.log(`Resend: HTTP ${status} · ${sidor} sidor · ${i.length} mejl lästa · äldsta ${i.at(-1)?.created_at ?? '—'}`);
if (status !== 200 || !i.length) { console.error('✗ listan gick inte att läsa — INTE ett mätvärde.'); process.exit(1); }
if (new Date(i.at(-1).created_at) > FRAN) console.log('⚠ listan når inte fönstrets början — utfallet nedan är ofullständigt');

const fonster = i.filter((e) => { const t = new Date(e.created_at); return t >= FRAN && t <= TILL; });
console.log(`\n── skickade ${FRAN.toISOString()} – ${TILL.toISOString()} (${fonster.length}) ──`);
for (const e of fonster.reverse()) {
  const till = [e.to].flat().map((x) => sha(x?.email ?? x));
  const agaren = agareSha && till.includes(agareSha);
  console.log(`  ${e.created_at}  ${agaren ? 'ÄGAREN ' : till.map((h) => h.slice(0, 8)).join(',').padEnd(7)}  ${String(e.last_event ?? '—').padEnd(10)}  ${e.subject}`);
}
const tillAgaren = fonster.filter((e) => agareSha && [e.to].flat().map((x) => sha(x?.email ?? x)).includes(agareSha));
console.log(`\ntill ägaren: ${tillAgaren.length} · status: ${JSON.stringify(tillAgaren.map((e) => e.last_event))}`);
console.log('\n[probe-kvitto] klar\n');
