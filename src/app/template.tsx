'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(false);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 20);

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [pathname]);

  return (
    <div
      className="relative w-full min-h-screen"
      style={{
        transform: prefersReducedMotion
          ? 'none'
          : isVisible
          ? 'translateY(0)'
          : 'translateY(20px)',
        opacity: prefersReducedMotion ? 1 : isVisible ? 1 : 0,
        transition: prefersReducedMotion
          ? 'none'
          : 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}