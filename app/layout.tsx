import type { Metadata } from 'next';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'ECHO — Earnings Call Harnessing for High-Alpha Outcomes | AI Financial Intelligence',
  description:
    'ECHO transforms corporate earnings call conversations into actionable, real-time market intelligence using domain-adapted LLMs and acoustic voice analysis.',
  keywords: [
    'Financial AI',
    'Earnings Call Outlook',
    'LLM Financial Intelligence',
    'Market Sentiment',
    'Volatility Prediction',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#000000] dark:bg-[#000000] light:bg-[#FFFFFF] text-[#FFFFFF] dark:text-[#FFFFFF] light:text-[#000000] antialiased transition-colors duration-500">
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
