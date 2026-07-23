'use client';

import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '@/lib/constants';
import { Activity, Shield } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function Footer() {
  const [utcTime, setUtcTime] = useState<string>('');
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().split(' ')[4] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className={`relative z-10 border-t px-6 lg:px-16 py-12 transition-all duration-500 ${
        isDark
          ? 'border-[#151515] bg-[#000000] text-[#999999]'
          : 'border-[#E5E5E5] bg-[#FFFFFF] text-[#4B4B4B]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
        <div className="flex items-center gap-4">
          <div
            className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold transition-colors ${
              isDark
                ? 'border-[#4B4B4B] bg-[#090909] text-[#FFFFFF]'
                : 'border-[#D9D9D9] bg-[#F5F5F5] text-[#000000]'
            }`}
          >
            E
          </div>
          <span className={`font-medium ${isDark ? 'text-[#D9D9D9]' : 'text-[#000000]'}`}>
            {SITE_CONFIG.name}
          </span>
          <span className={isDark ? 'text-[#4B4B4B]' : 'text-[#D9D9D9]'}>|</span>
          <span>{SITE_CONFIG.copyright}</span>
        </div>

        <div
          className={`flex items-center gap-3 px-4 py-1.5 rounded-full border transition-colors ${
            isDark
              ? 'bg-[#090909] border-[#151515] text-[#999999]'
              : 'bg-[#F5F5F5] border-[#E5E5E5] text-[#4B4B4B]'
          }`}
        >
          <Activity className={`w-3.5 h-3.5 animate-pulse ${isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'}`} />
          <span className="tracking-widest uppercase text-[11px]">
            0x87A9 • SEC STREAM INGESTION ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            <span>FASTAPI COMPATIBLE</span>
          </div>
          <span className={isDark ? 'text-[#4B4B4B]' : 'text-[#D9D9D9]'}>|</span>
          <span className={`tracking-wider font-semibold ${isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'}`}>
            {utcTime}
          </span>
        </div>
      </div>
    </footer>
  );
}
