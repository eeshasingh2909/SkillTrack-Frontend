import { apiRequest } from './apiClient';
import type { Project } from '../types';

// ─── Project API ──────────────────────────────────────────────────────────────

export interface CreateProjectPayload {
  project_name: string;
  technology?: string;
  description?: string;
  github_link?: string;
  demo_link?: string;
}

export const createProject = (payload: CreateProjectPayload) =>
  apiRequest<Project>('POST', '/projects', payload);

export const getProjects = () =>
  apiRequest<Project[]>('GET', '/projects');

export const deleteProject = (projectId: number) =>
  apiRequest<{ message: string }>('DELETE', `/projects/${projectId}`);
