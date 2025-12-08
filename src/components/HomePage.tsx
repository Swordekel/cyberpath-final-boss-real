import { Shield, BookOpen, Trophy, Target, Lock, Code, ArrowRight, Zap, Users, Award } from 'lucide-react';
import { Page } from '../App';
import { motion } from 'motion/react';
import { useState } from 'react';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
}

export function HomePage({ onNavigate, isLoggedIn }: HomePageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Learning',
      description: 'Pelajari konsep cybersecurity dengan materi interaktif dan mudah dipahami',
      color: 'from-purple-500 to-violet-500',
      delay: 0.1,
    },
    {
      icon: Target,
      title: 'Quiz & Challenges',
      description: 'Uji pengetahuan Anda dengan quiz menarik dan tantangan praktis',
      color: 'from-fuchsia-500 to-pink-500',
      delay: 0.2,
    },
    {
      icon: Trophy,
      title: 'Leaderboard',
      description: 'Bersaing dengan pengguna lain dan raih posisi teratas di leaderboard',
      color: 'from-violet-500 to-purple-500',
      delay: 0.3,
    },
  ];

  const topics = [
    { icon: Lock, title: 'Network Security', color: 'text-purple-400', bg: 'bg-purple-500/10', delay: 0.1 },
    { icon: Shield, title: 'Cryptography', color: 'text-violet-400', bg: 'bg-violet-500/10', delay: 0.2 },
    { icon: Code, title: 'Secure Coding', color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', delay: 0.3 },
    { icon: Target, title: 'Penetration Testing', color: 'text-purple-400', bg: 'bg-purple-500/10', delay: 0.4 },
  ];

  const stats = [
    { icon: Users, label: 'Active Learners', value: '10K+', delay: 0.1 },
    { icon: BookOpen, label: 'Course Modules', value: '50+', delay: 0.2 },
    { icon: Award, label: 'Certificates', value: '5K+', delay: 0.3 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Glow Effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transform: 'translate(-50%, -50%)' }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="relative"
              >
                <Shield className="w-20 h-20 text-purple-400" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Shield className="w-20 h-20 text-purple-400" />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-white mb-4">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">CyberPath</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 max-w-2xl mx-auto mb-8"
            >
              Platform edukasi cybersecurity terbaik untuk mempelajari keamanan siber dari dasar hingga mahir. 
              Mulai perjalanan Anda dalam dunia cyber security bersama kami.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              {isLoggedIn ? (
                <>
                  <motion.button
                    onClick={() => onNavigate('learn')}
                    className="group px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg transition-all shadow-lg shadow-purple-500/50 relative overflow-hidden"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Mulai Belajar
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  <motion.button
                    onClick={() => onNavigate('quiz')}
                    className="px-8 py-3 bg-transparent border-2 border-purple-400 text-purple-400 rounded-lg hover:bg-purple-400/10 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ambil Quiz
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => onNavigate('register')}
                    className="group px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg transition-all shadow-lg shadow-purple-500/50 relative overflow-hidden"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Daftar Sekarang
                      <Zap className="w-4 h-4" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  <motion.button
                    onClick={() => onNavigate('login')}
                    className="px-8 py-3 bg-transparent border-2 border-purple-400 text-purple-400 rounded-lg hover:bg-purple-400/10 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay }}
                className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 text-center"
                whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.6)' }}
              >
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl text-white mb-1">{stat.value}</div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white mb-12"
          >
            Mengapa CyberPath?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="relative bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 overflow-hidden group cursor-pointer"
                whileHover={{ y: -10, borderColor: 'rgba(168, 85, 247, 0.6)' }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={hoveredFeature === index ? { scale: 1.5, rotate: 180 } : { scale: 0, rotate: 0 }}
                  transition={{ duration: 0.6 }}
                />
                
                <motion.div
                  className={`bg-gradient-to-br ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>

                <h3 className="text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>

                <motion.div
                  className="mt-4 flex items-center gap-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white mb-12"
          >
            Topik yang Dipelajari
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: topic.delay }}
                className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 text-center cursor-pointer group relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(168, 85, 247, 0.5)',
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
                }}
              >
                <motion.div
                  className={`absolute inset-0 ${topic.bg} opacity-0 group-hover:opacity-100 transition-opacity`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <topic.icon className={`w-12 h-12 ${topic.color} mx-auto mb-4`} />
                </motion.div>
                <h4 className="text-white relative z-10">{topic.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-4">Siap Memulai Perjalanan Cyber Anda?</h2>
            <p className="text-gray-300 mb-8">
              Bergabunglah dengan ribuan pengguna lain yang telah meningkatkan skill cybersecurity mereka
            </p>
            {!isLoggedIn && (
              <motion.button
                onClick={() => onNavigate('register')}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg transition-all shadow-lg shadow-purple-500/50"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Mulai Gratis Sekarang
              </motion.button>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
