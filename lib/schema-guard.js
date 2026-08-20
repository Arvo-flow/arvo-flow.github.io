// lib/schema-guard.js — Schemakravet (B-spåret, B2): stenhård gränsvakt på AI-utfall.
//
// Alla AI-steg (extract, categorize, recommend, extract-contract) tvingar tool_use
// med ett input_schema — men schemat VÄGLEDER bara modellen. Utan denna vakt flödar
// toolUse.input rått in i den deterministiska kedjan: ett belopp som sträng, ett
// enum-brott, ett saknat obligatoriskt fält eller ett NaN upptäcks först nedströms
// — eller aldrig. Prompt-/schemaregler är råd; lås är kod (attribueringslåsets läxa).
//
// Vakten dömer payloaden DETERMINISTISKT mot agentens EGNA input_schema-objekt
// (regel 1: EN sanning — aldrig en schema-kopia). Samma mönster som balanskravet:
//   SKUGGA (default): brott loggas `[schemakrav]`, pipelinen fortsätter.
//   ARMERAD (env SCHEMAKRAV_ENFORCE=1): guardToolPayload returnerar ok:false och
//   anropande agent kastar sitt eget feltyp — ett trasigt AI-utfall når aldrig
//   den räknande kedjan.
// Vaktens egen krasch är alltid fail-open (varna + släpp igenom) — vakten får
// aldrig själv bli produktionsrisken.
//
// Delmängden speglar exakt vad våra scheman använder: type (inkl. union-arrayer
// med 'null'), enum, required, properties, items, minimum/maximum. Odeklarerade
// fält flaggas ('okänt_fält') — modellpåhittade fält är drift vi vill se i loggen.

const MAX_DEPTH = 12;

function typeNameOf(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value; // 'string' | 'number' | 'boolean' | 'object' | 'undefined'
}

function matchesType(declared, value) {
  switch (declared) {
    case 'null':    return value === null;
    case 'string':  return typeof value === 'string';
    case 'boolean': return typeof value === 'boolean';
    case 'integer': return typeof value === 'number' && Number.isInteger(value);
    case 'number':  return typeof value === 'number' && Number.isFinite(value);
    case 'array':   return Array.isArray(value);
    case 'object':  return value !== null && typeof value === 'object' && !Array.isArray(value);
    // ── OKÄND TYP FÅR INTE BETYDA "ALLT DUGER" (obduktion 2026-08-20) ────────────────────────
    // Raden returnerade `true`: en stavfelad typdeklaration ('strng') släppte igenom VARJE värde,
    // och motiveringen var att lintToolSchema fångar den. Men linten är en ANNAN körning — den
    // som deployar ett schema med ett stavfel får en grind som tyst godkänner allt.
    // En kontroll som inte förstår sin egen deklaration har inte kontrollerat något.
    default:        return false;
  }
}

/**
 * Döm ett värde mot ett (delmängds-)JSON-schema. Ren och deterministisk.
 * @returns {Array<{path: string, reason: string}>} violations — tom = giltigt
 */
export function judgeSchema(schema, value, path = '$', depth = 0) {
  const violations = [];
  if (!schema || typeof schema !== 'object') return violations;
  if (depth > MAX_DEPTH) return violations;

  // type — sträng eller union-array (t.ex. ['integer','null'])
  if (schema.type != null) {
    const declared = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!declared.some((t) => matchesType(t, value))) {
      violations.push({
        path,
        reason: `fel_typ: förväntade ${declared.join('|')}, fick ${
          typeof value === 'number' && !Number.isFinite(value) ? 'icke-finit number' : typeNameOf(value)
        }`,
      });
      return violations; // fel typ — djupare kontroller vore brus
    }
  }

  // enum — strikt likhet (hanterar strängar, tal och null-medlemmar)
  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) {
    violations.push({ path, reason: `enum_brott: "${String(value)}" ∉ [${schema.enum.map(String).join(', ')}]` });
  }

  // minimum/maximum — endast på tal
  if (typeof value === 'number' && Number.isFinite(value)) {
    if (typeof schema.minimum === 'number' && value < schema.minimum) {
      violations.push({ path, reason: `under_minimum: ${value} < ${schema.minimum}` });
    }
    if (typeof schema.maximum === 'number' && value > schema.maximum) {
      violations.push({ path, reason: `över_maximum: ${value} > ${schema.maximum}` });
    }
  }

  // object — required + declared properties + okända fält
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    const props = schema.properties ?? null;
    if (Array.isArray(schema.required)) {
      for (const key of schema.required) {
        if (value[key] === undefined) violations.push({ path: `${path}.${key}`, reason: 'saknat_obligatoriskt_fält' });
      }
    }
    if (props) {
      for (const [key, sub] of Object.entries(props)) {
        if (value[key] !== undefined) violations.push(...judgeSchema(sub, value[key], `${path}.${key}`, depth + 1));
      }
      for (const key of Object.keys(value)) {
        if (!(key in props)) violations.push({ path: `${path}.${key}`, reason: 'okänt_fält' });
      }
    }
  }

  // array — items
  if (Array.isArray(value) && schema.items) {
    value.forEach((item, i) => violations.push(...judgeSchema(schema.items, item, `${path}[${i}]`, depth + 1)));
  }

  return violations;
}

/**
 * Linta själva verktygsschemat — vakten är värdelös om schemat är trasigt.
 * Kontrollerar: name finns, input_schema är objekt, varje required-nyckel finns
 * i properties, enums är icke-tomma arrayer, typdeklarationer är kända.
 * @returns {string[]} problem — tom = friskt schema
 */
export function lintToolSchema(tool) {
  const problems = [];
  if (!tool?.name) problems.push('verktyget saknar name');
  const walk = (schema, path) => {
    if (!schema || typeof schema !== 'object') return;
    if (schema.type != null) {
      const declared = Array.isArray(schema.type) ? schema.type : [schema.type];
      for (const t of declared) {
        if (!['null', 'string', 'boolean', 'integer', 'number', 'array', 'object'].includes(t)) {
          problems.push(`${path}: okänd typdeklaration "${t}"`);
        }
      }
    }
    if (schema.enum != null && (!Array.isArray(schema.enum) || schema.enum.length === 0)) {
      problems.push(`${path}: enum är inte en icke-tom array`);
    }
    if (Array.isArray(schema.required)) {
      for (const key of schema.required) {
        if (!schema.properties || !(key in schema.properties)) {
          problems.push(`${path}: required-fältet "${key}" saknas i properties`);
        }
      }
    }
    if (schema.properties) for (const [k, sub] of Object.entries(schema.properties)) walk(sub, `${path}.${k}`);
    if (schema.items) walk(schema.items, `${path}[]`);
  };
  if (!tool?.input_schema || typeof tool.input_schema !== 'object') {
    problems.push('input_schema saknas eller är inte ett objekt');
  } else {
    walk(tool.input_schema, tool?.name ?? '$');
  }
  return problems;
}

/**
 * Gränsvakten agenterna anropar direkt efter tool_use-blocket hittats.
 * SKUGGA: loggar och släpper igenom. ARMERAD (SCHEMAKRAV_ENFORCE=1): ok:false
 * vid brott — anroparen kastar sitt eget feltyp.
 *
 * @param {{ agent: string, tool: object, payload: unknown, enforce?: boolean }} p
 * @returns {{ ok: boolean, violations: Array<{path: string, reason: string}> }}
 */
export function guardToolPayload({ agent, tool, payload, enforce }) {
  try {
    const armed = enforce ?? process.env.SCHEMAKRAV_ENFORCE === '1';
    const violations = judgeSchema(tool.input_schema, payload);
    if (violations.length > 0) {
      const head = violations.slice(0, 5).map((v) => `${v.path} → ${v.reason}`).join(' · ');
      console.warn(
        `[schemakrav] ${agent}/${tool.name}: ${violations.length} brott ` +
        `(${armed ? 'ARMERAD — avvisas' : 'SKUGGA — släpps igenom'}): ${head}` +
        (violations.length > 5 ? ` · … +${violations.length - 5}` : '')
      );
    }
    return { ok: !(armed && violations.length > 0), violations };
  } catch (err) {
    console.warn('[schemakrav] fail-open — vakten kraschade själv:', err.message);
    return { ok: true, violations: [] };
  }
}
