// tests/fakturanummer.mjs — ETT PÅHITTAT FAKTURANUMMER ÄR VÄRRE ÄN INGET.
//
// BAKGRUNDEN (2026-08-15, ur Geminis granskning): rummet säger "vi prissätter inte de här två" och
// namnger leverantören. Med två Slack-fakturor i pärmen kan ekonomichefen inte kontrollera vilket
// beslut som gäller vilket papper. Fakturanumret pekar ut exakt ett dokument, kommer ur kundens
// eget papper, och bär noll marknadstal — det är den bästa sortens fält vi kan lägga till.
//
// OCH DEN FARLIGASTE. Ett hallucinerat nummer ser identiskt ut med ett avläst och bär precisionens
// auktoritet. En kund som letar efter "Faktura 9923" och inte hittar den drar slutsatsen att vi
// har fel om allt annat i rummet också. Ett fel av den sorten kostar mer än fältet är värt.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   FÅNGAR: att formkontrollen släpper igenom något som inte är en identifierare (datum, rena ord,
//           tomt, orimlig längd), att textlagerjämförelsen blir teckenkänslig på ett sätt som
//           fäller giltiga nummer (pdfjs bryter isär tecken), och — viktigast — att grinden
//           släpper igenom ett nummer UTAN ett andra vittne. Prövas genom att ANROPA funktionerna.
//   BLIND:  vakten kan inte se om numret modellen läste är rätt FÄLT. Står både kundnummer och
//           fakturanummer på pappret bekräftar textlagret båda, och en förväxling ser ut som en
//           träff. Den skillnaden kräver att man läser fakturan med ögonen — sonden mäter
//           frekvensen, den avgör inte semantiken. Vakten skyddar mot FABRIKAT, inte mot FÖRVÄXLING.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { harFakturanummerform, finnsITextlager, verifieraFakturanummer } from '../lib/fakturanummer.js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('FAKTURANUMMER · formen', () => {
  test('FN-01 · verkliga nummerformat passerar', () => {
    for (const nr of ['9923', 'INV-2026-0412', 'F 44019-2', '440192', 'SE-100/2026', '2026.0041']) {
      assert.ok(harFakturanummerform(nr), `"${nr}" ska godkännas`);
    }
  });

  test('FN-02 · ett datum är inte ett fakturanummer (den vanligaste förväxlingen)', () => {
    // "2026-08-14" klarar varje rimlig teckenkontroll med råge och står alltid bredvid numret.
    assert.equal(harFakturanummerform('2026-08-14'), false);
  });

  test('FN-03 · rena ord, tomt och orimliga längder avvisas', () => {
    for (const skrap of ['', '   ', 'Fakturanummer', 'Faktura', 'AB', '7',
      'x'.repeat(41), 'Se bifogad specifikation för detaljer om beloppet']) {
      assert.equal(harFakturanummerform(skrap), false, `"${String(skrap).slice(0, 20)}" ska avvisas`);
    }
  });
});

describe('FAKTURANUMMER · det oberoende vittnet', () => {
  test('FN-04 · numret hittas även när textlagret bryter isär tecknen', () => {
    // pdfjs fogar ihop fragment med radbrytning och bryr sig inte om ordmellanrum. Ett nummer som
    // står "994 23" eller "INV-\n2026-0412" i textlagret är samma nummer — jämförelsen sker på
    // enbart alfanumeriska tecken. Missas det fäller vi giltiga fakturor, vilket är det dyra felet.
    assert.ok(finnsITextlager('9923', 'Fakturanr: 99 23\nBetalas senast'));
    assert.ok(finnsITextlager('INV-2026-0412', 'Invoice no INV-\n2026 0412'));
    assert.ok(finnsITextlager('F 44019-2', 'FAKTURANUMMER F440192'));
  });

  test('FN-05 · ett nummer som inte står i dokumentet fångas', () => {
    assert.equal(finnsITextlager('9923', 'Fakturanr: 8811\nKundnr 4402'), false);
    assert.equal(finnsITextlager('9923', ''), false);
    assert.equal(finnsITextlager('', 'vad som helst'), false);
  });
});

describe('FAKTURANUMMER · grinden (fail-closed)', () => {
  test('FN-06 · bekräftat nummer passerar med sitt tryckta utseende', () => {
    // Visningsvärdet är det som STÅR på pappret, inte den normaliserade jämförelseformen —
    // kunden ska kunna läsa vårt nummer och deras faktura sida vid sida.
    const r = verifieraFakturanummer('F 44019-2', 'Faktura F440192 · Telia');
    assert.deepEqual(r, { nummer: 'F 44019-2', bekraftat: true, skal: null });
  });

  test('FN-07 · UTAN ett andra vittne visas inget nummer alls', () => {
    // Det här är grindens hela poäng. En skannad faktura ger tomt textlager; formen kan då hålla
    // utan att någon har sett numret på pappret. Vi säger hellre inget än pekar kunden mot ett
    // dokument vi inte kunnat belägga finns.
    const r = verifieraFakturanummer('9923', null);
    assert.equal(r.nummer, null);
    assert.equal(r.bekraftat, false);
    assert.match(r.skal, /textlager/);
    assert.equal(verifieraFakturanummer('9923', '   ').nummer, null);
  });

  test('FN-08 · varje avvisning bär ett namngivet skäl (aldrig tyst)', () => {
    // En tyst grind går inte att mäta, och en grind vars utfall aldrig räknas stängs förr eller
    // senare av — precis som smyghöjningsvakten 2026-07-20.
    assert.equal(verifieraFakturanummer(null).skal, 'saknas_pa_fakturan');
    assert.equal(verifieraFakturanummer('2026-08-14', 'text').skal, 'ogiltig_form');
    assert.equal(verifieraFakturanummer('9923', 'Fakturanr 111').skal, 'finns_ej_i_dokumentet');
  });

  test('FN-09 · ett fabricerat nummer når ALDRIG kunden', () => {
    // Regressionen vakten finns för: modellen påstår ett nummer som inte står i dokumentet.
    const r = verifieraFakturanummer('INV-9999', 'Fakturanummer: 4711\nTelia Sverige AB');
    assert.equal(r.nummer, null, 'ett nummer utan täckning i dokumentet får aldrig visas');
  });
});

describe('FAKTURANUMMER · hela vägen från pappret till rummet', () => {
  const ROT = new URL('..', import.meta.url).pathname;
  const las = (f) => readFileSync(join(ROT, f), 'utf8');

  test('FN-10 · grinden körs i PRODUKTIONSVÄGEN, inte bara i sonden', () => {
    // Läxan från attribueringslåset: en mekanism som bara matas av ett testharness kan vara
    // perfekt och samtidigt mörk i två månader. Frågan är alltid vilket objekt som kommer fram
    // till grinden i produktion — och vem som byggde det.
    const api = las('api/test-invoice.mjs');
    assert.match(api, /verifieraFakturanummer\(extracted\.invoiceNumber, textlager\)/,
      'grinden måste köras på extraktionens påstående i request-vägen');
    assert.match(api, /extraheraTextlager\(pdfBytes\)/,
      'det oberoende vittnet måste hämtas ur den faktiska PDF:en');
    assert.match(api, /extracted\.invoiceNumber = dom\.nummer;/,
      'grindens dom måste ERSÄTTA modellens påstående — annars är den dekoration');
  });

  test('FN-11 · pdfjs är en deklarerad produktionsdependency', () => {
    // Utan den kastar textutvinningen i produktion, numret tappas tyst, och grinden ser ut att
    // fungera medan den aldrig bekräftar något. Ett fail-closed fält som alltid failar är inte
    // säkert — det är trasigt, och skillnaden syns inte i någon logg.
    const pkg = JSON.parse(las('package.json'));
    assert.ok(pkg.dependencies?.['pdfjs-dist'],
      'pdfjs-dist måste ligga i dependencies, inte devDependencies');
  });

  test('FN-12 · numret NÅR båda liggarna (lagrat och osynligt är ingen leverans)', () => {
    const store = las('lib/invoice-store.js');
    assert.match(store, /SELECT[\s\S]{0,400}invoice_number/,
      'läsvägen måste hämta kolumnen — annars är numret lagrat och osynligt');
    assert.match(store, /ADD COLUMN IF NOT EXISTS invoice_number TEXT/,
      'kolumnen ska självläka; en migrering som kräver att någon minns den körs inte');

    const api = las('api/invoice-history.mjs');
    assert.match(api, /invoiceNumber: a\.invoice_number/,
      'bevakat-kortet måste bära numret — det är kortet där vår tystnad ska gå att kontrollera');

    const rum = las('src/pages/Portfolio/index.js');
    assert.match(rum, /faktura \$\{w\.invoiceNumber\}/, 'bevakat-listan ska visa numret');
    assert.match(rum, /faktura \$\{a\.invoice_number\}/, 'innehavets rad ska visa numret');
  });

  test('FN-13 · varje triage-utgång bär numret vidare', () => {
    const api = las('api/test-invoice.mjs');
    const anrop = api.match(/storeTriaged\(\{ fingerprint, pdfHash,/g) ?? [];
    const med = api.match(/storeTriaged\(\{ fingerprint, pdfHash, invoiceNumber:/g) ?? [];
    assert.ok(anrop.length >= 10, `hittade bara ${anrop.length} triage-anrop — matchar mönstret koden?`);
    assert.equal(med.length, anrop.length,
      'en triagerad faktura är just den kunden vill slå upp — alla utgångar måste bära numret');
  });
});
