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
// ⚠️ ORDERN SA SJUTTON. EFTER GRANSKNINGEN ÄR TALET TRETTON, och de tre stegen dit är värda
// mer än talet:
//   · `saas-crm` — Pipedrive, HubSpot och Zoho PUBLICERAR sina priser (verifierade 31 aug), bara
//     i USD. «Offertprissatt» är en osanning kunden motbevisar på tio sekunder.
//   · `vaxel` — dublett av `molnvaxel`, som är real-public och TALAR. Två ytor, samma produkt,
//     motsatt besked (regel 5).
//   · `larm-bevakning` och `saas-other` — granskningens F1 och F5. Den första klassade jag som
//     offertprissatt medan prisbokens EGEN not säger «Sector Alarm 299–399, Verisure 349–499
//     (verifierade listpriser maj 2026)»; den andra som volymstyrd fast prisbokens
//     `volumeDataNote` inte namnger någon drivkraft alls. Båda var MINA påståenden mot data som
//     låg i repot — tredje gången samma fel på två dygn.
//
// Läxan är att klassen inte får vara en åsikt. TS-10 och TS-11 mäter den nu mot prisboken:
// «verifierade listpriser» utesluter OFFERTPRISSATT, och VOLYMSTYRD kräver att prisboken
// namnger drivkraften («styrs av …»). Maskinen ser inte att klassen är RÄTT — den ser att  // pastaende-ok: deklarerar vaktens gräns, gör inget anspråk om mekanik
// prisboken MOTSÄGER den, och det räckte för att fälla båda fynden utan granskare.
//
// En kategori som inte passar i någon klass får `oklart`, och `oklart` producerar ALDRIG
// kundtext — tystnad är rätt svar när vi inte vet varför vi tiger.
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
  /**
   * ⚖️ JURIDISK KARANTÄN. Arvo saknar regulatoriskt tillstånd att hantera eller förmedla
   * försäkringar (grundarens deklaration 2026-09-17). Att lova bevakning eller motbud här vore
   * inte ett premiumfel utan ett LAGBROTT — och därför är det här den enda klass vars text
   * NOLLAR varje förväntan i stället för att beskriva vad vi gör i stället.
   *
   * Skillnaden mot OFFERTPRISSATT är inte grad utan ART: där säger vi «inget listpris finns, men
   * vi hör av oss inför avtalsslutet». Här får vi inte höra av oss alls.
   */
  TILLSTAND_KRAVS: 'tillstand_kravs',
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
// ⚠️ SMALNAD 2026-09-17 EFTER GRANSKNINGENS F3 — GRUNDARBESLUT «B: vi ljuger aldrig i Rummet».
// Första versionen lovade «vi bevakar avtalsslutet och förbereder motbudet» och «vi säger till när
// något rör sig». MÄTT: ingen av de mekanikerna finns för de här raderna. `storeTriaged` skriver
// aldrig `contract_end_date`, så det finns inget slutdatum att bevaka, och prislarmens
// mottagarlista filtrerar `route = 'auto'` — kunden kortet visas för är utesluten per
// konstruktion. Jag tog bort ETT löfte utan mekanik och satte dit TRE.
//
// VAD SOM FAKTISKT ÄR BACKAT, kontrollerat hela vägen innan raden skrevs:
//   `api/save-contract.mjs` UPDATE:ar `contract_end_date` på raden (WHERE id = analysisId — och
//   triagerade rader ligger i samma tabell), och `api/cron/send-reminders.mjs` väljer ENBART på
//   `contract_end_date BETWEEN +59/+61` och `+29/+31`, utan route-filter. Kedjan håller alltså
//   från kundens uppgift till utskicket. Det är därför åtgärden nu ber om slutdatumet i stället
//   för att påstå att vi redan har det.
const BESKED = Object.freeze({
  [SKAL.VOLYMSTYRD]: {
    rubrik: 'Volymstyrt pris',
    rad: 'Priset styrs av volym — inte av hur många ni är',
    text: 'Kostnaden här styrs av volym och specifikation, inte av antalet anställda. Ett golv per '
      + 'anställd vore ett tal utan innebörd, så vi sätter inget. Vi känner heller inte till när '
      + 'avtalet löper ut — det går inte att läsa ur en faktura.',
    atgard: 'Säg till när avtalet löper ut, så hör ni från oss 60 och 30 dagar innan.',
  },
  [SKAL.OFFERTPRISSATT]: {
    rubrik: 'Offertprissatt',
    rad: 'Här finns inget listpris att mäta mot — och det är själva beskedet',
    text: 'Priset i den här kategorin sätts i offert, inte på en publik prislista. Vi lovar därför '
      + 'aldrig ett byte här, och vi sätter ingen siffra vi inte kan belägga. Vi känner heller '
      + 'inte till när avtalet löper ut — det går inte att läsa ur en faktura.',
    atgard: 'Säg till när avtalet löper ut, så hör ni från oss 60 och 30 dagar innan.',
  },
  // ⚖️ DEN ENDA KLASS UTAN ETT «VI»-LÖFTE. Varje annan text slutar med vad Arvo gör härnäst.
  // Den här säger tre gånger vad vi INTE gör, och skickar kunden till någon annan. Det är
  // avsiktligt: en förväntan som inte nollas är en förväntan vi skapat, och för försäkring är
  // det inte ett premiumfel utan ett regulatoriskt.
  [SKAL.TILLSTAND_KRAVS]: {
    rubrik: 'Kräver särskilt tillstånd',
    rad: 'Försäkringar hanteras inte av Arvo',
    text: 'Att hantera eller förmedla försäkringar kräver ett särskilt tillstånd som Arvo inte '
      + 'har. Vi prissätter den här kostnaden inte, vi bevakar den inte, och vi hör inte av oss '
      + 'om den. Den syns här enbart för att ni ska se att fakturan kommit fram.',
    atgard: 'Vänd er till er försäkringsförmedlare eller ert försäkringsbolag.',
  },
  [SKAL.UTLANDSK_VALUTA]: {
    rubrik: 'Publikt pris — i utländsk valuta',
    rad: 'Leverantörerna publicerar sina priser, men inte i kronor',
    text: 'Ett SEK-belopp räknat ur en utländsk prislista via dagskurs är ingen verifierad siffra, '
      + 'och vi visar den inte. Kursen rör sig, och ni skulle inte kunna räkna hem talet.',
    atgard: 'Säg till när avtalet löper ut, så hör ni från oss 60 och 30 dagar innan.',
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
  // ⚠️ FLYTTAD UR VOLYMSTYRD (F5): texten påstår «priset styrs av volym». Prisboken säger bara
  //    att per-anställd-benchmarken inte är tillämpbar — inte att priset följer volym. Nischad SaaS
  //    prissätts oftast per säte, så meningen vore affirmativt falsk om en restpost vi per
  //    definition inte vet vad den innehåller.
  'saas-other':          { skal: SKAL.OKLART, grund: 'Restpost för okategoriserad SaaS — vi vet inte vad raden innehåller, alltså kan vi inte säga varför den tiger.' },

  // ── Nivå 3: inget publikt listpris existerar. Bibelns egen lista över «Arvo beväpnar».
  // ── ⚖️ JURIDISK KARANTÄN (grundarbeslut 2026-09-17) ───────────────────────────────────────
  //    «Arvo saknar i dagsläget regulatoriskt tillstånd för att hantera eller förmedla
  //    försäkringar. Vi får under inga omständigheter lova kunden att vi bevakar eller
  //    förbereder motbud för dessa avtal — det vore ett lagbrott.»
  //
  //    Deklarationen är grundarens och bokförs här med datum, precis som Fortnox-fotnoten: ett
  //    beslut vi inte bokför har vi inte fattat. Maskinvakten står i TS-12/TS-13 — den härleder
  //    ur NYCKELN (/^forsakring/), så en framtida `forsakring-fordon` hamnar i karantän utan att
  //    någon behöver komma ihåg det. En uppräkning hade glömt den femtonde kategorin.
  'forsakring-foretag':  { skal: SKAL.TILLSTAND_KRAVS, grund: 'Regulatoriskt tillstånd saknas för försäkringsdistribution (grundaren, 2026-09-17).' },
  'forsakring-ansvar':   { skal: SKAL.TILLSTAND_KRAVS, grund: 'Regulatoriskt tillstånd saknas för försäkringsdistribution (grundaren, 2026-09-17).' },

  // ⚠️ FLYTTAD UR OFFERTPRISSATT 2026-09-17 (granskningens F1). Jag skrev «priset sätts i offert,
  //    inte på en publik prislista» — och prisbokens EGEN not för samma kategori säger «Sector
  //    Alarm 299–399, Verisure 349–499, Safemore 249–349 (verifierade listpriser maj 2026)». Båda
  //    kan inte vara sanna, och det var mitt eget saas-crm-argument otillämpat på den enda
  //    kategori där prisboken använder ordet «verifierade». Det gör den LISTPRISBAR, alltså en
  //    tredje kandidat för kön — inte en kategori vi ska förklara bort.
  'larm-bevakning':      { skal: SKAL.OKLART, grund: 'Prisboken bär verifierade SEK-listpriser (Sector Alarm · Verisure · Safemore, maj 2026). Listprisbar men oreviderad — hör hemma i kön, inte i ett besked.' },
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
  // Grunden sa förr «ingen sida sonderad än» — prisboken listar fem banker med verifierade
  // listpriser maj 2026. Ett skäl som säger emot prisboken är samma fel som F1, en klass ned.
  'bankavgifter':        { skal: SKAL.OKLART, grund: 'Listprisbar: prisboken bär verifierade SEK-listpriser (Lunar · SEB · LF · Swedbank · Handelsbanken, maj 2026). Står i kön för mänsklig deklaration.' },
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
