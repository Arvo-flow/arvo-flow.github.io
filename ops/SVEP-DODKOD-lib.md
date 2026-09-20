# Svep · exporter i `lib/` utan produktionsanropare

**Order (grundaren 2026-09-20):** *«Tillämpa Noll-inferens-regeln: mät först, tala sen.»*
**Instrument:** `scripts/probe-dodkod.mjs` — körbart, med tvingande motprov.
**Varje tal nedan är en avläsning ur den körningen.** Inget i domen är deducerat.

---

## Instrumentet fällde sig självt två gånger innan det fick tala

Doktrinens amendemang 1: *en mätning gäller först när den bär sitt motprov.* Sonden avslutar 1 om
den inte klarar båda. Den gjorde det — två gånger — och båda gångerna var **jag** felet, inte den.

**1 · Mitt motprov var ett omätt antagande.** Jag satte `kanoniskKategori` i listan «känt levande»
för att jag skrev funktionen i går. Sonden fällde motprovet. Mätt: **noll produktionsanropare, bara
tester.** Jag hade skrivit i dess egen docstring att den *«normaliserar vid dörren»* och aldrig
kopplat den till någon dörr — felformen, begången i modulen som byggdes mot den.

**2 · Första utfallet sa 247 av 447 exporter (55 %).** Det talet kan inte vara sant, och reflexen är
att stanna. Orsaken var inte importformen (mätt: 0 namnrymdsimporter, 2 default) utan att sonden
saknade frågan **«används namnet INTERNT i sin egen modul?»** En hjälpare som modulen anropar själv,
exporterad för att ett test ska nå den, är inte död kod — att radera den hade brutit produktionen.
Med den frågan: **247 → 80.** Två nya motprov (`klassaVaxelrad`, `cellenBar`) låser att
intern-mätningen inte kan glida.

Slutligt utfall: **447 exporter i 118 moduler · 80 utan produktions- eller lib-anropare.**
Motprov A 2/2 · Motprov B 8/8.

---

## Domen

### 🔴 KOPPLAS IN — Vallgravens hjärta är inte inkopplat (3)

| Export | Mätning |
|---|---|
| `lib/telekom-normalize.js:buildTelekomDatapoint` | noll anropare i hela trädet |
| `lib/telekom-normalize.js:marketComparisonAllowed` | noll anropare i hela trädet |
| `lib/telekom-normalize.js:TIER_ORDER` | noll anropare, inte ens test |

Dessa producerar och vaktar `per_user_monthly_exvat` + `tier` — de fält bibeln kallar *«exakt det
fynd-motorn aggregerar»*. Mätt 2026-09-20 mot produktions-DB: alla fyra molnväxel-datapunkter har
**`per_user = NULL, tier = NULL`**, eftersom `storeDatapoint` (enda produktionsvägen) aldrig skriver
dem. **`marketComparisonAllowed` vaktar alltså en jämförelse vars indata aldrig skrivs** —
villkorsvaktens sjukdom, prövad och grön i sviten utan att någonsin ha haft en rad att skydda.

**Raderas inte.** Att koppla in en datapunktsväg mot moaten ändrar vad vi lagrar om kunder och är en
[KUND]-ändring med egen mätning och granskning. Den bör vara nästa uppdrag.

### 🟡 RADERAS — hela subsystemet är oåtkomligt (17)

| Modul | Exporter | Mätning |
|---|---|---|
| `lib/batch-job-store.js` | 14 | **noll importörer** — inte prod, inte skript, inte test |
| `lib/batch-processor.js` | 3 | **noll importörer** — inte prod, inte skript, inte test |

### ⚠️ OMMÄTT 2026-09-20 EFTER GRUNDARENS «ÄR DU HELT SÄKER?»

Första mätningen sökte strängen `lib/batch-job-store` — men **en modul inuti `lib/` importerar sina
grannar relativt** (`./batch-job-store.js`), utan `lib/`-prefix. Den formen kunde mätningen inte se.
Ommätt utan det antagandet, över HELA repot (inklusive `.github/`, `vercel.json`, `package.json`):

| Mätning | Utfall |
|---|---|
| Varje förekomst av `batch-job-store` i repot | **1 fil** — dess egen huvudkommentar |
| Varje förekomst av `batch-processor` | 3 filer — egen huvudkommentar + två agenttranskript i `ops/obduktion/` |
| `import('./lib/batch-processor.js')` | **KASTAR:** `SyntaxError: … does not provide an export named 'SYSTEM_PROMPT'` |
| `import('./lib/batch-job-store.js')` | laddar, 14 exporter |
| Referens i `src/` (frontend) | ingen |
| Post i `vercel.json` | ingen |
| Beräknade dynamiska importer (`import(\`…\${x}\`)`) | 16 st, ALLA med literal sökväg → basnamnsgrepet såg dem |

**Det avgörande: `batch-processor.js` går inte ens att importera.** Den är inte bara oanropad — den
är **trasig**, och skulle krascha om något försökte koppla in den. Det är ett starkare bevis än
frånvaron av anropare.

**Och historiken rättar min egen bild.** Jag var på väg att skriva att API-rutterna «togs bort».
Mätt: `api/batch-upload.mjs`, `api/batch-status.mjs` och `api/cron/batch-process.mjs` har **0
commits i mains historik** — de har aldrig funnits här. Commiten som skapade dem (`7ac6135`) är
**inte förfader till main** (`git merge-base --is-ancestor` → nej). Biblioteken kom in i main genom
importcommiten `6900286` (1 127 filer, 193 051 rader, 1 september) **utan sina anropare**.
`lib/production-monitor.js` kom i samma svep och tillhör samma föräldralösa subsystem — vilket
förklarar varför min `SEAT_CATEGORIES`-fix i går träffade död kod.

**Vad jag INTE kan mäta, och som avgör beslutet:** om du tänker återuppta batch-vägen. Det är din
kunskap, inte en avläsning. Värt att veta: arbetet går inte förlorat vid en radering — det ligger
kvar på `7ac6135`, utanför mains historik, och kan hämtas därifrån.

**Radering är grundarens beslut, inte kodens** (samma regel som de 14 datapunkterna 21 augusti).
Rekommendation: radera. Risken är mätt till noll — ingen väg in, och den ena modulen kan ändå inte
laddas.

### 🟡 RADERAS ELLER SKRIVS OM — bakåtkompatibla omslag (2)

`lib/fortnox-rightsizing.js:detectFortnoxPaket` och `:fortnoxRightsizing`. Modulens egen kommentar
säger *«Bakåtkompatibla Fortnox-specifika exports (tester + ev. äldre kod)»*; den levande vägen är
`saasFinanceRightsizing`, som `recommend.js` importerar.

**Min misstanke mättes och FÖLL.** Jag misstänkte att revisionsgrindens bevis för att `saas-finance`
får tala vilade på omslagstester. Mätt: `tests/fortnox-recommendation.mjs:70` kör ett
**`recommend()` end-to-end-block** mot produktionsvägen. **Inget [KUND]-fynd.** Omslagen är bara
extra enhetstester ovanpå ett bevis som redan håller.

### 🟢 INGEN ÅTGÄRD — 30 «bara skript», och det är rätt

Pre-commit-vakter (`pastaendevakt`, `commitkrav`, `bedomningskrav`), det nattliga svepet
(`price-extract`, `vakt`), migreringar (`schemakontroll`) och sondinfrastrukturen (`sondkontrakt`
med 30 anropare). **`scripts/` räknas medvetet inte som produktion i sonden** — ett skript kan vara
ett nattligt jobb eller en engångssond, och skillnaden går inte att läsa ur sökvägen. De redovisas i
egen hink i stället för att gissas in eller bort.

### 🟢 INGEN ÅTGÄRD — testvända konstanter (7)

`ARVODESSATS · MOMSBAS · ORESFALT · TIER_ORDER · PERIODER_PER_AR_TABELL · KLASSER ·
BLINDA_TILLSTAND` — var och en förekommer **exakt en gång** i sin modul (exportraden). De låser ett
värde åt ett test.

**Jag misstänkte ett verkligt fel här och det föll också.** Om `ARVODESSATS` inte används internt
kunde arvodet räknas med en literal — två sanningar. Mätt: `switcharvode.js:41` importerar
`ARVO_FEE_RATE` och räknar via `feeOf`; `ARVODESSATS` är ett rent alias. Ingen andra sanning.
(Milt mot regel 1 att ha två namn, men inget tal kan glida.)

---

## ⚠️ Fyndet om mitt eget arbete

**`lib/production-monitor.js` har noll importörer** — och jag ändrade den i går.

`grep` gav «1 prod/lib-importör», men mätningen av VAD den träffade visade att den enda förekomsten
är **en kommentar jag själv skrev i `lib/kategorinyckel.js`**. `SEAT_CATEGORIES`-fixen (att lägga
till `molnvaxel` i seatCount-vakten) var alltså **en rättelse av död kod**. Fixen var sakligt rätt
och skadar ingenting — men den skyddar ingen kund, och det motsatta stod i min rapport.

`analyzeResults · storeMetrics · getLatestMetrics · getMetricsHistory` ligger i hinken «varken test
eller skript». Modulen är en kandidat för samma beslut som batch-subsystemet.

---

## Uttalad blindfläck

Sonden läser **importsatser, inte exekvering**. Den kan inte se en funktion som importeras men
aldrig anropas (räknas som levande → sonden **underrapporterar**), ett namn som nås via strängindex
(`mod[namn]`), eller ett anrop i en gren som aldrig körs. Den svarar på *«finns en produktionsväg
som nämner namnet?»* — aldrig på *«körs den»*.

Sonden är **inte** ett blockerande test, med flit: 80 poster i en pre-commit-grind hade fällt varje
commit och blivit avstängd inom ett dygn (samma mätning som ordet «aldrig», 25 träffar på 20
commits). Den står körbar — *ett mätvärde utan sitt instrument är ett påstående*.

---

# ADDENDUM 2026-09-20 · EXEKVERING

## 1 · De 17 utplånade

`lib/batch-job-store.js` + `lib/batch-processor.js` raderade. Mätt före/efter:

| | Före | Efter |
|---|---|---|
| Exporter i `lib/` | 447 | **430** (−17, exakt som förutsagt) |
| Utan anropare | 80 | 63 |
| Svit | 2453/2453 | **2453/2453** |
| Moduler som laddar | 113 | **111 av 111** |

## 2 · Vallgravens hjärta inkopplat — mätbeviset

`buildTelekomDatapoint` anropas nu i sparvägen (`api/test-invoice.mjs`). Underlaget tas ur
**rekommendationen**, inte ur ett andra anrop till `normalizeTelekomInvoice`: moaten lagrar exakt
det tal kunden såg, och två beräkningar av samma sak kan glida isär.

Fixturerna körda genom det nya flödet:

| Faktura | FÖRE | EFTER |
|---|---|---|
| `telenor-molnvaxel-stor` | `annual_cost=274302 · seat=45 · per_user=NULL · tier=NULL` | **`53400 · 50 · 89 · T2`** |
| Telia Smart Connect + svarsgrupp | `255744 · 45 · NULL · NULL` | **`63720 · 45 · 118 · T2`** |
| `tre-mobil-molnvaxel` (klumpsumma) | `75812` skrevs som molnväxelobservation | **INGEN DATAPUNKT** |

89 × 50 × 12 = 53 400 och 118 × 45 × 12 = 63 720 — båda per-enhet-talen sammanfaller med
prisbokens **oberoende verifierade** Telia-golv (T1 89, T2 118).

**Min egen ändring införde ett fel som mätningen fångade.** Den oläsbara fakturan skrev fortfarande
hela den kombinerade fakturan (75 812) som en `molnvaxel`-observation, medan en läsbar nu skriver
53 400. Cellen hade alltså blandat två enheter — och just inkopplingen gjorde skillnaden skarp.
Stängt: `molnvaxel` utan läsbart licensantal skriver **ingen** marknadsobservation alls. Fail-closed
på moaten, fail-open på kunden (analysen sparas fortfarande i rummet).

Per-enhet-fälten skrivs i **egen sats med egen catch** (11 september-regeln): en kanske-omigrerad
kolumn får aldrig ta ned kundens datapunkt.

## 3 · De två andra var inte saknade inkopplingar

- **`TIER_ORDER` raderad.** Byte-identisk med `Object.keys(CANONICAL_TIERS)`, noll konsumenter,
  ingen intern användning — en andra sanning om samma ordning.
- **`marketComparisonAllowed` behålls, men deklarerad som OMATBAR.** Den grindar på *distinkta
  kunder*; `invoice_datapoints` har tio kolumner och **ingen pekar ut en kund** (anonymiserad by
  design — grannliggaren `invoice_analyses` bär `user_email`). `cellenBar` kan inte ersätta den:
  den räknar RADER (10) och SKILDA BELOPP (10), aldrig kunder, och tio rader kan vara en enda
  kunds tio fakturor. **Att koppla in den kräver ett designbeslut om identitet i moaten, inte en
  rad kod.** VD-09 låser deklarationen.

## 4 · Instrumentet var fel en tredje gång — och det syntes bara för att jag körde om det

Sonden fällde sitt eget motprov efter inkopplingen. Delvis rätt (`buildTelekomDatapoint` är inte
längre död), men `marketComparisonAllowed` blev en **falsk negativ**: dess nya docstring NÄMNER
sitt eget namn, och intern-räkningen skilde inte kod från kommentar. Samma sjukdom som en källvakt
som matchar sin egen kommentartext.

Lagat — kommentarer strippas nu. **Mätt effekt: 41 exporter i `lib/` hade sin enda «interna
användning» i en kommentar.** De tidigare talen (80, 63) var alltså producerade av ett instrument
som räknade prosa som användning; med den fixen visar samma kodbas **76**. Talen är inte direkt
jämförbara, och det ska sägas.

## Sabotage

7 riktningar, alla föll — **tre överlevde först och avslöjade äkta svaghet**: S1 (anropet fanns
kvar men blev onåbart), S5 (årskostnaden tillbaka till hela fakturan) och S7 (SIM-antalet tillbaka
som nämnare) prövades av inget test förrän vakterna skärptes. S3 krävde att felet mättes en nivå
upp: fältsatsen ligger inuti den yttre try-satsen, så utan dess catch rapporteras HELA
`storeDatapoint` som misslyckad.

Svit **2462/2462**.


---

# ADDENDUM 2 · «ÄR VI VERKLIGT SÄKRA PÅ DE 76?» — NEJ. TALET ÄR 72.

Grundaren frågade en tredje gång. Svaret är återigen nej, och den här gången gick jag igenom
instrumentets **kvarvarande antaganden systematiskt** i stället för att vänta på nästa broms.
Fyra nya fel i sonden, alla mätta:

| # | Fel i instrumentet | Mätning | Riktning |
|---|---|---|---|
| 5 | **19 `export default` räknades inte alls** | 450 exporter, inte 429 | dolde 19 |
| 6 | Krediten var **namnbaserad, inte modulbaserad** | `SKAL` finns i två moduler | dolde död kod |
| 7 | En ad-hoc-kontroll sökte `verifiers/<namn>` medan registret skriver `'./<namn>.mjs'` | «10 döda verifierare» → **0** | 10 falska positiva |
| 8 | **Hela exportrader ströks** ur intern-räkningen | `PRIS_RE` används på rad 32, som SJÄLV är en export | 4 falska positiva |

Fel 7 är **fjärde gången i rad** att ett sökvägsantagande fällde mig. Det är inte slump längre
utan instrumentets mönster. Strukturellt stängt: importens specificerare löses nu mot en verklig
sökväg (`libModulFor`), så en import krediteras den modul den faktiskt pekar på — aldrig ett namn,
aldrig en sökvägsbit.

Fel 8 hade varit det dyraste: `PRIS_RE` **används varje gång `harPris` körs**, men eftersom
användningen står på en rad som själv börjar med `export const` ströks den med deklarationen.
Sonden rapporterade levande kod som helt oanvänd. Hade jag följt listan hade jag raderat den.

**Instrumentets historik: åtta rättelser.** Motprovslistan bär nu nio poster, inklusive `PRIS_RE`
för exportrads-fällan och `klassaVaxelrad`/`cellenBar` för intern-räkningen.

## Vad talet 72 ÄR — och inte är

Det är **en undre gräns över de namn sonden granskar**, inte en lista på 72 bekräftat döda saker.
Kvarvarande, uttalade blindfläckar:

- en import räknas som användning, aldrig ett anrop → **underrapporterar**
- namn som nås via strängindex (`mod[namn]`) syns inte → **underrapporterar**
- `scripts/` klassas medvetet i egen hink (36 av de 72) — ett nattligt produktionsjobb och en
  engångssond går inte att skilja på sökvägen

**Varje post kräver sin egen mätning före radering.** Batch-fallet är beviset: det avgörande där
var inte listan utan att modulen **inte ens gick att importera** — ett bevis listan aldrig kunde ge.

Fördelning efter rättelserna: **25 testad-men-aldrig-anropad · 36 bara-skript · 11 helt oanvänd.**

---

# ADDENDUM 3 · De 27 «testad men aldrig anropad» — dömda en och en (2026-09-20)

> Grundarordern: *«Mät dem en och en, UTAN antaganden, och bevisa att de är döda (för radering)
> eller levande/isolerade (för inkoppling).»*

Hinken var 25 när ordern gavs och **27 när den utfördes** — raderingen av `fraktjaktQuote`
föräldralöste `buildQueryXml` och `parseQueryResponse` i samma modul. Kaskaden är mätt, inte gissad.

## Tre instrument, tre olika frågor — ingen av dem en textsökning

| Fråga | Instrument | Metod | Motprov |
|---|---|---|---|
| Importerar någon **produktionsmodul namnet**? | `scripts/probe-dodbevis.mjs` | ta bort `export ` → ladda om → ESM-länkfelen namnger konsumenterna | `getBenchmark` (LEVANDE) + en export sonden själv skriver in i samma fil (DÖD) |
| Har **modulen** någon produktionskonsument? | `scripts/probe-modulberoende.mjs` | döp om filen → ladda varje fil i `lib/ api/ agents/` → felen namnger de beroende | `lib/benchmark.js` (BEROENDE) + en tom nyskapad modul (ISOLERAD) |
| Anropas deklarationen **inuti sin egen modul**? | `scripts/probe-internanvandning.mjs` | döp om deklarationen → ESLint `no-undef` → träffarna namnger raderna | `decodeEntities` (INTERN, rad 550/564/565) + en nyskriven oanropad funktion (EJ INTERN) |

Det förra motprovet i `probe-dodbevis` pekade på `lib/production-monitor.js:getMetricsHistory` — en
verkligt död export. **Den raderades 20 september, alltså dog motprovet med sitt fall**, och
harnesset hade tyst förlorat sin ena riktning. Motprovet skrivs nu av sonden själv i en modul med
många importörer: samma fil måste svara LEVANDE för `getBenchmark` och DÖD för motprovet i samma
körning. Ett motprov i en tom modul hade varit sant av tomhet.

**Utfall:** 27 av 27 gav BARA TEST (ingen produktionsmodul importerar namnet), 2 av 27 gav INTERN.

## Domarna

**LEVANDE KOD, exporterad för testinsyn (2) — orörda.**
`business-intel:luhnValidOrgnr` (anropas rad 514) · `business-intel:titleSpanMatchingSld` (rad 567).
Koden KÖRS i produktion; exporten är bara fönstret sviten ser in genom.

**RADERADE (4) — var och en med tre nej: ingen produktionsimportör, ingen intern anropare, inget skript.**

- `lib/adobe-pricing.js:incVat` — enda konsumenten var ett test som prövade `incVat(exVat(x)) === x`,
  alltså en funktion vars enda syfte var att bevisa sig själv. Vi lägger aldrig på moms någonstans.
- `lib/fortnox-rightsizing.js:detectFortnoxPaket` + `fortnoxRightsizing` — kommentaren sa «tester +
  ev. äldre kod». **Det fanns ingen äldre kod.** Värre var namnkollisionen:
  `recommendation.fortnoxRightsizing` ÄR ett levande kundsynligt fält, så den som grep:ade namnet
  fick en död funktion och ett levande fält i samma träfflista. Ersatta av den leverantörsagnostiska
  `detectSaasFinancePaket`, och sviten pekar nu på `saasFinanceRightsizing` — **produktionens egen
  funktion**. Sabotage mot den fäller 13 tester; före omkopplingen prövade de ett skal ingen anropade.
- `lib/kategorinyckel.js:kanoniskKategori` — se nedan.

**INKOPPLAD (1).** `lib/verifiers/registry.mjs:allVerifierIds`. `scripts/verify.mjs` räknade upp
samma lista för hand (`VERIFIERS.map(v => v.id)`) tre rader från en funktion som gör exakt det.
Två kopior av en lista glider isär (regel 1). Grenen är KÖRD: `node scripts/verify.mjs
hittepa-verifierare` → 18 id:n, exit 2.

## Kategorinyckeln — ett påstående som var skrivet, inte kört

Modulhuvudet jag själv skrev 18 september sa: *«en lagrad legacy-nyckel som läses
(`kanoniskKategori` normaliserar vid dörren)»*. **Funktionen satt inte vid någon dörr.** Noll
produktionsimportörer, noll interna anropare, noll skript — enbart två testfiler. Bibelns egen form
från 11 september: en deklaration som ingen konsument frågar är ingen deklaration.

Och den hade inte haft något att göra vid dörren heller. Produktions-DB mätt samma dag
(`scripts/probe-kategorinyckel.mjs`, GH Actions-körning **35536143690**, 2026-09-20 20:38 UTC):

| tabell | `vaxel` | `molnvaxel` |
|---|---|---|
| `invoice_analyses` | **0** | 2 |
| `invoice_datapoints` | **0** | 4 |

Ingen lagrad rad bär aliaset, och kategoriseraren kan inte producera det (`CATEGORIES` saknar
`vaxel`). Att lägga en normalisering på varje rumsläsning för ett fall uppmätt till noll vore att
betala för ett skydd mot något som inte kan hända — **och en rad som SER ut som ett skydd utan att
vara det är sämre än ingen rad.** Kartan och `arLegacyKategori` står kvar: källtextsvepet är den
halva som faktiskt vaktar, och den vaktar där en legacy-nyckel skulle återinföras — i koden.
Blindfläcken är därmed öppen och **uttalad**, inte täckt av en funktion ingen anropar.

## De 23 som står kvar — och varför det inte är slarv

- **Vakt-facit och kontraktsdeklarationer** (`liggarvillkor:KLASSER`, `test-surface:EJ_TESTIDENTITET_SKELETT`,
  `saas-avstamning:BLINDA_TILLSTAND`, `radobservation:ORESFALT`, `valutakonvertering:EJ_PENGAR`,
  `vaktkontrakt:bedomFabriken`, `kalltextlexer:strippaStrangar`): sviten ÄR deras konsument, och det
  är hela poängen med en maskinvakt. `strippaStrangar` bär tre andra vakter.
- **Medvetet avväpnade grindar** (`kvantitetsvittne:farBaraPengar`, `fakturakolumner:arObservation`/
  `bevisarTomhet`): `farBaraPengar` var inkopplad och **revs 8 september efter en mätning** — 0 av 75
  fakturor hade radformen, 55 % av radposterna kunde aldrig bli `avlast`. KV-06 äger dokumentationen.
  Det är ett fattat beslut, inte en glömd funktion.
- **`lib/fraktjakt.js` (4 exporter)**: modulens första rad säger `ARKIVERAD. INTE I BRUK.` med ett
  motiverat arkitekturbeslut (Fraktjakts VD, 2026-06-17). Modulen och dess enda konsument — testet —
  är ÖVERENS om vad den är. Inget att rätta.
- **`lib/fakturabalans.js:bedomFakturabalans`**: `api/test-invoice.mjs` rad 702 skriver ut i klartext
  att modulen står kvar som SPECIFIKATION.
- **Aliaskonstanter** (`switcharvode:ARVODESSATS = ARVO_FEE_RATE`,
  `fraktjakt:FRAKTJAKT_QUERY_ENDPOINT = QUERY_ENDPOINT`): ett andra namn på en sanning, öppnat bara
  för sviten. Låg risk, men noterat — nästa gång ett av dem rörs är rätt drag att ta bort skalet.
- `schema-guard:lintToolSchema`, `tystnadsskal:tystnadsgrund`, `telekom-normalize:marketComparisonAllowed`:
  de två första är verktyg för sviten; den tredje bär redan sin egen uttalade dom i modulen
  (k-anonymitet kräver ett identitetsbeslut i moaten, inte en rad kod).

**Kvarvarande skuld, uttalad:** det kundsynliga fältet heter fortfarande
`recommendation.fortnoxRightsizing` medan motorn är leverantörsagnostisk — en Visma-kund får sin
rådgivning under ett Fortnox-namn. Det är en [KUND]-ändring som rör `api/test-invoice.mjs`,
`agents/recommender/recommend.js` OCH `src/pages/TestaFaktura/index.js` i samma commit, och den
görs inte i en städrunda.

**Fördelning efter addendum 3: 23 testad-men-aldrig-anropad · 37 bara-skript · 0 helt oanvänd.**
Exporter i `lib/`: **447 → 436.**
