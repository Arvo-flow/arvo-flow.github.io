#!/usr/bin/env node
// scripts/probe-postvagar.mjs — NÅR DET SOM SKICKAS TILL ARVO EN MÄNNISKA? (2026-10-09)
//
// Läser, skriver ingenting. Tre frågor:
//   R · Resend: varje skickat mejl som Resend har kvar, per mottagarklass (vår egen domän / kund) och
//       status. Studsar listas med datum och ämnets TYP — e-postadresser i ämnen maskeras till sha256.
//   D · Databasen: vad som SPARATS av de flöden som larmar (offertförfrågningar, aktiveringar) — det som
//       finns här kan grundaren fortfarande följa upp, det som bara fanns i ett studsat mejl kan hen inte.
//   L · Läckkontrollen för `svarTill` (ac8942a): rader med BÅDE ägare och enhetshash. En sådan rad hade
//       visat ägarens e-post för den som bara har enhetens rumsnyckel.
// DNS mäts i workflowen med dig (sandlådans DNS och DoH är stängda), med gmail.com som motprov.

import { neon } from '@neondatabase/serverless';
import { createHash } from 'node:crypto';

const key = process.env.RESEND_API_KEY;
const url = process.env.DATABASE_URL;
if (!key || !url) { console.error('✗ RESEND_API_KEY eller DATABASE_URL saknas — INTE ett mätvärde.'); process.exit(1); }
const sha8 = (s) => createHash('sha256').update(String(s).trim().toLowerCase()).digest('hex').slice(0, 8);
const maskera = (t) => String(t ?? '').replace(/[^\s<>()"']+@[^\s<>()"']+/g, (m) => `<${sha8(m)}>`);
const klass = (adr) => {
  const a = String(adr?.email ?? adr).toLowerCase();
  if (a.endsWith('@inbox.arvoflow.se')) return 'inbox.arvoflow.se';
  if (a.endsWith('@arvoflow.se')) return `arvoflow.se:${a.split('@')[0]}`;
  if (a.endsWith('.flow')) return 'arvo.flow';
  return 'extern';
};

// ── R · Resend ──
const alla = [];
let efter = null, status = null;
for (let s = 0; s < 50; s++) {
  const r = await fetch(`https://api.resend.com/emails?limit=100${efter ? `&after=${efter}` : ''}`, { headers: { Authorization: `Bearer ${key}` } });
  status = r.status;
  if (r.status !== 200) break;
  const j = await r.json();
  const rader = Array.isArray(j?.data) ? j.data : [];
  alla.push(...rader);
  if (!rader.length || !j.has_more) break;
  efter = rader.at(-1).id;
}
if (status !== 200 || !alla.length) { console.error(`✗ Resends lista gick inte att läsa (HTTP ${status}) — INTE ett mätvärde.`); process.exit(1); }
console.log(`\n── R · Resend: ${alla.length} skickade mejl, ${alla.at(-1).created_at} – ${alla[0].created_at} ──`);
const tabell = {};
for (const e of alla) for (const t of [e.to].flat()) {
  const k = `${klass(t).padEnd(24)} ${String(e.last_event ?? '—')}`;
  tabell[k] = (tabell[k] ?? 0) + 1;
}
for (const [k, n] of Object.entries(tabell).sort()) console.log(`  ${k.padEnd(40)} ${n}`);
const typ = (amne) => (String(amne).match(/^\[[^\]]+\]/)?.[0] ?? maskera(amne).slice(0, 60));
const studsar = alla.filter((e) => ['bounced', 'complained'].includes(e.last_event));
console.log(`\n  studsade/klagade: ${studsar.length}`);
const perTyp = {};
for (const e of studsar) { const k = `${[e.to].flat().map(klass).join(',')} · ${typ(e.subject)}`; (perTyp[k] ??= []).push(String(e.created_at).slice(0, 10)); }
for (const [k, d] of Object.entries(perTyp).sort((a, b) => b[1].length - a[1].length)) console.log(`  ${String(d.length).padStart(3)}  ${k}   (${[...new Set(d)].sort().join(', ')})`);
const levereradeInternt = alla.filter((e) => [e.to].flat().some((t) => klass(t).startsWith('arvoflow.se:')) && e.last_event === 'delivered');
console.log(`\n  motprov: mejl till @arvoflow.se med status delivered: ${levereradeInternt.length}`);

// ── D · Databasen ──
const sql = neon(url);
const las = async (namn, fraga) => {
  try { const [r] = await sql(fraga); console.log(`  ${namn.padEnd(34)} ${JSON.stringify(r)}`); }
  catch (e) { console.log(`  ${namn.padEnd(34)} — ${e.message.slice(0, 80)}`); }
};
console.log('\n── D · det som sparats (kan följas upp) ──');
await las('quote_requests', 'SELECT COUNT(*)::int AS n, MIN(created_at) AS forsta, MAX(created_at) AS senaste FROM quote_requests');
await las('mandate_log', 'SELECT COUNT(*)::int AS n FROM mandate_log');
await las('activation_outcomes', 'SELECT COUNT(*)::int AS n FROM activation_outcomes');
await las('review_queue i invoice_analyses', "SELECT COUNT(*)::int AS n, MAX(created_at) AS senaste FROM invoice_analyses WHERE route = 'review_queue' AND arkiverad_at IS NULL");

// ── L · läckkontrollen ──
console.log('\n── L · adresser med både ägare och enhetshash (ska vara 0) ──');
await las('inkorgsadresser ägd+hash', 'SELECT COUNT(*)::int AS n FROM inkorgsadresser WHERE agare_epost IS NOT NULL AND rum_hash IS NOT NULL');
await las('inkorgsadresser totalt (motprov)', 'SELECT COUNT(*)::int AS n, COUNT(agare_epost)::int AS agda, COUNT(rum_hash)::int AS enhet FROM inkorgsadresser');
console.log('\n[probe-postvagar] klar\n');
