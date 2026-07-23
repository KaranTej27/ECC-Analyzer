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
          ? 'bg-[#090909]/95 border-[#4B4B4B]/50 text-[#FFFFFF]'
          : 'bg-[#FFFFFF]/95 border-[#D9D9D9] text-[#000000]'
      }`}
    >
      <div className={`flex items-center justify-between pb-2 border-b ${isDark ? 'border-[#151515]' : 'border-[#E5E5E5]'}`}>
        <span className={isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'}>TIMESTAMP</span>
        <span className="font-bold">{label} ({data.quarter})</span>
      </div>
      <div className="flex items-center justify-between">
        <span className={isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'}>ACTUAL PRICE:</span>
        <span className="font-bold">${data.actualPrice.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className={isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'}>ECHO PREDICTION:</span>
        <span className="font-bold">${data.predictedPrice.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-[10px]">
        <span className={isDark ? 'text-[#4B4B4B]' : 'text-[#999999]'}>CONFIDENCE BOUND:</span>
        <span>${data.confidenceLower.toFixed(1)} - ${data.confidenceUpper.toFixed(1)}</span>
      </div>
      <div className={`flex items-center justify-between pt-2 border-t text-[10px] ${isDark ? 'border-[#151515]' : 'border-[#E5E5E5]'}`}>
        <span className={isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'}>SENTIMENT SCORE:</span>
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

  const strokeActual = isDark ? '#FFFFFF' : '#000000';
  const strokePredicted = isDark ? '#999999' : '#4B4B4B';
  const gridColor = isDark ? '#151515' : '#E5E5E5';

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4 px-2">
        <div className="flex items-center gap-6 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-0.5 ${isDark ? 'bg-[#FFFFFF]' : 'bg-[#000000]'}`} />
            <span className={isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'}>ACTUAL STOCK PRICE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-0.5 border-t border-dashed ${isDark ? 'border-[#999999]' : 'border-[#4B4B4B]'}`} />
            <span className={isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'}>ECHO AI PREDICTION</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-sm border ${isDark ? 'bg-[#D9D9D9]/20 border-[#D9D9D9]/30' : 'bg-[#151515]/10 border-[#151515]/20'}`} />
            <span className={isDark ? 'text-[#4B4B4B]' : 'text-[#999999]'}>CONFIDENCE INTERVAL</span>
          </div>
        </div>

        <div className={`flex items-center gap-2 font-mono text-xs border p-1 rounded-lg transition-colors ${
          isDark ? 'bg-[#090909] border-[#151515]' : 'bg-[#F5F5F5] border-[#E5E5E5]'
        }`}>
          {(['all', 'q3', 'q4'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md tracking-wider transition-all ${
                activeTab === tab
                  ? isDark
                    ? 'bg-[#151515] text-[#FFFFFF] border border-[#4B4B4B]/40 font-bold'
                    : 'bg-[#FFFFFF] text-[#000000] border border-[#D9D9D9] font-bold shadow-sm'
                  : isDark
                  ? 'text-[#999999] hover:text-[#FFFFFF]'
                  : 'text-[#4B4B4B] hover:text-[#000000]'
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
            ? 'bg-[#090909]/95 border-[#151515]'
            : 'bg-[#F5F5F5]/90 border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
        }`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeActual} stopOpacity={isDark ? 0.15 : 0.08} />
                <stop offset="95%" stopColor={strokeActual} stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />

            <XAxis
              dataKey="time"
              stroke={isDark ? '#4B4B4B' : '#999999'}
              tick={{ fill: isDark ? '#999999' : '#4B4B4B', fontSize: 11, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
            />
            <YAxis
              domain={['dataMin - 2', 'dataMax + 2']}
              stroke={isDark ? '#4B4B4B' : '#999999'}
              tick={{ fill: isDark ? '#999999' : '#4B4B4B', fontSize: 11, fontFamily: 'monospace' }}
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
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 5, fill: strokePredicted, stroke: strokeActual }}
            />

            <Line
              type="monotone"
              dataKey="actualPrice"
              stroke={strokeActual}
              strokeWidth={3}
              dot={{ r: 4, fill: strokeActual, stroke: isDark ? '#000000' : '#FFFFFF', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: strokeActual, stroke: strokePredicted, strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
