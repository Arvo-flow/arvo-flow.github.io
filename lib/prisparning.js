// lib/prisparning.js — EN sanning för hur ett pris kopplas till sin produkt på en webbsida.
//
// ══ VARFÖR (2026-09-04) ═════════════════════════════════════════════════════════════════════
//
// Två sonder behöver samma läsning: `probe-prislista` läser leverantörens sida i dag,
// `probe-prisarkeologi` läser samma sida ur webbarkivet vid åtta tidpunkter. Att kopiera
// logiken hade varit LFL-felet ordagrant (bibeln, 12 aug: fyra kopior av samma matte, varav
// produktionen körde en som sviten inte låste). Regel 1: en sanning per fråga.
//
// DOM-vandringen bor kvar i sonderna — den kräver en webbläsare. BESLUTEN bor här, som rena
// funktioner över strängar, och är därför prövbara utan nätverk och utan Playwright.
//
// ══ VAD SOM MÅSTE VARA RÄTT ════════════════════════════════════════════════════════════════
//
// 1. ETT PRIS UTAN PRODUKT ÄR ETT TAL UTAN PÅSTÅENDE. «Billigaste publicerade pris 1 606 kr» på
//    en Google-rad läses som Googles pris — talet var M365:s (MK-08).
// 2. TABELLENS KONTEXT AVGÖR OM PARET ÖVER HUVUD TAGET GÄLLER RÄTT SAK. Oderlands prissida gav
//    40 par som alla var domänpriser, på en sida vi sonderade för webbhotell.
// 3. KAMPANJPRISET ÄR ALDRIG LISTPRISET. «39 kr första året därefter 279 kr» → 279 är listpriset.
//    Tas 39 blir en kund på 279 en påstådd överbetalare med 615 %.
//
// FÅNGAR: ett pris som inte går att binda till en namngiven produkt, och ett kampanjpris som
//   utges för listpris.
// BLIND: modulen ser STRÄNGAR, aldrig sidans mening. Den vet inte om «Företag» avser hosting
//   eller e-post, och den kan inte avgöra om en tabell är relevant för kategorin — den bär bara
//   fram kontexten så att en människa kan avgöra det. Relevans är en bedömning, inte en parsning.

/** Ett SEK-belopp i löpande text. Tusentalsavgränsare kan vara mellanslag eller hårt mellanslag. */
export const PRIS_RE = /(\d{1,3}(?:[  ]?\d{3})*(?:[.,]\d{1,2})?)\s*kr/i;

/** Bär cellen/raden ett pris alls? */
export const harPris = (text) => PRIS_RE.test(String(text ?? ''));

/**
 * Listpriset ur en cell som kan bära både kampanj och ordinarie.
 *
 * «39 kr första året därefter 279 kr» → 279. Regeln är leverantörens egen: ett erbjudande kan
 * bara vara LÄGRE än ordinarie, så när en cell bär flera tal och ett kampanjord är det HÖGSTA
 * talet listpriset. Samma sats som prisboken redan använder för HubSpot (bibeln, 2026-08-06).
 *
 * @returns {{ listpris: number|null, kampanjpris: number|null, kampanj: boolean }}
 */
export function listprisUrCell(text) {
  const t = String(text ?? '');
  const tal = [...t.matchAll(/(\d{1,3}(?:[  ]?\d{3})*(?:[.,]\d{1,2})?)\s*kr/gi)]
    .map((m) => Number(m[1].replace(/[  ]/g, '').replace(',', '.')))
    .filter((n) => Number.isFinite(n));
  if (tal.length === 0) return { listpris: null, kampanjpris: null, kampanj: false };

  const kampanj = /f[öo]rsta [åa]ret|1:a [åa]ret|d[äa]refter|ordinarie|introduktion|kampanj|f[öo]rnyelse/i.test(t);
  if (!kampanj || tal.length === 1) return { listpris: tal[0], kampanjpris: null, kampanj };

  const hogsta = Math.max(...tal);
  const lagsta = Math.min(...tal);
  return { listpris: hogsta, kampanjpris: lagsta, kampanj: true };
}

/**
 * Par ur en tabell. Paketnamnen är kolumnrubriker; priset står i samma kolumnindex.
 *
 * @param {string[]} rubriker  första radens celler
 * @param {string[][]} rader   övriga raders celler
 * @param {string} kontext     tabellens närmaste rubrik — bärs fram, tolkas aldrig
 */
export function parFranTabell(rubriker = [], rader = [], kontext = '') {
  const ut = [];
  for (const celler of rader) {
    const etikett = celler[0] ?? '';
    for (let i = 1; i < celler.length; i += 1) {
      if (!harPris(celler[i])) continue;
      const namn = String(rubriker[i] ?? '').trim();
      if (!namn) continue;                      // ett pris utan kolumnrubrik är ett tal utan produkt
      const { listpris, kampanjpris, kampanj } = listprisUrCell(celler[i]);
      ut.push({ form: 'tabell', kontext, paket: namn, rad: etikett, listpris, kampanjpris, kampanj, ratext: celler[i] });
    }
  }
  return ut;
}

/**
 * Par ur ett kort. Namnet är blockets första rad UTAN pris; priset är första raden MED.
 * @param {string[]} textrader  blockets rader, i ordning
 */
export function parFranKort(textrader = [], kontext = '') {
  const rader = textrader.map((r) => String(r ?? '').trim()).filter(Boolean);
  const namn = rader.find((r) => !harPris(r) && r.length >= 3 && r.length <= 48);
  const prisrad = rader.find((r) => harPris(r));
  if (!namn || !prisrad) return null;
  const { listpris, kampanjpris, kampanj } = listprisUrCell(prisrad);
  return { form: 'kort', kontext, paket: namn, rad: '', listpris, kampanjpris, kampanj, ratext: prisrad };
}

/**
 * Skillnaden mellan två avläsningar av samma produkt = en prisändring med datum.
 *
 * TVÅ SPÄRRAR, båda lastbärande:
 *   · Ett SAKNAT pris är aldrig en ändring. Att en ögonblicksbild inte bär produkten kan betyda
 *     att arkivet missade den delen av sidan. Bara två LÄSTA tal som skiljer sig är ett bevis.
 *   · Ingen interpolation. Ett pris mellan två mätpunkter är uppfunnet, inte avläst.
 *
 * @param {Array<{datum: string, par: Array}>} avlasningar  i kronologisk ordning
 * @returns {Array<{paket, fran, till, franPris, tillPris, procent}>}
 */
export function prisandringar(avlasningar = []) {
  // ⚠️ PRODUKTENS IDENTITET ÄR paket + rad, ALDRIG paket ENSAMT.
  //
  // Första versionen grupperade på `paket`. Mot Fortnox arkiverade fakturaservice-tabell — där
  // kolumnrubriken är KOSTNADSTYP («Kostnad för fakturamottagare») och radetiketten är PRODUKTEN
  // («Fakturaservice postal faktura») — samlade den varje rads pris i EN serie, och rapporterade
  // skillnaderna MELLAN RADER som prishöjningar över tid:
  //
  //     ↑ Kostnad för fakturautställare: 2 → 90 kr (+4400 %) · 2022-03-15 → 2022-03-15
  //
  // Samma datum på båda sidor. 151 «prisändringar» av vilka nästan alla var brus. Hade det matat
  // Maktkalendern hade vi sagt till kunden att Fortnox höjt 4 400 % — ur två rader i samma tabell.
  // Det är «aggregat utan sina fall» (22 aug) i sin dyraste form: talet såg ut som en triumf.
  //
  // Nyckeln är samma sammansatta nyckel som dedupen redan använde. Och en serie får bara jämföra
  // punkter från OLIKA datum — två avläsningar samma dag är samma mätpunkt, aldrig en förändring.
  const serie = new Map();
  for (const { datum, par } of avlasningar) {
    for (const p of par ?? []) {
      if (!Number.isFinite(p?.listpris)) continue;
      const nyckel = `${p.paket}|${p.rad ?? ''}`;
      if (!serie.has(nyckel)) serie.set(nyckel, { paket: p.paket, rad: p.rad ?? '', punkter: [] });
      serie.get(nyckel).punkter.push({ datum, pris: p.listpris });
    }
  }
  const ut = [];
  for (const { paket, rad, punkter } of serie.values()) {
    for (let i = 1; i < punkter.length; i += 1) {
      const a = punkter[i - 1];
      const b = punkter[i];
      if (a.datum === b.datum) continue;          // samma ögonblicksbild = samma mätpunkt
      if (a.pris === b.pris) continue;
      // Ett nollpris är ingen bas att räkna procent på — «+Infinity %» är inget mätvärde.
      const procent = a.pris > 0 ? Math.round(((b.pris - a.pris) / a.pris) * 1000) / 10 : null;
      ut.push({ paket, rad, fran: a.datum, till: b.datum, franPris: a.pris, tillPris: b.pris, procent });
    }
  }
  return ut;
}
