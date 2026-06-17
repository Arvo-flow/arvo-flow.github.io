// tests/tele2-broadband.mjs — låser Tele2-bredband-parsern + de verifierade priserna.
// Parsern (normalizeTele2Product) testas mot en RIKTIG fångad produkt från API:t (2026-06-14).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTele2Product } from '../lib/tele2-broadband.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

// Riktig produkt fångad från /api/broadband/products (Sturegatan 33, Sundbyberg, 2026-06-14).
const RAW_MAX_1200 = {
  id: 'SPECIAL_OFFER-X', parentId: 'BASE_OFFER-BBG', name: 'ATL CX 1200/100 24m419 b24',
  invoiceText: 'Bredband Max 1200/100', content: { title: 'Max 1200', productType: 'BROADBAND' },
  downstreamMbps: 1200, upstreamMbps: 100, bindingPeriodMonths: 24,
  prices: [{ type: 'MONTHLY', pricePeriod: 'MONTHLY', startMonth: 1, endMonth: 24,
    amountIncVAT: { amount: 419, currency: 'SEK' }, amountExcVAT: { amount: 335, currency: 'SEK' } }],
};
const RAW_STD_1000 = {
  name: 'ATL OL 1000/1000 12m609 b12', invoiceText: 'Bredband Standard 1000',
  content: { title: 'Standard 1000' }, downstreamMbps: 1000, upstreamMbps: 1000, bindingPeriodMonths: 12,
  prices: [{ type: 'MONTHLY', amountIncVAT: { amount: 609 }, amountExcVAT: { amount: 487 } }],
};

describe('Tele2-bredband — parser (normalizeTele2Product)', () => {
  test('Max-produkt: family, hastighet, bindning, exkl/inkl moms', () => {
    const p = normalizeTele2Product(RAW_MAX_1200);
    assert.equal(p.family, 'Max');
    assert.equal(p.downMbps, 1200);
    assert.equal(p.bindingMonths, 24);
    assert.equal(p.monthlyExcVat, 335);
    assert.equal(p.monthlyIncVat, 419);
  });

  test('Standard-produkt (öppen fiber) klassas som Standard, dyrare', () => {
    const p = normalizeTele2Product(RAW_STD_1000);
    assert.equal(p.family, 'Standard');
    assert.equal(p.downMbps, 1000);
    assert.equal(p.monthlyExcVat, 487);
  });
});

describe('Tele2-bredband — verifierade priser låsta i prisboken', () => {
  test('tele2Verified bär de live-verifierade ankarpriserna (exkl moms)', () => {
    const tv = BRANCHINDEX.bredband.tele2Verified;
    assert.ok(tv && Array.isArray(tv.verifyAddresses) && tv.verifyAddresses.length >= 3);
    assert.equal(tv.max[1200], 319);
    assert.equal(tv.max.bindingMonths, 24);
    assert.equal(tv.standard[1000], 487);
    assert.equal(tv.standard.bindingMonths, 12);
  });

  test('Standard (öppen fiber) är dyrare än Max (COAX) på samma hastighetsklass', () => {
    const tv = BRANCHINDEX.bredband.tele2Verified;
    assert.ok(tv.standard[500] > tv.max[500], 'öppen fiber ska vara dyrare än COAX');
  });
});
