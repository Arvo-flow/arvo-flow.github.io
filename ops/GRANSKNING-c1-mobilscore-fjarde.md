commits: 6d2ac35f
dom: BLOCKERAR
# Fjärde blicken på c1 (6d2ac35f)

Granskat: grenen `claude/fable-5-resume-i60dmd` i slutläget `6d2ac35f` mot `origin/main` `1677f2bd`. Hela
grenens diff är läst (`lib/ api/ agents/ src/`, prisboken, bibeln, arbetsordern och de tre tidigare domarna),
med tyngdpunkt på lagningen `6d2ac35f`. Jämförelserna gjordes mot två egna träd: `main-tree`
(`git archive 1677f2bd`) och `e1-tree` (`88104b30`). Lagningsriktningar och sabotage vars beteende behövde
renderas lades i en tredje kopia (`sab-tree`, `6d2ac35f`), aldrig i worktree.

Sviten på `6d2ac35f`: `node --test tests/run.mjs` gav **2729 av 2729 gröna** (`svit-commit.txt`).
Den officiella renderingssonden (kopia med lokal playwright, `bilder-officiell/`) är grön.

## Domen

**BLOCKERAR.** Två [KUND] uppfyller stoppregeln:

- **F1-1, infört i 6d2ac35f.** `arPrissatt` räknar varje byte som prissatt «mot verifierat publikt listpris».
  Elbytet räknas mot Arvos eget säsongsindex, och fakturavyn kallar det «Arvo bedömer». I rummet blev
  «Vägde 0 fakturor» därför «Vägde 1 faktura mot verifierat publikt listpris», och domen fick «Vi jämförde 1
  faktura mot verifierat publikt listpris».
- **F1-2, infört i 9395d8d7 och kvar.** Byggarbeslutet E1-2 håller tillbaka ett korrekt, verifierat
  bredbandsbyte på kombinerade fakturor. Rummet säger då «Inget byte rekommenderas i dag» och «Inga byten på
  bordet just nu». Raden förklarar det med att bredbandsdelen «kan vi inte skilja ut i efterhand». Det
  påståendet är mätt falskt: produktionens egna funktioner skiljer ut delen vid läsning, på kronan, i 5 av 5
  fall. Byggarens skäl (valutaspärren) motsägs av FX-15 och FX-16.

Ett tredje [KUND] (F1-3) är infört, men det når bara rader som lagrades före 12 augusti, och domen vilar inte på
det. F1-4 och F1-5 är förexisterande. F1-6 och F1-7 är [VAKT].

| ID | Klass | Status | Kort |
|---|---|---|---|
| F1-1 | [KUND] | infört i 6d2ac35f; vanligare genom 1f595621–88104b30 | Elbyte (mot `EL_BENCHMARK_KWH`, «Arvo bedömer») kallas «prissatt», «Vägde 1 faktura mot verifierat publikt listpris», «Vi jämförde 1 faktura mot verifierat publikt listpris». I rum med mobil står dessutom «1 avtal kan skärpas mot verifierat listpris». Main sa «Vägde 0» |
| F1-2 | [KUND] | infört i 9395d8d7, texten omskriven i 6d2ac35f | K3–K5 (mobil på golvet + bredband): ett verifierat bredbandsbyte på 2 976, 8 448 och 2 976 kr/år netto försvinner. Rummet säger «Inget byte rekommenderas i dag» och «Inga byten på bordet just nu», och raden säger «den kan vi inte skilja ut i efterhand», vilket är mätt falskt (5/5) |
| F1-3 | [KUND] | infört i 6d2ac35f; räckvidd obekräftad | «Bytet ovan är räknat mot listpriset för det som står på fakturan» på en saas-rad utan radtexter, vars byte är räknat mot kategorins golv (16 060 = 1 606 × 10) |
| F1-4 | [KUND] | förexisterande, inte vanligare | Mobilrad utan avläst antal och med lagrat byte: «23% mer», poäng 66, «Sammanvägt godkänt». Spärren hänger på `prisunderlag`, som kräver `seat_count`. Grundarbeslutet gäller inte där |
| F1-5 | [KUND] | förexisterande, inte vanligare mot main | Rum där bytesraden ligger 15–21 % över: «Sammantaget står ni starkt», «Marknadsläge Bättre». Det gäller IT-8821 (75) och bredbandsbytet (78) |
| F1-6 | [VAKT] | infört | Sviten låser varken F1-1, F1-2 eller E1-5-lagningen. L1 fäller 0, S5 fäller 0 och S6 fäller 0. MS-11:s `indexOf(a) < indexOf(b)` är grön när grenen är borta (−1 < n). MS-11 låser dessutom den falska satsen ordagrant |
| F1-7 | [VAKT] | infört | Kommentarer och prosa intygar invarianter koden inte håller: valutaspärren som skäl, MS-huvudets «FÅNGAR», bibelns «Ett lagrat mobilbyte visas inte i rummet» och 1f595621:s commitmeddelande |

### Det som håller

Mätt med `sond-rum.mjs` (36 rum, produktionens `buildBranchAnchors → berikaRader → byggRum`) mot main och
88104b30, och med renderingarna:

- **E1-1 är lagat för M365.** IT-8821 ensam ger «Vägde 1 faktura» och «1 prissatt», med bytet 24 566 kr/år
  kvar, identiskt med main. S2 (IT-8821 + lön) ger 2 prissatta. S3 (IT-8821 + mobil) ger `byte_omatt`, 1
  prissatt och 1 mottagen.
- **E1-5 är lagat för IT-8821.** Underlaget säger «Bytet ovan är räknat mot listpriset för det som står på
  fakturan», och «Vi sätter varken avstånd eller poäng här» står inte längre bredvid bytet
  (`bilder-commit/S-it8821-*`).
- **Räknarna går ihop.** prissatta + mottagna + bevakade = fakturor i alla 36 rum, på main och på commit.
- **`rum.ovissa` träffar rätt rum.** 21 rum på commit saknar poäng: alla som har en obekräftad rad utan dom,
  plus m4, m5 och m6, som saknar underlag också på main. IT-8821-rummen (S, S2, S4, S5) behåller sin poäng.
- **Mobilrummen A–Q (med antal) är lagade.** De visar inget avstånd, ingen poäng och inget beröm.

## Fynd

### F1-1 · [KUND] · infört i 6d2ac35f: ett elbyte kallas prissatt «mot verifierat publikt listpris»

**Mekanismen.** `arPrissatt` (`lib/lagesregister.js` 227–231) svarar ja för varje rad med
`should_switch && net_saving > 0`, oavsett vad bytet är räknat mot. Docstringen säger «ett byte som visas».
Byggaren prövade det för bredband (Tele2:s verifierade pris vid samma hastighet) och M365 (like-for-like).

El går en annan väg. `api/test-invoice.mjs` 1680–1694 lagrar `should_switch` ur `computeElRecommendation`, som
jämför mot `EL_BENCHMARK_KWH` (`lib/el-recommendation.js` 44–50): «marknadsgenomsnittet för välförhandlade
spotprisavtal». Det är hårdkodade säsongstal, och prisbokens el-post har `source: 'estimated'`. Elbytets egen
text säger «Arvo bedömer att ett välförhandlat spotprisavtal … bör ligga kring X kr/kWh» och «Faktisk
årsförbrukning kan avvika ±20–30 %» (`lib/el-recommendation.js` 132 och 136–137). Bytet är alltså en bedömning,
inte ett verifierat publikt listpris. Rummet läser `counts.prissatta` i tre meningar som alla säger
«mot verifierat publikt listpris»:
- kvittot (`Portfolio` 720–721);
- domens `jamforde` (767–768);
- chippet (1021–1022).

**Vad jag körde.**
- `sond-rum.mjs` på tre lägen (`jamfor-sond-rum.txt`).
- `render.mjs` med elraden så som el-grenen lagrar den: brutto 46 000, netto 36 800, ur EL-REC-01
  (`bilder-main/EL*`, `bilder-commit/EL*`).

| rum | main | 6d2ac35f |
|---|---|---|
| EL1 · elbyte ensam | «Vägde **0** fakturor», ingen «Vi jämförde», chip «grundat på era bytesmål», «INNEHAVET · 0 PRISSATTA» | «Vägde **1** faktura mot verifierat publikt listpris», «**Vi jämförde 1 faktura mot verifierat publikt listpris**», chip «grundat på 1 prissatt faktura · publika listpriser», «1 PRISSATT» |
| EL2 · elbyte + lön | «Vägde 1 faktura» (lönen) | «Vägde **2** fakturor», «Vi jämförde 2 fakturor» |
| EL3 · mobil + elbyte | `byte_i_niva`: «Vi jämförde 1 faktura» syftar på mobilraden, som då var prissatt mot Tele2 | `byte_omatt`: «**1 avtal kan skärpas mot verifierat listpris.** Vi jämförde 1 faktura mot verifierat publikt listpris», och den faktura som avses är nu elraden. Chippet säger «grundat på era bytesmål · publika listpriser · ingen samlad poäng» |

I sonden: m10 (elbyte) ger 0/1 → 1/0 prissatta/mottagna, och I3 (mobil + elbyte) ger samma tal men med elraden
som den prissatta.

**Varför det blockerar.**
- **Kvittot.** «Vägde 0 fakturor mot verifierat publikt listpris» var sant om ett elrum på main. Grenen gör det
  falskt. Kvittot är arbetets bevis, och regel 3 räknar rätt siffra med fel proveniens som fel.
- **Två ytor säger olika.** Fakturavyn för samma faktura säger «Arvo bedömer», och rummet säger «verifierat
  publikt listpris».
- **Vanligare genom grenen.** I EL3 når elbytet `byte_omatt`-rubriken «kan skärpas mot verifierat listpris»
  bara därför att grenen tar bort rummets poäng när det finns en mobilrad. På main var `byte_omatt` i praktiken
  onåbart, eftersom en bytesrad alltid har `radScore`.
- **Räckvidden är stor.** El är Nivå 1, och el-grenen lagrar ett byte på varje elfaktura vars energipris ligger
  över indexet.

Det som fanns redan på main, och som inte bär domen:
- radens «billigaste verifierade alternativet för elavtal»;
- chippets «publika listpriser».

**Syskonfall, läst men inte kört:** kortterminal utan rörliga avgifter går förbi `requires_quote`-grinden
(`recommend.js` 1836–1864) och vidare till den allmänna vägen med ett `estimated` golv. Fakturavyn märker det
som «märkt branschestimat — inget listprisanspråk» (`api/test-invoice.mjs` 2175–2176). I4 i sonden (mobil +
kortterminalbyte) beter sig som EL3.

**Motprov.**
- Ett bredbandsbyte (m8) går från 0 till 1 prissatt, och det är sant, eftersom målet är Tele2:s verifierade
  pris.
- Lagningsriktningen L1 (inget byte räknas som prissatt i el och kortterminal) ger EL1 tillbaka «Vägde 0» och
  lämnar m8 på 1 (`bilder-sab/EL1-*`, `sond-rum-sab.json`: m10 1/0 → 0/1, I3 1/1 → 0/2, I4 1/1 → 0/2).
  Instrumentet kan alltså svara annat.

**Lagning.** Ett byte är prissatt mot verifierat listpris bara när dess mål är ett verifierat publikt
listpris. Proveniensen ska följa bytet, antingen som en deklaration per kategori i prisboken eller som
`jamforelseKalla.listprisanspraak` lagrad på raden (den räknas redan i `api/test-invoice.mjs` 2153–2154).
`arPrissatt`, rubriken i `byte_omatt` och chippet ska läsa samma fråga.
- L1 räcker inte ensam. I EL3 står då «Vägde 0 fakturor» bredvid elbytet och chippet säger fortfarande
  «publika listpriser».
- Elbytet behöver en egen proveniensmening, i fakturavyns ord: «Arvo bedömer».
- Lägg el och kortterminal i MS-10/MS-11.

### F1-2 · [KUND] · infört i 9395d8d7, kvar i 6d2ac35f: ett korrekt bredbandsbyte hålls inne, och rummet säger att inget byte rekommenderas

**Byggarbeslutet (E1-2), prövat.** Raden lagrar bara summan, och byggaren säger att en omräkning vid läsning
«hade gått förbi fakturavägens spärrar (valutaspärren m.fl.)». Därför hålls hela bytet inne, och raden får
BYTE_UNDANHALLET. Pröva två saker: att förklaringen är sann i varje fall som når den, och att skälet håller.

**1 · Delen går att skilja ut i efterhand.** Rummet läser redan radens `line_items_json` (`_rader`,
`api/invoice-history.mjs` 182 och 353). `sond-skilj.mjs` kör produktionens `computeInvoiceMetrics(rader,
'mobil', true) → computeSecondarySaving` på just de raderna, vid läsning (`sond-skilj-commit.json`):

| fall | lagrat brutto (primär + sekundär) | sekundär vid läsning | lika |
|---|---|---|---|
| K1 · XL 349×5 + Fiber 500 à 899 + växel + IP | 12 240 (4 800 + 7 440) | 7 440 | ja |
| K2 · XL 349×5 + Bredband 250 à 549 | 8 520 (4 800 + 3 720) | 3 720 | ja |
| K3 · Bas 269×5 (golvet) + Bredband 250 à 549 | 3 720 (0 + 3 720) | 3 720 | ja |
| K4 · Bas 269×5 + Fiber 1000 à 1 199 | 10 560 (0 + 10 560) | 10 560 | ja |
| K5 · raderna ur `comhem-mobil-bredband-kombinerad.pdf` | 3 720 (0 + 3 720) | 3 720 | ja |
| motprov · ren mobil XL×5 och XL×10 | — | **null** | — |

Fakturavyn delar dessutom upp samma analys i «Besparing: Mobilabonnemang −0 kr/år | Bredband 250 Mbit −3 720
kr/år» (`src/pages/TestaFaktura/index.js` 2063–2074; läst i koden, inte renderat). Satsen «den kan vi inte
skilja ut i efterhand» är alltså falsk.

**2 · Valutaspärren kan inte ha slagit till på en rad som når strykningen.** En spärrad faktura får:
- primärbytet rivet: `recommend.js` 1563–1576, `shouldSwitch: false`;
- den sekundära delen satt till null: `api/test-invoice.mjs` 1276;
- och därmed ingen override, eftersom den kräver en sekundär del större än 0 (1942).

FX-15 och FX-16 låser detta och är gröna på 6d2ac35f (`svit-commit.txt`). Varje rad med lagrat
`should_switch: true` har alltså redan passerat valutaspärren. Sanitetskontrollen (1981–1991) läser bara den
primära `savingPerYear`, så den sekundära delen prövades aldrig där, inte ens vid skrivning. Finansgrindarna
gäller summan, och den har raden redan klarat. Skälet håller inte för något fall som når strykningen.

**3 · Följderna, renderade** (`bilder-commit/K3-kombi-*`, med motprovet `bilder-main/K3-kombi-*`). För K3
ligger mobilabonnemangen på det billigaste publicerade priset, och hela bytet är bredband vid samma hastighet
mot Tele2:s verifierade listpris. På 6d2ac35f står:
- domen: «**Inget byte rekommenderas i dag.** Vi kan inte bedöma alla era fakturor mot listpris än»;
- tally: «**Inga byten på bordet just nu.**»;
- kvittot: «Vägde 0 fakturor mot verifierat publikt listpris»;
- raden: «Analysen av fakturan räknade fram ett byte, men vi visar det inte här. Bytet för den här kategorin
  räknas mot den billigaste publicerade produkten … **och den kan vi inte skilja ut i efterhand.**»

Main visade «+2 976 kr/år», men med en felaktig text: «29% mer än det billigaste verifierade alternativet för
mobilabonnemang». Den texten är förexisterande och hör till C1-4 och kombinationen.

**Klassning.** [KUND]. Domen «Inget byte rekommenderas i dag» och «Inga byten på bordet» är fel för K3–K5:
Arvos egen analys rekommenderar ett verifierat byte på samma faktura, och fakturavyn visar det. Satsen om att
delen inte går att skilja ut är falsk. Felet är infört av grenen, eftersom strykningen kom i 9395d8d7. Tystnad
är sista utväg (regel 4), och här finns fakta.

Byggaren kallar det en kostnad tills C1-3 är byggd. Kostnaden är inte nödvändig: delen går att räkna vid
läsning med fakturavägens egna funktioner. I K1 och K2 är det rätt att hålla inne mobilandelen (4 800 kr
planval), men bredbandsandelen (7 440 respektive 3 720 brutto) är det inte.

**Hur ofta.** Det är inte mätt i produktion, eftersom databasen inte går att läsa härifrån. Det finns fyra
`*-mobil-bredband-kombinerad.pdf` och 30 kombinerade fixturer. Obekräftat är fortfarande att extraktionen ger
`potentialMixedCategories: true` för dem.

**Lagning.**
1. Räkna den sekundära delen vid läsning ur `_rader` med `computeInvoiceMetrics` och `computeSecondarySaving`.
   Gör det bara när raden har ett lagrat `should_switch: true`.
2. Taklägg delen vid den lagrade bruttobesparingen, så att en prisbok som rört sig aldrig ger ett större tal än
   fakturavägen lagrade.
3. Visa den delen som radens byte och stryk bara resten.
4. BYTE_UNDANHALLET ska bara stå där en mobilandel faktiskt strukits. Satsen «kan vi inte skilja ut» ska bort.
5. Lägg K3 som motprov i MS-08: bredbandets 3 720 brutto står kvar. Lägg K1 som syskonfall: 4 800 stryks och
   7 440 står kvar.

### F1-3 · [KUND] · infört i 6d2ac35f, räckvidd obekräftad: «räknat mot listpriset för det som står på fakturan» om ett byte mot kategorins golv

Den nya grenen `p.ovissNiva && a.lage?.kod === 'byte'` (`Portfolio` 1502–1505 och 1524–1526) säger: «Bytet
ovan är räknat mot listpriset för det som står på fakturan». Det är sant för IT-8821 (like-for-like). Det är
falskt för S6, en saas-rad utan radtexter vars lagrade byte 16 060 = 1 606 × 10, alltså Business Standards
golv gånger platserna (`bilder-commit/S6-saas-utan-rader-*`). Main sa en annan falsk mening där: «Vi sätter
varken avstånd eller poäng här».

**Räckvidd.** Dagens kod kan inte lagra ett sådant byte (lfl-grinden, 2026-08-12). Det gäller bara äldre rader
som fortfarande är senast i sin grupp, och om sådana finns vet jag inte än. Fyndet uppfyller stoppregelns
bokstav, men domen vilar inte på det.

**Lagning.** Kräv minst en nivårad i `_rader` (samma läsare som like-for-like) för grenen.

### F1-4 · [KUND] · förexisterande: en mobilrad utan avläst antal visar avstånd, poäng och byte

Spärren bor i `prisunderlag.ovissNiva`, och `byggPrisunderlag` returnerar null utan ett heltal i `seat_count`
(`lib/prisunderlag.js` 54 och 64). Då gör `undanhallBytePaOvissNiva` ingenting (`lib/lagesregister.js` 127).

Fakturavägen kan lagra ett mobilbyte utan antal. `jamforelseSkala` tar då antalet anställda
(`lib/jamforelsekalla.js` 63), och mail-in sätter 10. Rum T (`bilder-*/T-mobil-byte-utan-antal-*`) visar, på
main och på commit lika:
- «Ni betalar **23% mer** än det billigaste verifierade alternativet för mobilabonnemang»;
- poäng 66 och «Sammanvägt godkänt»;
- bytet +7 680 kr/år.

Det är grundarbeslutets exempel, och grenen gör det inte vanligare. Hur många mobilrader som saknar antal är
inte mätt. Det blockerar inte, men det hör till c1:s uppdrag.

**Lagning.** Stryk på kategorins deklaration (`kraverBekraftadNiva` och `bytesmalMotKategorigolv`) när nivån
inte är bekräftad, oavsett om det finns ett underlag. Lägg T i MS-08.

### F1-5 · [KUND] · förexisterande: «Sammantaget står ni starkt» över ett enda avtal som kostar mer än listpris

Rummet med bara IT-8821 ger poäng 75, `byte_battre`, «Sammantaget står ni starkt — men 1 avtal kostar mer än de
borde», «Sammanvägt starkt» och Marknadsläge «Bättre». Den enda fakturan ligger då 20 % över sitt eget
like-for-like-listpris. Bredbandsbytet (m8) ger 78 och samma ord.

Det beror på att `radScore` räknar (a−s)/a, samma familj som C1-4. Rummet är identiskt på main. Mot 88104b30 är
det tillbaka för IT-8821, men inte vanligare än på main. Det blockerar inte.

### F1-6 · [VAKT] · infört: sviten låser inte det lagningen ändrar

- **L1 fällde 0 av 2729.** Den räknar elbytet som oprissatt, och ingen MS-, RR- eller LR-test har ett el- eller
  kortterminalbyte i rummet.
- **S5 fällde 0.** Sabotaget dödar u-slut-grenen med `&& false` och låter texten stå kvar. MS-11 prövar källtext.
- **S6 fällde 0.** Sabotaget tar bort u-not-grenen, och IT-8821 renderar åter «Vi sätter varken avstånd eller
  poäng här» bredvid bytet (`bilder-sab/S-it8821-desktop.txt`). Orsaken är MS-11:s
  `src.indexOf(": p.ovissNiva && a.lage?.kod === 'byte'") < src.indexOf('Vi sätter varken …')`: den är grön när
  grenen saknas, eftersom −1 < n.
- **MS-11 låser BYTE_UNDANHALLET ordagrant**, alltså också den falska satsen i F1-2.
- **Ingen test kör den kombinerade fakturavägen in i rummet.**
- **Den officiella renderingssonden är grön** utan ett el-rum och utan ett kombinerat rum.

**Lagning.** Pröva genom renderade rum eller beteende, inte genom `indexOf`. Lägg EL1 och K3 i sviten och i
sonden.

### F1-7 · [VAKT] · infört: kommentarer och prosa intygar invarianter koden inte håller

- **Valutaspärren som skäl.** Docstringen i `lib/lagesregister.js` 115–119 (funktionen 125) och arbetsorderns E1-2 säger att en
  omräkning «hade gått förbi fakturavägens spärrar (valutaspärren m.fl.)». FX-15 och FX-16 visar motsatsen
  (F1-2, punkt 2).
- **«Ett lagrat mobilbyte visas inte i rummet».** Det står i bibelns tillägg och i MS-huvudets «FÅNGAR: en
  mobilrad som får avstånd, poäng …». 1f595621:s commitmeddelande säger «inget avstånd, ingen poäng». Allt
  detta är falskt för rum T (F1-4).
- **«ett byte som visas».** `arPrissatt`:s docstring säger att en rad med ett sådant byte är prissatt, och
  rummet läser «prissatt» som «mot verifierat publikt listpris». Det håller inte för el (F1-1).

## Sabotage

Varje sabotage kördes med `assert orig.count(old) == 1` i worktree, mot hela sviten (2729 tester), och
originalet återställdes i `finally`. Skriptet är `sabotage.py` och utfallet ligger i `sabotage-utfall.jsonl`.
`git status` var tomt efteråt. Ingen renderingssond kördes medan ett sabotage låg i worktree. Beteendet för S6
och L1 mättes i kopian `sab-tree` (`sab-beteende.py`, `sab-kor.sh`).

| ID | Fil | Sabotage | Fällda | Beteende ändrat? |
|---|---|---|---|---|
| S1 | `lib/lagesregister.js` | `arPrissatt` utan bytesgren | 2 (MS-10, MS-11) | ja (E1-1 tillbaka) |
| S2 | `lib/lagesregister.js` | `ovissa` frågar inte `arPrissatt` | 1 (MS-11) | ja (IT-8821 utan poäng) |
| S3 | `lib/lagesregister.js` | obekräftad rad utan byte räknas som prissatt | 5 (RR-01, MS-07..10) | ja |
| S4 | `src/lib/rumstext.js` | BYTE_UNDANHALLET läggs aldrig till | 1 (MS-08) | ja |
| S5 | `src/pages/Portfolio/index.js` | u-slut-grenen `&& false`, texten kvar | **0** | ja, läst i koden: IT-8821 får «Hur långt ifrån ni ligger kan vi inte säga» → F1-6 |
| S6 | `src/pages/Portfolio/index.js` | u-not-grenen borttagen | **0** | ja, renderat: «Vi sätter varken avstånd eller poäng här» bredvid IT-8821:s byte → F1-6 |
| L1 | `lib/lagesregister.js` | lagningsriktning F1-1: byte i el/kortterminal är inte prissatt | **0** | ja: EL1 «Vägde 1» → «Vägde 0», m10 1/0 → 0/1, I3 och I4 1/1 → 0/2, m8 orörd → F1-6 |

## Instrument

Allt ligger i `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-c1d/`.

**Sonder**
- `sond-rum.mjs` (tredje blickens 36 rum), `kor3.sh` och `jamfor.py`. Utfallet ligger i
  `sond-rum-{main,e1,commit,sab}.json` och `jamfor-sond-rum.txt`.
- `sond-kombi.mjs` (tredje blickens fakturaväg, med api-lagrets summering som markerad kopia), med utfall i
  `sond-kombi-*.json`.
- `sond-skilj.mjs`: delen vid läsning, med utfall i `sond-skilj-commit.json`.

**Rendering**
- `render.mjs` och `fraser.py`. Bilder och text ligger i `bilder-main/`, `bilder-commit/` och `bilder-sab/`, i
  390 och 1600 px, och jämförelsen i `fraser-main-commit.txt`.
- `screenshot-mobilscore-kopia.mjs` är den officiella sonden, och dess bilder ligger i `bilder-officiell/`.

**Svit och bygge**
- Sviten: `svit.sh`, med utfall i `svit-commit.txt`.
- Bygget: `bygg.sh`. `build/` är borttagen ur worktree.
