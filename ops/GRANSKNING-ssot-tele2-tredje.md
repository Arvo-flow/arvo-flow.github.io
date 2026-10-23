commits: b99882a6
dom: BLOCKERAR

# Tredje blicken på PR #86: lagningen b99882a6

PR #86 står öppen med head b99882a6. Det är samma commit som den lokala grenen `vakter-framat` står på. Basen är 25682b28, toppen på `origin/main`. Grenen har 15 commits. Granskningen gäller lagningen b99882a6, som svarar på BLOCKERAR i `ops/GRANSKNING-ssot-tele2-lagningen.md` (L-1). Commiten före, 759863cd, är den granskningsfilen. b99882a6 är toppen, så huvudet namnger bara den.

En granskare arbetade i en worktree med detached HEAD på b99882a6. Baslinjen `node --test tests/run.mjs` gav tests 2708, pass 2708, fail 0, cancelled 0. Granskaren rapporterar rent `git status` vid slutet, och att den inte pushade, committade, startade något arbetsflöde, använde Vercel-verktyg eller körde stress-test.

Filen är skriven av en agent som varken byggt eller granskat. Den återger granskarens fynd och utfall och har inte kört om något sabotage eller sviten. Det skrivaren själv läste står under «Proveniens».

## Domen

**BLOCKERAR.** T-1 är ett bekräftat [KUND]-fynd som b99882a6 inför, och det gör ett fel vanligare än på main. Det räcker ensamt.
- 8 fynd. 7 är bekräftade med bevis och motprov. 1 är obekräftat (T-8).
- Bekräftade [KUND]: 2.
  - T-1 är infört av b99882a6 och gör felet vanligare.
  - T-2 är förexisterande och ligger utanför PR:en. Det blockerar inte (se T-2).
- Bekräftade [VAKT]: 5, T-3 till T-7. Alla är införda av b99882a6. [VAKT] blockerar inte enligt stoppregeln (9 sep). De mergas och lagas framåt.
- Obekräftat [KUND]: T-8, infört av b99882a6. Det räknas inte mot domen. Bekräftas det, blockerar det, eftersom grenen inför det.
- Regeln som tillämpas är avgränsningen 22 okt (`CLAUDE.md` rad 327–353 vid b99882a6), med den läsning som avgjordes under CTO-mandatet.

**L-1 är lagat på den väg testerna prövar, och lagningen inför ett fel åt andra hållet.**
- Business Basic × 12 (802,92 och 963,48 kr) går nu till granskning, med och utan läst nivå (`k1.mjs`, LT-03).
- Men taket blev lägre än mains för tre nivåer. Korrekt lästa Microsoft-fakturor med Microsofts egna tillägg per plats går nu till granskning, där main och a1d8ef3f prissatte dem (T-1).
- Och taket prövas bara när leverantören heter exakt «Microsoft». Ingen av korpusens lagrade extraktioner ger det namnet (T-2, förexisterande).

**Lagningens påståenden som inte håller.** De ska stå här utan att mjukas upp:
- Commit-texten säger om taket med läst nivå: «Det rymmer tillägg per plats». Taket rymmer tillägg upp till 1,5 × nivåpriset. Microsoft 365 Copilot (286,80 kr) är 2,1 × Standards och 4,3 × Basics årsåtagandepris (T-1). Modulhuvudet (`lib/supplier-price-intel.js` rad 21–22) skriver gränsen «upp till 1,5 × nivåpriset», och den stämmer med granskarens mått.
- Commit-texten säger att taket «fångar kvartals- och årssummor lästa som månad». Modulhuvudet (rad 22–23) säger «En kvartalssumma (3×) och en årssumma (12×) läst som månad ligger över (LT-03, LT-07)». För Basic och Premium på årsåtagandepris landar kvartalssumman på taket eller under, och den prissätts (T-3).
- Commit-texten och modulhuvudet (rad 17–18) beskriver den periodlösa årsfakturan som L-1:s fall och taket som svaret. Taket prövas bara när leverantörsnamnet är exakt «microsoft», «microsoft 365» eller «microsoft corporation». En faktura från «Microsoft Ireland Operations Ltd» går auto med tolv gånger kundens kostnad, på HEAD som på main (T-2).
- Commit-texten säger att BI-14 «fäller prisomdömen». Fyra omdömen passerar BI-14:s egna regexar (T-5).
- Commit-texten säger att matchningslöftets «form är spärrad i kundmeningsregistret (KM-05)». Spärren är en exakt fraslista, och en böjning passerar (T-6).
- Commit-texten säger att NV-03 och NV-10 «kör den riktiga run() i stället för en källtextregex». De kör den med injicerad läsare. Fabrikens anrop, `v.run()` utan argument, prövas inte (T-7).

**Det som stämmer i commit-texten:** «tio riktningar … → 11 tester föll (LT fem gånger, NV-03, NV-10, BL-08, BI-14 två gånger, KM-05)». Granskaren körde om alla tio mot hela sviten: 11 fail, 0 cancelled. Commitens rendering av rummet i 390 och 1600 px är inte omkörd av granskaren.

**Vad som släpper grinden.** Med den här filen ger grinden ok=false, «senaste domen är BLOCKERAR» (prov A under «Proveniens»). En lagning av T-1 ändrar `lib/supplier-price-intel.js`, alltså en mekanikfil efter b99882a6. Den behöver en ny granskning som namnger den commiten (`lib/granskningsgrind.js` rad 16–21). Ur granskarens fynd följer tre saker:
- T-1 lagas före T-2. En nyckelfix som når «Microsoft Ireland Operations Ltd» gör T-1 lika nåbar som taket självt.
- T-8 är infört av grenen och obekräftat. Nästa blick ska pröva det. Granskarens förslag («inget verifierat listpris i prisboken») byter påståendet mot ett som boken bär, utan mätning mot källan.
- T-2 hör inte till PR:en. Nästa commit-text och modulhuvudet ska ändå inte säga att den periodlösa årsfakturan fångas utan villkoret «när leverantören heter exakt Microsoft».

## Bekräftade [KUND]-fynd

### T-1: det nivåberoende taket skickar korrekt lästa Microsoft-fakturor med tillägg per plats till granskning
- **Fil:** `lib/supplier-price-intel.js`, `licensprisTak` (rad 85) med `NIVAFAKTOR` 2,5 (rad 32).
- **Commit:** b99882a6. Infört av lagningen. Gör felet vanligare: main och a1d8ef3f prissatte samma fakturor.
- **Påstående:**
  - Med läst nivå är taket 2,5 × nivåns listpris, där listpriset är det högsta av månads- och årsåtagandepriset.
  - Taket är nu lägre än mains 765,7 kr för tre nivåer: Basic 200,73, Standard 401,45 och Premium 630,88.
  - Förra blickens friande av K-2 vilade på att «inget tak blev lägre än på main». Det gällde a1d8ef3f. Vid b99882a6 gäller det inte.
  - Fall som nu går till granskning: Business Basic och Business Standard med Microsoft 365 Copilot eller Copilot för företag, och Basic på månadspris med Teams-telefon och Defender.
  - Kunden får reservkortet «vi stoppade prissättningen» i stället för en dom, trots att varje tal är rätt läst.
  - Hur ofta det når en kund begränsas av T-2: taket körs bara när leverantörsnamnet är exakt «Microsoft». Samma förutsättning bar förra blickens BLOCKERAR på L-1.
- **Bevis:** `k1.mjs` kör den riktiga `aggregateLineItems`, HEAD:s `getDominantSaasTierKey` och tre versioner av taket: main-kopian `spi-main.mjs` med `tierKey` null (som main:s `api/test-invoice.mjs` rad 1235 skickar), a1d8ef3f-kopian och HEAD. 10 platser, månadsfakturering. Första raden gav `niva=business-standard route=auto`.

  | Faktura, kr per plats och månad | pps | main | a1d8ef3f | HEAD |
  |---|---|---|---|---|
  | Standard årsåtagande 133,82 + Microsoft 365 Copilot 286,80 | 420,62 | prissätts | prissätts | GRANSKNING, tak 401,45 |
  | Basic 66,91 + Copilot för företag 200,70 | 267,61 | prissätts | prissätts | GRANSKNING, tak 200,73 |
  | Basic 80,29 + Copilot för företag, kampanj 172,03 | 252,32 | prissätts | prissätts | GRANSKNING |
  | Basic 66,91 + Microsoft 365 Copilot 286,80 | 353,71 | prissätts | prissätts | GRANSKNING |
  | Basic månadspris 80,29 + Teams-telefon Standard 95,60 + Defender för företag 28,70 (`k3.mjs`) | 204,59 | prissätts | prissätts | GRANSKNING |

  - Priserna kommer ur repot: `ops/probe-prisbok.txt` (Microsoft 365 Copilot 286,80 kr/anv/mån årsvis) och `ops/probe-m365-priser.txt` (Copilot för företag 200,70, kampanj 172,03, Teams-telefon Standard 95,60, Defender för företag 28,70).
  - Formen är avläst ur en lagrad extraktion: `teach-loop/results.json`, microsoft-direkt-usd (Microsoft Ireland Operations Ltd). Där står Premium 330 + Copilot 450 (`is_addon` true), `seatCount` 15 och pps 52. Modellen räknar alltså in Copilot i pps och dubblar inte platserna.
  - Inget LT-test prövar ett tillägg över 1,4 × nivåpriset. LT-03 «Basic med tillägg» prövar `Math.round(80,29 × 2,4)` = 193 (`tests/listpristak.mjs` rad 60, läst av skrivaren).
- **Motprov:** samma instrument prissätter i alla tre versionerna:
  - Premium 210,29 + Copilot 286,80 (497,09).
  - Standard 160,58 + Copilot för företag 200,70 (361,28).
  - Standard 133,82 utan tillägg.
  - Basic 66,91 + Teams-telefon + Defender (191,21).
  - Basic × 12 (802,92) går till granskning på main och HEAD. Instrumentet kan alltså svara båda hållen, och skillnaden gäller bara tillägg över 1,5 × nivåpriset.
- **Vad som inte är kört:** rummet är inte renderat, och `recommend()`:s AI-steg är inte kört. Frekvensen i produktion är inte mätt. Avgränsningen kräver ingen frekvens för «vanligare», bara en mekanism i diffen. Mekanismen är faktorn 2,5 i `licensprisTak`.
- **Förslag:**
  - Pröva tilläggen separat i stället för att höja faktorn.
  - Ta taket ur nivåraderna själva, där à-pris per rad ställs mot nivåns listpris, och inte ur pps. pps är projected ÷ platser och bär varje tillägg.
  - Eller räkna bort radbelopp som saknar nivå (`is_addon`, eller ingen nivånyckel) ur täljaren innan taket prövas.
  - Lägg Standard + Copilot 286,80 och Basic + Copilot för företag 200,70 som syskonfall i LT, med kravet «prissätts».
  - Stryk «rymmer tillägg per plats» ur commit-texten och modulhuvudet tills det är sant. Modulhuvudet bär redan gränsen 1,5 × (se «Domen»).

## Bekräftade [VAKT]-fynd: lagas framåt enligt stoppregeln

Granskaren skrev sina sabotage med `sab.py`: `assert old in s` med exakt en förekomst, och återställning ur sparad sträng i `finally` med kontroll. Varje sabotage kördes mot hela sviten, och `fail` och `cancelled` räknades. Alla fem fynden är införda av b99882a6. Inget förexisterande [VAKT] redovisas.

### T-3: en kvartalssumma för Basic och Premium på årsåtagandepris prissätts
- **Fil:** `lib/supplier-price-intel.js` (modulhuvudet rad 22–23) och commit-texten.
- **Commit:** b99882a6. Infört.
- **Påstående:**
  - Microsofts månadspris är årsåtagandepriset × 1,2. 2,5 × månadspriset är alltså exakt 3,0 × årsåtagandepriset.
  - En kvartalssumma på årsåtagandepriset landar på taket, och avrundningen avgör.
  - Basic 66,91 × 3 = 200,73, lika med taket 200,73. Den prissätts.
  - Premium 210,29 × 3 = 630,87, under taket 630,88. Den prissätts.
  - Standard 133,82 × 3 = 401,46 fångas på 1 öre (tak 401,45).
  - LT-03 prövar bara Standard × 3 på månadspriset (481,74).
- **Bevis:**
  - `k1.mjs`: «Kvartalssumma läst som månad: Basic 66,91×3: pps=200.73 … HEAD prissätts tak=200.73». Premium × 3: pps 630,87, HEAD prissätts, tak 630,88. Standard × 3: 401,46, HEAD GRANSKNING, tak 401,45.
  - `node`: 2,5 × 252,35 = 630,875, avrundat 630,88. 2,5 × 80,29 = 200,725, avrundat 200,73.
- **Varför [VAKT]:** `k3.mjs` kör en periodlös faktura nedströms. Like-for-like och saniteten fångar båda fallen: «LFL mål=8029 pct=67 sanitet={pass:false, reason: saving_67pct_exceeds_max_50pct}». Kunden skyddas alltså när nivån står i texten och raden bär antal, och taket med nivå körs bara när nivån står i texten.
- **Motprov:** Basic rätt läst (66,91) i `k3.mjs` ger pct 0 och sanitet pass (`skip_verified`). Årssumman Basic × 12 går till granskning i `k1.mjs`. Instrumentet skiljer alltså fångat från släppt.
- **Förslag:** stryk «kvartalssumma» ur modulhuvud och commit-text, eller sätt faktorn under 3,0 × årsåtagandet med marginal. Lägg då Basic × 3 och Premium × 3 på årsåtagandepriset i LT-03. Ett tak som fångar ett fall på en öres avrundning är ingen grind.

### T-4: nivåargumentet kan göras dött utan att något test faller
- **Fil:** `tests/listpristak.mjs` (LT-04, regexen på rad 137) och `api/test-invoice.mjs` (anropet, rad 1236).
- **Commit:** b99882a6. Infört.
- **Påstående:**
  - LT-04 är en källtextregex: `/nivaNyckel:\s*getDominantSaasTierKey\(extracted\.lineItems/`.
  - Testets egen kommentar säger att den inte ser om grenen körs (rad 134, läst av skrivaren).
  - Commitens sabotage C03 tog bort raden. Ett «&& null» efter anropet låter regexen matcha, medan varje Microsoft-faktura får taket utan nivå.
- **Bevis:** sabotaget O1 ersatte «?? null),» med «?? null) && null,» i `nivaNyckel`-raden. Hela sviten: tests 2708, pass 2708, fail 0, cancelled 0, exit 0.
- **Beteendet:** visat genom konstruktion, inte kört. Uttrycket är alltid null, och `licensprisTak` ger då grenen utan nivå.
- **Motprov:** commitens C03, där raden tas bort, fällde LT-04: 1 fail, 0 cancelled.
- **Förslag:** bryt ut nivåargumentet till en ren funktion (extracted → indata till `validateSeatPrice`) som både `test-invoice` och LT anropar. Pröva den med en Basic-rad: `nivaNyckel` ska bli 'business-basic', och Basic × 3 på månadspris ska gå till granskning.

### T-5: BI-14 släpper prisomdömen i böjd form och tal före «mån»
- **Fil:** `tests/branchindex.mjs` (BI-14: `OMDOME` rad 353, `TAL` rad 358).
- **Commit:** b99882a6. Infört.
- **Påstående:**
  - BI-14 säger att den «fäller prisomdömen». Men `OMDOME` är en ordlista: %, billigare, lägst, konkurrenskraftig, marknadsledare, starkaste. Den missar böjningar och synonymer.
  - Läsaren `TAL` hoppar dessutom över varje tal som följs av «mån».
  - Ett prisomdöme utan källa kan alltså nå rummets bytesbesked för en `real-public`-kategori utan att BI-14 faller.
- **Bevis:**
  - Sabotaget O2 satte Google-alternativet till «… Marknadens billigaste alternativ till M365.». Hela sviten: 2708 av 2708 gröna, fail 0, cancelled 0.
  - Beteendet är kört: texten når `buildSwitchTargets` för varje Microsoft-kund med byte, med reliability 0,96 som topp efter filtret.
  - `k4.mjs` prövar BI-14:s egna regexar mot den riktiga boken och släpper (ok=true): «Marknadens billigaste alternativ till M365.», «Lägsta pris bland svenska leverantörer.», «Halva priset mot M365.» och «Premium 399 mån, Max 549 mån.».
  - «Ofta 30–40 procent lägre» fälls bara för att 30 och 40 råkar saknas bland kategorins tal.
- **Motprov:** commitens C08 («Ofta 30–40 % billigare») och C09 (Telavox 399/549) fällde BI-14, 1 fail var, 0 cancelled. `k4.mjs` med dagens alternativ: alla tal finns i boken, och inga omdömen träffar.
- **Förslag:** vänd kravet. Ett `real-public`-alternativ får bära ett jämförande eller värderande prisord bara om det härleds ur boken, på samma sätt som bredbandsalternativen. Vidga mönstret till stammar (billig, lägst, lägre, dyr, halva, procent), och ta bort undantaget för «mån» när talet saknar en specifikationsenhet. Ett motprov per form.

### T-6: KM-05:s matchningsspärr är en fraslista
- **Fil:** `lib/kundmeningar.js` (`LOFTEN_UTAN_MEKANISM`, rad 242).
- **Commit:** b99882a6. Infört.
- **Påstående:** spärren `/aldrig en nedgradering|bäst matchning|matchat mot er nuvarande nivå/i` är en exakt fraslista. Matchningslöftet kan återinföras i rummet med en böjning eller ett utelämnat ord utan att något test faller.
- **Bevis:** hela sviten, 0 fail och 0 cancelled för båda sabotagen:
  - O3 ersatte Portfolios mening med «Matchat mot er nivå — samma eller bättre. …»: 2708 av 2708 gröna.
  - O6 återinförde taggen som «bästa matchning» på varje alternativ: 2708 av 2708 gröna.
- **Beteendet:** visat genom konstruktion, inte renderat. Texten står i den JSX som renderas under «Vad ni får».
- **Motprov:** commitens C10, «bäst matchning» ordagrant, fällde KM-05: 1 fail.
- **Förslag:** spärra formen och inte frasen, till exempel `/matcha\w*\s+mot\s+er|bäst\w*\s+matchning|samma eller bättre|nedgradering/i`. Lägg O3:s och O6:s strängar som motprov i KM-05.

### T-7: run() i fabrikens form prövas inte
- **Fil:** `lib/verifiers/kortterminal.mjs` (rad 88), `lib/verifiers/tele2-bredband.mjs` (rad 33), `tests/narvarovakter.mjs` (NV-03, NV-10).
- **Commit:** b99882a6. Infört.
- **Påstående:**
  - NV-03 och NV-10 kör den riktiga `run()`, men bara med injicerad läsare.
  - Fabrikens anropsform, `scripts/verify.mjs` rad 58 `v.run()` utan argument, prövas inte. Standardparametern kan bytas mot något som aldrig läser sidan eller frågar API:t, och inget test faller.
  - Luckan från L-5 och L-6 har flyttat ett lager ut.
  - Vakten blir då röd i drift, inte falskt grön. Allvaret är lågt.
- **Bevis:** hela sviten, 0 fail och 0 cancelled för båda sabotagen:
  - O4 bytte «lasSida = lasSidtext» mot «lasSida = async () => ''»: 2708 av 2708 gröna. Beteendet är kört i fabrikens form (`beteende-run.mjs`, `run()` utan argument): 3 checkar med «(saknas)» och utfallet «rott».
  - O5 bytte «hamta = tele2BroadbandFor» mot en hämtare utan produkter: 2708 av 2708 gröna. Beteendet är kört: ankarna «(saknas)» och utfallet «rott».
- **Motprov:** commitens C05 (`run()` utan `kortterminalUtfall`) fällde NV-03, och C06 (produktraden i en död gren) fällde NV-10, 1 fail var. Injektionsvägen har alltså tand.
- **Förslag:** pröva standardvärdet som identitet. Exportera `lasSidtext` och `tele2BroadbandFor`, och kräv att `run()` utan argument anropar dem, till exempel via en modulvid läsare som testet kan byta. Annars ska blindfläcken stå i vaktens `blind`.

## Förexisterande, utanför PR:en

### T-2: taket når inte den väg en riktig Microsoft-faktura tar (KUND)
- **Fil:** `lib/supplier-price-intel.js` (`SUPPLIER_KEY_MAP` och `leverantorsnyckel`, rad 77) och `agents/categorizer/categorize.js` (`deterministicMatch`, snabbvägen i `categorize()` rad 466–472).
- **Commit:** förexisterande, main 25682b28. b99882a6 påstår att L-1 är lagat.
- **Påstående:**
  - Licenstaket prövas bara när `categorized.normalizedSupplier` är exakt «microsoft», «microsoft 365» eller «microsoft corporation».
  - Kategoriserarens snabbväg returnerar leverantörens råa namn. Den fyrar på varje faktura med «microsoft 365» i beskrivningen eller «microsoft» i namnet, och `categorize()` returnerar då direkt utan AI.
  - En periodlös Business Basic-årsfaktura från «Microsoft Ireland Operations Ltd», utan nivå i radtexten, går därför auto med tolv gånger kundens kostnad. Det gäller på HEAD precis som på main.
  - LT-01..07 matar `validateSeatPrice` med «microsoft» direkt. De är gröna på en väg som ingen av korpusens lagrade extraktioner ger.
- **Bevis:**
  - `k6.mjs` kör den riktiga `aggregateLineItems`, `deterministicMatch`, HEAD:s `validateSeatPrice` med nivån som `test-invoice` räknar den, `computeLikeForLikeSaasTarget` och `verifySanity`: «Microsoft Ireland Operations Ltd / «Microsoft 365»: kategori=saas-productivity ns=«Microsoft Ireland Operations Ltd» annualCost=96350.4 pps=802.92 niva=null | main prissätts | HEAD prissätts (ingen prövning: {"ok":true,"anomaly":false}) | LFL mål=96350 pct=0 sanitet={"pass":true,"method":"skip_verified"}». Med beskrivningen «Licenser» blir utfallet detsamma.
  - `k5.mjs`: `deterministicMatch` på de 10 lagrade fakturorna i teach-loop med Microsoft, Adobe eller Google i texten. 9 träffar deterministiskt. `normalizedSupplier` blir till exempel «Microsoft Ireland Operations Ltd», «Adobe Systems Software Ireland Limited» och «Google Ireland Limited». `leverantorsnyckel` ger null för alla 9.
  - test-snapshots: av 33 lagrade extraktioner heter ingen leverantör exakt Microsoft, Adobe eller Google («Microsoft Ireland Operations Limited», «Adobe Systems Nordic AB»).
  - Frekvensen i produktion är inte mätt.
- **Motprov:** samma faktura från leverantören «Microsoft» (`k6.mjs`) går till granskning på main och på HEAD (tak 769,42). `leverantorsnyckel('Microsoft')` ger microsoft och `('Adobe')` ger adobe (`k5.mjs`). Instrumentet ser alltså både en prövning som körs och en som inte körs.
- **Varför det inte blockerar:**
  - Mekanismen ligger utanför diffen. Skrivaren avläste att `SUPPLIER_KEY_MAP` är identisk på main och HEAD, att main slår upp samma exakta namn (main rad 60), och att `git diff origin/main...HEAD` inte rör `agents/categorizer/categorize.js`.
  - Utfallet är detsamma på main och HEAD. Den periodlösa Basic-årsfakturan från «Microsoft Ireland Operations Ltd» prissätts på båda (`k6.mjs`). Grenen gör det alltså inte vanligare.
  - Synligheten är inte avläst mot produktion, så felet räknas som synligt. Läsningen från CTO-mandatet: ett förexisterande fel som en kund ser i dag, men som ligger utanför PR:ens syfte, håller inte PR:en. **Det går däremot före allt annat arbete, i en egen PR.**
  - Detta är skrivarens tillämpning, och den står öppen för nästa blick. Motläsningen: lagningen av L-1 hör nu till PR:ens syfte, och T-2 visar att den lagningen inte når den väg en riktig faktura tar. Domen påverkas inte, eftersom T-1 blockerar ensamt.
  - Ordningen: enligt granskaren gör nyckelfixen T-1 lika nåbar som taket. T-1 lagas alltså först.
- **Förslag:**
  - Nyckla taket på tillverkaren och inte på det exakta namnet. Använd till exempel samma varumärkesnyckel som `extractSupplierKeyword`, eller fråga om «microsoft» ingår i namnet.
  - Pröva L-1 som en kedja från extraktion via `categorize` till `validateSeatPrice`, med Microsofts juridiska namn, i stället för med `normalizedSupplier` 'microsoft' handskrivet.
  - Commit-text och modulhuvud ska inte säga att den periodlösa årsfakturan nu fångas utan villkoret «när leverantören heter exakt Microsoft».

**Loggningen är inte klar.** Avgränsningen 22 okt säger att loggat betyder skrivet på två ställen: i domen och som en egen punkt i arbetsordern. `ops/ARBETSORDER-VAG1.md` vid b99882a6 har ingen punkt för T-2 och inga referenser till T-1..T-8 (avläst av skrivaren). Lägesraden för steg a säger «lagat med L-2–L-7 i samma PR». Den här filen är den enda skrivaren får ändra. Arbetsorderns punkter är byggarens steg.

## Obekräftade fynd

### T-8: «pris i offert» kan vara falskt för Tre och Telenor (KUND, infört av b99882a6)
- **Fil:** `agents/recommender/branchindex.js`: `mobil.alternatives` Tre Företag (rad 163) och Telenor Företag (rad 165), `saas-productivity` Zoho Workplace (rad 429).
- **Commit:** b99882a6. Infört. Granskaren anger att det gör felet vanligare.
- **Påstående:**
  - L-2:s lagning skrev om Tre Företag, Telenor Företag och Zoho Workplace till «pris i offert». Det är ett faktapåstående om leverantörens prissättning.
  - Det visas i rummets bytesbesked: mobil har Telenor bland de tre högsta och Tre som fjärde, och saas har Zoho efter Google.
  - Repots egen nattvakt behandlar Tres och Telenors företagssidor som sidor med publicerat listpris. Påståendet kan alltså vara falskt.
- **Vad som finns:**
  - `lib/prisvaktens-kontroller.js` rad 273–290 läser varje natt «249 kr/mth bas plan» på https://www.tre.se/foretag/abonnemang och «299 kr/mth bas plan» på https://www.telenor.se/foretag/mobiltelefon.
  - Källan är inte läst. WebFetch mot zoho.com/workplace/pricing gav ENOTFOUND, eftersom sandlådan saknar nät. `gh run view --log` för price-monitor-körningen 39760090393 gav Forbidden.
  - Påståendet om Zoho bygger bara på allmän kunskap.
- **Motprov:** inget körbart. Mobilalternativet Tele2 Företag bär boken 269 och 299 (`k4.mjs`), så samma rad kan bära ett verifierat pris när ett sådant finns.
- **Varför det inte räknas mot domen:** det är obekräftat. Bekräftas det, blockerar det: det är infört av grenen och står i rummets bytesbesked.
- **Skrivarens avläsning, inte ett fynd:** Telavox-raden (rad 267) bär också «pris i offert», följt av «inget verifierat listpris i prisboken». Granskaren tar inte upp den, och den är inte prövad.
- **Förslag:** skriv det vi vet, «inget verifierat listpris i prisboken» (som Telavox), inte «pris i offert». Läs annars Tres och Telenors sidor och avgör om de publicerar listpris.

### Delar som inte är avlästa
- **T-1 och T-2:** frekvensen av leverantörsnamnet exakt «Microsoft» i produktion är omätt. Den avgör hur ofta T-1 och T-2 når en kund. Enligt avgränsningen räknas ett fel utan sådan mätning som synligt.
- **T-1:** rummet är inte renderat, och `recommend()`:s AI-steg är inte kört.
- **T-4 och T-6:** beteendet under sabotaget är visat genom konstruktion, inte kört. Testernas tystnad är körd.
- **L-3:** commitens rendering i 390 och 1600 px är inte omkörd.
- **Ingen mätning mot produktion.** Sandlådan saknar nät (WebFetch ENOTFOUND), och Actions-loggarna svarar Forbidden.

## Friat

Varje punkt bär sin mätning:
- **Commitens sabotagetal stämmer.** «Tio riktningar → 11 tester föll» är omkört mot hela sviten (`alla.py commit`, rekonstruerat ur commit-texten). C01 gav 1 (LT-03), C02 1 (LT-03), C03 1 (LT-04), C04 2 (LT-05, LT-07), C05 1 (NV-03), C06 1 (NV-10), C07 1 (BL-08), C08 1 (BI-14), C09 1 (BI-14) och C10 1 (KM-05). Summa 11 fail, 0 cancelled. Fördelningen «LT fem gånger, NV-03, NV-10, BL-08, BI-14 två gånger, KM-05» stämmer.
- **L-1, kärnfallet.** Basic × 12 (802,92 och 963,48) går till granskning med och utan läst nivå (`k1.mjs`, LT-03). I korpusens lagrade extraktioner (teach-loop 72 och test-snapshots 33) byter 0 av 12 prövbara fakturor utfall mellan main, a1d8ef3f och HEAD (`k2.mjs`).
- **L-1, utan läst nivå.** Taket är 769,42 mot mains 765,7, så inget fall blir strängare än main. E5 + Copilot utan nivå går till granskning på main och på HEAD (`k3.mjs`).
- **L-1, Adobe.** Taket 985 är högre än mains 908,7. All Apps 985 prissätts på HEAD men inte på main. All Apps + Acrobat (1 258) går till granskning på både main och HEAD (`k3.mjs`). Det är inte vanligare än på main.
- **L-1, Office 365 E3.** `getSaasLicenseTierKey` läser texten som e3. Det ger taket 1 000,25, alltså ett mildare tak, och inget nytt granskningsfall.
- **L-1, blandade nivåer.** IT-8821-formen (Premium 45, Basic 12 och backup) ger pps 270 mot Premiums tak 630,88. Inget nytt granskningsfall utan tillägg.
- **L-2.** Alla `real-public`-alternativ vid HEAD bär bara tal ur boken och inga omdömesord (`k4.mjs`). Googles 30–40 % och Telavox 399/549 är borta, och inga gamla fraser står kvar i `src`, `api`, `lib` eller `agents` (grep). `mobileNote` i `recommend.js`, som letar «obegränsad» hos Tele2, var död före och efter, så L-2 ändrar inte beteendet där. `domain-intel` läser `alternatives[0]` för mobil (Tele2 Företag), oförändrat.
- **L-3.** Inget matchningslöfte står kvar i någon annan kundyta (grep efter matcha, nedgradering, «samma eller bättre» och «bäst match» i `src`, `api`, `lib`, `agents` och `public`).
- **L-5 och L-6.** `scripts/verify.mjs` anropar `v.run()` utan argument (rad 58). Standardvärdena `lasSidtext` (samma `withPage` och blankstegsnormalisering som förut) och `tele2BroadbandFor` ger samma beteende i drift som före.
- **L-7, BL-08.** Testet har tand mot C07, och dess motprov (699,00 på sidan) prövar något.
- **Sviten och arbetsträdet.** Baslinjen vid b99882a6 gav tests 2708, pass 2708, fail 0, cancelled 0. `git status` var rent efter varje sabotagekörning och vid slutet.

### Sabotagen, samlat

| Utfall | Sabotage |
|---|---|
| fällde | C01 (1), C02 (1), C03 (1), C04 (2), C05 (1), C06 (1), C07 (1), C08 (1), C09 (1), C10 (1): commitens tio, 11 fail och 0 cancelled |
| fällde 0, beteendet ändrat och kört | O2 (T-5), O4 och O5 (T-7, `beteende-run.mjs`) |
| fällde 0, beteendet ändrat genom konstruktion | O1 (T-4), O3 och O6 (T-6) |

Granskaren körde 6 egna sabotage och körde om commitens 10. Skrivaren har inte kört om något av dem.

## Proveniens

- **Granskaren.** En granskare. Arbetet kom till skrivaren som JSON i uppdraget.
  - Worktree med detached HEAD på b99882a6e714e6b86c3f66e17a4538fd9f02d499, bekräftad med `git rev-parse` före och efter. `node_modules` symlänkad. `git status` rent vid slutet. Inget pushat eller committat, inget arbetsflöde startat, inga Vercel-verktyg, och stress-test kördes inte.
  - Katalog: `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-ssot-tredje/`.
  - Mätskript: `spi-main.mjs` och `spi-a1d8.mjs` (versionskopior av taket), `k1.mjs` (tillägg och kvartalssummor i tre versioner), `k2.mjs` (korpusen), `k3.mjs` (kvartalssumma nedströms och fler tilläggsfall), `k4.mjs` (BI-14:s läsare), `k5.mjs` (`deterministicMatch` och `leverantorsnyckel`), `k6.mjs` (L-1 genom kategoriserarens riktiga första steg) och `beteende-run.mjs` (`run()` i fabrikens form).
  - Sabotageharnesset: `sab.py` och `alla.py` (`assert old in s`, exakt en förekomst, återställning ur sparad sträng i `finally` med kontroll).
  - Utfall: `baslinje.txt`, `commitsab.txt`, `egnasab.txt` och `sab-*.txt`. Anteckningarna står i `anteckningar.md`, en rad per mätning (M0–M12).
  - Sviten: `node --test tests/run.mjs` vid baslinjen gav 2708 av 2708 gröna (32 s). Varje sabotage kördes mot hela sviten, och både fail och cancelled räknades.
  - Läst av granskaren:
    - `ops/GRANSKNING-ssot-tele2-lagningen.md` (hela) och K-2 i `ops/GRANSKNING-ssot-tele2.md`.
    - `git show b99882a6` för alla tolv filer.
    - `lib/supplier-price-intel.js` vid HEAD och main.
    - `api/test-invoice.mjs` rad 1180–1275 och 2058–2080, och main:s anrop med `tierKey` null, rad 1232–1236.
    - `agents/test-invoice/extract.js`: seatCount-reglerna och `pricePerSeatMonthly`, rad 245–262, 725–800 och 1030–1085.
    - `agents/recommender/recommend.js`: `getSaasLicenseTierKey` och `getDominantSaasTierKey`, rad 520–600, och alternativkonsumenterna rad 80–100, 268–300 och 1890–1905.
    - `agents/categorizer/categorize.js`: `deterministicMatch` och snabbvägen i `categorize()`, rad 455–476.
    - `tests/listpristak.mjs` (hela), BI-14 i `tests/branchindex.mjs`, NV-03, NV-10 och BL-08.
    - `api/invoice-history.mjs` `buildSwitchTargets` och Portfolio rad 1570–1665.
    - `lib/prisvaktens-kontroller.js` rad 270–340 och `CLAUDE.md` rad 327–353 (avgränsningen).
    - `ops/probe-prisbok.txt` och `ops/probe-m365-priser.txt` (priserna för Copilot, Teams och Defender).
  - Inte kört av granskaren: rendering av rummet, `recommend()`:s AI-steg och någon mätning mot produktion.
  - Katalogen ligger utanför repot och försvinner med sessionen. Det som ska citeras senare behöver gå in i `ops/` via en PR.
- **Skrivaren har inte kört om något sabotage och inte kört sviten.** Fynden och utfallen ovan är granskarens.
- **Skrivarens egna avläsningar, 22 okt:**
  - `git rev-parse HEAD` i `vakter-framat` gav b99882a6e714e6b86c3f66e17a4538fd9f02d499. `git merge-base HEAD origin/main` gav 25682b28837ec47d87e685688d40d9b92d36fc54, som är `origin/main`. `git log origin/main..HEAD` gav 15 commits. `git status --porcelain` var tomt före skrivningen.
  - `gh api repos/Arvo-flow/arvo-flow.github.io/pulls/86`: state open, head b99882a6e714e6b86c3f66e17a4538fd9f02d499, base 25682b28837ec47d87e685688d40d9b92d36fc54.
  - `git show --stat b99882a6`: 12 filer, 245 rader in och 74 ut. Sex mekanikfiler: `agents/recommender/branchindex.js`, `api/test-invoice.mjs`, `lib/kundmeningar.js`, `lib/supplier-price-intel.js`, `lib/verifiers/kortterminal.mjs` och `lib/verifiers/tele2-bredband.mjs`. Övriga: `ops/ARBETSORDER-VAG1.md`, `src/pages/Portfolio/index.js` och fyra testfiler.
  - Commit-texten är läst i sin helhet med `git log -1 --format=%B b99882a6`. Citaten under «Domen» är ordagranna ur den.
  - `git diff origin/main...HEAD`: 36 filer, varav 13 mekanikfiler. `agents/categorizer/categorize.js` är oförändrad. `SUPPLIER_KEY_MAP` är identisk på main och HEAD (`diff` av blocket), och main slår upp `SUPPLIER_KEY_MAP[(normalizedSupplier ?? '').toLowerCase().trim()]` på rad 60.
  - `git show b99882a6` för `agents/recommender/branchindex.js`, `lib/kundmeningar.js` och `src/pages/Portfolio/index.js`: Tre, Telenor, Telavox och Zoho skrevs om till «pris i offert», Google-raden fick «inget verifierat SEK-pris att jämföra med», KM-05-mönstret lades till, och Portfolio fick «Alternativen är inte matchade mot er nivå».
  - Läsningar i koden vid b99882a6: `lib/supplier-price-intel.js` rad 1–33 (huvudet, `KVOT` och `NIVAFAKTOR`), 64–125 (`SUPPLIER_KEY_MAP`, `leverantorsnyckel`, `licensprisTak`, `validateSeatPrice`); `api/test-invoice.mjs` rad 1232–1236; `tests/listpristak.mjs` rad 60 och 127–138; `tests/branchindex.mjs` rad 353 och 358; `lib/kundmeningar.js` rad 242; `src/pages/Portfolio/index.js` rad 1636; `scripts/verify.mjs` rad 58; `lib/verifiers/kortterminal.mjs` rad 88; `lib/verifiers/tele2-bredband.mjs` rad 33; `agents/recommender/branchindex.js` rad 163, 165, 267 och 429; `CLAUDE.md` rad 327–353.
  - `ops/ARBETSORDER-VAG1.md` vid b99882a6: lägesraden för steg a och avsnittet «Förexisterande fynd» rad 16–32. Ingen referens till T-1..T-8.
- **Grinden på den här filen.** `lasGranskning` och `andraBlicken` ur `lib/granskningsgrind.js` vid b99882a6, körda med `node` från stdin, utan någon ny fil. Indata: bas 25682b28, grenens 15 commits, 36 ändrade filer (13 mekanikfiler) och de 18 `ops/GRANSKNING-*.md` som fanns före skrivningen. Huvudet prövades före skrivningen, eftersom filen inte rörs efteråt. `lasGranskning` läser huvudet som `{"commits":["b99882a6"],"dom":"BLOCKERAR"}`.

  | Prov | Granskningar | Utfall |
  |---|---|---|
  | A: med den här filens huvud | 18 + denna | ok=false: «senaste domen är BLOCKERAR — bara «dom: MERGAS» släpper mekanik till main» |
  | B: motprov, samma huvud med `dom: MERGAS` | 18 + denna | ok=true: «13 mekanikfil(er) täckta av ops/GRANSKNING-ssot-tele2-tredje.md (commit b99882a)» |
  | C: motprov utan den här filen | 18 | ok=false: «ops/GRANSKNING-ssot-tele2-lagningen.md: senaste domen är BLOCKERAR» |

  Grinden kan alltså svara båda hållen på samma huvud, och den här filen är den som gäller för PR:en.
- **Hårda mellanslag** räknas med en byte-räkning efter skrivningen (bibelns regel 7). Utfallet står i överlämningen, inte här, eftersom filen inte rörs efteråt.
