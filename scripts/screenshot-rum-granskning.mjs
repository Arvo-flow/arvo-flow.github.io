// scripts/screenshot-rum-granskning.mjs — VISUELL VERIFIERING AV GRANSKNINGSÅTGÄRDERNA (regel 8).
//
// VARFÖR EN EGEN STUB (läxa 2026-08-14): en tidigare skärmdump togs mot en payload som SAKNADE
// fält domen räknas ur — och bilden avvek "markant" från kundens verkliga rum. En stub som inte
// matar samma tillstånd som produktionen mäter inte produktionen, hur fin bilden än är (samma
// sjukdom som E2E-harnesset i LFL-obduktionen).
//
// Payloaden här återskapar därför EXAKT det tillstånd grundarens fyra skärmbilder visade:
//   · fem prissatta fakturor, ingen med should_switch → domen går in i FYND-grenen
//   · ett forensiskt fynd (iPad-avbetalningen, månad 38/36) som bär domens rubriktal
//   · fyra bevakade fakturor i tre slag — inklusive balansfelet på Slack/Salesforce
//   · vakten med kedja + allClear, som radarn och kvittot delar på
// Så kan före/efter jämföras mot hans egna bilder, inte mot en idealiserad variant.
import { chromium } from 'playwright';
import http from 'http';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { refineFinding } from '../lib/forensics.js';

const BUILD = path.resolve('build');

const A = (id, supplier, category, annual, created, extra = {}) => ({
  id, supplier, normalized_supplier: supplier, category,
  annual_cost: annual, suggested_annual_cost: null, gross_saving: null, net_saving: null,
  should_switch: false, route: 'auto', industry: 'it-tech', employees: 12,
  billing_period: 'monthly', created_at: created, ...extra,
});

// Fyndet lagras i lead_finding_json. Vi kör det genom SAMMA refineFinding som api/invoice-history
// använder vid läsning — annars visar bilden en text produktionen aldrig skickar.
const IPAD = refineFinding({
  type: 'hardware_overpaid', severity: 'high', annualImpact: 3480, monthly: 290,
  lineDescription: 'Delbetalning iPad Air (Manad 38/36)',
  title: 'Avbetald hårdvara — ni betalar för utrustning ni redan äger',
  text: '(gammal lagrad text — ska skrivas om av refineFinding)',
});

const ANALYSES = [
  A(1, 'Telia',        'mobil',              119520, '2026-08-14T09:00:00Z', { health_score: 96, lead_finding_json: IPAD }),
  A(2, 'Tre Foretag',  'mobil',               14940, '2026-08-14T09:01:00Z', { health_score: 96 }),
  A(3, 'Google',       'saas-productivity',   72900, '2026-08-14T09:02:00Z', { health_score: 75 }),
  A(4, 'Microsoft',    'saas-productivity',   45600, '2026-08-14T09:03:00Z', { health_score: 92 }),
  A(5, 'Tele2',        'mobil',               35880, '2026-08-14T09:04:00Z', { health_score: 96 }),
];

// Bevakade — samma fyra slag rummet visade. Formen är watchedCard():s utdata.
const WATCHED = [
  { supplier: 'Slack Technologies', category: null, reasonCode: 'radsumma', kind: 'Fakturan går inte ihop',
    headline: 'Fakturans egna tal stämmer inte — vi prissätter inte på ett osäkert underlag',
    detail: 'Raderna summerar inte till fakturans totalbelopp. Innan vi vet vilket tal som gäller sätter vi ingen siffra alls — en jämförelse mot fel underlag är värre än ingen jämförelse.',
    action: 'Vi läser om fakturan manuellt och återkommer.' },
  { supplier: 'Salesforce.com', category: null, reasonCode: 'radsumma', kind: 'Fakturan går inte ihop',
    headline: 'Fakturans egna tal stämmer inte — vi prissätter inte på ett osäkert underlag',
    detail: 'Raderna summerar inte till fakturans totalbelopp. Innan vi vet vilket tal som gäller sätter vi ingen siffra alls — en jämförelse mot fel underlag är värre än ingen jämförelse.',
    action: 'Vi läser om fakturan manuellt och återkommer.' },
  { supplier: 'Binero Group AB', category: null, reasonCode: 'no_benchmark', kind: 'Fragmenterad marknad',
    headline: 'Ingen verifierad prisnivå ännu — under bevakning',
    detail: 'Webbhotell, domän och hosting är en splittrad marknad utan ett verifierat svenskt golv vi kan jämföra mot. Vi flaggar hellre än gissar.',
    action: 'Ladda upp avtalet/specen så bygger vi en ärlig jämförelse.' },
  { supplier: 'Fortnox AB', category: null, reasonCode: 'review_queue', kind: 'Ej prissatt kategori',
    headline: 'Mottagen och klassad — men utan verifierat golv att prissätta mot',
    detail: 'Vi såg fakturan och la den under uppsikt. Vi sätter ingen siffra förrän vi har en verifierad marknadsreferens — aldrig en gissning.',
    action: 'Under bevakning — vi prissätter så snart ett verifierat golv finns.' },
];

const VAKT = { sweptAt: '2026-08-14T21:25:00Z', sources: 36, streakNights: 8, allClear: true };

// Branschankaret ska nu bära igen — mobil finns i BRANCH_ANCHOR_UNIT och i BRANCHINDEX real-public.
const BRANCH_ANCHORS = {
  mobil: { category: 'mobil', median: 3588, p25: 3588, source: 'real-public',
    unitLabel: 'per abonnemang/år', unitNoun: 'abonnemang', unitNounPl: 'abonnemang',
    customerCost: 119520, seats: 30 },
};

const PAYLOAD = {
  ok: true, analyses: ANALYSES, watched: WATCHED, vakt: VAKT,
  branchAnchors: BRANCH_ANCHORS, cohort: {}, publicBench: {}, forecasts: {}, movements: {},
  switchTargets: {}, ingesting: 0, ingestFailed: 0, ingestFailedFiles: [],
  email: 'granskning@arvoflow.se', frånDennaEnhet: 0,
};

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
for (const [name, viewport] of [['desktop', { width: 1600, height: 1000 }], ['mobil', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:4176/flow/portfolio', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `/tmp/rum-${name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
server.close();
console.log('Klart: /tmp/rum-desktop.png + /tmp/rum-mobil.png');
console.log(`Fyndets text (efter refineFinding): ${IPAD.text}`);
