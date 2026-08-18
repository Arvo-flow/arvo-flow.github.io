// tests/prisunderlag.mjs — ETT SCORE UTAN SITT UNDERLAG ÄR ETT OMDÖME UTAN BEVIS.
//
// BAKGRUNDEN (grundaren, 2026-08-16): "Som finansdirektör vill man nog ha info om vad verifierad
// listpris är." Rummet visade en ring med 75 och etiketten RÄTT PRISSATT. Ingenting om vad talet
// mätts mot, vad kunden betalar per enhet, eller när priset senast kontrollerades.
//
// Och talet var inte ens mätt. 75 var `supplierDiagScore`:s fallback för en rad utan health_score
// — och för just den raden var det RÄKNADE talet 90: kundens Google-pris låg 1 620 kr per
// användare/år mot ett verifierat golv på 1 704 kr. Fallbacken visade alltså en oförtjänt
// precision som dessutom underskattade kunden med femton poäng.
//
// TVÅ REGLER, båda låsta här:
//   1. Underlaget producerar ALDRIG ett score. Talet räknas i recommend.js och lagras som
//      health_score (regel 1 — en sanning per fråga). Den här modulen bygger bara JÄMFÖRELSEN
//      som talet vilar på. Två producenter av samma tal vore motsägelsen vi rensat ut överallt.
//   2. Fail-closed som uppdelningen: saknas antal enheter, årskostnad eller ett verifierat ankare
//      visas ingenting. Hellre inget underlag än ett halvt.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   FÅNGAR: att en totalsumma jämförs med ett per-enhet-pris (enhetsfelet), att avståndet räknas
//           med fel formel (85-felet ur Svea-läxan), att underlaget visas utan verifierat golv,
//           och att modulen börjar producera ett eget score. Prövas genom att ANROPA funktionen.
//   BLIND:  vakten vet inte om ANKARET är rätt för kundens produkt. Ligger kunden på Business
//           Standard men golvet avser Starter är jämförelsen formellt korrekt och sakligt fel.
//           Produktnivån lagras inte som fält ännu — det är en känd, uttalad lucka, inte en
//           blindfläck vakten kan täcka.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { byggPrisunderlag } from '../lib/prisunderlag.js';

// Ankaret som produktionen faktiskt ger sedan 2026-08-18: talen härleds ur M365 Business Standard
// (133,82 kr/mån årsavtal × 12 = 1 606 · 160,58 kr/mån utan bindning × 12 = 1 927), och datumet är
// den nivåns. Tidigare stod här p25 1704 / median 2880 / 17 juni — tal utan källa och ett datum
// lånat från Googles USD-nivåer. Se tests/matriskrav.mjs.
const ANKARE = {
  p25: 1606, median: 1927, unitLabel: 'per användare/år', lastVerified: '2026-08-05',
  referensProdukt: 'Microsoft 365 Business Standard',
};

describe('PRISUNDERLAG · så landade vi i talet', () => {
  test('PU-01 · grundarens Google-rad, tal för tal', () => {
    // 45 licenser × 135 kr/mån = 6 075 kr/mån = 72 900 kr/år → 1 620 kr per användare/år.
    const u = byggPrisunderlag({ annualCost: 72900, seats: 45, ankare: ANKARE });
    assert.equal(u.perEnhet, 1620);
    assert.equal(u.golv, 1606);
    assert.equal(u.underGolv, false, 'mot det VERIFIERADE golvet ligger de strax över, inte under');
    assert.equal(u.avstandPct, 1);
    assert.equal(u.lastVerified, '2026-08-05', 'datumet är den halva kunden kan kontrollera');
  });

  test('PU-02 · jämförelsen sker PER ENHET, aldrig total mot styckpris', () => {
    // Enhetsfelet: 72 900 kr/år mot 1 704 kr/användare är två olika storheter. Att ställa dem mot
    // varandra är precis vad enhetskarantänen finns för att stoppa — och det får aldrig ske i en
    // kundyta där talet ser ut som en jämförelse.
    const u = byggPrisunderlag({ annualCost: 72900, seats: 45, ankare: ANKARE });
    assert.ok(u.perEnhet < 5000, `per enhet ska vara ett styckpris, fick ${u.perEnhet}`);
    assert.notEqual(u.perEnhet, 72900);
  });

  test('PU-03 · avståndet räknas mot GOLVET, inte mot priset (85-felet)', () => {
    // (pris − golv) / golv = "hur många procent över det billigaste". Delar man i stället med
    // priset får man ett annat tal och en annan mening — det var Svea-läxan, ordagrant.
    const u = byggPrisunderlag({ annualCost: 100 * 12, seats: 1, ankare: { p25: 1000, median: 1200 } });
    assert.equal(u.perEnhet, 1200);
    assert.equal(u.avstandPct, 20, '(1200−1000)/1000 = 20 %, inte (1200−1000)/1200 = 17 %');
    assert.equal(u.underGolv, false);
  });

  test('PU-04 · utan verifierat golv, antal eller kostnad visas ingenting', () => {
    assert.equal(byggPrisunderlag({ annualCost: 72900, seats: 45, ankare: null }), null);
    assert.equal(byggPrisunderlag({ annualCost: 72900, seats: 45, ankare: { median: 1927 } }), null,
      'median utan p25 är inget golv — scoren mäts mot p25');
    assert.equal(byggPrisunderlag({ annualCost: 72900, seats: null, ankare: ANKARE }), null,
      'utan antal enheter går priset per enhet inte att räkna — då gissar vi inte');
    assert.equal(byggPrisunderlag({ annualCost: 0, seats: 45, ankare: ANKARE }), null);
    assert.equal(byggPrisunderlag({}), null);
  });

  test('PU-05 · modulen producerar ALDRIG ett score', () => {
    // Talet bor i recommend.js. Skulle den här modulen börja returnera ett eget score hade rummet
    // två producenter av samma sanning — och vilken kunden fick skulle bero på vilken kod som
    // råkade köra. Det är exakt LFL-obduktionens sjukdom.
    const u = byggPrisunderlag({ annualCost: 72900, seats: 45, ankare: ANKARE });
    for (const nyckel of Object.keys(u)) {
      assert.doesNotMatch(nyckel, /score|poang|betyg/i, `underlaget bär ett score-liknande fält: ${nyckel}`);
    }
  });

  test('PU-07 · golvet bär namnet på produkten det är priset PÅ', () => {
    // Utan produktnamnet läser en finansdirektör "billigaste publicerade pris" på en Google-rad
    // som Googles pris — men talet är M365 Business Standard. Ett pris utan produkt är ett tal
    // utan påstående. Prisboken tvingas bära namnet av MK-08; här låses att det når underlaget.
    const u = byggPrisunderlag({ annualCost: 72900, seats: 45, ankare: ANKARE });
    assert.equal(u.referensProdukt, 'Microsoft 365 Business Standard');
    const utan = byggPrisunderlag({ annualCost: 72900, seats: 45, ankare: { p25: 1606, median: 1927 } });
    assert.equal(utan.referensProdukt, null, 'saknas namnet ska fältet vara null — aldrig gissat');
  });

  test('PU-06 · vad talet jämförs med står utskrivet (aldrig "marknaden")', () => {
    // Referensen är billigaste PUBLICERADE priset — inte vad andra bolag faktiskt betalar. Den
    // skillnaden är hela poängen med kohorten som ännu inte finns, och får inte suddas ut.
    const u = byggPrisunderlag({ annualCost: 72900, seats: 45, ankare: ANKARE });
    assert.match(u.jamfortMot, /publicerade/i);
    assert.doesNotMatch(u.jamfortMot, /marknad/i);
  });
});
