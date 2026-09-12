# Rapport — de tre defensiva besluten

**Från:** Opus 5 (Huvudarkitekt) · **Datum:** 2026-09-11/12 · **Beställd av:** grundaren
**Omfattar:** allt arbete från mandatet *«Fables dom accepteras i sin helhet — exekvera punkt 1–3»*
**Kod:** `6cd359f` + `409b138` på `claude/fable-5-resume-i60dmd` · `main` orörd på `4ae04a4`
**Svit:** 2 345/2 345 · **Sabotage som fällde:** 16 av 16

---

## Sammanfattning på en sida

Ordern var tre saker: stäng testidentiteten ur prisboken, skilj arkivering från radering, och
ersätt tom tystnad i rummet med ett täckningspåstående. Alla tre är byggda, testlåsta och
sabotage-bevisade.

**Men ordern var inte den svåraste delen av arbetet.** Två saker gick emot beställningen, och båda
är öppet redovisade nedan:

1. **Jag ändrade kortets enhet.** Ordern löd *«Vi bevakar X BOLAG i denna kategori»*. Det talet
   finns inte i vår databas och kan inte härledas ur den. Kortet säger nu vad vi faktiskt kan
   belägga — prispunkter och skilda belopp — och skriver ut att talen **inte är antal bolag**.
2. **Granskningen fällde mitt första bygge med domen BLOCKERAR.** Jag hade stängt två dörrar och
   lämnat elva öppna, i samma session som jag citerade bibelns regel mot precis det. Det andra
   commitet (`409b138`) är svaret: en klassning som en maskin tvingar fram, inte elva lappar.

Nettot: moaten är skyddad i **båda** prisbokskällorna, arkivering är en egen operation i alla
kundsynliga ytor, och rummet talar där det förut teg.

---

## Punkt 1 — Testidentiteten är ett begrepp, inte en e-poststräng

### Vad som fanns, och varför det inte räckte

Skyddet som existerade var en **bieffekt**: mail-in-vägen skickar `segmentOkant: true`, alltså nådde
testytans fakturor aldrig prisboken. Men den flaggan svarar på om SEGMENTET är avläst — inte på om
fakturan är en marknadsobservation. En testfaktura uppladdad via `/testa-faktura` med vald bransch
och storlek hade skrivit **rakt in i moaten** och förskjutit p25 för en cell som redan bärs av ett
fåtal skilda belopp.

Fables formulering, som jag accepterade utan ändring:

> *«`segmentOkant` svarar på om SEGMENTET är avläst, inte på om fakturan är en marknadsobservation.
> En testfaktura med korrekt segment är fortfarande en lögn om marknaden.»*

### Vad som byggdes

`arTestidentitet()` i `lib/test-surface.js` är en **egen fråga**, och `storeDatapoint` ställer den.
Det bärande designbeslutet sitter i signaturen:

```js
export async function storeDatapoint({ …, userEmail, db: dbIn = null }) {
  if (userEmail === undefined) {
    throw new Error('[benchmark] storeDatapoint kräver userEmail (null = anonym). …');
  }
  if (arTestidentitet(userEmail)) {
    console.log(`[benchmark] TESTIDENTITET — datapunkt EJ lagrad för ${category}.`);
    return;
  }
  …
```

**`userEmail` saknar defaultvärde med flit.** `undefined` (anroparen glömde) KASTAR; `null` (anonym
uppladdning) skrivs; testytan vägras med skäl. Ett defaultvärde hade gjort *«ingen frågade»* omöjligt
att skilja från *«anonym»* — exakt den felfamilj hela obduktionen handlar om.

**Grinden fällde tre befintliga anropare på sin första körning.** Den kan alltså inte glömmas i
tysthet.

### Motprovet, i båda ändar

En spärr som fäller allt är lika värdelös som ingen spärr. `tests/testidentitet.mjs` (TI-01..08)
kräver därför båda riktningarna: en **riktig kund** måste få bidra till prisboken, och en **anonym**
uppladdning är en legitim marknadsobservation. Sabotage-bevisad i tretton riktningar.

---

## Punkt 2 — Analyser arkiveras, de raderas aldrig

### Kostnaden som redan var betald

När rummet rensades 9 september försvann motparten som bar dokumentidentiteten, och **288
datapunkter blev permanent spårlösa**. Felet var inte grundarens beslut — det var att systemet
saknade ett sätt att utföra det: *«rensa ett rum»* och *«radera bevisen»* var SAMMA operation.

### Vad som byggdes

`arkiverad_at` skiljer dem åt: satt = borta ur kundens vy, kvar som bevis för moaten.

- `scripts/rensa-rummet.mjs`: `DELETE FROM invoice_analyses` → `UPDATE … SET arkiverad_at = NOW()`
- `scripts/migrate.mjs` äger kolumnen + partiellt index `idx_analyses_aktiva`
- Alla kundsynliga läsvägar filtrerar `arkiverad_at IS NULL` — **även reserverna**. En reserv som
  visar arkiverade rader är en tyst återuppståndelse.

**Gränsen är knivskarp:** kötillstånd (`ingest_jobs`) raderas fortfarande. Ett avbetat jobb bevisar
ingenting om marknaden.

### Grannfallet, funnet under bygget — och dess egen [KUND]-fälla

En **arkiverad faktura som skickas in på nytt** hade uppdaterat den arkiverade raden och förblivit
osynlig. Ett tyst tapp. Alla tre upsertarna sätter nu `arkiverad_at = NULL`: arkivering döljer
HISTORIK, aldrig något kunden just skickat in.

**Och min första version av den fixen var själv ett [KUND]-fel.** Väckningen låg INNE i
`ON CONFLICT`-satsen. Saknas kolumnen — glappet mellan deploy och migrering — kastar då hela
upserten, `storeAnalysis`s yttre catch returnerar `null`, och **kundens faktura landar aldrig i
rummet**. Det är pdf_hash-fallet 10 september ordagrant: kod före sitt schema, ett tyst tapp som ser
ut som att inget hände.

Väckningen bor nu i en egen fail-open hjälpare:

```js
async function vackArkiverad(db, hashedFp, pdfHash) {
  if (!db || !hashedFp || !pdfHash) return;
  try {
    await db`UPDATE invoice_analyses SET arkiverad_at = NULL
             WHERE fingerprint = ${hashedFp} AND pdf_hash = ${pdfHash} AND arkiverad_at IS NOT NULL`;
  } catch { /* kolumn ej migrerad än → inget arkiv finns att väcka */ }
}
```

**Regeln som föll ut och skrevs in i bibeln:** *en huvudinsert får aldrig bero på en kolumn som
kanske inte är migrerad — valfria kolumner skrivs i egna satser med egen catch.*

---

## Punkt 3 — Täckningspåståendet, och enheten jag ändrade

### Fables argument, som jag köpte rakt av

> Tystnad kan aldrig bevisas fel, alltså är den den bekvämaste positionen för den som är rädd för
> regel 3 — och den kostar kunden, inte oss.

När cellen inte bär redovisar rummet nu **underlaget** i stället för att gå tyst.

### ⚠️ Men enheten är MÄTT, inte vald — och det är den enda halvan vi var oense om

Ordern löd *«Vi bevakar X BOLAG i denna kategori»*. **Det talet finns inte.**

`invoice_datapoints` bär: `category · supplier · annual_cost · industry · size_bucket · source ·
created_at · per_user_monthly_exvat · tier · pdf_hash`. **Ingen kundidentitet** — anonymiserad by
design.

Ett bolagstal härlett ur radantalet hade varit exakt den sjukdom kortet finns MOT: 33 rader i
`bredband·byraer·small` är **bevisat inte** 33 bolag, eftersom 288 av 297 rader saknar bevisad
dokumentidentitet. Ett osourcat tal i just det kort som byggts för att vara ärligt om tunn data hade
varit självmotsägande.

Kortet säger därför vad vi KAN belägga:

> **«Vi har 24 prispunkter i den här kategorin — men bara 2 skilda belopp.»**
> Lagrade prispunkter · observationer · **24**
> Varav skilda belopp · vår tröskel: 10 · **2**
> *Talen är vad vi faktiskt lagrat i den här cellen — **inte antal bolag**.*

Regel 3 känner ingen avvägning, inte ens när formuleringen kommer uppifrån. Motståndsplikten gäller
mig själv (bibeln, 18 augusti).

### Kortet är SETT, inte bara byggt

Regel 8: lokal rendering mot det byggda paketet, mobil 390 px
(`ops/rum-prisboken/tackningskortet-390.png`). **Renderingen fällde ett verkligt fel:**
sektionsvillkoret kände inte till kortet, så det försvann i exakt det läge det finns för.

*En deklaration som ingen yta frågar — för andra gången på två dygn.*

---

## Granskningen: BLOCKERAR, tre [KUND]

Enligt Bevisplikten p.1 gick bygget till en separat granskning före merge. Domen var **BLOCKERAR**,
och alla tre fynden var samma sjukdom — bibelns egen 19-augustiregel bruten i samma andetag som jag
citerade den:

> *En fix som inte följs till alla konsumenter är en halv fix — grep:a funktionsnamnet, inte bara
> ytan som råkade avslöja felet.*

**Jag grep:ade `storeDatapoint` och aldrig `invoice_analyses`.**

| # | Fynd | Varför det är [KUND] |
|---|---|---|
| 1 | **Moaten var öppen via en annan tabell.** Grinden satt på `storeDatapoint` (→ `invoice_datapoints`). Men `invoice_analyses` är en EGEN prisbokskälla med **lägre** tröskel: **5 mot 10**. | Den väg jag lämnade öppen var **lättare att förorena** än den jag just stängde. Exakt den skada commiten påstod sig ha löst. |
| 2 | **Arkiveringen var en lögn i fyra ytor.** Filtret satt i **2 av 11** kundsynliga läsvägar. | Månadsbriefingen, avtalspåminnelserna (60/30 dagar + självläkningsgrenen), utfallsenkäten och prislarmens mottagarlista kunde alla **mejla kunden om rader hen fått veta var borttagna**. |
| 3 | **Kohorträknarna räknade testytan som ett bolag** i «X av Y i er bransch». | Ett kundsynligt tal blir fel. |

### Svaret var inte elva lappar

Varje läsväg mot liggaren bär nu en markör som säger vad den ÄR, och `tests/liggarvillkor.mjs`
(LV-01..05) kräver klassens villkor:

```
-- liggare: kundvy            → MÅSTE bära `arkiverad_at IS NULL`
-- liggare: moat              → MÅSTE utesluta testidentiteten, via testytans EGNA konstant
-- liggare: internt: <skäl>   → inget krav, men skälet måste stå skrivet
```

**29 läsvägar i 14 filer klassade** — inte bara de elva granskaren namngav. Fördelning: 17 `kundvy`,
5 `moat`, 10 `internt` (varav 3 i regelns egen dokumentation).

**Den tolfte konsumenten hittas alltså av en maskin, inte av nästa granskare.**

LV-05 bär ett motprov: det måste FINNAS interna undantag, annars vaktar testet ingenting.
LV-04 kräver att moat-spärren **importerar** testytans konstant — en kopierad sträng glider isär.

---

## Mätvärden

| | |
|---|---|
| Rader i `invoice_datapoints` | 297 |
| Rader med **bevisad** dokumentidentitet | 9 |
| Permanent spårlösa (motparten rensad) | **288 (97 %)** |
| Prisbokskällor som nu bär testidentitetsspärr | **2 av 2** (`invoice_datapoints` + `invoice_analyses`) |
| Kundsynliga läsvägar med arkivfilter | **17 av 17** (före granskningen: 2 av 11) |
| Klassade läsvägar mot liggaren | **29** i 14 filer |
| Anropare som testidentitetsgrinden fällde direkt | 3 |
| Nya tester | TI-01..08 · LV-01..05 |
| Sabotage som fällde | **16 av 16** (11 i `6cd359f`, 5 i `409b138`) |
| Svit | 2 345/2 345 |

---

## Fel jag gjorde i det här passet, redovisade

Bevisplikten kräver att de står skrivna, inte att de aldrig hände.

1. **Elva konsumenter, inte två.** Bruten regel, citerad i samma session. Rättad med en maskinvakt i
   stället för med disciplin.
2. **`arkiverad_at = NULL` inne i `ON CONFLICT`.** Hade tappat kundens faktura vid ett
   deploy/migrerings-glapp. Flyttad till fail-open hjälpare.
3. **Sektionsvillkoret kände inte till täckningskortet.** Kortet försvann i exakt det läge det finns
   för. Fångat av renderingen, inte av sviten.
4. **En backtick i en SQL-kommentar** avslutade JS-mallen och sänkte `lib/benchmark.js` — kommentaren
   bröt koden.
5. **Vakten fällde regelns egen dokumentation.** `lib/liggarvillkor.js` CITERAR frasen i sin
   förklaring. Uteslutningen är namngiven, inte mönsterbaserad — `strippaStrangar` är fel verktyg
   här, eftersom satserna vi vaktar ÄR mallsträngar. Uttalad blindfläck: prosa i en annan fil ger
   fortfarande falsklarm, men ett falsklarm är högljutt och en tyst miss är den farliga riktningen.
6. **Ett importinfogande som letade «sista raden som börjar med import»** kan landa mitt i en mall.

---

## Öppet — vad som INTE är klart

| Post | Status | Ägare |
|---|---|---|
| **Andra blicken på `409b138`** | ❌ Inte körd. Commiten rör `lib/` och `api/` → får per Bevisplikten p.1 inte merga till `main` utan en separat granskning. | Jag, på ditt ord |
| **Migreringen i produktion** | ❌ `arkiverad_at` ägs av `scripts/migrate.mjs` och måste köras. Självläkningen täcker bara deploy-glappet för läsvägen, inte skrivningen. | Kan köras härifrån |
| **Skopvakten står på fel katalog** | ❌ Skannar `api/lib/agents`, inte `src/`. Ommätt 2026-09-12 med `eslint --rule no-use-before-define` (default: functions + classes + variables): **11 träffar i `src/`** över 4 filer (8 i `TestaFaktura`), **27 i `api/` + `lib/`** över 11 filer (8 i `invoice-history`, 5 i `business-intel`). Det var precis den formen som gav vitt rum i produktion. | Nästa uppgift |
| **`CRON_SECRET`** | ❌ Öppen sedan 16 augusti. Måste sättas i Vercel OCH som GitHub-hemlighet. Kan inte göras med verktygen härifrån. | Grundaren |
| **`bredband` utan jämförelsegolv** | ❌ Cellen faller till total tystnad — prisboken saknar ett rikstäckande bredbandspris («priset beror på vilket NÄT som når adressen»). Fables svar på fråga 2 pekar på ett adressbaserat ankare via `tele2Verified`. Inte byggt. | Beslut krävs |

### Uttalade okända

- Dokumentidentiteten för 288 datapunkter är **permanent** okänd. Ingen kod kan laga det bakåt;
  `pdf_hash` + unikt index stänger det framåt.
- Liggarvakten läser **markören, aldrig innebörden**. En läsväg som FELklassas som `internt` med ett
  rimligt skäl passerar. Samma gräns som vaktkontraktet: maskinen ser att svaret finns, aldrig att
  det är sant.
- Vaktens räckvidd är `api/` + `lib/`. En läsväg i ett skript, eller via en framtida vy med annat
  namn, ligger utanför.

---

## Bibeln — fyra nya block

`CLAUDE.md` uppdaterades i samma commits som koden (bibeln är kod, inte dekoration):

1. **Tre defensiva grundarbeslut** — testidentiteten, arkiveringen, täckningspåståendet, med
   enhetsinvändningen utskriven.
2. **Granskarens dom** — elva konsumenter, klassningen, de tre småfelen.
3. **Ett skydd bakom ett annat skydd är inte två lager — det är ett** (tre döda vakter på ett dygn).
4. **En deklaration som ingen konsument frågar är ingen deklaration** — ett trevärt tillstånd får
   aldrig läsas av en tvåvägsgren.

---

*Rapporten är skriven efter att arbetet körts, aldrig före (Bevisplikten). Varje tal ovan kommer ur
en mätning eller ur commit-historiken — inget är uppskattat.*
