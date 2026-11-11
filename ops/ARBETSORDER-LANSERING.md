# Arbetsorder: lanseringsblockerarna — Fable 5 → Opus 5

> **Skriven av Fable 5, 2026-08-24, som kirurgisk specifikation.** Opus 5 bygger; varje
> designbeslut nedan är redan fattat och MOTIVERAT, så bygget ska inte behöva en andra
> granskningsvända. Bevisen bakom varje påstående ligger i `ops/obduktion/spana-price-alert.md`
> (H2 och H5) med agentens körda utfall som facit. Avvik från ordern bara om koden motbevisar
> den — och skriv i så fall varför, i samma commit.

## Sekvensen för Opus 5.5: från PR #85 till färdig våg 1 (avläst 2026-11-11)

Grundarorder 11 nov (`CLAUDE.md`, överst): Opus 5.5 i Cursor verkställer hela listan självgående. Opus
frågar aldrig och mergar genom Grinden.

**Var koden står.** `main` står på e5733f3a. Steg 1–3 är mergade och görs inte om. Steg 4 ligger omergat
på grenen `claude/fable-5-resume-i60dmd` (mekanikcommit a649404b, sex granskningar, alla BLOCKERAR).
**Opus börjar på steg 4.**

**Var orderna står.** Ordern för varje steg, med besluten redan fattade, står i `ops/KORPLAN-VAG1.md`
(S1–S9). Körcykeln för en PR står i `ops/BYGGARRUTIN.md`. Varje granskningsfynd står i
`ops/ARBETSORDER-VAG1.md`.

**Regeln mellan stegen.** En PR i taget, med ett enda påstående. Auto-merge slås på när PR:en öppnas,
och den mergas när Grindens fyra kontroller är gröna. Driftsättningen läses av. Sedan nästa steg, i
samma körning. [VAKT]-fynd har inget eget steg: de lagas i den PR som ändå rör filen.

| Steg | Vad | Läge 11 nov | Order | Klart när |
|---|---|---|---|---|
| 1 | Prisboken: Tele2 +40 kr, en prisbok, vakterna framåt | **KLART.** PR #86, mergad 23 okt (5e73c277). Görs inte om | – | – |
| 2 | Databasen och skripten: `supplier_prices` städad (46 → 0 rader), `apply-price-proposals.mjs` borta | **KLART.** PR #87, mergad 23 okt (4f8f2326), körd på main (40352850116) | – | – |
| 3 | Licenstaket per nivårad (T-2) | **KLART.** PR #88, mergad 3 nov (1677f2bd) | – | – |
| 4 | Kunddelen, c1: mobilscoren. En mobilfaktura får inget byte, inget avstånd och ingen poäng i någon yta förrän abonnemanget är bekräftat | **PÅGÅR. Börja här.** Byggs om enligt ordern: instrumenten FV och RM först, sedan L1–L6 | KORPLAN S1 | Instrumenten gröna, sju sabotage fäller, sjunde granskningen säger MERGAS, PR:en är mergad, och `diag-live` visar en mobilfaktura utan byte och en bredbandsfaktura med byte |
| 5 | Kundsynlighetssvepet: vilka loggade fel möter en kund i dag. Ingen PR | inte påbörjat | KORPLAN S2 | Varje rad i S2:s tabell är avläst, med motprov |
| 6 | Fakturavyns rubrik följer resultatets läge (Q-7) | inte påbörjat | KORPLAN S3 | Rubriken slås upp per lägeskod, renderad i 390 och 1600 px, mergad |
| 7 | Rummets bytesrad: «X % mer» mot jämförelsepriset (C1-4), golvet med analysdatum (K-5) | inte påbörjat. Utkastet till K-5 förlorades 5–9 nov | KORPLAN S4 | Grundarens exempel ger 30 %, inte 23 %, och PR:en är mergad |
| 8 | Kunddelen, c2: prislarmet på briefingsidan (LA-K1) | inte påbörjat. Bygget förlorades 5–9 nov, ritningen står i ordern | KORPLAN S5 | LB-01..04 gröna, månadsbriefen oförändrad, mergad |
| 9 | Kunddelen: dörrens kort och mobil i blandade fakturor. Ingen väg räknar ett mobilbyte eller ett mobilavstånd mot det billigaste abonnemanget | inte påbörjat. Om dörren visar felet i dag är inte mätt: det läses av i steg 5 | KORPLAN S6 och S2-raden «C1-3-resten» | Spegelfallet stängt genom ett deltabevis, dörren och prospektet utan mobilavstånd, mergad |
| 10 | Tele2 bredband: kampanj eller listpris. Källan visade 26 okt 199/239/279/279, boken står på 239/279/319/319 | inte påbörjat | nedan | Prövat i Actions, och boken eller vakten följer utfallet |
| 11 | Avtalstexten och integritetstexten säger vad systemet gör. Två PR:er: mekanismen för avidentifiering först, texterna sedan | inte påbörjat | KORPLAN S7 | KM-05 skannar villkoren utan undantag, båda PR:erna mergade |
| 12 | Live-verifieringen: acceptanspunkt 4 nedan | DEL L och rummet avlästa 16 okt, DEL G inte mätt | KORPLAN S8 | S8 punkt 1–6 avlästa mot produktionen |
| 13 | Våg 1-grinden | inte påbörjat | KORPLAN S9 | G1–G7 gröna, var och en med kommando och motprov |
| 14 | Våg 1: fem kunder bjuds in och beviljas premium | grundarens handling | – | Därefter fryst kontrollpunkt 1: Fable kopplas in, med verklig kunddata i rummet |

**Steg 10, ordern.** Pröva i ett arbetsflöde på main om Tele2:s API märker priset som kampanj. Det går
inte att köra från en sandlåda. Bibelns regel från HubSpot gäller: det högsta priset i ett block är
listpriset, och en kampanj kan bara ligga under.
- Är det en kampanj: boken står kvar, och vakten lär sig skilja kampanj från listpris, så att den slutar
  larma på kampanjen.
- Är det listpriset: boken följer källan. De 55 fixturerna flyttas genom ett deltabevis, aldrig för hand,
  och gränsfixturerna behåller sin tröskel (BI-11).

Riktningen i dag är den försiktiga: boken ligger över källan, så en besparing mot Tele2 blir mindre,
aldrig större.

**Det bara grundaren kan göra** står under «Grundarens åtgärder» i `ops/KORPLAN-VAG1.md`. Inget av det
stoppar bygget.

## Läge (avläst 2026-10-16, fabrikssvepet)

| Acceptanspunkt | Läge | Avläst |
|---|---|---|
| 1 · A–G tiger, motprovet larmar | klar | LU-01..15 · båda vägarna går genom `bedomLarm` (BL-05) |
| 2 · E3 `null`, Basic oförändrat | klar, och nu beteendebevisad | LU-19..21 |
| 3 · sviten grön, varje sabotage fäller | klar för golvet först nu | se nedan |
| 4 · live mot produktion + rummet 390/1600 | DEL L och rummet klara, DEL G efter merge | se nedan |
| 5 · rate-limit-beslutet | klar | 966a3e16: 40 → 150 per avsändare och dygn |

- **Punkt 2 och 3 var gröna på fel grund i sju veckor.** LU-16..18 läste bara källtext, och
  kommentaren sa att SQL-grenen «prövas av sonden». Någon sådan sond fanns inte. Med `AND tier = …`
  bortplockat ur frågan föll 0 av 36 tester, alltså var orderns eget sabotage («`ASC LIMIT 1` utan
  nivåkrav återinförs → fäller») aldrig uppfyllt. `detectPriceAlert` tar nu en injicerad databas, och
  LU-19..21 kör seed-filens Microsoft-rader genom den.
- **Punkt 4, larmvägen live.** De fem senaste nattliga prisvaktskörningarna på main
  (38187249578 … 38824254504) gav 14 larm per natt, 0 verifierade och 0 kundmejl. Skälen var
  `action_verify_manually` (10–12 per natt) och `gammalt_pris_saknas` (2–4). `scripts/probe-larmacceptans.mjs`
  DEL L kör det riktiga `notify-price-changes.mjs` utan hemligheter: de sju tysta svaren ger 0 av 7,
  och motprovet ger 1, som stannar vid den saknade Resend-nyckeln.
- **Punkt 4, golvet live (DEL G) är inte mätt.** Det kräver `DATABASE_URL`, och produktionsmiljön
  startar bara på main. Kör `probe-larmacceptans` efter merge. Den skriver också ut produktionsrader
  vars nivå ingen faktura kan bevisa.
- **Punkt 4, rummet.** `https://arvoflow.se/portfolio` skärmdumpades i 390 och 1600 px den 16 okt,
  som en ny besökare ser det. Ingen ändring i den här ordern når rummet: `priceAlert` läses i dag av
  ingen yta i `src/`.
- **Kvar efter ordern:** «lanserar våg 1 (5 kunder)» är grundarens drag, inte kodens.

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

> **11 nov: exekveringsmodellen är en överordnad grundarorder** (`CLAUDE.md`, överst). Opus 5.5 i Cursor
> verkställer sekvensen överst i den här filen, steg 4–13, självgående. Fable 5.2 kopplas bara in vid de
> tre frysta kontrollpunkterna nedan: (1) efter våg 1, (2) sömdesignen för `api/test-invoice.mjs`,
> (3) en olöslig konflikt mot bibeln. Raderna nedan är ordern som den skrevs 24 aug.

- **Opus 5:** bygger denna order, kör syskonfallen och sabotagen själv (regeln står i bibeln),
  live-verifierar, lanserar våg 1 (5 kunder), motprövar återstående hypoteser, sveper de 15
  områdena.
- **Fable 5** kallas in ENDAST vid: (1) nästa frysta kontrollpunkt — efter våg 1-lanseringen,
  med verklig kunddata i rummet; (2) sömdesignen för `api/test-invoice.mjs` (strukturbeslut);
  (3) om ett fynd motsäger bibeln och kräver kontraktsändring. Inte för implementation, inte
  för rutingranskning — ordern ovan ÄR granskningen, flyttad före bygget i stället för efter.
