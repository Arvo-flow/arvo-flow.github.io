// tests/verifikationskvitto.mjs — B4: verifikationsmanifestet ur routeExtraction.
//
// Kvittot i kundytan byggs av VERKLIGA domslut som grindarna emitterar — aldrig
// av påstående UI-text (anti-Potemkin, hjärtslags-läxan 1C). Dessa tester låser:
//   1. Emissionen: varje grind lämnar sitt domslut, även när den passerar.
//   2. Anti-Potemkin-golvet: en kontroll som inte kunde döma säger 'ej_provbar'
//      — den påstår ALDRIG en bock den inte förtjänat (korpusdiff-läxan).
//   3. Grind-beteendet är ORÖRT: samma routes som före B4 (regel 7 — manifestet
//      är en observatör, aldrig en ny grind).
//
// OBS sv-SE toLocaleString använder no-break space — detaljtexter NBSP-normaliseras
// före regex (två gånger bränd, aldrig igen).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { routeExtraction } from '../agents/test-invoice/extract.js';

const nbsp = (s) => s.replace(/ /g, ' ');
const row = (r, id) => r.verifications.find((v) => v.id === id);

const friskBas = () => ({
  supplier: 'Telia Sverige AB',
  billingPeriod: 'monthly',
  annualCost: 20_940,
  confidenceScore: 0.95,
  invoiceTotal: 2_181, // 1 745 × 1,25 — glappet ÄR momsen
  lineItems: [
    { description: 'Jobbmobil M (5 st)', amount: 1745, type: 'recurring_subscription', quantity: 5, unitPrice: 349 },
  ],
  schemakrav: { ok: true, brott: 0 },
  projektionskrav: { provad: true, ok: true, deviationPct: 0, grund: 'ai_projektion_mot_radsumma' },
});

describe('B4 · verifikationsmanifestet — emission', () => {
  test('frisk faktura: route auto + fyra ok-domslut', () => {
    const r = routeExtraction(friskBas());
    assert.equal(r.route, 'auto');
    assert.ok(Array.isArray(r.verifications));
    for (const id of ['schemakrav', 'radsumma', 'balanskrav', 'projektion']) {
      assert.equal(row(r, id)?.status, 'ok', `${id} ska vara ok`);
    }
  });

  test('moms-förklarad totalsumma: radsumma-domen namnger momsen', () => {
    const r = routeExtraction(friskBas());
    assert.match(nbsp(row(r, 'radsumma').detalj), /momsen/);
  });

  test('exakt matchande totalsumma (exkl. moms): ok med beloppet i detaljen', () => {
    const e = friskBas();
    e.invoiceTotal = 1_745;
    const r = routeExtraction(e);
    assert.equal(row(r, 'radsumma').status, 'ok');
    assert.match(nbsp(row(r, 'radsumma').detalj), /1 745 kr/);
  });
});

describe('B4 · anti-Potemkin-golvet — oförtjänta bockar existerar inte', () => {
  test('rader utan antal × à-pris: balanskrav = ej_provbar, aldrig ok', () => {
    const e = friskBas();
    e.lineItems = [{ description: 'Jobbmobil M (5 st)', amount: 1745, type: 'recurring_subscription' }];
    const r = routeExtraction(e);
    assert.equal(row(r, 'balanskrav').status, 'ej_provbar');
    assert.match(row(r, 'balanskrav').detalj, /antal och à-pris/);
  });

  test('ingen fakturatotal: radsumma = ej_provbar, aldrig ok', () => {
    const e = friskBas();
    delete e.invoiceTotal;
    const r = routeExtraction(e);
    assert.equal(row(r, 'radsumma').status, 'ej_provbar');
    assert.equal(r.route, 'auto');
  });

  test('analys utan schemadom (äldre väg): schemakrav = ej_provbar', () => {
    const e = friskBas();
    delete e.schemakrav;
    const r = routeExtraction(e);
    assert.equal(row(r, 'schemakrav').status, 'ej_provbar');
  });

  test('dömda rader räknas ärligt i detaljen (1 prövbar rad ≠ "samtliga rader")', () => {
    const r = routeExtraction(friskBas());
    assert.match(row(r, 'balanskrav').detalj, /samtliga 1 prövbara rader/);
  });
});

describe('B4 · grind-beteendet är orört (manifestet är observatör)', () => {
  test('obalanserad rad i SKUGGA: varning i manifestet men route förblir auto', () => {
    const e = friskBas();
    e.invoiceTotal = null;
    e.lineItems = [
      { description: 'Jobbmobil M', amount: 9_999, type: 'recurring_subscription', quantity: 5, unitPrice: 349 },
    ];
    const r = routeExtraction(e);
    assert.equal(r.route, 'auto');
    assert.equal(row(r, 'balanskrav').status, 'varning');
    assert.match(row(r, 'balanskrav').detalj, /1 av 1/);
  });

  test('Ring1-brott: stopp-dom + review_queue + manifestet följer med', () => {
    const e = friskBas();
    e.invoiceTotal = 9_999; // varken tolerans eller moms förklarar
    const r = routeExtraction(e);
    assert.equal(r.route, 'review_queue');
    assert.match(r.reason, /Ring1/);
    assert.equal(row(r, 'radsumma').status, 'stopp');
  });

  test('AI-projektion som avviker (SKUGGA): varning med avvikelsen, route auto', () => {
    const e = friskBas();
    e.projektionskrav = { provad: true, ok: false, deviationPct: 8.3, grund: 'ai_projektion_mot_radsumma' };
    const r = routeExtraction(e);
    assert.equal(r.route, 'auto');
    assert.equal(row(r, 'projektion').status, 'varning');
    assert.match(nbsp(row(r, 'projektion').detalj), /8\.3 %/);
  });

  test('deterministisk projektion (radsumma): ok utan verifierings-anspråk', () => {
    const e = friskBas();
    e.projektionskrav = { provad: false, ok: true, grund: 'radsumma_deterministisk' };
    const r = routeExtraction(e);
    assert.equal(row(r, 'projektion').status, 'ok');
    assert.match(row(r, 'projektion').detalj, /deterministiskt/);
  });

  test('confidence under tröskel: review_queue och manifestet bär de dömda grindarna', () => {
    const e = friskBas();
    e.confidenceScore = 0.5;
    const r = routeExtraction(e);
    assert.equal(r.route, 'review_queue');
    assert.equal(row(r, 'radsumma').status, 'ok'); // grindarna FÖRE stoppet dömde färdigt
  });

  test('outOfScope: unsupported med tomt manifest (inget doms — inget påstås)', () => {
    const r = routeExtraction({ outOfScope: true, outOfScopeReason: 'insurance' });
    assert.equal(r.route, 'unsupported');
    assert.deepEqual(r.verifications, []);
  });
});
