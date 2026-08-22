// src/lib/diagnos.js — har analyssidan ett MÄTT jämförelsetal, eller bara frånvaron av ett?
//
// VARFÖR (2026-08-22, regel 8-genomgången av huvudfunneln). TestaFaktura räknade:
//
//     diagOvPct     = suggested > 0 && suggested < annual ? (annual - suggested)/annual : 0
//     diagScoreRaw  = clickScore ?? Math.max(5, 100 - diagOvPct * 1.5)
//     diagScore     = !shouldSwitch ? min(diagScoreRaw, 85) : ...
//
// Utan bytesmål blir `diagOvPct` 0, `diagScoreRaw` 100, och scoren landar på 85 — vilket ger
// texten «Ni har ett marknadsmässigt avtal — bättre än branschsnittet.»
//
// Men `suggested = 0` betyder inte att kunden betalar bra. Det betyder att VI inte kunde räkna
// fram ett mål. Det är exakt samma sats som fällde rummet i fyra ytor samma dag, här i
// huvudfunneln: **frånvaron av ett verifierat bytesmål säger ingenting om huruvida kunden betalar
// rätt.** Och det är ett påstående om vårt underlag som presenteras som ett omdöme om kundens pris.
//
// Mina egna fixar samma dag gjorde läget VANLIGARE, inte ovanligare: totalgrinden nollar
// bytesmålet när kohortdatan är en totalsumma, lfl-grinden när licensraderna inte bär ett bevisat
// pris, och finansgrinden när målet inte underskrider kundens kostnad. Alla tre är rätt — och
// alla tre matar den här grenen. En fix som gör ett gammalt redovisningsfel vanligare måste
// stänga det också.
//
// FÅNGAR: att ett score sätts, och ett positivt omdöme skrivs, på en faktura där inget
//   jämförelsetal kunde räknas fram.
// BLIND: säger bara OM ett mål finns, aldrig om målet är RÄTT. Att jämförelsen avser samma
//   produkt är licensnivåns och kraverBekraftadNiva:s ansvar; att källan är ett listpris är
//   jamforelsekalla.js.

// Påståendekontraktets register (src/lib/pastaendekontrakt.js). Analyssidan har två lägen och
// det omätta är det som gav score 85 och «bättre än branschsnittet» på fakturor vi aldrig kunde
// jämföra. Registret gör frågan explicit i stället för att bo i en boolean.
export const DIAGNOSLAGEN = {
  matt:  { positivtPastaende: true },
  omatt: { positivtPastaende: false, omatt: true },
};

/** Läget som en nyckel — samma form som rummets och månadsbrevets register. */
export function diagnosLage(p) {
  return diagnos(p).matt ? 'matt' : 'omatt';
}

/**
 * @param {{ annual: number, suggested: number|null, clickPriceScore: number|null,
 *           shouldSwitch: boolean, netSaving: number|null }} p
 * @returns {{ matt: boolean, score: number|null, ovPct: number, overMarketPct: number, skal: string|null }}
 */
export function diagnos({ annual, suggested, clickPriceScore, shouldSwitch, netSaving } = {}) {
  const a = Number(annual) || 0;
  const s = Number(suggested) || 0;

  // Klickanalysen (skrivarleasing) bär sitt EGET mätta score ur radernas klickpriser och behöver
  // inget bytesmål — den är mätt även när `suggested` saknas.
  if (clickPriceScore != null && Number.isFinite(Number(clickPriceScore))) {
    return { matt: true, score: Number(clickPriceScore), ovPct: 0, overMarketPct: 0, skal: null };
  }

  if (!(a > 0) || !(s > 0) || !(s < a)) {
    // Inget jämförelsetal. Vi vet vad kunden betalar — inte vad det borde vara.
    return {
      matt: false, score: null, ovPct: 0, overMarketPct: 0,
      skal: !(a > 0) ? 'årskostnaden kunde inte fastställas'
        : !(s > 0) ? 'inget verifierat jämförelsepris kunde räknas fram'
          : 'jämförelsepriset underskrider inte kundens kostnad',
    };
  }

  const ovPct = Math.round(((a - s) / a) * 100);
  const overMarketPct = Math.round(((a - s) / s) * 100);
  const raw = Math.max(5, Math.round(100 - ovPct * 1.5));
  const score = !shouldSwitch
    ? Math.min(raw, 85)
    : (Number(netSaving) || 0) > 0
      ? Math.min(raw, 79)   // cap vid 79 → "Förbättringsläge" när vi rekommenderar byte
      : raw;
  return { matt: true, score, ovPct, overMarketPct, skal: null };
}
