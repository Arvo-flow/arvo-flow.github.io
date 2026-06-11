// lib/prose-guard.js — Prosakravet: varje tal AI:n skriver måste finnas i fakta.
//
// Regel 2 i CLAUDE.md säger "AI tolkar, kod räknar" — men modellen kan fortfarande
// FELBENÄMNA eller hitta på tal i sin prosa (683-felet: korrekt tal, fel attribuering;
// och i värsta fall ett tal som inte finns alls). Prosakravet stänger den luckan
// deterministiskt: extrahera alla tal ur resonemanget och verifiera att varje tal
// förekommer i prompten (som innehåller ALLA injicerade, kodberäknade fakta).
//
// Ett tal som inte finns i prompten kan modellen bara ha räknat fram själv —
// vilket är förbjudet. Lanseras i SKUGG-LÄGE (logg), armeras via PROSAKRAV_ENFORCE=1.

// Tal som alltid är tillåtna utan källa: små uppräkningar (steg 1–12, månader),
// vardagstal i copy (20 % arvodet, 24 h, 100 %). Hålls MEDVETET snäv —
// hellre falsklarm i skuggfasen än hål i skyddet.
const ALLOWED_FREE = new Set([
  '0','1','2','3','4','5','6','7','8','9','10','11','12',
  '20','24','25','30','48','50','100',
]);

/**
 * Extraherar alla tal ur svensk text, normaliserade till jämförbar form.
 * Hanterar sv-SE-format: mellanslag/­hårda mellanslag som tusentalsavgränsare
 * ("475 440", "24 569"), decimalkomma ("384,70"), procent och enheter.
 */
export function extractNumbers(text) {
  if (!text) return [];
  // Normalisera alla mellanslagsvarianter inuti talgrupper
  const t = String(text).replace(/[   ]/g, ' ');
  const matches = t.match(/\d[\d ]*(?:[.,]\d+)?/g) ?? [];
  return matches.map((m) =>
    m.replace(/ /g, '').replace(',', '.').replace(/\.$/, '').replace(/^0+(?=\d)/, '')
  ).filter((m) => m.length > 0);
}

/**
 * Kontrollerar att varje tal i prosan har täckning i faktatexten.
 *
 * @param {string} prose       - AI-genererad text (reasoning)
 * @param {string} factsText   - prompten (systemtext + faktablock) — källan till alla tillåtna tal
 * @returns {{ ok: boolean, checked: number, violations: string[] }}
 */
export function checkProseNumbers(prose, factsText) {
  try {
    const allowed = new Set([...extractNumbers(factsText), ...ALLOWED_FREE]);

    // Tillåt även varje fakta-tals avrundningar (AI får skriva "ca 24 600" för 24 569? NEJ —
    // avrundning är egen aritmetik. Däremot tillåts decimalsuffix-varianter: "384,70" ↔ "384.7")
    for (const n of [...allowed]) {
      if (n.includes('.')) {
        allowed.add(n.replace(/0+$/, '').replace(/\.$/, '')); // 384.70 → 384.7
        allowed.add(n.split('.')[0] + '.' + (n.split('.')[1] ?? '').padEnd(2, '0')); // 384.7 → 384.70
      }
    }

    const found = extractNumbers(prose);
    const violations = [...new Set(found.filter((n) => !allowed.has(n)))];
    return { ok: violations.length === 0, checked: found.length, violations };
  } catch (err) {
    console.warn('[prosakrav] fail-open:', err.message);
    return { ok: true, checked: 0, violations: [] };
  }
}
