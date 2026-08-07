// scripts/live-door-lekia.mjs — LIVE-BEVIS för dörren: samma test grundaren kör,
// fotat efter svaret. Inga mockar. Två domänklasser: Lekia (rikt SPF-nät) och
// Kristianstads Måleri (tunt nät på Loopia — å/ä/ö-fallet + marknadsankaret).
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const OUT = 'ops/door-shots';
mkdirSync(OUT, { recursive: true });

const CASES = [
  { email: 'kontakt@lekia.se', tag: 'lekia' },
  { email: 'hej@kristianstadsmaleri.se', tag: 'kristianstadsmaleri' },
  { email: 'x@hdssyjxdd.se', tag: 'spokdoman' },   // spökdomän-läxan: ska ge ärligt besked, inget kort
  { email: 'info@k-fastigheter.se', tag: 'kfast', waitReceipt: true },   // pending-noten MÅSTE resolvera till kvitto
  // Bländaren: avida.se är fallet där grinden VÄGRAR välja (flera bolag heter något med Avida).
  // Fotas både stängd (tröskeln) och öppen (registret vi faktiskt läste) — det är den enda
  // ytan där vi visar vår egen osäkerhet, och därför den som måste se dyrast ut.
  { email: 'info@avida.se', tag: 'avida', openAperture: true },
];

// Geometrifel som ingen svit kan se — de bor i utlagd CSS, inte i JS. Samlas och fäller körningen.
const fel = [];

const b = await chromium.launch({ headless: true });
for (const { email, tag, waitReceipt, openAperture } of CASES) {
  for (const [w, view] of [[390, 'mobil'], [1600, 'desktop']]) {
    const p = await b.newPage({ viewport: { width: w, height: 1200 } });
    await p.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(2500);
    const input = p.locator('input[type=email]').first();
    await input.scrollIntoViewIfNeeded();
    await p.waitForTimeout(800);
    await input.fill(email);
    await p.locator('button:has-text("Öppna underlaget")').click();
    await p.waitForSelector('.rv-find, .rp-note', { timeout: 45000 });
    await p.waitForTimeout(1500);
    // Pending-läxan: vänta tills våg 2 resolverat till kvittot ("SAMMANSTÄLLT") och verifiera
    // att pending-noten ("arbetar fortfarande") ÄR BORTA — beviset att noten aldrig hänger kvar.
    if (waitReceipt) {
      await p.waitForFunction(() => [...document.querySelectorAll('.rv-receipt')]
        .some((e) => /SAMMANST/i.test(e.textContent)), { timeout: 30000 }).catch(() => {});
      const stillPending = await p.locator('.rv-receipt', { hasText: 'arbetar fortfarande' }).count();
      if (view === 'mobil') console.log(`PENDING KVAR ${tag}:`, stillPending, '(ska vara 0)');
    }
    if (view === 'mobil') {
      const rows = await p.locator('.rv-title').allTextContents();
      console.log(`FYND ${tag}:`, JSON.stringify(rows));
      if (!rows.length) console.log(`NOT ${tag}:`, JSON.stringify(await p.locator('.rp-note').allTextContents()));

      // TRÖSKELORDNINGEN (grundarbeslut 2026-08-07): identitetsraden ska stå FÖRE kvittot.
      // Kvittot är en fullbordan — står frågan efter den blir den en fotnot på färdig produkt.
      // Mäts i DOM, så att en framtida refaktor inte tyst kan flytta tillbaka den.
      const ordning = await p.evaluate(() => {
        const i = document.querySelector('.rv-ident, .rv-aperture');
        const k = document.querySelector('.rv-receipt');
        if (!i || !k) return i ? 'ident-utan-kvitto' : (k ? 'kvitto-utan-ident' : 'ingetdera');
        return (i.compareDocumentPosition(k) & Node.DOCUMENT_POSITION_FOLLOWING) ? 'IDENT-FÖRE-KVITTO' : 'FEL: kvitto före ident';
      });
      console.log(`ORDNING ${tag}:`, ordning);

      // Orgnr ska läsas som ett dokument, aldrig som maskinutdata: 556230-9004, aldrig 5562309004.
      const raOrgnr = await p.evaluate(() => {
        const t = (document.querySelector('.rv-ident')?.textContent ?? '')
          + ' ' + [...document.querySelectorAll('.ap-org')].map((e) => e.textContent).join(' ');
        return (t.match(/(?<!\d)\d{10}(?!\d)/g) ?? []);
      });
      console.log(`RÅA ORGNR ${tag}:`, JSON.stringify(raOrgnr), '(ska vara [])');
    }
    // ── MITTLINJEN (maskinvakt 2026-08-07, kväll) ────────────────────────────────────────────
    // Underlaget stod 60px HÖGER om sidans mittlinje: en negativ marginal räknad för hand mot
    // en förälder som antogs (.inner 680) men i verkligheten var DoorBlock (560). Grundaren såg
    // det med ögat — ingen maskin sa ifrån, för geometri bor i utlagd CSS och når aldrig sviten.
    // Nu mäts två saker i DOM vid varje körning: att bilagan delar MITTLINJE med sidan, och att
    // den delar KANT med kolumnen som regeln ritar. Ett mått som glider isär fäller körningen.
    const matt = await p.evaluate(() => {
      const kort = document.querySelector('.rv-card');
      const kolumn = document.querySelector('.inner');
      if (!kort || !kolumn) return null;
      const a = kort.getBoundingClientRect();
      const k = kolumn.getBoundingClientRect();
      return {
        kortMitt: a.left + a.width / 2,
        sidMitt: document.documentElement.clientWidth / 2,
        kantAvvik: Math.max(Math.abs(a.left - k.left), Math.abs(a.right - k.right)),
      };
    });
    if (matt) {
      const skev = Math.abs(matt.kortMitt - matt.sidMitt);
      const ok = skev <= 1 && matt.kantAvvik <= 1;
      console.log(`MITTLINJEN ${tag} ${view}: kortets mitt ${matt.kortMitt.toFixed(1)} · sidans ${matt.sidMitt.toFixed(1)}`
        + ` · skevhet ${skev.toFixed(1)}px · kant mot kolumnen ${matt.kantAvvik.toFixed(1)}px ${ok ? '✓' : '✗ FEL'}`);
      if (!ok) fel.push(`${tag}/${view}: skevhet ${skev.toFixed(1)}px · kantavvikelse ${matt.kantAvvik.toFixed(1)}px`);
    }

    await p.screenshot({ path: `${OUT}/${tag}-${view}.png`, fullPage: true });
    console.log(`✓ ${tag} ${view}`);

    // Bländaren öppnas och fotas separat — den stängda tröskeln och det öppna registret är
    // två olika påståenden och båda måste hålla i mobil och desktop.
    if (openAperture) {
      const knapp = p.locator('.rv-ident button').first();
      if (await knapp.count()) {
        await knapp.click();
        await p.waitForSelector('.rv-aperture', { timeout: 8000 }).catch(() => {});
        await p.waitForTimeout(900);
        if (view === 'mobil') {
          const rader = await p.locator('.ap-row').allTextContents();
          console.log(`BLÄNDAREN ${tag}:`, JSON.stringify(rader));
          // Avida-läxan: bländaren får ALDRIG peka. Stavningslikhet ("närmast er domän") pekade
          // på fel juridisk person; igenkänningsraden (ort · bransch) pekar inte, den låter
          // kunden se sig själv. Båda mäts live så att knuffen inte kan smyga tillbaka.
          const vagvisare = rader.filter((t) => /närmast/i.test(t)).length;
          const medIgenkanning = await p.locator('.ap-var').count();
          console.log(`VÄGVISARE ${tag}:`, vagvisare, '(ska vara 0) · IGENKÄNNING:', medIgenkanning, `av ${rader.length}`);
        }
        await p.screenshot({ path: `${OUT}/${tag}-blandare-${view}.png`, fullPage: true });
        console.log(`✓ ${tag} bländare ${view}`);
      } else {
        console.log(`BLÄNDAREN ${tag}: ingen knapp — grinden namngav ett bolag (eller tystnad utan kandidater)`);
      }
    }
    await p.close();
  }
}
await b.close();

if (fel.length) {
  console.log(`\n✗ MÅTTSYSTEMET BRUTET — ${fel.length} avvikelse(r):`);
  fel.forEach((f) => console.log(`   ${f}`));
  process.exitCode = 1;
} else {
  console.log('\n✓ Måttsystemet håller — bilagan delar mittlinje och kant i varje vy.');
}
