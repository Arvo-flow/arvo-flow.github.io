// tests/villkorsvakt.mjs — låser VILLKORSVAKTEN, och därmed att avtalsreglerna inte kan
// ruttna i tysthet som prisboken gjorde i 16 dygn.
//
// Den viktigaste raden i hela filen är "oåtkomlig är inte godkänt". Varje gång vi byggt en vakt
// i det här repot har den första versionen kunnat tiga sig till grönt — prisverifieraren på en
// 404-sida i 76 dagar, mittlinje-vakten som kedjades vid en klass som inte fanns. Mönstret är
// alltid detsamma: frånvaro av larm läses som frånvaro av fel.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { bedomVillkorspost, bedomVillkorsbok, VILLKOR_UTFALL, VILLKOR_MAX_ALDER_DAGAR } from '../lib/villkorsvakt.js';
import { VILLKORSBOK } from '../lib/contract-intel.js';

const IDAG = new Date('2026-08-07T12:00:00Z');
const POST = {
  supplier: 'Bahnhof',
  kalla: 'https://www.bahnhof.se/villkor.pdf',
  citat: 'Uppsägningstid är tre (3) månader.',
  verifierad: '2026-07-03',
  dokumentSha256: 'a'.repeat(64),
};

describe('villkorsvakten · domaren', () => {
  test('oförändrat dokument → förseglad, citatet står bevisbart kvar', () => {
    const d = bedomVillkorspost(POST, { hamtadOk: true, hash: 'a'.repeat(64) }, IDAG);
    assert.equal(d.utfall, VILLKOR_UTFALL.FORSEGLAD);
    assert.equal(d.ok, true);
    assert.equal(d.aktion, null);
  });

  test('omskrivet dokument → ANDRAD, men vakten påstår ALDRIG att citatet fallit', () => {
    const d = bedomVillkorspost(POST, { hamtadOk: true, hash: 'b'.repeat(64) }, IDAG);
    assert.equal(d.utfall, VILLKOR_UTFALL.ANDRAD);
    assert.equal(d.ok, false);
    // Skillnaden mellan en ärlig vakt och en gissande: vi vet att DOKUMENTET ändrats,
    // inte att klausulen ändrats. Texten får inte påstå det senare.
    assert.doesNotMatch(d.text, /citatet (har )?(fallit|försvunnit|ändrats)/i);
    assert.match(d.aktion, /Läs om klausulen/);
  });

  // ── DEN VIKTIGASTE REGELN ────────────────────────────────────────────────────────────────
  test('oåtkomligt dokument är ALDRIG godkänt (Fortnox-404-läxan)', () => {
    for (const sett of [{ hamtadOk: false }, { hamtadOk: true, hash: null }, {}, null]) {
      const d = bedomVillkorspost(POST, sett, IDAG);
      assert.equal(d.ok, false, JSON.stringify(sett));
      assert.equal(d.utfall, VILLKOR_UTFALL.OATKOMLIG);
    }
  });

  test('post utan hash → OFÖRSEGLAD, och vakten lämnar ut hashen att försegla med', () => {
    const d = bedomVillkorspost({ ...POST, dokumentSha256: null }, { hamtadOk: true, hash: 'c'.repeat(64) }, IDAG);
    assert.equal(d.utfall, VILLKOR_UTFALL.OFORSEGLAD);
    assert.equal(d.ok, false);          // ännu inte bevisat = inte grönt
    assert.match(d.aktion, /dokumentSha256: 'c{64}'/);
  });

  test('post utan proveniens fälls före allt annat (regel 3)', () => {
    for (const trasig of [{ ...POST, kalla: null }, { ...POST, citat: null }, { ...POST, verifierad: null }]) {
      assert.equal(bedomVillkorspost(trasig, { hamtadOk: true, hash: 'a'.repeat(64) }, IDAG).ok, false);
    }
  });

  test('oförändrat men för gammalt → GAMMAL (ett dokument kan stå stilla och ändå vara fel läst)', () => {
    const gammal = { ...POST, verifierad: '2025-01-01' };
    const d = bedomVillkorspost(gammal, { hamtadOk: true, hash: 'a'.repeat(64) }, IDAG);
    assert.equal(d.utfall, VILLKOR_UTFALL.GAMMAL);
    assert.equal(d.ok, false);
    assert.ok(VILLKOR_MAX_ALDER_DAGAR >= 30 && VILLKOR_MAX_ALDER_DAGAR <= 365);
  });

  test('tom bok är aldrig grön — då finns inget att vakta, och det ska synas', () => {
    const r = bedomVillkorsbok({}, {}, IDAG);
    assert.equal(r.ok, false);
    assert.match(r.sammanfattning, /tom/i);
  });
});

// ── BOKEN KAN INTE VÄXA OVAKTAD ──────────────────────────────────────────────────────────────
// Prisbokens läxa var inte "sätt på schemat igen" utan att en post som ingen vaktar ser ut som
// en verifierad post. Här gäller det dubbelt: villkorsboken växer med en leverantör i taget,
// och varje ny post ska födas med sin proveniens. Testet gör tillväxten säker per konstruktion.
describe('villkorsboken · varje post bär sin proveniens', () => {
  const nycklar = Object.keys(VILLKORSBOK);

  test('boken är inte tom', () => {
    assert.ok(nycklar.length >= 1, 'avtalsklockan behöver minst en kurerad villkorspost');
  });

  for (const k of nycklar) {
    test(`${k}: källa, ordagrant citat och verifieringsdatum`, () => {
      const p = VILLKORSBOK[k];
      assert.match(p.kalla ?? '', /^https:\/\//, 'käll-URL saknas eller är inte https');
      assert.ok((p.citat ?? '').length >= 20, 'citatet ska vara ordagrant, inte en sammanfattning');
      assert.match(p.verifierad ?? '', /^\d{4}-\d{2}-\d{2}$/, 'verifieringsdatum saknas');
    });

    test(`${k}: går att döma av vakten (ingen post står utanför)`, () => {
      // Ingen post får vara osynlig för vakten. Ett fält som saknas ska ge ett rött utfall,
      // aldrig ett tyst hopp över posten.
      const d = bedomVillkorspost(VILLKORSBOK[k], { hamtadOk: true, hash: 'x'.repeat(64) }, IDAG);
      assert.ok(Object.values(VILLKOR_UTFALL).includes(d.utfall));
      assert.equal(typeof d.ok, 'boolean');
    });
  }
});
