// scripts/diag-live.mjs — verifierar den LIVE-utlagda Vercel-sajten (arvoflow.se) end-to-end:
// hämtar token → POSTar PDF:en till /api/test-invoice → skriver ut route + dom. Bevisar att
// fixen faktiskt är deployad, inte bara på main. Körs på Actions (HTTP-egress). Diagnostik.
import { readFileSync } from 'node:fs';

const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
// PDF valbar: prisbokens tal kan bara läsas ur en kategori som faktiskt prissätts, så en
// saas-faktura krävs för att se saas-productivity-ankaret som SERVERN har (inte som disken har).
const PDF = process.env.PDF || 'test-pdfs/diag-bredband.pdf';
console.log('pdf:', PDF);
const pdfBase64 = readFileSync(PDF).toString('base64');

const tr = await fetch(`${BASE}/api/token`, { method: 'POST' });
const token = (await tr.json().catch(() => ({})))?.token ?? null;   // sondvakt-ok: ett svar utan JSON är ett mätvärde (ingen token) och rapporteras som sådant
console.log('token:', token ? 'OK' : 'SAKNAS');

const res = await fetch(`${BASE}/api/test-invoice`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ pdfBase64, industry: 'ovrigt', employees: 10, token }),
});
const data = await res.json().catch(() => ({}));   // sondvakt-ok: ett svar utan JSON är ett mätvärde och rapporteras som sådant

console.log('=== LIVE-RESULTAT (arvoflow.se) ===');
console.log('HTTP', res.status);
console.log(JSON.stringify({
  route:               data.route,
  reason:              data.reason,
  category:            data.categorized?.category,
  cached:              data.cached ?? false,
  billingPeriodAssumed: data.extracted?.billingPeriodAssumed,
  recommendationType:  data.recommendation?.recommendationType,
  requiresQuote:       data.recommendation?.requiresQuote,
  suggestedAnnualCost: data.recommendation?.suggestedAnnualCost,
  savingPerYear:       data.recommendation?.savingPerYear,
  // Serialiserings-bevis: dessa fält droppades tidigare ur auto-svaret (FindingCard ritade tomt).
  hasLeadFindingKey:   Object.prototype.hasOwnProperty.call(data.recommendation ?? {}, 'leadFinding'),
  leadFindingTitle:    data.recommendation?.leadFinding?.title ?? null,
  forensicCount:       data.recommendation?.forensicFindings?.length ?? null,
  hasContractClockKey: Object.prototype.hasOwnProperty.call(data, 'contractClock'),
  contractClock:       data.contractClock?.title ?? null,
  servicePeriodEnd:    data.extracted?.servicePeriodEnd ?? null,
  // B4-bevis: verifikationskvittot ska följa med auto-svaret (grindarnas domslut)
  verifications:       (data.verifications ?? []).map((v) => `${v.id}:${v.status}`),
  // PRISBOKEN SOM SERVERN HAR (2026-08-18). Golvet och taket är de tal kundens score mäts mot;
  // efter cellhärledningen ska saas-productivity svara p25 1606 · median 1927 · 2026-08-05.
  // Att läsa dem på min disk bevisar ingenting om vad Vercel kör.
  bmP25:               data.recommendation?.benchmark?.p25 ?? null,
  bmMedian:            data.recommendation?.benchmark?.median ?? null,
  bmVerifierat:        data.recommendation?.benchmark?.lastVerified ?? null,
  bmKalla:             data.recommendation?.benchmark?.source ?? null,
  error:               data.error,
}, null, 2));
