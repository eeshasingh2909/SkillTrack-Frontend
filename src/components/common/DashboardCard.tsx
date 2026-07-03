import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { COLORS } from '../../theme/theme';

// ─── Styled card with glassmorphism + subtle hover glow ───────────────────────
const StyledCard = styled(Card)(({ theme }) => ({
  background: COLORS.surface,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid ${COLORS.border}`,
  borderRadius: 14,
  padding: theme.spacing(2.5),
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',

  '&:hover': {
    borderColor: COLORS.primaryLight,
    boxShadow: `0 0 20px ${COLORS.primaryGhost}, 0 4px 12px rgba(0,0,0,0.3)`,
    transform: 'translateY(-2px)',
  },
}));

// Glowing icon container
const IconBox = styled(Box)(({ theme }) => ({
  width: 52,
  height: 52,
  borderRadius: 12,
  background: `linear-gradient(135deg, ${COLORS.primaryGhost}, ${COLORS.surfaceGlass})`,
  border: `1px solid ${COLORS.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(1.5),
  '& svg': {
    fontSize: 28,
    color: COLORS.primaryLight,
  },
}));

const CountText = styled(Typography)(() => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: COLORS.primaryLight,
  lineHeight: 1,
  marginTop: '6px',
}));

// ─── Props ───────────────────────────────────────────────────────────────────
interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  count?: number;
  statusLabel?: string;
  statusColor?: 'success' | 'error' | 'warning' | 'info';
  onManage: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function DashboardCard({
  icon,
  title,
  count,
  statusLabel,
  statusColor = 'success',
  onManage,
}: DashboardCardProps) {
  return (
    <StyledCard>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <IconBox>{icon}</IconBox>

        <Typography variant="h6" color="textSecondary" gutterBottom>
          {title}
        </Typography>

        {count !== undefined && <CountText>{count}</CountText>}

        {statusLabel && (
          <Chip
            label={statusLabel}
            color={statusColor}
            size="small"
            sx={{
              mt: 1,
              fontWeight: 600,
              fontSize: '0.75rem',
              borderRadius: 2,
            }}
          />
        )}

        <Box mt={2}>
          <Button
            size="small"
            onClick={onManage}
            sx={{
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondaryDark} 100%)`,
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.8rem',
              px: 2.5,
              py: 0.75,
              borderRadius: 2,
              textTransform: 'none',
              transition: 'all 0.25s ease',
              '&:hover': {
                background: `linear-gradient(135deg, ${COLORS.primaryLight} 0%, ${COLORS.primary} 100%)`,
                boxShadow: `0 0 16px ${COLORS.primaryGhost}`,
                transform: 'translateY(-1px)',
              },
            }}
          >
            Manage
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
}
