'use client';

export default function Footer() {
  return (
    <footer className="relative bg-charcoal text-alabaster pt-24 pb-10 px-6 md:px-12 overflow-hidden w-full">
      <div className="hidden md:block absolute bottom-[-2%] left-[-2%] pointer-events-none select-none z-0">
        <h2
          className="leading-[0.8] text-alabaster mix-blend-overlay opacity-10"
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 200,
            fontSize: 'clamp(15rem, 25vw, 30rem)',
            letterSpacing: '-0.04em',
          }}
        >
          NAATH
        </h2>
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto w-full">
        <div className="md:hidden mb-16 w-full border-b border-white/10 pb-8">
            <h2
                className="text-center leading-none text-alabaster"
                style={{
                    fontFamily: 'var(--font-editorial)',
                    fontWeight: 200,
                    fontSize: 'clamp(4rem, 18vw, 8rem)',
                }}
            >
                NAATH
            </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-0">
          <div className="hidden md:block flex-1 h-20"></div>

          <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-10 md:gap-8 text-center md:text-right">
            <div className="flex flex-col items-center md:items-end group">
              <span 
                className="text-[10px] uppercase tracking-widest text-stone mb-4 md:mb-2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 font-montreal"
              >
                Inquiries
              </span>
              <a
                href="mailto:info@naathmodels.com"
                className="text-alabaster hover:text-clay transition-colors duration-500 italic relative"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontWeight: 400,
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: '1',
                }}
              >
                info@naathmodels.com
              </a>
            </div>

            <div className="flex gap-8 md:gap-12 items-center">
              <a
                href="#"
                className="text-alabaster/60 hover:text-alabaster transition-colors duration-300 uppercase relative group"
                style={{
                  fontFamily: 'var(--font-montreal)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                }}
              >
                INSTAGRAM
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-alabaster transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#"
                className="text-alabaster/60 hover:text-alabaster transition-colors duration-300 uppercase relative group"
                style={{
                  fontFamily: 'var(--font-montreal)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                }}
              >
                LINKEDIN
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-alabaster transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            <div
              className="text-alabaster/40 uppercase mt-4 md:mt-2"
              style={{
                fontFamily: 'var(--font-montreal)',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.25em',
              }}
            >
              LONDON — NEW YORK — PARIS
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-32 w-full flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 gap-4">
             <div className="hidden md:block"></div>
             
             <div
                className="text-stone text-center md:text-right"
                style={{
                    fontFamily: 'var(--font-montreal)',
                    fontSize: '10px',
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                    opacity: 0.5,
                }}
                >
                © 2025 Naath Model Management. All Rights Reserved.
            </div>
        </div>
      </div>
    </footer>
  );
}