// tests/bevakat-kort.mjs — "BEVAKAT — INTE PRISSATT": rätt skäl, noll siffror.
//
// BAKGRUNDEN (skarpt rum 2026-08-14): en kund läste, om sina Slack- och Salesforce-fakturor:
//   "Leverantörens publika listpris finns bara i radsumma 3 991 kr ≠ fakturatotal 382 kr
//    (avvikelse 3 609 kr). Att räkna om till en svensk besparing via dagskurs vore en gissning…"
//
// Två fel i en mening, båda strukturella:
//   1. Grenen fyrade på LEVERANTÖRSNAMNET (INTL_SAAS matchar Slack/Salesforce) och plockade sedan
//      split(':')[1] ur ett triage_reason som tillhörde balanskravets radsummekontroll. Vi angav
//      alltså FEL SKÄL för vår tystnad — det verkliga var att fakturans egna tal inte gick ihop.
//   2. Interna mätvärden hamnade i kundytan. Funktionens egen kommentar lovar "NOLL siffror
//      (sifferrevisorns tystnad orörd)" — och sifferrevisorn granskar recommend(), inte den här
//      vägen. Invarianten var bruten utan att någon vakt märkte det.
//
// Disciplinen är hela produkten här: vi säger "vi prissätter inte" och måste kunna säga VARFÖR,
// sant och utan tal. En tystnad med fel motivering är sämre än ingen motivering.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: att ett bevakat kort bär ett belopp/tal, och att valutakortet väljs på annan grund
//           än ett valutaskäl — prövat genom att faktiskt ANROPA watchedCard med de rader som
//           fällde oss i produktion.
//   BLIND:  vakten prövar de reason-koder vi känner till. En helt ny kod som ingen tänkt på får
//           fallback-kortet, och att DEN texten är rätt för det nya fallet kan ingen svit veta.
//           Den skyddar mot fel skäl och mot siffror, inte mot ett skäl vi aldrig föreställt oss.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { watchedCard } from '../api/invoice-history.mjs';

// Alla textfält ett kort kan visa för kunden.
const text = (k) => [k.kind, k.headline, k.detail, k.action].filter(Boolean).join(' | ');
// Siffror som är BELOPP eller mätvärden. Enstaka ord som "36 marknadskällor" hör inte hemma här
// heller — den här ytan ska vara helt talfri, så vi förbjuder varje siffergrupp.
const SIFFRA = /\d/;

describe('BEVAKAT-KORT · rätt skäl, noll siffror', () => {
  test('BK-01 · balansfelet ger balans-skäl, inte valuta (produktionsfallet)', () => {
    // Exakt raden som nådde kunden: internationell leverantör MEN ett balansskäl.
    const k = watchedCard({
      normalized_supplier: 'Slack Technologies',
      route: 'review_queue',
      triage_reason: 'radsumma 3 991 kr ≠ fakturatotal 382 kr (avvikelse 3 609 kr)',
    });
    assert.doesNotMatch(text(k), /valuta|dagskurs/i,
      'ett balansfel får aldrig förklaras som ett valutaproblem');
    assert.match(text(k), /går inte ihop|stämmer inte/i,
      'kunden ska få veta det VERKLIGA skälet: fakturans tal möts inte');
  });

  test('BK-02 · inget bevakat kort bär en siffra', () => {
    const fall = [
      { normalized_supplier: 'Slack Technologies', triage_reason: 'radsumma 3 991 kr ≠ fakturatotal 382 kr (avvikelse 3 609 kr)' },
      { normalized_supplier: 'Salesforce.com',     triage_reason: 'foreign_currency:USD' },
      { normalized_supplier: 'Binero Group AB',    triage_reason: 'no_benchmark' },
      { normalized_supplier: 'Fortnox AB',         triage_reason: 'review_queue' },
      { normalized_supplier: 'Ellevio AB',         triage_reason: 'natavgift' },
      { normalized_supplier: 'Okänd AB',           triage_reason: 'credit_note' },
      { normalized_supplier: 'Okänd AB',           triage_reason: 'implausible_amounts' },
      { normalized_supplier: 'Okänd AB',           triage_reason: 'sanity_check_failed' },
      // Den farligaste formen: ett skäl som SJÄLVT bär tal och kan splittras in i copyn.
      { normalized_supplier: 'Zoom',               triage_reason: 'foreign_currency:1 234,56 kr' },
    ];
    const brott = [];
    for (const f of fall) {
      const t = text(watchedCard({ route: 'review_queue', ...f }));
      if (SIFFRA.test(t)) brott.push(`${f.triage_reason} → "${t}"`);
    }
    assert.deepEqual(brott, [],
      `Bevakat-kort bär siffror — ytan lovar noll tal och sifferrevisorn granskar inte den här vägen:\n  ${brott.join('\n  ')}`);
  });

  test('BK-03 · valutakoden måste SE UT som en valutakod, annars utelämnas den', () => {
    const bra = watchedCard({ normalized_supplier: 'Zoom', route: 'review_queue', triage_reason: 'foreign_currency:usd' });
    assert.match(text(bra), /\bUSD\b/, 'en giltig kod ska visas, versaliserad');

    const skrap = watchedCard({ normalized_supplier: 'Zoom', route: 'review_queue', triage_reason: 'foreign_currency:radsumma 3 991 kr' });
    assert.doesNotMatch(text(skrap), /radsumma/, 'en felsträng är inte en valuta och får inte klistras in');
    assert.match(text(skrap), /utländsk valuta/, 'kortet står kvar, men utan påhittad kod');
  });

  test('BK-04 · namnet ensamt räcker inte för att påstå valutaproblem', () => {
    // En internationell leverantör med ett skäl som inte handlar om valuta ska INTE få
    // valutakortet. Namnet får välja etikett när skälet redan är valuta — aldrig annars.
    const k = watchedCard({ normalized_supplier: 'Atlassian', route: 'review_queue', triage_reason: 'no_benchmark' });
    assert.doesNotMatch(text(k), /dagskurs/i,
      'INTL_SAAS-namnet får inte ensamt avgöra vad vi påstår om fakturan');
  });

  test('BK-06 · en teknisk kod förklaras aldrig som ett marknadsproblem (Fortnox-fallet)', () => {
    // Skarpt läge 2026-08-15: Fortnox-fakturan bar `fingerprint_mismatch` — VÅR leverantörs-
    // kontroll sa emot VÅR kategorisering. Kunden fick läsa "utan verifierat golv att prissätta
    // mot". Fakturan blev inte klassad utan FELklassad, golvet finns (loneadmin = real-public),
    // och samma PDF prissattes auto från en annan adress. Tre påståenden, noll sanna.
    const k = watchedCard({ normalized_supplier: 'Fortnox AB', route: 'review_queue',
      triage_reason: 'fingerprint_mismatch' });
    assert.doesNotMatch(text(k), /verifierat golv|marknadsreferens|prisnivå/i,
      'ett fel i VÅRA kontroller får aldrig förklaras som en lucka i marknadsdatan');
    assert.match(text(k), /oense|emot varandra|överens/i,
      'kunden ska få veta det sanna skälet — att vi stoppade när vi inte var överens med oss själva');
  });

  test('BK-07 · reservkortet påstår INGET skäl alls (blindfläcken, stängd)', () => {
    // Vaktens deklarerade blindfläck blev verklig: en kod ingen tänkt på fick fallback-kortets
    // substantiella förklaring och den var fel. Nu får reservkortet bara säga att vi stoppade.
    for (const kod of ['nagot_helt_nytt', 'schema_drift_v9', 'okand_kod_2027']) {
      const t = text(watchedCard({ normalized_supplier: 'Okänt AB', route: 'review_queue', triage_reason: kod }));
      assert.doesNotMatch(t, /verifierat golv|marknadsreferens|utländsk valuta|reglerad|splittrad marknad|kreditering/i,
        `reservkortet gissar ett skäl för '${kod}' — det är exakt formen som gav en osanning i kundyta`);
      assert.match(t, /tekniskt/i, 'det ärliga svaret för en okänd kod är att skälet är tekniskt');
      assert.match(t, /människa/i, 'och att en människa tar vid');
    }
  });

  test('BK-05 · nätavgiften bär sitt eget, sanna skäl', () => {
    const k = watchedCard({ normalized_supplier: 'Ellevio AB', route: 'unsupported', triage_reason: 'natavgift' });
    assert.match(text(k), /reglerad|monopol|nät/i,
      'Ellevio-fallet: kunden ska förstå att nätavgiften inte går att byta — det är vårt vassaste tysta beslut');
  });
});
