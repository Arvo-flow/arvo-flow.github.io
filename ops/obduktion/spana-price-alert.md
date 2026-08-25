# Obduktion — område: price-alert

Filer: `lib/price-alert.js` · `lib/price-alert-store.js` · `api/cron/run-price-alerts.mjs`
(+ syskonvägen `scripts/notify-price-changes.mjs` och `lib/price-impact.js`, som bär samma kod)

Felfamiljen vi letar efter: *ett tillstånd som betyder "okänt / misslyckades / inte mätt",
representerat med ett värde som är omöjligt att skilja från ett giltigt svar.*

Status: PÅGÅENDE (skrivs inkrementellt).

---

## H1 — Alertmailet KRASCHAR exakt när den kollektiva sanningen finns

**Fil:rad:** `api/cron/run-price-alerts.mjs:208` (signaturen) + `:216` (användningen);
identiskt i `scripts/notify-price-changes.mjs:300` + `:349`.

**Påstående:** `buildAlertEmail(...)` läser variabeln `category`, som inte är en parameter
och inte finns i modulscopet — så i det ögonblick `segStats.total >= 3` (d.v.s. när
nätverkseffekten faktiskt bär) kastar funktionen `ReferenceError` i stället för att
rendera moat-meningen, och eftersom anropet ligger UTANFÖR try-blocket (rad 188, try
börjar rad 190) rivs hela larmkörningen: ingen kund i någon grupp får mail, och
`markAlertSent` skrivs aldrig.

**Körbart bevis:**
```
node -e "…kopiera api/cron/run-price-alerts.mjs till /tmp med absoluta lib-importer + export { buildAlertEmail }…"
node /tmp/pa/t1.mjs
```
Utfall:
```
A total=2  → OK, längd 3254
B total=14 → KRASCH: ReferenceError: category is not defined
```

**Dom:** **haller**

**Domskäl:** Utfallet är körd kod, inte läsning. `category` är block-scopad i for-of-loopen
i handlern (`for (const [, { keyword, category, items }] of alertGroups)`); en
funktionsdeklaration på modulnivå ser den aldrig. Grenen är dessutom *databeroende på ett
bakvänt sätt*: med få kunder i kategorin (`total < 3`) är `segLine` tom sträng och allt
fungerar; **ju mer nätverksdata vi samlar, desto säkrare kraschar larmet.** Exakt samma
form som ankarets "ju mer nätverksdata desto oftare tystnade moaten" (bibeln 15 aug), men
värre: här är utfallet inte tystnad utan totalt bortfall av larmet.
Kontrollprov: `buildPriceAlertInsight` i samma syskonfil TAR `category` som parameter
(`scripts/notify-price-changes.mjs:250`) — alltså är det just mail-renderaren som tappade
den, i båda kopiorna.

Sidoanmärkning (regel 1): två handskrivna kopior av samma mail-pipeline (`api/cron/…` och
`scripts/notify-price-changes.mjs`) bär samma bugg på var sitt radnummer. Den kända skulden
"dubbla alertvägar" är alltså inte bara duplicering — den har redan reproducerat ett fel.

### H1, förstärkt bevis: end-to-end i den LIVE-routade kundvägen

GH Actions kör `scripts/notify-price-changes.mjs` (`price-monitor.yml:376`), inte
`api/cron/run-price-alerts.mjs`. Hela skriptet kördes med stubbade `db`/`price-alert-store`/
`resend` (koden i skriptet självt orörd) mot en riktig rapportform:

```
# segStats.total = 14  (moaten bär)
RESEND_API_KEY=fake node /tmp/pa/notify-live.mjs /tmp/pa/report.json
  👥 1 berörd(a) kund(er)
  📊 Segmentstatistik: 8 av 14 bolag
  ReferenceError: category is not defined
      at buildAlertEmail (notify-price-changes.mjs:349:86)
      at notify-price-changes.mjs:215:18       ← utanför try → processen dör, exit 1

# segStats.total = 2  (moaten bär inte)
  📊 Segmentstatistik: 1 av 2 bolag
  [stub] MAIL SKICKAT: Tele2: +24 000 kr/år — Arvo har detekterat en prishöjning
  Klart: 1 skickade, 0 överhoppade, 0 misslyckades   EXIT=0
```

Kontrafaktiskt bevisat: **samma larm, samma kund, samma pris — enda skillnaden är hur många
bolag vi följer i kategorin.** Under tröskeln levereras larmet; över tröskeln dör körningen
och ingen kund i NÅGON grupp får sitt mail (loopen avbryts, `markAlertSent` skrivs aldrig).
Steget bär inte `continue-on-error`, så jobbet blir rött — det är den enda förmildrande
omständigheten: felet är högljutt, inte tyst. Men produkten (kundlarmet) uteblir.

---

## H2 — Haiku-svaret valideras aldrig: fem sätt att få ett påhittat kr/år-tal i kundens inkorg

**Fil:rad:** `scripts/price-monitor.mjs:575` (`alert.haiku = haiku`, rått AI-JSON, ingen
schemakontroll) → `scripts/notify-price-changes.mjs:144-157` → `lib/price-impact.js:20-27`
(`switch (unit) { … default: return kr; }`).

**Påstående:** allt som Haiku svarar går orört in i en kundsynlig kr/år-siffra; varje
tillstånd som betyder "modellen kunde inte mäta" (fält saknas, enhet utanför enum, tom
sträng, låg konfidens) blir ett giltigt tal i stället för tystnad.

**Körbart bevis:** hela `notify-price-changes.mjs` kört med stubbad db/store/resend, en
rapport per fall:

```
A) haiku saknas HELT (modellen svarade inte / ANTHROPIC_API_KEY saknas)
   → MAIL: "Arvo har noterat en prisändring hos Tele2"           ← larm utan mätning
B) actionRequired='verify_manually', confidence=0.10
   → MAIL: "Tele2: +24 000 kr/år — Arvo har detekterat en prishöjning"
C) extractedUnit='per_month' (utanför promptens enum)
   → MAIL: "Tele2: +1 578 720 kr/år"        (3 588 kr/ÅR läst som kr/mån)
D) extractedUnit saknas → ärver currentUnit
   → MAIL: "Tele2: +1 578 720 kr/år"        (samma, via `?? currentUnit`)
E) extractedCurrency='usd' (gemener) — 15→18 USD, en HÖJNING
   → MAIL: "Tele2 sänkte priset — 66 384 kr/år påverkan"   ← TECKNET VÄNT
   facit med 'USD': "+15 005 kr/år — prishöjning"
F) extractedNumeric='' (tom sträng)
   → MAIL: "Tele2 sänkte priset — 143 520 kr/år påverkan"
G) extractedUnit='percentage' (finns i promptens egen enum!)
   → 1,95 % behandlas som 1,95 kr/säte/mån → "+96 kr/år"
```

**Dom:** **haller** (samtliga sju grenar körda och observerade)

**Domskäl:**
- **A** är felfamiljen på pipelinenivå: `alerts.filter(a => a.haiku?.actionRequired !== 'false_positive')`
  släpper igenom `a.haiku === undefined`, eftersom `undefined !== 'false_positive'`. "AI:n
  kunde inte mäta" är alltså omöjlig att skilja från "AI:n bekräftade en ändring" — exakt
  samma form som den saknade konfidenspoäng som routades till `auto`.
- **B** är tyngst strategiskt: `confidence` läses **ingenstans** i kundvägen
  (`grep -n confidence api/cron/run-price-alerts.mjs scripts/notify-price-changes.mjs` → tomt).
  Verifieringsjuryn (`gConfidence ≥ 0,85`, stabilitet över ≥2 nätter, konsensus) gatar
  `verify-price-changes.mjs`, alltså vad vi SKRIVER TILL VÅR EGEN PRISBOK. Kundmailet går
  förbi juryn helt. **Vi ställer hårdare beviskrav på vad vi lagrar internt än på vad vi
  påstår för kunden** — bakvänt mot regel 3 och mot juryns egen asymmetri-motivering.
  `verify_manually` betyder ordagrant "oklar situation, manuell koll krävs" och blir ändå
  "Arvo har detekterat en prishöjning".
- **C/D/G** är `default: return kr` i `toKrPerSeatMonth`: en okänd eller icke-hanterad enhet
  tolkas som kr/säte/månad. `percentage` står i promptens egen lista över tillåtna svar och
  har ingen `case` — en procentsats blir kronor. Notera asymmetrin: `parseCheckPrice` avvisar
  uttryckligen procent och intervall på det GAMLA priset ("dessa kan inte beräknas exakt"),
  medan det NYA priset saknar samma spärr. Samma sorts värde, avvisat på ena sidan av
  subtraktionen och accepterat på den andra.
- **E** är den farligaste enskilda: skillnaden mellan `'USD'` och `'usd'` vänder påståendets
  TECKEN. Samma faktiska höjning rapporteras som en sänkning på 66 384 kr. `if (currency === 'USD')`
  är skiftlägeskänslig utan att någon normaliserar. (Att modellen *brukar* skriva versaler är
  inte en kontroll — det är tur.)
- **F**: `haiku?.extractedNumeric != null` släpper igenom `''`, och `isNaN('')` är `false`,
  så tomma strängen blir 0 kr → "−100 %" → ett påstått prisfall på hela beloppet.

Notera vad som INTE är trasigt: `checkSource` skiljer redan "oavgörlig sida" (`warning`,
hoppas över) från "prissträng inte hittad" (`alert`). Grinden finns alltså på sidnivå — den
saknas på svarsnivå.

---

## H3 — `supplier_prices` skapas av TVÅ migrationer med oförenliga scheman; i bibelns dokumenterade ordning kan smyghöjningsvakten aldrig fyra

**Fil:rad:** `scripts/migrate.mjs:236` (fakturagraf-formen) vs
`scripts/migrate-price-db.mjs:32` (prisbok-formen) — båda `CREATE TABLE IF NOT EXISTS`,
samma tabellnamn. Konsument: `lib/price-alert.js:24-33`.

**Påstående:** kör man migrationerna i den ordning bibeln föreskriver ("Alla tabeller skapas
av `migrate.mjs` + `migrate-v2.mjs` + `migrate-price-db.mjs` + `migrate-prospects.mjs`. Kör i
ordning vid ny miljö") vinner fakturagraf-formen, den andra `CREATE` blir en tyst no-op, och
`detectPriceAlert`s fråga kastar på varje anrop — vilket `catch`-en på rad 51 översätter till
`null`, d.v.s. "kunden betalar inte över listpris".

**Körbart bevis:** riktig PostgreSQL 16 startad lokalt, exakt SQL ur båda filerna i
dokumenterad ordning:

```
psql: NOTICE:  relation "supplier_prices" already exists, skipping
kolumner: id, supplier_id, segment, size_bucket, price_per_seat, annual_cost,
          seats, invoice_date, source, created_at
-- detectPriceAlert:24-33, ordagrant:
ERROR:  column "price_monthly" does not exist
-- lib/invoice-graph.js:57:
ERROR:  relation "graph_supplier_prices" does not exist
```

**Dom:** **haller** för koden · **kunde-inte-provas** för produktionens faktiska tillstånd
(ingen `DATABASE_URL` i den här sandlådan).

**Domskäl:** `CREATE TABLE IF NOT EXISTS` är en no-op mot ett befintligt namn — bevisat av
NOTICE-raden, inte antaget. `migrate-price-db.mjs` har **noll** `ALTER TABLE … ADD COLUMN`
för `supplier_prices`, så den kan aldrig läka en tabell som redan finns i fel form; den
motsatta ordningen läker däremot (migrate.mjs *har* ADD COLUMN för sina fält). Ordningen
avgör alltså vilken av de två konsumenterna som är död — och båda dör i ett `catch` med
`console.warn`, aldrig i en yta.
Andra fyndet i samma bevis: `graph_supplier_prices` (som `lib/invoice-graph.js` skriver till)
skapas av **ingen** av de fyra dokumenterade migrationerna — bara av `api/admin/run-migration.mjs`.
Det är en TREDJE, divergerande schemakälla. Kollisionen är alltså redan upptäckt en gång och
lagad på ett ställe; `scripts/migrate.mjs` bär kvar den gamla formen.
Detta är villkorsvaktens sjukdom (Verifieringsplikten p.5) i modulen som *heter*
smyghöjningsdetektion: testerna kan bevisa att mekanismen svarar, aldrig att signalen kan röra sig.

---

## H4 — `supplier_prices` är en ANDRA prisbok som ingen verifierare läser, stämplad "verifierat" med datum från maj

**Fil:rad:** `scripts/seed-price-db.mjs` (46 `seed(...)`-poster) · läses av `lib/price-alert.js:25`
som returnerar fältet `verifiedListPriceMonthly` + `lastVerified`.

**Påstående:** hela verifierarapparaten (20 vakter, `price-audit`, veckoschemat
`verify-sources.yml`) läser `licenseTierBenchmarks` i `branchindex.js`. `detectPriceAlert`
jämför kunden mot `supplier_prices` — ett objekt ingen av dem rör.

**Körbart bevis:**
```
grep -rn "supplier_prices" scripts/price-audit.mjs lib/verifiers/ scripts/verify.mjs
  → (tomt)
grep -o "lastVerified: '[0-9-]*'" scripts/seed-price-db.mjs | sort | uniq -c
  20 '2026-05-01'   16 '2026-05-22'   5 '2026-05-27'   2 '2026-05-28'   3 '2026-06-14'
```

**Dom:** **haller**

**Domskäl:** Noll träffar är här ett giltigt mätvärde, för frågan är "läser någon verifierare
den här tabellen?" och filerna finns och innehåller andra träffbara strängar. Samtliga 46
poster bär ett `lastVerified` mellan 1 maj och 14 juni; i dag är det 25 augusti — 72 till 116
dygn. Smyghöjningsincidenten 5 augusti handlade om **16** dygns drift i den prisbok som *var*
bevakad. Den här är obevakad per konstruktion, och seedens M365 Business Standard står på
`priceAnnual 119,48` — talet som bibeln uttryckligen registrerar som det GAMLA, korrigerat
till 133,82 den 5 augusti. Felriktningen är den bibeln kallar farlig under 20 % success fee:
ett för lågt golv gör att kunden ser ut att överbetala mer än hen gör.
Detta är läxan från 18 augusti ordagrant — *"är det den artefakt kunden faktiskt ser?"* — bara
med rollerna omvända: här vaktas `branchindex` medan larmet mäter mot `supplier_prices`.

---

## H5 — Golvet är kategorins BILLIGASTE tier: en kund som betalar exakt sitt eget listpris flaggas +571 %

**Fil:rad:** `lib/price-alert.js:31` (`ORDER BY price_monthly ASC LIMIT 1`).

**Påstående:** frågan hämtar det lägsta priset för (leverantör, kategori) utan att bry sig om
vilken produkt kunden faktiskt har, så `percentOver` mäter kundens PRODUKTVAL, inte kundens pris.

**Körbart bevis:** den **riktiga** `detectPriceAlert` (endast `./db.js` utbytt mot en klient
mot lokal PostgreSQL) mot de fyra Microsoft-raderna ur `seed-price-db.mjs`:

```
Kund på E3, betalar EXAKT E3:s listpris (462):        percentOver 571, verifiedListPriceMonthly 69
Kund på Premium, exakt listpris (252,35):             percentOver 266, verifiedListPriceMonthly 69
Kund på Standard, exakt listpris (143,38):            percentOver 108, verifiedListPriceMonthly 69
Kund på Basic, exakt listpris (68,88):                null
   (verifiedProduct i alla tre: "Microsoft 365 Business Basic")
```

**Dom:** **haller**

**Domskäl:** Tre av fyra kunder som betalar leverantörens egen publicerade prislapp får
`overListPrice: true`. Det är E3/E5-fyndet från 20 augusti, ordagrant — spännvidden i
kategorin är 6,7× här — och `kraverBekraftadNiva`, spärren som byggdes just mot detta, anropas
inte från den här modulen. `verifiedProduct` namnger visserligen Basic, men påståendefälten
(`overListPrice`, `percentOver`) bär ingen reservation.
Förmildrande, och det ska sägas: `priceAlert` returneras i `api/test-invoice.mjs:1936` men
konsumeras av **ingen** frontend (`grep -rn priceAlert src/` → tomt). Det är alltså i dag en
LATENT motsägelse i svarsobjektet — samma klass som `recommendationType:'switch'` bredvid
`grossSaving: 0` — inte en lögn i en yta. Men fältet är namngivet, serialiserat och redo för
första ytan som läser det.

---

## H6 — Juli-incidentens exakta symptom är fortfarande reproducerbar, genom dörren vakten inte tittar på

**Fil:rad:** `lib/price-alert-store.js:25` (`if (!db) return [];`) vs `:98` (catch-grenen som
lagades 4 augusti) · vakt: `tests/tystnadsfel.mjs:25-33`.

**Påstående:** fixen "noll är ett påstående, okänt är sanningen" armerade bara `catch`-grenen.
Saknas `DATABASE_URL` returneras fortfarande `[]`, och larmkörningen skriver ordagrant samma
rader som under Neons kvotstopp — och avslutas grönt.

**Körbart bevis:**
```
env -u DATABASE_URL -u POSTGRES_URL -u POSTGRES_PRISMA_URL RESEND_API_KEY=fake \
  node notify-price-changes.mjs report.json      (riktig store, bara resend stubbad)

  ── [mobil] tele2 (1 alert(ar)) ──
    👥 0 berörd(a) kund(er)
  Klart: 0 skickade, 0 överhoppade (idempotens), 0 misslyckades
  EXIT=0

node --test tests/tystnadsfel.mjs  → 32 pass, 0 fail
```

**Dom:** **haller**

**Domskäl:** Utskriften är teckenidentisk med den bibeln citerar från juli-incidenten, och
exitkoden är 0 → GH-steget lyser grönt. Vakten är grön samtidigt, och kan inte vara annat:
den är en **källtextvakt** (`src.slice(...)` + `assert.match(kropp, /throw new Error\(/)`) som
läser funktionskroppen och kräver att ordet `throw` förekommer — den anropar aldrig funktionen
och kan därför aldrig se att en annan gren returnerar `[]` innan `try` ens börjar.
Metodfråga 3 besvarad: vakten matar inte produktionens objektform, den matar ingen alls.
Tomt gate_emails ger för övrigt samma `[]` via `:32` — "vi har inga e-postkopplingar" och
"vi kunde inte fråga" är samma svar.
