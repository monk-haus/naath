'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ArticlePage() {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 10);

      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollY / totalHeight) * 100;
      setReadingProgress(progress);

      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    setTimeout(() => setIsVisible(true), 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-alabaster w-full selection:bg-clay selection:text-alabaster">
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-clay/10 z-[60]">
        <div 
          className="h-full bg-charcoal transition-all duration-100 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <header 
        className={`fixed left-0 right-0 z-30 bg-alabaster/90 backdrop-blur-md border-b border-clay/10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? 'top-[70px]' : 'top-[90px] md:top-[110px]'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center h-[50px]">
          <Link
            href="/journal"
            className="group flex items-center gap-2 text-charcoal hover:text-clay transition-colors uppercase"
            style={{
              fontFamily: 'var(--font-montreal)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.2em',
            }}
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            BACK TO JOURNAL
          </Link>
          <span
            className="text-stone uppercase"
            style={{
              fontFamily: 'var(--font-montreal)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.2em',
            }}
          >
            ISSUE 01
          </span>
        </div>
      </header>

      <article className="pt-40 md:pt-56 pb-32 px-6 md:px-12 w-full">
        <div 
          className={`max-w-[800px] mx-auto transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <header className="mb-16 md:mb-24 space-y-8 text-center md:text-left">
            <div
              className="text-stone uppercase inline-block border-b border-stone/30 pb-1"
              style={{
                fontFamily: 'var(--font-montreal)',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.2em',
              }}
            >
              OCT 2025
            </div>

            <h1
              className="text-charcoal leading-[1]"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontWeight: 200,
                fontStyle: 'italic',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: '-0.02em',
              }}
            >
              The Architecture of a New Era.
            </h1>
          </header>

          <div className="relative aspect-[16/10] md:aspect-[16/9] mb-16 md:mb-24 overflow-hidden bg-stone/10 w-[100vw] ml-[calc(50%-50vw)] md:w-auto md:ml-0">
            <div ref={imageRef} className="absolute inset-0 h-[120%] w-full -top-[10%] will-change-transform">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop"
                alt="The Architecture of a New Era"
                fill
                className="object-cover grayscale"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          <div
            className="text-charcoal space-y-8 leading-[1.8] md:leading-[2]"
            style={{
              fontFamily: 'var(--font-montreal)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              fontWeight: 400,
            }}
          >
            <p className="first-letter:text-5xl first-letter:font-editorial first-letter:float-left first-letter:mr-3 first-letter:mt-[-6px]">
              In an industry saturated with agencies that treat models as inventory, Naath Model
              Management emerges as a deliberate counterpoint. We are not here to compete in the
              volume game. We are here to redefine what it means to build a career.
            </p>

            <p>
              The architecture of Naath is built on a singular principle: exclusivity through
              excellence, not exclusion. Our boutique board is intentionally small—not because we
              lack ambition, but because we believe that true representation requires undivided
              attention. Each model in our roster is not a booking; they are a collaboration.
            </p>

            <blockquote className="border-l-2 border-clay pl-6 py-2 my-12 text-xl md:text-2xl font-editorial italic text-charcoal/80">
              "We are the quiet room in a crowded industry."
            </blockquote>

            <p>
              When we say we are "anti-factory," we mean it. The traditional agency model churns
              through faces, placing them in campaigns without regard for the long-term narrative
              of their career. At Naath, we take a different approach. We work hand-in-hand with our
              models to develop their unique aesthetic, refine their craft, and strategically
              position them in markets that will honor their distinct beauty.
            </p>

            <p>
              Our focus on East African beauty is not a niche; it is a statement. We are championing
              faces that have been underrepresented on the world's most prestigious stages. We are
              building careers that will inspire the next generation of models to see themselves
              reflected in the pages of Vogue, on the runways of Paris, and in the campaigns of the
              world's most respected fashion houses.
            </p>

            <p>
              This is not just an agency. This is the architecture of a new era—one where quality
              trumps quantity, where relationships matter more than transactions, and where every
              face we represent is given the space to become a legend.
            </p>
          </div>

          <div className="mt-20 pt-12 border-t border-clay/20 flex justify-between items-center">
             <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-charcoal"></span>
                <span className="w-2 h-2 rounded-full bg-clay"></span>
             </div>
            <div
              className="text-charcoal italic opacity-60"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontWeight: 400,
                fontSize: '1.25rem',
              }}
            >
              — Naath Mgmt.
            </div>
          </div>
        </div>
      </article>

      <section className="bg-bone border-t border-clay/10 py-32 px-6 md:px-12">
         <div className="max-w-[1200px] mx-auto">
            <span 
              className="block mb-12 text-clay uppercase tracking-[0.2em] text-[10px] font-montreal font-semibold"
            >
              Up Next
            </span>
            
            <Link href="#" className="group block">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div className="order-2 md:order-1">
                    <h2 
                      className="text-4xl md:text-6xl font-editorial font-light text-charcoal italic mb-6 group-hover:text-stone transition-colors"
                    >
                      The Art of the Polaroids.
                    </h2>
                    <p className="font-montreal text-sm text-stone max-w-md leading-relaxed">
                       Why raw, unretouched digitals are becoming the new currency of high fashion casting.
                       <span className="block mt-6 uppercase text-[10px] tracking-widest text-charcoal group-hover:translate-x-2 transition-transform duration-300">Read Story →</span>
                    </p>
                 </div>
                 <div className="order-1 md:order-2 relative aspect-video overflow-hidden bg-stone/20">
                    <Image 
                       src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop"
                       alt="Next Article"
                       fill
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                 </div>
              </div>
            </Link>
         </div>
      </section>
    </main>
  );
}