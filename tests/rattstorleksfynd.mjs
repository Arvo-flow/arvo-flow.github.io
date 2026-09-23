// tests/rattstorleksfynd.mjs — ETT RÄTT-STORLEKSFYND SOM MOTORN RÄKNADE NÅR RUMMET.
//
// Bakgrund i lib/rattstorleksfynd.js. Kort: fyra motorer räknade verifierade listprisskillnader,
// `storeAnalysis` kastade dem, och rummet kunde aldrig visa dem.
//
// FÅNGAR: ett fynd som inte lagras · ett lagrat fynd som överlever en körning utan fynd eller en
//   triage · ett register som glider isär från rubrikens · ett kort som kallar ett listpris för
//   kundens pris · ett kort ur en okänd eller halv form · en läsväg eller migrering som tappar kolumnen.
// BLIND: sviten kör mot en fejkad databas; att kolumnen finns i produktion bevisas av migreringen
//   och av probe-fyndgrad. Kortets RENDERING bevisas av bygget och en skärmdump (regel 8).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { valjRattstorlek, RATTSTORLEK_FALT } from '../lib/rattstorleksfynd.js';
import { storeAnalysis, storeTriaged, VALFRIA_KOLUMNER } from '../lib/invoice-store.js';
import { RATTSTORLEK_FALT as NIVASANKNINGSKORT } from '../lib/rattstorleksfynd.js';
import { rattstorleksKort, RATTSTORLEK_BYGGARE } from '../lib/rattstorlekskort.js';
import { saasFinanceRightsizing } from '../lib/saas-finance-rightsizing.js';
import { m365Rightsizing } from '../lib/m365-rightsizing.js';

function fejkDb() {
  const satser = [];
  const db = async (strings, ...vals) => {
    const sql = strings.join('?').replace(/\s+/g, ' ').trim();
    satser.push({ sql, vals });
    if (/RETURNING id/.test(sql)) return [{ id: 'rad-1' }];
    return [];
  };
  db.query = async () => [];
  db.satser = satser;
  return db;
}
const RAD = { fingerprint: 'fp', pdfHash: 'ph', route: 'auto',
  extracted: { supplier: 'Fortnox', annualCost: 8520 }, categorized: { category: 'saas-finance' } };
const FORTNOX = saasFinanceRightsizing([{ description: 'Fortnox Paket Stor', amount: 710 }]);

describe('RS · rätt-storleksfyndet lagras och når rummet', () => {
  test('RS-01 · valet läser samma register som fakturavyns rubrik, och prosan lagras inte', () => {
    assert.ok(FORTNOX, 'fixturen gav inget fynd — motprovet saknas');
    const v = valjRattstorlek({ saasFinanceRightsizing: FORTNOX });
    assert.equal(v.falt, 'saasFinanceRightsizing');
    assert.equal(v.annualSaving, FORTNOX.annualSaving);
    assert.equal(v.reviewPrompt, undefined, 'prosan skrivs vid läsning — en lagrad mening fryser copyn');
    assert.equal(valjRattstorlek({}), null);
    assert.equal(valjRattstorlek(null), null);
    for (const f of NIVASANKNINGSKORT) {
      assert.equal(valjRattstorlek({ [f]: { annualSaving: 1 } })?.falt, f, `${f} väljs inte`);
    }
  });

  test('RS-02 · varje rubrikfält har en kortbyggare, och ingen byggare saknar rubrikfält', () => {
    assert.deepEqual([...RATTSTORLEK_BYGGARE].sort(), [...NIVASANKNINGSKORT].sort());
  });

  test('RS-03 · kortet kallar listpriset listpris — aldrig kundens pris', () => {
    const k = rattstorleksKort(valjRattstorlek({ saasFinanceRightsizing: FORTNOX }));
    assert.equal(k.annualImpact, FORTNOX.annualSaving);
    assert.match(k.text, /listpris 710 kr\/mån/);
    assert.match(k.text, /Fortnox publika listpris/, 'genitiv på s-namn tar ingen ändelse');
    assert.doesNotMatch(k.text, /Ni betalar/, 'saas-finance-talet är ett listpris, inte kundens pris');
    const m = rattstorleksKort(valjRattstorlek({ m365Rightsizing: m365Rightsizing('e5', 25) }));
    assert.match(m.text, /listpris 641,18/);
    assert.doesNotMatch(m.text, /Ni betalar/);
    assert.equal(m.annualImpact, 129267);
  });

  test('RS-04 · okänd eller halv form ger inget kort; löneadmin vid golvet är inget fynd', () => {
    assert.equal(rattstorleksKort({ falt: 'okantFalt', annualSaving: 5 }), null);
    assert.equal(rattstorleksKort({ falt: 'saasFinanceRightsizing', annualSaving: 5 }), null);
    assert.equal(rattstorleksKort(null), null);
    const la = { falt: 'loneadminRightsizing', headcount: 8, perEmployeeLabel: '60,00',
      floorPerEmployeeLabel: '49,88', annualSaving: 972, aboveFloor: true, alreadyFortnox: false };
    assert.ok(rattstorleksKort(la), 'motprovet: löneadmin över golvet ÄR ett fynd');
    assert.match(rattstorleksKort(la).text, /Ni betalar 60,00 kr\/anställd/, 'löneadminens tal är kundens eget');
    assert.equal(rattstorleksKort({ ...la, aboveFloor: false }), null);
    assert.equal(rattstorleksKort({ ...la, alreadyFortnox: true }), null);
    // Adobe utan licensantal: skillnaden per licens, aldrig ett påhittat årstal.
    const ad = rattstorleksKort({ falt: 'adobeRightsizing', currentLabel: 'Alla program', currentMonthlyLabel: '746,00',
      targetLabel: 'Single App', targetMonthlyLabel: '319,20', unit: 'kr/användare/mån', perSeatDeltaLabel: '426,80',
      seats: null, annualSaving: null });
    assert.equal(ad.annualImpact, undefined);
    assert.equal(ad.metricText, '426,80 kr/användare/mån');
  });

  test('RS-05 · storeAnalysis skriver fyndet i en egen sats', async () => {
    const db = fejkDb();
    await storeAnalysis({ ...RAD, db, recommendation: { saasFinanceRightsizing: FORTNOX } });
    const s = db.satser.find((x) => /SET rattstorlek_json/.test(x.sql));
    assert.ok(s, 'fyndet skrivs inte');
    assert.equal(JSON.parse(s.vals[0]).annualSaving, FORTNOX.annualSaving);
  });

  test('RS-06 · en körning UTAN fynd skriver NULL — det gamla fyndet får inte stå kvar', async () => {
    const db = fejkDb();
    await storeAnalysis({ ...RAD, db, recommendation: {} });
    const s = db.satser.find((x) => /SET rattstorlek_json/.test(x.sql));
    assert.ok(s, 'satsen hoppas över när fynd saknas — föregående körnings fynd lever kvar i rummet');
    assert.equal(s.vals[0], null);
  });

  test('RS-07 · en triage rensar fyndet', async () => {
    const db = fejkDb();
    await storeTriaged({ fingerprint: 'fp', pdfHash: 'ph', supplier: 'X', route: 'review_queue',
      reason: 'Ring1', userEmail: 'x@y.se', db });
    assert.ok(db.satser.some((x) => /SET rattstorlek_json = NULL/.test(x.sql)),
      'en triagerad faktura behåller ett prissatt fynd bredvid «vi prissatte den inte»');
  });

  test('RS-09 · backendens spegel är IDENTISK med rubrikens register (samma ordning)', () => {
    assert.deepEqual(RATTSTORLEK_FALT, NIVASANKNINGSKORT);
    const lib = readFileSync(new URL('../lib/rattstorleksfynd.js', import.meta.url), 'utf8');
    assert.doesNotMatch(lib, /from '\.\.\/src\//, 'lib/ får inte importera ur src/ — modulformatet är inte deklarerat där');
  });

  test('RS-10 · rummets dom läser samma lista som renderar korten', () => {
    // Närvarokontroll, inte ordningsbevis — en källtextvakt kan inte se vilken gren som körs.
    // Beteendet bevisas i DOM:en av scripts/screenshot-rattstorlek.mjs (med motprov utan fynd).
    // Lägesregistret (2026-09-23): antalet kommer ur API:ts rumsläge, från samma kort som renderas.
    const rum = readFileSync(new URL('../src/pages/Portfolio/index.js', import.meta.url), 'utf8');
    assert.match(rum, /const nivaer = rum\?\.nivaer/);
    assert.match(rum, /const roomRattstorlek = rum\?\.rattstorlekKort/);
    const dom = rum.slice(rum.indexOf('const DOMTEXT = {'), rum.indexOf('const verdictWork = '));
    assert.ok(dom.length > 200, 'domens utsnitt är tomt — ankaret flyttade');
    assert.match(dom, /nivaer > 0/, 'domen frågar inte rätt-storleksfynden');
  });

  test('RS-08 · migreringen, läkningen och läsvägarna bär kolumnen', () => {
    const mig = readFileSync(new URL('../scripts/migrate.mjs', import.meta.url), 'utf8');
    assert.match(mig, /ADD COLUMN IF NOT EXISTS rattstorlek_json JSONB/);
    assert.ok(VALFRIA_KOLUMNER.some(([n]) => n === 'rattstorlek_json'));
    const store = readFileSync(new URL('../lib/invoice-store.js', import.meta.url), 'utf8');
    assert.equal((store.match(/line_items_json, rattstorlek_json[,\n]/g) ?? []).length, 4,
      'båda rumsläsningarna (full + efter läkning) ska hämta kolumnen');
    // Korten byggs i api-lagret (lib/lagesregister.js rumLage) ur den senaste raden per leverantör.
    const hist = readFileSync(new URL('../api/invoice-history.mjs', import.meta.url), 'utf8');
    assert.match(hist, /rumLage\(\{ analyses, watched, rattstorlekKort: rattstorleksKort \}\)/, 'rummet frågar inte fyndet');
    const reg = readFileSync(new URL('../lib/lagesregister.js', import.meta.url), 'utf8');
    assert.match(reg, /rattstorlekKort\(g\.latest\?\.rattstorlek_json\)/, 'registret bygger inte korten ur den senaste raden');
  });
});
