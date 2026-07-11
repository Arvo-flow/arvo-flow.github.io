// scripts/mock-landing-salj-v4.mjs — DESIGNMOCKUP v4: HELA landningssidan, komplett disposition (hero → dossier → så fungerar det → pris med korten → FAQ → sista ordet). Riktig copy överallt.. Lärdomar ur v1-kritiken:
// ETT föremål i taget · typografisk självsäkerhet (stor serif, få effekter) · materialkänsla
// (keylines, metallic-text à la Prospect, mono-detaljer, numrerade sektioner) · dörren som
// portal, inte formulär · luft som lyx.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const L = { bg:'#F1F6F3', ink:'#0E1A17', muted:'#5C6E68', brand:'#1B7A6E', hair:'#D9E4DF' };
const D = { bg:'#080F0D', card:'#0C1512', ink:'#EAF4F0', muted:'#9DB8AF', faint:'#5F7A71',
  teal:'#2BC4AC', tealB:'#5DE8D2', signal:'#E05A4E', hair:'rgba(157,184,175,.13)' };
const MONO = "'JetBrains Mono',monospace"; const SERIF = "'Playfair Display',Georgia,serif";
const METALLIC = `background:linear-gradient(115deg,#EAF4F0 20%,#5DE8D2 42%,#EAF4F0 58%,#9DB8AF 80%);-webkit-background-clip:text;background-clip:text;color:transparent`;

const html = `
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<body style="margin:0;background:${L.bg};font-family:Inter,system-ui,sans-serif">

<!-- ═══ HERO — luft som lyx, EN ljuspunkt ═══ -->
<div style="max-width:920px;margin:0 auto;padding:110px 26px 96px;text-align:center">
  <div style="font-family:${MONO};font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:${L.brand}">Arvo · finansiell intelligens för svenska bolag</div>
  <h1 style="font-family:${SERIF};font-size:76px;line-height:1.04;color:${L.ink};margin:34px 0 0;font-weight:500;letter-spacing:-.015em">
    Er finansdirektör.<br/><em style="font-weight:500;color:${L.brand}">Innan ni frågar.</em>
  </h1>
  <p style="font-size:16.5px;line-height:1.75;color:${L.muted};max-width:520px;margin:34px auto 0">
    Ni delar era fakturor och avtal. Vi väger varje pris mot verifierat marknadspris,
    läser varje bindningstid — och säger till i tid, med motdraget förberett.
  </p>
  <div style="margin-top:44px">
    <span style="display:inline-block;font-size:15px;font-weight:600;color:#fff;padding:17px 42px;border-radius:100px;background:linear-gradient(135deg,#5DD6CA,#1B6E66);box-shadow:0 16px 44px rgba(27,122,110,.30)">Testa med en faktura →</span>
  </div>
  <div style="font-family:${MONO};font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:${L.muted};margin-top:52px">
    Avtal som en jurist &nbsp;·&nbsp; Priser som en inköpschef &nbsp;·&nbsp; Vaken varje natt
  </div>
</div>

<!-- ═══ DOSSIERN — mörkret som ett föremål på skrivbordet ═══ -->
<div style="max-width:1120px;margin:0 auto;padding:0 22px"><div style="background:${D.bg};border-radius:30px;padding:0 34px;position:relative;overflow:hidden;box-shadow:0 60px 140px rgba(8,15,13,.38)">
  <div style="position:absolute;inset:0;background:radial-gradient(1100px 480px at 50% -8%, rgba(43,196,172,.11), transparent 65%)"></div>
  <div style="max-width:760px;margin:0 auto;position:relative;padding:76px 0 92px">

    <div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid ${D.hair};padding-bottom:16px">
      <span style="font-family:${MONO};font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:${D.teal}">01 · Arvo-kontoret</span>
      <span style="font-family:${MONO};font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:${D.faint}">Konfidentiellt · ett rum per kund</span>
    </div>

    <h2 style="font-family:${SERIF};font-size:46px;font-weight:500;margin:52px 0 0;line-height:1.15;${METALLIC}">
      Det ni just läste finns redan.<br/>Och det jobbar i natt.
    </h2>

    <!-- ETT föremål: kalendern, ensam, som ett smycke -->
    <div style="max-width:620px;margin:64px auto 0">
      <div style="border:1px solid rgba(43,196,172,.30);border-radius:18px;padding:28px 30px;background:radial-gradient(520px 240px at 12% -18%, rgba(43,196,172,.12), transparent 60%), ${D.card};box-shadow:0 40px 90px rgba(0,0,0,.55)">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:18px">
          <span style="font-family:${MONO};font-size:9.5px;letter-spacing:.24em;text-transform:uppercase;color:${D.teal}">Kontraktskalendern</span>
          <span style="font-family:${MONO};font-size:9.5px;color:${D.faint}">5 avtal lästa</span>
        </div>
        <div style="font-family:${SERIF};font-size:24px;color:${D.ink};font-weight:500;margin-bottom:20px">Två fönster stänger <em style="color:${D.signal};font-weight:500">samma vecka.</em></div>

        <div style="display:flex;gap:16px;align-items:baseline;padding:14px 0;border-top:1px solid ${D.hair}">
          <span style="font-family:${MONO};font-size:12px;width:84px;color:${D.signal};font-feature-settings:'tnum'">6 dagar</span>
          <div style="flex:1"><div style="font-size:14px;font-weight:600;color:${D.ink}">Bahnhof AB</div>
          <div style="font-size:12px;color:${D.muted};margin-top:2px">Sista uppsägningsdag 15 juli — annars bundna till 15 januari.</div></div>
        </div>
        <div style="display:flex;gap:16px;align-items:baseline;padding:14px 0;border-top:1px solid ${D.hair}">
          <span style="font-family:${MONO};font-size:12px;width:84px;color:${D.signal};font-feature-settings:'tnum'">7 dagar</span>
          <div style="flex:1"><div style="font-size:14px;font-weight:600;color:${D.ink}">Fortnox AB</div>
          <div style="font-size:12px;color:${D.muted};margin-top:2px">Trettio dagars varsel — räknat på dagen, aldrig avrundat.</div></div>
        </div>
        <div style="display:flex;gap:16px;align-items:baseline;padding:14px 0;border-top:1px solid ${D.hair}">
          <span style="font-family:${MONO};font-size:12px;width:84px;color:${D.tealB};font-feature-settings:'tnum'">266 dagar</span>
          <div style="flex:1"><div style="font-size:14px;font-weight:600;color:${D.ink}">Telia</div>
          <div style="font-size:12px;color:${D.muted};margin-top:2px">Ett redan missat fönster upptäckt — nästa bevakas: 1 april 2027.</div></div>
        </div>
      </div>
      <div style="text-align:center;font-family:${MONO};font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:${D.faint};margin-top:18px">
        Maskinellt kontrollerad · 5 av 5 · varje datum ur kundens eget avtal
      </div>
    </div>

    <!-- ═══ 02 · DÖRREN — portalen ═══ -->
    <div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid ${D.hair};padding-bottom:16px;margin-top:110px">
      <span style="font-family:${MONO};font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:${D.teal}">02 · Avslöjandet</span>
      <span style="font-family:${MONO};font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:${D.faint}">60 sekunder · öppna källor</span>
    </div>
    <div style="max-width:560px;margin:52px auto 0;text-align:center">
      <h3 style="font-family:${SERIF};font-size:38px;font-weight:500;color:${D.ink};margin:0;line-height:1.2">Se ert bolag<br/><em style="font-weight:500">som marknaden ser det.</em></h3>
      <p style="font-size:13.5px;line-height:1.75;color:${D.muted};margin:24px 0 40px">
        Era leverantörer har redan bildat sig en uppfattning om er — och prissätter efter den.
        Skriv in er företagsmejl, så visar vi på sekunder vad de ser.
      </p>
      <div style="display:flex;align-items:center;gap:0;border-bottom:1px solid rgba(157,184,175,.35);padding-bottom:12px;max-width:440px;margin:0 auto">
        <span style="flex:1;font-family:${MONO};font-size:14px;color:${D.faint};text-align:left">namn@ertbolag.se</span>
        <span style="font-size:13.5px;font-weight:600;color:${D.tealB};white-space:nowrap">Visa vad de ser →</span>
      </div>
      <div style="font-family:${MONO};font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:${D.faint};margin-top:20px">svaret stannar hos er</div>
    </div>
  </div>
</div></div>

<!-- ═══ 03 · SÅ FUNGERAR DET — tre steg i keyline-stil ═══ -->
<div style="max-width:820px;margin:0 auto;padding:88px 26px 0">
  <div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid ${L.hair};padding-bottom:16px">
    <span style="font-family:${MONO};font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:${L.brand}">03 · Så fungerar det</span>
    <span style="font-family:${MONO};font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:${L.muted}">två minuter att komma igång</span>
  </div>
  <div style="display:flex;gap:0;margin-top:44px;flex-wrap:wrap">
    ${[
      ['I', 'Dela', 'Vidarebefordra en faktura eller släpp ett avtal i rummet. Det är allt ni gör.'],
      ['II', 'Vakten läser', 'Varje pris vägs mot verifierat marknadspris. Varje bindningstid läses ord för ord, med citat som bevis.'],
      ['III', 'Ni får domen', 'Rätt pris? Vi säger det. Fel pris eller ett fönster som stänger? Ni får larmet i tid — med motdraget förberett.'],
    ].map(([n, t, d]) => `
      <div style="flex:1;min-width:200px;padding:0 26px 8px 0;border-left:1px solid ${L.hair};padding-left:22px">
        <div style="font-family:${SERIF};font-size:15px;color:${L.brand};font-style:italic">${n}</div>
        <div style="font-size:15px;font-weight:600;color:${L.ink};margin:8px 0 6px">${t}</div>
        <div style="font-size:12.5px;line-height:1.65;color:${L.muted}">${d}</div>
      </div>`).join('')}
  </div>
</div>

<!-- ═══ 04 · PRISET — serif-meningen sätter känslan, korten bär detaljerna ═══ -->
<div style="max-width:820px;margin:0 auto;padding:96px 26px 0">
  <div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid ${L.hair};padding-bottom:16px">
    <span style="font-family:${MONO};font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:${L.brand}">04 · Priset</span>
    <span style="font-family:${MONO};font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:${L.muted}">ingen bindningstid</span>
  </div>
  <div style="font-family:${SERIF};font-size:31px;font-weight:500;color:${L.ink};margin-top:48px;line-height:1.35;text-align:center">
    1 995 kr i månaden. Tjugo procent av besparingen —<br/><em style="color:${L.brand};font-weight:500">först när den syns i era böcker.</em>
  </div>
  <p style="font-size:13px;color:${L.muted};max-width:460px;margin:16px auto 0;line-height:1.7;text-align:center">
    Vi tar aldrig ersättning från någon leverantör. Vi sitter på er sida av bordet — det är hela affärsidén.
  </p>
  <div style="display:flex;gap:16px;margin-top:44px;flex-wrap:wrap">
    <div style="flex:1;min-width:280px;border-radius:20px;padding:26px;background:#0C1512;box-shadow:0 30px 70px rgba(8,15,13,.30)">
      <div style="font-family:${MONO};font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:${D.tealB}">Arvo Intelligence</div>
      <div style="font-family:${MONO};font-size:26px;color:${D.ink};margin:14px 0 4px">1 995 kr <span style="font-size:11px;color:${D.faint}">/ mån</span></div>
      <div style="font-size:12px;color:${D.muted};margin-bottom:16px">Er proaktiva finansdirektör — bevakningen som aldrig sover.</div>
      ${['Smyghöjningslarm — avvikelse fångas direkt', 'Avtalsklockan — sista uppsägningsdag bevakad', 'Priser vägda mot verifierat marknadspris', 'Månadsbrev med det som faktiskt hänt'].map((t) => `
        <div style="display:flex;gap:8px;font-size:12px;color:${D.muted};padding:4px 0"><span style="color:${D.teal}">✓</span> ${t}</div>`).join('')}
      <div style="margin-top:18px;text-align:center;font-size:13px;font-weight:600;color:#06231d;padding:13px;border-radius:100px;background:linear-gradient(135deg,${D.tealB},${D.teal})">Aktivera Arvo Intelligence →</div>
    </div>
    <div style="flex:1;min-width:280px;border:1px solid ${L.hair};border-radius:20px;padding:26px;background:#fff">
      <div style="font-family:${MONO};font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:${L.brand}">Arvo Switch</div>
      <div style="font-family:${MONO};font-size:26px;color:${L.ink};margin:14px 0 4px">20 % <span style="font-size:11px;color:${L.muted}">av realiserad besparing</span></div>
      <div style="font-size:12px;color:${L.muted};margin-bottom:16px">Genomfört leverantörsbyte — förberett, tajmat, signerat med BankID.</div>
      ${['Arvodet faktureras först när besparingen syns i era böcker', 'Ni godkänner varje byte med BankID', 'Från år två tillfaller hela besparingen er', 'Hittar vi inget — kostar det inget'].map((t) => `
        <div style="display:flex;gap:8px;font-size:12px;color:${L.muted};padding:4px 0"><span style="color:${L.brand}">✓</span> ${t}</div>`).join('')}
      <div style="margin-top:18px;text-align:center;font-size:13px;font-weight:600;color:${L.brand};padding:13px;border-radius:100px;border:1px solid ${L.hair}">Testa med en faktura →</div>
    </div>
  </div>
</div>

<!-- ═══ 05 · VANLIGA FRÅGOR — keyline-rader, riktiga frågorna ═══ -->
<div style="max-width:820px;margin:0 auto;padding:96px 26px 0">
  <div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid ${L.hair};padding-bottom:16px">
    <span style="font-family:${MONO};font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:${L.brand}">05 · Vanliga frågor</span>
  </div>
  ${['Hur kan ni vara säkra på att rekommendationerna är opartiska?',
     'Varför ska jag lita på era besparingskalkyler?',
     'Säger ni upp avtal autonomt utan mitt godkännande?',
     'Vad händer om den nya leverantören höjer priset efter bytet?',
     'Vad händer med min data?'].map((q) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 4px;border-bottom:1px solid ${L.hair}">
      <span style="font-size:14.5px;color:${L.ink};font-weight:500">${q}</span>
      <span style="font-family:${MONO};color:${L.muted};font-size:14px">+</span>
    </div>`).join('')}
</div>

<!-- ═══ SISTA ORDET ═══ -->
<div style="max-width:820px;margin:0 auto;padding:100px 26px 90px;text-align:center">
  <div style="font-family:${SERIF};font-size:30px;font-weight:500;color:${L.ink};line-height:1.3">
    Börja med en enda faktura.<br/><em style="color:${L.brand};font-weight:500">Resten sköter vakten.</em>
  </div>
  <div style="margin-top:32px">
    <span style="display:inline-block;font-size:15px;font-weight:600;color:#fff;padding:16px 40px;border-radius:100px;background:linear-gradient(135deg,#5DD6CA,#1B6E66);box-shadow:0 16px 44px rgba(27,122,110,.30)">Testa med en faktura →</span>
  </div>
  <div style="font-family:${SERIF};font-style:italic;font-size:13px;color:${L.muted};margin-top:64px">Finansiell intelligens som aldrig sover.</div>
</div>
</body>`;

mkdirSync('/tmp/landing-salj-v4', { recursive: true });
const b = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 } });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `/tmp/landing-salj-v4/${tag}.png`, fullPage: true });
  console.log('✓', tag);
}
await b.close();
