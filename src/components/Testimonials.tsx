'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeader } from './SectionHeader';

interface TestimonialItem {
  id: number;
  quote: string;
  img: string;
  name: string;
  profession: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    quote:
      'Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum elitr dolore et eos labore, stet justo sed est sed. Diam sed sed dolor stet accusam amet eirmod eos, labore diam clita',
    img: '/img/testimonial-1.jpg',
    name: 'Client Name',
    profession: 'Profession',
  },
  {
    id: 2,
    quote:
      'Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum elitr dolore et eos labore, stet justo sed est sed. Diam sed sed dolor stet accusam amet eirmod eos, labore diam clita',
    img: '/img/testimonial-2.jpg',
    name: 'Client Name',
    profession: 'Profession',
  },
  {
    id: 3,
    quote:
      'Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum elitr dolore et eos labore, stet justo sed est sed. Diam sed sed dolor stet accusam amet eirmod eos, labore diam clita',
    img: '/img/testimonial-3.jpg',
    name: 'Client Name',
    profession: 'Profession',
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section id="testimonial" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader bgTitle="Review" frontTitle="Clients Say" />

        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="min-h-80 flex flex-col items-center justify-center transition-opacity duration-500">
            <i className="fa fa-3x fa-quote-left text-primary mb-6"></i>
            <p className="text-xl sm:text-2xl font-light text-gray-600 leading-relaxed mb-6 italic">
              &ldquo;{current.quote}&rdquo;
            </p>
            <img
              src={current.img}
              alt={current.name}
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover shadow-sm border-2 border-gray-100"
            />
            <h5 className="font-bold text-lg text-dark">{current.name}</h5>
            <span className="text-sm text-gray-500 font-medium">{current.profession}</span>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-primary w-4'
                    : 'bg-[#dddddd] hover:bg-gray-400'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
