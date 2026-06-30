import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import bgImage from '../assets/image.png';

// ─── Full-viewport background ─────────────────────────────────────────────────
export const PageBackground = styled(Box)({
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',

  // Dark overlay so the glass card pops against any bg image
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'rgba(10, 5, 30, 0.45)',
    zIndex: 0,
  },
});

// ─── Content layer (sits above the overlay) ───────────────────────────────────
export const PageContent = styled(Box)({
  position: 'relative',
  zIndex: 1,
});
