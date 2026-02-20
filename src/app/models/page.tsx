'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ModelsPage() {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches);
    requestAnimationFrame(() => setMounted(true));
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
      number: '01',
    },
    {
      id: 'nyanhial',
      name: 'NYANHIAL',
      slug: 'nyanhial-k',
      image: '/assets/images/model-2.webp',
      alt: 'Nyanhial K',
      number: '02',
    },
    {
      id: 'nthasibeng',
      name: 'NTHASIBENG',
      slug: 'nthasibeng',
      image: '/assets/images/models/nthasibeng/IMG_8278.webp',
      alt: 'Nthasibeng F',
      number: '03',
    },
  ];

  const getColumnWidth = (modelId: string) => {
    if (!canHover || !hoveredModel) return '33.333%';
    if (hoveredModel === modelId) return '55%';
    return '22.5%';
  };

  return (
    <main className="w-full bg-charcoal min-h-screen overflow-hidden">
      <div className="hidden md:flex h-screen w-full">
        {models.map((model, index) => (
          <div
            key={model.id}
            className="relative h-full overflow-hidden"
            style={{
              width: getColumnWidth(model.id),
              transition: 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <Link
              href={`/models/${model.slug}`}
              className="relative block w-full h-full overflow-hidden cursor-none"
              onMouseEnter={() => canHover && setHoveredModel(model.id)}
              onMouseLeave={() => setHoveredModel(null)}
            >
              <div
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: hoveredModel === model.id ? 'scale(1.08)' : 'scale(1.02)',
                  filter: canHover
                    ? hoveredModel === model.id
                      ? 'grayscale(0%) brightness(0.9)'
                      : hoveredModel
                        ? 'grayscale(100%) brightness(0.4)'
                        : 'grayscale(100%) brightness(0.6)'
                    : 'grayscale(0%) brightness(0.85)',
                  transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.8s ease',
                }}
              >
                <Image
                  src={model.image}
                  alt={model.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'top center' }}
                  sizes="60vw"
                  priority
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
              </div>

              {index < models.length - 1 && (
                <div
                  className="absolute top-0 right-0 w-px h-full z-20"
                  style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(249, 248, 244, 0.15), transparent)',
                  }}
                />
              )}

              <div
                className="absolute top-8 z-20 pointer-events-none"
                style={{
                  right: '24px',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(-20px)',
                  transition: `opacity 0.8s ease ${0.3 + index * 0.15}s, transform 0.8s ease ${0.3 + index * 0.15}s`,
                }}
              >
                <span
                  className="text-alabaster/40"
                  style={{
                    fontFamily: 'var(--font-geist)',
                    fontSize: '11px',
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                  }}
                >
                  {model.number}
                </span>
              </div>

              <div
                className="absolute left-6 top-0 bottom-0 flex items-center z-20 pointer-events-none"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  opacity: mounted ? 1 : 0,
                  transition: `opacity 1s ease ${0.4 + index * 0.2}s`,
                }}
              >
                <h2
                  className="whitespace-nowrap leading-none text-alabaster"
                  style={{
                    fontFamily: 'var(--font-instrument)',
                    fontWeight: 400,
                    fontSize: hoveredModel === model.id ? 'clamp(2.5rem, 6vw, 5rem)' : 'clamp(1.8rem, 3.5vw, 3rem)',
                    opacity: canHover
                      ? hoveredModel === model.id
                        ? 1
                        : hoveredModel
                          ? 0.3
                          : 0.7
                      : 0.9,
                    transition: 'font-size 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease',
                  }}
                >
                  {model.name}
                </h2>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(28, 27, 26, 0.6), transparent)',
                  opacity: hoveredModel === model.id ? 1 : 0.4,
                  transition: 'opacity 0.6s ease',
                }}
              />

              <div
                className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(28, 27, 26, 0.3), transparent)',
                }}
              />
            </Link>
          </div>
        ))}
      </div>

      <div className="md:hidden">
        {models.map((model, index) => (
          <Link
            key={model.id}
            href={`/models/${model.slug}`}
            className="relative block w-full overflow-hidden"
            style={{ height: '70svh' }}
          >
            <div className="absolute inset-0">
              <Image
                src={model.image}
                alt={model.alt}
                fill
                className="object-cover"
                style={{ objectPosition: 'top center' }}
                sizes="100vw"
                priority={index === 0}
                unoptimized={process.env.NODE_ENV === 'development'}
              />
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-56 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(28, 27, 26, 0.85), transparent)',
              }}
            />

            <div
              className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(28, 27, 26, 0.4), transparent)',
              }}
            />

            <div className="absolute top-6 right-5 z-20">
              <span
                className="text-alabaster/40"
                style={{
                  fontFamily: 'var(--font-geist)',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                }}
              >
                {model.number}
              </span>
            </div>

            <div className="absolute bottom-8 left-5 right-5 z-20">
              <h2
                className="text-alabaster leading-none"
                style={{
                  fontFamily: 'var(--font-instrument)',
                  fontWeight: 400,
                  fontSize: 'clamp(2.8rem, 12vw, 4.5rem)',
                }}
              >
                {model.name}
              </h2>
              <div className="mt-3">
                <span
                  className="text-alabaster/50"
                  style={{
                    fontFamily: 'var(--font-geist)',
                    fontSize: '9px',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  VIEW BOOK &rarr;
                </span>
              </div>
            </div>

            {index < models.length - 1 && (
              <div
                className="absolute bottom-0 left-5 right-5 h-px z-20"
                style={{ backgroundColor: 'rgba(249, 248, 244, 0.1)' }}
              />
            )}

            <div className="absolute inset-0 bg-alabaster/0 active:bg-alabaster/5 transition-colors duration-300 z-15 pointer-events-none" />
          </Link>
        ))}
      </div>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 top-0 left-0 hidden md:block will-change-transform"
        style={{
          opacity: hoveredModel && canHover ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="flex items-center justify-center rounded-full backdrop-blur-md border border-alabaster/20"
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'rgba(249, 248, 244, 0.1)',
          }}
        >
          <span
            className="text-alabaster uppercase text-center leading-tight"
            style={{
              fontFamily: 'var(--font-geist)',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.2em',
            }}
          >
            VIEW<br />BOOK
          </span>
        </div>
      </div>
    </main>
  );
}
