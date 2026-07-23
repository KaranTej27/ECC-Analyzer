'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FinancialGrid3DProps {
  isDark?: boolean;
}

export function FinancialGrid3D({ isDark = true }: FinancialGrid3DProps) {
  const gridGroupRef = useRef<THREE.Group>(null);
  const gridHelperRef = useRef<THREE.GridHelper>(null);

  const targetCenterColor = useMemo(() => new THREE.Color(isDark ? '#4B4B4B' : '#999999'), [isDark]);
  const targetGridColor = useMemo(() => new THREE.Color(isDark ? '#151515' : '#E5E5E5'), [isDark]);

  useFrame((state, delta) => {
    if (gridGroupRef.current) {
      gridGroupRef.current.position.z = (state.clock.getElapsedTime() * 0.4) % 2;
    }

    if (gridHelperRef.current) {
      const material = gridHelperRef.current.material as THREE.LineBasicMaterial;
      if (material) {
        material.color.lerp(targetGridColor, delta * 6);
      }
    }
  });

  return (
    <group ref={gridGroupRef} position={[0, -4, -5]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <gridHelper
        ref={gridHelperRef}
        args={[40, 40, isDark ? '#4B4B4B' : '#999999', isDark ? '#151515' : '#E5E5E5']}
        position={[0, 0, 0]}
      />
    </group>
  );
}
