// scripts/screenshot-portfolio.mjs — lokal visuell verifiering av Arvo-kontoret.
// Servar build/ statiskt, stubbar /api/invoice-history med realistisk payload,
// tar skärmdumpar i mobil (390px) och desktop (1600px) — regel 8.
import { chromium } from 'playwright';
import http from 'http';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

const BUILD = path.resolve('build');

// Exempeldata — speglar ett kontor med 8 leverantörer, 5 identifierade byten.
const A = (id, supplier, category, annual, suggested, net, route, created, extra = {}) => ({
  id, supplier, normalized_supplier: supplier.toLowerCase(), category,
  annual_cost: annual, suggested_annual_cost: suggested,
  gross_saving: suggested ? annual - suggested : null, net_saving: net,
  should_switch: net != null && net > 0, route, industry: 'it-tech', employees: 50,
  billing_period: 'monthly', created_at: created, ...extra,
});

const ANALYSES = [
  A(1, 'CloudReseller Norden AB', 'saas-productivity', 184260, 142232, 33622, 'auto', '2026-06-08T09:00:00Z'),
  A(2, 'IT-Partner Sverige AB', 'saas-productivity', 184680, 152602, 25662, 'auto', '2026-06-12T08:00:00Z'),
  A(3, 'SveaMobil Företag AB', 'mobil', 188160, 160860, 21840, 'auto', '2026-05-31T10:00:00Z'),
  A(4, 'Nordic Managed IT Services AB', 'saas-productivity', 475440, 450871, 19655, 'auto', '2026-06-12T07:00:00Z'),
  A(5, 'Telia Sverige AB', 'mobil', 58092, 50304, 6230, 'auto', '2026-06-12T06:00:00Z'),
  A(6, 'Svea Kontorsprint & Leasing AB', 'skrivarleasing', 58800, null, null, 'auto', '2026-06-11T09:00:00Z'),
  A(7, 'Tre Företag AB', 'mobil', 269460, null, null, 'auto', '2026-06-03T09:00:00Z'),
  A(8, 'Telenor Sverige AB', 'mobil', 125580, null, null, 'auto', '2026-06-01T09:00:00Z'),
  // dubbletter för "X analyser"-räknarna
  A(9, 'IT-Partner Sverige AB', 'saas-productivity', 184680, 152602, 25662, 'auto', '2026-05-12T08:00:00Z'),
  A(10, 'IT-Partner Sverige AB', 'saas-productivity', 184680, 152602, 25662, 'auto', '2026-04-12T08:00:00Z'),
  A(11, 'Telia Sverige AB', 'mobil', 58092, 50304, 6230, 'auto', '2026-05-12T06:00:00Z'),
];

const PAYLOAD = { ok: true, analyses: ANALYSES, email: 'ekonomi@lynxeye.se' };

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.map': 'application/json', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.startsWith('/api/invoice-history')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(PAYLOAD));
  }
  let file = path.join(BUILD, url.replace(/^\/flow/, ''));
  if (!existsSync(file) || url === '/') file = path.join(BUILD, 'index.html');
  try {
    const ext = path.extname(file);
    res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(readFileSync(path.join(BUILD, 'index.html')));
  }
});

await new Promise(r => server.listen(4174, r));

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
for (const [name, viewport] of [['desktop', { width: 1600, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:4174/flow/portfolio', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `/tmp/portfolio-${name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
server.close();
console.log('Klart: /tmp/portfolio-desktop.png + /tmp/portfolio-mobile.png');
