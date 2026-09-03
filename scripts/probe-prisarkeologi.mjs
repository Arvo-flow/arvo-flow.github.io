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

// ── STEG 2 · läs priserna ur ett urval ──────────────────────────────────────────────────────
// Vi läser den RÅA arkiverade HTML:en. Arkivet sparar sidan som den levererades, alltså före
// JavaScript — vilket är samma blindhet som drabbade prislistesonden. Skillnaden mäts och
// rapporteras hellre än döljs: ser vi noll tal i en ögonblicksbild vet vi inte om priset saknades
// eller om sidan var JS-renderad. Båda är «EJ LÄSBAR», aldrig «inga priser».
const PRIS_RE = /(\d{1,3}(?:[  ]?\d{3})*(?:[.,]\d{1,2})?)\s*kr/gi;
const urval = poster.length <= 8 ? poster
  : [0, 1, 2, 3, 4, 5, 6, 7].map((i) => poster[Math.floor((i * (poster.length - 1)) / 7)]);

for (const p of [...new Map(urval.map((x) => [x.ts, x])).values()]) {
  const arkivUrl = `http://web.archive.org/web/${p.ts}id_/${p.url}`;
  let tal = null;
  let status = null;
  try {
    const r = await fetch(arkivUrl, { headers: { 'user-agent': UA }, redirect: 'follow' });
    status = r.status;
    if (r.ok) {
      const html = await r.text();
      const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
      tal = [...new Set([...text.replace(/\s+/g, ' ').matchAll(PRIS_RE)].map((m) => m[1]))];
    }
  } catch (err) {
    status = `FEL ${err.message.slice(0, 40)}`;
  }
  const datum = `${p.ts.slice(0, 4)}-${p.ts.slice(4, 6)}-${p.ts.slice(6, 8)}`;
  if (tal === null) console.log(`  ${datum}  status ${status} · EJ LÄSBAR`);
  else if (tal.length === 0) console.log(`  ${datum}  status ${status} · 0 tal (JS-renderad eller prislös — EJ LÄSBAR, inte «inga priser»)`);
  else console.log(`  ${datum}  status ${status} · ${tal.length} tal: ${tal.slice(0, 14).join(' · ')}`);
  await new Promise((r) => setTimeout(r, 1200));   // arkivet är en gratis allmänning — vi tar den varsamt
}

console.log(`\n[probe-prisarkeologi] ${LEV} klar`);
