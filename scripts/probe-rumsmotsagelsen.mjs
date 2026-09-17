#!/usr/bin/env node
// scripts/probe-rumsmotsagelsen.mjs — MÄTER två frågor mot produktionsdatabasen. Gissar ingenting.
//
// ══ FRÅGA 1 (grundarens, 2026-09-17): kan Rummet visa «0 jämförda» bredvid en besparing? ═════
// Regel 8-genomgången visade domen skriva «Vi jämförde 0 fakturor mot verifierat publikt listpris»
// bredvid «31 892 kr/år i möjlig nettobesparing». I MIN iscensättning kom det av att stubben
// saknade `prisunderlag` — men jag kunde inte avgöra om produktionen kan nå samma tillstånd.
// `roomCounts` räknar `prissatta = rader med prisunderlag != null`, och `prisunderlag` byggs vid
// LÄSNING. Frågan är därför: finns rader där `net_saving > 0` men där underlaget inte går att
// bygga? Då påstår rummet en besparing det samtidigt säger sig inte ha jämfört fram — [KUND].
//
// ══ FRÅGA 2 (granskningens F2): når tystnadsbeskeden någon rad överhuvudtaget? ════════════════
// `watchedCard` läser registret först i grenen för `no_benchmark` / `out_of_scope` /
// `unsupported_category`. `no_benchmark` sätts bara inuti `if (!catDef)` — alltså när kategorin
// SAKNAS i prisboken — och alla deklarerade kategorier FINNS där. Om mätningen visar noll rader
// är inkopplingen monterad på en signal som aldrig rör sig (villkorsvaktens sjukdom), och
// skärmdumpen från i går bevisade ingenting.
//
// ⚠️ MÄTER DATAN, INTE HTTP-ROUTEN. Läxan från 1 september: när en mätning blockeras av en saknad
// hemlighet, fråga först om hemligheten behövdes för MÄTNINGEN eller bara för vägen jag råkade
// välja. `DATABASE_URL` finns i Actions; CRON_SECRET behövs inte för det här.
//
// ⚠️ ETT TOMT SVAR ÄR INTE ETT SVAR. Utan databas avslutar sonden 1 utan tal — «okänt» får aldrig
// låna utseendet av «noll» (bibelns mest upprepade felfamilj).

import { getDb } from '../lib/db.js';
import { isAudited } from '../lib/revision-gate.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const db = getDb();
if (!db) {
  console.error('✗ INGEN DATABAS — sonden kom inte fram. Detta är INTE ett mätvärde.');
  console.error('  Kör i GitHub Actions där DATABASE_URL finns. Ett tomt svar är inte ett svar.');
  process.exit(1);
}

// ⚠️ LISTAN HÄRLEDS UR PRISBOKEN + REVISIONSGRINDEN, inte ur tystnadsregistret. Två skäl, båda
// bärande: sonden ska kunna köras UTAN det blockerade arbetet (den mäter världen, inte min
// deklaration), och en sond som frågar mitt eget register kan bara bekräfta att registret finns.
const kategorier = Object.keys(BRANCHINDEX).filter((k) => !isAudited(k));

console.log('\n═══ RUMMETS MOTSÄGELSE · mätt mot produktionen ═══\n');

// ── FRÅGA 1 ──────────────────────────────────────────────────────────────────────────────────
// Rader som BÄR en besparing. Om någon av dem inte kan producera ett prisunderlag räknas den som
// «mottagen, inte prissatt» i rubriken medan dess belopp ändå summeras i domen.
const medBesparing = await db`
  SELECT id, supplier, category, annual_cost, seat_count, net_saving,
         (seat_count IS NULL OR seat_count <= 0) AS saknar_enheter
  FROM invoice_analyses            -- kundvy: rader kunden ser i sitt rum
  WHERE arkiverad_at IS NULL
    AND route = 'auto'
    AND net_saving > 0
  ORDER BY created_at DESC
  LIMIT 200
`;

// ⚠️ FÖRSTA VERSIONEN MÄTTE FEL FÄLT. Jag frågade efter `line_items_json IS NULL`, fick tre
// träffar och var en rapport ifrån att kalla dem ett [KUND]. Men `byggPrisunderlag` läser ALDRIG
// radposter — den kräver `annual_cost`, `seat_count` och ett branschankare. Raderna förfinar bara
// licensnivån (`lasLicensniva`), och utan dem faller golvet tillbaka på kategorins p25. Proxyn var
// alltså inte den bindande faktorn, och slutsatsen hade vilat på en gissning om min egen kod.
// Mätinstrumentet var felet, inte systemet — återigen.
const utanUnderlag = medBesparing.filter((r) => r.saknar_enheter);
console.log(`FRÅGA 1 · rader med net_saving > 0 (route=auto, ej arkiverade): ${medBesparing.length}`);
if (medBesparing.length === 0) {
  console.log('  Inga sådana rader i produktionen — tillståndet kan inte uppstå i dag.');
} else {
  console.log(`  varav utan seat_count (byggPrisunderlag returnerar null utan det): ${utanUnderlag.length}`);
  for (const r of medBesparing.slice(0, 12)) {
    console.log(`    ${r.saknar_enheter ? '!!' : '  '} ${String(r.supplier).slice(0, 32).padEnd(32)} `
      + `${String(r.category).padEnd(20)} net=${String(r.net_saving).padEnd(8)} seats=${r.seat_count ?? 'NULL'}`);
  }
  console.log(utanUnderlag.length
    ? '\n  TILLSTANDET KAN UPPSTA: raden bar en besparing men kan inte producera ett prisunderlag,'
      + '\n  alltsa raknas den som «ej prissatt» i rubriken medan beloppet anda summeras i domen.'
    : '\n  OK — VARJE rad med besparing bar seat_count, sa motsagelsen kan inte uppsta av den orsaken.'
      + '\n  (Ankaret kan fortfarande saknas for en kategori; det matas inte harifran.)');
}

// ── FRÅGA 2 ──────────────────────────────────────────────────────────────────────────────────
// Vilka triage_reason produktionen FAKTISKT producerar för de deklarerade kategorierna.
const triagade = await db`
  SELECT category, triage_reason, route, COUNT(*)::int AS antal
  FROM invoice_analyses            -- kundvy
  WHERE arkiverad_at IS NULL
    AND category = ANY(${kategorier})
    AND (triage_reason IS NOT NULL OR route IN ('unsupported', 'review_queue'))
  GROUP BY category, triage_reason, route
  ORDER BY antal DESC
`;

console.log(`\nFRÅGA 2 · triagade rader i de ${kategorier.length} deklarerade kategorierna: `
  + `${triagade.reduce((s, r) => s + r.antal, 0)} st i ${triagade.length} kombination(er)`);
const NAR_REGISTRET = new Set(['no_benchmark', 'out_of_scope', 'unsupported_category']);
let nar = 0;
for (const r of triagade) {
  const traff = [...NAR_REGISTRET].some((k) => String(r.triage_reason ?? '').includes(k));
  if (traff) nar += r.antal;
  console.log(`  ${traff ? '→ NÅR' : '  når inte'}  ${String(r.category).padEnd(20)} `
    + `${String(r.triage_reason ?? '(null)').padEnd(28)} route=${String(r.route).padEnd(13)} ${r.antal}`);
}
if (triagade.length === 0) {
  console.log('  INGA triagade rader alls i dessa kategorier — beskeden har ingen rad att visas på,');
  console.log('  och det är ett utfall om DATAN, inte ett bevis att inkopplingen fungerar.');
} else {
  console.log(`\n  Rader som når registergrenen: ${nar} av ${triagade.reduce((s, r) => s + r.antal, 0)}`);
  if (nar === 0) {
    console.log('  ⚠️ NOLL. Inkopplingen sitter på en signal produktionen aldrig sänder — granskningens F2 bekräftad.');
  }
}

console.log('\n[probe-rumsmotsagelsen] klar\n');
