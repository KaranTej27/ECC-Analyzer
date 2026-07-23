'use client';

import { useState } from 'react';
import { Bell, Bookmark, PieChart, Zap, type LucideIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'updates', label: 'Updates', icon: Bell },
  { id: 'watchlist', label: 'Watchlist', icon: Bookmark },
  { id: 'portfolio', label: 'Your Portfolio', icon: PieChart },
  { id: 'echo-plus', label: 'ECHO+', icon: Zap },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState<string>('updates');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <aside
      id="dashboard-sidebar"
      className={`w-64 h-[calc(100vh-76px)] fixed top-[76px] left-0 z-30 border-r transition-colors duration-500 py-8 flex flex-col justify-between ${
        isDark
          ? 'bg-[#000000]/80 backdrop-blur-md border-[#27272a] text-[#ffffff]'
          : 'bg-[#ffffff]/80 backdrop-blur-md border-[#e4e4e7] text-[#000000]'
      }`}
    >
      <div className="flex flex-col space-y-1.5">
        <div className="px-7 pb-4">
          <span className={`text-xs font-mono tracking-widest uppercase font-semibold ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
            NAVIGATION
          </span>
        </div>

        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`group relative w-full flex items-center gap-3.5 px-7 py-3.5 text-sm font-sans tracking-wide transition-all duration-300 ${
                isActive
                  ? isDark
                    ? 'text-[#ffffff] bg-[#18181b]/70 font-semibold'
                    : 'text-[#000000] bg-[#f4f4f5] font-semibold'
                  : isDark
                  ? 'text-[#a1a1aa] hover:text-[#ffffff] hover:bg-[#18181b]/40'
                  : 'text-[#52525b] hover:text-[#000000] hover:bg-[#f4f4f5]/60'
              }`}
            >
              {/* Subtle animated left border indicator */}
              <span
                className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 ${
                  isActive
                    ? isDark
                      ? 'bg-[#ffffff]'
                      : 'bg-[#000000]'
                    : 'bg-transparent group-hover:bg-[#52525b]'
                }`}
              />

              <Icon
                className={`w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 ${
                  isActive
                    ? isDark
                      ? 'text-[#ffffff]'
                      : 'text-[#000000]'
                    : isDark
                    ? 'text-[#a1a1aa] group-hover:text-[#ffffff]'
                    : 'text-[#52525b] group-hover:text-[#000000]'
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer Info inside Sidebar */}
      <div className="px-7 pt-6 border-t border-[#27272a]/60 dark:border-[#27272a] light:border-[#e4e4e7]">
        <div className={`text-xs font-mono leading-relaxed ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
          <p className="font-semibold text-[#ffffff] dark:text-[#ffffff] light:text-[#000000]">ECHO OS v2.4</p>
          <p>Institutional Terminal Mode</p>
        </div>
      </div>
    </aside>
  );
}
