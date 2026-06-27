// tests/forensics.mjs — låser den universella forensik-passningen (mekanism-domen).
// Zero Trust: varje fynds tal kommer ur kundens egen rad. Category-agnostiskt — samma motor på
// telekom, SaaS, försäkring, allt. Detta är beviset att forensiken kan visas även där vi inte
// kan prissätta kategorin (egna rader ≠ marknadstal → revisionsgrindens tystnad gäller inte).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { detectForensicFindings } from '../lib/forensics.js';

const line = (description, amount, quantity) => ({ type: 'recurring_subscription', description, amount, quantity });

describe('Forensik · leverantörens egen dokumenterade höjning (smyghöjning på pränt)', () => {
  test('"prisjustering"-rad → high-fynd med årsimpact ur kundens egen rad', () => {
    const f = detectForensicFindings([line('Prisjustering enligt index', 500, 1)], { periodMultiplier: 12 });
    assert.equal(f.length, 1);
    assert.equal(f[0].type, 'supplier_documented_hike');
    assert.equal(f[0].severity, 'high');
    assert.equal(f[0].monthly, 500);
    assert.equal(f[0].annualImpact, 6000);   // 500 × 12 — kundens egen rad, ingen marknadssiffra
    assert.equal(f[0].negotiable, true);
  });

  test('årsfaktura → periodMultiplier 1 (ingen dubblering)', () => {
    const f = detectForensicFindings([line('Ny tariff miljöavgift', 5940, 1)], { periodMultiplier: 1 });
    assert.equal(f[0].annualImpact, 5940);
  });

  test('ingen höjningsmarkör → inget fynd', () => {
    assert.equal(detectForensicFindings([line('Mobilabonnemang', 349, 10)], {}).length, 0);
  });
});

describe('Forensik · hårdvaruavbetalning förklädd till löpande tjänst', () => {
  test('"avbetalning"-rad → medium-fynd', () => {
    const f = detectForensicFindings([line('Avbetalning telefoner', 280, 5)], { periodMultiplier: 12 });
    assert.equal(f.length, 1);
    assert.equal(f[0].type, 'hardware_financing');
    assert.equal(f[0].annualImpact, 3360);   // 280 × 12
  });

  test('restvärde/hyrköp fångas också', () => {
    assert.equal(detectForensicFindings([line('Restvärde utrustning', 100)], {})[0].type, 'hardware_financing');
    assert.equal(detectForensicFindings([line('Hyrköp dator', 200)], {})[0].type, 'hardware_financing');
  });
});

describe('Forensik · valutapåslag (leverantören tar betalt för växlingen)', () => {
  test('"valutapåslag"-rad → high-fynd', () => {
    const f = detectForensicFindings([line('Valutapåslag USD', 240, 1)], { periodMultiplier: 12 });
    assert.equal(f[0].type, 'fx_surcharge');
    assert.equal(f[0].severity, 'high');
    assert.equal(f[0].annualImpact, 2880);
  });
  test('växlingsavgift/valutatillägg fångas också', () => {
    assert.equal(detectForensicFindings([line('Växlingsavgift', 90)], {})[0].type, 'fx_surcharge');
    assert.equal(detectForensicFindings([line('Valutatillägg', 90)], {})[0].type, 'fx_surcharge');
  });
});

describe('Forensik · administrativ tilläggsavgift (junk fee)', () => {
  test('"faktureringsavgift" → medium-fynd', () => {
    const f = detectForensicFindings([line('Faktureringsavgift pappersfaktura', 49, 1)], { periodMultiplier: 12 });
    assert.equal(f[0].type, 'junk_fee');
    assert.equal(f[0].severity, 'medium');
    assert.equal(f[0].annualImpact, 588);
  });
  test('expeditions-/aviavgift fångas också', () => {
    assert.equal(detectForensicFindings([line('Expeditionsavgift', 35)], {})[0].type, 'junk_fee');
    assert.equal(detectForensicFindings([line('Aviavgift', 29)], {})[0].type, 'junk_fee');
  });
});

describe('Forensik · avbetald hårdvara (Månad X/Y, X > Y → ni äger den redan)', () => {
  test('"Månad 37/36" → high-fynd hardware_overpaid med skoningslös copy', () => {
    const f = detectForensicFindings([line('Delbetalning iPhone 13 (Månad 37/36)', 560, 2)], { periodMultiplier: 12 });
    assert.equal(f.length, 1);
    assert.equal(f[0].type, 'hardware_overpaid');
    assert.equal(f[0].severity, 'high');                 // skarpare än vanlig avbetalning (medium)
    assert.equal(f[0].annualImpact, 6720);               // 560 × 12 — ren förlust för redan ägd hårdvara
    assert.match(f[0].text, /månad 37 av 36/);
    assert.match(f[0].text, /redan slutbetald/);
    assert.match(f[0].title, /redan äger/);
  });
  test('"Månad 12/36" (inom plan) → degraderar korrekt till hardware_financing (guard faller)', () => {
    const f = detectForensicFindings([line('Avbetalning surfplattor (Månad 12/36)', 200, 1)], { periodMultiplier: 12 });
    assert.equal(f[0].type, 'hardware_financing');        // INTE overpaid — planen löper ännu
    assert.equal(f[0].severity, 'medium');
  });
  test('"Månad 36/36" (sista månaden, ej över) → hardware_financing, inte overpaid', () => {
    assert.equal(detectForensicFindings([line('Delbetalning (Månad 36/36)', 100)], {})[0].type, 'hardware_financing');
  });
  test('"Månad 37 av 36" (text-variant) fångas också som overpaid', () => {
    assert.equal(detectForensicFindings([line('Avbetalning (Månad 37 av 36)', 100)], {})[0].type, 'hardware_overpaid');
  });
});

describe('Forensik · valutapåslag på engelska/cross-border (USD-fakturor)', () => {
  test('"Foreign Transaction / Currency Conversion Fee" → fx_surcharge (annars osynligt)', () => {
    const f = detectForensicFindings([line('Foreign Transaction / Currency Conversion Fee', 28.5, 1)], { periodMultiplier: 12 });
    assert.equal(f[0].type, 'fx_surcharge');
    assert.equal(f[0].severity, 'high');
  });
  test('"Cross-border Processing Surcharge" → fx_surcharge', () => {
    assert.equal(detectForensicFindings([line('Cross-border Processing Surcharge', 41.25)], {})[0].type, 'fx_surcharge');
  });
});

describe('Forensik · dedup per rad (en rad ger högst ett fynd, högst prioritet vinner)', () => {
  test('rad som matchar både höjning och junk → ETT high-fynd', () => {
    const f = detectForensicFindings([line('Prisjustering faktureringsavgift', 60, 1)], { periodMultiplier: 12 });
    assert.equal(f.length, 1);
    assert.equal(f[0].type, 'supplier_documented_hike');   // high vinner över junk
  });
});

describe('Forensik · rangordning (high före medium, störst årsimpact först)', () => {
  test('höjning leder över avbetalning oavsett belopp', () => {
    const f = detectForensicFindings([
      line('Avbetalning skrivare', 900, 1),       // medium, hög impact
      line('Indexuppräkning', 200, 1),            // high, lägre impact
    ], { periodMultiplier: 12 });
    assert.equal(f[0].type, 'supplier_documented_hike');  // high vinner
    assert.equal(f[1].type, 'hardware_financing');
  });

  test('tom/saknad faktura → tom lista (fail-open)', () => {
    assert.deepEqual(detectForensicFindings(null, {}), []);
    assert.deepEqual(detectForensicFindings([], {}), []);
  });
});
