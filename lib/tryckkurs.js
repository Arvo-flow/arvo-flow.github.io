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

// ── OCH TVÅ KURSER PÅ PAPPRET ÄR INGEN KURS (2026-09-10, fientlig granskning av a6f776b) ────
// Första versionen tog FÖRSTA träffen i textflödet och frågade aldrig om det fanns en andra.
// Granskaren körde den riktiga kedjan med två kurser på samma papper:
//   «Aprilperioden växlades till 9,10 SEK/USD. Majperioden: växlingskurs 10,42 SEK/USD …»
//   läst kurs 9,10 → Ring 1: «ok · skillnaden är momsen» — på en USD-faktura med reverse charge
//   som inte HAR någon moms.
// Det är ordagrant det hål modulen skrevs för att stänga, återöppnat en rad ovanför fixen. Och
// det är felfamiljen i renaste form: «pappret säger två saker» representerat med ett fullt
// giltigt tal. Två kurser som inte är samma tal är ett OKÄNT, och okänt betyder ingen läsning.
//
// Två syskonfall ur samma granskning, båda mätta:
//   «110,42 SEK/USD» → 10,42   (`\d{1,2}` plockade två siffror ur tre; bandet kringgicks genom
//                               att LÄGGA TILL en siffra)
//   «Belopp SEK/USD 15,00» → 15 som växelkurs  (mönstren krävde valutaparet men aldrig ett
//                               KURSORD, så en beloppskolumn med parvis rubrik lästes som kurs)
// ⚠️ OCH MITT FÖRSTA SVAR PÅ DEN TRESIFFRIGA KURSEN VAR EN DÖD VAKT. Jag satte `(?<!\d)` framför
// varje mönster — och sabotaget «riv lookbehinden» fällde NOLL test. Skälet: kursordsfönstret
// slutar omedelbart före talet, så om en siffra står där kan fönstret aldrig sluta med ett
// kursord. `(?<!\d)` var alltså strukturellt onåbart bakom KURSORD, och en vakt vars sabotage
// inte fäller är ingen vakt. Den är borttagen; KURSORD bär skyddet ensamt, och att den GÖR det är
// mätt: med lookbehinden borta fäller sabotaget «ta bort kursordskravet» två test i stället för ett.
//
// Kursordskravet är gratis på verkligheten, och det är mätt, inte antaget: alla tre träffar i
// de 75 fakturorna bär ordet — «kurs 10,42 SEK/USD», «växlingskurs 10,42 SEK/USD», «kurs 10,40
// SEK/USD». Strängheten kostar noll fakturor och stänger en påhittad kurs.

/** Rimliga band per valutapar. Utanför dem är talet inte en växelkurs, vad det än står bredvid. */
const BAND = { USD: [5, 20], EUR: [8, 16] };

/** Ett tal är en kurs först när pappret SÄGER att det är en kurs. Fönstret före träffen. */
const KURSORD = /(?:väx(?:el|lings)kurs|omräkningskurs|valutakurs|kurs|exchange\s+rate|fx[\s-]?rate)\s*[:=]?\s*$/i;
const KURSORD_FONSTER = 28;

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
    new RegExp(`(\\d{1,2}[.,]\\d{1,4})\\s*SEK\\s*(?:\\/|per\\s+)${v}\\b`, 'gi'),
    new RegExp(`\\b${v}\\s*(?:\\/|→|till\\s+)\\s*SEK[^\\d]{0,12}(\\d{1,2}[.,]\\d{1,4})`, 'gi'),
    new RegExp(`\\bSEK\\s*(?:\\/|per\\s+)${v}[^\\d]{0,12}(\\d{1,2}[.,]\\d{1,4})`, 'gi'),
  ];

  // ALLA träffar samlas — aldrig den första. En läsare som slutar leta så snart den hittat något
  // kan per konstruktion inte upptäcka att pappret säger emot sig självt.
  const fynd = [];
  for (const re of monster) {
    for (const m of flode.matchAll(re)) {
      const kurs = Number(String(m[1]).replace(',', '.'));
      if (!Number.isFinite(kurs) || kurs < band[0] || kurs > band[1]) continue;
      const i = m.index;
      // Kursordet måste stå strax FÖRE uttrycket. Utan det är «SEK/USD» bara en rubrik.
      if (!KURSORD.test(flode.slice(Math.max(0, i - KURSORD_FONSTER), i))) continue;
      // Citatet följer med så att en människa kan kontrollera avläsningen mot pappret — ett tal
      // utan sin källrad är precis den sortens påstående vi inte tillåter någon annanstans.
      fynd.push({ kurs, rad: flode.slice(Math.max(0, i - 40), i + m[0].length + 20).trim() });
    }
  }
  if (fynd.length === 0) return null;

  const skilda = [...new Set(fynd.map((f) => f.kurs))];
  if (skilda.length > 1) {
    // Tystnaden bär sitt skäl. Att välja en av två motstridiga kurser vore att gissa vilken
    // period leverantören räknade totalen med — och gissningen syns aldrig i utfallet.
    console.log(`[tryckkurs] pappret trycker ${skilda.length} olika kurser (${skilda.join(', ')}) — ingen läsning`);
    return null;
  }
  return fynd[0];
}
