// scripts/screenshot-verifikationskvitto.mjs — visuell verifiering (regel 8) av B4-kvittot.
// Trogen statisk repro av VerificationReceipt-markup + stilar vid 390px & 1600px.
// Payloaden är INTE påhittad: raderna genereras av den verkliga routeExtraction
// (samma domar som API:t emitterar) — skriptet renderar domsluten ordagrant.
// Kör: node scripts/screenshot-verifikationskvitto.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { routeExtraction } from '../agents/test-invoice/extract.js';

// Fall 1: frisk faktura (alla domar gröna, moms-förklaringen synlig)
const frisk = routeExtraction({
  supplier: 'Telia Sverige AB', billingPeriod: 'monthly', annualCost: 20_940,
  confidenceScore: 0.95, invoiceTotal: 2_181,
  lineItems: [{ description: 'Jobbmobil M (5 st)', amount: 1745, type: 'recurring_subscription', quantity: 5, unitPrice: 349 }],
  schemakrav: { ok: true, brott: 0 },
  projektionskrav: { provad: true, ok: true, deviationPct: 0, grund: 'ai_projektion_mot_radsumma' },
}).verifications;

// Fall 2: ärlighetsfallet — utan à-pris och utan totalsumma (ej_provbar-rader)
const arlig = routeExtraction({
  supplier: 'Fortnox AB', billingPeriod: 'monthly', annualCost: 14_280,
  confidenceScore: 0.91,
  lineItems: [{ description: 'Fortnox Bokföring + Fakturering', amount: 1190, type: 'recurring_subscription' }],
  schemakrav: { ok: true, brott: 0 },
  projektionskrav: { provad: false, ok: true, grund: 'radsumma_deterministisk' },
}).verifications;

const LABELS = { schemakrav: 'Strukturkontroll', radsumma: 'Radsumma mot fakturatotal', balanskrav: 'Antal × à-pris per rad', projektion: 'Nästa periods belopp' };
const GLYPHS = { ok: '✓', varning: '!', stopp: '✕', ej_provbar: '–' };
const GLYPH_COLOR = { ok: '#1B6E66', varning: '#B45309', stopp: '#C0392B', ej_provbar: '#9CA3AF' };

const receipt = (items, caption) => {
  const judged = items.filter((v) => v.status !== 'ej_provbar');
  const passed = judged.filter((v) => v.status === 'ok');
  const unjudged = items.length - judged.length;
  const countText = `${passed.length} av ${judged.length} kontroller gröna${unjudged > 0 ? ` · ${unjudged} ej prövbara` : ''}`;
  const rows = items.map((v) => {
    const mute = v.status === 'ej_provbar';
    return `<div style="display:flex;align-items:baseline;gap:10px;font-size:12px;color:${mute ? '#9CA3AF' : '#0E1A17'};">
      <span style="flex-shrink:0;width:16px;text-align:center;font-weight:700;color:${GLYPH_COLOR[v.status]};">${GLYPHS[v.status]}</span>
      <span style="font-weight:600;">${LABELS[v.id] ?? v.id}</span>
      <span style="color:${mute ? '#9CA3AF' : '#5C6E68'};font-size:11px;">${v.detalj}</span>
    </div>`;
  }).join('');
  return `<p style="font-size:11px;color:#888;margin:18px 0 6px;">${caption}</p>
  <div style="border:1px solid #D5E2DC;border-radius:20px;overflow:hidden;background:#fff;">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 16px;background:#F7FAF9;border-bottom:1px solid #D5E2DC;">
      <span style="font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#1B6E66;">Maskinellt kontrollerad</span>
      <span style="font-size:11px;color:#888;">${countText}</span>
    </div>
    <div style="padding:12px 16px;display:flex;flex-direction:column;gap:7px;">${rows}</div>
    <div style="padding:8px 16px 11px;font-size:10px;color:#888;border-top:1px dashed #E8F0EC;">
      Varje kontroll ovan kördes deterministiskt på just den här fakturan — en kontroll som inte kunde prövas markeras, aldrig bockas.
    </div>
  </div>`;
};

const html = `<body style="margin:0;padding:24px;background:#E9F0EC;font-family:Inter,system-ui,sans-serif;">
  <div style="max-width:640px;margin:0 auto;">
    ${receipt(frisk, 'Fall 1 · Telia-faktura — alla fyra domar gröna (momsen namngiven)')}
    ${receipt(arlig, 'Fall 2 · Fortnox-faktura — ärlighetsfallet: två kontroller kunde inte prövas')}
  </div></body>`;

mkdirSync('/tmp/b4-kvitto-shots', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const page = await browser.newPage({ viewport: { width: w, height: 760 } });
  await page.setContent(html);
  await page.screenshot({ path: `/tmp/b4-kvitto-shots/${tag}.png`, fullPage: true });
  console.log(`✓ ${tag} (${w}px) → /tmp/b4-kvitto-shots/${tag}.png`);
}
await browser.close();
