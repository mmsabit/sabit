'use client';

import { useState, useEffect, useRef } from 'react';

const words = [
  'Web Designer',
  'Web Developer',
  'Front End Developer',
  'Full Stack Developer',
  'MEARN Stack Developer',
];

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  opacityDirection: number;
  velocityX: number;
  velocityY: number;
}

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      console.error('Could not initialize the hero particle animation canvas.');
      return;
    }

    const particles: Particle[] = [];
    const pointer = { x: -1, y: -1 };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let repulsePoint: { x: number; y: number; time: number } | null = null;

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const nextWidth = bounds.width;
      const nextHeight = bounds.height;
      const pixelRatio = window.devicePixelRatio || 1;

      if (width && height) {
        const scaleX = nextWidth / width;
        const scaleY = nextHeight / height;
        particles.forEach((particle) => {
          particle.x *= scaleX;
          particle.y *= scaleY;
        });
      }

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (particles.length === 0) {
        for (let index = 0; index < 160; index += 1) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random();
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3,
            opacity: Math.random(),
            opacityDirection: Math.random() < 0.5 ? -1 : 1,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed,
          });
        }
      }

      if (reducedMotion) {
        draw(0);
      }
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const delta = lastFrameTime ? Math.min((time - lastFrameTime) / 16.67, 2) : 1;
      lastFrameTime = time;

      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.x += particle.velocityX * delta;
          particle.y += particle.velocityY * delta;
          particle.opacity += particle.opacityDirection * 0.008 * delta;

          if (particle.opacity <= 0 || particle.opacity >= 1) {
            particle.opacityDirection *= -1;
            particle.opacity = Math.max(0, Math.min(1, particle.opacity));
          }
        }

        if (repulsePoint && time - repulsePoint.time < 400) {
          const deltaX = particle.x - repulsePoint.x;
          const deltaY = particle.y - repulsePoint.y;
          const distance = Math.hypot(deltaX, deltaY);

          if (distance > 0 && distance < 400) {
            const force = (1 - distance / 400) * 2 * delta;
            particle.x += (deltaX / distance) * force;
            particle.y += (deltaY / distance) * force;
          }
        }

        if (particle.x < 0) particle.x += width;
        if (particle.x > width) particle.x -= width;
        if (particle.y < 0) particle.y += height;
        if (particle.y > height) particle.y -= height;

        const distanceToPointer = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
        const hoverOpacity = distanceToPointer < 250
          ? Math.min(1, (distanceToPointer / 250) * 4)
          : 1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${particle.opacity * hoverOpacity})`;
        context.fill();
      });

      if (repulsePoint && time - repulsePoint.time >= 400) {
        repulsePoint = null;
      }

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };

    const clearPointer = () => {
      pointer.x = -1;
      pointer.y = -1;
    };

    const handleClick = (event: MouseEvent) => {
      const bounds = canvas.getBoundingClientRect();
      repulsePoint = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        time: performance.now(),
      };
    };

    resizeCanvas();
    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('pointermove', updatePointer);
    canvas.addEventListener('pointerleave', clearPointer);
    canvas.addEventListener('click', handleClick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('pointermove', updatePointer);
      canvas.removeEventListener('pointerleave', clearPointer);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const fullWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText.length + 1 === fullWord.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText.length - 1 === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section
      id="home"
      className="relative bg-[url(/img/Hero-bg.png)] bg-center bg-cover min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full"
      />
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Profile Image */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-start px-6 lg:px-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="/img/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Intro Text */}
          <div className="w-full lg:w-7/12 text-center lg:text-left">
            <h3 className="text-white text-2xl sm:text-3xl font-light mb-2">
              I&apos;m
            </h3>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-stroke-white tracking-tight leading-none mb-3"
            >
              M M. Sabit
            </h1>
            <div className="h-12 sm:h-14 flex items-center justify-center lg:justify-start">
              <span className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white tracking-wide">
                {currentText}
              </span>
              <span className="inline-block w-0.75 h-8 sm:h-10 bg-white ml-1 animate-pulse"></span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-8 sm:pt-10">
              <a
                href="https://docs.google.com/document/d/1C3z7m0Y9EBgGvcIl1W5vcMdXs-nfDy-Cju7CGmotI08/export?format=pdf"
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-sm font-semibold text-base transition-all duration-300 shadow-sm"
              >
                Download CV
              </a>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
