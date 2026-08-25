# Skörd: a78190dcf77f3b3fc

> **OPRÖVAD.** Det här är agentens arbete, räddat ur harnessets transkript — inte ett
> bevisat fynd. Skörden visar att arbetet UTFÖRDES; om slutsatsen är sann avgörs av
> motprövning med ett körbart bevis, precis som för varje annan hypotes.

· körning: `subagents` · agent: `a78190dcf77f3b3fc`
· slutsatser: 3 · körda kommandon: 6
· **bär analys**

## Uppdraget

```
(saknas i transkriptet)
```

## Vad agenten formulerade

### 1

I'll start by reading the bible and the target files.

### 2

Now let me check consumers and the db helper, then start the persistence file.

### 3

Two `buildAlertEmail` functions reference `category` which is not a parameter. Let me write my first observation to disk immediately, then prove it.

## Vad agenten faktiskt körde — de körbara bevisen

### Kommando 1

```bash
cat lib/db.js && echo "=== consumers detectPriceAlert ===" && grep -rn "detectPriceAlert\|getMarketIntelligence\|getAffectedCustomers\|getSegmentStats\|computeImpactKr\|parseCheckPrice" --include=*.js --include=*.mjs . | grep -v node_modules
```

```
// lib/db.js — Neon serverless Postgres client.
// Checks multiple env var names to handle different Vercel/Neon prefix configs.
// Returns null when no URL is found so callers degrade gracefully.
import { neon } from '@neondatabase/serverless';

let _sql;

export function getDb() {
  const url =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_URL_DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL;
  if (!url) return null;
  if (!_sql) _sql = neon(url);
  return _sql;
}
=== consumers detectPriceAlert ===
./src/pages/PortfolioJuli26/index.js:498:  // Ett FAKTUM (höjning + X/Y), byggt i api/invoice-history ur supplier_price_history × getSegmentStats.
./src/pages/Portfolio/index.js:558:  // Ett FAKTUM (höjning + X/Y), byggt i api/invoice-history ur supplier_price_history × getSegmentStats.
./api/test-invoice.mjs:37:import { detectPriceAlert, getMarketIntelligence } from '../lib/price-alert.js';
./api/test-invoice.mjs:1653:        detectPriceAlert({
./api/test-invoice.mjs:1658:        getMarketIntelligence({
./api/cron/run-price-alerts.mjs:19:  getAffectedCustomers,
./api/cron/run-price-alerts.mjs:20:  getSegmentStats,
./api/cron/run-price-alerts.mjs:24:import { computeImpactKr, parseCheckPrice } from '../../lib/price-impact.js';
./api/cron/run-price-alerts.mjs:96:    const customers = await getAffectedCustomers({ supplierKeyword: keyword, category });
./api/cron/run-price-alerts.mjs:102:    const segStats = await getSegmentStats({ category, supplierKeyword: keyword });
./api/cron/run-price-alerts.mjs:112:      // Deterministisk impact via parseCheckPrice + computeImpactKr
./api/cron/run-price-alerts.mjs:113:      const currentPrice = parseCheckPrice(primaryAlert?.check ?? '');
./api/cron/run-price-alerts.mjs:116:        ? computeImpactKr({
./api/cron/run-price-alerts.mjs:213:  // getSegmentStats räknar per kategori → den ärliga frasen är kategorin, aldrig "bransch"/"segment").
./api/invoice-history.mjs:10:import { getMarketIntelligence } from '../lib/price-alert.js';
./api/invoice-history.mjs:17:import { getSegmentStats } from '../lib/price-alert-store.js';
./api/invoice-history.mjs:184:  // Cross-customer-aggregat ur invoice_analyses (getMarketIntelligence gate:ar
./api/invoice-history.mjs:242:  // med nätverkets breddsignal (getSegmentStats). Ett faktum, inte en bedömning (regel 3). Zero Trust:
./api/invoice-history.mjs:425:        getSegmentStats({ category: a.category, supplierKeyword: keyword }),
./api/invoice-history.mjs:571:      const mi = await getMarketIntelligence({ normalizedSupplier, category });
./scripts/notify-price-changes.mjs:13: *   2. Hitta kunder      — getAffectedCustomers() via gate_emails JOIN invoice_analyses
./scripts/notify-price-changes.mjs:14: *   3. Segment-signal    — getSegmentStats() → "X av Y bolag vi följer för <kategori>"
./scripts/notify-price-changes.mjs:34:import { getAffectedCustomers, getSegmentStats, hasAlertBeenSent, markAlertSent } from '../lib/price-alert-store.js
```

### Kommando 2

```bash
sed -n 100,240p scripts/notify-price-changes.mjs
```

```
  }
  alertGroups.get(groupKey).items.push(alert);
}

// ── Per grupp: hitta kunder, beräkna impact, skicka mail ─────────────────────
let totalSent = 0, totalSkipped = 0, totalFailed = 0;

for (const [groupKey, { keyword, category, items: groupAlerts }] of alertGroups) {
  console.log(`\n── [${category}] ${keyword} (${groupAlerts.length} alert(ar)) ──`);

  // Idempotens: har detta alert redan skickats för denna monitor-körning?
  const alreadySent = await hasAlertBeenSent({ monitorRunId, supplier: keyword, category });
  if (alreadySent) {
    console.log(`  ⏭  Redan skickat (idempotens). Hoppar över.`);
    totalSkipped++;
    continue;
  }

  // Hitta berörda kunder
  const customers = await getAffectedCustomers({ supplierKeyword: keyword, category });
  console.log(`  👥 ${customers.length} berörd(a) kund(er)`);

  if (!customers.length) {
    await markAlertSent({ monitorRunId, supplier: keyword, category, emailsSent: 0, totalImpactKr: 0 });
    continue;
  }

  // Segment-signal: "X av Y bolag i er bransch"
  const segStats = await getSegmentStats({ category, supplierKeyword: keyword });
  console.log(`  📊 Segmentstatistik: ${segStats.withSupplier} av ${segStats.total} bolag`);

  let groupEmailsSent = 0;
  let groupTotalImpactKr = 0;

  for (const customer of customers) {
    const supplierName = displaySupplier(customer.supplier, keyword);

    const seatCount    = customer.seatCount ?? null;
    const primaryAlert = groupAlerts[0];

    // Deterministisk impact-beräkning via strukturerade prisfält från Haiku.
    // parseCheckPrice() extraherar exakt numeric+currency+unit ur check.name.
    // Haiku returnerar nu extractedNumeric/extractedCurrency/extractedUnit.
    // Inga regex, inga "× 12 om < 1000"-heuristiker.
    const currentPrice = parseCheckPrice(primaryAlert?.check ?? '');
    const haiku        = primaryAlert?.haiku ?? null;
    const impact = currentPrice && haiku?.extractedNumeric != null
      ? computeImpactKr({
          currentNumeric:  currentPrice.numeric,
          currentCurrency: currentPrice.currency,
          currentUnit:     currentPrice.unit,
          newNumeric:      haiku.extractedNumeric,
          newCurrency:     haiku.extractedCurrency ?? currentPrice.currency,
          newUnit:         haiku.extractedUnit     ?? currentPrice.unit,
          seatCount,
          fxRates: null, // fallback: 10.42 kr/USD i lib/price-impact.js
        })
      : null;

    const impactKrYear = impact?.impactKrYear ?? null;
    if (impactKrYear) groupTotalImpactKr += Math.abs(impactKrYear);

    // Skapa magic token och briefing_reports-rad
    let briefingUrl = `${BASE_URL}/testa-faktura`;
    if (db) {
      try {
        const token      = crypto.randomBytes(32).toString('hex');
        const expires    = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 dagar
        const tokenNote  = `price-alert:${monitorRunId}:${keyword}`;

        const tokenRows = await db`
          INSERT INTO magic_tokens (token, email, 
```

### Kommando 3

```bash
grep -n "function buildAlertEmail" -A 40 scripts/notify-price-changes.mjs | head -60
```

```
300:function buildAlertEmail({ customer, supplierName, groupAlerts, segStats, impact, briefingUrl, date }) {
301-  const brand   = '#1B7A6E';
302-  const brandDk = '#1B6E66';
303-  const ink     = '#0E1A17';
304-  const muted   = '#5C6E68';
305-  const bg      = '#F1F6F3';
306-  const border  = '#D5E2DC';
307-  const white   = '#FFFFFF';
308-
309-  const isIncrease     = impact ? impact.impactKrYear > 0 : true;
310-  const impactKrYear   = impact?.impactKrYear ?? null;
311-  const hasExactImpact = impact != null && impactKrYear != null;
312-  const primaryAlert   = groupAlerts[0];
313-
314-  // Hero-block: exakt kr/år + breakdown om vi har siffror
315-  const heroBlock = hasExactImpact ? `
316-    <table width="100%" cellpadding="0" cellspacing="0"
317-      style="background:${isIncrease ? '#FEF2F2' : '#F0FDF4'};border:1px solid ${isIncrease ? '#FECACA' : '#BBF7D0'};border-radius:12px;margin:0 0 24px;overflow:hidden">
318-      <tr><td style="padding:20px 24px">
319-        <p style="margin:0 0 2px;font-size:11px;font-weight:700;color:${isIncrease ? '#991B1B' : '#166534'};text-transform:uppercase;letter-spacing:.1em">
320-          ${isIncrease ? 'Bekräftad prishöjning' : 'Prissänkning'}
321-        </p>
322-        <p style="margin:0 0 12px;font-size:36px;font-weight:800;color:${ink};letter-spacing:-.04em;line-height:1">
323-          ${isIncrease ? '+' : ''}${fmt(impactKrYear)} kr/år
324-        </p>
325-        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
326-          <tr>
327-            <td style="padding:4px 12px 4px 0;font-size:13px;color:${muted}">Gammalt pris</td>
328-            <td style="padding:4px 0;font-size:13px;font-weight:600;color:${ink}">${impact.oldKrMonth} kr/säte/mth</td>
329-          </tr>
330-          <tr>
331-            <td style="padding:4px 12px 4px 0;font-size:13px;color:${muted}">Nytt pris</td>
332-            <td style="padding:4px 0;font-size:13px;font-weight:700;color:${isIncrease ? '#991B1B' : '#166534'}">${impact.newKrMonth} kr/säte/mth (${isIncrease ? '+' : ''}${impact.deltaPct}%)</td>
333-          </tr>
334-          <tr>
335-            <td style="padding:4px 12px 4px 0;font-size:13px;color:${muted}">Er flotta</td>
336-            <td style="padding:4px 0;font-size:13px;color:${ink}">${impact.seats} licenser × ${Math.abs(impact.deltaKrMonth)} kr/mth × 12</td>
337-          </tr>
338-        </table>
339-      </td></tr>
340-    </table>` : `
```

### Kommando 4

```bash
sed -n 340,420p scripts/notify-price-changes.mjs
```

```
    </table>` : `
    <p style="margin:0 0 20px;font-size:15px;color:${ink};line-height:1.65">
      Arvo bevakar era leverantörskostnader nattligen. Vi har detekterat en förändring
      hos <strong>${supplierName}</strong> och kontaktar er innan det syns på er faktura.
    </p>`;

  // Segment-signal: nätverkseffekten som gör Arvo unik
  const segBlock = segStats.total >= 3
    ? `<p style="margin:0 0 24px;padding:14px 18px;background:#EEF9F7;border-left:3px solid ${brand};border-radius:0 8px 8px 0;font-size:13px;color:${brand};font-weight:600;line-height:1.5">
        ${segStats.withSupplier} av ${segStats.total} bolag vi följer för ${catLabel(category)}
        använder ${supplierName} — Arvo ser hela prisbilden, ni ser er del.
      </p>`
    : '';

  const ctaLabel = isIncrease ? 'Låt Arvo omförhandla' : 'Se fullständig analys';

  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:${bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${bg};padding:40px 16px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0"
  style="background:${white};border-radius:16px;overflow:hidden;max-width:560px;width:100%;box-shadow:0 2px 20px rgba(14,26,23,0.10)">

  <tr><td style="height:3px;background:linear-gradient(90deg,#5DD6CA,${brandDk});font-size:0">&nbsp;</td></tr>

  <!-- Header -->
  <tr>
    <td style="padding:28px 32px 20px;border-bottom:1px solid ${border}">
      <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:${brand};text-transform:uppercase;letter-spacing:.12em">
        Arvo Intelligence
      </p>
      <p style="margin:0;font-size:20px;font-weight:800;color:${ink};letter-spacing:-.025em;line-height:1.3">
        ${hasExactImpact && isIncrease
          ? `${supplierName} höjde priset ${impact.deltaPct > 0 ? `+${impact.deltaPct}%` : ''}`
          : `Prisändring detekterad hos ${supplierName}`}
      </p>
      <p style="margin:5px 0 0;font-size:11px;color:${muted}">${date}</p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:24px 32px">
      ${heroBlock}
      ${segBlock}

      <!-- CTA -->
      <table cellpadding="0" cellspacing="0" style="margin:0 0 24px">
        <tr>
          <td style="border-radius:10px;background:linear-gradient(135deg,#5DD6CA,${brandDk})">
            <a href="${briefingUrl}"
               style="display:inline-block;color:${white};font-weight:700;font-size:15px;
                      padding:14px 32px;text-decoration:none;letter-spacing:.01em">
              ${ctaLabel} &rarr;
            </a>
          </td>
        </tr>
      </table>

      <!-- Rådata för transparens -->
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:${brand};text-transform:uppercase;letter-spacing:.1em">Detekterad avvikelse</p>
 
```

### Kommando 5

```bash
mkdir -p ops/obduktion && grep -n "^const category\|^let category\|^var category\|catLabel" scripts/notify-price-changes.mjs api/cron/run-price-alerts.mjs
```

```
scripts/notify-price-changes.mjs:37:import { catLabel } from '../lib/format.js';
scripts/notify-price-changes.mjs:260:    ? `${segStats.withSupplier} av ${segStats.total} bolag vi följer för ${catLabel(category)} använder ${supplierName}.`
scripts/notify-price-changes.mjs:349:        ${segStats.withSupplier} av ${segStats.total} bolag vi följer för ${catLabel(category)}
api/cron/run-price-alerts.mjs:27:import { catLabel } from '../../lib/format.js';
api/cron/run-price-alerts.mjs:216:        Arvo ser samma höjning hos ${segStats.withSupplier} av ${segStats.total} bolag vi följer för ${catLabel(category)}
```

### Kommando 6

```bash
sed -n 245,275p scripts/notify-price-changes.mjs
```

```
console.log(`\n══════════════════════════════════════`);
console.log(`Klart: ${totalSent} skickade, ${totalSkipped} överhoppade (idempotens), ${totalFailed} misslyckades`);
if (totalFailed > 0) process.exit(1);

// ── Insight-objekt för briefing_reports ──────────────────────────────────────
function buildPriceAlertInsight({ keyword, category, supplierName, customer, groupAlerts, segStats, impact }) {
  const isIncrease       = impact ? impact.impactKrYear > 0 : true;
  const impactKrYear     = impact?.impactKrYear ?? null;
  const hasExactNumbers  = impact != null;

  const headline = hasExactNumbers && isIncrease
    ? `${supplierName} höjde priset ${impact.deltaPct > 0 ? `+${impact.deltaPct}%` : ''} — ${fmt(impact.impactKrYear)} kr/år extra`
    : `Prisändring hos ${supplierName} — Arvo har detekterat`;

  const segSignal = segStats.total >= 3
    ? `${segStats.withSupplier} av ${segStats.total} bolag vi följer för ${catLabel(category)} använder ${supplierName}.`
    : null;

  const breakdownContext = hasExactNumbers
    ? `${impact.oldKrMonth} kr/säte/mth → ${impact.newKrMonth} kr/säte/mth (${isIncrease ? '+' : ''}${impact.deltaPct}%). ${impact.seats} licenser × ${Math.abs(impact.deltaKrMonth)} kr/mth × 12 = ${fmt(Math.abs(impactKrYear))} kr/år.`
    : null;

  return {
    id:   crypto.randomUUID(),
    type: 'price_alert',
    headline,
    subheadline: hasExactNumbers
      ? `Exakt påverkan: ${isIncrease ? '+' : ''}${fmt(impactKrYear)} kr/år för ${impact.seats} licenser`
      : 'Prisändring detekterad — Arvo granskar om den är befogad',
    metric: impactKrYear ? {
      primary:   { value: Math.abs(impactKrYear), label: 'kr/år identifierad påverkan' },
```
