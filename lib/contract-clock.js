// lib/contract-clock.js — AVTALSKLOCKAN: EN källa för avtalets läge, i varje yta.
//
// Zero Trust (regel 3): slutdatum och uppsägningstid kommer ur kundens EGEN faktura. `servicePeriodEnd`
// sätts av extract.js ENDAST när fakturan uttalar bindningstid/avtalstid med ett slutdatum. Saknas det
// finns ingen klocka — vi gissar aldrig en bindningstid.
//
// ══ VARFÖR DEN SKREVS OM (grundarorder 2026-09-23, systemöversynen) ══════════════════════════
// Mätt, alla fyra i samma kedja:
//   1. Uppsägningstiden LAGRADES ALDRIG. Fakturavyn sa «sista dagen att säga upp är 3 oktober»,
//      rummet för samma avtal sa «Arvo … hör av sig i god tid», och påminnelsemejlen gick 60/30
//      dagar före SLUTDATUM — alltså efter sista uppsägningsdag vid varje uppsägningstid över 30 dagar.
//   2. «3 månader» räknades som 90 DYGN (AI:n räknade om i extraktionen, klockan drog av dygn).
//      Sista dagen angavs upp till två dagar för SENT (1 jan − 3 mån = 1 okt, inte 3 okt). AK-02.
//      `lib/contract-intel.js` hade redan den rätta kalenderberäkningen — det här var en andra
//      kopia med felet (regel 1). Nu importeras den enda.
//   3. Rutten (api/test-invoice) förklarade uppsägningsfönstret PASSERAT så snart uppsägningstiden
//      var känd, oavsett datum, och räknade «lås-deadline» från STARTdatum. Kunden läste «Uppsägnings-
//      tiden (30 dagar) har redan passerat» om ett avtal vars sista dag låg 270 dagar bort. AK-06.
//   4. Den okända uppsägningstiden lånade ett löfte: «hör av sig i god tid» — utan att veta vad god tid
//      är. Ett okänt är ett eget läge med egen, ärlig text. AK-04.
//
// ══ LÄGENA — ett trevärt (femvärt) tillstånd läses ALDRIG av en tvåvägsgren ═══════════════════
//   ingen_klocka      — inget framtida slutdatum
//   fonster_oppet     — sista uppsägningsdag känd och i framtiden
//   sista_dag_idag    — sista uppsägningsdag är i dag
//   fonster_stangt    — sista dagen passerad (eller fastpris utan uppsägningsrätt): bundet till slutet
//   uppsagning_okand  — slutdatum känt, uppsägningstiden står inte på fakturan
//
// FÅNGAR: kalenderfel i sista dagen · okänt behandlat som känt · passerat behandlat som öppet ·
//   det gamla fältnamnet (kastar).
// BLIND: juridiska konventioner som «räknat från sista dagen i månaden» eller «mottagen senast» —
//   vi räknar slut − uppsägningstid och säger «senast». Och ett slutdatum som AI:n läst fel kan
//   klockan inte se; det är extraktionens grind, inte klockans.

import { sistaUppsagningsdag } from './contract-intel.js';

const DAY_MS = 24 * 60 * 60 * 1000;

// Registret i påståendekontraktets form (PK): inget läge påstår något om PRISET — klockan talar
// om datum. Det okända läget är `uppsagning_okand`, och det lovar ingenting (AK-04).
export const AVTALSLAGEN = {
  ingen_klocka:     { positivtPastaende: false },
  fonster_oppet:    { positivtPastaende: false },
  sista_dag_idag:   { positivtPastaende: false },
  fonster_stangt:   { positivtPastaende: false },
  uppsagning_okand: { positivtPastaende: false, omatt: true },
};

/** Bindningslängd över vilken ett avtal utan känd uppsägningstid bevakas i stället för att prissättas. */
export const BEVAKA_OKAND_OVER_DAGAR = 180;

const utcDag = (d) => new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
const isoDag = (d) => d.toISOString().slice(0, 10);

const fmtSvLiten = (d) => new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
const antal = (n, en, flera) => `${new Intl.NumberFormat('sv-SE').format(n)} ${n === 1 ? en : flera}`;

/**
 * Uppsägningstiden som den står tryckt — värde och enhet — normaliserad till contract-intels
 * regelform. Enheten avgör räkningen: månader räknas i kalendern, dagar och veckor i dygn.
 * Allt utanför banden eller tvetydigt är OKÄNT (null), aldrig en gissning.
 * @returns {{ uppsagningstidMan: number|null, uppsagningstidDagar: number|null }|null}
 */
export function lasUppsagning(u) {
  if (!u || typeof u !== 'object') return null;
  if (u.uppsagningstidMan != null || u.uppsagningstidDagar != null) {
    const man = u.uppsagningstidMan == null ? null : Number(u.uppsagningstidMan);
    const dagar = u.uppsagningstidDagar == null ? null : Number(u.uppsagningstidDagar);
    if (man != null && dagar != null) return null;                          // tvetydigt
    if (man != null) return Number.isInteger(man) && man >= 1 && man <= 24 ? { uppsagningstidMan: man, uppsagningstidDagar: null } : null;
    return Number.isInteger(dagar) && dagar >= 1 && dagar <= 730 ? { uppsagningstidMan: null, uppsagningstidDagar: dagar } : null;
  }
  const v = Number(u.varde);
  if (!Number.isInteger(v) || v < 1) return null;
  if (u.enhet === 'manader') return lasUppsagning({ uppsagningstidMan: v });
  if (u.enhet === 'veckor') return lasUppsagning({ uppsagningstidDagar: v * 7 });
  if (u.enhet === 'dagar') return lasUppsagning({ uppsagningstidDagar: v });
  return null;                                                             // okänd enhet = okänd uppsägningstid
}

export function uppsagningText(u) {
  if (!u) return null;
  return u.uppsagningstidMan != null ? antal(u.uppsagningstidMan, 'månad', 'månader') : antal(u.uppsagningstidDagar, 'dag', 'dagar');
}

/**
 * Avtalets läge i dag. Ren funktion — varje yta (fakturavyn, rummet, rutten, påminnelsemejlen) läser
 * den här, aldrig en egen räkning.
 */
export function avtalsklocka({ servicePeriodEnd = null, uppsagning = null, fastpris = false, today = new Date(), ...ovrigt } = {}) {
  // ETT OMDÖPT FÄLT SKA SMÄLLA (bibeln 24 aug): `cancellationNoticeDays` var dygn även när fakturan
  // sa månader. En anropare som skickar det gamla namnet hade tyst fått läget «okänd». AK-08.
  if ('cancellationNoticeDays' in ovrigt) throw new Error('avtalsklocka: cancellationNoticeDays är borttaget — skicka `uppsagning` ({varde, enhet} eller regelform)');
  const tom = { lage: 'ingen_klocka', slutdatum: null, dagarTillSlut: null, sistaDag: null, dagarTillSistaDag: null, uppsagning: null };
  // Postgres DATE kan komma som ett Date-objekt — en regex mot String(Date) hade gjort varje lagrat
  // slutdatum till «ingen klocka», ett tyst tapp i rummet och i påminnelserna (AK-01).
  const iso = servicePeriodEnd instanceof Date
    ? (Number.isNaN(servicePeriodEnd.getTime()) ? null : servicePeriodEnd.toISOString().slice(0, 10))
    : (servicePeriodEnd && /^\d{4}-\d{2}-\d{2}/.test(String(servicePeriodEnd)) ? String(servicePeriodEnd).slice(0, 10) : null);
  if (!iso) return tom;
  const slut = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(slut.getTime())) return tom;
  const t0 = utcDag(today);
  const dagarTillSlut = Math.round((slut - t0) / DAY_MS);
  if (dagarTillSlut <= 0) return tom;

  const u = lasUppsagning(uppsagning);
  const bas = { slutdatum: isoDag(slut), dagarTillSlut, uppsagning: u };
  if (fastpris) return { ...bas, lage: 'fonster_stangt', skal: 'fastpris', sistaDag: null, dagarTillSistaDag: null };
  if (!u) return { ...bas, lage: 'uppsagning_okand', sistaDag: null, dagarTillSistaDag: null };

  const sista = sistaUppsagningsdag(slut, u);
  const dagarTillSistaDag = Math.round((sista - t0) / DAY_MS);
  const lage = dagarTillSistaDag > 0 ? 'fonster_oppet' : dagarTillSistaDag === 0 ? 'sista_dag_idag' : 'fonster_stangt';
  return { ...bas, lage, skal: lage === 'fonster_stangt' ? 'uppsagning_passerad' : null, sistaDag: isoDag(sista), dagarTillSistaDag };
}

/**
 * Ska fakturan BEVAKAS i stället för att prissättas nu? Bara när kunden inte kan agera före slutet:
 * fönstret stängt, eller ett långt avtal vars uppsägningstid vi inte känner. Ett ÖPPET fönster
 * prissätts — det är precis då ett fynd är värt något. AK-06.
 */
export function avtalsRutt(klocka) {
  if (!klocka) return false;
  if (klocka.lage === 'fonster_stangt') return true;
  return klocka.lage === 'uppsagning_okand' && klocka.dagarTillSlut > BEVAKA_OKAND_OVER_DAGAR;
}

/**
 * Klockan som FindingCard-fynd. `paminnelse` kommer ur lib/paminnelse.js (samma beslut som cronen
 * fattar) — kortet lovar bara de mejl som faktiskt kommer att gå.
 * @param {{ datum: string[], kanal: 'epost'|null }|null} paminnelse
 */
export function contractClockFinding({ servicePeriodEnd, uppsagning = null, fastpris = false, supplier = null, paminnelse = null, today = new Date(), ...ovrigt } = {}) {
  const k = avtalsklocka({ servicePeriodEnd, uppsagning, fastpris, today, ...ovrigt });
  if (k.lage === 'ingen_klocka') return null;
  const sup = supplier && String(supplier).trim() ? String(supplier).trim() : 'er nuvarande leverantör';
  const slut = new Date(`${k.slutdatum}T00:00:00Z`);
  const slutStr = fmtSvLiten(slut);
  const ut = uppsagningText(k.uppsagning);

  let text;
  let title = `Ni är bundna till ${fmtSvLiten(slut)}`;
  if (k.lage === 'fonster_oppet') {
    title = `Sista uppsägningsdag ${fmtSvLiten(new Date(`${k.sistaDag}T00:00:00Z`))}`;
    text = `Avtalet med ${sup} löper till ${slutStr}. Uppsägningstiden är ${ut} — sista dagen att säga upp är `
      + `${fmtSvLiten(new Date(`${k.sistaDag}T00:00:00Z`))}, om ${antal(k.dagarTillSistaDag, 'dag', 'dagar')}.`;
  } else if (k.lage === 'sista_dag_idag') {
    title = 'Sista uppsägningsdag är i dag';
    text = `Avtalet med ${sup} löper till ${slutStr}. Uppsägningstiden är ${ut} — sista dagen att säga upp är i dag.`;
  } else if (k.lage === 'fonster_stangt' && k.skal === 'fastpris') {
    text = `Fastprisavtalet med ${sup} löper till ${slutStr} och kan inte sägas upp i förtid.`;
  } else if (k.lage === 'fonster_stangt') {
    text = `Avtalet med ${sup} löper till ${slutStr}. Med ${ut} uppsägningstid var sista dagen att säga upp `
      + `${fmtSvLiten(new Date(`${k.sistaDag}T00:00:00Z`))}. Vad som gäller efter ${slutStr} står i ert avtal.`;
  } else {
    text = `Avtalet med ${sup} löper till ${slutStr}. Uppsägningstiden står inte på fakturan — den står i ert avtal `
      + `och avgör sista dagen att säga upp, som kan infalla långt före ${slutStr}. Dela avtalet så räknar vi fram datumet.`;
  }
  text += paminnelseMening(paminnelse);

  return {
    kind: 'contract-clock',
    tone: 'watch',
    lage: k.lage,
    title,
    metricText: k.lage === 'fonster_oppet' ? `${antal(k.dagarTillSistaDag, 'dag', 'dagar')} kvar att säga upp`
      : k.lage === 'sista_dag_idag' ? 'Sista dagen i dag'
        : `${antal(k.dagarTillSlut, 'dag', 'dagar')} kvar av avtalet`,
    lineDescription: ut ? `Uppsägningstid: ${ut}` : null,
    annualImpact: 0,
    text,
    endDate: k.slutdatum,
    daysLeft: k.dagarTillSlut,
    actByDate: k.sistaDag,
    daysToAct: k.dagarTillSistaDag,
    paminnelse: paminnelse ?? null,
  };
}

function paminnelseMening(p) {
  if (!p) return '';
  if (p.kanal !== 'epost') return ' Vi har ingen e-postadress kopplad till den här analysen, så ingen påminnelse kan skickas härifrån.';
  if (!Array.isArray(p.datum) || p.datum.length === 0) return '';
  // 'snarast' = tröskeln redan nådd; cronen går en gång per dygn, så «inom ett dygn» är det enda sanna.
  const d = p.datum.map((x) => (x === 'snarast' ? 'inom ett dygn' : fmtSvLiten(new Date(`${x}T00:00:00Z`))));
  return ` Vi mejlar er ${d.length === 1 ? d[0] : `${d.slice(0, -1).join(', ')} och ${d[d.length - 1]}`}.`;
}
