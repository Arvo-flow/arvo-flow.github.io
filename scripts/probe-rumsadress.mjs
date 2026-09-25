#!/usr/bin/env node
// scripts/probe-rumsadress.mjs — LANDAR EN FAKTURA TILL faktura+<nyckel>@ I RÄTT RUM? (2026-09-25)
//
// Live-sond för rummets egen adress (lib/inkorgsadress.js), end-to-end i produktion:
//   1. En adressrad skapas med ägaren TEST_EMAIL (testidentiteten — når aldrig prisboken eller fyndgradens mätbas).
//   2. En repo-PDF skickas från vår egen avsändare till adressen (K = känd nyckel).
//   3. MOTPROV: samma PDF till en slumpad nyckel som INTE finns (O = okänd).
//   4. Sonden läser invoice_analyses på det hashade fingeravtrycket adress:<nyckel> (samma hash som lib/invoice-store).
// Utfall som räknas:
//   K1 · en rad under adress:<K> (instrumentet kan svara JA)
//   K2 · raden bär ägarens e-post, inte avsändarens
//   K3 · ingen ny rad under avsändarens mail:<sha16> i fönstret (avsändaren är inte identiteten)
//   K4 · adressens senast_mottagen_at är satt
//   O1 · ingen rad under adress:<O> (en okänd nyckel analyseras aldrig)
//   S1 · Resends skickade-lista: svaret gick till ägaren (läses om API:t ger listan; annars «ej mätt»)
// Adressraderna tas bort efteråt; analysraden står kvar under testidentiteten.

import { Resend } from 'resend';
import { neon } from '@neondatabase/serverless';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { nyAdressnyckel, adressFor, adressFingeravtryck } from '../lib/inkorgsadress.js';
import { TEST_EMAIL } from '../lib/test-surface.js';

const key = process.env.RESEND_API_KEY;
const dbUrl = process.env.DATABASE_URL;
const FROM = process.env.RESEND_FROM || 'Arvo Flow <analys@arvoflow.se>';
if (!key || !dbUrl) { console.error('✗ RESEND_API_KEY eller DATABASE_URL saknas — sonden kom inte fram. INTE ett mätvärde.'); process.exit(1); }
const resend = new Resend(key);
const sql = neon(dbUrl);
const hashFp = (fp) => createHash('sha256').update(fp).digest('hex').slice(0, 32);
const sha16 = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);
const avsandare = (FROM.match(/<([^>]+)>/)?.[1] ?? FROM).toLowerCase();

const K = nyAdressnyckel();
const O = nyAdressnyckel();
const PDF = 'test-pdfs/atlassian-cloud-manad.pdf';
const t0 = new Date();
console.log(`\n── sond rumsadress · start ${t0.toISOString()} ──`);

await sql`INSERT INTO inkorgsadresser (nyckel, rum_hash, agare_epost, plattform) VALUES (${K}, NULL, ${TEST_EMAIL}, 'annan')`;
const fpK = hashFp(adressFingeravtryck(K));
const fpO = hashFp(adressFingeravtryck(O));
const fpAvs = hashFp(`mail:${sha16(avsandare)}`);

const bilaga = { filename: 'atlassian-cloud-manad.pdf', content: readFileSync(PDF).toString('base64') };
const skickat = {};
for (const [namn, nyckel] of [['K', K], ['O', O]]) {
  const { data, error } = await resend.emails.send({ from: FROM, to: adressFor(nyckel),
    subject: `Arvo-sond rumsadress ${namn}`, text: 'Mätning av rummets egen adress.', attachments: [bilaga] });
  skickat[namn] = !error;
  console.log(`  skickat ${namn} → ${error ? `FEL: ${error.message}` : `ok (${data?.id})`}`);
}
if (!skickat.K) { console.error('✗ K skickades inte — INTE ett mätvärde.'); process.exit(1); }

let radK = null;
for (let i = 0; i < 24 && !radK; i++) {
  await new Promise((r) => setTimeout(r, 10_000));
  [radK] = await sql`SELECT id, user_email, supplier, route, created_at FROM invoice_analyses
                     WHERE fingerprint = ${fpK} ORDER BY created_at DESC LIMIT 1`;
}
// Ge O samma chans att (felaktigt) landa: vänta minst 60 s efter K.
await new Promise((r) => setTimeout(r, 60_000));
const [radO] = await sql`SELECT id FROM invoice_analyses WHERE fingerprint = ${fpO} LIMIT 1`;
const [{ n: nAvs }] = await sql`SELECT COUNT(*)::int AS n FROM invoice_analyses WHERE fingerprint = ${fpAvs} AND created_at >= ${t0.toISOString()}`;
const [adr] = await sql`SELECT senast_mottagen_at FROM inkorgsadresser WHERE nyckel = ${K}`;

let s1 = 'ej mätt';
try {
  const r = await fetch('https://api.resend.com/emails?limit=100', { headers: { Authorization: `Bearer ${key}` } });
  const j = await r.json().catch(() => null); // sondvakt-ok: null ger «ej mätt», aldrig ett tomt fynd
  const rader = Array.isArray(j?.data) ? j.data : null;
  if (r.status === 200 && rader) {
    const efter = rader.filter((e) => new Date(e.created_at) >= t0);
    const tillAgare = efter.filter((e) => [e.to].flat().map((x) => String(x).toLowerCase()).includes(TEST_EMAIL));
    const tillAvs = efter.filter((e) => [e.to].flat().map((x) => String(x).toLowerCase()).includes(avsandare));
    s1 = `till ägaren ${tillAgare.length} (${tillAgare.map((e) => e.subject).join(' | ')}) · till avsändaren ${tillAvs.length} (${tillAvs.map((e) => e.subject).join(' | ')})`;
  } else s1 = `ej mätt (HTTP ${r.status})`;
} catch (e) { s1 = `ej mätt (${e.message})`; }

await sql`DELETE FROM inkorgsadresser WHERE nyckel IN (${K}, ${O})`;

const ok = (b) => (b ? '✓' : '✗');
console.log('\n── utfall ──');
console.log(`  K1 ${ok(!!radK)} rad under adress:<K>            ${radK ? `route=${radK.route} supplier=${radK.supplier}` : '(ingen inom 4 min)'}`);
console.log(`  K2 ${ok(radK?.user_email === TEST_EMAIL)} raden bär ägarens e-post        ${radK ? (radK.user_email === TEST_EMAIL ? 'ägaren' : radK.user_email === avsandare ? 'AVSÄNDAREN' : 'annan/ingen') : '—'}`);
console.log(`  K3 ${ok(nAvs === 0)} inga nya rader i avsändarens rum  ${nAvs}`);
console.log(`  K4 ${ok(!!adr?.senast_mottagen_at)} senast_mottagen_at satt          ${adr?.senast_mottagen_at ?? '—'}`);
console.log(`  O1 ${ok(!radO)} okänd nyckel gav ingen analys    ${radO ? 'RAD FINNS' : 'ingen rad'}`);
console.log(`  S1   svarsmejl: ${s1}`);
if (!radK) { console.error('\n✗ K landade inte — motprovet O1 säger då ingenting.'); process.exit(1); }
if (radK.user_email !== TEST_EMAIL || nAvs !== 0 || radO) process.exit(1);
console.log('\n[probe-rumsadress] klar\n');
