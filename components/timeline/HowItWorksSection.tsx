'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE_STEPS } from '@/lib/dummyData';
import { ChevronRight, Database, Cpu, Layers, BarChart3, Radio } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !trackRef.current) return;

      const totalWidth = trackRef.current.scrollWidth - trackRef.current.clientWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: `+=${totalWidth * 1.5}`,
          onUpdate: (self) => {
            const step = Math.min(
              TIMELINE_STEPS.length - 1,
              Math.floor(self.progress * TIMELINE_STEPS.length)
            );
            setActiveStepIndex(step);
            if (progressLineRef.current) {
              progressLineRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => clearTimeout(timer);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Radio className="w-5 h-5" />;
      case 1:
        return <Cpu className="w-5 h-5" />;
      case 2:
        return <Layers className="w-5 h-5" />;
      case 3:
        return <BarChart3 className="w-5 h-5" />;
      case 4:
        return <Database className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section
      ref={containerRef}
      id="architecture"
      className="relative z-10 w-full h-screen flex flex-col justify-center overflow-hidden bg-transparent transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-16 mb-12">
        <span
          className={`text-xs font-mono tracking-[0.3em] uppercase block mb-4 transition-colors ${
            isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'
          }`}
        >
          03 // SYSTEM ARCHITECTURE
        </span>
        <h2
          className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text transition-all duration-500 ${
            isDark
              ? 'bg-gradient-to-b from-[#FFFFFF] via-[#F5F5F5] to-[#999999]'
              : 'bg-gradient-to-b from-[#000000] via-[#151515] to-[#4B4B4B]'
          }`}
        >
          How It Works
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-6 lg:px-16 mb-8">
        <div className={`w-full h-[1px] relative transition-colors ${isDark ? 'bg-[#27272a]' : 'bg-[#E5E5E5]'}`}>
          <div
            ref={progressLineRef}
            className={`h-full transition-all duration-150 ${
              isDark
                ? 'bg-gradient-to-r from-[#FFFFFF] via-[#D9D9D9] to-[#FFFFFF] shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                : 'bg-gradient-to-r from-[#000000] via-[#4B4B4B] to-[#000000] shadow-[0_0_12px_rgba(0,0,0,0.4)]'
            }`}
            style={{ width: '0%' }}
          />
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-stretch gap-8 lg:gap-12 px-6 lg:px-16 py-4 transition-transform ease-out"
        >
          {TIMELINE_STEPS.map((step, idx) => {
            const isActive = idx <= activeStepIndex;
            const isCurrent = idx === activeStepIndex;

            return (
              <div
                key={step.id}
                className={`relative flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[420px] p-8 rounded-2xl border transition-all duration-500 flex flex-col justify-between ${
                  isDark
                    ? isCurrent
                      ? 'border-[#FFFFFF] shadow-[0_0_40px_rgba(255,255,255,0.15)] bg-[#18181b]/95 opacity-100'
                      : isActive
                      ? 'border-[#3f3f46] bg-[#090909]/95 opacity-90'
                      : 'border-[#27272a] bg-[#090909]/80 opacity-85'
                    : isCurrent
                    ? 'border-[#000000] shadow-[0_4px_30px_rgba(0,0,0,0.1)] bg-[#FFFFFF] opacity-100'
                    : isActive
                    ? 'border-[#999999] bg-[#F5F5F5]/90 opacity-90'
                    : 'border-[#E5E5E5] bg-[#F5F5F5]/70 opacity-85'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className={`text-4xl font-mono font-extrabold ${
                        isActive
                          ? isDark
                            ? 'text-[#FFFFFF]'
                            : 'text-[#000000]'
                          : isDark
                          ? 'text-[#a1a1aa]'
                          : 'text-[#999999]'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                        isCurrent
                          ? isDark
                            ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                            : 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                          : isActive
                          ? isDark
                            ? 'bg-[#18181b] text-[#FFFFFF] border-[#3f3f46]'
                            : 'bg-[#FFFFFF] text-[#000000] border-[#D9D9D9]'
                          : 'bg-transparent text-[#a1a1aa] border-[#3f3f46]'
                      }`}
                    >
                      {getStepIcon(idx)}
                    </div>
                  </div>

                  <h3
                    className={`text-xl font-bold tracking-tight mb-2 transition-colors ${
                      isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-xs font-mono uppercase tracking-wider mb-4 transition-colors ${
                      isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'
                    }`}
                  >
                    {step.subtitle}
                  </p>
                  <p
                    className={`text-sm font-light leading-relaxed mb-8 transition-colors ${
                      isDark ? 'text-[#e4e4e7]' : 'text-[#151515]'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>

                {step.metrics && (
                  <div
                    className={`pt-6 border-t grid grid-cols-2 gap-4 font-mono text-xs transition-colors ${
                      isDark ? 'border-[#27272a]' : 'border-[#E5E5E5]'
                    }`}
                  >
                    {step.metrics.map((m) => (
                      <div key={m.label}>
                        <span
                          className={`text-[10px] block uppercase tracking-wider ${
                            isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'
                          }`}
                        >
                          {m.label}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'
                          }`}
                        >
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {idx < TIMELINE_STEPS.length - 1 && (
                  <div className={`absolute -right-6 top-1/2 -translate-y-1/2 z-20 ${
                    isDark ? 'text-[#a1a1aa]' : 'text-[#999999]'
                  }`}>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
