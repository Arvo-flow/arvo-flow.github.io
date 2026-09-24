// src/lib/loften.js — SPEGEL av löftestexterna i lib/kundmeningar.js (LOFTEN, ANSVARSGRANS, UNDERLAGET).
// Frontend importerar aldrig backendens ESM-moduler direkt; KM-07 kräver att texterna är identiska,
// så ett löfte eller en ansvarsgräns kan inte formuleras på ett sätt i mejlet och ett annat på sidan.
export const LOFTEN_TEXT = {
  bytesunderlag: 'Vi tar fram ett besparingsunderlag: jämförelsen mot verifierat listpris och färdiga utkast till uppsägning och nyteckning, som ni själva skickar till leverantörerna.',
  personligtSvar: 'En av grundarna hör av sig till er.',
};

export const ANSVARSGRANS_TEXT = {
  inteOmbud: 'Arvo säger inte upp, tecknar eller ändrar några avtal åt er, och beställningen ger oss ingen fullmakt att göra det.',
  niAgerar: 'Uppsägning och nyteckning gör ni själva, direkt med leverantörerna — när och om ni vill.',
  inteAvtal: 'Underlaget är en analys med färdiga utkast, inte ett avtal. Inget händer med era avtal förrän ni själva agerar, och ångrar ni beställningen behöver ni inte göra något.',
  arvode: 'Genomför ni bytet utgår ett arvode om 20 % av första årets besparing, som en engångsavgift tre månader efter att det nya avtalet aktiverats. Genomför ni det inte kostar underlaget ingenting.',
};

export const UNDERLAGET_TEXT = {
  cta: 'Beställ besparingsunderlaget',
  skicka: 'Beställ underlaget',
  mottagen: 'Vi har tagit emot er beställning av ett besparingsunderlag.',
  mottagenAvveckling: 'Vi har tagit emot er beställning av ett underlag för avvecklingen.',
};
