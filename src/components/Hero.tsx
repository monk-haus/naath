'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (window.matchMedia('(hover: hover)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            const rawProgress = scrollY / windowHeight;
            const progress = Math.max(0, Math.min(1, rawProgress));

            containerRef.current.style.filter = `blur(${progress * 20}px) brightness(${1 - progress * 0.5}) grayscale(${progress * 100}%)`;
            containerRef.current.style.transform = `scale(${1 - progress * 0.05})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isServer = typeof window === 'undefined';
  const windowHeight = !isServer ? window.innerHeight : 1000;
  const windowWidth = !isServer ? window.innerWidth : 1000;

  const centerX = windowWidth / 2;
  const bottomY = windowHeight;
  const distX = mousePosition.x - centerX;
  const distY = mousePosition.y - bottomY;

  const isNearBottom = !isServer && mousePosition.y > windowHeight * 0.7;

  const rotation = isNearBottom ? Math.atan2(distX, -distY) * (180 / Math.PI) : 0;
  const clampedRotation = Math.max(-45, Math.min(45, rotation));

  const indicatorHeight = isNearBottom ? 140 : 100;

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-alabaster p-4 md:p-10"
    >
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden bg-charcoal transition-none duration-0"
        style={{
          willChange: 'filter, transform',
        }}
      >
        <Image
          src="/assets/images/models/fatima-fawaz/fatima-3.webp"
          alt="Hero"
          fill
          priority
          className="object-cover opacity-80"
          style={{ objectPosition: 'center 20%' }}
          unoptimized={process.env.NODE_ENV === 'development'}
        />

        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
            opacity: 0.5
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10 pointer-events-none" />

        <div className="absolute inset-0 z-20 pointer-events-none p-4 md:p-8 mix-blend-difference text-white/90">
          <span className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-[9px] md:text-[10px] tracking-[0.2em] font-medium font-montreal hidden md:block">CURATED ROSTER</span>
          <span className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-[9px] md:text-[10px] tracking-[0.2em] font-medium font-montreal hidden md:block">NBO / JUB </span>
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none mix-blend-difference text-white px-4">
          <h1
            className="text-center leading-[0.85] italic animate-fade-in max-w-full"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 200,
              fontSize: 'clamp(3.5rem, 12vw, 10rem)',
              letterSpacing: '-0.03em',
            }}
          >
            THE NEW<br />VANGUARD
          </h1>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-1/2 z-30 pointer-events-none flex flex-col items-center justify-end pb-10"
        style={{
          transform: `translateX(-50%)`,
        }}
      >
        <div
          className="mb-4 text-alabaster/90 uppercase text-center mix-blend-difference"
          style={{
            fontFamily: 'var(--font-montreal)',
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.25em',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          DISCOVER TALENT
        </div>

        <div
          className="w-[1px] bg-alabaster/80 mix-blend-difference origin-bottom"
          style={{
            height: `${indicatorHeight}px`,
            transform: `rotate(${clampedRotation}deg)`,
            transition: 'height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.2s ease-out',
          }}
        />
      </div>
    </section>
  );
}