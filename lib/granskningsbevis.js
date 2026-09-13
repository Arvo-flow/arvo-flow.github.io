// lib/granskningsbevis.js — ETT HEDERSORD ÄR INGEN MEKANISM.
//
// ══ VARFÖR (2026-09-13, grundarbeslut) ══════════════════════════════════════════════════════
// `scripts/mainvakt.mjs` skyddade Bevisplikten p.1 genom att kräva `ARVO_GRANSKAD=1`. Den 13
// september pushade jag fem mekanikcommits till `main` med den flaggan — satt av mig, på mitt
// eget ord om att granskningen var gjord. Den VAR gjord, två varv. Men grinden kunde inte veta
// det, och en grind som inte kan veta vaktar ingenting.
//
// Grundaren: *«Hedersord förklätt till mekanism är en arkitektonisk svaghet.»* Det är bibelns
// egen felfamilj i toppen av kedjan — ett grönt som betyder «jag tittade inte», i själva
// grinden som finns mot den sjukdomen. Vaktens gamla docstring DEKLARERADE hålet i klartext,
// och att det var deklarerat hindrade det inte (villkorsvaktens läxa, en gång till).
//
// ── VAD SOM ERSÄTTER FLAGGAN ────────────────────────────────────────────────────────────────
// En FYSISK rapport på disk som NAMNGER de commits den granskat, och som reser med pushen.
// Varje commit som rör `lib/`, `api/` eller `agents/` måste täckas av ett bevis med domen
// MERGAS. En rapport är inget hedersord: den går att öppna, läsa och hålla mot koden i
// efterhand. Flaggan gick det aldrig.
//
// ── PER COMMIT, INTE PER PUSH — och det är hela skärpan ─────────────────────────────────────
// Täckningen prövas per commit. «Granska en gång och lägg tyst på en commit till» är därmed
// omöjligt: den nya commiten är omärkt och nekas. En push-nivå-kontroll hade släppt den.
//
// ── BLOCKERAR BLOCKERAR ─────────────────────────────────────────────────────────────────────
// Ett bevis vars dom är BLOCKERAR räknas ALDRIG som täckning. Att en rapport finns är inte
// samma sak som att den friade — och de två får aldrig se likadana ut.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en mekanikcommit som når `main` utan en rapport som namnger just den; en rapport
//     vars dom är BLOCKERAR; en rapport utan dom; en tillagd commit efter granskningen.
//   BLIND: den läser en ARTEFAKT, aldrig en granskning. Att rapporten finns och namnger rätt
//     sha bevisar inte att någon faktiskt letade, eller letade väl. Det är samma gräns som
//     vaktkontraktet: maskinen ser att svaret finns, aldrig att det är sant. Skillnaden mot
//     flaggan är ändå avgörande — ett påstående som ligger på disk kan granskas i efterhand,
//     en miljövariabel försvinner i samma sekund den satts.

/** Rubriken som gör en fil till ett granskningsbevis. */
export const BEVIS_KATALOG = 'ops/granskningar';
const HUVUD = /<!--\s*granskning([\s\S]*?)-->/;

/** En sha är 7–40 hexadecimaler. Kortformer tillåts — jämförelsen sker på prefix. */
const SHA = /\b[0-9a-f]{7,40}\b/g;

/**
 * Läs ett granskningsbevis ur en rapporttext.
 *
 * @returns {{giltigt: boolean, commits: string[], dom: string|null, skal: string}}
 */
export function parsaBevis(text) {
  const m = HUVUD.exec(String(text ?? ''));
  if (!m) return { giltigt: false, commits: [], dom: null, datum: null, skal: 'ingen granskningsrubrik (<!-- granskning … -->)' };
  const huvud = m[1];

  const domRad = /^\s*dom\s*:\s*(\S+)/im.exec(huvud);
  const dom = domRad ? domRad[1].toUpperCase() : null;
  if (!dom) return { giltigt: false, commits: [], dom: null, datum: null, skal: 'rubriken saknar `dom:`' };
  // En okänd dom är ett OKÄNT och får aldrig låna ett giltigt värde — felfamiljen.
  if (dom !== 'MERGAS' && dom !== 'BLOCKERAR') {
    return { giltigt: false, commits: [], dom, datum: null, skal: `okänd dom «${dom}» — bara MERGAS eller BLOCKERAR` };
  }

  // ⚠️ `datum:` ÄR OBLIGATORISKT SEDAN 2026-09-13, och det bär en MEKANIK — inte bara läsbarhet.
  // Granskaren visade att GB-08 («ett friande bevis vinner över ett TIDIGARE blockerande») var
  // OPRÖVAT: koden kände ingen ordning alls, så utfallet var identiskt i båda riktningarna, och
  // ett BLOCKERAR kunde därför ALDRIG upphäva ett MERGAS. Ordet «tidigare» i testnamnet var ett
  // påstående ingen kod bar. Med ett datum vinner den SENASTE domen, åt båda håll.
  const datumRad = /^\s*datum\s*:\s*(\d{4}-\d{2}-\d{2})\b/im.exec(huvud);
  if (!datumRad) {
    return { giltigt: false, commits: [], dom, datum: null, skal: 'rubriken saknar `datum: ÅÅÅÅ-MM-DD` — utan det går domarna inte att ordna i tid' };
  }

  const commitRad = /^\s*commits?\s*:\s*(.+)$/im.exec(huvud);
  if (!commitRad) return { giltigt: false, commits: [], dom, datum: datumRad[1], skal: 'rubriken saknar `commits:`' };
  const commits = (commitRad[1].match(SHA) ?? []).map((s) => s.toLowerCase());
  if (commits.length === 0) {
    return { giltigt: false, commits: [], dom, datum: datumRad[1], skal: '`commits:` namnger ingen sha (7–40 hex)' };
  }

  return { giltigt: true, commits, dom, datum: datumRad[1], skal: 'ok' };
}

/** Namnger beviset commiten? Prefixjämförelse åt båda håll, så kort- och långform duger. */
function namnger(bevisSha, commitSha) {
  const a = bevisSha.toLowerCase();
  const b = commitSha.toLowerCase();
  return a.length <= b.length ? b.startsWith(a) : a.startsWith(b);
}

/**
 * Täcker bevisen varje mekanikcommit?
 *
 * @param {string[]} mekanikCommits  sha för varje commit som rör lib/, api/ eller agents/
 * @param {Array<{fil: string, text: string}>} bevisfiler
 * @returns {{ok: boolean, otackta: string[], blockerade: Array<{sha: string, fil: string}>, trasiga: Array<{fil: string, skal: string}>}}
 */
export function granskningstackning(mekanikCommits, bevisfiler) {
  const trasiga = [];
  const bevis = [];
  for (const b of bevisfiler ?? []) {
    const p = parsaBevis(b.text);
    if (!p.giltigt) { trasiga.push({ fil: b.fil, skal: p.skal }); continue; }
    bevis.push({ ...p, fil: b.fil });
  }

  const otackta = [];
  const blockerade = [];
  for (const sha of mekanikCommits ?? []) {
    const traffar = bevis.filter((b) => b.commits.some((c) => namnger(c, sha)));
    if (traffar.length === 0) { otackta.push(sha); continue; }
    // SENASTE domen vinner — åt BÅDA håll. Vid samma datum väger BLOCKERAR tyngst: två domar
    // samma dag går inte att ordna, och då är det strängare svaret det enda ärliga. Att välja
    // det mildare vore att låta en oavgjord fråga se ut som ett godkännande.
    const gallande = [...traffar].sort((a, b) => (a.datum < b.datum ? 1 : a.datum > b.datum ? -1
      : (a.dom === 'BLOCKERAR' ? -1 : 1)))[0];
    if (gallande.dom === 'MERGAS') continue;
    blockerade.push({ sha, fil: gallande.fil });
  }

  return { ok: otackta.length === 0 && blockerade.length === 0, otackta, blockerade, trasiga };
}
