// lib/contract-intel.js — AVTALS-INTELLIGENSEN (C1): den deterministiska kärnan.
//
// Arkitekturen (formad av avtalskorpus-sonden, ops/probe-avtal-corpus.txt 2026-07-03):
// svenska B2B-avtal delar sig i TVÅ dokumentklasser med olika sanningsbärare —
//
//   1. ALLMÄNNA VILLKOR (publika, per leverantör) bär REGLERNA: uppsägningstid,
//      förlängningsmekanik, brytavgiftsmodell. Bahnhof ordagrant: "Uppsägningstid är tre (3)
//      månader. Efter Avtalstiden förlängs Avtalstiden automatiskt löpande med tre (3) månader"
//      och "slutfakturera för återstående avtalstid" (= brytavgiftsmodellen). Dessa kureras
//      EN gång per leverantör i VILLKORSBOKEN nedan (prisbokens syskon: källa + citat +
//      verifieringsdatum på varje post — regel 3).
//
//   2. INDIVIDUELLA AVTALET (kundens dokument) bär DATUMEN: leveransdag/avtalsstart och
//      avtalstidens längd ("Tjänstens Avtalstid anges i Avtalet och räknas från Tjänstens
//      leveransdag" — Bahnhofs egna villkor). AI läser dessa få fält; koden ACCEPTERAR
//      (acceptExtractedContract) och räknar (computeContractClock). AI:n räknar ALDRIG (regel 2).
//
// Sondens bevis för läsdelningen: Telias tvåspalts-PDF:er förvanskas av rå textextraktion
// (kolumner flätas mitt i meningar) — deterministisk regex på rå avtalstext är strukturellt
// skör; probabilistisk läsning + deterministisk acceptans är arkitekturen (jfr fakturapipen).
//
// RELATION TILL lib/contract-clock.js (regel 1 — EN visningssanning): contract-clock är
// VISNINGSFYNDET för ett redan känt bindningsslut (servicePeriodEnd ur fakturan). Den här
// modulen är MOTORN som räknar fram det datumet ur avtalets regler (start + längd + uppsägning
// + förlängning). Vid inkoppling matar computeContractClock().deadline/currentPeriodEnd samma
// fynd/timeline-väg — bygg ALDRIG en andra visningsväg.

// ── VILLKORSBOKEN ────────────────────────────────────────────────────────────────
// Kurerade, KÄLLBELAGDA regler per leverantör. En post får ENDAST läggas in med källa-URL,
// ordagrant citat och verifieringsdatum (maskinvaktad i tests/contract-intel.mjs).
// Tele2: MEDVETET utelämnad — enda åtkomliga villkors-PDF:n är PRIVATtjänster (fel dokument-
// klass för företagskunder); posten läggs in när företagsvillkoren belagts (regel 4).
export const VILLKORSBOK = {
  bahnhof: {
    supplier: 'Bahnhof',
    uppsagningstidMan: 3,
    forlangningMan: 3,                       // automatisk löpande förlängning efter avtalstiden
    efterBindning: 'forlangning',            // modellen: rullande förlängning (jfr 'tillsvidare')
    brytavgiftModell: 'aterstaende-avtalstid', // "slutfakturera för återstående avtalstid"
    avgiftsAviseringDagar: 30,
    kalla: 'https://www.bahnhof.se/filestorage/userfiles/Villkor/bahnhof-villkor-allmanna-foretag-brf-fastighet-se.pdf',
    // Villkorssidan (distributionspunkten) är ännu inte sondad för Bahnhof. Fältet lämnas NULL,
    // aldrig gissat. Bahnhofs adress är en stabil sökväg (/filestorage/…), inte innehålls-
    // adresserad — skrivs filen om ändras hashen, byts filnamnet 404:ar den. Hash-vakten kan
    // alltså larma här, och posten är därför inte ovaktbar. Villkorssidan ska ändå in: den
    // fångar fallet där Bahnhof lägger den gällande versionen på en NY stabil sökväg.
    villkorssida: null,
    citat: 'Uppsägningstid är tre (3) månader. Efter Avtalstiden förlängs Avtalstiden automatiskt löpande med tre (3) månader.',
    verifierad: '2026-07-03',
  },
  telia: {
    supplier: 'Telia',
    // Tills-vidare-modellen: efter bindningstiden löper avtalet vidare; §19.6 ger varslet för
    // tills-vidare-läget. OBS: äldre villkorsversioner anger tre (3) månader — avtalets EGEN
    // uppsägningstid vinner alltid över boken (resolveContractRules), så gällande version bärs här.
    uppsagningstidMan: 1,
    forlangningMan: null,
    efterBindning: 'tillsvidare',
    brytavgiftModell: null,                 // ej ordagrant belagd ännu — kureras när klausulen är ren
    avgiftsAviseringDagar: null,
    kalla: 'https://www.telia.se/assets/m/2bcd4437783424fe/original/telias-allmanna-villkor-tjanster-foretag-260401.pdf',
    // DISTRIBUTIONSPUNKTEN — sonden läste 22 villkors-PDF:er härifrån (ops/probe-avtal-corpus.txt),
    // vår inräknad. Telias asset-URL är innehållsadresserad (/assets/m/<id>/), så filen ovan kan
    // aldrig ändras: en ny version får ett nytt id och länken här byts. Utan den här sidan vore
    // posten ovaktbar — hashen skulle lysa grönt i evighet medan gällande villkor flyttat.
    villkorssida: 'https://www.telia.se/foretag/om/villkor',
    citat: '19.6 Om Avtalet gäller tills vidare utan särskild uppsägningstid får det skriftligen sägas upp med en (1) månads uppsägningstid.',
    verifierad: '2026-07-05',
  },
};

export function villkorForSupplier(nameOrKeyword) {
  const s = String(nameOrKeyword || '').toLowerCase();
  for (const [key, post] of Object.entries(VILLKORSBOK)) {
    if (s.includes(key)) return post;
  }
  return null;
}

// ── Datumaritmetik (ren, klampad) ───────────────────────────────────────────────
const DAY_MS = 24 * 3600 * 1000;
const isoDate = (d) => d.toISOString().slice(0, 10);

function parseIso(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(s || ''))) return null;
  const d = new Date(`${s}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

// Uppsägningstidens subtraktor/additor — EN definition av "periodslut − varsel" oavsett om
// avtalet anger månader eller dagar (Fortnox-fällan: 30 dagar ≠ 1 månad). Returnerar null
// när ingen giltig uppsägningstid finns.
function noticeSubtractor({ uppsagningstidMan = null, uppsagningstidDagar = null } = {}) {
  const dagar = uppsagningstidDagar == null ? null : Number(uppsagningstidDagar);
  if (dagar != null && Number.isInteger(dagar) && dagar >= 1) {
    return {
      subtractFrom: (d) => new Date(d.getTime() - dagar * DAY_MS),
      addTo:        (d) => new Date(d.getTime() + dagar * DAY_MS),
    };
  }
  const man = uppsagningstidMan == null ? null : Number(uppsagningstidMan);
  if (man != null && Number.isInteger(man) && man >= 0) {
    return {
      subtractFrom: (d) => addMonths(d, -man),
      addTo:        (d) => addMonths(d, man),
    };
  }
  return null;
}

// Månadsaddition med dagklampning: 31 jan + 1 mån = 28/29 feb (aldrig 2/3 mars).
export function addMonths(date, months) {
  const y = date.getUTCFullYear(), m = date.getUTCMonth(), day = date.getUTCDate();
  const target = new Date(Date.UTC(y, m + months, 1));
  const daysInTarget = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(day, daysInTarget));
  return target;
}

// ── ACCEPTANSGRINDEN — AI-lästa fält släpps ALDRIG vidare overifierade (regel 2/4) ──
// Fälten: avtalsstart (leveransdag, ISO), avtalstidMan (initial bindning i månader).
// Reglerna (uppsägning/förlängning) kommer ur villkorsboken eller — om lästa ur dokumentet —
// valideras mot samma band. Returnerar { ok, fields } eller { ok:false, reason }.
export function acceptExtractedContract({ avtalsstart, avtalstidMan, uppsagningstidMan = null, uppsagningstidDagar = null, forlangningMan = null } = {}, { today = new Date() } = {}) {
  const start = parseIso(avtalsstart);
  if (!start) return { ok: false, reason: 'avtalsstart saknas eller är inte ett giltigt ISO-datum' };
  // Rimlighetsband: starten får inte ligga i framtiden (>60 dagar — leverans kan vara nära förestående)
  // och inte mer än 15 år bakåt (äldre avtal än så är inte en levande bindning att räkna på).
  if (start.getTime() > today.getTime() + 60 * DAY_MS) return { ok: false, reason: 'avtalsstart ligger orimligt långt fram i tiden' };
  if (start.getTime() < today.getTime() - 15 * 365.25 * DAY_MS) return { ok: false, reason: 'avtalsstart äldre än 15 år — utanför rimlighetsband' };

  const upps = uppsagningstidMan == null ? null : Number(uppsagningstidMan);
  if (upps != null && (!Number.isInteger(upps) || upps < 0 || upps > 12)) return { ok: false, reason: 'uppsägningstid utanför band (0–12 månader)' };

  // Dagar-granularitet (E2E-provet 2026-07-08, Fortnox-fällan): "trettio (30) dagar" är INTE
  // en månad — en deadline som klampas till hel månad kan missa fönstret med en dag (falsk
  // precision, regel 3). Enheten läses exakt som dokumentet anger; båda samtidigt är tvetydigt.
  const uppsDagar = uppsagningstidDagar == null ? null : Number(uppsagningstidDagar);
  if (uppsDagar != null && (!Number.isInteger(uppsDagar) || uppsDagar < 1 || uppsDagar > 180)) return { ok: false, reason: 'uppsägningstid i dagar utanför band (1–180)' };
  if (upps != null && uppsDagar != null) return { ok: false, reason: 'uppsägningstid angiven i både månader och dagar — tvetydigt, kräver manuell läsning' };

  // Äkta tills vidare-avtal (E2E-provet, GleSYS-fällan): ingen initial bindningstid alls.
  // Accepteras ENDAST när en uppsägningstid finns att räkna på — annars finns inget att bevaka.
  if (avtalstidMan == null) {
    if (upps == null && uppsDagar == null) return { ok: false, reason: 'varken avtalstid eller uppsägningstid — inget att räkna på' };
    return { ok: true, fields: { avtalsstart: isoDate(start), avtalstidMan: null, uppsagningstidMan: upps, uppsagningstidDagar: uppsDagar, forlangningMan: null } };
  }

  const langd = Number(avtalstidMan);
  if (!Number.isInteger(langd) || langd < 1 || langd > 120) return { ok: false, reason: 'avtalstid utanför band (1–120 månader)' };

  // 3+3-fällan (E2E-provet, Bahnhof): uppsägningstid LIKA MED periodlängden är den klassiska
  // svenska rullande konstruktionen — fönstret är alltid nästan stängt, vilket är exakt den
  // fälla vakten finns för att bevaka. Fullt logisk. Endast STÖRRE än avtalstiden → manuell.
  if (upps != null && upps > langd) return { ok: false, reason: 'uppsägningstid > avtalstid — ologiskt avtal, kräver manuell läsning' };

  const forl = forlangningMan == null ? null : Number(forlangningMan);
  if (forl != null && (!Number.isInteger(forl) || forl < 0 || forl > 36)) return { ok: false, reason: 'förlängning utanför band (0–36 månader)' };

  return { ok: true, fields: { avtalsstart: isoDate(start), avtalstidMan: langd, uppsagningstidMan: upps, uppsagningstidDagar: uppsDagar, forlangningMan: forl } };
}

// ── REGELUPPLÖSNINGEN — avtalets egna villkor vinner över villkorsboken (närmast källan) ──
// Returnerar { uppsagningstidMan|null, forlangningMan|null, kalla: 'avtalet'|'villkorsbok'|null }.
// Saknas båda → null-regler (ärligt: vi RÄKNAR då bara initial bindning, aldrig gissad förnyelse).
export function resolveContractRules(extracted = {}, villkorsbokPost = null) {
  const fromDoc = (v) => Number.isInteger(Number(v)) && v != null;
  const efterBindning = villkorsbokPost?.efterBindning ?? null;   // modellen kommer ur villkoren
  if (fromDoc(extracted.uppsagningstidMan) || fromDoc(extracted.uppsagningstidDagar)) {
    return {
      uppsagningstidMan: fromDoc(extracted.uppsagningstidMan) ? Number(extracted.uppsagningstidMan) : null,
      uppsagningstidDagar: fromDoc(extracted.uppsagningstidDagar) ? Number(extracted.uppsagningstidDagar) : null,
      forlangningMan: fromDoc(extracted.forlangningMan) ? Number(extracted.forlangningMan) : (villkorsbokPost?.forlangningMan ?? null),
      efterBindning,
      kalla: 'avtalet',
    };
  }
  if (villkorsbokPost) {
    return { uppsagningstidMan: villkorsbokPost.uppsagningstidMan, uppsagningstidDagar: null, forlangningMan: villkorsbokPost.forlangningMan ?? null, efterBindning, kalla: 'villkorsbok' };
  }
  return { uppsagningstidMan: null, uppsagningstidDagar: null, forlangningMan: null, efterBindning: null, kalla: null };
}

// ── UTFALLET — hela kedjan: accepterade fält + upplösta regler → klocka, ärligt vid luckor ──
// Kan reglerna inte lösas upp räknas ENDAST den initiala bindningen (start + längd) — ett
// faktum ur avtalet — med deadline null och regelKalla null. Aldrig en gissad förnyelse (regel 4).
export function computeContractOutcome(fields, rules, { today = new Date() } = {}) {
  if (!fields?.avtalsstart) return null;

  // ÄKTA TILLS VIDARE (E2E-provet, GleSYS-fällan): ingen initial bindning alls — avtalet löper
  // från dag ett med enbart uppsägningstiden som varsel. Tidigaste utträde = idag + varsel.
  // OBS medveten approximation: konventioner som "räknat från sista dagen i den månad
  // uppsägningen sker" gör verkligt utträde något SENARE — vi varnar alltså tidigt, aldrig
  // sent (asymmetrin, regel 4: kundens nedsida är noll; ingen deadline kan missas).
  if (fields.avtalstidMan == null) {
    const notice = noticeSubtractor(rules);
    if (!notice) return null;   // ingen uppsägningstid att räkna på — inget utfall (ärligt)
    const earliestExit = notice.addTo(today);
    return {
      currentPeriodEnd: isoDate(earliestExit),
      deadline: null, daysToDeadline: null, renewals: 0, status: 'rolling',
      daysToEnd: Math.ceil((earliestExit.getTime() - today.getTime()) / DAY_MS),
      regelKalla: rules?.kalla ?? null,
    };
  }

  // TILLS-VIDARE-MODELLEN (Telia/Tele2-klassen, sond v2/v3): efter bindningstiden löper avtalet
  // vidare utan slut, uppsägbart när som helst med uppsägningstiden som varsel. Före bindnings-
  // slutet är deadlinen (slut − varsel) vägen ut VID slutet; efter den är utgången alltid öppen
  // med varslet som enda fördröjning ('rolling' — ingen deadline-press, tidigaste utträde räknas).
  // MODELLPRIORITET (E2E-provet, Telia-fällan): anger AVTALET en uttrycklig förlängningsperiod
  // (t.ex. "förlängs med tolv (12) månader åt gången") vinner den fasta förnyelsemodellen —
  // villkorsbokens tillsvidare-default gäller bara när avtalet självt inte säger emot.
  if (rules?.efterBindning === 'tillsvidare' && rules?.forlangningMan == null && rules?.uppsagningstidMan != null) {
    const start = new Date(`${fields.avtalsstart}T00:00:00Z`);
    if (Number.isNaN(start.getTime())) return null;
    const DAY = 24 * 3600 * 1000;
    const end = addMonths(start, Number(fields.avtalstidMan));
    const deadline = addMonths(end, -Number(rules.uppsagningstidMan));
    if (today.getTime() <= deadline.getTime()) {
      return {
        currentPeriodEnd: end.toISOString().slice(0, 10),
        deadline: deadline.toISOString().slice(0, 10),
        daysToDeadline: Math.ceil((deadline.getTime() - today.getTime()) / DAY),
        renewals: 0, status: 'window-open',
        daysToEnd: Math.ceil((end.getTime() - today.getTime()) / DAY),
        regelKalla: rules.kalla,
      };
    }
    const earliestExit = new Date(Math.max(end.getTime(), addMonths(today, Number(rules.uppsagningstidMan)).getTime()));
    return {
      currentPeriodEnd: earliestExit.toISOString().slice(0, 10),   // tidigaste utträde = det datum bytet kan tajmas till
      deadline: null, daysToDeadline: null, renewals: 0, status: 'rolling',
      daysToEnd: Math.ceil((earliestExit.getTime() - today.getTime()) / DAY),
      regelKalla: rules.kalla,
    };
  }

  if (rules?.uppsagningstidMan != null || rules?.uppsagningstidDagar != null) {
    const clock = computeContractClock({
      avtalsstart: fields.avtalsstart, avtalstidMan: fields.avtalstidMan,
      uppsagningstidMan: rules.uppsagningstidMan, uppsagningstidDagar: rules.uppsagningstidDagar,
      forlangningMan: rules.forlangningMan,
    }, { today });
    return clock ? { ...clock, regelKalla: rules.kalla } : null;
  }
  // Regler okända: bara det initiala bindningsslutet (faktum ur dokumentet).
  const start = new Date(`${fields.avtalsstart}T00:00:00Z`);
  if (Number.isNaN(start.getTime())) return null;
  const end = addMonths(start, Number(fields.avtalstidMan));
  const daysToEnd = Math.ceil((end.getTime() - today.getTime()) / (24 * 3600 * 1000));
  return {
    currentPeriodEnd: end.toISOString().slice(0, 10),
    deadline: null, daysToDeadline: null, renewals: 0,
    status: daysToEnd >= 0 ? 'expires' : 'expired', daysToEnd, regelKalla: null,
  };
}

// ── KONTRAKTSKLOCKAN — ren deterministisk datumaritmetik (regel 2: kod räknar) ────
// Rullar automatiska förlängningar tills aktuell periods uppsägningsdeadline ligger framför oss.
// Returnerar allt kundytan/Switch behöver: periodslut, sista uppsägningsdag, dagar kvar, status.
//   status: 'window-open'  — uppsägning möjlig nu (deadline framför oss)
//           'expires'      — ingen förlängning: avtalet löper ut vid periodslut
//           'expired'      — ingen förlängning och slutet har passerat
export function computeContractClock({ avtalsstart, avtalstidMan, uppsagningstidMan, uppsagningstidDagar = null, forlangningMan = null }, { today = new Date() } = {}) {
  const start = parseIso(avtalsstart);
  if (!start) return null;
  const langd = Number(avtalstidMan);
  if (!Number.isInteger(langd) || langd < 1) return null;
  const notice = noticeSubtractor({ uppsagningstidMan, uppsagningstidDagar });
  if (!notice) return null;

  let periodEnd = addMonths(start, langd);
  let renewals = 0;
  const forl = forlangningMan == null ? null : Number(forlangningMan);

  if (forl == null || forl === 0) {
    // Ingen automatisk förlängning: avtalet löper ut.
    const daysToEnd = Math.ceil((periodEnd.getTime() - today.getTime()) / DAY_MS);
    return {
      currentPeriodEnd: isoDate(periodEnd),
      deadline: null,
      daysToDeadline: null,
      renewals: 0,
      status: daysToEnd >= 0 ? 'expires' : 'expired',
      daysToEnd,
    };
  }

  // Automatisk förlängning: deadline = periodslut − uppsägningstid (i månader ELLER dagar —
  // exakt den enhet avtalet anger, Fortnox-fällans läxa). Har deadlinen passerat är perioden
  // redan förnyad — rulla tills deadline ligger framför oss (skydd: max 400 varv ≈ 100 års rullning).
  let deadline = notice.subtractFrom(periodEnd);
  let guard = 0;
  while (deadline.getTime() < today.getTime() && guard++ < 400) {
    periodEnd = addMonths(periodEnd, forl);
    deadline = notice.subtractFrom(periodEnd);
    renewals++;
  }

  return {
    currentPeriodEnd: isoDate(periodEnd),
    deadline: isoDate(deadline),
    daysToDeadline: Math.ceil((deadline.getTime() - today.getTime()) / DAY_MS),
    renewals,
    status: 'window-open',
    daysToEnd: Math.ceil((periodEnd.getTime() - today.getTime()) / DAY_MS),
  };
}

// ── AVTALSVYN — allt "Avtalet · läst"-avsnittet i rummet behöver, ur persisterade termer ──
// Termerna (fields/rules/citat) är FAKTA lästa ur dokumentet och fryses vid uppladdningen;
// KLOCKAN räknas alltid FÄRSK vid läsning (deadlines rullar — en fryst deadline ljuger inom
// en period). nastaPeriodSlut = vad kunden är bunden till OM fönstret missas (fällans andra
// halva — ren månadsaritmetik ur avtalets egen förlängningsperiod, regel 2/3).
export function buildAvtalView(terms = {}, { today = new Date() } = {}) {
  const { fields, rules = null, citat = null, supplier = null, readAt = null, kundStatus = null } = terms;
  if (!fields?.avtalsstart) return null;
  let clock = computeContractOutcome(fields, rules ?? {}, { today });
  if (!clock) return null;

  const forl = rules?.forlangningMan ?? null;
  const nastaPeriodSlut = (clock.status === 'window-open' && Number(forl) > 0 && clock.currentPeriodEnd)
    ? isoDate(addMonths(new Date(`${clock.currentPeriodEnd}T00:00:00Z`), Number(forl)))
    : null;

  // KVITTERINGEN (grundardesign 2026-07-09): kundens registrerade handling — aldrig en mute.
  //
  // 'uppsagd': klockan byter karaktär från larm till NEDRÄKNING mot utträdet. exitDate
  // beräknades deterministiskt av SERVERN vid registreringen (aldrig klientens ord för
  // ett datum). Kundens klick är ett PÅSTÅENDE — vyn säger alltid "markerad av er",
  // och om-vakten (invoice-history) larmar om leverantören fakturerar efter utträdet.
  if (kundStatus?.typ === 'uppsagd' && kundStatus.exitDate) {
    const exit = parseIso(kundStatus.exitDate);
    if (exit) {
      const daysToEnd = Math.ceil((exit.getTime() - today.getTime()) / DAY_MS);
      clock = {
        currentPeriodEnd: kundStatus.exitDate,
        deadline: null, daysToDeadline: null,
        renewals: clock.renewals ?? 0,
        status: daysToEnd >= 0 ? 'terminating' : 'terminated',
        daysToEnd,
        regelKalla: clock.regelKalla ?? null,
      };
    }
  }

  // 'stannar': lugnet gäller EXAKT den deadline det registrerades för — när klockan
  // rullat in i nästa period matchar nyckeln inte längre och larmet väcks av sig själv.
  const stannarAktiv = kundStatus?.typ === 'stannar'
    && clock.status === 'window-open'
    && kundStatus.deadline === clock.deadline;
  const nastaFonster = (stannarAktiv && Number(forl) > 0)
    ? isoDate(addMonths(new Date(`${clock.deadline}T00:00:00Z`), Number(forl)))
    : null;

  const uppsagningLabel = rules?.uppsagningstidDagar != null
    ? `${rules.uppsagningstidDagar} dagar`
    : rules?.uppsagningstidMan != null ? `${rules.uppsagningstidMan} mån` : null;
  const bindningLabel = fields.avtalstidMan == null ? 'tills vidare' : `${fields.avtalstidMan} mån`;
  const forlangningLabel = forl == null ? null : Number(forl) === 0 ? 'ingen — avtalet löper ut' : `+${forl} mån i taget`;

  return {
    supplier, readAt, fields, rules, citat, clock, nastaPeriodSlut,
    bindningLabel, uppsagningLabel, forlangningLabel,
    kundStatus: kundStatus ?? null, stannarAktiv, nastaFonster,
  };
}

// ── LEVERANTÖRSMATCHNINGEN — fel avtal på fel innehav flaggas ärligt (E2E-läxan) ──
// Normaliserad jämförelse (bolagsformer/landssuffix bort, substring åt båda håll).
// Asymmetrin är medveten: saknas namn på endera sidan flaggar vi ALDRIG — ett falskt
// stopp kostar kunden mer än en försiktig genomsläppning (uppladdaren äger valet).
export function supplierNamesMatch(a, b) {
  const norm = (s) => String(s || '').toLowerCase()
    .replace(/\b(ab|aktiebolag|hb|kb|sverige|sweden|företag|foretag|filial|publ)\b/g, ' ')
    .replace(/[^a-zåäö0-9]+/g, ' ')
    .trim();
  const na = norm(a), nb = norm(b);
  if (!na || !nb) return true;
  return na.includes(nb) || nb.includes(na);
}
