// tests/prisbaslinje.mjs — EN PRISÄNDRING ÄR EN MARKNADSHÄNDELSE BARA OM DET GAMLA PRISET VAR VERIFIERAT (BL).
// Bakgrund i lib/prisbaslinje.js.
//
// FÅNGAR: juryn eller ett larm som behandlar prisvaktens inaktuella förväntan som ett gammalt pris;
//   ett larm som släpps utan att sidan bekräftar det nya talet; en larmväg som anropar modellens dom
//   direkt; en jury som säger «skriven» utan att ha skrivit.
// BLIND: talen jämförs, inte produkten (modulhuvudet).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { verifieradBaslinje, arMarknadshandelse, bokfortPris } from '../lib/prisbaslinje.js';
import { PRICE_CHECKS } from '../lib/prisvaktens-kontroller.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { bedomLarm } from '../lib/larmunderlag.js';
import { strippaStrangar } from '../lib/kalltextlexer.js';

const las = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
// Haiku-svar som klarar modellgrinden — så att det är BASLINJEN som prövas.
const HAIKU = { actionRequired: 'update', confidence: 0.95, extractedNumeric: 140, extractedUnit: 'per_seat_month', extractedCurrency: 'SEK', direction: 'increase' };

// Larmraden som prisvakten bygger för en VERKLIG kontroll (scripts/price-monitor.mjs, samma två
// rader: gammalt pris ur `bokfort`, aldrig ur namnet).
const larmFor = (kalla, kontroll, extra = {}) => ({
  category: kalla.category, supplier: kalla.supplier, check: kontroll.name,
  verify: { oldNumeric: kontroll.bokfort ? (bokfortPris(kontroll.bokfort)?.pris ?? null) : null,
    bokfort: kontroll.bokfort ?? null, pageConfirmsNew: true, ...extra },
});
const kontroll = (leverantor, namn) => {
  const k = PRICE_CHECKS.find((s) => s.supplier === leverantor);
  return [k, k.checks.find((c) => c.name.includes(namn))];
};

describe('BL · prisbaslinjen', () => {
  test('BL-01 · VARJE M365-kontroll bär sitt verifierade pris som baslinje — en verklig Microsoft-ändring kan larma', () => {
    const m365 = PRICE_CHECKS.filter((s) => /^Microsoft 365/.test(s.supplier));
    assert.equal(m365.length, 5, 'fem M365-poster');
    for (const kalla of m365) for (const k of kalla.checks) {
      const larm = larmFor(kalla, k);
      assert.equal(arMarknadshandelse(larm).ja, true, `${kalla.supplier} · ${k.name}: ${arMarknadshandelse(larm).skal}`);
      // Namnet och mönstret följer prisboken — annars larmar vakten varje natt på sin egen förväntan.
      const pris = String(larm.verify.oldNumeric).replace('.', ',');
      assert.ok(k.name.includes(pris), `${k.name} bär inte prisbokens ${pris}`);
      assert.ok(k.pattern.test(`${pris} kr`), `${k.name}: mönstret hittar inte prisbokens ${pris}`);
    }
  });

  test('BL-02 · nattens inaktuella förväntningar och en kontroll utan bokfört pris bär ingen händelse', () => {
    for (const o of [119, 143, 57, 69, 384, 609]) {
      const [kalla, k] = kontroll('Microsoft 365 Business Standard (sv)', 'årsavtal');
      assert.equal(arMarknadshandelse(larmFor(kalla, k, { oldNumeric: o })).ja, false, String(o));
    }
    // USD-kontrollerna har inget SEK-listpris: inget gammalt pris, ingen händelse.
    const [slack, sk] = kontroll('Slack Pro', 'Pro');
    assert.equal(arMarknadshandelse(larmFor(slack, sk)).skal, 'gammalt_pris_saknas');
    // Vägen finns och bär ett tal — det är valutan, inte en saknad nyckel, som ska fälla den.
    assert.equal(typeof BRANCHINDEX['saas-productivity'].licenseTierBenchmarks['slack-pro'].usdAnnual, 'number');
    assert.equal(bokfortPris(['saas-productivity', 'licenseTierBenchmarks', 'slack-pro', 'usdAnnual']), null, 'en USD-post är inget SEK-listpris');
    assert.equal(bokfortPris(['kortterminal', 'x']), null);
    assert.equal(bokfortPris(['mobil', 'alternatives', 0, 'reliability']), null, 'konkurrentlistan är inga prisboksfakta');
  });

  test('BL-03 · baslinjen är LEVERANTÖRENS — Telenors 299 är inte Tele2:s 299 (motprov: Tele2 bär)', () => {
    const vag = ['mobil', 'matrix', 'byraer', 'micro', 'median'];
    const [telenor, tk] = kontroll('Telenor Företag mobilabonnemang', '299');
    assert.equal(arMarknadshandelse(larmFor(telenor, tk)).ja, false, 'utan bokfört pris');
    assert.equal(verifieradBaslinje({ category: 'mobil', supplier: telenor.supplier, bokfort: vag, oldNumeric: 3588 }).skal,
      'bokfort_pris_ar_annan_leverantors', 'Tele2:s median pekad ut åt Telenor');
    assert.equal(verifieradBaslinje({ category: 'mobil', supplier: 'Tele2 Företag mobilabonnemang', bokfort: vag, oldNumeric: 3588 }).verifierad, true, 'motprov');
    assert.equal(verifieradBaslinje({ category: 'saas-productivity', supplier: 'Google Workspace Business Standard',
      bokfort: ['saas-productivity', 'licenseTierBenchmarks', 'business-standard', 'msrpAnnual'], oldNumeric: 133.82 }).skal, 'bokfort_pris_ar_annan_leverantors');
    assert.equal(verifieradBaslinje({ category: 'saas-finance', supplier: 'Microsoft 365',
      bokfort: ['saas-productivity', 'licenseTierBenchmarks', 'business-standard', 'msrpAnnual'], oldNumeric: 133.82 }).skal, 'bokfort_pris_ar_annan_kategoris');
  });

  test('BL-04 · larmets dom på en VERKLIG kontroll: modellens «update» räcker inte — händelsen måste bära', () => {
    const [kalla, k] = kontroll('Microsoft 365 Business Standard (sv)', 'årsavtal');
    const bas = { ...larmFor(kalla, k), haiku: HAIKU };
    assert.equal(bedomLarm({ ...bas, verify: { ...bas.verify, oldNumeric: 119 } }).niva, 'obekraftad', 'inaktuell förväntan');
    assert.equal(bedomLarm({ ...bas, verify: { ...bas.verify, pageConfirmsNew: false } }).niva, 'obekraftad', 'sidan bekräftar inte');
    // Motprovet måste nå 'verifierad' — annars är testet grönt för att modellsvaret föll på något
    // annat (första versionen hade enheten 'per_month', utanför listan, och S4 fällde noll tester).
    assert.equal(bedomLarm(bas).niva, 'verifierad', 'motprov: en verklig ändring med bekräftad sida ska larma');
  });

  test('BL-05 · båda larmvägarna går genom bedomLarm — aldrig modellens dom direkt', () => {
    for (const p of ['scripts/notify-price-changes.mjs', 'api/cron/run-price-alerts.mjs']) {
      const k = strippaStrangar(las(p));
      assert.match(k, /bedomLarm\(a\)/, `${p} anropar inte bedomLarm`);
      assert.doesNotMatch(k, /bedomLarmunderlag\(/, `${p} dömer på modellens svar direkt`);
    }
  });

  test('BL-06 · juryn kräver händelsen, skickar produkten och säger «skriven» bara när raden skrevs', () => {
    const k = strippaStrangar(las('scripts/verify-price-changes.mjs'));
    assert.match(k, /arMarknadshandelse\(a\)/);
    assert.match(k, /product: a\.supplier/, 'product saknas — supplier_price_history.product är NOT NULL');
    assert.match(k, /if \(!skriv\.inserted\)/, 'loggen kan åter säga «skriven» om en misslyckad skrivning');
    const m = strippaStrangar(las('scripts/price-monitor.mjs'));
    assert.match(m, /const oldNumeric = checkObj\?\.bokfort \? \(bokfortPris\(checkObj\.bokfort\)/, 'prisvakten läser inte gamla priset ur prisboken');
    assert.match(m, /bokfort:\s+checkObj\?\.bokfort/, 'larmraden bär inte vägen — domen kan inte pröva leverantören');
    assert.doesNotMatch(m, /extractPriceTokens\(alert\.check\)/, 'gamla priset ur kontrollens namn är tillbaka');
  });
});
