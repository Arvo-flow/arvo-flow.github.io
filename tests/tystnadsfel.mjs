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
