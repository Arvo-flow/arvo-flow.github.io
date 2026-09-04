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
import { parFranTabell, parFranKort, prisandringar } from '../lib/prisparning.js';

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
const cdx = `http://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(MALSIDA)}`
  + `&output=json&from=${FRAN}&filter=statuscode:200&collapse=timestamp:6&limit=80`;

let poster = [];
try {
  const r = await fetch(cdx, { headers: { 'user-agent': UA } });
  if (!r.ok) {
    console.error(`✗ CDX svarade ${r.status} — arkivets index kunde inte läsas (OKÄNT, inte «inga poster»)`);
    process.exit(1);
  }
  const rader = await r.json();
  poster = rader.slice(1).map((rad) => ({ ts: rad[1], url: rad[2] }));
} catch (err) {
  console.error(`✗ CDX gick inte att nå: ${err.message} — inget mätvärde`);
  process.exit(1);
}

if (poster.length === 0) {
  console.log('ÖGONBLICKSBILDER: 0 — sidan finns inte arkiverad i det här spannet.');
  console.log('  (Det är ett mätvärde: metoden bär inte för den här leverantören.)');
  process.exit(0);
}

console.log(`ÖGONBLICKSBILDER: ${poster.length} (en per månad, statuskod 200)`);
console.log(`  äldsta: ${poster[0].ts.slice(0, 8)} · nyaste: ${poster[poster.length - 1].ts.slice(0, 8)}\n`);

// ── STEG 2 · läs PRODUKT → PRIS ur ett urval ögonblicksbilder ───────────────────────────────
// Första versionen läste NAKNA TAL ur den arkiverade HTML:en. Den bevisade att priserna finns
// (Fortnox: alla åtta paketpriser återfanns i den färskaste bilden) men gav ingen koppling till
// produkt — och ett tal utan produkt är ett tal utan påstående. Sidan renderas dessutom med
// JavaScript, precis som i dag, så den måste laddas i en webbläsare.
//
// Läsningen är DEN SAMMA som prislistesonden använder (lib/prisparning.js). En kopia hade kunnat
// glida isär, och då hade historiken och nuläget mätts med olika linjaler.
const urval = poster.length <= 8 ? poster
  : [0, 1, 2, 3, 4, 5, 6, 7].map((i) => poster[Math.floor((i * (poster.length - 1)) / 7)]);

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
  const tecken = a.tillPris > a.franPris ? '↑' : '↓';
  console.log(`  ${tecken} ${a.paket}: ${a.franPris} → ${a.tillPris} kr (${a.procent > 0 ? '+' : ''}${a.procent} %) · ${a.fran} → ${a.till}`);
}
const perPaket = {};
for (const a of andringar) perPaket[a.paket] = (perPaket[a.paket] ?? 0) + 1;
const mogna = Object.entries(perPaket).filter(([, n]) => n >= 3);
console.log(`\nPRODUKTER MED ≥3 ÄNDRINGAR (prognosmotorns minimum): ${mogna.length}`);
for (const [namn, n] of mogna) console.log(`  ${namn}: ${n} ändringar`);

console.log(`\n[probe-prisarkeologi] ${LEV} klar`);
