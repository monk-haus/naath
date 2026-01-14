'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="relative w-full bg-alabaster overflow-hidden">
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
          <span className="text-[30vw] font-editorial leading-none text-charcoal tracking-tighter">ANTI</span>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-32 md:py-0">
          <h1
            className="text-charcoal mb-8 italic leading-[0.85] animate-fade-in"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 400,
              fontSize: 'clamp(3.5rem, 12vw, 11rem)',
              letterSpacing: '-0.04em',
            }}
          >
            ANTI-FACTORY.
          </h1>

          <div className="flex flex-col items-center gap-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="h-12 md:h-20 w-[1px] bg-clay"></div>
            <p
              className="text-stone uppercase tracking-widest max-w-xs md:max-w-md"
              style={{
                fontFamily: 'var(--font-montreal)',
                fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
                fontWeight: 500,
                lineHeight: '1.6',
                letterSpacing: '0.15em',
              }}
            >
              The industry is crowded. <br />We are the quiet room.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-20 w-full bg-alabaster border-t border-clay/20">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <div className="grid md:grid-cols-2 gap-12 md:gap-32 items-center">
            <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden bg-stone/10 group order-2 md:order-1">
              <div className="absolute inset-4 border border-alabaster/30 z-20 pointer-events-none transition-all duration-700 group-hover:inset-6"></div>

              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-transform duration-[20s] ease-linear group-hover:scale-110"
              >
                <source src="/assets/videos/about-hands.mp4" type="video/mp4" />
              </video>

              <div
                className="absolute inset-0 bg-cover bg-center grayscale mix-blend-multiply opacity-50"
                style={{ backgroundImage: 'url(/assets/images/upscalemedia-transformed_3.webp)' }}
              />

              <div className="absolute bottom-8 left-8 z-20 bg-alabaster/90 px-4 py-1.5 backdrop-blur-sm">
                <span className="text-[10px] uppercase tracking-[0.2em] font-montreal text-charcoal font-medium">Est. 2025</span>
              </div>
            </div>

            <div className="flex flex-col justify-center order-1 md:order-2">
              <span className="text-clay text-xs font-montreal uppercase tracking-[0.25em] mb-8 block">01 — The Philosophy</span>
              <h2
                className="text-charcoal mb-12 leading-[1.1]"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontWeight: 200,
                  fontSize: 'clamp(2.5rem, 4vw, 4.5rem)',
                }}
              >
                We do not just book jobs; <span className="italic">we build legacies.</span>
              </h2>

              <div className="space-y-8 text-charcoal/80 max-w-lg">
                <p className="font-montreal text-sm md:text-base leading-relaxed text-justify text-stone">
                  In an era of mass recruitment, Naath returns to the art of personal management.
                  We believe a model&apos;s career is not found; it is constructed.
                </p>
                <p className="font-montreal text-sm md:text-base leading-relaxed text-justify text-stone">
                  We are a boutique agency by design, limiting our board to ensure that every face
                  we represent receives our undivided obsession.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="relative z-30 w-full bg-alabaster border-t border-clay/20">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="md:col-span-5 relative order-2 md:order-1">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-charcoal grayscale">
                <Image
                  src="/assets/images/director.webp"
                  alt="Director Portrait"
                  fill
                  className="object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
                />
              </div>
              <div className="mt-6 flex justify-between items-end border-b border-clay/30 pb-2">
                <span className="font-editorial italic text-xl md:text-2xl text-charcoal">The Director</span>
              </div>
            </div>

            <div className="md:col-span-7 md:pl-8 pt-0 md:pt-12 order-1 md:order-2">
              <span className="text-clay text-xs font-montreal uppercase tracking-[0.25em] mb-10 block">02 — The Eye</span>

              <div className="space-y-10 font-montreal text-lg md:text-xl leading-[1.6] text-charcoal font-light">
                <p>
                  &quot;When I founded Naath, I was driven by a singular vision. The industry had become a factory,
                  churning through faces without regard for the individual artistry each model brings.&quot;
                </p>
                <p>
                  &quot;At Naath, we operate differently. Every model in our roster is not just a booking;
                  they are a collaboration. We work hand-in-hand to develop their unique aesthetic,
                  refine their craft, and strategically position them in markets that will honor their
                  distinct beauty.&quot;
                </p>
                <p className="text-charcoal font-medium">
                  &quot;In a world of noise, we choose to be the quiet room where excellence is crafted,
                  not manufactured.&quot;
                </p>
              </div>

              <div className="mt-20 w-24 h-[1px] bg-charcoal"></div>
            </div>

          </div>
        </div>
      </section>

      <section className="relative z-40 w-full bg-alabaster border-t border-clay/20">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <div className="text-center mb-24">
            <span className="text-clay text-xs font-montreal uppercase tracking-[0.25em] mb-6 block">03 — The Method</span>
            <h2
              className="text-charcoal"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontWeight: 200,
                fontSize: 'clamp(3rem, 6vw, 5rem)',
              }}
            >
              The Process
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-clay/30 md:-translate-x-1/2 h-full z-0"></div>

            <div className="space-y-24 md:space-y-32 relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center w-full group">
                <div className="w-full md:w-1/2 md:pr-16 md:text-right order-2 md:order-1 pl-12 md:pl-0">
                  <h3 className="font-editorial text-3xl md:text-4xl mb-4 text-charcoal group-hover:text-stone transition-colors">Discovery</h3>
                  <p className="font-montreal text-stone text-sm leading-relaxed max-w-sm ml-auto">Finding the unique. We scout for faces that tell stories, not just fill frames. We look for the anomaly.</p>
                </div>

                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-[11px] h-[11px] bg-alabaster border border-charcoal rounded-full z-20 order-1 md:order-2 transition-transform duration-500 group-hover:scale-150 group-hover:bg-charcoal"></div>

                <div className="w-full md:w-1/2 md:pl-16 order-3 md:order-3 pt-2 md:pt-0 pl-12">
                  <span className="font-montreal text-[10px] uppercase tracking-widest text-clay font-medium">01</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center w-full group">
                <div className="w-full md:w-1/2 md:pr-16 md:text-right order-2 md:order-1 pl-12 md:pl-0 pt-2 md:pt-0">
                  <span className="font-montreal text-[10px] uppercase tracking-widest text-clay font-medium">02</span>
                </div>

                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-[11px] h-[11px] bg-alabaster border border-charcoal rounded-full z-20 order-1 md:order-2 transition-transform duration-500 group-hover:scale-150 group-hover:bg-charcoal"></div>

                <div className="w-full md:w-1/2 md:pl-16 order-3 md:order-3 pl-12 md:pl-0">
                  <h3 className="font-editorial text-3xl md:text-4xl mb-4 text-charcoal group-hover:text-stone transition-colors">Development</h3>
                  <p className="font-montreal text-stone text-sm leading-relaxed max-w-sm mr-auto">Polishing the diamond. Walking, posing, portfolio curation. We build the foundation before the launch.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center w-full group">
                <div className="w-full md:w-1/2 md:pr-16 md:text-right order-2 md:order-1 pl-12 md:pl-0">
                  <h3 className="font-editorial text-3xl md:text-4xl mb-4 text-charcoal group-hover:text-stone transition-colors">Placement</h3>
                  <p className="font-montreal text-stone text-sm leading-relaxed max-w-sm ml-auto">Strategic introduction to the world&apos;s top markets. New York. Paris. Milan. We place our models where they will be seen.</p>
                </div>

                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-[11px] h-[11px] bg-alabaster border border-charcoal rounded-full z-20 order-1 md:order-2 transition-transform duration-500 group-hover:scale-150 group-hover:bg-charcoal"></div>

                <div className="w-full md:w-1/2 md:pl-16 order-3 md:order-3 pt-2 md:pt-0 pl-12">
                  <span className="font-montreal text-[10px] uppercase tracking-widest text-clay font-medium">03</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="relative z-50 w-full flex flex-col items-center justify-center bg-bone border-t border-clay/20 py-40 px-6">
        <div className="text-center space-y-16">
          <h3 className="font-editorial text-4xl md:text-6xl text-charcoal max-w-2xl mx-auto leading-tight">
            We are currently scouting.
          </h3>

          <div className="relative flex items-center justify-center">
            <div
              className="w-40 h-40 md:w-48 md:h-48 rounded-full border border-charcoal/30 flex items-center justify-center will-change-transform"
              style={{ animation: 'rotate 20s linear infinite' }}
            >
              <div className="text-center">
                <p className="font-montreal text-[9px] md:text-[10px] uppercase tracking-[0.2em] leading-relaxed text-charcoal">
                  NAATH<br />SCOUTING<br />DIVISION<br /><span className="text-stone">Est 2025</span>
                </p>
              </div>
            </div>
            <div className="absolute w-2 h-2 bg-charcoal rounded-full"></div>
          </div>

          <div className="pt-4">
            <Link
              href="/apply"
              className="inline-block border border-charcoal px-12 py-4 font-montreal text-xs uppercase tracking-[0.2em] hover:bg-charcoal hover:text-alabaster transition-all duration-300"
            >
              Submit Application
            </Link>
          </div>
        </div>

      </section>

    </main>
  );
}