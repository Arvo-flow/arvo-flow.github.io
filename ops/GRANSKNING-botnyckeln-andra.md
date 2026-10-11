<!-- Andra blicken på PR #81 (2026-10-10). Sonderna som nämns (scratchpad/*.mjs) kördes i granskarens egen worktree och ligger inte i repot. -->

# Granskning: botnyckeln, hemlighetsbindningen och .cursorrules

commits: 4279da90 e5f8af61 4eee72a8
dom: BLOCKERAR

Granskare: andra blicken (Bevisplikten p.1). Uppdraget var att hitta var det gröna är osant.
Allt kördes i en frånkopplad worktree på 4eee72a8. Inget arbetsflöde triggades och ingen extern tjänst anropades.

## [KUND] K1 · Beslutet fattas mot ett pris, stämpeln hamnar på ett annat

**Var:** `.github/workflows/verify-sources.yml:137-141` (`stampla` checkar ut `ref: main`) och `scripts/stampla.mjs:29` (`tillampaStamplar`).

**Mekanismen:**
- Matrisjobbet verifierar prisboken vid `github.sha`. Beslutet bär bara `{kalla, datum, nycklar, kategori}`, utan någon bindning till de tal som lästes.
- `stampla` lägger på beslutet på den main som gäller när jobbet körs. Vid en nekad push gör den om samma sak efter `reset --hard`.
- Har en PR ändrat ett pris under tiden får det nya priset dagens «verifierat»-datum, fast ingen verifierare har läst det.
- Stampelvakten ser bara HEAD~1→HEAD, alltså bara datumet.

**Avläst** (`scratchpad/race.mjs`): pushsteget hämtades ur YAML-filen och kördes med `bash -e` mot en lokal bare-main. Beslutet gällde m365/e3 vid X (416,77). Före körningen mergades en ändring av E3 till 499,00. Utfall:
```
stampla: 1 beslut, 1 datum flyttade: m365:e3
✓ stampelvakt: 1 verifieringsdatum flyttade framåt, inget annat ändrat
✓ stämpeln ligger på main
        msrpMonthly: 600.00, msrpAnnual: 499.00, arvoAnnual: 499.00,
        currency: 'SEK', lastVerified: '2026-10-10', source: 'microsoft.com',
```

**Det här är en regression, och den är mätt** (`scratchpad/race-motprov.sh`):
- Den gamla designen (`git pull --rebase`) gav `rebase KONFLIKT` på exakt den här layouten, där priset står på raden ovanför datumet.
- Motprov: en ändring på en orelaterad rad (E5) gav `rebase LYCKADES`.
- Kommentaren «ingen rebase, inga konflikter» tog alltså bort det enda som stoppade fallet.

**Fönster:**
- Hela körningen: matrisben med `timeout-minutes: 10` plus köande ben.
- Upp till 7 dygn om stampla-jobbet körs om, eftersom artefakterna har `retention-days: 7`.
- Felet blir skarpt först när grundaren lägger in BOT_DEPLOY_KEY.

**Lagning:**
- Beslutet ska bära `verifierad_sha: ${{ github.sha }}` eller ett avtryck per nyckel av blocket med `lastVerified` normaliserat.
- `stampla.mjs` ska hoppa över en nyckel vars block på main skiljer sig från blocket vid den verifierade sha:n. Skälet ska skrivas ut.
- Lås det med ett nytt test, SP-08. Det ska visa att en prisändring på en stämplad nyckel ger ingen stämpel. Motprovet är en ändring på en annan nyckel, som fortfarande ska stämplas.

## [VAKT] V1 · Stampelvakten släpper innehållsrader som ser ut som diffhuvuden

**Var:** `scripts/stampelvakt.mjs:59`. Raden `if (/^(index |--- |\+\+\+ )/.test(rad)) continue;` gäller även inne i en hunk. Innehållet `-- x` blir `--- x` i diffen och `++ x` blir `+++ x`, så de raderna hoppas över.

**Avläst** (`scratchpad/guard-attack.mjs`, riktig `git diff -U0`):
- A1, en tillagd rad `++ globalThis.x;` bredvid en riktig stämpel: `ok: true`.
- A2, kommentarraden `-- 133.82 kr/mån` ersatt med `++ 999.00 kr/mån`: `ok: true`.
- Motprov A3, samma ändring utan prefix: `ok: false` («bär ingen stämpel»).

I prisboken i dag finns 0 sådana rader, så felet sitter i vakten och inte i något kunden ser.

**Lagning:** behandla `---`/`+++` som huvud bara mellan `diff --git` och filens första `@@`. Inne i en hunk ska varje rad börja med `+` eller `-`.

**Eget sabotage S-d:** jag lät vakten hoppa över kommentarrader (`^[-+]\s*//`). Det fällde 0 av 7 SP-tester. Kravet «en tillagd rad» prövas bara med en rad som inte är en kommentar.

## [VAKT] V2 · Beslutsartefakten passerar förtroendegränsen utan kontroll

**Var:** `scripts/stampla.mjs:29`. Beslut från matrisjobben, som kör `npm install` utanför låsfilen, läggs på utan att kontrolleras mot registret.

**Avläst** (`scratchpad/forged.mjs`): ett beslut i m365:s namn stämplade **23** datum utanför m365:s deklaration (google-*, slack-* och kategorier). Stampelvakten svarade `ok: true, datum: 23`.

**Påståendet** «Matrisjobben … har inte längre skrivrätt» stämmer alltså inte. De kan fortfarande flytta varje kundsynligt verifieringsdatum. Det kräver ett komprometterat paket, och i normal drift ändras inget, därav klassen [VAKT].

**Lagning:** `kalla` ska motsvara filnamnet `stampel-<kalla>.json` och finnas i `VERIFIERS`. Dessutom ska `nycklar ⊆ bevakadeTiers`, `kategori === bevakadKategori` och `datum` ligga inom körningens datum.

## [VAKT] V3 · Vaktens «inte förbi i dag» prövas aldrig i pushvägen

**Sabotage:** i `scripts/stampelvakt.mjs:119` ersattes `new Date()…` med `'9999-12-31'` (`assert old in s`).
- **Beteendet ändrades:** ett datum 2031-01-01 gav `✓ stampelvakt … exit 0`. Med originalet blev det `::error:: … ligger efter i dag … exit 1`.
- **Sviten** `tests/stampelvakt.mjs`: 7 pass, 0 fail. SP-03 prövar bara funktionen, och SP-07 använder bara dagens datum.

**Lagning:** låt SP-07 också köra ett beslut med morgondagens datum och kräva rött.

## [VAKT] V4 · SP-05:s motprov är tomt

**Var:** `tests/stampelvakt.mjs:112`. Testet kräver att `b.json` saknas, men `b.json` skickas aldrig in.

**Sabotage:** verify.mjs fick skriva till en standardsökväg när variabeln är tom. Filen skrevs (`/tmp/stampel-sabotage.json`, avläst och sedan raderad), och SP gav 7 pass, 0 fail.

**Lagning:** kör med variabeln osatt och `cwd`/`TMPDIR` satta till en tom katalog, och kräv att katalogen fortfarande är tom.

## [VAKT] V5 · HB-läsaren: citerade jobb-id och `secrets['X']`

**Var:** `scripts/hemlighetsbindning.mjs:31-32`.
- Jobbet `'b':` slås ihop med föregående bundna jobb. Avläst: `obundna: []`. Motprovet, okciterat `b:`, gav `[m.yml#b]`.
- `secrets['LACKA']` ger `[]`.
- HB-04 räknar med samma regex och kan därför inte se felet. Modulens BLIND-rad («en annan form syns som ett fel») är falsk för den här formen.

**I dag:** js-yaml som orakel (`scratchpad/hb-cross.mjs`) gav 147 filer, 154 jobb och **0** avvikelser. Det enda obundna jobbet är motprovet `utan-miljo`.

**Lagning:** kasta på varje rad med två blankstegs indrag som inte är en kommentar och inte matchar `JOBBRUBRIK`, och vidga `HEMLIGHET` till `secrets\s*\[`.

**Egna sabotage som fällde:** «varje jobb läses som bundet» gav 2 fällda. «Namn med understreck osynliga» gav 3 fällda.

## [VAKT] V6 · Nyckelns premiss är omätt: «produktion tillåter bara main»

Påståendet finns bara som text, i `scripts/hemlighetsbindning.mjs:3` och `ops/BOTNYCKELN.md:40`. Ingen sond och ingen mätning i repot belägger det. **Jag vet inte än.**

Om miljön tillåter andra grenar kan ett `workflow_dispatch` på en feature-gren med ändrad YAML läsa BOT_DEPLOY_KEY. Därifrån går det att pusha till main utan PR och utan stampelvakten.

**Lagning:** lägg till i runbookens steg 3 att Deployment branches ska stå på Selected med bara `main`. Lägg till en sond som kräver att en körning från en annan gren nekas av miljön.

## Mindre fynd och dokumentation ([VAKT])

- **SP-01 har en tröskel, inte ett mätvärde.** Testet kräver `>= 15` stämplade datum, men det avlästa antalet är **28**.
- **Stegtexten «N beslutsfil(er) från gröna verifierare» räknar också röda bens `[]`.** Skillnaden mellan «kom aldrig hit» och «körde, inget att stämpla» är utlovad i verify.mjs, men ingen konsument jämför antalet filer mot matrisen.
- **Stripe-påståendet är fel.** Commit-meddelandet säger «bara villkorsutkastet nämner Stripe» och `.cursorrules` säger «ingen Stripe-specifikation». Men `git grep -il stripe` ger 20 filer. Bland dem beskriver `agents/orchestrator/README.md` Stripe-fakturering av arvodet, `agents/LEGAL_GATES.md` beskriver ett flöde för kreditnotor, och kundsidan `src/pages/Integritet` listar «Stripe Payments Europe (planerad)». Att det saknas en Stripe-integration stämmer: det finns ingen klient i koden.
- **Sabotageantalen går inte ihop.** CLAUDE.md säger «26 sabotage». Commit-meddelandena summerar till 5 + 22 = 27. Det går inte att mäta härifrån.

## Avläst som sant

- Sviten: **2635 tester, 0 fel** (`node --test tests/run.mjs`).
- 147 arbetsflöden med 154 jobb, alltså 153 före `stampla`.
- 67 flöden pushar. 3 av dem är schemalagda, så 64 är manuella. 35 sväljer ett nej med `|| echo`.
- Kohortskriptet gav ENOENT på `…/--sni`, återskapat lokalt.
- Stacken i `.cursorrules` stämmer: react-scripts 5.0.1, styled-components, 0 `.ts`-filer, ingen Next.js.
- `fail-fast: false` gäller för matrisen.
- Pushsteget körs med `bash -e`, precis som Actions gör utan `shell:`.

## Obekräftat (från minne, inte mätt)

- Att `runner`-kontexten är giltig i stegens `env:`/`with:` (konfidens ~90 %).
- Att `download-artifact@v4` med ett `pattern` som inte träffar något går grönt (~80 %).
- Uppgifter som bara går att läsa i Actions-API:t: «18 körningar» och GH006 i körning 38090943472.
- Att rulesetets undantag gäller alla deploy keys. Runbooken säger det själv.

Stoppregeln: K1 ändrar en mening som kunden läser («verifierat <datum>» bredvid ett pris), alltså är fyndet [KUND].

dom: BLOCKERAR
