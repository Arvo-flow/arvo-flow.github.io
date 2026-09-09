// tests/valutakrav.mjs — VK: en faktura i främmande valuta räknas om HELT, eller inte alls.
//
// ══ VARFÖR (2026-09-09, ur grundarens 25 skarpa fakturor) ══════════════════════════════════
// Konverteringen bodde i `api/test-invoice.mjs` som TVÅ handskrivna fältlistor, en per valuta.
// Båda var ofullständiga, på olika sätt, och felen nådde produktionen:
//
//   · `invoiceTotal` konverterades ALDRIG. Ring 1 jämför radsumman (konverterad) mot den
//     (okonverterad) och fällde fyra av 25 fakturor — Google 6 595 SEK ≠ 575 EUR (kvot 11,47),
//     Slack/Atlassian/AWS med kvot 10,42. Precis de fyra leverantörer prisboken har golv för.
//   · Öresfälten konverterades inte, och EUR-grenen glömde `unitPrice`. MÄTT genom
//     produktionskedjan: Googles per-licenspris blev **11,50 kr i stället för 131,90 kr**.
//     Ett tal som når kundens prosa, elva gånger fel, i en fix som var en halv dag gammal.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   UTLÖSER: att ett penningfält i extraktionsschemat varken konverteras eller är deklarerat som
//     icke-pengar; att `invoiceTotal` eller öresfälten tappas; att api-lagret återinför en egen
//     fältlista; att en trasig kurs producerar NaN i stället för att avstå.
//   UTLÖSER INTE: att kursen är RÄTT. Vakten vet att alla fält gångas med samma tal, aldrig att
//     talet motsvarar dagens marknad — det är FX-hämtningens fråga och mäts på annat håll.
//   BLIND: den läser schemat, inte verkligheten. Ett belopp modellen returnerar utanför schemat
//     syns inte här.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { konverteraTillSek, BELOPPSFALT, RADFALT, EJ_PENGAR } from '../lib/valutakonvertering.js';
import { EXTRACT_TOOL, aggregateLineItems } from '../agents/test-invoice/extract.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const las = (f) => readFileSync(join(ROT, f), 'utf8');

/** Rå (snake_case) → aggregerad (camelCase). Två stavningar i två steg — RO-01:s läxa. */
const AGGREGERAT_NAMN = { amount_ore: 'amountOre', unit_price_ore: 'unitPriceOre' };
const PENGAFORM = /amount|cost|total|price|fee|charge|_ore\b|Ore$/i;

describe('VK · En faktura i främmande valuta räknas om HELT, eller inte alls', () => {
  test('VK-01 · VARJE penningfält i schemat är klassat — konverteras eller deklarerat icke-pengar', () => {
    // Kärnan. Ett nytt beloppsfält kan inte glömmas bort: det fäller sviten tills någon valt sida.
    // Det var precis glömskan som kostade fyra fakturor och ett elva gånger fel per-licenspris.
    const topp = EXTRACT_TOOL?.input_schema?.properties ?? {};
    const rad  = topp.lineItems?.items?.properties ?? {};
    const oklassade = [];
    const klassa = (namn, konverteras) => {
      const aggr = AGGREGERAT_NAMN[namn] ?? namn;
      if (konverteras.includes(namn) || konverteras.includes(aggr)) return;
      if (Object.prototype.hasOwnProperty.call(EJ_PENGAR, namn)) return;
      if (Object.prototype.hasOwnProperty.call(EJ_PENGAR, aggr)) return;
      oklassade.push(namn);
    };
    for (const namn of Object.keys(topp)) if (PENGAFORM.test(namn)) klassa(namn, BELOPPSFALT);
    for (const namn of Object.keys(rad))  if (PENGAFORM.test(namn)) klassa(namn, RADFALT);

    assert.deepEqual(oklassade, [],
      `${oklassade.join(', ')} ser ut som pengar men konverteras inte och är inte deklarerade som `
      + 'icke-pengar. Lägg dem i BELOPPSFALT/RADFALT om de bär ett belopp i fakturans valuta, '
      + 'annars i EJ_PENGAR med ett skäl. Att inte välja är hur invoiceTotal blev kvar i EUR.');
  });

  test('VK-02 · invoiceTotal konverteras — annars fäller Ring 1 sin egen jämförelse', () => {
    // Det ursprungliga felet, med grundarens verkliga tal.
    const ut = konverteraTillSek({
      currency: 'EUR', amount: 575, invoiceTotal: 575, annualCost: 6900,
      lineItems: [{ description: 'Google Workspace', amount: 575, quantity: 50 }],
    }, { rate: 11.47, valuta: 'EUR' });
    assert.equal(ut.invoiceTotal, 6595, 'fakturatotalen måste följa med till SEK');
    assert.equal(ut.lineItems[0].amount, 6595);
    assert.equal(ut.lineItems[0].amount, ut.invoiceTotal,
      'radsumman och totalen ska stämma EFTER omräkningen — det är den jämförelsen Ring 1 gör, '
      + 'och det var vår egen valutablandning som fällde Google, Slack, Atlassian och AWS');
  });

  test('VK-03 · öresfälten konverteras — de är fixens egen läsväg', () => {
    // `recommend.js` läser öresfälten sedan 9 sep för att slippa kronorfältets avrundning. Blir
    // de kvar i främmande valuta blir kundens per-licenspris elva gånger fel — mätt: 11,50 kr
    // mot 131,90 kr på Googles faktura, i en fix som var en halv dag gammal.
    const ut = konverteraTillSek({
      currency: 'EUR',
      lineItems: [{ amount: 575, unitPrice: 11.5, amountOre: 57_500, unitPriceOre: 1150, quantity: 50 }],
    }, { rate: 11.47, valuta: 'EUR' });
    const r = ut.lineItems[0];
    assert.equal(r.amountOre, 659_525, 'öresbeloppet måste räknas om');   // ore-ok: provet PRÖVAR omräkningen av just de fälten
    // 1150 öre × 11,47 = 13 190,5 → 13 191. Jag skrev först 13 190 för hand; provet fällde mig,
    // och talet ur körningen vinner över talet ur mitt huvud.
    assert.equal(r.unitPriceOre, 13_191, 'och à-priset i öre — det är talet kunden läser');   // ore-ok: provet PRÖVAR omräkningen av just de fälten
    assert.equal(r.unitPrice, 132, 'EUR-grenen glömde `unitPrice` helt');
    assert.ok(Number.isInteger(r.amountOre) && Number.isInteger(r.unitPriceOre),   // ore-ok: provet PRÖVAR omräkningen av just de fälten
      'öresfält är heltalsobservationer och måste förbli heltal');
  });

  test('VK-04 · EN lista, inte två — api-lagret bär ingen egen fältuppräkning', () => {
    // Två kopior glider isär, och den som glider är inte nödvändigtvis den man läser (regel 1).
    // Det var exakt så EUR-grenen och USD-grenen blev ofullständiga på OLIKA sätt.
    const api = las('api/test-invoice.mjs');
    assert.match(api, /konverteraTillSek\(extracted, \{ rate: kurs/,
      'konverteringen ska gå via den delade funktionen');
    assert.doesNotMatch(api, /extracted\.recurringAmount\s*=\s*cvt\(/,
      'en handskriven fältlista i api-lagret är den kopia som glider isär');
    assert.doesNotMatch(api, /const cvt = \(v\)/,
      'och dess omräknare likaså');
  });

  test('VK-05 · en trasig kurs konverterar INGENTING — aldrig NaN', () => {
    // Att gånga med `undefined` ger NaN i varje belopp, och NaN är omöjligt att skilja från
    // «fakturan saknade tal». Felfamiljen i sin renaste form. Utan kurs avstår vi i stället.
    const inn = { currency: 'EUR', amount: 575, invoiceTotal: 575, lineItems: [{ amount: 575 }] };
    for (const trasig of [undefined, null, NaN, 0, -1, 'elva']) {
      const ut = konverteraTillSek(inn, { rate: trasig, valuta: 'EUR' });
      assert.equal(ut.amount, 575, `kurs ${String(trasig)}: beloppet ska stå orört`);
      assert.equal(ut.currency, 'EUR', 'och valutan ska INTE påstås vara SEK');
    }
    // MOTPROVET: med en giltig kurs sker omräkningen. En spärr som avstår alltid är ingen spärr.
    assert.equal(konverteraTillSek(inn, { rate: 11.47, valuta: 'EUR' }).currency, 'SEK');
  });

  test('VK-06 · KEDJAN: omräknad faktura ger rätt per-licenspris hela vägen', () => {
    // Ett test som matar sitt eget indata bevisar bara vidarebefordran (holdings.mjs 19 aug).
    // Provet kör därför omräkning → aggregering, och kontrollerar talet kunden faktiskt får.
    const ra = {
      currency: 'EUR', supplier: 'Google', billingPeriod: 'monthly', confidenceScore: 0.95,
      lineItems: [{ description: 'Google Workspace Business Standard', type: 'recurring_subscription',
        quantity: 50, amount: 575, unitPrice: 11.5, amount_ore: 57_500, unit_price_ore: 1150 }],
    };
    const aggregerad = aggregateLineItems(ra, null);
    const ut = konverteraTillSek(aggregerad, { rate: 11.47, valuta: 'EUR' });
    const rad = ut.lineItems[0];
    assert.equal(rad.amountOre, 659_525, 'öret måste överleva aggregeringen OCH omräkningen');   // ore-ok: provet PRÖVAR omräkningen av just de fälten
    // Per licens och månad, ur öret: 659 525 / 100 / 50 = 131,905 kr — inte 11,50.
    assert.equal(Math.round(rad.amountOre / 100 / rad.quantity * 100) / 100, 131.91,   // ore-ok: provet PRÖVAR omräkningen av just de fälten
      'kundens per-licenspris ska vara ~132 kr, inte 11,50 kr');
  });
});
