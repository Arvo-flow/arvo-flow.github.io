// lib/sondvakt.js — VAKTER FÖR VÅRA EGNA MÄTINSTRUMENT (grundarorder 2026-08-14).
//
// BAKGRUNDEN: på ett dygn hade sonderna fel sju gånger och produktionskoden en gång. Det är
// ingen otur — det är vad ordningen förutsäger. Produktionen bär 1 689 tester, fyra
// pre-commit-vakter och krav på sabotage-bevis. Sonderna bar ingenting. Vi byggde en fästning
// runt produktionen och lät mätinstrumenten gå nakna, fastän det är instrumenten som avgör vad
// vi TROR om produktionen. Ett fel i en sond blir ett falskt påstående om verkligheten, och det
// är det dyraste felet som finns i den här kodbasen.
//
// ALLA SJU FELEN HADE SAMMA FORM: ett antagande där en avläsning fanns att göra. Modulen gör de
// tre vanligaste avläsningarna omöjliga att hoppa över.
//
// DEN BÄRANDE PRINCIPEN: en sond får ALDRIG svara tomt när den egentligen felade. `updated_at`-
// felet skrev "Inga jobb senaste dygnet" — inte ett felmeddelande utan ett PÅSTÅENDE OM
// PRODUKTIONEN, och jag var en mening från att rapportera det som sanning. Tystnad som ser ut som
// ett fynd är farligare än en krasch, för en krasch går inte att missförstå.

/**
 * Kräv en icke-tom miljövariabel.
 *
 * `process.env.X ?? fallback` föll på att GitHub Actions sätter en SAKNAD hemlighet till TOM
 * STRÄNG, inte undefined — och '' är inte nullish. Avsändaren blev tom, Resend svarade 422, och
 * jag var nära att rapportera det som ett fel i vårt Resend-konto. Tomt ÄR saknat; det ska sägas
 * en gång, här, i stället för att upprepas fel i varje skript.
 */
export function kravEnv(namn, { fallback = null } = {}) {
  const rått = process.env[namn];
  const värde = typeof rått === 'string' ? rått.trim() : rått;
  if (värde) return värde;
  if (fallback !== null) {
    console.warn(`[sondvakt] ${namn} saknas eller är tom → använder fallback`);
    return fallback;
  }
  throw new Error(
    `[sondvakt] ${namn} saknas eller är TOM. I GitHub Actions sätts en saknad hemlighet till tom `
    + `sträng — kontrollera att hemligheten finns i repots inställningar, inte bara i Vercel.`,
  );
}

/**
 * Läs tabellens verkliga kolumner och kräv de vi tänker fråga efter.
 *
 * `updated_at` finns inte i ingest_jobs — den heter `done_at`. Frågan föll, `.catch` svalde den,
 * och sonden rapporterade "inga jobb". Att läsa schemat kostar en fråga och gör felet omöjligt:
 * saknas en kolumn får man veta VILKA som finns, i stället för ett tomt svar.
 */
export async function kravKolumner(db, tabell, kolumner) {
  const rader = await db`
    SELECT column_name FROM information_schema.columns WHERE table_name = ${tabell}
  `;
  const finns = new Set(rader.map((r) => r.column_name));
  if (!finns.size) throw new Error(`[sondvakt] tabellen '${tabell}' finns inte i databasen`);
  const saknas = kolumner.filter((k) => !finns.has(k));
  if (saknas.length) {
    throw new Error(
      `[sondvakt] '${tabell}' saknar kolumn(er): ${saknas.join(', ')}\n`
      + `            faktiska kolumner: ${[...finns].sort().join(', ')}`,
    );
  }
  return [...finns];
}

/**
 * Kör en fråga som ALDRIG får degradera till tomt.
 *
 * `.catch(() => [])` är den farligaste raden i en sond: den förvandlar ett fel till ett fynd.
 * Här får felet i stället sitt sammanhang och kastas vidare — högljutt, med vad vi försökte göra.
 */
export async function aldrigTyst(löfte, vad) {
  try {
    return await löfte;
  } catch (err) {
    throw new Error(`[sondvakt] ${vad} FELADE: ${err.message}\n`
      + `            Detta är ett FEL, inte ett tomt resultat. Rapportera det aldrig som ett fynd.`);
  }
}
