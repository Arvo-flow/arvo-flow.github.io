// src/lib/ankarval.js — vilket ankarkort rummet visar (Marknadsankaret).
//
// Flyttad ur Portfolio (andra blicken på c1, C1-5): spärren låg i en useMemo och prövades bara som
// källtext. Flyttades den efter tilldelningen kom kortet tillbaka för mobil, och sviten förblev grön.
// Nu prövas valet genom att anropas (MS-06).
//
// En kategori som kräver bekräftad nivå (M365, och mobil sedan 2026-10-22) får inget ankarkort. Kortet
// ställde kundens pris mot medianen och kallade den «leverantörens eget listpris», men medianen är en
// annan produkt: Business Standard för en E3-kund, ett annat abonnemang för mobil. Fakta för raden står
// i dess underlag, utan avstånd.

/**
 * @param {Array<{ latest: { category?: string } }>} grupper  rummets leverantörsgrupper
 * @param {Record<string, object>} ankare  `branchAnchors` ur api/invoice-history
 * @returns {object|null}  ankaret för den kategori där kunden har mest kostnad, eller null
 */
export function valjAnkare(grupper = [], ankare = {}) {
  let best = null;
  for (const g of grupper) {
    const an = ankare?.[g?.latest?.category];
    if (!an || !(an.median > 0)) continue;
    if (an.kraverBekraftadNiva) continue;
    const material = an.customerCost ?? 0;
    if (!best || material > best._material) best = { ...an, _material: material };
  }
  return best;
}
