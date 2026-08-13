// tests/dorrstat.mjs — DÖRRENS TRATT, testlåst.
//
// Varför en svit för en mätning: talen härifrån ska STYRA vad vi bygger härnäst. En trasig
// konverteringsgrad är därför inte ett kosmetiskt fel utan ett beslutsunderlagsfel — samma klass
// som en felaktig prisbok. Regel 3 gäller våra egna mätetal lika hårt som kundens siffror.
//
// Det som låses här är precis det som kan bli grönt på fel grund:
//   · råa klick får ALDRIG räknas som besökare (annars > 100 % konvertering)
//   · noll underlag ger null, aldrig "0 %"
//   · en domän får aldrig kunna smugglas in i sessionsfältet
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  HANDELSER, arGiltigHandelse, arGiltigSession, vySpann, trattFranRader,
} from '../lib/dorrstat.js';

describe('DÖRRSTAT · trattens integritet', () => {
  test('DS-01 · händelselistan är stängd — okända namn avvisas', () => {
    for (const h of HANDELSER) assert.equal(arGiltigHandelse(h), true, h);
    for (const h of ['', 'dorr', 'DORR_VISAD', 'doman_skickad ', 'drop table', null, 42]) {
      assert.equal(arGiltigHandelse(h), false, String(h));
    }
  });

  test('DS-02 · sessionsfältet släpper inte igenom en domän', () => {
    assert.equal(arGiltigSession('abc12345'), true);
    assert.equal(arGiltigSession('k3j4h5g6f7d8s9a0'), true);
    // Formen är hela skyddet: en domän innehåller punkt, en mejl snabel-a, båda faller.
    for (const s of ['skanska.se', 'namn@skanska.se', 'ab', 'ABC12345', 'abc-12345',
                     'a'.repeat(65), '', null, undefined, 12345678]) {
      assert.equal(arGiltigSession(s), false, String(s));
    }
  });

  test('DS-03 · vyn avrundas till spann — aldrig en exakt pixelbredd', () => {
    assert.equal(vySpann(390), 'mobil');
    assert.equal(vySpann(559), 'mobil');
    assert.equal(vySpann(560), 'platta');
    assert.equal(vySpann(1023), 'platta');
    assert.equal(vySpann(1024), 'desktop');
    assert.equal(vySpann(1600), 'desktop');
    for (const b of [0, -1, NaN, null, undefined, 'bred']) assert.equal(vySpann(b), null, String(b));
  });

  test('DS-04 · tratten räknar UNIKA sessioner, inte råa klick', () => {
    // En besökare som trycker kopiera tre gånger är fortfarande EN besökare. Räknade vi klick
    // hade "tog_adressen" blivit 300 % — en siffra som ser bra ut och inte betyder något.
    const t = trattFranRader([
      { handelse: 'dorr_visad', sess: 'a' }, { handelse: 'dorr_visad', sess: 'b' },
      { handelse: 'doman_skickad', sess: 'a' },
      { handelse: 'kort_visat', sess: 'a' },
      { handelse: 'adress_kopierad', sess: 'a' },
      { handelse: 'adress_kopierad', sess: 'a' },
      { handelse: 'adress_kopierad', sess: 'a' },
    ]);
    assert.equal(t.antal.adress_kopierad, 1);
    assert.equal(t.andelar.tog_adressen, 100);
    assert.equal(t.andelar.oppnade_dorren, 50);   // 1 av 2 visade
  });

  test('DS-05 · noll underlag ger null, aldrig 0 %', () => {
    // "0 %" är ett påstående om utfall; "vi vet inte än" är sanningen när ingen varit här.
    const tom = trattFranRader([]);
    assert.equal(tom.antal.dorr_visad, 0);
    assert.equal(tom.andelar.oppnade_dorren, null);
    assert.equal(tom.andelar.fick_kort, null);
    assert.equal(tom.andelar.tog_adressen, null);
    assert.equal(tom.andelar.gick_till_faktura, null);
    // Besökare som aldrig skickade en domän: fick_kort saknar underlag, inte utfall.
    const bara = trattFranRader([{ handelse: 'dorr_visad', sess: 'a' }]);
    assert.equal(bara.andelar.oppnade_dorren, 0);   // HÄR finns underlag → 0 är ett utfall
    assert.equal(bara.andelar.fick_kort, null);     // här finns inget underlag → null
  });

  test('DS-06 · okända händelser räknas inte in i något steg', () => {
    const t = trattFranRader([
      { handelse: 'dorr_visad', sess: 'a' },
      { handelse: 'kaffe_drucket', sess: 'a' },
      { handelse: 'doman_skickad', sess: 'a' },
    ]);
    assert.equal(Object.values(t.antal).reduce((s, n) => s + n, 0), 2);
  });

  test('DS-07 · andelen avrundas till en decimal och kan inte överstiga 100', () => {
    const rader = [];
    for (let i = 0; i < 3; i++) rader.push({ handelse: 'dorr_visad', sess: `s${i}` });
    rader.push({ handelse: 'doman_skickad', sess: 's0' });
    const t = trattFranRader(rader);
    assert.equal(t.andelar.oppnade_dorren, 33.3);
    // Samma session kan aldrig bidra två gånger → taket 100 % håller av konstruktion.
    const t2 = trattFranRader([
      { handelse: 'dorr_visad', sess: 'a' },
      { handelse: 'doman_skickad', sess: 'a' }, { handelse: 'doman_skickad', sess: 'a' },
    ]);
    assert.equal(t2.andelar.oppnade_dorren, 100);
  });

  test('DS-08 · stegen är fyra mätbara led i rätt ordning', () => {
    // Ordningen ÄR modellen: ett fall mellan två steg pekar på exakt ett ställe i gränssnittet.
    assert.deepEqual(HANDELSER, [
      'dorr_visad', 'doman_skickad', 'kort_visat', 'kort_tomt', 'adress_kopierad', 'faktura_lank',
    ]);
  });
});
