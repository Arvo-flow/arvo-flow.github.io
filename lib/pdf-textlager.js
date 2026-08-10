// lib/pdf-textlager.js — extraherar textlagret ur en PDF. En uppgift, inga åsikter.
//
// Modulen TOLKAR ingenting. Den plockar ut de teckensträngar som ligger i dokumentets textlager
// och lämnar dem vidare. All bedömning — står klausulen där, går läsningen att lita på — bor i
// lib/villkorslasare.js. Delningen är avsiktlig: extraktionen är den sköra delen, och skörhet
// ska aldrig få uttala sig om innebörd.
//
// VARFÖR pdfjs OCH INTE EN EGEN PARSER. Att skriva en egen PDF-läsare hade varit möjligt (zlib +
// Tj/TJ-operatorer), men dess felläge är det farliga: en egen parser producerar SUBTILT FEL text
// vid ligaturer, teckentabeller och CID-teckensnitt — och en subtilt fel text får en klausul som
// står ordagrant i dokumentet att se struken ut. Det vore ett larm i den farliga riktningen.
// pdfjs är Firefox egen motor och gör textlagret rätt eller misslyckas synligt.
//
// Blanksteg: vi fogar ihop fragmenten med radbrytning och bryr oss inte om ordmellanrum, eftersom
// läsaren ändå stryker varje blanksteg före jämförelsen. Se villkorslasare.js för varför.

/** Extraherar hela textlagret. Kastar hellre än att returnera halv text — halv text är en lögn. */
export async function extraheraTextlager(bytes) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  // Ingen worker i Node: allt körs i processen, deterministiskt och utan sidokanaler.
  const laddning = pdfjs.getDocument({
    data: new Uint8Array(bytes),
    useWorkerFetch: false,
    isEvalSupported: false,
    useSystemFonts: false,
  });
  const doc = await laddning.promise;

  const sidor = [];
  for (let i = 1; i <= doc.numPages; i += 1) {
    const sida = await doc.getPage(i);
    const innehall = await sida.getTextContent();
    sidor.push(innehall.items.map((it) => (typeof it.str === 'string' ? it.str : '')).join('\n'));
  }
  const antal = doc.numPages;

  // ── STÄDNING FÅR ALDRIG OGILTIGFÖRKLARA EN LYCKAD LÄSNING (2026-08-09) ────────────────────
  // Första versionen anropade doc.destroy(), som inte finns i pdfjs 6 — och kastade därmed bort
  // två fullständigt extraherade textlager på ett fel som inträffade EFTER att texten var läst.
  // Båda dokumenten rapporterades OLÄSBAR fast de lästs perfekt. Gränsen är skarp och principiell:
  // ett fel i INSAMLINGEN är fatalt (då vet vi inget), ett fel i RESURSFRIGÖRINGEN efteråt är det
  // inte (då vet vi allt). Att svälja det förra vore en genväg; att låta det senare fälla
  // läsningen är vidskepelse. Städfelet redovisas som en not, aldrig som tystnad.
  let stadnot = null;
  try { await laddning.destroy(); } catch (e) { stadnot = `städning misslyckades: ${e.message.slice(0, 60)}`; }

  return { text: sidor.join('\n'), sidor: antal, stadnot };
}
