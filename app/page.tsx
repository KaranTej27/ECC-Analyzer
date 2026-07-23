'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { WhatIsEchoSection } from '@/components/about/WhatIsEchoSection';
import { VisualAnalyticsSection } from '@/components/analytics/VisualAnalyticsSection';
import { HowItWorksSection } from '@/components/timeline/HowItWorksSection';
import { KeywordsSection } from '@/components/keywords/KeywordsSection';
import { ContactSection } from '@/components/contact/ContactSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BackgroundCanvas = dynamic(
  () => import('@/components/three/BackgroundCanvas').then((mod) => mod.BackgroundCanvas),
  { ssr: false }
);

export default function Home() {
  useEffect(() => {
    // Refresh ScrollTrigger after DOM & Three.js canvas mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#000000] dark:bg-[#000000] light:bg-[#FFFFFF] text-[#FFFFFF] dark:text-[#FFFFFF] light:text-[#000000] selection:bg-[#FFFFFF] selection:text-[#000000] overflow-x-hidden transition-colors duration-500">
      <BackgroundCanvas />
      <Header />
      <div className="relative z-10">
        <HeroSection />
        <WhatIsEchoSection />
        <VisualAnalyticsSection />
        <HowItWorksSection />
        <KeywordsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
