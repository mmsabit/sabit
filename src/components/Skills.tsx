'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiCloud, FiCode, FiDatabase, FiLayers, FiTool } from 'react-icons/fi';
import { FloatingTechIcons } from './FloatingTechIcons';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { SpotlightCard } from './SpotlightCard';

interface SkillItem {
  id: number;
  image: string;
  name: string;
}

interface SkillCategory {
  category: string;
  items: SkillItem[];
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Programming Languages': FiCode,
  'Frameworks & Libraries': FiLayers,
  Databases: FiDatabase,
  'Deployment & Cloud': FiCloud,
  'Tools & Software': FiTool,
};

const cardSpans = [
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
  'lg:col-span-3',
];

export const Skills: React.FC = () => {
  const [skillsData, setSkillsData] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/skill.json', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Failed to load skill data (${response.status})`);
        }

        const data: SkillCategory[] = await response.json();
        setSkillsData(data);
      } catch (fetchError) {
        console.error('Error fetching skills:', fetchError);
        setError('Could not load skills data.');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skill" className="relative overflow-hidden bg-[#f8faff] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-70" />
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-[100px]" />

      <FloatingTechIcons preset="skills" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader bgTitle="Skills" frontTitle="My Skills" />

        {loading && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`animate-pulse rounded-3xl border border-gray-100 bg-white p-6 sm:p-7 ${cardSpans[index]}`}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gray-200" />
                  <div className="h-4 w-36 rounded bg-gray-200" />
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {Array.from({ length: 4 }).map((__, chipIndex) => (
                    <div key={chipIndex} className="h-9 w-24 rounded-full bg-gray-100" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center font-medium text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
            {skillsData.map((categoryGroup, groupIndex) => {
              const CategoryIcon = categoryIcons[categoryGroup.category] ?? FiCode;

              return (
                <Reveal
                  key={categoryGroup.category}
                  delay={groupIndex * 90}
                  className={`md:col-span-1 ${cardSpans[groupIndex] ?? 'lg:col-span-2'}`}
                >
                  <SpotlightCard className="group h-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-32px_rgba(10,18,41,0.5)] transition-all duration-500 hover:border-primary/30 hover:shadow-[0_30px_60px_-35px_rgba(37,99,235,0.45)] sm:p-7">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_10px_24px_-10px_rgba(37,99,235,0.9)]">
                          <CategoryIcon className="text-lg" />
                        </span>
                        <h3 className="text-[15px] font-bold leading-snug text-dark sm:text-base">
                          {categoryGroup.category}
                        </h3>
                      </div>
                      <span className="select-none text-xs font-bold tabular-nums tracking-wider text-primary/30 transition-colors duration-500 group-hover:text-primary/60">
                        {String(groupIndex + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {categoryGroup.items.map((skill, index) => (
                        <div
                          key={`${categoryGroup.category}-${skill.id || index}-${skill.name}`}
                          className="group/chip flex items-center gap-2 rounded-full border border-gray-200/90 bg-white py-1.5 pl-2 pr-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 transition-colors group-hover/chip:bg-white">
                            <Image
                              src={skill.image}
                              alt=""
                              width={18}
                              height={18}
                              className="h-[18px] w-[18px] object-contain transition-transform duration-300 group-hover/chip:scale-110"
                              loading="lazy"
                            />
                          </span>
                          <span className="whitespace-nowrap text-xs font-semibold text-dark/80 transition-colors group-hover/chip:text-primary sm:text-[13px]">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
