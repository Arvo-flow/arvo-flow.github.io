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

Ingen fil i repot importerar någondera. De nämns dessutom **inte en enda gång** i `CLAUDE.md`,
`ops/*.md` eller `package.json` — alltså inte heller planerat arbete. `batch-processor` importerar i
sin tur `checkSupplierFingerprint`, vilket gör att den *ser* aktiv ut i en grep.

**Radering är grundarens beslut, inte kodens** (samma regel som de 14 datapunkterna 21 augusti).
Rekommendation: radera. Risken är noll enligt mätningen; kostnaden är att en påbörjad
Batch-API-väg måste skrivas om från grunden om den ska tas upp igen.

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
