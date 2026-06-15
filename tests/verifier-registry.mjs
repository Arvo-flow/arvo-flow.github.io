// tests/verifier-registry.mjs — låser fabrikens kontrakt: varje verifierare har rätt form,
// unikt id, giltig kategori i prisboken och ett rimligt schema. Offline (ingen nätverk).
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { VERIFIERS, getVerifier, allVerifierIds } from '../lib/verifiers/registry.mjs';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

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

  test('varje verifierares category finns i BRANCHINDEX', () => {
    for (const v of VERIFIERS) {
      assert.ok(BRANCHINDEX[v.category], `${v.id}: kategori '${v.category}' saknas i prisboken`);
    }
  });

  test('getVerifier slår upp på id, null för okänt', () => {
    assert.equal(getVerifier(VERIFIERS[0].id).id, VERIFIERS[0].id);
    assert.equal(getVerifier('finns-inte'), null);
  });
});
