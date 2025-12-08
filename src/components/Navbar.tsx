import { Shield, Menu, X, LogOut, Sparkles, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../App';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
  userName: string;
  onLogout: () => void;
  userAvatar: string;
  userPhoto: string;
}

export function Navbar({ currentPage, onNavigate, isLoggedIn, userName, onLogout, userAvatar, userPhoto }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'learn' as Page, label: 'Learn' },
    { id: 'quiz' as Page, label: 'Quiz' },
    { id: 'leaderboard' as Page, label: 'Leaderboard' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-slate-900/80 backdrop-blur-md border-b border-purple-500/30 sticky top-0 z-50 shadow-lg shadow-purple-500/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative"
              animate={{ 
                filter: [
                  'drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))',
                  'drop-shadow(0 0 12px rgba(168, 85, 247, 0.8))',
                  'drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-8 h-8 text-purple-400" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-purple-400 tracking-wider group-hover:text-purple-300 transition-colors leading-none">
                CyberPath
              </span>
              <span className="text-xs text-gray-500 leading-none">Learn Security</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-md transition-all relative ${
                  currentPage === item.id
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-purple-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-purple-400/10 rounded-md border border-purple-400/50"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
            
            {isLoggedIn ? (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-purple-500/30 relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-400/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {userPhoto ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-400/50">
                      <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <span className="text-2xl">{userAvatar}</span>
                  )}
                  <span className="text-purple-400">{userName}</span>
                  <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserMenu(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-purple-500/30 rounded-lg shadow-xl overflow-hidden z-50"
                      >
                        <button
                          onClick={() => {
                            onNavigate('profile');
                            setShowUserMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-gray-300 hover:bg-purple-400/10 hover:text-purple-400 transition-all flex items-center gap-2"
                        >
                          <User className="w-4 h-4" />
                          View Profile
                        </button>
                        <div className="border-t border-purple-500/30" />
                        <button
                          onClick={() => {
                            onLogout();
                            setShowUserMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-400/10 transition-all flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <motion.button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-purple-400 hover:bg-purple-400/10 rounded-md transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
                <motion.button
                  onClick={() => onNavigate('register')}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-md hover:from-purple-600 hover:to-violet-600 transition-all shadow-lg shadow-purple-500/30"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden text-gray-300 hover:text-purple-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-all ${
                      currentPage === item.id
                        ? 'text-purple-400 bg-purple-400/10'
                        : 'text-gray-300 hover:text-purple-400 hover:bg-purple-400/5'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                {isLoggedIn ? (
                  <>
                    <div className="text-purple-400 px-3 py-2 flex items-center gap-2">
                      {userPhoto ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-400/50">
                          <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <span className="text-2xl">{userAvatar}</span>
                      )}
                      {userName}
                    </div>
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-purple-400/5 rounded-md flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 bg-red-500/20 text-red-400 rounded-md"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onNavigate('login');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-purple-400 hover:bg-purple-400/10 rounded-md"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('register');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-md"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
