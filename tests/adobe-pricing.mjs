// tests/adobe-pricing.mjs — låser B2B-momslogiken för Adobe. Verifierade individpriser (inkl moms)
// skalas av till EXKL moms (÷1,25) med robust avrundning. Inga flyttalsspöken (regel: tester får
// aldrig spricka på JS-flyttal). Detta är beviset bakom varje exkl-moms-tal saas-creative visar.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { round2, exVat, incVat } from '../lib/adobe-pricing.js';

describe('Adobe B2B-moms · robust avrundning (inga flyttalsspöken)', () => {
  test('round2 tar bort flyttalsdrift', () => {
    assert.equal(round2(0.1 + 0.2), 0.3);          // klassikern: 0.30000000000000004 → 0.3
    assert.equal(round2(746 * 1.25), 932.5);
    assert.equal(round2(249), 249);
  });

  test('exVat skalar av 25 % moms från verifierade individpriser → rena exkl-tal', () => {
    assert.equal(exVat(311.25), 249.00);   // Single App (t.ex. Photoshop)
    assert.equal(exVat(932.50), 746.00);   // All Apps (Creative Cloud Pro)
    assert.equal(exVat(741.25), 593.00);   // All Apps utan premium-AI (Standard)
    assert.equal(exVat(215.00), 172.00);   // Acrobat
    assert.equal(exVat(426.25), 341.00);   // Adobe Stock
  });

  test('exVat-resultaten är exakta (inga svansdecimaler som kan drifta i kedjan)', () => {
    for (const incl of [311.25, 932.50, 741.25, 215.00, 426.25]) {
      const ex = exVat(incl);
      assert.equal(ex, round2(ex), `exVat(${incl}) ska vara 2-decimalsstabilt`);
      assert.equal(Number.isInteger(ex), true, `exVat(${incl}) = ${ex} ska vara helt rent`);
    }
  });

  test('incVat är invers av exVat (rundningssäkert åt båda håll)', () => {
    for (const incl of [311.25, 932.50, 741.25, 215.00, 426.25]) {
      assert.equal(incVat(exVat(incl)), incl, `incVat(exVat(${incl})) ska återge originalet`);
    }
  });
});
