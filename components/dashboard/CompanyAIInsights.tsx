'use client';

import type { CompanyAIInsights } from '@/types/company';
import { useTheme } from '@/context/ThemeContext';
import { Cpu, AlertTriangle, ShieldCheck, History, Calendar, Sparkles } from 'lucide-react';

interface CompanyAIInsightsProps {
  insights: CompanyAIInsights;
  ticker: string;
}

export function CompanyAIInsights({ insights, ticker }: CompanyAIInsightsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const isLowRisk = insights.cautionLevel.includes('Low');
  const isHighRisk = insights.cautionLevel.includes('High');

  return (
    <div
      className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 space-y-6 ${
        isDark
          ? 'bg-[#090909]/90 border-[#27272a] text-[#ffffff]'
          : 'bg-[#ffffff]/90 border-[#e4e4e7] text-[#000000]'
      }`}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#27272a]/60 dark:border-[#27272a] light:border-[#e4e4e7]">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl border shrink-0 ${
              isDark ? 'bg-[#18181b] border-[#3f3f46] text-[#ffffff]' : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#000000]'
            }`}
          >
            <Cpu className="w-5 h-5 opacity-90" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold font-sans tracking-tight">ECHO AI Intelligence</h3>
              <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981]">
                <Sparkles className="w-3 h-3" />
                NEURAL SYNTHESIS
              </span>
            </div>
            <p className={`text-xs font-sans mt-0.5 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
              Earnings call acoustic & transcript synthesis for {ticker}
            </p>
          </div>
        </div>

        {/* Caution Level Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wide border flex items-center gap-1.5 ${
              isLowRisk
                ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]'
                : isHighRisk
                ? 'bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]'
                : 'bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]'
            }`}
          >
            {isLowRisk ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{insights.cautionLevel}</span>
          </span>
        </div>
      </div>

      {/* Grid of Insights Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* SECTION 1: Current Executive Summary */}
        <div
          className={`p-4.5 rounded-xl border space-y-2 transition-colors ${
            isDark ? 'bg-[#18181b]/50 border-[#27272a]' : 'bg-[#f4f4f5]/60 border-[#e4e4e7]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#ffffff]' : 'bg-[#000000]'}`} />
            <h4 className="text-xs font-mono uppercase tracking-widest font-semibold">
              Current Executive Summary
            </h4>
          </div>
          <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
            {insights.summary}
          </p>
        </div>

        {/* SECTION 2: Caution & Risk Factor Rationale */}
        <div
          className={`p-4.5 rounded-xl border space-y-2 transition-colors ${
            isDark ? 'bg-[#18181b]/50 border-[#27272a]' : 'bg-[#f4f4f5]/60 border-[#e4e4e7]'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-4 h-4 ${isLowRisk ? 'text-[#10b981]' : isHighRisk ? 'text-[#ef4444]' : 'text-[#f59e0b]'}`} />
            <h4 className="text-xs font-mono uppercase tracking-widest font-semibold">
              Risk & Caution Assessment
            </h4>
          </div>
          <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
            {insights.cautionReason}
          </p>
        </div>

        {/* SECTION 3: Previous Earnings Call Summary */}
        <div
          className={`p-4.5 rounded-xl border space-y-2 transition-colors ${
            isDark ? 'bg-[#18181b]/50 border-[#27272a]' : 'bg-[#f4f4f5]/60 border-[#e4e4e7]'
          }`}
        >
          <div className="flex items-center gap-2">
            <History className={`w-4 h-4 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`} />
            <h4 className="text-xs font-mono uppercase tracking-widest font-semibold">
              Previous Earnings Call Review
            </h4>
          </div>
          <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
            {insights.pastEarningsSummary}
          </p>
        </div>

        {/* SECTION 4: Next Earnings Call Outlook */}
        <div
          className={`p-4.5 rounded-xl border space-y-2 transition-colors ${
            isDark ? 'bg-[#18181b]/50 border-[#27272a]' : 'bg-[#f4f4f5]/60 border-[#e4e4e7]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className={`w-4 h-4 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`} />
              <h4 className="text-xs font-mono uppercase tracking-widest font-semibold">
                Next Earnings Call Outlook
              </h4>
            </div>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
              isDark ? 'bg-[#18181b] border-[#3f3f46] text-[#a1a1aa]' : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#52525b]'
            }`}>
              Est: {insights.nextEarningsDate}
            </span>
          </div>
          <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
            {insights.nextEarningsOutlook}
          </p>
        </div>

      </div>
    </div>
  );
}
