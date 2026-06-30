// scripts/screenshot-acting-fix.mjs — bevisar live (regel 8) att domen INTE längre ljuger mot sitt
// eget bevis. Exakt grundarens fall: ett kostsamt forensik-fynd (avbetald hårdvara) men NOLL
// tillgängliga leverantörsbyten. Förr: H1 sa "Allt är under kontroll". Nu: domen erkänner fyndet.
import { chromium } from 'playwright';
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const BUILD = path.resolve('build');
const { watchedCard } = await import('../api/invoice-history.mjs');
const rowsRaw = JSON.parse(readFileSync('/tmp/rows26.json', 'utf8'));

// Tvinga ALLA rader till "rätt prissatt" (inga byten) — utom EN som bär forensik-fyndet.
const rows = rowsRaw.map((r, i) => {
  const base = { ...r, should_switch: false, net_saving: 0, suggested_annual_cost: null };
  if (i === 0) return { ...base, lead_finding_json: { text: 'Raden "Delbetalning iPad Air (Manad 38/36)" visar månad 38 av 36 — avbetalningen är redan slutbetald. Posten ska bort från nästa faktura.', type: 'hardware_overpaid', title: 'Avbetald hårdvara — ni betalar för utrustning ni redan äger', monthly: 1400, severity: 'high', negotiable: true, annualImpact: 16800, lineDescription: 'Delbetalning iPad 14 Pro (Manad 38/36)' } };
  return { ...base, lead_finding_json: null };
});

const TRIAGE = new Set(['unsupported', 'review_queue']);
const isTriaged = (r) => TRIAGE.has(r.route) || r.triage_reason != null;
const watched = rows.filter(isTriaged).map((r) => watchedCard({
  normalized_supplier: r.normalized_supplier, supplier: r.supplier, category: r.category,
  route: r.route, triage_reason: r.triage_reason }));
const analyses = rows.filter((r) => !isTriaged(r)).map((r, i) => ({
  id: r.id ?? i + 1, supplier: r.supplier, normalized_supplier: r.normalized_supplier, category: r.category,
  annual_cost: r.annual_cost, suggested_annual_cost: r.suggested_annual_cost,
  gross_saving: 0, net_saving: r.net_saving, should_switch: r.should_switch,
  route: r.route ?? 'auto', industry: r.industry ?? 'it-tech', employees: r.employees ?? 10,
  billing_period: r.billing_period ?? 'monthly', created_at: r.created_at,
  seat_count: r.seat_count, price_per_seat_monthly: r.price_per_seat_monthly,
  health_score: r.health_score ?? 88, lead_finding_json: r.lead_finding_json, contract_end_date: r.contract_end_date }));

const PAYLOAD = { ok: true, analyses, watched,
  vakt: { sweptAt: '2026-06-30T00:00:00Z', sources: 38, pricePoints: 47, changes: 0 }, email: 'testyta@arvoflow.se' };

const MIME = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.map':'application/json','.woff2':'font/woff2' };
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.startsWith('/api/invoice-history')) { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify(PAYLOAD)); }
  let file = path.join(BUILD, url.replace(/^\/flow/, ''));
  if (!existsSync(file) || url === '/') file = path.join(BUILD, 'index.html');
  try { res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' }); res.end(readFileSync(file)); }
  catch { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(readFileSync(path.join(BUILD, 'index.html'))); }
});
await new Promise((r) => server.listen(4184, r));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 1300 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:4184/flow/portfolio', { waitUntil: 'networkidle' });
await page.waitForTimeout(1600);
await page.screenshot({ path: '/tmp/acting-fix-top.png', clip: { x: 0, y: 0, width: 1280, height: 1300 } });
console.log('✓ acting-fix render klar');
await browser.close(); server.close();
