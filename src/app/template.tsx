'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pathname = usePathname();

  // We disable animations completely on /models to prevent 'position: fixed' breaking
  // due to stacking contexts created by opacity/transform.
  const isModelsPage = pathname?.startsWith('/models');

  useEffect(() => {
    // Reset visibility on path change
    setIsVisible(false);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    // Small delay to trigger the enter animation
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
      className="relative w-full"
      style={{
        // FIX: Removed translateY. Using ONLY opacity prevents scrollbar jumping/geometry changes.
        // On models page, we force opacity: 1 and transition: none immediately to allow fixed positioning.
        opacity: (prefersReducedMotion || isModelsPage) ? 1 : (isVisible ? 1 : 0),

        transition: (prefersReducedMotion || isModelsPage)
          ? 'none'
          : 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',

        willChange: (prefersReducedMotion || isModelsPage) ? 'auto' : 'opacity',
      }}
    >
      {children}
    </div>
  );
}