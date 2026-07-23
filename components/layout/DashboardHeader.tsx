'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Sun, Moon } from 'lucide-react';
import { MarketIndicator, UserProfileData, INITIAL_MARKET_INDICATORS, CURRENT_USER } from '@/constants/data';
import { useTheme } from '@/context/ThemeContext';

interface DashboardHeaderProps {
  indicators?: MarketIndicator[];
  user?: UserProfileData;
}

export function DashboardHeader({
  indicators = INITIAL_MARKET_INDICATORS,
  user = CURRENT_USER,
}: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [liveIndicators, setLiveIndicators] = useState<MarketIndicator[]>(indicators);
  const [pulseIndex, setPulseIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const targetIdx = Math.floor(Math.random() * liveIndicators.length);
      setPulseIndex(targetIdx);

      setLiveIndicators((prev) =>
        prev.map((ind, idx) => {
          if (idx !== targetIdx) return ind;
          const delta = (Math.random() * 2 - 0.9).toFixed(2);
          const numDelta = parseFloat(delta);
          const newNumVal = ind.numericValue + numDelta;
          
          return {
            ...ind,
            numericValue: newNumVal,
            value: newNumVal.toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
            change: `${numDelta >= 0 ? '+' : ''}${numDelta.toFixed(2)}`,
            isUp: numDelta >= 0 ? ind.isUp : ind.isUp,
          };
        })
      );

      setTimeout(() => setPulseIndex(null), 1200);
    }, 4000);

    return () => clearInterval(interval);
  }, [liveIndicators.length]);

  return (
    <header
      id="dashboard-header"
      className={`fixed top-0 left-0 right-0 z-40 h-[76px] px-6 lg:px-10 border-b transition-colors duration-500 flex items-center justify-between ${
        isDark
          ? 'bg-[#000000]/90 backdrop-blur-md border-[#27272a] text-[#ffffff]'
          : 'bg-[#ffffff]/90 backdrop-blur-md border-[#e4e4e7] text-[#000000]'
      }`}
    >
      {/* Left: ECHO Logo / Text */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3.5 group">
          <div
            className={`w-10 h-10 rounded-full border flex items-center justify-center font-mono font-bold text-sm tracking-tighter transition-all ${
              isDark
                ? 'border-[#3f3f46] bg-[#18181b] text-[#ffffff] group-hover:border-[#ffffff]'
                : 'border-[#d4d4d8] bg-[#f4f4f5] text-[#000000] group-hover:border-[#000000]'
            }`}
          >
            E
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-widest leading-none">ECHO</span>
            <span className={`text-xs font-mono tracking-wider uppercase mt-1 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
              TERMINAL
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Live Market Indicators */}
      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        {liveIndicators.map((ind, idx) => {
          const isPulsing = pulseIndex === idx;
          return (
            <div key={ind.id} className="flex items-center gap-3 font-mono text-sm">
              <span className={`font-semibold tracking-wider ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
                {ind.name}
              </span>
              <div className="flex items-center gap-2">
                <span className={`font-bold transition-all duration-300 ${isPulsing ? 'text-[#ffffff] scale-105' : ''}`}>
                  {ind.isUp ? '▲' : '▼'} {ind.value}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                    isDark
                      ? 'bg-[#18181b] border-[#3f3f46] text-[#e4e4e7]'
                      : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#18181b]'
                  }`}
                >
                  ({ind.changePercent})
                </span>
                <span className="relative flex h-2.5 w-2.5 ml-0.5">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isPulsing ? 'bg-[#ffffff]' : 'bg-[#a1a1aa]'
                    }`}
                  />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a1a1aa]" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: Theme Switcher & User Profile */}
      <div className="flex items-center gap-4">
        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`p-2.5 rounded-full border transition-all duration-300 ${
            isDark
              ? 'bg-[#18181b] border-[#3f3f46] text-[#ffffff] hover:border-[#ffffff]'
              : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#000000] hover:border-[#000000]'
          }`}
        >
          {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        {/* User Profile Pill */}
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-full border cursor-pointer transition-all ${
            isDark
              ? 'bg-[#18181b] border-[#3f3f46] text-[#ffffff] hover:border-[#ffffff]'
              : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#000000] hover:border-[#000000]'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-[#000000] text-[#ffffff] border border-[#3f3f46] flex items-center justify-center font-mono text-xs font-bold">
            {user.initials}
          </div>
          <span className="hidden sm:inline text-xs font-mono font-semibold tracking-wide">
            {user.username}
          </span>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </div>
      </div>
    </header>
  );
}
