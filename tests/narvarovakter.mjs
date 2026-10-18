// tests/narvarovakter.mjs — närvarovakterna: vakter som läser sidan och letar efter det LAGRADE priset.
//
// Fabriken märker en röd check OLÄSBAR när `actual` är '(saknas)' och DRIFT annars
// (lib/verifierarutfall.js). De två kräver motsatta åtgärder: DRIFT = rätta prisboken, OLÄSBAR =
// laga vakten, «priset kan mycket väl vara oförändrat». En närvarovakt som bara frågar «står det
// lagrade priset kvar?» kan inte skilja ett höjt pris från en sida den tappat, och svarar '(saknas)'
// i båda fallen.
//
// Den här filen prövar checklogiken genom att ANROPA de rena funktionerna med sidtext, aldrig genom
// att läsa källtext.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { bedomVerifierarutfall } from '../lib/verifierarutfall.js';
import { fortnoxChecks } from '../lib/verifiers/fortnox.mjs';
import { spirisChecks } from '../lib/verifiers/spiris.mjs';
import { kortterminalCheck } from '../lib/verifiers/kortterminal.mjs';
import { fortnoxLonChecks } from '../lib/verifiers/fortnox-lon.mjs';
import { teliaSidChecks } from '../lib/verifiers/telia-vaxel.mjs';
import { adobeChecks } from '../lib/verifiers/adobe.mjs';

const FV = BRANCHINDEX['saas-finance'].fortnoxVerified;
const SV = BRANCHINDEX['saas-finance'].spirisVerified;
const RATES = BRANCHINDEX.kortterminal.verifiedRates.rates;
const LV = BRANCHINDEX.loneadmin.fortnoxLonVerified;
const TV = BRANCHINDEX.molnvaxel.teliaVerified;
const AV = BRANCHINDEX['saas-creative'].adobeVerified;

/** Fabrikens märke per check, med samma regel som scripts/verify.mjs skriver i loggen. */
const marke = (c) => (c.ok ? 'gron' : (String(c.actual ?? '') === '(saknas)' ? 'olasbar' : 'drift'));

describe('NV · närvarovakterna skiljer «priset ändrat» från «sidan oläst»', () => {
  test('NV-01 · Fortnox: prisbokens priser på sidan → grönt; utan etiketterna → OLÄSBAR', () => {
    const sida = `Mini ${FV.paket.Mini} kr/mån Liten ${FV.paket.Liten} kr/mån Mellan ${FV.paket.Mellan} kr/mån `
      + `Stor ${FV.paket.Stor} kr/mån Bokföring ${FV.moduler['Bokföring']} kr/mån`;
    assert.equal(bedomVerifierarutfall({ checks: fortnoxChecks(FV, sida) }).utfall, 'gron');
    const tom = fortnoxChecks(FV, 'Kontakta oss för en offert');
    assert.deepEqual(tom.map(marke), ['olasbar', 'olasbar', 'olasbar', 'olasbar', 'olasbar']);
    assert.equal(bedomVerifierarutfall({ checks: tom }).drift, 0);
  });

  test('NV-02 · Spiris: prisbokens priser på sidan → grönt; utan etiketterna → OLÄSBAR', () => {
    const sida = `Starta ${SV.niva.Starta} kr/mån Driva ${SV.niva.Driva} kr/mån Skala ${SV.niva.Skala} kr/mån `
      + `Växa ${SV.niva['Växa']} kr/mån Lön till anställda Betala lön ${SV.moduler['Lön till anställda']} kr/mån`;
    assert.equal(bedomVerifierarutfall({ checks: spirisChecks(SV, sida) }).utfall, 'gron');
    assert.deepEqual(spirisChecks(SV, 'Kontakta oss').map(marke), ['olasbar', 'olasbar', 'olasbar', 'olasbar', 'olasbar']);
  });

  test('NV-03 · Kortterminal: lagrad rate på sidan → grönt; en sida utan procentsats → OLÄSBAR', () => {
    for (const r of RATES) {
      const pct = r.pct.toFixed(2).replace('.', ',');
      assert.equal(marke(kortterminalCheck(r, `Avgift ${pct} % per transaktion`)), 'gron', r.supplier);
      assert.equal(marke(kortterminalCheck(r, 'Kontakta säljavdelningen')), 'olasbar', r.supplier);
    }
  });

  test('NV-04 · Fortnox Lön: båda talen på sidan → grönt; utan talen → OLÄSBAR', () => {
    const sida = `Lön ${LV.fixedMonthly} kr/mån och ${LV.perEmployeeMonthly} kr/anställd och månad`;
    assert.equal(bedomVerifierarutfall({ checks: fortnoxLonChecks(LV, sida) }).utfall, 'gron');
    assert.deepEqual(fortnoxLonChecks(LV, 'Kontakta oss').map(marke), ['olasbar', 'olasbar']);
  });

  test('NV-05 · Telia växel: båda från-priserna på sidan → grönt; utan dem → OLÄSBAR', () => {
    const sida = `Pris från: ${TV.tiers.T1.fromMonthly} kr/mån · Pris från: ${TV.tiers.T2.fromMonthly} kr/mån`;
    assert.equal(bedomVerifierarutfall({ checks: teliaSidChecks(TV, sida) }).utfall, 'gron');
    assert.deepEqual(teliaSidChecks(TV, 'Kontakta oss').map(marke), ['olasbar', 'olasbar']);
  });

  test('NV-06 · Adobe: prisbokens priser på sidorna → grönt; utan momsmarkören → OLÄSBAR', () => {
    const sek = (n) => `${new Intl.NumberFormat('sv-SE', { minimumFractionDigits: 2 }).format(n)} SEK`;
    const teamText = `Creative Cloud Pro ${sek(AV.teamExVatMonthly['all-apps'])}/mån per licens exkl. moms `
      + `Single App ${sek(AV.teamExVatMonthly['single-app'])}/mån per licens exkl. moms`;
    const psText = `Photoshop ${sek(AV.individualInclVatMonthly['single-app'])}/mån `
      + `Creative Cloud Pro ${sek(AV.individualInclVatMonthly['all-apps'])}/mån`;
    assert.equal(bedomVerifierarutfall({ checks: adobeChecks(AV, { teamText, psText }) }).utfall, 'gron');
    const utanMoms = adobeChecks(AV, { teamText: teamText.replaceAll('exkl. moms', ''), psText });
    assert.deepEqual(utanMoms.map(marke).slice(0, 2), ['olasbar', 'olasbar'], 'okänd momsbas är okänt, aldrig drift');
  });
});
