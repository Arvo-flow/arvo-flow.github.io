// tests/skrapdom.mjs — SD-01..16 · den halva som kan gissa måste prövas.
//
// ══ VARFÖR (2026-09-15) ═════════════════════════════════════════════════════════════════════
// Första versionen testade DOMEN och lämnade EXTRAKTIONEN i skriptet, okörbar av sviten.
// Granskningen föll BLOCKERAR med fyra [KUND] — alla i extraktionen, alla osynliga härifrån:
//
//     "VPS 2 199 kr/mån"          -> 2199   (sant: 199)   ett entydigt FALSKT golv
//     "Diskutrymme 50 99 kr/mån"  -> 5099   (sant: 99)
//     "1 200 kr/m²"               -> 1200   (ett naket `m` matchade «m²»)
//     "25,000 kr/mån"             -> 25     (faktor 1000, innanför sanitetsbandet)
//
// Plus: ordinarie- och kampanjpris i SYSKONELEMENT blev två skilda «planer», var och en
// entydig — tvetydighetsgrinden var strukturellt onåbar och kampanjpriset blev golvet.
//
// MEKANISMEN PRÖVAD, MATNINGEN ALDRIG — bibelns mest upprepade sjukdom, femte gången. Sviten
// matar därför RÅ SIDTEXT genom hela kedjan (lasPriser -> skrapdom), aldrig ett förberett
// mellanled. Ett test som bygger sitt eget indata kan aldrig fälla ett fel i steget innan.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  skrapdom, lasPriser, lasMomsbas, tolkaBelopp,
  SANITET_MIN_KR, SANITET_MAX_KR, MIN_PRISER, MOMS_FONSTER,
} from '../lib/skrapdom.js';

const FYLL = 'Hosting i Sverige. Driftsäkra servrar med svensk support dygnet runt. '.repeat(8);
/** Bygg en sidtext med priser + momsuppgift NÄRA dem — den form produktionen faktiskt möter. */
const sida = (rader, { moms = 'Alla priser anges exkl moms.' } = {}) =>
  `${FYLL}\nVåra planer. ${moms}\n${rader.join('\n')}\n${FYLL}`;
const NORMAL = sida(['Start 99 kr/mån', 'Bas 199 kr/mån', 'Pro 499 kr/mån']);

describe('SD · skrapans extraktion och dom', () => {
  // ── EXTRAKTIONEN — de fyra [KUND] som granskningen mätte ─────────────────────────────────
  test('SD-01 · ett belopp klistras aldrig ihop med ett föregående tal', () => {
    // «VPS 2 199 kr/mån» gav 2199 för sanna 199 — tolv gånger fel, entydigt, innanför bandet.
    const r = lasPriser('VPS 2 199 kr/mån');
    assert.deepEqual(r.priser.map((p) => p.kronor), [], 'formen är tvetydig och ska vägras');
    assert.deepEqual(r.avvisade, ['2 199'], 'och avvisandet ska SYNAS, aldrig städas bort tyst');
    assert.deepEqual(lasPriser('Diskutrymme 50 99 kr/mån').priser, [],
      'ett tal före priset får aldrig svälja in i beloppet');
  });

  test('SD-02 · «m²» är ingen månad', () => {
    // ⚠️ FÖRSTA VERSIONEN VAR GRÖN PÅ FEL GRUND: fixturen löd «1 200 kr/m²», och det
    // mellanrumsgrupperade talet fångades redan av tvetydighetsregeln — `m²`-skyddet var
    // omöjligt att observera bakom den. Sabotaget «tillåt naket m igen» fällde NOLL. Ett skydd
    // bakom ett annat skydd är inte två lager (bibeln 10 september). Beloppet är nu ogrupperat,
    // så den här raden är den ENDA tanden.
    assert.deepEqual(lasPriser('Lokalhyra 200 kr/m²').priser, []);
    // Motprov: månadsformerna som FINNS måste fortfarande läsas, annars vaktar SD-02 sönder allt.
    for (const m of ['199 kr/mån', '199 kr/månad', '199 kr/month', '199 sek/mo'])
      assert.equal(lasPriser(m).priser[0]?.kronor, 199, m);
  });

  test('SD-03 · en tvetydig tusental/decimal-form är inget tal', () => {
    // «25,000» är 25 med svenskt decimalkomma och 25 000 med engelskt tusentalskomma. Faktor
    // 1000, båda innanför bandet, omöjligt att avgöra ur tecknen.
    assert.equal(tolkaBelopp('25,000'), null);
    assert.equal(tolkaBelopp('1.299'), null);
    assert.equal(tolkaBelopp('2 199'), null);
    // Motprov: entydiga former MÅSTE gå igenom.
    assert.equal(tolkaBelopp('199'), 199);
    assert.equal(tolkaBelopp('1299'), 1299);
    assert.equal(tolkaBelopp('99,50'), 99.5);
  });

  test('SD-04 · ett avvisat belopp BLOCKERAR hela sidan', () => {
    // Att tyst hoppa över det tvetydiga och döma på resten vore att låta sidan bestämma vilka
    // priser vi ser — och det var precis så det falska golvet uppstod.
    const d = skrapdom({ url: 'x', sidtext: sida(['Start 99 kr/mån', 'Bas 199 kr/mån', 'Pro 25,000 kr/mån']) });
    assert.equal(d.blockerar, true);
    assert.equal(d.kod, 'tvetydigt_tal');
    assert.match(d.skal, /25,000/);
  });

  test('SD-05 · KAMPANJPRISET blir aldrig golvet', () => {
    // Formen som besegrade den gamla blockgrinden: ordinarie och kampanj i syskonmarkup blev
    // två «planer», var och en entydig, och det LÄGRE vann. Att välja lägre är att välja åt
    // VÅRT håll — lägre golv, större påvisad överbetalning, högre success fee. Regel 3 känner
    // ingen avvägning, så kontexten läses och sidan tystas.
    for (const rad of ['Kampanj 199 kr/mån', 'Ord. pris 499 kr/mån', 'Spara nu: 149 kr/mån', 'Från 99 kr/mån']) {
      const d = skrapdom({ url: 'x', sidtext: sida(['Start 299 kr/mån', 'Bas 399 kr/mån', rad]) });
      assert.equal(d.kod, 'kampanjmarkor', `«${rad}» ska tysta sidan`);
    }
    // Motprov: en sida utan kampanjord får INTE tystas, annars är skrapan värdelös.
    assert.equal(skrapdom({ url: 'x', sidtext: NORMAL }).blockerar, false);
  });

  // ── DOMEN ────────────────────────────────────────────────────────────────────────────────
  test('SD-06 · en entydig prissida ger ett UNDERLAG', () => {
    const d = skrapdom({ url: 'https://x.se/priser', sidtext: NORMAL });
    assert.equal(d.blockerar, false, d.skal);
    assert.equal(d.kod, 'underlag');
    assert.equal(d.underlag.lagsta, 99);
    assert.equal(d.underlag.hogsta, 499);
    assert.equal(d.underlag.momsbas, 'exkl');
    assert.equal(d.underlag.antalPriser, 3);
  });

  test('SD-07 · en oläsbar sida är «jag läste inte», aldrig «inga priser»', () => {
    const d = skrapdom({ url: 'x', sidtext: '199 kr/mån' });
    assert.equal(d.kod, 'sidan_olasbar');
    assert.match(d.skal, /HÄMTNINGEN/);
  });

  test('SD-08 · för få priser = DOM:en har ändrats', () => {
    const d = skrapdom({ url: 'x', sidtext: sida(['Start 99 kr/mån', 'Bas 199 kr/mån']) });
    assert.equal(d.kod, 'for_fa_priser');
    // Motprov: exakt tröskeln passerar, annars vaktar SD-08 fel gräns.
    assert.equal(skrapdom({ url: 'x', sidtext: NORMAL }).blockerar, false);
    assert.equal(MIN_PRISER, 3);
  });

  test('SD-09 · sanitetsbandet avvisar absurda magnituder', () => {
    const lagt = skrapdom({ url: 'x', sidtext: sida([`Adress ${SANITET_MIN_KR - 1} kr/mån`, 'Bas 199 kr/mån', 'Pro 499 kr/mån']) });
    assert.equal(lagt.kod, 'utanfor_band');
    const hogt = skrapdom({ url: 'x', sidtext: sida(['Start 99 kr/mån', 'Bas 199 kr/mån', `Rack ${SANITET_MAX_KR + 1} kr/mån`]) });
    assert.equal(hogt.kod, 'utanfor_band');
    // Motprov i BÅDA ändar: exakt på gränsen är giltigt.
    assert.equal(skrapdom({ url: 'x', sidtext: sida([`A ${SANITET_MIN_KR} kr/mån`, 'B 199 kr/mån', `C ${SANITET_MAX_KR} kr/mån`]) }).blockerar, false);
  });

  // ── MOMSBASEN ────────────────────────────────────────────────────────────────────────────
  test('SD-10 · momsbasen läses NÄRA priset, aldrig från en fotnot', () => {
    // Granskaren mätte: «Fri frakt över 500 kr. Alla fraktpriser anges exkl moms…» stämplade
    // VPS-planerna `exkl`. Rätt siffra, fel proveniens — vilket regel 3 räknar som fel.
    const fotnot = `${FYLL}\nStart 99 kr/mån\nBas 199 kr/mån\nPro 499 kr/mån\n${'x'.repeat(MOMS_FONSTER + 200)}\nFri frakt. Alla fraktpriser anges exkl moms.`;
    const d = skrapdom({ url: 'x', sidtext: fotnot });
    assert.equal(d.kod, 'momsbas_okand', 'en uppgift långt från priset gäller inte priset');
  });

  test('SD-11 · motsägande momsuppgifter ger OKÄND, aldrig ett val', () => {
    assert.equal(lasMomsbas('priser exkl moms och inkl moms', [20]), 'okand');
    assert.equal(lasMomsbas('priser exkl moms', [10]), 'exkl');
    assert.equal(lasMomsbas('priser inklusive moms', [10]), 'inkl');
    assert.equal(lasMomsbas('priser i kronor', [10]), 'okand');
    // Utan priser finns inget att binda uppgiften till.
    assert.equal(lasMomsbas('priser exkl moms', []), 'okand');
  });

  test('SD-12 · en oskriven momsbas blockerar', () => {
    const d = skrapdom({ url: 'x', sidtext: sida(['Start 99 kr/mån', 'Bas 199 kr/mån', 'Pro 499 kr/mån'], { moms: 'Se villkor.' }) });
    assert.equal(d.kod, 'momsbas_okand');
    assert.match(d.skal, /kundens fakturarad/);
  });

  // ── KEDJAN, INTE MELLANLEDET ─────────────────────────────────────────────────────────────
  test('SD-13 · hela kedjan körs på RÅ sidtext', () => {
    // Testet finns för att det gamla testet matade ett förberett mellanled och därför aldrig
    // kunde se de fyra extraktionsfelen. Här går rå text in och en dom kommer ut.
    const d = skrapdom({ url: 'x', sidtext: sida(['VPS 2 199 kr/mån', 'Bas 199 kr/mån', 'Pro 499 kr/mån']) });
    assert.equal(d.blockerar, true, 'den giftiga raden ska fälla HELA sidan, inte filtreras bort');
    assert.equal(d.kod, 'tvetydigt_tal');
  });

  test('SD-14 · ogiltig indata kördes aldrig', () => {
    for (const s of [null, undefined, 7, {}]) assert.equal(skrapdom({ url: 'x', sidtext: s }).kod, 'sidan_olasbar', String(s));
    assert.deepEqual(lasPriser(null).priser, []);
    assert.equal(tolkaBelopp(null), null);
    assert.equal(tolkaBelopp(''), null);
  });

  test('SD-15 · varje pris bär sin kontext — annars kan kampanjgrinden inte se något', () => {
    const r = lasPriser('Vår bästa plan Pro kostar 499 kr/mån');
    assert.equal(r.priser.length, 1);
    assert.match(r.priser[0].kontext, /Pro kostar/);
  });

  test('SD-16 · KÄND BLINDFLÄCK: utfallet är ett UNDERLAG, aldrig ett golv', () => {
    // Modulen ser syntax, aldrig vilken PRODUKT priset hör till: «Supportavgift 99 kr/mån» är
    // syntaktiskt oklanderligt. Därför heter fältet `underlag` och inget fält påstår
    // «verifierat» eller «golv». Ändra inte utfallet utan att ändra den deklarerade blindfläcken.
    const d = skrapdom({ url: 'x', sidtext: sida(['Supportavgift 99 kr/mån', 'Bas 199 kr/mån', 'Pro 499 kr/mån']) });
    assert.equal(d.blockerar, false);
    assert.equal(d.kod, 'underlag');
    const nycklar = JSON.stringify(d.underlag);
    assert.ok(!/verifierat|golv|listpris/i.test(nycklar), 'utfallet får aldrig påstå mer än det vet');
  });
});
