// lib/fakturabalans.js — GÅR FAKTURAN IHOP MED SIG SJÄLV?
//
// ══ VARFÖR (2026-09-08, ur grundarens Microsoft-faktura) ═══════════════════════════════════
//
// Fakturan trycker sina egna tal:
//
//     radsumma (2 102,90 + 4 560,00)   =  6 662,90
//     Moms (25%)                       =  1 665,73     ← 25 % av 6 662,90, stämmer på öret
//     Att betala                       =  8 331,63
//     6 662,90 + 1 665,73              =  8 328,63     ← 3,00 kr SAKNAR TÄCKNING
//
// Ring 1 släppte igenom det, och det var inte otur. Den jämför radsumman mot `invoiceTotal` med
// toleransen `max(50 kr, 3 % av totalen)` och förklarar bort glapp som «momsen» genom att RÄKNA
// `radsumma × (1 + sats)`. Vi läser alltså momsens SATS men aldrig dess BELOPP — trots att
// beloppet står tryckt bredvid. Båda vägar modellen kan läsa totalen passerar:
//
//     invoiceTotal = 8 331,63 (rått)      glapp 1 668,73 · tolerans 249,95 → «skillnaden är momsen»
//     invoiceTotal = 6 665,30 (÷ 1,25)    glapp     2,40 · tolerans 199,96 → «radsumman stämmer»
//
// Kunden får bocken «radsumman stämmer» på en faktura där den bevisligen inte gör det. Och
// formen är fel, inte bara talet: **en procentsats där felrymden är ett fast belopp.** På
// 8 331 kr släpper vi igenom 250 kr; på 200 000 kr släpper vi igenom 6 000 kr. Det är samma
// felform som fälldes 24 augusti på radaxeln — här på fakturaaxeln.
//
// ── VARFÖR TEXTLAGRET OCH INTE ETT NYTT MODELLFÄLT ────────────────────────────────────────
// Ett `moms_belopp` i extraktionsschemat hade varit maskinifyllt, och bibeln har läxan redan:
// «modellifyllda observationer varierar mellan körningar — en grind vars värde ÄR precisionen
// får aldrig gå mot kundyta på enbart maskinifyllda fält.» Fakturans egna TRYCKTA tal är ett
// oberoende vittne som inte kan hallucinera, det ligger redan i request-vägen (pdfjs, ~15 ms),
// och 74 av 75 verkliga fakturor bär det.
//
// ── VAD GLAPPET BETYDER, OCH VAD VI ALDRIG PÅSTÅR ─────────────────────────────────────────
// Ett glapp betyder EN AV TVÅ SAKER och modulen vet inte vilken:
//   (a) fakturan går inte ihop — leverantören begär pengar ingen rad motiverar, eller
//   (b) vi läste inte alla rader.
// Att gissa vilket vore reservkortsfelet (BK-06/BK-07, 15 aug): en gren som inte VET varför den
// stannade får bara säga ATT den stannade. Domen namnger därför båda möjligheterna och väljer
// ingen. Det är också ärligt mot kunden: båda är värda att veta.
//
// FAIL-OPEN PÅ PIPELINEN, ALLTID (FB-05). Modulen blockerar inget och ändrar inga tal. Den ger
// ett omdöme; anroparen bestämmer vad som sägs.
//
// FÅNGAR: ett glapp mellan fakturans egna tryckta tal och de rader vi läste, större än
//   öresavrundningen — alltså exakt det Ring 1:s procenttolerans är blind för.
// BLIND, uttalat:
//   1. Kräver att BÅDA talen står tryckta och går att hitta. En faktura utan momsrad eller utan
//      en «att betala»-rad svarar `ovittnesbar` — ett eget tillstånd, aldrig «stämmer».
//   2. Den läser den SISTA tvådecimalstalet på etikettens rad. En faktura som trycker moms och
//      total i en tabell där beloppet hamnar på nästa rad hittas inte. Fail-closed (FB-03):
//      hellre ovittnesbar än fel tal.
//   3. Den vet inte vilken av (a) och (b) som gäller, och påstår det aldrig.

/** Utfallen. `glapp` är det enda som bär ett påstående. */
export const BALANS = Object.freeze({
  STAMMER:     'stammer',      // radsumma + tryckt moms = tryckt total, inom öresavrundning
  GLAPP:       'glapp',        // skillnaden är större än avrundningen — något saknar täckning
  OVITTNESBAR: 'ovittnesbar',  // momsbelopp eller total gick inte att läsa ur pappret
});

// Öresavrundning är hela felrymden när alla tre talen är TRYCKTA: momsraden är avrundad till öre
// (≤ 0,005 kr) och totalen likaså (≤ 0,005 kr). Två öre är alltså rundligt tilltaget och ryms
// långt under varje verkligt glapp. Ett FAST belopp, aldrig en procentsats — det var hela felet.
export const ORESTOLERANS = 0.02;

/** Sista talet med exakt två decimaler på en rad. «Moms (25%): 1 665,73» → 1665.73 */
function sistaBeloppet(rad) {
  const träffar = [...String(rad).matchAll(/\d[\d\s  ]*[.,]\d{2}(?!\d)/g)];
  if (!träffar.length) return null;
  const rått = träffar[träffar.length - 1][0];
  const n = Number(rått.replace(/[\s  ]/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

/**
 * Läser fakturans EGNA tryckta momsbelopp och slutsumma ur textlagret.
 * Ingen modell, ingen härledning — bara tecknen som står i filen.
 *
 * @param {string|null} dokumenttext
 * @returns {{ momsbelopp: number|null, total: number|null }}
 */
export function lasTrycktaSummor(dokumenttext) {
  const text = typeof dokumenttext === 'string' ? dokumenttext : '';
  if (!text.trim()) return { momsbelopp: null, total: null };

  let momsbelopp = null;
  let total = null;
  for (const rad of text.split(/\r?\n/)) {
    // «Moms», «Mervärdesskatt», «VAT» — men ALDRIG en rad som också bär «exkl» eller «netto»,
    // för då är talet momsBASEN och inte momsen. Att förväxla dem hade gett ett glapp på hela
    // momsbeloppet, alltså ett falsklarm på varje faktura.
    if (momsbelopp == null && /\b(?:moms|mervärdesskatt|vat)\b/i.test(rad)
        && !/\b(?:exkl|netto|underlag|bas)\b/i.test(rad)) {
      momsbelopp = sistaBeloppet(rad);
    }
    if (total == null && /\b(?:att\s+betala|totalt?\s+att\s+betala|summa\s+att\s+betala|amount\s+due|total\s+due)\b/i.test(rad)) {
      total = sistaBeloppet(rad);
    }
  }
  return { momsbelopp, total };
}

/**
 * Dömer fakturans inre konsistens: går de rader vi läste, plus fakturans egen tryckta moms,
 * ihop med fakturans egen tryckta slutsumma?
 *
 * @param {{ radsumma: number|null, dokumenttext: string|null }} p
 * @returns {{ utfall: string, glapp: number|null, momsbelopp: number|null, total: number|null, skal: string }}
 */
export function bedomFakturabalans({ radsumma, dokumenttext } = {}) {
  const { momsbelopp, total } = lasTrycktaSummor(dokumenttext);
  const summa = Number(radsumma);

  if (!Number.isFinite(summa) || summa <= 0) {
    return { utfall: BALANS.OVITTNESBAR, glapp: null, momsbelopp, total,
      skal: 'ingen radsumma att pröva' };
  }
  if (momsbelopp == null || total == null) {
    return { utfall: BALANS.OVITTNESBAR, glapp: null, momsbelopp, total,
      skal: 'fakturans egna momsbelopp och slutsumma gick inte att läsa ur pappret' };
  }

  const glapp = +(total - summa - momsbelopp).toFixed(2);
  if (Math.abs(glapp) <= ORESTOLERANS) {
    return { utfall: BALANS.STAMMER, glapp, momsbelopp, total,
      skal: 'raderna plus fakturans egen moms ger fakturans egen slutsumma' };
  }
  return {
    utfall: BALANS.GLAPP, glapp, momsbelopp, total,
    // Två möjliga orsaker, och modulen vet inte vilken. Att gissa vore reservkortsfelet.
    skal: `${Math.abs(glapp).toFixed(2).replace('.', ',')} kr `
      + `${glapp > 0 ? 'saknar täckning i raderna' : 'mer i raderna än fakturan begär'} — `
      + 'antingen går fakturan inte ihop, eller så läste vi inte alla rader',
  };
}
