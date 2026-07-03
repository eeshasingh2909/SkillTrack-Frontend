import { apiRequest } from './apiClient';
import type { Skill } from '../types';

// ─── Skill API ────────────────────────────────────────────────────────────────

export const getSkills = () =>
  apiRequest<Skill[]>('GET', '/skills');

export const createSkill = (skill_name: string) =>
  apiRequest<Skill>('POST', '/skills', { skill_name });

export const deleteSkill = (skillId: number) =>
  apiRequest<{ message: string }>('DELETE', `/skills/${skillId}`);
