'use client';

import React, { useEffect, useState } from "react";
import { SectionHeader } from "./SectionHeader";

interface SkillItem {
  id: number;
  image: string;
  name: string;
}

interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export const Skills: React.FC = () => {
  const [skillsData, setSkillsData] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await fetch("/data/skill.json", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Failed to load skill data (${res.status})`);
        }

        const data: SkillCategory[] = await res.json();
        setSkillsData(data);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Could not load skills data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skill" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader bgTitle="Skills" frontTitle="My Skills" />

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-100 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center animate-pulse h-28 sm:h-32 md:h-36"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full mb-3" />
                <div className="w-16 sm:w-20 h-3.5 sm:h-4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-10 text-red-500 font-medium">
            {error}
          </div>
        )}

        {/* Skills Display in Responsive Grid / Wrapped Badges */}
        {!loading && !error && (
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {skillsData.map((catGroup) => (
              <div key={catGroup.category} className="space-y-4 sm:space-y-6 w-full">
                <h3 className="w-full text-base sm:text-lg md:text-xl font-bold text-dark flex items-center justify-center text-center gap-2.5 pb-2 border-b border-gray-100">
                  {catGroup.category}
                </h3>

                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 md:gap-5">
                  {catGroup.items.map((skill, index) => (
                    <div
                      key={`${catGroup.category}-${skill.id || index}-${skill.name}`}
                      className="group bg-white border border-gray-200/90 hover:border-primary rounded-xl py-1.5 px-3 sm:py-2 sm:px-4 md:py-2.5 md:px-5 flex items-center justify-center text-center shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 gap-2.5 sm:gap-3 md:gap-4 cursor-default"
                    >
                      <div className="shrink-0 flex items-center justify-center">
                        <img
                          src={skill.image}
                          alt={skill.name}
                          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="font-semibold text-xs sm:text-sm md:text-base text-dark group-hover:text-primary transition-colors whitespace-nowrap">
                        {skill.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
