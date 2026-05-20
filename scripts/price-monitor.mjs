#!/usr/bin/env node
/**
 * Nightly price monitor for Arvo Flow benchmarks.
 *
 * Uses Playwright (headless Chromium) to render each supplier page and verify
 * that the expected price strings are still present. Simple regex patterns
 * match against the fully-rendered page text.
 *
 * Exit codes:
 *   0  – all checks passed or inconclusive (no action needed)
 *   1  – at least one price string no longer found → GitHub Actions creates issue
 *
 * Run locally: node scripts/price-monitor.mjs [--headed]
 * In CI:       node scripts/price-monitor.mjs   (headless, auto-installed Chromium)
 */

import { writeFileSync } from 'fs';
import { chromium } from 'playwright';

const HEADED = process.argv.includes('--headed');
const PAGE_TIMEOUT = 30_000;
const NAV_TIMEOUT  = 25_000;

// ── Price checks ────────────────────────────────────────────────────────────
// pattern: regex that SHOULD be present in the fully-rendered page text.
// If the pattern disappears → possible price change → alert (exit 1).
// Pages that time out or return errors → warning (inconclusive, exit 0).
const PRICE_CHECKS = [
  // Mobil — real-public, verified
  {
    category: 'mobil',
    supplier: 'Tele2 Företag mobilabonnemang',
    url: 'https://www.tele2.se/foretag/mobilabonnemang',
    checks: [
      { name: 'Bas 299 kr/mth',  pattern: /299/ },
      { name: 'Plus 349 kr/mth', pattern: /349/ },
      { name: 'Max 449 kr/mth',  pattern: /449/ },
    ],
  },

  // Löneadmin — real-public, verified
  {
    category: 'loneadmin',
    supplier: 'Fortnox Lön prislista',
    url: 'https://www.fortnox.se/produkt/prislista',
    checks: [
      { name: '199 kr/mth fast avgift', pattern: /199/ },
      { name: '25 kr/anst/mth',         pattern: /25/ },
    ],
  },

  // Bredband — real-public, verified
  {
    category: 'bredband',
    supplier: 'Tele2 Företag bredband',
    url: 'https://www.tele2.se/foretag/bredband',
    checks: [
      { name: '849 kr/mth (1 200 Mbit)', pattern: /849/ },
    ],
  },
  {
    category: 'bredband',
    supplier: 'Bahnhof Företag internet',
    url: 'https://www.bahnhof.se/foretag/internet',
    checks: [
      { name: 'Från 995 kr/mth', pattern: /995/ },
    ],
  },

  // Kortterminal — estimated (rates changed; monitor for further changes)
  {
    category: 'kortterminal',
    supplier: 'SumUp Sverige',
    url: 'https://sumup.com/sv-se/',
    checks: [
      { name: '~1,75 % transaktionsavgift', pattern: /1[,.]7[45]|1[,.]9/ },
    ],
  },
  {
    category: 'kortterminal',
    supplier: 'Zettle by PayPal Sverige',
    url: 'https://www.zettle.com/se/priser',
    checks: [
      { name: '1,75 % transaktionsavgift', pattern: /1[,.]7[45]/ },
    ],
  },

  // SaaS-produktivitet — real-public
  {
    category: 'saas-productivity',
    supplier: 'Microsoft 365 Business Standard (sv)',
    url: 'https://www.microsoft.com/sv-se/microsoft-365/business/compare-all-plans',
    checks: [
      // Letar efter 14x kr i SEK-kontext (p25 = ~142 kr/user/mth)
      { name: '~142 kr/user/mth', pattern: /14[0-9]\s*kr/ },
    ],
  },

  // Energiskatt — källverifiering, Skatteverket
  {
    category: 'el',
    supplier: 'Skatteverket energiskatt 2026',
    url: 'https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter.4.html',
    checks: [
      // 36,0 öre/kWh, sänkt 1 jan 2026
      { name: 'Energiskatt 36 öre/kWh', pattern: /36[,.]0|360\s*öre|36\s*öre/ },
    ],
  },

  // Larm & bevakning — estimated, källkontroll
  {
    category: 'larm-bevakning',
    supplier: 'Sector Alarm Företag',
    url: 'https://www.sectoralarm.se/foretag',
    checks: [
      { name: '299–499 kr/mth startpris', pattern: /[23][0-9]{2}\s*kr/ },
    ],
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────
async function checkSource(page, source) {
  const results = { passed: [], alerts: [], warning: null };

  try {
    await page.goto(source.url, {
      waitUntil: 'networkidle',
      timeout: NAV_TIMEOUT,
    });
    // Give dynamic content a moment to settle
    await page.waitForTimeout(2000);
  } catch (err) {
    results.warning = `Navigeringsfel: ${err.message.split('\n')[0]}`;
    return results;
  }

  const text = await page.evaluate(() => document.body?.innerText ?? '');

  if (text.length < 500) {
    results.warning = `Sidan returnerade för lite text (${text.length} tecken) — möjlig omdirigering`;
    return results;
  }

  for (const check of source.checks) {
    if (check.pattern.test(text)) {
      results.passed.push(check.name);
    } else {
      results.alerts.push({
        category: source.category,
        supplier:  source.supplier,
        check:     check.name,
        url:       source.url,
        message:   `"${check.name}" hittades inte längre på ${source.url}`,
      });
    }
  }

  return results;
}

// ── Main ─────────────────────────────────────────────────────────────────────
const report = {
  runAt:    new Date().toISOString(),
  alerts:   [],
  warnings: [],
  passed:   [],
};

let exitCode = 0;

const browser = await chromium.launch({ headless: !HEADED });
const context = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  locale: 'sv-SE',
  timezoneId: 'Europe/Stockholm',
});
const page = await context.newPage();
page.setDefaultTimeout(PAGE_TIMEOUT);

for (const source of PRICE_CHECKS) {
  console.log(`\nKontrollerar [${source.category}] ${source.supplier}…`);

  const { passed, alerts, warning } = await checkSource(page, source);

  if (warning) {
    console.log(`  ⚠️  Oavgörlig: ${warning}`);
    report.warnings.push({ category: source.category, supplier: source.supplier, message: warning });
    continue;
  }

  for (const name of passed) {
    console.log(`  ✅  Hittad: ${name}`);
    report.passed.push({ category: source.category, supplier: source.supplier, check: name });
  }
  for (const alert of alerts) {
    console.log(`  ❌  INTE HITTAD: ${alert.check} — möjlig prisändring!`);
    report.alerts.push(alert);
    exitCode = 1;
  }
}

await browser.close();

// ── Rapport ──────────────────────────────────────────────────────────────────
const now = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });
console.log('\n══════════════════════════════════════════════════════');
console.log(`Datum:        ${now}`);
console.log(`✅ Godkända:   ${report.passed.length}`);
console.log(`⚠️  Varningar: ${report.warnings.length}  (oavgörliga)`);
console.log(`❌ Avvikelser: ${report.alerts.length}  (möjliga prisändringar)`);

if (report.warnings.length) {
  console.log('\nOavgörliga (manuell koll vid behov):');
  report.warnings.forEach(w => console.log(`  • ${w.supplier}: ${w.message}`));
}
if (report.alerts.length) {
  console.log('\n🚨 Möjliga prisändringar:');
  report.alerts.forEach(a => console.log(`  • [${a.category}] ${a.supplier}: ${a.check}`));
}

writeFileSync('/tmp/price-monitor-report.json', JSON.stringify(report, null, 2));

process.exit(exitCode);
