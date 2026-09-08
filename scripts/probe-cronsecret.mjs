// scripts/probe-cronsecret.mjs — ÄR CRON_SECRET SATT I PRODUKTIONEN, OCH STÄNGER GRINDEN?
//
// ══ VARFÖR (2026-09-08) ════════════════════════════════════════════════════════════════════
// Öppet sedan 16 augusti. Mätt i koden: hemligheten läses av två grindar med MOTSATT form, och
// utan den är BÅDA fel — åt olika håll:
//
//   `lib/cronvakt.js` (update-fx-rate, generate-briefings, arvodeskorning)   nekar utan hemlighet (SL-04)
//       osatt hemlighet → nekar ALLT, inklusive Vercels egen cron. Tre jobb kör inte alls.
//
//   `api/cron/drain-ingest.mjs`  `if (secret && auth !== ...)`               SLÄPPER IN utan hemlighet
//       osatt hemlighet → autentiseringen är AV. Vem som helst kan anropa den, varje minut.
//
// TVÅ FRÅGOR, TVÅ OBEROENDE MÄTNINGAR — och den andra är den bärande:
//   1. Rapporterar /api/health att variabeln finns?  (den säger presence, aldrig värdet)
//   2. NEKAR drain-ingest en TOM bärartoken?         (det är beteendet, inte konfigurationen)
//
// Fråga 2 måste ställas, för fråga 1 kan svara «✓ present» på en deploy som ännu inte plockat
// upp variabeln — Vercel kräver en REDEPLOY för att miljövariabler ska slå igenom. En sond som
// bara läser health hade då rapporterat klart på ett system som fortfarande står öppet.
//
// SKICKAR ALDRIG ETT HEMLIGT VÄRDE. Sonden har ingen hemlighet och behöver ingen: den prövar
// exakt det fall som ska NEKAS. Ett 200-svar på en tom token är beviset att grinden är av.
//
// FÅNGAR: att variabeln saknas, och att den finns men inte nått den körande deployen.
// BLIND: den kan inte se om GitHub-hemligheten är satt — den bor hos GitHub och syns bara när en
//   workflow kör. `kor-drainen.yml` är provet för den, och den måste köras separat.
//   Den kan heller inte se om värdena är LIKA på båda ställen; olika värden ser härifrån ut
//   precis som rätt konfiguration, och avslöjas först när drain-workflowen nekas.

const BAS = process.env.ARVO_BASE_URL || 'https://arvoflow.se';

async function hamta(sokvag, init) {
  const t = Date.now();
  try {
    const r = await fetch(`${BAS}${sokvag}`, { ...init, signal: AbortSignal.timeout(20000) });
    const text = await r.text();
    return { status: r.status, text, ms: Date.now() - t };
  } catch (err) {
    return { status: null, fel: err.message, ms: Date.now() - t };
  }
}

console.log(`\n═══ CRON_SECRET I PRODUKTIONEN — ${BAS} ═══\n`);

// ── FRÅGA 1: rapporterar health att variabeln finns? ───────────────────────────────────────
const h = await hamta('/api/health');
let healthSager = null;
if (h.status == null) {
  console.log(`1. /api/health — NÅDDE INTE FRAM (${h.fel}). Detta är INTE ett mätvärde.`);
} else {
  try {
    const d = JSON.parse(h.text);
    healthSager = d?.checks?.CRON_SECRET ?? '(rapporteras inte)';
    console.log(`1. /api/health svarade ${h.status} · CRON_SECRET: ${healthSager}`);
    const saknade = Object.entries(d?.checks ?? {})
      .filter(([, v]) => String(v).includes('MISSING'))
      .map(([k]) => k);
    if (saknade.length) console.log(`   ⚠ KRITISKA variabler saknas: ${saknade.join(', ')}`);
  } catch {
    console.log(`1. /api/health svarade ${h.status} men inte JSON — kunde inte läsa svaret.`);
  }
}

// ── FRÅGA 2: STÄNGER grinden? Det är beteendet, inte konfigurationen. ──────────────────────
// En TOM bärartoken ska nekas. Med osatt hemlighet saknar drain-ingest grind och svarar 200.
const d = await hamta('/api/cron/drain-ingest', {
  method: 'GET', headers: { Authorization: 'Bearer ' },
});
console.log('');
if (d.status == null) {
  console.log(`2. /api/cron/drain-ingest — NÅDDE INTE FRAM (${d.fel}). Detta är INTE ett mätvärde.`);
} else if (d.status === 401 || d.status === 403) {
  console.log(`2. drain-ingest NEKADE en tom bärartoken (${d.status}) — grinden är PÅ. ✓`);
} else if (d.status === 200) {
  console.log(`2. ⚠ drain-ingest SLÄPPTE IGENOM en tom bärartoken (200) — grinden är AV.`);
  console.log('   Antingen är CRON_SECRET osatt, eller så har deployen inte plockat upp den.');
  console.log('   Vercel kräver en REDEPLOY efter att en miljövariabel lagts till.');
} else {
  console.log(`2. drain-ingest svarade ${d.status} — varken 200 eller 401. Läs svaret innan du drar en slutsats:`);
  console.log(`   ${d.text.slice(0, 200)}`);
}

// ── DOMEN: de två frågorna tillsammans, och de kan säga emot varandra ──────────────────────
console.log('\n─── DOM ───');
const finns = typeof healthSager === 'string' && healthSager.includes('present');
const stanger = d.status === 401 || d.status === 403;
if (finns && stanger) {
  console.log('✓ KLART. Variabeln finns OCH grinden stänger i den körande deployen.');
  console.log('  Kvar: GitHub-hemligheten kan inte mätas härifrån — kör `kor-drainen.yml`.');
} else if (finns && d.status === 200) {
  console.log('⚠ HALVKLART. Variabeln är satt men den körande deployen har inte plockat upp den.');
  console.log('  Gör en REDEPLOY i Vercel (Deployments → ⋯ → Redeploy) och kör sonden igen.');
} else if (!finns && stanger) {
  console.log('⚠ MOTSÄGELSE. Health säger att variabeln saknas men grinden stänger ändå.');
  console.log('  Läs båda raderna ovan innan du drar en slutsats — en av mätningarna ljuger.');
} else if (h.status == null || d.status == null) {
  console.log('✗ OKÄNT. Sonden nådde inte fram — det är inte samma sak som att något är fel.');
} else {
  console.log('✗ INTE KLART. CRON_SECRET är inte satt i produktionen.');
  console.log('  Tre cron-jobb nekar Vercels egen cron, och drain-ingest står utan autentisering.');
}
console.log('');
