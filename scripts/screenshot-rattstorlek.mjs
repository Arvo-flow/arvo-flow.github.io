#!/usr/bin/env node
// scripts/screenshot-rattstorlek.mjs — REGEL 8 för rätt-storleksfynden, i BÅDA ytorna.
//
// 1. Fakturavyn: Adobe-kortet. Före 2026-09-23 serialiserades `adobeRightsizing` aldrig (mätt live),
//    så kortet har inte renderats i produktion. Payloaden byggs av en KÖRD `recommend()`.
// 2. Rummet: rätt-storleksfynd ur `rattstorlek_json`. Raderna byggs av en KÖRD motor genom
//    `valjRattstorlek` — samma funktion som `storeAnalysis` lagrar med — aldrig handskrivna.
//
// MOTPROV: sonden räknar korten i DOM:en och kräver exakt det antal raderna bär (3 av 4 — en
//   mobilrad utan fynd ska INTE ge ett kort), att varje kort säger «listpris», att ingen mening står
//   två gånger och att ingen enhet dubbleras. Ett foto ingen läser är ingen verifiering.
// BLIND: nätverket är stubbat — att servern SKICKAR fälten bevisar diag-live och SVK-01.
//
// Kör: CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/screenshot-rattstorlek.mjs

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { recommend } from '../agents/recommender/recommend.js';
import { valjRattstorlek } from '../lib/rattstorleksfynd.js';
import { saasFinanceRightsizing } from '../lib/saas-finance-rightsizing.js';
import { m365Rightsizing } from '../lib/m365-rightsizing.js';
import { adobeRightsizing } from '../lib/adobe-rightsizing.js';

const ROT = new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = join(ROT, 'results/screenshots/rattstorlek');
if (!existsSync(join(BUILD, 'index.html'))) {
  console.error('✗ build/ saknas — kör `npm run build` först. Detta är INTE ett mätvärde.');
  process.exit(1);
}

// ── Fakturavyn: en körd recommend() på en Adobe All Apps-faktura ──────────────────────────────
const adobeRader = [{ type: 'recurring_subscription', description: 'Adobe Creative Cloud Alla program (20 licenser)', amount: 13125, quantity: 20 }];
const adobeSvar = await recommend({
  customer: { industry: 'byraer', employees: 20 },
  categorized: { category: 'saas-creative', subType: 'design', normalizedSupplier: 'Adobe', confidence: 0.95 },
  invoice: { annualCost: 13125 * 12, billingPeriod: 'monthly', seatCount: 20, lineItems: adobeRader },
});
if (!adobeSvar?.adobeRightsizing) { console.error('✗ recommend() gav inget adobeRightsizing — inget att fotografera'); process.exit(1); }
const FAKTURA = {
  ok: true,
  extracted: { supplier: 'Adobe Systems Software Ireland', amount: 13125, currency: 'SEK', annualCost: 13125 * 12,
    billingPeriod: 'monthly', recurring: true, confidenceScore: 0.95, notes: [], lineItems: adobeRader },
  categorized: { category: 'saas-creative', subType: 'design', normalizedSupplier: 'Adobe', confidence: 0.95, reasoning: '' },
  recommendation: {
    recommendationType: adobeSvar.recommendationType, reasoning: adobeSvar.reasoning, confidence: adobeSvar.confidence,
    switchSteps: [], suggestedSupplier: adobeSvar.suggestedSupplier, suggestedAnnualCost: null,
    grossSaving: null, arvoFee: null, netSaving: null, optimizationSaving: null,
    adobeRightsizing: adobeSvar.adobeRightsizing,
  },
};

// ── Rummet: rader vars rattstorlek_json kommer ur motorerna via lagringsfunktionen ────────────
const rad = (id, supplier, category, annual, rs, dag) => ({
  id, supplier, normalized_supplier: supplier, category, annual_cost: annual, suggested_annual_cost: null,
  gross_saving: null, net_saving: null, should_switch: false, route: 'auto', industry: 'byraer', employees: 20,
  billing_period: 'monthly', created_at: `2026-09-${dag}T08:00:00Z`, rattstorlek_json: rs,
});
const ANALYSES = [
  rad(1, 'Fortnox', 'saas-finance', 8520,
    valjRattstorlek({ saasFinanceRightsizing: saasFinanceRightsizing([{ description: 'Fortnox Paket Stor', amount: 710 }]) }), 20),
  rad(2, 'Microsoft', 'saas-productivity', 192354, valjRattstorlek({ m365Rightsizing: m365Rightsizing('e5', 25) }), 21),
  rad(3, 'Adobe', 'saas-creative', 157500, valjRattstorlek({ adobeRightsizing: adobeRightsizing(adobeRader, 20) }), 22),
  rad(4, 'Telia', 'mobil', 48000, null, 19),
];
const RUM = { ok: true, analyses: ANALYSES, branchAnchors: {}, movements: {}, email: 'ekonomi@exempel.se' };
const VANTAT_ANTAL = ANALYSES.filter((a) => a.rattstorlek_json).length;

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.map': 'application/json' };
const server = createServer(async (req, res) => {
  const bana = decodeURIComponent(req.url.split('?')[0]).replace(/^\/flow/, '') || '/';
  const fil = join(BUILD, bana);
  try {
    if (bana !== '/' && existsSync(fil) && extname(fil)) {
      res.writeHead(200, { 'Content-Type': MIME[extname(fil)] ?? 'application/octet-stream' });
      return res.end(await readFile(fil));
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(await readFile(join(BUILD, 'index.html')));
  } catch (e) { res.writeHead(500); res.end(String(e.message)); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const bas = `http://127.0.0.1:${server.address().port}/flow`;
await mkdir(UT, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });

function vaktaText(sidtext, var_) {
  if (/kr\s+kr/.test(sidtext)) { console.error(`✗ dubblerad enhet (${var_})`); process.exitCode = 1; }
  const meningar = sidtext.split(/(?<=[.!?])\s+/).map((m) => m.trim()).filter((m) => m.length >= 60);
  const n = new Map(); for (const m of meningar) n.set(m, (n.get(m) ?? 0) + 1);
  const dubbla = [...n].filter(([, c]) => c > 1);
  if (dubbla.length) { console.error(`✗ mening två gånger (${var_}): «${dubbla[0][0].slice(0, 100)}»`); process.exitCode = 1; }
}

async function sida(bredd) {
  const page = await browser.newPage({ viewport: { width: bredd, height: 1100 } });
  // Omvänd registreringsordning: den bredaste FÖRST (se screenshot-saasfinance-rightsizing.mjs).
  await page.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
  await page.route('**/api/token', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"token":"stub"}' }));
  await page.route('**/api/test-invoice', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(FAKTURA) }));
  await page.route('**/api/invoice-history**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(RUM) }));
  page.on('pageerror', (e) => { console.error(`  [sidfel] ${String(e).slice(0, 200)}`); process.exitCode = 1; });
  return page;
}

for (const [bredd, namn] of [[390, 'mobil'], [1600, 'desktop']]) {
  // 1 · Fakturavyn
  const p1 = await sida(bredd);
  await p1.goto(`${bas}/testa-faktura`, { waitUntil: 'networkidle' });
  await p1.setInputFiles('input[type="file"]', join(ROT, 'test-pdfs/adobe-creative-cloud-ars.pdf'));
  await p1.getByRole('button', { name: /Analysera fakturan/i }).first().click();
  await p1.getByRole('button', { name: /Hur vi räknar/i }).first().click({ timeout: 45000 });
  await p1.waitForSelector('text=/Rätt-storlek — Adobe/', { timeout: 45000 });
  const t1 = await p1.innerText('body');
  if (/Inget byte\.\s/.test(t1) && !/en nivå att sänka/i.test(t1)) { console.error(`✗ rubriken förnekar kortet (${namn})`); process.exitCode = 1; }
  if (!/listpris 746,00/.test(t1)) { console.error(`✗ fakturavyn kallar inte 746,00 för listpris (${namn})`); process.exitCode = 1; }
  vaktaText(t1, `faktura/${namn}`);
  await p1.screenshot({ path: `${UT}/faktura-adobe-${namn}.png`, fullPage: true });
  await p1.close();

  // 2 · Rummet
  const p2 = await sida(bredd);
  await p2.goto(`${bas}/portfolio?magic=stub`, { waitUntil: 'networkidle' });
  await p2.waitForTimeout(1500);
  const kort = p2.locator('text=/Rätt-storlek · listprisskillnad/');
  const antal = await kort.count();
  if (antal !== VANTAT_ANTAL) { console.error(`✗ rummet visar ${antal} rätt-storlekskort, raderna bär ${VANTAT_ANTAL} (${namn})`); process.exitCode = 1; }
  const t2 = await p2.innerText('body');
  if (antal > 0 && !/listpris 710 kr\/mån/.test(t2)) { console.error(`✗ kortet saknar ordet listpris (${namn})`); process.exitCode = 1; }
  // HELHETSKRAVET (2026-09-23): domen får inte friskriva kunden bredvid ett fynd — det var exakt vad
  // rummets första rendering med korten visade («Vi jämförde 0 fakturor … ni behöver inte göra något»).
  for (const fel of [/ni behöver inte göra något/i, /Vi jämförde 0 fakturor/, /jämförelsepris för era kategorier/]) {
    if (fel.test(t2)) { console.error(`✗ rummet säger ${fel} bredvid ${antal} rätt-storlekskort (${namn})`); process.exitCode = 1; }
  }
  vaktaText(t2, `rum/${namn}`);
  await p2.screenshot({ path: `${UT}/rummet-${namn}.png`, fullPage: true });
  console.log(`${namn}: fakturavyn OK-kontroller körda · rummet ${antal}/${VANTAT_ANTAL} kort`);
  await p2.close();
}
// MOTPROV: samma rum UTAN fynd. Kort får inte uppstå, och domens gamla lugna mening ska stå kvar —
// annars bevisar kontrollen ovan bara att texten försvunnit överallt, inte att den styrs av korten.
{
  const tomt = { ...RUM, analyses: ANALYSES.map((a) => ({ ...a, rattstorlek_json: null })) };
  const p3 = await sida(1600);
  await p3.unroute('**/api/invoice-history**');
  await p3.route('**/api/invoice-history**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(tomt) }));
  await p3.goto(`${bas}/portfolio?magic=stub`, { waitUntil: 'networkidle' });
  await p3.waitForTimeout(1500);
  const n = await p3.locator('text=/Rätt-storlek · listprisskillnad/').count();
  const t3 = await p3.innerText('body');
  if (n !== 0) { console.error(`✗ motprov: ${n} kort i ett rum utan fynd`); process.exitCode = 1; }
  if (!/ni behöver inte göra något/i.test(t3)) { console.error('✗ motprov: domens lugna mening saknas även utan fynd — kontrollen mäter inget'); process.exitCode = 1; }
  console.log(`motprov: rum utan fynd → ${n} kort, lugn mening ${/ni behöver inte göra något/i.test(t3) ? 'kvar' : 'SAKNAS'}`);
  await p3.close();
}
await browser.close();
server.close();
console.log(process.exitCode ? '✗ FEL — se ovan' : `✓ Klart: ${UT}`);
