// tests/larmunderlag.mjs — LU-01..12: inget omätt AI-svar får bli ett kronbelopp i kundens inkorg.
//
// VARFÖR (2026-08-24, Fable 5:s spaning H2). Haikus svar gick ORÖRT in i en kundsynlig kr/år-
// siffra. Fallen A–G nedan är agentens KÖRDA utfall genom den riktiga notify-vägen, inte
// hypoteser — de används här som facit.
//
// Den bärande principen: **kundmailet får aldrig ställa lägre beviskrav än prisboken.** Juryn
// (lib/price-verdict.js) gatar vad vi LAGRAR med konfidens ≥ 0,85, stabilitet och konsensus;
// kundmailet konsumerade rå JSON. Vi ställde hårdare krav på vår egen databas än på vad vi
// påstod för kunden — bakvänt mot regel 3.
//
// FÅNGAR: att någon av de sju grenarna åter producerar ett tal, att konfidensgolvet kopieras i
//   stället för importeras, och att en okänd enhet åter antas vara kr/säte/månad.
// BLIND: modulen dömer svarets FORM. Ett komplett, konfident och konsistent svar som ändå avser
//   fel produkt passerar — den frågan äger gSource/gConsensus i juryn, på verify-vägen.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { bedomLarmunderlag, normaliseraValuta, RAKNBARA_ENHETER } from '../lib/larmunderlag.js';
import { LARMTROSKLAR } from '../lib/price-verdict.js';
import { computeImpactKr } from '../lib/price-impact.js';

/** Ett fullgott svar — motprovet. En grind som fäller allt är lika värdelös som ingen grind. */
const FRISK = {
  actionRequired: 'update',
  confidence: 0.95,
  extractedNumeric: 349,
  extractedCurrency: 'SEK',
  extractedUnit: 'per_seat_month',
  reasoning: 'Priset har höjts från 299 till 349 kr/mån.',
};

describe('LU · Larmunderlaget — de sju bevisade grenarna tiger', () => {
  const fall = [
    ['LU-01 · A: haiku saknas helt',        undefined,                                   /haiku_saknas/],
    ['LU-02 · A: haiku är null',            null,                                        /haiku_saknas/],
    ['LU-03 · B: verify_manually',          { ...FRISK, actionRequired: 'verify_manually' }, /action_verify_manually/],
    ['LU-04 · B: låg konfidens (0,10)',     { ...FRISK, confidence: 0.10 },               /konfidens_0\.1_under/],
    ['LU-05 · C: enhet utanför enum',       { ...FRISK, extractedUnit: 'per_month' },     /enhet_per_month_oraknbar/],
    ['LU-06 · D: enhet saknas',             { ...FRISK, extractedUnit: undefined },       /enhet_saknas_oraknbar/],
    ['LU-07 · G: percentage (i Haikus egen enum!)', { ...FRISK, extractedUnit: 'percentage' }, /enhet_percentage_oraknbar/],
    ['LU-08 · F: tom sträng som tal',       { ...FRISK, extractedNumeric: '' },           /numeric_obrukbart/],
  ];
  for (const [namn, haiku, skalRe] of fall) {
    test(namn, () => {
      const r = bedomLarmunderlag(haiku);
      assert.equal(r.niva, 'obekraftad', `${namn} gav ett KUNDUTSKICK i stället för tystnad`);
      assert.match(r.skal, skalRe, 'skälet måste namnges — en tyst tystnad kan ingen mäta');
    });
  }

  test('LU-09 · E: valutan normaliseras — «usd» vände tecknet på hela påståendet', () => {
    // Samma faktiska HÖJNING rapporterades som en SÄNKNING på 66 384 kr, eftersom
    // `if (currency === 'USD')` är skiftlägeskänslig och ingen normaliserade.
    assert.equal(normaliseraValuta('usd'), 'USD');
    assert.equal(normaliseraValuta('  eur '), 'EUR');
    assert.equal(bedomLarmunderlag({ ...FRISK, extractedCurrency: 'usd' }).niva, 'verifierad',
      'gemener ska normaliseras, inte fällas — det är en stavning, inte ett okänt');
    const r = bedomLarmunderlag({ ...FRISK, extractedCurrency: 'kronor' });
    assert.equal(r.niva, 'obekraftad');
    assert.match(r.skal, /valuta_kronor_okand/);
  });

  test('LU-10 · MOTPROVET: ett fullgott svar släpps igenom', () => {
    const r = bedomLarmunderlag(FRISK, { oldKrPerSeatMonth: 299, newKrPerSeatMonth: 349 });
    assert.equal(r.niva, 'verifierad', 'en grind som fäller allt är lika värdelös som ingen grind');
    assert.equal(r.skal, null);
    assert.equal(bedomLarmunderlag({ ...FRISK, actionRequired: 'false_positive' }).niva, 'avvisad');
  });

  test('LU-11 · tecknet härleds ur TALEN, aldrig ur texten', () => {
    // En motsägelse mellan Haikus riktningsord och de omräknade priserna är ett OKÄNT —
    // inte ett val mellan två påståenden.
    const motsagelse = { ...FRISK, reasoning: 'Priset har sänkts rejält.' };
    const r = bedomLarmunderlag(motsagelse, { oldKrPerSeatMonth: 299, newKrPerSeatMonth: 349 });
    assert.equal(r.niva, 'obekraftad');
    assert.match(r.skal, /tecken_motsagelse/);
    // Utan omräknade priser kan kontrollen inte utföras — och en outförd kontroll får aldrig
    // bokföras som godkänd genom att bara hoppas över tyst. Här är den uttryckligen ej prövbar.
    assert.equal(bedomLarmunderlag(motsagelse).niva, 'verifierad');
  });

  test('LU-12 · konfidensgolvet IMPORTERAS från juryn, kopieras aldrig', () => {
    // En kopia kan glida isär — och då ställer kundytan tyst lägre krav än prisboken igen,
    // vilket var hela fyndet. Källtextlås: modulen får inte bära en egen literal.
    const kalla = readFileSync(new URL('../lib/larmunderlag.js', import.meta.url), 'utf8')
      .split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
    assert.match(kalla, /import \{ LARMTROSKLAR \} from '\.\/price-verdict\.js'/);
    assert.equal(/0\.85/.test(kalla), false, 'tröskeln får inte stå som literal i larmunderlaget');
    // Och gränsen ska ligga exakt där juryn har den.
    assert.equal(bedomLarmunderlag({ ...FRISK, confidence: LARMTROSKLAR.minConfidence }).niva, 'verifierad');
    assert.equal(bedomLarmunderlag({ ...FRISK, confidence: LARMTROSKLAR.minConfidence - 0.01 }).niva, 'obekraftad');
  });
});

describe('LU · En okänd enhet är ODÖMBAR, aldrig kr/säte/månad', () => {
  const bas = { currentNumeric: 299, currentCurrency: 'SEK', currentUnit: 'per_seat_month', seatCount: 10 };

  test('LU-13 · percentage och per_month ger null, inte ett kronbelopp', () => {
    // `default: return kr` gjorde 1,95 % till 1,95 kr/säte/mån (fall G) och 3 588 kr/ÅR till
    // 3 588 kr/MÅN → «+1 578 720 kr/år» i ett kundmail (fall C).
    for (const enhet of ['percentage', 'per_month', 'gurka']) {
      assert.equal(computeImpactKr({ ...bas, newNumeric: 349, newCurrency: 'SEK', newUnit: enhet }), null, enhet);
    }
  });

  test('LU-14 · motprovet: varje räknbar enhet ger fortfarande ett tal', () => {
    for (const enhet of RAKNBARA_ENHETER) {
      const r = computeImpactKr({ ...bas, newNumeric: 349, newCurrency: 'SEK', newUnit: enhet });
      assert.ok(r && Number.isFinite(r.impactKrYear), `${enhet} slutade räknas — fixen tystade för brett`);
    }
  });
});

describe('LU · Båda larmvägarna gatar (regel 5 — dubbla alertvägar)', () => {
  test('LU-15 · varken notify- eller cron-vägen filtrerar på det gamla villkoret', () => {
    for (const fil of ['scripts/notify-price-changes.mjs', 'api/cron/run-price-alerts.mjs']) {
      const kod = readFileSync(new URL(`../${fil}`, import.meta.url), 'utf8')
        .split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
      assert.match(kod, /bedomLarmunderlag\(/, `${fil}: grinden är inte inkopplad`);
      assert.equal(/actionRequired !== 'false_positive'/.test(kod), false,
        `${fil}: det gamla filtret är sant för undefined — «AI:n svarade inte» blev «AI:n bekräftade»`);
    }
  });
});

// ── H5: GOLVET MÅSTE MÄTA KUNDENS PRIS, INTE KUNDENS PRODUKTVAL ──────────────────────────────
// `ORDER BY price_monthly ASC LIMIT 1` hämtade kategorins BILLIGASTE produkt oavsett vad kunden
// har. Fable 5:s körning mot de fyra Microsoft-raderna i seed-price-db:
//   E3-kund på EXAKT E3:s listpris (462 kr)  → percentOver 571, golv 69 (Basic)
//   Premium på exakt listpris (252,35)       → percentOver 266, golv 69
//   Standard på exakt listpris (143,38)      → percentOver 108, golv 69
//   Basic på exakt listpris (68,88)          → null (korrekt)
// Tre av fyra kunder som betalar leverantörens EGEN prislapp flaggades som att de blöder.
//
// Testet prövar KOPPLINGEN utan databas: att spärren läses ur prisboken (mätt, inte tyckt), att
// nivåläsaren är den delade (regel 1) och att anroparen matar radtexterna. Själva SQL-grenen
// kräver Postgres och prövas av sonden — men utan de tre nedan kan grenen aldrig nås rätt.
describe('LU · Golvet kräver bekräftad nivå där spänningen är mätt (H5)', () => {
  test('LU-16 · spärren läses ur PRISBOKEN, hårdkodas inte per kategori', async () => {
    const { BRANCHINDEX } = await import('../agents/recommender/branchindex.js');
    // saas: 9,6× spann mellan Basic och E5 → nivå krävs. mobil: 1,1× → kategorigolv duger.
    assert.equal(BRANCHINDEX['saas-productivity']?.kraverBekraftadNiva, true,
      'saas har 9,6× spann — utan bekräftad nivå mäter golvet produktvalet');
    assert.notEqual(BRANCHINDEX['mobil']?.kraverBekraftadNiva, true,
      'mobil har 1,1× spann — där ÄR kategorigolvet rätt jämförelse. Spärren är mätt, inte tyckt');

    const kod = readFileSync(new URL('../lib/price-alert.js', import.meta.url), 'utf8')
      .split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
    assert.match(kod, /BRANCHINDEX\[category\]\?\.kraverBekraftadNiva/,
      'deklarationen måste läsas ur prisboken — en lista per kategori här kan glida isär');
  });

  test('LU-17 · nivån läses med den DELADE läsaren, inte en ny tier-regex', () => {
    const kod = readFileSync(new URL('../lib/price-alert.js', import.meta.url), 'utf8');
    assert.match(kod, /import \{ lasLicensniva \} from '\.\/licensniva\.js'/,
      'regel 1: en sanning per fråga — ingen andra tier-läsning');
    assert.match(kod, /nivaOviss/, 'utan bevisad nivå ska fakta stå kvar men PÅSTÅENDET utebli');
  });

  test('LU-18 · anroparen matar radtexterna — utan dem kan nivån aldrig bevisas', () => {
    const api = readFileSync(new URL('../api/test-invoice.mjs', import.meta.url), 'utf8');
    // Fönstret måste sluta vid anropets SLUT, inte efter N tecken: min första version tog 400
    // tecken och nådde inte förbi kommentaren ovanför raden. Mätinstrumentet var felet, inte koden.
    const start = api.indexOf('detectPriceAlert({');
    assert.notEqual(start, -1, 'hittade inget anrop — testet får inte bli grönt av tomhet');
    const anrop = api.slice(start, api.indexOf('}).catch', start));
    assert.match(anrop, /lineItems:\s+extracted\.lineItems/,
      'grinden är verkningslös om anroparen inte skickar underlaget — LFL-läxan 12 aug');
  });
});
