commits: 9395d8d7
dom: BLOCKERAR
# Andra blicken på c1-lagningen (9395d8d7)

Granskat: grenen `claude/fable-5-resume-i60dmd` i slutläget `9395d8d7` mot `origin/main` `1677f2bd`, med
tyngdpunkt på lagningen `9395d8d7`. Jämförelserna gjordes mot två egna träd: `main-tree` (`git archive
1677f2bd`) och `c1a-tree` (`git archive 1f595621`). Samma sond kördes mot alla tre träden.

Sviten på `9395d8d7`: `node --test tests/run.mjs` gav **2727 av 2727 gröna** (`svit-commit.txt`).

## Domen

**BLOCKERAR.** Två [KUND]-fynd är införda av lagningen. Två [VAKT]-fynd blockerar inte.

| ID | Klass | Status | Kort |
|---|---|---|---|
| D1-1 | [KUND] | infört i 9395d8d7 | `undanhallBytePaOvissNiva` stryker också M365-byten som fakturavägen räknat like-for-like per licensnivå. IT-8821 tappar 24 566 kr/år netto, och rummet säger «Vi har ännu inget verifierat jämförelsepris för det ni själva betalar» |
| D1-2 | [KUND] | infört i 9395d8d7 | «Delvis mätt · 0 av 2 fakturor prissatta mot publika listpriser» under «1 avtal kan skärpas mot verifierat listpris» (mobil + bredband med byte) |
| D1-3 | [VAKT] | infört | Ingen test ser D1-1 eller D1-2. Båda lagningsriktningarna fäller 0 av 2727, och MS-08 prövar bara mobil och M365 med bekräftad nivå |
| D1-4 | [VAKT] | infört | `bytetUndanhallet` läses av ingen yta. Commiten säger att raden «bär skälet i stället för att tyst sakna det», men kunden ser inget skäl. Docstringen och bibeln motiverar strykningen med mobil, medan koden gäller varje kategori som kräver bekräftad nivå |

Vad lagningen klarar, mätt mot main och 1f595621 (`sond-rum.mjs`, `jamfor-rum.py`):
- **C1-1 är lagat för mobil.** En mobilrad lagrad med byte till 269-planen får ingen poäng, inget procenttal
  och inget byte. Rummet blir `lugn_omatt`, med `totalSaving` 0. Renderat i 390 och 1600 px utan
  «% mer», «Ni behåller», «kan skärpas» och Arvo Score-tal. Den officiella renderingssonden
  (`scripts/screenshot-mobilscore.mjs`, kopia med lokal playwright) är grön.
- **C1-2 är lagat.** Rummet med mobil 100 × 349 och lön 5 000 är inte längre `lugn_battre`, 69, «beröm». Det
  är `lugn_omatt` med «Delvis mätt · 1 av 2 fakturor prissatta». Samma gäller mobil plus E3.
- **Motproven är oförändrade mot main:** lön ensam (69), E3 till listpris (88), E3 med byte (46, byte kvar),
  bredband, el, kortterminal, lön plus E3 (86) och bredband med byte (78).
- **Ankarvalet** (`src/lib/ankarval.js`) beter sig som den gamla useMemo-loopen. Raden för raden är det
  samma villkor i samma ordning. Enda skillnaden är `?.` på `ankare` och `g.latest`, som bara ändrar ett
  krasch-fall (null) till `null`. T5 visar att ordningen nu prövas genom beteende.

## Fynd

### D1-1 · [KUND] · infört i 9395d8d7: lagningen stryker korrekta M365-byten, inte bara mobilens planval

**Mekanismen.** `undanhallBytePaOvissNiva` (`lib/lagesregister.js` 115–123) frågar bara
`prisunderlag.ovissNiva === true && should_switch === true`. Den frågar aldrig kategorin. `ovissNiva` sätts för
varje kategori med `kraverBekraftadNiva`, alltså `saas-productivity` och `mobil`. Rummets nivåläsare
`lasLicensniva` (`lib/licensniva.js` 116–154) svarar `null` i följande fall:
- två licensnivåer på samma faktura;
- en rad med en annan produkt, till exempel Copilot;
- inga rader alls.

Fakturavägen räknar däremot saas-bytet **per nivårad** (`computeLikeForLikeSaasTarget`). Varje nivå jämförs
med sitt eget verifierade listpris, och lfl-grinden släpper inget saas-byte utan det. Ett lagrat saas-byte är
alltså like-for-like, och det är inte planvalet som grundarbeslutet handlar om.

**Vad jag körde.** `sond-saas.mjs` kör fakturavägen så som `api/test-invoice.mjs` gör:
1. `computeLikeForLikeSaasTarget`.
2. `recommend()` med stubbad modell.
3. Den lagrade raden byggs med gross = `savingPerYear` och net = `netOf(gross)`, som i 2020–2024.
4. Raden går genom rummet (`buildBranchAnchors → berikaRader → byggRum`) på main, 1f595621 och 9395d8d7.

| faktura | LFL-mål | nivå i rummet | main | 1f595621 | 9395d8d7 |
|---|---|---|---|---|---|
| **IT-8821** (fixturen, IT-Partner: Premium 45 + Basic 12 + backup) | 153 972, besparing 30 708, netto **24 566** | `null` | `byte`, +24 566 kr/år, rum `byte_battre` | samma | **`oviss_niva`, bytet struket, rum `lugn_omatt`, totalSaving 0** |
| Business Standard 10 à 160 + Premium 5 à 250 | besparing 5 525 | `null` | byte +4 420 | samma | **struket** |
| Business Standard 10 à 160 + Copilot 2 | besparing 3 142 | `null` | byte +2 514 | samma | **struket** |
| cloudreseller-norden (raderna ur `ops/probe-stickprov.txt`) | `shouldSwitch: true` | `null` | byte | samma | **struket** |
| *Motprov:* Business Standard 10 à 160, en nivå | besparing 3 142 | `business-standard` | byte +2 514 | samma | byte +2 514 (kvar) |

IT-8821:s tal är exakt fixturens `expected`. `tests/saas-like-for-like.mjs` låser samma tal som korrekta
(«ingen nedgradering»). Beloppet för cloudreseller-norden bygger på en årskostnad jag uppskattat. Att ett byte
lagras och stryks är mätt, men själva beloppet är inte mätt.

**Renderat** (`bilder-commit/it8821-byte-desktop.png`, motprov `bilder-main/it8821-byte-desktop.png`). På
9395d8d7 står följande på sidan:
- «Vi vaktar era avtal — men **er position mot listpris kunde inte mätas** i dag.»;
- «Vi har ännu **inget verifierat jämförelsepris** för det ni själva betalar — därför hävdar vi ingenting om
  er prisnivå.»;
- chippet «Inte mätt i dag»;
- «Vägde 0 fakturor mot verifierat publikt listpris» och «Prissatta 0»;
- raden «NIVÅ EJ BEKRÄFTAD», och inget byte någonstans.

Main visade «Sammantaget står ni starkt — men 1 avtal kostar mer än de borde», «24 566 kr/år i möjlig
nettobesparing» och «Vakten · ett drag kvar».

**Varför det blockerar.** Följande meningar når kunden och är falska:
- «inget verifierat jämförelsepris». Fakturavägen jämförde varje nivå mot Microsofts verifierade listpris
  (Premium 210,29 kr och Basic 66,91 kr).
- Bytet är borta. Med en lönerad i samma rum säger domen dessutom «Vi jämförde 1 faktura … **Inget byte
  rekommenderas i dag.**» (`bilder-commit-L/it8821-lon-*`; main: `byte_battre`, 24 566, `sond-rum` fall L).

Samma faktura gav i fakturavyn och analysmejlet ett byte på 24 566 kr/år, så kunden ser två motsatta besked om
samma papper. Felet är infört av lagningen: main och 1f595621 visade bytet. Riktningen är fel åt kunden. En
verifierad besparing försvinner tyst, och den är en Switch-intäkt (Nivå 2).

Hur ofta det händer i produktion är inte mätt, eftersom databasen inte går att läsa härifrån. I repots korpus
gäller följande:
- **1 av 2** saas-fixturer med ett LFL-mål under kostnaden har en oläst nivå (`sond-korpus-saas.mjs`).
- Av de fem M365-fakturorna i `ops/probe-stickprov.txt` ger tre en oläst nivå genom `lasLicensniva` på sina
  avlästa radtexter (`sond-kontroll.mjs`):
  - cloudreseller-norden och dustin-m365-standard har två nivåer;
  - microsoft-direkt-usd har Copilot.
  - Motprov: microsoft.pdf och microsoft-new.pdf ger `business-premium`.

En blandad M365-faktura är alltså ingen kantfall.

**Docstringen och bibeln säger något annat än koden.** Docstringen motiverar strykningen bara med mobil:
«räknar mobilens bytesmål mot det billigaste abonnemanget … Det är planvalet räknat som besparing». Bibeln
säger «Ett lagrat byte mot det billigaste abonnemanget visas inte i rummet (MS-08)». Koden stryker däremot
varje byte på en rad med obekräftad nivå, och det är en räckvidd som ingen av texterna nämner.

**Förexisterande del, redovisad.** På main hade IT-8821-raden redan C1-1:s form för saas: ett byte med
«17% mer» och rakt under «Hur långt ifrån ni ligger kan vi inte säga … Vi sätter varken avstånd eller poäng
här». Lagningen löste motsägelsen genom att ta bort den sanna halvan, alltså bytet.

**Lagning.**
1. Stryk bara där fakturavägens bytesmål är kategorins golv utan känd produkt, i dag mobil. Det bör ske
   genom en deklaration i prisboken och inte genom kategorinamnet.
2. Behåll LFL-bytet för saas.
3. Låt underlaget för en sådan rad inte säga «kan vi inte säga» bredvid bytet. Talet finns per nivå i
   fakturavägen.
4. Lägg till ett MS-test med IT-8821 som motprov: bytet ska stå kvar.

Lagningsriktningen L1 (`a.category !== 'mobil'` som tidig retur) ger tillbaka bytet för IT-8821, både ensam
(`byte_omatt`, 24 566) och med lön, och den fäller **0 tester** (se D1-3).

### D1-2 · [KUND] · infört i 9395d8d7: «Delvis mätt · 0 av 2 fakturor prissatta» under ett byte «mot verifierat listpris»

**Mekanismen.** De två halvorna räknar «mätt» på olika sätt:
- `rumLage` sätter `delvis` när en grupp har `radScore != null` (`lib/lagesregister.js` 255).
  `radScore` räknar också reserven för en rad med byte men utan prisunderlag, till exempel bredband och el.
- Chippet skriver däremot ut `counts.prissatta` (`src/pages/Portfolio/index.js` 1014–1015), som bara räknar
  rader med prisunderlag.

**Vad jag körde.** `sond-rum.mjs`, fall I: mobil 349 × 10 plus Telia bredband 12 000 kr/år med lagrat byte
till 10 200.

| | main | 1f595621 | 9395d8d7 |
|---|---|---|---|
| rum | `byte_i_niva` · 63 | `byte_battre` · 78 · beröm | `byte_omatt` · `delvis: true` · null |
| räknare | 1 prissatt, 1 mottagen | 0 prissatta, 2 mottagna | 0 prissatta, 2 mottagna |

**Renderat** (`bilder-commit/mobil-bredband-byte-desktop.png` och `-mobil.png`). I samma domblock står:
- rubriken «**1 avtal kan skärpas mot verifierat listpris.**»;
- chippet «**Delvis mätt · 0 av 2 fakturor prissatta mot publika listpriser** · ingen samlad poäng».

Arvo Score-kortet säger «0 AV 2 FAKTUROR PRISSATTA» och «Vi kan inte bedöma **alla** era fakturor …».
Radarn säger «Prissatta 0», och kvittot säger «Vägde 0 fakturor mot verifierat publikt listpris».

Main sa «Verifierat · grundat på 1 prissatt faktura», och 1f595621 sa «Verifierat · grundat på era bytesmål».
Chippet «Delvis mätt · 0 av N» är alltså nytt i lagningen. Det säger emot sig självt och rubriken ovanför.
Det strider mot helhetskravet: tal bredvid varandra ska gå ihop.

Förutsättningarna är vanliga: en mobilrad, vilket numera alltid betyder obekräftad, plus ett byte i en
kategori utan prisunderlag, och ingen annan prissatt rad. Mobil plus bredband hos samma operatör är det
typiska telekomrummet.

**Lagning.** `delvis` och chippet ska läsa samma räknare. Riktningen L2 räcker inte ensam
(`delvis = ovissa && counts.prissatta > 0`). Mätt i en kopia (`lagning-tree`, `sond-rum-lagning.json`):
L2 gör `delvis` falskt för fall I. Chippet faller då enligt Portfolio 1016–1017 till «Inte mätt i dag · vi
har inget verifierat jämförelsepris för det ni själva betalar». Det är lika falskt bredvid ett byte mot
verifierat listpris. Den grenen har jag läst i koden men inte renderat.

Med `prissatta` 0 och ett byte bör chippet tala om bytesmålen, som 1f595621:s «grundat på era bytesmål»
gjorde, och inte om ett antal prissatta fakturor. L2 fäller 0 tester (D1-3).

### D1-3 · [VAKT] · infört: sviten ser varken D1-1 eller D1-2

- **MS-08** bygger bara två fall: en mobilrad med byte och en M365-rad **med** bekräftad nivå och byte.
  Ingen test prövar en saas-rad med obekräftad nivå och ett LFL-byte. L1 (strykningen begränsad till mobil)
  fällde **0 av 2727**. Sviten låser alltså inte vad som ska hända med ett korrekt M365-byte, åt något
  håll. Det är C1-6:s form igen: testet matar sitt indata i de två former där lagningen råkar vara rätt.
- **MS-09** och den officiella renderingssonden prövar `delvis` bara med `prissatta ≥ 1` (mobil plus lön och
  mobil plus E3). L2 fällde **0 av 2727**. Chippets text prövas inte i sviten, vilket MS-huvudet deklarerar
  (T6 fällde 0). Sonden har inget fall med `prissatta` 0.

**Lagning.** Lägg till IT-8821 i MS-08 som motprov, och mobil plus bredband med byte i MS-09 och i
renderingssonden.

### D1-4 · [VAKT] · infört: skälet bärs av ett fält ingen läser, och räckvidden står inte skriven

- `grep -rn bytetUndanhallet` ger bara `lib/lagesregister.js` och `tests/mobilscore.mjs`. Ingen yta läser
  fältet. Commitmeddelandet («raden bär skälet … i stället för att tyst sakna det») och docstringen lovar mer
  än effekten: för kunden försvinner bytet utan ett ord.
  - För mobil följer det beslutet («neutralt»), så länge C1-3 inte lagas.
  - Analysmejlet, påminnelserna (`lib/paminnelse.js`, «besparing … analysdatum»), utfallsenkäten
    (`api/cron/send-reminders.mjs` 222) och briefingen läser `should_switch` och `net_saving` ur databasen.
    De lovar alltså fortfarande ett byte som rummet nu tyst stryker.
- Docstringen och bibeln avgränsar strykningen till mobil, men koden gör det inte (se D1-1). En kommentar som
  intygar en räckvidd koden inte har kontrolleras inte av nästa läsare.

## Prövat och redovisat (blockerar inte)

- **Konsumenter före eller utanför `berikaRader`.** I `api/invoice-history.mjs` läser bara
  `buildSwitchTargets` byte-fälten (rad 582), och den körs efter `berikaRader`. `buildCohort`,
  `buildPublicBench`, `buildForecasts`, `buildBranchAnchors` och `buildTackning` läser inte byte-fälten.
  `contractClockFinding` bär ingen besparing.
  - I Portfolio läser bara innehavsraden byte-fälten (`saving`, «Samma nivå kostar», «Ni behåller»). Den
    grindas på `should_switch && net_saving > 0`, som är strukna.
  - Briefingen, påminnelserna, utfallsenkäten, prislarmens mottagarlista och aktiveringen läser databasen
    direkt och påverkas inte av grenen. För mobil är det C1-3, som är förexisterande och inte vanligare. De
    säger nu emot rummet, eftersom rummet slutat visa bytet.
- **C1-4 (85-felet)** syns fortfarande på bytesrader («15% mer» på bredband, «31% mer» på E3). Det blir mer
  sällsynt genom grenen, eftersom mobilbyten stryks. Det är förexisterande.
- **`delvis` med fynd** (fall F) ger chippet «Ur er egen faktura». Med en offertkategori (fall H) och en
  bevakad mobilrad (fall J) är det `delvis: false`, och domens text är sann i båda.
- **Mätinstrumentet var fel en gång.** Min första körning av den officiella renderingssonden gick samtidigt
  med ett sabotage i samma worktree. Den läste källan medan T7 eller L-sabotaget låg inne och rapporterade
  sex fel för «mobil med byte». Omkörd på ett rent träd (`git status` tomt) var den grön. Inga andra sonder
  överlappade sabotagen, eftersom renderingen av commiten, `sond-rum` och `sond-saas` kördes före, och
  lagningsriktningarna kördes i en kopia.

## Sabotage

Varje sabotage kördes med `assert s.count(old) == 1`, hela sviten (`node --test tests/run.mjs`, 2727 tester),
och originalet återställdes i `finally`. `git status --short` var tomt efteråt. Skriptet är `sabotage.py` och
utfallet ligger i `sabotage-utfall.jsonl`.

| ID | Fil | Sabotage | Fällda | Beteende ändrat? |
|---|---|---|---|---|
| T1 | `api/invoice-history.mjs` | `berikaRader` anropar inte `undanhallBytePaOvissNiva` | 1 (MS-08) | ja (C1-1 tillbaka, `sond-rum` fall B på 1f595621) |
| T2 | `lib/lagesregister.js` | undanhall lämnar `net_saving` kvar | 1 (MS-08) | ja, simulerat på kedjan (`sond-kontroll.mjs`): `rum.totalSaving` 7 680 i svaret, läget kvar `oviss_niva` |
| T3 | `lib/lagesregister.js` | samlad poäng trots obekräftad rad | 1 (MS-09) | ja (C1-2 tillbaka) |
| T4 | `lib/lagesregister.js` | `delvis` alltid falskt | 1 (MS-09) | ja |
| T5 | `src/lib/ankarval.js` | spärren efter tilldelningen | 1 (MS-06) | ja (C1-5 lagat) |
| T6 | `src/pages/Portfolio/index.js` | chippet «Delvis mätt» visas aldrig | **0** | ja. Det är deklarerat blint i sviten, och renderingssonden ska fånga det |
| T7 | `api/invoice-history.mjs` | undanhall flyttad före prisunderlaget (ordning) | 1 (MS-08) | ja. Ordningen prövas genom beteende |
| L1 | `lib/lagesregister.js` | lagningsriktning D1-1: strykning bara för mobil | **0** | ja: IT-8821 får tillbaka bytet 24 566 (`sond-rum-lagning.json`) → D1-3 |
| L2 | `lib/lagesregister.js` | lagningsriktning D1-2: `delvis` kräver `counts.prissatta > 0` | **0** | ja: fall I `delvis` true → false → D1-3 |

## Instrument

Allt ligger i `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-c1b/`:

**Sonder**
- `sond-saas.mjs`: fakturavägen till rummet, utfall i `sond-saas-{main,c1a,commit}.json`.
- `sond-rum.mjs` med `jamfor-rum.py`: 15 blandade rum och 9 motprov, utfall i `sond-rum-*.json`.
- `sond-korpus-saas.mjs`.
- `sond-kontroll.mjs`: nivåläsningen på stickprovets rader och T2-simuleringen.
- `kor3.sh` kör en sond mot alla tre träden.

**Rendering**
- `screenshot-granskning.mjs` och `bygg.sh`. Bilder och text ligger i `bilder-commit/` och `bilder-main/`, i 390
  och 1600 px.
- `screenshot-mobilscore-kopia.mjs` är den officiella sonden, och dess bilder ligger i `bilder-officiell/`.
- `fraser.py`.

**Sabotage och lagningsriktningar**
- `sabotage.py` och `sabotage-utfall.jsonl`.
- `lagningsriktning.py` och `kor-lagning.sh` körs mot kopian `lagning-tree/`.
