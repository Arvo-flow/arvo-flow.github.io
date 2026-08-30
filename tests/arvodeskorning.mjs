// tests/arvodeskorning.mjs — AK-01..10: arvodeskörningen som betar av liggaren.
//
// `lib/switcharvode.js` (SA-01..08) dömer EN switch. Den här sviten prövar KÖRNINGEN: att rätt
// datum läses, att inget arvode köas två gånger, att en trasig post inte river faktureringen och
// att varje post lämnar en rad. Tre av de fyra är fel som redan begåtts i kodbasen i annan form.
//
// FÅNGAR: karens räknad från `updatedAt` i stället för utförandedagen, dubbelköat arvode, en
//   trasig post som river körningen, och en tyst överhoppad post.
// BLIND: sviten prövar kön, aldrig att en köad rad blir en faktura. Det ledet finns inte ännu —
//   och tills det gör det är kön ett underlag för en människa, aldrig en utförd handling.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { arvodeskoen, arbeteUtfortDatum, REDAN_HANTERAD } from '../lib/arvodeskorning.js';
import { KARENS_DAGAR, ARBETE_UTFORT } from '../lib/switcharvode.js';
import { STATES } from '../agents/orchestrator/state-machine.js';
import { ARVO_FEE_RATE } from '../lib/fee.js';

const dagarSedan = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

/** Bygger en liggarpost i FileStore-form. */
function post({
  id = 'sw_1', state = STATES.APPLIED_NEW, utfortDagarSedan = 120,
  savingPerYear = 12_000, currentSupplier = 'Telia', history = null,
} = {}) {
  return {
    id,
    state,
    // `updatedAt` rör sig med VARJE senare händelse — den får aldrig datera karensen.
    updatedAt: new Date().toISOString(),
    history: history ?? [
      { to: STATES.BANKID_SIGNED, timestamp: dagarSedan(utfortDagarSedan + 5).toISOString() },
      { to: STATES.APPLIED_NEW, timestamp: dagarSedan(utfortDagarSedan).toISOString() },
    ],
    context: {
      customer: { email: 'kund@exempel.se' },
      recommendation: { currentSupplier, suggestedSupplier: 'Tele2', savingPerYear },
    },
  };
}

describe('AK · Datumet läses ur historiken, aldrig ur updatedAt', () => {
  test('AK-01 · en post som rörts i dag men bytte för 120 dagar sedan ÄR fakturerbar', () => {
    // Hade körningen läst `updatedAt` hade karensen förskjutits framåt varje gång posten rördes —
    // ett tal som ser rätt ut och mäter fel sak (enhetsfelets familj, 21 aug). Arvodet hade då
    // aldrig blivit moget för en post som fortsätter få händelser.
    const k = arvodeskoen([post({ utfortDagarSedan: 120 })]);
    assert.equal(k.fakturerbara.length, 1);
    assert.equal(k.fakturerbara[0].belopp, Math.round(12_000 * ARVO_FEE_RATE));
    assert.equal(k.fakturerbara[0].arbeteUtfortAt, dagarSedan(120).toISOString().slice(0, 10));
  });

  test('AK-02 · dag 89 hålls med kvarvarande dagar, dag 90 släpps', () => {
    const tidig = arvodeskoen([post({ utfortDagarSedan: KARENS_DAGAR - 1 })]);
    assert.equal(tidig.fakturerbara.length, 0);
    assert.equal(tidig.hallna.length, 1, 'en hållen post måste synas — tystnad är inte ett svar');
    assert.match(tidig.hallna[0].skal, /karens_loper/);
    assert.equal(tidig.hallna[0].dagarKvar, 1);
    assert.equal(arvodeskoen([post({ utfortDagarSedan: KARENS_DAGAR })]).fakturerbara.length, 1);
  });

  test('AK-03 · utan applied_new-övergång finns inget utförandedatum att räkna från', () => {
    // Fail-closed på PÅSTÅENDET: hellre en hållen post med namngivet skäl än ett datum vi hittar på.
    const utanHistorik = arvodeskoen([post({ history: [] })]);
    assert.equal(utanHistorik.fakturerbara.length, 0);
    assert.match(utanHistorik.hallna[0].skal, /utforandedatum_saknas/);
    assert.equal(utanHistorik.hallna[0].arbeteUtfortAt, null);

    assert.equal(arbeteUtfortDatum({ history: [{ to: 'applied_new' }] }), null, 'utan timestamp: null');
    assert.equal(arbeteUtfortDatum(null), null);
    assert.equal(arbeteUtfortDatum({ history: 'trasig' }), null);
  });

  test('AK-04 · nådde posten applied_new två gånger är det den FÖRSTA som daterar karensen', () => {
    // Karensen börjar när arbetet gjordes. Att läsa den sista hade förlängt karensen godtyckligt.
    const d = arbeteUtfortDatum({
      history: [
        { to: STATES.APPLIED_NEW, timestamp: dagarSedan(200).toISOString() },
        { to: STATES.APPLIED_NEW, timestamp: dagarSedan(10).toISOString() },
      ],
    });
    assert.equal(d.toISOString().slice(0, 10), dagarSedan(200).toISOString().slice(0, 10));
  });
});

describe('AK · Idempotens — cronen kör dagligen, arvodet fyrar en gång', () => {
  test('AK-05 · hanterat arvode köas aldrig om — men bokförs', () => {
    const k = arvodeskoen([
      post({ id: 'a', state: STATES.SUCCESS_FEE_DUE }),
      post({ id: 'b', state: STATES.COMPLETED }),
    ]);
    assert.equal(k.fakturerbara.length, 0, 'ett fakturerat arvode får aldrig köas igen');
    assert.equal(k.hallna.length, 0);
    assert.deepEqual(k.hanterade.map((r) => r.id), ['a', 'b'],
      'bokföringsplikten: en tyst överhoppad post är omöjlig att skilja från en tappad');
  });

  test('AK-06 · MOTPROVET — `live` är utfört arbete men ohanterat arvode, och SKA köas', () => {
    // En spärr som fäller allt är lika värdelös som ingen spärr. `live` betyder att bytet landat,
    // inte att arvodet är taget.
    const k = arvodeskoen([post({ state: STATES.LIVE })]);
    assert.equal(k.fakturerbara.length, 1);
    assert.equal(k.hanterade.length, 0);
  });

  test('AK-07 · tillståndsnamnen är statmaskinens, inte kopior som kan glida isär', () => {
    const giltiga = new Set(Object.values(STATES));
    for (const s of REDAN_HANTERAD) assert.ok(giltiga.has(s), `okänt tillstånd i REDAN_HANTERAD: ${s}`);
    for (const s of ARBETE_UTFORT) assert.ok(giltiga.has(s), `okänt tillstånd i ARBETE_UTFORT: ${s}`);
    assert.equal(STATES.APPLIED_NEW, 'applied_new', 'byter statmaskinen namn ska denna svit falla');
    for (const s of REDAN_HANTERAD) {
      assert.ok(ARBETE_UTFORT.includes(s),
        'ett hanterat arvode måste per definition ha varit ett utfört arbete');
    }
  });
});

describe('AK · En trasig post river aldrig körningen', () => {
  test('AK-08 · posten bokförs som trasig och resten betas av', () => {
    // 24 aug: ett ReferenceError i ETT larmmail rev hela körningen för varje kund i varje grupp.
    const bomb = { id: 'trasig' };
    Object.defineProperty(bomb, 'state', { get() { throw new Error('korrupt liggarpost'); } });

    const k = arvodeskoen([bomb, post({ id: 'frisk' })]);
    assert.equal(k.fakturerbara.length, 1, 'den friska posten ska betas av trots grannens fel');
    assert.equal(k.fakturerbara[0].id, 'frisk');
    assert.equal(k.trasiga.length, 1);
    assert.equal(k.trasiga[0].fel, 'korrupt liggarpost', 'felet namnges, aldrig sväljs');
  });

  test('AK-09 · tom eller saknad liggare ger en tom kö, aldrig ett kast', () => {
    for (const indata of [[], null, undefined]) {
      const k = arvodeskoen(indata);
      assert.equal(k.fakturerbara.length, 0);
      assert.equal(k.summa, 0);
      assert.equal(k.karensDagar, KARENS_DAGAR, 'ytan läser karensen härifrån, hårdkodar den aldrig');
    }
  });
});

describe('AK · Liggaren: OKÄND är inte samma sak som TOM', () => {
  const DB_NYCKLAR = ['DATABASE_URL', 'POSTGRES_URL', 'POSTGRES_URL_DATABASE_URL', 'POSTGRES_PRISMA_URL'];
  const utanDb = async (fn) => {
    const spar = {};
    for (const k of DB_NYCKLAR) { spar[k] = process.env[k]; delete process.env[k]; }
    try { return await fn(); }
    finally { for (const k of DB_NYCKLAR) if (spar[k] !== undefined) process.env[k] = spar[k]; }
  };

  test('AK-11 · utan databas svarar liggaren null (okänd), aldrig en tom lista', async () => {
    // `claimBatch` bröt exakt den här regeln 24 aug: `[]` på ett DB-fel lästes som «kön är tom»,
    // och drainen raderade kundens enda signal om att arbete fanns. En körning som inte kan fråga
    // får aldrig rapportera ett tal.
    const { hamtaLiggare } = await import('../lib/switchliggare.js');
    assert.equal(await utanDb(() => hamtaLiggare()), null);
  });

  test('AK-12 · cronen svarar 503 på okänd liggare — aldrig «0 kr att fakturera»', async () => {
    const { default: handler } = await import('../api/cron/arvodeskorning.mjs');
    const svar = { kod: null, kropp: null };
    const res = {
      status(k) { svar.kod = k; return this; },
      json(b) { svar.kropp = b; return this; },
    };
    await utanDb(() => handler({ headers: {} }, res));
    assert.equal(svar.kod, 503);
    assert.equal(svar.kropp.skal, 'liggare_okand');
    assert.equal(svar.kropp.summa, undefined, 'ett okänt tillstånd får aldrig bära ett belopp');
    assert.equal(svar.kropp.liggarePoster, undefined, 'och aldrig ett antal');
  });
});

describe('AK · Motbevisspärren når fram genom körningen', () => {
  test('AK-10 · gamla leverantören fakturerar fortfarande → posten hålls, summan följer med', () => {
    const fakturorFor = (p) => (p.id === 'blodande'
      ? [{ supplier: 'Telia Sverige AB', date: dagarSedan(20) }]
      : []);
    const k = arvodeskoen(
      [post({ id: 'blodande' }), post({ id: 'ren', savingPerYear: 50_000 })],
      { fakturorFor },
    );
    assert.deepEqual(k.fakturerbara.map((r) => r.id), ['ren']);
    assert.match(k.hallna.find((r) => r.id === 'blodande').skal, /gammal_leverantor_fakturerar/);
    assert.equal(k.summa, Math.round(50_000 * ARVO_FEE_RATE),
      'summan räknar bara det fakturerbara — en hållen post får aldrig synas som intäkt');
  });
});
