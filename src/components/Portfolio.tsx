'use client';

import { useEffect, useState } from 'react';
import { SectionHeader } from './SectionHeader';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  technology: string[];
  link: string;
  image: string;
  git_repo: string;
}

export const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        // Fetch from /data/portfolio.json
        const res = await fetch('/data/portfolio.json');
        if (!res.ok) {
          throw new Error(`Failed to load portfolio (${res.status})`);
        }
        const data: PortfolioItem[] = await res.json();
        setPortfolioData(data);
      } catch (err) {
        console.error('Error loading portfolio:', err);
        setError('Could not load portfolio items.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  // Dynamically extract unique technologies from all items
  const technologies = [
    'All',
    ...Array.from(new Set(portfolioData.flatMap((item) => item.technology))),
  ];

  const filteredItems =
    activeFilter === 'All'
      ? portfolioData
      : portfolioData.filter((item) => item.technology.includes(activeFilter));

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader bgTitle="Portfolio" frontTitle="My Portfolio" />

        {/* Technology Filter Buttons */}
        {!loading && portfolioData.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {technologies.map((tech) => {
              const isActive = activeFilter === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setActiveFilter(tech)}
                  className={`px-4 py-1.5 rounded-sm text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white border border-primary shadow-sm'
                      : 'border border-primary text-primary hover:bg-primary hover:text-white bg-transparent'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse"
              >
                <div className="w-full aspect-16/10 bg-gray-200" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-5" />
                  <div className="flex gap-2 mb-6">
                    <div className="h-6 w-16 bg-gray-200 rounded" />
                    <div className="h-6 w-16 bg-gray-200 rounded" />
                    <div className="h-6 w-16 bg-gray-200 rounded" />
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-10 text-red-500 font-medium">{error}</div>
        )}

        {/* Portfolio Cards Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={`${item.id || index}-${item.title}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Project Image */}
                <div className="relative w-full aspect-16/10 bg-slate-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.technology.map((tech) => (
                      <span
                        key={tech}
                        className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action Links */}
                  <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover font-semibold text-sm inline-flex items-center gap-1.5 transition-colors group/link"
                    >
                      <span>Visit Site</span>
                      <span className="transition-transform group-hover/link:translate-x-1">
                        &rarr;
                      </span>
                    </a>

                    <a
                      href={item.git_repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-gray-900 font-medium text-sm inline-flex items-center gap-1.5 transition-colors"
                    >
                      <i className="fab fa-github text-base"></i>
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
