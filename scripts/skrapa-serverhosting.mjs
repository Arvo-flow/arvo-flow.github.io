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
// Det HÄMTAR TECKEN och lägger fram ett UNDERLAG. Det skriver ALDRIG till prisboken.
// «Verifierat» måste förtjänas (bibeln, 6 augusti) — en människa öppnar sidan, bekräftar att
// beloppet hör till produkten, och FÖRST då går talet in i `BRANCHINDEX` med källa och datum.
// Därefter, och inte förr, byggs en verifierare i `lib/verifiers/` som vaktar talet mot drift.
//
// VÄGRAR HELLRE ÄN GISSAR (SD-01..16), per grundarens krav: ändras DOM:en, är priset tvetydigt,
// saknas valutan eller står momsbasen inte skriven — då avslutar skriptet 1 med ett NAMNGIVET
// skäl. Aldrig en gissning, aldrig ett medelvärde, aldrig «det som ser rimligast ut».
//
// ⚠️ EXTRAKTIONEN BOR INTE HÄR, och det är hela läxan ur granskningen. Första versionen plockade
// planblock ur DOM:en i det här skriptet — okörbart av sviten — och fyra [KUND] gömde sig där.
// Både extraktion och dom ligger nu i `lib/skrapdom.js`; skriptet hämtar text och ingenting mer.
//
// ⚠️ SANDLÅDAN HAR INGEN NÄT-EGRESS — skriptet kan bara köras i GitHub Actions (Playwright +
// Chromium, precis som `scripts/price-monitor.mjs`). Jag har alltså inte sett sidan: första
// körningen ÄR rekognoseringen, och faller den säger felutskriften vad som behöver skärpas.

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

const provade = [];
let bast = null;

for (const url of KANDIDATER) {
  const r = await withPage(url, async (page, status) => {
    if (typeof status === 'number' && status !== 200) return { status, sidtext: '' };
    // Skriptet hämtar TECKEN. Extraktionen och domen bor i lib/skrapdom.js — den halva som kan
    // gissa måste vara prövbar av sviten, och det var precis det som saknades i första versionen.
    const sidtext = await page.evaluate(() => document.body?.innerText ?? '');
    return { status, sidtext };
  }, { timeoutMs: 40000, settleMs: 3500 }).catch((e) => ({ status: 'ERR ' + e.message.split('\n')[0], sidtext: '', fel: e.message.split('\n')[0] }));

  // ⚠️ ETT VERKTYGSFEL FÅR ALDRIG SE UT SOM «INGET PRIS». Granskaren mätte att `playwright`
  // saknades i beroendena: importen kastade, catchen svalde det till «sidan oläsbar», och
  // skriptet skrev ut «rätt utfall» — noll rekognosering, förklädd till en mätning. Ett fel i
  // HÄMTNINGEN namnges nu och avslutar direkt.
  if (r.fel) {
    console.error(`\n✗ SKRAPAN KOM ALDRIG FRAM: ${r.fel}`);
    console.error('  Det är ett fel i VERKTYGET, inte ett utfall om priset. Detta är INTE ett mätvärde.');
    process.exit(1);
  }

  provade.push(`${url} → status ${r.status}, ${r.sidtext.length}b`);
  const dom = skrapdom({ url, sidtext: r.sidtext });
  if (!dom.blockerar) { bast = { url, dom }; break; }
  provade.push(`    domen: [${dom.kod}] ${dom.skal}`);
}

console.log('\n═══ SKRAPA · serverhosting (publikt SEK-referenspris) ═══\n');
for (const rad of provade) console.log(`  ${rad}`);

if (!bast) {
  console.error('\n✗ INGEN ADRESS GAV ETT ENTYDIGT PRIS — och det är rätt utfall, inte ett fel att runda av.');
  console.error('  Hellre tystnad än ett gissat golv i prisboken — det är hela poängen med grinden.');
  console.error('  Skälen står ovan. Ändrad sida → skärp lib/skrapdom.js. Tvetydigt pris → läs sidan själv.');
  process.exit(1);
}

const f = bast.dom.underlag;
console.log(`\n✓ UNDERLAG (INTE ett golv, INTE ett verifierat listpris) — ${bast.dom.skal}\n`);
console.log(`  källa     ${f.url}`);
console.log(`  momsbas   ${f.momsbas}   (LÄST ur sidan, aldrig antagen)`);
console.log(`  priser    ${f.antalPriser} förekomster · ${f.lagsta}–${f.hogsta} kr/mån\n`);
for (const p of f.forekomster) console.log(`    ${String(p.kronor).padStart(6)} kr/mån   …${p.kontext}`);

console.log('\n  DET HÄR ÄR ETT UNDERLAG, INTE ETT GOLV. Modulen ser att tecknen är entydiga —');
console.log('  aldrig vilken PRODUKT ett pris hör till. En människa väljer referensprodukten,');
console.log('  och FÖRST därefter går talet in i prisboken med källa och datum. Sedan, och inte');
console.log('  förr, byggs en verifierare som vaktar det mot drift.\n');
