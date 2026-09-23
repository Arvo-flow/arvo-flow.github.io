// tests/paminnelse.mjs — FAKTURAKLOCKANS PÅMINNELSER (PM). Bakgrund i lib/paminnelse.js.
//
// FÅNGAR: en mall som läser ett fält raden inte bär (NaN-felet) · varsel mot slutdatum när sista dagen
//   är känd · ett kort som lovar ett datum cronen inte skickar på · ett okänt som lovar tid · en tyst
//   besparing i utfallsenkäten · cronen som räknar själv.
// BLIND: att Resend levererar, och att cronen faktiskt körs 08:00 — det mäts i produktion, inte här.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { avtalsklocka, contractClockFinding } from '../lib/contract-clock.js';
import { planeradePaminnelser, paminnelseBeslut, underlagFranRad, paminnelseMejl, OKAND_VARSEL_DAGAR } from '../lib/paminnelse.js';
import { strippaStrangar } from '../lib/kalltextlexer.js';

const dag = (iso) => new Date(`${iso}T08:00:00Z`);
const plus = (iso, n) => new Date(dag(iso).getTime() + n * 864e5).toISOString().slice(0, 10);
const text = (h) => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const rad = (extra = {}) => ({ id: 7, supplier: 'Telia', normalized_supplier: 'Telia', user_email: 'a@b.se',
  contract_end_date: '2027-01-01', uppsagning_json: { uppsagningstidMan: 3 }, net_saving: 6000,
  created_at: '2026-06-01T10:00:00Z', analyserad_at: '2026-09-20T10:00:00Z', deadline_reminder_json: null, ...extra });

describe('PM · påminnelserna följer klockan', () => {
  test('PM-01 · SQL-raden (snake_case) ger ett mejl utan NaN eller undefined, i varje läge som mejlar', () => {
    for (const [namn, r, today] of [
      ['varsel30', rad(), dag('2026-09-23')],
      ['varsel7', rad(), dag('2026-09-25')],
      ['okand', rad({ uppsagning_json: null }), dag('2026-09-23')],
    ]) {
      const u = underlagFranRad(r, { today });
      const { typ } = paminnelseBeslut({ klocka: u.klocka, today });
      assert.equal(typ, namn, `${namn}: beslutet`);
      const { subject, html } = paminnelseMejl({ typ, underlag: u });
      assert.doesNotMatch(subject + text(html), /NaN|undefined|null/, `${namn}: ett okänt läckte in i texten`);
    }
    assert.equal(underlagFranRad(rad({ contract_end_date: null })), null, 'utan slutdatum finns inget mejl att skriva');
  });

  test('PM-02 · varslet räknas mot SISTA UPPSÄGNINGSDAG, inte mot slutdatum', () => {
    const u = underlagFranRad(rad(), { today: dag('2026-09-23') });
    const { html, subject } = paminnelseMejl({ typ: 'varsel30', underlag: u });
    assert.match(text(html), /sista dagen att säga upp är 1 oktober 2026/);
    assert.match(subject, /8 dagar till sista uppsägningsdag/);
    // MOTPROV: samma avtal 100 dagar före slutdatum — det gamla schemat (60/30 före slut) hade tigit.
    assert.equal(u.klocka.dagarTillSlut, 100);
  });

  test('PM-03 · okänd uppsägningstid: ETT mejl inom tröskeln, aldrig två, aldrig «ni har tid»', () => {
    const k = (today) => avtalsklocka({ servicePeriodEnd: '2027-01-01', today });
    const fore = plus('2027-01-01', -(OKAND_VARSEL_DAGAR + 1));
    assert.equal(paminnelseBeslut({ klocka: k(dag(fore)), today: dag(fore) }).typ, null);
    const b1 = paminnelseBeslut({ klocka: k(dag('2026-09-23')), today: dag('2026-09-23') });
    assert.equal(b1.typ, 'okand');
    assert.equal(paminnelseBeslut({ klocka: k(dag('2026-09-24')), marker: b1.marker, today: dag('2026-09-24') }).typ, null, 'två mejl');
    const u = underlagFranRad(rad({ uppsagning_json: null }), { today: dag('2026-09-23') });
    assert.doesNotMatch(text(paminnelseMejl({ typ: 'okand', underlag: u }).html), /god tid|ni har tid/i);
  });

  test('PM-04 · stängt fönster eller fastpris: inget mejl och inget utlovat datum', () => {
    const stangt = avtalsklocka({ servicePeriodEnd: '2026-10-10', uppsagning: { uppsagningstidDagar: 30 }, today: dag('2026-09-23') });
    assert.equal(paminnelseBeslut({ klocka: stangt, today: dag('2026-09-23') }).typ, null);
    assert.deepEqual(planeradePaminnelser(stangt, { harEpost: true, today: dag('2026-09-23') }).datum, []);
  });

  test('PM-05 · datumen kortet lovar är EXAKT de dagar cronen skickar på (simulerat dag för dag)', () => {
    for (const [slut, u] of [['2027-01-01', { uppsagningstidMan: 3 }], ['2027-03-15', { uppsagningstidDagar: 45 }], ['2027-01-01', null]]) {
      const start = '2026-06-01';
      const lovat = planeradePaminnelser(avtalsklocka({ servicePeriodEnd: slut, uppsagning: u, today: dag(start) }),
        { harEpost: true, today: dag(start) }).datum;
      assert.ok(lovat.length >= 1, `${slut}: inget lovat — simuleringen prövar ingenting`);
      let marker = null; const skickat = [];
      for (let i = 0; i < 400; i++) {
        const d = plus(start, i);
        const b = paminnelseBeslut({ klocka: avtalsklocka({ servicePeriodEnd: slut, uppsagning: u, today: dag(d) }), marker, today: dag(d) });
        marker = b.marker;
        if (b.typ) skickat.push(d);
      }
      assert.deepEqual(skickat, lovat, `${slut} ${JSON.stringify(u)}: kortet lovade ${lovat}, cronen skickade ${skickat}`);
    }
  });

  test('PM-06 · utan e-postadress lovas inga mejl — och kortet säger det', () => {
    const k = avtalsklocka({ servicePeriodEnd: '2027-01-01', uppsagning: { uppsagningstidMan: 3 }, today: dag('2026-09-01') });
    const p = planeradePaminnelser(k, { harEpost: false, today: dag('2026-09-01') });
    assert.deepEqual(p, { kanal: null, datum: [] });
    const f = contractClockFinding({ servicePeriodEnd: '2027-01-01', uppsagning: { uppsagningstidMan: 3 }, paminnelse: p, today: dag('2026-09-01') });
    assert.match(f.text, /ingen påminnelse kan skickas/);
    const med = contractClockFinding({ servicePeriodEnd: '2027-01-01', uppsagning: { uppsagningstidMan: 3 },
      paminnelse: planeradePaminnelser(k, { harEpost: true, today: dag('2026-09-01') }), today: dag('2026-09-01') });
    assert.match(med.text, /Vi mejlar er inom ett dygn och 24 september 2026\./);
  });

  test('PM-07 · en fryst besparing sägs med sitt analysdatum, aldrig i presens', () => {
    const u = underlagFranRad(rad(), { today: dag('2026-09-23') });
    assert.match(text(paminnelseMejl({ typ: 'varsel30', underlag: u }).html), /Vid analysen den 20 september 2026 visade Arvo en möjlig nettobesparing på 6\s000 kr\/år/);
    const utan = underlagFranRad(rad({ net_saving: null }), { today: dag('2026-09-23') });
    assert.doesNotMatch(text(paminnelseMejl({ typ: 'varsel30', underlag: utan }).html), /nettobesparing/);
  });

  test('PM-08 · cronen läser klockan och mappar raden uttryckligen', () => {
    const cron = strippaStrangar(readFileSync(new URL('../api/cron/send-reminders.mjs', import.meta.url), 'utf8'));
    assert.match(cron, /underlagFranRad\(row\)/);
    assert.match(cron, /paminnelseBeslut\(/);
    assert.doesNotMatch(cron, /reminder60Html|reminder30Html|daysUntil\(/, 'de gamla slutdatumsmallarna lever kvar');
    assert.match(cron, /outcomeEmailHtml\(\{ supplier: row\.supplier, netSaving: Number\(row\.net_saving\)/);
  });
});
