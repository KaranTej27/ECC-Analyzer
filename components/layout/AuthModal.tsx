'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Command, KeyRound } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, initialTab = 'login' }: AuthModalProps) {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(
        tab === 'login'
          ? 'AUTHENTICATION SUCCESSFUL • REDIRECTING TO TERMINAL...'
          : 'REGISTRATION SUCCESSFUL • REDIRECTING TO TERMINAL...'
      );
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
        router.push('/dashboard');
      }, 1000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#000000]/80 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-md p-8 sm:p-10 rounded-3xl border shadow-2xl z-10 transition-all duration-300 transform scale-100 ${
          isDark
            ? 'bg-[#090909]/95 border-[#151515] text-[#FFFFFF]'
            : 'bg-[#FFFFFF] border-[#E5E5E5] text-[#000000]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Auth Modal"
          className={`absolute top-6 right-6 p-2 rounded-full border transition-colors ${
            isDark
              ? 'border-[#4B4B4B]/30 bg-[#151515] text-[#999999] hover:text-[#FFFFFF] hover:border-[#FFFFFF]'
              : 'border-[#D9D9D9] bg-[#F5F5F5] text-[#4B4B4B] hover:text-[#000000] hover:border-[#000000]'
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-9 h-9 rounded-full border flex items-center justify-center font-mono font-bold text-xs ${
              isDark
                ? 'border-[#4B4B4B] bg-[#151515] text-[#FFFFFF]'
                : 'border-[#D9D9D9] bg-[#F5F5F5] text-[#000000]'
            }`}
          >
            E
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight">ECHO TERMINAL</h3>
            <p className={`text-[11px] font-mono uppercase tracking-wider ${isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'}`}>
              INSTITUTIONAL AUTHENTICATION
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div
          className={`flex items-center p-1 rounded-xl border mb-8 font-mono text-xs ${
            isDark ? 'bg-[#151515] border-[#4B4B4B]/30' : 'bg-[#F5F5F5] border-[#E5E5E5]'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2.5 rounded-lg font-semibold tracking-wider transition-all ${
              tab === 'login'
                ? isDark
                  ? 'bg-[#090909] text-[#FFFFFF] border border-[#4B4B4B]/40 shadow-sm'
                  : 'bg-[#FFFFFF] text-[#000000] border border-[#D9D9D9] shadow-sm'
                : isDark
                ? 'text-[#999999] hover:text-[#FFFFFF]'
                : 'text-[#4B4B4B] hover:text-[#000000]'
            }`}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2.5 rounded-lg font-semibold tracking-wider transition-all ${
              tab === 'register'
                ? isDark
                  ? 'bg-[#090909] text-[#FFFFFF] border border-[#4B4B4B]/40 shadow-sm'
                  : 'bg-[#FFFFFF] text-[#000000] border border-[#D9D9D9] shadow-sm'
                : isDark
                ? 'text-[#999999] hover:text-[#FFFFFF]'
                : 'text-[#4B4B4B] hover:text-[#000000]'
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Success Message Banner */}
        {successMsg ? (
          <div
            className={`p-4 rounded-xl border font-mono text-xs mb-6 text-center leading-relaxed flex items-center justify-center gap-2 ${
              isDark
                ? 'bg-[#151515] border-[#FFFFFF]/40 text-[#FFFFFF]'
                : 'bg-[#F5F5F5] border-[#000000]/40 text-[#000000]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <div>
                <label className={`block text-[10px] font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'}`}>
                  FULL NAME
                </label>
                <div className="relative">
                  <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#4B4B4B]' : 'text-[#999999]'}`} />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs font-mono focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-[#151515] border-[#4B4B4B]/40 text-[#FFFFFF] placeholder-[#4B4B4B] focus:border-[#FFFFFF]'
                        : 'bg-[#F5F5F5] border-[#D9D9D9] text-[#000000] placeholder-[#999999] focus:border-[#000000]'
                    }`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-[10px] font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'}`}>
                INSTITUTIONAL EMAIL
              </label>
              <div className="relative">
                <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#4B4B4B]' : 'text-[#999999]'}`} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@firm.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs font-mono focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-[#151515] border-[#4B4B4B]/40 text-[#FFFFFF] placeholder-[#4B4B4B] focus:border-[#FFFFFF]'
                      : 'bg-[#F5F5F5] border-[#D9D9D9] text-[#000000] placeholder-[#999999] focus:border-[#000000]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-[10px] font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'}`}>
                PASSWORD
              </label>
              <div className="relative">
                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#4B4B4B]' : 'text-[#999999]'}`} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs font-mono focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-[#151515] border-[#4B4B4B]/40 text-[#FFFFFF] placeholder-[#4B4B4B] focus:border-[#FFFFFF]'
                      : 'bg-[#F5F5F5] border-[#D9D9D9] text-[#000000] placeholder-[#999999] focus:border-[#000000]'
                  }`}
                />
              </div>
            </div>

            {tab === 'register' && (
              <div>
                <label className={`block text-[10px] font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'}`}>
                  ACCESS KEY (OPTIONAL)
                </label>
                <div className="relative">
                  <ShieldCheck className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#4B4B4B]' : 'text-[#999999]'}`} />
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="ECHO-KEY-XXXX"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs font-mono focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-[#151515] border-[#4B4B4B]/40 text-[#FFFFFF] placeholder-[#4B4B4B] focus:border-[#FFFFFF]'
                        : 'bg-[#F5F5F5] border-[#D9D9D9] text-[#000000] placeholder-[#999999] focus:border-[#000000]'
                    }`}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 mt-6 ${
                isDark
                  ? 'bg-[#FFFFFF] text-[#000000] hover:bg-[#F5F5F5]'
                  : 'bg-[#000000] text-[#FFFFFF] hover:bg-[#151515]'
              }`}
            >
              <span>{isSubmitting ? 'PROCESSING...' : tab === 'login' ? 'SIGN IN TO TERMINAL' : 'CREATE ACCOUNT'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* SSO Options */}
        <div className="mt-8 pt-6 border-t border-[#151515] light:border-[#E5E5E5]">
          <p className={`text-[10px] font-mono text-center uppercase tracking-widest mb-4 ${isDark ? 'text-[#4B4B4B]' : 'text-[#999999]'}`}>
            OR CONTINUE WITH SSO
          </p>
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                setIsSubmitting(true);
                setTimeout(() => {
                  setIsSubmitting(false);
                  onClose();
                }, 800);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-[#151515] border-[#4B4B4B]/30 text-[#D9D9D9] hover:border-[#FFFFFF]'
                  : 'bg-[#F5F5F5] border-[#D9D9D9] text-[#151515] hover:border-[#000000]'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>PASSKEY</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSubmitting(true);
                setTimeout(() => {
                  setIsSubmitting(false);
                  onClose();
                }, 800);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-[#151515] border-[#4B4B4B]/30 text-[#D9D9D9] hover:border-[#FFFFFF]'
                  : 'bg-[#F5F5F5] border-[#D9D9D9] text-[#151515] hover:border-[#000000]'
              }`}
            >
              <Command className="w-3.5 h-3.5" />
              <span>SAML SSO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
