// tests/utgangskrav.mjs — UTGÅNGSKRAVET: inget vi räknat får kastas på vägen ut.
//
// ══ VARFÖR (2026-09-05, ur Dustin-fakturan) ═════════════════════════════════════════════════
//
// Fakturan bar «Leasing Server (Månad 48 av 36)» — 29 400 kr slutbetald leasing, med kravbrevet
// till Dustin redan skrivet. Kunden fick «Kräver offert — våra experter kikar på detta».
//
// Forensiken bodde inne i `recommend()`. Mätt: 16 av 19 svarsvägar i api/test-invoice.mjs
// returnerade INNAN recommend() någonsin anropades. Sju kategorier är volymgrindade och fyra av
// dem står ordagrant i bibelns Nivå 3 — nivån vars hela produkt är att beväpna kunden med
// fyndet, och som monetiseras via prenumerationen. Vi byggde vapnet och routade det till tystnad.
//
// ── FAMILJEN, SOM INTE HADE ETT NAMN ────────────────────────────────────────────────────────
// Bibeln namnger EN felfamilj: ett okänt tillstånd som lånar ett giltigt värde. Den här är en
// annan, och den är dyrare eftersom arbetet redan är betalt i AI-anrop och verifierad prisdata:
//   · attribueringslåset  — text skriven, kastad bakom `shouldSwitch` (modellens egen dom)
//   · riktningskravet     — jämförelse räknad, kastad bakom `savingPerYear > 0`
//   · forensiken          — 29 400 kr + kravbrev, kastad på 16 av 19 utgångar
//   · triage-bokföringen  — beslut fattat, aldrig bokfört (1 av 10 utgångar, 14 aug)
//   · el-grenen           — analys klar, aldrig skriven till kundens liggare (15 aug)
//   · 'switch'-etiketten  — beslut nollat, etiketten överlevde serialiseringen (21 aug)
// **Utgångsförlusten**: vi räknar rätt och slänger svaret på vägen ut. Orsaken är strukturell —
// nitton handskrivna svar som var och en komponerar sitt objekt ur minnet.
//
// Testerna nedan låser BÅDA halvorna: kriteriet (fyndrätten) och strukturen (att ingen ny
// utgång kan kringgå kuvertet).
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { farVisaFynd } from '../lib/fyndratt.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');

// Dustin-fakturans verkliga rader, avlästa ur PDF:ens bildlager 2026-09-05.
const DUSTIN = { billingPeriod: 'monthly', lineItems: [
  { type: 'one_time_fee', description: 'ThinkPad T14 Gen 3', quantity: 2, unitPrice: 14_500, amount: 29_000 },
  { type: 'recurring_subscription', description: 'Leasing Server (Månad 48 av 36)', quantity: 1, unitPrice: 2_450, amount: 2_450 },
] };

describe('UK · Fyndrätten — får kundens egna rader läsas upp?', () => {
  test('UK-01 · en utgång UTAN deklaration är ett fel, aldrig ett tyst nej', () => {
    assert.throws(() => farVisaFynd({ extracted: DUSTIN }), /måste deklareras/);
    assert.throws(() => farVisaFynd({ tillitTillRader: 'ja', extracted: DUSTIN }), /måste deklareras/,
      'en sträng är inte ett svar — annars smyger ett truthy värde igenom som ett ja');
    assert.throws(() => farVisaFynd({ tillitTillRader: null, extracted: DUSTIN }), /måste deklareras/);
  });

  test('UK-02 · deklarerat misstroende tystar fyndet, med skäl', () => {
    const d = farVisaFynd({ tillitTillRader: false, extracted: DUSTIN });
    assert.equal(d.visa, false);
    assert.equal(d.skal, 'utgangen_litar_inte_pa_raderna');
  });

  test('UK-03 · Dustin-fallet: vi kan inte prissätta kategorin, men vi kan läsa raderna', () => {
    const d = farVisaFynd({ tillitTillRader: true, extracted: DUSTIN });
    assert.equal(d.visa, true);
    assert.equal(d.skal, 'kundens_egna_rader');
  });

  test('UK-04 · aritmetiken har veto när den FAKTISKT mätt ett brott', () => {
    const trasig = { lineItems: [
      { type: 'one_time_fee', description: 'ThinkPad T14 Gen 3', quantity: 2, unitPrice: 14_500, amount: 31_000 },
    ] };
    const d = farVisaFynd({ tillitTillRader: true, extracted: trasig });
    assert.equal(d.visa, false, '2 × 14 500 ≠ 31 000 — då är radernas tal inget underlag');
    assert.equal(d.skal, 'radaritmetiken_gar_inte_ihop');
  });

  // GRÖN AV TOMHET, den fällan jag höll på att bygga in. Första designen gatade på
  // `provbar && balanced`. Rader utan `quantity` ger `judged: 0` → grinden har inte mätt något,
  // och att läsa den tystnaden som ett nej hade RIVIT de tre utgångar som redan visar fynd.
  // En fix som tar bort värde där det redan flödar är ett sämre fel än det den lagar.
  test('UK-05 · en grind som inte kunnat mäta har inte sagt nej', () => {
    const oprovbar = { lineItems: [
      { type: 'recurring_subscription', description: 'Leasing Server (Månad 48 av 36)', amount: 2_450 },
    ] };
    const d = farVisaFynd({ tillitTillRader: true, extracted: oprovbar });
    assert.equal(d.visa, true,
      'utan quantity kan aritmetiken inte pröva raden — det är inte samma sak som att den underkänt den');
  });
});

describe('UK · Strukturen — ingen utgång kan kringgå kuvertet', () => {
  // Källvakt. Den läser TEXT, aldrig innebörd — men den flyttar bevisbördan till något en
  // granskare kan slå upp, och den fäller den vanligaste formen: en ny gren som kopierar en
  // gammal `return send(...)` och därmed tappar varje fält kuvertet bär.
  test('UK-06 · varje 200-svar går genom svara() (två motiverade undantag)', () => {
    const rader = API.split('\n');
    const träffar = rader
      .map((l, i) => ({ n: i + 1, l }))
      .filter(({ l }) => /return send\(res, 200/.test(l));
    // Undantagen är namngivna, inte generella: cacheträffen ligger FÖRE extraktionen (det finns
    // inga rader att läsa än — det cachade svaret bär sitt eget kuvert från den körning som
    // skapade det), och svara():s egen rad ÄR kuvertet.
    const tillatna = träffar.filter(({ l }) => /\{ \.\.\.cached, cached: true \}/.test(l) || /\.\.\.rest,/.test(rader[träffar.find(t => t.l === l).n]));
    const kvar = träffar.filter(({ l }) => !/\{ \.\.\.cached, cached: true \}/.test(l));
    assert.ok(träffar.length >= 2, 'vakten hittade inga send-rader alls — då är den grön av tomhet');
    assert.equal(kvar.length, 1,
      `en ny 200-utgång kringgår svara() (rad ${kvar.map(k => k.n).join(', ')}) — då tappar den `
      + 'leadFinding, forensicFindings och varje framtida fält kuvertet bär');
    assert.ok(tillatna.length >= 1);
  });

  test('UK-07 · varje svara()-anrop deklarerar sin tillit', () => {
    const anrop = [...API.matchAll(/return svara\(/g)].length;
    const deklarationer = [...API.matchAll(/^\s*tillitTillRader: (?:true|false|routing\.tillitTillRader \?\? false),$/gm)].length;
    assert.ok(anrop >= 15, `bara ${anrop} svara()-anrop hittades — vakten mäter inte det den påstår`);
    assert.equal(deklarationer, anrop - 1,
      'en utgång saknar tillitTillRader (−1 = den som sprider ...autoResponse och bär sin egen)');
  });

  test('UK-08 · varje deklaration bär ett skrivet skäl på raden ovanför', () => {
    const rader = API.split('\n');
    const utan = rader
      // Blocket ovanför, inte bara RADEN ovanför. Första versionen krävde att `// tillit:` stod
      // på exakt föregående rad — och fällde därmed de två deklarationer som har den UTFÖRLIGASTE
      // motiveringen, eftersom deras kommentar är flera rader lång. En vakt som straffar mer
      // motivering straffar rätt beteende (SK-08: förbjud påståendet, aldrig formen).
      .map((l, i) => ({ n: i + 1, l, fore: rader.slice(Math.max(0, i - 14), i).join('\n') }))
      .filter(({ l }) => /^\s*tillitTillRader: (?:true|false|routing\.tillitTillRader \?\? false),$/.test(l))
      .filter(({ fore }) => !/\/\/ tillit: \S.{20,}/.test(fore));
    assert.deepEqual(utan.map((u) => u.n), [],
      'en deklaration utan motivering är en gissning med maskinstöd — skälet ska gå att granska');
  });

  test('UK-09 · fyndet räknas EN gång per faktura', () => {
    const REC = readFileSync(join(ROT, 'agents/recommender/recommend.js'), 'utf8');
    assert.match(REC, /Array\.isArray\(input\.forensik\)/,
      'recommend() måste kunna ta emot api-lagrets beräkning — annars räknas samma rader två '
      + 'gånger i produktionsvägen, och det är LFL-felets form (fyra kopior av samma matte)');
    assert.match(API, /forensik: _forensik,/,
      'api-lagret måste skicka in sin beräkning, annars är mottagandet i recommend() död kod');
  });

  test('UK-10 · en triagerad faktura behåller sina rader', () => {
    const STORE = readFileSync(join(ROT, 'lib/invoice-store.js'), 'utf8');
    assert.match(STORE, /storeTriaged\(\{[^)]*lineItems = null \}\)/,
      'utan raderna går en tystad faktura inte att rädda när grinden lagas — mätt i produktion: '
      + 'Dustin-raden hade line_items_json = NULL');
    assert.match(STORE, /SET line_items_json = \$\{JSON\.stringify\(lineItems\)\}::jsonb/);
    assert.match(API, /lineItems: extracted\.lineItems,/,
      'anroparna måste faktiskt skicka raderna — ett fält som ingen fyller är ett fält som inte finns');
  });
});

// ── UK-11..13 · FYNDRÄTTEN RÄTTAD (2026-09-05, mätt i produktion samma dag) ─────────────────
// Sonden mot produktions-DB gav skälet `categorization_conflict` på Dustin-raden — inte den
// generiska grenen jag gissat ur kortets copy. Och den utgången hade jag själv deklarerat
// `false`, med motiveringen «våra kontroller är oense». Konflikten är mellan Sonnets och Haikus
// KATEGORI: båda läste samma rader och bråkade om etiketten.
//
// Det är samma sammanblandning som buggen fixen byggdes mot, en nivå ned — och den begicks i
// fixen, inom en timme. Testerna nedan låser de tre exakta fallen så att de inte kan glida
// tillbaka, och de är skrivna att FÄLLA gårdagens kod.
describe('UK · Fyndrätten — etikettstrid är inte avläsningstvivel', () => {
  const API2 = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
  const EXTRACT = readFileSync(join(ROT, 'agents/test-invoice/extract.js'), 'utf8');

  /** Deklarationen som står närmast FÖRE en given reason-sträng i källtexten. */
  const deklarationFor = (kalla, reason) => {
    // lastIndexOf, inte indexOf: samma reason-sträng står FÖRST i storeTriaged-anropet, där
    // ingen deklaration finns. Att läsa den förekomsten gav «ingen deklaration» — mitt eget
    // mätinstrument som letade på fel ställe, för tjugoandra gången den här veckan.
    const i = kalla.lastIndexOf(reason);
    assert.ok(i > 0, `hittade inte ${reason} i källan — vakten mäter inte det den påstår`);
    const fore = kalla.slice(Math.max(0, i - 1400), i);
    const m = [...fore.matchAll(/tillitTillRader: (true|false|routing\.tillitTillRader[^,]*),/g)];
    assert.ok(m.length > 0, `ingen deklaration före ${reason}`);
    return m[m.length - 1][1];
  };

  test('UK-11 · categorization_conflict bär sitt fynd (etikettstrid, inte talstrid)', () => {
    assert.equal(deklarationFor(API2, "reason: 'categorization_conflict'"), 'true',
      'Sonnet och Haiku bråkar om KATEGORIN; båda läste samma rader. Fyndet är '
      + 'kategoriagnostiskt per konstruktion — 29 400 kr tystades av just den här raden.');
  });

  test('UK-12 · fingerprint_mismatch likaså — den jämför kategorier, inte tal', () => {
    assert.equal(deklarationFor(API2, "reason: 'fingerprint_mismatch'"), 'true');
  });

  test('UK-13 · den som VET varför den stannar deklarerar — inte anroparen', () => {
    // Min kommentar på den generiska grenen löd «skälet är inte känt på den här raden». Osant:
    // routing.reason låg i scope. Nu deklarerar routeExtraction per skäl, och api-lagret läser.
    assert.match(API2, /tillitTillRader: routing\.tillitTillRader \?\? false,/,
      'api-lagret ska LÄSA routeExtractions deklaration, inte gissa en egen');
    const konfidensgren = EXTRACT.slice(EXTRACT.indexOf('under tröskel ${CONFIDENCE_THRESHOLD}'));
    assert.match(konfidensgren.slice(0, 800), /tillitTillRader: false,/,
      'en konfidens under tröskeln ÄR ett avläsningstvivel — den enda av de sex som är det');
    assert.match(EXTRACT, /Konfidenspoäng saknas[\s\S]{0,400}?tillitTillRader: true,/,
      'OKÄNT är inte LÅGT — en kontroll som inte kunde utföras har inte sagt nej');
  });
});

// ── UK-14..17 · KVOTEN OCH CACHEN (2026-09-05, grundaren slog i taket) ───────────────────────
// Grundaren fick «max 5/dag» mitt i det testfönster han själv bett om. Tre fel bakom det:
//   1. Cacheläsningen låg EFTER rate-limitern, som räknar upp kvoten. En kund som öppnade samma
//      faktura igen brände en av fem analyser på NOLL AI-anrop — vi tog betalt i kvot för arbete
//      vi inte utförde.
//   2. Triagerade svar cachades aldrig (de returnerar före cacheskrivningen), så de mest
//      tvetydiga fakturorna var de enda som aldrig fick ett snabbt, stabilt svar.
//   3. «max 5/dag» stod hårdkodat i frontend medan backend ägde talet — höjde vi taket ljög ytan.
describe('UK · Kvoten tas bara ut för arbete vi faktiskt utför', () => {
  const API3 = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');

  test('UK-14 · cachen läses FÖRE kvoten räknas upp', () => {
    const cache = API3.indexOf('const cached = await kv.get(cacheKey);');
    const kvot  = API3.indexOf('const rlSkal = await checkRateLimit(kv, clientIp);');
    assert.ok(cache > 0 && kvot > 0, 'ankarna hittades inte — vakten mäter inte det den påstår');
    assert.ok(cache < kvot,
      'rate-limitern RÄKNAR UPP kvoten; ligger den före cacheläsningen debiteras kunden för '
      + 'ett svar vi hämtade ur minnet');
    assert.equal((API3.match(/const cached = await kv\.get\(cacheKey\);/g) ?? []).length, 1,
      'två cacheläsningar är två sanningar — den som bumpas är inte nödvändigtvis den som läses');
  });

  test('UK-15 · svara() cachar även triagerade svar', () => {
    assert.match(API3, /kvRef\.set\(cacheKey, _svar, \{ ex: PDF_CACHE_TTL \}\)/,
      'utgången är enda stället cachen kan stängas för ALLA grenar samtidigt');
  });

  test('UK-16 · IP-taket är bundet till grindpausens fönster och stänger sig självt', () => {
    assert.match(API3, /const takPerDygn = \(\) => \(grindPausad\(\) \? RATE_LIMIT_TEST : RATE_LIMIT_MAX\);/,
      'ett höjt tak utan självstängning är ett tillstånd någon måste minnas att återställa');
    assert.match(API3, /if \(count >= takPerDygn\(\)\) return 'ip-tak';/,
      'räknaren måste läsa det DYNAMISKA taket — annars är höjningen död kod');
    assert.doesNotMatch(API3, /if \(count >= RATE_LIMIT_MAX\)/);
  });

  test('UK-17 · taket ägs av backend och ytan har ingen egen kopia', () => {
    // Kommentarrader strippas först: vakten fällde sin egen förklaring av felet den vaktar mot.
    // En ordvakt som läser kommentarer straffar den som dokumenterar (SK-08, tredje gången i dag).
    const FRONT = readFileSync(join(ROT, 'src/pages/TestaFaktura/index.js'), 'utf8')
      .split('\n').filter((r) => !/^\s*(\/\/|\*|\/\*)/.test(r)).join('\n');
    assert.match(API3, /takPerDygn: kvProblem \? null : takPerDygn\(\),/,
      'svaret måste bära talet, annars kan ytan bara gissa');
    assert.doesNotMatch(FRONT, /max 5\/dag/,
      'en hårdkodad kopia av backendens gräns blir falsk i samma sekund gränsen ändras');
    assert.match(FRONT, /data\?\.takPerDygn/,
      'och utan tal från servern ska ytan tiga om siffran, aldrig hitta på en');
  });
});

// ── UK-18 · HELHETSKRAVET PÅ ALLA GRENAR (2026-09-06) ────────────────────────────────────────
// Jag lagade den generiska review_queue-grenen 5 september och rapporterade det som klart. Kortet
// kunden FAKTISKT fick renderades av `volume_data_required`, som stod orörd: under ett exakt fynd
// med färdigskrivet kravbrev stod «Kräver offert — våra experter kikar på detta», vilket läses som
// att vi drar tillbaka det vi just sagt. Bibeln 19 aug: en fix som inte följs till ALLA konsumenter
// är en halv fix — och jag rapporterade halvan som helheten.
describe('UK · Rutan under fyndet erkänner det, på varje gren', () => {
  const FRONT = readFileSync(join(ROT, 'src/pages/TestaFaktura/index.js'), 'utf8');

  test('UK-18 · varje review_queue-rubrik läser _harFynd, ingen har en egen kopia', () => {
    // EN läsväg. En kopia per gren var precis det som gjorde halvfixen möjlig.
    assert.match(FRONT, /const _harFynd = !!\(result\?\.leadFinding \?\? result\?\.recommendation\?\.leadFinding\);/,
      'flaggan måste läsa SAMMA väg som FindingCard — annars kan rubriken erkänna ett fynd som '
      + 'inte renderas, eller tiga om ett som gör det');

    const rubriker = [...FRONT.matchAll(/<strong>\{_harFynd/g)].length;
    assert.ok(rubriker >= 3,
      `bara ${rubriker} rubriker läser _harFynd — minst tre review_queue-grenar kan visa ett fynd `
      + '(volume_data_required, no_benchmark, den generiska fallbacken)');

    // Motprovet: den gamla, motsägande rubriken får inte stå kvar OVILLKORLIGT någonstans.
    assert.doesNotMatch(FRONT, /<strong>Kräver offert — våra experter kikar på detta\.<\/strong>/,
      'en ovillkorlig «kräver offert»-rubrik under ett levererat fynd är motsägelsen vi lagade');
  });
});

// ── UK-19 · ETT MISSLYCKANDE FÅR INTE BÄRA EN BOCK (2026-09-06) ──────────────────────────────
// `catch { setReviewQueueEmailState('sent'); } // non-fatal — show success anyway`
// Misslyckades anropet visade ytan «✓ Vi hör av oss när analysen är klar!» medan ingenting
// lagrades. Felfamiljen i sin renaste kundvända form — ett misslyckande som bär ett giltigt
// värde — och kommentaren intygade att det var avsiktligt.
describe('UK · Ett misslyckande syns som ett misslyckande', () => {
  // Kommentarrader strippas: vakten fällde annars den kommentar som FÖRKLARAR felet den vaktar
  // mot. Tredje gången i dag att en ordvakt straffar den som dokumenterar — därför samma
  // strippning som UK-17, och därför står den här raden här som en påminnelse om mönstret.
  const KALLA = readFileSync(join(ROT, 'src/pages/TestaFaktura/index.js'), 'utf8');
  const FRONT2 = KALLA.split('\n').filter((r) => !/^\s*(\/\/|\*|\/\*)/.test(r)).join('\n');

  test('UK-19 · review_queue-mejlet visar aldrig framgång på ett fel', () => {
    assert.doesNotMatch(FRONT2, /setReviewQueueEmailState\('sent'\);\s*\n\s*\}/,
      'ett catch-block som sätter «sent» är den lögn vi tog bort — mätt på KODEN, inte på ordet');
    assert.match(KALLA, /HÄR STOD `catch \{ setReviewQueueEmailState\('sent'\); \}/,
      'skälet ska stå kvar i koden — annars återinför nästa läsare mönstret i god tro');
    assert.match(FRONT2, /setReviewQueueEmailState\(svar\.ok \? 'sent' : 'failed'\);/,
      'en 200:a är inte ett kvitto om kroppen säger nej — svaret måste LÄSAS, inte antas');
    assert.match(FRONT2, /catch \{\s*\n\s*setReviewQueueEmailState\('failed'\);/,
      'ett kastat anrop är ett misslyckande, aldrig en tyst framgång');
    assert.match(FRONT2, /reviewQueueEmailState === 'failed'/,
      'ytan måste ha ett läge för felet — annars finns tillståndet men syns inte');
    assert.match(FRONT2, /det är vårt fel, inte ert/,
      'skulden är vår; vi säger aldrig till kunden att hen gjort fel (regel 3)');
  });
});

// ── UK-20 · TRE FIXAR SOM VAR OPRÖVADE (2026-09-06, sabotaget avslöjade det) ─────────────────
// Efter Fables granskning rättade jag fem fel. Tre av sabotagen fällde NOLL tester — alltså var
// tre av fixarna gröna på fel grund, i samma pass som de skrevs.
describe('UK · Fables tre plausibla — nu låsta', () => {
  const K = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');

  test('UK-20a · kreditnotan visar inget fynd förrän vi mätt en riktig', () => {
    // Motiveringen löd «forensiken filtrerar negativa rader ändå» — men filtret (`amount <= 0`)
    // sitter på RADEN, och en kreditnota listar ofta sina rader POSITIVA med negativ total. Då
    // kan «ni betalar för utrustning ni redan äger» visas på ett dokument som betalar TILLBAKA.
    // lastIndexOf: samma reason-sträng står FÖRST i storeTriaged-anropet, där ingen deklaration
    // finns. Tredje gången jag gör exakt det felet i den här filen — mätinstrumentet som letar på
    // fel förekomst. Att skriva ner det här är billigare än att göra om det en fjärde gång.
    const i = K.lastIndexOf("reason: 'credit_note'");
    assert.ok(i > 0, 'ankaret hittades inte — vakten mäter inte det den påstår');
    const fore = K.slice(Math.max(0, i - 1200), i);
    const m = [...fore.matchAll(/tillitTillRader: (true|false),/g)];
    assert.equal(m[m.length - 1]?.[1], 'false',
      'utan en verklig kreditnota att mäta mot är fail-closed rätt sida (regel 4: tystnad när '
      + 'vi varken har fakta eller en grundad uppfattning)');
  });

  test('UK-20b · en cacheträff bokförs — annars är beslutet osynligt för nästa kund', () => {
    // Triagerade svar cachades ALDRIG förut, så de bokfördes alltid. När svara() började cacha
    // dem fick nästa kund svaret men INGEN rad i sin liggare — bokföringsplikten (14 aug) bruten
    // av min egen cachefix. Ett obokfört beslut är omöjligt att skilja från ett tapp.
    const i = K.indexOf("console.log('[cache] träff");
    assert.ok(i > 0);
    const block = K.slice(i, i + 1400);
    assert.match(block, /storeTriaged\(\{/,
      'cacheträffen returnerar utan att bokföra — nästa kund ser inget beslut i sin liggare');
    assert.match(block, /cached\.route && cached\.route !== 'auto'/,
      'bara triage-rutterna bokförs här; auto-vägens analysrad är en egen, äldre lucka');
  });

  test('UK-20c · cacheKey skrivs på EXAKT ett ställe', () => {
    const skrivningar = [...K.matchAll(/\.set\(cacheKey,/g)].length;
    assert.equal(skrivningar, 1,
      `${skrivningar} skrivningar av samma nyckel. Den andra skrev \`autoResponse\`, som SAKNAR `
      + 'kuvertets toppnivåfält — utan ordningsgaranti kan den magrare formen bli den som ligger '
      + 'kvar, och kortet tappar sitt fynd');
  });
});

// ── UK-21 · ETT VISAT FYND MÅSTE NÅ RUMMET (2026-09-07) ──────────────────────────────────────
// Mätt i produktion: den triagerade Dustin-raden hade sina rader lagrade men `lead_finding_json`
// NULL. Fyndet nådde kundens KORT men aldrig kundens RUM (api/invoice-history läser kolumnen).
// Utgångsförlusten ett lager ned — samma familj, ny yta.
//
// Den uppenbara fixen hade varit FEL: låter man `storeTriaged` skriva fyndet återuppstår precis de
// fynd farVisaFynd medvetet tystade, i den enda yta där ingen ser att de tystats. `storeTriaged`
// körs FÖRE `svara()` och känner inte beslutet.
describe('UK · Fyndet sparas där beslutet fattas', () => {
  const K = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
  const STORE = readFileSync(join(ROT, 'lib/invoice-store.js'), 'utf8');

  test('UK-21a · skrivningen ligger i svara(), efter fyndrättens dom', () => {
    // ⚠️ FÖRSTA VERSIONEN LÅSTE EN ANROPSPLATS POSITION, INTE EGENSKAPEN. Sabotaget «lägg till en
    // skrivning FÖRE domen» fällde noll: den gamla anropsplatsen låg kvar efter domen, och vakten
    // såg bara den. En vakt som mäter ETT anrop är blind för ett ANDRA.
    // Egenskapen som måste hålla: VARJE storeLeadFinding-anrop matas med ett fynd som passerat
    // fyndrätten — `lead` (efter domen) eller `cached.leadFinding` (filtrerat av körningen som
    // skapade svaret). Varje annat argument är per definition ett ofiltrerat fynd.
    const TILLATNA = ['leadFinding: lead })', 'leadFinding: cached.leadFinding })'];
    const anrop = [...K.matchAll(/storeLeadFinding\(\{[^)]*\}\)/g)].map((m) => m[0]);
    assert.ok(anrop.length >= 2, `bara ${anrop.length} anrop — vakten mäter inte det den påstår`);
    for (const a of anrop) {
      assert.ok(TILLATNA.some((t) => a.endsWith(t)),
        `ett storeLeadFinding-anrop matas med ett OFILTRERAT fynd: ${a} — då hamnar precis de `
        + 'fynd farVisaFynd tystade i rummet, den enda yta där ingen ser att de tystats');
    }
    const dom = K.indexOf('const { visa, skal } = farVisaFynd(');
    const skriv = K.indexOf('storeLeadFinding({ fingerprint, pdfHash, leadFinding: lead })');
    assert.ok(dom > 0 && skriv > 0 && dom < skriv,
      'skrivningen av `lead` måste ligga efter domen som producerar den');
    assert.doesNotMatch(STORE, /storeTriaged\(\{[\s\S]{0,900}?lead_finding_json/,
      'storeTriaged får ALDRIG skriva fyndet: den körs före beslutet och skulle återuppväcka '
      + 'precis de fynd vi tystat');
  });

  test('UK-21b · cacheträffen sparar samma fynd den servar', () => {
    const i = K.indexOf("console.log('[cache] träff");
    assert.match(K.slice(i, i + 1800), /storeLeadFinding\(\{ fingerprint, pdfHash, leadFinding: cached\.leadFinding \}\)/,
      'utan den får andra kunden svaret men inget fynd i sitt rum — samma hål, cachevägen');
  });

  test('UK-21c · inget fynd skriver INGENTING, aldrig null', () => {
    assert.match(STORE, /if \(!leadFinding \|\| typeof leadFinding !== 'object' \|\| !leadFinding\.type\) return null;/,
      'att skriva null hade kunnat radera ett fynd en annan väg lagt — tystnad är inte en radering');
    // Skopat till FUNKTIONSKROPPEN: `hashFp` används även av storeTriaged/storeAnalysis, så ett
    // filbrett /hashFp\(fingerprint\)/ var grönt även när just den här funktionen slutat hasha.
    // Femte gången samma instrumentfel — jag mäter fel förekomst. Därför skopas det nu.
    const kropp = STORE.slice(STORE.indexOf('export async function storeLeadFinding'),
      STORE.indexOf('export async function storeTriaged'));
    assert.ok(kropp.length > 200, 'funktionskroppen hittades inte — vakten mäter inte det den påstår');
    assert.match(kropp, /hashFp\(fingerprint\)/,
      'fingerprinten HASHAS före uppslaget; kolumnen kan aldrig innehålla den råa (SV-09)');
  });
});
