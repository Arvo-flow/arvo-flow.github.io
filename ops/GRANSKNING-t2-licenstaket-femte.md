commits: cda5e7b6 bf54f91a
dom: BLOCKERAR

# Femte blicken på T-2: tredje lagningen och LT-10 (cda5e7b6, bf54f91a)

Granskningen gäller grenens slutläge, bf54f91a, mot `origin/main` 793810d3. Granskaren har inte byggt koden. Uppdraget var att hitta var det gröna är osant.

## Domen

**BLOCKERAR.** N-1 är ett [KUND]-fynd i den text PR:en själv skrev för att laga L-2. Det räcker ensamt.

- 5 fynd: 1 [KUND] (N-1) och 4 [VAKT] (N-2 till N-5).
- N-1: utfallet (granskning) är förexisterande och inte vanligare. Meningen kunden läser är ny i cda5e7b6 och fel för en nåbar klass korrekta fakturor. Den syns alltså i det PR:en ändrar, och den ligger i L-2-lagningens eget syfte: att ge `price_anomaly` ett sant skäl.
- N-2 och N-3 är införda. N-4 är förexisterande (SS-01 finns på main). N-5 är text.
- Vid tvekan har jag valt [KUND] (stoppregeln). Tvekan gällde N-1, inte N-3. Skälen står vid fynden.

**Det som håller.** Kategorigrinden gör det den ska. L-1, L-3 och L-4 är stängda. LT-06:s tal stämmer. Utanför `saas-productivity` är utfallet mains i 300 000 slumpfall. I `saas-productivity` ersätter radprövningen i de fall jag byggt ett falskt bytespåstående på main med granskning, utom i fönstret i N-3.

## Fynd

### N-1 · [KUND] · ny text, förexisterande utfall: fakturavyn kallar priset per plats «ett licenspris vi läste på fakturan»

- **Fil:** `src/pages/TestaFaktura/index.js` rad 1611–1628 (cda5e7b6). Kommentaren bär premissen: «det är ett avläst licenspris som inte går att bekräfta».
- **Påstående:** `price_anomaly` kommer från två prövningar. Vid prövning 1 (mains tak per plats) är det prövade talet `pricePerSeatMonthly` = projektion ÷ platser. Det är inget licenspris och inget tal som står på fakturan. Texten säger ändå «Ett licenspris vi läste på fakturan ligger utanför det vi kan bekräfta automatiskt». För en korrekt faktura med tillägg är det fel: varje licenspris på fakturan är bokens eget listpris.
- **Bevis:**
  - `l5/perplats.mjs` (råform → `aggregateLineItems` → HEAD-modulen), leverantör «Microsoft»:
    - E5 641,18 + Copilot 286,80, 10 licenser: `pricePerSeatMonthly` 928, `anomaly` true, `prov` per_plats.
    - E3 416,77 + Copilot 286,80 + Teams Phone 95,60: 799,2, per_plats.
  - Renderat (`l5/sond.mjs`, kopia av `scripts/screenshot-prisavvikelse.mjs` med ett tillagt svar för E5 + Copilot, 1600 px): kunden läser «Microsoft · Vi stoppade prissättningen. Ett licenspris vi läste på fakturan ligger utanför det vi kan bekräfta automatiskt, så vi kan ha läst ett tal fel, till exempel en kvartals- eller årssumma som ett månadspris.» Bild: `results/screenshots/prisavvikelse/granskare-e5-copilot-desktop.png` (borttagen efter körningen).
  - Svaret bär inte `prov` (`api/test-invoice.mjs` rad 1240–1252). Fakturavyn kan alltså inte skilja de två prövningarna åt.
  - Bibeln förbjuder formen: «per-seat-total får aldrig kallas licenspris» (attribueringsskyddet, 683-felet).
- **Motprov:**
  - E5 769,42 ensam ger per_plats med talet 769,42 = radens licenspris. Där är meningen sann.
  - En radprövning (Crayon, E3-årssumma läst som månad) ger samma text, och där är den sann.
  - Rummet säger för samma skäl «Skälet är tekniskt, och vi översätter det hellre inte till ett påstående om ert avtal som vi inte kan stå för» (`watchedCard`, körd). Fakturavyn gör nu just den översättningen.
- **Main:** samma fakturor går till granskning med den generiska texten «Vår algoritm är inte tillräckligt säker på klassificeringen». Den är också falsk. PR:en byter alltså ett falskt skäl mot ett annat för den här klassen. För radprövningen och för per plats med ett enda pris är den nya texten sann.
- **Nåbarhet:** prövning 1 körs bara på mains nio exakta namn. Den deterministiska kategoriseringen behåller rånamnet («Microsoft Ireland Operations Ltd», `test-pdfs/microsoft-direkt-usd.pdf`), så klassen nås när kategoriseringens modell normaliserar namnet till «Microsoft» eller när fakturan bär det namnet. Hur ofta är inte mätt. LT-02 bygger själv E5 + Copilot med «Microsoft» och kräver granskning. Utan en mätning räknas felet som synligt (avgränsningen 22 okt).
- **Varför det håller PR:en:** texten är ny i PR:en, och L-2-lagningens syfte var ett sant skäl för `price_anomaly`.
- **Förslag:** bär prövningen i svaret (`prov` eller ett underskäl) och ge per plats en egen mening, till exempel «Kostnaden per licens, räknad som fakturans belopp delat med antalet licenser, ligger utanför det vi prövar automatiskt. Det kan vara ett läsfel eller ett tillägg.» Eller en mening som är sann för båda. Lås texten i sviten (N-2).

### N-2 · [VAKT] · infört: fakturavyns gren för `price_anomaly` vaktas inte av sviten

- **Sabotage F1:** villkoret `result.reason === 'price_anomaly'` bytt till `'price_anomaly_x'`. Kunden får då den generiska texten igen (per konstruktion). Sviten: 0 fail, 0 cancelled.
- Bara renderingssonden kan se det, och Grinden kör sviten, inte sonden. En återgång av L-2 går alltså grön genom CI.
- Commit-texten för cda5e7b6 skriver «tjugo riktningar → 45 tester föll och renderingssonden föll». Den tjugonde riktningen fällde bara sonden. Det står där, men i en summa.
- **Förslag:** en källtextvakt eller en rendering i sviten som kräver grenen och förbjuder de generiska orden för `price_anomaly`.

### N-3 · [VAKT] · infört: LT-06:s prisaxel och premissen «ett listpris med påslag ligger under»

- **Påstående:** rutnätets korrekta priser är årspris, månadspris och 1,15 × årspris. Inget korrekt pris ligger över 1,2 × årspris. «Noll fall där main hade rätt och den nya fel» gäller därför bara inom den axeln, och det står inte bredvid talet. Modulhuvudet skriver premissen som fakta. BLIND nämner inte att en korrekt rad över 2 × månadspris nu går till granskning där main prissatte den.
- **Bevis** (`l5/saasfall.mjs`: mains hela beslut med per plats, LFL i `recommend()` med stubbad AI, finansgrinden och sanitetens tak 50 %):
  - Crayon, 30 × E3 416,77 + 8 × Business Standard 345: main PRISSÄTTS med byte 20 272 kr/år, HEAD GRANSKNING.
  - 30 × E3 + 5 × Business Basic 179: main byte 6 724 kr/år, HEAD GRANSKNING.
  - Ensam rad (E3 1 050): båda GRANSKNING, main via sanitet 60 %.
- **Varför [VAKT] och inte [KUND]:** samma tal har två sanningar. 345 är ett äkta påslag på 2,15 × månadspris eller Dustins à-pris 115 × 3 läst som månad. 179 är 2,2 × eller 59,67 × 3. Main gör ett precist påstående om ett tal som inte går att tolka. HEAD stoppar med en text som är sann för en radprövning: priset ligger utanför och kan vara felläst. Ingen siffra blir fel. Felet ligger i beviset: svepet och texten visar inte kostnaden.
- **Korpusen:** 13 nivårader i 9 testfakturor. Den högsta är 270 / 252,35 = 1,07 × månadspris (`l5/textlager.mjs`). Frekvensen i riktiga fakturor är inte mätt.
- **Motprov:** Standard 115 bland E3 och Basic 150 bland E3 prissätts på båda.
- **Förslag:** skriv prisaxeln bredvid «0 försämringar» i modulhuvudet, arbetsordern och regel 13. För in fönstret i BLIND som en kostnad.

### N-4 · [VAKT] · förexisterande, inte vanligare: SS-01 släpper ett råt prisseed i migreringen

- **Sabotage SS1:** ett steg `INSERT INTO supplier_prices …` i `api/admin/run-migration.mjs`, utan `upsertPrice` och utan namnet `seed:`. Sviten: 0 fail, 0 cancelled. Migreringen skriver då ett pris (per konstruktion).
- SS-01 letar bara `upsertPrice` och `name: 'seed:`. SS-01 och SS-02 finns oförändrade på main (`git show 793810d3:tests/listpristak.mjs`). Ingen skrivare till `supplier_prices` finns i dag (`grep`, bara `graph_supplier_prices` skrivs).
- Loggas för en egen PR.

### N-5 · [VAKT] · text: talen och lärdomen i regel 13

- Regel 13 säger «rutnätet ska bära varje kategori anropet nu når». LT-06 bär fem kategorivärden (saas-productivity, saas-creative, managed-workplace, it-support, null), och LT-10 elva till som enstaka fall. Beteendet håller ändå: grinden gör varje annan kategori lika med main (N-3:s svep och `l5/fuzz.mjs`).
- Regel 13 bär fortfarande «406 848 fall, 0 försämringar» som sista tal. Det är ea56bf42:s rutnät. Mot dagens rutnät ger ea56bf42 96 försämringar. Det nya talet 407 568 står bara i arbetsordern och commit-texten.
- «576 fall utanför saas-productivity» är 288 skilda fall, räknade två gånger: med en rad ger båda platsreglerna samma tal. Hela rutnätet: 369 384 skilda av 407 568 (`l5/lt06-unika.mjs`).

## Förra domens fynd

| ID | Status | Bevis |
|---|---|---|
| L-1 | **Stängt.** | `l5/kategorier.mjs`: Atea, Advania, Dustin (managed-workplace) och Nordic Drift (it-support) går vidare på HEAD och main med `requires_quote`. ea56bf42: GRANSKNING. M1 (grinden bort) fällde LT-06 och LT-10. |
| L-2 | **Delvis stängt.** Den falska generiska texten är borta för `price_anomaly`. Den nya är sann för radprövningen, men fel för per plats med tillägg (N-1). Ingen vakt i sviten (N-2). | `l5/sond.mjs`, F1 |
| L-3 | **Stängt.** | `kategorier.mjs` (L3): HEAD vidare, main vidare, ea56 GRANSKNING. M9 (à-pris i öre utan antal) fällde LT-05. |
| L-4 | **Stängt.** | M10 (`quantity >= 0`) och M11 (typspärren) fällde LT-05. |
| L-5 | **Öppet, loggat** i arbetsordern som F5-2/L-5. | A1 (mains gamla villkor runt anropet): 0 fail. |
| L-6 | **Delvis stängt.** Kategorierna står i modulhuvudet och arbetsordern. Prisaxeln gör det inte (N-3). | Modulhuvudet, `ARBETSORDER-VAG1.md` |

## Friat

- **Kategorigrinden är exakt `saas-productivity`.** LT-10 fäller spärrlista, prefix, gemener, `includes`, standardvärde och null (M3–M8, K10).
- **Kategorin är den slutliga.** `categorized` tilldelas en gång (`api/test-invoice.mjs` rad 1071, `_fryst` eller `categorize`). Bara `confidence` muteras (rad 1155). Prövningen (rad 1233) och `recommend()` (rad 1784) får samma objekt. Avläst, handlern inte körd.
- **Utanför `saas-productivity` är utfallet mains.**
  - LT-06 omkört ordagrant (`l5/lt06.mjs`) med testets referens och med mains riktiga modul: 576 fall, 0 skillnader.
  - `l5/fuzz.mjs`: 300 000 slumpfall över varje kategori i prisboken plus null och varianter, rader med och utan antal, typ och öre. 0 skillnader utanför `saas-productivity`, 0 fall där main fångar och HEAD inte.
  - Motprov: ea56bf42 gav 32 821 skillnader i samma svep.
- **«En rad utan antal prövas inte» släpper inget main fångade.** Prövning 1 är oförändrad, och samma svep gav 0 fall där main fångar och HEAD inte. Raderna utan antal ingick.
- **Paket i `saas-productivity`** (sammanfattningen saknar WaaS-ord, och `deterministicMatch` läser bara sammanfattning och leverantör, aldrig raderna). `l5/saasfall.mjs` P:
  - Ensam rad: main GRANSKNING via sanitet 77 %, HEAD GRANSKNING.
  - Med 40 E3: main PRISSÄTTS med byte 24 796 kr/år, ett falskt like-for-like där datorn ingår. HEAD GRANSKNING.
  - Main gav aldrig ett ärligt offertbesked i den kategorin.
- **Prorata feltypad som löpande, tre månader retroaktivt:** main påstår byte 50 013 kr/år (LFL 583,44 mot 416,77), HEAD GRANSKNING. Typad `one_time_fee` (schemats väg): båda prissätter rätt. Motprov 15 dagar: båda vidare.
- **LT-06:s tal:** 407 568 · 170 144 · 222 372 · 0 · 52 228 (`l5/lt06.mjs head test` och `head main`). ea56bf42: försämrat 96, som commit-texten säger.
- **bf54f91a:s «5 tester»:** spärrlista 1 (M3), prefix 1 (M4), gemener 1 (M5), null 2 (K10).
- **Rummet och mejlet:** `watchedCard` med `price_anomaly` ger reservkortet utan påhittat skäl. Svarsmejlet säger «Vi prissätter inte den här fakturan automatiskt» och pekar till rummet (`api/inbound-email.mjs` rad 773–775). Ingen motsägelse mot fakturavyns «Vi stoppade prissättningen». Portfolio och batchlistan säger bara «Manuell granskning» och «Kräver granskning».
- **Renderingssonden** gick grön i 390 och 1600 px, med motprovet (`categorization_conflict` ger den generiska texten). Sidan visar inget pris per plats i granskningsvyn.
- **`_harFynd`-grenen i `price_anomaly`** är död i produktion: utgången deklarerar `tillitTillRader: false`, `farVisaFynd` ger då `visa: false`, och svaret saknar `recommendation`. Avläst.
- **Commit-textens «45 tester»** för cda5e7b6 är inte rekonstruerad. Jag vet inte än om summan stämmer.

## Sabotage

Kördes med `l5/sab.py`: `assert old in s` och exakt en förekomst, hela sviten per sabotage, återställning ur sparad sträng med kontroll i `finally`. `assert` höll för alla femton.

| ID | Riktning | Fällda (fail + cancelled) | Tester |
|---|---|---|---|
| M1 | kategorigrinden bort | 2 + 0 | LT-06, LT-10 |
| M2 | `prisprovningensIndata` skickar `category: null` | 2 + 0 | LT-04, LT-10 |
| M3 | spärrlista (allt utom managed-workplace, it-support, null) | 1 + 0 | LT-10 |
| M4 | prefix `saas` | 1 + 0 | LT-10 |
| M5 | gemener + trim | 1 + 0 | LT-10 |
| M6 | `includes('saas-productivity')` | 1 + 0 | LT-10 |
| M7 | standardvärde `category = 'saas-productivity'` | 1 + 0 | LT-10 |
| M8 | indata utan kategori blir `saas-productivity` | 1 + 0 | LT-04 |
| M9 | à-pris i öre när antal saknas | 1 + 0 | LT-05 |
| M10 | `quantity >= 0` | 1 + 0 | LT-05 |
| M11 | rad utan typ räknas inte som löpande | 1 + 0 | LT-05 |
| K10 | null släpps igenom grinden | 2 + 0 | LT-06, LT-10 |
| F1 | fakturavyns gren för `price_anomaly` nås inte | **0 + 0** | beteendet ändrat per konstruktion (N-2) |
| A1 | anropet inlindat i mains gamla villkor | **0 + 0** | L-5, loggat; handlern inte körd |
| SS1 | råt prisseed i migreringen | **0 + 0** | beteendet ändrat per konstruktion (N-4) |

## Proveniens

- **Uppställning:** `git fetch origin claude/fable-5-resume-i60dmd main`, `git checkout --detach bf54f91a`. `origin/main` = 793810d3ef036c671236c4d029a8c819ef70ea3b. `node_modules` symlänkad från huvudklonen.
- **Baslinje:** `node --test tests/run.mjs` → tests 2714, pass 2714, fail 0, cancelled 0, 55 s.
- **Läst:** båda förra domarna, `git show` av cda5e7b6 och bf54f91a med texterna, modulen på HEAD, main och ea56bf42, `tests/listpristak.mjs`, `deterministicMatch`, `aggregateLineItems`, LFL i `recommend.js`, `verifySanity`, `farVisaFynd`, fakturavyns granskningsgren, `watchedCard`, svarsmejlet, Bevisplikten, stoppregeln med avgränsningen 22 okt och regel 13.
- **Körda skript** (i `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-t2/l5/`): `prep.mjs` (modulkopior ur `git show`), `kategorier.mjs`, `saasfall.mjs`, `perplats.mjs`, `lt06.mjs`, `lt06-unika.mjs`, `fuzz.mjs`, `fuzz-ea56.mjs`, `textlager.mjs`, `sab.py` (utfall i `sab.jsonl`, `sab-logg.txt`, `ut-*.txt`), `watchedCard` med `node -e`, `npm run build` (`build.txt`) och `sond.mjs` (kopia av sonden med Playwright ur `/opt/node22/lib/node_modules/playwright`, plus E5 + Copilot).
- **Den döda granskarens anteckningar** (`l4/`): jag läste `sab.py`, `sab.jsonl` och `extra-K11.txt` som idéer. K10 och K11 (= mitt F1) är omkörda mot sviten här. K11:s sondutfall är inte omkört. Inget mätvärde därifrån räknas.
- **Inte kört:** handlern `api/test-invoice.mjs`, kategoriseringens modell och validator, extraktionen med modellen, sonden under sabotaget F1, produktionen. Hur ofta N-1:s och N-3:s former förekommer i riktiga kundfakturor är inte mätt.
- **Städat:** `build/`, `results/screenshots/prisavvikelse` och symlänken `node_modules` borttagna. `git status --porcelain` vid slutet: tomt.
