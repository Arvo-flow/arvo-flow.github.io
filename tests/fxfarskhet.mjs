// tests/fxfarskhet.mjs — FX-01..12: en valutakurs vi inte kan datera får aldrig bära kundens pengar.
//
// ══ VARFÖR (2026-09-10, grundarens order ur produktionsloggen) ═══════════════════════════════
// `[pricing] Live FX-hämtning misslyckades — använder fallback 10.42 SEK/USD (2026-05-22)`.
// En kurs från 22 maj räknade om kundernas utländska fakturor — i en tjänst för finansdirektörer.
//
// Obduktionen gav något värre än en trasig hämtning. Cronen svarade **200** och SKREV NER
// konstanten i KV med `fetchedAt: nu`; nästa läsare såg ett värde yngre än 26 timmar, och
// `getSekRate` returnerade `{ ...cached, source: 'kv' }` — vilket skriver över `'fallback'`.
// Ett värde som betyder «vi kunde inte hämta» lagrades på en adress som betyder «färsk» och
// etiketterades sedan om till TRANSPORTEN i stället för KÄLLAN.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: att fallback-konstanten åter klassas som en kurs, att en riktig källa utan datum
//     räknas som färsk, att gränsen glider, och att transporten (kv/mem-cache) skriver över
//     källan i pricing.js.
//   BLIND: om Riksbanken publicerar ett FEL tal ser vakten en färsk kurs från en riktig källa
//     och godkänner den. Vi mäter kursens ÅLDER och HÄRKOMST, aldrig dess riktighet — det
//     kräver ett andra oberoende vittne, och att låta ECB bekräfta Riksbanken är nästa steg,
//     inte det här. Vakten vet heller ingenting om hur mycket kursen faktiskt rört sig.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { fxFarskhet, farPrissattas, FARSK_MAX_DYGN } from '../lib/fxfarskhet.js';
import { strippaStrangar } from '../lib/kalltextlexer.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const NU = new Date('2026-09-10T12:00:00Z');
const dagar = (n) => new Date(NU.getTime() - n * 86_400_000).toISOString().slice(0, 10);

describe('FX · en kurs är en avläsning, eller så är den ingen kurs', () => {
  test('FX-01 · fallback-konstanten är INTE en kurs', () => {
    // Talet ur produktionsloggen, ordagrant.
    const dom = fxFarskhet({ rate: 10.42, source: 'fallback', date: '2026-05-22' }, NU);
    assert.equal(dom.niva, 'ingen',
      'en inbyggd konstant är ingen avläsning — att den bär ett datum och ett tal gör den inte till en');
    assert.match(dom.skal, /konstant, inte en avläsning/);
    assert.equal(farPrissattas({ rate: 10.42, source: 'fallback', date: '2026-05-22' }, NU), false);
  });

  test('FX-02 · en färsk riksbankskurs får prissätta', () => {
    const fx = { rate: 9.87, source: 'riksbank', date: dagar(1) };
    assert.equal(fxFarskhet(fx, NU).niva, 'farsk');
    assert.equal(farPrissattas(fx, NU), true);
  });

  test('FX-03 · en helg får inte larma — gränsen rymmer fredag→måndag', () => {
    // Motprovet mot en för snäv gräns. Riksbanken publicerar på bankdagar; en fredagskurs är
    // det färskaste som finns ända till måndag. En vakt som skriker på rätt beteende blir avstängd.
    assert.equal(fxFarskhet({ rate: 9.87, source: 'riksbank', date: dagar(3) }, NU).niva, 'farsk');
  });

  test('FX-04 · bortom gränsen blir kursen inaktuell — men behåller sitt tal', () => {
    const dom = fxFarskhet({ rate: 9.87, source: 'ecb', date: dagar(FARSK_MAX_DYGN + 1) }, NU);
    assert.equal(dom.niva, 'inaktuell');
    assert.equal(dom.alderDygn, FARSK_MAX_DYGN + 1);
    assert.match(dom.skal, /dygn gammal/, 'åldern ska stå i skälet — annars går den inte att visa för kunden');
  });

  test('FX-05 · «inaktuell» och «ingen» är skilda tillstånd', () => {
    // Det är hela poängen med tre lägen: en gammal RIKTIG kurs är något annat än en konstant.
    const gammal = fxFarskhet({ rate: 9.87, source: 'riksbank', date: dagar(60) }, NU);
    const ingen  = fxFarskhet({ rate: 10.42, source: 'fallback', date: dagar(60) }, NU);
    assert.equal(gammal.niva, 'inaktuell');
    assert.equal(ingen.niva, 'ingen');
    assert.notEqual(gammal.niva, ingen.niva);
  });

  test('FX-06 · en riktig källa UTAN datum är inte färsk', () => {
    // Okänt är inte färskt. Utan datum finns ingen ålder att bedöma, och då finns inget svar.
    assert.equal(fxFarskhet({ rate: 9.87, source: 'riksbank', date: null }, NU).niva, 'ingen');
    assert.equal(fxFarskhet({ rate: 9.87, source: 'riksbank', date: 'i-fredags' }, NU).niva, 'ingen');
  });

  test('FX-07 · ett datum i framtiden är ett fel, inte en extra färsk kurs', () => {
    const dom = fxFarskhet({ rate: 9.87, source: 'riksbank', date: '2027-01-01' }, NU);
    assert.equal(dom.niva, 'ingen');
    assert.match(dom.skal, /framtiden/);
  });

  test('FX-08 · ett trasigt eller saknat tal är ingen kurs', () => {
    for (const fx of [null, {}, { rate: 0, source: 'riksbank', date: dagar(1) },
      { rate: NaN, source: 'riksbank', date: dagar(1) }, { rate: -9, source: 'ecb', date: dagar(1) }]) {
      assert.equal(fxFarskhet(fx, NU).niva, 'ingen', `${JSON.stringify(fx)} klassades som en kurs`);
    }
  });

  test('FX-09 · «kv» och «mem-cache» är transporter, aldrig källor', () => {
    // Den exakta buggen: `{ ...cached, source: 'kv' }` tvättade bort `'fallback'`. Även om någon
    // åter skulle skicka in transporten som källa ska den inte kunna prissätta.
    assert.equal(fxFarskhet({ rate: 10.42, source: 'kv', date: dagar(0) }, NU).niva, 'ingen');
    assert.equal(fxFarskhet({ rate: 10.42, source: 'mem-cache', date: dagar(0) }, NU).niva, 'ingen');
  });
});

describe('FX · källan får inte tvättas av transporten (pricing.js)', () => {
  // ⚠️ LEXAD, INTE RÅ. Första versionen läste källtexten rakt av och fälldes av MIN EGEN
  // KOMMENTAR — raden «`source: 'kv'` SKREV ÖVER KÄLLAN» matchade det förbjudna mönstret. Det
  // är RD-08:s fel från augusti, ordagrant: en vakt som inte skiljer kod från prosa larmar på
  // beskrivningen av felet i stället för på felet. `strippaStrangar` blankar kommentarer och
  // stränginnehåll med bevarad längd (lib/kalltextlexer.js, bevisad av AD-07/AD-08).
  const PRICING = strippaStrangar(readFileSync(join(ROT, 'agents/recommender/pricing.js'), 'utf8'));

  test('FX-10 · ingen retur skriver över `source` med en transportetikett', () => {
    // Källtextvakt, och gränsen deklareras: den kan bara se de FORMER vi råkat ut för. Ett
    // framtida `Object.assign(x, {source:'kv'})` syns inte. Skyddet mot att ett sådant värde
    // ändå prissätter bor i FX-09, som är en beteendekontroll.
    const brott = [...PRICING.matchAll(/source:\s*'(kv|mem-cache)'/g)].map((m) => m[0]);
    assert.deepEqual(brott, [],
      'transporten (kv/mem-cache) får aldrig sättas som `source` — det var den raden som gjorde '
      + 'majkonstanten omöjlig att skilja från en hämtad kurs i varje konsument nedströms');
  });

  test('FX-17 · adresserna är de MÄTTA, och formen läses som objekt', () => {
    // ══ MÄTT I ACTIONS 2026-09-10 (scripts/probe-fxkallor.mjs) ═══════════════════════════
    //   .../observations/SEKUSDPMI/latest  HTTP 400   ← den gamla
    //   .../Observations/Latest/SEKUSDPMI  HTTP 200   {"date":"2026-09-09","value":9.56874}
    //   .../Observations/Latest/SEKEURPMI  HTTP 200   {"date":"2026-09-09","value":11.1495}
    // Riksbanken bytte BÅDE sökväg och form. Läser vi bara arrayformen tappar vi kursen tyst.
    // ⚠️ RÅTEXT HÄR, INTE LEXAD — och skälet är lärorikt. Lexern blankar STRÄNGINNEHÅLL, så en
    // URL försvinner ur den lexade texten. Första versionen läste `PRICING` (lexad) och fällde
    // därför på sitt eget prov. Rätt verktyg beror på vad man vaktar: kod → lexad, literaler →
    // rå. Och för att råtexten innehåller kommentarer som NÄMNER den gamla sökvägen riktas
    // mönstren mot TILLDELNINGEN, som ingen prosa kan efterlikna.
    const RA = readFileSync(join(ROT, 'agents/recommender/pricing.js'), 'utf8');
    assert.match(RA, /RIKSBANK_USD_URL =\s*\n?\s*'[^']*Observations\/Latest\/SEKUSDPMI'/);
    assert.match(RA, /RIKSBANK_EUR_URL =\s*\n?\s*'[^']*Observations\/Latest\/SEKEURPMI'/);
    assert.doesNotMatch(RA, /_URL =\s*\n?\s*'[^']*observations\/SEK\w+PMI\/latest'/,
      'den gamla sökvägen svarar 400 — den får inte smyga tillbaka i en tilldelning');
    // ⚠️ RÄKNAT, INTE «FINNS». Första versionen krävde bara att mönstret fanns NÅGONSTANS, och
    // sabotaget «ta bort objektläsningen ur USD-grenen» fällde då NOLL test — EUR-grenen hade
    // kvar sin och regexen var nöjd. Det är syskonfallssjukan i vakten själv: en fix på ett
    // ställe av två, och kontrollen kan inte se skillnaden. Båda valutorna måste ha den.
    const objektlasningar = (PRICING.match(/!Array\.isArray\(data\) && data\.value != null/g) ?? []).length;
    assert.equal(objektlasningar, 2,
      `${objektlasningar} av 2 valutagrenar läser objektformen — den som saknar den tappar kursen `
      + 'tyst på ett HTTP 200, vilket är det svåraste felet av alla att upptäcka');
  });

  test('FX-18 · USD saknar reserv MEDVETET, och skälet står i loggen', () => {
    // ECB publicerar ingen direkt SEK/USD-serie, och en tredjepartsspegel får inte bära kundens
    // pengar i en tjänst som säger «verifierat». Faller Riksbanken blir det tystnad — men
    // tystnaden måste BÄRA SITT SKÄL, annars är den omöjlig att skilja från ett nätverksfel.
    assert.match(PRICING, /const ECB_USD_URL = null/);   // kod → lexad text duger
    // Skälets TEXT är en strängliteral och blankas av lexern — råtexten är rätt källa här.
    assert.match(readFileSync(join(ROT, 'agents/recommender/pricing.js'), 'utf8'),
      /skal\.push\('ecb: ingen direkt SEK\/USD-serie finns/,
      'ett utelämnat försök ska rapporteras som ett val, aldrig utelämnas ur skälen');
  });

  test('FX-11 · inget catch-block i FX-hämtningen är tomt', () => {
    // ⚠️ FÖRSTA VERSIONEN VAR VAKUÖS, och lexningen är just vad som avslöjade det. Den letade
    // strängen `catch { /* fall through */ }` — men lexern BLANKAR kommentarer, så mönstret kan
    // aldrig matcha och assertionen var sann oavsett koden. En vakt grön på fel grund, införd av
    // min egen fix mot en vakt grön på fel grund.
    //
    // Invarianten är dessutom bättre uttryckt så här: ett `catch` vars kropp är tom SVÄLJER felet,
    // oavsett om någon skrivit en kommentar i den eller inte. Efter lexningen ser båda formerna
    // likadana ut — bara blanktecken mellan klamrarna — och det är precis det vi förbjuder.
    const tomma = [...PRICING.matchAll(/catch\s*(\([^)]*\))?\s*\{\s*\}/g)].map((m) => m[0]);
    assert.deepEqual(tomma, [],
      `${tomma.length} tyst(a) catch-block i FX-hämtningen. Ett sväljt fel gör nästa felsökning `
      + 'till en gissning: föll anropet på nätet, på en 404, eller på att svarets form ändrats?');
    assert.ok((PRICING.match(/skal\.push\(/g) ?? []).length >= 8,
      'varje utgång i båda valutornas båda källor ska namnge sitt skäl');
  });
});

describe('FX · cronen får aldrig bokföra ett misslyckande som en kurs', () => {
  const CRON = readFileSync(join(ROT, 'api/cron/update-fx-rate.mjs'), 'utf8');

  test('FX-12 · skrivningen till KV är villkorad av att kursen får prissättas', () => {
    // Källtextvakt med uttalad gräns: den bevisar att villkoret STÅR där, aldrig att KV faktiskt
    // förblir orört — det kräver en riktig KV och finns inte i sviten. Beviset för beteendet är
    // i stället att `farPrissattas` är den enda vägen in (FX-01 visar vad den svarar på en fallback).
    assert.match(CRON, /if \(farPrissattas\(fx\)\)/,
      'bara en kurs som får prissätta får lagras — annars ser nästa läsare konstanten som färsk');
    assert.match(CRON, /503/,
      'och utfallet måste bli rött: ett grönt cron-svar som betyder «jag kunde inte hämta» är '
      + 'precis det gröna som är farligare än ett rött');
  });
});

// ── FX-13..15 · GRINDEN I RÄTT MODUL ────────────────────────────────────────────────────────
// RD-08 fällde första versionen, som nollade bytesmålet i `api/test-invoice.mjs`. Vakten hade
// rätt: NAMNET på bytesmålet ägs av `recommend.js`, som också räknar TALET (regel 2), och att
// sätta fältet till `null` gör inte api-lagret till ägare. Grinden sitter nu som ett hölje runt
// hela `recommend()` — fem returvägar går utanför `withForensics`, så den var ingen strypning.
describe('FX · en osäker kurs river hela påståendet, inte halva', () => {
  test('FX-13 · grinden ligger i recommend.js och täcker varje returväg', async () => {
    const REC = readFileSync(join(ROT, 'agents/recommender/recommend.js'), 'utf8');
    assert.match(REC, /export async function recommend\(input, opts = \{\}\) \{\s*\n\s*const svar = await recommendUtanValutagrind/,
      'höljet måste vara det exporterade `recommend` — annars finns en väg förbi det');
    assert.match(REC, /async function recommendUtanValutagrind/);
  });

  test('FX-14 · api-lagret SKRIVER inte bytesmålet, det skickar in spärren', () => {
    const API = strippaStrangar(readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8'));
    assert.doesNotMatch(API, /recommendation\.suggestedSupplier\s*=/,
      'api-lagret får aldrig äga bytesmålets namn (RD-08, buggen 2026-06-28)');
    assert.match(API, /fxSparr:\s*extracted\.prispastaendeSparrat/,
      'spärren måste NÅ recommend() — ett fält som ingen fyller är ett fält som inte finns');
  });

  test('FX-15 · alla fem fälten rivs tillsammans, aldrig halva domen', async () => {
    // ⚠️ FÖRSTA VERSIONEN VAR HALVT VAKUÖS. Sabotaget «ta bort `suggestedSupplier: null`» fällde
    // NOLL test, därför att mitt testfall saknade like-for-like-underlag — och då är fältet redan
    // null utan grinden. Assertionen bevisade ingenting om just det fält vars ägarskap hela
    // omflyttningen handlade om (RD-08).
    //
    // Uppsättningen är nu RD-09:s: en E5-kund hos återförsäljare med påslag, där bytet utlöses
    // DETERMINISTISKT och `suggestedSupplier` härleds till «Microsoft 365 E5 (årsavtal)». Först då
    // finns det något för grinden att riva. Motprovet står i samma test: utan spärr ska bytet stå.
    const { recommend } = await import('../agents/recommender/recommend.js');
    const { computeLikeForLikeSaasTarget } = await import('../agents/recommender/recommend.js');
    // TIERS bor inte som egen export — den är prisbokens licensnivåtabell (samma väg som RD-09
    // läser den). Att gissa importen hade gett `undefined` och ett test som fäller på fel grund.
    const { BRANCHINDEX } = await import('../agents/recommender/branchindex.js');
    const TIERS = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;

    const stubAi = { messages: { create: async () => ({
      content: [{ type: 'tool_use', input: { shouldSwitch: false, recommendationType: 'no_action', reasoning: 'Analys klar.' } }],
      usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
    }) } };
    const stubKv = { get: async () => ({ rate: 10.5, fetchedAt: new Date().toISOString() }) };
    const LINES = [{ type: 'recurring_subscription', description: 'Microsoft 365 E5', quantity: 25, unitPrice: 900, amount: 22_500 }];
    const lfl = computeLikeForLikeSaasTarget(LINES, TIERS, LINES[0].amount * 12);
    const kor = (fxSparr) => recommend({
      customer:    { industry: 'it-tech', employees: 25 },
      categorized: { category: 'saas-productivity', subType: 'produktivitet', normalizedSupplier: 'CloudReseller AB', confidence: 0.95 },
      invoice:     { annualCost: LINES[0].amount * 12, billingPeriod: 'monthly', seatCount: 25, lineItems: LINES, likeForLikeTarget: lfl },
      fxSparr,
    }, { client: stubAi, kvStore: stubKv });

    // MOTPROVET FÖRST: utan spärr står bytet, med ett namngivet mål. Utan den här raden kan testet
    // bli grönt av att bytet ändå inte utlöstes — och då mäter det ingenting.
    const utan = await kor(null);
    assert.equal(utan.shouldSwitch, true, 'utan spärr ska bytet stå — annars finns inget att riva');
    assert.equal(utan.suggestedSupplier, 'Microsoft 365 E5 (årsavtal)');
    assert.ok(utan.savingPerYear > 0);

    const med = await kor('fx_ingen');
    assert.equal(med.shouldSwitch, false);
    assert.equal(med.recommendationType, 'no_action');
    assert.equal(med.savingPerYear, null);
    assert.equal(med.suggestedAnnualCost, null);
    assert.equal(med.suggestedSupplier, null, 'målets NAMN måste rivas med talet — annars står ett '
      + 'byte namngivet bredvid ett nollat beslut, vilket är OB-19:s form');
    assert.equal(med.fxSparr, 'fx_ingen', 'skälet måste följa med — en tystnad utan skäl är en pose');
  });
});

// ── FX-16 · SIDOKANALEN (granskningens fynd 1, 2026-09-10) ──────────────────────────────────
// Den fientliga granskaren såg att höljet i `recommend()` inte nollar `grossSaving`/`netSaving`
// och kallade det [VAKT] — inget kundsynligt ändras. Den skarpaste instansen låg ett steg bort
// och är [KUND]: kundens `grossSaving` byggs i api-lagret som `primär + sekundär`, och
// sekundär-overriden SÄTTER TILLBAKA `shouldSwitch = true` så snart den sekundära är positiv.
//
// En FX-spärrad faktura hade alltså kunnat få tillbaka sitt byte via sidokanalen, med ett tal
// räknat ur exakt samma odaterbara kurs — `metrics` kommer ur radposter som redan konverterats.
// Att en fix håller för fallet som avslöjade buggen men inte för grannfallet är veckans läxa.
describe('FX · spärren håller även i sidokanalen', () => {
  const API = strippaStrangar(readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8'));

  test('FX-16 · den sekundära besparingen beräknas inte för en spärrad faktura', () => {
    assert.match(API, /const secondarySaving = extracted\.prispastaendeSparrat \? null : computeSecondarySaving/,
      'utan spärren här kan sekundär-overriden återuppliva bytet med ett tal ur samma kurs');
    // Och overriden måste fortfarande vara den enda vägen tillbaka — hittar vi en andra väg som
    // sätter shouldSwitch=true ur secondarySaving är den här vakten inte fullständig.
    const aterupplivningar = [...API.matchAll(/shouldSwitch\s*=\s*true/g)].length;
    assert.ok(aterupplivningar <= 1,
      `${aterupplivningar} ställen sätter shouldSwitch=true i api-lagret — spärren täcker bara den `
      + 'kända vägen, och en andra väg måste granskas innan den här vakten kan kallas hel');
  });
});
