// tests/kvantitetsvittne.mjs — ETT ANTAL SOM MODELLEN RÄKNADE FRAM FÅR INTE DRIVA PENGAR.
//
// ══ BAKGRUNDEN (2026-09-08, grundarens Microsoft-faktura) ═════════════════════════════════
// PDF:ens råa textoperatorer, utan tolkning:
//
//     MS-PREM      Microsoft 365 Business Premium                   210.29    2 102.90
//     MS-E3        Office 365 E3                            12      380.00    4 560.00
//                                                           ↑ enda tryckta antalet
//
// Maskinen lagrade `antal=10` på Premium-raden: 2 102,90 ÷ 210,29. Modellen utförde finansiell
// aritmetik (regel 2), och talet gick inte att skilja från ett avläst.
//
// VARFÖR DET ÄR ETT PENGAFEL. Mätt genom produktionskedjan:
//   quantity = null (ärligt) → computeLikeForLikeSaasTarget returnerar null → inget byte, ingen avgift
//   quantity = 10 (härlett)  → grinden ÖPPNAS · suggested 79 955 byggs · avgiften räknas på den
//   om sanningen vore 8      → 5 047 kr «besparing» → 1 009 kr i vår success fee
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   UTLÖSER larmet: ett antal som INTE står på radens egen rad i dokumentets textlager. Är det
//     dessutom exakt belopp ÷ à-pris namnges det `harledd` — modellen räknade. Annars `ovittnad`.
//   UTLÖSER DET INTE: ett antal som står tryckt på raden (`avlast`), och ingenting alls när
//     textlagret saknas — då svarar modulen `ovittnesbar`, ett EGET tillstånd som varken påstår
//     avläst eller härlett. Den frågan är den bärande: vakten får ALDRIG förväxla «jag kunde inte
//     mäta» med «jag mätte och fann ett fel».
//   BLIND: textlagret bevisar att siffran står på RADEN, aldrig att den står i ANTAL-KOLUMNEN.
//     Ett artikelnummer eller ett datum med samma siffra vittnar falskt. Samma blindfläck som
//     fakturanummergrinden deklarerar, accepterad av samma skäl: ett falskt vittne kräver en
//     sammanträffande siffra på samma rad, medan en fabrikation utan vittne fångas alltid.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { klassaKvantitet, markKvantiteter, farBaraPengar, PROVENIENS } from '../lib/kvantitetsvittne.js';
import { computeLikeForLikeSaasTarget } from '../agents/recommender/recommend.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const TIERS = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;

// Grundarens faktura, ordagrant ur PDF:ens content stream.
const PAPPRET = [
  '=================================================',
  'FAKTURA',
  'Leverantor: Microsoft Ireland Operations Ltd',
  'Fakturanummer: MS-883391',                 // pastaende-ok: fakturanummer ur pappret, inget test-ID
  'Datum: 2026-09-07',
  '-------------------------------------------------',
  'Artikelnr    Beskrivning                              Antal   A-pris    Belopp',
  'MS-PREM      Microsoft 365 Business Premium                   210.29    2 102.90',
  'MS-E3        Office 365 E3                            12      380.00    4 560.00',
  '-------------------------------------------------',
  'Moms (25%): 1 665.73 SEK',
  'Att betala: 8 331.63 SEK',
].join('\n');

describe('KV · Ett antal som modellen räknade fram får inte driva pengar', () => {
  test('KV-01 · grundarens faktura: 10 är härlett, 12 är avläst', () => {
    // Det EXAKTA fallet, med känt facit ur pappret. Premium-radens Antal-kolumn är tom.
    const prem = klassaKvantitet({
      description: 'Microsoft 365 Business Premium', quantity: 10, unitPrice: 210, amount: 2103,
      dokumenttext: PAPPRET,
    });
    assert.equal(prem.proveniens, PROVENIENS.HARLEDD,
      'talet står inte på raden och är exakt belopp ÷ à-pris — modellen räknade');
    assert.equal(prem.farPengar, false);

    const e3 = klassaKvantitet({
      description: 'Office 365 E3', quantity: 12, unitPrice: 380, amount: 4560,
      dokumenttext: PAPPRET,
    });
    assert.equal(e3.proveniens, PROVENIENS.AVLAST, 'antalet 12 STÅR tryckt på sin egen rad');
    assert.equal(e3.farPengar, true);
  });

  test('KV-02 · «jag kunde inte mäta» är ett EGET tillstånd, aldrig ett fynd', () => {
    // Den bärande frågan ur vaktkontraktet. Utan textlager (bild-PDF, 1 av 75 uppmätta) finns
    // inget vittne — och att kalla det «härledd» hade varit att påstå ett fel vi inte sett.
    const utan = klassaKvantitet({ quantity: 10, unitPrice: 210, amount: 2103, dokumenttext: null });
    assert.equal(utan.proveniens, PROVENIENS.OVITTNESBAR);
    assert.notEqual(utan.proveniens, PROVENIENS.HARLEDD, 'omätt får aldrig se ut som ett fynd');
    assert.equal(utan.farPengar, false, 'men det får heller inte bära ett pengapåstående');
    assert.equal(klassaKvantitet({ quantity: 10, dokumenttext: '   ' }).proveniens, PROVENIENS.OVITTNESBAR);

    // Inget antal påstods alls är ett tredje tillstånd.
    assert.equal(klassaKvantitet({ quantity: null, dokumenttext: PAPPRET }).proveniens, PROVENIENS.SAKNAS);
    assert.equal(klassaKvantitet({ quantity: 0, dokumenttext: PAPPRET }).proveniens, PROVENIENS.SAKNAS);
  });

  test('KV-03 · MOTPROVET: en vanlig faktura tystas inte', () => {
    // En spärr som fäller allt är lika värdelös som ingen spärr (OB-23). Fyra normala svenska
    // radformer där antalet står tryckt — alla ska vittnas.
    const fall = [
      ['5    Licens Microsoft 365 Business Standard    160,58    802,90', 5, 802.90, 'Licens Microsoft 365 Business Standard'],
      ['Mobilabonnemang Bas          8 st      299,00      2 392,00', 8, 2392, 'Mobilabonnemang Bas'],
      ['Konsulttimmar             40       1 250,00     50 000,00', 40, 50000, 'Konsulttimmar'],
      ['Licens                  1        4 999,00       4 999,00', 1, 4999, 'Licens'],
    ];
    for (const [rad, antal, belopp, beskrivning] of fall) {
      const d = klassaKvantitet({ quantity: antal, amount: belopp, unitPrice: belopp / antal,
        description: beskrivning, dokumenttext: rad });
      assert.equal(d.proveniens, PROVENIENS.AVLAST, `tystade en normal rad: "${rad}" → ${d.skal}`);
    }
  });

  test('KV-04 · ett decimaltal vittnar aldrig om ett antal', () => {
    // «2 102,90» får inte kunna vittna om antalet 2 (eller 210290). En licensmängd är ett heltal
    // (obduktionen 20 aug), så bara heltalstokens räknas som vittnen.
    // ⚠️ FÖRSTA FALLET PRÖVADE ALDRIG KLAUSULEN. Det sökte antalet 2 i en rad med «210,29» och
    // «2 102,90» — men normaliseringen tar bort avskiljaren, så de blir «21029» och «210290».
    // Ingetdera är «2», alltså passerade testet med eller utan filtret. Sabotaget «ta bort
    // decimalkontrollen» fällde noll, och det var ett fynd om provet, inte om koden.
    //
    // Det bärande fallet är när à-prisets SIFFROR stavar antalet: 250 kopior à 2,50 kr. Utan
    // filtret blir «2,50» → «250» och vittnar falskt om ett antal som inte står tryckt någonstans.
    const rad = 'Kopior svartvitt                 2,50        625,00';
    const d = klassaKvantitet({ quantity: 250, amount: 625, unitPrice: 2.50,
      description: 'Kopior svartvitt', dokumenttext: rad });
    assert.notEqual(d.proveniens, PROVENIENS.AVLAST,
      'à-prisets decimaler får aldrig vittna om ett antal — «2,50» är inte 250 stycken');
    assert.equal(d.proveniens, PROVENIENS.HARLEDD, 'och 625 ÷ 2,50 = 250 → modellen räknade');
  });

  test('KV-05 · märkningen skriver på raderna och räknar utfallet', () => {
    const rader = [
      { description: 'Microsoft 365 Business Premium', quantity: 10, unitPrice: 210, amount: 2103 },
      { description: 'Office 365 E3', quantity: 12, unitPrice: 380, amount: 4560 },
    ];
    const r = markKvantiteter(rader, PAPPRET);
    assert.equal(rader[0].kvantitetProveniens, PROVENIENS.HARLEDD);
    assert.equal(rader[1].kvantitetProveniens, PROVENIENS.AVLAST);
    assert.ok(rader[0].kvantitetSkal.length > 0, 'skälet bärs på raden, inte bara i loggen');
    assert.equal(r.harledd, 1);
    assert.equal(r.avlast, 1);
    // Kvantiteten rörs ALDRIG — modulen klassar, den korrigerar inte.
    assert.equal(rader[0].quantity, 10);
  });

  test('KV-06 · PENGAGRINDEN: en icke-avläst rad blir add-on, inte ett bytesmål', () => {
    // Kärnan. Rad 1 är härledd → den bär sina pengar i baslinjen men får aldrig hävda en
    // besparing. Rad 2 är avläst → den prissätts som förut.
    const rader = [
      { description: 'Microsoft 365 Business Premium', quantity: 10, unitPrice: 210.29, amount: 2102.90,
        type: 'recurring_subscription', kvantitetProveniens: PROVENIENS.HARLEDD },
      { description: 'Microsoft 365 Business Standard', quantity: 12, unitPrice: 180, amount: 2160,
        type: 'recurring_subscription', kvantitetProveniens: PROVENIENS.AVLAST },
    ];
    const lfl = computeLikeForLikeSaasTarget(rader, TIERS, (2102.90 + 2160) * 12);
    assert.deepEqual(lfl.tierLines.map((t) => t.key), ['business-standard'],
      'den härledda raden får inte bli en prissatt tier-rad');
    assert.ok(lfl.addonLines.some((a) => /Business Premium/.test(a.description)),
      'dess pengar ska ändå ligga i baslinjen — fail-open på pipelinen');
  });

  test('KV-07 · ingen märkning = oförändrat beteende (fixturer får inte tystas)', () => {
    // Äldre anropare och hela fixturkorpusen bär ingen märkning. En vakt som tystade dem hade
    // ändrat 2 100 testers innebörd i tysthet.
    const rader = [
      { description: 'Microsoft 365 Business Premium', quantity: 10, unitPrice: 210.29, amount: 2102.90, type: 'recurring_subscription' },
      { description: 'Microsoft 365 Business Standard', quantity: 12, unitPrice: 180, amount: 2160, type: 'recurring_subscription' },
    ];
    const lfl = computeLikeForLikeSaasTarget(rader, TIERS, (2102.90 + 2160) * 12);
    assert.deepEqual(lfl.tierLines.map((t) => t.key).sort(), ['business-premium', 'business-standard']);
  });

  test('KV-08 · PRODUKTIONSVÄGEN märker faktiskt raderna (annars kan grinden aldrig fyra)', async () => {
    // Villkorsvaktens läxa: en mekanism som reagerar korrekt men monteras på en signal som
    // aldrig rör sig är ingen vakt. KV-06 bevisar att grinden SVARAR när den matas; det här
    // provet bevisar att den MATAS. Utan det vore hela modulen ett skuggläge ingen armerat.
    const { readFileSync } = await import('node:fs');
    // ⚠️ VAKTEN LÄSTE KOMMENTARER SOM KOD. Sabotaget kommenterade bort anropet och lämnade
    // strängen kvar — `indexOf` hittade den i kommentaren, och vakten förblev grön medan
    // produktionen slutat mata grinden. Exakt villkorsvaktens sjukdom, i vakten mot den.
    // Kommentarrader strippas nu, samma mönster som DL-09.
    const raKalla = readFileSync(new URL('../api/test-invoice.mjs', import.meta.url), 'utf8');
    // Och kommentaren måste strippas TILL RADSLUT, inte bara på rader som BÖRJAR med «//»:
    // andra sabotaget skrev `const rakning = {...}; // markKvantiteter(...)` och passerade.
    // Två gånger samma miss i samma vakt — ordvakter läser text, och text är listigare än man tror.
    const api = raKalla.split('\n').map((r) => r.replace(/\/\/.*$/, '')).join('\n');
    assert.match(raKalla, /import \{[^}]*\bmarkKvantiteter\b[^}]*\} from '\.\.\/lib\/kvantitetsvittne\.js'/,
      'pipelinen måste importera märkningen');
    const i = api.indexOf('markKvantiteter(extracted.lineItems');
    assert.notEqual(i, -1, 'märkningen måste anropas på de extraherade raderna');
    // Och den måste ske FÖRE rekommendationen — annars når märkningen aldrig pengagrinden.
    const j = api.indexOf('recommend(');
    assert.ok(j === -1 || i < j, 'märkningen måste ske före recommend(), annars är den verkningslös');
  });

  test('KV-09 · farBaraPengar släpper igenom EXAKT ett tillstånd', () => {
    // Invarianten över hela fältet, inte ett stickprov: bara `avlast` får bära ett pengapåstående.
    const alla = Object.values(PROVENIENS);
    assert.deepEqual(alla.filter(farBaraPengar), [PROVENIENS.AVLAST]);
    assert.equal(farBaraPengar(undefined), false);
    assert.equal(farBaraPengar('nagot-nytt-lage'), false, 'ett okänt läge får aldrig släppas igenom');
  });
});
