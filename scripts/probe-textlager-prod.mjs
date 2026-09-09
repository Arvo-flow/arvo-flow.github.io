// scripts/probe-textlager-prod.mjs — LEVER TEXTLAGRET I VERCELS RUNTIME?
//
// ══ VARFÖR EN NY SOND, OCH VARFÖR INTE HTTP-VÄGEN (2026-09-09) ══════════════════════════════
// Frågan är enkel: överlevde `DOMMatrix`-polyfillen produktionens funktionsbundle? Två befintliga
// instrument SER ut att kunna svara, och kan det bevisligen inte:
//
//   · `scripts/probe-fakturanummer.mjs` kör pipelinen I GITHUB ACTIONS, där `@napi-rs/canvas`
//     alltid funnits. Den bevisar att mekanismen svarar i en miljö produktionen inte är i —
//     villkorsvaktens sjukdom, ordagrant.
//   · `scripts/diag-live.mjs` läser `data.extracted.invoiceNumber` ur HTTP-svaret. MÄTT genom att
//     läsa api-lagret: fältet serialiseras på EXAKT ETT ställe (den cachade grenen), och cachen
//     lagrar själva svarskuvertet — som aldrig burit fältet. Nollan är alltså strukturell, i varje
//     gren, oavsett om textlagret lever. Sondens enda möjliga svar var «null».
//
// Kvar står DATAN. Varje triage-utgång skriver `invoiceNumber: extracted.invoiceNumber` till
// `invoice_analyses`, och radposterna bär `antalKalla` från kolumnläsaren — som läser samma
// pdfjs-tokens. Två oberoende spår ur samma polyfill. Det är den bättre vägen ändå: routen är
// bevisad separat, och när en mätning blockeras ska man fråga om blockeraren var nödvändig för
// MÄTNINGEN eller bara för den väg man råkade välja (bibeln, probe-liggaren 1 sep).
//
// SKRIVER INGENTING. Ren läsning.
import { deklarera } from '../lib/sondkontrakt.js';
import { getDb } from '../lib/db.js';

deklarera({
  namn: 'probe-textlager-prod',
  fangar: 'Om produktionens Vercel-runtime kunde läsa PDF:ernas textlager: mäter hur många av de '
    + 'senaste lagrade analyserna som bär ett bekräftat fakturanummer, och hur många radposter som '
    + 'bär `antalKalla` från kolumnläsaren. Båda härleds ur samma pdfjs-tokens, så noll på båda '
    + 'betyder att polyfillen inte nådde fram.',
  blind: 'Sonden kan inte skilja «textlagret dog» från «fakturan saknar tryckt nummer och antal». '
    + 'En PDF utan textskikt, en faktura som inte trycker sitt nummer, och en död polyfill ser '
    + 'likadana ut härifrån om man bara ser EN rad. Därför rapporteras alltid FÖRDELNINGEN över '
    + 'flera rader plus tidsstämplarna: en skarp gräns i tid (allt före X saknar, allt efter bär) '
    + 'är signalen, ett enskilt null är det aldrig. Sonden vet heller inte vilken kodversion som '
    + 'analyserade en given rad — bara när den skrevs.',
});

const db = getDb();
if (!db) {
  console.error('DATABASE_URL saknas — sonden kunde inte mäta. Det är inte samma sak som «noll».');
  process.exit(1);
}

const N = Number(process.argv[2] || 25);

// Kolumnerna läses ur information_schema först: saknas de i den här miljön är svaret «jag kunde
// inte mäta», aldrig «noll fakturanummer». Ett saknat fält och ett tomt fält får aldrig se lika ut.
const kolumner = await db`
  SELECT column_name FROM information_schema.columns
  WHERE table_name = 'invoice_analyses' AND column_name IN ('invoice_number', 'line_items_json')
`;
const har = new Set(kolumner.map((k) => k.column_name));
for (const k of ['invoice_number', 'line_items_json']) {
  if (!har.has(k)) {
    console.error(`KOLUMNEN ${k} FINNS INTE i den här databasen — mätningen är omöjlig, inte noll.`);
    process.exit(1);
  }
}

const rader = await db`
  SELECT created_at, supplier, category, route,
         NULLIF(invoice_number, '') AS nummer,
         line_items_json
  FROM invoice_analyses
  ORDER BY created_at DESC
  LIMIT ${N}
`;

if (rader.length === 0) {
  console.error('NOLL RADER i invoice_analyses — sonden mätte ingenting.');
  process.exit(1);
}

console.log(`\n=== TEXTLAGRET I PRODUKTION · ${rader.length} senaste analyser ===\n`);
console.log('tid (UTC)          leverantör             rutt           nummer      antalKalla');
console.log('─'.repeat(88));

let medNummer = 0;
let radposterTotalt = 0;
let radposterMedKalla = 0;

for (const r of rader) {
  const rader2 = Array.isArray(r.line_items_json) ? r.line_items_json : [];
  const medKalla = rader2.filter((l) => l && l.antalKalla != null).length;
  radposterTotalt += rader2.length;
  radposterMedKalla += medKalla;
  if (r.nummer) medNummer += 1;

  const tid = new Date(r.created_at).toISOString().slice(5, 16).replace('T', ' ');
  const lev = String(r.supplier || '—').slice(0, 21).padEnd(21);
  const rutt = String(r.route || '—').slice(0, 13).padEnd(13);
  const num = r.nummer ? String(r.nummer).slice(0, 11).padEnd(11) : '—'.padEnd(11);
  const kalla = rader2.length ? `${medKalla}/${rader2.length}` : '—';
  console.log(`${tid}  ${lev}  ${rutt}  ${num} ${kalla}`);
}

console.log('─'.repeat(88));
console.log(`\nFakturanummer:  ${medNummer} av ${rader.length} rader bär ett bekräftat nummer`);
console.log(`Radernas antal: ${radposterMedKalla} av ${radposterTotalt} radposter bär antalKalla`);
console.log(
  medNummer === 0 && radposterMedKalla === 0
    ? '\n→ BÅDA SPÅREN TOMMA. Det är förenligt med en död polyfill — men läs tidsstämplarna innan\n'
      + '  det tolkas: är alla rader äldre än textlagerfixen mäter sonden bara det gamla läget.'
    : '\n→ MINST ETT SPÅR BÄR. Textlagret kunde läsas i den miljö som skrev de raderna.',
);
