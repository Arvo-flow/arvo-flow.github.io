#!/usr/bin/env node
// scripts/screenshot-saasfinance-rightsizing.mjs — VISUELL VERIFIERING (regel 8) av rätt-storleks-
// kortet för saas-finance, efter omdöpningen `fortnoxRightsizing` → `saasFinanceRightsizing`.
//
// ══ VARFÖR DEN INTE ÄR EN STATISK REPRO ════════════════════════════════════════════════════
// Syskonskriptet `screenshot-m365-rightsizing.mjs` skriver av kortets markup för hand och
// fotograferar KOPIAN. Det bevisar att markupen ser bra ut — aldrig att komponenten läser rätt
// fält, och det är precis vad som ändrades här. En modell av maskinen kan inte fälla ett
// nyckelbyte (verifieringsplikten p.2: den riktiga maskinen, inte en modell av den).
//
// Den här sonden fotograferar därför **det byggda paketet**: `build/` serveras lokalt, den
// verkliga React-appen körs, och ENDAST nätverket stubbas — `POST /api/test-invoice` svarar med
// ett payload byggt av en KÖRD `recommend()`. Kortet renderas alltså av produktionskoden ur
// produktionsdata; det enda som inte är äkta är transporten.
//
// ══ MOTPROV (Noll-inferens, amendemang 1) ══════════════════════════════════════════════════
// Efter fotot letar sonden upp kortets text i den renderade DOM:en och kräver att leverantörens
// namn står där. Körningen görs TVÅ gånger — Fortnox och Spiris — och namnen måste SKILJA SIG.
// Vore proveniensen hårdkodad igen (den löd «mot Fortnox publika listpris» till 2026-09-22) skulle
// båda körningarna ge samma sträng, och sonden fäller. Ett foto ingen läser är ingen verifiering.
//
// ══ UTTALAD BLINDFLÄCK ═════════════════════════════════════════════════════════════════════
// Nätverket är stubbat, alltså bevisas inte att servern SKICKAR payloaden — det gör
// `scripts/probe-saasfinance-kontraktet.mjs` och SF-02. Sonden ser bara sidan den öppnade.
//
// Kör: CHROME_BIN=/opt/pw-browsers/chromium-*/chrome-linux/chrome \
//      node scripts/screenshot-saasfinance-rightsizing.mjs

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { recommend } from '../agents/recommender/recommend.js';

const ROT = new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = '/tmp/saasfinance-rs-shots';

if (!existsSync(join(BUILD, 'index.html'))) {
  console.error('✗ build/ saknas — kör `npm run build` först. Detta är INTE ett mätvärde.');
  process.exit(1);
}

// ── Payloaden: byggd av en KÖRD recommend(), aldrig handskriven ─────────────────────────────
const faktura = (beskrivning, belopp, leverantor) => ({
  customer:    { industry: 'konsult', employees: 8 },
  categorized: { category: 'saas-finance', subType: 'affärssystem',
                 normalizedSupplier: leverantor, confidence: 0.95 },
  invoice:     { annualCost: belopp * 12, billingPeriod: 'monthly',
                 lineItems: [{ type: 'recurring_subscription', description: beskrivning, amount: belopp }] },
});

async function payload(beskrivning, belopp, leverantor) {
  const r = await recommend(faktura(beskrivning, belopp, leverantor));
  if (!r?.saasFinanceRightsizing) {
    console.error(`✗ recommend() gav inget saasFinanceRightsizing för ${beskrivning} — inget att fotografera.`);
    process.exit(1);
  }
  return {
    ok: true,
    extracted: {
      supplier: leverantor, amount: belopp, currency: 'SEK', annualCost: belopp * 12,
      billingPeriod: 'monthly', recurring: true, confidenceScore: 0.95, notes: [],
      lineItems: [{ type: 'recurring_subscription', description: beskrivning, amount: belopp }],
    },
    categorized: { category: 'saas-finance', subType: 'affärssystem',
                   normalizedSupplier: leverantor, confidence: 0.95, reasoning: '' },
    recommendation: {
      recommendationType: r.recommendationType, reasoning: r.reasoning,
      confidence: r.confidence, switchSteps: r.switchSteps ?? [],
      suggestedSupplier: r.suggestedSupplier, suggestedAnnualCost: null,
      grossSaving: null, arvoFee: null, netSaving: null, optimizationSaving: null,
      currentAnnualCost: belopp * 12,
      // DET SOM PRÖVAS: fältnamnet kommer ur recommend()-svaret, inte ur en literal här.
      saasFinanceRightsizing: r.saasFinanceRightsizing,
    },
  };
}

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.map': 'application/json' };

const server = createServer(async (req, res) => {
  const bana = decodeURIComponent(req.url.split('?')[0]).replace(/^\/flow/, '') || '/';
  const fil = join(BUILD, bana);
  try {
    if (bana !== '/' && existsSync(fil) && extname(fil)) {
      res.writeHead(200, { 'Content-Type': MIME[extname(fil)] ?? 'application/octet-stream' });
      res.end(await readFile(fil));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(await readFile(join(BUILD, 'index.html')));            // SPA-fallback
  } catch (e) { res.writeHead(500); res.end(String(e.message)); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const bas = `http://127.0.0.1:${server.address().port}/flow`;

await mkdir(UT, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });

const FALL = [
  { tagg: 'fortnox', leverantor: 'Fortnox', beskrivning: 'Fortnox Paket Stor', belopp: 710 },
  { tagg: 'spiris',  leverantor: 'Spiris',  beskrivning: 'Visma eEkonomi Skala', belopp: 549 },
];

const provenienser = [];
for (const f of FALL) {
  const svar = await payload(f.beskrivning, f.belopp, f.leverantor);
  for (const [bredd, storlek] of [[390, 'mobil'], [1600, 'desktop']]) {
    const page = await browser.newPage({ viewport: { width: bredd, height: 1200 } });
    // ⚠️ ORDNINGEN ÄR LASTBÄRANDE. Playwright matchar rutter i OMVÄND registreringsordning, så
    // den bredaste måste registreras FÖRST. Med den sist svalde `**/api/**` anropet till
    // `/api/test-invoice`, sidan fick `{}`, kraschade på `extracted.supplier` och renderade en
    // VIT SIDA — som utifrån inte går att skilja från «kortet visas inte». Felet satt i sonden,
    // inte i koden den mäter (tjugonde gången den här veckan).
    await page.route('**/api/**', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
    await page.route('**/api/token', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ token: 'stub' }) }));
    await page.route('**/api/test-invoice', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(svar) }));
    page.on('pageerror', (e) => console.error(`  [sidfel] ${String(e).slice(0, 200)}`));

    await page.goto(`${bas}/testa-faktura`, { waitUntil: 'networkidle' });
    // Den verkliga vägen in: en riktig PDF på det riktiga file-inputet, sedan appens egen knapp.
    await page.setInputFiles('input[type="file"]', join(ROT, 'test-pdfs/microsoft.pdf'));
    await page.getByRole('button', { name: /Analysera fakturan/i }).first().click();
    // ⚠️ UNDERLAGET ÄR HOPFÄLLT SOM STANDARD. Kortet ligger bakom «↓ Hur vi räknar», och utan
    // den här klicken svarar sonden «kortet syntes aldrig» — ett utfall som är omöjligt att skilja
    // från «kortet renderas inte». Att stanna vid den första timeouten hade gett en falsk dom om
    // koden; det var sonden som inte kom fram.
    await page.getByRole('button', { name: /Hur vi räknar/i }).first()
      .click({ timeout: 45000 });
    try {
      await page.waitForSelector('text=/Rätt-storlek —/', { timeout: 45000 });
    } catch (e) {
      // EN SOND SOM INTE KOM FRAM ÄR INGET MÄTVÄRDE: spara sidan så felet går att läsa i stället
      // för att bara rapportera en timeout (SV-01..11).
      await page.screenshot({ path: `${UT}/FEL-${f.tagg}-${storlek}.png`, fullPage: true });
      console.error(`✗ kortet syntes aldrig — sidan sparad som ${UT}/FEL-${f.tagg}-${storlek}.png`);
      console.error(`  sidans text: ${JSON.stringify((await page.innerText('body')).slice(0, 600))}`);
      throw e;
    }

    const kortet = await page.locator('text=/Rätt-storlek —/').first()
      .locator('xpath=ancestor::div[1]').innerText();
    if (storlek === 'mobil') provenienser.push({ tagg: f.tagg, text: kortet });

    // ── «ARVO BEDÖMER»-stycket: samma rendering avslöjade ett ANDRA fel ─────────────────────
    // `redactSupplier` bytte ut kundens EGEN leverantör mot «en verifierad lägre leverantör», så
    // domens prosa löd «Ni betalar för en verifierad lägre leverantör-paketet Stor». Rättad i
    // `src/lib/leverantorsnamn.js`; här bevisas att den rättningen når skärmen.
    const sidtext = await page.innerText('body');

    // ── ENHETEN FÅR STÅ EN GÅNG (2026-09-22) ───────────────────────────────────────────────
    // Mätt i DOM:en, inte i källan: «220 kr/mån = 2 640 kr kr/år». `formatKr` lägger själv på
    // « kr» och tolv ställen skrev ändå ` kr/år` efter den. FÖ-02 vaktar källan; den här raden
    // vaktar det RENDERADE, alltså även en dubblering som uppstår först när två noder möts.
    const dubbelEnhet = [...sidtext.matchAll(/kr\s+kr/g)];
    if (dubbelEnhet.length) {
      console.error(`✗ dubblerad enhet i renderad text (${f.tagg}/${storlek}): `
        + `${dubbelEnhet.length} träff(ar) på «kr kr»`);
      process.exitCode = 1;
    }

    // ── INGEN MENING FÅR STÅ TVÅ GÅNGER I SAMMA VY (2026-09-22) ─────────────────────────────
    // `recommend()` sätter `reasoning: rs.reviewPrompt`, och kortet skrev samma två meningar en
    // gång till. Inga fel tal — men en yta som ser maskingenererad ut, och då tappar varje siffra
    // runtomkring sin auktoritet. Vakten är GENERELL med flit: den letar inte efter en viss
    // mening utan efter VARJE tillräckligt lång mening som förekommer mer än en gång, så nästa
    // dubblering fälls utan att någon lagt till ett mönster.
    const meningar = sidtext.split(/(?<=[.!?])\s+/).map((m) => m.trim())
      .filter((m) => m.length >= 60);
    const rakning = new Map();
    for (const m of meningar) rakning.set(m, (rakning.get(m) ?? 0) + 1);
    const dubbletter = [...rakning.entries()].filter(([, n]) => n > 1).map(([m]) => m);
    if (meningar.length < 5) {
      console.error(`✗ bara ${meningar.length} meningar ≥60 tecken — vakten är grön av tomhet`);
      process.exitCode = 1;
    }
    if (dubbletter.length) {
      console.error(`✗ ${dubbletter.length} mening(ar) står två gånger i vyn (${f.tagg}/${storlek}):`);
      for (const d of dubbletter) console.error(`    «${d.slice(0, 110)}…»`);
      process.exitCode = 1;
    }
    const trasig = new RegExp(`en verifierad lägre leverantör-paketet|en verifierad lägre leverantör-nivån`);
    if (trasig.test(sidtext)) {
      console.error(`✗ domens prosa är fortfarande redigerad sönder (${f.tagg}/${storlek})`);
      process.exitCode = 1;
    }
    if (!sidtext.includes(`${f.leverantor}-paketet`) && !sidtext.includes(`${f.leverantor}-nivån`)) {
      console.error(`✗ domens prosa namnger inte kundens egen leverantör ${f.leverantor} (${f.tagg}/${storlek})`);
      process.exitCode = 1;
    }

    await page.locator('text=/Rätt-storlek —/').first().locator('xpath=ancestor::div[1]')
      .screenshot({ path: `${UT}/${f.tagg}-${storlek}.png` });
    console.log(`✓ ${f.tagg} · ${storlek} (${bredd}px) → ${UT}/${f.tagg}-${storlek}.png`);
    await page.close();
  }
}
await browser.close();
server.close();

// ── MOTPROVET: två leverantörer måste ge två proveniensmeningar ─────────────────────────────
console.log('\n═══ MOTPROV · är proveniensen leverantörsberoende? ═══\n');
for (const p of provenienser) {
  const rad = p.text.split('\n').find((l) => /publika listpris/.test(l)) ?? '(hittade ingen proveniensrad)';
  console.log(`  ${p.tagg.padEnd(8)} ${rad.trim().slice(-90)}`);
}
// Genitivet är numera korrekt svenska (`genitiv()` i src/utils/format.js): Fortnox och Spiris
// slutar på s respektive x och tar INGEN ändelse. Mönstret får därför inte kräva ett `s`.
const meningar = provenienser.map((p) => (p.text.match(/mot\s+(\S+) publika listpris/) ?? [])[1]);
if (meningar.length !== 2 || !meningar[0] || meningar[0] === meningar[1]) {
  console.error(`\n✗ MOTPROVET FÖLL: proveniensen gav ${JSON.stringify(meningar)} — `
    + 'den är inte leverantörsberoende, alltså bevisar fotot ingenting om källangivelsen.');
  process.exit(1);
}
console.log(`\n  ✓ olika leverantörer, olika källa: ${meningar.join(' vs ')}`);
console.log('\n[screenshot-saasfinance-rightsizing] klar\n');
