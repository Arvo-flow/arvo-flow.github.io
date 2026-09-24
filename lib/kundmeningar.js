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
    // Grundarorder 2026-09-24: vi tar inte emot en «bytesbegäran» — vi levererar ett förberett
    // besparingsunderlag. Stod: «Vi förbereder bytet — uppsägning och nyteckning — och ni signerar själva».
    text: 'Vi tar fram ett besparingsunderlag: jämförelsen mot verifierat listpris och färdiga utkast till uppsägning och nyteckning, som ni själva skickar till leverantörerna.',
    // Förberedelsen utförs av en människa tills rälsen är skarp (bibeln: Switch är mode:stub).
    // Mekanismen är att förfrågan når oss — det interna larmet i bekräftelsen.
    mekanism: ['api/send-confirmation.mjs', 'api/briefing.mjs'],
  },
  offertrunda: {
    text: 'Med er fullmakt begär vi in offerter från leverantörer och sammanställer dem åt er — ni väljer själva.',
    // Nivå 3: en människa skickar förfrågningen; mekanismen är leadmejlet med färdigt förfrågningsutkast.
    mekanism: ['api/quote-request.mjs'],
  },
  // 2026-09-24: «Arvo söker igenom er inkorg — ni behöver inte lyfta ett finger» hade ingen mekanism.
  // Inkorgskopplingen gör EN räkning av fakturamejl vid kopplingen; inget läser kopplingen efteråt
  // (mätt: bara api/admin/connections.mjs läser oauth_connections, ingen cron). Dörren som finns är mail-in.
  vidarebefordran: {
    text: 'Vidarebefordra leverantörsfakturor till faktura@inbox.arvoflow.se — vi analyserar dem och svarar med resultatet.',
    mekanism: ['api/inbound-email.mjs', 'api/cron/drain-ingest.mjs'],
  },
  inkorgskoppling: {
    text: 'Kopplingen räknar i dag hur många fakturamejl ni har. Analysen gör vi på de fakturor ni laddar upp eller vidarebefordrar.',
    // Gmail-vägen togs bort 2026-09-24: mätt, ingen kund hade någonsin kopplat en inkorg (tabellen fanns inte).
    mekanism: ['api/auth/outlook-callback.mjs'],
  },
  // PREMIUMGRINDEN (grundarorder 2026-09-24): proaktiva utskick bara till premiumkretsen. Anmälan är
  // ett öppet formulär, alltså lovar den INGEN bevakning — den lovar att en människa hör av sig.
  intelligenceAnmalan: {
    text: 'Vi har tagit emot er anmälan till Arvo Intelligence. En av grundarna hör av sig för att starta abonnemanget — bevakningen slås på först då.',
    mekanism: ['api/activate-intelligence.mjs', 'scripts/bevilja-premium.mjs'],
  },
  premiumutskick: {
    text: 'Med Arvo Intelligence mejlar vi månadsbriefen och prislarmen för era leverantörer.',
    mekanism: ['lib/premiumkrets.js', 'api/cron/generate-briefings.mjs', 'api/cron/run-price-alerts.mjs'],
  },
  gratisanalys: {
    text: 'Utan abonnemang analyserar vi de fakturor ni laddar upp eller vidarebefordrar och svarar på dem. Utöver de avtalspåminnelser ni själva beställer skickar vi inga utskick däremellan.',
    mekanism: ['api/test-invoice.mjs', 'api/inbound-email.mjs'],
  },
  personligtSvar: {
    text: 'En av grundarna hör av sig till er.',
    mekanism: ['api/send-confirmation.mjs', 'api/quote-request.mjs', 'api/founding-member.mjs'],
  },
};

/**
 * ANSVARSGRÄNSEN — vad Arvo INTE gör (grundarorder 2026-09-24: modellen är strikt förberedande).
 * Den enda källan för varje mening om vem som säger upp, tecknar och bär beslutet. Ingen yta formulerar
 * det själv; LOFTEN_UTAN_MEKANISM nedan fäller varje exekutiv form i kundytornas kod (KM-05).
 * Blind: meningarna stämmer med dagens mekanik (Switch-rälsen är mode:stub, ingen BankID-signering
 * finns, bekräftelseflödet samlar bara en e-postadress). /villkor säger annat (§2.1 fullmakt, §2.2
 * ångerfrist, §3.3, §4.2, §5.1) — avtalstexten är grundarens och står undantagen med motivering.
 */
export const ANSVARSGRANS = {
  inteOmbud: 'Arvo säger inte upp, tecknar eller ändrar några avtal åt er, och beställningen ger oss ingen fullmakt att göra det.',
  niAgerar: 'Uppsägning och nyteckning gör ni själva, direkt med leverantörerna — när och om ni vill.',
  inteAvtal: 'Underlaget är en analys med färdiga utkast, inte ett avtal. Inget händer med era avtal förrän ni själva agerar, och ångrar ni beställningen behöver ni inte göra något.',
  arvode: 'Genomför ni bytet utgår ett arvode om 20 % av första årets besparing, som en engångsavgift tre månader efter att det nya avtalet aktiverats. Genomför ni det inte kostar underlaget ingenting.',
};

/**
 * PROSPEKTET (2026-09-24): vad vi säger till ett bolag vars faktura vi aldrig sett. Bara det vi kan
 * belägga — listprisankaret (lib/listprisankare.js) och DNS-fynden. Aldrig en kostnad eller besparing.
 */
export const PROSPEKT = {
  ankareRubrik: 'Verifierat publikt listpris — det lägsta vi kan belägga',
  ingenKostnad: 'Vad ni själva betalar ser vi först i en faktura. Därför räknar vi ingen besparing åt er här.',
  nivaOkand: 'Vilken nivå ni har vet vi inte — priset gäller den namngivna produkten.',
  cta: 'Se vad ni betalar mot listpris',
};

/** Flödets ord — samma i knapp, modal, mejl och rum. */
export const UNDERLAGET = {
  cta: 'Beställ besparingsunderlaget',
  skicka: 'Beställ underlaget',
  mottagen: 'Vi har tagit emot er beställning av ett besparingsunderlag.',
  mottagenAvveckling: 'Vi har tagit emot er beställning av ett underlag för avvecklingen.',
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
  { monster: /\b(arvo|vi)\b[^.!?\n]{0,30}\b(säger upp|tecknar|genomför|beställer|ordnar hela|koordinerar uppsägning|hanterar (hela )?bytet)/i, skal: 'bytesrälsen är mode:stub — Arvo säger inte upp, tecknar eller beställer' },
  { monster: /signer\w* [^.!?\n]{0,30}(med|via) bankid|bankid-signatur|bankid-signering|(signatur|godkänner|godkänna) med bankid/i, skal: 'ingen BankID-signering finns hos Arvo (Switch är mode:stub)' },
  // Grundarorder 2026-09-24 — strikt förberedande: ingen «bytesbegäran», ingen ångerfrist (det finns
  // inget att ångra när Arvo inte agerar), Arvo «påbörjar» aldrig en uppsägning och förbereder inget «byte»
  // — vi levererar ett underlag.
  // Premiumgrinden 2026-09-24: anmälan slår inte på något — beviljandet gör det (lib/premiumkrets.js).
  { monster: /(börjar|startar|aktiverar)\s+(att\s+)?(bevaka|bevakningen|er bevakning)[^.!?\n]{0,30}(inom|imorgon)|bevakningen (börjar|startar) inom/i, skal: 'anmälan slår inte på bevakningen — grundaren beviljar premium (LOFTEN.intelligenceAnmalan)' },
  { monster: /söker (igenom )?er inkorg|bevakar (nu )?er inkorg|söker igenom era leverantörsfakturor|briefing inom en timme|arvo hittar allt|bevakar arvo alla era leverantörsfakturor/i, skal: 'ingen kod läser inkorgen efter kopplingen — bara en räkning när den görs (LOFTEN.inkorgskoppling)' },
  { monster: /bytesbegäran/i, skal: 'Arvo tar inte emot en bytesbegäran — vi levererar ett besparingsunderlag' },
  { monster: /ångerrätt|ångerfrist|ångra\w*\s[^.!?\n]{0,30}inom\s+\d+\s*(timmar|dagar)|innan ni signerat/i, skal: 'en ångerfrist antyder att Arvo agerar när den löpt ut — Arvo agerar inte' },
  { monster: /påbörja\w*\s[^.!?\n]{0,30}(uppsägning|byte|avtal)/i, skal: 'Arvo påbörjar aldrig en uppsägning eller ett avtal' },
  { monster: /förbere\w*\s+(hela\s+)?bytet|bytet\s+förbere|aktivera(r)?\s+bytet|tar det därifrån|fullmakt och bytesplan/i, skal: 'Arvo förbereder ett underlag, inte ett byte (ANSVARSGRANS)' },
  { monster: /identifierade?\s+(netto|brutto)?besparing/i, skal: 'arvodet utgår på realiserad besparing, aldrig identifierad (Affärsmodell)' },
  { monster: /\bombud/i, skal: 'Arvo är inte kundens ombud (ANSVARSGRANS)' },
  { monster: /sköter (arvo )?hela (leverantörs)?bytet/i, skal: 'inget byte verkställs; Nivå 3 har inget byte alls' },
  { monster: /återkommer till er per mail/i, skal: 'ingen utskicksväg mejlar tillbaka efter granskning' },
  { monster: /kontaktar er med en rekommendation/i, skal: 'ingen utskicksväg kontaktar kunden efter ett larm' },
  { monster: /exakta premie/i, skal: 'förutsätter en överbetalning vi inte mätt' },
  { monster: /garanterad förtur/i, skal: 'en garanti om en licens som inte finns' },
  { monster: /verifierat lägre marknadspris/i, skal: 'kohortens totalsummor är varken verifierade eller ett styckpris' },
  { monster: /arvo-pris/i, skal: 'Arvo har inget eget pris — neutralitetsmoaten' },
  { monster: /verifierad partner|arvo-partner|våra partner|partnerpris|arvo-volym/i, skal: 'Arvo har inga leverantörspartner och inget eget volympris — neutralitetsmoaten' },
  // Registergranskningen 2026-09-24: prislarmets knapp «Se Arvos förberedda motdrag» stod kvar under en
  // kommentar som sa att den tagits bort, och rummets kvitto sa «Köade ett motdrag». Ingen kod köar,
  // förbereder eller utför ett motdrag; modellen är strikt förberedande (ANSVARSGRANS). Ett motdrag får
  // BESKRIVAS som ett råd till kunden, aldrig som något Arvo har gjort eller gör.
  { monster: /förbered(da|de|d|t)?\s+motdrag|motdraget\s+(är\s+|ligger\s+)?(förberett|klart|köat|färdigt)|kö(ar|ade|at)\s+(ett\s+|ert\s+)?motdrag|agerar\s+i\s+fönstret/i, skal: 'inget motdrag köas, förbereds eller utförs av Arvo (ANSVARSGRANS)' },
  { monster: /resten av boken|hela reskontran|varenda avtal ni har|vad vi gjort åt det/i, skal: 'vakten ser bara det kunden skickat — hela boken kräver Fortnox-kopplingen, som inte är byggd' },
  { monster: /(hitta|hittar|kartlägg\w*)\s+(varenda|varje)\s+besparing/i, skal: 'vi prissätter bara det vi har verifierat pris för — nitton kategorier tiger (revisionsgrinden)' },
  // Stod bredvid «1 995 kr/mån» i prospektmejlet: prenumerationen faktureras oavsett besparing.
  { monster: /fakturerar aldrig (förrän|innan|före) ni sparar/i, skal: 'Intelligence faktureras månadsvis oavsett besparing — bara bytesarvodet följer besparingen (ANSVARSGRANS.arvode)' },
  { monster: /er kostnadsbedömning|sannolik (kostnads)?premie|typisk marknadskostnad/i, skal: 'vi har inte sett prospektets kostnad — bara listprisankaret (PROSPEKT)' },
  { monster: /identifierat besparingsgap/i, skal: 'kundytan säger aldrig «identifierad besparing» (Affärsmodell)' },
];

/**
 * PROVENIENS OCH ENHET (registergranskningen 2026-09-24). Två fel som inte är löften men lika fel (regel 3):
 * · Vi jämför mot VERIFIERAT PUBLIKT LISTPRIS. «Marknadspris» är en annan proveniens — den påstår att vi
 *   känner marknadens nivå. Mätt: åtta kundytor sa «verifierat marknadspris» om listpriset.
 * · Kohorttalen räknar skilda AVSÄNDARE (e-post eller webbläsare, lib/price-alert.js), aldrig bolag —
 *   `invoice_analyses` bär ingen bolagsidentitet. Prislarmen sa «avsändare», rummet sa «bolag».
 *   Ett RÄKNAT tal (en mallvariabel) följt av «bolag» fälls; en bolagsuppräkning ur Bolagsverket
 *   motiveras inline med `kundmening-ok:`.
 */
export const PROVENIENS_OCH_ENHET = [
  { monster: /verifiera(t|de)\s+(svenska\s+)?(B2B-)?marknadspris(er)?|marknadspris,\s*samma tjänst/i, skal: 'vi jämför mot verifierat publikt listpris — «marknadspris» är en annan proveniens (regel 3)' },
  // Dörrens fynd (2026-09-24): generaliseringar om kundens avtal utan grund, konfidens eller asymmetri (regel 4).
  { monster: /sällan (omprövade|prissatta)|brukar ligga pengar|oftast där det ligger pengar|förhandlas sällan|följer (ofta )?med av gammal vana|blir vanor|varje namn är en rad i era kostnader/i, skal: 'en generalisering om kundens avtal utan grund, konfidens eller asymmetri (regel 4)' },
  { monster: /\}\s*bolag\b/, skal: `kohorttalen räknar skilda avsändare, aldrig bolag (KOHORT_ENHET)` },
];

/**
 * LAGRAD TEXT GRANSKAS VID LÄSNING (registergranskningen 2026-09-24). Registret prövar KOD — men
 * /briefing serverar insikter som skrevs av den kod som gällde när raden skapades («domar fryses vid
 * skrivning», 23 sep). Varje sträng i ett lagrat värde prövas mot registrets egna former; den som bär
 * en förbjuden form visas inte. Samma funktion används av sonden probe-lagrade-kundtexter (en sanning).
 * BLIND: formerna är ORD — en lagrad mening som är fel utan att bära orden passerar (samma gräns som KM-05).
 * @param {unknown} varde  en lagrad insikt, ett fynd — vilket JSON-värde som helst
 * @returns {{ ren: boolean, skal: string[] }}
 */
export function granskaLagradText(varde) {
  const strangar = [];
  (function ga(v) {
    if (typeof v === 'string') strangar.push(v);
    else if (Array.isArray(v)) v.forEach(ga);
    else if (v && typeof v === 'object') Object.values(v).forEach(ga);
  })(varde);
  const former = [...LOFTEN_UTAN_MEKANISM, ...PROVENIENS_OCH_ENHET, { monster: KOHORTPASTAENDE, skal: 'kohortpåstående (KOHORTPASTAENDE)' }];
  const skal = [...new Set(strangar.flatMap((t) => former.filter(({ monster }) => monster.test(t)).map((f) => f.skal)))];
  return { ren: skal.length === 0, skal };
}

/** Enheten för varje kohorttal i en kundyta. Samma ord i mejl och rum (regel 5). */
export const KOHORT_ENHET = 'avsändare';
