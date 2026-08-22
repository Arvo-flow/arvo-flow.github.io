// tests/pastaendekontrakt.mjs — PK-01..08
//
// SLUTET PÅ OBDUKTIONEN (2026-08-22). Under två dygn hittades tjugotvå fel i den här kodbasen.
// De såg olika ut — en score, en kvittorad, ett månadsbrev, en sond, en prisbok — men de hade EN
// form: *ett tillstånd som betyder «okänt / misslyckades / inte mätt», representerat med ett
// värde som är omöjligt att skilja från ett giltigt svar.*
//
// Att lappa den tjugotredje instansen är inte svaret. Svaret är att göra FRÅGAN obligatorisk:
// varje kundyta som gör ett omdöme måste deklarera sina lägen, säga vilka som påstår något om
// KUNDENS sak, och ha ett omätt läge som tiger. Samma drag som vaktkontraktet gjorde för
// verifierarna — en tvingande fråga, aldrig ett bevis.
//
// FÅNGAR: en lägesmodul utan register, utan deklaration per läge, utan omätt läge, eller med ett
//   omätt läge som ändå påstår något. Och att en NY lägesmodul föds utan att registreras här.
// BLIND: kontraktet ser FORMEN, aldrig svenskan — en berömmande mening i ett läge som deklarerats
//   neutralt passerar. Det ser heller inte en yta som gör sina påståenden UTAN lägesmodul; att
//   nya ytor går via en är en granskningsfråga, inte en maskinfråga. Den blindfläcken är hela
//   skälet till att regel 8 (titta på vad kunden ser) inte kan ersättas av den här sviten.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bedomPastaendekontrakt } from '../src/lib/pastaendekontrakt.js';
import { DOMLAGEN, domensLage } from '../src/lib/domslut.js';
import { BRIEFINGLAGEN, briefingLage } from '../src/lib/briefinglage.js';
import { DIAGNOSLAGEN, diagnosLage } from '../src/lib/diagnos.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Registret. En ny lägesmodul måste läggas till här — PK-08 fäller den som inte är det.
const MODULER = [
  {
    namn: 'domslut (rummets veckodom)', lagen: DOMLAGEN,
    natt: [...new Set([true, false].flatMap((a) => [true, false].flatMap((h) =>
      ['battre', 'i-niva', 'samre', null].map((n) => domensLage({
        acting: a, hasSwitchAction: h, standing: n == null ? { satt: false } : { satt: true, niva: n },
      })))))],
  },
  {
    namn: 'briefinglage (månadsbrevet)', lagen: BRIEFINGLAGEN,
    natt: [...new Set([0, 3].flatMap((n) => [0, 84_000].flatMap((kr) =>
      [true, false].map((a) => briefingLage({ antalInsikter: n, sparbelopp: kr, harAgerat: a })))))],
  },
  {
    namn: 'diagnos (analyssidans score)', lagen: DIAGNOSLAGEN,
    natt: [...new Set([0, 45_600].flatMap((a) => [null, 16_060].map((s) =>
      diagnosLage({ annual: a, suggested: s, clickPriceScore: null, shouldSwitch: false, netSaving: 0 }))))],
  },
];

describe('PK · Varje kundytas lägen svarar i samma form', () => {
  for (const m of MODULER) {
    test(`PK · ${m.namn}`, () => {
      const d = bedomPastaendekontrakt(m);
      assert.deepEqual(d.brister, [], `${m.namn} bryter påståendekontraktet:\n  ${d.brister.join('\n  ')}`);
    });
  }

  test('PK-05 · en modul utan omätt läge fälls', () => {
    // Kontraktets tredje krav. En yta utan omätt läge har inte tänkt igenom sitt eget okända —
    // och det var precis den frågan ingen ställt i någon av de tjugotvå instanserna.
    const d = bedomPastaendekontrakt({
      namn: 'test', lagen: { bra: { positivtPastaende: true }, daligt: { positivtPastaende: false } }, natt: ['bra'],
    });
    assert.equal(d.ok, false);
    assert.match(d.brister.join(' '), /omatt/);
  });

  test('PK-06 · ett omätt läge som ändå påstår något fälls', () => {
    const d = bedomPastaendekontrakt({
      namn: 'test', lagen: { okant: { positivtPastaende: true, omatt: true } }, natt: ['okant'],
    });
    assert.equal(d.ok, false);
    assert.match(d.brister.join(' '), /omätt men gör ändå ett positivt påstående/);
  });

  test('PK-07 · en gren som funktionen returnerar men registret inte känner fälls', () => {
    // «En gren utan deklaration passerar varje kontroll tyst» — det var så DL-01 kunde ha blivit
    // grön på fel grund innan DL-06 skrevs.
    const d = bedomPastaendekontrakt({
      namn: 'test', lagen: { tyst: { positivtPastaende: false, omatt: true } }, natt: ['tyst', 'ny_gren'],
    });
    assert.equal(d.ok, false);
    assert.match(d.brister.join(' '), /ny_gren/);
  });

  test('PK-08 · varje lägesmodul i src/lib är registrerad ovan', () => {
    // Utan detta växer kodbasen förbi vakten: en ny yta med ett eget lägesregister skulle aldrig
    // prövas, och vakten vore grön av tomhet. Samma krav som sondvaktens «läser faktiskt några
    // sonder» och prisauditens «odeklarerad vakt».
    const kandidater = readdirSync(join(ROT, 'src', 'lib'))
      .filter((f) => f.endsWith('.js'))
      .filter((f) => /export const [A-ZÅÄÖ_]+LAGEN\b/.test(readFileSync(join(ROT, 'src', 'lib', f), 'utf8')));
    const registrerade = MODULER.map((m) => m.lagen);
    assert.ok(kandidater.length >= 2, `hittade bara ${kandidater.length} lägesmoduler — mönstret matchar inte längre`);
    assert.equal(kandidater.length, registrerade.length,
      `${kandidater.length} lägesmoduler finns i src/lib men ${registrerade.length} är registrerade i den här sviten ` +
      `(${kandidater.join(', ')}). En oregistrerad modul prövas aldrig.`);
  });
});
