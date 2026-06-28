// scripts/screenshot-switch-live.mjs — renderar det RIKTIGA kontoret och fäller ut en switchbar rad
// så det nya DOM-FÖRST bytes-kortet syns i sin verkliga miljö. Verklig data (24-faktura-datasetet via
// /tmp/rows26.json). Två lägen: datum SAKNAS (sanningen idag) + datum KÄNT (framåtblickande exempel,
// injicerat avtalsdatum — märkt som exempel, aldrig committat till kunddata).
import { chromium } from 'playwright';
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const BUILD = path.resolve('build');
const { watchedCard } = await import('../api/invoice-history.mjs');
const rowsRaw = JSON.parse(readFileSync(process.env.ROWS ?? 'ops/testyta-rows.json', 'utf8'));

// Valfritt: injicera avtalsdatum på Tele2-bredband för att DEMONSTRERA datum-känt-läget.
const INJECT_DATE = process.env.INJECT_DATE; // t.ex. "2026-09-30"
const rows = rowsRaw.map((r) => (INJECT_DATE && r.category === 'bredband' && r.should_switch)
  ? { ...r, contract_end_date: INJECT_DATE } : r);

const TRIAGE = new Set(['unsupported', 'review_queue']);
const isTriaged = (r) => TRIAGE.has(r.route) || r.triage_reason != null;
const watched = rows.filter(isTriaged).map((r) => watchedCard({
  normalized_supplier: r.normalized_supplier, supplier: r.supplier, category: r.category,
  route: r.route, triage_reason: r.triage_reason,
}));
const analyses = rows.filter((r) => !isTriaged(r)).map((r, i) => ({
  id: r.id ?? i + 1, supplier: r.supplier, normalized_supplier: r.normalized_supplier, category: r.category,
  annual_cost: r.annual_cost, suggested_annual_cost: r.suggested_annual_cost,
  gross_saving: r.gross_saving, net_saving: r.net_saving, should_switch: r.should_switch,
  route: r.route ?? 'auto', industry: r.industry ?? 'it-tech', employees: r.employees ?? 10,
  billing_period: r.billing_period ?? 'monthly', created_at: r.created_at,
  seat_count: r.seat_count, price_per_seat_monthly: r.price_per_seat_monthly,
  health_score: r.health_score, lead_finding_json: r.lead_finding_json,
  contract_end_date: r.contract_end_date,
}));

// switchTargets: namngivna verifierade alternativ per kategori (samma form som API:t skickar).
const switchTargets = {
  bredband: { alternatives: [{ supplier: 'Bahnhof Företag', positioning: 'Svensk support, fast IP-adress, samma drifttrygghet — lika bra eller bättre.' }], lastVerified: '2026-06-17' },
  'saas-productivity': { alternatives: [{ supplier: 'Microsoft 365 Business Standard (årsavtal)', positioning: 'Samma sviter, årsavtal istället för rörligt — lägre pris per användare.' }], lastVerified: '2026-06-17' },
};

const VAKT = { sweptAt: '2026-06-28T00:00:00Z', sources: 38, pricePoints: 47, changes: 1 };
const PAYLOAD = { ok: true, analyses, watched, vakt: VAKT, switchTargets, email: 'testyta@arvoflow.se' };

const MIME = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.map':'application/json','.woff2':'font/woff2' };
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.startsWith('/api/invoice-history')) { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify(PAYLOAD)); }
  let file = path.join(BUILD, url.replace(/^\/flow/, ''));
  if (!existsSync(file) || url === '/') file = path.join(BUILD, 'index.html');
  try { res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' }); res.end(readFileSync(file)); }
  catch { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(readFileSync(path.join(BUILD, 'index.html'))); }
});
await new Promise((r) => server.listen(4179, r));

const tag = process.env.TAG ?? 'switch-live';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1500, height: 1000 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:4179/flow/portfolio', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

// Fäll ut switchbara innehavsrader (de med grön +kr/år-badge) + öppna deras förutsättningar.
await page.evaluate(() => {
  document.querySelectorAll('.h-badge.save').forEach((b) => {
    const head = b.closest('[aria-expanded]'); if (head) head.click();
  });
});
await page.waitForTimeout(500);
await page.evaluate(() => { document.querySelectorAll('.sv-proof').forEach((d) => { d.open = true; }); });
await page.waitForTimeout(500);

await page.screenshot({ path: `/tmp/${tag}-full.png`, fullPage: true });
// Närbild: markera SwitchVerdict-elementet (närmaste förälder med .sv-act) och element-screenshota.
const PICK = process.env.PICK; // t.ex. 'ert byte' för datum-känt-kortet
const handle = await page.evaluateHandle((pick) => {
  const cards = [...document.querySelectorAll('.sv-dom')].map((dom) => {
    let el = dom; while (el && !el.querySelector('.sv-act')) el = el.parentElement; return el;
  }).filter(Boolean);
  if (pick) return cards.find((c) => c.querySelector('.sv-eyebrow')?.textContent.toLowerCase().includes(pick)) ?? cards[0];
  return cards[0];
}, PICK);
const elem = handle.asElement();
if (elem) { await elem.scrollIntoViewIfNeeded(); await page.waitForTimeout(200); await elem.screenshot({ path: `/tmp/${tag}-card.png` }); }
console.log(`✓ ${tag} — kort beskuret: ${!!elem}`);
await browser.close(); server.close();
