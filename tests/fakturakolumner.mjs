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
  lasAntalskolumn, antalForRad, grupperaRader, hittaRubrikrad,
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

  test('FK-07 · MOT HELA KORPUSEN: läsbarheten är mätt, inte gissad', async () => {
    // Villkorsvaktens läxa: FK-01..06 bevisar att mekanismen svarar. Det här provet mäter att
    // den svarar på det VERKLIGA fakturor innehåller — och låser talet, så att en framtida
    // ändring som halverar täckningen inte kan passera som grön svit.
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
    assert.ok(filer.length >= 70, 'korpusen måste vara fylld — annars mäter provet tomhet');
    assert.ok(medTabell >= 55,
      `bara ${medTabell} av ${filer.length} fakturor har läsbar tabell (mätt till 64 den 8 sep). `
      + 'Ett kraftigt fall betyder att rubrikigenkänningen tappat täckning.');
    assert.ok(avlastaRader >= 150,
      `bara ${avlastaRader} rader bär ett avläst antal (mätt till 187). Faller detta läser vi `
      + 'färre antal själva och lutar oss mer på modellens gissning — fel riktning.');
  });

  test('FK-09 · PRODUKTIONSVÄGEN läser kolumnen och låter pappret vinna', async () => {
    // Villkorsvaktens läxa: FK-01..07 bevisar att mekanismen svarar. Det här provet bevisar att
    // den MATAS — och att den är en KORRIGERING, inte en grind. Utan det sista kravet kunde
    // någon göra om den till ett veto, och då är vi tillbaka i morgonens 40 842-kronorsfel.
    const { readFileSync } = await import('node:fs');
    const ra = readFileSync(new URL('../api/test-invoice.mjs', import.meta.url), 'utf8');
    const api = ra.split('\n').map((r) => r.replace(/\/\/.*$/, '')).join('\n');

    assert.match(ra, /import \{[^}]*\bantalForRad\b[^}]*\} from '\.\.\/lib\/fakturakolumner\.js'/,
      'pipelinen måste låna läsaren');
    assert.match(api, /antalForRad\(_tokens/, 'läsaren måste faktiskt anropas på dokumentets tokens');
    assert.match(api, /l\.quantity = d2\.antal/, 'ett avläst antal måste ERSÄTTA modellens tal');

    // Och tokens måste nå fram — utan dem läser den ingenting och blir tyst i tysthet.
    assert.match(api, /tokens: _tokens \} = await extraheraTextlager/,
      'koordinaterna måste plockas ur samma parse som texten');

    // KORRIGERING, INTE GRIND: bara `avlast` får röra talet, och inget utfall får nolla det.
    assert.match(api, /d2\.utfall !== AVLASNING\.AVLAST\) continue/,
      'endast ett AVLÄST antal får ändra kundens tal');
    assert.doesNotMatch(api, /l\.quantity = null|quantity = null/,
      'ingen gren får NOLLA ett antal — det tystade en korrekt faktura i morse (KV-06)');
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
