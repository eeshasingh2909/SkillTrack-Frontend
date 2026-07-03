import { apiRequest } from './apiClient';
import type { DashboardData } from '../types';

// ─── Dashboard API ────────────────────────────────────────────────────────────
// GET /api/dashboard — returns stats + recent projects + profile completeness

export const getDashboard = () =>
  apiRequest<DashboardData>('GET', '/dashboard');
