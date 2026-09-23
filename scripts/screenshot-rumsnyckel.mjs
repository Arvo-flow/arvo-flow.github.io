#!/usr/bin/env node
// scripts/screenshot-rumsnyckel.mjs — REGEL 8 för rumsnyckeln (2026-09-23).
//
// Kör det BYGGDA paketet i Chromium och mäter vad klienten faktiskt skickar:
//   1. rummet öppnat anonymt skickar en nyckel i serverns format (32 hex)
//   2. samma webbläsare skickar SAMMA nyckel efter omladdning (den sparas)
//   3. en ANNAN webbläsarprofil med exakt samma konfiguration får en ANNAN nyckel — det är
//      skillnaden mot fingeravtrycket, där två likadana datorer delade rum
//   4. fakturavyns uppladdning skickar samma nyckel som rummet läser med
//   5. rummet renderas (390 + 1600 px) när servern nekar en gammal nyckel — ärligt felläge, ingen krasch
// Motprov för (3): instrumentet måste kunna se lika nycklar — det gör det i (2).
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROT = new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = join(ROT, 'results/screenshots/rumsnyckel');
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
const ok = (m) => console.log(`✓ ${m}`);
const RE = /^[0-9a-f]{32}$/;

async function rumsnyckelFran(context, { neka = false } = {}) {
  const p = await context.newPage();
  let nyckel = null;
  await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
  await p.route('**/api/invoice-history**', (r) => {
    nyckel = new URL(r.request().url()).searchParams.get('fingerprint');
    return neka
      ? r.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: 'rumsnyckel_ogiltig', message: 'Rummet kan inte öppnas med den här nyckeln. Öppna det via länken i ert mejl.' }) })
      : r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ analyses: [], rum: null }) });
  });
  p.on('pageerror', (e) => fel(`sidfel: ${String(e).slice(0, 160)}`));
  await p.goto(`${bas}/portfolio`, { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  return { p, nyckel };
}

const ctxA = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
const a1 = await rumsnyckelFran(ctxA);
RE.test(a1.nyckel ?? '') ? ok(`1. rummet skickar en rumsnyckel i serverns format (${a1.nyckel.slice(0, 6)}…)`) : fel(`1. nyckeln har fel format: ${a1.nyckel}`);
const a2 = await rumsnyckelFran(ctxA);
a2.nyckel === a1.nyckel ? ok('2. samma webbläsare → samma nyckel efter omladdning (motprov: instrumentet ser lika nycklar)') : fel('2. nyckeln sparas inte');
const ctxB = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
const b1 = await rumsnyckelFran(ctxB);
b1.nyckel && b1.nyckel !== a1.nyckel ? ok('3. identiskt konfigurerad webbläsare → EGEN nyckel') : fel('3. två likadana webbläsare delar nyckel');

// 4 · fakturavyns uppladdning ska bära samma nyckel som rummet läser med.
{
  const p = await ctxA.newPage();
  let skickad = null;
  await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"token":"stub"}' }));
  await p.route('**/api/test-invoice', (r) => { try { skickad = JSON.parse(r.request().postData() ?? '{}').fingerprint; } catch {}
    return r.fulfill({ status: 500, contentType: 'application/json', body: '{"error":"sond"}' }); });
  await p.goto(`${bas}/testa-faktura`, { waitUntil: 'networkidle' });
  const pdf = await readFile(join(ROT, 'test-pdfs/diag-bredband.pdf'));
  const input = await p.$('input[type=file]');
  if (!input) fel('4. hittade inget filfält i fakturavyn');
  else {
    await input.setInputFiles({ name: 'sond.pdf', mimeType: 'application/pdf', buffer: pdf });
    await p.waitForTimeout(500);
    const knapp = p.getByRole('button', { name: /Analysera fakturan/ });
    if (await knapp.count()) await knapp.first().click({ force: true }).catch(() => {});
    await p.waitForTimeout(2500);
    skickad === a1.nyckel ? ok('4. fakturavyns uppladdning bär rummets nyckel') : fel(`4. uppladdningen skickade ${skickad} — rummet läser ${a1.nyckel}`);
  }
}

// 5 · servern nekar (gammal nyckel i en gammal flik) — rummet ska visa ett ärligt felläge.
for (const [bredd, namn] of [[390, 'mobil'], [1600, 'desktop']]) {
  const ctx = await browser.newContext({ viewport: { width: bredd, height: 1000 } });
  const { p } = await rumsnyckelFran(ctx, { neka: true });
  const t = (await p.innerText('body')).replace(/\s+/g, ' ');
  /mejl/i.test(t) ? ok(`5. ${namn}: nekad nyckel visar vägen via mejlet`) : fel(`5. ${namn}: nekad nyckel — sidan säger inte vad kunden ska göra: «${t.slice(0, 160)}»`);
  await p.screenshot({ path: join(UT, `rum-nekad-${namn}.png`), fullPage: true });
}

await browser.close(); server.close();
