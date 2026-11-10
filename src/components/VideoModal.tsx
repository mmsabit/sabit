'use client';

import React, { useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc = 'https://www.youtube.com/embed/DWRcNpR6Kdc',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-black rounded shadow-2xl overflow-visible animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button top-right (matching original template) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-9 right-0 w-8 h-8 bg-black text-white hover:text-primary flex items-center justify-center text-2xl font-light leading-none z-50 cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        {/* 16:9 Aspect Ratio Container */}
        <div className="relative w-full pt-[56.25%] bg-black">
          <iframe
            className="absolute inset-0 w-full h-full border-0"
            src={`${videoSrc}?autoplay=1&modestbranding=1&showinfo=0`}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
