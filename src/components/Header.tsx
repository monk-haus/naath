'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);

  const [isTickerOpen, setIsTickerOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const isModelDetailPage = pathname?.startsWith('/models/') && pathname !== '/models';

  const lightPages = ['/about', '/journal', '/apply'];
  const isLightPage = lightPages.some(path => pathname?.startsWith(path));

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const { error } = await supabase.functions.invoke('subscribe', {
        body: { email },
      });

      if (error) throw error;

      setStatus('success');
      setTimeout(() => setIsTickerOpen(false), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (isModelDetailPage) return null;

  const navLinks = [
    { label: 'MODELS', href: '/models' },
    { label: 'JOURNAL', href: '/journal' },
    { label: 'ABOUT', href: '/about' },
    { label: 'APPLY', href: '/apply' },
  ];

  const textColorClass = isMobileMenuOpen || isScrolled || isLightPage
    ? 'text-charcoal'
    : 'text-alabaster mix-blend-difference';

  return (
    <>
      {isTickerOpen && (
        <div className="fixed top-0 left-0 right-0 z-[60] h-10 bg-charcoal text-alabaster flex items-center justify-center transition-transform duration-500">
          <div className="flex items-center w-full max-w-[1800px] justify-between md:justify-center px-3 md:px-4">

            <span
              className="text-[9px] md:text-[10px] uppercase tracking-widest font-medium whitespace-nowrap min-w-0 overflow-hidden text-ellipsis mr-2"
              style={{ fontFamily: 'var(--font-geist)' }}
            >
              <span className="hidden md:inline">The Masterclass: Waitlist Now Open</span>
              <span className="md:hidden">The Masterclass: Waitlist:</span>
            </span>

            {status === 'success' ? (
              <span
                className="text-[9px] md:text-[10px] uppercase tracking-widest text-emerald-400 flex-1 text-right md:text-center md:flex-none pr-4 md:pr-0"
                style={{ fontFamily: 'var(--font-geist)' }}
              >
                You&apos;re on the list.
              </span>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                <input
                  type="email"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  className="bg-transparent border-b border-white/20 py-1 w-[110px] md:w-[200px] text-[10px] placeholder:text-white/40 focus:outline-none focus:border-white transition-colors uppercase font-geist text-alabaster"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="text-[9px] md:text-[10px] uppercase tracking-widest hover:text-white/70 transition-colors disabled:opacity-50 whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-geist)' }}
                >
                  {status === 'loading' ? '...' : 'JOIN'}
                </button>
              </form>
            )}

            <button
              onClick={() => setIsTickerOpen(false)}
              className="ml-3 md:absolute md:right-10 text-[9px] uppercase hover:text-white/70 transition-colors flex-shrink-0 px-1"
              aria-label="Close Ticker"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <header
        role="banner"
        className={`fixed left-0 right-0 z-50 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${isTickerOpen ? 'top-10' : 'top-0'
          } ${isScrolled
            ? 'h-[70px] bg-alabaster/85 backdrop-blur-md supports-[backdrop-filter]:bg-alabaster/60 border-b border-clay/10 duration-500'
            : 'h-[90px] md:h-[110px] bg-transparent duration-0'
          }`}
      >
        <div className="flex h-full items-center justify-between px-6 md:px-10 max-w-[1800px] mx-auto w-full">
          <Link
            href="/"
            className={`relative z-50 transition-opacity duration-500 ${textColorClass} ${hoveredLink && hoveredLink !== 'logo' && canHover ? 'opacity-30' : 'opacity-100'
              }`}
            style={{
              fontFamily: 'var(--font-instrument)',
              fontWeight: 400,
              fontSize: 'clamp(20px, 2vw, 26px)',
              letterSpacing: '0.01em',
              lineHeight: '1',
            }}
            onMouseEnter={() => { setCanHover(true); setHoveredLink('logo'); }}
            onMouseLeave={() => setHoveredLink(null)}
            aria-label="Naath Model Management Home"
          >
            NAATH MODELS
          </Link>

          <nav
            className="hidden md:flex items-center gap-10 lg:gap-16"
            role="navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-500 uppercase ${textColorClass} ${hoveredLink === link.href
                  ? 'opacity-100'
                  : hoveredLink && canHover
                    ? 'opacity-30'
                    : 'opacity-100'
                  }`}
                style={{
                  fontFamily: 'var(--font-geist)',
                  fontWeight: 500,
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  lineHeight: '1',
                }}
                onMouseEnter={() => { setCanHover(true); setHoveredLink(link.href); }}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className={`md:hidden relative z-50 uppercase tracking-widest ${textColorClass}`}
            style={{
              fontFamily: 'var(--font-geist)',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.15em',
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-alabaster flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-charcoal uppercase transition-transform duration-500 ease-out ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              style={{
                fontFamily: 'var(--font-instrument)',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 8vw, 4rem)',
                letterSpacing: '0.02em',
                lineHeight: '1.1',
                transitionDelay: `${index * 50}ms`
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={`absolute bottom-10 text-stone text-[10px] uppercase tracking-widest transition-opacity duration-700 delay-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`} style={{ fontFamily: 'var(--font-geist)' }}>
          © 2026 Naath Models
        </div>
      </div>
    </>
  );
}
