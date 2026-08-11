// lib/sondkontrakt.js — SONDENS KONTRAKT: ingen mätning får läsas utan sin blindfläck.
//
// VARFÖR (2026-08-10). Jag skrev lib/vaktkontrakt.js, som kräver att varje vakt deklarerar vad
// den fångar och vad den är blind för — och byggde sedan tre sonder utan att tillämpa kontraktet
// på en enda av dem. Regeln kodifierades och undantogs inom timmen. Priset kom direkt: en sond
// rapporterade "0 villkorssidor hittade" när den menade "jag kunde inte se sidan", och jag var
// nära att stryka fyra leverantörer ur boken på falsk grund.
//
// Men en sond behöver något VASSARE än en vakt. En vakts deklaration läses av den som ändrar
// koden. En sonds utdata läses av den som ska FATTA ETT BESLUT — ofta veckor senare, ofta ur en
// ops-fil, ofta utan att öppna skriptet. Därför räcker det inte att blindfläcken står i källan:
// den ska stå ÖVERST I MÄTNINGEN, varje gång. Ingen ska kunna läsa siffrorna utan att först ha
// läst vad de inte kan visa.
//
// Kontraktet är dessutom TVINGANDE i drift, inte bara i test: saknas deklarationen kastar
// sonden innan den mätt något. En omätt sond är ofarlig; en omärkt mätning är det inte.

const MIN_TECKEN = 40;

/**
 * Deklarerar sondens räckvidd och skriver den överst i utdatan. Kastar hellre än att mäta.
 * @param {{ namn: string, fangar: string, blind: string }} d
 */
export function deklarera(d) {
  const brister = [];
  if (!d?.namn) brister.push('namn saknas');
  for (const falt of ['fangar', 'blind']) {
    const v = typeof d?.[falt] === 'string' ? d[falt].trim() : '';
    if (!v) brister.push(`'${falt}' saknas — sonden får inte mäta utan att ha svarat`);
    else if (v.length < MIN_TECKEN) brister.push(`'${falt}' är för kort (${v.length} tecken) för att vara en inventering`);
  }
  if (/^\s*[-—]?\s*(inget|inga|ingenting|ingen)\b/i.test(String(d?.blind ?? ''))) {
    brister.push("'blind' påstår att sonden ser allt. Varje mätning har en gräns — påståendet är felet.");
  }
  if (brister.length) throw new Error(`SONDKONTRAKTET BRUTET (${d?.namn ?? 'namnlös sond'}): ${brister.join(' · ')}`);

  console.log('╔═══════════════════════════════════════════════════════════════════════════════');
  console.log(`║ SOND: ${d.namn}`);
  console.log(`║ FÅNGAR: ${d.fangar}`);
  console.log(`║ BLIND FÖR: ${d.blind}`);
  console.log('║ Läs aldrig siffrorna nedan utan raden ovanför. En mätning utan sin gräns är');
  console.log('║ ett påstående som låtsas vara ett faktum.');
  console.log('╚═══════════════════════════════════════════════════════════════════════════════');
  return d;
}
