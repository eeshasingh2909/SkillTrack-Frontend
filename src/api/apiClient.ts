import { useAuthStore } from '../store/authStore';

const BASE_URL = '/api';

// Auth endpoints — a 401 here always means wrong credentials, never session expiry
const AUTH_PATHS = ['/auth/login', '/auth/register'];

// ─── Core fetch wrapper ───────────────────────────────────────────────────────
// All API calls go through here.
// Attaches JWT, sets Content-Type, normalises errors.

export async function apiRequest<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const token = useAuthStore.getState().token;

  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    const isAuthEndpoint = AUTH_PATHS.some(p => path.startsWith(p));

    if (isAuthEndpoint) {
      // Wrong email/password — just show what the backend said
      throw new Error(data.error ?? 'Invalid credentials.');
    }

    // Protected endpoint with expired/invalid token — clear session
    useAuthStore.getState().logout();
    throw new Error('Session expired. Please log in again.');
  }

  if (!res.ok) {
    throw new Error(data.error ?? 'Something went wrong.');
  }

  return data as T;
}
