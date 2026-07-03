import { useState, useEffect } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormInput from './FormInput';
import SparkleButton from './SparkleButton';
import { useGetProfile, useUpdateProfile } from '../../hooks/useProfile';
import { COLORS } from '../../theme/theme';

// ─── Form state ───────────────────────────────────────────────────────────────
interface FormState {
  full_name: string;
  phone:     string;
  college:   string;
  degree:    string;
  linkedin:  string;
  github:    string;
  bio:       string;
}

const EMPTY: FormState = {
  full_name: '',
  phone:     '',
  college:   '',
  degree:    '',
  linkedin:  '',
  github:    '',
  bio:       '',
};

const CURRENT_YEAR = dayjs();
const MIN_YEAR     = dayjs().year(2000);

// ─── Props ───────────────────────────────────────────────────────────────────
interface ProfileFormModalProps {
  open: boolean;
  onClose: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ProfileFormModal({ open, onClose }: ProfileFormModalProps) {
  const [form, setForm]           = useState<FormState>(EMPTY);
  const [gradYear, setGradYear]   = useState<Dayjs | null>(null);
  const [yearError, setYearError] = useState('');

  // Fetch existing profile when modal opens
  const { data: existingProfile, isLoading: profileLoading } = useGetProfile(open);

  // Pre-fill form whenever existing data arrives
  useEffect(() => {
    if (!existingProfile) return;
    setForm({
      full_name: existingProfile.full_name  ?? '',
      phone:     existingProfile.phone      ?? '',
      college:   existingProfile.college    ?? '',
      degree:    existingProfile.degree     ?? '',
      linkedin:  existingProfile.linkedin   ?? '',
      github:    existingProfile.github     ?? '',
      bio:       existingProfile.bio        ?? '',
    });
    setGradYear(
      existingProfile.graduation_year
        ? dayjs().year(existingProfile.graduation_year)
        : null,
    );
  }, [existingProfile]);

  const { mutate: saveProfile, isPending } = useUpdateProfile(() => {
    onClose();
  });

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  function handleYearChange(value: Dayjs | null) {
    setGradYear(value);
    if (yearError) setYearError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate year if provided
    if (gradYear) {
      const yr = gradYear.year();
      if (yr < 2000 || yr > CURRENT_YEAR.year()) {
        setYearError(`Year must be between 2000 and ${CURRENT_YEAR.year()}`);
        return;
      }
    }

    saveProfile({
      full_name:       form.full_name.trim()  || null,
      phone:           form.phone.trim()      || null,
      college:         form.college.trim()    || null,
      degree:          form.degree.trim()     || null,
      graduation_year: gradYear ? gradYear.year() : null,
      linkedin:        form.linkedin.trim()   || null,
      github:          form.github.trim()     || null,
      bio:             form.bio.trim()        || null,
    });
  }

  function handleClose() {
    if (isPending) return;
    onClose();
  }

  // ── Shared DatePicker sx — matches the rest of the themed TextFields ────────
  const pickerSx = {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      backgroundColor: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(6px)',
      '& fieldset': { borderColor: COLORS.border },
      '&:hover fieldset': { borderColor: COLORS.primaryLight },
      '&.Mui-focused fieldset': {
        borderColor: COLORS.primary,
        boxShadow: `0 0 0 3px rgba(124, 58, 237, 0.12)`,
      },
    },
    '& .MuiInputLabel-root': { color: COLORS.textSecondary },
    '& .MuiInputLabel-root.Mui-focused': { color: COLORS.primaryLight },
    '& .MuiInputBase-input': { color: COLORS.textPrimary },
    '& .MuiSvgIcon-root': { color: COLORS.textMuted },
    '& .MuiFormHelperText-root': { color: COLORS.error },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            sx: { backgroundColor: 'rgba(15, 10, 30, 0.75)', backdropFilter: 'blur(4px)' },
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
              <PersonOutlineIcon sx={{ fontSize: 20, color: COLORS.primaryLight }} />
            </Box>
            <Typography variant="h6" fontWeight={700} color="textPrimary">
              Student Profile
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

        {/* ── Loading skeleton while fetching existing profile ────────────── */}
        {profileLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={8}>
            <CircularProgress size={36} sx={{ color: COLORS.primary }} />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>

              {/* Full Name */}
              <FormInput
                label="Full Name"
                placeholder="e.g. Eesha Sharma"
                value={form.full_name}
                onChange={handleChange('full_name')}
                autoFocus
                startIcon={<PersonOutlineIcon fontSize="small" />}
              />

              {/* Phone */}
              <FormInput
                label="Phone"
                placeholder="e.g. +91 98765 43210"
                value={form.phone}
                onChange={handleChange('phone')}
                startIcon={<PhoneOutlinedIcon fontSize="small" />}
              />

              {/* College + Degree side by side */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    label="College"
                    placeholder="e.g. BITS Pilani"
                    value={form.college}
                    onChange={handleChange('college')}
                    startIcon={<SchoolOutlinedIcon fontSize="small" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    label="Degree"
                    placeholder="e.g. B.Tech"
                    value={form.degree}
                    onChange={handleChange('degree')}
                    startIcon={<MenuBookOutlinedIcon fontSize="small" />}
                  />
                </Grid>
              </Grid>

              {/* Graduation Year — year-only DatePicker */}
              <DatePicker
                label="Graduation Year"
                views={['year']}
                value={gradYear}
                onChange={handleYearChange}
                minDate={MIN_YEAR}
                maxDate={CURRENT_YEAR}
                slotProps={{
                  textField: {
                    helperText: yearError || '',
                    error: !!yearError,
                    sx: pickerSx,
                  },
                  popper: {
                    sx: {
                      '& .MuiPaper-root': {
                        background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 2,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                      },
                      '& .MuiPickersYear-yearButton': {
                        color: COLORS.textSecondary,
                        '&.Mui-selected': {
                          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondaryDark})`,
                          color: '#fff',
                        },
                        '&:hover': { background: COLORS.primaryGhost },
                      },
                    },
                  },
                }}
              />

              {/* LinkedIn */}
              <FormInput
                label="LinkedIn"
                placeholder="https://linkedin.com/in/yourprofile"
                value={form.linkedin}
                onChange={handleChange('linkedin')}
                type="url"
                startIcon={<LinkedInIcon fontSize="small" />}
              />

              {/* GitHub */}
              <FormInput
                label="GitHub"
                placeholder="https://github.com/yourusername"
                value={form.github}
                onChange={handleChange('github')}
                type="url"
                startIcon={<GitHubIcon fontSize="small" />}
              />

              {/* About Me — multiline */}
              <FormInput
                label="About Me"
                placeholder="Tell us a bit about yourself..."
                value={form.bio}
                onChange={handleChange('bio')}
                multiline
                rows={3}
                startIcon={<InfoOutlinedIcon fontSize="small" />}
                InputProps={{
                  startAdornment: undefined,
                  sx: { alignItems: 'flex-start', pt: 1.5 },
                }}
                sx={{
                  '& .MuiInputAdornment-root': { mt: '2px', alignSelf: 'flex-start' },
                }}
              />
            </DialogContent>

            {/* ── Actions ─────────────────────────────────────────────────── */}
            <DialogActions
              sx={{
                px: 3,
                pb: 3,
                pt: 1.5,
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
                Save Profile
              </SparkleButton>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </LocalizationProvider>
  );
}
