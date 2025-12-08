import { Trophy, Medal, Award, Crown, Users, TrendingUp, Flame, Calendar, Clock, Star, Sparkles, User, X, Mail, MapPin, Calendar as CalendarIcon, Award as AwardIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { getLeaderboardUsers } from '../utils/userStorage';
import { getLeaderboard } from '../utils/api';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  quizzesTaken: number;
  avatar: string;
  streak: number;
  title?: string;
  profilePhoto?: string; // URL to uploaded photo
  coverPhoto?: string; // URL to uploaded cover photo
  email?: string;
  location?: string;
  joinDate?: string;
  bio?: string;
  achievements?: string[];
  isCurrentUser?: boolean; // Flag untuk highlight user yang login
}

interface CurrentUser {
  name: string;
  totalPoints: number;
  quizzesCompleted: number;
  profilePhoto?: string;
  coverPhoto?: string;
  email?: string;
  location?: string;
  joinDate?: string;
  bio?: string;
}

interface LeaderboardPageProps {
  isLoggedIn?: boolean;
  currentUser?: CurrentUser;
  onNavigate?: (page: string) => void;
}

type LeaderboardPeriod = 'daily' | 'weekly' | 'season';

// Avatar Display Component
function AvatarDisplay({ entry, size = 'md' }: { entry: LeaderboardEntry; size?: 'sm' | 'md' | 'lg' }) {
  // ✅ Handle undefined entry
  if (!entry) {
    const sizeClasses = {
      sm: 'w-12 h-12 text-xl',
      md: 'w-16 h-16 text-2xl',
      lg: 'w-20 h-20 text-3xl'
    };
    
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center`}>
        <User className="w-1/2 h-1/2 text-white" />
      </div>
    );
  }

  const sizeClasses = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl'
  };

  const getRankBorder = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-4 border-yellow-400 shadow-lg shadow-yellow-400/50';
      case 2:
        return 'border-4 border-gray-300 shadow-lg shadow-gray-300/50';
      case 3:
        return 'border-4 border-orange-400 shadow-lg shadow-orange-400/50';
      default:
        return 'border-2 border-purple-400/50';
    }
  };

  if (entry.profilePhoto) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${getRankBorder(entry.rank)} bg-slate-700`}>
        <img 
          src={entry.profilePhoto} 
          alt={entry.name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Fallback to emoji or default icon
  return (
    <div className={`${sizeClasses[size]} rounded-full ${getRankBorder(entry.rank)} bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center`}>
      {entry.avatar ? (
        <span>{entry.avatar}</span>
      ) : (
        <User className="w-1/2 h-1/2 text-white" />
      )}
    </div>
  );
}

export function LeaderboardPage({ isLoggedIn, currentUser, onNavigate }: LeaderboardPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<LeaderboardPeriod>('season');
  const [selectedProfile, setSelectedProfile] = useState<LeaderboardEntry | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);
  const [dataSource, setDataSource] = useState<'api' | 'local'>('local');

  // ✅ Fetch leaderboard data on component mount
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoadingLeaderboard(true);
      
      try {
        // ✅ Try to fetch from API first (gets ALL users across all devices)
        const apiUsers = await getLeaderboard();
        
        // Convert API data to LeaderboardEntry format
        let leaderboardEntries: LeaderboardEntry[] = apiUsers.map((user, index) => ({
          rank: index + 1,
          name: user.name,
          score: user.totalPoints,
          quizzesTaken: user.quizzesCompleted,
          avatar: user.avatar || '👨‍💻',
          streak: user.learningStreak,
          profilePhoto: user.photoUrl,
          coverPhoto: user.coverPhotoUrl,
          email: user.email,
          location: user.location,
          joinDate: user.joinDate,
          bio: user.bio,
          // Assign titles for top 3 in Season
          title: selectedPeriod === 'season' && index === 0 ? '👑 Legendary Champion' :
                 selectedPeriod === 'season' && index === 1 ? '⚔️ Elite Guardian' :
                 selectedPeriod === 'season' && index === 2 ? '🛡️ Master Defender' :
                 undefined,
        }));

        // Mark current user
        if (isLoggedIn && currentUser) {
          leaderboardEntries = leaderboardEntries.map(entry => ({
            ...entry,
            isCurrentUser: entry.email === currentUser.email,
          }));
        }

        setLeaderboardData(leaderboardEntries);
        setDataSource('api');
        console.log('✅ Leaderboard loaded from API - showing ALL users');
      } catch (error) {
        console.log('⚠️ API unavailable, using localStorage fallback');
        console.log('Error details:', error);
        
        // ✅ Fallback to localStorage (only shows users who logged in on THIS device)
        const storedUsers = getLeaderboardUsers();
        
        let leaderboardEntries: LeaderboardEntry[] = storedUsers.map((user, index) => ({
          rank: index + 1,
          name: user.name,
          score: user.totalPoints,
          quizzesTaken: user.quizzesCompleted,
          avatar: user.avatar,
          streak: user.learningStreak,
          profilePhoto: user.photoUrl,
          coverPhoto: user.coverPhotoUrl,
          email: user.email,
          location: user.location,
          joinDate: user.joinDate,
          bio: user.bio,
          title: selectedPeriod === 'season' && index === 0 ? '👑 Legendary Champion' :
                 selectedPeriod === 'season' && index === 1 ? '⚔️ Elite Guardian' :
                 selectedPeriod === 'season' && index === 2 ? '🛡️ Master Defender' :
                 undefined,
        }));

        // Mark current user
        if (isLoggedIn && currentUser) {
          leaderboardEntries = leaderboardEntries.map(entry => ({
            ...entry,
            isCurrentUser: entry.email === currentUser.email,
          }));
        }

        setLeaderboardData(leaderboardEntries);
        setDataSource('local');
        console.log('⚠️ Leaderboard loaded from localStorage - only showing users on this device');
      } finally {
        setIsLoadingLeaderboard(false);
      }
    };

    fetchLeaderboard();
  }, [selectedPeriod, isLoggedIn, currentUser]);

  const getPeriodIcon = (period: LeaderboardPeriod) => {
    switch (period) {
      case 'daily':
        return Calendar;
      case 'weekly':
        return Clock;
      case 'season':
        return Trophy;
    }
  };

  const getPeriodLabel = (period: LeaderboardPeriod) => {
    switch (period) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'season':
        return 'Season';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-gray-400">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-400/50';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50';
      case 3:
        return 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-400/50';
      default:
        return 'bg-slate-800/30 border-slate-700';
    }
  };

  const getTitleBadge = (title?: string) => {
    if (!title) return null;
    
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-full text-xs text-white border-2 border-yellow-400 shadow-lg z-20"
      >
        <motion.span
          animate={{ 
            textShadow: [
              '0 0 5px rgba(251, 191, 36, 0.5)',
              '0 0 20px rgba(251, 191, 36, 0.8)',
              '0 0 5px rgba(251, 191, 36, 0.5)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {title}
        </motion.span>
      </motion.div>
    );
  };

  // ✅ Calculate real stats from leaderboard data
  const totalPlayers = leaderboardData.length;
  const totalQuizzes = leaderboardData.reduce((sum, entry) => sum + entry.quizzesTaken, 0);
  const avgScore = totalPlayers > 0 
    ? Math.round(leaderboardData.reduce((sum, entry) => sum + entry.score, 0) / totalPlayers) 
    : 0;

  const stats = [
    { icon: Users, label: 'Total Players', value: totalPlayers.toLocaleString(), delay: 0.1 },
    { icon: Trophy, label: 'Quizzes Taken', value: totalQuizzes.toLocaleString(), delay: 0.2 },
    { icon: TrendingUp, label: 'Avg Score', value: avgScore.toLocaleString(), delay: 0.3 },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          >
            <Trophy className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white mb-4"
          >
            Leaderboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto mb-6"
          >
            Lihat ranking pengguna terbaik berdasarkan total skor dari quiz yang telah diselesaikan
          </motion.p>

          {/* Season Title Info */}
          {selectedPeriod === 'season' && leaderboardData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 rounded-full px-6 py-3 mb-6"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-purple-300 text-sm">Top 3 players earn exclusive titles!</span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.div>
          )}
        </div>

        {/* ✅ EMPTY STATE - No users yet */}
        {leaderboardData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <Trophy className="w-24 h-24 text-purple-400/30 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-white mb-3">No Leaderboard Data Yet</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Be the first to appear on the leaderboard! Complete quizzes to earn points and climb the ranks.
            </p>
            <motion.button
              onClick={() => onNavigate && onNavigate('quiz')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all inline-flex items-center gap-2 shadow-lg shadow-purple-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trophy className="w-5 h-5" />
              Take Your First Quiz
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* Period Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-4 mb-8"
            >
              {(['daily', 'weekly', 'season'] as const).map((period) => {
                const Icon = getPeriodIcon(period);
                return (
                  <motion.button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                      selectedPeriod === period
                        ? 'bg-purple-500/20 border-purple-400 text-purple-400'
                        : 'bg-slate-800/50 border-slate-600 text-gray-400 hover:border-purple-400/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{getPeriodLabel(period)}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Top 3 Podium */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Second Place */}
              <motion.div
                key={`${selectedPeriod}-2`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="md:order-1 order-2"
              >
                <motion.div
                  className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-gray-400/50 rounded-xl p-6 text-center transform md:translate-y-8 relative"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(156, 163, 175, 0.5)',
                    y: 0
                  }}
                >
                  {getTitleBadge(leaderboardData[1]?.title)}
                  
                  <motion.div
                    className="flex justify-center mb-3"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AvatarDisplay entry={leaderboardData[1]} size="md" />
                  </motion.div>
                  <Medal className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-white mb-2">{leaderboardData[1]?.name}</h3>
                  <motion.div
                    className="text-3xl text-purple-400 mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    {leaderboardData[1]?.score.toLocaleString()}
                  </motion.div>
                  <p className="text-gray-400 text-sm">{leaderboardData[1]?.quizzesTaken} quizzes</p>
                </motion.div>
              </motion.div>

              {/* First Place */}
              <motion.div
                key={`${selectedPeriod}-1`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="md:order-2 order-1"
              >
                <motion.div
                  className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border-2 border-yellow-400/50 rounded-xl p-6 text-center relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(250, 204, 21, 0.6)'
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {getTitleBadge(leaderboardData[0]?.title)}
                  
                  <motion.div
                    className="flex justify-center mb-3 relative z-10"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AvatarDisplay entry={leaderboardData[0]} size="lg" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  </motion.div>
                  <h3 className="text-white mb-2 relative z-10">{leaderboardData[0]?.name}</h3>
                  <motion.div
                    className="text-4xl text-yellow-400 mb-1 relative z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                  >
                    {leaderboardData[0]?.score.toLocaleString()}
                  </motion.div>
                  <p className="text-gray-400 text-sm relative z-10">{leaderboardData[0]?.quizzesTaken} quizzes</p>
                </motion.div>
              </motion.div>

              {/* Third Place */}
              <motion.div
                key={`${selectedPeriod}-3`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="md:order-3 order-3"
              >
                <motion.div
                  className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-orange-400/50 rounded-xl p-6 text-center transform md:translate-y-12 relative"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(251, 146, 60, 0.5)',
                    y: 0
                  }}
                >
                  {getTitleBadge(leaderboardData[2]?.title)}
                  
                  <motion.div
                    className="flex justify-center mb-3"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    <AvatarDisplay entry={leaderboardData[2]} size="md" />
                  </motion.div>
                  <Award className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                  <h3 className="text-white mb-2">{leaderboardData[2]?.name}</h3>
                  <motion.div
                    className="text-3xl text-purple-400 mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                  >
                    {leaderboardData[2]?.score.toLocaleString()}
                  </motion.div>
                  <p className="text-gray-400 text-sm">{leaderboardData[2]?.quizzesTaken} quizzes</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Full Leaderboard */}
            <motion.div
              key={selectedPeriod}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-purple-500/30">
                <h2 className="text-white">Rankings - {getPeriodLabel(selectedPeriod)}</h2>
              </div>
              
              <div className="divide-y divide-slate-700">
                {leaderboardData.map((entry, index) => (
                  <motion.div
                    key={`${selectedPeriod}-${entry.rank}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className={`p-4 border-l-4 ${
                      entry.isCurrentUser 
                        ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/20 border-purple-400 ring-2 ring-purple-400/50' 
                        : getRankBg(entry.rank)
                    } hover:bg-slate-700/30 transition-all cursor-pointer relative`}
                    whileHover={{ x: 10 }}
                    onClick={() => setSelectedProfile(entry)}
                  >
                    {/* "YOU" Badge for current user */}
                    {entry.isCurrentUser && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.7 + index * 0.05 }}
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs shadow-lg border-2 border-yellow-400 z-10"
                      >
                        <span className="font-bold">YOU</span>
                      </motion.div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <motion.div
                        className="w-12 flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        {getRankIcon(entry.rank)}
                      </motion.div>

                      {/* Profile Photo/Avatar */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                      >
                        <AvatarDisplay entry={entry} size="sm" />
                      </motion.div>

                      {/* Name & Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-white">{entry.name}</h4>
                          {entry.title && selectedPeriod === 'season' && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.7 + index * 0.05, type: 'spring' }}
                              className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-1 rounded-full text-white border border-yellow-400"
                            >
                              {entry.title}
                            </motion.span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span>{entry.quizzesTaken} quizzes</span>
                          <div className="flex items-center gap-1">
                            <Flame className="w-4 h-4 text-orange-400" />
                            <span>{entry.streak} day streak</span>
                          </div>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <motion.div
                          className="text-2xl text-purple-400"
                          whileHover={{ scale: 1.1 }}
                        >
                          {entry.score.toLocaleString()}
                        </motion.div>
                        <p className="text-gray-400 text-sm">points</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + stat.delay }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 text-center"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: 'rgba(168, 85, 247, 0.6)',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  </motion.div>
                  <p className="text-gray-400 mb-1">{stat.label}</p>
                  <motion.p
                    className="text-white text-2xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + stat.delay, type: 'spring' }}
                  >
                    {stat.value}
                  </motion.p>
                </motion.div>
              ))}
            </div>

            {/* Season Titles Legend */}
            {selectedPeriod === 'season' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-white">Exclusive Season Titles</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div
                    className="bg-slate-800/50 rounded-lg p-4 border border-yellow-400/30"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(250, 204, 21, 0.6)' }}
                  >
                    <div className="text-center mb-2">
                      <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <span className="text-yellow-400">1st Place</span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 rounded-full text-xs text-white border border-yellow-400 text-center">
                      👑 Legendary Champion
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="bg-slate-800/50 rounded-lg p-4 border border-gray-400/30"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(156, 163, 175, 0.6)' }}
                  >
                    <div className="text-center mb-2">
                      <Medal className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <span className="text-gray-300">2nd Place</span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 rounded-full text-xs text-white border border-yellow-400 text-center">
                      ⚔️ Elite Guardian
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="bg-slate-800/50 rounded-lg p-4 border border-orange-400/30"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(251, 146, 60, 0.6)' }}
                  >
                    <div className="text-center mb-2">
                      <Award className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                      <span className="text-orange-400">3rd Place</span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 rounded-full text-xs text-white border border-yellow-400 text-center">
                      🛡️ Master Defender
                    </div>
                  </motion.div>
                </div>
                <p className="text-gray-400 text-sm text-center mt-4">
                  Titles are awarded at the end of each season and displayed permanently on your profile
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Profile Modal */}
      <ProfileModal entry={selectedProfile} onClose={() => setSelectedProfile(null)} />
    </div>
  );
}

// Profile Modal Component
function ProfileModal({ entry, onClose }: { entry: LeaderboardEntry | null; onClose: () => void }) {
  if (!entry) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-purple-500/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-slate-800/80 hover:bg-slate-700 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6 text-gray-300" />
            </button>

            {/* Cover Banner */}
            <div className="h-32 rounded-t-2xl relative overflow-hidden">
              {entry.coverPhoto ? (
                /* Custom Cover Photo */
                <>
                  <img 
                    src={entry.coverPhoto} 
                    alt={`${entry.name} cover`}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay for better text contrast */}
                  <div className="absolute inset-0 bg-black/30" />
                </>
              ) : (
                /* Default Gradient Background */
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
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                  />
                </>
              )}
            </div>

            {/* Profile Photo */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <AvatarDisplay entry={entry} size="lg" />
              </motion.div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8">
            {/* Name and Title */}
            <div className="text-center mb-6">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-3xl mb-2"
              >
                {entry.name}
              </motion.h2>
              
              {entry.title && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full text-sm text-white border-2 border-yellow-400 mb-3"
                >
                  {entry.title}
                </motion.div>
              )}

              {entry.bio && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-300 text-sm max-w-md mx-auto"
                >
                  {entry.bio}
                </motion.p>
              )}
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            >
              <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-purple-500/30">
                <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl text-purple-400 mb-1">#{entry.rank}</div>
                <div className="text-xs text-gray-400">Rank</div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-purple-500/30">
                <Star className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl text-purple-400 mb-1">{entry.score.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Points</div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-purple-500/30">
                <Award className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <div className="text-2xl text-purple-400 mb-1">{entry.quizzesTaken}</div>
                <div className="text-xs text-gray-400">Quizzes</div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-purple-500/30">
                <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl text-purple-400 mb-1">{entry.streak}</div>
                <div className="text-xs text-gray-400">Day Streak</div>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-3 mb-6"
            >
              {entry.email && (
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">{entry.email}</span>
                </div>
              )}

              {entry.location && (
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">{entry.location}</span>
                </div>
              )}

              {entry.joinDate && (
                <div className="flex items-center gap-3 text-gray-300">
                  <CalendarIcon className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">Joined {entry.joinDate}</span>
                </div>
              )}
            </motion.div>

            {/* Achievements */}
            {entry.achievements && entry.achievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <AwardIcon className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-white">Achievements</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {entry.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-full px-3 py-1 text-sm text-purple-300"
                    >
                      {achievement}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}