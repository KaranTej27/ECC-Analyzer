'use client';

import { MarketOverviewCardData } from '@/constants/data';
import { useTheme } from '@/context/ThemeContext';

interface MarketCardProps {
  data: MarketOverviewCardData;
}

export function MarketCard({ data }: MarketCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Calculate SVG sparkline path
  const points = data.sparkline;
  const minVal = Math.min(...points);
  const maxVal = Math.max(...points);
  const range = maxVal - minVal || 1;
  const svgWidth = 160;
  const svgHeight = 48;

  const normalizedPoints = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * svgWidth;
    const y = svgHeight - ((val - minVal) / range) * (svgHeight - 12) - 6;
    return { x, y };
  });

  const pathD = normalizedPoints.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ''
  );

  const fillD = `${pathD} L ${svgWidth} ${svgHeight} L 0 ${svgHeight} Z`;

  // Determine graph color ONLY for graph paths (Emerald Green, Red, Yellow)
  const graphColor =
    data.trend === 'down' || (!data.isUp && data.trend !== 'warning')
      ? '#ef4444' // Red graph
      : data.trend === 'warning'
      ? '#f59e0b' // Yellow graph
      : '#10b981'; // Emerald Green graph

  return (
    <div
      className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 ${
        isDark
          ? 'bg-[#090909]/90 border-[#27272a] text-[#ffffff] hover:border-[#52525b] hover:shadow-[0_12px_36px_rgba(0,0,0,0.8)]'
          : 'bg-[#ffffff]/90 border-[#e4e4e7] text-[#000000] hover:border-[#a1a1aa] hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)]'
      }`}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span
              className={`px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider border ${
                isDark
                  ? 'bg-[#18181b] border-[#3f3f46] text-[#ffffff]'
                  : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#000000]'
              }`}
            >
              {data.symbol}
            </span>
            <span className={`text-sm font-sans font-medium ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
              {data.name}
            </span>
          </div>
          <div className="pt-1">
            <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight">{data.value}</span>
          </div>
        </div>

        {/* Mini Sparkline SVG: Colored graph only */}
        <div className="w-[160px] h-[48px] overflow-hidden shrink-0 pt-1">
          <svg width={svgWidth} height={svgHeight} className="overflow-visible">
            <defs>
              <linearGradient id={`gradient-${data.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={graphColor} stopOpacity="0.35" />
                <stop offset="100%" stopColor={graphColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d={fillD} fill={`url(#gradient-${data.id})`} />
            <path
              d={pathD}
              fill="none"
              stroke={graphColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#27272a]/60 dark:border-[#27272a] light:border-[#e4e4e7]">
        <span className={`text-xs font-sans font-medium ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
          Today's Performance
        </span>
        <div className="flex items-center gap-2 font-mono text-xs font-semibold">
          <span>{data.isUp ? '▲' : '▼'} {data.change}</span>
          <span
            className={`px-2 py-0.5 rounded text-xs border ${
              isDark
                ? 'bg-[#18181b] border-[#3f3f46] text-[#e4e4e7]'
                : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#18181b]'
            }`}
          >
            {data.changePercent}
          </span>
        </div>
      </div>
    </div>
  );
}
