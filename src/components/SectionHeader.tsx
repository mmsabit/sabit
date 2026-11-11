import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  bgTitle: string;
  frontTitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ bgTitle, frontTitle }) => {
  const words = frontTitle.split(' ');
  const lastWord = words.pop() ?? frontTitle;
  const leadingWords = words.join(' ');

  return (
    <Reveal className="relative mb-12 flex flex-col items-center md:mb-16">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-linear-to-r from-transparent to-primary/60 sm:w-12" />
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-primary sm:text-[11px]">
          {bgTitle}
        </span>
        <span className="h-px w-8 bg-linear-to-l from-transparent to-primary/60 sm:w-12" />
      </div>

      <h2 className="mt-5 text-center text-[2rem] font-extrabold leading-tight tracking-tight text-dark sm:text-4xl md:text-5xl">
        {leadingWords && <span>{leadingWords} </span>}
        <span className="text-gradient-primary">{lastWord}</span>
      </h2>

      <span
        aria-hidden="true"
        className="mt-6 h-1 w-16 rounded-full bg-linear-to-r from-primary via-primary to-primary-hover"
      />
    </Reveal>
  );
};
