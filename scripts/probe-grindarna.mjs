// scripts/probe-grindarna.mjs — HUR OFTA SKULLE DE FYRA AVVÄPNADE GRINDARNA FÄLLA?
//
// Fyra integritetsgrindar har stått i SKUGGLÄGE sedan 2026-06-10, alla med samma motivering i
// koden: «armeras när falsklarmsfrekvensen är uppmätt i produktion».
//
//   BALANSKRAV_ENFORCE      antal × à-pris = radbelopp (per rad)
//   PROJEKTIONSKRAV_ENFORCE AI:ns projektion ±2 % från den deterministiska radsumman
//   PROSAKRAV_ENFORCE       varje tal i AI:ns reasoning finns i promptens injicerade fakta
//   SCHEMAKRAV_ENFORCE      AI-utfallet följer agentens EGET input_schema
//
// Mätningen gjordes aldrig. Skälet står i bibeln: fixturkorpusen är författad på METRIC-nivå
// medan grindarna dömer på EXTRAKTIONS-nivå — korpusen kan inte mäta dem. Och den DB-baserade
// mätningen (probe-grindmatning) nådde bara 6 fakturor, eftersom `line_items_json` lagras först
// sedan 15 augusti. Elva dömda rader är för tunt att armera fyra grindar på; att göra det ändå
// vore att byta en uppmätt risk mot en gissning, vilket är precis vad grindarna finns för att
// hindra.
//
// Den här sonden går den enda väg som faktiskt bär: den kör den SKARPA pipelinen — riktig
// extract.js med riktiga modellanrop — mot varje verklig faktura i test-pdfs/, och räknar hur
// ofta varje grind skulle ha stoppat. Extraktionsnivå-data i den volym beslutet kräver.
//
// SKRIVER ALDRIG till någon databas. Läser PDF:er, anropar modellen, räknar.
//
// FÅNGAR: hur ofta varje grind fäller på verkliga fakturor, och VILKA fakturor — så ett utfall
//   går att slå upp och läsa mot pappret innan någon armerar.
// BLIND: test-pdfs/ är den korpus VI samlat; den speglar inte nödvändigtvis fördelningen i
//   inkommande kundtrafik. Sonden mäter alltså grindarna på vår korpus, inte marknadens. Den
//   avgör heller ALDRIG om en fälld rad är ett sant fel eller ett falsklarm — det kräver att en
//   människa läser fakturan. Sonden ger talet beslutet ska vila på, inte beslutet.
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deklarera } from '../lib/sondkontrakt.js';
import { extractInvoice, routeExtraction } from '../agents/test-invoice/extract.js';
import { judgeLineArithmetic } from '../lib/extraction-integrity.js';

deklarera({
  namn: 'probe-grindarna',
  fangar: 'Hur ofta balanskravet, projektionskravet och schemakravet skulle fälla verkliga fakturor — talet som avgör om de fyra ENFORCE-flaggorna kan sättas.',
  blind: 'test-pdfs/ är vår egen korpus och speglar inte nödvändigtvis kundtrafikens fördelning. Sonden avgör aldrig om en fälld rad är ett sant fel eller ett falsklarm — det kräver att en människa läser fakturan. Prosakravet mäts inte här: det dömer AI:ns reasoning mot promptens fakta och kräver hela recommend-steget, alltså ett andra modellanrop per faktura.',
});

// Sökvägen härleds ur filens EGEN plats. Den var absolut och pekade på min lokala disk —
// på GitHub Actions finns den katalogen inte, så readdirSync kastade direkt. Sonden dog på
// första raden och rapporterade ändå framgång (se `pipefail` i workflowen).
const KORPUS = join(dirname(fileURLToPath(import.meta.url)), '..', 'test-pdfs');
const MAX = Number(process.env.GRIND_MAX) || 999;

const filer = readdirSync(KORPUS).filter((f) => f.toLowerCase().endsWith('.pdf')).sort().slice(0, MAX);
console.log(`═══ GRINDARNA MOT ${filer.length} VERKLIGA FAKTUROR ═══\n`);

const utfall = {
  lasta: 0, extraktionsfel: 0,
  balans: { provbara: 0, fallda: 0, rader: 0, radfel: 0, filer: [] },
  projektion: { provbara: 0, fallda: 0, filer: [] },
  schema: { provbara: 0, fallda: 0, filer: [] },
  radsumma: { ok: 0, stopp: 0, ejProvbar: 0, varning: 0 },
};

for (const fil of filer) {
  let ex;
  try {
    // extractInvoice tar `pdfPath` eller `pdfBytes` — inte `pdfBase64` (det är api-lagrets form).
    // Mitt första anrop skickade fel fält och 75 fakturor föll på rad ett. Skillnaden mot förra
    // körningen är att felet nu SYNS: sonden bokför varje misslyckande med sitt skäl, och
    // pipefail gör att steget inte längre kan rapportera framgång på en död körning.
    ex = await extractInvoice({ pdfPath: join(KORPUS, fil) });
    utfall.lasta++;
  } catch (err) {
    utfall.extraktionsfel++;
    console.log(`  ✗ ${fil}: extraktionen föll — ${err.message.split('\n')[0].slice(0, 70)}`);
    continue;
  }

  // BALANSKRAVET — döms direkt på det extraherade utfallet.
  const b2 = judgeLineArithmetic(ex);
  if (b2.judged > 0) {
    utfall.balans.provbara++;
    utfall.balans.rader += b2.judged;
    utfall.balans.radfel += b2.violations.length;
    if (!b2.balanced) {
      utfall.balans.fallda++;
      utfall.balans.filer.push(`${fil} (${b2.violations.length}/${b2.judged} rader: ${b2.violations[0]?.reason ?? '?'})`);
    }
  }

  // PROJEKTIONSKRAVET och SCHEMAKRAVET bär sina domar ut ur extraktionen.
  if (ex.projektionskrav?.provad) {
    utfall.projektion.provbara++;
    if (!ex.projektionskrav.ok) {
      utfall.projektion.fallda++;
      utfall.projektion.filer.push(`${fil} (avvikelse ${ex.projektionskrav.deviationPct} %)`);
    }
  }
  if (ex.schemakrav) {
    utfall.schema.provbara++;
    if (!ex.schemakrav.ok) {
      utfall.schema.fallda++;
      utfall.schema.filer.push(`${fil} (${ex.schemakrav.brott} brott)`);
    }
  }

  // RING 1 (radsumma) är redan ARMERAD — den mäts som referens: en armerad grinds verkliga
  // stoppfrekvens är måttstocken de fyra andra ska jämföras mot.
  const dom = routeExtraction(ex);
  const rad = (dom.verifications ?? []).find((v) => v.id === 'radsumma');
  if (rad) utfall.radsumma[rad.status === 'ok' ? 'ok' : rad.status === 'stopp' ? 'stopp' : rad.status === 'varning' ? 'varning' : 'ejProvbar']++;

  process.stdout.write('.');
}

const pct = (a, b) => (b > 0 ? `${((a / b) * 100).toFixed(1)} %` : '—');
console.log(`\n\n────────────────────────────────────────────────────────────────────────`);
console.log(`fakturor lästa: ${utfall.lasta} · extraktionsfel: ${utfall.extraktionsfel}\n`);
console.log(`BALANSKRAVET   prövbara ${utfall.balans.provbara} fakturor · ${utfall.balans.rader} rader`);
console.log(`               skulle STOPPA ${utfall.balans.fallda} fakturor (${pct(utfall.balans.fallda, utfall.balans.provbara)})`);
console.log(`               fällda rader: ${utfall.balans.radfel} (${pct(utfall.balans.radfel, utfall.balans.rader)})`);
for (const f of utfall.balans.filer.slice(0, 10)) console.log(`                 · ${f}`);
console.log(`\nPROJEKTIONSKRAV prövbara ${utfall.projektion.provbara} · fäller ${utfall.projektion.fallda} (${pct(utfall.projektion.fallda, utfall.projektion.provbara)})`);
for (const f of utfall.projektion.filer.slice(0, 10)) console.log(`                 · ${f}`);
console.log(`\nSCHEMAKRAVET    prövbara ${utfall.schema.provbara} · fäller ${utfall.schema.fallda} (${pct(utfall.schema.fallda, utfall.schema.provbara)})`);
for (const f of utfall.schema.filer.slice(0, 10)) console.log(`                 · ${f}`);
console.log(`\nRING 1 (radsumma, REDAN ARMERAD — referensmåttet)`);
console.log(`               ok ${utfall.radsumma.ok} · stopp ${utfall.radsumma.stopp} · varning ${utfall.radsumma.varning} · ej prövbar ${utfall.radsumma.ejProvbar}`);
console.log(`               stoppfrekvens ${pct(utfall.radsumma.stopp, utfall.lasta)} — en armerad grinds verkliga nivå`);
console.log(`────────────────────────────────────────────────────────────────────────`);
console.log('Sonden avgör INTE om en fälld faktura är ett sant fel eller ett falsklarm.');
console.log('Den ger talet beslutet ska vila på — läs de namngivna fakturorna mot pappret först.');

// ── EN SOND SOM INTE LÄSTE NÅGOT HAR INTE MÄTT NÅGOT (2026-08-22) ───────────────────────────
// Första körningen dog på rad ett och rapporterade framgång. Den andra körde, men mitt anrop
// hade fel argumentform och 75 av 75 fakturor föll — och tabellen hade ändå skrivits ut, full av
// nollor, som om «0 % fällda» vore ett mätvärde. Det är samma sjukdom som allt annat under
// obduktionen: ett resultat som betyder «jag mätte inte», återgivet som en mätning.
//
// Tröskeln är medvetet låg (hälften): sonden ska fälla på ett systemfel, inte på att enstaka
// fakturor är svårlästa — några extraktionsfel i en korpus på 75 är normalt och ska rapporteras,
// inte stoppa.
const misslyckadeAndel = filer.length > 0 ? utfall.extraktionsfel / filer.length : 1;
if (utfall.lasta === 0 || misslyckadeAndel > 0.5) {
  console.error(`\n[grindsond] RÖTT — ${utfall.extraktionsfel} av ${filer.length} fakturor kunde inte läsas.`);
  console.error('Talen ovan är inte en mätning av grindarna, utan av att sonden inte kom fram. Armera ingenting på dem.');
  process.exit(1);
}
