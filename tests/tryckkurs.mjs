// tests/tryckkurs.mjs — TK-01..10: Ring 1 räknar tillbaka med FAKTURANS kurs, aldrig med vår.
//
// ══ VARFÖR (2026-09-10, Fable 5.1:s spricka 1) ═════════════════════════════════════════════
// Ring 1 prövar totalen i två läsningar: talet som det står, eller talet som ett SEK-motvärde
// tillbakaräknat till radernas valuta. Divisionen gjordes med `extracted.fxRate` — VÅR dagskurs.
// Men SEK-talet på pappret räknades fram av leverantören med DERAS kurs. Provet jämförde alltså
// två olika kurser och lät toleransen absorbera skillnaden.
//
// Att det ändå stämde berodde på att fixturen skrevs med samma konstant som kodens fallback
// (10,42). En tautologi mellan fixtur och fallback är ingen verifiering — och den kunde bara
// upptäckas av ett test där de två talen SKILJER SIG. Det är därför TK-03 finns.
//
// MÄTT före fixen, samma faktura, vår kurs varierad (`scripts/probe-tryckkurs.mjs`):
//   9,50 → ok «skillnaden är momsen»   ← FRIAD PÅ PÅHITTAD GRUND
//   9,70 → ok «skillnaden är momsen»   ← likaså
//   10,42 → ok (motvärdet, exakt)
//   11,20 → stopp
// Felläget var alltså inte att grinden fäller för lätt utan att den friar på fel grund: en
// valutadrift på 3–9 % tvättades som moms av tre-satsprovningen — samma fönster obduktionen
// dömde ut 20 augusti, på en ny axel.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: att divisionen åter görs med vår kurs, att motvärdesläsningen finns kvar utan tryckt
//     kurs, och att läsaren accepterar ett löst tal som en växelkurs.
//   BLIND: om FAKTURAN trycker fel kurs läser vi den felaktiga troget. Vi verifierar att talet
//     kommer från pappret, aldrig att pappret har rätt — och det är medvetet: leverantörens egen
//     uppgift är det bästa vittnet vi har om leverantörens egen omräkning. Vakten ser heller inte
//     kursformer vi inte råkat ut för; `atlassian-cloud-manad` skriver «konverterad från USD vid
//     kurs 10,31» utan att namnge paret intill talet och läses därför INTE (den fakturan är i SEK
//     och når aldrig motvärdesläsningen, så strängheten kostar ingenting där).
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { lasTryckKurs } from '../lib/tryckkurs.js';
import { routeExtraction } from '../agents/test-invoice/extract.js';
import { konverteraTillSek } from '../lib/valutakonvertering.js';
import { strippaStrangar } from '../lib/kalltextlexer.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Microsoft-fakturans verkliga tal ur produktionsloggen 2026-09-09. */
const MS = (tryckkurs) => ({
  supplier: 'Microsoft Ireland Operations Ltd', currency: 'USD',
  invoiceTotal: 8128,            // SEK-motvärdet, som modellen läste det
  annualCost: 9360, recurringAmount: 780, tryckkurs,
  lineItems: [
    { description: 'Microsoft 365 E3', quantity: 15, unitPrice: 22, amount: 330, type: 'recurring_subscription' },
    { description: 'Copilot', quantity: 15, unitPrice: 30, amount: 450, type: 'recurring_subscription' },
  ],
});
const domen = (tryckkurs, varKurs) => {
  const k = konverteraTillSek(MS(tryckkurs), { rate: varKurs, valuta: 'USD', source: 'riksbank', date: '2026-09-10' });
  return (routeExtraction(k, {}).verifications ?? []).find((v) => v.id === 'radsumma');
};

describe('TK · läsaren kräver att pappret namnger valutaparet', () => {
  test('TK-01 · Microsoft-fakturans verkliga textlager ger 10,42', () => {
    const text = readFileSync(join(ROT, 'test-corpus/textlager/microsoft-direkt-usd.txt'), 'utf8');
    const r = lasTryckKurs(text, 'USD');
    assert.equal(r?.kurs, 10.42);
    assert.match(r.rad, /SEK\/USD/, 'citatet ur pappret ska följa med — ett tal utan sin källrad '
      + 'är precis den sortens påstående vi inte tillåter någon annanstans');
  });

  test('TK-02 · ett löst tal nära ordet «kurs» är INGEN kurs', () => {
    // Strängheten är hela poängen: utan valutaparet i samma uttryck vet vi inte vad talet är per.
    assert.equal(lasTryckKurs('Valutakurs enligt avtal 10,42 tillämpas', 'USD'), null);
    assert.equal(lasTryckKurs('kurs 11,47 SEK/EUR', 'USD'), null, 'fel valutapar får aldrig läsas');
    assert.equal(lasTryckKurs('kurs 99,00 SEK/USD', 'USD'), null, 'utanför bandet är talet ingen kurs');
    assert.equal(lasTryckKurs(null, 'USD'), null);
    assert.equal(lasTryckKurs('kurs 10,42 SEK/USD', null), null, 'utan känd valuta finns inget par att kräva');
  });
});

describe('TK · Ring 1 dömer stabilt över hela kursbandet', () => {
  test('TK-03 · med tryckt kurs spelar VÅR kurs ingen roll', () => {
    // DET AVGÖRANDE TESTET. Fixturens tryckta kurs (10,42) skiljer sig från vår i tre av fyra
    // fall — annars vore provet samma tautologi som det ersätter.
    for (const varKurs of [9.5, 9.87, 11.5]) {
      const v = domen(10.42, varKurs);
      assert.equal(v.status, 'ok', `vår kurs ${varKurs} fällde en korrekt faktura`);
      assert.match(v.detalj, /SEK-motvärde/,
        `vår kurs ${varKurs} friade via FEL gren — «${v.detalj}»`);
    }
  });

  test('TK-04 · den påhittade momsförklaringen kan inte längre absorbera en valutadrift', () => {
    // Före fixen friades 9,50 och 9,70 med «skillnaden är momsen». Fakturan är USD med reverse
    // charge — det finns ingen moms att förklara med. Ett grönt med fel skäl är farligare än ett
    // rött, och det här testet fäller om den grenen någonsin tar över igen.
    for (const varKurs of [9.5, 9.7]) {
      assert.doesNotMatch(domen(10.42, varKurs).detalj, /momsen/,
        'en valutadrift får aldrig förklaras som moms — det är obduktionens 3–9 %-fönster');
    }
  });

  test('TK-05 · utan tryckt kurs finns motvärdesläsningen inte — och tystnaden bär sitt skäl', () => {
    // Två okända (totalens enhet OCH kursen) och en ekvation är inte prövbart. Fail-closed.
    const v = domen(null, 10.42);
    assert.equal(v.status, 'stopp');
    assert.match(v.detalj, /radsumma 780 USD/, 'skälet ska stå i fakturans egen valuta, aldrig i kr');
  });

  test('TK-06 · en faktura i fakturans EGEN valuta påverkas inte alls', () => {
    // Motprovet: normalfallet, där totalen står i USD. Ingen motvärdesläsning behövs, och fixen
    // får inte kosta något där. En grind som ändrar utfall utanför sitt område är en regression.
    const rak = { ...MS(null), invoiceTotal: 780 };
    const k = konverteraTillSek(rak, { rate: 10.42, valuta: 'USD', source: 'riksbank', date: '2026-09-10' });
    const v = (routeExtraction(k, {}).verifications ?? []).find((x) => x.id === 'radsumma');
    assert.equal(v.status, 'ok');
    assert.doesNotMatch(v.detalj, /SEK-motvärde/, 'den raka läsningen ska vinna när den stämmer');
  });
});

describe('TK · kursen kommer från pappret, inte från oss', () => {
  const EXTRACT = strippaStrangar(readFileSync(join(ROT, 'agents/test-invoice/extract.js'), 'utf8'));

  test('TK-07 · Ring 1 läser `tryckkurs`, aldrig `fxRate`', () => {
    // Lexad källtext: kommentarerna ovanför raden nämner `fxRate` för att förklara felet, och en
    // rå sökning hade fällt på beskrivningen av buggen i stället för på buggen (RD-08:s form).
    const ring1 = EXTRACT.slice(EXTRACT.indexOf('const alternativTotal') - 400,
      EXTRACT.indexOf('const alternativTotal') + 200);
    assert.match(ring1, /const kurs = Number\(extracted\.tryckkurs\)/);
    assert.doesNotMatch(ring1, /Number\(extracted\.fxRate\)/,
      'vår dagskurs får aldrig återinföras i motvärdesläsningen');
  });

  test('TK-08 · fältet FYLLS i produktionsvägen — annars är läsaren död kod', () => {
    // LFL-obduktionens läxa (12 aug): mekanismen prövad, matningen aldrig. Ett fält som ingen
    // fyller är omöjligt att skilja från ett fält som inte finns.
    assert.match(EXTRACT, /const tryckkurs = lasTryckKurs\(_textlager, aggregated\.currency\)/,
      'kursen måste läsas ur textlagret i extraktionen');
    assert.match(EXTRACT, /tryckkurs: tryckkurs\?\.kurs \?\? null/,
      'och nå resultatobjektet — null betyder «ingen tryckt kurs», aldrig ett defaultvärde');
  });

  test('TK-09 · kursen klassas som ICKE-pengar och konverteras därför aldrig', () => {
    const VK = readFileSync(join(ROT, 'lib/valutakonvertering.js'), 'utf8');
    assert.match(VK, /tryckkurs:\s+'fakturans EGEN/,
      'att gånga fakturans egen kurs med fakturans egen kurs vore cirkulärt — samma skäl som fxRate');
    assert.match(VK, /tryckkursRad:/, 'och citatet är en sträng, inte ett belopp');
  });

  // ══ TK-11..14: FIENTLIG GRANSKNING AV a6f776b (2026-09-10) ════════════════════════════════
  // Granskaren körde den riktiga kedjan med två kurser på samma papper och fick Ring 1 att FRIA
  // fakturan med skälet «skillnaden är momsen» — på en USD-faktura med reverse charge som inte
  // har någon moms. Läsaren tog FÖRSTA träffen och frågade aldrig om det fanns en andra.

  test('TK-11 · två motstridiga kurser på pappret ger ingen läsning', () => {
    const t = 'Aprilperioden växlades till kurs 9,10 SEK/USD. Majperioden: växlingskurs 10,42 SEK/USD per 2026-05-01';
    assert.equal(lasTryckKurs(t, 'USD'), null, 'pappret säger emot sig självt — då är kursen okänd');
  });

  test('TK-12 · SAMMA kurs upprepad är ingen konflikt', () => {
    // Motprovet. En spärr som fäller allt är lika värdelös som ingen spärr (OB-23:s läxa), och
    // en faktura som nämner sin kurs två gånger är det normala, inte det misstänkta.
    const t = 'Omräknat med kurs 10,42 SEK/USD. Summa i SEK enligt omräkningskurs 10,42 SEK/USD.';
    assert.equal(lasTryckKurs(t, 'USD')?.kurs, 10.42);
  });

  test('TK-13 · en tresiffrig kurs kringgår inte bandet genom att kapas', () => {
    // «110,42 SEK/USD» läste `\d{1,2}` som «10» och fick 10,42 — bandet [5,20] kringgicks genom
    // att LÄGGA TILL en siffra. Ett tal utanför bandet är inte en kurs, hur det än står skrivet.
    // VEM som håller det är mätt, inte antaget: KURSORD, inte en lookbehind. Fönstret slutar
    // omedelbart före talet, så står en siffra där kan fönstret aldrig sluta med ett kursord.
    // Sabotaget «ta bort kursordskravet» fäller det här testet; den `(?<!\d)` jag först skrev
    // fällde noll och är borta.
    assert.equal(lasTryckKurs('växlingskurs 110,42 SEK/USD', 'USD'), null);
    assert.equal(lasTryckKurs('kurs USD/SEK 110,42', 'USD'), null);
  });

  test('TK-14 · valutaparet räcker inte — pappret måste SÄGA att talet är en kurs', () => {
    // «Belopp SEK/USD 15,00» är en beloppskolumn med parvis rubrik, inte en växelkurs.
    assert.equal(lasTryckKurs('Belopp SEK/USD 15,00', 'USD'), null);
    assert.equal(lasTryckKurs('Total SEK/USD 12,50 för perioden', 'USD'), null);
    // MÄTT över alla 75 fakturor i test-pdfs/: kursordskravet kostar noll träffar. De tre som
    // finns bär alla ordet — «kurs 10,42 SEK/USD» (aws), «växlingskurs 10,42 SEK/USD» (microsoft),
    // «kurs 10,40 SEK/USD» (salesforce). Strängheten är gratis på verkligheten.
    assert.equal(lasTryckKurs('Konverterat från USD (kurs 10,42 SEK/USD). Detaljerad', 'USD')?.kurs, 10.42);
    assert.equal(lasTryckKurs('OBS: Faktura i USD — växlingskurs 10,42 SEK/USD per 2026-05-01', 'USD')?.kurs, 10.42);
    assert.equal(lasTryckKurs('Belopp ex. moms i SEK (kurs 10,40 SEK/USD, fakturadatum 2026-05-01).', 'USD')?.kurs, 10.4);
  });

  test('TK-15 · kursordet måste stå OMEDELBART före talet — avståndet är invarianten', () => {
    // Granskningen visade att `KURSORD_MAXLANGD` inte är en tröskel: sabotage 28 → 200 fällde noll
    // test. Det som BÄR är `$`-ankaret i KURSORD — mellan ordet och talet får bara blanksteg,
    // kolon eller likhetstecken stå. Det är den invarianten som prövas här, inte konstanten.
    const fyll = 'x'.repeat(150);
    assert.equal(lasTryckKurs(`kurs för april: ${fyll} 10,42 SEK/USD`, 'USD'), null,
      'ett kursord 150 tecken bort hör till en annan mening och får aldrig adoptera talet');
    assert.equal(lasTryckKurs('kurs för perioden avser en annan post 10,42 SEK/USD', 'USD'), null,
      'ett kursord med text emellan kvalificerar inte');
    // Motprovet — separatorerna som SKA släppa igenom, annars fäller vakten verkliga fakturor:
    assert.equal(lasTryckKurs('växlingskurs: 10,42 SEK/USD', 'USD')?.kurs, 10.42);
    assert.equal(lasTryckKurs('Valutakurs = 10,42 SEK/USD', 'USD')?.kurs, 10.42);
    assert.equal(lasTryckKurs('kurs  10,42 SEK/USD', 'USD')?.kurs, 10.42);
  });

  test('TK-10 · sonden som bar mätningen står kvar körbar', () => {
    // Ett mätvärde utan sitt instrument är ett påstående (antalsdoktrinens läxa).
    const sond = readFileSync(join(ROT, 'scripts/probe-tryckkurs.mjs'), 'utf8');
    assert.match(sond, /routeExtraction/, 'sonden måste köra den riktiga grinden, inte en modell av den');
  });
});
