'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';

interface LightboxModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ isOpen, imageSrc, onClose }) => {
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

  if (!isOpen || !imageSrc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative flex h-[85vh] w-[min(90vw,64rem)] flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 w-8 h-8 text-white hover:text-[#0BCEAF] flex items-center justify-center text-3xl font-light cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        <Image
          src={imageSrc}
          alt="Portfolio detail"
          fill
          sizes="90vw"
          className="object-contain"
        />
      </div>
    </div>
  );
};
