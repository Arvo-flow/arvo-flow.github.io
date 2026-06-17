// tests/fortnox.mjs — låser Fortnox verifierade listprisankare (saas-finance) i prisboken.
// Verifierat live 2026-06-17 mot fortnox.se/produkt/prislista. Driftvakten (verify.mjs fortnox)
// larmar om något pris drivit; den här sviten låser att prisboken bär exakt det vi verifierade.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

describe('Fortnox — verifierade listpriser låsta i prisboken (saas-finance)', () => {
  const fv = BRANCHINDEX['saas-finance']?.fortnoxVerified;

  test('fortnoxVerified-blocket finns med källa + datum + url', () => {
    assert.ok(fv, 'fortnoxVerified saknas');
    assert.equal(fv.source, 'fortnox-prislista');
    assert.match(fv.lastVerified, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(fv.url, /fortnox\.se\/produkt\/prislista/);
  });

  test('paket-ankarena bär de live-verifierade priserna (kr/mån exkl moms)', () => {
    assert.equal(fv.paket.Mini, 209);
    assert.equal(fv.paket.Liten, 349);
    assert.equal(fv.paket.Mellan, 490);
    assert.equal(fv.paket.Stor, 710);
  });

  test('+-paket och Byråpartner låsta', () => {
    assert.equal(fv.paket['Mini+'], 369);
    assert.equal(fv.paket['Mellan+'], 659);
    assert.equal(fv.paket['Stor+'], 919);
    assert.equal(fv.paket['Byråpartner'], 499);
  });

  test('kärnmodulen Bokföring 189 kr (skild från Mini-paket 209)', () => {
    assert.equal(fv.moduler['Bokföring'], 189);
    assert.notEqual(fv.moduler['Bokföring'], fv.paket.Mini, 'Bokföring-modul får ej förväxlas med Mini-paket');
  });

  test('paket är strikt stigande Mini < Liten < Mellan < Stor', () => {
    assert.ok(fv.paket.Mini < fv.paket.Liten);
    assert.ok(fv.paket.Liten < fv.paket.Mellan);
    assert.ok(fv.paket.Mellan < fv.paket.Stor);
  });
});
