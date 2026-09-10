// scripts/probe-dubbletter.mjs — MÄTNINGEN FÖRE DEDUPLICERINGEN (2026-09-10, grundarmandat steg 1).
//
// FRÅGAN: prisboken har ~297 rader. Hur många av dem är SAMMA DOKUMENT lagrat flera gånger, och
// hur många är SKILDA dokument som råkar bära samma belopp? Skillnaden är hela moaten: två bolag
// som betalar samma listpris är TVÅ observationer, och en dedup på VÄRDE hade kollapsat dem —
// systematiskt kring listprisklumpen, åt det håll som ökar våra besparingsanspråk.
//
// METODEN: `invoice_datapoints` saknade pdf_hash fram till 2026-09-10. Dokumentidentiteten för de
// gamla raderna finns därför bara indirekt — via `invoice_analyses`, som ALLTID bär pdf_hash
// (NOT NULL). Korsningen sker på kategori + exakt årskostnad + tidsfönster, precis som mätningen
// 21 augusti. Där korsningen är ENTYDIG (alla kandidater bär samma pdf_hash) är dokumentet känt.
// Annars är raden OKÄND — aldrig "skild", aldrig "dubblett". Ett okänt som lånar ett giltigt värde
// är felfamiljen, och den här sonden finns för att mäta den, inte för att begå den.
//
// INGA SKRIVNINGAR. Inga adresser, inga fingerprints, inga hashar i utskriften (repot är publikt).

import { getDb } from '../lib/db.js';

// ── KLASSIFICERAREN, REN OCH SJÄLVPRÖVAD ────────────────────────────────────────────────────
// En sond vars enda möjliga svar är ett larm är inget mätinstrument (SV-09-läxan). Klassificeraren
// prövas därför mot en syntetisk fixtur INNAN den släpps på produktionsdatan — går provet inte
// igenom dör sonden här, inte efter att ha skrivit ut en tabell full av tal som ser mätta ut.
export function harledDokument(punkt, analyser, fonsterMs) {
  if (punkt.pdf_hash) return { utfall: 'egen_hash', hash: punkt.pdf_hash };
  const t = new Date(punkt.created_at).getTime();
  const kandidater = analyser.filter((a) =>
    a.category === punkt.category
    && Number(a.annual_cost) === Number(punkt.annual_cost)
    && Math.abs(new Date(a.created_at).getTime() - t) <= fonsterMs);
  if (kandidater.length === 0) return { utfall: 'ingen_traff', hash: null };
  const hashar = new Set(kandidater.map((a) => a.pdf_hash));
  if (hashar.size === 1) return { utfall: 'harledd', hash: [...hashar][0] };
  return { utfall: 'tvetydig', hash: null }; // flera dokument passar → OKÄNT, aldrig ett val
}

function sjalvprov() {
  const nu = Date.parse('2026-09-01T12:00:00Z');
  const iso = (offsetSek) => new Date(nu + offsetSek * 1000).toISOString();
  const A = [
    { category: 'mobil', annual_cost: 1000, created_at: iso(0), pdf_hash: 'H1' },
    { category: 'mobil', annual_cost: 1000, created_at: iso(5), pdf_hash: 'H1' },   // omanalys, samma dok
    { category: 'mobil', annual_cost: 1000, created_at: iso(600), pdf_hash: 'H2' }, // utanför fönstret
    { category: 'el', annual_cost: 2000, created_at: iso(0), pdf_hash: 'H3' },
    { category: 'el', annual_cost: 2000, created_at: iso(3), pdf_hash: 'H4' },      // två dok, samma belopp
  ];
  const F = 30_000;
  const fall = [
    [{ category: 'mobil', annual_cost: 1000, created_at: iso(2), pdf_hash: null }, 'harledd', 'H1'],
    [{ category: 'el', annual_cost: 2000, created_at: iso(1), pdf_hash: null }, 'tvetydig', null],
    [{ category: 'mobil', annual_cost: 9999, created_at: iso(0), pdf_hash: null }, 'ingen_traff', null],
    [{ category: 'mobil', annual_cost: 1000, created_at: iso(0), pdf_hash: 'X' }, 'egen_hash', 'X'],
    // tidsfönstret är LASTBÄRANDE: samma belopp 10 min senare är inte samma händelse
    [{ category: 'mobil', annual_cost: 1000, created_at: iso(605), pdf_hash: null }, 'harledd', 'H2'],
  ];
  for (const [p, vantatUtfall, vantadHash] of fall) {
    const r = harledDokument(p, A, F);
    if (r.utfall !== vantatUtfall || r.hash !== vantadHash) {
      console.error(`SJÄLVPROVET FÖLL: ${JSON.stringify(p)} → ${JSON.stringify(r)}, väntat ${vantatUtfall}/${vantadHash}`);
      process.exit(1);
    }
  }
}
sjalvprov();

const FONSTER_SEK = Number(process.argv[2]) || 30;
const FONSTER = FONSTER_SEK * 1000;

const db = getDb();
if (!db) { console.log('Ingen DATABASE_URL — sonden kom aldrig fram (detta är INTE ett mätvärde).'); process.exit(1); }

const punkter = await db`
  SELECT id, category, annual_cost, industry, size_bucket, tier, source, created_at, pdf_hash
  FROM invoice_datapoints ORDER BY created_at ASC
`;
const analyser = await db`
  SELECT pdf_hash, category, annual_cost, created_at
  FROM invoice_analyses WHERE annual_cost IS NOT NULL
`;

console.log(`\n═══════ PRISBOKENS DOKUMENTIDENTITET (fönster ±${FONSTER_SEK}s) ═══════`);
console.log(`datapunkter: ${punkter.length} · analyser att korsa mot: ${analyser.length}`);

const utfallRakning = {};
for (const p of punkter) {
  const r = harledDokument(p, analyser, FONSTER);
  p._utfall = r.utfall;
  p._hash = r.hash;
  utfallRakning[r.utfall] = (utfallRakning[r.utfall] ?? 0) + 1;
}
console.log('\nHÄRLEDNING PER RAD:');
for (const [k, v] of Object.entries(utfallRakning).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k.padEnd(14)} ${String(v).padStart(4)}  (${(100 * v / punkter.length).toFixed(1)} %)`);
}

// ── PER CELL ────────────────────────────────────────────────────────────────────────────────
const celler = new Map();
for (const p of punkter) {
  const nyckel = `${p.category}·${p.industry}·${p.size_bucket}`;
  if (!celler.has(nyckel)) celler.set(nyckel, []);
  celler.get(nyckel).push(p);
}

const p25 = (v) => kvantil(v, 0.25);
const median = (v) => kvantil(v, 0.5);
function kvantil(varden, q) {
  if (!varden.length) return null;
  const s = [...varden].sort((a, b) => a - b);
  const i = Math.floor(s.length * q);
  return s[Math.min(i, s.length - 1)];
}

console.log('\nPER CELL — rader vs dokument:');
console.log('  cell'.padEnd(46) + 'rader  känt  dok  DUBB  okänt  sammabelopp/olika-dok');
const rader = [];
for (const [nyckel, ps] of [...celler.entries()].sort((a, b) => b[1].length - a[1].length)) {
  const kanda = ps.filter((p) => p._hash);
  const dokument = new Set(kanda.map((p) => p._hash));
  const dubbletter = kanda.length - dokument.size;
  const okanda = ps.length - kanda.length;

  // Skilda dokument som bär SAMMA belopp — den klass en dedup-på-värde hade förstört.
  const perBelopp = new Map();
  for (const p of kanda) {
    const b = Number(p.annual_cost);
    if (!perBelopp.has(b)) perBelopp.set(b, new Set());
    perBelopp.get(b).add(p._hash);
  }
  let sammaBeloppOlikaDok = 0;
  for (const hashar of perBelopp.values()) if (hashar.size > 1) sammaBeloppOlikaDok += hashar.size;

  rader.push({ nyckel, ps, kanda, dokument, dubbletter, okanda, sammaBeloppOlikaDok });
  console.log(`  ${nyckel.padEnd(44)}${String(ps.length).padStart(5)}${String(kanda.length).padStart(6)}`
    + `${String(dokument.size).padStart(5)}${String(dubbletter).padStart(6)}${String(okanda).padStart(7)}`
    + `${String(sammaBeloppOlikaDok).padStart(10)}`);
}

// ── FÖRE / EFTER ────────────────────────────────────────────────────────────────────────────
// Två gränser, för okända rader är just okända: NEDRE = bara bevisade dokument räknas,
// ÖVRE = varje okänd rad räknas som sitt eget dokument. Sanningen ligger emellan, och att
// redovisa båda är det enda ärliga sättet att svara på "vad händer med cellen".
const MIN_POINTS = 10;
console.log(`\nFÖRE/EFTER per cell (MIN_POINTS=${MIN_POINTS}):`);
console.log('  cell'.padEnd(46) + '  n_före  p25_före  med_före |  n_ned  n_övre  p25_efter  med_efter  bär?');
for (const r of rader) {
  const fore = r.ps.map((p) => Number(p.annual_cost));
  // EFTER: ett dokument = en observation. Vid flera rader per dokument väljs den FÖRSTA (äldsta),
  // aldrig ett snitt — ett snitt av två avläsningar av samma papper är ett tal som aldrig lästes.
  const settHash = new Set();
  const efterNed = [];
  for (const p of r.ps) {
    if (!p._hash) continue;
    if (settHash.has(p._hash)) continue;
    settHash.add(p._hash);
    efterNed.push(Number(p.annual_cost));
  }
  const efterOvre = [...efterNed, ...r.ps.filter((p) => !p._hash).map((p) => Number(p.annual_cost))];
  const barFore = r.ps.length >= MIN_POINTS;
  const barNed = efterNed.length >= MIN_POINTS;
  const barOvre = efterOvre.length >= MIN_POINTS;
  const bar = barNed === barOvre ? (barNed ? 'JA' : 'NEJ→listpris') : 'OVISS';
  console.log(`  ${r.nyckel.padEnd(44)}${String(fore.length).padStart(8)}${String(p25(fore)).padStart(10)}`
    + `${String(median(fore)).padStart(10)} |${String(efterNed.length).padStart(7)}${String(efterOvre.length).padStart(8)}`
    + `${String(p25(efterNed) ?? '—').padStart(11)}${String(median(efterNed) ?? '—').padStart(11)}`
    + `  ${bar}${barFore ? '' : ' (bar ej före heller)'}`);
}

// ── SAMMANFATTNING ──────────────────────────────────────────────────────────────────────────
const totKanda = punkter.filter((p) => p._hash).length;
const totDok = new Set(punkter.filter((p) => p._hash).map((p) => p._hash)).size;
console.log('\n═══════ SVAR PÅ FRÅGAN ═══════');
console.log(`  rader totalt:                       ${punkter.length}`);
console.log(`  rader med bevisad dokumentidentitet: ${totKanda}`);
console.log(`  distinkta dokument bland dem:        ${totDok}`);
console.log(`  BEVISADE OMANALYSER (rader−dok):     ${totKanda - totDok}`);
console.log(`  OKÄNDA (varken eller):               ${punkter.length - totKanda}`);
const sbod = rader.reduce((s, r) => s + r.sammaBeloppOlikaDok, 0);
console.log(`  SKILDA dokument med SAMMA belopp:    ${sbod}   ← dessa hade en dedup-på-värde förstört`);
