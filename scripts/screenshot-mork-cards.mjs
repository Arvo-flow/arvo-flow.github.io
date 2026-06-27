// scripts/screenshot-mork-cards.mjs — renderar de tre Mörker-fynden genom den ÄKTA byggda
// dossier-FindingCard:en i det riktiga Arvo-kontoret (build/), inte en handkodad repro.
// Datan kommer ur RIKTIGA detectForensicFindings; komponenten + temat + typsnitten är produktionens.
// Kör: node scripts/screenshot-mork-cards.mjs
import { chromium } from 'playwright';
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { detectForensicFindings } from '../lib/forensics.js';

const BUILD = path.resolve('build');
const OUT = '/tmp/mork-cards';
mkdirSync(OUT, { recursive: true });

// De tre vassaste asymmetriska fynden — exakt grundarens arketyp-rader.
const L = (description, amount, quantity) => ({ type: 'recurring_subscription', description, amount, quantity });
const SCENARIOS = [
  { tag: 'iphone',  supplier: 'Tre Företag AB', category: 'mobil',
    lines: [L('3Företag Obegränsad', 349, 12), L('Delbetalning iPhone 13 (Månad 37/36)', 560, 2), L('Pappersfaktura', 49, 1)] },
  { tag: 'fx',      supplier: 'HubSpot Inc.', category: 'saas-crm',
    lines: [L('Marketing Hub Professional', 890, 1), L('Foreign Transaction / Currency Conversion Fee', 28.5, 1)] },
  { tag: 'junk',    supplier: 'Telia Sverige AB', category: 'mobil',
    lines: [L('Företagsabonnemang 50GB', 299, 80), L('Faktureringsavgift Papper', 49, 1)] },
];

const lead = (lines) => detectForensicFindings(lines, { periodMultiplier: 12 })[0];

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.map': 'application/json', '.woff2': 'font/woff2' };

let PAYLOAD = { ok: true, analyses: [], email: 'ekonomi@lynxeye.se' };

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.startsWith('/api/invoice-history')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(PAYLOAD));
  }
  let file = path.join(BUILD, url.replace(/^\/flow/, ''));
  if (!existsSync(file) || url === '/') file = path.join(BUILD, 'index.html');
  try {
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(readFileSync(path.join(BUILD, 'index.html')));
  }
});
await new Promise((r) => server.listen(4176, r));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

for (const s of SCENARIOS) {
  const finding = lead(s.lines);
  if (!finding) { console.log(`⚠ ${s.tag}: inget fynd`); continue; }
  // En auto-analys som bär fyndet i lead_finding_json — exakt vad api/invoice-history skickar.
  PAYLOAD = {
    ok: true, email: 'ekonomi@lynxeye.se',
    analyses: [{
      id: 1, supplier: s.supplier, normalized_supplier: s.supplier.toLowerCase(), category: s.category,
      annual_cost: 120000, suggested_annual_cost: null, gross_saving: null, net_saving: null,
      should_switch: false, route: 'auto', industry: 'it-tech', employees: 50,
      billing_period: 'monthly', created_at: '2026-06-25T09:00:00Z', lead_finding_json: finding,
    }],
  };
  for (const [name, viewport] of [['desktop', { width: 1600, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
    await page.goto('http://localhost:4176/flow/portfolio', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    // Krop till den ÄKTA dossier-kortssektionen (innehåller fyndets rubrik).
    const card = page.locator('section', { hasText: finding.title }).first();
    try {
      await card.scrollIntoViewIfNeeded();
      await card.screenshot({ path: `${OUT}/${s.tag}-${name}.png` });
      console.log(`✓ ${s.tag} ${name}`);
    } catch (e) {
      await page.screenshot({ path: `${OUT}/${s.tag}-${name}-full.png`, fullPage: true });
      console.log(`… ${s.tag} ${name}: kort ej isolerat (${e.message}) → helsida`);
    }
    await page.close();
  }
}

// En helsidesvy i kontext (iPhone-fyndet) — så det riktiga mörka kontoret syns runt kortet.
PAYLOAD = {
  ok: true, email: 'ekonomi@lynxeye.se',
  analyses: [{
    id: 1, supplier: 'Tre Företag AB', normalized_supplier: 'tre företag ab', category: 'mobil',
    annual_cost: 269460, suggested_annual_cost: null, gross_saving: null, net_saving: null,
    should_switch: false, route: 'auto', industry: 'it-tech', employees: 50,
    billing_period: 'monthly', created_at: '2026-06-25T09:00:00Z', lead_finding_json: lead(SCENARIOS[0].lines),
  }],
  vakt: { sweptAt: '2026-06-25T21:00:00Z', sources: 38, pricePoints: 47, changes: 1 },
};
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:4176/flow/portfolio', { waitUntil: 'networkidle' });
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}/kontoret-kontext.png`, fullPage: true });
await page.close();
console.log('✓ kontoret-kontext (helsida)');

await browser.close();
server.close();
console.log(`Klart → ${OUT}`);
