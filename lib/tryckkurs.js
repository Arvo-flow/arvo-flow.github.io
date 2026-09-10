// lib/tryckkurs.js — läser den växelkurs FAKTURAN SJÄLV trycker, aldrig vår.
//
// ══ VARFÖR (2026-09-10, Fable 5.1:s spricka 1 — mätt och skärpt) ═══════════════════════════
// Ring 1 dömer sedan 9 sep i fakturans egna enheter, och prövar två läsningar av totalen: talet
// som det står, eller talet som ett SEK-motvärde tillbakaräknat med `totalen / vår kurs`.
//
// Oraklet såg felet: **8 128 kr räknades fram av Microsoft med DERAS kurs, och vi dividerar med
// VÅR.** Att de stämde berodde på att testfixturen författades med samma konstant som kodens
// fallback — 10,42. Det är ingen verifiering, det är en tautologi mellan fixtur och fallback.
//
// MÄTT ÖVER KURSBANDET (scripts/probe-tryckkurs.mjs, samma faktura, kursen varierad):
//
//   kurs   alternativTotal   avvikelse   tolerans   Ring 1:s dom
//   9,50        855,6          75,6        50,0     ok  ← «skillnaden är momsen»
//   9,70        837,9          57,9        50,0     ok  ← «skillnaden är momsen»
//   10,42       780,0           0,0        50,0     ok  (motvärdet, exakt)
//   11,13       730,3          49,7        50,0     ok  (motvärdet, nätt och jämnt)
//   11,20       725,7          54,3        50,0     stopp
//
// Felläget är det MOTSATTA mot vad oraklet förutsåg, och värre: fakturan fälls inte, den FRIAS
// med ett påhittat skäl. En valutadrift på 3–9 % tvättas som moms av tre-satsprovningen —
// exakt det fönster obduktionen dömde ut 20 augusti («ett fönster där en saknad rad på 3–9 % av
// fakturan godkänns»). Där gällde det en saknad rad; här en kurs. Samma grind, samma hål.
//
// ── LÖSNINGEN: TVÅ OKÄNDA OCH EN EKVATION BLIR EN OKÄND ────────────────────────────────────
// Vi har radsumman (i fakturans valuta, trovärdig) och en total vars ENHET är okänd. För att
// pröva SEK-hypotesen krävs en kurs. Med VÅR kurs blir provet approximativt och toleransen får
// absorbera skillnaden mellan två olika kurser. Med PAPPRETS kurs blir det exakt — samma tal
// tillbaka, oavsett vad marknaden gjort sedan dess.
//
// Och trycker fakturan ingen kurs är SEK-hypotesen inte prövbar. Då finns den läsningen inte.
// Det är fail-closed åt rätt håll (TK-05): hellre en faktura i granskningskön med ett ärligt skäl än ett
// «radsumman stämmer» som vilar på vår egen dagskurs.
//
// ── STRÄNGHETEN ÄR HELA POÄNGEN ────────────────────────────────────────────────────────────
// Ett tal nära ordet «kurs» är ingen kurs. Läsaren kräver att pappret NAMNGER VALUTAPARET i
// samma mening — «10,42 SEK/USD», «kurs USD/SEK 10,42», «växlingskurs 10,42 SEK per USD». Ett
// löst tal, ett annat valutapar, eller ett tal utanför bandet ger `null`, och `null` betyder
// «fakturan trycker ingen läsbar kurs» — aldrig «kursen är 1».

/** Rimliga band per valutapar. Utanför dem är talet inte en växelkurs, vad det än står bredvid. */
const BAND = { USD: [5, 20], EUR: [8, 16] };

/**
 * Läser fakturans egen växelkurs mot SEK ur textlagret.
 *
 * @param {string|null} text  hela textlagret (lib/pdf-textlager.js)
 * @param {string|null} valuta  fakturans valuta, 'USD' eller 'EUR'
 * @returns {{kurs:number, rad:string}|null}  null = ingen läsbar kurs (ALDRIG ett defaultvärde)
 */
export function lasTryckKurs(text, valuta) {
  if (typeof text !== 'string' || !text) return null;
  const v = String(valuta ?? '').toUpperCase();
  const band = BAND[v];
  if (!band) return null;

  // Radbrytningar är godtyckliga i ett textlager (pdfjs lägger varje fragment på egen rad), så
  // vi normaliserar till ett flöde. Rader återskapas för att kunna citera fyndet.
  const flode = text.replace(/\s+/g, ' ');

  // Två former, båda kräver att BÅDA valutorna namnges i samma uttryck:
  //   A) «10,42 SEK/USD»  ·  «10,42 SEK per USD»  ·  «10,42 SEK/USD»
  //   B) «USD/SEK 10,42»  ·  «kurs USD → SEK 10,42»
  const monster = [
    new RegExp(`(\\d{1,2}[.,]\\d{1,4})\\s*SEK\\s*(?:\\/|per\\s+)${v}\\b`, 'i'),
    new RegExp(`\\b${v}\\s*(?:\\/|→|till\\s+)\\s*SEK[^\\d]{0,12}(\\d{1,2}[.,]\\d{1,4})`, 'i'),
    new RegExp(`\\bSEK\\s*(?:\\/|per\\s+)${v}[^\\d]{0,12}(\\d{1,2}[.,]\\d{1,4})`, 'i'),
  ];

  for (const re of monster) {
    const m = flode.match(re);
    if (!m) continue;
    const kurs = Number(String(m[1]).replace(',', '.'));
    if (!Number.isFinite(kurs) || kurs < band[0] || kurs > band[1]) continue;
    // Citatet följer med så att en människa kan kontrollera avläsningen mot pappret — ett tal
    // utan sin källrad är precis den sortens påstående vi inte tillåter någon annanstans.
    const i = flode.indexOf(m[0]);
    return { kurs, rad: flode.slice(Math.max(0, i - 40), i + m[0].length + 20).trim() };
  }
  return null;
}
