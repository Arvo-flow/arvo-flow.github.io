// tests/diagnos.mjs — DG-01..08
//
// Ur regel 8-genomgången av HUVUDFUNNELN (2026-08-22), dagen efter att samma sats fällde rummet
// i fyra ytor. TestaFaktura räknade:
//
//     diagOvPct    = suggested > 0 && suggested < annual ? … : 0
//     diagScoreRaw = clickScore ?? Math.max(5, 100 - diagOvPct * 1.5)
//     diagScore    = !shouldSwitch ? min(raw, 85) : …
//
// Utan bytesmål blev ovPct 0 → raw 100 → score 85 → «Ni har ett marknadsmässigt avtal — bättre än
// branschsnittet.» Men `suggested = 0` betyder inte att kunden betalar bra; det betyder att VI
// inte kunde räkna fram ett mål. Frånvaron av ett verifierat bytesmål säger ingenting om huruvida
// kunden betalar rätt — fjärde gången satsen fäller en yta i den här kodbasen.
//
// Och mina egna fixar samma dygn gjorde läget VANLIGARE: totalgrinden nollar bytesmålet när
// kohortdatan är en totalsumma, lfl-grinden när licensraderna saknar bevisat pris, finansgrinden
// när målet inte underskrider kostnaden. Alla tre är rätt. En fix som gör ett gammalt
// redovisningsfel vanligare måste stänga det också.
//
// FÅNGAR: att ett score sätts eller ett positivt omdöme skrivs utan mätt jämförelsetal; att
//   klickanalysens egna mätta score tystas av misstag; att gaugen visar en siffra vi inte har.
// BLIND: säger bara OM ett mål finns, aldrig om målet är RÄTT produkt eller rätt källa — det är
//   licensnivåns (kraverBekraftadNiva) och jamforelsekalla.js ansvar.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { diagnos } from '../lib/lagesregister.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('DG · Utan mätt jämförelsetal finns inget omdöme', () => {
  test('DG-01 · det exakta fallet: inget bytesmål → inget score', () => {
    for (const suggested of [null, undefined, 0]) {
      const d = diagnos({ annual: 45_600, suggested, clickPriceScore: null, shouldSwitch: false, netSaving: 0 });
      assert.equal(d.matt, false, `suggested=${suggested} gav ett mätt tal`);
      assert.equal(d.score, null,
        'det här är raden som gav 85 och «bättre än branschsnittet» på en faktura vi inte kunnat jämföra');
      assert.ok((d.skal ?? '').length > 0, 'tystnaden måste bära sitt skäl');
    }
  });

  test('DG-02 · ett mål som inte underskrider kostnaden är inget mål', () => {
    // Finansgrinden nollar redan bytet i det här läget; frontend fick ändå ett tal förr.
    const d = diagnos({ annual: 45_600, suggested: 57_810, clickPriceScore: null, shouldSwitch: false, netSaving: 0 });
    assert.equal(d.matt, false);
    assert.equal(d.score, null);
  });

  test('DG-03 · MOTPROVET: ett verkligt gap ger fortfarande sitt score och sina procent', () => {
    // En spärr som tystar allt är lika värdelös som ingen spärr.
    const d = diagnos({ annual: 45_600, suggested: 16_060, clickPriceScore: null, shouldSwitch: true, netSaving: 23_632 });
    assert.equal(d.matt, true);
    assert.ok(d.score > 0 && d.score <= 79, `score ${d.score} — byte ska cappas vid 79 (Förbättringsläge)`);
    assert.equal(d.ovPct, 65);
    assert.equal(d.overMarketPct, 184, 'over-market räknas mot MÅLET, aldrig andel-av-priset (Svea/85-felet)');
  });

  test('DG-04 · klickanalysens egna score överlever — den behöver inget bytesmål', () => {
    // skrivarleasing mäter ur radernas klickpriser och är mätt även utan suggested.
    const d = diagnos({ annual: 120_000, suggested: 0, clickPriceScore: 42, shouldSwitch: false, netSaving: 0 });
    assert.equal(d.matt, true);
    assert.equal(d.score, 42);
  });

  test('DG-05 · utan årskostnad finns ingenting att jämföra', () => {
    for (const annual of [0, null, undefined, -1]) {
      const d = diagnos({ annual, suggested: 16_060, clickPriceScore: null, shouldSwitch: false, netSaving: 0 });
      assert.equal(d.matt, false, `annual=${annual} gav ett mätt tal`);
    }
  });

  test('DG-06 · INVARIANTEN över fältet: matt=false ⇒ score=null, alltid', () => {
    for (const annual of [0, 1, 45_600, 1_000_000]) {
      for (const suggested of [null, 0, 1, 16_060, 57_810, 1_000_000]) {
        for (const click of [null, 0, 42]) {
          for (const sw of [true, false]) {
            const d = diagnos({ annual, suggested, clickPriceScore: click, shouldSwitch: sw, netSaving: 100 });
            if (!d.matt) {
              assert.equal(d.score, null, `matt=false men score=${d.score} (annual=${annual} sugg=${suggested})`);
              assert.equal(d.ovPct, 0);
              assert.equal(d.overMarketPct, 0);
            } else {
              assert.ok(Number.isFinite(d.score), `matt=true men score=${d.score}`);
            }
          }
        }
      }
    }
  });

  test('DG-07 · ett tomt anrop kraschar inte och påstår ingenting', () => {
    assert.doesNotThrow(() => diagnos());
    assert.equal(diagnos().matt, false);
    assert.equal(diagnos().score, null);
  });
});

describe('DG-08 · Analyssidan läser den delade domen', () => {
  const kod = readFileSync(join(ROT, 'src', 'pages', 'TestaFaktura', 'index.js'), 'utf8')
    .split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');

  test('scoren kommer ur API:ts läge, inte ur en egen 100 − ovPct-formel', () => {
    // Lägesregistret (2026-09-23): diagnosen räknas i api-lagret (lib/lagesregister.js fakturaLage)
    // och kommer i `result.lage`. Analyssidan får varken kalla diagnos() eller räkna själv.
    assert.match(kod, /const _lage\s+= result\?\.lage/, 'analyssidan ska läsa API:ts läge');
    assert.doesNotMatch(kod, /diagnos\(\{/, 'analyssidan räknar diagnosen själv igen');
    // Etiketten ges bara ett MÄTT tal — en omätt poäng blev förut 0 och fick «Kritisk».
    assert.match(kod, /const diagC = _diag\.etikett/, 'etiketten väljs inte ur API:ts etikett');
    assert.doesNotMatch(kod, /Math\.max\(5,\s*Math\.round\(100\s*-\s*diagOvPct/,
      'den lokala formeln är kvar — den var det som gav 100 (→ 85) när inget mål fanns');
  });

  test('omätta tal renderas som «—», aldrig som en siffra', () => {
    const traffar = [...kod.matchAll(/className="gauge-val">\{([^}]+)\}/g)].map((m) => m[1]);
    assert.ok(traffar.length >= 2, `hittade bara ${traffar.length} gauge-värden — vakten mäter fel objekt`);
    for (const t of traffar) {
      assert.match(t, /diagMatt/,
        `gauge-värdet «${t}» visas utan att fråga om talet är mätt — då står 85 där vi inte vet`);
    }
  });

  test('berömtexten kan inte nås utan mätt tal', () => {
    const i = kod.indexOf('const diagInsight');
    assert.ok(i > 0, 'hittade inte diagInsight — vakten mäter fel objekt');
    const forstaGrenen = kod.slice(i, kod.indexOf('\n', kod.indexOf('?', i)));
    // 2026-09-24: meningarna flyttade till registret (src/lib/diagnos.js diagnosMening, vars första gren
    // är `!lage?.matt` — prövat i DM-01). Vyns enda egna gren måste fortfarande kräva ett mätt tal.
    assert.match(forstaGrenen, /!diagMatt|diagMatt &&/,
      'vyns egen gren nås utan mätt tal — då kan en text om priset nås utan mätning');
    assert.match(kod.slice(i, i + 600), /diagnosMening\(_diag/, 'resten av diagnosen formuleras inte av registret');
  });
});

// ── AR · ANALYSKORTETS RUBRIKER ÄR DEKLARERADE, INTE HÅRDKODADE ─────────────────────────────
//
// GRANSKNINGENS FYND 5 (2026-09-08). DL-10 i tests/domslut.mjs vaktade frasen «marknadsmässigt
// pris» i kundytorna. Granskaren visade att vakten är EN REDIGERING BRED: «Ert pris ligger i
// linje med marknaden» passerade både DL-10, claims-audit och hela pre-commit-kedjan. Att lappa
// ordlistan hade gett samma vakt en ord längre lista — och nästa formulering hade passerat den.
//
// Påståendekontraktet namnger själv hålet i sin BLIND-rad: det ser inte en yta som gör sina
// påståenden UTAN lägesmodul. Analyskortets rubrik var en sådan yta: en hårdkodad sträng i JSX.
// `ANALYSRUBRIKER` gör frågan tvingande — en ny rubrik måste läggas i registret, och där måste
// den svara på om den påstår något om KUNDENS PRIS eller bara om VÅRT BESLUT.
//
// FÅNGAR: en rubrik som renderas utan att stå i registret, och en neutralt deklarerad rubrik
//   vars text ändå dömer priset.
// BLIND: AR-02 är ett BACKSTOPP som läser vokabulär. Den som skriver ett prisomdöme OCH
//   deklarerar det `positivtPastaende: true` har svarat på frågan — då är det granskarens jobb.
//   Skillnaden mot förut är att frågan inte längre KAN hoppas över.
describe('AR · Analyskortets rubriker svarar i påståendekontraktet', () => {
  test('AR-01 · varje rubrik är deklarerad, och kontraktet dömer registret', async () => {
    const { ANALYSRUBRIKER } = await import('../src/lib/diagnos.js');
    const { bedomPastaendekontrakt } = await import('../src/lib/pastaendekontrakt.js');
    const nycklar = Object.keys(ANALYSRUBRIKER);
    assert.ok(nycklar.length >= 2, 'registret får inte vara tomt — då är vakten grön av tomhet');

    for (const [k, r] of Object.entries(ANALYSRUBRIKER)) {
      assert.equal(typeof r.positivtPastaende, 'boolean',
        `${k}: rubriken måste SVARA på om den påstår något om kundens pris`);
      assert.ok(typeof r.rubrik === 'string' && r.rubrik.trim().length > 0, `${k}: saknar rubriktext`);
      assert.ok(typeof r.text === 'string' && r.text.trim().length > 0, `${k}: saknar brödtext`);
    }

    // Samma dom som varje annan lägesmodul får. `omatt` markeras på de lägen som inte mätt
    // kundens pris — kontraktet kräver att minst ett sådant finns (en modul utan omätt läge har
    // inte tänkt igenom sitt eget okända).
    const lagen = Object.fromEntries(Object.entries(ANALYSRUBRIKER).map(([k, r]) =>
      [k, { positivtPastaende: r.positivtPastaende, omatt: r.positivtPastaende === false }]));
    const dom = bedomPastaendekontrakt({ namn: 'ANALYSRUBRIKER', lagen, natt: nycklar });
    assert.deepEqual(dom.brister, [], 'registret bryter mot påståendekontraktet');
    assert.equal(dom.ok, true);
  });

  test('AR-02 · en neutralt deklarerad rubrik dömer inte priset (backstopp)', async () => {
    const { ANALYSRUBRIKER } = await import('../src/lib/diagnos.js');
    // Vokabulär som gör ett påstående om KUNDENS PRIS. Listan är ett skyddsnät under
    // deklarationen, aldrig skyddet självt — jämför SK-08:s läxa: förbjud PÅSTÅENDET, inte ordet,
    // och därför prövas den bara på lägen som deklarerat att de INTE påstår något.
    const PRISOMDOME = /marknadsmässig|i linje med marknaden|bra betalt|konkurrenskraftig|priset är rätt|förmånligt|bättre än (?:snittet|branschsnittet)/i;
    for (const [k, r] of Object.entries(ANALYSRUBRIKER)) {
      if (r.positivtPastaende) continue;          // deklarerat påstående → granskarens fråga
      const helText = `${r.rubrik} ${r.text}`;
      assert.doesNotMatch(helText, PRISOMDOME,
        `${k} är deklarerat neutralt men texten dömer priset: "${helText}"`);
    }
  });

  test('AR-04 · rubriken känner till VARJE rätt-storlekskort i vyn', async () => {
    // FYNDET (2026-09-22, helsidesrendering): «Inget byte att rekommendera · vi hittar inget
    // publikt pris att byta ned till» stod tre block ovanför «Nivån under, Mellan, är 220 kr/mån
    // billigare … 2 640 kr/år». Var mening sann för sig, helheten osann — helhetskravet 15 aug.
    //
    // Vakten prövar INTE att listan innehåller två namn (det vore att skriva av den). Den HÄRLEDER
    // kortvillkoren ur kundytans källkod och kräver att registret känner varje sådant kort. Läggs
    // ett tredje kort till utan att rubriken vet om det, faller den här — och det är exakt så
    // motsägelsen skulle återinföras.
    const { readFileSync } = await import('node:fs');
    const kalla = readFileSync(new URL('../src/pages/TestaFaktura/index.js', import.meta.url), 'utf8');
    // Lägesregistret (2026-09-23): rubriken väljs i api-lagret (fakturaLage → `lage.rubrik`) ur
    // RATTSTORLEK_FALT. Vakten härleder fortfarande korten ur KUNDYTAN och kräver att registret
    // känner varje; beteendet prövas nu i den funktion som faktiskt väljer.
    const { RATTSTORLEK_FALT: NIVASANKNINGSKORT } = await import('../lib/rattstorleksfynd.js');
    const { fakturaLage } = await import('../lib/lagesregister.js');
    const { ANALYSRUBRIKER } = await import('../src/lib/diagnos.js');
    const harNivasankningskort = (rek) => fakturaLage({ recommendation: rek ?? undefined, categorized: { category: 'saas-finance' } },
      { rattstorlekFalt: NIVASANKNINGSKORT }).rubrik === 'inget_byte_med_nivasankning';

    const kortIYtan = [...new Set([...kalla.matchAll(/result\.recommendation\?\.(\w*Rightsizing)\s*&&/g)]
      .map((m) => m[1]))];
    assert.ok(kortIYtan.length >= 2,
      `hittade bara ${kortIYtan.length} rätt-storlekskort i kundytan — mätte vakten rätt sak?`);
    for (const f of kortIYtan) {
      assert.ok(NIVASANKNINGSKORT.includes(f),
        `kundytan visar ett ${f}-kort som rubriken inte känner till — rubriken kan då förneka det`);
    }

    // Beteendet, inte bara listan: med ett kort måste rubriken byta läge.
    assert.equal(harNivasankningskort({ [kortIYtan[0]]: { vendor: 'X' } }), true);
    assert.equal(harNivasankningskort({}), false, 'motprovet: utan kort gäller inget_byte');
    assert.equal(harNivasankningskort(null), false, '«ingen rekommendation» är inte «ett kort»');

    // Och rubriken får inte förneka kortet i ord.
    assert.doesNotMatch(ANALYSRUBRIKER.inget_byte_med_nivasankning.rubrik + ' '
      + ANALYSRUBRIKER.inget_byte_med_nivasankning.text,
      /hittar inget publikt pris att byta ned till för de licensrader/,
      'läget upprepar inget_byte:s förnekande — då är det inget eget läge');
  });

  test('AR-03 · kundytan renderar registret, inte en egen sträng', async () => {
    const { readFileSync } = await import('node:fs');
    const kalla = readFileSync(new URL('../src/pages/TestaFaktura/index.js', import.meta.url), 'utf8');
    assert.match(kalla, /import \{[^}]*\bANALYSRUBRIKER\b[^}]*\} from '\.\.\/\.\.\/lib\/diagnos'/,
      'kortet måste låna rubrikerna, aldrig skriva av dem');
    const { ANALYSRUBRIKER } = await import('../src/lib/diagnos.js');
    for (const k of Object.keys(ANALYSRUBRIKER)) {
      assert.match(kalla, new RegExp(`ANALYSRUBRIKER\\.${k}\\.rubrik`),
        `rubriken ${k} finns i registret men renderas inte — ett oanvänt läge är ett läge ingen granskar`);
    }
    // Och den gamla hårdkodade formen får inte komma tillbaka bredvid registret.
    assert.doesNotMatch(kalla, /<strong>Inget byte att rekommendera\.<\/strong>/,
      'rubriken ska komma ur registret, inte ur en literal som kan glida isär från det');
  });
});
