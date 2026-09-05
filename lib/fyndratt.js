// lib/fyndratt.js — får den här fakturans EGNA rader läsas upp för kunden?
//
// ══ VARFÖR (2026-09-05, ur Dustin-fakturan) ═════════════════════════════════════════════════
//
// Fakturan bar raden «Leasing Server (Månad 48 av 36)» — tolv månader à 2 450 kr debiterade
// efter att avbetalningen var slutbetald, 29 400 kr av kundens pengar, med kravbrevet redan
// skrivet. Kunden fick i stället «Kräver offert — våra experter kikar på detta».
//
// Orsaken var inte forensiken utan en grind som svarade på FEL FRÅGA. `requiresVolumeData`
// frågar «kan vi prissätta kategorin mot antal anställda?» — korrekt nej för IT-leasing. Sedan
// drog den slutsatsen «alltså har vi inget att säga», och det är en annan fråga. Den blandade
// ihop **att inte kunna JÄMFÖRA** med **att inte kunna LÄSA**.
//
// Mätt: 16 av 19 svarsvägar i api/test-invoice.mjs returnerar innan `recommend()` — där
// forensiken bor — någonsin anropas. Sju kategorier är volymgrindade, och fyra av dem står
// ordagrant i bibelns Nivå 3, nivån vars HELA produkt är att beväpna kunden med fyndet och som
// monetiseras via prenumerationen. Vi byggde vapnet och routade det till tystnad.
//
// ══ DEKLARATION, ALDRIG EN KURERAD LISTA ═══════════════════════════════════════════════════
//
// Första designen (skrotad innan den byggdes) var en lista över vilka utgångar som får bära
// fynd. En handhållen lista glider isär från den den beskriver — det är prisbokens osourcade
// golv, bibelns kategorilista och varje annan avskrift vi någonsin lagat.
//
// Andra designen (också skrotad, och farligare) var att gata på den aritmetiska grinden:
// `provbar && balanced`. Den hade RIVIT FUNGERANDE FALL. Mätt: en faktura vars rader saknar
// `quantity` ger `judged: 0`, och de tre utgångar som i dag visar fynd hade tystnat. En fix som
// tar bort värde där det redan flödar är ett sämre fel än det den lagar.
//
// Kvar står den enda formen som varken kan glida eller regrera: **varje utgång DEKLARERAR om
// den litar på de avlästa raderna.** Utgången är det enda stället i koden som vet varför vi
// stannade — den som skriver `reason: 'implausible_amounts'` vet att talen är osäkra, och den
// som skriver `reason: 'volume_data_required'` vet att de inte är det. Samma mönster som
// vaktkontraktet: en TVINGANDE FRÅGA, inte ett bevis.
//
// Aritmetiken behåller ett veto, men bara där den faktiskt mätt något: hittar
// `judgeLineArithmetic` VERKLIGA brott tystnar fyndet oavsett deklaration. `judged: 0` är
// däremot inget veto — en grind som är tyst har inte sagt nej (grön av tomhet, 22 aug).
//
// ══ FRÅGAN SOM AVGÖR VARJE DEKLARATION ═════════════════════════════════════════════════════
//
// **Rör utgångens tvivel VAD VI LÄSTE, eller VAD DET BETYDER?**
//
//   · Betydelsetvivel → `true`. Vi vet inte vad fakturan ÄR, vilken kategori den hör till, eller
//     vad marknadspriset borde vara. Inget av det rör talen på raden. Hit hör
//     `volume_data_required`, `no_benchmark`, `natavgift`, `categorization_conflict`,
//     `fingerprint_mismatch` — och varje etikettstrid mellan två av våra modeller.
//   · Avläsningstvivel → `false`. Vi misstror det vi läste: `implausible_amounts`,
//     `el_data_missing`, `price_anomaly`, en konfidens under tröskeln.
//
// ⚠️ DEN HÄR FRÅGAN SKREVS EFTER ATT JAG SJÄLV SVARAT FEL PÅ DEN (2026-09-05, samma dag).
// Första versionen deklarerade `categorization_conflict` och `fingerprint_mismatch` som `false`
// med motiveringen «våra kontroller är oense». Men båda konflikterna handlar om KATEGORIN —
// Sonnet mot Haiku om etiketten, leverantörskontrollen mot AI:ns kategorival. Båda modellerna
// läste samma rader; de bråkade om namnet. Fyndet är kategoriagnostiskt per konstruktion
// (lib/forensics.js), så striden rör det inte.
//
// Det var samma sammanblandning som modulen byggdes mot, en nivå ned: `requiresVolumeData`
// blandade ihop «kan inte JÄMFÖRA» med «kan inte LÄSA»; jag blandade ihop «vet inte VAD
// fakturan är» med «litar inte på TALEN». Mätt i produktion: Dustin-raden fick skäl
// `categorization_conflict`, och 29 400 kr tystades av min egen deklaration — en timme efter att
// jag namngett felfamiljen. Frågan ovan står här för att nästa deklaration ska ha en princip att
// följa i stället för en magkänsla. UK-11 låser fallet.
//
// FÅNGAR: att ett fynd ur kundens egen rad visas trots att våra egna kontroller är oense om
//   talen det vilar på — reservkortsfelet (BK-06/BK-07).
// BLIND: modulen kan inte se OM deklarationen är sann. Den som skriver `tillitTillRader: true`
//   på en utgång som borde tvivla får igenom sitt fynd. Maskinen ser att svaret finns, aldrig
//   att det är rätt — beviset bor i utgångens egen kommentar och i granskarens blick.

import { judgeLineArithmetic } from './extraction-integrity.js';

/**
 * @param {object} p
 * @param {boolean} p.tillitTillRader  utgångens egen deklaration — obligatorisk, aldrig defaultad
 * @param {object}  p.extracted        den extraherade fakturan (för aritmetikens veto)
 * @returns {{ visa: boolean, skal: string }}
 */
export function farVisaFynd({ tillitTillRader, extracted } = {}) {
  // Ingen deklaration är ett FEL, aldrig ett tyst nej. Ett saknat svar och ett nej ser annars
  // likadana ut i loggen, och då kan ingen mäta hur ofta vi tiger av misstag.
  if (typeof tillitTillRader !== 'boolean') {
    throw new Error('farVisaFynd: `tillitTillRader` måste deklareras (true/false) av utgången — '
      + 'utgången är det enda stället som vet varför vi stannade.');
  }
  if (!tillitTillRader) return { visa: false, skal: 'utgangen_litar_inte_pa_raderna' };

  const dom = judgeLineArithmetic(extracted);
  // Bara ett MÄTT brott är ett veto. `judged: 0` betyder att grinden inte kunde pröva raderna —
  // det är inte ett nej, och att behandla det som ett nej vore att bli tyst av tomhet.
  if (dom?.provbar && dom.balanced === false) {
    return { visa: false, skal: 'radaritmetiken_gar_inte_ihop' };
  }
  return { visa: true, skal: 'kundens_egna_rader' };
}
