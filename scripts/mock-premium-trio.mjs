// scripts/mock-premium-trio.mjs — DESIGNMOCKUP ×3 (ribban rejält höjd):
//   1 · RUMMET i full dossier — instrument, inte dashboard (radar · veckodom · kalender ·
//       kollektiv sanning · likräkning · kvitton)
//   2 · DÖRRENS TIO SEKUNDER — triptyk: maskinen arbetar synligt → raderna materialiseras →
//       kvittot ("sammanställt på 9,4 s ur 5 öppna källor")
//   3 · DOSSIERNS MATERIAL — platt yta vs korn + kantljus + dubbel keyline
// EXEMPELDATA genomgående — märkt i varje ark. Ingen ny palett: theme.dossier-tokens.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const D = { bg:'#080F0D', card:'#0C1512', card2:'#0A1310', ink:'#EAF4F0', muted:'#9DB8AF',
  faint:'#5F7A71', teal:'#2BC4AC', tealB:'#5DE8D2', signal:'#E05A4E', hair:'rgba(157,184,175,.13)' };
const MONO = "'JetBrains Mono',monospace"; const SERIF = "'Playfair Display',Georgia,serif";
const METALLIC = `background:linear-gradient(115deg,#EAF4F0 20%,#5DE8D2 42%,#EAF4F0 58%,#9DB8AF 80%);-webkit-background-clip:text;background-clip:text;color:transparent`;
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">`;
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")`;

const eyebrow = (t, right = '') => `<div style="display:flex;justify-content:space-between;align-items:baseline;font-family:${MONO};font-size:9.5px;letter-spacing:.28em;text-transform:uppercase"><span style="color:${D.teal}">${t}</span><span style="color:${D.faint}">${right}</span></div>`;
const hr = `<div style="height:1px;background:${D.hair};margin:22px 0"></div>`;
const stamp = `<div style="font-family:${MONO};font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:${D.faint};text-align:center;padding:26px 0 8px">designmockup · exempeldata · inga verkliga kunduppgifter</div>`;

/* ═══════════════ 1 · RUMMET ═══════════════ */
const kvitto = (t, txt, tone = D.muted) => `<div style="display:flex;gap:14px;padding:10px 0;border-bottom:1px solid ${D.hair}"><span style="font-family:${MONO};font-size:10px;color:${D.faint};white-space:nowrap;padding-top:2px">${t}</span><span style="font-size:12.5px;line-height:1.55;color:${tone}">${txt}</span></div>`;
const kal = (d, name, txt, hot = false) => `
<div style="display:flex;gap:18px;align-items:baseline;padding:15px 18px;border:1px solid ${hot ? 'rgba(43,196,172,.35)' : D.hair};border-radius:12px;margin-top:10px;background:${hot ? 'rgba(43,196,172,.05)' : 'transparent'};${hot ? 'box-shadow:0 0 34px rgba(43,196,172,.10) inset' : ''}">
  <span style="font-family:${MONO};font-size:19px;color:${hot ? D.tealB : D.ink};min-width:86px">${d}<span style="font-size:10px;color:${D.faint}"> dagar</span></span>
  <span><b style="font-size:13.5px;color:${D.ink};font-weight:600">${name}</b><br/><span style="font-size:12px;color:${D.muted};line-height:1.5">${txt}</span></span>
</div>`;

const rummet = `${FONTS}<body style="margin:0;background:${D.bg};font-family:Inter,system-ui,sans-serif;position:relative">
<div style="position:fixed;inset:0;background-image:${GRAIN};opacity:.05;pointer-events:none"></div>
<div style="position:fixed;top:-340px;left:50%;transform:translateX(-50%);width:1100px;height:520px;background:radial-gradient(ellipse at center,rgba(43,196,172,.13),transparent 65%);pointer-events:none"></div>

<div style="max-width:1180px;margin:0 auto;padding:34px 36px 60px;position:relative">
  <!-- topplinje -->
  <div style="display:flex;justify-content:space-between;align-items:baseline;padding-bottom:22px;border-bottom:1px solid ${D.hair}">
    <span style="font-family:${SERIF};font-size:21px;color:${D.ink}">Arvo <em style="color:${D.teal}">Flow</em> <span style="font-family:${MONO};font-size:9px;letter-spacing:.34em;color:${D.faint};margin-left:14px">KONTORET</span></span>
    <span style="font-family:${MONO};font-size:9px;letter-spacing:.22em;color:${D.faint}">KONFIDENTIELLT · KRISTIANSTADS MÅLERI AKTIEBOLAG · SÖN 13 JULI</span>
  </div>

  <!-- VECKODOMEN -->
  <div style="max-width:820px;margin:52px auto 0;text-align:center">
    ${eyebrow('Veckodomen', '')}
    <h1 style="font-family:${SERIF};font-weight:500;font-size:44px;line-height:1.22;margin:22px 0 0;${METALLIC}">
      Gör inget denna vecka.<br/><em>Lugnet är kontrollerat, inte antaget.</em>
    </h1>
    <p style="font-size:14.5px;line-height:1.8;color:${D.muted};max-width:620px;margin:22px auto 0">
      Vi vägde era åtta leverantörer mot 47 marknadsprispunkter i natt — allt håller.
      Telia-fönstret öppnar om <b style="color:${D.ink}">41 dagar</b>; motdraget ligger färdigt och väntar på klockan.
    </p>
    <div style="font-family:${MONO};font-size:9.5px;letter-spacing:.24em;text-transform:uppercase;color:${D.faint};margin-top:20px">— vakten · i natt 03:14 · konfidens hög · grundat på verifierade listpriser + era fakturor</div>
  </div>

  <div style="display:grid;grid-template-columns:340px 1fr;gap:26px;margin-top:58px">
    <!-- VÄNSTER: RADARN -->
    <div style="background:${D.card};border:1px solid ${D.hair};border-radius:18px;padding:26px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background-image:${GRAIN};opacity:.05"></div>
      ${eyebrow('Vakten', 'aldrig av')}
      <div style="width:190px;height:190px;margin:26px auto 6px;border-radius:50%;position:relative;border:1px solid ${D.hair}">
        <div style="position:absolute;inset:26px;border-radius:50%;border:1px solid ${D.hair}"></div>
        <div style="position:absolute;inset:56px;border-radius:50%;border:1px solid ${D.hair}"></div>
        <div style="position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 40deg,transparent 0deg,rgba(93,232,210,.22) 46deg,transparent 60deg)"></div>
        <div style="position:absolute;top:34px;right:52px;width:4px;height:4px;border-radius:50%;background:${D.tealB};box-shadow:0 0 10px ${D.tealB}"></div>
        <div style="position:absolute;bottom:48px;left:44px;width:3px;height:3px;border-radius:50%;background:${D.faint}"></div>
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column">
          <span style="font-family:${MONO};font-size:22px;color:${D.ink}">03:14</span>
          <span style="font-family:${MONO};font-size:8.5px;letter-spacing:.26em;color:${D.faint};margin-top:2px">SENASTE SVEP</span>
        </div>
      </div>
      ${hr}
      <div style="font-family:${MONO};font-size:11px;line-height:2.15;color:${D.muted}">
        <div style="display:flex;justify-content:space-between"><span>Källor svepta i natt</span><b style="color:${D.ink}">41</b></div>
        <div style="display:flex;justify-content:space-between"><span>Prispunkter vägda</span><b style="color:${D.ink}">47</b></div>
        <div style="display:flex;justify-content:space-between"><span>Era leverantörer under bevakning</span><b style="color:${D.ink}">8</b></div>
        <div style="display:flex;justify-content:space-between"><span>Avvikelser</span><b style="color:${D.tealB}">0 · allt lugnt</b></div>
      </div>
      ${hr}
      ${eyebrow('Arbetets kvitton', 'verkliga tidsstämplar')}
      <div style="margin-top:8px">
        ${kvitto('03:14', 'Svepte 41 marknadskällor — <b style="color:'+D.ink+'">inga avvikelser</b>. Ni kunde sova.')}
        ${kvitto('02:51', 'Vägde Bahnhof-fakturan mot verifierat listpris: 0 kr över marknad.')}
        ${kvitto('LÖR 14:02', 'Telia-motdraget uppdaterat mot nya listprislistan — köat till fönstret.')}
        ${kvitto('LÖR 09:30', 'DMARC-luckan på er domän: åtgärdsförslaget skickat till er IT-kontakt.')}
      </div>
    </div>

    <!-- HÖGER: KALENDER + SANNING + LIKRÄKNING -->
    <div style="display:flex;flex-direction:column;gap:26px">
      <div style="background:${D.card};border:1px solid ${D.hair};border-radius:18px;padding:26px;position:relative;overflow:hidden">
        <div style="position:absolute;inset:0;background-image:${GRAIN};opacity:.05"></div>
        ${eyebrow('Maktkalendern', 'motdraget köat')}
        ${kal('6', 'Fortnox AB', 'Tredje dagen i varning — räknar på lagen, siarna avrundat. Kvittera <b style="color:'+D.tealB+'">uppsagd</b> eller <b style="color:'+D.tealB+'">stannar</b> så tystnar klockan.', true)}
        ${kal('41', 'Telia Företag', 'Uppsägningsfönstret öppnar 22 augusti. Motbudet ligger färdigt: 4 abonnemang, −312 kr/mån mot ert nuvarande, verifierat listpris.')}
        ${kal('204', 'if Försäkring', 'Förnyas i februari. Vi väger premien mot marknadsläget i januari — beväpnar er före mötet.')}
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:26px">
        <div style="background:${D.card};border:1px solid ${D.hair};border-radius:18px;padding:26px;position:relative;overflow:hidden">
          <div style="position:absolute;inset:0;background-image:${GRAIN};opacity:.05"></div>
          ${eyebrow('Den kollektiva sanningen', '')}
          <p style="font-size:13px;line-height:1.7;color:${D.muted};margin:16px 0 0">Måleribolag i er storlek listar mobilt från <b style="font-family:${MONO};color:${D.ink}">239 kr/mån</b> per abonnemang — verifierat publikt listpris. Er senaste faktura: <b style="font-family:${MONO};color:${D.tealB}">247 kr/mån</b>.</p>
          <div style="margin-top:18px;height:5px;border-radius:3px;background:linear-gradient(90deg,rgba(43,196,172,.5),rgba(157,184,175,.14));position:relative"><div style="position:absolute;left:18%;top:-3.5px;width:11px;height:11px;border-radius:50%;background:${D.tealB};box-shadow:0 0 12px rgba(93,232,210,.6)"></div></div>
          <div style="display:flex;justify-content:space-between;font-family:${MONO};font-size:9px;color:${D.faint};margin-top:8px"><span>239 · GOLV</span><span>NI · 247</span><span>349 · LISTTOPP</span></div>
        </div>
        <div style="background:${D.card};border:1px solid ${D.hair};border-radius:18px;padding:26px;position:relative;overflow:hidden">
          <div style="position:absolute;inset:0;background-image:${GRAIN};opacity:.05"></div>
          ${eyebrow('Likräkningen', 'sedan start')}
          <div style="font-family:${MONO};font-size:38px;margin-top:14px;${METALLIC}">214 380 kr</div>
          <div style="font-size:12.5px;color:${D.muted};margin-top:8px;line-height:1.6">realiserad besparing — verifierad i era egna böcker, aldrig "identifierad".</div>
          <div style="font-family:${MONO};font-size:10px;letter-spacing:.14em;color:${D.faint};margin-top:14px">+ 2 HÖJNINGAR AVVÄRJDA NI ALDRIG MÄRKTE</div>
        </div>
      </div>
    </div>
  </div>
  ${stamp}
</div></body>`;

/* ═══════════════ 2 · DÖRRENS TIO SEKUNDER ═══════════════ */
const skel = (w1, w2) => `<div style="padding:14px 0;border-bottom:1px solid ${D.hair}"><div style="height:11px;width:${w1};border-radius:4px;background:linear-gradient(90deg,rgba(157,184,175,.14),rgba(157,184,175,.05))"></div><div style="height:8px;width:${w2};border-radius:4px;background:rgba(157,184,175,.07);margin-top:9px"></div></div>`;
const findRow = (title, body, src) => `<div style="padding:15px 0;border-bottom:1px solid ${D.hair}"><div style="font-family:${SERIF};font-size:16.5px;color:${D.ink}">${title}</div><div style="font-size:12px;line-height:1.6;color:${D.muted};margin-top:5px">${body}</div><div style="font-family:${MONO};font-size:9.5px;color:${D.faint};margin-top:7px"><b style="color:${D.teal}">KÄLLA:</b> ${src}</div></div>`;
const phone = (label, inner) => `
<div style="width:390px;flex:none">
  <div style="font-family:${MONO};font-size:9.5px;letter-spacing:.3em;text-transform:uppercase;color:${D.signal};margin-bottom:14px">${label}</div>
  <div style="background:${D.card};border:1px solid rgba(43,196,172,.30);border-radius:20px;padding:24px;position:relative;overflow:hidden">
    <div style="position:absolute;inset:0;background-image:${GRAIN};opacity:.05"></div>
    ${eyebrow('Underlag · kristianstadsmaleri.se', '')}
    ${inner}
  </div>
</div>`;

const dorren = `${FONTS}<body style="margin:0;background:${D.bg};font-family:Inter,system-ui,sans-serif">
<div style="max-width:1340px;margin:0 auto;padding:44px 30px 30px">
  <div style="text-align:center;margin-bottom:38px">
    <div style="font-family:${MONO};font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:${D.teal}">Dörrens tio sekunder — maskinen arbetar synligt</div>
    <div style="font-family:${SERIF};font-size:30px;color:${D.ink};margin-top:12px">Väntetiden <em style="color:${D.tealB}">är</em> demonstrationen.</div>
  </div>
  <div style="display:flex;gap:36px;justify-content:center">

    ${phone('I · sekund 0–6 — vakten läser', `
      <div style="margin-top:18px;border:1px solid ${D.hair};border-radius:10px;padding:12px 14px;font-size:13px;color:${D.ink};background:${D.card2}">kontakt@kristianstadsmaleri.se</div>
      <div style="margin-top:12px;height:2px;border-radius:1px;background:linear-gradient(90deg,${D.tealB} 0%,${D.teal} 34%,rgba(157,184,175,.10) 34%)"></div>
      <div style="font-family:${MONO};font-size:10.5px;line-height:2.2;color:${D.muted};margin-top:14px">
        <div>läser öppna källor <span style="float:right;color:${D.tealB}">6,2 s</span></div>
        <div style="color:${D.tealB}">✓ e-postpostur &nbsp;·&nbsp; ✓ Bolagsverket</div>
        <div style="color:${D.faint}">… certifikatregistret &nbsp;·&nbsp; … domänregistret</div>
      </div>
      ${hr}
      ${skel('72%', '92%')}${skel('58%', '84%')}${skel('66%', '78%')}
    `)}

    ${phone('II · raderna materialiseras — en i taget', `
      <div style="margin-top:16px">
        ${findRow('Ert bokslut 2025: 14,0 mkr i omsättning, 14 anställda', 'Gäller Kristianstads Måleri Aktiebolag — offentliga uppgifter, inget ni behövt dela.', 'Bolagsverket · bokslutsår 2025')}
        ${findRow('Er omsättning föll 26 % senaste bokslutsåret', 'Från 18,9 till 14,0 mkr. När intäkterna viker väger varje kostnadskrona dubbelt.', 'Bolagsverket · 2024–2025')}
        ${skel('64%', '88%')}
        <div style="font-family:${MONO};font-size:10px;color:${D.faint};margin-top:12px">sammanställer <span style="float:right;color:${D.tealB}">8,9 s</span></div>
      </div>
    `)}

    ${phone('III · kvittot — bevis, inte påstående', `
      <div style="margin-top:16px">
        ${findRow('Ert bokslut 2025: 14,0 mkr i omsättning, 14 anställda', 'Gäller Kristianstads Måleri Aktiebolag — offentliga uppgifter.', 'Bolagsverket · bokslutsår 2025')}
        ${findRow('Er omsättning föll 26 % senaste bokslutsåret', 'Från 18,9 till 14,0 mkr — offentliga bokslutssiffror.', 'Bolagsverket · 2024–2025')}
        ${findRow('Mejl i ert namn kan förfalskas', 'Er domän saknar DMARC-skydd — luckan fakturabedragare använder. Kostnadsfri att stänga.', 'DMARC-uppslaget — publika e-postinställningar')}
        <div style="margin-top:16px;padding:12px 14px;border:1px solid rgba(43,196,172,.28);border-radius:10px;background:rgba(43,196,172,.05);font-family:${MONO};font-size:10px;letter-spacing:.1em;color:${D.muted}">
          SAMMANSTÄLLT PÅ <b style="color:${D.tealB}">9,4 S</b> · 5 ÖPPNA KÄLLOR · INNAN NI DELAT NÅGOT
        </div>
      </div>
    `)}
  </div>
  <div style="text-align:center;font-family:${MONO};font-size:9.5px;letter-spacing:.2em;color:${D.faint};margin-top:30px">INTEGRITETSLINJEN: STATUSRADEN NAMNGER BARA KÄLLOR MASKINEN FAKTISKT LÄSER · INGEN FEJKAD PROGRESS — BARA ÄKTA ARBETE, SYNLIGT</div>
  ${stamp}
</div></body>`;

/* ═══════════════ 3 · DOSSIERNS MATERIAL ═══════════════ */
const materialCard = (label, extra) => `
<div style="flex:1">
  <div style="font-family:${MONO};font-size:9.5px;letter-spacing:.3em;text-transform:uppercase;color:${D.signal};margin-bottom:14px">${label}</div>
  <div style="background:${D.bg};border-radius:26px;padding:52px 40px 58px;position:relative;overflow:hidden;${extra}">
    ${extra ? `<div style="position:absolute;inset:0;background-image:${GRAIN};opacity:.055;border-radius:26px"></div>
    <div style="position:absolute;top:-140px;left:50%;transform:translateX(-50%);width:560px;height:230px;background:radial-gradient(ellipse at center,rgba(43,196,172,.14),transparent 65%)"></div>
    <div style="position:absolute;inset:10px;border:1px solid rgba(157,184,175,.09);border-radius:18px;pointer-events:none"></div>` : ''}
    <div style="position:relative">
      ${eyebrow('01 · Avslöjandet', '10 sekunder · öppna källor')}
      <h2 style="font-family:${SERIF};font-weight:500;font-size:31px;line-height:1.25;margin:22px 0 0;${extra ? METALLIC : `color:${D.ink}`}">Se ert bolag <em>som marknaden ser det.</em></h2>
      <p style="font-size:13px;line-height:1.7;color:${D.muted};max-width:420px;margin:16px 0 0">Era leverantörer har redan bildat sig en uppfattning om er — och prissätter efter den.</p>
      <div style="margin-top:22px;display:inline-block;font-size:13.5px;font-weight:600;color:#06120F;padding:13px 30px;border-radius:100px;background:linear-gradient(135deg,${D.tealB},${D.teal});${extra ? 'box-shadow:0 14px 40px rgba(43,196,172,.25)' : ''}">Öppna underlaget →</div>
    </div>
  </div>
</div>`;

const material = `${FONTS}<body style="margin:0;background:#F1F6F3;font-family:Inter,system-ui,sans-serif">
<div style="max-width:1500px;margin:0 auto;padding:44px 30px">
  <div style="text-align:center;margin-bottom:36px">
    <div style="font-family:${MONO};font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#1B7A6E">Dossierns material — från mörk div till föremål</div>
  </div>
  <div style="display:flex;gap:40px">
    ${materialCard('A · Idag — platt yta', '')}
    ${materialCard('B · Material — korn · kantljus · dubbel keyline · metallic', `box-shadow:0 60px 140px rgba(8,15,13,.42), 0 2px 0 rgba(93,232,210,.10) inset;`)}
  </div>
  <div style="text-align:center;font-family:${MONO};font-size:9.5px;letter-spacing:.2em;color:#5C6E68;margin-top:32px">SKILLNADEN ÄR AVSIKTLIGT SUBTIL PÅ AVSTÅND — DEN SKA KÄNNAS, INTE SES · ${stamp.replace(/<[^>]+>/g, '')}</div>
</div></body>`;

/* ═══════════════ RENDER ═══════════════ */
const OUT = '/tmp/premium-trio';
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
const shots = [
  ['rummet-desktop', rummet, 1280, 1],
  ['rummet-mobil', rummet, 390, 2],
  ['dorren', dorren, 1400, 1],
  ['material', material, 1560, 1],
];
for (const [tag, html, w, dsf] of shots) {
  const p = await b.newPage({ viewport: { width: w, height: 1100 }, deviceScaleFactor: dsf });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/${tag}.png`, fullPage: true });
  console.log('✓', tag);
  await p.close();
}
await b.close();
