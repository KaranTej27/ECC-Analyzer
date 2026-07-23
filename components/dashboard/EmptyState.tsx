'use client';

import { SearchX, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface EmptyStateProps {
  query: string;
  onSelectTicker: (ticker: string) => void;
}

const SUGGESTED_TICKERS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'RELIANCE', name: 'Reliance Industries' },
  { symbol: 'TCS', name: 'Tata Consultancy' },
  { symbol: 'INFY', name: 'Infosys Limited' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.' },
];

export function EmptyState({ query, onSelectTicker }: EmptyStateProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full p-10 sm:p-14 rounded-2xl border text-center transition-all duration-300 max-w-3xl mx-auto my-6 ${
        isDark
          ? 'bg-[#090909]/90 border-[#27272a] text-[#ffffff]'
          : 'bg-[#ffffff]/90 border-[#e4e4e7] text-[#000000]'
      }`}
    >
      <div
        className={`w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto mb-6 ${
          isDark ? 'bg-[#18181b] border-[#3f3f46] text-[#a1a1aa]' : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#52525b]'
        }`}
      >
        <SearchX className="w-7 h-7 opacity-80" />
      </div>

      <h3 className="text-2xl font-bold font-sans tracking-tight mb-2">
        No Company Found for &ldquo;<span className="font-mono">{query}</span>&rdquo;
      </h3>
      <p className={`text-sm font-sans max-w-md mx-auto mb-8 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
        We couldn&apos;t match that ticker query in our institutional registry. Please try searching one of the supported coverage companies below.
      </p>

      <div className="space-y-3">
        <span className={`text-xs font-mono tracking-widest uppercase block ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
          SUGGESTED COVERAGE TICKERS
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-xl mx-auto pt-2">
          {SUGGESTED_TICKERS.map((item) => (
            <button
              key={item.symbol}
              type="button"
              onClick={() => onSelectTicker(item.symbol)}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-xs font-semibold transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-[#18181b] border-[#3f3f46] text-[#ffffff] hover:border-[#ffffff] hover:bg-[#27272a]'
                  : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#000000] hover:border-[#000000] hover:bg-[#e4e4e7]'
              }`}
            >
              <span>{item.symbol}</span>
              <CornerDownLeft className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
