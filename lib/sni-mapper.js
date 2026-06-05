// lib/sni-mapper.js
// Maps SNI 2007 division codes (first 2 digits) to Arvo industry profiles.
// Conservative by design: only high-confidence mappings. Unknown SNI → fallback.
// Source: SCB SNI 2007 (https://www.scb.se/dokumentation/klassifikationer-och-standarder/sni/)

const SNI_MAP = {
  // ── Tillverkning ──────────────────────────────────────────────────────────────
  10: { label: 'Livsmedelsframställning',         segment: 'tillverkning', confidence: 0.90 },
  11: { label: 'Dryckesindustri',                  segment: 'tillverkning', confidence: 0.90 },
  13: { label: 'Textilindustri',                   segment: 'tillverkning', confidence: 0.90 },
  14: { label: 'Konfektionsindustri',              segment: 'tillverkning', confidence: 0.90 },
  16: { label: 'Trävaruindustri',                  segment: 'tillverkning', confidence: 0.90 },
  17: { label: 'Pappersindustri',                  segment: 'tillverkning', confidence: 0.90 },
  20: { label: 'Kemikalieindustri',                segment: 'tillverkning', confidence: 0.90 },
  22: { label: 'Gummi- & plasttillverkning',       segment: 'tillverkning', confidence: 0.90 },
  23: { label: 'Mineralvarutillverkning',          segment: 'tillverkning', confidence: 0.90 },
  24: { label: 'Metallindustri',                   segment: 'tillverkning', confidence: 0.95 },
  25: { label: 'Metallvarutillverkning',           segment: 'tillverkning', confidence: 0.95 },
  26: { label: 'Elektronikindustri',               segment: 'tillverkning', confidence: 0.90 },
  27: { label: 'Elindustri',                       segment: 'tillverkning', confidence: 0.90 },
  28: { label: 'Maskintillverkning',               segment: 'tillverkning', confidence: 0.95 },
  29: { label: 'Fordonsindustri',                  segment: 'tillverkning', confidence: 0.90 },
  31: { label: 'Möbeltillverkning',                segment: 'tillverkning', confidence: 0.88 },
  33: { label: 'Reparation & installation',        segment: 'tillverkning', confidence: 0.85 },

  // ── Bygg & anläggning ─────────────────────────────────────────────────────────
  41: { label: 'Husbyggnad',                       segment: 'hantverkare',  confidence: 0.95 },
  42: { label: 'Anläggningsarbete',                segment: 'hantverkare',  confidence: 0.95 },
  43: { label: 'Specialiserad byggverksamhet',     segment: 'hantverkare',  confidence: 0.95 },

  // ── Handel ───────────────────────────────────────────────────────────────────
  45: { label: 'Handel med motorfordon',           segment: 'ehandel',      confidence: 0.75 },
  46: { label: 'Partihandel',                      segment: 'ehandel',      confidence: 0.82 },
  47: { label: 'Detaljhandel',                     segment: 'ehandel',      confidence: 0.82 },

  // ── Transport & logistik ─────────────────────────────────────────────────────
  49: { label: 'Landtransport',                    segment: 'hantverkare',  confidence: 0.95 },
  50: { label: 'Sjöfart',                          segment: 'hantverkare',  confidence: 0.80 },
  52: { label: 'Magasinering & transport',         segment: 'hantverkare',  confidence: 0.90 },
  53: { label: 'Post & bud',                       segment: 'hantverkare',  confidence: 0.90 },

  // ── Hotell & restaurang ───────────────────────────────────────────────────────
  55: { label: 'Hotell',                           segment: 'byraer',       confidence: 0.78 },
  56: { label: 'Restaurang & catering',            segment: 'byraer',       confidence: 0.72 },

  // ── Informations- & kommunikationsverksamhet ──────────────────────────────────
  58: { label: 'Förlagsverksamhet',                segment: 'byraer',       confidence: 0.85 },
  59: { label: 'Film- & TV-produktion',            segment: 'byraer',       confidence: 0.85 },
  60: { label: 'Radio & TV',                       segment: 'byraer',       confidence: 0.83 },
  61: { label: 'Telekommunikation',                segment: 'byraer',       confidence: 0.78 },
  62: { label: 'IT & mjukvaruutveckling',          segment: 'byraer',       confidence: 0.95 },
  63: { label: 'IT-tjänster & informationstjänster', segment: 'byraer',     confidence: 0.95 },

  // ── Finans & försäkring ────────────────────────────────────────────────────────
  64: { label: 'Finansiella tjänster',             segment: 'byraer',       confidence: 0.80 },
  65: { label: 'Försäkring',                       segment: 'byraer',       confidence: 0.74 },
  66: { label: 'Stöd till finans',                 segment: 'byraer',       confidence: 0.78 },

  // ── Fastighet ─────────────────────────────────────────────────────────────────
  68: { label: 'Fastighetsförvaltning',            segment: 'byraer',       confidence: 0.74 },

  // ── Konsultverksamhet & teknik ────────────────────────────────────────────────
  69: { label: 'Juridik & redovisning',            segment: 'byraer',       confidence: 0.90 },
  70: { label: 'Konsultverksamhet',                segment: 'byraer',       confidence: 0.90 },
  71: { label: 'Arkitektur & teknisk rådgivning',  segment: 'byraer',       confidence: 0.90 },
  72: { label: 'Forskning & utveckling',           segment: 'byraer',       confidence: 0.84 },
  73: { label: 'Reklam & marknadsföring',          segment: 'byraer',       confidence: 0.90 },
  74: { label: 'Annan konsultverksamhet',          segment: 'byraer',       confidence: 0.80 },

  // ── Administration & service ──────────────────────────────────────────────────
  77: { label: 'Uthyrning & leasing',              segment: 'byraer',       confidence: 0.74 },
  78: { label: 'Bemanningsföretag',                segment: 'byraer',       confidence: 0.80 },
  80: { label: 'Säkerhetstjänster',                segment: 'hantverkare',  confidence: 0.80 },
  81: { label: 'Fastighetsservice',                segment: 'hantverkare',  confidence: 0.85 },
  82: { label: 'Administrativa tjänster',          segment: 'byraer',       confidence: 0.80 },

  // ── Utbildning ────────────────────────────────────────────────────────────────
  85: { label: 'Utbildning',                       segment: 'byraer',       confidence: 0.78 },

  // ── Vård & omsorg ─────────────────────────────────────────────────────────────
  86: { label: 'Hälso- & sjukvård',                segment: 'byraer',       confidence: 0.85 },
  87: { label: 'Boende & omsorg',                  segment: 'byraer',       confidence: 0.80 },
  88: { label: 'Sociala insatser',                 segment: 'byraer',       confidence: 0.78 },

  // ── Kultur, sport & fritid ────────────────────────────────────────────────────
  90: { label: 'Kulturverksamhet',                 segment: 'byraer',       confidence: 0.70 },
  93: { label: 'Sport & fritid',                   segment: 'byraer',       confidence: 0.74 },

  // ── Reparation & personlig service ───────────────────────────────────────────
  95: { label: 'Rep av datorer & elektronik',      segment: 'hantverkare',  confidence: 0.85 },
  96: { label: 'Personlig service',                segment: 'hantverkare',  confidence: 0.72 },
};

const FALLBACK = { label: 'Övrig verksamhet', segment: 'byraer', confidence: 0.50 };

/**
 * Maps a full SNI code (5 digits) or 2-digit division to an Arvo industry profile.
 * Returns { label, segment, confidence }.
 * @param {string|number} sniCode
 */
export function mapSni(sniCode) {
  const division = parseInt(String(sniCode).slice(0, 2), 10);
  if (isNaN(division)) return FALLBACK;
  return SNI_MAP[division] ?? FALLBACK;
}

export default SNI_MAP;
