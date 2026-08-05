// tests/plan-pris.mjs — låser PLANPRIS-EXTRAKTIONEN (fabrikens delade primitiv).
//
// Grundfyndet 2026-08-05: Microsofts prissida listade tre SKU:er under samma plannamn —
// den rena planen, "… OCH Microsoft 365 Copilot för företag" (dyrare) och "… EES (exkl. Teams)"
// (billigare). En verifierare som tar första bästa tal bredvid plannamnet ankrar kundens rena
// licens mot ett paket eller en nedbantad variant. Felet går åt BÅDA håll och är osynligt i
// utfallet: priset ser rimligt ut. Varje leverantör som säljer tillägg gör detta förr eller senare.
//
// Primitiven ska hellre säga "(saknas)" än gissa fel SKU — men den får inte tystna av FEL skäl:
// ett för brett kontextfönster förkastar rena träffar bara för att grannplanen nämner ett paket.
// Båda felriktningarna är låsta här.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { planPriceFromText, FORBJUDEN_KONTEXT_STANDARD } from '../lib/verifiers/core.mjs';

const MS_SIDA = 'Business Standard and Microsoft 365 Copilot for business $224.63 per user/month, '
  + 'billed annually. Business Standard $133.82 per user/month, billed annually.';

describe('planPriceFromText · paketfällan (Copilot)', () => {
  test('tar den RENA planens pris, aldrig paketpriset', () => {
    const r = planPriceFromText(MS_SIDA, 'Business Standard');
    assert.equal(r.value, 133.82);
    assert.equal(r.forkastade.length, 1, 'paketträffen ska ha förkastats explicit');
  });

  test('paket FÖRE ren plan får inte förgifta den rena träffen (överförkastning)', () => {
    // Den tidigare implementationen läste 60 tecken FÖRE plannamnet och förkastade därför även
    // den rena träffen — tystnad av fel skäl. Fönstret prövas nu mellan namnet och priset.
    assert.equal(planPriceFromText(MS_SIDA, 'Business Standard').value, 133.82);
  });

  test('variantfällan: EES (exkl. Teams) hoppas över till förmån för full plan', () => {
    const t = 'Business Basic EES (exkl. Teams) $51.61 per user Business Basic $66.91 per user';
    assert.equal(planPriceFromText(t, 'Business Basic').value, 66.91);
  });

  test('kampanjpris förkastas — en rabattperiod är inte marknadens pris', () => {
    const t = 'Pro 50% off for 3 months $4.38 per user Pro $7.25 per user, billed annually';
    assert.equal(planPriceFromText(t, 'Pro').value, 7.25);
  });

  test('bara paketpriser finns → null (hellre tystnad än fel SKU)', () => {
    const t = 'Business Premium and Microsoft 365 Copilot for business $305.87 per user/month';
    assert.equal(planPriceFromText(t, 'Business Premium').value, null);
  });
});

describe('planPriceFromText · gränser', () => {
  test('inget pris inom fönstret → null', () => {
    assert.equal(planPriceFromText('Pro is our most popular plan. Read more.', 'Pro').value, null);
  });

  test('kravOrd tvingar rätt enhet (per user) — en totalsumma får aldrig bli per-seat', () => {
    const t = 'Business $4 500 total per year Business $18 per user / month';
    const r = planPriceFromText(t, 'Business', { kravOrd: /per user/i });
    assert.equal(r.value, 18);
  });

  test('tom/ogiltig indata kastar aldrig', () => {
    assert.equal(planPriceFromText('', 'Pro').value, null);
    assert.equal(planPriceFromText(null, 'Pro').value, null);
  });

  test('plannamn med regex-tecken hanteras (Business+)', () => {
    const t = 'Business+ $15 USD per user / month';
    assert.equal(planPriceFromText(t, 'Business+').value, 15);
  });

  test('den delade förbudslistan täcker paket, varianter och kampanjer', () => {
    for (const ord of ['Copilot', 'bundle', 'add-on', 'EES', '50% off', 'trial']) {
      assert.ok(FORBJUDEN_KONTEXT_STANDARD.test(`plan ${ord} pris`), `saknar skydd mot: ${ord}`);
    }
  });
});
