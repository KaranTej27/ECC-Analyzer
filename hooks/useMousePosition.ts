'use client';

import { useState, useEffect } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  rawX: number;
  rawY: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth && innerHeight) {
        const x = (event.clientX / innerWidth) * 2 - 1;
        const y = -(event.clientY / innerHeight) * 2 + 1;
        setPosition({
          x,
          y,
          rawX: event.clientX,
          rawY: event.clientY,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}
