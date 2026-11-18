commits: d902f5c0
dom: BLOCKERAR
# Femte blicken på c1 (d902f5c0)

Granskat: grenen `claude/fable-5-resume-i60dmd` i slutläget `d902f5c0` mot `origin/main` `1677f2bd`. Hela grenens
diff är läst (`lib/ api/ agents/ src/`, prisboken, bibeln, arbetsordern, de fyra tidigare domarna och alla
commitmeddelanden), med tyngdpunkt på lagningen `d902f5c0`. Jämförelserna gjordes mot tre egna träd:
`main-tree` (`git archive 1677f2bd`), `f1-tree` (`6d2ac35f`) och `l1-tree` (`d902f5c0` med en lagningsriktning).
Sabotagen låg bara i worktree, en i taget. Ingen renderingssond kördes medan ett sabotage låg där, och
`git status` var tomt efteråt.

Sviten på `d902f5c0`: `node --test tests/run.mjs` gav **2731 av 2731 gröna** (`svit-commit.txt`). Den officiella
renderingssonden (kopia med lokal playwright, `bilder-officiell/`) är grön.

## Domen

**BLOCKERAR.** Två [KUND], båda införda i `d902f5c0`, uppfyller stoppregeln:

- **G1-1.** En kombinerad mobilrad utan avläst antal får ett procentuellt avstånd för mobilabonnemang, «Ni betalar
  16% mer än det billigaste verifierade alternativet för mobilabonnemang». Meningen direkt efter säger
  «Mobilabonnemangen bedömer vi inte». Det procentuella avståndet är precis det grundarbeslutet förbjuder. Talet
  är bredbandsdelen delad med hela fakturan.
- **G1-2.** Läsvägen avgör med dagens bredbandspris om analysen hade en mobildel. Prisboken flyttade 21 oktober.
  För en rad som lagrades mellan 18 augusti och 21 oktober säger raden då «Analysens byte för mobilabonnemangen
  visar vi därför inte», fast analysen inte räknade något mobilbyte. En annan rad får «Analysen av fakturan räknade
  fram ett byte till det billigaste publicerade abonnemanget», fast hela bytet gällde bredbandet.

G1-3 är också infört i `d902f5c0`, men räckvidden är obekräftad, och domen vilar inte på det. G1-5 är infört och
har låg vikt. G1-4 är förexisterande och inte vanligare. G1-6 är [VAKT].

| ID | Klass | Status | Kort |
|---|---|---|---|
| G1-1 | [KUND] | infört i d902f5c0 | Kombinerad mobilrad utan `seat_count`: «Ni betalar 16% mer än det billigaste verifierade alternativet för mobilabonnemang … Mobilabonnemangen bedömer vi inte». Procentspärren hänger på underlaget, inte på kategorin |
| G1-2 | [KUND] | infört i d902f5c0 | `struket` och «hela» avgörs med dagens bredbandspris. Rader lagrade 18 aug–21 okt får falska meningar om vad analysen räknade (K3, K4, K5, K6, K3b) |
| G1-3 | [KUND] | infört i d902f5c0, räckvidd obekräftad | Läsvägen sätter alltid `potentialMixedCategories: true`. Ett planvalsbyte på en faktura som analysen inte delade (M1: 6 480 brutto) visas i sin helhet som «Bytet gäller bredbandet på fakturan» |
| G1-4 | [KUND] | förexisterande, inte vanligare | C1-2:s form när mobilraden saknar antal: 100 abonnemang och en lönerad 19 % över golvet ger «Allt är under kontroll», «Era priser står sig» och «Bättre än listpris». Identiskt på main |
| G1-5 | [KUND] | infört i d902f5c0, låg vikt | Kombinerad rad: «1 av 1 fakturor prissatta mot publika listpriser» och «Vägde 1 faktura» bredvid «Vi kan inte bedöma allt ni betalar» och «Mobilabonnemangen bedömer vi inte». Mobildelen är 71 % av fakturan |
| G1-6 | [VAKT] | infört | Sviten låser varken G1-1, G1-2 eller G1-3 (L1 fäller 0 av 2731; MS-13 matar handskrivna tal räknade med dagens prisbok). Kommentarer och commitmeddelandet intygar mer än koden håller |

### Det som håller

Mätt med `sond-rum.mjs` (47 rum, produktionens `buildBranchAnchors → berikaRader → byggRum`, `radMotivering`) mot
main, `6d2ac35f` och `d902f5c0` (`jamfor-sond-rum.txt`), och med `sond-tid.mjs`, som kör fakturavägen
(`computeInvoiceMetrics → computeSecondarySaving → recommend` med stubbad modell och api-lagrets summering som
markerad kopia) fram till lagrad rad och sedan rummet:

- **F1-2 är lagat för rader lagrade med dagens prisbok.** Bredbandsdelen står kvar, med netto K1 5 952, K2 2 976,
  K3 2 976, K4 8 448 och K5 2 976 kr/år. Det är byggarens tal på kronan. I K2 och K1 hålls mobilens 4 800 inne,
  och meningen om det är sann.
- **F1-1 är lagat.**
  - Elbytet (m10) ger 0 prissatta och 1 mottagen, samma som main.
  - I3 (mobil + el) och I4 (mobil + kortterminal) ger 0/2.
  - Rubriken i `byte_omatt` är «1 avtal kan skärpas.», utan källa.
- **`source: 'real-public'` är rätt fråga för varje kategori som i dag kan lagra ett byte.**
  - Mobil, bredband och saas-productivity är `real-public` och räknas. El och kortterminal är `estimated` och
    räknas inte.
  - Molnväxel och löneadmin sätter aldrig `shouldSwitch: true`. Läst i koden: `lib/molnvaxel-recommendation.js` 35
    och 95, `lib/loneadmin-rightsizing.js` 62 och 113.
  - `bytesmalVerifierat` kan alltså inte kalla ett sådant byte prissatt.
- **Räknarna går ihop.** prissatta + mottagna + bevakade = fakturor i alla 47 rum på alla tre träden (`raknare.py`).
- **Motproven mot main.** Rum utan mobilrad ger samma utfall som på main, med två undantag:
  - bredbandsbytet räknas nu som prissatt (m8 0/1 → 1/0, m11 1/1 → 2/0), och det är sant (Tele2:s verifierade
    pris vid samma hastighet);
  - saas-raderna med obekräftad nivå (S7, S8) räknas som mottagna. Det kommer ur tidigare lagningar (MS-07, C1-2).
  - IT-8821-rummen (S, S2, S4, S5) är identiska med main.
- **Valutaspärren.** Byggarens skäl (FX-15, FX-16) håller, och `industry`/`employees` påverkar inte mobilens
  sekundära del: sabotaget S15 fäller 0 och är en no-op per konstruktion, eftersom bredbandsgrenen i
  `computeSecondarySaving` inte läser dem.

## Fynd

### G1-1 · [KUND] · infört i d902f5c0: en kombinerad mobilrad utan antal får «16% mer … för mobilabonnemang» bredvid «Mobilabonnemangen bedömer vi inte»

**Mekanismen.** F1-4 lagades så att `undanhallBytePaOvissNiva` håller inne mobilbytet också utan underlag
(`lib/lagesregister.js` 134). Procentspärren i `radLage` hänger fortfarande på underlaget:
`const ovPct = byte && !(u && u.ovissNiva === true) && …` (167). Utan `seat_count` ger `byggPrisunderlag` null,
alltså `u = null`, och då räknas `ovPct`. Med bredbandsdelen kvar sätter lagningen
`suggested_annual_cost = annual_cost − del`. Talet blir då bredbandsdelen delad med hela fakturan.
`MOTIVERING.byte` kallar det «mer än det billigaste verifierade alternativet för mobilabonnemang», och
`BYTE_BREDBANDSDELEN` läggs till direkt efter.

**Körning.**
- `sond-tid.mjs`, fallen U1 och U2: fakturavägen med `seatCount: null`, sedan rummet.
- `render.mjs`, rummet K3-utan-antal: `bilder-commit/K3-utan-antal-{mobil,desktop}.png`, sett.

| fall | lagrat (brutto) | d902f5c0 | 6d2ac35f och main |
|---|---|---|---|
| U1 · Bas 269×5 + Bredband 250 à 549, utan antal | 3 720 (allt bredband) | «Ni betalar **16% mer** än det billigaste verifierade alternativet för mobilabonnemang. … Bytet gäller bredbandet … **Mobilabonnemangen bedömer vi inte**» | «29% mer», poäng 76, «Sammanvägt starkt» (F1-4) |
| U2 · XL 349×5 + Bredband 250 à 549, utan antal | 8 520 (4 800 mobil + 3 720) | «**14% mer** … för mobilabonnemang» + samma två meningar + «Analysens byte för mobilabonnemangen visar vi därför inte» | «41% mer», poäng 54 |

**Motprov.**
- Samma rader med `seat_count: 5` ger `ovPct: null` och ingen procentmening (K3 och K2, «lagrad idag»).
- Lagningsriktningen L1, i `l1-tree`, lägger till `!a.bytetUndanhallet` i `ovPct`. Den ger U1 och U2
  `ovPct: null`, med resten oförändrat. Instrumentet kan alltså svara annat.

**Varför det blockerar.**
- Meningen och talet är nya i `d902f5c0`, och ytan är den som lagningen ändrar.
- Raden visar ett procentuellt avstånd för mobilabonnemang, och grundarbeslutet säger att rummet inte får göra det.
- Talet mäter inte mobilen: det är bredbandsdelen delad med hela fakturan.
- Raden säger emot sig själv i nästa mening.
- Commitmeddelandet säger att F1-4 är «stängt här» och att «spärren hänger på kategorin, inte på underlaget». Det
  gäller bytet men inte procenttalet.
- Fakturavägen kan lagra en mobilrad utan antal (fjärde blickens F1-4, rum T). Hur ofta en kombinerad rad saknar
  antal i produktion vet jag inte än.

**Lagning.**
- Procentspärren ska hänga på samma sak som indragningen: kategorins deklaration, eller `a.bytetUndanhallet`
  (L1).
- Lägg U1 i MS-13. L1 fäller i dag 0 av 2731, så ingenting låser det.

### G1-2 · [KUND] · infört i d902f5c0: dagens bredbandspris avgör vad raden säger att analysen räknade

**Mekanismen.** `struket: lagrat != null && lagrat > del` (`lib/lagesregister.js` 138) ska betyda att analysen hade
en mobildel. Men `del` räknas med dagens prisbok (`bredbandSpeedBenchmark` läser `tele2Verified` vid anrop) och
`lagrat` med prisboken den dag analysen gjordes. Prisboken flyttade 21 oktober: COAX-familjen gick från
199/239/279 till 239/279/319, alltså +480 kr/år (`agents/recommender/branchindex.js` 224–237). Före 17 juni var den
263/319/335. Bredbandsdelen räknad i dag skiljer sig därför från den lagrade, och skillnaden läses som en mobildel.
Faller dagens del under 500 kr (`lib/secondary-savings.js` 30) blir den `null`. Då tar «hela»-grenen över med
`BYTE_UNDANHALLET`, och den meningen säger att bytet gick «till det billigaste publicerade abonnemanget».

**Körning.** `sond-tid.mjs`: fakturavägen med prisboken i läget 18 aug–21 okt, sedan rummet med dagens prisbok. Det
är samma modulobjekt som `bredbandSpeedBenchmark` läser.

| fall | analysens mobildel | lagrat brutto | rummet på d902f5c0 |
|---|---|---|---|
| K3 · Bas 269×5 + BB 250 à 549 | **0** | 4 200 | 2 976 netto och «… **Analysens byte för mobilabonnemangen visar vi därför inte.**» |
| K4 · Bas 269×5 + Fiber 1000 à 1 199 | **0** | 11 040 | 8 448 netto och samma mening |
| K5 · Com Hem-raderna (mobil) | **0** | 4 200 | 2 976 netto och samma mening |
| K6 · Bas×5 + XL×5 + BB 500 à 699 | **0** | 5 520 | 4 032 netto och samma mening |
| K3b · Bas 269×5 + BB 250 à 279 | **0** | 960 (allt bredband) | byte indraget, «Inget byte rekommenderas i dag», och «**Analysen av fakturan räknade fram ett byte till det billigaste publicerade abonnemanget.** Det visar vi inte här, eftersom vi inte vet vilket abonnemang ni har.» |

Renderat: `bilder-commit/K3-aug-4200-*` och `bilder-commit/K3b-aug-960-*`, sett.

**Motprov.**
- Samma rader lagrade med dagens prisbok ger `struket: false`, och raden säger bara att bytet gäller bredbandet.
- K2, som har en verklig mobildel på 4 800, ger samma mening, och där är den sann. Instrumentet skiljer alltså de två
  fallen åt. Lagningen gör det inte.
- Main visade hela det lagrade bytet med C1-4:s «29% mer», vilket är förexisterande. `6d2ac35f` höll inne hela bytet.

**Följd också åt andra hållet.** En rad lagrad före 17 juni (K2) bar bredbandsdelen 3 432. Rummet visar i dag
3 720, alltså mer än analysens bredbandsdel men mindre än dess totala brutto. Docstringen säger att taket gör att
«en prisbok som rört sig aldrig ger ett större tal än analysen». Det gäller totalen, inte delen (G1-6). Talet är
sant mot dagens prisbok, men fakturavyn och mejlet sa 3 432.

**Varför det blockerar.**
- Båda meningarna påstår något om vad analysen räknade, och det påståendet är falskt.
- Felet är infört i `d902f5c0`.
- Räckvidd: varje kombinerad mobilrad där mobildelen låg på golvet och som lagrades 18 aug–21 okt, eller där
  dagens del hamnar under 500. Antalet i produktion vet jag inte än, eftersom databasen inte går att läsa härifrån.
- Mekanismen återkommer vid varje prisändring hos Tele2. Prisboken har ändrats tre gånger på fyra månader
  (17 jun, 18 aug och 21 okt).
- Kommentaren i `src/lib/rumstext.js` 66–67 säger att BYTE_UNDANHALLET gäller «ingen annan tjänst på fakturan».
  Koden prövar inte det (K3b).

**Lagning.** Avgör analysens mobildel ur det som lagrades, inte ur dagens prisbok.
- **Mätt riktning:** `mobildel = max(0, primärdelens årskostnad ur raderna − lagrat suggested_annual_cost)` ger
  fakturavägens `primaryGross` exakt i alla prövade fall utan mobiltillägg och med `mixed=true` (14 av 14, kolumnen
  `mobildelUrLagrat`).
- **K1 gav 0 i stället för 4 800.** Det lagrade förslaget bär växeltillägget (28 068 = 16 140 + 994 × 12).
  Med `mobileAddonMonthly` inräknat blir det (1 745 + 994) × 12 − 28 068 = 4 800. Det är handräknat och inte
  kört.
- **Säkrast är att fakturavägen lagrar delarna var för sig (C1-3).** Till dess:
  - `struket` ska bara sättas när en mobildel är belagd;
  - «hela»-grenen ska inte påstå «till det billigaste publicerade abonnemanget» när raderna bär en
    bredbandskomponent.
- Lägg K3 lagrad under en annan prisbok i MS-13, liksom K3b.

### G1-3 · [KUND] · infört i d902f5c0, räckvidd obekräftad: ett planvalsbyte blir «Bytet gäller bredbandet»

**Mekanismen.** Extraktionens `potentialMixedCategories` lagras inte i `invoice_analyses`. `sekundarDelVidLasning`
sätter den alltid till `true` (`api/invoice-history.mjs` 356). Fakturavägen använder extraktionens flagga
(`api/test-invoice.mjs` 1259–1262, 1276–1282).
- Säger analysen `false` lagras hela bytet som mobilens planval, utan någon sekundär del.
- Läsvägen delar ändå. Varje rad vars text matchar `/bredband|fiber|internet|adsl|ftth/` och bär en hastighet räknas
  då som fast bredband (`lib/invoice-metrics.js` 27–30 och 34).
- Taket vid det lagrade bruttot gör då att planvalsbytet visas i sin helhet, med `struket: false`.

**Körning.** `sond-tid.mjs`, M1 och M2, med `mixed=false` i fakturavägen. Renderat i `bilder-commit/M1-mixed-false-*`.

| fall | lagrat | rummet på d902f5c0 |
|---|---|---|
| M1 · Telia Jobbmobil 20 GB ×5 + «Telia Mobilt Bredband 5G 300 Mbit/s (3 st)» | 6 480 brutto, allt mobil (sekundär 0) | 5 184 kr/år netto kvar och «**Bytet gäller bredbandet på fakturan**, räknat mot Tele2:s billigaste publicerade pris för samma hastighet …». Ingen mening säger att ett mobilbyte hållits inne |
| M2 · XL ×10 + «Mobilt internet 5G upp till 1 Gbit/s (2 st)» | 12 720 brutto, allt mobil | 4 598 netto, «Bytet gäller bredbandet» |

**Motprov.** Med `mixed=true` delar analysen själv på samma sätt (11 016 och 5 748 sekundärt). Det är förexisterande,
och fakturavyn säger då samma sak. På `6d2ac35f` hölls hela bytet inne.

**Räckvidd.** Det kräver en faktura som extraktionen inte flaggat och som bär en sådan rad med Mbit eller Gbit. Repots
korpus har ingen sådan rad (grep i `tests/ scripts/ agents/ lib/`). Hur ofta det händer vet jag inte än. Fyndet
uppfyller stoppregelns bokstav, men domen vilar inte på det.

**Lagning.** Lagra flaggan eller delarna (C1-3).
- Till dess finns ett avtryck som är mätt i sex fall men inte prövat som allmän regel. När analysen inte delade är
  `annual_cost − suggested_annual_cost` lika med det lagrade bruttot:
  - M1: 32 304 − 25 824 = 6 480;
  - M2: 51 456 − 38 736 = 12 720.
- När analysen delade är det inte lika: K3 ger 22 728 − 16 140 = 6 588 mot 3 720.

### G1-4 · [KUND] · förexisterande, inte vanligare: en mobilrad utan antal och utan byte stoppar inte den samlade poängen

**Mekanismen.** `rum.ovissa` frågar `prisunderlag.ovissNiva` eller `bytetUndanhallet` (`lib/lagesregister.js`
293). En mobilrad utan `seat_count` och utan byte har inget av dem. Den vägs bort i tysthet, och poängen sätts över
resten. Det är C1-2:s form.

**Körning.** `sond-utan-underlag.mjs` mot de tre träden. Rummet U3 är renderat i
`bilder-commit/U3-mobil-utan-antal-lon-*`.
- **U3** (100 mobilabonnemang utan antal + en lönerad 19 % över golvet): `lugn_battre`, poäng 69, «Bättre än
  listpris», `berom: true`. I rummet står «**Allt är under kontroll.**», «Era priser står sig mot verifierat
  listpris» och «Era priser står sig — inga byten på bordet just nu». Det är identiskt på main, `6d2ac35f` och
  `d902f5c0`.
- **Motprov U4** (samma rum med antal): `lugn_omatt`, ingen poäng och inget beröm.

Mobilradens egen text i U3 och U5 säger «Arvo har inget verifierat publikt pris att jämföra den mot i dag». Det är
falskt för mobil, där 269 kr är verifierat, och det är också förexisterande.

**Klassning.** Grenen gör det inte vanligare, så det blockerar inte. Men commitmeddelandet säger «spärren hänger på
kategorin, inte på underlaget». Det gäller bytet, inte poängen.

**Lagning.** `ovissa` ska också gälla en rad vars kategori kräver bekräftad nivå och som saknar poäng, oavsett
underlag. Lägg U3 i MS-09.

### G1-5 · [KUND] · infört i d902f5c0, låg vikt: «1 av 1 fakturor prissatta» bredvid «Vi kan inte bedöma allt ni betalar»

`arPrissatt` räknar den kombinerade raden som prissatt, eftersom bredbandsdelen är ett byte mot verifierat pris. I K3
står därför (`bilder-commit/K3-kombi-*`):
- «Vägde 1 faktura mot verifierat publikt listpris»;
- «Vi jämförde 1 faktura mot verifierat publikt listpris»;
- «Ingen samlad poäng · 1 av 1 fakturor prissatta mot publika listpriser»;
- «Innehavet · 1 prissatt leverantör».

Samma rum säger «Vi kan inte bedöma allt ni betalar mot listpris än», och raden säger «Mobilabonnemangen bedömer vi
inte». Mobildelen är 16 140 av fakturans 22 728 kr/år (71 %). I K3 + E3 står «2 av 2 fakturor prissatta» bredvid
samma mening. `6d2ac35f` räknade raden som mottagen (0/1).

Var för sig går meningarna att försvara. Tillsammans går de inte ihop: alla fakturor är prissatta, men allt går inte
att bedöma (helhetskravet). Domen vilar inte på det.

**Lagning.** Räkna en rad vars mobildel hålls inne som delvis prissatt, och säg det i chippet och kvittot.

### G1-6 · [VAKT] · infört: sviten låser inte lagningens gränsfall, och prosan intygar mer än koden håller

- **L1 fäller 0 av 2731.** Inget test har en kombinerad rad utan antal, så G1-1 kan varken fällas eller lagas med
  sviten som vittne.
- **MS-13 matar handskrivna lagrade tal** (3 720 och 8 520) som är räknade med dagens prisbok och med
  `mixed=true`. Testet kan alltså aldrig se G1-2 eller G1-3: lagrat och läst är lika per konstruktion.
- **S15 är en no-op per konstruktion** och räknas inte. `industry`/`employees` läses inte för mobil.
- **Taket saknas när `gross_saving` är null.** Då blir `del` dagens tal utan tak (N1 i `sond-tid`: ett byte på
  2 976 netto där main visade inget byte). Det går inte att nå i dag:
  - huvudvägen skriver alltid `grossSaving` när `shouldSwitch` är sant;
  - de två monitoring-vägarna lagrar `shouldSwitch: false` (`api/test-invoice.mjs` 1368–1373 och 1582–1587).
  - Docstringen lovar ändå taket villkorslöst.
- **Prosa som intygar mer än koden håller:**
  - docstringen «aldrig ger ett större tal än analysen» (K2 före 17 juni: delen 3 432 → 3 720);
  - kommentaren i `rumstext.js` om «ingen annan tjänst på fakturan» (G1-2);
  - commitmeddelandets «F1-4 … stängt» och «spärren hänger på kategorin» (G1-1, G1-4);
  - MS-huvudets «FÅNGAR: en mobilrad som får avstånd» (G1-1).

## Sabotage

Varje sabotage kördes med `assert orig.count(old) == 1` i worktree, mot hela sviten (2731 tester), och originalet
återställdes i `finally` (`sabotage.py`, utfall i `sabotage-utfall.jsonl`). `git status` var tomt efteråt.
Lagningsriktningen L1 prövades för beteende i kopian `l1-tree`, aldrig i worktree.

| ID | Fil | Sabotage | Fällda | Beteende ändrat? |
|---|---|---|---|---|
| S1 | `lib/lagesregister.js` | taket på delen borta | 1 (MS-13) | ja (taket) |
| S2 | `lib/lagesregister.js` | `struket` alltid sant | 1 (MS-13) | ja |
| S3 | `lib/lagesregister.js` | `struket` alltid falskt | 1 (MS-13) | ja |
| S4 | `api/invoice-history.mjs` | läsvägen delar aldrig (`potentialMixedCategories: false`) | 1 (MS-13) | ja |
| S5 | `lib/lagesregister.js` | spärren kräver underlag | 2 (MS-08, MS-09) | ja |
| S6 | `lib/lagesregister.js` | indragen rad får poäng | 1 (MS-13) | ja |
| S7 | `lib/lagesregister.js` | `ovissa` frågar inte `bytetUndanhallet` | 1 (MS-09) | ja |
| S8 | `api/invoice-history.mjs` | varje bytesmål verifierat | 1 (MS-12) | ja |
| S9 | `lib/lagesregister.js` | `arPrissatt` läser inte `bytesmalVerifierat` | 1 (MS-12) | ja |
| S10 | `lib/lagesregister.js` | procenttal på obekräftad nivå | 2 (MS-11, MS-13) | ja |
| S11 | `api/invoice-history.mjs` | `harRader` alltid falskt | 2 (MS-08, MS-13) | ja |
| S12 | `src/lib/rumstext.js` | mobildelens mening aldrig | 1 (MS-13) | ja |
| S13 | `lib/lagesregister.js` | nettot räknas inte om | 1 (MS-13) | ja |
| S14 | `lib/lagesregister.js` | förslaget räknas inte om | 1 (MS-13) | ja |
| S15 | `api/invoice-history.mjs` | `industry`/`employees` ersatta | **0** | nej, no-op per konstruktion (mobilgrenen läser dem inte); räknas inte |
| L1 | `lib/lagesregister.js` | lagningsriktning G1-1: inget procenttal på en indragen rad | **0** | ja: U1 16 % → inget tal, U2 14 % → inget tal (`sond-tid-l1.json`) → G1-6 |

14 av 15 riktiga sabotage fällde minst ett test. Lagningens mekanik är alltså låst för de fall MS-13 matar. Det som
inte är låst är fallen utanför: ingen antal, en annan prisbok och `mixed=false`.

## Instrument

Allt ligger i `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-c1e/`.

**Sonder**
- `sond-tid.mjs` kör fakturavägen (api-lagrets summering som markerad kopia) med valbar prisbok (i dag,
  18 aug–21 okt, före 17 jun) och valbar `mixed`, sedan rummet. Utfallet ligger i
  `sond-tid-{main,f1,commit,l1}.json`. `visa-tid.py` och `visa-mobildel.mjs` skriver ut jämförelserna.
- `sond-rum.mjs` innehåller den fjärde blickens 36 rum och 11 nya kombinerade rum. Körs med `kor3.sh`, och
  `jamfor.py` ger `jamfor-sond-rum.txt`. `raknare.py` prövar räknarnas invariant.
- `sond-utan-underlag.mjs` prövar G1-4.

**Rendering**
- `render.mjs` och `fraser.py`. Bilderna ligger i `bilder-commit/` i 390 och 1600 px.
- `screenshot-mobilscore-kopia.mjs` är den officiella sonden, med bilder i `bilder-officiell/`.

**Svit, sabotage och bygge**
- Sviten: `svit-commit.txt`.
- Sabotage: `sabotage.py` och `sabotage-utfall.jsonl`. Lagningsriktningen ligger i `l1-tillampa.py`.
- Bygget: `build-commit.log`. `build/` är borttagen ur worktree.
