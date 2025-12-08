import { KeyRound, Mail, Lock, ArrowLeft, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { requestPasswordReset, resetPassword } from '../utils/api';
import { checkEmailExists, generateResetCode, resetUserPassword } from '../utils/userStorage';

interface ForgotPasswordPageProps {
  onNavigate: (page: Page) => void;
}

type Step = 'email' | 'reset' | 'success';

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Step 1: Verify Email
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email) {
      setError('Please enter your email');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      setIsLoading(false);
      return;
    }

    try {
      // ✅ Try Supabase API first
      const code = await requestPasswordReset(email);
      setGeneratedCode(code);
      setStep('reset');
    } catch (apiError: any) {
      console.log('Supabase API error, falling back to localStorage:', apiError.message);
      
      // ✅ Fallback to localStorage
      if (!checkEmailExists(email)) {
        setError('Email not found. Please check and try again.');
        setIsLoading(false);
        return;
      }

      // Generate reset code locally
      const code = generateResetCode();
      setGeneratedCode(code);
      setStep('reset');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!resetCode || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (resetCode !== generatedCode) {
      setError('Invalid reset code. Please check and try again.');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // ✅ Try Supabase API first
      await resetPassword(email, resetCode, newPassword);
      
      // ✅ Also update localStorage
      resetUserPassword(email, newPassword);
      
      setStep('success');
      setTimeout(() => {
        onNavigate('login');
      }, 3000);
    } catch (apiError: any) {
      console.log('Supabase API error, falling back to localStorage:', apiError.message);
      
      // ✅ Fallback to localStorage
      const result = resetUserPassword(email, newPassword);
      if (result.success) {
        setStep('success');
        setTimeout(() => {
          onNavigate('login');
        }, 3000);
      } else {
        setError(result.error || 'Failed to reset password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="bg-purple-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative"
            animate={{
              boxShadow: [
                '0 0 20px rgba(168, 85, 247, 0.3)',
                '0 0 40px rgba(168, 85, 247, 0.5)',
                '0 0 20px rgba(168, 85, 247, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <KeyRound className="w-8 h-8 text-purple-400" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400/50"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white mb-2"
          >
            {step === 'email' && 'Reset Password'}
            {step === 'reset' && 'Enter Reset Code'}
            {step === 'success' && 'Password Reset!'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400"
          >
            {step === 'email' && 'Enter your email to receive a reset code'}
            {step === 'reset' && 'Check your reset code below and create a new password'}
            {step === 'success' && 'Your password has been updated successfully'}
          </motion.p>
        </div>

        {/* Forms */}
        <AnimatePresence mode="wait">
          {step === 'email' && (
            <motion.div
              key="email-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8"
            >
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email Address
                  </label>
                  <motion.div
                    className="relative"
                    animate={focusedField === 'email' ? { scale: 1.02 } : { scale: 1 }}
                  >
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm flex items-start gap-2"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all shadow-lg shadow-purple-500/50 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="w-5 h-5" />
                  Send Reset Code
                </motion.button>
              </form>

              {/* Back to Login */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-center"
              >
                <button
                  onClick={() => onNavigate('login')}
                  className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </button>
              </motion.div>
            </motion.div>
          )}

          {step === 'reset' && (
            <motion.div
              key="reset-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Reset Code Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 rounded-xl p-6 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <KeyRound className="w-5 h-5 text-purple-400" />
                  <p className="text-gray-300">Your Reset Code</p>
                </div>
                <motion.div
                  className="text-4xl tracking-widest text-white mb-2 select-all"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  {generatedCode}
                </motion.div>
                <p className="text-sm text-gray-400">
                  Copy this code and enter it below
                </p>
              </motion.div>

              {/* Reset Form */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
                <form onSubmit={handleResetSubmit} className="space-y-6">
                  {/* Reset Code Input */}
                  <div>
                    <label htmlFor="resetCode" className="block text-gray-300 mb-2">
                      Enter Reset Code
                    </label>
                    <motion.div
                      className="relative"
                      animate={focusedField === 'resetCode' ? { scale: 1.02 } : { scale: 1 }}
                    >
                      <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="resetCode"
                        type="text"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        onFocus={() => setFocusedField('resetCode')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all tracking-widest text-center text-xl"
                        placeholder="000000"
                        maxLength={6}
                      />
                    </motion.div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label htmlFor="newPassword" className="block text-gray-300 mb-2">
                      New Password
                    </label>
                    <motion.div
                      className="relative"
                      animate={focusedField === 'newPassword' ? { scale: 1.02 } : { scale: 1 }}
                    >
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onFocus={() => setFocusedField('newPassword')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                        placeholder="••••••••"
                      />
                    </motion.div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <motion.div
                      className="relative"
                      animate={focusedField === 'confirmPassword' ? { scale: 1.02 } : { scale: 1 }}
                    >
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                        placeholder="••••••••"
                      />
                    </motion.div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm flex items-start gap-2"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all shadow-lg shadow-purple-500/50 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Reset Password
                  </motion.button>
                </form>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [0, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
              </motion.div>
              <h2 className="text-white mb-3">Password Reset Successful!</h2>
              <p className="text-gray-400 mb-6">
                Your password has been updated. You can now login with your new password.
              </p>
              <div className="flex gap-2 justify-center">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">Redirecting to login...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}