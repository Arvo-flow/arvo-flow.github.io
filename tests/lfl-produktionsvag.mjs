// tests/lfl-produktionsvag.mjs — LÅSER SIGNALEN, INTE MEKANISMEN.
//
// ── VARFÖR DEN HÄR FILEN FINNS ────────────────────────────────────────────────────────────────
// Attribueringslåset byggdes 2026-06-11 och förklarades stängt i bibeln. Sex regressionstester
// låste NMIT-texten. Sviten var grön i två månader. Låset hade under hela tiden ALDRIG fyrat i
// produktion — därför att api/test-invoice.mjs byggde sitt like-for-like-objekt med en LOKAL KOPIA
// av matten som utelämnade `tierLines`, och `buildLikeForLikeReasoning` returnerar null utan dem.
//
// De sex testerna bevisade att MEKANISMEN reagerar när den matas. De kunde aldrig bevisa att den
// någonsin MATADES. Exakt villkorsvaktens sjukdom (Verifieringsplikten p.5): tänderna satt på fel
// axel. Bevisat med scripts/probe-lfl-produktionsvag.mjs.
//
// Testerna nedan är därför skrivna med granskarens blick (Verifieringsplikten p.6): varje test
// ställer frågan "var kan det gröna vara osant?" och minst ett av dem MÅSTE fälla gårdagens kod.
// RD-07 nedan är just det: den underkänner objektformen produktionen faktiskt hade.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { recommend, computeLikeForLikeSaasTarget, buildLikeForLikeReasoning } from '../agents/recommender/recommend.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TIERS = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;

const NMIT_LINES = [
  { type: 'recurring_subscription', description: 'Microsoft 365 E3',                quantity: 85, unitPrice: 420, amount: 35_700 },
  { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard', quantity: 12, unitPrice: 165, amount:  1_980 },
  { type: 'recurring_subscription', description: 'Acronis Backup',                  quantity: 85, unitPrice:  29, amount:  2_465 },
];
const NMIT_ANNUAL = NMIT_LINES.reduce((s, l) => s + l.amount, 0) * 12;

function kallfiler() {
  const ut = [];
  const gå = (d) => {
    for (const namn of readdirSync(d)) {
      // ⚠️ PUNKTKATALOGER HOPPAS ÖVER SOM KLASS, inte som uppräkning (2026-09-10).
      // `.git` stod i listan; `.claude` gjorde det inte. En fientlig granskare som kör i en
      // ISOLERAD git-worktree lägger en FULL kopia av repot under `.claude/worktrees/…`, och
      // kopidetektorn läste den som riktiga källfiler: RD-08 föll på en «lokal kopia» som var
      // dess egen. Mätinstrumentet var felet, inte systemet — och en uppräkning av kataloger man
      // råkat tänka på blir förr eller senare inaktuell. Klassen är den enda hållbara regeln.
      if (namn.startsWith('.') || ['node_modules', 'build', 'tests'].includes(namn)) continue;
      const p = join(d, namn);
      if (statSync(p).isDirectory()) gå(p);
      else if (namn.endsWith('.js') || namn.endsWith('.mjs')) ut.push(p);
    }
  };
  gå(ROT);
  return ut;
}

// ── RD-07 · Signallåset: objektet måste bära de fält låset kräver ─────────────────────────────
describe('RD-07 · Attribueringslåset matas — inte bara byggt', () => {
  const lfl = computeLikeForLikeSaasTarget(NMIT_LINES, TIERS, NMIT_ANNUAL);
  const argument = (o) => ({
    supplier: 'CloudReseller AB', lfl: o, annualCost: NMIT_ANNUAL,
    suggestedAnnualCost: o?.suggestedAnnualCost ?? 0,
    savingPerYear: Math.round(NMIT_ANNUAL - (o?.suggestedAnnualCost ?? 0)),
    billingCycleType: 'monthly',
  });

  test('produktionens LFL-objekt bär tierLines', () => {
    assert.ok(Array.isArray(lfl?.tierLines) && lfl.tierLines.length >= 2,
      'utan tierLines kan attribueringslåset aldrig fyra — det var felet 2026-06-11→08-12');
  });

  test('låset FYRAR på objektet produktionen bygger', () => {
    const text = buildLikeForLikeReasoning(argument(lfl));
    assert.ok(typeof text === 'string' && text.length > 0,
      'låset teg — AI:ns egen text hade nått kunden');
    assert.match(text, /420 kr per användare och månad/,
      'radens fakturerade à-pris ska stå i texten, aldrig per-seat-totalen (683-felet)');
  });

  // SABOTAGET: den här formen ÄR gårdagens produktion. Testet ska fälla den.
  test('låset TIGER på den gamla objektformen (utan tierLines) — testet fäller gårdagens kod', () => {
    const gammal = { suggestedAnnualCost: lfl.suggestedAnnualCost, dominantTierKey: lfl.dominantTierKey };
    assert.strictEqual(buildLikeForLikeReasoning(argument(gammal)), null,
      'om detta INTE är null är låset inte längre beroende av tierLines och testet ovan bevisar inget');
  });
});

// ── RD-08 · Kopidetektorn: EN sanning per fråga (regel 1) ─────────────────────────────────────
// Felet uppstod inte ur en trasig funktion utan ur en KOPIA. Regel 1 förbjuder lokala kopior av
// delad logik; ingen maskin kontrollerade det. Nu gör en det.
describe('RD-08 · Ingen lokal kopia av like-for-like-matten', () => {
  // ── ÄGAREN FLYTTADE (2026-09-08) ──────────────────────────────────────────────────────────
  // Vakten sa «endast recommend.js definierar M365-tierregexen», och det var sant den dag den
  // skrevs. Sedan visade grundarens Microsoft-kort att recommend.js ägde den SÄMRE av två
  // läsare: `LFL_TIER_RE` matchade ett bart /\bE3\b/ utan familjekrav, så «Office 365 E3» fick
  // Microsoft 365 E3:s listpris rakt in i kundens text. Den vaktade läsaren låg i
  // lib/licensniva.js — och `licensniva` är numera ENDA svaret på frågan «vilken nivå är den här
  // raden?». recommend.js lånar den (LN-11).
  //
  // Vakten fällde alltså rätt form på fel fil: den skyddade en kopia och pekade ut originalet.
  // Ägaren är nu lib/licensniva.js. recommend.js får behålla LFL_TIER_RE som DEKLARATION av
  // vilka nivåer LFL:en kan prissätta — LN-11 vaktar att den aldrig används som läsare igen —
  // och undantaget är därför motiverat här, inte tyst.
  const AGARE = join(ROT, 'lib/licensniva.js');
  const DEKLARATION = join(ROT, 'agents/recommender/recommend.js');
  // En tier-regexlista känns igen på att den binder minst två M365-nivåer till nycklar.
  const TIER_MONSTER = [/business\[\\s-\]premium/, /business\[\\s-\]standard/, /\\bE5\\b/, /\\bE3\\b/];

  test('endast lib/licensniva.js definierar M365-tierregexen', () => {
    const brott = [];
    for (const fil of kallfiler()) {
      if (fil === AGARE) continue;
      // recommend.js bär listan som DEKLARATION, inte som läsare. LN-11 är beviset: den fäller
      // varje `LFL_TIER_RE.find/some/filter` och kräver att `radensNiva` importeras. Undantaget
      // vilar alltså på en annan vakt, inte på en förhoppning.
      if (fil === DEKLARATION) continue;
      const kod = readFileSync(fil, 'utf8');
      // Undantag måste motiveras inline — samma mönster som claims-audit.
      if (kod.includes('// kopia-ok:')) continue;
      const traffar = TIER_MONSTER.filter((rx) => rx.test(kod)).length;
      if (traffar >= 2) brott.push(relative(ROT, fil));
    }
    assert.deepEqual(brott, [],
      `Lokal kopia av tier-regexen (regel 1). Importera radensNiva från lib/licensniva.js, `
      + `eller motivera med "// kopia-ok: <skäl>": ${brott.join(', ')}`);
  });

  test('api/test-invoice.mjs anropar den delade funktionen', () => {
    const kod = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
    assert.match(kod, /computeLikeForLikeSaasTarget\(/,
      'produktionen måste anropa den funktion sviten låser — annars låser sviten ingenting');
  });

  test('api/test-invoice.mjs bygger inte längre likeForLikeTarget för hand', () => {
    const kod = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
    assert.doesNotMatch(kod, /_lflTarget\s*=\s*\{/,
      'ett handbyggt LFL-objekt är per definition ofullständigt — det var precis felet');
  });

  // ── VAD DET HÄR TESTET FÅNGAR — OCH VAD DET INTE GÖR ────────────────────────────────────────
  // FÅNGAR: att api-lagret räknar om kundens tal ur prisbokens tier-priser, dvs. bygger en andra
  //   åsikt om samma faktura. Det var felet: en parallell benchmark utan prorata-korrigering.
  // FÅNGAR INTE: de finansiella sanity-guardarna längre ned, som nollar eller nullar tal när en
  //   rekommendation är internt motsägelsefull. De är avsiktligt kvar och ska vara kvar — en
  //   heuristik får ALDRIG SKAPA ett påstående, men den får UPPHÄVA ett. Skillnaden är riktningen,
  //   inte tekniken, och därför kan ingen ren textmatchning skilja dem åt. Ett test som förbjöd
  //   varje skrivning hade fällt de ärliga vakterna och tvingat fram att de togs bort.
  test('api-lagret räknar inte om kundens tal ur prisbokens tier-priser', () => {
    const kod = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
    // Vakten dömer KOD, aldrig prosa (2026-08-20): en kommentar som FÖRKLARAR varifrån
    // tier-priserna kommer fällde den här kontrollen. Det är SK-08:s läxa i ny form — förbjud
    // handlingen, inte ordet. En vakt som fäller på en kommentar lär nästa läsare att skriva
    // om kommentaren i stället för att titta på koden, och då är vakten värre än ingen.
    const arKommentar = (r) => /^\s*(\/\/|\*|\/\*)/.test(r);
    const rader = kod.split('\n')
      .map((r, i) => ({ r, n: i + 1 }))
      .filter(({ r }) => r.includes('licenseTierBenchmarks') && !arKommentar(r));
    // Enda tillåtna referensen: att LÄMNA prisboken vidare till den delade funktionen.
    const otillatna = rader.filter(({ n }) => {
      const omgivning = kod.split('\n').slice(Math.max(0, n - 4), n + 1).join('\n');
      return !omgivning.includes('computeLikeForLikeSaasTarget(');
    });
    assert.deepEqual(otillatna.map(({ n }) => n), [],
      'prisbokens tier-priser får bara nå api-lagret som argument till den delade matten — ' +
      'räknar api själv har vi två sanningar om samma faktura igen (regel 1)');
  });

  test('suggestedSupplier sätts aldrig i api-lagret', () => {
    const kod = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
    assert.doesNotMatch(kod, /recommendation\.suggestedSupplier\s*=/,
      'bytesmålets NAMN ägs av recommend.js, som också räknar talet (regel 2). Skrivs namnet ' +
      'över här kan namn och tal peka på olika nivåer — och låset uppströms annulleras tyst.');
  });
});

// ── RD-09 · Målets namn måste komma ur samma beräkning som målets tal ─────────────────────────
// Regel 2 i sin skarpaste form: koden räknar → koden namnger. Raden hårdkodade "Business Standard"
// för varje kund, även den vars besparing räknats mot E5:s eget årsavtalspris. Namnet motsade talet.
describe('RD-09 · suggestedSupplier härleds ur like-for-like-tiern', () => {
  const stubAi = { messages: { create: async () => ({
    content: [{ type: 'tool_use', input: { shouldSwitch: false, recommendationType: 'no_action', reasoning: 'Analys klar.' } }],
    usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
  }) } };
  const stubKv = { get: async () => ({ rate: 10.5, fetchedAt: new Date().toISOString() }) };

  // E5-kund hos återförsäljare med påslag → bytet utlöses deterministiskt.
  const E5_LINES = [{ type: 'recurring_subscription', description: 'Microsoft 365 E5', quantity: 25, unitPrice: 900, amount: 22_500 }];
  const kor = async (lines, lfl) => {
    const { recommend } = await import('../agents/recommender/recommend.js');
    return recommend({
      customer:    { industry: 'it-tech', employees: 25 },
      categorized: { category: 'saas-productivity', subType: 'produktivitet', normalizedSupplier: 'CloudReseller AB', confidence: 0.95 },
      invoice:     {
        annualCost: lines.reduce((s, l) => s + l.amount, 0) * 12,
        billingPeriod: 'monthly', seatCount: 25, lineItems: lines,
        likeForLikeTarget: lfl,
      },
    }, { client: stubAi, kvStore: stubKv });
  };

  test('E5-kund får E5-årsavtalet som mål — aldrig Business Standard', async () => {
    const lfl = computeLikeForLikeSaasTarget(E5_LINES, TIERS, E5_LINES[0].amount * 12);
    const r = await kor(E5_LINES, lfl);
    assert.equal(r.shouldSwitch, true, 'påslag över E5-listpris ska utlösa bytet');
    assert.equal(r.suggestedSupplier, 'Microsoft 365 E5 (årsavtal)');
    assert.doesNotMatch(r.suggestedSupplier, /Business Standard/,
      'att namnge Business Standard när talet räknats mot E5 är namn-mot-tal-motsägelsen');
  });

  // ── RD-10 · Gissningsvägen är stängd (fail-closed) ──────────────────────────────────────────
  // Utan LFL byggdes bytestalet ur en tier läst ur beskrivningstexten × ett antaget antal
  // anställda. Två gissningar multiplicerade till en kundsynlig siffra. Priset för att stänga
  // vägen mättes först: 0 av 6 verkliga fakturor gick den (scripts/probe-lfl-tackning.mjs).
  describe('RD-10 · utan like-for-like-underlag skapas inget bytestal', () => {
    // Samma faktura som ovan, men tier-raden saknar quantity → computeLikeForLikeSaasTarget = null.
    const UTAN_ANTAL = [{ type: 'recurring_subscription', description: 'Microsoft 365 E5', amount: 22_500 }];

    test('LFL blir null när tier-raden saknar antal', () => {
      assert.equal(computeLikeForLikeSaasTarget(UTAN_ANTAL, TIERS, UTAN_ANTAL[0].amount * 12), null);
    });

    test('recommend() tiger om bytet i stället för att gissa fram ett tal', async () => {
      const r = await kor(UTAN_ANTAL, null);
      assert.equal(r.shouldSwitch, false, 'ett byte utan bevisat pris per licensrad får aldrig utlösas');
      assert.equal(r.savingPerYear, 0);
      assert.equal(r.suggestedAnnualCost, null);
      assert.equal(r.suggestedSupplier, null, 'inget mål får namnges när inget tal räknats');
      assert.match(r.lflGrind ?? '', /like-for-like/, 'tystnaden ska bära sitt skäl, aldrig vara ett tyst hopp');
    });

    // Rätt-storleken är en FRISTÅENDE beräkning och får inte tystna med bytet — annars har
    // grinden kostat mer än den skyddade.
    test('rätt-storlek och licensrensning överlever grinden', async () => {
      const r = await kor(UTAN_ANTAL, null);
      assert.ok(r.m365Rightsizing, 'E5-rådgivningen bygger inte på bytesbenchmarken och ska stå kvar');
      assert.equal(r.m365Rightsizing.currentTier, 'e5');
    });
  });
});

// ── RD-11 · Avstämningsvetot är INKOPPLAT, inte bara byggt ────────────────────────────────────
// Sviten var grön innan vetot fanns och är grön efteråt — exakt det tillstånd som lät
// attribueringslåset stå mörkt i två månader. Testet nedan matar produktionsvägen med en faktura
// där de två vittnena MÅSTE säga emot varandra, och kräver att vetot syns i svaret.
describe('RD-11 · Aritmetiken granskar textgissningen i produktionsvägen', () => {
  const stubAi = { messages: { create: async () => ({
    content: [{ type: 'tool_use', input: { shouldSwitch: true, recommendationType: 'switch', reasoning: 'AI-text.' } }],
    usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
  }) } };
  const stubKv = { get: async () => ({ rate: 10.5, fetchedAt: new Date().toISOString() }) };

  // 20 licenser à 133,82 kr = 2 676,40 kr. 133,82 ÄR Business Standards årsavtalspris —
  // men raden PÅSTÅR E3, vars listpris är 416,77 kr. Vittnena pekar åt olika håll.
  const rad = (beskrivning) => ([{
    type: 'recurring_subscription', description: beskrivning,
    quantity: 20, amount: 2_676, amountOre: 267_640, unitPriceOre: 13_382,
  }]);

  const kor = async (lines) => {
    const annualCost = lines[0].amount * 12;
    return recommend({
      customer:    { industry: 'it-tech', employees: 20 },
      categorized: { category: 'saas-productivity', subType: 'produktivitet', normalizedSupplier: 'IT-Partner AB', confidence: 0.95 },
      invoice: {
        amount: lines[0].amount, annualCost, billingPeriod: 'monthly', seatCount: 20, lineItems: lines,
        currency: 'SEK', momsbas: 'exkl',
        likeForLikeTarget: computeLikeForLikeSaasTarget(lines, TIERS, annualCost),
      },
    }, { client: stubAi, kvStore: stubKv });
  };

  test('texten säger E3 men priset är Business Standards listpris → bytet tystas', async () => {
    const r = await kor(rad('Microsoft 365 E3'));
    assert.ok(Array.isArray(r.avstamningsveto) && r.avstamningsveto.length > 0,
      'vetot syns inte i svaret — då är motvittnet inte inkopplat, bara byggt');
    assert.equal(r.avstamningsveto[0].textTier, 'e3');
    assert.equal(r.avstamningsveto[0].prisTier, 'business-standard');
    assert.equal(r.shouldSwitch, false);
    assert.equal(r.suggestedSupplier, null, 'inget mål får namnges när vittnena är oense');
    assert.ok(r.avstamningsveto[0].kalla, 'vetot ska bära källan till det pris det vilar på');
  });

  test('samma pris med rätt beskrivning → ingen motsägelse, utan bekräftelse', async () => {
    const r = await kor(rad('Microsoft 365 Business Standard'));
    assert.equal(r.avstamningsveto, undefined, 'överensstämmelse får aldrig läsas som motsägelse');
    assert.ok(Array.isArray(r.avstamningsbekraftelse) && r.avstamningsbekraftelse.length > 0,
      'priset bekräftar nivån — det ska noteras som proveniens');
    assert.equal(r.avstamningsbekraftelse[0].tier, 'business-standard');
  });

  // SKRIVET OM 2026-08-12, samma dag som det skrevs. Första versionen krävde att E3 varken kunde
  // fälla eller bekräfta — sant när testet skrevs, eftersom ingen verifierare läste E3. Under
  // samma arbetspass bevisades Microsofts publika E3/E5-sida (scripts/probe-m365-enterprise.mjs)
  // och verifieraren utökades. Premissen föråldrades alltså av att hålet stängdes, inte av att
  // koden blev fel — och då ska testet följa världen, inte tvärtom.
  // Egenskapen "obevakad nivå kan inte bevisa något" är kvar och låst i SR-09, där den prövas mot
  // en uttryckligen begränsad deklaration i stället för mot dagens verifierare.
  test('E3 är numera vaktat — en träff mot dess eget ankare bekräftar nivån', async () => {
    const e3pris = rad('Microsoft 365 E3');
    e3pris[0].unitPriceOre = 41_677;               // ore-ok: FÖRFATTAR fixturen (skriver fältet), läser det aldrig
    e3pris[0].amountOre = 41_677 * 20;             // ore-ok: samma fixturförfattande
    e3pris[0].amount = Math.round(41_677 * 20 / 100);
    const r = await kor(e3pris);
    assert.equal(r.avstamningsveto, undefined, 'texten och priset är överens — det är ingen motsägelse');
    assert.equal(r.avstamningsbekraftelse?.[0]?.tier, 'e3',
      'E3 läses av m365-verifieraren sedan 2026-08-12 och kan därför bära ett bevis');
  });
});
