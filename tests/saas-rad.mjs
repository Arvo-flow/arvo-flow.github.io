// tests/saas-rad.mjs — MATAREN får inte kunna uppfinna det grinden kräver.
//
// Grindens värde ligger helt i vad den VÄGRAR. Mataren står mellan extraktionen och grinden, och
// är därför den enda plats där ett antagande kan smyga in och göra varje faktura avstämningsbar —
// utan att någon grindregel ändrats. Testerna nedan är skrivna mot just den risken: för varje
// obligatoriskt fält finns ett test som bevisar att ett SAKNAT värde ger tystnad, inte ett default.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { byggAvstamningsrad, byggAvstamningsrader, MATNING, ORE_TOLERANS } from '../lib/saas-rad.js';
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
