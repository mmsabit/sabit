'use client';

import React, { useRef } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  style?: React.CSSProperties;
}

/**
 * A wrapper that follows the pointer with a soft radial glow and,
 * optionally, a subtle 3D tilt. Purely decorative — respects touch input.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  tilt = false,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;

    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    element.style.setProperty('--mx', `${x}px`);
    element.style.setProperty('--my', `${y}px`);

    if (tilt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rotateY = ((x / rect.width) - 0.5) * 7;
      const rotateX = ((y / rect.height) - 0.5) * -7;
      element.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      element.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
    }
  };

  const handlePointerLeave = () => {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty('--rx', '0deg');
    element.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`spotlight ${tilt ? 'tilt' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
