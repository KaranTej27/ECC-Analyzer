'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_PERSONS } from '@/lib/dummyData';
import { Mail, Phone, MapPin, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const [submitted, setSubmitted] = useState(false);
  const [accessEmail, setAccessEmail] = useState('');

  const isDark = theme === 'dark';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('.contact-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessEmail) {
      setSubmitted(true);
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative z-10 w-full min-h-screen flex flex-col justify-center px-6 lg:px-16 py-36 bg-transparent transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-4xl mb-24">
          <span
            className={`text-xs font-mono tracking-[0.3em] uppercase block mb-6 transition-colors ${
              isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
            }`}
          >
            05 // GET ACCESS
          </span>
          <h2
            ref={headlineRef}
            className={`text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.05] text-transparent bg-clip-text transition-all duration-500 ${
              isDark
                ? 'bg-gradient-to-b from-[#FFFFFF] via-[#F5F5F5] to-[#4B4B4B]'
                : 'bg-gradient-to-b from-[#000000] via-[#151515] to-[#999999]'
            }`}
          >
            Let&apos;s Build Better Market Intelligence.
          </h2>
        </div>

        <div
          className={`max-w-2xl mb-24 p-8 rounded-3xl border backdrop-blur-xl shadow-2xl transition-all duration-500 ${
            isDark
              ? 'bg-[#090909]/95 border-[#151515]'
              : 'bg-[#FFFFFF]/95 border-[#E5E5E5] shadow-[0_10px_40px_rgba(0,0,0,0.05)]'
          }`}
        >
          <h3
            className={`text-xl font-bold mb-2 transition-colors ${
              isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'
            }`}
          >
            Request Private Protocol Access
          </h3>
          <p
            className={`text-xs font-mono mb-6 transition-colors ${
              isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
            }`}
          >
            FastAPI endpoint integration documentation and API tokens provided upon institutional verification.
          </p>

          {submitted ? (
            <div
              className={`flex items-center gap-3 p-4 rounded-xl border font-mono text-xs transition-colors ${
                isDark
                  ? 'bg-[#151515] border-[#FFFFFF]/40 text-[#FFFFFF]'
                  : 'bg-[#F5F5F5] border-[#000000]/40 text-[#000000]'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>REQUEST RECEIVED • OUR INSTITUTIONAL TEAM WILL REACH OUT SHORTLY</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                required
                value={accessEmail}
                onChange={(e) => setAccessEmail(e.target.value)}
                placeholder="enter institutional email..."
                className={`w-full px-5 py-3.5 rounded-full border text-sm font-mono focus:outline-none transition-colors ${
                  isDark
                    ? 'bg-[#151515] border-[#4B4B4B]/40 text-[#FFFFFF] placeholder-[#4B4B4B] focus:border-[#FFFFFF]'
                    : 'bg-[#F5F5F5] border-[#D9D9D9] text-[#000000] placeholder-[#999999] focus:border-[#000000]'
                }`}
              />
              <button
                type="submit"
                className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                  isDark
                    ? 'bg-[#FFFFFF] text-[#000000] hover:bg-[#F5F5F5]'
                    : 'bg-[#000000] text-[#FFFFFF] hover:bg-[#151515]'
                }`}
              >
                <span>SUBMIT</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CONTACT_PERSONS.map((person, idx) => (
            <div
              key={idx}
              className={`contact-card p-8 lg:p-10 rounded-3xl border backdrop-blur-md transition-all duration-500 flex flex-col justify-between group ${
                isDark
                  ? 'bg-[#090909]/90 border-[#151515] hover:border-[#4B4B4B]/70'
                  : 'bg-[#F5F5F5]/90 border-[#E5E5E5] hover:border-[#000000]/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span
                    className={`text-[11px] font-mono tracking-widest uppercase transition-colors ${
                      isDark ? 'text-[#999999]' : 'text-[#4B4B4B]'
                    }`}
                  >
                    {person.role}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                      isDark
                        ? 'bg-[#151515] border-[#4B4B4B]/30 group-hover:border-[#FFFFFF]'
                        : 'bg-[#FFFFFF] border-[#D9D9D9] group-hover:border-[#000000]'
                    }`}
                  >
                    <ArrowUpRight
                      className={`w-4 h-4 transition-colors ${
                        isDark ? 'text-[#D9D9D9] group-hover:text-[#FFFFFF]' : 'text-[#4B4B4B] group-hover:text-[#000000]'
                      }`}
                    />
                  </div>
                </div>

                <h4
                  className={`text-2xl font-bold tracking-tight mb-2 transition-colors ${
                    isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'
                  }`}
                >
                  {person.title}
                </h4>
                <p
                  className={`text-xs font-mono flex items-center gap-2 mb-8 transition-colors ${
                    isDark ? 'text-[#4B4B4B]' : 'text-[#999999]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{person.location}</span>
                </p>
              </div>

              <div
                className={`space-y-4 pt-6 border-t font-mono text-xs transition-colors ${
                  isDark ? 'border-[#151515] text-[#999999]' : 'border-[#E5E5E5] text-[#4B4B4B]'
                }`}
              >
                <div
                  className={`flex items-center justify-between py-2 px-4 rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-[#151515]/60 border-[#4B4B4B]/20'
                      : 'bg-[#FFFFFF] border-[#E5E5E5]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> EMAIL:
                  </span>
                  <span className={`font-semibold ${isDark ? 'text-[#D9D9D9]' : 'text-[#000000]'}`}>
                    {person.email || 'partner@echo-outlook.ai'}
                  </span>
                </div>

                <div
                  className={`flex items-center justify-between py-2 px-4 rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-[#151515]/60 border-[#4B4B4B]/20'
                      : 'bg-[#FFFFFF] border-[#E5E5E5]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> PHONE:
                  </span>
                  <span className={`font-semibold ${isDark ? 'text-[#D9D9D9]' : 'text-[#000000]'}`}>
                    {person.phone || '+1 (800) 555-ECHO'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
