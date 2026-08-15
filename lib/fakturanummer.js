// lib/fakturanummer.js — ETT FAKTURANUMMER SKA GÅ ATT SLÅ UPP, ANNARS ÄR DET SKRÄP.
//
// VARFÖR FÄLTET FINNS (grundarbeslut 2026-08-15, ur Geminis granskning): rummet säger "vi
// prissätter inte de här två" och namnger leverantören. En ekonomichef som vill kontrollera vårt
// beslut måste då leta upp rätt papper — och med två Slack-fakturor i pärmen går det inte.
// Fakturanumret är det enda som pekar ut EXAKT ett dokument, och det kommer ur kundens eget
// papper: noll marknadstal, noll estimat, noll integritetsrisk.
//
// VARFÖR DET ÄR FARLIGT ÄNDÅ: ett hallucinerat fakturanummer ser identiskt ut med ett avläst, och
// bär precisionens auktoritet. En kund som letar efter "Faktura 9923" och inte hittar den drar
// slutsatsen att VI har fel om allt annat också. Ett påhittat nummer är alltså värre än inget.
//
// Därför två kontroller, i den ordningen:
//   1. FORMEN  — ser strängen ut som ett fakturanummer överhuvudtaget? (ren, billig, alltid på)
//   2. PAPPRET — står den faktiskt i dokumentets textlager? Det är ett OBEROENDE vittne: pdfjs
//      läser tecknen deterministiskt, utan modell och utan prompt. Att låta en modell kontrollera
//      en modell vore cirkulärt; textlagret är en annan väg fram till samma papper (samma
//      princip som stickprovet som bevisade öresbeloppen 2026-08-12).
//
// Faller endera kontrollen returnerar vi null. Rummet visar då leverantören utan nummer — precis
// som i dag. Att tappa ett korrekt nummer kostar en bekvämlighet; att visa ett falskt kostar
// förtroendet för hela rummet.

// Fakturanummer i Sverige och internationellt: siffror, versaler, bindestreck, snedstreck,
// punkter och mellanslag. Måste innehålla MINST en siffra (annars är det en etikett, inte ett
// nummer) och vara 2–40 tecken (kortare är brus, längre är en mening).
const FORM_RE = /^[A-Za-z0-9][A-Za-z0-9\-/.\s]{0,38}[A-Za-z0-9]$/;

// Strängar som är NÅGOT ANNAT men ofta står bredvid fakturanumret och lätt plockas fel.
// Ett datum är den vanligaste förväxlingen — "2026-08-14" klarar formkontrollen med råge.
const DATUM_RE = /^\d{4}-\d{2}-\d{2}$/;
const RENT_ORD_RE = /^[A-Za-zÅÄÖåäö\s]+$/;

/**
 * Ser strängen ut som ett fakturanummer? Ren funktion, ingen I/O.
 * @returns {boolean}
 */
export function harFakturanummerform(nr) {
  const s = String(nr ?? '').trim();
  if (s.length < 2 || s.length > 40) return false;
  if (!/\d/.test(s)) return false;             // utan siffra är det ingen identifierare
  if (DATUM_RE.test(s)) return false;          // ett datum är inte ett fakturanummer
  if (RENT_ORD_RE.test(s)) return false;       // rena ord (etiketter) är inte nummer
  return FORM_RE.test(s);
}

/**
 * Normaliserar för JÄMFÖRELSE mot textlagret — aldrig för visning.
 * Textlagret bryter ofta isär tecken med mellanslag eller radbrytningar ("994 23", "INV-\n2026"),
 * så jämförelsen sker på enbart alfanumeriska tecken i versaler. Visningsvärdet förblir det
 * modellen läste, tecken för tecken: kunden ska se det som står på pappret.
 */
const jamforform = (s) => String(s ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');

/**
 * Det oberoende vittnet: står numret faktiskt i dokumentets textlager?
 *
 * @param {string} nr        - numret modellen läste
 * @param {string} textlager - deterministiskt utvunnen text (lib/pdf-textlager.js)
 * @returns {boolean} true om numret återfinns; false om det inte gör det
 *
 * OBS: saknas textlager helt (skannad PDF utan textskikt) kan kontrollen inte utföras — det är
 * INTE samma sak som att den underkänner. Anropa `verifieraFakturanummer` som hanterar det.
 */
export function finnsITextlager(nr, textlager) {
  const n = jamforform(nr);
  if (!n) return false;
  return jamforform(textlager).includes(n);
}

/**
 * Hela grinden. Returnerar numret att visa, eller null med ett namngivet skäl.
 *
 * Textlagret är valfritt: när det saknas (skannad faktura, ingen text) faller vi tillbaka på
 * enbart formkontrollen och MÄRKER det, i stället för att låtsas ha kontrollerat. Tystnad om en
 * utebliven kontroll är samma sjukdom som en vakt som är avstängd men ser påslagen ut.
 *
 * @returns {{ nummer: string|null, bekraftat: boolean, skal: string|null }}
 */
export function verifieraFakturanummer(nr, textlager = null) {
  const s = String(nr ?? '').trim();
  if (!s) return { nummer: null, bekraftat: false, skal: 'saknas_pa_fakturan' };
  if (!harFakturanummerform(s)) return { nummer: null, bekraftat: false, skal: 'ogiltig_form' };
  if (textlager == null || String(textlager).trim() === '') {
    // Formen håller, men vi har inget andra vittne. Numret visas INTE — vi säger hellre inget än
    // pekar kunden mot ett papper vi inte kunnat belägga finns.
    return { nummer: null, bekraftat: false, skal: 'inget_textlager_att_bekrafta_mot' };
  }
  if (!finnsITextlager(s, textlager)) {
    return { nummer: null, bekraftat: false, skal: 'finns_ej_i_dokumentet' };
  }
  return { nummer: s, bekraftat: true, skal: null };
}
