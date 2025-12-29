'use client';

import { useState } from 'react';

export default function JournalPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      alert('Thank you. You have been added to the waitlist for Volume 01.');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-alabaster w-full flex flex-col relative overflow-hidden selection:bg-clay selection:text-alabaster">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #A6A29A 1px, transparent 1px),
            linear-gradient(to bottom, #A6A29A 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.05,
        }}
      />

      <div className="pt-32 md:pt-40 px-6 md:px-12 pb-6 flex justify-between items-end border-b border-clay/10 mx-6 md:mx-12 relative z-10">
        <span
          className="text-charcoal uppercase"
          style={{
            fontFamily: 'var(--font-montreal)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.2em',
          }}
        >
          JOURNAL
        </span>
        <span
          className="text-stone uppercase"
          style={{
            fontFamily: 'var(--font-montreal)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.2em',
          }}
        >
          VOLUME 01
        </span>
      </div>

      <section className="flex-grow flex flex-col items-center justify-center px-6 py-20 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          <h1
            className="text-charcoal leading-[1.1] animate-fade-in"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 200,
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              letterSpacing: '-0.02em',
            }}
          >
            The Archive is<br />Opening Soon.
          </h1>

          <p
            className="text-stone max-w-md mx-auto leading-relaxed animate-fade-in"
            style={{
              fontFamily: 'var(--font-montreal)',
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              fontWeight: 400,
              animationDelay: '0.2s',
              animationFillMode: 'forwards',
              opacity: 0,
            }}
          >
            We are currently curating the stories for our inaugural issue.
            Join the waitlist to receive Volume 01 upon release.
          </p>

          <form 
            onSubmit={handleEmailSubmit} 
            className="pt-8 w-full max-w-md mx-auto animate-fade-in"
            style={{
              animationDelay: '0.4s',
              animationFillMode: 'forwards',
              opacity: 0,
            }}
          >
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL"
                className="w-full bg-transparent border-b border-clay/40 py-4 text-center text-charcoal focus:outline-none focus:border-charcoal transition-all duration-500 placeholder:text-stone/30 placeholder:uppercase rounded-none appearance-none"
                style={{
                  fontFamily: 'var(--font-montreal)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                }}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-charcoal hover:text-clay transition-colors disabled:opacity-50 disabled:cursor-wait"
                style={{ fontFamily: 'var(--font-montreal)' }}
              >
                {isSubmitting ? 'PROCESSING...' : 'NOTIFY ME'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="pb-12 text-center relative z-10">
        <span 
          className="text-clay/40 uppercase tracking-[0.2em] text-[9px]"
          style={{ fontFamily: 'var(--font-montreal)' }}
        >
          Naath Model Management
        </span>
      </div>
    </main>
  );
}