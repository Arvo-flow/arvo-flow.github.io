commits: 3b5344f1
dom: BLOCKERAR

# Åttonde blicken på T-2: sjätte lagningen (3b5344f1)

Granskningen gäller grenens slutläge, 3b5344f1, mot `origin/main` 793810d3. Granskaren har inte byggt
koden. Uppdraget var att hitta var det gröna är osant. Skript och utfall ligger i
`/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-t2/l9/`.

## Domen

**BLOCKERAR.** R-1 räcker ensamt.

- 8 fynd: 2 [KUND] (R-1, R-2) och 6 [VAKT] (R-3 till R-8).
- R-1 och R-2 är införda i 3b5344f1 och syns i det PR:en ändrar. Båda har formen från N-1, P-1 och Q-1 en
  fjärde gång. Lagningen gjorde nämnaren till «det antal användare vi läste», men täljaren beskrivs
  fortfarande som en egenskap hos fakturan. Där perioden eller ett antal är fel läst är satsen falsk för
  just den fakturan. I R-1 är det dessutom vår egen regel som läste fel, och modellen läste rätt.
- ae4dfee0:s mening var sann i R-1:s fall. Den beskrev uträkningen utan «per månad» («fakturans löpande
  belopp delat med antalet licenser»). Lagningen bytte en falsk klass mot en annan.
- R-3 till R-8 gäller bevisen. Sju sabotage fällde noll tester.

**Det som håller.** Q-1 är stängt för nämnaren. Q-2 och Q-3 är stängda: texten är låst ordagrant. Q-4 och
Q-5 är stängda för de former förra domen prövade (M3, M4, M6, M7, M8 fäller LT-11). Q-6 är stängt för
UPDATE (M5). Q-7 är loggat. Rummet säger inget som motsäger vyn. Sonden går grön.

**Lagningen är liten.** Beskriv båda talen som avläsningar, till exempel «Det löpande belopp vi läste,
räknat per månad med den faktureringsperiod vi läste och delat med det antal användare vi läste, är högre
än …». Gör samma sak i radmeningen («Det pris per licens och månad vi läste på en licensrad …»). Låt LT-11
köra kedjan (`aggregateLineItems` → `validateSeatPrice`) för en kvartalsfaktura utan datum och för Adobe
5 + 1, så att U1 och U2 fäller.

## Fynd

### R-1 · [KUND] · infört i 3b5344f1: per plats-meningen kallar täljaren «fakturans löpande kostnad per månad», och för en faktura vars period lästs fel ligger den kostnaden under gränsen

- **Fil:** `src/lib/prisavvikelse.js` rad 19–23, visad i vyn för varje svar med `prisprov === 'per_plats'`.
- **Påstående:** «Fakturans löpande kostnad per månad, delad med det antal användare vi läste på fakturan,
  är högre än den gräns vi prövar automatiskt för leverantören.» Koden räknar `projected / seatCount /
  periodMonths` (`agents/test-invoice/extract.js` rad 1060–1066). `projected` är vår projektion, och
  `periodMonths` kommer ur den period vi bestämt, som regler kan skriva över (rad 899–935). Satsen säger
  «vi läste» om användarna men inte om kostnaden eller perioden.
- **Bevis** (`l9/period.mjs` → `l9/period.txt`; kedjan råform → `aggregateLineItems` →
  `prisprovningensIndata` → `validateSeatPrice` → `prisavvikelseMening`, allt på 3b5344f1):
  - Microsoft, kvartalsfaktura utan datum: E3 10 × 1 250,31 och E5 5 × 1 923,54 (årslistpris × 3, alltså
    korrekt). Modellen läser `quarterly`. Regeln `rule:multi-unit` (två rader med antal ≥ 5) gör perioden
    till månad. pps 1 474,72 > 765,70, `per_plats`, och meningen visas.
  - Meningens uträkning på fakturan: 22 120,80 / 3 = 7 373,60 per månad, delat med 15 = **491,57, under
    765,70.** Satsen är falsk för fakturan.
  - E5 5 + Business Premium 5, samma väg: pps 1 277,21, meningens tal 425,73.
  - Google Business Standard 10 × 1 656, årsfaktura, perioden oläst: `rule:recurring-default` ger månad.
    pps 1 656 > 468, meningens tal 138.
  - Adobe Acrobat Pro 4 × 3 276, årsfaktura, perioden oläst: pps 3 276 > 908,70, meningens tal 273.
  - LT-09:s eget fall, projektionen läst ×12 (`l9/period2.mjs` → `period2.txt`): pps 802,92 > 765,70,
    `per_plats`, meningens tal 66,91. Det är klassen regel 13 säger att mains tak finns kvar för.
- **Motprov:**
  - Samma Microsoft-faktura med tjänsteperiod 1 okt–31 dec: perioden blir `quarterly`, pps 491,57, ingen
    anomali. Stoppet beror alltså enbart på perioden.
  - Adobe-årsfakturan med perioden läst som `annual`: pps 273, ingen anomali.
  - LT-09 med `PROJEKTIONSKRAV_ENFORCE=1`: ingen anomali. Den grenen kräver att projektionskravet står i
    skugga. Om det gör det i produktion är obekräftat (miljövariablerna är inte lästa).
  - ae4dfee0:s uträkning, löpande belopp ÷ licenser, gav 1 474,72, 1 277,21, 1 656 och 3 276: över gränsen
    i varje fall. Den meningen var alltså sann här (`period.txt`, fältet `gamlaOverGrans`).
- **Vad kunden läser:** en kostnad per månad och användare som är högre än gränsen, och sedan skäl som
  inte gäller (flera produkter, tillägg, ett listpris över gränsen). Förklaringen som gäller står bara som
  gränsens allmänna syfte. Förra domen avgjorde formen för Q-1: «Det behöver inte betyda att priset är
  fel» gör inte den första satsen sann.
- **Main:** samma fakturor stoppas på main (samma `extract.js`, samma trösklar på samma tal; `git diff
  origin/main --stat` rör inte extraktionen) och får den generiska texten. Stoppet är förexisterande.
  Meningen är ny i grenen, och felklassen är ny i 3b5344f1.
- **Nåbarhet:** Microsoft-fallet kräver mains exakta namn, en faktura utan tjänsteperiod, modellens
  `quarterly` och minst två rader med antal ≥ 5. Inget modellfel behövs. Hur ofta det sker är inte mätt.
  Utan mätning räknas felet som synligt (avgränsningen 22 okt).
- **Regel 13 bröts i samma commit.** Den nya texten säger «Skriv bara det koden räknar, med kodens egen
  nämnare». Täljaren och perioden är inte det koden räknar i de här fallen.

### R-2 · [KUND] · infört i 3b5344f1: radmeningen påstår ett faktum om licensraden, falskt när antalet lästs fel

- **Påstående:** «Priset per licens på en licensrad är mer än dubbelt så högt som planens listpris, så vi
  kan ha läst ett tal fel …». ae4dfee0 sa «är högre än vi kan bekräfta automatiskt», vilket var sant i
  varje fall.
- **Bevis** (`l9/period2.txt`): Business Standard 10 × 171,82 (1,07 × månadspris 160,58) på pappret,
  antalet läst som 5. Dustin och Microsoft: `prov: 'rad'`, 343,64 > 321,16. Pappret: 171,82 per licens,
  under 2 × 160,58. Satsen är falsk för raden.
- **Motprov:** antalet läst som 10 ger ingen anomali.
- **Svagare än R-1:** samma mening säger «så vi kan ha läst ett tal fel», och felet kräver ett felläst
  antal som kolumnläsaren inte rättat. Jag klassar det som [KUND] för att satsen är skriven som fakta om
  fakturan, och stoppregeln säger [KUND] vid tvekan. Lagningen är densamma som för R-1.
- **Friat för perioden:** vid en kvartals- eller årssumma läst som månad står den större summan på raden,
  och `radensPrisPerManad` delar med minst 1 (läst, `lib/supplier-price-intel.js` rad 99–110). Då är satsen
  sann ordagrant.

### R-3 · [VAKT] · infört i 3b5344f1: LT-11:s Q-1-test prövar inte kedjan

- Testet «per plats-meningens uträkning är den som stoppade fakturan» räknar pps själv
  (`r2(lopande / anvandare / 1)`) och matar `validateSeatPrice` direkt. Förra domen bad om kedjan.
- **U1:** `pricePerSeatMonthly` delas inte med periodens månader. Beteende: E3 10 kvartal med datum gick
  från pps 416,77 till 1 250,31 och anomali. Sviten: 0 fail, 0 cancelled.
- **U2:** nämnaren blir summan av licensraderna i extraktionen. Beteende: Adobe 5 + 1 gick från pps 1 039,6
  och anomali till 866,33 utan. Sviten: 0 + 0.
- Ingen test i sviten binder alltså pps till perioden eller till användarna. Hålet i U1 är förexisterande
  (extraktionen är orörd), men testet som påstår att det prövas är nytt.

### R-4 · [VAKT] · kvar sedan Q-4: grenen i vyn prövas som text, inte som rendering

- **U3:** valutagrenen fångar `price_anomaly` med dubbla citattecken (`["foreign_currency",
  "price_anomaly"].includes(result.reason)`). Kunden får «Fakturan är i undefined — kontakta oss.» 0 + 0.
  Räkningen `/'price_anomaly'/g` ser bara enkla citattecken. Motprov M3 (enkla) fäller LT-11.
- **U4:** `result.route === 'review_queue' && !result.prisprov ? (`. Kortet med meningen nås inte för något
  svar som bär `prisprov`. 0 + 0.
- Sonden hade fångat båda (texten saknas). Grinden kör inte sonden.

### R-5 · [VAKT] · kvar sedan Q-5 och P-3: «prisprov sätts en gång» är en ordräkning

- **U5:** `svara()` filtrerar bort fält vars namn börjar på «pris» utan att skriva ordet. 0 + 0. Beteende:
  reservmeningen. Motprov M4 (stryker `prisprov` med namnet) och M8 (överskriven nyckel) fäller LT-11.
- Arbetsordern loggar redan P-3 som kvar.

### R-6 · [VAKT] · Q-6 i ny form: SS-01 fäller UPDATE men inte UPDATE ONLY

- **U6:** ett migreringssteg `UPDATE ONLY supplier_prices SET price_monthly = 416.77 …`. 0 + 0. Motprov M5
  (`UPDATE supplier_prices`) fäller SS-01. Ingen skrivare finns i dag.

### R-7 · [VAKT] · infört i grenen: CV-19 går grönt av tomhet när exporten byter form

- CV-19 returnerar tidigt om `/export function radensPrisPerManad/` saknas.
- **U7:** cachen till `v31` och `export const radensPrisPerManad = function (…)`. 0 + 0. Motprov M1 (bara
  `v31`) fäller CV-19.

### R-8 · [VAKT] · infört i 3b5344f1: tre påståenden i text som R-1 och R-3 motsäger

- `src/lib/prisavvikelse.js` rad 12: «Varje mening beskriver bara det prövningen räknar.» Falskt i R-1.
- `tests/listpristak.mjs`, LT-11: «varje sats ska vara sann för varje faktura den visas för.» Falskt i R-1
  och R-2.
- Commit-texten: «Syskonfall: Adobe med flera produkter per användare (meningens uträkning ger stoppet …)».
  Prövat utan kedjan (R-3).
- Inget av dem når kunden.

## Förra domens fynd

| ID | Status | Bevis |
|---|---|---|
| Q-1 | **Stängt för nämnaren, öppet för täljaren (R-1).** Adobe 5 + 1: 5 198 / 5 = 1 039,6 > 908,70, och meningen säger nu «det antal användare vi läste». Perioden och projektionen beskrivs som fakta. | `l9/beteende-ext.mjs`, `l9/period.txt` |
| Q-2 | **Stängt.** Alla fem textbitar är låsta ordagrant. | M2: 1 fail |
| Q-3 | **Stängt.** Varje ordändring fäller LT-11 (samma lås). | M2: 1 fail |
| Q-4 | **Stängt för T1, T2 och T6, öppet i varianter (R-4).** | M3, M6, M7: 1 fail var; U3, U4: 0 |
| Q-5 | **Stängt för T7 och T8, öppet i variant (R-5).** | M4, M8: 1 fail var; U5: 0 |
| Q-6 | **Stängt för UPDATE, öppet för UPDATE ONLY (R-6).** | M5: 1 fail; U6: 0 |
| Q-7 | **Loggat** i `ops/ARBETSORDER-VAG1.md` under T-2, «Kvar, [KUND], förexisterande». Rubriken står kvar (`src/pages/TestaFaktura/index.js` rad 1125, läst). | läst |

## Friat

- **Per plats för korrekta fakturor med rätt läst period.** Adobe 985, E5 769,42, E5 + Copilot 928 och
  Google 690 renderades med den nya meningen (`l9/sond.txt`). Satsen «delad med det antal användare vi
  läste» är sann också när antalet lästs till hälften (LT-09:s E3: 4 167,70 / 5 = 833,54 > 765,70; räknat
  ur testets tal, inte kört genom kedjan).
- **Reservmeningen.** Den nås bara utan `prisprov`. `validateSeatPrice` ger vid anomali alltid `per_plats`
  eller `rad` (läst, rad 139–169). Sonden: `per_plats+rad` → reservmeningen.
- **Regel 5.** `watchedCard` för `price_anomaly` hos Adobe, Microsoft, Google Workspace och Crayon AS:
  «Mottagen — men vi stoppade prissättningen … Skälet är tekniskt …» (`l9/rum.mjs`). Motprov
  `categorization_conflict`: ett annat kort. Grenen ändrar inga mejl (`git diff origin/main --stat`).
  Rummet säger mindre än vyn, inte motsatsen.
- **Sonden.** `scripts/screenshot-prisavvikelse.mjs`, kopia med Playwright ur
  `/opt/node22/lib/node_modules/playwright` och fem tillagda svar: rc 0 i 390 och 1600 px.
- **Talen.** 3b5344f1 lägger inga nya tal i regel 13 eller arbetsordern. LT-06 och regel 13:s äldre tal är
  inte omkörda; förra domen körde dem mot ae4dfee0, och 3b5344f1 rör inte `lib/supplier-price-intel.js`.
- **Commit-textens «10 tester föll».** Inte rekonstruerat exakt. Mina åtta motprov (M1–M8) fällde 1 var.

## Sabotage

Kördes med `l9/sab.py`: `assert old in s`, exakt en förekomst, kontroll att filen ändrades, beteendet
utskrivet för U1 och U2 (`l9/beteende-ext.mjs`), hela sviten per sabotage, återställning ur sparad sträng
med kontroll i `finally`. Utfall i `l9/sab-logg.txt`, `l9/sab.jsonl` och `l9/ut-*.txt`.

| ID | Riktning | Fällda (fail + cancelled) | Fynd |
|---|---|---|---|
| U1 | pps delas inte med periodens månader | **0 + 0** | R-3 |
| U2 | pps delas med summan av licensraderna | **0 + 0** | R-3 |
| U3 | valutagrenen fångar `price_anomaly` med dubbla citattecken | **0 + 0** | R-4 |
| U4 | kortet döljs när svaret bär `prisprov` | **0 + 0** | R-4 |
| U5 | `svara()` filtrerar bort fält som börjar på «pris» | **0 + 0** | R-5 |
| U6 | migreringen skriver ett pris med `UPDATE ONLY` | **0 + 0** | R-6 |
| U7 | cachen v31 och radprövningen exporterad som `const` | **0 + 0** | R-7 |
| M1 | motprov: cachen v31 | 1 + 0 | CV-19 |
| M2 | motprov: per plats säger «antalet licenser» | 1 + 0 | LT-11 |
| M3 | motprov: valutagrenen fångar skälet med enkla citattecken | 1 + 0 | LT-11 |
| M4 | motprov: `svara()` stryker `prisprov` med namnet | 1 + 0 | LT-11 |
| M5 | motprov: migreringen skriver med `UPDATE` | 1 + 0 | SS-01 |
| M6 | motprov: meningen i en JSX-kommentar | 1 + 0 | LT-11 |
| M7 | motprov: Copilot-mening direkt i vyns gren | 1 + 0 | LT-11 |
| M8 | motprov: `prisprov` skrivs över av en senare nyckel | 1 + 0 | LT-11 |

R-1 och R-2 är beteenden och prövas inte av något sabotage. Ingen vakt i sviten kör kedjan för en faktura
vars period eller antal är fel läst och läser meningen.

## Proveniens

- **Uppställning:** `git fetch origin claude/fable-5-resume-i60dmd main`, `git checkout --detach
  3b5344f1`. `origin/main` = 793810d3ef036c671236c4d029a8c819ef70ea3b. `node_modules` symlänkad från
  huvudklonen.
- **Baslinje:** `node --test tests/run.mjs` → tests 2718, pass 2718, fail 0, cancelled 0, 24,7 s
  (`l9/baslinje.txt`, via `l9/svit.sh`).
- **Läst:** förra domen, `git show 3b5344f1` med texten, grenens diff mot main, `src/lib/prisavvikelse.js`,
  `lib/supplier-price-intel.js`, `pricePerSeatMonthly`, perioden, projektionen och `seatCount` i
  `agents/test-invoice/extract.js`, utgången för `price_anomaly` och `svara()` i `api/test-invoice.mjs`,
  vyns granskningsgren, LT-09, LT-11, SS-01..03, CV-19, regel 13 och arbetsordern T-2.
- **Körda skript** (i `l9/`): `svit.sh`; `period.mjs` (`period.txt`); `period2.mjs` (`period2.txt`);
  `rum.mjs`; `bygg.sh` (`npm run build`, rc 0, `build.txt`); `gor-sond.py` + `kor-sond.sh` (`sond.txt`);
  `beteende-ext.mjs`; `sab.py` (`sab-logg.txt`, `sab.jsonl`, `ut-*.txt`). `kopiera.py` tog över
  `bygg.sh`, `kor-sond.sh`, `gor-sond.py` och `rum.mjs` ur `l8/` med nya sökvägar.
- **Inte kört:** handlern `api/test-invoice.mjs`, extraktionen och kategoriseringen med modellen,
  produktionen. Vägen från extraktion till P1.2 är läst, inte körd. Hur ofta R-1:s och R-2:s klasser
  förekommer i riktiga fakturor är inte mätt. Om `PROJEKTIONSKRAV_ENFORCE` är satt i produktion är inte känt.
- **Städat:** `build/`, `results/` (bara `screenshots/prisavvikelse`), symlänken `node_modules` och
  sondkopian `l9/sond.mjs` borttagna. `git status --porcelain --ignored` vid slutet: tomt. HEAD = 3b5344f1.
