// lib/kundmeningar.js — KUNDMENINGSREGISTRET: vad Arvo får säga till en kund, och vad det vilar på.
//
// ══ VARFÖR (grundarorder 2026-09-23) ═════════════════════════════════════════════════════════
// Lägesregistret bestämmer LÄGET. Ytinventeringen (lib/kundytor.js) visade att 18 av 37 ytor ändå
// talade förbi det, i två former:
//
//   1. FRI MODELLTEXT. Prompten gav modellen kohortens TOTALSUMMOR, märkta «Verifierat lägre
//      marknadspris», och bad den skriva «jämförbara bolag i er bransch». Mätt på samma faktura
//      (30 000 kr/år, 8 SIM): «16 % UNDER branschsnittet» mot kohorten, «5 % ÖVER verifierat
//      listpris» mot listpriset. Motsatt riktning — och kohorten är till största delen testmaterial.
//   2. LÖFTEN UTAN MEKANISM. «Bytet är igångsatt», «Be Arvo förhandla», «Arvo återkommer per
//      mail», «kontaktar er med en rekommendation» — ingen kod gör något av det, och två av dem
//      bryter Switch-doktrinen (Arvo förhandlar aldrig).
//
// Registret stänger båda:
//   · `kundensMotivering` är den ENDA vägen modelltext når en kund. Meningar som påstår något om
//     kohort/bransch stryks alltid (vi har ingen jämförbar kohort — mätt), och beröm av priset stryks
//     om inte läget uttryckligen tillåter det. Stryks allt blir svaret null, aldrig en tom lögn.
//   · `LOFTEN` är de löften som får ges, var och ett med sin mekanism. KM-04 kräver att mekanismen
//     finns. `LOFTEN_UTAN_MEKANISM` är formerna som INTE får stå någonstans i kundytornas kod —
//     KM-05 skannar api/, lib/, src/ och kundmejlande skript.
//
// FÅNGAR: kohortpåståenden och beröm i modelltext; löftesformer utan mekanism i kod.
// BLIND: filtret läser FORM, inte innebörd — ett påstående formulerat utanför mönstren passerar,
//   och en mening kan vara sann men strykas (hellre tystnad än ett ogrundat påstående, regel 4).
//   Löftesskanningen ser bara de formuleringar som står i listan; listan växer med varje incident.

/** Påståenden om vad ANDRA bolag betalar. Vi har ingen jämförbar kohort (probe-undersokning U5).
 *  «företag» och «av er storlek» saknades i första versionen (andra blicken 2026-09-24). */
export const KOHORTPASTAENDE = /((jämförbara|liknande|andra|svenska) (bolag|företag)|(bolag|företag) (i|av|med) er|av er storlek|i er storlek|er bransch|branschen|branschsnitt|branschstandard|branschnivå|i nätverket)/i;

/** Beröm av priset, oavsett subjekt. Ett nekande («inte konkurrenskraftigt») är inget beröm. */
const BEROM_ALLTID = /((?<!inte )konkurrenskraftig|(?<!inte )marknadsmässig|(?<!inte )fördelaktig|(?<!inte )prisvär(d|t)|bra pris|förmånlig|rätt prissatt|står sig|i (linje|nivå) med marknaden|ligger väl till|redan det (lägsta|billigaste)|behöver inte (göra|byta|agera)|under (marknads|bransch))/i;
/** Jämförelser som bara är beröm när KUNDEN är subjektet: «ert pris ligger under listpris» är beröm,
 *  «listpriset ligger under det ni betalar» och «Tele2 ligger lägre i pris» är skälet att byta —
 *  första versionen strök båda, och bytet förlorade sin motivering (andra blicken 2026-09-24). */
const BEROM_OM_KUNDEN = /\b(ni|er|ert|era)\b[^.!?]*?\b(ligger (redan )?(bra|bättre|lägre|under)|bättre (pris|villkor|än))/i;

/** @param {string} m en mening @returns {boolean} */
export const arPrisberom = (m) => BEROM_ALLTID.test(m) || BEROM_OM_KUNDEN.test(m);

const meningar = (t) => String(t).split(/(?<=[.!?])\s+/).filter((m) => m.trim());

/**
 * Den enda vägen fri modelltext når en kund.
 * @param {string|null|undefined} text   modellens reasoning
 * @param {{ tillatBerom?: boolean }} [opt] beröm bara när läget uttryckligen bär det (default: aldrig)
 * @returns {{ text: string|null, strukna: string[] }}
 */
export function kundensMotivering(text, { tillatBerom = false } = {}) {
  if (typeof text !== 'string' || !text.trim()) return { text: null, strukna: [] };
  const kvar = []; const strukna = [];
  for (const m of meningar(text)) {
    if (KOHORTPASTAENDE.test(m) || (!tillatBerom && arPrisberom(m)) || arLofteUtanMekanism(m)) strukna.push(m);
    else kvar.push(m);
  }
  return { text: kvar.length ? kvar.join(' ') : null, strukna };
}

/**
 * Modellens bytessteg: ett steg med en löftesform utan mekanism, eller ett kohortpåstående, stryks.
 * @param {unknown} steg
 * @returns {{ steg: string[], strukna: string[] }}
 */
export function kundensSteg(steg) {
  if (!Array.isArray(steg)) return { steg: [], strukna: [] };
  const kvar = []; const strukna = [];
  for (const s of steg) {
    if (typeof s !== 'string' || !s.trim()) continue;
    if (KOHORTPASTAENDE.test(s) || arLofteUtanMekanism(s)) strukna.push(s);
    else kvar.push(s);
  }
  return { steg: kvar, strukna };
}

/**
 * Löften som får ges — varje med sin mekanism (fil som gör det). KM-04 kräver att filen finns.
 * En yta som vill lova något hämtar texten här; ett löfte utan post här ska inte ges.
 */
export const LOFTEN = {
  prisbevakning: {
    text: 'Vi läser leverantörernas publika priser varje natt och säger till om något ändras.',
    mekanism: ['scripts/price-monitor.mjs', '.github/workflows/price-monitor.yml'],
  },
  uppsagningsvarsel: {
    text: 'Vi mejlar er 30 och 7 dagar före sista uppsägningsdag.',
    mekanism: ['api/cron/send-reminders.mjs', 'lib/paminnelse.js'],
  },
  skalIRummet: {
    text: 'Skälet till att vi inte prissatte fakturan står i ert rum.',
    mekanism: ['api/invoice-history.mjs'],
  },
  bytesunderlag: {
    text: 'Vi förbereder bytet — uppsägning och nyteckning — och ni signerar själva innan något sägs upp eller tecknas.',
    // Förberedelsen utförs av en människa tills rälsen är skarp (bibeln: Switch är mode:stub).
    // Mekanismen är att förfrågan når oss — det interna larmet i bekräftelsen.
    mekanism: ['api/send-confirmation.mjs', 'api/briefing.mjs'],
  },
  offertrunda: {
    text: 'Med er fullmakt begär vi in offerter från leverantörer och sammanställer dem åt er — ni väljer själva.',
    // Nivå 3: en människa skickar förfrågningen; mekanismen är leadmejlet med färdigt förfrågningsutkast.
    mekanism: ['api/quote-request.mjs'],
  },
  personligtSvar: {
    text: 'En av grundarna hör av sig till er.',
    mekanism: ['api/send-confirmation.mjs', 'api/quote-request.mjs', 'api/founding-member.mjs'],
  },
};

/**
 * Löftesformer som INTE får stå i kundytornas kod. Var och en är en incident (2026-09-23).
 * Ett legitimt omnämnande motiveras på raden ovanför: `kundmening-ok: <skäl>`.
 */
/** @param {string} t @returns {boolean} — även modellens motivering kan lova (andra blicken 2026-09-24). */
export const arLofteUtanMekanism = (t) => LOFTEN_UTAN_MEKANISM.some(({ monster }) => monster.test(t));

export const LOFTEN_UTAN_MEKANISM = [
  // Subjektet är lastbärande: «ej förhandlingsbar» och «någon har förhandlat» beskriver marknaden och
  // är sanna. Det förbjudna är att ARVO förhandlar (Switch-doktrinen).
  { monster: /\b(arvo|vi)\b[^.!?\n]{0,40}\b(om)?förhandla(r|t)?\b|\b(be|låt)\s+arvo\b[^.!?\n]{0,40}förhandla|prisförhandling med arvo/i, skal: 'Arvo förhandlar aldrig (Switch-doktrinen)' },
  { monster: /bytet är igångsatt|avvecklingen är igångsatt|vi skickar uppsägning/i, skal: 'bytesrälsen är mode:stub — inget byte verkställs' },
  // Andra blicken 2026-09-24: modellens bytessteg lovade «Vi säger upp …», «Arvo tecknar …», «Vi
  // beställer porting» och «Du signerar med BankID» — prompten lärde ut dem ordagrant.
  { monster: /\b(arvo|vi)\b[^.!?\n]{0,30}\b(säger upp|tecknar|genomför|beställer|ordnar hela|koordinerar uppsägning)/i, skal: 'bytesrälsen är mode:stub — Arvo säger inte upp, tecknar eller beställer' },
  { monster: /signer\w* [^.!?\n]{0,30}(med|via) bankid/i, skal: 'ingen BankID-signering finns hos Arvo (Switch är mode:stub)' },
  { monster: /sköter (arvo )?hela (leverantörs)?bytet/i, skal: 'inget byte verkställs; Nivå 3 har inget byte alls' },
  { monster: /återkommer till er per mail/i, skal: 'ingen utskicksväg mejlar tillbaka efter granskning' },
  { monster: /kontaktar er med en rekommendation/i, skal: 'ingen utskicksväg kontaktar kunden efter ett larm' },
  { monster: /exakta premie/i, skal: 'förutsätter en överbetalning vi inte mätt' },
  { monster: /garanterad förtur/i, skal: 'en garanti om en licens som inte finns' },
  { monster: /verifierat lägre marknadspris/i, skal: 'kohortens totalsummor är varken verifierade eller ett styckpris' },
  { monster: /arvo-pris/i, skal: 'Arvo har inget eget pris — neutralitetsmoaten' },
  { monster: /verifierad partner|arvo-partner|våra partner|partnerpris|arvo-volym/i, skal: 'Arvo har inga leverantörspartner och inget eget volympris — neutralitetsmoaten' },
];
