commits: 4029b68b0d4555db1f47c5262c0a96770b636ed1
dom: BLOCKERAR

# Tionde blicken på S1 (4029b68b), uppdrag: hitta var det gröna är osant

Granskningen är klar. Sökvägar `lins10/…` är kataloger i sessionens scratchpad.

**Dom: BLOCKERAR**, på en [KUND] som 4029b68b infört:
- **O-1**: lagningen av N-2 skrev «Övriga tjänster (X kr/år) har vi inte jämfört mot listpris i den här analysen»
  i fakturavyn och i prompten (modellen beordras skriva meningen ordagrant). Villkoret är att fakturan saknar sekundär
  besparing, inte att den är en planvalsfaktura. På en bredbandsfaktura med en mobildel har koden jämfört mobildelen
  mot mobilens listpris (3 228 kr per rad) och bara funnit under 500 kr, och meningen säger att den inte jämförts.
  Återskapat genom handlern och renderat. På main stod en annan falsk mening där («analyseras via Fortnox/Visma»);
  påståendet att vi inte jämfört är nytt.

Tre [VAKT] mergas och lagas framåt: förbudet släpper N-1:s form med omvänd ordföljd (W-1), FV-A12:s «fakturavyn» är
konstanterna och inte vyn (W-2), och FV-A14 ser inte villkorets logik (W-3). Alla tre visade med sabotage som ändrade
beteendet och fällde 0 av 2 770. Två förexisterande [KUND] utanför PR:en (N-4, N-5) loggas och blockerar inte.

Det som håller: ingen mobilfaktura fick ett byte, en besparing, ett procenttal eller en poäng i svaret, den lagrade
raden, rummet eller de tre mejlen (188 mobilfall genom handlern, 0 med tal; motprovet main: 178 av 184). Ingen
förbjuden form, inte heller bredare varianter, i någon yta handlern bygger för de 188 fallen (motprov: samma skanner
hittar fem former på main). Premissen håller: de fem fyndtyperna räknar bara ur kundens egna rader, och ingen fyndtext
nämner listpris (20 fall, alla fem typer). Icke-mobila motprov har samma tal och mejltexter som på main.

## Iakttagelser

- Utcheckat på grenens spets ffd384b8 (bär 4029b68b, därefter bara ops/). Main = e5733f3a.
- Sviten på spetsen, avläst: `CI=true node --test tests/run.mjs` gav tests 2770, pass 2770, fail 0, cancelled 0
  (`lins10/svit.txt`).
- 4029b68b ändrar bara strängar och lägger till en tidig retur i `diagnosMening` för planvalsläget (avläst i diffen,
  `git diff e7512b82 4029b68b -- lib api agents src`, fem filer). Ingen räknelogik rörs.
- Instrument: main (e5733f3a) utpackat med `git archive` i `lins10/main`, med fakturakedjans stubbar. Egen
  laddarkrok i `lins10/` (kopia av stubbarna, Anthropic-stubben bokför också prompten till `recommend`), körare
  `lins10/korj.mjs` (nionde linsens, med fyndets typ och text och prompten i utdata), `lins10/run.sh <fall>`
  kör samma fall-JSON genom grenen och main.
- Hela matrisen (`lins10/gen2.mjs`: MOBILFALL, FYNDFALL, MOTPROV, 190 fall) genom grenen och main. Mobilfallen på
  grenen: 188, varav 0 med `shouldSwitch`, `netSaving > 0`, lägets poäng, radens `should_switch`, rummets total eller
  poäng, radpoäng eller «N % mer» i radtexten. Main: 178 av 184 med minst ett av dem (instrumentet ser talen).
- Skanner för de förbjudna formerna och bredare varianter («säger vi inget om», «gör inget påstående», «inga
  besparingar», «analyseras i», «förrän vi vet», «bevakas», «nästa analys») över reasoning, läget, rummet, de tre
  mejlen och resten av svaret (`lins10/skanna.mjs`): grenen 0 träffar, main fem skilda (rummets «gör inget påstående
  om prisläget», analysmejlets «så vi säger inget om er prisnivå», aktiveringsmejlets «Vi hävdar därför inget»).
- Icke-mobila motprov mot main (`lins10/jamfor.mjs`, bredband ren, IT-8821, och sex kombinerade bredbandsfall):
  samma tal, sekundärdel, underlag, läge, lagrad rad, rummets total och mejltexter. Enda skillnaderna är
  `planval: false` i radens parametrar och IT-8821-radens borttagna «17 % mer» (c1:s MS-11, granskat förut).
  Promptens och fakturavyns mening om övriga tjänster ligger utanför jämförelsen och är O-1.
- Renderat med produktionsbygget (390 och 1600 px, underlaget öppet, `lins10/r1/`, räknat med
  `lins10/lasbilder.mjs`): fem mobilfakturor (höjning kombinerad, slutbetald delbetalning, valutapåslag kombinerad,
  comb-01 utan antal, xl349 utan antal) och två kombinerade bredbandsfakturor. Alla fem mobilvyer bär
  planvalsbeskedet, ingen bär K-3:s notis eller en förbjuden form. Mobilvyn med höjningsfyndet (läst) visar fyndet,
  «Ingen jämförelse mot listpris. … Därför jämför vi inte ert pris mot listpriset.», planvalsmeningen med
  bredbandsmeningen och «Övriga tjänster (8 388 kr/år) har vi inte jämfört mot listpris i den här analysen.» De två
  bredbandsvyerna är O-1.

## Fynd

### O-1 · [KUND], infört: «Övriga tjänster (…) har vi inte jämfört mot listpris» där koden jämfört dem

Meningen står i fakturavyn (src/pages/TestaFaktura/index.js, grenen `potentialMixedCategories` utan
`secondarySaving`) och i prompten, som beordrar modellen att skriva den ordagrant i reasoning
(agents/recommender/recommend.js:495). Villkoret är `secondarySaving == null`, inte planvalet. För en
bredbandsfaktura med en mobildel räknar `computeSecondarySaving` (lib/secondary-savings.js:41-50) mobildelen mot
mobilens p25 (Tele2 269 kr × 12 = 3 228 kr per rad) och returnerar `null` när bruttot är under 500 kr. Då har koden
jämfört delen mot listpris, och meningen säger att den inte har det.

Återskapat genom handlern (`lins10/gen.mjs`, `lins10/run.sh fallA`, `lins10/visa.mjs`): bredband 1000 Mbit 699 kr
+ «Mobilabonnemang Jobbmobil (1 st)» 269 kr (brutto 0) och 299 kr (brutto 360), modellens ja och nej:
`secondarySaving null`, `nonPrimaryAnnual 3 228` resp. `3 588`, och promptens mening «Kombinerat faktura — analysen
avser bredbandabonnemang (8 388 kr/år). Övriga tjänster (3 228 kr+) har vi inte jämfört mot listpris i den här
analysen.» Motprov (instrumentet kan se jämförelsen): samma faktura med mobildelen 449 kr ger `secondarySaving`
med `suggestedAnnual 3 228`, `grossSaving 2 160`.

På main står samma fall med «Övriga tjänster (3 228 kr+) analyseras via Fortnox/Visma» (`lins10/fallA-main.json`),
alltså en annan osanning på samma plats. Påståendet «har vi inte jämfört mot listpris» är nytt i 4029b68b och är
falskt just där koden gjort jämförelsen. Det är regel 13:s form: meningen beskriver planvalsgrindens kodväg, men
visas för varje kombinerad faktura utan sekundär besparing, också där grinden inte gäller. Commitmeddelandet säger
«bredbandsmotprovet oförändrat»; det gäller den rena bredbandsfakturan, inte den kombinerade.

Renderat med produktionsbygget (`npm run build`, `lins10/render.mjs`, 390 och 1600 px, underlaget öppet, texten i
`lins10/r1/bbA-269_nej-1600.txt`): «Kombinerad faktura — analysen avser Företagsbredband (8 388 kr/år). Övriga
tjänster (3 228 kr/år) har vi inte jämfört mot listpris i den här analysen.» Samma i 390 px och för 299-fallet.

Klass: en mening kunden läser är falsk → [KUND]. Infört: meningen och dess påstående är 4029b68b:s (på main stod
en annan, också falsk, mening på samma plats). Prompten gör att modellens egen text bär samma osanning ordagrant på
varje sådan bredbandsfaktura. Blockerar.

### W-1 · [VAKT]: förbudet släpper N-1:s egen form, «säger vi inget om ert pris»

`FORBJUDNA_PLANVALSFORMER` (tests/fakturakedjan.mjs:92) söker `säger inget om`, alltså rak ordföljd. Efter
«Därför»/«så» blir ordföljden omvänd, «säger vi inget om», och det är just den form beslutet förbjuder först (N-1:
«Därför säger vi inget om ert pris för dem …»). Motprovets gamla N-1-text fälls bara av sin andra bisats («ingen
besparing»). Avläst med `node -e` mot regexen: «Därför säger vi inget om ert pris.», «… säger vi ingenting om …»,
«så vi gör inget påstående om prisläget», «Vi räknar inte fram någon besparing», «analyseras i Fortnox» släpps
alla; «vi hävdar inget om er prisnivå» fälls.

Sabotage S1 (`lins10/spec-S1.json`, `assert count == 1`): rummets `oviss_niva` fick «… och därför säger vi inget
om ert pris, så vi jämför inte ert pris mot det.» Beteendet ändrades (avläst: `MOTIVERING.oviss_niva` gav den
meningen, `lins10/visaoviss.mjs`), och 0 av 2 770 tester föll i hela sviten. Texten är den enda av FV-A13:s som
saknar ordagrant lås (`ordagrant: null`), och MS-04/SK-14 kräver bara slutet. Inget kundtal ändras → [VAKT].
Mergas och lagas framåt.

### W-2 · [VAKT]: FV-A12:s «fakturavyn» är konstanterna, inte vyn

FV-A12 prövar ytan `fakturavyn` som `PLANVAL_BESKED.rubrik + .text + reasoning`, alltså lib-konstanten och
handlerns text. Vyn (src/pages/TestaFaktura/index.js) renderar `ANALYSRUBRIKER.planval` ur src/lib/diagnos.js och
egen JSX runt den, och ingen del av den prövas. Sabotage S2: en tillagd mening i JSX efter
`{ANALYSRUBRIKER.planval.text}`, «Därför säger vi inget om ert pris och räknar ingen besparing.» (två förbjudna
former). Beteendet ändrades: bygget med sabotaget, renderat (`lins10/r2/…-1600.txt` rad 26), visar meningen under
planvalsbeskedet. 0 av 2 770 tester föll. Meningen om övriga tjänster är den enda vytext FV-A13 läser. [VAKT].

### W-3 · [VAKT]: FV-A14 är en källtextvakt som inte ser villkorets logik

FV-A14 kräver att strängen `result.lage?.rubrik !== 'planval'` står före notisen. Sabotage S3:
`(result.lage?.rubrik !== 'planval' || true)`. Beteendet ändrades: samma bygge, renderat, visar «Priset baseras på
verifierade offentliga listpriser … Vid genomfört byte bekräftas slutpriset i offert» på mobilfakturan med
höjningsfyndet (`lins10/r2/…-1600.txt` rad 33; 0 träffar i det rena bygget, `lins10/r1/`). 0 av 2 770 tester föll.
Bibeln (8 sep): «Ordningsinvarianter kan bara bevisas av beteende», och samma gäller ett villkor. V-5 är alltså
bara delvis stängd. [VAKT].

### N-4 · [KUND], förexisterande och utanför PR:en: «Bekräfta slutdatum så bevakar vi att den försvinner»

Fyndtypen `hardware_financing` (lib/forensics.js:172) säger «Bekräfta slutdatum så bevakar vi att den försvinner.»
Grep i `lib/ api/ src/ agents/ tests/` gav en träff: strängen själv. Ingen kod tar emot ett slutdatum eller bevakar
raden, samma form som löftet som togs bort ur `hardware_overpaid` 6 sep. Fyndet står på mobilfakturorna i FV-A12:s
matris (fyra fall i `lins10/fallAlla-gren.json`). Förexisterande: `git diff origin/main -- lib/forensics.js` är tom,
och fyndet visas lika ofta på main. S1 gör det inte vanligare. Blockerar inte; loggas för en egen PR.

### N-5 · [KUND], förexisterande och utanför PR:en: «Ni betalar 203 % över verifierat publikt listpris» på en kombinerad bredbandsfaktura

Fakturan i O-1 (bredband 699 kr + mobil 269 kr per månad) får `lage.overMarketPct 203`, och fakturavyn och
aktiveringsmejlet säger «Ni betalar 203 % över verifierat publikt listpris». Talet är hela fakturan (11 616 kr/år,
mobildelen inräknad) mot bredbandets jämförelsepris (3 828 kr/år). Bredbandsdelen ensam ligger 119 % över
(8 388 mot 3 828), och mobildelen ligger på listpris. Underlaget visar «Nuvarande kostnad 11 616», «Jämförelsepris
3 828» och «Bruttobesparing 4 560», som inte går att räkna hem mot varandra. Avläst identiskt på main
(`lins10/fallA-main.json`: 203, 11 616, 3 828). S1 rör inte bredbandsvägen och gör det inte vanligare. Blockerar
inte; loggas för en egen PR (granne till S6, spegelfallet).

## Punkt 3 · meningar som prövades och höll

- `PLANVAL_BESKED.text`, `ANALYSRUBRIKER.planval.text` och analysmejlets kopia: bredvid alla fem fyndtyper, ren och
  kombinerad, modellens ja och nej (FV-A12:s matris genom min körare, och renderat för tre av dem). Ingen fyndtyp
  jämför mot listpris: `derive` och `text` i lib/forensics.js läser bara kundens egen rad, och ingen fyndtext eller
  kravbrev i de 20 fallen nämner listpris, marknad eller billigaste.
- `diagnosMening` i planvalsläget (aktiveringsmejlet): planvalsläget sätts för varje mobilsvar utan byte oavsett
  rutt (`fakturaLage`, lib/lagesregister.js:412), och meningen säger bara skälet och att vi inte jämför. Inget av de
  188 mobilfallen gav den allmänna ramen.
- `PLANVALS_MENING` och `BREDBAND_EJ_PRISSATT`: på en mobilfaktura räknar koden ingen sekundär besparing
  (`planvalsKategori`, api/test-invoice.mjs:1283), så «har vi inte jämfört mot listpris» är sant där.
- Fakturavyns «Övriga tjänster …» på en kombinerad mobilfaktura: sant av samma skäl. Gränsfall, obekräftad bedömning:
  «analysen avser Mobilabonnemang … Övriga tjänster har vi inte jämfört mot listpris» antyder genom kontrasten att
  mobildelen jämförts, vilket planvalsbeskedet ovanför säger att den inte gjort. Meningen påstår det inte; räknas inte
  som fynd.
- Rummets planvalsrad och raden med obekräftad nivå: ingen förbjuden form i de 188 fallen. Raden med obekräftad nivå
  gäller också saas-productivity; läst i koden (`radLage`, inget procenttal när `ovissNiva`), inte kört: där säger
  meningen samma sak om rummets egen jämförelse.
- De ytor 4029b68b inte rör (påminnelsen, enkäten, briefen, prislarmen, prospektet, dörren) läser inte de ändrade
  texterna: grep på `PLANVAL_BESKED`, `diagnosMening`, `PLANVALS_MENING`, `BREDBAND_EJ_PRISSATT` och `MOTIVERING` ger
  bara recommend.js, test-invoice, inbound-email, send-analysis (mejlet och PDF:en), lagesregister, diagnos,
  rumstext, Portfolio och TestaFaktura.

## Inte prövat

- Vad modellen faktiskt skriver med den nya promptmeningen (inga modellanrop). O-1 vilar på prompten, som beordrar
  meningen ordagrant, och på fakturavyns egen mening, som är renderad.
- Hur ofta en bredbandsfaktura i produktionen bär en mobildel nära listpris (O-1) eller är kombinerad (N-5): ingen
  databasåtkomst. Mekanismen gäller varje kombinerad bredbandsfaktura med en mobilrad och under 500 kr brutto.
- Prospektet och briefingsidan som renderade sidor (4029b68b rör dem inte).

## Sabotage som linsen körde

Varje sabotage bytte exakt en förekomst (`assert s.count(old) == 1`, `lins10/sabotage.py` och `lins10/tillampa2.py`),
räknade `# fail` och `# cancelled` tillsammans och återställde filen med `git checkout --`; `git status --short` för
filen var tom efteråt i varje körning. Beteendet kontrollerades för varje sabotage.

| Sabotage | Ändring | Beteendet ändrades | Fällda |
|---|---|---|---|
| S1 | rummets `oviss_niva`: «… och därför säger vi inget om ert pris, så vi jämför inte ert pris mot det.» (src/lib/rumstext.js), riktade filer | ja, `lins10/visaoviss.mjs` | 0 av 183 |
| S1h | samma, hela sviten | ja | **0 av 2 770** (W-1) |
| S2 | fakturavyns planvalsbesked + «Därför säger vi inget om ert pris och räknar ingen besparing.» i JSX (src/pages/TestaFaktura/index.js), hela sviten | ja, renderat ur bygget med sabotaget (`lins10/r2/`) | **0 av 2 770** (W-2) |
| S3 | listprisnotisens villkor `(result.lage?.rubrik !== 'planval' \|\| true)`, hela sviten | ja, notisen renderad på mobilfakturan (`lins10/r2/`) | **0 av 2 770** (W-3) |
