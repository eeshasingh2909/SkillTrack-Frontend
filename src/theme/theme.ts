import { createTheme } from '@mui/material/styles';

// ─── Palette ────────────────────────────────────────────────────────────────
// All purple/violet soft shades. Change here → changes everywhere in the app.

const COLORS = {
  primary:        '#7C3AED', // violet-600
  primaryLight:   '#A78BFA', // violet-400
  primaryDark:    '#5B21B6', // violet-800
  primaryGhost:   'rgba(124, 58, 237, 0.12)',

  secondary:      '#C084FC', // purple-400
  secondaryLight: '#E9D5FF', // purple-200
  secondaryDark:  '#9333EA', // purple-600

  background:     '#0F0A1E', // near-black with violet tint
  surface:        '#1A1033', // card / surface
  surfaceGlass:   'rgba(255, 255, 255, 0.08)', // glassmorphism base

  textPrimary:    '#F5F3FF', // almost white
  textSecondary:  '#C4B5FD', // soft violet-200
  textMuted:      '#7C6FA0', // muted violet-grey

  error:          '#F87171',
  success:        '#34D399',
  info:           '#60A5FA',
  warning:        '#FBBF24',

  border:         'rgba(167, 139, 250, 0.2)',
  borderFocus:    'rgba(124, 58, 237, 0.6)',
} as const;

// Export raw colors so non-MUI files (e.g. CSS-in-JS keyframes) can use them
export { COLORS };

// ─── Typography scale ───────────────────────────────────────────────────────
const FONT_FAMILY = "'Inter', 'Segoe UI', system-ui, sans-serif";

// ─── Theme ───────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main:  COLORS.primary,
      light: COLORS.primaryLight,
      dark:  COLORS.primaryDark,
    },
    secondary: {
      main:  COLORS.secondary,
      light: COLORS.secondaryLight,
      dark:  COLORS.secondaryDark,
    },
    background: {
      default: COLORS.background,
      paper:   COLORS.surface,
    },
    text: {
      primary:   COLORS.textPrimary,
      secondary: COLORS.textSecondary,
      disabled:  COLORS.textMuted,
    },
    error:   { main: COLORS.error },
    success: { main: COLORS.success },
    info:    { main: COLORS.info },
    warning: { main: COLORS.warning },
    divider: COLORS.border,
  },

  typography: {
    fontFamily: FONT_FAMILY,
    // Display / hero
    h1: { fontSize: '2.5rem',  fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontSize: '2rem',    fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.5rem',  fontWeight: 600 },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    h5: { fontSize: '1.1rem',  fontWeight: 600 },
    h6: { fontSize: '1rem',    fontWeight: 600 },
    // Body
    body1: { fontSize: '1rem',    lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    // Caption / label
    caption: { fontSize: '0.75rem', color: COLORS.textMuted },
    button:  { fontSize: '0.9rem',  fontWeight: 600, letterSpacing: '0.04em', textTransform: 'none' },
  },

  shape: {
    borderRadius: 12,
  },

  // ─── Component-level defaults ─────────────────────────────────────────────
  // Changing here affects every instance of that component across the whole app.
  components: {

    // ── TextField ────────────────────────────────────────────────────────────
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        size: 'medium',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(6px)',
            transition: 'background 0.2s, box-shadow 0.2s',
            '& fieldset': {
              borderColor: COLORS.border,
            },
            '&:hover fieldset': {
              borderColor: COLORS.primaryLight,
            },
            '&.Mui-focused fieldset': {
              borderColor: COLORS.primary,
              boxShadow: `0 0 0 3px ${COLORS.primaryGhost}`,
            },
          },
          '& .MuiInputLabel-root': {
            color: COLORS.textSecondary,
            fontSize: '1rem',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: COLORS.primaryLight,
          },
          '& .MuiInputBase-input': {
            color: COLORS.textPrimary,
          },
          '& .MuiInputAdornment-root': {
            color: COLORS.textMuted,
          },
        },
      },
    },

    // ── Button ───────────────────────────────────────────────────────────────
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'none',
          transition: 'all 0.25s ease',
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondaryDark} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${COLORS.primaryLight} 0%, ${COLORS.primary} 100%)`,
            boxShadow: `0 0 20px ${COLORS.primaryGhost}, 0 4px 15px rgba(0,0,0,0.3)`,
          },
          '&:disabled': {
            background: COLORS.textMuted,
            color: COLORS.background,
          },
        },
        outlinedPrimary: {
          border: `1.5px solid ${COLORS.primary}`,
          color: COLORS.primaryLight,
          '&:hover': {
            backgroundColor: COLORS.primaryGhost,
            borderColor: COLORS.primaryLight,
          },
        },
      },
    },

    // ── Card ─────────────────────────────────────────────────────────────────
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
        },
      },
    },

    // ── Paper ────────────────────────────────────────────────────────────────
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // disable MUI's default gradient overlay
        },
      },
    },

    // ── Snackbar / Alert (Toast) ──────────────────────────────────────────────
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 500,
        },
      },
    },

    // ── Chip ─────────────────────────────────────────────────────────────────
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
