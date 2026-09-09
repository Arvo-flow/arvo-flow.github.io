// tests/fakturakolumner.mjs — KODEN LÄSER ANTALET. MODELLEN GISSAR DET INTE ÅT OSS.
//
// ══ BAKGRUNDEN (2026-09-08) ════════════════════════════════════════════════════════════════
// Grundarens faktura hade en TOM Antal-kolumn på Premium-raden. Maskinen lagrade `antal = 10`
// (= 2 102,90 ÷ 210,29) och det talet öppnar LFL-grinden, bygger `suggestedAnnualCost`, driver
// success fee och blir `agreedPrice` i den BankID-signerade fullmakten.
//
// Mitt FÖRSTA försök var ett vittne: låt modellen gissa, kontrollera gissningen mot textlagret.
// Det revs samma dag — pdfjs lägger varje cell på egen rad, 0 av 75 fakturor hade den radform
// mitt test matade, och en KORREKT faktura tappade 40 842 kr. Det här är inverteringen: med
// koordinaterna går tabellen att återskapa, så koden LÄSER talet i stället för att vittna om det.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   UTLÖSER: att ett antal används utan att stå tryckt i sin kolumn.
//   UTLÖSER INTE: en faktura utan läsbar tabell (`ingen_tabell`) eller en rad vi inte hittade
//     (`rad_ej_funnen`). Det är den BÄRANDE frågan — de betyder «jag kunde inte läsa», och bara
//     `tom_cell` betyder «inget står tryckt». Att slå ihop dem var precis felet som tystade
//     40 842 kr i morse, och de tre måste förbli åtskilda.
//   BLIND: modulen vet att talet står under rubriken «Antal», aldrig att rubriken avser LICENSER.
//     «Antal timmar» ger ett sant tal om fel sak. Att koppla kolumn till produkt är
//     kategoriseringens fråga.
//
// PRÖVAS MOT VERKLIGT pdfjs-UTFALL (KO-03). Handskrivna fixturer bevisar ingenting här — det var
// hela lärdomen.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { extraheraTextlager } from '../lib/pdf-textlager.js';
import {
  lasAntalskolumn, antalForRad, grupperaRader, hittaRubrikrad, korrigeraAntalUrKolumn,
  AVLASNING, arObservation, bevisarTomhet,
} from '../lib/fakturakolumner.js';
import { korpusText } from './korpus.mjs';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PDFS = join(ROT, 'test-pdfs');
const tokensFor = async (namn) =>
  (await extraheraTextlager(readFileSync(join(PDFS, `${namn}.pdf`)))).tokens;

describe('FK · Koden läser antalet ur fakturans egen kolumn', () => {
  test('FK-01 · GRUNDSANNINGEN: microsoft.pdf trycker 57, och 57 läses', async () => {
    // Precis det tal mitt förra vittne klassade som fabrikat — och tystade 40 842 kr/år över.
    const tokens = await tokensFor('microsoft');
    const d = antalForRad(tokens, { amount: 15390 });
    assert.equal(d.utfall, AVLASNING.AVLAST);
    assert.equal(d.antal, 57, 'antalet står tryckt i kolumnen och ska läsas därifrån');
    assert.equal(arObservation(d.utfall), true);
    // Och rubrikraden ska ha hittats via KOORDINATER, inte via radordning.
    const tabell = lasAntalskolumn(tokens);
    assert.ok(tabell.rubrik.kolumner.antal > 0, 'Antal-kolumnen måste ha en x-position');
    assert.ok(tabell.rubrik.kolumner.belopp > tabell.rubrik.kolumner.antal,
      'Belopp står till höger om Antal — annars har vi läst fel rad som rubrik');
  });

  test('FK-02 · TRE SKÄL, TRE UTFALL — bara ett får nolla ett antal', async () => {
    // Kärnan, och det som skiljer den här modulen från den rivna. `null` är inte ett svar.
    const tokens = await tokensFor('microsoft');
    assert.equal(antalForRad(tokens, { amount: 999999 }).utfall, AVLASNING.RAD_EJ_FUNNEN,
      'ett belopp som inte finns på fakturan betyder att vi inte hittade raden');
    assert.equal(antalForRad([], { amount: 100 }).utfall, AVLASNING.INGEN_TABELL,
      'utan tabellstruktur har vi inte läst — det är inte samma sak som en tom cell');
    assert.equal(antalForRad(tokens, { amount: 0 }).utfall, AVLASNING.RAD_EJ_FUNNEN);

    // Och BARA tom_cell bevisar tomhet. Blir något av de andra sant här är vi tillbaka i
    // felet som tystade en korrekt faktura.
    for (const u of Object.values(AVLASNING)) {
      assert.equal(bevisarTomhet(u), u === AVLASNING.TOM_CELL, `${u} får inte bevisa tomhet`);
      assert.equal(arObservation(u), u === AVLASNING.AVLAST, `${u} är ingen observation`);
    }
    assert.equal(bevisarTomhet(undefined), false, 'ett okänt utfall bevisar aldrig något');

    // ── RADFRAGMENTET, MOT VERKLIG FAKTURA (atlassian.pdf) ────────────────────────────────
    // Fakturan radbryter en post över tre rader: produktnamnet på en, BELOPPET ENSAMT på en,
    // och beskrivningen med antalet «110» på en tredje. Beloppsmatchningen landar på
    // mittenraden — som bara bär ett tal — och rapporterade `tom_cell`. Men antalet ÄR tryckt.
    //
    // Det är ett FALSKT TOMHETSPÅSTÅENDE, och `tom_cell` är det enda utfall som får nolla ett
    // antal. Hade det stått kvar hade 110 licenser tystats: exakt felet som kostade 40 842 kr
    // i morse. En rad med EN ensam cell är ett fragment, och om ett fragment säger vi inget.
    const atl = await tokensFor('atlassian');
    for (const belopp of [16500, 11000]) {
      const d2 = antalForRad(atl, { amount: belopp });
      assert.equal(d2.utfall, AVLASNING.DELRAD,
        `beloppet ${belopp} står på ett radfragment — att kalla det tom_cell vore ett falskt `
        + 'tomhetspåstående, och tom_cell är det enda som får nolla ett antal');
      assert.equal(bevisarTomhet(d2.utfall), false, 'ett fragment bevisar ingen tomhet');
    }
    // Och antalet FINNS på fakturan — vakten får inte bli grön för att kolumnen är tom överallt.
    const tabell2 = lasAntalskolumn(atl);
    assert.ok(tabell2.rader.some((r) => r.antal === 110),
      'atlassian.pdf trycker 110 i sin Antal-kolumn — utan det prövar testet ingenting');
  });

  test('FK-03 · GRUNDARENS FAKTURA: tom cell ger tom cell, tryckt antal ger talet', async () => {
    // Det exakta fallet, med facit ur PDF:ens råa operatorer: Antal-kolumnen är TOM på
    // Premium-raden, och 12 står tryckt på E3-raden.
    const pdf = readdirSync(PDFS).includes('grundaren-microsoft.pdf')
      ? 'grundaren-microsoft' : null;
    // Fakturan ligger inte i repot (kundpapper hör inte hemma i ett publikt repo). Formen
    // återskapas därför ur samma generator: en rad där Antal-cellen SAKNAS helt, bredvid en
    // där den finns. Det är strukturen som prövas, inte just den filen.
    const tokens = pdf ? await tokensFor(pdf) : [
      { sida: 1, x: 100, y: 550, text: 'Beskrivning' },
      { sida: 1, x: 307, y: 550, text: 'Antal' },
      { sida: 1, x: 480, y: 550, text: 'Belopp' },
      // Rad 1: INGEN cell vid x=307 — Antal-kolumnen är tom.
      { sida: 1, x: 100, y: 500, text: 'Microsoft 365 Business Premium' },
      { sida: 1, x: 480, y: 500, text: '2 102,90' },
      // Rad 2: antalet står tryckt.
      { sida: 1, x: 100, y: 480, text: 'Office 365 E3' },
      { sida: 1, x: 307, y: 480, text: '12' },
      { sida: 1, x: 480, y: 480, text: '4 560,00' },
    ];
    const prem = antalForRad(tokens, { amount: 2102.90 });
    assert.equal(prem.utfall, AVLASNING.TOM_CELL, 'kolumnen finns men cellen är tom');
    assert.equal(prem.antal, null, 'och då fylls luckan ALDRIG — det var hela felet');
    const e3 = antalForRad(tokens, { amount: 4560 });
    assert.equal(e3.utfall, AVLASNING.AVLAST);
    assert.equal(e3.antal, 12);
  });

  test('FK-04 · modulen kan inte HÄRLEDA — tillståndet är omöjligt att representera', async () => {
    // En rad där belopp ÷ à-pris ger ett prydligt heltal, men Antal-cellen är tom. Den gamla
    // modellen hade svarat 10; kolumnläsaren KAN inte, för den räknar aldrig.
    const tokens = [
      { sida: 1, x: 100, y: 500, text: 'Beskrivning' },
      { sida: 1, x: 300, y: 500, text: 'Antal' },
      { sida: 1, x: 400, y: 500, text: 'À-pris' },
      { sida: 1, x: 500, y: 500, text: 'Belopp' },
      { sida: 1, x: 100, y: 460, text: 'Licens' },
      { sida: 1, x: 400, y: 460, text: '210,29' },
      { sida: 1, x: 500, y: 460, text: '2 102,90' },   // 2102,90 / 210,29 = exakt 10
    ];
    const d = antalForRad(tokens, { amount: 2102.90 });
    assert.equal(d.antal, null, 'kvoten är 10 på pricken — och modulen får ändå aldrig svara 10');
    assert.equal(d.utfall, AVLASNING.TOM_CELL);
  });

  test('FK-05 · en decimal är aldrig ett antal, och ett tal utan rubrik läses aldrig', () => {
    const bas = [
      { sida: 1, x: 100, y: 500, text: 'Beskrivning' },
      { sida: 1, x: 300, y: 500, text: 'Antal' },
      { sida: 1, x: 500, y: 500, text: 'Belopp' },
      { sida: 1, x: 100, y: 460, text: 'Rad' },
      { sida: 1, x: 500, y: 460, text: '1 000,00' },
    ];
    // Bråkdel: en licensmängd är ett heltal (obduktionen 20 aug).
    assert.equal(antalForRad([...bas, { sida: 1, x: 300, y: 460, text: '2,5' }],
      { amount: 1000 }).antal, null, 'ett decimaltal är ett extraktionsfel, inte ett antal');
    // Noll och negativa är inga antal heller.
    assert.equal(antalForRad([...bas, { sida: 1, x: 300, y: 460, text: '0' }],
      { amount: 1000 }).antal, null);
    // «5 st» är däremot ett tryckt antal.
    assert.equal(antalForRad([...bas, { sida: 1, x: 300, y: 460, text: '5 st' }],
      { amount: 1000 }).antal, 5);
    // Och ett tal som står LÅNGT från kolumnen hör inte till den.
    assert.equal(antalForRad([...bas, { sida: 1, x: 380, y: 460, text: '9' }],
      { amount: 1000 }).antal, null, 'utanför kolumntoleransen är det en annan kolumn');
  });

  test('FK-06 · en rubrikrad kräver TVÅ kolumner — «Antal» ensamt är löptext', () => {
    // En falsk rubrikrad ger fel x-positioner för HELA dokumentet. Det är det dyraste felet
    // modulen kan göra, så tröskeln är två kolumner och inte en.
    const ensam = grupperaRader([
      { sida: 1, x: 100, y: 500, text: 'Antal artiklar i lager: 40' },
      { sida: 1, x: 100, y: 460, text: 'Något annat' },
    ]);
    assert.equal(hittaRubrikrad(ensam), null, '«Antal …» i löptext är ingen tabell');
    const riktig = grupperaRader([
      { sida: 1, x: 300, y: 500, text: 'Antal' },
      { sida: 1, x: 500, y: 500, text: 'Belopp' },
    ]);
    assert.ok(hittaRubrikrad(riktig), 'Antal + Belopp ÄR en tabellrubrik');
  });

  test('FK-07 · MOT HELA KORPUSEN: läsbarheten är LÅST, inte ungefärlig', async () => {
    // Villkorsvaktens läxa: FK-01..06 bevisar att mekanismen svarar. Det här provet mäter att
    // den svarar på det VERKLIGA fakturor innehåller.
    //
    // ⚠️ FÖRSTA VERSIONEN VAR TANDLÖS (fynd 3, granskningen 8 sep). Trösklarna var `≥55` och
    // `≥150` mot mätvärdena 64 och 187 — alltså 14 % respektive 20 % luft. Sabotaget «strama
    // RUBRIKER.antal till /^antal$/i» tappade tre VERKLIGA fakturor och lämnade hela sviten
    // grön (2 212/2 212). En vakt vars sabotage inte fäller är ingen vakt.
    //
    // Talen är därför EXAKTA. En korpusändring fäller provet med flit: då ska någon mäta om och
    // skriva in det nya talet, inte låta en glidning rymmas i en marginal.
    const filer = readdirSync(PDFS).filter((f) => f.endsWith('.pdf')).sort();
    let medTabell = 0, avlastaRader = 0;
    for (const f of filer) {
      let tokens = [];
      try { ({ tokens } = await extraheraTextlager(readFileSync(join(PDFS, f)))); } catch { /* olasbar */ }
      const t = lasAntalskolumn(tokens);
      if (!t) continue;
      medTabell++;
      avlastaRader += t.rader.filter((r) => r.antal != null).length;
    }
    assert.equal(filer.length, 75,
      'korpusen har ändrats — mät om medTabell och avlastaRader och skriv in de nya talen');
    assert.equal(medTabell, 64,
      `${medTabell} av ${filer.length} fakturor har läsbar tabell (mätt till 64 den 8 sep). `
      + 'Ett fall betyder att rubrikigenkänningen tappat täckning.');
    assert.equal(avlastaRader, 187,
      `${avlastaRader} rader bär ett avläst antal (mätt till 187). Faller detta läser vi färre `
      + 'antal själva och lutar oss mer på modellens gissning — fel riktning.');
  });

  test('FK-07b · VARJE rubrikform bärs av ett prov — inte sex sjundedelar oprövade', async () => {
    // Fynd 3, andra halvan: `RUBRIKER.antal` har SJU alternativ och FK-01..07 prövade bara
    // «Antal». Sex sjundedelar av regexen var alltså oskyddad — och det är precis den halvan
    // som gör att en löptextrad kan bli rubrikrad (fynd 2).
    //
    // ⚠️ FORMERNA STÅR SOM LITERALER, ALDRIG ITERERADE UR RUBRIKER. HK-03:s läxa: ett prov som
    // itererar listan det vaktar mäter listan mot sig själv, och «ta bort ett alternativ» fäller
    // då noll. Varje form nedan är ett självständigt ankare.
    for (const rubrik of ['Antal', 'Ant.', 'St', 'Styck', 'Mängd', 'Qty', 'Quantity']) {
      const rader = grupperaRader([
        { sida: 1, x: 300, y: 500, text: rubrik },
        { sida: 1, x: 500, y: 500, text: 'Belopp' },
      ]);
      assert.ok(hittaRubrikrad(rader), `«${rubrik}» måste kännas igen som Antal-kolumn`);
    }

    // Och tre VERKLIGA fakturor vars rubrik INTE är ordet «Antal» ensamt. De är beviset att
    // formerna bär i produktion och inte bara i en handskriven rad — sabotaget S7 tappade
    // exakt dessa tre, och två av dem åberopade jag själv som grundsanning i commit-meddelandet.
    for (const [namn, varfor] of [
      ['cloudreseller-norden', '«Antal / Period» — CR-88412, prorata-fakturan'],
      ['nordiclogistik',       '«Antal/Vikt»'],
      ['bredband_3',           '«Mängd»'],
    ]) {
      assert.ok(lasAntalskolumn(await tokensFor(namn)),
        `${namn} (${varfor}) tappade sin tabell — rubrikigenkänningen har krympt`);
    }
  });

  test('FK-09 · PRODUKTIONSVÄGEN läser kolumnen FÖRE härledningen och låter pappret vinna', async () => {
    // Villkorsvaktens läxa: FK-01..07 bevisar att mekanismen svarar. Det här provet bevisar att
    // den MATAS — och att den är en KORRIGERING, inte en grind. Utan det sista kravet kunde
    // någon göra om den till ett veto, och då är vi tillbaka i morgonens 40 842-kronorsfel.
    //
    // ⚠️ OCH DEN MÅSTE KÖRA I RÄTT ORDNING (fynd 4, granskningen 8 sep). Loopen låg i api-lagret
    // EFTER `extractInvoice()`, som härleder `seatCount` ur `l.quantity` inne i sig. Talet
    // räknades aldrig om — i exakt de fall läsaren fyrade bar svaret två tal som inte gick att
    // addera. ORDNINGEN är fixen, alltså är ordningen det provet mäter.
    const { readFileSync } = await import('node:fs');
    const raEx = readFileSync(new URL('../agents/test-invoice/extract.js', import.meta.url), 'utf8');
    const ex = raEx.split('\n').map((r) => r.replace(/\/\/.*$/, '')).join('\n');
    const api = readFileSync(new URL('../api/test-invoice.mjs', import.meta.url), 'utf8')
      .split('\n').map((r) => r.replace(/\/\/.*$/, '')).join('\n');

    assert.match(raEx, /import \{ korrigeraAntalUrKolumn \} from '\.\.\/\.\.\/lib\/fakturakolumner\.js'/,
      'extraktionen måste låna läsaren — en lokal kopia kan glida isär (regel 1)');
    assert.match(ex, /\{ text: _textlager, tokens: _tokens \} = await extraheraTextlager\(pdfBytes\)/,
      'koordinaterna måste plockas ur samma parse som texten (FK-08)');
    assert.match(ex, /aggregateLineItems\(toolUseBlock\.input, _tokens\)/,
      'dokumentets tokens måste NÅ FRAM till aggregeringen — annars läser den ingenting');

    // ⚠️ HÄR STOD ETT INDEXPROV, OCH DET VAR GRÖNT PÅ FEL GRUND. Första rättningen av fynd 4
    // anropade korrigeringen i `extractInvoice` före `aggregateLineItems` och lät `indexOf`
    // vakta ordningen. Sabotaget «flytta tillbaka anropet» fällde NOLL tester: indexOf hittar
    // den första TEXTFÖREKOMSTEN, även en som ligger i en död gren. En källtextvakt kan inte se
    // exekveringsordning. Ordningen är därför strukturell — korrigeringen är första steget INNE
    // i `aggregateLineItems` — och bevisas av FK-11, som är ett beteendeprov.
    //
    // Det som ÄR en källtextfråga: att inget lager har kvar en egen kopia av loopen.
    assert.doesNotMatch(api, /antalForRad\s*\(/,
      'api-lagret ska inte läsa kolumnen själv — korrigeringen bor i aggregeringen');
    assert.doesNotMatch(ex, /korrigeraAntalUrKolumn\([^)]*toolUseBlock/,
      'en andra korrigering i extractInvoice vore två sanningar om samma radposter');

    // Och api-lagret får inte ha kvar en kopia av loopen: två korrigeringar är två sanningar,
    // och den som ändras är inte nödvändigtvis den som kör.
    assert.doesNotMatch(api, /antalForRad\s*\(/,
      'api-lagret ska inte längre läsa kolumnen själv — korrigeringen bor i extraktionen');

    // KORRIGERING, INTE GRIND: bara `avlast` får röra talet, och inget utfall får nolla det.
    const FK = readFileSync(new URL('../lib/fakturakolumner.js', import.meta.url), 'utf8')
      .split('\n').map((r) => r.replace(/\/\/.*$/, '')).join('\n');
    assert.match(FK, /d\.utfall !== AVLASNING\.AVLAST\) continue/,
      'endast ett AVLÄST antal får ändra kundens tal');
    assert.doesNotMatch(FK, /l\.quantity = null|quantity = null/,
      'ingen gren får NOLLA ett antal — det tystade en korrekt faktura i morse (KV-06)');
  });

  test('FK-10 · TOMHET ÄR INTE OFÖRMÅGA — mätt mot hela korpusen', async () => {
    // ══ FYND 1 (granskningen 8 sep) ═══════════════════════════════════════════════════════
    // `antal: null` sattes när cellen var TOM eller när `heltal()` inte kunde läsa den, och
    // BÅDA mappades till `tom_cell` — det enda utfall som är dokumenterat som «bevisar tomhet».
    // Vi påstod alltså «inget står tryckt» om rader där antalet stod tryckt.
    //
    // MÄTT genom antalForRad över korpusens alla cellstal, EFTER splitten:
    //     avlast 447 · olasbar_cell 70 · tom_cell 5 · delrad 2
    // Alltså: 70 av 75 tidigare «bevisade tomheter» (93 %) var i själva verket «jag läste inte».
    const fall = [
      // CR-88412 — prorata-fakturan hela LFL-fixen vilar på. Fyra rader, alla med antalet
      // TRYCKT i kolumncellen, alla tidigare deklarerade som bevisad tomhet.
      ['cloudreseller-norden', 11025, '45 st (1 Maj - 31 Maj)'],
      ['cloudreseller-norden', 2700,  '20 st (1 Maj - 31 Maj)'],
      ['cloudreseller-norden', 612.5, '5 st (16 Maj - 31 Maj, 15 dgr)'],
      // Och den rad vars grundsanning jag skrev FEL i commit-meddelandet: jag påstod
      // «kolumncellen ÄR tom». Dumpen säger x305:«45 pallar (Zon 1-3)». Ett påstående skrivet
      // före körning, i den commit som bär vakten mot precis den formen (Bevisplikten p.1).
      ['nordiclogistik', 18500, '45 pallar (Zon 1-3)'],
      ['nordiclogistik', 7639.6, '28,4 %'],
      ['bredband_3', 899, '1 mån'],
    ];
    for (const [namn, belopp, text] of fall) {
      const d = antalForRad(await tokensFor(namn), { amount: belopp });
      assert.equal(d.utfall, AVLASNING.OLASBAR_CELL,
        `${namn}/${belopp}: cellen bär «${text}» — att kalla det tom_cell är ett falskt `
        + 'tomhetspåstående, och tom_cell är det enda utfall som får nolla ett antal');
      assert.equal(d.cellText, text, 'skälet ska gå att LÄSA, inte gissas ur ett utfallsnamn');
      assert.equal(bevisarTomhet(d.utfall), false, 'en oläsbar cell bevisar ingen tomhet');
      assert.equal(d.antal, null, 'och den fyller ALDRIG luckan — det var hela felet');
    }

    // MOTPROVET: en verkligt tom cell måste fortfarande ge tom_cell. En split som gör tom_cell
    // omöjligt vore lika fel som den som gjorde det oundvikligt — då hade vi bara flyttat
    // lögnen till andra sidan.
    const tomma = [
      { sida: 1, x: 100, y: 500, text: 'Beskrivning' },
      { sida: 1, x: 300, y: 500, text: 'Antal' },
      { sida: 1, x: 500, y: 500, text: 'Belopp' },
      { sida: 1, x: 100, y: 460, text: 'Licens' },       // ingen cell vid x=300
      { sida: 1, x: 500, y: 460, text: '1 000,00' },
    ];
    const t = antalForRad(tomma, { amount: 1000 });
    assert.equal(t.utfall, AVLASNING.TOM_CELL, 'ingen cell på kolumnens x ÄR bevisad tomhet');
    assert.equal(bevisarTomhet(t.utfall), true);

    // OCH VI VIDGAR ALDRIG heltal() FÖR ATT SLIPPA UTFALLET. «45 st (…)» bär ett avläsbart 45 —
    // men samma vidgning gör «3 mån» till 3 och «12400 GB» till 12 400, alltså ett licensantal
    // ur en månad respektive ett datamått. Hellre ett ärligt «jag kunde inte läsa».
    for (const [namn, belopp] of [['bredband_4', 1497], ['aws-startup-kredit', 310]]) {
      const d = antalForRad(await tokensFor(namn), { amount: belopp });
      assert.notEqual(d.utfall, AVLASNING.AVLAST,
        `${namn}: en enhet som inte räknar användare får aldrig bli ett antal`);
    }
  });

  test('FK-11 · KEDJAN: pappret vinner HELA vägen fram till seatCount', async () => {
    // ⚠️ ETT TEST SOM MATAR SITT EGET INDATA BEVISAR BARA VIDAREBEFORDRAN (holdings.mjs 19 aug,
    // RO-01 24 aug). Provet kör därför hela kedjan: modellens råa radposter → korrigeringen →
    // `aggregateLineItems`, som är där `seatCount` faktiskt härleds. Utan sista ledet kunde
    // fynd 4 komma tillbaka utan att någon vakt sa ifrån.
    const { aggregateLineItems } = await import('../agents/test-invoice/extract.js');
    const tokens = await tokensFor('microsoft');

    // Modellens fel, ordagrant som grundarens faktura: kvoten i stället för det tryckta talet.
    const raw = {
      supplier: 'Microsoft', seatCount: 10,
      lineItems: [
        { description: 'Microsoft 365 Business Premium', type: 'recurring_subscription',
          quantity: 10, amount: 15390 },
        { description: 'Molnbackup för Microsoft 365 - Användarlicens',
          type: 'recurring_subscription', quantity: 10, amount: 2280 },
      ],
    };
    const utan = aggregateLineItems(JSON.parse(JSON.stringify(raw)), null);
    assert.equal(utan.seatCount, 10, 'utan dokument härleds seatCount ur modellens tal');

    // ANDRA ARGUMENTET ÄR OBLIGATORISKT. En anropare som glömmer det ska SMÄLLA, inte tyst
    // hoppa över korrigeringen — ett fält som inte läses är omöjligt att skilja från ett fält
    // som inte fanns (RO-08). Det var precis så fynd 4 kunde uppstå.
    assert.throws(() => aggregateLineItems(JSON.parse(JSON.stringify(raw))), /obligatoriskt/,
      'en utelämnad tokens-parameter måste kasta, aldrig godtas som «inget dokument»');

    const r = korrigeraAntalUrKolumn(JSON.parse(JSON.stringify(raw)).lineItems, tokens);
    assert.equal(r.avlast, 2, 'båda raderna står tryckta i kolumnen');
    assert.equal(r.oeniga, 2, 'och båda motsäger modellen');

    // KEDJAN, i ETT anrop — precis den väg produktionen går. Flyttas korrigeringen efter
    // `applyDeterministicRules` inne i funktionen räknas seatCount på modellens 10 och det här
    // provet fäller. Det är skillnaden mot indexprovet som var grönt på fel grund.
    const med = aggregateLineItems(raw, tokens);
    assert.equal(med.seatCount, 57,
      'pappret trycker 57 — och seatCount MÅSTE följa med, annars bär svaret två tal som inte '
      + 'går att addera (fynd 4: jamforelseSkala, supplier_prices och contract_timelines matas '
      + 'av just det talet)');
    for (const l of med.lineItems) assert.equal(l.quantity, 57, 'radposterna bär samma sanning');
    assert.equal(med.lineItems[0].antalKalla, AVLASNING.AVLAST, 'proveniensen följer med raden');
  });

  test('FK-12 · FAIL-OPEN PÅ PIPELINEN: ett oläsbart textlager tappar aldrig analysen', async () => {
    // Gränsen är densamma som för fakturanumret: fail-closed för FÄLTET, fail-open för
    // PIPELINEN. En faktura får aldrig gå förlorad för att en förbättring inte gick att göra.
    // Påståendet stod som en KOMMENTAR i extract.js utan bevis — påståendevakten fällde det,
    // och den hade rätt: en kommentar som garanterar ett beteende är värre än ingen, för nästa
    // läsare kontrollerar den inte (Atea-kortets läxa, 22 aug).
    const { aggregateLineItems } = await import('../agents/test-invoice/extract.js');
    const raw = () => ({
      supplier: 'Microsoft', seatCount: 10, billingPeriod: 'monthly', confidenceScore: 0.9,
      lineItems: [{ description: 'M365 Business Premium', type: 'recurring_subscription',
        quantity: 10, amount: 15390 }],
    });
    // De två sätt textlagret kan misslyckas på: parsen kastade (tokens = []), eller dokumentet
    // finns inte alls (null). Båda måste ge en HEL analys, bara utan korrigeringen.
    for (const [namn, tokens] of [['parsen kastade', []], ['inget dokument', null]]) {
      const r = aggregateLineItems(raw(), tokens);
      assert.equal(r.annualCost, 15390 * 12, `${namn}: analysen måste vara hel`);
      assert.equal(r.seatCount, 10, `${namn}: modellens tal står kvar — vi tystar inget`);
      assert.equal(r.lineItems[0].quantity, 10, `${namn}: raden bär kvar sitt antal`);
      assert.equal(r.lineItems[0].antalKalla, null,
        `${namn}: och proveniensen säger ärligt att läsaren aldrig kördes`);
    }
    // MOTPROVET: med tokens SKA den korrigera. Utan det kunde fail-open-provet bli grönt av att
    // korrigeringen är avstängd överallt.
    const med = aggregateLineItems(raw(), await tokensFor('microsoft'));
    assert.equal(med.seatCount, 57, 'med dokument vinner pappret — annars mäter provet tomhet');
  });

  test('FK-14 · en löptextrad blir aldrig rubrikrad — och skadan är mätt', async () => {
    // ══ GRANSKNINGENS FYND 2 (8 sep), STÄNGT 9 sep ═══════════════════════════════════════════
    // `RUBRIKER.antal` matchar `/^st\b/i`, `belopp` matchar `/^summa\b/i`. En adressrad plus en
    // slutsumma på samma y godtogs därför som tabellhuvud, positionskolumnen «Pos» blev
    // Antal-kolumn, och E3-raden lästes som 1 där pappret trycker 40. Bytesmålet kollapsar 97 %
    // och ARVODET STIGER 46 396 kr — åt vårt eget håll. Det är den riktning bibeln kallar
    // farligast under 20 % success fee.
    const bygg = (a, b) => grupperaRader([
      { sida: 1, x: 70, y: 700, text: a },
      { sida: 1, x: 400, y: 700, text: b },
    ]);
    for (const [a, b, varfor] of [
      ['St Eriksgatan 4', 'Summa att betala', 'gatuadress med nummer'],
      ['Antal anställda: 45', 'Total', 'brödtext som börjar med Antal'],
      ['Styckegods 120 kolli', 'Summa', 'radbeskrivning som börjar med Styck'],
      ['St. Olofsgatan 12 B', 'Totalt', 'förkortad adress med nummer'],
      // ⚠️ LÄNGDGRÄNSEN FÖRTJÄNADE INTE SIN PLATS FÖRRÄN HÄR. Sabotaget «ta bort ≤ 20» fällde
      // NOLL tester — sifferregeln gjorde hela jobbet, och en gren som inget skyddar är precis
      // den sortens vakt bibeln säger ska tas bort eller förtjäna sin plats. Den här raden är
      // skälet den får stanna: en fotnot som BÖRJAR med ett rubrikord men är löptext, utan en
      // enda siffra. Korpusens längsta verkliga etikett är 14 tecken; 20 är mätt marginal.
      ['Antal enheter specificeras i bilaga', 'Summa exklusive mervärdesskatt', 'lång fotnot utan siffror'],
    ]) {
      assert.equal(hittaRubrikrad(bygg(a, b)), null,
        `«${a}» + «${b}» (${varfor}) godtogs som tabellhuvud — en falsk rubrik gör en `
        + 'positionskolumn till Antal-kolumn och höjer arvodet på kundens bekostnad');
    }

    // MOTPROVET, och det är det som gör provet till en vakt: varje VERKLIG rubrikform måste
    // passera. En regel som dödar löptext men också tabellen är värre än ingen regel.
    for (const rubrik of ['Antal', 'ANTAL', 'Antal / Period', 'Antal/Vikt', 'Mängd', 'St', 'Qty']) {
      assert.ok(hittaRubrikrad(bygg(rubrik, 'Belopp')),
        `«${rubrik}» är en verklig rubrikform i korpusen och måste kännas igen`);
    }
    // Och de tre verkliga fakturor vars rubrik inte är ordet «Antal» ensamt — CR-88412 bland dem.
    for (const namn of ['cloudreseller-norden', 'nordiclogistik', 'bredband_3', 'bredband_2_sveakom']) {
      assert.ok(lasAntalskolumn(await tokensFor(namn)),
        `${namn} tappade sin tabell — etikettregeln är för snäv`);
    }
  });

  test('FK-13 · råtexten kan inte läcka genom en spridning eller en serialisering', async () => {
    // `textlager` är hela fakturans text, `tokens` varje positionerat fragment — kundens
    // dokument i klartext, på ett objekt som skickas runt i hela pipelinen. Varje konsument
    // bygger i dag en vitlista, så ingenting läcker. Men ett enda framtida `{ ...extracted }`
    // eller `JSON.stringify(extracted)` hade tagit med hela fakturan, i loggar som läses ur ett
    // PUBLIKT repo. Fälten är därför icke-uppräkningsbara: direkt åtkomst fungerar, men de kan
    // inte råka följa med.
    //
    // ⚠️ PROVET FÅR INTE MÄTA MIN EGEN FUNKTION MOT SIG SJÄLV. Vi bygger objektet med SAMMA
    // konstruktion som produktionen och prövar det utifrån — de tre vägar en läcka faktiskt
    // tar: spridning, JSON, och Object.keys (loggning).
    const HEMLIG = 'Fakturamottagare: Exempelbolaget AB · Org 556000-0000';
    const ex = { supplier: 'X', annualCost: 1000 };
    for (const [namn, varde] of [['textlager', HEMLIG], ['tokens', [{ x: 1, y: 2, text: HEMLIG }]]]) {
      Object.defineProperty(ex, namn, { value: varde, enumerable: false, writable: true, configurable: true });
    }
    assert.equal(ex.textlager, HEMLIG, 'den som FRÅGAR efter texten ska få den');
    assert.equal(ex.tokens.length, 1, 'och tokens likaså — pipelinen behöver dem');
    assert.doesNotMatch(JSON.stringify({ ...ex }), /Exempelbolaget/,
      'en spridning får aldrig ta med råtexten');
    assert.doesNotMatch(JSON.stringify(ex), /Exempelbolaget/,
      'en serialisering får aldrig ta med råtexten — det är loggvägen');
    assert.deepEqual(Object.keys(ex), ['supplier', 'annualCost'],
      'och den syns inte för den som räknar upp fälten');

    // Och att produktionen FAKTISKT bygger objektet så. Utan den här raden prövar provet bara
    // att JavaScript fungerar — villkorsvaktens sjukdom i miniatyr.
    const { readFileSync } = await import('node:fs');
    const ex2 = readFileSync(new URL('../agents/test-invoice/extract.js', import.meta.url), 'utf8');
    assert.match(ex2, /\[\['textlager', _textlager\], \['tokens', _tokens\]\]/,
      'extractInvoice måste dölja BÅDA fälten');
    assert.match(ex2, /enumerable: false/, 'och dölja dem genom att göra dem ouppräkningsbara');
    assert.doesNotMatch(ex2.replace(/\/\/.*$/gm, ''), /^\s*textlager: _textlager,\s*$/m,
      'de får inte ligga som vanliga fält på returobjektet');
  });

  test('FK-08 · texten och koordinaterna kommer ur SAMMA parse', async () => {
    // Två parses vore två sanningar, och den som ändras är inte nödvändigtvis den som läses.
    // Textlagret i korpusen och tokens måste beskriva samma dokument.
    const r = await extraheraTextlager(readFileSync(join(PDFS, 'microsoft.pdf')));
    assert.ok(Array.isArray(r.tokens) && r.tokens.length > 0, 'tokens måste följa med texten');
    const korpus = korpusText('microsoft');
    for (const t of r.tokens.slice(0, 10)) {
      assert.ok(korpus.includes(t.text),
        `token «${t.text}» finns inte i det frysta textlagret — de beskriver olika dokument`);
    }
  });
});
