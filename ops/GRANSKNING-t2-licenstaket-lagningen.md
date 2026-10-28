commits: ec21e155 ea56bf42
dom: BLOCKERAR

# Andra blicken på T-2:s två lagningar (ec21e155, ea56bf42)

Granskningen gäller grenens slutläge, ea56bf42, mot `origin/main` 793810d3. ec21e155 granskades aldrig: dess granskare dog på sessionsgränsen. Granskaren har inte byggt koden. Uppdraget var att hitta var det gröna är osant.

## Domen

**BLOCKERAR.** L-1 är ett [KUND]-fynd som grenen inför. Det räcker ensamt.

- 6 fynd: 3 [KUND] (L-1, L-2, L-3) och 3 [VAKT] (L-4, L-5, L-6).
- Infört av grenen: L-1, L-3, L-4 och L-6. L-2 är förexisterande och görs vanligare av grenen. L-5 hör till F5-2, som redan är loggat.
- Domen vilar på L-1. L-3:s form finns inte i repots testfakturor. L-2 hör enligt avgränsningen 22 okt till PR:en, eftersom diffen har en mekanism som gör felet vanligare.

**Påståendet håller i sin första halva.** Prövning 1 är mains, och HEAD skickar till granskning allt main skickade dit (`lt06-ref.mjs`, `lt06-svep.mjs`). LT-06:s tal stämmer. I LT-06:s rutnät skickar radprövningen ingen korrekt faktura till granskning som main prissatte: 2 852 korrekta fall går till granskning på HEAD och 2 852 på main.

**Den andra halvan håller inte.** «Svepet behöver bara mäta korrekta fakturor som radprövningen skickar till granskning» är rätt metod. Men rutnätet innehåller bara Microsofts licensfakturor. Anropet i `api/test-invoice.mjs` körs nu för varje faktura i varje kategori, och radprövningen bryr sig inte om leverantörens namn. Korrekta paketfakturor i kategorier som main besvarade med ett ärligt offertbesked går nu till granskning med ett falskt skäl (L-1). Regel 13 säger: «Ett svep är bara så brett som sitt rutnät.» Här saknas kategorin som dimension.

## Fynd

### L-1 · [KUND] · infört: paketfakturor med en M365-nivå i radtexten går till granskning

- **Fil:** `api/test-invoice.mjs` rad 1232–1233 (anropet utan villkor) och `lib/supplier-price-intel.js` prövning 2 (nivårad > 2 × listpris, oavsett leverantör och kategori).
- **Påstående:** en korrekt läst WaaS- eller IT-driftfaktura vars rad namnger en Microsoft 365-nivå och kostar mer än 2 × nivåns listpris går till granskning med `price_anomaly`. Main gav `requires_quote` med en ärlig text. Main prövade aldrig de här fakturorna: leverantörerna står inte i `SUPPLIER_KEY_MAP`, och radprövningen fanns inte.
- **Bevis** (`kategorier.mjs`, `kategorier2.mjs`: modellens råform → `aggregateLineItems(raw, null)` → `deterministicMatch` → `prisprovningensIndata` → `validateSeatPrice`, mot mains modul, och mains `recommend()` med stubbad AI):
  - Atea, «Arbetsplats som tjänst Premium – dator, Microsoft 365 Business Premium och support», 10 × 899: kategori `managed-workplace` (oreviderad). Main går vidare och ger `requires_quote`. HEAD: GRANSKNING, «899 kr … över 2 × nivåns listpris 252.35 kr … troligt avläsningsfel».
  - Advania, «Modern arbetsplats inkl. Microsoft 365 E3 och servicedesk», 25 × 1 150: samma utfall.
  - Dustin, «Device as a Service: bärbar dator + Microsoft 365 Business Standard», 8 × 649: samma utfall.
  - Nordic Drift, «Användare inkl. Microsoft 365 Business Premium, support och backup», 12 × 750: kategori `it-support`. Main ger `requires_quote` med texten «Vi gör en manuell genomgång istället för att visa en siffra vi inte kan stå för». HEAD: GRANSKNING.
  - Grindarna före rad 1233 släpper fakturorna: `checkSupplierFingerprint` ger `matched: false` för alla fyra leverantörerna, och `deterministicMatch` ger konfidens 0,92, alltså över 0,8 (`_trustPrimary`). Den riktiga handlern kördes inte.
- **Vad kunden ser:**
  - **Main:** fakturavyn visar offertpanelen (`TestaFaktura` rad 1692) med `recommend()`:s text «Det här är ett bundlat WaaS-avtal (dator + licenser + support) … Arvo gör en kostnadsfri manuell genomgång».
  - **HEAD:** fakturavyn hamnar i review-grenens generiska text (rad 1634–1646, ingen gren för `price_anomaly`): «Fakturan behöver djupare analys. Vår algoritm är inte tillräckligt säker på klassificeringen …». Det är falskt: kategorin är deterministisk.
  - **Rummet på HEAD** (`watchedCard`, körd): «Under granskning · Mottagen — men vi stoppade prissättningen … En människa läser om fakturan.»
  - Fakturavyns text är avläst i källan, inte renderad.
- **Kodens egen regel:** `recommend.js` rad 1869: «Falskt larm på ett bra WaaS-avtal är mer skadligt än att be om offert.» `categorize.js` rad 50–51 säger att WaaS-paket «innehåller ofta "Microsoft 365" i beskrivningen». Kategorin finns för att fånga just de här fakturorna. Grenen larmar nu på dem.
- **Motprov:**
  - Samma WaaS-faktura utan nivå i radtexten går vidare på både main och HEAD.
  - Med nivån och 480 kr går den också vidare på båda.
  - Samma IT-driftfaktura utan nivå går vidare på båda.
- **Räckvidd:** inte mätt. Repots testfakturor bär nio PDF:er med nivårader, och ingen av dem är en paketfaktura (`textlager.mjs`). Lynxeye/Nordic Managed IT har E3 à 420, alltså under gränsen.
- **Varför LT-06 inte ser det:** rutnätets priser är listpris × {1; 1,15; månadspris} på rena licensrader. Det saknar paket, kategorier och leverantörer utanför licensförsäljning.
- **Inte ett fynd:** ett MSP-paket som kategoriseras som `saas-productivity` («Microsoft 365 Business Premium inkl. drift och support», 10 × 695). Där gav main ett falskt like-for-like-påstående: `business-premium 695 mot 210.29`, switch true och texten «Ni betalar 695 kr … Microsofts publika årsavtalspris för exakt samma licens …» (`kategorier2.mjs`). HEAD:s granskning är bättre där.
- **Förslag:** begränsa radprövningen till fakturor vars rader like-for-like läser, alltså kategorin `saas-productivity` (skicka kategorin genom `prisprovningensIndata`). Alternativt: undanta kategorier som har ett eget besked (`managed-workplace`, `it-support`). Lägg till kategori och paketrader som en dimension i LT-06, och lås `requires_quote`-vägen för WaaS i ett test. Mät före valet vad en begränsning kostar på en Crayon-faktura med M365 och Azure.

### L-2 · [KUND] · förexisterande, gjort vanligare: fakturavyn ger `price_anomaly` ett falskt skäl

- **Fil:** `src/pages/TestaFaktura/index.js` rad 1567–1646. Review-grenen har egna texter för `volume_data_required`, `foreign_currency` och `no_benchmark`. `price_anomaly` faller till den generiska texten «Vår algoritm är inte tillräckligt säker på klassificeringen för att visa automatiska besparingssiffror».
- **Påstående:** skälet är fel för varje prisavvikelse. Rummet säger något annat för samma faktura (reservkortet, «Skälet är tekniskt»), så två ytor säger olika saker (regel 5).
- **Gjort vanligare:** grenen skickar fler fakturor till `price_anomaly`. Det gäller felläsningar hos återförsäljare och det juridiska namnet (LT-06: 52 228 fall där HEAD granskar och main inte), och L-1:s paketfakturor. För felläsningarna är bytet en förbättring, eftersom main prissatte dem med fel årskostnad. Avgränsningen räknar ändå en mekanism som gör felet vanligare.
- **Bevis:** avläst i källan (`grep price_anomaly src` gav noll träffar), inte renderat. Utan en rendering räknas felet som synligt (avgränsningen 22 okt).
- **Motprov:** `watchedCard` med `price_anomaly` ger reservkortet utan påhittat skäl, alltså rätt text i rummet.
- **Förslag:** en egen gren för `price_anomaly` i fakturavyn, med reservkortets form: «vi stoppade, skälet är tekniskt, en människa tar vid».

### L-3 · [KUND] · infört, räckvidd ej mätt: T2-2:s form finns kvar på à-prisvägen

- **Fil:** `lib/supplier-price-intel.js`, `radensPrisPerManad`. Utan antal används à-priset utan avstämning mot beloppet.
- **Bevis** (`t22rest.mjs`, kedjan via `aggregateLineItems`): Crayon AS, «Microsoft 365 E3», antal null, à-pris 5 001,24 per år, belopp 4 167,70 per månad, seatCount 10.
  - Main: pris per plats 416,80, årskostnad 50 016 (rätt), like-for-like null (inget bytespåstående). Prissätts.
  - HEAD: GRANSKNING.
- **Motprov:** samma rad med à-pris 416,77 per månad går vidare på båda.
- **Klass:** samma form som T2-2, som förra domen räknade som [KUND]. Förra domens förslag («à-priset bara när antal saknas») lämnade just det här fallet kvar. Formen finns inte i repots testfakturor.
- **Förslag:** pröva inte en rad utan antal. Alternativt: använd à-priset bara när det stämmer mot beloppet för något antal.

### L-4 · [VAKT] · infört: två regler i prövning 2 är inte låsta

- **S1:** `if (rad?.type !== 'recurring_subscription') continue;` gör att en rad utan typ inte längre räknas som löpande. 0 fail, 0 cancelled. Beteendet ändrades (`beteende.mjs`: E3-rad utan typ, 5 001,20 per licens, true → false). Kommentaren «En rad utan typ räknas som löpande» bärs inte av något test. Schemat kräver `type` (`extract.js` rad 491), så fallet nås bara om modellen bryter mot schemat.
- **S2:** `rad.quantity >= 0` gör att antal 0 ger priset Infinity. 0 fail, 0 cancelled. Beteendet ändrades (antal 0 med à-pris 416,77: false → true). Schemat tillåter antal 0 (`integer|null`).
- **Förslag:** ett fall per regel i LT-05, eller ta bort typregeln ur kommentaren.

### L-5 · [VAKT] · F5-2, loggat: att anropet körs för varje faktura bärs bara av en regex

- **S4:** det nya anropet inlindat i mains gamla villkor (`if (extracted.pricePerSeatMonthly && categorized.normalizedSupplier)`). 0 fail, 0 cancelled. LT-04:s regex matchar fortfarande.
- Beteendet ändras per konstruktion: radprövningen hoppas över när pris per plats saknas. Handlern kördes inte.
- Arbetsordern loggar F5-2 som «vägen från anomali till `review_queue` prövas inte genom handlern». Villkoret för anropet hör till samma väg. Lagas med F5-2.

### L-6 · [VAKT] · infört: texterna begränsar inte svepets räckvidd

- **Modulhuvudet:** «Svepet (LT-06) mäter därför bara andra hållet: korrekta fakturor som radprövningen skickar till granskning.» BLIND räknar bara upp vad prövningen missar, aldrig vad den larmar på i onödan.
- **Arbetsordern och regel 13 i CLAUDE.md:** «noll fall där main hade rätt och den nya fel» och «0 försämringar». Båda gäller rutnätet och är sanna där. Ingen text säger att rutnätet bara är Microsofts licensfakturor.
- **Förslag:** för in L-1 och L-3 i BLIND tills de är lagade, och skriv rutnätets gräns bredvid talet.

## Förra domens fynd

| ID | Status | Bevis |
|---|---|---|
| T2-1 | **Stängt.** Mains tak står orört och prövas alltid. | `lt06-ref.mjs`: 0 skillnader mot mains modul i 624 fall, och 0 utanför krascher i 39 312 fall med rader. `lt06-svep.mjs`: försämrat 0. LT-08 bär T2-1:s tre fall. |
| T2-2 | **Delvis stängt.** Med antal används belopp ÷ antal (LT-05). Utan antal finns formen kvar. | L-3 |
| T2-3 | **Stängt.** Arbetsordern loggar F4-2 med den exakta radtexten. LT-05 prövar den texten och kräver prissätts. | ARBETSORDER-diffen och baslinjen |
| T2-4 | **Stängt.** | G5 (aliaset `adobe inc` bort) fällde LT-06 och LT-07. |
| T2-5 | **Stängt.** BLIND bär 80 %-fallet. Månads-à-pris med årssumma som belopp går nu till granskning (LT-05:s motprov, belopp ÷ antal). | Modulhuvudet och baslinjen |
| T2-6 | **Stängt.** | G2 (2,49), G3 (`Math.min`) och G4 (`>=`) fällde vardera LT-06 och LT-08. |

## Friat

- **Prövning 1 är mains** (`lt06-ref.mjs`). 24 namn (strängar, `null`, `undefined`, prototypnamn, tal, objekt, arrayer) × 26 priser (`NaN`, ±Infinity, strängar, arrayer, BigInt, gränsvärden) ger 0 skillnader i utfall. Med 9 radformer × 7 perioder blir det 39 312 fall, och 0 skillnader utom krascher.
  - I 10 fall kastar main TypeError och HEAD inte: icke-strängnamn med ett pris som inte är ett tal.
  - Fallen går inte att nå, eftersom leverantören är en sträng i schemat. Motprov: samma skript hittar krascherna, alltså kan det se en skillnad.
- **LT-06:s tal** (`lt06-svep.mjs`, testets rutnät ordagrant):
  - HEAD: 406 848 · 169 688 · 221 916 · försämrat 0 · bättre 52 228.
  - ec21e155: försämrat 4 616. 2ac67b6e: försämrat 528.
  - Motprov: mains modul som «ny» ger försämrat 0 och bättre 0.
  - `mainsUtfall` mot mains riktiga modul: 0 skillnader i alla fyra körningarna.
- **LT-09:s påstående om ec21e155** (`lt09.mjs`): projektion ×12 och halverat antal prissätts av ec21e155. De går till granskning på HEAD och på main. Motproven (rätt projektion, rätt platser) går vidare på alla tre.
- **Commitkravet** (`vakter.mjs`): `granskaCommit` ger ok för både ec21e155 och ea56bf42. Motprov: utan raden «Sabotage som fällde» ger den false.
- **`lib/price-db.js` och `api/test-invoice.mjs`** har inte ändrats sedan 2ac67b6e (`git diff --stat 2ac67b6e ea56bf42`). Förra domens friande av dem står kvar.
- **Commit-textens sabotagesumma**, «femton riktningar → 37 tester», är inte rekonstruerad. Sex av riktningarna motsvaras av mina G2, G3, G4, G5, S9 och S10, och de fällde tillsammans 18 tester. Jag vet inte än om summan 37 stämmer.

## Sabotage

Kördes med `sab.py`: `assert old in s` och exakt en förekomst, hela sviten per sabotage, och återställning ur sparad sträng med kontroll i `finally`. Beteendeprov för dem som fällde 0 gjordes i `beteende.mjs`, mot saboterade kopior i scratch.

| ID | Riktning | Fällda (fail + cancelled) | Tester |
|---|---|---|---|
| G2 | `RADFAKTOR = 2.49` | 2 + 0 | LT-06, LT-08 |
| G3 | `Math.min` i `nivansListpris` | 2 + 0 | LT-06, LT-08 |
| G4 | `>=` i stället för `>` | 2 + 0 | LT-06, LT-08 |
| G5 | aliaset `'adobe inc'` bort | 2 + 0 | LT-06, LT-07 |
| S1 | en rad utan typ räknas inte som löpande | **0** | beteendet ändrat (L-4) |
| S2 | `quantity >= 0` (antal 0 ger Infinity) | **0** | beteendet ändrat (L-4) |
| S4 | anropet inlindat i mains gamla villkor | **0** | ändrat per konstruktion, handlern ej körd (L-5) |
| S5 | bara första raden prövas | 1 + 0 | LT-06 |
| S6 | radprövningen hoppas över när taket per plats prövats | 1 + 0 | LT-06 |
| S9 | prövning 1 bort | 7 + 0 | LT-01, LT-02, LT-05, LT-06, LT-07, LT-08, LT-09 |
| S10 | prövning 2 slår aldrig till | 3 + 0 | LT-05, LT-06, LT-08 |

Inget sabotage var en no-op: `assert` höll för alla elva, och de fem som `beteende.mjs` prövade ändrade utfallet.

## Proveniens

- **Uppställning:** `git fetch origin claude/fable-5-resume-i60dmd main` och `git checkout --detach ea56bf42`. `origin/main` = 793810d3ef036c671236c4d029a8c819ef70ea3b. `node_modules` symlänkades från huvudklonen och togs bort vid slutet.
- **Baslinje:** `node --test tests/run.mjs` gav tests 2713, pass 2713, fail 0, cancelled 0, på 54 s.
- **Läst:**
  - `ops/GRANSKNING-t2-licenstaket.md`, och `git show` av ec21e155 och ea56bf42 med commit-texterna.
  - Modulen på HEAD och på main.
  - `tests/listpristak.mjs`.
  - Diffarna i ARBETSORDER och CLAUDE.md, och avgränsningen och regel 13 i CLAUDE.md.
  - `aggregateLineItems`, like-for-like i `recommend.js`, WaaS-grinden, `deterministicMatch`, `watchedCard` och fakturavyns review-gren.
- **Körda skript** (alla i `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/granskning-t2/l3/`):
  - `lt06-ref.mjs` och `lt06-svep.mjs` (med `prep.mjs`, som bygger kopior av modulen i ec21e155 och 2ac67b6e).
  - `kategorier.mjs`, `kategorier2.mjs`, `t22rest.mjs`, `lt09.mjs`, `beteende.mjs`, `vakter.mjs` och `textlager.mjs` (förra domens skript, med ny sökväg).
  - `watchedCard` direkt med `node -e`.
  - `sab.py`, med utfallet i `sab.jsonl` och `ut-*.txt`.
- **Den döda granskarens anteckningar** (`l2/`): jag läste `motprov-a1.mjs` (mönstret med stubbad AI i `recommend()`), `fuzz.mjs` och utdata ur `svep3-monthly.txt`, som idéer. Inget mätvärde därifrån räknas här. Allt ovan är omkört mot ea56bf42.
- **Inte kört:**
  - handlern `api/test-invoice.mjs` och kategoriseringens AI-validator;
  - extraktionen med modellen;
  - rendering av fakturavyn;
  - produktionen.
  Hur ofta L-1:s och L-3:s former förekommer i riktiga kundfakturor är inte mätt.
- **`git status --porcelain` vid slutet:** tomt (kontrollerat efter sabotageserien och efter att symlänken tagits bort).
