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

describe('Kostnadsspärren · Opus-kranen får aldrig stå öppen', () => {
  // /testa-faktura är PUBLIK och kräver ingen inloggning. Varje uppladdad PDF startar TVÅ
  // Opus-anrop (extract + recommend). Rate limiten returnerade tidigare false — "släpp igenom" —
  // när KV saknades eller felade, med kommentaren "Non-fatal — låt analysen gå igenom om KV failar".
  // Spärren försvann alltså exakt när den behövdes mest, och det är med stor sannolikhet vad som
  // stängde av vårt Anthropic-konto. Kan vi inte RÄKNA får vi inte SLÄPPA IGENOM.
  const src = las('api/test-invoice.mjs');

  test('rate limiten är fail-closed: KV saknas eller felar → nekad, aldrig fri passage', () => {
    const i = src.indexOf('async function checkRateLimit');
    const kropp = src.slice(i, src.indexOf('\n}', i) + 2);
    assert.match(kropp, /if \(!kv\) return 'kv-saknas'/, 'saknad KV måste neka, inte släppa igenom');
    assert.match(kropp, /return 'kv-fel'/, 'ett KV-fel måste neka, inte släppa igenom');
    assert.doesNotMatch(kropp, /Non-fatal[\s\S]*?\n\s*\}\s*\n\s*return false/,
      'den gamla fail-open-vägen får aldrig återuppstå');
  });

  test('globaltaket finns, gäller ALLA och ligger före bypass-blocket', () => {
    assert.match(src, /GLOBAL_DAILY_CAP/, 'ett globalt dygnstak måste finnas som andra nät');
    const cap = src.indexOf('await checkGlobalCap(');
    const bypassBlock = src.indexOf('if (!isBypass) {');
    assert.ok(cap > 0 && bypassBlock > 0, 'både globaltak och bypass-block ska finnas');
    assert.ok(cap < bypassBlock,
      'globaltaket måste ligga FÖRE isBypass-blocket — en skenande loop med rätt nyckel är fortfarande en skenande loop');
  });

  test('kunden får aldrig höra "du har gjort för många" när felet är vårt', () => {
    // Regel 3: ett påstående OM KUNDEN kräver täckning. Är det vår KV som ligger nere har kunden
    // inte gjort något — då säger vi det.
    assert.match(src, /Det är vårt fel, inte ert/,
      'vid KV-problem ska meddelandet lägga felet där det hör hemma');
  });
});

describe('Analysmotorns hälsa · om vi inte kan analysera ska VI veta det först', () => {
  // 2026-08-06/07: Anthropic-saldot gick i noll med auto-reload av, och API-åtkomsten spärrades
  // för en obetald skuld på EN CENT. Under de dygnen hade varje faktureanalys dött — och vi hade
  // fått veta det genom att en kund laddade upp en PDF och fick ett fel. Vakten kände sitt eget
  // svep men inte att motorn som gör analysen var död. Sista instansen av veckans mönster.

  test('saldo- och auth-fel är HÅRDA — de löser sig aldrig av att vi väntar', async () => {
    const { klassificera } = await import('../scripts/health-anthropic.mjs');
    const saldo = klassificera({ status: 400, message: 'Your credit balance is too low to access the API' });
    assert.equal(saldo.typ, 'saldo');
    assert.equal(saldo.hart, true, 'tomt saldo måste fälla jobbet — en människa måste agera');

    const auth = klassificera({ status: 401, message: 'authentication_error' });
    assert.equal(auth.hart, true, 'en avvisad nyckel måste fälla jobbet');
  });

  test('överbelastning är TRANSIENT — ett larm som skriker på fel saker blir avstängt', async () => {
    const { klassificera } = await import('../scripts/health-anthropic.mjs');
    for (const fall of [{ status: 529, message: 'overloaded_error' }, { status: 429, message: 'rate limit' }]) {
      assert.equal(klassificera(fall).hart, false,
        'transienta fel får inte väcka någon — det var så verify-sources blev avstängd');
    }
  });

  test('okänt fel behandlas som hårt tills det är förstått', async () => {
    const { klassificera } = await import('../scripts/health-anthropic.mjs');
    assert.equal(klassificera({ status: 418, message: 'nåt nytt' }).hart, true);
  });

  // ── VAKTEN VISSTE, REQUEST-VÄGEN FRÅGADE ALDRIG (2026-08-18) ───────────────────────────────
  // Klassificeringen fanns och var bra — men bodde i den nattliga hälsokontrollen. Request-vägen
  // hade sin egen, tystare hantering: modellfelet fångades, orsaken lades i ett `{ cause: err }`
  // som aldrig lästes, och varje kund fick "Analysen misslyckades — försök igen" oavsett skäl.
  // Så såg det ut den 18 augusti när saldot låg i noll: svepet dog tre nätter i rad, tio omkörda
  // fakturor föll, live-sonden gav 422 — och ingen av dem kunde säga varför.
  //
  // VAKTENS PREMISS:
  //   FÅNGAR: att request-vägen bygger en egen klassificering i stället för att fråga den enda
  //           (regel 1), och att ett HÅRT fel ber kunden "försök igen" — ett råd som inte kan
  //           fungera, alltså ett löfte utan mekanik (regel 9).
  //   BLIND:  vakten vet inte om KLASSIFICERINGEN är rätt för ett fel vi aldrig sett. Ett nytt
  //           felsvar från Anthropic faller på 'okänt' → hårt, vilket är rätt default men inte
  //           ett bevis. Den vet heller inte om koden når kundens skärm — bara att den finns i
  //           svaret; ytan är testad på annat håll.
  test('request-vägen frågar SAMMA klassificering som vakten (ingen andra sanning)', () => {
    for (const fil of ['agents/test-invoice/extract.js', 'agents/recommender/recommend.js']) {
      const src = las(fil);
      assert.match(src, /from '\.\.\/\.\.\/lib\/motorhalsa\.js'/,
        `${fil} ska importera klassificeringen, inte bygga en egen`);
      assert.match(src, /klassificera\(err\)/, `${fil} ska faktiskt anropa den`);
    }
  });

  test('ett HÅRT fel ber ALDRIG kunden försöka igen', async () => {
    const { klassificera, kundmening } = await import('../lib/motorhalsa.js');
    for (const fall of [
      { status: 400, message: 'Your credit balance is too low to access the API' },
      { status: 401, message: 'authentication_error' },
      { status: 418, message: 'nåt nytt' },
    ]) {
      const h = klassificera(fall);
      assert.equal(h.hart, true);
      assert.doesNotMatch(kundmening(h), /försök igen/i,
        'saldot fylls inte på av att kunden laddar upp samma PDF igen — rådet är en vägg');
    }
    // Och tvärtom: vid ett transient fel ÄR "försök igen" rätt råd och ska stå kvar.
    const mjukt = klassificera({ status: 529, message: 'overloaded_error' });
    assert.match(kundmening(mjukt), /försök igen/i);
  });

  test('kunden får aldrig veta VARFÖR motorn är nere — men aldrig heller att det är deras fel', async () => {
    const { klassificera, kundmening } = await import('../lib/motorhalsa.js');
    const m = kundmening(klassificera({ status: 400, message: 'Your credit balance is too low' }));
    for (const lackage of [/saldo/i, /betal/i, /faktur.*obetald/i, /anthropic/i, /api[- ]?nyckel/i]) {
      assert.doesNotMatch(m, lackage, 'vår leverantörsrelation är vår sak, inte kundens');
    }
    assert.match(m, /vår sida/i, 'men vems felet är ska stå klart — annars misstänker kunden sin egen faktura');
  });

  test('kontrollen körs FÖRE svepet i det nattliga jobbet', () => {
    const yml = las('.github/workflows/price-monitor.yml');
    const halsa = yml.indexOf('Analysmotorns hälsa');
    const svep = yml.indexOf('- name: Run price monitor');
    assert.ok(halsa > 0, 'hälsokontrollen måste finnas i det nattliga jobbet');
    assert.ok(halsa < svep, 'är motorn död vill vi veta det direkt — inte efter fem minuters Playwright');
  });

  test('kontrollen är billig: minsta möjliga anrop, aldrig en kostnadspost i sig', () => {
    const src = las('scripts/health-anthropic.mjs');
    assert.match(src, /max_tokens: 1\b/, 'hälsokontrollen ska kosta så nära noll som möjligt');
    assert.match(src, /haiku/i, 'använd den billigaste modellen — vi mäter nåbarhet, inte kvalitet');
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
