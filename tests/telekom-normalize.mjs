// tests/telekom-normalize.mjs — låser Vallgravens hjärta: normaliseringen som gör varje växelfaktura
// till jämförbar, nivåtaggad data (kr/anv/mån exkl moms + kanonisk T1/T2/T3) + k-anonymitetslåset.
// Detta är beviset att fynd-motorn kan säga "ni betalar Y, marknaden X" utan efterhandsarbete.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  inferCanonicalTier, normalizeTelekomInvoice, buildTelekomDatapoint,
  CANONICAL_TIERS, K_ANON_MIN, marketComparisonAllowed, classifyTelekomLine,
} from '../lib/telekom-normalize.js';

const line = (description, amount, quantity) => ({ type: 'recurring_subscription', description, amount, quantity });

describe('Telekom · kanonisk nivå-inferens (leverantörs-agnostisk)', () => {
  test('bara samtal → T1', () => {
    assert.equal(inferCanonicalTier([line('Växel-licens samtal + app', 99)]).tier, 'T1');
  });
  test('köhantering/IVR/CRM → T2', () => {
    assert.equal(inferCanonicalTier([line('Växel Proffs med köhantering och CRM-integration', 149)]).tier, 'T2');
    assert.equal(inferCanonicalTier([line('Svarsgrupp + närvaro/hänvisning', 120)]).tier, 'T2');
  });
  test('inspelning/kontaktcenter/statistik → T3 (högsta vinner)', () => {
    assert.equal(inferCanonicalTier([line('Kontaktcenter med samtalsinspelning och wallboard', 299)]).tier, 'T3');
    assert.equal(inferCanonicalTier([line('Köhantering', 100), line('Samtalsinspelning', 49)]).tier, 'T3');
  });
});

describe('Telekom · nämnaren bor på växelraden, inte i seatCount', () => {
  // ⚠️ HÄR LÅG FYRA TESTER FÖR `deriveTelekomSeats` (2026-09-19). Funktionen var växelprisets
  // nämnare och ärvde `invoice.seatCount` — på en kombinerad faktura antalet SIM-KORT. Den är
  // raderad, inte omskriven: så länge den låg kvar exporterad och grön såg den inkopplad ut, och
  // nästa läsare hade återanvänt den i god tro. Frågan den besvarade ställs nu till
  // `lib/vaxelrad.js`, som läser växelradernas EGNA antal (se tests/vaxelrad.mjs, RK-01..12).
  test('den raderade seat-härledningen är verkligen borta ur modulen', async () => {
    const mod = await import('../lib/telekom-normalize.js');
    assert.equal(mod.deriveTelekomSeats, undefined,
      'kommer den tillbaka är SIM-nämnaren ett `import` bort');
  });

  test('seatCount kan inte påverka växelpriset — samma faktura, olika seatCount', () => {
    const rader = [
      line('Telenor One Talk Molnväxel — 50 användarlicenser', 4450, 50),
      line('Telenor One Talk Reception (auto-svarare + IVR)', 449, 1),
    ];
    const priser = [45, 1, 999, undefined].map(
      (sc) => normalizeTelekomInvoice({ seatCount: sc, lineItems: rader }, 'telenor').perUserMonthlyExVat);
    assert.deepEqual(priser, [89, 89, 89, 89]);
  });
});

describe('Telekom · normalisering → jämförbar enhet (kr/anv/mån exkl moms)', () => {
  test('per-användare-pris exkl moms, hårdvara exkluderad', () => {
    // ⚠️ INDATAN ÄNDRAD 2026-09-19, INTE FÖRVÄNTNINGEN. Testet matade `seatCount: 20` medan
    // växelraden saknade kvantitet — alltså kom nämnaren utifrån, vilket är exakt SIM-buggen.
    // Verkliga växelrader namnger sin enhet; mätt hos fyra oberoende leverantörer:
    // «50 användarlicenser» (Telenor), «Använd.» (Telia), «(22 anknytningar)» (Telavox),
    // «4 extra användare» (3). Raden nedan speglar den formen. Beviset — att hårdvara och
    // engångsavgift hålls utanför — är oförändrat, och 149 kr står kvar.
    const r = normalizeTelekomInvoice({
      seatCount: 20,
      lineItems: [
        line('Telavox Proffs köhantering (20 användare)', 2980, 20),   // 149/anv × 20
        line('Bordstelefon hårdvara', 4000),         // EXKLUDERAS (hårdvara)
        line('Startavgift engångs', 1500),           // EXKLUDERAS (engångs)
      ],
    }, 'telavox');
    assert.equal(r.seats, 20);
    assert.equal(r.perUserMonthlyExVat, 149);        // 2980/20, hårdvara/engångs ej med
    assert.equal(r.canonicalTier, 'T2');
    assert.equal(r.supplier, 'telavox');
  });
  test('saknade säten → null (ingen normalisering möjlig)', () => {
    assert.equal(normalizeTelekomInvoice({ lineItems: [line('Växel', 999)] }), null);
  });
  test('robust avrundning till 2 decimaler (inga flyttalsspöken)', () => {
    // Nämnaren flyttad till raden av samma skäl som ovan; 100/3 är fortfarande det som prövas.
    const r = normalizeTelekomInvoice({ seatCount: 3, lineItems: [line('Växel samtal (3 anknytningar)', 100, 3)] }, 'telia');
    assert.equal(r.perUserMonthlyExVat, 33.33);      // 100/3 = 33.3333… → 33.33
  });
});

describe('Telekom · rad-isolering (PILOTDATA-LÄXAN: mobil ≠ växel, regel 7)', () => {
  test('classifyTelekomLine skiljer växel / mobil / hårdvara', () => {
    assert.equal(classifyTelekomLine('Telia Smart Connect Använd.'), 'vaxel');
    assert.equal(classifyTelekomLine('Telia Touchpoint Plus (Huvudlicens)'), 'vaxel');
    assert.equal(classifyTelekomLine('Telia Jobbmobil Obegränsad'), 'mobil');
    assert.equal(classifyTelekomLine('Företagsabonnemang 50GB'), 'mobil');
    assert.equal(classifyTelekomLine('Hårdvara: Hyra IP-telefon.'), 'hardware');
  });

  test('blandad faktura: mobilabonnemang EXKLUDERAS ur växel-per-user (ingen falsk överbetalning)', () => {
    const r = normalizeTelekomInvoice({ seatCount: 45, lineItems: [
      line('Telia Jobbmobil Obegränsad', 15705, 45),   // MOBIL → ut
      line('Telia Smart Connect Använd.', 5310, 45),   // växel
      line('Svarsgrupp / Köhantering', 297, 3),        // växel
    ] }, 'telia');
    // ⚠️ UTFALLET ÄNDRAT 2026-09-19: 124,60 → 118,00, och det är en RÄTTELSE, inte en anpassning.
    // «Svarsgrupp / Köhantering» (297 kr, antal 3) är tre svarsgrupper — köer, inte personer. Att
    // lägga en bolagsgemensam avgift i täljaren och dela den med antalet ANVÄNDARE blandar två
    // enheter. Utan den blir priset 5310/45 = 118,00, vilket är EXAKT Telia Smart Connects
    // verifierade T2-golv: den korrigerade aritmetiken reproducerar prisbokens eget tal ur
    // fakturans egna rader. Riktningen är dessutom den säkra — priset SÄNKS, alltså minskar den
    // påvisade överbetalningen och därmed vårt eget arvode.
    assert.equal(r.perUserMonthlyExVat, 118);           // 5310/45 — INTE 473,6 och INTE 124,6
    assert.equal(r.seats, 45, 'nämnaren är växelradens egna antal, aldrig SIM-antalet');
    assert.equal(r.perBolagMonthly, 297, 'bolagsavgiften försvinner inte — den redovisas');
    assert.equal(r.canonicalTier, 'T2');
    assert.equal(r.excludedMobilMonthly, 15705);
    assert.equal(r.bundled, false);
  });

  test('bundlad rad (Telavox Premium: PBX-Växel & 100GB Surf) flaggas bundled, hårdvara ut', () => {
    const r = normalizeTelekomInvoice({ seatCount: 22, lineItems: [
      line('Telavox Premium (PBX-Växel & 100GB Surf)', 8778, 22),
      line('Hårdvara: Hyra IP-telefon.', 745, 5),       // hårdvara → ut
    ] }, 'telavox');
    assert.equal(r.bundled, true);
    assert.equal(r.perUserMonthlyExVat, 399);           // hårdvara ej med
  });
});

describe('Telekom · datapunkts-kontraktet (Vallgrav-redo: normaliserad + nivåtaggad)', () => {
  test('datapunkten bär per_user_monthly_exvat + tier (det fynd-motorn aggregerar)', () => {
    const normalized = normalizeTelekomInvoice({ seatCount: 20, lineItems: [line('Telavox Proffs köhantering (20 användare)', 2980, 20)] }, 'telavox');
    const dp = buildTelekomDatapoint({ normalized, industry: 'it-tech', employees: 18 });
    assert.equal(dp.category, 'molnvaxel');
    assert.equal(dp.tier, 'T2');
    assert.equal(dp.per_user_monthly_exvat, 149);
    assert.equal(dp.annualCost, 149 * 20 * 12);
    assert.equal(dp.seatCount, 20);
  });
});

describe('Telekom · k-anonymitet (integritetslåset)', () => {
  test('marknadsmedian exponeras aldrig under 5 distinkta kunder', () => {
    assert.equal(K_ANON_MIN, 5);
    assert.equal(marketComparisonAllowed(4), false);
    assert.equal(marketComparisonAllowed(5), true);
    assert.equal(marketComparisonAllowed(50), true);
  });
});

describe('Telekom · kanonisk axel är komplett', () => {
  test('T1/T2/T3 finns med etiketter', () => {
    for (const t of ['T1', 'T2', 'T3']) assert.equal(typeof CANONICAL_TIERS[t].label, 'string');
  });
});
