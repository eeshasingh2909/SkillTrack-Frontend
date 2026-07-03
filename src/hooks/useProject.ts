import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject, deleteProject } from '../api/project';
import { useToastStore } from '../store/toastStore';

// ── useCreateProject ──────────────────────────────────────────────────────────
export function useCreateProject(onSuccess?: () => void) {
  const queryClient  = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      // Invalidate dashboard cache so recent_projects refreshes immediately
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      showToast('Project added successfully!', 'success');
      onSuccess?.();
    },
    onError: (err: Error) => {
      showToast(err.message ?? 'Failed to add project', 'error');
    },
  });
}

// ── useDeleteProject ──────────────────────────────────────────────────────────
export function useDeleteProject() {
  const queryClient  = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      showToast('Project deleted', 'info');
    },
    onError: (err: Error) => {
      showToast(err.message ?? 'Failed to delete project', 'error');
    },
  });
}
