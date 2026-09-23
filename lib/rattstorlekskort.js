// lib/rattstorlekskort.js — ETT LAGRAT RÄTT-STORLEKSFYND SOM ETT KORT I RUMMET.
//
// Flyttad från src/lib/ 2026-09-23 (Lägesregistret): kortet byggs i api-lagret och skickas färdigt i
// `rum.rattstorlekKort` — rummet väljer inte längre själv vilka fynd som gäller (t.ex. löneadmin vid
// golvet), det renderar bara.
//
// Talen kommer färdiga ur motorn (lib/rattstorleksfynd.js lagrar dem, `rattstorlek_json`). Här
// räknas INGENTING (regel 2) — modulen väljer bara ord runt talen, och skriver dem vid LÄSNING så
// att en copyrättelse når varje lagrad rad utan omkörning.
//
// ══ ORDVALET ÄR LASTBÄRANDE ═════════════════════════════════════════════════════════════════
// Motorerna jämför LISTPRIS mot LISTPRIS. Kunden kan ha rabatt — live-svaret 2026-09-23 visade
// Adobe-kunden på 656,25 kr/licens mot listpris 746,00 — så en mening som «Ni betalar 746 kr» är
// falsk om kundens eget papper. Därför står «listpris» vid varje sådant tal, och skillnaden kallas
// «listprisskillnad», aldrig «er besparing». Löneadmin är undantaget: där ÄR talet kundens eget
// (fakturans månadskostnad per anställd), och då får det heta «Ni betalar».
//
// Ett objekt vars form vi inte känner igen ger `null` — hellre inget kort än ett halvt (RS-04).

import { fmtNumber, genitiv } from './format.js';

const har = (o, ...k) => k.every((f) => o?.[f] != null && o[f] !== '');
const positivt = (n) => typeof n === 'number' && Number.isFinite(n) && n > 0;

const BYGGARE = {
  saasFinanceRightsizing(r) {
    if (!har(r, 'vendor', 'currentPaket', 'currentMonthly', 'targetPaket', 'targetMonthly') || !positivt(r.annualSaving)) return null;
    return {
      title: `${r.vendor} ${r.currentPaket} → ${r.targetPaket}`,
      annualImpact: r.annualSaving,
      text: `Ni har ${r.vendor} ${r.currentPaket}, listpris ${fmtNumber(r.currentMonthly)} kr/mån. Nivån under, `
        + `${r.targetPaket}, har listpris ${fmtNumber(r.targetMonthly)} kr/mån. Listprisskillnaden gäller om er `
        + `användning ryms i ${r.targetPaket} — verifierad mot ${genitiv(r.vendor)} publika listpris.`,
    };
  },
  m365Rightsizing(r) {
    if (!har(r, 'currentLabel', 'currentPerSeatLabel', 'targetLabel', 'targetPerSeatLabel', 'seats', 'currentTier')
      || !positivt(r.annualSaving)) return null;
    return {
      title: `${r.currentLabel} → ${r.targetLabel}`,
      annualImpact: r.annualSaving,
      text: `Ni har ${r.currentLabel} för ${r.seats} användare, listpris ${r.currentPerSeatLabel} kr/användare/mån. `
        + `${r.targetLabel} har listpris ${r.targetPerSeatLabel} kr/användare/mån. Listprisskillnaden gäller om ni inte `
        + `behöver ${String(r.currentTier).toUpperCase()}:s enterprise-funktioner — verifierad mot Microsofts publika listpris.`,
    };
  },
  adobeRightsizing(r) {
    if (!har(r, 'currentLabel', 'currentMonthlyLabel', 'targetLabel', 'targetMonthlyLabel', 'unit', 'perSeatDeltaLabel')) return null;
    const medTotal = positivt(r.annualSaving) && positivt(r.seats);
    return {
      title: `Adobe ${r.currentLabel} → ${r.targetLabel}`,
      ...(medTotal ? { annualImpact: r.annualSaving } : { metricText: `${r.perSeatDeltaLabel} ${r.unit}` }),
      text: `Ni har Adobe ${r.currentLabel}, listpris ${r.currentMonthlyLabel} ${r.unit} exkl moms. ${r.targetLabel} `
        + `har listpris ${r.targetMonthlyLabel} ${r.unit}. `
        + (medTotal
          ? `Listprisskillnaden för era ${r.seats} licenser gäller om varje användare klarar sig med ett program`
          : 'Antalet licenser gick inte att läsa, så vi visar skillnaden per licens. Den gäller om varje användare klarar sig med ett program')
        + ' — verifierad mot Adobes publika listpris.',
    };
  },
  loneadminRightsizing(r) {
    if (r?.alreadyFortnox || r?.aboveFloor !== true || !positivt(r.annualSaving)) return null;
    if (!har(r, 'perEmployeeLabel', 'floorPerEmployeeLabel', 'headcount')) return null;
    const produkt = r.fortnoxProduct || 'Fortnox Lön';
    return {
      title: `Lönehantering → ${produkt}`,
      annualImpact: r.annualSaving,
      text: `Ni betalar ${r.perEmployeeLabel} kr/anställd/mån för ${r.headcount} anställda. ${genitiv(produkt)} `
        + `verifierade golv vid er storlek är ${r.floorPerEmployeeLabel} kr/anställd/mån. Skillnaden gäller om er `
        + 'lönehantering ryms där'
        + (r.hasPayslip ? ' — rörliga lönebeskedsavgifter är inte medräknade.' : '.'),
    };
  },
};

/** Det lagrade fyndet som FindingCard-objekt, eller `null` (okänd form, inget fynd, tomt). */
export function rattstorleksKort(lagrat) {
  if (!lagrat || typeof lagrat !== 'object') return null;
  const bygg = BYGGARE[lagrat.falt];
  if (!bygg) return null;
  const kort = bygg(lagrat);
  return kort ? { type: 'rattstorlek', falt: lagrat.falt, ...kort } : null;
}

export const RATTSTORLEK_BYGGARE = Object.keys(BYGGARE);
