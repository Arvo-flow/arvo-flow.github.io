#!/usr/bin/env node
// scripts/screenshot-hardvara.mjs — REGEL 8 för hårdvaru-PR:en (X-1 och Å-1, ops/ARBETSORDER-VAG1.md).
//
// Fakturavyn får HANDLERNS svar (tests/fakturakedjan/kor.mjs, bara nätverket stubbat). Rummet byggs av
// produktionens funktioner (refineFinding, byggUppdelning, buildBranchAnchors, berikaRader, byggRum).
//
// KONTROLLER I DOM:EN:
//   fakturavyn, avbetalning typad hardware (månad och kvartal) och typad engångsavgift (H-3) → «Inkl. … kr hårdvara»
//                och fyndet «… kr · på fakturan»; aldrig «engångsbelopp» eller «engångskostnader», och aldrig ett tal för
//                fallet att skulden tas över («uppgår nettobesparing till», «Om ja är besparingen»): talet är strukket
//                (H-1, H-2). Motprov i samma vy: frågan om skulden står kvar, så sonden läser stycket.
//   rummet, fynd utan årstal → «Vi fångade en kostnad», räknaren «1 347 kr på en faktura», uppdelningens rad
//                «hårdvara»; aldrig «–» före «kr/år», «engångsbelopp» eller «engångs eller rörlig» om avbetalningen
//   rummet, fynd med årstal (motprov) → «Vi fångade 5 388 kr/år»: sonden kan se talet
// Justeringens tal (X-1, «Ni betalar idag») står som på main och prövas inte här.
// BLIND: nätverket är stubbat och modellens svar är författade. Rummets läsning av den lagrade raden
//   (refineFinding och byggUppdelning i api/invoice-history.mjs) är speglad här, inte anropad genom handlern.
//
// Kör: npm run build && node scripts/screenshot-hardvara.mjs
// Motprov mot ett annat träd: SONDENS_ROT=<träd med build/> node scripts/screenshot-hardvara.mjs (väntat: röda).
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, mkdtemp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const ROT = process.env.SONDENS_ROT ?? new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = join(new URL('..', import.meta.url).pathname, 'results/screenshots/hardvara');
if (!existsSync(join(BUILD, 'index.html'))) { console.error(`✗ ${BUILD} saknas — kör \`npm run build\` först.`); process.exit(1); }
const imp = (p) => import(pathToFileURL(join(ROT, p)).href);

const { HARDVARUFALL, RESTFALL } = await import(pathToFileURL(join(new URL('..', import.meta.url).pathname, 'tests/fakturakedjan/fall.mjs')).href);
const VALDA = ['rest·bb+mob+hw·ja', 'hw·kvartal·ja', 'hw·kvartal·otf·ja'];
const fall = [...HARDVARUFALL, ...RESTFALL].filter((f) => VALDA.includes(f.id));
const dir = await mkdtemp(join(tmpdir(), 'hardvara-'));
await writeFile(join(dir, 'fall.json'), JSON.stringify(fall));
const k = spawnSync(process.execPath, ['--import', './tests/fakturakedjan/register.mjs', 'tests/fakturakedjan/kor.mjs',
  join(dir, 'fall.json')], { cwd: ROT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, env: { ...process.env, FAKTURAKEDJAN_SVAR: '1' } });
const utrad = (k.stdout ?? '').split('\n').find((l) => l.startsWith('FAKTURAKEDJAN:'));
if (!utrad) { console.error(`✗ handlern gav inget svar: ${(k.stderr ?? '').slice(-800)}`); process.exit(1); }
const SVAR = Object.fromEntries(JSON.parse(utrad.slice('FAKTURAKEDJAN:'.length)).map((u) => [u.id, u.svar]));

// ── Rummet: en lagrad bredbandsrad per kvartal utan byte, med avbetalningen som fynd ─────────────────────
const { refineFinding } = await imp('lib/forensics.js');
const { byggUppdelning } = await imp('lib/fakturarader.js');
const { buildBranchAnchors, berikaRader, byggRum } = await imp('api/invoice-history.mjs');
const HW = { type: 'hardware', description: 'Delbetalning iPhone 15 Pro, månad 12 av 36', amount: 1347 };
const BB = { type: 'recurring_subscription', description: 'Företagsbredband Fiber 1000/1000', amount: 2097, quantity: 1, unitPrice: 2097 };
function lagrad(id, rader, fynd) {
  const a = { id, supplier: 'Telia', normalized_supplier: 'Telia', category: 'bredband', route: 'auto', annual_cost: 2097 * 4,
    seat_count: 1, should_switch: false, gross_saving: null, net_saving: null, suggested_annual_cost: null,
    billing_period: 'quarterly', created_at: `2026-11-${String(id).padStart(2, '0')}T08:00:00Z`, lead_finding_json: fynd };
  // Spegeln av api/invoice-history.mjs: fyndet räknas om och uppdelningen byggs vid läsning.
  return { ...a, lead_finding_json: refineFinding(fynd, { supplier: 'Telia', billingPeriod: 'quarterly', lineItems: rader }),
    uppdelning: byggUppdelning(rader, { annualCost: a.annual_cost, billingPeriod: 'quarterly' }), _rader: rader };
}
async function rumSvar(analyses) {
  const branchAnchors = await buildBranchAnchors(analyses);
  const berikade = berikaRader(analyses, branchAnchors);
  return { ok: true, analyses: berikade, watched: [], rum: byggRum(berikade, []), branchAnchors, movements: {}, email: 'e@exempel.se' };
}
const fyndLagrat = { type: 'hardware_financing', severity: 'medium', title: 'Hårdvaruavbetalning på en löpande rad',
  lineDescription: HW.description, monthly: 1347, annualImpact: null, metricText: '1 347 kr · engångsbelopp', text: '' };
const RUM = {
  utanArstal: await rumSvar([lagrad(1, [BB, HW], fyndLagrat)]),
  medArstal: await rumSvar([lagrad(2, [BB, { ...HW, type: 'recurring_subscription' }],
    { ...fyndLagrat, annualImpact: 1347 * 4, metricText: undefined })]),
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
const text = async (p) => (await p.innerText('body')).replace(/\s+/g, ' ');
const kr = (n) => n.toLocaleString('sv-SE').replace(/\s/g, ' ');

async function fakturavyn(bredd, svar) {
  const p = await browser.newPage({ viewport: { width: bredd, height: 1100 } });
  await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
  await p.route('**/api/token', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"token":"stub"}' }));
  await p.route('**/api/test-invoice', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(svar) }));
  p.on('pageerror', (e) => fel(`sidfel: ${String(e).slice(0, 160)}`));
  await p.goto(`${bas}/testa-faktura`, { waitUntil: 'networkidle' });
  await p.setInputFiles('input[type="file"]', join(new URL('..', import.meta.url).pathname, 'test-pdfs/crayon-m365-azure.pdf'));
  await p.getByRole('button', { name: /Analysera fakturan/i }).first().click();
  // «Ni betalar idag» står i underlaget, som är hopfällt: vänta på det, öppna det (ett DOM-klick, e-postgrinden
  // kan ligga ovanpå) och vänta sedan på raden.
  await p.waitForSelector('text=Hur vi räknar', { timeout: 45000 });
  await p.waitForTimeout(1500);
  await p.getByText('Hur vi räknar').first().evaluate((e) => e.click());
  await p.waitForSelector('text=/Ni betalar idag/i', { timeout: 10000 });
  await p.waitForTimeout(800);
  return p;
}
async function rummet(bredd, rum) {
  const p = await browser.newPage({ viewport: { width: bredd, height: 1400 } });
  await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
  await p.route('**/api/token', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"token":"stub"}' }));
  await p.route('**/api/invoice-history**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(rum) }));
  p.on('pageerror', (e) => fel(`sidfel: ${String(e).slice(0, 160)}`));
  await p.goto(`${bas}/portfolio?magic=stub`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  // Leverantörsraden öppnas (som i scripts/screenshot-mobilscore.mjs), så att kontrollerna läser uppdelningen.
  const h = p.locator('[aria-expanded="false"]', { hasText: 'Telia' }).first();
  if (await h.count()) await h.click({ timeout: 2000 });
  await p.waitForTimeout(400);
  return p;
}

const VY = {
  'rest·bb+mob+hw·ja': { inkl: 'Inkl. 449 kr hårdvara', fynd: '449 kr · på fakturan' },
  'hw·kvartal·ja': { inkl: 'Inkl. 1 347 kr hårdvara', fynd: '1 347 kr · på fakturan' },
  'hw·kvartal·otf·ja': { inkl: 'Inkl. 1 347 kr hårdvara', fynd: '1 347 kr · på fakturan' },
};
for (const bredd of [390, 1600]) {
  for (const [id, v] of Object.entries(VY)) {
    if (!SVAR[id]) { fel(`${id}: inget svar ur handlern`); continue; }
    const p = await fakturavyn(bredd, SVAR[id]);
    const t = await text(p);
    await p.screenshot({ path: join(UT, `vy-${id.replace(/[·+]/g, '_')}-${bredd}.png`), fullPage: true });
    const ctx = `${id} @${bredd}`;
    if (!t.includes(v.inkl)) fel(`${ctx}: «${v.inkl}» saknas`);
    if (!t.includes(v.fynd)) fel(`${ctx}: fyndet «${v.fynd}» saknas`);
    if (!/ta över er hårdvaruskuld|kan absorbera skulden/.test(t)) fel(`${ctx}: motprovet — frågan om skulden saknas`);
    for (const f of ['engångsbelopp', 'engångskostnader', 'uppgår nettobesparing till', 'Om ja är besparingen']) {
      if (t.includes(f)) fel(`${ctx}: «${f}» står i vyn`);
    }
    await p.close();
  }
  {
    const p = await rummet(bredd, RUM.utanArstal);
    const t = await text(p);
    await p.screenshot({ path: join(UT, `rum-utan-arstal-${bredd}.png`), fullPage: true });
    const ctx = `rummet utan årstal @${bredd}`;
    if (!t.includes('Vi fångade en kostnad värd att åtgärda')) fel(`${ctx}: «Vi fångade en kostnad» saknas`);
    if (!/1 347 kr ?på en faktura/i.test(t)) fel(`${ctx}: räknaren «1 347 kr på en faktura» saknas: ${(t.match(/.{0,60}1 347 kr.{0,40}/g) ?? []).join(' | ')}`);
    if (/[–—-] ?kr ?(\/ ?år|per år)/i.test(t)) fel(`${ctx}: ett streck i stället för ett årstal`);
    for (const f of ['engångsbelopp', 'engångs eller rörlig']) if (t.includes(f)) fel(`${ctx}: «${f}» står i rummet`);
    if (!/Delbetalning iPhone 15 Pro, månad 12 av 36 hårdvara/.test(t)) fel(`${ctx}: uppdelningens rad «hårdvara» saknas`);
    if (!t.includes('1 347 kr · på fakturan')) fel(`${ctx}: fyndkortets «1 347 kr · på fakturan» saknas`);
    await p.close();
  }
  {
    const p = await rummet(bredd, RUM.medArstal);
    const t = await text(p);
    await p.screenshot({ path: join(UT, `rum-med-arstal-${bredd}.png`), fullPage: true });
    if (!t.includes('Vi fångade 5 388 kr/år')) fel(`rummet med årstal @${bredd}: motprovet — «Vi fångade 5 388 kr/år» saknas`);
    await p.close();
  }
}
await browser.close();
server.close();
console.log(process.exitCode ? '✗ sonden fann fel' : '✓ fakturavyn och rummet säger rätt om avbetalningen, med motprov');
