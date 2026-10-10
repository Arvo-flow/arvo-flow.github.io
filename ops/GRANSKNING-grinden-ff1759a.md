# Granskning — grinden i CI

commits: ff1759a0
datum: 2026-10-10
dom: MERGAS

**Granskare:** andra blick enligt Bevisplikten p.1. Enda uppdrag: hitta var det gröna är osant.
**Byggare:** commit ff1759a0 (plus 81d305b8, e082822f på samma gren — lästa, ingen mekanik).
**Klassning:** alla fynd är **[VAKT]**. Inget tal, ingen mening och inget arvode som en kund läser ändras. Stoppregeln: mergas och lagas framåt.

---

## Baslinje, körd före varje sabotage

```
CI=true node --test tests/run.mjs
# tests 2623  ·  # pass 2623  ·  # fail 0  ·  12,0 s
```

Motprov mot instrumentet: `tests/granskningsgrind.mjs` + `tests/hemlighetsvakt.mjs` ensamma gav `# tests 14 · # pass 14` (GG-01..12 + HV-01..02). Samma svit blev röd under S1 och S2 (nedan) — den kan alltså svara det motsatta.

Trädet återställt efter varje sabotage. `md5` på de tre filerna identisk med före, `git diff` tom, `git status --porcelain` tom.

Även kört mot **detta PR-intervall** (`ARVO_DIFF_BAS=$(git merge-base main HEAD)` = `bb181878`):

| kontroll | utfall |
|---|---|
| pastaendevakt | grön, 795 tillagda rader, `bb18187...HEAD` |
| hemlighetsvakt | grön, 14 ändrade filer |
| commitkrav-intervall | grön, 3 commits prövade, 1 med lib/api/agents |
| andra blicken *utan* denna fil | röd: «2 mekanikfil(er) utan granskning» |

Det sista är motprovet att de åtta gamla `ops/GRANSKNING-*.md` på main **inte** läcker in. `commits: cd39552..91e22ac` i karantänfilen parsas inte som sha (`SHA_TOKEN` kräver `^[0-9a-f]{7,40}$`). Övriga namnger sha:er som inte är prefix till ff1759a0 / 81d305b8 / e082822f.

81d305b8 (`ops/UTKAST-VILLKOR-v2.md`) och e082822f (`.cursorrules`) ändrar ingen fil under `lib/ api/ agents/`. `/villkor` renderar fortfarande «Version 1.2» (`src/pages/Villkor/index.js`). Utkastet är inte en kundyta.

`git diff --name-only ff1759a0 HEAD` = `.cursorrules` + `ops/UTKAST-VILLKOR-v2.md`. Ingen mekanik efter den granskade commiten.

---

## Fynd

### 1 · [VAKT] GG-12 låser inte basen — `base.sha` → `head.sha` lämnar hela sviten grön

**Avläst.** GG-12 kräver att strängen `pull_request.head.sha` finns (för utcheckningen) och att `ARVO_DIFF_BAS:` förekommer tre gånger. Den kräver **inte** `pull_request.base.sha`.

Sabotage S3 (assert old `github.event.pull_request.base.sha` in s, tre byten mot `head.sha`): **12/12 gröna, 0 fällda.**

Följden i CI: `git diff head...HEAD` är tom. Hemlighetsvakten skriver då «0 ändrade fil(er) rena», påståendevakten läser noll rader, andra blicken ser noll mekanikfiler och svarar «PR:en ändrar ingen fil i lib/, api/ eller agents/». Ett grönt som betyder «jag tittade inte» — samma sjukdom grinden byggdes mot, nu i uttrycket som väljer *vad* som läses. Vakten deklarerar själv att den är blind för fel bas (`lib/diffintervall.js`); GG-12 påstår sig vakta just den raden och gör det inte.

**Lagning:** GG-12 ska kräva `pull_request.base.sha` *på ARVO_DIFF_BAS-raderna* (inte var som helst). Motprov: samma S3 måste fälla. Ett `includes('head.sha')` är fel ankare — den strängen ska stå i `HEAD_SHA`.

### 2 · [VAKT] GG-12 matchar en kommenterad rad

**Avläst.** `wf.includes('node scripts/hemlighetsvakt.mjs')` är sant för `# - run: node scripts/hemlighetsvakt.mjs`.

Sabotage S4 (assert old `- run: node scripts/hemlighetsvakt.mjs` in s): **GG-12 grön, 0 fällda.**

Samma form: `run: echo node scripts/hemlighetsvakt.mjs` hade också passerat. Källtextvakten ser en sträng, inte ett steg.

**Lagning:** läs `run:`-stegen, inte substrängar. Motprov: S4 måste fälla. `echo node …` måste fälla.

### 3 · [VAKT] `scripts/` och `.github/` efter domen släpps — skalen ÄR grinden

**Avläst.** `KRAVDA_KATALOGER = /^(lib|api|agents)\//`. `andraBlicken` med granskning av commit B och `andratSedan = [scripts/granskningsgrind.mjs, .github/workflows/grinden.yml, tests/granskningsgrind.mjs]` gav `{ ok: true }`. Samma anrop med `lib/x.js` efter domen gav `{ ok: false }` (instrumentet skiljer de två).

GG-06:s motprov släpper medvetet `tests/` och `ops/` efter domen (stoppregeln: [VAKT] lagas framåt). Det är rätt för tester. Det är fel för **skalen och workflowen** — det är där kontrollen bor. En later commit som sätter `process.exit(0)` i `scripts/granskningsgrind.mjs` eller tömmer jobben i `grinden.yml` (och mjukar GG-12, som sitter i `tests/`) är netto noll mekanik. Andra blicken släpper. CI kör den urholkade koden, för checkout är PR:ens HEAD.

Ett skydd bakom ett annat skydd är inte två lager. GG-12 och andra blicken läser samma träd som den som ändrar dem.

**Lagning:** räkna `.github/workflows/grinden.yml` plus `scripts/{granskningsgrind,commitkrav-intervall,hemlighetsvakt,pastaendevakt,commitkrav}.mjs` som grindmekanik — en egen lista, inte en vidgning av `KRAVDA_KATALOGER` till hela `scripts/` (det vore den breda vakt som stängs av). Tester och ops efter domen släpps kvar. Motprov: samma anrop som ovan måste bli `ok: false`.

### 4 · [VAKT] En PR kan stänga av kontrollen i samma PR

**Avläst ur GitHubs dokumentation** (workflowfilen för `pull_request` är den i PR:ens merge mot basen), **inte** live mot origin: jag fick 401 på `branches/main/protection` utan token, och `gh` finns inte i PATH.

En PR som behåller jobbnamnen `Sviten` / `Vakterna` / `Commitkravet` / `Andra blicken` men byter stegen mot `echo ok` ger gröna required checks *om* grenskyddet ens kräver namnen. **Jag vet inte än** om grenskyddet är satt — det är en repoinställning, inte kod, vilket modulhuvudet redan skriver som BLIND.

S3 + S4 är den mätbara halvan: den enda maskinen som påstår sig vakta workflowen (GG-12) fäller inte de två urholkningarna.

**Lagning:** CODEOWNERS + required review på `.github/workflows/grinden.yml`. Det är det enda som binder en annan person. Att köra grinden från main via `pull_request_target` vore fel riktning (okänd kod med skrivrätt). En jämförelse «PR:ens grinden.yml ≠ origin/main» som *varning* kan stå, men den får inte vara det enda lagret.

### 5 · [VAKT] commitkravet hoppar över merge-commits

**Avläst.** `scripts/commitkrav-intervall.mjs` kör `rev-list --no-merges` och sedan `git show --format= <sha> -- lib api agents`. En konfliktlösning som bara lever i merge-commiten når aldrig `granskaCommit`. Andra blicken ser nettodiffen (`bas...HEAD`) och är backstoppen — två grenar där den inre kan vara död bakom den yttre.

**Lagning:** antingen pröva merge-commits när `git show -m` bär mekanik, eller skriv ut BLIND i skalet (inte bara «merge-meddelanden skrivs av git»). Inget av det ändrar ett kundtal.

### 6 · [VAKT] Kommentaren i `lib/commitkrav.js` ljuger om `agents/`

**Avläst.** Rad 27–28: «Den ser heller bara lib/ och api/: agents/ och src/ står utanför med flit.» Rad 42 och `commitkrav.mjs` inkluderar `agents/` (CK-06, GG-10). En kommentar som intygar en invariant koden inte håller.

**Lagning:** stryk meningen. Koden är rätt.

---

## Prövade frågor som *inte* var hål

**`git show --format= <sha> -- lib api agents` ger rätt diff för `granskaCommit`.** Avläst på ff1759a0: identisk med `git diff ff1759a0^ ff1759a0 -- lib api agents` (`diff -q` → IDENTISK), två `+++ b/`-huvuden (`lib/diffintervall.js`, `lib/granskningsgrind.js`), `arBeteendeandring` true, `granskaCommit` ok. 81d305b8 och e082822f ger 0 byte. `diff.noprefix` är unset. GG-10 hade varit grön-på-fel-grund om show inte producerat en parsebar diff — den fäller en agents-commit utan rubriker.

**Nollbas på push till main.** `kravBas('0'*40)` kastar (GG-07). De tre intervalljobben blir röda, inte gröna. Sviten ärver inte basen (GG-12 mäter det, och jobbet `svit:` saknar `ARVO_DIFF_BAS`). En vanlig merge har `github.event.before` = gamla maintoppen — då finns ett intervall. **Obekräftad bedömning, låg konfidens:** första pushen som skapar `main` blir röd i efterhand; det kan inte stoppa en direktpush (kommentaren i workflowen säger det).

**`jobs.*.env` och `pull_request.head.sha`.** Uttrycken är `(event == pull_request && <sha>) || fallback`. Checkout använder `env.HEAD_SHA` = head, inte GitHubs syntetiska merge-commit. `ARVO_DIFF_BAS` = `base.sha` på PR, `github.event.before` på push. **Jag vet inte än** om `${{ env.HEAD_SHA }}` i `actions/checkout` `with.ref` interpoleras i skarp Actions — `env` i `steps.with` är dokumenterat tillåtet, men jag har inte sett en körning.

**Gamla GRANSKNING-filer på main** återanvänds inte. Mätt ovan: andra blicken röd på denna PR innan denna fil fanns. Kort-sha-kollision mot ff1759a0 / 81d305b8 / e082822f: ingen.

**Övriga sex pre-commit-vakter är inte gröna av tomhet.** `price-audit`, `claims-audit`, `sifferrevisor`, `bedomningskrav`, `prissattningsgrad`, `scopvakt` läser trädet (`readdir`/`walk`), inte `git diff --cached`. Bara hemlighetsvakt och påståendevakt läste `--cached`; de går via `diffIntervall` och kastar utan bas i CI. S1 bevisar att den tanden sitter.

**En granskning av en tidig commit släpper inte senare *lib/api/agents*.** GG-06 / GG-09 / S2. Den släpper senare *skal och workflow* — det är fynd 3, inte denna fråga.

**Workflows med `pull_request`-trigger:** 1 av de listade yml-filerna (`grinden.yml`). Byggarens «0 av 146» var main före denna commit.

---

## Sabotage (assert old in s, återställda, hash identisk)

| # | vad | old in s | fällda |
|---|---|---|---|
| S1 | CI-kastet i `diffIntervall` bort — reserven `--cached` alltid | `if (env.CI === 'true') throw new Error('ARVO_DIFF_BAS saknas i CI — …')` | **2** (GG-07, GG-11). 10/12 kvar |
| S2 | `ogranskade = []` i stället för `mekanik.filter(sedan.has)` | `const ogranskade = mekanik.filter((f) => sedan.has(f));` | **2** (GG-06, GG-09). 10/12 kvar |
| S3 | `ARVO_DIFF_BAS`: `base.sha` → `head.sha` (tre rader) | `github.event.pull_request.base.sha` × 3 | **0** — föreslaget sabotage som inte fäller |
| S4 | `# - run: node scripts/hemlighetsvakt.mjs` | `- run: node scripts/hemlighetsvakt.mjs` | **0** — samma familj som S3 |

S1 och S2 är tänder. S3 och S4 är det gröna som är osant.

---

## Dom

**MERGAS.** Stoppregeln: *ändras ett tal eller en mening som en kund läser?* Nej. Grinden är en vakt. Att den är svagare än den påstår (GG-12 grön på fel bas, skalen utanför andra blicken, ett lager som ser ut som två) ändrar ingen kundsiffra. Byggarens 2 623 gröna är ett sant tal på sviten; det osanna sitter i *vad GG-12 påstår att det talet betyder*.

Lagas framåt, i den ordningen:

1. GG-12 låser `base.sha` på ARVO_DIFF_BAS-raderna + parse:ar `run:`-steg (fynd 1–2). S3 och S4 måste fälla.
2. Andra blicken räknar grindens egna skal + `grinden.yml` som mekanik (fynd 3).
3. CODEOWNERS / required review på workflowen (fynd 4) — det enda som inte sitter i samma träd som angriparen.
4. Kommentaren om `agents/` (fynd 6) i samma svep.

81d305b8 och e082822f behöver ingen egen granskning: ingen mekanik, utkastet når inte `/villkor`.
