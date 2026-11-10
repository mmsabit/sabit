'use client';

import React, { useState, useEffect } from 'react';

export const ScrollControls: React.FC = () => {
  const [showScrollBottom, setShowScrollBottom] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setShowScrollBottom(false);
      } else {
        setShowScrollBottom(true);
      }

      if (scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSec = document.getElementById('about');
    if (aboutSec) {
      aboutSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll To Bottom Button */}
      {showScrollBottom && (
        <button
          onClick={scrollToAbout}
          type="button"
          aria-label="Scroll to about"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 text-white cursor-pointer animate-action transition-opacity duration-300"
        >
          <i className="fa fa-2x fa-angle-down"></i>
        </button>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-30 w-10 h-10 border border-dark text-dark hover:bg-dark hover:text-white rounded flex items-center justify-center animate-action transition-all duration-300 bg-white/80 shadow-md backdrop-blur-xs"
        >
          <i className="fa fa-angle-double-up text-lg"></i>
        </button>
      )}
    </>
  );
};
