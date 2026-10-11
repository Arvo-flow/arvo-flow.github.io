<!-- Tredje blicken på lagningen 5dd15a84 (2026-10-11). Fynden är [VAKT] och lagas framåt enligt stoppregeln. -->

commits: 5dd15a84
dom: MERGAS

# Tredje blicken: botnyckeln (5dd15a84)

Mätt i en egen worktree vid 5dd15a84 (`git status` var ren efter varje körning).

## K1 håller (inga [KUND]-fynd)
- `node --test tests/run.mjs`: **2640/2640 gröna**.
- Sabotage S1, där avtryckskontrollen stängdes av (`if (false)`), fällde SP-07 och SP-08.
- Avtrycket över verklig historik (60 commits på `branchindex.js`): **56 av 56** botstämplar lämnade avtrycket oförändrat, och **3 av 3** mänskliga ändringar flyttade det (motprovet). Inget tyder på att stämpeln hoppas över i onödan. Ingen mänsklig commit landade i ett körfönster på måndagen.
- Matrisen och verifieraren läser samma fil i samma process. `branchindex.js` har inga importer, och verifierarnas förväntade värden kommer ur `BRANCHINDEX`. 31 av 31 träffar på avtrycksmönstret är rena datum.
- Stämpla-jobbet utan `npm ci`: `node scripts/stampla.mjs <tom katalog>` i ett träd utan node_modules gav `0 beslut`, exit 0. Motprov: `import('playwright')` i samma träd gav `ERR_MODULE_NOT_FOUND`. Node 20 bekräftas av historiken: m365-jobbet (needsBrowser:false, ingen `npm ci`) stämplade d8762e48 den 5 oktober.
- Påståendena stämmer: Stripe står i 20 filer (`git grep -il stripe`, både vid 5dd15a84 och föräldern). Paket eller anrop finns inte. S2, S3, S4 och S8 (fönster, filnamn, V1-hunkvakten, deklarerade nycklar) fällde vardera minst ett test. H1 och H2 (citerat jobb-id, `secrets['X']`) fällde HB-03.

## [VAKT] V1: pushsteget går grönt när varken push eller fetch når main
`.github/workflows/verify-sources.yml:174`: `git fetch -q origin main && git reset -q --hard origin/main`. När fetch fallerar avbryter `&&` utan att errexit slår till, så reset hoppas över. Nästa varv ser den redan committade stämpeln. `git diff --quiet` (rad 162) jämför arbetsträdet med index och inte med origin, så `return 1` ger «inga datum att flytta» och exit 0.
- Mätt: pushsteget extraherades som i SP-07 och fjärren flyttades bort efter klonen. Resultat: `✓ stampelvakt: 2 …`, `push 1 nekad`, `fatal: … not a git repository`, `stampla: 1 beslut, 0 datum flyttade`, `inga datum att flytta`, **EXIT=0**, fjärrens main orörd.
- Motprov med nåbar fjärr: EXIT=0 och `HEAD -> main`.
- Koden fanns redan i förra varvet, men SP-07 lovar «ett nej blir rött».
- **Fix:** lägg `git fetch -q origin main` och `git reset -q --hard origin/main` på var sin rad, så att errexit fäller. Lägg till ett scenario med oåtkomlig fjärr i SP-07.

## [VAKT] V2: avtryckets producent är oprövad, och felet gömmer sig i ett grönt jobb med varning
Sabotage i `scripts/verify.mjs:99`, där varje fall fällde **0 av 16** SP/HB-tester:
- S5: fel värde.
- S6: fältet saknas.
- S7: rå sha256 med datumen kvar.

Beteendet ändras: `tillampaStamplar` gav med rätt producent `andrade 5, hoppade 0` och med S7-producenten `andrade 0, hoppade 1`. En sådan regression gör att varje vecka hoppas över med `::warning` i ett grönt jobb. Datumen slutar då röra sig, och det enda larmet blir prisauditens varning efter 60 dagar. Det är formen «ett grönt som betyder jag tittade inte».
- **Fix:** räkna avtrycket på `${{ github.sha }}:agents/recommender/branchindex.js` i stampla-jobbet.
  - Beslutets avtryck skiljer sig från det på github.sha: instrumentfel, alltså rött.
  - Avtrycket är lika med github.sha men skiljer sig från main: en äkta prisändring under körningen, alltså varning.
- Bryt också ut beslutskonstruktionen till en ren funktion och testa den.

## [VAKT] V3 (obekräftad, ~70 %): filnamnet binder inte beslutet till jobbet
`stampla.mjs:31-32` lovar att ett komprometterat matrisjobb «inte längre [kan] nå andra källors nycklar». Det stämmer inte:
- Med `merge-multiple: true` (verify-sources.yml:120) kan varje artefakt bära en fil som heter `stampel-m365.json`, och vid krock skrivs filerna över.
- Ett jobb med paket utanför låsfilen kan göra sin uppladdningssökväg till en katalog, eller ändra upload-actionen inom sitt eget jobb. Då kan E3/E5 stämplas medan m365 var rött.
- Det obekräftade ledet är hur upload-artifact beter sig när sökvägen är en katalog. Det kördes inte.
- **Fix:** sätt `merge-multiple: false` och kräv att `stamplar/stampel-<id>/` innehåller exakt `stampel-<id>.json`. Skriv BLIND-raden ärligt.

## [VAKT] V4: hemlighetsläsaren ser inte `toJSON(secrets)` eller `secrets[format(...)]`
Mätt med `obundnaJobb`:
- Ett jobb utan miljö med `${{ toJSON(secrets) }}` gav `[]`, alltså inga hemligheter hittade.
- `secrets[format('{0}_{1}','BOT_DEPLOY','KEY')]` gav också `[]`.
- Motprovet med `secrets.BOT_DEPLOY_KEY` hittades.

Det finns 0 förekomster i dagens arbetsflöden. Men BOTNYCKELN.md lovar att SP-11 fäller *varje* läsare.
- **Fix:** räkna `toJSON(secrets)` och `secrets[` utan literal som «alla», på samma sätt som `secrets: inherit`.

## [VAKT] V5 (litet): SP-08 låser inte avtryckets kornighet
- Sabotage S9 maskade hela raden med `lastVerified` och fällde **0** tester.
- Raderna 471–696 bär `currency` och `sekPublic` på samma rad som datumet.
- `'[^']*'` kan spänna över radbrytningar. I dag är 31 av 31 träffar rena datum, så felet är latent.
- **Fix:** låt SP-08 ändra `currency: 'SEK'` på M365-raden. Använd `[^'\n]*`.

dom: MERGAS
