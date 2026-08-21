// lib/jamforelsekalla.js — proveniensen för det tal kunden jämförs MOT.
//
// VARFÖR MODULEN FINNS (obduktionen 2026-08-20). Kvittoraden `listpris` säger till kunden att
// «jämförelsepriset är ett verifierat publikt listpris», och savingRange väljer sin bredd
// (±12 % för listpris, ±25 % för förhandlat mål) på samma grund. Båda härleddes i api-lagret ur
//
//     BRANCHINDEX[categorized.category]?.source === 'real-public'
//
// — den STATISKA prisbokstabellen. Men jämförelsepriset kommer inte därifrån. Det kommer ur EN
// av två vägar i recommend.js:
//   · like-for-like  → licenseTierBenchmarks (verifierade publika listpriser, daterade per nivå)
//   · benchmark      → lib/benchmark.js, vars läsväg FÖREDRAR livedata: KV → invoice_datapoints
//                      (source 'real', isTotal) → invoice_analyses ('live_analyses', isTotal)
//                      → först därefter prisbokens 'real-public'.
//
// Tabellraden och det räknande objektet är alltså olika saker, och tabellraden vinner alltid.
// Följden: en jämförelse som vilar på andra bolags TOTALSUMMOR fick ändå bocken «verifierat
// publikt listpris» och listprisets SMALARE konfidensintervall. Rätt siffra, fel proveniens —
// vilket regel 3 räknar som fel — plus en överdriven precision ovanpå.
//
// Att felet kunde bo kvar har en egen läxa: 156 rader längre upp i SAMMA fil läser
// sanity-verifieraren `recommendation.benchmark?.source`, alltså rätt objekt. Två konsumenter av
// samma fråga, två olika svar, och den kundsynliga hade fel (regel 1). Buggfixen i juli rörde
// dessutom exakt den här raden — den bytte `priceSource` mot `source` och lät LÄSVÄGEN stå kvar.
// Att rätta fältnamnet på fel objekt lämnar felet på plats.
//
// Regeln modulen kodifierar: **proveniensen produceras av det led som VÄLJER jämförelsepriset och
// bärs med talet** — aldrig återgissad nedströms ur något som råkar ligga bredvid.
//
// FÅNGAR: att en kundsynlig listprisbock sätts på en jämförelse som vilar på livedata, kohortdata
//   eller ett märkt estimat; att ett odaterat pris kallas verifierat; att ett totalsumme-ankare
//   presenteras som ett styckpris-listpris.
// BLIND: modulen dömer den DEKLARERADE källan. Säger prisboken 'real-public' om ett tal som i
//   själva verket är ett estimat, säger den här funktionen också 'real-public'. Att källetiketten
//   är sann bevakas av price-audit och verifierarna — inte här. Modulen vet heller ingenting om
//   huruvida jämförelsen är RELEVANT (fel produktnivå mätt mot rätt listpris är fortfarande fel);
//   det är licensnivåns och kraverBekraftadNiva:s uppgift.

/**
 * Hur många enheter benchmarkens tal ska multipliceras med — 1 när talet redan är en totalsumma.
 *
 * VARFÖR DEN ÄR EN FUNKTION OCH INTE TRE RADER (obduktionen 2026-08-20). Uträkningen fanns
 * inline på tre ställen i recommend.js. Två av dem bar `!benchmark.isTotal`; den tredje — den som
 * bygger suggestedAnnualCost, savingPerYear och overpaymentPercent, alltså kundens pengar — bar
 * den inte. Livedatans p25/median ur invoice_datapoints och invoice_analyses ÄR bolagets hela
 * årskostnad, medan `note` ärvs från prisbokens mock och säger «per användare»: exakt den
 * kombination som gör att en TOTALSUMMA multipliceras med antalet anställda. Samma enhetsfel som
 * gav score 96 åt en rad 184 % över golvet (2026-08-19), fast ett lager närmare kunden.
 *
 * Att bara lägga till flaggan på den tredje raden hade lagat dagens bugg och lämnat morgondagens:
 * en fjärde konsument kan glömma den lika lätt som den tredje gjorde. Med EN funktion är
 * förväxlingen inte längre ett fel som kan uppstå, utan ett tillstånd koden inte kan uttrycka
 * (samma drag som scorekravet: talet flyttades in i samma kedja som sitt underlag).
 *
 * @param {{ benchmark: {note?: string, isTotal?: boolean}|null, seatCount?: number|null,
 *           employees?: number|null, forceEmployees?: boolean }} p
 * @returns {number} 1 eller antalet enheter
 */
export function jamforelseSkala({ benchmark, seatCount, employees, forceEmployees } = {}) {
  if (!benchmark || typeof benchmark.note !== 'string') return 1;
  if (benchmark.isTotal === true) return 1;
  if (!benchmark.note.toLowerCase().includes('per användare')) return 1;
  const effektiva = seatCount ?? employees;
  if (!(effektiva > 0)) return 1;
  // saas-productivity skalar mot antalet ANSTÄLLDA, inte mot seatCount — fakturans licensantal
  // kan vara uppblåst av add-on- och överskottslicenser.
  const valt = forceEmployees ? employees : effektiva;
  return valt > 0 ? valt : 1;
}

/**
 * Vilket golv ett BYTESMÅL får räknas mot — och när inget mål får sättas alls.
 *
 * VARFÖR (obduktionen 2026-08-20, mätt mot produktionsdatabasen). Att sätta skalan till 1 för en
 * totalsumma gjorde ARITMETIKEN rätt men lämnade JÄMFÖRELSEN äppel-mot-päron. Livedatans p25 för
 * mobil i bandet 10–49 anställda är 35 880 kr/år — 897 kr per anställd, alltså 75 kr/mån. Inget
 * mobilabonnemang i Sverige kostar 75 kr/mån. Talet är inte ett per-enhet-pris: det är en TOTAL
 * där kohortens bolag har färre SIM än anställda. Kundens 40-SIM-total ställs då mot en kohort
 * vars enhetsantal ingen normaliserat, och ett byte dit vore ett löfte om en besparing som inte finns.
 *
 * Regeln fanns redan — för ett annat kort. Branschankaret (2026-06-25) tillåter ENDAST
 * 'real-public', «aldrig real/live_analyses (totalsumma → fel enhet)», och Arvo Score flyttades
 * till getPublicListBenchmark den 19 augusti av samma skäl. Bytesmålet var den tredje konsumenten
 * av samma läsväg och gick kvar den gamla vägen.
 *
 * Fail-closed: utan ett verifierat publikt per-enhet-golv sätts inget mål. Riktningen är den säkra
 * under 20 % success fee — listpriset ger en MINDRE påvisad besparing än kohorttotalen, och en
 * besparing vi inte kan belägga ska utebli.
 *
 * FÅNGAR: att en kohort-/livedatatotal blir bytesmål i en kategori som prissätts per enhet.
 * BLIND: säger ingenting om kategorier som INTE är per enhet — där är en total mot en total rätt
 *   jämförelse och funktionen släpper igenom. Den vet heller inte om det publika golvet avser rätt
 *   PRODUKTNIVÅ; det är kraverBekraftadNiva/MK-09:s uppgift.
 *
 * @param {{ benchmark: object|null, publiktGolv: object|null, seatCount?: number|null,
 *           employees?: number|null, forceEmployees?: boolean }} p
 * @returns {{ golv: object|null, skala: number, tystnad: string|null, byttUt: boolean }}
 */
export function bytesgolv({ benchmark, publiktGolv, seatCount, employees, forceEmployees } = {}) {
  const arTotal = benchmark?.isTotal === true;
  const perEnhet = (benchmark?.note ?? '').toLowerCase().includes('per användare');
  if (!arTotal || !perEnhet) {
    return { golv: benchmark ?? null, skala: jamforelseSkala({ benchmark, seatCount, employees, forceEmployees }), tystnad: null, byttUt: false };
  }
  const skala = jamforelseSkala({ benchmark: publiktGolv, seatCount, employees, forceEmployees });
  if (!(publiktGolv?.p25 > 0) || !(skala > 0)) {
    return {
      golv: null, skala: 1, byttUt: false,
      tystnad: 'kohortdata är en totalsumma — bytesmål kräver ett verifierat pris per enhet',
    };
  }
  return { golv: publiktGolv, skala, tystnad: null, byttUt: true };
}

/** Källor som får bära ett publikt listprisanspråk. Kohort- och livedata står medvetet utanför:
 *  de kan vara STARKARE underlag, men de är inte listpriser och ska inte kallas det. */
const LISTPRISKALLOR = new Set(['real-public', 'tele2-verified']);

/**
 * @param {{
 *   useLfl: boolean,
 *   benchmark: { source?: string, lastVerified?: string|null, isTotal?: boolean, note?: string }|null,
 *   tierLines?: Array<{ key: string }>|null,
 *   tierBenchmarks?: Record<string, { lastVerified?: string|null }>|null,
 * }} p
 * @returns {{ grund: 'like-for-like'|'benchmark', source: string|null, lastVerified: string|null,
 *             isTotal: boolean, listprisanspraak: boolean }}
 */
export function jamforelsensKalla({ useLfl, benchmark, tierLines, tierBenchmarks } = {}) {
  if (useLfl) {
    // Like-for-like prissätter varje licensrad ur licenseTierBenchmarks. Talet är en SUMMA över
    // flera nivåer, så det är bara så färskt som sin ÄLDSTA beståndsdel (BA-10:s regel gäller här
    // — vi vet vilka nivåer som bär, men summan har ingen enskild bärare). Att välja det färskaste
    // datumet vore att smickra oss själva.
    const datum = (tierLines ?? [])
      .map((t) => tierBenchmarks?.[t?.key]?.lastVerified ?? null)
      .filter((d) => typeof d === 'string' && d.length > 0)
      .sort();
    const stalaste = datum.length > 0 ? datum[0] : null;
    const heltackande = Array.isArray(tierLines) && tierLines.length > 0 && datum.length === tierLines.length;
    return {
      grund: 'like-for-like',
      source: 'real-public',
      lastVerified: stalaste,
      isTotal: false,
      // Odaterat pris får aldrig kallas verifierat — och saknar EN nivå sitt datum är summan
      // odaterad, hur många av de andra som än bär ett.
      listprisanspraak: heltackande && stalaste != null,
    };
  }

  const source = benchmark?.source ?? null;
  const isTotal = benchmark?.isTotal === true;
  const lastVerified = benchmark?.lastVerified ?? null;
  return {
    grund: 'benchmark',
    source,
    lastVerified,
    isTotal,
    // isTotal diskvalificerar ovillkorligt: en totalsumma är inte ett listpris, oavsett vad
    // källetiketten ärvt från prisbokens mock-objekt när livedatan spreds över den.
    listprisanspraak: LISTPRISKALLOR.has(source) && !isTotal && lastVerified != null,
  };
}
