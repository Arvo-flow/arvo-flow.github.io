// lib/verifiers/registry.mjs — fabrikens register över verifierade priskällor.
// EN sanning för "vilka källor vaktas och hur". Runner (scripts/verify.mjs) och workflow
// (.github/workflows/verify-sources.yml) drivs härifrån. Ny verifierad källa (t.ex. fordon,
// logistik, mjukvara) = en modul i denna mapp + en rad här + ett test. INGA handsmidda skript.
import m365 from './m365.mjs';
import tele2Mobil from './tele2-mobil.mjs';
import eurostatEl from './eurostat-el.mjs';
import kortterminal from './kortterminal.mjs';
import tele2Bredband from './tele2-bredband.mjs';
import fortnox from './fortnox.mjs';
import spiris from './spiris.mjs';
import googleWorkspace from './google-workspace.mjs';
import adobe from './adobe.mjs';

export const VERIFIERS = [
  m365,
  tele2Mobil,
  eurostatEl,
  kortterminal,
  tele2Bredband,
  fortnox,
  spiris,
  googleWorkspace,
  adobe,
];

export function getVerifier(id) {
  return VERIFIERS.find((v) => v.id === id) ?? null;
}

export function allVerifierIds() {
  return VERIFIERS.map((v) => v.id);
}
