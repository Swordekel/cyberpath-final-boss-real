import { projectId, publicAnonKey } from './supabase/info';
import { CompletedQuiz, UserProfile } from '../App';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-094aa1ac`;

// Helper function to make API calls
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `API call failed: ${response.statusText}`);
  }

  return response.json();
}

// ==================== API FUNCTIONS ====================

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiUserData extends UserProfile {
  completedQuizzes: CompletedQuiz[];
}

/**
 * Register a new user
 */
export async function registerUser(data: RegisterData): Promise<ApiUserData> {
  const response = await apiCall<{ success: boolean; user: ApiUserData }>('/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.user;
}

/**
 * Login user
 */
export async function loginUser(data: LoginData): Promise<ApiUserData> {
  const response = await apiCall<{ success: boolean; user: ApiUserData }>('/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.user;
}

/**
 * Get user data by email
 */
export async function getUserData(email: string): Promise<ApiUserData> {
  const response = await apiCall<{ user: ApiUserData }>(`/user/${encodeURIComponent(email)}`);
  return response.user;
}

/**
 * Update user profile
 */
export async function updateUserProfile(email: string, updates: Partial<ApiUserData>): Promise<ApiUserData> {
  const response = await apiCall<{ success: boolean; user: ApiUserData }>(`/user/${encodeURIComponent(email)}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  return response.user;
}

/**
 * Complete a quiz
 */
export async function completeQuiz(
  email: string,
  quizId: number,
  score: number,
  pointsEarned: number
): Promise<ApiUserData> {
  const response = await apiCall<{ success: boolean; user: ApiUserData }>('/quiz/complete', {
    method: 'POST',
    body: JSON.stringify({ email, quizId, score, pointsEarned }),
  });
  return response.user;
}

/**
 * Get leaderboard (all users sorted by points)
 */
export async function getLeaderboard(): Promise<ApiUserData[]> {
  const response = await apiCall<{ users: ApiUserData[] }>('/leaderboard');
  return response.users;
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<string> {
  const response = await apiCall<{ success: boolean; resetCode: string }>('/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return response.resetCode;
}

/**
 * Reset password with code
 */
export async function resetPassword(email: string, resetCode: string, newPassword: string): Promise<void> {
  await apiCall<{ success: boolean }>('/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email, resetCode, newPassword }),
  });
}

/**
 * Health check
 */
export async function healthCheck(): Promise<{ status: string }> {
  return apiCall<{ status: string }>('/health');
}
