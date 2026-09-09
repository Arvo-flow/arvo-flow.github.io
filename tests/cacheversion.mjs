// tests/cacheversion.mjs — CV-01/CV-02: cachen får aldrig servera ett svar från en äldre pipeline.
//
// ══ VARFÖR (2026-09-05) ═════════════════════════════════════════════════════════════════════
//
// Regel 7 säger: «bumpa cache-versioner vid varje pipelineändring som påverkar resultat». Den
// regeln har levt i MINNET i tre månader, och den 5 september höll jag på att glömma den.
//
// Leasing-fixen i `lib/forensics.js` gör att en faktura med raden «Leasing … (Månad 48 av 36)»
// får ett fynd på 29 400 kr som den inte fick förut. Utan en bumpad cache hade grundaren laddat
// upp samma PDF, fått det GAMLA cachade svaret utan fyndet, och dragit slutsatsen att fixen inte
// fungerade. En korrekt fix osynliggjord av en cache är omöjlig att skilja från en trasig fix.
//
// FÅNGAR: att `pdf:result`-versionen står kvar på ett tal som föregår en känd resultatändring.
// BLIND: vakten kan inte veta om en FRAMTIDA pipelineändring bumpats — den låser bara de
//   kopplingar som redan är kända. Varje ny resultatändring måste lägga sitt eget par här, och
//   det är med flit: en vakt som försöker gissa framtiden blir antingen tyst eller falsklarmande.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
const FORENSIK = readFileSync(join(ROT, 'lib/forensics.js'), 'utf8');

/** Versionen ur den enda cacheKey-raden — aldrig ur en kommentar. */
function cacheVersion() {
  const m = API.match(/const cacheKey = `pdf:result:v(\d+):/);
  assert.ok(m, 'cacheKey-raden hittades inte — bytte den form?');
  return Number(m[1]);
}

describe('CV · Cachen får aldrig servera ett svar från en äldre pipeline', () => {
  test('CV-01 · leasing-fixen och cache-versionen hänger ihop', () => {
    // Kopplingen är hela poängen: finns fixen i forensiken MÅSTE cachen ha bumpats förbi den
    // version som gällde före den. Annars serveras det gamla, tomma svaret för varje faktura
    // med en leasingrad — och 29 400 kr förblir osynliga trots att koden ser dem.
    const harLeasingFix = /AMORT_OVERPAID_RE\s*=/.test(FORENSIK) && /\|leasing\|/.test(FORENSIK);
    if (!harLeasingFix) return;                 // fixen borttagen → FO-01 äger det fallet
    assert.ok(cacheVersion() >= 15,
      `leasing-fixen finns men pdf:result står på v${cacheVersion()} — cachen serverar då `
      + 'gamla svar utan fyndet, och fixen ser ut att ha misslyckats');
  });

  test('CV-03 · riktningskravet och cache-versionen hänger ihop', () => {
    // Samma koppling, ny resultatändring (2026-09-05, Atea-kortet): finns den kodskrivna
    // inte-gap-texten i recommend.js MÅSTE cachen ha bumpats förbi v15. Annars läser en kund som
    // laddar upp samma PDF igen kvar den falska meningen «Microsofts listpris är lägre» ur cachen,
    // och rättningen ser ut att ha misslyckats — exakt CV-01:s sjukdom, en version senare.
    const REC = readFileSync(join(ROT, 'agents/recommender/recommend.js'), 'utf8');
    const harRiktningskrav = /function buildInteGapReasoning/.test(REC) && /export function lflPrisgap/.test(REC);
    if (!harRiktningskrav) return;              // rättningen borttagen → RK-02 äger det fallet
    assert.ok(cacheVersion() >= 16,
      `riktningskravet finns men pdf:result står på v${cacheVersion()} — cachen serverar då den `
      + 'gamla, falska prosan för varje redan analyserad faktura');
  });

  test('CV-04 · utgångskuvertet och cache-versionen hänger ihop', () => {
    // Sexton svarsvägar bär nu leadFinding/forensicFindings som de aldrig kunde bära förut.
    // Ett cachat v16-svar saknar fälten — och ett svar UTAN fynd är omöjligt att skilja från en
    // faktura utan fynd. Samma koppling, tredje resultatändringen.
    const harKuvert = /const svara = \(kropp\)/.test(API) && /forensicFindings: visa \? _forensik/.test(API);
    if (!harKuvert) return;                     // kuvertet borttaget → UK-06 äger det fallet
    assert.ok(cacheVersion() >= 17,
      `utgångskuvertet finns men pdf:result står på v${cacheVersion()} — cachen serverar då svar `
      + 'utan fynd för varje redan analyserad faktura, och fixen ser ut att ha misslyckats');
  });

  test('CV-05 · fyndrättens rättelse och cache-versionen hänger ihop', () => {
    // CV-04 krävde bara >= 17, och en ny RESULTATÄNDRING passerade därför obemärkt: sabotaget
    // «lämna cachen obumpad» fällde noll tester. Varje koppling måste bindas till SIN version,
    // annars är kedjan bara så stark som den första länken — och en vakt vars sabotage inte
    // fäller är ingen vakt.
    const harRattelse = /reason: 'categorization_conflict'/.test(API)
      && /tillitTillRader: true,[\s\S]{0,200}?reason: 'categorization_conflict'/.test(API);
    if (!harRattelse) return;                   // rättelsen borttagen → UK-11 äger det fallet
    assert.ok(cacheVersion() >= 18,
      `categorization_conflict bär nu sitt fynd men pdf:result står på v${cacheVersion()} — `
      + 'cachen serverar då den gamla tystnaden för varje redan analyserad faktura');
  });

  test('CV-06 · daterat fynd och cache-versionen hänger ihop', () => {
    const FOR = readFileSync(join(ROT, 'lib/forensics.js'), 'utf8');
    // ⚠️ VILLKORET INNEHÖLL DET SOM SABOTERADES. Första versionen krävde BÅDE funktionen OCH
    // kopplingen — så «ta bort kopplingen» fick vakten att hoppa över sig själv i stället för att
    // fälla. Grön av tomhet, i en vakt skriven samma timme. Villkoret är nu bara funktionens
    // existens; kopplingen är FO-10:s hårda assertion.
    const harDatum = /export function slutbetaldManad/.test(FOR);
    if (!harDatum) return;                      // datumet borttaget → FO-04 äger det fallet
    assert.ok(cacheVersion() >= 19,
      `fyndet daterar nu slutbetalningen men pdf:result står på v${cacheVersion()} — cachen `
      + 'serverar då den odaterade formen, och kortet renderar sin gamla kolliderande layout');
  });

  test('CV-07 · den borttagna bevakningsutfästelsen och cache-versionen hänger ihop', () => {
    const FOR = readFileSync(join(ROT, 'lib/forensics.js'), 'utf8');
    const harMekanik = /Skicka nästa faktura till oss/.test(FOR);
    if (!harMekanik) return;                    // ändringen borttagen → FO-12 äger det fallet
    assert.ok(cacheVersion() >= 20,
      `prosan lovar inte längre en bevakning men pdf:result står på v${cacheVersion()} — cachen `
      + 'serverar då det gamla löftet vidare för varje redan analyserad faktura');
  });

  test('CV-08 · per-nivå-riktningen och cache-versionen hänger ihop', () => {
    const REC = readFileSync(join(ROT, 'agents/recommender/recommend.js'), 'utf8');
    if (!/dominantRiktning/.test(REC)) return;   // rättningen borttagen → RK-09 äger det fallet
    assert.ok(cacheVersion() >= 21,
      `riktningen mäts per nivå men pdf:result står på v${cacheVersion()} — cachen serverar då den `
      + 'gamla motsägelsen på varje blandad licensmix');
  });

  test('CV-09 · de skopade påståendena och cache-versionen hänger ihop', () => {
    const REC = readFileSync(join(ROT, 'agents/recommender/recommend.js'), 'utf8');
    if (!/Gapet bärs av era/.test(REC)) return;   // rättningen borttagen → RK-14 äger det fallet
    assert.ok(cacheVersion() >= 22,
      `påståendena skopas nu till den citerade nivån men pdf:result står på v${cacheVersion()} — `
      + 'cachen serverar då den gamla självmotsägelsen på varje blandad licensmix');
  });

  test('CV-10 · den blandade fakturans tystnad och cache-versionen hänger ihop', () => {
    // `lasLicensniva` returnerar nu null när en igenkänd nivå står bredvid en DISKVALIFICERAD
    // licensrad (grundarens Microsoft-faktura 8 sep: Business Premium + Office 365 E3). Nivån
    // matar `detectPriceAlert` i analysvägen, vars svar cachas — ett v22-svar bär alltså kvar
    // det gamla `percentOver` mot Premiums golv, räknat på hela årskostnaden. Samma koppling
    // som CV-03..09: rätt fix, osynliggjord av en cache, omöjlig att skilja från en trasig fix.
    const LN = readFileSync(join(ROT, 'lib/licensniva.js'), 'utf8');
    if (!/if \(annanProdukt\) return null;/.test(LN)) return;   // borttagen → LN-10 äger fallet
    assert.ok(cacheVersion() >= 23,
      `blandade fakturor tystas nu men pdf:result står på v${cacheVersion()} — cachen serverar då `
      + 'det gamla avståndspåståendet för varje redan analyserad faktura');
  });

  test('CV-11 · fakturabalansen och cache-versionen hänger ihop', () => {
    // Svaret bär nu `fakturabalans`. Ett cachat v23-svar saknar fältet — och ett svar UTAN dom
    // är omöjligt att skilja från en faktura som går ihop. Samma koppling som CV-03..10.
    const FB = readFileSync(join(ROT, 'lib/fakturabalans.js'), 'utf8');
    if (!/export function bedomFakturabalans/.test(FB)) return;   // borttagen → FB-01 äger fallet
    assert.ok(cacheVersion() >= 24,
      `fakturabalansen bärs nu i svaret men pdf:result står på v${cacheVersion()} — cachen `
      + 'serverar då den domlösa formen för varje redan analyserad faktura');
  });

  test('CV-12 · kolumnläsaren och cache-versionen hänger ihop', () => {
    // Antalet läses nu ur fakturans egen kolumn och ERSÄTTER modellens tal. Ett cachat v24-svar
    // bär kvar det gissade antalet — och därmed en `suggestedAnnualCost` byggd på det. Samma
    // koppling som CV-03..11: rätt fix, osynliggjord av en cache.
    const FK = readFileSync(join(ROT, 'lib/fakturakolumner.js'), 'utf8');
    if (!/export function antalForRad/.test(FK)) return;   // borttagen → FK-01 äger fallet
    assert.ok(cacheVersion() >= 25,
      `kolumnläsaren ersätter nu modellens antal men pdf:result står på v${cacheVersion()} — `
      + 'cachen serverar då det gissade talet för varje redan analyserad faktura');
  });

  test('CV-13 · öresfixen och cache-versionen hänger ihop', () => {
    // Öresavläsningen ändrar `billedUnitMonthly`, `riktning`, `gapAnnual` och `dominantGapArs` —
    // alltså kortets dom OCH dess tal. Ett cachat svar från före fixen bär kvar den falska
    // riktningen för varje redan analyserad faktura. Samma koppling som CV-03..12.
    //
    // ⚠️ INGEN NY BUMP, OCH SKÄLET SKA STÅ SKRIVET. Tre resultatändringar delar v25 —
    // kolumnläsaren, seatCount-ordningen och öresfixen — därför att alla tre ligger på SAMMA
    // omergade branch och når produktionen i ett enda steg v24 → v25. Det finns alltså inga
    // v25-svar att servera, och en andra bump hade bara kastat cachen utan att skydda något.
    // CV-05:s läxa gäller ändå: kopplingen bokförs HÄR, så att en FJÄRDE resultatändring inte
    // kan åka snålskjuts på ett tal som redan är förbrukat.
    const REC = readFileSync(join(ROT, 'agents/recommender/recommend.js'), 'utf8');
    if (!/const felBudget = \(l\) =>/.test(REC)) return;   // fixen borttagen → RK-18 äger fallet
    assert.ok(cacheVersion() >= 25,
      `öresfixen finns men pdf:result står på v${cacheVersion()} — cachen serverar då den `
      + 'avrundningsdrivna riktningen för varje redan analyserad faktura');
  });

  test('CV-02 · det finns EXAKT en cacheKey — ingen kopia som kan glida isär', () => {
    // Två cache-nycklar är två sanningar, och den som bumpas är inte nödvändigtvis den som läses.
    const traffar = [...API.matchAll(/pdf:result:v\d+/g)].map((m) => m[0]);
    const unika = [...new Set(traffar)];
    assert.equal(unika.length, 1, `flera versioner i samma fil: ${unika.join(', ')}`);
  });
});
