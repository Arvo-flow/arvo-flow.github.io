// scripts/screenshot-reveal-live.mjs — renderar avslöjandet i dörren ur ops/diag-reveal-live.json:
// den LIVE-utlagda API:ns råa svar, ORDAGRANT. Demo-bilder får aldrig bära handmatade värden
// (grundarlärdom 2026-07-01: platshållardagar i en demo-bild). Kör diag-reveal-workflowen först
// så JSON:en är färsk. Regel 8: webb + mobil.
import { chromium } from 'playwright';
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const BUILD = path.resolve('build');
const REVEAL = JSON.parse(readFileSync('ops/diag-reveal-live.json', 'utf8'));   // API:ns verkliga output
const EMAIL = `namn@${REVEAL.domain}`;

const OFFICE = { ok: true, analyses: [], watched: [], vakt: null, email: null, ingesting: 0 };
const MIME = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.map':'application/json','.woff2':'font/woff2' };
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.startsWith('/api/invoice-history')) { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify(OFFICE)); }
  if (url.startsWith('/api/reveal')) { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify(REVEAL)); }
  let file = path.join(BUILD, url.replace(/^\/flow/, ''));
  if (!existsSync(file) || url === '/') file = path.join(BUILD, 'index.html');
  try { res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' }); res.end(readFileSync(file)); }
  catch { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(readFileSync(path.join(BUILD, 'index.html'))); }
});
await new Promise((r) => server.listen(4198, r));

const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [name, vp] of [['webb', { width: 1440, height: 1000 }], ['mobil', { width: 390, height: 844 }]]) {
  const p = await b.newPage({ viewport: vp, deviceScaleFactor: 2 });
  await p.goto('http://localhost:4198/flow/portfolio', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1400);
  await p.fill('input[placeholder="namn@ertbolag.se"]', EMAIL);
  await p.click('button:has-text("Öppna underlaget")');
  await p.waitForSelector(`text=Underlag · ${REVEAL.domain}`, { timeout: 8000 });
  await p.waitForTimeout(500);
  await p.screenshot({ path: `/tmp/reveal-live-${name}.png`, fullPage: true });
  await p.close(); console.log('✓ ' + name);
}
await b.close(); server.close();
