import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Development | Naath Model Management',
  description:
    'At Naath, development is the foundation of everything we do — guidance, education, strategic placement, wellness, mentorship, and masterclasses that build sustainable international careers.',
};

const developmentIncludes = [
  'Runway coaching',
  'Posing & movement training',
  'Portfolio direction',
  'Digitals guidance',
  'Casting preparation',
  'Confidence development',
  'Industry etiquette',
];

const markets = ['Paris', 'Milan', 'London', 'New York'];

const commitments = [
  'Mental wellness advocacy',
  'Career guidance',
  'Healthy industry navigation',
  'Professional boundaries',
  'Financial literacy',
  'Long-term career planning',
];

const masterclassTopics = [
  'Understanding agencies & contracts',
  'Navigating castings',
  'International placements',
  'Mental health within modeling',
  'Personal branding',
  'Financial awareness',
  'Building longevity within the industry',
];

export default function DevelopmentPage() {
  return (
    <main className="relative w-full bg-alabaster">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #A6A29A 1px, transparent 1px),
            linear-gradient(to bottom, #A6A29A 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.05,
        }}
      />

      <section className="relative z-10 min-h-screen w-full flex items-center justify-center bg-alabaster border-b border-clay/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
          <span className="text-[26vw] font-instrument leading-none text-charcoal tracking-tighter">FORM</span>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-32 md:py-0">
          <span className="text-clay text-xs md:text-sm font-geist uppercase tracking-[0.25em] mb-8 block animate-fade-in">
            DEVELOPMENT
          </span>
          <h1
            className="text-charcoal mb-10 italic leading-[0.9] animate-fade-in"
            style={{
              fontFamily: 'var(--font-instrument)',
              fontWeight: 400,
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              letterSpacing: '-0.03em',
            }}
          >
            Building careers <br />with intention.
          </h1>

          <div
            className="flex flex-col items-center gap-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            <div className="h-12 md:h-16 w-[1px] bg-clay"></div>
          </div>
        </div>
      </section>

      <section className="relative z-20 w-full bg-alabaster border-t border-clay/20">
        <div className="w-full max-w-[480px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="relative w-full bg-stone/10 group overflow-hidden">
            <div className="absolute inset-4 border border-alabaster/30 z-10 pointer-events-none transition-all duration-700 group-hover:inset-6"></div>
            <video
              src="/assets/images/development/development-reel.mp4"
              className="w-full h-auto grayscale"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </section>

      <section className="relative z-20 w-full bg-bone border-t border-clay/20">
        <div className="w-full max-w-[900px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <div className="space-y-8 font-geist text-lg md:text-2xl leading-[1.6] text-charcoal font-light">
            <p>At Naath, development is the foundation of everything we do.</p>
            <p>
              We believe successful modeling careers are not built overnight. They are developed through guidance,
              education, preparation, and strategic positioning.
            </p>
            <p>
              Our approach focuses on creating longevity within the industry while ensuring every model is equipped
              not only professionally, but personally.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-30 w-full bg-alabaster border-t border-clay/20">
        <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <span className="text-clay text-xs font-geist uppercase tracking-[0.25em] mb-8 block">Section 1 — Model Development</span>
          <h2
            className="text-charcoal mb-12 leading-[1.1]"
            style={{ fontFamily: 'var(--font-instrument)', fontWeight: 400, fontSize: 'clamp(2.5rem, 4vw, 4.5rem)' }}
          >
            Building Strong Foundations
          </h2>

          <p className="font-geist text-base md:text-lg leading-[1.7] text-charcoal/80 font-light mb-10 max-w-2xl">
            Each model receives tailored guidance based on their individual look, strengths, and long-term potential.
          </p>

          <span className="text-clay text-xs font-geist uppercase tracking-[0.25em] mb-6 block">Development includes</span>
          <ul className="grid sm:grid-cols-2 gap-x-12">
            {developmentIncludes.map((item) => (
              <li
                key={item}
                className="font-geist text-charcoal text-base md:text-lg font-light py-3 border-b border-clay/15"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative z-30 w-full bg-alabaster border-t border-clay/20">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { src: '/assets/images/development/development-3.webp', width: 960, height: 1281 },
              { src: '/assets/images/development/development-4.webp', width: 960, height: 1281 },
              { src: '/assets/images/upscalemedia-transformed_3.webp', width: 1280, height: 1555 },
              { src: '/assets/images/development/development-6.webp', width: 960, height: 1281 },
            ].map((img) => (
              <div key={img.src} className="relative w-full overflow-hidden bg-stone/10 group">
                <Image
                  src={img.src}
                  alt="Naath development"
                  width={img.width}
                  height={img.height}
                  className="w-full h-auto grayscale transition-transform duration-[20s] ease-linear group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-30 w-full bg-bone border-t border-clay/20">
        <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <span className="text-clay text-xs font-geist uppercase tracking-[0.25em] mb-8 block">Section 2 — Strategic Placement</span>
          <h2
            className="text-charcoal mb-12 leading-[1.1]"
            style={{ fontFamily: 'var(--font-instrument)', fontWeight: 400, fontSize: 'clamp(2.5rem, 4vw, 4.5rem)' }}
          >
            Positioning Talent Globally
          </h2>

          <div className="space-y-8 font-geist text-base md:text-lg leading-[1.7] text-charcoal/80 font-light max-w-2xl">
            <p>At Naath, placement is intentional.</p>
            <p>
              We carefully position talent within markets and agencies that align with their aesthetic, goals, and
              long-term growth rather than pursuing short-term exposure.
            </p>
            <p>Our focus is building sustainable international careers across:</p>
          </div>

          <div className="mt-16 flex flex-wrap items-baseline gap-x-12 gap-y-4">
            {markets.map((city) => (
              <span
                key={city}
                className="text-charcoal italic leading-none"
                style={{ fontFamily: 'var(--font-instrument)', fontWeight: 400, fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-40 w-full bg-alabaster border-t border-clay/20">
        <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <span className="text-clay text-xs font-geist uppercase tracking-[0.25em] mb-8 block">Section 3 — Wellness &amp; Mentorship</span>
          <h2
            className="text-charcoal mb-12 leading-[1.1]"
            style={{ fontFamily: 'var(--font-instrument)', fontWeight: 400, fontSize: 'clamp(2.5rem, 4vw, 4.5rem)' }}
          >
            Beyond The Industry
          </h2>

          <div className="space-y-8 font-geist text-base md:text-lg leading-[1.7] text-charcoal/80 font-light max-w-2xl mb-10">
            <p>The fashion industry can be demanding both mentally and emotionally.</p>
            <p>
              Naath prioritises mentorship, emotional support, and honest guidance to ensure models feel supported
              throughout every stage of their careers.
            </p>
          </div>

          <span className="text-clay text-xs font-geist uppercase tracking-[0.25em] mb-6 block">We are committed to</span>
          <ul className="grid sm:grid-cols-2 gap-x-12">
            {commitments.map((item) => (
              <li
                key={item}
                className="font-geist text-charcoal text-base md:text-lg font-light py-3 border-b border-clay/15"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative z-40 w-full bg-bone border-t border-clay/20">
        <div className="w-full max-w-[900px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <span className="text-clay text-xs font-geist uppercase tracking-[0.25em] mb-8 block">Section 4 — Masterclasses</span>
          <h2
            className="text-charcoal mb-12 leading-[1.1]"
            style={{ fontFamily: 'var(--font-instrument)', fontWeight: 400, fontSize: 'clamp(2.5rem, 4vw, 4.5rem)' }}
          >
            Education &amp; Industry Access
          </h2>

          <p className="font-geist text-base md:text-lg leading-[1.7] text-charcoal/80 font-light mb-12 max-w-2xl">
            Naath Masterclasses were created to provide aspiring and working models with the information many enter the
            industry without.
          </p>

          <span className="text-clay text-xs font-geist uppercase tracking-[0.25em] mb-6 block">Topics include</span>
          <ul className="divide-y divide-clay/15 border-t border-clay/15">
            {masterclassTopics.map((item) => (
              <li key={item} className="font-geist text-charcoal text-base md:text-lg font-light py-4">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative z-50 w-full flex flex-col items-center justify-center bg-alabaster border-t border-clay/20 py-40 md:py-56 px-6">
        <h3
          className="text-charcoal text-center max-w-3xl mx-auto leading-[1.2]"
          style={{ fontFamily: 'var(--font-instrument)', fontWeight: 400, fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
        >
          Great careers are not discovered overnight.
          <br />
          <span className="italic">They are developed with intention.</span>
        </h3>

        <div className="mt-20">
          <Link
            href="/apply"
            className="inline-block border border-charcoal px-12 py-4 font-geist text-xs uppercase tracking-[0.2em] hover:bg-charcoal hover:text-alabaster transition-all duration-300"
          >
            Submit Application
          </Link>
        </div>
      </section>
    </main>
  );
}
