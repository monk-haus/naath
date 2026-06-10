'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMountEffect } from '@/hooks/useMountEffect';

type Gender = 'women' | 'men';

const allModels = [
  {
    id: 'fatima',
    fullName: 'Fatima F.',
    slug: 'fatima',
    gender: 'women' as Gender,
    image: '/assets/images/models/fatima-fawaz/fatima-5.webp',
    alt: 'Fatima F',
    height: '179cm',
    number: '01',
  },
  {
    id: 'nyanhial',
    fullName: 'Nyanhial K.',
    slug: 'nyanhial-k',
    gender: 'women' as Gender,
    image: '/assets/images/model-2.webp',
    alt: 'Nyanhial K',
    height: '180cm',
    number: '02',
  },
  {
    id: 'nthabiseng',
    fullName: 'Nthabiseng F.',
    slug: 'nthabiseng',
    gender: 'women' as Gender,
    image: '/assets/images/models/nthasibeng/IMG_0902.webp',
    alt: 'Nthabiseng F',
    height: '172cm',
    number: '03',
  },
  {
    id: 'olashay',
    fullName: "Ola'shay O.",
    slug: 'olashay-o',
    gender: 'men' as Gender,
    image: '/assets/images/models/olashay/b3af05c0-2add-4f69-a619-7eaf6f1aa35b.webp',
    alt: "Ola'shay O",
    height: '180cm',
    number: '01',
  },
];

const mono: React.CSSProperties = {
  fontFamily: 'var(--font-geist)',
  fontWeight: 400,
  letterSpacing: '0.18em',
};

const serif = (size: string): React.CSSProperties => ({
  fontFamily: 'var(--font-instrument)',
  fontWeight: 400,
  fontStyle: 'italic',
  fontSize: size,
  lineHeight: 1,
});

export default function ModelsPage() {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [boardFading, setBoardFading] = useState(false);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const [hoveredGender, setHoveredGender] = useState<Gender | null>(null);
  const [mounted, setMounted] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useMountEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    requestAnimationFrame(() => setMounted(true));
  });

  const enterBoard = (g: Gender) => setSelectedGender(g);

  const switchGender = (g: Gender) => {
    if (g === selectedGender) return;
    setBoardFading(true);
    setHoveredModel(null);
    setTimeout(() => {
      setSelectedGender(g);
      setBoardFading(false);
    }, 300);
  };

  const filteredModels = selectedGender
    ? allModels.filter(m => m.gender === selectedGender)
    : [];

  const selectionVisible = selectedGender === null;
  const boardVisible = selectedGender !== null;

  return (
    <main
      className="w-full bg-charcoal overflow-hidden relative"
      style={{ height: '100dvh' }}
    >

      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{
          opacity: selectionVisible ? 1 : 0,
          pointerEvents: selectionVisible ? 'auto' : 'none',
          transition: 'opacity 0.55s ease',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 flex justify-center pt-10"
          style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 0.1s' }}
        >
          <span style={{ ...mono, fontSize: '10px', color: 'rgba(249,248,244,0.2)' }}>
            CASTING
          </span>
        </div>

        <div className="flex items-stretch">
          {(['women', 'men'] as Gender[]).map((g, i) => {
            const count = allModels.filter(m => m.gender === g).length;
            const isHovered = hoveredGender === g;
            const isOther = hoveredGender !== null && !isHovered;

            return (
              <div key={g} className="flex items-stretch">
                {i === 1 && (
                  <div
                    className="self-stretch w-px mx-8 md:mx-14"
                    style={{
                      background: 'linear-gradient(to bottom, transparent, rgba(249,248,244,0.12), transparent)',
                      opacity: mounted ? 1 : 0,
                      transition: 'opacity 1s ease 0.4s',
                    }}
                  />
                )}

                <button
                  className="flex flex-col items-start gap-3 py-2"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredGender(g)}
                  onMouseLeave={() => setHoveredGender(null)}
                  onClick={() => enterBoard(g)}
                >
                  <h2
                    className="text-alabaster"
                    style={{
                      ...serif('clamp(2.8rem, 10vw, 6.5rem)'),
                      opacity: mounted ? (isOther ? 0.18 : 1) : 0,
                      transform: mounted ? 'translateY(0)' : 'translateY(14px)',
                      transition: `opacity 0.65s ease ${0.2 + i * 0.12}s, transform 0.75s ease ${0.2 + i * 0.12}s`,
                    }}
                  >
                    {g === 'women' ? 'Women' : 'Men'}
                  </h2>

                  <div
                    className="flex items-center gap-2"
                    style={{
                      opacity: mounted ? (isOther ? 0.06 : isHovered ? 0.65 : 0.28) : 0,
                      transition: `opacity 0.45s ease ${0.32 + i * 0.12}s`,
                    }}
                  >
                    <span style={{ ...mono, fontSize: '10px', color: 'rgba(249,248,244,1)' }}>
                      {count} {count === 1 ? 'MODEL' : 'MODELS'}
                    </span>
                    <span
                      style={{
                        ...mono,
                        fontSize: '11px',
                        color: 'rgba(249,248,244,1)',
                        display: 'inline-block',
                        transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      →
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="absolute inset-0 hidden md:flex"
        style={{
          opacity: boardVisible ? (boardFading ? 0 : 1) : 0,
          pointerEvents: boardVisible && !boardFading ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        <div
          className="relative flex flex-col h-full"
          style={{
            width: canHover ? '58%' : '100%',
            borderRight: canHover ? '1px solid rgba(249,248,244,0.06)' : 'none',
            transition: 'width 0s',
          }}
        >
          <div className="flex items-center justify-between px-14 pb-6" style={{ paddingTop: '10.5rem' }}>
            <span style={{ ...mono, fontSize: '10px', color: 'rgba(249,248,244,0.22)' }}>
              Naath — {selectedGender === 'women' ? 'Women' : 'Men'}
            </span>
            <div className="flex items-center gap-5">
              {(['women', 'men'] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => switchGender(g)}
                  style={{
                    ...mono,
                    fontSize: '10px',
                    color: selectedGender === g ? 'rgba(249,248,244,0.85)' : 'rgba(249,248,244,0.2)',
                    background: 'none',
                    border: 'none',
                    borderBottom: selectedGender === g ? '1px solid rgba(249,248,244,0.35)' : '1px solid transparent',
                    paddingBottom: '2px',
                    cursor: selectedGender === g ? 'default' : 'pointer',
                    textTransform: 'uppercase',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-14" style={{ height: '1px', backgroundColor: 'rgba(249,248,244,0.06)' }} />

          <div className="flex flex-col flex-1 justify-center px-14 py-4">
            {filteredModels.map((model, index) => (
              <Link
                key={model.id}
                href={`/models/${model.slug}`}
                className="relative flex items-center gap-5"
                style={{
                  borderBottom: index < filteredModels.length - 1
                    ? '1px solid rgba(249,248,244,0.06)'
                    : 'none',
                  paddingTop: canHover ? '2rem' : '1.25rem',
                  paddingBottom: canHover ? '2rem' : '1.25rem',
                }}
                onMouseEnter={() => canHover && setHoveredModel(model.id)}
                onMouseLeave={() => canHover && setHoveredModel(null)}
              >
                {canHover && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      inset: '0 -3.5rem',
                      backgroundColor: 'rgba(249,248,244,0.025)',
                      opacity: hoveredModel === model.id ? 1 : 0,
                      transition: 'opacity 0.25s ease',
                    }}
                  />
                )}

                <span
                  style={{
                    ...mono,
                    fontSize: '11px',
                    color: canHover
                      ? hoveredModel === model.id ? 'rgba(249,248,244,0.4)' : 'rgba(249,248,244,0.15)'
                      : 'rgba(249,248,244,0.18)',
                    width: '28px',
                    flexShrink: 0,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {model.number}
                </span>

                <h2
                  className="flex-1"
                  style={{
                    ...serif(canHover ? 'clamp(2rem, 3.6vw, 3rem)' : 'clamp(1.8rem, 3vw, 2.6rem)'),
                    color: canHover
                      ? hoveredModel === model.id
                        ? 'rgba(249,248,244,1)'
                        : hoveredModel
                          ? 'rgba(249,248,244,0.28)'
                          : 'rgba(249,248,244,0.82)'
                      : 'rgba(249,248,244,0.85)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {model.fullName}
                </h2>

                <span
                  style={{
                    ...mono,
                    fontSize: '11px',
                    color: canHover
                      ? hoveredModel === model.id ? 'rgba(249,248,244,0.45)' : 'rgba(249,248,244,0.18)'
                      : 'rgba(249,248,244,0.22)',
                    flexShrink: 0,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {model.height}
                </span>

                {!canHover && (
                  <div className="relative shrink-0" style={{ width: '64px', height: '88px' }}>
                    <Image
                      src={model.image}
                      alt={model.alt}
                      fill
                      className="object-cover"
                      style={{ objectPosition: 'top center' }}
                      sizes="64px"
                      unoptimized={process.env.NODE_ENV === 'development'}
                    />
                  </div>
                )}

                {canHover && (
                  <span
                    style={{
                      fontSize: '13px',
                      color: 'rgba(249,248,244,0.5)',
                      flexShrink: 0,
                      opacity: hoveredModel === model.id ? 1 : 0,
                      transform: hoveredModel === model.id ? 'translateX(0)' : 'translateX(-6px)',
                      transition: 'opacity 0.25s ease, transform 0.25s ease',
                    }}
                  >
                    →
                  </span>
                )}

                {!canHover && (
                  <span style={{ fontSize: '13px', color: 'rgba(249,248,244,0.2)', flexShrink: 0, marginLeft: '0.5rem' }}>
                    →
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="px-14 pb-8">
            <div className="mb-4" style={{ height: '1px', backgroundColor: 'rgba(249,248,244,0.06)' }} />
            <div className="flex items-center justify-between">
              <span style={{ ...mono, fontSize: '9px', color: 'rgba(249,248,244,0.14)' }}>
                {filteredModels.length} {filteredModels.length === 1 ? 'Model' : 'Models'}
              </span>
              <button
                onClick={() => setSelectedGender(null)}
                style={{ ...mono, fontSize: '9px', color: 'rgba(249,248,244,0.2)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ← Back
              </button>
            </div>
          </div>
        </div>

        {canHover && (
          <div className="relative flex-1 h-full" style={{ backgroundColor: '#161514' }}>
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ opacity: hoveredModel ? 0 : 1, transition: 'opacity 0.5s ease' }}
            >
              <span style={{ ...mono, fontSize: '9px', color: 'rgba(249,248,244,0.06)' }}>
                HOVER TO REVEAL
              </span>
            </div>

            {filteredModels.map((model) => (
              <div
                key={model.id}
                className="absolute inset-0"
                style={{ opacity: hoveredModel === model.id ? 1 : 0, transition: 'opacity 0.6s ease' }}
              >
                <Image
                  src={model.image}
                  alt={model.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'top center' }}
                  sizes="42vw"
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-8 pb-7"
                  style={{ background: 'linear-gradient(to top, rgba(22,21,20,0.88) 0%, transparent 100%)', paddingTop: '5rem' }}
                >
                  <span style={{ ...mono, fontSize: '10px', color: 'rgba(249,248,244,0.55)', textTransform: 'uppercase' }}>
                    {model.fullName}
                  </span>
                  <span style={{ ...mono, fontSize: '10px', color: 'rgba(249,248,244,0.3)' }}>
                    {model.height}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className="absolute inset-0 flex flex-col md:hidden"
        style={{
          opacity: boardVisible ? (boardFading ? 0 : 1) : 0,
          pointerEvents: boardVisible && !boardFading ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      >
        <div className="flex-1 overflow-y-auto" style={{ paddingTop: '8.5rem' }}>
          <div style={{ height: '1px', backgroundColor: 'rgba(249,248,244,0.07)', margin: '0 1.5rem 0' }} />

          {filteredModels.map((model, index) => (
            <Link
              key={model.id}
              href={`/models/${model.slug}`}
              className="flex items-center"
              style={{
                borderBottom: '1px solid rgba(249,248,244,0.07)',
                padding: '0 1.5rem 0 0',
                minHeight: '116px',
              }}
            >
              <div className="relative shrink-0" style={{ width: '84px', height: '116px' }}>
                <Image
                  src={model.image}
                  alt={model.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'top center' }}
                  sizes="84px"
                  priority={index === 0}
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
              </div>

              <div className="flex flex-col flex-1 gap-1.5 pl-5">
                <span style={{ ...mono, fontSize: '9px', color: 'rgba(249,248,244,0.2)' }}>
                  {model.number}
                </span>
                <h2 style={{ ...serif('clamp(1.55rem, 6vw, 2rem)'), color: 'rgba(249,248,244,0.9)' }}>
                  {model.fullName}
                </h2>
                <span style={{ ...mono, fontSize: '10px', color: 'rgba(249,248,244,0.3)' }}>
                  {model.height}
                </span>
              </div>

              <span style={{ fontSize: '14px', color: 'rgba(249,248,244,0.18)', flexShrink: 0 }}>→</span>
            </Link>
          ))}
        </div>

        <div
          className="shrink-0 flex items-center justify-between"
          style={{
            padding: '0.9rem 1.5rem',
            borderTop: '1px solid rgba(249,248,244,0.07)',
            backgroundColor: 'rgba(28,27,26,0.97)',
          }}
        >
          <button
            onClick={() => setSelectedGender(null)}
            style={{ ...mono, fontSize: '9px', color: 'rgba(249,248,244,0.25)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← Back
          </button>

          <div className="flex items-center gap-5">
            {(['women', 'men'] as Gender[]).map((g) => (
              <button
                key={g}
                onClick={() => switchGender(g)}
                style={{
                  ...mono,
                  fontSize: '10px',
                  color: selectedGender === g ? 'rgba(249,248,244,0.9)' : 'rgba(249,248,244,0.22)',
                  background: 'none',
                  border: 'none',
                  borderBottom: selectedGender === g ? '1px solid rgba(249,248,244,0.4)' : '1px solid transparent',
                  paddingBottom: '2px',
                  cursor: selectedGender === g ? 'default' : 'pointer',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
