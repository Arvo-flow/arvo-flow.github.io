# Granskning — den juridiska karantänen och tystnadens skäl

commits: cd39552..91e22ac
datum: 2026-09-18
dom: MERGAS

**Granskare:** grundaren, som andra blick enligt Bevisplikten p.1.
**Byggare:** Opus 5.

---

## Varför den här filen ser ut som den gör

Den tillsatta granskaragenten **dog på sessionsgränsen** efter fråga 1 av 4, med raden
«Q1 confirmed» och NOLL fynd på disk. Den raden är tvetydig — bekräftad som i *fyndet finns*
eller *gränsen håller*? — och ett sådant utfall får aldrig läsas som en mätning. Frågorna
mättes därför om från grunden, av byggaren, med körbara sonder i stället för prosa.

Grundaren läste obduktionerna och tog granskaransvaret formellt:

> «Jag agerar den andra blicken. Sabotagen fäller. Gränserna håller. Jag bär ansvaret för att
> bevisplikten är formellt uppfylld.»

**Det är en avvikelse från normalformen och ska stå skriven som en sådan:** en separat modell
granskade inte den slutgiltiga koden. Fyra av de sex fynden nedan satt i byggarens egna vakter,
vilket är precis den risk en extern blick finns för. Grundaren har vägt det och tagit beslutet.

---

## Fynden — alla mätta, inga antagna

### ⚖️ [KUND] Q1 · 600 av 720 försäkringsfakturor undslapp karantänen

Karantänen låg INNE i `no_benchmark`-grenen — ett fall bland tolv i en if/else-kedja.
Mätt med 15 verkliga svenska försäkringsbolag × 11 triage-skäl (härledda ur
`api/test-invoice.mjs`) × 2 rutter × 2 kategorier:

```
600 av 720 kombinationer fick ett ANNAT kort än karantänens.
```

Flera lovade dessutom något: *«En människa läser om fakturan och vi återkommer med rätt
jämförelse»* på en försäkringsfaktura är ordagrant det lagbrott karantänen byggdes mot.

**Åtgärd:** förkontrollen ligger nu överst i `watchedCard` och returnerar direkt. En
regulatorisk gräns kan inte vara ett fall bland andra — den är den första frågan.
**Lås:** BK-13 sveper hela korsprodukten; skällistan härleds ur produktionskoden.
**Sond:** `scripts/probe-karantanslacka.mjs`, körbar.

### [KUND] Q2 · uppmaningen var backad i datalagret men inte i gränssnittet

`Watched`-blocket bär **0 input · 0 button · 0 onClick · 0 länk**. En kund som läste «Säg till
när avtalet löper ut» hade ingenstans att säga det. Datalagret höll (`save-contract` →
`contract_end_date` → `send-reminders` utan route-filter) — men datalagret är inte produkten.

**Åtgärd:** de tre bevakningsklasserna bär ingen åtgärd alls; kortet är ett konstaterande.
Pilen renderas bara när en åtgärd finns. Karantänens «Ligger hos er försäkringsförmedlare»
står kvar — den pekar bort, inte hit.
**Syskonfynd:** manifestet två rader ovanför lovade *«säger till när underlaget bär»*. Ingen
cron läser `triage_reason`. Struket i samma pass.
**Lås:** TS-08 vändes — den KRÄVDE förr löftet, den FÖRBJUDER det nu.

### [KUND] Q3 · nio skältyper lovade «vi återkommer»

`notifyReviewQueue` larmar OSS, aldrig kunden. Sju skältyper × 17 kategorier bar löftet.
**Åtgärd:** struket. «En människa läser om fakturan» är sant och står kvar.
**Motprov:** *«vi prissätter så snart ett verifierat golv finns»* STÅR KVAR — den är backad av
konstruktionen, eftersom underlaget byggs vid LÄSNING. Regeln gäller löften utan mekanik,
inte alla löften. BK-14 låser skillnaden.

### [KUND] Q4 · pillret kunde säga «Rätt prissatt» ovanför «därför prissätter vi inte»

`saas-crm` är tyst men har ett branschankare, alltså kunde den få ett prisunderlag.
**Åtgärd:** revisionsgrinden gäller hela vägen — `underlagForRad` returnerar null för en tyst
kategori. Motsägelsen är inte längre ett tillstånd koden kan uttrycka.

### [VAKT] · BK-15 var grön på fel grund

Testet byggde sin EGEN kopia av grinden. Båda sabotagen mot produktionens rad fällde noll —
«mekanismen prövad, matningen aldrig», i testet som skulle vakta just den sjukdomen.
**Åtgärd:** grinden bor i EN exporterad funktion som både handlern och sviten kör.

### [VAKT] · sonden mätte struktur, inte beteende

`probe-karantanslacka` frågade «finns ett ankare?» i stället för «byggs ett underlag?» och
rapporterade Q4 som kvarstående efter att den var lagad.

---

## Baslinje och bevis

- `npm run test:algo` → **2415/2415**
- Sabotage denna sprint: 30+, samtliga fäller. Sju föll först noll och skrevs om.
- Regel 8: rummet fotograferat i 390 px och 1600 px efter varje ombyggnad.

## Kvarstående, uttalat

- `vaxel`/`molnvaxel` är två nycklar för samma kategori — en tyst, en talande.
- Radarn visar `Fakturor · Prissatta · Bevakade` men inte `Mottagna`; talen går inte att
  addera i huvudet. Pre-existerande.
- Gränssnittet för att lämna ett avtalsdatum på en triagerad rad finns inte. Dagen det byggs
  kan åtgärdsraden läggas tillbaka — med mekaniken, inte före den.
- `CRON_SECRET` är fortfarande inte satt (grundaråtgärd, öppen sedan 2026-08-16).
