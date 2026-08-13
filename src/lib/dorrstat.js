// src/lib/dorrstat.js — klientens ände av dörrmätningen (grundarbeslut 2026-08-13).
//
// TRE LAGAR, och de är samma slag som styr resten av dörren:
//
// 1. MÄTNINGEN FÅR ALDRIG KOSTA KUNDEN NÅGOT. `sendBeacon` skickar i bakgrunden utan att blockera
//    navigering eller rendering, och varje anrop är inlindat i try/catch. En trasig mätning ska
//    kosta OSS data — aldrig kosta besökaren en upplevelse.
//
// 2. DOMÄNEN PASSERAR ALDRIG HIT. Funktionen tar ett händelsenamn och ett antal, inget annat.
//    Det finns medvetet ingen parameter att råka skicka en domän i: dörren lovar "innan ni delat
//    något", och api/reveal lagrar ingenting. En mätning som sparade domänen hade gjort vårt eget
//    löfte falskt.
//
// 3. SESSIONS-ID:T DÖR MED FLIKEN. sessionStorage, inte localStorage och inte en cookie — vi vill
//    kunna räkna en TRATT (samma besökare genom stegen), inte känna igen någon som återvänder.
//    Slumpat, base36, utan koppling till något om personen.

const NYCKEL = 'arvo_dorr_sess';

function sessionsId() {
  try {
    let s = sessionStorage.getItem(NYCKEL);
    if (!s) {
      // 2×base36 ger ~20 tecken slump — vida över kollisionsrisk för vår volym, och matchar
      // formmönstret som servern validerar (a–z0–9, 8–64 tecken).
      s = (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 24);
      sessionStorage.setItem(NYCKEL, s);
    }
    return s;
  } catch {
    return null;   // privatläge/blockerad lagring → vi mäter inte, och det är helt i sin ordning
  }
}

// En gång per session, oavsett hur många gånger komponenten monteras (StrictMode dubbelmonterar
// i utveckling, och en tillbakanavigering monterar om). Utan den här spärren hade "dörr_visad"
// räknats flera gånger per besökare och gett en konverteringsgrad som ser sämre ut än verkligheten.
const skickade = new Set();

export function spara(handelse, { fynd = null, engang = false } = {}) {
  try {
    if (engang) {
      if (skickade.has(handelse)) return;
      skickade.add(handelse);
    }
    const sess = sessionsId();
    if (!sess) return;
    const kropp = JSON.stringify({
      handelse,
      sess,
      bredd: typeof window !== 'undefined' ? window.innerWidth : null,
      // Number(null) är 0 och 0 är ändligt — den gamla kontrollen skrev därför "fynd: 0" på
      // varje händelse som inte har något fyndbegrepp alls. Ett falskt nollvärde i en datakolumn
      // är värre än ett tomt: det läses senare som ett utfall ("hälften av korten hade noll
      // fynd"). Bara ett verkligt tal får passera.
      ...(typeof fynd === 'number' && Number.isFinite(fynd) ? { fynd } : {}),
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/dorr-handelse', new Blob([kropp], { type: 'application/json' }));
      return;
    }
    // Äldre webbläsare: keepalive gör att anropet överlever ett sidbyte. Fel sväljs — mätningen
    // är aldrig viktigare än sidan den mäter.
    fetch('/api/dorr-handelse', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: kropp, keepalive: true,
    }).catch(() => {});
  } catch { /* mätningen tiger hellre än stör */ }
}
