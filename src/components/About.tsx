import React from 'react';
import { SectionHeader } from './SectionHeader';

export const About: React.FC = () => {


  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader bgTitle="About" frontTitle="About Me" />

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image */}
          <div className="w-full lg:w-5/12">
            <div className="overflow-hidden rounded shadow-lg">
              <img
                src="/img/about.jpg"
                alt="About Kate Winslet"
                className="w-full h-auto object-cover rounded"
              />
            </div>
          </div>

          {/* Bio Details */}
          <div className="w-full lg:w-7/12 text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-dark mb-4">
              Full-Stack Web Developer
            </h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              I am a dedicated Junior Full-Stack Developer and Computer Science undergraduate with a strong academic foundation in software engineering. Driven by a passion for building clean, high-performing, and user-centric digital experiences, I specialize in modern web technologies including JavaScript, TypeScript, React.js, Next.js, and Tailwind CSS on the frontend, alongside Node.js, MySQL, and MongoDB for backend development and database management. I bring hands-on experience in developing responsive web applications, managing seamless platform migrations, and optimizing web performance.
            </p>

            {/* Info Grid */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-8">
              {details.map((item) => (
                <div key={item.label} className="text-base">
                  <span className="font-bold text-dark">{item.label}: </span>
                  <span className="text-gray-500">{item.value}</span>
                </div>
              ))}
            </div> */}

            
          </div>
        </div>
      </div>
    </section>
  );
};
