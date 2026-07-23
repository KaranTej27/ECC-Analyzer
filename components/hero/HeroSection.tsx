'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { useTheme } from '@/context/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const echoChars = ['E', 'C', 'H', 'O'];
  const isDark = theme === 'dark';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTl.fromTo(
        '.hero-char',
        { opacity: 0, y: 80, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.15,
          delay: 0.2,
        }
      );

      introTl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 },
        '-=0.6'
      );

      introTl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.8, y: 0, duration: 0.9 },
        '-=0.5'
      );

      introTl.fromTo(
        dividerLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.4, duration: 1, ease: 'power2.inOut' },
        '-=0.4'
      );

      introTl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.2'
      );

      if (containerRef.current && titleWrapperRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
            pin: false,
          },
        })
          .to(titleWrapperRef.current, {
            scale: 0.65,
            y: -120,
            opacity: 0.1,
            ease: 'none',
          })
          .to(
            [subtitleRef.current, taglineRef.current, dividerLineRef.current, scrollIndicatorRef.current],
            {
              opacity: 0,
              y: -80,
              ease: 'none',
            },
            '< =0.1'
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="overview"
      className="relative z-10 w-full h-screen flex flex-col items-center justify-between px-6 py-20 overflow-hidden bg-transparent"
    >
      <div className="h-16" />

      <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto my-auto">
        <div ref={titleWrapperRef} className="flex items-center justify-center gap-2 md:gap-6 mb-4 select-none">
          {echoChars.map((char, idx) => (
            <span
              key={idx}
              className={`hero-char font-extrabold text-[22vw] md:text-[18vw] leading-none tracking-tighter text-transparent bg-clip-text transition-all duration-500 ${
                isDark
                  ? 'bg-gradient-to-b from-[#FFFFFF] via-[#F5F5F5] to-[#4B4B4B] drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]'
                  : 'bg-gradient-to-b from-[#000000] via-[#151515] to-[#999999] drop-shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
              }`}
            >
              {char}
            </span>
          ))}
        </div>

        <p
          ref={subtitleRef}
          className={`text-lg md:text-3xl font-mono tracking-[0.2em] uppercase font-light mb-6 transition-colors duration-500 ${
            isDark ? 'text-[#D9D9D9]' : 'text-[#151515]'
          }`}
        >
          {SITE_CONFIG.fullName}
        </p>

        <p
          ref={taglineRef}
          className={`text-sm md:text-lg font-light tracking-wide max-w-xl mx-auto italic font-serif transition-colors duration-500 ${
            isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
          }`}
        >
          &ldquo;{SITE_CONFIG.tagline}&rdquo;
        </p>

        <div
          ref={dividerLineRef}
          className={`w-48 h-[1px] my-10 transform origin-center transition-all duration-500 ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent'
              : 'bg-gradient-to-r from-transparent via-[#4B4B4B] to-transparent'
          }`}
        />
      </div>

      <div
        ref={scrollIndicatorRef}
        className="flex flex-col items-center gap-3 cursor-pointer group pb-4"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span
          className={`text-[11px] font-mono tracking-[0.3em] uppercase transition-colors ${
            isDark ? 'text-[#999999] group-hover:text-[#FFFFFF]' : 'text-[#4B4B4B] group-hover:text-[#000000]'
          }`}
        >
          SCROLL TO EXPLORE
        </span>
        <div
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 animate-bounce ${
            isDark
              ? 'border-[#4B4B4B]/50 bg-[#151515]/60 text-[#D9D9D9] group-hover:border-[#FFFFFF] group-hover:text-[#FFFFFF]'
              : 'border-[#D9D9D9] bg-[#F5F5F5]/80 text-[#151515] group-hover:border-[#000000] group-hover:text-[#000000]'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}
