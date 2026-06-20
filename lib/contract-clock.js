// lib/contract-clock.js — Maktkalendern på riktigt: den deterministiska kontraktsklockan.
//
// Zero Trust (regel 3): datumet kommer ur kundens EGEN faktura. `servicePeriodEnd` sätts av
// extract.js ENDAST när fakturan uttalar bindningstid/avtalstid med ett slutdatum (aldrig nästa
// faktureringsdatum — se extract.js rad 144–165). Saknas det riktiga slutdatumet visar vi inget:
// tystnad är default (regel 4 — precision eller tystnad). Vi gissar aldrig en bindningstid.
//
// Producerar ett fynd i FindingCard-form (samma komponent som forensik-fynden, regel 1 — en
// sanning), men med tone:'watch' — klockan är vaktens lugna besked, inte ett amber-larm:
// "Ni är bundna till [datum] · [N dagar kvar] · vi bevakar och agerar innan tyst förnyelse."
//
// EN källa för klock-copyn: både auto-rutten (faktura med rekommendation) och monitoring-rutten
// (terminalt avtalslås) läser härifrån, så de två ytorna aldrig kan säga olika om samma avtal.

const DAY_MS = 24 * 60 * 60 * 1000;

function fmtSvDate(d) {
  const s = new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/**
 * @param {object} args
 * @param {string|null} args.servicePeriodEnd     - ISO YYYY-MM-DD, avtalets bindningsslut (ur fakturan)
 * @param {number|null} args.cancellationNoticeDays - uppsägningstid i dagar (ur fakturan), eller null
 * @param {string|null} args.supplier             - leverantörsnamn (för copyn)
 * @param {Date}        args.today                - referensdatum (default nu) — injicerbart för test
 * @returns {object|null} contract-clock-fynd (FindingCard-form) eller null när inget verkligt bindningsslut finns
 */
export function contractClockFinding({ servicePeriodEnd, cancellationNoticeDays = null, supplier = null, today = new Date() } = {}) {
  if (!servicePeriodEnd) return null;
  const end = startOfDay(new Date(servicePeriodEnd));
  if (Number.isNaN(end.getTime())) return null;

  const t0 = startOfDay(today);
  const daysLeft = Math.round((end - t0) / DAY_MS);
  if (daysLeft <= 0) return null; // bindningen redan löpt ut → ingen klocka (route hanterar förfallet)

  const notice = (cancellationNoticeDays != null && Number(cancellationNoticeDays) > 0)
    ? Math.round(Number(cancellationNoticeDays))
    : null;

  // Sista dagen att säga upp innan tyst förnyelse = bindningsslut − uppsägningstid.
  const actBy = notice ? startOfDay(new Date(end.getTime() - notice * DAY_MS)) : null;
  const actByFuture = actBy && actBy > t0;
  const daysToAct = actByFuture ? Math.round((actBy - t0) / DAY_MS) : null;

  const sup = supplier && String(supplier).trim() ? String(supplier).trim() : 'er nuvarande leverantör';
  const endStr = fmtSvDate(end);

  let text;
  if (notice && actByFuture) {
    text = `Avtalet med ${sup} löper till ${endStr}. Uppsägningstiden är ${notice} dagar — sista dagen att säga upp innan det tyst förnyas är ${fmtSvDate(actBy)}. Arvo bevakar datumet och hör av sig i god tid, så att förnyelsen blir ert val och inte leverantörens.`;
  } else if (notice && !actByFuture) {
    text = `Avtalet med ${sup} löper till ${endStr}, med ${notice} dagars uppsägningstid. Fönstret att säga upp inför nästa period är nära eller passerat — Arvo bevakar och förbereder motdraget inför förfallet.`;
  } else {
    text = `Avtalet med ${sup} löper till ${endStr}. Arvo bevakar förfallodatumet och hör av sig i god tid före en tyst förnyelse, så att nästa period blir ert val.`;
  }

  const dagarStr = new Intl.NumberFormat('sv-SE').format(daysLeft);

  return {
    kind: 'contract-clock',
    tone: 'watch',
    title: `Ni är bundna till ${endStr}`,
    metricText: `${dagarStr} ${daysLeft === 1 ? 'dag' : 'dagar'} kvar`,
    lineDescription: notice ? `Uppsägningstid: ${notice} dagar` : null,
    annualImpact: 0,
    text,
    endDate: end.toISOString().slice(0, 10),
    daysLeft,
    actByDate: actBy ? actBy.toISOString().slice(0, 10) : null,
    daysToAct,
  };
}
