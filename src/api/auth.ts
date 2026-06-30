import { apiRequest } from './apiClient';
import type { AuthResponse } from '../types';

export interface RegisterPayload {
  username: string;
  email:    string;
  password: string;
}

export interface LoginPayload {
  email:    string;
  password: string;
}

export const registerUser = (payload: RegisterPayload) =>
  apiRequest<{ message: string }>('POST', '/auth/register', payload);

export const loginUser = (payload: LoginPayload) =>
  apiRequest<AuthResponse>('POST', '/auth/login', payload);
