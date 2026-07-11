// scripts/mock-landing-salj.mjs — DESIGNMOCKUP (ej produktkod): landningssidan i SÄLJANDE
// läge. Tre grepp: (1) EN primär CTA i heron, (2) "Rummet på sidan" — dossier-mörk
// kontrastteater med rummets RIKTIGA element (kalendern/kvittot, fällornas verkliga data),
// (3) Dörren på Landing med dess redan beslutade text. Premiumkänsla framför allt.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const L = { bg:'#F1F6F3', ink:'#0E1A17', muted:'#5C6E68', brand:'#1B7A6E', hair:'#D5E2DC' };
const D = { bg:'#0A1210', card:'#0E1815', ink:'#EAF4F0', muted:'#9DB8AF', faint:'#5F7A71',
  teal:'#2BC4AC', tealB:'#5DE8D2', signal:'#E05A4E', hair:'rgba(157,184,175,.14)' };
const MONO = "'JetBrains Mono',monospace"; const SERIF = "'Playfair Display',Georgia,serif";

const html = `
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<body style="margin:0;background:${L.bg};font-family:Inter,system-ui,sans-serif">

<!-- ═══ 1 · HERO (ljus) — EN hjälte-CTA ═══ -->
<div style="max-width:1060px;margin:0 auto;padding:72px 22px 64px">
  <div style="display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:600;color:${L.brand};border:1px solid ${L.hair};border-radius:100px;padding:7px 14px;background:#fff">
    <span style="width:7px;height:7px;border-radius:50%;background:${L.brand}"></span> Arvo Intelligence · Proaktiv finansdirektör för svenska bolag
  </div>
  <h1 style="font-family:${SERIF};font-size:56px;line-height:1.08;color:${L.ink};margin:22px 0 0;font-weight:700;letter-spacing:-.01em">
    Er finansdirektör.<br/><em style="color:${L.brand}">Innan ni frågar.</em>
  </h1>
  <p style="font-size:17px;line-height:1.65;color:${L.muted};max-width:560px;margin:20px 0 0">
    Ni delar era fakturor och avtal. Arvo väger varje pris mot verifierat marknadspris,
    läser varje bindningstid och säger till i tid när något är fel — med motdraget förberett.
    När allt är rätt säger vi det också.
  </p>
  <div style="display:flex;align-items:center;gap:22px;margin-top:30px;flex-wrap:wrap">
    <span style="display:inline-block;font-size:15.5px;font-weight:700;color:#fff;padding:16px 34px;border-radius:100px;background:linear-gradient(135deg,#5DD6CA,#1B6E66);box-shadow:0 12px 32px rgba(27,122,110,.28)">Testa med en faktura →</span>
    <span style="font-size:13.5px;color:${L.muted};text-decoration:underline;text-underline-offset:3px">eller aktivera Arvo Intelligence</span>
  </div>
  <div style="display:flex;gap:34px;margin-top:36px;flex-wrap:wrap">
    <div style="max-width:160px"><div style="font-size:13px;font-weight:700;color:${L.ink}">Avtal som en jurist</div><div style="font-size:11.5px;color:${L.muted};margin-top:3px">varje datum citatbelagt ur ert eget avtal</div></div>
    <div style="max-width:160px"><div style="font-size:13px;font-weight:700;color:${L.ink}">Priser som en inköpschef</div><div style="font-size:11.5px;color:${L.muted};margin-top:3px">vägda mot verifierat marknadspris</div></div>
    <div style="max-width:160px"><div style="font-size:13px;font-weight:700;color:${L.ink}">Vaken varje natt</div><div style="font-size:11.5px;color:${L.muted};margin-top:3px">så att ni slipper — larm bara när det behövs</div></div>
  </div>
</div>

<!-- ═══ 2 · RUMMET PÅ SIDAN — kontrastteatern ═══ -->
<div style="background:${D.bg};border-radius:34px 34px 0 0;padding:70px 22px 76px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(900px 420px at 22% -10%, rgba(43,196,172,.13), transparent 62%),radial-gradient(700px 380px at 88% 8%, rgba(93,232,210,.06), transparent 60%)"></div>
  <div style="max-width:1060px;margin:0 auto;position:relative">
    <div style="font-family:${MONO};font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:${D.teal}">● Arvo-kontoret · Så ser det ut inifrån</div>
    <h2 style="font-family:${SERIF};font-size:38px;font-weight:600;color:${D.ink};margin:16px 0 10px;line-height:1.2">
      Det ni just läste <em style="color:${D.tealB}">finns redan — och jobbar.</em>
    </h2>
    <p style="font-size:14.5px;line-height:1.65;color:${D.muted};max-width:540px;margin:0 0 34px">
      Varje kund får ett eget rum: avtalen lästa ord för ord, klockorna räknade på dagen,
      varje kontroll kvitterad. Det här är inte en skiss — det är instrumentet.
    </p>

    <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:stretch">
      <!-- Kalender-fragmentet (fällornas riktiga data) -->
      <div style="flex:1.4;min-width:320px;border:1px solid ${D.teal}44;border-radius:16px;padding:20px;background:radial-gradient(480px 220px at 10% -20%, rgba(43,196,172,.10), transparent 60%), ${D.card}">
        <div style="font-family:${MONO};font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:${D.teal};margin-bottom:10px">Kontraktskalendern · avtalsbevakning</div>
        <div style="font-family:${SERIF};font-size:20px;color:${D.ink};margin-bottom:12px">Två fönster stänger <span style="color:${D.signal}">samma vecka.</span></div>
        <div style="display:flex;gap:12px;align-items:baseline;padding:10px 0;border-top:1px solid ${D.hair}">
          <span style="font-family:${MONO};font-size:11px;width:70px;color:${D.signal}">6 dagar</span>
          <div style="flex:1"><span style="font-size:13px;font-weight:600;color:${D.ink}">Bahnhof AB</span>
          <div style="font-size:11px;color:${D.muted}">Sista uppsägningsdag 15 juli — annars bundna till 15 jan.</div></div>
          <span style="font-family:${MONO};font-size:8px;letter-spacing:.14em;color:${D.signal};border:1px solid ${D.signal}55;border-radius:100px;padding:3px 8px">FÖNSTER ÖPPET</span>
        </div>
        <div style="display:flex;gap:12px;align-items:baseline;padding:10px 0;border-top:1px solid ${D.hair}">
          <span style="font-family:${MONO};font-size:11px;width:70px;color:${D.signal}">7 dagar</span>
          <div style="flex:1"><span style="font-size:13px;font-weight:600;color:${D.ink}">Fortnox AB</span>
          <div style="font-size:11px;color:${D.muted}">30 dagars varsel — exakt på dagen, aldrig avrundat.</div></div>
        </div>
        <div style="display:flex;gap:12px;align-items:baseline;padding:10px 0;border-top:1px solid ${D.hair}">
          <span style="font-family:${MONO};font-size:11px;width:70px;color:${D.tealB}">266 dagar</span>
          <div style="flex:1"><span style="font-size:13px;font-weight:600;color:${D.ink}">Telia</span>
          <div style="font-size:11px;color:${D.muted}">Missat fönster upptäckt — nästa bevakas till 1 april 2027.</div></div>
        </div>
        <div style="margin-top:10px;padding-top:10px;border-top:1px solid ${D.hair};font-size:10px;color:${D.faint}">Varje datum ur kundens eget avtal · citat på varje rad</div>
      </div>

      <!-- Kvittot + vakten -->
      <div style="flex:1;min-width:280px;display:flex;flex-direction:column;gap:16px">
        <div style="border:1px solid ${D.hair};border-radius:16px;padding:18px;background:${D.card}">
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">
            <span style="font-family:${MONO};font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:${D.teal}">Maskinellt kontrollerad</span>
            <span style="font-family:${MONO};font-size:10px;color:${D.faint}">5 av 5 gröna</span>
          </div>
          ${['Strukturkontroll','Radsumma mot fakturatotal','Antal × à-pris per rad','Nästa periods belopp','Jämförelsepris — verifierat listpris'].map((t) => `
            <div style="display:flex;gap:9px;align-items:baseline;padding:5px 0;font-size:11.5px;color:${D.muted}">
              <span style="color:${D.teal};font-weight:700">✓</span> ${t}
            </div>`).join('')}
          <div style="font-size:9.5px;color:${D.faint};margin-top:8px;border-top:1px dashed ${D.hair};padding-top:8px">En kontroll som inte kunde prövas markeras — aldrig bockas.</div>
        </div>
        <div style="border:1px solid ${D.hair};border-radius:16px;padding:16px 18px;background:${D.card}">
          <div style="font-family:${MONO};font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:${D.teal};margin-bottom:8px">Vaktens kvitton</div>
          <div style="font-size:11.5px;color:${D.muted};line-height:1.7">
            <b style="color:${D.ink}">BEVAKAR</b> 36 marknadskällor svepta i natt 22:06<br/>
            <b style="color:${D.ink}">KLOCKA</b> 5 avtalsklockor — närmast om <b style="color:${D.signal}">6 dagar</b>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ 3 · DÖRREN — mötesögonblicket ═══ -->
    <div style="margin-top:52px;padding-top:44px;border-top:1px solid ${D.hair};max-width:600px">
      <div style="font-family:${MONO};font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:${D.teal}">Avslöjandet · 60 sekunder</div>
      <h3 style="font-family:${SERIF};font-size:30px;font-weight:600;color:${D.ink};margin:14px 0 10px">Se ert bolag som marknaden ser det.</h3>
      <p style="font-size:13.5px;line-height:1.65;color:${D.muted};margin:0 0 20px">
        Era leverantörer har redan bildat sig en uppfattning om er — och prissätter efter den.
        Skriv in er företagsmejl, så visar vi på sekunder vad de ser, ur öppna källor.
      </p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <span style="flex:1;min-width:220px;font-family:${MONO};font-size:13px;color:${D.faint};border:1px solid ${D.hair};border-radius:100px;padding:15px 20px;background:rgba(255,255,255,.02)">namn@ertbolag.se</span>
        <span style="font-size:14px;font-weight:700;color:#06231d;padding:15px 28px;border-radius:100px;background:linear-gradient(135deg,${D.tealB},${D.teal})">Visa vad de ser →</span>
      </div>
      <div style="font-family:${MONO};font-size:9.5px;letter-spacing:.06em;color:${D.faint};margin-top:12px">Öppna källor · inga förpliktelser · svaret stannar hos er</div>
    </div>
  </div>
</div>

<!-- ═══ Tillbaka i ljuset — prissektionen tar vid ═══ -->
<div style="max-width:1060px;margin:0 auto;padding:56px 22px 70px;text-align:center">
  <div style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${L.brand}">Pris</div>
  <div style="font-family:${SERIF};font-size:30px;font-weight:700;color:${L.ink};margin-top:10px">Bevakning på prenumeration. Genomfört byte vid behov.</div>
  <p style="font-size:14px;color:${L.muted};max-width:560px;margin:12px auto 0;line-height:1.6">
    Genomför vi ett byte tar vi 20 % av första årets besparing — fakturerat först när den syns i era
    egna böcker. Vi tar aldrig ersättning från någon leverantör, så vi sitter alltid på er sida av bordet.
  </p>
</div>
</body>`;

mkdirSync('/tmp/landing-salj-mock', { recursive: true });
const b = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 } });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.waitForTimeout(700);
  await p.screenshot({ path: `/tmp/landing-salj-mock/${tag}.png`, fullPage: true });
  console.log('✓', tag);
}
await b.close();
