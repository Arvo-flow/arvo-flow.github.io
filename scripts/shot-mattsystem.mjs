// scripts/shot-mattsystem.mjs — VISUELL KONTROLL av måttsystemet (regel 8), lokalt.
//
// Dörrens live-körning har redan BEVISAT talen efter fixen (800.0/800.0 · 0.0px · "Måttsystemet
// håller"). Det som återstod var ögat: att se att bilagan, rummets kort och prosakolumnen läser
// som ETT instrument. CI-körningarna tappade sina foton i en kapplöpning, så kontrollen görs här
// mot SAMMA bygge (build/) i samma motor (Chromium), med /api/reveal besvarad av en STUBB.
//
// Ärlighetsgränsen: stubben används ENDAST för att framkalla layouten. Inga tal ur den når någon
// kundyta, ingen slutsats dras om innehåll — bara om geometri. Innehållets sanning bevisas av
// dörren mot skarpa sajten, aldrig av den här filen.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const OUT = 'ops/matt-shots';
mkdirSync(OUT, { recursive: true });

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };

const server = createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/flow/, '') || '/';
  let p = join('build', normalize(rel).replace(/^(\.\.[/\\])+/, ''));
  if (!existsSync(p) || !extname(p)) p = join('build', 'index.html');
  res.writeHead(200, { 'Content-Type': MIME[extname(p)] ?? 'application/octet-stream' });
  res.end(readFileSync(p));
});
await new Promise((r) => server.listen(4173, r));

// Stubben speglar formen på ett verkligt svar (avida.se) — samma fält, samma antal rader.
const SVAR = {
  ok: true,
  domain: 'avida.se',
  findings: [
    { title: 'Ert bokslut 2024: 1 209,0 mkr i omsättning, 162 anställda',
      detail: 'Gäller Avida Bank AB (publ) — offentliga uppgifter, inget ni behövt dela. Vi läser era förutsättningar innan vi läser era fakturor.',
      source: 'Bolagsverket · bokslutsår 2024' },
    { title: 'Er omsättning föll 9 % senaste bokslutsåret',
      detail: 'Från 1 325,5 till 1 209,0 mkr (bokslutsåren 2023 → 2024) — offentliga bokslutssiffror. När intäkterna viker väger varje kostnadskrona dubbelt — det är exakt där vi arbetar.',
      source: 'Bolagsverket · bokslutsåren 2023–2024' },
    { title: 'Ni kör Microsoft 365',
      detail: 'Bekräftat på flera oberoende spår. Vilken nivå ni betalar för avgör tusenlappar per anställd och år — och den syns bara på fakturan. Dela en, så läser vi exakt.',
      source: 'Ert e-postsystem dirigeras till Microsoft — öppet i avida.se:s publika uppgifter · nivåspannet: Microsofts publika listpriser' },
    { title: 'Er koncern rymmer 2 bolag',
      detail: '1 dotterbolag. Avtal tecknas ofta bolag för bolag i en koncern — volymen förhandlas sällan som en. Det brukar ligga pengar i strukturen.',
      source: 'Bolagsverket · 2 bolag i strukturen' },
    { title: 'Grundat 1983 — 43 år i verksamhet',
      detail: 'Ett bolag med 43 år bakom sig har avtal som funnits nästan lika länge — och de äldsta är sällan omprövade. Det är oftast där det ligger pengar.',
      source: 'Bolagsverket · grundandeår 1983' },
  ],
  identity: {
    confirmed: false, confirmedName: null, readCount: 25,
    candidates: [
      { orgnr: '5562309004', legalName: 'Avida Bank AB (publ)', ort: 'Stockholm', verksamhet: 'Finansbolag, finansiella tjänster' },
      { orgnr: '5591653182', legalName: 'AVIDA ASSISTANS & OMSORG I SVERIGE AB', ort: 'Örebro', verksamhet: 'Omvårdnad och omsorg' },
      { orgnr: '5590177068', legalName: 'Avida AB', ort: 'Stockholm', verksamhet: 'Företagsutveckling' },
    ],
  },
};

// Repots playwright-version pekar på en nyare Chromium än den förinstallerade — peka explicit
// (miljön har chromium-1194 under PLAYWRIGHT_BROWSERS_PATH; ingen nedladdning görs).
const KROM = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const b = await chromium.launch({ headless: true, executablePath: existsSync(KROM) ? KROM : undefined });
for (const [w, vy] of [[390, 'mobil'], [1600, 'desktop']]) {
  // ETT QA-VERKTYG SOM LJUGER ÄR VÄRRE ÄN INGET (läxa 2026-08-07): första versionen fotade i
  // reduced-motion, vilket visar elementen men lämnar dagräknaren på 0 eftersom den tickar först
  // när raden SETTS. Resultatet var en bild av animationens startläge som såg ut som en dålig
  // design — och jag höll på att designa om fungerande arbete efter den. Nu fotas sidan som en
  // besökare ser den: verklig scroll, verkliga observers, och en larmande kontroll på slutet.
  const p = await b.newPage({ viewport: { width: w, height: 1200 } });
  await p.route('**/api/reveal', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(SVAR) }));
  await p.goto('http://localhost:4173/flow/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(1500);
  // Dörren frågar efter en DOMÄN (type=text) sedan 2026-08-13. Selektorn hänger på
  // aria-label — den beskriver VAD fältet är, inte hur det råkar vara typat, så en
  // attributändring kan inte tysta sonden. En sond som letar efter ett fält som inte
  // finns rapporterar sin egen inaktualitet som ett fel i sajten.
  const input = p.locator('input[aria-label="Er företagsdomän"]').first();
  await input.scrollIntoViewIfNeeded();
  await p.waitForTimeout(600);
  await input.fill('avida.se');
  await p.locator('button:has-text("Öppna underlaget")').click();
  await p.waitForSelector('.rv-find', { timeout: 15000 });
  await p.waitForTimeout(1600);
  // Rörelselagret väcks av IntersectionObserver — allt under fold står på opacity 0 tills det
  // setts. Ett fullPage-foto scrollar inte, så utan detta fotograferar vi en tom sida och tror
  // att rummet saknas. Scrolla igenom, låt observers fyra, gå tillbaka upp.
  for (let y = 0; y < 5600; y += 450) { await p.mouse.wheel(0, 450); await p.waitForTimeout(160); }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(1200);
  // Ärlighetskontroll på fotot självt: dagräknaren tickar bara när raden SETTS. Står den kvar
  // på 0 har observern aldrig fyrat och bilden visar inte sidan — då är fotot inte ett bevis.
  const dagar = (await p.locator('.a-days').first().textContent().catch(() => '')) ?? '';
  if (/^0 dagar/.test(dagar.trim())) console.log(`  ⚠ ${vy}: dagräknaren står på 0 — observern fyrade inte, fotot visar inte rummet färdigt`);

  // Samma två invarianter som dörren mäter live — här också, mot det lokala bygget.
  const m = await p.evaluate(() => {
    const rad = document.querySelector('.rv-find');
    const kort = rad?.parentElement;
    const kolumn = document.querySelector('.inner');
    const rum = document.querySelector('.a-card')?.parentElement;
    const a = kort.getBoundingClientRect(); const k = kolumn.getBoundingClientRect();
    const r = rum?.getBoundingClientRect();
    return {
      kortMitt: a.left + a.width / 2, sidMitt: document.documentElement.clientWidth / 2,
      kortBredd: a.width, kolumnBredd: k.width,
      kantAvvik: Math.max(Math.abs(a.left - k.left), Math.abs(a.right - k.right)),
      rumBredd: r?.width ?? null, rumMitt: r ? r.left + r.width / 2 : null,
    };
  });
  console.log(`${vy.padEnd(8)} kort ${m.kortBredd.toFixed(0)}px · mitt ${m.kortMitt.toFixed(1)} (sidan ${m.sidMitt.toFixed(1)})`
    + ` · kant ${m.kantAvvik.toFixed(1)}px · kolumn ${m.kolumnBredd.toFixed(0)}px`
    + ` · rummets kort ${m.rumBredd?.toFixed(0) ?? '—'}px mitt ${m.rumMitt?.toFixed(1) ?? '—'}`);

  await p.screenshot({ path: `${OUT}/matt-${vy}.png`, fullPage: true });
  await p.close();
}
await b.close();
server.close();
console.log(`\nFoton: ${OUT}/matt-mobil.png · ${OUT}/matt-desktop.png`);
