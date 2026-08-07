// lib/mattsystem.js — MÅTTSYSTEMETS DOMARE: den rena regeln bakom MITTLINJEN-vakten.
//
// Bakgrund (2026-08-07): underlagskortet stod 60px höger om sidans mittlinje på skarpa sajten
// — en negativ marginal räknad för hand mot en förälder som ANTOGS (.inner 680) men i
// verkligheten var DoorBlock (560). Ingen svit kunde se det: geometri bor i utlagd CSS och når
// aldrig tests/run.mjs. Grundaren såg det med ögat.
//
// Vakten mäter i DOM (scripts/live-door-lekia.mjs), men OMDÖMET bor här — rent, importerbart
// och testlåst (tests/mattsystem.mjs). Skälet är den läxa vakten gav oss en timme efter att den
// föddes: dess första version kedjades vid en klass som inte fanns live, mätte noll fall och lät
// körningen bli GRÖN. En vakt vars logik inte går att prova är en vakt vi bara HOPPAS på.
//
// Två invarianter, båda hårda:
//   1 · bilagan delar MITTLINJE med sidan (annars läser instrumentet som skevt)
//   2 · bilagan delar KANT med kolumnen som sektionsregeln ritar (annars bryter bilagan ut ur
//       sin egen ram — det var precis vad −100px gjorde)
// Och en tredje, den viktigaste: "kunde inte mäta" är ALDRIG ett godkännande.

export const MATT_TOLERANS_PX = 1;

/**
 * Dömer en mätning från dörren.
 * @param {object} matt — { ingetKort } | { trasig: string } | { kortMitt, sidMitt, kantAvvik }
 * @returns {{ ok: boolean, tyst: boolean, skal: string|null, skevhet: number|null }}
 *   ok=true  → måttet håller (eller det fanns inget kort att mäta — laglig tystnad)
 *   tyst=true → inget kort på sidan; ingen mätning gjordes och ingen utlovades
 *   skal      → människoläsbart skäl när ok=false
 */
export function bedomMatt(matt) {
  if (!matt || typeof matt !== 'object') {
    return { ok: false, tyst: false, skal: 'ingen mätning levererad — vakten kan inte tiga sig till godkänt', skevhet: null };
  }
  // Spökdomänen: sidan visar ärligt besked utan kort. Inget att mäta, och FYND/NOT bevisar redan
  // att beskedet står där. Detta är den ENDA lagliga tystnaden.
  if (matt.ingetKort) return { ok: true, tyst: true, skal: null, skevhet: null };

  // Kortet finns men gick inte att mäta (saknad kolumn, saknad förälder, omdöpt krok).
  // Det är ett FEL, aldrig en passage — annars återuppstår den avstängda vakten.
  if (matt.trasig) {
    return { ok: false, tyst: false, skal: `kunde inte mäta (${matt.trasig})`, skevhet: null };
  }

  const tal = ['kortMitt', 'sidMitt', 'kantAvvik'];
  if (tal.some((k) => typeof matt[k] !== 'number' || !Number.isFinite(matt[k]))) {
    return { ok: false, tyst: false, skal: 'ofullständig mätning — ett saknat tal är inte noll', skevhet: null };
  }

  const skevhet = Math.abs(matt.kortMitt - matt.sidMitt);
  const skalen = [];
  if (skevhet > MATT_TOLERANS_PX) skalen.push(`skevhet ${skevhet.toFixed(1)}px mot sidans mittlinje`);
  if (Math.abs(matt.kantAvvik) > MATT_TOLERANS_PX) skalen.push(`kantavvikelse ${Math.abs(matt.kantAvvik).toFixed(1)}px mot kolumnen`);
  return { ok: skalen.length === 0, tyst: false, skal: skalen.length ? skalen.join(' · ') : null, skevhet };
}
