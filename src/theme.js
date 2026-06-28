const theme = {
  color: {
    bg: '#F1F6F3',
    surface: '#FFFFFF',
    surfaceAlt: '#E5EFEA',
    surfaceSunken: '#D8E6E0',
    ink: '#0E1A17',
    inkSoft: '#1F2E2A',
    muted: '#3F4B47',         // bumped from #5C6E68 — ~7.8:1 on bg (was ~4.85:1)
    mutedSoft: '#5C6E68',     // bumped from #8A988F — ~5.0:1 on bg (was ~3.0:1, failed AA)
    border: '#D5E2DC',
    borderStrong: '#BACBC2',

    brand: '#1B7A6E',
    brandLight: '#4FBFB3',
    brandSoft: '#DCEEEA',
    brandInk: '#0E4F47',
    brandGradient: 'linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%)',
    brandGradientHover: 'linear-gradient(135deg, #4FC9BD 0%, #155F58 100%)',

    accent: '#4FBFB3',
    accentSoft: '#E0F1ED',

    success: '#1B7A6E',
    successSoft: '#DCEEEA',
    danger: '#9F3B22',
    dangerSoft: '#F4DAD0',
    warning: '#A8761A',
    warningSoft: '#F3E5C7',
  },

  // ── DOSSIER — det mörka premiumspråket (mall: src/pages/Prospect) ───────────
  // Används för intelligence-ytor: prospect, briefing, kontoret, analysresultat.
  // Regel 6 i CLAUDE.md: nya/ändrade styles konsumerar dessa tokens — aldrig nya hex.
  dossier: {
    bg: '#050B09',                    // sidbakgrund — nästan svart, grönstämd
    bgRaised: '#0B1612',              // band/kort på mörk botten (premie-bandet)
    surface: '#EDF3F0',               // ljus kontrastsektion (kostnadsanalysen)
    card: '#FFFFFF',                  // kort i ljus sektion

    teal: '#2BC4AC',                  // primär accent på mörkt (eyebrows, tal)
    tealBright: '#5DD6CA',            // glödpunkter, markörer, brand-mark
    tealDeep: '#178A7B',              // gradientslut
    signal: '#E0A23C',                // varm signal — "ett drag kvar" (lugnt, inte alarm-rött)

    // Text på mörk botten — kontrastkalibrerad för läsbarhet även i ljusa
    // kontorsmiljöer (mutedOnDark ~6.5:1, faintOnDark ~4.6:1 mot dossier.bg).
    inkOnDark: '#F4F9F7',
    mutedOnDark: 'rgba(236,244,241,0.80)',
    faintOnDark: 'rgba(228,238,234,0.62)',
    hairlineOnDark: 'rgba(255,255,255,0.12)',

    // Signaturer
    metallicText: 'linear-gradient(180deg, #FFFFFF 24%, #D9EFEA 58%, #9FD9CE 100%)',      // bolagsnamn à la keynote
    numberGradient: 'linear-gradient(135deg, #7BEADB 0%, #2BC4AC 52%, #179580 100%)',      // stora tal
    keyline: 'linear-gradient(90deg, transparent 0%, #2BC4AC 35%, #5DD6CA 50%, #2BC4AC 65%, transparent 100%)',
    aurora: `radial-gradient(ellipse 680px 400px at 50% 42%, rgba(43,196,172,0.15) 0%, transparent 62%),
      radial-gradient(ellipse 520px 300px at 30% 96%, rgba(27,110,102,0.14) 0%, transparent 70%),
      radial-gradient(ellipse 440px 260px at 72% 4%, rgba(93,214,202,0.06) 0%, transparent 70%)`,
    glow: '0 0 0 4px rgba(93,214,202,0.18), 0 0 18px rgba(93,214,202,0.55)',               // markörer
    ctaShadow: '0 18px 56px rgba(29,176,154,0.38), inset 0 1px 0 rgba(255,255,255,0.22)',
    ctaGradient: 'linear-gradient(140deg, #4ECDC4 0%, #1DB09A 52%, #178A7B 100%)',

    column: '580px',                  // dossier-kolumnen — ett memo är aldrig bredare än läsbart
  },

  font: {
    display: "'Playfair Display', Georgia, 'Times New Roman', serif",
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  },

  size: {
    radius: {
      sm: '6px',
      md: '12px',
      lg: '20px',
      xl: '28px',
      pill: '999px',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '24px',
      6: '32px',
      7: '48px',
      8: '64px',
      9: '96px',
      10: '128px',
    },
    container: '1180px',
    containerNarrow: '960px',
  },

  shadow: {
    xs: '0 1px 2px rgba(14, 26, 23, 0.04)',
    sm: '0 2px 8px rgba(14, 26, 23, 0.06)',
    md: '0 8px 24px rgba(14, 26, 23, 0.08)',
    lg: '0 24px 60px rgba(14, 26, 23, 0.12)',
    brand: '0 12px 32px rgba(27, 122, 110, 0.28)',
    inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
  },

  motion: {
    fast: '160ms cubic-bezier(0.2, 0, 0, 1)',
    base: '240ms cubic-bezier(0.2, 0, 0, 1)',
    slow: '420ms cubic-bezier(0.2, 0, 0, 1)',
    spring: '520ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  z: {
    base: 1,
    nav: 50,
    overlay: 80,
    modal: 100,
  },
};

export default theme;
