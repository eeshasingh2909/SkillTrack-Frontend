import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import type { User } from '../types';

// ── useRegister ───────────────────────────────────────────────────────────────
export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate('/login');
    },
  });
}

// ── useLogin ──────────────────────────────────────────────────────────────────
export function useLogin() {
  const navigate  = useNavigate();
  const authLogin = useAuthStore(s => s.login);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const user: User = {
        id:       data.user_id,
        username: data.username,
        email:    '',   // login response doesn't return email; fine for now
      };
      authLogin(user, data.access_token);
      navigate('/dashboard');
    },
  });
}
