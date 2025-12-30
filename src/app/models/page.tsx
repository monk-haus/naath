'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ModelsPage() {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
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
      image: '/assets/images/model-1.webp',
      alt: 'Fatima F',
    },
    {
      id: 'anok',
      name: 'ANOK Y.',
      slug: 'anok',
      image: '/assets/images/model-2.webp',
      alt: 'Anok Y',
    },
  ];

  return (
    <main className="min-h-screen bg-alabaster w-full overflow-hidden">
      <div className="relative min-h-screen flex flex-col md:flex-row md:h-screen">
        <Link
          href={`/models/${models[0].slug}`}
          className="relative flex-1 h-[50vh] md:h-full overflow-hidden group"
          style={{ cursor: canHover && hoveredSide === 'left' ? 'none' : 'pointer' }}
          onMouseEnter={() => canHover && setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div
            className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{
              transform: hoveredSide === 'left' ? 'scale(1.05)' : hoveredSide === 'right' ? 'translateX(-5%) scale(0.95)' : 'scale(1)',
              filter: 'grayscale(100%) brightness(0.8)',
            }}
          >
            <Image
              src={models[0].image}
              alt={models[0].alt}
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
              className="whitespace-nowrap leading-none"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontWeight: 200,
                fontSize: 'clamp(4rem, 15vh, 12rem)',
                opacity: hoveredSide === 'left' ? 1 : 0.6,
                transition: 'opacity 0.5s ease',
              }}
            >
              {models[0].name}
            </h1>
          </div>
          
          <div className="md:hidden absolute inset-0 bg-charcoal/0 active:bg-charcoal/10 transition-colors duration-300 pointer-events-none" />

          <div
            className="hidden md:block absolute inset-0 bg-charcoal/0 transition-colors duration-500 pointer-events-none"
            style={{
              backgroundColor: hoveredSide === 'right' ? 'rgba(28, 27, 26, 0.4)' : 'transparent',
            }}
          />
        </Link>

        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-alabaster/50 z-30 pointer-events-none transform -translate-x-1/2 mix-blend-difference"
          style={{
            opacity: hoveredSide ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        />

        <Link
          href={`/models/${models[1].slug}`}
          className="relative flex-1 h-[50vh] md:h-full overflow-hidden group"
          style={{ cursor: canHover && hoveredSide === 'right' ? 'none' : 'pointer' }}
          onMouseEnter={() => canHover && setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div
            className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{
              transform: hoveredSide === 'right' ? 'scale(1.05)' : hoveredSide === 'left' ? 'translateX(5%) scale(0.95)' : 'scale(1)',
              filter: hoveredSide === 'right' ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.8)',
            }}
          >
            <Image
              src={models[1].image}
              alt={models[1].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized={process.env.NODE_ENV === 'development'}
            />
          </div>

          <div
            className="absolute right-4 md:right-8 top-0 bottom-0 flex items-center z-20 pointer-events-none mix-blend-difference text-alabaster"
            style={{
              writingMode: 'vertical-rl',
            }}
          >
            <h1
              className="whitespace-nowrap leading-none"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontWeight: 200,
                fontSize: 'clamp(4rem, 15vh, 12rem)',
                opacity: hoveredSide === 'right' ? 1 : 0.6,
                transition: 'opacity 0.5s ease',
              }}
            >
              {models[1].name}
            </h1>
          </div>

          <div className="md:hidden absolute inset-0 bg-charcoal/0 active:bg-charcoal/10 transition-colors duration-300 pointer-events-none" />

          <div
            className="hidden md:block absolute inset-0 bg-charcoal/0 transition-colors duration-500 pointer-events-none"
            style={{
              backgroundColor: hoveredSide === 'left' ? 'rgba(28, 27, 26, 0.4)' : 'transparent',
            }}
          />
        </Link>

        <div
          ref={cursorRef}
          className="fixed pointer-events-none z-50 top-0 left-0 hidden md:block will-change-transform"
          style={{
            opacity: hoveredSide && canHover ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          <div
            className="flex items-center justify-center rounded-full bg-alabaster/95 backdrop-blur-sm border border-charcoal/10 shadow-2xl"
            style={{
              width: '140px',
              height: '140px',
            }}
          >
            <span
              className="text-charcoal uppercase text-center leading-none animate-pulse"
              style={{
                fontFamily: 'var(--font-montreal)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
              }}
            >
              VIEW<br />BOOK
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}