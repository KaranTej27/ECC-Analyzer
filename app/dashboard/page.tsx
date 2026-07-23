'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { MarketCard } from '@/components/dashboard/MarketCard';
import { UpdateItem } from '@/components/dashboard/UpdateItem';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { CompanyDashboard } from '@/components/dashboard/CompanyDashboard';
import { EmptyState } from '@/components/dashboard/EmptyState';
import {
  MARKET_OVERVIEW_CARDS,
  RECENT_MARKET_UPDATES,
  MARKET_STATISTICS,
} from '@/constants/data';
import { getCompanyByTicker } from '@/lib/dummyCompanies';
import { CompanyData } from '@/types/company';
import { Activity, Zap, BarChart2, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewContainerRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Search & View state management
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);
  const [hasSubmittedSearch, setHasSubmittedSearch] = useState<boolean>(false);

  // GSAP initial page entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '#dashboard-header',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      );

      tl.fromTo(
        '#dashboard-sidebar',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      tl.fromTo(
        '#dashboard-searchbar',
        { scale: 0.97, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      );

      tl.fromTo(
        '#dashboard-view-content',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth view transition helper function
  const animateViewTransition = (updateStateCallback: () => void) => {
    if (!viewContainerRef.current) {
      updateStateCallback();
      return;
    }

    const tl = gsap.timeline();
    tl.to(viewContainerRef.current, {
      opacity: 0,
      y: -12,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        updateStateCallback();
      },
    });

    tl.fromTo(
      viewContainerRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );
  };

  // Search submit handler
  const handleSearchSubmit = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      handleClearSearch();
      return;
    }

    animateViewTransition(() => {
      setSearchQuery(trimmed);
      const company = getCompanyByTicker(trimmed);
      setSelectedCompany(company);
      setHasSubmittedSearch(true);
    });
  };

  // Clear search handler (returns back to Market Overview)
  const handleClearSearch = () => {
    animateViewTransition(() => {
      setSearchQuery('');
      setSelectedCompany(null);
      setHasSubmittedSearch(false);
    });
  };

  // Select suggestion chip from empty state
  const handleSelectSuggestedTicker = (ticker: string) => {
    handleSearchSubmit(ticker);
  };

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen font-sans selection:bg-[#ffffff] selection:text-[#000000] transition-colors duration-500 ${
        isDark ? 'bg-[#000000] text-[#ffffff]' : 'bg-[#ffffff] text-[#000000]'
      }`}
    >
      {/* Fixed Header */}
      <DashboardHeader />

      {/* Sidebar & Main Layout Wrapper */}
      <div className="relative z-10 pt-[76px] flex">
        {/* Left Sidebar (Fixed on Desktop) */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 w-full lg:pl-64 px-6 sm:px-10 lg:px-12 py-8 max-w-[1600px] mx-auto space-y-8 transition-colors duration-500">
          {/* TOP: Search Bar */}
          <section className="pt-1">
            <SearchBar
              initialValue={searchQuery}
              onSearchSubmit={handleSearchSubmit}
              onClear={handleClearSearch}
            />
          </section>

          {/* DYNAMIC VIEW CONTENT (Market Overview vs Company Analysis vs Empty State) */}
          <div id="dashboard-view-content" ref={viewContainerRef}>
            {hasSubmittedSearch ? (
              selectedCompany ? (
                /* COMPANY ANALYSIS VIEW */
                <div className="space-y-6">
                  {/* Breadcrumb / Back to Market Overview */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                        isDark
                          ? 'bg-[#18181b] border-[#3f3f46] text-[#a1a1aa] hover:text-[#ffffff] hover:border-[#ffffff]'
                          : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#52525b] hover:text-[#000000] hover:border-[#000000]'
                      }`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Market Overview</span>
                    </button>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className={`px-2.5 py-1 rounded border font-semibold ${
                        selectedCompany.isUp ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]' : 'bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]'
                      }`}>
                        {selectedCompany.ticker} • {selectedCompany.changePercent}
                      </span>
                    </div>
                  </div>

                  {/* Company Dashboard 65/35 Layout */}
                  <CompanyDashboard company={selectedCompany} />
                </div>
              ) : (
                /* ELEGANT EMPTY STATE */
                <EmptyState query={searchQuery} onSelectTicker={handleSelectSuggestedTicker} />
              )
            ) : (
              /* DEFAULT MARKET OVERVIEW */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN: Overview & Statistics (lg:col-span-7) */}
                <div className="lg:col-span-7 space-y-9">
                  {/* SECTION 1: Market Overview */}
                  <section className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight font-sans flex items-center gap-2.5">
                          <Activity className="w-6 h-6 opacity-80" />
                          <span>Market Overview</span>
                        </h2>
                        <p className={`text-sm font-sans mt-1 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
                          Real-time benchmark index performance tracking
                        </p>
                      </div>
                      <span
                        className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border transition-colors ${
                          isDark ? 'bg-[#18181b] border-[#3f3f46] text-[#a1a1aa]' : 'bg-[#f4f4f5] border-[#d4d4d8] text-[#52525b]'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-[#ffffff]' : 'bg-[#000000]'}`} />
                        <span>LIVE FEED</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {MARKET_OVERVIEW_CARDS.map((card) => (
                        <div key={card.id} className="market-overview-card">
                          <MarketCard data={card} />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SECTION 3: Market Statistics */}
                  <section className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight font-sans flex items-center gap-2.5">
                          <BarChart2 className="w-6 h-6 opacity-80" />
                          <span>Market Statistics</span>
                        </h2>
                        <p className={`text-sm font-sans mt-1 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
                          Aggregate liquidity, volatility, and constituent engagement
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {MARKET_STATISTICS.map((stat) => (
                        <div key={stat.id} className="stats-card-item">
                          <StatsCard stat={stat} />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* RIGHT COLUMN: Recent Market Updates (lg:col-span-5) */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight font-sans flex items-center gap-2.5">
                        <Zap className="w-6 h-6 opacity-80" />
                        <span>Recent Updates</span>
                      </h2>
                      <p className={`text-sm font-sans mt-1 ${isDark ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>
                        High-conviction macro signals & updates
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {RECENT_MARKET_UPDATES.map((update) => (
                      <div key={update.id} className="update-list-item">
                        <UpdateItem update={update} />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
