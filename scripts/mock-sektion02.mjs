// scripts/mock-sektion02.mjs — MOCKUP: 02 · Arvo-kontoret. NUVARANDE (bara kalenderkort) vs
// FÖRSLAG (mini-instrument: vaktens hjärtslag + veckodom + kalender), samma dossier-tokens som
// rummet. Allt tydligt EXEMPEL-märkt — inga fabricerade kundtal. Rummet ska överglänsa dörren.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const D = { bg:'#080F0D', card:'#0C1512', ink:'#EAF4F0', muted:'#9DB8AF', faint:'#5F7A71',
  teal:'#2BC4AC', tealB:'#5DE8D2', signal:'#E05A4E', hair:'rgba(157,184,175,.13)' };
const MONO = "'JetBrains Mono',monospace"; const SERIF = "'Playfair Display',Georgia,serif";
const METALLIC = `background:linear-gradient(115deg,#EAF4F0 20%,#5DE8D2 42%,#EAF4F0 58%,#9DB8AF 80%);-webkit-background-clip:text;background-clip:text;color:transparent`;
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.045'/%3E%3C/svg%3E")`;

const key = () => `
  <div style="display:flex;justify-content:space-between;font-family:${MONO};font-size:9.5px;letter-spacing:.28em;text-transform:uppercase;border-bottom:1px solid ${D.hair};padding-bottom:14px">
    <span style="color:${D.teal}">02 · Arvo-kontoret</span><span style="color:${D.faint}">Konfidentiellt · ett rum per kund</span></div>`;

const head = () => `<h2 style="font-family:${SERIF};font-size:34px;font-weight:500;line-height:1.18;color:${D.ink};margin:40px 0 0">Det ni just läste finns redan.<br/><em style="font-style:italic;color:${D.tealB}">Och det jobbar i natt.</em></h2>`;

const calRows = () => [
  ['6 dagar', true, 'Bahnhof AB', 'Sista uppsägningsdag 15 juli — annars bundna till 15 januari.'],
  ['7 dagar', true, 'Fortnox AB', 'Trettio dagars varsel — räknat på dagen, aldrig avrundat.'],
  ['266 dagar', false, 'Telia', 'Ett redan missat fönster upptäckt — nästa bevakas: 1 april 2027.'],
].map(([d, akut, sup, txt]) => `
  <div style="display:flex;gap:16px;align-items:baseline;padding:13px 0;border-top:1px solid ${D.hair}">
    <span style="font-family:${MONO};font-size:12px;width:88px;flex-shrink:0;color:${akut ? D.signal : D.tealB}">${d}</span>
    <span><b style="font-size:14px;color:${D.ink};font-weight:600">${sup}</b><br/><span style="font-size:12px;color:${D.muted};line-height:1.5">${txt}</span></span>
  </div>`).join('');

// ── A · NUVARANDE ──
const nuvarande = `
${key()} ${head()}
<div style="max-width:620px;margin:52px auto 0">
  <div style="border:1px solid rgba(43,196,172,.30);border-radius:18px;padding:26px 28px;background:radial-gradient(520px 240px at 12% -18%,rgba(43,196,172,.12),transparent 60%),${D.card};box-shadow:0 40px 90px rgba(0,0,0,.55)">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px">
      <span style="font-family:${MONO};font-size:9.5px;letter-spacing:.24em;text-transform:uppercase;color:${D.teal}">● Kontraktskalendern</span>
      <span style="font-family:${MONO};font-size:9.5px;color:${D.faint}">5 avtal lästa</span></div>
    <div style="font-family:${SERIF};font-size:23px;color:${D.ink};font-weight:500;margin-bottom:6px">Två fönster stänger <em style="font-style:italic;color:${D.signal}">samma vecka.</em></div>
    ${calRows()}
  </div>
  <div style="text-align:center;font-family:${MONO};font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:${D.faint};margin-top:17px;line-height:1.9">Exempel ur ett Arvo-rum · maskinellt kontrollerad · varje datum ur kundens eget avtal</div>
</div>`;

// ── B · FÖRSLAG: mini-instrument (hjärtslag + veckodom + kalender) ──
const forslag = `
${key()} ${head()}
<div style="max-width:620px;margin:52px auto 0">
  <div style="border:1px solid rgba(43,196,172,.30);border-radius:18px;padding:0;overflow:hidden;background:radial-gradient(520px 240px at 12% -18%,rgba(43,196,172,.12),transparent 60%),${D.card};box-shadow:0 40px 90px rgba(0,0,0,.55);position:relative">
    <div style="position:absolute;inset:0;background-image:${GRAIN};pointer-events:none"></div>

    <!-- Vaktens hjärtslag -->
    <div style="position:relative;padding:20px 28px;border-bottom:1px solid ${D.hair};display:flex;align-items:center;gap:14px">
      <div style="position:relative;width:40px;height:40px;flex-shrink:0">
        <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="rgba(93,232,210,.18)" stroke-width="1"/><circle cx="20" cy="20" r="11" fill="none" stroke="rgba(93,232,210,.12)" stroke-width="1"/></svg>
        <div style="position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,transparent 0deg,rgba(93,232,210,.5) 360deg);mask:radial-gradient(circle,transparent 60%,#000 61%);-webkit-mask:radial-gradient(circle,transparent 60%,#000 61%)"></div>
        <div style="position:absolute;top:6px;right:9px;width:3px;height:3px;border-radius:50%;background:${D.tealB};box-shadow:0 0 8px ${D.tealB}"></div>
      </div>
      <div style="line-height:1.5">
        <div style="font-family:${MONO};font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:${D.faint}">Vakten · aldrig av</div>
        <div style="font-size:12.5px;color:${D.ink}">Bevakar <b>8 leverantörer</b> · senaste svep <b style="font-family:${MONO}">03:14</b> · <span style="color:${D.tealB}">allt lugnt</span></div>
      </div>
    </div>

    <!-- Veckodomen -->
    <div style="position:relative;padding:22px 28px 20px;border-bottom:1px solid ${D.hair}">
      <div style="font-family:${MONO};font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:${D.teal};margin-bottom:11px">Veckodomen</div>
      <div style="font-family:${SERIF};font-size:22px;font-weight:500;line-height:1.32;${METALLIC}">Gör inget denna vecka — men två fönster stänger. Vi sköter dem.</div>
    </div>

    <!-- Kalendern -->
    <div style="position:relative;padding:20px 28px 24px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
        <span style="font-family:${MONO};font-size:9.5px;letter-spacing:.24em;text-transform:uppercase;color:${D.teal}">Maktkalendern</span>
        <span style="font-family:${MONO};font-size:9.5px;color:${D.faint}">5 avtal lästa</span></div>
      ${calRows()}
    </div>
  </div>
  <div style="text-align:center;font-family:${MONO};font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:${D.faint};margin-top:17px;line-height:1.9">Exempel ur ett Arvo-rum · maskinellt kontrollerad · varje datum ur kundens eget avtal</div>
</div>`;

const label = (t) => `<div style="font-family:${MONO};font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#B4483E;border-top:3px solid #B4483E;padding:22px 26px 0;max-width:700px;margin:0 auto">${t}</div>`;

const html = `
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<body style="margin:0;background:${D.bg};font-family:Inter,system-ui,sans-serif;padding:8px 0 40px">
${label('A · Nuvarande — kalenderkortet ensamt')}
<div style="max-width:700px;margin:0 auto;padding:8px 22px 20px">${nuvarande}</div>
${label('B · Förslag — mini-instrument: hjärtslag + veckodom + kalender')}
<div style="max-width:700px;margin:0 auto;padding:8px 22px 20px">${forslag}</div>
</body>`;

const OUT = '/tmp/sek02-mock';
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[430, 'mobil'], [760, 'desktop']]) {
  const p = await b.newPage({ viewport: { width: w, height: 1200 }, deviceScaleFactor: 2 });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/${tag}.png`, fullPage: true });
  console.log('✓', tag);
  await p.close();
}
await b.close();
