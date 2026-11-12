commits: 822e9d43b2385598d1191ec89dec3028e8ff5281
dom: BLOCKERAR

# Andra blicken på S1 (åttonde linsen)

Uppdraget var att hitta var det gröna är osant i påståendet i ops/KORPLAN-VAG1.md, S1. Granskningen är klar.

**Dom: BLOCKERAR.** Fyra [KUND], alla återskapade med körningar:
- **K-1** (förexisterande, inom PR:ens syfte): rummets «möjlig nettobesparing» räknar in en lagrad mobilrads belopp
  när raden saknar bytesflagga (11 328 kr i stället för 3 648), medan `lagratByte` håller samma rad. Main lagrar
  sådana rader (ett abonnemang à 299 kr: `net_saving 288` utan flagga).
- **K-2** (infört): «Därför räknar vi ingen besparing» står i fakturavyn direkt under ett fynd på samma faktura
  med 898 kr att kräva tillbaka och 5 388 kr/år.
- **K-3** (vanligare): «Priset baseras på verifierade offentliga listpriser … Vid genomfört byte bekräftas
  slutpriset i offert» under «Hur vi räknar» på varje mobilfaktura, i samma vy som «Ingen jämförelse mot listpris».
- **K-4** (infört): dörren säger «Tele2 Företags lägsta listpris för ett mobilabonnemang: 269 kr/mån»; prisboken
  bär «lägsta publicerade 24-mån-pris» och namnger ett billigare publicerat abonnemang.

Det som håller: ingen väg gav en mobilfaktura ett byte, ett procenttal eller en poäng i fakturasvaret, den lagrade
raden, rummets rader, analysmejlet, svarsmejlet, aktiveringsmejlet, påminnelsen, enkäten eller briefen, i de fall
jag körde (modellens ja, nej, nej med belopp och `optimize`; med och utan antal; kombinerad; delbetalningsrad).
Prislarmet kan inte ge ett mobilprocent. Motproven (bredband, IT-8821 och tre varianter) har samma tal och samma
texter i varje yta som på main. Fyra [VAKT] mergas och lagas framåt (V-1..V-4).

K-2, K-3 och K-4 är fel i meningar som S1 själv skrev eller gjorde vanligare. Det är regel 13:s form: en förklaring
prövad mot de fall den byggdes för, inte mot varje fall den visas för. Enligt körplanen är detta den första
blockeringen i rad för S1.

## Iakttagelser i ordning

1. Grenens spets d4a706b2; S1-commitarna 16448e22, f522602a, 9c2991d1, 822e9d43.
   9c2991d1 rör 24 filer, 822e9d43 rör 14. Arbetet sker i en egen worktree.
2. Sviten på spetsen, avläst: `CI=true node --test tests/run.mjs` gav tests 2765, pass 2765, fail 0,
   cancelled 0.
3. Jämförelseinstrument: main (e5733f3a) i en egen worktree, med fakturakedjans laddarkrok och stubbar
   kopierade dit, och en körare (`korj.mjs` i scratchpaden) som är kor.mjs med reserv för `delaRummet` och
   `svarsKort` där main saknar dem. Samma fall-JSON körs genom båda träden.
4. Prislarmet i fakturasvaret (`detectPriceAlert`) kan inte ge ett procenttal på en mobilfaktura: 21 fall
   (sju radtexter, bland dem «Business Standard», «Premium», «E3», gånger Tele2, Telia, Microsoft) gav
   `null`. Motprov: saas-productivity Business Standard à 200 kr gav `percentOver 25`. Mitt första motprov
   (160 kr) låg under bokens 160,58 och gav `null`; det var instrumentet, inte koden.
5. Svarscachen bär driftsättningens sha i nyckeln (`pdf:result:v32:${deploySha}`, rad 530), så ett svar
   från koden före S1 serveras inte efter driftsättning. Ingen bump behövs.
6. Modellens tredje svar, `optimize`, ingår inte i instrumentets matris (modellen svarar bara ja eller
   nej i `fall.mjs`). Kört genom handlern på spetsen (xl349 med och utan antal, comb-01): `recommendationType
   'no_action'`, `shouldSwitch false`, `grossSaving 0`, lagrad rad utan byte, mejlen med PLANVAL_BESKED.
   Men svaret bär kvar `optimizationSaving 6000`, `optimizationFee 1200`, `optimizationNetSaving 4800` och
   modellens `switchSteps` («Säg upp de två oanvända abonnemangen hos Tele2.»). Samma fall på main gav
   `optimize`, byte 9 600 kr och poäng 66. Se fynd V-1.

## Fynd

### K-1 · [KUND], förexisterande men inom PR:ens syfte: rummets «möjlig nettobesparing» räknar in en lagrad mobilrads belopp

`undanhallBytePaOvissNiva` (lib/lagesregister.js:126) returnerar före rensningen när `should_switch` inte är
sant, så en lagrad mobilrad med `should_switch false` och `net_saving > 0` behåller beloppet i rummet.
`rumLage` summerar `totalSaving` över varje grupps `net_saving` utan villkor (lib/lagesregister.js:328), och
Portfolio skriver ut talet som «Möjlig nettobesparing … kr per år · N byte förberedda» och «… kr/år i möjlig
nettobesparing ligger på bordet» så snart rummet har ett annat byte (src/pages/Portfolio/index.js:838, 1091).
`lagratByte` nollar samma rad (`utanDom` → `net_saving null`), så rummet och mejlen säger olika om samma rad.

Återskapat med rummets egna funktioner (`berikaRader` → `byggRum`, scratchpad `rumsond.mjs`, laddarkroken):
- mobilrad (`should_switch false`, `net_saving 7680`) + bredbandsbyte (3 648): grenen ger `totalSaving 11328`,
  `hasSwitchAction true`, `lage byte_omatt`; `lagratByte` ger `net_saving null` för mobilraden. Rätt tal är 3 648.
- motprov: bredbandsbytet ensamt ger `totalSaving 3648`. Instrumentet ser alltså skillnaden.
- main ger samma 11 328 för samma rum. Felet är inte infört och inte vanligare.

Raden finns i verkligheten, mätt genom hela handlern på main (`korj.mjs` mot main-worktreen):
- ett abonnemang Jobbmobil M à 299 kr, modellens ja: minimigränsen nollar bytesflaggan men inte beloppet; lagrad
  rad `should_switch false`, `gross_saving 360`, `net_saving 288`, `suggested_annual_cost 3228`;
- tio abonnemang à 299 kr, modellens nej med `savingPerYear 9600`: lagrad rad `should_switch false`,
  `net_saving 7680`.
PR:ens eget instrument bygger samma radform (FV-L, id 4712) och prövar den bara för mejlen; inget test läser
`rum.totalSaving` för den, och den körs bara ensam i sitt rum, där inget annat byte tänder siffran.

Klass: ett tal kunden läser blir fel → [KUND]. Förexisterande. Påståendet som prövas säger att rummet inte visar
ett lagrat mobilbyte och att ingen yta bär en mobilbesparing, och 822e9d43 rensar just den här radformen för
mejlen men inte för rummet. Felet ligger alltså inom PR:ens eget syfte, och enligt avgränsningen 22 okt («synliga/
blockerande för PR:ens eget syfte») blockerar det. Någon avläsning av att raden saknas i produktionen finns inte,
och utan den räknas felet som synligt. Den allmänna formen (en bredbandsrad utan flagga räknas också in, motprovet
ovan ger 11 328) är förexisterande och utanför PR:en; den loggas för en egen PR.

### K-2 · [KUND], infört: «Därför räknar vi ingen besparing» står under ett fynd i kronor på samma faktura

PLANVAL_BESKED.text (lib/lagesregister.js, speglad i src/lib/diagnos.js ANALYSRUBRIKER.planval) är ny i 9c2991d1:
«Produkterna i kategorin har olika listpris, och vi vet inte vilken produkt ni har. Därför räknar vi ingen
besparing och säger inget om ert pris.» Forensiken räknas fristående och följer med svaret (`leadFinding`,
`fyndSkal kundens_egna_rader`), så en mobilfaktura med en kostnad Arvo själv räknat fram visar båda.

Återskapat genom handlern och renderat (scratchpad `sond5-fall.mjs` och en temporär kopia av
screenshot-planvalsgrind.mjs med Playwright, 390 och 1600 px, bilden läst): xl349 med raden «Delbetalning
iPhone 15 Pro, månad 38 av 36» à 449 kr, modellens ja och nej. Fakturavyn visar överst «Avbetald hårdvara — ni
betalar för utrustning ni redan äger · 898 kr · REDAN BETALT — KRÄV TILLBAKA 898 kr · 449 kr/mån löper vidare
tills posten är borta — 5 388 kr/år», och direkt under det rutan «Ingen jämförelse mot listpris. … Därför räknar
vi ingen besparing och säger inget om ert pris.» Lägets rubrik är `planval`. Meningen är sann om abonnemanget och
falsk om sidan: samma analys har räknat fram 898 kr att kräva tillbaka och 5 388 kr/år att ta bort, och fyndet
säger vad kunden betalar för. Det är regel 13:s form (LT-11, L-2): en förklarande mening ska prövas mot varje fall
den visas för, och här prövades den bara mot fakturor utan fynd (FV-A9 och renderingssondens fall bär inget).

Klass: en mening kunden läser blir fel → [KUND]. Infört: texten finns inte på main (där stod «Inget byte att
rekommendera»). Blockerar.

### K-3 · [KUND], vanligare: «Priset baseras på verifierade offentliga listpriser … Vid genomfört byte bekräftas slutpriset i offert» på varje mobilfaktura

Under «Hur vi räknar» visar fakturavyn `PriceNote` när resultatet saknar byte (src/pages/TestaFaktura/index.js:2046),
och för mobil är `benchmarkType 'list-verified'` (src/lib/categoryMeta.js:29), så texten blir «Priset baseras på
verifierade offentliga listpriser hos ledande leverantörer. Vid genomfört byte bekräftas slutpriset i offert innan
ni godkänner.» Renderat i samma körning som K-2 (efter klick på «Hur vi räknar»), i samma vy som «Ingen jämförelse
mot listpris». Det finns inget pris som baseras på något, och inget byte. Meningen säger emot rutan ovanför.

Klass: [KUND]. Förexisterande för en mobilfaktura utan byte på main, men PR:en gör det vanligare, med en mekanism i
diffen: villkoret är `!(shouldSwitch && netSaving > 0)`, och planvalsgrinden sätter `shouldSwitch false` på varje
mobilfaktura. Avläst med instrumentets egna fall genom main (`korj.mjs`): av xl349·ja·antal, xl349·nej·antal,
comb-01·nej·antal, comb-01·ja·utan, m299·ja·antal och m299·nej·utan bar fem `shouldSwitch true` med netto över noll
(notisen dold) och ett saknade byte. På grenen saknar alla sex byte, så notisen står i sex av sex. Blockerar. Renderingssonden screenshot-planvalsgrind.mjs öppnar
aldrig «Hur vi räknar», så dess förbudslista kunde inte se meningen ([VAKT], se V-2).

### K-4 · [KUND], infört: dörren säger «lägsta listpris» där källan säger «lägsta publicerade 24-mån-pris»

822e9d43 bytte dörrens ankarrubrik (lib/domain-intel.js:552). Avläst med produktionens läsväg
(`buildMarketAnchorFinding(getPublicListBenchmark({category:'mobil'}))`): «Tele2 Företags lägsta listpris för ett
mobilabonnemang: 269 kr/mån». Prisbokens not för talet (agents/recommender/branchindex.js, mobil.note) säger
«p25 = lägsta publicerade 24-mån-pris» och «Extra abonnemang via Kollega (50 % rabatt) ingår INTE i p25». Källan
bär alltså inte «lägsta listpris för ett mobilabonnemang»: bindningstiden är struken, och boken namnger själv ett
publicerat abonnemang som är billigare. Ingen verifierare prövar «lägsta». Den gamla texten sa «listpris för
entrénivån», och den raden står kvar i kortets `detail`, så rubriken och detaljen säger olika saker om samma tal.
Jag har inte läst Tele2:s sida (inga nätverksanrop i det här uppdraget); fyndet vilar på bokens egen text, som
säger emot rubriken. DI-30 låser bara att den gamla måttstocken är borta.

Klass: en mening om ett pris som besökaren läser → [KUND]. Infört i 822e9d43. Blockerar.

### V-1 · [VAKT], inte kundsynligt: svaret bär modellens `optimizationSaving` på en mobilfaktura

`planvalsgrind` (agents/recommender/recommend.js:1599) sätter `recommendationType 'no_action'` men lämnar
`optimizationSaving`, och handlern räknar `optimizationFee`/`optimizationNetSaving` på det (api/test-invoice.mjs:2040).
Svaret bär då `no_action` bredvid `optimizationNetSaving 4800` och modellens `switchSteps`. Ingen yta läser fälten
utan `recommendationType === 'optimize'` (TestaFaktura `isOptimize`, send-confirmation `isOptimize`; sökt i api/,
lib/, src/), och lagringen skriver dem inte. Inget tal når kunden i dag → [VAKT]. Men det är OB-19:s form (ett fält
som motsäger sitt eget beslut väntar på en yta), och instrumentets matris prövar inte modellens tredje svar, så
«oavsett vad modellen svarar» är bara prövat för ja och nej. Mergas och lagas framåt.

### V-2 · [VAKT]: renderingssonden öppnar aldrig «Hur vi räknar»

scripts/screenshot-planvalsgrind.mjs läser sidans text före klicket på «Hur vi räknar», så notisen i K-3 och
allt annat i underlaget ligger utanför dess förbudslista. Avläst i sondens källtext: inget klick på «Hur vi räknar».

### V-3 · [VAKT]: två rader i S1 som ser ut som skydd men inte kan observeras

- `savingsBreakdown: null` i `planvalsgrind`: sabotaget A (raden borttagen) fällde 0 av 174. Fältet serialiseras
  inte till svaret (api/test-invoice.mjs, SVK-undantaget i tests/svarskontrakt.mjs:42) och läses bara för
  saas-productivity (TestaFaktura:2256), så raden har ingen verkan att pröva.
- `&& rek.shouldSwitch !== true` i `fakturaLage`: sabotaget G fällde 0 av 174. Planvalsgrinden gör `shouldSwitch`
  falskt på varje mobilfaktura, så villkoret kan inte nås (ett skydd bakom ett skydd, 10 sep).

### V-4 · [VAKT]: FV-L prövar att `lagratByte` anropas, inte att SQL-satsen bär kolumnerna den behöver

`lagratByte` behöver `category` för att hålla ett mobilbyte, och påminnelsen, enkäten och briefen fick den
kolumnen i sina SELECT i 822e9d43. Neon-stubben svarar läsningarna med hela den författade raden
(`globalThis.__SVARA` i tests/fakturakedjan/lagrade.mjs), oavsett vilka kolumner satsen väljer. Sabotagen H
(påminnelsens SELECT utan `category`), I (enkätens) och J (briefens) fällde 0 av 174; H fällde 0 av 2 765 i hela
sviten. Beteendet ändras: `underlagFranRad(lagratByte(rad))` ger `besparing null` med kategorin och
`{"netto":7680}` utan den. Koden i dag väljer kolumnerna, så inget kundtal är fel → [VAKT]. Stubben bör svara
med bara de kolumner satsen väljer (IA-11:s form, «en fejkdatabas som bara svarar med RETURNING-satsens kolumner»).

## Punkt 2 · icke-mobila fakturor mot main

Fem fall genom båda träden med samma fall-JSON (scratchpad `sond6.mjs`): bredband med modellens ja och nej,
bredband 349 kr (under minimigränsen), IT-8821 med modellens ja och nej. Svaret (byte, brutto, netto, arvode,
mål, typ, text, poäng), sekundärdelen, intervallet, beräkningsunderlaget, läget, den lagrade raden, analysmejlet,
svarsmejlet, aktiveringsmejlet och verifikationsraderna är lika. Enda skillnaden är rummets IT-8821-rad, där c1:s
MS-11 tar bort «17 % mer» (granskat i tidigare varv, inte S1). Aktiveringsmejlets besparingsruta och
beräkningsunderlaget står kvar för varje fall med netto över noll, också bredband 349 kr (netto 288 kr utan
bytesflagga, samma på main). Ingen förlust funnen.

## Punkt 3 · meningar som prövades och höll

- PLANVALS_MENING och BREDBAND_EJ_PRISSATT: kodskrivna, utan tal. Bredbandsmeningen följer sekundärvägens egen
  avläsning av en bredbandsdel, som ordern föreskriver (lib/invoice-metrics.js:28).
- PLANVAL_BESKED.skal i aktiveringsmejlet (via diagnosMening): «vi vet inte vilken produkt ni har … Vi hävdar
  därför inget om er prisnivå i dag, och lägger aldrig fram en besparing vi inte kan räkna hem.» Mejlet visar inget
  fynd, så meningen står inte bredvid ett räknat belopp där (avläst för delbetalningsfallet).
- Rummets mobiltext (RM-R6) i tre former, körda med rummets funktioner: utan avläst antal, med antal och lagrat
  byte, utan antal och lagrat byte. Ingen påstår att ett pris saknas; inhållningen säger «kan vara räknat».
- Rummets domtexter för ett mobilrum går genom `rum.ovissa` (Portfolio:687), inte genom «inget verifierat
  jämförelsepris».
- SIDRUBRIK.utanByte: sätts bara efter ett lyckat svar (TestaFaktura:661, 698), så «Er faktura är genomläst» står
  inte över ett fel.
- Analysmejlets PDF- och HTML-gren definierar båda `planval` (api/send-analysis.mjs:137, 321).

## Inte prövat

- Tele2:s publicerade priser live (inga nätverksanrop); K-4 vilar på prisbokens text.
- Hur många lagrade mobilrader i produktionen som har `net_saving > 0` utan bytesflagga (K-1): ingen
  databasåtkomst härifrån. Utan avläsningen räknas felet som synligt.
- Prospektet (api/prospect) och briefingsidan som renderad sida; briefens insikter prövades genom
  `generateBriefingInsights` i FV-L.

## Sabotage som linsen körde

Varje sabotage bytte exakt en förekomst (`assert s.count(old) == 1`), körde de tio riktade testfilerna (174 tester)
eller hela sviten, räknade `# fail` och `# cancelled` tillsammans och skrev tillbaka filen
(scratchpad `lins8/sabotage.py`). Beteendet kontrollerades separat där sabotaget fällde noll.

| # | Sabotage | Fil | Utfall |
|---|---|---|---|
| A | `savingsBreakdown: null` borttagen ur planvalsgrinden | agents/recommender/recommend.js | 0 av 174 (fältet når ingen yta, V-3) |
| B | `suggestedSupplier: null` borttagen ur planvalsgrinden | agents/recommender/recommend.js | 1 fällt (FV) |
| D | rummets samlade poäng utan `utanDom` | lib/lagesregister.js | 1 fällt (RM) |
| E | rummets inhållning lämnar `net_saving` | lib/lagesregister.js | 2 fällda (MS) |
| G | planvalsrubriken utan `rek.shouldSwitch !== true` | lib/lagesregister.js | 0 av 174 (villkoret onåbart, V-3) |
| H | påminnelsens SELECT utan `category` | api/cron/send-reminders.mjs | 0 av 174; 0 av 2 765 i hela sviten; beteendet ändras (V-4) |
| I | enkätens SELECT utan `category` | api/cron/send-reminders.mjs | 0 av 174 (V-4) |
| J | briefens SELECT utan `category` | lib/briefing-generator.js | 0 av 174 (V-4) |
| K | neon-stubben svarar tomt på de lagrade raderna | tests/fakturakedjan/stubbar/neon.mjs | 3 fällda (FV-L) |

Bokstäverna C och F användes inte. Efter varje sabotage skrevs filen tillbaka och innehållet jämfördes, och
`git status --short` före domcommiten visade bara den här filen.
