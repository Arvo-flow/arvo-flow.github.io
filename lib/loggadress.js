// lib/loggadress.js — en kunds e-postadress står aldrig i klartext i en logg.
//
// Loggarna i Actions är publika (publikt repo), och Vercels körlogg läses av fler än kunden valt.
// Formen är densamma som grundarens beviljande läser, `sha256:<hex av lower(trim(adress))>`, så en
// loggrad kan paras med en adress i `bevilja-premium` utan att adressen står någonstans (EL-01).
import { createHash } from 'node:crypto';
import { normaliseraEpost } from './premiumkrets.js';

/** @returns {string} `sha256:<64 hex>`, eller `(ingen adress)` när värdet inte är en adress */
export function loggAdress(adress) {
  const n = normaliseraEpost(adress);
  return n ? `sha256:${createHash('sha256').update(n).digest('hex')}` : '(ingen adress)';
}
