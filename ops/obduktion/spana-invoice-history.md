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
