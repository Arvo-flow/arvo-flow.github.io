commits: 88104b30
dom: BLOCKERAR
# Tredje blicken på c1 (88104b30)

Granskat: grenen `claude/fable-5-resume-i60dmd` i slutläget `88104b30` mot `origin/main` `1677f2bd`. Hela
grenens diff är läst, med tyngdpunkt på lagningen `88104b30`. Jämförelserna gjordes mot tre egna träd:
`main-tree` (`git archive 1677f2bd`), `c1a-tree` (`1f595621`) och `c1b-tree` (`9395d8d7`). Samma sonder kördes
mot alla fyra lägena.

Sviten på `88104b30`: `node --test tests/run.mjs` gav **2728 av 2728 gröna** (`svit-commit.txt`).

## Domen

**BLOCKERAR.** Två [KUND] är införda av grenen och syns i slutläget:
- **E1-1:** lagningen av D1-1 gav tillbaka bytet men inte räknaren.
- **E1-2:** strykningen tar fortfarande ett korrekt byte, nu på kombinerade mobil- och bredbandsfakturor, och
  den nya förklaringsmeningen är falsk där.

Ett tredje [KUND] (E1-5) finns redan på main. Det står i en text som grenen skrivit om, och domen vilar inte på
det. Två [VAKT] blockerar inte.

| ID | Klass | Status | Kort |
|---|---|---|---|
| E1-1 | [KUND] | infört i 1f595621, synligt sedan 88104b30; vanligare för bredbandsformen | M365-rad med två nivåer och like-for-like-byte: «Prissatta 0», «Vägde 0 fakturor mot verifierat publikt listpris» och «0 PRISSATTA · 1 MOTTAGEN» under «1 avtal kan skärpas mot verifierat listpris · 24 566 kr/år». Main: «Vägde 1 faktura» |
| E1-2 | [KUND] | infört i 9395d8d7, utvidgat i 88104b30 | Kombinerad mobil+bredbandsfaktura: bredbandets byte (samma hastighet, mot Tele2:s verifierade listpris) stryks. Raden säger «Analysen av fakturan räknade ett byte till den billigaste publicerade produkten i kategorin» och domen «inget verifierat jämförelsepris». Main visade 2 976 kr/år |
| E1-3 | [VAKT] | infört | Sviten låser varken E1-1 eller E1-2. Lagningsriktningarna L1 och L2 fäller 0 av 2728. MS-10 låser `prissatta === 0` bredvid ett byte, och sondens IT-8821-motprov kräver bara att bytet syns |
| E1-4 | [VAKT] | infört | BYTE_UNDANHALLET:s innehåll och chippets text i `byte_omatt` prövas inte i sviten (X2 och X5 fällde 0). Prisbokens kommentar och docstringen påstår villkorslöst att mobilens bytesmål är kategorins golv |
| E1-5 | [KUND] | förexisterande; texten är omskriven av grenen | IT-8821-raden visar «17% mer», ring 75 och «+24 566 kr/år» rakt ovanför «Hur långt ifrån ni ligger kan vi inte säga … Vi sätter varken avstånd eller poäng här». Det är D1-1:s lagningspunkt 3, som inte är gjord |

Det här håller, mätt mot main och de två tidigare lägena (`sond-rum.mjs`, `jamfor-sond-rum.txt`, renderingarna):

**D1-1 är lagat för bytet.** IT-8821 behåller bytet 24 566 kr i rummet. Samma gäller Standard+Premium (4 420 kr),
Standard+Copilot (2 514 kr) och en saas-rad utan radtexter.

**D1-2 är lagat i chippet.** Mobil plus bredbandsbyte ger «Verifierat · grundat på era bytesmål · publika
listpriser · ingen samlad poäng». Varken «Delvis mätt» eller «0 av N» står i chippet.

**C1-1 och C1-2 är lagade.** En ren mobilrad med lagrat byte får inget byte, ingen poäng och inget procenttal.
Följande rum berömmer inte och sätter ingen samlad poäng:
- mobil plus lön;
- mobil plus E3;
- mobil plus fynd.

**Motproven är identiska på alla fyra lägena** (lön, E3 till listpris, E3 med byte, bredband, el, kortterminal,
lön plus E3, bredbandsbyte, en M365-nivå med byte, elbyte, lön plus bredbandsbyte):
- `rum.lage`;
- `score`;
- räknarna;
- radernas läge.

**Den officiella renderingssonden är grön**, körd som kopia med lokal playwright (`bilder-officiell/`).

## Fynd

### E1-1 · [KUND] · infört i 1f595621, synligt sedan 88104b30: rummet säger att det vägt noll fakturor bredvid ett byte mot verifierat listpris

**Mekanismen.** I `rumLage` finns två definitioner av «mätt», och de säger emot varandra:
- `delvis` räknar en rad som mätt när `radScore` inte är null, och reserven för en rad med byte räcker
  (`lib/lagesregister.js` 260).
- `roomCounts.prissatta` utesluter varje rad med `ovissNiva`, också när raden bär ett byte som står kvar (216–224, raden 222).

Före 88104b30 doldes skillnaden, eftersom strykningen tog bytet på varje obekräftad rad. D1-1:s lagning gav
tillbaka M365-bytet men inte räknaren. Main räknade raden som prissatt. D1-2:s läxa, att domen och texten ska
läsa samma räknare, tillämpades bara på chippet.

**Vad jag körde.** `sond-rum.mjs` kör `buildBranchAnchors → berikaRader → byggRum` på fyra lägen. IT-8821 är
lagrad så som fakturavägen lagrar den: förslag 153 972 kr och netto 24 566 kr, vilket är fixturens `expected`.

| rum | main | 1f595621 | 9395d8d7 | 88104b30 |
|---|---|---|---|---|
| S · IT-8821 ensam | `byte_battre` · 75 · **1 prissatt** | `byte_battre` · 75 · 0 prissatta | struket · 0 | `byte_omatt` · delvis · **0 prissatta**, byte 24 566 |
| S2 · IT-8821 + lön | 2 prissatta | 1 | struket | **1** prissatt, byte 24 566 |
| S3 · IT-8821 + mobil | 2 prissatta | 0 | struket | **0** prissatta, byte 24 566 |

**Renderat** (`bilder-commit/S-it8821-{mobil,desktop}.png`, med motprovet `bilder-main/S-it8821-*`). På
88104b30 står allt detta i samma vy:
- «ERT UNDERLAG Fakturor 1 · **Prissatta 0** · Mottagna 1»;
- «**1 avtal kan skärpas mot verifierat listpris.** 24 566 kr/år i möjlig nettobesparing»;
- kvittot «**Vägde 0 fakturor mot verifierat publikt listpris**»;
- «INNEHAVET · **0 PRISSATTA · 1 MOTTAGEN, INTE PRISSATT**», och raden under med ring 75 och «+24 566 kr/år»;
- poängkortet: «Vi kan inte bedöma alla era fakturor mot listpris än … Ett tal över en del av boken läses som
  ett omdöme om hela». Rummet har en enda faktura, och den bär rummets byte.

Main sa «Vägde 1 faktura» och «grundat på 1 prissatt faktura». I S2 säger 88104b30 «Vi jämförde **1** faktura»,
men de 24 566 kronorna kommer ur den faktura som inte räknas.

**Varför det blockerar.** Kvittot påstår ett arbete som är motsatsen till det som gjordes. Fakturavägen vägde
IT-8821 nivå för nivå mot Microsofts verifierade listpriser, och det är därför bytet finns. Det är C1-1:s form
(«0 prissatta», «Vägde 0 fakturor» bredvid ett byte), som den första granskningen blockerade på för mobil. Nu
gäller den för M365-fakturor med blandade nivåer, och det är inget kantfall. Den andra granskningen mätte att
3 av 5 M365-fakturor i `ops/probe-stickprov.txt` ger oläst nivå. Felet är infört av grenen: main räknade raden.

**Vanligare, den redan loggade bredbandsformen.** Den förexisterande formen «Vägde 0 fakturor» bredvid ett
bredbandsbyte står nu i fler rum. Mobil plus bredbandsbyte (I) gav på main «Vägde 1 faktura», eftersom mobilen
räknades. På 88104b30 står där:
- «Vägde 0 fakturor» och «0 PRISSATTA · 2 MOTTAGNA» under «1 avtal kan skärpas mot verifierat listpris»;
- med en bevakad rad (I5) dessutom «**ARVO SCORE 0 AV 3 FAKTUROR PRISSATTA**», där main sa «1 AV 3 … 63/100».

D1-2:s regel «Delvis mätt skriver aldrig ut ett nolltal» gäller bara chippet. Arbetsordern kallar formen
«förexisterande, oförändrat», men för det här rummet är den ändrad.

**Motprov.**
- E3 med bekräftad nivå och byte (m3) och en M365-nivå med byte (m9) ger «Vägde 1 faktura» på både main och
  commit.
- Lagningsriktningen L1 (nedan) ger S 0 → 1, S2 1 → 2 och S3 0 → 1 prissatta. Instrumentet kan alltså svara
  annat.

**Lagning.** Rummet bör ha EN definition av «vägd mot verifierat listpris». Den ska gälla för `roomCounts`,
`delvis` och kvittot. En rad vars byte står kvar efter strykningen räknas som vägd, eftersom bytesmålet är ett
verifierat listpris.
- L1 är minsta steget: `ovissNiva !== true || (should_switch && net_saving > 0)`. Den rättar M365-fallet.
- Bredbandsraden behöver samma regel om rum I och I5 ska gå ihop. Den delen är förexisterande på main.
- Lägg IT-8821-räknaren i MS-08 och bredbandsbytet med bevakad rad i sonden.

### E1-2 · [KUND] · infört i 9395d8d7, utvidgat i 88104b30: en kombinerad mobil- och bredbandsfaktura tappar bredbandsbytet, med en falsk förklaring

**Mekanismen.** Lagningen stryker allt lagrat byte på en mobilrad med obekräftat abonnemang
(`bytesmalMotKategorigolv`). Prisboken motiverar det så här (`agents/recommender/branchindex.js` 152–156): «Fakturavägen räknar
mobilens bytesmål mot kategorins golv … Ett lagrat byte på en rad utan bekräftat abonnemang är därför planvalet
räknat som besparing».

För en kombinerad faktura stämmer det inte. Där bär mobilradens `should_switch`, `gross_saving` och `net_saving`
också bredbandskomponentens besparing:
- `computeSecondarySaving` räknar den mot Tele2:s verifierade bredbandspris vid samma hastighet
  (`lib/secondary-savings.js` 24–39).
- api-lagret slår ihop primär och sekundär besparing (`api/test-invoice.mjs` 2021–2024).
- Har mobilen ingen besparing sätter `secondary-override` `shouldSwitch = true` med `savingPerYear = 0`
  (1942–1947). Hela det lagrade bytet är då bredband.

**Vad jag körde.** `sond-kombi.mjs` kör kedjan nedan på fyra lägen, med modellen stubbad till både ja och nej:
1. `computeInvoiceMetrics`;
2. `computeSecondarySaving`;
3. `recommend` med stubbad modell;
4. api-lagrets override och summering, som en **kopia** av 1942–2024, markerad i sonden;
5. den lagrade raden;
6. rummet.

| fall | primär (mobil) | sekundär (bredband) | lagrat netto | main | 9395d8d7 / 88104b30 |
|---|---|---|---|---|---|
| K3 · Bas 269 × 5 (golvet) + Bredband 250/250 à 549 | inget byte | 6 588 → 2 868, brutto 3 720 | 2 976 | `byte` · rum `byte_i_niva` · +2 976 kr/år | **struket**, `lugn_omatt`, 0 kr |
| K5 · raderna ur repots `comhem-mobil-bredband-kombinerad.pdf` (Mobil L 3 × 269 + Fiber 250 à 549 + statisk IP) | inget byte | brutto 3 720 | 2 976 | +2 976 kr/år | **struket** |
| K1 · comb-01 (XL 349 × 5 + Fiber 500 à 899 + växel + IP) | brutto 4 800 (planvalet) | brutto 7 440 | 9 792 | +9 792 kr/år | **struket helt**, bredbandets 5 952 netto med |
| K2 · comb-02 (XL 349 × 5 + Bredband 250 à 549) | brutto 4 800 | brutto 3 720 | 6 816 | +6 816 kr/år | **struket helt** |

**Renderat** (`bilder-commit/K3-kombi-{mobil,desktop}.png`, med motprovet `bilder-main/K3-kombi-*`). På
88104b30 står följande:
- domen: «Vi vaktar era avtal — men **er position mot listpris kunde inte mätas** i dag. Vi har ännu **inget
  verifierat jämförelsepris** för det ni själva betalar»;
- chippet «Inte mätt i dag»;
- raden: «**Analysen av fakturan räknade ett byte till den billigaste publicerade produkten i kategorin.** Det
  visar vi inte här, eftersom vi inte vet vilken produkt ni har.»

Varje led är falskt för K3:
- Mobilabonnemangen ligger redan på det billigaste publicerade priset.
- Bytet gällde bredbandet vid samma hastighet, mot ett verifierat listpris.
- Det jämförelsepriset finns.

Main visade «+2 976 kr/år». Fakturavyn och analysmejlet visar samma tal («Vi kan förbereda även
bredbandsbytet»), så kunden får två motsatta besked om samma papper. Det är D1-1:s form, i ett syskonfall till
det IT-8821 var.

**Hur ofta.** I produktion är det inte mätt, eftersom databasen inte går att läsa härifrån. Flödet är däremot
byggt och testat som en produktfunktion:
- `tests/fixtures/03-combined.mjs` har 30 fixturer med mobil som primär och bredband som sekundär;
- `test-pdfs/` har fyra `*-mobil-bredband-kombinerad.pdf` (Com Hem, Tele2, Telenor, Telia).

**Obekräftat:** att extraktionen av `comhem-mobil-bredband-kombinerad.pdf` ger raderna och
`potentialMixedCategories: true` så som K5 antar. Det kräver modellen.

**Motprov.**
- En ren mobilrad med byte (B) stryks på 88104b30. Det är rätt, och K-raderna skiljer sig bara genom
  bredbandskomponenten.
- En bredbandsrad med byte (m8) är orörd på alla fyra lägena.
- `computeSecondarySaving` ger `null` utan `potentialMixedCategories`.

**Lagning.** Riktningen L2 (ingen strykning när radtexterna bär bredband) fäller 0 tester. Den är **ingen
lagning**: den ger tillbaka planvalets 4 800 kr i K1 och K2, alltså C1-1. Rätt lagning är att skilja andelarna
åt:
- Vid läsning: räkna den sekundära besparingen med samma funktioner som fakturavägen
  (`computeInvoiceMetrics(_rader, 'mobil', true)` → `computeSecondarySaving`). Stryk bara den primära andelen.
- Alternativt: lagra uppdelningen i fakturavägen.
- Lägg BYTE_UNDANHALLET bara när en mobilandel faktiskt strukits, och låt meningen namnge
  mobilabonnemanget.
- Rätta prisbokens kommentar och docstringen.
- Lägg K3 som motprov i MS-08: bredbandets byte står kvar. Lägg K1 som syskonfall: mobilandelen stryks och
  bredbandsandelen står kvar.

### E1-3 · [VAKT] · infört: sviten låser varken E1-1 eller E1-2

- **L1 fällde 0 av 2728.** Den räknar en obekräftad rad med byte som prissatt. MS-08:s IT-8821-motprov prövar
  `should_switch`, `lage` och `bytetUndanhallet` men aldrig rummets räknare.
- MS-10 låser `assert.equal(rum.counts.prissatta, 0, 'bredbandsraden bär inget prisunderlag')` i ett rum med
  byte. Testet låser alltså tillståndet bakom «Vägde 0 fakturor» bredvid bytet.
- **L2 fällde 0 av 2728.** Den slutar stryka kombinerade rader. Ingen test och ingen sond har en kombinerad
  mobilrad i rummet.
- Den officiella sondens IT-8821-motprov kräver bara «Ni behåller» eller «möjlig nettobesparing». Den är grön
  på 88104b30 medan samma sida säger «Vägde 0 fakturor». Kontrollen för mobil plus bredbandsbyte förbjuder
  `/\b0 av \d+ fakturor/`, som inte träffar «Vägde 0 fakturor». Med en bevakad rad (I5) står «0 AV 3 FAKTUROR
  PRISSATTA», men sonden har inget rum med bevakad rad.

**Lagning.** Se E1-1 och E1-2. Testerna ska prövas genom räknaren och genom den kombinerade fakturavägen, inte
genom egenbyggda `should_switch`-rader ensamma.

### E1-4 · [VAKT] · infört: förklaringens och chippets ord prövas inte i sviten, och räckvidden står villkorslöst

- **X2 fällde 0.** Sabotaget gör BYTE_UNDANHALLET till «Analysen av fakturan räknade inget byte.». MS-08 jämför
  `radMotivering(a).endsWith(BYTE_UNDANHALLET)`, alltså konstanten mot sig själv.
- **X5 fällde 0.** Sabotaget ger chippet i `omatt && hasSwitchAction` texten «Delvis mätt · 0 av N fakturor
  prissatta». MS-10 prövar bara att grenen står före «Delvis mätt» (`indexOf`).

Båda fångas av renderingssondens fraskontroller, men sonden ingår inte i `tests/run.mjs`. MS-huvudet deklarerar
Portfolios domtext som blind, men inte `src/lib/rumstext.js`.

Prisbokens kommentar till `bytesmalMotKategorigolv`, docstringen till `undanhallBytePaOvissNiva` och bibelns
tillägg påstår villkorslöst att mobilens lagrade byte är planvalet. E1-2 visar att det inte stämmer. En
kommentar som intygar en invariant koden inte håller kontrolleras inte av nästa läsare.

### E1-5 · [KUND] · förexisterande, i en text grenen skrivit om: «Vi sätter varken avstånd eller poäng här» under ett byte med procenttal och ring

Raden ser ut så här i både main- och commit-renderingen av S, S2 och S3:
- IT-8821-raden visar ring 75, «+24 566 kr/år» och «Ni betalar **17% mer** … Arvo rekommenderar byte»;
- underlaget under den säger «Hur långt ifrån ni ligger **kan vi inte säga** … **Vi sätter varken avstånd eller
  poäng här.**».

Påståendet är detsamma på main. Grenen gör det inte vanligare för saas, men den har skrivit om just de meningarna
(MS-04). Den andra granskningen bad om lagningen (D1-1, punkt 3: «Låt underlaget för en sådan rad inte säga
«kan vi inte säga» bredvid bytet»), och den är inte gjord.

Jag räknar fyndet som «syns i det grenen ändrar». Domen vilar ändå på E1-1 och E1-2.

**Lagning.** En rad med kvarstående like-for-like-byte bör få underlagets byte-gren och inte den obekräftade
grenen.

## Prövat och redovisat (blockerar inte)

- **Rum som går ihop.** I följande rum säger inga två meningar emot varandra:
  - C, mobil × 100 plus lön: «Delvis mätt · 1 av 2 fakturor prissatta», «Vi jämförde 1 faktura», «Vägde 1
    faktura», poäng «—» och «Inga byten på bordet»;
  - C2, samma rum med en bevakad rad: etiketten «1 AV 3 FAKTUROR PRISSATTA»;
  - E, mobil plus E3-byte: `byte_omatt`, «Vägde 1 faktura» och bytet på E3-raden;
  - F, mobil plus lön med fynd: «Ur er egen faktura».
- **Poängkortets etikett är mains.** Ett rum blir sämre än main bara där räknaren redan är fel (I5, se E1-1).
  1f595621 hade samma etikett.
- **En bevakad mobilrad med lagrat byte stryks inte.** `buildBranchAnchors` tar bara `route === 'auto'`, så ett
  rum med bara en bevakad mobilrad får inget underlag (fall P: «23% mer», 66). Det är samma på main. Dessutom
  lagras bevakade rader med `shouldSwitch: false` sedan 2026-06-28 (`api/test-invoice.mjs` 1371 och 1585), så
  dagens kod når inte fallet.
- **Äldre lagrade rader.** Två fall gäller rader från före grindarna:
  - En saas-rad med byte men utan radtexter (gissningsvägen före 2026-08-12) har ett byte mot kategorins golv och
    stryks inte (S6). Det är samma på main.
  - En mobilrad lagrad före 2026-08-21 kan ha ett bytesmål ur livedatans totalsummor. För den vore
    BYTE_UNDANHALLET:s «till den billigaste publicerade produkten» också falskt.
  - Om sådana rader finns vet jag inte, eftersom databasen inte går att läsa härifrån.
- **Kombinerade rader räknar bredbandet i «per abonnemang».** «Ni betalar 4 546 kr per abonnemang/år»
  (22 728 / 5) innehåller bredbandet. Main visar samma tal i underlaget och i Marknadsankaret, så det är
  förexisterande. Grenen gör talet mer synligt, eftersom det nu står i motiveringstexten.
- **Omvänd kombination, läst i koden men inte körd genom rummet.** För en bredbandsrad med en mobil som sekundär
  komponent räknar `computeSecondarySaving` mobilen mot `BRANCHINDEX.mobil.matrix` p25 × antal
  (`lib/secondary-savings.js` 41–58). Det är planvalet. Bytet står kvar i rummet, eftersom raden är bredband.
  Det hör till C1-3:s familj, är förexisterande och är inte vanligare.
- **Instrumentet.** I `sond-kombi.mjs` är api-lagrets summering en kopia, eftersom handlern kräver
  extraktionen. Kopians tal stämmer med fixturerna i `03-combined.mjs`: comb-01 ger sekundär brutto 7 440 och
  comb-02 ger 3 720.
  - Renderingarna kördes innan sabotagen. Sabotagen kördes med ett rent träd före och efter.
  - Lagningsriktningarnas beteende mättes i en kopia (`lagning-tree`) och aldrig i worktree.
  - `git status --short` är tomt, och `build/` är borttagen.

## Sabotage

Varje sabotage kördes med `assert count == 1` och hela sviten (`node --test tests/run.mjs`, 2728 tester), och
originalet återställdes i `finally`. Skriptet är `sabotage.py` och utfallet ligger i `sabotage-utfall.jsonl`.

| ID | Fil | Sabotage | Fällda | Beteende ändrat? |
|---|---|---|---|---|
| X1 | `lib/lagesregister.js` | strykningen utan kategorigrind | 1 (MS-08) | ja (D1-1 tillbaka, enligt sabotagets konstruktion) |
| X2 | `src/lib/rumstext.js` | BYTE_UNDANHALLET säger «räknade inget byte» | **0** | ja: kundtexten blir falsk → E1-4 |
| X5 | `src/pages/Portfolio/index.js` | chippet i `byte_omatt` skriver «Delvis mätt · 0 av N» | **0** | ja: D1-2:s text tillbaka → E1-4 (sonden fångar) |
| X6 | `api/invoice-history.mjs` | strykningen efter `radLage` (ordningen) | 1 (MS-08) | ja |
| X9 | `lib/lagesregister.js` | samlad poäng trots obekräftad rad | 2 (MS-09, MS-10) | ja (C1-2 tillbaka) |
| L1 | `lib/lagesregister.js` | lagningsriktning E1-1: obekräftad rad med byte räknas som prissatt | **0** | ja: S 0 → 1, S2 1 → 2, S3 0 → 1 prissatta (`sond-rum-lagning.json`) → E1-3 |
| L2 | `api/invoice-history.mjs` | lagningsriktning E1-2: ingen strykning när radtexterna bär bredband | **0** | ja: K1–K5 behåller bytet (`sond-kombi-lagning.json`), men K1/K2 också planvalets 4 800, så L2 är bara en räckviddsprövning → E1-3 |

## Instrument

Allt ligger i `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-c1c/`:

**Sonder**
- `sond-rum.mjs` (36 rum), `kor4.sh` och `jamfor.py`. Utfallet ligger i `sond-rum-{main,c1a,c1b,commit}.json` och
  `jamfor-sond-rum.txt`.
- `sond-kombi.mjs`: den kombinerade fakturavägen till rummet, med utfall i `sond-kombi-*.json`.

**Rendering**
- `render.mjs` och `fraser.py`. Bilder och text ligger i `bilder-commit/` och `bilder-main/`, i 390 och 1600 px,
  och jämförelsen i `fraser-main-commit.txt`.
- `screenshot-mobilscore-kopia.mjs` är den officiella sonden, och dess bilder ligger i `bilder-officiell/`.

**Sabotage och lagningsriktningar**
- `sabotage.py` och `sabotage-utfall.jsonl`.
- `lagningsriktning.py` och `kor-lagning.sh` körs mot kopian `lagning-tree/`.
