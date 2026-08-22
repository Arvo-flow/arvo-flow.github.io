// tests/vaktkontrakt.mjs — låser VAKTKONTRAKTET: ingen vakt får registreras utan att ha svarat
// på frågan "vilken verklig förändring utlöser INTE det här larmet?".
//
// Bakgrunden är villkorsvakten 2026-08-09, som var noggrant testad, vackert motiverad och
// oförmögen att någonsin larma. Testerna bevisade att domaren reagerade — de kunde aldrig bevisa
// att signalen någonsin rörde sig. Låsen nedan gör inte det omöjliga (de kan inte avgöra om ett
// svar är SANT); de gör det omöjligt att slippa svara.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { bedomVaktkontrakt, bedomFabriken, MIN_TECKEN } from '../lib/vaktkontrakt.js';
import { VERIFIERS } from '../lib/verifiers/registry.mjs';

const OK = {
  id: 'exempel',
  fangar: 'Leverantören ändrar det publika listpriset på sidan som vakten renderar varje vecka.',
  blind: 'Ett förhandlat avtalspris hos kunden, som aldrig syns i den publika prislistan vakten läser.',
  bevakadeTiers: ['exempel-tier'],
  bevakadKategori: 'exempel-kategori',
};

describe('vaktkontraktet · domaren', () => {
  test('båda fälten ifyllda och specifika → godkänt', () => {
    assert.deepEqual(bedomVaktkontrakt(OK), { ok: true, brister: [] });
  });

  test('saknad blindfläck fälls — det är den överhoppade frågan', () => {
    const d = bedomVaktkontrakt({ ...OK, blind: undefined });
    assert.equal(d.ok, false);
    assert.match(d.brister.join(' '), /utlöser det INTE/);
  });

  test('saknat fangar fälls', () => {
    assert.equal(bedomVaktkontrakt({ ...OK, fangar: '' }).ok, false);
  });

  // ── KÄRNAN: EN VAKT UTAN BLINDFLÄCK EXISTERAR INTE ───────────────────────────────────────
  test('påstådd allvetenhet fälls — påståendet ÄR felet', () => {
    for (const b of ['Inget — vakten fångar allt som kan ändras på sidan och i produkten.',
                     'Den täcker allt som rör priset, inga luckor finns kvar att tala om.',
                     'Inga blinda fläckar återstår efter ombyggnaden av den här vakten.']) {
      const d = bedomVaktkontrakt({ ...OK, blind: b });
      assert.equal(d.ok, false, b);
      assert.match(d.brister.join(' '), /Varje vakt har en/);
    }
  });

  // REGEL 7: den här raden finns för att kontrollanten fällde två ärliga svar på sin första
  // körning. Ordet "inget" mitt i en mening beskriver ofta just en blindfläck — det är
  // ANSPRÅKET "det finns ingen" som är felet, aldrig ordet.
  test('ärliga skopusatser med "inget" mitt i meningen passerar', () => {
    for (const b of [
      'Paketpriser och kampanjer som bara framgår i en offert — vakten läser den publika prislistan och ser inget som kräver inloggning eller dialog.',
      'Svensk SEK-prissättning: Google publicerar inget publikt SEK-pris, så en ändring som bara slår mot svenska kunder är osynlig för vakten.',
    ]) {
      assert.equal(bedomVaktkontrakt({ ...OK, blind: b }).ok, true, b);
    }
  });

  test('etiketter och platshållare räknas inte som inventering', () => {
    assert.equal(bedomVaktkontrakt({ ...OK, blind: 'prisändringar' }).ok, false);        // för kort
    assert.equal(bedomVaktkontrakt({ ...OK, blind: 'okänt just nu, får utredas senare vid tillfälle' }).ok, false);
    assert.ok(MIN_TECKEN >= 20);
  });

  test('samma text i båda fälten → frågan är inte ställd', () => {
    const d = bedomVaktkontrakt({ ...OK, blind: OK.fangar });
    assert.equal(d.ok, false);
    assert.match(d.brister.join(' '), /besvarad två gånger/);
  });

  test('tom fabrik är aldrig grön', () => {
    assert.equal(bedomFabriken([]).ok, false);
    assert.equal(bedomFabriken(null).ok, false);
  });
});

// ── HELA FABRIKEN UNDER KONTRAKTET ──────────────────────────────────────────────────────────
// Den här sviten är skälet till att en ny vakt inte kan smygas in odeklarerad: registret läses
// direkt, så varje framtida rad i VERIFIERS måste bära sina två svar för att sviten ska bli grön.
describe('vaktkontraktet · varje registrerad vakt har svarat', () => {
  test('fabriken uppfyller kontraktet', () => {
    const d = bedomFabriken(VERIFIERS);
    assert.deepEqual(d.brister, [], d.brister.join('\n'));
  });

  for (const v of VERIFIERS) {
    test(`${v.id}: har inventerat sin blindfläck`, () => {
      const d = bedomVaktkontrakt(v);
      assert.equal(d.ok, true, d.brister.join(' · '));
    });
  }
});

// ── DEN TREDJE FRÅGAN: RÄCKVIDDEN ─────────────────────────────────────────────────────────────
// fangar/blind beskriver vaktens FÖRMÅGA, aldrig dess RÄCKVIDD. E3 och E5 stod obevakade i
// månader bakom en grön audit därför att ingen frågade vilka poster m365-modulen faktiskt läste.
// En vakt kan vara fullständigt ärlig om sin blindfläck och ändå dölja ett hål.
describe('vaktkontraktet · räckvidden måste deklareras', () => {
  test('saknad deklaration fälls — det är den tredje överhoppade frågan', () => {
    const d = bedomVaktkontrakt({ ...OK, bevakadeTiers: undefined });
    assert.equal(d.ok, false);
    assert.match(d.brister.join(' '), /bevakadeTiers/);
  });

  test('tom lista är ett giltigt SVAR — kategorivakter läser inga licensnivåer', () => {
    assert.equal(bedomVaktkontrakt({ ...OK, bevakadeTiers: [] }).ok, true,
      'skillnaden mellan "läser inga" och "ingen frågade" måste få uttryckas');
  });

  test('dubbletter fälls — så överdrivs täckning av slarv', () => {
    assert.equal(bedomVaktkontrakt({ ...OK, bevakadeTiers: ['a', 'a'] }).ok, false);
  });

  test('en tom nyckel är ingen nyckel', () => {
    assert.equal(bedomVaktkontrakt({ ...OK, bevakadeTiers: ['  '] }).ok, false);
  });

  // Låset som gör att nästa verifierare inte kan smita in odeklarerad.
  test('VARJE registrerad verifierare deklarerar sin räckvidd', () => {
    const utan = VERIFIERS.filter((v) => !Array.isArray(v.bevakadeTiers)).map((v) => v.id);
    assert.deepEqual(utan, [], `Odeklarerade vakter: ${utan.join(', ')}`);
  });
  test('KATEGORIN: en vakt utan bevakadKategori fälls — «null» är ett svar, tomhet är det inte', () => {
    // 2026-08-22. Kategoriposternas datum ruttnade i tysthet på samma sätt som nivåernas:
    // molnvaxel låg 66 dagar gammal medan telia-vaxel-vakten körde veckovis och bekräftade
    // priset varje gång. Ingen frågade vem som daterade kategoriposten, så ingen gjorde det.
    const { bevakadKategori, ...utan } = OK;
    const d = bedomVaktkontrakt(utan);
    assert.equal(d.ok, false, 'en vakt som inte säger vilken kategoripost den daterar passerade');
    assert.match(d.brister.join(' '), /bevakadKategori/);
    // Kontrollen är EN gren, inte två: `undefined` och `''` fälls av samma villkor. En tidigare
    // version hade en separat `in`-kontroll som var redundant — och testet var grönt på fel
    // grund tills sabotaget visade att den kunde tas bort utan att något fälldes.

    // Motprovet: null ÄR ett giltigt svar (villkorsboken daterar ingen prispost).
    assert.equal(bedomVaktkontrakt({ ...OK, bevakadKategori: null }).ok, true,
      'null måste få passera — annars tvingas en vakt hitta på en kategori den inte vaktar');
    // Men tomhet är inte ett svar.
    for (const tomt of ['', '   ', 0, false, []]) {
      assert.equal(bedomVaktkontrakt({ ...OK, bevakadKategori: tomt }).ok, false,
        `«${JSON.stringify(tomt)}» accepterades som kategorideklaration`);
    }
  });

  test('KATEGORIN: varje registrerad vakt har svarat', () => {
    const utan = VERIFIERS.filter((v) => !('bevakadKategori' in v)).map((v) => v.id);
    assert.deepEqual(utan, [],
      'dessa vakter daterar kanske en kategoripost utan att någon vet vilken:\n  ' + utan.join('\n  '));
  });

});
