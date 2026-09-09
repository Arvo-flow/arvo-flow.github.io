// tests/antalsdoktrinen.mjs — ETT ANTAL ÄR EN AVLÄSNING, ELLER SÅ FINNS DET INTE.
//
// ══ GRUNDARBESLUT 2026-09-09 ═══════════════════════════════════════════════════════════════
// Frågan grundaren ställde: *«får systemet någonsin räkna baklänges (Belopp ÷ À-pris = Antal)
// när Antal-kolumnen är tom, eller är det ett absolut brott mot fail-closed?»*
//
// SVARET ÄR NEJ, OCH DET ÄR MÄTT — inte tyckt.
//
// `scripts/probe-bakatrakning.mjs` körde bakåträkning på varje rad i de 75 verkliga fakturorna
// där kolumnläsaren INTE fick ut ett antal och där raden bär minst två tal:
//
//     rader utan avläst antal, med ≥2 tal:            23
//     varav bakåträkning ger ett RENT heltal:         18   (78 %)
//     varav heltalet faktiskt ÄR ett antal enheter:    0   (0 %)
//
// Metoden fyrar alltså på fyra rader av fem — och har noll träffsäkerhet på exakt de rader den
// fyrar. Varenda «antal» den producerar är en gigabyte, en månad eller en terabyte:
//
//     aws-startup-kredit       310 ÷ 0,025  = 12 400   → «12,4 TB», inte 12 400 licenser
//     bredband_4             1 947 ÷ 649    =      3   → «3 mån»
//     telenor-molnvaxel-stor   539,60 ÷ 28,40 =   19   → 19 kr/GB … av 28,4 GB
//
// DEN SISTA ÄR HELA ARGUMENTET. Divisionen kan inte veta vilket av de två talen som är MÄNGDEN.
// På roamingrader står datamängden i Antal-kolumnen och priset i À-pris-kolumnen, så kvoten ger
// tillbaka PRISET (19 kr/GB) och kallar det ett antal. Aritmetiken är exakt; tolkningen är
// inverterad. Ett tal som är matematiskt korrekt och semantiskt omvänt är den farligaste sortens
// fel vi har — det bär precisionens auktoritet och går inte att skilja från en avläsning.
//
// Det är obduktionens felfamilj i sin renaste form: ett tillstånd som betyder «kolumnen sa
// ingenting» representerat med ett fullt giltigt heltal. Och det talet öppnar LFL-grinden,
// bygger `suggestedAnnualCost`, driver success fee och blir `agreedPrice` i den BankID-signerade
// fullmakten.
//
// ── DOKTRINEN ─────────────────────────────────────────────────────────────────────────────
//   1. Ett antal får bara komma ur en AVLÄSNING: fakturans egen Antal-kolumn (`avlast`) eller
//      modellens observation av samma kolumn. Aldrig ur en division.
//   2. Ett bakåträknat tal får ALDRIG driva `seatCount`, jämförelsegolvet, ett bytesmål, ett
//      arvode eller en fullmakt.
//   3. Den aritmetiska identiteten får SÄGAS som ett påstående om TALEN («2 102,90 = 10 ×
//      210,29»), aldrig som ett påstående om ANTALET. Skillnaden är inte kosmetisk: det första
//      är en observation vi kan belägga, det andra en gissning om en enhet vi inte läst.
//   4. Tystnaden är svaret. `tom_cell` betyder att inget står tryckt; det är ett resultat, inte
//      en lucka att fylla. Fail-closed på FÄLTET, fail-open på pipelinen — fakturan analyseras
//      vidare utan att bära ett antal.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   UTLÖSER: att någon i lib/, api/ eller agents/ dividerar ett belopp med ett à-pris och låter
//     resultatet bli en kvantitet, ett seat-tal eller ett licensantal.
//   UTLÖSER INTE: division MED ett antal (`årskostnad / seats`) — det är att räkna pris per
//     enhet ur ett känt antal, doktrinens motsatta och tillåtna riktning. Inte heller en
//     kommentar som DISKUTERAR bakåträkning; vakten läser kod, inte prosa.
//   BLIND, uttalat och MÄTT (granskningens fynd 4, 2026-09-09 — blindfläcken var värre än jag
//     först skrev). Vakten läser ORD, aldrig innebörd. Följande slipper igenom, alla provade:
//       `const k = l.amount; const n = k / p;`   mellanled
//       `const { unitPrice: p } = l; a / p;`     destrukturering
//       `l.amount / l[falt]`                     beräknad nyckel
//       `li.amount / li.unitPrice`               annat radnamn — och `li` är kodbasens EGET
//                                                (agents/test-invoice/extract.js:997)
//       `l.amount /\n  l.unitPrice`              radbrytning; vakten läser en rad i taget
//     Vakten flyttar alltså bevisbördan till något en granskare kan slå upp — den bär den inte.
//     DET VERKLIGA SKYDDET är att kolumnläsaren aldrig FYLLER ett antal (AD-03), och det är ett
//     beteendeprov. AD-01 är en påminnelse, aldrig ett bevis; att tro motsatsen är felet.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { antalForRad, korrigeraAntalUrKolumn, AVLASNING, bevisarTomhet } from '../lib/fakturakolumner.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

function jsFiler(katalog, ut = []) {
  for (const namn of readdirSync(katalog)) {
    const p = join(katalog, namn);
    if (statSync(p).isDirectory()) { jsFiler(p, ut); continue; }
    if (/\.(js|mjs)$/.test(namn)) ut.push(p);
  }
  return ut;
}

/** Källtext utan kommentarer — en kommentar som NÄMNER en division är inte en division. */
const kod = (s) => s.split('\n').map((r) => r.replace(/\/\/.*$/, '')).join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '');

/**
 * Den förbjudna formen: division MED ett à-pris. Valfritt objektprefix, så att `l.`, `li.`,
 * `rad.`, `raw.` och en naken variabel alla fångas — granskningen mätte att `li` är kodbasens
 * eget radnamn (agents/test-invoice/extract.js:997) och att den gamla regexen missade det.
 *
 * ⚠️ EN ENDA DEFINITION, MED FLIT. Första versionen hade regexen i AD-01 och en KOPIA i AD-02,
 * vars uttalade syfte var att hindra att AD-01 blir «grön av tomhet». Granskaren neutraliserade
 * AD-01:s regex till `/FINNS_ALDRIG/` och hela sviten förblev grön — motprovet prövade sin egen
 * kopia. Två sanningar om samma fråga (regel 1), i vakten mot precis den formen.
 */
const BAKATRAKNING = /\/\s*\(?\s*(?:[A-Za-z_$][\w$]*\s*\??\.\s*)?(?:unitPrice|unit_price|unitPriceOre|unit_price_ore|aPris|apris|aprisOre)\b/;

/**
 * Blankar innehållet i strängar, mallsträngar, regexlitteraler och kommentarer — men BEHÅLLER
 * `${…}`-interpolationen, för där bor riktig kod. Radbrytningar bevaras så att radnummer håller.
 *
 * ══ VARFÖR EN LEXER OCH INTE ETT HACK (granskningens fynd 1 + 2, 2026-09-09) ═══════════════
 * Första versionen hoppade över mallsträngar genom att räkna BACKTICK-PARITET per rad. Två fel,
 * båda mätta, båda i den vakt jag skrev mot precis den formen:
 *
 *   · **Den kunde stängas av utan att ett test föll.** Sabotage `const varIMall = iMall` →
 *     `= true` gör att vakten hoppar över VARJE rad och skannar ingenting — `# fail 0`,
 *     identiskt med baslinjen. Grön av tomhet, i vakten mot grön-av-tomhet.
 *   · **Och min motivering var osann.** Jag skrev «den kostar täckning, aldrig falsklarm —
 *     säkra riktningen». MÄTT: 4 455 av 38 119 rader (11,7 %) blindades, `prompt.js` tappade
 *     342 av 357. Åt andra hållet förskjuter en escapead backtick pariteten så att ren
 *     promptprosa FÄLLS som division. Båda riktningarna, alltså — ett påstående skrivet före
 *     mätning, i kommentaren om att aldrig skriva påståenden före mätning.
 *
 * KVARSTÅENDE KÄND SVAGHET, uttalad: `/`-diskrimineringen mellan division och regexlitteral är
 * en heuristik — föregående icke-blanka tecken avgör, plus en nyckelordslista (`return /re/`
 * lexades först som division; tre verkliga fall i kodbasen). Kvar är `/` i en teckenklass
 * (`[/]`) som avslutar regexen för tidigt, och regexflaggor som kan läcka. Riktningen är
 * mätt: 0 tecken KOD blankas felaktigt; det som läcker är literalinnehåll, vilket kan ge ett
 * FALSKLARM men aldrig blindhet. Skillnaden mot pariteten är att felet är mätbart och att
 * invarianten «samma längd, samma radantal» prövas mot hela kodbasen (AD-08).
 */
export function strippaStrangar(kalla) {
  // ⚠️ `Array.from` ITERERAR KODPUNKTER, `kalla[i]` INDEXERAR KODENHETER (granskningens V3,
  // 2026-09-09). Vid första astrala tecknet — en emoji i en kommentar räcker — blir utdata ETT
  // element kortare än indata, och därefter skrivs varje blankning på fel position. MÄTT över
  // lib/, api/ och agents/: 3 filer av 218 desynkade och **180 rader försvann helt** ur
  // skanningen (`api/send-report.mjs` 607 → 480). En injicerad `l.amount / l.unitPrice` i det
  // området missas alltså rakt av — vakten var blind på 180 rader utan att någon räknade dem.
  //
  // `split('')` delar på KODENHETER och håller därför exakt samma index som `kalla[i]` och
  // `kalla.length`. Ett surrogatpar blir två element som båda blankas — visuellt samma resultat,
  // och positionerna håller. Felfamiljen igen: två sätt att räkna samma sträng, och det ena
  // svaret gick inte att skilja från det andra förrän någon mätte radantalet.
  const ut = kalla.split('');
  const OPERAND_FORE = /[)\]}\w$]/;      // står detta före ett `/` är det division, inte regex
  // ⚠️ ETT NYCKELORD SLUTAR PÅ EN BOKSTAV (granskningens V4). `return /regex/` såg ut som en
  // division eftersom `sistaKod` var `n` — tre verkliga fall i kodbasen, och en regex som lexas
  // som division läcker sitt innehåll ut i den skannade texten. Ett nyckelord är inte en operand.
  const NYCKELORD = /\b(?:return|typeof|instanceof|case|in|of|do|else|yield|await|delete|void|new|throw)$/;
  let sistaOrd = '';                     // senaste ordet i kodläge, för nyckelordskontrollen
  let lage = 'kod';
  const mallStack = [];                  // ${} kan nästlas i mallsträngar
  let klammerDjup = 0;
  let sistaKod = '';                     // senaste icke-blanka tecknet i kodläge
  for (let i = 0; i < kalla.length; i += 1) {
    const c = kalla[i], n = kalla[i + 1];
    const blanka = () => { if (c !== '\n') ut[i] = ' '; };
    if (lage === 'kod') {
      if (c === '/' && n === '/') { lage = 'radkommentar'; blanka(); continue; }
      if (c === '/' && n === '*') { lage = 'blockkommentar'; blanka(); continue; }
      if (c === '/' && (!OPERAND_FORE.test(sistaKod) || NYCKELORD.test(sistaOrd))) {
        lage = 'regex'; blanka(); continue;
      }
      if (c === "'") { lage = 'enkel'; blanka(); continue; }
      if (c === '"') { lage = 'dubbel'; blanka(); continue; }
      if (c === '`') { lage = 'mall'; blanka(); continue; }
      // ⚠️ DJUPET RÄKNADES FEL MED ETT STEG i första versionen: `${` pushade djupet OCH ökade
      // det, så den avslutande `}` aldrig matchade. Följden var värre än ett missat `}` — den
      // efterföljande backticken lästes som en NY mallsträng och blindade raden efter. Provets
      // rad 7 (`const t = belopp / apris;`) försvann, och det var så buggen syntes.
      if (c === '}' && mallStack.length > 0 && klammerDjup === mallStack[mallStack.length - 1]) {
        mallStack.pop(); lage = 'mall'; blanka(); continue;
      }
      if (c === '{') klammerDjup += 1;
      if (c === '}') klammerDjup -= 1;
      if (c.trim() !== '') sistaKod = c;
      // ⚠️ ETT BLANKSTEG FICK GLÖMMA ORDET. Första versionen nollställde `sistaOrd` på VARJE
      // icke-ordtecken, alltså även mellanslaget i `return /re/` — och då hann nyckelordet
      // försvinna innan `/` nåddes. Provet fällde det. Blanktecken bevarar ordet; allt annat
      // avslutar det.
      if (/[\w$]/.test(c)) sistaOrd += c; else if (c.trim() !== '') sistaOrd = '';
      continue;
    }
    if (lage === 'radkommentar') { if (c === '\n') lage = 'kod'; else blanka(); continue; }
    if (lage === 'blockkommentar') {
      blanka();
      if (c === '*' && n === '/') { ut[i + 1] = ' '; i += 1; lage = 'kod'; }
      continue;
    }
    if (lage === 'regex') {
      blanka();
      if (c === '\\') { if (kalla[i + 1] !== '\n') ut[i + 1] = ' '; i += 1; continue; }
      if (c === '/' ) { lage = 'kod'; sistaKod = '/'; }
      if (c === '\n') lage = 'kod';        // en regex kan inte spänna över rader
      continue;
    }
    // strängtillstånden
    blanka();
    if (c === '\\') { if (kalla[i + 1] !== '\n') ut[i + 1] = ' '; i += 1; continue; }
    if (lage === 'enkel' && c === "'") { lage = 'kod'; sistaKod = "'"; continue; }
    if (lage === 'dubbel' && c === '"') { lage = 'kod'; sistaKod = '"'; continue; }
    if (lage === 'mall') {
      if (c === '`') { lage = 'kod'; sistaKod = '`'; continue; }
      if (c === '$' && n === '{') {       // interpolationen ÄR kod och ska skannas
        ut[i + 1] = '{'; mallStack.push(klammerDjup); lage = 'kod'; i += 1;
      }
    }
  }
  return ut.join('');
}

/** Rader (1-indexerade) där en bakåträkning står i KOD. `// antal-ok:` är den motiverade utvägen. */
export function hittaBakatrakning(kalla) {
  const kod = strippaStrangar(kalla).split('\n');
  const original = kalla.split('\n');
  const ut = [];
  kod.forEach((rad, i) => {
    if (!BAKATRAKNING.test(rad)) return;
    if (/antal-ok:/.test(original[i] ?? '')) return;
    ut.push({ rad: i + 1, text: (original[i] ?? '').trim().slice(0, 90) });
  });
  return ut;
}

describe('AD · Antalsdoktrinen — ett antal är en avläsning, eller så finns det inte', () => {
  test('AD-01 · ingen dividerar ett belopp med ett à-pris', () => {
    // Formen doktrinen förbjuder. `// antal-ok: <skäl>` på raden är den motiverade utvägen,
    // samma mönster som claims-audit och kopidetektorn — en vakt utan utväg kringgås med
    // --no-verify, och då är den sämre än ingen.
    //
    // ⚠️ PROMPTPROSA ÄR INTE KOD, men skiljandet görs av en LEXER (se `strippaStrangar`), inte
    // av backtick-paritet. Pariteten kunde stängas av utan att ett test föll och blindade
    // 11,7 % av kodbasen — se modulkommentaren för mätningen.
    const traffar = [];
    let radkallor = 0;
    for (const katalog of ['lib', 'api', 'agents']) {
      for (const fil of jsFiler(join(ROT, katalog))) {
        const kalla = readFileSync(fil, 'utf8');
        radkallor += kalla.split('\n').length;
        for (const t of hittaBakatrakning(kalla)) {
          traffar.push(`${relative(ROT, fil)}:${t.rad} — ${t.text}`);
        }
      }
    }
    // TOMHETSSPÄRR: en vakt som skannar noll rader är grön av tomhet, och det var precis vad
    // paritetssabotaget gjorde. Talet är ett golv, inte ett facit — det växer med kodbasen.
    assert.ok(radkallor > 30_000,
      `vakten skannade bara ${radkallor} rader — den ser inte kodbasen längre`);
    assert.deepEqual(traffar, [],
      'bakåträkning av ett antal ur belopp ÷ à-pris. Mätt på korpusen: metoden fyrar på 18 av '
      + '23 rader och har noll rätt — den ger tillbaka PRISET och kallar det ett antal '
      + '(539,60 ÷ 28,40 = 19 kr/GB, av 28,4 GB). Motivera med `// antal-ok: <skäl>` om raden '
      + 'gör något annat.');
  });

  test('AD-06 · POSITIVKONTROLLEN: skannern hittar kod och tiger om prosa', () => {
    // ══ GRANSKNINGENS FYND 1 (2026-09-09) ════════════════════════════════════════════════════
    // AD-01 prövade bara att listan är TOM. En vakt som slutat titta ger också en tom lista —
    // och sabotaget «hoppa över varje rad» gav `# fail 0`, identiskt med baslinjen. AD-02 kunde
    // inte se det: den prövar REGEXEN, aldrig skanningen. Det här provet är den saknade halvan.
    // Varje fall är en påstådd egenskap hos lexern, prövad med ett svar som inte kan bli tomt.
    const KALLA = [
      "const a = l.amount / l.unitPrice;",                    // 1  KOD → ska hittas
      "// kommentar: l.amount / l.unitPrice är förbjudet",    // 2  kommentar → tyst
      "const p = `· amount_ore / unit_price_ore: prosa`;",    // 3  mallsträng → tyst
      "const q = 'text med / unitPrice inuti';",              // 4  sträng → tyst
      'const r = "dubbel / unit_price också";',               // 5  sträng → tyst
      "const s = `pris ${ total / rad.unitPrice } kr`;",      // 6  ${} ÄR kod → ska hittas
      "const t = belopp / apris;",                            // 7  efter mallsträng → ska hittas
      "const v = li.amount / li.unitPrice;   // antal-ok: prövad",  // 8  utväg → tyst
      "const w = /regex med ' inuti/.test(z);",               // 9  regexlitteral → tyst
      "const y2 = summa / rad.apris;",                        // 10 efter regexen → ska hittas
      "const z2 = `y ${ f(`nästlad ${ a / b.unitPrice } kr`) } slut`;",  // 11 nästlad → hittas
      "const q3 = kostnad / platser;",                         // 12 tillåten riktning → tyst
      // 13 return-regex med ett CITATTECKEN i sig. Lexas den som division (så var det innan
      //    nyckelordslistan) öppnar apostrofen en STRÄNG som löper vidare och blindar rad 14.
      //    Det är den verkliga skadan: inte ett falsklarm utan tystnad, och tystnad syns aldrig.
      'function f() { return /[\'"]/.test(s); }',
      "const w3 = faktura.amount / faktura.unitPrice;",        // 14 efter return-regex → hittas
    ].join('\n');
    const funna = hittaBakatrakning(KALLA).map((t) => t.rad);
    assert.deepEqual(funna, [1, 6, 7, 10, 11, 14],
      'skannern ska hitta division i KOD (även inuti nästlade ${…}) och tiga om kommentar, '
      + 'sträng, mallsträng, regexlitteral och motiverad utväg. Fick: ' + JSON.stringify(funna));

    // Rad 7 och 10 är de bärande: de ligger EFTER en mallsträng respektive en regex med
    // citattecken. Försvinner de har tillståndsmaskinen läckt — och att läcka framåt genom
    // filen var paritetens värsta felläge (342 av 357 rader osynliga i prompt.js).
    assert.ok(funna.includes(7) && funna.includes(10),
      'ett avslutat literal får aldrig blinda raderna efter sig');

    // MOTPROVET åt andra hållet: den tillåtna riktningen får aldrig fällas, ens i kod.
    assert.deepEqual(hittaBakatrakning('const pris = annualCost / seats / 12;'), []);
  });

  test('AD-08 · ett astralt tecken förskjuter aldrig skanningen', () => {
    // ══ GRANSKNINGENS V3 (2026-09-09) ════════════════════════════════════════════════════════
    // `Array.from(kalla)` itererar KODPUNKTER medan `kalla[i]` indexerar KODENHETER. Vid första
    // astrala tecknet — en emoji i en kommentar räcker — blir utdata ett element kortare, och
    // därefter blankas fel position. MÄTT över lib/, api/, agents/: 3 filer av 218 desynkade och
    // 180 rader FÖRSVANN ur skanningen (`api/send-report.mjs` 607 → 480 rader).
    //
    // Provet är det som avslöjade felet: en riktig division BORTOM ett astralt tecken. Den fanns
    // i produktionskoden och missades rakt av.
    const KALLA = [
      "// ✅ en emoji i en kommentar — ett surrogatpar, två kodenheter, EN kodpunkt",
      "const a = kostnad / seats;",
      "const b = l.amount / l.unitPrice;",     // 3 → MÅSTE hittas trots emojin ovan
    ].join('\n');
    assert.deepEqual(hittaBakatrakning(KALLA).map((t) => t.rad), [3],
      'divisionen ligger bortom ett astralt tecken och måste hittas ändå — annars läser vakten '
      + 'varje rad efter emojin mot fel originalrad, och blir blind utan att säga det');

    // INVARIANTEN, som är billigare att pröva än varje enskilt tecken: strippningen bevarar
    // längd och radantal exakt. Håller det kan positionerna per definition inte glida.
    for (const [namn, kalla] of [
      ['emoji i kommentar', "// ✅ ok\nconst a = x / y.unitPrice;"],
      ['emoji i sträng', "const s = '🎉';\nconst a = x / y.unitPrice;"],
      ['emoji i mallsträng', "const s = `🎉 ${ a / b.unitPrice }`;"],
      ['flera surrogatpar', "// 🔨🧪📊\nconst a = x / y.unitPrice;"],
    ]) {
      const s = strippaStrangar(kalla);
      assert.equal(s.length, kalla.length, `${namn}: strippningen ändrade LÄNGDEN`);
      assert.equal(s.split('\n').length, kalla.split('\n').length,
        `${namn}: strippningen ändrade RADANTALET — då pekar varje träff på fel rad`);
    }

    // Och att invarianten håller för HELA den verkliga kodbasen, inte bara fixturerna.
    let desynk = 0;
    for (const katalog of ['lib', 'api', 'agents']) {
      for (const fil of jsFiler(join(ROT, katalog))) {
        const kalla = readFileSync(fil, 'utf8');
        const s = strippaStrangar(kalla);
        if (s.length !== kalla.length || s.split('\n').length !== kalla.split('\n').length) desynk += 1;
      }
    }
    assert.equal(desynk, 0,
      `${desynk} fil(er) desynkar fortfarande — mätt till 3 före fixen, med 180 förlorade rader`);
  });

  test('AD-07 · en avslutad mallsträng blindar aldrig koden efter sig', () => {
    // ══ GRANSKNINGENS FYND 2 (2026-09-09) ════════════════════════════════════════════════════
    // Paritetens värsta felläge var inte att den blankade promptprosa — det är RÄTT — utan att
    // den kunde LÄCKA framåt och blinda resten av filen. Mätt: `agents/recommender/prompt.js`
    // 342 av 357 rader osynliga, `agents/test-invoice/extract.js` 341 av 1 440.
    //
    // ⚠️ TVÅ AV MINA EGNA MÅTT VAR FEL INNAN DET HÄR SATT. Först räknade jag «andel rader som
    // bär kod efter strippning» (40,7 %) — men kommentarrader blankas legitimt, och kodbasen är
    // kommentartung. Sedan räknade jag «rader som ser ut som kod» (82 av 318 i prompt.js) — men
    // i en promptfil ÄR nästan allt innehåll en sträng, och att blanka det är hela poängen.
    // Båda måtten mätte lexern mot fel referens. Det som FAKTISKT ska hålla är en enda sak, och
    // den är falsifierbar: känd kod som ligger EFTER en stor mallsträng måste fortfarande synas.
    const ANKARE = [
      ['agents/recommender/prompt.js', 'export const RECOMMEND_TOOL'],
      ['agents/categorizer/prompt.js', 'export const CATEGORIZE_TOOL'],
      ['agents/test-invoice/extract.js', 'export function aggregateLineItems'],
      ['agents/test-invoice/extract.js', 'export async function extractInvoice'],
      ['api/quote-request.mjs', 'export default async function'],
    ];
    for (const [fil, kod2] of ANKARE) {
      const kalla = readFileSync(join(ROT, fil), 'utf8');
      assert.ok(kalla.includes(kod2), `${fil} saknar ankaret «${kod2}» — flytta ankaret, inte provet`);
      assert.ok(strippaStrangar(kalla).includes(kod2),
        `${fil}: «${kod2}» blev osynlig efter strippning. Tillståndsmaskinen läcker förbi en `
        + 'mallsträng, och då skannar vakten inte längre den kod den finns för att skanna.');
    }
  });

  test('AD-02 · den TILLÅTNA riktningen är orörd — pris per känd enhet', () => {
    // En vakt som förbjuder allt är lika värdelös som ingen vakt (OB-23:s motprov). Att räkna
    // `årskostnad / seats` är doktrinens MOTSATTA riktning: ett känt antal används för att
    // härleda ett pris. Den ska inte fällas, och att den inte fälls måste prövas — annars vet
    // ingen om AD-01 är snäv eller bara tyst.
    assert.equal(BAKATRAKNING.test('const pris = annualCost / seats / 12;'), false,
      'pris per känd enhet är tillåtet och måste förbli det');
    assert.equal(BAKATRAKNING.test('const perEnhet = gap / platser / 12;'), false);
    // Och att den FAKTISKT fäller den förbjudna formen — annars är AD-01 grön av tomhet.
    assert.equal(BAKATRAKNING.test('const antal = l.amount / l.unitPrice;'), true,
      'den förbjudna formen måste fällas, annars mäter AD-01 ingenting');
    assert.equal(BAKATRAKNING.test('seatCount = amount / unit_price;'), true);
    // Formerna granskningen mätte att den GAMLA regexen missade (fynd 4) — nu ankrade, så att
    // en framtida förenkling av mönstret fäller i stället för att tyst krympa täckningen.
    assert.equal(BAKATRAKNING.test('const n = li.amount / li.unitPrice;'), true,
      '`li` är kodbasens eget radnamn i extract.js — det får inte vara en fribiljett');
    assert.equal(BAKATRAKNING.test('raw.amount / raw.unit_price_ore'), true);   // ore-ok: sträng i ett prov, ingen fältläsning
    assert.equal(BAKATRAKNING.test('belopp / apris'), true, 'en naken variabel räknas också');
  });

  test('AD-03 · kolumnläsaren FYLLER aldrig ett antal — beteendeprovet', () => {
    // Det egentliga skyddet, och det enda som inte läser ord. Varje utfall utom `avlast` måste
    // lämna raden orörd: modellens tal står kvar, och ingen lucka fylls.
    const tokens = [
      { sida: 1, x: 100, y: 500, text: 'Beskrivning' },
      { sida: 1, x: 300, y: 500, text: 'Antal' },
      { sida: 1, x: 420, y: 500, text: 'À-pris' },
      { sida: 1, x: 520, y: 500, text: 'Belopp' },
      // Rad med TOM antalskolumn men perfekt bakåträkningsbar aritmetik: 2 102,90 = 10 × 210,29
      { sida: 1, x: 100, y: 460, text: 'Microsoft 365 Business Premium' },
      { sida: 1, x: 420, y: 460, text: '210,29' },
      { sida: 1, x: 520, y: 460, text: '2102,90' },
    ];
    const d = antalForRad(tokens, { amount: 2102.90 });
    assert.equal(d.utfall, AVLASNING.TOM_CELL, 'kolumnen finns, cellen är tom');
    assert.equal(bevisarTomhet(d.utfall), true, 'och det ÄR bevisad tomhet');
    assert.equal(d.antal, null,
      'aritmetiken går ihop på öret och läsaren fyller ändå INGENTING — det är doktrinen');

    // Genom korrigeringen: raden behåller modellens tal, oförändrat.
    const rader = [{ description: 'Microsoft 365 Business Premium', amount: 2102.90, quantity: 7 }];
    const r = korrigeraAntalUrKolumn(rader, tokens);
    assert.equal(r.avlast, 0, 'inget avläst');
    assert.equal(rader[0].quantity, 7, 'modellens tal står kvar — vi tystar det aldrig (KV-06)');
    assert.equal(rader[0].antalKalla, AVLASNING.TOM_CELL, 'och proveniensen säger varför');
  });

  test('AD-04 · korpusens bevis kan inte ruttna i tysthet', async () => {
    // Doktrinen vilar på en MÄTNING, och en mätning som ingen kör om blir en åsikt. Provet
    // räknar om det bärande talet ur de frysta textlagren: rader där kolumnläsaren inte får ut
    // ett antal, men där bakåträkning ger ett rent heltal. Ändras det talet ska någon läsa om
    // fallen innan doktrinen skrivs om — precis som vid en golvändring (BI-09:s läxa).
    const { extraheraTextlager } = await import('../lib/pdf-textlager.js');
    const { lasAntalskolumn } = await import('../lib/fakturakolumner.js');
    const PDFS = join(ROT, 'test-pdfs');
    let utanAntal = 0, rentHeltal = 0;
    for (const f of readdirSync(PDFS).filter((n) => n.endsWith('.pdf')).sort()) {
      let tokens = [];
      try { ({ tokens } = await extraheraTextlager(readFileSync(join(PDFS, f)))); } catch { continue; }
      const t = lasAntalskolumn(tokens);
      if (!t) continue;
      for (const rad of t.rader) {
        if (rad.antal != null) continue;
        const tal = (rad.tal ?? []).filter((n) => n > 0);
        if (tal.length < 2) continue;
        utanAntal += 1;
        const belopp = Math.max(...tal);
        if (tal.some((a) => a < belopp && Math.abs(belopp / a - Math.round(belopp / a)) < 1e-9
          && belopp / a > 1 && belopp / a < 100000)) rentHeltal += 1;
      }
    }
    assert.equal(utanAntal, 23, 'korpusen har ändrats — läs om fallen innan doktrinen skrivs om');
    assert.equal(rentHeltal, 18,
      `bakåträkning ger ett rent heltal på ${rentHeltal} av ${utanAntal} rader (mätt till 18 av `
      + '23 den 9 sep). Talet är doktrinens hela underlag: metoden fyrar på fyra rader av fem '
      + 'och har noll rätt.');
  });

  test('AD-05 · sonden som bar mätningen finns kvar körbar', () => {
    // Ett mätvärde utan sitt instrument är ett påstående. Sonden står kvar så att vem som helst
    // kan köra om beviset — och så att nästa mätning inte behöver skrivas från minnet.
    const p = join(ROT, 'scripts/probe-bakatrakning.mjs');
    const s = readFileSync(p, 'utf8');
    assert.match(kod(s), /lasAntalskolumn/, 'sonden måste gå via den riktiga läsaren');
    assert.match(kod(s), /extraheraTextlager/, 'och läsa verkliga PDF:er, aldrig en fixtur');
  });
});
