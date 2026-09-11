// scripts/screenshot-rummet-prisboken.mjs — REGEL 8 FÖR PRISBOKSGRINDEN (2026-09-11).
//
// ══ VARFÖR ══════════════════════════════════════════════════════════════════════════════════
// Prisboksgrinden (2026-09-10) tystade fyra av fem bärande celler och gjorde listpris-fallbacken
// vanligare. Tre granskningsvarv prövade MEKANIKEN; ingen av dem tittade på vad kunden ser.
// Bibelns 22-augustiläxa ordagrant: «jag hade lagat tolv fel i backend utan att EN ENDA GÅNG
// titta på vad kunden ser». Läsning är inte seende — «rummet läser getPublicListBenchmark, alltså
// är det orört» är ett påstående tills någon öppnat sidan.
//
// VAD DEN BEVISAR: att det SKARPA rummet (produktionens API, produktionens data, produktionens
// UI) renderar efter ändringen, och vad dess lager faktiskt SÄGER.
// VAD DEN INTE BEVISAR, uttalat: den seedade testytans rader är FÖRBERÄKNADE. Grinden verkar vid
// ANALYSTILLFÄLLET, så bilden visar aldrig en tystad cell födas — den halvan är mätt separat
// pastaende-ok: en DEKLARERAD gräns för sonden, inte ett påstående om produktionskod
// med `diag-live` (dustin-m365-standard → kallaSource real-public, verifierat 2026-09-07,
// kallaArTotalsumma false). De två mätningarna svarar på olika frågor och ersätter inte varandra.
//
// IDENTITET: testytan (`testyta@arvoflow.se`), aldrig en personlig adress — repot och
// Actions-loggen är publika.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const URL = process.argv[2];
if (!URL) { console.log('URL saknas (argv[2]) — sonden kom aldrig fram.'); process.exit(1); }
const OUT = 'ops/rum-prisboken';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });

/** Fotografera ett läge och lämna tillbaka sidans text, så beviset är läsbart och inte bara pixlar. */
async function skjut(bredd, namn) {
  const page = await browser.newPage({ viewport: { width: bredd, height: 1400 } });
  const konsolfel = [];
  page.on('pageerror', (e) => konsolfel.push(String(e.message).slice(0, 200)));
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);              // loadOffice → API → render
  await page.screenshot({ path: `${OUT}/${namn}.png`, fullPage: true });
  const text = await page.locator('body').innerText();
  await page.close();
  return { text, konsolfel };
}

const mobil = await skjut(390, 'rummet-mobil-390');
const desktop = await skjut(1600, 'rummet-desktop-1600');
await browser.close();

const text = desktop.text;
writeFileSync(`${OUT}/rummets-text.txt`, text);

// ── VAD SÄGER RUMMET? Raderna som rör prisboken skrivs ut, så domen går att läsa i loggen. ──
const NYCKELORD = /bransch|listpris|verifierat|marknad|Arvo Score|Bevakar|prissatt|typiskt betalar/i;
const rader = text.split('\n').map((r) => r.trim()).filter(Boolean);
console.log(`\n═══════ RUMMET (${URL.split('?')[0]}) ═══════`);
console.log(`rader i vyn: ${rader.length} · mobil ${mobil.text.length} tecken · desktop ${text.length} tecken`);
console.log('\nRADER SOM RÖR PRISBOKEN:');
for (const r of rader.filter((r) => NYCKELORD.test(r)).slice(0, 30)) console.log(`  · ${r}`);

// ── SONDEN MÅSTE KUNNA FÄLLA (dagens läxa: en vakt som alltid är grön är ingen vakt) ─────────
const fel = [];
for (const [namn, läge] of [['mobil', mobil], ['desktop', desktop]]) {
  if (läge.konsolfel.length) fel.push(`${namn}: JS-fel i kundytan — ${läge.konsolfel[0]}`);
  if (läge.text.length < 400) fel.push(`${namn}: sidan är i praktiken tom (${läge.text.length} tecken) — rummet renderade inte`);
}
// Ett rum utan innehav är inte ett rum. Tomheten ser identisk ut med «allt gick sönder».
if (!/Bevakar|leverantör/i.test(text)) fel.push('radarn saknas helt — rummet bär inget bevakningslager');
if (/Något gick fel|kunde inte laddas|Error/i.test(text)) fel.push('rummet visar ett felläge för kunden');

if (fel.length) {
  console.log('\n✗ RUMMET ÄR INTE FRISKT:');
  for (const f of fel) console.log(`   ${f}`);
  process.exit(1);
}
console.log('\n✓ Rummet renderar i båda bredderna, utan JS-fel och utan felläge.');
console.log(`  Bilder: ${OUT}/rummet-mobil-390.png · ${OUT}/rummet-desktop-1600.png`);
