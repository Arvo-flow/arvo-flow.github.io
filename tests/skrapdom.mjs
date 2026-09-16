// tests/skrapdom.mjs — SD-01..27 · den halva som kan gissa måste prövas.
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
// ══ OCH ANDRA VARVET GAV TRE [KUND] TILL (SD-17..19) ════════════════════════════════════════
// Alla tre hade samma form som de fyra första — en grind som inte kunde SE det den vaktade:
//   · kontexten lästes bara VÄNSTER, så «199 kr/mån första 3 månaderna» passerade (SD-17)
//   · momsfönstret satte en SIDBRED flagga, så ett pris stämplade alla (SD-18)
//   · lookbehindens icke-träff försvann TYST, utan post i `avvisade` (SD-19)
//
// MEKANISMEN PRÖVAD, MATNINGEN ALDRIG — bibelns mest upprepade sjukdom. Sviten matar därför RÅ
// SIDTEXT genom hela kedjan (lasPriser -> skrapdom), aldrig ett förberett mellanled. Ett test
// som bygger sitt eget indata kan aldrig fälla ett fel i steget innan.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  skrapdom, lasPriser, lasMomsbas, momsbasVidIndex, tolkaBelopp,
  SANITET_MIN_KR, SANITET_MAX_KR, MIN_PRISER, MOMS_FONSTER, KONTEXT_FONSTER,
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
    assert.deepEqual(r.avvisade.map((a) => a.token), ['2 199'],
      'och avvisandet ska SYNAS, aldrig städas bort tyst');
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
    // Och en annan enhet är inte ett AVVISAT månadspris — den är ett tal om något annat. Att
    // lägga den i `avvisade` hade fällt varje sida som råkar nämna kvadratmeterhyra.
    assert.deepEqual(lasPriser('Lokalhyra 200 kr/m²').avvisade, []);
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
    assert.equal(d.kod, 'avvisat_belopp');
    assert.match(d.skal, /25,000/);
  });

  test('SD-05 · KAMPANJPRISET blir aldrig golvet', () => {
    // Formen som besegrade den gamla blockgrinden: ordinarie och kampanj i syskonmarkup blev
    // två «planer», var och en entydig, och det LÄGRE vann. Att välja lägre är att välja åt
    // VÅRT håll — lägre golv, större påvisad överbetalning, högre success fee. Regel 3 känner
    // ingen avvägning, så kontexten läses och sidan tystas.
    for (const rad of ['Kampanj 199 kr/mån', 'Ord. pris 499 kr/mån', 'Spara nu: 149 kr/mån', 'Från 99 kr/mån']) {
      const d = skrapdom({ url: 'x', sidtext: sida(['Start 299 kr/mån', 'Bas 399 kr/mån', rad]) });
      assert.equal(d.kod, 'kvalificerat_pris', `«${rad}» ska tysta sidan`);
    }
    // Motprov: en sida utan kvalificerare får INTE tystas, annars är skrapan värdelös.
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
    assert.equal(d.kod, 'avvisat_belopp');
  });

  test('SD-14 · ogiltig indata kördes aldrig', () => {
    for (const s of [null, undefined, 7, {}]) assert.equal(skrapdom({ url: 'x', sidtext: s }).kod, 'sidan_olasbar', String(s));
    assert.deepEqual(lasPriser(null).priser, []);
    assert.equal(tolkaBelopp(null), null);
    assert.equal(tolkaBelopp(''), null);
    assert.equal(momsbasVidIndex('priser exkl moms', null), 'okand');
  });

  test('SD-15 · varje pris bär sin kontext — annars kan kvalificerargrinden inte se något', () => {
    const r = lasPriser('Vår bästa plan Pro kostar 499 kr/mån och faktureras årsvis');
    assert.equal(r.priser.length, 1);
    assert.match(r.priser[0].fore, /Pro kostar/);
    assert.match(r.priser[0].efter, /faktureras årsvis/);
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

  // ── DE TRE [KUND] UR ANDRA GRANSKNINGSVARVET ─────────────────────────────────────────────
  test('SD-17 · en kvalificerare EFTER beloppet fäller — kontexten läses åt BÅDA håll', () => {
    // [KUND] nr 1: grinden läste 60 tecken VÄNSTER om priset. Varje kvalificerare som står
    // efter beloppet — den vanligaste placeringen på en svensk prissida — passerade osedd, och
    // syntes inte heller i kvittot. Fortnox egen prislista bär formen ordagrant: «Listat pris
    // avser första användaren, därefter ordinarie licenspriser».
    const efterfall = [
      ['Pro 499 kr/mån första 3 månaderna', 'tidsbegränsat pris'],
      ['Pro 499 kr/mån vid 12 mån bindning', 'bindningsvillkor'],
      ['Pro 499 kr/mån per användare',      'enhetskvalificerare'],
      // «ordinarie» träffar kampanjregeln FÖRST, och det är rätt namn på markören — kvittot
      // säger den första kategori som träffar, aldrig en rangordning vi hittat på.
      ['Pro 499 kr/mån, därefter ordinarie pris', 'kampanj-/frånmarkör'],
    ];
    for (const [rad, namn] of efterfall) {
      const d = skrapdom({ url: 'x', sidtext: sida(['Start 299 kr/mån', 'Bas 399 kr/mån', rad]) });
      assert.equal(d.kod, 'kvalificerat_pris', `«${rad}» ska tysta sidan`);
      assert.match(d.skal, new RegExp(namn), 'och kvittot ska säga VILKEN sorts kvalificerare');
    }
    // Motprov: ett neutralt efterled får INTE fälla, annars vaktar SD-17 sönder varje prislista.
    assert.equal(skrapdom({ url: 'x', sidtext: sida(['Start 299 kr/mån inkl support', 'Bas 399 kr/mån', 'Pro 499 kr/mån']) }).blockerar,
      false, 'en vakt som fäller allt är lika värdelös som ingen vakt');
  });

  test('SD-18 · momsfönstret binder till PRISET, inte till sidan', () => {
    // [KUND] nr 2: slingan satte en SIDBRED flagga — ett enda kvalificerande pris stämplade
    // alla. `MOMS_FONSTER` kunde krympas till ett utan att ett test föll: en konstant vars namn
    // lovade en mekanik den inte hade (bibeln 10 september). Här står ETT pris nära uppgiften
    // och två långt bort; det får aldrig räcka.
    const langtBort = `${FYLL}\nAlla priser anges exkl moms.\nStart 99 kr/mån\n${'y'.repeat(MOMS_FONSTER * 2)}\nBas 199 kr/mån\nPro 499 kr/mån\n${FYLL}`;
    const d = skrapdom({ url: 'x', sidtext: langtBort });
    assert.equal(d.kod, 'momsbas_okand', 'ett pris utanför fönstret gör HELA underlaget okänt');
    assert.match(d.skal, /2 av 3/, 'och kvittot räknar exakt hur många som saknar sin bas');
    // Per pris, direkt: det nära priset är känt, det bortre är det inte.
    const { priser } = lasPriser(langtBort);
    assert.equal(momsbasVidIndex(langtBort, priser[0].index), 'exkl');
    assert.equal(momsbasVidIndex(langtBort, priser[2].index), 'okand');
  });

  test('SD-19 · ingen prisförekomst försvinner tyst — varje träff redovisas', () => {
    // [KUND] nr 3: lookbehinden `(?<!\d[\s ])` gjorde att «VPS 2 199 kr/mån» inte matchade ALLS.
    // Ingen träff, ingen post i `avvisade`, ingen rad i kvittot — trots att docstringen intygade
    // att ett avvisande aldrig städas bort tyst. Sidan såg prisfri ut. Ankaret är rivet; varje
    // belopp med månadsenhet hamnar nu i exakt en av de två listorna.
    // ⚠️ FÖRSTA VERSIONEN AV DET HÄR TESTET VAR GRÖN PÅ FEL GRUND, i exakt den sjukdom det
    // skrevs mot. Fixturen bar «VPS 2 199 kr/mån» — och DEN formen matchade den gamla regexen
    // också (gruppen svalde «2 199» och tvetydighetsregeln avvisade den). Sabotaget «återinför
    // lookbehinden» fällde NOLL. Den tysta droppen krävde en annan form: `siffra mellanrum
    // TVÅ siffror`, där gruppen inte kan svälja talet OCH lookbehinden blockerar nästa
    // startpunkt. «Disk 50 99 kr/mån» gav då ingen träff alls — 99 kr/mån stod på sidan och
    // fanns i ingendera listan.
    const text = 'Start 99 kr/mån · Disk 50 99 kr/mån · Bas 25,000 kr/mån · Pro 499 kr/mån';
    const { priser, avvisade } = lasPriser(text);
    // Fyra månadsbelopp står i texten. Fyra ska redovisas.
    assert.equal(priser.length + avvisade.length, 4,
      'summan av lästa och avvisade ska täcka varje förekomst på sidan');
    assert.deepEqual(avvisade.map((a) => a.token), ['50 99', '25,000']);
    assert.deepEqual(priser.map((p) => p.kronor), [99, 499]);
    // Och det avvisade bär sin egen kontext, så kvittot kan visa VAR på sidan det stod.
    assert.ok(avvisade.every((a) => typeof a.fore === 'string' && typeof a.efter === 'string'));
    assert.equal(KONTEXT_FONSTER, 70);
  });
  // ── GRANSKNINGENS FYND 2026-09-16 · SD-20..27 ────────────────────────────────────────────
  test('SD-20 · VITLISTAN: varje blankstegstecken Unicode känner, inte de två jag tänkte på', () => {
    // [KUND]: den gamla svartlistan vaktade 2 av 10 blankstegstecken. «Pro 1<U+2009>299 kr/mån»
    // gav 299 — tyst, utan post i `avvisade`. Samma falska golv som «VPS 2 199» men åt det
    // LÄGRE hållet, alltså den riktning som överdriver besparingen och vårt eget arvode.
    const BLANK = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '　', ' '];
    for (const b of BLANK) {
      const r = lasPriser(`Pro 1${b}299 kr/mån`);
      assert.deepEqual(r.priser.map((p) => p.kronor), [], `U+${b.codePointAt(0).toString(16)} ska vägras`);
      assert.equal(r.avvisade.length, 1, `U+${b.codePointAt(0).toString(16)} ska SYNAS i avvisade`);
    }
    // Vitlistan direkt: formen deklareras, den räknas inte upp baklänges.
    for (const ok of ['199', '1299', '99,50', '12345', '99.5']) assert.notEqual(tolkaBelopp(ok), null, ok);
    for (const nej of ['25,000', '1.299', '2 199', '123456', '99,500', '', 'abc']) assert.equal(tolkaBelopp(nej), null, nej);
  });

  test('SD-21 · ett PER-ENHET-pris försvinner inte tyst — det avvisas med enheten utskriven', () => {
    // Granskaren mätte `priser=0 avvisade=0` för «kr/användare/mån» — den vanligaste SaaS-formen,
    // alltså precis den kategori skrapan siktar på. «Vad är talet per?» är bibelns egen fråga.
    for (const [rad, enhet] of [
      ['Bas 299 kr/användare/mån', 'användare'],
      ['Plus 250 kr/anv/mån', 'anv'],
      ['Team 180 kr/licens/mån', 'licens'],
      ['Pro 90 kr/plats/mån', 'plats'],
    ]) {
      const r = lasPriser(rad);
      assert.deepEqual(r.priser, [], rad);
      assert.equal(r.avvisade.length, 1, rad);
      assert.match(r.avvisade[0].skal, new RegExp(`per ${enhet}`), rad);
    }
    // Motprov: ett rent månadspris får inte fastna i samma gren.
    assert.equal(lasPriser('Bas 299 kr/mån').priser[0].kronor, 299);
  });

  test('SD-22 · «kronor» och «SEK» är samma valuta — och en annan enhet RÄKNAS', () => {
    assert.equal(lasPriser('Start 199 kronor/mån').priser[0]?.kronor, 199);
    assert.equal(lasPriser('Start 199 SEK per månad').priser[0]?.kronor, 199);
    // En annan enhet är inget avvisat månadspris — men den får inte vara osynlig heller.
    const r = lasPriser('Lokalhyra 200 kr/m² och domän 229 kr/år');
    assert.deepEqual(r.priser, []);
    assert.deepEqual(r.avvisade, []);
    assert.equal(r.ejManad, 2, 'de ska RÄKNAS, annars är de en tyst utgång');
  });

  test('SD-23 · ett tecken före beloppet är en kreditering eller ett intervall — aldrig ett pris', () => {
    for (const rad of ['Rabatt -99 kr/mån', 'Kredit −250 kr/mån', 'Spann 199–499 kr/mån']) {
      const r = lasPriser(rad);
      assert.deepEqual(r.priser.map((p) => p.kronor), [], rad);
      assert.equal(r.avvisade.length, 1, rad);
      assert.match(r.avvisade[0].skal, /kreditering eller intervall/, rad);
    }
  });

  test('SD-24 · kvalificerarnas ORDFÖRRÅD prövas, inte bara ett ord per regel', () => {
    // Granskaren sabotage-strippade varje regel till dess enda testade alternativ: 0 fällda var.
    // En regel vars övriga alternativ ingen prövar är en regel ingen vaktar.
    const fall = [
      ['Ord. 999 nu 499 kr/mån', 'kampanj'], ['Prova 499 kr/mån', 'kampanj'],
      ['Pro 499 kr/mån i 6 månader', 'tidsbegränsat'], ['Pro 499 kr/mån 3 månader för halva', 'tidsbegränsat'],
      ['Pro 499 kr/mån vid årsvis betalning', 'bindningsvillkor'], ['Pro 499 kr/mån med årsbetalning', 'bindningsvillkor'],
      ['Pro 499 kr/mån per person', 'enhetskvalificerare'], ['Pro 499 kr/mån per konto', 'enhetskvalificerare'],
    ];
    for (const [rad, del] of fall) {
      const d = skrapdom({ url: 'x', sidtext: sida(['Start 299 kr/mån', 'Bas 399 kr/mån', rad]) });
      assert.equal(d.kod, 'kvalificerat_pris', `«${rad}» ska tysta sidan`);
      assert.match(d.skal, new RegExp(del), rad);
    }
  });

  test('SD-25 · «alla överens»-grenen i momsbasen har en egen tand', () => {
    // Granskaren sabotage-rev `every`-kontrollen: 0 fällda. En sida som säger exkl vid ett pris
    // och inkl vid ett annat säger emot sig själv, och då är svaret okänt — aldrig det första.
    const bada = `${FYLL}\nPriser exkl moms.\nStart 99 kr/mån\nBas 199 kr/mån\n${'z'.repeat(MOMS_FONSTER * 2)}\nPriser inkl moms.\nPro 499 kr/mån\n${FYLL}`;
    const { priser } = lasPriser(bada);
    assert.equal(momsbasVidIndex(bada, priser[0].index), 'exkl');
    assert.equal(momsbasVidIndex(bada, priser[2].index), 'inkl');
    assert.equal(lasMomsbas(bada, priser.map((p) => p.index)), 'okand',
      'två kända men olika baser är en motsägelse, inte ett val');
    assert.equal(skrapdom({ url: 'x', sidtext: bada }).kod, 'momsbas_okand');
  });

  test('SD-26 · kontextens FÖRE-halva mäts, inte bara konstanten', () => {
    // Granskaren hårdkodade KONTEXT_FONSTER till 12 i fore-slicen: 0 fällda, eftersom SD-19
    // asserterade konstantens VÄRDE och inte mekaniken. En kvalificerare 40 tecken före priset
    // ligger innanför fönstret och måste fälla.
    // ⚠️ MIN FÖRSTA VERSION AV DET HÄR TESTET VAR GRÖN PÅ FEL GRUND. Den byggde en hel sida,
    // och då nådde GRANNPRISETS efter-fönster kvalificeraren — precis den bleed jag själv
    // skrivit ut som känd egenskap. Sabotaget «hårdkoda fore till 12» fällde noll. Mekanismen
    // måste mätas där den är ensam: på lasPriser, med ETT pris.
    const langt = 'Kampanj under september för nya kunder: 499 kr/mån';
    const pos = langt.indexOf('499');
    assert.ok(pos > 12 && pos < KONTEXT_FONSTER, 'fixturen måste ligga mellan sabotaget och fönstret');
    const r = lasPriser(langt);
    assert.equal(r.priser.length, 1);
    assert.match(r.priser[0].fore, /Kampanj/, 'fore-fönstret ska nå kvalificeraren');
    assert.equal(r.priser[0].efter, '', 'och efter-halvan får inte vara den som räddar testet');
    // Och hela vägen genom domen, på en sida där raden står ensam bland neutrala priser.
    const d = skrapdom({ url: 'x', sidtext: sida(['Start 299 kr/mån', 'Bas 399 kr/mån', langt]) });
    assert.equal(d.kod, 'kvalificerat_pris');
    assert.match(d.skal, /kampanj/);
  });

  test('SD-27 · underlagets ordning och invariant', () => {
    // Sorteringen hade ingen tand: riven gav rubriken «710–209 kr/mån». Och `blockerar` var
    // asserterad för 1 av 6 koder — det fält skriptet grenar på.
    const d = skrapdom({ url: 'x', sidtext: sida(['Stor 710 kr/mån', 'Mini 209 kr/mån', 'Mellan 490 kr/mån']) });
    assert.equal(d.blockerar, false, d.skal);
    assert.deepEqual(d.underlag.forekomster.map((f) => f.kronor), [209, 490, 710], 'stigande ordning');
    assert.equal(d.underlag.lagsta, 209);
    assert.equal(d.underlag.hogsta, 710);
    // Invarianten över HELA fältet av koder: blockerar===false medför alltid ett underlag.
    const fall = [
      NORMAL,
      sida(['Start 99 kr/mån', 'Bas 199 kr/mån']),
      sida(['Start 99 kr/mån', 'Bas 199 kr/mån', 'Pro 25,000 kr/mån']),
      sida(['Start 299 kr/mån', 'Bas 399 kr/mån', 'Kampanj 199 kr/mån']),
      sida(['A 1 kr/mån', 'B 199 kr/mån', 'C 499 kr/mån']),
      sida(['Start 99 kr/mån', 'Bas 199 kr/mån', 'Pro 499 kr/mån'], { moms: 'Se villkor.' }),
      'kort',
    ];
    for (const t of fall) {
      const r = skrapdom({ url: 'x', sidtext: t });
      assert.equal(r.blockerar === false, r.underlag !== null,
        `koden «${r.kod}» bröt invarianten blockerar===false <=> underlag!==null`);
    }
  });

});
