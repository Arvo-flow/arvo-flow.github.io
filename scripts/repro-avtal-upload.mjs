// scripts/repro-avtal-upload.mjs — repro av "händer inget vid avtalsuppladdning" (2026-07-08).
// Serverar build/ lokalt, mockar API:t med verklighetstrogen payload (husets mönster) och driver
// det RIKTIGA uppladdningsflödet i Portfolio med Playwright. Två innehav:
//   A · Telia (should_switch=true, amber)  → bytes-kortet + uppladdningsknappen SKA finnas
//   B · Fortnox (should_switch=false, amber) → dagens kod renderar INGET bytes-kort → ingen knapp
// Kör: CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/repro-avtal-upload.mjs
import { chromium } from 'playwright';
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const BUILD = path.resolve('build');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0].replace(/^\/flow/, '') || '/';
  let file = path.join(BUILD, p);
  if (!existsSync(file) || p === '/' || !path.extname(p)) file = path.join(BUILD, 'index.html');
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(4199, r));

const HISTORY = {
  analyses: [
    {
      id: '11111111-1111-4111-8111-111111111111', supplier: 'Telia Sverige AB', normalized_supplier: 'Telia',
      category: 'mobil', annual_cost: 41880, suggested_annual_cost: 35880, gross_saving: 6000, net_saving: 4800,
      should_switch: true, route: 'auto', created_at: '2026-07-01T09:00:00Z', contract_end_date: null,
      seat_count: 10, health_score: 55,
    },
    {
      id: '22222222-2222-4222-8222-222222222222', supplier: 'Fortnox AB', normalized_supplier: 'Fortnox',
      category: 'saas-economy', annual_cost: 14280, suggested_annual_cost: null, gross_saving: 0, net_saving: 0,
      should_switch: false, route: 'auto', created_at: '2026-07-02T09:00:00Z', contract_end_date: null,
      seat_count: null, health_score: 88,
    },
  ],
};

mkdirSync('/tmp/repro-upload', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
const page = await browser.newPage({ viewport: { width: Number(process.env.WIDTH) || 430, height: 1400 } });

await page.route('**/api/invoice-history*', (r) => r.fulfill({ json: HISTORY }));
await page.route('**/api/contract-upload', async (r) => {
  await new Promise((res) => setTimeout(res, 1200));   // synliggör "Läser avtalet…"-fasen
  r.fulfill({ json: { ok: true, clock: { currentPeriodEnd: '2026-10-15', deadline: '2026-07-15', status: 'window-open' }, applied: {}, citat: {} } });
});
await page.route('**/api/**', (r) => {
  if (r.request().url().match(/invoice-history|contract-upload/)) return r.fallback();
  r.fulfill({ json: {} });
});

await page.goto('http://localhost:4199/flow/portfolio', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);

const rows = page.locator('[aria-expanded]');
const n = await rows.count();
console.log('innehavsrader funna:', n);

// A · Telia (byte finns): expandera → knappen ska finnas
await rows.first().click();
await page.waitForTimeout(600);
const btnA = page.locator('.sv-upload');
console.log('A · Telia: uppladdningsknapp synlig?', (await btnA.count()) > 0 ? 'JA' : 'NEJ');
await page.screenshot({ path: '/tmp/repro-upload/a-telia-expanderad.png', fullPage: true });

if (await btnA.count()) {
  await btnA.first().locator('input[type=file]').setInputFiles('test-pdfs/avtal/falla2-bahnhof-3plus3.pdf');
  await page.waitForTimeout(400);
  console.log('A · under uppladdning — knapptext:', JSON.stringify(await btnA.first().textContent()));
  await page.screenshot({ path: '/tmp/repro-upload/b-laser-avtalet.png', fullPage: true });
  await page.waitForTimeout(1600);
  const note = page.locator('.sv-upload-note');
  console.log('A · efter svar — statusrad:', (await note.count()) ? JSON.stringify(await note.first().textContent()) : 'SAKNAS');
  await page.screenshot({ path: '/tmp/repro-upload/c-domen.png', fullPage: true });
}

// B · Fortnox (inget byte): expandera → finns någon uppladdningsväg alls?
await rows.nth(1).click();
await page.waitForTimeout(600);
const uploadsNow = await page.locator('.sv-upload').count();
console.log('B · Fortnox: antal uppladdningsknappar i hela rummet efter expansion:', uploadsNow, '(fortfarande bara Telias = Fortnox saknar väg)');
await page.screenshot({ path: '/tmp/repro-upload/d-fortnox-utan-knapp.png', fullPage: true });

await browser.close(); server.close();
console.log('KLART — bilder i /tmp/repro-upload/');
