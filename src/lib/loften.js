// src/lib/loften.js — SPEGEL av löftestexterna i lib/kundmeningar.js (LOFTEN).
// Frontend importerar aldrig backendens ESM-moduler direkt; KM-07 kräver att texterna är identiska,
// så ett löfte kan inte formuleras på ett sätt i mejlet och ett annat på sidan.
export const LOFTEN_TEXT = {
  bytesunderlag: 'Vi förbereder bytet — uppsägning och nyteckning — och ni signerar själva innan något sägs upp eller tecknas.',
  personligtSvar: 'En av grundarna hör av sig till er.',
};
