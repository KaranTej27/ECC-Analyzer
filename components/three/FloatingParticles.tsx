'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
  mouse: { x: number; y: number };
  isDark?: boolean;
}

export function FloatingParticles({
  count = 700,
  mouse,
  isDark = true,
}: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const targetColor = useMemo(() => new THREE.Color(isDark ? '#FFFFFF' : '#151515'), [isDark]);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }

    return [pos];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += delta * 0.015;

    const targetX = mouse.x * 0.8;
    const targetY = mouse.y * 0.8;
    
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;

    if (matRef.current) {
      const lerpSpeed = delta * 6;
      matRef.current.color.lerp(targetColor, lerpSpeed);
      const targetOpacity = isDark ? 0.35 : 0.5;
      matRef.current.opacity += (targetOpacity - matRef.current.opacity) * lerpSpeed;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.06}
        color={isDark ? '#FFFFFF' : '#151515'}
        transparent
        opacity={isDark ? 0.35 : 0.5}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        sizeAttenuation
      />
    </points>
  );
}
