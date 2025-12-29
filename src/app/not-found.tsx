'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main 
      ref={containerRef}
      className="relative min-h-screen w-full bg-charcoal overflow-hidden flex flex-col items-center justify-center cursor-none"
    >
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(249, 248, 244, 0.15), transparent 40%)`
        }}
      />

      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 animate-float">
        <div className="relative w-64 h-80 bg-alabaster p-4 shadow-2xl rotate-[-6deg] transition-transform duration-500 hover:rotate-0 hover:scale-105">
          <div className="relative w-full h-[75%] bg-stone/20 overflow-hidden mb-4">
             <Image 
               src="https://images.unsplash.com/photo-1496345657802-9988229f3750?q=80&w=1000&auto=format&fit=crop"
               alt="Missing Content"
               fill
               className="object-cover opacity-50 grayscale blur-sm"
             />
             <div className="absolute bottom-2 right-2 text-[10px] text-red-900 font-mono tracking-widest opacity-60">
               ERR_404
             </div>
          </div>
          
          <div 
             className="text-center text-charcoal/60"
             style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: '1.25rem' }}
          >
             Untitled No. 404
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 text-center space-y-6">
        <h1 
          className="text-alabaster leading-none"
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 200,
            fontSize: 'clamp(3rem, 5vw, 5rem)',
          }}
        >
          A misplacement.
        </h1>
        <p 
          className="text-stone font-montreal text-sm tracking-wide max-w-md mx-auto"
        >
          The artifact you are looking for has not been developed yet.
        </p>

        <div className="pt-8">
           <Link 
             href="/"
             className="text-alabaster border-b border-alabaster/30 pb-1 hover:border-alabaster transition-all uppercase text-[10px] tracking-[0.25em]"
             style={{ fontFamily: 'var(--font-montreal)' }}
           >
             Return to Studio
           </Link>
        </div>
      </div>

      <div
        className="fixed pointer-events-none z-50 top-0 left-0 mix-blend-difference"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div className="w-4 h-4 bg-alabaster rounded-full"></div>
      </div>

    </main>
  );
}