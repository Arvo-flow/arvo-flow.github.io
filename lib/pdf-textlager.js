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
  const tokens = [];   // positionerade textfragment — samma parse, ingen andra läsning
  for (let i = 1; i <= doc.numPages; i += 1) {
    const sida = await doc.getPage(i);
    const innehall = await sida.getTextContent();
    sidor.push(innehall.items.map((it) => (typeof it.str === 'string' ? it.str : '')).join('\n'));
    // ── POSITIONERNA KASTADES BORT (2026-09-08) ────────────────────────────────────────────
    // `items` bär `transform: [a,b,c,d,x,y]` — var varje textfragment står på sidan. Vi
    // sammanfogade dem till en radsträng och slängde koordinaterna, och därmed blev en tabell
    // omöjlig att läsa: pdfjs lägger VARJE CELL på egen rad, så antalet «57» hamnar fyra rader
    // från sitt belopp. Det var det som gjorde kvantitetsvittnet obrukbart (KV-10).
    //
    // Med x/y går tabellen att återskapa exakt: kolumnrubriken «Antal» står på ett x, och
    // radens antal står på samma x. Då behöver vi inte VITTNA om modellens gissning — vi kan
    // LÄSA talet själva. Texten härleds fortfarande ur samma tokens, så de två kan inte
    // beskriva olika dokument (regel 1).
    for (const it of innehall.items) {
      const s2 = typeof it.str === 'string' ? it.str : '';
      if (!s2.trim()) continue;
      const t = it.transform;
      if (!Array.isArray(t) || t.length < 6) continue;
      tokens.push({ sida: i, x: Math.round(t[4]), y: Math.round(t[5]), text: s2.trim() });
    }
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

  return { text: sidor.join('\n'), tokens, sidor: antal, stadnot };
}
