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
//   mobil + byte → en mobilrad lagrad med byte till 269-planen (C1-1): inget «% mer», inget «Ni behåller»,
//                  ingen bytesrekommendation och ingen poäng; raden säger «Nivå ej bekräftad»
//   mobil + lön  → 100 abonnemang och en lönerad (C1-2): «Ingen samlad poäng», «kan inte bedöma alla» och
//                  «1 av 2 fakturor prissatta»; aldrig «Allt är under kontroll», «Era priser står sig»
//                  eller «Bättre än listpris»
//   mobil + bredbandsbyte → bytet prissatt, aldrig «0 av N fakturor», «Vägde 0» eller «inget verifierat
//                  jämförelsepris» (D1-2, E1-1)
//   kombinerad   → K3 (mobil på golvet + bredband): bredbandsbytet 2 976 kr/år står kvar och raden säger att
//                  det gäller bredbandet; aldrig «Inget byte rekommenderas», «Inga byten på bordet», «% mer»
//                  eller «kan inte skilja ut» (F1-2)
//   mobil + elbyte → elbytet kallas aldrig prissatt mot verifierat listpris (F1-1)
//   motprov      → IT-8821 (två nivåer) SKA behålla sitt byte (D1-1); en M365-rad med E3 i radtexten SKA
//                  få «Listpris för er nivå» och ett avstånd, ett
//                  rum med löneadministration SKA få Marknadsankaret och en poäng, och en M365-rad med
//                  byte SKA få bytet
// BLIND: nätverket är stubbat; att servern skickar raderna så bevisar MS-01 och SVK, inte sonden.
//
// Kör: npm run build && node scripts/screenshot-mobilscore.mjs
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { buildBranchAnchors, berikaRader, byggRum } from '../api/invoice-history.mjs';
import { readFileSync } from 'node:fs';

const ROT = new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = join(ROT, 'results/screenshots/mobilscore');
if (!existsSync(join(BUILD, 'index.html'))) { console.error('✗ build/ saknas — kör `npm run build` först.'); process.exit(1); }

const rad = (id, supplier, category, annualCost, seats, rader = [], byteTill = null) => ({
  id, supplier, normalized_supplier: supplier, category, route: 'auto', annual_cost: annualCost, seat_count: seats,
  suggested_annual_cost: byteTill, gross_saving: byteTill ? annualCost - byteTill : null,
  net_saving: byteTill ? Math.round((annualCost - byteTill) * 0.8) : null, should_switch: byteTill != null,
  created_at: `2026-11-${String(id).padStart(2, '0')}T08:00:00Z`, _rader: rader,
});
const E3 = (pris) => [{ description: 'Microsoft 365 E3', type: 'recurring_subscription', quantity: 10, unitPrice: pris, amount: pris * 10 }];
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
  mobilByte: await rumSvar([rad(4, 'Tele2', 'mobil', 349 * 12 * 10, 10, [], 269 * 12 * 10)]),
  mobilLon: await rumSvar([rad(5, 'Tele2', 'mobil', 349 * 12 * 100, 100), rad(6, 'Fortnox', 'loneadmin', 5000, 10)]),
  m365Byte: await rumSvar([rad(7, 'Microsoft', 'saas-productivity', 600 * 12 * 10, 10, E3(600), 416.77 * 12 * 10)]),
  mobilBredband: await rumSvar([rad(8, 'Tele2', 'mobil', 349 * 12 * 10, 10), rad(9, 'Telia', 'bredband', 599 * 12, 1, [], 399 * 12)]),
  kombi: await rumSvar([{ ...rad(11, 'Tele2', 'mobil', (1345 + 549) * 12, 5, [
    { type: 'recurring_subscription', description: 'Tele2 Jobbmobil Bas (5 st)', quantity: 5, unitPrice: 269, amount: 1345 },
    { type: 'recurring_subscription', description: 'Bredband 250/250 Mbit/s', amount: 549 }], (1345 + 549) * 12 - 3720),
    gross_saving: 3720, net_saving: 2976 }]),
  mobilEl: await rumSvar([rad(12, 'Tele2', 'mobil', 349 * 12 * 10, 10), rad(13, 'Fortum', 'el', 40000, 1, [], 34000)]),
  it8821: await (async () => {
    const it = JSON.parse(readFileSync(join(ROT, 'tests/fixtures/it-8821-ms365.json'), 'utf8'));
    return rumSvar([rad(10, 'IT-Partner', 'saas-productivity', it.annualCost, it.seatCount, it.lineItems, it.expected.suggestedAnnualCost)]);
  })(),
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
  for (const namn of ['Tele2', 'Microsoft', 'IT-Partner', 'Fortum', 'Telia']) {
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
  if (!/Arvo Score .{0,40}?\d{1,3} ?\/ ?100/i.test(t)) fel(`motprov: rummet med löneadministration saknar en poäng (${namn})`);
  await p.close();

  // C1-1: en mobilrad lagrad med byte. Etiketterna är versaler i DOM:en, därav /i.
  p = await sida(bredd, RUM.mobilByte);
  t = await text(p);
  if (!/Nivå ej bekräftad/i.test(t)) fel(`mobil med byte saknar «Nivå ej bekräftad» (${namn})`);
  if (!/räknade fram ett byte\. Det visar vi inte här/i.test(t)) fel(`mobil med byte säger inte varför bytet saknas (${namn})`);
  for (const re of [/% mer/i, /Ni behåller/i, /möjlig nettobesparing/i, /rekommenderar byte/i, /Vakten · ett drag kvar/i,
    /Samma nivå kostar/i, /Arvo Score .{0,40}?\d{1,3} ?\/ ?100/i, /kan skärpas/i])
    if (re.test(t)) fel(`mobil med byte säger ${re} (${namn})`);
  await p.screenshot({ path: `${UT}/mobil-byte-${namn}.png`, fullPage: true }); await p.close();

  // C1-2: ett rum där den mesta kostnaden är omätt berömmer inte.
  p = await sida(bredd, RUM.mobilLon);
  t = await text(p);
  for (const re of [/Ingen samlad poäng/i, /1 av 2 fakturor prissatta/i, /kan inte bedöma allt ni betalar/i])
    if (!re.test(t)) fel(`mobil + lön saknar ${re} (${namn})`);
  for (const re of [/Allt är under kontroll/i, /Era priser står sig/i, /Bättre än listpris/i, /Lugnet att ni ligger rätt/i,
    /Arvo Score .{0,40}?\d{1,3} ?\/ ?100/i, /inget verifierat jämförelsepris/i, /kunde inte mätas/i])
    if (re.test(t)) fel(`mobil + lön säger ${re} (${namn})`);
  await p.screenshot({ path: `${UT}/mobil-lon-${namn}.png`, fullPage: true }); await p.close();

  // D1-2: en obekräftad mobilrad och ett bredbandsbyte. Bytet bär domen.
  p = await sida(bredd, RUM.mobilBredband);
  t = await text(p);
  if (!/1 av 2 fakturor prissatta mot publika listpriser/i.test(t)) fel(`mobil + bredbandsbyte saknar «1 av 2 fakturor prissatta» (${namn})`);
  for (const re of [/\b0 av \d+ fakturor/i, /inget verifierat jämförelsepris/i, /Vägde 0 fakturor/i, /\b0 prissatta/i])
    if (re.test(t)) fel(`mobil + bredbandsbyte säger ${re} (${namn})`);
  await p.screenshot({ path: `${UT}/mobil-bredband-${namn}.png`, fullPage: true }); await p.close();

  // Motprov (D1-1): IT-8821 med två nivåer behåller sitt like-for-like-byte.
  p = await sida(bredd, RUM.it8821);
  t = await text(p);
  if (!/Ni behåller/i.test(t) && !/möjlig nettobesparing/i.test(t)) fel(`motprov: IT-8821 saknar bytet (${namn})`);
  if (/räknade fram ett byte/i.test(t)) fel(`motprov: IT-8821 får mobilens förklaring (${namn})`);
  // E1-1 och E1-5: bytesraden är prissatt och säger inte emot sitt byte.
  for (const re of [/Vägde 0 fakturor/i, /\b0 prissatta/i, /Vi sätter varken avstånd eller poäng här/i])
    if (re.test(t)) fel(`IT-8821 säger ${re} (${namn})`);
  if (!/säger vi inget om/i.test(t)) fel(`IT-8821 saknar bytesradens underlag (${namn})`);
  for (const re of [/räknat mot listpriset för det som står på fakturan/i, /\d+% mer/i])
    if (re.test(t)) fel(`IT-8821 säger ${re} (${namn})`);
  await p.screenshot({ path: `${UT}/it8821-${namn}.png`, fullPage: true }); await p.close();

  // F1-2: en kombinerad faktura behåller bredbandsdelen.
  p = await sida(bredd, RUM.kombi);
  t = await text(p);
  for (const re of [/Bytet gäller bredbandet på fakturan/i, /2 976/])
    if (!re.test(t)) fel(`kombinerad saknar ${re} (${namn})`);
  for (const re of [/Inget byte rekommenderas/i, /Inga byten på bordet/i, /\d+% mer/i, /kan inte skilja ut/i, /Vägde 0 fakturor/i,
    /Arvo Score .{0,40}?\d{1,3} ?\/ ?100/i])
    if (re.test(t)) fel(`kombinerad säger ${re} (${namn})`);
  await p.screenshot({ path: `${UT}/kombi-${namn}.png`, fullPage: true }); await p.close();

  // F1-1: ett elbyte är Arvos bedömning, inte ett verifierat publikt listpris.
  p = await sida(bredd, RUM.mobilEl);
  t = await text(p);
  for (const re of [/Vägde 1 faktura/i, /Vi jämförde 1 faktura/i, /kan skärpas mot verifierat listpris/i,
    /grundat på era bytesmål · publika listpriser/i, /\b1 prissatt/i])
    if (re.test(t)) fel(`mobil + el säger ${re} (${namn})`);
  if (!/bytena står på raderna/i.test(t)) fel(`mobil + el saknar «bytena står på raderna» (${namn})`);
  await p.screenshot({ path: `${UT}/mobil-el-${namn}.png`, fullPage: true }); await p.close();

  // Motprov: en M365-rad med bekräftad nivå och byte behåller bytet.
  p = await sida(bredd, RUM.m365Byte);
  t = await text(p);
  if (!/Ni behåller/i.test(t) && !/möjlig nettobesparing/i.test(t)) fel(`motprov: M365 med byte saknar bytet (${namn}) — kontrollerna mäter ingenting`);
  await p.close();
  console.log(`${namn}: kontroller körda`);
}
await browser.close(); server.close();
console.log(process.exitCode ? '✗ FEL — se ovan' : `✓ Klart: ${UT}`);
