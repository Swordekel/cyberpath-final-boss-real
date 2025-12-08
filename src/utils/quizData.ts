/**
 * Quiz Data Helper
 * Mapping quiz IDs to quiz titles for display purposes
 */

export const quizTitles: Record<number, string> = {
  // DAILY QUIZZES (ID 1-7)
  1: 'Cyber Basics Daily',
  2: 'Network Security Fundamentals',
  3: 'Web Security Essentials',
  4: 'Malware Analysis Basics',
  5: 'Cryptography Fundamentals',
  6: 'Social Engineering Awareness',
  7: 'Incident Response Basics',
  
  // WEEKLY QUIZZES (ID 8-13)
  8: 'Advanced Network Security',
  9: 'Web Application Penetration Testing',
  10: 'Advanced Malware Analysis',
  11: 'Cryptography & PKI',
  12: 'Cloud Security Fundamentals',
  13: 'Security Operations Center (SOC)',
  
  // MONTHLY CHALLENGES (ID 14-20)
  14: 'Red Team vs Blue Team',
  15: 'Advanced Persistent Threats (APT)',
  16: 'Zero Trust Architecture',
  17: 'Threat Hunting & Intelligence',
  18: 'DevSecOps Integration',
  19: 'Blockchain Security',
  20: 'AI & Machine Learning in Cybersecurity',
};

/**
 * Get quiz title by ID
 * @param quizId - Quiz ID
 * @returns Quiz title or fallback string
 */
export function getQuizTitle(quizId: number): string {
  return quizTitles[quizId] || `Quiz #${quizId}`;
}

/**
 * Get quiz category by ID
 * @param quizId - Quiz ID
 * @returns Quiz category
 */
export function getQuizCategory(quizId: number): 'daily' | 'weekly' | 'monthly' {
  if (quizId >= 1 && quizId <= 7) return 'daily';
  if (quizId >= 8 && quizId <= 13) return 'weekly';
  return 'monthly';
}

/**
 * Get quiz difficulty by ID (estimated)
 * @param quizId - Quiz ID
 * @returns Quiz difficulty
 */
export function getQuizDifficulty(quizId: number): 'easy' | 'medium' | 'hard' | 'insane' {
  if (quizId >= 1 && quizId <= 7) return 'easy';
  if (quizId >= 8 && quizId <= 13) return 'medium';
  if (quizId >= 14 && quizId <= 17) return 'hard';
  return 'insane';
}
