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
import { radarRader } from '../src/lib/holdings.js';
import { roomCounts } from '../lib/lagesregister.js';
import { refineFinding, detectForensicFindings } from '../lib/forensics.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RUM = readFileSync(join(ROOT, 'src/pages/Portfolio/index.js'), 'utf8');

describe('RUMSREDOVISNING · räknare, löften och proveniens', () => {
  test('RR-01 · prissatt + mottaget + bevakat = totalt, alltid (produktionsfallet 5/4/9)', () => {
    // ── KONTRAKTSÄNDRING, ÖPPET REDOVISAD (2026-08-21) ──────────────────────────────────────
    // Invarianten var `prissatta + bevakade = fakturor` med `prissatta = varje auto-rad`. Men
    // kortet skriver «Mottagen» på en auto-rad UTAN prisunderlag, så rubriken räknade som
    // prissatta rader rummet självt märkte mottagna. Räknaren skiljer nu på de två, och
    // invarianten har fått en tredje term. Vakten fällde ändringen på sin första körning —
    // vilket är precis vad den finns för.
    const rad = (medPris) => (medPris ? { id: 1, prisunderlag: { perEnhet: 4560, golv: 1606 } } : { id: 2 });
    const fall = [
      { prissatta: 5, mottagna: 0, watched: 4 },   // grundarens rum: fem prissatta, fyra bevakade
      { prissatta: 0, mottagna: 0, watched: 3 },   // bara triagerat — får aldrig läsa som ett tomt rum
      { prissatta: 7, mottagna: 0, watched: 0 },   // inget bevakat
      { prissatta: 0, mottagna: 0, watched: 0 },
      { prissatta: 1, mottagna: 1, watched: 0 },   // fallet ur skärmdumpen: en prissatt, en mottagen
      { prissatta: 0, mottagna: 4, watched: 2 },   // allt obedömt — får ALDRIG läsa som fyra prissatta
    ];
    for (const f of fall) {
      const c = roomCounts({
        autoAnalyses: [
          ...Array.from({ length: f.prissatta }, () => rad(true)),
          ...Array.from({ length: f.mottagna }, () => rad(false)),
        ],
        watched: Array.from({ length: f.watched }, (_, i) => ({ supplier: `S${i}` })),
      });
      assert.equal(c.prissatta + c.mottagna + c.bevakade, c.fakturor,
        `räknarna går inte ihop för ${JSON.stringify(f)} — det var exakt felet kunden såg`);
      assert.equal(c.prissatta, f.prissatta,
        'en rad utan prisunderlag får aldrig räknas som prissatt — kortet kallar den «Mottagen»');
      assert.equal(c.mottagna, f.mottagna);
      assert.equal(c.bevakade, f.watched);
      assert.equal(c.analyserade, f.prissatta + f.mottagna);
    }
  });

  test('RR-02 · radarn läser räknarna ur den delade funktionen, inte ur egna längder', () => {
    // Regressionen som orsakade felet: <span>Leverantörer</span> matad med suppliers.length
    // (bara de prissatta) bredvid en rad som visade de bevakade.
    // Lägesregistret (2026-09-23): räknarna räknas EN gång i api-lagret (lib/lagesregister.js roomCounts)
    // och kommer i `data.rum.counts`. Rummet får inte räkna dem själv igen.
    assert.match(RUM, /const counts = rum\?\.counts/, 'rummet ska läsa räknarna ur API:ts rumsläge');
    assert.doesNotMatch(RUM, /roomCounts\(/, 'rummet räknar sina räknare själv igen');
    const radar = RUM.slice(RUM.indexOf('radar-stats'), RUM.indexOf('radar-foot'));
    assert.ok(radar.length > 50, 'radarns statistikblock hittades inte — har markupen bytt namn?');
    assert.doesNotMatch(radar, /suppliers\.length|autoAnalyses\.length|watched\.length/,
      'radarn räknar på egen hand igen — då kan raderna glida isär precis som förut');
    // ⚠️ HÄR STOD /counts\.fakturor/ — en KÄLLTEXTKONTROLL på JSX:en. Raderna bor nu i
    // radarRader() (src/lib/holdings.js), så texten finns inte längre i komponenten. Vakten
    // prövar i stället att JSX:en MAPPAR över den delade funktionen, och RR-11 prövar vad
    // funktionen faktiskt returnerar. Ett beteendeprov slår ett textprov varje gång.
    assert.match(radar, /radarRader\(counts\)/, 'radarn ska mappa över den delade funktionen');
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

  test('RR-11 · konfidensraden påstår aldrig «Verifierat» i det omätta läget', () => {
    // ⚠️ AVLÄST I RUMSBILDEN 2026-09-22, på dagens fem produktionsrader: raden löd
    // «Verifierat · grundat på 0 prissatta fakturor · publika listpriser» — direkt under domen
    // «er position mot listpris kunde inte mätas i dag». Orsaken var en TVÅVÄGSGREN på ett
    // TREVÄRT tillstånd; `omatt` fanns i samma render men chippet frågade den aldrig.
    // DL-10/DL-11:s form, tredje gången.
    const rad = RUM.slice(RUM.indexOf('<Confidence>'), RUM.indexOf('</Confidence>'));
    assert.ok(rad.length > 40, 'konfidensraden hittades inte');
    // Tre utgångar, inte två — och den omätta måste komma FÖRE den verifierade, annars fångar
    // `else` den igen.
    assert.match(rad, /:\s*omatt\s*\n?\s*\?/,
      'det omätta läget måste vara en EGEN gren i konfidensraden');
    const iOmatt = rad.indexOf('omatt');
    const iVerifierat = rad.indexOf('Verifierat');
    assert.ok(iOmatt > 0 && iVerifierat > iOmatt,
      '«Verifierat» får inte stå i den gren som fångar det omätta');
    assert.match(rad, /Inte mätt i dag/,
      'det omätta läget ska SÄGA något — tystnad är inte fixen (DL-10b:s läxa)');
  });

  test('RR-12 · «Era priser står sig» fälls bara där registret säger att priset är mätt och bra', async () => {
    // ⚠️ AVLÄST I DET SKARPA RUMMET 2026-09-23 (rum-prisboken.yml, arvoflow.se/portfolio):
    // «Era priser står sig i dag» stod längst ner i samma vy som «er position mot listpris kunde
    // inte mätas i dag». Orsaken var `acting ? A : B` — tvåvägsgren på trevärt tillstånd, fjärde
    // gången på ett dygn. Meningen är ett POSITIVT PRISPÅSTÅENDE, och den frågan äger ett register
    // (`beromsLage`); konsumenter ska importera svaret, aldrig härleda om det (11 sep, regel b).
    const i = RUM.indexOf('Era priser står sig i dag');
    assert.ok(i > 0, 'meningen hittades inte — ändrades den, måste vakten följa med');
    // Villkoret som väljer meningen ska stå närmast före den och vara registrets fråga.
    const fore = RUM.slice(Math.max(0, i - 220), i);
    assert.match(fore, /rum\?\.berom\s*\n?\s*\?\s*<>$/,
      '«Era priser står sig» väljs inte av beromsLage — då kan den fällas i ett omätt läge');
    // MOTPROVET: registret måste faktiskt säga NEJ i det omätta läget, annars vaktar raden ingenting.
    const { beromsLage } = await import('../lib/lagesregister.js');
    assert.equal(beromsLage('lugn_omatt'), false, 'det omätta läget får aldrig berömma priset');
    assert.equal(beromsLage('lugn_battre'), true, 'motprov: ett mätt, bättre läge FÅR säga det');
    // Och det omätta läget får fortfarande en mening — tystnad är inte fixen (DL-10b).
    const efter = RUM.slice(i, i + 900);
    assert.match(efter, /:\s*<>Arvo vaktar de avtal ni delat\./,
      'det omätta läget ska få en neutral mening, inte ett hål');
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

  test('RR-13 · pekarna i domen pekar åt samma håll som layouten', () => {
    // Brödtexten sa "se vad domen bygger på NEDAN" medan fyndkortet renderas OVANFÖR domen — och
    // konfidensraden två centimeter under sa "i fyndet OVAN". Två pekare, samma kort, motsatta håll.
    const iFynd = RUM.indexOf('<FindingCard finding={roomFinding}');
    const iDom  = RUM.indexOf('<Verdict>', iFynd);
    assert.ok(iFynd > 0 && iDom > iFynd, 'fyndkortet ska renderas före domen — har ordningen ändrats?');
    const domtext = RUM.slice(RUM.indexOf('const verdictWork'), iFynd);
    assert.doesNotMatch(domtext, /domen bygger på nedan/,
      'domen pekar nedåt mot ett kort som står ovanför den');
  });

  test('RR-14 · scorens prosa hämtar sin valör ur samma källa som mätaren', () => {
    // Noten hedgade ("i nivå med eller bättre än") under en mätare som redan tagit ställning.
    const not = RUM.slice(RUM.indexOf('className="idx-note"'), RUM.indexOf('className="idx-note"') + 900);
    // KONTRAKTET SKÄRPTES 2026-08-20. Testet krävde `standing.label` — alltså att prosan läser
    // samma källa som mätaren. Avsikten är rätt och står kvar, men mekanismen var fel: en
    // jämförelse mot en visningsETIKETT slutade tyst fungera när etiketterna döptes om, och då
    // föll varje kund igenom till "Ni betalar mer än marknaden". Nyckeln (`niva`) kan inte
    // skrivas om av en copyändring. Se OB-06.
    assert.match(not, /standing\.niva/,
      'noten måste läsa standings NYCKEL — en etikettjämförelse dör tyst vid nästa omdöpning');
    assert.doesNotMatch(not, /i nivå med eller bättre/, 'hedgen ska bort när mätaren tagit ställning');
  });

  test('RR-15 · klockslaget står på ETT ställe i radarn', () => {
    const radar = RUM.slice(RUM.indexOf('<Radar>'), RUM.indexOf('</Radar>'));
    const traffar = (radar.match(/relSwept\(vakt\.sweptAt\)/g) || []).length;
    assert.equal(traffar, 0,
      'fotraden upprepar urtavlans tid — samma klockslag två gånger i ett kort på 100 px');
    assert.match(radar, /toLocaleTimeString/, 'urtavlan ska fortfarande bära tiden');
  });

  test('RR-16 · marknadsankaret utger sig inte för att vara kohorten', () => {
    const start = RUM.indexOf('{branchAnchor && (() => {');
    const ankare = RUM.slice(start, RUM.indexOf('</Truth>', start));
    assert.ok(ankare.length > 1000, 'ankarkortet hittades inte');
    assert.doesNotMatch(ankare, /<span>Den kollektiva sanningen<\/span>/,
      'ankaret bär kohortens namn medan dess egen fotnot erkänner att kohorten inte finns än');
    assert.match(ankare, /Marknadsankaret/, 'kortet ska heta det det är');
    const platt = ankare.replace(/\s+/g, ' ');
    assert.match(platt, /nästan alla företag ligger under/i,
      'kortet ska säga att ett pris under listpris är normalt — annars är jämförelsen smickrande brus');
    // Och det motsatta fallet får INTE dela text med det normala. Att ligga över leverantörens
    // eget skyltpris är ovanligt och rummets vassaste möjliga besked; en not om att "de flesta
    // ligger under" skulle ta udden av det. Fångades i min egen skärmdump, inte av en kund.
    assert.match(platt, /overList/,
      'kortet skiljer inte på om kunden ligger över eller under listpris — samma text för två motsatta sanningar');
    assert.match(platt, /mer än\s*(?:<\/em>)?\s*leverantörens eget listpris|ni ligger över/i,
      'över-listpris-fallet ska namnges som det fynd det är');
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
    const [f] = detectForensicFindings([rad], { billingPeriod: 'monthly' });
    assert.equal(f.type, 'hardware_overpaid');
    assert.equal(f.monthsOverpaid, 2, 'månad 38 av 36 = två månader utöver planen');
    assert.equal(f.overpaidToDate, 580, '2 × 290 kr — ur kundens egen rad, ingen marknadssiffra');
    // Kravet bärs numera av kortets nyckeltal och av kravbrevet — inte av prosan (den läste som
    // två tal av samma sort bredvid varandra). Guarden flyttade dit talet flyttade.
    assert.doesNotMatch(f.text, /580 kr/, 'beloppet ska inte upprepas i prosan');
    assert.ok(f.letter, 'ett bevisat krav ska bära ett färdigt brev — annars är fyndet en observation');
    assert.match(f.letter.body, /580 kr/, 'brevet ska bära beloppet');
    assert.match(f.letter.body, /[Kk]reditering/, 'brevet ska begära kreditering');
  });

  test('RR-10 · texten citerar inte raden — fyndkortet gör det redan', () => {
    // Kortet renderar lineDescription i en egen monospace-chip. Stod raden även i prosan såg
    // kundens egen stavning ("Manad" utan å) ut som vårt fel.
    const [f] = detectForensicFindings([rad], { billingPeriod: 'monthly' });
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
    const ny = refineFinding(gammalt, { supplier: 'Telia' });
    assert.equal(ny.overpaidToDate, 580);
    assert.match(ny.letter.body, /580 kr/, 'omräkningen ska ge även brevet, inte bara talet');
    assert.match(ny.letter.body, /Till Telia/, 'brevet ska adresseras till leverantören på raden');
    assert.equal(ny.annualImpact, 3480, 'fakta ur analysen får aldrig skrivas om vid läsning');
    assert.equal(ny.severity, 'high');
  });

  test('RR-17 · kravbrevet är mekanik, aldrig ett löfte om att VI skickar det', () => {
    // Nivå 3 i Switch-doktrinen: Arvo BEVÄPNAR. Vi har ingen kanal mot leverantörens kundtjänst
    // och får därför aldrig antyda att brevet går iväg av sig självt (regel 9 — löftet och koden
    // levereras tillsammans). Kunden kopierar och skickar i eget namn.
    const [f] = detectForensicFindings(
      [{ description: 'Delbetalning iPad Air (Manad 38/36)', amount: 290 }],
      { billingPeriod: 'monthly', supplier: 'Telia' });
    const allt = `${f.letter.subject} ${f.letter.body}`;
    assert.doesNotMatch(allt, /vi (?:skickar|har skickat|kontaktar|mejlar)|å era vägnar|automatiskt/i,
      'brevet antyder att Arvo utför något vi inte har mekanik för');
    assert.match(f.letter.body, /Till Telia/, 'brevet ska adresseras till leverantören på raden');
    assert.match(f.letter.body, /månad 38 av en avbetalningsplan på 36/,
      'kravet ska bära sitt eget bevis — planens position ur kundens egen rad');

    const kortet = readFileSync(join(ROOT, 'src/components/FindingCard.js'), 'utf8');
    assert.match(kortet, /Vi skrev brevet/, 'knappen ska säga vad vi FAKTISKT gjorde: skrev det');
    assert.doesNotMatch(kortet, /Skicka brevet|Vi skickar/,
      'en knapp som säger "skicka" lovar en kanal som inte finns');
  });

  test('RR-18 · inget krav utan bevisat underlag (fail-closed)', () => {
    // En avbetalning INOM planen har inget att kräva tillbaka. Ett brev där vore en tillverkad
    // fordran i kundens namn — värre än tystnad.
    const [inomPlan] = detectForensicFindings(
      [{ description: 'Avbetalning surfplattor (Månad 12/36)', amount: 200 }],
      { billingPeriod: 'monthly', supplier: 'Dustin' });
    assert.equal(inomPlan.letter, undefined, 'inget krav finns → inget brev får skrivas');
    assert.equal(inomPlan.overpaidToDate, undefined);

    // Och utan känt radbelopp kan kravet inte räknas — då ska brevet utebli, inte gissa.
    assert.equal(refineFinding({
      type: 'hardware_overpaid', lineDescription: 'Delbetalning (Månad 38/36)', monthly: null,
    }, { supplier: 'X' }).letter, undefined);
  });

  test('RR-12 · omräkningen är fail-open och rör aldrig ett fynd den inte äger', () => {
    assert.equal(refineFinding(null), null);
    const okant = { type: 'nagot_vi_inte_har_langre', text: 'orörd', annualImpact: 100 };
    assert.deepEqual(refineFinding(okant), okant, 'okänd typ ska passera orörd, aldrig kastas');
    // Radtexten bär inte längre mekanismen (guarden faller) → fyndet ska stå kvar som det är.
    const utanPlan = { type: 'hardware_overpaid', lineDescription: 'Avbetalning utan månadsangivelse', monthly: 100, text: 'gammal text' };
    assert.equal(refineFinding(utanPlan).text, 'gammal text');
  });
  test('RR-09 · ingen kundsynlig räknare renderar suppliers.length', () => {
    // 2026-08-21, ur regel 8-genomgången. `suppliers.length` räknar varje leverantör i innehavet
    // — även de vars kort säger «Mottagen». Fyra ytor citerade det som «prissatta»/«vi kunde
    // prissätta», alltså ett arbete vi inte utfört på de raderna. roomCounts är den enda källan.
    //
    // Villkor (`suppliers.length > 0`) är legitima och fälls inte; vakten letar efter talet
    // RENDERAT bredvid en enhet.
    const brott = [];
    RUM.split('\n').forEach((rad, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(rad.trim())) return;
      // ⚠️ HÅLET: mönstret krävde en BOKSTAV direkt efter talet. Rummets stora tal renderade
      // `{suppliers.length}<small>avtal</small>` — alltså en `<`, inte en bokstav — och gled
      // igenom i tretton månader, i den vakt som skrevs mot precis det kortet (mätt 2026-09-22).
      // En enhet kan lika gärna stå i ett element som i ren text.
      if (/\{suppliers\.length\}\s*(?:<|[A-Za-zÅÄÖåäö])/.test(rad)) brott.push(`rad ${i + 1}: ${rad.trim().slice(0, 90)}`);
    });
    assert.deepEqual(brott, [],
      'ett kundsynligt tal om hur många fakturor vi PRISSATT måste komma ur roomCounts — ' +
      'suppliers.length räknar även de mottagna:\n  ' + brott.join('\n  '));
  });

  test('RR-10 · räknaretiketten namnger det tal som står under den', () => {
    // «Fakturor» stod över counts.prissatta. Det var sant så länge de två alltid var lika —
    // och blev osant i samma sekund räknaren skilde prissatta från mottagna. En etikett som
    // bara råkar stämma är inte en etikett (helhetskravet).
    // Ankaret är etikettvalet självt, inte «rstat» — det senare förekommer flera gånger och
    // första träffen var en annan rad. En vakt som ankrar för brett fäller på fel grund.
    // ⚠️ ANKRADE FÖRR PÅ EN STRÄNG I JSX:EN. Etikettvalet bor nu i radarRader(), så vakten
    // prövar FUNKTIONEN i stället för texten — samma invariant, men mätt på beteendet.
    // «Fakturor» stod över counts.prissatta. Det var sant så länge de två alltid var lika, och
    // blev osant i samma sekund räknaren skilde prissatta från mottagna. En etikett som bara
    // råkar stämma är inte en etikett (helhetskravet).
    const odelat = radarRader(roomCounts({ autoAnalyses: [{ prisunderlag: {} }], watched: [] }));
    assert.equal(odelat.find((r) => r.nyckel === 'prissatta').etikett, 'Fakturor',
      'odelat underlag: prissatta ÄR alla fakturor, och etiketten får säga så');
    for (const delande of [
      { autoAnalyses: [{ prisunderlag: {} }, { prisunderlag: null }], watched: [] },
      { autoAnalyses: [{ prisunderlag: {} }], watched: [1] },
    ]) {
      const r = radarRader(roomCounts(delande));
      assert.equal(r.find((x) => x.nyckel === 'prissatta').etikett, 'Prissatta',
        'så snart underlaget är delat måste etiketten namnge DELEN, inte helheten');
    }
  });

  test('RR-11 · radarns SYNLIGA tal går ihop — hela fältet, inte ett stickprov', () => {
    // ⚠️ MÄTT 2026-09-18. Radarn plockade TRE av räknarens FEM fält och utelämnade `mottagna`.
    // Enumererat över 36 tillstånd: ytan gick inte ihop i 16, alltid med `mottagna > 0`, och det
    // saknade beloppet var EXAKT `counts.mottagna` i samtliga — vilket uteslöt avrundning och
    // dubbelräkning. Datamodellen och aggregeringen var friska; felet satt i renderingen.
    //
    // Testet kör PRODUKTIONENS `radarRader`, samma funktion JSX:en mappar över. En tidigare sond
    // modellerade renderingsreglerna och kunde bara bevisa vad reglerna i filen säger — aldrig
    // vad komponenten gör. Nu finns en funktion, och den prövas här.
    const brott = [];
    let provade = 0;
    for (const p of [0, 1, 2, 5, 11]) {
      for (const m of [0, 1, 3, 9]) {
        for (const b of [0, 1, 4, 12]) {
          provade += 1;
          const c = roomCounts({
            autoAnalyses: [...Array(p).fill({ prisunderlag: {} }), ...Array(m).fill({ prisunderlag: null })],
            watched: Array(b).fill(1),
          });
          const rader = radarRader(c);
          const total = rader.find((r) => r.total);
          const delar = rader.filter((r) => !r.total).reduce((s, r) => s + r.varde, 0);
          // Invarianten: visas ett totaltal ska de andra SYNLIGA talen summera till det.
          if (total && delar !== total.varde) brott.push(`${p}/${m}/${b}: ${delar} ≠ ${total.varde}`);
          // Och varje rad med ett värde > 0 måste synas — en post som aldrig renderas är precis
          // det fel som mättes.
          for (const [nyckel, varde] of [['prissatta', c.prissatta], ['mottagna', c.mottagna], ['bevakade', c.bevakade]]) {
            if (varde > 0 && !rader.some((r) => r.nyckel === nyckel)) brott.push(`${p}/${m}/${b}: ${nyckel}=${varde} renderas inte`);
          }
        }
      }
    }
    assert.ok(provade >= 60, `bara ${provade} tillstånd prövade — mät inte på tomhet`);
    assert.deepEqual(brott.slice(0, 6), [], `${brott.length} av ${provade} tillstånd går inte ihop`);

    // MOTPROVEN, båda bärande.
    // 1 · Ett ODELAT underlag ska INTE visa en total — «Fakturor» och enda delraden vore samma
    //     tal två gånger, och en vakt som kräver en total överallt hade tvingat fram just det.
    const odelat = radarRader(roomCounts({ autoAnalyses: [{ prisunderlag: {} }, { prisunderlag: {} }], watched: [] }));
    assert.equal(odelat.length, 1, 'odelat underlag ska visa EN rad');
    assert.equal(odelat[0].etikett, 'Fakturor', 'och den raden namnger totalen, inte en del');
    // 2 · Etiketten måste namnge sitt tal (helhetskravet 15 aug): så snart underlaget är delat
    //     får raden med `prissatta` inte längre heta «Fakturor».
    const delat = radarRader(roomCounts({ autoAnalyses: [{ prisunderlag: {} }, { prisunderlag: null }], watched: [] }));
    assert.equal(delat.find((r) => r.nyckel === 'prissatta').etikett, 'Prissatta');
  });

});
