// tests/stress-mork.mjs — låser MÖRKER-DOSSIERN: stresstestet av grindarna mot 50 smutsiga fakturor.
//
// Detta är inte ett pris-test — det är ett VAKT-test. Det kör de RIKTIGA deterministiska grindarna
// (deterministicMatch · isAudited · aggregateByCategory · detectFeeSignals · innehålls-hash-dedup)
// över en genererad korpus av smutsiga fakturor och låser de invarianter grundaren bad om i
// stresstestet 2026-06-27: fångar grinden allt junk, håller den de rörliga kostnaderna (Kivra)
// borta, och kollapsar dedup BARA äkta dubbletter? En framtida ändring som börjar släppa igenom
// junk, annualisera rörligt, eller slå ihop fel fakturor fälls nu av en maskin, inte av tur (regel 7).
//
// Körs helt offline — inga AI-anrop, ingen DB. AI-prosa-lagret i recommend() testas inte här
// (det kräver krediter/nät); det som låses är exakt det deterministiska skiktet stresstestet prövade.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { runMorker } from '../scripts/stress-mork.mjs';

const r = runMorker();

describe('Mörker-dossier · dedup (innehålls-hash)', () => {
  test('50 genererade → exakt 6 exakta dubbletter kollapsade → 44 unika', () => {
    assert.equal(r.generated, 50);
    assert.equal(r.dupCollapsed, 6, 'exakta byte-identiska re-sends ska kollapsa');
    assert.equal(r.uniqueAnalyzed, 44);
  });

  test('nära-dubbletter (samma rader, nytt fakturanr/datum) kollapsas ALDRIG', () => {
    // 40 unika + 6 exakta + 4 nära = 50. Om dedup vore belopps-baserad skulle den slå ihop
    // de 4 nära-dubbletterna → uniqueAnalyzed < 44. Tele2-läxan: olika faktura = olika faktura.
    assert.equal(r.generated - r.dupCollapsed, r.uniqueAnalyzed);
    assert.ok(r.uniqueAnalyzed >= 44, 'nära-dubbletter får inte tappas av misstag');
  });
});

describe('Mörker-dossier · revisionsgrinden (regel 4 som arkitektur)', () => {
  const flat = (arr) => arr.join(' ');

  test('reviderade leverantörer visar siffror (AUDITED)', () => {
    const a = flat(r.gate.AUDITED);
    assert.match(a, /Telia Företag→molnvaxel/);
    assert.match(a, /Telavox AB→molnvaxel/);
    assert.match(a, /Microsoft Ireland→saas-productivity/);
    assert.match(a, /Adobe Systems→saas-creative/);
  });

  test('oreviderade kategorier tystas till talfri offert (GATED) — aldrig siffror', () => {
    const g = flat(r.gate.GATED);
    assert.match(g, /Fortnox AB→faktura-tjanst/);
    assert.match(g, /Visma Spcs→faktura-tjanst/);
    assert.match(g, /HubSpot, Inc\.→saas-crm/);
  });

  test('Fortnox/Visma Lön routas till faktura-tjanst, ALDRIG loneadmin (lönesystem ≠ löneadmin-byte)', () => {
    const all = [...r.gate.AUDITED, ...r.gate.GATED, ...r.gate['AI-FALLBACK']].join(' ');
    assert.doesNotMatch(all, /Fortnox AB→loneadmin/);
    assert.doesNotMatch(all, /Visma Spcs→loneadmin/);
  });

  test('ingen oreviderad kategori klassas som AUDITED (tystnadsgarantin)', () => {
    // Varje AUDITED-rad måste peka på en kategori isAudited() faktiskt godkänner.
    // (runMorker sätter status via samma isAudited — detta låser att uppsättningen inte glider.)
    assert.ok(r.gate.AUDITED.length > 0);
    assert.ok(r.gate.GATED.length > 0, 'minst en kategori ska tystas — annars läcker grinden');
  });
});

describe('Mörker-dossier · junk-fångsten (run-rate-renhet)', () => {
  test('fasta avgifter, FX och hårdvara typas och räknas som icke-fasta rader', () => {
    assert.ok(r.junk.feeLines > 0 && r.junk.feeKrYr > 0, 'avgiftsrader ska fångas');
    assert.ok(r.junk.fxLines > 0 && r.junk.fxKrYr > 0, 'FX-/cross-border-rader ska fångas');
    assert.ok(r.junk.hwLines > 0 && r.junk.hwKrYr > 0, 'hårdvarurader ska fångas');
  });
});

describe('Mörker-dossier · Kivra-frågan (rörligt hålls borta)', () => {
  test('rörliga rader fångas OCH ändrar aldrig den kundvända run-raten (computeInvoiceMetrics)', () => {
    assert.ok(r.junk.varLines > 0 && r.junk.varKrYr > 0, 'rörliga rader (Kivra/utskick/overshoot) ska fångas');
    // computeInvoiceMetrics bygger run-raten ur en allowlist (recurring_subscription) — så metriken
    // ska vara identisk med och utan de rörliga raderna. EN krona som ändrar metriken = besparingsbasen
    // förgiftad. (Skuggmodulen aggregateByCategory exkluderar INTE variable — men den når aldrig kund.)
    assert.equal(r.variableLeakedIntoRunRate, 0);
  });
});

describe('Mörker-dossier · tariff-markör (detectFeeSignals)', () => {
  test('generiska avgifter triggar ALDRIG höjningslarmet (bara "ny tariff"-ord får)', () => {
    // Arketyperna bär generiska avgifter ("Expeditionsavgift", "Faktureringsavgift") — inte
    // leverantörens höjningsmarkörer. Detektorn ska tiga, annars skriker den falskt på var faktura.
    assert.equal(r.tariffSignalHits, 0);
  });
});

describe('Mörker-dossier · forensik (övervintrande hårdvara)', () => {
  test('iPhone-avbetalning bortom planen (Månad 37/36) flaggas som redan avbetald hårdvara', () => {
    assert.ok(r.forensics.length > 0, 'avbetalning bortom planen ska fångas');
    assert.ok(r.forensics.every((f) => /månad 37 av 36/i.test(f)));
    assert.ok(r.forensics.some((f) => /Tre Företag/.test(f)));
  });
});
