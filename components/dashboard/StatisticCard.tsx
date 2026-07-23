'use client';

import { useTheme } from '@/context/ThemeContext';

interface StatisticCardProps {
  label: string;
  value: string;
  subtitle?: string;
}

export function StatisticCard({ label, value, subtitle }: StatisticCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 ${
        isDark
          ? 'bg-[#090909]/90 border-[#27272a] text-[#ffffff] hover:border-[#52525b] hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-[#ffffff]/90 border-[#e4e4e7] text-[#000000] hover:border-[#a1a1aa] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-sans tracking-wide font-medium ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
          {label}
        </span>
        <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#ffffff]' : 'bg-[#000000]'}`} />
      </div>

      <div className="my-1">
        <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight">{value}</span>
      </div>

      {subtitle && (
        <div className="pt-2 mt-2 border-t border-[#27272a]/60 dark:border-[#27272a] light:border-[#e4e4e7]">
          <span className={`text-xs font-sans leading-relaxed block ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
}
