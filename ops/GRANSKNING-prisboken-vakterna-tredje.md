commits: 91b38af4 ee3ff972 f4ab68ea 530e87dc 14f2124f
dom: BLOCKERAR

# Tredje blicken: prisboken och vakterna (PR #85)

PR #85 är `claude/fable-5-resume-i60dmd` mot `main`, med bas 15c94d4a. Andra blicken (`ops/GRANSKNING-prisboken-vakterna.md`) gav MERGAS för 88740439. Den här granskningen gäller de fem commits som ligger efter den: 91b38af4, ee3ff972, f4ab68ea, 530e87dc och 14f2124f. 14f2124f är PR:ens topp.

En granskare prövade dem i en egen worktree med HEAD 14f2124f. Granskaren rapporterar rent `git status` efteråt, och att den inte pushade, committade, startade ett arbetsflöde eller använde Vercel-verktyg.

Filen är skriven av en agent som varken byggt eller granskat. Den återger granskarens fynd och utfall och har inte kört om dem. Det skrivaren själv mätte står under «Täckning».

## Domen

**BLOCKERAR.** Regeln för den här domen är att ett bekräftat [KUND]-fynd blockerar, också när felet fanns före PR:en. Ett sådant fynd finns: T85-1.
- 8 fynd: 1 [KUND] och 7 [VAKT]. Alla 8 är bekräftade, med bevis och motprov.
- T85-1 är [KUND] och förexisterande. Det sitter i samma mening som PB85-2, och f4ab68ea lagar PB85-2. Lagningen nådde ett av två kort som bär meningen.
- De 7 [VAKT] är alla införda av de fem commitsen. De blockerar inte och lagas framåt enligt stoppregeln (9 sep).
- 0 obekräftade fynd.

**Varför ett förexisterande fynd blockerar här, när PB85-2 inte gjorde det.** Andra blicken dömde med regeln att bara ett [KUND] som PR:en inför blockerar. Den här domen följer den strängare regeln ovan. Fyndet har också en egen koppling till PR:en: f4ab68ea är lagningen av just den här meningen och räknar upp sina syskonfall, men licensspannkortet står inte bland dem. Bibeln 19 aug: «en fix som inte följs till alla konsumenter är en halv fix».

**Felet är latent i dag, och det ska stå här utan att mjukas upp.** Granskaren läste 79 versioner av prisboken på main. På 0 av dem hade Microsofts nivåer olika datum. Med dagens bok säger båda korten 2026-10-19. Felet syns först när en Microsoft-nivå får ett eget datum. Stämpelboten stämplar alla fem `bevakadeTiers` eller ingen, så enligt granskaren krävs det en handrättning av en enskild nivå.

**Ett mönster i de fem commitsen.** Fyra av dem lagar fynd ur andra blicken: ee3ff972 (V85-Z1), f4ab68ea (PB85-2), 530e87dc (PB85-1) och 14f2124f (PB85-3). Alla fyra fick ett nytt fynd i lagningen: T85-5, T85-1 och T85-6, T85-7 och T85-2. Det är bibelns 24 sep igen: «varje granskningsvarv hittade fel i det FÖRRA varvets lagning».

**Vad som släpper grinden.** Den här filen namnger PR:ens topp. Grinden läser den senaste domen, och den är nu BLOCKERAR. Utan den här filen hade grinden också stängt, men av ett annat skäl: tre mekanikfiler har ändrats efter 88740439 (mätt, se «Täckning»). Granskarens förslag till lagning av T85-1 ändrar `lib/`. Lagningen behöver därför en egen granskning med `dom: MERGAS` som namnger lagningens commit.

## Bekräftade [KUND]-fynd

### T85-1: licensspannkortet i dörren tar fortfarande det nyaste datumet. Förexisterande, och lagningen i f4ab68ea nådde det inte
- **Fil:** `lib/business-intel.js`, `buildLicensspannFinding`. Datumet räknas på rad 295 och meningen står på rad 308.
- **Commit:** f4ab68ea, som lagar PB85-2 på plattformskortet i `lib/domain-intel.js`. Felet på licensspannkortet fanns före PR:en.
- **Påstående:**
  - f4ab68ea lagade datumet på dörrens plattformskort. Det är nu det stalaste bland Microsofts nivåer, och saknar en nivå datum sägs inget datum.
  - Licensspannkortet i samma dörr bär samma mening: «Microsofts publika listpriser, verifierade X».
  - Det räknar fortfarande med den gamla regeln: det NYASTE datumet bland SEK-nivåerna. `filter(Boolean)` hoppar över en nivå utan datum i stället för att tysta datumet.
  - Commitens syskonfall nämner inte kortet.
- **Bevis:**
  - `syskon.mjs` muterade prisboken i minnet och återställde den.
    - Med `e3.lastVerified` = 2026-09-01 säger plattformskortet 2026-09-01 och licensspannet 2026-10-19.
    - Med `e5` utan datum säger plattformskortet inget datum och licensspannet 2026-10-19.
  - Båda korten visas i samma dörr. `mergeRevealFindings` rankar licensspannet 1.5 och plattformen 3, under ett tak på 5 rader (`domain-intel.js` rad 644–653 och 714–721).
  - En grep efter meningen gav två träffar: `domain-intel.js:395` och `business-intel.js:308`.
  - `historik.mjs` läste 79 versioner av prisboken på origin/main. På 0 av dem skilde sig Microsoft-nivåernas datum åt.
  - `stampelbeslut` stämplar alla fem `bevakadeTiers` eller ingen. Datumen kan alltså bara skiljas åt genom en handrättning av en enskild nivå.
- **Motprov:**
  - Med dagens bok säger båda korten 2026-10-19. Skillnaden syns bara i det konstruerade läget.
  - Samma historikinstrument kört med `--all` hittar 2 versioner (maj, på grenar) där Microsofts datum skiljer sig. Instrumentet kan alltså se en skillnad.
- **Varför [KUND]:** meningen når besökaren. I det konstruerade läget säger licensspannet «verifierade 2026-10-19» om ett spann där en nivå senast verifierades 2026-09-01. Två kort i samma dörr ger då två olika datum för samma påstående. Talet stämmer men proveniensen gör det inte, och regel 3 räknar det som fel.
- **Förslag:**
  - Flytta `m365Nivaer`/`m365Verifierat` till en delad modul, till exempel `business-intel.js` eller `lib/m365-nivaer.js`. `domain-intel` importerar redan `business-intel`.
  - Låt `buildLicensspannFinding` läsa samma funktion (regel 1).
  - Utöka DV-01 så att den prövar båda kortens `source`-text, med en äldre `e3` och en `e5` utan datum.

## Bekräftade [VAKT]-fynd: lagas framåt enligt stoppregeln

Baslinjen var `node --test tests/run.mjs` på 14f2124f: 2689 godkända och 0 underkända. Varje sabotage kördes mot hela sviten, med `assert old in s`, exakt en förekomst och en kontroll av att det inte var en no-op. Filen återställdes ur sparad sträng.

### 91b38af4: Zoom läser årspriset

#### T85-3: Zoom-läsarens gap kan nå grannkortet och ge DRIFT där svaret är OLÄSBAR
- **Fil:** `lib/verifiers/zoom.mjs` (`zoomLas`).
- **Påstående:**
  - `zoomLas` säger att den läser årspriset under kortets rubrik.
  - Gapet `[^\d$]{0,80}?` mellan «Bäst för» och priset kan ändå sträcka sig in i grannkortet.
  - Om Pro-kortet tappar sitt pris och Business-kortet ligger inom 80 tecken utan siffror, blir Pro DRIFT med 18.33 USD i stället för OLÄSBAR.
  - Det är fel larmklass, och den kräver motsatt åtgärd: DRIFT säger «rätta prisboken», OLÄSBAR säger «laga vakten» (bibeln 22 aug).
  - Gränsen 80 har ingen tand.
- **Bevis:**
  - `zoomstold.mjs` med Pro utan pris och kort beskrivning gav `["Zoom Pro årsavtal (USD)", false, "18.33 USD"]`. NV:s klassning ger det DRIFT.
  - Sabotaget Z-gap (`{0,80}` → `{0,2000}`) fällde 0 av 2689.
- **Motprov:**
  - Mot fixturen ger samma instrument grönt och grönt (14.16 och 18.33).
  - `zoomfall.mjs` gav null för månadsläget, tusental, ett kampanjpris, «Allt i Workplace Pro, plus:» och Business Plus.
  - Ingen stöld ger falskt grönt, eftersom det stulna talet skiljer sig från planens.
- **Förslag:** stoppa gapet vid nästa kort, till exempel `(?:(?!Workplace)[^\d$]){0,80}?`. Lägg till ett NV-09-fall «Pro utan pris, grannkortet nära» som ska ge OLÄSBAR.

#### T85-4: en kommentar och en rad i Zoom-vakten beskriver en mekanik koden inte har
- **Fil:** `lib/verifiers/zoom.mjs`, rad 17–18 och `zoomLas`.
- **Påstående:**
  - Kommentaren på rad 17–18 säger «första träffen som ger ett pris vinner».
  - `zoomLas` samlar i stället alla träffar för båda namnen och ger null vid oenighet.
  - Raden `if (v == null) return null;` i `zoomLas` går inte att nå. Regexen garanterar en siffersträng, och den kan `talSv` alltid läsa.
- **Bevis:**
  - `zoomfall.mjs`: «båda namnen, olika tal» gav null, och «samma tal» gav 18.33. Den första träffen vinner alltså inte.
  - Sabotaget Z-null (raden borttagen) fällde 0 av 2689.
- **Motprov:** sabotaget Z-size (`size===1` → `>=1`, alltså att första kortet vinner) fällde NV-09. Sviten ser oenighetsregeln, men inte den döda raden.
- **Förslag:** skriv om kommentaren på rad 17–18 («två namn med olika tal är ett okänt»). Ta bort den onåbara raden, eller låt `zoomLas` använda `core.lasEntydigt` (regel 1).

#### T85-8: Zoom-fixturen är ett urval, men beskrivs som raderna ur körningen
- **Fil:** `tests/fixtures/narvaro/zoom-2026-10-21.txt`.
- **Påstående:**
  - Commiten beskriver fixturen som «kontextUtdrag-raderna ur körningen, sammanfogade i sidans ordning».
  - Den är ett urval. Efter «Komplett PBX» saknas sju rader ur planutdraget, och tre dollarutdrag saknas.
  - Utelämningen påverkar inte läsarens dom.
- **Bevis:**
  - Jobblogg 119052610222, läst via MCP.
  - Planutdrag 4 slutar «Komplett PBX / Webinars / 500 deltagare / Rooms / Reservering av arbetsplats / Visitor Management / Översatta undertexter / Av». Fixturens rad 39–40 går direkt från «Komplett PBX» till «AI-version…».
  - Dollarutdragen «Från 50 $ för 500 deltagare», «Från 10 $ för 30GB» och «10 $» finns i loggen men inte i fixturen.
- **Motprov:**
  - Fixturens rad 1–39 stämmer tecken för tecken med loggens utdrag. Det gäller också «14,16$ » med ett mellanslag efter och «‡».
  - Mot hela sidan gav den levande körningen 39549606765 (jobb 119055619336) ✓ 14.16 och ✓ 18.33.
- **Förslag:** ta med de utelämnade raderna, eller skriv «ett urval av kontextUtdrag-raderna».

### ee3ff972: Zoom-kommentaren rättad (lagningen av V85-Z1)

#### T85-5: «NV-08 prövar också sondens» stämmer för mönstret, inte för sondens avläsning
- **Fil:** `scripts/probe-saas-render.mjs`, och commitmeddelandet.
- **Påstående:**
  - Commiten säger: «Med ett gemensamt mönster prövar NV-08 också sondens.»
  - NV-08 prövar `DOLLARBELOPP`:s grupper (`m[1] ?? m[2]`) på det nakna mönstret.
  - Sondens egen avläsning, `m[2] ?? m[3]` med svansen `m[4]` efter en extra prefixgrupp, prövas av inget test.
  - Sondens beteende är i dag rätt.
- **Bevis:**
  - Sabotaget P1 (`(m[2] ?? m[3])` → `(m[2] ?? '?')`) fällde 0 av 2689.
  - Grep: inget test importerar `probe-saas-render`.
- **Motprov:**
  - `sond.mjs` körde sondens uttryck mot fixturen och gav 14,16, 18,33, 22 och 20. Det gamla mönstret gav bara 16,50.
  - Fem former gav rätt tal och svans.
  - Gruppindexen fungerar alltså, och påståendet håller för mönstret.
- **Förslag:** flytta sondens radbyggare (prefix + `DOLLARBELOPP` + svans) till en exporterad funktion och pröva den i NV-08. Alternativt: begränsa påståendet till mönstret.

### f4ab68ea: dörrens Microsoft-datum (lagningen av PB85-2)

#### T85-6: DV-01 räknar fram nivåerna själv och prövar aldrig `m365Nivaer`
- **Fil:** `tests/domain-intel.mjs` (DV-01).
- **Påstående:**
  - DV-01:s första assertion lyder «Nivåerna bakom spannet (SEK med listpris) är exakt de nivåer Microsoft-vakten läser».
  - Den räknar själv fram SEK-nivåerna ur `T`. Den anropar inte `m365Nivaer`.
  - Två villkor i datumets urval saknar därför tand.
- **Bevis:**
  - Sabotaget DV-b (`currency==='SEK'` bort ur `m365Nivaer`) fällde 0. USD-nivåerna saknar `msrpAnnual`, och filtret på `msrpAnnual` ensamt håller ute dem.
  - Sabotaget DV-a (`d.length < 2` bort) fällde 0.
- **Motprov:** sabotaget DV-c (`sort()[0]` → `sort().at(-1)`) fällde DV-01. Testet ser alltså valet av datum, men inte urvalet av nivåer.
- **Förslag:** exportera `m365Nivaer` och kräv att dess nycklar är lika med `m365Vakt.bevakadeTiers`. Lägg till ett fall med en USD-nivå som bär `msrpAnnual` och som inte får flytta datumet.

### 530e87dc: BI-10 efter stämpeln (lagningen av PB85-1)

#### T85-7: ISO-halvan av datumkravet i BI-10 saknar tand
- **Fil:** `tests/branchindex.mjs` (BI-10, `haller`).
- **Påstående:**
  - Commiten säger att datumet ska vara «ett ISO-datum från 2026-10-18 och framåt».
  - ISO-halvan i `haller` saknar tand.
  - Utan regexen klarar strängarna 'okänt', '2026-10-2' och 'undefined' golvet, eftersom jämförelsen är lexikografisk.
- **Bevis:**
  - Sabotaget B-a (ISO-regexen bort ur `haller`) fällde 0 av 2689.
  - `node -e` gav true för 'okänt', '2026-10-2' och 'undefined' mot `>= '2026-10-18'`.
- **Motprov:** '2026-10-17' gav false, och sabotaget B-data (9.56 → 9.57 i prisboken) fällde BI-10 två gånger. Talen och golvet har alltså tand.
- **Förslag:** lägg till `assert.ok(!haller({...tiers['atlassian-jira-standard'], lastVerified: 'okänt'}, 9.56))`.

### 14f2124f: bibelns regel 2 (lagningen av PB85-3)

#### T85-2: rättelsen säger «fem linser»; försöken hade fyra linser och en domskrivare
- **Fil:** `CLAUDE.md`, «SJU REGLER», regel 2, och commitmeddelandet.
- **Påstående:**
  - Den rättade regeln säger: «I båda döda försöken startades fem linser, men bara två hann arbeta.»
  - Försöken hade fyra linser i fasen «Granska» och en domskrivare (`skriv-domen`) i fasen «Skriv domen».
  - Agenterna 3 och 4 startade först när agent 1 hade dött. Poolen körde alltså två åt gången.
  - Talen i rättelsen stämmer: 792 800 och 870 899 tokens, 0 tokens för de tre övriga och 27 minuter mellan dödsfallen.
- **Bevis:**
  - `python3` läste `workflowProgress` i `wf_d81e808c-340.json` och `wf_8ca7def9-74e.json`.
  - Index 1–4 har `phaseTitle` 'Granska' och etiketterna granska:prisboken, granska:verifierarna, granska:larmen och granska:lagningarna. Index 5 har `phaseTitle` 'Skriv domen' och etiketten skriv-domen.
  - I wf_d81e808c startade agent 3 vid 1792318576669, efter agent 1:s `lastProgressAt` 1792318576281. Granskarens material anger ingen sådan tidsstämpel för agent 4.
  - Tokens: 404 775 + 388 025 = 792 800 och 430 798 + 440 101 = 870 899, lika med `totalTokens`.
  - 1792351317245 − 1792349685405 = 1 631 840 ms, ungefär 27 minuter.
- **Motprov:** samma läsning bekräftar commitens tokensummor och 27-minutersuppgiften. Instrumentet kan alltså bekräfta det som stämmer och skilja ut det som inte gör det.
- **Förslag:** skriv till exempel «I båda döda försöken köades fyra linser och en domskrivare; poolen körde två åt gången, och bara de två första hann arbeta.»

## Obekräftade fynd

Inga. Alla åtta fynd bär bevis och motprov.

Granskarens material säger inget om V85-D1, som andra blicken lämnade obekräftat. ee3ff972 ändrar `core.mjs` (`DOLLARBELOPP`). Om V85-D1 påverkas av det är inte prövat här.

## Friat

Allt utgår från HEAD 14f2124f och en baslinje på 2689 godkända och 0 underkända tester.

### Zoom (91b38af4)
- **Det levande beviset håller.** I körning 39549606765 på 91b38af4 gav jobb 119055619336 «✓ Zoom Pro 14.16 · live 14.16» och «✓ Zoom Business 18.33 · live 18.33», och stämplade 2 nivåer. Körningen som helhet blev röd av tele2-bredband, inte av Zoom.
- **`zoomLas` gav null, alltså OLÄSBAR,** för månadsläget, för tusental i båda formerna, för ett överstruket kampanjpris, för en siffra i beskrivningen, för pris per år, för Business Plus-kortet och för «Allt i Workplace Pro, plus:». Punktdecimal läses rätt.
- **Byggarens riktningar fäller.** Sabotagen Z-size, Z-aff och Z-ars fällde var sitt NV-09.

### `DOLLARBELOPP` och sonden (ee3ff972)
- Mot fixturen ger det nya mönstret 14,16, 18,33, 22 och 20. Det gamla ger bara 16,50.
- Sondens `m[2] ?? m[3]` och `m[4]` ger rätt tal och svans för «$14.16», «14,16$», «US$ 9», «USD 12» och «22 $».
- Granskarens eget sabotage D1 (inget mellanslag före $) fällde NV-08. Det är ett sabotage och har inget med V85-D1 att göra.

### Dörren (f4ab68ea)
- Plattformskortet läser bara de fem Microsoft-nivåerna i SEK och visar i dag 2026-10-19.
- SPF-grenen bär inget datum och kan därför inte visa fel datum.
- Sabotaget DV-c fällde DV-01.
- Den andra ytan med samma mening är fyndet T85-1.

### BI-10 (530e87dc)
- Hela prisboken stämplades med produktionens `stamplaKalla` och `stamplaKategori`: alla 18 verifierare, 20 nivåer och 17 kategorier, med datumet 2026-10-26. Det gjordes på disk, och boken återställdes ur sparad sträng. Sviten gav 2689 godkända och 0 underkända.
- Motprovet med 2026-10-17 gav 4 underkända, alla BI-10. Inget annat test pinnar ett datum.
- Sabotaget B-data fällde BI-10.

### Bibeln (14f2124f)
- Tokensummorna 792 800 och 870 899, 0 tokens för de tre övriga och 27 minuter mellan dödsfallen stämmer mot workflow-JSON.
- Det enda felet är ordet «fem linser» (T85-2).

### Sabotagen
13 sabotage, alla mot hela sviten.

| Utfall | Antal | Sabotage |
|---|---|---|
| fällde | 6 | Z-size, Z-aff, Z-ars, D1, DV-c, B-data |
| fällde 0 | 7 | Z-gap, Z-null, Z-iflag, P1, DV-a, DV-b, B-a |

Sex av de sju nollorna är redovisade i fynden T85-3 till T85-7. Z-iflag (`gi` → `g`) gör vakten skiftlägeskänslig, men ger aldrig falskt grönt. Granskaren räknar den därför inte som ett fynd.

## Levande bevis

Båda körningarna är «Verify price sources (factory)», startade med `workflow_dispatch` på PR:ens gren 21 okt.

| Körning | Sha | Jobb | Vad granskaren läste | Utfall |
|---|---|---|---|---|
| 39548656562 | 88740439 | 119052610222 (zoom) | `kontextUtdrag`-raderna, jämförda med fixturen | Fixturens rad 1–39 stämmer tecken för tecken. Sju planrader efter «Komplett PBX» och tre dollarutdrag saknas i fixturen (T85-8). |
| 39549606765 | 91b38af4 | 119055619336 (zoom) | vaktens utfall | «✓ Zoom Pro 14.16 · live 14.16», «✓ Zoom Business 18.33 · live 18.33», 2 nivåer stämplade |

Vad körningarna visar och inte visar:
- **De visar** att Zoom-läsaren i 91b38af4 läser dagens sida i sin helhet och får prisbokens tal. Zoom är inte längre OLÄSBAR på den koden.
- **De visar inte** att läsaren larmar rätt när sidan ändras. Det prövas av NV-09 och sabotagen, och där finns luckorna T85-3 och T85-4.
- **Körning 39549606765 blev röd** av jobbet tele2-bredband. Det jobbet ligger utanför den här granskningen.
- **Ingen körning på ee3ff972 eller senare** finns i granskarens material. ee3ff972 ändrar `zoom.mjs` och `core.mjs` igen.
- **Stämpeln nådde inte main** i någon av dem. I 39548656562 hoppades stämpeljobbet (119053371777) över, enligt andra blicken. I 39549606765 hoppades stämpeljobbet (119056418901) också över, avläst av skrivaren. «2 nivåer stämplade» gäller alltså bara körningens egen kopia av prisboken.

## Täckning

Mätt av skrivaren 21 okt:
- **PR #85:s huvud:** `gh api repos/Arvo-flow/arvo-flow.github.io/pulls/85` gav följande:
  - head `claude/fable-5-resume-i60dmd`, sha 14f2124f
  - base `main`, bas-sha 15c94d4a
  - 12 commits, open

  Den lokala grenen `prisboken-vakterna` står på samma sha.
- **Mekaniken i de fem commitsen** (`git show --stat`):

  | Commit | Filer | Mekanik |
  |---|---|---|
  | 91b38af4 | `lib/verifiers/zoom.mjs`, Zoom-fixturen, `tests/narvarovakter.mjs` | ja |
  | ee3ff972 | `lib/verifiers/core.mjs`, `lib/verifiers/zoom.mjs`, `scripts/probe-saas-render.mjs`, `tests/narvarovakter.mjs` | ja |
  | f4ab68ea | `lib/domain-intel.js`, `tests/domain-intel.mjs` | ja |
  | 530e87dc | `tests/branchindex.mjs` | nej |
  | 14f2124f | `CLAUDE.md` | nej |

  dbcb4936 ligger mellan f4ab68ea och 530e87dc. Den lägger bara till andra blickens granskningsfil och namnges inte här.
- **Körningarna:** `gh api .../actions/runs/<id>` gav head_sha 88740439 för 39548656562 och 91b38af4 för 39549606765, båda med conclusion failure. 39549606765 har 20 jobb: 18 lyckade, 1 misslyckat och 1 överhoppat. Det misslyckade är tele2-bredband (119055619288), och det överhoppade är «Stämpla verifieringsdatum på main» (119056418901). Jobb 119055619336 (zoom) lyckades.
- **Raderna i T85-1:** `git show 14f2124f:lib/business-intel.js` har datumet på rad 295 och meningen på rad 308, i `buildLicensspannFinding` (rad 283). `domain-intel.js:395` bär plattformskortets mening.
- **PB85-4 och PB85-5** nämns inte i någon commit i PR:en (`git log --format=%B 15c94d4a..14f2124f`). PB85-4 nämns i c7153568 och 81794599 på den lokala grenen `vakter-framat`, som inte ingår i PR:en.
- **Grinden på den här filen:** `andraBlicken` och `lasGranskning` ur `lib/granskningsgrind.js` vid 14f2124f kördes med bas 15c94d4a, PR:ens 12 commits, 31 ändrade filer och de 13 `ops/GRANSKNING-*.md` som finns vid 14f2124f. Skriptet ligger i skrivarens scratchpad, `grind85-tredje/grind.mjs`. `lasGranskning` läser huvudet som de fem commitsen och `BLOCKERAR`.

  | Prov | Granskningar | Utfall |
  |---|---|---|
  | A: med den här filen | 13 + denna | ok=false: «senaste domen är BLOCKERAR — bara «dom: MERGAS» släpper mekanik till main» |
  | B: motprov, samma fil med `dom: MERGAS` | 13 + denna | ok=true: «10 mekanikfil(er) täckta av … (commit 14f2124)» |
  | C: motprov utan den här filen | 13 | ok=false: «3 mekanikfil(er) ändrade efter den granskade commiten 8874043» (`lib/domain-intel.js`, `lib/verifiers/core.mjs`, `lib/verifiers/zoom.mjs`) |

  Filen håller alltså PR:en stängd av domens skäl. Utan den hade grinden också stängt, men av ett annat skäl: tre mekanikfiler som ingen granskning täckte.
- **Var filen skrevs:** när skrivandet började stod huvudklonen på den lokala grenen `vakter-framat` (81794599). Den grenen utgår från ee3ff972 och innehåller inte f4ab68ea, 530e87dc eller 14f2124f. Under skrivandet bytte klonen till `prisboken-vakterna`, PR:ens lokala gren. Grinden läser filen först när den ligger på PR:ens gren på GitHub.

## Proveniens

- Granskaren arbetade i worktree `.claude/worktrees/wf_8deb4cf9-e76-1` på HEAD 14f2124f255825af45c8b130a606f78f5e964991.
- Jobbloggarna 119052610222 och 119055619336 lästes via MCP. `gh api` nådde inte loggarna, eftersom blob-lagringen var blockerad.
- Granskarens anteckningar och skript ligger under `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning85-tredje/`. `anteckningar.md` har en rad per mätning, M1–M15. Skripten är `sond.mjs`, `dorr.mjs`, `historik.mjs`, `syskon.mjs`, `zoomfall.mjs`, `zoomstold.mjs`, `stampla-allt.mjs`, `kor-med-fil.py` och `sabotage.py` med `sab1.json`.
- Katalogen ligger utanför repot och försvinner med sessionen. Det som ska citeras senare behöver gå in i `ops/` via en PR.
- Filen har 0 hårda mellanslag. Det är kontrollerat med en byte-räkning efter skrivning (bibelns regel 7).
