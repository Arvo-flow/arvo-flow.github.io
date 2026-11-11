# Byggarrutinen: så kör Opus självgående

> Grundarbeslut 2026-11-11: Fable 5.2 är strateg och arkitekt, Opus 5.5 är byggare och maskinist.
> Den här rutinen är skriven av arkitekten och är bindande på samma sätt som `CLAUDE.md`. Den säger
> hur byggaren driver ett steg från plan till driftsatt merge utan att stanna och vänta på ett
> godkännande. Körplanen står i `ops/KORPLAN-VAG1.md`.

## 1. Vem gör vad

- **Byggaren (Opus)** verkställer planen: skriver kod och tester, kör sviten och sabotagen, startar
  granskningslinser, öppnar och mergar PR:er genom Grinden och verifierar driftsättningen.
- **Arkitekten (Fable)** skriver planen, fattar strukturbeslut och äger regelverket. Arkitekten kallas in
  av grundaren. Byggaren kallar aldrig in någon och väntar aldrig på någon.
- **En lins** är en separat agent med ett enda uppdrag: «hitta var det gröna är osant». Rollen gör
  jobbet, inte modellen. Byggaren skriver aldrig en dom.
- **Står sessionen på Fable** bygger Fable inte själv. Den skickar ett byggpass i taget till en
  Opus-agent (`Agent`, `model: 'opus'`, i huvudklonen, i bakgrunden) med uppdraget «läs
  `ops/BYGGARRUTIN.md` och `ops/KORPLAN-VAG1.md`, kör från blocket Nu», och startar linserna på samma
  sätt. Står sessionen på Opus bygger Opus direkt, och linserna ärver modellen.

## 2. Start och återstart

En container kan bytas ut när som helst. Gör alltid detta först. Det tar två minuter.

```bash
git fetch origin main claude/fable-5-resume-i60dmd
git status --short                      # ska vara tom
git log --oneline -3
sed -n '/^## Nu/,/^## Målet/p' ops/KORPLAN-VAG1.md
ls node_modules >/dev/null 2>&1 || npm ci        # npm ci installerar också git-hookarna
git rev-parse --is-shallow-repository            # true → git fetch --unshallow origin
git worktree list                                # en kvarlämnad lins-worktree tas bort
```

Sedan:
1. Är arbetskatalogen inte tom: läs ändringen. Är den din egen och hel, committa och pusha. Är den
   halv, återställ den. En ospårad fil som du inte skapat committas aldrig.
2. Säger `Nu` att en lins eller en byggare är igång: läs av om den lever (`ListAgents`). En död lins
   är OGRANSKAD. Ta bort dess worktree och starta en ny.
3. Är grenens PR mergad: starta om grenen från main
   (`git checkout -B claude/fable-5-resume-i60dmd origin/main`). Bär grenen omergade commits behålls de.
4. Fortsätt med `Nästa handling` i `Nu`.

## 3. Körcykeln för en PR

Stegen görs i ordning. Inget hoppas över för att det är bråttom.

1. **Läs ordern** för steget i körplanen. Besluten står där. Säger koden emot ordern: mät, skriv
   mätningen, följ koden.
2. **Instrumentet först.** Skriv testet som visar felet, över hela grannskapet och inte bara fallet som
   avslöjade det: räkna upp tillståndets dimensioner och pröva matrisen. Testet ska vara rött före
   lagningen. Committa och pusha det rött.
3. **Laga bara påståendet.** En PR bär ett påstående. Allt annat du ser loggas i
   `ops/ARBETSORDER-VAG1.md` och byggs i en egen PR. Riktmärke: högst fem mekanikfiler.
4. **Sviten.** Medan du bygger: `node --test tests/<fil>.mjs`. Före commit: `CI=true node --test tests/run.mjs`.
   Räkna `# fail` och `# cancelled` tillsammans.
5. **Sabotagen.** Varje sabotage i ordern körs så här, och efteråt kontrolleras att beteendet ändrades:
   ```python
   s = open(f).read(); assert s.count(old) == 1; open(f, 'w').write(s.replace(old, new))
   try:    # kör hela sviten, räkna fail + cancelled
   finally: open(f, 'w').write(s)
   ```
   Ett sabotage som fäller noll betyder att ett test saknas. Skriv testet.
6. **Följ ändringen genom alla ytor** (regel 5): fakturavyn, analysmejlet, aktiveringsmejlet,
   svarsmejlet, rummet, briefingen, prospektet och dörren. Sök meningen, inte funktionen.
7. **Rendering** när en yta ändras: `npm run build`, renderingssonden i 390 och 1600 px med motprov,
   och titta på bilderna. Ta bort `build/` och `results/` efteråt.
8. **Vakterna mot grenens intervall:**
   ```bash
   B=$(git rev-parse origin/main)
   for v in price-audit claims-audit sifferrevisor hemlighetsvakt bedomningskrav pastaendevakt prissattningsgrad scopvakt; do
     CI=true ARVO_DIFF_BAS=$B node scripts/$v.mjs >/dev/null 2>&1 || echo "RÖD: $v"
   done
   CI=true ARVO_DIFF_BAS=$B node scripts/commitkrav-intervall.mjs
   ```
9. **Commit och push, direkt.** En commit som rör `lib/`, `api/` eller `agents/` bär «Syskonfall:» och
   «Sabotage som fällde: … → N tester föll» på en rad. Meddelandet slutar med de attributionsrader
   sessionen anger. En pushad commit skrivs aldrig om.
10. **Kontrollpunkt.** Skriv om `Nu` i körplanen, committa och pusha. Det görs före linsen, aldrig under.
11. **En lins** (avsnitt 4). Medan den rullar ändras ingen spårad fil. Läsning, mätning och rendering
    till scratchpad är tillåtet. Finns inget sådant arbete: sätt säkerhetsnätet och avsluta turen.
12. **Domen.** Hämta den (`git pull --ff-only`), ta bort linsens worktree och avboka säkerhetsnätet.
    - `MERGAS`: öppna PR:en, slå på auto-merge och prenumerera på PR:ens händelser. Ett rött lagas med
      en ny commit.
    - `BLOCKERAR`: klassa varje fynd enligt stoppregeln. Laga bara det som PR:en infört, gjort vanligare
      eller som syns i det PR:en ändrar. Börja om från punkt 2 med fyndet som nytt fall i instrumentet.
13. **Efter merge.** Läs av driftsättningen på Vercel för mergecommiten. Kör ordens live-prov med
    motprov. Starta om grenen från main. Skriv `Nu` och gå till nästa steg i planen, i samma tur.

## 4. Linsen

En lins åt gången. Den startas med `Agent` (`subagent_type: 'general-purpose'`,
`isolation: 'worktree'`, `run_in_background: true`) och får den här ordern, ifylld:

> Du är andra blicken på commit `<sha>` på grenen `<gren>`. Ditt enda uppdrag är att hitta var det
> gröna är osant. Du bygger ingenting och lagar ingenting.
>
> **Påståendet som prövas:** `<PR:ens enda påstående, ordagrant ur körplanen>`
> **Byggarens bevis:** `<test-ID:n, sabotagen med antal fällda, renderingssonden>`
> **Angrip:** `<ordens rad om vad linsen ska leta efter>`
>
> Regler:
> 1. Läs `CLAUDE.md` (Bevisplikten, stoppregeln, Noll-inferens) och ordern för steget i
>    `ops/KORPLAN-VAG1.md`.
> 2. Varje fynd återskapas med ett kört kommando. Ett fynd utan körning räknas inte. Kör egna
>    sabotage, med `assert s.count(old) == 1`, och återställ varje fil.
> 3. Klassa varje fynd [KUND] eller [VAKT], och som infört, vanligare eller förexisterande.
>    [KUND] som PR:en infört eller gjort vanligare blockerar. Vid tvekan: [KUND].
> 4. Skriv domen till `ops/GRANSKNING-<namn>.md`, med första iakttagelsen direkt och ett tillägg efter
>    varje fynd. Filen börjar med raderna `commits: <sha>` och `dom: MERGAS` eller `dom: BLOCKERAR`.
> 5. Använd bara de verktyg uppdraget kräver. Inga webbsökningar.
> 6. När domen är klar: `git checkout -- .`, sedan `git add ops/GRANSKNING-<namn>.md`. Kontrollera att
>    `git diff --cached --name-only` visar exakt den filen. Committa och kör
>    `git push origin HEAD:<gren>`. Går pushen inte igenom: kopiera filen till `<scratchpad>` och skriv
>    hela domen i ditt slutsvar.
> 7. Slutsvaret är högst tjugo rader: domen, fynden med klass, och commitens sha.

Regler för den som startar linsen:
- **Linsen pushar sin egen dom, som enda fil.** Domen överlever då att containern byts. Den sjätte domen
  på c1 förlorades när den låg ocommittad. Ändrar linsens commit något annat än domfilen blir Grindens
  fjärde kontroll röd, och det är rätt.
- **Säkerhetsnätet:** `send_later` på 75 minuter när linsen startas, avbokat med `delete_trigger` när
  domen kommit. En lins som inte rört sig på en timme läses av, stoppas och startas om.
- **En död lins är OGRANSKAD.** Dess anteckningar är en prövlista. Dess worktree tas bort och används
  aldrig igen, eftersom ett sabotage kan ligga kvar i den.
- **Saknar linsens worktree beroenden:** länka huvudklonens `node_modules` dit.

## 5. Persistens

- Varje commit pushas direkt. Inget arbete ligger på en lokal gren. Det som låg lokalt 5–9 nov
  förlorades: c2, utkastet till K-5, tre lagningar och granskarnas sonder.
- Scratchpaden försvinner med containern. Det som behövs senare ligger i repot.
- Blocket `Nu` i körplanen är minnet mellan sessioner. Det bär steget, senaste mekanikcommit, om en lins
  eller byggare är igång och nästa handling. Det skrivs om vid varje kontrollpunkt: efter ett pushat
  instrument, efter en pushad lagning, före en lins, efter en dom och efter en merge.

## 6. Beslut i stället för frågor

Byggaren frågar aldrig. `AskUserQuestion` används inte.

| Läget | Handlingen |
|---|---|
| Ett vägval som ordern inte avgör | Mät fakta. Välj det som ger kunden mest produktsanning. Skriv beslutet och skälet i commiten. |
| Ordern säger emot koden | Koden är avläsningen. Skriv mätningen i commiten och i planen. |
| Något kräver grundaren (hemlighet, repoinställning, leverantörskonto) | Skriv det under «Grundarens åtgärder» i planen. Fortsätt med det som inte beror på det. |
| Ett strukturbeslut som planen saknar | Skriv det under «Till arkitekten», med mätningen. Ta den minsta sanna lösningen, eller nästa steg. |
| Linsen blockerar | Stoppregeln. Bara blockerarna lagas, och resten loggas. |
| Tredje blockeringen på samma form | Planens reservväg. Finns ingen: den minsta sanna lösningen, och den större loggas som egen PR. |
| Linsen dör eller hänger | Ogranskad. Ta bort worktreen och starta en ny lins. |
| En kontroll i Grinden är röd | Läs loggen och laga med en ny commit. Aldrig en vidgad tolerans eller en borttagen check. |
| Ett nattligt jobb på main är rött | Klassa det enligt `ops/AGENTSVEP.md` steg 2. Laga det bara om det står i vägen för planen. |
| Ett förexisterande fel som PR:en inte rör | Logga det i `ops/ARBETSORDER-VAG1.md`. Egen PR. |
| En regel i bibeln är mätbart falsk | Rätta den i samma commit som mätningen. En omstrukturering går till arkitekten. |
| `npm run deploy` | Körs inte från sessionen, som bara får pusha sin gren. Vercel driftsätter main vid merge. gh-pages-kopian läses av i S8. |
| Kontots gräns nås | Arbetet är redan pushat. Nästa session börjar i avsnitt 2. |

Tre gränser står kvar oavsett mandat: `scripts/stress-test.mjs` körs aldrig utan uttryckligt OK, en
hemlighet skrivs aldrig ut, och en personlig adress står bara som `sha256:<hex>`.

## 7. När turen får sluta

Bara i tre lägen:
1. En lins eller ett bakgrundsjobb rullar, och det finns inget att göra utan att ändra en spårad fil.
   Säkerhetsnätet är satt. Sessionen väcks när jobbet är klart.
2. Våg 1-grinden (S9) är grön.
3. Kontots gräns är nådd.

«Väntar på grundaren» och «väntar på arkitekten» är aldrig ett läge. Medan Grindens kontroller kör på
en öppen PR förbereds nästa steg genom läsning och mätning.

## 8. Ekonomin

- En uppgift och en lins i taget. Sessionsgränsen delas mellan byggare och lins.
- Inga arbetsflöden med flera agenter och inga vågor. En sökning över många filer går till
  `Explore`-agenten. En lins körs aldrig på en billigare modell än byggaren.
- Kör en testfil medan du bygger, och hela sviten före commit och i sabotagen. Hela sviten tog 38
  sekunder den 11 nov (2 738 tester), så den är aldrig ett skäl att hoppa över ett sabotage.
- Läs domfilen, inte linsens hela transkript. Slutsvaret från en lins är högst tjugo rader.
- En PR som växer förbi sitt påstående kostar ett granskningsvarv till. c1 växte till 32 filer och tog
  sex varv.

## 9. Rapporten

Efter varje merge, och när turen slutar: första meningen säger vad som hände. Sedan vad som är mergat
och avläst som driftsatt, vad som står kvar, och grundarens åtgärder om det finns nya. Varje påstående
om systemets tillstånd skrivs som avläst (med kommandot), som obekräftad bedömning eller som «jag vet
inte än».
