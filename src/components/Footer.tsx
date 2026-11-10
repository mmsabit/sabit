import React from 'react';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const socials = [
    { icon: <FaGithub size={20} />, href: 'https://github.com/mmsabit' },
    { icon: <FaFacebookF size={20}/>, href: 'https://www.facebook.com/mmsabit2004' },
    { icon: <FaLinkedinIn size={20} />, href: 'www.linkedin.com/in/mmsabit' },
  ];

  return (
    <footer className="bg-primary text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Social Icons */}
        <div className="flex justify-center items-center space-x-3 mb-6">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="w-11 h-11 rounded-full bg-white text-dark hover:text-primary hover:shadow-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Links */}
        <div className="flex justify-center items-center flex-wrap gap-2 sm:gap-4 mb-4 text-sm font-medium">
          <a href="#" className="hover:underline text-white">
            Privacy
          </a>
          <span>|</span>
          <a href="#" className="hover:underline text-white">
            Terms
          </a>          
        </div>
        {/* Copyright */}
        <p className="text-sm font-light text-white/95">
          &copy;{' '}
          
          . All Rights Reserved by M M Sabit
          
        </p>
      </div>
    </footer>
  );
};
