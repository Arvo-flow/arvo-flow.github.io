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
  // `savingPerYear` fanns aldrig i svaret — auto-svaret bär grossSaving/netSaving. Sonden läste
  // ett fält som inte finns och skrev tyst ingenting (JSON.stringify utelämnar undefined), så
  // raden såg ut att saknas i stället för att vara felmätt. Sjunde gången under obduktionen som
  // mätinstrumentet var felet och inte systemet.
  grossSaving:         data.recommendation?.grossSaving ?? null,
  netSaving:           data.recommendation?.netSaving ?? null,
  // Serialiserings-bevis: dessa fält droppades tidigare ur auto-svaret (FindingCard ritade tomt).
  hasLeadFindingKey:   Object.prototype.hasOwnProperty.call(data.recommendation ?? {}, 'leadFinding'),
  leadFindingTitle:    data.recommendation?.leadFinding?.title ?? null,
  forensicCount:       data.recommendation?.forensicFindings?.length ?? null,
  hasContractClockKey: Object.prototype.hasOwnProperty.call(data, 'contractClock'),
  contractClock:       data.contractClock?.title ?? null,
  servicePeriodEnd:    data.extracted?.servicePeriodEnd ?? null,
  // B4-bevis: verifikationskvittot ska följa med auto-svaret (grindarnas domslut)
  verifications:       (data.verifications ?? []).map((v) => `${v.id}:${v.status}`),
  // JÄMFÖRELSENS PROVENIENS SOM SERVERN HAR (2026-08-18, lagad 2026-08-20).
  // Sonden läste tidigare `recommendation.benchmark.*` — ett objekt som ALDRIG serialiserats till
  // svaret. Fyra tysta null lästes som mätvärden ("servern har ingen prisbok") i två dygn, i det
  // verktyg som byggdes med motiveringen att disken inte bevisar vad Vercel kör. Nu läses fältet
  // api-lagret faktiskt skickar, och det är samma objekt som kvittoraden döms ur.
  kallaGrund:          data.recommendation?.jamforelseKalla?.grund ?? null,
  kallaSource:         data.recommendation?.jamforelseKalla?.source ?? null,
  kallaVerifierat:     data.recommendation?.jamforelseKalla?.lastVerified ?? null,
  kallaArTotalsumma:   data.recommendation?.jamforelseKalla?.isTotal ?? null,
  kallaListprisansprak: data.recommendation?.jamforelseKalla?.listprisanspraak ?? null,
  stage:               data.stage ?? null,
  kod:                 data.kod ?? null,
  error:               data.error,
}, null, 2));
