'use client';

import { CompanyData } from '@/types/company';
import { useTheme } from '@/context/ThemeContext';
import { Building2, BarChart2, DollarSign, TrendingUp, Globe } from 'lucide-react';

interface CompanyOverviewProps {
  company: CompanyData;
}

export function CompanyOverview({ company }: CompanyOverviewProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const isPredictedHigher = company.numericPredictedPostEarningsPrice > company.numericPrice;
  const isPredictedEqual = company.numericPredictedPostEarningsPrice === company.numericPrice;

  const predictedColorClass = isPredictedHigher
    ? 'text-[#10b981]' // Emerald Green if higher
    : isPredictedEqual
    ? 'text-[#ffffff] dark:text-[#ffffff] light:text-[#000000]' // White if equal
    : 'text-[#ef4444]'; // Red if lower

  const metrics = [
    {
      label: 'Current Price',
      value: company.price,
      icon: DollarSign,
      valueClass: isDark ? 'text-[#ffffff]' : 'text-[#000000]',
    },
    {
      label: 'Post-Earnings Target',
      value: company.predictedPostEarningsPrice,
      icon: TrendingUp,
      valueClass: predictedColorClass,
    },
    {
      label: 'Market Cap',
      value: company.marketCap,
      icon: BarChart2,
      valueClass: isDark ? 'text-[#ffffff]' : 'text-[#000000]',
    },
    {
      label: '52 Week High',
      value: company.high52,
      icon: Globe,
      valueClass: isDark ? 'text-[#ffffff]' : 'text-[#000000]',
    },
    {
      label: '52 Week Low',
      value: company.low52,
      icon: Building2,
      valueClass: isDark ? 'text-[#ffffff]' : 'text-[#000000]',
    },
  ];

  return (
    <div
      className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
        isDark
          ? 'bg-[#090909]/90 border-[#27272a] text-[#ffffff]'
          : 'bg-[#ffffff]/90 border-[#e4e4e7] text-[#000000]'
      }`}
    >
      {/* Header Info */}
      <div className="pb-5 mb-5 border-b border-[#27272a]/60 dark:border-[#27272a] light:border-[#e4e4e7] flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span
              className={`px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider border ${
                isDark
                  ? 'bg-[#18181b] border-[#3f3f46] text-[#ffffff]'
                  : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#000000]'
              }`}
            >
              {company.ticker}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded text-xs font-mono border ${
                isDark ? 'bg-[#18181b] border-[#3f3f46] text-[#a1a1aa]' : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#52525b]'
              }`}
            >
              {company.exchange}
            </span>
          </div>
          <h3 className="text-2xl font-bold font-sans tracking-tight">{company.name}</h3>
          <p className={`text-xs font-sans mt-1 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
            {company.sector}
          </p>
        </div>

        <div className="text-right font-mono">
          <div className="text-2xl font-bold tracking-tight">{company.price}</div>
          <div className="flex items-center justify-end gap-1.5 text-xs font-semibold mt-1">
            <span>{company.isUp ? '▲' : '▼'} {company.change}</span>
            <span
              className={`px-2 py-0.5 rounded text-[11px] border ${
                company.isUp
                  ? isDark
                    ? 'bg-[#18181b] border-[#3f3f46] text-[#e4e4e7]'
                    : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#18181b]'
                  : 'bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]'
              }`}
            >
              ({company.changePercent})
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Key Metadata */}
      <div className="grid grid-cols-2 gap-4 font-mono">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className={`p-3.5 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-[#18181b]/50 border-[#27272a] hover:border-[#3f3f46]'
                  : 'bg-[#f4f4f5]/60 border-[#e4e4e7] hover:border-[#d4d4d8]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-3.5 h-3.5 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`} />
                <span className={`text-xs font-sans ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
                  {m.label}
                </span>
              </div>
              <div className={`text-sm font-bold tracking-tight ${m.valueClass}`}>
                {m.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
