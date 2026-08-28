// lib/larmunderlag.js — får Haikus svar bli ett kr/år-tal i kundens inkorg?
//
// ══ VARFÖR (2026-08-24, Fable 5:s spaning H2 — sju bevisade grenar) ═════════════════════════
//
// Allt Haiku svarade gick ORÖRT in i en kundsynlig kr/år-siffra. Varje tillstånd som betyder
// «modellen kunde inte mäta» blev ett giltigt tal i stället för tystnad. Mätt genom den riktiga
// notify-vägen med stubbad db/resend:
//
//   A) haiku saknas HELT          → mail «Arvo har noterat en prisändring hos Tele2»
//                                    (`undefined !== 'false_positive'` ⇒ filtret släpper igenom
//                                     «AI:n svarade inte» som «AI:n bekräftade en ändring»)
//   B) verify_manually, conf 0,10 → mail «+24 000 kr/år — Arvo har detekterat en prishöjning»
//   C) extractedUnit='per_month'  → «+1 578 720 kr/år»  (3 588 kr/ÅR läst som kr/mån)
//   D) extractedUnit saknas       → samma, via `?? currentUnit`
//   E) extractedCurrency='usd'    → «Tele2 SÄNKTE priset — 66 384 kr/år»  ← TECKNET VÄNT
//                                    (facit med 'USD': +15 005 kr/år, en HÖJNING)
//   F) extractedNumeric=''        → «Tele2 sänkte priset — 143 520 kr/år»
//   G) extractedUnit='percentage' → 1,95 % behandlat som 1,95 kr/säte/mån
//
// ══ DEN BÄRANDE PRINCIPEN ═══════════════════════════════════════════════════════════════════
//
// **Kundmailet får ALDRIG ställa lägre beviskrav än prisboken.** I dag är det bakvänt:
// verifieringsjuryn (lib/price-verdict.js — konfidens ≥ 0,85, stabilitet över ≥2 nätter,
// konsensus) gatar vad vi skriver till vår EGEN databas, medan kundmailet konsumerade Haikus
// råa JSON ogranskat. Vi ställde alltså hårdare krav på vad vi lagrar internt än på vad vi
// PÅSTÅR FÖR KUNDEN — bakvänt mot regel 3 och mot juryns egen asymmetri-motivering.
//
// Tre nivåer, aldrig två:
//   avvisad     — Haiku säger själv false_positive. Inget mail (oförändrat beteende).
//   verifierad  — samtliga sju krav uppfyllda. Mail med kr/år-tal.
//   obekraftad  — allt annat. INGET kundutskick; skälet loggas och räknas.
//
// Varför obekräftad tiger helt: mailet är vår mest proaktiva yta och det första en ny kund ser
// av att «vakten är vaken». Juryn bekräftar ändå inom 1–2 nätter via verify-vägen, så en dags
// fördröjning kostar ingenting — medan ett påhittat tal kostar förtroendet permanent. Hellre
// «(saknas)» än fel SKU (Copilot-fällans regel).
//
// FÅNGAR: varje väg där ett omätt eller motsägelsefullt AI-svar blir ett kundsynligt kronbelopp.
// BLIND: modulen dömer SVARETS FORM, aldrig om Haiku läste rätt ruta på sidan. Ett komplett,
//   konfident och internt konsistent svar som ändå avser fel produkt passerar här — det är
//   gSource/gConsensus i juryn som äger den frågan, och den grinden sitter på verify-vägen.

import { LARMTROSKLAR } from './price-verdict.js';

/** Enheter `toKrPerSeatMonth` faktiskt kan räkna om. `percentage` står i Haikus egen enum men
 *  har ingen case — den blev kronor (fall G). Listan speglar switchen; en enhet utanför den
 *  är ODÖMBAR, aldrig «anta kr/säte/mån». */
export const RAKNBARA_ENHETER = Object.freeze([
  'per_seat_month', 'per_seat_year', 'per_company_month', 'per_company_year', 'flat_month',
]);

const VALUTOR = Object.freeze(['SEK', 'USD', 'EUR']);

/** Normaliserar en valutakod. `'usd'` ≠ `'USD'` VÄNDE tecknet på hela påståendet (fall E):
 *  samma faktiska höjning rapporterades som en sänkning på 66 384 kr, eftersom
 *  `if (currency === 'USD')` är skiftlägeskänslig och ingen normaliserade. */
export const normaliseraValuta = (v) =>
  (typeof v === 'string' ? v.trim().toUpperCase() : null);

/**
 * @param {object|null|undefined} haiku      rått svar från price-monitorns Haiku-anrop
 * @param {{ oldKrPerSeatMonth?: number|null, newKrPerSeatMonth?: number|null }} [omraknat]
 *   De FÄRDIGT omräknade priserna, när de finns. Används enbart för krav 7 (teckenkontrollen);
 *   saknas de hoppas den kontrollen över — den kan inte utföras, och en outförd kontroll får
 *   aldrig bokföras som godkänd.
 * @returns {{ niva: 'avvisad'|'verifierad'|'obekraftad', skal: string|null }}
 */
export function bedomLarmunderlag(haiku, omraknat = {}) {
  const nej = (skal) => ({ niva: 'obekraftad', skal });

  // KRAV 1 — svaret finns. Fall A: filtret `a.haiku?.actionRequired !== 'false_positive'` är
  // SANT för `undefined`, så «modellen svarade inte» var omöjlig att skilja från «modellen
  // bekräftade». Felfamiljen på pipelinenivå.
  if (!haiku || typeof haiku !== 'object') return nej('haiku_saknas');

  if (haiku.actionRequired === 'false_positive') return { niva: 'avvisad', skal: 'false_positive' };

  // KRAV 2 — bara det uttryckliga larm-värdet larmar. `verify_manually` betyder ordagrant
  // «oklar situation, manuell koll krävs» och blev ändå «Arvo har detekterat en prishöjning».
  if (haiku.actionRequired !== 'update') return nej(`action_${haiku.actionRequired ?? 'saknas'}`);

  // KRAV 3 — samma konfidensgolv som juryn. IMPORTERAD, aldrig kopierad: en kopia kan glida
  // isär från originalet, och då ställer kundytan tyst lägre krav än prisboken igen (regel 1).
  const konf = Number(haiku.confidence);
  if (!Number.isFinite(konf) || konf < LARMTROSKLAR.minConfidence) {
    return nej(`konfidens_${Number.isFinite(konf) ? konf : 'saknas'}_under_${LARMTROSKLAR.minConfidence}`);
  }

  // KRAV 4 — talet är ett tal. Fall F: tom sträng blev ett kronbelopp.
  const tal = Number(haiku.extractedNumeric);
  if (haiku.extractedNumeric === '' || haiku.extractedNumeric == null || !Number.isFinite(tal) || tal <= 0) {
    return nej('numeric_obrukbart');
  }

  // KRAV 5 — enheten går att räkna om. Fall C/D/G.
  if (!RAKNBARA_ENHETER.includes(haiku.extractedUnit)) {
    return nej(`enhet_${haiku.extractedUnit ?? 'saknas'}_oraknbar`);
  }

  // KRAV 6 — valutan är känd efter normalisering. Fall E.
  const valuta = normaliseraValuta(haiku.extractedCurrency);
  if (valuta == null || !VALUTOR.includes(valuta)) {
    return nej(`valuta_${haiku.extractedCurrency ?? 'saknas'}_okand`);
  }

  // KRAV 7 — TECKNET HÄRLEDS UR TALEN, ALDRIG UR TEXTEN. Säger Haikus riktningsord en sak och
  // de omräknade priserna en annan är svaret internt motsägelsefullt, och en motsägelse är ett
  // OKÄNT — inte ett val mellan två påståenden.
  const g = Number(omraknat.oldKrPerSeatMonth);
  const n = Number(omraknat.newKrPerSeatMonth);
  if (Number.isFinite(g) && Number.isFinite(n) && g !== n) {
    const talenSagerHojning = n > g;
    const text = `${haiku.reasoning ?? ''} ${haiku.summary ?? ''}`.toLowerCase();
    const textSagerSankning = /sänk|sankt|lägre|lagre|rabatt|reducer/.test(text);
    const textSagerHojning  = /höj|hojd|ökar|okar|dyrare|uppjuster/.test(text);
    if (talenSagerHojning && textSagerSankning && !textSagerHojning) return nej('tecken_motsagelse');
    if (!talenSagerHojning && textSagerHojning && !textSagerSankning) return nej('tecken_motsagelse');
  }

  return { niva: 'verifierad', skal: null };
}
