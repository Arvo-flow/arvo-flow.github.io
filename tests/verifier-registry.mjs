// tests/verifier-registry.mjs — låser fabrikens kontrakt: varje verifierare har rätt form,
// unikt id, giltig kategori i prisboken och ett rimligt schema. Offline (ingen nätverk).
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { VERIFIERS, getVerifier, allVerifierIds } from '../lib/verifiers/registry.mjs';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { VILLKORSBOK } from '../lib/contract-intel.js';

describe('Verifierar-registry — fabrikens kontrakt', () => {
  test('minst en verifierare registrerad', () => {
    assert.ok(VERIFIERS.length >= 1);
  });

  test('varje verifierare har korrekt form', () => {
    for (const v of VERIFIERS) {
      assert.equal(typeof v.id, 'string', 'id måste vara sträng');
      assert.equal(typeof v.label, 'string', `${v.id}: label krävs`);
      assert.equal(typeof v.category, 'string', `${v.id}: category krävs`);
      assert.equal(typeof v.run, 'function', `${v.id}: run() krävs`);
      assert.equal(typeof v.needsBrowser, 'boolean', `${v.id}: needsBrowser (bool) krävs`);
      assert.match(v.schedule ?? '', /^[\d*\/, -]+( [\d*\/, -]+){4}$/, `${v.id}: schedule måste vara giltig cron`);
    }
  });

  test('alla id:n är unika', () => {
    const ids = allVerifierIds();
    assert.equal(ids.length, new Set(ids).size, 'dubbletter bland verifierar-id');
  });

  // ── TVÅ SORTERS VAKTER (2026-08-07) ────────────────────────────────────────────────────
  // Regeln "kategorin måste finnas i prisboken" är riktig för PRISVAKTER — den hindrar en vakt
  // från att larma om en cell som inte finns. Men fabriken vaktar sedan i dag också
  // VILLKORSBOKEN (avtalsreglerna), och den har inga priscellar. Att ge en villkorsvakt en
  // låtsaskategori för att blidka testet hade varit att ljuga för sin egen maskinvakt.
  // Alltså ett uttalat sortbegrepp: prisvakter behåller kravet med full kraft, villkorsvakter
  // måste i stället peka på en verklig post i villkorsboken. Ingen vakt slipper undan ett krav.
  test('prisvakter pekar på en verklig cell i prisboken', () => {
    for (const v of VERIFIERS.filter((x) => (x.kind ?? 'pris') === 'pris')) {
      assert.ok(BRANCHINDEX[v.category], `${v.id}: kategori '${v.category}' saknas i prisboken`);
    }
  });

  test('villkorsvakter pekar på en verklig post i villkorsboken', () => {
    const villkorsvakter = VERIFIERS.filter((v) => v.kind === 'villkor');
    for (const v of villkorsvakter) {
      assert.ok(Object.keys(VILLKORSBOK).length >= 1,
        `${v.id}: villkorsboken är tom — det finns inget att vakta`);
    }
  });

  test('varje verifierare deklarerar sin sort (ingen vakt utan hemvist)', () => {
    for (const v of VERIFIERS) {
      assert.ok(['pris', 'villkor'].includes(v.kind ?? 'pris'), `${v.id}: okänd vaktsort '${v.kind}'`);
    }
  });

  test('getVerifier slår upp på id, null för okänt', () => {
    assert.equal(getVerifier(VERIFIERS[0].id).id, VERIFIERS[0].id);
    assert.equal(getVerifier('finns-inte'), null);
  });
});
