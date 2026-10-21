commits: ea0aa112 14bddd72 e68146c0 4df90437
dom: MERGAS

# Andra blicken: fabrikssvepet (PR #84)

PR #84 är `claude/fable-5-resume-i60dmd` mot `main`. Toppen är 33dc8535, och PR:en har 14 commits (avläst med REST-API:t 20 okt). Fyra linser granskade den, en i taget. Var och en arbetade i en egen worktree utcheckad på 33dc8535, och `git status` var rent efter varje lins. Ingen lins använde Vercel-verktyg, pushade, committade eller startade ett arbetsflöde.

Filen är skriven av en agent som varken byggt eller granskat. Den återger granskarnas fynd och utfall och har inte kört om dem. Det skrivaren själv mätte står under «Täckning».

## Domen

**MERGAS.** Regeln är att ett bekräftat [KUND]-fynd som PR:en inför blockerar. Något sådant finns inte.
- 26 fynd över fyra linser: 1 [KUND] och 25 [VAKT].
- Det enda [KUND]-fyndet (LA-K1) är bekräftat. Raderna fanns dock på main före PR:en, så det blockerar inte. Det står först nedan, eftersom det är grundarens att prioritera.
- 23 [VAKT] är bekräftade. 13 av dem infördes av PR:en och 10 fanns före den. Alla lagas framåt enligt stoppregeln (9 sep).
- 2 [VAKT] är obekräftade (84c-EL-06, KF84-9).

**Närmast gränsen är LA-V3.** Grindbytet i 14bddd72 släpper in anrop utan header till `run-price-alerts` och `warm-ct` där NODE_ENV inte är `'production'`. Mekanismen är bekräftad och infördes av PR:en. Granskaren klassade fyndet som [VAKT], eftersom ingen mätning visar att en sådan miljö är driftsatt. Skrivaren har prövat klassningen mot frågan *«ändras ett tal eller en mening som en kund läser?»*. Granskarens material ger nej i alla mätta miljöer, så klassningen står. Det obekräftade ledet är NODE_ENV i Vercels förhandsmiljö. Vill grundaren tillämpa «vid tvekan: [KUND]» på en omätt miljö är det LA-V3 som avgör, och det mäts med en enda förhandsdeploy.

## Förexisterande [KUND]: grundarens att prioritera

### LA-K1: en prishöjning visas som «Potentiell besparing» på briefingsidan
- **Fil:** `scripts/notify-price-changes.mjs` (rad 204 vid 833692ea) och `api/cron/run-price-alerts.mjs:182`.
- **Commit:** felet har funnits på main sedan 40fbe478 (15 aug) och är här avläst vid 833692ea. 14bddd72 ändrade filerna men inte raderna.
- **Påstående:** ett verifierat larm om en prisHÖJNING skriver `Math.abs(impactKrYear)` till `briefing_reports.total_saving_potential`. Knappen «Se analysen» i larmmejlet öppnar briefingsidan, och där visas talet under den hårdkodade etiketten «Potentiell besparing» (`src/pages/Briefing/index.js`, rad 251 vid 33dc8535). En kostnad kallas alltså besparing, vilket bryter mot regel 3.
- **Bevis:** `briefingsumma.mjs` körde en price_alert-insikt («Microsoft höjde priset +5% — 2400 kr/år extra», 2 400 kr) genom `api/briefing.mjs` (`granskadeInsikter`) och `src/lib/briefinglage.js`. Utfall: «insikter kvar 1, undanhållna 0, läge fynd, visaSparbelopp true → omslaget: «Potentiell besparing 2400 kr/år»».
- **Motprov:** samma kedja med en tom rad gav «läge lugn, visaSparbelopp false → «Månadens dom · Allt håller»».
- **Latent i dag (avläst):** körning 38824254504 (jobb 116727865775) gav «[larmunderlag] 0 verifierade · 14 obekräftade · 0 avvisade». Felet kräver dessutom en premiumkund som grundaren beviljat.
- **Förslag:** en höjning är ingen besparing. Skriv 0, eller ett eget fält för kostnadspåverkan, i båda skrivvägarna. Låt briefingsidan skilja larmrader (period `alert-…`) från månadsbriefen. Lås det med ett test som kör notify-insikten genom `granskadeInsikter` och `briefingLage`.

## Linsen larmen (14bddd72)

PR:en inför inga [KUND]-fynd i den här linsen. LA-K1 står ovan.

### [VAKT] LA-V1: fejkdatabasen i LU-19..21 läser inte `is_current` eller sorteringen. Infört av 14bddd72
- **Fil:** `tests/larmunderlag.mjs`.
- **Påstående:** fejkdatabasen sägs «tolka WHERE-satsen» och svara «billigast först». I själva verket läser den bara leverantör, kategori och nivå. Två verkliga sabotage mot golvfrågan fäller noll tester.
- **Bevis:** S2 tog bort `AND is_current = true` ur båda frågorna (`assert count==2`) och gav «# fail 0 / # pass 21». S3 satte `ORDER BY price_monthly DESC` i nivåfrågan och gav också «# fail 0 / # pass 21». `lib/price-db.js:79` behåller gamla priser med `is_current = false`, så i Postgres hade S2 gjort ett historiskt pris till golv.
- **Motprov:** S1 (nivåfiltret bort) fällde LU-19 och LU-20. S9 (oviss-grenen av) fällde LU-21. S8 (`kraverNiva=true`) fällde LU-16 och LU-20.
- **Förslag:** låt fejken kräva `is_current = true` i SQL-texten, och seeda en äldre, billigare rad med `is_current=false` på samma nivå. Läs ASC/DESC ur satsen i stället för att alltid sortera stigande. Alternativt: stryk «tolkar WHERE-satsen».

### [VAKT] LA-V3: `cronAnropTillatet` släpper in anrop utan header utanför produktion. Infört av 14bddd72
- **Fil:** `api/cron/run-price-alerts.mjs` och `api/cron/warm-ct.mjs`, med grinden i `lib/cronvakt.js`.
- **Påstående:** med `CRON_SECRET` satt och utan header svarar PR:ens endpoint 200 när NODE_ENV inte är `'production'`. Main nekade i samma läge. Commiten nämner inte bytet.
- **Bevis:** `nodeenv.mjs` kördes mot PR-toppen med `CRON_SECRET=s3` och utan header: «production → 401», «development → 200», «undefined → 200». Mot main:s fil gav samma sond 401 i alla tre lägena. Direktanrop med `'Production'` (versal) och `'preview'` gav true. `vercel.json` (ignoreCommand) bygger förhandsversioner för alla grenar utom `claude/*` och `gh-pages`, och fem sådana grenar finns på origin. Repot saknar mätning av NODE_ENV i förhandsmiljön (grep i `ops/`: 0 träffar).
- **Motprov:** i produktion stänger grinden. probe-cronvakt fick 401 utan header på `send-reminders` genom samma funktion. Det är avläst i bibeln 24 sep och inte omkört här. Grinden släpper inte heller «Bearer undefined» eller en tom hemlighet: direktanrop gav false.
- **Obekräftat:** att någon driftsatt miljö har NODE_ENV ≠ `'production'`. Granskarens bedömning är att Vercel normalt sätter production även i förhandsmiljön, med konfidens medel. Stämmer det är exponeringen noll.
- **Förslag:** pröva NODE_ENV i en förhandsdeploy en gång och skriv utfallet i `ops/`. Alternativt: låt grinden kräva hemligheten när den är satt, oavsett NODE_ENV.

### [VAKT] LA-V2: mobilgolvet mäter produktvalet, och LU-20 bekräftar det med en rad som inte finns. Logiken fanns före PR:en, motprovet kom med 14bddd72
- **Fil:** `lib/price-alert.js`. Motprovet ligger i `tests/larmunderlag.mjs` (LU-20).
- **Påstående:** koden säger att mobil har «1,1× spann» och att kategorigolvet därför bär. Det stämmer inte mot de `supplier_prices`-rader som golvet faktiskt läser.
- **Bevis:** `mobilgolv.mjs` kördes med seed-filens riktiga mobilrader:
  - «Tele2 Företag Obegränsad Max à 299 (exakt listpris) → overListPrice true, +25 % mot Tele2 Företag 60 GB (239)»
  - «Obegränsad à 279 → +17 %»
  - «Telia Företag Frihet Max à 449 → +29 % mot Frihet (349)»

  LU-20:s rad `'Tele2 Jobbmobil'` 299 (tier null) finns inte i `scripts/seed-price-db.mjs`.
- **Motprov:** «60 GB à 239 → null» och «Microsoft 365 E3 à 462 → null». Instrumentet skiljer alltså listpris från överpris.
- **Varför [VAKT]:** `priceAlert` och `percentOver` läses bara i svaret från `api/test-invoice.mjs:2368` och i `lib/`. I `src/` finns 0 träffar. Felet blir [KUND] samma dag som en yta läser fältet.
- **Förslag:** mät spannet på `supplier_prices` och inte på BRANCHINDEX. Låt mobil kräva bekräftad nivå, eller skriv i modulen att mobilgolvet mäter produktvalet. Byt LU-20:s motprov mot seed-filens rader.

### [VAKT] LA-V4: YI-10 räknar en kvarlämnad import som en grind. Förexisterande
- **Fil:** `tests/ytinventering.mjs` (YI-10).
- **Påstående:** YI-10 godkänner en grind så snart namnet står i koden utanför kommentarer. Registrets nya påstående «run-price-alerts: grind cronAnropTillatet, fail-closed» skyddas därför bara av SL-08.
- **Bevis:** S4 ersatte `if (!cronAnropTillatet(req)) …` med den gamla fail-open-formen och lät importen stå kvar. Resultat: «# fail 1 / # pass 19». Bara SL-08 föll, och YI-10 förblev grön. `git diff 833692ea HEAD -- tests/ytinventering.mjs` var tom.
- **Motprov:** YI-10:s eget motprov håller (en grind i en kommentar ger false).
- **Förslag:** kräv att grindnamnet anropas, alltså `${grind}(`, på samma sätt som YI-08 gör för läsningar.

### Friat (larmen)
- **Inget legitimt anrop bryts.** `run-price-alerts` finns bara i functions-konfigurationen i `vercel.json`, utan cron och utan workflow. `warm-ct` är en Vercel-cron (`0 2 * * *`) som skickar Bearer. `price-monitor.yml:381` kör `notify-price-changes.mjs` direkt.
- **Grinden med NODE_ENV=production:**
  - osatt hemlighet och «Bearer undefined» → false
  - `CRON_SECRET=''` → false, `'  '` → false
  - rätt hemlighet → true, fel hemlighet → false
- **Larmvägarnas loggar har inga råa adresser.** S5 och S6 fällde EL-02 i `tests/loggadress.mjs`. S7 (adressen via ett annat variabelnamn) fällde 0, vilket är den blindfläck testet själv deklarerar. Utanför linsen och före PR:en loggar `api/waitlist.mjs:33` adressen i klartext, men bara när DB saknas.
- **LU-19..21 är beteendetester för nivån.** Det visar S1, S8 och S9. Bristerna gäller `is_current` och ordningen (LA-V1).
- **`probe-larmacceptans.yml`:**
  - Produktionsjobbet bär bara DATABASE_URL och har ingen utlösare utanför main. Motprovet, där en push-utlösare lades till, gav `["push"]`.
  - Barnprocessen i DEL L får bara PATH och HOME. DEL G gör bara SELECT.
  - Flödet har aldrig körts (404, eftersom det inte finns på default-grenen). Att DEL G är omätt står i commiten.
  - Lokalt gav `probe-larmacceptans --utan-databas` «✓ ACCEPTANS» med exit 0.
- **Commitens «14 larm, 0 verifierade, 0 kundmejl»** stämmer med körning 38824254504 (15 okt 23:33, avläst i loggen).
- **Golvet når ingen kundyta** (0 träffar i `src/`).

## Linsen prisboken (ea0aa112: el-banden och villkorsadressen)

Inga [KUND]-fynd.

### [VAKT] 84c-EL-01: bandhöjningen avväpnade kvottestet. Infört av ea0aa112
- **Fil:** `tests/el-intelligence.mjs`, rad 77–95.
- **Påstående:** testet «faktisk kWh ger minst 10× mer saving än estimerat kWh» kan inte längre falla. Med 20–499-golvet 1,4537 blir den estimerade besparingen 0 vid varje spotpris: 29 921 kWh × 1,4537 = 43 496 kr, vilket är mer än 38 000 kr. Kvoten blir därmed Infinity. Gränsfixturen fick vippa över golvet i stället för att flyttas, och det förbjuder bibeln sedan 18 aug.
- **Bevis:**
  - Oskadad kod gav «TryggEl faktisk 8140 estimerat 0 kvot Infinity».
  - S5 kapade besparingen vid 2 000 med de nya banden och gav «kvot Infinity». Kvottestet stod inte bland not ok.
  - Kommentaren på rad 159 säger fortfarande «golv 1,2587».
- **Motprov:**
  - S5b, samma kapning med de gamla banden (2025-S2), gav «faktisk 2000 estimerat 338 kvot 5.9» och «not ok: faktisk kWh ger minst 10× …».
  - S2, där bara 20–499-bandet återställdes, gav «kvot 35.9». Det är alltså det bandet som bär skiftet.
- **Förslag:** flytta indata. Välj TryggEl-estimatets pris eller kWh så att fallet ligger över 1,4537 kr/kWh, eller kräv `withEstimated.saving > 0` innan kvoten räknas. Gör Infinity till ett fel. Rätta rad 159 till 1,4537 (2026-S1).

### [VAKT] 84c-EL-02: inget test pinnar Eurostat-perioden. Förexisterande
- **Fil:** `tests/kallfabriken.mjs` (KF-02).
- **Påstående:** KF-02:s meddelande säger «prisboken bär 2026-S1, avläst 2026-10-16», men testet prövar bara de tre talen. Perioden jämförs med `eb.period`, alltså med sig själv (rad 84 och 93).
- **Bevis:** S4 bytte period från `'2026-S1'` till `'2025-S2'` och lät talen vara. Beteendet ändrades («golv12 2.2502 2025-S2»), men sviten gav 18 pass / 0 fail. Då hade el-prices-svaret och promptraden sagt «Eurostat 2025-S2» bredvid 2026-S1-tal.
- **Motprov:** `eurostatChecks` mot live-data 17 okt med `eb.period='2025-S2'` gav `["Eurostat-period","2025-S2","2026-S1",false]`. Veckovakten fäller alltså felet, men sviten gör det inte.
- **Förslag:** lägg till `assert.equal(eb.period, '2026-S1')` i KF-02.

### [VAKT] 84c-EL-03: Eurostat-golvet når inte kundens elanalys. Förexisterande
- **Fil:** `agents/recommender/branchindex.js`, rad 93–96.
- **Påstående:** kommentaren «Roll 1 (GOLV) … Förhindrar överskattad besparing för små förbrukare» beskriver ett skydd i kundvägen som inte finns. `api/test-invoice.mjs` returnerar i varje el-gren innan `recommend()` anropas, och `lib/el-recommendation.js` läser inte banden (grep: 0 träffar).
- **Bevis:** `m3-elvagen.test.mjs` körde den riktiga handlern med modell och KV mockade, i fem el-fall. Två utdrag:
  - «rörligt med kWh … grossSaving 6636/6636 … getElIntelligence-anrop 0/0 svar identiskt: true»
  - «stor förbrukare 50 MWh/mån (276471/276471)»

  Pass 2 / fail 0.
- **Motprov:** `recommend()` anropad direkt med samma faktura gav «getElIntelligence-anrop via recommend(): 1», och promptraden skiljer banden åt («2.2502 … 2026-S1» mot «2.1601 … 2025-S2»).
- **Förslag:** rätta kommentaren så att den säger var golvet verkar: `api/el-prices` och recommend-prompten, som el inte når. Om golvet ska nå `computeElRecommendation` är ett designval, eftersom den jämför energidelen mot `EL_BENCHMARK_KWH`, en annan storhet.

### [VAKT] 84c-EL-04: `api/el-prices` bär en prisdom men är klassad «ingen_prisdom». Förexisterande
- **Fil:** `lib/kundytor.js:140`.
- **Påstående:** endpointen klassas `'ingen_prisdom'` med skälet «publika spotpriser per zon; inget om kundens pris». Svaret innehåller ändå en besparing räknad på anroparens pris. Det är också den enda yta utåt där PR:ens nya tal syns.
- **Bevis:** `m4-el-prices.mjs` körde den riktiga handlern utan KV, med kwh=12000 och price=2,80:
  - nya band: «saving=6598 savingPct=20 … marketFloor {allInKwh 2.2502, period 2026-S1}»
  - gamla band: «saving=7679 savingPct=23»

  En grep efter «el-prices» i `src/`, `api/`, `lib/`, `scripts/`, `public/`, `vercel.json` och `.github` gav bara filen själv och `kundytor.js`. Endpointen har alltså ingen anropare. Produktion svarade 403 från sandlådan och prövades inte live.
- **Motprov:** price=1,00 gav saving 0 med båda banden.
- **Förslag:** klassa om endpointen så att löftes- och proveniensskanningarna når den, eller ta bort besparingsfälten ur det publika svaret. KV-cachen `el:v1` (1 h) bär de gamla talen upp till en timme efter deploy.

### [VAKT] 84c-EL-05: el-intelligence-sviten läser dagens spotpris. Förexisterande
- **Fil:** `tests/el-intelligence.mjs` (huvudkommentaren).
- **Påstående:** kommentaren lovar «Stub fetchSpotPrice to avoid network calls in tests», men det finns ingen stubbe. Med öppet nät, som i CI, läser sviten elprisetjustnu.se. Golvtesterna blir då röda av fel skäl de dagar SE3-snittet är högt.
- **Bevis:** `spotstub.mjs` ersatte fetch:
  - SPOT=1,55 gav «elprisetjustnu-anrop=12 · pass 7 · fail 3» (TryggEl >3000, micro PÅ marknaden, micro ÖVERbetalar).
  - SPOT=0,99 gav pass 9 / fail 1.
- **Motprov:** SPOT=0,30 gav pass 10 / fail 0. Utfallet styrs av spotpriset, inte av koden.
- **Förslag:** stubba fetch i testfilen, eller exportera en injicerbar spotkälla från `lib/el-intelligence.js`.

### Obekräftat (prisboken)
- **84c-EL-06** (`agents/recommender/branchindex.js:101`, ea0aa112). Två påståenden i kommentaren och commiten går inte att spåra till en körning: «avläst live 2026-10-16» och «Motprov mot serien samma dag: 2022-S2 låg på 274,26 / 193,44 / 164,40».
  - verify-sources kördes 12 okt (38245160978) och sedan 17 okt (39069444683). Ingen körning gjordes 16 okt.
  - Eurostat gav 403 från sandlådan.
  - 2022-S2-talen är dessutom en rimlighetskontroll och inget motprov.

  Förslag: citera «avläst live 2026-10-17, körning 39069444683, jobb 117503848096». Kör 2022-S2 i en Actions-sond, eller stryk meningen.

### Friat (prisboken)
- **Talen 225,02 / 145,37 / 127,03 öre/kWh (2026-S1) godkänns.**
  - Jobb 117503848096 (17 okt) läste dem med vaktens egen läsväg: `lib/eurostat-el.js` mot nrg_pc_205 med geo=SE, NAC, X_VAT, KWH och E7000, med toleransen 0,5 öre.
  - Loggen: «live-period 2026-S1 · lagrad 2026-S1», «✓ < 20 MWh/år: prisbok 225.02 öre · live 225.02 öre», 145.37/145.37 och 127.03/127.03.
  - Jobb 114797180372 (12 okt) var rött på periodskillnaden («live-period 2026-S1 · lagrad 2025-S2»). Instrumentet kan alltså svara rött.
- **Riktningen är den säkra.** Golvet steg i alla tre banden, och `saving = max(0, current − max(best, golv))` kan bara sjunka eller stå still. Mätt: 12 MWh à 2,80 kr gav 7 679 kr/år före och 6 598 kr/år efter.
- **Commitens sabotagepåstående stämmer** (elbandet tillbaka till 2,1601 fäller KF-02 och två el-intelligence-tester). S1 fällde exakt de tre, och beteendet ändrades (saving 7679).
- **`lib/contract-intel.js`, Telias nya villkorsadress.**
  - Jobb 117503848026 (17 okt) läste dokumentet med sha 17e28faf33ceac12…, samma som den förseglade på rad 99. Loggen sa «vår FINNS».
  - URL:en läses bara av villkorsvakten och verifieraren. Kundens svar bär `regelKalla`, aldrig URL:en (grep efter `.kalla` i `src/`: 0 träffar).
- **Note-texten (~2,25 / ~1,45 / ~1,27) når ingen kundyta.** Elkategorin har `source: 'estimated'`. Portfolio läser Eurostat ur `public_price_points`, som skrivs direkt från Eurostat.
- **S6** (golvet används även när marknadens bästa total ligger över det) var en no-op vid fallback-spot, eftersom alla tre nya golv ligger över fallback-best ≈ 1,232. Vid SPOT=0,80 fällde testet «saving = max(0,…)». Grenen prövas alltså bara med spot över ungefär 0,55.
- **Föregångarens utkast «computeElRecommendation saknar Eurostat-golv»** är sant i sak (0 träffar). Det bevisar ändå inget fel, eftersom storheten är en annan. Det står bara som designfråga i EL-03.
- **Omätt:** föregångarens påstående att PR:en flyttade micro-testernas spotgräns från ~1,41 till ~1,50 kr/kWh. Det är räknat, inte kört.
- **Förexisterande, utan fynd:** testet «med estimerat kWh <1000» kan inte falla. Det kunde det inte heller med de gamla banden.

## Linsen verifierarna (ea0aa112: fyra röda vakter läser källan igen)

Inga [KUND]-fynd. Baslinjen var `node --test tests/run.mjs` med 2672/2672 gröna. Varje sabotage nedan kördes mot hela sviten.

### [VAKT] KF84-1: inget test prövar att Google-vakten larmar DRIFT. Infört
- **Fil:** `lib/verifiers/google-workspace.mjs`.
- **Påstående:** jämförelsen mot boken (numCheck) är ny i PR:en. Basen läste med en närvarokontroll. Inget test låser att ett ändrat listpris i källan ger DRIFT.
- **Bevis:**
  - G8 (toleransen satt till 1000) gav «fail=0 av 2672». Sonden g-hojt-alla blev då grön med «bok 7 USD | live 8 USD».
  - G9 (boken jämförd med sig själv) gav «fail=0 av 2672».
- **Motprov:** ren HEAD ger g-hojt-starter «rott drift=1 … bok 7 USD | live 8 USD», g-hojt-alla drift=3 och g-sankt (7→6) drift=1. C1 fällde KF-03 och KF-04, så sviten ser parsern.
- **Förslag:** ett KF-test där `'$4.90$7**'` byts mot `'$5.60$8**'` och som kräver drift=1 med `'8 USD'`. Lägg till ett motsvarande fall för en sänkning. Pröva testet mot G8 och G9.

### [VAKT] KF84-2: Telias tre tilläggskontroller saknar drifttest. Infört
- **Fil:** `lib/verifiers/telia-vaxel.mjs`.
- **Påstående:** bara T1 har ett drifttest (KF-07). Om softphone, fast nummer eller funktionsnummer jämförs med boken själv blir en höjning grön, och inget test faller.
- **Bevis:**
  - T7, T8 och T9 jämförde softphone, fast nummer och funktionsnummer med sig själva. Var och en gav «fail=0 av 2672», och höjningarna 29→39, 39→49 och 99→109 blev gröna.
  - Live 17 okt (jobb 117503848053) läste «T1 89 · softphone 29 · fast nummer 39 · funktionsnummer 99» och stämplade «molnvaxel: 2026-08-31 → 2026-10-17». Ett falskt grönt hade alltså gett kategorin ett datum.
- **Motprov:** ren HEAD ger drift=1 för var och en av höjningarna. T10 (T1 mot sig själv) fäller KF-07.
- **Förslag:** utvidga KF-07 till alla fyra jämförelser.

### [VAKT] KF84-3: KF-08 matar `lastaProdukter` för hand. Infört
- **Fil:** `lib/verifiers/tele2-bredband.mjs`.
- **Påstående:** kopplingen i `run()` är oprövad. Tas räknaren bort faller inget test, och en omdöpt Max-familj märks då OLÄSBAR i stället för DRIFT. En omdöpt Max-familj är en verklig ändring.
- **Bevis:** B2 tog bort raden `lastaProdukter += res.products.length;` och gav «fail=0 av 2672». Under sabotaget gav `run()` via fetch-stubbe för b-run-omdopt «drift 0, olasbara 1, ankare max 1200 Mbit | live (saknas)».
- **Motprov:** ren HEAD ger b-run-omdopt «drift=1 … live (ej funnet)», b-run-drift drift=4 och b-run-api-nere olasbara=2.
- **Förslag:** ett KF-test som kör `default.run()` mot en stubbad fetch. Produkter utan Max-familj ska ge «(ej funnet)», och tomma svar ska ge «(saknas)».

### [VAKT] KF84-4: ett 404 plus borttagen länk blir OLÄSBAR i stället för DRIFT. Infört
- **Fil:** `lib/verifiers/villkorsbok.mjs`, med orsaken i `lib/villkorsvakt.js:107`.
- **Påstående:**
  - När det gamla dokumentet svarar 404 och villkorssidan inte längre länkar det, blir domen OLÄSBAR. Det är formen för en ny villkorsversion på ny adress.
  - KALLA_BORTA kan inte nås bakom OATKOMLIG: rad 107 returnerar före grenen på rad 125.
  - Kommentaren i `contract-intel.js` och `fangar` lovar ändå att sidan larmar i båda fallen.
  - En bokpost utan citat märks dessutom som ett källfel.
- **Bevis:** `villkor-fore-efter.mjs`:
  - «12okt: 404 + vår länk borta» gav drift=1 före och drift=0 olasbara=1 efter.
  - «bokpost utan citat» gav drift=1 före och olasbara=1 efter.

  12 okt-loggen (jobb 114797180336) visar exakt formen: «dokument oåtkomligt (HTTP 404) · villkorssida 28 PDF-länkar · vår SAKNAS».
- **Motprov:** «nåbart + vår länk borta» och v-andrad-hash ger drift=1 både före och efter.
- **Varför [VAKT]:** ingen kundväg läser klassen. En grep träffar bara `villkorsbok.mjs` och `villkorsvakt.js`.
- **Förslag:** låt villkorssidan avgöra även vid 404: saknas länken blir domen KALLA_BORTA, finns den kvar blir den OLÄSBAR. Ge en bokpost utan citat ett eget utfall. Lås båda i KF-01.

### [VAKT] KF84-5: «fyra jobb» var fem. Infört
- **Fil:** huvudet i `tests/kallfabriken.mjs` och commitmeddelandet.
- **Bevis:**
  - Körning 38245160978 (12 okt) visar failure för villkorsbok, google-workspace, eurostat-el, pipedrive (jobb 114797180553) och telia-vaxel.
  - Pipedrive-loggen: «status 403 — ingen renderad text» → «RÖTT [pipedrive]: källa oåtkomlig/parse-fel».
  - Körning 37302322647 (5 okt) hade också fem röda jobb.
- **Motprov:** samma listning visar 15 gröna verify-jobb 12 okt.
- **Förslag:** rätta talet till fem, och klassa pipedrive (403, OLÄSBAR) enligt svepets steg 2.

### [VAKT] KF84-6: Telias unikhetsgrind saknar test. Infört
- **Fil:** `lib/verifiers/telia-vaxel.mjs`.
- **Bevis:** T3 bytte grinden mot «första träffen» och gav «fail=0 av 2672». En prislista med två T1-rader (89 och 99) blev grön med 89.
- **Motprov:** ren HEAD ger «rott … live (saknas)». Googles motsvarande grind fälls av KF-04 (G2).
- **Förslag:** ett KF-05-fall med en dubblerad T1-rad med annat pris, som kräver null.

### [VAKT] KF84-7: ankaret «/ user per month» saknar test. Infört
- **Fil:** `lib/verifiers/google-workspace.mjs`.
- **Bevis:** G7 tog bort ankaret och gav «fail=0 av 2672». Sonden g-per-year läste då «Starter: 84». Det hade blivit DRIFT mot bokens 7 i stället för OLÄSBAR.
- **Motprov:** ren HEAD ger null för alla tre nivåerna. G10 (fönstret 80→800) fäller KF-03 och KF-04.
- **Förslag:** lägg «Starter $84 / user per year All prices $USD» i KF-04 och kräv null.

### [VAKT] KF84-8: max-regeln gör en visad sänkning grön, och `blind` säger det inte. Infört
- **Fil:** `lib/verifiers/google-workspace.mjs`.
- **Bevis:** på ren HEAD, med `'$4.90$7**'` utbytt mot `'$7$6**'`, blev utfallet «gron drift=0 olasbara=0». `blind` nämner bara ett kampanjpris utan listpriset bredvid. Om Google någonsin visar sänkningar i den formen är obekräftat.
- **Motprov:** `'$6**'` ensamt ger «rott drift=1 … live 6 USD».
- **Förslag:** skriv blindfläcken i `blind` och i KF-03. Alternativt: kräv rabattformen (det lägre talet ≈ 0,7–0,8 × det högre) och låt parsern annars svara null.

### [VAKT] KF84-10: stämpeln daterar `usdMonthly`, som vakten aldrig jämför. Förexisterande
- **Fil:** `lib/verifiers/google-workspace.mjs`.
- **Bevis:**
  - Jobb 117503848031 (17 okt): «stämplade 3 nivå(er) med 2026-10-17: google-starter, google-standard, google-plus».
  - `googleChecks` jämför bara `usdAnnual`.
  - `recommend.js:1759` läser `usdMonthly` som `msrpMonthly`, och rad 1790 räknar en besparing ur skillnaden.
- **Motprov:** månadsfixturen ger 8,4 / 16,8 / 26,4, vilket är lika med boken. Talet stämmer alltså i dag, men det bekräftas av en fixtur och inte av vakten.
- **Varför [VAKT]:** Google-SEK hålls tyst mot kund (google-sek-grind).
- **Förslag:** läs månadsläget i samma körning, eller stämpla inte nivåer vars `usdMonthly` inte prövats.

### [VAKT] KF84-11: T2 är fortfarande en närvarokontroll utan test. Förexisterande
- **Fil:** `lib/verifiers/telia-vaxel.mjs`.
- **Bevis:** T5 gjorde T2-kontrollen alltid sann och gav «fail=0 av 2672». På ren HEAD ger 118→128 «drift=0 olasbara=1 … live (saknas)», alltså OLÄSBAR och aldrig DRIFT.
- **Motprov:** T6 (momsnärvaron alltid sann) fäller KF-06.
- **Förslag:** ett KF-06-fall med «från: 128 kr» som kräver rött. Läs helst T2:s pris som ett tal.

### Obekräftat (verifierarna)
- **KF84-9** (`tests/fixtures/kallfabriken/google-arsavtal-2026-10-16.txt`, ea0aa112). Huvudet säger att fixturerna är «ordagranna utdrag … skrivna av ett skript ur källtexten, aldrig för hand».
  - Båda Google-fixturerna är två utdrag skarvade med en ensam rad «…».
  - Inget genererande skript finns i repot (git grep och `git log --all -S`).
  - Sonden g-tvetydig visar att text i det utelämnade partiet kan ändra utfallet.
  - Om utdragen är ordagranna går inte att avläsa härifrån, eftersom HTTP mot leverantörssajter är blockerad.
  - Live 17 okt läste parsern hela sidan rätt (jobb 117503848031).

  Förslag: checka in skriptet, eller kalla fixturerna «eliderade utdrag».

### Friat (verifierarna)
- **El-talen.** Samma jobb 117503848096 ger «prisbok X öre · live X öre» för varje band. E4 (boken jämförd med sig själv) fäller KF-02, så instrumentet jämför verkligen mot källan.
- **Commitens 6 598 och 7 679 kr/år.** 12 000 × (2,80 − 2,2502) = 6 597,6 och 12 000 × (2,80 − 2,1601) = 7 678,8.
- **Sabotageräkningen «sju riktningar → 12».** Sex riktningar kördes:

  | Riktning | Fällda tester |
  |---|---|
  | C1 | 2 |
  | C2 | 1 |
  | C3 | 1 |
  | C4 | 1 |
  | C5 | 3 |
  | C7 | 1 |
  | Summa | 9 |

  C6 (stämpelfrysningen) kördes inte, eftersom den ligger utanför linsen. Om C6 fällde de tre som commiten anger (SP-03/07/10) blir summan 12. KF-02 räknas två gånger, så det är 11 distinkta tester.
- **Commitens rg-påstående stämmer.** Bara `tele2-bredband:67` och `villkorsbok:72` skriver något annat än «(saknas)» för ett okänt värde.
- **På ren HEAD larmar vakterna för varje prövad drift:**
  - Google: höjning och sänkning.
  - Telia: T1 och de tre tilläggen.
  - Eurostat: ±1 och ±0,6 öre per band, och en ny period.
  - Villkor: ändrad hash, och borttagen länk på en nåbar sida.
  - Tele2: 279→319 (drift=4).
- **Grindarna som har test fäller sina sabotage:** G2–G6, G10, E2–E4, V2–V4, B3, T2, T4 och T6.
- **Källan lästes rätt live 17 okt:** Google 7 / 14 / 22 USD med årsläge på, Telia 89 / 29 / 39 / 99 kr exkl. moms.
- **Föregångarens uppgift att V2 «kraschade sviten» gick inte att återskapa.** V2 gav fail=1 (KF-01).
- 38 sabotage kördes, och `git status --porcelain` var tomt efter alla.

## Linsen lagningarna (e68146c0, 4df90437 och sammanfogningen 83b50011)

Linsen gjorde sin granskning och dog inte. Därför står e68146c0 och 4df90437 i commits-raden. Inga [KUND]-fynd.

### [VAKT] F1-HB08-skalet: HB-08 hårdkodar skalet. Infört av 4df90437
- **Fil:** `tests/hemlighetsbindning.mjs`.
- **Påstående:** HB-08 säger att läcksondens steg körs «som Actions gör». Testet hårdkodar ändå skalet och läser aldrig stegets `shell:`. Byts sondens `shell: bash` mot `shell: bash {0}` (utan -e) blir steget grönt trots en röd läckkontroll.
- **Bevis:**
  - Sabotaget fällde 0 tester i hemlighetsbindning (8/0), sondvakt (22/0), tystnadsfel (32/0), pushvagen (10/0) och stampelvakt (15/0).
  - Steget extraherades ur YAML och kördes med LACKKONTROLL=failure. `bash S` gav EXIT=0, eftersom det andra anropet (utan `--krav`) sväljer det första röda.
- **Motprov:** `bash --noprofile --norc -eo pipefail S` gav EXIT=1. `bash S` med LACKKONTROLL=success gav EXIT=0.
- **Förslag:** läs `shell:` ur YAML och översätt det som Actions gör. Alternativt: kräv exakt `shell: bash` i HB-08, eller lägg `set -e` i run-blocket.

### [VAKT] F4-avkodning-utan-tand: tre avkodningsrader i läsaren saknar test. Infört av 4df90437
- **Fil:** `scripts/hemlighetsbindning.mjs`.
- **Påstående:** tre rader i lagningen har inget test som fäller dem: arverAlla:s `avkodaYaml` («även citerat eller escapat»), `\U`-avkodningen och `\x`-avkodningen. Det motsäger commitens «Sabotage som fällde: 10 riktningar» för läsarens avkodning.
- **Bevis:**
  - Q-arv-avkod (`[text, avkodaYaml(text)]` → `[text]`): `secrets: "inherit"` gick från `[{"id":"i.yml#c","hemligheter":["(secrets: inherit)"]}]` till `[]`.
  - Q-U8 (`\U`-avkodningen borttagen): `"${{ s\U00000065crets.BOT_DEPLOY_KEY }}"` gick från `["BOT_DEPLOY_KEY"]` till `[]`.
  - Q-x2 (`\x`-avkodningen borttagen): samma utfall med `\x65`.

  I alla tre fallen gav hemlighetsbindning 8/0, stampelvakt 15/0 och pushvagen 10/0.
- **Motprov:** js-yaml avkodar formerna till `inherit` och `${{ secrets.X }}`, så de är verkliga läsningar. Ett enkelciterat `'inherit'` förblir bokstavligt.
- **Förslag:** lägg de tre formerna i HB-06, eller skriv raderna som otestade i modulen.

### [VAKT] F2-SP15-nedladdningen: SP-15 bygger nedladdningens katalog för hand. Förexisterande enligt granskaren
- **Fil:** `tests/stampelvakt.mjs` (SP-15) och flödet `.github/workflows/verify-sources.yml`. Det är e68146c0 som påstår att kedjan körs «som i Actions».
- **Påstående:** länkarna `VERIFY_STAMPEL_UT` ↔ upload path ↔ upload name ↔ download pattern ↔ räknestegets glob prövas inte. Tre sabotage som tyst stoppar stämpeln fäller 0 tester.
- **Bevis:** tre sabotage i verify-sources.yml fällde 0 tester i åtta testfiler:
  - S2a: `pattern: stampel-*` → `stampelbeslut-*`
  - S2b: upload-namnet ändrat
  - S3: `VERIFY_STAMPEL_UT` → `beslut-<id>.json`

  `verify.mjs --matrix` gav 18 källor, varav 2 stealth. Med S3 tappas alltså 16 av 18 beslut, eftersom upload har `if-no-files-found: ignore`.
- **Motprov:** SP-15 fäller räknestegets egen form (en lös fil ger exit 1). Testet kan bli rött; det ser bara inte namnlänkarna.
- **Obekräftat** (konfidens hög, inte mätt i Actions): att download-artifact v4 med ett pattern som inte matchar något avslutas grönt med 0 artefakter.
- **Förslag:** härled katalog- och filnamn ur arbetsflödet i SP-15. Jämför N i räknesteget med matrisens längd, så att en tappad artefakt blir röd i stället för ett tyst «2 beslut».

### [VAKT] F3-lasaren-enkelciterad: `''}}''` i en enkelciterad skalär döljer `toJSON(secrets)`. Förexisterande
- **Fil:** `scripts/hemlighetsbindning.mjs`.
- **Bevis:** för `K: '${{ format(''}}'', toJSON(secrets)) }}'` ger js-yaml «${{ format('}}', toJSON(secrets)) }}», men läsaren gav dynamisk=false och obundna=[]. Den gamla läsaren (4df90437~1) missade också. En grep i `.github/workflows` efter `''}}`, `toJSON(secrets` och `secrets[` gav 0 träffar, så det finns ingen läcka i dag.
- **Motprov:** ociterat, dubbelciterat och enkelciterat utan `}}` gav alla dynamisk=true.
- **Förslag:** avkoda enkelciterade skalärer (`''` → `'`) innan `uttryck()` körs. Lägg formen i HB-06, och skriv den i BLIND tills den är lagad.

### Friat (lagningarna)
- **Sammanfogningen 83b50011 tappade inget skydd från PR #83.**
  - `git merge-tree --write-tree ece409ac 833692ea` gav 66ed515e. Det trädet skiljer sig från 83b50011 bara i konfliktfilerna CLAUDE.md och `tests/stampelvakt.mjs`.
  - `tests/pushvagen.mjs` är oförändrad mot 833692ea, importeras av `run.mjs` och ger 10/10 (MP-01..06).
  - TF-11 står kvar som pensionerad (`tests/tystnadsfel.mjs:316`).
- **Konfliktlösningen i stampelvakt behöll de frysta datumen.** SP-03 och SP-10 kräver fortfarande M365-radens struktur via `PRISBOK.includes(rad)`, ur den levande filen.
- **e68146c0:** stampelvakt gav 15/15. SP-14:s nya fall täcker `Object.hasOwn` och `lstatSync`/`isFile`. Det är läst men inte sabotage-kört.
- **Läst men inte kört av granskaren, och därför inte friat:**
  - att `bash {0}` i verify-sources ändå blir rött längre fram (ett tomt avtryck får `tillampaStamplar` att kasta);
  - HB-08:s byten av variabelnamn, `|| echo` och continue-on-error;
  - att `secrets.*` fångas av ONAMNGIVEN.
- Linsen körde inte hela sviten.

## Täckning

Mätt av skrivaren 20 okt:
- **PR #84:s huvud:** `gh api repos/Arvo-flow/arvo-flow.github.io/pulls/84` gav head `claude/fable-5-resume-i60dmd`, sha 33dc8535, base `main`, 14 commits. Det är samma topp som linserna granskade.
- **Mekaniken.** `git diff-tree` per commit i 833692ea..33dc8535 visar att bara ea0aa112 och 14bddd72 ändrar filer i `lib/`, `api/` eller `agents/`, plus sammanfogningen 83b50011, som för in samma filer. Följande commits ändrar ingen fil där: 67afbb71, 53d28d89, 94f23ef0, 9d026ca4, 007354da, d7bf5bc8, cf9632ee, e68146c0, 4df90437, ece409ac och 33dc8535. `git diff 4df90437 33dc8535 -- lib api agents` är tom.
- **Commits utan egen lins:** 9d026ca4, 007354da, d7bf5bc8 och 94f23ef0 (stämpelns och läsarens tidigare varv) har ingen egen lins här. Det har däremot lagningarna efter deras andra blick (e68146c0, 4df90437).
- **Grinden på den här filen.** `andraBlicken` kördes med intervallet 833692ea..33dc8535 och alla `ops/GRANSKNING-*.md`. Utfall: «13 mekanikfil(er) täckta av ops/GRANSKNING-fabrikssvep.md (commit 4df9043)», ok=true. Motprov:
  - Med `dom: BLOCKERAR` blev det ok=false: «senaste domen är BLOCKERAR».
  - Med HEAD=84104d07 blev det ok=false: «8 mekanikfil(er) ändrade efter den granskade commiten 4df9043».
- **Utanför granskningen:** commits efter 33dc8535, på grenen `prisboken-vakterna` (c7c68dce..84104d07), ändrar `lib/verifiers/` och är inte granskade här. Förs de in i PR #84 räknar grinden dem som ändrade efter den granskade commiten (`lib/granskningsgrind.js:86–89`), och då släpper den här filen dem inte.

## Proveniens

- Två tidigare försök, wf_d81e808c-340 och wf_8ca7def9-74e, dog på kontots sessionsgräns utan dom.
- Föregångarnas oprövade anteckningar för prisboken och verifierarna gavs till den här körningens granskare som en lista att pröva. Bara det som kördes om räknas här. Larmlinsen läste också föregångarnas anteckningar och skript.
- **Omprövningens utfall:**
  - **Höll när det kördes om:** is_current-sabotaget gav 0, DESC gav 0, och YI-10 förblev grön vid fail-open (larmen).
  - **Föll:** «V2 kraschade sviten». Omkörningen gav fail=1 (verifierarna).
  - **Omklassat:** «computeElRecommendation saknar Eurostat-golv» blev en designfråga i EL-03 (prisboken).
  - **Fortfarande omätt:** spotgränsen ~1,41 → ~1,50 kr/kWh (prisboken).
- Linserna kördes en i taget.
- Granskarnas anteckningar och skript ligger under `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/`:
  - `granskning84c-larmacceptans-d/`
  - `granskning84c-prisboken-el/`
  - `granskning84c-kallfabriken-d/`
  - `granskning84c-lagningar/`

  Katalogerna ligger utanför repot och försvinner med sessionen. Det som ska citeras senare behöver gå in i `ops/` via en PR.

## Grundarens beslut: Eurostat-prisändringen i ea0aa112

**Talen godkänns.** 225,02 / 145,37 / 127,03 öre/kWh exkl. moms (Eurostat 2026-S1) stämmer mot källan. Jobb 117503848096 (17 okt) läste live = prisbok i alla tre banden, med vaktens egen läsväg och 0,5 öres tolerans. Två linser (prisboken och verifierarna) läste samma jobb och kom fram till samma tal. Ändringen kan behållas.

Ytor som talen når, mätt av granskarna:

| Yta | Når talen? | Grund |
|---|---|---|
| Kundens elanalys i fakturavyn, mejlen och rummet | Nej | `api/test-invoice.mjs` returnerar i varje el-gren före `recommend()`, och `lib/el-recommendation.js` läser inte banden. Fem el-fall gav identiska svar, och räknaren stod på 0 (84c-EL-03). |
| `api/el-prices` (publik) | Ja | Talen syns i `marketFloor` och sänker `saving`: 12 MWh à 2,80 kr ger 6 598 kr/år i stället för 7 679. Endpointen har ingen anropare i repot (84c-EL-04). KV-cachen bär de gamla talen upp till en timme efter deploy. |
| recommend-prompten | Bara i texten | Promptraden bär de nya talen, men el når inte `recommend()` i produktion. |
| Note-texten och Portfolio | Nej | Elkategorin har `source: 'estimated'`, och Portfolio läser `public_price_points`. |

Riktningen är den säkra: golvet steg, så en påstådd besparing kan bara sjunka eller stå still. Att behålla ändringen ändrar inget kundtal i fakturavägen i dag.

Fyra [VAKT] bör följa med ändringen:
- Proveniensen i kommentaren rättas till 17 okt (84c-EL-06).
- Perioden pinnas i KF-02 (84c-EL-02).
- TryggEl-fixturen flyttas, så att kvottestet kan falla igen (84c-EL-01).
- Kommentaren om golvets roll rättas (84c-EL-03).
