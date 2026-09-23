// tests/contract-clock.mjs — AVTALSKLOCKAN (AK). Bakgrund i lib/contract-clock.js.
//
// FÅNGAR: kalendermånader räknade som dygn · okänd uppsägningstid behandlad som känd · ett öppet
//   fönster kallat passerat eller skickat till bevakning · det gamla fältnamnet · ett Date-objekt ur
//   Postgres som tappar klockan · lagring som tappar uppsägningstiden · en yta som räknar egna datum.
// BLIND: juridiska konventioner för «senast» (se modulhuvudet) och en felläst slutdag.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { avtalsklocka, avtalsRutt, contractClockFinding, lasUppsagning, AVTALSLAGEN } from '../lib/contract-clock.js';
import { storeAnalysis } from '../lib/invoice-store.js';
import { strippaStrangar } from '../lib/kalltextlexer.js';

const IDAG = new Date('2026-09-23T10:00:00Z');
const las = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const MAN3 = { uppsagningstidMan: 3 };

describe('AK · avtalsklockan', () => {
  test('AK-01 · ingen klocka utan framtida slutdatum; Date-objekt och ISO ger samma klocka', () => {
    for (const s of [null, undefined, 'inte-ett-datum', '2026-01-01', '2026-09-23']) {
      assert.equal(avtalsklocka({ servicePeriodEnd: s, today: IDAG }).lage, 'ingen_klocka', String(s));
      assert.equal(contractClockFinding({ servicePeriodEnd: s, today: IDAG }), null, String(s));
    }
    const iso = avtalsklocka({ servicePeriodEnd: '2027-01-01', uppsagning: MAN3, today: IDAG });
    const dat = avtalsklocka({ servicePeriodEnd: new Date('2027-01-01T00:00:00Z'), uppsagning: MAN3, today: IDAG });
    assert.deepEqual(dat, iso, 'Postgres DATE som Date-objekt tappade förr klockan');
  });

  test('AK-02 · månader räknas i KALENDERN, aldrig som 30 dygn', () => {
    const k = avtalsklocka({ servicePeriodEnd: '2027-01-01', uppsagning: MAN3, today: IDAG });
    assert.equal(k.sistaDag, '2026-10-01', '1 januari − 3 månader är 1 oktober');
    // MOTPROV: samma avtal i dygn ger det gamla, för sena datumet — instrumentet kan svara annorlunda.
    const dygn = avtalsklocka({ servicePeriodEnd: '2027-01-01', uppsagning: { uppsagningstidDagar: 90 }, today: IDAG });
    assert.equal(dygn.sistaDag, '2026-10-03');
    assert.equal(avtalsklocka({ servicePeriodEnd: '2027-03-31', uppsagning: { uppsagningstidMan: 1 }, today: IDAG }).sistaDag,
      '2027-02-28', 'dagen klampas till månadens sista');
  });

  test('AK-03 · varje läge nås, och bara de deklarerade', () => {
    const lage = (slut, u, extra = {}) => avtalsklocka({ servicePeriodEnd: slut, uppsagning: u, today: IDAG, ...extra }).lage;
    const sett = new Set([
      lage(null, null),
      lage('2027-01-01', MAN3),                                   // sista dag 1 okt → öppet
      lage('2026-10-23', { uppsagningstidDagar: 30 }),            // sista dag i dag
      lage('2026-10-10', { uppsagningstidDagar: 30 }),            // sista dag passerad
      lage('2027-01-01', null),                                   // okänd
      lage('2027-01-01', null, { fastpris: true }),               // fastpris → stängt
    ]);
    assert.deepEqual([...sett].sort(), [...AVTALSLAGEN].sort());
    assert.equal(lage('2026-10-23', { uppsagningstidDagar: 30 }), 'sista_dag_idag');
  });

  test('AK-04 · okänd uppsägningstid lovar ingenting — den säger att den är okänd', () => {
    const f = contractClockFinding({ servicePeriodEnd: '2027-01-01', supplier: 'Telia', today: IDAG });
    assert.equal(f.lage, 'uppsagning_okand');
    assert.equal(f.actByDate, null);
    assert.match(f.text, /står inte på fakturan/);
    assert.doesNotMatch(f.text, /i god tid|har redan passerat/i, 'okänt får aldrig låna ett löfte eller en dom');
  });

  test('AK-05 · uppsägningen läses som tryckt; tvetydigt och okänt blir null', () => {
    assert.deepEqual(lasUppsagning({ varde: 3, enhet: 'manader' }), { uppsagningstidMan: 3, uppsagningstidDagar: null });
    assert.deepEqual(lasUppsagning({ varde: 2, enhet: 'veckor' }), { uppsagningstidMan: null, uppsagningstidDagar: 14 });
    assert.deepEqual(lasUppsagning({ varde: 60, enhet: 'dagar' }), { uppsagningstidMan: null, uppsagningstidDagar: 60 });
    for (const u of [null, {}, { varde: 3 }, { varde: 3, enhet: 'år' }, { varde: 0, enhet: 'dagar' }, { varde: 2.5, enhet: 'manader' },
      { uppsagningstidMan: 3, uppsagningstidDagar: 90 }, { varde: 40, enhet: 'manader' }]) {
      assert.equal(lasUppsagning(u), null, JSON.stringify(u));
    }
  });

  test('AK-06 · ett ÖPPET fönster prissätts; bara ett stängt eller långt okänt bevakas', () => {
    const r = (slut, u) => avtalsRutt(avtalsklocka({ servicePeriodEnd: slut, uppsagning: u, today: IDAG }));
    assert.equal(r('2027-07-20', { uppsagningstidDagar: 30 }), false, 'sista dag om 270 dagar — kunden kan agera');
    assert.equal(r('2026-10-10', { uppsagningstidDagar: 30 }), true, 'fönstret stängt');
    assert.equal(r('2027-07-20', null), true, 'okänd uppsägning, > 180 dagar');
    assert.equal(r('2026-12-01', null), false, 'okänd uppsägning, < 180 dagar — prissätts');
    // Rutten läser klockan — den gamla lås-deadlinen (startdatum − dygn) får inte finnas kvar.
    const api = strippaStrangar(las('api/test-invoice.mjs'));
    assert.match(api, /avtalsRutt\(_klocka\)/);
    assert.doesNotMatch(api, /_lockDeadline|_isPastLockDeadline/);
  });

  test('AK-07 · kortet säger sista dagen i ett öppet fönster, och «passerat» bara när det är sant', () => {
    const oppet = contractClockFinding({ servicePeriodEnd: '2027-07-20', uppsagning: { uppsagningstidDagar: 30 }, supplier: 'Tele2', today: IDAG });
    assert.match(oppet.title, /Sista uppsägningsdag 20 juni 2027/);
    assert.equal(oppet.daysToAct, 270);
    assert.doesNotMatch(oppet.text, /passerad|passerat|var sista dagen/);
    const stangt = contractClockFinding({ servicePeriodEnd: '2026-10-10', uppsagning: { uppsagningstidDagar: 30 }, supplier: 'Tele2', today: IDAG });
    assert.match(stangt.text, /var sista dagen att säga upp 10 september 2026/);
  });

  test('AK-08 · det gamla fältnamnet smäller i stället för att tyst ge «okänd»', () => {
    assert.throws(() => avtalsklocka({ servicePeriodEnd: '2027-01-01', cancellationNoticeDays: 90 }), /borttaget/);
    assert.throws(() => contractClockFinding({ servicePeriodEnd: '2027-01-01', cancellationNoticeDays: 90 }), /borttaget/);
  });

  test('AK-09 · uppsägningstiden lagras — och en tom läsning raderar den inte', async () => {
    const satser = [];
    const db = async (strings, ...vals) => { const sql = strings.join('?').replace(/\s+/g, ' '); satser.push({ sql, vals });
      return /RETURNING id/.test(sql) ? [{ id: 'r1' }] : []; };
    db.query = async () => [];
    await storeAnalysis({ fingerprint: 'fp', pdfHash: 'ph', route: 'auto', db, recommendation: {}, categorized: { category: 'mobil' },
      extracted: { supplier: 'Telia', servicePeriodEnd: '2027-01-01', uppsagning: MAN3 } });
    const u = satser.find((x) => /SET uppsagning_json/.test(x.sql));
    assert.ok(u, 'uppsägningstiden skrivs inte');
    assert.deepEqual(JSON.parse(u.vals[0]), MAN3);
    satser.length = 0;
    await storeAnalysis({ fingerprint: 'fp', pdfHash: 'ph', route: 'auto', db, recommendation: {}, categorized: { category: 'mobil' },
      extracted: { supplier: 'Telia', servicePeriodEnd: '2027-01-01', uppsagning: null } });
    assert.ok(!satser.some((x) => /SET uppsagning_json/.test(x.sql)), 'en läsning utan uppsägningstid raderade den lagrade');
    const mig = las('scripts/migrate.mjs');
    assert.match(mig, /ADD COLUMN IF NOT EXISTS uppsagning_json JSONB/);
    assert.match(mig, /ADD COLUMN IF NOT EXISTS deadline_reminder_json JSONB/);
    // Rummet ger klockan uppsägningstiden och släpper aldrig adressen till klienten.
    const hist = las('api/invoice-history.mjs');
    assert.match(hist, /uppsagning:\s+a\.uppsagning_json/);
    assert.match(hist, /user_email: undefined/);
  });

  test('AK-10 · en nyare läsning av slutdatumet får ersätta den första', async () => {
    const satser = [];
    const db = async (strings, ...vals) => { const sql = strings.join('?').replace(/\s+/g, ' '); satser.push({ sql, vals });
      return /RETURNING id/.test(sql) ? [{ id: 'r1' }] : []; };
    db.query = async () => [];
    await storeAnalysis({ fingerprint: 'fp', pdfHash: 'ph', route: 'auto', db, recommendation: {}, categorized: { category: 'mobil' },
      extracted: { supplier: 'Telia', servicePeriodEnd: '2027-01-01' } });
    const s = satser.find((x) => /SET contract_end_date/.test(x.sql));
    assert.ok(s);
    assert.doesNotMatch(s.sql, /contract_end_date IS NULL/, 'den första läsningen fick vinna för alltid');
  });

  test('AK-11 · extraktionen läser värde och enhet — modellen räknar aldrig om månader till dygn', () => {
    const ex = las('agents/test-invoice/extract.js');
    assert.match(ex, /cancellation_notice_value/);
    assert.match(ex, /cancellation_notice_unit/);
    assert.doesNotMatch(strippaStrangar(ex), /cancellation_notice_days/, 'det gamla dygnsfältet lever kvar i koden');
    assert.match(ex, /uppsagning:\s+lasUppsagning\(\{ varde: raw\.cancellation_notice_value, enhet: raw\.cancellation_notice_unit \}\)/);
  });

  test('AK-12 · fakturavyn räknar inga egna avtalsdatum', () => {
    const vy = strippaStrangar(las('src/pages/TestaFaktura/index.js'));
    for (const f of ['monitoringDate', 'monitoringDatePast', 'daysUntilEnd', 'cancellationNoticeDays']) {
      assert.doesNotMatch(vy, new RegExp(`\\b${f}\\b`), `${f} räknas i vyn`);
    }
    assert.match(vy, /klocka\?\.title/);
  });
});
