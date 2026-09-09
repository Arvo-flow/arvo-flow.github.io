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

// SVARSTIDEN ÄR DET ANDRA VITTNET om cacheträffen, och den kostar en klockavläsning: en
// cacheträff svarar på ~2 s, en riktig analys på ~15 (två Opus-anrop). Den fäller ingenting —
// en tidsgräns i CI är ett falsklarm som väntar på en långsam runner — men den gör det synligt
// när `cached: false` står bredvid en svarstid som omöjligt kan rymma en analys, och det är den
// enda avläsning som kan motsäga serverns egen utsaga om sitt svar.
const t0 = Date.now();
const res = await fetch(`${BASE}/api/test-invoice`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ pdfBase64, industry: 'ovrigt', employees: 10, token }),
});
const data = await res.json().catch(() => ({}));   // sondvakt-ok: ett svar utan JSON är ett mätvärde och rapporteras som sådant
const svarstidMs = Date.now() - t0;

console.log('=== LIVE-RESULTAT (arvoflow.se) ===');
console.log('HTTP', res.status, `· svarstid ${(svarstidMs / 1000).toFixed(1)} s`);
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

// ══ EN CACHETRÄFF MÄTER INGEN DEPLOY (2026-09-09) ═══════════════════════════════════════════
// Sondens ENDA uppgift står i filhuvudet: «bevisar att fixen faktiskt är deployad». Ett cachat
// svar är per definition producerat av den kod som körde när cachen fylldes — alltså kan det
// aldrig säga något om koden som körs nu. Sonden SKREV redan ut `cached: true` två rader ovanför
// sin egen larmrad och drog ändå slutsatser ur talen. Mätt: run 19 (efter Ring 1-omläggningen)
// fick tillbaka run 18:s dom på två sekunder, och nyckellistan i larmet pekade ut fältnamnen som
// misstänkt när hela svaret var gammalt. Larmet hade rätt om att något var fel och fel om vad.
//
// Rött, inte en varningsrad: en grön körning läses som ett bevis, och ett bevis som betyder «jag
// mätte inte» är farligare än ett rött (grundarbeslut 2026-09-08). Sonden kan inte kringgå
// cachen själv — bypass kräver en hemlighet Actions inte bär — så det ärliga svaret är att säga
// att mätningen uteblev och namnge åtgärden.
//
// FÅNGAR: att svaret kommer ur KV och inte ur den utlagda koden.
// BLIND, två saker, och båda ska stå skrivna:
//   · Att den utlagda koden är en ANNAN än den man tror. Sonden läser aldrig vilken commit Vercel
//     kör — bumpas versionen men deployen har inte landat mäts föregående deploy, rent och grönt.
//     Den kontrollen bor i deploylistan, inte här.
//   · Att fältet självt är sant. Vakten vilar på SERVERNS EGEN utsaga om sitt svar. Slutar
//     api-lagret sätta `cached`, eller sätter det fel, är sonden blind på exakt samma sätt som
//     före den här raden — och den blir det TYST, för `undefined` läses som färskt (SV-16, och
//     det är rätt val: att läsa varje felsvar som ett cachelarm hade dolt det verkliga felet
//     bakom fel diagnos). Det andra vittnet är därför SVARSTIDEN, som skrivs ut på HTTP-raden:
//     den kommer ur sondens egen klocka och inte ur serverns utsaga, och en analys kan inte
//     rymmas på två sekunder. Den fäller ingenting — se motiveringen vid mätningen.
if (data.cached) {
  console.log('\n✗ SVARET KOM UR CACHEN (`cached: true`) — INGEN DEPLOY ÄR MÄTT.');
  console.log('  Talen ovan producerades av koden som körde när cachen fylldes, inte av den som');
  console.log('  körs nu. Åtgärd: bumpa `pdf:result:vN` i api/test-invoice.mjs (regel 7 kräver');
  console.log('  det ändå vid varje resultatändring) och kör om när deployen är READY.');
  process.exit(1);
}
console.log('\n✓ Färsk analys (`cached: false`) — talen ovan kommer ur den utlagda koden.');
