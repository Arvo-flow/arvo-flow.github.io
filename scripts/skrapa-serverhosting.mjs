#!/usr/bin/env node
// scripts/skrapa-serverhosting.mjs — hämta ett publikt SEK-referenspris för `serverhosting`.
//
// ══ VARFÖR DEN HÄR KATEGORIN, OCH VARFÖR DEN HÄR AKTÖREN ════════════════════════════════════
// Grundarordern: «fyll kategorierna i ordning efter kundbehov, börja med den tyngsta».
// Sonden `probe-kategorifrekvens.mjs` kördes mot produktionen 2026-09-15 och svarade att det
// INTE FINNS någon tyngsta: de tre översta tysta kategorierna ligger på TVÅ fakturor var
// (utrustningsleasing, serverhosting, transport-frakt), från 1–2 avsändare. Att rangordna på
// den skillnaden vore att läsa brus som ett beslutsunderlag — «ett radantal är ingen
// fördelning» (bibeln 10 september).
//
// Valet gjordes därför på doktrinens EGET kriterium: vilken av de tre har ett verifierbart
// publikt SEK-listpris?
//   · utrustningsleasing — nej. Offertbaserat, beror på objekt, löptid och kreditvärdighet.
//     Det är skrivarleasing-fällan ordagrant, gatad 14 juni av exakt det skälet.
//   · transport-frakt    — svagt. Listpris finns, men verklig kostnad styrs av volymavtal.
//   · serverhosting      — JA. Svenska aktörer publicerar kr/mån per plan, strukturerat.
// Och `serverhosting` är den enda av de tre där liggaren bär en verklig kundfaktura (GleSYS AB).
//
// ══ VAD SKRIPTET ÄR, OCH VAD DET INTE ÄR ════════════════════════════════════════════════════
// Det HÄMTAR tecken och lägger fram ett FÖRSLAG. Det skriver ALDRIG till prisboken.
// «Verifierat» måste förtjänas (bibeln, 6 augusti) — en människa öppnar sidan, bekräftar att
// beloppet hör till planen, och FÖRST då går talet in i `BRANCHINDEX` med källa och datum.
// Därefter, och inte förr, byggs en verifierare i `lib/verifiers/` som vaktar talet mot drift.
//
// VÄGRAR HELLRE ÄN GISSAR (SD-01..12), per grundarens krav: ändras DOM:en, är priset tvetydigt, saknas valutan eller
// står momsbasen inte skriven — då avslutar skriptet 1 med ett NAMNGIVET skäl. Aldrig en
// gissning, aldrig ett medelvärde, aldrig «det som ser rimligast ut». Domen bor i
// `lib/skrapdom.js` som en ren funktion, så sviten kan pröva den utan nät.
//
// ⚠️ SANDLÅDAN HAR INGEN NÄT-EGRESS — skriptet kan bara köras i GitHub Actions (Playwright +
// Chromium finns där, precis som för `scripts/price-monitor.mjs`). Det är också skälet till att
// selektorerna nedan är BREDA och domen är SMAL: jag har inte sett DOM:en, och att skriva snäva
// selektorer mot en sida man inte läst vore precis den gissning ordern förbjuder. Första
// körningen ÄR rekognoseringen — faller den, säger felutskriften vad som behöver skärpas.

import { withPage } from '../lib/verifiers/core.mjs';
import { skrapdom } from '../lib/skrapdom.js';

// Dominant svensk aktör i kategorin, och den som faktiskt står på en kundfaktura i vår liggare.
// Flera adresser prövas i tur och ordning — en sida som svarar men saknar planer får ALDRIG
// räknas som ett utfall (Fortnox-läxan 5 augusti: vakten larmade på en 404-sida i 76 dagar).
const KANDIDATER = [
  'https://glesys.se/tjanster/vps',
  'https://glesys.se/priser',
  'https://glesys.se/tjanster/server',
];

/**
 * Plocka planblock ur den renderade sidan.
 *
 * Deterministiskt och modellfritt: vi letar element som bär ett SEK-belopp följt av en
 * månadsmarkör, och tar blockets rubriktext som plannamn. ALLA belopp i blocket returneras —
 * aldrig ett förvalt. Att välja ett av två är just det domen finns för att vägra.
 */
async function lasPlaner(page) {
  return page.evaluate(() => {
    const MANAD = /(\d[\d\s .,]*)\s*(?:kr|sek)\s*(?:\/|per\s+)\s*(?:mån|månad|mon|m)\b/gi;
    const tal = (s) => {
      const rent = String(s).replace(/[\s ]/g, '').replace(/\.(?=\d{3}\b)/g, '').replace(',', '.');
      const n = Number(rent);
      return Number.isFinite(n) ? Math.round(n) : null;
    };
    const ut = [];
    // Kandidatblock: element som INTE har ett barn som också bär ett månadspris — alltså det
    // innersta block som omsluter priset. Så undviks att hela sidan räknas som "en plan".
    const alla = [...document.querySelectorAll('div,li,article,section,td')];
    for (const el of alla) {
      const txt = (el.innerText ?? '').replace(/\s+/g, ' ').trim();
      if (!txt || txt.length > 600) continue;
      MANAD.lastIndex = 0;
      const belopp = [...txt.matchAll(MANAD)].map((m) => tal(m[1])).filter((n) => n !== null);
      if (belopp.length === 0) continue;
      const harBarnMedPris = [...el.children].some((c) => {
        const t = (c.innerText ?? '');
        return /(?:kr|sek)\s*(?:\/|per\s+)\s*(?:mån|månad)/i.test(t);
      });
      if (harBarnMedPris) continue;
      const rubrik = (el.querySelector('h1,h2,h3,h4,h5,strong,b')?.innerText ?? '').replace(/\s+/g, ' ').trim();
      ut.push({ plan: rubrik || txt.slice(0, 60), belopp: [...new Set(belopp)] });
    }
    return ut;
  });
}

const provade = [];
let bast = null;

for (const url of KANDIDATER) {
  const r = await withPage(url, async (page, status) => {
    if (typeof status === 'number' && status !== 200) return { status, sidtext: '', planer: [] };
    const sidtext = (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' ');
    const planer = await lasPlaner(page);
    return { status, sidtext, planer };
  }, { timeoutMs: 40000, settleMs: 3500 }).catch((e) => ({ status: 'ERR ' + e.message.split('\n')[0], sidtext: '', planer: [] }));

  provade.push(`${url} → status ${r.status}, ${r.sidtext.length}b, ${r.planer.length} planblock`);
  const dom = skrapdom({ url, sidtext: r.sidtext, planer: r.planer });
  if (!dom.blockerar) { bast = { url, dom }; break; }
  provade.push(`    domen: [${dom.kod}] ${dom.skal}`);
}

console.log('\n═══ SKRAPA · serverhosting (publikt SEK-referenspris) ═══\n');
for (const rad of provade) console.log(`  ${rad}`);

if (!bast) {
  console.error('\n✗ INGEN ADRESS GAV ETT ENTYDIGT PRIS — och det är rätt utfall, inte ett fel att runda av.');
  console.error('  Hellre tystnad än ett gissat golv i prisboken — det är hela poängen med grinden.');
  console.error('  Skälen står ovan. Ändrad DOM → skärp `lasPlaner`. Tvetydigt pris → läs sidan själv.');
  process.exit(1);
}

const f = bast.dom.forslag;
console.log(`\n✓ FÖRSLAG (INTE ett verifierat listpris) — ${bast.dom.skal}\n`);
console.log(`  källa     ${f.url}`);
console.log(`  momsbas   ${f.momsbas}   (LÄST ur sidan, aldrig antagen)`);
if (f.valutaVarning) console.log(`  ⚠ ${f.valutaVarning}`);
console.log(`  planer    ${f.antalPlaner}`);
console.log(`  billigast ${f.billigaste.kronorPerManad} kr/mån · ${f.billigaste.plan}`);
console.log(`  dyrast    ${f.dyraste.kronorPerManad} kr/mån · ${f.dyraste.plan}\n`);
for (const p of f.alla) console.log(`    ${String(p.kronorPerManad).padStart(6)} kr/mån   ${p.plan}`);

console.log('\n  NÄSTA STEG, och det får ingen maskin göra: en människa öppnar sidan och bekräftar');
console.log('  att beloppet hör till planen. FÖRST därefter går talet in i prisboken med källa');
console.log('  och datum — och först då byggs en verifierare som vaktar det mot drift.\n');
