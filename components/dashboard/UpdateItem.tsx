'use client';

import { Building2, TrendingUp, Zap, Globe, Activity, DollarSign, Clock, type LucideIcon } from 'lucide-react';
import { MarketUpdateData } from '@/constants/data';
import { useTheme } from '@/context/ThemeContext';

interface UpdateItemProps {
  update: MarketUpdateData;
}

const ICON_MAP: Record<MarketUpdateData['iconName'], LucideIcon> = {
  Building2,
  TrendingUp,
  Zap,
  Globe,
  Activity,
  DollarSign,
};

export function UpdateItem({ update }: UpdateItemProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const IconComponent: LucideIcon = ICON_MAP[update.iconName] || Activity;

  return (
    <div
      className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-4 cursor-pointer transform hover:-translate-y-0.5 ${
        isDark
          ? 'bg-[#090909]/80 border-[#27272a] text-[#ffffff] hover:border-[#52525b] hover:bg-[#18181b]/70'
          : 'bg-[#ffffff]/80 border-[#e4e4e7] text-[#000000] hover:border-[#a1a1aa] hover:bg-[#f4f4f5]/90'
      }`}
    >
      <div className="flex items-start gap-4 flex-1">
        <div
          className={`p-3 rounded-xl border shrink-0 transition-colors ${
            isDark
              ? 'bg-[#18181b] border-[#3f3f46] text-[#ffffff] group-hover:border-[#ffffff]'
              : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#000000] group-hover:border-[#000000]'
          }`}
        >
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm sm:text-base font-semibold tracking-tight font-sans leading-snug group-hover:text-white dark:group-hover:text-white light:group-hover:text-black">
              {update.title}
            </h4>
            <span className="flex sm:hidden items-center gap-1 shrink-0 font-mono text-xs text-[#a1a1aa]">
              <Clock className="w-3.5 h-3.5 opacity-70" />
              <span>{update.timeAgo}</span>
            </span>
          </div>
          <p className={`text-xs sm:text-sm font-sans leading-relaxed line-clamp-2 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
            {update.subtitle}
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 shrink-0 font-mono text-xs font-medium text-[#a1a1aa] dark:text-[#a1a1aa] light:text-[#52525b] pt-1">
        <Clock className="w-3.5 h-3.5 opacity-70" />
        <span>{update.timeAgo}</span>
      </div>
    </div>
  );
}
