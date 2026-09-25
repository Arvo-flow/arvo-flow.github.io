#!/usr/bin/env node
// scripts/screenshot-intag.mjs — REGEL 8 för rummets egen adress, guiden, Gmail-koden och intagsflödet.
//
// Svaren byggs av PRODUKTIONENS funktioner (byggRum, radLage, adressStatus, byggIntag); bara nätverket stubbas.
// KONTROLLER I DOM:EN:
//   A · tomt rum under intag, Google Workspace avkänd → egen adress (aldrig faktura@), Gmail-stegen,
//       «Väntar på Gmails bekräftelsekod», flödet med «Läses…»
//   B · fyllt rum, koden har landat → koden syns, flödet visar «Telia · 12 rader · Prissatt»
// MOTPROV: kör mot bygget före ändringen — då står faktura@inbox.arvoflow.se och inget flöde syns.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { radLage } from '../lib/lagesregister.js';
import { byggRum } from '../api/invoice-history.mjs';
import { adressStatus } from '../lib/inkorgsadress.js';
import { byggIntag } from '../lib/intagstelemetri.js';

const ROT = new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = join(ROT, 'results/screenshots/intag');
if (!existsSync(join(BUILD, 'index.html'))) { console.error('✗ build/ saknas'); process.exit(1); }

const NYCKEL = 'abcdefghjkmnpq23';
const nu = Date.now();
const rad = (id, supplier, category, extra = {}) => {
  const a = { id, supplier, normalized_supplier: supplier, category, annual_cost: 48000, suggested_annual_cost: null, gross_saving: null,
    net_saving: null, should_switch: false, route: 'auto', created_at: new Date(nu - 3600e3).toISOString(), ...extra };
  a.lage = radLage(a);
  return a;
};
const telia = rad('11111111-aaaa', 'Telia', 'mobil', { line_items_json: Array.from({ length: 12 }, (_, i) => ({ i })) });
const jobbA = [
  { filename: 'telia-sep.pdf', status: 'processing', outcome: null },
  { filename: 'fortnox-sep.pdf', status: 'pending', outcome: null },
  { filename: 'adobe-sep.pdf', status: 'pending', outcome: null },
];
const jobbB = [
  { filename: 'telia-sep.pdf', status: 'done', outcome: 'auto:mobil·lagrad#11111111-aaaa' },
  { filename: 'larm-sep.pdf', status: 'done', outcome: 'unsupported:larm-bevakning' },
  { filename: 'skannad.pdf', status: 'failed', outcome: null },
];
const svar = (analyses, jobb, inkorgRad) => {
  const intag = byggIntag(jobb, analyses);
  return { ok: true, analyses, watched: [], rum: byggRum(analyses, []), branchAnchors: {}, movements: {}, email: undefined,
    ingesting: intag.vantar + intag.lases, ingestFailed: intag.fallna, ingestFailedFiles: [], intag, inkorg: adressStatus(inkorgRad) };
};
const LAGEN = {
  A: { hist: svar([], jobbA, { nyckel: NYCKEL, plattform: 'google_workspace' }) },
  B: { hist: svar([telia], jobbB, { nyckel: NYCKEL, plattform: 'gmail', gmail_kod: '482913650', gmail_kod_at: new Date(nu - 60e3).toISOString() }) },
};

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
const ADRESS = `faktura+${NYCKEL}@inbox.arvoflow.se`;

for (const bredd of [390, 1600]) {
  for (const [namn, l] of Object.entries(LAGEN)) {
    const p = await browser.newPage({ viewport: { width: bredd, height: 1000 } });
    await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
    await p.route('**/api/inkorgsadress**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, adress: l.hist.inkorg }) }));
    await p.route('**/api/invoice-history**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(l.hist) }));
    p.on('pageerror', (e) => fel(`sidfel: ${String(e).slice(0, 160)}`));
    await p.goto(`${bas}/portfolio`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
    const t = await text(p);
    // Text som skärs av: en förälder med overflow:hidden gör att sidan inte scrollar — scrollWidth ser då
    // ingenting (mätt: motprovet med gamla chip-CSS:en gav grönt). Mät i stället varje element som bär egen
    // text: dess högerkant ska ligga innanför skärmen.
    const utanfor = await p.evaluate((w) => [...document.querySelectorAll('body *')]
      .filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
      .filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > w + 1; })
      .map((e) => e.textContent.trim().slice(0, 40)), bredd);
    if (utanfor.length) fel(`${namn} ${bredd}px: ${utanfor.length} textelement skärs av vid högerkanten, t.ex. «${utanfor[0]}»`);
    await p.screenshot({ path: join(UT, `${namn}-${bredd}.png`), fullPage: true });
    const krav = namn === 'A'
      ? [[ADRESS, 'egen adress'], ['Vidarebefordran och POP/IMAP', 'Gmail-stegen'], ['Väntar på Gmails bekräftelsekod', 'väntar på koden'], ['Läses…', 'flödet läser'], ['telia-sep.pdf', 'filen i flödet']]
      : [[ADRESS, 'egen adress'], ['482913650', 'koden'], ['Telia · 12 rader · Prissatt', 'klar fil med detaljer'], ['Utanför vårt område', 'triagerad dom'], ['Föll', 'fallen fil']];
    const saknas = krav.filter(([s]) => !t.includes(s)).map(([, n]) => n);
    if (t.includes('faktura@inbox.arvoflow.se')) fel(`${namn} ${bredd}px: den gemensamma adressen syns i stället för rummets`);
    else if (saknas.length) fel(`${namn} ${bredd}px saknar: ${saknas.join(', ')}`);
    else ok(`${namn} ${bredd}px: ${krav.map(([, n]) => n).join(' · ')}`);
    await p.close();
  }
}
await browser.close(); server.close();
