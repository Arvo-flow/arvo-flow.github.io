commits: 9ceb6b2c
dom: BLOCKERAR

# Fjärde blicken på PR #86: lagningen 9ceb6b2c

PR #86 står öppen med head 9ceb6b2c. Det är samma commit som den lokala grenen `vakter-framat` står på. Basen är 25682b28, toppen på `origin/main`. Grenen har 17 commits. Granskningen gäller lagningen 9ceb6b2c, som svarar på BLOCKERAR i `ops/GRANSKNING-ssot-tele2-tredje.md` (T-1). Commiten före, cfac8c0d, är den granskningsfilen. 9ceb6b2c är toppen, så huvudet namnger bara den.

En granskare arbetade i en worktree med detached HEAD på 9ceb6b2c. Baslinjen `node --test tests/run.mjs` gav tests 2710, pass 2710, fail 0, cancelled 0. Granskaren rapporterar rent `git status` efter varje sabotage och vid slutet, och att den inte pushade, committade, startade något arbetsflöde, använde Vercel-verktyg eller körde stress-test.

Filen är skriven av en agent som varken byggt eller granskat. Den återger granskarens fynd och utfall och har inte kört om något sabotage eller sviten. Det skrivaren själv läste står under «Proveniens».

## Domen

**BLOCKERAR.** F4-1 är ett bekräftat [KUND]-fynd som 9ceb6b2c inför, och det gör ett fel vanligare än på main. Det räcker ensamt.
- 6 fynd. Alla 6 är bekräftade med bevis och motprov.
- Bekräftade [KUND]: 2.
  - F4-1 är infört av 9ceb6b2c och gör felet vanligare. Fönstret öppnades av a1d8ef3f, stängdes av b99882a6 och öppnas igen här.
  - F4-2 är förexisterande och ligger utanför PR:en. Det blockerar inte (se F4-2).
- Bekräftade [VAKT]: 4, F4-3 till F4-6. Alla är införda av 9ceb6b2c. [VAKT] blockerar inte enligt stoppregeln (9 sep). De mergas och lagas framåt.
- Regeln som tillämpas är avgränsningen 22 okt (`CLAUDE.md` rad 327–353 vid 9ceb6b2c), med den läsning som avgjordes under CTO-mandatet.

**T-1 är lagat på den väg testerna prövar, och lagningen öppnar L-1:s felform igen i ett syskonfall.**
- Inget tak ligger under mains 765,7 kr. HEAD skickar aldrig till granskning något som main prissatte (`k1-svep.mjs`, 1,00–1 300,00 kr i steg om 0,01). LT-03:s tilläggsfall prissätts.
- Men med läst nivå Standard, Premium, E3 eller E5 är taket 1 000,25 kr, 30,6 % över mains. En periodlös årsfaktura med EES-planer (exkl. Teams) får ett pps i fönstret 765,71–1 000,25. Main och b99882a6 fångade den. HEAD prissätter den, med tolv gånger kundens kostnad (F4-1).
- Business Basic EES (exkl. Teams) läses som `business-basic`. Dess årssumma läst som månad (619,32 eller 743,16) ligger under varje tak. Main prissätter den också. b99882a6 fångade den, och 9ceb6b2c släpper den igen (F4-2).

**Lagningens påståenden som inte håller.** De ska stå här utan att mjukas upp:
- Commit-texten och modulhuvudet (`lib/supplier-price-intel.js` rad 27) säger att inget tak ligger under mains. Det stämmer. Ingen av dem säger att taket med läst nivå utom Basic ligger 30,6 % över mains, och BLIND (rad 29–31) nämner inte fönstret (F4-1).
- Modulhuvudet rad 28: «FÅNGAR: en årssumma läst som månad för Basic (med och utan nivå)». För Business Basic EES (exkl. Teams), som läses som Basic, gäller det inte (F4-2).
- Commit-texten: «T-5: BI-14 läser stammar». BI-14 är fortfarande en ordlista. «Marknadens mest prisvärda alternativ till M365.» passerar, och en annan leverantörs pris i samma kategori passerar (F4-3).
- Commit-texten: «T-6: KM-05 spärrar formen av matchningslöftet, inte frasen.» «Alternativen matchar er nivå — ingen nedgradering.» passerar (F4-4).
- Commit-texten: «NV-03 och NV-10 kräver att det i drift är webbläsaren respektive Tele2:s API». NV-03 jämför två fält i samma exporterade objekt. NV-10 håller (F4-5).
- `ops/ARBETSORDER-VAG1.md` rad 30–32 säger att «T-3, T-5, T-6, T-7 och T-8 är lagade i samma PR». För T-5, T-6 och NV-03-delen av T-7 håller det inte (F4-3, F4-4, F4-5).

**Det som stämmer i commit-texten:** «åtta riktningar … → 14 tester föll (LT åtta gånger, BI-14 två gånger, KM-05, NV-03 två gånger, NV-10)». Granskaren körde om alla åtta mot hela sviten, rekonstruerade ur commit-texten: 14 fail, 0 cancelled.

**Vad som släpper grinden.** Med den här filen ger grinden ok=false, «senaste domen är BLOCKERAR» (prov A under «Proveniens»). En lagning av F4-1 ändrar `lib/supplier-price-intel.js`, alltså en mekanikfil efter 9ceb6b2c. Den behöver en ny granskning som namnger den commiten (`lib/granskningsgrind.js` rad 16–21). Ur granskarens fynd följer tre saker:
- F4-1 lagas före T-2. Arbetsordern (rad 33–39) lägger T-2 som nästa PR, före allt annat arbete, och säger att LT-08:s golv är skälet att T-1 lagades först. Golvet räcker inte: taket kan också ligga för högt. En lagning av T-2 gör F4-1 lika nåbart som taket.
- F4-2 är inte loggat i arbetsordern (se F4-2).
- Modulhuvudets FÅNGAR och BLIND ska säga det granskaren mätt: Basic EES fångas inte, och fönstret 765,71–1 000,25 står öppet tills det är stängt.

## Bekräftade [KUND]-fynd

### F4-1: taket med läst nivå ligger 30,6 % över mains, och en periodlös årsfaktura med EES-planer går auto med tolv gånger kundens kostnad
- **Fil:** `lib/supplier-price-intel.js`, `licensprisTak` rad 99: min(`KVOT` × högsta, `ARSSUMMA_UNDER` × nivåpris). `KVOT` står på rad 37 och `ARSSUMMA_UNDER` på rad 39.
- **Commit:** 9ceb6b2c. Infört av lagningen. Gör felet vanligare: main och b99882a6 skickade samma fakturor till granskning. Fönstret öppnades av a1d8ef3f och stängdes av b99882a6.
- **Påstående:**
  - Med läst nivå Standard, Premium, E3 eller E5 är taket 1 000,25 kr. Det ligger 30,6 % över mains 765,7.
  - En periodlös årsfaktura med EES-planer (exkl. Teams), där Standard EES eller Premium EES dominerar på belopp och Basic EES står bredvid, får ett pps i fönstret 765,71–1 000,25.
  - Main och b99882a6 fångade den. HEAD prissätter den.
  - Nedströms fångar inget. Like-for-like diskvalificerar «exkl. Teams» (`lib/licensniva.js` rad 66) och släpper igenom `annualCost` med pct 0. Saniteten svarar pass med `skip_verified`.
  - Analysen går därmed auto med tolv gånger kundens kostnad. Det är L-1:s felform i ett syskonfall som lagningen öppnade igen.
- **Bevis:** `k2-kedja.mjs` kör `aggregateLineItems` → `routeExtraction` → `deterministicMatch` → `getDominantSaasTierKey` → fyra versioner av taket → `computeLikeForLikeSaasTarget` → `verifySanity`. Leverantören är «Microsoft», fakturan är periodlös och priserna kommer ur `ops/probe-m365-priser.txt`.

  | Faktura | pps | annualCost | nivå | main | a1d8ef3f | b99882a6 | HEAD | LFL och sanitet |
  |---|---|---|---|---|---|---|---|---|
  | Standard EES 6 + Basic EES 10, årsåtagande × 12 | 851,16 | 163 422,72 | business-standard | GRANSKNING | prissätts | GRANSKNING | prissätts, tak 1 000,25 | mål 163 422, pct 0, sanitet pass (`skip_verified`) |
  | Premium EES 3 + Basic EES 10, årsåtagande × 12 | 973,75 | 151 905,60 | business-premium | GRANSKNING | ej redovisat | ej redovisat | prissätts | pct 0, sanitet pass |

  - Första raden gav `route=auto`.
  - `k1-svep.mjs` (1,00–1 300,00 kr i steg om 0,01) avgränsar fönstret: med nivå Standard, Premium, E3 eller E5 fångar main men HEAD prissätter 765,71–1 000,25.
  - `k4-periodsummor.mjs`: bland rena nivåsummor ger bara Standard × 6 med nivå samma byte, och det fångar saniteten (83 % och 86 %, `k2`).
- **Motprov:** samma instrument svarar åt båda hållen.
  - Samma EES-mix rätt läst (103,13 och 51,61): pps 70,93, `annualCost` 13 618,56. Prissätts i alla fyra versionerna.
  - Standard EES 6 + Basic EES 10 på månadspris × 12 (pps 1 021,40) går till granskning i alla fyra. Fönstret har alltså en övre kant.
  - Basic × 12 (802,92) går till granskning på HEAD.
  - Standard 6 + Basic 10 × 12 (pps 1 104,02) går till granskning i alla fyra.
- **Vad som inte är kört:** rummet är inte renderat, och `recommend()`:s AI-steg är inte kört. Frekvensen i produktion är inte mätt. Avgränsningen kräver ingen frekvens för «vanligare», bara en mekanism i diffen. Mekanismen är `KVOT × högsta` som tak för varje nivå utom Basic. Avgränsningen säger också att ett fel utan en körning som visar motsatsen räknas som synligt. Domen vilar inte på synligheten.
- **Räckvidd:** begränsas av T-2. Taket körs bara när leverantören heter exakt «Microsoft». En lagning av T-2 gör fyndet lika nåbart som taket.
- **Förslag:**
  - Ta taket med nivå ur den billigaste lästa nivån bland nivåraderna, inte ur den dominerande. I EES-mixen ger det Basics 778,83, och både 851,16 och 973,75 fångas. LT-08:s golv håller fortfarande, eftersom varje nivå ger minst 778,83.
  - Lägg som LT-syskonfall: Standard EES 6 + Basic EES 10 × 12 och Premium EES 3 + Basic EES 10 × 12 med kravet «granskning», och de korrekt lästa EES-mixarna med kravet «prissätts».
  - Skriv in fönstret i BLIND tills det är stängt.

## Bekräftade [VAKT]-fynd: lagas framåt enligt stoppregeln

Granskaren skrev sina sabotage med `sab.py`: `assert old in s` med exakt en förekomst, och återställning ur sparad sträng i `finally` med kontroll. Varje sabotage kördes mot hela sviten, och `fail` och `cancelled` räknades. Alla fyra fynden är införda av 9ceb6b2c. Inget förexisterande [VAKT] redovisas.

### F4-3: BI-14 är fortfarande en ordlista, och ett tal prövas mot kategorin i stället för mot leverantören
- **Fil:** `tests/branchindex.mjs`, BI-14: `OMDOME` och `bokensTal`. Granskaren anger rad 353 och 341–349. Skrivaren avläser rad 354 och 342–350 vid 9ceb6b2c.
- **Commit:** 9ceb6b2c, lagningen av T-5. Bokläsaren kommer från b99882a6.
- **Påstående:**
  - Ett prisomdöme utanför stammarna passerar.
  - Prövningen «talet står i kategorins bok» kräver inte att talet tillhör den namngivna leverantören. En annan leverantörs pris kan alltså tillskrivas ett alternativ.
  - Arbetsordern säger att T-5 är lagat.
- **Bevis:** hela sviten, 0 fail och 0 cancelled för båda sabotagen:
  - S1 satte Googles alternativ till «Marknadens mest prisvärda alternativ till M365.»: tests 2710, fail 0, cancelled 0.
  - S7 satte Telavox till «Bundlar mobil och växel — från 89 kr/anv/mån exkl moms»: fail 0, cancelled 0. 89 är Telia Smart Connects T1-pris i molnväxelns bok (bokens tal innehåller 89 och 118).
  - Texten når rummets bytesbesked via `buildSwitchTargets` (`api/invoice-history.mjs` rad 576–597). Där visas Google för en Microsoft-kund och Telavox för en Telia-kund. Vägen är avläst i koden. Rummet är inte renderat.
- **Motprov:** commitens C3 («Marknadens billigaste») och C4 («Premium 399 mån, Max 549 mån»), rekonstruerade, fällde BI-14 med 1 fail var.
- **Förslag:** vänd kravet. Ett `real-public`-alternativ får bära ett tal bara om det står i leverantörens egen bokpost, inte var som helst i kategorin. Ett värderande prisord får stå bara om det härleds ur boken. Lägg S1:s och S7:s strängar som motprov.

### F4-4: KM-05 spärrar fortfarande en fraslista, och matchningslöftet passerar utan «mot»
- **Fil:** `lib/kundmeningar.js`, `LOFTEN_UTAN_MEKANISM` rad 244.
- **Commit:** 9ceb6b2c, lagningen av T-6.
- **Påstående:** commit-texten säger «KM-05 spärrar formen av matchningslöftet, inte frasen». Mönstret kräver fortfarande «matcha… mot er», «bäst… matchning», «samma eller bättre», «aldrig en nedgradering» eller «utan nedgradering». Löftet utan «mot» och med «ingen nedgradering» passerar.
- **Bevis:** S2 ersatte rummets mening (`src/pages/Portfolio/index.js` rad 1636) med «Alternativen matchar er nivå — ingen nedgradering.». Hela sviten: tests 2710, fail 0, cancelled 0.
- **Beteendet:** visat genom konstruktion, inte renderat. Texten står i den JSX som renderas under «Vad ni får».
- **Motprov:** commitens C5 («Matchat mot er nivå.»), rekonstruerad, fällde KM-05 med 1 fail.
- **Förslag:** lägg till «ingen nedgradering», «matchar er» och «samma nivå eller bättre», eller spärra stammen «nedgrad» med rummets nekande som motprov. Lägg S2:s sträng i KM-05:s motprovstest.

### F4-5: NV-03 jämför två fält i samma objekt, så kortterminalens läsare i drift kan bytas utan att något test faller
- **Fil:** `lib/verifiers/kortterminal.mjs` (`kortterminalKalla` rad 102, `lasSidtext` rad 97–99) och `tests/narvarovakter.mjs` (NV-03 rad 130).
- **Commit:** 9ceb6b2c, lagningen av T-7.
- **Påstående:**
  - Commit-texten säger «NV-03 och NV-10 kräver att det i drift är webbläsaren respektive Tele2:s API».
  - NV-03 jämför `kortterminalKalla.lasSida` med `kortterminalKalla.lasSidtext`, alltså två fält i samma exporterade objekt. Båda kan bytas mot en tom läsare utan att testet faller.
  - Kroppen i `lasSidtext` prövas inte heller.
  - Vakten blir då röd i drift, inte falskt grön.
  - NV-10 jämför däremot mot den importerade `tele2BroadbandFor` och håller.
- **Bevis:** hela sviten, 0 fail och 0 cancelled för båda sabotagen:
  - S3 satte `kortterminalKalla = { lasSida: tomLasare, lasSidtext: tomLasare }`.
  - S4 lät `lasSidtext` returnera ''.
  - Beteendet under S3 är kört i fabrikens form (`beteende-kort.mjs`, `run()` utan argument): «NV-03:s identitet håller: true», 3 checkar med «(saknas)», och fabrikens dom är {utfall: rott, olasbara: 3}.
- **Motprov:** utan sabotage är `lasSida` funktionen `lasSidtext` (`withPage`), och `run()` når webbläsarvägen. I sandlådan kastar den «Cannot find package 'playwright'». Commitens C6 och C8 fällde NV-03, och C7 fällde NV-10, 1 fail var.
- **Förslag:** exportera `lasSidtext` från modulen och låt NV-03 jämföra `kortterminalKalla.lasSida` mot den importerade funktionen, som NV-10 gör med `tele2BroadbandFor`. Alternativet är att skriva in i vaktens `blind` att läsarens kropp inte prövas.

### F4-6: taket med läst nivå är låst bara för Basic och E5
- **Fil:** `tests/listpristak.mjs`, LT-03 (rad 53–72) och LT-08 (rad 105–113).
- **Commit:** 9ceb6b2c, lagningen av T-1.
- **Påstående:**
  - Commit-texten nämner bara att Basic × 12 fångas med och utan nivå.
  - Bland nivåerna med läst nivå låser LT bara Basic × 12 och E5 (1 000,25 och 1 000,26, E5 × 12).
  - Taket för Standard, Premium och E3 med läst nivå kan höjas utan att något test faller.
  - LT-08 prövar bara att taket inte ligger under mains, aldrig att det ligger under en felavläsning.
- **Bevis:** S6 tog bort locket 1,30 × högsta för `business-standard`, så taket blev 1 557,66. Hela sviten: tests 2710, fail 0, cancelled 0. Beteendet är kört (`beteende-tak.mjs`): Standard EES × 12 (1 237,56) med nivå `business-standard` går från GRANSKNING till prissätts.
- **Motprov:** utan sabotage ger samma skript «business-standard 1237.56 GRANSKNING tak 1000.25». S5 (nivåpriset med `Math.max`) fällde LT-03 med 1 fail.
- **Förslag:** lägg en årssumma läst som månad per nivå med läst nivå i LT-03, med kravet «granskning», och F4-1:s EES-mixar.

## Förexisterande, utanför PR:en

### F4-2: Business Basic EES (exkl. Teams) läst som årssumma prissätts med tolv gånger kundens kostnad, och modulhuvudet säger att den fångas (KUND)
- **Fil:** `agents/recommender/recommend.js`, `getSaasLicenseTierKey` rad 526. `lib/supplier-price-intel.js`, modulhuvudet rad 28: «FÅNGAR: en årssumma läst som månad för Basic (med och utan nivå)».
- **Commit:** beteendet finns på main 25682b28. Påståendet FÅNGAR står i 9ceb6b2c, och lagningen tog bort b99882a6:s fångst.
- **Påstående:**
  - `getSaasLicenseTierKey` läser «Microsoft 365 Business Basic EES (exkl. Teams)» som `business-basic`.
  - Planens årssumma läst som månad är 619,32 (årsåtagande) eller 743,16 (månadspris). Den ligger under Basic-taket 778,83 och under taket utan nivå 769,42.
  - Den prissätts alltså med och utan nivå. Nedströms fångar inget: LFL pct 0, sanitet pass.
  - Analysen går auto med tolv gånger kundens kostnad. Main gör likadant.
  - b99882a6 fångade den (tak 200,73), och 9ceb6b2c släpper den igen.
  - Modulhuvudet säger utan förbehåll att en Basic-årssumma fångas.
- **Bevis:**
  - `k2-kedja.mjs`: «Basic EES årsåtag. ×12, 10 st: pps=619.32 annualCost=74318.4 niva=business-basic route=auto | main prissätts | a1d8 prissätts | b998 GRANSKNING | HEAD prissätts tak=778.83 | LFL mål=74318 pct=0 sanitet={pass:true, method:skip_verified}». Med månadspris blir pps 743,16 och utfallet detsamma.
  - `k4-periodsummor.mjs`: «Basic EES (exkl. Teams) årsåtag. ×12 pps=619.32 main p | med nivå: b998 G HEAD p | utan nivå: b998 p HEAD p».
  - Priserna står i `ops/probe-m365-priser.txt`, rad 10, 25 och 26.
- **Motprov:** Basic med Teams × 12 (802,92 och 963,48) går till granskning på HEAD, med och utan nivå (`k2` och `k4`).
- **Varför det inte blockerar:**
  - Granskaren klassar fyndet som förexisterande och inte vanligare: main prissätter samma faktura (`k2`, `k4`). PR:en jämförs med main, och där är utfallet detsamma.
  - Nivåläsningen sitter i `agents/recommender/recommend.js`, som inte är bland grenens 13 ändrade mekanikfiler (avläst av skrivaren).
  - Ett tak under 765,7 bryter LT-08:s golv, så taket kan inte fånga 619,32. Lagningen hör hemma nedströms.
  - Synligheten är inte avläst mot produktion, så felet räknas som synligt. Läsningen från CTO-mandatet: ett förexisterande fel som en kund ser i dag, men som ligger utanför PR:ens syfte, håller inte PR:en. **Det går däremot före allt annat arbete, i en egen PR.**
  - Detta är skrivarens tillämpning, och den står öppen för nästa blick. Motläsningen: L-1:s lagning hör till PR:ens syfte, b99882a6 fångade fallet, och 9ceb6b2c släpper det igen. Mätt mot grenens förra granskade läge är det alltså vanligare, och modulhuvudet som PR:en skriver säger FÅNGAR. Domen påverkas inte, eftersom F4-1 blockerar ensamt.
- **Förslag:**
  - Stryk eller villkora FÅNGAR («för bokens Basic, inte Basic EES exkl. Teams»).
  - Låt boken bära EES-priserna och LFL pröva EES-raderna mot dem.
  - Logga fyndet i arbetsordern som L-1:s förexisterande syskonfall.

**Loggningen är inte klar.** Avgränsningen 22 okt säger att loggat betyder skrivet på två ställen: i domen och som en egen punkt i arbetsordern. `ops/ARBETSORDER-VAG1.md` vid 9ceb6b2c har punkter för V-1, L-lagningarna, T-lagningarna, T-2, T-4, rummets bredbandsrad, K-5, K-6, K-7, V-3, V-4, V-5 och historiken. Den har ingen punkt för F4-2 (avläst av skrivaren). Den här filen är den enda skrivaren får ändra. Arbetsorderns punkter är byggarens steg.

## Obekräftade fynd

Inget av granskarens sex fynd är obekräftat. Följande delar är inte avlästa:
- **F4-1 och F4-2:** rummet är inte renderat, och `recommend()`:s AI-steg är inte kört. Hur ofta en periodlös årsfaktura med EES-planer förekommer i produktion är inte mätt.
- **F4-1:** räckvidden begränsas av T-2. Hur ofta leverantörsnamnet är exakt «Microsoft» i produktion är omätt.
- **F4-3:** vägen till rummets bytesbesked är avläst i koden. Rummet är inte renderat.
- **F4-4:** beteendet under S2 är visat genom konstruktion, inte kört. Testernas tystnad är körd.
- **F4-5:** beteendet är kört för S3. För S4 redovisar granskaren bara testernas tystnad.
- **T-8:** «inget verifierat listpris i prisboken» är prövat mot boken, inte mot Tres, Telenors eller Zohos sidor (se «Friat»).
- **Ingen mätning mot produktion** och ingen mot leverantörernas sidor.

## Friat

Varje punkt bär sin mätning:
- **T-1, kärnan håller.** Mätt med `k1-svep.mjs` från 1,00 till 1 300,00 kr i steg om 0,01, för varje Microsoft-nivå, utan nivå, för Adobe och för Google, mot main-kopian, a1d8ef3f, b99882a6 och HEAD.
  - HEAD skickar aldrig till granskning något som main prissatte. LT-08:s påstående «inget tak under mains» stämmer.
  - LT-03:s tilläggsfall (Copilot, Copilot för företag, Teams-telefon + Defender) prissätts. Priserna står i `ops/probe-m365-priser.txt`.
- **Korpusen.** `k3-korpus.mjs` körde teach-loop och test-snapshots med leverantören satt till tillverkaren: 12 prövbara fakturor, 0 byter utfall mellan main, b99882a6 och HEAD.
- **Commitens sabotagetal stämmer.** «Åtta riktningar → 14 tester föll» är omkört mot hela sviten, rekonstruerat ur commit-texten. 0 cancelled.
  - C1, nivåfaktorn 2,5: 2 (LT-03, LT-08).
  - C2, utan nivå × 0,99: 6 (LT-01, 02, 03, 05, 07, 08).
  - C3 och C4: 1 var (BI-14).
  - C5: 1 (KM-05).
  - C6 och C8: 1 var (NV-03).
  - C7: 1 (NV-10).
  - Fördelningen «LT åtta, BI-14 två, KM-05, NV-03 två, NV-10» stämmer.
- **T-8.** BRANCHINDEX bär inget pris för Tre, Telenor eller Zoho Workplace (grep; Zoho CRM står i `saas-crm`). «Inget verifierat listpris i prisboken» är därmed sant mot boken. Det är inte mätt mot leverantörernas sidor. Ordet «prisboken» är internt språk i en kundyta.
- **T-7 i drift.**
  - `scripts/verify.mjs` kör `v.run()` sekventiellt (rad 47–58).
  - Ingen kod utanför `tests/narvarovakter.mjs` skriver till `kortterminalKalla` eller `tele2BredbandKalla`.
  - Båda bytena återställs i `finally` (rad 132 och 295), och ingen testfil sätter concurrency (grep).
  - NV-10:s identitet mot den importerade `tele2BroadbandFor` är oberoende och fäller C7.
- **T-2 görs inte värre av lagningen.** `SUPPLIER_KEY_MAP` är orörd i 9ceb6b2c. Men när T-2 lagas blir F4-1 lika nåbart som taket.
- **T-3:s BLIND.** «Kvartalssumma (som på main)» gäller bara Basic, Standard och Premium. E3 och E5 × 3 fångas av både main och HEAD (`k4`). Felet ligger åt det säkra hållet.
- **Lagningens egna syskonfall.** Standard × 6, och Standard + Basic EES med Standard-raden LFL-prissatt, prissätts av taket men fångas av saniteten nedströms (52–86 %, `k2`). De är inte kundsynliga.
- **KM-05:s vidgade mönster** fäller ingen befintlig rad i kodskanningen (sviten är grön). Lagrad produktionstext är inte prövad.
- **Baslinjen** vid 9ceb6b2c: tests 2710, pass 2710, fail 0, cancelled 0. `git status` var rent efter varje sabotage och vid slutet.

### Sabotagen, samlat

| Utfall | Sabotage |
|---|---|
| fällde | C1 (2), C2 (6), C3 (1), C4 (1), C5 (1), C6 (1), C7 (1), C8 (1): commitens åtta, 14 fail och 0 cancelled |
| fällde | S5 (1, LT-03): nivåpriset med `Math.max` |
| fällde 0, beteendet ändrat och kört | S3 (F4-5, `beteende-kort.mjs`), S6 (F4-6, `beteende-tak.mjs`) |
| fällde 0, vägen avläst i kod | S1 och S7 (F4-3) |
| fällde 0, beteendet ändrat genom konstruktion | S2 (F4-4) |
| fällde 0, beteendet inte redovisat separat | S4 (F4-5) |

Granskaren körde 7 egna sabotage och körde om commitens 8. Skrivaren har inte kört om något av dem.

## Proveniens

- **Granskaren.** En granskare. Arbetet kom till skrivaren som JSON i uppdraget.
  - Worktree med detached HEAD på 9ceb6b2c3d07149a51ea6e4f58bf5b1272a3a2a0, bekräftad med `git rev-parse` före och efter. `node_modules` symlänkad.
  - Katalog: `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-ssot-fjarde/`. Anteckningar i `anteckningar.md`, en rad per mätning (M0–M20).
  - Läst av granskaren:
    - `ops/GRANSKNING-ssot-tele2-tredje.md` i sin helhet.
    - `git show 9ceb6b2c` för alla tio filerna, och commit-texten.
    - `lib/supplier-price-intel.js` vid HEAD, main 25682b28, a1d8ef3f och b99882a6.
    - `api/test-invoice.mjs` rad 1215–1260, och main:s anrop med `tierKey` null.
    - `agents/recommender/recommend.js`: `getSaasLicenseTierKey` och `getDominantSaasTierKey` (rad 519–597).
    - `agents/test-invoice/extract.js`: seatCount-reglerna, `pricePerSeatMonthly`, faktureringsperioden och `computeBillingPeriodFromDates`.
    - `lib/licensniva.js` `DISKVALIFICERAR` och `ops/probe-m365-priser.txt`.
    - `tests/listpristak.mjs` i sin helhet, BI-14, KM-05, NV-03 och NV-10.
    - `buildSwitchTargets`, `scripts/verify.mjs` rad 40–75 och konsumenterna av `granskaLagradText`.
    - Arbetsorderns diff.
  - Kört av granskaren:
    - Baslinjen: `node --test tests/run.mjs` gav 2710 av 2710 gröna.
    - Mätskript: `k1-svep.mjs` (prissvep i fyra versioner), `k2-kedja.mjs` (periodlösa summor genom extraktion, kategorisering, nivå, tak, LFL och sanitet), `k3-korpus.mjs`, `k4-periodsummor.mjs`, `beteende-kort.mjs` och `beteende-tak.mjs`.
    - 15 sabotage via `sab.py`: `assert` att den gamla strängen förekommer exakt en gång, återställning ur sparad sträng i `finally` med kontroll, hela sviten, fail och cancelled räknade. C1–C8 är commitens åtta, rekonstruerade: 14 fail. Egna: S1, S2, S3, S4, S6 och S7 fällde 0. S5 fällde 1.
  - **Instrumentfel, redovisat av granskaren:** första sabotagekörningen gick på fel mål, eftersom `svit.py` läste `sys.argv[2]` som testfil vid import. Den gav exit 1 utan att några tester kördes, och upptäcktes på «fail None». Harnesset lagades och allt kördes om.
  - Inte kört av granskaren: rendering av rummet, `recommend()`:s AI-steg och någon mätning mot produktion eller mot leverantörernas sidor.
  - Inget pushades eller committades, inget arbetsflöde startades, inga Vercel-verktyg användes och stress-test kördes inte.
  - Katalogen ligger utanför repot och försvinner med sessionen. Det som ska citeras senare behöver gå in i `ops/` via en PR.
- **Skrivaren har inte kört om något sabotage och inte kört sviten.** Fynden och utfallen ovan är granskarens.
- **Skrivarens egna avläsningar, 22 okt:**
  - `git rev-parse HEAD` i `vakter-framat` gav 9ceb6b2c3d07149a51ea6e4f58bf5b1272a3a2a0. `git merge-base HEAD origin/main` gav 25682b28837ec47d87e685688d40d9b92d36fc54, som är `origin/main`. `git log origin/main..HEAD` gav 17 commits. `git status --porcelain` var tomt före skrivningen.
  - `gh api repos/Arvo-flow/arvo-flow.github.io/pulls/86`: state open, head 9ceb6b2c3d07149a51ea6e4f58bf5b1272a3a2a0, base 25682b28837ec47d87e685688d40d9b92d36fc54.
  - `git show --stat 9ceb6b2c`: 10 filer, 104 rader in och 40 ut. Fem mekanikfiler: `agents/recommender/branchindex.js`, `lib/kundmeningar.js`, `lib/supplier-price-intel.js`, `lib/verifiers/kortterminal.mjs` och `lib/verifiers/tele2-bredband.mjs`. Övriga: `ops/ARBETSORDER-VAG1.md` och fyra testfiler (`tests/branchindex.mjs`, `tests/kundmeningar.mjs`, `tests/listpristak.mjs`, `tests/narvarovakter.mjs`).
  - Commit-texten är läst i sin helhet med `git show 9ceb6b2c`. Citaten under «Domen» är ordagranna ur den.
  - `git diff origin/main...HEAD`: 38 filer, varav 13 mekanikfiler. `agents/recommender/recommend.js` är inte bland dem.
  - Läsningar i koden vid 9ceb6b2c:
    - `lib/supplier-price-intel.js` rad 1–132: huvudet (rad 22–31), `KVOT` (rad 37), `ARSSUMMA_UNDER` (rad 39), `microsoftNivapris` (rad 43–48), `SUPPLIER_KEY_MAP` (rad 71–81) och `licensprisTak` (rad 92–101).
    - Aritmetiken, körd med `node`: 0,97 × 12 × 66,91 = 778,83. 0,97 × 12 × 133,82 = 1 557,66, så taket för Standard klipps till 1,30 × 769,42 = 1 000,25. 1 000,25 / 765,7 = 1,306. (6 × 103,13 + 10 × 51,61) / 16 × 12 = 851,16. 51,61 × 12 = 619,32. 61,93 × 12 = 743,16.
    - `ops/probe-m365-priser.txt`: 51,61 (Basic EES) på rad 10, 25 och 29; 61,93 på rad 26; 103,13 (Standard EES) på rad 30, 37 och 41; 179,60 (Premium EES) på rad 49 och 53.
    - `lib/licensniva.js` rad 66: `DISKVALIFICERAR` bär `exkl.?\s*teams`. `agents/recommender/recommend.js` rad 526: `lt.includes('business basic')` ger `business-basic`, utan undantag för EES.
    - `tests/listpristak.mjs`: LT-03 rad 49–84, LT-05 rad 86–103, LT-08 rad 105–113 och LT-07 rad 115–129. Med läst nivå prövar LT-03 Basic × 12 (rad 53–56) och E5 (rad 68–69 och 72). Övriga nivåer med läst nivå prövas bara med tillägg som ska prissättas (rad 60–66) och mot golvet i LT-08.
    - `tests/branchindex.mjs`: `bokensTal` rad 342–350, `OMDOME` rad 354 och `TAL` rad 360.
    - `lib/kundmeningar.js` rad 244.
    - `lib/verifiers/kortterminal.mjs` rad 88–94 (`run()`), 97–99 (`lasSidtext`) och 102 (`kortterminalKalla`). `lib/verifiers/tele2-bredband.mjs` rad 68 (`tele2BredbandKalla`).
    - `tests/narvarovakter.mjs` rad 130 (NV-03:s jämförelse), 293 (NV-10 mot importerade `tele2BroadbandFor`), 132 och 295 (`finally`). `scripts/verify.mjs` rad 58 (`v.run()`).
    - `agents/recommender/branchindex.js` rad 266 (Telia Smart Connect «från 89 kr/anv/mån»), 267 (Telavox) och 427 (Google).
    - `src/pages/Portfolio/index.js` rad 1636: «Alternativen är inte matchade mot er nivå.» `api/invoice-history.mjs` rad 576: `buildSwitchTargets`.
    - `ops/ARBETSORDER-VAG1.md`: rad 30–32 (T-lagningarna), 33–39 (T-2) och 40–41 (T-4). Ingen punkt för F4-2.
    - `CLAUDE.md` rad 327–353 (avgränsningen).
- **Grinden på den här filen.** `lasGranskning` och `andraBlicken` ur `lib/granskningsgrind.js` vid 9ceb6b2c, körda med `node` från stdin, utan någon ny fil. Indata: bas 25682b28, grenens 17 commits, 38 ändrade filer (13 mekanikfiler) och de 19 `ops/GRANSKNING-*.md` som fanns före skrivningen. Huvudet prövades före skrivningen, eftersom filen inte rörs efteråt. `lasGranskning` läser huvudet som `{"commits":["9ceb6b2c"],"dom":"BLOCKERAR"}`.

  | Prov | Granskningar | Utfall |
  |---|---|---|
  | A: med den här filens huvud | 19 + denna | ok=false: «senaste domen är BLOCKERAR — bara «dom: MERGAS» släpper mekanik till main» |
  | B: motprov, samma huvud med `dom: MERGAS` | 19 + denna | ok=true: «13 mekanikfil(er) täckta av ops/GRANSKNING-ssot-tele2-fjarde.md (commit 9ceb6b2)» |
  | C: motprov utan den här filen | 19 | ok=false: «ops/GRANSKNING-ssot-tele2-tredje.md: senaste domen är BLOCKERAR» |

  Grinden kan alltså svara båda hållen på samma huvud, och den här filen är den som gäller för PR:en.
- **Hårda mellanslag** räknas med en byte-räkning efter skrivningen (bibelns regel 7). Utfallet står i överlämningen, inte här, eftersom filen inte rörs efteråt.
