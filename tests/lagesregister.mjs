// tests/lagesregister.mjs — LÄGESREGISTRET (LR) + analysmejlet (SA). Bakgrund i lib/lagesregister.js.
//
// FÅNGAR: en yta som räknar sitt läge själv igen · ett läge utan text i ytan · en text som berömmer
//   priset i ett läge som deklarerat motsatsen · 1–15 % över golvet kallat «på eller under» · ett
//   bevakat avtal kallat konkurrenskraftigt · en omätt poäng med etikett («Kritisk») · ett mejl som
//   visar «+0 kr» / «Arvo-pris 0 kr/år» utan byte · siffran utan källa i mejlet.
// BLIND: registret ser att en text FINNS per läge och vilka ord den bär — inte hela innebörden.
//   Rendering bevisas av scripts/screenshot-lagesregister.mjs (DOM-kontroller, 390 + 1600 px).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { strippaStrangar } from '../lib/kalltextlexer.js';
import {
  RADLAGEN, DOMLAGEN, radLage, rumLage, fakturaLage, diagnosEtikett, OVER_GOLVET_PCT,
} from '../lib/lagesregister.js';
import { RATTSTORLEK_FALT } from '../lib/rattstorleksfynd.js';
import { rattstorleksKort } from '../lib/rattstorlekskort.js';
import { MOTIVERING, MARKE, radMotivering, radMarke } from '../src/lib/rumstext.js';
import { genitiv as genitivLib } from '../lib/format.js';
import { genitiv as genitivSrc } from '../src/utils/format.js';

const las = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const RUM = las('src/pages/Portfolio/index.js');
const VY = las('src/pages/TestaFaktura/index.js');
const u = (pct) => ({ perEnhet: 3588 * (1 + pct / 100), golv: 3588, avstandPct: pct, underGolv: pct <= 0, unitLabel: 'per abonnemang/år' });
const rad = (extra = {}) => ({ id: 1, category: 'mobil', route: 'auto', supplier: 'Telia', normalized_supplier: 'Telia',
  annual_cost: 48000, created_at: '2026-09-20T08:00:00Z', ...extra });
const BEROM = /på eller under|står sig|(?<!inte )konkurrenskraftig|Rätt prissatt/i;

describe('LR · lägesregistret äger läget, ytan äger orden', () => {
  test('LR-01 · ingen yta räknar sitt läge själv', () => {
    for (const [namn, kod] of [['rummet', strippaStrangar(RUM)], ['fakturavyn', strippaStrangar(VY)]]) {
      for (const f of ['domensLage', 'computeActing', 'roomCounts', 'supplierDiagScore', 'radScore', 'computeArvoScore',
        'marketStanding', 'groupBySupplier', 'buildReasoning', 'harNivasankningskort']) {
        assert.doesNotMatch(kod, new RegExp(`\\b${f}\\s*\\(`), `${namn} räknar ${f} själv`);
      }
      assert.doesNotMatch(kod, /\bdiagnos\s*\(\{/, `${namn} räknar diagnosen själv`);
    }
    assert.match(RUM, /setRum\(data\.rum\)/);
    assert.match(RUM, /if \(!data\.rum\) throw/, 'ett saknat rumsläge får aldrig ersättas av ett påhittat');
  });

  test('LR-02 · varje radläge har en motivering och ett märke — och bara de', () => {
    assert.deepEqual(Object.keys(MOTIVERING).sort(), Object.keys(RADLAGEN).sort());
    assert.deepEqual(Object.keys(MARKE).sort(), Object.keys(RADLAGEN).sort());
    const p = { ovPct: 20, avstandPct: 12, perEnhet: 4000, golv: 3588, unitLabel: 'per år', netSaving: 2000, referensProdukt: null };
    for (const k of Object.keys(RADLAGEN)) {
      assert.ok(MOTIVERING[k](p, 'mobilabonnemang').length > 40, `${k}: tom motivering`);
      assert.ok(MARKE[k](p, {}).text.length > 2, `${k}: tomt märke`);
    }
  });

  test('LR-03 · rummets domtabell täcker exakt registrets lägen', () => {
    const block = RUM.slice(RUM.indexOf('const DOMTEXT = {'), RUM.indexOf('\n  };\n', RUM.indexOf('const DOMTEXT = {')));
    assert.ok(block.length > 500, 'hittade inte DOMTEXT');
    const nycklar = [...block.matchAll(/^ {4}([a-z_]+): \{$/gm)].map((m) => m[1]);
    assert.deepEqual(nycklar.sort(), Object.keys(DOMLAGEN).sort());
  });

  test('LR-04 · beröm bara i lägen som registret deklarerar positiva', () => {
    const p = { ovPct: 20, avstandPct: 12, perEnhet: 4000, golv: 3588, unitLabel: 'per år', netSaving: 2000 };
    for (const [k, def] of Object.entries(RADLAGEN)) {
      const text = `${MOTIVERING[k](p, 'mobilabonnemang')} ${MARKE[k](p, {}).text}`;
      if (!def.positivtPrispastaende) assert.doesNotMatch(text, BEROM, `${k} berömmer priset men är deklarerat neutralt`);
    }
    // Motprov: det enda positiva läget FÅR berömma — annars mäter vakten ingenting.
    assert.match(MOTIVERING.pa_eller_under_golvet(p, 'x'), BEROM);
    for (const [k, def] of Object.entries(DOMLAGEN)) {
      const b = RUM.slice(RUM.indexOf(`    ${k}: {`), RUM.indexOf('\n    },', RUM.indexOf(`    ${k}: {`)));
      assert.ok(b.length > 20, `hittade inte domtexten för ${k}`);
      if (!def.positivtPrispastaende) assert.doesNotMatch(b, /står sig/, `${k} berömmer priset i domen`);
      if (!def.positivtPastaende) assert.doesNotMatch(b, /under kontroll/, `${k} gör ett positivt påstående registret förbjuder`);
    }
  });

  test('LR-05 · backendens genitiv är frontendens', () => {
    for (const n of ['Fortnox', 'Spiris', 'Telia', 'Adobe', 'Microsoft', 'Fortnox Lön', 'Xerox', '', null]) {
      assert.equal(genitivLib(n), genitivSrc(n), String(n));
    }
  });

  test('LR-06 · fakturans läge: en omätt poäng har ingen etikett', () => {
    const omatt = fakturaLage({ extracted: { annualCost: 12000 }, recommendation: { shouldSwitch: false }, categorized: { category: 'mobil' } });
    assert.equal(omatt.matt, false);
    assert.equal(omatt.score, null);
    assert.equal(omatt.etikett, null, 'en omätt poäng fick en etikett — det var «Kritisk 0 /100»');
    assert.equal(omatt.harByte, false);
    // Motprov: en mätt låg poäng FÅR vara Kritisk.
    const matt = fakturaLage({ extracted: { annualCost: 12000 }, recommendation: { shouldSwitch: true, suggestedAnnualCost: 6000, netSaving: 4800 }, categorized: { category: 'mobil' } });
    assert.equal(matt.etikett, diagnosEtikett(matt.score));
    assert.equal(matt.harByte, true);
    assert.equal(diagnosEtikett(null), null);
    assert.equal(fakturaLage({ categorized: { category: 'uncategorized' } }).rubrik, 'kategori_omatt');
    assert.equal(fakturaLage({ recommendation: { m365Rightsizing: {} }, categorized: { category: 'saas-productivity' } },
      { rattstorlekFalt: RATTSTORLEK_FALT }).rubrik, 'inget_byte_med_nivasankning');
    // Vyn läser läget och skickar API:ts poäng — aldrig gaugens ritvärde — till aktiveringsmejlet.
    assert.match(VY, /diagScore:\s+result\?\.lage\?\.score \?\? null/);
    assert.match(VY, /diagLabel:\s+result\?\.lage\?\.etikett \?\? null/);
  });

  test('LR-07 · rummets läge ur raderna: omätt, byte utan poäng och fynd', () => {
    const lugn = rumLage({ analyses: [rad(), rad({ id: 2, supplier: 'Fortnox', normalized_supplier: 'Fortnox', category: 'saas-finance' })] });
    assert.equal(lugn.lage, 'lugn_omatt');
    assert.equal(lugn.omatt, true);
    assert.equal(lugn.berom, false);
    assert.equal(lugn.counts.prissatta, 0);
    const byteUtanPoang = rumLage({ analyses: [rad({ should_switch: true, net_saving: 3000, annual_cost: null })] });
    assert.equal(byteUtanPoang.lage, 'byte_omatt', 'ett byte utan mätt position får aldrig kallas «mer än listpris»');
    const fynd = rumLage({ analyses: [rad({ lead_finding_json: { title: 'Avbetald hårdvara', severity: 'high', annualImpact: 16800 } })] });
    assert.equal(fynd.lage, 'fynd');
    assert.equal(fynd.fynd.annualImpact, 16800);
    // Motprov: ett mätt, bra läge får beröm.
    const bra = rumLage({ analyses: [rad({ arvoScore: 90, prisunderlag: u(-5) })] });
    assert.equal(bra.lage, 'lugn_battre');
    assert.equal(bra.berom, true);
    // Korten och antalet kommer ur samma lista.
    const kort = rumLage({ analyses: [rad({ category: 'saas-finance', rattstorlek_json: { falt: 'saasFinanceRightsizing', vendor: 'Fortnox', currentPaket: 'Stor', currentMonthly: 710, targetPaket: 'Mellan', targetMonthly: 490, annualSaving: 2640 } })],
      rattstorlekKort: rattstorleksKort });
    assert.equal(kort.nivaer, 1);
    assert.equal(kort.rattstorlekKort[0].annualImpact, 2640);
  });

  test('LR-08 · raden: 1–15 % över golvet är «nära», aldrig «på eller under»; bevakat avtal berömmer inte', () => {
    const kod = (pct) => radLage(rad({ prisunderlag: u(pct) })).kod;
    assert.equal(kod(-5), 'pa_eller_under_golvet');
    assert.equal(kod(8), 'nara_golvet');
    assert.equal(kod(OVER_GOLVET_PCT), 'nara_golvet');
    assert.equal(kod(OVER_GOLVET_PCT + 1), 'over_golvet');
    const nara = rad({ prisunderlag: u(12) }); nara.lage = radLage(nara);
    assert.doesNotMatch(radMotivering(nara), /på eller under/);
    assert.doesNotMatch(radMarke(nara).text, /Rätt prissatt/);
    assert.match(radMotivering(nara), /12% mer/);
    const bev = rad({ route: 'monitoring' }); bev.lage = radLage(bev);
    assert.equal(bev.lage.kod, 'bevakat_avtal');
    assert.equal(bev.lage.score, null);
    assert.doesNotMatch(radMotivering(bev), /konkurrenskraftig/);
  });
});

describe('SA · analysmejlet renderar efter läget', async () => {
  process.env.RESEND_API_KEY ??= 're_test_inte_skarp';
  const { htmlEmail, generatePdf, mejlLage } = await import('../api/send-analysis.mjs');
  const text = (h) => h.replace(/<!--[\s\S]*?-->/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&rarr;/g, '→').replace(/\s+/g, ' ');
  const ingetByte = { extracted: { supplier: 'Tele2', annualCost: 12000 }, categorized: { category: 'mobil' }, recommendation: { shouldSwitch: false, reasoning: 'Ni ligger rätt.' } };
  const byte = { extracted: { supplier: 'Telia', annualCost: 12000 }, categorized: { category: 'mobil' },
    recommendation: { shouldSwitch: true, suggestedAnnualCost: 9000, grossSaving: 3000, netSaving: 2400, arvoFee: 600, reasoning: 'x' } };

  test('SA-01 · utan byte: ingen «+0 kr», inget Arvo-pris, inget «tror du kan spara»', () => {
    assert.equal(mejlLage(ingetByte).harByte, false);
    const t = text(htmlEmail(ingetByte));
    assert.doesNotMatch(t, /\+0 kr|Arvo-pris|→ 0 kr|tror du kan spara/);
    assert.match(t, /Inget byte att rekommendera/);
    assert.match(t, /inget verifierat jämförelsepris/, 'omätt ska sägas som omätt');
  });

  test('SA-02 · med byte: besparingen står kvar (motprovet)', () => {
    const t = text(htmlEmail(byte));
    assert.match(t, /Din nettobesparing \+2\s400 kr/);
    assert.match(t, /Arvo-pris 9\s000 kr\/år/);
  });

  test('SA-03 · siffran utan källa är struken, och PDF:en byggs i båda lägena', async () => {
    for (const r of [ingetByte, byte]) {
      assert.doesNotMatch(text(htmlEmail(r)), /12–18|12&ndash;18|60 sekunder/);
      const pdf = await generatePdf(r);
      assert.ok(pdf.length > 1000, 'PDF:en byggdes inte');
    }
    const kalla = strippaStrangar(las('api/send-analysis.mjs'));
    assert.doesNotMatch(kalla, /FOMO_H/);
  });

  test('SA-04 · aktiveringsmejlet: omätt poäng är «Inte mätt», aldrig «Kritisk 0»', async () => {
    const { buildBriefingHtml } = await import('../api/activate-intelligence.mjs');
    const t = text(buildBriefingHtml({ supplier: 'Tele2', annualCost: 12000, netSaving: 0, diagScore: null, diagLabel: 'Kritisk', diagInsight: 'x' }));
    assert.doesNotMatch(t, /Kritisk|0 \/100/, 'klientens etikett eller ett låtsat värde nådde mejlet');
    assert.match(t, /Inte mätt/);
    const m = text(buildBriefingHtml({ supplier: 'Tele2', annualCost: 12000, netSaving: 0, diagScore: 30, diagLabel: 'Optimalt', diagInsight: 'x' }));
    assert.match(m, /Kritisk 30 \/100/, 'motprov: etiketten ur registret, inte ur anropet');
  });
});
