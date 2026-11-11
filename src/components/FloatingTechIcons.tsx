import React from 'react';
import {
  SiFigma,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';

type Variant = 'light' | 'dark';
type Preset = 'hero' | 'about' | 'skills' | 'portfolio' | 'contact' | 'footer';
type Animation = 'animate-tech-float' | 'animate-tech-spring' | 'animate-tech-orbit';

interface TechItem {
  Icon: React.ComponentType<{ className?: string }>;
  position: string;
  animation: Animation;
  delay: string;
  duration: string;
  rotate: string;
}

const presets: Record<Preset, TechItem[]> = {
  hero: [
    {
      Icon: SiReact,
      position: 'left-[4%] top-[24%] hidden h-12 w-12 text-xl sm:flex',
      animation: 'animate-tech-spring',
      delay: '0s',
      duration: '8s',
      rotate: '-8deg',
    },
    {
      Icon: SiNextdotjs,
      position: 'right-[5%] top-[18%] hidden h-14 w-14 text-2xl sm:flex',
      animation: 'animate-tech-float',
      delay: '0.6s',
      duration: '11s',
      rotate: '7deg',
    },
    {
      Icon: SiTypescript,
      position: 'bottom-[16%] left-[9%] hidden h-11 w-11 text-lg md:flex',
      animation: 'animate-tech-orbit',
      delay: '0s',
      duration: '30s',
      rotate: '0deg',
    },
    {
      Icon: SiTailwindcss,
      position: 'bottom-[20%] right-[11%] hidden h-12 w-12 text-xl lg:flex',
      animation: 'animate-tech-spring',
      delay: '1.2s',
      duration: '9s',
      rotate: '10deg',
    },
  ],
  about: [
    {
      Icon: SiTypescript,
      position: 'left-[2%] top-[18%] flex h-11 w-11 text-lg sm:h-13 sm:w-13 sm:text-xl',
      animation: 'animate-tech-spring',
      delay: '0.2s',
      duration: '8.5s',
      rotate: '-7deg',
    },
    {
      Icon: SiReact,
      position: 'right-[1%] top-[26%] hidden h-13 w-13 text-xl sm:flex',
      animation: 'animate-tech-float',
      delay: '0.9s',
      duration: '10s',
      rotate: '8deg',
    },
    {
      Icon: SiFigma,
      position: 'bottom-[12%] right-[4%] hidden h-12 w-12 text-xl md:flex',
      animation: 'animate-tech-spring',
      delay: '0.4s',
      duration: '9.5s',
      rotate: '-10deg',
    },
    {
      Icon: SiNodedotjs,
      position: 'bottom-[10%] left-[5%] hidden h-12 w-12 text-xl lg:flex',
      animation: 'animate-tech-float',
      delay: '1.4s',
      duration: '12s',
      rotate: '6deg',
    },
    {
      Icon: SiMysql,
      position: 'left-[1%] top-[58%] hidden h-10 w-10 text-base xl:flex',
      animation: 'animate-tech-orbit',
      delay: '0s',
      duration: '34s',
      rotate: '0deg',
    },
  ],
  skills: [
    {
      Icon: SiJavascript,
      position: 'left-[1%] top-[12%] hidden h-11 w-11 text-lg sm:flex',
      animation: 'animate-tech-float',
      delay: '0s',
      duration: '10s',
      rotate: '-6deg',
    },
    {
      Icon: SiReact,
      position: 'right-[2%] top-[14%] hidden h-13 w-13 text-xl sm:flex',
      animation: 'animate-tech-spring',
      delay: '0.5s',
      duration: '8s',
      rotate: '9deg',
    },
    {
      Icon: SiTailwindcss,
      position: 'left-[0.5%] top-[44%] hidden h-11 w-11 text-lg lg:flex',
      animation: 'animate-tech-orbit',
      delay: '0s',
      duration: '32s',
      rotate: '0deg',
    },
    {
      Icon: SiNodedotjs,
      position: 'right-[0.5%] top-[40%] hidden h-12 w-12 text-xl lg:flex',
      animation: 'animate-tech-float',
      delay: '1s',
      duration: '11s',
      rotate: '-8deg',
    },
    {
      Icon: SiMongodb,
      position: 'bottom-[9%] left-[3%] flex h-11 w-11 text-lg sm:h-12 sm:w-12 sm:text-xl',
      animation: 'animate-tech-spring',
      delay: '0.8s',
      duration: '9.5s',
      rotate: '7deg',
    },
    {
      Icon: SiMysql,
      position: 'bottom-[11%] right-[3%] hidden h-11 w-11 text-lg md:flex',
      animation: 'animate-tech-float',
      delay: '0.3s',
      duration: '12s',
      rotate: '-5deg',
    },
    {
      Icon: SiTypescript,
      position: 'left-[8%] top-[24%] hidden h-10 w-10 text-base xl:flex',
      animation: 'animate-tech-orbit',
      delay: '0s',
      duration: '38s',
      rotate: '0deg',
    },
    {
      Icon: SiNextdotjs,
      position: 'bottom-[32%] right-[8%] hidden h-10 w-10 text-base xl:flex',
      animation: 'animate-tech-spring',
      delay: '1.1s',
      duration: '10s',
      rotate: '-9deg',
    },
  ],
  portfolio: [
    {
      Icon: SiNextdotjs,
      position: 'left-[2%] top-[22%] hidden h-12 w-12 text-xl sm:flex',
      animation: 'animate-tech-float',
      delay: '0.3s',
      duration: '11s',
      rotate: '-7deg',
    },
    {
      Icon: SiReact,
      position: 'right-[3%] top-[16%] hidden h-13 w-13 text-xl md:flex',
      animation: 'animate-tech-spring',
      delay: '0.7s',
      duration: '8.5s',
      rotate: '8deg',
    },
    {
      Icon: SiVercel,
      position: 'bottom-[12%] right-[1%] hidden h-11 w-11 text-lg lg:flex',
      animation: 'animate-tech-orbit',
      delay: '0s',
      duration: '30s',
      rotate: '0deg',
    },
    {
      Icon: SiGithub,
      position: 'bottom-[18%] left-[3%] hidden h-12 w-12 text-xl md:flex',
      animation: 'animate-tech-spring',
      delay: '0.2s',
      duration: '9s',
      rotate: '-10deg',
    },
  ],
  contact: [
    {
      Icon: SiJavascript,
      position: 'left-[3%] top-[18%] hidden h-11 w-11 text-lg sm:flex',
      animation: 'animate-tech-spring',
      delay: '0.4s',
      duration: '9s',
      rotate: '-8deg',
    },
    {
      Icon: SiMongodb,
      position: 'right-[2%] top-[26%] hidden h-12 w-12 text-xl md:flex',
      animation: 'animate-tech-float',
      delay: '1s',
      duration: '11s',
      rotate: '7deg',
    },
    {
      Icon: SiTailwindcss,
      position: 'bottom-[12%] right-[6%] hidden h-11 w-11 text-lg lg:flex',
      animation: 'animate-tech-orbit',
      delay: '0s',
      duration: '28s',
      rotate: '0deg',
    },
    {
      Icon: SiReact,
      position: 'bottom-[10%] left-[4%] hidden h-12 w-12 text-xl lg:flex',
      animation: 'animate-tech-spring',
      delay: '0.9s',
      duration: '10s',
      rotate: '-6deg',
    },
  ],
  footer: [
    {
      Icon: SiReact,
      position: 'left-[6%] top-[24%] hidden h-11 w-11 text-lg sm:flex',
      animation: 'animate-tech-float',
      delay: '0.2s',
      duration: '10s',
      rotate: '-7deg',
    },
    {
      Icon: SiNextdotjs,
      position: 'right-[6%] top-[30%] hidden h-12 w-12 text-xl sm:flex',
      animation: 'animate-tech-spring',
      delay: '0.8s',
      duration: '9s',
      rotate: '8deg',
    },
    {
      Icon: SiTypescript,
      position: 'bottom-[18%] left-[16%] hidden h-10 w-10 text-base md:flex',
      animation: 'animate-tech-orbit',
      delay: '0s',
      duration: '32s',
      rotate: '0deg',
    },
    {
      Icon: SiNodedotjs,
      position: 'bottom-[24%] right-[14%] hidden h-10 w-10 text-base md:flex',
      animation: 'animate-tech-float',
      delay: '1.3s',
      duration: '12s',
      rotate: '6deg',
    },
  ],
};

const tileStyles: Record<Variant, string> = {
  light:
    'border-primary/10 bg-white/55 text-primary/45 shadow-[0_18px_40px_-30px_rgba(37,99,235,0.65)] backdrop-blur-[2px]',
  dark:
    'border-white/10 bg-white/[0.055] text-white/25 shadow-[0_18px_40px_-26px_rgba(0,0,0,0.8)] backdrop-blur-[2px]',
};

interface FloatingTechIconsProps {
  preset: Preset;
  variant?: Variant;
  className?: string;
}

export const FloatingTechIcons: React.FC<FloatingTechIconsProps> = ({
  preset,
  variant = 'light',
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {presets[preset].map(({ Icon, position, animation, delay, duration, rotate }, index) => (
        <span
          key={`${preset}-${index}`}
          className={`absolute items-center justify-center rounded-2xl border ${tileStyles[variant]} ${animation} ${position}`}
          style={
            {
              animationDelay: delay,
              animationDuration: duration,
              '--tech-rotate': rotate,
            } as React.CSSProperties
          }
        >
          <Icon />
        </span>
      ))}
    </div>
  );
};
