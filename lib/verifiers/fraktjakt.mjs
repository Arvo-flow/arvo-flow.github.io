// lib/verifiers/fraktjakt.mjs — driftvakt för Fraktjakts öppna multi-carrier-API.
// Plain fetch (needsBrowser:false). Utan nyckel: skipped (väntar). Med nyckel: live sanity
// — bekräftar att API:t svarar med ≥1 prissatt fraktalternativ inom rimligt band, och
// fångar representativa priser (Sthlm→Gbg, 5 kg) som underlag för ett verifierat frakt-ankare.
import { fraktjaktQuote, hasFraktjaktCreds } from '../fraktjakt.js';
import { presenceCheck } from './core.mjs';

const REPRESENTATIVE = { fromZip: '11122', toZip: '41103', weightKg: 5, valueSek: 1000 };
const BAND = { min: 20, max: 5000 }; // rimligt paketpris-band (kr) för en 5 kg inrikesförsändelse

export default {
  id: 'fraktjakt',
  category: 'transport-frakt',
  label: 'Fraktjakt multi-carrier quote (öppet API)',
  needsBrowser: false,
  schedule: '0 8 * * 1',
  async run() {
    if (!hasFraktjaktCreds()) {
      return { skipped: true, notes: ['FRAKTJAKT_CONSIGNOR_ID/KEY saknas — vakten tänds automatiskt när nyckeln lagts in som secret'] };
    }
    let res;
    try { res = await fraktjaktQuote(REPRESENTATIVE); }
    catch (e) { return { checks: [], notes: [`Fraktjakt oåtkomlig: ${e.message}`], fatal: true }; }

    if (res.errorMessage) return { checks: [], notes: [`API-fel: ${res.errorMessage}`], fatal: true };

    const withPrice = (res.products ?? []).filter((p) => p.price > 0);
    const checks = [presenceCheck(`API svarar med fraktalternativ`, withPrice.length >= 1, `${withPrice.length} alternativ`)];

    if (withPrice.length) {
      const cheapest = Math.min(...withPrice.map((p) => p.price));
      checks.push({
        name: `billigaste alternativ inom rimligt band (${BAND.min}–${BAND.max} kr)`,
        expected: `${BAND.min}–${BAND.max} kr`,
        actual: `${cheapest} kr`,
        ok: cheapest >= BAND.min && cheapest <= BAND.max,
      });
    }

    const notes = [
      `representativ: ${REPRESENTATIVE.fromZip}→${REPRESENTATIVE.toZip}, ${REPRESENTATIVE.weightKg} kg`,
      ...withPrice.slice(0, 6).map((p) => `${p.name}: ${p.price} kr`),
    ];
    return { checks, notes };
  },
};
