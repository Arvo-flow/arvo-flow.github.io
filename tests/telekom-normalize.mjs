// tests/telekom-normalize.mjs — låser Vallgravens hjärta: normaliseringen som gör varje växelfaktura
// till jämförbar, nivåtaggad data (kr/anv/mån exkl moms + kanonisk T1/T2/T3) + k-anonymitetslåset.
// Detta är beviset att fynd-motorn kan säga "ni betalar Y, marknaden X" utan efterhandsarbete.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  inferCanonicalTier, deriveTelekomSeats, normalizeTelekomInvoice, buildTelekomDatapoint,
  CANONICAL_TIERS, K_ANON_MIN, marketComparisonAllowed,
} from '../lib/telekom-normalize.js';

const line = (description, amount, quantity) => ({ type: 'recurring_subscription', description, amount, quantity });

describe('Telekom · kanonisk nivå-inferens (leverantörs-agnostisk)', () => {
  test('bara samtal → T1', () => {
    assert.equal(inferCanonicalTier([line('Växel-licens samtal + app', 99)]).tier, 'T1');
  });
  test('köhantering/IVR/CRM → T2', () => {
    assert.equal(inferCanonicalTier([line('Växel Proffs med köhantering och CRM-integration', 149)]).tier, 'T2');
    assert.equal(inferCanonicalTier([line('Svarsgrupp + närvaro/hänvisning', 120)]).tier, 'T2');
  });
  test('inspelning/kontaktcenter/statistik → T3 (högsta vinner)', () => {
    assert.equal(inferCanonicalTier([line('Kontaktcenter med samtalsinspelning och wallboard', 299)]).tier, 'T3');
    assert.equal(inferCanonicalTier([line('Köhantering', 100), line('Samtalsinspelning', 49)]).tier, 'T3');
  });
});

describe('Telekom · seat-härledning (anknytningar, aldrig anställda)', () => {
  test('seatCount har företräde', () => {
    assert.equal(deriveTelekomSeats({ seatCount: 30, lineItems: [] }), 30);
  });
  test('summa rad-quantity', () => {
    assert.equal(deriveTelekomSeats({ lineItems: [line('Växel', 99, 12), line('Växel extra', 99, 3)] }), 15);
  });
  test('"(N anknytningar)" ur radtext', () => {
    assert.equal(deriveTelekomSeats({ lineItems: [line('Telavox Bas (22 anknytningar)', 2178)] }), 22);
  });
  test('inget antal → null (ingen gissning)', () => {
    assert.equal(deriveTelekomSeats({ lineItems: [line('Support', 500)] }), null);
  });
});

describe('Telekom · normalisering → jämförbar enhet (kr/anv/mån exkl moms)', () => {
  test('per-användare-pris exkl moms, hårdvara exkluderad', () => {
    const r = normalizeTelekomInvoice({
      seatCount: 20,
      lineItems: [
        line('Växel Proffs köhantering', 2980),     // 149/anv × 20
        line('Bordstelefon hårdvara', 4000),         // EXKLUDERAS (hårdvara)
        line('Startavgift engångs', 1500),           // EXKLUDERAS (engångs)
      ],
    }, 'telavox');
    assert.equal(r.seats, 20);
    assert.equal(r.perUserMonthlyExVat, 149);        // 2980/20, hårdvara/engångs ej med
    assert.equal(r.canonicalTier, 'T2');
    assert.equal(r.supplier, 'telavox');
  });
  test('saknade säten → null (ingen normalisering möjlig)', () => {
    assert.equal(normalizeTelekomInvoice({ lineItems: [line('Växel', 999)] }), null);
  });
  test('robust avrundning till 2 decimaler (inga flyttalsspöken)', () => {
    const r = normalizeTelekomInvoice({ seatCount: 3, lineItems: [line('Växel samtal', 100)] }, 'telia');
    assert.equal(r.perUserMonthlyExVat, 33.33);      // 100/3 = 33.3333… → 33.33
  });
});

describe('Telekom · datapunkts-kontraktet (Vallgrav-redo: normaliserad + nivåtaggad)', () => {
  test('datapunkten bär per_user_monthly_exvat + tier (det fynd-motorn aggregerar)', () => {
    const normalized = normalizeTelekomInvoice({ seatCount: 20, lineItems: [line('Växel Proffs köhantering', 2980)] }, 'telavox');
    const dp = buildTelekomDatapoint({ normalized, industry: 'it-tech', employees: 18 });
    assert.equal(dp.category, 'molnvaxel');
    assert.equal(dp.tier, 'T2');
    assert.equal(dp.per_user_monthly_exvat, 149);
    assert.equal(dp.annualCost, 149 * 20 * 12);
    assert.equal(dp.seatCount, 20);
  });
});

describe('Telekom · k-anonymitet (integritetslåset)', () => {
  test('marknadsmedian exponeras aldrig under 5 distinkta kunder', () => {
    assert.equal(K_ANON_MIN, 5);
    assert.equal(marketComparisonAllowed(4), false);
    assert.equal(marketComparisonAllowed(5), true);
    assert.equal(marketComparisonAllowed(50), true);
  });
});

describe('Telekom · kanonisk axel är komplett', () => {
  test('T1/T2/T3 finns med etiketter', () => {
    for (const t of ['T1', 'T2', 'T3']) assert.equal(typeof CANONICAL_TIERS[t].label, 'string');
  });
});
