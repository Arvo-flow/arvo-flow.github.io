// lib/bytesdelar.js — vad en lagrad besparing består av, skrivet när analysen görs.
//
// VARFÖR (grundarbeslut 2026-11-04, «stäng av vid källan»). Fakturavägen räknade mobilens bytesmål mot
// det billigaste abonnemanget, så 349-planen till exakt listpris lagrades med «byte till 269» och 9 600 kr:
// planvalet räknat som besparing. Raden lagrade bara summan. Fem granskningsvarv på rummet (c1) visade att
// delarna inte går att räkna fram ur en lagrad rad i efterhand utan att någon gång säga fel: prisboken
// rör sig, extraktionens flaggor sparas inte, och ett gränsvärde kan ha passerats sedan analysen.
//
// Nu räknar fakturavägen inget primärt byte i en sådan kategori (planvalsgrinden i recommend.js), och
// analysen lagrar själv vad besparingen består av. Rummet läser delarna och räknar ingenting om.
//
// FÅNGAR: en lagrad besparing vars delar inte går att läsa; en mobilrad vars byte rummet skulle behöva
//   gissa.
// BLIND: delarna är analysens egna tal; att de stämmer prövas av fakturavägens tester, inte här. En rad
//   lagrad före grinden bär inga delar, och rummet visar då inget byte för den (BD-02).

export const BYTESDELAR_VERSION = 1;

/**
 * Delarna för en analys, så som api/test-invoice.mjs summerar dem: primärt brutto (recommend) och den
 * sekundära delen på en kombinerad faktura (computeSecondarySaving). `planvalsgrind` säger att det primära
 * bytet inte räknades eftersom bytesmålet hade varit kategorins golv (BD-01).
 */
export function bytesdelarForAnalys({ recommendation, primaryGross, secondarySaving }) {
  const sek = secondarySaving && Number(secondarySaving.grossSaving) > 0
    ? { kategori: secondarySaving.category ?? null, brutto: Number(secondarySaving.grossSaving) }
    : null;
  return {
    version: BYTESDELAR_VERSION,
    planvalsgrind: recommendation?.planvalsgrind != null,
    primarBrutto: Number(primaryGross) > 0 ? Number(primaryGross) : 0,
    sekundar: sek,
  };
}

/**
 * Läser en lagrad rads delar, eller null när raden saknar dem (lagrad före grinden, eller läst utan
 * kolumnen). Bara version 1 känns igen; en okänd form är ett okänt, aldrig ett giltigt svar.
 */
export function lasBytesdelar(a) {
  let d = a?.bytesdelar_json ?? null;
  if (typeof d === 'string') { try { d = JSON.parse(d); } catch { d = null; } }
  if (!d || typeof d !== 'object' || d.version !== BYTESDELAR_VERSION) return null;
  return d;
}
