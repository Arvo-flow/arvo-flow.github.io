// scripts/screenshot-kontoret-real.mjs — renderar det riktiga Arvo-kontoret ur VERKLIG data
// (ops/testyta-rows.json från de 26 fakturorna), inte en stub. Bevisar bug-fixarna i kundytan:
// differentierade Arvo Score (health_score) och inga MS↔Google-motsägelser. Servar build/.
import { chromium } from 'playwright';
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const BUILD = path.resolve('build');
const { watchedCard } = await import('../api/invoice-history.mjs');
const rows = JSON.parse(readFileSync('ops/testyta-rows.json', 'utf8'));

// Dela liggarna SAMMA väg som api/invoice-history (regel 1): prissatt (auto, ingen triage) vs bevakat.
const TRIAGE = new Set(['unsupported', 'review_queue']);
const isTriaged = (r) => TRIAGE.has(r.route) || r.triage_reason != null;
const watched = rows.filter(isTriaged).map((r) => watchedCard({
  normalized_supplier: r.normalized_supplier, supplier: r.supplier, category: r.category,
  route: r.route, triage_reason: r.triage_reason,
}));

// Mappa DB-rader → API-formen kontoret läser (camel/snake som invoice-history skickar: spread av raden).
const analyses = rows.filter((r) => !isTriaged(r)).map((r, i) => ({
  id: r.id ?? i + 1,
  supplier: r.supplier, normalized_supplier: r.normalized_supplier, category: r.category,
  annual_cost: r.annual_cost, suggested_annual_cost: r.suggested_annual_cost,
  gross_saving: r.gross_saving, net_saving: r.net_saving, should_switch: r.should_switch,
  route: r.route ?? 'auto', industry: r.industry ?? 'it-tech', employees: r.employees ?? 10,
  billing_period: r.billing_period ?? 'monthly', created_at: r.created_at,
  seat_count: r.seat_count, price_per_seat_monthly: r.price_per_seat_monthly,
  health_score: r.health_score, lead_finding_json: r.lead_finding_json,
}));

// Vaktens hjärtslag (verkligt svep-format) så radarn andas i bilden.
const VAKT = { sweptAt: '2026-06-28T00:00:00Z', sources: 38, pricePoints: 47, changes: 1 };
const PAYLOAD = { ok: true, analyses, watched, vakt: VAKT, email: 'testyta@arvoflow.se' };

const MIME = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.map':'application/json','.woff2':'font/woff2' };
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.startsWith('/api/invoice-history')) { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify(PAYLOAD)); }
  let file = path.join(BUILD, url.replace(/^\/flow/, ''));
  if (!existsSync(file) || url === '/') file = path.join(BUILD, 'index.html');
  try { res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' }); res.end(readFileSync(file)); }
  catch { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(readFileSync(path.join(BUILD, 'index.html'))); }
});
await new Promise((r) => server.listen(4178, r));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [name, viewport] of [['desktop', { width: 1600, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4178/flow/portfolio', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `/tmp/kontoret-real-${name}.png`, fullPage: true });
  await page.close();
  console.log(`✓ ${name}`);
}
await browser.close(); server.close();
console.log('Klart → /tmp/kontoret-real-{desktop,mobile}.png');
