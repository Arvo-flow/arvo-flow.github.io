commits: 1f595621
dom: BLOCKERAR
# Andra blicken på c1: mobil kräver bekräftat abonnemang (1f595621)

Granskat: `1f595621` på `claude/fable-5-resume-i60dmd` mot `origin/main` `1677f2bd`. Jämförelsen mot main
gjordes på ett eget träd (`git archive 1677f2bd`). Samma sonder kördes mot båda träden.

Sviten på commiten: `node --test tests/run.mjs` gav **2725 av 2725 gröna** (`svit-commit.txt`).

## Domen

**BLOCKERAR.** Det finns 2 [KUND]-fynd som uppfyller stoppregeln. C1-1 är infört i commiten och C1-2 har
blivit vanligare genom den. Utöver dem finns 2 förexisterande [KUND] som inte blockerar (C1-3, C1-4) och
4 [VAKT] (C1-5..C1-8).

Det commiten lovar håller för en mobilrad **utan lagrat byte**. Rader för 349, 299, 269 och 199 kr visar
inget avstånd, ingen poäng och inget «på eller under», och fakta står kvar. Motproven är oförändrade mot
main: M365 med E3-rad, loneadmin, bredband, el och kortterminal (`sond-rum.mjs`).

Beslutet håller däremot inte för en mobilrad **med** lagrat byte, och det är just vad fakturavägen lagrar
för 349-planen till listpris. På den raden visar rummet fortfarande ett procenttal och en poäng, och efter
commiten säger det dessutom emot sig självt i samma kort (C1-1).

Commiten tar också bort mobilraden ur rummets sammanvägda poäng utan att etiketten säger det. Därför
berömmer rum som main bedömde «i nivå» nu kundens priser, trots att största delen av kostnaden är omätt
(C1-2).

| ID | Klass | Status | Kort |
|---|---|---|---|
| C1-1 | [KUND] | infört | Mobilrad med lagrat byte: poäng 66, «23% mer», «0 prissatta», «Vägde 0 fakturor» och «Vi sätter varken avstånd eller poäng här» i samma rum |
| C1-2 | [KUND] | vanligare | Rummets dom berömmer («Allt är under kontroll», «Era priser står sig», «Bättre än listpris») med obekräftade mobilrader utanför vägningen, och etiketten säger «mot verifierat listpris» |
| C1-3 | [KUND] | förexisterande | Fakturavyn, mejlen, briefingen och dörren mäter fortfarande planvalet: «Ni betalar 30 % över verifierat publikt listpris», poäng 66 och byte till 269-planen |
| C1-4 | [KUND] | förexisterande | Bytesradens «Ni betalar 23% mer» räknas (a−s)/a, alltså 85-felet. Rätt tal är 30 % |
| C1-5 | [VAKT] | infört | MS-06 är en källtextvakt. Om spärren flyttas efter tilldelningen kommer ankarkortet tillbaka, och sviten förblir grön (0 fällda) |
| C1-6 | [VAKT] | infört | Ingen test prövar en obekräftad rad med byte. MS-01 matar bara `should_switch: false`, och lagningsriktningen fäller 0 tester |
| C1-7 | [VAKT] | infört | Kvarlämnade påståenden om att «mobil 1,1× → kategorigolvet duger» står i kod, test och bibeln. Bibeln är inte uppdaterad i samma commit |
| C1-8 | [VAKT] | infört | Nivågrenen i `medianEtikett` är oprövad (S5 fällde 0). MS-05:s titel lovar «med och utan spärren» men kör bara det ena läget |

## Fynd

### C1-1 · [KUND] · infört i commiten: en mobilrad med lagrat byte säger emot sig själv och får fortfarande poäng och procenttal

**Vad som körs i produktionen.** Fakturavägen lagrar ett byte för 349-planen till exakt listpris.

`sond-faktura.mjs` kör `recommend()` med en stubbad modell och sedan `fakturaLage()`. Indata: Tele2,
10 abonnemang à 349 kr/mån.
- Utfall: `shouldSwitch: true`, `suggestedAnnualCost: 32 280` och `savingPerYear: 9 600`.
- Utfallet är detsamma när modellen svarar `shouldSwitch: false`.
- Motprov: 269 kr ger `shouldSwitch: false`, och 199 kr ger `false`.

Därefter läste jag api-lagrets finansgrindar (`api/test-invoice.mjs` 1951–1973). Båda passeras: 32 280 är
mindre än 41 880, och besparingen är större än 0.

`verifySanity` släpper igenom 23 %. Det mätta utfallet är `skip_verified` för `live_analyses` och
`skip_low` för `estimated`. Motprov: 95 % fälls (`saving_95pct_exceeds_max_60pct`).

Raden lagras alltså med `should_switch = true`, `net_saving = 7 680` och `suggested_annual_cost = 32 280`.
Live-körningen är inte mätt härifrån, eftersom extraktionen kräver modellen och produktionsdatabasen inte
gick att läsa.

**Vad rummet gör med raden.** Jag körde `sond-rum.mjs` (`buildBranchAnchors → berikaRader → byggRum`) på
main och på commiten, med raden ovan.

| | main | commit |
|---|---|---|
| radens läge | `byte` | `byte` (`radLage` frågar `byte` före `oviss_niva`) |
| radens poäng | 59 (`scoreUrUnderlag`, takad 79) | **66** (`radScore`-reserven ur `gross_saving / annual_cost`, eftersom `arvoScore` nu är null) |
| motivering | «Ni betalar **23% mer** … Arvo rekommenderar byte» | samma |
| underlaget | «Ni ligger 30 % över det billigaste priset» | «**Hur långt ifrån ni ligger kan vi inte säga** … **Vi sätter varken avstånd eller poäng här.**» |
| räknaren | 1 prissatt, 0 mottagna | **0 prissatta, 1 mottagen** |
| rummets poäng och läge | 59 · `byte_i_niva` | **66** · `byte_i_niva` («I nivå med listpris») |

**Renderat i 1600 px** (`bilder/mobil-byte-desktop.png`, med motprovet `bilder-main/mobil-byte-desktop.png`).
Allt följande står samtidigt på samma sida:
- «Prissatta 0 · Mottagna 1»;
- «Ni ligger i nivå med verifierat listpris — 1 avtal kan skärpas. 7 680 kr/år …»;
- «ARVO SCORE MOT VERIFIERAT LISTPRIS 66/100»;
- «Vägde **0 fakturor** mot verifierat publikt listpris»;
- «INNEHAVET · 0 PRISSATTA · 1 MOTTAGEN, INTE PRISSATT»;
- radens ring 66 och märket «+7 680 kr/år»;
- «Ni betalar 23% mer än det billigaste verifierade alternativet»;
- rakt under den: «Hur långt ifrån ni ligger kan vi inte säga … Vi sätter varken avstånd eller poäng här.»

Main visade 59, «1 prissatt», «Vägde 1 faktura» och «Ni ligger 30 % över». Det var fel enligt beslutet,
men det sa inte emot sig självt.

**Varför det blockerar.**
- Grundarbeslutet säger att rummet inte ska visa procentuellt avstånd och score utan bekräftat abonnemang.
  Raden gör båda.
- Commiten påstår att en mobilrad utan bekräftat abonnemang får inget avstånd och ingen poäng (MS-01).
  Det påståendet är bara prövat med `should_switch: false`.
- Poängen ändrades av commiten (59 → 66).
- Räknaren, kvittot och underlagstexten är nya, och de säger emot raden och domen ovanför. Det är
  helhetskravet (15 aug).

**Lagning.** Den bör göras på två ställen:
1. En rad med `prisunderlag.ovissNiva` får aldrig `radScore` eller `byte`-motiveringens procenttal, inte
   heller via reserven. Lagrade rader finns, och de räknas vid läsning.
2. Grundorsaken är C1-3: bytesmålet för mobil räknas mot den billigaste planen utan att abonnemanget är
   känt, alltså planvalet som besparing. Bytet bör grindas på samma deklaration som rummet
   (`kraverBekraftadNiva`). För saas finns redan motsvarigheten i lfl-grinden.

Ett MS-test med `should_switch: true` behövs, se C1-6.

### C1-2 · [KUND] · vanligare: rummet berömmer kundens priser när obekräftade mobilrader står utanför vägningen

`rumScore` väger bara mätta rader. Commiten gör varje mobilrad omätt men ändrar varken domen eller
poängens etikett. Etiketten på Arvo Score frågar bara `counts.bevakade > 0` och aldrig `counts.mottagna`.
Kommentaren på samma ställe (Portfolio rad 1029) säger: «Står fyra av nio utanför ska det stå i
etiketten — annars läser 90/100 som ett omdöme om hela boken.»

Jag körde `sond-blandat.mjs` (`byggRum`) på båda träden:

| rum | main | commit |
|---|---|---|
| mobil 100 × 349 (418 800 kr) + M365 E3 till listpris (50 012 kr) | `lugn_i_niva` · 62 · «I nivå» | **`lugn_battre` · 88 · «Bättre än listpris» · beröm** |
| mobil 100 × 299 + E3 | `lugn_battre` · 78 | `lugn_battre` · 88 |
| mobil 100 × 349 + loneadmin 5 000 kr (19 % över golvet) | `lugn_i_niva` · 59 | **`lugn_battre` · 69 · beröm** |

**Renderat** (`bilder/mobil100-plus-lon-desktop.png` mot `bilder-main/…`). På commiten står:
- «Allt är under kontroll.»;
- «Håll kursen. Era priser står sig mot verifierat listpris.»;
- «ARVO SCORE MOT VERIFIERAT LISTPRIS 69/100 · Ni ligger bättre än verifierat listpris»;
- «Era priser står sig … Lugnet att ni ligger rätt är också en leverans.»

Det står över ett rum där 99 % av kostnaden (418 800 av 423 800 kr) är en rad som rummet själv säger att
det inte kan bedöma. I samma vy säger Marknadsankaret om den enda mätta raden: «mer än leverantörens eget
listpris … ni ligger över». Main sa «Ni ligger i nivå med verifierat listpris» och gav inget beröm.

Formen är förexisterande för M365-rader med obekräftad nivå. Commiten gör den vanligare, eftersom varje rum
med en mobilrad och någon mätt rad nu döms bara på den mätta raden. Det är 11 september-regeln: *en fix som
gör ett gammalt redovisningsfel vanligare måste stänga det också.*

Att 19 % över golvet ger «Bättre än listpris» beror på `marknadslage`-gränsen 67. Den gränsen är
förexisterande.

**Lagning.**
- Domen får inte ge beröm (`positivtPrispastaende`) när obekräftade rader står utanför vägningen, åtminstone
  inte när de bär en väsentlig del av kostnaden.
- Etiketten ska säga «N av M fakturor prissatta» också när `mottagna > 0`, inte bara när `bevakade > 0`.

### C1-3 · [KUND] · förexisterande: fakturavyn, mejlen, briefingen och dörren mäter fortfarande planvalet

Fakturavägen är oförändrad mellan main och commiten (`sond-faktura.mjs` gav identisk JSON, `diff` utan
skillnad). För 349-planen till exakt listpris ger `fakturaLage` följande:
- `matt: true`, poäng **66** och etiketten «Förbättringsläge»;
- `overMarketPct` **30**, alltså enligt `diagnosMening` «Ni betalar 30 % över verifierat publikt listpris.
  Ett lägre verifierat pris finns att hämta.»;
- för 299-planen med modellens ja: poäng 85, `overMarketPct` 11.

Samma läge går till analysmejlet och aktiveringsmejlet (`api/send-analysis.mjs`, `fakturaLage`).

Briefingens typ 1 (`lib/briefing-generator.js`) gör av samma rad «Byte från Tele2: 7 680 kr/år netto ·
Räknat mot verifierat publikt listpris». Briefingen är premiumgrindad.

Dörren (`lib/domain-intel.js` `buildMarketAnchorFinding`) skriver «Måttstocken vi väger mobilfakturor mot:
269 kr/mån per abonnemang … Betalar ni mer ska fakturan kunna visa varför». Det är samma planval som
beslutet säger att talet mäter.

Detta är exakt grundarens exempel, «+30 %» för 349-planen, i fakturavyn i stället för rummet. Beslutet
nämner rummet, men regel 5 och skälet i beslutet gäller alla ytor. Fyndet blockerar inte, eftersom det
varken är infört eller vanligare. Det är däremot roten till C1-1, och en uppföljning bör ta det i samma
arbetsorder.

### C1-4 · [KUND] · förexisterande: «Ni betalar 23% mer» är 85-felet

`radLage` räknar `ovPct = (annual − suggested) / annual`, och `MOTIVERING.byte` skriver det som «X% mer än
det billigaste». Med 41 880 mot 32 280 blir det **23 %**. Rätt tal för «mer än» är (a−s)/s = **30 %**.

Mätt i `sond-rum` på båda träden: «Ni betalar <b>23% mer</b>». Det är identiskt på main och commiten. Bibeln
förbjuder formen uttryckligen («andel-av-priset-formeln får aldrig kallas "mer än"»). Fyndet syns i C1-1:s
rendering men är inte infört.

### C1-5 · [VAKT] · infört: MS-06 kan inte se ordningen i ankarvalet

S2 flyttade `if (an.kraverBekraftadNiva) continue;` till raden **efter** `best = …`. Hela sviten blev
**0 fällda av 2725**. Beteendet ändrades: jag byggde om med sabotaget och renderade (`bilder-s2/`).
Mobilrummet visade då «MARKNADSANKARET … Ni betalar 4 188 kr per abonnemang/år — mer än leverantörens eget
listpris på 3 588 kr». Motprov: utan sabotaget finns 0 träffar på «MARKNADSANKARET».

Bara renderingssonden (som inte ingår i sviten) fångar detta. Det är `indexOf`-läxan från 8 sep:
ordningsinvarianter kan bara bevisas av beteende.

**Lagning.** Lyft ankarvalet till en ren funktion och pröva den med beteende.

### C1-6 · [VAKT] · infört: ingen test prövar en obekräftad rad med byte

MS-01 säger «oavsett abonnemang» men bygger alltid raden med `should_switch: false`.

S12 är lagningsriktningen för C1-1: `radScore` returnerar null för `prisunderlag.ovissNiva`. Det sabotaget
fällde **0 av 2725**. Inget test låser alltså vad en lagrad bytesrad med obekräftad nivå ska visa, åt något
håll. Testet matar sitt eget indata i den enda form där spärren håller, och därför syntes C1-1 inte.

### C1-7 · [VAKT] · infört (kvarlämnat): påståenden om att mobilens 1,1× räcker för kategorigolvet

Följande ställen säger fortfarande att mobil inte behöver bekräftad nivå:
- `lib/price-alert.js:47`: «mobil har 1,1× och behåller kategorigolvet».
- `tests/matriskrav.mjs:163`: «produkterna är utbytbara, golvet är rätt jämförelse».
- `tests/scorekrav.mjs:237–240` (SK-11) säger «(mobil, 1,1×) gäller kategorins golv som förut» och prövar
  `avstandPct 11` på mobilens tal med ett handbyggt ankare utan spärr. Testet är grönt, men det beskriver ett
  mobilbeteende som inte längre finns.
- `CLAUDE.md:1709` och `:2068` (bibeln) säger samma sak. Bibeln kräver att den uppdateras i samma commit när
  ett beslut ändrar den.

Inget av detta är kundsynligt. Nästa läsare kontrollerar inte en kommentar som intygar något falskt.

### C1-8 · [VAKT] · infört: två svaga ställen i de nya vakterna

**`medianEtikett`-grenen för bekräftad nivå är oprövad.** S5 ersatte
`nivaGolvet > 0 ? 'Samma licens utan bindning' : ankare.medianEtikett` med bara ankarets etikett. Det
fällde 0 tester.

Beteendet ändras nästan aldrig, eftersom bara saas-productivity kan ge `nivaGolvet > 0` och dess ankare bär
samma sträng. Undantaget är ett rum med fler än 8 kategorier, där `buildBranchAnchors` bryter och ankaret
saknas. Grenen ser alltså ut som ett skydd men är i praktiken ett skydd bakom ett annat skydd. Det bör stå
utskrivet, eller prövas med ett fall där ankaret saknas.

**MS-05:s titel lovar «med och utan spärren».** Testet kör bara läget med spärren. Påståendet är sant per
konstruktion, eftersom `bokfortListpris` ger null för allt utom Microsoft, men testet visar det inte.

### Prövat och friat

- **Prospektet** visar nu «Vilken nivå ni har vet vi inte — priset gäller den namngivna produkten» för
  mobil. Kortet säger «Lägsta publicerade pris», så meningen är sann.
- **Prislarmet för mobil** ger null både med och utan spärren. Det är läst i koden och prövat i MS-05.
- **Lagrade tal.** `health_score` lagras men läses inte av någon yta (grep i `api lib src agents`).
  Prisunderlaget och poängen räknas vid läsning, så befintliga mobilrader utan byte ändras direkt.
- **Mobil under golvet (199 kr)** får inget «på eller under» och ingen grön markering (`underGolv` null).
  Texten «säger inget om avståndet» är sann.

## Sabotage

Varje sabotage kördes med `assert s.count(old) == 1` mot hela sviten (`node --test tests/run.mjs`, 2725
tester), och originalet återställdes i `finally`. `git status` var ren efteråt. Skriptet är
`sabotage.py` och utfallet ligger i `sabotage-utfall.jsonl`.

| ID | Fil | Sabotage | Fällda | Beteende ändrat? |
|---|---|---|---|---|
| S1 | `branchindex.js` | `kraverBekraftadNiva: false` för mobil, skälet kvar | 5 (LU-16, MS-01, MS-02, MS-06, MS-07) | ja |
| S2 | `Portfolio/index.js` | spärren i ankarvalet flyttad efter tilldelningen | **0** | **ja, renderat: Marknadsankaret tillbaka för mobil** → C1-5 |
| S4 | `lagesregister.js` | `roomCounts` räknar en obekräftad rad som prissatt | 2 (MS-07, RR-01) | ja |
| S5 | `prisunderlag.js` | nivågrenen i `medianEtikett` borttagen | **0** | bara i rum med fler än 8 kategorier → C1-8 |
| S6 | `rumstext.js` | `oviss_niva` säger «Billigaste jämförbara licens» igen | 1 (MS-04) | ja |
| S9 | `prisunderlag.js` | `underGolv` räknas även vid obekräftad nivå | 2 (MS-01, SK-11) | ja |
| S11 | `invoice-history.mjs` | rummets ankare tappar spärren för mobil | 3 (MS-01, MS-06, MS-07) | ja |
| S12 | `lagesregister.js` | motsabotage i lagningsriktningen för C1-1: `radScore` null för `ovissNiva` | **0** | ja (66 → null på bytesraden) → C1-6 |

## Instrument

Instrumenten ligger i `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-c1/`:

**Sonder**
- `sond-rum.mjs` och `jamfor.py` (resultat i `sond-rum-main.json` och `sond-rum-commit.json`).
- `sond-faktura.mjs` (resultat i `sond-faktura-main.json` och `sond-faktura-commit.json`).
- `sond-blandat.mjs`.

**Rendering**
- Skript: `screenshot-granskning.mjs`, en kopia av `scripts/screenshot-mobilscore.mjs` med fler rum.
- Bilder i `bilder/` (commiten), `bilder-main/` (main) och `bilder-s2/` (S2-sabotaget). Alla rum finns i
  390 och 1600 px.

**Sabotage:** `sabotage.py` och `s2-render.py`.
