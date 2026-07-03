import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { styled } from '@mui/material/styles';
import Navbar from '../components/common/Navbar';
import DashboardCard from '../components/common/DashboardCard';
import ProjectFormModal from '../components/common/ProjectFormModal';
import ProfileFormModal from '../components/common/ProfileFormModal';
import SkillsModal from '../components/common/SkillsModal';
import { getDashboard } from '../api/dashboard';
import { useDeleteProject } from '../hooks/useProject';
import { COLORS } from '../theme/theme';
import { formatDate } from '../utils/helpers';
import { useAuthStore } from '../store/authStore';
import type { Project } from '../types';

// ─── Styled components ────────────────────────────────────────────────────────
const PageContainer = styled(Box)(() => ({
  minHeight: '100vh',
  background: COLORS.background,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1280,
  margin: '0 auto',
  padding: theme.spacing(4, 3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2),
  },
}));

const WelcomeText = styled(Typography)(() => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: COLORS.textPrimary,
  marginBottom: '32px',
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: COLORS.textSecondary,
  marginBottom: '16px',
}));

const ProjectCard = styled(Card)(() => ({
  background: COLORS.surface,
  backdropFilter: 'blur(12px)',
  border: `1px solid ${COLORS.border}`,
  borderRadius: 12,
  padding: '20px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    borderColor: COLORS.primaryLight,
    boxShadow: `0 0 16px ${COLORS.primaryGhost}`,
    transform: 'translateY(-2px)',
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6, 2),
  color: COLORS.textMuted,
  '& svg': {
    fontSize: 64,
    opacity: 0.3,
    marginBottom: theme.spacing(2),
  },
}));

// ─── Dashboard Page ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const user  = useAuthStore(s => s.user);
  const token = useAuthStore(s => s.token);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [skillsModalOpen,  setSkillsModalOpen]  = useState(false);
  const [deleteTarget, setDeleteTarget]         = useState<Project | null>(null);

  const { mutate: deleteProject, isPending: deleting } = useDeleteProject();

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard', token],   // re-fetches when user logs in/out
    queryFn: getDashboard,
    refetchOnWindowFocus: false,
    enabled: !!token,                 // don't fire if not authenticated
  });

  const profileComplete = data?.profile && Boolean(
    data.profile.full_name &&
    data.profile.college &&
    data.profile.degree
  );

  // ─── Loading state ─────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <PageContainer>
        <Navbar />
        <ContentContainer>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress size={48} sx={{ color: COLORS.primary }} />
          </Box>
        </ContentContainer>
      </PageContainer>
    );
  }

  // ─── Error state ───────────────────────────────────────────────────────────
  if (error || !data) {
    return (
      <PageContainer>
        <Navbar />
        <ContentContainer>
          <Typography variant="h6" color="error" textAlign="center">
            {error instanceof Error ? error.message : 'Failed to load dashboard'}
          </Typography>
        </ContentContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Navbar />

      <ContentContainer>
        {/* Welcome header */}
        <WelcomeText>
          Welcome back, {user?.username ?? 'User'} 👋
        </WelcomeText>

        {/* Stat cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              icon={<PersonOutlineIcon />}
              title="Profile"
              statusLabel={profileComplete ? 'Complete' : 'Incomplete'}
              statusColor={profileComplete ? 'success' : 'error'}
              onManage={() => setProfileModalOpen(true)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              icon={<CodeOutlinedIcon />}
              title="Skills"
              count={data.total_skills}
              onManage={() => setSkillsModalOpen(true)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              icon={<FolderOutlinedIcon />}
              title="Projects"
              count={data.total_projects}
              onManage={() => setProjectModalOpen(true)}
            />
          </Grid>
        </Grid>

        {/* Project Form Modal */}
        <ProjectFormModal
          open={projectModalOpen}
          onClose={() => setProjectModalOpen(false)}
        />

        {/* Profile Form Modal */}
        <ProfileFormModal
          open={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
        />

        {/* Skills Modal */}
        <SkillsModal
          open={skillsModalOpen}
          onClose={() => setSkillsModalOpen(false)}
        />

        {/* Recent Projects section */}
        <SectionTitle>Recent Projects</SectionTitle>

        {data.recent_projects.length === 0 ? (
          <EmptyState>
            <FolderOutlinedIcon />
            <Typography variant="body1">No projects yet</Typography>
            <Typography variant="caption">
              Start adding projects to showcase your work
            </Typography>
          </EmptyState>
        ) : (
          <Grid container spacing={2.5}>
            {data.recent_projects.map((project) => (
              <Grid item xs={12} key={project.id}>
                <ProjectCard>
                  <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>

                    {/* ── Single row: all content inline ── */}
                    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">

                      {/* Project name */}
                      <Typography variant="body1" color="textPrimary" fontWeight={700} sx={{ flexShrink: 0 }}>
                        {project.project_name}
                      </Typography>

                      {/* Tech chip */}
                      {project.technology && (
                        <Chip
                          label={project.technology}
                          size="small"
                          sx={{
                            background: COLORS.primaryGhost,
                            color: COLORS.primaryLight,
                            fontWeight: 600,
                            fontSize: '0.72rem',
                            borderRadius: 2,
                            border: `1px solid ${COLORS.border}`,
                            flexShrink: 0,
                          }}
                        />
                      )}

                      {/* Description — grows to fill space */}
                      {project.description && (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        >
                          {project.description}
                        </Typography>
                      )}

                      {/* Spacer if no description */}
                      {!project.description && <Box flex={1} />}

                      {/* GitHub button */}
                      {project.github_link && (
                        <Button
                          component="a"
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          startIcon={<GitHubIcon fontSize="small" />}
                          sx={{
                            background: 'rgba(255,255,255,0.06)',
                            color: COLORS.textSecondary,
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.78rem',
                            px: 1.5,
                            py: 0.4,
                            flexShrink: 0,
                            '&:hover': { background: COLORS.primaryGhost, color: COLORS.primaryLight, borderColor: COLORS.primaryLight },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          GitHub
                        </Button>
                      )}

                      {/* Demo button */}
                      {project.demo_link && (
                        <Button
                          component="a"
                          href={project.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          startIcon={<LaunchIcon fontSize="small" />}
                          sx={{
                            background: 'rgba(255,255,255,0.06)',
                            color: COLORS.textSecondary,
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.78rem',
                            px: 1.5,
                            py: 0.4,
                            flexShrink: 0,
                            '&:hover': { background: 'rgba(96,165,250,0.1)', color: COLORS.info, borderColor: COLORS.info },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          Live Demo
                        </Button>
                      )}

                      {/* Date */}
                      <Typography variant="caption" sx={{ color: COLORS.textMuted, flexShrink: 0 }}>
                        {formatDate(project.created_at)}
                      </Typography>

                      {/* Delete icon */}
                      <Tooltip title="Delete project" placement="top">
                        <IconButton
                          size="small"
                          onClick={() => setDeleteTarget(project)}
                          sx={{
                            color: COLORS.textMuted,
                            flexShrink: 0,
                            '&:hover': { color: COLORS.error, background: 'rgba(248,113,113,0.1)' },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                    </Box>
                  </CardContent>
                </ProjectCard>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ── Delete confirm dialog ───────────────────────────────────────── */}
        <Dialog
          open={!!deleteTarget}
          onClose={() => !deleting && setDeleteTarget(null)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              background: COLORS.surface,
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
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
            <WarningAmberIcon sx={{ color: COLORS.warning }} />
            <Typography variant="h6" fontWeight={700} color="textPrimary">
              Delete Project
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="textSecondary">
              Are you sure you want to delete{' '}
              <Typography component="span" fontWeight={700} color="textPrimary">
                {deleteTarget?.project_name}
              </Typography>
              ? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1.5 }}>
            <Button
              variant="outlined"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
              sx={{
                borderColor: COLORS.border,
                color: COLORS.textSecondary,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { borderColor: COLORS.primaryLight, color: COLORS.textPrimary, background: COLORS.primaryGhost },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (!deleteTarget) return;
                deleteProject(deleteTarget.id, {
                  onSuccess: () => setDeleteTarget(null),
                });
              }}
              disabled={deleting}
              sx={{
                background: `linear-gradient(135deg, #ef4444, #dc2626)`,
                color: '#fff',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                flex: 1,
                '&:hover': { background: `linear-gradient(135deg, #f87171, #ef4444)` },
                '&:disabled': { background: COLORS.textMuted },
              }}
            >
              {deleting ? 'Deleting…' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </ContentContainer>
    </PageContainer>
  );
}
