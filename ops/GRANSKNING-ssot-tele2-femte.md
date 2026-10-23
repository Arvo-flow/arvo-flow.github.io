commits: 845f90cf
dom: MERGAS

# Femte blicken på PR #86: lagningen 845f90cf

PR #86 står öppen med head 845f90cf. Det är samma commit som den lokala grenen `vakter-framat` står på. Basen är 25682b28, toppen på `origin/main`. Grenen har 19 commits. Granskningen gäller 845f90cf, som svarar på BLOCKERAR i `ops/GRANSKNING-ssot-tele2-fjarde.md` (F4-1). Commiten före, adc5e90f, är den granskningsfilen. 845f90cf är toppen, så huvudet namnger bara den.

En granskare arbetade i en worktree med detached HEAD på 845f90cf. Baslinjen `node --test tests/run.mjs` gav tests 2706, pass 2706, fail 0, cancelled 0. Det är 4 färre än vid 9ceb6b2c, eftersom LT-05..08 togs bort med nivåtaket. Granskaren rapporterar rent `git status` efter varje sabotageomgång och vid slutet, och att den inte pushade, committade, startade något arbetsflöde eller använde Vercel-verktyg.

Filen är skriven av en agent som varken byggt eller granskat. Den återger granskarens fynd och utfall och har inte kört om något sabotage eller sviten. Det skrivaren själv läste och körde står under «Proveniens».

## Domen

**MERGAS.** Granskaren fann inget [KUND]-fynd. Commiten ändrar ingen kundsiffra jämfört med main: 10 000 000 anrop till mains modul och HEAD:s gav 0 skillnader (se «Friat», a).
- 5 fynd. Alla 5 är bekräftade med bevis och motprov. Alla 5 är [VAKT].
- Bekräftade [KUND]: 0.
- Bekräftade [VAKT]: 5.
  - F5-3, F5-4 och F5-5 är införda av 845f90cf. Alla tre gäller text: ett borttaget förbehåll, ett felräknat antal tak och ett påstående om lagade fynd.
  - F5-1 och F5-2 är förexisterande. Luckorna finns redan på main 25682b28, som saknar tester för prövningen. Grenen gör dem inte vanligare.
  - [VAKT] blockerar inte enligt stoppregeln (9 sep). De mergas och lagas framåt.
- Regeln som tillämpas är avgränsningen 22 okt (`CLAUDE.md` rad 327–353 vid 845f90cf), med den läsning som avgjordes under CTO-mandatet.

**F4-1 är stängt.** Fönstret 765,71–1 000,25 kr går till granskning, som på main. Trösklarna är mains: Microsoft 765,7, Google 468 och Adobe 908,7 kr.

**Lagningens påståenden som inte håller.** De ska stå här utan att mjukas upp:
- Commit-texten säger «Tre tak har prövats», och regel 13 i `CLAUDE.md` (rad 473–478) säger att PR #86 prövade tre tak. Grenen prövade fyra. fe149a4e hade min(fast tak, 1,30 × bokens högsta), och även det vidgade jämfört med main (F5-4).
- `ops/ARBETSORDER-VAG1.md` rad 32–33 skriver «exakt mains beteende (LT-01..04)», och modulhuvudet hänvisar FÅNGAR till LT-01. Beteendet är mains. Men LT-01..04 låser bara trösklarna, inte uppslaget av leverantörsnamnet. Skiftlägesbytet och sex av nio alias kan tas bort utan att något test faller (F5-1).
- Modulhuvudet vid 9ceb6b2c namngav kvartalssumman i BLIND. 845f90cf tog bort den. Beteendet består, och ingen dokumentation nämner det längre (F5-3).
- Arbetsordern rad 33 säger «T-5, T-6, T-7 och T-8 är lagade». Fjärde granskningen mätte att det inte håller för T-5, T-6 och NV-03-delen av T-7. Samma mening räknar sedan upp F4-3..5 som «lagas framåt» och motsäger sig själv (F5-5).
- Vägen från anomali till `review_queue` i `api/test-invoice.mjs` prövas av inget test. LT-04 är en källtextregex över anropets argument. Prövningen kan kopplas bort helt medan sviten är grön (F5-2).

**Det som stämmer i commit-texten:**
- «fyra riktningar … → 9 tester föll». Granskaren körde om alla fyra mot hela sviten: C1 2 (LT-01, LT-02), C2 2 (LT-01, LT-02), C3 4 (LT-01, LT-02, LU-20, LU-21) och C4 1 (LT-04). Summa 9 fail, 0 cancelled.
- «Prövningen har nu exakt mains beteende». 0 skillnader i 10 000 000 anrop, och 0 i ±2 000 ulp runt varje tröskel.
- «Två förexisterande fel»: av 17 verifierade listpriser för Microsoft (SEK) och Adobe går bara E5 769,42 och Adobe all-apps 985 till granskning.
- «Trösklarna … visas aldrig för kunden». `notifyReviewQueue` går till `ALERT_TO`, och svaret i grenen `price_anomaly` bär varken `detail` eller tröskel.
- «Anropet i api/test-invoice.mjs skickar bara namn och pris». Den enda skillnaden i prövningen mot main är att `tierKey: null` är borttagen.

**Vad som släpper grinden.** Med den här filen ger grinden ok=true (prov A under «Proveniens»). Det gäller 845f90cf.
- Ändras en fil i `lib/`, `api/` eller `agents/` efter 845f90cf faller grinden igen. Det gäller även en ren kommentar, eftersom grinden jämför fillistor (`lib/granskningsgrind.js` rad 86–90).
- F5-3 och F5-4 föreslår ändringar i modulhuvudet i `lib/supplier-price-intel.js`. Läggs de i PR #86 krävs en ny granskning. Stoppregeln säger att [VAKT] lagas framåt, och regel 5 (18–20 okt) att ny mekanik efter en granskad commit inte hör hemma i den granskade PR:en.
- Ändringar i `ops/`, `CLAUDE.md` och `tests/` efter domen släpps av grinden (rad 20–21).

## Bekräftade [KUND]-fynd

Inga. Granskaren redovisar inget [KUND]-fynd. Mätningen bakom: commitens beteende är identiskt med mains i varje prövat namn och pris (se «Friat», a).

## Bekräftade [VAKT]-fynd: lagas framåt enligt stoppregeln

Granskaren skrev sina sabotage med `sab.py`: `assert old in s` med exakt en förekomst, och återställning ur sparad sträng i `finally` med kontroll. Varje sabotage kördes mot hela sviten, och `fail` och `cancelled` räknades.

### Införda av grenen

#### F5-3: kvartalssumman försvann ur BLIND, och beteendet består
- **Fil:** `lib/supplier-price-intel.js`, modulhuvudet rad 23–26 (BLIND). `ops/ARBETSORDER-VAG1.md`.
- **Commit:** 845f90cf. Infört.
- **Påstående:**
  - Modulhuvudet vid 9ceb6b2c namngav en känd blindfläck i BLIND (rad 29): «en kvartalssumma läst som månad (som på main)».
  - 845f90cf tog bort den. HEAD:s BLIND nämner bara «en årssumma under tröskeln». Arbetsordern nämner varken kvartalssumman eller T-3.
  - Beteendet är mains och består: en kvartalssumma för Basic, Standard eller Premium läst som månad prissätts med tre gånger kundens kostnad.
  - Ingen kundsiffra ändras av commiten. Men den enda dokumentationen av felet är borta.
- **Bevis:**
  - `git show 9ceb6b2c:lib/supplier-price-intel.js`: rad 29 «BLIND: en kvartalssumma läst som månad (som på main)».
  - Grep på «kvartal» och «T-3» i HEAD:s modul och i `ARBETSORDER-VAG1.md`: 0 träffar.
  - `beteende.mjs` på HEAD med leverantören «Microsoft»: Basic 66,91 × 3 = 200,73 och 80,29 × 3 = 240,87, Standard 401,46 och 481,74, och Premium 630,87 och 757,05 prissätts. Adobe 273 × 3 = 819 prissätts också.
- **Motprov:** samma körning. E3 × 3 (1 250,31 och 1 500,36), E5 × 3 (1 923,54 och 2 308,26) och Adobe 381 × 3 = 1 143 går till granskning. Instrumentet skiljer alltså de två utfallen.
- **Vad som inte är kört:** «prissätts» är utfallet av `validateSeatPrice`. Kedjan nedströms, like-for-like och saniteten, är inte körd i den här granskningen. Tredje granskningen (T-3, `k3.mjs`) visade att de fångar Basic × 3 när nivån står i radtexten. Utan nivå i radtexten är det inte mätt.
- **Förslag:**
  - Skriv tillbaka kvartalssumman i BLIND: Basic, Standard och Premium samt Adobe Acrobat, som på main.
  - Logga den i arbetsordern som ett förexisterande fall som nivåradsprövningen i nästa PR ska stänga.

#### F5-4: regel 13 och commit-texten räknar tre tak, grenen prövade fyra
- **Fil:** `CLAUDE.md` regel 13 (rad 473–478), commit-texten («Tre tak har prövats») och modulhuvudet i `lib/supplier-price-intel.js` rad 7–13.
- **Commit:** 845f90cf. Infört.
- **Påstående:**
  - Regel 13 och commit-texten säger att PR #86 prövade tre tak (L-1, T-1, F4-1).
  - Grenen prövade fyra. fe149a4e hade min(fast tak, 1,30 × bokens högsta), alltså Microsoft 800, Google 600 och Adobe 1 200 kr. Även det vidgade jämfört med main.
  - Den fjärde versionen stärker regelns läxa. Men talet i bibeln stämmer inte med historiken. 9ceb6b2c-huvudet räknade den (K-2).
- **Bevis:**
  - `git log 25682b28..845f90cf -- lib/supplier-price-intel.js`: fem commits, fe149a4e, a1d8ef3f, b99882a6, 9ceb6b2c och 845f90cf.
  - `fyra-tak.mjs` körde fe149a4e:s modul med fe149a4e:s bok mot main, 0,01–2 000 kr. Där fe149a4e prissätter och main granskar: Microsoft 765,71–800 (3 430 punkter), Google 468,01–600 (13 200) och Adobe 908,71–1 200 (29 130).
- **Motprov:** samma svep i motsatt riktning, där fe149a4e granskar och main prissätter: 0 punkter för alla tre. Instrumentet rapporterar alltså riktningen och inte bara en skillnad.
- **Förslag:** skriv «fyra tak» och lägg till fe149a4e (fast tak 800, 600 och 1 200, K-2) i regel 13 och i modulhuvudet.

#### F5-5: arbetsordern säger att T-5, T-6 och T-7 är lagade
- **Fil:** `ops/ARBETSORDER-VAG1.md` rad 33.
- **Commit:** 845f90cf. Infört.
- **Påstående:**
  - Arbetsordern säger «T-5, T-6, T-7 och T-8 är lagade».
  - Fjärde granskningen (rad 33) mätte att det inte håller för T-5, T-6 och NV-03-delen av T-7 (F4-3, F4-4, F4-5).
  - Commiten skrev om raden men behöll påståendet. Samma mening räknar sedan upp F4-3..5 som «lagas framåt», så den motsäger sig själv.
- **Bevis:**
  - Rad 33 vid HEAD: «T-5, T-6, T-7 och T-8 är lagade. F4-3 (BI-14 är fortfarande en ordlista), F4-4 …».
  - `ops/GRANSKNING-ssot-tele2-fjarde.md` rad 33: «För T-5, T-6 och NV-03-delen av T-7 håller det inte (F4-3, F4-4, F4-5)». Sabotagen där var S1, S2, S3, S4 och S7, alla med 0 fail.
  - Granskaren har inte kört om F4-3..5, enligt uppdraget. Falskheten vilar på fjärde granskningens mätningar. Motsägelsen är avläst i filen.
- **Motprov:** T-3 togs bort ur samma lista, och T-8 friades i fjärde granskningen («Friat», T-8). Raden kan alltså stå sann för T-8.
- **Förslag:** skriv «T-8 är lagat. T-5, T-6 och T-7 är delvis lagade, och resten är F4-3, F4-4 och F4-5 ([VAKT], lagas framåt)».

### Förexisterande

#### F5-1: inget test prövar uppslaget av leverantörsnamnet med de namn produktionen skickar
- **Fil:** `lib/supplier-price-intel.js` (`leverantorsnyckel` rad 46, `SUPPLIER_KEY_MAP` rad 32–42), `tests/listpristak.mjs` (LT-01..03) och `ops/ARBETSORDER-VAG1.md` rad 32–33.
- **Commit:** 845f90cf. Förexisterande: luckan finns redan på main 25682b28, som saknar tester för prövningen. Inte vanligare.
- **Påstående:**
  - Arbetsordern skriver «exakt mains beteende (LT-01..04)», och modulhuvudet hänvisar FÅNGAR till LT-01.
  - Beteendet är exakt mains. Men LT-01..04 låser bara trösklarna, inte uppslaget.
  - LT och LU matar bara gemena namn: «microsoft», «google workspace» och «adobe».
  - Produktionen skickar `invoice.supplier` ordagrant, alltså «Microsoft» (`agents/categorizer/categorize.js` rad 147–382: `normalizedSupplier: invoice.supplier`).
  - Skiftlägesbytet och sex av nio alias kan tas bort utan att något test faller.
- **Bevis:** hela sviten, tests 2706, fail 0 och cancelled 0 för varje sabotage:
  - S9 tog bort `.toLowerCase()` i `leverantorsnyckel`.
  - S10 tog bort `trim`.
  - S3–S8 tog bort «microsoft corporation», «microsoft 365», «google», «google llc», «adobe inc» och «adobe systems».
  - Beteendet under S9 är kört (`beteende.mjs`): «Microsoft» 802,92 går från GRANSKNING till prissätts. «Adobe» 985 och «Google Workspace» 500 gör detsamma.
  - Main: `git grep` på 25682b28 i `tests` gav 0 filer som nämner `validateSeatPrice`, `supplier-price-intel` eller `price_anomaly`.
- **Motprov:** under S9 förblir «microsoft» 802,92 GRANSKNING. Det är testernas form, och därför ser LT inte skillnaden. Commitens C3 tar bort «microsoft» och fäller 4 (LT-01, LT-02, LU-20, LU-21). Instrumentet kan alltså falla när den nyckel testerna använder tas bort.
- **Förslag:**
  - Lägg ett LT-fall med de namn extraktionen ger: «Microsoft», «Adobe» och «Google Workspace» med versal, plus varje alias i `SUPPLIER_KEY_MAP`, med kravet granskning över tröskeln.
  - Alternativt bär T-2:s kedjetest (extraktion → `categorize` → `validateSeatPrice`) det i nästa PR. Då ska «(LT-01..04)» i arbetsordern inte stå som belägg för «exakt mains beteende».

#### F5-2: vägen från anomali till `review_queue` i `test-invoice` prövas inte
- **Fil:** `api/test-invoice.mjs` rad 1231–1253 och `tests/listpristak.mjs` LT-04.
- **Commit:** 845f90cf. Förexisterande: luckan finns redan på main 25682b28. Inte vanligare.
- **Påstående:** inget test prövar att en anomali leder till `review_queue`. LT-04 är en källtextregex över anropets argument, och inget test importerar handlern. Prövningen kan alltså kopplas bort helt medan sviten är grön.
- **Bevis:** hela sviten, fail 0 och cancelled 0 för båda sabotagen:
  - S11: «if (_priceCheck.anomaly) {» blev «if (_priceCheck.anomaly && false) {». tests 2706.
  - S12: «if (false && extracted.pricePerSeatMonthly && categorized.normalizedSupplier) {». Förankrat mot «const _priceCheck», eftersom villkoret står två gånger (rad 1231 och 2061).
  - Grep i `tests/` efter en import av `../api/test-invoice.mjs`: 0.
  - Beteendet följer av konstruktionen och är inte kört: grenen till `review_queue` nås aldrig.
- **Motprov:** C4, där anropet skickar en nivå igen, fällde LT-04 med 1 fail. Instrumentet ser alltså argumenten men inte grenen.
- **Förslag:** T-4 i arbetsordern (bryt ut indata till en ren funktion) täcker argumenten, inte routningen. Bryt också ut beslutet «anomali → route `review_queue`, reason `price_anomaly`», eller pröva handlern med en extraktion över tröskeln.

## Förexisterande, utanför PR:en

Granskaren redovisar inget förexisterande [KUND]-fynd. Fyra fel som tidigare loggats står kvar. Granskaren mätte att grenen inte gör något av dem vanligare: utfallet är exakt mains (se «Friat», a).
- **T-2** ([KUND], tredje granskningen): prövningen når bara exakta leverantörsnamn, inte det juridiska namn kategoriseraren ofta ger.
- **F4-2** ([KUND], fjärde granskningen): en Business Basic EES-årssumma läst som månad prissätts.
- **Adobe till listpris (985 kr)** och **Microsoft 365 E5 på månadsfakturering (769,42 kr)** går till granskning i stället för att prissättas. Ingen dom klassar dem som fynd. Commit-texten och arbetsordern kallar dem förexisterande fel.

Alla fyra står som en egen punkt i `ops/ARBETSORDER-VAG1.md` rad 36–45 (punkten T-2, som också nämner F4-2, Adobe och E5), avläst av skrivaren. T-2 och F4-2 står också i tidigare domar. Loggningen enligt avgränsningen 22 okt är alltså gjord för dem.

Att de inte håller PR:en följer tredje och fjärde granskningens tillämpning, och den står öppen för nästa blick. Motläsningen: grenen ändrar modulen där T-2 sitter. Men nettot mot main är ingen beteendeändring, och 845f90cf skjuter radprövningen till nästa PR uttryckligen. Domen vilar inte på den här tillämpningen: inget av granskarens fem fynd är [KUND].

## Obekräftade fynd

Inget av granskarens fem fynd är obekräftat. Följande delar är inte avlästa:
- **F5-1:** beteendet under S3–S8 och S10 är inte kört separat. Under S9 är det kört.
- **F5-2:** beteendet under S11 och S12 följer av konstruktionen och är inte kört.
- **F5-3:** kedjan nedströms (like-for-like och sanitet) är inte körd för kvartalssumman utan nivå i radtexten.
- **F5-5:** F4-3..5 är inte omkörda. Påståendet vilar på fjärde granskningens mätningar.
- **Ingen rendering**, `recommend()`:s AI-steg är inte kört, och ingen mätning mot produktion.
- **Påståendevakten** är grön mot 25682b28...HEAD, men den skriver själv att 5 prosapåståenden inte prövas (granskarens M14).

**En avläsning av skrivaren, som granskaren inte prövat.** `ops/ARBETSORDER-VAG1.md` rad 25–26 säger «L-1 (Basic-årssumman under taket) är lagat med ett nivåberoende tak». Vid 845f90cf finns inget nivåberoende tak: modulhuvudet (rad 6–16) beskriver mains trösklar med nivån null, och commit-texten säger att F4-6 försvann med nivåtaket. Raden stod före 845f90cf, och commiten ändrade den inte (`git show 845f90cf -- ops/ARBETSORDER-VAG1.md`). L-1:s fall, Basic × 12, går till granskning genom mains tröskel (LT-02). Raden är arbetsordertext och når ingen kund. Bekräftas den är den alltså [VAKT], av samma form som F5-5.

## Friat

Avläst och friat av granskaren, med varje mätning:
- **(a) Beteendet är identiskt med mains.**
  - `svep.mjs`: 10 000 000 anrop till mains modul (`tierKey: null`) och HEAD:s. 25 namn: alla nio nycklar i `SUPPLIER_KEY_MAP`, versaler, blanksteg, juridiska namn, okända namn, '', null, undefined, constructor, __proto__, toString, valueOf och hasOwnProperty. Priser 0,01–2 000 kr i steg om 1 öre, i två flyttalsrepresentationer. 0 skillnader i `anomaly` och `ok`.
  - Udda indata gav också 0 skillnader: 0, negativa tal, NaN, ±Infinity, strängar, arrayer, objekt, MAX_VALUE, 1e-300, och namn som 123, true, {}, [] och ['microsoft'].
  - `ulp.mjs`: ±2 000 ulp runt varje tröskel, och kvoter projected/platser för 1–500 platser ±3 öre. 0 skillnader.
  - Motprov: en tröskel på 765,71 för Microsoft ger 1 skillnad.
  - F4-1 är alltså stängt: fönstret 765,71–1 000,25 går till granskning, som på main.
  - T-2, F4-2 (Basic EES × 12 prissätts), Adobe 985 och E5 769,42 är exakt som på main, alltså inte värre och inte vanligare.
- **(b) Inget läser de borttagna fälten eller exporterna.**
  - Ingen fil i `api/`, `lib/`, `src/`, `scripts/`, `agents/`, `tests/` eller `.github` läser `msrp`, `ratio` eller `source` ur svaret, eller `getSupplierPriceIntel`, `getBenchmarkBasis`, `SUPPLIER_PRICE_INTEL` eller `licensprisTak`. Undantaget är LT-04:s `doesNotMatch`.
  - Den enda anroparen av `validateSeatPrice` är `api/test-invoice.mjs`, och den läser `.anomaly` och `.detail`. Main läste inte heller `msrp`, `ratio` eller `source`.
  - `getDominantSaasTierKey` används inte längre i `api/`. `api/test-invoice.mjs` laddas, och `default` är en function.
  - `lib/price-alert.js` använder `leverantorsnyckel`, och den är oförändrad.
- **(c) Påståendena stämmer i övrigt.**
  - 1,30 × 589 = 765,7, 1,30 × 360 = 468 och 1,30 × 699 = 908,7. De fasta taken 800, 600 och 1 200 ligger över.
  - «Två förexisterande fel» stämmer mot boken. Av 17 verifierade listpriser för Microsoft (SEK) och Adobe går bara E5 769,42 och Adobe all-apps 985 till granskning (`listpriser.mjs`).
  - «Visas aldrig för kunden» stämmer. `notifyReviewQueue` går till `ALERT_TO`, och `svara()` i grenen `price_anomaly` bär varken `detail` eller tröskel.
  - LT-02:s Basic × 12 är 802,92 och 963,48. Copilot- och Teams-talen ligger under 765,7.
  - Rubriken «SEX REGLER TILL» stämmer: reglerna är 8–13.
  - F4-6 försvann med nivåtaket.
- **(d) Commitens sabotagetal.** «Fyra riktningar → 9 tester föll» är omkört mot hela sviten: C1 2 (LT-01, LT-02), C2 2, C3 4 (LT-01, LT-02, LU-20, LU-21) och C4 1 (LT-04). Totalt 9 fail och 0 cancelled. Granskarens egna sabotage som fällde: S1 (Googles tröskel 600) 1 och S2 (`>=`) 1. De som fällde 0 står i F5-1 och F5-2.
- **Vakterna.** `pastaendevakt` mot 25682b28...HEAD är grön. `granskaCommit` på commitens meddelande och diff gav ok. Motprovet utan sabotageraden gav ok=false.
- **Baslinjen:** tests 2706, pass 2706, fail 0, cancelled 0.

### Sabotagen, samlat

| Utfall | Sabotage |
|---|---|
| fällde | C1 (2), C2 (2), C3 (4), C4 (1): commitens fyra, 9 fail och 0 cancelled |
| fällde | S1 (1, LT-01): Googles tröskel 600. S2 (1, LT-01): `>` blir `>=` |
| fällde 0, beteendet ändrat och kört | S9 (F5-1, `beteende.mjs`) |
| fällde 0, beteendet inte kört separat | S3–S8 och S10 (F5-1) |
| fällde 0, beteendet följer av konstruktionen | S11 och S12 (F5-2) |

Granskaren körde 12 egna sabotage och körde om commitens 4. Skrivaren har inte kört om något av dem.

## Proveniens

- **Granskaren.** En granskare. Arbetet kom till skrivaren som JSON i uppdraget.
  - Worktree `/home/user/arvo-flow.github.io/.claude/worktrees/wf_58f3b889-604-1`, detached på 845f90cf9107e14259c39f3c2dc55ff9306aaf8f, bekräftad med `git rev-parse` före och efter. `node_modules` symlänkad. `git status --porcelain` var tomt efter varje sabotageomgång och vid slutet.
  - Katalog: `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-ssot-femte/`. Anteckningar M1–M15 i `anteckningar.txt`.
  - Läst av granskaren:
    - `git show 845f90cf`, alla fem filerna och commit-texten.
    - `ops/GRANSKNING-ssot-tele2-fjarde.md` i sin helhet.
    - T-2, T-3, T-4 och T-8 i `-tredje.md`, och K-2 i `ops/GRANSKNING-ssot-tele2.md`.
    - `lib/supplier-price-intel.js` vid HEAD, main 25682b28, 9ceb6b2c och fe149a4e.
    - `api/test-invoice.mjs` rad 1220–1275 och `notifyReviewQueue` (rad 287–302).
    - `git diff 25682b28..HEAD` för `api/test-invoice.mjs`, och mains anrop av `getBenchmarkBasis`.
    - `tests/listpristak.mjs` vid HEAD och 9ceb6b2c.
    - `tests/larmunderlag.mjs` LU-19..22, `lib/price-alert.js` rad 1–60 och `categorize.js` (`normalizedSupplier`).
    - `CLAUDE.md` regel 8–13, `ARBETSORDER-VAG1.md` rad 27–45, `scripts/pastaendevakt.mjs`, `scripts/commitkrav.mjs` och `lib/diffintervall.js`.
  - Kört av granskaren:
    - `svep.mjs`, `ulp.mjs`, `listpriser.mjs`, `beteende.mjs`, `fyra-tak.mjs` och `commitkrav-prov.mjs`.
    - `node --test tests/run.mjs` som baslinje.
    - `sab.py` (`assert old in s` med exakt en förekomst, återställning i `finally` med kontroll) mot hela sviten, 16 sabotage: C1–C4 och S1–S12.
    - Grep i `api`, `lib`, `src`, `scripts`, `agents`, `tests` och `.github`, och `git grep` på 25682b28.
    - `pastaendevakt` med `ARVO_DIFF_BAS=25682b28`.
  - Inte kört av granskaren: rendering, `recommend()`:s AI-steg, F4-2..F4-5 och T-2 (enligt uppdraget), mätning mot produktion och stress-test.
  - Inget pushades eller committades, inget arbetsflöde startades och inga Vercel-verktyg användes.
  - Katalogen ligger utanför repot och försvinner med sessionen. Det som ska citeras senare behöver gå in i `ops/` via en PR.
- **Skrivaren har inte kört om något sabotage och inte kört sviten.** Fynden och utfallen ovan är granskarens.
- **Skrivarens egna avläsningar, 22 okt:**
  - `git rev-parse HEAD` i `vakter-framat` gav 845f90cf9107e14259c39f3c2dc55ff9306aaf8f. `git merge-base HEAD origin/main` gav 25682b28837ec47d87e685688d40d9b92d36fc54, som är `origin/main`. `git log origin/main..HEAD` gav 19 commits. `git status --porcelain` var tomt före skrivningen.
  - `gh api repos/Arvo-flow/arvo-flow.github.io/pulls/86`: state open, head 845f90cf9107e14259c39f3c2dc55ff9306aaf8f, base 25682b28837ec47d87e685688d40d9b92d36fc54.
  - `git show --stat 845f90cf`: 5 filer, 88 rader in och 241 ut. Två mekanikfiler: `api/test-invoice.mjs` och `lib/supplier-price-intel.js`. Övriga: `CLAUDE.md`, `ops/ARBETSORDER-VAG1.md` och `tests/listpristak.mjs`. Commit-texten är läst i sin helhet, och citaten ovan är ordagranna ur den.
  - `git diff --name-only origin/main...HEAD`: 39 filer, varav 13 mekanikfiler.
  - `git log 25682b28..845f90cf -- lib/supplier-price-intel.js`: fem commits, som F5-4 säger.
  - `git show 845f90cf -- ops/ARBETSORDER-VAG1.md CLAUDE.md`: rad 30–35 i arbetsordern och regel 13 är nya i commiten. Rad 25–29 i arbetsordern är orörda.
  - Läsningar i koden vid 845f90cf:
    - `lib/supplier-price-intel.js` rad 1–69: huvudet (rad 1–26), `AVLASNINGSTROSKEL` (rad 30), `SUPPLIER_KEY_MAP` (rad 32–42) och `leverantorsnyckel` (rad 45–47).
    - `git show 9ceb6b2c:lib/supplier-price-intel.js`: BLIND med kvartalssumman.
    - `api/test-invoice.mjs` rad 1228–1256: anropet skickar `normalizedSupplier` och `pricePerSeatMonthly`, och grenen leder till `review_queue` med `price_anomaly`.
    - `tests/listpristak.mjs`: LT-01 (rad 20–25) matar «microsoft», «google workspace» och «adobe». LT-02 (rad 27–38) matar «microsoft» och «adobe». LT-04:s regex står på rad 53.
    - `agents/categorizer/categorize.js`: grep på `normalizedSupplier: invoice.supplier` gav träffar från rad 147.
    - `tests/`: 0 importer av `api/test-invoice.mjs`. 39 rader läser filen som text med `readFileSync`.
    - `lib/commitkrav.js` rad 42: `KRAVDA_KATALOGER = /^(lib|api|agents)\//`.
    - `ops/ARBETSORDER-VAG1.md` rad 25–26 (L-1), 32–33 (citaten i F5-1 och F5-5) och 36–45 (punkten T-2, med Adobe och E5 på rad 38–39 och F4-2 på rad 40).
    - `CLAUDE.md`: avgränsningen rad 327–353, rubriken «SEX REGLER TILL» rad 453 och regel 13 rad 473–478.
    - `ops/GRANSKNING-ssot-tele2-fjarde.md` i sin helhet, och T-2 (rad 155–183) och T-3 (rad 86–101) i `-tredje.md`.
  - Granskarens utfallsfiler stämmer med JSON:en: `baslinje.txt` (2706 av 2706), `utfall-commit.txt` (C1 2, C2 2, C3 4, C4 1), `utfall-egna-1.txt` och `utfall-egna-2.txt` (S1 1, S2 1, S3–S12 0, alla med 0 cancelled).
- **Grinden på den här filen.** `lasGranskning` och `andraBlicken` ur `lib/granskningsgrind.js` vid 845f90cf, körda med `node` från stdin, utan någon ny fil. Indata: bas 25682b28, grenens 19 commits, 39 ändrade filer (13 mekanikfiler) och de 20 `ops/GRANSKNING-*.md` som fanns före skrivningen. Huvudet prövades före skrivningen, eftersom filen inte rörs efteråt. `lasGranskning` läser huvudet som `{"commits":["845f90cf"],"dom":"MERGAS"}`.

  | Prov | Granskningar | Utfall |
  |---|---|---|
  | A: med den här filens huvud | 20 + denna | ok=true: «13 mekanikfil(er) täckta av ops/GRANSKNING-ssot-tele2-femte.md (commit 845f90c)» |
  | B: motprov, samma huvud med `dom: BLOCKERAR` | 20 + denna | ok=false: «ops/GRANSKNING-ssot-tele2-femte.md: senaste domen är BLOCKERAR — bara «dom: MERGAS» släpper mekanik till main» |
  | C: motprov utan den här filen | 20 | ok=false: «ops/GRANSKNING-ssot-tele2-fjarde.md: senaste domen är BLOCKERAR — bara «dom: MERGAS» släpper mekanik till main» |

  Grinden kan alltså svara båda hållen på samma huvud, och den här filen är den som gäller för PR:en. Grinden ser bara huvudet. Den kan inte se vem som skrev filen eller om den är sann.
- **Hårda mellanslag** räknas med en byte-räkning efter skrivningen (bibelns regel 7). Utfallet står i överlämningen, inte här, eftersom filen inte rörs efteråt.
