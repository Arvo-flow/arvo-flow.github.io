commits: f20f8d2f 64e1adcc d57040b2 3c105e28 fe149a4e 2a85733b ce103885 22f16281
dom: BLOCKERAR

# Andra blicken på uppföljningen efter PR #85: en prisbok och Tele2

Grenen är `vakter-framat`. Den står på 22f16281 och har bas 25682b28, som är mergen av PR #85 på `main`. Grenen har tio commits. Huvudet namnger åtta: de sju som ändrar en fil i `lib/`, `api/` eller `agents/`, och toppen 22f16281. De två andra står inte i huvudet: 3aa18c40 ändrar bara `CLAUDE.md`, och 54266708 ändrar `CLAUDE.md` och `tests/`. Vaktlinsen granskade båda (V-6 och «Friat»).

Två linser granskade: «kundvägen» och «vakterna». Båda prövade HEAD 22f16281 med baslinjen `node --test tests/run.mjs`: tests 2698, pass 2698, fail 0, cancelled 0. Båda rapporterar rent `git status` och HEAD 22f16281 vid slutet. Vaktlinsen rapporterar dessutom att den inte pushade, committade eller startade något arbetsflöde och inte använde Vercel-verktyg. Kundlinsens material säger inget om det.

Filen är skriven av en agent som varken byggt eller granskat. Den återger granskarnas fynd och utfall och har inte kört om något sabotage. Det skrivaren själv mätte står under «Proveniens».

## Domen

**BLOCKERAR.** K-1 är ett bekräftat [KUND]-fynd som grenen inför (3c105e28). Det räcker för domen.
- 14 fynd från två linser. 13 är bekräftade med bevis och motprov. 1 är obekräftat (K-5).
- Bekräftade [KUND]: 2. K-1 är infört av grenen. V-1 är förexisterande.
- K-4 och V-1 är samma avläsning: Standard 500 i Östersund, 455 i boken och 399 i källan. Kundlinsen klassar den [VAKT], vaktlinsen [KUND]. Avgränsningen 22 okt avgör åt [KUND] (se V-1). Domen vilar inte på V-1.
- Bekräftade [VAKT]: 11. Fem är införda av grenen (K-2, K-3, V-2, V-6, V-7). Sex är förexisterande (K-4, K-6, K-7, V-3, V-4, V-5). [VAKT] blockerar inte enligt stoppregeln (9 sep). De mergas och lagas framåt.

**Grenens påståenden som inte håller.** De ska stå här utan att mjukas upp:
- 3c105e28 höjer bredbandsboken till 319 kr/mån för Max 1200 men lämnar 279 i alternativtexten som rummets bytesbesked visar (K-1).
- 3c105e28 säger «Standard-familjen är oförändrad». Det höll 21 okt. Den 22 okt sa källan 399 för Standard 500 i Östersund, mot bokens 455 (V-1, K-4). Grenens egen körning är 17 av 18 gröna, inte 18 av 18.
- 3c105e28 kallar tröskelfixturerna bevis för «under 500 → hävda ingenting». De låser bara att tröskeln ligger över 432 (K-6).
- fe149a4e säger att taket nu läses ur prisboken. Kvotgrenen kan inte nås med dagens bok, och det hårdkodade taket fattar varje beslut (K-2).
- fe149a4e säger att Adobe-kontrollen läser «med bokfort mot adobeVerified». Vägen löser aldrig (K-3).
- f20f8d2f säger att kopplingen till `run()` prövas. Inget test prövar den (V-2).
- 2a85733b säger att «den yta som en dag läser fältet får bokens tal». Bokens sida stämmer. Kundsidan är fel tal (K-7).
- 3aa18c40 skrev «MÄTT 21 OKT … FEM GRANSKNINGSVARV» innan femte blicken gett något utfall (V-6).
- 22f16281 säger «tre av fem varv». Avläst är två (V-7).

**Vad som släpper grinden.** Med den här filen ger grinden ok=false, «senaste domen är BLOCKERAR» (prov A under «Proveniens»). En lagning av K-1 ändrar `agents/recommender/branchindex.js`, alltså en mekanikfil efter 22f16281. Den behöver en ny granskning som namnger den commiten (`lib/granskningsgrind.js`, rad 16–22). Lagas bara K-1 avgör V-1 nästa dom, och om V-1 ensamt håller PR:en är öppet (se V-1). V-1 kräver ett prisbeslut, och svepet stannar vid pris. Merge till `main` är grundarens beslut.

## Bekräftade [KUND]-fynd

### K-1: rummets bytesbesked för bredband visar 279 kr/mån under bokens datum 2026-10-21
- **Fil:** `agents/recommender/branchindex.js`, `bredband.alternatives[0].positioning` (rad 231 vid 22f16281, avläst av skrivaren). Rummet: `buildSwitchTargets` i `api/invoice-history.mjs` (rad 576) och `src/pages/Portfolio/index.js`.
- **Commit:** 3c105e28. Infört av grenen.
- **Påstående:**
  - Texten säger «Verifierat via adress-API 2026-08-18: 1200/100 Mbit 279 kr/mån exkl (12 mån)». Boken säger nu 319 för max 1200.
  - `buildSwitchTargets` skickar texten oförändrad till rummets bytesbesked.
  - Portfolio visar den under «Vad ni får» med taggen «bäst matchning». Raden under säger «verifierat öppet pris · 2026-10-21».
- **Bevis:**
  - `k1.mjs` på grenen: alternativets pris för 1200 är 279, bokens max[1200] är 319, lika: false.
  - `k1b.mjs` kör den riktiga `buildSwitchTargets` (en kopia av `api/invoice-history.mjs` med absoluta importer) på en Telia-bredbandsrad med `should_switch` och `net_saving` 1200. Utfall: `positioning` bär «…1200/100 Mbit 279 kr/mån exkl (12 mån)…», och `lastVerified` är 2026-10-21.
  - Enligt kundlinsens grep i `src/`, `lib/` och `api/` är detta det enda kvarvarande hårdkodade gamla Max-talet som når en yta.
  - `recommend` får inte texten. Bredbandets benchmark kommer från `bredbandSpeedBenchmark` och saknar `alternatives`.
- **Motprov:** på main 25682b28 ger `k1.mjs` 279 i texten och 279 i boken, lika: true. Instrumentet kan svara båda hållen.
- **Mot källan, inte bara mot boken:** vakten såg max 1200 279 → 319 redan 21 okt 05:17 (39548656562). När Tele2 ändrade priset är inte avläst. Det ändrar inte klassen: på grenen står 279 under bokens 319 och bokens datum.
- **Förslag:** härled talet och datumet i `positioning` ur `tele2Verified` (regel 1), eller rätta till 319 och 2026-10-21. Lägg till ett test i stil med BI-09 som kräver att varje kr/mån-tal i `bredband.alternatives` finns i `tele2Verified`.

### V-1: Standard 500 är 399 kr/mån i källan och 455 i boken
- **Fil:** `agents/recommender/branchindex.js`, `standard: { 100: 399, 250: 415, 500: 455, 1000: 487, … }` (rad 226 vid 22f16281, avläst av skrivaren).
- **Commit:** 3c105e28 ändrar bredbandsboken. Samma Standard-tal står på main 25682b28. Förexisterande, och vaktlinsen anger att grenen inte gör det vanligare.
- **Påstående:**
  - Körning 39760492315 (22 okt 10:06, 22f16281) ger DRIFT för Standard 500 på Storgatan 41F i Östersund: boken 455, källan 399 kr/mån, med 12 månaders bindning.
  - 3c105e28 och bokens kommentar säger «Standard-familjen oförändrad». Det stämde 21 okt 15:12. Det stämmer inte 22 okt 10:06.
  - Talet går in i `bredbandSpeedBenchmark(500).median` och därifrån i `overpaymentPercent`.
- **Bevis:**
  - Jobb 119763244601: «✗ DRIFT standard 500 (STORGATAN 41F, 831 33 ÖSTERSUND): prisbok 455 kr · live 399 kr». Båda ankarna och hela Max-familjen bekräftades. De 17 andra jobben var gröna.
  - Jobb 119302591663 (21 okt 15:12) gav bara DRIFT på Max och ingen på Standard 500.
  - Mätt lokalt av vaktlinsen: `bredbandSpeedBenchmark(500)` ger p25 3348 och median 5460 med boken, och median 4788 med 399.
  - `overpaymentPercent` för en 500-Mbit-kund på 10 788 kr/år blir 98 med boken och 125 med 399.
- **Motprov:** samma instrument mot samma adress sa «lika» för Standard 500 den 21 okt. Den 22 okt bekräftade det ankaret standard 1000 och Max-familjen. Vakten kan alltså svara både lika och olika för Standard-familjen.
- **Klassen är omstridd, och här står varför fyndet står som [KUND]:**
  - Kundlinsen (K-4) klassar samma avläsning [VAKT]. Grunden: `bredbandSpeedBenchmark` har `source: 'tele2-verified'`, inte `real-public`, så `recommend` ger prompten INGEN_JAMFORELSE. Medianen matar bara `overpaymentPercent`, som ingen fil i `src/` eller `api/` läser (grep). p25 för 500 Mbit är Max 279 och påverkas inte.
  - Vaktlinsen säger att talet når promptens faktatext, och att det inte är avläst om medianen syns på någon kundyta i dag.
  - Linserna är alltså oense om promptens faktatext. Ingen av dem redovisar en körning av prompten eller av en kundyta.
  - Avgränsningen 22 okt säger att «syns inte för någon kund i dag» är en avläsning: «En körning mot dagens bok eller produktion ska visa att ingen kundyta skriver ut felet. Utan den mätningen räknas felet som synligt.» Kundlinsens grund är grep och kodläsning, inte en körning. Felet räknas därför som synligt. Vid tvekan: [KUND].
- **Blockerar V-1 ensamt? Öppet.**
  - Grenen inför inte felet, och vaktlinsen anger att grenen inte gör det vanligare.
  - Vaktlinsen säger att fyndet rör PR:ens eget syfte, att bredbandsboken följer källan, och att grundaren avgör om det håller PR:en.
  - Avgränsningen låter fel som är «synliga/blockerande för PR:ens eget syfte» tvinga fram ombyggnad. Bibelns läsning av den meningen ligger öppen hos grundaren.
  - Domen är BLOCKERAR genom K-1 oavsett.
- **Obekräftat:** om 399 är ett nytt listpris, ett kampanjerbjudande eller en skillnad mellan adresser i öppen fiber.
- **Förslag (grundarens prisbeslut):**
  - Kör om tele2-bredband en gång till, så att det syns om 399 består. Består det följer boken källan (grundarbeslutet 21 okt), med samma propageringsbevis som i 3c105e28.
  - Avgör om boken ska bära Standard per adress eller som min/max. Vakten räknar i dag varje skillnad mellan adresser som drift.
  - PR-texten får inte säga att alla 18 vakter är gröna.

## Bekräftade [VAKT]-fynd: lagas framåt enligt stoppregeln

Båda linserna skrev sina sabotage med `assert old in s` och återställde i `finally`. Kundlinsen kräver exakt en förekomst. Vaktlinsen återställde ur sparad sträng och räknade `# fail` och `# cancelled` för varje körning mot hela sviten.

### Införda av grenen

#### K-2: listpristakets kvotgren kan inte nås, och det absoluta taket ligger 4 % över E5
- **Fil:** `lib/supplier-price-intel.js`.
- **Commit:** fe149a4e. Infört.
- **Påstående:**
  - Kvotgrenen är 1,30 × bokens högsta listpris. Det absoluta taket är 800 kr för Microsoft och 1200 kr för Adobe. Båda ligger under kvotgrenen: 1,30 × 769,42 = 1000,2 och 1,30 × 985 = 1280,5.
  - «Nu läses taket ur prisboken» stämmer i koden men har ingen verkan. Det hårdkodade taket fattar varje beslut.
  - Taket ligger 4 % över E5:s månadspris. Höjer Microsoft E5 med 4 % och boken följer, går en E5-kund som betalar exakt listpris till granskning i stället för att prissättas. Det är felet commiten lagade, flyttat till taket.
  - SEK-filtret i `HOGSTA_LISTPRIS.microsoft` står bakom ett annat skydd och skyddar inget.
- **Bevis:**
  - `k3.mjs` sveper 0,01–2000 kr i steg om 1 öre. Kvotgrenen fällde 0 gånger för microsoft, adobe och google.
  - `k9.mjs` höjer E5 i boken i minnet, kör och återställer. Vid +3 % (792,5) är `anomaly` false. Vid +4 % (800,2) är den true, med skälet «pricePerSeat 800.2 kr > tak 800 kr». Adobe vid +10 % (1083,5) är ok.
  - Kundlinsens S2 tog bort `.filter(currency === 'SEK')`: 2698 av 2698 gröna, 0 fail, 0 cancelled. Beteendet var oförändrat, eftersom USD-nivåerna saknar msrp-fält (`k2.mjs`).
  - LT-02 når kvotgrenen bara med en bok som sänkts till 500.
- **Motprov:** main-versionen av modulen, en kopia i granskarens katalog, med samma svep. Kvotgrenen fällde 3430, 29130 och 13200 gånger. Svepet ser en levande kvotgren.
- **Varför [VAKT]:** med dagens bok ändras ingen kundsiffra. Avståndet till en kundsynlig följd är en prishöjning på 4 % hos Microsoft.
- **Förslag:** bestäm vad grinden är. Räkna taket ur boken, till exempel max(avläsningströskel, 1,30 × bokens högsta), eller ta bort kvotgrenen och skriv i modulhuvudet att det absoluta taket är det enda skyddet. Lägg till ett test som höjer bokens högsta nivå med 5 % och kräver att listpriset fortfarande prissätts.

#### K-3: Adobe-nattkontrollens `bokfort` löser aldrig
- **Fil:** `lib/prisvaktens-kontroller.js`.
- **Commit:** fe149a4e. Infört.
- **Påstående:**
  - Commiten säger att Adobe-kontrollen nu läser «med bokfort mot adobeVerified».
  - Vägen `['saas-creative','adobeVerified','teamExVatMonthly','all-apps']` löser aldrig. `BRANCHINDEX['saas-creative']` saknar `source` på kategorinivå, och `bokfortPris` kräver `real-public` eller `real`.
  - En verklig Adobe-prisändring kan därför aldrig bli en marknadshändelse.
  - Inget test prövar Adobe-kontrollen.
- **Bevis:**
  - `k5.mjs`: Adobe-kontrollens `bokfort` ger NULL, och `kategori.source` är undefined.
  - `k4.mjs`: `verifieradBaslinje(985)` ger skälet `bokfort_pris_saknas_i_prisboken`.
  - Kundlinsens S3 satte tillbaka kontrollen till «All Apps 699» med mönstret `/699\s*(?:kr|SEK)/` och utan `bokfort`: 2698 av 2698 gröna, 0 fail, 0 cancelled. Mönstret letar då efter fel tal.
- **Motprov:** `k5.mjs`: de övriga tio `bokfort`-deklarationerna (M365 ×8, Fortnox Lön ×2) löser till bokens tal. Instrumentet kan alltså säga LÖSER.
- **Förslag:** ett test som kräver att varje deklarerad `bokfort`-väg ger `bokfortPris !== null` och bokens tal. Ge `saas-creative` `source: 'real-public'`, eller låt `bokfortPris` läsa `source` på noden `adobeVerified`. Pröva Adobe-kontrollens mönster mot bokens 985,00.

#### V-2: inget test prövar att `run()` använder `kortterminalChecks`
- **Fil:** `lib/verifiers/kortterminal.mjs`.
- **Commit:** f20f8d2f. Infört.
- **Påstående:**
  - Commit-texten säger att `kortterminalChecks` är det `run()` lägger i utfallet, «så att kopplingen prövas». Koden säger «det run() lägger i fabrikens utfall (NV-03)».
  - Inget test prövar att `run()` använder funktionen.
  - Går `run()` tillbaka till att bara lägga raten i utfallet läses Stripes fasta avgift inte längre, och kategorin stämplas ändå (V85-K1). Sviten är då grön.
- **Bevis:** vaktlinsens S4a ändrade i `run()` `checks.push(...kortterminalChecks(r, text));` till `checks.push(kortterminalCheck(r, text));`. Hela sviten: exit 0, fail 0, cancelled 0. Commitens sabotage «run-utfallet tappar fasta checken» motsvarar S4b, som bara ändrar funktionskroppen.
- **Motprov:** S4b ändrade funktionskroppen till `return [kortterminalCheck(r, text)];`. Det fällde NV-03 (1 fail). Sviten ser alltså att den fasta checken försvinner i funktionen, men inte att `run()` slutar anropa funktionen. I körning 39760492315 gör `run()` rätt: «Stripe Terminal fast avgift per debitering (kr): prisbok 1 kr · live 1 kr».
- **Förslag:** pröva `run()` med en injicerad `withPage`, eller exportera slingan som en ren funktion som tar sidtexter och låt NV-03 anropa den. Annars: stryk «så att kopplingen prövas» och skriv luckan i `blind`.

#### V-6: bibelns «MÄTT 21 OKT … FEM GRANSKNINGSVARV» skrevs före femte varvets utfall
- **Fil:** `CLAUDE.md`.
- **Commit:** 3aa18c40. Infört. Commiten står inte i huvudet, eftersom den bara ändrar `CLAUDE.md`.
- **Påstående:**
  - Rubriken säger «MÄTT 21 OKT: FEM REGLER TILL, UR PR #85:S FEM GRANSKNINGSVARV. Varje varv fann ett fel i det förra varvets lagning».
  - Den skrevs 21 okt 22:18, när femte blicken inte gett något utfall. Den blev sann först 22 okt 05:19.
- **Bevis:**
  - Huvudtranskriptet rad 8628 (2026-10-21T22:18:14Z) är anropet som skriver texten.
  - Femte blicken startade 21 okt 19:45 (rad 8516) och dog 22:21 med «linsen dog — skörda och kör om» (rad 8642). Den startade om 22 okt 04:57 (wf_d957d951-57c) och fick sin dom i 6d083562, 2026-10-22 05:19:54.
  - Texten räknar själv bara upp tre varvs fynd (13, 8, 3).
- **Motprov:** 13, 8 och 3 stämmer mot `ops/GRANSKNING-prisboken-vakterna.md`, `-tredje.md` och `-fjarde.md`. Femte blicken fann sedan F85-1, F85-3 och F85-4 i accc1dff, så meningen håller vid HEAD. Felet är tidsordningen och etiketten «MÄTT 21 OKT», inte talet.
- **Förslag:** ändra till «MÄTT 21–22 OKT» och nämn femte blickens 4 fynd, eller skriv «fyra varv med utfall, det femte pågår». Bevisplikten 1 sep: ett påstående skrivs efter att det körts.

#### V-7: avgränsningens motivering säger «tre av fem varv», avläst är två
- **Fil:** `CLAUDE.md`, avgränsningen 22 okt (rad 305–308 vid 22f16281, avläst av skrivaren).
- **Commit:** 22f16281. Infört.
- **Påstående:**
  - Motiveringen säger «Tre av fem varv drevs alltså av ett fel som PR:en inte hade infört».
  - Det tredje varvet hade körts ändå. Andra blicken krävde en egen runda för 91b38af4 och ee3ff972 (Zoom), och tredje blickens 7 [VAKT] satt i de fem commitsen, de flesta i Zoom-arbetet.
  - Bara fjärde och femte varvet fanns enbart på grund av PB85-2-kedjan, och fjärde varvets G85-1 var dessutom infört av PR:en.
- **Bevis:**
  - `ops/GRANSKNING-prisboken-vakterna.md`: «Commitsen behöver alltså en egen granskningsrunda innan PR:en kan mergas» (91b38af4, ee3ff972).
  - `ops/GRANSKNING-prisboken-vakterna-tredje.md`: «De 7 [VAKT] är alla införda av de fem commitsen».
  - `ops/GRANSKNING-prisboken-vakterna-fjarde.md`: «G85-1 … Det är inte förexisterande. PR:en införde det.»
- **Motprov:** det som stämmer är att tredje varvets BLOCKERAR kom från T85-1, alltså lagningen av PB85-2. Utan den lagningen hade tredje varvet troligen gett MERGAS (obekräftat), och fjärde och femte varvet hade inte behövts. Två extra varv är avläst. Tre är det inte.
- **Förslag:** skriv «två av fem varv (fjärde och femte) fanns bara för PB85-2-kedjan, och det tredje blockerade på den». Låt citatet och reglerna stå orörda.
- **Följd för den här domen:** ingen. Fyndet gäller motiveringens tal, inte regeln. Domen tillämpar regeln som den står.

### Förexisterande

#### K-4: grenens levande bevis är rött på tele2-bredband, och commiten säger «oförändrad»
- **Fil:** `agents/recommender/branchindex.js`.
- **Commit:** 3c105e28. Förexisterande enligt kundlinsen.
- **Påstående:**
  - Körning 39760492315 (22 okt, HEAD 22f16281) är röd på tele2-bredband: «✗ DRIFT standard 500 (STORGATAN 41F, 831 33 ÖSTERSUND): prisbok 455 kr · live 399 kr».
  - Max-familjen stämmer nu, med ankaret max 1200 bekräftat och inga Max-drifter.
  - Commitens «Standard-familjen är oförändrad» gällde körningarna 21 okt men inte 22 okt. 17 av 18 vakter är gröna, och stämpeljobbet hoppades över.
- **Bevis:** jobblogg 119763244601 i körning 39760492315: conclusion failure, en drift (standard 500 Östersund 455 → 399), ankaret standard 1000 bekräftat.
- **Motprov:** samma vakt i 39623423878 (21 okt 15:12) och 39548656562 (21 okt 05:17) gav bara Max-drifter och ingen Standard-drift.
- **Klassen:** kundlinsen klassar avläsningen [VAKT], på grep och kodläsning. Kundsidan av samma avläsning står som [KUND] i V-1, av skälet där. Här står det som rör beviset: commitens påstående och det röda.
- **Förslag:** läs körningen igen innan en PR-text säger 18 av 18. Prisbeslutet är grundarens (V-1).

#### K-6: tröskelfixturerna låser en tröskel över 432, inte 500
- **Fil:** `lib/secondary-savings.js`. Fixturerna edge-25, comb-55 och comb-13 (gross 432) och BI-11.
- **Commit:** 3c105e28 kallar dem bevis. Förexisterande.
- **Påstående:** fixturerna och BI-11 låser bara att tröskeln är över 432. Commiten kallar dem bevis för grenen «under 500 → hävda ingenting».
- **Bevis:**
  - Kundlinsens S1 ändrade i mobilgrenen `if (gross < 500) return null;` till `if (gross < 433) return null;`. Hela sviten: 2698 av 2698 gröna, 0 fail, 0 cancelled.
  - Beteendet ändrades: en sekundär bredbandsbesparing på 433–499 kr hävdas nu.
  - Ingen fixtur har `grossSaving` mellan 450 och 549 (grep).
- **Motprov:** commitens eget sabotage (tröskel 500 → 400) fällde 5 tester. Sviten ser en tröskel under 432, men inte en mellan 433 och 500.
- **Förslag:** en tvillingfixtur med gross ≥ 500 (till exempel 500 eller 504) som förväntar sig en sekundär besparing. Låt BI-11 kräva båda kanterna.

#### K-7: prislarmets kundtal innehåller tilläggsrader
- **Fil:** `lib/price-alert.js`, `detectPriceAlert`.
- **Commit:** 2a85733b. Förexisterande.
- **Påstående:**
  - Bokens nivåpris jämförs med `pricePerSeatMonthly`, som är projected/seats och alltså innehåller tilläggsrader.
  - En Business Standard-licens till exakt listpris plus ett backuptillägg ger «overListPrice +25 %».
  - Commitens «den yta som en dag läser fältet får bokens tal» stämmer för bokens sida. Kundsidan är fel tal.
  - Latent: `priceAlert` läses av ingen yta.
- **Bevis:**
  - `k8.mjs`: Business Standard 1605,8 kr för 10 licenser plus backup 400 kr ger `pricePerSeat` 200,58. Utfallet är `overListPrice` true, `percentOver` 25 och `verifiedListPriceMonthly` 161.
  - Läsare av `priceAlert`: grep i `src/`, `api/`, `lib/` och `scripts/` träffar bara svaret i `test-invoice` rad 2362. TestaFaktura läser `savingRange` och `calculationChain` men inte `priceAlert`. `send-analysis` nämner det inte, och `invoice-store` lagrar det inte.
- **Motprov:** `k8.mjs`. E3 och E5 till listpris (månad och år) ger null. E3 +30 % ger +30 mot 500. Office 365 E3 och blandade nivåer ger `nivaOviss`. Google Workspace med leverantören Google ger null. Telia och Tele2 mobil ger null. Nivådetektionen är alltså rätt, och felet ligger i kundtalet.
- **Klassen:** grunden är grep, samma form som kundlinsens grund i K-4. Här säger ingen lins emot, och fältet har ingen läsare alls. Läser en yta det en dag blir fyndet [KUND].
- **Förslag:** innan en yta läser `priceAlert`: jämför nivåradens eget à-pris (radobservation) i stället för projected/seats, eller dra av tilläggsraderna.

#### V-3: `dollarRader` sväljer belopp som står nära varandra och kapar tyst vid 24
- **Fil:** `lib/verifiers/core.mjs`.
- **Commit:** ce103885 flyttade läsaren. Felet är förexisterande: den gamla sondlogiken på main ger samma utfall.
- **Påstående:**
  - `dollarRader` beskrivs som «varje belopp med texten före och efter».
  - Efter-fönstret `[\s\S]{0,70}` konsumerar varje belopp som står inom 70 tecken efter ett annat.
  - Funktionen kapar vid 24 rader utan att säga det.
  - NV-08 låser den svalda listan som facit, och sonden säger «dumpar varje pristal».
- **Bevis:**
  - Zoom-fixturen: `DOLLARBELOPP` hittar 5 belopp (14,16 18,33 22 16,50 20). `dollarRader` ger 4, och 16,50 saknas.
  - Tabellraden «Pro 14,16$ /användare per månad Köp nu Affärsverksamhet 18,33$ …» ger bara 14,16.
  - 30 skilda belopp ger 24 rader, utan markering.
  - Live i probe-saas-render 39620847659 svaldes tabellens 18,33 och tilläggets 16,50.
  - Den gamla sondlogiken på main ger samma lista: 14,16, 18,33, 22 och 20.
- **Motprov:** `DOLLARBELOPP` som det står hittar alla 5 respektive båda talen i samma text. Det är radläsarens fönster som tappar dem, inte mönstret.
- **Förslag:** låt efter-fönstret vara en lookahead som inte konsumerar text, så att nästa belopp blir en egen rad. Skriv ut «… N belopp till, kapat vid 24» när taket nås. Låt NV-08 kräva alla 5 talen i fixturen.

#### V-4: Creative Cloud Pro-priset har inget momsankare
- **Fil:** `lib/verifiers/adobe.mjs`.
- **Commit:** syskonfallet till V85-A1 i f20f8d2f. Regexen är identisk på main 25682b28 (rad 34). Förexisterande.
- **Påstående:**
  - V85-A1 lade ett test på Photoshop-individens momsankare. Syskonet `IND_ALLA` (Creative Cloud Pro, «Ordinarie pris», normalpriset inkl moms) har inget momsankare.
  - Byter Adobe till exkl-form blir vakten DRIFT med ett tal i fel momsbas, inte OLÄSBAR.
  - `fangar` säger «individ Photoshop och Creative Cloud Pro normalpris inkl moms», och testkommentaren säger att individpriserna annars är okända. Båda lovar ett krav som bara gäller det ena priset.
- **Bevis:**
  - På fixturraden «Creative Cloud Pro Spara 50% Ordinarie pris 932,50 SEK/mån Alternativt för 466,16 SEK/måninkl.» byttes 932,50 mot 746,00 och «inkl.» mot «exkl.». Utfall: gron, gron, gron, drift, med actual «746 SEK».
  - Med markören borttagen helt: alla fyra gröna.
  - `individualInclVatMonthly['all-apps']` momsrensas ÷1,25 i `lib/adobe-rightsizing.js`. En «rättning» av boken efter ett sådant DRIFT ger kunden 596,80 i stället för rätt tal.
- **Motprov:** Photoshop i samma exkl-form («Photoshop 249,00 SEK/månexkl. moms») ger gron, gron, olasbar, gron. Det ankrade syskonet blir OLÄSBAR som det ska.
- **Förslag:** kräv momsmarkören också för `IND_ALLA` (på sidan står den efter «Alternativt för … SEK/mån»), eller skriv luckan i `blind`. Ett NV-06-fall som byter all-apps till exkl och kräver OLÄSBAR.

#### V-5: två kategoristämplar landar på fel datumpost
- **Fil:** `lib/verifieringsstampel.js` (`stamplaKategori`).
- **Commit:** förexisterande på main 25682b28. Synligt i grenens körning 39760492315.
- **Påstående:**
  - En grön Spiris-körning stämplar `fortnoxVerified.lastVerified`, eftersom `stamplaKategori('saas-finance')` tar blockets första datum. `spirisVerified` står kvar på 2026-06-17 och prövas aldrig av price-audit.
  - fortnox-lon stämplar literalen för loneadmin (rad 848). Körningen skriver över den med `fortnoxLonVerified` (2026-05-22). Kunden ser 2026-05-22, medan price-audit läser den stämplade 2026-10-19 och svarar «ALLT OK».
- **Bevis:**
  - Loggen säger «stämplade kategorin saas-finance: 2026-10-19 → 2026-10-22» (spiris) och «stämplade kategorin loneadmin: 2026-10-19 → 2026-10-22» (fortnox-lon).
  - Simulering med `stamplaKategori`: saas-finance ändrar raden `source: 'fortnox-prislista', lastVerified` (rad 732 på grenen, rad 723 på main). loneadmin ändrar rad 848.
  - `getPublicListBenchmark({category:'loneadmin'})` ger `lastVerified` 2026-05-22.
  - price-audit ger «✓ ALLT OK». Dess regex läser 2026-10-19 för båda kategorierna, medan körningen ger loneadmin 2026-05-22 och spirisVerified 2026-06-17. Det är 127 dagar, över gränsen på 60.
- **Motprov:** samma simulering för kortterminal, molnvaxel, saas-creative, bredband, mobil och el ändrar vaktens eget block (rad 287, 256, 636, 181, 134 och 104). Funktionen träffar rätt där kategorin har ett eget datum eller bara en vakt.
- **Varför [VAKT]:** kunden ser ett äldre men sant datum. price-audits gröna är grönt av fel skäl. Se också den öppna frågan om `fortnoxVerified` under «Obekräftade fynd».
- **Förslag:** låt Spiris deklarera sin underpost (till exempel `bevakadKategori: 'saas-finance.spirisVerified'`), och låt `stamplaKategori` vägra när blocket rymmer flera vaktade underposter. För loneadmin: stämpla `fortnoxLonVerified`, eller ta bort den överskrivna literalen. Låt price-audit läsa körningens datum.

## Förexisterande, utanför PR:en

Inget bekräftat [KUND]-fynd står här.
- V-1 är förexisterande men står under «Bekräftade [KUND]-fynd». Talet sitter i den bredbandsbok som grenen ändrar (3c105e28), vaktlinsen knyter det till PR:ens eget syfte, och synligheten är inte avläst med en körning. Om V-1 ensamt håller PR:en är grundarens beslut.
- K-5 är förexisterande och obekräftat (se nästa avsnitt).
- Avgränsningen 22 okt säger att loggat betyder skrivet på två ställen: i domen och som en egen punkt i arbetsordern. Den här filen är den enda skrivaren får ändra. Arbetsorderns punkter för V-1 och K-5 är alltså inte skrivna. Det steget är byggarens.

## Obekräftade fynd

### K-5: bytesbeskedet visar ett fryst golv bredvid dagens bokdatum (KUND, obekräftat)
- **Fil:** `src/pages/Portfolio/index.js` rad 1644 (avläst av skrivaren: raden renderar `fmtNum(a.suggested_annual_cost)` under «Samma nivå kostar idag» och «verifierat öppet pris» med `tgt.lastVerified`).
- **Commit:** 3c105e28. Förexisterande enligt kundlinsen.
- **Påstående:**
  - Rummet visar den lagrade, frysta `a.suggested_annual_cost` bredvid dagens bokdatum, 2026-10-21.
  - Bredbandsrader som analyserades från 18 aug fram till deploy bär golvet från 279-nivån, till exempel 3348 kr/år för 1000 Mbit mot dagens 3828.
  - «Ni behåller +net_saving» blir då 384 kr/år för högt per anslutning, åt det håll som överdriver besparingen.
  - Commiten skriver att kunderna «såg» för stor besparing (dåtid) och att ingen cachebump behövs. Det gäller KV-cachen, inte lagrade domar. Bibeln 23 sep: «En fix som inte når de lagrade domarna har inte nått kunden.»
- **Bevis:** `k1b.mjs`: den riktiga `buildSwitchTargets` ger `lastVerified` 2026-10-21 för en lagrad rad med `suggested_annual_cost` 3348. `invoice-history` räknar inte om `suggested_annual_cost` eller `net_saving` (grep ger bara filtret på rad 580). `bredbandSpeedBenchmark(1000).p25` är 3828 på grenen.
- **Motprov:** på main ger `k1.mjs` p25 3348 för 1000 Mbit och `lastVerified` 2026-10-19. En rad från augusti–oktober var då konsistent med «idag».
- **Varför obekräftat:** antalet sådana rader i produktion är inte mätt. Granskarens miljö saknar `DATABASE_URL`.
- **Skrivarens läsning, obekräftad bedömning och inte ett fynd:** avgränsningen säger att «PR:en gör det vanligare» räcker med en mekanism i diffen, även när frekvensen inte är mätt, och att tvekan räknas som vanligare. Kundlinsen namnger en mekanism: grenen flyttar golvet, så rader från 18 aug fram till deploy hamnar i den riktning som överdriver besparingen. På main låg samma mekanism åt andra hållet, för rader från före 18 aug. Bekräftas K-5 bör det därför läsas som gjort vanligare av grenen, och då blockerar det. Konfidens: medel. Grunden är kundlinsens text, inte en körning.
- **Förslag:** mät bredbandsraderna med `should_switch` per `analyserad_at`. Räkna antingen golvet vid läsning för bytesbeskedet (`bredbandSpeedBenchmark` ur den lagrade hastigheten), eller visa radens analysdatum i stället för bokens datum bredvid det frysta talet.

### Öppna frågor ur granskarnas material
- **Standard 500:** om 399 är ett nytt listpris, ett kampanjerbjudande eller en skillnad mellan adresser i öppen fiber (V-1, K-4).
- **Promptens faktatext:** linserna är oense om bredbandsmedianen når den (V-1). Ingen har kört prompten.
- **Tredje varvet:** att det utan T85-1 hade gett MERGAS är vaktlinsens bedömning, uttryckligen obekräftad (V-7).
- **Fortnox-datumet (skrivarens fråga, inte prövad av någon lins):** skrivaren har läst att både `lib/verifiers/fortnox.mjs` (rad 62) och `lib/verifiers/spiris.mjs` (rad 75) deklarerar `bevakadKategori: 'saas-finance'`. V-5 visar att en grön Spiris-körning flyttar `fortnoxVerified.lastVerified`. Om det sker också när Fortnox-vakten är röd har ingen kört. I 39760492315 var alla vakter utom tele2-bredband gröna. Blir svaret ja är det [KUND]: ett «verifierat» datum som inte är talets (bibeln 15 aug, «ordet "verifierat" kräver ett datum»).
- **Oläst:** kundlinsen läste inte körning 39549606765. Ingen lins läste loggarna för de 11 gröna jobben i 39760492315 utöver de sju som står under «Levande bevis».

## Friat

### Kundlinsen
Var och en med mätning och motprov:
- **Tele2-talen.** Jobbloggarna i 39548656562 (05:17) och 39623423878 (15:12) visar max 250 199 → 239, 500 239 → 279, 1200 279 → 319 och 2500 279 → 319 på Götgatan och Sundbyberg. Östersund visar 250, 500 och 1200 men ingen 2500-rad. 12 månaders bindning är bekräftad indirekt: vakten hoppar över produkter med annan bindning (`lib/verifiers/tele2-bredband.mjs` rad 50), så alla drifter gällde 12-månadersprodukter.
- **Fixturpåståendet.** `raknadiff.py` över fixturdiffen i 3c105e28 ger exakt 55 × suggestedAnnual +480, 55 × gross −480, 55 × net −384 och 2 × secondary → null.
- **comb-55 → comb-56 är rent.** `k7.mjs`: 334 fixturer och 0 dubblerade id. Facit bär båda id med rätt innehåll.
- **BI-11** räknar samma formel som `secondary-savings`. Golvflyttar vid 100 Mbit fångas. Tröskeln är K-6.
- **`getBenchmarkBasis` är död.** `k6.mjs` på main-versionen ger null för alla leverantörer när `tierKey` är null. Motprov: `tierKey` e3 ger en formel. Svaret är oförändrat: formula null och samma två källtexter.
- **Migreringen.** `run-migration.mjs` skapar fortfarande `supplier_prices` och `supplier_price_history` (rad 74 och 114), och `setup-price-db.yml` kör `migrate-price-db.mjs`.
- **`priceAlert`** läses av ingen yta och lagras inte (grep, med motprov på `savingRange`). Cachenyckeln bär `deploySha`.
- **msrp-fälten.** `msrpMonthly` är priset vid månadsfakturering och `msrpAnnual` årsåtagandet per månad. Båda är per licens och månad exkl moms, och golvet på månadspriset är den försiktiga riktningen.
- **Nivådetektionen i 2a85733b.** E3 och E5 kräver familj, Office 365 diskvalificeras, och Google Workspace Business Standard läses aldrig som Microsoft (`k8.mjs`).
- **Kundlinsens S4** tog bort `category === 'saas-productivity'` i `arMicrosoftSaas`. Sviten var 2698 av 2698 grön, men beteendet var också oförändrat: bara saas-productivity har `kraverBekraftadNiva`, och `bokfortListpris` har ingen annan anropare. Villkoret är ett redundant skydd, inte ett hål. Se skrivarens anmärkning under «Proveniens».

### Vaktlinsen
- **f20f8d2f.** Sex av sju sabotageriktningar gör det commit-texten säger. Varje riktning fällde exakt ett test mot hela sviten, med 0 avbrutna:
  - S1 «ett vittne räcker»: NV-02.
  - S2 «T2-ankaret bort»: NV-05.
  - S3 «fasta gruppen bort»: NV-03.
  - S4b (`kortterminalChecks` tappar den fasta checken): NV-03.
  - S5 «Bokföring→Integration»: NV-01.
  - S6 «för varje anställd bort»: NV-04.
  - S7 «inkl. moms bort ur Photoshop»: NV-06.

  «7 tester föll» stämmer alltså om «run-utfallet» betyder S4b (se V-2). V85-D1 stämmer: de 8 anropen till `lasEntydigt` har bara obligatoriska grupper.
- **ce103885.** Z1 (gapet passerar nästa kort) fällde NV-09, Z2 (sonden läser bara tecknet före) NV-08 och Z3 (första kortet vinner) NV-09. «3 tester föll» stämmer. `dollarRader` ger samma tal på fixturen som den gamla sondlogiken. T85-4:s borttagna rad gick inte att nå.
- **54266708** säger att den lagar femte blickens fyra [VAKT] och tredje blickens T85-2 och T85-7. Vaktlinsens sabotage mot den:
  - Sa (plattformskortet sorterar själv), Sg (ISO utan `$`), Sh (utan `^`) och F2p (per år ×11) fällde DV-01.
  - F2l (licensspann ×11) gav 2 fail.
  - Sj (loneadmin-literalen `2026-10-9`) fällde BI-12:s literaltest, och B-a (`haller` utan ISO) fällde BI-10.
  - BI-12:s JSON-instrument och vandringen ger båda 32 datum, mot 31 literaler.
  - Sj2 (samma literal med dubbla citattecken) fällde 0. Ingen konsument läser den formen: stampelvakt, `stamplaKategori` och price-audit läser alla enkla citattecken, och körningen skriver över värdet. Friat.
- **BI-11** räknar gross precis som `computeSecondarySaving`.
- **d57040b2.** 8.48, 15.56, 5.78 och 11.16 står ordagrant i 39620847659 (head 14f2124f), och motprovet 7,00 ligger utanför `[456]`.
- **64e1adcc.** «Ungefär 40 priser» var 46 seedrader, och filerna togs bort i fe149a4e.
- **Bibeln:**
  - Regel 2 (fyra linser och en domskrivare, två åt gången, 792 800 och 870 899 tokens, tre fick 0) är avläst i wf_d81e808c-340 och wf_8ca7def9-74e.
  - Regel 9 (32 datum), regel 10 (3 avbrutna, fail 0, exit 1, transkriptet 21 okt 19:39) och regel 11 (d64b3783 skiljer sig på 2 rader från a0cb4b9d) stämmer.
  - Regel 8 stämmer: meningen har två träffar vid 14f2124f.
  - 13, 8 och 3 fynd stämmer. PB85-2 kom med 40fbe478 den 15 aug på main.
  - Grundarcitatet i 22f16281 är ordagrant mot användarmeddelandet 22 okt 05:26. Enda skillnaden är att backticks runt [KUND] fallit bort, vilket är formatering.
- **Levande gröna:** se nästa avsnitt.

### Sabotagen, samlat

| Utfall | Kundlinsen | Vaktlinsen |
|---|---|---|
| fällde | inga | S1, S2, S3, S4b, S5, S6, S7, Z1, Z2, Z3, Sa, Sg, Sh, F2p, F2l, Sj, B-a |
| fällde 0 trots ändrat beteende | S1 (K-6), S3 (K-3) | S4a (V-2) |
| fällde 0, beteendet oförändrat, räknas inte som prövning | S2 (beviset i K-2 att SEK-filtret står bakom ett annat skydd), S4 (friat, redundant villkor) | Sj2 (friat, ingen konsument läser formen) |

Kundlinsen körde 4 sabotage och vaktlinsen 19 (11 i plan1 och 8 i plan2). Skrivaren har inte kört om något av dem.

## Levande bevis: körning 39760492315

Körningen är verify-sources mot grenen, 22 okt 10:06, HEAD 22f16281. Båda linserna läste jobblistan: 18 verifieringsjobb, 17 gröna, tele2-bredband rött och stämpeljobbet överhoppat. Om loggens rader «stämplade kategorin …» lades på main säger granskarna inget om. Det stämpeljobb som lägger på besluten kördes inte.

Per vakt, enligt granskarna:

| Vakt | Utfall | Vad loggen visade |
|---|---|---|
| tele2-bredband | rött | Jobb 119763244601. DRIFT standard 500 Östersund, 455 → 399. Ankarna standard 1000 och max 1200 bekräftade. Inga Max-drifter (V-1, K-4). |
| spiris | grönt | Båda vittnena. «stämplade kategorin saas-finance: 2026-10-19 → 2026-10-22», på fel datumpost (V-5). |
| telia-vaxel | grönt | T2 på kortet «lokalt nummer». |
| kortterminal | grönt | «Stripe Terminal fast avgift per debitering (kr): prisbok 1 kr · live 1 kr». `run()` lägger den fasta checken i utfallet i dag (V-2). |
| fortnox-lon | grönt | 199 + 25. «stämplade kategorin loneadmin: 2026-10-19 → 2026-10-22», på en literal som körningen skriver över (V-5). |
| zoom | grönt | 14,16 och 18,33. |
| google-workspace | grönt | Loggen lästes av vaktlinsen. Inget utfall redovisat utöver jobbets gröna. |
| övriga 11 | gröna | Enligt jobblistan. Loggarna är inte lästa. |

Vaktlinsen säger att kontextutdragen i loggarna för spiris, telia-vaxel, kortterminal, fortnox-lon och zoom visar att talen läses på rätt plats.

Jämförelsekörningar:
- 39623423878 (21 okt 15:12, jobb 119302591663) och 39548656562 (21 okt 05:17): tele2-bredband gav bara Max-drifter.
- probe-saas-render 39620847659 (head 14f2124f): Atlassian 8.48, 15.56, 5.78 och 11.16 (d57040b2), och Zoom-raderna där `dollarRader` svalde 18,33 och 16,50 (V-3).
- Kundlinsen läste dessutom jobbloggarna 119052610177 och 117994056517.

**Det som ska stå i en PR-text:** grenens eget levande bevis är 17 av 18 gröna, med en Standard-drift som grenens commit säger inte finns.

## Proveniens

- **Linserna.** «kundvägen» och «vakterna». Båda arbetade mot HEAD 22f16281 med baslinjen tests 2698, pass 2698, fail 0, cancelled 0. Granskarnas arbete kom till skrivaren som JSON i uppdraget.
  - Kundlinsen: `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-ssot-kundvagen/`. Anteckningar i `notes.md`. Sonderna `k1.mjs`–`k9.mjs`, `k1b.mjs` med `ih-gren.mjs`, `raknadiff.py` och harnesset `sabotage.py`.
  - Vaktlinsen: `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-ssot-vakter/`. Anteckningar i `anteckningar.md`. Sabotageplanerna `plan1.py` och `plan2.py`.
  - Katalogerna ligger utanför repot och försvinner med sessionen. Det som ska citeras senare behöver gå in i `ops/` via en PR.
- **Skrivaren har inte kört om något sabotage och inte kört sviten.** Fynden och utfallen ovan är granskarnas.
- **Skrivarens egna avläsningar, 22 okt:**
  - `git rev-parse HEAD` i `vakter-framat` gav 22f16281b5832bd2169ab01f5b9899681f74841f. `git merge-base HEAD origin/main` gav 25682b28, som är `origin/main`:s topp. `git status --porcelain` var tomt före skrivningen.
  - `git show --stat` per commit: 3aa18c40 och 22f16281 ändrar bara `CLAUDE.md`. 54266708 ändrar `CLAUDE.md`, `tests/branchindex.mjs` och `tests/domain-intel.mjs`. De sju andra ändrar var och en minst en fil i `lib/`, `api/` eller `agents/`.
  - `agents/recommender/branchindex.js` rad 226 (Standard-raden med 500: 455) och rad 231 (Max-alternativet med 279). `api/invoice-history.mjs` rad 576 (`buildSwitchTargets`). `src/pages/Portfolio/index.js` rad 1644. `CLAUDE.md` rad 305–308 (avgränsningens motivering).
  - `lib/verifiers/fortnox.mjs` rad 62 och `lib/verifiers/spiris.mjs` rad 75 deklarerar båda `bevakadKategori: 'saas-finance'`.
  - **Anmärkning, inte ett fynd från linserna och inte räknat:** `lib/price-alert.js` rad 27–28 (`arMicrosoftSaas`) säger inte att kategorivillkoret saknar egen tand, som kundlinsens S4 visade. Bibeln 10 sep vill att en sådan rad står utskriven i modulen.
- **Grinden på den här filen.** `scratchpad/grind-ssot/grind.mjs` (fullständig sökväg: `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/grind-ssot/grind.mjs`) körde `lasGranskning` och `andraBlicken` ur `lib/granskningsgrind.js` vid 22f16281. Indata: bas 25682b28, grenens 10 commits, 29 ändrade filer (11 mekanikfiler) och de 16 `ops/GRANSKNING-*.md` som fanns före skrivningen. Huvudet prövades före skrivningen, eftersom filen inte rörs efteråt. `lasGranskning` läser huvudet som de åtta commits och BLOCKERAR.

  | Prov | Granskningar | Utfall |
  |---|---|---|
  | A: med den här filens huvud | 16 + denna | ok=false: «senaste domen är BLOCKERAR — bara «dom: MERGAS» släpper mekanik till main» |
  | B: motprov, samma huvud med `dom: MERGAS` | 16 + denna | ok=true: «11 mekanikfil(er) täckta av ops/GRANSKNING-ssot-tele2.md (commit 22f1628)» |
  | C: motprov utan den här filen | 16 | ok=false: «11 mekanikfil(er) utan granskning» |

  Grinden kan alltså svara båda hållen på samma huvud, och den här filen är den som gäller för grenen.
- **Hårda mellanslag** räknas med en byte-räkning efter skrivningen (bibelns regel 7). Utfallet står i överlämningen, inte här, eftersom filen inte rörs efteråt.
