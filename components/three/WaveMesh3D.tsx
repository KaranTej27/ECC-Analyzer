'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WaveMesh3DProps {
  isDark?: boolean;
}

export function WaveMesh3D({ isDark = true }: WaveMesh3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  const targetColor = useMemo(() => new THREE.Color(isDark ? '#D9D9D9' : '#151515'), [isDark]);
  
  const width = 30;
  const height = 20;
  const segmentsW = 40;
  const segmentsH = 30;

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(width, height, segmentsW, segmentsH);
  }, [width, height, segmentsW, segmentsH]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 0.6;
    const pos = geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      const z = Math.sin(x * 0.3 + time) * 0.4 + Math.cos(y * 0.4 + time * 0.8) * 0.3;
      pos.setZ(i, z);
    }
    
    pos.needsUpdate = true;

    if (matRef.current) {
      const lerpSpeed = delta * 6;
      matRef.current.color.lerp(targetColor, lerpSpeed);
      const targetOpacity = isDark ? 0.12 : 0.18;
      matRef.current.opacity += (targetOpacity - matRef.current.opacity) * lerpSpeed;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[0, 0, -12]}
      rotation={[-Math.PI / 3, 0, 0]}
    >
      <meshStandardMaterial
        ref={matRef}
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
