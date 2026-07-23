'use client';

import { useState, useEffect } from 'react';
import { MarketStatData } from '@/constants/data';
import { useTheme } from '@/context/ThemeContext';

interface StatsCardProps {
  stat: MarketStatData;
}

export function StatsCard({ stat }: StatsCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [displayValue, setDisplayValue] = useState(stat.value);
  const [isTicking, setIsTicking] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTicking(true);
      setTimeout(() => setIsTicking(false), 800);
    }, 1500);

    return () => clearTimeout(timer);
  }, [stat.value]);

  return (
    <div
      className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 ${
        isDark
          ? 'bg-[#090909]/90 border-[#27272a] text-[#ffffff] hover:border-[#52525b] hover:shadow-[0_12px_36px_rgba(0,0,0,0.8)]'
          : 'bg-[#ffffff]/90 border-[#e4e4e7] text-[#000000] hover:border-[#a1a1aa] hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)]'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs sm:text-sm font-sans tracking-wide font-medium ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
          {stat.title}
        </span>
        <span
          className={`w-2 h-2 rounded-full ${
            stat.isUp !== false ? (isDark ? 'bg-[#ffffff]' : 'bg-[#000000]') : 'bg-[#71717a]'
          }`}
        />
      </div>

      <div className="flex items-baseline gap-1 my-2">
        {stat.prefix && (
          <span className="text-base font-mono text-[#a1a1aa] font-normal">{stat.prefix}</span>
        )}
        <span
          className={`text-3xl sm:text-4xl font-bold font-mono tracking-tight transition-transform duration-300 ${
            isTicking ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
          }`}
        >
          {displayValue}
        </span>
        {stat.suffix && (
          <span className={`text-sm font-mono font-medium ml-1 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
            {stat.suffix}
          </span>
        )}
      </div>

      {stat.subtitle && (
        <div className="pt-3 mt-3 border-t border-[#27272a]/60 dark:border-[#27272a] light:border-[#e4e4e7]">
          <span className={`text-xs font-sans leading-relaxed block ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
            {stat.subtitle}
          </span>
        </div>
      )}
    </div>
  );
}
