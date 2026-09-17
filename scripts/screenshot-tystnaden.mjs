// scripts/screenshot-tystnaden.mjs — visuell verifiering av att de tysta cellerna TALAR.
// Regel 8: mobil (390px) OCH desktop (1600px) före push. Användaren är aldrig vår QA.
//
// ⚠️ KORTEN BYGGS AV PRODUKTIONENS EGEN `watchedCard`, inte för hand. Ett skript som skriver sin
// egen payload skulle screenshotta MIN text, inte kodens — och «mekanismen prövad, matningen
// aldrig» är bibelns mest upprepade sjukdom.
//
// ⚠️⚠️ FÖRSTA VERSIONEN MATADE ETT SKÄL PRODUKTIONEN INTE KAN SÄTTA (granskningens F2).
// `no_benchmark` sätts bara inuti `if (!catDef)` — när kategorin SAKNAS i prisboken — och alla
// deklarerade kategorier finns där. Bilden visade fem kort ingen kund kunde få.
//
// RÄTTAT MOT MÄTNING: probe-rumsmotsagelsen körde mot produktionsdatabasen 2026-09-17 och fann
// sex triagade rader i de tysta kategorierna, ALLA med `volume_data_required`, fördelade på
// transport-frakt, utrustningsleasing, serverhosting och städ-rengöring. Fixturerna nedan ÄR de
// fyra kategorierna med det skälet. Skriptet avslutar 1 om något kort faller till reservkortet —
// då når registret inte fram och bilden vore en lögn igen.
import { chromium } from 'playwright';
import http from 'http';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { watchedCard } from '../api/invoice-history.mjs';
import { byggPrisunderlag, scoreUrUnderlag } from '../lib/prisunderlag.js';

const BUILD = path.resolve('build');

// Fyra triagade fakturor som täcker ALLA fyra utfallen registret kan ge. Motprovet
// (faktura-tjanst) är med i bild: ser alla kort likadana ut har registret svalt allt.
const TRIAGE = [
  { id: 101, supplier: 'Sydfrakt Logistik AB',   category: 'transport-frakt',    triage_reason: 'volume_data_required', route: 'review_queue', invoice_number: 'SF-2026-0841' },
  { id: 102, supplier: 'Dustin Sverige AB',      category: 'utrustningsleasing', triage_reason: 'volume_data_required', route: 'review_queue', invoice_number: 'DU-11204' },
  { id: 103, supplier: 'GleSYS AB',              category: 'serverhosting',      triage_reason: 'volume_data_required', route: 'review_queue', invoice_number: 'GL-3391' },
  { id: 104, supplier: 'Städbolaget i Syd AB',   category: 'städ-rengöring',     triage_reason: 'volume_data_required', route: 'review_queue', invoice_number: 'ST-88201' },
];

const A = (id, supplier, category, annual, suggested, net, seats, created) => ({
  id, supplier, normalized_supplier: supplier.toLowerCase(), category,
  annual_cost: annual, suggested_annual_cost: suggested,
  gross_saving: suggested ? annual - suggested : null, net_saving: net,
  // ⚠️ `seat_count` OCH ett branschankare är vad `byggPrisunderlag` FAKTISKT kräver — mätt, inte
  // antaget: den läser aldrig radposter. Utan dem räknas raden som «mottagen, inte prissatt» och
  // rummet visar «Vi jämförde 0 fakturor» bredvid en summerad besparing. Det var precis vad min
  // förra bild gjorde, och jag höll på att rapportera det som ett produktionsfel.
  // Sonden mätte produktionen 2026-09-17: fyra rader med besparing, NOLL utan seat_count
  // (22 · 1 · 1 · 58). Stubben speglar därför det tillstånd produktionen faktiskt är i.
  seat_count: seats,
  should_switch: net != null && net > 0, route: 'auto', industry: 'it-tech', employees: 50,
  billing_period: 'monthly', created_at: created,
});

const ANALYSES = [
  A(1, 'IT-Partner Sverige AB', 'saas-productivity', 184680, 152602, 25662, 58, '2026-09-12T08:00:00Z'),
  A(2, 'Telenor Sverige AB',    'mobil',              58092,  50304,  6230, 22, '2026-09-11T06:00:00Z'),
];

// Ankarna som produktionen bygger för dessa kategorier (BRANCH_ANCHOR_UNIT + real-public golv).
const BRANCH_ANCHORS = {
  'saas-productivity': { category: 'saas-productivity', median: 2040, p25: 1704, source: 'real-public', unitLabel: 'per användare/år', unitNoun: 'användare', unitNounPl: 'användare', customerCost: 184680, seats: 58 },
  mobil:               { category: 'mobil',             median: 3588, p25: 3348, source: 'real-public', unitLabel: 'per abonnemang/år', unitNoun: 'abonnemang', unitNounPl: 'abonnemang', customerCost: 58092, seats: 22 },
};

const VAKT = { sweptAt: '2026-09-16T03:14:00Z', sources: 40, pricePoints: 47, changes: 0 };

// ⚠️ SKRIPTET STUBBAR HTTP-SVARET och kör därför ALDRIG handlern som BYGGER `prisunderlag`.
// Följden var «0 prissatta» bredvid en summerad besparing i bild efter bild — och jag höll på att
// rapportera det som ett produktionsfel. Underlaget byggs nu med SAMMA funktioner handlern
// använder (byggPrisunderlag + scoreUrUnderlag), precis som korten byggs med watchedCard. Ett
// skript som hoppar över ett produktionssteg fotograferar ett tillstånd produktionen aldrig är i.
for (const a of ANALYSES) {
  a.prisunderlag = byggPrisunderlag({
    annualCost: a.annual_cost, seats: a.seat_count,
    ankare: BRANCH_ANCHORS[a.category] ?? null, niva: null,
  });
  a.arvoScore = scoreUrUnderlag(a.prisunderlag);
}
const utanUnderlag = ANALYSES.filter((a) => !a.prisunderlag);
if (utanUnderlag.length) {
  console.error(`\n✗ ${utanUnderlag.length} analys(er) fick inget prisunderlag — rummet skulle visa`);
  console.error('  «0 prissatta» bredvid en besparing, och bilden vore en lögn om produktionen.');
  process.exit(1);
}

const PAYLOAD = {
  ok: true,
  analyses: ANALYSES,
  watched: TRIAGE.map((a) => watchedCard(a)),   // ← produktionens funktion, inte min text
  branchAnchors: BRANCH_ANCHORS, movements: {}, vakt: VAKT,
  email: 'ekonomi@exempelbolaget.se',
};

// Kvittot i terminalen: vilka kort som faktiskt byggdes, så ett tomt rum inte kan misstas för
// «allt ser bra ut». Ett grönt som betyder «jag tittade inte» är farligare än ett rött.
console.log('\nKORT SOM RENDERAS (ur watchedCard):');
for (const w of PAYLOAD.watched) console.log(`  · ${String(w.category).padEnd(20)} → ${w.kind}`);
const kinds = new Set(PAYLOAD.watched.map((w) => w.kind));
if (kinds.has('Under granskning') || kinds.has('Ej prissatt kategori')) {
  console.error('\n✗ Något kort föll till reservkortet — registret nås inte. Bilden vore en lögn.');
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
