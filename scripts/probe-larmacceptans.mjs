// scripts/probe-larmacceptans.mjs — acceptanspunkt 4 i ops/ARBETSORDER-LANSERING.md: punkt 1 och 2
// prövade genom de riktiga vägarna, inte genom enhetstesterna (LU, BL och LU-16..18 bär dem redan).
//
// DEL L · LARMVÄGEN. En rapport med de sju tysta svaren ur A–G (B i två former, E undantaget, se
//   nedan) och motprovet, byggd på en VERKLIG prisvaktskontroll
//   (Microsoft 365 Business Standard, årsavtal — samma som BL-04), matas till det riktiga
//   scripts/notify-price-changes.mjs i en barnprocess vars miljö saknar varje hemlighet.
//   Krav: de sju ger 0 verifierade och skriptet stannar på «Inga prisändringar» före databas och
//   Resend. Motprovet ger 1 verifierad och skriptet går vidare till utskicket, där det stannar på
//   den saknade nyckeln. Utan motprovet kunde tystnaden lika gärna vara en trasig väg.
// DEL G · GOLVET mot produktionens supplier_prices (läser, skriver aldrig). Per leverantör och nivå
//   i en kategori som kräver bekräftad nivå, på den billigaste aktuella raden:
//     exakt listpris → null (aldrig «över listpris»), Basic-fallet inräknat;
//     listpris +30 % → flaggas med just den raden som produkt (motprovet);
//     faktura utan nivå → nivaOviss, inget procenttal.
//   Med den gamla frågan (kategorins billigaste, oavsett nivå) skrivs vad samma kund hade fått, så
//   att det syns att produktionsdatan bär felet fixen stänger. Rader vars nivå lasLicensniva aldrig
//   kan producera räknas och skrivs ut: de är golv ingen faktura når.
//
// SÄKERHET: sonden vägrar köra med RESEND_API_KEY satt. En acceptanssond som kan skicka är ingen sond.
// Utan DATABASE_URL vägrar den också, om inte --utan-databas anges; då står DEL G som EJ MÄTT.
//
// FÅNGAR: att någon av A–G åter når utskicket, att motprovet inte gör det, att produktionens
//   nivånycklar och lasLicensniva glidit isär, och att golvet åter mäter produktvalet.
// BLIND: om ett riktigt mejl renderas rätt (det skickas aldrig), och run-price-alerts-vägen, som ingen
//   anropar i dag (avläst: inget arbetsflöde postar till den). Den går genom samma bedomLarm (BL-05).

import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PRICE_CHECKS } from '../lib/prisvaktens-kontroller.js';
import { bokfortPris } from '../lib/prisbaslinje.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { radensNiva } from '../lib/licensniva.js';

if (process.env.RESEND_API_KEY) {
  console.error('✗ RESEND_API_KEY är satt — sonden kör aldrig där ett mejl kan gå ut.');
  process.exit(2);
}
const UTAN_DB = process.argv.includes('--utan-databas');
if (!process.env.DATABASE_URL && !UTAN_DB) {
  console.error('✗ DATABASE_URL saknas — DEL G kan inte mätas. Ange --utan-databas för att köra bara DEL L.');
  process.exit(1);
}

let fel = 0;
const ok = (villkor, text) => { console.log(`  ${villkor ? '✓' : '✗'} ${text}`); if (!villkor) fel++; };

// ── DEL L ─────────────────────────────────────────────────────────────────────────────────────
console.log('── DEL L · larmvägen (scripts/notify-price-changes.mjs, utan hemligheter) ──');
const kalla = PRICE_CHECKS.find((s) => s.supplier === 'Microsoft 365 Business Standard (sv)');
const kontroll = kalla?.checks.find((c) => c.name.includes('årsavtal'));
if (!kalla || !kontroll?.bokfort) {
  console.error('✗ den verkliga kontrollen hittades inte — sonden prövar inget');
  process.exit(1);
}
const larm = (haiku) => ({
  category: kalla.category, supplier: kalla.supplier, check: kontroll.name, haiku,
  verify: { oldNumeric: bokfortPris(kontroll.bokfort)?.pris ?? null, bokfort: kontroll.bokfort, pageConfirmsNew: true },
});
const FRISK = { actionRequired: 'update', confidence: 0.95, extractedNumeric: 140, extractedUnit: 'per_seat_month', extractedCurrency: 'SEK', direction: 'increase' };
const SJU = [
  ['A', undefined, 'haiku_saknas'],
  ['B', { ...FRISK, actionRequired: 'verify_manually' }, 'action_verify_manually'],
  ['B', { ...FRISK, confidence: 0.10 }, 'konfidens_0.1_under'],
  ['C', { ...FRISK, extractedUnit: 'per_month' }, 'enhet_per_month_oraknbar'],
  ['D', { ...FRISK, extractedUnit: undefined }, 'enhet_saknas_oraknbar'],
  ['F', { ...FRISK, extractedNumeric: '' }, 'numeric_obrukbart'],
  ['G', { ...FRISK, extractedUnit: 'percentage' }, 'enhet_percentage_oraknbar'],
];

function korNotify(alerts) {
  const dir = mkdtempSync(join(tmpdir(), 'larmacceptans-'));
  const rapport = join(dir, 'rapport.json');
  writeFileSync(rapport, JSON.stringify({ runAt: new Date().toISOString(), alerts }));
  const env = { PATH: process.env.PATH, HOME: process.env.HOME };
  const r = spawnSync(process.execPath, ['scripts/notify-price-changes.mjs', rapport], { env, encoding: 'utf8' });
  return { kod: r.status, ut: `${r.stdout}${r.stderr}` };
}
const summa = (ut) => {
  const m = ut.match(/\[larmunderlag\] (\d+) verifierade · (\d+) obekräftade · (\d+) avvisade/);
  return m ? { v: +m[1], o: +m[2], a: +m[3] } : null;
};

const sju = korNotify(SJU.map(([, h]) => larm(h)));
const s7 = summa(sju.ut);
ok(s7?.v === 0 && s7?.o === 7, `A–G: ${s7 ? `${s7.v} verifierade · ${s7.o} obekräftade` : 'ingen summarad'} (krav 0 · 7)`);
console.log('  · E («usd» mot «USD») står inte här: gemener normaliseras och larmet SKA gå ut, med tecknet ur');
console.log('    talen. Tecknet räknas efter utskicksgrinden, där sonden stannar; det bärs av LU-09 och price-impact.');
for (const [bokstav, , skal] of SJU) ok(sju.ut.includes(`(${skal}`), `${bokstav}: tystnad med skälet ${skal}`);
ok(sju.ut.includes('Inga prisändringar att notifiera om.') && !/RESEND_API_KEY saknas/.test(sju.ut),
  'A–G: skriptet stannar före databas och Resend');

const motprov = korNotify([larm(FRISK)]);
const sm = summa(motprov.ut);
ok(sm?.v === 1, `motprovet: ${sm ? `${sm.v} verifierad` : 'ingen summarad'} (krav 1)`);
ok(/RESEND_API_KEY saknas/.test(motprov.ut), 'motprovet når utskicket och stannar där, på den saknade nyckeln');
ok(sju.kod === 0 && motprov.kod === 0, `skriptets exit-kod 0 i båda körningarna (${sju.kod}, ${motprov.kod})`);

// ── DEL G ─────────────────────────────────────────────────────────────────────────────────────
console.log('\n── DEL G · golvet mot produktionens supplier_prices (läser, skriver aldrig) ──');
if (!process.env.DATABASE_URL) {
  console.log('  DEL G: EJ MÄTT (--utan-databas). Inget här säger något om produktionen.');
} else {
  const { getDb } = await import('../lib/db.js');
  const { detectPriceAlert } = await import('../lib/price-alert.js');
  const db = getDb();
  const kategorier = Object.keys(BRANCHINDEX).filter((k) => BRANCHINDEX[k]?.kraverBekraftadNiva === true);
  ok(kategorier.length > 0, `kategorier som kräver bekräftad nivå: ${kategorier.join(', ')}`);
  const rader = await db`
    SELECT supplier, category, product, tier, price_monthly::float AS pris
    FROM supplier_prices
    WHERE category = ANY(${kategorier}) AND is_current = true AND price_monthly IS NOT NULL
    ORDER BY supplier, category, price_monthly`;
  ok(rader.length > 0, `${rader.length} aktuella rader i de kategorierna`);

  const billigast = new Map();
  const kategoriMin = new Map();
  const onabara = [];
  for (const r of rader) {
    const kat = `${r.supplier.toLowerCase()}::${r.category}`;
    if (!kategoriMin.has(kat) || r.pris < kategoriMin.get(kat).pris) kategoriMin.set(kat, r);
    if (radensNiva(r.product) !== r.tier) { onabara.push(r); continue; }
    const k = `${kat}::${r.tier}`;
    if (!billigast.has(k) || r.pris < billigast.get(k).pris) billigast.set(k, r);
  }
  ok(billigast.size > 0, `${billigast.size} nivåer som en faktura kan bevisa`);

  for (const r of billigast.values()) {
    const fraga = (pris, beskrivning = r.product) => detectPriceAlert({
      normalizedSupplier: r.supplier, category: r.category, pricePerSeatMonthly: pris, lineItems: [{ description: beskrivning }] });
    const exakt = await fraga(r.pris);
    const over = await fraga(r.pris * 1.3);
    const golv = kategoriMin.get(`${r.supplier.toLowerCase()}::${r.category}`);
    const gammal = Math.round(((r.pris - golv.pris) / golv.pris) * 100);
    console.log(`  ${r.product} (${r.tier}, ${r.pris} kr/mån)${gammal >= 5 ? ` · med den gamla frågan: +${gammal} % mot ${golv.product}` : ''}`);
    ok(exakt === null, `    exakt listpris → ${exakt === null ? 'null' : JSON.stringify(exakt)}`);
    ok(over?.overListPrice === true && over.percentOver === 30 && over.verifiedProduct === r.product,
      `    listpris +30 % → ${over ? `+${over.percentOver} % mot ${over.verifiedProduct}` : 'null'} (motprovet)`);
  }

  for (const kat of new Set([...billigast.values()].map((r) => `${r.supplier}::${r.category}`))) {
    const [supplier, category] = kat.split('::');
    const oviss = await detectPriceAlert({ normalizedSupplier: supplier, category, pricePerSeatMonthly: 999,
      lineItems: [{ description: 'Licenser enligt avtal' }] });
    ok(oviss?.nivaOviss === true && oviss.percentOver === null, `  ${supplier} utan nivå på fakturan → ${oviss ? `nivaOviss ${oviss.nivaOviss}, percentOver ${oviss.percentOver}` : 'null'}`);
  }

  console.log(`\n  Rader vars nivå ingen faktura kan bevisa (lasLicensniva läser bara Microsoft): ${onabara.length}`);
  for (const r of onabara) console.log(`    ${r.supplier} · ${r.product} · tier=${r.tier ?? '—'} · ${r.pris} kr/mån`);
}

console.log(`\n${fel === 0 ? '✓ ACCEPTANS' : `✗ ${fel} KRAV FÖLL`}${process.env.DATABASE_URL ? '' : ' (bara DEL L — DEL G ej mätt)'}`);
process.exit(fel === 0 ? 0 : 1);
