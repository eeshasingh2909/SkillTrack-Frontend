import { apiRequest } from './apiClient';
import type { Profile } from '../types';

// ─── Profile API ──────────────────────────────────────────────────────────────

export interface UpdateProfilePayload {
  full_name?:       string | null;
  phone?:           string | null;
  college?:         string | null;
  degree?:          string | null;
  graduation_year?: number | null;
  linkedin?:        string | null;
  github?:          string | null;
  bio?:             string | null;
}

export const getProfile = () =>
  apiRequest<Profile>('GET', '/profile');

export const updateProfile = (payload: UpdateProfilePayload) =>
  apiRequest<Profile>('PUT', '/profile', payload);
