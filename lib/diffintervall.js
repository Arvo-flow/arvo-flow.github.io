// lib/diffintervall.js — VILKEN DIFF LÄSER VAKTEN? Lokalt den stageade, i CI PR:ens intervall.
//
// ══ VARFÖR (2026-10-10) ═════════════════════════════════════════════════════════════════════
// Hemlighetsvakten och påståendevakten läste `git diff --cached`. I en Actions-körning är ingenting
// stageat, så båda hade svarat grönt utan att ha läst en rad — mätt på main samma dag:
// «✓ Hemlighetsvakten — 0 stageade fil(er) rena». Ett grönt som betyder «jag tittade inte».
//
// I CI anger workflowen basen (`ARVO_DIFF_BAS`, PR:ens bas-sha eller pushens `before`) och vakten
// läser `<bas>...HEAD`. Saknas basen när `CI=true` kastar modulen i stället för att falla tillbaka
// på den stageade diffen — den reserven är exakt den tomhet som skulle bli grön. GG-07.
//
// FÅNGAR: en CI-körning utan bas, en bas som inte är en sha, en nollbas (`0000…`, en ny gren).
// BLIND: att basen är RÄTT bas. En workflow som skickar fel sha får en diff över fel intervall,
//   och vakten kan inte se det. Basuttrycket står på ett ställe, `.github/workflows/grinden.yml`.

const SHA = /^[0-9a-f]{7,40}$/;

/**
 * @param {Record<string, string|undefined>} env
 * @returns {{ lage: 'stageat', args: string[] } | { lage: 'intervall', bas: string, args: string[] }}
 */
export function diffIntervall(env = process.env) {
  const bas = (env.ARVO_DIFF_BAS ?? '').trim();
  if (!bas) {
    if (env.CI === 'true') throw new Error('ARVO_DIFF_BAS saknas i CI — den stageade diffen är tom där, och ett tomt svar vore ett grönt som inte läst något');
    return { lage: 'stageat', args: ['--cached'] };
  }
  return { lage: 'intervall', bas: kravBas(bas), args: [`${bas}...HEAD`] };
}

/** Basen för de vakter som bara finns i CI (commitkravet per commit, andra blicken). Kastar utan bas. */
export function kravBas(bas) {
  const b = String(bas ?? '').trim();
  if (!SHA.test(b)) throw new Error(`ogiltig bas «${b.slice(0, 50)}» — en sha krävs`);
  if (/^0+$/.test(b)) throw new Error('nollbasen (en ny gren) har inget intervall att läsa');
  return b;
}
