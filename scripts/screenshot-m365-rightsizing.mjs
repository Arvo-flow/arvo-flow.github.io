// scripts/screenshot-m365-rightsizing.mjs — visuell verifiering (regel 8) av M365 rätt-storleks-kortet
// (E3/E5 → Business Premium-rådgivning). Trogen statisk repro av markup + inline-stilar (samma som
// TestaFaktura-kortet) vid 390px & 1600px, med E5- och E3-fallet. Endast QA, ingen prod.
// Kör: CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/screenshot-m365-rightsizing.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const card = ({ curLabel, curPer, tgtPer, tier, saving, seats }) => `
<div style="margin-top:14px;padding:16px 18px;background:#F1F6F3;border:1px solid #BFD8D0;border-radius:12px;">
  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#1B7A6E;margin-bottom:8px;">Rätt-storlek — Microsoft 365 (rådgivning)</div>
  <p style="margin:0;font-size:14px;line-height:1.55;color:#0E1A17;">Ni betalar för <strong>${curLabel}</strong> (${curPer} kr/anv/mån) — full enterprise-svit. <strong>Microsoft 365 Business Premium</strong> (${tgtPer} kr/anv/mån) ger Intune MDM + Defender, säkerheten de flesta SMF behöver.</p>
  <p style="margin:8px 0 0;font-size:12px;color:#5C6E68;">Kräver ni inte ${tier}:s enterprise-funktioner (compliance, eDiscovery)? Då realiserar vi upp till <strong style="color:#1B7A6E;">${saving} kr/år</strong> för era ${seats} användare. Verifierad prisskillnad mot Microsofts publika listpris — vi visar ingen siffra vi inte kan stå för.</p>
</div>`;

const e5 = card({ curLabel: 'Microsoft 365 E5', curPer: '609,10', tgtPer: '210,29', tier: 'E5', saving: '119 643', seats: 25 });
const e3 = card({ curLabel: 'Microsoft 365 E3', curPer: '384,70', tgtPer: '210,29', tier: 'E3', saving: '83 717', seats: 40 });

const wrap = (inner) => `<body style="margin:0;padding:24px;background:#E9F0EC;font-family:Inter,system-ui,sans-serif;">
  <div style="max-width:640px;margin:0 auto;">${inner}</div></body>`;

mkdirSync('/tmp/m365-rs-shots', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const page = await browser.newPage({ viewport: { width: w, height: 700 } });
  await page.setContent(wrap(e5 + e3));
  await page.screenshot({ path: `/tmp/m365-rs-shots/${tag}.png`, fullPage: true });
  console.log(`✓ ${tag} (${w}px) → /tmp/m365-rs-shots/${tag}.png`);
}
await browser.close();
