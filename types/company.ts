export interface CompanyGraphPoint {
  date: string;
  time: string;
  actualPrice: number;
  predictedPrice: number;
  confidenceUpper: number;
  confidenceLower: number;
}

export interface CompanyNewsItem {
  id: string;
  headline: string;
  description: string;
  timeAgo: string;
  source?: string;
}

export interface CompanyMetric {
  label: string;
  value: string;
  change?: string;
  isUp?: boolean;
}

export interface CompanyAIInsights {
  summary: string;
  cautionLevel: 'Low Caution' | 'Moderate Caution' | 'High Caution';
  cautionReason: string;
  pastEarningsSummary: string;
  nextEarningsOutlook: string;
  nextEarningsDate: string;
}

export interface CompanyData {
  ticker: string;
  name: string;
  exchange: string;
  sector: string;
  price: string;
  numericPrice: number;
  predictedPostEarningsPrice: string;
  numericPredictedPostEarningsPrice: number;
  change: string;
  changePercent: string;
  isUp: boolean;
  marketCap: string;
  high52: string;
  low52: string;
  revenue: string;
  eps: string;
  predictionConfidence: string;
  aiInsights: CompanyAIInsights;
  graphData: CompanyGraphPoint[];
  news: CompanyNewsItem[];
}
