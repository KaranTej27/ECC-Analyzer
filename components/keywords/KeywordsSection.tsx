'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KEYWORDS_LIST } from '@/lib/dummyData';
import { useTheme } from '@/context/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function KeywordsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.keyword-item');

      words.forEach((word) => {
        const speed = parseFloat(word.dataset.speed || '1');
        gsap.to(word, {
          y: (i, target) => -120 * speed,
          x: (i, target) => (Math.sin(speed * 3) * 40),
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="taxonomy"
      className="relative z-10 w-full min-h-screen flex flex-col justify-center px-6 lg:px-16 py-36 bg-transparent overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span
            className={`text-xs font-mono tracking-[0.3em] uppercase block mb-4 transition-colors ${
              isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
            }`}
          >
            04 // SYSTEM TAXONOMY
          </span>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text transition-all duration-500 mb-4 ${
              isDark
                ? 'bg-gradient-to-b from-[#FFFFFF] via-[#F5F5F5] to-[#999999]'
                : 'bg-gradient-to-b from-[#000000] via-[#151515] to-[#4B4B4B]'
            }`}
          >
            Core Intelligence
          </h2>
          <p
            className={`text-sm font-mono transition-colors ${
              isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
            }`}
          >
            Deep domain embeddings operating across quantitative finance and deep natural language processing.
          </p>
        </div>

        <div
          ref={wordsContainerRef}
          className="relative max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10 py-12"
        >
          {KEYWORDS_LIST.map((kw) => (
            <div
              key={kw.id}
              data-speed={kw.speed}
              className={`keyword-item select-none transition-all duration-700 hover:scale-110 cursor-default px-6 py-3 rounded-full border backdrop-blur-md ${
                isDark
                  ? 'border-[#151515] bg-[#090909]/60 hover:border-[#4B4B4B]/80 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                  : 'border-[#E5E5E5] bg-[#F5F5F5]/70 hover:border-[#000000]/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
              } ${kw.weight} ${kw.size} ${kw.opacity}`}
            >
              <span
                className={`text-transparent bg-clip-text transition-all duration-500 ${
                  isDark
                    ? 'bg-gradient-to-r from-[#FFFFFF] via-[#D9D9D9] to-[#999999]'
                    : 'bg-gradient-to-r from-[#000000] via-[#151515] to-[#4B4B4B]'
                }`}
              >
                {kw.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
