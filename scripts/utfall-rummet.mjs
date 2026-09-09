// scripts/utfall-rummet.mjs — VAD HÄNDE MED DE INSKICKADE FAKTURORNA? (läs-bar, inga skrivningar)
//
// ══ VARFÖR (2026-09-09) ════════════════════════════════════════════════════════════════════
// Grundaren skickar in 25 fakturor via mejl i skarpa miljön, i ett rum som just tömts. Frågan
// «hur gick det?» har TVÅ halvor, och bara den ena är intressant om den andra inte stämmer:
//
//   1. AVSTÄMNINGEN — kom alla fram? `ingest_jobs` säger hur många som TOGS EMOT, tabellen
//      `invoice_analyses` hur många som fick ett BESLUT. Glappet mellan dem är hela historien.
//      Bokföringsplikten (14 aug, Ellevio): ett beslut vi inte bokför har vi inte fattat — och
//      för kunden är ett obokfört beslut omöjligt att skilja från ett tapp. Ett `done`-jobb utan
//      analys är därför det allvarligaste utfallet den här sonden kan hitta.
//   2. KVALITETEN — vad SA vi om var och en? Kategori, väg, golv, besparing.
//
// Sonden mäter också, för första gången i skarp drift, den mekanik som byggdes i dag:
// kolumnläsaren (`antalKalla` per radpost i `line_items_json`) och antalsdoktrinen. Ett grönt
// test bevisar att mekanismen svarar; det här är första gången den MATAS av verkliga fakturor.
//
// LÄSER BARA. Ingen DELETE, ingen UPDATE, ingen INSERT.
//
// Adressen står aldrig i repot — sonden bär en sha256-summa och maskerar adressen i utskriften.
// Leverantör, kategori och belopp SKRIVS UT: det är vad «analysera utfallet» kräver, det är
// grundarens egna testfakturor, och det följer samma praxis som `scripts/inspect-analyses.mjs`.

import { getDb } from '../lib/db.js';
import { createHash } from 'node:crypto';

const ADRESS_SUMMA = '0f1f6d64c551221024f5b073d25e767355ad8d99cbce3095dafb49f8cdb2e3f8';

const sha = (s) => createHash('sha256').update(String(s)).digest('hex');
const mask = (e) => {
  const [l, d = ''] = String(e).split('@');
  const p = d.split('.');
  return `${l.slice(0, 1)}***@${(p[0] ?? '').slice(0, 1)}***.${p.slice(1).join('.')}`;
};
const kr = (n) => (n == null ? '—' : Number(n).toLocaleString('sv-SE'));

const db = getDb();
if (!db) { console.error('✗ Ingen databas — sonden mäter ingenting utan DATABASE_URL.'); process.exit(1); }

const adresser = await db`SELECT DISTINCT user_email FROM invoice_analyses WHERE user_email IS NOT NULL`;
const traff = adresser.map((r) => r.user_email).filter((e) => sha(e) === ADRESS_SUMMA);

// ── JOBBEN: hur många TOGS EMOT? ───────────────────────────────────────────────────────────
// Frågas oberoende av om någon analys finns — annars kan sonden inte skilja «inget inskickat»
// från «inskickat men allt tappat», och de två kräver rakt motsatta åtgärder.
let jobb = [];
try {
  jobb = await db`
    SELECT status, COUNT(*)::int AS n, MIN(created_at) AS forsta, MAX(created_at) AS senaste
    FROM ingest_jobs GROUP BY status ORDER BY n DESC`;
} catch { console.log('(ingest_jobs saknas i den här miljön)'); }

console.log('\n═══ UTFALL — INSKICKADE FAKTUROR ═══\n');
const totJobb = jobb.reduce((s, r) => s + r.n, 0);
console.log(`── INGEST-JOBB (alla avsändare): ${totJobb} ──`);
for (const r of jobb) {
  console.log(`  ${String(r.n).padStart(3)} × ${String(r.status).padEnd(10)} `
    + `${new Date(r.forsta).toISOString().slice(11, 19)} → ${new Date(r.senaste).toISOString().slice(11, 19)} UTC`);
}

if (traff.length !== 1) {
  console.log(`\n── RUMMET: 0 analyser ──`);
  console.log(traff.length === 0
    ? '  Adressen finns inte i invoice_analyses. Antingen har inget kommit fram ännu, eller så\n'
      + '  har ingen faktura fått ett beslut. Jobbstatusen ovan avgör vilket av de två det är.'
    : `  ✗ ${traff.length} adresser matchar samma summa — matchningen är trasig, läs inte vidare.`);
  process.exit(0);
}
const EPOST = traff[0];

// ── ANALYSERNA: hur många fick ett BESLUT? ────────────────────────────────────────────────
const rader = await db`
  SELECT created_at, supplier, normalized_supplier, category, route, triage_reason,
         annual_cost, suggested_annual_cost, gross_saving, net_saving, should_switch,
         seat_count, price_per_seat_monthly, health_score, invoice_number, line_items_json
  FROM invoice_analyses WHERE user_email = ${EPOST} ORDER BY created_at ASC`;

console.log(`\n── RUMMET (${mask(EPOST)}): ${rader.length} analyser ──\n`);
console.log('  #  tid      kategori              väg           årskostnad    besparing  antal  score');
rader.forEach((r, i) => {
  console.log(`  ${String(i + 1).padStart(2)} ${new Date(r.created_at).toISOString().slice(11, 16)} `
    + `${String(r.category ?? '—').padEnd(21)} ${String(r.route ?? '—').padEnd(13)} `
    + `${kr(r.annual_cost).padStart(11)}  ${kr(r.gross_saving).padStart(9)}  `
    + `${String(r.seat_count ?? '—').padStart(5)}  ${String(r.health_score ?? '—').padStart(4)}`
    + `   ${String(r.normalized_supplier ?? r.supplier ?? '').slice(0, 26)}`);
});

// ── AVSTÄMNINGEN: glappet ÄR historien ────────────────────────────────────────────────────
const klara = jobb.find((r) => r.status === 'done')?.n ?? 0;
const misslyckade = jobb.filter((r) => r.status !== 'done').reduce((s, r) => s + r.n, 0);
console.log(`\n── AVSTÄMNING ──`);
console.log(`  jobb 'done': ${klara}   ·   jobb i annat tillstånd: ${misslyckade}   ·   analyser: ${rader.length}`);
if (klara > rader.length) {
  console.log(`  ⚠ ${klara - rader.length} jobb är 'done' UTAN att ha lämnat en analys. Ett beslut vi`);
  console.log('    inte bokför har vi inte fattat — och för kunden är det omöjligt att skilja från');
  console.log('    ett tapp (bokföringsplikten, 14 aug). Det här är sondens allvarligaste utfall.');
} else if (klara === rader.length && klara > 0) {
  console.log('  ✓ Varje avklarat jobb har lämnat en analys — inget föll mellan stolarna.');
}

// ── VÄGARNA: en tystnad utan skäl är en tystnad vi inte kan förbättra ─────────────────────
const vagar = {};
for (const r of rader) {
  const nyckel = `${r.route ?? '—'}${r.triage_reason ? ` (${r.triage_reason})` : ''}`;
  vagar[nyckel] = (vagar[nyckel] ?? 0) + 1;
}
console.log(`\n── VÄGAR ──`);
for (const [v, n] of Object.entries(vagar).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(3)} × ${v}`);
}

// ── PRISSATTA MOT MOTTAGNA: rummets egen räknare, mätt här ────────────────────────────────
const prissatta = rader.filter((r) => Number(r.suggested_annual_cost) > 0).length;
const utanGolv = rader.filter((r) => r.route === 'auto' && !(Number(r.suggested_annual_cost) > 0)).length;
console.log(`\n── PRISSÄTTNING ──`);
console.log(`  prissatta (bär ett bytesmål): ${prissatta}`);
console.log(`  auto-rader UTAN bytesmål:     ${utanGolv}   ← visas som «Mottagen» i rummet`);
console.log(`  byte föreslaget:              ${rader.filter((r) => r.should_switch).length}`);

// ── KOLUMNLÄSAREN I SKARP DRIFT — första mätningen ────────────────────────────────────────
// Testerna bevisar att mekanismen svarar. Det här är första gången den matas av riktiga
// fakturor, och utfallsfördelningen är det tal antalsdoktrinen vilar på i verkligheten.
const utfall = {};
let radposter = 0, medAntal = 0;
for (const r of rader) {
  let li = r.line_items_json;
  if (typeof li === 'string') { try { li = JSON.parse(li); } catch { li = null; } }
  for (const l of li ?? []) {
    radposter += 1;
    if (l?.quantity != null) medAntal += 1;
    const u = l?.antalKalla ?? '(ej körd)';
    utfall[u] = (utfall[u] ?? 0) + 1;
  }
}
console.log(`\n── KOLUMNLÄSAREN (första skarpa mätningen) ──`);
console.log(`  radposter totalt: ${radposter}   ·   varav med ett antal: ${medAntal}`);
for (const [u, n] of Object.entries(utfall).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)} × ${u}`);
}
if (utfall['(ej körd)'] === radposter && radposter > 0) {
  console.log('  ⚠ INGEN radpost bär `antalKalla`. Antingen är svaren cachade från före v26, eller');
  console.log('    så når korrigeringen inte lagringen — och då är dagens arbete mörkt i produktion,');
  console.log('    precis som attribueringslåset var i två månader (12 aug).');
}
// ── VARFÖR TYSTNADE VAR OCH EN? Det är den enda fråga som betyder något ────────────────────
// «1 av 25 prissatta» är ett tal utan sina fall — och ett aggregat utan sina fall är ett tal som
// ser ut som ett beslutsunderlag (grindmätningen 22 aug). Varje rad får därför en NAMNGIVEN
// orsak, och orsakerna kräver rakt olika åtgärder:
//   · revisionsgrinden  — kategorin är medvetet tyst (inget verifierat SEK-golv finns)
//   · kategorisering    — vi kände inte igen leverantören alls; allt nedströms är då dömt
//   · Ring 1            — vår egen avstämning fällde fakturan
//   · utanför scope     — korrekt tystnad (resa, hotell, nätavgift)
//   · inget golv        — kategorin talar, men vi hittade inget att jämföra mot
const { REVIDERADE_KATEGORIER } = await import('../lib/revision-gate.js');
const orsak = (r) => {
  if (r.route === 'unsupported') return `utanför scope (${r.triage_reason ?? '—'})`;
  if (String(r.triage_reason ?? '').startsWith('Ring1')) return 'Ring 1 — VÅR avstämning fällde den';
  if (r.category === 'uncategorized') return 'KATEGORISERING misslyckades';
  if (!REVIDERADE_KATEGORIER.has(r.category)) return `revisionsgrinden tystar «${r.category}»`;
  if (!(Number(r.suggested_annual_cost) > 0)) return `inget golv i «${r.category}»`;
  return 'prissatt';
};
const orsaker = {};
for (const r of rader) { const o = orsak(r); orsaker[o] = (orsaker[o] ?? 0) + 1; }
console.log('\n── VARFÖR INGEN PRISSÄTTNING? (per orsak) ──');
for (const [o, n] of Object.entries(orsaker).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(3)} × ${o}`);
}
console.log('\n── PER FAKTURA ──');
rader.forEach((r, i) => {
  console.log(`  ${String(i + 1).padStart(2)} ${String(r.normalized_supplier ?? r.supplier ?? '').slice(0, 28).padEnd(29)}`
    + `${String(r.category ?? '—').padEnd(20)} ${orsak(r)}`);
});

// ── FAKTURANUMRET ÄR PROXY FÖR TEXTLAGRET ─────────────────────────────────────────────────
// Numret bekräftas mot pdfjs textlager. Saknas det på ALLA rader har textlagret fallit — och då
// är det samma orsak som att kolumnläsaren inte körde, inte två separata fel.
const medNummer = rader.filter((r) => r.invoice_number).length;
console.log(`\n── TEXTLAGRET (proxy: fakturanummer) ──`);
console.log(`  ${medNummer} av ${rader.length} bär ett bekräftat fakturanummer`);
if (medNummer === 0 && rader.length > 0) {
  console.log('  ⚠ INGEN bär ett nummer. Textlagret har fallit på varje faktura — samma orsak som');
  console.log('    att kolumnläsaren inte körde. EN diagnos, inte två.');
} else if (medNummer > 0) {
  console.log('  → Textlagret FUNGERAR. Att antalKalla saknas har alltså en annan orsak:');
  console.log('    koden var inte deployad när fakturorna kördes.');
}
console.log('');
