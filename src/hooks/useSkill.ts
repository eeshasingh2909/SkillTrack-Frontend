import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSkills, createSkill, deleteSkill } from '../api/skill';
import { useToastStore } from '../store/toastStore';

// ── useGetSkills ──────────────────────────────────────────────────────────────
export function useGetSkills(enabled = true) {
  return useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
    enabled,
    refetchOnWindowFocus: false,
  });
}

// ── useAddSkill ───────────────────────────────────────────────────────────────
export function useAddSkill() {
  const queryClient   = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      // Refresh skills list and dashboard count
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (err: Error) => {
      showToast(err.message ?? 'Failed to add skill', 'error');
    },
  });
}

// ── useDeleteSkill ────────────────────────────────────────────────────────────
export function useDeleteSkill() {
  const queryClient   = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (err: Error) => {
      showToast(err.message ?? 'Failed to delete skill', 'error');
    },
  });
}
