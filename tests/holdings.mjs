// tests/holdings.mjs — låser leverantörsgrupperingen i rummet (dubblett-buggen).
// Förr: nyckeln prioriterade normalized_supplier men namnet visade supplier (omvänd ordning),
// så samma leverantör kunde dyka upp som två kort med motstridiga domar. Nu: nyckel = namn|kategori.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { groupBySupplier, supplierName, supplierDiagScore, computeActing } from '../src/lib/holdings.js';

const a = (o) => ({ net_saving: 0, category: 'mobil', created_at: '2025-06-01', ...o });

describe('Holdings · visningsnamn + kanonisering', () => {
  test('kända varumärken kanoniseras (Telia Företag = Telia Sverige AB = Telia)', () => {
    assert.equal(supplierName({ normalized_supplier: 'Telia Företag' }), 'Telia');
    assert.equal(supplierName({ normalized_supplier: 'Telia Sverige AB' }), 'Telia');
    assert.equal(supplierName({ supplier: 'Tele2 Företag AB' }), 'Tele2');
    assert.equal(supplierName({ normalized_supplier: 'Microsoft Ireland Operations' }), 'Microsoft');
  });
  test('okända leverantörer rörs ALDRIG (ingen över-sammanslagning)', () => {
    assert.equal(supplierName({ supplier: 'Råform AB' }), 'Råform AB');
    assert.equal(supplierName({ normalized_supplier: 'SveaMobil Företag AB' }), 'SveaMobil Företag AB');
    assert.equal(supplierName({}), 'Okänd leverantör');
  });
});

describe('Holdings · gruppering', () => {
  test('samma leverantör + samma kategori → ETT kort, senaste vinner (dubbletten borta)', () => {
    const g = groupBySupplier([
      a({ id: 1, normalized_supplier: 'Telia Sverige AB', category: 'mobil', created_at: '2025-06-02', annual_cost: 58092 }),
      a({ id: 2, normalized_supplier: 'Telia Sverige AB', category: 'mobil', created_at: '2025-06-03', annual_cost: 269460 }),
    ]);
    assert.equal(g.length, 1);                 // inte två kort
    assert.equal(g[0].count, 2);
    assert.equal(g[0].latest.id, 2);           // senaste analysen
  });

  test('Telia Företag + Telia Sverige AB (båda mobil) → ETT kort (varumärkes-kanonisering)', () => {
    const g = groupBySupplier([
      a({ id: 1, normalized_supplier: 'Telia Företag', category: 'mobil', created_at: '2025-06-12' }),
      a({ id: 2, normalized_supplier: 'Telia Sverige AB', category: 'mobil', created_at: '2025-06-13' }),
    ]);
    assert.equal(g.length, 1);
    assert.equal(g[0].count, 2);
    assert.equal(supplierName(g[0].latest), 'Telia');
  });

  test('samma varumärke + OLIKA kategori → TVÅ kort (Tele2 mobil ≠ Tele2 bredband)', () => {
    const g = groupBySupplier([
      a({ id: 1, normalized_supplier: 'Tele2 Företag AB', category: 'mobil' }),
      a({ id: 2, normalized_supplier: 'Tele2 Bredband AB', category: 'bredband' }),
    ]);
    assert.equal(g.length, 2);
  });

  test('samma leverantör + OLIKA kategori → TVÅ kort (mobil ≠ bredband)', () => {
    const g = groupBySupplier([
      a({ id: 1, normalized_supplier: 'Telia Sverige AB', category: 'mobil' }),
      a({ id: 2, normalized_supplier: 'Telia Sverige AB', category: 'bredband' }),
    ]);
    assert.equal(g.length, 2);
  });

  test('identiskt visat namn + kategori slås ALLTID ihop (nyckel = visat namn)', () => {
    // Båda visar "Telia Sverige AB" → får aldrig bli två kort
    const g = groupBySupplier([
      a({ id: 1, normalized_supplier: 'Telia Sverige AB', supplier: 'Telia', category: 'mobil' }),
      a({ id: 2, normalized_supplier: 'Telia Sverige AB', supplier: 'Telia Sverige AB', category: 'mobil' }),
    ]);
    assert.equal(g.length, 1);
  });

  test('sorteras på net_saving fallande', () => {
    const g = groupBySupplier([
      a({ id: 1, normalized_supplier: 'A', net_saving: 100 }),
      a({ id: 2, normalized_supplier: 'B', net_saving: 5000 }),
    ]);
    assert.equal(g[0].latest.id, 2);
  });

  test('tom indata → tom lista', () => {
    assert.deepEqual(groupBySupplier([]), []);
    assert.deepEqual(groupBySupplier(null), []);
  });
});

describe('supplierDiagScore · scoren följer SAMMA tal som besparings-pillen (regel 1)', () => {
  const row = (o) => ({ should_switch: true, annual_cost: 100000, gross_saving: 14000, net_saving: 11200, ...o });

  test('litet gap → hög score', () => {
    // ~13% gross gap → 100 - 13*1.5 ≈ 80, cap 79
    assert.equal(supplierDiagScore(row({ annual_cost: 58092, gross_saving: 7787, net_saving: 6230 })), 79);
  });

  test('stort gap → låg score', () => {
    // ~50% gross gap → 100 - 50*1.5 = 25
    assert.equal(supplierDiagScore(row({ annual_cost: 116940, gross_saving: 58470, net_saving: 46776 })), 25);
  });

  test('Telia-buggen kan inte återkomma: scoren ignorerar ett oense suggested_annual_cost', () => {
    // suggested_annual_cost antyder 34% (gammal kod → 49), men gross_saving säger 13% → score 79
    const s = supplierDiagScore(row({ annual_cost: 58092, suggested_annual_cost: 38300, gross_saving: 7787, net_saving: 6230 }));
    assert.equal(s, 79);                                  // följer pillen (gross_saving), inte suggested
  });

  test('det HÄRLEDDA talet styr — aldrig det frusna health_score', () => {
    // KONTRAKTET ÄNDRADES 2026-08-19, och skälet ska stå här. Testet låste att health_score styr.
    // Det talet räknades vid analystillfället mot getBenchmark, som föredrar livedata — och
    // livedatan är TOTALSUMMOR. Scoren behandlade totalen som ett styckpris och multiplicerade
    // med antalet licenser. Mätt ur grundarens rad: golvet blev 1 846 800 kr i stället för
    // 16 060 kr, 115 gånger för högt, och talet fastnade i taket. Rummet visade 92 och RÄTT
    // PRISSATT ovanför sitt eget bevis: "Ni ligger 184 % över det billigaste priset".
    //
    // Testet var grönt hela tiden och kunde inte ha varit annat: det matade health_score direkt
    // och bevisade bara att SIFFRAN FÖRS VIDARE — aldrig att den var räknad mot rätt golv.
    // Samma sjukdom som LFL-obduktionen: mekanismen prövad, matningen aldrig.
    //
    // arvoScore härleds nu ur prisunderlaget vid läsning — samma perEnhet och samma golv som
    // kortet skriver ut. Vidarebefordran prövas här; att talet är RÄTT prövas i tests/scorekrav.mjs
    // mot den verkliga jämförelsen.
    assert.equal(supplierDiagScore({ should_switch: false, annual_cost: 100000, arvoScore: 92 }), 92);
    assert.equal(supplierDiagScore({ should_switch: false, annual_cost: 100000, arvoScore: 61 }), 61);
    // Ett rekommenderat byte får aldrig visa ett högt "allt bra"-tal → taklägg vid 79.
    assert.equal(supplierDiagScore({ should_switch: true, net_saving: 5000, annual_cost: 100000, arvoScore: 90 }), 79);
    // Och det frusna talet får ALDRIG vinna — två producenter var hela felet.
    assert.equal(supplierDiagScore({ should_switch: false, annual_cost: 100000, arvoScore: 15, health_score: 92 }), 15);
  });

  test('utan health_score → INTE SATT (null), aldrig ett tal (grundarfråga 2026-08-16)', () => {
    // KONTRAKTET ÄNDRADES, och avsikten skärptes. Testet låste tidigare fallbacken 75 — infört mot
    // "det degenererade 82" som gav VARJE rätt-prissatt faktura samma tal. Problemet var att 75
    // löste fel halva: talen blev olika, men ett OMÄTT avtal såg fortfarande mätt ut. Värre: 75
    // ligger inom det giltiga intervallet, så ett räknat 75 och ett okänt gick inte att skilja åt.
    //
    // I skarpt läge visade grundarens Google-rad 75 medan det räknade talet var 90 — en oförtjänt
    // precision som dessutom underskattade kunden. null ritas som ett streck: ett okänt ser okänt ut.
    assert.equal(supplierDiagScore({ should_switch: false, annual_cost: 100000 }), null);
    assert.equal(supplierDiagScore({ annual_cost: 0 }), null);
    // Den ursprungliga avsikten står kvar: ett MÄTT tal ska vara differentierat, aldrig ett
    // hårdkodat 82 för alla.
    assert.equal(supplierDiagScore({ should_switch: false, annual_cost: 100000, arvoScore: 91 }), 91);
    assert.equal(supplierDiagScore({ should_switch: false, annual_cost: 100000, arvoScore: 64 }), 64);
    // Ett fruset health_score utan härlett tal fyller INTE tomrummet (2026-08-19).
    assert.equal(supplierDiagScore({ should_switch: false, annual_cost: 100000, health_score: 92 }), null);
  });

  test('monitoring → INGET tal (72 var en oförtjänt konstant)', () => {
    // KONTRAKTET ÄNDRADES 2026-08-20. Testet låste `route==='monitoring' → 72`, en konstant som
    // returnerades OVILLKORLIGT och därmed skrev över ett verkligt räknat score. En bevakad rad
    // med ett härlett tal på 15 visade 72 — och 72 ritas i ringen exakt som ett förtjänat 92.
    // Det är värre än 75-fallbacken: den fyllde ett tomrum, den här ersatte en mätning.
    // Att raden är avtalsbevakad syns på pillen ("Avtalsbevakad"), inte genom ett påhittat betyg.
    assert.equal(supplierDiagScore({ route: 'monitoring' }), null);
    assert.equal(supplierDiagScore({ route: 'monitoring', arvoScore: 15 }), 15, 'mätningen vinner');
  });

  test('faller tillbaka på net_saving om gross saknas', () => {
    // net 6230 → gross ≈ 7787 → ~13% → 79
    assert.equal(supplierDiagScore(row({ annual_cost: 58092, gross_saving: undefined, net_saving: 6230 })), 79);
  });
});

describe('computeActing · domen får aldrig ljuga mot sitt eget bevis (grundarlärdom 2026-06-30)', () => {
  test('live-fallet ordagrant: 0 byten + ett 16 800 kr/år-fynd → acting=true (INTE "allt under kontroll")', () => {
    const r = computeActing({ switchablesCount: 0, roomFinding: { title: 'Avbetald hårdvara', annualImpact: 16800 } });
    assert.equal(r.hasSwitchAction, false);
    assert.equal(r.hasFindingAction, true);
    assert.equal(r.acting, true);
  });

  test('byte finns, inget fynd → acting=true via switch', () => {
    const r = computeActing({ switchablesCount: 2, roomFinding: null });
    assert.equal(r.hasSwitchAction, true);
    assert.equal(r.hasFindingAction, false);
    assert.equal(r.acting, true);
  });

  test('varken byte eller fynd → acting=false, "håll kursen" är sant', () => {
    assert.equal(computeActing({ switchablesCount: 0, roomFinding: null }).acting, false);
  });

  test('fynd utan kr-belopp (annualImpact 0/null) räknas INTE som agerande — bara verkliga kostnader', () => {
    assert.equal(computeActing({ switchablesCount: 0, roomFinding: { title: 'Kreditnota', annualImpact: 0 } }).acting, false);
    assert.equal(computeActing({ switchablesCount: 0, roomFinding: { title: 'X' } }).acting, false);
  });
});
