// scripts/mock-hero-stram.mjs — DESIGNMOCKUP: FlowLift-lärdomen är STRYK, inte lägg till.
// Tre hero-varianter i ett ark: A nuvarande · B stram (en menings-ingress, proof struken)
// · C avskalad (bara rubrik + CTA). Samma dossier-tokens, noll ny estetik — bara färre ord.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const L = { bg:'#F1F6F3', ink:'#0E1A17', muted:'#5C6E68', brand:'#1B7A6E', hair:'#D9E4DF' };
const MONO = "'JetBrains Mono',monospace"; const SERIF = "'Playfair Display',Georgia,serif";

const label = (t) => `<div style="font-family:${MONO};font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#B4483E;padding:26px 26px 0;border-top:3px solid #B4483E;max-width:920px;margin:0 auto">${t}</div>`;

const hero = ({ lede, sub, proof }) => `
<div style="max-width:920px;margin:0 auto;padding:78px 26px 88px;text-align:center">
  <div style="font-family:${MONO};font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:${L.brand}">Arvo · finansiell intelligens för svenska bolag</div>
  <h1 style="font-family:${SERIF};font-size:clamp(42px,7.2vw,76px);line-height:1.05;color:${L.ink};margin:30px 0 0;font-weight:500;letter-spacing:-.015em">
    Er finansdirektör.<br/><em style="font-weight:500;color:${L.brand}">Innan ni frågar.</em>
  </h1>
  ${lede ? `<p style="font-size:16.5px;line-height:1.75;color:${L.muted};max-width:540px;margin:30px auto 0">${lede}</p>` : ''}
  <div style="margin-top:${lede ? 40 : 48}px">
    <span style="display:inline-block;font-size:15px;font-weight:600;color:#fff;padding:17px 42px;border-radius:100px;background:linear-gradient(135deg,#5DD6CA,#1B6E66);box-shadow:0 16px 44px rgba(27,122,110,.30)">Se ert bolag som marknaden ser det →</span>
    ${sub ? `<div style="font-size:12.5px;color:${L.muted};margin-top:15px">${sub}</div>` : ''}
  </div>
  ${proof ? `<div style="font-family:${MONO};font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:${L.muted};margin-top:50px;line-height:2.1">${proof}</div>` : ''}
</div>
<div style="max-width:1120px;margin:0 auto;padding:0 20px 60px">
  <div style="background:#080F0D;border-radius:30px;height:120px;box-shadow:0 60px 140px rgba(8,15,13,.38);display:flex;align-items:center;justify-content:center">
    <span style="font-family:${MONO};font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#5F7A71">— dossiern börjar här —</span>
  </div>
</div>`;

const linkish = `<span style="text-decoration:underline;text-underline-offset:3px">eller testa med en faktura</span>`;

const html = `
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<body style="margin:0;background:${L.bg};font-family:Inter,system-ui,sans-serif">

${label('A · Nuvarande — sex lager, tre meningar i ingressen')}
${hero({
  lede: 'Ni delar era fakturor och avtal. Vi väger varje pris mot verifierat marknadspris, läser varje bindningstid — och säger till i tid, med motdraget förberett. När allt är rätt säger vi det också.',
  sub: `två sekunder · öppna källor &nbsp;·&nbsp; ${linkish}`,
  proof: 'Avtal som en jurist &nbsp;·&nbsp; Priser som en inköpschef &nbsp;·&nbsp; Vaken varje natt',
})}

${label('B · Stram — EN mening, proof-raden struken (rekommenderad)')}
${hero({
  lede: 'Vi väger varje pris ni betalar mot verifierat marknadspris — och säger till i tid, med motdraget förberett.',
  sub: `två sekunder · öppna källor &nbsp;·&nbsp; ${linkish}`,
  proof: null,
})}

${label('C · Avskalad — bara rubriken och dörren (FlowLift-graden av luft)')}
${hero({
  lede: null,
  sub: 'två sekunder · öppna källor',
  proof: null,
})}

</body>`;

const OUT = '/tmp/hero-stram';
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[1600, 'desktop'], [390, 'mobil']]) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 }, deviceScaleFactor: w === 390 ? 2 : 1 });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/${tag}.png`, fullPage: true });
  console.log('✓', tag);
  await p.close();
}
await b.close();
