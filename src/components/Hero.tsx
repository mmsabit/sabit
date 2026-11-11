"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiCode, FiDownload } from "react-icons/fi";
import { FaReact } from "react-icons/fa";
import { FloatingTechIcons } from "./FloatingTechIcons";

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  opacityDirection: number;
  velocityX: number;
  velocityY: number;
}

const cvLink =
  "https://docs.google.com/document/d/1C3z7m0Y9EBgGvcIl1W5vcMdXs-nfDy-Cju7CGmotI08/export?format=pdf";

const roles = [
  "Web Designer",
  "Web Developer",
  "Front End Developer",
  "Full Stack Developer",
  "MEARN Stack Developer",
];

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    const fullWord = roles[currentWordIndex];
    const isComplete = !isDeleting && currentText === fullWord;
    const delay = isComplete ? 1700 : isDeleting ? 35 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText === fullWord) {
          setIsDeleting(true);
        } else {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
        }
      } else if (currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((previous) => (previous + 1) % roles.length);
      } else {
        setCurrentText(fullWord.slice(0, currentText.length - 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  // Particle constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const particles: Particle[] = [];
    const pointer = {
      x: Number.NEGATIVE_INFINITY,
      y: Number.NEGATIVE_INFINITY,
    };
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let repulsePoint: { x: number; y: number; time: number } | null = null;

    const seed = () => {
      particles.length = 0;
      const count = width < 640 ? 46 : 88;

      for (let index = 0; index < count; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.55;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.9 + 0.4,
          opacity: Math.random() * 0.7 + 0.25,
          opacityDirection: Math.random() < 0.5 ? -1 : 1,
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
        });
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      seed();

      if (reducedMotion) draw(0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const delta = lastFrameTime
        ? Math.min((time - lastFrameTime) / 16.67, 2)
        : 1;
      lastFrameTime = time;

      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.x += particle.velocityX * delta;
          particle.y += particle.velocityY * delta;
          particle.opacity += particle.opacityDirection * 0.006 * delta;

          if (particle.opacity <= 0.15 || particle.opacity >= 1) {
            particle.opacityDirection *= -1;
            particle.opacity = Math.max(0.15, Math.min(1, particle.opacity));
          }
        }

        if (repulsePoint && time - repulsePoint.time < 500) {
          const deltaX = particle.x - repulsePoint.x;
          const deltaY = particle.y - repulsePoint.y;
          const distance = Math.hypot(deltaX, deltaY);

          if (distance > 0 && distance < 360) {
            const force = (1 - distance / 360) * 2.4 * delta;
            particle.x += (deltaX / distance) * force;
            particle.y += (deltaY / distance) * force;
          }
        }

        if (particle.x < 0) particle.x += width;
        if (particle.x > width) particle.x -= width;
        if (particle.y < 0) particle.y += height;
        if (particle.y > height) particle.y -= height;
      });

      // Constellation lines
      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const a = particles[first];
          const b = particles[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < 118) {
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(147, 197, 253, ${(1 - distance / 118) * 0.14})`;
            context.lineWidth = 0.6;
            context.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        const distanceToPointer = Math.hypot(
          particle.x - pointer.x,
          particle.y - pointer.y,
        );
        const hoverOpacity =
          distanceToPointer < 200 ? Math.max(0.25, distanceToPointer / 200) : 1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${particle.opacity * hoverOpacity * 0.75})`;
        context.fill();
      });

      if (repulsePoint && time - repulsePoint.time >= 500) {
        repulsePoint = null;
      }

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };

    const handlePointerLeave = () => {
      pointer.x = Number.NEGATIVE_INFINITY;
      pointer.y = Number.NEGATIVE_INFINITY;
    };

    const handleClick = (event: MouseEvent) => {
      const bounds = canvas.getBoundingClientRect();
      repulsePoint = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        time: performance.now(),
      };
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(draw);
    }

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("click", handleClick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  const handleParallax = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = section.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;

    section.style.setProperty("--sx", `${event.clientX - bounds.left}px`);
    section.style.setProperty("--sy", `${event.clientY - bounds.top}px`);
    section.style.setProperty("--px", `${relativeX * -22}px`);
    section.style.setProperty("--py", `${relativeY * -22}px`);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={handleParallax}
      className="relative flex h-screen items-center overflow-hidden bg-night pt-28 pb-20 sm:pb-24"
    >
      {/* Background layers */}
      <div className="absolute inset-0 hero-mesh" />
      <div className="absolute inset-0 bg-[url('/img/Hero-bg.png')] bg-cover bg-center opacity-20 mix-blend-soft-light" />
      <div className="absolute inset-0 hero-grid" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(560px circle at var(--sx, 50%) var(--sy, 50%), rgba(37,99,235,0.16), transparent 65%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/30 blur-[110px] sm:h-96 sm:w-96"
          style={{
            transform: "translate3d(var(--px, 0px), var(--py, 0px), 0)",
          }}
        />
        <div
          className="absolute -right-24 top-1/3 h-80 w-80 animate-drift rounded-full bg-primary/20 blur-[120px]"
          style={{
            transform:
              "translate3d(calc(var(--px, 0px) * -1), calc(var(--py, 0px) * -1), 0)",
          }}
        />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-primary-hover/15 blur-[120px]" />
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full"
      />

      <FloatingTechIcons preset="hero" variant="dark" className="z-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* Intro text */}
          <div className="order-1 text-center lg:text-left">
            <div>
              <span className="text-lg font-semibold uppercase tracking-[0.32em] text-white/75">
                I&apos;m
              </span>
            </div>

            <h1
              aria-label="M M. Sabit"
              className="animate-fade-up mt-5 text-[clamp(3.1rem,8.4vw,6.8rem)] font-black uppercase leading-[0.92] tracking-tight"
              style={{ animationDelay: "160ms" }}
            >
              <span className="text-gradient-light block">M M. Sabit</span>
            </h1>

            <div
              className="animate-fade-up mt-6 flex min-h-11 items-center justify-center gap-2.5 sm:min-h-13 lg:justify-start"
              style={{ animationDelay: "260ms" }}
            >
              <span className="text-xl font-light tracking-wide text-white/85 sm:text-2xl md:text-[1.75rem]">
                {currentText}
              </span>
              <span
                aria-hidden="true"
                className="animate-blink inline-block h-6 w-0.75 rounded-full bg-primary sm:h-7"
              />
            </div>

            <div
              className="animate-fade-up mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              style={{ animationDelay: "400ms" }}
            >
              <Link
                href={cvLink}
                className="btn-shine group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(37,99,235,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
              >
                <FiDownload className="text-base transition-transform group-hover:translate-y-0.5" />
                Download CV
                <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Portrait */}
          <div className="order-2 flex justify-center lg:justify-end">
            <div
              className="animate-face-in relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80 lg:h-88 lg:w-88"
              style={{ animationDelay: "260ms" }}
            >
              <div className="absolute -inset-10 rounded-full bg-primary/25 blur-[70px]" />
              <div className="animate-spin-slower absolute -inset-8 rounded-full border border-dashed border-white/15 sm:-inset-10" />
              <div className="absolute -inset-4 rounded-full border border-white/[0.07]" />

              <div className="animate-spin-slow absolute -inset-0.75 rounded-full bg-[conic-gradient(from_0deg,#2563eb_0deg,rgba(37,99,235,0)_85deg,#ffffff_150deg,rgba(255,255,255,0)_215deg,#2563eb_320deg)] opacity-80 blur-[1.5px]" />

              <div className="absolute inset-0 rounded-full border-[7px] border-white/10 bg-night" />
              <Image
                src="/img/profile.jpg"
                alt="M M Sabit"
                width={480}
                height={480}
                priority
                sizes="(min-width: 1024px) 352px, (min-width: 640px) 320px, 256px"
                className="relative h-[calc(100%-16px)] w-[calc(100%-16px)] rounded-full border border-white/10 object-cover shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
              />

              {/* Floating accents */}
              <div className="animate-float absolute -right-3 top-4 sm:-right-6 sm:top-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-xl backdrop-blur-md">
                  <FiCode className="text-lg text-primary" />
                </div>
              </div>

              <div className="animate-float-soft absolute -bottom-3 -left-2 sm:-left-8">
                <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-md">
                  <span className="whitespace-nowrap text-xs font-semibold text-primary">
                    <FaReact size={30} />
                  </span>
                </div>
              </div>

              <span className="absolute -right-1 bottom-16 h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_4px_rgba(37,99,235,0.55)]" />
              <span className="absolute -left-3 top-16 h-1.5 w-1.5 rounded-full bg-white/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
