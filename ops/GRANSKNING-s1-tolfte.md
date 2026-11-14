commits: 03fdefa7320c343fe4c191dd7f6f849fcc28aa8c
dom: BLOCKERAR

# Tolfte blicken på S1 (03fdefa7), uppdrag: hitta var det gröna är osant

Granskningen är klar. Sökvägar `lins12/…` är kataloger i sessionens scratchpad.

**Dom: BLOCKERAR**, på en [KUND] som 03fdefa7 infört:
- **X-1**: «Resten av fakturan» räknas som «Ni betalar idag» − P, och «Ni betalar idag» är för lågt när en
  avbetalning typad `hardware` dras av från en årskostnad som aldrig bar den (förexisterande). På en kombinerad
  bredbandsfaktura med ett byte, en mobilrad à 269 kr och en avbetalning à 100 kr står «Resten av fakturan: 2 028
  kr/år», där mobilen är 3 228 kr/år. Samma plats bar 3 228 på main och på 193dd2d8. Återskapat genom handlern och
  renderat.

Ett [VAKT] mergas och lagas framåt: FV-A17 är grönt på fel grund i båda sina krav (X-2, två sabotage som ändrade
beteendet och fällde 0 av 2 773, med motprov som fällde).

Det som håller: ingen mobilfaktura fick ett byte, en besparing, ett procenttal eller en poäng i svaret, den lagrade
raden, rummet eller de tre mejlen (190 mobilfall genom handlern, 0 med tal; motprovet main: 186 av 186). Ingen
förbjuden form i någon yta för mobilfallen. Icke-mobila fall har samma tal, läge, rad och mejltexter som på main. Där
ingen hårdvarujustering görs är P + R = «Ni betalar idag» och R fakturans övriga löpande rader, och prompten bär inget
tal för resten i den beordrade meningen.

## Iakttagelser

- Utcheckat på grenens spets 03fdefa7 (FETCH_HEAD), alltså den granskade commiten själv.
- 03fdefa7 ändrar i kod: promptens mening om en kombinerad faktura (agents/recommender/recommend.js), en ny summa
  `restAnnual` i svaret (api/test-invoice.mjs) och fakturavyns mening om resten (src/pages/TestaFaktura/index.js).
  Resten är tester, renderingssonden och ops/.
- Instrument: main (e5733f3a) utpackat med `git archive` i `lins12/main`. Körare `lins12/korj.mjs` med laddarkrok och
  stubbar kopierade ur `lins11/` (Anthropic-stubben bokför prompten till `recommend`), `lins12/set.sh <namn>` genererar
  fall ur `lins12/gen.mjs`, kör dem genom grenen och main och skriver `lins12/visa.mjs`: annualCost, «Ni betalar idag»
  med vyns egen formel (hårdvarujusterad på auto/review_queue), P, `restAnnual`, `nonPrimaryAnnual`, vyns mening med
  vyns formel på respektive träd, promptens rader och reasoning.

## Fynd

### X-1 · [KUND], infört: «Resten av fakturan» bär hårdvarujusteringens fel, där samma plats var rätt på main

Hårdvarujusteringen drar av avbetalningens årskostnad från `extracted.annualCost`
(lib/hardware-installments.js:55). En rad som extraktionen typar `hardware` ingår aldrig i `annualCost`: den räknas i
`oneTimeFees` (agents/test-invoice/extract.js:883). Avbetalningen dras alltså av från ett tal som aldrig bar den, och
«Ni betalar idag» (fakturavyn, `adjAnnualCost`) blir för lågt med avbetalningens årsbelopp. Det felet är
förexisterande (samma tal på main). 03fdefa7 räknar resten som «Ni betalar idag» − P (api/test-invoice.mjs:2149-2153),
så felet flyttar in i den nya meningen.

Återskapat genom handlern (`lins12/gen.mjs` mängd `g2`, `bash lins12/set.sh g2`): «Företagsbredband Fiber 1000/1000»
699 kr + «Mobilabonnemang Jobbmobil (1 st)» 269 kr + «Delbetalning iPhone 15 Pro, månad 12 av 36» 100 kr (typ
`hardware`), modellens ja och nej. Route auto, `shouldSwitch` true (bredbandsbytet), ingen sekundär besparing.
annualCost 11 616 (= (699 + 269) × 12), `hardwareAdjustment.adjAnnualCost` 10 416, P 8 388, `restAnnual` **2 028**.
Vyns mening (vyns formel): «Kombinerad faktura. Företagsbredband: 8 388 kr/år. Resten av fakturan: 2 028 kr/år.» under
«Ni betalar idag 10 416 kr/år». Fakturans övriga löpande rad är mobilabonnemanget, 269 × 12 = 3 228 kr/år, och
avbetalningen 1 200 kr/år ligger utöver det. 2 028 är varken resten av abonnemangen (3 228) eller resten med hårdvaran
(4 428); talet finns inte på fakturan. På main stod samma plats «Övriga tjänster (3 228 kr/år) …» och på 193dd2d8
«Övrigt på fakturan: 3 228 kr/år.», alltså ett sant tal (`lins12/g2-main.txt`).
Samma form i tre fall till (`lins12/g2-gren.txt`): två mobilrader + avbetalning 449 kr → resten 1 068 (mobilen är
6 456); molnväxel + avbetalning 100 kr → 4 416 (resten är 5 616); routeravbetalning 59 kr → 2 520 (3 228).

P + R = «Ni betalar idag» håller i varje fall (beslutets invariant), men talet som går ihop är fel. Klass: ett tal
kunden läser är fel → [KUND]. Infört av 03fdefa7: meningen och talet är nya, och samma plats bar det sanna talet före
commiten. Mekanismen i diffen räcker (avgränsningen 22 okt): varje kombinerad faktura med ett byte, utan sekundär
besparing och med en avbetalning typad `hardware` får det. Blockerar.

Renderat med produktionsbygget (`npm run build` på 03fdefa7, `lins12/render.mjs` via `lins12/rendera.sh`, 390 och
1600 px, underlaget öppet, svaret ur handlern): `lins12/r1/A3_bb+mob1+hwtyp100_ja-1600.txt` rad 66 «Kombinerad
faktura. Företagsbredband: 8 388 kr/år. Resten av fakturan: 2 028 kr/år.», rad 68-70 «NI BETALAR IDAG 10 416 kr / år
· Abonnemang och licenser. Exkl. hårdvaruavbetalningar (1 200 kr/år).», och i samma vy «FAKTURERAT DENNA PERIOD (EX
MOMS) 1 068 kr · Inkl. 100 kr engångskostnader — ingår ej i årsberäkningen ovan.» Kunden kan räkna hem resten ur vyns
egna tal: (1 068 − 100 − 699) × 12 = 3 228, inte 2 028. Samma i 390 px och för modellens nej.

FV-A17 ser det inte: rutnätets enda hårdvarufall (`rest·bb+mob+hw`, avbetalning 449 kr) ger resten null och stryks
(`lins12/fv-gren.txt`), så inget fall i rutnätet visar en rest med hårdvarujustering. Kravet P + R = «Ni betalar idag»
jämför dessutom mot `hardwareAdjustment.adjAnnualCost`, samma tal handlern räknar ur, och kan inte se att «Ni betalar
idag» själv är fel. Sabotaget som visar det står i listan nedan (SX1).

### X-2 · [VAKT], infört: FV-A17 prövar sin invariant och sitt promptkrav bara där rutnätet når

FV-A17 är ny i 03fdefa7 och har två krav. Båda är gröna på fel grund i en riktning som ändrar beteendet:
- **Krav 1 i hårdvarugrenen.** Sabotage SX1: `_visadArskostnad` blir `hardwareAdjustment.adjAnnualCost - 1` i
  hårdvarugrenen (api/test-invoice.mjs:2149). Beteendet ändrades: genom handlern med sabotaget ger A3 resten 2 027
  och P + R = 10 415 under «Ni betalar idag 10 416» (`lins12/g2-SX1.txt`). **0 av 2 773** föll. Rutnätets enda
  hårdvarufall har resten null, så invarianten prövas aldrig där en hårdvarujustering och en rest står samtidigt.
  Motprov SX1m, samma uttryck i grenen utan hårdvara (`… ?? 0) - 1`): FV-A16 och FV-A17 föll, 2 av 25 i
  tests/fakturakedjan.mjs. Krav 1 jämför dessutom mot `hardwareAdjustment.adjAnnualCost`, samma tal handlern räknar
  ur, alltså prövar det handlerns aritmetik mot sig själv och kan inte se X-1.
- **Krav 2, «prompten bär inget tal för resten».** Kravet läser bara de promptrader som kor.mjs filtrerar fram
  (`/kombinera|övrig|resten|sekundär komponent|jämför|benchmarkad|analyseras|analysen avser/i`). Sabotage SX3: efter
  «Primär komponent …» får prompten raden «Mobildelen på fakturan: {nonPrimaryAnnual} kr/år — nämn den i reasoning»
  (agents/recommender/recommend.js:505). Beteendet ändrades: prompten för A3 bär «Mobildelen på fakturan: 3 228 kr/år
  — nämn den i reasoning» bredvid vyns «Resten av fakturan: 2 028 kr/år», alltså P-1:s form med två tal för resten
  (`lins12/g2-SX3.txt`). **0 av 2 773** föll. Motprov SX3m, samma rad med «Resten på fakturan»: FV-A16 och FV-A17
  föll, 2 av 25. Redan i dag bär prompten raden «Tilläggstjänster (molnväxel/PBX): X kr/år» (en del av resten) på
  varje kombinerad faktura med en molnväxel, också på main (`lins12/promptkoll.mjs`: 2 388 kr på A6, 10 680–17 880
  kr på mobilfakturorna comb-01/05/06/13). Testtiteln säger mer än kravet prövar.
Inget kundtal ändras av vakten själv → [VAKT]. Mergas och lagas framåt; X-1 blockerar oberoende av den.

### Förexisterande, utanför PR:en: hårdvarujusteringen drar av en avbetalning som aldrig ingick [KUND]

Roten till X-1. När en avbetalningsrad typas `hardware` ingår den inte i `annualCost` (agents/test-invoice/extract.js:883,
`oneTimeFees`), men `computeHardwareAdjustment` drar av dess årsbelopp (lib/hardware-installments.js:55). Fakturavyns «Ni
betalar idag» blir för lågt med avbetalningens årsbelopp (A3: 10 416 mot abonnemangens 11 616), medan analys- och
svarsmejlet för samma faktura säger 11 616 (`lins12/g3-gren.json`). Samma tal på main (`lins12/g2-main.txt`). Det
syns för kund i dag på varje faktura med ett byte och en avbetalning typad `hardware`, och det är inte loggat i
ops/ARBETSORDER-VAG1.md (grep på «hårdvar»). Det blockerar inte i sig: det loggas och lagas i en egen PR. X-1 blockerar
därför att 03fdefa7 för in felet i en ny mening där samma plats var rätt.

## Det som håller (avläst)

- Grenens hela matris (MOBILFALL, FYNDFALL, MOTPROV, KOMBIFALL, RESTFALL, 216 fall, `lins12/matris.sh`) genom grenen
  och main. Den elfte linsens `mobilkoll.mjs`: av 190 mobilfall på grenen har 0 ett byte, en besparing, ett
  jämförelsepris, en poäng, ett procenttal, en sekundär besparing, ett byte eller en poäng på den lagrade raden eller
  i rummet, eller ett procenttal eller en besparingsrad i analys-, svars- eller aktiveringsmejlet. Motprov main: 186
  av 186 med minst ett. Skannern (`skanna.mjs`, förbjudna och bredare former): grenen 0 träffar, main 5 skilda.
- Icke-mobila fall mot main (`lins12/jamfor.mjs`, 26 fall i matrisen, 8 i `g1`, 10 i `g2`): samma tal, läge, lagrad
  rad och mejltexter. Skillnaderna är c1:s och 822e9d43:s, granskade förut: `planval: false` i radens parametrar,
  IT-8821-radens borttagna «17 % mer» och aktiveringsmejlets borttagna «Möjlig nettobesparing +0 kr/år» utan byte.
- Rutnätets fall utan hårdvarujustering (`lins12/fv-gren.txt`): där resten visas är P + R = «Ni betalar idag», och R
  är fakturans övriga löpande rader (tillägg, statisk IP, mobil som primär med molnväxel, utan antal, EUR).
- Prompten utan sekundär besparing (`lins12/promptkoll.mjs`, 186 kombinerade fall i matrisen, 10 i `g2`): den beordrade
  meningen bär bara P. Det enda andra krontalet i blocket är raden «Tilläggstjänster (molnväxel/PBX): X kr/år», som
  står likadant på main (se X-2).
- Modellens text och mejlen (`lins12/foljsam.sh`: en följsam modell vars reasoning är promptens ordagranna mening, fyra
  kombinerade fall, grenen och main): analysmejlet och aktiveringsmejlet bär «Kombinerad faktura. Företagsbredband:
  8 388 kr/år.» och inget tal för resten; svarsmejlet bär ingen mening om resten. Ingen yta utom fakturavyn nämner
  resten, och modellen beordras inte att skriva något om den.

## Iakttagelser som inte räknas som fynd

- EUR (`rest·bb+mob·eur`): P räknas ur radbelopp som avrundats till hela kronor efter omräkningen (61 EUR → 641 kr),
  årskostnaden ur totalen (85 EUR × 10,5 × 12 = 10 710). P blir 7 692 (oavrundat 7 686) och resten 3 018 (mobilradens
  252 × 12 = 3 024). P + R går ihop; avvikelsen är P:s avrundning och samma tal som main:s `nonPrimaryAnnual` (3 018).
- Rörliga avgifter och engångsposter ingår inte i resten, och «Ni betalar idag» säger «Exkl. rörliga avgifter» och
  «ingår ej i årsberäkningen». Det är beslutets definition av resten (en årskostnad), inte prövat som fynd.
- Kvartals- och årsfakturor: P är kvartals- eller årsbeloppet × 12 (förexisterande, loggat av elfte linsen). Resten
  blir negativ och stryks i rutnätets fall; ett fall där resten visas med ett sådant P kräver att P redan är fel
  (loggat).
- En avbetalning typad som löpande rad (`A5`) räknas in i P (9 588) och resten blir 2 028: felet i P när regexen missar
  en rad, loggat, räknas inte igen.

## Inte prövat

- Vad modellen faktiskt skriver (inga modellanrop); mejlbeviset vilar på en följsam modell.
- Hur ofta en kombinerad faktura i produktionen bär en avbetalning typad `hardware` (ingen databasåtkomst). Mekanismen
  står i diffen.
- Byggarens renderingssond (scripts/screenshot-planvalsgrind.mjs) kördes inte; egen rendering med samma väg.
- Påminnelsen, enkäten, briefen, prislarmen, prospektet och dörren som renderade sidor: 03fdefa7 rör dem inte (diffen
  har kod bara i recommend.js, api/test-invoice.mjs och TestaFaktura), och `restAnnual` läses bara av fakturavyn (grep).

## Sabotage som linsen körde

Varje sabotage bytte exakt en förekomst (`assert s.count(old) == 1`, `lins12/sab.py`), räknade `# fail` och
`# cancelled` tillsammans och återställde filen med `git checkout --` (`lins12/sabkor.sh`); `git status --short` visade
bara domfilen efter varje körning. Sviten utan sabotage: 2 773 tester, 2 773 gröna, 0 fail, 0 cancelled
(`lins12/svit.txt`).

| Sabotage | Ändring | Beteendet ändrades | Fällda |
|---|---|---|---|
| SX1 | api/test-invoice.mjs: `hardwareAdjustment.adjAnnualCost - 1` i `_visadArskostnad` | ja, A3 ger resten 2 027 och P + R = 10 415 under 10 416 (`lins12/g2-SX1.txt`) | **0 av 2 773** (X-2) |
| SX1m | motprov: `(extracted.annualCost ?? 0) - 1` i grenen utan hårdvara | ja | 2 av 25 i tests/fakturakedjan.mjs (FV-A16, FV-A17) |
| SX3 | recommend.js: raden «Mobildelen på fakturan: {nonPrimaryAnnual} kr/år — nämn den i reasoning» efter primärraden | ja, raden står i prompten genom handlern (`lins12/g2-SX3.txt`) | **0 av 2 773** (X-2) |
| SX3m | motprov: samma rad med «Resten på fakturan» | ja | 2 av 25 i tests/fakturakedjan.mjs (FV-A16, FV-A17) |
