# Spaning: invoice-store + inbound-ingest

Område: `lib/invoice-store.js`, `api/inbound-email.mjs`, `lib/ingest-queue.js`, `api/cron/drain-ingest.mjs`
Felfamilj som söks: *ett tillstånd som betyder "okänt / misslyckades / inte mätt", representerat
med ett värde som är omöjligt att skilja från ett giltigt svar.*

Harness: `…/scratchpad/h1.mjs`, `h2.mjs`, `h3.mjs` m.fl. Två tekniker gör den riktiga koden körbar
utan infrastruktur: (a) `globalThis.fetch` avlyssnas så neons HTTP-lager lämnar ifrån sig de
FAKTISKA SQL-parametrarna, (b) en minimal Upstash-REST-emulator gör `@vercel/kv` levande i minnet.
Alla domar nedan är körda, inte lästa.

Status: PÅGÅENDE.

---

## H1 — `claimBatch` svarar `[]` på DB-FEL, drainen läser det som "kön är tom" och SLÄCKER köflaggan · **HÅLLER**

**Fil:rad:** `lib/ingest-queue.js:138-141` (`catch → return []`), `api/cron/drain-ingest.mjs:126-136`
(`if (!jobs.length) break;` … `if (claimed === 0) await clearPending();`)

**Påstående:** Ett Postgres-fel i `claimBatch` returnerar exakt samma tomma lista som en bevisat tom
kö, varpå drainen inte bara avslutar utan aktivt raderar KV-flaggan `ingest:pending` — den enda
signal som säger att arbete finns — så att de följande ~14 cron-minuterna hoppar över Postgres helt
(`flagga === false && !sakerhetsslot` → `skipped: 'tom kö enligt köflaggan'`).

**Bevis:** `node scratchpad/h1.mjs` (DATABASE_URL pekar på en död host → varje fråga kastar)

```
[ingest-queue] claimBatch: Error connecting to database: Failed to parse URL from https://api.0.0.1/sql
claimBatch vid trasig DB  → []  typeof: array
jobs.length === 0         → true   (identiskt med "kön är tom")
→ claimed = 0 · waves = 0 → clearPending() ANROPAS: true
```

**Dom:** **håller.**

**Domskäl:** Modulen bär redan regeln i klartext tio rader upp — *"OKÄNT ÄR INTE SAMMA SAK SOM
TOMT"* (rad 53) — och tillämpar den korrekt på `hasPendingFlag` (`null` = vet ej). Samma modul
bryter den i `claimBatch`: `[]` betyder både "kön är tom" och "jag kunde inte fråga". Skadan är
värre än en missad tick, för konsekvensen är DESTRUKTIV: en transient DB-glitch under en enda
körning raderar den flagga som är kundens enda garanti för att bunten betas av snabbt. Kön är inte
förlorad (säkerhetsslotten var 15:e minut plockar upp den), men latensen går från sekunder till upp
till en kvart utan att någon ser varför. Rätt drag är samma som modulen redan valt en gång: skilj
`[]` från `null`, och låt bara ett bevisat tomt svar släcka flaggan.

---

## H2 — Idempotensnyckeln sätts INNAN arbetet; en död invokation gör Resends omleverans till en tyst "redan hanterad" · **HÅLLER**

**Fil:rad:** `api/inbound-email.mjs:328-336` (`kv.set(..., nx:true)` omedelbart efter auth) mot
`api/inbound-email.mjs:488-503` (det interna anropet till `/api/test-invoice` UTAN AbortController —
jämför `api/cron/drain-ingest.mjs:49-51` som har `JOB_TIMEOUT_MS = 40 s`).

**Påstående:** Dör invokationen efter att nyckeln satts men före svaret — vilket `maxDuration: 60`
gör möjligt när två inline-analyser körs utan egen timeout — avvisas Resends omleverans som "redan
hanterad". Fakturan är borta, kunden får aldrig något svarsmail, och loggraden är identisk med den
för en äkta dubblett.

**Bevis:** `node scratchpad/h2.mjs` — riktiga handlern, emulerad KV, analysen hänger (löser aldrig),
invokationen dödas efter 300 ms, sedan levererar "Resend" om samma mejl:

```
försök 1: pipelinen anropad = 1 · svar till Resend = (inget — funktionen dödades)
          idempotensnyckel satt = true
[inbound-email] hoppar över: em_KRASCH redan hanterad (idempotens)
försök 2: svar = {"ok":true,"skipped":"redan hanterad"} · pipelinen anropad totalt = 1
```

**Dom:** **håller.**

**Domskäl:** Nyckeln påstår "det här mejlet är hanterat" i samma sekund som det är MOTTAGET — ett
värde som betyder "påbörjat" lagrat på en plats som läses som "avslutat". Den enda kvarvarande
spåret är en loggrad som ser ut som normal drift. Det är samma tapp som rate-limit-grenen redan
lagat med ett varningsmail (rad 345-378: *"Vi säger hellre ifrån än låter en faktura försvinna
tyst"*) — här är kunden dessutom helt utan besked. Att drain-vägen HAR en per-jobb-timeout och
inline-vägen inte har någon visar att risken är känd på ena sidan av samma fil. Rätt drag: sätt
nyckeln med kort TTL vid start och FÖRLÄNG den först när svaret gått iväg (eller bokför utfallet
per `email_id` i Postgres, som bulk-vägen redan gör).

---

## H3 — `user_email` skrivs RÅTT i triage- och monitoring-vägarna men läses NORMALISERAT · **HÅLLER**

**Fil:rad:** rå skrivning: `api/test-invoice.mjs:600, 667, 693, 757, 776, 838, 886, 915, 1040, 1135,
1171, 1209, 1248, 1300, 1595` (`userEmail: body.userEmail`) · normaliserad skrivning:
`api/test-invoice.mjs:1343, 1642` (`body.userEmail.trim().toLowerCase()`) · läsning:
`lib/invoice-store.js:309, 325, 343` (`WHERE user_email = ${email.trim().toLowerCase()}`).
Kolumnen är `TEXT`, inte `citext` (`scripts/migrate.mjs:158`), och indexet är på råvärdet (rad 178).

**Påstående:** Bär `body.userEmail` versaler eller kantmellanslag landar de prissatta (`auto`)
raderna på gemener och syns i rummet, medan VARJE triagerad och avtalsbevakad rad landar med
originalskiftläge och är osynlig för kontorets e-postläsväg — bokförd enligt bokföringsplikten,
men för kunden omöjlig att skilja från ett tapp.

**Bevis:** `node scratchpad/h3.mjs` — riktiga `storeTriaged`/`storeAnalysis`/`getAnalysesByEmail`,
neons HTTP-lager avlyssnat så de faktiska parametrarna syns. Indata: `"  <e-post maskerad> "`.

```
SKRIV user_email : "  <e-post maskerad> "     ← storeTriaged (review_queue)
SKRIV user_email : "  <e-post maskerad> "     ← storeAnalysis (monitoring)
SKRIV user_email : "<e-post maskerad>"        ← storeAnalysis (auto)
LÄSNINGENS nyckel : "<e-post maskerad>"
```

**Dom:** **håller** som kodfel. **Räckvidd, uttalad:** de två normala vägarna in i `body.userEmail`
normaliserar redan uppströms — `api/auth/request-magic-link.mjs:29` och `api/inbound-email.mjs:317`
(avsändaren lowercase:as) — så jag har INTE bevisat att en versal e-post når produktionen i dag.
Två vägar kringgår normaliseringen och skriver `magic_tokens.email` rått:
`scripts/skicka-rumslank.mjs:45` (operatörens argv) och `api/admin/preview-briefing.mjs:113`.
`AuthContext.login()` (`src/contexts/AuthContext.js:63`) lagrar också vad den får, orört.

**Domskäl:** Normaliseringen bor i femton anropares händer i stället för i den funktion som äger
kolumnen. Femton av sjutton gör fel, två gör rätt — och de två som gör rätt är just de som ger
kunden ett SYNLIGT resultat, vilket gör felet osynligt tills en triagerad faktura ska sökas fram.
Att skiftläget i dag råkar vara normaliserat två steg uppströms är inte ett skydd, det är tur:
ingen vakt håller det sant, och `storeTriaged` gör ingen egen normalisering trots att den är
skriven för att garantera att ingen faktura faller tyst. Rätt drag är regel 1: `storeAnalysis`/
`storeTriaged` normaliserar själva, exakt som läsvägen redan gör.

---

## H4 — `failStuck` existerar inte: ett jobb som dör i `processing` på sista försöket blir permanent "på väg" · **HÅLLER (funktionen saknas — konsekvensen modellerad)**

**Fil:rad:** `lib/ingest-queue.js:113` (kommentaren *"plockas av failStuck → 'failed'"*),
`lib/ingest-queue.js:122-123` (stale-reclaim kräver `attempts < MAX_ATTEMPTS`),
`lib/ingest-queue.js:214-221` (`pendingCountBySender` räknar `processing` som pågående),
`lib/ingest-queue.js:249-256` (`retryFailedBySender` rör bara `status='failed'`).

**Bevis:**

```
$ grep -rn "failStuck" --include=*.js --include=*.mjs .
./lib/ingest-queue.js:113:// Jobb som överskridit MAX_ATTEMPTS lämnas (plockas av failStuck → 'failed'), …
```

En enda träff i hela kodbasen: kommentaren själv. Funktionen finns inte, och ingen annan kod
sätter `status='failed'` utanför `failJob`.

**Dom:** **håller.**

**Domskäl:** `claimBatch` höjer `attempts` VID claim. Dör invokationen efter det tredje claimet
(Vercel-timeout, OOM, deploy mitt i en våg) hinner `failJob` aldrig köras: raden står kvar som
`processing / attempts = 3`. Stale-reclaimen kräver `attempts < 3` och plockar den aldrig;
`failedCountBySender` räknar bara `status='failed'` och ser den aldrig; `retryFailedBySender`
– kundens "försök igen" – rör den aldrig. Men `pendingCountBySender` räknar `processing`, alltså
säger rummet *"Arvo analyserar N fakturor"* i evighet. Det är felfamiljen i sin renaste form:
tillståndet "det här jobbet är dött" bär ett värde som är omöjligt att skilja från "arbetet pågår",
och det värde kunden ser är dessutom det lugnande. Kommentaren är dessutom en garanti om en
invariant koden inte håller — samma sort som `!acting`-grenens kommentar 22 augusti.
**Uttalat:** att funktionen saknas är kört bevis; att raden blir permanent osynlig följer ur
SQL-predikaten som lästs, inte ur en körd Postgres — jag har ingen DB att köra dem mot.
