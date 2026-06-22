// tests/session.mjs — låser den varaktiga sessionen (signatur, utgång, manipulationsskydd).
// Säkerhet: en session får ALDRIG accepteras med fel/saknad signatur eller efter utgång.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { issueSession, verifySession } from '../lib/session.js';

const SECRET = 'test-secret-1234567890';

describe('Session · utfärda + verifiera', () => {
  test('giltig session → rätt e-post (gemener)', () => {
    const tok = issueSession('Met@Bolaget.SE', { secret: SECRET });
    assert.ok(tok);
    assert.deepEqual(verifySession(tok, { secret: SECRET }), { email: 'met@bolaget.se' });
  });

  test('ingen hemlighet → ingen session utfärdas (degraderar, aldrig osignerad)', () => {
    assert.equal(issueSession('a@b.se', { secret: '' }), null);
  });

  test('tom e-post → null', () => {
    assert.equal(issueSession('', { secret: SECRET }), null);
  });
});

describe('Session · manipulationsskydd', () => {
  test('manipulerad payload → avvisas (signaturen stämmer inte)', () => {
    const tok = issueSession('a@b.se', { secret: SECRET });
    const [, sig] = tok.split('.');
    const forged = Buffer.from(JSON.stringify({ e: 'angripare@ondska.se', exp: Date.now() + 1e9 })).toString('base64url') + '.' + sig;
    assert.equal(verifySession(forged, { secret: SECRET }), null);
  });

  test('fel hemlighet → avvisas', () => {
    const tok = issueSession('a@b.se', { secret: SECRET });
    assert.equal(verifySession(tok, { secret: 'fel-hemlighet' }), null);
  });

  test('utgången session → avvisas', () => {
    const tok = issueSession('a@b.se', { secret: SECRET, days: 1 });
    const future = Date.now() + 2 * 24 * 60 * 60 * 1000;
    assert.equal(verifySession(tok, { secret: SECRET, now: future }), null);
  });

  test('skräp → null, kraschar inte', () => {
    assert.equal(verifySession('inte.en.token', { secret: SECRET }), null);
    assert.equal(verifySession('', { secret: SECRET }), null);
    assert.equal(verifySession(null, { secret: SECRET }), null);
  });
});
