import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientPage from './ClientPage';

export const runtime = 'edge';

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
  grayscale?: boolean;
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
      shoe: '40 EU / 10 US',
    },
    images: [
      { src: '/assets/images/models/fatima-fawaz/fatima-1.webp', alt: 'Editorial Landscape', type: 'portrait' },
      { src: '/assets/images/models/fatima-fawaz/fatima-3.webp', alt: 'Portrait 2', type: 'portrait' },
      { src: '/assets/images/models/fatima-fawaz/fatima-5.webp', alt: 'Portrait 1', type: 'portrait' },
      { src: '/assets/images/models/fatima-fawaz/fatima-6.webp', alt: 'Portrait 1', type: 'portrait' },
    ],
    digitals: [
      { src: '/assets/images/models/fatima-fawaz/fatima-digital-1.webp', alt: 'Digital 1' },
      { src: '/assets/images/models/fatima-fawaz/fatima-digital-2.webp', alt: 'Digital 2' },
      { src: '/assets/images/models/fatima-fawaz/fatima-digital-3.webp', alt: 'Digital 3' },
    ],
  },
  'nyanhial-kueii': {
    name: 'Nyanhial Kueii',
    stats: {
      height: '180cm / 5\'11"',
      bust: '76cm / 30"',
      waist: '51cm / 20"',
      hips: '84cm / 33"',
      shoe: '40 EU / 10 US',
    },
    images: [
      { src: '/assets/images/models/nyanhial-kueii/658C13AC-D5F6-453D-A4BD-1CADD8474F1C.webp', alt: 'Portfolio 1', type: 'portrait' },
      { src: '/assets/images/models/nyanhial-kueii/77BE6326-DE0B-459E-8646-5D9424C087C6.webp', alt: 'Portfolio 2', type: 'portrait' },
      { src: '/assets/images/models/nyanhial-kueii/2A9305A8-4B05-420F-BA94-B0DBBC2A91F1.webp', alt: 'Portfolio 3', type: 'portrait' },
      { src: '/assets/images/models/nyanhial-kueii/6189589C-EE97-4682-B7A7-BEFDCF643301.webp', alt: 'Portfolio 4', type: 'landscape' },
      { src: '/assets/images/models/nyanhial-kueii/639BB0AD-DDC6-4258-98AC-8FCE037D3493.webp', alt: 'Portfolio 5', type: 'portrait' },
      { src: '/assets/images/models/nyanhial-kueii/679A483C-5117-4A3C-BB60-6BA2ECC3FCD5.webp', alt: 'Portfolio 6', type: 'portrait' },
      { src: '/assets/images/models/nyanhial-kueii/IMG_0350.webp', alt: 'Portfolio 7', type: 'portrait' },
      { src: '/assets/images/models/nyanhial-kueii/F10B5D43-9E3E-468B-849B-11533FCD7D03.webp', alt: 'Portfolio 8', type: 'portrait' },
      { src: '/assets/images/models/nyanhial-kueii/IMG_0353.webp', alt: 'Portfolio 10', type: 'portrait' },
      { src: '/assets/images/models/nyanhial-kueii/B82D6A59-98D2-4B12-B262-439674AB0293.webp', alt: 'Portfolio 13', type: 'landscape' },
    ],
    digitals: [
      { src: '/assets/images/models/nyanhial-kueii/naya_-19.webp', alt: 'Digital 1' },
      { src: '/assets/images/models/nyanhial-kueii/IMG_2067.webp', alt: 'Digital 2' },
      { src: '/assets/images/models/nyanhial-kueii/IMG_2064.webp', alt: 'Digital 3' },
    ],
  },
};

type Props = {
  params: Promise<{ slug: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const model = modelData[slug];

  if (!model) {
    return {
      title: 'Model Not Found',
    };
  }

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

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const model = modelData[slug];

  if (!model) {
    notFound();
  }

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