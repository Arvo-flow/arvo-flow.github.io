// tests/skrapdom.mjs — SD-01..12 · ett tvetydigt pris är inget pris.
//
// ══ VARFÖR (2026-09-15, grundarbeslut) ══════════════════════════════════════════════════════
// Ordern: hämta publika listpriser från nätet, men «som en 0,1%-arkitekt, inte som en
// hallucinerande agent» — skrapan MÅSTE vara fail-closed och larma i stället för att gissa.
//
// Skrapan kan bara köras i GitHub Actions (sandlådan saknar nät-egress). Domen bor därför i en
// REN funktion, `lib/skrapdom.js`, så att den kan prövas HÄR — annars vore hela fail-closed-
// kravet ett påstående vi aldrig kör. Det är samma läxa som prisbokens DB-lösa svit: en
// mekanism som bara körs i ett tillstånd produktionen inte är i bevisar ingenting.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en oläsbar sida; för få planer (DOM ändrad); ett planblock med två belopp; saknad
//     SEK-valuta; en momsbas som inte står skriven eller som säger emot sig själv; ett pris
//     utanför sanitetsbandet.
//   BLIND: den kan aldrig se att ett giltigt pris hör till rätt PRODUKT. «2 GB RAM · 199 kr/mån»
//     bevisar att talen stod nära varandra, aldrig att 199 är den planens pris. SD-12 låser den
//     blindfläcken som ett KÄNT utfall — domen producerar ett FÖRSLAG, aldrig ett verifierat pris.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { skrapdom, lasMomsbas, SANITET_MIN_KR, SANITET_MAX_KR, MIN_PLANER } from '../lib/skrapdom.js';

const SIDA = 'Våra VPS-planer. Alla priser anges exkl moms. Betala per månad i kr. '.repeat(12);
const planer = (...par) => par.map(([plan, ...belopp]) => ({ plan, belopp }));
const dom = (over = {}) => skrapdom({
  url: 'https://exempel.se/priser',
  sidtext: SIDA,
  planer: planer(['Start', 99], ['Bas', 199], ['Pro', 499]),
  ...over,
});

describe('SD · skrapdomen', () => {
  test('SD-01 · en entydig prislista ger ett FÖRSLAG', () => {
    const d = dom();
    assert.equal(d.blockerar, false, d.skal);
    assert.equal(d.forslag.billigaste.kronorPerManad, 99);
    assert.equal(d.forslag.dyraste.kronorPerManad, 499);
    assert.equal(d.forslag.momsbas, 'exkl');
  });

  test('SD-02 · en oläsbar sida är «jag läste inte», aldrig «inga planer»', () => {
    const d = dom({ sidtext: 'kr' });
    assert.equal(d.blockerar, true);
    assert.equal(d.kod, 'sidan_oläsbar');
    assert.match(d.skal, /HÄMTNINGEN/);
  });

  test('SD-03 · för få planer = DOM:en har ändrats', () => {
    const d = dom({ planer: planer(['Start', 99], ['Bas', 199]) });
    assert.equal(d.blockerar, true);
    assert.equal(d.kod, 'for_fa_planer');
    // Motprovet: exakt tröskeln ska PASSERA, annars vaktar SD-03 fel gräns.
    assert.equal(dom({ planer: planer(['a', 10 + SANITET_MIN_KR], ['b', 200], ['c', 300]) }).blockerar, false);
    assert.equal(MIN_PLANER, 3);
  });

  test('SD-04 · TVÅ belopp i samma block är tvetydigt — aldrig ett val', () => {
    // Månad och år, eller ordinarie och kampanj. Vilketdera går inte att avgöra härifrån, och
    // att välja det lägre vore att välja åt VÅRT håll: ett lägre golv ökar påvisad
    // överbetalning och därmed vår success fee. Regel 3 känner ingen avvägning.
    const d = dom({ planer: planer(['Start', 99, 79], ['Bas', 199], ['Pro', 499]) });
    assert.equal(d.blockerar, true);
    assert.equal(d.kod, 'tvetydigt_pris');
    assert.match(d.skal, /Start=\[99, 79\]/);
  });

  test('SD-05 · NOLL belopp i ett block är lika tvetydigt som två', () => {
    const d = dom({ planer: [{ plan: 'Tom', belopp: [] }, { plan: 'Bas', belopp: [199] }, { plan: 'Pro', belopp: [499] }] });
    assert.equal(d.blockerar, true);
    assert.equal(d.kod, 'tvetydigt_pris');
  });

  test('SD-06 · utan SEK på sidan finns inget SEK-golv', () => {
    // Ett SEK-tal härlett ur en USD-lista via en runtime-kurs är inte ett verifierat listpris
    // (google-sek-grinden, bibeln 1 september). Saknas valutan är svaret tystnad.
    const d = dom({ sidtext: 'Our VPS plans. All prices excluding VAT. Pay monthly. '.repeat(12) });
    assert.equal(d.blockerar, true);
    assert.equal(d.kod, 'ingen_sek');
  });

  test('SD-07 · momsbasen LÄSES, aldrig antas', () => {
    assert.equal(lasMomsbas('Alla priser anges exkl moms'), 'exkl');
    assert.equal(lasMomsbas('Priser inklusive moms'), 'inkl');
    assert.equal(lasMomsbas('Priser i kr per månad'), 'okand');
    // Säger sidan BÅDA är svaret okänt — två motsägande uppgifter är mindre information än
    // ingen (USD-fakturan som anger både «Moms (25 %)» och «reverse charge», 12 augusti).
    assert.equal(lasMomsbas('Priser exkl moms. Alla belopp inkl moms.'), 'okand');
  });

  test('SD-08 · en oskriven momsbas blockerar', () => {
    const d = dom({ sidtext: 'Våra VPS-planer. Betala per månad i kr. '.repeat(14) });
    assert.equal(d.blockerar, true);
    assert.equal(d.kod, 'momsbas_okand');
    assert.match(d.skal, /kundens fakturarad/);
  });

  test('SD-09 · sanitetsbandet dödar enhets- och periodfel', () => {
    const lagt = dom({ planer: planer(['Adress', SANITET_MIN_KR - 1], ['Bas', 199], ['Pro', 499]) });
    assert.equal(lagt.kod, 'utanfor_band');
    const hogt = dom({ planer: planer(['Start', 99], ['Bas', 199], ['Årspris', SANITET_MAX_KR + 1]) });
    assert.equal(hogt.kod, 'utanfor_band');
    // Motprov i BÅDA ändar: exakt på gränsen är giltigt, annars vaktar bandet fel tal.
    assert.equal(dom({ planer: planer(['a', SANITET_MIN_KR], ['b', 199], ['c', SANITET_MAX_KR]) }).blockerar, false);
  });

  test('SD-10 · en annan valuta på sidan VARNAR men blockerar inte', () => {
    // Många svenska sidor visar en valutaväljare. Att blockera på det hade fällt rätt beteende
    // och fått skrapan avstängd — men tystnad om det vore att dölja en verklig risk.
    const d = dom({ sidtext: `${SIDA} Byt valuta: $ USD` });
    assert.equal(d.blockerar, false);
    assert.match(d.forslag.valutaVarning, /annan valuta/);
    assert.equal(dom().forslag.valutaVarning, null);
  });

  test('SD-11 · ogiltig indata kördes aldrig', () => {
    for (const p of [null, undefined, 'Start 99 kr', 7]) {
      assert.equal(skrapdom({ url: 'x', sidtext: SIDA, planer: p }).kod, 'ogiltig_indata', String(p));
    }
  });

  test('SD-12 · KÄND BLINDFLÄCK: domen ser syntax, aldrig att priset hör till produkten', () => {
    // Ett block där rubriken och beloppet inte hör ihop passerar — domen kan omöjligt veta det.
    // Därför heter utfallet `forslag` och aldrig `verifierat`: ordet måste förtjänas av en
    // människa som öppnar sidan. Ändra inte utfallet utan att ändra den deklarerade blindfläcken.
    const d = dom({ planer: planer(['Supportavgift', 99], ['Bas', 199], ['Pro', 499]) });
    assert.equal(d.blockerar, false);
    assert.equal(d.kod, 'forslag');
    assert.ok(!('verifierat' in d.forslag), 'utfallet får aldrig kalla sig verifierat');
  });
});
