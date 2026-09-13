// lib/liggarvillkor.js — VEM FÅR SE VAD I LIGGAREN, deklarerat en gång.
//
// ══ VARFÖR (2026-09-11, ur den fientliga granskningen av 6cd359f) ═══════════════════════════
// Jag stängde två dörrar och lämnade elva öppna. Granskaren mätte det: testidentitetsgrinden satt
// på `storeDatapoint` (→ `invoice_datapoints`), men `invoice_analyses` är en EGEN prisbokskälla
// med LÄGRE tröskel (5 mot 10) — alltså lättare att förorena än den väg som stängdes. Och
// arkivfiltret satt i två läsvägar av elva kundsynliga: månadsbriefingen, avtalspåminnelserna och
// prislarmens mottagarlista kunde alla räkna rader kunden fått veta var borttagna.
//
// Det är bibelns egen regel bruten i samma session som den citerades: **en fix som inte följs till
// alla konsumenter är en halv fix** (19 augusti). Regeln säger «grep:a funktionsnamnet, inte bara
// ytan som råkade avslöja felet» — och det gjorde jag inte.
//
// SVARET ÄR INTE ELVA LAPPAR UTAN EN KLASSNING MASKINEN TVINGAR FRAM. Varje läsväg mot
// `invoice_analyses` bär en markör som säger vad den ÄR, och `tests/liggarvillkor.mjs` kräver att
// klassens villkor står i satsen. En ny läsväg utan markör fäller sviten — den tolfte konsumenten
// hittas alltså av en maskin, inte av nästa granskare.
//
//   -- liggare: kundvy    → text/tal som når kunden. MÅSTE bära `arkiverad_at IS NULL`.
//                           Arkivering betyder «borta ur kundens vy»; en yta som ändå räknar
//                           raden gör arkiveringen till en lögn.
//   -- liggare: moat      → tvärkunds-aggregat som sätter PRISER. MÅSTE utesluta testidentiteten
//                           (hela villkoret, tecken för tecken — LV-04) och får ALDRIG filtrera
//                           arkiverade rader (LV-08): proveniensen består för moatens skull.
//   -- liggare: internt: <skäl>
//                         → dedup, admin, ops, testytans egen städning. Inget krav, men skälet
//                           måste stå skrivet — «ingen frågade» får inte se ut som «prövat».
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en ny eller ändrad läsväg som saknar markör; en kundvy utan arkivfilter; ett
//     moat-aggregat utan testidentitetsspärr.
//   BLIND: den läser markören, aldrig innebörden. En läsväg som FELklassas som `internt` med ett
//     rimligt skäl passerar — precis som vaktkontraktet kan se att svaret finns, aldrig att det är
//     sant. Och den ser bara `FROM invoice_analyses` i `api/` och `lib/`; en läsväg i ett skript
//     eller via en vy med annat namn är utanför räckvidden, uttalat.

// ⚠️ `MOAT_UTESLUT_TEST` BORTTAGEN 2026-09-13. Den var EN e-poststräng medan testidentiteten är
// fem adresser plus varje `+tag`-variant — fem av sex passerade grinden. Efter rättningen hade
// konstanten noll konsumenter men stod kvar och SÅG UT som en sanktionerad mekanism; nästa läsare
// kunde ha återinfört exakt buggen som just stängdes. Villkoret bor i `lib/test-surface.js`
// (`TEST_EXAKTA` · `TEST_DOMAN` · `TEST_LOKALDELAR`), och LV-04 kräver att varje moat-sats bär det.

/** De tre klasserna, som text — markören i SQL:en måste vara exakt en av dem. */
export const KLASSER = ['kundvy', 'moat', 'internt'];
