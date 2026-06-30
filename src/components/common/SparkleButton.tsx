import { keyframes } from '@mui/system';
import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { COLORS } from '../../theme/theme';

// ─── Keyframes ───────────────────────────────────────────────────────────────
// Shimmering light sweep that travels left → right on hover
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

// ─── Styled button ───────────────────────────────────────────────────────────
const StyledButton = styled(Button)(() => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  padding: '12px 24px',

  // Base gradient (from theme — keep in sync via COLORS)
  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondaryDark} 100%)`,
  color: '#fff',
  fontWeight: 700,
  fontSize: '1rem',
  letterSpacing: '0.06em',
  borderRadius: 10,
  transition: 'box-shadow 0.3s ease, transform 0.2s ease',

  // Shimmer pseudo-element, hidden at rest
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(
      105deg,
      transparent 40%,
      rgba(255,255,255,0.35) 50%,
      transparent 60%
    )`,
    backgroundSize: '200% 100%',
    backgroundPosition: '-200% center',
    opacity: 0,
    transition: 'opacity 0.2s',
  },

  '&:hover': {
    boxShadow: `0 0 28px ${COLORS.primaryGhost}, 0 0 8px ${COLORS.primaryLight}55, 0 6px 20px rgba(0,0,0,0.35)`,
    transform: 'translateY(-1px)',

    '&::before': {
      opacity: 1,
      animation: `${shimmer} 0.7s linear`,
    },
  },

  '&:active': {
    transform: 'translateY(0)',
  },

  '&:disabled': {
    background: COLORS.textMuted,
    color: COLORS.background,
    boxShadow: 'none',
    transform: 'none',
  },
}));

// ─── Props ───────────────────────────────────────────────────────────────────
interface SparkleButtonProps extends Omit<ButtonProps, 'variant'> {
  loading?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function SparkleButton({ loading = false, children, disabled, ...rest }: SparkleButtonProps) {
  return (
    <StyledButton
      variant="contained"
      disabled={disabled || loading}
      {...rest}
    >
      {loading
        ? <CircularProgress size={22} thickness={4} sx={{ color: '#fff' }} />
        : children}
    </StyledButton>
  );
}
