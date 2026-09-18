# Granskningsdom · `lib/kanariedom.js` (9e1e929)

**Uppdrag:** hitta var det gröna är osant.
**Datum:** 2026-09-18
**Andra blicken:** grundaren, som för `5db58aa` och `acea9cd`. Han fick fyndet, mätningen, de nio
sabotagen och det öppna beslutet framlagda i klartext och svarade «Kör!».
**Dom:** **MERGAS.** Klassning enligt stoppregeln: **[VAKT]** — ingen kundsynlig siffra, ingen
kundsynlig mening, ingen arvodesrad ändras. Ren driftövervakning.

---

## Vad som granskades

`lib/kanariedom.js` (ny), `scripts/kanariedom.mjs` (ny), `.github/workflows/canary.yml` (omskriven),
`tests/kanariedom.mjs` (KD-01..21).

## Fynd i granskningsvändan

Vändan gav ett verkligt fynd i mitt eget arbete, och det är skälet att den var värd minuterna:

> **KD-21 · en körning mot en ANNAN url kunde stänga ett äkta produktionslarm.**
> Det nya återställningssteget stänger öppna `production-down`-ärenden när svaret är friskt. Domen
> vet bara att *något* svarade friskt — inte *vad*. En manuell `workflow_dispatch` mot en staging-url
> eller en lokal tunnel hade därför avfärdat ett larm om produktionen. **Ett larm om A får aldrig
> avfärdas av en mätning av B.** Stängt med `github.event.inputs.url == ''` i stegets villkor,
> testlåst i KD-21, sabotage-bevisat (S9).

## Vad som INTE fälldes, och varför det är skrivet

- **`Number([200])` ger 200**, alltså skulle en array kunna passera som HTTP-status. Friad med
  redovisat skäl: den enda anroparen är `scripts/kanariedom.mjs`, som läser `process.argv` och
  därför alltid lämnar en sträng. Ett fel här kan inte nås från produktionsvägen. *Att fria ett
  grannfall är också ett resultat — men bara när friandet är skrivet.*
- **Fältet `missing` från svaret renderas i ärendets markdown.** Det är nätdata i en yta, men den
  når github-script via `env:` och konkateneras som text, aldrig som kod. Den som kan styra
  `/api/health`:s svar äger redan endpointen. Ingen åtgärd.
- **`Kanariefågeln dog`-steget skapar inget ärende**, bara `core.setFailed`. Medvetet: dör
  GitHub-API:t är det just API-anropet som inte går att lita på. Ett rött workflow-run är
  notifieringen. Uttalad gräns, inte en lucka.

## Uttalad blindfläck

`kanariedom` ser bara vad **curl rapporterade**. Den vet ingenting om en cachad 200 från ett CDN
framför en död origin, om DNS-kapning, eller om ett svar som är välformat och osant. Den prövar att
vi frågade och läste rätt — **aldrig att svaret är sant**. KD-14..21 är dessutom källtextvakter: de
läser TEXT och kan därför aldrig bevisa att workflowen KÖR rätt, bara att den är monterad rätt.

Två av dem var först gröna på fel grund — KD-15 och KD-18 matchade sin **egen kommentartext**, så
`set +e` och `if: failure()` kunde tas bort utan att ett test föll. Bibelns 11 september-fynd
ordagrant, återinfört i filen som beskriver det. Källvakterna strippar nu kommentarer; **KD-20 är
motprovet** som gör strippningen synlig för nästa läsare.

## Sabotage

Nio riktningar, alla föll (harness körde `assert old in s` → applicera → kör sviten → återställ):

| # | Sabotage | Fällda |
|---|---|---|
| S1 | den gröna grenen dödas igen (`ok` kan aldrig bli sant) | 6 |
| S2 | `set +e` tas bort → down-grenen onåbar under `bash -e` | 1 |
| S3 | `curlExit` får ett defaultvärde | 1 |
| S4 | «kunde inte tolka» slås ihop med «servern sa nej» | 3 |
| S5 | återställningssteget tas bort | 1 |
| S6 | kroppen interpoleras tillbaka in i skriptkroppen | 1 |
| S7 | `if: failure()` tas bort | 1 |
| S8 | fast avgränsare i `$GITHUB_OUTPUT` i stället för UUID | 1 |
| S9 | url-villkoret i återställningen tas bort | 1 |

## Verifiering av den riktiga maskinen

Hela bash-steget kört under `bash -e` (som GitHub kör `run:`) mot en lokal server med
produktionens **verkliga** svarskropp, hämtad ur kommentar #5666367849 på ärende #79:

- Fall A, frisk → `status=ok`, `larmar=false`, stegets exit 0.
- Fall B, död värd → `status=down`, `larmar=true`, stegets exit 0.

Båda är de grenar som var döda. Svit **2437/2437**.

## Kvarstående efter merge

Bevisningen är komplett för mekaniken men inte för **rundturen**: att kanariefågeln verkligen stänger
ärende #79 mot den skarpa GitHub-API:t är bevisat först när körningen gjorts på `main`. Den körs
direkt efter merge, och utfallet ska läsas — inte antas.
