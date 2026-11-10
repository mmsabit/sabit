import React from 'react';
import { SectionHeader } from './SectionHeader';

interface QualificationItem {
  title: string;
  institution: string;
  period: string;
  description: string;
}

const educationList: QualificationItem[] = [
  {
    title: 'Master In CSE',
    institution: 'Cambridge University',
    period: '2000 - 2050',
    description:
      'Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem diam ea lorem eirmod duo sit ipsum stet lorem diam',
  },
  {
    title: 'Master In CSE',
    institution: 'Cambridge University',
    period: '2000 - 2050',
    description:
      'Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem diam ea lorem eirmod duo sit ipsum stet lorem diam',
  },
  {
    title: 'Master In CSE',
    institution: 'Cambridge University',
    period: '2000 - 2050',
    description:
      'Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem diam ea lorem eirmod duo sit ipsum stet lorem diam',
  },
];

const experienceList: QualificationItem[] = [
  {
    title: 'Web Designer',
    institution: 'Soft Company',
    period: '2000 - 2050',
    description:
      'Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem diam ea lorem eirmod duo sit ipsum stet lorem diam',
  },
  {
    title: 'Web Designer',
    institution: 'Soft Company',
    period: '2000 - 2050',
    description:
      'Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem diam ea lorem eirmod duo sit ipsum stet lorem diam',
  },
  {
    title: 'Web Designer',
    institution: 'Soft Company',
    period: '2000 - 2050',
    description:
      'Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem diam ea lorem eirmod duo sit ipsum stet lorem diam',
  },
];

export const Qualification: React.FC = () => {
  return (
    <section id="qualification" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader bgTitle="Quality" frontTitle="Education & Expericence" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Education Column */}
          <div>
            <h3 className="text-2xl font-bold text-dark mb-8">My Education</h3>
            <div className="border-l-2 border-primary pl-8 ml-3 space-y-8">
              {educationList.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-10.25 top-1 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                    <i className="far fa-dot-circle text-primary text-base"></i>
                  </div>
                  <h4 className="font-bold text-lg text-dark mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-2 font-medium">
                    <strong className="text-gray-800">{item.institution}</strong> |{' '}
                    <span className="text-gray-500">{item.period}</span>
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div>
            <h3 className="text-2xl font-bold text-dark mb-8">My Expericence</h3>
            <div className="border-l-2 border-primary pl-8 ml-3 space-y-8">
              {experienceList.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-10.25 top-1 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                    <i className="far fa-dot-circle text-primary text-base"></i>
                  </div>
                  <h4 className="font-bold text-lg text-dark mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-2 font-medium">
                    <strong className="text-gray-800">{item.institution}</strong> |{' '}
                    <span className="text-gray-500">{item.period}</span>
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
