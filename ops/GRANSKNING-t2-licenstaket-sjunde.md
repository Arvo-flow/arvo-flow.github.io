commits: ae4dfee0
dom: BLOCKERAR

# Sjunde blicken på T-2: femte lagningen (ae4dfee0)

Granskningen gäller grenens slutläge, ae4dfee0, mot `origin/main` 793810d3. Granskaren har inte byggt
koden. Uppdraget var att hitta var det gröna är osant. Skript och utfall ligger i
`/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-t2/l8/`.

## Domen

**BLOCKERAR.** Q-1 är ett [KUND]-fynd i den mening ae4dfee0 skrev för att stänga P-1. Det räcker ensamt.

- 7 fynd: 2 [KUND] (Q-1, Q-7) och 5 [VAKT] (Q-2 till Q-6).
- Q-1 är infört i grenen och synligt i det PR:en ändrar. Det har P-1:s form en tredje gång: meningen är
  sann för fakturan den prövades på (en produkt per användare) och falsk för en annan klass som samma
  tak stoppar (flera produkter per användare, till exempel Adobe Creative Cloud och Acrobat).
- Q-7 är förexisterande och utanför PR:en. Det håller inte PR:en (avgränsningen 22 okt). Det ska loggas
  i arbetsordern.
- Q-2 till Q-6 gäller bevisen. Inget av dem ändrar en kundmening i dag.

**Det som håller.** P-1 är stängt i sin form: ingen mening namnger en produkt eller leverantör, och
Adobe 985 får skäl som är möjliga. P-4 är stängt. Radmeningen och reservmeningen är sanna. Talen i regel
13 och arbetsordern stämmer. Rummet och svarsmejlet säger inget som motsäger vyn. Sonden går grön.

**Lagningen är liten.** Beskriv nämnaren som den är: «delat med det antal användare vi läste». Lägg
«flera produkter per användare» bland exemplen. Låt LT-11 köra kedjan för en Adobe-faktura med två
produkter och kräva att meningens beräkning ger stoppet.

## Fynd

### Q-1 · [KUND] · infört i grenen: per plats-meningen beskriver en nämnare vi inte använder, och talet den beskriver ligger under gränsen

- **Fil:** `src/lib/prisavvikelse.js` rad 13–17, visad i `src/pages/TestaFaktura/index.js` rad 1618 för
  varje svar med `prisprov === 'per_plats'`.
- **Påstående:** meningen säger «Kostnaden per licens och månad, räknad som fakturans löpande belopp
  delat med antalet licenser, är högre än den gräns vi prövar automatiskt för leverantören.» Nämnaren
  är `seatCount`. Extraktionen definierar den som «Antal UNIKA ANVÄNDARE», och för flera moduler med
  egna antal som det största antalet (`agents/test-invoice/extract.js` rad 253–261). Grenens eget svep
  räknar platser på samma två sätt (LT-06, `tests/listpristak.mjs` rad 156–157 och 173: «största antal
  och … summan av produktraderna (extraktionens två regler)»). När en användare har två produkter är
  antalet licenser alltså större än nämnaren, och då är talet meningen beskriver inte talet som stoppade
  fakturan.
- **Bevis** (`l8/flerprodukt.mjs` → `flerprodukt.txt`; kedjan råform → `aggregateLineItems` →
  `prisprovningensIndata` → `validateSeatPrice` → `prisavvikelseMening`, allt på ae4dfee0):
  - «Adobe», Creative Cloud Alla program 5 × 985 och Acrobat Pro 1 × 273. Priserna är bokens teampriser
    (`adobeVerified.teamExVatMonthly`: all-apps 985, acrobat 273, lastVerified 2026-10-26). Fakturan är
    alltså korrekt till listpris. Sex licenser, löpande 5 198 kr.
  - seatCount 5 (största antal): pps 1 039,6, `anomaly: true`, `prov: 'per_plats'`, och per plats-meningen.
  - Belopp ÷ licenser, som meningen beskriver: 5 198 ÷ 6 = **866,33 kr, under gränsen 908,70**.
  - «Adobe Inc», Alla program 5 + Single App 1 × 381: pps 1 061,2, per plats. Per licens 884,33 < 908,70.
  - Med två produkter till samma tre personer (Alla program 3 + Acrobat Pro 3): pps 1 258, per licens 629.
- **Motprov:**
  - Samma fakturor med seatCount = summan av licensraderna (6): pps 866,33 och 884,33, ingen anomali.
    Stoppet beror alltså enbart på att nämnaren är användare, inte licenser.
  - Alla program 3 ensam: pps 985 med båda reglerna, per plats. Där är meningen sann, och det var den
    faktura P-1:s lagning prövades på (LT-11 `prova('adobe', 985)`, sonden `per-plats-adobe`).
- **Vad kunden läser:** en sats som anger beräkningen och påstår att den ger ett tal över gränsen. Räknad
  så ger fakturan 866,33, och fakturan hade inte stoppats. «Det behöver inte betyda att priset är fel»
  och «till exempel med tillägg» gör inte den första satsen sann. Acrobat Pro till en annan person är
  ingen tilläggstjänst.
- **Skillnad mot sjätte domens friande av «antalet licenser»:** den friade Copilot på en Microsoft-faktura,
  med motiveringen att meningen då namngav Copilot som tillägg och skilde tillägg från licenser. Den
  meningen finns inte längre, och P-1:s lagning gjorde meningen leverantörsneutral för att gälla Adobe.
  Jag bygger inte Q-1 på Copilot-läsningen.
- **Main:** samma fakturor stoppas på main (`l8/main-adobe.mjs`: «Adobe» 1 039,6 och «Adobe Inc» 1 061,2 →
  `anomaly: true`; 866,33 → `false`) och får den generiska texten, som också är falsk. Stoppet är alltså
  förexisterande. Meningen är ny i grenen: satsen «räknad som fakturans löpande belopp delat med antalet
  licenser» kom i ceb28c05 och står kvar i ae4dfee0, som skrev om meningen för att gälla Adobe. Samma
  struktur som P-1, som sjätte domen klassade som infört.
- **Nåbarhet:** kräver mains exakta namn («Adobe», «Adobe Inc», «Adobe Systems») och att modellen sätter
  seatCount till största antalet eller unika användare. Hur ofta det sker är inte mätt. Utan mätning
  räknas felet som synligt (avgränsningen 22 okt).
- **Renderat:** vyn tar bara `prisprov` som indata för meningen. Sonden renderade per plats-meningen för
  «Adobe» ordagrant (`l8/sond.txt`, `adobe-985`); fakturan i Q-1 ger samma svar.
- **Varför [KUND]:** texten når kunden och anger en beräkning som för just den fakturan ger motsatt utfall.

### Q-2 · [VAKT] · infört i ae4dfee0: LT-11 binder bara tre fragment av per plats-meningen och prefixet av de andra

- **T4:** per plats-satsen «är högre än den gräns vi prövar automatiskt för leverantören» byttes mot «är
  högre än leverantörens listpris». Falskt för Adobe 985, som ligger på listpris. Sviten: 0 fail, 0 cancelled.
- **T5:** radmeningen sa «så ni betalar troligen för mycket för licensen». 0 + 0.
- **T10:** reservmeningen fick «Ni betalar troligen för mycket.» 0 + 0.
- Sondens kontroller är samma fragment (`PER_PLATS`, `/Priset på en licensrad är högre/`), så sonden
  hade också gått grön på T4 och T5 (avläst i `scripts/screenshot-prisavvikelse.mjs` rad 74–80, inte körd
  med sabotaget).
- Commit-textens sabotage «meningen påstår att priset är fel» gäller per plats-meningens «Det behöver
  inte betyda». Rad och reserv saknar motsvarande vakt.

### Q-3 · [VAKT] · infört i ae4dfee0: «ingen mening namnger en produkt» är en ordlista med fem ord

- **T3:** «tillägg som Visio eller Power BI, eller till ett högre listpris som E5 eller Creative Cloud Pro».
  Det är P-1:s form. Sviten: 0 + 0. Sondens `FALSKT` bär bara Copilot och Teams Phone, så den hade också
  gått grön.
- Commit-textens «Ingen mening namnger en produkt eller en leverantör» är sant om texten i dag (läst).
  Vakten bär det bara för Copilot, Teams, Adobe, Google och Microsoft. Samma form som P-5.

### Q-4 · [VAKT] · delvis infört: vyns gren prövas i källtext, inte i rendering

- **T1:** meningen i vyn i en JSX-kommentar. Per plats får bara rubriken. 0 + 0.
- **T2:** valutagrenen fångar `price_anomaly` (`['foreign_currency', 'price_anomaly'].includes(...)`).
  Kunden får «Fakturan är i undefined — kontakta oss.» 0 + 0.
- **T6:** vyn lägger «Det kan bero på tillägg som Copilot eller Teams Phone.» direkt i grenen. 0 + 0.
  ceb28c05:s LT-11 skannade grenen efter falska formuleringar; ae4dfee0 flyttade skanningen till modulen.
  En formulering skriven direkt i vyn prövas inte längre av sviten.
- Sonden fångar alla tre per konstruktion (texten saknas, väntan går ut, eller `FALSKT` träffar). Grinden
  kör inte sonden. Det är sjätte domens P-2 i ny form.

### Q-5 · [VAKT] · kvar sedan P-3: svaret prövas på raden, inte på vad som skickas

- **T7:** `...{ prisprov: undefined }` efter raden `prisprov: _priceCheck.prov,`. 0 + 0.
- **T8:** `svara()` stryker `prisprov` (sjätte domens S3). 0 + 0. Loggat som kvar i arbetsordern
  («Kvar, [VAKT]: F5-2, L-5 och P-3»).
- Beteendet i båda: reservmeningen, som är sann för båda prövningarna.

### Q-6 · [VAKT] · SS-01 fäller INSERT men inte UPDATE

- **T9:** ett steg `UPDATE supplier_prices SET price_monthly = 416.77 …` i `api/admin/run-migration.mjs`.
  0 + 0. Testtiteln säger «skriver inga priser».
- Regexen i SS-01 fäller `INSERT INTO public.supplier_prices`, `INSERT INTO "public"."supplier_prices"`
  och den nakna formen, men inte `UPDATE` (`node -e` med regexen ordagrant). Ingen skrivare finns i dag.

### Q-7 · [KUND] · förexisterande, utanför PR:en: sidans rubrik säger «Ni betalar för mycket» ovanför «Det behöver inte betyda att priset är fel»

- `src/pages/TestaFaktura/index.js` rad 1125: `<Headline>Ni betalar för mycket. <em>En</em> faktura
  bevisar det.</Headline>` står i `<Hero>` utan villkor och syns ovanför varje resultat. Renderat:
  `prisavvikelse-per-plats-adobe-desktop.png` (sondens bild, borttagen vid städningen) visar rubriken
  och per plats-meningen på samma sida, för en korrekt Adobe-faktura till listpris.
- Rubriken finns på main (raden ingår inte i grenens diff, `git diff --stat` för filen: +9 rader, alla i
  importen och granskningsgrenen). PR:en gör den inte vanligare. Den ska loggas i arbetsordern och
  lagas i en egen PR.

## Förra domens fynd

| ID | Status | Bevis |
|---|---|---|
| P-1 | **Stängt i sin form, öppet i ny (Q-1).** Ingen mening namnger en produkt. Adobe 985 får «till ett högre listpris», som stämmer (985 > 908,70). Flera produkter per användare får en beräkning som är falsk. | `l8/sond.txt`, `l8/flerprodukt.txt` |
| P-2 | **Stängt för text och värde, öppet för grenen (Q-4).** Texten väljs per värde i modulen, och LT-11 prövar funktionen. M3 (vyn läser `result.reason`) fäller LT-11. Att grenen nås och renderas prövas bara av sonden. | M3: 1 fail; T1, T2, T6: 0 |
| P-3 | **Delvis stängt.** En bortkommenterad rad fäller LT-11 (M1). En överskriven nyckel och `svara()` som stryker fältet gör det inte (Q-5). Den senare är loggad i arbetsordern. | M1: 1; T7, T8: 0 |
| P-4 | **Stängt.** Axeln bär Adobes 1,00 och 1,10 × teampris i modulhuvudet, regel 13 och arbetsordern, och det stämmer med `tests/listpristak.mjs` rad 182 och 208. «äldre cache» ger 0 träffar i `src lib api scripts tests`, arbetsordern och CLAUDE.md. | `grep` |
| P-5 | **Stängt för schemanamn.** Regexen fäller tre stavningar av INSERT. UPDATE fälls inte (Q-6). | `node -e`, T9: 0 |

## Friat

- **Per plats-meningen för en produkt per användare.** Microsoft E5 + Copilot (928), E5 769,42 ensam,
  Adobe Alla program 985 och Google Workspace 690 (konstruerat tal): varje sats är möjlig. Renderat i
  sondkopian (`l8/sond.txt`). För Google är en korrekt faktura över 468 inte mätt; «vissa korrekta
  fakturor, till exempel med tillägg» är en allmän sats om gränsen, och jag räknar den inte som fel.
- **Radmeningen och reservmeningen.** Radprövningen läser bara nivårader i `saas-productivity`, och
  «Priset på en licensrad» stämmer. En årssumma på en månadsfaktura stoppas, och meningens exempel är då
  precis det som hände. Reservmeningen nås bara utan `prisprov`; vid anomali ger `validateSeatPrice`
  alltid `per_plats` eller `rad` (läst, `lib/supplier-price-intel.js` rad 139–169). Sonden: `per_plats+rad` → reservmeningen.
- **Svarsvägen.** Vyn sätter `result` bara ur ett färskt API-svar (rad 661 och 698). Cacheträffen
  returnerar det cachade objektet, och nyckeln bär `v32` och `deploySha` (rad 530). Valutaomräkningen
  sker före prisprövningen (rad 887 före 1233).
- **Rummet och svarsmejlet (regel 5).** `watchedCard` med `price_anomaly` för Adobe, Microsoft, Google
  Workspace och Crayon AS: «Mottagen — men vi stoppade prissättningen … Skälet är tekniskt …» (`l8/rum.mjs`).
  Motprov `categorization_conflict`: ett annat kort. Svarsmejlet: «Vi prissätter inte den här fakturan
  automatiskt. Skälet till att vi inte prissatte fakturan står i ert rum.» Grenen ändrar ingen av dem.
  Rummet säger mindre än vyn, inte motsatsen.
- **Talen.** `l8/lt06-alla.sh` → `lt06.txt`: `{"fall":407568,"main":170144,"ny":222372,"forsamrat":0,
  "battre":52228}` mot testets och mains riktiga referens, 0 skillnader bland 576 fall utanför
  saas-productivity, 369 384 skilda, 96 försämringar mot ea56bf42. «1,07 × månadspris»:
  `l8/textlager.mjs` ger 13 nivårader i 9 PDF:er, högst Business Premium 270 mot 252,35.
- **`lib/price-db.js`.** Ingen fil importerar de borttagna funktionerna (`grep`, utanför
  `tests/listpristak.mjs` bara en kommentar).
- **Modulhuvudena och commit-texten.** «Mains tak gäller Microsoft, Google och Adobe» och «taket stoppar
  också korrekta fakturor, till exempel Adobe Creative Cloud Pro till listpris och E5 med Copilot»
  stämmer. Commit-textens «7 tester föll»: jag körde tre av de sju riktningarna (M1, M2, M3 som variant),
  och var och en fällde 1. De andra fyra är inte rekonstruerade.
- **Inte omkört:** regel 13:s historiska tal (1 986, 89, 406 848, 528, 4 616). De gäller äldre rutnät.

## Sabotage

Kördes med `l8/sab.py`: `assert old in s`, exakt en förekomst, kontroll att filen ändrades, modulens
beteende utskrivet för varje sabotage i `src/lib/prisavvikelse.js`, hela sviten per sabotage, återställning
ur sparad sträng med kontroll i `finally`. `git status --porcelain` efter körningen: tomt.

| ID | Riktning | Fällda (fail + cancelled) | Fynd |
|---|---|---|---|
| T1 | meningen i vyn i en JSX-kommentar | **0 + 0** | Q-4 |
| T2 | valutagrenen fångar `price_anomaly` | **0 + 0** | Q-4 |
| T3 | per plats nämner Visio, Power BI, E5, Creative Cloud Pro | **0 + 0** | Q-3 |
| T4 | per plats: «högre än leverantörens listpris» | **0 + 0** | Q-2 |
| T5 | radmeningen: «ni betalar troligen för mycket» | **0 + 0** | Q-2 |
| T6 | Copilot-mening direkt i vyns gren | **0 + 0** | Q-4 |
| T7 | `prisprov` skrivs över av en senare nyckel | **0 + 0** | Q-5 |
| T8 | `svara()` stryker `prisprov` | **0 + 0** | Q-5 |
| T9 | migreringen skriver ett pris med UPDATE | **0 + 0** | Q-6 |
| T10 | reservmeningen: «Ni betalar troligen för mycket» | **0 + 0** | Q-2 |
| M1 | motprov: `prisprov` bortkommenterad | 1 + 0 | LT-11 |
| M2 | motprov: Copilot tillbaka i per plats | 1 + 0 | LT-11 |
| M3 | motprov: vyn läser `result.reason` | 1 + 0 | LT-11 |

Inget sabotage prövar Q-1: ingen vakt i sviten kör kedjan för en faktura med flera produkter per
användare. Beteendet är mätt i kedjan.

## Proveniens

- **Uppställning:** `git fetch origin claude/fable-5-resume-i60dmd main`, `git checkout --detach ae4dfee0`.
  `origin/main` = 793810d3ef036c671236c4d029a8c819ef70ea3b = merge-basen. `node_modules` symlänkad från
  huvudklonen.
- **Baslinje:** `node --test tests/run.mjs` → tests 2717, pass 2717, fail 0, cancelled 0 (`l8/baslinje.txt`).
- **Läst:** sjätte domen, `git show ae4dfee0` med texten, grenens diff mot main, `src/lib/prisavvikelse.js`,
  `lib/supplier-price-intel.js`, utgången för `price_anomaly` och cachen i `api/test-invoice.mjs`, vyns
  granskningsgren och rubrik, `pricePerSeatMonthly` och `seatCount` i `extract.js`, `watchedCard`,
  svarsmejlet, LT-06, LT-11, SS-01..03, CV-19, regel 13, avgränsningen 22 okt och arbetsordern T-2.
- **Körda skript** (i `l8/`): `bas.sh`; `bygg.sh` (`npm run build`, rc 0); `gor-sond.py` + `kor-sond.sh`
  (kopia av sonden med Playwright ur `/opt/node22/lib/node_modules/playwright` och fem tillagda svar,
  rc 0, `sond.txt`); `rum.mjs`; `kopiera.sh` + `prep.mjs` (modulkopior ur `git show` av ae4dfee0,
  793810d3 och ea56bf42) och `lt06-alla.sh` (`lt06.txt`); `textlager.mjs`; `flerprodukt.mjs`
  (`flerprodukt.txt`); `main-adobe.mjs`; `sab.py` (`sab-logg.txt`, `sab.jsonl`, `ut-*.txt`). Den döda
  granskarens utkast i `l7/` lästes som prövlista; dess R1–R6 och M1–M2 är omkörda som T1–T3, T7–T9,
  M1 och M2.
- **Inte kört:** handlern `api/test-invoice.mjs`, extraktionen och kategoriseringen med modellen,
  produktionen. Hur ofta Q-1:s klass förekommer i riktiga fakturor är inte mätt.
- **Städat:** `build/`, `results/` (bara `screenshots/prisavvikelse`), symlänken `node_modules` och
  sondkopian `l8/sond.mjs` borttagna. `git status --porcelain --ignored` vid slutet: tomt. HEAD = ae4dfee0.
