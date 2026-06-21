// tests/price-forecast.mjs — låser prognosmotorn (Maktkalendern, bibelns nya regel 4).
// Zero Trust: prognosen byggs bara ur verklig prishistorik; under två höjningar → tystnad.
// Varje producerat fynd MÅSTE bära grund + konfidens + asymmetri.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { priceHikeForecast } from '../lib/price-forecast.js';

const hike = (date, oldM, newM) => ({ changed_at: date, old_price_monthly: oldM, new_price_monthly: newM });

describe('Prognosmotorn · Zero Trust-grind', () => {
  test('inga rader → null (tystnad)', () => {
    assert.equal(priceHikeForecast([]), null);
    assert.equal(priceHikeForecast(null), null);
  });

  test('en enda höjning → null (för tunt för en grundad uppfattning)', () => {
    assert.equal(priceHikeForecast([hike('2025-02-01', 100, 110)]), null);
  });

  test('prissänkningar räknas inte som höjningar → null', () => {
    const rows = [hike('2024-02-01', 110, 100), hike('2025-02-01', 105, 95)];
    assert.equal(priceHikeForecast(rows), null);
  });
});

describe('Prognosmotorn · säsongsmönster + de tre obligatoriska delarna', () => {
  const q1Hikes = [
    hike('2022-02-15', 100, 106),
    hike('2023-01-20', 106, 113),
    hike('2024-03-01', 113, 121),
    hike('2025-02-10', 121, 130),
  ];

  test('fyra Q1-höjningar → hög sannolikhet, namnger Q1', () => {
    const f = priceHikeForecast(q1Hikes, { supplier: 'Telia' });
    assert.ok(f);
    assert.equal(f.kind, 'price-forecast');
    assert.equal(f.tone, 'watch');
    assert.equal(f.confidence, 'high');
    assert.equal(f.quarter, 1);
    assert.match(f.title, /Telia höjer sannolikt i Q1/);
  });

  test('fyndet bär GRUND (källa), KONFIDENS (märkt bedömning) och ASYMMETRI', () => {
    const f = priceHikeForecast(q1Hikes, { supplier: 'Telia' });
    // grund — ur historiken, källbelagt
    assert.match(f.text, /höjt sitt publika pris i Q1 4 av 4/);
    // konfidens — uttryckligen märkt som bedömning, aldrig fakta
    assert.match(f.text, /Bedömning \(ej fakta\)/);
    // asymmetri — felaktigt utfall är kundens vinst
    assert.match(f.text, /[Kk]ommer höjningen inte/);
    assert.match(f.text, /betalade inget för beredskapen/);
    // konkret, källbelagd magnitud syns i metric-slotten (räknas hem)
    assert.match(f.metricText, /^\+/);
    // konfidensen står i prosan (inte som citat-rad)
    assert.match(f.text, /sannolikhet/i);
    assert.equal(f.lineDescription, null);
  });

  test('magnituden är medianen av höjningsprocenten (robust mot utstickare)', () => {
    // höjningar: 6%, ~6,6%, ~7,1%, ~7,4% → median ≈ 6,8%
    const f = priceHikeForecast(q1Hikes, { supplier: 'Telia' });
    assert.ok(f.magnitudePct >= 6 && f.magnitudePct <= 7.5);
  });

  test('spridda höjningar utan säsong → låg konfidens, ingen utpekad månad', () => {
    const spread = [
      hike('2023-02-01', 100, 105),
      hike('2024-08-01', 105, 110),
    ];
    const f = priceHikeForecast(spread, { supplier: 'Acme' });
    assert.ok(f);
    assert.equal(f.confidence, 'low');
    assert.equal(f.quarter, null);
    assert.match(f.title, /höjningstrend/);
    assert.match(f.text, /Bedömning \(ej fakta\)/);   // bär ändå konfidens + asymmetri
    assert.match(f.text, /betalade inget för beredskapen/);
  });

  test('saknad leverantör → neutral formulering, inget tomt namn', () => {
    const f = priceHikeForecast(q1Hikes);
    assert.match(f.text, /Leverantören har höjt/);
  });

  test('faller tillbaka på årspris när månadspris saknas', () => {
    const annual = [
      { changed_at: '2023-01-15', old_price_annual: 1200, new_price_annual: 1280 },
      { changed_at: '2024-02-15', old_price_annual: 1280, new_price_annual: 1360 },
      { changed_at: '2025-01-20', old_price_annual: 1360, new_price_annual: 1450 },
    ];
    const f = priceHikeForecast(annual, { supplier: 'Tele2' });
    assert.ok(f);
    assert.equal(f.quarter, 1);
  });
});
