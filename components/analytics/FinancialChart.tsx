'use client';

import { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { FINANCIAL_CHART_DATA, ChartDataPoint } from '@/lib/dummyData';
import { useTheme } from '@/context/ThemeContext';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  isDark?: boolean;
}

function CustomTooltip({ active, payload, label, isDark = true }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data: ChartDataPoint = payload[0].payload;

  return (
    <div
      className={`p-4 rounded-xl border backdrop-blur-xl shadow-2xl font-mono text-xs space-y-2 min-w-[200px] transition-colors duration-300 ${
        isDark
          ? 'bg-[#090909]/95 border-[#27272a] text-[#ffffff]'
          : 'bg-[#ffffff]/95 border-[#e4e4e7] text-[#000000]'
      }`}
    >
      <div className={`flex items-center justify-between pb-2 border-b ${isDark ? 'border-[#27272a]' : 'border-[#e4e4e7]'}`}>
        <span className={isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}>TIMESTAMP</span>
        <span className="font-bold">{label} ({data.quarter})</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[#10b981] font-semibold">ACTUAL PRICE:</span>
        <span className="font-bold">${data.actualPrice.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[#f59e0b] font-semibold">ECHO PREDICTION:</span>
        <span className="font-bold">${data.predictedPrice.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-[#ef4444]">CONFIDENCE BOUND:</span>
        <span>${data.confidenceLower.toFixed(1)} - ${data.confidenceUpper.toFixed(1)}</span>
      </div>
      <div className={`flex items-center justify-between pt-2 border-t text-[10px] ${isDark ? 'border-[#27272a]' : 'border-[#e4e4e7]'}`}>
        <span className={isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}>SENTIMENT SCORE:</span>
        <span className="font-bold">{(data.sentimentScore * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
}

export function FinancialChart() {
  const [activeTab, setActiveTab] = useState<'all' | 'q3' | 'q4'>('all');
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const filteredData = FINANCIAL_CHART_DATA.filter((item) => {
    if (activeTab === 'q3') return item.quarter.startsWith('Q3');
    if (activeTab === 'q4') return item.quarter.startsWith('Q4');
    return true;
  });

  // Color specs for graphs ONLY
  const strokeActual = '#10b981'; // Emerald Green graph line
  const strokePredicted = '#f59e0b'; // Yellow graph line
  const strokeConfidence = '#ef4444'; // Red graph bound
  const gridColor = isDark ? '#27272a' : '#e4e4e7';

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4 px-2">
        <div className="flex items-center gap-6 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 rounded-full bg-[#10b981]" />
            <span className={isDark ? 'text-[#ffffff]' : 'text-[#000000]'}>ACTUAL STOCK PRICE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 border-t-2 border-dashed border-[#f59e0b]" />
            <span className={isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}>ECHO AI PREDICTION</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm border bg-[#ef4444]/20 border-[#ef4444]/40" />
            <span className={isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}>CONFIDENCE INTERVAL</span>
          </div>
        </div>

        <div className={`flex items-center gap-2 font-mono text-xs border p-1 rounded-lg transition-colors ${
          isDark ? 'bg-[#090909] border-[#27272a]' : 'bg-[#f4f4f5] border-[#e4e4e7]'
        }`}>
          {(['all', 'q3', 'q4'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md tracking-wider transition-all ${
                activeTab === tab
                  ? isDark
                    ? 'bg-[#18181b] text-[#ffffff] border border-[#3f3f46] font-bold'
                    : 'bg-[#ffffff] text-[#000000] border border-[#d4d4d8] font-bold shadow-sm'
                  : isDark
                  ? 'text-[#a1a1aa] hover:text-[#ffffff]'
                  : 'text-[#52525b] hover:text-[#000000]'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`w-full h-[420px] rounded-2xl border p-4 md:p-6 backdrop-blur-xl relative overflow-hidden transition-all duration-500 ${
          isDark
            ? 'bg-[#090909]/95 border-[#27272a]'
            : 'bg-[#f4f4f5]/90 border-[#e4e4e7] shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
        }`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeActual} stopOpacity={0.25} />
                <stop offset="50%" stopColor={strokePredicted} stopOpacity={0.15} />
                <stop offset="95%" stopColor={strokeConfidence} stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />

            <XAxis
              dataKey="time"
              stroke={isDark ? '#52525b' : '#a1a1aa'}
              tick={{ fill: isDark ? '#a1a1aa' : '#52525b', fontSize: 11, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
            />
            <YAxis
              domain={['dataMin - 2', 'dataMax + 2']}
              stroke={isDark ? '#52525b' : '#a1a1aa'}
              tick={{ fill: isDark ? '#a1a1aa' : '#52525b', fontSize: 11, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
              tickFormatter={(val) => `$${val}`}
            />

            <Tooltip content={<CustomTooltip isDark={isDark} />} />

            <Area
              type="monotone"
              dataKey="confidenceUpper"
              stroke="none"
              fill="url(#confidenceGradient)"
            />

            <Line
              type="monotone"
              dataKey="predictedPrice"
              stroke={strokePredicted}
              strokeWidth={2.5}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 6, fill: strokePredicted, stroke: '#ffffff' }}
            />

            <Line
              type="monotone"
              dataKey="actualPrice"
              stroke={strokeActual}
              strokeWidth={3}
              dot={{ r: 4, fill: strokeActual, stroke: isDark ? '#000000' : '#ffffff', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: strokeActual, stroke: '#ffffff', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
