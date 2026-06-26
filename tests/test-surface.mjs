// tests/test-surface.mjs — låser testytans mottagar-detektering (isolerad testidentitet).
// Mail till test@/testyta@/nollstall@/demo@ → testytan; allt annat → vanlig (riktig) ingest.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { isTestRecipient, TEST_EMAIL } from '../lib/test-surface.js';

describe('Testytan · mottagar-detektering', () => {
  test('test-mottagaradresser aktiverar testytan (array eller sträng, +tag, versaler)', () => {
    assert.equal(isTestRecipient([{ email: 'test@inbox.arvoflow.se' }]), true);
    assert.equal(isTestRecipient('testyta@inbox.arvoflow.se'), true);
    assert.equal(isTestRecipient(['Nollstall@inbox.arvoflow.se']), true);
    assert.equal(isTestRecipient([{ email: 'test+batch2@inbox.arvoflow.se' }]), true);
  });

  test('vanliga adresser rör ALDRIG testytan', () => {
    assert.equal(isTestRecipient('faktura@inbox.arvoflow.se'), false);
    assert.equal(isTestRecipient([{ email: 'kund@inbox.arvoflow.se' }]), false);
    assert.equal(isTestRecipient(null), false);
    assert.equal(isTestRecipient([]), false);
  });

  test('testidentiteten är fast och isolerad', () => {
    assert.equal(TEST_EMAIL, 'testyta@arvoflow.se');
  });
});
