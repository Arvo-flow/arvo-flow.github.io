// lib/shelfware.js — shelfware som RÅDGIVANDE REVISOR, inte anklagelse.
//
// Briljansen (som bredbandet): ett flatt "marknadspris" missar den verkliga heterogeniteten.
// För mjukvara är den heterogeniteten UTNYTTJANDEGRADEN — man betalar per plats men använder
// inte alla. MEN: gapet seatCount − employees är INTE garanterat svinn. Riktiga bolag lägger
// överskottslicenser på inhyrda konsulter, mötesrum och servicekonton. Flaggar vi gapet rakt
// av som "svinn" tappar vi trovärdigheten (regel 4: precision eller tystnad).
//
// Därför två lägen:
//   1. unverifiedGap (seatCount − employees) — ett FAKTUM, inte ett påstående om svinn.
//   2. Har kunden ännu inte redovisat undantag → vi RÄKNAR INGEN besparing. Vi ställer en
//      revisorsfråga (reviewPrompt) och driver dialogen. Ingen siffra utan källa.
//   3. Har kunden redovisat knownExceptions → confirmedIdle = unverifiedGap − knownExceptions,
//      och FÖRST då räknas svinnet — på kundens EGNA pris/plats (ur fakturan), verifierbart.
//
// Zero Trust: vi gissar aldrig att en betald plats är oanvänd. Vi visar gapet, frågar, och
// räknar bara det kunden själv bekräftat.

const DEFAULT_FLOOR = 500; // under 500 kr/år är varken värt en åtgärd eller en fråga

/**
 * @param {object} p
 * @param {number}      p.seatCount            - betalda platser (ur fakturan)
 * @param {number}      p.pricePerSeatMonthly  - kundens faktiska pris per plats/mån (ur fakturan)
 * @param {number}      p.employees            - antal anställda
 * @param {number|null} [p.knownExceptions]    - platser kunden redovisat som legitima
 *                                               (mötesrum/konsulter/servicekonton). null = ej tillfrågad.
 * @param {number}      [p.floor]              - lägsta meningsfulla årsbelopp
 * @returns {{paidSeats,employees,perSeatMonthly,unverifiedGap,knownExceptions,confirmedIdle,
 *            annualWaste,potentialAnnualWaste,needsReview,reviewPrompt,tierMismatch,note}|null}
 */
export function computeShelfware({ seatCount, pricePerSeatMonthly, employees, knownExceptions = null, floor = DEFAULT_FLOOR }) {
  if (seatCount == null || pricePerSeatMonthly == null || employees == null) return null;
  if (!(seatCount > 0) || !(pricePerSeatMonthly > 0) || !(employees >= 0)) return null;

  const perSeatMonthly = pricePerSeatMonthly;
  const unverifiedGap = Math.max(0, seatCount - employees);
  if (unverifiedGap <= 0) return null;

  // Taket: om HELA gapet vore svinn. En övre gräns för dialogen — aldrig ett påstående.
  const potentialAnnualWaste = Math.round(unverifiedGap * perSeatMonthly * 12);
  // Inte ens värt att fråga om taket understiger golvet.
  if (potentialAnnualWaste < floor) return null;

  const exceptionsKnown = knownExceptions != null;

  // ── Review-läge: kunden har inte redovisat undantag ännu ──────────────────────
  // Vi räknar INGEN besparing. Vi ställer revisorsfrågan och driver dialogen.
  if (!exceptionsKnown) {
    return {
      paidSeats: seatCount,
      employees,
      perSeatMonthly,
      unverifiedGap,
      knownExceptions: null,
      confirmedIdle: 0,
      annualWaste: null,            // ingen siffra förrän kunden bekräftat (regel 4)
      potentialAnnualWaste,         // tak, alltid märkt som potential i UI
      needsReview: true,
      reviewPrompt: `Vi noterar att ni har ${employees} anställda men betalar för ${seatCount} licenser. Används de överskjutande ${unverifiedGap} licenserna till andra ändamål (mötesrum, inhyrd personal, servicekonton), eller kan vi klassificera dem som outnyttjat svinn?`,
      tierMismatch: null,           // hook: sätts när per-tier-data finns (premiumlicens på mötesrum)
      note: `${seatCount} betalda licenser mot ${employees} anställda → ${unverifiedGap} licenser att förklara. Ingen besparing räknas förrän ni bekräftat hur de används (rådgivande revisor, inte anklagelse).`,
    };
  }

  // ── Bekräftat-läge: undantag redovisade ──────────────────────────────────────
  const exceptions = Math.min(Math.max(0, knownExceptions), unverifiedGap); // kan aldrig överstiga gapet
  const confirmedIdle = unverifiedGap - exceptions;
  if (confirmedIdle <= 0) return null; // allt förklarat → inget svinn att visa

  const annualWaste = Math.round(confirmedIdle * perSeatMonthly * 12);
  if (annualWaste < floor) return null; // bekräftat svinn för litet för en åtgärd

  return {
    paidSeats: seatCount,
    employees,
    perSeatMonthly,
    unverifiedGap,
    knownExceptions: exceptions,
    confirmedIdle,
    annualWaste,
    potentialAnnualWaste,
    needsReview: false,
    reviewPrompt: null,
    tierMismatch: null,
    note: `${confirmedIdle} bekräftat oanvända platser (${unverifiedGap} över anställda − ${exceptions} redovisade undantag) × ${perSeatMonthly} kr/plats/mån × 12 = ${annualWaste} kr/år i verifierat svinn.`,
  };
}
