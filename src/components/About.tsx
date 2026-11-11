import Image from 'next/image';
import React from 'react';
import { FiCode } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { FloatingTechIcons } from './FloatingTechIcons';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';

const education = [
  {
    institution: 'European University of Bangladesh, Dhaka',
    period: '2025 - Present',
    degree: 'Bachelor of Science in Computer Science & Engineering.',
    detail: 'Current - 2nd Year 2nd Semester.',
  },
  {
    institution: 'Daffodil Polytechnic Institute, Dhaka',
    period: '2020 - 2024',
    degree: 'Diploma of Computer Science & Engineering.',
    detail: 'CGPA 3.51',
  },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <FloatingTechIcons preset="about" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader bgTitle="About" frontTitle="About Me" />

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <Reveal direction="left" className="lg:col-span-5">
            <div className="group relative mx-auto max-w-md">
              <div className="absolute -inset-3 -rotate-2 rounded-[2.25rem] border border-primary/20 transition-transform duration-700 group-hover:rotate-0" />
              <div className="absolute -inset-3 rotate-2 rounded-[2.25rem] bg-primary/5 transition-transform duration-700 group-hover:rotate-0" />

              <div className="relative aspect-4/5 overflow-hidden rounded-4xl border border-gray-100 bg-gray-50 shadow-[0_40px_80px_-40px_rgba(10,18,41,0.4)]">
                <Image
                  src="/img/about.jpg"
                  alt="About M M Sabit"
                  fill
                  sizes="(min-width: 1024px) 460px, (min-width: 640px) 560px, 100vw"
                  className="object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-night/55 via-night/5 to-transparent" />

                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                      <FiCode />
                    </span>
                    <span className="text-sm font-semibold text-white">
                      Full-Stack Web Developer
                    </span>
                  </div>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute -right-6 -top-6 grid grid-cols-3 gap-1.5"
              >
                {Array.from({ length: 9 }).map((_, index) => (
                  <span key={index} className="h-1 w-1 rounded-full bg-primary/40" />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <div className="lg:col-span-7">
            <Reveal direction="right" delay={120}>
              <div className="flex items-center gap-3">
                <span className="h-8 w-1 rounded-full bg-linear-to-b from-primary to-primary-hover" />
                <h3 className="text-2xl font-bold text-dark sm:text-3xl">
                  Full-Stack Web Developer
                </h3>
              </div>

              <p className="mt-6 text-[15px] leading-[1.95] text-secondary sm:text-base">
                I am a dedicated Junior Full-Stack Developer and Computer Science undergraduate with
                a strong academic foundation in software engineering. Driven by a passion for
                building clean, high-performing, and user-centric digital experiences, I specialize
                in modern web technologies including{' '}
                <strong className="font-semibold text-dark">
                  JavaScript, TypeScript, React.js, Next.js, and Tailwind CSS
                </strong>{' '}
                on the frontend, alongside{' '}
                <strong className="font-semibold text-dark">Node.js, MySQL, and MongoDB</strong> for
                backend development and database management. I bring hands-on experience in
                developing responsive web applications, managing seamless platform migrations, and
                optimizing web performance.
              </p>
            </Reveal>

            <Reveal direction="up" delay={240}>
              <div className="mt-10">
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FaGraduationCap className="text-[15px]" />
                  </span>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.28em] text-dark/70">
                    Education
                  </h4>
                  <span className="h-px flex-1 bg-linear-to-r from-gray-200 to-transparent" />
                </div>

                <div className="relative space-y-4 border-l border-primary/20 pl-5 sm:pl-6">
                  {education.map((item) => (
                    <div key={item.institution} className="relative">
                      <span className="absolute -left-6 top-5 h-2 w-2 rounded-full border-2 border-white bg-primary ring-2 ring-primary/15 sm:-left-7" />

                      <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 transition-all duration-300 hover:border-primary/25 hover:bg-white hover:shadow-[0_18px_35px_-25px_rgba(37,99,235,0.5)] sm:p-5">
                        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
                          <h5 className="text-sm font-bold text-dark sm:text-[15px]">
                            {item.institution}
                          </h5>
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                            {item.period}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-relaxed text-secondary">
                          {item.degree}
                        </p>
                        <p className="mt-1 text-xs font-medium text-dark/55">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
