commits: e7512b82638e617ced94eb90310b9025847d0317
dom: BLOCKERAR

# Nionde blicken på S1-lagningen

Uppdraget var att hitta var det gröna är osant i påståendet i ops/KORPLAN-VAG1.md, S1, på lagningen e7512b82.
Granskningen är klar. Sökvägar `lins9/…` och `lins8/…` är kataloger i sessionens scratchpad.

**Dom: BLOCKERAR.** Två [KUND] som PR:en infört eller gjort vanligare, båda återskapade genom handlern och renderade:
- **N-1** (infört): planvalsbeskedet «Därför säger vi inget om ert pris för dem och räknar ingen besparing på dem»
  står direkt under fyndet «Leverantören skrev in höjningen själv · 4 800 kr/år» om en prisjustering av just
  mobilabonnemangen. K-2:s lagning prövades mot en telefondelbetalning, inte mot ett fynd om produkterna själva.
- **N-2** (vanligare): «Övriga tjänster (12 588 kr/år) analyseras via Fortnox/Visma» under «Hur vi räknar» på en
  kombinerad mobilfaktura. Ingen kod analyserar något via Fortnox eller Visma. L2 skickar varje kombinerad
  mobilfaktura till den grenen: 12 av 84 fall på main, 72 på grenen.

En [VAKT] (V-5: K-3:s lagning har inget test i sviten) och en förexisterande [KUND] utanför S1 (N-3: K-4:s mening
«det billigaste publicerade priset» står kvar i rummets radtext) blockerar inte.

Det som håller: K-1 är lagat (rummets total 3 648 i stället för 11 328), K-3 är lagat i bygget (notisen syns inte på
någon planvalsfaktura jag renderade), K-4 är lagat i dörren. Ingen mobilfaktura fick ett byte, ett procenttal, en
poäng eller ett besparingsfält större än noll i svaret, den lagrade raden, rummet eller de tre mejlen, i de 90 mobilfall
jag körde (alla 84 med avläst antal i instrumentets matris, och sex egna: med fynd, med avgift, utan antal);
motprovet är samma fall genom main, där 80 av 84 bär ett byte eller ett procenttal i rummet. Icke-mobila motprov har samma tal och
texter som på main, med undantag för c1:s MS-11. Enligt körplanen är detta S1:s andra blockering i rad, och
eskaleringsregeln gäller.

## Iakttagelser i ordning

1. Grenens spets 228f0814 (efter e7512b82 bara `ops/`). Worktree egen, `node_modules` länkad.
   Main = e5733f3a (merge-basen).
2. Sviten på spetsen, avläst: `CI=true node --test tests/run.mjs` gav tests 2768, pass 2768, fail 0, cancelled 0.
3. Jämförelseinstrument: main (e5733f3a) i en egen worktree i scratchpaden, med fakturakedjans laddarkrok och
   stubbar kopierade dit, och körare `lins9/korj.mjs` (kor.mjs med KOR_ROT och reserv för `delaRummet` och
   `svarsKort`, samma som åttonde linsens). Fall-JSON genereras ur grenens `tests/fakturakedjan/fall.mjs`.
4. Egna fall genom handlern på grenen (`lins9/fall1.mjs`): en mobilfaktura där abonnemangsraden bär
   leverantörens höjningsmarkör («prisjustering») och en där höjningen står på en egen rad («Prisjustering
   mobilabonnemang (10 st)», 400 kr/mån), modellens ja och nej; en med pappersfakturaavgift; comb-01 i tre
   former; bredbandsmotprovet. Alla mobilfall: `shouldSwitch false`, `no_action`, `netSaving 0`, lagrad rad
   utan byte, rummets `totalSaving 0`, ingen poäng. Bredbandsmotprovet: byte 3 648, poäng 19, rummets total 3 648.
   Forensiken ger fynd på alla tre mobilformerna: «Leverantören skrev in höjningen själv» (41 880 resp.
   4 800 kr/år) och «Administrativ tilläggsavgift» (588 kr/år), med lägets rubrik `planval`.

## Fynd

### N-1 · [KUND], infört: planvalsbeskedet «säger vi inget om ert pris för dem» står under ett fynd om just deras pris

Lagningen av K-2 avgränsade PLANVAL_BESKED.text till produkterna: «Därför säger vi inget om ert pris för dem och
räknar ingen besparing på dem.» Den prövades mot en delbetalning av en telefon (FV-A12), som inte är en produkt i
kategorin. Grannfallet är ett fynd om abonnemangen själva: forensiken (`supplier_documented_hike`, lib/forensics.js)
läser leverantörens egen höjningsmarkör («prisjustering», «ny avgift», «indexuppräkning» m.fl., FEE_SIGNAL_RE) på en
mobilfaktura och räknar ett årsbelopp.

Återskapat genom handlern (`lins9/fall1.mjs`, `lins9/kor.sh`) och renderat med produktionsbygget och öppnat underlag
(`lins9/render.mjs`, 390 och 1600 px, texten i `lins9/r1/HIKE2_xl349_nej-1600.txt`): Tele2 Jobbmobil XL (10 st) plus
raden «Prisjustering mobilabonnemang (10 st)» à 400 kr/mån, modellens nej (samma utfall med ja). Fakturavyn visar,
i den här ordningen:
«FYND PÅ ER FAKTURA · Leverantören skrev in höjningen själv · 4 800 kr/år · ”Prisjustering mobilabonnemang (10 st)” ·
Leverantören har själv markerat raden ovan som en ny eller justerad avgift. En nyinförd kostnadspost är alltid
förhandlingsbar.» och direkt därunder «Ingen jämförelse mot listpris. Produkterna i kategorin har olika listpris, och
vi vet inte vilken produkt ni har. Därför säger vi inget om ert pris för dem och räknar ingen besparing på dem.»
Lägets rubrik är `planval`, och rummet bygger samma rad till läget `fynd` med fyndet som rummets fynd.

Fyndet säger något om deras pris för abonnemangen (att leverantören höjt det, 4 800 kr/år, och att höjningen är
förhandlingsbar), och meningen under säger att vi inte gör det. Samma form när markören står på abonnemangsraden
själv («Tele2 Jobbmobil XL (10 st) prisjustering», 41 880 kr/år). Motprov: en pappersfakturaavgift
(«Administrativ tilläggsavgift», 588 kr/år) är ingen produkt i kategorin, och där håller meningen.

Det är regel 13:s form en gång till: meningen prövades mot fallet som fällde den förra (delbetalningen), inte mot
varje fall den visas för. Klass: en mening kunden läser blir fel → [KUND]. Infört: PLANVAL_BESKED finns inte på main
(9c2991d1), och den nuvarande formuleringen är lagningens (e7512b82). Blockerar.

### N-2 · [KUND], förexisterande men vanligare: «Övriga tjänster (… kr/år) analyseras via Fortnox/Visma» på varje kombinerad mobilfaktura

Under «Hur vi räknar» skriver fakturavyn för en kombinerad faktura utan sekundär besparing (`_secSaving` null)
«Kombinerad faktura — analysen avser Mobilabonnemang (20 940 kr/år). Övriga tjänster (12 588 kr/år) analyseras via
Fortnox/Visma.» (src/pages/TestaFaktura/index.js, grenen `potentialMixedCategories` utan `secondarySaving`, villkoret
`nonPrimaryAnnual > 0`). Ingen kod analyserar något via Fortnox eller Visma: `api/fortnox/` bär bara `auth.mjs` och
`callback.mjs`, och bibeln säger att Fortnox/Visma-synken är parkerad. Löftet saknar mekanik (regel 9), och det står i
samma vy som bredbandsmeningen «Bredbandet på samma faktura har vi inte prissatt i den här analysen».

Återskapat: comb-01·nej·antal genom handlern och renderat med underlaget öppet (`lins9/r1/comb-01_nej_antal-1600.txt`
och `-390.txt`), meningen ordagrant som ovan.

Vanligare, med en mekanism i diffen: L2 (9c2991d1) räknar ingen sekundär besparing när primärkategorin är en
planvalskategori, så varje kombinerad mobilfaktura faller till grenen med Fortnox-meningen. Avläst med samma
fall-JSON genom båda träden (`lins9/fall2.mjs`, alla 84 mobilfall med avläst antal i instrumentets matris, villkoren
ur vyn räknade på handlerns svar): main visade Fortnox-meningen i 12 fall och sekundärdelens besparingsrad i 62;
grenen visar Fortnox-meningen i 72 (de 12 plus 60 av de 62) och sekundärdelens rad i inget. Felet finns på main, men PR:en gör det sex gånger
vanligare. Klass: [KUND] (ett löfte utan mekanik i en mening kunden läser), vanligare. Blockerar.

### V-5 · [VAKT]: K-3:s lagning har inget test i sviten

Villkoret `result.lage?.rubrik !== 'planval'` i src/pages/TestaFaktura/index.js (listprisnotisen) prövas bara av
renderingssonden scripts/screenshot-planvalsgrind.mjs, som inte körs i sviten eller i Grinden. Sabotaget SC (villkoret
borttaget, `assert count == 1`) fällde 0 av 2 768 i hela sviten. Commitmeddelandet säger att sondens motprov fällde det,
och det är en riktig prövning, men ingen maskin i CI håller lagningen (regel 7: ett fel är inte lagat förrän det är
testlåst). Inget kundtal ändras av att vakten saknas → [VAKT]. Mergas och lagas framåt.

### N-3 · [KUND], förexisterande och utanför S1: K-4:s mening står kvar i rummet

K-4 lagades i dörren. Rummets radtext för en mobilrad med avläst antal säger samma sak som K-4 fällde: «Det billigaste
publicerade priset är 3 228 kr (Tele2 Företag mobilabonnemang)» (src/lib/rumstext.js `MOTIVERING.oviss_niva`, avläst
genom handlern och `berikaRader` i 80 av 84 mobilfall i `lins9/fall2-gren.json`). Bokens not säger «lägsta publicerade
24-mån-pris» och att Kollega-abonnemanget är billigare; bindningstiden är struken här också. Regel 8 (sök meningen,
inte funktionen) hade hittat den. Förexisterande: main bär samma påstående om samma tal i radtexten («… % mer än det
billigaste publicerade priset för mobilabonnemang (Tele2 Företag mobilabonnemang)», «… än det billigaste verifierade
alternativet», avläst i `lins9/fall2-main.json`) och i underlaget (`jamfortMot: 'billigaste publicerade priset'`).
S1 gör det inte vanligare (antalet mobilrader med ett «billigaste»-påstående är detsamma). Blockerar inte; loggas för
en egen PR. Samma ankare i prospektet («Verifierat publikt listpris — det lägsta vi kan belägga») hör dit.

## Iakttagelser, forts.

5. K-1 är lagat: åttonde linsens rumsond (`lins8/rumsond.mjs`) på grenen ger mobilrad utan flagga + bredbandsbyte
   `totalSaving 3648` (förut 11 328), mobilraden `net null`, `utanDom true`. Motprovet bredband utan flagga +
   bredbandsbyte ger fortfarande 11 328: K-1:s allmänna form, loggad i arbetsordern, förexisterande.
6. `lagratByte` och rummets inhållning är nu samma funktion; på en planvalsrad kan de bara skilja sig om rummets
   prisunderlag har `ovissNiva false`, vilket kräver nivågolv ur `licenseTierBenchmarks`, som mobil saknar (LB-04).
7. Icke-mobila fakturor mot main (`lins9/fall3.mjs`, jämförda med `lins9/jamfor.mjs` över svaret, sekundärdelen,
   underlaget, läget, den lagrade raden, rummet och de tre mejlen): bredband ja, nej, 349 kr (netto utan flagga) och
   med en prisjusteringsrad, IT-8821 ja och nej. Enda skillnaderna är `planval: false` i radens parametrar och
   IT-8821-radens borttagna «17 % mer» (c1:s MS-11, granskat förut). Ingen förlust.
8. Samma fall genom main (`lins9/fall1-main.json`): HIKE-, HIKE2- och JUNK-fynden finns på main också. Det som är nytt
   bredvid dem är planvalsbeskedet (N-1).
9. Utfallet över alla 90 mobilfall (`lins9/fall2-gren.json` och `fall1-gren.json`): ingen avvikelse i `shouldSwitch`,
   `netSaving`, `lage.score`, `lage.harByte`, den lagrade raden, rummets total och poäng, radens poäng, procent och kod,
   eller procent/poäng i analys-, svars- och aktiveringsmejlet. Mitt första instrument räknade «Besparingsarvode 20 %»
   i mejlens sidfot som ett procenttal och gav 90 av 90 fel; det var instrumentet. Sidfoten undantogs, och motprovet
   (samma fall genom main) visar att instrumentet ser ett byte eller ett procenttal i 80 av 84.
10. Ett svep över varje numeriskt fält i handlerns svar på en mobilfaktura (namn med saving/fee/percent/score/overpay)
    gav bara `extracted.confidenceScore` över noll. V-1 (`optimize`) är den kända undantagsvägen och prövades inte igen.
11. Renderat med produktionsbygget (`npm run build`, `lins9/render.mjs`, 390 och 1600 px, «Hur vi räknar» öppnat,
    bilderna i `lins9/r1/`): K-3:s notis står inte på någon av de fyra mobilfakturorna. Bilden för HIKE2 i 1600 px är
    läst: fyndrutan med 4 800 kr/år står direkt ovanför planvalsbeskedet.

## Punkt 3 · meningar som prövades och höll

- PLANVAL_BESKED.rubrik och .skal, och diagnosMenings mening i aktiveringsmejlet: aktiveringsmejlet visar inget fynd,
  så meningen står inte bredvid ett räknat belopp där (HIKE2, avläst).
- PLANVAL_BESKED.text bredvid en administrativ avgift (JUNK): avgiften är ingen produkt i kategorin, meningen håller.
- Dörrens nya ankartext: «entrénivå» och «Publicerat listpris med 24 månaders bindning» är vad bokens not och
  `alternatives[0]` bär. `buildMarketAnchorFinding` anropas bara för mobil (lib/domain-intel.js:646).
- BYTE_UTAN_DELAR: `bytetUndanhallet` sätts fortfarande bara när raden bar en bytesflagga, så meningen («räknade fram
  ett byte») står inte på en rad utan byte efter K-1.
- Avtalspåminnelsens andra gren (deadline-vakten, `contract_terms_json`) bär inget belopp; utfallsenkäten och briefen
  läser `lagratByte`. Prislarmens mejl (run-price-alerts) rörs inte av S1 och är premiumgrindade.

## Inte prövat

- Tele2:s publicerade priser live (inga nätverksanrop); N-3 vilar på prisbokens text, som K-4.
- Hur ofta en mobilfaktura i produktionen bär en höjningsmarkör (N-1) eller är kombinerad (N-2): ingen databasåtkomst.
  N-2:s mekanism gäller varje kombinerad mobilfaktura med `nonPrimaryAnnual > 0`.
- Rummets radtext bredvid ett fynd om produkterna (omatt-planvalsmeningen «säger inget om prisläget» på en rad utan
  antal): inte renderad. «Prisläget» är ett påstående om marknadsnivån, inte om höjningen, så jag räknar den inte som fynd.
- Prospektet och briefingsidan som renderade sidor.

## Sabotage som linsen körde

Varje sabotage bytte exakt en förekomst (`assert s.count(old) == 1`, `lins9/sabotage.py`), körde de riktade
testfilerna (fakturakedjan, rumsmatris, planvalsgrind, mobilscore, lagesregister, kundmeningar, paminnelse,
domain-intel, premiumgrind; 156 tester) eller den fil som anges, räknade `# fail` och `# cancelled` tillsammans och
återställde filen med `git checkout --`.

| Sabotage | Ändring | Fällda |
|---|---|---|
| SA | K-1 tillbaka: inhållningen returnerar före rensningen när raden saknar bytesflagga (lib/lagesregister.js) | 3 (RM-R7, LB-01, LB-02) av 156 |
| SB | inhållningen nollar inte `net_saving` | 5 (RM-R7, LB-01, LB-02, MS-08, MS-13) av 156 |
| SC | K-3:s villkor `result.lage?.rubrik !== 'planval'` borttaget (src/pages/TestaFaktura/index.js), hela sviten | **0 av 2 768** (V-5) |
| SD | K-2 tillbaka i lib (PLANVAL_BESKED.text «Därför räknar vi ingen besparing och säger inget om ert pris.»), tests/fakturakedjan.mjs | 2 (FV-A12, FV-A9) av 20 |
| SE | K-4: dörrens detalj utan bindningen, tests/domain-intel.mjs | 1 (DI-31) av 61 |
| SF | K-4: dörrens rubrik «billigaste mobilabonnemang», tests/domain-intel.mjs | 2 (DI-31, ankarets rubriktest) av 61 |

Varje fil var återställd efter sitt sabotage (`git status --short` tom för filen, kontrollerat i skriptet).
