commits: 193dd2d8d16e3af83805aaf4e292fc55f5635711
dom: BLOCKERAR

# Elfte blicken på S1 (193dd2d8), uppdrag: hitta var det gröna är osant

Granskningen är klar. Sökvägar `lins11/…` är kataloger i sessionens scratchpad.

**Dom: BLOCKERAR**, på en [KUND] som 193dd2d8 infört:
- **P-1**: verkställandet av Fables beslut skriver två olika tal under samma etikett. Prompten beordrar modellen att
  skriva «Övrigt på fakturan: {X} kr/år.» ordagrant, med X = bara den andra kategorins rader. Fakturavyns underlag
  skriver «Övrigt på fakturan: {X} kr/år.» med X = resten av årskostnaden. På en kombinerad bredbandsfaktura med en
  molnväxelrad står «Övrigt på fakturan: 3 228 kr/år» i modellens text (fakturavyn, analysmejlet,
  aktiveringsmejlet) och «Övrigt på fakturan: 5 616 kr/år» i underlaget, under «Ni betalar idag 14 004 kr/år».
  Återskapat genom handlern och renderat. På main bar promptens tal «kr+» (minst) och var sant. 193dd2d8 strök
  plustecknet och gav talet etiketten för hela resten av fakturan.

Ett [VAKT] mergas och lagas framåt: FV-A15, FV-A16 och den vidgade förbudslistan låser orden, inte påståendet
(P-2, fem sabotage som ändrade beteendet och fällde 0 av 2 772, med motprov som fällde).

Det som håller: ingen mobilfaktura fick ett byte, en besparing, ett procenttal eller en poäng i svaret, den lagrade
raden, rummet eller de tre mejlen (188 mobilfall genom handlern, 0 med tal; motprovet main: 184 av 184). Ingen
förbjuden form i någon yta för mobilfallen (motprov: samma skanner hittar fem former på main). Icke-mobila fall
har samma tal, läge, rad, rum och mejltexter som på main. O-1:s fall (bredband + mobil 269/299) bär nu bara tal, och
de talen stämmer där.

## Iakttagelser

- Utcheckat på grenens spets 193dd2d8 (FETCH_HEAD), alltså den granskade commiten själv.
- 193dd2d8 ändrar i kod: promptens mening om en kombinerad faktura (agents/recommender/recommend.js) och
  fakturavyns mening om resten (src/pages/TestaFaktura/index.js). Resten är tester, renderingssonden och ops/.
- Sviten på spetsen, avläst: `CI=true node --test tests/run.mjs` gav tests 2772, pass 2772, fail 0, cancelled 0
  (`lins11/svit.txt`).
- Instrument: main (e5733f3a) utpackat med `git archive` i `lins11/main`. Körare `lins11/korj.mjs` med laddarkrok
  och stubbar kopierade ur `lins10/` (Anthropic-stubben bokför prompten till `recommend`), `lins11/run.sh <fall>`
  kör samma fall-JSON genom grenen och main, `lins11/visa.mjs` skriver ut annualCost, P, `nonPrimaryAnnual`,
  promptens rader och vyns mening byggd med vyns formel. Egna fall i `lins11/gen.mjs` (20 fall: bredband + mobil
  med molnväxel, statisk IP, router, pappersfakturaavgift, startavgift, delbetalning; mobil + bredband + molnväxel;
  kvartal; utan antal och hastighet; en mobilrad som regexen inte känner).
- Grenens hela matris (MOBILFALL, FYNDFALL, MOTPROV, KOMBIFALL, 196 fall, `lins11/gen2.mjs`) genom grenen och
  main (`run.sh matris`). `lins11/mobilkoll.mjs`: av 188 mobilfall på grenen har 0 `shouldSwitch`, besparing,
  `suggestedAnnualCost`, poäng, `overMarketPct > 0`, `savingRange`, sekundär besparing, radens byte eller poäng,
  rummets poäng eller «N % mer», eller ett procenttal eller en besparingsrad i analys-, svars- eller
  aktiveringsmejlet. Main: 184 av 184 med minst ett (instrumentet ser talen). `lins11/skanna.mjs` (tionde linsens
  skanner, förbjudna och bredare former): grenen 0 träffar, main 5 skilda.
- Icke-mobila fall mot main (`lins11/jamfor.mjs`, 8 fall: bredband, IT-8821 och KOMBIFALL): samma tal, sekundärdel,
  läge, lagrad rad, rummets poäng och mejltexter. Enda skillnaderna är `planval: false` i radens parametrar och
  IT-8821-radens borttagna «17 % mer» (c1:s MS-11, granskat förut).
- 193dd2d8 rör inte påminnelsen, enkäten, briefen, prislarmen, prospektet eller dörren (diffen har kod bara i
  recommend.js och TestaFaktura). Modellens text (`reasoning`) läses bara av fakturavyn, api/send-analysis.mjs och
  api/activate-intelligence.mjs (grep i api/, api/cron/, lib/briefing-generator.js, lib/invoice-store.js,
  Portfolio och Briefing), alltså når P-1:s mening de tre ytorna och lagras inte.

## Fynd

### P-1 · [KUND], infört: «Övrigt på fakturan: 3 228 kr/år» i modellens text, «5 616 kr/år» i underlaget, samma faktura

Prompten beordrar modellen att skriva «Kombinerad faktura. {Kategori}: {P} kr/år. Övrigt på fakturan: {X} kr/år.»
ordagrant (agents/recommender/recommend.js:498 och :507). X i prompten är `nonPrimaryAnnualForPrompt`
(recommend.js:213-217): `secondaryComponentMonthly × 12` när den finns, alltså bara raderna som matchar den andra
kategorins regex (lib/invoice-metrics.js:21-30), utan tilläggsraderna. Fakturavyns X är
`recommendation.nonPrimaryAnnual` (recommend.js:2296), `annualCost − P − addonAnnual`, där tillägget bara räknas
bort för fakturans egen kategori. De två talen bär samma etikett och är olika tal.

Återskapat genom handlern (`lins11/gen.mjs`, `lins11/run.sh g1`, `lins11/visa.mjs`): «Företagsbredband Fiber
1000/1000» 699 kr + «Mobilabonnemang Jobbmobil (1 st)» 269 kr + «Molnväxel Touchpoint» 199 kr/mån (tillägg, pbx),
modellens ja och nej. annualCost 14 004. Prompten: «… EXAKT "Kombinerad faktura. Företagsbredband: 8 388 kr/år.
Övrigt på fakturan: 3 228 kr/år."». Svarets `nonPrimaryAnnual` 5 616, alltså vyns «Övrigt på fakturan: 5 616
kr/år.». Med en följsam modell (stubbens reasoning = promptens ordagranna mening, `lins11/foljsam.mjs`, `g2`) bär
analysmejlet «Du betalar idag 14 004 kr/år … Kombinerad faktura. Företagsbredband: 8 388 kr/år. Övrigt på
fakturan: 3 228 kr/år.», och aktiveringsmejlet samma mening. 8 388 + 3 228 = 11 616, inte 14 004: molnväxeln
(2 388 kr/år) står varken i bredbandet eller i «övrigt». Samma form med statisk IP (99 kr/mån, tillägg): annualCost
12 804, och både prompten och vyn säger 8 388 + 3 228.

På main (`lins11/g1-main.json`) stod samma plats «Övriga tjänster (3 228 kr+) analyseras via Fortnox/Visma.»:
talet bar «kr+», alltså «minst», och var sant (fast meningen bar N-2:s falska löfte). 4029b68b behöll «kr+».
193dd2d8 strök plustecknet och bytte etiketten till «Övrigt på fakturan», som påstår att talet är resten av
fakturan. Det är fel där en tilläggsrad står på fakturan, och det är en annan siffra än underlaget i samma vy
under samma etikett. Klass: ett tal kunden läser är fel och två tal motsäger varandra → [KUND]. Infört av
193dd2d8. Blockerar.

Renderat med produktionsbygget (`npm run build` på 193dd2d8, `lins11/render.mjs` via `lins11/rendera.sh`, 390 och
1600 px, underlaget öppet, svaret ur handlern med en följsam modell): `lins11/r1/bb+mob269+vaxel_ja_foljsam-1600.txt`
rad 34 under «ARVO BEDÖMER»: «Kombinerad faktura. Företagsbredband: 8 388 kr/år. Övrigt på fakturan: 3 228 kr/år.
…», rad 58 i underlaget: «Kombinerad faktura. Företagsbredband: 8 388 kr/år. Övrigt på fakturan: 5 616 kr/år.»,
rad 61: «NI BETALAR IDAG 14 004 kr / år». Samma i 390 px och för modellens nej. Statisk IP-fallet (`…ip_ja_foljsam-…`):
båda raderna 8 388 + 3 228 under «Ni betalar idag 12 804». (Rad 24, «Ni betalar 266 % över verifierat publikt
listpris», är N-5, förexisterande och loggat, och räknas inte här.)

Två fall till med samma rot, genom handlern (`lins11/gen3.mjs`, `lins11/gen4.mjs`, `run.sh g3`/`g4`):
- En mobilrad som regexen inte känner (`/\bsim\b|mobilabonnemang|mobiltelefoni/`): «Företagsbredband Fiber
  1000/1000» 399 kr + «Telia Jobbmobil 15 GB (1 st)» 269 kr, route auto, annualCost 8 016. Prompten: «… EXAKT
  "Kombinerad faktura. Företagsbredband: 8 016 kr/år. Övrigt på fakturan: 0 kr/år."». Båda talen är fel för
  fakturan (bredbandet är 4 788, resten 3 228), och meningen säger «kombinerad» och «övrigt 0» i samma andetag.
  Main: «analysen avser bredbandabonnemang (8 016 kr/år). Övriga tjänster (0 kr+) analyseras via Fortnox/Visma.»
  Motprov: samma faktura med «Mobilabonnemang Jobbmobil (1 st)» ger 4 788 + 3 228 (`bb399+mobil-bas`).
- En kombinerad bredbandsfaktura i EUR: prompten «Övrigt på fakturan: 2 952 kr/år.», vyns `nonPrimaryAnnual`
  2 949, alltså två olika tal under samma etikett också utan tilläggsrad (avrundning per led).

Vyns egen mening bär samma lucka när tilläggsraden hör till fakturans egen kategori. Renderat ur det rena bygget
(`lins11/r2/mob+bb+vaxel_nej-1600.txt`, mobil 3 490 + bredband 699 + molnväxel 199 kr/mån): rad 41 «Kombinerad
faktura. Mobilabonnemang: 41 880 kr/år. Övrigt på fakturan: 8 388 kr/år.», rad 43–44 «NI BETALAR IDAG 52 656 kr /
år». Där stod samma tal på main som «Övriga tjänster (8 388 kr/år)», så den delen av vyn är förexisterande i talet;
den räknas inte som ett eget fynd, men en lagning av P-1 som bara jämkar promptens tal till vyns lämnar den kvar.

Gränsen för beviset: inget modellanrop. Modellens text bygger på att prompten beordrar meningen ordagrant, samma
grund som den tionde linsen och FV-A16 använder. Fakturavyns egen rad (5 616) och promptens tal (3 228) är avlästa
ur handlern.

### P-2 · [VAKT]: FV-A15 och FV-A16 låser orden, inte påståendet, och FV-A15 skiljer på versaler

FV-A15 räknar `/jämfört mot listpris|jämför inte|jämför vi inte/g` utan `i`-flagga, och FV-A16 prövar promptens
rader mot `/jämfört mot listpris|jämför inte|ej benchmarkad|analysen avser|analyseras/i`. O-1:s påstående med en
annan böjning eller versal passerar båda. Tre sabotage, varje med `assert s.count(old) == 1` (`lins11/sab.py`),
hela sviten, filen återställd med `git checkout --` (`lins11/svit.sh`):
- SA: fakturavyn får efter «Övrigt på fakturan: …» raden «Övrigt på fakturan har inte jämförts med listpris i den
  här analysen.» Beteendet ändrades: bygget med sabotaget, renderat (`lins11/r-SA/…-1600.txt` rad 58), visar
  meningen i underlaget. **0 av 2 772** föll.
- SB: promptens instruktion blir «KRITISKT: Skriv att övrigt på fakturan inte har jämförts med listpris. Ange i
  reasoning EXAKT …». Beteendet ändrades: promptraden avläst genom handlern med sabotaget (`lins11/g2-spec-SB.json`).
  **0 av 2 772** föll, också FV-A16, som finns för just promptens mening.
- SC: fakturavyn får «Jämför inte vi resten mot listpris? Nej, det gör vi inte.» (versalt J). Beteendet ändrades:
  meningen står i bygget med sabotaget (`lins11/build-spec-SC/static/js/main.*.js`). **0 av 2 772** föll.
- SD: «kommentarer undantagna» undantar kod. En rad i promptens mall (recommend.js, efter «OBS KOMBINERAT
  FAKTURA …») som börjar med `*`: «* Skriv i reasoning: Övriga tjänster jämför vi inte mot listpris i den här
  analysen.» FV-A15:s filter (`/^\s*(\/\/|\*|\/\*|\{\/\*)/`) läser raden som en kommentar och räknar den inte,
  och FV-A16:s lista saknar «jämför vi inte». Beteendet ändrades: raden står i prompten genom handlern
  (`lins11/g2-spec-SD.json`). **0 av 2 772** föll. recommend.js har 119 rader som börjar med `*`.
- SE (W-1:s vidgade lista): svarsmejlets planvalsrad (api/inbound-email.mjs:354), som saknar ordagrant lås, får
  «… — vi vet inte vilken produkt ni har, så vi säger alltså inget om ert pris». Beteendet ändrades: svarsmejlet
  för xl349·nej·antal bär meningen genom handlern (`lins11/m1-spec-SE.json`). **0 av 2 772** föll. N-1:s form
  med ett inskjutet ord passerar `/säger (vi )?(inget|ingenting) om/`. Motprov SEm, samma plats utan «alltså»:
  FV-A12 föll, 1 av 24 i tests/fakturakedjan.mjs (`lins11/fil-spec-SEm.txt`).
Motprov (instrumentet ser platsen): SCm, samma plats med gemener («Resten jämför inte vi mot listpris.») fällde
FV-A15, 1 av 24 i tests/fakturakedjan.mjs (`lins11/fil-spec-SCm.txt`). Bibelns uttalade blindfläck för ordvakter
(«läser ORD, aldrig innebörd») gäller, men FV-A15:s titel säger att formen «jämför inte» bara står i konstanterna,
och SC visar att den inte prövar det. Inget kundtal ändras → [VAKT]. Mergas och lagas framåt.

## Iakttagelser som inte räknas som fynd

- FV-A16:s motprov (mobildel 449 kr på en bredbandsfaktura, `grossSaving === 2160`) kräver spegelfallets beteende:
  mobildelen räknas mot mobilens billigaste abonnemang. Prompten för samma fall beordrar «Vi kan förbereda även
  bredbandsbytet — det finns ett lägre verifierat listpris» om mobildelen (avläst genom handlern i `g3`,
  `molnvaxel+mobil`, och i KOMBIFALL 449). Båda är spegelfallet, loggat och flyttat till S6; testet blir ett
  trettioförsta lås att flytta där.
- Promptens «analysen avser {kategori}» är struken enligt Fables beslut, punkt 1. Det var den enda meningen i
  modellens text som sa att bytet gäller primärdelen; rubriken «14 004 → 3 828 kr/år» (N-5) står nu utan den.
  Underlaget visar fortfarande uppdelningen. Beslutet prövas inte här; N-5 går till S6.
- En kvartalsfaktura (bredband 2 097 + mobil 807 kr per kvartal) får primärdelen 25 164 kr/år, alltså
  kvartalsbeloppet × 12, i prompten (lib/invoice-metrics.js summerar radbelopp som månad). Fallet gick till
  granskning (`sanity_check_failed`) på både grenen och main, och talet är detsamma på main. Förexisterande,
  utanför PR:en, inte prövat vidare.

## Inte prövat

- Vad modellen faktiskt skriver med promptens mening (inga modellanrop). P-1 vilar på att prompten beordrar meningen
  ordagrant och på fakturavyns egen rad, som är renderad.
- Hur ofta en kombinerad bredbandsfaktura i produktionen bär en tilläggsrad, en mobilrad som regexen inte känner
  eller annan valuta än SEK (ingen databasåtkomst). Mekanismen står i diffen: plustecknet och etiketten.
- Byggarens renderingssond (scripts/screenshot-planvalsgrind.mjs) kördes inte; egna renderingar med samma väg.
- Briefingsidan, prospektet och dörren som renderade sidor (193dd2d8 rör dem inte).

## Sabotage som linsen körde

Varje sabotage bytte exakt en förekomst (`assert s.count(old) == 1`, `lins11/sab.py`), räknade `# fail` och
`# cancelled` tillsammans och återställde filen med `git checkout --` (`lins11/svit.sh`, `lins11/fil.sh`,
`lins11/korsab.sh`, `lins11/byggsab.sh`); `git status --short` visade bara domfilen efter varje körning.

| Sabotage | Ändring | Beteendet ändrades | Fällda |
|---|---|---|---|
| SA | fakturavyn: «Övrigt på fakturan har inte jämförts med listpris i den här analysen.» efter övrigt-raden | ja, renderat ur bygget med sabotaget (`lins11/r-SA/`) | **0 av 2 772** (P-2) |
| SB | prompten: «KRITISKT: Skriv att övrigt på fakturan inte har jämförts med listpris. Ange i reasoning EXAKT …» | ja, promptraden genom handlern | **0 av 2 772** (P-2) |
| SC | fakturavyn: «Jämför inte vi resten mot listpris? Nej, det gör vi inte.» (versalt J) | ja, meningen i bygget | **0 av 2 772** (P-2) |
| SCm | motprov: samma plats, «Resten jämför inte vi mot listpris.» | ja | 1 av 24 i tests/fakturakedjan.mjs (FV-A15) |
| SD | promptens mall: en rad som börjar med `*`, «Övriga tjänster jämför vi inte mot listpris …» | ja, raden i prompten genom handlern | **0 av 2 772** (P-2) |
| SE | svarsmejlets planvalsrad: «…, så vi säger alltså inget om ert pris» | ja, svarsmejlet genom handlern | **0 av 2 772** (P-2) |
| SEm | motprov: samma plats utan «alltså» | ja | 1 av 24 i tests/fakturakedjan.mjs (FV-A12) |
