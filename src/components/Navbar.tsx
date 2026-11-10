'use client';

import React, { useState, useEffect } from 'react';

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

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 50;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-5 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-3xl lg:text-4xl font-extrabold text-dark tracking-tight"
          >
            <span className="text-primary">M M </span>Sabit
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 text-sm xl:text-base font-medium transition-colors ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-dark hover:text-primary'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Hire Me CTA (Desktop) */}
          <div className="hidden lg:block">
            <a
              href="https://docs.google.com/document/d/1C3z7m0Y9EBgGvcIl1W5vcMdXs-nfDy-Cju7CGmotI08/export?format=pdf"

              className="inline-block border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2 rounded-sm text-sm font-medium transition-all duration-300"
            >
              Download CV
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-primary bg-teal-50 font-bold'
                    : 'text-dark hover:text-primary hover:bg-gray-50'
                }`}
              >
                {item.name}
              </a>
            );
          })}
          <div className="pt-2">
            <a
              href="https://docs.google.com/document/d/1C3z7m0Y9EBgGvcIl1W5vcMdXs-nfDy-Cju7CGmotI08/export?format=pdf"
              className="block text-center border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-sm text-sm font-medium transition-all"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
