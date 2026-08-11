// tests/saas-avstamning.mjs — låser SAAS-AVSTÄMNINGEN. Bevisbördan för ett tal bor här.
//
// Varje låsning nedan svarar mot ett krav ur Fable 5:s obduktion av den första ritningen.
// Det viktigaste testet i filen är inte att grinden fyrar — det är att den TIGER, och att den
// aldrig påstår identitet när den bara bevisat likhet.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { stamAv, AVST, SKAL, BLINDA_TILLSTAND } from '../lib/saas-avstamning.js';

// Pipedrive Lite: 14,00 i månaden = 1400 öre. Growth 39,00 = 3900 öre.
const LITE   = { leverantor: 'pipedrive', tier: 'pipedrive-lite',   prisOre: 1400, period: 'manad', momsbas: 'exkl', valuta: 'USD', vaktad: true, farsk: true, kalla: 'pipedrive.com/en/pricing' };
const GROWTH = { leverantor: 'pipedrive', tier: 'pipedrive-growth', prisOre: 3900, period: 'manad', momsbas: 'exkl', valuta: 'USD', vaktad: true, farsk: true, kalla: 'pipedrive.com/en/pricing' };
const RAD = { leverantor: 'pipedrive', antal: 5, beloppOre: 7000, period: 'manad', momsbas: 'exkl', valuta: 'USD' };

describe('saas-avstämningen · beviset', () => {
  test('exakt en vaktad hypotes går ihop → BEVISAD_LIKHET', () => {
    const d = stamAv(RAD, [LITE, GROWTH]);
    assert.equal(d.utfall, AVST.BEVISAD_LIKHET);
    assert.equal(d.enhetOre, 1400);
    assert.equal(d.likhet.tier, 'pipedrive-lite');
  });

  // ── KÄRNAN I HELA OMBYGGNADEN ──────────────────────────────────────────────────────────
  // Aritmetiken bevisar LIKHET. Att säga "ni har Pipedrive Lite" vore att påstå identitet om
  // en marknad vars produkter till största delen saknas i vår bok.
  test('påståendet formuleras som LIKHET, aldrig som identitet', () => {
    const { pastaende } = stamAv(RAD, [LITE, GROWTH]).likhet;
    assert.match(pastaende, /exakt lika med det verifierade listpriset/);
    assert.doesNotMatch(pastaende, /\b(ni har|ni använder|kunden har)\b/i);
  });
});

describe('saas-avstämningen · fail-closed', () => {
  const tyst = (rad, vaktade, skal) => {
    const d = stamAv(rad, vaktade);
    assert.equal(d.utfall, AVST.TYST, JSON.stringify(rad));
    if (skal) assert.equal(d.skal, skal);
    assert.equal(d.likhet, null);
  };

  test('utan deterministiskt fastställd leverantör: tystnad (priset pekar aldrig ut VEM)', () => {
    tyst({ ...RAD, leverantor: null }, [LITE], SKAL.INGEN_LEVERANTOR);
  });

  test('leverantörsgränsen korsas aldrig — en Zoho-rad matchar inte en Pipedrive-faktura', () => {
    const zoho = { ...LITE, leverantor: 'zoho', tier: 'zoho-crm-standard' };
    tyst(RAD, [zoho], SKAL.INGEN_TRAFF);
  });

  test('utan antal, eller med icke-heltal: tystnad', () => {
    for (const a of [undefined, 0, -3, 2.5, '5']) tyst({ ...RAD, antal: a }, [LITE]);
  });

  test('utan deterministisk period: tystnad', () => {
    tyst({ ...RAD, period: null }, [LITE], SKAL.INGEN_PERIOD);
  });

  // Ingen multiplikationsroulette: vi provar aldrig pris × 1,25 för att få det att gå ihop.
  test('utan momsbas ur fakturans egna fält: tystnad', () => {
    tyst({ ...RAD, momsbas: undefined }, [LITE], SKAL.INGEN_MOMSBAS);
    // och en inkl-moms-rad matchar aldrig en exkl-moms-prisbokrad
    tyst({ ...RAD, momsbas: 'inkl' }, [LITE], SKAL.INGEN_TRAFF);
  });

  test('ojämn delning är ett nej, aldrig ett nästan', () => {
    tyst({ ...RAD, beloppOre: 7001 }, [LITE], SKAL.OJAMN_DELNING);
    tyst({ ...RAD, beloppOre: 6999 }, [LITE], SKAL.OJAMN_DELNING);
  });

  test('flera hypoteser → tystnad, aldrig den mest sannolika', () => {
    const dubblett = { ...GROWTH, tier: 'annan-produkt-samma-pris', prisOre: 1400 };
    tyst(RAD, [LITE, dubblett], SKAL.FLERA_TRAFFAR);
  });

  // Unikheten räknas över (rad × period × momsbas) — inte över rader. 14/mån och 168/år är
  // samma produkt i två hypoteser, och de får aldrig kollidera med varandra.
  test('Pipedrive-fällan: 14 i månaden och 168 om året är skilda hypoteser', () => {
    const arsrad = { ...LITE, prisOre: 16800, period: 'ar' };
    const d = stamAv(RAD, [LITE, arsrad]);          // månadsrad → bara månadshypotesen gäller
    assert.equal(d.utfall, AVST.BEVISAD_LIKHET);
    const arsfaktura = { ...RAD, period: 'ar', beloppOre: 84000 };   // 5 × 168,00
    assert.equal(stamAv(arsfaktura, [LITE, arsrad]).likhet.tier, 'pipedrive-lite');
  });

  test('ingen FX: annan valuta går aldrig ihop', () => {
    tyst({ ...RAD, valuta: 'SEK' }, [LITE], SKAL.INGEN_TRAFF);
    tyst({ ...RAD, valuta: 'EUR' }, [LITE], SKAL.INGEN_TRAFF);
  });

  // Prisboksläxan: 16 obevakade dygn tillverkade besparingar. En orörd rad bevisar ingenting.
  test('ovaktad eller inaktuell rad får aldrig bevisa något', () => {
    tyst(RAD, [{ ...LITE, vaktad: false }], SKAL.OVAKTAD_RAD);
    tyst(RAD, [{ ...LITE, farsk: false }], SKAL.OVAKTAD_RAD);
  });

  test('tom bok och trasiga indata är tystnad, aldrig ett bevis', () => {
    for (const v of [[], null, undefined]) tyst(RAD, v);
    assert.equal(stamAv(null, [LITE]).utfall, AVST.TYST);
  });
});

// De blinda tillstånden är UTTALADE, aldrig upptäckta i produktion.
describe('saas-avstämningen · blindfläcken är deklarerad', () => {
  test('varje känt tillstånd där grinden aldrig kan fyra bär en förklaring', () => {
    for (const nyckel of ['RABATTERAD', 'ATERFORSALJARE', 'AKTIV_ANVANDARE', 'UTANFOR_BOKEN', 'ANNAN_VALUTA']) {
      assert.ok((BLINDA_TILLSTAND[nyckel] ?? '').length >= 30, nyckel);
    }
  });

  test('en rabatterad kund faller ut som tystnad, inte som ett fynd', () => {
    // 12,60 = 10 % rabatt på 14,00. Ingen hypotes går ihop → tystnad, inte "nästan Lite".
    const d = stamAv({ ...RAD, beloppOre: 6300 }, [LITE, GROWTH]);
    assert.equal(d.utfall, AVST.TYST);
    assert.equal(d.skal, SKAL.INGEN_TRAFF);
  });
});
