import { User, Mail, MapPin, Globe, Calendar, Trophy, Target, Flame, Edit, Lock, Award, BookOpen, Brain } from 'lucide-react';
import { Page, UserProfile, CompletedQuiz } from '../App';
import { motion } from 'motion/react';
import { getQuizTitle } from '../utils/quizData';

interface ProfilePageProps {
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
  userProfile: UserProfile;
  completedQuizzes: CompletedQuiz[];
}

export function ProfilePage({ isLoggedIn, onNavigate, userProfile, completedQuizzes }: ProfilePageProps) {
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Lock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-white mb-4">Login Required</h2>
          <p className="text-gray-400 mb-6">
            Anda harus login terlebih dahulu untuk mengakses profile
          </p>
          <motion.button
            onClick={() => onNavigate('login')}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login Sekarang
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { icon: Trophy, label: 'Total Points', value: userProfile.totalPoints, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' },
    { icon: Target, label: 'Quizzes Completed', value: userProfile.quizzesCompleted, color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
    { icon: Flame, label: 'Learning Streak', value: `${userProfile.learningStreak} days`, color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
  ];

  // ✅ Dynamic Achievements based on REAL user progress
  const achievements = [
    { 
      icon: Award, 
      title: 'First Quiz', 
      description: 'Completed your first quiz', 
      unlocked: userProfile.quizzesCompleted >= 1  // ✅ Unlock setelah 1 quiz
    },
    { 
      icon: Brain, 
      title: 'Quick Learner', 
      description: 'Complete 10 quizzes', 
      unlocked: userProfile.quizzesCompleted >= 10  // ✅ Unlock setelah 10 quiz
    },
    { 
      icon: Trophy, 
      title: 'Champion', 
      description: 'Reach top 10 leaderboard', 
      unlocked: false  // TODO: Implement leaderboard rank check
    },
    { 
      icon: Flame, 
      title: 'Streak Master', 
      description: '30 day learning streak', 
      unlocked: userProfile.learningStreak >= 30  // ✅ Unlock setelah 30 day streak
    },
  ];

  // ✅ Helper function untuk convert timestamp ke relative time
  const getRelativeTime = (timestamp: string): string => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
  };

  // ✅ Dynamic Recent Activity from REAL completed quizzes
  const recentActivity = completedQuizzes
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()) // Sort newest first
    .slice(0, 5) // Take only 5 most recent
    .map(quiz => ({
      type: 'quiz' as const,
      title: `Completed ${getQuizTitle(quiz.quizId)}`,  // ✅ Use actual quiz name
      points: `+${quiz.pointsEarned}`,
      time: getRelativeTime(quiz.completedAt),
    }));

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header with Cover Photo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden mb-8 relative"
        >
          {/* Cover Photo Banner */}
          <div className="h-48 relative overflow-hidden">
            {userProfile.coverPhotoUrl ? (
              <>
                <img 
                  src={userProfile.coverPhotoUrl} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-pink-500/50"
                  animate={{
                    background: [
                      'linear-gradient(to right, rgba(147, 51, 234, 0.5), rgba(236, 72, 153, 0.5))',
                      'linear-gradient(to right, rgba(236, 72, 153, 0.5), rgba(147, 51, 234, 0.5))',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
              </>
            )}
          </div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              {/* Avatar */}
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-6xl relative overflow-hidden border-4 border-slate-800">
                  {userProfile.photoUrl ? (
                    <img 
                      src={userProfile.photoUrl} 
                      alt={userProfile.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    userProfile.avatar
                  )}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-purple-400/50"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </div>
              </motion.div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
                <h1 className="text-white mb-2">{userProfile.name}</h1>
                <p className="text-gray-400 mb-4">{userProfile.bio}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-400" />
                    {userProfile.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    {userProfile.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-400" />
                    {userProfile.website}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    Joined {new Date(userProfile.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <motion.button
                onClick={() => onNavigate('edit-profile')}
                className="px-6 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all flex items-center gap-2 border border-purple-500/50 mt-4 md:mt-0"
                whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.8)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 text-center"
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(168, 85, 247, 0.6)',
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
              }}
            >
              <motion.div
                className={`${stat.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </motion.div>
              <motion.div
                className="text-3xl text-white mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6"
          >
            <h2 className="text-white mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-400" />
              Achievements
            </h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    achievement.unlocked 
                      ? 'bg-purple-500/10 border border-purple-500/30' 
                      : 'bg-slate-900/30 border border-slate-700 opacity-50'
                  }`}
                  whileHover={achievement.unlocked ? { scale: 1.02, x: 5 } : {}}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      achievement.unlocked ? 'bg-purple-500/20' : 'bg-slate-800'
                    }`}
                    whileHover={achievement.unlocked ? { rotate: 360 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <achievement.icon className={`w-6 h-6 ${achievement.unlocked ? 'text-purple-400' : 'text-gray-600'}`} />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-white text-sm">{achievement.title}</h4>
                    <p className="text-gray-400 text-xs">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <Award className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6"
          >
            <h2 className="text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              Recent Activity
            </h2>
            
            {/* ✅ Empty State for new users */}
            {recentActivity.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <BookOpen className="w-16 h-16 text-purple-400/30 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-white mb-2">No Activity Yet</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Start completing quizzes to see your activity here!
                </p>
                <motion.button
                  onClick={() => onNavigate('quiz')}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Brain className="w-4 h-4" />
                  Take Your First Quiz
                </motion.button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/30 border border-slate-700 hover:border-purple-500/30 transition-all"
                    whileHover={{ scale: 1.02, x: -5 }}
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    <div className="flex-1">
                      <h4 className="text-white text-sm mb-1">{activity.title}</h4>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                    {activity.points && (
                      <span className="text-green-400 text-sm font-semibold">{activity.points}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}