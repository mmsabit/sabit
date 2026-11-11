'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiArrowUpRight, FiGithub, FiGlobe } from 'react-icons/fi';
import { FloatingTechIcons } from './FloatingTechIcons';
import { SectionHeader } from './SectionHeader';
import { SpotlightCard } from './SpotlightCard';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  technology: string[];
  link: string;
  image: string;
  git_repo: string;
}

export const Portfolio: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/portfolio.json');
        if (!response.ok) {
          throw new Error(`Failed to load portfolio (${response.status})`);
        }

        const data: PortfolioItem[] = await response.json();
        setPortfolioData(data);
      } catch (fetchError) {
        console.error('Error loading portfolio:', fetchError);
        setError('Could not load portfolio items.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const technologies = [
    'All',
    ...Array.from(new Set(portfolioData.flatMap((item) => item.technology))),
  ];

  const filteredItems =
    activeFilter === 'All'
      ? portfolioData
      : portfolioData.filter((item) => item.technology.includes(activeFilter));

  return (
    <section id="portfolio" className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-50" />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-primary/5 blur-[110px]" />

      <FloatingTechIcons preset="portfolio" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader bgTitle="Portfolio" frontTitle="My Portfolio" />

        {!loading && portfolioData.length > 0 && (
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {technologies.map((tech) => {
              const isActive = activeFilter === tech;

              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setActiveFilter(tech)}
                  aria-pressed={isActive}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                    isActive
                      ? 'border-primary bg-primary text-white shadow-[0_12px_28px_-14px_rgba(37,99,235,0.9)]'
                      : 'border-gray-200 bg-white text-dark/70 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="aspect-16/10 w-full animate-pulse bg-gray-200" />
                <div className="p-6">
                  <div className="mb-3 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-100" />
                  <div className="mb-5 h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                  <div className="mb-6 flex gap-2">
                    <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100" />
                    <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100" />
                    <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100" />
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-4">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                  </div>
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {filteredItems.map((item, index) => {
              const displayUrl = item.link.replace(/^https?:\/\//, '').replace(/\/$/, '');

              return (
                <div
                  key={`${activeFilter}-${item.id || index}-${item.title}`}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <SpotlightCard className="group flex h-full flex-col rounded-[1.75rem] border border-gray-200/80 bg-white p-2.5 shadow-[0_20px_50px_-42px_rgba(10,18,41,0.8)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_38px_70px_-42px_rgba(37,99,235,0.45)]">
                    {/* Browser window preview */}
                    <div className="overflow-hidden rounded-[1.35rem] border border-gray-100 bg-[#f8faff]">
                      <div className="flex items-center gap-2.5 border-b border-gray-100 bg-white px-3 py-2.5">
                        <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
                          <span className="h-2 w-2 rounded-full bg-primary/70" />
                          <span className="h-2 w-2 rounded-full bg-primary/35" />
                          <span className="h-2 w-2 rounded-full bg-gray-200" />
                        </span>

                        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-400">
                          <FiGlobe className="shrink-0 text-[10px]" />
                          <span className="truncate">{displayUrl}</span>
                        </span>

                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${item.title}`}
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors duration-300 hover:bg-primary/10 hover:text-primary"
                        >
                          <FiArrowUpRight className="text-xs" />
                        </Link>
                      </div>

                      <div className="relative aspect-16/10 overflow-hidden bg-night">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover object-top transition-transform duration-900 ease-out group-hover:scale-[1.05]"
                          loading="lazy"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-night/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col px-2.5 pb-1.5 pt-5 sm:px-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold leading-snug text-dark transition-colors duration-300 group-hover:text-primary sm:text-xl">
                          {item.title}
                        </h3>
                        <span className="mt-1 shrink-0 text-[10px] font-bold tabular-nums tracking-[0.2em] text-primary/30 transition-colors duration-300 group-hover:text-primary/60">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-secondary">
                        {item.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.technology.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-primary/10 bg-primary/5 px-2 py-0.5 text-[10px] font-semibold text-primary/80 transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                        >
                          <span>Visit Site</span>
                          <FiArrowUpRight className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </Link>

                        <Link
                          href={item.git_repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-dark/50 transition-colors hover:text-dark"
                        >
                          <FiGithub className="text-base" />
                          <span>GitHub</span>
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
