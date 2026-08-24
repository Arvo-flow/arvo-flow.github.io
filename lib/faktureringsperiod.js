// lib/faktureringsperiod.js — EN sanning om hur många gånger per år en faktura återkommer.
//
// VARFÖR (2026-08-24, ur att integritetskontroll 5 "korrigerade" varje kvartals- och årsfaktura).
//
// Kontrollen jämförde kundens årskostnad mot `recurringAmount × multiplikator`, där
// multiplikatorn kom ur `monthsBetween(extracted.billingPeriod) ?? 1`. Två fel i en rad:
//
//   1. `monthsBetween` splittar på /[-–]/ och kräver TVÅ delar. Ett ISO-intervall
//      «2026-05-01 - 2026-05-31» ger SEX delar. Formatet modulens egen MONTHLY_PERIOD_RE
//      deklarerar kunde alltså aldrig parsas.
//   2. Produktionen skickar inte ens ett intervall dit. `billingPeriod` är efter aggregeringen
//      ett ENUM ('monthly' | 'quarterly' | 'annual' | 'one_time' | 'unknown').
//
//   → `monthsBetween` returnerade null för VARJE möjlig indata, `?? 1` gjorde tystnaden till
//     månadsvis, och `12 / 1 = 12` blev ett påstående. Mätt genom produktionskedjan:
//
//        kvartalsfaktura 30 000 kr  årskostnad 120 000 → "korrigerad" till   360 000  (×3 fel)
//        årsfaktura     144 000 kr  årskostnad 144 000 → "korrigerad" till 1 728 000  (×12 fel)
//
// Kundens tal ändras INTE (`result` skrivs aldrig med värdet, severity är 'info'), och det ska
// sägas som det är. Men varje sådan rad går till `saveIntegrityOverrides` → `labeled_corrections`,
// vars filhuvud säger «systemet analyserar mönster i korrektionerna och deriverar automatiskt
// regler», och `getPatterns()` aggregerar just field + reason. Flywheeln lär sig alltså ett mönster
// ur en bugg som inte finns — en falsk korrektion på varje kvartals- och årsfaktura vi någonsin
// analyserat. Det är obduktionens felfamilj i sin renaste form: `?? 1` lånar ett fullt giltigt
// värde åt ett tillstånd som betyder «jag kunde inte mäta».
//
// Samma tabell fanns dessutom i TRE kopior (extract.js, recommend.js som PRINT_PERIOD_MULTIPLIER,
// lib/fakturarader.js) — precis det regel 1 förbjuder. Här är den en gång.
//
// FÅNGAR: att en konsument multiplicerar upp en periodkostnad till år med en gissad faktor.
// BLIND: modulen vet vad ENUMET säger, aldrig om enumet är rätt avläst ur fakturan. Att perioden
//   är rätt bestämd är aggregeringens ansvar (`billingPeriodSource` / `billingPeriodAssumed`), och
//   ett felläst 'monthly' på en årsfaktura ser härifrån ut precis som ett riktigt.

/** Antal gånger per år perioden återkommer. `one_time` är 0 — den återkommer inte. */
const PERIODER_PER_AR = Object.freeze({
  monthly: 12,
  quarterly: 4,
  annual: 1,
  one_time: 0,
});

/**
 * @param {string|null|undefined} period  enumet ur aggregeringen
 * @returns {number|null}  antal perioder per år, eller null när perioden inte är bestämd.
 *   `null` betyder «jag vet inte» och får ALDRIG ersättas med ett tal av en konsument som
 *   sedan påstår något. Konsumenter som behöver ett tal för att alls kunna räkna måste välja
 *   sitt default UTTRYCKLIGEN och märka antagandet — aldrig via `?? 12` i ett uttryck.
 */
export function perioderPerAr(period) {
  const n = PERIODER_PER_AR[period];
  return Number.isFinite(n) ? n : null;
}

/** Tabellen, för konsumenter som redan bär sitt eget dokumenterade default (t.ex. aggregeringen). */
export const PERIODER_PER_AR_TABELL = PERIODER_PER_AR;
