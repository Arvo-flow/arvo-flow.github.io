// scripts/mock-sektion02-v2.mjs — MOCKUP: 02 · Arvo-kontoret, TOP 0,1%-konceptet.
// Den tysta veckan som HJÄLTE (bibelns tes: produkten är vakten, inte fyndet) + den LEVANDE
// FORTSÄTTNINGEN från dörren (rummet personaliseras mot vad avslöjandet just hittade — tråden
// "hur visste de det?" bryts aldrig, den fördjupas till "och de släpper det aldrig").
// Allt exempel-märkt — i skarpt läge fylls kortet med besökarens EGNA nyss-avslöjade fakta.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const D = { bg:'#080F0D', card:'#0C1512', ink:'#EAF4F0', muted:'#9DB8AF', faint:'#5F7A71',
  teal:'#2BC4AC', tealB:'#5DE8D2', signal:'#E05A4E', hair:'rgba(157,184,175,.13)' };
const MONO = "'JetBrains Mono',monospace"; const SERIF = "'Playfair Display',Georgia,serif";
const METALLIC = `background:linear-gradient(115deg,#EAF4F0 20%,#5DE8D2 42%,#EAF4F0 58%,#9DB8AF 80%);-webkit-background-clip:text;background-clip:text;color:transparent`;
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.045'/%3E%3C/svg%3E")`;

const card = `
<div style="position:relative;max-width:640px;margin:52px auto 0;border:1px solid rgba(43,196,172,.30);border-radius:20px;overflow:hidden;background:radial-gradient(560px 260px at 12% -18%,rgba(43,196,172,.13),transparent 60%),${D.card};box-shadow:0 50px 110px rgba(0,0,0,.6)">
  <div style="position:absolute;inset:0;background-image:${GRAIN};pointer-events:none"></div>
  <div style="position:absolute;inset:9px;border:1px solid rgba(157,184,175,.08);border-radius:13px;pointer-events:none"></div>

  <!-- Vaktens hjärtslag: beviset att en maskin var vaken i natt -->
  <div style="position:relative;padding:20px 30px;border-bottom:1px solid ${D.hair};display:flex;align-items:center;gap:15px">
    <div style="position:relative;width:44px;height:44px;flex-shrink:0">
      <svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" fill="none" stroke="rgba(93,232,210,.18)" stroke-width="1"/><circle cx="22" cy="22" r="12" fill="none" stroke="rgba(93,232,210,.12)" stroke-width="1"/></svg>
      <div style="position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 30deg,transparent 0deg,rgba(93,232,210,.5) 360deg);mask:radial-gradient(circle,transparent 58%,#000 59%);-webkit-mask:radial-gradient(circle,transparent 58%,#000 59%)"></div>
      <div style="position:absolute;top:7px;right:11px;width:3.5px;height:3.5px;border-radius:50%;background:${D.tealB};box-shadow:0 0 9px ${D.tealB}"></div>
    </div>
    <div style="line-height:1.55">
      <div style="font-family:${MONO};font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:${D.faint}">Vakten · Lekia AB · aldrig av</div>
      <div style="font-size:13px;color:${D.ink}">Svepte <b>8 leverantörer · 40 marknadskällor</b> i natt <b style="font-family:${MONO}">03:14</b> — <span style="color:${D.tealB}">allt lugnt</span></div>
    </div>
  </div>

  <!-- Veckodomen: den tysta veckan som hjälte (metallic, förtjänat lugn) -->
  <div style="position:relative;padding:26px 30px 22px;border-bottom:1px solid ${D.hair}">
    <div style="font-family:${MONO};font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:${D.teal};margin-bottom:13px">Veckodomen</div>
    <div style="font-family:${SERIF};font-size:26px;font-weight:500;line-height:1.28;${METALLIC}">En vanlig vecka hos er. Ingenting kräver er — vi vägde era priser i natt, allt håller.</div>
  </div>

  <!-- Den levande fortsättningen från dörren -->
  <div style="position:relative;padding:22px 30px;border-bottom:1px solid ${D.hair}">
    <div style="font-size:13.5px;line-height:1.65;color:${D.muted}">
      Det ni just såg i dörren — att ni kör <b style="color:${D.ink}">Microsoft 365</b>, ägs av en <b style="color:${D.ink}">koncern om 4 bolag</b>, bär en <b style="color:${D.ink}">öppen förfalskningslucka</b> — var första ögonkastet. I ert rum blir det rad ett, och vakten läser vidare <em style="color:${D.tealB};font-style:normal">varje natt.</em></div>
  </div>

  <!-- Kalendern som ÅTERFÖRSÄKRAN, inte larm: köad, hanterad -->
  <div style="position:relative;padding:20px 30px 26px">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
      <span style="font-family:${MONO};font-size:9.5px;letter-spacing:.24em;text-transform:uppercase;color:${D.teal}">Maktkalendern · motdraget köat</span>
      <span style="font-family:${MONO};font-size:9.5px;color:${D.faint}">5 avtal lästa</span></div>
    <div style="display:flex;gap:16px;align-items:baseline;padding:12px 0;border-top:1px solid ${D.hair}">
      <span style="font-family:${MONO};font-size:12px;width:78px;flex-shrink:0;color:${D.tealB}">41 dagar</span>
      <span><b style="font-size:13.5px;color:${D.ink}">Telia</b><br/><span style="font-size:12px;color:${D.muted};line-height:1.5">Uppsägningsfönstret öppnar 22 aug — motbudet ligger färdigt. Ni behöver inte minnas det.</span></span></div>
    <div style="display:flex;gap:16px;align-items:baseline;padding:12px 0;border-top:1px solid ${D.hair}">
      <span style="font-family:${MONO};font-size:12px;width:78px;flex-shrink:0;color:${D.tealB}">83 dagar</span>
      <span><b style="font-size:13.5px;color:${D.ink}">Bahnhof AB</b><br/><span style="font-size:12px;color:${D.muted};line-height:1.5">Bevakas. Vi säger till i god tid — med draget redan förberett.</span></span></div>
  </div>

  <!-- Foten: återförsäkran, den tysta veckans löfte -->
  <div style="position:relative;padding:18px 30px 22px;border-top:1px solid ${D.hair};font-size:13px;line-height:1.6;color:${D.muted}">
    Den vecka något faktiskt händer hör ni av oss — med draget redan gjort. <b style="color:${D.ink}">Tills dess sköter vi det åt er.</b></div>
</div>
<div style="text-align:center;font-family:${MONO};font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:${D.faint};margin-top:18px;line-height:1.9;max-width:640px;margin-left:auto;margin-right:auto">
  Exempel — formen på rummet · i skarpt läge fylls det med ERA egna nyss-avslöjade fakta</div>`;

const html = `
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<body style="margin:0;background:${D.bg};font-family:Inter,system-ui,sans-serif;padding:44px 0 56px">
<div style="max-width:720px;margin:0 auto;padding:0 24px">
  <div style="display:flex;justify-content:space-between;font-family:${MONO};font-size:9.5px;letter-spacing:.28em;text-transform:uppercase;border-bottom:1px solid ${D.hair};padding-bottom:14px">
    <span style="color:${D.teal}">02 · Arvo-kontoret</span><span style="color:${D.faint}">Konfidentiellt · ett rum per kund</span></div>
  <h2 style="font-family:${SERIF};font-size:38px;font-weight:500;line-height:1.16;color:${D.ink};margin:42px 0 0">Det ni just läste finns redan.<br/><em style="font-style:italic;color:${D.tealB}">Och i natt var allt lugnt.</em></h2>
  ${card}
</div>
</body>`;

const OUT = '/tmp/sek02-v2';
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[430, 'mobil'], [820, 'desktop']]) {
  const p = await b.newPage({ viewport: { width: w, height: 1200 }, deviceScaleFactor: 2 });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/${tag}.png`, fullPage: true });
  console.log('✓', tag);
  await p.close();
}
await b.close();
