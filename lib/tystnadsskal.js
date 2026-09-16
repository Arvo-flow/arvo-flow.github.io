// lib/tystnadsskal.js — VARFÖR en kategori tiger, deklarerat på ETT ställe.
//
// ══ GRUNDARBESLUT 2026-09-16 (ur Fable 5.1:s dom över brofästet) ════════════════════════════
// «Vi ska inte skrapa larm och städning. Vi ska tillämpa Nivå-3-kopian rakt av på dem:
// offertprissatt, vi bevakar inför omförhandling.»
//
// Bakgrunden är att «19 tysta kategorier» visade sig vara fel problemformulering. Av de nitton
// kan listpriser bära TVÅ. De övriga tiger inte för att vi saknar data — de tiger för att det
// INTE FINNS något publikt golv att verifiera, och det är en produktsanning, inte en lucka.
// Bibeln säger redan vad Arvo gör där: den BEVÄPNAR (fyndet, tajmingen, motbudet) och lovar
// aldrig ett byte. Tystnaden ska alltså bytas mot det beskedet — inte mot ett golv.
//
// ⚠️ OCH ORDERN SA SJUTTON. Sant tal är FEMTON, och skillnaden är kundsynlig:
//   · `saas-crm`  — Pipedrive, HubSpot och Zoho PUBLICERAR sina priser (verifierade 31 aug).
//     De är bara i USD. Att säga «offertprissatt» till en kund som kan googla Pipedrives
//     prislista på tio sekunder är en osanning på den yta där hela vår premiumposition bor.
//     Det är google-sek-grindens situation ordagrant, och den har redan sitt eget ärliga svar.
//   · `vaxel`     — samma kategori som `molnvaxel`, som är `real-public` med ett verifierat
//     Telia-ankare och som TALAR. Att skriva «offertprissatt» på den ena medan den andra
//     citerar 89 kr vore två ytor som säger motsatt sak om samma produkt (regel 5).
// Båda får därför ett eget, sant besked. En kategori som inte passar i någon klass får `oklart`,
// och `oklart` producerar ALDRIG kundtext — tystnad är rätt svar när vi inte vet varför vi tiger.
//
// ══ VARFÖR DEKLARATIONEN OCH INTE KOPIAN ÄR KÄLLAN (regel 1) ════════════════════════════════
// Frestelsen är att skriva femton meningar, en per kategori. Då glider de isär, och den
// sextonde kategorin får ingen alls — tyst. Här deklareras i stället KLASSEN, och texten HÄRLEDS
// ur den. En ny tyst kategori utan deklaration fäller sviten (TS-01) i stället för att tiga.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en tyst kategori utan deklarerat skäl · en deklaration för en kategori som TALAR
//     (de två kan inte båda vara sanna) · ett `oklart` som når kundtext · en klass utan text.
//   BLIND: den ser inte om KLASSEN är rätt vald (TS-01 prövar att svaret FINNS, aldrig att det
//     är sant). Att `larm-bevakning` verkligen saknar publikt listpris är en mänsklig bedömning, inte ett mätvärde — maskinen ser bara att någon
//     svarat. Beviset bor i att en människa läst marknaden, precis som för prisboken själv.

/**
 * De fyra skälen en kategori kan tiga av. Slutet fält med flit: en femte anledning ska tvinga
 * fram ett beslut om vad kunden ska få veta, inte smygas in som en variant av en befintlig.
 */
export const SKAL = Object.freeze({
  /** Ett pris FINNS, men det styrs av volym eller specifikation — inte av antalet anställda. */
  VOLYMSTYRD: 'volymstyrd',
  /** Inget publikt listpris existerar. Nivå 3 i Switch-doktrinen: Arvo beväpnar, lovar aldrig byte. */
  OFFERTPRISSATT: 'offertprissatt',
  /** Publika listpriser finns — men inte i SEK. Ett SEK-tal ur en USD-lista är inte verifierat. */
  UTLANDSK_VALUTA: 'utlandsk_valuta',
  /** Ingen har ställt frågan. Producerar ALDRIG kundtext. */
  OKLART: 'oklart',
});

/**
 * Kundtexten HÄRLEDS ur klassen — aldrig skriven per kategori.
 *
 * Varje besked säger tre saker: vad som är sant om priset, vad Arvo gör i stället, och att det
 * är ett val och inte ett tapp. Det sista är hela poängen: «vi saknar data» läses som en brist,
 * «det finns inget listpris att verifiera — därför gör vi detta i stället» läses som ett omdöme.
 */
const BESKED = Object.freeze({
  [SKAL.VOLYMSTYRD]: {
    rubrik: 'Volymstyrt pris',
    rad: 'Priset styrs av volym — inte av hur många ni är',
    text: 'Kostnaden här styrs av volym och specifikation, inte av antalet anställda — ett golv per '
      + 'anställd vore ett tal utan innebörd. Vi jämför i stället mot ert eget underlag och '
      + 'bevakar avtalet mot förfallodatum.',
    atgard: 'Vi går igenom specen manuellt inför omförhandlingen.',
  },
  [SKAL.OFFERTPRISSATT]: {
    rubrik: 'Offertprissatt',
    rad: 'Här finns inget listpris att mäta mot — och det är själva beskedet',
    text: 'Priset i den här kategorin sätts i offert, inte på en publik prislista. Vi lovar därför '
      + 'aldrig ett byte här, och vi sätter ingen siffra vi inte kan belägga. Det vi gör i stället '
      + 'är att hålla koll på när avtalet kan öppnas.',
    atgard: 'Vi bevakar avtalsslutet och förbereder motbudet inför omförhandlingen.',
  },
  [SKAL.UTLANDSK_VALUTA]: {
    rubrik: 'Publikt pris — i utländsk valuta',
    rad: 'Leverantörerna publicerar sina priser, men inte i kronor',
    text: 'Ett SEK-belopp räknat ur en utländsk prislista via dagskurs är ingen verifierad siffra, '
      + 'och vi visar den inte. Kursen rör sig, och ni skulle inte kunna räkna hem talet.',
    atgard: 'Vi bevakar prisändringarna i källvalutan och säger till när något rör sig.',
  },
});

/**
 * Deklarationen. `grund` är den mänskliga bedömningen som motiverar klassen — den ska gå att
 * granska, och den når aldrig kunden (texten kommer ur klassen).
 */
export const TYSTNADSSKAL = Object.freeze({
  // ── Volymstyrda: prisboken bär redan `requiresVolumeData` + `volumeDataNote` för var och en.
  'serverhosting':       { skal: SKAL.VOLYMSTYRD, grund: 'CPU, RAM, bandbredd och antal servrar — ingen enhet som följer antalet anställda.' },
  'utrustningsleasing':  { skal: SKAL.VOLYMSTYRD, grund: 'Beror på objekt, löptid och kreditvärdighet. Skrivarleasing-fällan ordagrant.' },
  'leasing-bil':         { skal: SKAL.VOLYMSTYRD, grund: 'Antal fordon, modell och avtalsvillkor — inte huvudräkning.' },
  'kontorsmaterial':     { skal: SKAL.VOLYMSTYRD, grund: 'Faktisk förbrukning och sortiment; volymrabatter dominerar listpriset.' },
  'städ-rengöring':      { skal: SKAL.VOLYMSTYRD, grund: 'Yta, frekvens och kravnivå styr priset, inte antalet anställda.' },
  'transport-frakt':     { skal: SKAL.VOLYMSTYRD, grund: 'Listpris finns men verklig kostnad styrs av volymavtal.' },
  'saas-other':          { skal: SKAL.VOLYMSTYRD, grund: 'Restpost: blandade produkter utan gemensam jämförelseenhet.' },

  // ── Nivå 3: inget publikt listpris existerar. Bibelns egen lista över «Arvo beväpnar».
  'forsakring-foretag':  { skal: SKAL.OFFERTPRISSATT, grund: 'Premien sätts på riskbedömning per bolag. Ingen publik prislista finns.' },
  'forsakring-ansvar':   { skal: SKAL.OFFERTPRISSATT, grund: 'Samma som företagsförsäkring — individuell riskbedömning.' },
  'larm-bevakning':      { skal: SKAL.OFFERTPRISSATT, grund: 'Offert per objekt: larmklass, antal punkter, utryckningsavtal.' },
  'it-support':          { skal: SKAL.OFFERTPRISSATT, grund: 'Timpris och SLA förhandlas per avtal; inga publicerade SMF-priser.' },
  'avfall-atervinning':  { skal: SKAL.OFFERTPRISSATT, grund: 'Kommunal taxa plus entreprenörsavtal — ingen jämförbar publik lista.' },
  'foretagshalsovard':   { skal: SKAL.OFFERTPRISSATT, grund: 'Avtal per bolag, med och utan undersökningar. Offertbaserat.' },
  'skrivarleasing':      { skal: SKAL.OFFERTPRISSATT, grund: 'Gatad 14 juni av exakt det skälet: ingen publik källa för SMF-klickpriser.' },
  'managed-workplace':   { skal: SKAL.OFFERTPRISSATT, grund: 'Paketeras per kund; prisboken bär redan source: requires_quote.' },

  // ── Publikt pris i utländsk valuta. Att kalla detta offertprissatt vore en osanning kunden
  //    kan motbevisa på tio sekunder.
  'saas-crm':            { skal: SKAL.UTLANDSK_VALUTA, grund: 'Pipedrive, HubSpot och Zoho publicerar priser (verifierade 31 aug 2026) — i USD.' },

  // ── Oklart: ingen har ställt frågan, och då får ingen text produceras.
  //    `vaxel` är dessutom samma kategori som `molnvaxel`, som är real-public och TALAR. Innan
  //    någon avgör om nyckeln ska slås ihop eller bära ett eget skäl är varje besked här en
  //    gissning som kan motsäga en yta som redan citerar ett verifierat Telia-pris (regel 5).
  'vaxel':               { skal: SKAL.OKLART, grund: 'Dublett av molnvaxel (real-public, talar). Nyckelns status oavgjord 2026-09-16.' },

  // ── De två listprisbara: de ska FYLLAS, inte förklaras. De står här för att vakten kräver ett
  //    svar av varje tyst kategori — och «den ska fyllas» är ett annat svar än «den kan inte fyllas».
  'faktura-tjanst':      { skal: SKAL.OKLART, grund: 'Listprisbar. Står i kön för mänsklig deklaration — ska fyllas, inte förklaras.' },
  'bankavgifter':        { skal: SKAL.OKLART, grund: 'Listprisbar (banker publicerar företagspaket). Står i kön. Ingen sida sonderad än.' },
});

// ⚠️ `uncategorized` STÅR MED FLIT INTE HÄR. Den finns i revisionsgrinden men är ingen post i
// prisboken — den är ett UTFALL av kategoriseringen, inte en kategori. Jag lade först in den, och
// TS-09:s invariant fällde det direkt (19 tysta kategorier mot 20 deklarationer). Att låta den stå
// hade gjort registret en post bredare än den värld det påstår sig täcka, och då mäter räknaren
// ingenting. `tystnadsbesked('uncategorized')` ger `null` (TS-04), vilket är rätt svar för
// en faktura vi inte lyckats kategorisera.

/**
 * Beskedet för en tyst kategori — eller `null` när inget får sägas.
 *
 * FAIL-CLOSED (TS-03/TS-04): en okänd kategori och ett `oklart`-skäl ger båda `null`. Att låta en odeklarerad
 * kategori falla till den mest generella texten vore en tvåvägsgren på ett fyrvärt tillstånd,
 * och `else` är alltid det mest generösa påståendet (bibeln 11 september).
 */
export function tystnadsbesked(kategori) {
  const post = TYSTNADSSKAL[kategori];
  if (!post) return null;
  const besked = BESKED[post.skal];
  if (!besked) return null;
  return { skal: post.skal, rubrik: besked.rubrik, rad: besked.rad, text: besked.text, atgard: besked.atgard };
}

/** Skälet bakom klassen — för granskning och admin, aldrig för kundytan. */
export function tystnadsgrund(kategori) {
  return TYSTNADSSKAL[kategori]?.grund ?? null;
}
