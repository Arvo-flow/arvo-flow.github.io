// scripts/mock-kontraktskalender.mjs — DESIGNMOCKUP (ej produktkod): Kontraktskalendern,
// rummets vy när FLERA avtal är lästa. Datat är fällornas VERKLIGA klockutfall
// (tests/avtal-fallor.mjs facit, idag = 2026-07-09) — aldrig påhittade siffror.
// Husmönstret: trogen statisk repro i dossier-tokens vid 390/1600 (jfr screenshot-m365).
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const T = { bg:'#0A1210', card:'#0E1815', ink:'#EAF4F0', muted:'#9DB8AF', faint:'#5F7A71',
  teal:'#2BC4AC', tealB:'#5DE8D2', signal:'#E05A4E', amber:'#E0A23C', hair:'rgba(157,184,175,.14)' };
const MONO = "'JetBrains Mono',monospace"; const SERIF = "'Playfair Display',Georgia,serif";

// Fällornas riktiga klockor per 2026-07-09 (handräknade i tests/avtal-fallor.mjs)
const ROWS = [
  { sup:'Bahnhof AB',  deadline:'15 juli 2026',  days:6,   akut:true,  miss:'annars bundna till 15 jan 2027',  typ:'rullande 3+3' },
  { sup:'Fortnox AB',  deadline:'16 juli 2026',  days:7,   akut:true,  miss:'annars fullt licensår till 15 aug 2027', typ:'årsvis · 30 dagars varsel' },
  { sup:'Telia',       deadline:'1 april 2027',  days:266, akut:false, miss:'annars bundna till 1 jul 2028',   typ:'24 mån → +12' },
  { sup:'Nordic Managed IT', deadline:'1 sep 2027', days:419, akut:false, miss:'annars +24 mån till 1 mar 2030', typ:'36 mån · rek. brev' },
];
const ROLLING = { sup:'GleSYS AB', typ:'tills vidare', note:'ute när som helst — 1 mån varsel · OBS indexklausul +4 %/år varje januari' };

const row = (r) => `
  <div style="display:flex;align-items:baseline;gap:14px;padding:13px 0;border-top:1px solid ${T.hair}">
    <span style="font-family:${MONO};font-size:12px;width:86px;flex-shrink:0;color:${r.akut ? T.signal : T.tealB}">${r.days} dagar</span>
    <div style="flex:1;min-width:0">
      <div style="font-size:14px;font-weight:600;color:${T.ink}">${r.sup} <span style="font-family:${MONO};font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:${T.faint};margin-left:6px">${r.typ}</span></div>
      <div style="font-size:12px;color:${T.muted};margin-top:3px">Sista uppsägningsdag <b style="color:${T.ink}">${r.deadline}</b> — ${r.miss}.</div>
    </div>
    ${r.akut ? `<span style="font-family:${MONO};font-size:9px;letter-spacing:.16em;color:${T.signal};border:1px solid ${T.signal}55;border-radius:100px;padding:4px 10px;flex-shrink:0">FÖNSTER ÖPPET</span>` : ''}
  </div>`;

const html = `
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<body style="margin:0;background:${T.bg};font-family:Inter,system-ui,sans-serif;padding:28px 18px">
<div style="max-width:760px;margin:0 auto">

  <div style="font-family:${MONO};font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:${T.teal};margin-bottom:14px">● Kontraktskalendern · 5 avtal lästa</div>

  <div style="border:1px solid ${T.teal}44;border-radius:14px;padding:20px;background:radial-gradient(560px 260px at 8% -22%, rgba(43,196,172,.10), transparent 60%), ${T.card}">
    <h2 style="font-family:${SERIF};font-size:24px;font-weight:600;color:${T.ink};margin:0 0 6px;line-height:1.25">
      Två fönster stänger <span style="color:${T.signal}">samma vecka.</span>
    </h2>
    <p style="font-size:13px;line-height:1.6;color:${T.muted};margin:0 0 6px">
      Bahnhof och Fortnox går att lämna <b style="color:${T.ink}">fram till 15–16 juli</b> — sedan är ni
      bundna till januari respektive nästa sommar. Resten av året är lugnt; nästa fönster efter det öppnar i april 2027.
    </p>
    <div style="font-family:${MONO};font-size:10px;color:${T.faint};letter-spacing:.06em;margin-bottom:4px">varje datum ur ert eget avtal · citat på varje rad i innehavet</div>
    ${ROWS.map(row).join('')}
    <div style="display:flex;align-items:baseline;gap:14px;padding:13px 0;border-top:1px solid ${T.hair}">
      <span style="font-family:${MONO};font-size:12px;width:86px;flex-shrink:0;color:${T.muted}">löpande</span>
      <div style="flex:1"><div style="font-size:14px;font-weight:600;color:${T.ink}">${ROLLING.sup} <span style="font-family:${MONO};font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:${T.faint};margin-left:6px">${ROLLING.typ}</span></div>
      <div style="font-size:12px;color:${T.muted};margin-top:3px">${ROLLING.note}.</div></div>
    </div>
    <div style="margin-top:14px;padding-top:12px;border-top:1px solid ${T.hair};font-size:11.5px;color:${T.faint}">
      Vakten mejlar er 30 och 7 dagar före varje fönster. Årshjulet: <b style="color:${T.muted}">2 fönster i juli · 1 i april 2027 · 1 i september 2027 · 1 löpande</b>.
    </div>
  </div>

  <div style="margin-top:16px;border:1px dashed ${T.teal}55;border-radius:14px;padding:18px;text-align:center">
    <div style="font-size:13px;font-weight:600;color:${T.teal}">⬆ Släpp era avtal här — flera på en gång</div>
    <div style="font-size:11.5px;color:${T.faint};margin-top:5px">Vi läser varje avtal, lägger det på rätt leverantörs innehav och bygger kalendern åt er.</div>
  </div>

</div></body>`;

mkdirSync('/tmp/kalender-mock', { recursive: true });
const b = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `/tmp/kalender-mock/${tag}.png`, fullPage: true });
  console.log('✓', tag);
}
await b.close();
