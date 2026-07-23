'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_STATS } from '@/lib/dummyData';
import { Cpu, Mic, TrendingUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhatIsEchoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftHeadingRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [leftHeadingRef.current, rightTextRef.current],
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const statCards = gsap.utils.toArray<HTMLElement>('.stat-card');
      gsap.fromTo(
        statCards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRowRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.timeline({
        scrollTrigger: {
          trigger: statsRowRef.current,
          start: 'top 50%',
          end: 'bottom top',
          scrub: 1,
        },
      })
        .to(statCards[0], { x: -35, opacity: 0.85 }, 0)
        .to(statCards[2], { x: 35, opacity: 0.85 }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (id: string) => {
    const iconClass = isDark ? 'text-[#FFFFFF]' : 'text-[#000000]';
    switch (id) {
      case 'llm':
        return <Cpu className={`w-5 h-5 ${iconClass}`} />;
      case 'audio':
        return <Mic className={`w-5 h-5 ${iconClass}`} />;
      case 'volatility':
        return <TrendingUp className={`w-5 h-5 ${iconClass}`} />;
      default:
        return <Cpu className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative z-10 w-full min-h-screen flex flex-col justify-center px-6 lg:px-16 py-32 bg-transparent transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-5">
            <span
              className={`text-xs font-mono tracking-[0.3em] uppercase block mb-4 transition-colors ${
                isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
              }`}
            >
              01 // SYSTEM OVERVIEW
            </span>
            <h2
              ref={leftHeadingRef}
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text transition-all duration-500 ${
                isDark
                  ? 'bg-gradient-to-b from-[#FFFFFF] via-[#F5F5F5] to-[#999999]'
                  : 'bg-gradient-to-b from-[#000000] via-[#151515] to-[#4B4B4B]'
              }`}
            >
              What is ECHO?
            </h2>
          </div>

          <div ref={rightTextRef} className="lg:col-span-7 flex flex-col gap-6">
            <p
              className={`text-xl md:text-2xl font-light leading-relaxed tracking-wide font-sans transition-colors ${
                isDark ? 'text-[#D9D9D9]' : 'text-[#151515]'
              }`}
            >
              ECHO leverages domain-tuned large language models and acoustic voice intelligence to analyze quarterly earnings conference calls in real time.
            </p>
            <p
              className={`text-base md:text-lg font-extralight leading-relaxed transition-colors ${
                isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
              }`}
            >
              By processing executive tone, semantic shifts, and guidance variance, ECHO uncovers high-conviction predictive market signals before they become obvious to public exchanges.
            </p>
          </div>
        </div>

        <div ref={statsRowRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {HERO_STATS.map((stat) => (
            <div
              key={stat.id}
              className={`stat-card relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-500 group flex flex-col justify-between min-h-[240px] ${
                isDark
                  ? 'bg-[#090909]/90 border-[#151515] hover:border-[#4B4B4B]/60'
                  : 'bg-[#F5F5F5]/90 border-[#E5E5E5] hover:border-[#999999]/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
              }`}
            >
              <div className="flex items-start justify-between mb-8">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                    isDark
                      ? 'bg-[#151515] border-[#4B4B4B]/30 group-hover:border-[#FFFFFF]'
                      : 'bg-[#FFFFFF] border-[#D9D9D9] group-hover:border-[#000000]'
                  }`}
                >
                  {getIcon(stat.id)}
                </div>
                <span
                  className={`text-3xl lg:text-4xl font-mono font-bold tracking-tight transition-colors ${
                    isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'
                  }`}
                >
                  {stat.value}
                </span>
              </div>

              <div>
                <h3
                  className={`text-lg font-semibold tracking-tight mb-1 transition-colors ${
                    isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'
                  }`}
                >
                  {stat.title}
                </h3>
                <p
                  className={`text-xs font-mono tracking-wider uppercase mb-3 transition-colors ${
                    isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
                  }`}
                >
                  {stat.label}
                </p>
                <p
                  className={`text-xs leading-relaxed transition-colors ${
                    isDark
                      ? 'text-[#4B4B4B] group-hover:text-[#999999]'
                      : 'text-[#999999] group-hover:text-[#151515]'
                  }`}
                >
                  {stat.description}
                </p>
              </div>

              <div
                className={`absolute bottom-0 left-8 right-8 h-[1px] transition-all duration-500 ${
                  isDark
                    ? 'bg-gradient-to-r from-transparent via-[#4B4B4B]/30 to-transparent group-hover:via-[#FFFFFF]/50'
                    : 'bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent group-hover:via-[#000000]/50'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
