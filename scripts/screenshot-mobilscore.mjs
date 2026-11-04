#!/usr/bin/env node
// scripts/screenshot-mobilscore.mjs — REGEL 8 för mobilscoren i rummet (grundarbeslut 2026-10-22).
//
// Rummet byggs av produktionens funktioner: buildBranchAnchors → berikaRader → byggRum. Det enda som är
// stubbat är nätverket.
//
// KONTROLLER I DOM:EN (med motprov):
//   mobil 349    → «Nivå ej bekräftad», «säger inget om avståndet», medianen som «Näst billigaste
//                  publicerade abonnemang»; aldrig «% över lägsta pris», «Samma licens utan bindning»,
//                  «Rätt prissatt», «Dela avtalet», «tio gånger», «Marknadsankaret» eller «leverantörens
//                  eget listpris»; innehavet säger «1 mottagen, inte prissatt», aldrig «1 prissatt»
//   motprov      → en M365-rad med E3 i radtexten SKA få «Listpris för er nivå» och ett avstånd, och ett
//                  rum med löneadministration SKA få Marknadsankaret
// BLIND: nätverket är stubbat; att servern skickar raderna så bevisar MS-01 och SVK, inte sonden.
//
// Kör: npm run build && node scripts/screenshot-mobilscore.mjs
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { buildBranchAnchors, berikaRader, byggRum } from '../api/invoice-history.mjs';

const ROT = new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = join(ROT, 'results/screenshots/mobilscore');
if (!existsSync(join(BUILD, 'index.html'))) { console.error('✗ build/ saknas — kör `npm run build` först.'); process.exit(1); }

const rad = (id, supplier, category, annualCost, seats, rader = []) => ({
  id, supplier, normalized_supplier: supplier, category, route: 'auto', annual_cost: annualCost, seat_count: seats,
  suggested_annual_cost: null, gross_saving: null, net_saving: null, should_switch: false,
  created_at: `2026-11-0${id}T08:00:00Z`, _rader: rader,
});
async function rumSvar(analyses) {
  const branchAnchors = await buildBranchAnchors(analyses);
  const berikade = berikaRader(analyses, branchAnchors);
  return { ok: true, analyses: berikade, watched: [], rum: byggRum(berikade, []), branchAnchors, movements: {}, email: 'e@exempel.se' };
}
const RUM = {
  mobil: await rumSvar([rad(1, 'Tele2', 'mobil', 349 * 12 * 10, 10)]),
  m365: await rumSvar([rad(2, 'Microsoft', 'saas-productivity', 500 * 12 * 10, 10,
    [{ description: 'Microsoft 365 E3', type: 'recurring_subscription', quantity: 10, unitPrice: 500, amount: 5000 }])]),
  lon: await rumSvar([rad(3, 'Fortnox', 'loneadmin', 6000, 10)]),
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
async function sida(bredd, rum) {
  const p = await browser.newPage({ viewport: { width: bredd, height: 1100 } });
  await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
  await p.route('**/api/token', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"token":"stub"}' }));
  await p.route('**/api/invoice-history**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(rum) }));
  p.on('pageerror', (e) => fel(`sidfel: ${String(e).slice(0, 160)}`));
  await p.goto(`${bas}/portfolio?magic=stub`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  for (const namn of ['Tele2', 'Microsoft']) {
    const h = p.locator('[aria-expanded="false"]', { hasText: namn }).first();
    if (await h.count()) await h.click({ timeout: 2000 });
  }
  await p.waitForTimeout(400);
  return p;
}
const text = async (p) => (await p.innerText('body')).replace(/\s+/g, ' ');

for (const [bredd, namn] of [[390, 'mobil'], [1600, 'desktop']]) {
  let p = await sida(bredd, RUM.mobil);
  let t = await text(p);
  for (const re of [/Nivå ej bekräftad/i, /säger inget om avståndet/, /Näst billigaste publicerade abonnemang/, /1 mottagen, inte prissatt/i])
    if (!re.test(t)) fel(`mobil saknar ${re} (${namn})`);
  for (const re of [/% över lägsta pris/i, /Samma licens utan bindning/, /Rätt prissatt/i, /Dela avtalet/i, /tio gånger/, /% över det billigaste/,
    /Marknadsankaret/i, /leverantörens eget listpris/, /1 prissatt leverantör/i, /Vägde 1 faktura/, /Den jämförelsen kommer/])
    if (re.test(t)) fel(`mobil säger ${re} (${namn})`);
  await p.screenshot({ path: `${UT}/mobil-${namn}.png`, fullPage: true }); await p.close();

  p = await sida(bredd, RUM.m365);
  t = await text(p);
  if (!/Listpris för er nivå/.test(t)) fel(`motprov: M365 med nivå saknar «Listpris för er nivå» (${namn})`);
  if (!/% över/.test(t)) fel(`motprov: M365 med nivå saknar ett avstånd (${namn}) — kontrollerna mäter ingenting`);
  if (!/Den jämförelsen kommer/.test(t)) fel(`motprov: M365 med nivå saknar «Den jämförelsen kommer» (${namn})`);
  await p.screenshot({ path: `${UT}/m365-${namn}.png`, fullPage: true }); await p.close();

  p = await sida(bredd, RUM.lon);
  t = await text(p);
  if (!/Marknadsankaret/i.test(t)) fel(`motprov: rummet med löneadministration saknar Marknadsankaret (${namn}) — kontrollen mäter ingenting`);
  await p.close();
  console.log(`${namn}: kontroller körda`);
}
await browser.close(); server.close();
console.log(process.exitCode ? '✗ FEL — se ovan' : `✓ Klart: ${UT}`);
