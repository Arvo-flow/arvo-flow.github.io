# Agentsvep — så körs de så att arbetet aldrig går förlorat

> Grundarbeslut 2026-08-24, ej förhandlingsbart: **arbetet från samtliga agenter måste sparas
> även när vi når spärren.** Det här dokumentet är hur det uppnås, och varför den uppenbara
> lösningen inte räckte.

## Vad som gick fel, mätt

Tre obduktionssvep dog. Utfallet, ur `scripts/skorda-agentarbete.mjs`:

| körning | agenter | bar arbete | dödsrunor |
|---|---|---|---|
| `wf_fd898f25` | 35 | 3 | 32 |
| `wf_3484bcdd` | 41 | 3 | 38 |
| `wf_98dd0826` | 18 | 9 | 9 |

Två skilda dödsorsaker, och de kräver rakt motsatta åtgärder:

1. **Sessionsspärren** (79 fall). Agenten dör — ofta innan den hunnit göra något alls.
2. **Trasigt verktygslager** (6 fall i körning tre). Permission-handlern strippade varje
   obligatorisk parameter, så `Read`, `Bash`, `Grep`, `Write` och `StructuredOutput` avvisades
   före verktyget. Agenten *levde* men kunde varken arbeta eller skriva. Den skrev i stället en
   lång, korrekt felanalys — det var så buggen upptäcktes.

## Varför "skriv till disk innan du returnerar" inte räckte

Den instruktionen var min första åtgärd, och den var otillräcklig **på premissen**:

- En skrivning som ligger **sist** skyddar bara mot en död *efter* att allt arbete är klart.
  Spärren slår mitt i. Körning tre brände 869 650 tokens och 118 verktygsanrop — noll nådde disk.
- En agent med trasigt verktygslager **kan inte lyda instruktionen**. Write avvisades två gånger.

**Agenten får därför aldrig vara ansvarig för sin egen persistens.**

## Lösningen, tre lager

### 1. Skörden (bär hela kravet)

Harnesset skriver agentens transkript rad för rad *medan* den arbetar, oavsett hur den sedan dör.
Det är den enda artefakt som finns i **båda** felfallen.

```bash
npm run skorda              # alla körningar
npm run skorda -- wf_abc123 # en
```

Räddar per agent: uppdraget, varje formulerad slutsats, och varje kört kommando **med utfall** —
de körbara bevisen. Skriver `ops/obduktion/skord-<körning>-<område>.md`, märkt **OPRÖVAD**.

Kör skörden **efter varje svep**, även när svepet såg lyckat ut. Maskinlås: `tests/skordkontrakt.mjs`
(SKÖ-01..05) — en dödsruna får aldrig räknas som arbete, och en skörd som räddade noll larmar med
exit-kod i stället för att tiga.

### 2. Kanariefågeln (undviker dödsrunorna)

En dödsruna är arbete som **aldrig blev av** — skörden kan inte rädda det. Att lansera 18 agenter
mot en förbrukad kvot ger 18 gravstenar.

**Starta därför alltid ETT enda agentuppdrag först.** Går det igenom, fan:a ut. Faller det på
spärren är svaret att vänta, inte att elda upp flottan.

### 3. Inkrementell skrivning (bältet, utöver hängslena)

Agentprompten ska säga: skriv rapportfilen med **första** iakttagelsen och **lägg till efter varje
hypotes** — aldrig i ett svep på slutet. En agent som dör efter hypotes tre lämnar då tre på disk.
Det här är ett komplement till skörden, aldrig en ersättning: en agent som inte kan skriva kan
inte heller lyda det här.

## Rutinen

```
1. npm run test:algo                    # grönt före svep
2. ett kanarieuppdrag                   # lever kvoten?
3. svep i vågor om ~6, inte 18 på en gång
4. npm run skorda                       # ALLTID, även vid till synes lyckat svep
5. motpröva varje hypotes med ett körbart bevis innan något fixas
```

Punkt 5 är oförhandlingsbar av samma skäl som resten av bibeln: skörden bevisar att arbetet
**utfördes**, aldrig att slutsatsen är **sann**.

---

## Fabrikssvep — den autonoma loopen (grundarbeslut 2026-10-16)

> **Utlösare:** grundaren skriver *«Kör ett fabrikssvep»*. Då körs steg 1–4 nedan i följd, utan
> att fråga mellan stegen. Svepet är klart när protokollets fyra steg är gjorda, vakterna är gröna
> och en PR ligger redo med Grindens fyra kontroller gröna. **Agenten mergar aldrig.** Grundaren
> klickar merge.

Svepet ärver allt ovan (kanariefågel, vågor, skörd) och allt i bibeln. Det ersätter ingen regel.
Varje påstående i svepets rapport skrivs i en av noll-inferensens tre former: avläst (med
kommandot och motprovet), obekräftad bedömning (med grund och konfidens) eller «jag vet inte än».

### Verktygen, utan att en hemlighet skrivs ut

```bash
export PATH="$PWD/.verktyg/node-v22.23.3-darwin-arm64/bin:$PWD/.verktyg/gh_2.81.0_macOS_arm64/bin:$PATH"
export GH_TOKEN="$(printf 'protocol=https\nhost=github.com\n\n' | git credential fill | sed -n 's/^password=//p')"
# … gh-kommandona …
unset GH_TOKEN
```

`.verktyg/` ligger i `.git/info/exclude`. Saknas katalogen: ladda ner node och gh igen och
kontrollera checksumman. Token, nycklar och miljövärden skrivs aldrig ut, inte heller i en logg.

### Steg 1 — Lägesbild och styrfiler

1. `git fetch --prune` · `git status` · `git log origin/main --oneline -25` · `gh pr list`.
2. **Ospårade filer läses som en risk.** En privat nyckel, en `.env` eller en dump i arbetskatalogen
   committas aldrig. Lägg namnet i `.git/info/exclude`, läs aldrig innehållet, och skriv i rapporten
   att filen ska flyttas ut. Kör aldrig `git add -A` eller `git add .` i ett svep.
3. Läs `CLAUDE.md`, `.cursorrules` och den gällande arbetsordern (`ops/ARBETSORDER-*.md`).
4. **Arbetsorderns status är ett påstående, koden är avläsningen.** Pröva varje punkt mot koden:
   finns modulen, står test-ID:t som testtitel i `tests/`, är sabotaget kört? Skriv utfallet i
   arbetsorderns statustabell (`## Läge`), med datum och kommando.

### Steg 2 — Självläkning av CI/CD

1. Senaste körningen per arbetsflöde på `main`: `gh run list --branch main --limit 60`. För varje
   röd körning: `gh run view <id> --log-failed`.
2. **Jämför minst tre körningar** innan orsaken namnges. Röd i varje körning = bestående fel.
   Röd i några = intermittent; redovisa frekvensen («3 av 5»), laga bara med bevis.
3. **Klassa varje rött jobb i exakt en klass.** Klassen avgör åtgärden:

   | klass | betyder | åtgärd |
   |---|---|---|
   | OLÄSBAR | vakten når inte talet (sidan har bytt form, adressen har flyttat) | laga vakten och pröva den mot den riktiga källan |
   | DRIFT | källan har ändrats (nytt pris, ny period, ny villkorsversion) | rätta boken med källans eget tal efter granskning: motprov, historik, riktning |
   | FELKLASS | loggen säger fel klass (en 404 kallad drift, en ny period kallad oläsbar) | laga etiketten, för en vakt tolkas efter sin logg |
   | INFRA | blockering, timeout eller runner-fel som inte går att återskapa | mät frekvensen, redovisa, laga inte på en gissning |
   | RÄTT RÖTT | rött av rätt skäl som kräver grundaren (nyckel, inställning, beslut) | skriv exakt vad grundaren ska göra |

4. **Förbjudna lagningar.** Det gröna får aldrig köpas med en vidgad tolerans, en borttagen check,
   ett kampanjpris som ankare, `continue-on-error`, `|| true`, en hoppad källa eller ett tal ur
   minnet. Kan ett rött bara bli grönt med en falsk siffra står det kvar rött och redovisas
   (motståndsplikten).
5. Verifiera lokalt med den riktiga löparen (`node scripts/verify.mjs <id>` för fabriken). Den lokala
   körningen stämplar `lastVerified` i prisboken. **Återställ stämplarna före commit.** Datum når
   `main` bara via stämpeljobbet och `stampelvakt.mjs`.
6. En lagning i `lib/`, `api/` eller `agents/` är mekanik: den bär syskonfall, sabotage och test-ID
   som allt annat.

### Steg 3 — Framåtdrift enligt arbetsordern

1. Ta nästa oavslutade punkt i statustabellen från steg 1 och bygg den fullt ut: syskonfall körda,
   varje sabotage skrivet med `assert old in s` och fällande, test-ID som testtitel, regel 8
   (skärmdump 390 och 1600 px) när en yta ändras.
2. Är nästa punkt ett grundarbeslut: skriv beslutet och alternativen i rapporten, och ta nästa
   tekniska punkt. Är ordern helt avslutad: markera den avslutad med bevis i tabellen, och ta den
   högst rankade punkten under «Känd skuld» i bibeln som inte väntar på ett grundarbeslut.
3. En DRIFT-lagning i prisboken eller villkorsboken är steg 2, inte steg 3. Den räknas inte som
   framåtdrift.

### Steg 4 — Vakter och andra blicken

1. Sviten under CI: `CI=true node --test tests/run.mjs`. Läs talet; skriv det inte in i en styrfil.
2. Vakterna mot grenens intervall, som i Grinden:
   ```bash
   B=$(git rev-parse origin/main)   # som Grindens pull_request.base.sha
   for v in price-audit claims-audit sifferrevisor hemlighetsvakt bedomningskrav pastaendevakt prissattningsgrad scopvakt; do
     CI=true ARVO_DIFF_BAS=$B node scripts/$v.mjs || echo "RÖD: $v"
   done
   CI=true ARVO_DIFF_BAS=$B node scripts/commitkrav-intervall.mjs
   CI=true ARVO_DIFF_BAS=$B node scripts/granskningsgrind.mjs   # röd före granskningen = motprovet
   ```
3. **GG-12 gäller svepet också.** Läggs en pre-commit-vakt till ska den in i `grinden.yml` och talet
   i GG-12 ändras. Sviten får aldrig ärva `ARVO_DIFF_BAS`. Basen är alltid `pull_request.base.sha`.
4. **Andra blicken är en annan session.** Byggaren skriver aldrig granskningsfilen. En separat
   agent får enda uppdraget *«hitta var det gröna är osant»*, kör sabotagen själv och skriver
   `ops/GRANSKNING-<namn>.md` med `commits: <sha>` och `dom: MERGAS|BLOCKERAR`. [KUND] blockerar,
   [VAKT] mergas och lagas framåt. En ändring i `lib/`, `api/` eller `agents/` efter den granskade
   commiten kräver en ny granskning av den nya commiten. Kör `npm run skorda` efteråt.
5. Pusha grenen, öppna PR:en och läs de fyra kontrollerna (Sviten, Vakterna, Commitkravet, Andra
   blicken). Ett rött lagas med en ny commit. En pushad commit skrivs aldrig om.

### När svepet stannar och frågar grundaren

Bara här: moms, pris, juridik eller publicering av villkor; radering av data; körning av
`scripts/stress-test.mjs`; nycklar, rulesets och repoinställningar; merge till `main`; och en
[KUND]-lagning som kräver ett produktbeslut. Allt annat avgörs ur koden, och beslutet motiveras i
rapporten.

### Rapporten

Första meningen säger vad som hände. Sedan, per steg: vad som lästes, vad som lagades, vad som
står kvar och i vilken klass. Sist PR-länken och grundarens åtgärder, om det finns några.
