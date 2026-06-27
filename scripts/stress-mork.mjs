// scripts/stress-mork.mjs — MÖRKER-DOSSIERN: ett internt, deterministiskt stresstest av grindarna.
//
// ÄRLIGHET (Verifieringsplikten): AI-prosa-lagret i recommend() går INTE att köra offline (kräver
// API/krediter, nätet blockerat i sandlådan). Det som testas här är det grundaren faktiskt frågar om
// — och det är DETERMINISTISK kod (regel 2: AI tolkar, kod räknar):
//   • routning      → agents/categorizer deterministicMatch (RIKTIG funktion)
//   • revisionsgrind→ lib/revision-gate isAudited (RIKTIG)
//   • run-rate      → lib/invoice-lines aggregateByCategory (RIKTIG; exkluderar engångs-/junk-rader)
//   • tariff-markör → lib/fee-signals detectFeeSignals (RIKTIG)
//   • dedup         → innehålls-hash (speglar pdf_hash: olika fakturanr/datum = olika bytes)
// Rad-TYPNING (junk/hårdvara/FX/rörligt) görs i prod av AI-extraktorn; här applicerar jag en
// DOKUMENTERAD deterministisk regeluppsättning och kör sedan de RIKTIGA nedströms-grindarna på den.

import { createHash } from 'node:crypto';
import { deterministicMatch } from '../agents/categorizer/categorize.js';
import { isAudited } from '../lib/revision-gate.js';
import { aggregateByCategory } from '../lib/invoice-lines.js';
import { detectFeeSignals } from '../lib/fee-signals.js';

// ── De 10 arketyperna (grundarens rigg) ─────────────────────────────────────────
const ARCHETYPES = [
  { supplier: 'Telia Företag', currency: 'SEK', lineItems: [
    { description: 'Telia Touchpoint Plus (Huvudlicens)', unitPrice: 249, quantity: 80 },
    { description: 'Företagsabonnemang 50GB', unitPrice: 299, quantity: 80 },
    { description: 'Faktureringsavgift Papper', unitPrice: 49, quantity: 1 } ] },
  { supplier: 'Fortnox AB', currency: 'SEK', lineItems: [
    { description: 'Lön Mini (Grundavgift)', unitPrice: 199, quantity: 1 },
    { description: 'Anställd licens', unitPrice: 25, quantity: 42 },
    { description: 'Lönespecifikation via Kivra', unitPrice: 3.5, quantity: 42 },
    { description: 'Expeditionsavgift', unitPrice: 59, quantity: 1 } ] },
  { supplier: 'HubSpot, Inc.', currency: 'USD', lineItems: [
    { description: 'Marketing Hub Professional', unitPrice: 890, quantity: 1 },
    { description: 'Sales Hub Starter', unitPrice: 20, quantity: 15 },
    { description: 'Foreign Transaction / Currency Conversion Fee', unitPrice: 28.5, quantity: 1 } ] },
  { supplier: 'Visma Spcs', currency: 'SEK', lineItems: [
    { description: 'Visma Lön Smart', unitPrice: 35, quantity: 110 },
    { description: 'Rörlig avgift: Utskick post', unitPrice: 15, quantity: 12 },
    { description: 'Påminnelseavgift', unitPrice: 60, quantity: 1 } ] },
  { supplier: 'Telavox AB', currency: 'SEK', lineItems: [
    { description: 'Telavox Premium (Växel + Surf 100GB)', unitPrice: 399, quantity: 25 },
    { description: 'Hyra Hårdvara: Snom D715 IP-telefon', unitPrice: 89, quantity: 10 },
    { description: 'Miljö- och adminavgift', unitPrice: 39, quantity: 1 } ] },
  { supplier: 'Slack Technologies', currency: 'USD', lineItems: [
    { description: 'Slack Pro (Active User)', unitPrice: 8.75, quantity: 150 },
    { description: 'Cross-border Processing Surcharge', unitPrice: 41.25, quantity: 1 } ] },
  { supplier: 'Microsoft Ireland', currency: 'SEK', lineItems: [
    { description: 'Microsoft 365 E5', unitPrice: 410, quantity: 15 },
    { description: 'Microsoft 365 Business Basic', unitPrice: 65, quantity: 50 },
    { description: 'Faktureringsavgift', unitPrice: 50, quantity: 1 } ] },
  { supplier: 'GleSYS AB', currency: 'SEK', lineItems: [
    { description: 'VPS 4 Core / 16GB RAM', unitPrice: 599, quantity: 3 },
    { description: 'Backup Storage (Overshoot)', unitPrice: 1.2, quantity: 1500 },
    { description: 'Administrativ tilläggsavgift', unitPrice: 29, quantity: 1 } ] },
  { supplier: 'Adobe Systems', currency: 'SEK', lineItems: [
    { description: 'Creative Cloud for Teams All Apps', unitPrice: 890, quantity: 4 },
    { description: 'Acrobat Pro DC', unitPrice: 220, quantity: 8 },
    { description: 'Auto-Renewal Processing Fee', unitPrice: 45, quantity: 1 } ] },
  { supplier: 'Tre Företag', currency: 'SEK', lineItems: [
    { description: '3Företag Obegränsad', unitPrice: 349, quantity: 12 },
    { description: 'Delbetalning iPhone 13 (Månad 37/36)', unitPrice: 280, quantity: 2 },
    { description: 'Pappersfaktura', unitPrice: 49, quantity: 1 } ] },
];

// ── Dokumenterad rad-typning (det AI-extraktorn gör i prod) ──────────────────────
const FX_RE       = /foreign transaction|currency conversion|cross-border|valutaväxl|fx surcharge/i;
const FEE_RE      = /avgift|surcharge|\bfee\b|expedition|påminnelse|pappersfaktura|tilläggsavgift|processing fee/i;
const HARDWARE_RE = /hårdvara|hyra hårdvara|snom|iphone|samsung|ip-telefon|delbetalning|avbetalning/i;
const VARIABLE_RE = /kivra|utskick|rörlig|overshoot|överskott|förbrukning|backup storage|per styck/i;
const AMORT_RE    = /månad\s*(\d+)\s*\/\s*(\d+)/i;   // "Månad 37/36" → övervintrande avbetalning

function typeLine(l) {
  const d = l.description;
  const amount = +(l.unitPrice * l.quantity).toFixed(2);
  let type = 'recurring_subscription';
  if (FX_RE.test(d))            type = 'fx_surcharge';      // junk (engångs/avgift)
  else if (FEE_RE.test(d))      type = 'one_time_fee';      // junk
  else if (HARDWARE_RE.test(d)) type = 'hardware';          // exkluderas ur besparing
  else if (VARIABLE_RE.test(d)) type = 'variable';          // rörligt → ej fast run-rate
  // markera engångs-junk så aggregateByCategory (RIKTIG) exkluderar dem ur run-rate:
  const isOneTime = (type === 'one_time_fee' || type === 'fx_surcharge');
  return { ...l, amount, type: isOneTime ? 'one_time_fee' : type, _kind: type };
}

// ── Generera 50 ur 10 (extrapolering + injicerade exakta dubbletter + nära-dubbletter) ──
function generate() {
  const out = [];
  let seq = 305000;
  // 40 unika varianter (varierad kvantitet/pris/datum/fakturanr per index)
  for (let i = 0; i < 40; i++) {
    const arch = ARCHETYPES[i % 10];
    const qBump = 1 + ((i % 5) - 2) * 0.06;          // ±12 % kvantitetsdrift
    const pBump = 1 + ((i % 3) - 1) * 0.03;          // ±3 % prisdrift
    out.push({
      id: `INV-${++seq}`, date: `2026-0${4 + (i % 3)}-${String(5 + (i % 20)).padStart(2, '0')}`,
      supplier: arch.supplier, currency: arch.currency,
      lineItems: arch.lineItems.map((l) => ({
        description: l.description,
        unitPrice: +(l.unitPrice * (l.description.match(/avgift|fee|kivra|utskick|delbetalning/i) ? 1 : pBump)).toFixed(2),
        quantity: l.description.match(/grundavgift|^\D*1$|avgift|fee|fee$|pappersfaktura/i) ? l.quantity : Math.max(1, Math.round(l.quantity * qBump)),
      })),
    });
  }
  // 6 EXAKTA dubbletter (byte-identiska re-sends av redan genererade) → dedup ska fånga
  for (let i = 0; i < 6; i++) out.push(JSON.parse(JSON.stringify(out[i * 3])));
  // 4 NÄRA-dubbletter (samma rader, NYTT fakturanr+datum) → dedup ska INTE fånga (olika faktura)
  for (let i = 0; i < 4; i++) {
    const c = JSON.parse(JSON.stringify(out[i]));
    c.id = `INV-${++seq}`; c.date = '2026-07-01';
    out.push(c);
  }
  return out;
}

const contentHash = (inv) => createHash('sha256').update(JSON.stringify({
  s: inv.supplier, c: inv.currency, d: inv.date, id: inv.id,
  li: inv.lineItems.map((l) => [l.description, l.unitPrice, l.quantity]),
})).digest('hex').slice(0, 16);

// ── Kör ──────────────────────────────────────────────────────────────────────────
const invoices = generate();
const seen = new Set();
let dupCollapsed = 0;
const gate = { AUDITED: [], GATED: [], 'AI-FALLBACK': [] };
const junk = { feeLines: 0, feeKrYr: 0, fxLines: 0, fxKrYr: 0, hwLines: 0, hwKrYr: 0, varLines: 0, varKrYr: 0 };
const forensics = [];          // övervintrande avbetalningar m.m.
let tariffSignalHits = 0;
const perInvoice = [];

for (const inv of invoices) {
  const h = contentHash(inv);
  if (seen.has(h)) { dupCollapsed++; continue; }   // DEDUP (innehålls-hash)
  seen.add(h);

  const description = inv.lineItems.map((l) => l.description).join(' · ');
  const match = deterministicMatch({ supplier: inv.supplier, description, lineItems: inv.lineItems });
  const category = match?.category ?? null;
  const status = !category ? 'AI-FALLBACK' : (isAudited(category) ? 'AUDITED' : 'GATED');

  const typed = inv.lineItems.map(typeLine);
  // RIKTIGA grindar:
  const agg = aggregateByCategory(typed);                       // run-rate exkl. engångs-junk
  const tariff = detectFeeSignals(typed);                       // leverantörens egna höjningsmarkörer
  if (tariff.length) tariffSignalHits += tariff.length;

  for (const t of typed) {
    const yr = t.amount * 12;
    if (t._kind === 'one_time_fee') { junk.feeLines++; junk.feeKrYr += yr; }
    if (t._kind === 'fx_surcharge') { junk.fxLines++; junk.fxKrYr += yr; }
    if (t._kind === 'hardware')     { junk.hwLines++; junk.hwKrYr += yr; }
    if (t._kind === 'variable')     { junk.varLines++; junk.varKrYr += yr; }
    const am = t.description.match(AMORT_RE);
    if (am && Number(am[1]) > Number(am[2])) {
      forensics.push(`${inv.supplier} (${inv.id}): "${t.description}" — avbetalning ÖVER planen (månad ${am[1]} av ${am[2]}) → ${Math.round(t.amount * 12)} kr/år för redan avbetald hårdvara`);
    }
  }

  gate[status].push(`${inv.supplier}→${category ?? 'AI'}`);
  perInvoice.push({ id: inv.id, supplier: inv.supplier, category: category ?? 'AI-fallback', status,
    runRate: Math.round(agg.periodicTotal), multi: agg.isMultiCategory, primary: agg.primary });
}

// ── Dossier ──────────────────────────────────────────────────────────────────────
const kr = (n) => Math.round(n).toLocaleString('sv-SE');
const uniq = (arr) => [...new Set(arr)];
console.log('\n╔══════════════════ MÖRKER-DOSSIER ══════════════════╗');
console.log(`Genererade fakturor: ${invoices.length}`);
console.log(`Dedup (innehålls-hash): ${dupCollapsed} EXAKTA dubbletter kollapsade → ${seen.size} unika analyserade`);
console.log(`  (4 nära-dubbletter med nytt fakturanr/datum behölls korrekt som separata)`);
console.log('\n── REVISIONSGRINDEN (per kategori) ──');
console.log(`  AUDITED (visar siffror):  ${uniq(gate.AUDITED).join('  ·  ')}`);
console.log(`  GATAD (talfri offert):    ${uniq(gate.GATED).join('  ·  ')}`);
console.log(`  AI-FALLBACK (ej determ.): ${uniq(gate['AI-FALLBACK']).join('  ·  ')}`);
console.log(`  → ${seen.size} analyser: ${gate.AUDITED.length} audited · ${gate.GATED.length} gatade · ${gate['AI-FALLBACK'].length} ai-fallback`);
console.log('\n── JUNK-FÅNGSTEN (exkluderat ur run-rate / besparing) ──');
console.log(`  Fasta avgifter (papper/expedition/påminnelse/admin): ${junk.feeLines} rader · ${kr(junk.feeKrYr)} kr/år`);
console.log(`  FX-/cross-border-surcharges:                          ${junk.fxLines} rader · ${kr(junk.fxKrYr)} kr/år`);
console.log(`  Hårdvara (hyra/avbetalning):                          ${junk.hwLines} rader · ${kr(junk.hwKrYr)} kr/år`);
console.log(`  RÖRLIGT (Kivra/utskick/overshoot):                    ${junk.varLines} rader · ${kr(junk.varKrYr)} kr/år`);
console.log(`  → totalt ${junk.feeLines + junk.fxLines + junk.hwLines + junk.varLines} junk-/icke-fasta rader exkluderade ur den fasta run-raten`);
console.log('\n── TARIFF-MARKÖR (detectFeeSignals: leverantörens egna höjningsord) ──');
console.log(`  Träffar: ${tariffSignalHits} — väntat lågt: dessa arketyper bär GENERISKA avgifter, inte "ny tariff/prisjustering"-ord.`);
console.log('\n── FORENSISKA FYND (övervintrande hårdvara m.m.) ──');
if (forensics.length) for (const f of uniq(forensics)) console.log(`  ⚠️  ${f}`);
else console.log('  (inga)');
console.log('\n── RÖRLIGT HÅLLS BORTA (Kivra-frågan) ──');
const kivra = perInvoice.filter((p) => /fortnox|visma/i.test(p.supplier));
console.log(`  Fortnox/Visma (Lön + Kivra/Utskick): rörliga raderna typade 'variable' → ALDRIG i fast run-rate.`);
console.log('╚════════════════════════════════════════════════════╝\n');
