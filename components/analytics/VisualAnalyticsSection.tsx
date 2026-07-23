'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FinancialChart } from './FinancialChart';
import { FLOATING_ANALYTICS_METRICS } from '@/lib/dummyData';
import { Activity, Gauge, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function VisualAnalyticsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const metricsRowRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chartWrapperRef.current,
        { opacity: 0, scale: 0.94, y: 60, filter: 'blur(12px)' },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const metricCards = gsap.utils.toArray<HTMLElement>('.metric-card');
      gsap.fromTo(
        metricCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: metricsRowRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getMetricIcon = (index: number) => {
    const iconClass = isDark ? 'text-[#FFFFFF]' : 'text-[#000000]';
    if (index === 0) return <Sparkles className={`w-4 h-4 ${iconClass}`} />;
    if (index === 1) return <Gauge className={`w-4 h-4 ${iconClass}`} />;
    return <Activity className={`w-4 h-4 ${iconClass}`} />;
  };

  return (
    <section
      ref={containerRef}
      id="analytics"
      className="relative z-10 w-full min-h-screen flex flex-col justify-center px-6 lg:px-16 py-32 bg-transparent transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <span
              className={`text-xs font-mono tracking-[0.3em] uppercase block mb-4 transition-colors ${
                isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
              }`}
            >
              02 // PREDICTIVE FORECASTING
            </span>
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text transition-all duration-500 ${
                isDark
                  ? 'bg-gradient-to-b from-[#FFFFFF] via-[#F5F5F5] to-[#999999]'
                  : 'bg-gradient-to-b from-[#000000] via-[#151515] to-[#4B4B4B]'
              }`}
            >
              Visual Analytics
            </h2>
          </div>

          <p
            className={`text-sm font-mono max-w-sm transition-colors ${
              isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
            }`}
          >
            Continuous real-time signal stream evaluating earnings calls against historical alpha models.
          </p>
        </div>

        <div ref={chartWrapperRef} className="mb-16">
          <FinancialChart />
        </div>

        <div ref={metricsRowRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FLOATING_ANALYTICS_METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className={`metric-card p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-[#090909]/90 border-[#151515] hover:border-[#4B4B4B]/60'
                  : 'bg-[#F5F5F5]/90 border-[#E5E5E5] hover:border-[#999999]/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-[11px] font-mono tracking-widest uppercase transition-colors ${
                    isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
                  }`}
                >
                  {metric.label}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-colors ${
                    isDark ? 'bg-[#151515] border-[#4B4B4B]/20' : 'bg-[#FFFFFF] border-[#D9D9D9]'
                  }`}
                >
                  {getMetricIcon(idx)}
                </div>
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <span
                  className={`text-3xl font-extrabold font-mono transition-colors ${
                    isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'
                  }`}
                >
                  {metric.value}
                </span>
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded border transition-colors ${
                    isDark
                      ? 'text-[#D9D9D9] bg-[#151515] border-[#4B4B4B]/30'
                      : 'text-[#151515] bg-[#FFFFFF] border-[#D9D9D9]'
                  }`}
                >
                  {metric.trend}
                </span>
              </div>

              <p
                className={`text-xs font-mono leading-relaxed transition-colors ${
                  isDark ? 'text-[#4B4B4B]' : 'text-[#999999]'
                }`}
              >
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
