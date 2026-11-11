'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
import { FaGithub, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skill', href: '#skill' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

const cvLink =
  'https://docs.google.com/document/d/1C3z7m0Y9EBgGvcIl1W5vcMdXs-nfDy-Cju7CGmotI08/export?format=pdf';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      

      setScrolled(scrollY > 24);
      

      const scrollPos = scrollY + 120;
      const sections = navItems.map((item) => item.href.substring(1));

      for (let index = sections.length - 1; index >= 0; index -= 1) {
        const section = document.getElementById(sections[index]);
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sections[index]);
          break;
        }
      }
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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);

    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5">
      <div
        className={`relative mx-auto transition-all duration-500 ease-out ${
          scrolled
            ? 'mt-3 max-w-6xl rounded-2xl border border-white/70 bg-white/80 shadow-[0_18px_50px_-24px_rgba(10,18,41,0.45)] backdrop-blur-xl'
            : 'mt-0 max-w-7xl rounded-none border border-transparent bg-transparent'
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:h-18">
          <Link
            href="#home"
            onClick={(event) => handleNavClick(event, '#home')}
            className={`group flex shrink-0 items-center gap-2.5 text-2xl font-extrabold tracking-tight transition-colors duration-300 sm:text-[1.7rem] ${
              scrolled ? 'text-dark' : 'text-white'
            }`}
          >
            <span>
              <span className="text-primary">M M </span>
              Sabit
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                    scrolled
                      ? isActive
                        ? 'text-primary'
                        : 'text-dark/75 hover:text-primary'
                      : isActive
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-300 ${
                      isActive
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    } ${scrolled ? 'bg-primary' : 'bg-white'}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <span
              className={`hidden h-6 w-px transition-colors duration-300 xl:block ${
                scrolled ? 'bg-gray-200' : 'bg-white/20'
              }`}
            />
            <Link
              href={cvLink}
              className={`btn-shine inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                scrolled
                  ? 'bg-primary text-white shadow-[0_12px_28px_-12px_rgba(37,99,235,0.9)] hover:bg-primary-hover'
                  : 'border border-white/30 bg-white/10 text-white backdrop-blur-md hover:border-white hover:bg-white hover:text-primary'
              }`}
            >
              <FiDownload className="text-base" />
              Download CV
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={cvLink}
              aria-label="Download CV"
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                scrolled
                  ? 'border-primary/20 bg-primary/5 text-primary'
                  : 'border-white/25 bg-white/10 text-white'
              }`}
            >
              <FiDownload />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              type="button"
              aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                scrolled
                  ? 'border-gray-200 bg-white text-dark hover:border-primary/40 hover:text-primary'
                  : 'border-white/25 bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isMobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        

        {/* Mobile dropdown */}
        <div
          id="mobile-menu"
          inert={!isMobileMenuOpen}
          aria-hidden={!isMobileMenuOpen}
          className={`overflow-hidden transition-all duration-500 ease-out lg:hidden ${
            isMobileMenuOpen ? 'max-h-104 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mx-2 mb-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
            <nav className="flex flex-col" aria-label="Mobile">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary/5 text-primary'
                        : 'text-dark hover:bg-gray-50 hover:text-primary'
                    }`}
                    style={{ transitionDelay: isMobileMenuOpen ? `${index * 35}ms` : '0ms' }}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isActive ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      />
                      {item.name}
                    </span>
                    <span className="text-xs font-medium text-gray-300">0{index + 1}</span>
                  </Link>
                );
              })}
            </nav>
            <Link
              href={cvLink}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <FiDownload />
              Download CV
            </Link>
            <div className="mt-2 flex items-center justify-center gap-4 border-t border-gray-100 py-3 text-gray-500">
              <Link
                href="https://github.com/mmsabit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-primary"
              >
                <FaGithub className="text-lg" />
              </Link>
              <Link
                href="https://www.facebook.com/mmsabit2004"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-colors hover:text-primary"
              >
                <FaFacebookF className="text-lg" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/mmsabit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-primary"
              >
                <FaLinkedinIn className="text-lg" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 -z-10 bg-night/40 backdrop-blur-sm lg:hidden"
        />
      )}
    </header>
  );
};
