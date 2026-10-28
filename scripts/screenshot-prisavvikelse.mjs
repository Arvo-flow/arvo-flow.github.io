#!/usr/bin/env node
// scripts/screenshot-prisavvikelse.mjs — REGEL 8 för fakturavyns besked vid en prisavvikelse (T-2, L-2).
//
// Svaret byggs som api/test-invoice bygger det vid `price_anomaly`: samma fält, och läget räknat av
// produktionens fakturaLage. Det enda som är stubbat är nätverket.
//
// KONTROLLER I DOM:EN (med motprov):
//   prisavvikelse → «Vi stoppade prissättningen», aldrig «inte tillräckligt säker på klassificeringen»,
//                   «modeller är oense», «licenspris vi läste» eller en leverantörs produkter; per plats
//                   (E5 + Copilot hos «Microsoft», och Adobe till listpris, båda mains tak) kallar talet
//                   kostnad delad med antal användare och säger att priset inte behöver vara fel; en radprövning
//                   nämner licensraden; ett svar utan prisprov (ska inte förekomma, cachen v32) får den
//                   mening som är sann för båda
//   motprov       → ett annat granskningsskäl (categorization_conflict) SKA fortfarande ge den generiska
//                   texten; annars bevisar kontrollerna bara att orden saknas i bygget.
// BLIND: nätverket är stubbat — att servern skickar `reason: 'price_anomaly'` bevisar LT-04 och koden i
//   api/test-invoice.mjs, inte den här sonden.
//
// Kör: npm run build && node scripts/screenshot-prisavvikelse.mjs

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fakturaLage } from '../lib/lagesregister.js';
import { RATTSTORLEK_FALT } from '../lib/rattstorleksfynd.js';

const ROT = new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = join(ROT, 'results/screenshots/prisavvikelse');
if (!existsSync(join(BUILD, 'index.html'))) { console.error('✗ build/ saknas — kör `npm run build` först.'); process.exit(1); }

const granskning = (reason, prisprov, supplier = 'Crayon AS', pricePerSeatMonthly = 5001.24) => {
  const rest = {
    ok: true, route: 'review_queue', reason, ...(prisprov !== undefined ? { prisprov } : {}),
    extracted: { supplier, date: '2026-10-01', amount: 50012, confidenceScore: 0.95, pricePerSeatMonthly },
  };
  return { ...rest, lage: fakturaLage(rest, { rattstorlekFalt: RATTSTORLEK_FALT }), leadFinding: null, forensicFindings: [], fyndSkal: null };
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
async function fakturavyn(bredd, svar) {
  const p = await browser.newPage({ viewport: { width: bredd, height: 1100 } });
  await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
  await p.route('**/api/token', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"token":"stub"}' }));
  await p.route('**/api/test-invoice', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(svar) }));
  p.on('pageerror', (e) => fel(`sidfel: ${String(e).slice(0, 160)}`));
  await p.goto(`${bas}/testa-faktura`, { waitUntil: 'networkidle' });
  await p.setInputFiles('input[type="file"]', join(ROT, 'test-pdfs/crayon-m365-azure.pdf'));
  await p.getByRole('button', { name: /Analysera fakturan/i }).first().click();
  await p.waitForSelector('text=/Vi stoppade prissättningen|behöver djupare analys/', { timeout: 45000 });
  await p.waitForTimeout(1500);   // kortets intoning, så att bilden visar det kunden ser
  return p;
}
const text = async (p) => (await p.innerText('body')).replace(/\s+/g, ' ');

for (const [bredd, namn] of [[390, 'mobil'], [1600, 'desktop']]) {
  const FALSKT = [/inte tillräckligt säker på klassificeringen/, /modeller är oense/, /licenspris vi läste/, /Copilot/, /Teams Phone/, /antalet licenser/];
  const PER_PLATS = [/delad med det antal användare vi läste på fakturan/, /Det behöver inte betyda att priset är fel/];
  for (const [fall, svar, maste, far] of [
    ['per-plats', granskning('price_anomaly', 'per_plats', 'Microsoft', 928), PER_PLATS, [/på en licensrad/]],
    ['per-plats-adobe', granskning('price_anomaly', 'per_plats', 'Adobe', 985), PER_PLATS, [/på en licensrad/]],
    ['rad', granskning('price_anomaly', 'rad'), [/Priset per licens på en licensrad är mer än dubbelt/], [/antal användare/]],
    ['utan-prisprov', granskning('price_anomaly'), [/Fakturans kostnad per licens eller användare ligger utanför/], [/på en licensrad/, /antal användare vi läste/]],
  ]) {
    const p = await fakturavyn(bredd, svar);
    const t = await text(p);
    if (!/Vi stoppade prissättningen/.test(t)) fel(`${fall}: saknar «Vi stoppade prissättningen» (${namn})`);
    if (!/Därför visar vi inga besparingssiffror/.test(t)) fel(`${fall}: saknar slutsatsen (${namn})`);
    for (const re of maste) if (!re.test(t)) fel(`${fall}: saknar ${re} (${namn})`);
    for (const re of [...FALSKT, ...far]) if (re.test(t)) fel(`${fall}: säger ${re} (${namn})`);
    await p.screenshot({ path: `${UT}/prisavvikelse-${fall}-${namn}.png`, fullPage: true }); await p.close();
  }

  // MOTPROV: ett annat skäl ger fortfarande den generiska texten.
  const p = await fakturavyn(bredd, granskning('categorization_conflict'));
  const t = await text(p);
  if (!/inte tillräckligt säker på klassificeringen/.test(t)) fel(`motprov: den generiska texten syns inte (${namn}) — kontrollerna mäter ingenting`);
  if (/Vi stoppade prissättningen/.test(t)) fel(`motprov: prisavvikelsens text läcker till ett annat skäl (${namn})`);
  await p.screenshot({ path: `${UT}/annat-skal-${namn}.png`, fullPage: true }); await p.close();
  console.log(`${namn}: kontroller körda`);
}
await browser.close(); server.close();
console.log(process.exitCode ? '✗ FEL — se ovan' : `✓ Klart: ${UT}`);
