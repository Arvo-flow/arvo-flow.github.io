# Spaning: invoice-history (kontorets datadörr)

Område: `api/invoice-history.mjs` + `src/lib/holdings.js` (`roomCounts`) + `src/pages/Portfolio/index.js`.
Felfamiljen som söks: *ett tillstånd som betyder «okänt / misslyckades / inte mätt», representerat
med ett värde som är omöjligt att skilja från ett giltigt svar.*

Status: pågående. Hypoteserna skrivs in löpande, INNAN de är prövade, och får sin dom efter körning.

---

## H1 — Branschankaret gissar `employees: 5` när `seat_count` saknas, under en kommentar som lovar motsatsen

**Fil:rad:** `api/invoice-history.mjs:482-485`

**Påstående:** `getPublicListBenchmark({ employees: ... ? a.seat_count : 5 })` ersätter ett OKÄNT
enhetsantal med talet 5, vilket för storleksberoende kategorier (loneadmin) väljer ett annat golv än
kundens verkliga band — och kommentaren tre rader upp intygar uttryckligen att «seat_count är
enheterna ur kundens egen faktura — aldrig en gissad personalstyrka».

**Bevis:**
```
node -e "import('./lib/benchmark.js').then(m=>{for(const e of [5,12,40,200])
  console.log(e, JSON.stringify(m.getPublicListBenchmark({category:'loneadmin',employees:e})))})"
```
Utfall: `emp=5 → median 778 · p25 778`, `emp=12 → 419`, `emp=40 → 419`, `emp=200 → 324`.

**Dom: håller (begränsad skada)**

**Domskäl:** Talet 778 kr/anställd/år är **86 % högre** än 419, och skillnaden beror ENBART på den
påhittade femman. Kortet skriver ut talet med `lastVerified` («verifierat 22 maj») och
`referensProdukt` («Fortnox Lön») — alltså med full proveniensauktoritet, fast bandet är gissat.
Begränsningen: `byggPrisunderlag` kräver `seats > 0` (lib/prisunderlag.js:54) och `seats` sätts till
`null` i samma block, så ingen kundjämförelse och inget score byggs på gissningen — den syns bara i
ankarkortets eget tal. Riktningen är dessutom den försiktiga (för högt golv → mindre påstådd
överbetalning). Men regel 3 känner ingen avvägning: talet är osourcat och står som verifierat.
De tre andra ankarkategorierna (`saas-productivity`, `mobil`) är storleksokänsliga, så bara
`loneadmin` bär felet i dag — precis den kategori som lades till i allowlistan 2026-08-19.

---

## H2 — Den degraderade läsvägen tappar `triage_reason` och flyttar bevakade fakturor till prissatta

**Fil:rad:** `lib/invoice-store.js:268-284` / `335-350` mot `api/invoice-history.mjs:128-135`.

**Bevis:**
```
grep -n "storeTriaged" -A 3 api/test-invoice.mjs | grep -o "route: *'[a-z_]*'" | sort | uniq -c
```
Utfall: `15 route: 'review_queue'`, `4 route: 'unsupported'` — inget annat.

**Dom: refuterad (för liggardelningen), håller (för kortets skäl)**

**Domskäl:** Varje triage-utgång sätter en väg som ligger i `TRIAGE_ROUTES`, och `route` överlever
reservsatsen. Liggaren delas alltså rätt även degraderat. MEN reservsatsen SELECT:ar inte
`triage_reason`, så `watchedCard` får `reason = route` = ett bart vägnamn → `oklartSkal === true`.
Då är «vi kunde inte läsa skälet» **omöjligt att skilja** från «raden lagrades utan skäl», och
namn-grenen (`oklartSkal && INTL_SAAS`) får fritt fram att påstå ett valutaskäl för en Slack-faktura
vars verkliga skäl var t.ex. `fingerprint_mismatch`. Reserven loggar visserligen (regel: ingen tyst
reserv), men KUNDYTAN får ett påstått skäl ur en läsning som inte mätte skälet. Se H4/H5 för hur
mycket grenen kan påstå på enbart namn.

---

## H3 — Elnätsgrenens SKÄL-villkor (`reason.includes('elnat')`) kan aldrig matcha någon kod pipelinen producerar

**Fil:rad:** `api/invoice-history.mjs:345`

**Påstående:** Grenen accepterar skälet `elnat`, men `api/test-invoice.mjs` lagrar koden `natavgift`.
Alltså finns ingen produktionskod som når grenen via SKÄLET — den kan bara nås via
LEVERANTÖRSNAMNET, vilket är exakt den inversion som 2026-08-14-regeln i samma fil förbjuder
(«SKÄLET STYR, ALDRIG NAMNET»).

**Bevis:**
```
grep -n "storeTriaged" -A 4 api/test-invoice.mjs | grep -o "reason: *[^,]*" | sort -u
node -e "import('./api/invoice-history.mjs').then(({watchedCard})=>{
  for (const s of ['Ellevio AB','Kraftringen Nät AB','Jönköping Energi Nät AB'])
    console.log(s, '=>', watchedCard({triage_reason:'natavgift',route:'review_queue',supplier:s}).kind)})"
```
Utfall: koderna är `natavgift` (aldrig `elnat`). `Ellevio AB → Reglerad nätkostnad`;
`Kraftringen Nät AB → Under granskning`; `Jönköping Energi Nät AB → Under granskning`.

**Dom: håller**

**Domskäl:** Sverige har ~170 elnätsbolag. Tre namn står i regexen. För alla andra faller ett
KÄNT och sant skäl («reglerad nätkostnad, går inte att byta») ned till reservkortet, som säger
*«Skälet är tekniskt, och vi översätter det hellre inte till ett påstående om ert avtal»* — vilket
är osant: skälet är inte tekniskt, det är regulatoriskt, och det är enligt bibeln (Bokföringsplikten,
Ellevio-fallet) buntens vassaste drag. Vi gör vårt bästa beslut oläsbart för kunden. Testet BK-05
använder just `Ellevio AB` och är därför grönt över hålet.

---

## H4 — `e\.?on` och `\.se$` är oankrade och gör godtyckliga leverantörer till «Reglerad nätkostnad» / «Fragmenterad marknad»

**Fil:rad:** `api/invoice-history.mjs:345` och `:350`

**Bevis:**
```
node -e "import('./api/invoice-history.mjs').then(({watchedCard})=>{
  for (const [s,r] of [['Leonardo Consulting AB','no_benchmark'],['Pantheon Media','no_benchmark'],
    ['Neonode AB','no_benchmark'],['Simeon Städ AB','no_benchmark'],['Aeon Retail','review_queue'],
    ['bokio.se','no_benchmark'],['Tidningen Affärsvärlden.se','no_benchmark']])
    console.log(s,'|',r,'=>',watchedCard({triage_reason:r,route:'review_queue',supplier:s}).kind)})"
```
Utfall:
```
Leonardo Consulting AB | no_benchmark => Reglerad nätkostnad
Pantheon Media         | no_benchmark => Reglerad nätkostnad
Neonode AB             | no_benchmark => Reglerad nätkostnad
Simeon Städ AB         | no_benchmark => Reglerad nätkostnad
Aeon Retail            | review_queue => Reglerad nätkostnad
bokio.se               | no_benchmark => Fragmenterad marknad
Tidningen Affärsvärlden.se | no_benchmark => Fragmenterad marknad
```

**Dom: håller**

**Domskäl:** `/e\.?on/` matchar delsträngen «eon» var som helst i ett gemener-satt
leverantörsnamn — Leonardo, Pantheon, Neonode (ett verkligt svenskt börsbolag), Simeon, Aeon.
Kunden får läsa **«Elnätet går inte att byta — men vi bevakar tariffen»** om en konsultfaktura, och
grenen ligger FÖRE `no_benchmark`-grenen, så den överrider ett skäl vi faktiskt hade. Det är
ordagrant den form BK-07 (reservkortet) byggdes mot, bara i en gren som fyrar tidigare. `\.se$`
gör detsamma för varje leverantör vars namn slutar på `.se` — Bokio är ett bokföringssystem, inte
ett webbhotell, och vi påstår i klartext att det ligger i «en splittrad marknad utan ett verifierat
svenskt golv».

---

## H5 — Elhandel (Nivå 1 i bibeln, «Arvo avfyrar») får beskedet att det inte går att byta

**Fil:rad:** `api/invoice-history.mjs:345-349`

**Bevis:**
```
node -e "import('./api/invoice-history.mjs').then(({watchedCard})=>{
  for (const [s,r] of [['Vattenfall Försäljning AB','volume_data_required'],
    ['E.ON Försäljning Sverige AB','el_data_missing'],['Vattenfall AB','el_data_missing']])
    console.log(s,'=>',watchedCard({triage_reason:r,route:'review_queue',supplier:s,category:'el'}).headline)})"
```
Utfall: alla tre → `Elnätet går inte att byta — men vi bevakar tariffen`, med detaljen
«Elnätsavgiften är en reglerad monopolkostnad utan marknad att byta till. Att lova en besparing
vore oärligt.»

**Dom: håller**

**Domskäl:** Vattenfall och E.ON säljer BÅDE reglerat elnät och konkurrensutsatt **elhandel**.
Grenen skiljer dem inte åt — den ser bara namnet. `el` är dessutom en av bibelns Nivå 1-kategorier
där «Arvo avfyrar» och bytet är lagstadgat systematiserat. Vi säger alltså till en kund att det
inte finns någon marknad att byta till, i exakt den kategori där vi lovar att genomföra bytet.
Detta är den dyraste riktningen att ha fel åt: kunden avskriver en verklig besparing på vårt ord.
Skälen som utlöser det (`el_data_missing`, `volume_data_required`) betyder «vi kunde inte mäta» —
och blir här ett substantiellt marknadspåstående. Felfamiljen, rakt igenom.

---

## H6 — `reason.includes('lineSum')` kan aldrig matcha (skälet är gemener-satt)

**Fil:rad:** `api/invoice-history.mjs:278` (`.toLowerCase()`) mot `:312` (`reason.includes('lineSum')`)

**Bevis:**
```
node -e "import('./api/invoice-history.mjs').then(({watchedCard})=>{
  console.log(watchedCard({triage_reason:'lineSum mismatch',route:'review_queue',supplier:'Okänd AB'}).kind)})"
```

**Dom:** *körs nedan*

**Dom (H6): håller (död kod, ingen kundskada)**

**Domskäl:** `reason` är gemener-satt på rad 278; literalen `'lineSum'` bär versal S och kan aldrig
finnas i den strängen. Utfall: `"lineSum mismatch" → Under granskning`, `"linesum" → Under granskning`,
`"radsumma 100 ≠ 200" → Fakturan går inte ihop`. Den verkliga koden är
`Ring1: radsumma X kr ≠ fakturatotal Y kr (avvikelse Z kr)` (`agents/test-invoice/extract.js:1108`),
alltså fångas fallet av `radsumma`/`≠`. Villkoret är ett tredje lås på en dörr som redan har två —
men det ser ut som täckning och gör att ingen upptäcker om skälsformatet en dag byter till en
engelsk kod. Samma form som «vaktens deklaration som glidit isär från nyckeln».

---

## H7 — «Innehavet · N prissatta leverantörer» räknar FAKTUROR under en etikett som säger leverantörer

**Fil:rad:** `src/pages/Portfolio/index.js:1205-1208` (mot `src/lib/holdings.js:112-130`)

**Påstående:** När `counts.mottagna === 0` skriver rubriken `${counts.prissatta} prissatta
leverantörer` — men `counts.prissatta` räknar auto-ANALYSER med prisunderlag, medan raderna under
är `groupBySupplier`-grupper (leverantör + kategori). Tre Telia-fakturor ger «3 prissatta
leverantörer» ovanför ETT kort.

**Bevis:**
```
node -e "import('./src/lib/holdings.js').then(({roomCounts,groupBySupplier})=>{
 const u={perEnhet:1000,golv:900};
 const rows=[{id:1,normalized_supplier:'Telia Sverige AB',category:'mobil',created_at:'2026-08-01',prisunderlag:u},
             {id:2,normalized_supplier:'Telia Företag',category:'mobil',created_at:'2026-08-10',prisunderlag:u},
             {id:3,normalized_supplier:'Telia',category:'mobil',created_at:'2026-08-20',prisunderlag:u}];
 console.log(roomCounts({autoAnalyses:rows,watched:[]}), groupBySupplier(rows).length)})"
```
Utfall: `{ fakturor: 3, prissatta: 3, mottagna: 0, bevakade: 0 }` och `suppliers = 1`.

**Dom: håller**

**Domskäl:** Detta är ordagrant felet 2026-08-15-granskningen namngav — *«Stacken blandade enheter:
"Leverantörer" räknade leverantörer, "Prissatta" räknade ANALYSER»* — och regeln som föll ut
(«varje tal i en yta ska ha en enhet, och tal som står bredvid varandra ska gå att addera»).
Fixen landade i RADARN (`roomCounts`, testlåst i `tests/rumsredovisning.mjs`) och lämnade
innehavsrubriken kvar. Grenen är dessutom den VANLIGA: den fyrar när allt är prissatt, alltså i
det friska rummet. Kanoniseringen av leverantörsnamn (`SUPPLIER_ALIASES`) gör gapet större, inte
mindre — den finns just för att slå ihop Telia-varianter till ett kort.

---

## H8 — Bortfallsräknaren returnerar 0 vid databasfel, i den yta vars uttalade syfte är att inget tapp ska vara tyst

**Fil:rad:** `lib/ingest-queue.js:225-232` och `:214-221`, konsumerade i
`api/invoice-history.mjs:266-269` → `src/pages/Portfolio/index.js:774-796`

**Påstående:** `failedCountBySender` och `pendingCountBySender` har `catch { return 0; }` UTAN
loggning. «Vi kunde inte mäta bortfallet» blir därmed identiskt med «noll fakturor föll», och
rummets ärliga bortfallsbanner (`ingestFailed > 0 && …`) släcks tyst.

**Bevis:**
```
grep -n "pendingCountBySender\|failedCountBySender\|failedFilesBySender" -A 10 lib/ingest-queue.js
```
Utfall: rad 220 `} catch { return 0; }`, rad 231 `} catch { return 0; }`. Jämför rad 243 där
`failedFilesBySender` gör `catch (err) { console.error(...); return []; }` — samma modul, tre rader
ned, gör rätt.

**Dom: håller**

**Domskäl:** Kommentaren rakt ovanför `failedCountBySender` (rad 224) lyder *«Tyst tapp är
oacceptabelt: kunden ska veta att N inte gick igenom, inte tro att de finns»* — en kommentar som
intygar en invariant koden inte håller, exakt formen bibeln varnar för (2026-08-22). Talet 0 ligger
dessutom mitt i det giltiga intervallet: ett uppmätt noll och ett omätt noll ritas identiskt.
Skadan är riktad åt fel håll — kunden som mejlade tio fakturor och fick sju får INGET besked, och
«Försök igen»-knappen renderas aldrig. Samma sak för `ingesting`: 0 = «inget på väg» tystar
pollningen (`index.js:325 if (ingesting <= 0) return undefined`), så rummet slutar uppdatera sig.

---

## H9 — Magic-tokenuppslaget sväljer databasfel och rummet faller tyst tillbaka till ENHETENS historik

**Fil:rad:** `api/invoice-history.mjs:41-53` (`emailFromMagic`, `} catch { return null; }`) mot
`:112-116` (`identitetBevisad`).

**Påstående:** Ett kastande tokenuppslag ger `email = null` → `identitetBevisad = false` → merge:n
tar in `byFp`, alltså webbläsarens hela historik. Det är precis den bugg grundarbeslutet
2026-08-14 skrevs för (elva leverantörer och en iPad han aldrig skickat), återinförd som felläge.

**Bevis:** *körs nedan*

**Bevis (H9) — hela handlern körd med `magic_tokens` oläsbar men `invoice_analyses` frisk:**
```
node --experimental-test-module-mocks scratchpad/h9.mjs
# mockar lib/db.js: kastar på magic_tokens, svarar med enhetens rader på invoice_analyses
```
Utfall:
```
status: 200
email i svaret: undefined
antal analyser som visas: 1 → leverantörer: [ 'Dustin' ]
frånDennaEnhet (det ärliga separat-talet): 0
```
Noll rader på stderr.

**Dom: håller**

**Domskäl:** Kunden klickar sin magic-länk, får 200, och rummet fyller sig med WEBBLÄSARENS
historik — precis det grundaren såg 2026-08-14 (elva leverantörer och en iPad han aldrig skickat).
Det ärliga separat-talet `frånDennaEnhet` läser **0**, eftersom det är grindat på `identitetBevisad`;
fältet som byggdes för att göra sammanblandningen synlig blir alltså tyst just i det läge där den
sker. Ingen loggrad: `} catch { return null; }` (rad 52) sväljer felet utan `console.error`, till
skillnad från analys-läsningen 40 rader ned som uttryckligen loggar och svarar 503 med
motiveringen «ett tomt rum får aldrig betyda att vi inte kunde läsa». Samma modul, motsatt
disciplin. Scenariot kräver inte ett totalt DB-haveri: en miljö där `magic_tokens`-migreringen
aldrig kördes ger exakt detta, varje gång, för alltid — och tyst.

---

## H10 — Om-vakten mäter INTAGSDATUM, inte fakturadatum, och larmar därför på en bunt gamla mejlade fakturor

**Fil:rad:** `api/invoice-history.mjs:171-181`

**Påstående:** `new Date(b.created_at) > exit` jämför utträdesdatumet mot när ANALYSEN skapades
(uppladdnings-/intagstidpunkten), inte mot fakturans period. Kundens huvudväg är enligt bibeln att
mejla in 50–100 gamla fakturor på en gång — alla får `created_at = i dag`. En kund som sade upp i
januari och i augusti mejlar in sitt arkiv får därmed larmet «ni sade upp, men leverantören
fakturerar fortfarande».

**Bevis:** *(hela handlern körd; båda raderna intagna samma minut, avtalet uppsagt 2026-01-31)*
```
node --experimental-test-module-mocks scratchpad/h17.mjs
```
Utfall:
```
B · kundStatus: —       · omVaktLarm: false
A · kundStatus: uppsagd · omVaktLarm: true
```

**Dom: håller**

**Domskäl:** Rad B har `created_at = 2026-08-20T09:05Z` — fem minuter efter rad A, alltså samma
bunt. Ingenting i raden säger vilken PERIOD fakturan avser; `invoice_analyses`-läsningen hämtar
inget fakturadatum alls (SELECT:en bär `billing_period` och `contract_end_date`, aldrig ett
fakturadatum). Vakten kan alltså inte mäta det den påstår sig mäta. Kommentaren kallar det
«samma liggar-delta-princip som success fee», men liggardeltat i success fee mäter när posten
uppstod hos leverantören — här mäts när PDF:en nådde oss. Riktningen är den dyra: ett falskt
«leverantören fakturerar fortfarande» får kunden att ringa en leverantör som gjort rätt, och nästa
äkta larm väger mindre (smyghöjningsvaktens dödsorsak).

---

## H11 — Marknadsankarets kort hävdar ett avstånd även när `kraverBekraftadNiva` är sant

**Fil:rad:** `src/pages/Portfolio/index.js:1078` (och texten på 1114-1119, 1147-1151) mot
`lib/prisunderlag.js:74,96-97` och `api/invoice-history.mjs:503`.

**Påstående:** `overList = comparable && perEnhet > branchAnchor.median` läser aldrig
`branchAnchor.kraverBekraftadNiva`, trots att fältet transporteras just för att stoppa påståendet.
En Microsoft 365 E5-kund (7 694 kr/anv/år, exakt listpris) mäts mot kategorins Business
Standard-tal och får läsa «ni ligger över leverantörens eget listpris».

**Bevis:**
```
node -e "import('./api/invoice-history.mjs').then(async({buildBranchAnchors})=>console.log(
  JSON.stringify(await buildBranchAnchors([{route:'auto',category:'saas-productivity',
  supplier:'Google Ireland Ltd',normalized_supplier:'Google',seat_count:10,annual_cost:24000}]),null,1)))"
```
Utfall: `median 1927 · kraverBekraftadNiva true · referensProdukt "Microsoft 365 Business Standard"`.
Med `annual_cost 24000 / 10 platser = 2 400 kr` blir `overList = true` i kortet.

**Dom: håller**

**Domskäl:** Granskningen 2026-08-20 mätte spännvidden i kategorin till 9,6 gånger och slog fast
att ett avstånd inte får hävdas utan bekräftad nivå; fixen landade i `byggPrisunderlag`
(`ovissNiva` → `avstandPct: null`, `underGolv: null`) och i scoren. Ankarkortet är den TREDJE
konsumenten av samma jämförelse och gick kvar den gamla vägen — «en fix som inte följs till alla
konsumenter är en halv fix», ordagrant. 6 av 7 uppmätta rader saknade bekräftad nivå, så grenen är
inte ett kantfall.

---

## H12 — Marknadsankarets kort kallar talet «Leverantörens publika listpris» utan att namnge produkten

**Fil:rad:** `src/pages/Portfolio/index.js:1117, 1119, 1145, 1159` (fältet finns på
`api/invoice-history.mjs:500`, renderas aldrig i det här kortet).

**Bevis:** samma körning som H11 — ankaret bär `referensProdukt: "Microsoft 365 Business Standard"`
för en rad vars leverantör är **Google**. `grep -rn "referensProdukt" src/` visar fyra träffar:
`src/lib/holdings.js:189,195,201` (domsprosan) och `src/pages/Portfolio/index.js:1294`
(innehavsraden) — ingen i Marknadsankaret.

**Dom: håller**

**Domskäl:** Kortet skriver ut «Leverantörens publika listpris är 1 927 kr» bredvid kundens
Google-rad. Talet är Microsofts. Läxan 2026-08-18 lyder ordagrant: *«Ett pris utan produkt är ett
tal utan påstående … "Billigaste publicerade pris 1 606 kr" på en Google Workspace-rad läses av
varje finansdirektör som Googles pris.»* MK-08 kräver `referensProdukt` av prisboken och
`byggPrisunderlag` bär det vidare — men vakten prövar prisboken och underlaget, inte det kort
kunden faktiskt ser. Formuleringen här är dessutom värre än den som fälldes: possessivet
«**Leverantörens**» attribuerar aktivt talet till kundens egen leverantör.
