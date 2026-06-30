// scripts/screenshot-forecast.mjs — renderar Maktkalenderns PROGNOS-kort i det riktiga rummet,
// med den ÄKTA Microsoft-prognosen (priceHikeForecast på de seedade, källbelagda höjningarna).
// Bevisar visuellt (regel 8) att lagret tänds för en Microsoft-kund.
import { chromium } from 'playwright';
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { priceHikeForecast } from '../lib/price-forecast.js';

const BUILD = path.resolve('build');
const { watchedCard } = await import('../api/invoice-history.mjs');
const rows = JSON.parse(readFileSync('/tmp/rows26.json', 'utf8'));

// Den ÄKTA prognosen ur de seedade höjningarna (samma som live mot prod).
const fc = priceHikeForecast([
  { changed_at: '2022-03-01', old_price_monthly: 12.50, new_price_monthly: 14.00 },
  { changed_at: '2026-07-01', old_price_annual: 150, new_price_annual: 168 },
], { supplier: 'Microsoft', today: new Date('2026-11-15') });   // Q4: båda förflutna
const forecasts = { 'microsoft|saas-productivity': { ...fc, category: 'saas-productivity' } };

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
  health_score: r.health_score, lead_finding_json: r.lead_finding_json }));

const PAYLOAD = { ok: true, analyses, watched, forecasts,
  vakt: { sweptAt: '2026-11-15T00:00:00Z', sources: 38, pricePoints: 47, changes: 0 }, email: 'testyta@arvoflow.se' };

const MIME = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.map':'application/json','.woff2':'font/woff2' };
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.startsWith('/api/invoice-history')) { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify(PAYLOAD)); }
  let file = path.join(BUILD, url.replace(/^\/flow/, ''));
  if (!existsSync(file) || url === '/') file = path.join(BUILD, 'index.html');
  try { res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' }); res.end(readFileSync(file)); }
  catch { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(readFileSync(path.join(BUILD, 'index.html'))); }
});
await new Promise((r) => server.listen(4182, r));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 880, height: 1000 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:4182/flow/portfolio', { waitUntil: 'networkidle' });
await page.waitForTimeout(1600);
await page.screenshot({ path: '/tmp/forecast-room-full.png', fullPage: true });
// Beskär prognos-kortet (FindingCard med eyebrow "Maktkalendern · prognos").
const handle = await page.evaluateHandle(() => {
  const el = [...document.querySelectorAll('*')].find((n) => /Maktkalendern · prognos/i.test(n.textContent || '') && n.className && /Finding|Card|dossier/i.test(String(n.className)));
  return el ?? [...document.querySelectorAll('*')].find((n) => /höjningstrend|höjer sannolikt/i.test(n.textContent || ''));
});
const elem = handle.asElement();
if (elem) { await elem.scrollIntoViewIfNeeded(); await page.waitForTimeout(200); await elem.screenshot({ path: '/tmp/forecast-card.png' }); }
console.log('✓ prognos-kort beskuret:', !!elem);
await browser.close(); server.close();
