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
  // ── DAGENS TRE FRÅGOR (2026-09-09) ────────────────────────────────────────────────────────
  // 1. LEVER TEXTLAGRET? Numret bekräftas mot pdfjs textlager. Saknades det på 25 av 25 fakturor
  //    därför att `@napi-rs/canvas` inte fanns i Vercels funktionsbundle (DOMMatrix is not
  //    defined). Ett nummer här är beviset att polyfillen nådde produktionen.
  fakturanummer:       data.extracted?.invoiceNumber ?? null,
  // 2. TIGER RING 1? `invoiceTotal` konverterades aldrig, så radsumman (SEK) jämfördes mot
  //    totalen (EUR/USD) och fällde Google, Slack, Atlassian och AWS. En `route` som inte är
  //    review_queue med ett Ring1-skäl är beviset.
  originalvaluta:      data.extracted?.originalCurrency ?? null,
  fxKurs:              data.extracted?.fxRate ?? null,
  // 3. SITTER PRISET? Öresfälten konverterades inte heller — Googles per-licenspris blev
  //    11,50 kr i stället för 131,90. Talet ska ligga kring 132 kr, inte kring 11.
  prisPerLicens:       data.extracted?.pricePerSeatMonthly ?? null,
  antalLicenser:       data.extracted?.seatCount ?? null,
}, null, 2));

// ⚠️ FYRA TYSTA `null` LÄSTES EN GÅNG SOM MÄTVÄRDEN I TVÅ DYGN (20 aug), i det här verktyget.
// Om alla tre av dagens frågor svarar `null` är det troligen fältnamnen som är fel, inte
// systemet — och då ska sonden säga det i stället för att rapportera tre nollor som ett utfall.
const tre = [data.extracted?.invoiceNumber, data.extracted?.originalCurrency,
             data.extracted?.pricePerSeatMonthly];
if (tre.every((v) => v == null)) {
  console.log('\n⚠ ALLA TRE MÄTVÄRDEN ÄR null. Innan det tolkas som ett utfall: kontrollera att');
  console.log('  fälten finns i svaret. Nycklar under `extracted`:');
  console.log(' ', Object.keys(data.extracted ?? {}).join(', ') || '(inget extracted-objekt alls)');
}
