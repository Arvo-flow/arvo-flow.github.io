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
import { extractPriceTokens, pageConfirmsPrice, pageMentionsProduct } from '../lib/price-extract.js';

const HEADED = process.argv.includes('--headed');
const PAGE_TIMEOUT = 30_000;
const NAV_TIMEOUT  = 25_000;

// ── Price checks ────────────────────────────────────────────────────────────
// pattern: regex that SHOULD be present in the fully-rendered page text.
// If the pattern disappears → possible price change → Haiku extraction → PR.
//
// Verifieringsstatus (2026-05-27):
//
//   ✅ VERIFIERAT via fetch (exakta priser bekräftade):
//      M365 Business Basic:    57,40 kr (år) / 68,88 kr (mth)
//      M365 Business Standard: 119,48 kr (år) / 143,38 kr (mth)
//      M365 Business Premium:  210,29 kr (år) / 252,35 kr (mth)
//      M365 E3:                384,70 kr (år)   ← KORRIGERAT från 325 kr
//      M365 E5:                609,10 kr (år)   ← KORRIGERAT från 516 kr
//
//   ⚠️ KRÄVER PLAYWRIGHT (returnerar 403 på HTTP-fetch):
//      Tele2 mobil/bredband, Bahnhof, SumUp, Zettle, Sector Alarm,
//      Fortnox Lön, Skatteverket, Google Workspace, Slack, Zoom, Atlassian
//      → Kör: node scripts/price-monitor.mjs --headed
//
//   ❌ GAMMAL URL (404 fixad):
//      microsoft.com/sv-se/microsoft-365/business/compare-all-plans
// Pages that time out or return errors → warning (inconclusive, exit 0).
const PRICE_CHECKS = [
  // Mobil — real-public, verified
  {
    category: 'mobil',
    supplier: 'Tele2 Företag mobilabonnemang',
    url: 'https://www.tele2.se/foretag/mobilabonnemang',
    // OBS: huvudplanerna är JS-renderade — den DETERMINISTISKA driftvakten är
    // scripts/verify.mjs tele2-mobil (fabriken) (Playwright, hård gate). Dessa substräng-
    // checkar är en grov nattlig backup. Verifierat 2026-06-14 (24 mån bindning).
    checks: [
      { name: '60 GB 239 kr/mth (24 mån)',          pattern: /239/ },
      { name: 'Obegränsad 279 kr/mth (24 mån)',     pattern: /279/ },
      { name: 'Obegränsad Max 299 kr/mth (24 mån)', pattern: /299/ },
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

  // Bredband bevakas INTE här: priset ligger inte på en skrapbar sida (adress-gated). Det
  // verifieras live per adress/nät av scripts/verify.mjs tele2-bredband (fabriken) mot Tele2:s adress-API.

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
  // Verifierat 2026-05-27: Standard årsavtal 119,48 kr | månadsvis 143,38 kr
  // URL uppdaterad: compare-all-plans returnerade 404 (sidan togs bort av Microsoft)
  {
    category: 'saas-productivity',
    supplier: 'Microsoft 365 Business Standard (sv)',
    url: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-standard',
    checks: [
      { name: 'Standard årsavtal 119 kr/user/mth',  pattern: /119[,.]?\d*\s*(?:kr|SEK)/i },
      { name: 'Standard månadsvis 143 kr/user/mth', pattern: /143[,.]?\d*\s*(?:kr|SEK)/i },
    ],
  },
  // Verifierat 2026-05-27: Basic årsavtal 57,40 kr | månadsvis 68,88 kr
  {
    category: 'saas-productivity',
    supplier: 'Microsoft 365 Business Basic (sv)',
    url: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-basic',
    checks: [
      { name: 'Basic årsavtal 57 kr/user/mth',  pattern: /5[67][,.]?\d*\s*(?:kr|SEK)/i },
      { name: 'Basic månadsvis 69 kr/user/mth',  pattern: /6[89][,.]?\d*\s*(?:kr|SEK)/i },
    ],
  },
  // Verifierat 2026-05-27: Premium årsavtal 210,29 kr | månadsvis 252,35 kr
  {
    category: 'saas-productivity',
    supplier: 'Microsoft 365 Business Premium (sv)',
    url: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-premium',
    checks: [
      { name: 'Premium årsavtal 210 kr/user/mth',  pattern: /21[0-9][,.]?\d*\s*(?:kr|SEK)/i },
      { name: 'Premium månadsvis 252 kr/user/mth', pattern: /25[0-9][,.]?\d*\s*(?:kr|SEK)/i },
    ],
  },
  // Verifierat 2026-05-27: E3 = 384,70 kr årsavtal | E5 = 609,10 kr årsavtal
  // OBS: Dessa är Microsoft 365 E3/E5 — INTE Office 365 E3/E5 (256/424 kr).
  // Källa: microsoft.com/sv-se/microsoft-365/enterprise/microsoft365-plans-and-pricing
  {
    category: 'saas-productivity',
    supplier: 'Microsoft 365 E3 (sv)',
    url: 'https://www.microsoft.com/sv-se/microsoft-365/enterprise/microsoft365-plans-and-pricing',
    checks: [
      { name: 'E3 årsavtal 384 kr/user/mth', pattern: /38[0-9][,.]?\d*\s*(?:kr|SEK)/i },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Microsoft 365 E5 (sv)',
    url: 'https://www.microsoft.com/sv-se/microsoft-365/enterprise/microsoft365-plans-and-pricing',
    checks: [
      { name: 'E5 årsavtal 609 kr/user/mth', pattern: /60[0-9][,.]?\d*\s*(?:kr|SEK)/i },
    ],
  },

  // Google Workspace — USD-priser, konverteras runtime (~10.42 SEK/USD maj 2026)
  // Källa: workspace.google.com/pricing (verifierat via softwarepricingguide.com 2026-05-22)
  // Starter $7, Standard $14, Plus $22 årsavtal
  {
    category: 'saas-productivity',
    supplier: 'Google Workspace Business Starter',
    url: 'https://workspace.google.com/pricing/',
    checks: [
      { name: 'Starter $7/user/mth annual', pattern: /\$\s*7[.,]0{0,2}\b|\b7\.00\s*\//  },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Google Workspace Business Standard',
    url: 'https://workspace.google.com/pricing/',
    checks: [
      { name: 'Standard $14/user/mth annual', pattern: /\$\s*14[.,]0{0,2}\b|\b14\.00\s*\// },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Google Workspace Business Plus',
    url: 'https://workspace.google.com/pricing/',
    checks: [
      { name: 'Plus $22/user/mth annual', pattern: /\$\s*22[.,]0{0,2}\b|\b22\.00\s*\// },
    ],
  },

  // Slack — USD-priser (verifierat via slack.com/pricing 2026-05-22)
  // Pro $7.25, Business+ $15 årsavtal
  {
    category: 'saas-productivity',
    supplier: 'Slack Pro',
    url: 'https://slack.com/pricing',
    checks: [
      { name: 'Pro $7.25/user/mth annual', pattern: /\$\s*7[.,][0-9]{1,2}\b/ },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Slack Business+',
    url: 'https://slack.com/pricing',
    checks: [
      { name: 'Business+ $15/user/mth annual', pattern: /\$\s*1[45][.,]?\d*\s*(?:\/|\bper\b)/ },
    ],
  },

  // Zoom — USD-priser (verifierat via zoom.us/pricing 2026-05-22)
  // Pro $13.33, Business $18.33 årsavtal
  {
    category: 'saas-productivity',
    supplier: 'Zoom Pro',
    url: 'https://zoom.us/pricing',
    checks: [
      { name: 'Pro $13.33/user/mth annual', pattern: /\$\s*1[23][.,]\d{1,2}\b/ },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Zoom Business',
    url: 'https://zoom.us/pricing',
    checks: [
      { name: 'Business $18.33/user/mth annual', pattern: /\$\s*1[78][.,]\d{1,2}\b/ },
    ],
  },

  // Atlassian Jira — USD-priser (verifierat via atlassian.com/software/jira/pricing 2026-05-22)
  // Jira Standard $8.15, Premium $16.18 (per user/mth, 1-10 users; skalar ned vid fler)
  {
    category: 'saas-productivity',
    supplier: 'Atlassian Jira Standard',
    url: 'https://www.atlassian.com/software/jira/pricing',
    checks: [
      { name: 'Jira Standard $8-9/user/mth', pattern: /\$\s*[89][.,]\d{1,2}/ },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Atlassian Jira Premium',
    url: 'https://www.atlassian.com/software/jira/pricing',
    checks: [
      { name: 'Jira Premium $15-18/user/mth', pattern: /\$\s*1[5-9][.,]\d{1,2}/ },
    ],
  },
  // Atlassian Confluence — USD-priser (2026-05-22)
  {
    category: 'saas-productivity',
    supplier: 'Atlassian Confluence Standard',
    url: 'https://www.atlassian.com/software/confluence/pricing',
    checks: [
      { name: 'Confluence Standard $5-7/user/mth', pattern: /\$\s*[456][.,]\d{1,2}/ },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Atlassian Confluence Premium',
    url: 'https://www.atlassian.com/software/confluence/pricing',
    checks: [
      { name: 'Confluence Premium $10-13/user/mth', pattern: /\$\s*1[012][.,]\d{1,2}/ },
    ],
  },

  // Energiskatt — källverifiering, Skatteverket
  {
    category: 'el',
    supplier: 'Skatteverket energiskatt 2026',
    url: 'https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter.4.html',
    checks: [
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

  // Verisure Företag — larm & bevakning
  {
    category: 'larm-bevakning',
    supplier: 'Verisure Företag',
    url: 'https://www.verisure.se/foretag-och-organisationer',
    checks: [
      { name: '349–499 kr/mth larmövervakning', pattern: /[34][0-9]{2}\s*kr/ },
    ],
  },

  // ── Mobil: Telia Företag ─────────────────────────────────────────────────
  {
    category: 'mobil',
    supplier: 'Telia Företag mobilabonnemang',
    url: 'https://www.telia.se/foretag/mobiltelefoni',
    checks: [
      { name: '349 kr/mth standard plan', pattern: /349/ },
      { name: '449 kr/mth premium plan',  pattern: /449/ },
    ],
  },

  // ── Mobil: Telenor Företag ────────────────────────────────────────────────
  {
    category: 'mobil',
    supplier: 'Telenor Företag mobilabonnemang',
    url: 'https://www.telenor.se/foretag/mobiltelefon',
    checks: [
      { name: '299 kr/mth bas plan', pattern: /299/ },
    ],
  },

  // ── Mobil: Tre Företag ────────────────────────────────────────────────────
  {
    category: 'mobil',
    supplier: 'Tre Företag mobilabonnemang',
    url: 'https://www.tre.se/foretag/abonnemang',
    checks: [
      { name: '249 kr/mth bas plan', pattern: /249/ },
    ],
  },

  // ── SaaS Finance: Fortnox ─────────────────────────────────────────────────
  // Fortnox är #1 bokföringssystem för svenska SMF — kritisk referenspunkt.
  {
    category: 'saas-finance',
    supplier: 'Fortnox priser (bokföring)',
    url: 'https://www.fortnox.se/priser',
    checks: [
      { name: '399 kr/mth bas-paket',       pattern: /399/ },
    ],
  },

  // ── SaaS Finance: Visma eEkonomi ─────────────────────────────────────────
  {
    category: 'saas-finance',
    supplier: 'Visma eEkonomi priser',
    url: 'https://vismaeekonomii.se/priser',
    checks: [
      { name: '249 kr/mth Smart-plan', pattern: /249/ },
    ],
  },

  // ── SaaS Finance: Bokio ───────────────────────────────────────────────────
  {
    category: 'saas-finance',
    supplier: 'Bokio priser',
    url: 'https://www.bokio.se/priser',
    checks: [
      { name: '149 kr/mth Business Pro', pattern: /149/ },
    ],
  },

  // ── SaaS Creative: Adobe Creative Cloud for Teams ────────────────────────
  // Adobe All Apps: 699 kr/user/mth (supplier-price-intel.js, lastUpdated 2026-05)
  {
    category: 'saas-creative',
    supplier: 'Adobe Creative Cloud for Teams (sv)',
    url: 'https://www.adobe.com/se/creativecloud/business/teams.html',
    checks: [
      { name: 'All Apps 699 kr/user/mth', pattern: /699\s*(?:kr|SEK)/i },
    ],
  },

  // ── SaaS Creative: Figma ─────────────────────────────────────────────────
  {
    category: 'saas-creative',
    supplier: 'Figma Professional',
    url: 'https://www.figma.com/pricing/',
    checks: [
      { name: 'Professional $15/editor/mth', pattern: /\$\s*15[.,]?\d*\s*(?:\/|\bper\b)/ },
    ],
  },

  // ── SaaS CRM: Pipedrive ───────────────────────────────────────────────────
  // Pipedrive är grundat av estniska entreprenörer men ledande bland svenska SMF.
  {
    category: 'saas-crm',
    supplier: 'Pipedrive priser',
    url: 'https://www.pipedrive.com/sv/pricing',
    checks: [
      { name: 'Essential $14/user/mth annual', pattern: /\$\s*14[.,]?\d*\b/ },
    ],
  },

  // ── SaaS CRM: HubSpot ────────────────────────────────────────────────────
  {
    category: 'saas-crm',
    supplier: 'HubSpot Sales Hub priser',
    url: 'https://www.hubspot.com/pricing/sales',
    checks: [
      { name: 'Starter $15-20/seat/mth', pattern: /\$\s*1[5-9][.,]?\d*\b/ },
    ],
  },

  // ── SaaS CRM: Zoho CRM ───────────────────────────────────────────────────
  {
    category: 'saas-crm',
    supplier: 'Zoho CRM priser',
    url: 'https://www.zoho.com/crm/pricing.html',
    checks: [
      { name: 'Standard $14/user/mth annual', pattern: /\$\s*1[34][.,]?\d*\b/ },
    ],
  },

  // (Bredband flyttat till dedikerad adress-API-vakt: scripts/verify.mjs tele2-bredband (fabriken))

  // ── El: Tibber Företag ───────────────────────────────────────────────────
  // Tibber är det enda spotprisalternativet med öppen API för smart styrning.
  {
    category: 'el',
    supplier: 'Tibber Företag',
    url: 'https://tibber.com/se/foretag',
    checks: [
      { name: '39 kr/mth abonnemang', pattern: /39\s*kr/ },
    ],
  },

  // ── Löneadmin: Visma Lön ─────────────────────────────────────────────────
  {
    category: 'loneadmin',
    supplier: 'Visma Lön priser',
    url: 'https://www.visma.com/se/lonesystem',
    checks: [
      { name: 'Visma Lön startpris', pattern: /[1-9][0-9]{2,3}\s*kr/ },
    ],
  },
];

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

  const text = await page.evaluate(() => document.body?.innerText ?? '');

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
        const oldNumeric = extractPriceTokens(alert.check)[0] ?? null;   // gamla priset ur check-namnet
        const keywords = [source.supplier, ...String(alert.check).split(/\s+/)];
        alert.verify = {
          oldNumeric,
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
