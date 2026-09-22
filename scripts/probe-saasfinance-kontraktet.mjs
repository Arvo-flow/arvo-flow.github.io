#!/usr/bin/env node
// scripts/probe-saasfinance-kontraktet.mjs — KAN KUNDYTAN KONSUMERA DET BACKEND FAKTISKT PRODUCERAR?
//
// ══ VARFÖR (grundarorder 2026-09-22) ═══════════════════════════════════════════════════════
// Fältet `recommendation.fortnoxRightsizing` döptes om till `saasFinanceRightsizing` genom hela
// stacken. `tests/saasfinance-nyckeln.mjs` bevisar att de tre lagren är ÖVERENS OM NAMNET — den
// kan inte bevisa att objektet bakom namnet bär de fält kortet läser. Det är två olika frågor,
// och den andra är den som gör kortet tomt i kundens webbläsare.
//
// ══ MÄTNINGEN — och varför den inte är cirkulär ════════════════════════════════════════════
// Kravlistan HÄRLEDS ur kundytans egen källkod (varje `rs.<fält>` i kortets JSX), aldrig ur en
// lista i den här filen. Värdena kommer ur en KÖRD `recommend()` på en riktig fakturaform, en per
// leverantör i motorn. Ingen sida matar den andra: ytan säger vad den behöver, pipelinen svarar
// vad den har, och sonden jämför.
//
// ══ MOTPROV (Noll-inferens, amendemang 1) ══════════════════════════════════════════════════
//   · Sonden måste HITTA fält att kräva (≥ 5). En tom kravlista är grön av tomhet.
//   · Ett påhittat fält (`rs.__motprov_saknas__`) måste rapporteras som SAKNAS — annars kan
//     jämförelsen bara svara «allt finns», och då mäter den ingenting.
//
// ══ UTTALAD BLINDFLÄCK ═════════════════════════════════════════════════════════════════════
// Sonden bevisar att fälten FINNS och är icke-tomma. Den bevisar inte att React renderar kortet
// (det gör `npm run build` + en skärmdump, regel 8), och den ser inte fält som läses via
// strängindex eller destrukturering (`const { vendor } = rs`).

import { readFileSync } from 'node:fs';
import { recommend } from '../agents/recommender/recommend.js';

const YTAN = readFileSync(new URL('../src/pages/TestaFaktura/index.js', import.meta.url), 'utf8');

// ── 1 · Vad kundytan KRÄVER, läst ur kundytan ───────────────────────────────────────────────
const start = YTAN.indexOf('const rs = result.recommendation.saasFinanceRightsizing;');
if (start < 0) {
  console.error('✗ hittade inte rätt-storlekskortet i kundytan — sonden kom inte fram.');
  process.exit(1);
}
// Kortet slutar där nästa kort börjar. Ett fast teckenfönster hade varit en gissning, och ett
// gissat fönster fällde DL-11 på ett tomt utsnitt 11 september.
const slut = YTAN.indexOf('{result.recommendation?.m365Rightsizing', start);
if (slut < 0) { console.error('✗ hittade inte kortets slut'); process.exit(1); }
const kortet = YTAN.slice(start, slut);
const kravda = [...new Set([...kortet.matchAll(/\brs\.(\w+)/g)].map((m) => m[1]))].sort();

console.log('\n═══ SAAS-FINANCE-KONTRAKTET · yta kontra pipeline ═══\n');
console.log(`  Kundytans kort: ${kortet.length} tecken · kräver ${kravda.length} fält`);
console.log(`  ${kravda.join(' · ')}\n`);
if (kravda.length < 5) {
  console.error(`✗ bara ${kravda.length} fält hittades — kravlistan är för tom för att bevisa något.`);
  process.exit(1);
}

// ── 2 · Vad pipelinen SVARAR, en gång per leverantör i motorn ───────────────────────────────
const faktura = (beskrivning, belopp, leverantor) => ({
  customer:    { industry: 'konsult', employees: 8 },
  categorized: { category: 'saas-finance', subType: 'affärssystem',
                 normalizedSupplier: leverantor, confidence: 0.95 },
  invoice:     { annualCost: belopp * 12, billingPeriod: 'monthly',
                 lineItems: [{ type: 'recurring_subscription', description: beskrivning, amount: belopp }] },
});

const FALL = [
  { namn: 'Fortnox Paket Stor',          indata: faktura('Fortnox Paket Stor', 710, 'Fortnox') },
  { namn: 'Visma eEkonomi Skala (Spiris)', indata: faktura('Visma eEkonomi Skala', 549, 'Spiris') },
];

let fel = 0;
for (const f of FALL) {
  const r = await recommend(f.indata);
  const rs = r?.saasFinanceRightsizing;
  if (!rs) {
    // Ett `null` här är ETT SVAR om fallet, inte ett mätfel — men sonden får aldrig låta det
    // se ut som «kontraktet håller». Den räknar det som ett fel och säger vilket.
    console.log(`  ✗ ${f.namn}: saasFinanceRightsizing = ${rs === null ? 'null' : typeof rs}`);
    fel++; continue;
  }
  const saknas = kravda.filter((k) => rs[k] === undefined || rs[k] === null || rs[k] === '');
  const gammal = r.fortnoxRightsizing !== undefined;
  console.log(`  ${saknas.length === 0 && !gammal ? '✓' : '✗'} ${f.namn}`);
  console.log(`      vendor=${rs.vendor} · ${rs.currentPaket} ${rs.currentMonthly} kr/mån → `
    + `${rs.targetPaket} ${rs.targetMonthly} kr/mån · ${rs.annualSaving} kr/år`);
  console.log(`      kundytans ${kravda.length} fält: ${saknas.length === 0 ? 'alla bär värde'
    : `SAKNAS ${saknas.join(', ')}`}`);
  if (gammal) { console.log('      ✗ det gamla fältet fortnoxRightsizing finns kvar i svaret'); fel++; }
  if (saknas.length) fel++;

  // MOTPROV: jämförelsen måste kunna svara «saknas». Kan den inte det mäter den ingenting.
  if ([...kravda, '__motprov_saknas__'].filter((k) => rs[k] === undefined).length !== 1) {
    console.error('\n✗ MOTPROVET FÖLL: sonden rapporterar inte ett påhittat fält som saknat.');
    process.exit(1);
  }
}

console.log(`\n  Motprov: ett påhittat fält rapporteras som saknat ✓`);
console.log(`\n[probe-saasfinance-kontraktet] ${fel === 0 ? 'KONTRAKTET HÅLLER' : `${fel} FEL`}\n`);
process.exit(fel === 0 ? 0 : 1);
