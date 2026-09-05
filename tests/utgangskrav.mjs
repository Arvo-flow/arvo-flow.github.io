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
    const deklarationer = [...API.matchAll(/^\s*tillitTillRader: (true|false),$/gm)].length;
    assert.ok(anrop >= 15, `bara ${anrop} svara()-anrop hittades — vakten mäter inte det den påstår`);
    assert.equal(deklarationer, anrop - 1,
      'en utgång saknar tillitTillRader (−1 = den som sprider ...autoResponse och bär sin egen)');
  });

  test('UK-08 · varje deklaration bär ett skrivet skäl på raden ovanför', () => {
    const rader = API.split('\n');
    const utan = rader
      .map((l, i) => ({ n: i + 1, l, fore: rader[i - 1] ?? '' }))
      .filter(({ l }) => /^\s*tillitTillRader: (true|false),$/.test(l))
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
