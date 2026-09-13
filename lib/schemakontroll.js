// lib/schemakontroll.js — «KLAR» FÅR INTE BETYDA «JAG TITTADE INTE».
//
// ══ VARFÖR (2026-09-13) ═════════════════════════════════════════════════════════════════════
// Migreringen kunde bara rapportera att SATSERNA kördes utan att kasta. Det är inte samma sak som
// att kolumnerna finns: en körning mot fel databas, mot en replika, eller en som avbröts efter
// fas 2, lämnar ett grönt utfall och ett schema som saknar det rummet läser. Bibelns mest
// upprepade felfamilj — ett resultat som betyder «jag mätte inte», återgivet som en mätning.
//
// Den nådde kund 15 augusti (LK-01): `invoice_number` låg i SELECT-satsen men fanns inte i
// produktionen, varje rumsläsning föll till sin reserv, och varje leverantör visade Arvo Score 75.
// Ett halvt svar med full auktoritet, omöjligt att skilja från «kunden har inga bra avtal».
//
// ── VARFÖR DEN BOR HÄR OCH INTE I migrate.mjs ───────────────────────────────────────────────
// Första versionen låg inline i skriptet. Då hade den ingen svit som kunde pröva den, och mina
// två «sabotage» fällde NOLL tester — de fällde skriptet. Commit-kravet stoppade den, och hade
// rätt: en kontroll som ingen svit kan köra är en kontroll vars gröna ingen kan lita på.
// Logiken är därför en REN funktion; `scripts/migrate.mjs` matar den med databasens svar.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en kolumn som rumsläsningarna läser men som inte finns i den databas migreringen just
//     körde mot — oavsett varför den saknas. Och en KRYMPT kravlista, som annars hade gjort
//     kontrollen grön genom att fråga mindre.
//   BLIND: den ser NAMN, aldrig typ. En kolumn som finns med fel typ passerar. Den vet heller
//     ingenting om andra tabeller än den den matas om, och ingenting om index — indexet
//     `idx_analyses_aktiva` rapporteras av anroparen men fäller inte, eftersom det är prestanda
//     och inte sanning. En vakt som blandar de två lär läsaren att ignorera den.

/** Mätt 2026-09-13: `VALFRIA_KOLUMNER` i lib/invoice-store.js bar 8 poster. Ett tal, ingen tröskel. */
export const KRAVLISTANS_GOLV = 8;

/**
 * Räcker schemat för de kolumner rumsläsningarna rör?
 *
 * @param {string[]} kravda   kolumner läsvägarna faktiskt läser (härled dem, skriv dem aldrig av)
 * @param {string[]} faktiska kolumnnamnen databasen svarade med
 * @returns {{ok: boolean, kod: string, saknade: string[], skal: string}}
 */
export function schemaRacker(kravda, faktiska) {
  // Ett krav som inte är en lista är inget krav — och `[]` är sant i JS, alltså måste tomheten
  // fällas uttryckligen. Samma rad som prissättningsdomens «ett tomt facit är inte ett facit».
  if (!Array.isArray(kravda) || !Array.isArray(faktiska)) {
    return { ok: false, kod: 'ogiltig_indata', saknade: [], skal: 'kravlistan eller databassvaret är inte en lista — kontrollen kördes aldrig' };
  }
  if (kravda.length < KRAVLISTANS_GOLV) {
    return {
      ok: false,
      kod: 'krympt_kravlista',
      saknade: [],
      skal: `kravlistan bär ${kravda.length} poster, mätt: ${KRAVLISTANS_GOLV} — en krympt lista gör kontrollen grön genom att fråga mindre, inte genom att allt finns`,
    };
  }
  // Ett tomt databassvar betyder att FRÅGAN inte kom fram — `invoice_analyses` skapas tjugo rader
  // upp i samma skript, så noll kolumner kan inte vara ett sanningsenligt svar. Att läsa det som
  // «inga kolumner» vore att rapportera ett larm om något annat än det som hände. SK2-05.
  if (faktiska.length === 0) {
    return { ok: false, kod: 'tomt_svar', saknade: [], skal: 'databasen svarade med noll kolumner — frågan kom inte fram, detta är INTE ett mätvärde' };
  }
  const finns = new Set(faktiska);
  const saknade = kravda.filter((namn) => !finns.has(namn));
  if (saknade.length) {
    return { ok: false, kod: 'saknad_kolumn', saknade, skal: `${saknade.length} kolumn(er) som rummet LÄSER saknas i databasen` };
  }
  return { ok: true, kod: 'racker', saknade: [], skal: `alla ${kravda.length} kolumner finns` };
}
