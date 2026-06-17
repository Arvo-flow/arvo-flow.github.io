// tests/fortnox-recommendation.mjs — DEDIKERAD revisionssvit för saas-finance (Fortnox).
// Låser rätt-storleks-rådgivningens aritmetik: den enda kundsynliga siffran är skillnaden
// mellan två VERIFIERADE publika Fortnox-listpriser (BRANCHINDEX.fortnoxVerified). Advisory/
// review — ingen besparing påstås förrän kunden bekräftat att behovet ryms. Detta är beviset
// som revisionsgrinden kräver innan saas-finance får tala (lib/revision-gate.js).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { detectFortnoxPaket, fortnoxRightsizing } from '../lib/fortnox-rightsizing.js';
import { recommend } from '../agents/recommender/recommend.js';

const inv = (desc, amount = null) => [{ type: 'recurring_subscription', description: desc, amount }];

describe('Fortnox · paket-igenkänning', () => {
  test('känner igen "Fortnox Paket Stor"', () => {
    const p = detectFortnoxPaket(inv('Fortnox Paket Stor', 710));
    assert.equal(p.name, 'Stor'); assert.equal(p.monthly, 710); assert.equal(p.billedMonthly, 710);
  });
  test('känner igen Mini/Liten/Mellan', () => {
    assert.equal(detectFortnoxPaket(inv('Fortnox Mini')).name, 'Mini');
    assert.equal(detectFortnoxPaket(inv('Paket Liten')).name, 'Liten');
    assert.equal(detectFortnoxPaket(inv('Fortnox paket Mellan')).name, 'Mellan');
  });
  test('rad UTAN fortnox/paket-ord ger ingen falsk träff (t.ex. "Stor skärm")', () => {
    assert.equal(detectFortnoxPaket(inv('Stor skärm 27 tum', 2000)), null);
  });
  test('okänd rad → null', () => {
    assert.equal(detectFortnoxPaket(inv('Microsoft 365 Business', 130)), null);
    assert.equal(detectFortnoxPaket([]), null);
  });
});

describe('Fortnox · rätt-storleks-rådgivning (verifierad prisskillnad)', () => {
  test('Stor → Mellan: 220 kr/mån × 12 = 2 640 kr/år', () => {
    const r = fortnoxRightsizing(inv('Fortnox Paket Stor', 710));
    assert.equal(r.currentPaket, 'Stor');
    assert.equal(r.targetPaket, 'Mellan');
    assert.equal(r.deltaMonthly, 220);
    assert.equal(r.annualSaving, 2640);
    assert.equal(r.needsReview, true);
  });
  test('Mellan → Liten: 141 kr/mån × 12 = 1 692 kr/år', () => {
    const r = fortnoxRightsizing(inv('Fortnox Paket Mellan', 490));
    assert.equal(r.targetPaket, 'Liten');
    assert.equal(r.deltaMonthly, 141);
    assert.equal(r.annualSaving, 1692);
  });
  test('Liten → Mini: 140 kr/mån × 12 = 1 680 kr/år', () => {
    const r = fortnoxRightsizing(inv('Paket Liten', 349));
    assert.equal(r.targetPaket, 'Mini');
    assert.equal(r.annualSaving, 1680);
  });
  test('Mini → null (redan billigaste paketet, inget att nedgradera)', () => {
    assert.equal(fortnoxRightsizing(inv('Fortnox Mini', 209)), null);
  });
  test('inget igenkänt paket → null (ingen estimerad siffra når kund)', () => {
    assert.equal(fortnoxRightsizing(inv('Visma eEkonomi Pro', 400)), null);
  });
  test('reviewPrompt + note bär de verifierade talen (ingen siffra utan källa)', () => {
    const r = fortnoxRightsizing(inv('Fortnox Paket Stor', 710));
    assert.match(r.reviewPrompt, /Stor \(710 kr\/mån\)/);
    assert.match(r.reviewPrompt, /Mellan, kostar 490 kr\/mån/);
    assert.match(r.reviewPrompt, /220 kr\/mån billigare/);
    assert.match(r.reviewPrompt, /realiserar vi 2640 kr\/år/);
    assert.match(r.note, /fortnox\.se\/produkt\/prislista/);
    assert.match(r.note, /Förutsätter att behovet ryms i Mellan/);
  });
});

describe('Fortnox · recommend() end-to-end (deterministisk, ingen AI)', () => {
  const fortnoxInvoice = (desc, amount) => ({
    customer:    { industry: 'konsult', employees: 10 },
    categorized: { category: 'saas-finance', subType: 'affärssystem', normalizedSupplier: 'Fortnox', confidence: 0.95 },
    invoice:     { annualCost: amount * 12, billingPeriod: 'monthly', lineItems: [{ type: 'recurring_subscription', description: desc, amount }] },
  });

  test('Fortnox Stor → komplett rätt-storleks-rekommendation (Mellan, 2 640 kr/år potential)', async () => {
    const r = await recommend(fortnoxInvoice('Fortnox Paket Stor', 710));
    assert.equal(r.recommendationType, 'optimize');
    assert.equal(r.requiresQuote, false);
    assert.equal(r.shouldSwitch, false);
    assert.equal(r.suggestedSupplier, 'Fortnox Mellan');
    assert.equal(r.revisionGate, 'audited');
    assert.ok(r.fortnoxRightsizing, 'fortnoxRightsizing-data ska finnas');
    assert.equal(r.fortnoxRightsizing.targetPaket, 'Mellan');
    assert.equal(r.fortnoxRightsizing.annualSaving, 2640);
    assert.equal(r.fortnoxRightsizing.needsReview, true);
    // Advisory/review: ingen påstådd realiserad besparing förrän kunden bekräftat.
    assert.equal(r.optimizationSaving, null);
    assert.equal(r.savingPerYear, null);
    assert.equal(r.grossSaving, null);
    assert.match(r.reasoning, /2640 kr\/år/);
  });

  test('Fortnox Mini → optimize men ingen nedgradering (redan billigast) → offert-läge', async () => {
    const r = await recommend(fortnoxInvoice('Fortnox Mini', 209));
    assert.equal(r.requiresQuote, true);
    assert.equal(r.fortnoxRightsizing, null);
    assert.equal(r.optimizationSaving, null);
  });

  test('Okänt bokföringssystem (ej Fortnox-paket) → talfritt offert-läge, INGEN estimerad siffra', async () => {
    const r = await recommend(fortnoxInvoice('Visma eEkonomi Smart', 400));
    assert.equal(r.requiresQuote, true);
    assert.equal(r.revisionGate, 'audited');
    assert.equal(r.fortnoxRightsizing, null);
    assert.equal(r.suggestedAnnualCost, null);
    assert.equal(r.savingPerYear, null);
    assert.ok(!/\d/.test(r.reasoning), 'offert-copy ska vara talfri');
  });
});
