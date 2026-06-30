import { create } from 'zustand';
import type { User } from '../types';

const TOKEN_KEY = 'skilltrack_token';

interface AuthState {
  user:  User | null;
  token: string | null;
  login:  (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Hydrate token from localStorage on store init (survives page refresh)
  user:  null,
  token: localStorage.getItem(TOKEN_KEY),

  login(user, token) {
    localStorage.setItem(TOKEN_KEY, token);
    set({ user, token });
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    set({ user: null, token: null });
  },
}));
