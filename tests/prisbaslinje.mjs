// tests/prisbaslinje.mjs — EN PRISÄNDRING ÄR EN MARKNADSHÄNDELSE BARA OM DET GAMLA PRISET VAR VERIFIERAT (BL).
// Bakgrund i lib/prisbaslinje.js.
//
// FÅNGAR: juryn eller ett larm som behandlar prisvaktens inaktuella förväntan som ett gammalt pris;
//   ett larm som släpps utan att sidan bekräftar det nya talet; en larmväg som anropar modellens dom
//   direkt; en jury som säger «skriven» utan att ha skrivit.
// BLIND: talen jämförs, inte produkten (modulhuvudet).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { verifieradBaslinje, arMarknadshandelse } from '../lib/prisbaslinje.js';
import { bedomLarm } from '../lib/larmunderlag.js';
import { strippaStrangar } from '../lib/kalltextlexer.js';

const las = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
// Haiku-svar som klarar modellgrinden — så att det är BASLINJEN som prövas.
const HAIKU = { actionRequired: 'update', confidence: 0.95, extractedNumeric: 140, extractedUnit: 'per_seat_month', extractedCurrency: 'SEK', direction: 'increase' };

describe('BL · prisbaslinjen', () => {
  test('BL-01 · nattens inaktuella M365-förväntningar är inga gamla pris — dagens verifierade är det (motprov)', () => {
    for (const o of [119, 143, 57, 69, 609]) assert.equal(verifieradBaslinje({ category: 'saas-productivity', oldNumeric: o }).verifierad, false, String(o));
    for (const o of [133.82, 66.91, 641.18]) assert.equal(verifieradBaslinje({ category: 'saas-productivity', oldNumeric: o }).verifierad, true, String(o));
  });

  test('BL-02 · utan verifierade tal i kategorin, eller utan gammalt pris, finns ingen händelse', () => {
    assert.equal(verifieradBaslinje({ category: 'kortterminal', oldNumeric: 1.75 }).verifierad, false);
    assert.equal(verifieradBaslinje({ category: 'saas-productivity', oldNumeric: null }).verifierad, false);
    assert.equal(verifieradBaslinje({ category: 'finns-inte', oldNumeric: 100 }).verifierad, false);
  });

  test('BL-03 · en händelse kräver både verifierad baslinje OCH att sidan bekräftar det nya talet', () => {
    const bas = { category: 'saas-productivity' };
    assert.equal(arMarknadshandelse({ ...bas, verify: { oldNumeric: 119, pageConfirmsNew: true } }).ja, false, 'inaktuell förväntan');
    assert.equal(arMarknadshandelse({ ...bas, verify: { oldNumeric: 15, pageConfirmsNew: false } }).ja, false, 'Slack 15 → 18: sidan bekräftar inte');
    assert.equal(arMarknadshandelse({ ...bas, verify: { oldNumeric: 133.82, pageConfirmsNew: true } }).ja, true, 'motprov: en verklig ändring');
  });

  test('BL-04 · larmets dom: modellens «update» räcker inte — händelsen måste bära', () => {
    const bas = { category: 'saas-productivity', haiku: HAIKU };
    assert.equal(bedomLarm({ ...bas, verify: { oldNumeric: 119, pageConfirmsNew: true } }).niva, 'obekraftad');
    assert.equal(bedomLarm({ ...bas, verify: { oldNumeric: 15, pageConfirmsNew: false } }).niva, 'obekraftad');
    const motprov = bedomLarm({ ...bas, haiku: { ...HAIKU, extractedNumeric: 140 }, verify: { oldNumeric: 133.82, pageConfirmsNew: true } });
    // Motprovet måste nå 'verifierad' — annars är testet grönt för att modellsvaret föll på något
    // annat (första versionen hade enheten 'per_month', utanför listan, och S4 fällde noll tester).
    assert.equal(motprov.niva, 'verifierad', 'motprov: en verklig ändring med bekräftad sida ska larma');
  });

  test('BL-05 · båda larmvägarna går genom bedomLarm — aldrig modellens dom direkt', () => {
    for (const p of ['scripts/notify-price-changes.mjs', 'api/cron/run-price-alerts.mjs']) {
      const k = strippaStrangar(las(p));
      assert.match(k, /bedomLarm\(a\)/, `${p} anropar inte bedomLarm`);
      assert.doesNotMatch(k, /bedomLarmunderlag\(/, `${p} dömer på modellens svar direkt`);
    }
  });

  test('BL-06 · juryn kräver händelsen, skickar produkten och säger «skriven» bara när raden skrevs', () => {
    const k = strippaStrangar(las('scripts/verify-price-changes.mjs'));
    assert.match(k, /arMarknadshandelse\(a\)/);
    assert.match(k, /product: a\.supplier/, 'product saknas — supplier_price_history.product är NOT NULL');
    assert.match(k, /if \(!skriv\.inserted\)/, 'loggen kan åter säga «skriven» om en misslyckad skrivning');
  });
});
