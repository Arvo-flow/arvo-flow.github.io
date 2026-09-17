// scripts/screenshot-tystnaden.mjs — visuell verifiering av att de tysta cellerna TALAR.
// Regel 8: mobil (390px) OCH desktop (1600px) före push. Användaren är aldrig vår QA.
//
// ⚠️ KORTEN BYGGS AV PRODUKTIONENS EGEN `watchedCard`, inte för hand. Ett skript som skriver sin
// egen payload skulle screenshotta MIN text, inte kodens — och «mekanismen prövad, matningen
// aldrig» är bibelns mest upprepade sjukdom.
//
// ⚠️⚠️ OCH JAG GICK I DEN ÄNDÅ, ETT LED UPP (granskningen 2026-09-17, fynd F2). Funktionen är
// produktionens — men INDATAN är det inte. `triage_reason: 'no_benchmark'` sätts bara inuti
// `if (!catDef)` i api/test-invoice.mjs, alltså när kategorin SAKNAS i prisboken. Alla fem
// kategorierna nedan FINNS där. Produktionen kan därför inte producera en enda av de här
// raderna, och bilden visar fem kort ingen kund kan få.
//
// Raden ovan var alltså sann om FUNKTIONEN och falsk om BEVISET. Villkorsvaktens sjukdom, i det
// verktyg jag byggde för att slippa den: mekanismen svarar rätt när den matas, monterad på en
// signal som aldrig kan röra sig. Skriptet står kvar OKÖRT som preparat tills inkopplingen sitter
// på en väg produktionen faktiskt tar — och tills dess är dess utdata ingen verifiering.
import { chromium } from 'playwright';
import http from 'http';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { watchedCard } from '../api/invoice-history.mjs';

const BUILD = path.resolve('build');

// Fyra triagade fakturor som täcker ALLA fyra utfallen registret kan ge. Motprovet
// (faktura-tjanst) är med i bild: ser alla kort likadana ut har registret svalt allt.
const TRIAGE = [
  { id: 101, supplier: 'Securitas Sverige AB',  category: 'larm-bevakning',  triage_reason: 'no_benchmark', route: 'unsupported', invoice_number: 'SEC-2026-0841' },
  { id: 102, supplier: 'Företagshälsan Väst AB', category: 'foretagshalsovard', triage_reason: 'no_benchmark', route: 'unsupported', invoice_number: 'FHV-11204' },
  { id: 103, supplier: 'Städbolaget i Syd AB',  category: 'städ-rengöring',  triage_reason: 'no_benchmark', route: 'unsupported', invoice_number: '2026-3391' },
  { id: 104, supplier: 'Pipedrive OÜ',          category: 'saas-crm',        triage_reason: 'no_benchmark', route: 'unsupported', invoice_number: 'PD-88201' },
  { id: 105, supplier: 'Billogram AB',          category: 'faktura-tjanst',  triage_reason: 'no_benchmark', route: 'unsupported', invoice_number: 'BG-45512' },
];

const A = (id, supplier, category, annual, suggested, net, created) => ({
  id, supplier, normalized_supplier: supplier.toLowerCase(), category,
  annual_cost: annual, suggested_annual_cost: suggested,
  gross_saving: suggested ? annual - suggested : null, net_saving: net,
  should_switch: net != null && net > 0, route: 'auto', industry: 'it-tech', employees: 50,
  billing_period: 'monthly', created_at: created,
});

// Ett par prissatta rader så rummet inte ser ut som ett rent felläge — tystnadskorten ska ses
// i sitt verkliga sammanhang, bredvid det som FAKTISKT prissatts.
const ANALYSES = [
  A(1, 'IT-Partner Sverige AB', 'saas-productivity', 184680, 152602, 25662, '2026-09-12T08:00:00Z'),
  A(2, 'Telia Sverige AB',      'mobil',              58092,  50304,  6230, '2026-09-11T06:00:00Z'),
];

const VAKT = { sweptAt: '2026-09-16T03:14:00Z', sources: 40, pricePoints: 47, changes: 0 };

const PAYLOAD = {
  ok: true,
  analyses: ANALYSES,
  watched: TRIAGE.map((a) => watchedCard(a)),   // ← produktionens funktion, inte min text
  branchAnchors: {}, movements: {}, vakt: VAKT,
  email: 'ekonomi@exempelbolaget.se',
};

// Kvittot i terminalen: vilka kort som faktiskt byggdes, så ett tomt rum inte kan misstas för
// «allt ser bra ut». Ett grönt som betyder «jag tittade inte» är farligare än ett rött.
console.log('\nKORT SOM RENDERAS (ur watchedCard):');
for (const w of PAYLOAD.watched) console.log(`  · ${String(w.category).padEnd(20)} → ${w.kind}`);
const kinds = new Set(PAYLOAD.watched.map((w) => w.kind));
if (kinds.size < 4) {
  console.error(`\n✗ Bara ${kinds.size} skilda korttyper — bilden kan inte visa skillnaden registret gör.`);
  process.exit(1);
}

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

await new Promise((r) => server.listen(4176, r));

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
for (const [name, viewport] of [['desktop', { width: 1600, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:4176/flow/portfolio', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `/tmp/tystnaden-${name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
server.close();
console.log('\nKlart: /tmp/tystnaden-desktop.png + /tmp/tystnaden-mobile.png\n');
