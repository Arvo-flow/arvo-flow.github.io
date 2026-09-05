// tests/forensics.mjs — låser den universella forensik-passningen (mekanism-domen).
// Zero Trust: varje fynds tal kommer ur kundens egen rad. Category-agnostiskt — samma motor på
// telekom, SaaS, försäkring, allt. Detta är beviset att forensiken kan visas även där vi inte
// kan prissätta kategorin (egna rader ≠ marknadstal → revisionsgrindens tystnad gäller inte).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
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

// ── FO-04..09 · DATUMET OCH TALKOLLISIONEN (2026-09-05, grundargranskning av kortet) ─────────
// Kortet visade «29 400 kr/år» i rubriken och «ATT BEGÄRA TILLBAKA 29 400 kr» strax under. Två
// HELT olika storheter — årstakt framåt och redan betalt bakåt — som råkade bli identiska i just
// den fakturan, eftersom överbetalningen råkade vara exakt tolv månader. Den starkaste meningen
// vi äger (det finns BÅDE ett krav bakåt OCH en kostnad framåt) försvann i talkollisionen.
//
// Och «tolv månader utöver planen» är ett abstrakt tal. «Avbetalningen var slutbetald i
// september 2025» är ett datum kunden kan slå upp i sin egen bokföring. Ren aritmetik på två
// avlästa fält — fakturadatum minus antalet månader över planen.
describe('FO · Datumet och de två tidsaxlarna', () => {
  const RAD = [{ type: 'recurring_subscription', description: 'Leasing Server (Månad 48 av 36)',
    quantity: 1, unitPrice: 2450, amount: 2450 }];
  const kor = (opts) => detectForensicFindings(RAD, { billingPeriod: 'monthly', supplier: 'Dustin Sverige AB', ...opts })[0];

  test('FO-04 · slutbetald månad räknas ur fakturadatum minus månader över planen', () => {
    const f = kor({ fakturadatum: '2026-09-04' });
    assert.equal(f.slutbetald, 'september 2025', 'månad 48 av 36 på en septemberfaktura 2026 → september 2025');
    assert.equal(f.slutbetaldIso, '2025-09');
    assert.match(f.text, /slutbetald i september 2025/);
  });

  test('FO-05 · utan fakturadatum hävdas INGEN månad — men fyndet står kvar', () => {
    const f = kor({ fakturadatum: null });
    assert.equal(f.slutbetald, undefined, 'ett okänt datum får aldrig låna ett giltigt');
    assert.equal(f.overpaidToDate, 29_400, 'fail-closed på PÅSTÅENDET, aldrig på fyndet');
    assert.doesNotMatch(f.text, /\b(19|20)\d\d\b/, 'ingen årtalssiffra får smyga in utan källa');
  });

  test('FO-06 · ett oläsbart datum är ett okänt datum, inte 1970', () => {
    // new Date(null) = 1970-01-01 är ett fullständigt GILTIGT datum. Samma fälla som fällde
    // arvodesgrinden 30 augusti — ett okänt tillstånd som lånar ett giltigt värde.
    for (const trasigt of [null, 0, false, '', '   ', 'inte-ett-datum', NaN]) {
      const f = kor({ fakturadatum: trasigt });
      assert.equal(f.slutbetald, undefined, `«${String(trasigt)}» får inte ge en månad`);
    }
  });

  test('FO-07 · månadslängdsfällan: 31 mars minus en månad landar inte i mars', () => {
    const f = detectForensicFindings(
      [{ type: 'recurring_subscription', description: 'Leasing (Månad 37 av 36)', quantity: 1, unitPrice: 500, amount: 500 }],
      { billingPeriod: 'monthly', fakturadatum: '2026-03-31' })[0];
    assert.equal(f.slutbetald, 'februari 2026',
      'dag 1 i UTC används just för att undvika att en kort månad kastar tillbaka datumet');
  });

  test('FO-08 · de två talen bärs SEPARAT, med var sitt fält', () => {
    const f = kor({ fakturadatum: '2026-09-04' });
    assert.equal(f.overpaidToDate, 29_400, 'redan betalt: 12 månader utöver planen × 2 450');
    assert.equal(f.annualImpact,   29_400, 'årstakt framåt: 12 månader per år × 2 450');
    assert.equal(f.manadsbelopp,   2_450,
      'månadsbeloppet måste bäras eget — annars måste ytan räkna, och regel 2 säger att koden räknar');
    // Att de är LIKA här är en slump i just den här fakturan. Testet nedan bevisar att de skiljer
    // sig så snart överbetalningen inte råkar vara exakt tolv månader — vilket är hela skälet till
    // att de aldrig får renderas som ett och samma tal.
    const tva = detectForensicFindings(
      [{ type: 'recurring_subscription', description: 'Leasing Server (Månad 38 av 36)', quantity: 1, unitPrice: 2450, amount: 2450 }],
      { billingPeriod: 'monthly', fakturadatum: '2026-09-04' })[0];
    assert.equal(tva.overpaidToDate, 4_900, 'två månader utöver planen');
    assert.equal(tva.annualImpact,   29_400, 'årstakten är oförändrad — de mäter olika tidsaxlar');
    assert.notEqual(tva.overpaidToDate, tva.annualImpact);
  });

  test('FO-09 · texten säger vad varje ytterligare månad kostar', () => {
    const f = kor({ fakturadatum: '2026-09-04' });
    assert.match(f.text, /varje månad den står kvar kostar lika mycket till/,
      'urgensen ska finnas i prosan — men BELOPPET bärs av kortets chip (regeln från 15 aug: '
      + 'prosan upprepar aldrig ett nyckeltal, den förklarar varför det finns)');
    assert.doesNotMatch(f.text, /2\s?450/,
      'det gamla testet fällde precis det här: med kortets framåtrad hade talet stått tre gånger');
  });
});

// ── FO-10..11 · MATNINGEN OCH YTAN (2026-09-05) ─────────────────────────────────────────────
// Två sabotage fällde noll tester på första försöket: «api-lagret slutar skicka fakturadatumet»
// och «rubriken visar åter årstakten». Båda halvorna av dagens arbete var alltså OPRÖVADE — den
// ena i matningen, den andra i ytan. Det är villkorsvaktens sjukdom i sin renaste form:
// mekanismen prövad, matningen aldrig, och ingen som tittade på vad kunden faktiskt ser.
describe('FO · Matningen och ytan — inte bara mekanismen', () => {
  const ROT2 = join(dirname(fileURLToPath(import.meta.url)), '..');

  test('FO-10 · produktionsvägen skickar faktiskt fakturadatumet', () => {
    const API = readFileSync(join(ROT2, 'api/test-invoice.mjs'), 'utf8');
    const REC = readFileSync(join(ROT2, 'agents/recommender/recommend.js'), 'utf8');
    assert.match(API, /fakturadatum: extracted\.date \?\? null,/,
      'utan matningen är slutbetaldManad död kod — attribueringslåsets exakta öde, två månader mörkt');
    assert.match(REC, /fakturadatum: input\.invoice\?\.date \?\? null,/,
      'recommend():s egen beräkningsväg (cli, batch, sviten) måste mata samma fält');
  });

  test('FO-11 · kortets rubrik bär KRAVET när det finns, aldrig årstakten', () => {
    const KORT = readFileSync(join(ROT2, 'src/components/FindingCard.js'), 'utf8');
    assert.match(KORT, /const harKrav = finding\.overpaidToDate > 0;/);
    assert.match(KORT, /const hasImpact = !harKrav && finding\.annualImpact > 0;/,
      'utan `!harKrav` visar rubriken årstakten bredvid ett identiskt krav — talkollisionen '
      + 'som fick två olika storheter att se ut som samma siffra');
    assert.match(KORT, /harKrav[\s\S]{0,120}?fmt\(finding\.overpaidToDate\)/,
      'rubriktalet ska vara det retroaktiva kravet — det enda kunden kan hämta hem i dag');
    // className, inte bara strängen: `fc-framat` står ÄVEN i CSS-blocket, så ett /fc-framat/
    // matchade stilen och överlevde att JSX-raden togs bort. Sabotaget avslöjade det.
    assert.match(KORT, /className="fc-framat"/,
      'framåtblicken ska ha en EGEN rad med egen enhet, aldrig samma slot som kravet');
    assert.match(KORT, /finding\.manadsbelopp[\s\S]{0,200}?kr\/mån/,
      'raden ska bära månadsbeloppet MED sin enhet — det är enheten som skiljer de två talen åt');
  });
});
