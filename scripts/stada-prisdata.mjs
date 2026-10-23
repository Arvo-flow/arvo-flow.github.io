#!/usr/bin/env node
// scripts/stada-prisdata.mjs — tar bort felaktiga prisrader ur produktionsdatabasen (steg b i
// ops/ARBETSORDER-VAG1.md, CTO-mandatet 22 okt).
//
// Vad som tas bort, och varför:
// · supplier_prices: majraderna. Seedblocket i api/admin/run-migration.mjs och scripts/seed-price-db.mjs
//   skrev 46 majpriser som aktuella (probe-undersokning 39760703487: 46 rader, alla med last_verified i
//   maj). Seedarna togs bort i PR #86, och efter PR #86 läser ingen kundväg tabellen (prislarmets golv
//   läses ur prisboken). Ingen tabell pekar på supplier_prices, så raderna raderas i stället för att
//   markeras: att markera dem som inaktuella kan krocka med det unika indexet
//   (supplier, product, tier, is_current).
// · supplier_price_history: raden «Microsoft 365 Business Standard 12,50 → 14,00 USD, 2022-03-01».
//   Den hänvisar till Microsofts post 2021-08-19, och posten listar sex produkter utan Business
//   Standard (avläst 23 okt). Raden är falsk mot sin egen källa.
//
// Fail-closed (SS-02): läget «radera» kräver det antal rader som läget «las» räknade. Avviker antalet raderas
// inget. Efter raderingen räknas tabellerna om: noll majrader ska stå kvar, och rader utanför urvalet
// ska vara lika många som före (motprovet).
//
// Användning: node scripts/stada-prisdata.mjs las
//             node scripts/stada-prisdata.mjs radera <antal majrader> <antal historikrader>
import { getDb } from '../lib/db.js';

const [lage, antalPriser, antalHistorik] = process.argv.slice(2);
if (!['las', 'radera'].includes(lage)) {
  console.error('Användning: las | radera <antal majrader> <antal historikrader>');
  process.exit(2);
}
const db = getDb();
if (!db) { console.error('DATABASE_URL saknas — ingen mätning, ingen radering'); process.exit(1); }

// Urvalen står ordagrant i varje fråga nedan (Neon-klienten 0.10 bäddar inte in SQL-fragment):
// majraderna är last_verified < 2026-06-01, och den falska historikraden är Microsoft 365 Business
// Standard 12,50 → 14,00 den 2022-03-01, changed_by backfill-verified.
async function rakna() {
  const [p] = await db`SELECT
      COUNT(*)::int AS alla,
      COUNT(*) FILTER (WHERE last_verified < DATE '2026-06-01')::int AS maj,
      COUNT(*) FILTER (WHERE last_verified < DATE '2026-06-01' AND is_current)::int AS maj_aktuella,
      COUNT(*) FILTER (WHERE last_verified IS NULL OR last_verified >= DATE '2026-06-01')::int AS ovriga
    FROM supplier_prices`;
  const [h] = await db`SELECT
      COUNT(*)::int AS alla,
      COUNT(*) FILTER (WHERE supplier = 'Microsoft' AND product = 'Microsoft 365 Business Standard'
        AND changed_at::date = DATE '2022-03-01' AND changed_by = 'backfill-verified'
        AND old_price_monthly = 12.50 AND new_price_monthly = 14.00)::int AS falska
    FROM supplier_price_history`;
  return { p, h };
}

function skriv(rubrik, { p, h }) {
  console.log(`\n── ${rubrik} ──`);
  console.log(`  supplier_prices: ${p.alla} rader · majrader ${p.maj} (varav aktuella ${p.maj_aktuella}) · övriga ${p.ovriga}`);
  console.log(`  supplier_price_history: ${h.alla} rader · den falska 2022-raden ${h.falska}`);
}

const fore = await rakna();
skriv('före', fore);

if (lage === 'las') {
  const rader = await db`SELECT supplier, product, tier, is_current, last_verified, source_type
    FROM supplier_prices WHERE last_verified < DATE '2026-06-01' ORDER BY supplier, product, tier`;
  for (const r of rader) {
    console.log(`    ${String(r.supplier).padEnd(12)} ${String(r.product).slice(0, 40).padEnd(40)} ${String(r.tier ?? '—').padEnd(18)} aktuell=${r.is_current} ${String(r.last_verified).slice(0, 10)} ${r.source_type}`);
  }
  const hist = await db`SELECT supplier, product, changed_at, old_price_monthly, new_price_monthly,
      old_price_annual, new_price_annual, currency, changed_by FROM supplier_price_history ORDER BY changed_at`;
  for (const r of hist) {
    console.log(`    historik ${String(r.changed_at).slice(0, 10)} ${r.supplier} ${r.product} m:${r.old_price_monthly}→${r.new_price_monthly} a:${r.old_price_annual}→${r.new_price_annual} ${r.currency} ${r.changed_by}`);
  }
  console.log(`\nKör «radera ${fore.p.maj} ${fore.h.falska}» för att ta bort dem.`);
  process.exit(0);
}

const vantadePriser = Number(antalPriser);
const vantadHistorik = Number(antalHistorik);
if (!Number.isInteger(vantadePriser) || !Number.isInteger(vantadHistorik)) {
  console.error('radera kräver två heltal: antalet majrader och antalet historikrader, ur läget «las»');
  process.exit(2);
}
if (fore.p.maj !== vantadePriser || fore.h.falska !== vantadHistorik) {
  console.error(`✗ Antalen har ändrats sedan läsningen: majrader ${fore.p.maj} (väntat ${vantadePriser}), historik ${fore.h.falska} (väntat ${vantadHistorik}). Inget raderat.`);
  process.exit(1);
}

await db.transaction((tx) => [
  tx`DELETE FROM supplier_prices WHERE last_verified < DATE '2026-06-01'`,
  tx`DELETE FROM supplier_price_history WHERE supplier = 'Microsoft' AND product = 'Microsoft 365 Business Standard'
    AND changed_at::date = DATE '2022-03-01' AND changed_by = 'backfill-verified'
    AND old_price_monthly = 12.50 AND new_price_monthly = 14.00`,
]);

const efter = await rakna();
skriv('efter', efter);
const fel = [];
if (efter.p.maj !== 0) fel.push(`${efter.p.maj} majrader står kvar`);
if (efter.h.falska !== 0) fel.push('den falska 2022-raden står kvar');
// Motprovet: allt utanför urvalen är orört.
if (efter.p.ovriga !== fore.p.ovriga) fel.push(`övriga prisrader ändrades: ${fore.p.ovriga} → ${efter.p.ovriga}`);
if (efter.h.alla !== fore.h.alla - fore.h.falska) fel.push(`historiken ändrades utöver den falska raden: ${fore.h.alla} → ${efter.h.alla}`);
if (fel.length) { console.error(`✗ ${fel.join(' · ')}`); process.exit(1); }
console.log(`\n✓ ${fore.p.maj} majrader och ${fore.h.falska} falsk historikrad borttagna. Övriga ${efter.p.ovriga} prisrader och ${efter.h.alla} historikrader orörda.`);
