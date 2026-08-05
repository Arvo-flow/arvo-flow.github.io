// tests/m365-rightsizing.mjs — DEDIKERAD svit för M365 rätt-storlek (saas-productivity).
// Den sista skruven i M365-historien: enterprise-tiers (E3/E5) → Business Premium för SMF.
// Låser den enda kundsynliga siffran — skillnaden mellan TVÅ verifierade publika SEK-listpriser
// (BRANCHINDEX M365-tiers, vaktade av lib/verifiers/m365.mjs). Advisory/review: optimizationSaving
// förblir null tills kunden bekräftat funktionsbehovet. Ingen FX, ingen estimerad siffra.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { m365Rightsizing, deriveM365Seats } from '../lib/m365-rightsizing.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

describe('M365 rätt-storlek · seat-härledning (kod räknar, aldrig employees)', () => {
  test('seatCount har företräde', () => {
    assert.equal(deriveM365Seats({ seatCount: 42, lineItems: [] }), 42);
  });
  test('summa av rad-quantity', () => {
    assert.equal(deriveM365Seats({ lineItems: [
      { type: 'recurring_subscription', description: 'M365 E5', quantity: 18 },
      { type: 'recurring_subscription', description: 'M365 E5 extra', quantity: 4 },
    ] }), 22);
  });
  test('"(N användare)" ur radtext när quantity saknas', () => {
    assert.equal(deriveM365Seats({ lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E5 (25 användare)' },
    ] }), 25);
  });
  test('inget licensantal → null (ingen gissning)', () => {
    assert.equal(deriveM365Seats({ lineItems: [{ type: 'recurring_subscription', description: 'Support' }] }), null);
    assert.equal(deriveM365Seats({}), null);
  });
});

describe('M365 rätt-storlek · verifierad prisskillnad (E3/E5 → Business Premium)', () => {
  test('verifierade ankarpriser bär (E5 641,18 · E3 416,77 · Premium 210,29)', () => {
    const t = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
    assert.equal(t.e5.msrpAnnual, 641.18);
    assert.equal(t.e3.msrpAnnual, 416.77);
    assert.equal(t['business-premium'].msrpAnnual, 210.29);
  });

  test('E5 × 25 → Business Premium: 430,89 kr/anv/mån × 12 × 25 = 129 267 kr/år', () => {
    const r = m365Rightsizing('e5', 25);
    assert.equal(r.currentTier, 'e5');
    assert.equal(r.targetTier, 'business-premium');
    assert.equal(r.currentPerSeatMonthly, 641.18);
    assert.equal(r.targetPerSeatMonthly, 210.29);
    assert.equal(r.perSeatDelta, 430.89);
    assert.equal(r.seats, 25);
    assert.equal(r.annualSaving, 129267);
    assert.equal(r.needsReview, true);
    assert.equal(r.annualSavingLabel.replace(/\s/g, ''), '129267');
  });

  test('E3 × 40 → Business Premium: 206,48 × 12 × 40 = 99 110 kr/år', () => {
    const r = m365Rightsizing('e3', 40);
    assert.equal(r.targetTier, 'business-premium');
    assert.equal(r.perSeatDelta, 206.48);
    assert.equal(r.annualSaving, 99110);            // round(206.48 × 12 × 40)
  });

  test('reviewPrompt + note bär de verifierade talen + källa (ingen siffra utan källa)', () => {
    const r = m365Rightsizing('e5', 25);
    assert.match(r.reviewPrompt, /Microsoft 365 E5 \(641,18 kr/);
    assert.match(r.reviewPrompt, /Business Premium \(210,29 kr/);
    assert.match(r.reviewPrompt, /129\s*267 kr\/år/);
    assert.match(r.note, /430,89 kr\/användare\/månad × 12 × 25/);
    assert.match(r.note, /microsoft\.com/);
    assert.match(r.note, /Förutsätter att behovet inte kräver enterprise-funktionerna/);
  });
});

describe('M365 rätt-storlek · gränser (precision eller tystnad)', () => {
  test('Business Premium/Standard/Basic → null (ingen enterprise-nedförsäljning)', () => {
    assert.equal(m365Rightsizing('business-premium', 50), null);
    assert.equal(m365Rightsizing('business-standard', 20), null);
    assert.equal(m365Rightsizing('business-basic', 10), null);
  });
  test('Google-tier → null (M365-skruven gäller bara M365)', () => {
    assert.equal(m365Rightsizing('google-plus', 8), null);
  });
  test('över SMF-taket (>300 säten) → null; exakt 300 är OK (gräns inklusive)', () => {
    assert.equal(m365Rightsizing('e5', 500), null);
    assert.equal(m365Rightsizing('e5', 301), null);
    assert.ok(m365Rightsizing('e5', 300), 'exakt 300 säten ska ge rådgivning');
  });
  test('saknade/ogiltiga säten → null', () => {
    assert.equal(m365Rightsizing('e5', null), null);
    assert.equal(m365Rightsizing('e5', 0), null);
    assert.equal(m365Rightsizing('e5', -3), null);
  });
});
