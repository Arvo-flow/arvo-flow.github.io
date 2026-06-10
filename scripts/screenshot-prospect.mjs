// scripts/screenshot-prospect.mjs — lokal visuell verifiering av Prospect-sidan.
// Servar build/ statiskt, stubbar /api/prospect med riktig payload, tar skärmdumpar.
import { chromium } from 'playwright';
import http from 'http';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

const BUILD = path.resolve('build');
const PAYLOAD = {
  ok: true,
  prospect: {
    companyName: 'Lynxeye AB', industry: 'Konsultverksamhet', segment: 'byraer',
    sizeBucket: 'mid', employees: 50,
    estimates: {
      findings: [
        'Ni betalar vali.email för att bevaka er e-postdomän — men skyddet som bevakningen ska styra har aldrig slagits på. En betald tjänst vars värde står outnyttjat.',
        'Domän registrerad april 2000 — 26 års obruten digital närvaro',
      ],
      categories: [
        { label: 'Microsoft 365-licenser', source: 'real-public', category: 'm365', savingLow: 31500, arvoAnnual: 75000, savingHigh: 58500, sourceNote: 'Källa: microsoft.com/sv-se verifierade årsavtalspriser, maj 2026', typicalLow: 85000, pricePerSim: { arvo: 125, typical: 200 }, typicalHigh: 120000, estimatedSims: 50, savingCentral: 45000 },
        { label: 'Mobilabonnemang', source: 'real-public', category: 'mobil', savingLow: 19500, arvoAnnual: 165000, savingHigh: 36000, sourceNote: 'Källa: Tele2 Företag verifierade listpriser, juni 2026', typicalLow: 164000, pricePerSim: { arvo: 299, typical: 349 }, typicalHigh: 221500, estimatedSims: 46, savingCentral: 27500 },
      ],
      mxPlatform: 'microsoft365', foundedYear: 1999, hasEstimates: true,
      totalSavingLow: 51000, totalSavingHigh: 94500, domainRegistered: '2000-04-04', totalSavingCentral: 72500,
    },
    generatedAt: '2026-06-10T04:51:16.733Z',
  },
};

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.map': 'application/json', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.startsWith('/api/prospect')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(PAYLOAD));
  }
  // Bygget är rotat på /flow (homepage i package.json) — mappa om
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

await new Promise(r => server.listen(4173, r));

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
for (const [name, viewport] of [['desktop', { width: 1600, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:4173/flow/prospect/TESTTOKEN', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800); // låt entrance-animationerna landa
  await page.screenshot({ path: `/tmp/prospect-${name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
server.close();
console.log('Klart: /tmp/prospect-desktop.png + /tmp/prospect-mobile.png');
