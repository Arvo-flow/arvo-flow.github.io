#!/usr/bin/env node
// scripts/probe-prislista.mjs — EN sond för hela prisdata-flottan: har den här leverantören en
// publik SEK-prislista, och går den att läsa maskinellt?
//
// ══ VARFÖR (2026-09-02) ═════════════════════════════════════════════════════════════════════
//
// Kanariefågeln mot Loopia (`probe-loopia-priser.mjs`) bevisade formen men hade en brist som
// gjorde utfallet obrukbart: den hittade **inga paketnamn**. Vi fick priserna men inte vilket
// paket varje pris hörde till, och **ett pris utan produkt är ett tal utan påstående**
// (bibeln, MK-08 — «Billigaste publicerade pris 1 606 kr» på en Google-rad läses som Googles
// pris, men talet var M365:s).
//
// Orsaken: extraktionen letade `h1..h4` med ett pris i närmaste block. Loopias priser står i en
// TABELL, där paketnamnen är kolumnrubriker — inga rubriktaggar alls. Den här sonden läser båda
// formerna, och säger uttryckligen vilken den använde.
//
// ══ VAD DEN MÄTER, OCH VARFÖR JUST DET ═════════════════════════════════════════════════════
//
//   RÅ vs RENDERAD   Finns talen i HTML utan JavaScript? Loopias prissida: 9 av 21. Översikts-
//                    sidan: 0 av 6. Avgör om verifieraren behöver Playwright — alltså kostnaden.
//   KAMPANJ          «39 kr första året därefter 279 kr». Tar en verifierare 39 som listpris får
//                    en kund på 279 se ut att överbetala 615 %. HubSpot-fällan, ordagrant.
//   MOMS             Ett pris utan momsbas går inte att jämföra med kundens faktura.
//   HINDER           Offertknapp, inloggning, domänväljare — då finns inget listpris att ankra mot.
//
// FÅNGAR: om en leverantör publicerar SEK-priser öppet, var, i vilken form, och med vilka fällor.
// BLIND: sonden läser EN sida vid EN tidpunkt. Den vet inte om priset är aktuellt för företag
//   (mot privat), om det finns ett bättre pris bakom en inloggning, eller om sidan visar olika
//   priser för olika besökare. Den avgör ALDRIG att ett pris får skrivas in i prisboken — den
//   säger bara att en verifierare skulle kunna byggas. Beslutet är en människas.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const LEV = process.env.PRIS_LEVERANTOR || '(namnlös)';
const KAT = process.env.PRIS_KATEGORI || '(okänd)';
const MAL = (process.env.PRIS_URLER || '').split(/[,\s]+/).map((u) => u.trim()).filter(Boolean);

if (MAL.length === 0) {
  console.error('✗ PRIS_URLER saknas — sonden har inget att mäta (detta är inte ett mätvärde)');
  process.exit(1);
}

const PRIS_RE = /(\d{1,3}(?:[  ]?\d{3})*(?:[.,]\d{1,2})?)\s*kr/gi;
const platt = (t) => String(t ?? '').replace(/\s+/g, ' ').trim();

const fragment = (text) => [...new Set([...platt(text).matchAll(PRIS_RE)].map((m) => `${m[1]} kr`))];

const traffa = (text, re) => [...new Set([...platt(text).matchAll(re)].map((m) => m[0].trim().slice(0, 160)))];
const MOMS_RE = /[^.]{0,70}(exkl\.?\s*moms|inkl\.?\s*moms|ex\.?\s*moms|moms tillkommer)[^.]{0,40}/gi;
// One.coms sida skriver «9 kr / 1:a året*» och detektorn sa «(inget)» — den letade bara den
// utskrivna formen «första året». Kampanjfältet är det farligaste vi läser: tas 9 kr som listpris
// blir varje kund en påstådd överbetalare. En detektor som missar sitt eget huvudfall är värre än
// ingen, för den ger ett lugnande «(inget)».
const KAMPANJ_RE = /[^.]{0,80}(f[öo]rsta [åa]ret|1:a [åa]ret|d[äa]refter|ordinarie pris|introduktionspris|introduktionserbjudande|kampanj|f[öo]rnyelsepris|f[öo]rnyas för)[^.]{0,80}/gi;
const HINDER_RE = /(beg[äa]r offert|kontakta oss f[öo]r pris|priser? p[åa] f[öo]rfr[åa]gan|logga in f[öo]r pris|v[äa]lj (?:din )?dom[äa]n)/gi;

console.log(`═══ ${LEV} · ${KAT} · ${MAL.length} sida(or) ═══\n`);

// ── STEG 0 · HITTA PRISSIDAN I STÄLLET FÖR ATT GISSA DEN ────────────────────────────────────
// Mätt över tre vågor: 7 av 16 sonderade sidor svarade 404 eller 530 — 44 % av flottans arbete
// gick till adresser JAG gissat fel. Flaskhalsen var aldrig leverantörerna utan mitt minne.
// Sonden letar därför själv: startsidans länkar med «pris» i text eller adress är leverantörens
// egen anvisning till sin prissida, och den är alltid mer tillförlitlig än min gissning.
async function hittaPrislankar(nagonUrl) {
  try {
    const rot = new URL(nagonUrl).origin;
    const r = await fetch(rot, { headers: { 'user-agent': UA, 'accept-language': 'sv-SE,sv;q=0.9' }, redirect: 'follow' });
    if (!r.ok) return [];
    const html = await r.text();
    const funna = new Set();
    for (const m of html.matchAll(/<a[^>]+href=["']([^"'#]+)["'][^>]*>([\s\S]{0,120}?)<\/a>/gi)) {
      const [, href, txt] = m;
      const etikett = txt.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (!/pris|pricing|kostnad|abonnemang|plans?\b/i.test(`${href} ${etikett}`)) continue;
      try { funna.add(new URL(href, rot).href.split('?')[0]); } catch { /* ogiltig href */ }
    }
    return [...funna].filter((u) => u.startsWith(rot)).slice(0, 6);
  } catch { return []; }
}

const kandidater = await hittaPrislankar(MAL[0]);
if (kandidater.length) {
  console.log(`  KANDIDATER PÅ STARTSIDAN: ${kandidater.join(' · ')}`);
  for (const k of kandidater) if (!MAL.includes(k)) MAL.push(k);
  console.log(`  → sonderar ${MAL.length} sidor totalt\n`);
} else {
  console.log('  KANDIDATER PÅ STARTSIDAN: (inga länkar med pris-ord hittades)\n');
}

// ── STEG 1 · rå HTML, ingen webbläsare ──────────────────────────────────────────────────────
const raFrag = {};
for (const url of MAL) {
  try {
    const r = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'sv-SE,sv;q=0.9' }, redirect: 'follow' });
    const html = await r.text();
    const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
    raFrag[url] = { status: r.status, frag: fragment(text) };
  } catch (err) {
    // Ett fel är ett OKÄNT, aldrig «inga priser». Det skiljer «sidan svarade inte» från
    // «sidan har inga priser» — två svar som annars ser identiska ut.
    raFrag[url] = { status: `FEL: ${err.message.slice(0, 60)}`, frag: null };
  }
}

// ── STEG 2 · renderat ───────────────────────────────────────────────────────────────────────
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
const page = await ctx.newPage();

for (const url of MAL) {
  console.log(`──── ${url}`);
  let status = null;
  try {
    const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    status = r ? r.status() : null;
    await page.waitForTimeout(2500);
  } catch (err) {
    console.log(`  SIDAN GICK INTE ATT LADDA: ${err.message.slice(0, 80)}`);
    continue;
  }

  let cookie = null;
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Godkänn alla")',
    'button:has-text("Acceptera alla")', 'button:has-text("Tillåt alla")',
    'button:has-text("Godkänn")', 'button:has-text("Acceptera")']) {
    try { const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 900 })) { await b.click({ timeout: 2500 }); cookie = sel; await page.waitForTimeout(900); break; } } catch { /* nästa väljare */ }
  }
  console.log(`  status ${status} · cookie-vägg: ${cookie ?? 'ingen'}`);
  if (typeof status !== 'number' || status >= 400) continue;

  const text = await page.evaluate(() => document.body.innerText || '');

  // ── PAKETNAMN + PRIS. Två former, båda prövade, och sonden säger vilken som bar. ──────────
  const par = await page.evaluate(() => {
    const kr = /\d{1,3}(?:[  ]?\d{3})*(?:[.,]\d{1,2})?\s*kr/i;
    const ren = (s) => String(s || '').replace(/\s+/g, ' ').trim();
    const ut = [];

    // FORM A · TABELL. Paketnamnen är kolumnrubriker; priset står i samma kolumnindex.
    // Loopias prissida är den här formen, och den är osynlig för en rubrikbaserad läsare.
    //
    // ⚠️ VARJE TABELL BÄR SIN KONTEXT. Oderlands prissida (2026-09-02) gav 40 par som alla var
    // DOMÄNPRISER — .se 229 kr, .store 796 kr — på en sida vi sonderade för webbhotell. Sonden
    // rapporterade dem med full auktoritet, och «40 par» såg ut som det bästa utfallet i vågen.
    // Ett pris utan sin tabellkontext är samma fel som ett pris utan produkt: ett tal som ser ut
    // som ett svar. Kontexten är närmaste föregående rubrik — sonden mäter, människan avgör
    // relevansen.
    for (const tab of document.querySelectorAll('table')) {
      const rader = [...tab.querySelectorAll('tr')];
      if (rader.length < 2) continue;
      let kontext = ren(tab.querySelector('caption')?.innerText || '');
      if (!kontext) {
        let n = tab;
        for (let steg = 0; steg < 40 && n && !kontext; steg += 1) {
          n = n.previousElementSibling || n.parentElement;
          if (!n) break;
          if (/^H[1-4]$/.test(n.tagName)) kontext = ren(n.innerText);
          else { const h = n.querySelector?.('h1,h2,h3,h4'); if (h) kontext = ren(h.innerText); }
        }
      }
      const rubrik = [...rader[0].querySelectorAll('th,td')].map((c) => ren(c.innerText));
      for (const rad of rader.slice(1)) {
        const celler = [...rad.querySelectorAll('th,td')].map((c) => ren(c.innerText));
        const etikett = celler[0] || '';
        for (let i = 1; i < celler.length; i += 1) {
          if (!kr.test(celler[i])) continue;
          const namn = ren(rubrik[i] || '');
          if (namn) ut.push({ form: 'tabell', kontext: kontext.slice(0, 60) || '(ingen rubrik)', paket: namn, rad: etikett, pris: celler[i] });
        }
      }
    }

    // FORM B · KORT. Minsta block som bär ETT pris; namnet är blockets första rad utan «kr».
    for (const el of document.querySelectorAll('div,section,article,li')) {
      const t = ren(el.innerText);
      if (!t || t.length > 260 || !kr.test(t)) continue;
      if ([...el.children].some((c) => kr.test(ren(c.innerText)) && ren(c.innerText).length > 40)) continue;
      const rader = (el.innerText || '').split('\n').map(ren).filter(Boolean);
      const namn = rader.find((r) => !kr.test(r) && r.length >= 3 && r.length <= 48);
      const pris = rader.find((r) => kr.test(r));
      if (!namn || !pris) continue;
      // KORTEN BEHÖVDE SAMMA KONTEXT SOM TABELLERNA. Tabellfixen räckte inte: One.com visade
      // «.se → 9 kr / 1:a året» i KORTFORM, alltså domänpriser utan rubrik, på en sida vi
      // sonderade för webbhotell. Samma falska träff, en form längre bort.
      let kctx = '';
      let m = el;
      for (let steg = 0; steg < 25 && m && !kctx; steg += 1) {
        m = m.previousElementSibling || m.parentElement;
        if (!m) break;
        if (/^H[1-4]$/.test(m.tagName)) kctx = ren(m.innerText);
        else { const h = m.querySelector?.('h1,h2,h3'); if (h) kctx = ren(h.innerText); }
      }
      ut.push({ form: 'kort', kontext: kctx.slice(0, 60), paket: namn, rad: '', pris });
    }

    const sedd = new Set();
    return ut.filter((p) => { const k = `${p.kontext}|${p.paket}|${p.rad}|${p.pris}`; if (sedd.has(k)) return false; sedd.add(k); return true; }).slice(0, 40);
  });

  const frag = fragment(text);
  const ra = raFrag[url];
  const iRa = ra?.frag ? frag.filter((f) => ra.frag.includes(f)).length : null;

  console.log(`  RÅ HTML: ${ra?.frag ? `${iRa}/${frag.length} tal fanns utan JS` : `EJ MÄTT (${ra?.status})`}`);
  const tabellPar = par.filter((p) => p.form === 'tabell');
  console.log(`  PAKET → PRIS (${par.length} par, ${tabellPar.length} ur tabell):`);
  const kontexter = [...new Set(par.map((p) => p.kontext).filter(Boolean))];
  if (kontexter.length) console.log(`  TABELLER PÅ SIDAN: ${kontexter.join(' | ')}`);
  for (const p of par.slice(0, 25)) {
    const k = p.kontext ? `«${p.kontext}» ` : '';
    console.log(`   § [${p.form}] ${k}${p.paket}${p.rad ? ` · ${p.rad}` : ''} → ${p.pris}`);
  }
  if (par.length === 0) console.log('   (INGA — priserna går inte att koppla till en produkt maskinellt)');
  console.log(`  MOMS:    ${traffa(text, MOMS_RE).slice(0, 3).join(' | ') || '(inget momsord — momsbasen är OKÄND)'}`);
  console.log(`  KAMPANJ: ${traffa(text, KAMPANJ_RE).slice(0, 3).join(' | ') || '(inget)'}`);
  console.log(`  HINDER:  ${traffa(text, HINDER_RE).slice(0, 3).join(' | ') || '(inga)'}`);
  console.log('');
}

await browser.close();
console.log(`[probe-prislista] ${LEV} klar`);
