// scripts/mockup-vakt2.mjs — FÖRFINAD premium-mockup av vakt-hjälten. Domen leder (serif, lugn),
// beviset under (mono, tyst), teal ENDAST på slutsatsen. Radar med svep-gradient + glöd. Källsigill.
// Trogen dossier-tokens. Kör: node scripts/mockup-vakt2.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const T = {
  bg: '#050B09', raised: '#0B1612', teal: '#2BC4AC', tealBright: '#5DD6CA', tealDeep: '#178A7B',
  ink: '#F4F9F7', muted: 'rgba(236,244,241,0.80)', faint: 'rgba(228,238,234,0.62)', ghost: 'rgba(228,238,234,0.40)',
  hair: 'rgba(255,255,255,0.10)',
  mono: "'JetBrains Mono', ui-monospace, monospace", serif: "'Playfair Display', Georgia, serif", sans: "'Inter', system-ui, sans-serif",
};

// Förfinad radar — koncentriska ringar, kryss, svep-wedge med gradient, glödande blip.
const radar = (size = 92) => `
<svg width="${size}" height="${size}" viewBox="0 0 100 100" style="flex-shrink:0">
  <defs>
    <radialGradient id="sweep" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${T.teal}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${T.teal}" stop-opacity="0"/>
    </radialGradient>
    <filter id="g"><feGaussianBlur stdDeviation="1.6"/></filter>
  </defs>
  <circle cx="50" cy="50" r="46" fill="none" stroke="${T.hair}"/>
  <circle cx="50" cy="50" r="31" fill="none" stroke="${T.hair}"/>
  <circle cx="50" cy="50" r="16" fill="none" stroke="${T.hair}"/>
  <line x1="50" y1="4" x2="50" y2="96" stroke="${T.hair}" stroke-width="0.6"/>
  <line x1="4" y1="50" x2="96" y2="50" stroke="${T.hair}" stroke-width="0.6"/>
  <path d="M50 50 L50 4 A46 46 0 0 1 88 28 Z" fill="url(#sweep)"/>
  <line x1="50" y1="50" x2="50" y2="4" stroke="${T.tealBright}" stroke-width="1" opacity="0.6"/>
  <circle cx="73" cy="20" r="3.4" fill="${T.tealBright}" filter="url(#g)"/>
  <circle cx="73" cy="20" r="2" fill="${T.tealBright}"/>
</svg>`;

const seal = `<span style="display:inline-flex;align-items:center;gap:7px;font-family:${T.mono};font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:${T.teal};border:1px solid ${T.hair};border-radius:999px;padding:5px 12px">
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="${T.teal}" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>Verifierat · 03:14</span>`;

// Hjälten: dom (serif) leder, bevis (mono) under, teal endast på slutsatsens nyckelord.
const hero = (verdictHtml, evidence) => `
<div style="position:relative;border:1px solid ${T.hair};border-radius:24px;background:
   radial-gradient(680px 360px at 22% 0%, rgba(43,196,172,0.10), transparent 60%), ${T.raised};
   padding:34px 36px;overflow:hidden">
  <div style="display:flex;align-items:flex-start;gap:26px">
    ${radar(92)}
    <div style="flex:1;min-width:0">
      <div style="display:flex;align-items:center;gap:9px;font-family:${T.mono};font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:${T.ghost};margin-bottom:16px">
        <span style="width:7px;height:7px;border-radius:50%;background:${T.teal};box-shadow:0 0 0 4px rgba(93,214,202,0.16),0 0 12px ${T.tealBright}"></span>
        Vakten · marknadssvep</div>
      <div style="font-family:${T.serif};font-weight:500;font-size:30px;line-height:1.22;color:${T.ink};letter-spacing:-.01em;margin-bottom:18px">${verdictHtml}</div>
      <div style="font-family:${T.mono};font-size:11.5px;letter-spacing:.02em;color:${T.faint};line-height:1.75;font-feature-settings:'tnum'">${evidence}</div>
      <div style="margin-top:20px;padding-top:16px;border-top:1px solid ${T.hair};display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap">
        ${seal}
        <span style="font-family:${T.mono};font-size:10.5px;letter-spacing:.04em;color:${T.ghost}">grundat på publika listpriser</span>
      </div>
    </div>
  </div>
</div>`;

// Intaget — andra rösten, tyst och skild. Om ER data.
const intake = `<div style="margin:30px 4px 0">
  <div style="font-family:${T.mono};font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:${T.faint};padding-bottom:13px;border-bottom:1px solid ${T.hair}">
    Innehavet · 23 inlästa fakturor</div>
  <p style="margin:15px 0 0;font-family:${T.sans};font-size:15px;line-height:1.62;color:${T.muted}">
    <b style="color:${T.ink};font-weight:600">14 prissatta</b> mot verifierat marknadsgolv ·
    <b style="color:${T.ink};font-weight:600">9 under uppsikt</b> · inget föll mellan stolarna.</p></div>`;

const cap = (t) => `<div style="font-family:${T.mono};font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:${T.ghost};margin:30px 4px 13px">${t}</div>`;
const tealW = (s) => `<span style="color:${T.tealBright}">${s}</span>`;

const body = `<body style="margin:0;padding:40px 32px;background:${T.bg};font-family:${T.sans}">
  <div style="max-width:600px;margin:0 auto">
    ${cap('Premium — lugnt läge (domen leder, beviset under)')}
    ${hero(`Allt som rör er<br>är under ${tealW('kontroll')}.`,
      `03:14 i natt · 36 marknadskällor svepta · 47 prispunkter<br>14 prisrörelser i marknaden — ${tealW('ingen rör era 11 avtal')}.`)}
    ${cap('Premium — en rörelse rör er')}
    ${hero(`Två rörelser rör er.<br>${tealW('Redan vägda')} — ni behöver inget göra.`,
      `03:14 i natt · 36 marknadskällor svepta · 14 prisrörelser fångade<br>${tealW('2 träffar era leverantörer')} · motdraget köat`)}
    ${cap('Andra rösten — intaget (om er data)')}
    ${intake}
  </div></body>`;

mkdirSync('/tmp/mockup', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [w, tag] of [[680, 'premium'], [430, 'mobil']]) {
  const p = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2 });
  await p.setContent(body);
  await p.screenshot({ path: `/tmp/mockup/vakt2-${tag}.png`, fullPage: true });
  console.log(`✓ ${tag}`);
}
await browser.close();
