import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Link as RouterLink } from 'react-router-dom';

// ─── Shared auth form styles ──────────────────────────────────────────────────
// Used by both LoginForm and RegisterForm.
// All visual values come from the MUI theme — change theme.ts to affect both.

// Glassmorphism card container
export const GlassCard = styled(Box)(({ theme }) => ({
  width: 420,
  background: 'rgba(255, 255, 255, 0.07)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4.5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.45)',

  [theme.breakpoints.down('sm')]: {
    width: '90vw',
    padding: theme.spacing(3),
  },
})) as typeof Box;

// Card heading
export const CardTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  textAlign: 'center',
}));

// Card sub-heading / descriptor
export const CardSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: 'center',
  marginTop: theme.spacing(0.5),
}));

// Inline error / success banner
export const FormAlert = styled(Alert)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.85rem',
}));

// Footer line ("Already have an account?" / "Don't have an account?")
export const FooterText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  fontSize: '0.95rem',
}));

// Navigation link inside footer — styled on RouterLink to avoid MUI component-prop type issues
export const AuthNavLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.light,
  },
}));
