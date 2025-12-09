import { BookOpen, Lock, Shield, Code, Network, Eye, CheckCircle, Clock, Play, Star, Database, Bug, Smartphone, Cloud, FileSearch } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Page } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface LearnPageProps {
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
  onStartLesson?: (moduleId: number) => void;
}

interface Module {
  id: number;
  title: string;
  description: string;
  icon: any;
  duration: string;
  lessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  progress: number;
  rating: number;
}

interface ModuleCompletion {
  moduleId: number;
  completedAt: string;
  lessonsCompleted: number;
  totalLessons: number;
}

export function LearnPage({ isLoggedIn, onNavigate, onStartLesson }: LearnPageProps) {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const modules: Module[] = [
    {
      id: 1,
      title: 'Introduction to Cybersecurity',
      description: 'Pelajari dasar-dasar cybersecurity, konsep ancaman, dan prinsip keamanan informasi.',
      icon: Shield,
      duration: '2 jam',
      lessons: 8,
      difficulty: 'Beginner',
      completed: false,
      progress: 0,
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Network Security Fundamentals',
      description: 'Memahami keamanan jaringan, firewall, VPN, dan protokol keamanan.',
      icon: Network,
      duration: '3 jam',
      lessons: 12,
      difficulty: 'Intermediate',
      completed: false,
      progress: 0,
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Cryptography Basics',
      description: 'Pelajari enkripsi, hashing, digital signatures, dan algoritma kriptografi.',
      icon: Lock,
      duration: '2.5 jam',
      lessons: 10,
      difficulty: 'Intermediate',
      completed: false,
      progress: 0,
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Secure Coding Practices',
      description: 'Teknik coding yang aman, mencegah vulnerability seperti SQL injection dan XSS.',
      icon: Code,
      duration: '4 jam',
      lessons: 15,
      difficulty: 'Advanced',
      completed: false,
      progress: 0,
      rating: 4.9,
    },
    {
      id: 5,
      title: 'Ethical Hacking & Penetration Testing',
      description: 'Belajar teknik ethical hacking dan penetration testing secara legal dan etis.',
      icon: Eye,
      duration: '5 jam',
      lessons: 20,
      difficulty: 'Advanced',
      completed: false,
      progress: 0,
      rating: 5.0,
    },
    {
      id: 6,
      title: 'Web Application Security',
      description: 'Pelajari keamanan aplikasi web, OWASP Top 10, dan teknik mitigasi vulnerability.',
      icon: Bug,
      duration: '3.5 jam',
      lessons: 14,
      difficulty: 'Intermediate',
      completed: false,
      progress: 0,
      rating: 4.8,
    },
    {
      id: 7,
      title: 'Mobile Security',
      description: 'Keamanan aplikasi mobile (Android & iOS), reverse engineering, dan secure mobile development.',
      icon: Smartphone,
      duration: '4 jam',
      lessons: 16,
      difficulty: 'Advanced',
      completed: false,
      progress: 0,
      rating: 4.7,
    },
    {
      id: 8,
      title: 'Cloud Security',
      description: 'Memahami keamanan cloud computing, AWS/Azure security, dan best practices.',
      icon: Cloud,
      duration: '3 jam',
      lessons: 13,
      difficulty: 'Intermediate',
      completed: false,
      progress: 0,
      rating: 4.9,
    },
    {
      id: 9,
      title: 'Database Security',
      description: 'Keamanan database, SQL injection prevention, encryption, dan access control.',
      icon: Database,
      duration: '2.5 jam',
      lessons: 11,
      difficulty: 'Intermediate',
      completed: false,
      progress: 0,
      rating: 4.6,
    },
    {
      id: 10,
      title: 'Digital Forensics & Incident Response',
      description: 'Teknik forensik digital, analisis malware, dan respons terhadap insiden keamanan.',
      icon: FileSearch,
      duration: '4.5 jam',
      lessons: 18,
      difficulty: 'Advanced',
      completed: false,
      progress: 0,
      rating: 4.9,
    },
  ];

  useEffect(() => {
    const fetchCompletedModules = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          console.log('[LearnPage] No user found in localStorage');
          return;
        }
        
        const user = JSON.parse(userStr);
        console.log('[LearnPage] Fetching module completions for:', user.email);

        // First, try to load from localStorage immediately for faster UI
        const localCompletions = localStorage.getItem('completedModules');
        if (localCompletions) {
          try {
            const completedIds = JSON.parse(localCompletions);
            console.log('[LearnPage] Loaded from localStorage:', completedIds);
            setCompletedModules(new Set(completedIds));
          } catch (e) {
            console.error('[LearnPage] Error parsing localStorage completions:', e);
          }
        }

        // Then fetch from server to sync
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-094aa1ac/module/completions/${encodeURIComponent(user.email)}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.log('[LearnPage] Server response not OK:', response.status, errorText);
          return; // Keep localStorage data
        }

        const data = await response.json();
        console.log('[LearnPage] Server response data:', data);
        
        if (data.completions && Array.isArray(data.completions)) {
          console.log('[LearnPage] Found completions:', data.completions.length);
          const completedIds = new Set(data.completions.map((c: any) => c.moduleId));
          console.log('[LearnPage] Completed module IDs:', Array.from(completedIds));
          setCompletedModules(completedIds);
          
          // Also save to localStorage for offline access
          localStorage.setItem('completedModules', JSON.stringify(Array.from(completedIds)));
        } else {
          console.log('[LearnPage] No completions array in response');
        }
      } catch (error) {
        console.error('[LearnPage] Error fetching module completions:', error);
        // Keep localStorage data on error
      }
    };

    if (isLoggedIn) {
      fetchCompletedModules();
      
      // Also add event listener for storage changes (cross-tab sync)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'completedModules' && e.newValue) {
          try {
            const completedIds = JSON.parse(e.newValue);
            console.log('[LearnPage] Storage changed, updating:', completedIds);
            setCompletedModules(new Set(completedIds));
          } catch (error) {
            console.error('[LearnPage] Error parsing storage change:', error);
          }
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [isLoggedIn, refreshTrigger]);

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
            Anda harus login terlebih dahulu untuk mengakses materi pembelajaran
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Intermediate':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Advanced':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-white mb-4">Learning Modules</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Pilih modul pembelajaran dan mulai perjalanan Anda dalam menguasai cybersecurity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(module.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 cursor-pointer group relative overflow-hidden"
              whileHover={{ 
                y: -10,
                borderColor: 'rgba(168, 85, 247, 0.6)',
                boxShadow: '0 10px 40px rgba(168, 85, 247, 0.3)'
              }}
              onClick={() => setSelectedModule(module)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={hoveredCard === module.id ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <module.icon className="w-6 h-6 text-purple-400" />
                  </motion.div>
                  {completedModules.has(module.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </motion.div>
                  )}
                </div>
                
                <h3 className="text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {module.title}
                </h3>
                
                <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                  {module.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs border ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-400">{module.rating}</span>
                  </div>
                </div>

                {module.progress > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${module.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{module.lessons} lessons</span>
                  </div>
                </div>

                {completedModules.has(module.id) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm mb-3 bg-green-400/10 rounded-lg px-3 py-2 border border-green-400/30"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Completed! Available for review</span>
                  </motion.div>
                )}

                <motion.button
                  className={`w-full px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                    completedModules.has(module.id)
                      ? 'bg-slate-700/50 text-gray-300 border border-slate-600'
                      : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {completedModules.has(module.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Review Module
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Mulai Belajar
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Module Detail Modal */}
        <AnimatePresence>
          {selectedModule && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedModule(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 border border-purple-500/30 rounded-xl p-8 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className="bg-purple-500/10 w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <selectedModule.icon className="w-8 h-8 text-purple-400" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-white">{selectedModule.title}</h2>
                      {completedModules.has(selectedModule.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-gray-400">{selectedModule.description}</p>
                    {completedModules.has(selectedModule.id) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-green-400 text-sm mt-3 bg-green-400/10 rounded-lg px-3 py-2 border border-green-400/30 inline-flex"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Module Completed!</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <motion.div
                    className="bg-slate-900/50 rounded-lg p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-white">{selectedModule.duration}</p>
                  </motion.div>
                  <motion.div
                    className="bg-slate-900/50 rounded-lg p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <BookOpen className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Lessons</p>
                    <p className="text-white">{selectedModule.lessons}</p>
                  </motion.div>
                  <motion.div
                    className="bg-slate-900/50 rounded-lg p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Level</p>
                    <p className="text-white">{selectedModule.difficulty}</p>
                  </motion.div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStartLesson && onStartLesson(selectedModule.id)}
                  >
                    <Play className="w-5 h-5" />
                    Start Learning
                  </motion.button>
                  <motion.button
                    onClick={() => setSelectedModule(null)}
                    className="px-6 py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}