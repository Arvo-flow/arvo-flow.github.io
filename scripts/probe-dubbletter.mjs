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

// ── MOTPARTENS TILLSTÅND FÖRST ──────────────────────────────────────────────────────────────
// Korsningen kan bara vara lika stark som tabellen den korsar MOT. Är invoice_analyses tömd
// (rummet rensades före ingest-testet) blir "ingen träff" ett utfall om MOTPARTEN, inte om
// datapunkten — och att läsa det som "raden är ett eget dokument" vore felfamiljen i sonden.
const motpart = await db`
  SELECT COUNT(*)::int AS n,
         COUNT(annual_cost)::int AS n_med_belopp,
         MIN(created_at) AS aldst, MAX(created_at) AS nyast
  FROM invoice_analyses
`;
const mp = motpart[0];
const spann = { punkter: { aldst: punkter[0]?.created_at, nyast: punkter[punkter.length - 1]?.created_at } };
console.log(`MOTPARTEN invoice_analyses: ${mp.n} rader (${mp.n_med_belopp} med belopp)`
  + ` · ${mp.aldst ? new Date(mp.aldst).toISOString().slice(0, 10) : '—'} → ${mp.nyast ? new Date(mp.nyast).toISOString().slice(0, 10) : '—'}`);
console.log(`DATAPUNKTERNAS spann:       ${spann.punkter.aldst ? new Date(spann.punkter.aldst).toISOString().slice(0, 10) : '—'}`
  + ` → ${spann.punkter.nyast ? new Date(spann.punkter.nyast).toISOString().slice(0, 10) : '—'}`);
const punkterFore = punkter.filter((p) => mp.aldst && new Date(p.created_at) < new Date(mp.aldst)).length;
console.log(`  datapunkter ÄLDRE än äldsta analysen: ${punkterFore}  ← dessa kan ALDRIG korsas (motparten finns inte)`);

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

// ── INDICIUM NÄR BEVISET INTE FINNS ─────────────────────────────────────────────────────────
// Går dokumentidentiteten inte att bevisa återstår FORMEN på datan. Två signaler, och båda är
// INDICIER — de får aldrig kallas bevis, och de driver ingen radering:
//   (a) Hur många SKILDA belopp bär cellen? En cell med 24 rader och 2 belopp är antingen 24
//       omanalyser eller 24 bolag som betalar exakt samma TOTALSUMMA på kronan. Det andra är
//       inte omöjligt — men en totalsumma varierar med antalet enheter, så det är osannolikt.
//   (b) Ligger raderna med samma belopp i samma SEKUNDKLUSTER? Rader inom ett par minuter är
//       en uppladdningsskur, inte tjugofyra bolag som råkade träffa samma minut.
const KLUSTER_SEK = 120;
console.log('\nFORMEN PÅ CELLEN (indicier, inte bevis):');
console.log('  cell'.padEnd(46) + 'rader  skilda_belopp  största_klump  rader_i_tidskluster  spann');
for (const r of rader) {
  if (r.ps.length < 3) continue;
  const belopp = r.ps.map((p) => Number(p.annual_cost));
  const skilda = new Set(belopp).size;
  const rakning = new Map();
  for (const b of belopp) rakning.set(b, (rakning.get(b) ?? 0) + 1);
  const storsta = Math.max(...rakning.values());
  // Tidskluster: rader med samma belopp vars närmsta granne (samma belopp) ligger inom fönstret.
  let iKluster = 0;
  for (const [b, n] of rakning) {
    if (n < 2) continue;
    const tider = r.ps.filter((p) => Number(p.annual_cost) === b)
      .map((p) => new Date(p.created_at).getTime()).sort((a, c) => a - c);
    for (let i = 0; i < tider.length; i++) {
      const nara = (i > 0 && tider[i] - tider[i - 1] <= KLUSTER_SEK * 1000)
        || (i < tider.length - 1 && tider[i + 1] - tider[i] <= KLUSTER_SEK * 1000);
      if (nara) iKluster++;
    }
  }
  const tider = r.ps.map((p) => new Date(p.created_at).getTime());
  const dygn = ((Math.max(...tider) - Math.min(...tider)) / 86400000).toFixed(1);
  console.log(`  ${r.nyckel.padEnd(44)}${String(r.ps.length).padStart(5)}${String(skilda).padStart(15)}`
    + `${String(storsta).padStart(15)}${String(iKluster).padStart(21)}  ${dygn} dygn`);
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

// ── LÄSVÄG 2.5: invoice_analyses ────────────────────────────────────────────────────────────
// Den andra grenen i getBenchmark räknar RADER i invoice_analyses, och där är pdf_hash NOT NULL
// — dokumentidentiteten finns alltså direkt, ingen korsning behövs. Dubbletterna uppstår genom
// att UNIQUE-indexet står på (fingerprint, pdf_hash): samma faktura via mail och via uppladdning
// är två rader. Tröskeln är dessutom LÄGRE här (5), så en cell kan bäras av fem rader som är
// två dokument. Måttet nedan är därför en egen mätning, inte en spegling av den ovan.
const BUCKETS = { micro: [1, 9], small: [10, 49], medium: [50, 249], large: [250, 100000] };
console.log('\n═══════ LÄSVÄG 2.5 (invoice_analyses, tröskel 5) ═══════');
console.log('  kategori·bucket'.padEnd(40) + 'rader  dok  p25_rad  med_rad  p25_dok  med_dok  bär_före  bär_efter');
const live = await db`
  SELECT category, employees, annual_cost, pdf_hash
  FROM invoice_analyses
  WHERE route = 'auto' AND annual_cost > 500 AND annual_cost < 5000000
`;
const MIN_LIVE = 5;
const liveCeller = new Map();
for (const r of live) {
  for (const [namn, [min, max]] of Object.entries(BUCKETS)) {
    if (r.employees >= min && r.employees <= max) {
      const n = `${r.category}·${namn}`;
      if (!liveCeller.has(n)) liveCeller.set(n, []);
      liveCeller.get(n).push(r);
    }
  }
}
for (const [namn, rs] of [...liveCeller.entries()].sort((a, b) => b[1].length - a[1].length)) {
  const radVarden = rs.map((r) => Number(r.annual_cost));
  const sett = new Set();
  const dokVarden = [];
  for (const r of rs) { if (sett.has(r.pdf_hash)) continue; sett.add(r.pdf_hash); dokVarden.push(Number(r.annual_cost)); }
  console.log(`  ${namn.padEnd(38)}${String(rs.length).padStart(5)}${String(dokVarden.length).padStart(5)}`
    + `${String(p25(radVarden)).padStart(9)}${String(median(radVarden)).padStart(9)}`
    + `${String(p25(dokVarden)).padStart(9)}${String(median(dokVarden)).padStart(9)}`
    + `${(rs.length >= MIN_LIVE ? '  JA' : '  nej').padStart(10)}${(dokVarden.length >= MIN_LIVE ? '  JA' : '  nej').padStart(11)}`);
}
