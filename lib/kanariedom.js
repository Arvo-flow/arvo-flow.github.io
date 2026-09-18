// lib/kanariedom.js — KANARIEFÅGELNS DOM, som en ren funktion.
//
// ══ VARFÖR DOMEN FLYTTADE HIT (2026-09-18) ══════════════════════════════════════════════════
// Domen bodde i en shell-heredoc inuti `.github/workflows/canary.yml`. Ingen av 2 416 tester
// kunde nå den, och kunde inte ha gjort det — sviten anropar aldrig YAML. Följden, mätt:
//
//   · `status=ok` var DÖD FRÅN FÖRSTA COMMITEN (4bf4daf). Python-raden saknade en avslutande
//     parentes, `python3 -c` föll på SyntaxError, `2>/dev/null || echo "false"` svalde felet och
//     lämnade OK="false". En frisk produktion kunde alltså aldrig få annat än `bad_response`.
//   · `status=down` var LIKA DÖD. GitHub kör `run:`-steg med `bash -e`; en misslyckad curl i en
//     variabeltilldelning avbryter steget på raden ovanför `CURL_EXIT=$?`, och efterföljande steg
//     hoppas över. Det ENDA fall en kanariefågel finns till för — sajten svarar inte alls — gav
//     alltså varken ärende eller notis. Tyst.
//   · Kvar fungerade `error_NNN` och `bad_response`, alltså bara de två fall där servern SVARADE.
//
// Utfallet i produktion: ärende #79 bär 913 kommentarer sedan 9 juli (#75 bar 386 dessförinnan).
// De första ~850 var SANNA — `api/health` mätte då variabelNAMNET `DATABASE_URL` medan `lib/db.js`
// godtar fyra namn, och Vercel satte `POSTGRES_URL`. Den lagade 8 september. Sedan dess (~60
// kommentarer) är produktionen frisk och det är VAKTEN som ljuger.
//
// Två fel bakom varandra, och det övre dolde det undre i två månader: så länge health alltid var
// röd prövades den gröna grenen aldrig, och en gren som aldrig prövas i det tillstånd produktionen
// är i kan vara död hur länge som helst. Bibelns 10 september-regel, på driftövervakningen.
//
// ══ VAKTENS PREMISS (Verifieringsplikten p.5) ═══════════════════════════════════════════════
//   FÅNGAR: varje utfall curl + en HTTP-status + en kropp kan ge, inklusive de tre tillstånd som
//           måste hållas isär för att larmet ska betyda något (se nedan).
//   BLIND:  domen ser bara vad curl RAPPORTERADE. Den vet inget om DNS-kapning, en cachad 200 från
//           ett CDN framför en död origin, eller ett svar som är välformat och osant. Den prövar
//           att vi frågade och läste rätt — aldrig att svaret är sant.
//
// ══ TRE RÖDA SOM KRÄVER OLIKA ÅTGÄRDER (bibelns 22 augusti-läxa) ════════════════════════════
// Google-vakten rapporterade «DRIFT» för en sida som inte gick att läsa. Båda är röda, men det ena
// betyder «rätta prisboken» och det andra «laga vakten» — och ett larm som blandar ihop dem
// urholkar varje framtida larm. Här hålls de isär av `objekt`:
//
//   produktion → NERE · FELKOD · OHALSOSAM   (åtgärda driften)
//   vakten     → OLASBART                     (åtgärda endpointen eller den här filen)
//
// `OLASBART` är felfamiljen i sin renaste form, gjord omöjlig: ett svar vi inte kunde TOLKA får
// aldrig återges som ett svar vi tolkade. Den gamla koden kallade det `bad_response` — exakt samma
// ord som «servern sa uttryckligen ok:false» — och de två kräver motsatta åtgärder.

export const KANARIE = Object.freeze({
  OK:        'ok',
  NERE:      'down',
  FELKOD:    'error',
  OHALSOSAM: 'ohalsosam',
  OLASBART:  'olasbart_svar',
});

const PRODUKTION = 'produktion';
const VAKTEN     = 'vakten';

/**
 * Dömer ett kanariesvep. REN funktion — inga sidoeffekter, ingen I/O, inget process.env.
 *
 * @param {object} svep
 * @param {number} svep.curlExit  curls exit-kod. 0 = curl nådde fram. OBLIGATORISK.
 * @param {number|string} svep.httpCode  HTTP-status. Läses bara när curlExit === 0.
 * @param {string|null} svep.body  svarskroppen som RÅ TEXT (aldrig förparsad — se KD-09).
 * @returns {{status:string, objekt:string, rubrik:string, atgard:string[], larmar:boolean}}
 */
export function kanariedom({ curlExit, httpCode, body } = {}) {
  // ⚠️ INGET DEFAULTVÄRDE, MED FLIT. `curlExit = 0` hade gjort «anroparen glömde fråga» omöjlig
  // att skilja från «curl lyckades» — och då hade en trasig runner rapporterat frisk produktion.
  // Samma skäl som `userEmail` i storeDatapoint saknar default (bibeln 11 september).
  if (typeof curlExit !== 'number' || !Number.isFinite(curlExit)) {
    throw new TypeError(
      'kanariedom: curlExit måste vara ett tal. Fick ' + JSON.stringify(curlExit) + '. '
      + 'Ett okänt utfall får aldrig låna utseendet av ett lyckat anrop.');
  }

  // ── curl kom inte fram: sajten svarar inte alls. Kanariefågelns hela existensberättigande. ──
  if (curlExit !== 0) {
    return {
      status: KANARIE.NERE, objekt: PRODUKTION, larmar: true,
      rubrik: `Sajten svarar inte — curl avslutade ${curlExit}`,
      atgard: [
        'Kontrollera [Vercel dashboard](https://vercel.com/arvo-flow) — är senaste deployment grön?',
        'Kontrollera DNS och certifikat för arvoflow.se.',
        `curl-koden ${curlExit} säger vilket led som brast (6 = DNS, 7 = anslutning, 28 = timeout, 35/60 = TLS).`,
      ],
    };
  }

  // ── curl kom fram. Nu är HTTP-koden ett krav; utan den vet vi inte vad vi läste. ──
  const kod = Number(httpCode);
  if (!Number.isInteger(kod) || kod < 100 || kod > 599) {
    return {
      status: KANARIE.OLASBART, objekt: VAKTEN, larmar: true,
      rubrik: `curl lyckades men lämnade ingen giltig HTTP-status (${JSON.stringify(httpCode)})`,
      atgard: [
        'Detta är ett fel i KANARIEFÅGELN, inte i produktionen — ändra inget i Vercel.',
        'Kontrollera `-w "%{http_code}"` i .github/workflows/canary.yml.',
      ],
    };
  }

  if (kod !== 200) {
    return {
      status: `${KANARIE.FELKOD}_${kod}`, objekt: PRODUKTION, larmar: true,
      rubrik: `Endpointen svarade HTTP ${kod}`,
      atgard: [
        'Läs `missing`-fältet i responsen nedan — det namnger exakt vad som saknas.',
        'Sätt de saknade variablerna i Vercel → Settings → Environment Variables.',
        'Granska senaste deployment-loggar.',
      ],
    };
  }

  // ── HTTP 200. Nu avgör KROPPEN, och här bor den gamla buggen. ──
  let data;
  try {
    data = JSON.parse(String(body ?? ''));
  } catch {
    return {
      status: KANARIE.OLASBART, objekt: VAKTEN, larmar: true,
      rubrik: 'HTTP 200 men kroppen är inte JSON',
      atgard: [
        'Detta är ett fel i VAKTEN eller endpointen, inte nödvändigtvis i driften.',
        'Träffar canary rätt URL? En HTML-sida med status 200 ser ut så här.',
        'Kontrollera att /api/health fortfarande returnerar JSON.',
      ],
    };
  }

  // Ett JSON-svar UTAN `ok`-fältet är inte ett nej — det är ett svar vi inte kan läsa. Att döma
  // det som «ohälsosam» vore att påstå ett skäl vi inte har (reservkortets läxa, BK-06).
  if (data === null || typeof data !== 'object' || Array.isArray(data) || !('ok' in data)) {
    return {
      status: KANARIE.OLASBART, objekt: VAKTEN, larmar: true,
      rubrik: 'HTTP 200 med JSON som saknar fältet `ok`',
      atgard: [
        'Detta är ett KONTRAKTSBROTT mellan canary och /api/health, inte ett driftfel.',
        'Antingen har endpointen bytt svarsform, eller så pekar canary på fel URL.',
      ],
    };
  }

  if (data.ok === true) {
    return {
      status: KANARIE.OK, objekt: PRODUKTION, larmar: false,
      rubrik: 'Produktionen svarar frisk',
      atgard: [],
    };
  }

  // Servern sa uttryckligen ifrån. Skälet kommer ur SVARET, aldrig ur vår gissning.
  const saknas = Array.isArray(data.missing) && data.missing.length
    ? data.missing.join(', ') : null;
  return {
    status: KANARIE.OHALSOSAM, objekt: PRODUKTION, larmar: true,
    rubrik: saknas
      ? `Endpointen svarade 200 men rapporterar ok:false — saknar ${saknas}`
      : 'Endpointen svarade 200 men rapporterar ok:false',
    atgard: [
      saknas
        ? `Sätt ${saknas} i Vercel → Settings → Environment Variables.`
        : 'Läs `checks`-fältet nedan — endpointen namnger själv vad som brister.',
      'Redeploy krävs för att nya miljövariabler ska nå en körande funktion.',
    ],
  };
}
