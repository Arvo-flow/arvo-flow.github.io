// scripts/mockup-vakt3.mjs — PEAK premium-mockup: dossier-omslaget. Morgonhälsning + nattens dom i EN
// hjälte. Förfinad radar (svep-svans + ping-ring), mikrotypografi (tnum), vaxsigill, aurora. Trogen
// dossier-tokens. Kör: node scripts/mockup-vakt3.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const T = {
  bg: '#050B09', raised: '#0A1411', teal: '#2BC4AC', tealBright: '#5DD6CA', tealDeep: '#178A7B',
  ink: '#F4F9F7', muted: 'rgba(236,244,241,0.82)', faint: 'rgba(228,238,234,0.60)', ghost: 'rgba(228,238,234,0.38)',
  hair: 'rgba(255,255,255,0.09)',
  mono: "'JetBrains Mono', ui-monospace, monospace", serif: "'Playfair Display', Georgia, serif", sans: "'Inter', system-ui, sans-serif",
};

// Förfinad radar med svep-SVANS (rotation antydd) + ping-ring + blip-historik.
const radar = (size = 132) => {
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15) * Math.PI / 180, r1 = 56, r2 = i % 6 === 0 ? 50 : 53;
    return `<line x1="${60 + r1 * Math.cos(a)}" y1="${60 + r1 * Math.sin(a)}" x2="${60 + r2 * Math.cos(a)}" y2="${60 + r2 * Math.sin(a)}" stroke="${T.hair}" stroke-width="${i % 6 === 0 ? 1 : 0.6}"/>`;
  }).join('');
  // svep-svans: serie av wedge med fallande opacitet, leder vid -78°
  const trail = [0, 14, 28, 44, 62].map((d, i) => {
    const lead = -78, a0 = (lead - d) * Math.PI / 180, a1 = (lead - d - 16) * Math.PI / 180, R = 56;
    return `<path d="M60 60 L${60 + R * Math.cos(a0)} ${60 + R * Math.sin(a0)} A${R} ${R} 0 0 0 ${60 + R * Math.cos(a1)} ${60 + R * Math.sin(a1)} Z" fill="${T.teal}" opacity="${0.26 - i * 0.05}"/>`;
  }).join('');
  return `
<svg width="${size}" height="${size}" viewBox="0 0 120 120" style="flex-shrink:0">
  <defs><filter id="bl"><feGaussianBlur stdDeviation="1.8"/></filter></defs>
  <circle cx="60" cy="60" r="56" fill="none" stroke="${T.hair}"/>
  <circle cx="60" cy="60" r="40" fill="none" stroke="${T.hair}"/>
  <circle cx="60" cy="60" r="24" fill="none" stroke="${T.hair}"/>
  <circle cx="60" cy="60" r="10" fill="none" stroke="${T.hair}"/>
  <line x1="60" y1="4" x2="60" y2="116" stroke="${T.hair}" stroke-width="0.5"/>
  <line x1="4" y1="60" x2="116" y2="60" stroke="${T.hair}" stroke-width="0.5"/>
  ${ticks}${trail}
  <line x1="60" y1="60" x2="${60 + 56 * Math.cos(-78 * Math.PI / 180)}" y2="${60 + 56 * Math.sin(-78 * Math.PI / 180)}" stroke="${T.tealBright}" stroke-width="1.2" opacity="0.85"/>
  <!-- ny blip + ping-ring -->
  <circle cx="72" cy="30" r="10" fill="none" stroke="${T.tealBright}" stroke-width="0.8" opacity="0.25"/>
  <circle cx="72" cy="30" r="3.6" fill="${T.tealBright}" filter="url(#bl)"/>
  <circle cx="72" cy="30" r="2.1" fill="${T.tealBright}"/>
  <!-- äldre, falnande blip -->
  <circle cx="40" cy="78" r="2.2" fill="${T.teal}" opacity="0.45"/>
</svg>`;
};

// Vaxsigill — cirkulär verifierings-stämpel.
const seal = `
<svg width="76" height="76" viewBox="0 0 76 76" style="flex-shrink:0">
  <circle cx="38" cy="38" r="36" fill="none" stroke="${T.hair}"/>
  <circle cx="38" cy="38" r="29" fill="none" stroke="rgba(43,196,172,0.35)" stroke-dasharray="1.5 3"/>
  <path d="M30 38 l6 6 12-13" fill="none" stroke="${T.teal}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="38" y="62" text-anchor="middle" font-family="${T.mono}" font-size="6.4" letter-spacing="1.2" fill="${T.faint}">03:14</text>
  <text x="38" y="18" text-anchor="middle" font-family="${T.mono}" font-size="6.4" letter-spacing="1.6" fill="${T.faint}">VERIFIERAT</text>
</svg>`;

const tnum = `font-feature-settings:'tnum'`;
const tealW = (s) => `<span style="color:${T.tealBright}">${s}</span>`;

const hero = (greeting, verdictHtml, evidenceHtml) => `
<div style="position:relative;border:1px solid ${T.hair};border-radius:26px;overflow:hidden;
   background:radial-gradient(820px 420px at 18% -6%, rgba(43,196,172,0.11), transparent 58%), ${T.raised}">
  <!-- dossier-meta -->
  <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 30px;border-bottom:1px solid ${T.hair};
     font-family:${T.mono};font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:${T.ghost};${tnum}">
    <span>Arvo · Konfidentiellt · Lynxeye AB</span><span>28 juni 2026 · 03:14</span></div>
  <div style="display:flex;align-items:center;gap:34px;padding:34px 30px 30px">
    ${radar(132)}
    <div style="flex:1;min-width:0">
      <div style="display:flex;align-items:center;gap:9px;font-family:${T.mono};font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:${T.ghost};margin-bottom:18px">
        <span style="width:6px;height:6px;border-radius:50%;background:${T.teal};box-shadow:0 0 0 4px rgba(93,214,202,0.15),0 0 12px ${T.tealBright}"></span>
        Vakten · nattens dom</div>
      <div style="font-family:${T.serif};font-weight:500;font-size:34px;line-height:1.16;color:${T.ink};letter-spacing:-.015em">
        <span style="color:${T.muted};font-weight:400">${greeting}</span><br>${verdictHtml}</div>
    </div>
  </div>
  <!-- bevis + sigill -->
  <div style="display:flex;align-items:center;justify-content:space-between;gap:24px;padding:22px 30px;border-top:1px solid ${T.hair};
     background:rgba(255,255,255,0.012)">
    <div style="font-family:${T.mono};font-size:11.5px;letter-spacing:.01em;color:${T.faint};line-height:1.8;${tnum}">${evidenceHtml}</div>
    ${seal}
  </div>
</div>`;

const cap = (t) => `<div style="font-family:${T.mono};font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:${T.ghost};margin:30px 6px 14px">${t}</div>`;

const body = `<body style="margin:0;padding:46px 36px;background:${T.bg};font-family:${T.sans}">
  <div style="max-width:660px;margin:0 auto">
    ${cap('Peak — dossier-omslaget · lugnt läge')}
    ${hero('God morgon.', `Allt som rör er<br>är under ${tealW('kontroll')}.`,
      `36 marknadskällor svepta · 47 prispunkter bevakade<br>14 prisrörelser i marknaden — ${tealW('ingen rör era 11 avtal')}.`)}
    ${cap('Peak — en rörelse rör er')}
    ${hero('God morgon.', `Två rörelser rör er.<br>${tealW('Redan vägda')} — vila.`,
      `36 källor svepta · 14 prisrörelser fångade<br>${tealW('2 träffar era leverantörer')} · motdraget köat · ni gör inget`)}
  </div></body>`;

mkdirSync('/tmp/mockup', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [w, tag] of [[760, 'peak'], [440, 'mobil']]) {
  const p = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2 });
  await p.setContent(body);
  await p.screenshot({ path: `/tmp/mockup/vakt3-${tag}.png`, fullPage: true });
  console.log(`✓ ${tag}`);
}
await browser.close();
