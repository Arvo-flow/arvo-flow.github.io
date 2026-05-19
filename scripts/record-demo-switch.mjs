/**
 * Playwright — demo med shouldSwitch:true (Telia → Hallon, nettobesparing 18 240 kr/år)
 * Visar: upload → analys → SavingsBlock "+18 240 kr" → PartnerBlock "Aktivera bytet" → form
 *
 * Kör: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node scripts/record-demo-switch.mjs
 * Output: /tmp/arvo-demo-switch.webm
 */

import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RICOH_PDF = path.resolve(__dirname, '../test-pdfs/ricoh.pdf');
const VIDEO_DIR = '/tmp/arvo-demo-switch-frames';
const BASE      = 'http://localhost:3000/flow';

const TELIA_MOCK = {
  ok: true, route: 'auto',
  extracted: {
    supplier: 'Telia Sverige AB', amount: 6800, recurringAmount: 6800,
    variableCharges: 0, oneTimeFees: 0, annualCost: 81600,
    date: '2026-04-30', lineItems: [], billingPeriod: 'monthly',
    recurring: true, confidenceScore: 0.97, seatCount: null,
  },
  categorized: {
    category: 'mobil', subType: 'Mobilabonnemang',
    normalizedSupplier: 'Telia', confidence: 0.97,
    reasoning: 'Mobilabonnemang med fast månadsavgift och datapaket.',
    licensePending: false,
  },
  recommendation: {
    shouldSwitch: true, requiresQuote: false,
    suggestedSupplier: 'Tele2',
    suggestedAnnualCost: 50400,
    grossSaving: 31200,
    arvoFee: 6240,
    netSaving: 24960,
    confidence: 0.94,
    reasoning:
      'Tele2 erbjuder jämförbar rikstäckning och datastyrka till markant lägre ' +
      'kostnad. Typisk porterings-tid 3–5 arbetsdagar.',
    switchSteps: [
      'Arvo begär offert från Tele2',
      'Du godkänner priset och ger porterings-fullmakt',
      'Arvo sköter hela bytet — du behöver inte ringa',
    ],
    licenseOverage: 0, overageSavings: 0,
  },
  timing: { extractMs: 3200, categorizeMs: 680, recommendMs: 920, totalMs: 4800 },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

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
    document.addEventListener('mousemove', e => {
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
    await page.evaluate(y => window.scrollTo(0, y), startY + (targetY - startY) * (i / steps));
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

// ── Main ─────────────────────────────────────────────────────────────────────

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

await context.route('**', async (route) => {
  const url = route.request().url();
  if (url.includes('/api/test-invoice')) {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(TELIA_MOCK) });
  } else if (url.includes('/api/')) {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  } else {
    await route.continue().catch(() => {});
  }
});

const page = await context.newPage();
await page.setDefaultTimeout(15_000);

console.log('🎬  Inspelning startad (shouldSwitch flow)…');

// ── 1. Landningssida (0–7s) ───────────────────────────────────────────────────
console.log('  [0s] Landningssida…');
await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 15000 });
await injectCursor(page);
await move(page, 640, 300);
await page.waitForTimeout(1400);
await smoothScroll(page, 360, 1000);
await page.waitForTimeout(800);
await moveToEl(page, 'a:has-text("Testa med en faktura")');
await page.waitForTimeout(700);

// ── 2. Navigera till /testa-faktura (7–12s) ────────────────────────────────
console.log('  [7s] Klickar CTA…');
await page.locator('a:has-text("Testa med en faktura")').first().click();
await page.waitForURL(/testa-faktura/, { timeout: 8000 }).catch(() => {});
await page.waitForLoadState('networkidle').catch(() => {});
await injectCursor(page);
await move(page, 640, 300);
await page.waitForTimeout(1200);

// ── 3. Upload (12–20s) ────────────────────────────────────────────────────────
console.log('  [12s] Laddar upp faktura…');
await move(page, 200, 550, 20);
await page.waitForTimeout(300);
await move(page, 640, 380, 45);
await page.waitForTimeout(600);
await page.locator('input[type="file"]').first().setInputFiles(RICOH_PDF, { noWaitAfter: true });
await page.waitForTimeout(700);
await page.locator('input[type="number"]').first().fill('12');
await page.waitForTimeout(400);
await moveToEl(page, 'button:has-text("Analysera")');
await page.waitForTimeout(700);

// ── 4. Analysera (20–28s) ─────────────────────────────────────────────────────
console.log('  [20s] Analyserar…');
await page.locator('button:has-text("Analysera")').first().click();
await smoothScroll(page, 0, 350);
await page.waitForTimeout(2800);

// ── 5. Resultat: SavingsBlock (28–38s) ────────────────────────────────────────
console.log('  [28s] Resultat dyker upp…');
await page.waitForSelector('h2', { timeout: 12_000 });
await page.waitForTimeout(1000);

// Scrolla sakta ner till SavingsBlock
const savingsBox = await page.locator('.css-0, [class*="SavingsBlock"]').first().boundingBox().catch(() => null);
// Find the savings amount element
const amountEl = page.locator('span.amount').first();
const amountBox = await amountEl.boundingBox({ timeout: 5000 }).catch(() => null);
if (amountBox) {
  await smoothScroll(page, Math.max(0, amountBox.y - 160), 900);
} else {
  await smoothScroll(page, 300, 900);
}
await page.waitForTimeout(1800);

// Hover mot PartnerBlock / "Aktivera bytet"-knapp
await moveToEl(page, 'button:has-text("Aktivera bytet")').catch(() =>
  moveToEl(page, 'button:has-text("Säkra besparingen")')
);
await page.waitForTimeout(1200);

// ── 6. Klicka "Aktivera bytet" (38–48s) ──────────────────────────────────────
console.log('  [38s] Klickar Aktivera bytet…');
const activateBtn = page.locator('button:has-text("Aktivera bytet"), button:has-text("Säkra besparingen")').first();
await moveToEl(page, 'button:has-text("Aktivera bytet"), button:has-text("Säkra besparingen")');
await page.waitForTimeout(900);
await activateBtn.click();
await page.waitForTimeout(1500);

// Modal öppnas — scrolla till den om nödvändigt, visa innehållet
await page.waitForSelector('[class*="ModalCard"]', { timeout: 5000 }).catch(() => {});
await page.waitForTimeout(1500);

// Klicka "Jag använder inte Fortnox" → e-postvy
const manualLink = page.locator('button:has-text("Jag använder inte Fortnox")').first();
await manualLink.waitFor({ timeout: 5000 }).catch(() => {});
await moveToEl(page, 'button:has-text("Jag använder inte Fortnox")').catch(() => {});
await page.waitForTimeout(700);
await manualLink.click().catch(() => {});
await page.waitForTimeout(1000);

// ── 7. Fyll i e-post i modal (48–58s) ────────────────────────────────────────
console.log('  [48s] Fyller i e-post i modal…');
const emailInput = page.locator('[class*="ModalCard"] input[type="email"]').first();
await emailInput.waitFor({ timeout: 5000 }).catch(() => {});
await emailInput.click().catch(() => {});
await page.waitForTimeout(400);
for (const ch of 'erik@nordictech.se') {
  await page.keyboard.type(ch);
  await page.waitForTimeout(55 + Math.random() * 30);
}
await page.waitForTimeout(700);

const submitBtn = page.locator('[class*="ModalCard"] button[type="submit"]').first();
await submitBtn.hover().catch(() => {});
await page.waitForTimeout(500);
await submitBtn.click().catch(() => {});
await page.waitForTimeout(2000);

// Visa bekräftelse
try {
  await page.waitForSelector('[class*="sent-state"], [class*="sent-title"]', { timeout: 5000 });
  console.log('  ✅  Bekräftelse i modal synlig');
} catch {
  console.log('  (modal timeout — fortsätter)');
}

await page.waitForTimeout(3000);

// ── Avslut ────────────────────────────────────────────────────────────────────
const videoPath = await page.video()?.path();
await context.close();
await browser.close();

if (videoPath && fs.existsSync(videoPath)) {
  const dest = '/tmp/arvo-demo-switch.webm';
  fs.copyFileSync(videoPath, dest);
  const mb = (fs.statSync(dest).size / 1024 / 1024).toFixed(1);
  console.log(`\n✅  Video sparad: ${dest}  (${mb} MB)`);
} else {
  console.log('\n❌  Ingen videofil. Sökväg:', videoPath);
}
