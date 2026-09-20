// lib/kategorinyckel.js — EN KANONISK KATEGORINYCKEL PER PRODUKT (regel 1: en sanning per fråga).
//
// ══ VARFÖR MODULEN FINNS (grundarorder 2026-09-18) ══════════════════════════════════════════
// `vaxel` och `molnvaxel` var två nycklar för samma produkt. Det var inte bara otydligt — det var
// ett kundsynligt fel i fyra lager samtidigt, och alla fyra hade samma orsak: **infrastrukturen
// nycklades på det DÖDA namnet, så det LEVANDE namnet var osynligt för den.**
//
// Mätt 2026-09-18 genom att köra funktionerna, inte genom att läsa dem:
//
//  1. `checkSupplierFingerprint('telia','Telia Sverige AB','molnvaxel').categoryOk === false`.
//     Kategoriseraren kan BARA ge `molnvaxel` (`vaxel` finns inte i CATEGORIES). Telias
//     fingeravtryck väntade `vaxel`. Alltså föll varje Telia-växelfaktura till
//     `fingerprint_mismatch` → `route: 'review_queue'` → kunden fick «en människa tar vid»
//     i stället för det prissatta svar vi faktiskt kan ge. Samma sak för telenor, tele2 och tre,
//     vars listor aldrig ens nämnde växel — och det finns tre verkliga fixturer
//     (`telenor-molnvaxel-stor.pdf`, `tre-mobil-molnvaxel.pdf`, Telia).
//  2. `VALID_CATEGORIES` i `lib/category-validator.js` bar `vaxel`, inte `molnvaxel` — och den
//     listan INJICERAS I VALIDATORNS SYSTEMPROMPT. Andrahandsbedömaren fick alltså aldrig veta
//     att den kanoniska kategorin existerar och kunde omöjligt hålla med kategoriseraren.
//     `RELATED`-mjukaren, som skulle fånga just närliggande oenighet, var nycklad på `molnvaxel`
//     och kunde därför heller aldrig fyra. Tre lager, samma klyvning.
//  3. `catLabel('molnvaxel')` gav `"molnvaxel"` — den råa nyckeln, till kunden. `vaxel` gav «växel».
//  4. `SEAT_CATEGORIES` i `lib/production-monitor.js` saknade `molnvaxel`, alltså larmade
//     seatCount-vakten aldrig för en kategori vars hela prissättning är per användare.
//
// ══ VILKEN NYCKEL SOM VANN, OCH VARFÖR DET ÄR MÄTT OCH INTE TYCKT ═══════════════════════════
// `molnvaxel` är kanonisk. Fyra avläsningar, inte en smaksak:
//   · den är den ENDA kategoriseraren kan producera (`CATEGORIES` saknar `vaxel`),
//   · den är `real-public` med verifierat Telia-ankare, momsbas och `lastVerified`
//     — `vaxel` var `estimated` och beskrev sig själv som «branschuppskattning 49–149 kr/mth»,
//   · den står i `REVIDERADE_KATEGORIER`, alltså TALAR den; `vaxel` var tyst,
//   · den har en egen deterministisk modul (`lib/molnvaxel-recommendation.js`) och egen svit.
// Prisbokens `vaxel`-post var alltså ett SÄMRE estimat för samma produkt, och att ha två poster
// för en produkt är precis den dubbla sanning regel 1 finns mot.
//
// ══ VAD SOM INTE ÄR EN DUBBLETT — OCH DÄRFÖR INTE RÖRS ══════════════════════════════════════
// `lib/telekom-normalize.js` använder strängen `'vaxel'` som RADKLASS (`classifyTelekomLine` ger
// `'hardware' | 'vaxel' | 'mobil' | 'other'`). Det är en annan namnrymd: en radtyp inuti en
// telekomfaktura, inte en fakturakategori. Samma modul returnerar `category: 'molnvaxel'` för
// datapunkten. Att döpa om radklassen hade varit en beteendeändring utan att stänga något hål —
// och `'mobil'` kolliderar likadant, så en omdöpning av bara `vaxel` hade gjort axeln
// inkonsekvent. Kollisionen är namnlikhet, inte dubbel sanning.
//
// Det påståendet är inget vi litar på: KN-09 KÖR modulen och kräver att radklassen fortfarande
// ger `'vaxel'` medan `buildTelekomDatapoint` ger `category: 'molnvaxel'`. Ett undantag som ingen
// prövar är en bakdörr.
//
// ══ VAKTENS PREMISS (Verifieringsplikten p.5) ═══════════════════════════════════════════════
//   FÅNGAR: en legacy-nyckel som återinförs i en kategori-namnrymd någonstans i repot
//           (`tests/kategorinyckel.mjs` sveper källträdet).
//   BLIND:  svepet läser TEXT. En kategori som byggs dynamiskt (`'moln' + 'vaxel'`), läses ur
//           databasen eller kommer ur en AI-sträng syns inte.
//
// ⚠️ RÄTTELSE 2026-09-20 — HÄR STOD ETT PÅSTÅENDE SOM VAR SKRIVET, INTE KÖRT.
// Raden löd: «en lagrad legacy-nyckel som läses (`kanoniskKategori` normaliserar vid dörren)».
// `kanoniskKategori` satt inte vid någon dörr. Mätt en och en 20 september: noll
// produktionsimportörer (avexportering bröt ingen modul), noll interna anropare (ESLint
// `no-undef` efter omdöpning), noll skript — enbart två testfiler. Det är bibelns egen form från
// 11 september: **en deklaration som ingen konsument frågar är ingen deklaration.**
//
// Och den skulle inte ha haft något att göra vid dörren heller. Produktions-DB mätt samma dag
// (`scripts/probe-kategorinyckel.mjs`, GH Actions-körning 35536143690, 2026-09-20 20:38 UTC):
// `invoice_analyses` bär **0 rader** med `vaxel` (2 med `molnvaxel`), `invoice_datapoints`
// **0 punkter** med `vaxel` (4 med `molnvaxel`). Ingen lagrad rad bär alltså aliaset, och
// kategoriseraren kan inte producera det (`CATEGORIES` saknar `vaxel`).
//
// Funktionen är därför BORTTAGEN i stället för inkopplad: att lägga en normalisering på varje
// rumsläsning för ett fall som är uppmätt till noll är att betala för ett skydd mot något som
// inte kan hända — och en rad som SER ut som ett skydd utan att vara det är sämre än ingen rad.
// Kartan och `arLegacyKategori` står kvar: svepet i källträdet är den halva som faktiskt vaktar,
// och den vaktar där en legacy-nyckel skulle återinföras — i koden. Blindfläcken (en nyckel som
// når oss dynamiskt eller ur en framtida import) är därmed ÖPPEN och uttalad, inte täckt av en
// funktion ingen anropar. Ändras mätvärdet ovan från noll är rätt drag att koppla in en
// normalisering i EN läsväg i `lib/invoice-store.js` — aldrig sex kopior i sex SELECT-grenar.

/**
 * Legacy-stavningar → den kanoniska nyckeln. Växer när en kategori byter namn.
 * Nyckeln får ALDRIG tas bort ur den här kartan så länge en lagrad rad kan bära den: raden är
 * kundens historik, och en oläsbar historik är ett tyst tapp (arkiveringens läxa, 11 september).
 */
export const LEGACY_KATEGORINYCKLAR = Object.freeze({
  vaxel: 'molnvaxel',
});

/** Är nyckeln en avvecklad stavning? Används av vakten och av migreringssonder. */
export function arLegacyKategori(kategori) {
  return Object.prototype.hasOwnProperty.call(
    LEGACY_KATEGORINYCKLAR, String(kategori ?? '').trim());
}
