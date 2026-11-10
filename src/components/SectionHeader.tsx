import React from 'react';

interface SectionHeaderProps {
  bgTitle: string;
  frontTitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ bgTitle, frontTitle }) => {
  return (
    <div className="relative flex items-center justify-center mb-12 select-none">
      <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase font-extrabold text-stroke-light tracking-wider opacity-90 leading-none">
        {bgTitle}
      </h2>
      <h3 className="absolute text-2xl sm:text-3xl md:text-4xl uppercase font-extrabold text-primary tracking-wide text-center">
        {frontTitle}
      </h3>
    </div>
  );
};
