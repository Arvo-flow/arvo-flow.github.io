// tests/antalsdoktrinen.mjs — ETT ANTAL ÄR EN AVLÄSNING, ELLER SÅ FINNS DET INTE.
//
// ══ GRUNDARBESLUT 2026-09-09 ═══════════════════════════════════════════════════════════════
// Frågan grundaren ställde: *«får systemet någonsin räkna baklänges (Belopp ÷ À-pris = Antal)
// när Antal-kolumnen är tom, eller är det ett absolut brott mot fail-closed?»*
//
// SVARET ÄR NEJ, OCH DET ÄR MÄTT — inte tyckt.
//
// `scripts/probe-bakatrakning.mjs` körde bakåträkning på varje rad i de 75 verkliga fakturorna
// där kolumnläsaren INTE fick ut ett antal och där raden bär minst två tal:
//
//     rader utan avläst antal, med ≥2 tal:            23
//     varav bakåträkning ger ett RENT heltal:         18   (78 %)
//     varav heltalet faktiskt ÄR ett antal enheter:    0   (0 %)
//
// Metoden fyrar alltså på fyra rader av fem — och har noll träffsäkerhet på exakt de rader den
// fyrar. Varenda «antal» den producerar är en gigabyte, en månad eller en terabyte:
//
//     aws-startup-kredit       310 ÷ 0,025  = 12 400   → «12,4 TB», inte 12 400 licenser
//     bredband_4             1 947 ÷ 649    =      3   → «3 mån»
//     telenor-molnvaxel-stor   539,60 ÷ 28,40 =   19   → 19 kr/GB … av 28,4 GB
//
// DEN SISTA ÄR HELA ARGUMENTET. Divisionen kan inte veta vilket av de två talen som är MÄNGDEN.
// På roamingrader står datamängden i Antal-kolumnen och priset i À-pris-kolumnen, så kvoten ger
// tillbaka PRISET (19 kr/GB) och kallar det ett antal. Aritmetiken är exakt; tolkningen är
// inverterad. Ett tal som är matematiskt korrekt och semantiskt omvänt är den farligaste sortens
// fel vi har — det bär precisionens auktoritet och går inte att skilja från en avläsning.
//
// Det är obduktionens felfamilj i sin renaste form: ett tillstånd som betyder «kolumnen sa
// ingenting» representerat med ett fullt giltigt heltal. Och det talet öppnar LFL-grinden,
// bygger `suggestedAnnualCost`, driver success fee och blir `agreedPrice` i den BankID-signerade
// fullmakten.
//
// ── DOKTRINEN ─────────────────────────────────────────────────────────────────────────────
//   1. Ett antal får bara komma ur en AVLÄSNING: fakturans egen Antal-kolumn (`avlast`) eller
//      modellens observation av samma kolumn. Aldrig ur en division.
//   2. Ett bakåträknat tal får ALDRIG driva `seatCount`, jämförelsegolvet, ett bytesmål, ett
//      arvode eller en fullmakt.
//   3. Den aritmetiska identiteten får SÄGAS som ett påstående om TALEN («2 102,90 = 10 ×
//      210,29»), aldrig som ett påstående om ANTALET. Skillnaden är inte kosmetisk: det första
//      är en observation vi kan belägga, det andra en gissning om en enhet vi inte läst.
//   4. Tystnaden är svaret. `tom_cell` betyder att inget står tryckt; det är ett resultat, inte
//      en lucka att fylla. Fail-closed på FÄLTET, fail-open på pipelinen — fakturan analyseras
//      vidare utan att bära ett antal.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   UTLÖSER: att någon i lib/, api/ eller agents/ dividerar ett belopp med ett à-pris och låter
//     resultatet bli en kvantitet, ett seat-tal eller ett licensantal.
//   UTLÖSER INTE: division MED ett antal (`årskostnad / seats`) — det är att räkna pris per
//     enhet ur ett känt antal, doktrinens motsatta och tillåtna riktning. Inte heller en
//     kommentar som DISKUTERAR bakåträkning; vakten läser kod, inte prosa.
//   BLIND, uttalat: vakten läser ORD, aldrig innebörd. En bakåträkning skriven med mellanled
//     (`const k = a; const n = k / p;`) eller via en beräknad nyckel syns inte. Den flyttar
//     bevisbördan till något en granskare kan slå upp — den bär den inte. Det verkliga skyddet
//     är att kolumnläsaren aldrig FYLLER ett antal (AD-03), och det är ett beteendeprov.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { antalForRad, korrigeraAntalUrKolumn, AVLASNING, bevisarTomhet } from '../lib/fakturakolumner.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

function jsFiler(katalog, ut = []) {
  for (const namn of readdirSync(katalog)) {
    const p = join(katalog, namn);
    if (statSync(p).isDirectory()) { jsFiler(p, ut); continue; }
    if (/\.(js|mjs)$/.test(namn)) ut.push(p);
  }
  return ut;
}

/** Källtext utan kommentarer — en kommentar som NÄMNER en division är inte en division. */
const kod = (s) => s.split('\n').map((r) => r.replace(/\/\/.*$/, '')).join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '');

describe('AD · Antalsdoktrinen — ett antal är en avläsning, eller så finns det inte', () => {
  test('AD-01 · ingen dividerar ett belopp med ett à-pris', () => {
    // Formen doktrinen förbjuder. `// antal-ok: <skäl>` på raden är den motiverade utvägen,
    // samma mönster som claims-audit och kopidetektorn — en vakt utan utväg kringgås med
    // --no-verify, och då är den sämre än ingen.
    const FORBJUDET = /\/\s*\(?\s*(?:l|rad|item|line)?\.?(?:unitPrice|unit_price|aPris|apris|unitPriceOre|aprisOre)\b/;
    const traffar = [];
    for (const katalog of ['lib', 'api', 'agents']) {
      for (const fil of jsFiler(join(ROT, katalog))) {
        const rader = readFileSync(fil, 'utf8').split('\n');
        rader.forEach((rad, i) => {
          const ren = rad.replace(/\/\/.*$/, '');
          if (!FORBJUDET.test(ren)) return;
          if (/antal-ok:/.test(rad)) return;
          traffar.push(`${relative(ROT, fil)}:${i + 1} — ${rad.trim().slice(0, 90)}`);
        });
      }
    }
    assert.deepEqual(traffar, [],
      'bakåträkning av ett antal ur belopp ÷ à-pris. Mätt på korpusen: metoden fyrar på 18 av '
      + '23 rader och har noll rätt — den ger tillbaka PRISET och kallar det ett antal '
      + '(539,60 ÷ 28,40 = 19 kr/GB, av 28,4 GB). Motivera med `// antal-ok: <skäl>` om raden '
      + 'gör något annat.');
  });

  test('AD-02 · den TILLÅTNA riktningen är orörd — pris per känd enhet', () => {
    // En vakt som förbjuder allt är lika värdelös som ingen vakt (OB-23:s motprov). Att räkna
    // `årskostnad / seats` är doktrinens MOTSATTA riktning: ett känt antal används för att
    // härleda ett pris. Den ska inte fällas, och att den inte fälls måste prövas — annars vet
    // ingen om AD-01 är snäv eller bara tyst.
    const FORBJUDET = /\/\s*\(?\s*(?:l|rad|item|line)?\.?(?:unitPrice|unit_price|aPris|apris|unitPriceOre|aprisOre)\b/;
    assert.equal(FORBJUDET.test('const pris = annualCost / seats / 12;'), false,
      'pris per känd enhet är tillåtet och måste förbli det');
    assert.equal(FORBJUDET.test('const perEnhet = gap / platser / 12;'), false);
    // Och att den FAKTISKT fäller den förbjudna formen — annars är AD-01 grön av tomhet.
    assert.equal(FORBJUDET.test('const antal = l.amount / l.unitPrice;'), true,
      'den förbjudna formen måste fällas, annars mäter AD-01 ingenting');
    assert.equal(FORBJUDET.test('seatCount = amount / unit_price;'), true);
  });

  test('AD-03 · kolumnläsaren FYLLER aldrig ett antal — beteendeprovet', () => {
    // Det egentliga skyddet, och det enda som inte läser ord. Varje utfall utom `avlast` måste
    // lämna raden orörd: modellens tal står kvar, och ingen lucka fylls.
    const tokens = [
      { sida: 1, x: 100, y: 500, text: 'Beskrivning' },
      { sida: 1, x: 300, y: 500, text: 'Antal' },
      { sida: 1, x: 420, y: 500, text: 'À-pris' },
      { sida: 1, x: 520, y: 500, text: 'Belopp' },
      // Rad med TOM antalskolumn men perfekt bakåträkningsbar aritmetik: 2 102,90 = 10 × 210,29
      { sida: 1, x: 100, y: 460, text: 'Microsoft 365 Business Premium' },
      { sida: 1, x: 420, y: 460, text: '210,29' },
      { sida: 1, x: 520, y: 460, text: '2102,90' },
    ];
    const d = antalForRad(tokens, { amount: 2102.90 });
    assert.equal(d.utfall, AVLASNING.TOM_CELL, 'kolumnen finns, cellen är tom');
    assert.equal(bevisarTomhet(d.utfall), true, 'och det ÄR bevisad tomhet');
    assert.equal(d.antal, null,
      'aritmetiken går ihop på öret och läsaren fyller ändå INGENTING — det är doktrinen');

    // Genom korrigeringen: raden behåller modellens tal, oförändrat.
    const rader = [{ description: 'Microsoft 365 Business Premium', amount: 2102.90, quantity: 7 }];
    const r = korrigeraAntalUrKolumn(rader, tokens);
    assert.equal(r.avlast, 0, 'inget avläst');
    assert.equal(rader[0].quantity, 7, 'modellens tal står kvar — vi tystar det aldrig (KV-06)');
    assert.equal(rader[0].antalKalla, AVLASNING.TOM_CELL, 'och proveniensen säger varför');
  });

  test('AD-04 · korpusens bevis kan inte ruttna i tysthet', async () => {
    // Doktrinen vilar på en MÄTNING, och en mätning som ingen kör om blir en åsikt. Provet
    // räknar om det bärande talet ur de frysta textlagren: rader där kolumnläsaren inte får ut
    // ett antal, men där bakåträkning ger ett rent heltal. Ändras det talet ska någon läsa om
    // fallen innan doktrinen skrivs om — precis som vid en golvändring (BI-09:s läxa).
    const { extraheraTextlager } = await import('../lib/pdf-textlager.js');
    const { lasAntalskolumn } = await import('../lib/fakturakolumner.js');
    const PDFS = join(ROT, 'test-pdfs');
    let utanAntal = 0, rentHeltal = 0;
    for (const f of readdirSync(PDFS).filter((n) => n.endsWith('.pdf')).sort()) {
      let tokens = [];
      try { ({ tokens } = await extraheraTextlager(readFileSync(join(PDFS, f)))); } catch { continue; }
      const t = lasAntalskolumn(tokens);
      if (!t) continue;
      for (const rad of t.rader) {
        if (rad.antal != null) continue;
        const tal = (rad.tal ?? []).filter((n) => n > 0);
        if (tal.length < 2) continue;
        utanAntal += 1;
        const belopp = Math.max(...tal);
        if (tal.some((a) => a < belopp && Math.abs(belopp / a - Math.round(belopp / a)) < 1e-9
          && belopp / a > 1 && belopp / a < 100000)) rentHeltal += 1;
      }
    }
    assert.equal(utanAntal, 23, 'korpusen har ändrats — läs om fallen innan doktrinen skrivs om');
    assert.equal(rentHeltal, 18,
      `bakåträkning ger ett rent heltal på ${rentHeltal} av ${utanAntal} rader (mätt till 18 av `
      + '23 den 9 sep). Talet är doktrinens hela underlag: metoden fyrar på fyra rader av fem '
      + 'och har noll rätt.');
  });

  test('AD-05 · sonden som bar mätningen finns kvar körbar', () => {
    // Ett mätvärde utan sitt instrument är ett påstående. Sonden står kvar så att vem som helst
    // kan köra om beviset — och så att nästa mätning inte behöver skrivas från minnet.
    const p = join(ROT, 'scripts/probe-bakatrakning.mjs');
    const s = readFileSync(p, 'utf8');
    assert.match(kod(s), /lasAntalskolumn/, 'sonden måste gå via den riktiga läsaren');
    assert.match(kod(s), /extraheraTextlager/, 'och läsa verkliga PDF:er, aldrig en fixtur');
  });
});
