'use client';

import { CompanyNewsItem } from '@/types/company';
import { useTheme } from '@/context/ThemeContext';
import { Newspaper, Clock } from 'lucide-react';

interface NewsCardProps {
  news: CompanyNewsItem[];
}

export function NewsCard({ news }: NewsCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
        isDark
          ? 'bg-[#090909]/90 border-[#27272a] text-[#ffffff]'
          : 'bg-[#ffffff]/90 border-[#e4e4e7] text-[#000000]'
      }`}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold tracking-tight font-sans flex items-center gap-2.5">
          <Newspaper className="w-5 h-5 opacity-80" />
          <span>Recent Company News</span>
        </h3>
        <span
          className={`px-2.5 py-0.5 rounded text-xs font-mono border ${
            isDark ? 'bg-[#18181b] border-[#3f3f46] text-[#a1a1aa]' : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#52525b]'
          }`}
        >
          CURATED FEED
        </span>
      </div>

      <div className="space-y-3.5">
        {news.map((item) => (
          <div
            key={item.id}
            className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 ${
              isDark
                ? 'bg-[#18181b]/50 border-[#27272a] hover:border-[#52525b] hover:bg-[#18181b]'
                : 'bg-[#f4f4f5]/60 border-[#e4e4e7] hover:border-[#a1a1aa] hover:bg-[#f4f4f5]'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-1">
              <h4 className="text-sm font-semibold font-sans tracking-tight leading-snug group-hover:text-white dark:group-hover:text-white light:group-hover:text-black">
                {item.headline}
              </h4>
              <span className="flex items-center gap-1 shrink-0 font-mono text-[11px] text-[#a1a1aa] pt-0.5">
                <Clock className="w-3 h-3 opacity-70" />
                <span>{item.timeAgo}</span>
              </span>
            </div>
            <p className={`text-xs font-sans leading-relaxed line-clamp-2 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
