// src/lib/holdings.js — rummets PRESENTATION av räknarna (radarRader).
//
// ⚠️ TILLSTÅNDET FLYTTADE UT 2026-09-23 (Lägesregistret). Här bodde supplierDiagScore, computeActing,
// roomCounts, groupBySupplier, canonicalSupplier/supplierName och buildReasoning — rummet räknade sitt
// eget läge och gissade där underlaget saknades (mätt i systemöversynen). Läget räknas nu i
// lib/lagesregister.js i api-lagret och kommer färdigt i `data.rum` / `a.lage`; ordalydelsen per
// läge står i src/lib/rumstext.js. Kvar här: hur de FÄRDIGA räknarna ställs upp i radarn.

// ── RADARNS RADER ────────────────────────────────────────────────────────────────────────────
// ⚠️ MÄTT 2026-09-18, grundarens obduktionsorder. Radarn plockade TRE av räknarens FEM fält och
// utelämnade `mottagna` — det enda som får summan att gå ihop. Enumererat över 36 tillstånd
// (prissatta × mottagna × bevakade): ytan gick inte ihop i 16, varje gång med `mottagna > 0`,
// och det saknade beloppet var EXAKT `counts.mottagna` i samtliga. Det uteslöt avrundning och
// dubbelräkning: en post renderades aldrig.
//
// Datamodellen var frisk, aggregeringen var frisk. Felet satt i renderingen — och ironin är att
// raden ovanför bar 21-augustikommentaren om att «varje tal i en yta ska ha en enhet». Den
// lärdomen tillämpades på ETIKETTEN och aldrig på MÄNGDEN: när `mottagna` skildes ut ur
// `prissatta` fick den ett fält i räknaren men ingen rad i radarn.
//
// ⚠️ OCH DÄRFÖR BOR RADERNA HÄR, INTE I JSX:EN. Min första sond MODELLERADE renderingsreglerna
// och kunde bara bevisa att reglerna i filen ger motsägelsen — aldrig att komponenten gör det.
// Nu finns EN funktion: JSX:en mappar över den, RR-02 prövar den. Modellen ÄR produktionen.
//
// Att «Mottagna» visas är dessutom ett produktval, inte bara aritmetik: hur många fakturor vi
// tagit emot och MEDVETET inte prissatt är precis den disciplin rummet säljer. Vi mörkar inget.
export function radarRader(counts) {
  const c = counts ?? {};
  const bevakade = c.bevakade ?? 0;
  const mottagna = c.mottagna ?? 0;
  const prissatta = c.prissatta ?? 0;
  const delat = bevakade > 0 || mottagna > 0;
  const rader = [];
  // Totalen visas bara när underlaget FAKTISKT är delat — annars vore «Fakturor» och den enda
  // delraden samma tal två gånger.
  if (delat) rader.push({ nyckel: 'fakturor', etikett: 'Fakturor', varde: c.fakturor ?? 0, total: true });
  rader.push({ nyckel: 'prissatta', etikett: delat ? 'Prissatta' : 'Fakturor', varde: prissatta });
  if (mottagna > 0) rader.push({ nyckel: 'mottagna', etikett: 'Mottagna', varde: mottagna });
  if (bevakade > 0) rader.push({ nyckel: 'bevakade', etikett: 'Bevakade', varde: bevakade });
  return rader;
}
