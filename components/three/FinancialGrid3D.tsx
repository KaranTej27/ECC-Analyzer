'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FinancialGrid3DProps {
  isDark?: boolean;
}

export function FinancialGrid3D({ isDark = true }: FinancialGrid3DProps) {
  const gridGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!gridGroupRef.current) return;
    gridGroupRef.current.position.z = (state.clock.getElapsedTime() * 0.4) % 2;
  });

  return (
    <group ref={gridGroupRef} position={[0, -4, -5]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <gridHelper
        args={[40, 40, isDark ? '#4B4B4B' : '#999999', isDark ? '#151515' : '#E5E5E5']}
        position={[0, 0, 0]}
      />
    </group>
  );
}
