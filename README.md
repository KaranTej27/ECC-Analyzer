# ECHO — Earnings Call Outlook System (ECC-Analyzer)

ECHO is an ultra-premium, AI-driven financial intelligence platform landing page designed to transform corporate earnings call conversations into actionable, real-time market intelligence.

## 🚀 Features

- **Cinematic Monochrome Aesthetics**: Ultra-premium monochrome design system supporting both **Dark** and **Light** themes.
- **Continuous Scroll Storytelling**: Smooth Lenis scrolling synchronized with GSAP ScrollTrigger ticker.
- **Interactive 3D Visuals**: Built with Three.js and React Three Fiber featuring floating GPU particles, dynamic acoustic wave mesh, and perspective financial grids.
- **Predictive Analytics Chart**: Interactive Recharts data visualization with actual stock price line, AI prediction bound, and confidence interval area.
- **Horizontal Process Flow**: 5-stage architectural timeline (`Transcript Ingestion` → `LLM Processing` → `Feature Extraction` → `Prediction Engine` → `Market Outlook`).
- **Dynamic Word Cloud**: Kinetic floating taxonomy with multi-speed scroll parallax.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Smooth Scroll**: Lenis
- **Animations**: GSAP + ScrollTrigger + Framer Motion
- **3D Graphics**: Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Data Visualization**: Recharts
- **Icons**: Lucide React

## 📦 Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🏗️ Production Build

To build the application for production:

```bash
npm run build
npm run start
```
