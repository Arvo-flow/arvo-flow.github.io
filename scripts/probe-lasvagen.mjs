// scripts/probe-lasvagen.mjs — VILKEN SELECT VINNER, OCH VAD TAPPAS?
//
// SYMPTOMET (grundaren, 2026-08-15): varje leverantör i rummet visar Arvo Score 75. 75 är INTE
// ett räknat tal — det är `supplierDiagScore`:s fallback när `health_score` saknas på raden:
//
//     if (!a.should_switch || !a.annual_cost || !(gross > 0)) return a.annual_cost > 0 ? 75 : 50;
//
// MISSTANKEN, som ska bevisas eller falsifieras här: jag lade `invoice_number` i den primära
// SELECT-satsen samma kväll. Kolumnen självläker vid SKRIVNING — men ingen ny faktura har
// skrivits sedan dess, så i produktion finns den inte. Då kastar den primära satsen, och
// invoice-store faller till sin reserv-SELECT, som saknar health_score, lead_finding_json OCH
// triage_reason. Rummet degraderas alltså tyst: alla score blir 75, fyndkortet försvinner, och
// bevakade rader tappar sitt skäl.
//
// Reserven byggdes som ett skyddsnät för EN omigrerad kolumn. Den blev i stället en tyst
// kvalitetsnedgradering som ser identisk ut med "kunden har inga bra avtal".
import { deklarera } from '../lib/sondkontrakt.js';
import { getDb } from '../lib/db.js';
import { aldrigTyst } from '../lib/sondvakt.js';

deklarera({
  namn: 'probe-lasvagen',
  fangar: 'Vilka kolumner invoice_analyses FAKTISKT har i produktion, om den primära SELECT-satsen går igenom eller kastar, och — om den kastar — exakt vilka fält reserven tappar (health_score, lead_finding_json, triage_reason).',
  blind: 'Sonden prövar SELECT-satserna som de ser ut i koden just nu. Har någon ändrat dem sedan deployen mäter den den nya koden mot den gamla databasen, vilket är rätt fråga men inte samma fråga. Den ser heller inte hur MÅNGA kunder som drabbats — bara att vägen är trasig eller hel.',
});

const db = getDb();
if (!db) { console.error('Ingen DATABASE_URL.'); process.exit(1); }

const kol = await aldrigTyst(db`
  SELECT column_name FROM information_schema.columns WHERE table_name = 'invoice_analyses'
  ORDER BY column_name
`, 'läsning av kolumner');
const namn = kol.map((r) => r.column_name);
console.log(`\n═══ invoice_analyses: ${namn.length} kolumner ═══`);
console.log('  ' + namn.join(', '));

const VIKTIGA = ['invoice_number', 'health_score', 'lead_finding_json', 'triage_reason', 'contract_terms_json', 'contract_end_date'];
console.log('\n═══ DE KOLUMNER LÄSVÄGEN BEROR PÅ ═══');
for (const k of VIKTIGA) console.log(`  ${namn.includes(k) ? '✓' : '⛔ SAKNAS'}  ${k}`);

// Den avgörande frågan: går den PRIMÄRA satsen igenom? Vi kör exakt kolumnlistan koden använder.
console.log('\n═══ PRIMÄR SELECT ═══');
let primarOk = true;
try {
  await db`
    SELECT id, supplier, normalized_supplier, category,
           annual_cost, suggested_annual_cost, gross_saving, net_saving,
           should_switch, route, industry, employees, billing_period, created_at,
           seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date,
           health_score, triage_reason, contract_terms_json, invoice_number
    FROM invoice_analyses LIMIT 1
  `;
  console.log('  ✓ går igenom — rummet får health_score, fyndet och triage-skälen');
} catch (err) {
  primarOk = false;
  console.log(`  ⛔ KASTAR: ${err.message.slice(0, 120)}`);
  console.log('  → läsvägen faller till reserven, som INTE hämtar health_score,');
  console.log('    lead_finding_json eller triage_reason. Alla score blir fallback 75.');
}

// Hur många rader HAR ett health_score? Om primären kastar spelar det ingen roll för kunden —
// men det avgör om felet är läsvägen eller data, och de kräver olika åtgärder.
try {
  const [{ totalt, med }] = await db`
    SELECT COUNT(*)::int AS totalt, COUNT(health_score)::int AS med FROM invoice_analyses
  `;
  console.log(`\n═══ DATAN SJÄLV ═══`);
  console.log(`  rader: ${totalt} · med health_score: ${med}`);
  if (med > 0 && !primarOk) {
    console.log('  → Talen FINNS i databasen. Felet är alltså LÄSVÄGEN, inte analysen.');
    console.log('    Rummet visar 75 för att det inte får se dem, inte för att de saknas.');
  }
} catch (err) { console.log(`  (kunde inte räknas: ${err.message.slice(0, 80)})`); }
