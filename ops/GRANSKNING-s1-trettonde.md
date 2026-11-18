commits: 26375dfafe534193fd871f6d2949bafbafe664cf
dom: BLOCKERAR

# Trettonde blicken på S1 (26375dfa), uppdrag: hitta var det gröna är osant

Granskningen är klar. Sökvägar `lins13/…` är kataloger i sessionens scratchpad.

**Dom: BLOCKERAR**, på en [KUND] som S1 gör vanligare:
- **Y-1**: på en kombinerad mobil- och bredbandsfaktura som faktureras per kvartal eller år visar «Hur vi räknar»
  «Kombinerad faktura. Mobilabonnemang: 125 640 kr/år.» (kvartal, sant tal 41 880) eller «193 680 kr/år» (år, sant tal
  16 140), över «Ni betalar idag 50 268 kr / år» respektive «24 528 kr / år». P har alltid summerats som en månad; på
  main stoppade sanitetsvakten de här fakturorna via den uppblåsta mobilbesparingen, och planvalsgrinden tar bort
  besparingen, så de går `auto` och talet når vyn. Återskapat genom handlern och renderat, med motprov (månadsfakturan
  ger rätt tal, main visar inget P).

Två [VAKT] mergas och lagas framåt: FV-A16 och FV-A17 säger «ingen rest i svaret» medan svaret bär resten som
`recommendation.nonPrimaryAnnual` (Y-2, ett sabotage som förde resten till analysmejlet fällde 0 av 2 773), och en
kommentar i prompten beskriver en rest som inte finns (Y-3).

Det som håller: strykningen tar bort resten ur fakturavyn och `restAnnual` ur svaret, och ingen yta som byggs ur svaret
visar ett tal för resten (`nonPrimaryAnnual` står kvar i svaret, oläst, se Y-2). Ingen mobilfaktura i rutnätet fick ett byte, en besparing, ett procenttal eller en poäng.
Icke-mobila fall har samma tal som på main. FV-A4:s fel 14 nov gick inte att återskapa på 21 körningar av filen och 7
av sviten.

## Iakttagelser

- Utcheckat på grenens spets 26375dfa (FETCH_HEAD), alltså den granskade commiten själv.
- 26375dfa ändrar i kod: `restAnnual` bort ur api/test-invoice.mjs (beräkningen och fältet i svaret) och meningen
  «Resten av fakturan» bort ur src/pages/TestaFaktura/index.js. Resten är tester, renderingssonden och ops/.
- Instrument: main (e5733f3a) utpackat med `git archive origin/main` i `lins13/main`. Körare och stubbar kopierade ur
  `lins12/` (Anthropic-stubben bokför prompten till `recommend`), sökvägarna pekade om till den här worktreen.
- Grenens hela matris (MOBILFALL, FYNDFALL, MOTPROV, KOMBIFALL, RESTFALL, 216 fall, `lins13/matris.sh`) genom grenen
  och main: av 190 mobilfall på grenen har 0 ett byte, en besparing, ett jämförelsepris, en poäng, ett procenttal eller
  en sekundär besparing i svaret, den lagrade raden, rummet eller mejlen. Motprov main: 186 av 186 med minst ett.
  Skannern: grenen 0 träffar, main 5 skilda.
- Sviten utan sabotage: 2 773 av 2 773 gröna, 0 fail, 0 cancelled (`lins13/svit0.txt`), också i en slinga om sex
  körningar (`lins13/svitl-*.txt`).

## Fynd

### Y-1 · [KUND], vanligare: primärdelen på en kvartals- eller årsfaktura med mobil som primär del når kunden, tre
### respektive tolv gånger för stor och större än hela fakturan

`computeInvoiceMetrics` summerar radbeloppen som en månad (lib/invoice-metrics.js:136-142), och fakturavyn gångar
summan med 12 (src/pages/TestaFaktura/index.js:2088). På en kvartalsfaktura blir P kvartalsbeloppet × 12, på en
årsfaktura årsbeloppet × 12. Felet i P fanns före S1. Det S1 ändrar är vägen: på main räknade mobilbytet en
besparing ur det uppblåsta P, sanitetsvakten fällde den och fakturan gick till granskning (`sanity_check_failed`),
så att ingen yta visade P. Planvalsgrinden nollar besparingen, sanitetsvakten har inget att fälla, fakturan går
`auto`, och «Hur vi räknar» visar P.

Genom handlern (`lins13/gen.mjs` mängd `q`, `bash lins13/set.sh q`), mobil som primär, modellens ja och nej:
- Q1, kvartalsfaktura: «Tele2 Jobbmobil XL (10 st)» 10 470 kr + «Företagsbredband Fiber 1000/1000» 2 097 kr per
  kvartal. Grenen: route `auto`, annualCost 50 268 (= 12 567 × 4, rätt), `primaryComponentMonthly` 10 470, vyns
  mening «Kombinerad faktura. Mobilabonnemang: 125 640 kr/år.» Mobildelen är 10 470 × 4 = 41 880 kr/år.
  Main: route `review_queue`, `sanity_check_failed`, inget P i svaret (`lins13/q-main.txt`).
- Q3, årsfaktura: «Tele2 Jobbmobil (5 st)» 16 140 kr + bredband 8 388 kr per år. Grenen: `auto`, annualCost 24 528,
  vyns mening «Kombinerad faktura. Mobilabonnemang: 193 680 kr/år.» Mobildelen är 16 140 kr/år. Main: `review_queue`.
- Motprov i samma mängd: Q6, samma rader per månad, ger «Mobilabonnemang: 41 880 kr/år» (rätt) på grenen.
  Q2, kvartalsfaktura med molnväxel i stället för bredband, är `auto` redan på main och visar där «analysen avser
  Mobilabonnemang (48 420 kr/år)» (sant tal 16 140): felet i P är förexisterande, och det som är nytt är att
  fakturor som main höll i granskning når vyn.

Renderat med produktionsbygget (`npm run build` på 26375dfa, `lins13/rq.sh`, 390 och 1600 px, «Hur vi räknar»
öppnat, svaret ur handlern): `lins13/rq/Q1_mob10+bb_kvartal_ja-1600.txt` rad 41 «Kombinerad faktura.
Mobilabonnemang: 125 640 kr/år.», rad 43-44 «NI BETALAR IDAG 50 268 kr / år», rad 47-48 «FAKTURERAT DENNA PERIOD
(EX MOMS) 12 567 kr». Delen är två och en halv gånger hela fakturan, och kunden kan inte räkna hem den ur vyns egna
tal. Samma i 390 px. Q3: «Mobilabonnemang: 193 680 kr/år.» under «Ni betalar idag 24 528 kr / år». Motprovet Q6:
«Mobilabonnemang: 41 880 kr/år.» under «50 268 kr / år». Main renderat ur main:s bygge (`lins13/main/build`):
`lins13/rq-main/Q1_mob10+bb_kvartal_ja-1600.txt` visar «Fakturan behöver djupare analys.» och inget P.

Klass: ett tal kunden läser är fel → [KUND]. Felet i P är förexisterande; PR:en gör det vanligare genom en mekanism i
diffen (avgränsningen 22 okt): planvalsgrinden (agents/recommender/recommend.js:1606-1623) nollar besparingen på
varje mobilfaktura, så sanitetsvakten, som på main stoppade det uppblåsta P via den uppblåsta besparingen, inte
längre stoppar något, och fakturavyn visar talet. Varje kombinerad mobilfaktura som faktureras per kvartal eller år
och som main skickade till granskning får det. Blockerar.

Grenens rutnät ser det inte: RESTFALL har bara en kvartalsfaktura, med bredband som primär del (`rest·bb+mob·kvartal`,
granskning på både grenen och main), och MOBILFALL har ingen kvartals- eller årsfaktura. Av rutnätets 190 mobilfall
går 4 till `auto` på grenen men inte på main (comb-25 och comb-46, modellens ja); ingen av dem visar P.
Rummets rad för Q1 («Ni betalar 5 027 kr per abonnemang/år», årskostnaden med bredbandet delad på tio) är talet
«per abonnemang», loggat under S6, och räknas inte här.

Felet uppstår inte i 26375dfa: på 03fdefa7 hade resten blivit negativ och strukits, så samma mening stod där. Det hör
till S1:s mekanism (planvalsgrinden runt `recommend()`), och ordern säger att ett fel som S1 gör vanligare räknas.

### Y-2 · [VAKT], infört: FV-A16 och FV-A17 säger «ingen rest i svaret», men svaret bär resten

26375dfa skriver om FV-A17 till «ingen rest i svaret» och låter FV-A16 kräva detsamma. Båda läser `body.restAnnual`
(tests/fakturakedjan/kor.mjs:198), ett fält handlern inte längre skriver, så kravet kan bara fällas av att just det
namnet återinförs. Svaret bär samtidigt resten som `recommendation.nonPrimaryAnnual` (api/test-invoice.mjs:2351):
avläst i grenens matris bär 20 av 26 fall i RESTFALL och KOMBIFALL ett tal där, till exempel 3 228 kr på
`kombi·bredband+mobil269` och 12 588 kr på mobilfakturan `comb-01` (`lins13/matris-gren.json`). Ingen yta läser fältet i
dag (grep i api/, src/, lib/, agents/), så inget kundtal är fel → [VAKT]. Sabotage SB1 nedan: analysmejlet skriver
`nonPrimaryAnnual` som «Resten av fakturan», beteendet ändrades i 3 av 3 fall genom handlern (`lins13/k1-SB1.json`,
också på mobilfakturan comb-01), och **0 av 2 773** föll. Mergas och lagas framåt.

### Y-3 · [VAKT], infört: kommentaren i prompten beskriver en rest som inte längre finns

agents/recommender/recommend.js:495-498 säger att resten «redovisas bara i fakturavyn, ur en enda summa (`restAnnual`,
api/test-invoice.mjs)». Efter 26375dfa visar ingen yta en rest, och `restAnnual` finns bara i den kommentaren och i
testerna (grep). En kommentar som intygar en mekanism koden inte har; inget kundtal ändras → [VAKT].

## FV-A4

Felet från 14 nov gick inte att återskapa. tests/fakturakedjan.mjs kördes 21 gånger ensam (`lins13/fk1.txt`,
`last-*.txt` under en full svit, `par-*.txt` fyra samtidigt i tre omgångar, `stress-*.txt` med sex processer som höll
CPU:n mättad), och hela sviten 7 gånger (`svit0.txt`, `svitl-*.txt`): 25 av 25 respektive 2 773 av 2 773 varje gång.
Körtiden ändrades knappt under last (17-19 s). Obekräftad förklaring: kor.mjs väntar 8 × 25 ms per fall, och 54 fall
per barnprocess ger 10,8 s väntan, så lasten når få steg som räknar. Jag fann ingen tidsberoende väg till `reasoning`
för en mobilfaktura i koden: planvalsgrinden skriver texten sist i `recommend()`, och efter den ändrar handlern bara
CSP-ord och avslutande klamrar (api/test-invoice.mjs:1932-1938, 2333). Sanitetsvaktens och validatorns tidsgränser är
4,5-7 s; stubbens svarstid är inte mätt. Testet har tänder: sabotage SB2 (bredbandsmeningen alltid) fällde FV-A4 och
tre till. Orsaken till 14 nov: jag vet inte. Den står kvar som det loggade [VAKT]-fyndet; inget av det jag körde
visar att FV-A4 är grönt på fel grund.

## Det som håller (avläst)

- Mobilfallen (190 i grenens matris, `lins13/matris.sh` med den elfte linsens `mobilkoll.mjs` och `skanna.mjs`): 0 med
  ett byte, en besparing, ett jämförelsepris, en poäng, ett procenttal eller en sekundär besparing i svaret, den
  lagrade raden, rummet, analysmejlet, svarsmejlet eller aktiveringsmejlet. Motprov main: 186 av 186. Skannern: 0
  träffar på grenen, 5 skilda på main. Q-mängdens 10 mobilfall (`lins13/q-gren.json`): 0 med ett sådant tal.
- Icke-mobila fall mot main (`lins13/jamfor.mjs`, 26 fall): samma tal, läge, lagrad rad och mejltexter. Skillnaderna
  är c1:s och 822e9d43:s, granskade förut (`planval: false` i radens parametrar, aktiveringsmejlets borttagna
  «Möjlig nettobesparing +0 kr/år» utan byte).
- Strykningen: `restAnnual` finns inte i svaret i något fall (0 av 26 kombinerade), fakturavyns mening är «Kombinerad
  faktura. Företagsbredband: 8 388 kr/år.» utan rest (byggarens fall, renderat av den tolfte linsen och här i Q6), och
  ingen yta läser `nonPrimaryAnnual` (grep). Där inget periodfel finns är P mobil- respektive bredbandsdelen (Q6: 41 880
  = 3 490 × 12; Q5 i EUR: 16 128 = 128 × 10,5 × 12).

## Inte prövat

- Vad modellen faktiskt skriver (inga modellanrop); för mobilfallen skriver koden texten.
- Hur ofta en kombinerad mobilfaktura i produktionen faktureras per kvartal eller år (ingen databasåtkomst).
  Mekanismen står i diffen.
- Påminnelsen, enkäten, briefen, prislarmen, prospektet och dörren som renderade sidor: 26375dfa rör dem inte, och
  ingen av dem läser P eller `nonPrimaryAnnual` (grep). Sviten prövar dem som förut (LB, DI, PM, KM).
- Byggarens renderingssond (scripts/screenshot-planvalsgrind.mjs) kördes inte; egen rendering med samma väg.

## Sabotage som linsen körde

Varje sabotage bytte exakt en förekomst (`assert s.count(old) == 1`, `lins13/sab.py`), räknade `# fail` och
`# cancelled` tillsammans och återställde filen med `git checkout --` (`lins13/sabkor.sh`); `git status --short` visade
bara domfilen efter varje körning.

| Sabotage | Ändring | Beteendet ändrades | Fällda |
|---|---|---|---|
| SB1 | api/send-analysis.mjs: raden «Resten av fakturan {nonPrimaryAnnual}/år» under «Du betalar idag» i analysmejlet | ja, i 3 av 3 fall genom handlern (`lins13/k1-SB1.json`: 12 588, 3 228, 8 388) | **0 av 2 773** (Y-2) |
| SB2 | agents/recommender/recommend.js: planvalsgrinden lägger alltid till bredbandsmeningen | ja, FV-A4 rapporterar bredbandsmeningen på comb-14 och fler fall utan bredbandsdel (`lins13/svit-SB2.txt` rad 18066) | 4 av 2 773 (FV-A4, PG-01, PG-03, KM-09) |
