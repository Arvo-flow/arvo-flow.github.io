// tests/saas-rad.mjs — MATAREN får inte kunna uppfinna det grinden kräver.
//
// Grindens värde ligger helt i vad den VÄGRAR. Mataren står mellan extraktionen och grinden, och
// är därför den enda plats där ett antagande kan smyga in och göra varje faktura avstämningsbar —
// utan att någon grindregel ändrats. Testerna nedan är skrivna mot just den risken: för varje
// obligatoriskt fält finns ett test som bevisar att ett SAKNAT värde ger tystnad, inte ett default.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { byggAvstamningsrad, byggAvstamningsrader, vaktadeRaderUrPrisbok, MATNING, ORE_TOLERANS, FARSKHET_DAGAR } from '../lib/saas-rad.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import m365Verifier from '../lib/verifiers/m365.mjs';
import { stamAv, AVST } from '../lib/saas-avstamning.js';

const KONTEXT = { leverantor: 'microsoft', valuta: 'SEK', momsbas: 'exkl', period: 'monthly' };
// M365 Business Standard: 133,82 kr/lic/mån × 5 = 669,10 kr. Kronorfältet avrundar till 669.
const RAD = { description: 'Microsoft 365 Business Standard', quantity: 5, amount: 669, amountOre: 66_910 };

describe('SR-01 · Mataren bygger raden när allt är observerat', () => {
  test('komplett rad passerar och bär öresbeloppet orört', () => {
    const ut = byggAvstamningsrad(RAD, KONTEXT);
    assert.equal(ut.ok, true, ut.skal);
    assert.deepEqual(ut.rad, {
      leverantor: 'microsoft', antal: 5, beloppOre: 66_910,
      period: 'manad', momsbas: 'exkl', valuta: 'SEK',
    });
  });

  test('den byggda raden går faktiskt ihop i grinden — hela kedjan, inte bara formen', () => {
    const { rad } = byggAvstamningsrad(RAD, KONTEXT);
    const vaktad = [{
      leverantor: 'microsoft', tier: 'Business Standard', prisOre: 13_382,
      period: 'manad', momsbas: 'exkl', valuta: 'SEK', vaktad: true, farsk: true,
      kalla: 'microsoft.com/sv-se, verifierad 2026-08-05',
    }];
    const dom = stamAv(rad, vaktad);
    assert.equal(dom.utfall, AVST.BEVISAD_LIKHET, dom.skal ?? '');
    assert.equal(dom.enhetOre, 13_382);
    assert.match(dom.likhet.pastaende, /exakt lika med det verifierade listpriset/);
    // LIKHET, aldrig identitet (obduktionen 2026-08-11).
    assert.doesNotMatch(dom.likhet.pastaende, /\bni har\b/i);
  });
});

describe('SR-02 · Varje saknat fält ger tystnad — aldrig ett default', () => {
  const fall = [
    ['momsbasen saknas',        { ...KONTEXT, momsbas: null },        RAD, MATNING.INGEN_MOMSBAS],
    ['momsbasen är påhittad',   { ...KONTEXT, momsbas: 'kanske' },    RAD, MATNING.INGEN_MOMSBAS],
    ['leverantören saknas',     { ...KONTEXT, leverantor: null },     RAD, MATNING.INGEN_LEVERANTOR],
    ['valutan saknas',          { ...KONTEXT, valuta: null },         RAD, MATNING.INGEN_VALUTA],
    ['perioden är kvartal',     { ...KONTEXT, period: 'quarterly' },  RAD, MATNING.INGEN_PERIOD],
    ['perioden är okänd',       { ...KONTEXT, period: 'unknown' },    RAD, MATNING.INGEN_PERIOD],
    ['antalet saknas',          KONTEXT, { ...RAD, quantity: null },  MATNING.INGET_ANTAL],
    ['antalet är en sträng',    KONTEXT, { ...RAD, quantity: '5' },   MATNING.INGET_ANTAL],
    ['antalet är decimalt',     KONTEXT, { ...RAD, quantity: 2.5 },   MATNING.INGET_ANTAL],
    ['ören saknas',             KONTEXT, { ...RAD, amountOre: null }, MATNING.INGA_ORE],
    ['ören är decimala',        KONTEXT, { ...RAD, amountOre: 66_910.5 }, MATNING.INGA_ORE],
  ];
  for (const [namn, kontext, rad, skal] of fall) {
    test(namn + ' → tystnad med namngivet skäl', () => {
      const ut = byggAvstamningsrad(rad, kontext);
      assert.equal(ut.ok, false, `raden borde ha avvisats: ${namn}`);
      assert.equal(ut.skal, skal);
    });
  }
});

describe('SR-03 · Kvartalspriset delas aldrig på tre', () => {
  // Frestelsen är uppenbar: ett kvartalspris ÄR tre månader. Men att dela beloppet förutsätter att
  // debiteringen är jämnt fördelad, och det vet vi inte. En delning här hade varit en gissning
  // klädd i aritmetik — samma klass som prorata-felet CR-88412.
  test('kvartal ger tystnad, inte en tredjedel', () => {
    const ut = byggAvstamningsrad(RAD, { ...KONTEXT, period: 'quarterly' });
    assert.equal(ut.ok, false);
    assert.equal(ut.skal, MATNING.INGEN_PERIOD);
  });
});

describe('SR-04 · Två avläsningar av samma belopp måste vara överens', () => {
  test('avrundningsglapp inom toleransen släpps igenom', () => {
    // 669 kr vs 669,10 kr = 10 öre. Kronorfältet är avrundat; det är förväntat.
    assert.equal(byggAvstamningsrad({ ...RAD, amount: 669 }, KONTEXT).ok, true);
  });

  test('glapp över toleransen avvisas — vi medlar aldrig mellan två tal', () => {
    const ut = byggAvstamningsrad({ ...RAD, amount: 700 }, KONTEXT);
    assert.equal(ut.ok, false);
    assert.equal(ut.skal, MATNING.ORE_MOT_KRONOR);
  });

  test('toleransen är avrundning, inte ett spelrum', () => {
    assert.ok(ORE_TOLERANS <= 50, 'över 50 öre är inte längre ett avrundningsglapp');
  });
});

// ── SR-07 · Radens egen aritmetik — den icke-cirkulära kontrollen ─────────────────────────────
// Sonden kunde mäta att öresfälten KOMMER FRAM, aldrig att modellen läste rätt ruta. Ett
// hallucinerat öresbelopp ser identiskt ut med ett avläst och bär precisionens auktoritet.
// Att jämföra mot prisboken vore cirkulärt — prisboken är det grinden stämmer av MOT. Fakturans
// egna tal är däremot ett oberoende vittne: à-pris × antal ÄR radbeloppet.
describe('SR-07 · À-pris × antal måste vara radbeloppet', () => {
  test('rad som går ihop passerar', () => {
    const ut = byggAvstamningsrad({ ...RAD, unitPriceOre: 13_382 }, KONTEXT);
    assert.equal(ut.ok, true, ut.skal);   // 13 382 × 5 = 66 910
  });

  test('rad som inte går ihop avvisas — vi vet inte vilken avläsning som är fel', () => {
    const ut = byggAvstamningsrad({ ...RAD, unitPriceOre: 13_000 }, KONTEXT);
    assert.equal(ut.ok, false);
    assert.equal(ut.skal, MATNING.RADEN_GAR_INTE_IHOP);
  });

  test('ingen tolerans — ett öre fel är fel', () => {
    const ut = byggAvstamningsrad({ ...RAD, unitPriceOre: 13_383 }, KONTEXT);
    assert.equal(ut.ok, false,
      'med tolerans skulle grindens härledda enhetspris motsäga fakturans egna à-pris');
  });

  test('saknas à-pris kan kontrollen inte köras — och hittar då på inget', () => {
    assert.equal(byggAvstamningsrad({ ...RAD, unitPriceOre: null }, KONTEXT).ok, true);
  });
});

describe('SR-05 · Radsvepet redovisar varje rad, även de avvisade', () => {
  test('en avvisad rad försvinner inte tyst ur resultatet', () => {
    const ut = byggAvstamningsrader([RAD, { ...RAD, amountOre: null }], KONTEXT);
    assert.equal(ut.length, 2, 'lika många utfall som rader — en tyst bortfiltrering döljer skälet');
    assert.equal(ut[0].ok, true);
    assert.equal(ut[1].ok, false);
    assert.equal(ut[1].skal, MATNING.INGA_ORE);
    assert.equal(ut[1].beskrivning, RAD.description, 'skälet ska gå att koppla till en rad');
  });
});

// ── SR-08 · CR-88412 låst mot pappret ─────────────────────────────────────────────────────────
// Talen nedan är AVLÄSTA ur fakturans textlager (deterministisk pdfjs-extraktion, ingen modell i
// loopen) och stämde exakt mot vad extraktionen påstod i stickprovet 2026-08-12. De är därmed
// verifierade mot källan, inte mot vår egen pipeline.
//
// Raden som gör testet nödvändigt är prorata-raden: 612,50 kr avrundas till 613 kr i kronorfältet,
// vilket ger EXAKT 50 öres avstånd — precis på ORE_TOLERANS-gränsen. Den som "stramar åt för
// säkerhets skull" till 49 fäller en helt korrekt faktura. Konstanten är alltså lastbärande, och
// nu vet nästa läsare varför.
describe('SR-08 · CloudReseller CR-88412 — verifierad mot fakturans textlager', () => {
  const KTX = { leverantor: 'cloudreseller', valuta: 'SEK', momsbas: 'exkl', period: 'monthly' };

  test('hela licensrader passerar (45 × 245,00 = 11 025,00)', () => {
    const ut = byggAvstamningsrad(
      { description: 'Microsoft 365 Business Premium', quantity: 45, amount: 11_025, amountOre: 1_102_500, unitPriceOre: 24_500 }, KTX);
    assert.equal(ut.ok, true, ut.skal);
    assert.equal(ut.rad.beloppOre / ut.rad.antal, 24_500, 'härlett enhetspris ska vara fakturans à-pris');
  });

  test('prorata-raden avvisas — 612,50 kr för 5 licenser är inte ett licenspris', () => {
    const ut = byggAvstamningsrad(
      { description: 'Microsoft 365 Business Premium (Prorata tillägg)', quantity: 5, amount: 613, amountOre: 61_250, unitPriceOre: 24_500 }, KTX);
    assert.equal(ut.ok, false);
    assert.equal(ut.skal, MATNING.RADEN_GAR_INTE_IHOP);
    // Hade den passerat: 61 250 / 5 = 12 250 öre = 122,50 kr, presenterat som kundens
    // per-licenspris för Business Premium. Ett halvmånadsbelopp draget som en prislapp.
  });

  test('kronor-mot-öre-toleransen är exakt tillräcklig för 612,50 → 613', () => {
    // 613 × 100 − 61 250 = 50. Precis på gränsen. Stramas ORE_TOLERANS åt fälls en korrekt faktura.
    assert.equal(Math.abs(61_250 - Math.round(613 * 100)), ORE_TOLERANS,
      'CR-88412:s prorata-rad ligger exakt på toleransgränsen — konstanten är lastbärande');
  });
});

describe('SR-06 · Extraktionen får inte defaulta momsbasen', () => {
  // Den farligaste enskilda raden i hela kedjan vore `momsbas: raw.moms_bas ?? "exkl"`. Den hade
  // gjort varje faktura avstämningsbar och sett fullständigt oskyldig ut i en diff.
  test('normaliseringen sätter aldrig ett värde när fakturan tiger', async () => {
    const { readFileSync } = await import('node:fs');
    const kod = readFileSync(new URL('../agents/test-invoice/extract.js', import.meta.url), 'utf8');
    assert.doesNotMatch(kod, /moms_bas\s*\?\?\s*['"]/,
      'momsbasen får aldrig defaulta — då uppfinner extraktionen den observation grinden kräver');
    assert.match(kod, /raw\.moms_bas === 'exkl' \|\| raw\.moms_bas === 'inkl'/,
      'momsbasen ska släppas igenom endast när den är en av de två observerbara värdena');
  });
});

// ── SR-09 · Vaktad status kommer ur vad verifieraren LÄSER ────────────────────────────────────
// Grinden litar på `vaktad`. Om det fältet sätts av något annat än en maskin som faktiskt läser
// priset, är hela avstämningen ett cirkelresonemang med extra steg.
describe('SR-09 · Prisbokens vaktade rader speglar verifierarens deklaration', () => {
  const TIERS = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
  const rader = () => vaktadeRaderUrPrisbok(TIERS, {
    leverantor: 'microsoft', bevakadeTiers: m365Verifier.bevakadeTiers, idag: new Date('2026-08-12T00:00:00Z'),
  });

  test('varje SEK-nivå ger både månads- och årsavtalsrad', () => {
    const bs = rader().filter((r) => r.tierNyckel === 'business-standard');
    assert.equal(bs.length, 2, 'båda avtalsformerna är listpris — att bara bära den ena döljer halva marknaden');
    assert.deepEqual(bs.map((r) => r.prisOre).sort((a, b) => a - b), [13_382, 16_058]);
  });

  test('en nivå utanför verifierarens deklaration är INTE vaktad', () => {
    const utan = vaktadeRaderUrPrisbok(TIERS, { leverantor: 'microsoft', bevakadeTiers: ['business-standard'], idag: new Date('2026-08-12T00:00:00Z') });
    assert.equal(utan.find((r) => r.tierNyckel === 'e3')?.vaktad, false,
      'vaktad får aldrig betyda "leverantören har en verifierare" — det var E3-hålet');
  });

  test('E3 och E5 är vaktade nu — hålet från 2026-08-12 är stängt', () => {
    for (const nyckel of ['e3', 'e5']) {
      assert.equal(rader().find((r) => r.tierNyckel === nyckel)?.vaktad, true,
        `${nyckel} måste läsas av m365-verifieraren — det är prisbokens största tal`);
    }
  });

  test('ett gammalt ankare är inte färskt, hur vaktat det än är', () => {
    const gamla = vaktadeRaderUrPrisbok({ x: { msrpAnnual: 100, currency: 'SEK', lastVerified: '2026-01-01', source: 's' } },
      { leverantor: 'microsoft', bevakadeTiers: ['x'], idag: new Date('2026-08-12T00:00:00Z') });
    assert.equal(gamla[0].farsk, false);
    assert.ok(FARSKHET_DAGAR <= 30, 'veckovis verifiering → mer än en månads tystnad är fyra missade körningar');
  });
});
