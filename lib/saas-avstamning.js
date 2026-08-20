// lib/saas-avstamning.js — SAAS-AVSTÄMNINGEN: aritmetiskt bevis, aldrig textgissning.
//
// ── VAD DEN HÄR MODULEN BEVISAR, OCH VAD DEN ALDRIG BEVISAR ─────────────────────────────────
// Den bevisar LIKHET: "kundens kostnad per licens och månad är exakt lika med det verifierade
// listpriset för nivå X hos leverantör Y."
// Den bevisar ALDRIG IDENTITET: "kunden HAR nivå X."
//
// Skillnaden är hela modulens själ, och den kom ur en obduktion (Fable 5, 2026-08-11) av min
// egen första ritning. Jag lät aritmetiken bevisa likhet och lät utgången påstå identitet: att en
// kund betalar 14 i månaden skulle bevisa att de har Pipedrive Lite. Men rivalgrinden letar
// rivaler I VÅR BOK, och bokens universum är en handfull rader medan SaaS-marknadens är tusentals
// produkter. En produkt som saknas i boken är osynlig för rivalgrinden — den verkliga produkten
// finns då inte ens i kandidatmängden. Det är Avida-felet i ny kostym, och värre: där låg den
// verkliga ägaren åtminstone i sökresultatet.
//
// Därför: aritmetik bevisar likhet. Likhet är inte identitet. Utgången formuleras därefter.
//
// ── ATT KORSA LEVERANTÖRSGRÄNSEN ÄR FÖRBJUDET ───────────────────────────────────────────────
// Avstämningen körs ENDAST inom den leverantör fakturan deterministiskt fastställt. Ett pris får
// aldrig peka ut vilken leverantör kunden använder — bara vilken NIVÅ hos en redan känd
// leverantör kostnaden motsvarar. Utan fastställd leverantör: tystnad.
//
// ── UNIKHET ÖVER HELA STAPELN ───────────────────────────────────────────────────────────────
// SaaS-priser är byggda av 12×-relationer (14/mån ↔ 168/år) och samma produkt har olika pris
// månadsvis och årsvis (Zoho: 20 månadsvis, 14 vid årsbetalning). Unikheten räknas därför över
// hypotesen (rad × period × momsbas) — aldrig över rader. Räknas den över rader är Pipedrive-
// fällan (14 vs 168) inbyggd i själva grinden som skulle stoppa den.
//
// ── INGEN MULTIPLIKATIONSROULETTE ───────────────────────────────────────────────────────────
// Vi provar aldrig "priset, och om det inte går ihop: priset × 1,25". Det dubblar hypotesrymden
// och föder kollisioner, och valet mellan utfallen vore en gissning. Momsbasen kommer ur
// fakturans EGNA fält. Saknas den: tystnad.
//
// ── HELTALSÖRE ──────────────────────────────────────────────────────────────────────────────
// All aritmetik i heltalsöre. 133.82 × 12 i flyttal är en mina, och ett avrundningsfel som ser ut
// som ett bevis är värre än inget bevis.

/** Avstämningens utfall. Endast BEVISAD_LIKHET får visa ett tal för kund. */
export const AVST = {
  BEVISAD_LIKHET: 'bevisad-likhet',   // exakt en hypotes går ihop → likheten är bevisad
  TYST: 'tyst',                       // fail-closed: något krav brast, inget tal får visas
};

/** Varför grinden teg. Varje skäl är ett dokumenterat tillstånd, aldrig ett tyst hopp. */
export const SKAL = {
  INGEN_LEVERANTOR: 'ingen deterministiskt fastställd leverantör — priset får inte peka ut vem',
  INGET_ANTAL: 'radens antal saknas eller är inte ett heltal ≥ 1',
  INGEN_PERIOD: 'radens period gick inte att fastställa deterministiskt',
  INGEN_MOMSBAS: 'fakturans momsbas saknas — vi provar oss aldrig fram till den',
  OJAMN_DELNING: 'radbeloppet delas inte jämnt på antalet — ett "nästan" är ett nej',
  INGEN_TRAFF: 'ingen vaktad rad hos leverantören går ihop',
  FLERA_TRAFFAR: 'flera hypoteser går ihop — tvetydighet löses aldrig med preferens',
  OVAKTAD_RAD: 'raden som gick ihop är inte vaktad eller inte färsk',
  INGEN_VALUTA: 'radens valuta är inte fastställd — utan valuta finns ingen jämförelse utan FX',
};

/** Kända tillstånd där avstämningen ALDRIG kan fyra. Uttalade, aldrig upptäckta i produktion. */
export const BLINDA_TILLSTAND = {
  RABATTERAD: 'kunden har förhandlad rabatt — betalar per definition inte listpris',
  ATERFORSALJARE: 'köpt via CSP/återförsäljare — priset är återförsäljarens, inte leverantörens',
  AKTIV_ANVANDARE: 'fakturering per aktiv användare med kreditering (Slack) — raden delar sällan jämnt',
  UTANFOR_BOKEN: 'produkten saknar vaktad rad — grinden ser den inte, och vet inte att den finns',
  ANNAN_VALUTA: 'fakturans valuta saknar ankare i boken — FX är förbjudet, alltså tystnad',
};

const ARSPERIOD = 'ar';
const MANADSPERIOD = 'manad';

/** Öre in, öre ut. Inga flyttal passerar den här gränsen. */
function tillOre(v) {
  if (typeof v === 'number') return Number.isInteger(v) ? v : null;   // öre måste redan vara heltal
  return null;
}

/**
 * Stämmer av EN fakturarad mot leverantörens vaktade rader.
 *
 * @param {object} rad     - { leverantor, antal, beloppOre, period, momsbas, valuta }
 *                           beloppOre: heltal. momsbas: 'exkl'|'inkl' ur fakturans EGNA fält.
 * @param {Array}  vaktade - rader för SAMMA leverantör: { tier, prisOre, period, momsbas,
 *                           valuta, vaktad: bool, farsk: bool, kalla }
 * @returns {{ utfall, skal, hypoteser, enhetOre, likhet }}
 */
export function stamAv(rad, vaktade) {
  const tyst = (skal, extra = {}) => ({ utfall: AVST.TYST, skal, hypoteser: [], enhetOre: null, likhet: null, ...extra });

  // A0 · leverantörsgränsen — priset bevisar nivå, aldrig vem.
  if (!rad?.leverantor) return tyst(SKAL.INGEN_LEVERANTOR);

  // A1 · antalet ur ett STRUKTURERAT FÄLT, aldrig ur prosa — och aldrig via typomvandling.
  // Första versionen skrev Number(rad.antal), vilket släppte igenom strängen '5'. Talet '5' är
  // i sig inte fel; problemet är att en sträng inte bär sitt ursprung. Ett tal har kommit ur ett
  // fält, en sträng kan ha kommit varifrån som helst — inklusive ur en tolkad textrad, vilket är
  // exakt vad hela modulen finns för att utesluta. Normalisering är extraktionens ansvar, inte
  // grindens; grinden får aldrig laga indata åt sig själv för att kunna fyra.
  const antal = rad.antal;
  if (typeof antal !== 'number' || !Number.isInteger(antal) || antal < 1) return tyst(SKAL.INGET_ANTAL);

  // A2 · perioden deterministiskt fastställd.
  if (rad.period !== MANADSPERIOD && rad.period !== ARSPERIOD) return tyst(SKAL.INGEN_PERIOD);

  // A3 · momsbasen ur fakturan — aldrig framprovad.
  if (rad.momsbas !== 'exkl' && rad.momsbas !== 'inkl') return tyst(SKAL.INGEN_MOMSBAS);

  // A3b · VALUTAN MÅSTE FINNAS (granskning 2026-08-20) ────────────────────────────────────────
  // Filtret nedan skriver `v.valuta === rad.valuta` och kommentaren lovar "ingen FX, någonsin".
  // Men jämförelsen KRÄVER aldrig ett värde: saknas valutan på båda sidor blir
  // `undefined === undefined` sant, och grinden svarade BEVISAD_LIKHET på en rad vars valuta
  // aldrig fastställts. Mataren (lib/saas-rad.js) blockerar det i dag — men en grind som förlitar
  // sig på sin anropare är ingen grind. Det är samma mönster som `isTotal`, en flagga som fanns
  // men aldrig var satt, och som därför inte skyddade någon.
  if (typeof rad.valuta !== 'string' || !rad.valuta.trim()) return tyst(SKAL.INGEN_VALUTA);

  // A4 · heltalsöre och jämn delning. Ett "nästan" är ett nej.
  const beloppOre = tillOre(rad.beloppOre);
  if (beloppOre == null || beloppOre <= 0) return tyst(SKAL.OJAMN_DELNING);
  if (beloppOre % antal !== 0) return tyst(SKAL.OJAMN_DELNING);
  const enhetOre = beloppOre / antal;

  // A5–A8 · hypotesen är (rad × period × momsbas), och valutan måste vara densamma. Ingen FX.
  const hypoteser = (Array.isArray(vaktade) ? vaktade : []).filter((v) => v
    && v.leverantor === rad.leverantor          // leverantörsgränsen, en gång till, explicit
    && v.valuta === rad.valuta                  // ingen FX, någonsin
    && v.period === rad.period                  // ingen 12×-omräkning mellan hypoteser
    && v.momsbas === rad.momsbas                // ingen multiplikationsroulette
    && tillOre(v.prisOre) === enhetOre);        // EXAKT, i öre

  if (hypoteser.length === 0) return tyst(SKAL.INGEN_TRAFF, { enhetOre });
  if (hypoteser.length > 1) return tyst(SKAL.FLERA_TRAFFAR, { enhetOre, hypoteser });

  // A9 · den enda hypotesen måste vara vaktad OCH färsk. Prisboksläxan: 16 obevakade dygn
  // tillverkade besparingar. En orörd rad kan inte bevisa något.
  const [h] = hypoteser;
  if (!h.vaktad || !h.farsk) return tyst(SKAL.OVAKTAD_RAD, { enhetOre, hypoteser });

  return {
    utfall: AVST.BEVISAD_LIKHET,
    skal: null,
    hypoteser,
    enhetOre,
    // LIKHET, inte identitet. Formuleringen är en del av beviset — den får inte skrivas om
    // till "ni har X" utan att leverantörens hela publika SKU-rymd är vaktad (i praktiken aldrig).
    likhet: {
      leverantor: rad.leverantor,
      tier: h.tier,
      // Nyckeln bredvid etiketten (2026-08-12): motvittnet i lib/saas-rad.js jämför den nivå
      // PRISET pekar på mot den nivå TEXTEN påstod, och en jämförelse på visningsetiketter hade
      // varit en strängmatchning som tyst börjar ljuga så fort en etikett skrivs om.
      tierNyckel: h.tierNyckel ?? null,
      enhetOre,
      period: rad.period,
      momsbas: rad.momsbas,
      valuta: rad.valuta,
      kalla: h.kalla,
      pastaende: `Er kostnad per licens och ${rad.period === ARSPERIOD ? 'år' : 'månad'} är exakt lika med `
        + `det verifierade listpriset för ${h.tier} hos ${rad.leverantor}.`,
    },
  };
}
