// tests/switcharvode.mjs — SA-01..08: arvodet utgår på UTFÖRT ARBETE + karens, aldrig på
// förberedelse, och aldrig mot ett bevis som säger emot.
//
// GRUNDARBESLUT 2026-08-28. Ersätter mekaniken från 2026-06-21 (liggar-deltan via Fortnox), som
// aldrig byggdes — och det som fanns i stället var värre: `arvo_outcomes.source DEFAULT 'customer'`
// plus en 60-dagarsenkät. Vi bad kunden självrapportera talet vi fakturerar dem på.
//
// Den nya triggern är vår EGEN liggare: `APPLIED_NEW` betyder att fullmakten är signerad med
// BankID, gamla leverantören uppsagd och ansökan inlämnad hos den nya. Vi frågar inte om bytet
// skedde — vi vet, för vi utförde det.
//
// FÅNGAR: arvode före utfört arbete, arvode före karens, arvode på en besparing vi inte kunde
//   räkna fram, och arvode mot kundens egna fakturor som visar att bytet inte genomfördes.
// BLIND: modulen vet att VI gjorde bytet, aldrig att kunden fick tjänsten levererad. Och den
//   läser bara fakturor vi FÅTT — en kund som slutat vidarebefordra är osynlig, vilket är ett
//   medvetet val: tystnad är inget motbevis.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { switchArvode, KARENS_DAGAR, ARBETE_UTFORT, ARVODESSATS } from '../lib/switcharvode.js';
import { ARVO_FEE_RATE } from '../lib/fee.js';

const dagarSedan = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);
const BAS = { tillstand: 'applied_new', arsbesparing: 12_000, gammalLeverantor: 'Telia' };

describe('SA · Arvodet utgår på utfört arbete, aldrig på förberedelse', () => {
  test('SA-01 · förberedelse fakturerar vi ALDRIG', () => {
    // En signerad fullmakt är inte ett utfört byte. Bibelns Switch-doktrin: arvodet utlöses av
    // verkställighet, aldrig av förberedelse.
    for (const t of ['proposed', 'awaiting_approval', 'fullmakt_prepared', 'bankid_pending', 'bankid_signed', 'terminated_old']) {
      const r = switchArvode({ ...BAS, tillstand: t, arbeteUtfortAt: dagarSedan(200) });
      assert.equal(r.fakturerbar, false, `${t} får aldrig vara fakturerbart`);
      assert.match(r.skal, /arbete_ej_utfort/);
    }
  });

  test('SA-02 · terminala FEL-tillstånd fakturerar vi aldrig', () => {
    for (const t of ['customer_cancelled', 'signing_expired', 'supplier_rejected', 'failed']) {
      assert.equal(switchArvode({ ...BAS, tillstand: t, arbeteUtfortAt: dagarSedan(200) }).fakturerbar, false, t);
    }
  });

  test('SA-03 · karensen är 90 dagar och dag 90 är fakturerbar', () => {
    const dag89 = switchArvode({ ...BAS, arbeteUtfortAt: dagarSedan(89) });
    assert.equal(dag89.fakturerbar, false);
    assert.match(dag89.skal, /karens_loper/);
    assert.equal(dag89.dagarKvar, 1, 'kunden ska kunna se exakt när arvodet blir aktuellt');
    assert.equal(switchArvode({ ...BAS, arbeteUtfortAt: dagarSedan(KARENS_DAGAR) }).fakturerbar, true);
  });

  test('SA-04 · beloppet är ARVO_FEE_RATE av år-1-besparingen — en sanning, aldrig en egen sats', () => {
    const r = switchArvode({ ...BAS, arbeteUtfortAt: dagarSedan(120) });
    assert.equal(r.belopp, Math.round(12_000 * ARVO_FEE_RATE));
    assert.equal(ARVODESSATS, ARVO_FEE_RATE, 'satsen importeras från lib/fee.js, kopieras aldrig');
  });

  test('SA-05 · utan besparing finns inget arvode att räkna', () => {
    for (const v of [null, undefined, 0, -500, NaN, 'mycket']) {
      const r = switchArvode({ ...BAS, arsbesparing: v, arbeteUtfortAt: dagarSedan(120) });
      assert.equal(r.fakturerbar, false, String(v));
      assert.match(r.skal, /arsbesparing_saknas/);
    }
  });
});

describe('SA · Motbevisspärren — tystnad stoppar inte, motsägelse gör det', () => {
  test('SA-06 · gamla leverantören fakturerar EFTER bytet → arvodet hålls', () => {
    // Det enda scenario som kan skada oss: en faktura till en kund vars byte demonstrabelt inte
    // genomfördes. Här, och bara här, väger kundens papper tyngre än vår egen liggare.
    const r = switchArvode({
      ...BAS, arbeteUtfortAt: dagarSedan(120),
      fakturorEfter: [{ supplier: 'Telia Sverige AB', date: dagarSedan(30) }],
    });
    assert.equal(r.fakturerbar, false);
    assert.match(r.skal, /gammal_leverantor_fakturerar_fortfarande/);
  });

  test('SA-07 · TYSTNAD är inget motbevis — den stoppar oss inte', () => {
    // Skillnaden mot att kräva bevis är hela beslutet. En kund som slutat vidarebefordra ska inte
    // kunna avbryta vårt arvode genom att tiga. Fail-closed på KONFLIKTEN, fail-open på tystnaden.
    assert.equal(switchArvode({ ...BAS, arbeteUtfortAt: dagarSedan(120) }).fakturerbar, true);
    assert.equal(switchArvode({ ...BAS, arbeteUtfortAt: dagarSedan(120), fakturorEfter: [] }).fakturerbar, true);
  });

  test('SA-08 · en faktura FÖRE bytet, eller från NYA leverantören, stoppar inte', () => {
    // Motprovet. En spärr som fäller allt är lika värdelös som ingen spärr.
    const fore = switchArvode({
      ...BAS, arbeteUtfortAt: dagarSedan(120),
      fakturorEfter: [{ supplier: 'Telia', date: dagarSedan(150) }],   // före bytet — väntat
    });
    assert.equal(fore.fakturerbar, true, 'gamla leverantörens fakturor FÖRE bytet är normala');

    const ny = switchArvode({
      ...BAS, arbeteUtfortAt: dagarSedan(120),
      fakturorEfter: [{ supplier: 'Tele2', date: dagarSedan(30) }],
    });
    assert.equal(ny.fakturerbar, true, 'den NYA leverantörens faktura är bekräftelse, inte motbevis');
    assert.ok(ARBETE_UTFORT.includes('applied_new'));
  });
});
