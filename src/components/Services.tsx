import React from 'react';
import { SectionHeader } from './SectionHeader';

interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
}

const servicesList: ServiceItem[] = [
  {
    icon: 'fa fa-laptop',
    title: 'Web Design',
    desc: 'Justo sit justo eos amet tempor amet clita amet ipsum eos elitr. Amet lorem lorem lorem est amet labore eirmod erat clita',
  },
  {
    icon: 'fa fa-laptop-code',
    title: 'Web Development',
    desc: 'Justo sit justo eos amet tempor amet clita amet ipsum eos elitr. Amet lorem lorem lorem est amet labore eirmod erat clita',
  },
  {
    icon: 'fab fa-android',
    title: 'Apps Design',
    desc: 'Justo sit justo eos amet tempor amet clita amet ipsum eos elitr. Amet lorem lorem lorem est amet labore eirmod erat clita',
  },
  {
    icon: 'fab fa-apple',
    title: 'Apps Development',
    desc: 'Justo sit justo eos amet tempor amet clita amet ipsum eos elitr. Amet lorem lorem lorem est amet labore eirmod erat clita',
  },
  {
    icon: 'fa fa-search',
    title: 'SEO',
    desc: 'Justo sit justo eos amet tempor amet clita amet ipsum eos elitr. Amet lorem lorem lorem est amet labore eirmod erat clita',
  },
  {
    icon: 'fa fa-edit',
    title: 'Content Creating',
    desc: 'Justo sit justo eos amet tempor amet clita amet ipsum eos elitr. Amet lorem lorem lorem est amet labore eirmod erat clita',
  },
];

export const Services: React.FC = () => {
  return (
    <section id="service" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader bgTitle="Service" frontTitle="My Services" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesList.map((service, index) => (
            <div key={index} className="text-center group flex flex-col items-center">
              <div className="flex items-center justify-center mb-4 space-x-3">
                <div className="w-15 h-15 rounded-full bg-primary text-white flex items-center justify-center text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <i className={service.icon}></i>
                </div>
                <h4 className="text-xl font-bold text-dark text-left">{service.title}</h4>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-sm">
                {service.desc}
              </p>
              <a
                href="#contact"
                className="inline-block border-b-2 border-primary text-primary hover:text-primary-hover hover:border-primary-hover pb-0.5 text-sm font-semibold transition-colors"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
