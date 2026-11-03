commits: ceb28c05
dom: BLOCKERAR

# Sjätte blicken på T-2: fjärde lagningen (ceb28c05)

Granskningen gäller grenens slutläge, ceb28c05, mot `origin/main` 793810d3. Granskaren har inte byggt
koden. Uppdraget var att hitta var det gröna är osant.

## Domen

**BLOCKERAR.** P-1 är ett [KUND]-fynd i den mening ceb28c05 själv skrev för att stänga N-1. Det räcker ensamt.

- 5 fynd: 1 [KUND] (P-1) och 4 [VAKT] (P-2 till P-5).
- P-1 är infört i ceb28c05. Det har N-1:s form: meningen är sann för den faktura den skrevs för
  (E5 + Copilot hos «Microsoft») och falsk för en annan klass som samma prövning stoppar (Adobe, Google).
- P-2 och P-3 är införda i LT-11. P-4 är text. P-5 gäller SS-01:s ordlista.
- Tvekan fanns om P-1 var [KUND] eller ett stilfel, eftersom meningen säger «kan bero på». Jag valde
  [KUND]: för en Adobe-faktura är skälet inte osäkert utan omöjligt. Skälen står vid fyndet.

**Det som håller.** `prisprov` når svaret och vyn. Microsoft-fallen från N-1 får nu sanna meningar.
Radprövningens mening och reservmeningen är sanna. Cachen och CV-19 håller. LT-06:s tal stämmer.
Rummet och svarsmejlet säger inget som motsäger vyn. Sonden går grön i 390 och 1600 px.

**Lagningen är liten.** Nämn Copilot och Teams Phone bara när leverantörsnyckeln är `microsoft`, eller
skriv «tillägg på samma faktura» utan produktnamn. Lägg ett Adobe-svar i sonden och i LT-11.

## Fynd

### P-1 · [KUND] · infört i ceb28c05: per plats-meningen säger «tillägg som Copilot eller Teams Phone» på Adobe- och Google-fakturor

- **Fil:** `src/pages/TestaFaktura/index.js` rad 1622–1626. Meningen visas för varje svar med `prisprov === 'per_plats'`.
- **Påstående:** prövning 1 (mains tak per plats) körs för tre leverantörer: Microsoft, Google och Adobe
  (`SUPPLIER_KEY_MAP`). Per plats-meningen namnger ändå bara Microsofts tillägg. En Adobe-kund läser
  att kostnaden «kan bero på tillägg som Copilot eller Teams Phone». Det kan den inte: ingen av
  produkterna finns på en Adobe-faktura. Det verkliga skälet för en korrekt Adobe-faktura, att mains
  tak 908,70 ligger under Adobes teampris 985, nämns inte. Meningen är ny i ceb28c05. I cda5e7b6 stod
  «Ett licenspris vi läste på fakturan …», som är sant för en Adobe-faktura med en produkt.
- **Bevis:**
  - Kedjan (`l6/perplats.mjs`: råform → `aggregateLineItems` → `validateSeatPrice`, båda på ceb28c05):
    «Adobe» och «Adobe Inc» med Creative Cloud Pro 3 × 985 ger pps 985, anomaly true, prov `per_plats`.
  - 985 är bokens verifierade teampris (`BRANCHINDEX['saas-creative'].adobeVerified.teamExVatMonthly['all-apps']`,
    lastVerified 2026-10-26). Fakturan är alltså korrekt till listpris. LT-02 (`tests/listpristak.mjs` rad 78) kräver själv att
    den går till granskning («Adobe Creative Cloud Pro, förexisterande»), och modulhuvudet säger samma sak.
  - Renderat (`l6/sond.mjs`, kopia av `scripts/screenshot-prisavvikelse.mjs` med tre tillagda svar,
    1600 px, mot `npm run build` på ceb28c05): «Adobe · Vi stoppade prissättningen. Kostnaden per licens
    och månad, räknad som fakturans löpande belopp delat med antalet licenser, är högre än vi kan
    bekräfta automatiskt. Det kan bero på tillägg som Copilot eller Teams Phone, eller på ett tal vi
    läst fel, till exempel en kvartals- eller årssumma som ett månadspris. Därför visar vi inga
    besparingssiffror för den här fakturan.» Samma mening för «Google Workspace» med pps 690.
  - Sondens egna kontroller gick gröna (rc 0). Sonden prövar per plats bara med «Microsoft».
- **Motprov:**
  - «Adobe Systems Software Ireland Ltd» med samma rad ger anomaly false, prov null (`l6/perplats.mjs`).
    Instrumentet skiljer namnen åt.
  - E5 641,18 + Copilot 286,80 hos «Microsoft» (pps 928, prov `per_plats`): meningen stämmer. Där var N-1.
- **Nåbarhet:** samma premiss som N-1. Prövning 1 kräver mains exakta namn, och den deterministiska
  kategoriseringen behåller rånamnet (`normalizedSupplier: invoice.supplier`). Klassen nås när
  extraktionen läser «Adobe»/«Adobe Inc» eller när kategoriseringens modell normaliserar namnet dit.
  Hur ofta är inte mätt. För Google är en korrekt faktura över 468 kr per plats inte mätt; 690 är ett
  konstruerat tal som bara visar renderingen. Utan mätning räknas felet som synligt (avgränsningen 22 okt).
- **Main:** Adobe-fallet får den generiska texten «Vår algoritm är inte tillräckligt säker på
  klassificeringen», som också är falsk. PR:en byter alltså ett falskt skäl mot ett annat, precis som
  i N-1. Mot cda5e7b6 gör ceb28c05 Adobe-fallet sämre.
- **Varför [KUND]:** texten når kunden och anger ett skäl som är omöjligt för fakturan. «Kan bero på»
  gör inte ett omöjligt skäl möjligt. Bibeln 15 aug: «En tystnad med rätt motivering är premium; en
  tystnad med påhittad motivering är en pose.»
- **Varför det håller PR:en:** meningen är ny i ceb28c05 och skrevs för att ge `price_anomaly` ett sant skäl.

### P-2 · [VAKT] · infört: LT-11 binder inte texten till sitt villkor

- **Sabotage S1:** villkoren `=== 'per_plats'` och `=== 'rad'` byter plats i vyn. Per plats får då
  «Priset på en licensrad är högre …», alltså N-1:s form. Sviten: 2716 pass, 0 fail, 0 cancelled.
- LT-11 kräver att varje villkor och varje text finns i grenen, aldrig att texten står under rätt
  villkor. Sonden fångar det, eftersom den läser den renderade sidan per svar. Grinden kör inte sonden.
- **Förslag:** pröva att villkoret följs av sin text inom samma ternära gren, eller rendera grenen i sviten.

### P-3 · [VAKT] · infört: LT-11 prövar källtexten, inte svaret

- **S2:** `prisprov: _priceCheck.prov,` bortkommenterad i svaret: 0 fail, 0 cancelled. Regexen träffar
  den kommenterade raden.
- **S3:** `svara()` stryker `prisprov` innan svaret skickas och cachas: 0 fail, 0 cancelled.
- **S4:** `{false && result.prisprov === 'per_plats'` gör per plats-grenen död: 0 fail, 0 cancelled.
- **Beteendet** i alla tre: per plats får reservmeningen «Kostnaden per licens på fakturan är högre än
  vi kan bekräfta automatiskt, så vi kan ha läst ett tal fel …». Den är sann för båda prövningarna.
  Ingen kundmening blir fel, därför [VAKT].
- Commit-texten räknar «svaret utan prisprov» bland sabotagen som fällde. Det gäller en borttagen rad,
  inte en kommenterad rad eller en strykning i `svara()`.

### P-4 · [VAKT] · text: prisaxeln och «äldre cache»

- Modulhuvudet och regel 13 skriver att rutnätets korrekta priser är «årspris, månadspris och 1,15 ×
  årspris». Det gäller Microsoft-delen (`MSPROD`, `bas of [1, 2, 1.15]`). Adobe-delen har 1,00 och
  1,10 × teampris (`ADOBE` rad 166, `paslag of [1, 1.10]`). Talet 0 står ändå utan den axeln.
- Vyns kommentar, sonden och commit-texten säger att ett svar utan `prisprov` kommer ur «äldre cache».
  Cachenyckeln bär `v32` och `deploySha` (`api/test-invoice.mjs` rad 520 och 530), och `v32` infördes i
  samma commit som fältet. Ett cachat svar utan fältet kan alltså inte serveras. Reservgrenen är död i
  produktion (avläst, handlern inte körd). Den är ofarlig, och dess mening är sann.

### P-5 · [VAKT] · SS-01 fäller bara den nakna formen

- **S6:** `INSERT INTO public.supplier_prices …` som eget steg i `api/admin/run-migration.mjs`:
  0 fail, 0 cancelled. Migreringen skriver då ett pris (per konstruktion).
- **Motprov SS1** (förra domens sabotage ordagrant, utan schemanamn): SS-01 föll, 1 fail.
- SS-01 är en ordlista. Commit-textens «SS-01 fäller ett rått prisseed i migreringen» gäller en stavning.
  Ingen skrivare till `supplier_prices` finns i dag (femte domen). Loggas för en egen PR.

## Förra domens fynd

| ID | Status | Bevis |
|---|---|---|
| N-1 | **Stängt för Microsoft, öppet i ny form.** E5 + Copilot får per plats-meningen, som stämmer. Radprövningen får sin egen sanna mening. Adobe och Google får Microsofts tillägg (P-1). | `l6/perplats.mjs`, renderat i `l6/sond.mjs` |
| N-2 | **Stängt i den riktning det gällde, svagare än det låter.** F1 (`'price_anomaly_x'`) fäller LT-11. Byte av texter och ett svar utan fältet fäller inget (P-2, P-3). | F1: 1 fail; S1–S4: 0 |
| N-3 | **Stängt.** Prisaxeln och kostnaden står i modulhuvudet, arbetsordern och regel 13. Axeln är Microsofts (P-4). | `git show ceb28c05`, `tests/listpristak.mjs` rad 160–166 |
| N-4 | **Delvis stängt.** Den nakna formen fäller SS-01. Ett schemanamn gör det inte (P-5). | SS1: 1 fail; S6: 0 |
| N-5 | **Stängt.** Regel 13 bär 407 568 fall, 369 384 skilda och 96 mot ea56bf42, och talen stämmer. «576» står inte längre i prosan. Kategoriraden i regel 13 är oförändrad; beteendet bakom den är inte omkört här (femte domens `fuzz.mjs`). | `l6/lt06.mjs`, `l6/lt06-unika.mjs`, `grep` |

## Friat

- **`prisprov` når vyn.** En producent (`api/test-invoice.mjs` rad 1246). `svara()` sprider `rest` till
  både svaret och cacheobjektet `_svar`; `fakturaLage` rör inte fältet. Vyn läser `result` direkt ur
  svaret (`setResult(data)`, rad 697). Bara vyn läser `prisprov` (`grep -rn prisprov api lib src agents scripts`).
  Avläst; handlern inte körd.
- **Värdena.** Vid anomali returnerar `validateSeatPrice` `prov: 'per_plats'` eller `'rad'`, aldrig
  `'per_plats+rad'` (koden returnerar vid första träffen). `l6/perplats.mjs`: E5 + Copilot och E5 månad
  ensam ger `per_plats`. LT-11 kör `provaRader('Crayon AS', E3 × 12)` → `rad`.
- **Meningarna, fall för fall.**
  - E5 + Copilot hos «Microsoft» (pps 928): per plats-meningen stämmer.
  - E5 769,42 ensam (pps 769,4): «högre än vi kan bekräfta» stämmer. Varken tillägg eller läsfel är
    det verkliga skälet (mains tak under E5:s månadspris), men båda är möjliga för en Microsoft-faktura
    sett härifrån. Samma måttstock som femte domen lade på «vi kan ha läst ett tal fel».
  - Radprövningen: «Priset på en licensrad är högre …» stämmer; prövningen läser bara Microsofts nivårader.
  - Utan `prisprov`: reservmeningen är sann för båda.
  - «Antalet licenser»: `seatCount` är «Antal UNIKA ANVÄNDARE», och tillägg räknas inte
    (`agents/test-invoice/extract.js` rad 253–257). Meningen skiljer licenser från tillägg och är
    därmed sammanhängande. En läsare som räknar Copilot som licens får en annan nämnare; jag räknar
    det inte som fel.
- **Rummet och mejlet (regel 5).** `watchedCard` med `price_anomaly` för Adobe och Microsoft: «Mottagen —
  men vi stoppade prissättningen … Skälet är tekniskt …» (körd med `node -e`). Motprov:
  `categorization_conflict` ger ett annat kort. Svarsmejlet: «Vi prissätter inte den här fakturan
  automatiskt» (`api/inbound-email.mjs` rad 773–775). Rummet säger mindre än vyn, inte motsatsen.
- **Cachen.** S5 (`v31`) fäller CV-19. Det finns en cachenyckel (CV-02) och ingen annan läsare av
  versionen (`grep pdf:result`). Höjningen är överflödig i Vercel, där `deploySha` redan byter nyckel
  per deploy, men behövs när `deploySha` är `lokal`. CV-19:s tidiga `return` gäller bara om
  `radensPrisPerManad` försvinner; då faller LT, som importerar den.
- **`_harFynd` i grenen** är borttagen. Den var död: `tillitTillRader: false` ger `visa: false`, och
  svaret saknar `recommendation` (avläst).
- **Talen i texten.** LT-06 omkört mot ceb28c05: `l6/lt06.mjs head test` och `head main` ger
  `{"fall":407568,"main":170144,"ny":222372,"forsamrat":0,"battre":52228}` och 0 skillnader bland 576
  fall utanför saas-productivity. `lt06-unika.mjs head`: 369 384 skilda. `lt06.mjs ea56 test`:
  96 försämringar. «1,07 × månadspris»: `l6/textlager.mjs` ger 13 nivårader i 9 PDF:er, högst Atea
  Business Premium 270 / 252,35.
- **Renderingssonden** gick grön i 390 och 1600 px för per plats, radprövning, utan `prisprov` och
  motprovet `categorization_conflict` (rc 0).
- **Commit-textens «8 tester föll»** är inte rekonstruerad. Jag körde två av dess riktningar (F1,
  cachen till v31) och båda föll.

## Sabotage

Kördes med `l6/sab.py`: `assert old in s`, exakt en förekomst, kontroll att filen ändrades, hela sviten
per sabotage, återställning ur sparad sträng med kontroll i `finally`. `git status --porcelain` tomt
efter båda körningarna (S1–S6 och F1 i en, SS1 i en).

| ID | Riktning | Fällda (fail + cancelled) | Tester |
|---|---|---|---|
| S1 | villkoren per plats och rad byter plats i vyn | **0 + 0** | P-2 |
| S2 | `prisprov` bortkommenterad i svaret | **0 + 0** | P-3 |
| S3 | `svara()` stryker `prisprov` | **0 + 0** | P-3 |
| S4 | per plats-grenen död (`false &&`) | **0 + 0** | P-3 |
| S5 | cachen tillbaka till v31 | 1 + 0 | CV-19 |
| F1 | grenen för `price_anomaly` nås inte | 1 + 0 | LT-11 |
| S6 | rått prisseed med schemanamn | **0 + 0** | P-5 |
| SS1 | rått prisseed utan schemanamn (förra domens) | 1 + 0 | SS-01 |

Inget sabotage prövar P-1: ingen vakt i sviten känner leverantören i grenen. Beteendet är mätt i
renderingen.

## Proveniens

- **Uppställning:** `git fetch origin claude/fable-5-resume-i60dmd main`, `git checkout --detach ceb28c05`.
  `origin/main` = 793810d3ef036c671236c4d029a8c819ef70ea3b. `node_modules` symlänkad från huvudklonen.
- **Baslinje:** `node --test tests/run.mjs` → tests 2716, pass 2716, fail 0, cancelled 0 (`l6/baslinje.txt`).
- **Läst:** femte domen, `git show ceb28c05` med texten, `lib/supplier-price-intel.js`, svarsvägen i
  `api/test-invoice.mjs` (cache, `svara()`, utgången för `price_anomaly`), vyns granskningsgren,
  `pricePerSeatMonthly` och `seatCount` i `extract.js`, `watchedCard`, svarsmejlet, LT-06 och LT-11,
  CV-19, regel 13, avgränsningen 22 okt och arbetsordern T-2.
- **Körda skript** (i `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-t2/l6/`):
  `npm run build` (`build.txt`); `gor-sond.py` + `kor-sond.sh` (kopia av sonden med Playwright ur
  `/opt/node22/lib/node_modules/playwright` och tre tillagda svar, utfall i `sond.txt`); `perplats.mjs`;
  `watchedCard` med `node -e`; `kopiera.py` + `prep.mjs` (förra granskarens skript med nya sökvägar,
  modulkopior ur `git show` av ceb28c05, 793810d3 och ea56bf42); `lt06.mjs`, `lt06-unika.mjs`,
  `textlager.mjs`; `sab.py` (utfall i `sab-logg.txt`, `sab.jsonl`, `ut-*.txt`).
- **Inte kört:** handlern `api/test-invoice.mjs`, extraktionen och kategoriseringen med modellen,
  produktionen, förra domens `fuzz.mjs`. Hur ofta P-1:s klass förekommer i riktiga fakturor är inte mätt.
- **Städat:** `build/`, `results/screenshots/prisavvikelse`, symlänken `node_modules` och sondkopian
  `l6/sond.mjs` borttagna. `git status --porcelain --ignored` vid slutet: tomt. HEAD = ceb28c05.
