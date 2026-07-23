'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WaveMesh3DProps {
  isDark?: boolean;
}

export function WaveMesh3D({ isDark = true }: WaveMesh3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const width = 30;
  const height = 20;
  const segmentsW = 40;
  const segmentsH = 30;

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(width, height, segmentsW, segmentsH);
  }, [width, height, segmentsW, segmentsH]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 0.6;
    const pos = geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const u = (i % (segmentsW + 1)) / segmentsW;
      const v = Math.floor(i / (segmentsW + 1)) / segmentsH;
      
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      const z = Math.sin(x * 0.3 + time) * 0.4 + Math.cos(y * 0.4 + time * 0.8) * 0.3;
      pos.setZ(i, z);
    }
    
    pos.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[0, 0, -12]}
      rotation={[-Math.PI / 3, 0, 0]}
    >
      <meshStandardMaterial
        color={isDark ? '#D9D9D9' : '#151515'}
        wireframe
        transparent
        opacity={isDark ? 0.12 : 0.18}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}
