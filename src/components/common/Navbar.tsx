import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../theme/theme';
import { useAuthStore } from '../../store/authStore';

// ─── Styled AppBar ────────────────────────────────────────────────────────────
const GlassAppBar = styled(AppBar)(() => ({
  background: `rgba(26, 16, 51, 0.8)`,   // COLORS.surface with alpha
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderBottom: `1px solid ${COLORS.border}`,
  boxShadow: 'none',
}));

const BrandText = styled(Typography)(() => ({
  fontWeight: 800,
  fontSize: '1.35rem',
  letterSpacing: '-0.03em',
  background: `linear-gradient(135deg, ${COLORS.primaryLight} 0%, ${COLORS.secondary} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  userSelect: 'none',
  cursor: 'default',
}));

// ─── Component ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const navigate   = useNavigate();
  const { user, logout } = useAuthStore();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : '?';

  function openMenu(e: React.MouseEvent<HTMLElement>) {
    setAnchor(e.currentTarget);
  }

  function closeMenu() {
    setAnchor(null);
  }

  function handleLogout() {
    closeMenu();
    logout();
    navigate('/login');
  }

  return (
    <GlassAppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
        {/* Brand */}
        <BrandText>SkillTrack</BrandText>

        {/* Profile icon + username */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ color: COLORS.textSecondary, display: { xs: 'none', sm: 'block' } }}
          >
            {user?.username ?? ''}
          </Typography>
          <IconButton onClick={openMenu} sx={{ p: 0.5 }}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                fontSize: '0.8rem',
                fontWeight: 700,
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondaryDark} 100%)`,
                border: `2px solid ${COLORS.border}`,
                cursor: 'pointer',
                transition: 'box-shadow 0.25s ease',
                '&:hover': {
                  boxShadow: `0 0 14px ${COLORS.primaryGhost}`,
                  borderColor: COLORS.primaryLight,
                },
              }}
            >
              {initials}
            </Avatar>
          </IconButton>

          {/* Dropdown menu */}
          <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={closeMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                backdropFilter: 'blur(16px)',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
              },
            }}
          >
            {/* User info header */}
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="body2" fontWeight={700} color="textPrimary">
                {user?.username ?? 'User'}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {user?.email ?? ''}
              </Typography>
            </Box>

            <Divider sx={{ borderColor: COLORS.border }} />

            <MenuItem
              onClick={handleLogout}
              sx={{ gap: 1.5, py: 1.25, color: COLORS.error, '&:hover': { color: COLORS.error, background: 'rgba(248,113,113,0.08)' } }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 'unset' }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </GlassAppBar>
  );
}
