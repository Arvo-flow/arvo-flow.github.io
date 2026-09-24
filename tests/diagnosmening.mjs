// tests/diagnosmening.mjs — DIAGNOSENS MENING TALAR OM AVSTÅND TILL VERIFIERAT LISTPRIS, ALDRIG OM ETT
// BRANSCHSNITT (DM). Bakgrund i src/lib/diagnos.js (diagnosMening) och lib/lagesregister.js (diagnosEtikett).
//
// FÅNGAR: en mening som berömmer en överbetalning eller nämner ett branschsnitt; «Optimalt» på en kund som
//   betalar över jämförelsepriset; en kundyta som åter skriver «branschsnitt/branschdata»; fakturavyn som
//   formulerar diagnosen själv i stället för att fråga registret.
// BLIND: meningen läser `lage` som API:t räknat — ett fel i diagnos() formuleras korrekt här. Skanningen
//   läser ORD: ett kohortpåstående utan orden syns inte (KOHORTPASTAENDE i lib/kundmeningar.js är samma gräns).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { diagnos, diagnosEtikett, fakturaLage } from '../lib/lagesregister.js';
import { diagnosMening, UTAN_VERIFIERAT_PRIS } from '../src/lib/diagnos.js';
import { CATEGORY_META } from '../src/lib/categoryMeta.js';

const ROT = new URL('..', import.meta.url).pathname;
const las = (p) => readFileSync(join(ROT, p), 'utf8');
const BEROM = /bransch|marknadsmässig|konkurrenskraftig|bättre än|optimal|står sig|rätt prissatt/i;

// Hela fältet: kostnad 10 000, jämförelsepris 5 000 … 10 500, med och utan byte.
const falt = [];
for (let s = 5000; s <= 10500; s += 50) for (const sw of [true, false]) falt.push({ annual: 10000, suggested: s, shouldSwitch: sw, netSaving: sw ? 800 : 0 });

describe('DM · diagnosens mening', () => {
  test('DM-01 · meningen berömmer aldrig och nämner aldrig ett branschsnitt — över listpris står talet (motprov: 11 % utan byte)', () => {
    let over = 0;
    for (const p of falt) {
      const lage = diagnos(p);
      const m = diagnosMening(lage, { harByte: p.shouldSwitch && p.netSaving > 0 });
      assert.doesNotMatch(m, BEROM, `${JSON.stringify(p)} → «${m}»`);
      if (lage.matt && lage.overMarketPct >= 1) { over++; assert.ok(m.includes(`${lage.overMarketPct} % över verifierat publikt listpris`), m); }
    }
    assert.ok(over > 50, `bara ${over} mätta fall över listpris — fältet prövar inte grenen`);
    // Fallet som avslöjade felet: förut «Ni har ett marknadsmässigt avtal — bättre än branschsnittet.»
    const elva = diagnos({ annual: 10000, suggested: 9000, shouldSwitch: false, netSaving: 0 });
    assert.equal(elva.score, 85, 'motprovets premiss: poängen är fortfarande 85');
    assert.equal(diagnosMening(elva), 'Ni betalar 11 % över verifierat publikt listpris. Vi föreslår inget byte i dag.');
    assert.match(diagnosMening({ matt: true, grund: 'klickpris', overMarketPct: 0 }), /estimerat prisband/);
    assert.match(diagnosMening({ matt: false, skal: 'inget verifierat jämförelsepris kunde räknas fram' }), /inget verifierat jämförelsepris/);
  });

  test('DM-02 · «Optimalt» sätts aldrig på en kund som betalar över jämförelsepriset (motprov: under en halv procent får)', async () => {
    process.env.RESEND_API_KEY ??= 're_test_ingen_riktig_nyckel';   // modulen bygger klienten vid import
    const { overMarketPctAv } = await import('../api/activate-intelligence.mjs');
    for (const p of falt) {
      const l = fakturaLage({ extracted: { annualCost: p.annual }, recommendation: { suggestedAnnualCost: p.suggested, shouldSwitch: p.shouldSwitch, netSaving: p.netSaving } });
      if (l.matt && l.overMarketPct > 0) assert.notEqual(l.etikett, 'Optimalt', JSON.stringify(p));
    }
    const nara = fakturaLage({ extracted: { annualCost: 100000 }, recommendation: { suggestedAnnualCost: 99800, shouldSwitch: false, netSaving: 0 } });
    assert.deepEqual([nara.overMarketPct, nara.etikett], [0, 'Optimalt'], 'motprov: spärren fäller inte allt');
    assert.equal(diagnosEtikett(85, { overMarketPct: 11 }), 'Förbättringsläge');
    // Aktiveringsmejlet härleder avståndet ur samma två tal som poängen.
    assert.equal(overMarketPctAv(10000, 9000), 11);
    assert.equal(overMarketPctAv(9000, 10000), 0);
  });

  test('DM-03 · ingen kundyta skriver «branschsnitt» eller «branschdata» (undantag motiveras på raden ovanför)', () => {
    const app = las('src/ArvoFlow.js');
    const routade = [...app.matchAll(/^import \w+ from '\.\/pages\/([\w-]+)';/gm)].map((m) => `src/pages/${m[1]}`);
    const filer = [];
    const ga = (d) => { for (const n of readdirSync(join(ROT, d))) { const p = `${d}/${n}`;
      if (statSync(join(ROT, p)).isDirectory()) ga(p); else if (/\.m?js$/.test(n)) filer.push(p); } };
    for (const d of ['api', 'lib', 'src/components', 'src/lib', 'src/utils', ...routade]) ga(d);
    assert.ok(filer.length > 200, `skanningen hittade bara ${filer.length} filer`);
    const traffar = [];
    for (const f of filer) {
      if (f === 'lib/kundmeningar.js') continue;   // registret citerar formen med flit
      const rader = las(f).split('\n');
      rader.forEach((l, i) => {
        if (/^\s*(\/\/|\*|\/\*)/.test(l)) return;
        if (/kundmening-ok:\s*\S.{7,}/.test(rader[i - 1] ?? '')) return;
        if (/branschsnitt|branschdata|branschpris/i.test(l)) traffar.push(`${f}:${i + 1}`);
      });
    }
    assert.deepEqual(traffar, []);
  });

  test('DM-04 · fakturavyn frågar registret; kategoriernas noter påstår ingen besparing utan verifierat pris', () => {
    const tf = las('src/pages/TestaFaktura/index.js');
    assert.match(tf, /: diagnosMening\(_diag, \{ harByte: !!_diag\.harByte \}\);/, 'fakturavyn formulerar diagnosen själv');
    assert.doesNotMatch(tf, /smfBenchmark|_bmPhrase/);
    for (const [k, m] of Object.entries(CATEGORY_META)) {
      assert.equal(m.smfBenchmark, undefined, `${k}: smfBenchmark är tillbaka`);
      if (m.benchmarkType === 'negotiated-target') assert.equal(m.benchmarkNote, UTAN_VERIFIERAT_PRIS, `${k}: egen not`);
    }
  });
});
