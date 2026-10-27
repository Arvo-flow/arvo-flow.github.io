commits: 2ac67b6e
dom: BLOCKERAR

# Andra blicken på T-2: licenspriset per nivårad (2ac67b6e)

Granskningen gäller exakt en commit, 2ac67b6e, på `claude/fable-5-resume-i60dmd`. Basen är `origin/main` 793810d3. Granskaren har inte byggt koden. Uppdraget var att hitta var det gröna är osant.

Worktree med detached HEAD på 2ac67b6e. Baslinjen `node --test tests/run.mjs` gav tests 2711, pass 2711, fail 0, cancelled 0. Inget committades, pushades eller startades. Inga webb-, Vercel- eller GitHub-verktyg användes. Alla skript ligger i granskningens scratch-katalog (se «Proveniens»).

## Domen

**BLOCKERAR.** T2-1 är ett [KUND]-fynd som 2ac67b6e inför. Det räcker ensamt.

- 6 fynd: 2 [KUND] (T2-1, T2-2) och 4 [VAKT] (T2-3 till T2-6).
- Alla sex är införda av 2ac67b6e. Under T2-3 ligger F4-2, ett förexisterande [KUND] som inte blivit vanligare.
- T2-1: commiten höjer taket per plats för Microsoft (765,70 → 769,42) och Adobe (908,70 → 1 083,50). Fel som main skickade till granskning prissätts nu, med en årskostnad som är tre till tolv gånger för hög på den fellästa raden. Det är F4-1:s form (fjärde blicken, BLOCKERAR), och regel 13 säger uttryckligen: «behåll mains beteende tills prövningen sker på rätt nivå». För Adobe finns ingen prövning per rad alls.
- T2-2 vilar inte domen. Mekanismen är avläst, men formen finns inte bland repots testfakturor.

**Det som håller.** Radprövningen är rätt drag och bär det mesta av sitt löfte:
- LT-06:s referens är mains riktiga modul: 0 skillnader i 5 803 306 anrop.
- LT-06:s tal stämmer: 1 986 fall, main 1 266 rätt, HEAD 1 460, försämrat 0, bättre 194.
- Commitens elva sabotage fällde 16 tester, med 0 cancelled.
- Produktionens objekt når prövningen i rätt form: aggregerad rad, öret i camelCase, USD omräknat.
- Alla nio testfakturor i `test-pdfs/` med nivårader ger samma utfall som på main (prissätts).
- De borttagna exporterna i `lib/price-db.js` har inga anropare.

**Lagningen som mättes.** Behåll mains tak per plats (765,70 · 908,70 · 468). Hoppa över prövning 2 bara när varje löpande licensrad med läsbart pris är en prövad nivårad. Det ger:
- E5 till listpris på månadsfakturering prissätts.
- 0 fall där main hade rätt och lagningen fel, både i LT-06:s rutnät och i svepet utanför det (`alt.mjs`).
- Kostnad, mätt i LT-06:s rutnät: 1 447 rätt mot HEAD:s 1 460. 15 korrekta fakturor går till granskning som på main: 11 i Microsofts fönster 765,71–769,42 (till exempel E3 med 15 % påslag och Copilot, 766,09) och 4 Adobe all-apps (985 och 1 083,50). Båda grupperna är förexisterande och ska loggas.

## Fynd

### T2-1 · [KUND] · infört: höjda tak per plats prissätter fel som main fångade

- **Fil:** `lib/supplier-price-intel.js`, `TAK_PER_PLATS` (microsoft = bokens högsta, 769,42; adobe = 1,10 × 985 = 1 083,50).
- **Påstående:** en faktura med mains exakta namn och ett pris per plats i 765,71–769,42 (Microsoft) eller 908,71–1 083,50 (Adobe) gick till granskning på main. Nu prissätts den, om ingen nivårad slår till. I fönstren finns fel med den form commiten själv räknar som fel: en rad läst som kvartals- eller årssumma.
- **Bevis:**
  - `diff.mjs` A: Office 365 E3 som kvartalssumma läst som månad, 3 × 256,34 = 769,02, «Microsoft». main GRANSKNING, HEAD prissätts. Priset 256,34 står i prisbokens kommentar (`agents/recommender/branchindex.js` rad 497). `radensNiva('Office 365 E3')` är null, så ingen radprövning tar fallet.
  - `nedstroms.mjs`: samma faktura ger LFL utan nivårader och årskostnaden 92 282 kr. Verklig kostnad är 30 761 kr. Fakturavyn skriver ut `extracted.annualCost` per år (`src/pages/TestaFaktura/index.js` rad 1474).
  - `fonster2.mjs` (två licensrader, en felläst, platser = största licensradens antal som i `applyDeterministicRules`): 38 Microsoft-fall och 51 Adobe-fall där main ger granskning och HEAD prissätter. Exempel:
    - Business Basic 5 × 80,29 + Teams Phone 3 × 95,60 läst som årssumma → 768,61. Årskostnad 46 117 kr mot verkliga 8 259 kr.
    - Creative Cloud all-apps 15 × 985 + single-app 1 × 381 läst som kvartalssumma → 1 061,20.
    - Creative Cloud all-apps 1 × 985 + Acrobat Pro 5 × 273 läst som kvartalssumma → 1 016,00. Årskostnad 60 960 kr mot verkliga 28 200 kr.
  - Adobe-fakturor blandar produkter i repots korpus: `test-pdfs/adobe-creative-cloud-ars.pdf` bär All Apps och Adobe Sign (`textlager.mjs`).
- **Varför LT-06 inte ser det:** rutnätet ger alla rader samma antal (10), har bara Adobe-fakturor med en produkt, och saknar produkter utanför boken. Commitens «noll fall där main hade rätt och den nya fel» gäller rutnätet och är sann där. Utanför rutnätet gäller den inte.
- **Motprov:**
  - Samma svep mot lagningen ovan ger 0 fall (`alt.mjs`). Instrumentet kan alltså svara noll.
  - O365 E3 till listpris (256,34) prissätts av båda (`diff.mjs` A).
  - E5 769,42 prissätts av HEAD och granskas av main. Det är just förbättringen commiten avsåg.
- **Avvägningen, öppet:** samma svep ger 3 669 Microsoft-fall där HEAD har rätt och main fel (Adobe: 0). Stoppregeln väger inte netto. F4-1 blockerade på samma form, och regel 13 skrevs för den.
- **Förslag:** lagningen under «Domen». Logga Adobe 985 och E3 + Copilot med påslag (766,09) som förexisterande.

### T2-2 · [KUND] · infört, räckvidd ej mätt: à-priset prövas före belopp ÷ antal

- **Fil:** `lib/supplier-price-intel.js`, `radensPrisPerManad`.
- **Påstående:** prövningen läser `unitPriceOre`, sedan `unitPrice`, och först sist belopp ÷ antal. Den prövar inte att à-pris × antal stämmer med beloppet. Kundens tal byggs på beloppet: LFL:s run-rate (`recommend.js` rad 681–689) och `annualCost`. Om à-pris och belopp avser olika period går en korrekt läst faktura till granskning, fast main prissatte den med rätt tal.
- **Bevis:**
  - `diff.mjs` C: Business Standard 10 st, à-pris 1 605,84 per år, belopp 1 338,20 per månad, period monthly. main prissätts och HEAD GRANSKNING, för Dustin AB, «Microsoft» och «Microsoft Ireland Operations Ltd».
  - `nedstroms.mjs`: LFL på samma rad ger 133,84 kr per licens mot listpris 133,82, alltså rätt tal på main.
- **Motprov:** à-pris 134 och belopp 1 338 prissätts av båda (`diff.mjs` C).
- **Räckvidd:** inte mätt. Repots testfakturor i `test-pdfs/` har nio PDF:er med nivårader (åtta unika texter: `microsoft.pdf` och `microsoft-new.pdf` är lika). Alla elva nivårader utanför prorata har à-pris × antal = belopp. På prorata-raderna är à-priset fullt månadspris, och det prövas åt det säkra hållet (`textlager.mjs`, `korpus.mjs`). Balanskravet B2 står i skugga, så formen stoppas inte uppströms.
- **Samma mekanism stoppar falska fynd som main släppte.** Windows 365 «kräver Microsoft 365 E3» à 1 700 och ett MSP-paket «Business Premium inkl. drift» à 695 läses som nivårader. Main lät LFL påstå 76 994 respektive 116 330 kr i besparing (`nedstroms.mjs`). HEAD skickar dem till granskning. Det är en förbättring och ska stå kvar.
- **Förslag:** pröva belopp ÷ antal, alltså talet kunden ser, och använd à-priset bara när antal saknas. Det stänger också T2-5:s andra lucka.

### T2-3 · [VAKT] · infört: F4-2 står som lagat, men F4-2:s egen radtext prövas inte

- **Fil:** `ops/ARBETSORDER-VAG1.md` rad 50–51, commit-texten («Basic EES (F4-2)») och LT-05.
- **Påstående:** arbetsordern skriver «F4-2 (Basic EES-årssumma) går till granskning när nivån står i radtexten». F4-2:s radtext i fjärde granskningen är «Microsoft 365 Business Basic EES (exkl. Teams)». `radensNiva` diskvalificerar «exkl. Teams», så raden prövas inte. LT-05 prövar en annan text, «Microsoft 365 Business Basic (EES)».
- **Bevis:** `alt.mjs` (1). «…EES (exkl. Teams)» med 619,32 och 743,16 ger radensNiva null. main prissätts och HEAD prissätts, både för «Microsoft» och för «Microsoft Ireland Operations Ltd».
- **Motprov:** «…(EES)» ger business-basic och HEAD GRANSKNING i alla fyra fallen.
- **Följd:** F4-2 är [KUND], förexisterande och inte vanligare. Arbetsordern har slutat logga det som öppet. Avgränsningen 22 okt kräver att det står där.
- **Förslag:** skriv tillbaka F4-2 som öppet, med F4-2:s exakta text. Låt LT-05 använda den texten och kräva prissätts tills boken bär EES-priserna (fjärde blickens förslag).

### T2-4 · [VAKT] · infört: «LT-07 låser namnuppslaget» håller för åtta av nio namn

- **Fil:** `ops/ARBETSORDER-VAG1.md` rad 52 («F5-1 (LT-07 låser namnuppslaget)») och `tests/listpristak.mjs` LT-07.
- **Bevis:** sabotage G5 tar bort `'adobe inc'` ur `SUPPLIER_KEY_MAP`: 0 fail, 0 cancelled. Beteendet ändras: «Adobe Inc» med 5 000 kr per plats går från GRANSKNING till prissätts (`probe.mjs`).
- **Motprov:** C5 (varumärkesnyckel) fällde LT-07. Instrumentet kan alltså falla.
- **Förslag:** låt LT-07 räkna upp alla nio nycklar.

### T2-5 · [VAKT] · infört: modulhuvudet lovar mer än radprövningen fångar

- **Fil:** `lib/supplier-price-intel.js`, huvudet: «En kvartalssumma (3×) och en årssumma (12×) läst som månad ligger över (LT-02, LT-05)». BLIND nämner inte de två fallen nedan.
- **Bevis:**
  - `alt.mjs` (2): en kvartalssumma av ett à-pris under 80 % av årslistpriset ligger under 2 × månadspriset. Business Standard à 105 × 3 = 315 och E3 à 330 × 3 = 990 prissätts. Standard à 115 × 3 = 345 och E3 à 380 × 3 = 1 140 går till granskning. Gränsen är à-pris ≤ 107,05 (Standard) respektive ≤ 333,41 (E3). Dustin säljer Standard för 115 i korpusen.
  - `diff.mjs` C: månads-à-pris 66,91 med årssumman 8 029,20 som belopp, period monthly, Crayon AS: prissätts. Radprövningen ser bara à-priset.
- **Motprov:** samma rader med à-priset som årssumma går till granskning (`kedja.mjs`, Crayon E3 5 001,24).
- **Klass:** inget av fallen är vanligare än på main, som inte prövade återförsäljarnamn alls. Felet sitter i texten.
- **Förslag:** för in båda i BLIND, eller stäng den andra med T2-2:s förslag.

### T2-6 · [VAKT] · infört: radfaktorn, nivåns pris och gränsen är inte låsta

- **Fil:** `lib/supplier-price-intel.js`: `RADFAKTOR = 2`, `nivansListpris` (max av månads- och årspris) och `pris > RADFAKTOR * listpris`.
- **Bevis, hela sviten, 0 fail och 0 cancelled för varje:**
  - G2 `RADFAKTOR = 2.49`: Premium à 555,17 (2,2 × månadspris) går från GRANSKNING till prissätts.
  - G3 `Math.min` i `nivansListpris`: E5 à 1 538,84 går från prissätts till GRANSKNING.
  - G4 `>=`: E5 exakt 2 × 769,42 går från prissätts till GRANSKNING.
- **Motprov:** G1 `RADFAKTOR = 1.2` fällde LT-05 och LT-06 (2 fail). Faktorn är alltså låst nedåt, av en LT-05-rad med Standards pris på en Basic-text, men inte uppåt under 2,5.
- **Förslag:** gränsfall per nivå: 2 × bokens högsta prissätts och +0,01 granskas, plus en rad på 2,2 × månadspriset som ska granskas.

## Friat

- **LT-06:s referensfunktion är mains.** `referens.mjs`: mains riktiga modul (`git show origin/main:lib/supplier-price-intel.js`) mot testets `mainsUtfall` med 29 namn × −1,00–2 000,00 kr i steg om 1 öre, plus NaN, ±Infinity, strängar och arrayer. 5 803 306 anrop och 0 skillnader. Motprov: tröskeln 765,71 ger 1 skillnad.
- **LT-06:s tal.** `varianter.mjs` räknar om rutnätet: fall 1 986, main 1 266, ny 1 460, försämrat 0, bättre 194.
- **Arbetsorderns «20 korrekta E3- och E5-fakturor»** för den varumärkesnycklade varianten återskapas: 20 fall från «Microsoft Ireland Operations Ltd» utan nivå i radtexten (`varianter.mjs`). **«24 tillägg» för taket per tilläggsrad vet jag inte än.** Min rekonstruktion ger 48, med 24 i varje halvering (med eller utan nivåtext, monthly eller unknown). Varianten finns inte i commiten.
- **Taltexten.** Microsoft 769,42 (E5 månadspris), Adobe 1 083,50 (1,10 × 985) och Google 468 stämmer mot `TAK_PER_PLATS`. LT-01 låser alla tre (C6 och G8 fällde LT-01).
- **Produktionens objekt.** `kedja.mjs` kör modellens råform genom `aggregateLineItems(raw, null)`, sedan `konverteraTillSek` för USD med kurs 10,42, och sedan `prisprovningensIndata` och `validateSeatPrice`.
  - `radensOre` läser det aggregerade `unitPriceOre`.
  - USD-öret räknas om: 2 200 blir 22 924.
  - Period unknown utan datum blir monthly i aggregeringen.
  - Datum över tre år ger unknown, som prövas som månad. Det är samma antagande som `PERIOD_MULTIPLIER.unknown = 12`, så huvudets påstående stämmer.
  - En årsfaktura med datum prövas per månad och prissätts.
  - En årssumma läst som månad går till granskning, även från «Crayon AS (Swedish Branch)», som main inte prövade.
  - `extracted` byts bara på rad 653, 887 och 1440, och 887 ligger före anropet på rad 1233.
- **Anropet körs nu för varje faktura.**
  - En kreditnota med negativ total stoppas före prövningen (`api/test-invoice.mjs` rad 848, `unsupported`).
  - `radensNiva` kräver familjen «Microsoft 365» och diskvalificerar Google, Office 365, Copilot och «exkl. Teams». Google Workspace Business Standard prövas inte (`diff.mjs` D).
  - Telias M365-rad à 149, på månads- och kvartalsfaktura, prissätts av båda (`diff.mjs` D).
  - Av repots testfakturor bär bara nio PDF:er nivårader, och alla är M365-fakturor (`textlager.mjs`). Mobil-, el- och bredbandsfakturorna i `test-pdfs/` bär ingen nivårad, så radprövningen kan inte slå till på dem. Alla nio ger samma utfall som main, både med sitt eget namn och med «Microsoft» (`korpus.mjs`). Det gäller även CloudResellers prorata-rad feltypad som löpande.
- **Udda indata.** Ett icke-strängnamn (123, true, {}, NaN) kastar TypeError på HEAD även när priset per plats saknas. Main kastade bara när ett pris fanns (`diff.mjs` E). Det går inte att nå: `supplier` har typen string i schemat, och `normalizedSupplier` är `invoice.supplier ?? ''` eller modellens sträng (`categorize.js`). Strängar, NaN, negativa tal, `rad: null`, okänd period och prototypnamn som period ger inga krascher (`diff.mjs` F).
- **`lib/price-db.js`.** Grep över hela repot utom `node_modules` efter de sex borttagna namnen ger träffar bara i `ops/`-text, i modulens egen kommentar och i testernas `doesNotMatch`. Det finns inga dynamiska importer: alla importer av `price-db.js` namnger kvarvarande exporter (`api/invoice-history.mjs`, tre skript). Modulen och `api/invoice-history.mjs` laddas. `lib/` frågar inte `supplier_prices` (`graph_supplier_prices` är en annan tabell).
- **Vakterna.** `granskaCommit` på commitens meddelande och diff ger ok. Motprov: utan raden «Sabotage som fällde» ger den false (`vakter.mjs`). `pastaendevakt` med `ARVO_DIFF_BAS=793810d3` är grön, med 332 tillagda rader lästa.
- **F5-2 är öppet, som arbetsordern säger.** G6 (`if (false) {` runt anropet) fällde 0. Det är redan loggat som «Kvar, [VAKT]».

## Sabotage

Alla står i `sab.py` och kördes med `sab.py` (C1–C11), `sab1.py` (G1) och `sabkedja.py` (G2–G8). Varje körning gjorde `assert old in s` med exakt en förekomst, och återställde ur sparad sträng med kontroll i `finally`. C1–C11 är commitens, rekonstruerade ur commit-texten. Hela sviten kördes för varje sabotage, och fail och cancelled räknades.

| ID | Riktning | Fällda (fail + cancelled) | Tester |
|---|---|---|---|
| C1 | radfaktor 3 | 2 + 0 | LT-05, LT-06 |
| C2 | typspärren bort | 1 + 0 | LT-05 |
| C3 | öret ignorerat | 1 + 0 | LT-05 |
| C4 | prövning 2 bara utan nivårad | 1 + 0 | LT-06 |
| C5 | varumärkesnyckel | 2 + 0 | LT-06, LT-07 |
| C6 | Microsofts tak 765,7 | 3 + 0 | LT-01, LT-02, LT-06 |
| C7 | indata utan period | 1 + 0 | LT-04 |
| C8 | okänd period som år | 2 + 0 | LT-05, LT-06 |
| C9 | gamla anropet | 1 + 0 | LT-04 |
| C10 | en läsare av `supplier_prices` | 1 + 0 | SS-03 |
| C11 | engångsperioden prövas | 1 + 0 | LT-05 |
| | **summa C1–C11** | **16 + 0** | stämmer med commit-texten |
| G1 | `RADFAKTOR = 1.2` | 2 + 0 | LT-05, LT-06 |
| G2 | `RADFAKTOR = 2.49` | **0** | beteendet ändrat (T2-6) |
| G3 | `Math.min` i `nivansListpris` | **0** | beteendet ändrat (T2-6) |
| G4 | `>=` i stället för `>` | **0** | beteendet ändrat (T2-6) |
| G5 | aliaset `'adobe inc'` bort | **0** | beteendet ändrat (T2-4) |
| G6 | `if (false)` runt anropet i test-invoice | **0** | känt, F5-2 |
| G7 | reserven belopp ÷ antal bort | 1 + 0 | LT-05 |
| G8 | Adobes tak tillbaka till 908,7 | 3 + 0 | LT-01, LT-02, LT-06 |

G8 kördes först med fel indrag. `assert` fångade no-op:en (0 förekomster), och sabotaget kördes om med rätt sträng.

## Proveniens

- **Uppställning:** `git fetch origin claude/fable-5-resume-i60dmd main`, `git checkout --detach 2ac67b6e`, `origin/main` = 793810d3ef036c671236c4d029a8c819ef70ea3b. `node_modules` symlänkades från huvudklonen under granskningen (ignorerad av `.gitignore`) och togs bort vid slutet.
- **Läst:**
  - `git show 2ac67b6e`, alla fem filerna och commit-texten.
  - `CLAUDE.md`: CTO-mandatet, stoppregeln, avgränsningen (rad 327–353) och regel 13 (rad 473–478).
  - `ops/ARBETSORDER-VAG1.md` i sin helhet, `ops/GRANSKNING-ssot-tele2-femte.md` i sin helhet, och domen samt F4-2 i `-fjarde.md`.
  - `lib/licensniva.js`, `lib/radobservation.js`, `lib/faktureringsperiod.js` och `lib/valutakonvertering.js`.
  - `aggregateLineItems` och `applyDeterministicRules` (seatCount) i `extract.js`.
  - LFL:s run-rate i `recommend.js`, `lib/adobe-rightsizing.js`, och `api/test-invoice.mjs` rad 848–905 och 1100–1260.
- **Baslinjen:** `node --test tests/run.mjs`: tests 2711, pass 2711, fail 0, cancelled 0.
- **Körda skript** (katalog `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-t2/`):
  - `textlager.mjs`: pdfjs-textlagret för `test-pdfs/`.
  - `diff.mjs`: main mot HEAD på fientliga fall.
  - `fonster.mjs` och `fonster2.mjs`: svep utanför rutnätet.
  - `referens.mjs`, `varianter.mjs`, `nedstroms.mjs`, `kedja.mjs`, `korpus.mjs`, `alt.mjs`, `probe.mjs` och `vakter.mjs`.
  - `sab.py`, `sab1.py` och `sabkedja.py`.
- **En oförklarad hängning:** första helsvitskörningen under G1 stod still i över 15 minuter på 97 % CPU och avbröts av tidsgränsen. Filen återställdes i `finally`. Omkörd under samma sabotage blev den klar på normal tid med 2 fail. Varför den hängde vet jag inte.
- **Inte kört:** extraktionen med modellen (ingen nyckel, inga webbanrop), rendering, `recommend()`:s AI-steg och produktionen. Hur ofta fönsterfallen i T2-1 och formen i T2-2 förekommer i verkliga kundfakturor är inte mätt.
- **`git status --porcelain` vid slutet:** tomt.
