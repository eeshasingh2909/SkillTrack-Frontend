import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, updateProfile } from '../api/profile';
import { useToastStore } from '../store/toastStore';

// ── useGetProfile ─────────────────────────────────────────────────────────────
// Fetches the current user's profile — used to pre-fill the edit modal
export function useGetProfile(enabled = true) {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,   // treat as fresh for 5 minutes
  });
}

// ── useUpdateProfile ──────────────────────────────────────────────────────────
export function useUpdateProfile(onSuccess?: () => void) {
  const queryClient   = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      // Refresh both the standalone profile cache and the dashboard
      // (dashboard shows profile completeness chip)
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      showToast('Profile saved successfully!', 'success');
      onSuccess?.();
    },
    onError: (err: Error) => {
      showToast(err.message ?? 'Failed to save profile', 'error');
    },
  });
}
