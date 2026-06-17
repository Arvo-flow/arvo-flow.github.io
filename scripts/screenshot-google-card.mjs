// scripts/screenshot-google-card.mjs — visuell verifiering (regel 8) av M365-referenskortet på
// Google-kortet (saas-productivity). Trogen statisk repro av M365ReferenceBlock-markupen +
// inline-stilar (samma tokens som src/pages/TestaFaktura/styles.js) i båda lägena — med säten
// (Plus → Business Premium, 8 anv) och utan säten (Starter → Basic, per-säte) — vid 390px & 1600px.
// Endast QA, ingen prod. Kör: CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/screenshot-google-card.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

// Tokens ur src/theme.js
const C = { surface: '#FFFFFF', border: '#D5E2DC', ink: '#0E1A17', muted: '#3F4B47', brand: '#1B7A6E', brandSoft: '#DCEEEA' };
const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SANS = "'Inter', -apple-system, sans-serif";

const block = ({ tier, figure, per, sub }) => `
<div style="padding:20px 24px;border-radius:20px;background:${C.surface};border:1.5px solid ${C.border};margin-bottom:20px;">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
    <span style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${C.muted};">Verifierad referens — likvärdig svit</span>
    <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:${C.brand};background:${C.brandSoft};border-radius:4px;padding:2px 6px;">Microsoft listpris</span>
  </div>
  <div style="font-weight:700;color:${C.ink};font-size:15px;margin-bottom:8px;">${tier}</div>
  <div style="font-family:${MONO};font-size:34px;font-weight:600;line-height:1.1;letter-spacing:-0.02em;font-feature-settings:'tnum';color:${C.ink};">
    ${figure}&nbsp;kr<span style="font-family:${SANS};font-size:14px;font-weight:500;color:${C.muted};">${per}</span>
  </div>
  <div style="margin-top:8px;font-size:13px;color:${C.muted};line-height:1.55;">${sub}</div>
  <div style="margin-top:12px;padding-top:12px;border-top:1px solid ${C.border};font-size:12px;color:${C.muted};line-height:1.55;">
    <strong style="color:${C.ink};font-weight:600;">Detta är Microsofts publika listpris för den likvärdiga sviten — inte ert Google-pris.</strong> Google publicerar bara listpris i USD; ert faktiska kronpris jämför vi mot i offerten nedan.
  </div>
</div>`;

const withSeats = block({
  tier: 'Microsoft 365 Business Premium',
  figure: '1 682', per: '/mån för 8 användare',
  sub: '210,29 kr/användare/mån vid årsavtal · Närmaste motsvarighet på säkerhetsnivå: M365 Business Premium lägger till Intune MDM + Defender; Google Plus ger utökad säkerhet/eDiscovery.',
});
const perSeat = block({
  tier: 'Microsoft 365 Business Basic',
  figure: '57,40', per: '/användare/mån',
  sub: '57,40 kr/användare/mån vid årsavtal · Närmaste motsvarighet: båda är instegsnivåer (webb/mobil-appar, ingen desktop-Office).',
});

const wrap = (inner) => `<body style="margin:0;padding:24px;background:#E9F0EC;font-family:${SANS};">
  <div style="max-width:640px;margin:0 auto;">${inner}</div></body>`;

mkdirSync('/tmp/google-card-shots', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const page = await browser.newPage({ viewport: { width: w, height: 700 } });
  await page.setContent(wrap(withSeats + perSeat));
  await page.screenshot({ path: `/tmp/google-card-shots/${tag}.png`, fullPage: true });
  console.log(`✓ ${tag} (${w}px) → /tmp/google-card-shots/${tag}.png`);
}
await browser.close();
