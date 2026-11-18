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
//   stycket      → på en planvalsfaktura säger stycket «Kombinerad faktura.» ingenting mer, läst ur DOM:en (Z-1, Å-2);
//                  motprov: bredbandsfakturans stycke bär primärdelens tal
//   kvartal, år  → Y-1:s fakturor går till granskning som på main (Å-1, FV-A20): inget «Kombinerad faktura», inget P
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

const { MOBILFALL, MOTPROV, FYNDFALL, KOMBIFALL, RESTFALL } = await import('../tests/fakturakedjan/fall.mjs');
const VALDA = ['comb-01·nej·antal', 'xl349·ja·antal', 'motprov·bredband', 'fynd·hardware_overpaid·ren·nej',
  'fynd·supplier_documented_hike·komb·nej', 'kombi·bredband+mobil269·nej', 'rest·mob+bb·quarterly·nej',
  'rest·mob+bb·annual·nej'];
const fall = [...MOBILFALL, ...MOTPROV, ...FYNDFALL, ...KOMBIFALL, ...RESTFALL].filter((f) => VALDA.includes(f.id));
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
  /säger inget om/i, /ingen besparing/i, /analyseras via/i,
  // Y-1: en planvalsfaktura bär inget tal för primärdelen.
  /Kombinerad faktura\. Mobilabonnemang:/, /Priset baseras på verifierade offentliga listpriser/, /Vid genomfört byte/,
  /Beräkningsunderlag/, /Er nettobesparing/,
];
// Z-1 och Å-2: stycket som bär «Kombinerad faktura.» säger ingenting mer på en planvalsfaktura, varken ett tal med
// etikett, ett tal utan etikett eller en etikett utan kolon. Z-1:s mönster krävde ett kolon, så «Kombinerad faktura.
// Mobilabonnemang 125 640 kr/år.» gick igenom (Å-2). Stycket läses ur DOM:en; sidans löptext fortsätter med nästa kort.
const kombistycken = (p) => p.$$eval('p', (ps) => ps.map((e) => e.innerText.replace(/\s+/g, ' ').trim())
  .filter((t) => t.startsWith('Kombinerad faktura.')));

for (const [bredd, namn] of [[390, 'mobil'], [1600, 'desktop']]) {
  for (const [id, fil, maste] of [
    ['comb-01·nej·antal', 'kombinerad', [/Ingen jämförelse mot listpris/, /Vi jämför inte era mobilabonnemang/,
      /Bredbandet på samma faktura har vi inte jämfört mot listpris/]],
    ['xl349·ja·antal', 'plan349', [/Ingen jämförelse mot listpris/, /Vi jämför inte era mobilabonnemang/]],
    // Fyndet ur kundens egna rader står kvar ovanför beskedet (K-2).
    ['fynd·hardware_overpaid·ren·nej', 'fynd', [/Ingen jämförelse mot listpris/, /898/, /Därför jämför vi inte ert pris mot listpriset/]],
    // N-1 och N-2: leverantörens egen höjning på en kombinerad faktura.
    ['fynd·supplier_documented_hike·komb·nej', 'hojning', [/Leverantören skrev in höjningen själv/,
      /Därför jämför vi inte ert pris mot listpriset/, /Kombinerad faktura\./]],
  ]) {
    const p = await fakturavyn(bredd, SVAR[id], '/Vi jämför inte era mobilabonnemang/');
    const t = await text(p);
    for (const re of maste) if (!re.test(t)) fel(`${fil}: saknar ${re} (${namn})`);
    const stycken = await kombistycken(p);
    for (const st of stycken) if (st !== 'Kombinerad faktura.') fel(`${fil}: stycket säger «${st}» (${namn})`);
    if (fil === 'kombinerad' && stycken.length === 0) fel(`kombinerad: inget stycke «Kombinerad faktura.» (${namn}) — kontrollen prövar ingenting`);
    for (const re of FORBJUDET) if (re.test(t)) fel(`${fil}: säger ${re} (${namn}): «${t.match(re)[0]}»`);
    if (fil === 'plan349' && /Bredbandet på samma faktura/.test(t)) fel(`plan349: bredbandsmeningen utan bredband (${namn})`);
    await p.screenshot({ path: `${UT}/${fil}-${namn}.png`, fullPage: true }); await p.close();
  }
  // Å-1: Y-1:s kvartals- och årsfaktura går till granskning som på main (FV-A20). Vyn visar granskningsläget och
  // inget av fakturans delar: P vore 125 640 respektive 193 680 kr/år.
  for (const [id, fil] of [['rest·mob+bb·quarterly·nej', 'kvartal'], ['rest·mob+bb·annual·nej', 'ar']]) {
    const p = await fakturavyn(bredd, SVAR[id], '/Tele2/');
    const t = await text(p);
    if (!/Tele2/.test(t)) fel(`${fil}: vyn renderades inte (${namn})`);
    for (const re of [/Kombinerad faktura/, /125\s640/, /193\s680/, /per abonnemang/, ...FORBJUDET])
      if (re.test(t)) fel(`${fil}: säger ${re} (${namn}): «${t.match(re)[0]}»`);
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
  // O-1: en bredbandsfaktura med en mobildel som jämförts och fallit under tröskeln. Ingen mening om resten (X-1).
  const k = await fakturavyn(bredd, SVAR['kombi·bredband+mobil269·nej'], '/Telia Sverige AB/');
  const tk = await text(k);
  // Resten är struken (X-1); kvar står primärdelens tal.
  if (!/Kombinerad faktura\. Företagsbredband: 8\s388\skr\/år\./.test(tk)) {
    fel(`kombi: meningen om primärdelen saknas eller har glidit (${namn})`);
  }
  if (/jämfört mot listpris|analysen avser|analyseras via|Övrigt på fakturan|Resten av fakturan/i.test(tk)) fel(`kombi: ett påstående om vad vi gjort med resten (${namn})`);
  // Motprov till styckeskontrollen: på en bredbandsfaktura läser den primärdelens tal ur samma stycke.
  if (!(await kombistycken(k)).some((st) => /^Kombinerad faktura\. Företagsbredband: 8\s388\skr\/år\.$/.test(st)))
    fel(`kombi: styckeskontrollen hittar inte primärdelens tal (${namn}) — Å-2-kontrollen mäter ingenting`);
  await k.screenshot({ path: `${UT}/kombi-bredband-mobil-${namn}.png`, fullPage: true }); await k.close();
  console.log(`${namn}: kontroller körda`);
}
await browser.close(); server.close();
console.log(process.exitCode ? '✗ FEL — se ovan' : `✓ Klart: ${UT}`);
