// scripts/mock-rummet-disposition.mjs — DESIGNMOCKUP (ej produktkod): HELA rummets
// disposition när fem avtal är lästa — så kalenderns plats i helheten kan bedömas.
// Datat är fällornas verkliga klockutfall + testytans rekvisita-belopp. Dossier-tokens.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const T = { bg:'#0A1210', card:'#0E1815', ink:'#EAF4F0', muted:'#9DB8AF', faint:'#5F7A71',
  teal:'#2BC4AC', tealB:'#5DE8D2', signal:'#E05A4E', hair:'rgba(157,184,175,.14)' };
const MONO = "'JetBrains Mono',monospace"; const SERIF = "'Playfair Display',Georgia,serif";

const eyebrow = (t) => `<div style="font-family:${MONO};font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:${T.teal};margin:34px 0 12px">${t}</div>`;
const card = (inner, glow = false) => `<div style="border:1px solid ${glow ? T.teal + '44' : T.hair};border-radius:14px;padding:18px;background:${glow ? `radial-gradient(560px 260px at 8% -22%, rgba(43,196,172,.10), transparent 60%), ${T.card}` : T.card}">${inner}</div>`;

const klockRad = (days, akut, sup, typ, detalj, chip) => `
  <div style="display:flex;align-items:baseline;gap:12px;padding:11px 0;border-top:1px solid ${T.hair}">
    <span style="font-family:${MONO};font-size:11.5px;width:78px;flex-shrink:0;color:${akut ? T.signal : T.tealB}">${days}</span>
    <div style="flex:1;min-width:0">
      <div style="font-size:13.5px;font-weight:600;color:${T.ink}">${sup} <span style="font-family:${MONO};font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:${T.faint};margin-left:5px">${typ}</span></div>
      <div style="font-size:11.5px;color:${T.muted};margin-top:2px">${detalj}</div>
    </div>
    ${chip ? `<span style="font-family:${MONO};font-size:8.5px;letter-spacing:.14em;color:${T.signal};border:1px solid ${T.signal}55;border-radius:100px;padding:3px 8px;flex-shrink:0">FÖNSTER ÖPPET</span>` : ''}
  </div>`;

const innehavRad = (score, color, sup, cat, kr, chip) => `
  <div style="display:flex;align-items:center;gap:12px;padding:14px 0;border-top:1px solid ${T.hair}">
    <span style="font-family:${MONO};font-size:11px;color:${color};border:2px solid ${color}66;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${score}</span>
    <div style="flex:1"><div style="font-size:14px;font-weight:600;color:${T.ink}">${sup}</div>
    <div style="font-size:11px;color:${T.faint}">${cat} · 9 juli</div></div>
    <span style="font-family:${MONO};font-size:11.5px;color:${T.muted}">${kr}</span>
    <span style="font-family:${MONO};font-size:9px;letter-spacing:.1em;color:${T.muted};border:1px solid ${T.hair};border-radius:100px;padding:4px 9px">${chip}</span>
  </div>`;

const html = `
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<body style="margin:0;background:${T.bg};font-family:Inter,system-ui,sans-serif;padding:26px 18px 60px">
<div style="max-width:780px;margin:0 auto">

  <!-- 1 · HERO + VAKTEN -->
  <div style="font-family:${MONO};font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:${T.faint}">Konfidentiellt · ert konto · 9 juli 2026</div>
  <div style="display:flex;gap:20px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap">
    <h1 style="font-family:${SERIF};font-size:34px;font-weight:600;color:${T.ink};line-height:1.2;margin:10px 0 0;max-width:420px">God morgon.<br/><span style="color:${T.tealB}">Fem avtal under full bevakning.</span></h1>
    <div style="border:1px solid ${T.hair};border-radius:12px;padding:14px 16px;min-width:220px">
      <div style="font-family:${MONO};font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:${T.teal}">Vakten · bevakar era avtal</div>
      <div style="display:flex;justify-content:space-between;font-size:11.5px;color:${T.muted};margin-top:8px">Leverantörer <b style="color:${T.ink}">5</b></div>
      <div style="display:flex;justify-content:space-between;font-size:11.5px;color:${T.muted};margin-top:4px">Avtal lästa <b style="color:${T.ink}">5</b></div>
      <div style="font-size:10.5px;color:${T.faint};margin-top:8px">● Senaste svep i natt 22:06 · 36 källor</div>
    </div>
  </div>

  <!-- 2 · KONTRAKTSKALENDERN (Maktkalenderns plats, direkt under heron) -->
  ${eyebrow('● Kontraktskalendern · avtalsbevakning')}
  ${card(`
    <h2 style="font-family:${SERIF};font-size:22px;font-weight:600;color:${T.ink};margin:0 0 6px">Två fönster stänger <span style="color:${T.signal}">samma vecka.</span></h2>
    <p style="font-size:12.5px;line-height:1.55;color:${T.muted};margin:0 0 4px">Bahnhof och Fortnox går att lämna <b style="color:${T.ink}">fram till 15–16 juli</b> — sedan är ni bundna till januari respektive nästa sommar. Resten av året är lugnt.</p>
    <div style="font-family:${MONO};font-size:9.5px;color:${T.faint};margin-bottom:2px">varje datum ur ert eget avtal · citat på varje rad i innehavet</div>
    ${klockRad('6 dagar', true, 'Bahnhof AB', 'rullande 3+3', 'Sista uppsägningsdag <b style="color:' + T.ink + '">15 juli</b> — annars bundna till 15 jan 2027.', true)}
    ${klockRad('7 dagar', true, 'Fortnox AB', 'årsvis · 30 d varsel', 'Sista uppsägningsdag <b style="color:' + T.ink + '">16 juli</b> — annars fullt licensår till 15 aug 2027.', true)}
    ${klockRad('266 dagar', false, 'Telia', '24 mån → +12', 'Sista uppsägningsdag <b style="color:' + T.ink + '">1 april 2027</b> — annars bundna till 1 jul 2028.', false)}
    ${klockRad('419 dagar', false, 'Nordic Managed IT', '36 mån · rek. brev', 'Sista uppsägningsdag <b style="color:' + T.ink + '">1 sep 2027</b> — annars +24 mån till 1 mar 2030.', false)}
    ${klockRad('löpande', false, 'GleSYS AB', 'tills vidare', 'Ute när som helst — 1 mån varsel · OBS indexklausul +4 %/år varje januari.', false)}
    <div style="margin-top:12px;padding-top:10px;border-top:1px solid ${T.hair};font-size:10.5px;color:${T.faint}">Vakten mejlar er 30 och 7 dagar före varje fönster · Årshjulet: <b style="color:${T.muted}">2 fönster i juli · 1 i april 2027 · 1 i september 2027 · 1 löpande</b></div>
  `, true)}

  <!-- 3 · ARVO BEDÖMER -->
  ${eyebrow('Arvo bedömer')}
  <h2 style="font-family:${SERIF};font-size:26px;font-weight:600;color:${T.ink};margin:0 0 8px;line-height:1.3">Håll kursen på priserna — <span style="color:${T.tealB}">agera på klockan.</span></h2>
  <p style="font-size:13px;line-height:1.6;color:${T.muted};max-width:560px;margin:0 0 10px">Era fem leverantörer ligger i nivå med verifierat marknadspris — inget byte motiverat i dag. Veckans verkliga drag är <b style="color:${T.ink}">tidsfönstren</b>: två avtal går att lämna fram till 15–16 juli.</p>
  <span style="font-family:${MONO};font-size:9.5px;letter-spacing:.08em;color:${T.teal};border:1px solid ${T.teal}44;border-radius:100px;padding:5px 12px">Verifierat · 5 leverantörer · publika listpriser</span>

  <!-- 4 · SCORE + BEVAKNING -->
  <div style="display:flex;gap:14px;margin-top:22px;flex-wrap:wrap">
    <div style="flex:1;min-width:250px">${card(`
      <div style="font-family:${MONO};font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:${T.teal}">Arvo score</div>
      <div style="font-family:${MONO};font-size:38px;color:${T.tealB};margin:6px 0 2px">75<span style="font-size:15px;color:${T.faint}">/100</span></div>
      <div style="font-size:11px;color:${T.muted}">Era priser i nivå med eller bättre än verifierat listpris.</div>`)}</div>
    <div style="flex:1;min-width:250px">${card(`
      <div style="font-family:${MONO};font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:${T.teal}">Avtal under bevakning</div>
      <div style="font-family:${SERIF};font-size:30px;color:${T.ink};margin:6px 0 2px">5 <span style="font-size:13px;color:${T.faint}">avtal · alla lästa</span></div>
      <div style="font-size:11px;color:${T.muted}"><b style="color:${T.signal}">2 fönster öppna nu</b> · nästa därefter i april 2027.</div>`, true)}</div>
  </div>

  <!-- 5 · VAKTENS KVITTON -->
  ${eyebrow('Vaktens kvitton — medan ni drev bolaget')}
  ${card(`
    <div style="display:grid;grid-template-columns:84px 1fr;gap:9px 14px;font-size:12px;color:${T.muted}">
      <span style="font-family:${MONO};font-size:9.5px;letter-spacing:.14em;color:${T.teal}">BEVAKAR</span><span>Svepte <b style="color:${T.ink}">36 marknadskällor</b> i natt 22:06 — 22 prisavvikelser fångade.</span>
      <span style="font-family:${MONO};font-size:9.5px;letter-spacing:.14em;color:${T.teal}">ANALYS</span><span>Vägde <b style="color:${T.ink}">5 fakturor</b> mot verifierat marknadspris · senast 9 juli.</span>
      <span style="font-family:${MONO};font-size:9.5px;letter-spacing:.14em;color:${T.teal}">KLOCKA</span><span>Bevakar <b style="color:${T.ink}">5 avtalsklockor</b> — närmast Bahnhof om <b style="color:${T.signal}">6 dagar</b>, agerar i fönstret.</span>
      <span style="font-family:${MONO};font-size:9.5px;letter-spacing:.14em;color:${T.teal}">AVTAL</span><span>Läste <b style="color:${T.ink}">5 avtal</b> — varje datum citatbelagt mot ert eget dokument.</span>
    </div>`)}

  <!-- 6 · INNEHAVET -->
  ${eyebrow('Innehavet · 5 analyserade leverantörer')}
  ${innehavRad(75,T.tealB,'Bahnhof AB','Företagsbredband','58 800 kr/år','FÖNSTER 15 JULI')}
  <div style="border:1px solid ${T.teal}33;border-radius:12px;padding:14px 16px;margin:6px 0 6px 46px;background:${T.card}">
    <div style="font-family:${MONO};font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:${T.teal};display:flex;justify-content:space-between"><span>Avtalet · läst och bevakat</span><span style="color:${T.faint};text-transform:none;letter-spacing:.04em">läst 9 juli</span></div>
    <div style="font-size:11.5px;color:${T.muted};margin-top:8px">Bindning <b style="color:${T.ink}">3 mån</b> · Uppsägningstid <b style="color:${T.ink}">3 mån</b> · Förlängning <b style="color:${T.ink}">+3 mån i taget</b></div>
    <div style="border:1px solid ${T.signal}44;border-radius:8px;padding:9px 12px;margin-top:9px;font-size:12px;color:${T.muted}">Sista uppsägningsdag <span style="font-family:${MONO};color:${T.ink}">15 juli 2026</span> · <span style="font-family:${MONO};color:${T.signal}">6 dagar kvar</span></div>
    <div style="font-size:11.5px;color:${T.muted};margin-top:8px"><b style="color:${T.ink}">Fällan i ert avtal:</b> missas fönstret är ni bundna till 15 jan 2027. · <b style="color:${T.ink}">Motdraget:</b> vi mejlar er 30 och 7 dagar före.</div>
    <div style="font-family:${MONO};font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:${T.faint};margin-top:9px">▸ Ordagrant ur ert avtal</div>
  </div>
  ${innehavRad(75,T.tealB,'Fortnox AB','Affärssystem / Bokföring','21 600 kr/år','FÖNSTER 16 JULI')}
  ${innehavRad(75,T.tealB,'Telia','Företagsväxel (molnväxel)','114 000 kr/år','RÄTT PRISSATT')}
  ${innehavRad(75,T.tealB,'GleSYS AB','Serverhosting','46 800 kr/år','RÄTT PRISSATT')}
  ${innehavRad(75,T.tealB,'Nordic Managed IT Services AB','IT-drift & Support','180 000 kr/år','RÄTT PRISSATT')}

  <!-- 7 · DROPZONEN -->
  <div style="margin-top:22px;border:1px dashed ${T.teal}55;border-radius:14px;padding:16px;text-align:center">
    <div style="font-size:12.5px;font-weight:600;color:${T.teal}">⬆ Släpp fler avtal här — flera på en gång</div>
    <div style="font-size:11px;color:${T.faint};margin-top:4px">Vi läser varje avtal, lägger det på rätt leverantörs innehav och uppdaterar kalendern.</div>
  </div>

  <!-- 8 · FOTEN -->
  ${eyebrow('Arvo Intelligence')}
  <h2 style="font-family:${SERIF};font-size:22px;font-weight:600;color:${T.ink};margin:0 0 6px">Hela reskontran, <span style="color:${T.tealB}">bevakad dygnet runt.</span></h2>
  <p style="font-size:12.5px;color:${T.muted};max-width:520px;line-height:1.6;margin:0 0 12px">I dag vaktar Arvo de avtal ni delat. Intelligence vidgar vakten till resten av boken — och larmar er innan nästa höjning når er.</p>
  <span style="font-family:${MONO};font-size:13px;color:${T.ink}">1 995 kr <span style="font-size:10px;color:${T.faint}">/ mån · ingen bindningstid</span></span>
  <div style="margin-top:40px;text-align:center;font-family:${SERIF};font-style:italic;font-size:12px;color:${T.faint}">Finansiell intelligens som aldrig sover.</div>

</div></body>`;

mkdirSync('/tmp/disposition-mock', { recursive: true });
const b = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.waitForTimeout(700);
  await p.screenshot({ path: `/tmp/disposition-mock/${tag}.png`, fullPage: true });
  console.log('✓', tag);
}
await b.close();
