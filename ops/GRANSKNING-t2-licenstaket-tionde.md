commits: 67054606
dom: MERGAS

# Tionde blicken på T-2: åttonde lagningen (67054606)

Granskningen gäller grenens slutläge, 67054606, mot `origin/main` 59d19c69. Granskaren har inte byggt
koden. Uppdraget var att hitta var det gröna är osant. Skript och utfall ligger i
`/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-t2/l11/`.

## Domen

**MERGAS.** Inga [KUND].

- 6 fynd, alla [VAKT] (U-1 till U-6).
- U-1, U-4, U-5 och U-6 är införda av grenen, och U-4, U-5 och U-6 av 67054606. U-2 är infört tidigare i
  grenen (f795b342). U-3 är förexisterande och inte vanligare.
- S-1 och S-2 är stängda. Beskedet är en mening, och ingen sats i den blev falsk i något fall jag körde:
  Azure-support 1 050, en DaaS-rad 649, Google 690, E5 769,42, Adobe 985 och en återförsäljare. Stoppet
  för blandade fakturor med en paketrad är inte sämre än main i någon av de åtta fakturor med paketrad jag mätte.
- S-3 är stängt för sina former, men öppet i en tredje (U-1). S-4 är stängt för migreringsskripten, men
  öppet för ett annat skript som samma arbetsflöde kör (U-3, förexisterande). S-5 är stängt. S-6 försvann
  med fältet.

## Fynd

### U-1 · [VAKT] · infört i grenen: LT-11 ser inte en ny gren före granskningsgrenen

- **X1:** vyn får en gren före `result.route === 'review_queue'` som fångar `result.reason?.endsWith('_anomaly')`
  och visar «Fakturan behöver djupare analys» och «Fakturans löpande kostnad per användare ligger över
  listpris». Granskningsgrenens villkor, citatformerna, importen och grenens text är orörda. Sviten: 0 fail,
  0 cancelled (`l11/sab-logg.txt`). Beteendet: `'price_anomaly'.endsWith('_anomaly')` ger `true`, och grenen
  ligger först i ternärkedjan. Det är läst, inte renderat.
- **Motprov:** X7 (`includes('anomaly')` i granskningsgrenens villkor) och X8 (egen definition av meningen i
  vyn) fäller LT-11, 1 fail var.
- Samma form som S-3. LT-11 prövar texten i vyn, inte att kortet visas. Sonden borde fånga X1, eftersom den
  kräver «Vi stoppade prissättningen» (läst, inte kört med sabotaget). Grinden kör inte sonden.

### U-2 · [VAKT] · infört i grenen (f795b342): sondens BLIND-rad säger att LT-04 bevisar skälet

- **X6:** svaret för en prisavvikelse bär `reason: 'prisavvikelse'` i stället för `'price_anomaly'`. Vyns
  gren matchar då inte, och kunden får den generiska texten från L-2 tillbaka (läst i vyn, inte renderat).
  Sviten: 0 + 0.
- `scripts/screenshot-prisavvikelse.mjs` rad 13: «att servern skickar `reason: 'price_anomaly'` bevisar
  LT-04 och koden i api/test-invoice.mjs». LT-04 läser bara anropet `validateSeatPrice(prisprovningensIndata(…))`
  (`tests/listpristak.mjs` rad 89–103), aldrig skälet. Påståendet är falskt.
- Hör till F5-2/L-5 i arbetsordern («vägen från anomali till `review_queue` prövas inte genom handlern»),
  som är loggat. Raden i sonden säger att just den delen är prövad. `git log -S "bevisar LT-04"` ger f795b342.

### U-3 · [VAKT] · förexisterande, inte vanligare: SS-01 läser inte alla skript som prisarbetsflödet kör

- **X2:** `scripts/aggregate-invoice-benchmarks.mjs` får raden `INSERT INTO supplier_prices … 416.77`.
  `.github/workflows/setup-price-db.yml` kör skriptet (rad 35), direkt efter `migrate-price-db.mjs` (rad 30).
  Sviten: 0 + 0.
- SS-01 läser `api/admin/run-migration.mjs` och `scripts/migrate*.mjs`. Commitens «SS-01 läser varje
  migreringsskript» är sant ordagrant. Skriptet är inget migreringsskript.
- På main läste SS-01 bara `run-migration` (förra domens S-4). Ingen skrivare finns i dag: `grep -rln
  supplier_prices lib api scripts agents` ger inga skrivningar utanför städ- och sondskript.

### U-4 · [VAKT] · infört i 67054606: arbetsordern beskriver beskedet som det var före commiten

- `ops/ARBETSORDER-VAG1.md` rad 54: «Fakturavyn säger vid en prisavvikelse vilken prövning som slog till och
  kallar aldrig priset per plats ett licenspris (N-1, LT-11).» Efter 67054606 visar vyn samma mening för båda
  prövningarna, och LT-11 låser en enda mening. Satsen «säger vilken prövning som slog till» är falsk.
- Rad 86: «att `svara()` för vidare `prisprov`, prövas inte genom handlern». Fältet finns inte längre:
  `grep -rn prisprov api lib src agents tests` ger bara namnet `prisprovningensIndata`.
- Inget av det når kunden.

### U-5 · [VAKT] · infört i 67054606: regel 13 säger för mycket om meningen som inte nämner talet

- `CLAUDE.md` rad 516–517: «den mening som inte nämner talet kan inte bli det» (falsk). Motexempel ur samma
  PR: L-2. Den generiska texten «Vår algoritm är inte tillräckligt säker på klassificeringen» nämner inget tal
  och var falsk för `price_anomaly`. Vyns egen kommentar säger det (`src/pages/TestaFaktura/index.js` rad 1614).
- Samma stycke, rad 514: «Efter tre varv på samma PR byts förklaringen». Commit-texten säger «Efter fem varv», och
  stycket räknar själv fem former (N-1, P-1, Q-1, R-1, S-1/S-2).
- Bibeltext, inget kundsynligt.

### U-6 · [VAKT] · infört i 67054606: S-2-mätningen saknar instrument i repot

- Arbetsordern rad 68–70 citerar «sanitet 62 %» och «56 963 kr/år». Instrumentet ligger i sessionens
  scratchpad (`s2-matning/mat.mjs`), inte i repot. Det modellerar mains handler: stubbad AI, sanitetens
  tak 50 %, LFL och finansgrinden. Handlern körs inte.
- Omkört mot 67054606 (`l11/mat.mjs` → `l11/mat.txt`): Dustin «GRANSKNING (sanitet 62 %)», Atea «PRISSÄTTS,
  byte 56963 kr/år» med texten «för era 30 E3-licenser». Talen stämmer.
- Klassen står varken i LT-06:s rutnät eller i någon test. Bibeln: ett mätvärde utan sitt instrument är ett
  påstående.

## Förra domens fynd

| ID | Status | Bevis |
|---|---|---|
| S-1 | **Stängt.** Meningen har inget enhetsord. Azure 1 050 hos «Microsoft» ger «En av våra automatiska priskontroller slog till …», i 390 och 1600 px. Sondens kontroll `/per användare/` på hela sidan: ingen träff. | `l11/sond.txt` |
| S-2 | **Stängt för texten.** DaaS 649 hos Dustin ger samma mening, utan «licensrad». **Stoppet:** ingen faktura där main prissätter sant (se Friat). | `l11/sond.txt`, `l11/mat.txt` |
| S-3 | **Stängt för W1 och W5:s former, öppet i en tredje (U-1).** | X7, X8: 1 fail var; X1: 0 |
| S-4 | **Stängt för migreringsskripten, öppet för ett annat skript i samma flöde (U-3, förexisterande).** | X2: 0 |
| S-5 | **Stängt.** Kommentaren säger att meningen säger att en kontroll slog till, att priset inte behöver vara fel och vad kontrollen är till för. Meningen säger just det. | `src/lib/prisavvikelse.js` rad 3–11, läst |
| S-6 | **Borta med fältet.** Svaret bär inget fält som börjar på «pris» på toppnivån, och ingen yta läser `prisprov`. Arbetsordern listar det fortfarande (U-4). | grep, läst |

## Friat

- **Meningen, sats för sats.** `reason: 'price_anomaly'` sätts bara i `api/test-invoice.mjs` rad 1239 och
  1243, efter `validateSeatPrice(…).anomaly` (grep över api, lib, src, agents, scripts). «En av våra
  automatiska priskontroller slog till» är alltså sant. «Kontrollen finns för att fånga tal vi kan ha läst fel,
  till exempel en kvartalssumma» är sant för båda prövningarna: mains modul kallar taket «avläsningströskel»
  (`git show 59d19c69:lib/supplier-price-intel.js`), och båda fångar en kvartalssumma (LT-05 per rad, LT-02
  Adobe Single App 1 143 per plats). «Stoppar också vissa korrekta fakturor» är sant: E5 769,42 och Adobe 985
  (LT-02), DaaS-raden (S-2). «Därför visar vi inga besparingssiffror» är sant: utgången sätter
  `tillitTillRader: false`, så `svara()` skickar `forensicFindings: []` och `leadFinding: null`. Enda kr-talet
  på den renderade sidan är «1 995 kr/», Intelligence-priset (`l11/sond.txt`).
- **Stoppet för blandade fakturor (S-2).** `l11/mat.mjs`, byggarens instrument med sex nya fall. Main ger
  granskning eller tal där paketraden räknas som licens:
  - Dustin (Standard 10 × 115 + DaaS 8 × 649): granskning, sanitet 62 %.
  - Atea (E3 25 × 460 + arbetsplats 5 × 1 150): byte 56 963 kr/år.
  - U-A Atea (E3 100 × 380 + arbetsplats 2 × 1 200): «inget byte», men texten säger «396,08 kr … för era
    102 E3-licenser». Fakturan har 100.
  - U-B Dustin (Standard 20 × 125 + DaaS 1 × 649): byte 4 065 kr/år.
  - U-C Crayon (Premium 50 × 199 + Intune/support 3 × 520): byte 4 376 kr/år.
  - U-D Dustin (bara DaaS 8 × 649): granskning, sanitet 79 %.
  - U-E Atea (E5 50 × 600 + SOC 1 × 1 600): «inget byte», «619,61 kr … för era 51 E5-licenser». Fakturan har 50.
  - U-F Microsoft (E3 100 × 416,77 + arbetsplats 2 × 1 200): byte 18 798 kr/år.
  - Grenen stoppar alla åtta. Motprov: Dustin utan paketraden ger på grenen ingen anomali, och main prissätter
    med «115 kr … era 10 Business Standard-licenser».
  - Like-for-like slår ihop raderna per nivå (`agents/recommender/recommend.js` rad 746–778). Paketraden
    räknas därför alltid som licenser för samma nivå. Main kan inte ge en sann jämförelse i den klassen.
- **`prisprov` borttaget.** Ingen läsare: `grep -rn prisprov` över api, lib, src, agents, scripts, tests och
  `.github` ger bara `prisprovningensIndata` och sondens döda parameter i `granskning()`. Ett svar som ändå
  bär `prisprov: 'per_plats'` ger samma mening (sondtillägget `med-prisprov`).
- **Regel 5.** Rummet (`l11/rum.txt`, omkört mot 67054606): «Mottagen — men vi stoppade prissättningen. … Skälet
  är tekniskt …», för Adobe, Microsoft (även `serverhosting`), Google Workspace och Crayon. Motprovet
  `categorization_conflict` ger ett annat kort. Svarsmejlet: «Vi prissätter inte den här fakturan
  automatiskt. Skälet till att vi inte prissatte fakturan står i ert rum.» (`api/inbound-email.mjs` rad 775,
  läst). Grenen ändrar varken rummet eller mejlen (`git diff 59d19c69 HEAD --stat`). Ingen yta motsäger vyn.
- **Commitens påståenden.** «Renderat i 390 och 1600 px för en Microsoft-, en Adobe- och en
  återförsäljarfaktura, med motprov»: sonden rc 0. Tre av commitens sex sabotage omkörda (includes, egen mening,
  förbehållet bort): 1 fail var.
- **LT-06:s tal** (407 568, 170 144, 222 372, 0, 52 228) är exakta asserts och gröna i baslinjen. 67054606 rör
  inte rutnätet. «369 384 skilda» i regel 13 är inte assertat och inte omkört.

## Sabotage

Kördes med `l11/sab.py`: `assert old in s`, exakt en förekomst, kontroll att filen ändrades, beteendet
utskrivet för X1, X2, X6 och X9, hela sviten per sabotage, återställning ur sparad sträng med kontroll i
`finally`. Utfall i `l11/sab-logg.txt`, `l11/sab.jsonl` och `l11/ut-*.txt`.

| ID | Riktning | Fällda (fail + cancelled) | Fynd |
|---|---|---|---|
| X1 | ny gren före granskningsgrenen fångar `endsWith('_anomaly')` med falsk text | **0 + 0** | U-1 |
| X2 | `aggregate-invoice-benchmarks.mjs`, som prisflödet kör, skriver ett pris | **0 + 0** | U-3 |
| X6 | svarets skäl heter `prisavvikelse`, vyns gren matchar inte | **0 + 0** | U-2 |
| X7 | kortet döljs med `!result.reason?.includes('anomaly')` (commitens) | 1 + 0 | — |
| X8 | vyn definierar en egen `PRISAVVIKELSE_MENING` (commitens) | 1 + 0 | — |
| X9 | förbehållet bort ur meningen (commitens) | 1 + 0 | — |

Ingen test i sviten kör en blandad faktura med en paketrad, så S-2:s stopp prövas inte av något sabotage.

## Proveniens

- **Uppställning:** `git fetch origin claude/fable-5-resume-i60dmd main`, `git checkout --detach 67054606`.
  `origin/main` = 59d19c69578f651b297142c15da5aa39a826535f, merge-basen. `node_modules` symlänkad från
  huvudklonen.
- **Baslinje:** `node --test tests/run.mjs` → tests 2718, pass 2718, fail 0, cancelled 0 (`l11/baslinje.txt`,
  via `l11/svit.sh`).
- **Läst:** förra domen, `git show 67054606` med texten, grenens diff mot main för handlern, vyn och modulen,
  `lib/supplier-price-intel.js` (grenen och main), `lib/licensniva.js`, `computeLikeForLikeSaasTarget`,
  `verifySanity` och `deterministicCheck`, `svara()`, `watchedCard`, svarsmejlets gren, `api/send-analysis.mjs`,
  LT-01..11, SS-01..03, CV-19, regel 13 och arbetsordern T-2.
- **Körda skript** (i `l11/`): `svit.sh`; `mat.mjs` (byggarens `s2-matning/mat.mjs` med min worktree, mains modul
  ur 59d19c69 och sex nya fall, via `gor-mat.py`) → `mat.txt`; `rum.mjs` → `rum.txt`; `bygg.sh` (`npm run
  build`, rc 0, `build.txt`); `gor-sond.py` och sondkopian med Playwright ur
  `/opt/node22/lib/node_modules/playwright` och fyra tillägg → `sond.txt`, rc 0; `sab.py` via `kor-sab.sh`.
- **Inte kört:** handlern `api/test-invoice.mjs`, extraktionen och kategoriseringen med modellen, produktionen.
  Mains beslut i S-2 är byggarens modell av handlern, inte handlern. Hur ofta blandade fakturor med en paketrad
  kategoriseras som `saas-productivity` är inte mätt. CV-19 är inte omkört med sabotage (bara kommentaren
  ändrades).
- **Observerat, inte prövat:** `api/send-analysis.mjs` svarar 400 («Analysdata saknas») på ett resultat utan
  `recommendation`, alltså på varje granskningssvar. `htmlEmail` kastar på ett sådant resultat (`l11/mejl.txt`,
  rc 1). Grenen ändrar inte filen. Vad kunden ser när hen begär mejlet för ett granskningssvar vet jag inte än.
  Q-7 (rubriken «Ni betalar för mycket») står kvar ovanför kortet (`l11/sond.txt`), loggat.
- **Städat:** `build/`, `results/` (bara `screenshots/prisavvikelse`), sondkopian `l11/sond.mjs` och
  symlänken `node_modules` borttagna. `git status --porcelain --ignored` vid slutet: tomt. HEAD = 67054606.
