// tests/contract-clock.mjs — låser kontraktsklockan (Maktkalendern).
// Zero Trust: klockan visas ENDAST när fakturan uttalar ett verkligt framtida bindningsslut
// (servicePeriodEnd). Saknas det → null (regel 4, precision eller tystnad). `today` injiceras
// så testet är deterministiskt oavsett när det körs.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { contractClockFinding } from '../lib/contract-clock.js';

const TODAY = new Date('2026-06-20T10:00:00Z');

describe('Kontraktsklockan · Zero Trust (datum ur kundens egen faktura)', () => {
  test('inget servicePeriodEnd → null (tystnad är default)', () => {
    assert.equal(contractClockFinding({ servicePeriodEnd: null, today: TODAY }), null);
    assert.equal(contractClockFinding({ today: TODAY }), null);
  });

  test('ogiltigt datum → null (gissar aldrig)', () => {
    assert.equal(contractClockFinding({ servicePeriodEnd: 'inte-ett-datum', today: TODAY }), null);
  });

  test('bindningsslut redan passerat → null (route hanterar förfallet)', () => {
    assert.equal(contractClockFinding({ servicePeriodEnd: '2026-01-01', today: TODAY }), null);
    assert.equal(contractClockFinding({ servicePeriodEnd: '2026-06-20', today: TODAY }), null); // idag = inte "kvar"
  });

  test('framtida bindningsslut → fynd med korrekt dagar kvar (deterministiskt)', () => {
    const f = contractClockFinding({ servicePeriodEnd: '2026-12-31', supplier: 'Tele2', today: TODAY });
    assert.ok(f);
    assert.equal(f.kind, 'contract-clock');
    assert.equal(f.tone, 'watch');               // vaktens lugna besked, inte amber-larm
    assert.equal(f.endDate, '2026-12-31');
    assert.equal(f.daysLeft, 194);               // 2026-06-20 → 2026-12-31
    assert.equal(f.annualImpact, 0);             // klockan är ingen kr-läcka
    assert.match(f.title, /bundna till/i);
    assert.match(f.title, /december 2026/i);
    assert.match(f.metricText, /194 dagar kvar/);
    assert.match(f.text, /Tele2/);
  });

  test('1 dag kvar → singular "dag"', () => {
    const f = contractClockFinding({ servicePeriodEnd: '2026-06-21', today: TODAY });
    assert.equal(f.daysLeft, 1);
    assert.match(f.metricText, /^1 dag kvar$/);
  });

  test('uppsägningstid i framtiden → actByDate + uppsägnings-copy', () => {
    const f = contractClockFinding({
      servicePeriodEnd: '2026-12-31', cancellationNoticeDays: 90, supplier: 'Telia', today: TODAY,
    });
    assert.equal(f.actByDate, '2026-10-02');     // 2026-12-31 − 90 dagar
    assert.ok(f.daysToAct > 0);
    assert.match(f.lineDescription, /Uppsägningstid: 90 dagar/);
    assert.match(f.text, /sista dagen att säga upp/i);
  });

  test('uppsägningsfönster passerat → förfalls-copy utan framtida actBy', () => {
    const f = contractClockFinding({
      servicePeriodEnd: '2026-07-01', cancellationNoticeDays: 90, today: TODAY,
    });
    assert.ok(f);                                // bindningen är kvar (11 dagar)
    assert.equal(f.daysToAct, null);             // men uppsägningsfönstret (90 d) är passerat
    assert.match(f.text, /nära eller passerat/i);
  });

  test('saknad leverantör → neutral formulering, inget tomt namn', () => {
    const f = contractClockFinding({ servicePeriodEnd: '2026-12-31', today: TODAY });
    assert.match(f.text, /er nuvarande leverantör/);
  });
});
