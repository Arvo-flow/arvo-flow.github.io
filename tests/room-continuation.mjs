// tests/room-continuation.mjs — låser DEN LEVANDE FORTSÄTTNINGEN (sektion 02).
// Integritetskärnan: fortsättningen får ALDRIG uppfinna en fras — den förkortar bara titlar
// vi själva genererat ur källbelagd data, och generiska rader (marknad/golv/infra) utesluts.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { titleToPhrase, continuationPhrases, joinPhrases } from '../src/lib/roomContinuation.js';

const LEKIA = [
  { kind: 'business', title: 'Ert bokslut 2025: 264,6 mkr i omsättning, 29 anställda' },
  { kind: 'platform', title: 'Ni kör Microsoft 365' },
  { kind: 'suppliers', title: '4 leverantörer syns i era publika mejlposter' },
  { kind: 'spoofing', title: 'Mejl i ert namn kan förfalskas' },
  { kind: 'koncern', title: 'Er koncern rymmer 4 bolag' },
];

describe('roomContinuation · titel → fras', () => {
  test('"Ni"-inledning blir löpande text', () => {
    assert.equal(titleToPhrase('Ni kör Microsoft 365'), 'ni kör Microsoft 365');
  });
  test('kolon klipper den långa bokslutstiteln vid sin poäng', () => {
    assert.equal(titleToPhrase('Ert bokslut 2025: 264,6 mkr i omsättning, 29 anställda'), 'ert bokslut 2025');
  });
  test('tankstreck klipper: "Grundat 1987 — 39 år" → "grundat 1987"', () => {
    assert.equal(titleToPhrase('Grundat 1987 — 39 år i verksamhet'), 'grundat 1987');
  });
  test('tom/ogiltig titel → tom sträng (aldrig ett kast)', () => {
    assert.equal(titleToPhrase(''), '');
    assert.equal(titleToPhrase(null), '');
  });
});

describe('roomContinuation · fortsättningen (rangordnad, aldrig fabricerad)', () => {
  test('Lekia-fallet: tre starkaste fynden i rangordning', () => {
    assert.deepEqual(continuationPhrases(LEKIA), [
      'ni kör Microsoft 365',
      '4 leverantörer syns i era publika mejlposter',
      'er koncern rymmer 4 bolag',
    ]);
  });

  test('GENERISKA rader utesluts: måttstock/golv/infra bär ingen "om er"-kraft', () => {
    const generic = [
      { kind: 'market', title: 'Måttstocken vi väger mobilfakturor mot: 239 kr/mån per abonnemang' },
      { kind: 'bridge', title: 'Er kostnadssanning ligger ett mejl bort' },
      { kind: 'infra', title: 'Loopia sköter er domän' },
    ];
    assert.deepEqual(continuationPhrases(generic), []);
  });

  test('tunt kort: bara det som finns — aldrig utfyllnad', () => {
    const thin = [
      { kind: 'infra', title: 'Loopia sköter er domän' },
      { kind: 'spoofing', title: 'Mejl i ert namn kan förfalskas' },
    ];
    assert.deepEqual(continuationPhrases(thin), ['mejl i ert namn kan förfalskas']);
  });

  test('inget avslöjande → tomt (rummet visar exempelvarianten)', () => {
    assert.deepEqual(continuationPhrases(null), []);
    assert.deepEqual(continuationPhrases([]), []);
  });

  test('taket respekteras: max tre fraser även på ett rikt kort', () => {
    assert.equal(continuationPhrases(LEKIA, 3).length, 3);
    assert.equal(continuationPhrases(LEKIA, 2).length, 2);
  });
});

describe('roomContinuation · svensk uppräkning', () => {
  test('en, två och tre fraser', () => {
    assert.equal(joinPhrases(['a']), 'a');
    assert.equal(joinPhrases(['a', 'b']), 'a och b');
    assert.equal(joinPhrases(['a', 'b', 'c']), 'a, b och c');
    assert.equal(joinPhrases([]), '');
  });
});
