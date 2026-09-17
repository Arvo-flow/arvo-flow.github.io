# Granskning — tystnadsskälen i rummet

commits: c4e59c1 acea9cd
datum: 2026-09-17
dom: BLOCKERAR

Granskare med ett uppdrag: hitta var det gröna är osant. Kundyta — därför sträng på klass 1, 2, 5.

**Baslinje, körd före varje sabotage:** `npm run test:algo` → `# tests 2405 · # pass 2405 · # fail 0`
(36,7 s). Trädet återställt och verifierat rent efter varje sabotage (`git status --porcelain` →
enbart denna fil).

**Mätinstrumentets egna fel, redovisade:** (a) min första sond importerade med relativ sökväg ur
scratchpad och dog på `ERR_MODULE_NOT_FOUND`; (b) `JSON.stringify(REVIDERADE_KATEGORIER)` gav `{}`
— det är en `Map`, inte ett objekt, och jag var en rad ifrån att läsa «noll reviderade kategorier»
som ett mätvärde; (c) sabotage-harnesset kör `npm run test:algo | tail -8` och ärver därmed `tail`:s
exit-kod (SV-11-sjukan) — mätvärdet är därför `# fail N` ur utdatan, aldrig exit-koden. (d) Jag
kunde **inte** nå sectoralarm.se/verisure.se härifrån (proxyn svarar 403 på CONNECT), så F1 vilar på
vår EGEN prisbok, inte på en live-avläsning. Det säger jag hellre än målar över.

---

## DOM: BLOCKERAR

Blockeringen vilar inte på en smaksak. Den vilar på att **byggarens och granskarens modell av
NÅBARHET säger emot varandra, och klassen beror på vem som har rätt:**

* Är byggaren rätt — texten står i rummet, «Rummet talar», «det stod i rummet varje gång en sådan
  faktura lästes» — då är **F1 och F3 två levande [KUND]-osanningar** i kundtext.
* Är jag rätt — registergrenen nås aldrig av en deklarerad kategori — då är F1/F3 latenta, men
  **F2** betyder att arbetet inte gör det det säger, och skärmdumpsbeviset (regel 8) är taget av ett
  tillstånd produktionen aldrig är i.

Jag kan inte utesluta byggarens gren: `invoice_analyses` kan bära **äldre rader** skrivna innan
kategorier lades till i prisboken, och git-historiken går bara till 2026-09-01 (165 commits, shallow)
medan jag saknar `DATABASE_URL` här. **Det är äkta tvekan om en kundyta, och bibeln har ett svar på
den: vid tvekan [KUND].**

Fixarna är små (F1: en klassning; F3: en mening; F2: en villkorssträng). Det här är inte akademisk
testperfektion — det är tre meningar en kund läser.

---

## [KUND] F1 · `larm-bevakning` får «det finns inget listpris» — medan vår EGEN prisbok säger «verifierade listpriser»

Registret klassar `larm-bevakning` som `OFFERTPRISSATT`, och klassens kundtext lyder ordagrant:

> *«Priset i den här kategorin sätts i offert, inte på en publik prislista.»*

`agents/recommender/branchindex.js`, samma repo, samma kategori:

> *«Källa: Sector Alarm Företag 299–399 kr/mån, Verisure Företag 349–499 kr/mån, Safemore
> 249–349 kr/mån (**verifierade listpriser maj 2026**).»*

Tre namngivna leverantörer, publika SEK-priser per månad, ordet «verifierade». De två meningarna kan
inte båda vara sanna (regel 1: en sanning per fråga; regel 5: två ytor får aldrig säga olika).
Byggarens egen `grund` — *«Offert per objekt: larmklass, antal punkter, utryckningsavtal»* — är
**skriven, inte prövad mot raden tjugo filer bort.** Bevisplikten i sin renaste form.

Och det är exakt samma argument byggaren själv för om `saas-crm`: *«att säga offertprissatt till en
kund som kan googla Pipedrives prislista på tio sekunder är en osanning på den yta där hela vår
premiumposition bor.»* Det argumentet tillämpades på `saas-crm` och **inte** på `larm-bevakning` —
trots att larm är det ENDA fallet där prisboken använder ordet «verifierade listpriser».

Utlösande fall: en Securitas-/Verisure-/Sector Alarm-faktura i rummet.

Gränsdragning, för att vara rättvis: `foretagshalsovard`, `it-support`, `skrivarleasing`,
`avfall-atervinning` säger alla «estimat»/«branschjämförelse»/«kommunal taxa» i sina noter — där
finns ingen motsägelse och klassen står. `larm-bevakning` är ensam om att motsäga sig själv.

**Åtgärd:** antingen klassa om `larm-bevakning` (egen klass, eller lyft den ur tystnaden), eller
rätta prisbokens not i samma commit. Inte båda kvar.

---

## [KUND] F2 · Registergrenen nås aldrig av en deklarerad kategori i produktion — skärmdumpen visar ett tillstånd som inte finns

Grenen i `api/invoice-history.mjs:363`:

```js
} else if (reason.includes('no_benchmark') || reason.includes('out_of_scope') || reason.includes('unsupported_category')) {
```

**Mätt mot varje `storeTriaged`-utgång i `api/test-invoice.mjs` (14 st, alla lästa):**

1. `no_benchmark` (rad 1489) ligger inuti `if (!catDef)` där `catDef = BRANCHINDEX[categorized.category]`
   (rad 1398). **Mätning:** deklarerade kategorier som saknas i BRANCHINDEX = `[]` → **noll** av de 19
   kan någonsin bära `no_benchmark`.
2. `out_of_scope` (rad 1002) skickar `category: extracted.category ?? null`, och `agents/test-invoice/extract.js`
   sätter **aldrig** `.category` (grep: noll träffar) → kategorin är alltid `null`. Svaret säger till
   och med `categorized: { category: 'uncategorized' }`.
3. `unsupported_category` emitteras **ingenstans** (grep över hela repot: bara denna rad + två testrader).
4. De 7 volymstyrda triageras med `reason: 'volume_data_required'` (rad 1451) — en sträng som inte
   matchar grenen. **Mätt utfall i dag:**
   `serverhosting/utrustningsleasing/leasing-bil/kontorsmaterial/städ-rengöring/transport-frakt/saas-other`
   → `kind = "Under granskning"`, *«Mottagen — men vi stoppade prissättningen … Skälet är tekniskt»*.
   Registret ville säga «Volymstyrt pris». **Sju av sjutton missar.**
5. De 8 offertprissatta + `saas-crm` har `catDef` och saknar `requiresVolumeData` → de passerar båda
   triage-grindarna, går till `recommend()` → revisionsgrinden → `storeAnalysis({ route: 'auto' })`
   (rad 1975, inget `triage_reason`) → de hamnar i `analyses`, **aldrig i `watched`**
   (`TRIAGE_ROUTES = {unsupported, review_queue}`, rad 129–136).
   `forsakring-*` routas dessutom ut ännu tidigare: `outOfScopeReason: 'insurance'` **före**
   kategoriseringen, med kategori `null`.

`api/test-invoice.mjs` är enda produktionsskrivaren av `triage_reason` (grep på `storeTriaged`
repo-brett: bara den + `lib/invoice-store.js` + sonder/tester).

**Sabotaget som avslöjar att ingen vakt ser det (S6):** jag lade till `|| reason.includes('volume_data_required')`
i grenvillkoret — alltså kopplade den till det skäl produktionen FAKTISKT skickar.
Utfall: `# pass 2405 · # fail 0`. **Sviten kan inte skilja en gren som är kopplad till verkligheten
från en som inte är det.** Villkorsvaktens sjukdom (Verifieringsplikten p.5), mätt.

**Och regel 8-beviset är taget på fel maskin.** `scripts/screenshot-tystnaden.mjs` bär i sitt eget
huvud varningen *«KORTEN BYGGS AV PRODUKTIONENS EGEN watchedCard … 'mekanismen prövad, matningen
aldrig' är bibelns mest upprepade sjukdom … precis som i produktion»* — och matar sedan
`triage_reason: 'no_benchmark'` till fem DEKLARERADE kategorier, ett tillstånd produktionen per
punkt 1 aldrig kan producera. Mätt sida vid sida:

| kategori | skärmdumpskriptets matning | produktionens matning |
|---|---|---|
| larm-bevakning | Offertprissatt | route `auto` — når aldrig `watched` |
| foretagshalsovard | Offertprissatt | route `auto` — når aldrig `watched` |
| städ-rengöring | Volymstyrt pris | **Under granskning** |
| saas-crm | Publikt pris — i utländsk valuta | route `auto` — når aldrig `watched` |
| faktura-tjanst | Ej prissatt kategori | route `auto` — når aldrig `watched` |

Samma sjukdom byggaren citerar i rad 5 av filen, begången i rad 20. Fem av fem kort i bilden är kort
produktionen inte kan rendera. BK-08/09/10 matar samma omöjliga tillstånd.

Klassen: **[KUND]**, inte [VAKT] — därför att jag inte kan utesluta äldre `no_benchmark`-rader med
en numera deklarerad kategori (git är shallow från 2026-09-01, ingen DB härifrån), och de raderna
skulle rendera F1:s och F3:s texter direkt vid deploy. Vid tvekan [KUND].

**Åtgärd:** koppla grenen till det produktionen skickar (`volume_data_required`, och besluta vad de 9
route-`auto`-kategorierna ska göra), kör om skärmdumpen mot en produktionsrealistisk rad, och lägg en
tand som fäller när matningen inte är en form produktionen kan skapa.

---

## [KUND] F3 · «Vi bevakar avtalsslutet» och «vi säger till när något rör sig» saknar mekanik för just de rader kortet visas på (regel 9)

Kortet visas per definition bara på **triagade** rader (`route ∈ {unsupported, review_queue}`,
`api/invoice-history.mjs:129`). Tre löften, tre mätningar:

* **`OFFERTPRISSATT` + `VOLYMSTYRD`: «Vi bevakar avtalsslutet» / «bevakar avtalet mot förfallodatum».**
  Påminnelseloopen (`api/cron/send-reminders.mjs:192,224`) kör på
  `WHERE contract_end_date BETWEEN …`. `contract_end_date` skrivs på exakt två ställen:
  inuti **`storeAnalysis`** (`lib/invoice-store.js:310`, ur `extracted.servicePeriodEnd`) och av
  `api/save-contract.mjs`. **`storeTriaged` skriver den aldrig** (fälten är: fingerprint, pdf_hash,
  supplier, normalized_supplier, category, route, user_email, triage_reason, should_switch +
  invoice_number, line_items_json). En triagerad rad har alltså ingen klocka — och kortet lovar att
  vi bevakar den.
* **`UTLANDSK_VALUTA`: «Vi bevakar prisändringarna i källvalutan och säger till när något rör sig».**
  `lib/price-alert-store.js:53 och 63` — `getAffectedCustomers` filtrerar **`AND route = 'auto'`**.
  Den kund kortet visas för är per konstruktion `review_queue`/`unsupported` och därmed **utesluten
  ur larmslingan**. Prisvakterna för Pipedrive/HubSpot/Zoho finns (bibeln, 6 aug) — men larmet når
  aldrig den här kunden.
* **«förbereder motbudet».** Grep på `motbud` i `lib/ api/ agents/ scripts/`: enda produktionsträffen
  är den nya raden själv (`lib/tystnadsskal.js:73`). Övriga är marknadstext i `src/pages/Landing`,
  `src/pages/Bias` och ett mock-skript. **Det finns ingen motbudsmekanik.**
  Bibelns Nivå 3 säger att Arvo *beväpnar* med «fyndet, tajmingen och det exakta motbudet» — det är
  doktrinen, inte den byggda mekaniken, och regel 9 säger att löftet och koden levereras tillsammans.

Ironin är exakt: commiten finns för att ta bort ett kundlöfte utan mekanik
(«vi prissätter så snart ett verifierat golv finns») och **ersätter det med tre nya.**

TS-08 vaktar bara att texten *säger något* vi gör (`/bevakar|förbereder|säger till/`) — den kan per
konstruktion inte se om mekaniken finns. Den ORDVAKTEN gjorde fyndet svårare att se, inte lättare.

**Åtgärd:** antingen bygg kopplingen (skriv `contract_end_date` även på triagerade rader; släpp in
triagerade rader i larmvägen) eller skriv om åtgärdsraderna till det vi faktiskt gör.

---

## [KUND] F4 · `e\.?on` utan ordgräns ger en städfaktura kortet «Reglerad nätkostnad» — PRE-EXISTERANDE, blockerar inte denna merge

Rad 353: `/ellevio|vattenfall|e\.?on|elnät|elnat|nätavgift|natavgift/.test(sup)`. Mönstret `e\.?on`
saknar ordgräns och träffar varje leverantörsnamn som RYMMER «eon». Mätt:

| leverantör | elnätsgrenen fyrar |
|---|---|
| `leon städ ab` | **true** |
| `neon reklam ab` | **true** |
| `pantheon consulting` | **true** |
| `simeon transport ab` | **true** |
| `odeon it ab` | **true** |
| `galleon frakt` | **true** |

Utfall mätt för `{ supplier:'Leon Städ AB', category:'städ-rengöring', triage_reason:'no_benchmark' }`:
`kind = "Reglerad nätkostnad"`, *«Elnätet går inte att byta — men vi bevakar tariffen»*,
*«Vi bevakar er nättariff och larmar vid förändring»* — på en städfaktura. Samma sak för
`it-support` hos en leverantör vars normaliserade namn slutar på `.se` (`\.se$` i webbhotellsgrenen).

Grenarna ligger FÖRE registret, alltså överrider de varje deklaration. Jag klassar det [KUND] därför
att texten är falsk för kunden — men **commiterna rör inte raden**, och stoppregeln finns för att
inte låta en granskning bli en oändlig rekursion. Den blockerar inte c4e59c1/acea9cd; den ska ha en
egen commit med `\b`-gränser och ett testfall per namn ovan.

Kommentaren rakt ovanför registret påstår dessutom att de tidigare grenarna bär *«sin egen, mer
precisa förklaring»*. För Leon Städ är den mindre precis och dessutom osann — en kommentar som
intygar en invariant koden inte håller (bibeln, 22 aug).

---

## [KUND] F5 · `saas-other` påstår en prismekanik prisboken inte bär

`VOLYMSTYRD`-texten: *«Kostnaden här styrs av volym och specifikation, inte av antalet anställda —
ett golv per anställd vore ett tal utan innebörd.»*

Prisbokens `saas-other`: *«Nischad eller okategoriserad SaaS. Kräver manuell analys — per-anställd-
benchmark är inte tillämpbar.»* Byggarens egen `grund`: *«**Restpost**: blandade produkter utan
gemensam jämförelseenhet.»*

«Vi kan inte JÄMFÖRA per anställd» och «priset STYRS av volym» är två olika påståenden, och bara det
första är belagt. `saas-other` är SaaS-restposten — nischad SaaS prissätts oftast **per säte**, och
då är meningen «priset styrs inte av hur många ni är» affirmativt falsk om kundens egen faktura.
Klassen valdes för att få en text, inte för att den är sann; `OKLART` är det ärliga svaret för en
restpost.

Utlösande fall: vilken som helst nischad per-säte-SaaS som inte matchar en egen kategori — den
oftast träffade av de tysta cellerna.

---

## [VAKT] F6 · Kundcopyn flyttades UT ur claims-audits räckvidd — regel 9:s maskinvakt är nu blind för den

`scripts/claims-audit.mjs:70`: `const SCAN_DIRS = ['src/pages', 'src/components', 'api'];`
**`lib/` skannas inte.** Texten bodde förut i `api/invoice-history.mjs` (skannad) och bor nu i
`lib/tystnadsskal.js` (oskannad).

**Sabotage med motprov, båda körda:**

```
# förbjuden copy i lib/tystnadsskal.js ('garanterad besparing via vårt partnernätverk')
$ node scripts/claims-audit.mjs
✓ Påståendevakthunden — inga förbjudna påståenden i kundytor          exit=0   ← BLIND

# MOTPROV: exakt samma sträng i api/invoice-history.mjs
$ node scripts/claims-audit.mjs
✗ api/invoice-history.mjs:391 — /partnern[äa]tverk/i
✗ api/invoice-history.mjs:391 — /garanterad besparing/i               exit=1   ← fäller
```

Att flytta en mening från en skannad katalog till en oskannad är en tyst nedmontering av regel 9:s
enda maskinlås. Inget kundsynligt ändras i dag → [VAKT], men fixen är en rad: lägg `lib` i
`SCAN_DIRS` (eller registrera filen explicit).

---

## [VAKT] F7 · `bankavgifter`-grunden säger «ingen sida sonderad än» — prisboken säger motsatsen

`grund: 'Listprisbar (banker publicerar företagspaket). Står i kön. **Ingen sida sonderad än.**'`
mot prisbokens not: *«Källa: **verifierade listpriser maj 2026** — Lunar Business 0 kr/mån, SEB
Startpaket 85 kr/mån, LF Företag 99–149 kr/mån, Swedbank Företag 185 kr/mån, Handelsbanken
~220–290 kr/mån.»* Samma form som F1, men klassen är `OKLART` → `tystnadsbesked` ger `null` → ingen
kundtext. Grunden når aldrig kunden. [VAKT] — men den ska rättas, för nästa läsare tror den.

---

## [VAKT] F8 · Registret har ingen vakt som prövar klassen mot prisboken — och F1 bor i luckan

Vaktens premiss är ärligt skriven: *«BLIND: den ser inte om KLASSEN är rätt vald.»* Bibeln säger att
en vakt utan blindfläck inte existerar, så deklarationen är rätt gjord. **Men blindfläcken är bredare
än den behövde vara.** `BRANCHINDEX[k].note` är maskinläsbar, och en regel av formen *«en kategori
vars not innehåller «verifierade listpriser» tillsammans med SEK-belopp får inte bära
OFFERTPRISSATT»* hade fällt F1 på första körningen — och hade varit rätt sorts vakt, eftersom den
mäter deklarationen mot en ANNAN källa i stället för mot sig själv.

---

## Fråga 6 — TS-09:s hårdkodade tal (7, 8, 15): ruttnar det?

**Nej, det ruttnar inte tyst — men det är en tripwire, inte en härledning.**

* Tanden finns: sabotage S9 (flytta `kontorsmaterial` VOLYMSTYRD → OFFERTPRISSATT) gav
  `# pass 2404 · # fail 1`. Det fäller alltså en felklassning.
* Det failar högljutt, inte tyst: en ny tyst kategori fälls först av TS-01 (odeklarerad) och sedan av
  TS-09:s tal. Två grindar i serie, båda röda.
* **Men talet har ingen självständig källa.** Nästa utvecklare bumpar 8 → 9 och 15 → 16 för att bli
  grön, och då är det bibelns egen Tele2-läxa (18 aug): *«Ett testvärde som anpassas till koden är
  ingen vakt längre.»*
* Den bärande raden i TS-09 är den **härledda**:
  `assert.equal(TYSTA.length, Object.keys(TYSTNADSSKAL).length)` — den underhåller sig själv och kan
  inte glida isär. Den ska stå kvar.

**Rekommendation:** behåll den härledda raden, byt de tre talen mot invarianten i F8 (klass vs
prisbokens källdeklaration). Då mäter TS-09 något som inte kan justeras bort.

---

## Vad som HÅLLER (friat med redovisat skäl — att fria är också ett resultat)

* **Fail-closed-vägen (fråga 3) håller i alla prövade riktningar.** Mätt:
  `category` = `null`, `undefined`, `''`, `'finns-inte'`, `'uncategorized'`, `'vaxel'`, `'mobil'`,
  `'toString'`, `'constructor'`, `'__proto__'` → **alla** ger `kind = "Ej prissatt kategori"`, dvs.
  den gamla försiktiga texten. Prototypnycklarna ger `post.skal === undefined` → `BESKED[undefined]`
  → `null`. Ingen `else` som lånar det generösaste påståendet.
* **`vaxel` är verkligen en död nyckel.** Mätt: `vaxel` finns i BRANCHINDEX men **inte** i
  kategoriserarens `CATEGORIES` (28 nycklar) — den kan aldrig emitteras. Att lämna den `OKLART`
  i stället för att skriva ett besked är rätt beslut, och `molnvaxel` är mycket riktigt
  `isAudited === true`.
* **`saas-crm` → UTLANDSK_VALUTA är rätt.** Prisbokens alternativ är Pipedrive/HubSpot/Zoho, alla
  USD-prissatta, och bibeln har redan google-sek-grindens precedens. Byggarens avvikelse från ordern
  («sjutton») var korrekt och korrekt motiverad.
* **Sju av åtta deklarerade sabotage fäller.** Körda av mig, var och en med `assert old in s` och
  `assert s != original` (ingen no-op), trädet återställt och `git status` verifierat efter var och
  en:

  | sabotage | pass/fail | dom |
  |---|---|---|
  | S1 `OKLART` får en text | 2402/3 | FÄLLER |
  | S2 `larm-bevakning`-deklarationen raderas | 2401/4 | FÄLLER |
  | S3 `mobil` (talar) får ett tystnadsskäl | 2402/3 | FÄLLER |
  | S4 `saas-crm` → OFFERTPRISSATT | 2401/4 | FÄLLER |
  | S5 inkopplingen rivs (`besked = null`) | 2403/2 | FÄLLER |
  | S7 reservtexten byts mot registrets offerttext | 2404/1 | FÄLLER |
  | S8 offerttexten lovar «vi genomför bytet» | 2404/1 | FÄLLER |
  | S9 kategori flyttas VOLYMSTYRD → OFFERTPRISSATT | 2404/1 | FÄLLER |
  | S10 tomhetsmotprov: `isAudited` → true (TYSTA=0) | 2396/9 | FÄLLER |
  | **S6 grenen kopplas till produktionens verkliga skäl** | **2405/0** | **GRÖN — ingen tand** |

  S10 är värd en rad för sig: TS-01:s `TYSTA.length > 10` är ett riktigt tomhetsmotprov och fäller.
* **BK-10 är ett äkta motprov** (S7 fäller) — registret kan inte svälja varje kategori i tysthet.
* **Pre-commit-kedjan är grön på ändringen:** `price-audit` → ALLT OK · `claims-audit` → inga
  förbjudna påståenden · `sifferrevisor` → tystnadsgarantin bevisad för 19 oreviderade kategorier.
  (Att claims-audit är grön beror delvis på F6 — den tittade inte.)
* **`paketFotnot` i `branchindex.js` (c4e59c1)** är ett rent bokfört människobeslut med upphov och
  datum, läses av ingen kod, och ändrar inget tal. Prisauditen är grön efter tillägget. Inget att
  anmärka — det är bokföringsplikten tillämpad korrekt.
* **Grenordningen är i övrigt oproblematisk:** `saas-crm` hos HubSpot utan triage-skäl fångas av
  INTL_SAAS-grenen, men den texten («publika listpriset finns bara i utländsk valuta») SÄGER SAMMA
  SAK som registret — ingen motsägelse. `serverhosting` hos «Binero Hosting» får «Fragmenterad
  marknad» i stället för «Volymstyrt pris»; båda säger «vi kan inte prissätta», så det är en
  precisionsförlust, inte en osanning.

---

## Sammanfattning

| # | klass | fynd |
|---|---|---|
| F1 | **[KUND]** | `larm-bevakning` säger «inget listpris finns» mot vår egen prisboks «verifierade listpriser maj 2026» |
| F2 | **[KUND]** | Registergrenen nås aldrig av en deklarerad kategori; skärmdumpsbeviset är taget av ett omöjligt tillstånd; S6 visar att ingen vakt ser det |
| F3 | **[KUND]** | «Vi bevakar avtalsslutet» / «säger till när något rör sig» / «förbereder motbudet» saknar mekanik för triagade rader (regel 9) |
| F4 | [KUND] *(pre-existerande, blockerar inte detta)* | `e\.?on` utan ordgräns → städfaktura får «Reglerad nätkostnad» |
| F5 | **[KUND]** | `saas-other` påstår volymstyrning som varken prisboken eller grunden bär |
| F6 | [VAKT] | Kundcopyn flyttad till `lib/`, utanför claims-audits `SCAN_DIRS` — bevisad blind med motprov |
| F7 | [VAKT] | `bankavgifter`-grunden motsäger prisboken (når aldrig kund) |
| F8 | [VAKT] | Ingen vakt prövar klassen mot prisboken — F1 bor i luckan |

**dom: BLOCKERAR**
