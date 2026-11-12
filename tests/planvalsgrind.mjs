// tests/planvalsgrind.mjs — PG · fakturavägen räknar inget byte mot kategorins golv utan bekräftad produkt.
//
// Grundarbeslut 2026-11-04 («stäng av vid källan»): mobilens bytesmål var kategorins golv, så 349-planen
// till exakt listpris lagrades med «byte till 269» och 9 600 kr. Omläggning 11 nov (ops/KORPLAN-VAG1.md, S1):
// grinden är ett hölje runt hela recommend(), sekundärvägen räknar ingen bredbandsdel på en mobilfaktura, och
// inga delar lagras. Hela kedjan prövas av tests/fakturakedjan.mjs (FV); här prövas grinden själv.
//
// FÅNGAR: ett mobilbyte mot golvet, oavsett modellens svar; en text som erbjuder bytet; en poäng mot golvet;
//   att lagrade delar kommer tillbaka.
// BLIND: spegelfallet, en bredbandsfaktura med mobil som sekundär del (lib/secondary-savings.js), räknas
//   fortfarande mot mobilens golv; det är steg S6. Korpusens utfall prövas av prissattningsgraden.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { recommend, PLANVALS_MENING, BREDBAND_EJ_PRISSATT } from '../agents/recommender/recommend.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { VALFRIA_KOLUMNER } from '../lib/invoice-store.js';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { computeSecondarySaving } from '../lib/secondary-savings.js';

const las = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const stubAi = (sw) => ({ messages: { create: async () => ({
  content: [{ type: 'tool_use', input: { shouldSwitch: sw, recommendationType: sw ? 'switch' : 'no_action', reasoning: 'Analys klar.' } }],
  usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
}) } });
const stubKv = { get: async () => ({ rate: 10.5, source: 'riksbank', date: new Date().toISOString().slice(0, 10), fetchedAt: new Date().toISOString() }) };
async function kor({ category, lineItems, seatCount = null, mixed = false, sw = false, supplier = 'Tele2' }) {
  const metrics = computeInvoiceMetrics(lineItems, category, mixed);
  const arskostnad = lineItems.reduce((s, l) => s + (l.amount ?? 0), 0) * 12;
  return recommend({
    customer: { industry: 'konsult', employees: 10 },
    categorized: { category, confidence: 0.95, normalizedSupplier: supplier },
    invoice: { amount: arskostnad / 12, annualCost: arskostnad, billingPeriod: 'monthly', lineItems, seatCount,
      primaryComponentMonthly: metrics.primaryComponentMonthly, secondaryComponentMonthly: metrics.secondaryComponentMonthly ?? null,
      potentialMixedCategories: mixed },
  }, { client: stubAi(sw), kvStore: stubKv });
}
const XL10 = { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL', quantity: 10, unitPrice: 349, amount: 3490 };

describe('PG · planvalsgrinden i fakturavägen (grundarbeslut 2026-11-04)', () => {
  test('PG-01 · ett mobilbyte mot kategorins golv räknas inte, oavsett vad modellen svarar', async () => {
    for (const sw of [false, true]) {
      const r = await kor({ category: 'mobil', lineItems: [XL10], seatCount: 10, sw });
      assert.equal(r.shouldSwitch, false, `modellen svarade ${sw}`);
      assert.equal(r.savingPerYear, 0);
      assert.equal(r.suggestedAnnualCost, null);
      assert.ok(typeof r.planvalsgrind === 'string' && r.planvalsgrind.length > 20, 'grinden bokför sitt skäl');
      assert.equal(r.reasoning, PLANVALS_MENING, `modellen svarade ${sw}: dess egen text nådde kunden`);
    }
    assert.doesNotMatch(PLANVALS_MENING, /\d/, 'meningen bär inga tal');
    assert.equal(PLANVALS_MENING, 'Vi jämför inte era mobilabonnemang mot det billigaste publicerade abonnemanget, '
      + 'eftersom vi inte vet vilket abonnemang ni har. Ett billigare abonnemang kan vara en annan produkt, med mindre '
      + 'surf eller färre tjänster.');
    assert.equal(BRANCHINDEX.mobil.bytesmalMotKategorigolv, true, 'premissen: mobil bär deklarationen');
  });

  test('PG-02 · MOTPROV: samma faktura utan deklarationen räknar bytet, så det är grinden som tystar', async () => {
    const mobil = BRANCHINDEX.mobil;
    const fore = mobil.bytesmalMotKategorigolv;
    try {
      mobil.bytesmalMotKategorigolv = false;
      const r = await kor({ category: 'mobil', lineItems: [XL10], seatCount: 10, sw: true });
      assert.equal(r.planvalsgrind, undefined);
      assert.equal(r.shouldSwitch, true, 'utan grinden räknas inget byte; testet kan inte skilja grinden från en tystnad');
      assert.equal(r.savingPerYear, (349 - 269) * 12 * 10, 'planvalet: 349-planen mot 269-planen');
    } finally {
      mobil.bytesmalMotKategorigolv = fore;
    }
  });

  test('PG-03 · en kombinerad mobilfaktura får inget byte, och texten säger att bredbandet inte är prissatt', async () => {
    // Omläggning 11 nov (ops/KORPLAN-VAG1.md, S1): bredbandsdelen prissätts inte förrän den byggs som egen
    // del. Fakturavägen räknar ingen sekundär besparing på en mobilfaktura (FV-A2), och kunden får veta det.
    const rader = [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', quantity: 5, unitPrice: 349, amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband 250/250 Mbit/s', amount: 549 },
    ];
    for (const sw of [true, false]) {
      const r = await kor({ category: 'mobil', lineItems: rader, seatCount: 5, mixed: true, sw });
      assert.equal(r.shouldSwitch, false, `modellen svarade ${sw}`);
      assert.equal(r.healthScore, null, 'poängen räknades mot kategorins golv');
      assert.equal(r.reasoning, `${PLANVALS_MENING} ${BREDBAND_EJ_PRISSATT}`);
    }
    assert.equal(BREDBAND_EJ_PRISSATT, 'Bredbandet på samma faktura har vi inte jämfört mot listpris i den här analysen.');
    // Utan bredbandsdel står planvalsmeningen ensam.
    const ren = await kor({ category: 'mobil', lineItems: [XL10], seatCount: 10, sw: true });
    assert.equal(ren.reasoning, PLANVALS_MENING);
    // Premissen: sekundärvägen hade räknat en bredbandsbesparing här, så det är grinden som tystar.
    const metrics = computeInvoiceMetrics(rader, 'mobil', true);
    const sek = computeSecondarySaving({ metrics, category: 'mobil', potentialMixedCategories: true, industry: 'konsult', employees: 10 });
    assert.ok(sek?.grossSaving > 0);
    assert.match(las('api/test-invoice.mjs'),
      /const secondarySaving = \(extracted\.prispastaendeSparrat \|\| planvalsKategori\) \? null : computeSecondarySaving\(/);
  });

  test('PG-04 · grinden är ett hölje runt hela recommend(), och den inre grenen finns inte', () => {
    const src = las('agents/recommender/recommend.js');
    assert.match(src, /const svar = planvalsgrind\(input, await recommendUtanValutagrind\(input, opts\)\);/);
    assert.equal((src.match(/\?\.bytesmalMotKategorigolv/g) ?? []).length, 1, 'deklarationen läses på ett ställe');
  });
});

describe('BD · bytets delar lagras inte längre (omläggning 11 nov)', () => {
  test('BD-05 · ingen modul, ingen kolumn och ingen läsning av lagrade delar', () => {
    assert.throws(() => las('lib/bytesdelar.js'), /ENOENT/);
    for (const f of ['scripts/migrate.mjs', 'lib/invoice-store.js', 'api/invoice-history.mjs', 'api/test-invoice.mjs',
      'lib/lagesregister.js']) {
      assert.doesNotMatch(las(f), /bytesdelar/, `${f} bär bytesdelar`);
    }
    assert.ok(!VALFRIA_KOLUMNER.some(([k]) => k === 'bytesdelar_json'));
  });
});
