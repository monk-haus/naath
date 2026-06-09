import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientPage from './ClientPage';

export const runtime = 'edge';

interface ModelImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  type?: 'landscape' | 'portrait' | 'detail';
  grayscale?: boolean;
}

interface ModelData {
  name: string;
  stats: Record<string, string>;
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
      { src: '/assets/images/models/fatima-fawaz/fatima-1.webp', alt: 'Editorial Landscape', width: 2048, height: 2560, type: 'portrait' },
      { src: '/assets/images/models/fatima-fawaz/fatima-3.webp', alt: 'Portrait 2', width: 2048, height: 2560, type: 'portrait' },
      { src: '/assets/images/models/fatima-fawaz/fatima-5.webp', alt: 'Portrait 1', width: 2048, height: 2560, type: 'portrait' },
      { src: '/assets/images/models/fatima-fawaz/fatima-6.webp', alt: 'Portrait 1', width: 864, height: 1080, type: 'portrait' },
    ],
    digitals: [
      { src: '/assets/images/models/fatima-fawaz/fatima-digital-1.webp', alt: 'Digital 1', width: 810, height: 1080 },
      { src: '/assets/images/models/fatima-fawaz/fatima-digital-2.webp', alt: 'Digital 2', width: 810, height: 1080 },
      { src: '/assets/images/models/fatima-fawaz/fatima-digital-3.webp', alt: 'Digital 3', width: 810, height: 1080 },
    ],
  },
  'nyanhial-k': {
    name: 'Nyanhial K.',
    stats: {
      height: '180cm / 5\'11"',
      bust: '76cm / 30"',
      waist: '58cm / 23"',
      hips: '84cm / 33"',
      shoe: '40 EU / 10 US',
    },
    images: [
      { src: '/assets/images/models/nyanhial-kueii/658C13AC-D5F6-453D-A4BD-1CADD8474F1C.webp', alt: 'Portfolio 1', width: 1440, height: 1440, type: 'portrait' },
      { src: '/assets/images/models/nyanhial-kueii/2631c71b-929b-45d1-8586-88b64aa99f05.webp', alt: 'Portfolio 2', width: 960, height: 1440, type: 'portrait' },
      { src: '/assets/images/models/nyanhial-kueii/839effc8-b01d-484a-b94d-1b544f396ee5.webp', alt: 'Portfolio 3', width: 960, height: 1163, type: 'portrait' },
    ],
    digitals: [
      { src: '/assets/images/models/nyanhial-kueii/digitals/nyanhial-digital-1.webp', alt: 'Digital 1', width: 915, height: 1281 },
      { src: '/assets/images/models/nyanhial-kueii/digitals/nyanhial-digital-2.webp', alt: 'Digital 2', width: 915, height: 1281 },
      { src: '/assets/images/models/nyanhial-kueii/digitals/nyanhial-digital-3.webp', alt: 'Digital 3', width: 915, height: 1281 },
      { src: '/assets/images/models/nyanhial-kueii/digitals/nyanhial-digital-4.webp', alt: 'Digital 4', width: 915, height: 1281 },
      { src: '/assets/images/models/nyanhial-kueii/digitals/nyanhial-digital-5.webp', alt: 'Digital 5', width: 915, height: 1220 },
      { src: '/assets/images/models/nyanhial-kueii/digitals/nyanhial-digital-6.webp', alt: 'Digital 6', width: 915, height: 1281 },
      { src: '/assets/images/models/nyanhial-kueii/digitals/nyanhial-digital-7.webp', alt: 'Digital 7', width: 915, height: 1281 },
    ],
  },
  nthabiseng: {
    name: 'Nthabiseng F.',
    stats: {
      height: '172cm / 5\'8"',
      bust: '82cm / 32"',
      waist: '59cm / 23"',
      hips: '90cm / 35.5"',
      shoe: '39 EU / 8.5 US',
    },
    images: [
      { src: '/assets/images/models/nthasibeng/IMG_0902.webp', alt: 'Portfolio 1', width: 1282, height: 2000, type: 'portrait' },
      { src: '/assets/images/models/nthasibeng/IMG_0903.webp', alt: 'Portfolio 2', width: 1393, height: 1999, type: 'portrait' },
      { src: '/assets/images/models/nthasibeng/IMG_0905.webp', alt: 'Portfolio 3', width: 1385, height: 2000, type: 'portrait' },
      { src: '/assets/images/models/nthasibeng/IMG_0909.webp', alt: 'Portfolio 4', width: 1181, height: 2000, type: 'portrait' },
    ],
    digitals: [
      { src: '/assets/images/models/nthasibeng/IMG_0902.webp', alt: 'Digital 1', width: 1282, height: 2000 },
      { src: '/assets/images/models/nthasibeng/IMG_0903.webp', alt: 'Digital 2', width: 1393, height: 1999 },
      { src: '/assets/images/models/nthasibeng/IMG_0905.webp', alt: 'Digital 3', width: 1385, height: 2000 },
      { src: '/assets/images/models/nthasibeng/IMG_0909.webp', alt: 'Digital 4', width: 1181, height: 2000 },
    ],
  },
  'olashay-o': {
    name: "Ola'shay O.",
    stats: {
      height: "180cm / 5'11\"",
      waist: '28cm',
      shoe: '42 EU / 8.5 US',
      hair: 'Black',
      eyes: 'Dark Brown',
    },
    images: [
      { src: '/assets/images/models/olashay/b3af05c0-2add-4f69-a619-7eaf6f1aa35b.webp', alt: 'Portfolio 1', width: 999, height: 1500, type: 'portrait' },
      { src: '/assets/images/models/olashay/96dd67d4-3d77-448f-82cd-8dbc2bab7981.webp', alt: 'Portfolio 2', width: 1500, height: 1000, type: 'landscape' },
      { src: '/assets/images/models/olashay/6f11939a-6b21-463f-95f4-df337368ba1e.webp', alt: 'Portfolio 3', width: 1000, height: 1500, type: 'portrait' },
      { src: '/assets/images/models/olashay/6e1faa0d-bd1e-4631-9d30-f86c5942fa72.webp', alt: 'Portfolio 4', width: 1366, height: 2048, type: 'portrait' },
      { src: '/assets/images/models/olashay/1c99b5cb-ed6b-4271-bc43-b00b6de32160%202.webp', alt: 'Portfolio 5', width: 1000, height: 1500, type: 'portrait' },
    ],
    digitals: [],
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