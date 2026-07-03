import { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useGetSkills, useAddSkill, useDeleteSkill } from '../../hooks/useSkill';
import { COLORS } from '../../theme/theme';

// ─── Props ───────────────────────────────────────────────────────────────────
interface SkillsModalProps {
  open: boolean;
  onClose: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function SkillsModal({ open, onClose }: SkillsModalProps) {
  const [input, setInput]   = useState('');
  const [error, setError]   = useState('');
  const inputRef            = useRef<HTMLInputElement>(null);

  const { data: skills = [], isLoading }       = useGetSkills(open);
  const { mutate: addSkill,    isPending: adding   } = useAddSkill();
  const { mutate: removeSkill, isPending: removing } = useDeleteSkill();

  function handleAdd() {
    const trimmed = input.trim();
    if (!trimmed) {
      setError('Please enter a skill name');
      return;
    }
    // Prevent duplicates client-side
    if (skills.some(s => s.skill_name.toLowerCase() === trimmed.toLowerCase())) {
      setError('Skill already added');
      return;
    }

    addSkill(trimmed, {
      onSuccess: () => {
        setInput('');
        setError('');
        inputRef.current?.focus();
      },
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  }

  function handleClose() {
    setInput('');
    setError('');
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: COLORS.surface,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid ${COLORS.border}`,
          borderRadius: 3,
          boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(15,10,30,0.75)', backdropFilter: 'blur(4px)' },
        },
      }}
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1.5,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${COLORS.primaryGhost}, ${COLORS.surfaceGlass})`,
              border: `1px solid ${COLORS.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CodeOutlinedIcon sx={{ fontSize: 20, color: COLORS.primaryLight }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} color="textPrimary" lineHeight={1.2}>
              My Skills
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {skills.length} skill{skills.length !== 1 ? 's' : ''} added
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ color: COLORS.textMuted, '&:hover': { color: COLORS.textPrimary } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>

        {/* ── Add skill input row ──────────────────────────────────────────── */}
        <Box display="flex" gap={1.5} alignItems="flex-start" margin={2}>
          <TextField
            inputRef={inputRef}
            placeholder="e.g. React, Python, Docker..."
            value={input}
            onChange={e => { setInput(e.target.value); if (error) setError(''); }}
            onKeyDown={handleKeyDown}
            error={!!error}
            helperText={error}
            autoFocus
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CodeOutlinedIcon fontSize="small" sx={{ color: COLORS.textMuted }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                '& fieldset': { borderColor: COLORS.border },
                '&:hover fieldset': { borderColor: COLORS.primaryLight },
                '&.Mui-focused fieldset': {
                  borderColor: COLORS.primary,
                  boxShadow: `0 0 0 3px ${COLORS.primaryGhost}`,
                },
              },
              '& .MuiInputBase-input': {
                color: COLORS.textPrimary,
                '&::placeholder': { color: COLORS.textMuted, opacity: 1 },
              },
              '& .MuiFormHelperText-root': { color: COLORS.error, ml: 0 },
              '& .MuiInputAdornment-root': { color: COLORS.textMuted },
            }}
          />

          <Button
            onClick={handleAdd}
            disabled={adding}
            startIcon={adding ? <CircularProgress size={14} sx={{ color: '#fff' }} /> : <AddIcon />}
            sx={{
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondaryDark} 100%)`,
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.85rem',
              px: 2.5,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.25s ease',
              '&:hover': {
                background: `linear-gradient(135deg, ${COLORS.primaryLight} 0%, ${COLORS.primary} 100%)`,
                boxShadow: `0 0 16px ${COLORS.primaryGhost}`,
              },
              '&:disabled': { background: COLORS.textMuted, color: COLORS.background },
            }}
          >
            Add Skill
          </Button>
        </Box>

        {/* ── Skills list ──────────────────────────────────────────────────── */}
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress size={32} sx={{ color: COLORS.primary }} />
          </Box>
        ) : skills.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
              color: COLORS.textMuted,
              border: `1px dashed ${COLORS.border}`,
              borderRadius: 2,
            }}
          >
            <CodeOutlinedIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1, display: 'block', mx: 'auto' }} />
            <Typography variant="body2">No skills yet — add your first one above</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.2,
              p: 2,
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${COLORS.border}`,
              borderRadius: 2,
              minHeight: 80,
            }}
          >
            {skills.map(skill => (
              <Chip
                key={skill.id}
                label={skill.skill_name}
                onDelete={() => removeSkill(skill.id)}
                disabled={removing}
                sx={{
                  background: COLORS.primaryGhost,
                  color: COLORS.primaryLight,
                  border: `1px solid ${COLORS.border}`,
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  borderRadius: 2,
                  '& .MuiChip-deleteIcon': {
                    color: COLORS.textMuted,
                    '&:hover': { color: COLORS.error },
                    transition: 'color 0.2s ease',
                  },
                  '&:hover': {
                    background: `rgba(124,58,237,0.2)`,
                    borderColor: COLORS.primaryLight,
                  },
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </Box>
        )}
      </DialogContent>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <DialogActions sx={{ px: 3, pb: 3, pt: 1, borderTop: `1px solid ${COLORS.border}` }}>
        <Button
          onClick={handleClose}
          sx={{
            borderColor: COLORS.border,
            color: COLORS.textSecondary,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              borderColor: COLORS.primaryLight,
              color: COLORS.textPrimary,
              background: COLORS.primaryGhost,
            },
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
