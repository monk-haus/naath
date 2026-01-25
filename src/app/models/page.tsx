'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ModelsPage() {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  useEffect(() => {
    if (!canHover) return;

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [canHover]);

  const models = [
    {
      id: 'fatima',
      name: 'FATIMA',
      slug: 'fatima',
      image: '/assets/images/models/fatima-fawaz/fatima-5.webp',
      alt: 'Fatima F',
    },
    {
      id: 'nyanhial',
      name: 'NYANHIAL K',
      slug: 'nyanhial-kueii',
      image: '/assets/images/model-2.webp',
      alt: 'Nyanhial K',
    },
  ];

  return (
    <main className="w-full bg-alabaster min-h-screen md:grid md:grid-cols-2">
      {models.map((model, index) => (
        <div
          key={model.id}
          className={`relative w-full h-screen border-b md:border-b-0 border-charcoal/10 ${index === 0 ? 'md:border-r' : ''
            }`}
        >
          <Link
            href={`/models/${model.slug}`}
            className="relative block w-full h-full overflow-hidden group cursor-none"
            onMouseEnter={() => canHover && setHoveredModel(model.id)}
            onMouseLeave={() => setHoveredModel(null)}
          >
            <div
              className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              style={{
                transform: hoveredModel === model.id ? 'scale(1.05)' : 'scale(1)',
                filter: canHover
                  ? (hoveredModel === model.id ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.8)')
                  : 'grayscale(0%) brightness(1)',
              }}
            >
              <Image
                src={model.image}
                alt={model.alt}
                fill
                className="object-cover"
                style={{ objectPosition: 'top center' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized={process.env.NODE_ENV === 'development'}
              />
            </div>

            <div
              className="absolute left-4 md:left-8 top-0 bottom-0 flex items-center z-20 pointer-events-none mix-blend-difference text-alabaster"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              <h1
                className="whitespace-nowrap leading-none transition-opacity duration-500"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontWeight: 200,
                  fontSize: 'clamp(3rem, 12vw, 8rem)',
                  opacity: canHover ? (hoveredModel === model.id ? 1 : 0.7) : 1,
                }}
              >
                {model.name}
              </h1>
            </div>

            <div className="md:hidden absolute inset-0 bg-charcoal/0 active:bg-charcoal/10 transition-colors duration-300 pointer-events-none" />

            <div
              className="hidden md:block absolute inset-0 transition-colors duration-500 pointer-events-none"
              style={{
                backgroundColor: hoveredModel === model.id ? 'transparent' : 'rgba(28, 27, 26, 0.2)',
              }}
            />
          </Link>
        </div>
      ))}

      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 top-0 left-0 hidden md:block will-change-transform"
        style={{
          opacity: hoveredModel && canHover ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <div
          className="flex items-center justify-center rounded-full bg-alabaster/95 backdrop-blur-sm border border-charcoal/10 shadow-2xl"
          style={{
            width: '120px',
            height: '120px',
          }}
        >
          <span
            className="text-charcoal uppercase text-center leading-none animate-pulse"
            style={{
              fontFamily: 'var(--font-montreal)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.15em',
            }}
          >
            VIEW<br />BOOK
          </span>
        </div>
      </div>
    </main>
  );
}