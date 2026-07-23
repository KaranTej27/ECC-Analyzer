'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FloatingParticles } from './FloatingParticles';
import { FinancialGrid3D } from './FinancialGrid3D';
import { WaveMesh3D } from './WaveMesh3D';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useTheme } from '@/context/ThemeContext';

function SceneController({ isDark }: { isDark: boolean }) {
  const { scene } = useThree();
  const fog = scene.fog;
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  const targetBg = useMemo(() => new THREE.Color(isDark ? '#000000' : '#FFFFFF'), [isDark]);
  const targetFog = useMemo(() => new THREE.Color(isDark ? '#000000' : '#FFFFFF'), [isDark]);
  const targetDirColor = useMemo(() => new THREE.Color(isDark ? '#FFFFFF' : '#151515'), [isDark]);

  useEffect(() => {
    if (!scene.background) {
      scene.background = targetBg.clone();
    }
  }, [scene, targetBg]);

  useFrame((_, delta) => {
    const lerpSpeed = delta * 6;

    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(targetBg, lerpSpeed);
    }
    if (fog && 'color' in fog) {
      (fog.color as THREE.Color).lerp(targetFog, lerpSpeed);
    }

    if (ambientLightRef.current) {
      const targetIntensity = isDark ? 0.4 : 0.8;
      ambientLightRef.current.intensity += (targetIntensity - ambientLightRef.current.intensity) * lerpSpeed;
    }

    if (dirLightRef.current) {
      dirLightRef.current.color.lerp(targetDirColor, lerpSpeed);
      const targetDirIntensity = isDark ? 0.8 : 1.2;
      dirLightRef.current.intensity += (targetDirIntensity - dirLightRef.current.intensity) * lerpSpeed;
    }
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={isDark ? 0.4 : 0.8} />
      <directionalLight
        ref={dirLightRef}
        position={[10, 15, 10]}
        intensity={isDark ? 0.8 : 1.2}
        color={isDark ? '#FFFFFF' : '#151515'}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color={isDark ? '#D9D9D9' : '#4B4B4B'} />
    </>
  );
}

export function BackgroundCanvas() {
  const [mounted, setMounted] = useState(false);
  const mouse = useMousePosition();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#000000]' : 'bg-[#FFFFFF]'
      } ${mounted ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`absolute inset-0 z-10 opacity-90 pointer-events-none transition-all duration-500 ${
          isDark
            ? 'bg-radial-gradient from-transparent via-[#090909]/80 to-[#000000]'
            : 'bg-radial-gradient from-transparent via-[#F5F5F5]/80 to-[#FFFFFF]'
        }`}
      />
      
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <fog attach="fog" args={[isDark ? '#000000' : '#FFFFFF', 8, 25]} />
          
          <SceneController isDark={isDark} />

          <FloatingParticles count={700} mouse={mouse} isDark={isDark} />
          <WaveMesh3D isDark={isDark} />
          <FinancialGrid3D isDark={isDark} />
        </Canvas>
      )}
    </div>
  );
}
