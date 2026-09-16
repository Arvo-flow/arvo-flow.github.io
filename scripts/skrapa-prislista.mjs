#!/usr/bin/env node
// scripts/skrapa-prislista.mjs — hämta ett publikt SEK-referenspris för EN tyst kategori.
//
// ══ RÄTTELSE: FÖRSTA VERSIONEN SIKTADE PÅ FEL KATEGORI OCH FEL AKTÖR ════════════════════════
// Skriptet hette `skrapa-serverhosting.mjs` och bar den här motiveringen, committad 15 sept:
//
//     «serverhosting — JA. Svenska aktörer publicerar kr/mån per plan, strukturerat.»
//
// Den meningen var SKRIVEN, aldrig KÖRD — bibelns bevisplikt bruten i den commit som citerade
// den. Beviset låg redan i repot, committat 3–4 september: `ops/prislistor/*.txt`, nio svenska
// leverantörer sonderade med `scripts/probe-prislista.mjs`. Mätvärdena säger raka motsatsen:
//
//   · glesys.se/vps          200, **0 par**, inget momsord.  Och `glesys.se/tjanster/vps`, som
//                            stod FÖRST i mitt kandidatfält, mättes **404** två veckor tidigare.
//   · oderland.se            40 par ur TABELL + «Priser exkl. moms» — men varje par är en
//                            DOMÄNREGISTRERING per år (.se 229 kr), inte en hostingplan/mån.
//   · one.com                4 par, alla «9 kr / 1:a året*» — kampanjpris på domän.
//   · binero · misshosting   **0 par** vardera.
//
// Alltså: **noll kr/mån-planpriser i hela serverhosting-flottan.** Jag valde den kategori där
// det maskinläsbara underlaget är sämst, och skrev att det var bäst.
//
// Och ett fjärde skäl stod i prisboken själv: `serverhosting` bär `requiresVolumeData: true`
// och har **ingen matris**. Kategorin är medvetet deklarerad som icke-benchmarkbar — «kostnaden
// beror på serverspecifikationer». Ett skrapat VPS-pris hade inte haft någonstans att ta vägen.
//
// ══ VART SIKTAR VI I STÄLLET, OCH VARFÖR ════════════════════════════════════════════════════
// Samma mätning pekar på `faktura-tjanst`. Där finns rena `plan → NNN kr/mån`-par:
//   · fortnox.se/produkt/prislista   **40 par** (Mini 209 · Liten 349 · Mellan 490 · Stor 710…)
//   · bokio.se/priser                **8 par**, med månad OCH år som bekräftar varandra
// Och prisbokens `faktura-tjanst` är `source: 'estimated'` med en not som citerar «Billogram
// Starter från 299 kr/mån (maj 2026)» — ett tal ur minnet, i en matris som redan når kund.
// Det svarar mot brofästet i grundarordern: ett estimat som kan bytas mot ett verifierat
// listpris.
//
// ══ VAD SKRIPTET ÄR, OCH VAD DET INTE ÄR ════════════════════════════════════════════════════
// Det HÄMTAR TECKEN och lägger fram ett UNDERLAG. Det skriver ALDRIG till prisboken.
// «Verifierat» måste förtjänas (bibeln, 6 augusti) — en människa öppnar sidan, bekräftar att
// beloppet hör till produkten, och FÖRST då går talet in i `BRANCHINDEX` med källa och datum.
// Därefter, och inte förr, byggs en verifierare i `lib/verifiers/` som vaktar talet mot drift.
//
// VÄGRAR HELLRE ÄN GISSAR (SD-01..19), per grundarens krav: ändras DOM:en, är priset tvetydigt,
// bär det en kampanj-/bindnings-/enhetskvalificerare, eller står momsbasen inte skriven nära
// priset — då avslutar skriptet 1 med ett NAMNGIVET skäl. **Fortnox egen sida bär en sådan
// kvalificerare i klartext** («Listat pris avser första användaren, därefter ordinarie
// licenspriser»), så ett rött utfall därifrån är det KORREKTA utfallet, inte ett fel att runda
// av. Maskinen pekar ut sidan och citerar hindret; människan läser och avgör.
//
// ⚠️ SANDLÅDAN HAR INGEN NÄT-EGRESS — skriptet kan bara köras i GitHub Actions (Playwright +
// Chromium, precis som `scripts/price-monitor.mjs`).

import { withPage } from '../lib/verifiers/core.mjs';
import { skrapdom } from '../lib/skrapdom.js';

// Adresserna är INTE gissade — var och en är mätt av `scripts/probe-prislista.mjs` och utfallet
// ligger i `ops/prislistor/`. Att lägga en oprövad adress här vore samma fel en gång till.
const KATALOG = {
  'faktura-tjanst': [
    // 40 par, form «Plan → NNN kr/mån». Mätt 2026-09-04 → ops/prislistor/fortnox-fakturering.txt
    'https://www.fortnox.se/produkt/prislista',
    // 8 par, månad + år som bekräftar varandra. Mätt 2026-09-03 → ops/prislistor/bokio.txt
    'https://www.bokio.se/priser/',
    // 0 par vid mätningen — men det är leverantören prisbokens NOT citerar, så den prövas sist
    // och ett nej därifrån är i sig ett svar om notens hållbarhet.
    'https://billogram.com/sv/priser',
  ],
};

const KATEGORI = process.env.SKRAP_KATEGORI || 'faktura-tjanst';
const KANDIDATER = KATALOG[KATEGORI];
if (!KANDIDATER) {
  console.error(`✗ Okänd kategori «${KATEGORI}». Kända: ${Object.keys(KATALOG).join(', ')}`);
  console.error('  Lägg ALDRIG till en adress utan att först mäta den med scripts/probe-prislista.mjs.');
  process.exit(1);
}

const provade = [];
let bast = null;

for (const url of KANDIDATER) {
  const r = await withPage(url, async (page, status) => {
    if (typeof status === 'number' && status !== 200) return { status, sidtext: '' };
    // Skriptet hämtar TECKEN. Extraktionen och domen bor i lib/skrapdom.js — den halva som kan
    // gissa måste vara prövbar av sviten, och det var precis det som saknades i första versionen.
    const sidtext = await page.evaluate(() => document.body?.innerText ?? '');
    return { status, sidtext };
  }, { timeoutMs: 40000, settleMs: 3500 }).catch((e) => ({ status: 'ERR', sidtext: '', fel: e.message.split('\n')[0] }));

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

console.log(`\n═══ SKRAPA · ${KATEGORI} (publikt SEK-referenspris) ═══\n`);
for (const rad of provade) console.log(`  ${rad}`);

if (!bast) {
  console.error('\n✗ INGEN ADRESS GAV ETT ENTYDIGT PRIS — och det är rätt utfall, inte ett fel att runda av.');
  console.error('  Hellre tystnad än ett gissat golv i prisboken — det är hela poängen med grinden.');
  console.error('  Skälen står ovan, med sidans EGNA ord citerade. Ett [kvalificerat_pris] betyder');
  console.error('  att sidan själv säger att talet inte är ett rent månadslistpris — läs den, och');
  console.error('  för in talet för hand om du kan belägga vad det gäller.');
  process.exit(1);
}

const f = bast.dom.underlag;
console.log(`\n✓ UNDERLAG (INTE ett golv, INTE ett verifierat listpris) — ${bast.dom.skal}\n`);
console.log(`  källa     ${f.url}`);
console.log(`  momsbas   ${f.momsbas}   (LÄST nära VARJE pris, aldrig antagen)`);
console.log(`  priser    ${f.antalPriser} förekomster · ${f.lagsta}–${f.hogsta} kr/mån\n`);
for (const p of f.forekomster) console.log(`    ${String(p.kronor).padStart(6)} kr/mån   …${p.fore} ⟨pris⟩ ${p.efter}…`);

console.log('\n  DET HÄR ÄR ETT UNDERLAG, INTE ETT GOLV. Modulen ser att tecknen är entydiga —');
console.log('  aldrig vilken PRODUKT ett pris hör till. En människa väljer referensprodukten,');
console.log('  och FÖRST därefter går talet in i prisboken med källa och datum. Sedan, och inte');
console.log('  förr, byggs en verifierare som vaktar det mot drift.\n');
