// tests/enhetsantagandet.mjs — EA-01..10: en KVANTITET är inte ett antal användare, och en
// SAKNAD konfidens är inte en hög konfidens.
//
// VARFÖR (2026-08-24, ur obduktionens spaning på extraktionsgrindarna).
//
// Två fel med samma form, båda i aggregeringen/routingen som varje faktura passerar:
//
//  1. `seatCount` sattes till MAX-kvantiteten på vilken löpande rad som helst. Elförbrukning
//     klassas enligt promptens egen instruktion som `recurring_subscription` («Förbrukning X kWh»),
//     så en elfaktura på 3 400 kWh gav `seatCount: 3400`. Modellen svarade korrekt `null` — regeln
//     UPPFANN ett antal där observationen sa «inga». Talet matar `jamforelseSkala` (skalan som
//     multiplicerar prisboken), per-licensberäkningarna och integritetskontroll 4.
//
//  2. `extracted.confidenceScore < CONFIDENCE_THRESHOLD` är `false` för `undefined`, så en
//     extraktion utan konfidenspoäng gled igenom till route `auto` utan att någon rad bokfördes.
//     Fail-open i en kedja som är fail-closed överallt annars.
//
// Båda är felfamiljen: ett tillstånd som betyder «okänt / inte mätt», representerat med ett värde
// som är omöjligt att skilja från ett giltigt svar.
//
// FÅNGAR: att en icke-användarenhet sätter licensantalet, att regelns VERKLIGA syfte (flermoduls-
//   SaaS) går förlorat i fixen, och att en saknad konfidens routas som godkänd.
// BLIND: enhetslistan är en ordlista, inte en förståelse. En enhet som inte står i
//   `ICKE_ANVANDARENHET_RE` ger samma beteende som före fixen — konservativt med flit, men det
//   betyder att nästa okända enhet (t.ex. «anslutningar», «mätpunkter») kan sätta seatCount igen.
//   Listan växer med varje kategori vi lär oss läsa.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { aggregateLineItems, routeExtraction } from '../agents/test-invoice/extract.js';
import { runIntegrityChecks } from '../lib/extraction-integrity.js';
import { readFileSync } from 'node:fs';

const rad = (description, quantity, amount, extra = {}) =>
  ({ description, quantity, amount, unitPrice: Math.round(amount / quantity) || 1,
     type: 'recurring_subscription', ...extra });

const bygg = (rader, raw = {}) => aggregateLineItems({
  supplier: 'X', date: '2026-05-31', description: 'd', billingPeriod: 'monthly',
  confidenceScore: 0.95, ...raw, lineItems: rader,
});

describe('EA · Enhetsantagandet — en kvantitet är inte ett antal användare', () => {
  test('EA-01: elförbrukning sätter INTE seatCount (3 400 kWh blev 3 400 licenser)', () => {
    const ex = bygg([rad('Elhandel rörligt — förbrukning 3400 kWh', 3400, 3808)]);
    assert.equal(ex.seatCount, null,
      'kWh är inte användare — modellens `null` ska stå kvar orörd');
  });

  test('EA-02: regelns VERKLIGA syfte överlever — flermoduls-SaaS ger max av modulerna', () => {
    // Motprovet. En fix som tystar felet genom att också döda den korrekta grenen är ingen fix.
    // Fortnox-fallet är regelns ursprung: AI:n svarade 12 (5+5+2) och missade K&U-modulens 60.
    const ex = bygg([
      rad('Bokföring (5 användare) — maj 2026', 5, 745),
      rad('Kvitto & Utlägg (60 användare) — maj 2026', 60, 2940),
    ]);
    assert.equal(ex.seatCount, 60);
  });

  test('EA-03: sidor, pallar och gigabyte sätter inte heller licensantalet', () => {
    for (const [beskrivning, antal] of [
      ['Svartvita sidor 12 441 st', 12_441],
      ['DHL Euroconnect — 32 pallar inrikes (Zon 2)', 32],
      ['Datatrafik 500 GB utanför plan', 500],
    ]) {
      assert.equal(bygg([rad(beskrivning, antal, antal * 2)]).seatCount, null, beskrivning);
    }
  });

  test('EA-04: modellens EGEN observation står kvar även när raderna är i fel enhet', () => {
    // Fail-closed gäller HÄRLEDNINGEN, aldrig observationen. Säger modellen 8 abonnemang är det
    // ett avläst tal, och en GB-rad bredvid får inte radera det.
    const ex = bygg([rad('Företagsmobil 50 GB/mån', 50, 4000)], { seatCount: 8 });
    assert.equal(ex.seatCount, 8);
  });
});

describe('EA · En vakt som jämför ett tal med sig självt', () => {
  test('EA-07: ingen integritetskontroll jämför radsumman mot det HÄRLEDDA beloppet', () => {
    // Kontroll 3 ställde `lineItems.reduce(...amount)` mot `extracted.amount` — men aggregeringen
    // SÄTTER `amount` till exakt den summan. Avvikelsen var per konstruktion 0. Mekanismen
    // svarade när den matades för hand; signalen kunde aldrig röra sig i produktionsvägen.
    // Ring 1 i routeExtraction gör den riktiga kontrollen mot `invoiceTotal` (det AVLÄSTA
    // beloppet), och en död dubblett räknar ett skydd vi inte har.
    const ex = bygg([rad('En rad', 1, 1000)]);
    ex.invoiceTotal = 5000;                       // 4 000 kr saknas i raderna
    const { overrides } = runIntegrityChecks(ex);
    assert.equal(overrides.some((o) => /lineItem/i.test(o.field ?? '')), false);

    // ── VARFÖR BETEENDET INTE RÄCKER SOM VAKT ────────────────────────────────────────────────
    // Assertionen ovan var min FÖRSTA version, och sabotaget avslöjade att den är grön på fel
    // grund: en återinförd självjämförande kontroll kan ju inte fyra, så «ingen override» ser
    // exakt likadan ut som «kontrollen borttagen». Testet kunde inte skilja en DÖD vakt från en
    // FRÅNVARANDE — vilket är precis den förväxling hela fyndet handlar om.
    // Det som faktiskt ska förbjudas är KODFORMEN: ett larm på fältet får inte återinföras utan
    // att någon läser den här förklaringen först.
    const kalla = readFileSync(new URL('../lib/extraction-integrity.js', import.meta.url), 'utf8');
    const kod = kalla.split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
    assert.equal(/['\`]lineItemsTotal['\`]/.test(kod), false,
      'lineItemsTotal-larmet är borttaget med flit: det jämförde radsumman mot extracted.amount, '
      + 'som ÄR radsumman. Ska det återinföras måste det mäta mot invoiceTotal — och då dubblerar '
      + 'det Ring 1 i routeExtraction, som redan gör kontrollen på rätt axel.');

    // Motprovet: Ring 1 fångar samma faktura på rätt axel. Utan det vore borttagningen en förlust.
    assert.equal(routeExtraction(ex).route, 'review_queue');
  });
});

describe('EA · Kontroll 5 var en dubblett vars enda gren var falsklarm (Fable 5:s granskning)', () => {
  test('EA-08: annualCost-larmet är borttaget och en prorata-faktura ger INGEN override', () => {
    // annualCost ÄR per konstruktion projected × multiplier, så «annualCost vs recurring × perAr»
    // är algebraiskt identisk med «projected vs recurring» — projektionskravets fråga. Kontrollens
    // enda nåbara gren (prorata) «korrigerade» det KORREKTA talet till det felaktiga och skrev
    // raden till labeled_corrections: hundraprocentigt falsklarm in i flywheeln.
    const ex = bygg([
      { description: 'M365 Business Premium', amount: 1000, type: 'recurring_subscription', quantity: 5, unitPrice: 200 },
      { description: 'M365 Business Premium (Prorata tillägg)', amount: 500, type: 'one_time_fee', quantity: 5, unitPrice: 200, is_prorata: true },
    ]);
    assert.equal(ex.annualCost, 24_000, 'prorata-projektionen är deterministisk och korrekt: (1000+1000)×12');
    const { overrides } = runIntegrityChecks(ex);
    assert.equal(overrides.some((o) => o.field === 'annualCost'), false,
      'det korrekta talet får aldrig «korrigeras» till det felaktiga');

    // Kodformslåsen: larmet får inte återinföras, och karantänen i getPatterns får inte tas bort.
    const kod = readFileSync(new URL('../lib/extraction-integrity.js', import.meta.url), 'utf8')
      .split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
    assert.equal(/annual_cost_deviates/.test(kod), false,
      'annualCost-larmet är borttaget med flit — dess enda nåbara gren var prorata, där det alltid hade fel');
    const lc = readFileSync(new URL('../lib/labeled-corrections.js', import.meta.url), 'utf8');
    assert.match(lc, /NOT LIKE 'annual_cost_deviates/,
      'de historiska förgiftade raderna måste förbli karantänerade i getPatterns');
  });

  test('EA-09: seatCount är ALLTID heltal eller null — bråkdel är ett extraktionsfel', () => {
    // Max-regeln kunde sätta seatCount 2,5 → jämförelseskalan 2,5 → kundens golv 25 % av det korrekta.
    const urRegeln = bygg([rad('Licens tilläggsmodul', 2.5, 500)]);
    assert.equal(urRegeln.seatCount, null, 'bråkdel ur max-regeln ska bli null, aldrig ett tal');
    const urModellen = bygg([rad('Licens', 1, 500)], { seatCount: 2.5 });
    assert.equal(urModellen.seatCount, null, 'även modellens egen observation grindas — 2,5 licenser finns inte');
    const heltal = bygg([rad('Licens', 1, 500)], { seatCount: 8 });
    assert.equal(heltal.seatCount, 8, 'motprovet: ett giltigt heltal passerar orört');
  });

  test('EA-10: en FELTYPAD prorata-rad överlever PROJEKTIONSKRAV_ENFORCE=1', () => {
    // proRataCount var hårdkodad 0 i AI-grenen. En prorata-rad typad recurring (mot promptens
    // instruktion) nådde den grenen, och med armering hade AI:ns KORREKTA fullprisprojektion
    // skrivits över av delperiodssumman. Nu räknas varje is_prorata-rad, oavsett typ.
    const fore = process.env.PROJEKTIONSKRAV_ENFORCE;
    process.env.PROJEKTIONSKRAV_ENFORCE = '1';
    try {
      const ex = bygg([
        { description: 'M365', amount: 1000, type: 'recurring_subscription', quantity: 5, unitPrice: 200 },
        { description: 'M365 (Prorata)', amount: 250, type: 'recurring_subscription', quantity: 5, unitPrice: 200, is_prorata: true },
      ], { projectedRecurringAmount: 2000 });
      assert.equal(ex.projectedRecurringAmount, 2000,
        'AI-projektionen är korrekt (fullpris) och får inte skrivas över av delperiodssumman');
      assert.equal(ex.projektionskrav?.ok, true, 'prorata-närvaron gör avvikelsen legitim');
    } finally {
      if (fore === undefined) delete process.env.PROJEKTIONSKRAV_ENFORCE;
      else process.env.PROJEKTIONSKRAV_ENFORCE = fore;
    }
  });
});

describe('EA · En saknad konfidens är inte en hög konfidens', () => {
  const frisk = () => ({
    ...bygg([rad('Bredband Pro 1000/1000', 1, 1299)]),
    invoiceTotal: 1299,
  });

  test('EA-05: confidenceScore saknas → review_queue, inte auto', () => {
    const e = frisk();
    delete e.confidenceScore;
    const r = routeExtraction(e);
    assert.equal(r.route, 'review_queue', '`undefined < 0.70` är false — grinden var fail-open');
    assert.match(r.reason, /[Kk]onfidens/);
  });

  test('EA-06: en normal konfidens routas fortfarande auto (spärren fäller inte allt)', () => {
    // En spärr som fäller allt är lika värdelös som ingen spärr (OB-23:s läxa).
    assert.equal(routeExtraction(frisk()).route, 'auto');
  });
});
