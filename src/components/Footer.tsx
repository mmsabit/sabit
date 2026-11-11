import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FloatingTechIcons } from './FloatingTechIcons';

export const Footer: React.FC = () => {
  const socials = [
    { icon: FaGithub, href: 'https://github.com/mmsabit', label: 'GitHub' },
    { icon: FaFacebookF, href: 'https://www.facebook.com/mmsabit2004', label: 'Facebook' },
    { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/mmsabit', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative overflow-hidden bg-night px-4 pb-10 pt-16 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-[0.08]" />
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-primary-hover/10 blur-[100px]" />

      <FloatingTechIcons preset="footer" variant="dark" />

      

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <Link href="#home" className="group flex items-center gap-2.5 text-2xl font-extrabold tracking-tight">
            <span>
              <span className="text-primary">M M </span>
              Sabit
            </span>
          </Link>

          <div className="mt-7 flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_14px_30px_-12px_rgba(37,99,235,0.9)]"
                >
                  <Icon className="text-[17px] transition-transform duration-300 group-hover:scale-110" />
                </Link>
              );
            })}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-white/60">
            <Link href="#" className="transition-colors duration-300 hover:text-white">
              Privacy
            </Link>
            <span className="h-3 w-px bg-white/15" />
            <Link href="#" className="transition-colors duration-300 hover:text-white">
              Terms
            </Link>
          </div>

          <p className="mt-6 text-xs font-light tracking-wide text-white/45 sm:text-sm">
            &copy; {new Date().getFullYear()}. All Rights Reserved by M M Sabit
          </p>
        </div>
      </div>
    </footer>
  );
};
