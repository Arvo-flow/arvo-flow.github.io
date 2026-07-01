// tests/greeting.mjs — låser den tidsanpassade hälsningen i Arvo-kontoret.
// Grundarlärdom 2026-06-30: "God morgon" var hårdkodat → en kund inne kl. 15 möttes ändå av
// "God morgon", vilket avslöjar att ingen är hemma (dödar premiumkänslan). Nu tidsberoende.
// Svenskan har ingen HÄLSNING för natten — "god natt" är en AVSKEDSFRAS — så sena timmar
// faller medvetet på "God kväll", aldrig en fel-känsla.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { greetingForHour } from '../src/utils/format.js';

describe('greetingForHour · rätt hälsning per timme (kundens lokala tid)', () => {
  test('morgon 05–09', () => {
    for (const h of [5, 6, 7, 8, 9]) assert.equal(greetingForHour(h), 'God morgon');
  });
  test('förmiddag 10–11', () => {
    assert.equal(greetingForHour(10), 'God förmiddag');
    assert.equal(greetingForHour(11), 'God förmiddag');
  });
  test('eftermiddag 12–16', () => {
    for (const h of [12, 13, 14, 15, 16]) assert.equal(greetingForHour(h), 'God eftermiddag');
  });
  test('kväll 17–23', () => {
    for (const h of [17, 18, 20, 22, 23]) assert.equal(greetingForHour(h), 'God kväll');
  });
  test('natt 00–04 faller på "God kväll" — ALDRIG "God morgon", ALDRIG avskedsfrasen "God natt"', () => {
    for (const h of [0, 1, 2, 3, 4]) {
      assert.equal(greetingForHour(h), 'God kväll');
      assert.notEqual(greetingForHour(h), 'God morgon');
    }
  });
  test('gränserna exakt: 04→kväll, 05→morgon, 10→förmiddag, 12→eftermiddag, 17→kväll', () => {
    assert.equal(greetingForHour(4), 'God kväll');
    assert.equal(greetingForHour(5), 'God morgon');
    assert.equal(greetingForHour(10), 'God förmiddag');
    assert.equal(greetingForHour(12), 'God eftermiddag');
    assert.equal(greetingForHour(17), 'God kväll');
  });
  test('täcker alla 24 timmar utan lucka (returnerar alltid en giltig hälsning)', () => {
    const valid = new Set(['God morgon', 'God förmiddag', 'God eftermiddag', 'God kväll']);
    for (let h = 0; h < 24; h++) assert.ok(valid.has(greetingForHour(h)), `timme ${h}`);
  });
});
