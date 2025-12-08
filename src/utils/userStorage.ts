/**
 * User Storage Helper
 * Manages persistent storage of all registered users in localStorage
 */

import { UserProfile, CompletedQuiz } from '../App';

export interface StoredUser extends UserProfile {
  completedQuizzes: CompletedQuiz[];
  password: string; // ✅ Add password field
}

const STORAGE_KEY = 'cyberpath_all_users';

/**
 * Load all users from localStorage
 * @returns Array of all registered users
 */
export function loadAllUsers(): StoredUser[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading users from storage:', error);
    return [];
  }
}

/**
 * Save all users to localStorage
 * @param users - Array of users to save
 */
export function saveAllUsers(users: StoredUser[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to storage:', error);
  }
}

/**
 * Add a new user to storage
 * @param user - User profile to add
 */
export function addUserToStorage(user: UserProfile & { password?: string }): void {
  const allUsers = loadAllUsers();
  
  // Check if user already exists (by email)
  const existingIndex = allUsers.findIndex(u => u.email === user.email);
  
  if (existingIndex !== -1) {
    // Update existing user
    allUsers[existingIndex] = {
      ...allUsers[existingIndex],
      ...user,
      completedQuizzes: allUsers[existingIndex].completedQuizzes,
    };
  } else {
    // Add new user
    allUsers.push({
      ...user,
      password: user.password || '', // ✅ Include password if provided
      completedQuizzes: [],
    });
  }
  
  saveAllUsers(allUsers);
}

/**
 * Update user in storage (for quiz completion, profile updates, etc.)
 * @param email - User email (unique identifier)
 * @param updates - Partial user data to update
 */
export function updateUserInStorage(
  email: string, 
  updates: Partial<StoredUser>
): void {
  const allUsers = loadAllUsers();
  const userIndex = allUsers.findIndex(u => u.email === email);
  
  if (userIndex !== -1) {
    allUsers[userIndex] = {
      ...allUsers[userIndex],
      ...updates,
    };
    saveAllUsers(allUsers);
  }
}

/**
 * Sync user data from API response (overwrites local data completely)
 * Use this after login/register to ensure data from server is saved locally
 * @param userData - Complete user data from API
 */
export function syncUserFromAPI(userData: StoredUser): void {
  const allUsers = loadAllUsers();
  const userIndex = allUsers.findIndex(u => u.email === userData.email);
  
  if (userIndex !== -1) {
    // Update existing user with API data
    allUsers[userIndex] = userData;
  } else {
    // Add new user from API
    allUsers.push(userData);
  }
  
  saveAllUsers(allUsers);
}

/**
 * Get user from storage by email
 * @param email - User email
 * @returns User profile or null
 */
export function getUserFromStorage(email: string): StoredUser | null {
  const allUsers = loadAllUsers();
  return allUsers.find(u => u.email === email) || null;
}

/**
 * Delete user from storage (for account deletion)
 * @param email - User email
 */
export function deleteUserFromStorage(email: string): void {
  const allUsers = loadAllUsers();
  const filteredUsers = allUsers.filter(u => u.email !== email);
  saveAllUsers(filteredUsers);
}

/**
 * Get leaderboard users (only users who have completed at least 1 quiz)
 * @returns Array of users sorted by total points (descending)
 */
export function getLeaderboardUsers(): StoredUser[] {
  const allUsers = loadAllUsers();
  
  // Filter users who have completed at least 1 quiz
  const activeUsers = allUsers.filter(user => user.quizzesCompleted > 0);
  
  // Sort by total points (descending)
  return activeUsers.sort((a, b) => b.totalPoints - a.totalPoints);
}

/**
 * Clear all users from storage (for development/testing)
 */
export function clearAllUsers(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Session Management - Store current logged in user
 */
const SESSION_KEY = 'cyberpath_session';

export interface UserSession {
  email: string;
  name: string;
  isLoggedIn: boolean;
  loginTime: string;
}

/**
 * Save user session (for persistent login)
 */
export function saveUserSession(email: string, name: string): void {
  const session: UserSession = {
    email,
    name,
    isLoggedIn: true,
    loginTime: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Get current user session
 */
export function getUserSession(): UserSession | null {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading session:', error);
    return null;
  }
}

/**
 * Clear user session (logout)
 */
export function clearUserSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Check if user is logged in
 */
export function isUserLoggedIn(): boolean {
  const session = getUserSession();
  return session?.isLoggedIn === true;
}

/**
 * Register a new user
 * @param name - User name
 * @param email - User email
 * @param password - User password
 * @returns Success status and error message if failed
 */
export function registerUser(
  name: string,
  email: string,
  password: string
): { success: boolean; error?: string } {
  const allUsers = loadAllUsers();
  
  // Check if email already exists
  const existingUser = allUsers.find(u => u.email === email);
  if (existingUser) {
    return { success: false, error: 'Email already registered' };
  }
  
  // Create new user with default values
  const newUser: StoredUser = {
    name,
    email,
    password, // In production, this should be hashed
    totalPoints: 0,
    quizzesCompleted: 0,
    learningStreak: 0,
    avatar: getRandomAvatar(),
    photoUrl: '',
    coverPhotoUrl: '',
    location: '',
    website: '',
    joinDate: new Date().toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }),
    bio: '',
    completedQuizzes: [],
  };
  
  allUsers.push(newUser);
  saveAllUsers(allUsers);
  
  return { success: true };
}

/**
 * Authenticate user login
 * @param email - User email
 * @param password - User password
 * @returns User data if successful, null if failed
 */
export function authenticateUser(
  email: string,
  password: string
): { success: boolean; user?: StoredUser; error?: string } {
  const allUsers = loadAllUsers();
  
  // Find user by email
  const user = allUsers.find(u => u.email === email);
  
  if (!user) {
    return { success: false, error: 'Account not found. Please register first.' };
  }
  
  // Check password
  if (user.password !== password) {
    return { success: false, error: 'Incorrect password' };
  }
  
  return { success: true, user };
}

/**
 * Get random avatar emoji
 */
function getRandomAvatar(): string {
  const avatars = ['👨‍💻', '👩‍💻', '🧑‍💻', '🦸', '🦹', '🧙', '🧝', '🥷', '🧑‍🚀', '👾'];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

/**
 * Generate 6-digit reset code
 * @returns 6-digit string
 */
export function generateResetCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Check if email exists in database
 * @param email - User email
 * @returns Boolean indicating if email exists
 */
export function checkEmailExists(email: string): boolean {
  const allUsers = loadAllUsers();
  return allUsers.some(u => u.email === email);
}

/**
 * Reset user password
 * @param email - User email
 * @param newPassword - New password
 * @returns Success status
 */
export function resetUserPassword(
  email: string,
  newPassword: string
): { success: boolean; error?: string } {
  const allUsers = loadAllUsers();
  const userIndex = allUsers.findIndex(u => u.email === email);
  
  if (userIndex === -1) {
    return { success: false, error: 'Email not found' };
  }
  
  // Update password
  allUsers[userIndex].password = newPassword;
  saveAllUsers(allUsers);
  
  return { success: true };
}