// tests/rumsredovisning.mjs — RUMMET FÅR INTE MOTSÄGA SIG SJÄLVT.
//
// BAKGRUNDEN (grundargranskning av det skarpa rummet 2026-08-15): fyra skärmbilder av en kunds
// egen sida lästes komponent för komponent. Ingen enskild siffra var falsk. Ändå gick rummet inte
// ihop, på fyra sätt som alla har samma form — ett påstående som var sant om SIN del och osant om
// HELHETEN:
//
//   1. Radarn: "Leverantörer 5 · Prissatta 5 · Under uppsikt 4". Talen kom från tre olika frågor
//      i två olika enheter. Läst uppifrån var det aritmetiskt omöjligt.
//   2. "Bevakat — inte prissatt" lovade "Vi läste varje faktura ni skickade … Inget föll mellan
//      stolarna" — samtidigt som rummet visade nio av tio. Fullständighet ingen kod kunde belägga.
//   3. Samma stycke räknade upp de tysta skälen ("utländsk valuta eller … verifierat svenskt
//      golv") och motsade kortet direkt under, som sa att fakturans egna tal inte gick ihop.
//   4. Domens konfidensrad sa "publika listpriser" även när domens rubriktal kom ur kundens egen
//      fakturarad. Rätt siffra, fel proveniens — vilket regel 3 räknar som fel.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   FÅNGAR: att räknarnas invariant bryts (prissatt + bevakat ≠ totalt), att ett fullständighets-
//           löfte eller en skäluppräkning återinförs i disciplinmontern, att konfidensraden blir
//           enkelgrenad igen, att bolagsnamn åter tillverkas ur en domän, och att det fyllda
//           rummet tappar sin intagsväg. Räknarna prövas genom att ANROPA roomCounts; resten är
//           källtextvakter, för copyn bor i JSX och har ingen annan åtkomstpunkt.
//   BLIND:  en källtextvakt ser att en formulering finns, aldrig att den RENDERAS. Flyttas
//           manifestet in bakom ett villkor som aldrig är sant förblir vakten grön. Den ser
//           heller inte NYA fullständighetslöften i andra ord ("allt är med", "komplett") —
//           listan växer med varje incident, precis som claims-audit. Att raderna faktiskt når
//           kundens skärm är fortfarande visuell verifiering (regel 8), inte den här sviten.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { roomCounts } from '../src/lib/holdings.js';
import { refineFinding, detectForensicFindings } from '../lib/forensics.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RUM = readFileSync(join(ROOT, 'src/pages/Portfolio/index.js'), 'utf8');

describe('RUMSREDOVISNING · räknare, löften och proveniens', () => {
  test('RR-01 · prissatt + bevakat = totalt, alltid (produktionsfallet 5/4/9)', () => {
    const fall = [
      { auto: 5, watched: 4 },   // grundarens rum: fem prissatta, fyra bevakade
      { auto: 0, watched: 3 },   // bara triagerat — får aldrig läsa som ett tomt rum
      { auto: 7, watched: 0 },   // inget bevakat
      { auto: 0, watched: 0 },
    ];
    for (const f of fall) {
      const c = roomCounts({
        autoAnalyses: Array.from({ length: f.auto }, (_, i) => ({ id: i })),
        watched: Array.from({ length: f.watched }, (_, i) => ({ supplier: `S${i}` })),
      });
      assert.equal(c.prissatta + c.bevakade, c.fakturor,
        `räknarna går inte ihop för ${JSON.stringify(f)} — det var exakt felet kunden såg`);
      assert.equal(c.prissatta, f.auto);
      assert.equal(c.bevakade, f.watched);
    }
  });

  test('RR-02 · radarn läser räknarna ur den delade funktionen, inte ur egna längder', () => {
    // Regressionen som orsakade felet: <span>Leverantörer</span> matad med suppliers.length
    // (bara de prissatta) bredvid en rad som visade de bevakade.
    assert.match(RUM, /roomCounts\(\{ autoAnalyses/, 'rummet ska härleda räknarna ur roomCounts');
    const radar = RUM.slice(RUM.indexOf('radar-stats'), RUM.indexOf('radar-foot'));
    assert.ok(radar.length > 50, 'radarns statistikblock hittades inte — har markupen bytt namn?');
    assert.doesNotMatch(radar, /suppliers\.length|autoAnalyses\.length|watched\.length/,
      'radarn räknar på egen hand igen — då kan raderna glida isär precis som förut');
    assert.match(radar, /counts\.fakturor/, 'totalen ska komma ur den delade räkningen');
  });

  test('RR-03 · disciplinmontern lovar aldrig fullständighet', () => {
    // "Inget föll mellan stolarna" är obeläggbart: en faktura vars beslut aldrig bokfördes syns
    // varken som prissatt, bevakad, pågående eller misslyckad. Saknas mekaniken ska LÖFTET bort.
    const monter = RUM.slice(RUM.indexOf('w-manifesto'), RUM.indexOf('w-manifesto') + 900);
    const forbjudna = [
      /inget föll mellan stolarna/i,
      /varje faktura ni (?:skickade|skickat)/i,
      /alla era fakturor/i,
      /samtliga fakturor/i,
    ];
    for (const re of forbjudna) {
      assert.doesNotMatch(monter, re,
        `fullständighetslöfte i kundytan utan kod som kan belägga det (regel 9): ${re}`);
    }
  });

  test('RR-04 · manifestet räknar inte upp de tysta skälen', () => {
    // Skälen bor i korten, ett per kort. Räknas de upp i introt måste listan hållas i synk med
    // watchedCard — och det gjorde den inte: balansfelet tillkom, introt nämnde det aldrig.
    const monter = RUM.slice(RUM.indexOf('w-manifesto'), RUM.indexOf('w-manifesto') + 900);
    assert.doesNotMatch(monter, /utländsk valuta/i,
      'introt räknar upp skäl igen — det motsäger korten så snart ett nytt skäl tillkommer');
  });

  test('RR-05 · konfidensraden följer domens faktiska källa', () => {
    const rad = RUM.slice(RUM.indexOf('<Confidence>'), RUM.indexOf('</Confidence>'));
    assert.ok(rad.length > 40, 'konfidensraden hittades inte');
    assert.match(rad, /Ur er egen faktura/,
      'ett forensiskt fynd måste bära fakturan som källa, aldrig "publika listpriser"');
    assert.match(rad, /publika listpriser/,
      'marknadsjämförelsen ska fortfarande bära sin egen källa');
    assert.match(rad, /acting && !hasSwitchAction/,
      'källan ska väljas av samma villkor som väljer domen — annars kan de glida isär');
  });

  test('RR-06 · inget bolagsnamn tillverkas ur en domän', () => {
    // Identitetsinvarianten: bolagsnamn kommer ur Bolagsverket eller inte alls. Rubriken tryckte
    // en kapitaliserad domänsträng ("Nordiskbygg") under ordet KONFIDENTIELLT.
    const fn = RUM.slice(RUM.indexOf('function companyFromEmail'), RUM.indexOf('function companyFromEmail') + 420);
    assert.doesNotMatch(fn, /toUpperCase\(\)\s*\+\s*name\.slice/,
      'domänen kapitaliseras till ett bolagsnamn igen — det är ett påhittat företag i rubriken');
    assert.match(fn, /return domain;/, 'domänen visas som det faktum den är');
  });

  test('RR-07 · det fyllda rummet har kvar en väg att skicka in fler fakturor', () => {
    // Intaget fanns bara i tomma rummet. Kunden som just läst sin dom hade ingen väg vidare.
    const fyllt = RUM.slice(RUM.indexOf('analyses !== null && suppliers.length > 0'),
                            RUM.indexOf('suppliers.length === 0'));
    assert.ok(fyllt.length > 1000, 'det fyllda rummets gren hittades inte');
    assert.match(fyllt, /INBOX_ADDR/, 'inbox-adressen saknas i det fyllda rummet');
    assert.match(fyllt, /<Dropzone/, 'uppladdningen saknas i det fyllda rummet');
  });

  test('RR-08 · datumet får inte sluta på dubbel punkt', () => {
    // "senast 14 aug.." — svensk kort månad bär sin egen punkt och meningen la på en till.
    assert.match(RUM, /const slutpunkt =/, 'hjälpen som avgör punkten saknas');
    assert.match(RUM, /senast \{latestDate\}<\/>\s*: null\}\{slutpunkt\(latestDate\)\}/,
      'kvittoraden lägger på en egen punkt efter ett datum som redan bär en');
  });
});

describe('FORENSIKEN · det retroaktiva kravet och citatet', () => {
  const rad = { description: 'Delbetalning iPad Air (Manad 38/36)', amount: 290 };

  test('RR-09 · slutbetald avbetalning räknar fram vad som REDAN är överbetalt', () => {
    const [f] = detectForensicFindings([rad], { periodMultiplier: 12 });
    assert.equal(f.type, 'hardware_overpaid');
    assert.equal(f.monthsOverpaid, 2, 'månad 38 av 36 = två månader utöver planen');
    assert.equal(f.overpaidToDate, 580, '2 × 290 kr — ur kundens egen rad, ingen marknadssiffra');
    assert.match(f.text, /580 kr/, 'kravet ska nå kundens text, annars är talet en tystnad med extra steg');
    assert.match(f.text, /kredit/i, 'kunden ska få veta att den kan begäras tillbaka');
  });

  test('RR-10 · texten citerar inte raden — fyndkortet gör det redan', () => {
    // Kortet renderar lineDescription i en egen monospace-chip. Stod raden även i prosan såg
    // kundens egen stavning ("Manad" utan å) ut som vårt fel.
    const [f] = detectForensicFindings([rad], { periodMultiplier: 12 });
    assert.doesNotMatch(f.text, /Delbetalning iPad Air/,
      'radtexten står två gånger i samma kort — andra gången mitt i vår egen mening');
    assert.equal(f.lineDescription, rad.description, 'chipen ska fortfarande bära citatet ordagrant');
  });

  test('RR-11 · ett LAGRAT fynd räknas om mot dagens detektor', () => {
    // Fyndet frystes i lead_finding_json den dag fakturan analyserades. Utan omräkning får en
    // kund som mejlade in i går aldrig se en skärpning vi gör i dag — trots att sanningen om
    // HENS rad var densamma hela tiden.
    const gammalt = {
      type: 'hardware_overpaid', severity: 'high', annualImpact: 3480, monthly: 290,
      lineDescription: rad.description,
      title: 'Avbetald hårdvara — ni betalar för utrustning ni redan äger',
      text: 'Raden "Delbetalning iPad Air (Manad 38/36)" visar månad 38 av 36 — avbetalningen är redan slutbetald.',
    };
    const ny = refineFinding(gammalt);
    assert.equal(ny.overpaidToDate, 580);
    assert.match(ny.text, /580 kr/);
    assert.equal(ny.annualImpact, 3480, 'fakta ur analysen får aldrig skrivas om vid läsning');
    assert.equal(ny.severity, 'high');
  });

  test('RR-12 · omräkningen är fail-open och rör aldrig ett fynd den inte äger', () => {
    assert.equal(refineFinding(null), null);
    const okant = { type: 'nagot_vi_inte_har_langre', text: 'orörd', annualImpact: 100 };
    assert.deepEqual(refineFinding(okant), okant, 'okänd typ ska passera orörd, aldrig kastas');
    // Radtexten bär inte längre mekanismen (guarden faller) → fyndet ska stå kvar som det är.
    const utanPlan = { type: 'hardware_overpaid', lineDescription: 'Avbetalning utan månadsangivelse', monthly: 100, text: 'gammal text' };
    assert.equal(refineFinding(utanPlan).text, 'gammal text');
  });
});
