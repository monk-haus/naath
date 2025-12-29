'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PrivateViewingRoom() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  useEffect(() => {
    if (!canHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [canHover]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const progress = scrollLeft / (scrollWidth - clientWidth);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const models = [
    {
      id: 'fatima',
      name: 'Fatima F.',
      image: '/assets/images/model-1.webp',
      alt: 'Fatima F Portfolio',
      specs: '179cm / 5\'10.5"',
      href: '/models/fatima',
    },
    {
      id: 'anok',
      name: 'Anok Y.',
      image: '/assets/images/model-2.webp',
      alt: 'Anok Y Portfolio',
      specs: '176cm / 5\'9.5"',
      href: '/models/anok',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-bone py-24 md:py-40 border-t border-clay/10 overflow-x-hidden w-full"
      style={{
        cursor: isHoveringImage && canHover ? 'none' : 'default',
      }}
    >
      <div className="px-6 md:px-20 mb-12 md:mb-20 flex items-end justify-between">
        <h3
          className="text-charcoal text-5xl md:text-7xl leading-none"
          style={{ fontFamily: 'var(--font-editorial)', fontWeight: 200 }}
        >
          The Roster
        </h3>
        <span
          className="text-stone text-[10px] uppercase tracking-widest font-medium mb-2 hidden md:block"
          style={{ fontFamily: 'var(--font-montreal)' }}
        >
          Currently Representing (02)
        </span>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 md:gap-16 overflow-x-auto px-6 md:px-20 pb-20 scrollbar-hide snap-x snap-mandatory w-full"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {models.map((model) => (
          <div
            key={model.id}
            className="relative min-w-[85vw] md:min-w-[48vw] xl:min-w-[35vw] snap-center group"
          >
            <Link href={model.href} className="block w-full h-full">
              <div
                className="relative aspect-[3/4] w-full overflow-hidden bg-stone/10"
                onMouseEnter={() => {
                  if (canHover) {
                    setHoveredCard(model.id);
                    setIsHoveringImage(true);
                  }
                }}
                onMouseLeave={() => {
                  if (canHover) {
                    setHoveredCard(null);
                    setIsHoveringImage(false);
                  }
                }}
              >
                <Image
                  src={model.image}
                  alt={model.alt}
                  fill
                  className="object-cover will-change-transform"
                  style={{
                    transform: hoveredCard === model.id ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 48vw, 35vw"
                  quality={90}
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
                
                <div className="absolute inset-0 bg-charcoal/0 active:bg-charcoal/10 transition-colors duration-300 md:hidden" />
              </div>

              <div className="mt-6 flex justify-between items-baseline border-b border-clay/40 pb-4">
                <div className="flex flex-col">
                  <span
                    className="text-3xl md:text-5xl text-charcoal italic"
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontWeight: 400,
                    }}
                  >
                    {model.name}
                  </span>
                  <span
                    className="text-[10px] text-stone mt-2"
                    style={{
                      fontFamily: 'var(--font-montreal)',
                      fontWeight: 400,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {model.specs}
                  </span>
                </div>
                
                <span className="md:hidden text-[9px] uppercase tracking-widest border border-charcoal/20 px-3 py-1 rounded-full text-charcoal">
                  View
                </span>
              </div>
            </Link>
          </div>
        ))}

        <div className="relative min-w-[85vw] md:min-w-[48vw] xl:min-w-[35vw] snap-center flex flex-col justify-center items-center aspect-[3/4] p-6 md:p-10 text-center group">
          <div
            className="w-full h-full flex flex-col justify-center items-center border border-clay/20 transition-colors duration-500 group-hover:bg-alabaster"
            style={{
              background: 'linear-gradient(135deg, rgba(249, 248, 244, 0.5) 0%, rgba(236, 234, 228, 0.3) 100%)',
            }}
          >
            <h4
              className="text-charcoal mb-6 md:mb-8 leading-tight"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontWeight: 200,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              }}
            >
              You could be
              <br />
              <span className="italic text-stone">next.</span>
            </h4>
            <p
              className="text-stone max-w-[220px] mb-8 md:mb-10 leading-relaxed"
              style={{
                fontFamily: 'var(--font-montreal)',
                fontSize: '0.75rem',
                fontWeight: 400,
              }}
            >
              We are always looking for unique faces to join the vanguard.
            </p>
            <Link href="/apply">
              <button
                className="px-8 py-3 md:px-10 md:py-4 border border-charcoal text-charcoal hover:bg-charcoal hover:text-alabaster transition-all duration-300 uppercase tracking-[0.25em] cursor-pointer"
                style={{
                  fontFamily: 'var(--font-montreal)',
                  fontSize: '10px',
                  fontWeight: 500,
                }}
              >
                Apply Now
              </button>
            </Link>
          </div>
        </div>

        <div className="min-w-[1px] w-[1px]" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-clay/20">
        <div
          className="h-full bg-clay transition-all duration-150 ease-out will-change-[width]"
          style={{
            width: `${scrollProgress * 100}%`,
          }}
        />
      </div>

      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 top-0 left-0 hidden md:block will-change-transform"
        style={{
          opacity: isHoveringImage && canHover ? 1 : 0,
          transition: 'opacity 0.2s ease-out',
        }}
      >
        <div
          className="flex items-center justify-center rounded-full bg-alabaster/90 backdrop-blur-sm border border-charcoal/10 shadow-xl"
          style={{
            width: '100px',
            height: '100px',
            transform: hoveredCard ? 'scale(1)' : 'scale(0.8)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          <span
            className="text-charcoal uppercase text-center leading-none"
            style={{
              fontFamily: 'var(--font-montreal)',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.15em',
            }}
          >
            VIEW<br/>BOOK
          </span>
        </div>
      </div>
    </section>
  );
}