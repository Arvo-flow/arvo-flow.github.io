#!/usr/bin/env node
// scripts/probe-prisarkeologi.mjs — kan vi läsa en leverantörs prishistorik ur webbarkivet?
//
// ══ VARFÖR (2026-09-03) ═════════════════════════════════════════════════════════════════════
//
// Maktkalendern — ett av de sex lager bibeln säger ALDRIG kan vara tomt — är tom för varenda
// leverantör. Mätt: `lib/price-forecast.js` kräver minst 3 verifierade höjningar per leverantör
// (`if (hikes.length < 3) return null`), och den handskrivna listan i `seed-price-history.mjs`
// bär 2 poster, båda Microsoft. **Noll leverantörer når minimum.**
//
// Historiken fylls bara FRAMÅT, från natten vi började bevaka. Att vänta in fem års mönster
// betyder att vänta fem år.
//
// Webbarkivet har däremot leverantörens EGEN prissida, tidsstämplad av en oberoende part,
// kontrollerbar av vem som helst — inklusive kunden. Skillnaden mellan två ögonblicksbilder ÄR
// en prisändring med datum. Det är samma sorts bevis som vår nattliga vakt producerar, fast
// bakåt i tiden, och det är starkare än vår egen skrapning: arkivet är ett tredjepartsvittne.
//
// ══ VARFÖR FORTNOX ÄR RÄTT KANARIEFÅGEL ════════════════════════════════════════════════════
//
// Vi har ett FACIT. `probe-prislista` läste fortnox.se/produkt/prislista i dag och reproducerade
// prisbokens 13 lagrade tal exakt (identiska 13, avvikande 0). Om arkivets FÄRSKASTE
// ögonblicksbild ger samma tal är metoden validerad mot känd sanning — inte mot en förhoppning.
// Ger den andra tal är antingen arkivet eller läsningen fel, och då ska vi veta det innan en
// enda historisk rad skrivs.
//
// FÅNGAR: om en leverantörs prissida finns arkiverad, hur ofta, och om priserna går att läsa
//   ur ögonblicksbilderna maskinellt.
// BLIND: sonden vet inte om arkivet fångade sidan i ett trasigt tillstånd (halvladdad, cookie-
//   vägg, felaktig rendering). Den vet inte heller om ett pris som saknas i en ögonblicksbild
//   betyder «priset ändrades» eller «arkivet fick inte med den delen av sidan». Därför får ett
//   SAKNAT pris aldrig tolkas som en ändring — bara två LÄSTA tal som skiljer sig är ett bevis.
//   Och den interpolerar aldrig mellan två ögonblicksbilder: ett pris mellan två mätpunkter är
//   uppfunnet, inte avläst.

import { chromium } from 'playwright';
import { parFranTabell, parFranKort, prisandringar, beskrivAndring } from '../lib/prisparning.js';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const MALSIDA = process.env.ARK_URL || '';
const LEV = process.env.ARK_LEVERANTOR || '(namnlös)';
const FRAN = process.env.ARK_FRAN || '2021';

if (!MALSIDA) {
  console.error('✗ ARK_URL saknas — sonden har inget att mäta (detta är inte ett mätvärde)');
  process.exit(1);
}

console.log(`═══ PRISARKEOLOGI · ${LEV} ═══`);
console.log(`sida: ${MALSIDA}\nfrån: ${FRAN}\n`);

// ── STEG 1 · vilka ögonblicksbilder finns? ──────────────────────────────────────────────────
// CDX-API:t listar arkivets egna poster. `collapse=timestamp:6` ger en per månad — vi vill se
// TÄCKNINGEN, inte varje enskild hämtning.
// ── DIGEST-DRAGET ───────────────────────────────────────────────────────────────────────────
// Första versionen tog en ögonblicksbild per MÅNAD och läste åtta av dem — ett urval, alltså ett
// GOLV för antalet höjningar, aldrig facit. Att i stället ladda alla 22 blint hade varit att läsa
// samma oförändrade sida om och om igen.
//
// Arkivets index bär en `digest`: en innehållshash per ögonblicksbild. Ett pris kan omöjligen ha
// ändrats mellan två byte-identiska sidor. `collapse=digest` ger därför EXAKT de tidpunkter där
// innehållet faktiskt rörde sig — färre laddningar OCH fullständigare täckning på samma gång.
// Den som samplar hoppar över ändringar; den som följer digesten kan inte göra det.
const cdx = `http://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(MALSIDA)}`
  + `&output=json&from=${FRAN}&filter=statuscode:200&fl=timestamp,original,digest&collapse=digest&limit=200`;

// Arkivet är en gratis allmänning och stryper trafik: första körningen gick igenom, den andra
// fick 503. Ett övergående fel får inte se ut som «ingen historik finns» — sonden försöker om
// med växande paus, och säger tydligt ifrån när den ger upp.
let poster = [];
let sistaFel = null;
for (let forsok = 1; forsok <= 4; forsok += 1) {
  try {
    const r = await fetch(cdx, { headers: { 'user-agent': UA } });
    if (r.ok) {
      poster = (await r.json()).slice(1).map((rad) => ({ ts: rad[0], url: rad[1], digest: rad[2] }));
      // ⚠️ ETT TOMT LYCKAT SVAR EFTER EN STRYPNING ÄR INTE ETT MÄTVÄRDE.
      // Telia-körningen fick 503 på försök 1, och ett senare försök svarade 200 med tom lista.
      // Sonden rapporterade då «sidan finns inte arkiverad» — ett påstående om verkligheten,
      // byggt på ett svar som lika gärna kan vara arkivet under fortsatt belastning. Jag byggde
      // återförsöket för STATUSKODER och missade att tomheten bär samma tvetydighet.
      // Regeln: en tom lista är bara ett mätvärde när INGET försök i körningen har felat.
      if (poster.length === 0 && sistaFel) {
        if (forsok < 4) { console.log(`  tomt svar efter tidigare fel — försök ${forsok}/4, väntar ${forsok * 15} s`); await new Promise((r2) => setTimeout(r2, forsok * 15000)); continue; }
        console.error('✗ CDX gav tomt svar i en körning som redan felat — OKÄNT, inte «ingen historik».');
        process.exit(1);
      }
      sistaFel = null;
      break;
    }
    sistaFel = `status ${r.status}`;
  } catch (err) {
    sistaFel = err.message.slice(0, 60);
  }
  if (forsok < 4) {
    console.log(`  CDX ${sistaFel} — försök ${forsok}/4, väntar ${forsok * 15} s`);
    await new Promise((r) => setTimeout(r, forsok * 15000));
  }
}
if (sistaFel) {
  console.error(`✗ CDX gav upp efter 4 försök (${sistaFel}) — arkivets index kunde inte läsas.`);
  console.error('  Detta är ett OKÄNT, aldrig «ingen historik finns». Kör om senare.');
  process.exit(1);
}

if (poster.length === 0) {
  console.log('ÖGONBLICKSBILDER: 0 — sidan finns inte arkiverad i det här spannet.');
  console.log('  (Det är ett mätvärde: metoden bär inte för den här leverantören.)');
  process.exit(0);
}

console.log(`INNEHÅLLSVERSIONER: ${poster.length} (en per unik digest — sidor där något faktiskt ändrades)`);
console.log(`  äldsta: ${poster[0].ts.slice(0, 8)} · nyaste: ${poster[poster.length - 1].ts.slice(0, 8)}\n`);

// ── STEG 2 · läs PRODUKT → PRIS ur ett urval ögonblicksbilder ───────────────────────────────
// Första versionen läste NAKNA TAL ur den arkiverade HTML:en. Den bevisade att priserna finns
// (Fortnox: alla åtta paketpriser återfanns i den färskaste bilden) men gav ingen koppling till
// produkt — och ett tal utan produkt är ett tal utan påstående. Sidan renderas dessutom med
// JavaScript, precis som i dag, så den måste laddas i en webbläsare.
//
// Läsningen är DEN SAMMA som prislistesonden använder (lib/prisparning.js). En kopia hade kunnat
// glida isär, och då hade historiken och nuläget mätts med olika linjaler.
// Inget urval längre: varje innehållsversion laddas. Taket finns bara för att arkivet är en
// gratis allmänning — nås det säger sonden ifrån i stället för att tyst mäta halva historiken.
const TAK = Number(process.env.ARK_MAX) || 40;
const urval = poster.slice(0, TAK);
if (poster.length > TAK) {
  console.log(`  ⚠ ${poster.length} versioner men taket är ${TAK} — historiken blir ETT GOLV, inte facit.`);
  console.log('    Höj ARK_MAX för fullständig täckning.');
}

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
const page = await ctx.newPage();
const avlasningar = [];

for (const p of [...new Map(urval.map((x) => [x.ts, x])).values()]) {
  const datum = `${p.ts.slice(0, 4)}-${p.ts.slice(4, 6)}-${p.ts.slice(6, 8)}`;
  const arkivUrl = `https://web.archive.org/web/${p.ts}/${p.url}`;
  let ravaror = null;
  try {
    const r = await page.goto(arkivUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    if (!r || r.status() >= 400) { console.log(`  ${datum}  status ${r ? r.status() : '?'} · EJ LÄSBAR`); continue; }
    await page.waitForTimeout(3000);
    ravaror = await page.evaluate(() => {
      const ren = (t) => String(t || '').replace(/\s+/g, ' ').trim();
      const rubrikOver = (el) => {
        let n = el;
        for (let i = 0; i < 30 && n; i += 1) {
          n = n.previousElementSibling || n.parentElement;
          if (!n) break;
          if (/^H[1-4]$/.test(n.tagName)) return ren(n.innerText);
          const h = n.querySelector?.('h1,h2,h3,h4');
          if (h) return ren(h.innerText);
        }
        return '';
      };
      const tabeller = [...document.querySelectorAll('table')].map((t) => {
        const rader = [...t.querySelectorAll('tr')].map((r) => [...r.querySelectorAll('th,td')].map((c) => ren(c.innerText)));
        return { kontext: rubrikOver(t), rubriker: rader[0] ?? [], rader: rader.slice(1) };
      });
      const kort = [...document.querySelectorAll('div,section,article,li')]
        .filter((el) => { const t = ren(el.innerText); return t && t.length <= 260 && /\d\s*kr/i.test(t); })
        .filter((el) => ![...el.children].some((c) => /\d\s*kr/i.test(ren(c.innerText)) && ren(c.innerText).length > 40))
        .slice(0, 60)
        .map((el) => ({ kontext: rubrikOver(el), rader: (el.innerText || '').split('\n').map(ren).filter(Boolean) }));
      return { tabeller, kort };
    });
  } catch (err) {
    console.log(`  ${datum}  EJ LÄSBAR: ${err.message.slice(0, 60)}`);
    continue;
  }

  const par = [];
  for (const t of ravaror.tabeller) par.push(...parFranTabell(t.rubriker, t.rader, t.kontext));
  for (const k of ravaror.kort) { const x = parFranKort(k.rader, k.kontext); if (x) par.push(x); }
  const unika = [...new Map(par.filter((x) => Number.isFinite(x.listpris)).map((x) => [`${x.paket}|${x.rad}`, x])).values()];
  avlasningar.push({ datum, par: unika });

  console.log(`  ${datum}  ${unika.length} produkt→pris-par` + (unika.length ? ':' : ' (EJ LÄSBAR — inte «inga priser»)'));
  for (const x of unika.slice(0, 8)) {
    console.log(`      ${x.paket}${x.rad ? ' · ' + x.rad : ''} → ${x.listpris} kr` + (x.kampanj ? ` (kampanj ${x.kampanjpris})` : ''));
  }
  await new Promise((r) => setTimeout(r, 1500));   // arkivet är en gratis allmänning — varsamt
}
await browser.close();

// ── STEG 3 · skillnaderna ÄR historiken ─────────────────────────────────────────────────────
const andringar = prisandringar(avlasningar);
console.log(`\n═══ PRISÄNDRINGAR ur ${avlasningar.length} avläsningar: ${andringar.length} ═══`);
for (const a of andringar.slice(0, 30)) {
  console.log(`  ${beskrivAndring(a)}`);
}
const perPaket = {};
for (const a of andringar) perPaket[a.paket] = (perPaket[a.paket] ?? 0) + 1;
const mogna = Object.entries(perPaket).filter(([, n]) => n >= 3);
console.log(`\nPRODUKTER MED ≥3 ÄNDRINGAR (prognosmotorns minimum): ${mogna.length}`);
for (const [namn, n] of mogna) console.log(`  ${namn}: ${n} ändringar`);

console.log(`\n[probe-prisarkeologi] ${LEV} klar`);
