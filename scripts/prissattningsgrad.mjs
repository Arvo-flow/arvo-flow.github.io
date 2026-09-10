#!/usr/bin/env node
// scripts/prissattningsgrad.mjs — VAD KOSTAR VÅRA GRINDAR?
//
// ══ VARFÖR (2026-09-10, Fable 5.1:s spricka 8 — «den enskilt viktigaste raden») ═════════════
// Revisionsgrind, LFL-grind, avstämningsveto, totalgrind, FX-grind, sanitetsvakt, balanskrav,
// Ring 1. Var och en är individuellt oantastlig, och var och en har ett testfall som bevisar att
// den fäller rätt sak. **Ingen mäter deras samlade pris.**
//
// Grundarens KPI är «prissatta av 25». Sviten har över 2 300 tester och inte ett enda som säger
// hur många fakturor som TYSTAS. En ny grind kan alltså merga med noll fällda tester och sänka
// prissättningsgraden trettio procent — och ingen ser det förrän en människa räknar i rummet.
//
// Det är också veckans återkommande felmönster i sin systemiska form: varje fix verifierades mot
// fallet som avslöjade buggen, och GRANNFALLET hittades av nästa mätning. Den här mätaren gör
// grannfallet till något maskinen ställer, inte något granskaren hoppas komma på.
//
// ── VAD DEN MÄTER, OCH VAD DEN INTE MÄTER ──────────────────────────────────────────────────
// MÄTER: fixturkorpusen (tests/fixtures/01–08), som bär VERKLIGA radposter, genom den riktiga
//   `recommend()` med stubbad AI och stubbad FX. Alltså exakt de deterministiska grindarna.
// MÄTER INTE: extraktionen. Fixturerna är författade på radpostnivå, så modellens läsfel syns
//   inte här — och de 75 riktiga PDF:erna kan inte köras i CI (två Opus-anrop styck, ~45 USD per
//   körning). Prissättningsgraden på VERKLIGA fakturor är därför en separat, dyrare mätning.
//   Att blanda ihop de två vore att påstå en täckning vi inte har.
//
// Kör:  node scripts/prissattningsgrad.mjs           (skriver tabellen)
//       node scripts/prissattningsgrad.mjs --update  (skriver om facit — granska diffen!)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { deklarera } from '../lib/sondkontrakt.js';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { recommend } from '../agents/recommender/recommend.js';

deklarera({
  namn: 'prissattningsgrad',
  fangar: 'Att en ny grind sänker andelen fakturor som får ett prissatt svar. Mäter utfallet per '
    + 'fixtur genom den riktiga recommend() och jämför mot ett committat facit, så en regression '
    + 'syns som ett TAL och inte som en känsla.',
  blind: 'Extraktionen. Fixturerna är författade på radpostnivå, så ett läsfel i modellen kan '
    + 'aldrig synas här — mätaren ser bara vad grindarna gör med korrekt avlästa rader. Den vet '
    + 'heller ingenting om de 75 riktiga PDF:erna, som kräver modellanrop och därför inte kan '
    + 'köras i CI. En grön mätare betyder «grindarna kostar lika mycket som igår», aldrig «kunden '
    + 'får ett svar».',
});

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FACIT = join(ROT, 'tests/fixtures/prissattningsgrad-facit.json');

const stubAi = { messages: { create: async () => ({
  content: [{ type: 'tool_use', input: { shouldSwitch: false, recommendationType: 'no_action', reasoning: 'Analys klar.' } }],
  usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
}) } };
// Stubbad FX med en RIKTIG källa och dagens datum — annars spärrar FX-grinden varje fixtur och
// mätaren mäter sin egen spärr i stället för grindarna. (Det felet gjorde jag först.)
const stubKv = { get: async () => ({ rate: 10.5, source: 'riksbank', date: new Date().toISOString().slice(0, 10), fetchedAt: new Date().toISOString() }) };

const FILER = ['01-mobil', '02-bredband', '03-combined', '04-el', '05-saas',
  '06-skrivarleasing', '07-edge-cases', '08-realistic'];

/** Fyra utfall som INTE får se likadana ut. «Kunde inte köras» är aldrig «tystad». */
const utfall = { prissatt: [], tystad: [], offert: [], fel: [] };

for (const f of FILER) {
  const { fixtures } = await import(join(ROT, 'tests/fixtures', `${f}.mjs`));
  for (const fx of fixtures) {
    try {
      const metrics = computeInvoiceMetrics(fx.lineItems, fx.category, fx.mixed ?? false);
      const arskostnad = (fx.lineItems ?? []).reduce((s, l) => s + (l.amount ?? 0), 0) * 12;
      const r = await recommend({
        customer: { industry: fx.industry ?? 'konsult', employees: fx.employees ?? 5 },
        categorized: { category: fx.category, confidence: 0.95, normalizedSupplier: fx.supplier ?? 'X' },
        invoice: {
          amount: arskostnad / 12, annualCost: arskostnad, billingPeriod: 'monthly',
          lineItems: fx.lineItems, seatCount: fx.seatCount ?? null,
          primaryComponentMonthly: metrics.primaryComponentMonthly,
          secondaryComponentMonthly: metrics.secondaryComponentMonthly ?? null,
          potentialMixedCategories: fx.mixed ?? false,
        },
      }, { client: stubAi, kvStore: stubKv });
      const har = r.shouldSwitch || (r.savingPerYear ?? 0) > 0 || (r.optimizationSaving ?? 0) > 0;
      if (r.requiresQuote) utfall.offert.push(fx.id);
      else if (har) utfall.prissatt.push(fx.id);
      else utfall.tystad.push(fx.id);
    } catch (err) {
      // Ett fel är ett FEL, aldrig en tystnad. Att räkna det som «tystad» hade gjort en krasch
      // omöjlig att skilja från ett medvetet beslut — hela obduktionens felfamilj i en mätare.
      utfall.fel.push(`${fx.id}: ${err.message.slice(0, 60)}`);
    }
  }
}

const n = utfall.prissatt.length + utfall.tystad.length + utfall.offert.length + utfall.fel.length;
const sammanfattning = {
  fixturer: n,
  prissatt: utfall.prissatt.length,
  tystad: utfall.tystad.length,
  offert: utfall.offert.length,
  fel: utfall.fel.length,
};

console.log('\n=== PRISSÄTTNINGSGRAD · fixturkorpusen genom riktiga recommend() ===\n');
for (const [k, v] of Object.entries(sammanfattning)) {
  const andel = k === 'fixturer' ? '' : `  (${((v / n) * 100).toFixed(1)} %)`;
  console.log(`  ${k.padEnd(10)} ${String(v).padStart(4)}${andel}`);
}
if (utfall.fel.length) {
  console.log('\n  FEL (räknas ALDRIG som tystnad):');
  for (const f of utfall.fel.slice(0, 8)) console.log(`    ${f}`);
  if (utfall.fel.length > 8) console.log(`    … och ${utfall.fel.length - 8} till`);
}

if (process.argv.includes('--update')) {
  writeFileSync(FACIT, `${JSON.stringify({ matt: new Date().toISOString().slice(0, 10), ...sammanfattning }, null, 2)}\n`);
  console.log(`\n✓ Facit skrivet: ${FACIT}`);
  console.log('  GRANSKA DIFFEN. Ett facit som anpassas till koden är ingen mätning längre.');
} else {
  let facit = null;
  try { facit = JSON.parse(readFileSync(FACIT, 'utf8')); } catch { /* saknas → första körningen */ }
  if (!facit) {
    console.log('\n⚠ Inget facit finns än. Kör med --update för att frysa dagens tal.');
  } else if (facit.prissatt !== sammanfattning.prissatt) {
    const delta = sammanfattning.prissatt - facit.prissatt;
    console.log(`\n✗ PRISSÄTTNINGSGRADEN ÄNDRADES: ${facit.prissatt} → ${sammanfattning.prissatt} (${delta > 0 ? '+' : ''}${delta})`);
    console.log('  Är ändringen avsedd: kör --update och REDOVISA talet i commit-meddelandet.');
    process.exit(1);
  } else {
    console.log(`\n✓ Oförändrad mot facit (${facit.prissatt} prissatta, fryst ${facit.matt}).`);
  }
}
