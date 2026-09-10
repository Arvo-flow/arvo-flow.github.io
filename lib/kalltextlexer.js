// lib/kalltextlexer.js — EN sanning för «läs koden, inte prosan».
//
// ══ VARFÖR DEN FLYTTADE HIT (2026-09-10) ═══════════════════════════════════════════════════
// Lexern skrevs 9 sep inuti `tests/antalsdoktrinen.mjs`. Dagen efter behövde FX-vakten samma
// tjänst — och fällde omedelbart på MIN EGEN KOMMENTAR: raden «⚠️ `source: 'kv'` SKREV ÖVER
// KÄLLAN» matchade det förbjudna mönstret, precis som RD-08 fälldes av en kommentar i augusti.
//
// Två utvägar fanns, och bara en är tillåten här. Att kopiera funktionen hade gett två lexrar
// som glider isär (regel 1), och att importera den ur en TESTFIL hade kört hela AD-sviten en
// extra gång som sidoeffekt vid varje import — mätt, det syntes direkt i TAP-utdata. Delad
// logik bor i `lib/`; `tests/antalsdoktrinen.mjs` importerar den härifrån och äger fortfarande
// bevisen (AD-07 mallsträngen, AD-08 astrala tecken mot hela kodbasen).

/**
 * Blankar innehållet i strängar, mallsträngar, regexlitteraler och kommentarer — men BEHÅLLER
 * `${…}`-interpolationen, för där bor riktig kod. Radbrytningar bevaras så att radnummer håller.
 *
 * ══ VARFÖR EN LEXER OCH INTE ETT HACK (granskningens fynd 1 + 2, 2026-09-09) ═══════════════
 * Första versionen hoppade över mallsträngar genom att räkna BACKTICK-PARITET per rad. Två fel,
 * båda mätta, båda i den vakt jag skrev mot precis den formen:
 *
 *   · **Den kunde stängas av utan att ett test föll.** Sabotage `const varIMall = iMall` →
 *     `= true` gör att vakten hoppar över VARJE rad och skannar ingenting — `# fail 0`,
 *     identiskt med baslinjen. Grön av tomhet, i vakten mot grön-av-tomhet.
 *   · **Och min motivering var osann.** Jag skrev «den kostar täckning, aldrig falsklarm —
 *     säkra riktningen». MÄTT: 4 455 av 38 119 rader (11,7 %) blindades, `prompt.js` tappade
 *     342 av 357. Åt andra hållet förskjuter en escapead backtick pariteten så att ren
 *     promptprosa FÄLLS som division. Båda riktningarna, alltså — ett påstående skrivet före
 *     mätning, i kommentaren om att aldrig skriva påståenden före mätning.
 *
 * KVARSTÅENDE KÄND SVAGHET, uttalad: `/`-diskrimineringen mellan division och regexlitteral är
 * en heuristik — föregående icke-blanka tecken avgör, plus en nyckelordslista (`return /re/`
 * lexades först som division; tre verkliga fall i kodbasen). Kvar är `/` i en teckenklass
 * (`[/]`) som avslutar regexen för tidigt, och regexflaggor som kan läcka. Riktningen är
 * mätt: 0 tecken KOD blankas felaktigt; det som läcker är literalinnehåll, vilket kan ge ett
 * FALSKLARM men aldrig blindhet. Skillnaden mot pariteten är att felet är mätbart och att
 * invarianten «samma längd, samma radantal» prövas mot hela kodbasen (AD-08).
 */
export function strippaStrangar(kalla) {
  // ⚠️ `Array.from` ITERERAR KODPUNKTER, `kalla[i]` INDEXERAR KODENHETER (granskningens V3,
  // 2026-09-09). Vid första astrala tecknet — en emoji i en kommentar räcker — blir utdata ETT
  // element kortare än indata, och därefter skrivs varje blankning på fel position. MÄTT över
  // lib/, api/ och agents/: 3 filer av 218 desynkade och **180 rader försvann helt** ur
  // skanningen (`api/send-report.mjs` 607 → 480). En injicerad `l.amount / l.unitPrice` i det
  // området missas alltså rakt av — vakten var blind på 180 rader utan att någon räknade dem.
  //
  // `split('')` delar på KODENHETER och håller därför exakt samma index som `kalla[i]` och
  // `kalla.length`. Ett surrogatpar blir två element som båda blankas — visuellt samma resultat,
  // och positionerna håller. Felfamiljen igen: två sätt att räkna samma sträng, och det ena
  // svaret gick inte att skilja från det andra förrän någon mätte radantalet.
  const ut = kalla.split('');
  const OPERAND_FORE = /[)\]}\w$]/;      // står detta före ett `/` är det division, inte regex
  // ⚠️ ETT NYCKELORD SLUTAR PÅ EN BOKSTAV (granskningens V4). `return /regex/` såg ut som en
  // division eftersom `sistaKod` var `n` — tre verkliga fall i kodbasen, och en regex som lexas
  // som division läcker sitt innehåll ut i den skannade texten. Ett nyckelord är inte en operand.
  const NYCKELORD = /\b(?:return|typeof|instanceof|case|in|of|do|else|yield|await|delete|void|new|throw)$/;
  let sistaOrd = '';                     // senaste ordet i kodläge, för nyckelordskontrollen
  let lage = 'kod';
  const mallStack = [];                  // ${} kan nästlas i mallsträngar
  let klammerDjup = 0;
  let sistaKod = '';                     // senaste icke-blanka tecknet i kodläge
  for (let i = 0; i < kalla.length; i += 1) {
    const c = kalla[i], n = kalla[i + 1];
    const blanka = () => { if (c !== '\n') ut[i] = ' '; };
    if (lage === 'kod') {
      if (c === '/' && n === '/') { lage = 'radkommentar'; blanka(); continue; }
      if (c === '/' && n === '*') { lage = 'blockkommentar'; blanka(); continue; }
      if (c === '/' && (!OPERAND_FORE.test(sistaKod) || NYCKELORD.test(sistaOrd))) {
        lage = 'regex'; blanka(); continue;
      }
      if (c === "'") { lage = 'enkel'; blanka(); continue; }
      if (c === '"') { lage = 'dubbel'; blanka(); continue; }
      if (c === '`') { lage = 'mall'; blanka(); continue; }
      // ⚠️ DJUPET RÄKNADES FEL MED ETT STEG i första versionen: `${` pushade djupet OCH ökade
      // det, så den avslutande `}` aldrig matchade. Följden var värre än ett missat `}` — den
      // efterföljande backticken lästes som en NY mallsträng och blindade raden efter. Provets
      // rad 7 (`const t = belopp / apris;`) försvann, och det var så buggen syntes.
      if (c === '}' && mallStack.length > 0 && klammerDjup === mallStack[mallStack.length - 1]) {
        mallStack.pop(); lage = 'mall'; blanka(); continue;
      }
      if (c === '{') klammerDjup += 1;
      if (c === '}') klammerDjup -= 1;
      if (c.trim() !== '') sistaKod = c;
      // ⚠️ ETT BLANKSTEG FICK GLÖMMA ORDET. Första versionen nollställde `sistaOrd` på VARJE
      // icke-ordtecken, alltså även mellanslaget i `return /re/` — och då hann nyckelordet
      // försvinna innan `/` nåddes. Provet fällde det. Blanktecken bevarar ordet; allt annat
      // avslutar det.
      if (/[\w$]/.test(c)) sistaOrd += c; else if (c.trim() !== '') sistaOrd = '';
      continue;
    }
    if (lage === 'radkommentar') { if (c === '\n') lage = 'kod'; else blanka(); continue; }
    if (lage === 'blockkommentar') {
      blanka();
      if (c === '*' && n === '/') { ut[i + 1] = ' '; i += 1; lage = 'kod'; }
      continue;
    }
    if (lage === 'regex') {
      blanka();
      if (c === '\\') { if (kalla[i + 1] !== '\n') ut[i + 1] = ' '; i += 1; continue; }
      if (c === '/' ) { lage = 'kod'; sistaKod = '/'; }
      if (c === '\n') lage = 'kod';        // en regex kan inte spänna över rader
      continue;
    }
    // strängtillstånden
    blanka();
    if (c === '\\') { if (kalla[i + 1] !== '\n') ut[i + 1] = ' '; i += 1; continue; }
    if (lage === 'enkel' && c === "'") { lage = 'kod'; sistaKod = "'"; continue; }
    if (lage === 'dubbel' && c === '"') { lage = 'kod'; sistaKod = '"'; continue; }
    if (lage === 'mall') {
      if (c === '`') { lage = 'kod'; sistaKod = '`'; continue; }
      if (c === '$' && n === '{') {       // interpolationen ÄR kod och ska skannas
        ut[i + 1] = '{'; mallStack.push(klammerDjup); lage = 'kod'; i += 1;
      }
    }
  }
  return ut.join('');
}
