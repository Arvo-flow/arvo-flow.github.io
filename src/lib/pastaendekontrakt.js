// src/lib/pastaendekontrakt.js — FORMEN varje kundyta måste svara i innan den påstår något.
//
// VARFÖR MODULEN FINNS (2026-08-22, slutet av obduktionen).
//
// Under två dygn hittades tjugotvå fel i den här kodbasen. De såg olika ut — en score, en
// kvittorad, ett månadsbrev, en sond, en prisbok — men de hade EN form:
//
//     ett tillstånd som betyder «okänt / misslyckades / inte mätt», representerat med ett värde
//     som är omöjligt att skilja från ett giltigt svar.
//
//   catch → balanced: true          en krasch såg ut som en godkänd kontroll
//   catch → deviationPct: 0         en krasch såg ut som en perfekt träff
//   default: return true            en okänd typdeklaration godkände varje värde
//   ?? 75  ·  ?? 72                 ett saknat score såg ut som ett mätt
//   employees: 10                   ett antagande såg ut som en observation
//   LIKE 'mail:%' → 0               en omöjlig fråga såg ut som ett mätvärde
//   suggested = 0 → score 85        frånvaron av ett bytesmål såg ut som ett bra pris
//   0 kr/år som hjältesiffra        frånvaron av ett fynd såg ut som ett resultat
//   «DRIFT» på en oläsbar sida      ett läsfel såg ut som en prisändring
//   node … | tee → exit 0           en död sond såg ut som en lyckad mätning
//
// Systemet saknade ett sätt att säga «jag vet inte», så det lånade ett giltigt värde. Att lappa
// den tjugotredje instansen är inte svaret — svaret är att göra tillståndet omöjligt att
// representera, och att göra FRÅGAN obligatorisk för varje ny yta.
//
// Fyra moduler byggdes samma dygn och gör redan detta var för sig: domslut.js (rummets veckodom),
// diagnos.js (analyssidans score), briefinglage.js (månadsbrevet) och jamforelsekalla.js
// (jämförelsens proveniens). Den här modulen är formen de delar — och `tests/pastaendekontrakt.mjs`
// kräver att varje NY lägesmodul svarar i den. Samma drag som vaktkontraktet gjorde för
// verifierarna: en tvingande fråga, aldrig ett bevis.
//
// KONTRAKTET, tre krav:
//   1. Varje läge en yta kan stå i är DEKLARERAT — inga odeklarerade grenar.
//   2. Varje läge säger om det gör ett POSITIVT PÅSTÅENDE om kundens sak (priset, besparingen,
//      läget) — eller bara om VÅRT arbete.
//   3. Minst ett läge är det OMÄTTA, och det får aldrig påstå något. En modul utan omätt läge har
//      inte tänkt igenom sitt eget okända.
//
// FÅNGAR: en lägesmodul som saknar deklaration, som låter ett omätt läge påstå något, eller som
//   inte har något omätt läge alls.
// BLIND: kontraktet ser FORMEN, aldrig svenskan. En berömmande mening skriven i ett läge som
//   deklarerats neutralt passerar — texten bor bredvid deklarationen just för att hålla avståndet
//   kort, men avståndet är inte noll. Och det ser inte en yta som gör sina påståenden UTAN
//   lägesmodul; att nya ytor går via en är en granskningsfråga, inte en maskinfråga.

/**
 * Dömer ett lägesregister mot kontraktet. Ren funktion — samma mönster som bedomVaktkontrakt.
 *
 * @param {{ namn: string, lagen: Record<string, {positivtPastaende?: boolean, omatt?: boolean}>,
 *           natt: string[] }} p  `natt` = de lägen modulens egen funktion faktiskt kan returnera
 * @returns {{ ok: boolean, brister: string[] }}
 */
export function bedomPastaendekontrakt({ namn, lagen, natt } = {}) {
  const brister = [];
  const id = namn ?? '(namnlös modul)';

  if (!lagen || typeof lagen !== 'object' || Object.keys(lagen).length === 0) {
    brister.push(`${id}: saknar lägesregister — vilka lägen kan ytan stå i?`);
    return { ok: false, brister };
  }

  for (const [lage, def] of Object.entries(lagen)) {
    if (typeof def?.positivtPastaende !== 'boolean') {
      brister.push(`${id}/${lage}: saknar 'positivtPastaende' — påstår läget något om KUNDENS sak, eller bara om vårt arbete?`);
    }
  }

  // Krav 1: ingen odeklarerad gren. En gren som funktionen kan returnera men registret inte känner
  // passerar varje kontroll tyst — precis så «en gren utan deklaration» slank förbi DL-01.
  for (const lage of natt ?? []) {
    if (!(lage in lagen)) brister.push(`${id}: returnerar läget '${lage}' som inte finns i registret`);
  }

  // Krav 3: det omätta läget måste finnas OCH tiga.
  const omatta = Object.entries(lagen).filter(([, d]) => d?.omatt === true);
  if (omatta.length === 0) {
    brister.push(`${id}: inget läge är märkt 'omatt: true' — en yta utan omätt läge har inte tänkt igenom sitt eget okända`);
  }
  for (const [lage, def] of omatta) {
    if (def.positivtPastaende === true) {
      brister.push(`${id}/${lage}: är märkt omätt men gör ändå ett positivt påstående — det är hela felfamiljen i en rad`);
    }
  }

  return { ok: brister.length === 0, brister };
}
