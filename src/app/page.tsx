import Hero from '@/components/Hero';
import EditorsLetter from '@/components/EditorsLetter';
import PrivateViewingRoom from '@/components/PrivateViewingRoom';
import Footer from '@/components/Footer';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Naath Model Management',
    url: 'https://naathmodels.com',
    logo: 'https://naathmodels.com/logo.png',
    sameAs: [
      'https://www.instagram.com/naathmodels',
      'https://www.linkedin.com/company/naathmodels'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@naathmodels.com',
      contactType: 'scouting',
      areaServed: ['London', 'New York', 'Paris']
    },
    description: 'A boutique high-fashion model management agency defining the face of tomorrow.'
  };

  return (
    <main className="min-h-screen bg-alabaster selection:bg-clay selection:text-alabaster w-full max-w-[100vw] overflow-x-hidden relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <EditorsLetter />
      <PrivateViewingRoom />
      <Footer />
    </main>
  );
}