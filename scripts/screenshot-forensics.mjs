// scripts/screenshot-forensics.mjs — visuell verifiering (regel 8) av ForensicLead (forensik-inversionen).
// Trogen repro av styled-componenten i TestaFaktura/styles.js med theme-tokens. Driver RIKTIGA
// detectForensicFindings för datan. Kör:
//   CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/screenshot-forensics.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { detectForensicFindings } from '../lib/forensics.js';

const fmtKr = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);
const L = (description, amount, quantity) => ({ type: 'recurring_subscription', description, amount, quantity });
const CASES = [
  { name: 'Telia-faktura (smyghöjning + amortering)', lines: [L('Mobilabonnemang', 3490, 10), L('Prisjustering enligt index', 500, 1), L('Avbetalning telefoner', 280, 5)] },
  { name: 'Försäkringsfaktura (offert-kategori — fynd ändå)', lines: [L('Företagsförsäkring premie', 8000, 1), L('Indexuppräkning 2026', 420, 1)] },
  { name: 'SaaS-faktura (valutapåslag + faktureringsavgift)', lines: [L('CRM-licenser', 4200, 12), L('Valutapåslag USD', 240, 1), L('Faktureringsavgift pappersfaktura', 49, 1)] },
];

const T = {
  surface: '#FFFFFF', ink: '#0E1A17', inkSoft: '#1F2E2A', muted: '#3F4B47', border: '#D5E2DC',
  warning: '#A8761A', warningSoft: '#F3E5C7', radiusLg: '20px', radiusSm: '6px',
  mono: "'JetBrains Mono', ui-monospace, monospace", sans: "'Inter', system-ui, sans-serif",
};

function card(name, findings) {
  const lf = findings[0];
  if (!lf) return `<div style="margin-bottom:20px;color:${T.muted}">${name}: inga fynd</div>`;
  const extra = findings.length - 1;
  const more = extra > 0 ? `<p style="margin:12px 0 0;padding-top:10px;border-top:1px solid ${T.warning}33;font-size:12px;color:${T.muted}"><strong style="color:${T.ink};font-weight:700">+${extra} fler fynd</strong> på fakturan — vi går igenom dem i er genomgång.</p>` : '';
  return `
  <div style="font-size:12px;color:${T.muted};margin:0 0 8px;font-weight:600">${name}</div>
  <div style="position:relative;margin:0 0 26px;padding:18px 20px;background:${T.warningSoft};border:1px solid ${T.warning};border-radius:${T.radiusLg}">
    <span style="display:inline-flex;align-items:center;gap:7px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${T.warning};margin-bottom:10px"><span style="width:7px;height:7px;border-radius:50%;background:${T.warning};display:inline-block"></span>Fynd på er faktura</span>
    <div style="font-size:16px;font-weight:700;line-height:1.3;color:${T.ink};margin:0 0 10px">${lf.title}</div>
    <div style="display:flex;align-items:baseline;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:10px">
      <span style="font-family:${T.mono};font-size:12.5px;color:${T.inkSoft};background:${T.surface};border:1px solid ${T.border};border-radius:${T.radiusSm};padding:4px 9px">”${lf.lineDescription}”</span>
      ${lf.annualImpact > 0 ? `<span style="font-family:${T.mono};font-size:26px;font-weight:600;letter-spacing:-0.02em;color:${T.warning};white-space:nowrap">${fmtKr(lf.annualImpact)} kr/år</span>` : ''}
    </div>
    <p style="margin:0;font-size:13.5px;line-height:1.55;color:${T.inkSoft}">${lf.text}</p>
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
