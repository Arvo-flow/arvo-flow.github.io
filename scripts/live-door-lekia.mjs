// scripts/live-door-lekia.mjs — LIVE-BEVIS för dörren: samma test grundaren kör,
// fotat efter svaret. Inga mockar. Två domänklasser: Lekia (rikt SPF-nät) och
// Kristianstads Måleri (tunt nät på Loopia — å/ä/ö-fallet + marknadsankaret).
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { bedomMatt } from '../lib/mattsystem.js';

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
  // LEVERANTÖRSRUBRIKEN (2026-08-12): castra.se är fallet som avslöjade att ordboken var för
  // liten — 31 SPF-mekanismer, MailerLite och Brevo i klartext, noll igenkända namn. Kortet gav
  // 'Ni kör Microsoft 365' + DMARC. Nu ska rubriken bära namnen, och det ska SES ut som ett fynd
  // och inte som en lista. Två namn wrappar; fotot är det enda som visar om det håller i 390 px.
  { email: 'hej@castra.se', tag: 'castra' },
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
      // Kvittot namnger registren (bytt 2026-08-07 från uppmätt tid, som blev sämre ju bättre
      // kortet blev). Matchen följer med — en vakt som letar efter en text som inte längre finns
      // slutar mäta i tysthet, och den fällan gick vi redan i en gång i dag.
      await p.waitForFunction(() => [...document.querySelectorAll('.rv-receipt')]
        .some((e) => /ÖPPNA REGISTER/i.test(e.textContent)), { timeout: 30000 }).catch(() => {});
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
    //
    // VAKTENS EGEN LÄXA (samma dag, en timme senare): första versionen kedjades vid klassen
    // .rv-card — som bara fanns i den ännu ocommittade fixen. Den matchade ingenting på skarpa
    // sajten, mätte noll fall, skrev noll rader och lät körningen bli GRÖN. Exakt prisbokens
    // sjukdom: en vakt som tiger ser ut som en vakt som godkänner. Därför två regler här:
    //   1 · ankra i INNEHÅLLET (.rv-find ÄR ett kort), aldrig i en kosmetisk klass som kan döpas om
    //   2 · "kunde inte mäta" är ett FEL, aldrig en tyst passage. Bara "inget kort alls"
    //       (spökdomänen) är en laglig tystnad — och den bevisas redan av FYND/NOT ovan.
    const matt = await p.evaluate(() => {
      const rad = document.querySelector('.rv-find');
      if (!rad) return { ingetKort: true };
      const kort = rad.parentElement;
      const kolumn = document.querySelector('.inner');
      if (!kort || !kolumn) return { trasig: kort ? 'ingen .inner-kolumn' : 'kortet saknar förälder' };
      const a = kort.getBoundingClientRect();
      const k = kolumn.getBoundingClientRect();
      return {
        kortMitt: a.left + a.width / 2,
        sidMitt: document.documentElement.clientWidth / 2,
        kantAvvik: Math.max(Math.abs(a.left - k.left), Math.abs(a.right - k.right)),
      };
    });
    // Omdömet bor i lib/mattsystem.js och är testlåst (tests/mattsystem.mjs) — dörren MÄTER,
    // domaren DÖMER. Delningen finns för att vaktens logik ska gå att prova utan en CI-körning:
    // en vakt vars tänder aldrig provats är en vakt vi bara hoppas på.
    const dom = bedomMatt(matt);
    if (dom.tyst) {
      console.log(`MITTLINJEN ${tag} ${view}: inget kort på sidan — inget att mäta (laglig tystnad)`);
    } else {
      const tal = typeof matt.kortMitt === 'number'
        ? `kortets mitt ${matt.kortMitt.toFixed(1)} · sidans ${matt.sidMitt.toFixed(1)} · kant mot kolumnen ${matt.kantAvvik.toFixed(1)}px`
        : '(ingen giltig mätning)';
      console.log(`MITTLINJEN ${tag} ${view}: ${tal} ${dom.ok ? '✓' : `✗ FEL — ${dom.skal}`}`);
      if (!dom.ok) fel.push(`${tag}/${view}: ${dom.skal}`);
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
