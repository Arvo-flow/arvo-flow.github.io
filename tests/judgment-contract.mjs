// tests/judgment-contract.mjs — låser bedömningskravet (bibelns regel 4).
// Beviset att vakten HAR tänder: en bedömning som saknar grund, konfidens eller asymmetri
// måste fångas. En guard som inte kan fälla är värdelös (adversariell disciplin).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { assertJudgment, isJudgment } from '../lib/judgment-contract.js';
import { priceHikeForecast } from '../lib/price-forecast.js';

const complete = {
  kind: 'price-forecast',
  confidence: 'high',
  basis: 'Telia har höjt sitt publika pris i Q1 4 av 4 senaste höjningarna, typiskt +6,8 %.',
  asymmetry: 'Kommer höjningen inte — desto bättre; ni betalade inget för beredskapen.',
  get text() { return `${this.basis} Bedömning (ej fakta): hög sannolikhet. ${this.asymmetry}`; },
};

describe('Bedömningskravet · känner igen en bedömning', () => {
  test('kind ELLER confidence-fält gör det till en bedömning', () => {
    assert.equal(isJudgment({ kind: 'price-forecast' }), true);
    assert.equal(isJudgment({ confidence: 'low' }), true);
    assert.equal(isJudgment({ kind: 'contract-clock' }), false); // klockan är fakta, ej bedömning
    assert.equal(isJudgment(null), false);
  });
});

describe('Bedömningskravet · komplett bedömning passerar', () => {
  test('alla tre delar + når texten → ok', () => {
    const r = assertJudgment(complete);
    assert.equal(r.ok, true);
    assert.deepEqual(r.missing, []);
  });
});

describe('Bedömningskravet · HAR tänder (fångar varje saknad del)', () => {
  test('saknad grund fångas', () => {
    const r = assertJudgment({ ...complete, basis: '', text: 'Bedömning (ej fakta): hög sannolikhet. ni betalade inget för beredskapen' });
    assert.equal(r.ok, false);
    assert.ok(r.missing.includes('grund'));
  });

  test('saknad konfidens (nivå) fångas', () => {
    const r = assertJudgment({ ...complete, confidence: undefined });
    assert.equal(r.ok, false);
    assert.ok(r.missing.includes('konfidens'));
  });

  test('konfidens maskerad som fakta (ingen märkning i texten) fångas', () => {
    const masked = { ...complete, get text() { return `${this.basis} ${this.asymmetry}`; } }; // ingen "Bedömning (ej fakta)"/sannolikhet
    const r = assertJudgment(masked);
    assert.equal(r.ok, false);
    assert.ok(r.missing.includes('konfidensmärkning-i-texten'));
  });

  test('saknad asymmetri fångas', () => {
    const r = assertJudgment({ ...complete, asymmetry: '', text: `${complete.basis} Bedömning (ej fakta): hög sannolikhet.` });
    assert.equal(r.ok, false);
    assert.ok(r.missing.includes('asymmetri'));
  });

  test('del finns strukturellt men når inte texten fångas', () => {
    const r = assertJudgment({ ...complete, text: 'Bedömning (ej fakta): hög sannolikhet — inget annat.' });
    assert.equal(r.ok, false);
    assert.ok(r.missing.includes('grund-når-ej-texten'));
    assert.ok(r.missing.includes('asymmetri-når-ej-texten'));
  });
});

describe('Bedömningskravet · den riktiga producenten klarar kravet', () => {
  test('priceHikeForecast-output bär alla tre delarna', () => {
    const f = priceHikeForecast(
      [{ changed_at: '2023-01-20', old_price_monthly: 106, new_price_monthly: 113 },
       { changed_at: '2024-01-15', old_price_monthly: 113, new_price_monthly: 121 },
       { changed_at: '2025-02-10', old_price_monthly: 121, new_price_monthly: 130 }],
      { supplier: 'Telia' },
    );
    assert.ok(f);
    assert.equal(assertJudgment(f).ok, true);
  });
});
