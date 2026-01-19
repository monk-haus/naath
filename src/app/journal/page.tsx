export default function JournalPage() {
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
          </p>
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