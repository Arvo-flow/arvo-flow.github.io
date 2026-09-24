#!/usr/bin/env node
/**
 * Nightly price monitor for Arvo Flow benchmarks.
 *
 * Uses Playwright (headless Chromium) to render each supplier page and verify
 * that the expected price strings are still present. When a pattern is missing,
 * Claude Haiku is called to extract the actual current price.
 *
 * Writes /tmp/price-monitor-report.json with Haiku analysis for each alert.
 * The GitHub Actions workflow reads this file to create a PR with proposed changes.
 *
 * Exit codes:
 *   0  – all checks passed or inconclusive (no action needed)
 *   1  – at least one price string no longer found → workflow creates a PR
 *
 * Run locally: node scripts/price-monitor.mjs [--headed]
 * In CI:       node scripts/price-monitor.mjs   (headless, auto-installed Chromium)
 */

import { writeFileSync } from 'fs';
import { chromium } from 'playwright';
import Anthropic from '@anthropic-ai/sdk';
// Verifieringsjuryns sid-beroende vittnen (resten av juryn körs i scripts/verify-price-changes.mjs).
import { pageConfirmsPrice, pageMentionsProduct } from '../lib/price-extract.js';
// PRICE_CHECKS bor i lib/prisvaktens-kontroller.js — exporterade så att prisbaslinjen (BL) kan pröva
// varje verklig kontroll, inte en handbyggd.
import { PRICE_CHECKS } from '../lib/prisvaktens-kontroller.js';
import { bokfortPris } from '../lib/prisbaslinje.js';

const HEADED = process.argv.includes('--headed');
const PAGE_TIMEOUT = 30_000;
const NAV_TIMEOUT  = 25_000;


// ── Haiku price extraction ──────────────────────────────────────────────────
const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

async function extractPriceWithHaiku(pageText, source, check) {
  if (!anthropic) return null;
  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: `Du är en prisextraktionsassistent för Arvo Flow, en svensk B2B SaaS-plattform.
Du letar ENBART efter permanenta ordinarie B2B-listpriser — INTE kampanjpriser, introduktionserbjudanden eller tidsbegränsade rabatter.
Svara ALLTID i giltig JSON, utan annan text.`,
      messages: [
        {
          role: 'user',
          content: `Leverantör: ${source.supplier}
URL: ${source.url}
Förväntad prissträng vi letade efter: "${check.name}" (mönster: /${check.pattern.source}/)

Sidans text (utdrag, max 4 000 tecken):
${pageText.slice(0, 4000)}

Extrahera det aktuella ordinarie B2B-listpriset för denna produkt. Svara i exakt detta JSON-format:
{
  "extractedPrice": "t.ex. '349 kr/mth' eller null om ej hittad",
  "extractedNumeric": 349.0,
  "extractedCurrency": "SEK",
  "extractedUnit": "per_seat_month",
  "isPermanent": true,
  "isCampaign": false,
  "confidence": 0.90,
  "actionRequired": "update",
  "reasoning": "kort förklaring (max 80 ord)"
}

Möjliga värden för extractedUnit:
  per_seat_month | per_seat_year | per_company_month | per_company_year | flat_month | percentage

extractedCurrency: SEK | USD | EUR
extractedNumeric: bara siffran, utan enhet eller valuta (t.ex. 349 för "349 kr/mth")

Möjliga värden för actionRequired:
- "update"          — priset har ändrats permanent
- "verify_manually" — oklar situation, manuell koll krävs
- "false_positive"  — sidan förändrades men priset verkar detsamma`,
        },
      ],
    });

    const raw = response.content[0]?.text ?? '';
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return null;
    return JSON.parse(match[0]);
  } catch (err) {
    console.warn(`  ⚠️  Haiku-fel: ${err.message.split('\n')[0]}`);
    return null;
  }
}

// ── Page check ───────────────────────────────────────────────────────────────
async function checkSource(page, source) {
  const results = { passed: [], alerts: [], warning: null, pageText: '' };

  try {
    await page.goto(source.url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(2000);
  } catch (err) {
    results.warning = `Navigeringsfel: ${err.message.split('\n')[0]}`;
    return results;
  }

  // ISOLERINGSKRAVET (grundarfynd 2026-08-04): det här anropet låg UTANFÖR try/catch. En sida som
  // navigerar om sig själv efter att goto() lugnat sig ger "Execution context was destroyed" — och
  // kraschen dödade HELA svepet av ~40 källor, inte bara den sidan. Natten 4 aug svepte vakten
  // därför ingenting alls, medan workflowen rapporterade success. En flakig leverantörssida får
  // aldrig kunna tysta vakten: den blir en varning för SIN källa, resten av svepet fortsätter.
  let text;
  try {
    text = await page.evaluate(() => document.body?.innerText ?? '');
  } catch (err) {
    results.warning = `Läsfel: ${err.message.split('\n')[0]}`;
    return results;
  }

  if (text.length < 500) {
    results.warning = `Sidan returnerade för lite text (${text.length} tecken) — möjlig omdirigering`;
    return results;
  }

  results.pageText = text;

  for (const check of source.checks) {
    if (check.pattern.test(text)) {
      results.passed.push(check.name);
    } else {
      results.alerts.push({
        category:      source.category,
        supplier:      source.supplier,
        check:         check.name,
        patternSource: check.pattern.source,
        url:           source.url,
        message:       `"${check.name}" hittades inte längre på ${source.url}`,
        // haiku field added below in main loop
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

  const { passed, alerts, warning, pageText } = await checkSource(page, source);

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

    if (anthropic) {
      console.log(`  🤖  Anropar Haiku för prisextraktion…`);
      const checkObj = source.checks.find(c => c.name === alert.check);
      const haiku = await extractPriceWithHaiku(pageText, source, checkObj);
      if (haiku) {
        alert.haiku = haiku;
        // Verifieringsjuryns SID-beroende vittnen (sidan finns bara här i minnet). De DB-beroende
        // grindarna (stabilitet) + domen körs i verify-price-changes.mjs ur dessa signaler.
        // Det gamla priset är prisbokens VERIFIERADE tal för kontrollen (lib/prisbaslinje.js), aldrig
        // ett tal ur kontrollens namn — namnen bar majpriser, och juryn kallade skillnaden en höjning.
        // Utan `bokfort` finns inget gammalt pris, och då kan larmet inte bli en marknadshändelse.
        const oldNumeric = checkObj?.bokfort ? (bokfortPris(checkObj.bokfort)?.pris ?? null) : null;
        const keywords = [source.supplier, ...String(alert.check).split(/\s+/)];
        alert.verify = {
          oldNumeric,
          bokfort:         checkObj?.bokfort ?? null,
          newNumeric:      haiku.extractedNumeric ?? null,
          unit:            haiku.extractedUnit ?? null,
          haikuConfidence: haiku.confidence ?? null,
          productPresent:  pageMentionsProduct(pageText, keywords),
          pageConfirmsNew: pageConfirmsPrice(pageText, haiku.extractedNumeric),
        };
        const action = haiku.actionRequired;
        const price  = haiku.extractedPrice ?? '(ej hittad)';
        const pct    = Math.round((haiku.confidence ?? 0) * 100);
        console.log(`  📊  Haiku: ${price} (${pct}% säker, åtgärd: ${action})`);
        if (haiku.reasoning) console.log(`  💬  ${haiku.reasoning}`);
      } else {
        console.log(`  📊  Haiku returnerade inget svar`);
      }
    }

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
  report.alerts.forEach(a => {
    const haiku = a.haiku;
    const suffix = haiku ? ` → AI: ${haiku.extractedPrice ?? 'ej hittad'} (${haiku.actionRequired})` : '';
    console.log(`  • [${a.category}] ${a.supplier}: ${a.check}${suffix}`);
  });
}

writeFileSync('/tmp/price-monitor-report.json', JSON.stringify(report, null, 2));

process.exit(exitCode);
