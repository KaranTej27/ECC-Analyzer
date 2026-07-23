export interface ChartDataPoint {
  time: string;
  quarter: string;
  actualPrice: number;
  predictedPrice: number;
  confidenceUpper: number;
  confidenceLower: number;
  volatilityIndex: number;
  sentimentScore: number;
}

export interface MetricCardData {
  label: string;
  value: string;
  trend: string;
  detail: string;
}

export interface TimelineStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  metrics?: { label: string; value: string }[];
}

export interface KeywordItem {
  id: string;
  text: string;
  weight: 'font-extralight' | 'font-light' | 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold';
  size: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl';
  opacity: string;
  speed: number;
}

export const HERO_STATS = [
  {
    id: 'llm',
    title: 'LLM Powered',
    value: '99.4%',
    label: 'Semantic Accuracy',
    description: 'Trained on 45,000+ SEC transcripts and live Q&A sessions.',
  },
  {
    id: 'audio',
    title: 'Audio + Transcript Analysis',
    value: '< 450ms',
    label: 'Real-time Ingestion',
    description: 'Dual-stream acoustic vocal tone and verbatim text parsing.',
  },
  {
    id: 'volatility',
    title: 'Volatility Prediction',
    value: '+87.2%',
    label: 'Signal Confidence',
    description: 'Early alpha extraction prior to public market repricing.',
  },
];

export const FINANCIAL_CHART_DATA: ChartDataPoint[] = [
  { time: '09:30', quarter: 'Q1-A', actualPrice: 142.50, predictedPrice: 142.50, confidenceUpper: 144.00, confidenceLower: 141.00, volatilityIndex: 12.4, sentimentScore: 0.62 },
  { time: '10:00', quarter: 'Q1-B', actualPrice: 143.80, predictedPrice: 144.10, confidenceUpper: 146.20, confidenceLower: 142.00, volatilityIndex: 14.1, sentimentScore: 0.68 },
  { time: '10:30', quarter: 'Q1-C', actualPrice: 145.20, predictedPrice: 146.00, confidenceUpper: 148.50, confidenceLower: 143.50, volatilityIndex: 18.5, sentimentScore: 0.75 },
  { time: '11:00', quarter: 'Q2-A', actualPrice: 144.10, predictedPrice: 147.80, confidenceUpper: 150.20, confidenceLower: 145.00, volatilityIndex: 22.0, sentimentScore: 0.81 },
  { time: '11:30', quarter: 'Q2-B', actualPrice: 147.60, predictedPrice: 149.50, confidenceUpper: 152.00, confidenceLower: 147.00, volatilityIndex: 24.3, sentimentScore: 0.84 },
  { time: '12:00', quarter: 'Q2-C', actualPrice: 151.00, predictedPrice: 152.40, confidenceUpper: 155.10, confidenceLower: 149.80, volatilityIndex: 21.7, sentimentScore: 0.88 },
  { time: '12:30', quarter: 'Q3-A', actualPrice: 153.40, predictedPrice: 154.20, confidenceUpper: 157.00, confidenceLower: 151.40, volatilityIndex: 19.2, sentimentScore: 0.86 },
  { time: '13:00', quarter: 'Q3-B', actualPrice: 152.80, predictedPrice: 155.80, confidenceUpper: 158.90, confidenceLower: 152.70, volatilityIndex: 17.5, sentimentScore: 0.89 },
  { time: '13:30', quarter: 'Q3-C', actualPrice: 156.20, predictedPrice: 157.50, confidenceUpper: 160.80, confidenceLower: 154.20, volatilityIndex: 16.0, sentimentScore: 0.91 },
  { time: '14:00', quarter: 'Q4-A', actualPrice: 158.90, predictedPrice: 159.10, confidenceUpper: 162.50, confidenceLower: 155.70, volatilityIndex: 15.2, sentimentScore: 0.93 },
  { time: '14:30', quarter: 'Q4-B', actualPrice: 161.40, predictedPrice: 161.00, confidenceUpper: 164.20, confidenceLower: 157.80, volatilityIndex: 14.8, sentimentScore: 0.90 },
  { time: '15:00', quarter: 'Q4-C', actualPrice: 160.80, predictedPrice: 162.80, confidenceUpper: 166.00, confidenceLower: 159.60, volatilityIndex: 15.5, sentimentScore: 0.92 },
];

export const FLOATING_ANALYTICS_METRICS: MetricCardData[] = [
  {
    label: 'PREDICTION CONFIDENCE',
    value: '87%',
    trend: '+4.2% vs baseline',
    detail: 'High vector convergence across 14 financial indicators',
  },
  {
    label: 'VOLATILITY OUTLOOK',
    value: 'Moderate',
    trend: 'Δ 0.14 Expected Delta',
    detail: 'Implied earnings response within predicted ±2.4% corridor',
  },
  {
    label: 'SENTIMENT INDEX',
    value: 'Bullish',
    trend: 'Score 0.92 / 1.0',
    detail: 'Executive tone shifted positive during Q&A guidance segment',
  },
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 'transcript',
    stepNumber: '01',
    title: 'Transcript Ingestion',
    subtitle: 'Dual-channel audio & verbatim stream processing',
    description: 'Ingests live acoustic audio streams alongside raw transcripts, aligning speaker diarization and vocal cadence.',
    metrics: [
      { label: 'Latency', value: '< 200ms' },
      { label: 'Sampling Rate', value: '48kHz HD' },
    ],
  },
  {
    id: 'llm-processing',
    stepNumber: '02',
    title: 'LLM Processing',
    subtitle: 'Contextual semantic embedding & acoustic parsing',
    description: 'Domain-adapted financial LLMs analyze executive hesitation, phrase syntax, and implicit guidance shifts.',
    metrics: [
      { label: 'Token Window', value: '128K' },
      { label: 'Precision', value: '99.2%' },
    ],
  },
  {
    id: 'feature-extraction',
    stepNumber: '03',
    title: 'Feature Extraction',
    subtitle: 'Quantifying sentiment, risk, & revenue signals',
    description: 'Extracts 64 high-dimensional quantitative metrics including capex deviation, supply chain stress, and margin guidance.',
    metrics: [
      { label: 'Features', value: '64 Dimensions' },
      { label: 'Noise Filter', value: 'Kalman Dynamic' },
    ],
  },
  {
    id: 'prediction-engine',
    stepNumber: '04',
    title: 'Prediction Engine',
    subtitle: 'Stochastic variance modeling & alpha generation',
    description: 'Simulates market reaction probability distributions across post-call time horizons (10m, 1h, 24h, 7d).',
    metrics: [
      { label: 'Monte Carlo', value: '10,000 Iter/s' },
      { label: 'Confidence', value: '87%' },
    ],
  },
  {
    id: 'market-outlook',
    stepNumber: '05',
    title: 'Market Outlook',
    subtitle: 'Institutional intelligence dispatch',
    description: 'Synthesizes actionable outlook reports, risk bounds, and algorithmic trading triggers directly into quantitative pipelines.',
    metrics: [
      { label: 'Output', value: 'FastAPI / WebSocket' },
      { label: 'Format', value: 'JSON Schema' },
    ],
  },
];

export const KEYWORDS_LIST: KeywordItem[] = [
  { id: '1', text: 'LLM', weight: 'font-bold', size: 'text-5xl', opacity: 'opacity-90', speed: 1.2 },
  { id: '2', text: 'NLP', weight: 'font-semibold', size: 'text-3xl', opacity: 'opacity-80', speed: 0.8 },
  { id: '3', text: 'Forecasting', weight: 'font-medium', size: 'text-4xl', opacity: 'opacity-70', speed: 1.5 },
  { id: '4', text: 'Financial AI', weight: 'font-light', size: 'text-5xl', opacity: 'opacity-95', speed: 1.0 },
  { id: '5', text: 'Market Intelligence', weight: 'font-normal', size: 'text-3xl', opacity: 'opacity-60', speed: 1.8 },
  { id: '6', text: 'Sentiment Analysis', weight: 'font-semibold', size: 'text-2xl', opacity: 'opacity-75', speed: 0.9 },
  { id: '7', text: 'Volatility', weight: 'font-bold', size: 'text-4xl', opacity: 'opacity-85', speed: 1.4 },
  { id: '8', text: 'Audio Intelligence', weight: 'font-light', size: 'text-3xl', opacity: 'opacity-65', speed: 1.1 },
  { id: '9', text: 'RAG', weight: 'font-bold', size: 'text-2xl', opacity: 'opacity-90', speed: 0.7 },
  { id: '10', text: 'Embeddings', weight: 'font-medium', size: 'text-3xl', opacity: 'opacity-80', speed: 1.6 },
  { id: '11', text: 'Prediction', weight: 'font-semibold', size: 'text-4xl', opacity: 'opacity-85', speed: 1.3 },
  { id: '12', text: 'Neural Networks', weight: 'font-light', size: 'text-2xl', opacity: 'opacity-70', speed: 1.0 },
  { id: '13', text: 'Transformer', weight: 'font-bold', size: 'text-3xl', opacity: 'opacity-90', speed: 1.7 },
  { id: '14', text: 'Alpha Generation', weight: 'font-extralight', size: 'text-4xl', opacity: 'opacity-60', speed: 0.9 },
  { id: '15', text: 'Stochastic Signals', weight: 'font-medium', size: 'text-2xl', opacity: 'opacity-75', speed: 1.4 },
];

export const CONTACT_PERSONS = [
  {
    role: 'HEAD OF QUANTITATIVE RESEARCH',
    title: 'Institutional Partnerships',
    email: '',
    phone: '',
    location: 'New York • London',
  },
  {
    role: 'CHIEF ARCHITECT',
    title: 'API & Infrastructure Solutions',
    email: '',
    phone: '',
    location: 'San Francisco • Zurich',
  },
];
