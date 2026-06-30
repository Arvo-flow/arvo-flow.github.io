// scripts/screenshot-domforst.mjs — renderar det riktiga rummet EFTER dom-först-omstruktureringen:
// Veckodomen är nu sidans enda ledare (h1, direkt efter masthead), fyndkorten är bevis under den.
// Verklig data (24-faktura-datasetet). Desktop + mobil (regel 8).
import { chromium } from 'playwright';
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const BUILD = path.resolve('build');
const { watchedCard } = await import('../api/invoice-history.mjs');
const rows = JSON.parse(readFileSync('/tmp/rows26.json', 'utf8'));

const switchTargets = {
  bredband: { alternatives: [{ supplier: 'Bahnhof Företag', positioning: 'Svensk support, fast IP-adress, samma drifttrygghet — lika bra eller bättre.' }], lastVerified: '2026-06-17' },
  'saas-productivity': { alternatives: [{ supplier: 'Microsoft 365 Business Standard (årsavtal)', positioning: 'Samma sviter, årsavtal istället för rörligt — lägre pris per användare.' }], lastVerified: '2026-06-17' },
};

const TRIAGE = new Set(['unsupported', 'review_queue']);
const isTriaged = (r) => TRIAGE.has(r.route) || r.triage_reason != null;
const watched = rows.filter(isTriaged).map((r) => watchedCard({
  normalized_supplier: r.normalized_supplier, supplier: r.supplier, category: r.category,
  route: r.route, triage_reason: r.triage_reason }));
const analyses = rows.filter((r) => !isTriaged(r)).map((r, i) => ({
  id: r.id ?? i + 1, supplier: r.supplier, normalized_supplier: r.normalized_supplier, category: r.category,
  annual_cost: r.annual_cost, suggested_annual_cost: r.suggested_annual_cost,
  gross_saving: r.gross_saving, net_saving: r.net_saving, should_switch: r.should_switch,
  route: r.route ?? 'auto', industry: r.industry ?? 'it-tech', employees: r.employees ?? 10,
  billing_period: r.billing_period ?? 'monthly', created_at: r.created_at,
  seat_count: r.seat_count, price_per_seat_monthly: r.price_per_seat_monthly,
  health_score: r.health_score, lead_finding_json: r.lead_finding_json, contract_end_date: r.contract_end_date }));

const PAYLOAD = { ok: true, analyses, watched, switchTargets,
  vakt: { sweptAt: '2026-06-30T00:00:00Z', sources: 38, pricePoints: 47, changes: 1 }, email: 'testyta@arvoflow.se' };

const MIME = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.map':'application/json','.woff2':'font/woff2' };
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.startsWith('/api/invoice-history')) { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify(PAYLOAD)); }
  let file = path.join(BUILD, url.replace(/^\/flow/, ''));
  if (!existsSync(file) || url === '/') file = path.join(BUILD, 'index.html');
  try { res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' }); res.end(readFileSync(file)); }
  catch { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(readFileSync(path.join(BUILD, 'index.html'))); }
});
await new Promise((r) => server.listen(4183, r));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [name, viewport] of [['desktop', { width: 1280, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4183/flow/portfolio', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);
  // Toppen av sidan (masthead → dom → bevis) — det här är där hierarkin avgörs.
  await page.screenshot({ path: `/tmp/domforst-${name}-top.png`, clip: { x: 0, y: 0, width: viewport.width, height: Math.min(viewport.height * 1.6, 1700) } });
  await page.screenshot({ path: `/tmp/domforst-${name}-full.png`, fullPage: true });
  await page.close();
  console.log(`✓ ${name}`);
}
await browser.close(); server.close();
