// scripts/mockup-vakt.mjs — MOCKUP (ej implementering) av vakt-blocket: två röster i st f räknar-rutnät.
// Trogen dossier-tokens. Visar FÖRE (counter-grid) och EFTER (marknadssvepet som vaktens röst +
// intaget som liggarnas ingång), i två marknadslägen (lugnt / rörelse rör er). Kör: node scripts/mockup-vakt.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const T = {
  bg: '#050B09', raised: '#0B1612', teal: '#2BC4AC', tealBright: '#5DD6CA',
  ink: '#F4F9F7', muted: 'rgba(236,244,241,0.80)', faint: 'rgba(228,238,234,0.62)',
  hair: 'rgba(255,255,255,0.12)',
  mono: "'JetBrains Mono', ui-monospace, monospace", serif: "'Playfair Display', Georgia, serif", sans: "'Inter', system-ui, sans-serif",
};

const radar = `<svg width="44" height="44" viewBox="0 0 44 44" style="flex-shrink:0">
  <circle cx="22" cy="22" r="20" fill="none" stroke="${T.hair}"/>
  <circle cx="22" cy="22" r="12" fill="none" stroke="${T.hair}"/>
  <path d="M22 22 L22 2 A20 20 0 0 1 38 14 Z" fill="${T.teal}" opacity="0.22"/>
  <circle cx="33" cy="13" r="2.4" fill="${T.tealBright}"/>
</svg>`;

const card = (inner) => `<div style="border:1px solid ${T.hair};border-radius:20px;background:${T.raised};padding:22px 24px;margin-bottom:18px">${inner}</div>`;

// FÖRE — räknar-rutnätet (det vi har)
const before = card(`
  <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">${radar}
    <div><div style="font-family:${T.mono};font-size:11px;letter-spacing:.22em;color:${T.ink};font-weight:600">VAKTEN</div>
    <div style="font-family:${T.mono};font-size:11px;letter-spacing:.22em;color:${T.faint}">BEVAKAR ERA AVTAL</div></div></div>
  ${[['Leverantörer','11'],['Prissatta','14'],['Under uppsikt','9'],['Marknadskällor','36']].map(([k,v])=>
    `<div style="display:flex;justify-content:space-between;padding:9px 0;border-top:1px solid ${T.hair};font-family:${T.sans}">
      <span style="font-size:14px;color:${T.muted}">${k}</span><span style="font-size:15px;color:${T.ink};font-family:${T.mono}">${v}</span></div>`).join('')}
  <div style="margin-top:14px;padding-top:12px;border-top:1px solid ${T.hair};font-size:12.5px;color:${T.faint};font-family:${T.sans}">
    <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${T.teal};margin-right:7px"></span>Senaste svep i dag 00:03 · 14 prisavvikelser i marknaden</div>
`);

// EFTER — vaktens röst (marknaden), två lägen
const voiceCard = (verdict) => card(`
  <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">${radar}
    <div><div style="font-family:${T.mono};font-size:11px;letter-spacing:.22em;color:${T.teal};font-weight:600">VAKTEN</div>
    <div style="font-family:${T.mono};font-size:11px;letter-spacing:.22em;color:${T.faint}">BEVAKAR MARKNADEN</div></div></div>
  <div style="font-family:${T.mono};font-size:11px;letter-spacing:.14em;color:${T.faint};margin-bottom:10px">
    <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${T.teal};margin-right:7px;box-shadow:0 0 10px ${T.tealBright}"></span>NATTENS SVEP 03:14</div>
  <p style="margin:0;font-family:${T.serif};font-size:21px;line-height:1.4;color:${T.ink};font-weight:500">
    36 marknadskällor svepta, 14 prisrörelser fångade.<br><span style="color:${T.tealBright}">${verdict}</span></p>
  <div style="margin-top:14px;font-family:${T.mono};font-size:11px;letter-spacing:.04em;color:${T.faint}">47 prispunkter bevakade · grundat på publika listpriser</div>
`);

// EFTER — intaget som liggarnas ingång (om ER data, inte marknaden)
const intake = `<div style="margin:30px 0 16px">
  <div style="font-family:${T.mono};font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:${T.teal};padding-bottom:12px;border-bottom:1px solid ${T.hair}">Era inlästa fakturor · 23</div>
  <p style="margin:14px 0 0;font-family:${T.sans};font-size:15px;line-height:1.6;color:${T.muted}">
    Vi läste <b style="color:${T.ink}">23 fakturor</b> ni skickade: <b style="color:${T.ink}">14 prissatta</b> mot verifierat golv,
    <b style="color:${T.ink}">9 under uppsikt</b>. Inget föll mellan stolarna.</p></div>`;

const label = (t) => `<div style="font-family:${T.mono};font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:${T.faint};margin:6px 0 12px">${t}</div>`;

const page = `<body style="margin:0;padding:32px;background:${T.bg};font-family:${T.sans}">
  <div style="max-width:560px;margin:0 auto">
    ${label('— FÖRE · räknar-rutnät (fakturor och marknad om varandra) —')}
    ${before}
    <div style="height:28px"></div>
    ${label('— EFTER · vaktens röst = marknaden (lugnt läge) —')}
    ${voiceCard('Ingen rör era avtal — ni är opåverkade.')}
    ${label('— EFTER · vaktens röst = marknaden (en rörelse rör er) —')}
    ${voiceCard('2 rör era leverantörer — båda redan vägda.')}
    ${label('— EFTER · intaget = liggarnas ingång (om er data) —')}
    ${intake}
  </div></body>`;

mkdirSync('/tmp/mockup', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [w, tag] of [[640, 'mockup'], [430, 'mobil']]) {
  const p = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2 });
  await p.setContent(page);
  await p.screenshot({ path: `/tmp/mockup/vakt-${tag}.png`, fullPage: true });
  console.log(`✓ ${tag}`);
}
await browser.close();
