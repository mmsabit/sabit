'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const subscribeToReducedMotion = (callback: () => void) => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
};

const getReducedMotionSnapshot = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getReducedMotionServerSnapshot = () => false;

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${direction} ${className}`}
      data-visible={visible || prefersReducedMotion}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
