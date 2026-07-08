// lib/deadline-reminder.js — deadline-vaktens beslutslogik (ren, testlåst).
//
// Regel 9-fyndet 2026-07-08: reminder-cronen mejlade 60/30 dagar före PERIODSLUTET —
// men för rullande avtal (Bahnhof 3+3) stänger uppsägningsfönstret långt tidigare.
// Deadline-vakten påminner mot SISTA UPPSÄGNINGSDAGEN: 30 och 7 dagar före.
//
// Rullande avtal får NYA påminnelser varje period: markören bär deadline-datumet,
// och när klockan rullat till nästa period (nytt deadline-datum) nollställs den.
// Catch-up: laddas avtalet upp med 20 dagar kvar går 30-mejlet direkt; med ≤7 kvar
// går endast 7-mejlet (aldrig två mejl samma dag).

import { buildAvtalView } from './contract-intel.js';

/**
 * @param {{ terms: object, marker: {deadline?: string, sent30?: string, sent7?: string}|null, today?: Date }} p
 * @returns {{ send30: boolean, send7: boolean, marker: object|null, view: object|null }}
 */
export function deadlineReminderDecision({ terms, marker = null, today = new Date() }) {
  const view = buildAvtalView(terms ?? {}, { today });
  if (!view || view.clock.status !== 'window-open' || !view.clock.deadline) {
    return { send30: false, send7: false, marker, view: view ?? null };
  }

  const d = view.clock.daysToDeadline;
  // Ny period? Deadline-datumet har rullat → färsk markör (rullande avtal påminns per period).
  const m = (marker && marker.deadline === view.clock.deadline)
    ? { ...marker }
    : { deadline: view.clock.deadline };

  const send7  = d <= 7 && d >= 0 && !m.sent7;
  const send30 = d <= 30 && d > 7 && !m.sent30;

  if (send30) m.sent30 = today.toISOString();
  if (send7) { m.sent7 = today.toISOString(); m.sent30 = m.sent30 ?? today.toISOString(); }

  return { send30, send7, marker: m, view };
}
