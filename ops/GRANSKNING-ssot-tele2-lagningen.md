commits: a1d8ef3f da9e24f0
dom: BLOCKERAR

# Andra blicken på lagningen a1d8ef3f i PR #86

PR #86 står öppen med head da9e24f0. Det är samma commit som den lokala grenen `vakter-framat` står på. Basen är 25682b28, toppen på `origin/main`. Grenen har 13 commits. Granskningen gäller lagningen a1d8ef3f, som svarar på andra blickens BLOCKERAR i `ops/GRANSKNING-ssot-tele2.md`. Toppen da9e24f0 ändrar bara `CLAUDE.md` och `ops/ARBETSORDER-VAG1.md`. Huvudet namnger båda. Grinden läser den senast namngivna commiten, så domen gäller vid da9e24f0.

En granskare arbetade i en worktree på da9e24f0. Baslinjen `node --test tests/run.mjs` gav tests 2704, pass 2704, fail 0, cancelled 0. Granskaren rapporterar rent `git status` vid slutet, och att den inte pushade, committade, startade något arbetsflöde eller använde Vercel-verktyg.

Filen är skriven av en agent som varken byggt eller granskat. Den återger granskarens fynd och utfall och har inte kört om något sabotage eller sviten. Det skrivaren själv läste står under «Proveniens».

## Domen

**BLOCKERAR.** L-1 är ett bekräftat [KUND]-fynd som lagningen inför (a1d8ef3f), och det gör ett fel vanligare än på main. Det räcker ensamt.
- 7 fynd. Alla 7 är bekräftade med bevis och motprov.
- Bekräftade [KUND]: 3.
  - L-1 är infört av a1d8ef3f och gör felet vanligare.
  - L-3 är förexisterande, men sitter i det kort som lagningen skriver om. Det räknas mot domen (se L-3). Domen vilar inte på L-3.
  - L-2 är förexisterande och ligger utanför PR:en. Det blockerar inte.
- Bekräftade [VAKT]: 4. L-4, L-5 och L-6 är införda av grenen. L-7 är förexisterande. [VAKT] blockerar inte enligt stoppregeln (9 sep). De mergas och lagas framåt.
- Regeln som tillämpas är avgränsningen 22 okt (`CLAUDE.md` rad 327–353 vid da9e24f0), med den läsning som da9e24f0 avgjorde under CTO-mandatet.

**K-1, förra blickens [KUND], är lagat.** Bredbandets två Tele2-alternativ härleds ur `tele2Verified`. Inga gamla Max-tal står kvar i kundtext, och BI-13 har tand (se «Friat»).

**Lagningens påståenden som inte håller.** De ska stå här utan att mjukas upp:
- a1d8ef3f listar «en årssumma läst som månad» bland de prövade syskonfallen. LT-03 prövar bara E5 × 12 (9 233 kr). Microsoft 365 Business Basic × 12 (802,92 och 963,48 kr) prissätts (L-1).
- Modulhuvudet i `lib/supplier-price-intel.js` (rad 3–4) säger att ett pris över taket troligen är fel avläst, till exempel «en årssumma som en månad». För Business Basic ligger årssumman under taket (L-1).
- a1d8ef3f säger att taket är 1,30 × leverantörens högsta verifierade listpris och att LT-05 prövar det. För Microsoft klarar ett tak fruset på dagens 769,42 kr alla LT-tester (L-4).
- Kommentaren vid `kortterminalUtfall` (`lib/verifiers/kortterminal.mjs` rad 97–102) säger att `run()` förut kunde sluta anropa slingan utan att något test föll. Det kan den fortfarande (L-5).
- a1d8ef3f säger «Nu skriver den hela erbjudandet per adress (NV-10)». Live stämmer det. Testet som citeras är en källtextregex som en död gren lurar (L-6).
- a1d8ef3f säger att BL-07 kräver att kontrollens namn och mönster bär bokens tal. Det gäller bara kontroller med `bokfort`. Adobe-kontrollen har inget `bokfort` längre, och förra blickens förslag i K-3 («Pröva Adobe-kontrollens mönster mot bokens 985,00») är inte gjort (L-7).

**Det som stämmer i commit-texten:** «sju riktningar → 9 tester föll (BI-13 ×3, LT ×3, BL-07, NV-03, NV-10)». Granskaren körde om alla sju mot hela sviten: 9 fail, 0 cancelled.

**Vad som släpper grinden.** Med den här filen ger grinden ok=false, «senaste domen är BLOCKERAR» (prov A under «Proveniens»). En lagning av L-1 ändrar `lib/supplier-price-intel.js`, alltså en mekanikfil efter da9e24f0. Den behöver en ny granskning som namnger den commiten (`lib/granskningsgrind.js` rad 16–21). Enligt tillämpningen under L-3 hör L-3 också till PR:en, och nästa blick ska pröva det. L-2 och de förexisterande [VAKT] hör inte till PR:en.

## Bekräftade [KUND]-fynd

### L-1: en årssumma för Business Basic läst som månad prissätts, och rummet kan visa tolv gånger kundens kostnad
- **Fil:** `lib/supplier-price-intel.js`.
- **Commit:** a1d8ef3f. Infört av lagningen. Gör felet vanligare: både main och a1d8ef3f~1 skickade samma fall till granskning.
- **Påstående:**
  - Lagningens enda tak för Microsoft är 1,30 × E5 769,42 = 1 000,25 kr.
  - Business Basic läst som årssumma per månad ger 66,91 × 12 = 802,92 och 80,29 × 12 = 963,48. Båda ligger under taket och prissätts.
  - På main var det effektiva taket 1,30 × 589 = 765,7 kr. På a1d8ef3f~1 var det fast 800 kr. Båda skickade de två talen till granskning.
  - Den realistiska vägen är en periodlös årsfaktura. Aggregeringen antar månad och ger `annualCost` 12 × sanningen.
  - Står nivån inte i radtexten stoppar varken like-for-like eller sanitetens tak på 50 %. Raden går auto med 96 350 kr/år för en faktura på 8 029 kr/år.
- **Bevis:**
  - `b2.mjs` kör main-kopian (`spi-main.mjs`), a1d8ef3f~1-kopian (`spi-fore.mjs`) och HEAD mot samma priser: «business-basic årsåtagande ×12 | 802.92 | GRANSKNING | GRANSKNING | prissätts» och «business-basic månadsvis ×12 | 963.48 | GRANSKNING | GRANSKNING | prissätts».
  - `b3.mjs` kör den riktiga `aggregateLineItems` och `routeExtraction` på en periodlös Microsoft-faktura: 10 användare à 802,92, `billingPeriod` unknown, `seatCount` 10. Utfall: «period=monthly antagen=true annualCost=96350.4 pps=802.92 route=auto | main GRANSKNING | före GRANSKNING | lagningen prissätts». För 963,48 blir `annualCost` 115 617,6 (granskarens anteckningar).
  - `b4.mjs` nedströms. Med «Microsoft 365 Business Basic» i texten ger `computeLikeForLikeSaasTarget` målet 8 029, alltså 92 %, och `verifySanity` fäller (`saving_92pct_exceeds_max_50pct`). Raden går till granskning ändå.
  - Med «Microsoft 365 licens» i texten ger LFL målet 96 350, alltså 0 %, och `verifySanity` ger pass (`skip_verified`). Raden går auto med `annualCost` 96 350,4.
  - `src/pages/Portfolio/index.js` rad 1409 (`h-cost`) och rad 1583 («Ni betalar idag … kr/år») visar `annual_cost`.
- **Motprov:** samma `b2` och `b3`.
  - Business Standard årspris 1 605,84 går till granskning i alla tre versionerna.
  - Standard, Premium, E3 och E5 × 12 går till granskning i alla tre.
  - Basic rätt läst (80,29 eller 66,91) prissätts i alla tre, med `annualCost` 9 634,8 eller 8 029,2.
  - Instrumentet kan alltså svara både granskning och prissättning, och skillnaden mellan versionerna gäller bara Basic.
- **Vad som inte är kört:** rummet är inte renderat, och `recommend()`:s AI-steg är inte kört. Avgränsningen 22 okt säger att ett fel utan en körning som visar motsatsen räknas som synligt. Domen vilar inte på synligheten: L-1 är infört och gör felet vanligare.
- **Förslag:**
  - Ett fast tak per leverantör kan inte både prissätta E5 med tillägg och fånga Basic × 12.
  - Lägg till en signaturkontroll för årssumman: flagga när `pricePerSeatMonthly` ≈ 12 × en bokförd SEK-nivå (`msrpMonthly` eller `msrpAnnual`, ±1 %). Eller gör taket nivåberoende när nivån är läst.
  - Lägg Basic × 12 (802,92 och 963,48) i LT-03.
  - Stryk «en årssumma» ur modulhuvudet tills den fångas.

### L-3: rummets bytesbesked för bredband lovar «aldrig en nedgradering» men läser aldrig kundens hastighet
- **Fil:** `api/invoice-history.mjs`, `buildSwitchTargets` (rad 576). `src/pages/Portfolio/index.js`, taggen «bäst matchning» (rad 1631) och löftet (rad 1636). Alternativtexten skrivs av `bredbandsalternativ()` i `agents/recommender/branchindex.js`, ny i a1d8ef3f.
- **Commit:** förexisterande. `buildSwitchTargets` och Portfolio-texten står oförändrade på main 25682b28. a1d8ef3f byter talen i alternativtexten och tar bort «/100». Granskaren: det gör inte felet vanligare, men svårare att se.
- **Påstående:**
  - «Bäst matchning» är alltid Tele2 Max (COAX) 1200 Mbit 319 kr/mån, oavsett kundens hastighet.
  - Portfolio skriver under alternativen: «Matchat mot er nuvarande nivå — samma eller bättre, aldrig en nedgradering.»
  - För en kund på 2500 Mbit är förslaget en nedgradering.
  - Lagningen tog bort «/100» ur texten. COAX-nätets asymmetriska uppladdning syns alltså inte längre bredvid löftet.
- **Bevis:**
  - `a2.mjs` kör `buildSwitchTargets` ur en kopia av `api/invoice-history.mjs` på en bredbandsrad från Telia. Vid 100, 1000 och 2500 Mbit är utfallet identiskt: «[bäst matchning] Tele2 Bredband Max (COAX) — … 1200 Mbit 319 kr/mån …», sedan Standard 1000 487 och Bahnhof.
  - Funktionen filtrerar bara bort kundens egen leverantör och sorterar på `reliability`.
  - Portfolio rad 1631–1636 är läst i kod, inte renderad.
  - `a3.mjs`: `bredbandSpeedBenchmark` ger p25 2 868 för 100 och 250 Mbit, 3 348 för 500 och 3 828 för 1000–2500. Alternativet är 319 × 12 = 3 828.
- **Motprov:**
  - `a2.mjs` med en Tele2-kund ger bara Bahnhof. Funktionen reagerar alltså på indata.
  - `a5.mjs` mot main: alternativet «1200/100 Mbit 279», p25 2 388 vid 100 Mbit och 3 348 vid 1000. Samma mönster fanns före grenen.
- **Varför fyndet står här och inte under «Förexisterande, utanför PR:en»:** detta är skrivarens tillämpning av regeln, och den står öppen för nästa blick att pröva.
  - Kriteriet är «synligt för en kund i dag i det PR:en ändrar».
  - Synligheten är inte avläst mot produktion. Enligt avgränsningen räknas felet då som synligt.
  - Texten under «bäst matchning», med «1200 Mbit», skrivs nu av grenens egen kod (`bredbandsalternativ()`). Lagningen ändrade alltså innehållet i det kort där löftet står, och tog bort det tal som visade uppladdningen.
  - Motläsningen: defektens mekanik, urvalet i `buildSwitchTargets` och löftet i Portfolio, ligger utanför diffen. Lagningen byter bara talen. Läst så hör L-3 till «Förexisterande, utanför PR:en».
  - Stoppregeln avgör tvekan åt kundens håll («Vid tvekan: [KUND]»), och skrivaren läser tvekan om räckvidden på samma sätt.
- **Obekräftat delpåstående:** att rummets rad «Samma nivå kostar idag» (`suggested_annual_cost`) är golvet p25. Det är läst i `lib/jamforelsekalla.js`, inte kört. Om det stämmer går talen i samma panel inte ihop för kunder på 500 Mbit eller lägre: 2 868 eller 3 348 bredvid ett alternativ på 3 828.
- **Förslag:** välj alternativet ur kundens lagrade hastighet med samma nearest-logik som `bredbandSpeedBenchmark`, och visa just den produkten och det priset. Annars: stryk «samma eller bättre, aldrig en nedgradering» och «bäst matchning» för bredband. Ett löfte utan mekanik bryter regel 9.

## Bekräftade [VAKT]-fynd: lagas framåt enligt stoppregeln

Granskaren skrev sina sabotage med `sab.py`: `assert old in s` med exakt en förekomst, och återställning ur sparad sträng i `finally` med kontroll. Varje sabotage kördes mot hela sviten, och `fail` och `cancelled` räknades.

### Införda av grenen

#### L-4: inget test prövar att Microsofts tak härleds ur boken
- **Fil:** `tests/listpristak.mjs`.
- **Commit:** a1d8ef3f. Infört.
- **Påstående:**
  - Lagningen säger att taket är 1,30 × bokens högsta listpris och att det följer boken.
  - LT-05 höjer E5 med 5 %. Det ryms inom marginalen på 30 %, så ett tak fruset på dagens tal klarar alla LT-tester.
  - LT-02 prövar härledningen bara för Adobe.
- **Bevis:** sabotaget S1 lät `HOGSTA_LISTPRIS.microsoft` returnera fast 769.42 i stället för `Math.max(...)`. Hela sviten: tests 2704, pass 2704, fail 0, cancelled 0, exit 0.
- **Beteendet ändrades, och det är kört:** `b5.mjs` via `beteende.py` höjer E5 med 40 % till 1 077,19. Med sabotaget blir `anomaly` true och taket 1 000,25. Utan sabotaget blir `anomaly` false och taket 1 400,35.
- **Motprov:** commitens eget sabotage C3 (Microsofts tak fast 800) fällde LT-03 och LT-05: 2 fail, 0 cancelled. Sviten ser alltså ett fast tak under 807,89, men inte ett fast tak på dagens nivå.
- **Förslag:** låt LT-05, eller ett nytt LT-07, höja bokens högsta Microsoft-nivå över marginalen, till exempel +40 %, och kräva att listpriset prissätts. Det är samma drag som LT-02 gör för Adobe.

#### L-5: `run()` i kortterminalvakten kan sluta anropa `kortterminalUtfall` utan att något test faller
- **Fil:** `lib/verifiers/kortterminal.mjs`.
- **Commit:** a1d8ef3f, lagningen av V-2. Luckan infördes av f20f8d2f. Båda ligger i grenen.
- **Påstående:**
  - V-2:s form ligger kvar ett lager ut. Slingan bröts ut till `kortterminalUtfall`, och NV-03 kör den.
  - Men `run()` kan sluta anropa `kortterminalUtfall`, och inget test fäller.
  - Kommentaren vid funktionen säger att `run()` förut kunde sluta anropa den utan att något test föll. Den antyder att det inte längre går. Det går.
- **Bevis:** sabotaget S3 ersatte `run()`:s «return kortterminalUtfall(vr.rates, texter);» med «return { checks: vr.rates.map((r, i) => kortterminalCheck(r, texter[i])), notes: [] };». Hela sviten: 2704 av 2704 gröna, fail 0, cancelled 0.
- **Beteendet ändrades, och det är kört:** `d1.mjs` höjer Stripes fasta avgift 1,00 → 1,50 i fixturen `stripe-terminal-2026-10-18`. `kortterminalUtfall` ger 3 checkar och utfallet «rott». Sabotagets uttryck ger 2 checkar och «gron». Driften i den fasta avgiften hade tappats.
- **Motprov:** commitens C6 (`kortterminalUtfall` tappar den fasta checken) fällde NV-03, 1 fail. Live gör `run()` rätt (se «Levande bevis»).
- **Förslag:** injicera sidläsaren, till exempel `run({ lasSida = withPage })`, och låt NV-03 köra `run()` med fixturtexterna. Annars ska kommentaren säga att `run()` fortfarande är oprövad, och luckan stå i `blind`.

#### L-6: NV-10:s krav på `run()` är en källtextregex som en död gren lurar
- **Fil:** `tests/narvarovakter.mjs` (regexen på rad 281). Raden den vaktar: `lib/verifiers/tele2-bredband.mjs` rad 48.
- **Commit:** a1d8ef3f. Infört.
- **Påstående:** produktraden kan sluta skrivas utan att något test fäller.
- **Bevis:** sabotaget S4 ändrade «notes.push(`${res.address}: ${produktrad(res.products)}`);» till «if (lastaProdukter < 0) notes.push(`${res.address}: ${produktrad(res.products)}`);». Hela sviten: 2704 av 2704 gröna, fail 0, cancelled 0. Regexen matchar fortfarande delsträngen.
- **Beteendet:** villkoret är alltid falskt, eftersom `lastaProdukter` redan ökats för adressen. Det är visat genom konstruktion, inte kört.
- **Motprov:** commitens C7 (raden borttagen) fällde NV-10, 1 fail. Live skriver `run()` produktraden för alla tre adresserna (se «Levande bevis»).
- **Förslag:** pröva `run()` som beteende, med `tele2BroadbandFor` injicerad och tre fixturadresser, och kräv en produktrad per adress i `notes`. Bibeln 8 sep: ordningen och närvaron i exekveringen kan bara bevisas av beteende.

### Förexisterande

#### L-7: inget test prövar Adobe-nattkontrollens tal och mönster mot bokens 985
- **Fil:** `lib/prisvaktens-kontroller.js`.
- **Commit:** a1d8ef3f, lagningen av K-3, tog bort Adobe-kontrollens `bokfort`. Granskaren klassar luckan som förexisterande.
- **Påstående:**
  - BL-07 läser bara kontroller med `bokfort`. Adobe-kontrollen har inget.
  - Förra blickens förslag i K-3 («Pröva Adobe-kontrollens mönster mot bokens 985,00») är inte gjort.
  - Nattkontrollen kan alltså gå tillbaka till majtalet utan att något test fäller.
- **Bevis:** sabotaget S2 satte Adobe-kontrollen till «{ name: 'All Apps 699 kr/user/mth (team, exkl moms)', pattern: /699\s*(?:kr|SEK)/i }». Hela sviten: 2704 av 2704 gröna, fail 0, cancelled 0.
- **Beteendet:** nattkontrollen letar då efter 699 på en sida som visar 985,00 SEK (fixturen `adobe-team-2026-10-18`, bokens all-apps 985). Det är visat genom konstruktion, inte kört.
- **Motprov:** commitens C5 (Adobe-vägen deklarerad igen) fällde BL-07, 1 fail. BL-07 har alltså tand mot deklarerade vägar, men inte mot odeklarerade.
- **Förslag:** ett test som kräver att Adobe-kontrollens namn och mönster bär `adobeVerified.teamExVatMonthly['all-apps']`, formaterat «985,00», och att mönstret matchar fixturens text.

## Förexisterande, utanför PR:en

### L-2: Google Workspace «ofta 30–40 % billigare än M365», medan bokens egna tal säger 9 % dyrare (KUND)
- **Fil:** `agents/recommender/branchindex.js`, `saas-productivity.alternatives`. Raden står på rad 427 vid da9e24f0 och rad 419 på main 25682b28 (avläst av skrivaren).
- **Commit:** förexisterande. PR:ens diff rör inte `saas-productivity`, `buildSwitchTargets` eller `src/` (avläst av skrivaren: `git diff origin/main...HEAD`). Granskaren anger att grenen inte gör felet vanligare.
- **Påstående:**
  - K-1:s form sitter kvar i en annan `real-public`-kategori.
  - Alternativet säger «Google Workspace Business Standard … Ofta 30–40 % billigare än M365».
  - Bokens egna tal säger att Google är ungefär 9 % dyrare.
  - Rummets bytesbesked visar texten som «bäst matchning» för varje Microsoft-kund med byte, under «verifierat öppet pris · 2026-10-19».
- **Bevis:**
  - `a6.mjs`: `google-standard` `usdAnnual` 14 och `usdMonthly` 16,8, `FALLBACK_RATE_USD_SEK` 10,42, `business-standard` 133,82 (årsåtagande) och 160,58 (månad).
  - 14 × 10,42 = 145,88, alltså +9,0 % mot 133,82. 16,8 × 10,42 = 175,06, alltså +9,0 % mot 160,58.
  - `a7.mjs` kör `buildSwitchTargets` (kopia av `api/invoice-history.mjs` med absoluta importer) på en `saas-productivity`-rad från Microsoft med `should_switch` och `net_saving` 5 000: «[bäst matchning] Google Workspace Business Standard — Starkaste alternativet till M365 — 2 TB Drive, Meet, Docs. Ofta 30–40 % billigare än M365.», `lastVerified` 2026-10-19.
  - Samma text står på main (`bi-main.mjs`, rad 419). BI-13 prövar bara bredbandets Tele2-alternativ.
- **Motprov:**
  - `a7.mjs` med en Google-kund: Microsoft 365 Business Standard står först och Google-texten visas inte. Filtret på kundens egen leverantör fungerar.
  - `a1.mjs`: mobil (269 och 299), molnväxel (89) och löneadmin (199 + 25) har alternativtal som stämmer med boken. Instrumentet kan alltså säga både stämmer och stämmer inte.
- **Varför det inte blockerar:** grenen inför det inte, gör det inte vanligare och rör inte det kort eller den kategori där det står. Synligheten är inte avläst mot produktion, så felet räknas som synligt. Läsningen som da9e24f0 avgjorde: ett förexisterande fel som en kund ser i dag, men som ligger utanför PR:ens syfte, håller inte PR:en. **Det går däremot före allt annat arbete, i en egen PR.**
- **Förslag:**
  - Stryk procentpåståendet, eller härled det ur boken på samma sätt som bredbandsalternativen. Google saknar verifierat SEK-pris, så ett påstående om relativt pris går inte att belägga, och då ska det inte stå.
  - Gör BI-13 generell: varje tal och procentsats i `alternatives[].positioning` i en `real-public`-kategori ska finnas i boken eller härledas ur den.
  - Telavox «Premium 399, Max 549» (molnväxel) saknar bokpost och faller under samma krav.

**Loggningen är inte klar.** Avgränsningen 22 okt säger att loggat betyder skrivet på två ställen: i domen och som en egen punkt i arbetsordern. `ops/ARBETSORDER-VAG1.md` vid da9e24f0 har punkter för V-1, K-5, K-6, K-7, V-3, V-4, V-5 och historiken i `supplier_price_history`. Den har ingen punkt för L-2, och ingen för L-3 eller L-7 (avläst av skrivaren). Den här filen är den enda skrivaren får ändra. Arbetsorderns punkter är byggarens steg.

## Obekräftade fynd

Inget av granskarens sju fynd är obekräftat. Följande delar är inte avlästa:
- **L-1:** rummet är inte renderat och `recommend()`:s AI-steg är inte kört. Hur ofta en periodlös årsfaktura med Business Basic utan nivå i radtexten förekommer är inte mätt. Avgränsningen kräver ingen frekvens för «vanligare», bara en mekanism i diffen.
- **L-3:** att «Samma nivå kostar idag» är golvet p25 är läst i kod, inte kört.
- **L-2 och L-3:** ingen körning mot produktion redovisas, så det är inte avläst om någon kund ser texterna i dag.
- **L-6 och L-7:** beteendeändringen under sabotaget är visad genom konstruktion, inte körd. Testernas tystnad är körd.
- **Standard 500, 399 den 22 okt 10:06:** om det var en kampanj eller ett tillfälligt API-svar är obekräftat (se «Levande bevis»).
- **Två anteckningar hos granskaren som inte blev fynd** (`anteckningar.md` rad 8 och 9). De är inte prövade med sabotage eller motprov här:
  - «molnvaxel saknar lastVerified på kategorinivå -> rummet visar inget datum (tgt.lastVerified null)».
  - «prisvaktens-kontroller mobil-nattcheck 239/279/299 mot bok 269/299/349 (förexist, utan bokfort)».

## Friat

Var och en med mätning:
- **K-1, importordning och kopior.** `agents/recommender/branchindex.js` har inga importer (grep «^import»: 0 träffar), så ingen cykel kan läsa alternativen före `tillampaBredbandsalternativ()`. `src/` importerar inte `branchindex`. Bredbandsalternativen når bara `buildSwitchTargets`: `getBenchmark(bredband)` ger null, och `bredbandSpeedBenchmark(1000)` bär inga alternativ (`a4.mjs`). Motprov: mobil bär 4.
- **K-1, inga gamla tal i kundtext.** Grep efter 279, 319, 487 och 455 med «kr» i `api/`, `src/`, `lib/` och `agents/` ger inga Tele2-bredbandstal i kundtext. `bredband.note` bär «2026-10-21» och 319 och 487 handskrivet, men noten når ingen yta, eftersom `getBenchmark` ger null.
- **K-1, datumet.** Rummet visar kategorins `lastVerified` i raden «verifierat öppet pris», och alternativtexten bär bokens tal, så källa och datum hör ihop. BI-13 har tand: C1 fällde 1 test, C2 fällde 2.
- **K-2, inga nya granskningsfall.** Inget tak blev lägre än på main. Microsoft gick från 765,7 till 1 000,25 och Adobe från 908,7 till 1 280,5. Google står på 600, oförändrat sedan fe149a4e. Alla tio SEK-nivåer för Microsoft prissätts, i båda faktureringslägena. E5 på månadsfakturering (769,42) gick till granskning på main och prissätts nu.
- **K-2, tillägg.** E5 plus ett tillägg över 230,83 kr per användare går till granskning på main, på a1d8ef3f~1 och på HEAD (`b2`: E5 + 231 = 1 000,42). Det är förexisterande och inte vanligare. E5 + 100 gick till granskning förut och prissätts nu. Granskningstexten för `price_anomaly` är reservkortet («Mottagen — men vi stoppade prissättningen … Skälet är tekniskt»), som inte påstår något falskt.
- **LT-06 har tand** (C4: 1 fail).
- **BL-07.** Spärren ≥10 ligger exakt på de 10 deklarationerna, så en borttagen deklaration fäller. Kravet på namn och mönster löser till bokens tal för alla tio. C5 fällde.
- **NV-03** prövar `kortterminalUtfall` (C6: 1 fail). Produktraden prövas som värde. NV-10 fälls av en borttagen rad (C7).
- **Commitens sabotagetal.** «Sju riktningar → 9 tester föll (BI-13 ×3, LT ×3, BL-07, NV-03, NV-10)» stämmer. Omkört mot hela sviten: C1 1, C2 2, C3 2 (LT-03, LT-05), C4 1 (LT-06), C5 1, C6 1, C7 1. Summa 9 fail, 0 cancelled.
- **da9e24f0** (`CLAUDE.md`, `ops/ARBETSORDER-VAG1.md`) gör inga mekanikpåståenden om lagningen utöver rättelserna av V-6 och V-7.
- **Övriga `real-public`-alternativ** stämmer mot boken: mobil 269 och 299, molnväxel 89, löneadmin 199 + 25.

### Sabotagen, samlat

| Utfall | Sabotage |
|---|---|
| fällde | C1 (1), C2 (2), C3 (2), C4 (1), C5 (1), C6 (1), C7 (1): commitens sju, 9 fail och 0 cancelled |
| fällde 0, beteendet ändrat och kört | S1 (L-4, `b5.mjs`), S3 (L-5, `d1.mjs`) |
| fällde 0, beteendet ändrat genom konstruktion | S2 (L-7), S4 (L-6) |

Granskaren körde 4 egna sabotage och körde om commitens 7. Skrivaren har inte kört om något av dem.

## Levande bevis: körning 39768127034

Körningen är verify-sources, `workflow_dispatch`, 2026-10-22 11:06:44 UTC, head da9e24f0. Avläst av skrivaren via `gh run view --json`: conclusion success, `discover` och alla 18 verify-jobb success, och jobbet «Stämpla verifieringsdatum på main» skipped. Jobbloggarna gick inte att läsa härifrån (se «Proveniens»). Produktraderna nedan är granskarens avläsning.

**tele2-bredband, jobb 119788683068.** Pris i kr/mån med 12 månaders bindning / utan bindning. Bokens kolumn är `tele2Verified` vid da9e24f0 (avläst av skrivaren i diffen).

| Produkt | Götgatan 92B, Stockholm | Sturegatan 33, Sundbyberg | Storgatan 41F, Östersund | Boken |
|---|---|---|---|---|
| Max 250 | 239 / 319 | 239 / 319 | 239 / 319 | 239 |
| Max 500 | 279 / 399 | 279 / 399 | 279 / 399 | 279 |
| Max 1200 | 319 / 439 | 319 / 439 | 319 / 439 | 319 |
| Max 2500 | 319 / 439 | 319 / 439 | ingen rad | 319 |
| Standard 100 | ingen rad | ingen rad | 399 / ingen rad | 399 |
| Standard 250 | ingen rad | ingen rad | 415 / 543 | 415 |
| Standard 500 | ingen rad | ingen rad | 455 / 591 | 455 |
| Standard 1000 | ingen rad | ingen rad | 487 / 615 | 487 |

- Varje 12-månaderspris i loggen är lika med boken.
- Loggen säger «✓ ankare max 1200 … ✓ ankare standard 1000 … håller (2 tal)» och «stämplade kategorin bredband: 2026-10-21 → 2026-10-22». Stämpeljobbet hoppades över, och grenens bok bär fortfarande `lastVerified: '2026-10-21'` för bredband (avläst av skrivaren).
- **V-1 avläst:** Standard 500 i Östersund är 455 kr med 12 månaders bindning, lika med boken. 399 finns i dag som Max 500 utan bindning på alla tre adresserna, och som Standard 100 med 12 månaders bindning i Östersund. Vakten filtrerar på `bindingMonths`, så 399 som syntes 10:06 i körning 39760492315 var en Standard 500-produkt med 12 månaders bindning. Den fanns inte kl. 11:07. Om det var en kampanj eller ett tillfälligt API-svar är obekräftat. Inget prisbeslut behövs: boken följer källan.
- Produktraden skrivs för alla tre adresserna. NV-10:s påstående stämmer alltså live, fast testet som citeras inte bär det (L-6).

**kortterminal, jobb 119788682995.** «✓ Stripe 1,4 %», «✓ Stripe Terminal fast avgift per debitering (kr): prisbok 1 kr · live 1 kr», «✓ Zettle 1,85 %», «håller (3 tal)». Loggen säger «stämplade 2026-10-19 → 2026-10-22». `run()` anropar alltså `kortterminalUtfall` i produktion, fast inget test kräver det (L-5).

**Övriga 16 verify-jobb:** gröna enligt jobblistan. Granskaren redovisar inga loggrader för dem, och skrivaren har inte läst dem.

**Det som ska stå i en PR-text:** grenens levande bevis är 18 av 18 gröna vid da9e24f0, och Standard 500 i Östersund står lika med boken. Domen är ändå BLOCKERAR, av L-1, som ingen nattvakt kan se: felet sitter i kundvägens rimlighetsprövning, inte i prisboken.

## Proveniens

- **Granskaren.** En granskare. Arbetet kom till skrivaren som JSON i uppdraget. Worktree på da9e24f089b8008e1e8ba69ff2acf62c540cb767 (`git rev-parse` bekräftad före och efter). Baslinje tests 2704, pass 2704, fail 0, cancelled 0.
  - Katalog: `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-ssot-lagningen/`.
  - Anteckningar i `anteckningar.md`. Mätskripten `a1`–`a7` (alternativen, `buildSwitchTargets` via `ih-kopia.mjs`, main-boken `bi-main.mjs`), `b1`–`b5` (taket i tre versioner, aggregeringen, LFL och sanitet) och `d1` (kortterminalens `run()`-uttryck). Sabotageharnesset `sab.py`, `beteende.py` och `commitsab.py`.
  - Läst av granskaren: `git show` för a1d8ef3f (alla nio filer) och da9e24f0, `ops/GRANSKNING-ssot-tele2.md`, main-versionen av `lib/supplier-price-intel.js` och `agents/recommender/branchindex.js`, `api/test-invoice.mjs` runt `validateSeatPrice`, `agents/test-invoice/extract.js` (`pricePerSeatMonthly`, `PERIOD_MULTIPLIER` och regeln om antagen månad), `lib/sanity-verifier.js`, `lib/jamforelsekalla.js`, `buildSwitchTargets` och Portfolio-panelen.
  - Katalogen ligger utanför repot och försvinner med sessionen. Det som ska citeras senare behöver gå in i `ops/` via en PR.
- **Skrivaren har inte kört om något sabotage och inte kört sviten.** Fynden och utfallen ovan är granskarens.
- **Skrivarens egna avläsningar, 22 okt:**
  - `git rev-parse HEAD` i `vakter-framat` gav da9e24f089b8008e1e8ba69ff2acf62c540cb767. `git merge-base HEAD origin/main` gav 25682b28837ec47d87e685688d40d9b92d36fc54, som är `origin/main`. `git log origin/main..HEAD` gav 13 commits. `git status --porcelain` var tomt före skrivningen.
  - `git show --stat`: a1d8ef3fd33ece878235c7f8e875f14e637f640a ändrar nio filer, varav fem mekanikfiler (`agents/recommender/branchindex.js`, `lib/prisvaktens-kontroller.js`, `lib/supplier-price-intel.js`, `lib/verifiers/kortterminal.mjs`, `lib/verifiers/tele2-bredband.mjs`) och fyra testfiler. da9e24f0 ändrar `CLAUDE.md` och `ops/ARBETSORDER-VAG1.md`.
  - `gh api repos/Arvo-flow/arvo-flow.github.io/pulls`: PR #86 är öppen med head da9e24f0.
  - `git diff origin/main...HEAD`: inga ändringar i `api/invoice-history.mjs` eller `src/`, och ingen i `saas-productivity`. Bredbandsdiffen ger `tele2Verified` max {250: 239, 500: 279, 1200: 319, 2500: 319} och standard {100: 399, 250: 415, 500: 455, 1000: 487}.
  - Läsningar i koden vid da9e24f0: `lib/supplier-price-intel.js` rad 3–4 och 12; `tests/listpristak.mjs` rad 51 (`769.42 * 12`, «en årssumma läst som månad») och LT-05 på rad 62–78 (höjning 1,05); `lib/verifiers/kortterminal.mjs` rad 93 och 97–102; `tests/narvarovakter.mjs` rad 281; `lib/verifiers/tele2-bredband.mjs` rad 48; `api/invoice-history.mjs` rad 576; `src/pages/Portfolio/index.js` rad 1409, 1583, 1631 och 1636; `agents/recommender/branchindex.js` rad 427 (Google-texten, rad 419 på main); `CLAUDE.md` rad 327–353 (avgränsningen).
  - `ops/ARBETSORDER-VAG1.md` vid da9e24f0: punkterna under «Förexisterande fynd» är V-1, K-5, K-6, K-7, V-3, V-4, V-5 och historiken. Ingen punkt för L-2, L-3 eller L-7.
  - Körning 39768127034: metadata och jobblista via `gh run view --json`. Jobbloggarna gick inte att hämta: både `gh run view --log` och `gh api …/actions/jobs/119788683068/logs` nådde loggfilens lagring, som svarade «Forbidden». Loggraderna ovan är därför granskarens, inte skrivarens.
- **Grinden på den här filen.** `lasGranskning` och `andraBlicken` ur `lib/granskningsgrind.js` vid da9e24f0, körda med `node` från stdin, utan någon ny fil. Indata: bas 25682b28, grenens 13 commits, 33 ändrade filer (12 mekanikfiler) och de 17 `ops/GRANSKNING-*.md` som fanns före skrivningen. Huvudet prövades före skrivningen, eftersom filen inte rörs efteråt. `lasGranskning` läser huvudet som `{"commits":["a1d8ef3f","da9e24f0"],"dom":"BLOCKERAR"}`.

  | Prov | Granskningar | Utfall |
  |---|---|---|
  | A: med den här filens huvud | 17 + denna | ok=false: «senaste domen är BLOCKERAR — bara «dom: MERGAS» släpper mekanik till main» |
  | B: motprov, samma huvud med `dom: MERGAS` | 17 + denna | ok=true: «12 mekanikfil(er) täckta av ops/GRANSKNING-ssot-tele2-lagningen.md (commit da9e24f)» |
  | C: motprov utan den här filen | 17 | ok=false: «ops/GRANSKNING-ssot-tele2.md: senaste domen är BLOCKERAR» |

  Grinden kan alltså svara båda hållen på samma huvud, och den här filen är den som gäller för PR:en.
- **Hårda mellanslag** räknas med en byte-räkning efter skrivningen (bibelns regel 7). Utfallet står i överlämningen, inte här, eftersom filen inte rörs efteråt.
