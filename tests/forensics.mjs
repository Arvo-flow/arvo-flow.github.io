// tests/forensics.mjs — låser den universella forensik-passningen (mekanism-domen).
// Zero Trust: varje fynds tal kommer ur kundens egen rad. Category-agnostiskt — samma motor på
// telekom, SaaS, försäkring, allt. Detta är beviset att forensiken kan visas även där vi inte
// kan prissätta kategorin (egna rader ≠ marknadstal → revisionsgrindens tystnad gäller inte).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { detectForensicFindings, refineFinding } from '../lib/forensics.js';

const line = (description, amount, quantity) => ({ type: 'recurring_subscription', description, amount, quantity });

describe('Forensik · leverantörens egen dokumenterade höjning (smyghöjning på pränt)', () => {
  test('"prisjustering"-rad → high-fynd med årsimpact ur kundens egen rad', () => {
    const f = detectForensicFindings([line('Prisjustering enligt index', 500, 1)], { billingPeriod: 'monthly' });
    assert.equal(f.length, 1);
    assert.equal(f[0].type, 'supplier_documented_hike');
    assert.equal(f[0].severity, 'high');
    assert.equal(f[0].monthly, 500);
    assert.equal(f[0].annualImpact, 6000);   // 500 × 12 — kundens egen rad, ingen marknadssiffra
    assert.equal(f[0].negotiable, true);
  });

  test('årsfaktura → periodMultiplier 1 (ingen dubblering)', () => {
    const f = detectForensicFindings([line('Ny tariff miljöavgift', 5940, 1)], { billingPeriod: 'annual' });
    assert.equal(f[0].annualImpact, 5940);
  });

  test('KVARTALSfaktura → ×4, inte ×12 (buggen 2026-08-24)', () => {
    // Anroparen räknade förr `billingPeriod === 'annual' ? 1 : 12`, så varje kvartalsfaktura
    // gångades med tolv. 500 kr per kvartal är 2 000 kr/år, aldrig 6 000.
    const f = detectForensicFindings([line('Prisjustering enligt index', 500, 1)], { billingPeriod: 'quarterly' });
    assert.equal(f[0].annualImpact, 2000);
  });

  test('ENGÅNGSRAD får inget årstal — den återkommer inte', () => {
    // En startavgift på 4 500 kr blev «54 000 kr/år» på rummets fyndkort. Nu bär fyndet sitt
    // sanna belopp med sin sanna enhet, och hävdar inget årstal alls.
    const f = detectForensicFindings(
      [{ type: 'one_time_fee', description: 'Ny avgift — startavgift', amount: 4500, quantity: 1 }],
      { billingPeriod: 'monthly' });
    assert.equal(f.length, 1, 'fyndet ska stå kvar — fail-closed på PÅSTÅENDET, inte på pipelinen');
    assert.equal(f[0].annualImpact, null);
    assert.equal(f[0].engangsbelopp, true);
    assert.match(f[0].metricText, /engångsbelopp/);
  });

  test('OBESTÄMD period → inget årstal hävdas', () => {
    const f = detectForensicFindings([line('Prisjustering enligt index', 500, 1)], { billingPeriod: 'unknown' });
    assert.equal(f[0].annualImpact, null);
  });

  test('det BORTTAGNA fältnamnet kastar — en ignorerad nyckel är en tyst förlust', () => {
    // Sabotaget avslöjade att kastet inte prövades av något test: jag hade rättat alla anropare,
    // så ingen skickade längre den gamla nyckeln, och vakten kunde tas bort utan att sviten
    // märkte det. En vakt vars sabotage inte fäller är ingen vakt.
    assert.throws(
      () => detectForensicFindings([line('Prisjustering enligt index', 500, 1)], { periodMultiplier: 12 }),
      /periodMultiplier/);
  });

  test('ingen höjningsmarkör → inget fynd', () => {
    assert.equal(detectForensicFindings([line('Mobilabonnemang', 349, 10)], {}).length, 0);
  });
});

describe('Forensik · hårdvaruavbetalning förklädd till löpande tjänst', () => {
  test('"avbetalning"-rad → medium-fynd', () => {
    const f = detectForensicFindings([line('Avbetalning telefoner', 280, 5)], { billingPeriod: 'monthly' });
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
    const f = detectForensicFindings([line('Valutapåslag USD', 240, 1)], { billingPeriod: 'monthly' });
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
    const f = detectForensicFindings([line('Faktureringsavgift pappersfaktura', 49, 1)], { billingPeriod: 'monthly' });
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
    const f = detectForensicFindings([line('Delbetalning iPhone 13 (Månad 37/36)', 560, 2)], { billingPeriod: 'monthly' });
    assert.equal(f.length, 1);
    assert.equal(f[0].type, 'hardware_overpaid');
    assert.equal(f[0].severity, 'high');                 // skarpare än vanlig avbetalning (medium)
    assert.equal(f[0].annualImpact, 6720);               // 560 × 12 — ren förlust för redan ägd hårdvara
    assert.match(f[0].text, /månad 37 av 36/);
    // Copyn skärptes 2026-08-15: "redan slutbetald" → "slutbetald och utrustningen är redan er",
    // plus det retroaktiva kravet. Kravet är det enda i fyndet kunden kan hämta hem I DAG, så det
    // låses här och inte bara i rumsredovisningen.
    assert.match(f[0].text, /slutbetald/);
    assert.match(f[0].text, /redan er/);
    assert.equal(f[0].monthsOverpaid, 1);
    assert.equal(f[0].overpaidToDate, 560);              // 1 månad × 560 kr ur kundens egen rad
    // Beloppet flyttades 2026-08-15 UT ur prosan och in i kortets eget nyckeltal + kravbrevet:
    // det låg begravt mitt i en mening medan run-raten fick all typografi. Kravet ska fortfarande
    // NÅ kunden — bara på en plats där det syns. Guarden flyttar med, den försvinner inte.
    assert.doesNotMatch(f[0].text, /560 kr/, 'beloppet bärs av kortets nyckeltal, inte av prosan');
    assert.match(f[0].title, /redan äger/);
  });
  test('"Månad 12/36" (inom plan) → degraderar korrekt till hardware_financing (guard faller)', () => {
    const f = detectForensicFindings([line('Avbetalning surfplattor (Månad 12/36)', 200, 1)], { billingPeriod: 'monthly' });
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
    const f = detectForensicFindings([line('Foreign Transaction / Currency Conversion Fee', 28.5, 1)], { billingPeriod: 'monthly' });
    assert.equal(f[0].type, 'fx_surcharge');
    assert.equal(f[0].severity, 'high');
  });
  test('"Cross-border Processing Surcharge" → fx_surcharge', () => {
    assert.equal(detectForensicFindings([line('Cross-border Processing Surcharge', 41.25)], {})[0].type, 'fx_surcharge');
  });
});

describe('Forensik · dedup per rad (en rad ger högst ett fynd, högst prioritet vinner)', () => {
  test('rad som matchar både höjning och junk → ETT high-fynd', () => {
    const f = detectForensicFindings([line('Prisjustering faktureringsavgift', 60, 1)], { billingPeriod: 'monthly' });
    assert.equal(f.length, 1);
    assert.equal(f[0].type, 'supplier_documented_hike');   // high vinner över junk
  });
});

describe('Forensik · rangordning (high före medium, störst årsimpact först)', () => {
  test('höjning leder över avbetalning oavsett belopp', () => {
    const f = detectForensicFindings([
      line('Avbetalning skrivare', 900, 1),       // medium, hög impact
      line('Indexuppräkning', 200, 1),            // high, lägre impact
    ], { billingPeriod: 'monthly' });
    assert.equal(f[0].type, 'supplier_documented_hike');  // high vinner
    assert.equal(f[1].type, 'hardware_financing');
  });

  test('tom/saknad faktura → tom lista (fail-open)', () => {
    assert.deepEqual(detectForensicFindings(null, {}), []);
    assert.deepEqual(detectForensicFindings([], {}), []);
  });
});

describe('Forensik · lagrade fynd räknas om vid läsning (Fable 5:s granskning)', () => {
  // Producenten rättades 24 aug, men varje REDAN lagrat fynd behöll sitt uppblåsta tal:
  // refineFinding sa «rör aldrig annualImpact — fakta ur analysen», och den meningen var falsk.
  // Talet räknades analysdagen med en gissad faktor. Ett lagrat fel är inte ett faktum.

  test('lagrad engångsavgift ×12 nollas när radens typ visar att den inte återkommer', () => {
    const lagrat = { type: 'junk_fee', severity: 'medium', title: 'x', negotiable: true,
      lineDescription: 'Uppläggningsavgift', monthly: 4500, annualImpact: 54_000 };
    const nytt = refineFinding(lagrat, {
      billingPeriod: 'monthly',
      lineItems: [{ description: 'Uppläggningsavgift', type: 'one_time_fee', amount: 4500 }],
    });
    assert.equal(nytt.annualImpact, null, '4 500 kr engångs får aldrig stå som 54 000 kr/år i rummet');
    assert.equal(nytt.engangsbelopp, true);
    assert.match(nytt.metricText, /engångsbelopp/);
  });

  test('lagrad kvartalsrad ×12 räknas om till ×4', () => {
    const lagrat = { type: 'supplier_documented_hike', severity: 'high', title: 'x', negotiable: true,
      lineDescription: 'Prisjustering enligt index', monthly: 500, annualImpact: 6_000 };
    const nytt = refineFinding(lagrat, {
      billingPeriod: 'quarterly',
      lineItems: [{ description: 'Prisjustering enligt index', type: 'recurring_subscription', amount: 500 }],
    });
    assert.equal(nytt.annualImpact, 2_000, '500 kr/kvartal är 2 000 kr/år, aldrig 6 000');
  });

  test('utan underlag lämnas det lagrade talet orört — dokumenterad blindfläck, inte en gissning', () => {
    const lagrat = { type: 'junk_fee', severity: 'medium', title: 'x', negotiable: true,
      lineDescription: 'Aviavgift', monthly: 49, annualImpact: 588 };
    assert.equal(refineFinding(lagrat, {}).annualImpact, 588);
  });

  test('rad som inte återfinns i underlaget → inget årstal hävdas (fail-closed på påståendet)', () => {
    const lagrat = { type: 'junk_fee', severity: 'medium', title: 'x', negotiable: true,
      lineDescription: 'Aviavgift', monthly: 49, annualImpact: 588 };
    const nytt = refineFinding(lagrat, { billingPeriod: 'monthly', lineItems: [{ description: 'Annan rad', type: 'recurring_subscription' }] });
    assert.equal(nytt.annualImpact, null);
    assert.match(nytt.metricText, /belopp ur analysen/);
  });
});

describe('FO · Leasing saknades i ordlistan — 29 400 kr osynliga (2026-09-05)', () => {
  const rad = (desc) => detectForensicFindings(
    [{ type: 'recurring_subscription', description: desc, quantity: 1, unitPrice: 2450, amount: 2450 }],
    { billingPeriod: 'monthly' },
  );

  test('FO-01 · en VERKLIG Dustin-rad: «Leasing Server (Månad 48 av 36)»', () => {
    // Ordagrant ur faktura DUS-112233. Månadsräknaren gick att läsa och guarden hade passerat,
    // men detektorn krävde FÖRST ett ord ur AMORT_RE — och det vanligaste svenska ordet för
    // saken saknades. Mätt på samma rad, bara ordet utbytt: «Leasing» gav 0 fynd, «Avbetalning»
    // gav 1 fynd och 29 400 kr. Kundens pengar, osynliga för att leverantören valde ett annat ord.
    const f = rad('Leasing Server (Månad 48 av 36)');
    assert.equal(f.length, 1, 'raden säger själv att den passerat sin plan');
    assert.equal(f[0].type, 'hardware_overpaid');
    assert.equal(f[0].monthsOverpaid, 12, '48 − 36 = tolv månader utöver planen');
    assert.equal(f[0].overpaidToDate, 29400, '12 × 2 450 kr redan betalt');
  });

  test('FO-02 · SYSKONFALLET — en vanlig leasingrad UTAN överskridande fäller inte', () => {
    // Det farliga med att vidga en ordlista är att detektorn börjar fälla allt. Guarden bär
    // hela bevisbördan: bara en rad som SJÄLV säger paid > total får fyra.
    assert.deepEqual(rad('Leasing Server (Månad 12 av 36)'), [],
      'månad 12 av 36 är en helt normal leasingrad');
    assert.deepEqual(rad('Leasing Server'), [], 'utan månadsräknare finns inget bevis');
    assert.deepEqual(rad('Leasing Server (Månad 36 av 36)'), [],
      'sista månaden i planen är inte ett överskridande');
  });

  test('FO-03 · den SMALA listan rörs inte — hardware_financing fäller inte varje leasingrad', () => {
    // Vidgningen gäller ENDAST hardware_overpaid. Hade AMORT_RE vidgats hade varje leasingrad i
    // landet blivit ett medium-fynd, och en detektor som fäller allt är lika värdelös som ingen.
    const f = rad('Leasing Server (Månad 12 av 36)');
    assert.ok(!f.some((x) => x.type === 'hardware_financing'),
      'en normal leasingrad ska inte bli ett finansieringsfynd');
    // MOTPROVET: den smala listan fungerar fortfarande för sina egna ord.
    assert.ok(rad('Avbetalning iPad (Månad 12 av 36)').some((x) => x.type === 'hardware_financing'));
  });
});
