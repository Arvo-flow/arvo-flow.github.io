// lib/verifiers/registry.mjs — fabrikens register över verifierade priskällor.
// EN sanning för "vilka källor vaktas och hur". Runner (scripts/verify.mjs) och workflow
// (.github/workflows/verify-sources.yml) drivs härifrån. Migrering pågår: bespoke-vakter
// flyttas in en i taget; varje ny verifierad källa = en modul + en rad här + ett test.
import m365 from './m365.mjs';

export const VERIFIERS = [
  m365,
];

export function getVerifier(id) {
  return VERIFIERS.find((v) => v.id === id) ?? null;
}

export function allVerifierIds() {
  return VERIFIERS.map((v) => v.id);
}
