'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { FloatingParticles } from './FloatingParticles';
import { FinancialGrid3D } from './FinancialGrid3D';
import { WaveMesh3D } from './WaveMesh3D';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useTheme } from '@/context/ThemeContext';

export function BackgroundCanvas() {
  const [mounted, setMounted] = useState(false);
  const mouse = useMousePosition();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#000000' : '#FFFFFF';
  const fogColor = isDark ? '#000000' : '#FFFFFF';
  const particleColor = isDark ? '#FFFFFF' : '#151515';

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#000000] dark:bg-[#000000] light:bg-[#FFFFFF] z-0 pointer-events-none transition-colors duration-500" />;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#000000] dark:bg-[#000000] light:bg-[#FFFFFF] transition-colors duration-500">
      <div
        className={`absolute inset-0 z-10 opacity-90 pointer-events-none transition-all duration-500 ${
          isDark
            ? 'bg-radial-gradient from-transparent via-[#090909]/80 to-[#000000]'
            : 'bg-radial-gradient from-transparent via-[#F5F5F5]/80 to-[#FFFFFF]'
        }`}
      />
      
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, 8, 25]} />
        
        <ambientLight intensity={isDark ? 0.4 : 0.7} />
        <directionalLight position={[10, 15, 10]} intensity={isDark ? 0.8 : 1.2} color={isDark ? '#FFFFFF' : '#000000'} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color={isDark ? '#D9D9D9' : '#4B4B4B'} />

        <FloatingParticles count={700} mouse={mouse} color={particleColor} />
        <WaveMesh3D isDark={isDark} />
        <FinancialGrid3D isDark={isDark} />
      </Canvas>
    </div>
  );
}
