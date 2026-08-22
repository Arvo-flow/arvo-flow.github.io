// tests/briefinglage.mjs — BL-01..09
//
// Regel 8 på månadsbrevet (2026-08-22) — den tredje ytan på två dygn som gjorde samma sak, och
// den enda som går ut som MAIL. Med noll insikter renderade briefingen:
//
//     POTENTIELL BESPARING · 0 kr/år          ← nolltalet som hjältesiffra
//     Arvo har identifierat 0 besparingsinsikter för ert bolag
//     Scrolla för att se insikterna           ← till noll insikter
//     Era insikter väntar på er.              ← påstår att de finns
//
// Bibeln: «Gör inget» är den vanligaste och mest premiumladdade leveransen — men bara om lugnet
// är förtjänat och VISAT. Briefingen visade i stället en nolla och lovade insikter som inte fanns.
//
// FÅNGAR: att den tysta månaden lovar insikter, visar ett nollbelopp som resultat, eller ber
//   kunden scrolla till ingenting.
// BLIND: modulen avgör LÄGET, inte om arbetet faktiskt utförts. Att vakten verkligen svepte den
//   månaden bevisas av vakt_events, inte här — en briefing som säger «vi vägde era priser» utan
//   att ha gjort det är ett löfte utan mekanik som den här vakten inte ser.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { briefingLage, lovarInsikter, visaSparbelopp, BRIEFINGLAGEN } from '../src/lib/briefinglage.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('BL · Den tysta månaden lovar ingenting den inte har', () => {
  test('BL-01 · noll insikter och noll kronor → lugn, inga utlovade insikter', () => {
    const lage = briefingLage({ antalInsikter: 0, sparbelopp: 0, harAgerat: false });
    assert.equal(lage, 'lugn');
    assert.equal(lovarInsikter(lage), false,
      'det här är raden som sa «Era insikter väntar på er» när listan var tom');
    assert.equal(visaSparbelopp(lage), false,
      '«0 kr/år» som hjältesiffra i ett månadsbrev får kunden att fråga vad hen betalar för');
  });

  test('BL-02 · MOTPROVET: ett verkligt fynd lovar fortfarande sina insikter', () => {
    // En spärr som tystar allt är lika värdelös som ingen spärr.
    const lage = briefingLage({ antalInsikter: 3, sparbelopp: 84_000, harAgerat: false });
    assert.equal(lage, 'fynd');
    assert.equal(lovarInsikter(lage), true);
    assert.equal(visaSparbelopp(lage), true);
  });

  test('BL-03 · ett belopp utan insikter räknas ändå som fynd', () => {
    // Besparingen kan komma ur en post som inte blev ett eget insiktskort. Talet är mätt och
    // ska visas — tystnaden gäller frånvaron av BÅDA.
    const lage = briefingLage({ antalInsikter: 0, sparbelopp: 12_000, harAgerat: false });
    assert.equal(lage, 'fynd');
    assert.equal(visaSparbelopp(lage), true);
  });

  test('BL-04 · en kund som agerat får sin kvittering, inte tystnadsdomen', () => {
    const lage = briefingLage({ antalInsikter: 0, sparbelopp: 0, harAgerat: true });
    assert.equal(lage, 'agerat');
    assert.equal(lovarInsikter(lage), false, 'den som redan agerat ska inte lovas fler insikter');
  });

  test('BL-05 · INVARIANTEN: lugn lovar aldrig insikter, oavsett indata', () => {
    for (const n of [0, null, undefined, -1, NaN]) {
      for (const kr of [0, null, undefined, -1, NaN]) {
        const lage = briefingLage({ antalInsikter: n, sparbelopp: kr, harAgerat: false });
        assert.equal(lage, 'lugn', `n=${n} kr=${kr} gav ${lage}`);
        assert.equal(lovarInsikter(lage), false);
        assert.equal(visaSparbelopp(lage), false);
      }
    }
  });

  test('BL-06 · varje läge funktionen kan returnera är deklarerat', () => {
    const sedda = new Set();
    for (const n of [0, 1, 5]) for (const kr of [0, 1, 84_000]) for (const a of [true, false]) {
      sedda.add(briefingLage({ antalInsikter: n, sparbelopp: kr, harAgerat: a }));
    }
    for (const lage of sedda) {
      assert.ok(lage in BRIEFINGLAGEN, `läget «${lage}» returneras men är inte deklarerat`);
      assert.equal(typeof BRIEFINGLAGEN[lage].lovarInsikter, 'boolean');
      assert.equal(typeof BRIEFINGLAGEN[lage].visaSparbelopp, 'boolean');
    }
    assert.equal(sedda.size, 3, `${sedda.size} lägen nås — vakten prövar inte hela fältet`);
  });

  test('BL-07 · ett tomt anrop kraschar inte och lovar ingenting', () => {
    assert.doesNotThrow(() => briefingLage());
    assert.equal(lovarInsikter(briefingLage()), false);
  });
});

describe('BL-08..09 · Månadsbrevet läser den delade domen', () => {
  // JSX-kommentarer ({/* … */}) strippas också — inte bara //-rader. Första versionen mätte ett
  // fönster på 200 tecken bakåt och fällde för att ett långt förklarande kommentarblock stod
  // MELLAN villkoret och texten. Vakten mätte avståndet till kommentaren, inte till koden.
  const kod = readFileSync(join(ROT, 'src', 'pages', 'Briefing', 'index.js'), 'utf8')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .split('\n').filter((r) => !r.trim().startsWith('//') && !r.trim().startsWith('*')).join('\n');

  test('BL-08 · scroll-uppmaningen och insiktsräknaren är villkorade', () => {
    assert.match(kod, /briefingLage\(\{/, 'briefingen ska kalla den prövade funktionen');
    const i = kod.indexOf('Scrolla för att se insikterna');
    assert.ok(i > 0, 'hittade inte scroll-uppmaningen — vakten mäter fel objekt');
    // Villkoret står FÖRE texten; fönstret är smalt nog att inte nå ett annat villkor.
    assert.match(kod.slice(Math.max(0, i - 200), i), /_lovarInsikter/,
      'kunden ombeds scrolla till insikterna utan att någon frågat om det FINNS några');
  });

  test('BL-09 · nollbeloppet visas aldrig som periodens resultat', () => {
    const i = kod.indexOf('Potentiell besparing');
    assert.ok(i > 0, 'hittade inte besparingsrubriken — vakten mäter fel objekt');
    assert.match(kod.slice(Math.max(0, i - 260), i), /_visaBelopp/,
      'beloppet renderas utan att någon frågat om det är ett resultat eller en nolla');
  });
});
