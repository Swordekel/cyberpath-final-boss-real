import { Shield, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Page } from '../App';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Home', page: 'home' as Page },
        { name: 'Learn', page: 'learn' as Page },
        { name: 'Quiz', page: 'quiz' as Page },
        { name: 'Leaderboard', page: 'leaderboard' as Page },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', page: 'documentation' as Page },
        { name: 'Tutorials', page: 'tutorials' as Page },
        { name: 'Blog', page: 'blog' as Page },
        { name: 'Community', page: 'community' as Page },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', page: null },
        { name: 'Careers', page: null },
        { name: 'Contact', page: null },
        { name: 'Partners', page: null },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', page: 'privacy-policy' as Page },
        { name: 'Terms of Service', page: 'terms-of-service' as Page },
        { name: 'Cookie Policy', page: 'cookie-policy' as Page },
        { name: 'Disclaimer', page: 'disclaimer' as Page },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Swordekel/CyberPath-Education-Cyber.git', label: 'GitHub', enabled: true },
    { icon: Twitter, href: '#', label: 'Twitter', enabled: false },
    { icon: Linkedin, href: '#', label: 'LinkedIn', enabled: false },
    { icon: Mail, href: '#', label: 'Email', enabled: false },
  ];

  const handleSubscribe = () => {
    if (email) {
      toast.success('You have successfully subscribed to our newsletter!');
      setEmail('');
    } else {
      toast.error('Please enter your email address.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <footer className="relative bg-slate-900/80 border-t border-purple-500/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-8 h-8 text-purple-400" />
              <span className="text-purple-400 tracking-wider">CyberPath</span>
            </motion.div>
            <p className="text-gray-400 text-sm mb-4">
              Platform edukasi cybersecurity terbaik untuk mempelajari keamanan siber.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                social.enabled ? (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-slate-800 border border-purple-500/30 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-400/50 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ) : (
                  <motion.div
                    key={index}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-gray-600 cursor-not-allowed opacity-50"
                    title="Coming soon"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.div>
                )
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-white mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.page && onNavigate ? (
                      <motion.button
                        onClick={() => onNavigate(link.page!)}
                        className="text-gray-400 text-sm hover:text-purple-400 transition-colors text-left"
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.button>
                    ) : (
                      <motion.span
                        className="text-gray-400 text-sm cursor-not-allowed opacity-50"
                        title="Coming soon"
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-purple-500/30 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and cybersecurity tips
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubscribe}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} CyberPath. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> by CyberPath Team
          </p>
        </div>
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.5) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
    </footer>
  );
}