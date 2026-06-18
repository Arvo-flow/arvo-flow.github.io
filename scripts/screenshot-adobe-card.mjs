// scripts/screenshot-adobe-card.mjs — visuell verifiering (regel 8) av Adobe rätt-storleks-kortet.
// Trogen statisk repro av kortets markup/inline-stilar (samma som TestaFaktura) vid 390px & 1600px,
// team- och individ-fallet. Endast QA. Kör: CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/screenshot-adobe-card.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const card = ({ cur, curP, tgtP, unit, saving, seats }) => `
<div style="margin-top:14px;padding:16px 18px;background:#F1F6F3;border:1px solid #BFD8D0;border-radius:12px;">
  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#1B7A6E;margin-bottom:8px;">Rätt-storlek — Adobe Creative Cloud (rådgivning)</div>
  <p style="margin:0;font-size:14px;line-height:1.55;color:#0E1A17;">Ni betalar för <strong>${cur}</strong> (${curP} ${unit} exkl moms) — hela sviten. Använder era användare i praktiken bara <strong>ett program</strong>? Då räcker <strong>Fristående program (Single App)</strong> (${tgtP} ${unit} exkl moms).</p>
  <p style="margin:8px 0 0;font-size:12px;color:#5C6E68;">Bekräfta så realiserar vi upp till <strong style="color:#1B7A6E;">${saving} kr/år</strong> för era ${seats} licenser. Verifierad prisskillnad mot Adobes publika listpris (adobe.com/se) — vi visar ingen siffra vi inte kan stå för.</p>
</div>`;

const team = card({ cur: 'Creative Cloud (Alla program)', curP: '985,00', tgtP: '381,00', unit: 'kr/licens/mån', saving: '28 992', seats: 4 });
const indiv = card({ cur: 'Creative Cloud (Alla program)', curP: '746,00', tgtP: '249,00', unit: 'kr/användare/mån', saving: '17 892', seats: 3 });

const wrap = (inner) => `<body style="margin:0;padding:24px;background:#E9F0EC;font-family:Inter,system-ui,sans-serif;"><div style="max-width:640px;margin:0 auto;">${inner}</div></body>`;

mkdirSync('/tmp/adobe-card-shots', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const page = await browser.newPage({ viewport: { width: w, height: 700 } });
  await page.setContent(wrap(team + indiv));
  await page.screenshot({ path: `/tmp/adobe-card-shots/${tag}.png`, fullPage: true });
  console.log(`✓ ${tag} (${w}px) → /tmp/adobe-card-shots/${tag}.png`);
}
await browser.close();
