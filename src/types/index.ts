// Shared TypeScript interfaces for SkillTrack
// All shared types live here — no page or component should redefine these

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Profile {
  full_name: string | null;
  phone: string | null;
  college: string | null;
  degree: string | null;
  graduation_year: number | null;
  linkedin: string | null;
  github: string | null;
  bio: string | null;
}

export interface Skill {
  id: number;
  skill_name: string;
}

export interface Project {
  id: number;
  project_name: string;
  technology: string | null;
  description: string | null;
  github_link: string | null;
  demo_link: string | null;
  created_at: string;
}

export interface DashboardData {
  total_skills: number;
  total_projects: number;
  recent_projects: Project[];
  profile: Profile | null;
}

export interface AuthResponse {
  access_token: string;
  user_id: number;
  username: string;
}

export interface ApiError {
  error: string;
}

export interface Toast {
  id: string;
  message: string;
  severity: "success" | "error" | "info";
}
