// tests/tystnadsfel.mjs — låser TYSTNADSFELEN (grundarfynd 2026-08-04).
//
// En vakt som fallerar tyst är farligare än ingen vakt: tystnaden ser identisk ut med "allt är bra".
// Tre verkliga incidenter samma dygn, alla samma sjukdom:
//   1. Neons kvot tog slut 19–31 juli → getAffectedCustomers fångade felet och returnerade [] →
//      larmkörningen skrev "0 berörda kunder · Klart: 0 skickade" och lyste grönt. Hade en verklig
//      prishöjning detekterats hade ingen kund fått veta det. NOLL ÄR ETT PÅSTÅENDE, OKÄNT ÄR SANNINGEN.
//   2. price-monitor kraschade 4 aug (page.evaluate utanför try/catch) → hela svepet dog av EN
//      flakig leverantörssida, ingen rapport skrevs, inget hjärtslag registrerades, jobbet grönt.
//   3. Femton testfiler låg utanför sviten — maskinlås som aldrig kördes (låst i run.mjs).
//
// Testerna nedan låser 1 och 2 på källkodsnivå: de fäller varje återfall till "svälj felet och
// returnera ett tal som ser ut som ett svar".

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const las = (p) => readFileSync(join(ROOT, p), 'utf8');

describe('Tystnadsfel · noll är ett påstående, okänt är sanningen', () => {
  test('getAffectedCustomers kastar vid databasfel — returnerar aldrig tom lista', () => {
    const src = las('lib/price-alert-store.js');
    const fn = src.slice(src.indexOf('export async function getAffectedCustomers'));
    const kropp = fn.slice(0, fn.indexOf('\n}\n') + 3);
    assert.match(kropp, /throw new Error\(/,
      'getAffectedCustomers måste KASTA vid fel — [] betyder "inga berörda kunder", vilket är ett påstående.');
    assert.doesNotMatch(kropp, /catch[\s\S]*?return\s*\[\]/,
      'Ett databasfel får aldrig förvandlas till en tom kundlista (juli-incidenten).');
  });
});

describe('Tystnadsfel · en flakig sida får inte döda hela svepet', () => {
  test('page.evaluate i checkSource ligger i try/catch', () => {
    const src = las('scripts/price-monitor.mjs');
    const fn = src.slice(src.indexOf('async function checkSource'));
    const kropp = fn.slice(0, fn.indexOf('\n}\n') + 3);
    const i = kropp.indexOf('page.evaluate');
    assert.ok(i > 0, 'checkSource ska läsa sidtexten via page.evaluate');
    // Närmaste föregående nyckelord före anropet måste vara ett try, inte en oskyddad sats.
    const fore = kropp.slice(0, i);
    assert.ok(fore.lastIndexOf('try {') > fore.lastIndexOf('return results;'),
      'page.evaluate måste ligga inuti try/catch — annars dödar EN omdirigerande sida hela svepet (4 aug).');
  });
});

describe('Tystnadsfel · ett tomt rum får aldrig betyda "vi kunde inte läsa"', () => {
  // 2026-08-06: getAnalysesByFingerprint/ByEmail returnerade [] vid databasfel. Är databasen nere
  // öppnar kunden sitt rum och ser ETT TOMT KONTOR — "ni har inga fakturor" — när sanningen är
  // "vi kunde inte läsa". I den yta kunden BETALAR för drar hen slutsatsen att underlaget är borta.
  test('analysläsningarna kastar vid databasfel — returnerar aldrig tom lista', () => {
    const src = las('lib/invoice-store.js');
    for (const fn of ['getAnalysesByFingerprint', 'getAnalysesByEmail']) {
      const i = src.indexOf(`export async function ${fn}`);
      assert.ok(i > 0, `${fn} saknas i lib/invoice-store.js`);
      // Funktionskroppen = fram till nästa toppnivådeklaration (eller filslut).
      const nasta = src.indexOf('\nexport ', i + 10);
      const kropp = src.slice(i, nasta > 0 ? nasta : src.length);
      const c = kropp.indexOf('} catch');
      assert.ok(c > 0, `${fn} saknar felhantering`);
      const katch = kropp.slice(c);
      assert.match(katch, /throw new Error\(/, `${fn} måste KASTA vid fel — [] betyder "inga fakturor".`);
      assert.doesNotMatch(katch, /return\s*\[\]/, `${fn} får aldrig returnera tom lista vid databasfel.`);
    }
  });

  test('rummets API svarar 503 med ärlig mening i stället för tomt kontor', () => {
    const src = las('api/invoice-history.mjs');
    assert.match(src, /503/, 'invoice-history måste svara med felstatus när underlaget inte gick att läsa');
    assert.match(src, /kunde_inte_lasa/);
    assert.match(src, /inget har försvunnit/, 'meddelandet ska lugna kunden om att data finns kvar');
  });
});

describe('Tystnadsfel · avsändardomänen (kundlarmet som aldrig gick fram)', () => {
  // 2026-08-05: notify-price-changes.mjs skickade från "arvo-flow.se" (BINDESTRECK) — en domän vi
  // inte äger i Resend. Varje kundlarm dog på 403, steget bar continue-on-error, jobbet grönt.
  // Ett tecken skilde produktens kärnlöfte från att fungera.
  const KALLOR = [
    'scripts/notify-price-changes.mjs', 'api/cron/run-price-alerts.mjs', 'api/cron/send-reminders.mjs',
    'api/cron/generate-briefings.mjs', 'api/send-analysis.mjs', 'api/inbound-email.mjs',
    'api/generate-prospect.mjs', 'api/briefing.mjs', 'api/send-report.mjs',
    'api/activate-intelligence.mjs', 'api/auth/request-magic-link.mjs', 'lib/benchmark.js',
  ];

  for (const p of KALLOR) {
    test(`${p} skickar från den verifierade domänen arvoflow.se`, () => {
      const src = las(p);
      const fel = [...src.matchAll(/[\w.+-]+@([\w.-]+\.\w+)/g)]
        .map((m) => m[1])
        .filter((d) => /arvo/i.test(d) && d !== 'arvoflow.se' && !d.endsWith('.arvoflow.se'));
      assert.deepEqual([...new Set(fel)], [],
        `Ej verifierad avsändardomän i ${p} — Resend svarar 403 och kunden får aldrig sitt larm.`);
    });
  }
});

describe('Kostnadsspärren · databasen får inte väckas i onödan', () => {
  // 2026-08-06: drain-ingest kör varje minut (vercel.json). Varje körning frågade Postgres, och en
  // fråga var 60:e sekund gör att Neons beräkning ALDRIG autosuspendar — ~180 CU-timmar/månad för
  // att fråga en tom kö. Det matchar nästan exakt förbrukningen som sprängde Free-taket 18 juli.
  // Spärren: en KV-flagga (väcker ingen databas) avgör om det finns arbete.
  test('drainen hoppar över Postgres när köflaggan är bevisat falsk', () => {
    const src = las('api/cron/drain-ingest.mjs');
    assert.match(src, /hasPendingFlag/, 'drainen måste läsa köflaggan innan den rör databasen');
    assert.match(src, /flagga === false/,
      'endast ett BEVISAT tomt läge får hoppa över — null (KV saknas) måste fråga Postgres');
    assert.match(src, /sakerhetsslot/, 'en säkerhetsslot måste finnas så inget jobb kan strandsättas');
  });

  test('OKÄNT räknas aldrig som tomt — hasPendingFlag returnerar null utan KV', () => {
    const src = las('lib/ingest-queue.js');
    const fn = src.slice(src.indexOf('export async function hasPendingFlag'));
    const kropp = fn.slice(0, fn.indexOf('\n}\n') + 3);
    assert.match(kropp, /if \(!kv\) return null/, 'saknad KV måste ge null, aldrig false');
    assert.match(kropp, /catch \{ return null/, 'ett KV-fel måste ge null, aldrig false');
  });

  test('båda köläggarna sätter flaggan — annars strandsätts arbete', () => {
    const src = las('lib/ingest-queue.js');
    for (const fn of ['enqueueJobs', 'retryFailedBySender']) {
      const i = src.indexOf(`export async function ${fn}`);
      const nasta = src.indexOf('\nexport ', i + 10);
      const kropp = src.slice(i, nasta > 0 ? nasta : src.length);
      assert.match(kropp, /markPending\(\)/, `${fn} måste sätta köflaggan när den lägger till arbete`);
    }
  });
});

describe('Tystnadsfel · en kraschad natt får inte se ut som en lugn natt', () => {
  const yml = las('.github/workflows/price-monitor.yml');

  test('rapportgrinden skiljer "ingen rapport" (krasch) från "rapport utan avvikelser" (lugnt)', () => {
    assert.match(yml, /crashed=true/,
      'Grinden måste märka det kraschade svepet separat — inte bunta ihop det med den lugna natten.');
    assert.doesNotMatch(yml, /svepet var lugnt eller kraschade/,
      'Den gamla formuleringen gjorde krasch och lugn natt till samma gröna utfall.');
  });

  test('jobbet fälls när svepet inte producerade någon rapport', () => {
    const steg = yml.slice(yml.indexOf('Vaktens tystnad är ett fel'));
    assert.match(steg, /steps\.report\.outputs\.crashed == 'true'/);
    assert.match(steg, /exit 1/,
      'En natt då vakten inte svepte måste fälla jobbet — den mejlen är sann och ska komma.');
  });
});
