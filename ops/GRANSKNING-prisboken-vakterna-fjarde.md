commits: 8467304f
dom: BLOCKERAR

# Fjärde blicken: prisboken och vakterna (PR #85)

PR #85 är `claude/fable-5-resume-i60dmd` mot `main`, med bas 15c94d4a. Tredje blicken (`ops/GRANSKNING-prisboken-vakterna-tredje.md`) gav BLOCKERAR för 14f2124f, med T85-1 som [KUND]. Den här granskningen gäller lagningen, 8467304f, som är PR:ens topp. Den lagar T85-1 ([KUND]) och T85-6 ([VAKT]).

En granskare prövade den i en egen worktree med HEAD 8467304f, avläst med `rev-parse` före och efter. Granskaren rapporterar tomt `git status --porcelain` efter varje harness och vid slutet. Den pushade inte, committade inte, startade inget arbetsflöde, använde inga Vercel-verktyg och körde inte stress-testet.

Filen är skriven av en agent som varken byggt eller granskat. Den återger granskarens fynd och utfall och har inte kört om sabotagen. Det skrivaren själv mätte står under «Täckning».

## Domen

**BLOCKERAR.** Ett bekräftat [KUND]-fynd blockerar, också när felet fanns före PR:en. Här finns ett: G85-1. Det är inte förexisterande. PR:en införde det.
- 3 fynd: 1 [KUND] och 2 [VAKT]. Alla 3 är bekräftade, med bevis och motprov.
- G85-1 är [KUND]. Det sitter i `m365Verifierat`, alltså i funktionen som 8467304f gör till den enda källan för båda dörrkortens datum. Plattformskortet har haft samma form sedan f4ab68ea, som också ligger i PR:en.
- G85-2 och G85-3 är [VAKT] och förexisterande: luckorna fanns redan i 14f2124f. 8467304f lägger till påståenden som går längre än testerna: en kommentar, ett syskonfall och en testkommentar. De blockerar inte och lagas framåt enligt stoppregeln (9 sep).
- 0 obekräftade fynd.

**Felet är latent i dag, och det ska stå här utan att mjukas upp.** Dagens prisbok har fem Microsoft-nivåer i SEK, alla med datumet 2026-10-19 (avläst, se «Täckning»). Med den boken säger båda korten 2026-10-19, och det är rätt. Felet syns först när en Microsoft-nivå får ett datum utan nollutfyllnad, till exempel `2026-10-9`. Stämpelboten skriver ISO (`scripts/verify.mjs:17`). Enligt granskaren kräver stämpelvakten ISO för botens stämplar. Formen kan alltså bara komma in genom en handrättning. Men ingen vakt fäller den om den gäller någon annan nivå än `e3`: sviten var grön och price-audit sa «✓ ALLT OK».

**Ett mönster, ett varv till.** 8467304f är lagningen av T85-1, och G85-1 sitter i lagningen. Tredje blicken fann samma sak i de fyra lagningarna före: alla fyra fick ett nytt fynd. Det är bibelns 24 sep: «varje granskningsvarv hittade fel i det FÖRRA varvets lagning».

**Vad som släpper grinden.** Den här filen namnger PR:ens topp. Grinden läser den senaste domen, och den är nu BLOCKERAR (prov A under «Täckning»). Granskarens förslag till lagning av G85-1 ändrar `lib/business-intel.js`. Lagningen behöver därför en egen granskning med `dom: MERGAS` som namnger lagningens commit. Samma krav gäller om G85-2 lagas i PR:en genom att nivåbryggan ändras i `lib/domain-intel.js`.

## Bekräftade [KUND]-fynd

### G85-1: båda dörrkorten sorterar datum som strängar, och ett datum utan nollutfyllnad ger fel datum
- **Fil:** `lib/business-intel.js`, `m365Verifierat`, rad 295–299. Kortens meningar står på `business-intel.js:325` (licensspannet) och `domain-intel.js:386` (plattformen).
- **Commit:** 8467304f för licensspannkortet. Plattformskortet har samma form sedan f4ab68ea. Båda ligger i PR:en, så felet är inte förexisterande.
- **Påstående:**
  - `m365Verifierat` väljer det stalaste datumet med `[...d].sort()[0]`, alltså med en strängjämförelse.
  - Ett datum utan nollutfyllnad sorteras fel. Med `business-premium` = `2026-10-9` och fyra nivåer med `2026-10-19` hamnar `2026-10-19` först.
  - Båda dörrkorten säger då «Microsofts publika listpriser, verifierade 2026-10-19» om ett spann där en nivå senast verifierades 9 okt.
  - Det är samma form som T85-1: kortet säger ett nyare datum än spannets äldsta. Indata är ett annat.
  - Strängjämförelsen fanns redan på main. Men main tog det NYASTE datumet, och med samma bok gav det `2026-10-9`, premiums eget datum. Felvalet kom med PR:en.
- **Bevis (granskarens):**
  1. `datum.mjs` mot worktreen, med `business-premium` = `2026-10-9` i minnet: plattformskortet «, verifierade 2026-10-19», licensspannet «, verifierade 2026-10-19 × ert anställdatal ur bokslutet».
  2. Sabotaget E9 skrev samma datum i `agents/recommender/branchindex.js` (`assert old in s`, återställt i `finally`). Mot hela sviten: 2689 av 2689 gröna, 0 fällda.
  3. `scripts/price-audit.mjs` med E9: «✓ ALLT OK», exit 0.
  4. `main_uttryck.mjs` kör main:s två uttryck, kopierade ordagrant ur 15c94d4a (`domain-intel.js` 367–371 och `business-intel.js` 295). Med premium `2026-10-9` ger båda `2026-10-9`. 8467304f ger `2026-10-19`.
  5. `node -e`: `Date.parse('2026-10-9T00:00:00Z')` = NaN.
- **Motprov:**
  - Med premium `2026-10-09` (nollutfyllt) säger båda korten 2026-10-09. Sonden kan alltså visa det rätta svaret.
  - price-audit med premium `2026-01-01` ger «[INAKTUELLT] Tier 'business-premium' verifierat 2026-01-01». Auditen kan svara nej, men inte på formatet.
  - Sabotaget E8 (`e3` = `2026-9-1`) fälls av RD-11 («E3 är numera vaktat …»). Skälet är att `lib/saas-rad.js:133` läser datumet som NaN och därmed som inaktuellt. `e3` fångas alltså av en bieffekt. `business-basic`, `business-standard`, `business-premium` och `e5` fångas inte.
  - Prejudikat i koden: `aldstaTierDatum` (`agents/recommender/branchindex.js:1266`) filtrerar redan på `/^\d{4}-\d{2}-\d{2}$/` innan den sorterar.
- **Varför [KUND]:** meningen når besökaren i dörren. I det konstruerade läget säger båda korten ett datum som inte är spannets äldsta. Talet stämmer, men proveniensen gör det inte, och regel 3 räknar det som fel. Att felet är latent ändrar inte klassen: stoppregelns fråga är om en mening som kunden läser kan bli fel, och här kan den det.
- **Förslag:**
  - Låt `m365Verifierat` kräva `/^\d{4}-\d{2}-\d{2}$/` för varje datum, och behandla ett annat format som ett saknat datum, alltså `null`. Det är samma regex som `aldstaTierDatum` och stämpelvakten använder.
  - Lägg ett fall i DV-01 där `business-premium` = `2026-10-9` ska ge null, alltså text utan datum, på BÅDA kortens `source`.
  - Alternativt, eller dessutom: en svitkontroll som fäller varje `licenseTierBenchmarks.lastVerified` som inte är ISO. Då kan boken aldrig bära formen.

## Bekräftade [VAKT]-fynd: lagas framåt enligt stoppregeln

Baslinjen var `node --test tests/run.mjs` på 8467304f: 2689 godkända och 0 underkända. De riktade filerna `tests/domain-intel.mjs` och `tests/business-intel.mjs` gav 154 av 154. Varje sabotage skrevs med `assert old in s` och exakt en förekomst, kontrollerades mot no-op, prövades för ändrat beteende med `korten.mjs` och återställdes ur sparad sträng i `finally`.

### G85-2: «samma urval» för nivåbryggan och spannet är påstått, inte prövat
- **Fil:** `lib/domain-intel.js` (`m365Nivabrygga`, rad 358–368), `lib/business-intel.js` (`buildLicensspannFinding` rad 305, kommentaren rad 287–289) och `tests/domain-intel.mjs` (DV-01).
- **Commit:** påståendena kom i 8467304f. Luckan finns redan i 14f2124f, så fyndet är förexisterande.
- **Påstående:**
  - Commiten listar «nivåbryggan (samma urval)» bland syskonfallen.
  - Kommentaren i `business-intel.js` säger: «Nu läser plattformskortet, nivåbryggan och licensspannkortet samma två funktioner (DV-01).»
  - DV-01 prövar bara DATUMETS urval. Inget test prövar att SPANNETS tal kommer ur `m365Nivaer`. Det gäller både nivåbryggans «66,91–641,18 … 6 891 kr» i plattformskortet och licensspannets kronor.
  - `M365_NIVABRYGGA` räknas en gång, när modulen laddas. DV-01:s ändringar av `T` på plats kan därför aldrig nå den.
  - Nivåbryggan läser bara en av de «två funktionerna».
  - Beteendet är rätt i dag.
- **Bevis:**
  - Sabotaget E1 (nivåbryggan: `m365Nivaer(m365Tiers())` → `.filter(t => t.msrpAnnual < 600)`) mot hela sviten: 2689 av 2689 gröna. Beteendet ändrades: teasern säger «66,91–416,77 kr … 4 198 kr per anställd och år».
  - Sabotaget E7 lät licensspannets spann läsa ett eget urval utan SEK-villkoret, medan datumet fortfarande gick via `m365Verifierat`. Mot hela sviten: 2689 av 2689 gröna. I USD-läget (en USD-nivå med `msrpAnnual` 999) blir rubriken «223 700 kr/år skiljer …» i stället för «137 820 kr/år», medan källan står kvar på «verifierade 2026-10-19». Spann och datum kommer då ur olika urval. Det är precis det DV-01 säger sig förhindra.
  - Mot 14f2124f-trädet, i de riktade filerna: E1 fällde 0 av 154, och E7 fällde 0 av 154.
- **Motprov:**
  - Sabotagen C2 (SEK-villkoret bort ur `m365Nivaer`) och C3 fäller DV-01 mot hela sviten (2688 av 2689). Sviten ser alltså urvalet när det går via `m365Verifierat`, men inte spannets tal.
  - `korten.mjs` visar ändrat beteende i både E1 och E7. De är alltså inga no-ops.
- **Förslag:**
  - Pröva spannet i DV-01. Kräv att `buildLicensspannFinding(FAKTA, medUsd)` har samma `title` och `detail` som för `T`, och att plattformskortets `detail` innehåller lägsta och högsta `msrpAnnual` ur `m365Nivaer(T)`.
  - Låt nivåbryggan ta nivåerna som argument och räknas per anrop, eller exportera den, så att testet kan nå den.
  - Alternativt: rätta kommentaren och syskonfallet så att de bara påstår datumets urval.

### G85-3: plattformskortets text utan datum prövas inte, fast testkommentaren säger «i alla tre lägen»
- **Fil:** `tests/domain-intel.mjs` (DV-01, rad 569 och 576–587) och `lib/domain-intel.js` rad 386.
- **Commit:** testkommentaren kom i 8467304f. Luckan finns redan i 14f2124f, och grenen finns på main. Fyndet är förexisterande.
- **Påstående:**
  - DV-01:s kommentar på rad 569 säger: «Licensspannkortets egen text (T85-1): samma datum som plattformskortet, i alla tre lägen.»
  - Commiten skriver «båda korten … med en nivå utan datum».
  - Plattformskortets egen text prövas bara i två lägen: `zoom-pro` = 2099-01-01 och `e3` = 2026-01-01. Den prövas aldrig när en nivå saknar datum.
  - Grenen som tystar datumet på plattformskortet saknar alltså tand.
  - Beteendet är rätt i dag: `korten.mjs` ger «nivåspannet: Microsofts publika listpriser» utan datum.
- **Bevis:**
  - Sabotaget E2 (plattformskortets `` ${verifierat ? `, verifierade ${verifierat}` : ''} `` → `` , verifierade ${verifierat} ``) mot hela sviten: 2689 av 2689 gröna. Beteendet ändrades: med `e5` utan datum säger kortet «nivåspannet: Microsofts publika listpriser, verifierade null».
  - E2 mot 14f2124f-trädet: 0 av 154.
- **Motprov:** licensspannkortets null-läge har tand. Rad 574 kräver «Microsofts publika listpriser × », och granskarens E3 (licensspannet läser `m365Verifierat()` mot en tom bok) fällde 2 tester. Testet kan alltså se null-läget, men bara på det ena kortet.
- **Förslag:** lägg till `T.e5.lastVerified = undefined` i DV-01:s `try`-block, och kräv att `plattform()` slutar på «Microsofts publika listpriser» utan «verifierade». Återställ `e5` i `finally`. Annars: rätta kommentaren till «i två lägen».

## Obekräftade fynd

Inga. Alla tre fynd bär bevis och motprov.

Granskarens material säger inget om V85-D1, som andra blicken lämnade obekräftat. Det säger inte heller något om tredje blickens övriga [VAKT]: T85-2, T85-3, T85-4, T85-5, T85-7 och T85-8. Ingen av deras filer ändras i 8467304f (se «Täckning»), så de är inte lagade i PR:en. Om de lagas på någon annan gren är inte prövat här.

## Friat

Allt utgår från HEAD 8467304f och en baslinje på 2689 godkända och 0 underkända tester.

### Meningen finns på två ställen, och övriga Microsoft-datum har rätt proveniens
- En grep i `lib/`, `api/`, `agents/` och `src/` efter «Microsofts publika listpriser, verifierade X» ger två träffar: `business-intel.js:325` och `domain-intel.js:386`.
- Övriga Microsoft-datum som når en kund kommer från en enda nivå och har rätt proveniens: `recommend.js:1469` via `m365-equivalent.js:80` (`bm.lastVerified` för `map.tier`), `harledCeller` i branchindex (referensnivåns datum) och listprisankaret.
- Lekia-grenens plattformskort (SPF utan MX) säger «nivåspannet: Microsofts publika listpriser» utan datum.
- Frontend räknar inte om datumet, och `api/reveal` cachar inga fynd.

### Före och efter (`korten.mjs`, tio lägen)
- Läget «idag»: 14f2124f och 8467304f ger identisk text för båda korten, «verifierade 2026-10-19». Licensspannets rubrik «137 820 kr/år» är oförändrad.
- Med `e3` = 2026-09-01 och med `e5` utan datum är T85-1 lagat: båda korten säger samma sak. Före commiten sa licensspannet 2026-10-19.
- Commitens radhänvisningar, 395 och 308, stämmer mot 14f2124f.

### Commitens sabotage och T85-6
- C1–C6 fällde vart och ett exakt DV-01 mot hela sviten (2688 av 2689). Commitens «6 tester föll» håller.
- C2 är samma riktning som tredje blickens DV-b (SEK-villkoret bort ur `m365Nivaer`), som då fällde 0. Den halvan av T85-6 har alltså fått tand.
- Granskarens egna sabotage som fällde: E3 (2 tester), E5 (det näst stalaste datumet, DV-01), E6 (plattformskortet läser en frusen ögonblicksbild, DV-01) och E8 (RD-11, se G85-1).

### Laddning och import
- `business-intel.js` importerar bara `node:url`, så flytten skapar ingen importcirkel.
- `api/reveal`, `api/cron/warm-ct`, `lib/inkorgsadress`, `domain-intel` och `business-intel` laddar.
- `api/generate-prospect` faller på «Missing API key» (Resend, vid körning), likadant på 14f2124f.
- Den enda importören av den flyttade exporten var `tests/domain-intel.mjs`, och den är uppdaterad. Motprov: att importera `m365Verifierat` ur `domain-intel` ger SyntaxError efter commiten och lyckas före.

### Datumets urval
- Bortsett från G85-1 har granskaren inte hittat något läge där datumet kommer från fel nivå eller blir null utan skäl.
- Båda korten läser samma objekt, `BRANCHINDEX['saas-productivity'].licenseTierBenchmarks`: anroparna på rad 635 och 705 och `m365Tiers()` på rad 356, alla i `domain-intel.js`.

### Sabotagen, samlat

| Utfall | Sabotage |
|---|---|
| fällde | C1–C6 (DV-01, mot hela sviten), E3 (2 tester), E5 (DV-01), E6 (DV-01), E8 (RD-11) |
| fällde 0 trots ändrat beteende | E1, E2 och E7 (hela sviten, G85-2 och G85-3), E9 (datafallet, G85-1) |
| no-op i beteendet, räknas inte | E4 (`msrpAnnual > 0` bort) |

## Täckning

Mätt av skrivaren 21 okt:
- **PR #85:s huvud:** `gh api repos/Arvo-flow/arvo-flow.github.io/pulls/85` gav följande:
  - head `claude/fable-5-resume-i60dmd`, sha 8467304f
  - base `main`, bas-sha 15c94d4a
  - 14 commits, open

  Den lokala grenen `prisboken-vakterna` står på samma sha. `git status --porcelain` var tomt före skrivningen.
- **8467304f** (`git show --stat`) ändrar `lib/business-intel.js`, `lib/domain-intel.js` och `tests/domain-intel.mjs`. Föräldern är a0cb4b9d, som bara lägger till tredje blickens granskningsfil. `git diff --name-only 14f2124f 8467304f` ger de tre filerna och den granskningsfilen. Ingen fil bakom T85-2, T85-3, T85-4, T85-5, T85-7 eller T85-8 finns bland dem.
- **Radhänvisningarna** (`git show 8467304f:<fil>`): `business-intel.js` har kommentaren på rad 287–289, `m365Verifierat` på 295–299, `m365Nivaer(tierBenchmarks)` på 305 och meningen på 325. `domain-intel.js` har `m365Tiers` på 356, `m365Nivabrygga` och `M365_NIVABRYGGA` på 358–368 och plattformskortets mening på 386. I `tests/domain-intel.mjs` står kommentaren «i alla tre lägen» på rad 569, kravet «Microsofts publika listpriser × » på 574 och plattformskortets prov på 576–587, med två lägen: `zoom-pro` och `e3`.
- **Dagens bok:** node läste `BRANCHINDEX['saas-productivity'].licenseTierBenchmarks` i klonen på 8467304f. Fem nivåer i SEK med `msrpAnnual`: business-basic, business-standard, business-premium, e3 och e5, alla `2026-10-19`.
- **Strängsorteringen:** `node -e` gav `['2026-10-9','2026-10-19','2026-10-19'].sort()[0]` = `2026-10-19` och `Date.parse('2026-10-9T00:00:00Z')` = NaN. Motprov: nollutfyllt (`2026-10-09`) ger `2026-10-09` och ett tal. ISO-regexen svarar false för `2026-10-9` och true för `2026-10-09`.
- **Datumens källor:**
  - `scripts/verify.mjs:17` är `new Date().toISOString().slice(0, 10)`.
  - `aldstaTierDatum` filtrerar på ISO-regexen på `branchindex.js:1266`.
  - `lib/saas-rad.js:133` läser datumet med `Date.parse`, och NaN ger åldern Infinity.
  - På 15c94d4a tar `domain-intel.js` 367–371 det nyaste datumet bland ALLA nivåer i kategorin, och `business-intel.js:295` tar det nyaste bland SEK-nivåerna. Båda använder `sort().at(-1)`.
- **Granskarens baslinje:** `baslinje.txt` i granskarens katalog säger «# tests 2689», «# pass 2689», «# fail 0» och exit 0.
- **Grinden på den här filen:** `andraBlicken` och `lasGranskning` ur `lib/granskningsgrind.js` vid 8467304f kördes med bas 15c94d4a, PR:ens 14 commits, 33 ändrade filer och de 14 `ops/GRANSKNING-*.md` som finns vid 8467304f. Huvudet prövades före skrivningen, eftersom filen inte rörs efteråt: de två huvudraderna ensamma, som är det grinden läser. Skriptet ligger i skrivarens scratchpad, `grind85-fjarde/grind.mjs`. `lasGranskning` läser huvudet som `["8467304f"]` och `BLOCKERAR`.

  | Prov | Granskningar | Utfall |
  |---|---|---|
  | A: med den här filen | 14 + denna | ok=false: «senaste domen är BLOCKERAR — bara «dom: MERGAS» släpper mekanik till main» |
  | B: motprov, samma huvud med `dom: MERGAS` | 14 + denna | ok=true: «11 mekanikfil(er) täckta av … (commit 8467304)» |
  | C: motprov utan den här filen | 14 | ok=false: tredje blickens fil, «senaste domen är BLOCKERAR» |

  Filen håller alltså PR:en stängd av domens skäl. Utan den hade tredje blickens BLOCKERAR fortsatt att gälla.

## Proveniens

- Granskaren arbetade i en worktree med HEAD 8467304f9facd9755e59291dc9c7ef09eb4aa69c.
- Granskarens anteckningar och skript ligger under `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning85-fjarde/`. `anteckningar.md` har mätningarna M0–M18. Skripten är `korten.mjs`, `laddning.mjs`, `datum.mjs`, `main_uttryck.mjs`, `sabotage.py`, `fore_e1.py`, `fore_e7.py`, `e7_beteende.py` och `prisaudit_e9.py`. Före-trädet är `git archive 14f2124f`, och main:s uttryck kommer ur `git archive 15c94d4a`.
- Katalogen ligger utanför repot och försvinner med sessionen. Det som ska citeras senare behöver gå in i `ops/` via en PR.
- Skrivaren räknar hårda mellanslag med en byte-räkning efter skrivningen (bibelns regel 7). Utfallet står i överlämningen, inte här, eftersom filen inte rörs efteråt.
