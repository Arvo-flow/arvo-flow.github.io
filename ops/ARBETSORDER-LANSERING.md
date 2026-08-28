# Arbetsorder: lanseringsblockerarna — Fable 5 → Opus 5

> **Skriven av Fable 5, 2026-08-24, som kirurgisk specifikation.** Opus 5 bygger; varje
> designbeslut nedan är redan fattat och MOTIVERAT, så bygget ska inte behöva en andra
> granskningsvända. Bevisen bakom varje påstående ligger i `ops/obduktion/spana-price-alert.md`
> (H2 och H5) med agentens körda utfall som facit. Avvik från ordern bara om koden motbevisar
> den — och skriv i så fall varför, i samma commit.

## Bärande princip (styr båda fixarna)

**Kundmailet får ALDRIG ställa lägre beviskrav än prisboken.** I dag är det bakvänt:
verifieringsjuryn (`lib/price-verdict.js` — konfidens ≥ 0,85, stabilitet över ≥2 nätter,
konsensus) gatar vad vi skriver till vår EGEN databas, medan kundmailet konsumerar Haikus råa
JSON ogranskat. Regel 3 + juryns egen asymmetri-motivering säger motsatsen.

---

## Blockerare 1 · Haiku-svaret valideras aldrig (H2, sju bevisade grenar A–G)

### Fixdesign — `lib/larmunderlag.js` (NY, ren funktion)

`bedomLarmunderlag(haiku, { oldPrice, newPrice })` → `{ niva, skal }` där `niva` är exakt en av:

- **`avvisad`** — `actionRequired === 'false_positive'`. Inget mail (som i dag).
- **`verifierad`** — ALLA krav uppfyllda (lista nedan). Mail med kr/år-tal.
- **`obekraftad`** — allt annat. **INGET kundutskick.** Loggas `[larmunderlag]` med skälet,
  räknas (sondbart fält i rapporten). Motivering: mailet är vår mest proaktiva yta; juryn
  bekräftar ändå inom 1–2 nätter via verify-vägen, och en dags fördröjning kostar inget medan
  ett påhittat tal kostar allt. Hellre »(saknas)« än fel SKU — Copilot-fällans regel.

Krav för `verifierad` (varje brutet krav → `obekraftad` med namngivet skäl):

1. `haiku` finns. (Fall A: `undefined !== 'false_positive'` släppte igenom "AI:n svarade inte"
   som "AI:n bekräftade" — felfamiljen ordagrant.)
2. `actionRequired` är uttryckligen larm-värdet — `verify_manually` betyder "manuell koll
   krävs" och får ALDRIG bli "Arvo har detekterat en prishöjning". (Fall B.)
3. `confidence >= samma tröskel som juryns gConfidence`. **Importera konstanten från
   `lib/price-verdict.js` — kopiera den inte.** En kopia kan glida (regel 1). (Fall B.)
4. `extractedNumeric` är ett finit tal > 0. (Fall F: tom sträng.)
5. `extractedUnit` finns och har en EXPLICIT case i `toKrPerSeatMonth`. `default`-grenen i
   `lib/price-impact.js` ska bli ODÖMBAR (`return null`), aldrig "anta kr/säte/mån" —
   `percentage` står i promptens egen enum och blev kronor (fall C/D/G). Anropare hanterar
   null → `obekraftad`.
6. Valuta NORMALISERAS (`toUpperCase().trim()`) före jämförelse; okänd valuta → `obekraftad`.
   (Fall E: `'usd'` ≠ `'USD'` VÄNDE TECKNET — en höjning blev "Tele2 sänkte priset".)
7. **Tecknet härleds ur talen, aldrig ur texten:** `newPrice > oldPrice` ⇒ höjning. Om Haikus
   riktningsord motsäger de omräknade talen → `obekraftad` (motsägelse = okänt, inte ett val).

### Konsumenter — BÅDA vägarna i samma commit (regel 5, dubbla alertvägar)

`scripts/notify-price-changes.mjs` (LIVE-routad via price-monitor.yml) och
`api/cron/run-price-alerts.mjs`. Grinden ligger i lib — vägarna får inte få varsin kopia.

### Syskonfall som SKA köras innan fixen kallas klar

- `buildPriceAlertInsight` (briefing-insikten i notify-vägen) — konsumerar samma haiku; gata
  identiskt.
- `parseCheckPrice`-asymmetrin: procent/intervall avvisas på GAMLA priset men accepterades på
  det nya — verifiera att punkt 5 stänger båda sidorna av subtraktionen.
- Grep `toKrPerSeatMonth` — varje anropare måste tåla null.

### Testkrav — `tests/larmunderlag.mjs`

Fallen A–G ur H2 som fixturer, ordagrant med agentens värden (de är redan körda facit).
Assertera BÅDE nivån och att skälet namnges. Motprov: ett komplett, konfident, konsistent
haiku-svar → `verifierad` (en grind som fäller allt är ingen grind, OB-23).
**Sabotage som måste fälla:** (a) tröskeln kopieras i stället för importeras och glider,
(b) `toUpperCase` tas bort, (c) `default: return kr` återinförs i price-impact,
(d) `undefined !== 'false_positive'`-filtret återinförs.

---

## Blockerare 2 · Golvet mäter kundens produktval, inte kundens pris (H5)

### Fixdesign — `lib/price-alert.js:31`

`ORDER BY price_monthly ASC LIMIT 1` hämtar kategorins billigaste produkt oavsett vad kunden
har: en kund på E3 som betalar EXAKT sitt listpris flaggas +571 % mot Basic. Detta är
E3/E5-fyndet (20 aug) i en modul som aldrig fick spärren.

1. Jämför mot kundens EGEN produkts listpris när nivån är bekräftad (samma nivåkälla som
   LFL/licensnivå använder — regel 1, ingen ny tier-läsning).
2. Utan bekräftad nivå: **`overListPrice: null, percentOver: null`** — fakta står kvar
   (`verifiedProduct`, kundens pris), PÅSTÅENDET uteblir. Exakt `kraverBekraftadNiva`-mönstret;
   läs deklarationen ur prisboken (branchindex), hårdkoda inte per kategori. Mobil (uppmätt
   spann 1,1×) får behålla kategorigolv; saas (9,6×) kräver nivå — spärren är MÄTT, inte tyckt.
3. Fältet konsumeras i dag av ingen yta — men det är serialiserat och redo för första ytan som
   läser det, samma klass som `recommendationType:'switch'`-latensen. Fixas FÖRE lansering.

### Syskonfall

- Grep `ORDER BY price_monthly` + varje läsare av `supplier_prices`-minimum i samma fil
  (`getMarketIntelligence`!) — samma sjukdom, samma dom.
- Motprov: Basic-kunden (som i dag får `null`) ska förbli oförändrad, och en kund 30 % ÖVER
  sin bekräftade nivås listpris ska fortfarande flaggas.

### Testkrav — utöka `tests/`, fyra seed-raderna ur H5 som fixturer

E3-kund på exakt listpris → `percentOver: null` (aldrig 571). Sabotage: `ASC LIMIT 1` utan
nivåkrav återinförs → fäller.

---

## Beslutspunkt som är GRUNDARENS, inte kodens

`INBOUND_RATE_LIMIT_PER_DAY = 40` vs löftet "50–100 fakturor på en gång". Tjugo testkunder
som tömmer pärmen dag ett träffar taket. Alternativ: (a) höj till ~150 under testperioden,
(b) ändra löftescopyn. Endera är en enradsändring — men valet är affär, inte teknik.

## Acceptansgrind före 5-kundersvågen (definition av klart)

1. A–G: noll av sju producerar ett kr/år-tal eller ett kundmail. Motprovet producerar ett.
2. E3-fallet: `percentOver: null`. Basic-fallet: oförändrat.
3. Sviten grön; VARJE angivet sabotage fäller (en vakt vars sabotage inte fäller är ingen vakt).
4. Live-verifiering (VP p.2 — Opus kör): riktiga pipelinen mot produktion + skärmdump av
   rummet i 390 px och 1 600 px. Användaren är aldrig vår QA.
5. Rate-limit-beslutet fattat och implementerat.

## Rollfördelningen framåt (kreditekonomi)

- **Opus 5:** bygger denna order, kör syskonfallen och sabotagen själv (regeln står i bibeln),
  live-verifierar, lanserar våg 1 (5 kunder), motprövar återstående hypoteser, sveper de 15
  områdena.
- **Fable 5** kallas in ENDAST vid: (1) nästa frysta kontrollpunkt — efter våg 1-lanseringen,
  med verklig kunddata i rummet; (2) sömdesignen för `api/test-invoice.mjs` (strukturbeslut);
  (3) om ett fynd motsäger bibeln och kräver kontraktsändring. Inte för implementation, inte
  för rutingranskning — ordern ovan ÄR granskningen, flyttad före bygget i stället för efter.
