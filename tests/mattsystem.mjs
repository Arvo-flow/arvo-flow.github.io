// tests/mattsystem.mjs — låser MÅTTSYSTEMETS DOMARE, och därmed att MITTLINJEN-vakten
// faktiskt kan säga ifrån. Skrivet efter att vakten tystnat på sitt eget första prov:
// den kedjades vid en klass som inte fanns live, mätte noll fall och lät körningen bli grön.
// Talen nedan är INTE påhittade — de är den skarpa sajtens verkliga geometri, uppmätt i
// ops/door-shots/avida-desktop.png: kortets tealkant låg på x 420..1300 (bredd 880, mitt 860)
// medan sidans mittlinje låg på 800.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { bedomMatt, MATT_TOLERANS_PX } from '../lib/mattsystem.js';

describe('måttsystemet · domaren (MITTLINJEN-vaktens tänder)', () => {
  test('DET VERKLIGA FELET 2026-08-07: kortet 60px höger om mitten → UNDERKÄNT', () => {
    // .inner var 680 centrerad (460..1140) och kortet 880 med margin-left −100 räknat mot fel
    // förälder (DoorBlock 560, 520..1080) → kortet landade 420..1300. Kantavvikelsen är MAX av
    // sidorna: 40px vänster, 160px höger. Talen nedan är vaktens egna, uppmätta live mot den
    // ofixade sajten i alla fyra korten (ops/door-shots/logg.txt, körning 2026-08-07):
    //   "kortets mitt 860.0 · sidans 800.0 · skevhet 60.0px · kant mot kolumnen 160.0px ✗ FEL"
    const d = bedomMatt({ kortMitt: 860, sidMitt: 800, kantAvvik: 160 });
    assert.equal(d.ok, false);
    assert.equal(d.tyst, false);
    assert.equal(d.skevhet, 60);
    assert.match(d.skal, /skevhet 60\.0px/);
    assert.match(d.skal, /kantavvikelse 160\.0px/);
  });

  test('mobilen var ALLTID rätt — felet bodde i ≥1060px-brytpunkten', () => {
    // Samma körning, samma kort, 390px: "kortets mitt 195.0 · sidans 195.0 · skevhet 0.0px".
    // Beviset för att utbrottets mediefråga var enda felkällan — inte kortet i sig.
    assert.equal(bedomMatt({ kortMitt: 195, sidMitt: 195, kantAvvik: 0 }).ok, true);
  });

  test('efter fixen: kortet ÄR kolumnen → godkänt', () => {
    assert.deepEqual(bedomMatt({ kortMitt: 800, sidMitt: 800, kantAvvik: 0 }),
      { ok: true, tyst: false, skal: null, skevhet: 0 });
  });

  test('subpixel-avrundning (0,5px) fälls inte — toleransen är 1px', () => {
    assert.equal(bedomMatt({ kortMitt: 800.5, sidMitt: 800, kantAvvik: 0.5 }).ok, true);
    assert.equal(MATT_TOLERANS_PX, 1);
  });

  test('en enda av de två invarianterna räcker för att fälla', () => {
    // Rätt mitt men bilagan bryter ut ur sin egen ram — exakt vad −100px gjorde på båda sidor.
    const utbrott = bedomMatt({ kortMitt: 800, sidMitt: 800, kantAvvik: 100 });
    assert.equal(utbrott.ok, false);
    assert.match(utbrott.skal, /kantavvikelse/);
    assert.doesNotMatch(utbrott.skal, /skevhet/);
    // Rätt kant men skev mitt (kolumnen själv står snett).
    const skev = bedomMatt({ kortMitt: 860, sidMitt: 800, kantAvvik: 0 });
    assert.equal(skev.ok, false);
    assert.match(skev.skal, /skevhet/);
  });

  // ── VAKTENS EGEN LÄXA: TYSTNAD ÄR INTE GODKÄNT ──────────────────────────────────────────
  test('kortet finns men gick inte att mäta → UNDERKÄNT, aldrig tyst passage', () => {
    const d = bedomMatt({ trasig: 'ingen .inner-kolumn' });
    assert.equal(d.ok, false);
    assert.match(d.skal, /kunde inte mäta/);
  });

  test('ingen mätning alls levererad → UNDERKÄNT (prisbokens sjukdom)', () => {
    for (const tomt of [null, undefined, 'nej', 0]) {
      assert.equal(bedomMatt(tomt).ok, false, String(tomt));
    }
  });

  test('ofullständig mätning → UNDERKÄNT (ett saknat tal är inte noll)', () => {
    assert.equal(bedomMatt({ kortMitt: 800, sidMitt: 800 }).ok, false);
    assert.equal(bedomMatt({ kortMitt: NaN, sidMitt: 800, kantAvvik: 0 }).ok, false);
  });

  test('inget kort på sidan (spökdomänen) är den ENDA lagliga tystnaden', () => {
    const d = bedomMatt({ ingetKort: true });
    assert.equal(d.ok, true);
    assert.equal(d.tyst, true);
  });
});
