// tests/planvalsgrind.mjs — PG · fakturavägen räknar inget byte mot kategorins golv utan bekräftad produkt,
// och BD · analysen lagrar vad besparingen består av.
//
// Grundarbeslut 2026-11-04 («stäng av vid källan»): mobilens bytesmål var kategorins golv, så 349-planen
// till exakt listpris lagrades med «byte till 269» och 9 600 kr. Fem granskningsvarv på rummet visade att
// delarna inte går att räkna fram ur en lagrad rad i efterhand. Nu räknas inget primärt byte, och analysen
// lagrar delarna (lib/bytesdelar.js) som rummet läser.
//
// FÅNGAR: ett primärt mobilbyte mot golvet; en kombinerad faktura som tappar sin bredbandsdel; en analys
//   som lagras utan delar; en läsväg som inte hämtar delarna.
// BLIND: spegelfallet, en bredbandsfaktura med mobil som sekundär del (lib/secondary-savings.js), räknas
//   fortfarande mot mobilens golv; det är loggat som egen PR. Korpusens utfall prövas av prissattningsgraden.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { recommend, PLANVALS_MENING } from '../agents/recommender/recommend.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { bytesdelarForAnalys, lasBytesdelar, BYTESDELAR_VERSION } from '../lib/bytesdelar.js';
import { storeAnalysis, VALFRIA_KOLUMNER } from '../lib/invoice-store.js';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { computeSecondarySaving } from '../lib/secondary-savings.js';

const las = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const stubAi = (sw) => ({ messages: { create: async () => ({
  content: [{ type: 'tool_use', input: { shouldSwitch: sw, recommendationType: sw ? 'switch' : 'no_action', reasoning: 'Analys klar.' } }],
  usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
}) } });
const stubKv = { get: async () => ({ rate: 10.5, source: 'riksbank', date: new Date().toISOString().slice(0, 10), fetchedAt: new Date().toISOString() }) };
async function kor({ category, lineItems, seatCount = null, mixed = false, sw = false, supplier = 'Tele2' }) {
  const metrics = computeInvoiceMetrics(lineItems, category, mixed);
  const arskostnad = lineItems.reduce((s, l) => s + (l.amount ?? 0), 0) * 12;
  return recommend({
    customer: { industry: 'konsult', employees: 10 },
    categorized: { category, confidence: 0.95, normalizedSupplier: supplier },
    invoice: { amount: arskostnad / 12, annualCost: arskostnad, billingPeriod: 'monthly', lineItems, seatCount,
      primaryComponentMonthly: metrics.primaryComponentMonthly, secondaryComponentMonthly: metrics.secondaryComponentMonthly ?? null,
      potentialMixedCategories: mixed },
  }, { client: stubAi(sw), kvStore: stubKv });
}
const XL10 = { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL', quantity: 10, unitPrice: 349, amount: 3490 };

describe('PG · planvalsgrinden i fakturavägen (grundarbeslut 2026-11-04)', () => {
  test('PG-01 · ett mobilbyte mot kategorins golv räknas inte, oavsett vad modellen svarar', async () => {
    for (const sw of [false, true]) {
      const r = await kor({ category: 'mobil', lineItems: [XL10], seatCount: 10, sw });
      assert.equal(r.shouldSwitch, false, `modellen svarade ${sw}`);
      assert.equal(r.savingPerYear, 0);
      assert.equal(r.suggestedAnnualCost, null);
      assert.ok(typeof r.planvalsgrind === 'string' && r.planvalsgrind.length > 20, 'grinden bokför sitt skäl');
      assert.equal(r.reasoning, PLANVALS_MENING, `modellen svarade ${sw}: dess egen text nådde kunden`);
    }
    assert.doesNotMatch(PLANVALS_MENING, /\d/, 'meningen bär inga tal');
    assert.equal(PLANVALS_MENING, 'Vi jämför inte era mobilabonnemang mot det billigaste publicerade abonnemanget, '
      + 'eftersom vi inte vet vilket abonnemang ni har. Ett billigare abonnemang kan vara en annan produkt, med mindre '
      + 'surf eller färre tjänster, så vi räknar ingen besparing på dem.');
    assert.equal(BRANCHINDEX.mobil.bytesmalMotKategorigolv, true, 'premissen: mobil bär deklarationen');
  });

  test('PG-02 · MOTPROV: samma faktura utan deklarationen räknar bytet, så det är grinden som tystar', async () => {
    const mobil = BRANCHINDEX.mobil;
    const fore = mobil.bytesmalMotKategorigolv;
    try {
      mobil.bytesmalMotKategorigolv = false;
      const r = await kor({ category: 'mobil', lineItems: [XL10], seatCount: 10, sw: true });
      assert.equal(r.planvalsgrind, undefined);
      assert.equal(r.shouldSwitch, true, 'utan grinden räknas inget byte; testet kan inte skilja grinden från en tystnad');
      assert.equal(r.savingPerYear, (349 - 269) * 12 * 10, 'planvalet: 349-planen mot 269-planen');
    } finally {
      mobil.bytesmalMotKategorigolv = fore;
    }
  });

  test('PG-03 · en kombinerad mobilfaktura behåller bredbandsdelen, och delarna lagras', async () => {
    const rader = [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', quantity: 5, unitPrice: 349, amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband 250/250 Mbit/s', amount: 549 },
    ];
    const r = await kor({ category: 'mobil', lineItems: rader, seatCount: 5, mixed: true, sw: true });
    assert.equal(r.shouldSwitch, false, 'mobildelen räknades');
    const metrics = computeInvoiceMetrics(rader, 'mobil', true);
    const sek = computeSecondarySaving({ metrics, category: 'mobil', potentialMixedCategories: true, industry: 'konsult', employees: 10 });
    assert.equal(sek?.category, 'bredband');
    assert.ok(sek.grossSaving > 0, 'premissen: bredbandet ligger över Tele2:s pris för samma hastighet');
    const delar = bytesdelarForAnalys({ recommendation: r, primaryGross: r.savingPerYear, secondarySaving: sek });
    assert.deepEqual(delar, { version: BYTESDELAR_VERSION, planvalsgrind: true, primarBrutto: 0,
      sekundar: { kategori: 'bredband', brutto: sek.grossSaving } });
  });
});

describe('BD · bytets delar lagras och läses', () => {
  test('BD-01 · delarna följer fakturavägens summering, och utan grind säger de det', () => {
    const utanGrind = bytesdelarForAnalys({ recommendation: { shouldSwitch: true }, primaryGross: 4800, secondarySaving: null });
    assert.deepEqual(utanGrind, { version: 1, planvalsgrind: false, primarBrutto: 4800, sekundar: null });
    assert.equal(bytesdelarForAnalys({ recommendation: {}, primaryGross: -3, secondarySaving: { grossSaving: 0 } }).sekundar, null);
    // Fakturavägen skickar delarna till lagringen, ur samma tal som summan.
    const tv = las('api/test-invoice.mjs');
    assert.match(tv, /bytesdelar: bytesdelarForAnalys\(\{ recommendation, primaryGross, secondarySaving \}\),/);
    assert.match(tv, /const grossSaving {4}= primaryGross \+ secondaryGross;/);
  });

  test('BD-02 · en rad utan delar, med okänd version eller trasig JSON läses som okänd', () => {
    assert.equal(lasBytesdelar({}), null);
    assert.equal(lasBytesdelar({ bytesdelar_json: { version: 2, planvalsgrind: true } }), null);
    assert.equal(lasBytesdelar({ bytesdelar_json: '{inte json' }), null);
    const d = { version: 1, planvalsgrind: true, primarBrutto: 0, sekundar: { kategori: 'bredband', brutto: 3720 } };
    assert.deepEqual(lasBytesdelar({ bytesdelar_json: d }), d);
    assert.deepEqual(lasBytesdelar({ bytesdelar_json: JSON.stringify(d) }), d, 'en sträng ur databasen läses');
  });

  test('BD-03 · lagringen skriver delarna i en egen sats, och en saknad del raderar inget', async () => {
    const satser = [];
    const db = async (strings, ...vals) => { const sql = strings.join('?').replace(/\s+/g, ' '); satser.push({ sql, vals });
      return /RETURNING id/.test(sql) ? [{ id: 'r1' }] : []; };
    db.query = async () => [];
    const delar = { version: 1, planvalsgrind: true, primarBrutto: 0, sekundar: { kategori: 'bredband', brutto: 3720 } };
    await storeAnalysis({ fingerprint: 'fp', pdfHash: 'ph', route: 'auto', db, recommendation: {}, categorized: { category: 'mobil' },
      extracted: { supplier: 'Tele2' }, bytesdelar: delar });
    const u = satser.find((x) => /SET bytesdelar_json/.test(x.sql));
    assert.ok(u, 'delarna skrivs inte');
    assert.deepEqual(JSON.parse(u.vals[0]), delar);
    assert.ok(!satser.some((x) => /INSERT INTO invoice_analyses[^;]*bytesdelar_json/.test(x.sql)), 'huvudinserten beror på kolumnen');
    satser.length = 0;
    await storeAnalysis({ fingerprint: 'fp', pdfHash: 'ph', route: 'auto', db, recommendation: {}, categorized: { category: 'mobil' },
      extracted: { supplier: 'Tele2' } });
    assert.ok(!satser.some((x) => /SET bytesdelar_json/.test(x.sql)));
  });

  test('BD-04 · kolumnen skapas av migreringen, läks som valfri och läses i rummets fyra läsningar', () => {
    assert.match(las('scripts/migrate.mjs'), /ADD COLUMN IF NOT EXISTS bytesdelar_json JSONB/);
    assert.ok(VALFRIA_KOLUMNER.some(([k, t]) => k === 'bytesdelar_json' && t === 'JSONB'));
    const store = las('lib/invoice-store.js');
    assert.equal((store.match(/uppsagning_json, bytesdelar_json, user_email/g) ?? []).length, 4);
    assert.match(las('api/invoice-history.mjs'), /bytesdelar: lasBytesdelar\(a\),/);
  });
});
