// Stubbe för @neondatabase/serverless. Varje sats bokförs i __SQL. En INSERT i invoice_analyses och
// varje `UPDATE invoice_analyses SET kol = … WHERE id = …` byggs ihop till den lagrade raden
// (__RADER), så att rummet kan byggas ur exakt det som lagringen skickade. Läsningar svarar tomt:
// fallet har ingen historik.
function kolumnerIInsert(text) {
  const m = /INSERT INTO invoice_analyses\s*\(([^)]*)\)/i.exec(text);
  return m ? m[1].split(',').map((s) => s.trim()).filter(Boolean) : null;
}
function vardeAv(v, efter) {
  if (/^::jsonb/i.test(efter ?? '') && typeof v === 'string') { try { return JSON.parse(v); } catch { return v; } }
  return v;
}
export function neon() {
  const sql = async (strings, ...values) => {
    const text = Array.isArray(strings) ? strings.join('$') : String(strings);
    (globalThis.__SQL ??= []).push({ text, values });
    const rader = (globalThis.__RADER ??= new Map());
    const kol = Array.isArray(strings) ? kolumnerIInsert(strings[0]) : null;
    if (kol) {
      const id = rader.size + 1;
      const rad = { id, created_at: new Date().toISOString(), arkiverad_at: null };
      kol.forEach((k, i) => { rad[k] = vardeAv(values[i], strings[i + 1]); });
      rader.set(id, rad);
      return /RETURNING/i.test(text) ? [{ id }] : [];
    }
    if (Array.isArray(strings) && /^\s*UPDATE invoice_analyses SET/i.test(strings[0])) {
      const idIdx = values.length - 1;
      const rad = rader.get(values[idIdx]);
      if (rad && /WHERE id =\s*$/i.test(strings[idIdx])) {
        for (let i = 0; i < idIdx; i++) {
          const m = /(\w+)\s*=\s*$/.exec(strings[i]);
          if (m) rad[m[1]] = vardeAv(values[i], strings[i + 1]);
        }
      }
      return [];
    }
    // De lagrade raderna (tests/fakturakedjan/lagrade.mjs) svarar läsningarna ur en egen funktion.
    if (typeof globalThis.__SVARA === 'function') return globalThis.__SVARA(text, values) ?? [];
    return [];
  };
  sql.query = async (text, params) => { (globalThis.__SQL ??= []).push({ text, values: params ?? [] }); return []; };
  sql.transaction = async (fn) => (typeof fn === 'function' ? fn(sql) : []);
  return sql;
}
export default neon;
