// tests/verifieringsstampel.mjs — VS-01..VS-09
//
// Price-audit larmade i VARJE körning under obduktionen: «Tier 'google-starter' verifierat
// 2026-06-17 (65d, gräns 60d)». Jag såg raden tolv gånger och behandlade den som brus.
//
// Men larmet hade också rätt att gå av, och det är det som var felet: `lastVerified` uppdaterades
// bara när ett pris ÄNDRADES (scripts/apply-price-proposals.mjs). Bekräftade verifieraren ett
// OFÖRÄNDRAT pris hände ingenting — så varje STABILT pris larmade efter 60 dagar, för alltid.
// Ett larm som går av på rätt beteende. Det är exakt mekanismen bakom kodbasens dyraste
// incident: smyghöjningsvakten stängdes av 20 juli för att den skrek på fel saker, och under de
// 16 dygn som följde höjde Microsoft och Tele2 sina priser utan att någon såg det.
//
// FÅNGAR: att en stämpel sätts av en verifierare som inte läste något, som drivit, som väntar på
//   en credential, eller på en nyckel den inte deklarerat sig bevaka; och att skrivningen
//   svämmar över till en grannivå.
// BLIND: prövar OM stämpeln får sättas, aldrig om verifieraren läste RÄTT tal — det är
//   bevakadeTiers och price-audit. Och en källa som svarar med en cachad sida ser likadan ut som
//   ett bekräftat pris; den blindfläcken är uttalad och ostängd.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stampelbeslut, stamplaKalla } from '../lib/verifieringsstampel.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IDAG = '2026-08-21';
const gron = { checks: [{ name: 'Business Starter', ok: true, expected: 7, actual: 7 }] };
const v = { id: 'google-workspace', bevakadeTiers: ['google-starter', 'google-standard'] };

describe('VS · Bara en vakt som faktiskt läste får stämpla', () => {
  test('VS-01 · grön verifierare med bekräftade tal stämplar sina deklarerade nivåer', () => {
    const b = stampelbeslut({ verifierare: v, resultat: gron, idag: IDAG });
    assert.equal(b.stampla, true);
    assert.deepEqual(b.nycklar, ['google-starter', 'google-standard']);
  });

  test('VS-02 · noll checkar stämplar aldrig', () => {
    const b = stampelbeslut({ verifierare: v, resultat: { checks: [] }, idag: IDAG });
    assert.equal(b.stampla, false);
    assert.match(b.skal, /noll checkar|rött|ROTT|rott/i);
  });

  test('VS-03 · drift stämplar aldrig — då rättas priset, inte datumet', () => {
    const b = stampelbeslut({
      verifierare: v, idag: IDAG,
      resultat: { checks: [{ name: 'Starter', ok: true }, { name: 'Standard', ok: false, expected: 14, actual: 16 }] },
    });
    assert.equal(b.stampla, false);
    // Skälet kommer från bedomVerifierarutfall («rott»), inte från stampelbeslut egen driftgren:
    // den delade domen äger driftfrågan och fäller före oss. Min inre kontroll är alltså en
    // BACKSTOP som inte kan nås i dag — den står kvar och är märkt som sådan i modulen, för att
    // hålla om domen någonsin ändras. Att testa den här skulle vara att testa död kod och kalla
    // det ett lager; det som ska bevisas är att drift ALDRIG ger en stämpel, oavsett vem som fäller.
    assert.ok(b.skal.length > 0, 'ett uteblivet stämpelbeslut måste bära sitt skäl');
  });

  test('VS-04 · en verifierare som VÄNTAR på en credential stämplar aldrig', () => {
    const b = stampelbeslut({
      verifierare: v, idag: IDAG,
      resultat: { skipped: true, skippSkal: 'väntar på API-nyckel', checks: [] },
    });
    assert.equal(b.stampla, false);
  });

  test('VS-05 · en vakt utan deklarerade nivåer stämplar ingenting', () => {
    // Kategorivakter är ett giltigt SVAR (tom lista), inte ett fel — men de har inga nivåer att
    // stämpla, och får inte tyst stämpla något annat.
    const b = stampelbeslut({ verifierare: { id: 'eurostat-el', bevakadeTiers: [] }, resultat: gron, idag: IDAG });
    assert.equal(b.stampla, false);
    assert.deepEqual(b.nycklar, []);
  });

  test('VS-11 · icke-grönt utfall stämplar aldrig — ÄVEN med bekräftade checkar', () => {
    // Fallet där GRON-kontrollen är det ENDA som håller. Utan det här testet överlevde spärren
    // sitt eget sabotage: alla mina andra fall hade tomma checks och fångades av nästa gren.
    // Samma läxa som leverantörsspärren 20 augusti — en vakt bevisas först av det fall där inget
    // annat kan rädda den.
    for (const res of [
      { skipped: true, skippSkal: 'väntar på API-nyckel', checks: [{ name: 'Starter', ok: true }] },
      { fatal: true, notes: ['källan svarade 500'], checks: [{ name: 'Starter', ok: true }] },
      { skipped: true, checks: [{ name: 'Starter', ok: true }] },
    ]) {
      const b = stampelbeslut({ verifierare: v, resultat: res, idag: IDAG });
      assert.equal(b.stampla, false,
        `stämplade trots ${JSON.stringify(res).slice(0, 60)} — en vakt som hoppade över eller ` +
        'dog får inte datera prisboken bara för att den råkar bära gamla checkar');
    }
  });

  test('VS-06 · ogiltigt datum stämplar aldrig', () => {
    for (const d of [undefined, null, '', 'i går', '2026-8-21', new Date()]) {
      assert.equal(stampelbeslut({ verifierare: v, resultat: gron, idag: d }).stampla, false,
        `datumet ${String(d)} accepterades — ett stämplat skräpdatum är värre än ett gammalt`);
    }
  });
});

describe('VS · Skrivningen träffar exakt den nyckel den ska', () => {
  const KALLA = readFileSync(join(ROT, 'agents', 'recommender', 'branchindex.js'), 'utf8');

  test('VS-07 · stämpeln flyttar BARA den utpekade nivåns datum', () => {
    const fore = [...KALLA.matchAll(/lastVerified:\s*'([^']+)'/g)].map((m) => m[1]);
    const { kalla, andrade } = stamplaKalla(KALLA, ['google-starter'], IDAG);
    assert.deepEqual(andrade, ['google-starter']);
    const efter = [...kalla.matchAll(/lastVerified:\s*'([^']+)'/g)].map((m) => m[1]);
    assert.equal(fore.length, efter.length, 'antalet datum ändrades — skrivningen svämmade över');
    const flyttade = fore.filter((d, i) => d !== efter[i]);
    assert.equal(flyttade.length, 1,
      `${flyttade.length} datum flyttades i stället för ett — en global replace hade stämplat ` +
      'hela prisboken och gjort varje ankare «färskt» utan att någon läst det');
    // Och nivån har verkligen fått det nya datumet. Mönstret byggs utan strängescape — den
    // första versionen dubbelescapade `\\s` inuti en template literal och matchade därför aldrig.
    const blockRe = new RegExp("'google-starter':\\s*\\{[^{}]*?lastVerified:\\s*'" + IDAG + "'", 's');
    assert.match(kalla, blockRe);
  });

  test('VS-08 · en okänd nyckel ändrar ingenting och rapporteras', () => {
    const { kalla, andrade, oforandrade } = stamplaKalla(KALLA, ['finns-inte-i-prisboken'], IDAG);
    assert.equal(kalla, KALLA, 'källan rördes trots att nyckeln saknas');
    assert.deepEqual(andrade, []);
    assert.deepEqual(oforandrade, ['finns-inte-i-prisboken']);
  });

  test('VS-09 · en nivå som redan bär dagens datum räknas inte som ändrad', () => {
    const { kalla } = stamplaKalla(KALLA, ['google-starter'], IDAG);
    const { andrade } = stamplaKalla(kalla, ['google-starter'], IDAG);
    assert.deepEqual(andrade, [], 'en oförändrad skrivning får inte se ut som en ny verifiering');
  });
});

describe('VS-10 · Verifieraren är inkopplad mot den delade modulen', () => {
  test('scripts/verify.mjs anropar stampelbeslut, inte en egen kopia', () => {
    const kod = readFileSync(join(ROT, 'scripts', 'verify.mjs'), 'utf8')
      .split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
    assert.match(kod, /stampelbeslut\(\{/,
      'stämpelbeslutet ska fattas av den prövade funktionen — en inline-kopia kan glida isär ' +
      'från vakten (samma läxa som bedomVerifierarutfall)');
    assert.doesNotMatch(kod, /lastVerified:\s*'\$\{/,
      'verify.mjs får inte formatera in ett datum själv — skrivningen bor i stamplaKalla');
  });
});
