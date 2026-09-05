// tests/kategoribeslut.mjs — KB-01..08: samma dokument ska ge samma svar.
//
// ══ VARFÖR (2026-09-05, ur Dustin-fakturan) ═════════════════════════════════════════════════
// Grundaren laddade upp EXAKT samma PDF tre gånger och fick tre olika kort. Mätt i produktion:
// körning 1 gav `volume_data_required`, körning 2 gav `categorization_conflict`. Samma fil,
// samma kod, olika svar — en tjänst som motsäger sig själv inför kundens ekonomichef.
//
// Orsaken mätt, inte gissad: `deterministicMatch('Dustin Sverige AB')` → null,
// `checkSupplierFingerprint(...)` → `{matched:false}`. Ingen deterministisk ankarpunkt alls, så
// kategorin avgörs av tre modellutdata i rad (Sonnets kategori, Haikus validering, Sonnets
// självrapporterade konfidens mot tröskeln 0,8). Tre tärningskast.
//
// Två strukturella hål förstärkte det, och båda är utgångsförlusten igen:
//   · TRIAGERADE fakturor cachas aldrig — de returnerar långt före `kv.set(cacheKey, …)`.
//   · VITLISTADE IP:n skriver aldrig cache, så vår egen QA kör alltid om modellerna.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { kategoriNyckel, lasBeslut, byggBeslut, KATEGORI_TTL } from '../lib/kategoribeslut.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');

const KAT = { category: 'utrustningsleasing', normalizedSupplier: 'Dustin Sverige AB', confidence: 0.72 };

describe('KB · Kategoribeslutet fryses på dokumentet', () => {
  test('KB-01 · nyckeln är versionerad och bunden till dokumentet', () => {
    assert.equal(kategoriNyckel('abc123'), 'kat:v1:abc123');
    assert.notEqual(kategoriNyckel('abc123'), kategoriNyckel('abc124'),
      'två olika dokument får aldrig dela beslut');
    assert.match(kategoriNyckel('x'), /^kat:v\d+:/,
      'utan version kan en förbättrad kategoriserare inte ogiltigförklara gamla beslut — '
      + 'och då är ett fryst fel fruset för alltid');
  });

  test('KB-02 · en post UTAN validatorfält är ofullständig, inte tom', () => {
    // «Validatorn kördes inte» och «validatorns svar lagrades inte» ser likadana ut om fältet
    // saknas. Felfamiljen: ett okänt tillstånd som lånar ett giltigt värde.
    assert.equal(lasBeslut({ categorized: KAT }), null);
    assert.deepEqual(lasBeslut({ categorized: KAT, validatorKategori: null }),
      { categorized: KAT, validatorKategori: null },
      'null ÄR ett svar — validatorn körde inte, och det är känt');
  });

  test('KB-03 · skräp in ger null ut, aldrig ett halvt beslut', () => {
    for (const skrap of [null, undefined, 'sträng', 42, {}, { categorized: {} }, { categorized: { category: 7 } }]) {
      assert.equal(lasBeslut(skrap), null, `«${JSON.stringify(skrap)}» får inte bli ett beslut`);
    }
  });

  test('KB-04 · byggBeslut bär båda leden och sin tidpunkt', () => {
    const b = byggBeslut(KAT, 'it-support');
    assert.equal(b.categorized.category, 'utrustningsleasing');
    assert.equal(b.validatorKategori, 'it-support');
    assert.ok(Date.parse(b.fattatAt) > 0, 'utan tidpunkt går ett fryst beslut inte att granska i efterhand');
    assert.equal(byggBeslut(KAT, undefined).validatorKategori, null,
      'undefined normaliseras till null — fältet måste finnas för att KB-02 ska kunna skilja lägena');
    assert.ok(KATEGORI_TTL > 0);
  });

  // ── KÄLLVAKTER: att mekanismen finns räcker inte, den ska vara MATAD ────────────────────────
  test('KB-05 · produktionsvägen läser det frysta beslutet före modellanropet', () => {
    assert.match(API, /const categorized = _fryst\?\.categorized \?\? await categorize\(\{/,
      'utan läsningen är hela modulen död kod — attribueringslåsets öde, två månader mörkt');
    assert.match(API, /lasBeslut\(await kv\.get\(_katNyckel\)\)/);
  });

  test('KB-06 · BÅDA leverantörsvägarna fryser sitt beslut', () => {
    const anrop = [...API.matchAll(/_frysBeslut\(/g)].length;
    assert.equal(anrop, 2,
      'en väg saknar frysning. Fingeravtrycksmatchade leverantörer hoppar över validatorn men '
      + 'kategorin kommer fortfarande ur en modell — utan frysning behåller halva '
      + 'leverantörsregistret sin tärning, och vakten är grön på ett fall den inte täcker');
    assert.match(API, /if \(_fpCheck\.matched\) _frysBeslut\(null\);/);
    assert.match(API, /_frysBeslut\(_validation\.validatorCategory\);/);
  });

  test('KB-07 · frysningen sker FÖRE grenarna som returnerar', () => {
    // Flera grenar under valideringen returnerar direkt (categorization_conflict är en av dem).
    // En skrivning placerad efter dem hade lämnat precis de triagerade fakturorna ostabila —
    // utgångsförlusten, en gång till, i cachen.
    const frys = API.indexOf('_frysBeslut(_validation.validatorCategory);');
    const konflikt = API.indexOf("reason: 'categorization_conflict', userEmail");
    assert.ok(frys > 0 && konflikt > 0, 'ankarna hittades inte — vakten mäter inte det den påstår');
    assert.ok(frys < konflikt,
      'beslutet fryses efter den gren som returnerar → en triagerad faktura får aldrig ett '
      + 'stabilt svar, vilket är exakt felet den här modulen finns för');
  });

  test('KB-08 · token-loggen påstår aldrig ett anrop som inte skedde', () => {
    assert.match(API, /if \(!_fryst\) \{\s*\n\s*const u = categorized\.usage/,
      'en cacheträff kostar noll tokens; loggas den som ett anrop mäter vi vår egen kostnad fel');
  });
});
