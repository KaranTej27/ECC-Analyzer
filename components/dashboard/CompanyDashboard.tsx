'use client';

import { CompanyData } from '@/types/company';
import { CompanyGraph } from './CompanyGraph';
import { StatisticCard } from './StatisticCard';
import { CompanyOverview } from './CompanyOverview';
import { NewsCard } from './NewsCard';
import { CompanyAIInsights } from './CompanyAIInsights';

interface CompanyDashboardProps {
  company: CompanyData;
}

export function CompanyDashboard({ company }: CompanyDashboardProps) {
  return (
    <div className="w-full space-y-8">
      {/* 12-Column Responsive Split Layout (7 Cols Left / 5 Cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT SECTION (~65% Width / lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-7">
          {/* Large Interactive Recharts Graph */}
          <div className="w-full">
            <CompanyGraph company={company} />
          </div>

          {/* 3 Compact Statistic Cards Below Graph */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <StatisticCard
              label="Revenue"
              value={company.revenue}
              subtitle="TTM Consolidated Financials"
            />
            <StatisticCard
              label="EPS"
              value={company.eps}
              subtitle="Diluted Earnings Per Share"
            />
            <StatisticCard
              label="Prediction Confidence"
              value={company.predictionConfidence}
              subtitle="ECHO Neural Model Accuracy"
            />
          </div>

          {/* ECHO AI Intelligence & Earnings Call Insights (Fills Empty Space Below Stat Cards) */}
          <div className="w-full pt-2">
            <CompanyAIInsights insights={company.aiInsights} ticker={company.ticker} />
          </div>
        </div>

        {/* RIGHT SECTION (~35% Width / lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-7">
          {/* Executive Company Overview Card */}
          <CompanyOverview company={company} />

          {/* Recent 5 Company News Items */}
          <NewsCard news={company.news} />
        </div>

      </div>
    </div>
  );
}
