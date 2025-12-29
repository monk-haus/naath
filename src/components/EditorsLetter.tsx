'use client';

import { useState, useEffect, useRef } from 'react';

export default function EditorsLetter() {
  const [isVisible, setIsVisible] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startOffset = windowHeight * 0.8;
      const endOffset = windowHeight * 0.4;
      
      const rawProgress = (startOffset - rect.top) / (startOffset - endOffset);
      const progress = Math.max(0, Math.min(1, rawProgress));
      
      setLineHeight(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headlineWords = [
    { text: 'Naath', italic: false },
    { text: 'is', italic: false },
    { text: 'not', italic: false },
    { text: 'a', italic: false },
    { text: 'catalogue;', italic: false },
    { text: 'it', italic: false },
    { text: 'is', italic: false },
    { text: 'a', italic: false },
    { text: 'curation.', italic: true },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-alabaster py-32 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-[640px] mx-auto flex flex-col items-center">
        <div className="mb-10 md:mb-16 text-center">
          <h2
            className="text-charcoal leading-[1.1] md:leading-[1.2] flex flex-wrap justify-center gap-x-[0.25em] gap-y-1"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 200,
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {headlineWords.map((word, index) => (
              <span
                key={index}
                className="overflow-hidden inline-flex"
              >
                <span
                  className={`inline-block ${word.italic ? 'italic font-normal' : ''}`}
                  style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(110%)',
                    opacity: isVisible ? 1 : 0,
                    transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s, opacity 1s ease ${index * 0.05}s`,
                    willChange: 'transform, opacity',
                  }}
                >
                  {word.text}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div className="relative w-[1px] h-20 md:h-24 mb-10 md:mb-16 bg-gray-200/50 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-clay"
            style={{
              height: `${lineHeight * 100}%`,
              transition: 'height 0.1s linear',
            }}
          />
        </div>

        <div
          ref={textRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="text-center md:text-justify max-w-[500px]"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible ? 1 : 0,
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s, opacity 1s ease-out 0.4s',
            willChange: 'transform, opacity',
          }}
        >
          <p
            className="leading-[1.7] md:leading-[1.8] transition-colors duration-500 ease-out"
            style={{
              fontFamily: 'var(--font-montreal)',
              fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
              fontWeight: 400,
              color: isHovered ? 'var(--charcoal)' : 'var(--stone)',
            }}
          >
            Born from a desire to return to the art of management, we operate as a boutique agency
            focused on developing high-fashion careers with precision and longevity. We do not
            mass-recruit. <span className="text-charcoal font-medium">We select.</span>{' '}
            <span className="text-charcoal font-medium">We nurture.</span>{' '}
            <span className="text-charcoal font-medium">We launch.</span>
          </p>
        </div>
      </div>
    </section>
  );
}