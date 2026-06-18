// tests/adobe-rightsizing.mjs — låser Adobe SKU/tier-detektering + rätt-storlek (All Apps → Single App).
// Zero Trust: team-priser ankras direkt (exkl moms), individpriser de-momsas (÷1,25). En team-faktura
// jämförs ALDRIG mot individpris (= falsk SKU-besparing). Enda kundsynliga siffran = verifierad prisskillnad.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { detectAdobePlan, adobeListExVat, adobeRightsizing, deriveAdobeSeats } from '../lib/adobe-rightsizing.js';

const line = (description, amount = null, quantity = null) => ({ type: 'recurring_subscription', description, amount, quantity });

describe('Adobe · SKU + tier-detektering', () => {
  test('Team All Apps känns igen (sku=team, tier=all-apps)', () => {
    const p = detectAdobePlan([line('Adobe Creative Cloud for Teams - Alla program (4 licenser)')]);
    assert.equal(p.sku, 'team'); assert.equal(p.tier, 'all-apps');
  });
  test('Individ namngivet program → individual single-app', () => {
    const p = detectAdobePlan([line('Adobe Photoshop (1 licens)')]);
    assert.equal(p.sku, 'individual'); assert.equal(p.tier, 'single-app');
  });
  test('Team Single App (Fristående) → team single-app', () => {
    const p = detectAdobePlan([line('Adobe Creative Cloud Team - Fristående program (3 lic)')]);
    assert.equal(p.sku, 'team'); assert.equal(p.tier, 'single-app');
  });
  test('Team Acrobat Pro → team acrobat', () => {
    const p = detectAdobePlan([line('Adobe Acrobat Pro för team (2 licenser)')]);
    assert.equal(p.sku, 'team'); assert.equal(p.tier, 'acrobat');
  });
  test('Icke-Adobe rad → null', () => {
    assert.equal(detectAdobePlan([line('Microsoft 365 Business Standard')]), null);
  });
});

describe('Adobe · verifierat EXKL-moms listpris (team direkt, individ ÷1,25)', () => {
  test('Team-priser ankras direkt (redan exkl moms)', () => {
    assert.equal(adobeListExVat('team', 'all-apps'), 985);
    assert.equal(adobeListExVat('team', 'single-app'), 381);
    assert.equal(adobeListExVat('team', 'acrobat'), 273);
  });
  test('Individpriser de-momsas (÷1,25) → rena exkl-tal', () => {
    assert.equal(adobeListExVat('individual', 'all-apps'), 746);     // 932,50 ÷ 1,25
    assert.equal(adobeListExVat('individual', 'single-app'), 249);   // 311,25 ÷ 1,25
    assert.equal(adobeListExVat('individual', 'acrobat'), 172);      // 215,00 ÷ 1,25
  });
});

describe('Adobe · rätt-storlek (All Apps → Single App, verifierad prisskillnad)', () => {
  test('Team All Apps × 4 → Single App: 604 kr/licens/mån × 12 × 4 = 28 992 kr/år', () => {
    const r = adobeRightsizing([line('Adobe Creative Cloud for Teams - Alla program', null, 4)], 4);
    assert.equal(r.sku, 'team');
    assert.equal(r.currentMonthlyExVat, 985);
    assert.equal(r.targetMonthlyExVat, 381);
    assert.equal(r.perSeatDelta, 604);
    assert.equal(r.seats, 4);
    assert.equal(r.annualSaving, 28992);
    assert.equal(r.needsReview, true);
  });
  test('Individ All Apps × 3 → Single App (de-momsat): 497 kr/anv/mån × 12 × 3 = 17 892 kr/år', () => {
    const r = adobeRightsizing([line('Adobe Creative Cloud Alla program', null, 3)], 3);
    assert.equal(r.sku, 'individual');
    assert.equal(r.currentMonthlyExVat, 746);
    assert.equal(r.targetMonthlyExVat, 249);
    assert.equal(r.perSeatDelta, 497);
    assert.equal(r.annualSaving, 17892);
  });
  test('Redan Single App → ingen nedförsäljning (null)', () => {
    assert.equal(adobeRightsizing([line('Adobe Photoshop', null, 2)], 2), null);
  });
  test('reviewPrompt + note bär verifierade exkl-moms-tal + källa', () => {
    const r = adobeRightsizing([line('Adobe Creative Cloud for Teams - Alla program', null, 4)], 4);
    assert.match(r.reviewPrompt, /985,00 kr\/licens\/mån exkl moms/);
    assert.match(r.reviewPrompt, /381,00 kr\/licens\/mån exkl moms/);
    assert.match(r.reviewPrompt, /28\s*992 kr\/år/);
    assert.match(r.note, /adobe\.com\/se/);
    assert.match(r.note, /Förutsätter att behovet ryms i ett enskilt program/);
  });
});

describe('Adobe · seat-härledning (kod räknar, aldrig employees)', () => {
  test('seatCount > quantity > "(N lic)"', () => {
    assert.equal(deriveAdobeSeats({ seatCount: 7, lineItems: [] }), 7);
    assert.equal(deriveAdobeSeats({ lineItems: [line('Adobe CC', null, 5)] }), 5);
    assert.equal(deriveAdobeSeats({ lineItems: [line('Adobe Creative Cloud (6 licenser)')] }), 6);
    assert.equal(deriveAdobeSeats({ lineItems: [line('Adobe CC utan antal')] }), null);
  });
});
