/**
 * Playwright — ~60s demovideo av Arvo Flow
 * Flöde: landningssida → /testa-faktura → Ricoh PDF → (mock AI) → formulär → fullmakt → skicka
 *
 * Kör: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node scripts/record-demo.mjs
 * Kräver: npm start körs på localhost:3000
 * Output: /tmp/arvo-demo.webm
 */

import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RICOH_PDF = path.resolve(__dirname, '../test-pdfs/ricoh.pdf');
const VIDEO_DIR = '/tmp/arvo-demo-frames';
const BASE      = 'http://localhost:3000/flow';

const RICOH_MOCK = {
  ok: true, route: 'auto',
  extracted: {
    supplier: 'Ricoh Sverige AB', amount: 13200, recurringAmount: 9800,
    variableCharges: 4200, oneTimeFees: 0, annualCost: 156000,
    date: '2026-04-30', lineItems: [], billingPeriod: 'monthly',
    recurring: true, confidenceScore: 0.95, seatCount: null,
  },
  categorized: {
    category: 'skrivarleasing', subType: 'Managed Print Service',
    normalizedSupplier: 'Ricoh', confidence: 0.97,
    reasoning: 'Managed Print-avtal med fast maskinhyra och rörliga klickkostnader.',
    licensePending: false,
  },
  recommendation: {
    shouldSwitch: false, requiresQuote: true,
    suggestedSupplier: null, suggestedAnnualCost: null,
    grossSaving: null, arvoFee: null, netSaving: null, confidence: 0.0,
    reasoning:
      'Era utskriftskostnader drivs av hög volym på färgutskrifter, inte bara ' +
      'maskinhyran. Arvo behöver analysera ert snitt över 3–6 månader för att ' +
      'förhandla fram ett rättvist klick-avtal med en kvalificerad Print-leverantör.',
    switchSteps: [], licenseOverage: 0, overageSavings: 0,
  },
  timing: { extractMs: 3800, categorizeMs: 720, recommendMs: 1100, totalMs: 5620 },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const CURSOR_CSS = `
  #pw-cursor {
    position: fixed; width: 22px; height: 22px; border-radius: 50%;
    background: rgba(91,214,202,0.88); border: 2.5px solid #1B7A6E;
    pointer-events: none; z-index: 999999;
    box-shadow: 0 2px 12px rgba(27,122,110,0.4);
    transform: translate(-50%,-50%);
    transition: transform 0.1s ease, background 0.1s ease;
  }
  #pw-cursor.clicking { transform: translate(-50%,-50%) scale(0.62); background: rgba(27,122,110,0.95); }
`;

async function injectCursor(page) {
  await page.addStyleTag({ content: CURSOR_CSS });
  await page.evaluate(() => {
    const el = document.createElement('div');
    el.id = 'pw-cursor';
    document.body.appendChild(el);
    document.addEventListener('mousemove', (e) => {
      el.style.left = e.clientX + 'px';
      el.style.top  = e.clientY + 'px';
    });
    document.addEventListener('mousedown', () => el.classList.add('clicking'));
    document.addEventListener('mouseup',   () => el.classList.remove('clicking'));
  });
}

async function move(page, x, y, steps = 30) {
  await page.mouse.move(x, y, { steps });
}

async function moveToEl(page, selector, dx = 0, dy = 0) {
  const box = await page.locator(selector).first().boundingBox({ timeout: 8000 });
  if (!box) return null;
  await page.mouse.move(box.x + box.width / 2 + dx, box.y + box.height / 2 + dy, { steps: 32 });
  return box;
}

async function smoothScroll(page, targetY, ms = 900) {
  const startY = await page.evaluate(() => window.scrollY);
  const steps  = Math.ceil(ms / 16);
  for (let i = 1; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), startY + (targetY - startY) * (i / steps));
    await page.waitForTimeout(16);
  }
}

async function typeSlowly(page, selector, text, delay = 62) {
  await page.locator(selector).first().click();
  await page.waitForTimeout(120);
  for (const ch of text) {
    await page.keyboard.type(ch);
    await page.waitForTimeout(delay + Math.random() * 35 - 17);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

fs.mkdirSync(VIDEO_DIR, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

const context = await browser.newContext({
  viewport:    { width: 1280, height: 720 },
  recordVideo: { dir: VIDEO_DIR, size: { width: 1280, height: 720 } },
  locale:      'sv-SE',
  colorScheme: 'light',
});

// Catch-all route interceptor — mock API, pass rest through
await context.route('**', async (route) => {
  const url = route.request().url();
  if (url.includes('/api/test-invoice')) {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(RICOH_MOCK) });
  } else if (url.includes('/api/')) {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  } else {
    await route.continue().catch(() => {});
  }
});

const page = await context.newPage();
await page.setDefaultTimeout(15_000);

console.log('🎬  Inspelning startad…');

// ── 1. Landningssida (0–9 s) ──────────────────────────────────────────────────
console.log('  [0s] Landningssida…');
await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 15000 });
await injectCursor(page);
await move(page, 640, 360);
await page.waitForTimeout(1800);

// Scrolla ner (visa värdeproposition)
await smoothScroll(page, 480, 1300);
await page.waitForTimeout(1200);

// Hover på "Testa med en faktura"-länken
await moveToEl(page, 'a:has-text("Testa med en faktura")');
await page.waitForTimeout(700);

// ── 2. Klicka CTA → /testa-faktura (9–14 s) ───────────────────────────────────
console.log('  [9s] Klickar "Testa med en faktura"…');
await page.locator('a:has-text("Testa med en faktura")').first().click();
await page.waitForURL(/testa-faktura/, { timeout: 8000 }).catch(() => {});
await page.waitForLoadState('networkidle').catch(() => {});
await injectCursor(page);
await move(page, 640, 300);
await page.waitForTimeout(1200);

// ── 3. Upload-animation (14–22 s) ─────────────────────────────────────────────
console.log('  [14s] Laddar upp Ricoh-faktura…');

// Hover mot dropzone
await move(page, 200, 600, 20);
await page.waitForTimeout(300);
await move(page, 640, 380, 45);  // "dra in" mot center
await page.waitForTimeout(600);
await move(page, 640, 360, 15);
await page.waitForTimeout(300);

// Sätt filen
await page.locator('input[type="file"]').first().setInputFiles(RICOH_PDF, { noWaitAfter: true });
await page.waitForTimeout(800);

// Sätt antal anställda (25 — realistiskt SMB)
await page.locator('input[type="number"]').first().fill('25');
await page.waitForTimeout(400);

// Hover på "Analysera"-knappen
await moveToEl(page, 'button:has-text("Analysera")');
await page.waitForTimeout(600);

// ── 4. Klicka Analysera (22–28 s) ─────────────────────────────────────────────
console.log('  [22s] Klickar Analysera…');
await page.locator('button:has-text("Analysera")').first().click();
await page.waitForTimeout(400);

// Scrolla upp lite — analysfasen visas
await smoothScroll(page, 0, 400);
await page.waitForTimeout(2500);  // visa spinner/progress

// Vänta på resultat
await page.waitForSelector('h2', { timeout: 12_000 });
console.log('  Resultat synligt!');
await page.waitForTimeout(1200);

// ── 5. Scrolla till formuläret (28–33 s) ──────────────────────────────────────
console.log('  [28s] Rullar till offertformulär…');
const nameBox = await page.locator('input[placeholder="Ditt namn"]').first().boundingBox().catch(() => null);
if (nameBox) await smoothScroll(page, Math.max(0, nameBox.y - 180), 900);
await page.waitForTimeout(900);

// Hover på formuläret (visa att det är interaktivt)
await moveToEl(page, 'input[placeholder="Ditt namn"]');
await page.waitForTimeout(500);

// ── 6. Fyll i kontaktuppgifter (33–46 s) ──────────────────────────────────────
console.log('  [33s] Fyller i formulär…');
await typeSlowly(page, 'input[placeholder="Ditt namn"]',  'Anna Lindqvist', 65);
await page.waitForTimeout(320);

await moveToEl(page, 'input[placeholder="Företag"]');
await page.waitForTimeout(280);
await typeSlowly(page, 'input[placeholder="Företag"]',    'Bygg & Maskin AB', 58);
await page.waitForTimeout(320);

await moveToEl(page, 'input[placeholder*="offert"]');
await page.waitForTimeout(280);
await typeSlowly(page, 'input[placeholder*="offert"]',    'anna@byggmaskin.se', 52);
await page.waitForTimeout(500);

// ── 7. Fullmakts-checkbox (46–54 s) ───────────────────────────────────────────
console.log('  [46s] Kryssar fullmakts-checkbox…');
const mandateBox = await moveToEl(page, '.qlf-mandate');
await page.waitForTimeout(800);

// Klicka på checkboxen
await page.locator('.qlf-mandate input[type="checkbox"]').first().click();
await page.waitForTimeout(1000);

// ── 8. Submit (54–60 s) ────────────────────────────────────────────────────────
console.log('  [54s] Klickar "Starta offertprocessen"…');
await moveToEl(page, 'button:has-text("Starta offertprocessen")');
await page.waitForTimeout(500);
await page.locator('button:has-text("Starta offertprocessen")').first().click();

// Vänta på bekräftelse
await page.waitForTimeout(2000);
try {
  await page.waitForSelector('.qlf-sent', { timeout: 5000 });
  console.log('  ✅  Bekräftelse-meddelande synligt');
} catch {
  console.log('  (bekräftelse timeout — fortsätter)');
}

// Håll sista bilden
await page.waitForTimeout(3000);

// ── Avslut ─────────────────────────────────────────────────────────────────────
const videoPath = await page.video()?.path();
await context.close();
await browser.close();

if (videoPath && fs.existsSync(videoPath)) {
  const dest = '/tmp/arvo-demo.webm';
  fs.copyFileSync(videoPath, dest);
  const mb = (fs.statSync(dest).size / 1024 / 1024).toFixed(1);
  console.log(`\n✅  Video sparad: /tmp/arvo-demo.webm  (${mb} MB)`);
} else {
  console.log('\n❌  Ingen videofil. Sökväg:', videoPath);
}
