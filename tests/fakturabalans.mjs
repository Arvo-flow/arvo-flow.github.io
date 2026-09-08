// tests/fakturabalans.mjs — GÅR FAKTURAN IHOP MED SIG SJÄLV?
//
// ══ BAKGRUNDEN (2026-09-08, grundarens Microsoft-faktura) ═════════════════════════════════
//     radsumma (2 102,90 + 4 560,00)  =  6 662,90
//     Moms (25%)                      =  1 665,73   ← 25 % av radsumman, stämmer på öret
//     Att betala                      =  8 331,63
//     6 662,90 + 1 665,73             =  8 328,63   ← 3,00 kr SAKNAR TÄCKNING
//
// Ring 1 släppte igenom det, och det var inte otur. Den jämför radsumman mot `invoiceTotal` med
// toleransen max(50 kr, 3 % av totalen) och förklarar bort glapp genom att RÄKNA
// radsumma × (1 + sats). Vi läser momsens SATS men aldrig dess BELOPP — trots att beloppet står
// tryckt bredvid. Båda vägar modellen kan läsa totalen passerade:
//     invoiceTotal 8 331,63 (rått)    glapp 1 668,73 · tolerans 249,95 → «skillnaden är momsen»
//     invoiceTotal 6 665,30 (÷ 1,25)  glapp     2,40 · tolerans 199,96 → «radsumman stämmer»
//
// Felet är FORMEN, inte talet: en procentsats där felrymden är ett fast belopp. På 8 331 kr
// släpps 250 kr igenom, på 200 000 kr släpps 6 000 kr igenom.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   UTLÖSER larmet: att fakturans EGNA tryckta tal inte går ihop med de rader vi läste, mer än
//     öresavrundningen. Toleransen är ett FAST belopp (2 öre), härlett ur att momsraden och
//     totalen var för sig är avrundade till öre — aldrig en procentsats.
//   UTLÖSER DET INTE: en faktura som går ihop, och en faktura där momsbeloppet eller slutsumman
//     inte går att läsa ur pappret. Det senare svarar `ovittnesbar` — ett EGET tillstånd, aldrig
//     «stämmer». Det är den bärande frågan: en vakt som förväxlar «jag kunde inte läsa» med
//     «jag läste och allt stämde» delar ut en bock den inte förtjänat.
//   BLIND: den vet inte VARFÖR glappet finns. Två orsaker är möjliga — fakturan går inte ihop,
//     eller vi läste inte alla rader — och att gissa vore reservkortsfelet (BK-06/BK-07).
//     Domen namnger båda och väljer ingen.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { bedomFakturabalans, lasTrycktaSummor, BALANS, ORESTOLERANS } from '../lib/fakturabalans.js';
import { korpusText, korpusNamn } from './korpus.mjs';

const PAPPRET = [
  'Artikelnr    Beskrivning                              Antal   A-pris    Belopp',
  'MS-PREM      Microsoft 365 Business Premium                   210.29    2 102.90',
  'MS-E3        Office 365 E3                            12      380.00    4 560.00',
  '-------------------------------------------------',
  'Moms (25%): 1 665.73 SEK',
  'Att betala: 8 331.63 SEK',
].join('\n');

describe('FB · Går fakturan ihop med sig själv?', () => {
  test('FB-01 · grundarens faktura: 3,00 kr saknar täckning', () => {
    const d = bedomFakturabalans({ radsumma: 6662.90, dokumenttext: PAPPRET });
    assert.equal(d.utfall, BALANS.GLAPP);
    assert.equal(d.glapp, 3);
    assert.equal(d.momsbelopp, 1665.73, 'momsBELOPPET läses, inte bara satsen');
    assert.equal(d.total, 8331.63);
    // Domen namnger BÅDA möjliga orsakerna och väljer ingen — den vet inte vilken.
    assert.match(d.skal, /går fakturan inte ihop, eller så läste vi inte alla rader/);
  });

  test('FB-02 · MOTPROVET: en faktura som går ihop får ingen anmärkning', () => {
    const ratt = PAPPRET.replace('8 331.63', '8 328.63');
    const d = bedomFakturabalans({ radsumma: 6662.90, dokumenttext: ratt });
    assert.equal(d.utfall, BALANS.STAMMER);
    // Och öresavrundningen ska rymmas — annars falsklarmar vakten på varje normal faktura.
    for (const drift of [-0.01, 0.01, -ORESTOLERANS, ORESTOLERANS]) {
      const n = bedomFakturabalans({ radsumma: 6662.90 + drift, dokumenttext: ratt });
      assert.equal(n.utfall, BALANS.STAMMER, `öresavrundning ${drift} får inte fälla`);
    }
    // Men EN krona är inte avrundning.
    assert.equal(bedomFakturabalans({ radsumma: 6663.90, dokumenttext: ratt }).utfall, BALANS.GLAPP);
  });

  test('FB-03 · «kunde inte läsa» är ett EGET tillstånd, aldrig en bock', () => {
    // Den bärande frågan. En vakt som svarar «stämmer» när den inte kunde läsa delar ut en bock
    // den inte förtjänat — precis felet Ring 1 gjorde med sin procenttolerans.
    for (const text of [null, '', '   ', 'Bara löptext utan summor']) {
      const d = bedomFakturabalans({ radsumma: 6662.90, dokumenttext: text });
      assert.equal(d.utfall, BALANS.OVITTNESBAR, `text=${JSON.stringify(text)}`);
      assert.notEqual(d.utfall, BALANS.STAMMER);
    }
    // Moms utan total, och total utan moms — båda ovittnesbara, aldrig halva domar.
    assert.equal(bedomFakturabalans({ radsumma: 100, dokumenttext: 'Moms (25%): 25,00' }).utfall, BALANS.OVITTNESBAR);
    assert.equal(bedomFakturabalans({ radsumma: 100, dokumenttext: 'Att betala: 125,00' }).utfall, BALANS.OVITTNESBAR);
    // Utan radsumma finns ingenting att pröva.
    assert.equal(bedomFakturabalans({ radsumma: 0, dokumenttext: PAPPRET }).utfall, BALANS.OVITTNESBAR);
  });

  test('FB-04 · momsBASEN får aldrig läsas som momsBELOPPET', () => {
    // «Momspliktigt underlag exkl moms: 6 662,90» bär ordet moms men talet är BASEN. Läses den
    // som momsbelopp blir glappet hela momsen — ett falsklarm på varje faktura med den raden.
    const t = 'Momspliktigt underlag exkl moms: 6 662,90\nMoms 25%: 1 665,73\nAtt betala: 8 328,63';
    const { momsbelopp } = lasTrycktaSummor(t);
    assert.equal(momsbelopp, 1665.73, 'basraden får inte kapa momsraden');
    assert.equal(bedomFakturabalans({ radsumma: 6662.90, dokumenttext: t }).utfall, BALANS.STAMMER);
    // Och en ensam basrad ger inget momsbelopp alls.
    assert.equal(lasTrycktaSummor('Netto exkl moms: 6 662,90\nAtt betala: 8 328,63').momsbelopp, null);
  });

  test('FB-05 · MODULEN ÄR AVKOPPLAD — mätvärdena står här, inte i en TODO', async () => {
    // ── ANDRA BLICKEN FÖRE MERGE (2026-09-08) ────────────────────────────────────────────────
    // Här stod ett prov att pipelinen kör domen. Den GJORDE det. Granskningen mätte vad domen
    // säger om VERKLIGA fakturor, och svaret kopplade bort den:
    //   · falsklarm på 7 av 9 realistiska KORREKTA svenska fakturaformer
    //   · «Att betala EXKL. MOMS» (test-pdfs/Faktura_2.pdf, Faktura_3.pdf) lästes som slutsumma
    //     — momsregexen har uteslutningen exkl|netto|underlag|bas, TOTALregexen har ingen
    //   · en VALUTAKURS lästes som momsbelopp (salesforce-enterprise.pdf → 10,40) eftersom
    //     «ex. moms» inte fångas av uteslutningen
    //   · över alla 75 fakturor kunde båda talen läsas på 5 (7 %); 19 av 24 snapshot-par blev
    //     `ovittnesbar`. En vakt som tiger i 93 % och skriker fel i resten är sämre än ingen.
    //
    // Modulen står kvar som SPECIFIKATION med sina mätvärden. 3-kronorsglappet på grundarens
    // faktura är ett VERKLIGT fynd som fortfarande är öppet — det är vakten som inte höll, inte
    // fyndet. Provet låser att den inte är inkopplad, så ingen råkar armera den igen.
    const { readFileSync } = await import('node:fs');
    const ra = readFileSync(new URL('../api/test-invoice.mjs', import.meta.url), 'utf8');
    const api = ra.split('\n').map((r) => r.replace(/\/\/.*$/, '')).join('\n');
    assert.doesNotMatch(api, /bedomFakturabalans\(/,
      'avkopplad tills etikettläsningen är mätt mot korpusen — 7 av 9 korrekta fakturor falsklarmade');

    // Kravet nästa version ska uppfylla, skrivet som ett prov som FÄLLER i dag om det vänds:
    // «Att betala exkl. moms» får aldrig läsas som slutsumman.
    const { total } = lasTrycktaSummor('Att betala exkl. moms: 124 000,00 SEK');
    assert.equal(total, 124000,
      'DOKUMENTERAR DAGENS BRIST: totalregexen saknar exkl-uteslutningen och läser momsBASEN som '
      + 'slutsumma. Den dagen detta blir null får modulen kopplas in igen — inte förr.');
  });

  test('FB-07 · MOT VERKLIGT pdfjs-UTFALL: tystnaden är mätt, inte gissad', () => {
    // Modulen är avkopplad. Det här provet mäter VARFÖR mot verkliga textlager, så att siffran
    // står i sviten och inte i ett commit-meddelande ingen läser om ett halvår.
    let lasbara = 0, tysta = 0;
    for (const namn of korpusNamn()) {
      const { momsbelopp, total } = lasTrycktaSummor(korpusText(namn));
      if (momsbelopp != null && total != null) lasbara++; else tysta++;
    }
    assert.ok(lasbara + tysta >= 70, 'korpusen måste vara fylld — annars mäter provet tomhet');
    assert.ok(lasbara <= 20,
      `${lasbara} av ${lasbara + tysta} fakturor är läsbara. Om detta STIGER kraftigt har `
      + 'etikettläsningen blivit bättre — mät om falsklarmen och överväg att koppla in modulen.');

    // Och det farliga fallet, bevisat mot en RIKTIG faktura: «Att betala exkl. moms» finns i
    // korpusen och läses som slutsumma. Det är den exakta orsaken till avkopplingen.
    const medExkl = korpusNamn().filter((n) => /att\s+betala\s+exkl/i.test(korpusText(n)));
    if (medExkl.length) {
      const { total } = lasTrycktaSummor(korpusText(medExkl[0]));
      assert.notEqual(total, null,
        `${medExkl[0]} bär «Att betala exkl. moms» och läses som slutsumma — DAGENS BRIST, mätt `
        + 'mot en verklig faktura. Blir detta null får modulen kopplas in igen.');
    }
  });

  test('FB-06 · toleransen är ett FAST belopp, aldrig en procentsats', () => {
    // Hela felet i Ring 1 var formen: 3 % av 8 331 kr = 250 kr, 3 % av 200 000 kr = 6 000 kr.
    // Ett glapp på 3 kr måste fällas oavsett fakturans storlek — invarianten över hela fältet,
    // inte ett stickprov.
    for (const skala of [1, 10, 100, 1000]) {
      const bas = 6662.90 * skala;
      const moms = +(bas * 0.25).toFixed(2);
      const total = +(bas + moms + 3).toFixed(2);   // samma 3 kr, oavsett storlek
      const t = `Moms (25%): ${moms.toFixed(2)}\nAtt betala: ${total.toFixed(2)}`;
      const d = bedomFakturabalans({ radsumma: bas, dokumenttext: t });
      assert.equal(d.utfall, BALANS.GLAPP,
        `3 kr glapp passerade på en faktura om ${Math.round(total)} kr — toleransen skalar med beloppet`);
      assert.equal(d.glapp, 3);
    }
  });
});
