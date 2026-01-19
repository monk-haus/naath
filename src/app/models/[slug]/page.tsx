import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientPage from './ClientPage';

// FIX: This line is required for Cloudflare Pages dynamic routes
export const runtime = 'edge';

// --- Data Definition ---
interface ModelStats {
  height: string;
  bust: string;
  waist: string;
  hips: string;
  shoe: string;
}

interface ModelImage {
  src: string;
  alt: string;
  type?: 'landscape' | 'portrait' | 'detail';
}

interface ModelData {
  name: string;
  stats: ModelStats;
  images: ModelImage[];
  digitals: ModelImage[];
}

const modelData: Record<string, ModelData> = {
  fatima: {
    name: 'Fatima F.',
    stats: {
      height: '179cm / 5\'10.5"',
      bust: '79cm / 31"',
      waist: '64cm / 25"',
      hips: '86cm / 34"',
      shoe: '40 EU / 9 US',
    },
    images: [
      { src: '/assets/images/models/fatima-fawaz/fatima-1.webp', alt: 'Editorial Landscape', type: 'landscape' },
      { src: '/assets/images/models/fatima-fawaz/fatima-2.webp', alt: 'Portrait 1', type: 'portrait' },
      { src: '/assets/images/models/fatima-fawaz/fatima-3.webp', alt: 'Portrait 2', type: 'portrait' },
      { src: '/assets/images/models/fatima-fawaz/fatima-4.webp', alt: 'Detail Shot', type: 'detail' },
    ],
    digitals: [
      { src: '/assets/images/models/fatima-fawaz/fatima-digital-1.webp', alt: 'Digital 1' },
      { src: '/assets/images/models/fatima-fawaz/fatima-digital-2.webp', alt: 'Digital 2' },
      { src: '/assets/images/models/fatima-fawaz/fatima-digital-3.webp', alt: 'Digital 3' },
    ],
  },
};

type Props = {
  params: Promise<{ slug: string }>
};

// --- Dynamic Metadata Generation ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const model = modelData[slug];

  if (!model) {
    return {
      title: 'Model Not Found',
    };
  }

  // OPTIMIZATION: Social platforms (Twitter/X) prefer Landscape images (1.91:1 ratio).
  // We try to find a 'landscape' image first. If none exists, we fall back to the main portrait.
  const socialImageObj = model.images.find(img => img.type === 'landscape') || model.images[0];
  const socialImageSrc = socialImageObj?.src || '/og-image.jpg';

  const title = `${model.name} | Naath Model Management`;
  const description = `Portfolio and digitals for ${model.name}. Height: ${model.stats.height}. Represented by Naath Model Management.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // MetadataBase in layout.tsx will resolve this relative path automatically
      images: [
        {
          url: socialImageSrc,
          width: socialImageObj.type === 'landscape' ? 1200 : 800,
          height: socialImageObj.type === 'landscape' ? 630 : 1200,
          alt: model.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImageSrc],
    },
  };
}

// --- Main Page Component ---
export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const model = modelData[slug];

  if (!model) {
    notFound();
  }

  // Google Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: model.name,
    height: model.stats.height,
    jobTitle: 'Fashion Model',
    memberOf: {
      '@type': 'Organization',
      name: 'Naath Model Management',
      url: 'https://naathmodels.com'
    },
    image: `https://naathmodels.com${model.images[0].src}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage model={model} />
    </>
  );
}