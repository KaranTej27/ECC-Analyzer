'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants';
import { Terminal, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-16 py-5 transition-all duration-500">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-500 ${
          scrolled
            ? isDark
              ? 'bg-[#090909]/85 backdrop-blur-xl border border-[#4B4B4B]/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
              : 'bg-[#FFFFFF]/85 backdrop-blur-xl border border-[#E5E5E5] shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Logo & Branding */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs tracking-tighter transition-colors ${
              isDark
                ? 'border-[#D9D9D9]/40 bg-[#151515] text-[#FFFFFF] group-hover:border-[#FFFFFF]'
                : 'border-[#4B4B4B]/40 bg-[#F5F5F5] text-[#000000] group-hover:border-[#000000]'
            }`}
          >
            E
          </div>
          <div className="flex flex-col">
            <span
              className={`text-sm font-semibold tracking-widest transition-colors ${
                isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'
              }`}
            >
              {SITE_CONFIG.name}
            </span>
            <span
              className={`text-[10px] tracking-wider uppercase font-mono transition-colors ${
                isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
              }`}
            >
              SYSTEM
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs tracking-widest transition-colors duration-300 font-mono ${
                isDark
                  ? 'text-[#999999] hover:text-[#FFFFFF]'
                  : 'text-[#4B4B4B] hover:text-[#000000]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Status Pill, Theme Switcher & Action CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border transition-colors ${
              isDark
                ? 'bg-[#151515] border-[#4B4B4B]/40 text-[#999999]'
                : 'bg-[#F5F5F5] border-[#D9D9D9] text-[#4B4B4B]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                isDark ? 'bg-[#FFFFFF]' : 'bg-[#000000]'
              }`}
            />
            <span>{SITE_CONFIG.version}</span>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark and light theme"
            className={`relative p-2 rounded-full border transition-all duration-300 flex items-center justify-center ${
              isDark
                ? 'bg-[#151515] border-[#4B4B4B]/40 text-[#FFFFFF] hover:border-[#FFFFFF]'
                : 'bg-[#F5F5F5] border-[#D9D9D9] text-[#000000] hover:border-[#000000]'
            }`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#FFFFFF] transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-[#000000] transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          <a
            href="#contact"
            className={`group relative px-4 py-2 text-xs font-mono tracking-wider rounded-full overflow-hidden border transition-all duration-300 ${
              isDark
                ? 'bg-[#151515] text-[#FFFFFF] border-[#D9D9D9]/30 hover:border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]'
                : 'bg-[#000000] text-[#FFFFFF] border-[#000000] hover:bg-[#151515]'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">ACCESS PROTOCOL</span>
              <span className="xs:hidden">ACCESS</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
