commits: accc1dff
dom: MERGAS

# Femte blicken: prisboken och vakterna (PR #85)

PR #85 är `claude/fable-5-resume-i60dmd` mot `main`, med bas 15c94d4a. Fjärde blicken (`ops/GRANSKNING-prisboken-vakterna-fjarde.md`) gav BLOCKERAR för 8467304f, med G85-1 som [KUND]. Den här granskningen gäller lagningen, accc1dff, som är PR:ens topp. Den lagar G85-1 ([KUND]) och säger att den lagar G85-2 och G85-3 ([VAKT]).

Granskaren prövade HEAD accc1dff4eff3238ef50fa9410b8398f3f1251a9, avläst med `rev-parse` före och efter. Granskaren rapporterar tomt `git status --porcelain` efter varje sabotageomgång och vid slutet. Den pushade inte, committade inte, startade inget arbetsflöde, använde inga Vercel-verktyg och körde inte stress-testet.

Filen är skriven av en agent som varken byggt eller granskat. Den återger granskarens fynd och utfall och har inte kört om sabotagen. Det skrivaren själv mätte står under «Täckning».

## Domen

**MERGAS.** Inget bekräftat [KUND]-fynd, varken infört i PR:en eller förexisterande.
- 4 fynd, alla [VAKT]. Alla 4 är bekräftade, med bevis och motprov.
- G85-1 är lagat i det läge produktionen kan hamna i. Granskaren fann inget läge där dagens bok, eller en bok som BI-12 släpper igenom, ger fel datum på något av dörrkorten (se «Friat»).
- F85-1, F85-3 och F85-4 kom med accc1dff. F85-2 är förexisterande: luckan står på main (15c94d4a).
- 0 obekräftade fynd.
- [VAKT] blockerar inte enligt stoppregeln (9 sep). Fynden mergas och lagas framåt.

**Fyra påståenden i accc1dff går längre än testerna.** Det ska stå här utan att mjukas upp:
- Syskonfallet «båda korten med ett icke-ISO-datum». Bara licensspannkortet körs med ett icke-ISO-datum. Plattformskortet gör det aldrig (F85-1).
- «DV-01 kräver nu att båda korten visar samma spann». DV-01 kräver kronorna per användare och månad. Kronorna per anställd och år på plattformskortet prövas inte (F85-2).
- BI-12:s «32 datum i boken». Spärren kräver 30. De två datum som en trasig vandring tappar är tele2-datumet och Fortnox Lön-datumet (F85-3).
- Kommentaren om «strikta ISO-datum». Regexens ankare har ingen egen tand, och modulen säger det inte (F85-4).

Inget av de fyra ändrar en mening som en kund läser i dag. Alla fyra gör en vakt svagare än den låter.

**Ett mönster, ett varv till.** accc1dff är lagningen av G85-1, och tre av fyra fynd sitter i den. Fjärde blicken fann G85-1 i 8467304f:s lagning. Tredje blicken fann ett nytt fynd i var och en av de fyra lagningarna före. Det är bibelns 24 sep: «varje granskningsvarv hittade fel i det FÖRRA varvets lagning». Skillnaden den här gången är klassen. Fynden sitter i beviset, inte i beteendet.

**Vad som släpper grinden.** Grinden läser den senaste domen bland granskningarna som namnger en commit i PR:en. Med den här filen är den senaste domen MERGAS för accc1dff, och prov A under «Täckning» ger ok=true. Det håller bara så länge ingen mekanikfil (`lib/`, `api/`, `agents/`) ändras efter accc1dff (`lib/granskningsgrind.js`, rad 16–22). Förslagen till F85-1, F85-2 och F85-3 rör bara `tests/`. Det första förslaget till F85-4 gör det också. Det andra, en rad i modulkommentaren i `lib/business-intel.js`, rör en mekanikfil. Läggs det i PR:en krävs en ny granskning som namnger den commiten. Bibelns regel 5 (18–20 okt) säger att sådant arbete hör till en egen gren. Merge till `main` är grundarens beslut.

## Bekräftade [KUND]-fynd

Inga.

## Bekräftade [VAKT]-fynd: lagas framåt enligt stoppregeln

Baslinjen var `node --test tests/run.mjs` på accc1dff: tests 2690, pass 2690, fail 0, cancelled 0. Varje sabotage skrevs med `assert old in s` och exakt en förekomst. Granskaren kontrollerade att old och new skilde sig, prövade ändrat beteende med en sond under sabotaget och återställde ur sparad sträng i `finally`, med läskontroll. Varje rad «fail» och «cancelled» är räknad.

### F85-1: plattformskortets text körs aldrig med ett icke-ISO-datum
- **Fil:** `tests/domain-intel.mjs` (DV-01). Kortets datum räknas på `lib/domain-intel.js:380` och meningen står på rad 386.
- **Commit:** accc1dff. Inte förexisterande.
- **Påstående:**
  - Commit-texten säger «Syskonfall: båda korten med ett icke-ISO-datum».
  - DV-01 kör ett icke-ISO-datum, `'2026-10-9'`, bara mot `m365Verifierat` direkt (rad 570) och mot licensspannkortet (rad 578).
  - Plattformskortets egen text körs aldrig med ett icke-ISO-datum.
  - Räknar plattformskortet sitt datum själv utan ISO-kravet, som före 8467304f, är sviten grön. Då är G85-1 tillbaka på det kortet.
- **Bevis:**
  - Sabotaget Sa ersatte `const verifierat = m365Verifierat(m365Tiers());` med en egen uträkning utan ISO-krav (`d.some((x) => !x)` och `[...d].sort()[0]`). Mot hela sviten: tests 2690, pass 2690, fail 0, cancelled 0.
  - Beteendet ändrades. Sonden `korten.mjs` satte `business-premium` = `'2026-10-9'` i den levande boken. Plattformskortet sa då «nivåspannet: Microsofts publika listpriser, verifierade 2026-10-19». Utan sabotaget säger det «nivåspannet: Microsofts publika listpriser», utan datum.
- **Motprov:** Sa2 är samma sabotage på licensspannkortet (`const datum = m365Verifierat(tierBenchmarks);` byttes mot samma egna uträkning). Det fällde DV-01. Testet ser alltså formen på det ena kortet men inte på det andra.
- **Varför [VAKT]:** läget når ingen kund. SaS4a är Sa plus `business-premium` = `'2026-10-9'` i `agents/recommender/branchindex.js`. Det fällde 3 tester: BI-12, business-intel «källan namnger BÅDA leden» och DV-01. Boken kan alltså inte bära formen utan att sviten blir röd.
- **Förslag:**
  - Lägg `T['business-premium'].lastVerified = '2026-10-9'` i DV-01:s `try`-block. Kräv att `plattform()` slutar på «Microsofts publika listpriser» utan «verifierade», och återställ värdet i `finally`. Det är fjärde blickens förslag «på BÅDA kortens `source`».
  - Alternativt: rätta syskonfallet i commit-texten så att det bara gäller licensspannkortet.

### F85-2: plattformskortets kronor per anställd och år prövas inte, så G85-2 är halvt lagad
- **Fil:** `lib/domain-intel.js`, `m365Nivabrygga`: `perAr` på rad 363 och meningen på rad 366. Testet är DV-01, rad 581–589.
- **Commit:** luckan finns på main 15c94d4a (samma rad står där som rad 360), alltså förexisterande. Påståendet «DV-01 kräver nu att båda korten visar samma spann» kom i accc1dff.
- **Påstående:**
  - Fjärde blicken namngav nivåbryggans «66,91–641,18 … 6 891 kr» som oprövad.
  - DV-01 kräver nu bara delen «spänner X–Y kr per användare och månad».
  - Beloppet «6 891 kr per anställd och år mellan lägsta och högsta nivå» står i plattformskortet och når kunden. Inget test prövar det.
- **Bevis:**
  - Sabotaget Sg ändrade `const perAr = Math.round((hogst - lagst) * 12)` till `* 10`. Mot hela sviten: tests 2690, pass 2690, fail 0, cancelled 0.
  - Beteendet ändrades på den levande boken. Plattformskortets `detail` sa «5 743 kr per anställd och år» i stället för «6 891». Licensspannkortet bredvid säger fortfarande 6 891, så korten säger emot varandra.
  - `git show 15c94d4a:lib/domain-intel.js` har samma rad.
- **Motprov:** Sg2 är samma sabotage på licensspannkortet (`const perAnstalldAr = Math.round((hogst - lagst) * 12)` till `* 10` i `lib/business-intel.js`). Det fällde business-intel «talet går att räkna hem ur källan». Sviten ser alltså talet per anställd och år på det ena kortet men inte på det andra.
- **Varför [VAKT]:** talet är rätt i dag. Båda korten säger 6 891 (granskarens sond utan sabotage, och skrivarens avläsning under «Täckning»). Felet sitter i beviset.
- **Förslag:** bygg `spannText` i DV-01 så att den också bär `` `${Math.round((max-min)*12).toLocaleString('sv-SE')} kr per anställd och år` ``, och kräv den i `kort().detail`. Alternativt: jämför hela bryggmeningen med licensspannkortets tal.

### F85-3: BI-12:s tomhetsspärr släpper en vandring som tappat två datum
- **Fil:** `tests/branchindex.mjs`, BI-12: kommentaren på rad 263 och `datum.length >= 30` på rad 275.
- **Commit:** accc1dff. Inte förexisterande.
- **Påstående:**
  - Kommentaren säger «Mätt 21 okt: 32 datum i boken». Spärren kräver bara `datum.length >= 30`.
  - En vandring som tappar två datum är alltså grön.
  - Slutar vandringen efter första `lastVerified` i varje objekt tappar den precis `BRANCHINDEX.bredband.tele2Verified` och `BRANCHINDEX.loneadmin.fortnoxLonVerified`. Då är BI-12 blind för tele2-datumets form.
- **Bevis:**
  - `vandring.mjs` kör BI-12:s vandring ordagrant och ger 32. Varianten som slutar efter första `lastVerified` i varje objekt ger 30 och tappar de två.
  - Sabotaget Sb gjorde den ändringen i testet (`{ datum.push([vag, x]); return; }`). Mot hela sviten: tests 2690, pass 2690, fail 0, cancelled 0.
  - Sb2 är Sb plus att tele2-datumet ändrades från `'2026-08-18'` till `'2026-8-18'`. Mot hela sviten: tests 2690, pass 2690, fail 0, cancelled 0.
- **Motprov:** Sb3 har samma tele2-datum men ingen ändring i vandringen. Det fällde BI-12 (riktat: 461 av 462). Vandringen ser alltså datumet, men spärren märker inte när vandringen slutar se det.
- **Varför [VAKT]:** granskarens grep visar att tele2-datumet inte strängjämförs någonstans. Det läses bara in i en note-sträng i `bredbandSpeedBenchmark` (`branchindex.js:1332`). Ingen kundsiffra ändras.
- **Förslag:**
  - Pinna det exakta talet, 32, i stället för ≥30. Bibeln säger att trösklar är luft (8 sep).
  - Alternativt kan BI-12 dessutom pröva källtextens literaler (`lastVerified: '…'` i `branchindex.js`, 31 stycken enligt grep). Det täcker också loneadmin-literalen. `tillampaCellHarledning` skriver över den i körningen, så BI-12 ser den aldrig. Granskarens Sj satte den till `'2026-10-9'`: 0 fällda, men beteendet var oförändrat, så Sj räknas inte.

### F85-4: ISO-regexens ankare har ingen egen tand
- **Fil:** `lib/business-intel.js`: kommentaren på rad 295–297 och `ISO_DATUM` på rad 298.
- **Commit:** accc1dff. Inte förexisterande.
- **Påstående:**
  - Kommentaren säger «Bara strikta ISO-datum (ÅÅÅÅ-MM-DD) … Ett sådant datum räknas som okänt … (DV-01, BI-12)».
  - DV-01:s enda icke-ISO-fall, `'2026-10-9'`, avvisas också av ett regex utan ankare.
  - Ankarna står alltså bakom ett annat skydd, och modulen säger det inte. Det är bibelns 10 sep: ett skydd bakom ett annat skydd är inte två lager, det är ett.
- **Bevis:** sabotaget Sh ändrade `const ISO_DATUM = /^\d{4}-\d{2}-\d{2}$/;` till `/\d{4}-\d{2}-\d{2}/`. Mot hela sviten: tests 2690, pass 2690, fail 0, cancelled 0. Beteendet ändrades för syntetisk indata:
  - `m365Verifierat` med `e3` = `'2026-10-09T00:00:00Z'` gav `'2026-10-09T00:00:00Z'`.
  - Med `' 2026-10-09'` gav den `' 2026-10-09'`.
  - Utan sabotaget gav båda null.
- **Motprov:** bokläget fångas.
  - ShSk är Sh plus `business-basic` = `'2026-10-09T00:00:00Z'` i boken. Det fällde BI-12 och DV-01.
  - Sk är samma bokdatum utan Sh. Det fällde BI-12, business-intel och DV-01.
- **Varför [VAKT], och lågt:** ingen produktionsväg når felet. Enligt granskarens grep skickar de enda anroparna i produktion BRANCHINDEX (`domain-intel.js` rad 380, 635 och 705), och BI-12 håller boken.
- **Förslag:** lägg `assert.equal(m365Verifierat(med({ e3: '2026-10-09T00:00:00Z' })), null)` i DV-01. Annars kan modulkommentaren skriva ut att formkravet i praktiken bärs av BI-12.

## Obekräftade fynd

Inga. Alla fyra fynd bär bevis och motprov.

Granskarens material säger inget om tredje blickens övriga [VAKT] (T85-2, T85-3, T85-4, T85-5, T85-7 och T85-8) eller om V85-D1, som andra blicken lämnade obekräftat. accc1dff ändrar inga filer bakom T85-2, T85-3, T85-4, T85-5 eller T85-8. Commiten ändrar `tests/branchindex.mjs`, där T85-7 sitter («ISO-halvan av datumkravet i BI-10 saknar tand»). Diffen är en enda hunk som lägger till BI-12 efter BI-10 och lämnar BI-10 orörd (se «Täckning»). BI-12 prövar ISO-formen på varje `lastVerified`. Om det ger T85-7 tand är inte prövat här.

## Friat

Allt gäller HEAD accc1dff och baslinjen tests 2690, pass 2690, fail 0, cancelled 0.

### Kan datumet fortfarande bli fel eller null?
- Den levande boken har fem Microsoft-nivåer i SEK, alla 2026-10-19. Båda korten säger «verifierade 2026-10-19» (`korten.mjs`).
- `e3` = `'2026-10-9'` ger null, och licensspannkortet säger «Microsofts publika listpriser × …».
- `'2026-10-09T00:00:00Z'`, `' 2026-10-09'` och ett Date-objekt ger null.
- `m365Verifierat` prövar bara formen. `'2026-02-30'` går igenom och skrivs ut, och `'2026-13-45'` gömmer sig bakom 2026-10-19. BI-12:s kalenderled fäller båda i boken:
  - Sd (`e3` = `'2026-02-30'`) fällde BI-12.
  - V8 rullar 02-30 till 2026-03-02, så likheten fäller. 13-45 ger Invalid Date, och då fäller RangeError.
- Kalenderledet bär ensamt för de nivåer som inte är `e3`. Scal (kalenderraden bort plus `e3` = `'2026-02-30'`) fällde 0 riktat och bara RD-11 mot hela sviten. RD-11 är `e3`-bieffekten via `saas-rad`. Kalenderledet har alltså tand (Sd), men det är ett skydd, inte två.
- Enligt granskarens grep skickar de enda anroparna i produktion BRANCHINDEX: `domain-intel.js` rad 380, 635 och 705.
- Tidszon:
  - `m365Verifierat` tolkar inga datum.
  - Stämpeln skriver UTC-ISO (`scripts/verify.mjs:17`, `verifieringsstampel.js`).
  - BI-12 och DV-01 var gröna under `TZ=Pacific/Kiritimati` och `TZ=Pacific/Honolulu`.
  - Motprov: utan `Z` ger BI-12:s uttryck 2026-10-18 under Kiritimati. `Z` är alltså lastbärande, och det står där.
- Null: Sn1 (`business-standard` null) fångas av DV-01 och business-intel. Utan den spärren hade `getBenchmark` för saas-productivity sagt 2026-08-31, alltså Googles datum via `aldstaTierDatum`. BI-12 släpper null med avsikt. Snull (spiris null) fällde 0, och spiris-datumet läses inte av någon kundyta (grep).

### Datum som jämförs som strängar på andra ställen
- `jamforelsensKalla` (`lib/jamforelsekalla.js:135–144`, LFL-källans «verifierat X») har G85-1:s form, och den är förexisterande. `syskon.mjs`: premium `'2026-10-9'` med `e3` 2026-10-19 ger `lastVerified` 2026-10-19 och `listprisanspraak` true. Motprovet `'2026-10-09'` ger 2026-10-09.
- `aldstaTierDatum` filtrerar bort icke-ISO och tar det stalaste av resten.
- Båda läser bara BRANCHINDEX, och BI-12 håller nu boken. S4a, S4b, S4c och Sk fällde BI-12. Det är BI-12 ensamt som håller formen borta från `jamforelsensKalla`.
- BI-10 kräver ISO själv. Stämpelvakten kräver `giltigtDatum`.
- `pricing.js:96` är död, eftersom `ECB_USD_URL` = null.
- `villkorsvakt.js:156` strängjämför datum, men villkorsvakttestet kräver `forsegladDatum === verifierad`. Det är läst, inte kört.

### BI-12
- 32 `lastVerified`, 0 null, alla ISO (`bok.mjs`). Commitens «32 datum» stämmer.
- Svagheten är tomhetsspärren (F85-3).

### Commitens sabotage, vart och ett mot hela sviten
- S1 (ISO-kravet bort): DV-01, 2689 av 2690.
- S2 (nivåbryggan, filtret `< 600`): DV-01.
- S3 (plattformskortet säger datum även utan): DV-01.
- S4c (google-plus `'2026-8-31'`): BI-12, 2689 av 2690.
- Commitens «4 tester föll» är alltså återskapat. Med andra datum blir antalet ett annat: spiris gav 2 (BI-12 och spiris-testet), premium gav 3 riktat.
- DV-01 prövar kortens egen text (`source` och `detail`).
- G85-3 har fått tand (S3).

### Fjärde blickens E7
E7 lät licensspannet läsa ett eget urval utan SEK-villkoret. Det fäller fortfarande 0 mot hela sviten, och ändringen syns bara på syntetisk indata. I det läge produktionen kan hamna i, en USD-nivå med `msrpAnnual` i boken, fällde E7c 2 tester (DV-01 och business-intel), och E7d (bryggan med eget urval) fällde DV-01. Motprovet, samma bok utan sabotage, fällde 0. G85-2:s urvalshalva är därmed lagad för produktionen. Halvan om talet per anställd och år är det inte (F85-2).

### Rester i arbetsmappen
Där låg filer från ett tidigare, dött försök (`spec/`, `js/`, `resultat_C1_*`, 21 okt 22:14–22:21). Granskaren använde dem bara som prövlista. Varje mätning ovan är omkörd i granskarens session.

### Sabotagen, samlat

| Utfall | Sabotage |
|---|---|
| fällde | S1, S2, S3, S4a, S4b, S4c, Sb3, Sd, Si, Sa2, Sg2, E7c, E7d, SaS4a, Sn1, Sk, ShSk, Scal (hela sviten: RD-11) |
| fällde 0 mot hela sviten trots ändrat beteende | Sa (F85-1), Sg (F85-2), Sb och Sb2 (F85-3), Sh (F85-4), E7 (friat: E7c och E7d fäller i produktionsläget) |
| no-op i beteendet, räknas inte | E7b (identiskt på den levande boken), Sj (loneadmin-literalen skrivs över i körningen), Snull (spiris-datumet läses inte av någon kundyta), M_usd_msrp_i_boken_ensam (motprov, korrekt kod) |

## Täckning

Mätt av skrivaren 22 okt:
- **PR #85:s huvud:** `gh api repos/Arvo-flow/arvo-flow.github.io/pulls/85` gav följande:
  - head `claude/fable-5-resume-i60dmd`, sha accc1dff4eff3238ef50fa9410b8398f3f1251a9
  - base `main`, bas-sha 15c94d4a493479fc8149a8f5a2b8bac095c84f0c
  - 16 commits, 34 ändrade filer, open

  Den lokala grenen `prisboken-vakterna` står på samma sha (`git rev-parse HEAD`). `git merge-base HEAD origin/main` är 15c94d4a. `git status --porcelain` var tomt före skrivningen.
- **accc1dff** (`git show --stat`) ändrar `lib/business-intel.js` (7 rader), `tests/branchindex.mjs` (24) och `tests/domain-intel.mjs` (20). Den ändrar inte `lib/domain-intel.js`. Föräldern är 12040a82, som lägger till fjärde blickens granskningsfil. Diffen i `tests/branchindex.mjs` är en hunk, `@@ -257,6 +257,30 @@`, med BI-10 som sammanhang.
- **Radhänvisningarna** (läst i arbetsträdet på accc1dff):
  - `lib/business-intel.js`: kommentaren på 295–297, `ISO_DATUM` på 298, `m365Verifierat` på 300, ISO-kravet på 302 och `perAnstalldAr` på 315.
  - `lib/domain-intel.js`: `m365Nivabrygga` på 358, `perAr` på 363, meningen per anställd och år på 366, `M365_NIVABRYGGA` på 368, `const verifierat = m365Verifierat(m365Tiers());` på 380 och plattformskortets datummening på 386. På 15c94d4a står `perAr` på rad 360.
  - `tests/branchindex.mjs`: BI-12:s kommentar «32 datum» på 263, `describe` på 264 och `datum.length >= 30` på 275.
  - `tests/domain-intel.mjs`: DV-01 börjar på 541. Icke-ISO-fallen står på 570 och 578, `spannText` på 583, licensspannkortets spannkrav på 584 och nivåbryggans spannkrav på 589.
- **Literalerna:** `grep -cE "lastVerified:\s*'"` på `agents/recommender/branchindex.js` ger 31, samma som granskarens tal. Med exakt ett mellanslag (`lastVerified: '`) blir det 30. Rad 848 har flera mellanslag före värdet. Instrumentet kan alltså ge två olika svar, och 31 är det med `\s*`.
- **Dörrkorten i dag** (`grind85-femte/kort.mjs`, dagens bok, inga ändringar):
  - `m365Nivaer`: fem nivåer, alla 2026-10-19. `m365Verifierat` ger 2026-10-19.
  - Plattformskortets `detail`: «… spänner 66,91–641,18 kr per användare och månad — 6 891 kr per anställd och år mellan lägsta och högsta nivå …». Dess `source` slutar på «Microsofts publika listpriser, verifierade 2026-10-19».
  - Licensspannkortets `title`: «137 820 kr/år skiljer billigaste från dyraste licensnivå — för era 20 anställda». `detail` säger 6 891 kr per anställd och år. `source` säger «Microsofts publika listpriser, verifierade 2026-10-19 × ert anställdatal ur bokslutet».
  - Räknat för hand: (641,18 − 66,91) × 12 = 6 891,24, alltså 6 891. Med × 10 blir det 5 742,70, alltså 5 743, som i granskarens Sg.
- **Granskarens baslinje:** `baslinje.txt` i granskarens katalog säger «# tests 2690», «# pass 2690», «# fail 0» och «# cancelled 0».
- **Grinden på den här filen:** `andraBlicken` och `lasGranskning` ur `lib/granskningsgrind.js` vid accc1dff kördes med bas 15c94d4a, PR:ens 16 commits, 34 ändrade filer och de 15 `ops/GRANSKNING-*.md` som finns vid accc1dff. Huvudet prövades före skrivningen, eftersom filen inte rörs efteråt. Det som prövades var de två huvudraderna ensamma, som är det grinden läser. Skriptet är `grind85-femte/grind.mjs` i skrivarens scratchpad. `lasGranskning` läser huvudet som `["accc1dff"]` och `MERGAS`.

  | Prov | Granskningar | Utfall |
  |---|---|---|
  | A: med den här filen | 15 + denna | ok=true: «11 mekanikfil(er) täckta av ops/GRANSKNING-prisboken-vakterna-femte.md (commit accc1df)» |
  | B: motprov, samma huvud med `dom: BLOCKERAR` | 15 + denna | ok=false: «senaste domen är BLOCKERAR — bara «dom: MERGAS» släpper mekanik till main» |
  | C: motprov utan den här filen | 15 | ok=false: fjärde blickens fil, «senaste domen är BLOCKERAR» |

  Grinden kan alltså svara båda hållen på samma huvud. Utan den här filen hade fjärde blickens BLOCKERAR fortsatt att gälla. Proven kördes med PR:en som den står på accc1dff. Commiten som lägger till den här filen ändrar bara `ops/`. Grindens kommentar (rad 21–22) säger att tester, ops och docs efter domen släpps. Det är läst, inte kört för den commiten.

## Proveniens

- Granskaren arbetade mot HEAD accc1dff4eff3238ef50fa9410b8398f3f1251a9.
- Granskarens anteckningar och skript ligger under `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning85-femte/`.
  - `anteckningar.md` har mätningarna M0–M28.
  - Sonderna är `bok.mjs`, `bok2.mjs`, `vandring.mjs`, `korten.mjs` och `syskon.mjs`. Harnesset är `sabotage.py`.
  - Utfallen är `baslinje.txt`, `sab-full-*.json` och `sab-targeted-*.json`.
- Skrivarens egna prov ligger i samma scratchpad, under `grind85-femte/` (`grind.mjs`, `kort.mjs`).
- Katalogerna ligger utanför repot och försvinner med sessionen. Det som ska citeras senare behöver gå in i `ops/` via en PR.
- Skrivaren räknar hårda mellanslag med en byte-räkning efter skrivningen (bibelns regel 7). Utfallet står i överlämningen, inte här, eftersom filen inte rörs efteråt.
