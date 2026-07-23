'use client';

import { useState, useEffect } from 'react';
import { Search, Command, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  onSearchSubmit?: (query: string) => void;
  onClear?: () => void;
}

export function SearchBar({
  placeholder = 'Search company... Example: AAPL RELIANCE TCS INFY MSFT TSLA NVDA',
  initialValue = '',
  onSearchSubmit,
  onClear,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearchSubmit) {
      onSearchSubmit(query);
    }
  };

  const handleSearchClick = () => {
    if (onSearchSubmit) {
      onSearchSubmit(query);
    }
  };

  const handleClearClick = () => {
    setQuery('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <div id="dashboard-searchbar" className="w-full">
      <div className="relative flex items-center group">
        <button
          type="button"
          onClick={handleSearchClick}
          aria-label="Submit Search"
          className={`absolute left-5 p-1 rounded-lg transition-colors cursor-pointer ${
            isDark ? 'text-[#a1a1aa] hover:text-[#ffffff]' : 'text-[#52525b] hover:text-[#000000]'
          }`}
        >
          <Search className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full pl-16 pr-24 py-4.5 text-base font-sans rounded-2xl border transition-all duration-300 outline-none shadow-sm ${
            isDark
              ? 'bg-[#090909]/90 border-[#27272a] text-[#ffffff] placeholder-[#71717a] focus:border-[#71717a] focus:bg-[#000000] focus:shadow-[0_0_20px_rgba(255,255,255,0.06)]'
              : 'bg-[#ffffff]/90 border-[#e4e4e7] text-[#000000] placeholder-[#a1a1aa] focus:border-[#71717a] focus:bg-[#ffffff] focus:shadow-[0_0_20px_rgba(0,0,0,0.04)]'
          }`}
        />

        <div className="absolute right-5 flex items-center gap-2">
          {query && (
            <button
              type="button"
              onClick={handleClearClick}
              aria-label="Clear Search"
              className={`p-1 rounded-full border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#18181b] border-[#3f3f46] text-[#a1a1aa] hover:text-[#ffffff] hover:border-[#ffffff]'
                  : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#52525b] hover:text-[#000000] hover:border-[#000000]'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs font-medium pointer-events-none ${
              isDark ? 'bg-[#18181b] border-[#27272a] text-[#a1a1aa]' : 'bg-[#f4f4f5] border-[#e4e4e7] text-[#52525b]'
            }`}
          >
            <Command className="w-3.5 h-3.5" />
            <span>K</span>
          </div>
        </div>
      </div>
    </div>
  );
}
