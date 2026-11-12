#!/usr/bin/env node
// scripts/screenshot-planvalsgrind.mjs — REGEL 8 för S1 i fakturavyn (ops/KORPLAN-VAG1.md).
//
// Svaren kommer ur HANDLERN, inte ur en handbyggd fixtur: tests/fakturakedjan/kor.mjs kör api/test-invoice.mjs
// med bara nätverket stubbat (samma laddarkrok som instrument A), och sidan får exakt det svaret.
//
// KONTROLLER I DOM:EN (med motprov):
//   kombinerad (mobil + bredband, modellens nej) → rubriken «Ingen jämförelse mot listpris», planvalsmeningen
//                  och «Bredbandet på samma faktura har vi inte prissatt»; aldrig «Vi hittar inget publikt pris
//                  att byta ned till», «inget verifierat pris», ett bytesbelopp, ett procenttal över listpris,
//                  en poäng eller «Förbättringsläge»/«Kritisk»
//   349-planen (modellens ja) → planvalsmeningen ensam; samma förbud
//   sidrubriken (Q-7) → «Ni betalar för mycket» står aldrig ovanför ett resultat utan byte, men över motprovets byte
//   motprov      → bredbandsfakturan SKA visa sitt byte (4 560 kr/år brutto); annars bevisar kontrollerna
//                  bara att orden saknas i bygget
// BLIND: nätverket är stubbat; modellens svar är författade. Rummet prövas av scripts/screenshot-mobilscore.mjs.
//
// Kör: npm run build && node scripts/screenshot-planvalsgrind.mjs
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, mkdtemp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const ROT = new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = join(ROT, 'results/screenshots/planvalsgrind');
if (!existsSync(join(BUILD, 'index.html'))) { console.error('✗ build/ saknas — kör `npm run build` först.'); process.exit(1); }

const { MOBILFALL, MOTPROV, FYNDFALL } = await import('../tests/fakturakedjan/fall.mjs');
const VALDA = ['comb-01·nej·antal', 'xl349·ja·antal', 'motprov·bredband', 'fynd·xl349·nej'];
const fall = [...MOBILFALL, ...MOTPROV, ...FYNDFALL].filter((f) => VALDA.includes(f.id));
const dir = await mkdtemp(join(tmpdir(), 'planvalsgrind-'));
await writeFile(join(dir, 'fall.json'), JSON.stringify(fall));
const k = spawnSync(process.execPath, ['--import', './tests/fakturakedjan/register.mjs', 'tests/fakturakedjan/kor.mjs',
  join(dir, 'fall.json')], { cwd: ROT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, env: { ...process.env, FAKTURAKEDJAN_SVAR: '1' } });
const utrad = (k.stdout ?? '').split('\n').find((l) => l.startsWith('FAKTURAKEDJAN:'));
if (!utrad) { console.error(`✗ handlern gav inget svar: ${(k.stderr ?? '').slice(-800)}`); process.exit(1); }
const SVAR = Object.fromEntries(JSON.parse(utrad.slice('FAKTURAKEDJAN:'.length)).map((u) => [u.id, u.svar]));

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
async function fakturavyn(bredd, svar, vanta) {
  const p = await browser.newPage({ viewport: { width: bredd, height: 1100 } });
  await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
  await p.route('**/api/token', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"token":"stub"}' }));
  await p.route('**/api/test-invoice', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(svar) }));
  p.on('pageerror', (e) => fel(`sidfel: ${String(e).slice(0, 160)}`));
  await p.goto(`${bas}/testa-faktura`, { waitUntil: 'networkidle' });
  await p.setInputFiles('input[type="file"]', join(ROT, 'test-pdfs/crayon-m365-azure.pdf'));
  await p.getByRole('button', { name: /Analysera fakturan/i }).first().click();
  await p.waitForSelector(`text=${vanta}`, { timeout: 45000 });
  await p.waitForTimeout(1500);
  // Underlaget öppnas, så att förbudslistan också läser «Hur vi räknar» (V-2, åttonde linsen).
  // Ett DOM-klick: bredbandsmotprovets e-postgrind ligger ovanpå och tar pekarhändelserna.
  await p.getByText('Hur vi räknar').first().evaluate((e) => e.click());
  await p.waitForTimeout(800);
  return p;
}
const text = async (p) => (await p.innerText('body')).replace(/\s+/g, ' ');
const FORBJUDET = [/Ni betalar för mycket/, /Vi hittar inget publikt pris att byta ned till/, /inget verifierat (jämförelse)?pris/i,
  /möjlig nettobesparing/i, /Ni behåller/i, /\d+\s?% (över|mer)/i, /Förbättringsläge/i, /Kritisk/i,
  /Suboptimerat/i, /\b\d{1,3}\s?\/\s?100\b/, /rekommenderar byte/i,
  // K-2 och K-3: en besparingsmening om sidan, och listprisnotisen som säger att ett pris baseras på något.
  /ingen besparing(?! på dem)/i, /Priset baseras på verifierade offentliga listpriser/, /Vid genomfört byte/,
  /Beräkningsunderlag/, /Er nettobesparing/];

for (const [bredd, namn] of [[390, 'mobil'], [1600, 'desktop']]) {
  for (const [id, fil, maste] of [
    ['comb-01·nej·antal', 'kombinerad', [/Ingen jämförelse mot listpris/, /Vi jämför inte era mobilabonnemang/,
      /Bredbandet på samma faktura har vi inte prissatt/]],
    ['xl349·ja·antal', 'plan349', [/Ingen jämförelse mot listpris/, /Vi jämför inte era mobilabonnemang/]],
    // Fyndet ur kundens egna rader står kvar ovanför beskedet (K-2).
    ['fynd·xl349·nej', 'fynd', [/Ingen jämförelse mot listpris/, /898/, /räknar ingen besparing på dem/]],
  ]) {
    const p = await fakturavyn(bredd, SVAR[id], '/Vi jämför inte era mobilabonnemang/');
    const t = await text(p);
    for (const re of maste) if (!re.test(t)) fel(`${fil}: saknar ${re} (${namn})`);
    for (const re of FORBJUDET) if (re.test(t)) fel(`${fil}: säger ${re} (${namn}): «${t.match(re)[0]}»`);
    if (fil === 'plan349' && /Bredbandet på samma faktura/.test(t)) fel(`plan349: bredbandsmeningen utan bredband (${namn})`);
    await p.screenshot({ path: `${UT}/${fil}-${namn}.png`, fullPage: true }); await p.close();
  }
  // Talen skrivs med hårt mellanslag (sv-SE); \s matchar det.
  const p = await fakturavyn(bredd, SVAR['motprov·bredband'], '/4\\s560|3\\s648/');
  await p.getByText('Beräkningsunderlag').first().evaluate((e) => e.click());
  await p.waitForTimeout(500);
  const t = await text(p);
  if (!/3 648|4 560/.test(t)) fel(`motprov: bredbandsbytet syns inte (${namn}) — kontrollerna mäter ingenting`);
  if (/Vi jämför inte era mobilabonnemang/.test(t)) fel(`motprov: planvalsmeningen på en bredbandsfaktura (${namn})`);
  if (!/Ni betalar för mycket/.test(t)) fel(`motprov: sidrubriken över ett byte saknas (${namn})`);
  if (!/Er nettobesparing/.test(t)) fel(`motprov: beräkningsunderlaget saknas under bytet (${namn}) — klicket öppnade inget`);
  await p.screenshot({ path: `${UT}/motprov-bredband-${namn}.png`, fullPage: true }); await p.close();
  console.log(`${namn}: kontroller körda`);
}
await browser.close(); server.close();
console.log(process.exitCode ? '✗ FEL — se ovan' : `✓ Klart: ${UT}`);
