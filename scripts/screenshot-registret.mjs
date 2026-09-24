#!/usr/bin/env node
// scripts/screenshot-registret.mjs — REGEL 8 för registergranskningen 2026-09-24.
//
// Rummet med kohortkort, marknadsrörelse och prognos — byggt av PRODUKTIONENS producenter
// (byggRum, radLage, marketMovementFinding, priceHikeForecast); bara nätverket är stubbat.
//
// KONTROLLER I DOM:EN:
//   rummet      → aldrig ett räknat tal följt av «bolag», aldrig «Köade ett motdrag», «resten av boken»,
//                 «förberett/köat motdrag», «vad vi gjort åt det»; kohortens enhet är KOHORT_ENHET
//   landningen  → aldrig «verifierat marknadspris» eller «motdraget ligger klart/färdigt/förberett»
// MOTPROV: kör mot ett bygge före ändringen — då står «N bolag · live» och «Köade ett motdrag» kvar.
//
// Kör: CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/screenshot-registret.mjs
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { radLage } from '../lib/lagesregister.js';
import { byggRum } from '../api/invoice-history.mjs';
import { marketMovementFinding } from '../lib/market-movement.js';
import { priceHikeForecast } from '../lib/price-forecast.js';
import { KOHORT_ENHET, LOFTEN } from '../lib/kundmeningar.js';

const ROT = new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = join(ROT, 'results/screenshots/registret');
if (!existsSync(join(BUILD, 'index.html'))) { console.error('✗ build/ saknas — kör `npm run build` först.'); process.exit(1); }

const IDAG = new Date();
const rad = (id, supplier, category, extra = {}) => {
  const a = { id, supplier, normalized_supplier: supplier, category, annual_cost: 48000, suggested_annual_cost: null, gross_saving: null,
    net_saving: null, should_switch: false, route: 'auto', created_at: new Date(IDAG - id * 864e5).toISOString(), ...extra };
  a.lage = radLage(a);
  return a;
};
const analyses = [rad(1, 'telia', 'mobil'), rad(2, 'fortnox', 'saas-finance')];
const forsta = (m) => new Date(IDAG.getUTCFullYear() - m, 1, 15).toISOString();
const RUM = {
  ok: true, analyses, watched: [], rum: byggRum(analyses, []), branchAnchors: {}, email: 'e@exempel.se',
  cohort: { 'telia|mobil': { supplierDataPoints: 7, supplierMedian: 42000, supplierP25: 36000 } },
  movements: { mobil: marketMovementFinding({ changedAt: new Date(IDAG - 20 * 864e5).toISOString(), oldMonthly: 299, newMonthly: 319 },
    { total: 12, withSupplier: 5 }, { supplier: 'Telia', categoryLabel: 'mobil', today: IDAG }) },
  forecasts: { 'saas-finance': { ...priceHikeForecast([1, 2, 3].map((m) => ({ changed_at: forsta(m), old_price_monthly: 100, new_price_monthly: 106 })),
    { supplier: 'Fortnox', today: IDAG }), category: 'saas-finance' } },
};
if (!RUM.movements.mobil || !RUM.forecasts['saas-finance'].title) { console.error('✗ fixturens producenter gav null — sonden prövar inget'); process.exit(1); }

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
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
const ok = (m) => console.log(`✓ ${m}`);
const text = async (p) => (await p.innerText('body')).replace(/\s+/g, ' ');
const RUMFEL = [/\d+\s+bolag\b/i, /Köade ett motdrag/, /resten av boken|hela reskontran/i, /många bolags/, /(förberedda?|köat|klart|färdigt)\s+motdrag|motdraget (ligger )?(klart|färdigt|förberett|köat)/i, /vad vi gjort åt det/, /verifierat marknadspris/i];

for (const bredd of [390, 1600]) {
  let p = await browser.newPage({ viewport: { width: bredd, height: 1000 } });
  await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
  await p.route('**/api/invoice-history**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(RUM) }));
  p.on('pageerror', (e) => fel(`sidfel: ${String(e).slice(0, 160)}`));
  await p.goto(`${bas}/portfolio?magic=stub`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  let t = await text(p);
  await p.screenshot({ path: join(UT, `rummet-${bredd}.png`), fullPage: true });
  const traff = RUMFEL.filter((re) => re.test(t)).map((re) => t.match(re)[0]);
  if (traff.length) fel(`rummet ${bredd}px: ${traff.join(' | ')}`);
  else if (!t.includes(`7 ${KOHORT_ENHET}`)) fel(`rummet ${bredd}px: kohortkortet syns inte med registrets enhet — sonden prövar inget`);
  else if (!t.includes(LOFTEN.premiumutskick.text)) fel(`rummet ${bredd}px: pitchen bär inte LOFTEN.premiumutskick`);
  else ok(`rummet ${bredd}px: kohort i «${KOHORT_ENHET}», rörelse och prognos utan köat motdrag, pitch ur registret`);
  await p.close();

  p = await browser.newPage({ viewport: { width: bredd, height: 1000 } });
  await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
  await p.goto(`${bas}/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });
  await p.waitForTimeout(600);
  t = await text(p);
  await p.screenshot({ path: join(UT, `landning-${bredd}.png`), fullPage: false });
  const lt = RUMFEL.filter((re) => re.test(t)).map((re) => t.match(re)[0]);
  if (lt.length) fel(`landningen ${bredd}px: ${lt.join(' | ')}`);
  else if (!/verifierat publikt listpris/i.test(t)) fel(`landningen ${bredd}px: proveniensen syns inte — sonden prövar inget`);
  else ok(`landningen ${bredd}px: listpris som proveniens, inget förberett motdrag`);
  await p.close();
}
await browser.close(); server.close();
