// scripts/mockup-vakt-sep.mjs — MINIMAL separation av vakt-kortet (ingen redesign). Trogen repro av
// NUVARANDE kort + variant där intaget (era avtal) och marknaden (svepet) skiljs ÅT inuti samma lugna
// kort — utan ny ruta/sigill/meta. Kör: node scripts/mockup-vakt-sep.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const T = {
  bg: '#050B09', raised: '#0A1411', teal: '#2BC4AC', tealBright: '#5DD6CA',
  ink: '#F4F9F7', muted: 'rgba(236,244,241,0.82)', faint: 'rgba(228,238,234,0.60)', ghost: 'rgba(228,238,234,0.40)',
  hair: 'rgba(255,255,255,0.09)',
  mono: "'JetBrains Mono', ui-monospace, monospace", sans: "'Inter', system-ui, sans-serif",
};

const radar = `<svg width="46" height="46" viewBox="0 0 46 46">
  <circle cx="23" cy="23" r="21" fill="none" stroke="${T.hair}"/><circle cx="23" cy="23" r="12" fill="none" stroke="${T.hair}"/>
  <path d="M23 23 L23 2 A21 21 0 0 1 41 14 Z" fill="${T.teal}" opacity="0.20"/>
  <line x1="23" y1="23" x2="23" y2="2" stroke="${T.tealBright}" stroke-width="1" opacity="0.7"/>
  <circle cx="34" cy="13" r="2.3" fill="${T.tealBright}"/></svg>`;

const head = (sub) => `<div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">${radar}
  <div><div style="font-family:${T.mono};font-size:11px;letter-spacing:.22em;color:${T.ink};font-weight:600">VAKTEN</div>
  <div style="font-family:${T.mono};font-size:11px;letter-spacing:.22em;color:${T.faint}">${sub}</div></div></div>`;

const row = (k, v, top = true) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;${top ? `border-top:1px solid ${T.hair};` : ''}">
  <span style="font-family:${T.sans};font-size:14px;color:${T.muted}">${k}</span>
  <span style="font-family:${T.mono};font-size:15px;color:${T.ink};font-feature-settings:'tnum'">${v}</span></div>`;

const sweepLine = (txt) => `<div style="font-family:${T.sans};font-size:12.5px;color:${T.faint};line-height:1.5;display:flex;gap:9px;align-items:baseline">
  <span style="flex-shrink:0;width:7px;height:7px;border-radius:50%;background:${T.teal};box-shadow:0 0 8px ${T.tealBright};transform:translateY(2px)"></span><span>${txt}</span></div>`;

const microlabel = (t) => `<div style="font-family:${T.mono};font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:${T.ghost};margin:2px 0 6px">${t}</div>`;

const card = (inner) => `<div style="border:1px solid ${T.hair};border-radius:20px;background:${T.raised};padding:22px 24px;margin-bottom:8px">${inner}</div>`;

// A — NUVARANDE (era avtal + marknad om varandra, "Marknadskällor 36" som föräldralös rad)
const current = card(`${head('BEVAKAR ERA AVTAL')}
  ${row('Leverantörer', '11', false)}${row('Prissatta', '14')}${row('Under uppsikt', '9')}${row('Marknadskällor', '36')}
  <div style="margin-top:14px;padding-top:13px;border-top:1px solid ${T.hair}">${sweepLine('Senaste svep i dag 00:03 · 14 prisavvikelser i marknaden')}</div>`);

// B — SEPARERAD utan etiketter: intaget (3 rader) · marknaden blir EN svep-rad (36 folds in). En tydligare linje skiljer.
const sepBare = card(`${head('BEVAKAR ERA AVTAL')}
  ${row('Leverantörer', '11', false)}${row('Prissatta', '14')}${row('Under uppsikt', '9')}
  <div style="margin-top:16px;padding-top:15px;border-top:1px solid rgba(255,255,255,0.14)">
    ${sweepLine('Senaste svep 00:03 · <b style="color:'+T.muted+';font-weight:500">36 marknadskällor</b> svepta · 14 prisrörelser i marknaden')}</div>`);

// C — SEPARERAD med hårfina etiketter (två grupper namngivna)
const sepLabeled = card(`${head('BEVAKAR ERA AVTAL')}
  ${microlabel('Era avtal')}
  ${row('Leverantörer', '11', false)}${row('Prissatta', '14')}${row('Under uppsikt', '9')}
  <div style="margin-top:16px;padding-top:15px;border-top:1px solid rgba(255,255,255,0.14)">
    ${microlabel('Marknaden')}
    ${sweepLine('Senaste svep 00:03 · <b style="color:'+T.muted+';font-weight:500">36 källor</b> svepta · 14 prisrörelser i marknaden')}</div>`);

const cap = (t) => `<div style="font-family:${T.mono};font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:${T.ghost};margin:26px 6px 12px">${t}</div>`;

const body = `<body style="margin:0;padding:36px 22px;background:${T.bg};font-family:${T.sans}">
  <div style="max-width:440px;margin:0 auto">
    ${cap('A · Nuvarande (avtal + marknad om varandra)')}${current}
    ${cap('B · Separerad — utan etiketter (marknaden blir en svep-rad)')}${sepBare}
    ${cap('C · Separerad — med hårfina etiketter (Era avtal / Marknaden)')}${sepLabeled}
  </div></body>`;

mkdirSync('/tmp/mockup', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await browser.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 2 });
await p.setContent(body);
await p.screenshot({ path: `/tmp/mockup/vakt-sep.png`, fullPage: true });
console.log('✓ vakt-sep');
await browser.close();
