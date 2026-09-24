#!/usr/bin/env node
// scripts/screenshot-lagesregister.mjs — REGEL 8 för Lägesregistret och avtalsklockan, i BÅDA ytorna.
//
// Varje tillstånd byggs av PRODUKTIONENS funktioner — radLage, rumLage (api/invoice-history byggRum),
// fakturaLage, contractClockFinding + planeradePaminnelser — aldrig handskrivna lägen. Det enda som
// är stubbat är nätverket.
//
// KONTROLLER I DOM:EN (med motprov):
//   rummet omätt   → aldrig «Vi jämförde 0 fakturor», «ni behöver inte göra något», «Allt är under kontroll»
//   rummet fynd    → aldrig «står sig»
//   raden 12 %     → «12 % över lägsta pris», aldrig «Rätt prissatt» / «på eller under»
//   raden bevakad  → aldrig «konkurrenskraftigt»
//   fakturavyn     → klockans sista dag, «Inte mätt» i stället för «Kritisk», roaming utan löfte
//   motprov        → rummet i ett mätt, bra läge SKA säga «står sig»
// BLIND: nätverket är stubbat — att servern skickar fälten bevisar SVK-01/04 och diag-live.
//
// Kör: CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/screenshot-lagesregister.mjs

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { radLage } from '../lib/lagesregister.js';
import { byggRum } from '../api/invoice-history.mjs';
import { fakturaLage } from '../lib/lagesregister.js';
import { RATTSTORLEK_FALT } from '../lib/rattstorleksfynd.js';
import { contractClockFinding, avtalsklocka } from '../lib/contract-clock.js';
import { planeradePaminnelser } from '../lib/paminnelse.js';

const ROT = new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = join(ROT, 'results/screenshots/lagesregister');
if (!existsSync(join(BUILD, 'index.html'))) { console.error('✗ build/ saknas — kör `npm run build` först.'); process.exit(1); }

const klocka = (slut, u, harEpost = true) => contractClockFinding({ servicePeriodEnd: slut, uppsagning: u, supplier: 'Telia',
  paminnelse: planeradePaminnelser(avtalsklocka({ servicePeriodEnd: slut, uppsagning: u }), { harEpost }) });
const pu = (pct) => ({ perEnhet: 3588 * (1 + pct / 100), golv: 3588, avstandPct: pct, underGolv: pct <= 0, unitLabel: 'per abonnemang/år',
  referensProdukt: 'Tele2 Bas', kallaDatum: '2026-09-01' });
const rad = (id, supplier, category, extra = {}) => {
  const a = { id, supplier, normalized_supplier: supplier, category, annual_cost: 48000, suggested_annual_cost: null, gross_saving: null,
    net_saving: null, should_switch: false, route: 'auto', created_at: `2026-09-2${id}T08:00:00Z`, ...extra };
  a.lage = radLage(a);
  return a;
};
const rumSvar = (analyses) => ({ ok: true, analyses, watched: [], rum: byggRum(analyses, []), branchAnchors: {}, movements: {}, email: 'e@exempel.se' });

const { detectForensicFindings } = await import('../lib/forensics.js');
const RUM = {
  omatt: rumSvar([
    rad(1, 'Telia', 'mobil', { prisunderlag: pu(12), arvoScore: null, contract_end_date: '2027-01-01',
      uppsagning_json: { uppsagningstidMan: 3 }, contractClock: klocka('2027-01-01', { uppsagningstidMan: 3 }) }),
    rad(2, 'Tele2', 'mobil', { route: 'monitoring', contract_end_date: '2027-08-01', contractClock: klocka('2027-08-01', null) }),
    rad(3, 'Fortnox', 'saas-finance'),
  ]),
  // Fyndet produceras av den riktiga detektorn (lib/forensics.js), inte skrivet för hand: en handskriven
  // fixtur bar förut texten «x», och bilden visade ett «x» under beloppet som såg ut som ett produktfel.
  fynd: rumSvar([rad(1, 'Telia', 'mobil', { lead_finding_json: detectForensicFindings(
    [{ type: 'recurring_subscription', description: 'Avbetalning iPhone 15 Pro, månad 38 av 36', quantity: 1, unitPrice: 1400, amount: 1400 }],
    { billingPeriod: 'monthly', fakturadatum: '2026-09-01' })[0] })]),
  // MOTPROV: ett mätt, bra läge SKA få beröm — annars bevisar kontrollerna bara att orden försvunnit.
  bra: rumSvar([rad(1, 'Telia', 'mobil', { prisunderlag: pu(-5), arvoScore: 90 })]),
};

const fakturaSvar = () => {
  const svar = {
    ok: true, route: 'auto',
    contractClock: klocka('2027-01-01', { uppsagningstidMan: 3 }),
    extracted: { supplier: 'Telia Sverige AB', amount: 4000, annualCost: 48000, recurringAmount: 2000, variableCharges: 2400,
      billingPeriod: 'monthly', recurring: true, confidenceScore: 0.95, notes: [], roamingZone: null,
      lineItems: [{ type: 'recurring_subscription', description: 'Mobil 10 st', amount: 2000 }] },
    categorized: { category: 'mobil', normalizedSupplier: 'Telia', confidence: 0.95, reasoning: 'Mobilabonnemang' },
    recommendation: { recommendationType: 'no_action', shouldSwitch: false, suggestedAnnualCost: null, netSaving: null,
      grossSaving: null, reasoning: 'Vi har inget verifierat jämförelsepris.', switchSteps: [] },
  };
  return { ...svar, lage: fakturaLage(svar, { rattstorlekFalt: RATTSTORLEK_FALT }) };
};

const bevakningsSvar = () => {
  const svar = {
    ok: true, route: 'monitoring', contractLocked: true, servicePeriodEnd: '2027-08-01', uppsagning: null,
    contractClock: klocka('2027-08-01', null),
    extracted: { supplier: 'Telia Sverige AB', amount: 4000, annualCost: 48000, recurringAmount: 4000, date: '2026-09-01',
      recurring: true, servicePeriodEnd: '2027-08-01' },
    categorized: { category: 'mobil', normalizedSupplier: 'Telia', confidence: 0.95, reasoning: 'Mobilabonnemang' },
    recommendation: { shouldSwitch: false, reasoning: '' },
  };
  return { ...svar, lage: fakturaLage(svar, { rattstorlekFalt: RATTSTORLEK_FALT }) };
};

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.map': 'application/json' };
const server = createServer(async (req, res) => {
  const bana = decodeURIComponent(req.url.split('?')[0]).replace(/^\/flow/, '') || '/';
  const fil = join(BUILD, bana);
  try {
    if (bana !== '/' && existsSync(fil) && extname(fil)) { res.writeHead(200, { 'Content-Type': MIME[extname(fil)] ?? 'application/octet-stream' }); return res.end(await readFile(fil)); }
    res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(await readFile(join(BUILD, 'index.html')));
  } catch (e) { res.writeHead(500); res.end(String(e.message)); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const bas = `http://127.0.0.1:${server.address().port}/flow`;
await mkdir(UT, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });

const fel = (m) => { console.error(`✗ ${m}`); process.exitCode = 1; };
async function sida(bredd, rum, faktura) {
  const p = await browser.newPage({ viewport: { width: bredd, height: 1100 } });
  await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
  await p.route('**/api/token', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"token":"stub"}' }));
  if (faktura) await p.route('**/api/test-invoice', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(faktura) }));
  if (rum) await p.route('**/api/invoice-history**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(rum) }));
  p.on('pageerror', (e) => fel(`sidfel: ${String(e).slice(0, 160)}`));
  return p;
}
const text = async (p) => (await p.innerText('body')).replace(/\s+/g, ' ');

for (const [bredd, namn] of [[390, 'mobil'], [1600, 'desktop']]) {
  // ── Rummet, omätt ──
  let p = await sida(bredd, RUM.omatt);
  await p.goto(`${bas}/portfolio?magic=stub`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  // Fäll ut raderna så att motiveringen syns.
  // En rad i taget, via namnet: en lista som läses en gång blir inaktuell när klicken ritar om sidan.
  for (const namnPaRad of ['Telia', 'Tele2', 'Fortnox']) {
    const h = p.locator('[aria-expanded="false"]', { hasText: namnPaRad }).first();
    if (await h.count()) await h.click({ timeout: 2000 });
  }
  await p.waitForTimeout(300);
  let t = await text(p);
  for (const re of [/Vi jämförde 0 fakturor/, /ni behöver inte göra något/i, /Allt är under kontroll/, /konkurrenskraftigt/, /Rätt prissatt/, /på eller under det billigaste/])
    if (re.test(t)) fel(`rummet omätt (${namn}) säger ${re}`);
  // Märket skrivs med versaler av CSS och innerText returnerar dem — jämför utan skiftläge.
  if (!/12 % över lägsta pris/i.test(t)) fel(`raden 12 % saknar sitt märke (${namn})`);
  if (!/Sista uppsägningsdag 1 oktober 2026/.test(t)) fel(`rummets klocka saknar sista uppsägningsdag (${namn})`);
  if (!/står inte på fakturan/.test(t)) fel(`det okända avtalet säger inte att uppsägningstiden är okänd (${namn})`);
  await p.screenshot({ path: `${UT}/rummet-omatt-${namn}.png`, fullPage: true }); await p.close();

  // ── Rummet, fynd ──
  p = await sida(bredd, RUM.fynd);
  await p.goto(`${bas}/portfolio?magic=stub`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  t = await text(p);
  if (/står sig/.test(t)) fel(`rummet i fyndläget säger «står sig» (${namn})`);
  if (!/16\s800 kr\/år/.test(t)) fel(`fyndet syns inte (${namn})`);
  await p.screenshot({ path: `${UT}/rummet-fynd-${namn}.png`, fullPage: true }); await p.close();

  // ── MOTPROV: rummet, mätt och bra ──
  p = await sida(bredd, RUM.bra);
  await p.goto(`${bas}/portfolio?magic=stub`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  t = await text(p);
  if (!/står sig/.test(t)) fel(`motprov: ett mätt, bra rum säger inte att priserna står sig (${namn}) — kontrollerna mäter ingenting`);
  await p.close();

  // ── Fakturavyn: klocka i öppet fönster, omätt poäng, okänd roamingzon ──
  p = await sida(bredd, null, fakturaSvar());
  await p.goto(`${bas}/testa-faktura`, { waitUntil: 'networkidle' });
  await p.setInputFiles('input[type="file"]', join(ROT, 'test-pdfs/telia.pdf'));
  await p.getByRole('button', { name: /Analysera fakturan/i }).first().click();
  await p.waitForSelector('text=/Sista uppsägningsdag/', { timeout: 45000 });
  try { await p.getByRole('button', { name: /Hur vi räknar/i }).first().click({ timeout: 5000 }); } catch { /* inget underlag */ }
  t = await text(p);
  if (/Kritisk/.test(t)) fel(`fakturavyn märker en omätt poäng «Kritisk» (${namn})`);
  if (!/sista dagen att säga upp är 1 oktober 2026/.test(t)) fel(`fakturavyns klocka saknar sista dagen (${namn})`);
  if (/bättre EU-datapaket/.test(t)) fel(`roaming med okänd zon lovar ett operatörsbyte (${namn})`);
  if (!/Zonen framgår inte av fakturan/.test(t)) fel(`roaming med okänd zon säger inte att zonen är okänd (${namn})`);
  await p.screenshot({ path: `${UT}/fakturavyn-${namn}.png`, fullPage: true }); await p.close();

  // ── Fakturavyn, bevakningsläget: här ritas poängmätaren — en omätt poäng ska heta «Inte mätt» ──
  p = await sida(bredd, null, bevakningsSvar());
  await p.goto(`${bas}/testa-faktura`, { waitUntil: 'networkidle' });
  await p.setInputFiles('input[type="file"]', join(ROT, 'test-pdfs/telia.pdf'));
  await p.getByRole('button', { name: /Analysera fakturan/i }).first().click();
  await p.waitForSelector('text=/Bevakning aktiverad/i', { timeout: 45000 });
  t = await text(p);
  if (/Kritisk/.test(t)) fel(`bevakningsvyn märker en omätt poäng «Kritisk» (${namn})`);
  if (!/Inte mätt/i.test(t)) fel(`bevakningsvyn saknar «Inte mätt» (${namn})`);
  if (!/står inte på fakturan/.test(t)) fel(`bevakningsvyn säger inte att uppsägningstiden är okänd (${namn})`);
  if (/har redan passerat|påminner er/i.test(t)) fel(`bevakningsvyn bär ett gammalt egenräknat löfte (${namn})`);
  await p.screenshot({ path: `${UT}/bevakningsvyn-${namn}.png`, fullPage: true }); await p.close();
  console.log(`${namn}: kontroller körda`);
}
await browser.close(); server.close();
console.log(process.exitCode ? '✗ FEL — se ovan' : `✓ Klart: ${UT}`);
