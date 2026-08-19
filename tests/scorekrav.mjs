// tests/scorekrav.mjs — ETT SCORE SOM MOTSÄGER SITT EGET BEVIS SKA INTE KUNNA UPPSTÅ.
//
// BAKGRUNDEN (grundarens skärmdump 2026-08-19): en Microsoft-rad visade Arvo Score 92 och
// etiketten RÄTT PRISSATT — direkt ovanför sitt eget underlag, som sa "Ni ligger 184 % över det
// billigaste priset som går att köpa över disk". Frågan var enkel och förödande: hur kan man ha
// ett avtal 184 % över marknadspris och ändå få 92?
//
// MÄTT UR HANS EGEN RAD (scripts/probe-score-underlag.mjs, mot produktionsdatabasen):
//   scorens golv  = getBenchmark p25 184 680 kr (source 'real', n=24) × 10 platser = 1 846 800 kr
//   bevisets golv = getPublicListBenchmark p25 1 606 kr × 10 platser              =    16 060 kr
//   → ratio 0,02 → score 96      respektive      ratio 2,84 → score 15
// 184 680 kr är en TOTALSUMMA — vad hela bolag betalar per år, ur invoice_datapoints. Scoren
// behandlade den som ett styckpris och multiplicerade den med antalet licenser. Golvet blev 115
// gånger för högt, kvoten nära noll, och talet fastnade i taket oavsett vad kunden betalade.
// Sonden hittade 3 rader där scoren motsäger sitt underlag och 9 där lagrat ≠ omräknat.
//
// DET ÄR ANKARKORTETS BUGG ETT LAGER NED. Den 15 augusti konstaterades att ankaret läste
// getBenchmark (som riktigt föredrar livedata, och livedatan är totalsummor) och byttes till
// getPublicListBenchmark. Ingen frågade om SCOREN gick samma väg. Den gjorde det.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   FÅNGAR: (a) att scoren räknas mot ett annat golv än det beviset visar, (b) att ett högt score
//           kan stå bredvid ett underlag som säger "över golvet", (c) att kurvan ändras så att
//           riktningen bryts (dyrare ska aldrig ge högre tal), och (d) att rummet börjar läsa ett
//           andra, fruset tal igen. Prövas genom att ANROPA funktionerna, inte läsa källtext.
//   BLIND:  vakten vet inte om GOLVET är rätt produkt för kundens licensnivå. En E3-kund mätt mot
//           Business Standards golv får ett formellt korrekt men sakligt missvisande avstånd —
//           och nu även ett lågt score på den grunden. Den luckan är uttalad sedan
//           tests/prisunderlag.mjs skrevs, den är INTE stängd här, och den är den mest sannolika
//           källan till nästa falska larm åt andra hållet.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { byggPrisunderlag, scoreUrUnderlag } from '../lib/prisunderlag.js';
import { supplierDiagScore, buildReasoning } from '../src/lib/holdings.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ANKARE = {
  p25: 1606, median: 1927, unitLabel: 'per användare/år',
  lastVerified: '2026-08-05', referensProdukt: 'Microsoft 365 Business Standard',
};

describe('SCOREKRAV · talet och dess bevis kan inte säga emot varandra', () => {
  test('SK-01 · grundarens rad: 45 600 kr på 10 platser ger 15, aldrig 92', () => {
    const u = byggPrisunderlag({ annualCost: 45600, seats: 10, ankare: ANKARE });
    assert.equal(u.perEnhet, 4560);
    assert.equal(u.avstandPct, 184, 'beviset säger +184 %');
    assert.equal(scoreUrUnderlag(u), 15, 'ett avtal 184 % över golvet får inte se friskt ut');
  });

  test('SK-02 · ett score ≥ 80 kan ALDRIG stå bredvid ett underlag som säger över golvet', () => {
    // Invarianten kunden läser. Prövas över hela spannet, inte på ett lyckat exempel.
    for (let perManad = 60; perManad <= 900; perManad += 10) {
      const u = byggPrisunderlag({ annualCost: perManad * 12 * 10, seats: 10, ankare: ANKARE });
      const s = scoreUrUnderlag(u);
      if (s >= 80) {
        assert.ok(u.avstandPct <= 15,
          `score ${s} vid ${u.avstandPct} % över golvet — talet motsäger sitt eget bevis`);
      }
      if (u.avstandPct > 15) {
        assert.ok(s < 80, `+${u.avstandPct} % över golvet gav score ${s}`);
      }
    }
  });

  test('SK-03 · dyrare ger aldrig högre tal (riktningen kan inte vändas)', () => {
    let forra = Infinity;
    for (let perManad = 60; perManad <= 900; perManad += 5) {
      const s = scoreUrUnderlag(byggPrisunderlag({ annualCost: perManad * 12 * 10, seats: 10, ankare: ANKARE }));
      assert.ok(s <= forra, `score steg (${forra} → ${s}) när priset gick upp`);
      forra = s;
    }
  });

  test('SK-04 · golvet är ett STYCKPRIS — en totalsumma får aldrig nå formeln', () => {
    // Det var hela felet: 184 680 kr (en total ur invoice_datapoints) användes som styckpris och
    // multiplicerades med platserna. Underlaget räknar per enhet, så en total kan bara komma in
    // via ankaret — och då blir avståndet djupt negativt, vilket ÄR den signaturen.
    const totalSomAnkare = { ...ANKARE, p25: 184680, median: 184680 };
    const u = byggPrisunderlag({ annualCost: 45600, seats: 10, ankare: totalSomAnkare });
    assert.equal(scoreUrUnderlag(u), 96, 'en total som golv pinnar talet i taket — signaturen på felet');
    assert.ok(u.avstandPct < -90,
      'ett golv 100× över kundens styckpris är inte ett styckpris; avståndet avslöjar det');
  });

  test('SK-05 · rummet läser det HÄRLEDDA talet, aldrig ett andra fruset', () => {
    // Två producenter av samma sanning är det som skapade motsägelsen: vilket tal kunden fick
    // berodde på vilken kod som råkade köra. health_score står kvar i databasen som historik men
    // får inte vinna i rummet.
    const rad = { arvoScore: 15, health_score: 92, should_switch: false, net_saving: null, annual_cost: 45600 };
    assert.equal(supplierDiagScore(rad), 15, 'det härledda talet gäller — aldrig det frusna');

    const utanHarlett = { arvoScore: null, health_score: 92, should_switch: false, net_saving: null, annual_cost: 45600 };
    assert.equal(supplierDiagScore(utanHarlett), null,
      'utan underlag finns inget score — ett fruset tal får inte fylla tomrummet');
  });

  test('SK-06 · källan är källtextligt bunden: rummet rör inte health_score', () => {
    const src = readFileSync(join(ROT, 'src/lib/holdings.js'), 'utf8');
    const kod = src.split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
    assert.doesNotMatch(kod, /a\.health_score/,
      'rummet läser health_score igen — då är den andra producenten tillbaka');
    assert.match(kod, /a\.arvoScore/, 'rummet ska läsa det härledda talet');
  });

  test('SK-08 · domens PROSA får aldrig berömma ett pris som ligger över golvet', () => {
    // Tre ytor sa samma osanning i grundarens skärmdump: ringen (92), pillen (RÄTT PRISSATT) och
    // meningen "Priset är konkurrenskraftigt mot verifierat marknadspris". Alla tre läste
    // "ingen besparing att erbjuda" och översatte det till "priset är bra". Det är inte samma sak.
    const over = { category: 'saas-productivity', annual_cost: 45600, should_switch: false,
      prisunderlag: byggPrisunderlag({ annualCost: 45600, seats: 10, ankare: ANKARE }) };
    const text = buildReasoning(over);
    // Vakten förbjuder PÅSTÅENDET, inte ordet. Första versionen bannlyste /konkurrenskraftig/ och
    // fällde därmed den korrekta meningen "priset är INTE konkurrenskraftigt" — en vakt som mäter
    // vokabulär i stället för innebörd larmar på rätt beteende. Samma familj som ett larm som
    // skriker på fel saker: det blir avstängt, och då vaktar det ingenting.
    assert.doesNotMatch(text, /priset är konkurrenskraftig/i, 'ett pris 184 % över golvet får inte berömmas');
    assert.match(text, /inte konkurrenskraftig/i, 'och det ska sägas rakt ut');
    assert.match(text, /184% mer|184 % mer/, 'avståndet ska stå i klartext');
    assert.match(text, /Microsoft 365 Business Standard/, 'referensprodukten ska namnges');

    // Under golvet: då ÄR beskedet gott, och det ska få sägas.
    const under = { category: 'saas-productivity', annual_cost: 15000, should_switch: false,
      prisunderlag: byggPrisunderlag({ annualCost: 15000, seats: 10, ankare: ANKARE }) };
    assert.match(buildReasoning(under), /på eller under det billigaste publicerade priset/i);

    // Utan underlag: inget påstående om prisläget alls (regel 4).
    const utan = { category: 'saas-productivity', annual_cost: 45600, should_switch: false, prisunderlag: null };
    const u = buildReasoning(utan);
    assert.doesNotMatch(u, /konkurrenskraftig/i);
    assert.match(u, /inget påstående om prisläget/i);
  });

  test('SK-09 · kundens text bär aldrig vårt interna ord "golv"', () => {
    // Grundaren 2026-08-19: "Jag gillar inte termen 'över golvet'." Rätt — "golv" är VÅRT ord för
    // p25 i prisboken. En finansdirektör tänker inte i golv, och ett internt begrepp i kundytan
    // låter som att vi förutsätter att kunden känner vår modell. Fältet får heta golv i koden;
    // texten ska säga "billigaste publicerade pris" eller "lägsta pris".
    //
    // Vakten prövar domens prosa direkt. UTTALAD GRÄNS: den ser inte JSX-strängarna i rummet
    // (pillen, noten under underlaget) — de är renderingskod och kan inte anropas härifrån.
    // De byttes för hand i samma commit och skyddas bara av den här kommentaren.
    for (const rad of [
      { category: 'saas-productivity', annual_cost: 45600, should_switch: false,
        prisunderlag: byggPrisunderlag({ annualCost: 45600, seats: 10, ankare: ANKARE }) },
      { category: 'saas-productivity', annual_cost: 15000, should_switch: false,
        prisunderlag: byggPrisunderlag({ annualCost: 15000, seats: 10, ankare: ANKARE }) },
      { category: 'saas-productivity', annual_cost: 45600, should_switch: false, prisunderlag: null },
    ]) {
      assert.doesNotMatch(buildReasoning(rad), /golv/i,
        'internt begrepp läckte till kundens text');
    }
  });

  test('SK-07 · utan underlag finns inget score (fail-closed)', () => {
    assert.equal(scoreUrUnderlag(null), null);
    assert.equal(scoreUrUnderlag({ perEnhet: 0, golv: 1606 }), null);
    assert.equal(scoreUrUnderlag({ perEnhet: 4560, golv: 0 }), null);
    assert.equal(scoreUrUnderlag(byggPrisunderlag({ annualCost: 45600, seats: null, ankare: ANKARE })), null);
  });
});
