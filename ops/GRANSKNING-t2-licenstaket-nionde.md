commits: 027f668b
dom: BLOCKERAR

# Nionde blicken på T-2: sjunde lagningen (027f668b)

Granskningen gäller grenens slutläge, 027f668b, mot `origin/main` 793810d3. Granskaren har inte byggt
koden. Uppdraget var att hitta var det gröna är osant. Skript och utfall ligger i
`/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-t2/l10/`.

## Domen

**BLOCKERAR.** S-1 och S-2 räcker var för sig.

- 6 fynd: 2 [KUND] (S-1, S-2) och 4 [VAKT] (S-3 till S-6).
- S-1 och S-2 är införda av grenen och syns i det PR:en ändrar. Meningarna finns inte på main, och i S-2
  är också stoppet nytt. Formen är densamma som N-1, P-1, Q-1 och R-1, en femte gång. Lagningen gjorde
  talet till «det vi räknade fram», men meningarna påstår fortfarande något om fakturan. Per plats säger
  «per användare», och nämnaren är inte alltid användare. Radmeningen säger «ur en licensrad», och raden
  är inte alltid en licensrad. I S-1 är det vår egen regel som skapar nämnaren.
- R-1, R-2, R-3, R-6 och R-7 är stängda. R-4 och R-8 är stängda för sina former men öppna i nya (S-3,
  S-5). R-5 är öppet och loggat sedan förut som P-3 (S-6).
- Commitens sju sabotage fäller 1 test var. Fyra av mina fem nya fäller noll (W1, W3, W4, W5).

**Lagningen är liten och har samma riktning som förra gången.** Låt meningarna sakna enhetsord som koden
inte garanterar. Per plats: nämnaren är `seatCount`, alltså «de platser vi räknade», inte användare. Rad:
«ur en rad som vi läste som en licens för planen». Pröva meningarna mot en faktura utan användare (S-1)
och en blandad faktura med en paketrad (S-2). Lägg blandade fakturor i LT-06:s rutnät: ett paket i
`saas-productivity` tillsammans med licensrader.

## Fynd

### S-1 · [KUND] · infört av grenen: per plats säger «per användare» om en faktura utan användare

- **Fil:** `src/lib/prisavvikelse.js` rad 25–26, visad för varje svar med `prisprov === 'per_plats'`.
- **Påstående:** «Kostnaden per användare och månad som vi räknade fram ur fakturan ligger över den gräns
  vi prövar automatiskt för leverantören.» Koden delar med `seatCount` (`agents/test-invoice/extract.js`
  rad 1060–1066). Prompten säger «Sätt null om fakturan inte avser per-användarlicenser» (rad 256–257).
  Men max-regeln i `applyDeterministicRules` ersätter ett `null` med största antalet på en löpande rad
  (rad 774: `if (seatCount == null || maxQty > seatCount) seatCount = maxQty`). Undantaget gäller bara
  enheterna i `ICKE_ANVANDARENHET_RE` (kWh, GB, timmar och liknande).
- **Bevis** (`l10/anvandare.mjs` → `l10/anvandare.txt`). Kedjan: råform → `aggregateLineItems` →
  `prisprovningensIndata` → `validateSeatPrice` → `prisavvikelseMening`, på 027f668b. Modellen svarar
  `seatCount: null` i varje fall, som prompten säger:
  - Microsoft, Azure Support Standard 1 × 1 050 (löpande) och förbrukning 14 000: seatCount 1, pps 1 050,
    `per_plats`.
  - Microsoft, Azure Reserved VM Instance 3 × 1 450: seatCount 3, pps 1 450, `per_plats`.
  - Microsoft, Power Automate Process (licens per flöde) 2 × 1 590: seatCount 2, pps 1 590, `per_plats`.
  - Varje fall får meningen «Kostnaden per användare och månad …». Fakturorna har inga användare. Talet
    är kostnaden per supportavtal, per virtuell maskin eller per flöde.
  - Adobe Stock för team 1 × 2 990 gav samma utfall. Om en Stock-licens är en användare är oklart, så
    fallet räknas inte.
- **Motprov:**
  - Samma Azure-faktura med supportraden som förbrukning: seatCount null, ingen prövning, ingen mening.
    Stoppet beror alltså på regeln.
  - E5 + Copilot, 10 användare: pps 928,18, `per_plats`, meningen är sann.
- **Renderat:** sondens tillägg `azure-1050` (Microsoft, `per_plats`) visar meningen ordagrant i 390 px
  (`l10/sond.txt`).
- **Main:** extraktionen är orörd, så pps är densamma. Mains modul (`l10/main-spi.mjs`) ger anomali för
  1 050, 1 450 och 1 590 hos «Microsoft» (`l10/main-s1.txt`). Main stoppar alltså samma fakturor, med den
  generiska texten. Stoppet är förexisterande. Meningen är ny i grenen och har funnits sedan 3b5344f1
  («det antal användare vi läste»).
- **Nåbarhet:** kräver mains exakta namn («Microsoft», «Microsoft Corporation», «Microsoft 365»). Det
  krävs inget modellfel: modellen svarar null som prompten säger, och regeln skapar antalet. Hur ofta det
  sker är inte mätt. Utan mätning räknas felet som synligt (avgränsningen 22 okt). Samma krav på namn
  gällde för R-1.
- **Sjunde domen** (Q-1) godtog «användare» med hänvisning till promptens definition. Den prövade inte
  regeln som fyller i ett null.

### S-2 · [KUND] · infört av grenen: en paketrad kallas «licensrad», och den korrekta fakturan stoppas

- **Fil:** `src/lib/prisavvikelse.js` rad 29–30, visad för varje svar med `prisprov === 'rad'`.
- **Påstående:** «Priset per licens och månad som vi räknade fram ur en licensrad är mer än dubbelt så
  högt som planens listpris.» Radprövningen gäller hela fakturan om kategorin är `saas-productivity`
  (`lib/supplier-price-intel.js` rad 58 och 150). En paketrad som namnger en nivå läses som nivårad
  (`radensNiva` kräver bara «Microsoft 365» och nivåns namn).
- **Bevis** (`l10/paket.mjs` → `l10/paket.txt`, samma kedja, och mains modul ur 793810d3 i
  `l10/main-spi.mjs`):
  - Dustin AB, `saas-productivity`: Business Standard 10 × 115 och «Device as a Service: bärbar dator +
    Microsoft 365 Business Standard» 8 × 649. Grenen: `rad`, «kostar 649 kr per licens och månad, över
    2 × nivåns listpris 160.58». Main: ingen anomali.
  - Atea Sverige AB, `saas-productivity`: E3 25 × 460 och «Modern arbetsplats inkl. Microsoft 365 E3 och
    servicedesk» 5 × 1 150. Grenen: `rad`. Main: ingen anomali.
  - Meningen säger «Priset per licens … ur en licensrad». Raden är en dator med licens och support, och
    649 är inget licenspris. Det är N-1:s form («licenspris» om något som inte är det).
- **Motprov:**
  - Samma Dustin-faktura i `managed-workplace`: ingen anomali (kategorigrinden från L-1 håller).
  - Dustin utan paketraden: ingen anomali.
- **Renderat:** sondens tillägg `rad-dustin` visar meningen ordagrant (`l10/sond.txt`).
- **Stoppet är också nytt.** LT-06:s rutnät har paketfakturor bara i sina egna kategorier
  (`tests/listpristak.mjs` rad 222–225), aldrig blandade med licensrader i `saas-productivity`. Med
  svepets egen definition (korrekt läst faktura, rätt utfall = ingen anomali) är fallen försämringar som
  svepet inte kan se. Modulhuvudet säger själv om paket: «ett larm där vore falskt». Vad main visar när
  fakturan prissätts är inte kört; den kan få ett eget fel (paketraden som licens i like-for-like),
  obekräftat.
- **Nåbarhet:** kräver att en blandad faktura kategoriseras som `saas-productivity`. Det är ett
  modellbeslut och inte mätt. Utan mätning räknas felet som synligt.

### S-3 · [VAKT] · infört i grenen: LT-11 prövar vyns gren som text, inte att den använder modulen

- R-4 i nya former. LT-11 räknar citatformer av `price_anomaly`, ordet `prisprov` och grenens text.
- **W1:** vyn importerar inte `prisavvikelseMening` utan definierar en egen funktion med samma namn, som
  säger «Fakturans löpande kostnad per månad är högre än leverantörens listpris, troligen på grund av
  Copilot». Grenens text är orörd. Sviten: 0 fail, 0 cancelled.
- **W5:** kortet döljs med `!/anomaly/.test(result.reason)`. Inga nya citattecken, inget nytt
  `prisprov`. 0 + 0.
- **Motprov:** V3 (dubbla citattecken) och V4 (`!result.prisprov`) fäller LT-11, 1 fail var.
- Sonden hade fångat båda. Grinden kör inte sonden.

### S-4 · [VAKT] · förexisterande: SS-01 läser bara `run-migration`

- **W4:** `scripts/migrate-price-db.mjs`, som `setup-price-db.yml` kör, får en rad
  `INSERT INTO supplier_prices … 416.77`. Sviten: 0 + 0. SS-01 läser filen bara indirekt: testet kräver
  att flödet nämner den.
- SS-01 läste bara `run-migration` också på main (`git show 793810d3:tests/listpristak.mjs`). Inte
  vanligare. Ingen skrivare finns i dag.

### S-5 · [VAKT] · infört i 027f668b: modulens kommentar säger mer än meningarna gör

- `src/lib/prisavvikelse.js` rad 15–16: «Meningarna säger bara vad vi räknade fram och vad gränsen är
  till för.» Falskt i S-1 («per användare») och S-2 («ur en licensrad»).
- Commit-texten: «R-4: price_anomaly i alla citatformer och prisprov räknas i vyn» är sant ordagrant.
  Den säger inget om W1 och W5.
- Inget av det når kunden.

### S-6 · [VAKT] · förexisterande, loggat: R-5 är öppet

- **W3:** `svara()` filtrerar bort fält vars namn börjar på «pris». 0 + 0, samma utfall som U5.
- Arbetsordern loggar det under T-2 som P-3: «att `svara()` för vidare `prisprov` … prövas inte genom
  handlern».

## Förra domens fynd

| ID | Status | Bevis |
|---|---|---|
| R-1 | **Stängt för sina fall.** Meningen beskriver talet som det vi räknade fram. I varje fall ligger det talet över gränsen: 1 474,72, 1 277,21 och 802,92 mot 765,70; 1 656 mot 468; 3 276 mot 908,70. Formen finns kvar i enhetsordet (S-1). | `l10/period.txt`, `l10/period2.txt` |
| R-2 | **Stängt för sitt fall.** Antal läst 5: talet vi räknade fram är 343,64 och ligger över 321,16. Formen finns kvar i «licensrad» (S-2). | `l10/period2.txt` |
| R-3 | **Stängt.** LT-11 kör `aggregateLineItems`. | V1, V2: 1 fail var |
| R-4 | **Stängt för citatformer och `!result.prisprov`, öppet i nya former (S-3).** | V3, V4: 1 var; W1, W5: 0 |
| R-5 | **Öppet, loggat som P-3 (S-6).** | W3: 0 |
| R-6 | **Stängt för `UPDATE ONLY`.** Samma skrivning i en annan migreringsfil prövas inte (S-4, förexisterande). | V5: 1; W4: 0 |
| R-7 | **Stängt.** CV-19 har ingen tidig retur. | V6: 1 |
| R-8 | **Stängt för de tre texterna.** Den nya kommentaren säger för mycket (S-5). | läst |

## Friat

- **Radmeningens «mer än dubbelt så högt som planens listpris»** för licensrader. `nivansListpris` tar
  max av nivåns två listpriser (rad 63–67), och villkoret är `pris > RADFAKTOR * listpris` (rad 159).
  Satsen är alltså sann mot båda listpriserna. I prisboken är månadsfaktureringen högst för alla fem
  nivåer, till exempel Business Standard 160,58 mot 133,82 (`node -e` mot `BRANCHINDEX`). `radensNiva`
  kräver «Microsoft 365» och utesluter Google, Office 365, Copilot och «exkl. Teams»
  (`lib/licensniva.js`). «Planens» är alltså planen som står på raden.
- **Förbehållet** («gränsen finns för att fånga tal vi kan ha läst fel … stoppar också vissa korrekta
  fakturor») är sant för båda prövningarna. Per plats: E5 769,42 och Adobe 985 (LT-02, sonden). Rad:
  paketraden i S-2. «Det behöver inte betyda att priset är fel» är sant i varje fall jag körde.
- **Per plats för fakturor med användare.** Adobe 985, E5 769,42, E5 + Copilot 928 och Google 690
  renderades med meningen. Adobe 5 + 1 ger 1 039,6 per användare (LT-11:s kedja och V2).
- **Reservmeningen** nås inte. Vid anomali ger `validateSeatPrice` alltid `per_plats` eller `rad`
  (rad 139–168). Sonden: `per_plats+rad` ger reservmeningen. «Gränsen» i reservens förbehåll saknar
  syftning i samma mening; texten nås inte.
- **Regel 5.** `watchedCard` för `price_anomaly` hos Adobe, Microsoft (även `serverhosting`), Google
  Workspace och Crayon AS: «Mottagen — men vi stoppade prissättningen … Skälet är tekniskt …»
  (`l10/rum.txt`). Motprov `categorization_conflict`: ett annat kort. Svarsmejlet säger «Vi prissätter
  inte den här fakturan automatiskt. Skälet till att vi inte prissatte fakturan står i ert rum.»
  (`api/inbound-email.mjs` rad 775, `lib/kundmeningar.js` rad 90; läst, inte kört). Grenen ändrar varken
  rummet eller mejlen (`git diff 793810d3 027f668b --stat`). Ingen yta motsäger vyn.
- **Sonden.** `scripts/screenshot-prisavvikelse.mjs`, kopia med Playwright ur
  `/opt/node22/lib/node_modules/playwright` och sex tillägg: rc 0 i 390 och 1600 px.
- **Commit-textens «sju riktningar … → 7 tester föll».** V1–V7 fällde 1 test var.
- **«cachen höjdes till v32 i samma commit som fältet».** `git log -S` ger ceb28c05 för både
  `pdf:result:v32` och `prisprov: _priceCheck.prov`.
- **Syskonfallet «felläst antal i radprövningen»** står inte i sviten, men kört i `l10/period2.txt`:
  meningen är sann.
- **LT-06:s tal** (407 568, 170 144, 222 372, 0, 52 228) är exakta asserts och gröna i baslinjen.
  «369 384 skilda» i regel 13 är inte assertat och inte omkört. 027f668b rör inte talen.
- **Q-7** (rubriken «Ni betalar för mycket») står kvar ovanför kortet (`l10/sond.txt`). Loggat i
  arbetsordern, förexisterande.

## Sabotage

Kördes med `l10/sab.py`: `assert old in s`, exakt en förekomst, kontroll att filen ändrades, beteendet
utskrivet för V1, V2 och W2, hela sviten per sabotage, återställning ur sparad sträng med kontroll i
`finally`. Utfall i `l10/sab-logg.txt`, `l10/sab.jsonl` och `l10/ut-*.txt`.

| ID | Riktning | Fällda (fail + cancelled) | Fynd |
|---|---|---|---|
| V1 | pps delas inte med periodens månader (E3 kvartal: 416,77 → 1 250,31, anomali) | 1 + 0 | R-3 stängt |
| V2 | pps delas med summan av licensraderna (Adobe 5 + 1: 1 039,6 → 866,33, ingen anomali) | 1 + 0 | R-3 stängt |
| V3 | valutagrenen fångar `price_anomaly` med dubbla citattecken | 1 + 0 | R-4 |
| V4 | kortet döljs när svaret bär `prisprov` | 1 + 0 | R-4 |
| V5 | migreringen skriver ett pris med `UPDATE ONLY` | 1 + 0 | R-6 stängt |
| V6 | cachen v31 och radprövningen exporterad som `const` | 1 + 0 | R-7 stängt |
| V7 | «Fakturans löpande kostnad» tillbaka i per plats-meningen | 1 + 0 | — |
| W1 | vyn definierar en egen `prisavvikelseMening` med en falsk mening | **0 + 0** | S-3 |
| W2 | mains tak rapporterar `prov: 'rad'` (beteende: 928 hos Microsoft → `rad`) | 1 + 0 | — |
| W3 | `svara()` filtrerar bort fält som börjar på «pris» | **0 + 0** | S-6 |
| W4 | `migrate-price-db.mjs` seedar ett pris | **0 + 0** | S-4 |
| W5 | kortet döljs med `!/anomaly/.test(result.reason)` | **0 + 0** | S-3 |

S-1 och S-2 är beteenden och prövas inte av något sabotage. Ingen test i sviten kör per plats för en
faktura utan användare, eller radprövningen för en blandad faktura med en paketrad.

## Proveniens

- **Uppställning:** `git fetch origin claude/fable-5-resume-i60dmd main`, `git checkout --detach
  027f668b`. `origin/main` = 793810d3ef036c671236c4d029a8c819ef70ea3b. `node_modules` symlänkad från
  huvudklonen.
- **Baslinje:** `node --test tests/run.mjs` → tests 2718, pass 2718, fail 0, cancelled 0, 26 s
  (`l10/baslinje.txt`, via `l10/svit.sh`).
- **Läst:** förra domen, `git show 027f668b` med texten, grenens diff mot main, `src/lib/prisavvikelse.js`,
  `lib/supplier-price-intel.js`, `lib/licensniva.js`, `seatCount`, max-regeln, perioden och
  `pricePerSeatMonthly` i `agents/test-invoice/extract.js`, P1.2 i `api/test-invoice.mjs`, vyns gren,
  `watchedCard`, svarsmejlets text, LT-06, LT-11, SS-01..03, CV-19, regel 13, avgränsningen 22 okt och
  arbetsordern T-2.
- **Körda skript** (i `l10/`): `svit.sh`; `anvandare.mjs` (`anvandare.txt`); `paket.mjs` med
  `main-spi.mjs` (`paket.txt`, `main-s1.txt`); `rum.mjs` (`rum.txt`); `../l9/period.mjs` och `../l9/period2.mjs` mot
  027f668b (`period.txt`, `period2.txt`); `bygg.sh` (`npm run build`, rc 0, `build.txt`); `gor-sond.py`
  och `kor-sond.sh` (`sond.txt`, rc 0); `sab.py` med `vanta.sh`.
- **Inte kört:** handlern `api/test-invoice.mjs`, extraktionen och kategoriseringen med modellen,
  produktionen och mains prissättning av S-2:s faktura. Hur ofta S-1:s och S-2:s klasser förekommer är
  inte mätt. Vilket leverantörsnamn modellen skriver för en Azure-faktura är inte mätt.
- **Städat:** `build/`, `results/` (bara `screenshots/prisavvikelse`), sondkopian `l10/sond.mjs` och
  symlänken `node_modules` borttagna. `git status --porcelain --ignored` vid slutet: tomt. HEAD = 027f668b.
