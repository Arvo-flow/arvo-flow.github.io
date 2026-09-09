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
import { korpusText, korpusNamn } from './korpus.mjs';
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
    assert.match(api, /verifieraFakturanummer\(extracted\.invoiceNumber, _textlager\)/,
      'grinden måste köras på extraktionens påstående i request-vägen');
    assert.match(api, /extracted\.invoiceNumber = dom\.nummer;/,
      'grindens dom måste ERSÄTTA modellens påstående — annars är den dekoration');

    // ⚠️ PARSEN FLYTTADE (2026-09-08, fynd 4). Textlagret läses numera i `extractInvoice`,
    // eftersom kolumnläsaren behöver samma tokens FÖRE härledningen av `seatCount`. Provet
    // följer med — men det får inte nöja sig med att api-lagret läser NÅGOT textlager: det
    // måste komma ur samma parse som tokens, annars är vi tillbaka i två sanningar (FK-08).
    assert.match(api, /const _textlager = extracted\.textlager/,
      'api-lagret ska ÄRVA textlagret ur extraktionen, aldrig göra en andra parse');
    assert.doesNotMatch(api, /extraheraTextlager\s*\(/,
      'en andra parse i api-lagret är två sanningar om samma dokument');

    const ex = las('agents/test-invoice/extract.js');
    assert.match(ex, /await extraheraTextlager\(pdfBytes\)/,
      'det oberoende vittnet måste hämtas ur den faktiska PDF:en');
    // Textlagret bärs ut — men som ett ICKE-UPPRÄKNINGSBART fält, så att kundens fakturatext
    // inte kan följa med i en spridning eller en logg (FK-13). Grinden når det ändå.
    assert.match(ex, /\[\['textlager', _textlager\], \['tokens', _tokens\]\]/,
      'och bäras ut till den som dömer numret');
  });

  test('FN-11 · pdfjs är en deklarerad produktionsdependency', () => {
    // Utan den kastar textutvinningen i produktion, numret tappas tyst, och grinden ser ut att
    // fungera medan den aldrig bekräftar något. Ett fail-closed fält som alltid failar är inte
    // säkert — det är trasigt, och skillnaden syns inte i någon logg.
    const pkg = JSON.parse(las('package.json'));
    assert.ok(pkg.dependencies?.['pdfjs-dist'],
      'pdfjs-dist måste ligga i dependencies, inte devDependencies');
  });

  test('FN-15 · pdfjs OPTIONELLA beroenden är obligatoriska för OSS', () => {
    // ══ TEXTLAGRET VAR DÖTT I PRODUKTION I TRE VECKOR (2026-09-09) ═══════════════════════════
    // Grundaren skickade in 25 fakturor skarpt. NOLL bar ett fakturanummer. Vercels runtime-logg:
    //     [textlager] kunde inte läsas — ingen kolumnkorrigering: DOMMatrix is not defined
    //     [fakturanummer] avvisat (inget_textlager_att_bekrafta_mot)
    //
    // `@napi-rs/canvas` är en OPTIONAL dependency hos pdfjs-dist. Den installeras lokalt och i
    // GitHub Actions — men inte på Vercel. Utan den kan pdfjs inte polyfilla `DOMMatrix`, och
    // `extraheraTextlager` kastar på VARJE faktura. Återskapat lokalt genom att flytta undan
    // paketet: samma felmeddelande, ord för ord.
    //
    // ⚠️ OCH DÄRFÖR HAR GRINDEN ALDRIG FUNGERAT SKARPT. De «72 av 72 bekräftade» från 15 augusti
    // mättes med `scripts/probe-fakturanummer.mjs` i GitHub Actions — en miljö produktionen inte
    // är i. Mekanismen svarade när den matades; ingen mätning bevisade att den matades i
    // produktion. Villkorsvaktens sjukdom (Verifieringsplikten p.5), i en mekanik vi litat på i
    // tre veckor. Det som avslöjade den var den FÖRSTA skarpa mätningen, inte ett test.
    //
    // REGELN: ett beroende som pdfjs kallar «optional» är inte optional för OSS, för vår kod
    // KASTAR utan det. Vi deklarerar det själva så att varje installation får det.
    const pkg = JSON.parse(las('package.json'));
    const pdfjs = JSON.parse(las('node_modules/pdfjs-dist/package.json'));
    for (const namn of Object.keys(pdfjs.optionalDependencies ?? {})) {
      assert.ok(pkg.dependencies?.[namn],
        `${namn} är optional hos pdfjs-dist och installeras därför inte överallt. Vår kod kastar `
        + 'utan den (DOMMatrix is not defined) — deklarera den i dependencies.');
    }

    // ⚠️ VAD DEN HÄR VAKTEN INTE KAN: den läser ett MANIFEST, aldrig en körande miljö. Att
    // paketet står i package.json bevisar inte att Vercel installerade det, och det var precis
    // den skillnaden som kostade tre veckor. Det enda beviset är en skarp mätning —
    // `mcp__Vercel__get_runtime_logs` efter en deploy, eller en faktura genom den live-utlagda
    // sajten. Vakten flyttar bevisbördan; den bär den inte.
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

// ── FN-14 · GRINDEN ÄR ARMERAD I PRODUKTION — MÄT DEN MOT VERKLIGT UTFALL ───────────────────
//
// Korpusvakten (KO-03) fällde den här filen på sin första körning: fakturanummergrinden har
// varit ARMERAD sedan 15 augusti och prövades enbart mot handskrivna strängar. Samma
// valideringsfiktion som gjorde två vakter skadliga den 8 september — men här på en grind som
// redan står i request-vägen och tystar fält för riktiga kunder.
//
// Mätt mot pdfjs faktiska utfall för 74 verkliga fakturor: 68 bär ett kandidatnummer i texten,
// grinden GODKÄNNER 53 och AVVISAR 15 (`ogiltig_form`). Avvisningarna är fail-closed — inget
// nummer visas — vilket är den deklarerade och avsedda formen. Talet står här så att en framtida
// ändring som halverar täckningen inte kan passera som «grön svit».
describe('FN-14 · Grinden mätt mot verkligt pdfjs-utfall', () => {
  test('FN-14 · täckningen över korpusen kollapsar inte i tysthet', () => {
    let godkanda = 0, avvisade = 0;
    for (const namn of korpusNamn()) {
      const t = korpusText(namn);
      const m = t.match(/(?:faktura(?:nummer|nr)|invoice\s*(?:no|number))[^\n]*?([A-Z0-9][A-Z0-9\/-]{3,20})/i);
      if (!m) continue;
      if (verifieraFakturanummer(m[1], t).nummer) godkanda++; else avvisade++;
    }
    assert.ok(godkanda + avvisade >= 50,
      'korpusen måste bära kandidatnummer — annars mäter provet tomhet, inte täckning');
    assert.ok(godkanda >= 40,
      `grinden godkänner ${godkanda} av ${godkanda + avvisade} verkliga fakturanummer. Mätt till `
      + '53 den 8 september. Ett kraftigt fall betyder att en ändring tystat fältet för kunder '
      + 'som HAR ett läsbart nummer — fail-closed är rätt, men inte till vilket pris som helst.');
  });

  test('FN-14b · ett VERKLIGT nummer ur korpusen passerar hela vägen', () => {
    // Inte ett konstruerat fall: numret står tryckt i en riktig faktura, och textlagret är det
    // pdfjs faktiskt producerar för den.
    const t = korpusText('Faktura_1');
    const dom = verifieraFakturanummer('9948211', t);
    assert.equal(dom.nummer, '9948211',
      'ett avläst nummer ur en verklig faktura måste passera — annars är grinden för snäv');
    // Och motprovet: ett nummer som INTE står i just den fakturan avvisas.
    assert.equal(verifieraFakturanummer('SEC-2026-0001', t).nummer, null,
      'ett nummer utan vittne i dokumentet får aldrig passera');
  });
});
