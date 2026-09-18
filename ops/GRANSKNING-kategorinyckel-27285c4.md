# Granskningsdom · kategorinyckeln `vaxel` → `molnvaxel` (27285c4)

**Uppdrag:** hitta var det gröna är osant.
**Datum:** 2026-09-18
**Andra blicken:** grundaren, samma form som `5db58aa`, `acea9cd` och `9e1e929`.
**Dom:** **MERGAS.** Klassning enligt stoppregeln: **[KUND]** — sammanslagningen ÖPPNAR en väg som
var stängd (en korrekt kategoriserad molnväxelfaktura kunde inte nå kunden prissatt) och rättar en
kundsynlig etikett som visade en rå snake_case-nyckel.

---

## Vad som granskades

`lib/kategorinyckel.js` (ny), `lib/supplier-fingerprints.js`, `lib/category-validator.js`,
`lib/format.js`, `lib/sanity-verifier.js`, `lib/production-monitor.js`, `lib/tystnadsskal.js`,
`api/send-report.mjs`, `agents/recommender/branchindex.js`, `src/lib/categoryMeta.js`,
`src/lib/partnerFlags.js`, `tests/kategorinyckel.mjs` (KN-01..09).

## Fynden, alla mätta genom att KÖRA koden

| # | Fynd | Bevis |
|---|---|---|
| 1 | Telia/telenor/tele2/tre avvisade den enda kategori kategoriseraren kan ge | `checkSupplierFingerprint(...,'molnvaxel').categoryOk === false` för alla fyra |
| 2 | Validatorns systemprompt kände inte till `molnvaxel` | `VALID_CATEGORIES` bar `vaxel`; `RELATED` bar `molnvaxel` — mjukaren kunde aldrig fyra |
| 3 | Kunden kunde se den råa nyckeln | `catLabel('molnvaxel') === 'molnvaxel'` |
| 4 | seatCount-vakten var blind för en per-användare-kategori | `SEAT_CATEGORIES` saknade `molnvaxel` |
| 5 | Två `categoryMeta`-poster, den döda med `isRealPrice:false` | läst ur källan, dubbletten borttagen |

## Det viktigaste: skadan är INTE skedd, och det är mätt

Sonden (`scripts/probe-kategorinyckel.mjs`, körd tre gånger mot produktions-DB) körde
**produktionens egen grind på produktionens egna strängar**:

```
Sep 13  norm="Telia Sverige AB"  cat=molnvaxel  route=auto  → MISMATCH
        fingerprint="seed:avtal-testyta"  arskostnad=114000
```

Exakt `scripts/seed-avtal-testyta.mjs`:s rad, skriven med en direkt `INSERT` förbi grinden — vilket
är varför den står `auto` trots att grinden säger MISMATCH. **Varje rad som faktiskt gick genom
pipelinen är OK.** Noll rader bär nyckeln `vaxel`. Dörren stod öppen; ingen hann gå genom den.

Därmed är aliaskartan ett **bälte, inte en räddning**: den räddar ingen lagrad historik, för det
finns ingen att rädda. Det ska sägas som det är.

## Mätinstrumentet var felet två gånger

1. **Jag anropade `checkSupplierFingerprint` med två argument mot dess tre.** Resultatet var
   MISMATCH på ALLT — inklusive `mobil`, som ska vara OK. Att motprovet också föll var det enda
   som avslöjade anropet; utan det hade jag rapporterat ett fyra gånger för stort fel.
2. **Sonden sa emot min lokala mätning** (grinden sa MISMATCH, liggaren sa `route=auto`). Att välja
   den mätning som passade hypotesen hade varit 21 augusti-felet ordagrant. Steg 4 byggdes i stället
   för att köra grinden mot verkliga strängar, och dess `fingerprint`-rad för att skilja en seedad
   rad från en kundfaktura.

## Grannfall som FRIADES, med skäl

**`lib/telekom-normalize.js` rör inte sammanslagningen.** `'vaxel'` är där en RADKLASS
(`classifyTelekomLine` → `'hardware' | 'vaxel' | 'mobil' | 'other'`), en radtyp inuti en faktura,
inte en fakturakategori — och samma modul returnerar `category: 'molnvaxel'` för datapunkten.
`'mobil'` kolliderar likadant, så en omdöpning av bara `vaxel` hade gjort axeln inkonsekvent.
**KN-09 kör modulen och prövar påståendet** i stället för att lita på det: ett undantag som ingen
prövar är en bakdörr.

## Ett test som hade blivit grönt på fel grund

`tests/branch-anchors.mjs` prövade «estimat-kategori → inget ankare» med `vaxel`. Efter
borttagningen ur prisboken hade testet förblivit **grönt** — men prövat en kategori som inte fanns
alls, inte en estimat-kategori. Flyttat till `kortterminal`, med premissen (`source === 'estimated'`)
**assertad** i stället för antagen.

De tolv testnamn som försvann ur sviten mättes genom att diffa testnamnslistan före och efter: de är
exakt den raderade postens egna matriceller (`p25 ≤ median` per bransch × storlek). Inget annat
slutade prövas.

## Sabotage

Sju riktningar, alla föll:

| # | Sabotage | Fällda |
|---|---|---|
| S1 | Telias fingeravtryck får tillbaka den döda nyckeln | 2 (KN-04, KN-08) |
| S2 | prisboken får tillbaka en `vaxel`-post | 2 (KN-01, KN-08) |
| S3 | den kanoniska etiketten tas bort | 1 (KN-05) |
| S4 | aliaset pekar på en kategori som inte finns | 4 (KN-01/02/05/06) |
| S5 | validatorns systemprompt får tillbaka den döda nyckeln | 1 (KN-08) |
| S6 | radklassen blir datapunktens kategori | 1 (KN-09) |
| S7 | sammanslagning åt fel håll (den tysta blir kanonisk) | 6 |

## Uttalad blindfläck

KN-07/08 **sveper källtext**. De ser aldrig en nyckel som byggs dynamiskt (`'moln' + 'vaxel'`),
kommer ur databasen eller ur en AI-sträng. Därför finns `kanoniskKategori()` som normaliserar det
som kommer IN — de två halvorna täcker olika hål, och ingen av dem täcker båda.

Vidare: KN-08 hoppar över kommentarrader, så historien får nämnas. En nyckel som återinförs **i en
kommentar som sedan avkommenteras** fångas först vid nästa körning.

## Kvarstående, öppet och oåtgärdat

`BRANCH_ANCHOR_UNIT` (`api/invoice-history.mjs`) saknar `molnvaxel`. Kategorin är `real-public` med
ett verifierat golv per användare, alltså kan «den kollektiva sanningen» aldrig visa dess ankare —
**exakt `loneadmin`-luckan från 19 augusti, i en ny kategori.** Jag har INTE lagat det i den här
commiten: prisbokens `molnvaxel`-post saknar `matrix`, så det måste först mätas om ett golv
överhuvudtaget går att härleda ur `teliaVerified.tiers`. Att lägga till enheten utan den mätningen
vore att gissa, och allowlistan finns just för att vi aldrig ska gissa enheten.
