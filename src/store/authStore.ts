import { create } from 'zustand';
import type { User } from '../types';

const TOKEN_KEY = 'skilltrack_token';
const USER_KEY  = 'skilltrack_user';

interface AuthState {
  user:  User | null;
  token: string | null;
  login:  (user: User, token: string) => void;
  logout: () => void;
}

// ─── Helper: hydrate user from localStorage ──────────────────────────────────
// Guards against stale/corrupt data — if stored value has no username field,
// treat as missing (handles the old null-user cache from before persistence was added)
function getStoredUser(): User | null {
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored) as User;
    // Validate it's a real user object, not an old null/corrupt entry
    if (!parsed || !parsed.username || !parsed.id) {
      localStorage.removeItem(USER_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  // Hydrate both token and user from localStorage on store init (survives page refresh)
  user:  getStoredUser(),
  token: localStorage.getItem(TOKEN_KEY),

  login(user, token) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    set({ user, token });
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({ user: null, token: null });
  },
}));
