// scripts/mock-kvittering.mjs — DESIGNMOCKUP (ej produktkod): kvitteringen av ett öppet
// fönster — tre lägen (öppet med två handlingar · uppsagt/nedräkning · valt att stanna).
// Principen: kvitteringen är en ÖVERLÄMNING till vakten (claim → verify), aldrig en mute.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const T = { bg:'#0A1210', card:'#0E1815', ink:'#EAF4F0', muted:'#9DB8AF', faint:'#5F7A71',
  teal:'#2BC4AC', tealB:'#5DE8D2', signal:'#E05A4E', hair:'rgba(157,184,175,.14)' };
const MONO = "'JetBrains Mono',monospace"; const SERIF = "'Playfair Display',Georgia,serif";

const panel = (label, inner, border = T.hair) => `
  <div style="flex:1;min-width:300px">
    <div style="font-family:${MONO};font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:${T.faint};margin-bottom:8px">${label}</div>
    <div style="border:1px solid ${border};border-radius:12px;padding:16px;background:${T.card}">${inner}</div>
  </div>`;

const head = (chipTxt, chipCol) => `
  <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px">
    <div><div style="font-size:14px;font-weight:600;color:${T.ink}">Bahnhof AB <span style="font-family:${MONO};font-size:9px;color:${T.faint};letter-spacing:.1em">RULLANDE 3+3</span></div></div>
    <span style="font-family:${MONO};font-size:8.5px;letter-spacing:.14em;color:${chipCol};border:1px solid ${chipCol}55;border-radius:100px;padding:3px 9px;white-space:nowrap">${chipTxt}</span>
  </div>`;

const A = panel('Läge 1 · Fönstret öppet — två handlingar', `
  ${head('FÖNSTER ÖPPET', T.signal)}
  <div style="border:1px solid ${T.signal}44;border-radius:8px;padding:9px 12px;margin-top:11px;font-size:12px;color:${T.muted}">
    Sista uppsägningsdag <span style="font-family:${MONO};color:${T.ink}">15 juli</span> · <span style="font-family:${MONO};color:${T.signal}">6 dagar kvar</span>
  </div>
  <div style="font-size:11.5px;color:${T.muted};margin-top:9px"><b style="color:${T.ink}">Fällan:</b> missas fönstret är ni bundna till 15 jan 2027.</div>
  <div style="display:flex;gap:8px;margin-top:13px;flex-wrap:wrap">
    <button style="flex:1;min-width:130px;font-family:Inter;font-size:12px;font-weight:600;color:#06231d;background:linear-gradient(135deg,${T.tealB},${T.teal});border:none;border-radius:100px;padding:11px 14px">Vi har sagt upp ✓</button>
    <button style="flex:1;min-width:130px;font-family:Inter;font-size:12px;font-weight:600;color:${T.muted};background:none;border:1px solid ${T.hair};border-radius:100px;padding:11px 14px">Vi stannar denna period</button>
  </div>
  <div style="font-size:10px;color:${T.faint};margin-top:9px">Osäkra? Gör inget — vi fortsätter varna tills fönstret stängs.</div>
`, T.signal + '44');

const B = panel('Läge 2 · Uppsagt — klockan räknar ner, om-vakten armerad', `
  ${head('UPPSAGT · LÖPER UT 15 OKT', T.tealB)}
  <div style="border:1px solid ${T.teal}44;border-radius:8px;padding:9px 12px;margin-top:11px;font-size:12px;color:${T.muted}">
    Avtalet upphör <span style="font-family:${MONO};color:${T.ink}">15 okt 2026</span> · <span style="font-family:${MONO};color:${T.tealB}">98 dagar</span>
  </div>
  <div style="font-size:11.5px;color:${T.muted};margin-top:9px">
    Markerad som uppsagd <b style="color:${T.ink}">av er · 9 juli</b>. Varningarna är tysta.
  </div>
  <div style="font-size:11.5px;color:${T.muted};margin-top:7px">
    <b style="color:${T.ink}">Om-vakten:</b> efter 15 okt ska Bahnhof försvinna ur ert fakturaflöde —
    fortsätter fakturorna komma <b style="color:${T.signal}">larmar vi</b>.
  </div>
  <div style="font-family:${MONO};font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:${T.faint};margin-top:11px">▸ Ångra — vi sade inte upp ändå</div>
`, T.teal + '44');

const C = panel('Läge 3 · Valt att stanna — lugnet registrerat, nästa fönster bevakas', `
  ${head('VALT ATT STANNA', T.muted)}
  <div style="border:1px solid ${T.hair};border-radius:8px;padding:9px 12px;margin-top:11px;font-size:12px;color:${T.muted}">
    Nästa fönster <span style="font-family:${MONO};color:${T.ink}">15 okt 2026</span> · varnar igen då
  </div>
  <div style="font-size:11.5px;color:${T.muted};margin-top:9px">
    Ni valde att behålla Bahnhof <b style="color:${T.ink}">denna period · 9 juli</b>.
    Larmet är tyst till nästa fönster — <b style="color:${T.ink}">bevakningen fortsätter</b>,
    och höjer Bahnhof priset hör ni av oss direkt.
  </div>
  <div style="font-family:${MONO};font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:${T.faint};margin-top:11px">▸ Ångra — öppna fönstret igen</div>
`);

const html = `
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<body style="margin:0;background:${T.bg};font-family:Inter,system-ui,sans-serif;padding:28px 18px">
<div style="max-width:1080px;margin:0 auto">
  <div style="font-family:${MONO};font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:${T.teal};margin-bottom:6px">● Kvitteringen · fönstret hanteras</div>
  <div style="font-family:${SERIF};font-size:19px;color:${T.ink};margin-bottom:16px">Kvitteringen är en överlämning till vakten — aldrig en mute-knapp.</div>
  <div style="display:flex;gap:14px;flex-wrap:wrap">${A}${B}${C}</div>
</div></body>`;

mkdirSync('/tmp/kvittering-mock', { recursive: true });
const b = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `/tmp/kvittering-mock/${tag}.png`, fullPage: true });
  console.log('✓', tag);
}
await b.close();
