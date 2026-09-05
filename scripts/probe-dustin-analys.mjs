// scripts/probe-dustin-analys.mjs — vad SKREV maskinen om Dustin-fakturan?
//
// ══ VARFÖR ═════════════════════════════════════════════════════════════════════════════════
// Grundarens kort visade «Kräver offert — våra experter kikar på detta» och INGET fyndkort,
// trots att leasing-fixen (2026-09-05) är deployad. Kortet ensamt kan inte skilja två helt
// olika fel åt:
//   A. motorn hittade aldrig fyndet         → felet sitter i extraktion/forensik
//   B. motorn hittade det, kortet visar inte → felet sitter i renderingen
// Det är 75-fallets fråga ordagrant (2026-08-15): talen fanns i databasen, rummet fick bara
// inte se dem, och jag höll på att leta i fel ände.
//
// Lokalt är BÅDA leden redan mätta och gröna:
//   detectForensicFindings(raderna)  → 1 fynd · overpaidToDate 29 400 kr · 12 mån (alla 6 typvarianter)
//   recommend({category:'utrustningsleasing'}) → requiresQuote OCH leadFinding satt (withForensics)
//   TestaFaktura ritar <FindingCard> OVILLKORLIGT före offert-rutan
// Alltså: koden kan inte förklara den tomma ytan. Då är svaret i DATAN.
//
// Sonden läser `invoice_analyses` och svarar på tre frågor per rad:
//   1. vilka RADER såg extraktionen (bar den «Leasing Server (Månad 48 av 36)» alls?)
//   2. vilken KATEGORI landade den i
//   3. skrevs `lead_finding_json` — och bär den 29 400 kr?
//
// SKRIVER ALDRIG. PDF:en skickas ALDRIG hit — repot är publikt och fakturan bär ett riktigt
// bolagsnamn och en adress. Sonden ser bara vad databasen redan innehåller, och maskerar
// e-post innan något skrivs ut.
//
// FÅNGAR: skillnaden mellan «fyndet skrevs aldrig» och «fyndet skrevs men syns inte».
// BLIND: sonden ser den LAGRADE analysen, inte det HTTP-svar webbläsaren fick. Ett svar som
//   aldrig lagrades (storeAnalysis felade) ser härifrån ut som «ingen analys» — därför
//   rapporterar den alltid antalet rader den hittade, så tomheten aldrig kan läsas som ett fynd.

import { getDb } from '../lib/db.js';

const db = getDb();
if (!db) {
  console.error('✗ ingen DATABASE_URL — sonden kom inte fram. Detta är INTE ett mätvärde.');
  process.exit(1);
}

const finns = await db`SELECT to_regclass('public.invoice_analyses') AS t`;
if (!finns?.[0]?.t) {
  console.error('✗ tabellen invoice_analyses FINNS INTE — migreringen har inte körts.');
  console.error('  (inte samma sak som «inga analyser», och får aldrig rapporteras som det)');
  process.exit(1);
}

// Vilka kolumner finns? En saknad kolumn ska SMÄLLA här, inte tyst utebli ur SELECT-satsen
// (LK-01, 75-fallet: reservvägen hämtade färre fält och gav ett halvt svar med full auktoritet).
// Kolumnnamnen är LÄSTA ur migreringarna, inte gissade: `lead_finding_json` (migrate.mjs:166) och
// `line_items_json` (migrate-v2.mjs:44). Min första version gissade «extracted_json» — fel namn
// hade gett «inga rader» och det svaret är omöjligt att skilja från «extraktionen såg inget».
const kolumner = new Set(
  (await db`SELECT column_name FROM information_schema.columns WHERE table_name = 'invoice_analyses'`)
    .map((r) => r.column_name)
);
for (const k of ['supplier', 'category', 'created_at', 'triage_reason', 'lead_finding_json', 'line_items_json']) {
  if (!kolumner.has(k)) {
    console.error(`✗ kolumnen ${k} saknas i invoice_analyses — migreringen har inte körts fullt ut.`);
    console.error('  Sonden avbryter hellre än mäter ett halvt schema och kallar det ett utfall.');
    process.exit(1);
  }
}

const rader = await db`
  SELECT id, supplier, category, created_at, route, triage_reason, lead_finding_json, line_items_json
  FROM invoice_analyses
  WHERE supplier ILIKE '%dustin%'
  ORDER BY created_at DESC
  LIMIT 10`;

console.log(`\n=== DUSTIN-ANALYSER I PRODUKTION ===`);
console.log(`rader hittade: ${rader.length}`);
if (rader.length === 0) {
  console.log('INGEN Dustin-analys är lagrad. Det betyder ett av två, och sonden kan inte skilja dem:');
  console.log('  · analysen kördes aldrig mot produktionen, eller');
  console.log('  · den kördes men storeAnalysis felade (fakturan syns då inte i rummet heller)');
  process.exit(0);
}

for (const r of rader) {
  console.log(`\n── ${r.created_at?.toISOString?.() ?? r.created_at} · id=${r.id} ─────────────`);
  console.log(`leverantör: ${r.supplier} · kategori: ${r.category} · rutt: ${r.route} · skäl: ${r.triage_reason ?? '—'}`);

  const poster = r.line_items_json;
  if (!Array.isArray(poster)) {
    console.log('rader: INGA lagrade (line_items_json är tom) — extraktionen nådde aldrig lagringen');
  } else {
    console.log(`rader: ${poster.length}`);
    for (const p of poster) {
      console.log(`   · type=${p.type ?? '—'} | "${p.description ?? ''}" | antal=${p.quantity ?? '—'} `
        + `| à=${p.unitPrice ?? '—'} | belopp=${p.amount ?? '—'}`);
    }
    const leasingrad = poster.find((p) => /m[åa]nad\s*\d+\s*(?:\/|av)\s*\d+/i.test(String(p.description ?? '')));
    console.log(`   → rad med månadsräknare: ${leasingrad ? `JA — "${leasingrad.description}"` : 'NEJ'}`);
  }

  const lead = r.lead_finding_json;
  if (!lead || typeof lead !== 'object') {
    console.log('fynd: INGET lead_finding_json lagrat');
  } else {
    console.log(`fynd: ${lead.type} · överbetalt=${lead.overpaidToDate ?? '—'} kr `
      + `· månader=${lead.monthsOverpaid ?? '—'} · årsimpact=${lead.annualImpact ?? '—'}`);
  }
}
// (safeJson togs bort: JSONB-kolumner kommer redan parsade från Neon-drivrutinen. En oanvänd
//  hjälpare i en sond är samma sorts skräp som en oläst kolumn — den ser ut att göra något.)
