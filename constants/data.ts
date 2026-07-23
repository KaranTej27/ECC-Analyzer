export interface MarketIndicator {
  id: string;
  name: string;
  value: string;
  numericValue: number;
  change: string;
  changePercent: string;
  isUp: boolean;
}

export interface MarketOverviewCardData {
  id: string;
  symbol: string;
  name: string;
  value: string;
  numericValue: number;
  change: string;
  changePercent: string;
  isUp: boolean;
  trend?: 'up' | 'down' | 'warning';
  sparkline: number[];
}

export interface MarketUpdateData {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
  category: 'monetary' | 'earnings' | 'expansion' | 'macro' | 'energy';
  iconName: 'Building2' | 'TrendingUp' | 'Zap' | 'Globe' | 'Activity' | 'DollarSign';
}

export interface MarketStatData {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  subtitle?: string;
  isUp?: boolean;
}

export interface UserProfileData {
  username: string;
  role: string;
  avatarUrl?: string;
  initials: string;
}

export const INITIAL_MARKET_INDICATORS: MarketIndicator[] = [
  {
    id: 'nifty-header',
    name: 'NIFTY 50',
    value: '25,148.30',
    numericValue: 25148.30,
    change: '+105.20',
    changePercent: '+0.42%',
    isUp: true,
  },
  {
    id: 'sensex-header',
    name: 'Sensex',
    value: '82,241.65',
    numericValue: 82241.65,
    change: '+311.80',
    changePercent: '+0.38%',
    isUp: true,
  },
];

export const MARKET_OVERVIEW_CARDS: MarketOverviewCardData[] = [
  {
    id: 'nifty-overview',
    symbol: 'NIFTY 50',
    name: 'NIFTY Benchmark Index',
    value: '25,148.30',
    numericValue: 25148.30,
    change: '+105.20',
    changePercent: '+0.42%',
    isUp: true,
    trend: 'up', // Emerald Green Graph
    sparkline: [24980, 25010, 25000, 25080, 25060, 25120, 25110, 25148],
  },
  {
    id: 'sensex-overview',
    symbol: 'SENSEX',
    name: 'BSE Sensex Index',
    value: '82,241.65',
    numericValue: 82241.65,
    change: '+311.80',
    changePercent: '+0.38%',
    isUp: true,
    trend: 'up', // Emerald Green Graph
    sparkline: [81800, 81920, 81890, 82100, 82050, 82180, 82200, 82241],
  },
  {
    id: 'it-overview',
    symbol: 'NIFTY IT',
    name: 'Tech Sector Index',
    value: '41,890.10',
    numericValue: 41890.10,
    change: '-185.40',
    changePercent: '-0.44%',
    isUp: false,
    trend: 'down', // Red Graph
    sparkline: [42200, 42150, 42080, 41990, 42020, 41920, 41890],
  },
  {
    id: 'vix-overview',
    symbol: 'INDIA VIX',
    name: 'Volatility & Hedging Index',
    value: '17.80',
    numericValue: 17.80,
    change: '+0.15',
    changePercent: '+0.85%',
    isUp: true,
    trend: 'warning', // Yellow Graph
    sparkline: [16.5, 16.8, 17.2, 17.0, 17.4, 17.6, 17.8],
  },
];

export const RECENT_MARKET_UPDATES: MarketUpdateData[] = [
  {
    id: 'update-1',
    title: 'Federal Reserve maintains benchmark rates',
    subtitle: 'FOMC signals cautious approach to policy easing amid steady inflation metrics.',
    timeAgo: '2 min ago',
    category: 'monetary',
    iconName: 'Building2',
  },
  {
    id: 'update-2',
    title: 'Apple beats quarterly earnings estimates',
    subtitle: 'Services segment hits record highs while iPhone sales remain resilient across global markets.',
    timeAgo: '15 min ago',
    category: 'earnings',
    iconName: 'TrendingUp',
  },
  {
    id: 'update-3',
    title: 'Reliance announces clean energy infrastructure expansion',
    subtitle: 'Strategic initiative aims to scale green hydrogen capacity over next two quarters.',
    timeAgo: '30 min ago',
    category: 'expansion',
    iconName: 'Zap',
  },
  {
    id: 'update-4',
    title: 'Global trade volume rebounds across Asian technology corridor',
    subtitle: 'Semiconductor supply routes show increased shipment velocity in Q3 preliminary data.',
    timeAgo: '45 min ago',
    category: 'macro',
    iconName: 'Globe',
  },
  {
    id: 'update-5',
    title: 'Treasury yields consolidate following benchmark auction',
    subtitle: 'Institutional demand stabilizes 10-year yields near key technical support levels.',
    timeAgo: '1 hr ago',
    category: 'energy',
    iconName: 'DollarSign',
  },
];

export const MARKET_STATISTICS: MarketStatData[] = [
  {
    id: 'stat-sentiment',
    title: 'Market Sentiment',
    value: 'Bullish',
    numericValue: 74,
    suffix: '/100',
    subtitle: 'Institutional Net Positive',
    isUp: true,
  },
  {
    id: 'stat-active-companies',
    title: 'Active Companies',
    value: '50',
    numericValue: 50,
    subtitle: 'Tracked NIFTY Constituent Basket',
    isUp: true,
  },
  {
    id: 'stat-average-volume',
    title: 'Average Volume',
    value: '2.4B',
    numericValue: 2.4,
    suffix: 'B',
    subtitle: 'Daily Aggregate Turnover',
    isUp: true,
  },
  {
    id: 'stat-vix',
    title: 'Volatility Index',
    value: '17.8',
    numericValue: 17.8,
    subtitle: 'India VIX Standard Deviation',
    isUp: false,
  },
];

export const CURRENT_USER: UserProfileData = {
  username: 'Alex Vance',
  role: 'Senior Portfolio Analyst',
  initials: 'AV',
};
