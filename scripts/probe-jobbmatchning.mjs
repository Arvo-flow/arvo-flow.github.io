#!/usr/bin/env node
// scripts/probe-jobbmatchning.mjs — ANALYSERADE JOBBET DEN BILAGA DET HETER?
//
// ══ VARFÖR (2026-09-23, ur omköningsförsöket av grundarens testbunt) ═══════════════════════
// `koa-om-alla` listade de 25 jobbens senaste utfall och de stämde inte med filnamnen:
// «Arvo_05_Atlassian.pdf → larm-bevakning», «Arvo_12_Securitas.pdf → saas-creative»,
// «Arvo_17_DHL.pdf → mobil», och «Arvo_04_GoogleWorkspace.pdf» bar SLACKS Ring1-tal. Hypotesen —
// OBEKRÄFTAD tills den här sonden kört — är att bulkdrainen analyserar FEL bilaga för jobbet.
// Stämmer den ska ingen omköning göras förrän mappningen är lagad: en omkörning genom en
// blandande kö blandar bara om samma fel.
//
// ══ MÄTNINGEN ══════════════════════════════════════════════════════════════════════════════
// Utfallet bär radens id (`lagrad#<uuid>`). Sonden slår upp den lagrade raden och ställer dess
// LEVERANTÖR (vad modellen läste ur PDF:en) mot jobbets FILNAMN (vad kunden skickade). Ingen
// tolkning av kategori — bara «nämner filnamnet samma leverantör som raden?».
//
// ══ MOTPROV (Noll-inferens, amendemang 1) ══════════════════════════════════════════════════
// Minst ett jobb med `lagrad#` måste hittas, annars kan sonden inte svara åt något håll. Och
// jämförelsen måste kunna svara JA: sonden redovisar både matchande och icke-matchande par —
// ett instrument som bara kan säga «fel» mäter ingenting.
//
// ══ UTTALAD BLINDFLÄCK ═════════════════════════════════════════════════════════════════════
// Jämförelsen är på NAMN (filnamnets leverantörsord mot radens leverantör). Ett filnamn som inte
// bär leverantörens namn kan inte prövas och redovisas som «ej prövbart». Jobb utan `lagrad#`
// (triagerade, out_of_scope) saknar rad-id och prövas därför bara om utfallet nämner leverantör.
//
// Loggen är PUBLIK: avsändaren anges som sha256 och skrivs maskerad; inga belopp skrivs.

import { createHash } from 'node:crypto';
import { getDb } from '../lib/db.js';

const arg = process.argv[2];
if (!/^sha256:[0-9a-f]{64}$/.test(arg ?? '')) {
  console.error('Användning: probe-jobbmatchning.mjs sha256:<hex av lower(trim(adress))>');
  process.exit(1);
}
const db = getDb();
if (!db) { console.error('✗ INGEN DATABAS — sonden kom inte fram. Detta är INTE ett mätvärde.'); process.exit(1); }

const mal = arg.slice(7);
const mask = (e) => { const [l, d] = String(e).split('@'); return d ? `${l.slice(0, 2)}***@${d}` : '(ingen)'; };
const avsandare = (await db`SELECT DISTINCT sender FROM ingest_jobs WHERE sender IS NOT NULL`).map((r) => r.sender);
const traffar = avsandare.filter((s) => createHash('sha256').update(String(s).trim().toLowerCase()).digest('hex') === mal);
if (traffar.length !== 1) { console.error(`✗ hashen matchade ${traffar.length} avsändare — kräver exakt en.`); process.exit(1); }
const sender = traffar[0];

const jobb = await db`
  SELECT id, attachment_index, filename, outcome
  FROM ingest_jobs WHERE sender = ${sender}
  ORDER BY attachment_index ASC
`;

// Filnamnets leverantörsord: «Arvo_05_Atlassian.pdf» → «atlassian». Siffror och prefix bort.
const ordUrFil = (f) => String(f ?? '').replace(/\.pdf$/i, '').split(/[_\-\s]+/)
  .filter((w) => w && !/^\d+$/.test(w) && !/^arvo$/i.test(w)).map((w) => w.toLowerCase());
const normalisera = (s) => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

console.log(`\n═══ JOBBMATCHNING · ${mask(sender)} · ${jobb.length} jobb ═══\n`);
console.log('  idx  filnamn                         → lagrad rads leverantör              dom');

let provbara = 0, stammer = 0, fel = 0;
for (const j of jobb) {
  const m = /lagrad#([0-9a-f-]{36})/.exec(j.outcome ?? '');
  let lev = null;
  if (m) {
    const rad = await db`SELECT normalized_supplier, supplier FROM invoice_analyses
                         WHERE id = ${m[1]}   -- internt: jobbmatchningssond, ingen kundyta
                         LIMIT 1`;
    lev = rad[0]?.normalized_supplier || rad[0]?.supplier || null;
  }
  const ord = ordUrFil(j.filename);
  let dom = 'ej prövbart (ingen lagrad rad)';
  if (lev) {
    provbara++;
    const levN = normalisera(lev);
    const trafar = ord.some((w) => w.length >= 3 && (levN.includes(normalisera(w)) || normalisera(w).includes(levN.split(' ')[0])));
    if (trafar) { stammer++; dom = '✓ samma'; } else { fel++; dom = '✗ ANNAN'; }
  }
  console.log(`  ${String(j.attachment_index).padStart(3)}  ${String(j.filename).padEnd(31)} → `
    + `${String(lev ?? '—').padEnd(34)} ${dom}`);
}

console.log(`\n  Prövbara (jobb med lagrad rad): ${provbara}`);
console.log(`  Filnamn och lagrad leverantör överens: ${stammer}`);
console.log(`  Filnamn och lagrad leverantör OENSE:   ${fel}`);
if (provbara === 0) {
  console.error('\n✗ MOTPROVET FÖLL: inget jobb bar ett rad-id — sonden kan inte svara åt något håll.');
  process.exit(1);
}
console.log(fel > 0
  ? `\n  ⚠️ ${fel} av ${provbara} prövbara jobb analyserade en ANNAN leverantörs faktura än filnamnet anger.`
  : '\n  ✓ Varje prövbart jobb analyserade den faktura det heter.');
console.log('\n[probe-jobbmatchning] klar\n');
