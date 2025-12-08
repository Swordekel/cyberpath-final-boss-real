import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { LearnPage } from './components/LearnPage';
import { QuizPage } from './components/QuizPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { ProfilePage } from './components/ProfilePage';
import { EditProfilePage } from './components/EditProfilePage';
import { LessonContentPage } from './components/LessonContentPage';
import { LegalPage } from './components/LegalPage';
import { Footer } from './components/Footer';
import { MatrixBackground } from './components/MatrixBackground';
import { motion, AnimatePresence } from 'motion/react';
import { useFavicon, createEmojiFavicon } from './hooks/useFavicon';
import { Toaster } from 'sonner@2.0.3';
import { 
  loadAllUsers, 
  saveAllUsers, 
  updateUserInStorage, 
  addUserToStorage, 
  getUserFromStorage,
  saveUserSession,
  getUserSession,
  clearUserSession,
  syncUserFromAPI
} from './utils/userStorage';

export type Page = 'home' | 'learn' | 'quiz' | 'leaderboard' | 'login' | 'register' | 'forgot-password' | 'profile' | 'edit-profile' | 'lesson-content' | 'privacy-policy' | 'terms-of-service' | 'cookie-policy' | 'disclaimer' | 'documentation' | 'tutorials' | 'blog' | 'community';

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  photoUrl: string;
  coverPhotoUrl: string; // Cover photo for profile banner
  location: string;
  website: string;
  joinDate: string;
  totalPoints: number;
  quizzesCompleted: number;
  learningStreak: number;
}

interface LessonProgress {
  moduleId: number;
  completedLessons: number[];
  currentLesson: number;
}

export interface CompletedQuiz {
  quizId: number;
  completedAt: string;
  score: number;
  pointsEarned: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<CompletedQuiz[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    bio: 'Cyber security enthusiast passionate about learning and protecting digital assets.',
    avatar: '👨‍💻',
    photoUrl: '',
    coverPhotoUrl: '', // Add cover photo URL here
    location: 'Indonesia',
    website: 'https://cyberpath.io',
    joinDate: new Date().toISOString(),
    totalPoints: 0,
    quizzesCompleted: 0,
    learningStreak: 1,
  });

  // Set favicon - Anda bisa ganti emoji atau URL gambar di sini
  // Opsi 1: Gunakan emoji
  useFavicon(createEmojiFavicon('🛡️'));
  
  // Opsi 2: Gunakan URL gambar (uncomment untuk pakai)
  // useFavicon('https://example.com/your-favicon.png');
  
  // Opsi 3: Gunakan SVG data URL (uncomment untuk pakai)
  // useFavicon('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">🛡️</text></svg>');

  const handleLogin = (name: string, email: string = '') => {
    const userEmail = email || `${name.toLowerCase()}@example.com`;
    
    // ✅ Try to load existing user from storage
    const storedUser = getUserFromStorage(userEmail);
    
    if (storedUser) {
      // Load existing user data
      setUserProfile(storedUser);
      setCompletedQuizzes(storedUser.completedQuizzes);
      setUserName(storedUser.name);
      
      // ✅ Save session for persistent login
      saveUserSession(storedUser.email, storedUser.name);
    } else {
      // New user - create profile
      const newProfile = {
        name,
        email: userEmail,
        bio: 'Cyber security enthusiast passionate about learning and protecting digital assets.',
        avatar: '👨‍💻',
        photoUrl: '',
        coverPhotoUrl: '',
        location: 'Indonesia',
        website: 'https://cyberpath.io',
        joinDate: new Date().toISOString(),
        totalPoints: 0,
        quizzesCompleted: 0,
        learningStreak: 1,
      };
      setUserProfile(newProfile);
      setUserName(name);
      setCompletedQuizzes([]);
      
      // ✅ Save new user to storage
      addUserToStorage(newProfile);
      
      // ✅ Save session for persistent login
      saveUserSession(userEmail, name);
    }
    
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentPage('home');
    clearUserSession();
  };

  const handleUpdateProfile = (updatedProfile: Partial<UserProfile>) => {
    const newProfile = { ...userProfile, ...updatedProfile };
    setUserProfile(newProfile);
    if (updatedProfile.name) {
      setUserName(updatedProfile.name);
    }
    
    // ✅ Log untuk debugging foto profile
    console.log('🔄 Updating profile with data:', {
      email: userProfile.email,
      hasPhotoUrl: !!updatedProfile.photoUrl,
      photoUrlLength: updatedProfile.photoUrl?.length || 0,
      hasCoverPhotoUrl: !!updatedProfile.coverPhotoUrl,
      coverPhotoUrlLength: updatedProfile.coverPhotoUrl?.length || 0,
    });
    
    // ✅ Try to update via API first
    const updateProfileAsync = async () => {
      try {
        const { updateUserProfile } = await import('./utils/api');
        const updatedUser = await updateUserProfile(userProfile.email, {
          ...newProfile,
          completedQuizzes,
        });
        
        console.log('✅ API update successful, received user data:', {
          email: updatedUser.email,
          hasPhotoUrl: !!updatedUser.photoUrl,
          photoUrlLength: updatedUser.photoUrl?.length || 0,
          hasCoverPhotoUrl: !!updatedUser.coverPhotoUrl,
          coverPhotoUrlLength: updatedUser.coverPhotoUrl?.length || 0,
        });
        
        // ✅ IMPORTANT: Sync API response to localStorage
        const storedUser = getUserFromStorage(userProfile.email);
        if (storedUser) {
          const syncedData = {
            ...updatedUser,
            password: storedUser.password, // Keep existing password
          };
          syncUserFromAPI(syncedData);
          
          console.log('✅ Profile synced to localStorage:', {
            email: syncedData.email,
            hasPhotoUrl: !!syncedData.photoUrl,
            photoUrlLength: syncedData.photoUrl?.length || 0,
            hasCoverPhotoUrl: !!syncedData.coverPhotoUrl,
            coverPhotoUrlLength: syncedData.coverPhotoUrl?.length || 0,
          });
        }
        
        console.log('✅ Profile update synced to API and localStorage');
      } catch (error) {
        console.log('⚠️ API update failed, using localStorage fallback:', error);
        
        // ✅ Fallback: Update localStorage with local data
        if (userProfile.email) {
          updateUserInStorage(userProfile.email, {
            ...newProfile,
            completedQuizzes,
          });
          console.log('✅ Profile update saved to localStorage (fallback mode)');
        }
      }
    };
    
    updateProfileAsync();
  };

  const handleStartLesson = (moduleId: number) => {
    setSelectedModuleId(moduleId);
    setCurrentPage('lesson-content');
  };

  const handleQuizComplete = async (quizId: number, score: number, totalQuestions: number, maxPoints: number) => {
    const pointsEarned = Math.floor((score / totalQuestions) * maxPoints);
    
    const completedQuiz: CompletedQuiz = {
      quizId,
      completedAt: new Date().toISOString(),
      score,
      pointsEarned,
    };

    const newCompletedQuizzes = [...completedQuizzes, completedQuiz];
    const newProfile = {
      ...userProfile,
      totalPoints: userProfile.totalPoints + pointsEarned,
      quizzesCompleted: userProfile.quizzesCompleted + 1,
    };

    // ✅ Optimistic update - update UI immediately
    setCompletedQuizzes(newCompletedQuizzes);
    setUserProfile(newProfile);
    
    // ✅ Try to update via API first
    try {
      const { completeQuiz } = await import('./utils/api');
      const updatedUser = await completeQuiz(userProfile.email, quizId, score, pointsEarned);
      
      // ✅ IMPORTANT: Sync API response to localStorage
      const storedUser = getUserFromStorage(userProfile.email);
      if (storedUser) {
        syncUserFromAPI({
          ...updatedUser,
          password: storedUser.password, // Keep existing password
        });
      }
      
      // Update UI with API response
      setUserProfile(updatedUser);
      setCompletedQuizzes(updatedUser.completedQuizzes);
      
      console.log('✅ Quiz completion synced to API and localStorage');
    } catch (error) {
      console.log('⚠️ API update failed, using localStorage fallback:', error);
      
      // ✅ Fallback: Update localStorage with local data
      if (userProfile.email) {
        updateUserInStorage(userProfile.email, {
          ...newProfile,
          completedQuizzes: newCompletedQuizzes,
        });
        console.log('✅ Quiz completion saved to localStorage');
      }
    }
  };

  const renderPage = () => {
    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    const pageTransition = {
      duration: 0.3,
      ease: 'easeInOut'
    };

    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <HomePage onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} />
          </motion.div>
        );
      case 'learn':
        return (
          <motion.div
            key="learn"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LearnPage isLoggedIn={isLoggedIn} onNavigate={setCurrentPage} onStartLesson={handleStartLesson} />
          </motion.div>
        );
      case 'quiz':
        return (
          <motion.div
            key="quiz"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <QuizPage isLoggedIn={isLoggedIn} onNavigate={setCurrentPage} userName={userName} onQuizComplete={handleQuizComplete} completedQuizzes={completedQuizzes.map(cq => cq.quizId)} />
          </motion.div>
        );
      case 'leaderboard':
        return (
          <motion.div
            key="leaderboard"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LeaderboardPage 
              isLoggedIn={isLoggedIn}
              currentUser={isLoggedIn ? {
                name: userName,
                totalPoints: userProfile.totalPoints,
                quizzesCompleted: userProfile.quizzesCompleted,
                profilePhoto: userProfile.photoUrl,
                coverPhoto: userProfile.coverPhotoUrl,
                email: userProfile.email,
                location: userProfile.location,
                joinDate: userProfile.joinDate,
                bio: userProfile.bio,
              } : undefined}
              onNavigate={setCurrentPage}
            />
          </motion.div>
        );
      case 'login':
        return (
          <motion.div
            key="login"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />
          </motion.div>
        );
      case 'register':
        return (
          <motion.div
            key="register"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <RegisterPage onNavigate={setCurrentPage} />
          </motion.div>
        );
      case 'forgot-password':
        return (
          <motion.div
            key="forgot-password"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ForgotPasswordPage onNavigate={setCurrentPage} />
          </motion.div>
        );
      case 'profile':
        return (
          <motion.div
            key="profile"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ProfilePage 
              isLoggedIn={isLoggedIn} 
              onNavigate={setCurrentPage} 
              userProfile={userProfile}
              completedQuizzes={completedQuizzes}
            />
          </motion.div>
        );
      case 'edit-profile':
        return (
          <motion.div
            key="edit-profile"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <EditProfilePage 
              isLoggedIn={isLoggedIn} 
              onNavigate={setCurrentPage} 
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
            />
          </motion.div>
        );
      case 'lesson-content':
        return (
          <motion.div
            key="lesson-content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LessonContentPage 
              moduleId={selectedModuleId || 1}
              onNavigate={setCurrentPage}
            />
          </motion.div>
        );
      case 'privacy-policy':
      case 'terms-of-service':
      case 'cookie-policy':
      case 'disclaimer':
      case 'documentation':
      case 'tutorials':
      case 'blog':
      case 'community':
        return (
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LegalPage 
              type={currentPage}
              onNavigate={setCurrentPage}
            />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="default"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <HomePage onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} />
          </motion.div>
        );
    }
  };

  // ✅ Auto-restore session on app load (persist login after refresh)
  useEffect(() => {
    const session = getUserSession();
    if (session && session.isLoggedIn) {
      // Load full user data from storage using email
      const storedUser = getUserFromStorage(session.email);
      if (storedUser) {
        setUserProfile(storedUser);
        setCompletedQuizzes(storedUser.completedQuizzes);
        setUserName(storedUser.name);
        setIsLoggedIn(true);
      } else {
        // Session exists but user data not found - clear invalid session
        clearUserSession();
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <MatrixBackground />
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
        userAvatar={userProfile.avatar}
        userPhoto={userProfile.photoUrl}
      />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
      {currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'forgot-password' && <Footer onNavigate={setCurrentPage} />}
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'rgb(30 41 59 / 0.9)',
            color: 'rgb(226 232 240)',
            border: '1px solid rgb(168 85 247 / 0.3)',
            backdropFilter: 'blur(10px)',
          },
          className: 'toast-custom',
        }}
      />
    </div>
  );
}

export default App;