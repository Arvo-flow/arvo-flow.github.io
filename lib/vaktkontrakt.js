// lib/vaktkontrakt.js — VAKTKONTRAKTET: den fråga som ska ställas innan något får kallas vakt.
//
// VARFÖR DEN HÄR FILEN FINNS (2026-08-09). Villkorsvakten byggdes för att hasha ett
// villkorsdokument och larma när hashen ändrades. Den var noggrant testad: domaren blindades och
// fem av tolv tester föll. Den var vackert motiverad: ingen PDF-tolkning, noll falsklarm. Och
// den var oförmögen att någonsin larma — dokumentet låg på en innehållsadresserad URL, alltså en
// adress vars innehåll aldrig kan ändras. Leverantören publicerar en ny version på en ny adress.
// Vakten kunde bara säga grönt, i evighet.
//
// Felets anatomi, exakt: jag ställde frågan "hur kontrollerar jag det här?" och löste den
// elegant. Jag ställde aldrig frågan "hur går det här sönder?". Testerna bevisade att MEKANISMEN
// reagerar — de kunde aldrig bevisa att SIGNALEN någonsin rör sig. Tänderna satt på fel axel.
//
// Kontraktet nedan tvingar fram den överhoppade frågan i skrift, vid författandet, innan koden
// får registreras. Två fält krävs av varje vakt:
//
//   fangar — en konkret verklig förändring som utlöser larmet.
//   blind  — en konkret verklig förändring som INTE utlöser det.
//
// ── VARFÖR `blind` ÄR DET BÄRANDE FÄLTET ────────────────────────────────────────────────────
// "Vad fångar den?" är en fråga man besvarar ur koden man just skrivit, och svaret bekräftar
// alltid det man hoppades. "Vad fångar den INTE?" tvingar fram en inventering av hur artefakten
// faktiskt kan förändras — och det är precis den inventeringen jag hoppade över. Hade jag varit
// tvungen att skriva blindfläcken för hash-vakten hade meningen blivit "en ny version på en ny
// adress", och i samma sekund som den meningen stod på skärmen hade hålet varit synligt.
// En vakt utan blindfläck existerar inte. Påstår någon motsatsen är påståendet felet.
//
// ── VAD DET HÄR ÄR OCH INTE ÄR ──────────────────────────────────────────────────────────────
// Det här är en TVINGANDE FRÅGA, inte ett bevis. Maskinen kan kontrollera att fälten finns, är
// specifika och inte påstår allvetande — den kan aldrig kontrollera att svaret är sant. Att
// låtsas annat vore samma fel en gång till: en välformulerad princip som ger känslan av att
// arbetet är gjort. Beviset bor kvar där det alltid bott — i ett sabotage som fäller sviten.

/** Ett svar kortare än så här är en etikett, inte en inventering. */
export const MIN_TECKEN = 40;

// Fraser som gör blindfläcken meningslös. En vakt som "fångar allt" har inte inventerats.
//
// FÖRSTA VERSIONEN VAR FÖR TRUBBIG (samma dag, en minut senare). Den matchade ordet "inget"
// var som helst i texten och fällde därför två helt ärliga skopusatser:
//   "…ser inget som kräver inloggning eller dialog."
//   "Google publicerar inget publikt SEK-pris…"
// Båda BESKRIVER en blindfläck; ingen av dem PÅSTÅR att den saknas. Ett larm som skriker på rätt
// svar blir avstängt precis lika säkert som ett som tiger — det är repots mest upprepade läxa,
// och jag gick i den från andra hållet inom en minut efter att ha byggt skyddet mot den.
// Mönstren nedan träffar därför ANSPRÅKET, inte ordet: negationen måste stå som själva svaret.
const ALLVETANDE = [
  /^\s*[-—]?\s*(inget|inga|ingenting|ingen)\b/i,        // svaret INLEDS med "det finns ingen"
  /\binga (kända )?(blinda fläckar|luckor|blindfläckar)\b/i,
  /\b(fångar|täcker|ser) allt\b/i,
  /\bingenting undgår\b/i,
];

// Generiska svar som passerar teckenkravet utan att bära information.
const INNEHÅLLSLÖST = /^(n\/a|saknas|okänt|tbd|se ovan|se koden)\b/i;

/**
 * Dömer EN vakts kontrakt. Rent, offline, utan nätverk.
 * @returns {{ ok: boolean, brister: string[] }}
 */
export function bedomVaktkontrakt(v) {
  const brister = [];
  const id = v?.id ?? '(namnlös vakt)';

  for (const [falt, fraga] of [
    ['fangar', 'vilken verklig förändring UTLÖSER larmet?'],
    ['blind', 'vilken verklig förändring utlöser det INTE?'],
  ]) {
    const svar = typeof v?.[falt] === 'string' ? v[falt].trim() : '';
    if (!svar) { brister.push(`${id}: saknar '${falt}' — ${fraga}`); continue; }
    if (svar.length < MIN_TECKEN) brister.push(`${id}: '${falt}' är för kort (${svar.length} tecken) för att vara en inventering`);
    if (INNEHÅLLSLÖST.test(svar)) brister.push(`${id}: '${falt}' är ett platshållarsvar`);
  }

  // ── TREDJE FRÅGAN: VAD TÄCKER VAKTEN? (tvingande sedan 2026-08-12) ──────────────────────────
  // `fangar` och `blind` fångar vaktens FÖRMÅGA. De säger ingenting om dess RÄCKVIDD — vilka
  // poster i prisboken den faktiskt läser. Den luckan lät E3 och E5, bokens största tal, stå
  // obevakade i månader bakom en grön audit: täckningen mättes på leverantörsnamn, och m365-modulen
  // "fanns" ju. En vakt kan alltså vara ärlig om sin blindfläck och ändå dölja ett hål, eftersom
  // frågan aldrig ställdes.
  //
  // Tom lista är ett giltigt svar — kategorivakter läser inga licensnivåer alls. Det ofrånkomliga
  // är att svaret FINNS: skillnaden mellan "läser inga" och "ingen frågade" måste stå i koden.
  // Kontraktet kan se att svaret finns, aldrig att det är sant — beviset bor kvar i prisauditens
  // korsprövning mot prisboken och i sabotaget som fäller den.
  if (!Array.isArray(v?.bevakadeTiers)) {
    brister.push(`${id}: saknar 'bevakadeTiers' — vilka prisboksnycklar LÄSER vakten? (tom lista om inga)`);
  } else if (v.bevakadeTiers.some((t) => typeof t !== 'string' || !t.trim())) {
    brister.push(`${id}: 'bevakadeTiers' innehåller en tom eller icke-textuell nyckel`);
  } else if (new Set(v.bevakadeTiers).size !== v.bevakadeTiers.length) {
    brister.push(`${id}: 'bevakadeTiers' har dubbletter — en deklaration som räknar samma post två gånger är slarvig, och slarv är hur täckning överdrivs`);
  }

  const blind = String(v?.blind ?? '');
  if (blind && ALLVETANDE.some((rx) => rx.test(blind))) {
    brister.push(`${id}: 'blind' påstår att vakten inte har någon blindfläck. Varje vakt har en — påståendet är felet.`);
  }
  if (v?.fangar && v?.blind && String(v.fangar).trim() === String(v.blind).trim()) {
    brister.push(`${id}: 'fangar' och 'blind' är samma text — då är frågan inte ställd, bara besvarad två gånger`);
  }

  return { ok: brister.length === 0, brister };
}

/** Dömer hela fabriken. En tom fabrik är aldrig grön. */
export function bedomFabriken(vakter) {
  if (!Array.isArray(vakter) || vakter.length === 0) {
    return { ok: false, brister: ['Fabriken är tom — det finns inga vakter att döma.'] };
  }
  const brister = vakter.flatMap((v) => bedomVaktkontrakt(v).brister);
  return { ok: brister.length === 0, brister };
}
