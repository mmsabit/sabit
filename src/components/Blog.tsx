import React from 'react';
import { SectionHeader } from './SectionHeader';

interface BlogPost {
  id: number;
  image: string;
  day: string;
  month: string;
  title: string;
}

const posts: BlogPost[] = [
  {
    id: 1,
    image: '/img/blog-1.jpg',
    day: '01',
    month: 'Jan',
    title: 'Rebum lorem no eos ut ipsum diam tempor sed rebum elitr ipsum',
  },
  {
    id: 2,
    image: '/img/blog-2.jpg',
    day: '01',
    month: 'Jan',
    title: 'Rebum lorem no eos ut ipsum diam tempor sed rebum elitr ipsum',
  },
  {
    id: 3,
    image: '/img/blog-3.jpg',
    day: '01',
    month: 'Jan',
    title: 'Rebum lorem no eos ut ipsum diam tempor sed rebum elitr ipsum',
  },
];

export const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader bgTitle="Blog" frontTitle="Latest Blog" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col items-start group">
              {/* Image & Date Badge */}
              <div className="relative w-full overflow-hidden rounded mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover rounded transition-transform duration-500 group-hover:scale-105"
                />

                {/* Centered circular date badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-15 h-15 rounded-full bg-primary text-white flex flex-col items-center justify-center shadow-md">
                  <span className="font-bold text-lg leading-tight">{post.day}</span>
                  <span className="text-[11px] uppercase tracking-wider font-semibold">
                    {post.month}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h5 className="font-medium text-lg text-dark mb-4 group-hover:text-primary transition-colors leading-snug">
                {post.title}
              </h5>

              {/* Read More Button */}
              <a
                href="#blog"
                className="inline-block border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2 text-sm font-semibold rounded-sm transition-all duration-300"
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
