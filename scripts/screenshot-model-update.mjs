// scripts/screenshot-model-update.mjs — visuell verifiering av Switch-modell-omskrivningen.
// Servar build/ statiskt och skärmdumpar Landing (pris/FAQ) + Bias (neutralitets-omskrivningen)
// i mobil (390) och desktop (1600). Ren copy-verifiering — regel 8.
import { chromium } from 'playwright';
import http from 'http';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

const BUILD = path.resolve('build');
const OUT = path.resolve('screenshots');
mkdirSync(OUT, { recursive: true });
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.map': 'application/json', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  let file = path.join(BUILD, url.replace(/^\/flow/, ''));
  if (!existsSync(file) || url === '/' || !path.extname(file)) file = path.join(BUILD, 'index.html');
  try {
    const ext = path.extname(file);
    res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  } catch { res.writeHead(404); res.end('nf'); }
});

await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const base = `http://localhost:${port}/flow`;

const browser = await chromium.launch();
const pages = [['landing', '/'], ['bias', '/bias']];
const widths = [['mobil', 390], ['desktop', 1600]];

for (const [name, route] of pages) {
  for (const [w, width] of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    const f = path.join(OUT, `${name}-${w}.png`);
    await page.screenshot({ path: f, fullPage: true });
    console.log('✓', f);
    await ctx.close();
  }
}
await browser.close();
server.close();
