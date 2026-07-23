'use client';

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
import { CompanyData, CompanyGraphPoint } from '@/types/company';
import { useTheme } from '@/context/ThemeContext';

interface CompanyGraphProps {
  company: CompanyData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  isDark?: boolean;
  currencySymbol?: string;
}

function CustomTooltip({ active, payload, label, isDark = true, currencySymbol = '$' }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data: CompanyGraphPoint = payload[0].payload;

  return (
    <div
      className={`p-4 rounded-xl border backdrop-blur-xl shadow-2xl font-mono text-xs space-y-2 min-w-[210px] transition-colors duration-300 ${
        isDark
          ? 'bg-[#090909]/95 border-[#27272a] text-[#ffffff]'
          : 'bg-[#ffffff]/95 border-[#e4e4e7] text-[#000000]'
      }`}
    >
      <div className={`flex items-center justify-between pb-2 border-b ${isDark ? 'border-[#27272a]' : 'border-[#e4e4e7]'}`}>
        <span className={isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}>TIMESTAMP</span>
        <span className="font-bold">{label} ({data.time})</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[#10b981] font-semibold">ACTUAL PRICE:</span>
        <span className="font-bold">{currencySymbol}{data.actualPrice.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[#ffffff] dark:text-[#ffffff] light:text-[#000000] font-semibold">ECHO AI PREDICTION:</span>
        <span className="font-bold">{currencySymbol}{data.predictedPrice.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-[10px]">
        <span className={isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}>CONFIDENCE BAND:</span>
        <span>{currencySymbol}{data.confidenceLower.toFixed(1)} - {currencySymbol}{data.confidenceUpper.toFixed(1)}</span>
      </div>
    </div>
  );
}

export function CompanyGraph({ company }: CompanyGraphProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const currencySymbol = company.price.startsWith('₹') ? '₹' : '$';
  const strokeActual = company.isUp ? '#10b981' : '#ef4444'; // Emerald Green or Red
  const strokePredicted = isDark ? '#ffffff' : '#18181b'; // White prediction line
  const gridColor = isDark ? '#27272a' : '#e4e4e7';

  return (
    <div
      className={`w-full h-[420px] rounded-2xl border p-5 sm:p-6 relative overflow-hidden transition-all duration-300 shadow-sm ${
        isDark
          ? 'bg-[#090909]/90 border-[#27272a] text-[#ffffff]'
          : 'bg-[#ffffff]/90 border-[#e4e4e7] text-[#000000]'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-1 rounded-full ${company.isUp ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`} />
            <span className="font-semibold">ACTUAL PRICE ({company.ticker})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-0.5 border-t-2 border-dashed ${isDark ? 'border-[#ffffff]' : 'border-[#000000]'}`} />
            <span className={isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}>PREDICTION LINE</span>
          </div>
          <div className="flex items-center gap-2 hidden sm:flex">
            <span className={`w-3 h-3 rounded-sm border ${isDark ? 'bg-[#3f3f46]/30 border-[#52525b]/50' : 'bg-[#e4e4e7]/60 border-[#d4d4d8]'}`} />
            <span className={isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}>CONFIDENCE AREA</span>
          </div>
        </div>

        <div className={`px-2.5 py-1 rounded text-xs font-mono border ${
          isDark ? 'bg-[#18181b] border-[#3f3f46] text-[#a1a1aa]' : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#52525b]'
        }`}>
          INTRADAY FEED
        </div>
      </div>

      <ResponsiveContainer width="100%" height="86%">
        <ComposedChart data={company.graphData} margin={{ top: 15, right: 15, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id={`companyConfidenceGradient-${company.ticker}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeActual} stopOpacity={0.25} />
              <stop offset="95%" stopColor={strokeActual} stopOpacity={0.01} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />

          <XAxis
            dataKey="date"
            stroke={isDark ? '#52525b' : '#a1a1aa'}
            tick={{ fill: isDark ? '#a1a1aa' : '#52525b', fontSize: 11, fontFamily: 'monospace' }}
            tickLine={false}
            axisLine={{ stroke: gridColor }}
          />
          <YAxis
            domain={['dataMin - 5', 'dataMax + 5']}
            stroke={isDark ? '#52525b' : '#a1a1aa'}
            tick={{ fill: isDark ? '#a1a1aa' : '#52525b', fontSize: 11, fontFamily: 'monospace' }}
            tickLine={false}
            axisLine={{ stroke: gridColor }}
            tickFormatter={(val) => `${currencySymbol}${val}`}
          />

          <Tooltip content={<CustomTooltip isDark={isDark} currencySymbol={currencySymbol} />} />

          <Area
            type="monotone"
            dataKey="confidenceUpper"
            stroke="none"
            fill={`url(#companyConfidenceGradient-${company.ticker})`}
            animationDuration={1200}
          />

          <Line
            type="monotone"
            dataKey="predictedPrice"
            stroke={strokePredicted}
            strokeWidth={2.5}
            strokeDasharray="5 5"
            dot={false}
            activeDot={{ r: 6, fill: strokePredicted, stroke: isDark ? '#000000' : '#ffffff' }}
            animationDuration={1400}
          />

          <Line
            type="monotone"
            dataKey="actualPrice"
            stroke={strokeActual}
            strokeWidth={3}
            dot={{ r: 4, fill: strokeActual, stroke: isDark ? '#000000' : '#ffffff', strokeWidth: 2 }}
            activeDot={{ r: 7, fill: strokeActual, stroke: '#ffffff', strokeWidth: 2 }}
            animationDuration={1500}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
