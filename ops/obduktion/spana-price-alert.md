# Obduktion — område: price-alert

Filer: `lib/price-alert.js` · `lib/price-alert-store.js` · `api/cron/run-price-alerts.mjs`
(+ syskonvägen `scripts/notify-price-changes.mjs` och `lib/price-impact.js`, som bär samma kod)

Felfamiljen vi letar efter: *ett tillstånd som betyder "okänt / misslyckades / inte mätt",
representerat med ett värde som är omöjligt att skilja från ett giltigt svar.*

Status: PÅGÅENDE (skrivs inkrementellt).

---

## H1 — Alertmailet KRASCHAR exakt när den kollektiva sanningen finns

**Fil:rad:** `api/cron/run-price-alerts.mjs:208` (signaturen) + `:216` (användningen);
identiskt i `scripts/notify-price-changes.mjs:300` + `:349`.

**Påstående:** `buildAlertEmail(...)` läser variabeln `category`, som inte är en parameter
och inte finns i modulscopet — så i det ögonblick `segStats.total >= 3` (d.v.s. när
nätverkseffekten faktiskt bär) kastar funktionen `ReferenceError` i stället för att
rendera moat-meningen, och eftersom anropet ligger UTANFÖR try-blocket (rad 188, try
börjar rad 190) rivs hela larmkörningen: ingen kund i någon grupp får mail, och
`markAlertSent` skrivs aldrig.

**Körbart bevis:**
```
node -e "…kopiera api/cron/run-price-alerts.mjs till /tmp med absoluta lib-importer + export { buildAlertEmail }…"
node /tmp/pa/t1.mjs
```
Utfall:
```
A total=2  → OK, längd 3254
B total=14 → KRASCH: ReferenceError: category is not defined
```

**Dom:** **haller**

**Domskäl:** Utfallet är körd kod, inte läsning. `category` är block-scopad i for-of-loopen
i handlern (`for (const [, { keyword, category, items }] of alertGroups)`); en
funktionsdeklaration på modulnivå ser den aldrig. Grenen är dessutom *databeroende på ett
bakvänt sätt*: med få kunder i kategorin (`total < 3`) är `segLine` tom sträng och allt
fungerar; **ju mer nätverksdata vi samlar, desto säkrare kraschar larmet.** Exakt samma
form som ankarets "ju mer nätverksdata desto oftare tystnade moaten" (bibeln 15 aug), men
värre: här är utfallet inte tystnad utan totalt bortfall av larmet.
Kontrollprov: `buildPriceAlertInsight` i samma syskonfil TAR `category` som parameter
(`scripts/notify-price-changes.mjs:250`) — alltså är det just mail-renderaren som tappade
den, i båda kopiorna.

Sidoanmärkning (regel 1): två handskrivna kopior av samma mail-pipeline (`api/cron/…` och
`scripts/notify-price-changes.mjs`) bär samma bugg på var sitt radnummer. Den kända skulden
"dubbla alertvägar" är alltså inte bara duplicering — den har redan reproducerat ett fel.

### H1, förstärkt bevis: end-to-end i den LIVE-routade kundvägen

GH Actions kör `scripts/notify-price-changes.mjs` (`price-monitor.yml:376`), inte
`api/cron/run-price-alerts.mjs`. Hela skriptet kördes med stubbade `db`/`price-alert-store`/
`resend` (koden i skriptet självt orörd) mot en riktig rapportform:

```
# segStats.total = 14  (moaten bär)
RESEND_API_KEY=fake node /tmp/pa/notify-live.mjs /tmp/pa/report.json
  👥 1 berörd(a) kund(er)
  📊 Segmentstatistik: 8 av 14 bolag
  ReferenceError: category is not defined
      at buildAlertEmail (notify-price-changes.mjs:349:86)
      at notify-price-changes.mjs:215:18       ← utanför try → processen dör, exit 1

# segStats.total = 2  (moaten bär inte)
  📊 Segmentstatistik: 1 av 2 bolag
  [stub] MAIL SKICKAT: Tele2: +24 000 kr/år — Arvo har detekterat en prishöjning
  Klart: 1 skickade, 0 överhoppade, 0 misslyckades   EXIT=0
```

Kontrafaktiskt bevisat: **samma larm, samma kund, samma pris — enda skillnaden är hur många
bolag vi följer i kategorin.** Under tröskeln levereras larmet; över tröskeln dör körningen
och ingen kund i NÅGON grupp får sitt mail (loopen avbryts, `markAlertSent` skrivs aldrig).
Steget bär inte `continue-on-error`, så jobbet blir rött — det är den enda förmildrande
omständigheten: felet är högljutt, inte tyst. Men produkten (kundlarmet) uteblir.
