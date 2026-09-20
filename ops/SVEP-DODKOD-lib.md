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
