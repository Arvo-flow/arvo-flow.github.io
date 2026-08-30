// scripts/probe-arvodeskorning.mjs — träffar den LIVE-utlagda arvodeskörningen.
//
// Bevisar två saker som ingen lokal körning kan bevisa (Verifieringsplikten p.2 — den riktiga
// maskinen, inte en modell av den):
//   1. att endpointen är ROUTAD i produktion (utan auth ska den svara 401, aldrig 404)
//   2. vad liggaren FAKTISKT innehåller där, inte vad den innehåller på en disk som dör
//
// Sonden mäter sin egen ankomst. Ett svar den inte kan tolka är ett MISSLYCKANDE, aldrig ett
// mätvärde — annars kan «0 fakturerbara» betyda «sonden kom aldrig fram» (SV-09-läxan: en sond
// vars enda möjliga svar är ett larm är inget mätinstrument).

const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const URL_ = `${BASE}/api/cron/arvodeskorning`;
const HEMLIGHET = process.env.CRON_SECRET || '';

let fel = 0;

// ── 1. Routning: utan auth ska endpointen finnas OCH neka ────────────────────────────────────
const utanAuth = await fetch(URL_).catch((e) => ({ status: 0, _fel: e.message }));
console.log(`[routning] utan auth → HTTP ${utanAuth.status}${utanAuth._fel ? ` (${utanAuth._fel})` : ''}`);
if (utanAuth.status === 404) { console.error('✗ endpointen är INTE deployad (404)'); fel++; }
else if (utanAuth.status !== 401) { console.error(`✗ förväntade 401 utan auth, fick ${utanAuth.status}`); fel++; }
else console.log('✓ routad och skyddad');

// ── 2. Körningen med auth ────────────────────────────────────────────────────────────────────
if (!HEMLIGHET) {
  console.error('✗ CRON_SECRET saknas — körningen kunde INTE mätas (detta är inte ett mätvärde)');
  fel++;
} else {
  const res = await fetch(URL_, { headers: { Authorization: `Bearer ${HEMLIGHET}` } })
    .catch((e) => ({ status: 0, _fel: e.message }));
  // Felet NAMNGES, aldrig sväljs: ett otolkbart svar och ett svar med tom kö får inte se likadana ut.
  let kropp = null;
  let tolkfel = res._fel ?? 'inget svar';
  if (typeof res.json === 'function') {
    try { kropp = await res.json(); } catch (e) { tolkfel = e.message; }
  }
  if (!kropp) {
    console.error(`✗ inget tolkbart svar (HTTP ${res.status}): ${tolkfel} — sonden kom inte fram`);
    fel++;
  } else if (res.status === 503) {
    // Detta är ett giltigt utfall och ska INTE maskeras som noll: produktionen har en databas,
    // så en 503 här betyder att den inte gick att nå — ett larm, inte en tom kö.
    console.error(`✗ liggaren är OKÄND i produktion (skal=${kropp.skal}) — databasen svarade inte`);
    fel++;
  } else if (res.status !== 200) {
    console.error(`✗ HTTP ${res.status}: ${JSON.stringify(kropp)}`);
    fel++;
  } else {
    console.log('=== ARVODESKÖRNINGEN LIVE ===');
    console.log(JSON.stringify({
      liggarePoster: kropp.liggarePoster,
      karensDagar:   kropp.karensDagar,
      fakturerbara:  kropp.fakturerbara?.length,
      summa:         kropp.summa,
      hallna:        kropp.hallna?.length,
      hanterade:     kropp.hanterade?.length,
      trasiga:       kropp.trasiga?.length,
      atgard:        kropp.atgard,
    }, null, 2));
    // De två nollornas skillnad, utskriven så att ingen läsare behöver gissa.
    if (kropp.liggarePoster === 0) {
      console.log('· Liggaren är TOM. Väntat: Switch-rälsen är mode:\'stub\' och inga byten har gjorts.');
      console.log('  Den dagen rälsen blir skarp måste orkestratorn instansieras med PgStore —');
      console.log('  annars är tabellen tom av FEL skäl och ser likadan ut härifrån.');
    } else {
      console.log(`· Liggaren bär ${kropp.liggarePoster} post(er); ${kropp.fakturerbara?.length ?? 0} är mogna.`);
    }
    for (const r of kropp.trasiga ?? []) console.error(`✗ TRASIG post ${r.id}: ${r.fel}`);
  }
}

console.log(fel === 0 ? '\n✓ sonden kom fram och mätte' : `\n✗ ${fel} problem`);
process.exit(fel === 0 ? 0 : 1);
