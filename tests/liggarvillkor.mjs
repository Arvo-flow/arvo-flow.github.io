// tests/liggarvillkor.mjs — LV-01..05 · varje läsväg mot liggaren bär sin klass, och klassens villkor.
//
// ══ VARFÖR (2026-09-11, ur den fientliga granskningen av 6cd359f) ═══════════════════════════
// Jag stängde två dörrar och lämnade elva öppna, i samma session som jag citerade regeln mot det:
// **en fix som inte följs till alla konsumenter är en halv fix** (bibeln, 19 augusti).
//
// Granskaren mätte båda hålen:
//  · Testidentitetsgrinden satt på `storeDatapoint` (→ `invoice_datapoints`), men `invoice_analyses`
//    är en EGEN prisbokskälla med LÄGRE tröskel (5 mot 10) — alltså lättare att förorena än den
//    väg som stängdes. Samma skada, annan tabell.
//  · Arkivfiltret satt i 2 av 11 kundsynliga läsvägar. Månadsbriefingen, avtalspåminnelserna,
//    utfallsenkäten och prislarmens mottagarlista kunde alla mejla om rader kunden fått veta var
//    borttagna — arkiveringen hade varit en lögn i fyra ytor.
//
// Vakten finns för att den TOLFTE konsumenten ska hittas av en maskin, inte av nästa granskare.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en ny eller flyttad läsväg utan klassmarkör; en `kundvy` utan arkivfilter; ett
//     `moat`-aggregat utan testidentitetsspärr; ett `internt` utan skäl.
//   BLIND: den läser markören, aldrig innebörden — en läsväg FELklassad som `internt` med ett
//     rimligt skäl passerar. Samma gräns som vaktkontraktet: maskinen ser att svaret finns, aldrig
//     att det är sant. Och räckvidden är `api/` + `lib/`; ett skript eller en framtida vy med annat
//     namn ligger utanför, uttalat.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { KLASSER } from '../lib/liggarvillkor.js';
import { EJ_TESTIDENTITET_SKELETT, normaliseraSQL, arTestidentitet,
         TEST_EXAKTA, TEST_DOMAN, TEST_LOKALDELAR } from '../lib/test-surface.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

function kallfiler() {
  const ut = [];
  const ga = (d) => {
    for (const namn of readdirSync(d)) {
      if (namn.startsWith('.') || namn === 'node_modules') continue;
      const p = join(d, namn);
      if (statSync(p).isDirectory()) ga(p);
      else if (namn.endsWith('.js') || namn.endsWith('.mjs')) ut.push(p);
    }
  };
  ga(join(ROT, 'api')); ga(join(ROT, 'lib'));
  return ut;
}

/** Varje förekomst av FROM invoice_analyses med sitt utsnitt fram till satsens slut. */
function lasvagar() {
  const ut = [];
  for (const fil of kallfiler()) {
    // ⚠️ REGELNS EGEN DOKUMENTATION ÄR INTE EN LÄSVÄG. `lib/liggarvillkor.js` CITERAR frasen i
    // sin förklaring, och vakten fällde den — samma form som RD-08 som larmade på en kommentar.
    // `strippaStrangar` är fel verktyg här: satserna vi vaktar ÄR mallsträngar, så den hade
    // blankat just det vi letar efter. Uteslutningen är därför namngiven, inte mönsterbaserad.
    // UTTALAD BLINDFLÄCK: prosa i en ANNAN fil som nämner frasen ger fortfarande falsklarm — men
    // ett falsklarm är högljutt och lätt att rätta, medan en tyst miss är den farliga riktningen.
    if (fil.endsWith('lib/liggarvillkor.js')) continue;
    // ⚠️ SKIFTLÄGESOKÄNSLIGHETEN GJORDE VAKTEN PROSAKÄNSLIG. `lib/price-alert.js` har raden
    // «cross-customer aggregation from invoice_analyses» i en JS-kommentar, och den räknades som
    // en oklassad läsväg. Samma form som när vakten fällde regelns egen dokumentation (11 sept) —
    // JS-kommentarrader blankas därför ut FÖRE sökningen, med samma längd så radnummer står kvar.
    // (SQL-kommentarer får INTE blankas här: markörerna ÄR SQL-kommentarer. Två olika frågor.)
    const kod = readFileSync(fil, 'utf8').split('\n')
      .map((r) => (/^\s*(\/\/|\*|\/\*)/.test(r) ? ' '.repeat(r.length) : r)).join('\n');
    // ⚠️ MÖNSTRET SÅG VARKEN BLANKSTEG ELLER JOIN TILL 2026-09-13. Granskaren visade det med två
    // sabotage som båda lämnade sviten grön: en ny kundvy med `FROM   invoice_analyses` (tre
    // blanksteg) och en med `JOIN invoice_analyses`. Två VERKLIGA läsvägar var oklassade av precis
    // det skälet — `api/admin/dashboard.mjs:27` och `lib/labeled-corrections.js:83` — i filer där
    // grannraden var klassad. En vakt vars mönster är smalare än språket räknar ett skydd vi inte har.
    for (const m of kod.matchAll(/\b(?:FROM|JOIN)\s+invoice_analyses\b/gi)) {
      const i = m.index;
      // Utsnittet går till mallens slut (backtick) eller 700 tecken — vilket som kommer först.
      // Backticken är satsens VERKLIGA gräns; teckentaket är bara ett tak, aldrig ankaret.
      const slutBacktick = kod.indexOf('`', i);
      const slut = slutBacktick === -1 ? i + 1400 : Math.min(slutBacktick, i + 1400);
      // Satsens BÖRJAN behövs också: `INSERT INTO invoice_datapoints … SELECT … FROM
      // invoice_analyses` har skrivmålet FÖRE läsningen, så ett utsnitt som börjar vid FROM kan
      // aldrig se att satsen skriver till prisboken (LV-06 var grön av just det).
      const startBacktick = kod.lastIndexOf('`', i);
      const start = startBacktick === -1 ? Math.max(0, i - 3000) : Math.max(startBacktick, i - 3000);
      ut.push({
        fil: relative(ROT, fil),
        rad: kod.slice(0, i).split('\n').length,
        sats: kod.slice(i, slut),
        hela: kod.slice(start, slut),
      });
    }
  }
  return ut;
}

/**
 * Ta bort SQL-kommentarer så bara AKTIV sats återstår. Markörerna (`-- liggare: …`) är själva
 * SQL-kommentarer, så de läses ur RÅTEXTEN och villkoren ur den strippade — två frågor, två
 * texter. Utan det här kunde en bortkommenterad klausul räknas som närvarande.
 */
function aktivSQL(sats) {
  // ⚠️ STRIPPADE FÖRR BARA `--`. Granskaren kommenterade bort en klausul med `/* … */` och sviten
  // förblev grön — och blockformen är redan husstil i `lib/test-surface.js`. Båda formerna nu.
  return sats.replace(/\/\*[\s\S]*?\*\//g, ' ').split('\n').map((r) => r.replace(/--.*$/, '')).join('\n');
}

describe('LV · liggarens läsvägar är klassade', () => {
  const vagar = lasvagar();

  test('LV-01 · vakten hittar läsvägarna alls (aldrig grön av tomhet)', () => {
    // ⚠️ TALET SA 29 OCH TRÖSKELN 25 — sex lediga platser, alltså kunde sex läsvägar försvinna
    // tyst. Ommätt 2026-09-13 med det vidgade mönstret (FROM|JOIN, blanksteg, skiftläge): **31**
    // (internt 9 · moat 5 · kundvy 17). Tröskeln följer mätningen; ett tal, inte en tröskel.
    assert.ok(vagar.length >= 31, `hittade ${vagar.length} läsvägar — mätt 2026-09-13: 31. Sjunker talet har antingen en läsväg försvunnit eller mönstret slutat matcha, och båda ska synas`);
  });

  test('LV-02 · varje läsväg bär en klassmarkör', () => {
    const omarkta = vagar.filter((v) => !KLASSER.some((k) => v.sats.includes(`liggare: ${k}`)));
    assert.deepEqual(omarkta.map((v) => `${v.fil}:${v.rad}`), [],
      'en omärkt läsväg är en oställd fråga — klassa den som kundvy, moat eller internt: <skäl>');
  });

  test('LV-03 · en KUNDVY filtrerar alltid bort arkiverade rader', () => {
    // Arkivering betyder «borta ur kundens vy». En yta som ändå räknar raden gör arkiveringen
    // till en lögn — och kunden får ett mail om en faktura hen bad oss ta bort.
    //
    // ⚠️ SQL-KOMMENTARER STRIPPAS FÖRST, och det är inte kosmetik. Granskaren bortkommenterade
    // `-- AND arkiverad_at IS NULL` och sviten förblev grön: `includes()` ser strängen kvar i
    // texten. SQL-radkommentar är dessutom exakt den syntax markörerna själva använder, alltså
    // den mest sannolika formen av att ta bort en klausul. En vakt som räknar TOKEN i stället för
    // MEKANIK vaktar det som står skrivet, aldrig det som körs.
    // ⚠️ SAMMA DELSTRÄNGSFEL SOM LV-04 HADE: `arkiverad_at IS NULL OR TRUE` innehåller strängen
    // och fällde noll. Filtret måste stå som en egen konjunkt — `WHERE`/`AND` följt av villkoret
    // och sedan ett nytt `AND` eller satsens slut, aldrig ett `OR` som gör det verkningslöst.
    const egenKonjunkt = /\b(?:WHERE|AND)\s+arkiverad_at IS NULL(?:\s+(?:AND|ORDER|GROUP|LIMIT|\)|$))/i;
    const brott = vagar.filter((v) => v.sats.includes('liggare: kundvy')
      && !egenKonjunkt.test(normaliseraSQL(aktivSQL(v.sats)) + ' '));
    assert.deepEqual(brott.map((v) => `${v.fil}:${v.rad}`), [],
      'en kundvy utan arkivfilter visar rader kunden fått veta är borttagna');
  });

  test('LV-04 · ett MOAT-aggregat bär HELA testidentitetsvillkoret, tecken för tecken', () => {
    // ⚠️ PRÖVADE FÖRR BARA ATT NAMNET `MOAT_UTESLUT_TEST` STOD I SATSEN — och den konstanten var
    // EN e-poststräng medan `arTestidentitet` känner fem adresser plus varje `+tag`-variant. Fem
    // av sex testidentiteter passerade alltså grinden. «Testidentiteten är ett begrepp, inte en
    // e-poststräng» hade återkollapsat till en e-poststräng i SQL-halvan.
    //
    // Driven binder nya `${}` som PARAMETRAR, så villkoret måste skrivas ut i varje sats — en
    // kopia som språket tvingar fram. Då gäller bibelns regel: en kopia får finnas bara med en
    // maskin som bevisar att kopiorna är identiska. Här jämförs SKELETTET (interpolationer → `?`,
    // blanksteg kollapsade) mot den enda normen, efter att kommentarer strippats.
    // Tabellalias normaliseras bort (`ia.user_email` → `user_email`): backfillen i
    // `api/admin/run-migration.mjs` joinar med alias, och det är en skillnad i STAVNING, inte i
    // mekanik. Normaliseringen är medvetet SMAL — bara prefixet framför just `user_email`.
    const utanAlias = (t) => t.replace(/\b[a-z_][a-z0-9_]*\.user_email\b/gi, 'user_email');
    // ⚠️ JÄMFÖRDE FÖRR EN DELSTRÄNG UTAN SINA YTTERPARENTESER, och då bevisade den NÄRVARO men
    // aldrig ROLL. Granskaren vände hela grinden — `AND NOT (user_email IS NULL OR NOT (…))`, så
    // att prisbokens livegren byggdes UTESLUTANDE av testidentiteter — och sviten förblev grön.
    // Samma sak med `AND` → `OR`. Villkoret måste därför stå som en EGEN konjunkt: `AND ` följt av
    // hela normen inklusive ytterparenteser. Då kan ingen yttre operator ändra dess roll.
    const brott = vagar.filter((v) => v.sats.includes('liggare: moat')
      && !['AND', 'WHERE'].some((k) => utanAlias(normaliseraSQL(aktivSQL(v.sats))).includes(`${k} ${EJ_TESTIDENTITET_SKELETT}`)));
    assert.deepEqual(brott.map((v) => `${v.fil}:${v.rad}`), [],
      'ett moat-aggregat måste bära HELA villkoret — en avvikande stavning är en kopia som glidit isär');

    // Motprovet: normen får inte vara tom, annars matchar `includes` allt och LV-04 vaktar noll.
    assert.ok(EJ_TESTIDENTITET_SKELETT.length > 120, `normen är ${EJ_TESTIDENTITET_SKELETT.length} tecken — för kort för att vara ett villkor`);
    // Och det MÅSTE finnas moat-satser, annars är testet grönt av tomhet.
    assert.ok(vagar.some((v) => v.sats.includes('liggare: moat')), 'inga moat-satser alls — kontrollera mönstret');

    // Skelettet ska täcka varje form `arTestidentitet` känner. Uppräkningen här är INTE ett
    // andra facit: den fäller om någon vidgar JS-predikatet utan att vidga SQL-normen.
    for (const adr of ['testyta@arvoflow.se', 'test@inbox.arvoflow.se', 'testyta@inbox.arvoflow.se',
                       'nollstall@inbox.arvoflow.se', 'demo@inbox.arvoflow.se', 'test+bunt2@inbox.arvoflow.se']) {
      assert.ok(arTestidentitet(adr), `${adr} måste vara en testidentitet`);
    }
    assert.equal(arTestidentitet('kund@riktigt.se'), false, 'en riktig kund måste få bidra till moaten');
    assert.equal(arTestidentitet(null), false, 'en anonym uppladdning är en legitim marknadsobservation');
  });

  test('LV-06 · en sats som SKRIVER till prisboken kan aldrig vara internt', () => {
    // ⚠️ HÅLET SOM GRANSKAREN HITTADE, OCH SOM LV-04 INTE KAN SE. Backfillen i
    // api/admin/run-migration.mjs bar «internt: körs av admin med explicit avsikt» och var i
    // själva verket den ANDRA av exakt två skrivare till prisboken — utan någon grind alls.
    // Sabotaget «klassa om den till internt igen» fällde NOLL: LV-04 prövar bara satser som
    // redan ÄR märkta moat, så en felmärkning gömmer sig från precis den kontroll den behöver.
    //
    // Det här är den enda halvan som går att mekanisera: vakten kan aldrig läsa INNEBÖRDEN i ett
    // skäl, men den kan se att satsen skriver till `invoice_datapoints`. En läsning ur liggaren
    // som matar prisboken ÄR ett moat-aggregat, oavsett vem som trycker på knappen.
    const skrivare = vagar.filter((v) => /INSERT\s+INTO\s+invoice_datapoints/i.test(v.hela));
    const felklassade = skrivare.filter((v) => !v.sats.includes('liggare: moat'));
    assert.deepEqual(felklassade.map((v) => `${v.fil}:${v.rad}`), [],
      'en sats som skriver till prisboken är moat — «vem som trycker» svarar inte på «vad raderna blir»');
    // Motprovet: det MÅSTE finnas en sådan sats, annars är LV-06 grön av tomhet.
    assert.ok(skrivare.length >= 1, `hittade ${skrivare.length} prisboksskrivare — mätt 2026-09-13: 1`);
  });

  test('LV-07 · testidentitetens LISTOR är inte tomma (skelettet ser form, aldrig värden)', () => {
    // Skelettjämförelsen i LV-04 normaliserar bort varje `${…}` — den bevisar alltså att
    // villkoret har rätt FORM, aldrig att listorna innehåller något. Sabotaget «töm TEST_EXAKTA»
    // fällde följaktligen noll. Den halvan vaktas här, vid källan.
    assert.ok(TEST_EXAKTA.length >= 1, 'utan exakta adresser släpper villkoret igenom testytan');
    assert.ok(TEST_LOKALDELAR.length >= 4, `${TEST_LOKALDELAR.length} lokaldelar — mätt: 4 (test, testyta, nollstall, demo)`);
    assert.equal(TEST_DOMAN, 'inbox.arvoflow.se');
    // Och listorna måste beskriva samma mängd som JS-predikatet faktiskt känner.
    for (const e of TEST_EXAKTA) assert.ok(arTestidentitet(e), `${e} står i listan men är inte en testidentitet`);
    for (const l of TEST_LOKALDELAR) assert.ok(arTestidentitet(`${l}@${TEST_DOMAN}`), `${l}@${TEST_DOMAN} står i listan men känns inte igen`);
  });

  test('LV-08 · MOAT-aggregaten är ENIGA om arkiverade rader — ingen av dem filtrerar', () => {
    // 409b138 gav TVÅ av fem moat-satser `arkiverad_at IS NULL` och lämnade tre utan. Tre
    // aggregat över samma liggare räknade alltså över OLIKA populationer, och två av dem sitter
    // i SAMMA rum (api/invoice-history.mjs:432 och :609) — rumsredovisningens regel ordagrant:
    // tal som står bredvid varandra ska gå att jämföra.
    //
    // Riktningen kommer ur grundarbeslutet 2026-09-11: «proveniensen måste bestå för moatens
    // skull». Arkivering betyder «borta ur KUNDENS EGEN VY», aldrig «har aldrig observerats»;
    // X/Y-talet är ett anonymt tvärkundsaggregat och visar aldrig en kunds rader tillbaka för hen.
    const moat = vagar.filter((v) => v.sats.includes('liggare: moat'));
    const filtrerande = moat.filter((v) => normaliseraSQL(aktivSQL(v.sats)).includes('arkiverad_at IS NULL'));
    assert.deepEqual(filtrerande.map((v) => `${v.fil}:${v.rad}`), [],
      'ett moat-aggregat som filtrerar arkiverade rader underdriver vad vi observerat — och gör '
      + 'två räknare i samma rum oense om populationen');
    // Motprovet: det MÅSTE finnas moat-satser, annars är LV-08 grön av tomhet.
    assert.ok(moat.length >= 5, `hittade ${moat.length} moat-satser — mätt 2026-09-13: 5`);
  });

  test('LV-05 · ett INTERNT undantag bär alltid sitt skäl', () => {
    // «internt» utan motivering är «ingen frågade» förklätt till «prövat» — och de två får
    // aldrig se likadana ut (samma regel som triage-bokföringens inline-undantag).
    const utanSkal = vagar.filter((v) => v.sats.includes('liggare: internt') && !/liggare: internt: \S/.test(v.sats));
    assert.deepEqual(utanSkal.map((v) => `${v.fil}:${v.rad}`), [],
      'skriv `liggare: internt: <skäl>` — ett undantag utan skäl kan ingen granska');
    // Motprovet: det FINNS interna undantag, annars vaktar LV-05 ingenting.
    assert.ok(vagar.some((v) => v.sats.includes('liggare: internt:')), 'inga interna undantag alls — kontrollera mönstret');
  });
});
