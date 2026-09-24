#!/usr/bin/env node
// scripts/screenshot-premiumgrind.mjs — REGEL 8 för premiumgrinden (2026-09-24): anmälan lovar ingen
// bevakning. Renderar det byggda paketet (build/) och de riktiga mejlmallarna vid 390 och 1600 px.
//
// Kontroller (DOM, inte bara bild): efter inskick på /aktivera och /intelligence står
// LOFTEN.intelligenceAnmalan och INTE «börjar bevaka … inom/imorgon». Välkomstmejlet och
// analysmejlet bär anmälningsmeningen och inget inkorgslöfte.
// Motprov: kör mot ett bygge före ändringen — då står «Arvo börjar bevaka er inom 24 timmar» kvar och sonden fäller.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';

process.env.RESEND_API_KEY ??= 're_sond';
const { LOFTEN } = await import('../lib/kundmeningar.js');
const { buildWelcomeHtml, buildBriefingHtml } = await import('../api/activate-intelligence.mjs');

const ROT = new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = join(ROT, 'results/screenshots/premiumgrind');
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
const text = async (p) => (await p.innerText('body')).replace(/\s+/g, ' ');
const FORBJUDET = /(börjar|startar)\s+bevaka[^.]{0,30}(inom|imorgon)|bevakningen (börjar|startar) inom|Aktiverat\.|arvo hittar allt/i;

for (const [bredd, hojd] of [[390, 844], [1600, 1000]]) {
  for (const [sida, knapp] of [['/aktivera', 'Anmäl intresse'], ['/intelligence#aktivera', 'Anmäl intresse']]) {
    const p = await browser.newPage({ viewport: { width: bredd, height: hojd } });
    await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"id":"sond"}' }));
    await p.goto(`${bas}${sida}`, { waitUntil: 'networkidle' });
    const namn = sida.replace(/[/#]/g, '_').replace(/^_/, '');
    const form = p.locator('form').filter({ has: p.locator('input[type="email"]') }).last();
    await form.locator('input[type="email"]').fill('sond@exempel.se');
    const fore = await text(p);
    if (FORBJUDET.test(fore)) fel(`${namn} ${bredd}px före inskick: «${fore.match(FORBJUDET)[0]}»`);
    await form.locator('button[type="submit"]').click();
    await p.waitForTimeout(600);
    const efter = await text(p);
    await form.screenshot({ path: join(UT, `${namn}-${bredd}.png`) }).catch(() => p.screenshot({ path: join(UT, `${namn}-${bredd}.png`) }));
    await p.getByText('Anmälan mottagen').first().scrollIntoViewIfNeeded().catch(() => {});
    await p.screenshot({ path: join(UT, `${namn}-${bredd}.png`) });
    if (!efter.includes(LOFTEN.intelligenceAnmalan.text)) fel(`${namn} ${bredd}px: anmälningsmeningen saknas efter inskick`);
    else if (FORBJUDET.test(efter)) fel(`${namn} ${bredd}px: «${efter.match(FORBJUDET)[0]}»`);
    else ok(`${namn} ${bredd}px: «Anmälan mottagen» + registrets mening, inget bevakningslöfte`);
    if (!efter.includes(knapp) && !fore.includes(knapp)) fel(`${namn}: knappen «${knapp}» syns inte`);
    await p.close();
  }
  for (const [namn, html] of [
    ['valkomstmejl', buildWelcomeHtml('sond@exempel.se', 'Sondbolaget AB')],
    ['analysmejl', buildBriefingHtml({ supplier: 'Telia', annualCost: 48000, suggestedAnnualCost: 40000, netSaving: 6400, arvoFee: 1600,
      reasoning: 'Fakturan visar tio abonnemang.', diagScore: 70, diagLabel: 'Förbättringsläge', diagInsight: null })],
  ]) {
    const p = await browser.newPage({ viewport: { width: bredd, height: hojd } });
    await p.setContent(html, { waitUntil: 'load' });
    const t = await text(p);
    await p.screenshot({ path: join(UT, `${namn}-${bredd}.png`), fullPage: true });
    if (!t.includes(LOFTEN.intelligenceAnmalan.text)) fel(`${namn} ${bredd}px: anmälningsmeningen saknas`);
    else if (FORBJUDET.test(t) || /söker igenom|bevakar nu er inkorg/i.test(t)) fel(`${namn} ${bredd}px: löfte utan mekanism`);
    else ok(`${namn} ${bredd}px: anmälningsmeningen, inget bevaknings- eller inkorgslöfte`);
  }
}
await browser.close(); server.close();
