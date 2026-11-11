'use client';

import React, { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export const ScrollControls: React.FC = () => {
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      setShowScrollDown(scrollY < 80);
      setShowBackToTop(scrollY > 320);
      setProgress(docHeight > 0 ? Math.min(1, scrollY / docHeight) : 0);
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 21;
  const circumference = 2 * Math.PI * radius;

  return (
    <>
      {/* Scroll cue */}
      <button
        onClick={scrollToAbout}
        type="button"
        aria-label="Scroll to about"
        aria-hidden={!showScrollDown}
        tabIndex={showScrollDown ? 0 : -1}
        className={`group fixed bottom-7 left-1/2 z-40 -translate-x-1/2 flex-col items-center gap-2 transition-all duration-500 ${
          showScrollDown
            ? 'flex translate-y-0 opacity-100'
            : 'pointer-events-none flex translate-y-4 opacity-0'
        }`}
      >
        <span className="flex h-10 w-[26px] items-start justify-center rounded-full border border-white/40 bg-white/5 p-1.5 backdrop-blur-sm transition-colors duration-300 group-hover:border-white/80">
          <span className="animate-scroll-wheel h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <span className="h-6 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </button>

      {/* Back to top with progress ring */}
      <button
        onClick={scrollToTop}
        type="button"
        aria-label="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        className={`group fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-[0_16px_40px_-18px_rgba(10,18,41,0.6)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 sm:bottom-8 sm:right-8 ${
          showBackToTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>
        <FiArrowUp className="relative text-lg text-dark transition-colors duration-300 group-hover:text-primary" />
      </button>
    </>
  );
};
