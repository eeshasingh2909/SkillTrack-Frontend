import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FormInput from './FormInput';
import SparkleButton from './SparkleButton';
import { useCreateProject } from '../../hooks/useProject';
import { COLORS } from '../../theme/theme';

// ─── Form state ───────────────────────────────────────────────────────────────
interface FormState {
  project_name: string;
  technology:   string;
  description:  string;
  github_link:  string;
  demo_link:    string;
}

const EMPTY: FormState = {
  project_name: '',
  technology:   '',
  description:  '',
  github_link:  '',
  demo_link:    '',
};

// ─── Props ───────────────────────────────────────────────────────────────────
interface ProjectFormModalProps {
  open: boolean;
  onClose: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ProjectFormModal({ open, onClose }: ProjectFormModalProps) {
  const [form, setForm]       = useState<FormState>(EMPTY);
  const [nameError, setNameError] = useState('');

  const { mutate: addProject, isPending } = useCreateProject(() => {
    // Reset form and close on success
    setForm(EMPTY);
    setNameError('');
    onClose();
  });

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      if (field === 'project_name' && nameError) setNameError('');
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.project_name.trim()) {
      setNameError('Project name is required');
      return;
    }

    addProject({
      project_name: form.project_name.trim(),
      technology:   form.technology.trim()  || undefined,
      description:  form.description.trim() || undefined,
      github_link:  form.github_link.trim() || undefined,
      demo_link:    form.demo_link.trim()   || undefined,
    });
  }

  function handleClose() {
    if (isPending) return;  // don't close while submitting
    setForm(EMPTY);
    setNameError('');
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
      // Dim the backdrop with a violet tint
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(15, 10, 30, 0.75)', backdropFilter: 'blur(4px)' },
        },
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
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
            <FolderOutlinedIcon sx={{ fontSize: 20, color: COLORS.primaryLight }} />
          </Box>
          <Typography variant="h6" fontWeight={700} color="textPrimary">
            Add New Project
          </Typography>
        </Box>

        <IconButton
          onClick={handleClose}
          disabled={isPending}
          size="small"
          sx={{ color: COLORS.textMuted, '&:hover': { color: COLORS.textPrimary } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* ── Form ────────────────────────────────────────────────────────────── */}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>

          {/* Project Name — required */}
          <FormInput
            label="Project Name"
            placeholder="e.g. SkillTrack Portfolio App"
            value={form.project_name}
            onChange={handleChange('project_name')}
            required
            autoFocus
            error={!!nameError}
            helperText={nameError}
            startIcon={<FolderOutlinedIcon fontSize="small" />}
          />

          {/* Technology */}
          <FormInput
            label="Technology Used"
            placeholder="e.g. React, Flask, MySQL"
            value={form.technology}
            onChange={handleChange('technology')}
            startIcon={<CodeOutlinedIcon fontSize="small" />}
          />

          {/* Description — multiline */}
          <FormInput
            label="Description"
            placeholder="Briefly describe what this project does..."
            value={form.description}
            onChange={handleChange('description')}
            multiline
            rows={3}
            startIcon={<DescriptionOutlinedIcon fontSize="small" />}
            // Align icon to top for multiline
            InputProps={{
              startAdornment: undefined,
              sx: { alignItems: 'flex-start', pt: 1.5 },
            }}
            sx={{
              '& .MuiInputAdornment-root': { mt: '2px', alignSelf: 'flex-start' },
            }}
          />

          {/* GitHub Link */}
          <FormInput
            label="GitHub Link"
            placeholder="https://github.com/username/repo"
            value={form.github_link}
            onChange={handleChange('github_link')}
            type="url"
            startIcon={<GitHubIcon fontSize="small" />}
          />

          {/* Demo Link */}
          <FormInput
            label="Demo Link"
            placeholder="https://yourproject.live"
            value={form.demo_link}
            onChange={handleChange('demo_link')}
            type="url"
            startIcon={<LaunchIcon fontSize="small" />}
          />
        </DialogContent>

        {/* ── Actions ─────────────────────────────────────────────────────────── */}
        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            pt: 1,
            gap: 1.5,
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={isPending}
            sx={{
              borderColor: COLORS.border,
              color: COLORS.textSecondary,
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
            Cancel
          </Button>

          <SparkleButton
            type="submit"
            loading={isPending}
            sx={{ flex: 1 }}
          >
            Add Project
          </SparkleButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
