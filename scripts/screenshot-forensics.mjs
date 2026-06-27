// scripts/screenshot-forensics.mjs — visuell verifiering (regel 8) av ForensicLead (forensik-inversionen).
// Trogen repro av styled-componenten i TestaFaktura/styles.js med theme-tokens. Driver RIKTIGA
// detectForensicFindings för datan. Kör:
//   CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/screenshot-forensics.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { detectForensicFindings } from '../lib/forensics.js';

const fmtKr = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);
const L = (description, amount, quantity) => ({ type: 'recurring_subscription', description, amount, quantity });
// De tre vassaste asymmetriska fynden ur Mörker-dossierns arketyper — exakt de rader kunden får.
const CASES = [
  { name: 'Tre Företag · mobilfaktura (övervintrande hårdvara)', lines: [
    L('3Företag Obegränsad', 349, 12), L('Delbetalning iPhone 13 (Månad 37/36)', 560, 2), L('Pappersfaktura', 49, 1) ] },
  { name: 'HubSpot · USD-faktura (valutapåslag)', lines: [
    L('Marketing Hub Professional', 890, 1), L('Foreign Transaction / Currency Conversion Fee', 28.5, 1) ] },
  { name: 'Telia · mobilfaktura (administrativ junk-avgift)', lines: [
    L('Företagsabonnemang 50GB', 299, 80), L('Faktureringsavgift Papper', 49, 1) ] },
];

const T = {
  surface: '#FFFFFF', ink: '#0E1A17', inkSoft: '#1F2E2A', muted: '#3F4B47', border: '#D5E2DC',
  warning: '#A8761A', warningSoft: '#F3E5C7', radiusLg: '20px', radiusSm: '6px',
  mono: "'JetBrains Mono', ui-monospace, monospace", sans: "'Inter', system-ui, sans-serif",
};

// Trogen repro av src/components/FindingCard.js (variant='light'): eyebrow · rad(title+impact) ·
// citerad rad · text · "+N fler fynd". Datan kommer ur RIKTIGA detectForensicFindings.
function card(name, findings) {
  const lf = findings[0];
  if (!lf) return `<div style="margin-bottom:20px;color:${T.muted}">${name}: inga fynd</div>`;
  const extra = findings.length - 1;
  const more = extra > 0 ? `<p style="margin:12px 0 0;padding-top:10px;border-top:1px solid ${T.warning}33;font-size:12px;color:${T.muted}"><strong style="color:${T.ink};font-weight:700">+${extra} fler fynd</strong> på fakturan — vi går igenom dem i er genomgång.</p>` : '';
  return `
  <div style="font-size:12px;color:${T.muted};margin:0 0 8px;font-weight:600">${name}</div>
  <div style="position:relative;margin:0 0 26px;padding:18px 20px;background:${T.warningSoft};border:1px solid ${T.warning};border-radius:${T.radiusLg}">
    <span style="display:inline-flex;align-items:center;gap:8px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${T.warning};margin-bottom:12px"><span style="width:7px;height:7px;border-radius:50%;background:${T.warning};display:inline-block"></span>Fynd på er faktura</span>
    <div style="display:flex;align-items:baseline;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:12px">
      <span style="font-weight:700;font-size:17px;line-height:1.18;color:${T.ink}">${lf.title}</span>
      ${lf.annualImpact > 0 ? `<span style="flex-shrink:0;font-family:${T.mono};font-weight:600;letter-spacing:-0.02em;color:${T.warning};white-space:nowrap;font-size:24px">${fmtKr(lf.annualImpact)} kr/år</span>` : ''}
    </div>
    <span style="display:inline-block;font-family:${T.mono};font-size:12.5px;color:${T.inkSoft};background:${T.surface};border:1px solid ${T.border};border-radius:${T.radiusSm};padding:4px 9px;margin-bottom:12px;word-break:break-word">”${lf.lineDescription}”</span>
    <p style="margin:0;font-size:13.5px;line-height:1.6;color:${T.inkSoft}">${lf.text}</p>
    ${more}
  </div>`;
}

const cards = CASES.map((c) => card(c.name, detectForensicFindings(c.lines, { periodMultiplier: 12 }))).join('');
const wrap = `<body style="margin:0;padding:24px;background:#F1F6F3;font-family:${T.sans}"><div style="max-width:640px;margin:0 auto">${cards}</div></body>`;

mkdirSync('/tmp/forensics-shots', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const page = await browser.newPage({ viewport: { width: w, height: 700 } });
  await page.setContent(wrap);
  await page.screenshot({ path: `/tmp/forensics-shots/${tag}.png`, fullPage: true });
  console.log(`✓ ${tag} (${w}px)`);
}
await browser.close();
