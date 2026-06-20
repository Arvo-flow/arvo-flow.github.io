// src/lib/costCategories.js — EN sanning för kostnadskartan. Både testa-faktura ("Helhetsbilden":
// vilken av kategorierna fakturan var) och kontorets dörr ("börja här / via offert") läser HÄRIFRÅN,
// så de aldrig mer kan säga olika saker (regel 5: samma data, en röst, alla ytor).
//
// Åtta hinkar täcker ALLA backend-kategorier (cats[] → highlight i testa-faktura). mode = om vi kan
// ge en verifierad dom ('verdict') eller bara offert ('offert'). know = källtäckt verifierad referens
// (visas vid dörren). Försäkring är medvetet INTE en egen rubrik (2028/FI) — den ligger som en
// backend-kategori i 'Lön & HR' men skyltas aldrig som ett eget kort vid dörren (regel 9).
export const COST_CATEGORIES = [
  { key: 'mjukvara',  label: 'Programvara & licenser', short: 'Mjukvara', icon: 'spark',   mode: 'verdict',
    hint: 'Microsoft 365 · Adobe · Fortnox', know: 'verifierat listpris',
    cats: ['saas-productivity', 'saas-creative', 'saas-crm', 'saas-finance', 'saas-other', 'faktura-tjanst', 'managed-workplace'] },
  { key: 'telefoni',  label: 'Telefoni & bredband',    short: 'Telefoni', icon: 'phone',   mode: 'verdict',
    hint: 'Mobil · växel · bredband', know: 'verifierat marknadspris',
    cats: ['mobil', 'bredband', 'molnvaxel'] },
  { key: 'lon',       label: 'Lön & HR',               short: 'Lön',      icon: 'fortnox', mode: 'verdict',
    hint: 'Lönesystem · företagshälsa', know: 'verifierat golv',
    cats: ['loneadmin', 'foretagshalsovard', 'forsakring-foretag', 'forsakring-ansvar'] },
  { key: 'el',        label: 'El',                     short: 'El',       icon: 'bolt',    mode: 'verdict',
    hint: 'Företagsel', know: 'Nordpool-verifierat',
    cats: ['el'] },
  { key: 'itdrift',   label: 'IT-drift & hosting',     short: 'IT-drift', icon: 'wifi',    mode: 'offert',
    hint: 'Support · server · moln', know: null,
    cats: ['it-support', 'serverhosting'] },
  { key: 'skrivare',  label: 'Skrivare & print',       short: 'Skrivare', icon: 'file',    mode: 'offert',
    hint: 'Leasing · klickavtal', know: null,
    cats: ['skrivarleasing', 'utrustningsleasing'] },
  { key: 'fordon',    label: 'Fordon & frakt',         short: 'Fordon',   icon: 'truck',   mode: 'offert',
    hint: 'Leasing · transport', know: null,
    cats: ['leasing-bil', 'transport-frakt'] },
  { key: 'ovrigt',    label: 'Kontor & övrigt',        short: 'Kontor',   icon: 'shield',  mode: 'offert',
    hint: 'Förbrukning · larm · terminal', know: null,
    cats: ['kontorsmaterial', 'städ-rengöring', 'larm-bevakning', 'kortterminal', 'avfall-atervinning', 'bankavgifter'] },
];

/** Hinken en backend-kategori hör till (för highlight i testa-fakturas helhetsbild). */
export function bucketForCategory(category) {
  return COST_CATEGORIES.find((b) => b.cats.includes(category)) ?? null;
}
